/**
 * SkillsMap resolution + per-target skill-tree emit (C2.2) — Spec 122 Task 3.2.
 *
 * design.md § "C2 — Shared substrate files": `canonical/shared/skills-map.yaml` is the
 * explicit, CANONICAL-KEYED mapping table (Req 8 AC1/AC2) — one row per skill, keyed by the
 * skill's home under the neutral top-level `skills/` root, carrying its per-target physical
 * path (`targets.cc` / `targets.kiro`) and `owners`. This is deliberately NOT a kiro→cc (or
 * cc→kiro) keyed table: canonical is the single source of truth both targets are generated
 * FROM, so neither target's path vocabulary is privileged as the lookup key (Req 9, Req 14).
 *
 * Agents reference skills by row key only (C1 `skills:` lists keys like `theming-styles`),
 * never by physical path (design.md's C1 authoring rule) — {@link resolveSkillRow} is the
 * key -> row lookup every adapter goes through, and {@link kiroSkillRef} / {@link ccSkillRef}
 * are the per-target reference-syntax renderers (Req 11 AC2/AC5, Req 12 AC4, Req 13 AC2):
 *   - Kiro references a skill by PATH: `skill://<targets.kiro>/SKILL.md` (the live form
 *     already checked into `.kiro/agents/data.json`).
 *   - Claude Code references a skill by flat NAME via the `Skill` tool — the basename of
 *     `targets.cc`. This equals the SKILL.md frontmatter `name` for 4 of the 5 rows; the
 *     `impeccable` row's SKILL.md declares `name: impeccable-dp` (diverging from its
 *     `targets.cc` basename `impeccable`) — a pre-existing hand-authored mismatch this task
 *     does not resolve. `ccSkillRef` follows the mechanically-derivable rule (basename of
 *     `targets.cc`, per design C2.2), not the frontmatter, since the map — not SKILL.md
 *     prose — is the resolvable source of truth; flagged here for Lina/Data to reconcile.
 *
 * Per-target skill-tree emission (regenerating BOTH `.claude/skills/**` and `.kiro/skills/**`
 * from the canonical `skills/**` trees, Req 8 AC3, Req 14) is handled by each adapter's own
 * `emitSkills` (see `adapters/cc.ts`, `adapters/kiro.ts`) — this module supplies the shared
 * SkillsMap parsing and per-target reference-syntax renderers those adapters go through. A
 * prior standalone `emitSkillTrees` helper duplicating that emit path was retired as dead
 * code (chore, 2026-09-30): both targets were already produced via `emitSkills`, so the
 * second copy-over-existing sweep here was never called in the live pipeline.
 *
 * Traces to: Req 8 AC1/AC2/AC3, Req 9, Req 11 AC2/AC5, Req 12 AC4, Req 13 AC2, Req 14;
 * design.md C2.2, C4.
 */

import * as path from 'path';
import { load as loadYaml } from 'js-yaml';

// ============================================================================
// SkillsMap parsing (C2.2)
// ============================================================================

export interface SkillsMapRow {
  /** The neutral canonical home, e.g. `skills/theming-styles` — the row's lookup key source. */
  canonical: string;
  targets: {
    /** The `.claude/skills/**` physical path. */
    cc: string;
    /** The `.kiro/skills/**` physical path (may nest deeper than the canonical basename). */
    kiro: string;
  };
  /** Domain owners (agent names) who adjudicate this skill's content. */
  owners: string[];
}

export interface SkillsMap {
  rows: SkillsMapRow[];
}

/** Parse `canonical/shared/skills-map.yaml` text into its row list (pure; tolerates `rows: []`). */
export function parseSkillsMap(yamlText: string): SkillsMap {
  const parsed = loadYaml(yamlText) as { rows?: SkillsMapRow[] } | null;
  return { rows: parsed?.rows ?? [] };
}

// ============================================================================
// Key resolution (C1 `skills:` lookup)
// ============================================================================

/**
 * The row key agents reference from C1 `skills:` lists — the basename of `row.canonical`
 * (e.g. `skills/theming-styles` -> `theming-styles`).
 */
export function skillKey(row: SkillsMapRow): string {
  return path.basename(row.canonical);
}

/**
 * Resolve a C1 `skills:` key to its row. Throws loudly on a miss, naming both the sought key
 * and the full set of known keys (design § Error Handling: fail loud, name what was sought —
 * never silently return undefined for a downstream adapter to mishandle).
 */
export function resolveSkillRow(map: SkillsMap, key: string): SkillsMapRow {
  const row = map.rows.find((r) => skillKey(r) === key);
  if (!row) {
    const known = map.rows.map(skillKey).sort().join(', ');
    throw new Error(`resolveSkillRow: no skills-map row for key "${key}" (known keys: ${known || '<none>'})`);
  }
  return row;
}

// ============================================================================
// Per-target reference syntax (Req 11 AC2/AC5, Req 12 AC4, Req 13 AC2)
// ============================================================================

/**
 * Kiro's skill reference syntax: `skill://<targets.kiro>/SKILL.md` — matches the live form
 * already checked into `.kiro/agents/data.json` (e.g.
 * `skill://.kiro/skills/android/edge-to-edge/SKILL.md`).
 */
export function kiroSkillRef(row: SkillsMapRow): string {
  return `skill://${row.targets.kiro}/SKILL.md`;
}

/**
 * Claude Code's Skill-tool reference form: the flat skill NAME — the basename of
 * `targets.cc`. CC skills are invoked by name via the `Skill` tool, never by path.
 */
export function ccSkillRef(row: SkillsMapRow): string {
  return path.basename(row.targets.cc);
}
