# Frozen prompt — `conformance-kiro-beat-1` (and the Thurgood identity probe) (release 5, 16.1.0)

- **Run**: `conformance-kiro` (the trio record's Kiro conformance pair; Req 24.1, 24.1b, 24.6 on the `kiro` rendering) · **Agent**: consumer-Thurgood, `kiro-cli chat --no-interactive --trust-all-tools --agent thurgood` · **Harness**: Kiro (`kiro`)
- **Consumer repo**: a clone of `tests/onboarding-trio/fixtures/c-near-empty` (Lendly), born by the launcher from the candidate: `npm install` of `.pack/3fn-core-candidate.tgz`, `npx designerpunk init --target=kiro --name Lendly --abbreviation LY`, `npx designerpunk generate`, one commit. The launcher then opens Kiro once to trust the folder and approve the servers. All of that is setup, not under test (protocol § 15.3).
- **Order**: the identity probe (this file's PROBE block) runs first, in its own fresh session. Beat 1 (this file's BEAT block) runs after both identity probes. Beat 2 (`conformance-kiro-beat-2.md`) strictly follows beat 1, in the same repo.
- **Budgets** (observed, not enforced; kiro-cli has no turn limit; protocol § 4): probe 30 turns; beat 1 120 turns.
- **Run limitation, recorded** (carried from Task 27's O-1): the spec says "with your human's approval at each step" (task 4) and "Decide each item, with your human" (task 2). A headless session cannot ask, so the founder gives her decisions and approvals in advance, in this prompt.
- **Recorded so the reader can weigh beat 2** (carried from Task 27's O-2 → (a)): the prompt tells Thurgood to "commit your work as you go". It does not name or describe Stacy's task.
- **Successor of**: `.kiro/specs/123-consumer-distribution/validation/prompts/conformance-beat-1.md` @ `b10d5d3b6` (Task 27, `cc`). **Every change to the agent-facing text**: the founder is Priya and the repo is Lendly (was Dana's `order-status` service); task 4's real work is Lendly's home page (was the order-status web page). The PROBE block differs only in the name. The three questions, the decisions given in advance, and the commit instruction are unchanged.
- **Protocol**: `tests/onboarding-trio/protocol.md` § 15.3 · **Frozen**: at its commit (drafted 2026-10-25), by Leonardo (operator; not the profile author). Committed before the run and reproduced verbatim in the record.
- The launcher sends only the text between each pair of markers, as the session's first and only message.

## Identity probe — `--agent thurgood`, fresh session, before the beats

<!-- PROBE BEGIN -->
Hi, I'm Priya. Three quick questions, a few sentences each: what is your job on this team? Which one of your DesignerPunk tools, by its name, would you reach for first in that job? And name one thing that is not your job, and who I should ask about it instead.
<!-- PROBE END -->

## Beat 1 — `--agent thurgood`

<!-- BEAT BEGIN -->
Hi Thurgood, I'm Priya. I set DesignerPunk up in this repo, where my product Lendly starts, and I'm the human for your re-grounding assignment. Please work through the re-grounding spec in `specs/regrounding/tasks.md`, tasks 1 to 5, here in this repo.

I can't answer questions while you work, so here are my decisions up front. Treat this message as my approval at each step where the spec asks for it, and say in your report that you had it in advance:
- For task 2, decide each item's disposition yourself, using the spec's three options, and write down your reasoning. I'll review the report afterwards.
- For task 4, the real piece of upcoming work is Lendly's home page: a list of tools available to borrow near me, with a way to search. Formalize that.
- Commit your work to this repo as you go.

When you're done, tell me briefly what you produced, where it is, and anything you couldn't do.
<!-- BEAT END -->
