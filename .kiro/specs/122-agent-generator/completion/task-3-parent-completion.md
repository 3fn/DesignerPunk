# Task 3 Completion — Skills pipeline: neutral-root relocation + skills-map round-trip

**Spec**: 122 — Agent Generator
**Unit**: U1 (Substrate) — parent inside a multi-parent unit; **no PR at this completion** (U1's PR opens at Task 8).
**Type**: Parent
**Date**: 2026-07-09
**Branch**: `task/122-substrate`

---

## What was built

### 3.1 — Neutral-root relocation + skills-map population (Setup)
- **5 canonical skills relocated** (`git mv`, history preserved) from `.kiro/skills/**` into the neutral `skills/` root: `adaptive`, `edge-to-edge`, `navigation-3`, `theming-styles`, `impeccable` (bundled `scripts/` + `reference/` dirs travel as-is — 97 tracked files).
- **`canonical/shared/skills-map.yaml` populated**: 5 canonical-keyed rows (Req 8 AC1 — NOT kiro→cc keyed) with per-target paths + owners (`data` ×4, `leonardo` for impeccable). Kiro targets preserve today's nested paths (`.kiro/skills/android/...`, incl. the nested `theming/styles`) so every existing `skill://` ref resolves after re-emit; CC targets are the flat `.claude/skills/<name>` dirs. Header de-skeletoned (round-trip now 5↔5).

### 3.2 — SkillsMap resolution + per-target emit (Implementation)
- **`tools/agent-generator/skills.ts`**: `parseSkillsMap`, `skillKey` (basename of canonical — the C1 `skills:` row key), `resolveSkillRow` (loud miss naming sought key + known keys), `kiroSkillRef` (`skill://<kiro path>/SKILL.md`, the live `data.json` form), `ccSkillRef` (flat CC Skill-tool name = basename of `targets.cc`), `emitSkillTrees` (sorted-by-canonical deterministic recursive byte-identical copy into BOTH targets; copy-over-existing — stale-file cleanup is deliberately C6's concern, not a hidden deleter).
- **The named crux test** (design § Testing Strategy): the `theming/styles` → `theming-styles` transform — nested Kiro path ↔ flat canonical/CC key — covered explicitly in `__tests__/skills.test.ts`, plus parse-against-the-real-map, loud-miss, and temp-dir emit determinism tests.
- **Real emit run**: `.kiro/skills/**` regenerated from the map (97 files at exactly the mapped nested paths); `.claude/skills/**` re-emitted with **zero diff**.

## Dispositions encoded (owner confirmation due at U1's PR)

1. **`.kiro/skills/android/SKILL.md` DELETED** — an unreferenced index/umbrella ("Each subdirectory is a standalone skill"; zero agent-config references, verified). Not a skill; `skills-map.yaml` supersedes it as the authoritative index. *(Confirm: Data/Lina.)*
2. **`theming-styles` drift resolved to the flat name** — the two runtimes had drifted by exactly the frontmatter `name:` line (Kiro `styles` vs CC `theming-styles`): the design's named crux transform, found live. Canonical carries `name: theming-styles`; the Kiro re-emit carries the flat name at the unchanged nested path (Kiro's sweep-2 contract is path/skill://-resolution, not the name field). *(Confirm: Data.)*
3. **`impeccable` name mismatch FLAGGED, not resolved** (3.2 agent's catch): `skills/impeccable/SKILL.md` declares `name: impeccable-dp` while its CC dir basename is `impeccable` — a pre-existing hand-authored mismatch. `ccSkillRef` follows the mechanically-derivable rule (basename of `targets.cc`), which matches how CC actually surfaces the skill today. *(Reconcile: Leonardo/Lina — either rename the frontmatter or the map row, at or before U1's PR.)*

## Verification (main-loop, Fable 5)

- **Subagent work independently re-verified** (delegate-then-verify, placement included): branch confirmed `task/122-substrate`; all 5 canonical trees byte-identical to `.claude/skills` copies (diff -rq, each); **zero diff under `.claude/skills/**` after the real emit** — the standing correctness signal (canonical was made byte-identical in 3.1, so any CC-emit diff = an unwanted transform); nested `theming/styles` and `impeccable` Kiro emits diff-identical to canonical; all 4 `data.json` `skill://` refs resolve; zero tracked files left under `.kiro/skills` pre-emit.
- **Unit lane**: `npm run test:agent-generator` → **119/119** (10 suites; +11 over Task 2's 108).
- **Typecheck**: agent-generator `tsc --noEmit` clean.
- **Parent validation**: full `npm test` → **377/377 suites, 8987/8987 tests** — zero regressions.

## Delegated-tier capture (per Task-Completion-Protocol)
- Planned `**Agent**: Thurgood + Lina` (3.1) / `Thurgood` (3.2). **Executed by two Sonnet `general-purpose` subagents** (settled-design implementation tier per the model-selection policy) orchestrated and independently verified by the **Fable 5 main loop**; all relocation/canonical-copy decisions were made in the main loop from verified diffs BEFORE delegation (agents encoded, they did not decide). Lina's confirmation of activation-description intactness is deferred to U1's PR per the task's pairing note (descriptions are byte-preserved by construction — the emit copies SKILL.md verbatim). One mid-task correction: a main-loop staging error (pathspec fatal aborted a `git add`) left 3.1's two file-EDITS out of the first commit — caught by post-commit verification, completed in `bec9a258`.

## Open items (carried forward — NOT blocking Task 3)
1. **Impeccable `name: impeccable-dp` mismatch** → Leonardo/Lina reconcile at/before U1's PR (disposition 3 above).
2. **Owner confirmations** (dispositions 1–2) ride U1's PR review per the task pairing notes.
3. **Sweep 2 (Task 7) is the standing enforcement** of the round-trip this task proved once (both directions + CC discovery-contract byte-equality, D-A2).
