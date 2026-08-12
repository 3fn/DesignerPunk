#!/usr/bin/env tsx
/**
 * check-section-citations.ts — resolver-chain-aware dead-citation guard.
 *
 * Sanctioned by register row `governance/classification-map.md § "section-citation-resolution"`
 * (check_state: proposed → armed at Peter's flip). Execution issue:
 * `.kiro/issues/2026-08-12-section-citation-defects-and-checker.md`.
 *
 * Scans the citing corpus (`governance/`, `.kiro/steering/`, `canonical/`) for
 * MCP citation blocks — get_section / get_document_full / get_document_summary —
 * and verifies each one would actually resolve against the served corpus:
 *
 *   1. doc resolution mirrors the runtime resolver chain (DocumentIndexer.resolveRef):
 *      id index → indexed relative key → frozen legacy-path manifest. The id for
 *      every served doc is derived by the SAME `extractFrontmatterInfo` the
 *      resolver uses (explicit `id:` → slug of `name:` → slug of H1), and the
 *      legacy fallback imports the SAME `FROZEN_LEGACY_MANIFEST` — no reinvented
 *      resolution.
 *   2. heading existence (get_section only) is EXACT trimmed-string equality,
 *      matching the runtime section matcher (section-parser: `n.heading === heading`).
 *      Headings inside fenced code blocks are excluded (they are examples, not
 *      addressable sections).
 *   3. identity-doc awareness: docs under `.kiro/steering/` are deliberately
 *      NEVER MCP-served (Spec 119 decision). Any MCP citation that targets one —
 *      by id, path, or filename — is a defect BY CONSTRUCTION, classed
 *      separately so the fix guidance (replace with truthful access guidance)
 *      is obvious.
 *   4. template-placeholder allowlist: citations whose path or heading carries a
 *      `[family-name]`-style placeholder are teaching templates, not live
 *      citations — skipped and counted.
 *
 * NOTE on aliases: frontmatter `aliases` are a find_docs SCORING signal only —
 * resolveRef does NOT resolve them. A citation that only matches an alias FAILS
 * at runtime, so the guard flags it as a defect and surfaces the alias's owning
 * doc as a fix hint. (The execution issue's "plus aliases" is implemented as
 * this hint, not as a pass — passing it would allowlist runtime failures.)
 *
 * Scope boundary (escalate-don't-build): one script + one CI job. No config
 * system; roots and classes are constants below.
 *
 *   npm run check:section-citations
 *   npx tsx scripts/check-section-citations.ts
 */

import * as fs from 'fs';
import * as path from 'path';
import { extractFrontmatterInfo } from '../mcp-server/src/indexer/frontmatter-parser';
import { FROZEN_LEGACY_MANIFEST } from '../mcp-server/src/legacy-path/legacy-path-manifest';

const PROJECT_ROOT = path.resolve(__dirname, '..');

/** The MCP-served corpus root (81 docs). */
const SERVED_ROOT = 'governance';
/** Identity docs — always-loaded, deliberately never MCP-served. */
const IDENTITY_ROOT = '.kiro/steering';
/** Roots scanned for CITING text (the corpus that teaches agents what to query). */
const CITING_ROOTS = [SERVED_ROOT, IDENTITY_ROOT, 'canonical'] as const;

/** `[family-name]`-style template placeholder (teaching pattern, not a live citation). */
const PLACEHOLDER = /\[[a-z][a-z0-9-]*\]/i;

/**
 * An MCP citation block. Tolerant of whitespace/newlines and either quote style;
 * `parent`/`sectionId` extras are ignored. The body capture is non-greedy up to
 * the first `}` — citations do not nest.
 */
const CITATION = /get_(section|document_full|document_summary)\s*\(\s*\{([\s\S]*?)\}\s*\)/g;

type DefectClass =
  | 'unresolved-doc'
  | 'identity-doc-citation'
  | 'missing-heading';

interface Defect {
  citingFile: string;
  line: number;
  tool: string;
  citedPath: string;
  citedHeading?: string;
  class: DefectClass;
  hint?: string;
}

interface ServedDoc {
  relKey: string;
  id?: string;
  aliases: string[];
  headings: string[];
}

/** Recursively collect every `.md` file under a root (relative posix paths). */
function collectMd(root: string): string[] {
  const out: string[] = [];
  const abs = path.join(PROJECT_ROOT, root);
  if (!fs.existsSync(abs)) return out;
  const walk = (dir: string): void => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const p = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(p);
      else if (entry.isFile() && entry.name.endsWith('.md')) {
        out.push(path.relative(PROJECT_ROOT, p).split(path.sep).join('/'));
      }
    }
  };
  walk(abs);
  return out;
}

/** Same normalization as DocumentIndexer.normalizeRef. */
function normalizeRef(ref: string): string {
  let r = ref.trim();
  r = r.replace(/\\/g, '/');
  r = r.replace(/^\.\//, '');
  r = r.replace(/\/{2,}/g, '/');
  r = r.replace(/\/+$/, '');
  return r;
}

/** Headings of a markdown doc, EXCLUDING fenced code blocks; trimmed text. */
function extractHeadings(content: string): string[] {
  const headings: string[] = [];
  let inFence = false;
  for (const rawLine of content.split('\n')) {
    const line = rawLine.trimEnd();
    if (/^\s*(```|~~~)/.test(line)) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;
    const m = /^#{1,6}\s+(.*)$/.exec(line.trim());
    if (m) headings.push(m[1].trim());
  }
  return headings;
}

/** Parse a quoted param out of a citation body. */
function param(body: string, name: string): string | undefined {
  const m = new RegExp(`${name}\\s*:\\s*(['"])([^'"]*)\\1`).exec(body);
  return m ? m[2] : undefined;
}

function lineOf(content: string, index: number): number {
  return content.slice(0, index).split('\n').length;
}

function main(): void {
  // --- Build the served-corpus view (mirrors the indexer's resolution surfaces).
  const served = new Map<string, ServedDoc>(); // relKey → doc
  const idIndex = new Map<string, string>(); // id → relKey
  const aliasIndex = new Map<string, string>(); // alias(lower) → relKey (hint only)
  for (const relKey of collectMd(SERVED_ROOT)) {
    const content = fs.readFileSync(path.join(PROJECT_ROOT, relKey), 'utf-8');
    const info = extractFrontmatterInfo(content);
    const doc: ServedDoc = {
      relKey,
      id: info.id,
      aliases: info.aliases ?? [],
      headings: extractHeadings(content),
    };
    served.set(relKey, doc);
    if (info.id) idIndex.set(info.id, relKey);
    for (const a of doc.aliases) aliasIndex.set(a.toLowerCase(), relKey);
  }

  // Legacy-path fallback: legacyPath → id → served relKey (dead manifest entries
  // whose id is no longer served resolve to nothing, same as at runtime).
  const legacyIndex = new Map<string, string>(); // normalized legacyPath → relKey
  for (const entry of FROZEN_LEGACY_MANIFEST.entries) {
    const relKey = idIndex.get(entry.id);
    if (relKey) legacyIndex.set(normalizeRef(entry.legacyPath), relKey);
  }

  // Identity docs: never served — citations targeting them are defects by construction.
  const identityRefs = new Set<string>(); // ids + normalized paths + bare filenames
  for (const relKey of collectMd(IDENTITY_ROOT)) {
    const content = fs.readFileSync(path.join(PROJECT_ROOT, relKey), 'utf-8');
    const info = extractFrontmatterInfo(content);
    if (info.id) identityRefs.add(info.id);
    identityRefs.add(normalizeRef(relKey));
    identityRefs.add(path.basename(relKey));
  }

  const resolveDoc = (ref: string): ServedDoc | undefined => {
    const idHit = idIndex.get(ref); // 1. id (raw, not normalized — mirrors resolveRef)
    if (idHit) return served.get(idHit);
    const key = normalizeRef(ref);
    if (served.has(key)) return served.get(key); // 2. indexed relative key
    const legacyHit = legacyIndex.get(key); // 3. legacy-path fallback
    if (legacyHit) return served.get(legacyHit);
    return undefined;
  };

  // --- Scan the citing corpus.
  const defects: Defect[] = [];
  let totalCitations = 0;
  let allowlisted = 0;
  for (const root of CITING_ROOTS) {
    for (const relKey of collectMd(root)) {
      const content = fs.readFileSync(path.join(PROJECT_ROOT, relKey), 'utf-8');
      for (const m of content.matchAll(CITATION)) {
        const [, tool, body] = m;
        const citedPath = param(body, 'path');
        if (citedPath === undefined) continue; // not a live citation shape
        totalCitations++;
        const citedHeading = param(body, 'heading');
        if (PLACEHOLDER.test(citedPath) || (citedHeading !== undefined && PLACEHOLDER.test(citedHeading))) {
          allowlisted++;
          continue;
        }
        const line = lineOf(content, m.index!);
        const base = { citingFile: relKey, line, tool: `get_${tool}`, citedPath, citedHeading };

        const doc = resolveDoc(citedPath);
        if (!doc) {
          const isIdentity =
            identityRefs.has(citedPath) || identityRefs.has(normalizeRef(citedPath)) ||
            identityRefs.has(path.basename(normalizeRef(citedPath)));
          const aliasHit = aliasIndex.get(citedPath.toLowerCase());
          defects.push({
            ...base,
            class: isIdentity ? 'identity-doc-citation' : 'unresolved-doc',
            hint: isIdentity
              ? 'identity docs are always-loaded and never MCP-served — replace the MCP example with truthful access guidance'
              : aliasHit
                ? `matches only an ALIAS of ${aliasHit} — aliases do not resolve at runtime; cite that doc's id instead`
                : undefined,
          });
          continue;
        }
        if (tool === 'section' && citedHeading !== undefined) {
          if (!doc.headings.includes(citedHeading)) {
            const near = doc.headings.filter(
              (h) => h.toLowerCase().includes(citedHeading.toLowerCase()) ||
                     citedHeading.toLowerCase().includes(h.toLowerCase())
            );
            defects.push({
              ...base,
              class: 'missing-heading',
              hint: near.length > 0 ? `near-matches on ${doc.relKey}: ${near.map((h) => `"${h}"`).join(', ')}` : `no similar heading on ${doc.relKey}`,
            });
          }
        }
      }
    }
  }

  // --- Report.
  console.log('=== Section Citation Guard (register row: section-citation-resolution) ===');
  console.log(`  Citing roots: ${CITING_ROOTS.join(', ')}`);
  console.log(`  Served docs indexed: ${served.size} (ids: ${idIndex.size}; legacy paths: ${legacyIndex.size})`);
  console.log(`  Citations checked: ${totalCitations} (template placeholders allowlisted: ${allowlisted})`);

  if (defects.length === 0) {
    console.log('\n  RESULT: PASS — every MCP citation resolves (doc + heading).');
    process.exit(0);
  }

  console.error(`\n  RESULT: FAIL — ${defects.length} dead citation(s):\n`);
  for (const d of defects) {
    const target = d.citedHeading !== undefined ? `${d.citedPath} § "${d.citedHeading}"` : d.citedPath;
    console.error(`  [${d.class}] ${d.citingFile}:${d.line}`);
    console.error(`      ${d.tool}(${target})`);
    if (d.hint) console.error(`      hint: ${d.hint}`);
  }
  console.error('\n  Fix guidance: heading-class → restore/update the heading or re-aim the citation (owner content call).');
  console.error('  Identity-class → identity docs are never MCP-served; replace the example with truthful access guidance.');
  process.exit(1);
}

main();
