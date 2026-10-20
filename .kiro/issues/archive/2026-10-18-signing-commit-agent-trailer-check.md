# A signing commit's `Agent:` line one paragraph too early is unreadable to git, and the verifier did not say so (the 2026-10-18 re-cut)

**Date**: 2026-10-18
**Status**: CLOSED — fixed at #409 (`ef9c5a9d2`); the outcome line was owed in that PR and missed, so the record lapsed at its own trigger (§ "Lapse (2026-10-20)"); closed and archived 2026-10-20 (§ "Outcome (2026-10-20)"). *(Set 2026-10-20, Thurgood, owner. Superseded status, kept verbatim: "ACTIVE")*
**Owner**: Thurgood (owner of `tools/agent-generator/regrounding/verify-signing-chain.ts` under ballot `2026-10-17-standing-write-scope-six-roots` F-1 Option B)
**Trigger**: `merge:#409` — the PR carrying this fix closes it.
**Source**: Stacy's class option, 2026-10-18 (relayed by the orchestrator), after two of her C1 re-confirm commits carried `Agent: Stacy` in a paragraph above the final one: git's `%(trailers:key=Agent)` returned empty, `verify-signing-chain` link 3 failed with "signing commit carries no Agent: trailer", and the merge-only rule forced a branch re-cut.
**Grant paths**: none — the fix is inside Thurgood's standing scope (`tools/agent-generator/regrounding/*` by file, tests under `tools/agent-generator/__tests__/`).
**Consulted**: none needed — filing only; the fix is the owner's own instrument and changes no law and no pass/fail outcome
**Class**: P2 obligation (guard) · owed-act

## The gap

Git reads commit trailers only from the final paragraph. A signing commit whose `Agent: <seat>` line sits above a blank line followed by `Co-Authored-By:` reads as having no trailer, and link 3's message ("no Agent: trailer") did not tell the author the line was there. The guard was weaker than its claim in the diagnosis, not in the verdict.

## The fix

1. `verify-signing-chain` link 3: when the trailer is empty but an `Agent:` line exists above the final paragraph, the finding says so and names the remedy ("put `Agent: <seat>` and `Co-Authored-By:` together in ONE final paragraph"). Exit code and the no-line-at-all message unchanged; what passes is unchanged.
2. `tools/agent-generator/regrounding/check-agent-trailer.ts <base> [<head>]` — a local early check over a commit range, same hint. No git-hook framework exists in this repo (no `.husky/`, no `core.hooksPath`, `.kiro/hooks/` holds Kiro agent hooks and task scripts), so none was added; the script is run by hand. No `npm` alias: `package.json` is outside the six-roots scope.

## Closing

Closes at the merge of the fixing PR: record the outcome here (dated) and `git mv` this file to `archive/` (README rule 5).

## Lapse (2026-10-20)

*Signed: Thurgood (owner), observed under README rule 11 at the 2026-10-20 records sweep.*

- **Fired event**: the trigger `merge:#409`, the squash `ef9c5a9d2e7e09944662af3cc8d0c9b87f8fa280` (2026-10-19 08:11 -0400). That PR carried the fix and filed this record, but did not add rule 5's dated outcome line, which rule 11 says a fixing PR adds in the same PR. No commit that is an ancestor of `ef9c5a9d2` closed this record (an outcome line or the archive move) or re-ruled it (a changed Trigger line with a dated reason and authority). The miss is mine: I authored #409.
- **Consequence (rule 11)**: the first lapse of a P2 (guard) record → escalation to Peter with exactly three options: spec, drop, or fix-now. Lapse count: 1 (one SHA named).
- **Escalation answered**: Peter, chat, 2026-10-20 (relayed by the orchestrator): "Go on the records PR with the class option and resolving F-1 and F-2, please" — read as **fix-now**, executed in this records PR: the outcome line below. The record of Peter's words is the orchestrator's brief; this section names it and does not restate more of it.

## Outcome (2026-10-20)

*Signed: Thurgood (owner), README rule 5.*

- **Fixed at #409, `ef9c5a9d2` (2026-10-19)**, both halves of § "The fix" as written: (1) `tools/agent-generator/regrounding/verify-signing-chain.ts` link 3 reports `AGENT_ABOVE_FINAL_PARAGRAPH` (the line exists above the final paragraph; the remedy names one final paragraph for `Agent:` and `Co-Authored-By:`) when the trailer is empty and `agentLineAboveFinalParagraph()` finds the line, and keeps the old message otherwise; what passes is unchanged; (2) `tools/agent-generator/regrounding/check-agent-trailer.ts <base> [<head>]`, the local early check, with its test `tools/agent-generator/__tests__/check-agent-trailer.test.ts` and the added link-3 cases in `verify-signing-chain.test.ts`. Read from the squash's diff at this sweep; the suites were not re-run here.
- Moved to `archive/` by `git mv` in the same commit as this line.
