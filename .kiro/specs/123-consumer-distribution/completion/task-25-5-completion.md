# Task 25.5 Completion: Schema check; the scoped DD9 re-read

**Date**: 2026-10-14
**Agent**: Leonardo (Opus), PRIMARY on Task 25 — operator
**Branch**: `task/123-u5-closeout` (unit head at writing: `f81b9bc57`; the three records and this doc are uncommitted at writing)

## What changed

- The schema check (protocol § 9) was run over all three records. Output is below.
- The scoped DD9 re-read and the 15B.3 statement are written in `validation/trio-3-pm.md` under `dd9:` and `15B.3:`, and restated here.

## The schema check — presence, not quality (S-T-A3)

Command: protocol § 9's block, extracted verbatim from `tests/onboarding-trio/protocol.md` and run from the worktree root with `zsh`. Output:

```
== .kiro/specs/123-consumer-distribution/validation/trio-1-backend.md
  present  run-id:
  present  frozen-prompt:
  present  candidate:
  present  fixture:
  present  target:
  present  source-access:
  present  harness-user-state:
  present  host-toolchain (ios):
  present  host-toolchain (android):
  present  session-launched-by:
  present  operator-log:
  present  budget:
  present  stop:
  present  wall-clock:
  present  path-steps-walked:
  present  first-MCP-load:
  present  cold-observation:
  present  c8c-observations:
  present  probe:
  present  sample:
  present  discovery:
  present  findings:
  present  15B.3:
  present  dd9:
  present  persona-close:
  stop lines from the vocabulary: 6
  cold-observation value well-formed
  Kenya string verbatim
  Data string verbatim
  forbidden wording absent
== .kiro/specs/123-consumer-distribution/validation/trio-2-designer.md
  present  run-id:
  present  frozen-prompt:
  present  candidate:
  present  fixture:
  present  target:
  present  source-access:
  present  harness-user-state:
  present  host-toolchain (ios):
  present  host-toolchain (android):
  present  session-launched-by:
  present  operator-log:
  present  budget:
  present  stop:
  present  wall-clock:
  present  path-steps-walked:
  present  first-MCP-load:
  present  cold-observation:
  present  c8c-observations:
  present  probe:
  present  sample:
  present  discovery:
  present  findings:
  present  15B.3:
  present  dd9:
  present  persona-close:
  stop lines from the vocabulary: 5
  cold-observation value well-formed
  Kenya string verbatim
  Data string verbatim
  forbidden wording absent
== .kiro/specs/123-consumer-distribution/validation/trio-3-pm.md
  present  run-id:
  present  frozen-prompt:
  present  candidate:
  present  fixture:
  present  target:
  present  source-access:
  present  harness-user-state:
  present  host-toolchain (ios):
  present  host-toolchain (android):
  present  session-launched-by:
  present  operator-log:
  present  budget:
  present  stop:
  present  wall-clock:
  present  path-steps-walked:
  present  first-MCP-load:
  present  cold-observation:
  present  c8c-observations:
  present  probe:
  present  sample:
  present  discovery:
  present  findings:
  present  15B.3:
  present  dd9:
  present  persona-close:
  stop lines from the vocabulary: 4
  cold-observation value well-formed
  Kenya string verbatim
  Data string verbatim
  forbidden wording absent
```

**Result**: all three records carry all 25 field labels, a well-formed `cold-observation` value from the closed set, both signed "unexercised" strings verbatim, and no forbidden wording. Stop lines from the vocabulary: 6, 5 and 4, one per session in each record. **This establishes field presence, not observation quality.** Stacy's CLOSEOUT reads the operator logs' content and the `subject: leonardo` findings (R3-5, R3-6, R3-7 in `trio-3-pm`; none in runs 1 and 2).

**The ancestry check** (prompt commit before record commit): `git merge-base --is-ancestor 30f72d628 f81b9bc57` → exit 0, run against the unit head at writing. The records are not committed yet. **After the orchestrator commits them, the committer runs `git merge-base --is-ancestor 30f72d628 <record commit>`** (expected exit 0, since `30f72d628` is already on the branch).

## The scoped DD9 re-read (Leonardo A1)

- **Did a founder who got the wrong default recover via the notice? Yes — via the notice combined with `--help`; not via the notice's own command.**
  - Persona (c)'s bare `init` printed: "no --target given — set up for Claude Code (the default). Using Kiro? npx designerpunk attach --target=kiro".
  - She read it correctly: "It told me that since I'm using Kiro, I should run a different command: npx designerpunk attach --target=kiro".
  - She carried it into her successful attempt: "Let me also make sure I add --target=kiro since I'm in Kiro, just like the first run told me."
  - The flag itself came from `--help`.
  - The wrong default never materialised: her bare `init` failed before writing anything (R3-1), and the born repo has `.kiro/` and no `.claude/`.
- **What the notice did not do**: its remedy (`attach --target=kiro`) presumes a born repo, and it fired on an `init` that then failed. That is low-severity finding R3-3.
- **What this re-read cannot establish**: which harness is the majority. The persona was assigned Kiro by the protocol, not sampled from founders, and n = 1. DD9's residual stands as written: "there is no evidence that `cc` is the persona's majority harness".

## The 15B.3 statement (persona (c))

**Held — in behaviour; not tested as teaching.**
- One birth, then `generate`, with no attempt to re-run `init` after the birth. Her next steps were restart, design and specs.
- But she never read the install guide, where 15B.3 is taught (R3-4), and never put the distinction into words.
- The run shows the CLI's order did not lead her to confuse the two. It does not show that the doc teaches the distinction. Evidence is quoted in `validation/trio-3-pm.md` § `15B.3:`.

## Targeted check and result

- The schema check above: all present.
- The ancestry check: exit 0.
- The parity check over the parent completion doc is recorded in `task-25-completion.md` § Validation.

## Application-time adaptations

- None. The DD9 re-read and the 15B.3 statement are written in the run-3 record itself (fields F22 and F23) and restated here, rather than in a separate file.
