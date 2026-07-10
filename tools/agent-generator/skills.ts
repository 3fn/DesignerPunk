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
 * {@link emitSkillTrees} regenerates BOTH `.claude/skills/**` and `.kiro/skills/**` from the
 * canonical `skills/**` trees (Req 8 AC3, Req 14): a byte-identical recursive copy per row,
 * SKILL.md content (including the activation `description`) preserved verbatim — the
 * "sweep-2 CC discovery contract" needs the frontmatter description untouched for Claude
 * Code's auto-discovery to key on it. `.claude/skills/**` was already hand-maintained
 * byte-identical to `skills/**` before this task, so a correct emit produces ZERO diff
 * there — `git status --porcelain .claude/skills` staying empty is a correctness SIGNAL for
 * this function, not a coincidence to explain away.
 *
 * Scope note: this emit is copy-over-existing, NOT a delete-then-copy sweep. Stale files at
 * a target that are no longer present in canonical (a skill file removed upstream) are left
 * behind by this function on purpose — the design's C6 regenerate-and-diff guard is what
 * catches that drift (it regenerates into a disposable temp tree and diffs, so a stale
 * leftover at the real target shows up there, not here). Building a deleter into the emit
 * path is out of scope for this task.
 *
 * Traces to: Req 8 AC1/AC2/AC3, Req 9, Req 11 AC2/AC5, Req 12 AC4, Req 13 AC2, Req 14;
 * design.md C2.2, C4.
 */

import * as fs from 'fs';
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

// ============================================================================
// Per-target skill-tree emit (Req 8 AC3, Req 14)
// ============================================================================

export interface EmitSkillTreesResult {
  /** Every file written, in emit order (repoRoot-relative paths), for logging/diffing. */
  written: string[];
  /** The targets emitted into — always both, for every row. */
  targets: Array<'cc' | 'kiro'>;
}

/** Recursively copy `srcDir` into `destDir`, byte-identical, creating parent dirs as needed. */
function copyTreeSync(srcDir: string, destDir: string, written: string[], repoRoot: string): void {
  fs.mkdirSync(destDir, { recursive: true });
  for (const entry of fs.readdirSync(srcDir, { withFileTypes: true })) {
    const srcPath = path.join(srcDir, entry.name);
    const destPath = path.join(destDir, entry.name);
    if (entry.isDirectory()) {
      copyTreeSync(srcPath, destPath, written, repoRoot);
    } else if (entry.isFile()) {
      fs.mkdirSync(path.dirname(destPath), { recursive: true });
      fs.copyFileSync(srcPath, destPath);
      written.push(path.relative(repoRoot, destPath));
    }
    // symlinks are not expected under skills/**; intentionally unhandled.
  }
}

/**
 * Emit every row's canonical skill tree into BOTH its `targets.cc` and `targets.kiro` paths,
 * byte-identical, recursively (bundled scripts/reference subdirs travel as-is; nothing is
 * transformed). Rows are processed SORTED by `canonical` path for deterministic `written`
 * ordering (P1). Copy-over-existing — see the file header's scope note on stale files.
 */
export function emitSkillTrees(map: SkillsMap, repoRoot: string): EmitSkillTreesResult {
  const written: string[] = [];
  const rows = [...map.rows].sort((a, b) => (a.canonical < b.canonical ? -1 : a.canonical > b.canonical ? 1 : 0));

  for (const row of rows) {
    const srcDir = path.resolve(repoRoot, row.canonical);
    for (const targetKey of ['cc', 'kiro'] as const) {
      const destDir = path.resolve(repoRoot, row.targets[targetKey]);
      copyTreeSync(srcDir, destDir, written, repoRoot);
    }
  }

  return { written, targets: ['cc', 'kiro'] };
}
