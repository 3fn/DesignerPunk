#!/usr/bin/env node
/**
 * Sweep 1 — reference-resolution (C8 row 1) — Spec 122 Task 7.1.
 *
 * design.md § C8: for every canonical id/section ref (law, routes, crossRefs): resolve via
 * the running docs MCP (interim section form, Req 3 AC2 — id resolves AND verbatim heading
 * exists). Repo-file § refs (shared-catalog `source`/`crossRef`) resolve against the
 * filesystem (file exists + heading present). Also asserts ZERO occurrences of retired tool
 * names (`get_documentation_map`) and retired runtimes (`ts-node`) in canonical authored
 * source + templates (Req 3 AC3, Req 5 AC2).
 *
 * Retired-name scan semantics: a mention in a NEGATION context (a demotion-style cue must
 * NAME the thing it retires — same principle as sweep 8's negatives) is exempted ONLY by an
 * explicit `retired-mention-ok(<reason>)` annotation on the same or immediately preceding
 * line. No annotation → FAIL. Scan scope is AUTHORED canonical source (`canonical/agents`,
 * `canonical/shared`) + the emission templates (`render.ts`, `adapters/*.ts`) — NOT the
 * introspected/generated artifacts (`canonical/registry`, `canonical/manifests`,
 * `canonical/baselines`, `canonical/_fixture-output`), which mirror external truth (e.g. the
 * live find_docs description says "Supersedes get_documentation_map") and are kept honest by
 * C6/C7, not by this scan.
 *
 * INTERIM crossRef enumeration (Peter, 2026-07-10): a shared-catalog member with
 * `crossRefStatus: interim` resolves like any other ref AND is emitted as an INFO finding in
 * EVERY run report — the standing-visibility backstop that keeps an interim target (e.g.
 * record-first-ratification → ballots README until 125-B's classification map exists) from
 * becoming silently permanent. See
 * `.kiro/specs/125-mechanical-enforcement-strategy/inbound-to-125-B-from-122.md`.
 *
 * Prove-it-bites (Req 19 AC2): induce a bogus doc id — see __tests__/sweep-1-refs.test.ts
 * and the Task 7.1 completion doc's recorded live run.
 */

import * as path from 'path';
import type { CorpusClient } from '../resolve';
import { CorpusResolver, describeUnresolved, createStdioDocsClient } from '../resolve';
import type { CanonicalAgentDoc } from '../schema';
import { parseCanonicalAgentSource } from '../source';
import { parseSharedCatalog, type SharedCatalogMember } from '../adapters/index';
import {
  type SweepFinding,
  type SweepReport,
  assembleReport,
  parseRepoSectionRef,
  resolveRepoSectionRef,
  repoRootFromHere,
  readFileIfExists,
  listCanonicalAgentFiles,
  exitWithReport,
} from './common';

export const SWEEP_1 = '122-sweep-1-refs';

/** The retired names this sweep asserts to zero (Req 3 AC3: tool; Req 5 AC2: runtime). */
export const RETIRED_NAMES: readonly string[] = ['get_documentation_map', 'ts-node'];

/** The explicit exemption annotation for a legitimate negation-context mention. */
export const RETIRED_MENTION_OK = /retired-mention-ok\(/;

// ============================================================================
// Inputs (injectable — fakes in tests, real repo in the CLI)
// ============================================================================

export interface Sweep1Inputs {
  /** Parsed canonical agent docs (law + routes refs). */
  docs: CanonicalAgentDoc[];
  /** The running docs-MCP surface. */
  corpus: CorpusClient;
  /** Parsed shared-catalog members (source/crossRef repo-file refs + interim enumeration). */
  sharedCatalog: readonly SharedCatalogMember[];
  /** Scan-scope files for the retired-name scan: repoRoot-relative path → file text. */
  scanFiles: Readonly<Record<string, string>>;
  /** Repo root (repo-file § ref resolution). */
  repoRoot: string;
  /** Injectable file reader for repo-file § refs (tests). */
  readFile?: (absPath: string) => string | undefined;
}

// ============================================================================
// The sweep
// ============================================================================

export async function runSweep1(inputs: Sweep1Inputs): Promise<SweepReport> {
  const findings: SweepFinding[] = [];
  const resolver = new CorpusResolver(inputs.corpus);

  // --- Leg 1: canonical law + route refs resolve via the docs MCP (interim section form).
  for (const doc of inputs.docs) {
    const agent = doc.frontmatter.agent;

    const lawEntries = doc.frontmatter.ambient?.governanceAsLaw ?? [];
    for (let ei = 0; ei < lawEntries.length; ei += 1) {
      const entry = lawEntries[ei];
      for (let ci = 0; ci < entry.assert.length; ci += 1) {
        const claim = entry.assert[ci];
        const resolution = await resolver.resolveSection(entry.id, claim.section);
        const failure = describeUnresolved(resolution);
        if (failure) {
          findings.push({
            verdict: 'FAIL',
            agent,
            path: `ambient.governanceAsLaw[${ei}].assert[${ci}]`,
            observed: failure,
            expected: `id "${entry.id}" resolves AND verbatim heading "${claim.section}" exists (Req 3 AC2)`,
            owner: entry.owner,
          });
        }
      }
    }

    const docRoutes = doc.frontmatter.routes?.docs ?? [];
    for (let ri = 0; ri < docRoutes.length; ri += 1) {
      const route = docRoutes[ri];
      const resolution = await resolver.resolveSection(route.doc, route.section);
      const failure = describeUnresolved(resolution);
      if (failure) {
        findings.push({
          verdict: 'FAIL',
          agent,
          path: `routes.docs[${ri}]`,
          observed: failure,
          expected: `route doc "${route.doc}" resolves AND verbatim heading "${route.section}" exists`,
          owner: agent,
        });
      }
    }
  }

  // --- Leg 2: shared-catalog repo-file § refs (source + crossRef) resolve on disk.
  inputs.sharedCatalog.forEach((member, mi) => {
    for (const field of ['source', 'crossRef'] as const) {
      const ref = member[field];
      if (!ref) continue;
      const parsed = parseRepoSectionRef(ref);
      if (!parsed) {
        findings.push({
          verdict: 'FAIL',
          path: `sharedCatalog[${mi}].${field}`,
          observed: `ref "${ref}" is not a parseable \`<path> § "<heading>"\` / bare-path ref`,
          expected: `member "${member.id}" ${field} parses and resolves`,
          owner: member.owner ?? 'thurgood',
        });
        continue;
      }
      const failure = resolveRepoSectionRef(parsed, inputs.repoRoot, inputs.readFile);
      if (failure) {
        findings.push({
          verdict: 'FAIL',
          path: `sharedCatalog[${mi}].${field}`,
          observed: failure,
          expected: `member "${member.id}" ${field} → "${ref}" resolves (file exists + heading present)`,
          owner: member.owner ?? 'thurgood',
        });
      }
    }

    // Interim enumeration — INFO on every run, never a failure (visibility backstop).
    if (member.crossRefStatus === 'interim') {
      findings.push({
        verdict: 'INFO',
        path: `sharedCatalog[${mi}].crossRef`,
        observed: `INTERIM crossRef target: "${member.crossRef}" — resolve when: ${member.crossRefResolveWhen ?? '<no resolveWhen recorded>'}`,
        expected: 'interim targets are enumerated in every sweep-1 report until re-pointed',
        owner: member.owner ?? 'thurgood',
      });
    }
  });

  // --- Leg 3: retired-name scan (zero occurrences in authored canonical source + templates).
  for (const [relPath, text] of Object.entries(inputs.scanFiles)) {
    const lines = text.split('\n');
    lines.forEach((line, i) => {
      for (const retired of RETIRED_NAMES) {
        if (!line.includes(retired)) continue;
        const exempt = RETIRED_MENTION_OK.test(line) || (i > 0 && RETIRED_MENTION_OK.test(lines[i - 1]));
        if (!exempt) {
          findings.push({
            verdict: 'FAIL',
            path: `${relPath}:${i + 1}`,
            observed: `retired name "${retired}" occurs without a retired-mention-ok(<reason>) annotation`,
            expected: `zero unannotated occurrences of ${RETIRED_NAMES.map((n) => `"${n}"`).join(' / ')} in canonical source + templates (Req 3 AC3, Req 5 AC2)`,
            owner: 'thurgood',
          });
        }
      }
    });
  }

  return assembleReport(SWEEP_1, findings);
}

// ============================================================================
// CLI wiring (require.main only)
// ============================================================================

/**
 * The (dir, endsWith-suffixes, glob) triples `collectScanFiles` reads — exported so the
 * coverage-map generator's {@link surfaceGlobs} derives from the SAME scope this sweep's
 * reader consumes (S-D1). `suffixes` drives the reader's `name.endsWith(...)` filter exactly
 * as before; `glob` is the equivalent one-level glob for the coverage-map join (the reader
 * is non-recursive — `fs.readdirSync` on the dir only — so no `**` is needed here).
 */
export const SCAN_SCOPE: ReadonlyArray<{ dir: string; suffixes: readonly string[]; glob: string }> = [
  { dir: 'canonical/agents', suffixes: ['.md'], glob: 'canonical/agents/*.md' },
  { dir: 'canonical/shared', suffixes: ['.yaml'], glob: 'canonical/shared/*.yaml' },
  { dir: 'tools/agent-generator', suffixes: ['render.ts'], glob: 'tools/agent-generator/*render.ts' },
  { dir: 'tools/agent-generator/adapters', suffixes: ['.ts'], glob: 'tools/agent-generator/adapters/*.ts' },
];

/** Collect the production retired-name scan scope (authored canonical + templates). */
export function collectScanFiles(repoRoot: string): Record<string, string> {
  const fs = require('fs') as typeof import('fs');
  const out: Record<string, string> = {};
  const addDir = (relDir: string, suffixes: readonly string[]): void => {
    const abs = path.join(repoRoot, relDir);
    let entries: string[];
    try {
      entries = fs.readdirSync(abs);
    } catch {
      return;
    }
    for (const name of entries) {
      if (suffixes.some((e) => name.endsWith(e))) {
        out[`${relDir}/${name}`] = fs.readFileSync(path.join(abs, name), 'utf8');
      }
    }
  };
  for (const scope of SCAN_SCOPE) addDir(scope.dir, scope.suffixes);
  return out;
}

/**
 * The `122-sweep-1-refs` check's surface globs (C12, S-D1): every {@link SCAN_SCOPE} glob
 * PLUS `canonical/shared/shared-catalog.yaml` (already covered by the `canonical/shared`
 * scope's glob, named explicitly here too since this sweep's crossRef leg (leg 2) reads it
 * for a DIFFERENT purpose than the retired-name scan — the design's stated requirement).
 */
export function surfaceGlobs(): string[] {
  return [...SCAN_SCOPE.map((scope) => scope.glob), 'canonical/shared/shared-catalog.yaml'];
}

async function main(): Promise<void> {
  const repoRoot = repoRootFromHere();
  const docs = listCanonicalAgentFiles(repoRoot).map((f) =>
    parseCanonicalAgentSource(readFileIfExists(f) ?? '', f)
  );
  const catalogText = readFileIfExists(path.join(repoRoot, 'canonical', 'shared', 'shared-catalog.yaml'));
  const sharedCatalog = catalogText ? parseSharedCatalog(catalogText) : [];

  const corpus = createStdioDocsClient();
  try {
    const report = await runSweep1({
      docs,
      corpus,
      sharedCatalog,
      scanFiles: collectScanFiles(repoRoot),
      repoRoot,
    });
    exitWithReport(report);
  } finally {
    await corpus.close();
  }
}

if (require.main === module) {
  main().catch((error) => {
    console.error('[sweep-1-refs] Fatal error:', error);
    process.exit(1);
  });
}
