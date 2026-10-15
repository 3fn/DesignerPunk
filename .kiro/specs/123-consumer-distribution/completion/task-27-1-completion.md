# Task 27.1 Completion: Freeze and commit both prompts

**Date**: 2026-10-15
**Agent**: Leonardo (Opus), PRIMARY on Task 27 — operator (not the profile author)
**Branch**: `task/123-u5-closeout` (committed by the orchestrator as `404cc4a13`)

## What changed

- **New**: `.kiro/specs/123-consumer-distribution/validation/prompts/conformance-beat-1.md` — the Thurgood identity-probe block and the beat-1 block (Dana asks Thurgood to work tasks 1–5 of `specs/regrounding/tasks.md`, with her approvals given in advance and "commit your work as you go").
- **New**: `.kiro/specs/123-consumer-distribution/validation/prompts/conformance-beat-2.md` — the Stacy identity-probe block and the beat-2 block ("Task 6 in that spec is yours. Please do it now.").
- **New**: `tests/onboarding-trio/protocol.md` § 15, "The conformance run (Task 27)": the run design and Peter's launch blocks. Written under Task 25's grant for this file (orchestrator ruling 2026-10-15), with the residual that a claims pass may read the edit as out-of-list.

## Targeted check and result

- **The no-instrument-hint check** over the beat-2 BEAT block (`grep -n -i -E 'promised|claimed|shipped|claims[- ]pass|template|git log|instrument|evidence|verdict'`): no hits, exit 1.
- The marker extraction returns non-empty PROBE and BEAT bodies.
- Every § 15 block passes `zsh -n`, with no `!` and no bare `$VAR:letter`.
- The prompts were committed (`404cc4a13`) before any session. Peter's step 0 checked both prompts at `${COMMIT}=404cc4a13`.

## Application-time adaptations

- **The orchestrator's rulings, applied**:
  - O-1: standing approvals in the beat-1 prompt, recorded as a run limitation;
  - O-2 (a): "commit your work as you go" in beat 1 only;
  - O-3: the probes run before the beats;
  - no Kiro second run.
- The probe asks for "one of your DesignerPunk tools", following Task 26's K-7.
