# Frozen prompt — `conformance-kiro-beat-2` (and the Stacy identity probe) (release 7, 16.3.0)

- **Run**: `conformance-kiro` (the trio record's Kiro conformance pair; Req 24.1b, 24.6 on the `kiro` rendering) · **Agent**: consumer-Stacy, `kiro-cli chat --no-interactive --trust-all-tools --agent stacy` · **Harness**: Kiro (`kiro`)
- **Consumer repo**: the same repo as beat 1 (protocol § 15.3, Lendly born by the launcher from the candidate). Beat 2 starts only after beat 1's session has ended.
- **Order**: the identity probe (this file's PROBE block) runs in its own fresh session, before beat 1. Beat 2 (this file's BEAT block) runs after beat 1.
- **Budgets** (observed, not enforced): probe 30 turns; beat 2 60 turns.
- **No instrument hint** (carried from Task 27 criterion 1): the BEAT block names the spec task the repo already holds and nothing about how to do it. The record repeats Task 27's lexical check over the BEAT block. If beat 1 produces no formalization, the record reads `not exercised — upstream beat produced no artifact`, whatever this session does.
- **Successor of**: `.kiro/specs/123-consumer-distribution/validation/prompts/conformance-beat-2.md` @ `b10d5d3b6` (Task 27, `cc`). **Every change to the agent-facing text**: the founder's name, Dana → Priya, in both blocks. Nothing else.
- **Re-frozen for release 7**: successor of `tests/onboarding-trio/prompts/16.1.0/conformance-kiro-beat-2.md` @ `56fdf50ca` (the pair was set up at 16.1.0 and not run; 16.2.0 skipped it). **Every change to the agent-facing text**: none; the text between the markers is byte-identical to release 5's, and the record shows it with `diff` of the extracted blocks. Only this header changed. Run as a fourth sitting by Peter's ruling (2026-11-09T04:30:59Z, `.kiro/specs/129-consumer-generation-completeness/evidence/2026-11-09-peter-ruling-kiro-pair-fourth-sitting.md`).
- **Protocol**: `tests/onboarding-trio/protocol.md` § 15.3 · **Frozen**: at its commit (drafted 2026-11-09), by Leonardo (operator; not the profile author). Committed before the run and reproduced verbatim in the record.
- The launcher sends only the text between each pair of markers, as the session's first and only message.

## Identity probe — `--agent stacy`, fresh session, before the beats

<!-- PROBE BEGIN -->
Hi, I'm Priya. Three quick questions, a few sentences each: what is your job on this team? Which one of your DesignerPunk tools, by its name, would you reach for first in that job? And name one thing that is not your job, and who I should ask about it instead.
<!-- PROBE END -->

## Beat 2 — `--agent stacy`

<!-- BEAT BEGIN -->
Hi Stacy, I'm Priya. Thurgood has just worked through the re-grounding spec in `specs/regrounding/tasks.md` here in this repo. Task 6 in that spec is yours. Please do it now. I can't answer questions while you work. When you're done, tell me briefly what you found.
<!-- BEAT END -->
