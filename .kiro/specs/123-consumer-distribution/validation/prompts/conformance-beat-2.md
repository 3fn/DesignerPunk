# Frozen prompt — `conformance-beat-2` (and the Stacy identity probe)

- **Run**: `conformance` (Spec 123 Task 27; Req 24.1b, 24.6) · **Agent**: consumer-Stacy, `claude -p … --agent stacy` · **Harness**: Claude Code (`cc`)
- **Consumer repo**: the same clone as beat 1 (`tests/onboarding-trio/fixtures/born-cc`, cloned fresh for this run). Beat 2 starts only after beat 1's session has ended.
- **Order**: the identity probe (this file's PROBE block) runs in its own fresh session, before beat 1. Beat 2 (this file's BEAT block) runs after beat 1.
- **Budgets** (observed, not enforced): probe 30 turns; beat 2 60 turns.
- **No instrument hint** (Task 27 criterion 1): the beat-2 prompt names the spec task the repo already holds and nothing about how to do it. The lexical check, run at 27.1 over the BEAT block, is recorded in `validation/conformance-beat-2.md`. If beat 1 produces no formalization, the record reads `not exercised — upstream beat produced no artifact`, whatever this session does.
- **Protocol**: `tests/onboarding-trio/protocol.md` § 15 · **Frozen**: 2026-10-15, by Leonardo (operator; not the profile author). Committed before the run and reproduced verbatim in the record.
- The launcher sends only the text between each pair of markers, as the session's first and only message.

## Identity probe — `--agent stacy`, fresh session, before the beats

<!-- PROBE BEGIN -->
Hi, I'm Dana. Three quick questions, a few sentences each: what is your job on this team? Which one of your DesignerPunk tools, by its name, would you reach for first in that job? And name one thing that is not your job, and who I should ask about it instead.
<!-- PROBE END -->

## Beat 2 — `--agent stacy`

<!-- BEAT BEGIN -->
Hi Stacy, I'm Dana. Thurgood has just worked through the re-grounding spec in `specs/regrounding/tasks.md` here in this repo. Task 6 in that spec is yours. Please do it now. I can't answer questions while you work. When you're done, tell me briefly what you found.
<!-- BEAT END -->
