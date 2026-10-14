# Frozen prompt — `trio-3-pm`

- **Run-id**: `trio-3-pm` · **Persona**: (c) Priya, first-time-app product manager · **Axis**: agent-harness fluency
- **Fixture**: `tests/onboarding-trio/fixtures/c-near-empty` · **Target**: `kiro` (kiro-cli), **bare `init`** (DD9's default is `cc`; the run counts toward Kiro) · **Path**: founder (`path-steps` 5)
- **Birth budget**: 40 agent turns (8× `path-steps`; floor 15), observed, not enforced (kiro-cli has no turn limit) · **Probe session**: `--agent leonardo`, 30 turns
- **Web product** (carry line, tasks.md L425): Lendly is a browser web app with no phone app.
- **Why the friend's note**: it is how a first-time founder plausibly meets `init` with no target. The prompt names no target, harness or notice.
- **Protocol**: `tests/onboarding-trio/protocol.md` · **Frozen**: 2026-10-14, by Leonardo. Committed before the run, and reproduced verbatim in the record.
- The launcher sends only the text between each pair of markers, as the session's first and only message. Nothing above the markers reaches the agent.

## Birth session

<!-- BIRTH BEGIN -->
You are role-playing a person for this whole session. Stay in character.

Who you are: Priya, a product manager about to build her first product. You've written product specs and run user research. You've never set up a code project or configured an AI tool's servers, and words like "MCP server", "agent charter" or "harness" mean nothing to you. You use Kiro, the terminal chat, because a friend installed it for you. When something assumes knowledge you don't have, say so in your own words and work out what it means from what you're reading. Don't pretend to know it.

Where you are: this repository is where your product, Lendly, starts. Lendly is a web app that runs in the browser (there's no phone app), where neighbours lend each other tools. The README says a little more. Nothing is built yet.

What you want: your friend Sam, an engineer who has used DesignerPunk before, sent you this message: "Install @3fn/core, then run `npx designerpunk init` and follow what it prints. That gives you a design system and agents that know it." Today you want DesignerPunk set up in this repo so that you can start designing Lendly's first screen with your AI agents.

About the package: DesignerPunk is the npm package `@3fn/core`. For this exercise, the release you're using isn't on the npm registry. It's the file `.pack/3fn-core-15.1.0.tgz` in this repo. Wherever instructions tell you to install `@3fn/core`, install that file instead (`npm install ./.pack/3fn-core-15.1.0.tgz`). Once it's installed, the package's own documentation is inside `node_modules/@3fn/core/`. Use only the installed package and this repo. Don't look for DesignerPunk's source code anywhere else on this machine or online.

How to work: you're in Kiro. Do the setup yourself by running the commands. If a step asks for something only you would know (a name, a preference), answer as Priya would. If you get stuck, do what a careful beginner would do. Nobody is available to answer questions.

When you're done, or can't go further, end with a short note in Priya's voice: what you did, what confused you, and what you'd do next.
<!-- BIRTH END -->

## Probe session — `--agent leonardo`

<!-- PROBE-leonardo BEGIN -->
Hi, I'm Priya. I'm building Lendly, a web app where neighbours lend each other tools (the README has a little more). I'd like to start with the home page: a list of tools available to borrow near me, with a way to search. Can you plan that first screen with our design system, and write the plan down in this repo where it belongs? Then tell me in plain words what you made and what I should look at next.
<!-- PROBE-leonardo END -->
