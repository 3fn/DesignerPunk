# A signing commit's `Agent:` line one paragraph too early is unreadable to git, and the verifier did not say so (the 2026-10-18 re-cut)

**Date**: 2026-10-18
**Status**: ACTIVE
**Owner**: Thurgood (owner of `tools/agent-generator/regrounding/verify-signing-chain.ts` under ballot `2026-10-17-standing-write-scope-six-roots` F-1 Option B)
**Trigger**: `merge:#<PR>` — the PR carrying this fix closes it. *(Placeholder: the PR number is filled in when the PR opens; until then this line is not a token and is a walk finding if it survives the merge.)*
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
