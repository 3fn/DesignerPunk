#!/usr/bin/env tsx
/**
 * floor-closure.ts — computes the two packaging-floor closures (Spec 123 Task 3;
 * design.md § "C5. The packaging floor"; requirements.md Req 4.1–4.7, 3.9).
 *
 * CLOSURE 1 — rewrite completeness, over the TRANSFORMED COPY. Copies
 * `src/tokens/**` (non-test) into a scratch directory using the SAME
 * `rewriteByResolution` transform `init` applies (Task 2's C4 mechanism —
 * reused, not reinvented), then independently re-scans the OUTPUT for any
 * relative specifier that still escapes the copy root. Zero escapes, or this
 * script exits non-zero. Governs C4, never `files[]`.
 *
 * CLOSURE 2 — the package's own runtime closure of `src/tokens`. Walks every
 * non-test `.ts` file under `src/tokens/**` as an independent scan root
 * (Req 4.2: "computed over the DIRECTORY, not by import-graph traversal from
 * an entry" — package-mode `generate` raw-TS-loads three entries via
 * `readdirSync`, not import, so a barrel-traversal closure would miss escapes
 * reachable only through the third). For every non-`import type` / non-
 * `export type` relative MODULE REFERENCE (`import ... from`, `export ... from`,
 * `require(...)` — including inside function bodies, `import(...)`) that
 * ESCAPES `src/tokens/**`, the escaped file joins the closure, and its own
 * further relative references are followed transitively. Bare specifiers
 * reached are recorded and classified (node builtin / declared `dependency` /
 * UNVERIFIED).
 *
 * This is a SNAPSHOT with known decay (Req 4.2): it holds under the current
 * transpiler's erasure semantics. The DURABLE arbiter is the packed-install
 * consumer-guard run (Req 3.9, Task 9's `local-mode generate over the
 * init-copied tree`) — this script's output feeds `pack-assert.ts`'s
 * regenerated-not-copied check (Ada D-T-B1/(a)), never the reverse.
 *
 * Usage:
 *   npx tsx scripts/floor-closure.ts             # writes floor-closure.json
 *   npx tsx scripts/floor-closure.ts --bite-closure-1   # closure 1, skipping
 *     the rewrite transform on one file — proves the escape scan is live (RED)
 */

import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { builtinModules } from 'module';
import { rewriteByResolution } from '../src/cli/shared/transforms';

const PROJECT_ROOT = path.resolve(__dirname, '..');
const TOKENS_ROOT = path.join(PROJECT_ROOT, 'src', 'tokens');
const OUTPUT_PATH = path.join(PROJECT_ROOT, 'floor-closure.json');
const PACKAGE_JSON_PATH = path.join(PROJECT_ROOT, 'package.json');

// ---------------------------------------------------------------------------
// Shared specifier scanning
// ---------------------------------------------------------------------------

export interface SpecifierRef {
  specifier: string;
  kind: 'import-export' | 'require' | 'dynamic-import';
}

/**
 * Matches a WHOLE-DECLARATION type-only form: `import type X from '...'`,
 * `import type { X } from '...'`, `import type * as X from '...'`,
 * `export type { X } from '...'`. These are erased at compile time — never a
 * runtime reference (Req 4.2: "non-import-type"). A MIXED per-specifier form
 * (`import { type X, Y } from '...'`) is NOT matched here — Y is a value, so
 * the whole statement is a real `require()` at runtime, and it is correctly
 * picked up by FROM_CLAUSE_RE below instead.
 */
const TYPE_ONLY_DECL_RE =
  /\b(?:import|export)\s+type\s+(?:\{[^}]*\}|\*\s+as\s+\w+|\w+)\s+from\s+(['"])([^'"]+)\1/g;

const FROM_CLAUSE_RE = /\bfrom\s+(['"])([^'"]+)\1/g;
const REQUIRE_RE = /\brequire\(\s*(['"])([^'"]+)\1\s*\)/g;
const DYNAMIC_IMPORT_RE = /\bimport\(\s*(['"])([^'"]+)\1\s*\)/g;

/**
 * Strip `/* ... *\/` block comments and `// ...` line comments before scanning
 * for specifiers (Req 4.2 GAP 2: root-absolute/relative forms appear in
 * docblocks today — e.g. `defineComponentTokens.ts`'s `@example` block — and
 * must never be treated as real module references). Replaces stripped
 * characters with spaces (never newlines removed) so match indices/line
 * counts in error messages stay meaningful. Not a full tokenizer — adequate
 * for this codebase's comment style (no `/*`/`//` literals inside strings
 * that also contain specifier-shaped text).
 */
function stripComments(content: string): string {
  const noBlockComments = content.replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, ' '));
  // Line comments: `//...` NOT immediately preceded by `:` (skips `https://` inside strings).
  return noBlockComments.replace(/([^:]|^)\/\/.*$/gm, (m, prefix: string) => prefix + ' '.repeat(m.length - prefix.length));
}

/** Extract every relative/bare module reference this recipe must resolve, skipping whole-declaration type-only imports/re-exports and anything inside a comment. */
export function extractSpecifiers(rawContent: string): SpecifierRef[] {
  const content = stripComments(rawContent);
  const typeOnlyRanges: Array<[number, number]> = [];
  let m: RegExpExecArray | null;

  TYPE_ONLY_DECL_RE.lastIndex = 0;
  while ((m = TYPE_ONLY_DECL_RE.exec(content))) {
    typeOnlyRanges.push([m.index, m.index + m[0].length]);
  }
  const isTypeOnly = (idx: number): boolean =>
    typeOnlyRanges.some(([start, end]) => idx >= start && idx < end);

  const refs: SpecifierRef[] = [];

  FROM_CLAUSE_RE.lastIndex = 0;
  while ((m = FROM_CLAUSE_RE.exec(content))) {
    if (isTypeOnly(m.index)) continue;
    refs.push({ specifier: m[2], kind: 'import-export' });
  }

  REQUIRE_RE.lastIndex = 0;
  while ((m = REQUIRE_RE.exec(content))) {
    refs.push({ specifier: m[2], kind: 'require' });
  }

  DYNAMIC_IMPORT_RE.lastIndex = 0;
  while ((m = DYNAMIC_IMPORT_RE.exec(content))) {
    refs.push({ specifier: m[2], kind: 'dynamic-import' });
  }

  return refs;
}

function isTestPath(relPosix: string): boolean {
  return /(^|\/)__tests__(\/|$)/.test(relPosix) || /\.test\.tsx?$/.test(relPosix);
}

/** Every non-test `.ts`/`.tsx` file under `dir`, recursively (Req 4.2: over the DIRECTORY). */
export function walkNonTestTsFiles(dir: string): string[] {
  const out: string[] = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === '__tests__') continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...walkNonTestTsFiles(full));
    } else if (entry.isFile() && /\.tsx?$/.test(entry.name) && !/\.test\.tsx?$/.test(entry.name) && !/\.d\.ts$/.test(entry.name)) {
      out.push(full);
    }
  }
  return out;
}

function toPosix(p: string): string {
  return p.split(path.sep).join('/');
}

function isInside(childAbs: string, rootAbs: string): boolean {
  const rel = path.relative(rootAbs, childAbs);
  return rel === '' || (!rel.startsWith('..') && !path.isAbsolute(rel));
}

/** Resolve a relative specifier against the importing file's directory: exact file, then `.ts`/`.tsx`, then `/index.ts`/`/index.tsx`. */
export function resolveRelativeSpecifier(fromFileAbs: string, specifier: string): string | null {
  const base = path.resolve(path.dirname(fromFileAbs), specifier);
  const candidates = [base, `${base}.ts`, `${base}.tsx`, path.join(base, 'index.ts'), path.join(base, 'index.tsx')];
  for (const c of candidates) {
    if (fs.existsSync(c) && fs.statSync(c).isFile()) return c;
  }
  return null;
}

// ---------------------------------------------------------------------------
// Closure 2 — the package's own runtime closure of src/tokens
// ---------------------------------------------------------------------------

export interface BareSpecifierRecord {
  specifier: string;
  classification: 'node-builtin' | 'dependency' | 'UNVERIFIED';
  referencedFrom: string[];
}

export interface Closure2Result {
  seedFileCount: number;
  files: string[]; // repo-relative POSIX paths, outside src/tokens/**, sorted
  byDirectory: Record<string, number>;
  bareSpecifiers: BareSpecifierRecord[];
  totalFiles: number;
}

const NODE_BUILTIN_SET = new Set([...builtinModules, ...builtinModules.map((m) => `node:${m}`)]);

function readDependencyNames(): Set<string> {
  const pkg = JSON.parse(fs.readFileSync(PACKAGE_JSON_PATH, 'utf8'));
  return new Set(Object.keys(pkg.dependencies || {}));
}

/** Group a closure-2 member's repo-relative path into its declared-floor directory bucket, for the reconciliation report. */
function directoryBucket(repoRelPosix: string): string {
  // e.g. "src/build/tokens/index.ts" -> "src/build/tokens"; "src/types/PrimitiveToken.ts" -> "src/types"
  const parts = repoRelPosix.split('/');
  // src/build/tokens/* and src/build/types/* are both 3-segment buckets; everything else is 2-segment.
  if (parts[0] === 'src' && parts[1] === 'build' && parts.length > 3) {
    return parts.slice(0, 3).join('/');
  }
  return parts.slice(0, 2).join('/');
}

export function computeClosure2(): Closure2Result {
  const seedFiles = walkNonTestTsFiles(TOKENS_ROOT);
  const visited = new Set<string>(seedFiles);
  const escaped = new Set<string>();
  const bareSpecs = new Map<string, Set<string>>();
  const queue: string[] = [...seedFiles];

  while (queue.length > 0) {
    const file = queue.shift()!;
    const content = fs.readFileSync(file, 'utf8');
    const refs = extractSpecifiers(content);

    for (const ref of refs) {
      const spec = ref.specifier;
      if (spec.startsWith('.')) {
        const resolved = resolveRelativeSpecifier(file, spec);
        if (!resolved) {
          throw new Error(
            `floor-closure: cannot resolve relative specifier '${spec}' from ${toPosix(path.relative(PROJECT_ROOT, file))}`,
          );
        }
        if (isInside(resolved, TOKENS_ROOT)) {
          // Intra-tier — already a scan root by construction (walkNonTestTsFiles
          // covers every non-test .ts under the tier). Not part of the closure.
          continue;
        }
        escaped.add(resolved);
        if (!visited.has(resolved)) {
          visited.add(resolved);
          queue.push(resolved);
        }
      } else {
        // Bare specifier (node builtin or a declared package dependency).
        const rel = toPosix(path.relative(PROJECT_ROOT, file));
        if (!bareSpecs.has(spec)) bareSpecs.set(spec, new Set());
        bareSpecs.get(spec)!.add(rel);
      }
    }
  }

  const deps = readDependencyNames();
  const bareSpecifiers: BareSpecifierRecord[] = [...bareSpecs.entries()]
    .map(([specifier, referencedFrom]) => {
      const bareRoot = specifier.split('/')[0];
      const classification: BareSpecifierRecord['classification'] = NODE_BUILTIN_SET.has(specifier) || NODE_BUILTIN_SET.has(bareRoot)
        ? 'node-builtin'
        : deps.has(bareRoot) || deps.has(specifier)
        ? 'dependency'
        : 'UNVERIFIED';
      return { specifier, classification, referencedFrom: [...referencedFrom].sort() };
    })
    .sort((a, b) => a.specifier.localeCompare(b.specifier));

  const files = [...escaped].map((abs) => toPosix(path.relative(PROJECT_ROOT, abs))).sort();
  const byDirectory: Record<string, number> = {};
  for (const f of files) {
    const bucket = directoryBucket(f);
    byDirectory[bucket] = (byDirectory[bucket] || 0) + 1;
  }

  return {
    seedFileCount: seedFiles.length,
    files,
    byDirectory,
    bareSpecifiers,
    totalFiles: files.length,
  };
}

// ---------------------------------------------------------------------------
// Closure 1 — rewrite completeness over the transformed copy
// ---------------------------------------------------------------------------

export interface Closure1Result {
  filesChecked: number;
  escapingReferences: Array<{ file: string; specifier: string }>;
  zeroEscapes: boolean;
}

/**
 * Copies every non-test file under `src/tokens/**` into a scratch directory,
 * applying `rewriteByResolution` to `.ts` files exactly as `init.ts` steps
 * 3b/3c do (same `tierRoot` boundary — the WHOLE tier, not each step's own
 * root). Non-`.ts` files (themes' generated assets, if any) are copied as-is.
 *
 * @param opts.skipRewriteFor absolute source path of one file to copy WITHOUT
 *   the transform — the closure-1 bite (Task 3.2): proves the escape scan
 *   below is live, not vacuous.
 */
function buildScratchCopy(scratchRoot: string, opts?: { skipRewriteFor?: string }): { copied: string[]; scratchTierRoot: string } {
  // Mirror `init.ts`'s ACTUAL destination depth (`<consumerRepoRoot>/src/tokens/**`,
  // steps 3b/3c) rather than flattening straight to the scratch root. Several
  // real specifiers (e.g. `component/progress.ts`'s `'../../tokens/SpacingTokens'`)
  // resolve correctly INSIDE the tier only when the copy preserves the tier's
  // true depth below its parent — flattening one level would turn a legitimate
  // intra-tier reference into a false escape.
  const tierRoot = TOKENS_ROOT;
  const scratchTierRoot = path.join(scratchRoot, 'src', 'tokens');
  const files = walkNonTestTsFiles(tierRoot);
  const copied: string[] = [];

  for (const srcAbs of files) {
    const rel = path.relative(tierRoot, srcAbs);
    const destAbs = path.join(scratchTierRoot, rel);
    fs.mkdirSync(path.dirname(destAbs), { recursive: true });

    const raw = fs.readFileSync(srcAbs, 'utf8');
    const content =
      opts?.skipRewriteFor === srcAbs ? raw : rewriteByResolution(raw, srcAbs, tierRoot).content;

    fs.writeFileSync(destAbs, content, 'utf8');
    copied.push(destAbs);
  }
  return { copied, scratchTierRoot };
}

/** Independently re-scan the scratch OUTPUT for any relative specifier that still escapes the (mirrored) tier root — a fresh check, not a reuse of rewriteByResolution's own escape detection. */
function scanForEscapes(scratchTierRoot: string, copiedFiles: string[]): Array<{ file: string; specifier: string }> {
  const escapes: Array<{ file: string; specifier: string }> = [];
  for (const fileAbs of copiedFiles) {
    const content = fs.readFileSync(fileAbs, 'utf8');
    const refs = extractSpecifiers(content);
    for (const ref of refs) {
      if (!ref.specifier.startsWith('.')) continue; // bare specifiers (e.g. @3fn/core/*) are the rewrite TARGET — not escapes
      const resolvedInScratch = path.resolve(path.dirname(fileAbs), ref.specifier);
      // A specifier resolving outside the mirrored tier root, OR to a path that
      // doesn't exist anywhere inside it, is an escape.
      const outsideTier = !isInside(resolvedInScratch, scratchTierRoot);
      const existsInTier =
        !outsideTier &&
        (fs.existsSync(resolvedInScratch) ||
          fs.existsSync(`${resolvedInScratch}.ts`) ||
          fs.existsSync(path.join(resolvedInScratch, 'index.ts')));
      if (outsideTier || !existsInTier) {
        escapes.push({ file: toPosix(path.relative(scratchTierRoot, fileAbs)), specifier: ref.specifier });
      }
    }
  }
  return escapes;
}

export function computeClosure1(opts?: { biteSkipFile?: string }): Closure1Result {
  const scratchRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'dp-floor-closure-1-'));
  try {
    const skipRewriteFor = opts?.biteSkipFile ? path.join(TOKENS_ROOT, opts.biteSkipFile) : undefined;
    const { copied, scratchTierRoot } = buildScratchCopy(scratchRoot, { skipRewriteFor });
    const escapingReferences = scanForEscapes(scratchTierRoot, copied);
    return { filesChecked: copied.length, escapingReferences, zeroEscapes: escapingReferences.length === 0 };
  } finally {
    fs.rmSync(scratchRoot, { recursive: true, force: true });
  }
}

// ---------------------------------------------------------------------------
// CLI entry
// ---------------------------------------------------------------------------

function main(): void {
  const args = process.argv.slice(2);
  const biteFlagIdx = args.indexOf('--bite-closure-1');
  const biteSkipFile = biteFlagIdx >= 0 ? (args[biteFlagIdx + 1] || 'component/progress.ts') : undefined;

  const closure1 = computeClosure1(biteSkipFile ? { biteSkipFile } : undefined);
  const closure2 = computeClosure2();

  const output = {
    generatedAt: new Date().toISOString(),
    note: 'snapshot; the arbiter is the post-diet packed consumer-guard run (Req 3.9, Task 9).',
    closure1: {
      description: 'rewrite completeness over the transformed copy (governs C4, never files[])',
      ...closure1,
    },
    closure2: {
      description: "the package's own runtime closure of src/tokens (governs files[])",
      ...closure2,
    },
  };

  if (!biteSkipFile) {
    fs.writeFileSync(OUTPUT_PATH, `${JSON.stringify(output, null, 2)}\n`, 'utf8');
    console.log(`Wrote ${toPosix(path.relative(PROJECT_ROOT, OUTPUT_PATH))}`);
  }

  console.log(`Closure 1: ${closure1.filesChecked} files checked, ${closure1.escapingReferences.length} escaping references${biteSkipFile ? ` (BITE: skipped rewrite on ${biteSkipFile})` : ''}`);
  console.log(`Closure 2: ${closure2.seedFileCount} seed files, ${closure2.totalFiles} closure files, ${closure2.bareSpecifiers.length} bare specifiers`);
  console.log('Closure 2 by directory:', JSON.stringify(closure2.byDirectory, null, 2));

  if (biteSkipFile) {
    // Bite mode: the scan is expected to go RED (prove it is live, not vacuous).
    // Exit non-zero if it stayed GREEN instead — that would mean the bite failed to fire.
    if (closure1.zeroEscapes) {
      console.error(`BITE FAILED TO FIRE: skipping the rewrite on ${biteSkipFile} did not produce an escaping reference — the scan may be vacuous.`);
      process.exitCode = 1;
    } else {
      console.log(`BITE CONFIRMED RED: skipping the rewrite on ${biteSkipFile} produced ${closure1.escapingReferences.length} escaping reference(s), as expected.`);
    }
    return;
  }

  if (!closure1.zeroEscapes) {
    console.error('FAIL: closure 1 has escaping references — the rewrite is not complete over the transformed copy.');
    process.exitCode = 1;
  }
  const unverified = closure2.bareSpecifiers.filter((b) => b.classification === 'UNVERIFIED');
  if (unverified.length > 0) {
    console.error('FAIL: closure 2 has UNVERIFIED bare specifiers (neither a node builtin nor a declared dependency):', unverified);
    process.exitCode = 1;
  }
}

if (require.main === module) {
  main();
}
