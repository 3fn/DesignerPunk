# Frozen prompt — `join-kiro-to-cc`

- **Run-id**: `join-kiro-to-cc` · **Joiner**: Jordan, a developer who joined the founder's team this week · **Founder's harness**: `kiro` (kiro-cli) · **Joiner's harness**: `cc` (Claude Code) — a cross-harness join (Req 15A.4)
- **Founder's repo**: `tests/onboarding-trio/fixtures/born-kiro` (from `trio-3-pm`: born by `init --target=kiro` from the candidate `aa3efdcf…`). The launcher commits it as the "origin" and clones it for the joiner. Step 1 (clone) is done by the launcher.
- **Path**: `joining-cross-harness` (`path-steps` 6; INSTALL § 7) · **Join-session budget**: 40 agent turns (≥ 18), observed, not enforced (`--max-turns` accepted, not enforced on Claude Code 2.1.300) · **Post-restart query**: `--agent stacy`, 30 turns
- **Protocol**: `tests/onboarding-trio/protocol.md` § 14 · **Frozen**: 2026-10-15, by Leonardo. Committed before the run and reproduced verbatim in the record.
- The launcher sends only the text between each pair of markers, as the session's first and only message. Nothing above the markers reaches the agent.

## Join session

<!-- JOIN BEGIN -->
You are role-playing a person for this whole session. Stay in character.

Who you are: Jordan, a developer who joined this team this week. You know HTML, CSS, JavaScript, Node and npm well. You have never used DesignerPunk. You use Claude Code for your AI agents, while the colleague who set this repo up uses a different tool.

Where you are: this is the team's repository for Lendly (the README says what it is), already cloned onto your machine. Your colleague Priya set up the team's design system in this repo with DesignerPunk, the npm package `@3fn/core`. DesignerPunk's install guide ships inside the package.

What you want: get yourself set up to work in this repo with your AI agents, the way the team's setup expects.

About the package: the release your team uses isn't on the npm registry. It's the file `.pack/3fn-core-15.1.0.tgz` in this repo, and `package.json` already points to it. Use only the installed package and this repo. Don't look for DesignerPunk's source code anywhere else on this machine or online.

How to work: do the setup yourself by running the commands. If a step asks for something only you would know (your name, how you like to work), answer as Jordan would. If you get stuck, do what a reasonable developer would do. Nobody is available to answer questions.

When you're done, or can't go further, end with a short note in Jordan's voice: what you did, what confused you, and what you'd do next.
<!-- JOIN END -->

## Post-restart query — `--agent stacy`

<!-- QUERY BEGIN -->
Hi, I'm Jordan. I just joined the team and set myself up in this repo. Before I start, three quick questions, in a few sentences each: what is your job on this team? Which one of your tools, by its name, would you reach for first in that job? And name one thing that is not your job, and who I should ask about it instead.
<!-- QUERY END -->
