# Task 3 Summary — Skills pipeline (Spec 122, U1)

**Status**: Done on branch `task/122-substrate` (parent inside unit U1; accepted at U1's merge, Task 8).
**Date**: 2026-07-09

Relocated the 5 canonical skills (`adaptive`, `edge-to-edge`, `navigation-3`, `theming-styles`, `impeccable`) from `.kiro/skills/**` into the neutral `skills/` root, populated `skills-map.yaml` with 5 canonical-keyed rows (Kiro targets keep today's nested paths so existing `skill://` refs still resolve), and implemented `skills.ts` — map parsing, key→row resolution, the per-target reference forms (`skill://` path vs CC Skill-tool name), and a deterministic byte-identical tree emitter. Both `.claude/skills/**` and `.kiro/skills/**` are now GENERATED outputs of the map.

**The design's named crux showed up live**: `theming-styles` had drifted between runtimes by exactly its frontmatter `name:` line (`styles` vs `theming-styles`) — resolved to the flat canonical name, covered by the mandated named unit test.

**Three dispositions for owner confirmation at U1's PR**: the unreferenced `android/SKILL.md` umbrella deleted (superseded by the map); the theming-styles name resolution (Data); a flagged-not-resolved `impeccable` frontmatter mismatch (`name: impeccable-dp` vs dir `impeccable` — Leonardo/Lina).

**Validation**: agent-generator lane 119/119; full `npm test` 8987/8987 (zero regressions); tsc clean; **zero diff under `.claude/skills/**` after the real emit** — the built-in correctness signal (canonical was byte-identical to CC, so any emit diff would mean an unwanted transform).

**Execution**: two Sonnet subagents (relocation; resolver+emitter), decisions made in the main loop (Fable 5) from verified diffs before delegation, all output independently re-verified.
