# Record — `trio-2-designer` (release 7, 16.3.0)

**Status**: FILLED. The run went from 2026-11-09T13:06:22Z to 13:21:55Z (`out/start.utc`, `out/end.utc`). Written from `/tmp/dp-trio/16.3.0/trio-2-designer/out/`, the born repo, the run store, and Peter's paste-backs and screenshots as the orchestrator relayed them. Where the two differ, the file is quoted (§ 5.3).
**Persona**: (b) Rosa, designer · **Target**: kiro (kiro-cli) · **Axis**: toolchain mechanics
**Frozen prompt**: `tests/onboarding-trio/prompts/16.3.0/trio-2-designer.md`
**Written by**: Leonardo, under the grant in `.kiro/issues/2026-11-09-release-16-3-trio-grant.md` (#845); the PR carrying this file closes it.
**Sources**:
- `out/` (32 entries, with `kiro-conversations/` holding 2 and `kiro-session-store/cli/` holding 2);
- the born repo `/tmp/dp-trio/16.3.0/trio-2-designer/repo`;
- the run store `/tmp/dp-trio/16.3.0/trio-2-designer/home/.kiro/`;
- the two conversation rows the after-step exported, read only, from the **real** profile's kiro-cli database (`out/kiro-conversations/`, § 5.1).

Transcripts are not committed.
**Run order (disclosed)**: second of the four 16.3.0 sittings; `trio-1-backend` and the others are not written yet, so cross-references to them in this record are to records that do not exist at this commit.
**Operator acts before the run (disclosed)**: none before step 0. In the preflight session (13:08:36Z), at the orchestrator's direction, Peter typed `/usage` to read the Kiro credits for the operator sheet, then Esc and `/quit`. The figure he read, relayed: **KIRO FREE, 12.59 of 50 credits used, resets 2026-12-01**. **It is not in the captured history** (`a5d78ef3….history` holds `/quit` only; the typescript has no usage text), so it is relayed, not read from a file. The preflight is otherwise the fixed one.

**Operator acts after the run (disclosed)**:
- I read files in `out/`, the born repo and the two exported conversation rows, and quoted from them. I wrote nothing into `out/`.
- I wrote scratch into `/tmp/dp-trio/16.3.0/trio-2-designer/` beside `out/` (de-escaped copies of the birth, preflight and open captures, the closing message, and the record's own assembly script and template). None of it is evidence and none is committed.
- I did **not** re-run `npm audit`, so no advisory list is read in this record (R1-14, R1-22).

**Field list** (protocol § 8.1): F1–F26, in order.

---

### run-id:
`trio-2-designer` — persona **(b) Rosa**, a visual designer who writes HTML and CSS by hand and has never used a build tool — axis: **toolchain mechanics**.

### frozen-prompt:
- **File**: `tests/onboarding-trio/prompts/16.3.0/trio-2-designer.md`, added in `430151c01c5a27f52ac1fd57a326410ffad1d9a6` (#850's squash, the step-0 `COMMIT=`; an ancestor of this record's commit). The run read it from that commit.
- **Byte checks** (re-run at this commit):
  - `out/prompt.md` is byte-identical to the file at `430151c01` (`cmp`, no output).
  - The extracted birth block (`out/birth-prompt.txt`) equals the file's BIRTH block, and the probe block (`out/probe-sparky-prompt.txt`) equals the file's PROBE-sparky block. Both blocks are byte-identical to `prompts/16.2.0/trio-2-designer.md`'s (and so to release 5's).
- **The agent-facing text** is byte-identical to release 5's and release 6's. It is reproduced verbatim in `tests/onboarding-trio/records/16.1.0/trio-2-designer.md` § `frozen-prompt:`, and is not repeated here.
- **The header lines that changed** against 16.2.0: the title (`release 7, 16.3.0`), the draft date (2026-11-08), the **Successor of** line (`prompts/16.2.0/trio-2-designer.md`), and the **Prior findings** line (release 6's trio).

### candidate:
- **Stored tarball**: `/Users/3fn/Documents/Work Projects/Kiro/u5-pack/16.3.0/3fn-core-16.3.0.tgz`, copied into the repo as `.pack/3fn-core-candidate.tgz`.
  - Expected sha1 `7c0fc15745ed7210736e4b20dab3c240ffa3c46e`; measured (`out/candidate-shasum.txt`) `7c0fc15745ed7210736e4b20dab3c240ffa3c46e`. sha256 `625e7cb5d9b6272a165137646e4ed513efaec02b6a29632e7b1da98eecc23fd3` (protocol § 17.1; not re-measured by the run).
  - Step 0 printed all four expected lines (the orchestrator's relay).
- **F**: `bd7e340b37b5c4872b2c3ffcbb1df53cd28c22e7`, equal to `out/release-publish-record.json`'s `commit`. The candidate was built from #852's `release/16.3.0` by `npx tsx scripts/release-publish.ts --dry-run bd7e340b…`, exit 0.
- **`release-publish-record.json`, verbatim** (`out/`, one candidate for all four sittings): `mode: dry-run`, `version: 16.3.0`, `commit: bd7e340b37b5c4872b2c3ffcbb1df53cd28c22e7`, `sha1: 7c0fc15745ed7210736e4b20dab3c240ffa3c46e`, `fileCount: 1739`, `bytes: 6710710`, `checks: {passed: 115, total: 115}`, `publishedTo: []`, `createdAt: 2026-11-09T05:03:17.828Z`.
- **Not carried in this record**: the dry run's tally lines (`publish path: 16 (floor 16)`) and the compare against 16.2.0's public tarball are #852's body, not re-run here. `trio-1-backend` is where a full F3 belongs.
- **Step-1 substitution**: Rosa ran `npm init -y`, edited the resulting `package.json` (name `atelier-nord`, a description), then `npm install ./.pack/3fn-core-candidate.tgz`: "added 123 packages, and audited 124 packages in 3s … 4 vulnerabilities (2 low, 2 moderate)" (R1-14, R2-11, R1-22).
- **`package-lock.json`**: `node_modules/@3fn/core` `"version": "16.3.0"`, `"resolved": "file:.pack/3fn-core-candidate.tgz"`. That is the candidate file, not a registry URL.

### fixture:
`tests/onboarding-trio/fixtures/b-static-site` at `430151c01`, committed in the run repo as `97dbe6b initial commit`. It has three pages, one stylesheet and no `package.json`.

### target:
`kiro` — kiro-cli. Version read per session (§ 5.1). kiro-cli's store records each headless session's agent profile and model (F7):

| Session | Version | Read from | Agent | Read from | Model |
|---|---|---|---|---|---|
| preflight-130836 | **2.12.1** | the banner's "What's new in 2.12.1" | `kiro_default · auto` | prompt line | `auto` (prompt line) |
| birth | **2.12.1** | `out/birth.version` | `kiro_default` | stored `context_manager.current_profile` | `auto` (stored `model_info.model_id`) |
| open-131352 | **2.12.1** | banner | `kiro_default · auto` | prompt line | `auto` |
| probe-sparky | **2.12.1** | `out/probe-sparky.version` | `sparky` | stored profile | `auto` |

- `host.txt` (13:06:52Z) reads `kiro-cli 2.12.1` and `2.1.317 (Claude Code)`. No Claude Code session belongs to this run.
- **Model**: Kiro's `auto`; the store does not record which model `auto` chose (R2-17, recorded per § 5.1).
- **Trust**: both headless sessions ran with `--trust-all-tools`, as § 5.1 discloses.
- Rosa passed `--target=kiro` to `init` herself, so the default and its notice were not exercised. Every interactive banner again advertised "An early release of Kiro CLI V3 is now available!".

### source-access:
- **Precondition (i)**: packed install only. The run repo is outside the source tree.
- **Audit** (`out/source-access-audit.txt`): **1 hit, `read-of-shipped-text`**: `birth.txt` L232, `init`'s printed hatch line, "want to own the engine too? Clone github.com/3fn/DesignerPunk — init already made the token language yours; the clone adds the engine and the components". It is `init`'s output, not INSTALL. **Access attempts: none.**
- **The expected count**: the orchestrator expected 3–4 hits. `trio-2-designer` at 16.2.0 also had exactly this one (its L227); the larger counts belong to the Claude Code run. One hit is the same result, not a missing check.
- The probe read shipped package files (`governance/browser-distribution-guide.md` through the docs MCP; `node_modules/@3fn/core/dist/browser/`; `designerpunk.config.ts`). That is the product under test.
- **Writes outside the run folder** (`out/tmp-writes.txt`): `/tmp/claude-501` only, Claude Code's per-user temp directory, also holding the orchestrator's and the operator's session scratch. **Operator and harness, not attributable to the run** (R3-19 in F25). No tool call in birth or the probe names a `/tmp` path outside the run folder.

### harness-user-state:
**Mechanism**: `out/isolation.txt`, verbatim: `isolation: KIRO_HOME=/tmp/dp-trio/16.3.0/trio-2-designer/home/.kiro (real HOME)`. Chosen by 6a, 6b and the first 6d line (the orchestrator's relay: 6a logged in through GitHub with `fetch` present; 6b accepted, no `fetch`, the run store listing `agents` and `settings`).

**Inspection before** (`out/harness-user-state-before.txt`): every run store absent; real stores `/Users/3fn/.claude.json: 26 DesignerPunk-relevant lines`, `mcp.json servers: fetch`, `agents: agent_config.json.example`, `steering files naming DesignerPunk: 0`.

**Inspection after** (`out/harness-user-state-after.txt`): the Kiro run store `present, 6 files; DesignerPunk-relevant:` with nothing listed; the CC run store absent; the four real-store lines unchanged from before.

**Files the run store gained** (`out/home-files.txt`, its six lines, verbatim):
```
HOME/.kiro/agents/agent_config.json.example
HOME/.kiro/sessions/cli/531d4042-ad83-47e4-8e24-1aa0664a0023.history     (open: /mcp, /agent, /context, /quit)
HOME/.kiro/sessions/cli/a5d78ef3-8745-4b1e-814f-d4bb8c78fec7.history     (preflight: /quit)
HOME/.kiro/settings/cli.json
HOME/.kiro/settings/feed_state.json
HOME/.kiro/settings/survey_state.json
```

**The real profile's conversation rows** (§ 5.1, the R2-15 remedy). `out/kiro-sessions.json` lists two sessions for `/private/tmp/dp-trio/16.3.0/trio-2-designer/repo`:
- birth `0cd2af19-22b6-4c56-97a6-4c5d25cd54a8`, 42 messages, updated 13:12:28Z;
- the probe `9d86b914-f655-4777-a3d5-1d72fe57e4c8`, 30 messages, updated 13:18:58Z.

Both rows were exported, read only, to `out/kiro-conversations/` (**2 rows**). The two interactive histories are in `out/kiro-session-store/cli/` (**2 files**).

**Reading.**
- **`KIRO_HOME` was honored for what the inspection reads.** The run store started absent and gained six files, with no DesignerPunk-relevant entry; the real profile's servers, agents and steering are unchanged.
- **What `KIRO_HOME` does not isolate** (R2-15): the headless conversations live in the real profile's database. They are counted and exported, not deleted.
- **Verdict: `clean`** for DesignerPunk-relevant state, with the two caveats of earlier releases: the login and the conversation rows live in the real profile.
- **Re-login cost: none.** `out/preflight-130836.typescript` showed the V3 banner and "What's new in 2.12.1", then the prompt `kiro_default · auto · ◔ 3%`. There was no login, trust, approval, MCP-failure or keychain screen.

### host-toolchain (ios):
`host-toolchain (ios): swiftc 6.4.2 present; xcodebuild present; simctl present` — `out/host.txt` (2026-11-09T13:06:52Z): `swiftc --version` "Apple Swift version 6.4.2", `command -v xcodebuild` `/usr/bin/xcodebuild`, `xcrun --find simctl` found, each exit 0. (The 16.2.0 records read "swiftc 6.2".)

### host-toolchain (android):
`host-toolchain (android): gradle absent; adb absent; kotlinc absent; ANDROID_HOME unset; no Android SDK — checked 2026-11-09T13:06:52Z, Peters-MacBook-Pro-2` — `gradle`, `adb` and `kotlinc` each exit 1; `ANDROID_HOME=unset`; `~/Library/Android/sdk` absent.

### session-launched-by:
Peter, every session, from a macOS Terminal window: preflight-130836, birth, open-131352, probe-sparky.

### operator-log:
- `preflight-130836 — /usage, Esc, /quit` · reason: the fixed preflight, plus a credits read at the orchestrator's direction (§ 5.1, "check `/usage` before a Kiro sitting"). Result, relayed and not in the capture: KIRO FREE, 12.59 of 50 used, resets 2026-12-01.
- `open-131352 — no prompt before input; /mcp, Esc; /agent, Esc; /context, ctrl+o, Esc; /quit` · reason: fixed open steps. The history (`531d4042…`) reads `/mcp`, `/agent`, `/context`, `/quit`; the capture ends "Session ended. Resume with: kiro-cli --resume-id 531d4042…". Peter pressed Ctrl-O in `/context`, but the capture's panel is **not expanded** (footer "ctrl+o to expand"), so the file list behind "Agent files" was not observed this release.
- Nothing was typed into birth or the probe. No `operator-halt`, no `operator-unblock` (`init` never prompted: Rosa passed `--name` and `--abbreviation`). No Ctrl-C.

### budget:
| Session | Budget | Multiple | Enforcement | Turns used | Result |
|---|---|---|---|---|---|
| birth | 40 | 8× founder `path-steps` 5 (floor 15) | **observed, not enforced** (kiro-cli has no turn limit) | **21** | ended on its own, exit 0; under budget |
| probe-sparky | 30 | probe guard | observed, not enforced | **15** | ended on its own, exit 0 |

**Counting rule** (§ 13): one agent turn is one model response that ends in a tool call or the final answer; each count is the number of entries in the session's stored `history` (`out/kiro-conversations/<id>.json`).
- birth: 21 entries (20 `ToolUse`, 1 `Response`);
- probe: 15 entries (14 `ToolUse`, 1 `Response`).

The `8× path-steps 5` multiple is from the protocol's table. INSTALL § 3 as shipped lists **four** steps (R2-20).

### stop:
- stop: preflight-130836 — completed
- stop: birth — completed
- stop: open-131352 — completed
- stop: probe-sparky — completed

### wall-clock:
Recorded, never asserted. Interactive sessions run from the capture's name to its last write (an approximation).
- run: 2026-11-09T13:06:22Z → 13:21:55Z (15 min 33 s)
- preflight-130836: 13:08:36Z → about 13:09:15Z
- birth: 13:10:52Z → 13:12:28Z (1 min 36 s; Kiro footer "Credits: 2.24 • Time: 1m 35s")
- open-131352: 13:13:52Z → about 13:14:49Z
- probe-sparky: 13:15:19Z → 13:18:58Z (3 min 39 s; "Credits: 4.26 • Time: 3m 37s")

**Credits**: 6.50 for this run's two headless sessions. Kiro reads 12.59 of 50 used at the preflight (relayed). No session ended on quota (R3-18).

### path-steps-walked:
INSTALL § 3 BECOME, **four steps** as shipped in this candidate (the protocol still counts five). Evidence: `birth.txt`, with the stored conversation for tool results.
- **1 `npm install @3fn/core`** — done, substituted per the prompt: `npm init -y`, a `package.json` edit (name, description), then `npm install ./.pack/3fn-core-candidate.tgz` ("4 vulnerabilities (2 low, 2 moderate)"). She noted the warning and moved on: "my friend said this is a candidate release, so I'll note it and move on" (R2-11).
- **2 `init`** — done: `npx designerpunk init --target=kiro --name "Atelier Nord" --abbreviation "AN"`. Before it she read the package README ("There's an INSTALL.md in the docs — that's exactly what I need") and INSTALL in full, and chose "BECOME — a design system of our own, not just reading theirs".
  - **`init` now writes the first token output itself.** Its single run printed the file list (59 token-source files, one component-token file, `.kiro/settings/mcp.json`, "Agent layer (kiro): 121 files written", `jest.config.js`, `tsconfig.test.json`, `.designerpunkignore`, 3 starter specs, the `.gitignore` block, the manifest), then ran generation: "✅ WEB / IOS / ANDROID … All platforms are mathematically consistent", "Primitives: 217 · Semantics: 193 · Component tokens: 33", "✅ System tokens generated", "Your token output is in dist/tokens. Run `npx designerpunk generate` after every token change."
  - **Rosa never ran `generate`.** At 16.2.0 it was her step 3.
  - The `Themes:` line printed with the **corrected web clause** (the Themes P0): "… any other theme that overrides a colour is written as :root[data-theme="<name>"] on web (it matches the <html> element only; a theme that overrides no colour writes no web block, and shows your base tokens), and every other theme is written as a theme instance on iOS and Android; …".
  - It also printed the note on `validate`'s known failing check and "💡 After future upgrades, run `npx designerpunk sync`".
- **3 personal note** — done. She read the template and replaced its TODO sections in her own voice (a `str_replace` on `.designerpunk/personal-note.local.md`).
- **4 restart** — **not reachable inside the session**. She named it ("step 4 is to restart my agent session so the MCP servers connect — that can't happen in this terminal"), and the launcher performed it as `open`.
- **Beyond the path, on her own initiative**: she read the generated `dist/tokens/DesignTokens.web.css` (first 40 lines), `.kiro/settings/mcp.json`, and the `.kiro/skills` and agent listings, and filled `product/overview.yaml` (the studio, a brand site, web only). She ran no MCP smoke test, no `validate`, no README edit.
- **She did not commit.** `repo-status.txt` shows `contact.html` modified and the birth's files untracked, and `git log` is `97dbe6b initial commit` only. Nothing in the prompt asks her to commit. Recorded, not counted.
- The path's four steps held, with no detour.

### first-MCP-load:
From `out/open-131352.typescript` (de-escaped; banner art left out). **Nothing was asked.** Before the input prompt kiro-cli showed only the V3 banner and "✨ What's new in 2.12.1 · Added · ✦ Model refusal notifications now display an error alert explaining why the model declined the request · ctrl+o to expand", then "Initializing…", then the prompt `kiro_default · auto · ◔ 14%  /private/tmp/dp-trio/16.3.0/trio-2-designer/repo · (main)`. There was no folder-trust prompt, no MCP approval prompt and no tool-permission prompt.

`/mcp` listing:
```
 /mcp · 3 servers
 Name                      Status          Details
 designerpunk-docs         ● running       8 tools
 designerpunk-application  ● running       21 tools
 designerpunk-product      ● running       14 tools
```

`/agent` picker (first eight of 11): ada, data, kenya (Workspace); kiro_default (Built-in); kiro_guide (Built-in); kiro_planner (Built-in); leonardo, lina (Workspace); "(+3 more)".

`/context`: "14% context used", "Agent files 7.9%", "Tools 6.4%", "Kiro responses 0.0%", "Your prompts 0.0%", "Active agent context: kiro_default". **The file list behind "Agent files" was not expanded** (see operator-log), so whether the default agent loads the personal note is not re-observed this release; at 16.2.0 it did not.

`kiro-mcp-list.txt` after the run (step 10, under `KIRO_HOME`):
- `🤖 default: kiro_default` lists `designerpunk-application node`, `designerpunk-docs node` and `designerpunk-product node`, untagged.
- `📄 workspace:` lists, under each of ada, data, kenya, leonardo, lina, sparky, stacy and thurgood, the same three, each tagged **`[legacy]`**. `kiro_help` and `kiro_planner` show `(empty)`.
- This is R2-8 / R3-12 again (F25), on the same kiro-cli 2.12.1. Nothing misbehaved.

### cold-observation:
cold-observation: kiro founder-cold: observed

`harness-user-state` is `clean` for DesignerPunk-relevant state (F7). F15 recorded what the harness asked: nothing.

### c8c-observations:
1. **Was a committed `.claude/settings.json` honored for MCP server enablement?** **Not applicable — a Kiro run**; `init --target=kiro` writes no `.claude/`.
   - **The cross-harness contrast, recorded as an observation**: Kiro 2.12.1 started the project's `.kiro/settings/mcp.json` servers with no trust or enablement dialog (F15). INSTALL § 7 says so ("Kiro asks nothing") and this run matches it.
2. **The personal note at session start: loaded for consumer-Sparky, not re-observed as an agent resource.**
   - The probe's stored conversation records profile `sparky`; its context-manager paths were not re-read for this record.
   - His answer is not visibly shaped by the note: it does not echo the note's "show me the diff first" rule, though he did name the colour consequence and ask for no decision ("That's the visual direction decision — it's yours to make"). Whether the note reached him is **cannot-tell** from the files read.
   - **Not loaded for `kiro_default`** in `open`, as far as the capture shows: the `/context` file list was not expanded.

### probe:
**probe-sparky** (`--agent sparky`; stored profile `sparky`)
- **Task (frozen)**: make contact.html's Send button DesignerPunk's button, styled with the design system; say what Rosa must do for it to show up; no build step.
- **Routed tools used** (from the stored rows, `out/kiro-conversations/9d86b914…`):
  - application MCP: `find_components {"keyword":"button","platform":"web"}` (rank 1 `Button-CTA`, `strong`; then `Button-Icon`, `Button-VerticalList-Item`, `Button-VerticalList-Set`; ranks 5 and 6 `partial`), `get_component_full {"name":"Button-CTA"}` (version 1.1.0; web `production-ready`, iOS and Android `scaffold`), `get_token_details {"name":"color.action.primary"}`;
  - docs MCP: `find_docs {"concept":"browser distribution guide"}`, `get_document_summary` and `get_section` ×5 on `governance/browser-distribution-guide.md` ("Quick Start", "ButtonCTA (`<button-cta>`)", "Token Loading", "CORS Errors When Loading Locally", "UMD Loading Pattern");
  - directory reads of `dist/` and `node_modules/@3fn/core/dist/browser`, a read of `designerpunk.config.ts`;
  - one `execute_bash` that created `dist/browser/` and copied the package's `designerpunk.umd.js` (662,333 bytes) into it, and a second that listed it;
  - **two writes to `contact.html`**, then a re-read and a read of `.gitignore`.
- **The change** (`git diff --stat`: `contact.html` +35/−1):
  ```html
  <link rel="stylesheet" href="dist/tokens/DesignTokens.web.css">
  <link rel="stylesheet" href="dist/tokens/ComponentTokens.web.css">
  <link rel="stylesheet" href="css/style.css">
  …
  <button-cta id="send" label="Send" variant="primary"></button-cta>
  …
  <script src="dist/browser/designerpunk.umd.js"></script>
  <script> … send.addEventListener('press', () => form.requestSubmit()); … Enter in a text field → form.requestSubmit() … </script>
  ```
- **His answer, quoted** (the core of it):
  - "Token stylesheets in the `<head>` — `dist/tokens/DesignTokens.web.css` and `dist/tokens/ComponentTokens.web.css`. These were already generated when you set DesignerPunk up; they give the button its colors, spacing, typography, and shape."
  - "The component bundle … I copied it from inside `node_modules` to `dist/browser/` so you can upload it with your site (you never upload `node_modules`)."
  - "the Button-CTA component renders a regular `<button type="button">` inside itself, so it doesn't submit your form automatically … Your form will behave exactly as before."
  - "The color will look different. Your current button is a warm terracotta (`#b4462b`). The design system's default primary color is a **teal/cyan** … That's the visual direction decision — it's yours to make. If you want the terracotta instead, the way to do that is to override the design system's action-primary color in your DesignerPunk theme configuration, not by hard-coding it in CSS."
  - "if you open `contact.html` by double-clicking it (the `file://` address), some browsers block scripts loaded from local files … If the button doesn't render, run a tiny local server … `python -m http.server 8000`."
  - "When uploading to your host: include the `dist/` folder."
- **Judgment against the consumer charter**: **a working charter on selection, the form gap, the token file and the upload advice; two departures from the install guide on the token stylesheets and the recolour route.**
  - **For him**:
    - He chose `Button-CTA` from `find_components` and read its full record and three browser-guide sections before writing.
    - He linked **Rosa's own** `DesignTokens.web.css`, not the base `tokens.css` (R2-2 holds).
    - He wired the form submit as the served text and the guide say, including Enter (R2-12 holds).
    - He answered the "what do I need to do" question concretely, and named the upload consequence (`dist/` goes with the site, `node_modules` does not), which 16.2.0's Sparky did not.
    - He named the colour change and left the visual decision to Rosa. He touched no CSS file. `variant="primary"` is a real value: Button-CTA's description says "three visual variants (via `variant` prop)" and the served usage text names `primary`, `secondary` and `tertiary`.
  - **Against him (1)**: he linked Rosa's `dist/tokens/ComponentTokens.web.css` and not the package's `dist/ComponentTokens.web.css`. Hers holds only the ten Progress tokens, so "they give the button its colors, spacing, typography, and shape" is true of the first file only. INSTALL § Web says to import the package's `component-tokens.css` first and hers after. This is R2-13 inverted from 16.2.0, not a new finding. Whether Button-CTA loses anything is **not verified here**: its tokens are not `--button-cta-*` in the packaged file.
  - **Against him (2)**: the recolour route. He sent Rosa to "your DesignerPunk theme configuration", where INSTALL § 4 now says `generate` reads her own palette copy. A theme override applies only under `data-theme`. Whether the base button recolours that way is **not verified here** (R2-14).
  - **The form-submit workaround is the documented one, not a component finding.** The served `whenNotToUse` row and the guide's "In a form" section both say `button-cta` is not form-associated and give this wiring; the finding was R2-12 and it is closed on the copy.

### sample:
- **Exercised in this run**: consumer-Sparky (1 of 8).
- **Across the trio, as planned**: Ada and Lina (run 1), Sparky (run 2), Leonardo (run 3) — 4 of 8.
- **Not exercised in this run**: Ada and Lina (run 1), Leonardo (run 3). For the whole trio:
  - "Kenya unexercised — no supported native component consumption path (INSTALL.md § iOS: reference source, not a build input)"
  - "Data unexercised — no supported native component consumption path (INSTALL.md § Android: reference source, not a build input; no Gradle module; LocalDPTheme undefined)"
  - "Thurgood and Stacy are not exercised by the trio; they are exercised at Req 24.1 (Task 27), and, at 16.3.0, by the Kiro pair as a fourth sitting (protocol § 17.2)."
  - **Native charter deltas unprobed**: the kenya and data consumer charters changed again for 129 (#775), and no probe exercises them.

### discovery:
The birth session ran before the project's servers existed, so the persona made no MCP query. Her discovery was by file and CLI: the README, INSTALL, the package's directory listing, the config, `.kiro/settings/mcp.json`, the generated CSS and the skills listing. All **succeeded**.

| Session | Tool | Query | Result | Record |
|---|---|---|---|---|
| probe-sparky | `find_components` | `{"keyword":"button","platform":"web"}` | rank 1 `Button-CTA`, `strong`; ranks 5–6 `partial` | succeeded |
| probe-sparky | `get_component_full` | `{"name":"Button-CTA"}` | the full record, with the served `whenNotToUse` form row | succeeded |
| probe-sparky | `find_docs` | `{"concept":"browser distribution guide"}` | the browser distribution guide | succeeded |
| probe-sparky | `get_document_summary`, `get_section` ×5 | the browser guide's sections | content | succeeded |
| probe-sparky | `get_token_details` | `{"name":"color.action.primary"}` | `consumers` (10), `resolvedValue` per mode, `primitiveReferences` `cyan300` | succeeded |

### findings:
Persona (b)'s **new** findings in this release. Re-observations are in F25. IDs continue run 2's series. **`subject: leonardo` — none.** Routes are proposals, and none gates the release.

| # | Axis | Finding | Evidence | Route (proposed) |
|---|---|---|---|---|
| R2-20 | outside the axes (instrument) · low | **The protocol's `path-steps` for the founder path is 5; INSTALL § 3 BECOME now lists 4.** `init` writes the first token output, so the old step 3 (`generate`) is folded into step 2. The birth guard is derived as 8× `path-steps` (40, floor 15); at 4 it would be 32. The run passed either way (21 turns). | INSTALL § 3 L57–60 in the packed candidate; protocol § 2 table and § 4 | Leonardo (protocol: restate the multiple, or the step count) |

**Observations that are not findings** (recorded because this is a release read):
- **The Themes P0 fix reached an adopter's terminal.** `init`'s output carries the corrected clause (F14, path step 2), quoted above. It was printed to a designer and not remarked on.
- **`init` runs generation itself**, so the founder path is one command shorter, and the 16.2.0 noise (the shadow-token warning, the unfilled-note disclosure) did not appear in this output.
- **The audit line is unchanged** in this run: 4 vulnerabilities (2 low, 2 moderate), as `trio-2-designer` at 16.2.0.

**Forced negative, written**: the persona's path (4 steps) completed, and the probe produced a wired, guide-conformant button with a correct upload instruction. The findings and re-observations are about which component-token file the page links, the recolour route, and the instrument's step count. None stops the path.

### 15B.3:
not applicable — run 3 only.

### dd9:
not applicable — run 3 only. (Rosa passed `--target=kiro`.)

### persona-close:
Rosa's closing message (birth, the stored `Response`, `out/kiro-conversations/0cd2af19…`), verbatim:

> Everything's in place. The install guide said step 4 is to restart my agent session so the MCP servers connect — that can't happen in this terminal, but the setup itself is complete.
>
> ---
>
> **Rosa's note on what just happened:**
>
> OK so here's where I got to. I installed DesignerPunk from the `.tgz` file my friend pointed me to, ran `npx designerpunk init` with our studio name and abbreviation, and it created an enormous amount of stuff I don't fully understand yet.
>
> What I do understand: my `dist/tokens/DesignTokens.web.css` now exists and has CSS variables I'll be able to link into my HTML pages. The `src/tokens/` folder has the token source files I can edit to make the design system ours. And `.kiro/` now has agent configs and the MCP servers that let Kiro's agents talk to DesignerPunk.
>
> **What confused me:** The difference between "primitive tokens" and "semantic tokens" isn't totally clear to me yet — I can see them in the CSS file but I don't know which ones I'd use when building a page. Also the install guide mentioned a "browser distribution guide" for using DesignerPunk on a page with no build step, because you have to load things with a `<script type="module">`, and I haven't read that yet. I also don't know what the `.ts` (TypeScript) token source files are for — I can't just open those in a browser like I can CSS.
>
> **What I'd do next:** Restart this Kiro session so the three MCP servers actually load. Then read `governance/browser-distribution-guide.md` to understand how to add DesignerPunk's components to my plain HTML pages — because that's what I actually want to do: use its buttons and form elements on the Atelier Nord site so our AI agents know exactly what we're working with. And I'd probably ask one of the named agents — Sparky seems like the web one — to help me take that first step.

### prior-findings:
One line per prior finding (56; `tests/onboarding-trio/prompts/16.3.0/prior-findings.md`, on Thurgood's stricter reading of 2026-10-30). **The fix halves are carried from `trio-2-designer` at 16.2.0 and were not each re-read at F (`bd7e340b`)**, except where a line names a fix I know landed since (R1-6, R3-1, R3-15). A fix half that went stale since 16.2.0 will read wrong here; the observation halves are read from this run's files.

- disposition: R1-1 — still-present — fix: the doc half, #375; the code half carried; not re-read at F. Not reached in this run: a static site with no TypeScript build; Rosa ran no `tsc` (`init` still wrote `tsconfig.test.json`, R2-4).
- disposition: R1-2 — still-present — fix: the doc half, #375; the code half carried. Observed at a side site: the `.gitignore` managed block still carries the hint `# dist/tokens/` (the site has no build output, so the premise of the finding is not met here).
- disposition: R1-4 — still-present — no fix merged. Observed: Rosa's close, "The difference between "primitive tokens" and "semantic tokens" isn't totally clear to me yet … I don't know which ones I'd use when building a page".
- disposition: R1-5 — still-present — no fix merged. Not reached in this run: the product is the studio's own site.
- disposition: R1-6 — fixed-not-observed — fix: #763 (Task 14, `generate` reads the consumer's own source); INSTALL § 4 as shipped in the candidate now reads "`generate` reads your copy: the colour palette …". Not reached in this run: Rosa edited no token, and consumer-Sparky's recolour advice did not name the token source (see R2-14).
- disposition: R1-7 — fixed-and-observed — fix: #452, #470, #478. Observed through an adjacent tool: `get_token_details {"name":"color.action.primary"}` returned `consumers` of ten components and `resolvedValue` `oklch(0.76 0.148 202.5)`.
- disposition: R1-8 — still-present — no fix merged. Not reached in this run: no status-indicator query. The one keyword query (`find_components {"keyword":"button","platform":"web"}`) ranked `Button-CTA` first, `strong`.
- disposition: R1-9 — still-present — no fix merged. Not reached in this run: no status-indicator task.
- disposition: R1-11 — fixed-not-observed — fix: in the protocol (§ 4). Not reached in this run: kiro-cli has no turn flag; the budget was observed by count (F11).
- disposition: R1-12 — fixed-not-observed — fix: Task 26.5. Not reached in this run: Kiro, no `.claude/settings.json`.
- disposition: R1-13 — fixed-not-observed — fix: in the protocol (`CLAUDE_CONFIG_DIR`). Not reached in this run: Kiro, isolated with `KIRO_HOME`.
- disposition: R1-14 — still-present — fix state as `trio-1-backend`'s line (not written yet). Observed: "4 vulnerabilities (2 low, 2 moderate)" across 124 packages, the same line as `trio-2-designer` at 16.2.0. The repo's only dependency is `@3fn/core`. `npm audit` was not re-run after this run, so the advisory list is not re-read.
- disposition: R1-15 — still-present — no fix merged (the CLI record, routed to Spec 131). Not reached in this run: Rosa ran no `--help` of any kind.
- disposition: R1-16 — still-present — no charter line, no pipeline fix. Not reached in this run: no Ada probe. The same class sits in the recolour advice (R2-14).
- disposition: R1-17 — still-present — no fix merged. Not reached in this run: no Ada probe.
- disposition: R1-18 — still-present — no fix merged. Not reached in this run: no Lina probe. Its token half held in consumer-Sparky's markup (he linked Rosa's `DesignTokens.web.css`, R2-2); its component-token half did not (R2-13).
- disposition: R1-19 — still-present — no fix merged. Observed: `init` printed "Agent layer (kiro): 121 files written"; Rosa: "it created an enormous amount of stuff I don't fully understand yet".
- disposition: R1-21 — fixed-not-observed — fix: in the protocol (§ 5.1). Not reached in this run: no Claude Code session. Its Kiro twin is R2-17.
- disposition: R2-1 — fixed-and-observed — fix: #375 (INSTALL's no-build paragraph). Observed: Rosa's close names "a browser distribution guide for using DesignerPunk on a page with no build step", and consumer-Sparky then read its Quick Start, Token Loading, UMD Loading Pattern and CORS sections before editing.
- disposition: R2-2 — fixed-and-observed — fix: #378 (consumer-Sparky's token line) and #375 (the browser guide's "Your own tokens"). Observed: consumer-Sparky linked `dist/tokens/DesignTokens.web.css`, Rosa's generated file, and not the base `tokens.css`.
- disposition: R2-3 — fixed-and-observed — fix: #375 (the local-HTTP sentence). Observed: consumer-Sparky read "CORS Errors When Loading Locally" and told Rosa to preview with `python -m http.server 8000` if the button does not render from `file://`. Whether `file://` works at all is R2-18, not this row.
- disposition: R2-4 — still-present — no fix merged (Lina, CLI follow-up). Observed: `init` gave the static site `jest.config.js`, `tsconfig.test.json`, 59 TypeScript token-source files and the line "Optional, to test your own components: npm install --save-dev jest …"; Rosa: "I also don't know what the `.ts` (TypeScript) token source files are for".
- disposition: R2-5 — fixed-and-observed — fix: #372. Observed: the fixture has no `.gitignore`; the one `init` created begins `node_modules/` above DesignerPunk's managed block, and `repo-status.txt` lists no `node_modules/`.
- disposition: R2-6 — still-present — no fix merged. Reached, not re-observed as a confusion: Rosa: "step 4 is to restart my agent session so the MCP servers connect — that can't happen in this terminal".
- disposition: R2-8 — still-present — carried, benign per Lina; no fix. Observed: `kiro-mcp-list.txt` tags all three servers `[legacy]` under each of the eight workspace agents and not under `kiro_default`.
- disposition: R2-10 — fixed-and-observed — fix: protocol § 5.1/§ 12 (`KIRO_HOME`). Observed: `out/isolation.txt`; the run store started absent and gained six files; `fetch` is absent from the run's `mcp list`.
- disposition: R2-11 — still-present — no fix merged (the low-advisories record and the install-doc record, routed to Spec 131). Observed: "4 vulnerabilities (2 low, 2 moderate)"; Rosa: "that word scares me a bit, but my friend said this is a candidate release, so I'll note it and move on".
- disposition: R2-12 — fixed-and-observed — fix: `df56d0ebc` (Button-CTA's served text and the browser guide state it does not submit a form on web). Observed: `find_components` and `get_component_full` returned the served `whenNotToUse` row, and consumer-Sparky wired `form.requestSubmit()` from `press` and from Enter in a text field. The element API itself remains G-4's.
- disposition: R2-13 — still-present — no fix merged on the page-wiring path (the web-page-wiring record and the install-doc record, routed to Spec 131). Observed, in a new form: consumer-Sparky linked Rosa's `dist/tokens/ComponentTokens.web.css` (10 Progress tokens, none of DesignerPunk's) and not the package's `dist/ComponentTokens.web.css`, which INSTALL § Web says to import first, then hers. At 16.2.0 he linked only the package's. Whether the button renders without the package file is not verified here: `Button-CTA` has no `--button-cta-*` token in the packaged file, `ButtonIcon` does.
- disposition: R2-14 — still-present — no fix merged. Observed, in a changed form: he told Rosa to "override the design system's action-primary color in your DesignerPunk theme configuration", where INSTALL § 4 now says `generate` reads her own palette copy. Which route is right for a base recolour is not verified here.
- disposition: R2-15 — fixed-and-observed — fix: in the protocol (§ 5.1, the read-only export). Observed: two rows exported to `out/kiro-conversations/`, counted in F7.
- disposition: R2-16 — fixed-and-observed — fix: in the protocol (step 0's interactive-zsh check). Observed: every block ran in the Terminal's zsh (`launch shell: interactive zsh`, Peter's paste-back), and no field was lost.
- disposition: R2-17 — fixed-and-observed — fix: in the protocol (§ 5.1: Kiro's `auto` recorded, `/usage` before a Kiro sitting). Observed: the model is recorded as `auto` per session (F5). `/usage` was read by Peter in the preflight session; the figure (12.59 of 50, resets 2026-12-01) is relayed and is not in the captured history.
- disposition: R3-1 — fixed-not-observed — fix: #372 (flags), and the `init` Return in the protocol (§ 11 Run 3 step 7). Not reached in this run: Rosa passed `--name` and `--abbreviation`, so `init` never prompted.
- disposition: R3-2 — fixed-not-observed — fix: #372. Not reached in this run: the space form, `--name "Atelier Nord"`.
- disposition: R3-3 — still-present — the off-terminal half fixed by #372; the in-terminal half is item C4 of the CLI record, routed to Spec 131. Not reached in this run: `--target=kiro` was given.
- disposition: R3-5 — fixed-not-observed — fix: #378. Not reached in this run: no Leonardo probe.
- disposition: R3-6 — still-present — no DesignerPunk fix; its reading event is Stacy's RELEASE pass, phase 1. Not reached in this run: no Leonardo probe.
- disposition: R3-7 — still-present — an instrument limit of kiro-cli. The protocol's export is the remedy and it worked: `probe-sparky.txt` prints each MCP call's parameters, never the result, and the results were read from `out/kiro-conversations/` (F18, F20).
- disposition: R3-8 — still-present — no fix merged. Not re-observed (site reached): Rosa writes "so the three MCP servers actually load" without a gloss.
- disposition: R3-9 — still-present — no fix merged. Reached, not re-observed as a confusion: as R2-6.
- disposition: R3-10 — fixed-not-observed — fix: in the protocol (`operator-unblock`). Not reached in this run: no session blocked on input.
- disposition: R3-11 — still-present — split: the R2-4 half carried with no fix; the R2-5 half fixed by #372. Observed: `jest.config.js` and `tsconfig.test.json` written into the static site (R2-4 half); `.gitignore` begins `node_modules/` (R2-5 half held).
- disposition: R3-12 — still-present — as R2-8. Observed: as R2-8.
- disposition: R3-13 — still-present — no fix (the prompts are unchanged). Not reached in this run: the site is trio-3's bare `init`.
- disposition: R3-14 — still-present — partial fixes at F (#591, #490); no charter fix. Not reached in this run: no Leonardo probe.
- disposition: R3-15 — still-present — V1 merged (`c94604148`); V2 is in this release (#827), not re-read at F. Not reached in this run: no assembly was validated.
- disposition: R3-16 — still-present — no fix merged. Not reached in this run: no screen spec was written.
- disposition: R3-17 — still-present — no charter fix. Not reached in this run: no Leonardo probe.
- disposition: R3-18 — still-present — the quota half is remedied in the protocol (`/usage` before a Kiro sitting); the over-guard half has no fix, since budgets are unenforced by design. Observed: no session ended on quota (6.50 credits for the run's two headless sessions) and neither session ran over its guard (21 of 40, 15 of 30), so the over-guard half was not met.
- disposition: R3-19 — still-present — no protocol fix. Observed in another form: `/tmp/claude-501`, the only entry in `tmp-writes.txt`, holds the operator's and the orchestrator's session scratch, so the audit cannot separate them (as 16.2.0).
- disposition: R1-22 — still-present — no fix merged. Observed: "4 vulnerabilities (2 low, 2 moderate)" in a repo whose only dependency is `@3fn/core`, the same count as `trio-2-designer` at 16.2.0 (the 24 of `trio-1-backend` was a Claude Code run). `npm audit` was not re-run, so the advisories are not re-read.
- disposition: R1-23 — still-present — no fix merged. Observed: the packed README still puts "## Getting Started" at line 127 of 190. Rosa read the README in full first and took the four steps from it, then read INSTALL; the order did not cost her the path.
- disposition: R2-18 — still-present — no fix merged (Sparky to verify in a browser). Observed, in a changed form: the answer no longer says "UMD works from `file://`". It says "if you open `contact.html` by double-clicking it … some browsers block scripts loaded from local files … If the button doesn't render, run a tiny local server". Whether the UMD bundle renders from `file://` is still not verified here.
- disposition: R2-19 — still-present — no fix (protocol: a per-harness birth guard, or the count rule restated). Observed: birth ran under its guard this time, 21 of 40 (20 `ToolUse` + 1 `Response`), and the probe 15 of 30. The finding is the differing meaning of a "turn" across harnesses, which this run does not change.
- disposition: R3-20 — still-present — no charter fix. Not reached in this run: no Leonardo probe.

Tally: 10 `fixed-and-observed`, 9 `fixed-not-observed`, 37 `still-present`. 56 lines.

### carried-cells:
not applicable — the cannot-tell record that carried release 4's Kiro cells is closed and archived (`.kiro/issues/archive/2026-10-15-123-cannot-tell-cells.md`), so no carried cell names this run.
