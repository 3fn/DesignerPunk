#!/usr/bin/env node
/**
 * Sweep 2 — skills round-trip (C8 row 2) — Spec 122 Task 7.1.
 *
 * design.md § C8, Req 8 AC1/AC2, Req 19: BOTH directions.
 *   Direction A (tree → map): every directory under `skills/` has EXACTLY one skills-map row
 *     (zero rows = unmapped skill; two+ = ambiguous mapping). Every row's `canonical` dir exists.
 *   Direction B (map → runtimes): every row's per-target emitted path satisfies that runtime's
 *     DISCOVERY CONTRACT —
 *       CC (D-A2): flat dir directly under `.claude/skills/`, `SKILL.md` present, frontmatter
 *       `name` present, and the activation `description` BYTE-EQUAL to the canonical
 *       `SKILL.md`'s description. CC discovery is description-DRIVEN: "non-empty" is weaker
 *       than "intact" — a truncated/altered description silently degrades activation.
 *       Kiro: the emitted path exists, and every generated `skill://` ref (from emitted Kiro
 *       configs of cutover-ledger agents) resolves to a mapped emitted path.
 *   An agent with `skills: []` → recorded PASS (`0 declared / 0 emitted`) as an INFO finding —
 *   visible, never silent (Req 8 AC2's transformed-references bar applies vacuously).
 *
 * Prove-it-bites (Req 19 AC2): mangle one row's `cc` path — see __tests__/sweep-2-skills.test.ts
 * and the Task 7.1 completion doc's recorded run.
 */

import * as fs from 'fs';
import * as path from 'path';
import { load as loadYaml } from 'js-yaml';
import { parseSkillsMap, skillKey, type SkillsMap } from '../skills';
import type { CanonicalAgentDoc } from '../schema';
import { parseCanonicalAgentSource } from '../source';
import {
  type SweepFinding,
  type SweepReport,
  assembleReport,
  repoRootFromHere,
  readFileIfExists,
  listCanonicalAgentFiles,
  exitWithReport,
} from './common';

export const SWEEP_2 = '122-sweep-2-skills';

// ============================================================================
// Injectable filesystem view
// ============================================================================

export interface SkillsFsView {
  /** Immediate child directory names of a repoRoot-relative dir ([] when absent). */
  listDirs(relDir: string): string[];
  /** True iff the repoRoot-relative path exists as a directory. */
  dirExists(relPath: string): boolean;
  /** File text for a repoRoot-relative path, undefined when absent. */
  readFile(relPath: string): string | undefined;
}

export function nodeSkillsFsView(repoRoot: string): SkillsFsView {
  return {
    listDirs(relDir: string): string[] {
      try {
        return fs
          .readdirSync(path.join(repoRoot, relDir), { withFileTypes: true })
          .filter((e) => e.isDirectory())
          .map((e) => e.name)
          .sort();
      } catch {
        return [];
      }
    },
    dirExists(relPath: string): boolean {
      try {
        return fs.statSync(path.join(repoRoot, relPath)).isDirectory();
      } catch {
        return false;
      }
    },
    readFile(relPath: string): string | undefined {
      try {
        return fs.readFileSync(path.join(repoRoot, relPath), 'utf8');
      } catch {
        return undefined;
      }
    },
  };
}

/** Parse a SKILL.md's YAML frontmatter (`name`, `description`), undefined when malformed. */
export function parseSkillFrontmatter(
  text: string
): { name?: string; description?: string } | undefined {
  const m = text.match(/^---\n([\s\S]*?)\n---/);
  if (!m) return undefined;
  try {
    const fm = loadYaml(m[1]) as Record<string, unknown> | null;
    return {
      name: typeof fm?.name === 'string' ? fm.name : undefined,
      description: typeof fm?.description === 'string' ? fm.description : undefined,
    };
  } catch {
    return undefined;
  }
}

// ============================================================================
// Inputs
// ============================================================================

export interface Sweep2Inputs {
  skillsMap: SkillsMap;
  fs: SkillsFsView;
  /** Canonical agent docs (for the `skills: []` recorded-PASS and declared-key checks). */
  docs: CanonicalAgentDoc[];
  /**
   * Generated `skill://` refs from EMITTED Kiro configs of cutover-ledger agents, as
   * `{ agent, ref }`. Pre-cutover this is empty (no emitted configs exist yet).
   */
  emittedKiroSkillRefs: Array<{ agent: string; ref: string }>;
}

// ============================================================================
// The sweep
// ============================================================================

export function runSweep2(inputs: Sweep2Inputs): SweepReport {
  const findings: SweepFinding[] = [];
  const rows = inputs.skillsMap.rows;

  // --- Direction A: skills/ tree ↔ map rows, exactly-one each way.
  const dirNames = inputs.fs.listDirs(SKILLS_ROOT);
  for (const dir of dirNames) {
    const matching = rows.filter((r) => r.canonical === `${SKILLS_ROOT}/${dir}`);
    if (matching.length !== 1) {
      findings.push({
        verdict: 'FAIL',
        path: `${SKILLS_ROOT}/${dir}`,
        observed: `${matching.length} skills-map rows reference this directory`,
        expected: 'every skills/ directory has EXACTLY one skills-map row',
        owner: 'thurgood',
      });
    }
  }
  rows.forEach((row, ri) => {
    if (!inputs.fs.dirExists(row.canonical)) {
      findings.push({
        verdict: 'FAIL',
        path: `skills-map rows[${ri}] (${row.canonical})`,
        observed: `canonical path "${row.canonical}" does not exist as a directory`,
        expected: 'every row canonical path exists under skills/',
        owner: row.owners[0] ?? 'thurgood',
      });
    }
  });

  // --- Direction B, CC leg (D-A2): flat dir + SKILL.md + name + byte-equal description.
  rows.forEach((row, ri) => {
    const owner = row.owners[0] ?? 'thurgood';
    const rowPath = `skills-map rows[${ri}] (${skillKey(row)})`;

    const ccRel = row.targets.cc;
    // Flat-dir check anchored to CC_SKILLS_ROOT (the S-D1 shared constant, not a parallel literal).
    const flat = new RegExp(`^${CC_SKILLS_ROOT.replace(/[.\\/]/g, '\\$&')}/[^/]+$`).test(ccRel);
    if (!flat) {
      findings.push({
        verdict: 'FAIL',
        path: rowPath,
        observed: `cc target "${ccRel}" is not a flat dir directly under .claude/skills/`,
        expected: 'CC discovery contract: flat dir + SKILL.md + activation description intact (D-A2)',
        owner,
      });
      return;
    }
    if (!inputs.fs.dirExists(ccRel)) {
      findings.push({
        verdict: 'FAIL',
        path: rowPath,
        observed: `cc target "${ccRel}" does not exist`,
        expected: 'the emitted CC skill dir exists',
        owner,
      });
      return;
    }
    const ccSkillMd = inputs.fs.readFile(`${ccRel}/SKILL.md`);
    if (ccSkillMd === undefined) {
      findings.push({
        verdict: 'FAIL',
        path: rowPath,
        observed: `"${ccRel}/SKILL.md" is missing`,
        expected: 'CC discovery contract requires SKILL.md in the flat skill dir',
        owner,
      });
      return;
    }
    const canonicalSkillMd = inputs.fs.readFile(`${row.canonical}/SKILL.md`);
    const ccFm = parseSkillFrontmatter(ccSkillMd);
    const canonicalFm = canonicalSkillMd === undefined ? undefined : parseSkillFrontmatter(canonicalSkillMd);
    if (!ccFm?.name) {
      findings.push({
        verdict: 'FAIL',
        path: rowPath,
        observed: `"${ccRel}/SKILL.md" frontmatter carries no \`name\``,
        expected: 'CC discovery contract requires frontmatter name',
        owner,
      });
    }
    if (canonicalFm?.description === undefined) {
      findings.push({
        verdict: 'FAIL',
        path: rowPath,
        observed: `canonical "${row.canonical}/SKILL.md" is missing or carries no \`description\``,
        expected: 'the canonical SKILL.md carries the activation description of record',
        owner,
      });
    } else if (ccFm?.description !== canonicalFm.description) {
      findings.push({
        verdict: 'FAIL',
        path: rowPath,
        observed: `emitted CC description is NOT byte-equal to canonical (emitted: ${JSON.stringify(ccFm?.description?.slice(0, 80) ?? '<missing>')}…)`,
        expected: 'activation description BYTE-EQUAL to canonical — CC discovery is description-driven (D-A2)',
        owner,
      });
    }

    // Kiro leg: the emitted path exists.
    if (!inputs.fs.dirExists(row.targets.kiro)) {
      findings.push({
        verdict: 'FAIL',
        path: rowPath,
        observed: `kiro target "${row.targets.kiro}" does not exist`,
        expected: 'the emitted Kiro skill dir exists',
        owner,
      });
    }
  });

  // --- Direction B, Kiro refs leg: every generated skill:// ref resolves to a mapped path.
  const kiroPaths = new Set(rows.map((r) => `skill://${r.targets.kiro}/SKILL.md`));
  for (const { agent, ref } of inputs.emittedKiroSkillRefs) {
    if (!kiroPaths.has(ref)) {
      findings.push({
        verdict: 'FAIL',
        agent,
        path: ref,
        observed: `generated skill:// ref does not resolve to any skills-map row's emitted Kiro path`,
        expected: `one of: ${[...kiroPaths].sort().join(', ') || '<no rows>'}`,
        owner: 'thurgood',
      });
    }
  }

  // --- Declared keys resolve + the `skills: []` recorded PASS.
  const knownKeys = new Set(rows.map(skillKey));
  for (const doc of inputs.docs) {
    const agent = doc.frontmatter.agent;
    const declared = doc.frontmatter.skills ?? [];
    if (declared.length === 0) {
      findings.push({
        verdict: 'INFO',
        agent,
        path: 'skills',
        observed: 'recorded PASS: 0 declared / 0 emitted',
        expected: 'an agent with skills: [] records a PASS, never a silent skip',
        owner: agent,
      });
      continue;
    }
    declared.forEach((key, ki) => {
      if (!knownKeys.has(key)) {
        findings.push({
          verdict: 'FAIL',
          agent,
          path: `skills[${ki}]`,
          observed: `declared skill key "${key}" has no skills-map row`,
          expected: `known keys: ${[...knownKeys].sort().join(', ') || '<none>'}`,
          owner: agent,
        });
      }
    });
  }

  return assembleReport(SWEEP_2, findings);
}

// ============================================================================
// CLI wiring
// ============================================================================

/** Extract `skill://` refs from an emitted Kiro config JSON text (object entries — rich
 * knowledgeBases — are not skill refs and are skipped). */
export function extractKiroSkillRefs(configText: string): string[] {
  const parsed = JSON.parse(configText) as { resources?: Array<string | object> };
  return (parsed.resources ?? []).filter((r): r is string => typeof r === 'string' && r.startsWith('skill://'));
}

/**
 * The skills-map path, repo-relative — exported so the coverage-map generator's
 * {@link surfaceGlobs} shares the SAME constant `main()` reads (S-D1).
 */
export const SKILLS_MAP_PATH = 'canonical/shared/skills-map.yaml';

/**
 * The three skill-tree roots this sweep reads (S-D1 shared constants — Stacy's Task 8.2
 * routed item 1: hoisted from `surfaceGlobs()` literals so the reader code and the
 * coverage manifest consume ONE symbol each). `SKILLS_ROOT` drives Direction A's tree scan
 * (`listDirs`); the two target roots anchor Direction B's discovery-contract checks
 * (`CC_SKILLS_ROOT` in the flat-dir regex; `KIRO_SKILLS_ROOT` via the skills-map targets).
 */
export const SKILLS_ROOT = 'skills';
export const CC_SKILLS_ROOT = '.claude/skills';
export const KIRO_SKILLS_ROOT = '.kiro/skills';

/**
 * The `122-sweep-2-skills` check's surface globs (C12, S-D1): the neutral `skills/` root
 * (Direction A tree scan), both emitted target roots (Direction B), {@link SKILLS_MAP_PATH},
 * and `canonical/agents/**` (the declared-key + `skills: []` recorded-PASS leg).
 */
export function surfaceGlobs(): string[] {
  return [`${SKILLS_ROOT}/**`, `${CC_SKILLS_ROOT}/**`, `${KIRO_SKILLS_ROOT}/**`, SKILLS_MAP_PATH, 'canonical/agents/**'];
}

function main(): void {
  const repoRoot = repoRootFromHere();
  const mapText = readFileIfExists(path.join(repoRoot, SKILLS_MAP_PATH));
  const skillsMap = mapText ? parseSkillsMap(mapText) : { rows: [] };
  const docs = listCanonicalAgentFiles(repoRoot).map((f) =>
    parseCanonicalAgentSource(readFileIfExists(f) ?? '', f)
  );

  // Emitted Kiro configs exist only for cutover-ledger agents; pre-cutover the ledger is
  // empty and this list is too (the hand-maintained .kiro/agents/*.json are NOT emitted
  // artifacts — they enter the sweep's scope per-agent at cutover).
  const emittedKiroSkillRefs: Array<{ agent: string; ref: string }> = [];
  const { parseCutoverLedger } = require('../generate') as typeof import('../generate');
  let ledger: string[] = [];
  try {
    ledger = parseCutoverLedger(
      readFileIfExists(path.join(repoRoot, 'canonical', 'cutover-ledger.yaml')) ?? ''
    );
  } catch {
    ledger = [];
  }
  for (const agent of ledger) {
    const configText = readFileIfExists(path.join(repoRoot, '.kiro', 'agents', `${agent}.json`));
    if (configText) {
      for (const ref of extractKiroSkillRefs(configText)) emittedKiroSkillRefs.push({ agent, ref });
    }
  }

  const report = runSweep2({
    skillsMap,
    fs: nodeSkillsFsView(repoRoot),
    docs,
    emittedKiroSkillRefs,
  });
  exitWithReport(report);
}

if (require.main === module) {
  main();
}
