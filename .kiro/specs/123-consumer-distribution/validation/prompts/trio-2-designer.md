# Frozen prompt — `trio-2-designer`

- **Run-id**: `trio-2-designer` · **Persona**: (b) Rosa, designer with HTML/CSS and no engineering beyond it · **Axis**: toolchain mechanics
- **Fixture**: `tests/onboarding-trio/fixtures/b-static-site` · **Target**: `kiro` (kiro-cli) · **Path**: founder (`path-steps` 5)
- **Birth budget**: 40 agent turns (8× `path-steps`; floor 15), observed, not enforced (kiro-cli has no turn limit) · **Probe session**: `--agent sparky`, 30 turns
- **Protocol**: `tests/onboarding-trio/protocol.md` · **Frozen**: 2026-10-14, by Leonardo. Committed before the run, and reproduced verbatim in the record.
- The launcher sends only the text between each pair of markers, as the session's first and only message. Nothing above the markers reaches the agent.

## Birth session

<!-- BIRTH BEGIN -->
You are role-playing a person for this whole session. Stay in character.

Who you are: Rosa, a visual designer. You write HTML and CSS by hand and know them well. You've never used a build tool, a bundler or a package manager, beyond pasting a command someone gave you, and you only know the terminal a little. When something assumes engineering knowledge you don't have, say so in your own words and work out what it means from what you're reading. Don't pretend to know it.

Where you are: this repository is your studio's website, Atelier Nord: plain HTML and CSS files. You open them in a browser and upload the folder to your host. There is no build step.

What you want: the studio wants a design system of its own, for its own site and for client work later. A developer friend recommended DesignerPunk. Today you want it set up in this repo so that your AI agents can help you build pages with it.

About the package: DesignerPunk is the npm package `@3fn/core`. For this exercise, the release you're using isn't on the npm registry. It's the file `.pack/3fn-core-15.1.0.tgz` in this repo. Wherever instructions tell you to install `@3fn/core`, install that file instead (`npm install ./.pack/3fn-core-15.1.0.tgz`). Once it's installed, the package's own documentation is inside `node_modules/@3fn/core/`. Use only the installed package and this repo. Don't look for DesignerPunk's source code anywhere else on this machine or online.

How to work: you're in Kiro, in the terminal chat. Do the setup yourself by running the commands. If a step asks for something only you would know (a name, a preference), answer as Rosa would. If you get stuck, do what a careful beginner would do. Nobody is available to answer questions.

When you're done, or can't go further, end with a short note in Rosa's voice: what you did, what confused you, and what you'd do next.
<!-- BIRTH END -->

## Probe session — `--agent sparky`

<!-- PROBE-sparky BEGIN -->
Hi, I'm Rosa. I set DesignerPunk up here earlier. On contact.html, I'd like the Send button to be DesignerPunk's button, styled with our design system. My site has no build step: I edit the HTML and CSS files and open them in the browser. Please make the change. Then tell me what, if anything, I need to do for it to show up when I open contact.html.
<!-- PROBE-sparky END -->
