# 125-A Bake-In Findings Ledger (Task 5)

**Opened**: 2026-07-05, at the merge of PR #10 (`8bdb47c4`) — the gate is live; the bake-in clock starts with the next ordinary-work PR.
**Closure requires** (Req 5): ≥5 distinct working days each with ≥1 ordinary-work PR merged; every entry below resolved or "Peter-accepted (date)"; Peter's dated closure check-in recorded here.

## Merged-PR log (bake-in evidence)

| # | Date | PR | Note |
|---|------|----|------|
| — | 2026-07-05 | [#10](https://github.com/3fn/DesignerPunk/pull/10) | The law application itself — counts as flow-proof, NOT as an ordinary-work day |

## Findings ledger

| # | Opened | Finding | Source | Status |
|---|--------|---------|--------|--------|
| 1 | 2026-07-05 | `completion-documentation-guide.md:351` still instructs pre-PR `release-manager.sh auto` (release *detection* was out of ballot scope; fires on branch state — same claim-vs-fact concern 1e resolved for analysis) | Thurgood consistency check obs. 1 | OPEN → 125-B candidate |
| 2 | 2026-07-05 | completion-documentation-guide "Path A" line ends "→ Manual commit" — reads old-flow though it plausibly means manual `complete-task.sh` invocation | Thurgood obs. 2 | OPEN — wording touch |
| 3 | 2026-07-05 | Post-merge release-analysis job succeeds silently — watch whether its output is ever consulted; if not, surfacing (release-PR comment) is a 125-B candidate | Stacy 1e watch item / Thurgood obs. 3 | OPEN — observe during bake-in |
| 4 | 2026-07-05 | Branch protection `strict:false` (up-to-date-branch not required) — deliberate livability call; watch for any green-but-stale merge surprise | Task 3 completion doc | OPEN — observe |
| 5 | 2026-07-05 | `.kiro/agent-hooks/auto-organize-on-task-completion.md` carries a bare `git push` in an example (outside ballot pattern scope; post-protection it can only push a non-main branch) | Task 4 report | OPEN — low priority |
