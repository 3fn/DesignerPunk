#!/usr/bin/env node
/**
 * Stacy's coverage map + manifest generator (C12) — Spec 122 Task 8.2.
 *
 * design.md § "C12 — Stacy's provisioning: coverage map + audit commands": for every
 * generated surface (every emitted artifact + every canonical file), which checks guard it —
 * generated ROWS, DERIVED check globs (S-D1). A surface matching no check's globs is a
 * BLANK ROW (`checks: []`) — visible, never silently unlisted.
 *
 * **S-D1 — derive, never hand-declare.** Each check module exports a `surfaceGlobs()` that
 * its OWN reader code derives from (a shared constant, or the actual guarded-set function in
 * generate.ts's case). This module IMPORTS those same symbols — the manifest cannot drift
 * from what each check really reads, because there is exactly one symbol, two consumers. A
 * hand-declared glob written independently here could drift (over-broad → false green,
 * under-broad → false blank); deriving from the check's real computation makes the coverage
 * map's join trustworthy on both sides.
 *
 * Emits two files (wired into `generateAll` in generate.ts, guarded by C6 like every other
 * generated surface — a stale map FAILS the diff-guard):
 *   - `canonical/coverage-manifest.yaml` — check context → surface globs (the derived input).
 *   - `canonical/coverage-map.yaml` — surface → checks[] (the joined output; REPLACES the
 *     Task-1 placeholder stub).
 *
 * The CLI additionally asserts Stacy's audit bar (Req 22 AC4(b)): every blank row either
 * fails the run OR is covered by a recorded adjudication in `canonical/adjudications.yaml`
 * (`sweep: audit:coverage-map`, `key: <surface path>`) — reusing the sweeps' `common.ts`
 * adjudication machinery (C8's pattern, applied to this one additional check context).
 *
 * Traces to: Req 22 (roles, provisioning, coverage map), Req 19 AC3, design C12, C13 item 6.
 */

import * as fs from 'fs';
import * as path from 'path';
import { dump as dumpYaml } from 'js-yaml';
import { guardedRoots } from './generate';
import { listFilesUnder, isScaffolding } from './diff-guard';
import { parseAdjudications, type RecordedAdjudication } from './sweeps/common';

import { surfaceGlobs as canonicalVsTruthSurfaceGlobs } from './canonical-vs-truth';
import { surfaceGlobs as sweep1SurfaceGlobs } from './sweeps/sweep-1-refs';
import { surfaceGlobs as sweep2SurfaceGlobs } from './sweeps/sweep-2-skills';
import { surfaceGlobs as sweep3SurfaceGlobs } from './sweeps/sweep-3-dupes';
import { surfaceGlobs as sweep4SurfaceGlobs } from './sweeps/sweep-4-ambient';
import { surfaceGlobs as sweep5SurfaceGlobs } from './sweeps/sweep-5-corrected';
import { surfaceGlobs as sweep6SurfaceGlobs } from './sweeps/sweep-6-declarations';
import { surfaceGlobs as sweep7SurfaceGlobs } from './sweeps/sweep-7-dispositions';
import { surfaceGlobs as sweep8SurfaceGlobs } from './sweeps/sweep-8-demotion';

// ============================================================================
// The check-context name constants (the coverage map's fixed column set)
// ============================================================================

export const CHECK_CONTEXTS = [
  '122-diff-guard',
  '122-canonical-vs-truth',
  '122-sweep-1-refs',
  '122-sweep-2-skills',
  '122-sweep-3-dupes',
  '122-sweep-4-ambient',
  '122-sweep-5-corrected-state',
  '122-sweep-6-declarations',
  '122-sweep-7-dispositions',
  '122-sweep-8-demotion',
] as const;

export type CheckContext = (typeof CHECK_CONTEXTS)[number];

// ============================================================================
// The manifest: check context → surface globs, derived from each check's own symbol (S-D1)
// ============================================================================

export type CoverageManifest = Record<CheckContext, string[]>;

/**
 * The `122-diff-guard` check's surface globs (C12, S-D1): derived directly from
 * {@link guardedRoots} — the EXACT function C6's guard compares bidirectionally. A guarded
 * root that names a FILE (e.g. `canonical/coverage-map.yaml`) globs to itself (a directory
 * `/**` suffix would never match the file path); a directory root globs to `<root>/**`.
 * `listFilesUnder` (diff-guard.ts) applies the identical file-vs-dir distinction when
 * enumerating each root, so this stays consistent with what the guard actually compares.
 * Not a co-located constant: `guardedRoots()` already IS the shared symbol, imported here
 * and by diff-guard.ts itself.
 */
export function diffGuardSurfaceGlobs(repoRoot?: string): string[] {
  return guardedRoots(repoRoot).map((root) => (path.extname(root) ? root : `${root}/**`));
}

/**
 * Build the manifest by importing every check's `surfaceGlobs()` (or `guardedRoots()`-derived
 * equivalent for `122-diff-guard`). No glob here is hand-declared independently of the check
 * it describes — see the module header.
 */
export function buildCoverageManifest(repoRoot?: string): CoverageManifest {
  return {
    '122-diff-guard': diffGuardSurfaceGlobs(repoRoot),
    '122-canonical-vs-truth': canonicalVsTruthSurfaceGlobs(),
    '122-sweep-1-refs': sweep1SurfaceGlobs(),
    '122-sweep-2-skills': sweep2SurfaceGlobs(),
    '122-sweep-3-dupes': sweep3SurfaceGlobs(),
    '122-sweep-4-ambient': sweep4SurfaceGlobs(),
    '122-sweep-5-corrected-state': sweep5SurfaceGlobs(),
    '122-sweep-6-declarations': sweep6SurfaceGlobs(),
    '122-sweep-7-dispositions': sweep7SurfaceGlobs(),
    '122-sweep-8-demotion': sweep8SurfaceGlobs(),
  };
}

// ============================================================================
// Surface enumeration: every file under guardedRoots() + every file under canonical/
// ============================================================================

/**
 * Enumerate every generated/canonical surface: every file under {@link guardedRoots} PLUS
 * every file under `canonical/` (deduped, sorted, `.gitkeep` scaffolding excluded — same
 * exclusion diff-guard applies to the guarded surface).
 */
export function enumerateSurfaces(repoRoot: string): string[] {
  const fromGuardedRoots = guardedRoots(repoRoot).flatMap((root) => listFilesUnder(repoRoot, root));
  const fromCanonical = listFilesUnder(repoRoot, 'canonical');
  const all = new Set([...fromGuardedRoots, ...fromCanonical].filter((f) => !isScaffolding(f)));
  return [...all].sort();
}

// ============================================================================
// Glob matching (the same `**`/`*` translation canonical-vs-truth.ts's repoGlobResolver
// uses, reimplemented here as a pure path-matcher — no filesystem walk needed since surfaces
// are already enumerated).
// ============================================================================

/** Translate a `**`/`*` glob to an anchored RegExp over forward-slash relative paths. */
export function globToRegExp(glob: string): RegExp {
  let out = '';
  for (let i = 0; i < glob.length; i += 1) {
    const c = glob[i];
    if (c === '*') {
      if (glob[i + 1] === '*') {
        out += '.*';
        i += 1;
        if (glob[i + 1] === '/') i += 1; // consume the slash after `**/`.
      } else {
        out += '[^/]*';
      }
    } else if ('\\^$+?.()|[]{}'.includes(c)) {
      out += `\\${c}`;
    } else {
      out += c;
    }
  }
  return new RegExp(`^${out}$`);
}

/** True iff `surface` matches `glob` (both forward-slash repo-relative paths). */
export function matchesGlob(surface: string, glob: string): boolean {
  return globToRegExp(glob).test(surface);
}

// ============================================================================
// The coverage map: surface → checks[] (a surface matching no check's globs → checks: [])
// ============================================================================

export interface CoverageRow {
  surface: string;
  checks: string[];
}

/**
 * Join every enumerated surface against every check's manifest globs. A surface matching
 * NO check's globs gets `checks: []` — the VISIBLE blank row (never silently unlisted).
 */
export function buildCoverageMap(surfaces: readonly string[], manifest: CoverageManifest): CoverageRow[] {
  const contexts = Object.keys(manifest) as CheckContext[];
  return surfaces.map((surface) => {
    const checks = contexts.filter((ctx) => manifest[ctx].some((glob) => matchesGlob(surface, glob)));
    return { surface, checks };
  });
}

// ============================================================================
// Serialization (deterministic — sorted rows, generated-file header comment)
// ============================================================================

const MANIFEST_HEADER = `# coverage-manifest.yaml — GENERATED. Do not hand-edit (Spec 122 C12 / Task 8.2).
#
# Check context -> the surface globs that check's OWN reader code derives from (S-D1). Each
# glob here is imported from the check module's exported \`surfaceGlobs()\` (or the
# guardedRoots()-derived equivalent for 122-diff-guard) — never hand-declared independently,
# so this manifest cannot drift from what each check actually reads.
#
# Regenerate: npx tsx tools/agent-generator/coverage-map.ts (also runs as part of
# \`npx tsx tools/agent-generator/generate.ts\`). Guarded by the C6 diff-guard.
`;

const MAP_HEADER = `# coverage-map.yaml — GENERATED. Do not hand-edit (Req 22 AC4(b); C12 / Task 8.2).
#
# Every generated/canonical surface -> the check context(s) that guard it, joined from
# coverage-manifest.yaml's derived globs. A row with \`checks: []\` is a BLANK ROW: a surface
# with no guarding check — VISIBLE by construction, never silently unlisted. Stacy's audit
# (\`npm run audit:coverage-map\`) asserts zero blank rows, or a recorded adjudication per
# blank in canonical/adjudications.yaml (sweep: audit:coverage-map, key: <surface path>).
#
# Regenerate: npx tsx tools/agent-generator/coverage-map.ts (also runs as part of
# \`npx tsx tools/agent-generator/generate.ts\`). Guarded by the C6 diff-guard.
`;

export function serializeCoverageManifest(manifest: CoverageManifest): string {
  const ordered: Record<string, string[]> = {};
  for (const ctx of CHECK_CONTEXTS) ordered[ctx] = [...manifest[ctx]].sort();
  return MANIFEST_HEADER + dumpYaml(ordered, { sortKeys: true, lineWidth: -1 });
}

export function serializeCoverageMap(rows: readonly CoverageRow[]): string {
  const sortedRows = [...rows]
    .map((r) => ({ surface: r.surface, checks: [...r.checks].sort() }))
    .sort((a, b) => (a.surface < b.surface ? -1 : a.surface > b.surface ? 1 : 0));
  return MAP_HEADER + dumpYaml(sortedRows, { sortKeys: false, lineWidth: -1 });
}

// ============================================================================
// Blank-row / adjudication assertion (Stacy's audit bar, Req 22 AC4(b))
// ============================================================================

export const AUDIT_SWEEP_CONTEXT = 'audit:coverage-map';

export interface AuditResult {
  totalSurfaces: number;
  guardedSurfaces: number;
  blankSurfaces: number;
  adjudicatedBlanks: string[];
  unadjudicatedBlanks: string[];
  pass: boolean;
}

/** Assert every blank row is either absent (0 blanks) or covered by a recorded adjudication. */
export function auditCoverageMap(
  rows: readonly CoverageRow[],
  adjudications: readonly RecordedAdjudication[]
): AuditResult {
  const blanks = rows.filter((r) => r.checks.length === 0);
  const adjudicatedKeys = new Set(
    adjudications.filter((a) => a.sweep === AUDIT_SWEEP_CONTEXT).map((a) => a.key)
  );
  const adjudicatedBlanks = blanks.filter((b) => adjudicatedKeys.has(b.surface)).map((b) => b.surface);
  const unadjudicatedBlanks = blanks.filter((b) => !adjudicatedKeys.has(b.surface)).map((b) => b.surface);
  return {
    totalSurfaces: rows.length,
    guardedSurfaces: rows.length - blanks.length,
    blankSurfaces: blanks.length,
    adjudicatedBlanks: adjudicatedBlanks.sort(),
    unadjudicatedBlanks: unadjudicatedBlanks.sort(),
    pass: unadjudicatedBlanks.length === 0,
  };
}

// ============================================================================
// CLI — regenerate both files + run the audit (require.main only)
// ============================================================================

if (require.main === module) {
  const repoRoot = path.resolve(__dirname, '..', '..');

  const manifest = buildCoverageManifest(repoRoot);
  const surfaces = enumerateSurfaces(repoRoot);
  const rows = buildCoverageMap(surfaces, manifest);

  fs.writeFileSync(path.join(repoRoot, 'canonical', 'coverage-manifest.yaml'), serializeCoverageManifest(manifest));
  fs.writeFileSync(path.join(repoRoot, 'canonical', 'coverage-map.yaml'), serializeCoverageMap(rows));

  const adjudicationsText = (() => {
    try {
      return fs.readFileSync(path.join(repoRoot, 'canonical', 'adjudications.yaml'), 'utf8');
    } catch {
      return undefined;
    }
  })();
  const adjudications = parseAdjudications(adjudicationsText);

  const audit = auditCoverageMap(rows, adjudications);

  console.log(`audit:coverage-map: ${audit.pass ? 'PASS' : 'FAIL'}`);
  console.log(`  total surfaces      : ${audit.totalSurfaces}`);
  console.log(`  guarded             : ${audit.guardedSurfaces}`);
  console.log(`  blank               : ${audit.blankSurfaces}`);
  console.log(`  adjudicated-blank   : ${audit.adjudicatedBlanks.length}`);
  for (const key of audit.adjudicatedBlanks) console.log(`    [adjudicated] ${key}`);
  if (audit.unadjudicatedBlanks.length > 0) {
    console.log(`  UNADJUDICATED BLANK ROWS (${audit.unadjudicatedBlanks.length}):`);
    for (const key of audit.unadjudicatedBlanks) console.log(`    [FAIL] ${key}`);
  }

  process.exit(audit.pass ? 0 : 1);
}
