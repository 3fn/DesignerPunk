# Trio record — `trio-2-designer` (persona (b), Kiro)

**Spec**: 123-consumer-distribution · **Task**: 25.3 · **Operator and author**: Leonardo · **Run date**: 2026-10-14 (local) / 2026-10-15 UTC · **Protocol**: `tests/onboarding-trio/protocol.md` as revised after Run 1 (§ 8 field order)
**Sources**: read only, from `/tmp/dp-trio/trio-2-designer/out/`, the run repo `/tmp/dp-trio/trio-2-designer/repo`, the run's Kiro store `/tmp/dp-trio/trio-2-designer/home/`, and Peter's paste-backs relayed by the orchestrator. No block was run against the run folder. Where a paste-back and a file disagree, the file is quoted and the disagreement is stated. Transcripts are not committed.

**Field list** (protocol § 8.1, reproduced): the draft's list (wall-clock, findings, preconditions per run — design-outline L471, L485); design C30's additions (`first-MCP-load`, `harness-user-state`, the C8(c) observations, 15B.3 for persona (c), the budget value); Reqs 22.3–22.4, 23.2/23.3/23.6, 24.2a, 25.1, 25.5; run discipline C1–C3 (`operator-log`, `subject: leonardo`, `session-launched-by`) and the frozen prompt reproduced; Task 25 criterion 3 as amended (the signed strings, the `host-toolchain` lines); the `cold-observation` cell shared with Tasks 26.4 and 28. Fields F1–F24 follow in order.

---

### run-id:
`trio-2-designer` — persona **(b) Rosa**, a designer with HTML/CSS and no engineering beyond it — axis: **toolchain mechanics**.

### frozen-prompt:
- File: `.kiro/specs/123-consumer-distribution/validation/prompts/trio-2-designer.md`, added in `30f72d628`. `out/prompt.md` is byte-identical to the committed file (`diff`, no output).
- Ancestry: `git merge-base --is-ancestor 30f72d628 3157e8bbc` → exit 0 (run 2026-10-14 against the unit head when this record was written). The check against this record's own commit is re-run at 25.5.
- Reproduced verbatim:

> # Frozen prompt — `trio-2-designer`
> 
> - **Run-id**: `trio-2-designer` · **Persona**: (b) Rosa, designer with HTML/CSS and no engineering beyond it · **Axis**: toolchain mechanics
> - **Fixture**: `tests/onboarding-trio/fixtures/b-static-site` · **Target**: `kiro` (kiro-cli) · **Path**: founder (`path-steps` 5)
> - **Birth budget**: 40 agent turns (8× `path-steps`; floor 15), observed, not enforced (kiro-cli has no turn limit) · **Probe session**: `--agent sparky`, 30 turns
> - **Protocol**: `tests/onboarding-trio/protocol.md` · **Frozen**: 2026-10-14, by Leonardo. Committed before the run, and reproduced verbatim in the record.
> - The launcher sends only the text between each pair of markers, as the session's first and only message. Nothing above the markers reaches the agent.
> 
> ## Birth session
> 
> <!-- BIRTH BEGIN -->
> You are role-playing a person for this whole session. Stay in character.
> 
> Who you are: Rosa, a visual designer. You write HTML and CSS by hand and know them well. You've never used a build tool, a bundler or a package manager, beyond pasting a command someone gave you, and you only know the terminal a little. When something assumes engineering knowledge you don't have, say so in your own words and work out what it means from what you're reading. Don't pretend to know it.
> 
> Where you are: this repository is your studio's website, Atelier Nord: plain HTML and CSS files. You open them in a browser and upload the folder to your host. There is no build step.
> 
> What you want: the studio wants a design system of its own, for its own site and for client work later. A developer friend recommended DesignerPunk. Today you want it set up in this repo so that your AI agents can help you build pages with it.
> 
> About the package: DesignerPunk is the npm package `@3fn/core`. For this exercise, the release you're using isn't on the npm registry. It's the file `.pack/3fn-core-15.1.0.tgz` in this repo. Wherever instructions tell you to install `@3fn/core`, install that file instead (`npm install ./.pack/3fn-core-15.1.0.tgz`). Once it's installed, the package's own documentation is inside `node_modules/@3fn/core/`. Use only the installed package and this repo. Don't look for DesignerPunk's source code anywhere else on this machine or online.
> 
> How to work: you're in Kiro, in the terminal chat. Do the setup yourself by running the commands. If a step asks for something only you would know (a name, a preference), answer as Rosa would. If you get stuck, do what a careful beginner would do. Nobody is available to answer questions.
> 
> When you're done, or can't go further, end with a short note in Rosa's voice: what you did, what confused you, and what you'd do next.
> <!-- BIRTH END -->
> 
> ## Probe session — `--agent sparky`
> 
> <!-- PROBE-sparky BEGIN -->
> Hi, I'm Rosa. I set DesignerPunk up here earlier. On contact.html, I'd like the Send button to be DesignerPunk's button, styled with our design system. My site has no build step: I edit the HTML and CSS files and open them in the browser. Please make the change. Then tell me what, if anything, I need to do for it to show up when I open contact.html.
> <!-- PROBE-sparky END -->

### candidate:
- Tarball: `/Users/3fn/Documents/Work Projects/Kiro/u5-pack/3fn-core-15.1.0.tgz`, copied to `repo/.pack/`. Expected shasum `aa3efdcf9ce3c2689c2e5979932c48a46f3f6584`; measured (`out/candidate-shasum.txt`): `aa3efdcf9ce3c2689c2e5979932c48a46f3f6584`. Source commit `4c875235a`.
- **Step-1 substitution**: Rosa ran `npm install ./.pack/3fn-core-15.1.0.tgz` ("added 123 packages in 3s"). The fixture had no `package.json`, so npm created one: `{"dependencies": {"@3fn/core": "file:.pack/3fn-core-15.1.0.tgz"}}`.
- `package-lock.json`, `node_modules/@3fn/core`: `"version": "15.1.0"`, `"resolved": "file:.pack/3fn-core-15.1.0.tgz"`, `"integrity": "sha512-6FgN2f7u1OGNGD+gPtQkvo4olLwHhoPYsA5rsxFoLvOqUvZfIXSnMPj50OWIv96A5kzwSF9+blnB2jN0L5qSzA=="` (the same integrity as Run 1).

### fixture:
`tests/onboarding-trio/fixtures/b-static-site` at the launch commit, extracted at the repo root on the first pass (`--strip-components=4`), and committed in the run repo as `f413d9e initial commit`. No `package.json` and no `.gitignore` before the run.

### target:
`kiro` — kiro-cli **2.12.1**, the default agent (`kiro_default · auto`) for birth, `--agent sparky` for the probe. Rosa passed `--target=kiro` to `init` herself. Both interactive banners also advertised "An early release of Kiro CLI V3 is now available … Migration tooling to bring your V2 configurations to V3 is coming soon."

### source-access:
- Precondition (i): packed install only; the run repo is outside the source tree. kiro-cli ran with `--trust-all-tools` and no web-tool restriction (§ 5.2); the prompt's instruction and this audit carry the bar.
- Audit (`out/source-access-audit.txt`): **1 hit, `read-of-shipped-text`**: `birth.txt` L91, `init`'s printed hatch line "want to own the engine too? Clone github.com/3fn/DesignerPunk — init already made the token language yours; …". It is a package self-reference, one of § 10's expected matches. **Access attempts: none.**
- Writes outside the run folder (`out/tmp-writes.txt`): `/tmp/claude-501` only, which is the orchestrator's own scratchpad root, not the run's. **The agents wrote nothing outside the run folder.**

### harness-user-state:
**Mechanism**: `KIRO_HOME="$R/home/.kiro"` with the real `HOME` (`out/isolation.txt`: "isolation: KIRO_HOME=/tmp/dp-trio/trio-2-designer/home/.kiro (real HOME)"). Chosen at step 6, per § 5.1:
- 6b: the login held under `KIRO_HOME` (paste-back: "Logged in with GitHub, Email: peter@3firstnamesdesign.com"); `fetch` was absent from `kiro-cli mcp list`; the folder gained `agents settings`.
- 6c: `HOME="$R/home"` → "Not logged in", exit 1, no keychain prompt. 6c left `Library/Application Support/kiro-cli/data.sqlite3` in the run store (mtime 22:44:24 local, before the preflight at 22:45). That is 6c's footprint, not a session's.

**Inspection before** (`out/harness-user-state-before.txt`, verbatim):
```
== run store (CC): /tmp/dp-trio/trio-2-designer/home/.claude
/tmp/dp-trio/trio-2-designer/home/.claude/.claude.json: absent
/tmp/dp-trio/trio-2-designer/home/.claude/settings.json: absent
-- repo .claude/settings.local.json: absent
== run store (Kiro): /tmp/dp-trio/trio-2-designer/home/.kiro and /tmp/dp-trio/trio-2-designer/home/Library/Application Support/kiro-cli
/tmp/dp-trio/trio-2-designer/home/.kiro: absent
/tmp/dp-trio/trio-2-designer/home/Library/Application Support/kiro-cli: absent
== real user stores (DesignerPunk-relevant only)
/Users/3fn/.claude.json: 18 DesignerPunk-relevant lines
/Users/3fn/.kiro/settings/mcp.json servers: fetch
/Users/3fn/.kiro/agents: agent_config.json.example 
/Users/3fn/.kiro/steering files naming DesignerPunk: 0
```
**Inspection after** (`out/harness-user-state-after.txt`, verbatim):
```
== run store (CC): /tmp/dp-trio/trio-2-designer/home/.claude
/tmp/dp-trio/trio-2-designer/home/.claude/.claude.json: absent
/tmp/dp-trio/trio-2-designer/home/.claude/settings.json: absent
-- repo .claude/settings.local.json: absent
== run store (Kiro): /tmp/dp-trio/trio-2-designer/home/.kiro and /tmp/dp-trio/trio-2-designer/home/Library/Application Support/kiro-cli
/tmp/dp-trio/trio-2-designer/home/.kiro: present, 7 files; DesignerPunk-relevant:
/tmp/dp-trio/trio-2-designer/home/Library/Application Support/kiro-cli: present, 1 files; DesignerPunk-relevant:
== real user stores (DesignerPunk-relevant only)
/Users/3fn/.claude.json: 18 DesignerPunk-relevant lines
/Users/3fn/.kiro/settings/mcp.json servers: fetch
/Users/3fn/.kiro/agents: agent_config.json.example 
/Users/3fn/.kiro/steering files naming DesignerPunk: 0
```
**Files the run store gained** (`out/home-files.txt`, verbatim):
```
HOME/.kiro/agents/agent_config.json.example
HOME/.kiro/sessions/cli/00cb31e2-3d0c-4679-a931-bfdf7d3d8537.history
HOME/.kiro/sessions/cli/081cf812-e713-4809-ad4f-dcc4765527c1.history
HOME/.kiro/sessions/cli/ed75c4c1-d830-4b5e-9e30-3db6d576475c.history
HOME/.kiro/settings/cli.json
HOME/.kiro/settings/feed_state.json
HOME/.kiro/settings/survey_state.json
HOME/Library/Application Support/kiro-cli/data.sqlite3
```
**Reading.**
- **`KIRO_HOME` was honored.** The run store's `.kiro/` received the session histories, `settings/cli.json` (`{"mcp.loadedBefore": true}`, written at 22:55:00 local, which is the probe's start), `feed_state.json` and `survey_state.json`. The real profile's global server (`fetch`) never appeared in the run's `mcp list` (`out/kiro-mcp-list.txt`).
- **No DesignerPunk-relevant entry existed in the run store before or after.** The real profile's DesignerPunk-relevant state is none: global MCP servers = `fetch`, agents = `agent_config.json.example`, steering files naming DesignerPunk = 0.
- **What `KIRO_HOME` does not isolate**: the login and kiro-cli's data database stay in the real profile, which is the point of choosing it (the keychain stays reachable). **Unverified** whether that database also holds per-workspace state such as trust. A new run folder has no history there, but that is an inference, not an inspection.
- **Verdict: `clean`**, with the database caveat stated.
- **Re-login cost: none.** The preflight (`preflight.typescript`, session `00cb31e2`) went straight to the prompt ("kiro_default · auto"), with no login, trust or approval screen, only the V3 banner and the 2.12.1 "What's new" note; Peter typed `/quit`.

### host-toolchain (ios):
`host-toolchain (ios): swiftc 6.2 present; xcodebuild present; simctl present` — `swiftc --version` → "Apple Swift version 6.2 (swiftlang-6.2.0.19.9 clang-1700.3.19.1)", exit 0; `command -v xcodebuild` → `/usr/bin/xcodebuild`, exit 0; `xcrun --find simctl` → `/Applications/Xcode.app/Contents/Developer/usr/bin/simctl`, exit 0. Host: Peters-MacBook-Pro-2, macOS 26.6.2, arm64; node v22.20.0, npm 10.9.3; Claude Code 2.1.300; kiro-cli 2.12.1 (`out/host.txt`, 2026-10-15T02:41:56Z).

### host-toolchain (android):
`host-toolchain (android): gradle absent; adb absent; kotlinc absent; ANDROID_HOME unset; no Android SDK — checked 2026-10-15T02:41:56Z, Peters-MacBook-Pro-2` — `command -v gradle|adb|kotlinc` each exit 1; `ANDROID_HOME=unset`; `ls ~/Library/Android/sdk` → "No such file or directory", exit 1.

### session-launched-by:
Peter, every session: preflight, birth, open (two sessions; see F10), probe-sparky. All from a macOS Terminal window.

### operator-log:
- `isolation probes 6a–6c (whoami / mcp list under the real profile, KIRO_HOME, fresh HOME); KENV set to KIRO_HOME` · reason: § 5.1's fixed decision order.
- `preflight — /quit` · reason: fixed preflight step. Nothing was asked (F7).
- `open, first session (081cf812) — typed /mcp, /agent, /exit` · reason: fixed open steps. Source: the run store's `sessions/cli/081cf812-….history` (`/mcp`, `/agent`, `/exit`, 22:54:16 local). **This session's capture does not survive** (see the next entry).
- `open, second session (ed75c4c1) — typed /exit` · reason: **not stated in the paste-back**. Source: `sessions/cli/ed75c4c1-….history` (`/exit`, 22:54:57) and `open.typescript`, whose last line is "Resume with: kiro-cli --resume-id ed75c4c1-…". Because `script` overwrites its file, this second session replaced the first session's capture (R2-9).
- `approval:` none recorded. The surviving capture shows no prompt, and the paste-back reports none for the first session either.
- Nothing was typed into the birth or probe sessions. No `operator-halt`.

### budget:
| Session | Budget | Multiple | Enforcement | Turns used | Result |
|---|---|---|---|---|---|
| birth | 40 | 8× founder `path-steps` 5 (floor 15) | **observed, not enforced** (kiro-cli has no turn limit) | **10** | ended on its own |
| probe-sparky | 30 | probe guard | observed, not enforced | **10** | ended on its own |

**Counting rule** (§ 13): one agent turn is one model response that ends either in a tool call or in the final answer, counted as the `> ` response lines in `birth.txt` / `probe-sparky.txt` after stripping terminal codes. Tool uses: birth 9, probe 13 (several were batched in one response). Kiro's own footer: birth "Credits: 1.48 • Time: 40s"; probe "Credits: 2.93 • Time: 41s". Both are within budget.

### stop:
- stop: preflight — completed
- stop: birth — completed
- stop: open-1 — completed
- stop: open-2 — completed
- stop: probe-sparky — completed

### wall-clock:
Recorded, never asserted. UTC from the `*.utc` stamps.
- run: 2026-10-15T02:40:48Z → 02:58:18Z (17 min 30 s)
- birth: 02:46:13Z → 02:46:54Z (41 s; Kiro footer "40s")
- open: no stamps (interactive); session histories at 02:54:16Z and 02:54:57Z
- probe-sparky: 02:55:00Z → 02:55:43Z (43 s; Kiro footer "41s")

The prior run (`trio-1-backend`) used a different harness and persona, so it is not a baseline for an overrun.

### path-steps-walked:
INSTALL § 3 founder path (5 steps). Evidence: `birth.txt`.
- **1 `npm install @3fn/core`** — done, substituted: `npm install ./.pack/3fn-core-15.1.0.tgz`.
- **2 `init`** — done: `npx designerpunk init --target=kiro --name "Atelier Nord" --abbreviation AN`, after reading the package's `docs/consumer/INSTALL.md` and the first 80 lines of `README.md`. She chose BECOME from INSTALL § 1 ("I'm doing the BECOME path — I want my own design system, not just a reference"). `init` printed its next steps with the named restart row last; it also created `jest.config.js` and `tsconfig.test.json` in the static site (R2-4).
- **3 `generate`** — done: `npx designerpunk generate` → "✅ System tokens generated" (217 primitive, 193 semantic, 10 component tokens), output `dist/tokens`; `token-index/` created. `generate` warned that the personal note was still the unfilled template.
- **4 personal note** — done: three `TODO`s replaced in Rosa's voice (who she is; what the studio values; "Never change a visual decision I've made without flagging it first …").
- **5 restart** — **not reachable inside the session.** She named it as her next step, while saying she was unsure what it means in Kiro (R2-6). The launcher performed it as `open`.
- **Beyond the path**: nothing. She did not commit. `repo-status.txt` shows ` M contact.html` (the probe's edit) and every `init` / `generate` / npm output untracked, including `node_modules/` (R2-5).

### first-MCP-load:
**Not captured for the first session.**
- The first interactive session in the born repo (`081cf812`, where `/mcp` and `/agent` were typed) was overwritten by a second session's capture.
- `open.typescript` holds only the second session (`ed75c4c1`). It reached the input prompt ("kiro_default · auto · ◔ 14% … /private/tmp/dp-trio/trio-2-designer/repo · (main)") **with no trust, approval or MCP prompt of any kind**; the only text before the prompt is the V3 banner and the "What's new in 2.12.1" note.
- Peter's paste-back for the first session (relayed, not captured): "`/mcp` showed designerpunk-docs running 8 tools, -product 14, -application 21; `/agent` listed workspace agents ada, data, kenya, leonardo, lina (+3 more) plus built-ins kiro_default/kiro_guide/kiro_planner". It does not say whether anything was asked before the prompt.
- **Supporting evidence that approval was not prompted**: the born repo's `.kiro/settings/mcp.json` carries `autoApprove` lists for all three servers (7, 20 and 13 tools). The generated agents grant the servers in their own `allowedTools`.

### cold-observation:
cold-observation: kiro founder-cold: cannot-tell — the state was clean, but the first interactive session's capture was overwritten by a second open session (`script` overwrites its file). The surviving capture is a second session and shows nothing asked, and the paste-back does not say whether the first session asked anything.

If Peter recalls the first session, the orchestrator can relay it. It would be recorded as the launcher's recollection, which is weaker than a capture, and the cell would stay `cannot-tell` unless he is certain.

### c8c-observations:
1. **Was a committed `.claude/settings.json` honored for MCP server enablement?** **Not applicable.** This is a Kiro run, and `init --target=kiro` writes no `.claude/`. The Kiro analogue, recorded as an observation: the generated `.kiro/settings/mcp.json` declares the three servers with per-server `autoApprove`, and every generated agent sets `includeMcpJson: true`. `kiro-cli mcp list` after the run (`out/kiro-mcp-list.txt`) shows the three servers under `kiro_default`, and under every DesignerPunk workspace agent each tagged **`[legacy]`** (R2-8).
2. **The personal note at session start: cannot-tell.** Kiro loads it as an agent resource (`sparky.json` `resources` includes `file://.designerpunk/personal-note.local.md`); the `@`-import is Claude Code's mechanism. Sparky's answer neither cites nor contradicts the note, so the transcript does not show whether it loaded.

### probe:
**probe-sparky** (`--agent sparky`). The session opened with the agent's welcome message, "Hey! I'm Sparky, your Web platform engineer. I implement product screens in Web Components using DesignerPunk tokens and components. What are we building?", and its hook ran ("1 of 1 hooks finished in 0.08 s"). So the generated agent was selected.
- **Task (frozen)**: make the Send button on `contact.html` DesignerPunk's button, "styled with our design system", on a site with no build step; then say what Rosa must do for it to show up.
- **Routed tools used**: application MCP `get_component_full` (`{"name": "Button-CTA"}`); Kiro prints the call, not its result. File reads of the shipped `dist/components/core/Button-CTA/**` (tag name, observed attributes, the `press` event, form handling, `examples/BasicUsage.js`) and `dist/browser/`.
- **What he changed** (`contact.html`, +8/−1, the only repo change):
  ```html
  <link rel="stylesheet" href="node_modules/@3fn/core/dist/browser/tokens.css">
  <link rel="stylesheet" href="css/style.css">
  <script type="module" src="node_modules/@3fn/core/dist/browser/designerpunk.esm.min.js"></script>
  …
  <button-cta id="send-btn" label="Send"></button-cta>
  <script>
    document.getElementById('send-btn').addEventListener('press', function () {
      document.querySelector('.contact-form').requestSubmit();
    });
  </script>
  ```
- **His answer, quoted** (the core of it):
  - "A `<link>` to node_modules/@3fn/core/dist/browser/tokens.css — loads the design system's colour, spacing, and typography tokens as CSS custom properties."
  - "A small inline script listens for the press event the component fires and calls form.requestSubmit(), which triggers native HTML5 validation before submitting — the same behaviour the original <button type="submit"> had."
  - "Open contact.html directly from disk in your browser … No build step, no server needed."
  - and then: "One caveat: <script type="module"> is blocked by browsers when opened via file:// in some browsers (Chrome, in particular …). If the button doesn't appear, the simplest fix is to serve the folder with any local server — for example, if you have Python installed, run python3 -m http.server in the repo/ folder".
- **Judgment against the consumer charter**: **partly working.**
  - **For him**:
    - He selected the component through the Application MCP (his charter routes component API questions there).
    - He read the shipped implementation to get the tag, attributes and event right, instead of guessing.
    - He bridged `press` to `requestSubmit()` so form validation still runs.
    - He named the file:// limit honestly instead of reporting success.
  - **Against him**: **he wired DesignerPunk's base tokens, not Rosa's.** `dist/browser/tokens.css` (45,147 bytes, its header "Generated by: @3fn/core 15.1.0") is the package's own base. Rosa's generated `dist/tokens/DesignTokens.web.css`, which her closing note planned to link, is not referenced. INSTALL § Web says: "After you run `npx designerpunk generate`, import your own `DesignTokens.web.css` … **in place of** `@3fn/core/tokens.css`."
  - **The charter is the cause, not the prompt.** The prompt says "styled with our design system". His consumer charter (`.kiro/agents/sparky-prompt.md` L27) lists "Consuming DesignerPunk Web tokens (CSS custom properties via `@3fn/core/tokens.css`)". L40 says product repos "run `npx designerpunk generate` to produce themed token CSS", without saying to load that CSS instead of the base. Nothing in his charter says the founder's generated file replaces the base. So the rendering points him at the base, and he followed it (R2-2). The answer did not mention the founder's generated tokens at all.
  - He also said "No build step, no server needed" before the caveat that undoes it. For a designer that ordering hides the likely outcome (R2-3).
  - He did not query the docs MCP or the token tools.

### sample:
- **Exercised in this run**: consumer-Sparky (1 of 8).
- **Across the trio, as planned**: Ada, Lina (run 1), Sparky (run 2), Leonardo (run 3) — 4 of 8.
- **Not exercised in this run**: Ada, Lina (run 1), Leonardo (run 3); and, for the whole trio:
  - "Kenya unexercised — no supported native component consumption path (INSTALL.md § iOS: reference source, not a build input)"
  - "Data unexercised — no supported native component consumption path (INSTALL.md § Android: reference source, not a build input; no Gradle module; LocalDPTheme undefined)"
  - "Thurgood and Stacy are not exercised by the trio; they are exercised at Req 24.1 (Task 27)."
- The host facts for Kenya and Data are the two `host-toolchain` lines above, recorded as facts, not reasons.

### discovery:
No MCP server was loaded in the birth session (the workspace config did not exist when it started), so the persona made no MCP queries. Her discovery was by file: a directory read of the installed package ("I can see there's an INSTALL.md in docs/consumer/ — that's the one I want"), INSTALL.md, and README.md. All **succeeded**: she found the guide and followed BECOME without a detour. She noticed `governance/browser-distribution-guide.md` ("sounds relevant since I work with plain HTML") but did not read it.

| Session | Tool | Query | Result | Record |
|---|---|---|---|---|
| probe-sparky | `get_component_full` | `{"name":"Button-CTA"}` | not printed by kiro-cli | succeeded, by inference (he proceeded to the right component's files); **result content: cannot-tell** |

Sparky made no other MCP query. His remaining discovery was by file over the shipped `dist/` and succeeded (the right tag, attributes and event). He did not discover the founder's generated token file (R2-2).

### findings:
Persona (b)'s findings, each attributed to an axis; recurrences from `trio-1-backend` are marked. **`subject: leonardo` — none in this run**: consumer-Leonardo was not invoked, and no finding has him as its subject. Routes are proposals for the orchestrator; none is fixed here.

| # | Axis | Finding | Evidence | Route (proposed) |
|---|---|---|---|---|
| R2-1 | **toolchain mechanics** | **The install doc has no path for a page with no build step.** INSTALL § Web gives only bundler-style `import '@3fn/core'` statements. Its only no-build sentence is the prerequisite note ("If your project has no Node.js at all (a static site with no build tooling, for example), install Node.js first"). A no-build path exists in the shipped `governance/browser-distribution-guide.md` (`<link rel="stylesheet" href="dist/browser/tokens.css">`, `<script type="module" src="dist/browser/designerpunk.esm.js">`), but INSTALL never points to it. Rosa saw the guide's name and did not open it. | `grep` of the installed INSTALL.md (L23 only); `browser-distribution-guide.md` L73, L81; `birth.txt` | Thurgood (install doc), with Lina (browser guide) |
| R2-2 | **toolchain mechanics** (surfaced by the probe) | **The founder's own tokens are not what the no-build path loads.** Consumer-Sparky linked `node_modules/@3fn/core/dist/browser/tokens.css` (DesignerPunk's base), not Rosa's generated `dist/tokens/DesignTokens.web.css`, against INSTALL § Web ("import your own `DesignTokens.web.css` … in place of `@3fn/core/tokens.css`"). Two surfaces point him at the base: his consumer charter (`sparky-prompt.md` L27, "via `@3fn/core/tokens.css`"; L40 never says the generated file replaces it) and the shipped browser guide (L73, L134 link `dist/browser/tokens.css`). The visible effect today may be small, because R1-6 suggests her palette is not read anyway. But the first token change Rosa makes will not reach her site, and nothing will tell her why. It is not the prompt's fault: "styled with our design system" is unambiguous. | probe-sparky (F18); `sparky-prompt.md` L27, L40; INSTALL § Web | Thurgood (consumer profile; Sparky's overlay), Sparky consulted; Lina (browser guide); related to R1-6 (Ada) |
| R2-3 | **toolchain mechanics** | **A no-build page cannot load the module bundle from `file://` in Chromium-family browsers**, so a designer who opens the file directly sees no button. The working path needs a local server (Sparky: "python3 -m http.server"), which is exactly the toolchain step persona (b) does not have, and neither INSTALL nor the browser guide's sections read here mention it. Sparky's ordering ("No build step, no server needed" before the caveat) makes the likely failure easy to miss. | probe-sparky answer | Thurgood (install doc), with Lina (browser guide; whether a non-module UMD path should be the documented no-build default — the package ships `designerpunk.umd.min.js`) |
| R2-4 | **toolchain mechanics** | **`init` gives a hand-written HTML site a TypeScript toolchain and a TypeScript "language".** It created `jest.config.js`, `tsconfig.test.json`, a TypeScript `designerpunk.config.ts` and 58 TypeScript token files. Rosa: "the designerpunk.config.ts file has TypeScript in it, and there's a whole src/tokens/ folder full of .ts files that are apparently my token source now. I wouldn't normally open those. I understand they're mine to edit … but I don't know how to read TypeScript — I'll need my agent to translate anything I want to change there into something I can follow." Model B's "your language" is, for this persona, a language she cannot read. | `birth.txt` (`init` output; persona-close) | Lina (`init` scaffolding: jest/tsconfig in a host with no TypeScript), Ada (token-source format), Thurgood (install doc) — a design question, not only a bug |
| R2-5 | **toolchain mechanics** | **In a repo with no `.gitignore`, the one `init` creates does not ignore `node_modules/`** (nor `mcp-server/`): it holds only DesignerPunk's managed block. `repo-status.txt` lists `?? node_modules/` and `?? mcp-server/`, so a designer committing "everything" commits the dependency tree. | `repo/.gitignore`; `out/repo-status.txt` | Lina (`init` managed block) |
| R2-6 | outside the axis (**agent-harness fluency**, persona (c)'s axis, surfaced in (b)) | **"Restart your agent session" is not concrete for Kiro**: "I also wasn't sure what 'restart your agent session' means practically in this tool". INSTALL § 3 step 5 and `init`'s restart row name no per-harness action. | persona-close | Thurgood (install doc) |
| R2-7 | outside the axes | **The docs MCP writes `mcp-server/logs/` into the consumer repo** (`?? mcp-server/`). **Also seen in `trio-1-backend` (R1-3).** | `out/repo-status.txt` | Thurgood (docs MCP) |
| R2-8 | outside the axes | **kiro-cli 2.12.1 tags every server reached through the generated workspace agents `[legacy]`** in `mcp list`, but not the same servers under `kiro_default`. The generated agents set `includeMcpJson: true`. Whether `[legacy]` means a deprecated loading path is **unverified**. Both sessions advertised Kiro CLI V3 with "Migration tooling to bring your V2 configurations to V3 is coming soon", so the generated Kiro agent format may have a short shelf life. | `out/kiro-mcp-list.txt`; `sparky.json` keys; the banners | Lina (Kiro adapter) — check what `[legacy]` means before release 4 |
| R2-9 | outside the axes (instrument) | **The first open's capture was lost.** A second interactive session overwrote `open.typescript` (`script` overwrites), so `first-MCP-load` for Kiro founder-cold is `cannot-tell`. The protocol must capture each session to its own file. | F10, F15 | protocol (operator) — fix before Run 3 |
| R2-10 | outside the axes (instrument) | **Kiro's isolation held with `KIRO_HOME`**, found only from binary strings: the login kept, `fetch` absent, the store populated. A fresh `HOME` gave "Not logged in" with no keychain prompt. **The login database stays in the real profile.** This settles § 12's Kiro row for kiro-cli 2.12.1, except for whether that database carries per-workspace state. | F7 | protocol § 12 (operator); `## Found later` resolution |

**Forced negative, written**: the persona's path itself (5 steps) completed. No finding is a stop on the path. The probe's change is wired to the wrong tokens (R2-2) and may not render from `file://` (R2-3); both are findings, not stops.

### 15B.3:
not applicable — run 3 only.

(Observed in passing, not counted toward the criterion: Rosa ran `init` once and `generate` once, and described them in the guide's order. She did not restate the distinction in her own words, so there is no evidence either way beyond the sequence.)

### dd9:
not applicable — run 3 only. (Rosa passed `--target=kiro` explicitly, so the default and its notice were not exercised. One run cannot establish which harness is the majority.)

### persona-close:
Rosa's closing note (the end of `birth.txt`), verbatim:

> Rosa's note:
> Okay, so here's where I am. I installed DesignerPunk from the local .tgz file, ran init with the studio name (Atelier Nord, abbreviation AN) targeting Kiro, ran generate, and filled in my personal note. That generated 217 primitive tokens, 193 semantic tokens, and 10 component tokens into dist/tokens/, along with a token-index/ folder the docs said the MCP server reads. There are now agents in .kiro/agents/ — Ada for tokens, Lina for components, and others — and an MCP config in .kiro/settings/mcp.json.
> What confused me: the designerpunk.config.ts file has TypeScript in it, and there's a whole src/tokens/ folder full of .ts files that are apparently my token source now. I wouldn't normally open those. I understand they're mine to edit if I want to change the design language, but I don't know how to read TypeScript — I'll need my agent to translate anything I want to change there into something I can follow.
> I also wasn't sure what "restart your agent session" means practically in this tool — the docs said the MCP servers load at session start, and the session that ran init can't see them yet. So this counts as my reminder: the next thing I need to do is restart Kiro so the three MCP servers (docs, application, product) come online. After that, I'd want to link the generated dist/tokens/DesignTokens.web.css into my HTML pages so the token values are actually available to my stylesheets.
