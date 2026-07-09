# 125-A Bake-In Findings Ledger (Task 5)

**Opened**: 2026-07-05, at the merge of PR #10 (`8bdb47c4`) — the gate is live; the bake-in clock starts with the next ordinary-work PR.
**Closure requires** (Req 5): ≥5 distinct working days each with ≥1 ordinary-work PR merged; every entry below resolved or "Peter-accepted (date)"; Peter's dated closure check-in recorded here.

## Merged-PR log (bake-in evidence)

| # | Date | PR | Note |
|---|------|----|------|
| — | 2026-07-05 | [#10](https://github.com/3fn/DesignerPunk/pull/10) | The law application itself — counts as flow-proof, NOT as an ordinary-work day |
| 1 | 2026-07-05 | [#11](https://github.com/3fn/DesignerPunk/pull/11) | Open the bake-in findings ledger |
| 2 | 2026-07-05 | [#12](https://github.com/3fn/DesignerPunk/pull/12) | Inbound to 122: Phase-0-live context |
| 3 | 2026-07-05 | [#13](https://github.com/3fn/DesignerPunk/pull/13) | Spec 122 requirements draft |
| 4 | 2026-07-05 | [#14](https://github.com/3fn/DesignerPunk/pull/14) | Spec 122 requirements round 1 incorporated |
| 5 | 2026-07-05 | [#15](https://github.com/3fn/DesignerPunk/pull/15) | RATIFIED: Spec 122 requirements + OB-1 routing |
| 6 | 2026-07-05 | [#16](https://github.com/3fn/DesignerPunk/pull/16) | Spec 122 design draft |
| 7 | 2026-07-07 | [#17](https://github.com/3fn/DesignerPunk/pull/17) | Spec 122 design round 1 incorporated |
| 8 | 2026-07-07 | [#18](https://github.com/3fn/DesignerPunk/pull/18) | Spec 122 design reframe: CC two-channel native delivery |
| 9 | 2026-07-07 | [#19](https://github.com/3fn/DesignerPunk/pull/19) | RATIFIED: Spec 122 design + AC1 bright-line clarification |
| 10 | 2026-07-07 | [#20](https://github.com/3fn/DesignerPunk/pull/20) | Spec 122 tasks draft |
| 11 | 2026-07-07 | [#21](https://github.com/3fn/DesignerPunk/pull/21) | Merge-on-coherent-unit ballot + 122 tasks regroup |
| 12 | 2026-07-07 | [#22](https://github.com/3fn/DesignerPunk/pull/22) | Fold Peter's refinements into coherent-unit merge ballot |
| 13 | 2026-07-07 | [#23](https://github.com/3fn/DesignerPunk/pull/23) | Spec 122 tasks round 1 incorporated + cutover order ratified |
| 14 | 2026-07-08 | [#24](https://github.com/3fn/DesignerPunk/pull/24) | RATIFIED ballot: Orchestration Model Selection |
| 15 | 2026-07-08 | [#25](https://github.com/3fn/DesignerPunk/pull/25) | Close merge-on-coherent-unit ballot: ratify + apply workflow law |
| 16 | 2026-07-09 | [#26](https://github.com/3fn/DesignerPunk/pull/26) | Fix Civitas steering-metadata drift |
| 17 | 2026-07-09 | [#27](https://github.com/3fn/DesignerPunk/pull/27) | Fix component readiness/inheritance docs to match catalog |
| 18 | 2026-07-09 | [#28](https://github.com/3fn/DesignerPunk/pull/28) | Fix package-name drift scanner: add governance/ scan surface |
| 19 | 2026-07-09 | [#29](https://github.com/3fn/DesignerPunk/pull/29) | Reconcile 2 process docs: bare-id cross-refs + hook-ops scope |
| 20 | 2026-07-09 | [#30](https://github.com/3fn/DesignerPunk/pull/30) | Resolve final 4 flagged docs from 2026-07-08 health check |
| 21 | 2026-07-09 | [#31](https://github.com/3fn/DesignerPunk/pull/31) | Fix package.json exports: order `types` condition first |
| 22 | 2026-07-09 | [#32](https://github.com/3fn/DesignerPunk/pull/32) | 122 inbound: delegated-edit placement hazard |
| 23 | 2026-07-09 | [#33](https://github.com/3fn/DesignerPunk/pull/33) | Extend delegate-then-verify to placement + always-cue |
| 24 | 2026-07-09 | [#34](https://github.com/3fn/DesignerPunk/pull/34) | Fix init.test.ts governance-doc-count drift |
| 25 | 2026-07-09 | [#35](https://github.com/3fn/DesignerPunk/pull/35) | Guard mcp-server entry: no server start on library import |
| 26 | 2026-07-09 | [#36](https://github.com/3fn/DesignerPunk/pull/36) | Guard mcp-server entry: don't start server on library import (duplicate of #35) |

**Day-count as of 2026-07-09**: distinct ordinary-work days with ≥1 merged PR = 4 (2026-07-05, 2026-07-07, 2026-07-08, 2026-07-09). Req 5 requires ≥5 — one more qualifying day closes the day-count criterion. (2026-07-05 counts via ordinary-work PRs #11–#16 even though #10 itself is excluded.)

## Findings ledger

| # | Opened | Finding | Source | Status |
|---|--------|---------|--------|--------|
| 1 | 2026-07-05 | `completion-documentation-guide.md:351` still instructs pre-PR `release-manager.sh auto` (release *detection* was out of ballot scope; fires on branch state — same claim-vs-fact concern 1e resolved for analysis) | Thurgood consistency check obs. 1 | OPEN → 125-B candidate |
| 2 | 2026-07-05 | The "Path A → Manual commit" old-flow wording lives in `governance/Process-Spec-Planning.md` lines ~2497–2503 (the "Two Workflow Paths" block) — reads old-flow though it plausibly means manual `complete-task.sh` invocation (original attribution to completion-documentation-guide.md was imprecise) | Thurgood obs. 2 | RESOLVED — wording fixed in this PR (task/125-A-5-ledger-backfill) |
| 3 | 2026-07-05 | Post-merge release-analysis job succeeds silently — watch whether its output is ever consulted; if not, surfacing (release-PR comment) is a 125-B candidate | Stacy 1e watch item / Thurgood obs. 3 | OPEN — observe during bake-in |
| 4 | 2026-07-05 | Branch protection `strict:false` (up-to-date-branch not required) — deliberate livability call; watch for any green-but-stale merge surprise | Task 3 completion doc | OPEN — observe |
| 5 | 2026-07-05 | `.kiro/agent-hooks/auto-organize-on-task-completion.md` carries a bare `git push` in an example (outside ballot pattern scope; post-protection it can only push a non-main branch) | Task 4 report | OPEN — low priority |
| 6 | 2026-07-09 | Duplicate-fix PRs #35 and #36 both merged through the gate (identical mcp-server require.main guard authored twice; #36 squashed to an empty no-op). Not a gate defect — the gate has no duplicate-content responsibility. Agent-process lesson recorded: fetch origin + content-check main before opening a PR; keyed on branch name instead of change content. | Main-loop session obs. 2026-07-09 | OPEN — proposed disposition: Peter-accept (no gate action; process lesson already applied) |
