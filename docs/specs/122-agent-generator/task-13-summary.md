# Task 13 Summary: Cutover — Data (U7)

**Spec 122 · Unit U7 · Android platform engineer · diff-vs-baseline**

Data's Claude Code + Kiro agent artifacts are now generated from one canonical source
(`canonical/agents/data.md`). Data was previously CC-ported, so the merge gate was a **classified diff against his
hand port** with zero unexplained regressions.

## What changed

- **Canonical source authored** carrying his JOB-1 (4 Android skills + `./gradlew` build/test as a consumer-repo
  named gap), his `none-trim-stale-snapshots` ground-truth verdict (2 stale `dist/*.kt` snapshots trimmed, each with
  a hard-negative + MCP-positive cue; theme-varying tokens return a per-theme SET), and his all-three-MCP tool subset.
- **Token-law adjudicated (Ada).** The design spine's `token-quick-reference` lock does not materialize as law (it's a
  routing table). Locked **`product-token-governance`** instead (the real System-First mandate); demoted
  `token-quick-reference` to an on-demand route. Recorded as `assessment-gap`.
- **Both targets generated**, self-contained (no other agent's files touched). Data added to the cutover ledger.

## Verification

- All ten `122-*` checks + coverage-map green; generator lane 330/330; three tscs clean; root `npm test` 8987/8987;
  `mcp-server` 602/602.
- Acceptance signals: ambient union **11** (both targets agree), 2 per-agent law locks, baseline **19 → 11 removals**
  each replacement-cued, strict-superset tool grant (+`rebuild_product_index`).
- Two independent validations **CONFIRMED**: the Data seat (Android perspective, ground-truthed) and Stacy
  (lock-independent full re-diff + coverage-of-coverage).

## Remaining in Spec 122

- **U8 Kenya** (iOS) — the last first-generation (never-ported) seat.
- **U9 Stacy** (QA) — diff-vs-baseline; independent second-reviewer is the default done-condition (self-review conflict).

Detail: `.kiro/specs/122-agent-generator/completion/task-13-parent-completion.md`,
`.kiro/specs/122-agent-generator/cutover/data-cutover-report.md`,
`.kiro/specs/122-agent-generator/cutover/data-diff-vs-baseline.md`.
