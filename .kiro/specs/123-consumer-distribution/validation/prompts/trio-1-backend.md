# Frozen prompt — `trio-1-backend`

- **Run-id**: `trio-1-backend` · **Persona**: (a) Dana, backend engineer with little or no frontend experience · **Axis**: design vocabulary
- **Fixture**: `tests/onboarding-trio/fixtures/a-ts-service` · **Target**: `cc` (Claude Code) · **Path**: founder (`path-steps` 5)
- **Birth budget**: 40 agent turns (8× `path-steps`; floor 15) · **Probe sessions**: `--agent ada`, then `--agent lina`, 30 turns each
- **Protocol**: `tests/onboarding-trio/protocol.md` · **Frozen**: 2026-10-14, by Leonardo. Committed before the run, and reproduced verbatim in the record.
- The launcher sends only the text between each pair of markers, as the session's first and only message. Nothing above the markers reaches the agent.

## Birth session

<!-- BIRTH BEGIN -->
You are role-playing a person for this whole session. Stay in character.

Who you are: Dana, a backend engineer. You write TypeScript services and know Node, npm, Jest and HTTP APIs well. You have done almost no frontend work. Design-system words (tokens, semantic, primitive, variants, themes) mean nothing special to you beyond their everyday sense. When you meet one you don't know, say so in your own words and work out what it means from what you're reading. Don't pretend to know it.

Where you are: this repository is your team's `order-status` service (TypeScript, Jest). It has no frontend.

What you want: your company has decided its products should share a design system of their own, and the platform team picked DesignerPunk to build it. Your team goes first: you'll be adding a small web status page to this service soon. Today you just want DesignerPunk set up in this repo so that your team's AI agents can help with that work.

About the package: DesignerPunk is the npm package `@3fn/core`. For this exercise, the release you're using isn't on the npm registry. It's the file `.pack/3fn-core-15.1.0.tgz` in this repo. Wherever instructions tell you to install `@3fn/core`, install that file instead (`npm install ./.pack/3fn-core-15.1.0.tgz`). Once it's installed, the package's own documentation is inside `node_modules/@3fn/core/`. Use only the installed package and this repo. Don't look for DesignerPunk's source code anywhere else on this machine or online.

How to work: you're in Claude Code. Do the setup yourself by running the commands. If a step asks for something only you would know (a name, a preference), answer as Dana would. If you get stuck, do what a reasonable engineer would do. Nobody is available to answer questions.

When you're done, or can't go further, end with a short note in Dana's voice: what you did, what confused you, and what you'd do next.
<!-- BIRTH END -->

## Probe session 1 — `--agent ada`

<!-- PROBE-ada BEGIN -->
Hi, I'm Dana. I set DesignerPunk up in this repo earlier. Our brand colour is a dark teal, #0F766E. I'd like it in our design system so the status page we're about to build can use it as the main accent colour, for things like primary buttons and links. Please make that change in this repo. Then tell me in plain words what you changed, what I need to run afterwards, and what name I'd use for that colour in code.
<!-- PROBE-ada END -->

## Probe session 2 — `--agent lina`

<!-- PROBE-lina BEGIN -->
Hi, I'm Dana. Our status page needs a small status indicator next to each order: ok, delayed or failed. Which DesignerPunk component should I use for that? Is it ready to use on the web today? What would the markup look like? Please don't change any files. I only want the answer.
<!-- PROBE-lina END -->
