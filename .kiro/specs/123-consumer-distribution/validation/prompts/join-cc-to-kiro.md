# Frozen prompt — `join-cc-to-kiro`

- **Run-id**: `join-cc-to-kiro` · **Joiner**: Mei, a developer who joined the founder's team this week · **Founder's harness**: `cc` (Claude Code) · **Joiner's harness**: `kiro` (kiro-cli) — a cross-harness join (Req 15A.4)
- **Founder's repo**: `tests/onboarding-trio/fixtures/born-cc` (from `trio-1-backend`: born by `init --target=cc` from the candidate `aa3efdcf…`). The launcher commits it as the "origin" and clones it for the joiner. Step 1 (clone) is done by the launcher.
- **Path**: `joining-cross-harness` (`path-steps` 6; INSTALL § 7) · **Join-session budget**: 40 agent turns (≥ 3 × 6 = 18), observed, not enforced · **Post-restart query**: `--agent thurgood`, 30 turns
- **Same-harness side observation** (C8(c); not part of this join): a separate clone, opened once in Claude Code before `generate`, with no prompt sent. See protocol § 14.
- **Protocol**: `tests/onboarding-trio/protocol.md` § 14 · **Frozen**: 2026-10-15, by Leonardo. Committed before the run and reproduced verbatim in the record.
- The launcher sends only the text between each pair of markers, as the session's first and only message. Nothing above the markers reaches the agent.

## Join session

<!-- JOIN BEGIN -->
You are role-playing a person for this whole session. Stay in character.

Who you are: Mei, a developer who joined this team this week. You know TypeScript, Node and npm well. You have never used DesignerPunk. You use Kiro, the terminal chat, for your AI agents, while the colleague who set this repo up uses a different tool.

Where you are: this is the team's `order-status` service, already cloned onto your machine. Your colleague Dana set up the team's design system in this repo with DesignerPunk, the npm package `@3fn/core`. DesignerPunk's install guide ships inside the package.

What you want: get yourself set up to work in this repo with your AI agents, the way the team's setup expects.

About the package: the release your team uses isn't on the npm registry. It's the file `.pack/3fn-core-15.1.0.tgz` in this repo, and `package.json` already points to it. Use only the installed package and this repo. Don't look for DesignerPunk's source code anywhere else on this machine or online.

How to work: do the setup yourself by running the commands. If a step asks for something only you would know (your name, how you like to work), answer as Mei would. If you get stuck, do what a reasonable developer would do. Nobody is available to answer questions.

When you're done, or can't go further, end with a short note in Mei's voice: what you did, what confused you, and what you'd do next.
<!-- JOIN END -->

## Post-restart query — `--agent thurgood`

<!-- QUERY BEGIN -->
Hi, I'm Mei. I just joined the team and set myself up in this repo. Before I start, three quick questions, in a few sentences each: what is your job on this team? Which one of your tools, by its name, would you reach for first in that job? And name one thing that is not your job, and who I should ask about it instead.
<!-- QUERY END -->
