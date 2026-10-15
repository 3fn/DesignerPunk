# Frozen prompt — `conformance-beat-1` (and the Thurgood identity probe)

- **Run**: `conformance` (Spec 123 Task 27; Req 24.1, 24.1b, 24.6) · **Agent**: consumer-Thurgood, `claude -p … --agent thurgood` · **Harness**: Claude Code (`cc`)
- **Consumer repo**: a fresh clone of `tests/onboarding-trio/fixtures/born-cc` (Dana's `order-status` service, born `init --target=cc` from candidate `aa3efdcf…`). The launcher runs `npm install` and `npx designerpunk generate`, then opens Claude Code once to trust the folder and enable the servers (setup, not under test).
- **Order**: the identity probe (this file's PROBE block) runs first, in its own fresh session. Beat 1 (this file's BEAT block) runs after both identity probes. Beat 2 (`conformance-beat-2.md`) strictly follows beat 1, in the same clone.
- **Budgets** (observed, not enforced; protocol § 4): probe 30 turns; beat 1 120 turns.
- **Run limitation, recorded (orchestrator ruling 2026-10-15, O-1)**: the spec says "with your human's approval at each step" (task 4) and "Decide each item, with your human" (task 2). A headless session cannot ask, so the founder gives her decisions and approvals in advance, in this prompt.
- **Recorded so the reader can weigh beat 2 (O-2 → (a))**: the prompt tells Thurgood to "commit your work as you go". It does not name or describe Stacy's task.
- **Protocol**: `tests/onboarding-trio/protocol.md` § 15 · **Frozen**: 2026-10-15, by Leonardo (operator; not the profile author). Committed before the run and reproduced verbatim in the record.
- The launcher sends only the text between each pair of markers, as the session's first and only message.

## Identity probe — `--agent thurgood`, fresh session, before the beats

<!-- PROBE BEGIN -->
Hi, I'm Dana. Three quick questions, a few sentences each: what is your job on this team? Which one of your DesignerPunk tools, by its name, would you reach for first in that job? And name one thing that is not your job, and who I should ask about it instead.
<!-- PROBE END -->

## Beat 1 — `--agent thurgood`

<!-- BEAT BEGIN -->
Hi Thurgood, I'm Dana. I set DesignerPunk up in this repo, the order-status service, and I'm the human for your re-grounding assignment. Please work through the re-grounding spec in `specs/regrounding/tasks.md`, tasks 1 to 5, here in this repo.

I can't answer questions while you work, so here are my decisions up front. Treat this message as my approval at each step where the spec asks for it, and say in your report that you had it in advance:
- For task 2, decide each item's disposition yourself, using the spec's three options, and write down your reasoning. I'll review the report afterwards.
- For task 4, the real piece of upcoming work is a small web status page for this service: our support staff type in an order number and see whether the order is ok, delayed or failed. Formalize that.
- Commit your work to this repo as you go.

When you're done, tell me briefly what you produced, where it is, and anything you couldn't do.
<!-- BEAT END -->
