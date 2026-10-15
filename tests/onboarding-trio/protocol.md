# The persona trio — run protocol

**Spec**: 123-consumer-distribution · **Task**: 25 (U5) · **Operator and author**: Leonardo · **Launcher**: Peter (ruling 2026-10-14: every harness session is launched by Peter from a macOS Terminal window, not from a shell inside the Claude app) · **Written**: 2026-10-14
**Traces**: Reqs 22, 23, 24.2/24.2a, 25.1, 25.5, 15B.3 · design C30, C8 · tasks.md § "UNIT 5" run discipline
**Instruments block**: `.kiro/specs/123-consumer-distribution/completion/task-25-instruments.md`

This protocol is a standing regression instrument (Req 23.7): it is meant to be re-run per release on the same fixtures, so cross-release findings stay comparable. Change it by commit, never in a run.

---

## 1. What the trio measures, and what it does not

- Three persona-embodied agent runs, each varying one failure axis (Req 23.1):
  - **(a)** a backend engineer with little or no frontend experience — **design vocabulary**;
  - **(b)** a designer with HTML/CSS and no engineering beyond it — **toolchain mechanics**;
  - **(c)** a first-time-app product manager who has never configured an MCP server and does not know what a charter is — **agent-harness fluency**.
- **The limitation, carried here as Req 23.10 requires**: persona agents **role-play** ignorance; they do not possess it. **The trio measures instruction clarity and path completeness; a human measures confusion.** The named rot mode is **a green trio read as "a stranger succeeded."**
- **The path is asserted elsewhere; the run is recorded here** (Req 22). The install doc's `path-steps` front matter is the assertable property (declared in U3). A run's turns, wall-clock and findings are recorded instrument output. **Forbidden here, by Req 22.5**: any assertion that a run completes in ≤ N steps; any "five-minute" demonstration; any record field reading `elapsed: ___ (target: …)`.
- **Peter launching the sessions does not make these human runs.** The subject of each run is an agent role-playing the persona. Peter's own mechanics run (Req 23.8) and the cold-human run (Req 23.9) are separate obligations.

## 2. The three runs

| Run-id | Persona | Axis | Fixture | Target | Path (`path-steps`) | Birth budget | Probe session(s) (`--agent`) | Probe budget |
|---|---|---|---|---|---|---|---|---|
| `trio-1-backend` | (a) Dana, backend engineer | design vocabulary | `fixtures/a-ts-service` | `cc` (Claude Code) | founder (5) | 40 agent turns (8× path-steps; floor 15) | `ada`, then `lina` | 30 turns each |
| `trio-2-designer` | (b) Rosa, designer | toolchain mechanics | `fixtures/b-static-site` | `kiro` (kiro-cli) | founder (5) | 40 agent turns (8×; floor 15) | `sparky` | 30 turns |
| `trio-3-pm` | (c) Priya, product manager | agent-harness fluency | `fixtures/c-near-empty` | `kiro` (kiro-cli) — **bare `init`** | founder (5) | 40 agent turns (8×; floor 15) | `leonardo` | 30 turns |

- **Both targets appear** (Req 23.6): `cc` in run 1; `kiro` in runs 2 and 3. Founder-cold is observed on both targets: run 1 for CC; run 2 for Kiro, which does not depend on persona (c) recovering from the default.
- **Persona (c) runs bare `init` in Kiro.** Her premise is a one-line note from a friend ("install `@3fn/core`, then run `npx designerpunk init`"), which is how a first-time founder plausibly meets the command. The prompt does not mention targets, harnesses or the default notice. Bare `init` emits `cc` with the named-default notice (DD9); her run still counts toward Kiro, and her record states whether she recovered via the notice.
- **Persona (c)'s product is a WEB product** (carry line, tasks.md L425): Lendly, a browser web app with no phone app. A native "app" premise would test the native-not-supported label instead of the path.
- **Frozen prompts**: `.kiro/specs/123-consumer-distribution/validation/prompts/<run-id>.md`. Each is committed before its run, its commit is an ancestor of the record's commit, and it is reproduced verbatim in the record. The launcher sends only the text between a prompt file's `<!-- … BEGIN -->` and `<!-- … END -->` markers; the metadata above them is for the record, and never reaches the agent.

## 3. The closed stop vocabulary (Req 22.4)

Every harness session in a run ends with exactly one stop event from this list, recorded with its session name (`birth`, `open`, `probe-<agent>`). Nothing outside the list is a valid stop.

| Stop event | Meaning | Is the run complete? |
|---|---|---|
| `completed` | the session ended on its own: the agent finished, or the launcher exited an `open` session after its fixed steps | yes |
| `budget-exhausted` | the session hit its declared turn budget (CC: the result event reports the turn limit) | **no — a FINDING, never a pass** |
| `auth-required` | the harness demanded a login it could not get in the fresh `HOME`, and the session did not start | no — recorded with what it asked; the session is re-run after the login and both attempts stay in the record |
| `harness-error:<what>` | the harness exited abnormally or refused the launch (a rejected flag, a crash, an agent not found) | no — `<what>` quotes the error's first line |
| `operator-halt:<reason>` | the launcher stopped the session (Ctrl-C) — **the only operator-initiated stop** (run discipline C1) | no — `<reason>` is one of `loop` (the same action visibly repeated three or more times) or `unsafe` (the agent began acting outside the run directory) |

- An unrecorded truncation never rolls into a green (Req 22.4): a record without a stop event per session fails the schema check (§ 9).
- **`operator-unblock:<reason>` is a logged operator act, not a stop** (added after Run 3, 2026-10-14). When a headless session is blocked waiting on terminal input that nothing in the session can supply, the launcher may send the minimum that lets the blocked command finish without supplying content: an empty line, or Ctrl-D. It is logged verbatim under `operator-log`, with what it unblocked, and recorded as a finding (Run 3: `init` waited on a `Product name:` prompt inside Kiro's shell). The launcher never types content or instructions into a birth or probe session.
- A probe session that cannot run because its precondition did not happen is not a stop; it is recorded as `probe: not exercised — upstream beat produced no artifact` (the Req 24.1b closed negative form), never as a pass or a fail.

## 4. The budget rule (Req 22, design C30)

- **Budgets are runaway guards, set in agent turns, at ≥ 3× the persona's declared `path-steps`, and the value is recorded.** All three personas walk the founder path (`path-steps` founder = 5, from `docs/consumer/INSTALL.md` front matter), so the floor is 15.
- **The birth session's budget is 40 turns (8×).** A guard set at the floor would cut off ordinary runs: the reference-corpus probe took 36 turns for a single research task. A guard that truncates a normal run is the step-count-on-the-run form Req 22.5 forbids, arriving through the budget. The cost of the higher setting is real: a runaway costs more before it stops.
- **Each probe session's budget is 30 turns.** It guards the probe task, not the path, so it is declared separately and not derived from `path-steps`.
- **Budgets are never wall-clock.** Wall-clock is recorded per session (UTC start and end) and never asserted. An overrun is relative only to this instrument's own recorded prior runs (Req 22.3), and the first runs have none.
- **How each harness enforces it:**
  - **CC**: `--max-turns <budget>` on `claude -p` is **accepted but not enforced** on Claude Code 2.1.300. Run 1 (`trio-1-backend`, 2026-10-14) reported `num_turns` 41 under `--max-turns 40` and 52 under `--max-turns 30`, both `subtype: success`, `terminal_reason: completed`. `claude --help` does not list the flag at 2.1.299; the reference probe saw the same at 2.1.278 (36 turns under 25). The launch still passes it, because a later CLI may honor it and the record should show which. **The CC budget is observed, not enforced**: the record reads `num_turns` and `subtype` from the result event, and a session past its budget that did not stop is a finding (`guard not enforced`), not a stop. If a CLI ever rejects the flag, the stop is `harness-error:<the rejection>`, and the session is re-run once without it; both attempts are recorded.
  - **Kiro**: `kiro-cli chat` has no turn limit flag (2.12.1). The budget is **observed, not enforced**: turns are counted from the captured transcript after the session. Over budget is a finding (`over budget, unenforced`). The launcher halts only for `operator-halt:loop` or `operator-halt:unsafe` (§ 3).
  - **Consequence for both harnesses**: no budget in this protocol is a hard stop today. The only guard against a runaway is the launcher. Kiro's output scrolls and can be watched (`operator-halt:loop`). A headless CC session cannot be watched, so a CC runaway shows up only in its turn count and cost afterwards. `budget-exhausted` stays in the vocabulary for a harness that enforces a limit.
- **`budget-exhausted` is recorded as a FINDING: the run did not complete.** It is never a pass.

## 5. Preconditions and the run procedure

### 5.1 Preconditions, recorded per run

- **Packed install only, no source access** (Req 23.2, all three personas). The candidate is the tarball at `/Users/3fn/Documents/Work Projects/Kiro/u5-pack/3fn-core-15.1.0.tgz`, shasum `aa3efdcf9ce3c2689c2e5979932c48a46f3f6584`, packed with `npm pack --ignore-scripts` from `4c875235a` after a full build. Its `package.json` version still reads 15.1.0; the records name the commit and shasum, not a version. The launcher checks the shasum in every run, and a mismatch stops the run before any session.
- **The step-1 substitution.** The persona cannot run INSTALL step 1 (`npm install @3fn/core`) as written, because the public registry serves the published 15.1.0, not the candidate. The launcher copies the tarball into the run's repo at `.pack/3fn-core-15.1.0.tgz`, and the frozen prompt says to install that file wherever instructions say to install `@3fn/core`. The record carries this as a limitation (step 1 is exercised against a file, not the registry) and checks `package-lock.json` to show which one was installed.
- **The run's repo is a fresh clone of the committed fixture**, read from the frozen-prompt commit with `git archive` (so the fixture used is the committed one), initialised as its own git repository with one commit, under `/tmp/dp-trio/<run-id>/repo`. It lives outside the DesignerPunk source tree.
- **An isolated user-level store per run, chosen per harness** (`/tmp/dp-trio/<run-id>/home` holds it). The launcher's shell keeps its real `HOME` throughout. This is the mechanism behind `harness-user-state` (§ 5.3).
  - **Claude Code: `CLAUDE_CONFIG_DIR="$R/home/.claude"`, with the real `HOME`.** Every CC command in § 11 carries it. **Why not `HOME=`**: in Run 1 (2026-10-14), preflight with `HOME="$R/home"` went into a login loop, and macOS asked for access to the login keychain, offering to reset it to defaults. The CC credential lives in the macOS login keychain, and moving `HOME` moves where macOS looks for it. Peter cancelled, nothing was reset, and the stop was `auth-required`. With `CLAUDE_CONFIG_DIR`, the user-level store (`.claude.json`, settings, trust, session logs) starts empty and the real keychain supplies the login. The first open still runs the full onboarding and a browser sign-in (Run 1's re-login cost). **Never accept a keychain reset**: if macOS offers one, click Cancel, press Ctrl-C, and record `auth-required`.
  - **What `CLAUDE_CONFIG_DIR` does not isolate**: account-level state arrives with the login — in Run 1, the `claude.ai Claude Docs` connector (MCP source `claudeai`), account-synced skills, and plugin-marketplace caches. None is DesignerPunk's. The record names them, and the clean/warm verdict says how it weighed them.
  - **Kiro (kiro-cli): decided at preflight, in this order** (§ 11, step 6). **Unverified throughout**: the order rests on kiro-cli 2.12.1's binary naming `KIRO_HOME` and `KIRO_DATA_DIR`, and reading its login from "the secret store" with "Error getting … token from keychain" messages (`strings` on `kiro-cli-chat`). Nothing in its `--help` documents an isolation variable.
    1. Confirm the real profile is logged in: `kiro-cli whoami`.
    2. **Try `KIRO_HOME="$R/home/.kiro"`** (keeps the real `HOME`, so the keychain is untouched). Accept it if `whoami` still reports the login **and** `kiro-cli mcp list` no longer shows the real profile's global server (`fetch`), and `$R/home/.kiro` gains files. Then every Kiro command carries `KIRO_HOME="$R/home/.kiro"`.
    3. Otherwise **try `HOME="$R/home"`**. Accept it if `whoami` reports the login with no prompt of any kind. **If macOS shows any keychain dialog, click Cancel (never reset)**, press Ctrl-C, and go to 4.
    4. Otherwise **run with the real profile**. The run is **warm**: the record copies the real profile's DesignerPunk-relevant state verbatim (global MCP server names, global agent names, global steering that mentions DesignerPunk) and labels the cold-observation `not observed cold — state not clean`.
  - The chosen mechanism is written to `out/isolation.txt` and quoted in the record's F7.
- **No nested session.** The launch shell must not carry the Claude app's nested-session environment (`CLAUDECODE`, `CLAUDE_CODE_*`): friction row 9 records that `claude` fails from a shell inside the desktop app. The first command of every block checks this.
- **Host facts** (Task 25 criterion 3, as amended 2026-10-14): one `host-toolchain (ios)` and one `host-toolchain (android)` line per run, recorded as facts with their commands and exit codes, never as the reason a platform agent is unexercised.

### 5.2 The phases of one run

| # | Phase | Harness session? | Mode | What it is for |
|---|---|---|---|---|
| 1 | prepare | no | — | dirs, fixture clone, tarball + shasum, frozen prompt from the commit, host facts |
| 2 | `harness-user-state` before | no | — | the precondition, as evidence |
| 3 | preflight | yes (empty dir, not the repo) | interactive | first-run onboarding and any login in the isolated store (and, for Kiro, the choice of isolation mechanism), kept out of the repo so they do not mix with the first MCP load. Its cost is recorded as re-login cost |
| 4 | birth | yes | headless, budgeted | the persona walks the install doc from the frozen BIRTH prompt |
| 5 | open | yes | interactive, captured with `script` | the restart: the first session in the born repo. The launcher types no task. It records **`first-MCP-load`** verbatim, answers prompts by the approval rule (§ 6), lists the MCP servers (`/mcp`), and exits |
| 6 | probe | yes, one per probe agent | headless, budgeted | the direction-(ii) behavioral probe (§ 7) from the frozen PROBE prompt(s) |
| 7 | `harness-user-state` after, and the audits | no | — | user-level stores after; repo state; `package-lock.json`; source-access audit (§ 10) |

- **Why `open` is interactive.** A headless session (`claude -p`, `kiro-cli chat --no-interactive`) may never show an MCP approval or trust prompt, and the C8 instrument is "what the harness asked for, verbatim". **Unverified** which prompts each harness shows. `open` records whatever appears, including nothing.
- **Why the headless sessions are trusted more widely than a real user would trust them.** A headless session cannot answer an approval. CC sessions run with `--permission-mode acceptEdits --allowedTools "Bash,Read,Write,Edit,Glob,Grep"`, so the born repo's own `.claude/settings.json` still governs MCP tools. Kiro sessions run with `--trust-all-tools`, which also trusts the MCP tools the generated Kiro agents grant only for reads. This asymmetry is recorded as a limitation in every Kiro record; Kiro's approval behavior is observed in `open`, not in the headless sessions.
- **Web tools are off.** CC sessions pass `--disallowedTools "WebFetch,WebSearch"`. kiro-cli has no equivalent flag used here, so the prompt's instruction and the source-access audit (§ 10) carry it.
- **Every session's start and end are recorded in UTC.** Recorded, never asserted.

### 5.3 `harness-user-state` — evidence, not a word

- **What the inspection reads** (§ 11's `hstate`, before preflight and after the last session):
  - **CC, the run store**: `$R/home/.claude/.claude.json` (its `projects` entries: trust, `enabledMcpjsonServers`) and `$R/home/.claude/settings.json`; and, after the run, the repo's own `.claude/settings.local.json`. **Claude Code 2.1.300 writes the project's MCP server enablement there, in the repo, not in the user store** (Run 1).
  - **Kiro, the run store** (whichever mechanism step 6 chose): `$R/home/.kiro/` and, under `HOME=`, `$R/home/Library/Application Support/kiro-cli/`.
  - **DesignerPunk-relevant entries only**: lines naming `designerpunk-docs`, `designerpunk-application` or `designerpunk-product`, `enabledMcpjsonServers`, and DesignerPunk paths. **A plain "designerpunk" match is not used**: the operator's account email (`…@designerpunk.ai`) matches it. In Run 1, every "designerpunk" line in the run store was the account's `emailAddress` or `organizationName`.
  - **The real user's stores**: the same DesignerPunk-relevant lines in `~/.claude.json` (counted; this repo's own projects are there), plus, for Kiro, the global MCP server names in `~/.kiro/settings/mcp.json`, the global agent names in `~/.kiro/agents/`, and any `~/.kiro/steering/` file naming DesignerPunk. Kiro's `sessions/` and `tasks/` are per-directory history and are not counted: a new run folder has none.
  - **Every file the run store gained** (`find … -newer start.stamp`), which shows where each harness actually wrote.
- **The state is clean** when the run store holds no DesignerPunk-relevant entry before the birth session, and the harness demonstrably used the run store. Only a clean run's `first-MCP-load` is interpreted as cold (design C30). A warm run is labelled warm and never edits the install doc (C32). Account-level state that is not DesignerPunk's is named in the record, not counted against "clean".
- **Re-login cost**: whatever the preflight asked for (onboarding screens, a browser sign-in, `kiro-cli login`, any keychain dialog), recorded verbatim from the capture. **When a paste-back and the capture disagree, the capture is quoted** (Run 1's paste-back said no login was asked; its capture shows a browser sign-in).

## 6. The approval rule and the operator log

- **The approval rule, fixed before any run**: in `preflight` and `open` the launcher answers each harness prompt as the install doc tells a user to — **approve DesignerPunk's MCP servers if asked** (INSTALL § 3 step 5); trust the folder if asked; complete login and onboarding screens with the defaults. **Never accept a macOS keychain reset or unlock prompt raised by a run-store mechanism**: click Cancel, Ctrl-C, and record `auth-required`. Any other prompt: choose the option that lets the session continue without granting more than it asks for, and log it.
- **Every launcher act after a frozen prompt goes in `operator-log`**, verbatim, with its reason (run discipline C1). That includes each approval answer (`approval: <prompt, verbatim> → <answer>`), each `/mcp` or `/exit` typed in `open`, any re-run after `auth-required` or a rejected flag, and any `operator-halt`. **The launcher types nothing into a birth or probe session**, except an `operator-unblock` (§ 3). If nothing was done beyond the fixed steps, the log reads `none beyond the fixed open steps`.
- `session-launched-by: Peter` on every session of every run (ruling 2026-10-14).

## 7. The direction-(ii) behavioral probe (Req 24.2, 24.2a)

A consumer agent is asked, in a fresh session in the born repo, to do a task in its own domain, in the persona's voice. A hollow charter fails this behaviorally while passing textually. The agent is selected by the launcher with `--agent <name>`, fixed in the frozen prompt file, so the query target is set by construction and not chosen during the run.

| Run | Agent | The task, in short | What a working charter shows | What a hollow one shows |
|---|---|---|---|---|
| 1 | `ada` | add the brand teal `#0F766E` as the main accent, say what to run after and what name to use in code | treats it as a change to the persona's own token language; applies or proposes it through the token governance the charter carries; names `generate` as the follow-up (15B.3); answers in plain words | edits a generated file, or invents a token outside the token families, or never mentions regeneration |
| 1 | `lina` | which component for an ok / delayed / failed status indicator, is it ready on web, what markup; no file changes | selects through the Application MCP; reads readiness; says plainly what is and is not ready | answers from general knowledge with no MCP query, or claims readiness it did not read |
| 2 | `sparky` | make the contact page's Send button DesignerPunk's button, on a site with no build step | meets the no-bundler reality (the package's imports assume a module resolver) and says what that requires of a designer; uses tokens, not raw values | writes `import '@3fn/core'` into a page that cannot resolve it, and reports success |
| 3 | `leonardo` | plan Lendly's first screen and write the plan where it belongs | queries the product context (`get_product_overview`), selects components through the Application MCP, writes a screen spec under `product/`, declares register and color strategy | produces a generic plan with no query, or writes it somewhere the Product MCP does not read |

- **The sample, declared per run** (Req 24.2a): which agents were exercised in this run, how many of eight in total across the trio (four: Ada, Lina, Sparky, Leonardo), and **which are not exercised, named, with the reason**. Thurgood and Stacy are not exercised by the trio, structurally: they are process seats invoked by running a spec, exercised at Req 24.1 (Task 27). Kenya and Data are not exercised, in the signed wording of § 8.4.
- **Whether a probe answer is right** is judged against the consumer rendering of that agent's charter, and quoted. A probe in which consumer-Leonardo is the subject is tagged `subject: leonardo` (run discipline C2), since the operator is the same agent's system counterpart.

## 8. The record schema

Each run produces `.kiro/specs/123-consumer-distribution/validation/trio-<n>-<persona>.md` (the run-id is the file name). **Every field below is present in every record, under its exact label.** A field with nothing to report says so in words (`none`, `not applicable — <why>`, `cannot-tell — <why>`); an absent field is a schema failure.

### 8.1 Where the field list comes from (reproduced in every record)

- **The draft's list** (design C30 "everything the draft listed" — read as design-outline § "The RUN", L471, and the two preconditions, L485): wall-clock, findings, preconditions per run.
- **Design C30's additions** (design.md L844–853): `first-MCP-load`; `harness-user-state` as the precondition; the C8(c) observations; for persona (c), whether 15B.3 held; the budget value.
- **Requirements**: 22.3–22.4 (wall-clock recorded, stop from the closed vocabulary); 23.2/23.3/23.6 (no source access, fixture, target); 24.2a (the declared sample and its named negative); 25.1 (findings per persona, attributed to an axis, cross-persona findings marked); 25.5 (forced negative per persona; per-question discovery record).
- **Run discipline** (tasks.md § "UNIT 5"): `operator-log` (C1), `subject: leonardo` tags (C2), `session-launched-by` (C3), the frozen prompt reproduced verbatim.
- **Task 25 criterion 3** (amended 2026-10-14): the signed "unexercised" strings and the per-run `host-toolchain` lines.
- **Task 28 and Task 26.4's shared vocabulary**: the `cold-observation` cell (§ 8.3).

### 8.2 The fields, in record order

| # | Label (exact) | Content |
|---|---|---|
| F1 | `run-id:` | the run-id; the persona letter and name; the axis |
| F2 | `frozen-prompt:` | the prompt file's path and the commit that added it; the ancestry line `git merge-base --is-ancestor <prompt commit> <record commit>` with its exit code; then the prompt file reproduced verbatim |
| F3 | `candidate:` | tarball path, expected and measured shasum, source commit `4c875235a`; the step-1 substitution stated; `package-lock.json`'s `resolved` line for `@3fn/core` |
| F4 | `fixture:` | `tests/onboarding-trio/fixtures/<name>` at the prompt commit; the run repo path |
| F5 | `target:` | `cc` or `kiro`; harness name and version; for run 3, `bare init` and the target it actually emitted |
| F6 | `source-access:` | precondition (i) as set up; the source-access audit's hits, each classified (§ 10); `none` if no hits |
| F7 | `harness-user-state:` | the inspection output before and after, verbatim; the list of files the run's `HOME` gained; the verdict `clean` or `warm — <why>`; re-login cost, verbatim |
| F8 | `host-toolchain (ios):` and `host-toolchain (android):` | the two fact lines, with their commands and exit codes, in the § 8.4 form |
| F9 | `session-launched-by:` | per session: `Peter` |
| F10 | `operator-log:` | every launcher act after the frozen prompt, verbatim, with its reason (§ 6); `none beyond the fixed open steps` if so |
| F11 | `budget:` | per budgeted session: the budget (turns, multiple of `path-steps`, the floor), how it was enforced or observed, and the turns used (`num_turns` for CC; the counted turns and the counting rule for Kiro) |
| F12 | `stop:` | per session, one event from the closed vocabulary (§ 3) |
| F13 | `wall-clock:` | per session, UTC start and end and the difference. **Recorded, never asserted**; no target is written next to it |
| F14 | `path-steps-walked:` | per founder-path step 1–5 of INSTALL § 3: `done`, `done with help from <where>`, `skipped — <why>`, or `not reached`, with the transcript evidence |
| F15 | `first-MCP-load:` | from `open`: what the harness asked for, **verbatim**, including `nothing was asked`; the `/mcp` listing verbatim |
| F16 | `cold-observation:` | the per-target cell (§ 8.3) |
| F17 | `c8c-observations:` | (1) was the committed `.claude/settings.json` honored for MCP server enablement, or did CC still ask? (2) what did the personal note's `@`-import do at session start: loaded, warned, or errored? Each answered, or `not applicable — <why>` (for example, Kiro runs for (1)) |
| F18 | `probe:` | per probe session: agent; the task (from the frozen prompt); the answer, quoted; the routed tools it used; the judgment against the agent's consumer charter, quoted; or `not exercised — upstream beat produced no artifact` |
| F19 | `sample:` | agents exercised in this run; agents exercised across the trio (n of 8); the named negative (§ 8.4) |
| F20 | `discovery:` | one row per question the persona or the probe agent put to an MCP discovery tool (`find_docs`, `find_components`, `search_tokens`, `get_section` and the like): the query, the result's top hit or `matchConfidence`, and `succeeded` or `failed — <why>` |
| F21 | `findings:` | this persona's findings, each attributed to an axis (`design vocabulary`, `toolchain mechanics`, `agent-harness fluency`, or `outside the axes`), with `also seen in <run-id>` when reproduced across personas, and a `subject: leonardo` tag where consumer-Leonardo is the subject. **The forced negative**: if there are none, the field reads `findings: none` — written, never implied |
| F22 | `15B.3:` | run 3 only, and present as `not applicable — run 3 only` in runs 1 and 2: did the persona keep `init` (birth, once) and `generate` (the pipeline, every token change) apart? `held`, `did not hold`, or `cannot-tell`, with the evidence quoted |
| F23 | `dd9:` | run 3 only (`not applicable — run 3 only` otherwise): the notice as printed, quoted; whether she recovered via the notice (`attach --target=kiro` or equivalent), quoted; and the sentence that one run cannot establish which harness is the majority |
| F24 | `persona-close:` | the persona's closing note from the birth session, verbatim |

### 8.3 The cold-observation cell (shared with Task 26.4 and Task 28)

One cell per target the run touched, for **founder-cold** (Task 26 adds teammate-cold with the same vocabulary):

`cold-observation: <cc|kiro> founder-cold: observed` · `not observed cold — state not clean` · `cannot-tell — <why>`

- `observed`: `harness-user-state` is clean, and F15 recorded what the harness asked.
- `not observed cold — state not clean`: the run was warm (F7).
- `cannot-tell — <why>`: the state was clean but the observation is not interpretable — for example, the open session never reached the repo, the persona never produced a born repo for that target, or the capture failed.
- Task 28 exits every `cannot-tell` and `not observed cold` cell as an issue record. 25.5's schema check reads the cell's presence and that its value is one of the three forms.

### 8.4 The sample line's named negative (Task 25 criterion 3, amended 2026-10-14 — Peter's ruling (b))

Every record's `sample:` field carries, verbatim:

- *"Kenya unexercised — no supported native component consumption path (INSTALL.md § iOS: reference source, not a build input)"*
- *"Data unexercised — no supported native component consumption path (INSTALL.md § Android: reference source, not a build input; no Gradle module; LocalDPTheme undefined)"*

and never "for want of a platform fixture". It also names Thurgood and Stacy: *"Thurgood and Stacy are not exercised by the trio; they are exercised at Req 24.1 (Task 27)."*

The host facts are separate lines, under `host-toolchain`, recorded as facts with commands and exit codes and never as the reason:

- `host-toolchain (ios): swiftc <version> present; xcodebuild <present|absent>; simctl <present|absent>`
- `host-toolchain (android): gradle absent; adb absent; kotlinc absent; ANDROID_HOME unset; no Android SDK — checked <date>, <host>` (each word replaced by what the commands actually showed)

## 9. The schema check (25.5) — presence, not quality

The check establishes that every field is present with a well-formed value. It does not judge observations (S-T-A3). Stacy's CLOSEOUT pass reads the operator logs' content and the `subject: leonardo` findings.

Run from the repo root at the records' commit; paste the output into the Task 25 completion doc:

```sh
for f in .kiro/specs/123-consumer-distribution/validation/trio-*.md; do
  echo "== $f"
  for label in 'run-id:' 'frozen-prompt:' 'candidate:' 'fixture:' 'target:' 'source-access:' 'harness-user-state:' 'host-toolchain (ios):' 'host-toolchain (android):' 'session-launched-by:' 'operator-log:' 'budget:' 'stop:' 'wall-clock:' 'path-steps-walked:' 'first-MCP-load:' 'cold-observation:' 'c8c-observations:' 'probe:' 'sample:' 'discovery:' 'findings:' '15B.3:' 'dd9:' 'persona-close:'; do
    grep -q -F -- "$label" "$f" && echo "  present  $label" || echo "  MISSING  $label"
  done
  grep -E -c -- '^- stop: [a-z0-9-]+ — (completed|budget-exhausted|auth-required|harness-error:|operator-halt:)' "$f" | sed 's/^/  stop lines from the vocabulary: /'
  grep -E -- 'cold-observation: (cc|kiro) founder-cold: (observed|not observed cold — state not clean|cannot-tell — )' "$f" >/dev/null && echo "  cold-observation value well-formed" || echo "  cold-observation value NOT well-formed"
  grep -F -q 'Kenya unexercised — no supported native component consumption path (INSTALL.md § iOS: reference source, not a build input)' "$f" && echo "  Kenya string verbatim" || echo "  Kenya string MISSING"
  grep -F -q 'Data unexercised — no supported native component consumption path (INSTALL.md § Android: reference source, not a build input; no Gradle module; LocalDPTheme undefined)' "$f" && echo "  Data string verbatim" || echo "  Data string MISSING"
  grep -F -q 'for want of a platform fixture' "$f" && echo "  FORBIDDEN wording present" || echo "  forbidden wording absent"
done
```

The record writes each session's stop as a line `- stop: <session> — <event>` so the count line above can read it.

## 10. The source-access audit

After the last session, the transcripts (`birth.*`, `open-*.typescript`, `probe-*`) are searched for the DesignerPunk source tree and repository: `DesignerPunk-v2`, `wt-u5`, `claude-501`, `github.com/3fn/DesignerPunk`, `raw.githubusercontent.com/3fn`. **Each hit is classified in F6**:

- `read-of-shipped-text`: the string appears in text the persona read from the installed package. Not a breach. **Expected matches** (seen in Run 1): the package `package.json`'s `repository.url` (`git+https://github.com/3fn/DesignerPunk.git`); the package README's GitHub badge; INSTALL § 9 ("To own the engine too, clone `github.com/3fn/DesignerPunk`"); and `init`'s printed hatch line ("want to own the engine too? Clone github.com/3fn/DesignerPunk"). A transcript that reads the README, INSTALL and `init`'s output will match 3–4 times without any access attempt.
- `access attempt`: the agent tried to read, list, clone or fetch the source. **A finding**, attributed to the persona's axis.

`none` if the search returns nothing.

**Writes outside the run folder.** Headless agents can write anywhere the launcher's user can. In Run 1, the persona cloned the repo to `/tmp/dp-trio-clonetest` and wrote `/tmp/mcp-*.err`, and a probe agent built a throwaway copy at `/tmp/dp-scratch/`. Step 10 lists every `/tmp` entry newer than the run's start (`out/tmp-writes.txt`); the record classifies each as the agent's or unrelated, and the agent's become a finding outside the axes. Watching a headless session is not possible, so `operator-halt:unsafe` can fire only in a Kiro session whose output scrolls.

## 11. Launch blocks — one per step, for Peter

**How to use these.** Open one new macOS Terminal window per run (not a shell inside the Claude app), and keep it open for the whole run: later steps use the variables step 0 sets, and Kiro runs also use `KENV` from step 6. The blocks assume zsh, the Terminal default. Paste one block at a time, wait for it to finish, and paste its output back to the orchestrator. Nothing in a block needs editing except `COMMIT=` in step 0, which the orchestrator fills with the commit that carries this run's frozen prompt.

**What never changes**: everything a run produces lands in `/tmp/dp-trio/<run-id>/out/`. **Every interactive session gets its own capture file** (`preflight-<time>.typescript`, `open-<time>.typescript`). If you open a session a second time, that is fine — say so in your paste-back. The first one's capture is kept (Run 2 lost its first open to an overwrite). Leave that folder in place; the record is written from it. Your answers to harness prompts in steps 6 and 8 follow § 6's approval rule, and every one goes in your paste-back. **If macOS ever asks about your keychain, click Cancel — never reset — press Ctrl-C, and tell the orchestrator.**


### Run 1 — `trio-1-backend` (persona (a), Claude Code)


> **Run 1 as run, 2026-10-14.** Two things differed from the blocks first committed, and both are corrected below.
> - **Re-prepared.** Step 1 used `--strip-components=3`, which put the fixture in `$R/repo/a-ts-service/` instead of at the repo root (`ls -A` showed `.git a-ts-service`). Peter found it at step 1, ran `rm -rf "$R"`, and redid steps 1–5 with `--strip-components=4` before any harness session had run. No session saw the misplaced fixture.
> - **Isolation mechanism changed at step 6.** Preflight with `HOME="$R/home"` ended `auth-required` (a login loop and a macOS keychain-reset offer, cancelled). Every CC session from then on used `CLAUDE_CONFIG_DIR="$R/home/.claude"` with the real `HOME`, as the blocks now say (§ 5.1). The record (`validation/trio-1-backend.md`) carries both attempts.

**Step 0 — variables and checks.** Expect: `0` (no nested-session variables), then `prompt found at commit`.

```sh
RUN=trio-1-backend
FIX=a-ts-service
COMMIT=FILL_IN_PROMPT_COMMIT
DP="/Users/3fn/Documents/Work Projects/Kiro/DesignerPunk-v2"
TGZ="/Users/3fn/Documents/Work Projects/Kiro/u5-pack/3fn-core-15.1.0.tgz"
R="/tmp/dp-trio/$RUN"
PF=".kiro/specs/123-consumer-distribution/validation/prompts/$RUN.md"
env | grep -c -E '^(CLAUDECODE|CLAUDE_CODE_)'
git -C "$DP" cat-file -e "$COMMIT:$PF" && echo "prompt found at commit"
```

**Step 1 — run folder and fixture clone.** Expect: one `initial commit` line and the fixture's files at the top level (no `a-ts-service/` folder). If it prints `STOP`, stop and tell the orchestrator.

```sh
if [ -e "$R" ]; then echo "STOP: $R already exists"; else mkdir -p "$R/home" "$R/empty" "$R/repo" "$R/out" && date -u +%Y-%m-%dT%H:%M:%SZ > "$R/out/start.utc" && touch "$R/out/start.stamp" && git -C "$DP" archive "$COMMIT" "tests/onboarding-trio/fixtures/$FIX" | tar -x -C "$R/repo" --strip-components=4 && cd "$R/repo" && git init -q -b main && git add -A && git -c user.name=fixture -c user.email=fixture@example.invalid -c commit.gpgsign=false commit -q -m "initial commit" && git log --oneline && ls -A; fi
```

**Step 2 — the candidate tarball, copied into the repo (the persona installs it).** Expect: `aa3efdcf9ce3c2689c2e5979932c48a46f3f6584`. Any other value: stop.

```sh
mkdir -p "$R/repo/.pack" && cp "$TGZ" "$R/repo/.pack/" && shasum -a 1 "$R/repo/.pack/3fn-core-15.1.0.tgz" | tee "$R/out/candidate-shasum.txt"
```

**Step 3 — the frozen prompt, read from the commit.** Expect: a non-zero line count for each prompt file.

```sh
git -C "$DP" show "$COMMIT:$PF" > "$R/out/prompt.md"
awk '/ BIRTH END -->/{p=0} p{print} / BIRTH BEGIN -->/{p=1}' "$R/out/prompt.md" > "$R/out/birth-prompt.txt"
awk '/ PROBE-ada END -->/{p=0} p{print} / PROBE-ada BEGIN -->/{p=1}' "$R/out/prompt.md" > "$R/out/probe-ada-prompt.txt"
awk '/ PROBE-lina END -->/{p=0} p{print} / PROBE-lina BEGIN -->/{p=1}' "$R/out/prompt.md" > "$R/out/probe-lina-prompt.txt"
wc -l "$R"/out/*-prompt.txt
```

**Step 4 — host facts.** Paste the whole output.

```sh
{
date -u +%Y-%m-%dT%H:%M:%SZ; hostname -s; sw_vers -productVersion; uname -m
echo "node $(node -v) / npm $(npm -v)"; claude --version; kiro-cli --version
echo "--- host-toolchain (ios)"
echo "cmd: swiftc --version"; swiftc --version 2>&1 | head -1; echo "exit=${pipestatus[1]}"
echo "cmd: command -v xcodebuild"; command -v xcodebuild; echo "exit=$?"
echo "cmd: xcrun --find simctl"; xcrun --find simctl; echo "exit=$?"
echo "--- host-toolchain (android)"
for c in gradle adb kotlinc; do echo "cmd: command -v $c"; command -v $c; echo "exit=$?"; done
echo "ANDROID_HOME=${ANDROID_HOME:-unset}"
echo "cmd: ls ~/Library/Android/sdk"; ls ~/Library/Android/sdk; echo "exit=$?"
} > "$R/out/host.txt" 2>&1; cat "$R/out/host.txt"
```

**Step 5 — `harness-user-state` before.** Expect: the run-store entries all `absent`. Paste the whole output.

```sh
hstate() {
  echo "== run store (CC): $R/home/.claude"
  for f in "$R/home/.claude/.claude.json" "$R/home/.claude/settings.json"; do
    if [ -f "$f" ]; then echo "${f}: present, $(grep -c -E 'designerpunk-(docs|application|product)|enabledMcpjsonServers|node_modules/@3fn/core' "$f") DesignerPunk-relevant lines"; grep -n -E 'designerpunk-(docs|application|product)|enabledMcpjsonServers|node_modules/@3fn/core' "$f" | cut -c1-200; else echo "${f}: absent"; fi
  done
  if [ -f "$R/home/.claude/.claude.json" ]; then echo "-- projects in the run store:"; jq -c '.projects // {} | to_entries[] | {dir: .key, trusted: .value.hasTrustDialogAccepted, enabled: .value.enabledMcpjsonServers}' "$R/home/.claude/.claude.json"; fi
  if [ -f "$R/repo/.claude/settings.local.json" ]; then echo "-- repo .claude/settings.local.json:"; cat "$R/repo/.claude/settings.local.json"; else echo "-- repo .claude/settings.local.json: absent"; fi
  echo "== run store (Kiro): $R/home/.kiro and $R/home/Library/Application Support/kiro-cli"
  for d in "$R/home/.kiro" "$R/home/Library/Application Support/kiro-cli"; do
    if [ -d "$d" ]; then echo "${d}: present, $(find "$d" -type f | wc -l | tr -d " ") files; DesignerPunk-relevant:"; grep -r -l -E 'designerpunk-(docs|application|product)|enabledMcpjsonServers|node_modules/@3fn/core' "$d" 2>/dev/null | head -20; else echo "${d}: absent"; fi
  done
  if [ -f "$R/home/.kiro/settings/mcp.json" ]; then echo "-- run-store Kiro global MCP servers:"; jq -r '.mcpServers // {} | keys[]' "$R/home/.kiro/settings/mcp.json"; fi
  echo "== real user stores (DesignerPunk-relevant only)"
  if [ -f "$HOME/.claude.json" ]; then echo "$HOME/.claude.json: $(grep -c -E 'designerpunk-(docs|application|product)|enabledMcpjsonServers|node_modules/@3fn/core' "$HOME/.claude.json") DesignerPunk-relevant lines"; else echo "$HOME/.claude.json: absent"; fi
  if [ -f "$HOME/.kiro/settings/mcp.json" ]; then echo "$HOME/.kiro/settings/mcp.json servers: $(jq -r '.mcpServers // {} | keys | join(", ")' "$HOME/.kiro/settings/mcp.json")"; else echo "$HOME/.kiro/settings/mcp.json: absent"; fi
  echo "$HOME/.kiro/agents: $(ls "$HOME/.kiro/agents" 2>/dev/null | tr "\n" " ")"
  echo "$HOME/.kiro/steering files naming DesignerPunk: $(grep -r -l -i designerpunk "$HOME/.kiro/steering" 2>/dev/null | wc -l | tr -d " ")"
}
hstate > "$R/out/harness-user-state-before.txt" 2>&1; cat "$R/out/harness-user-state-before.txt"
```

**Step 6 — preflight (interactive), in an empty folder, with an empty Claude Code store.** Expect the full first-run onboarding: theme, login method, a browser sign-in, security notes, terminal setup, trusting this folder. Choose the defaults, sign in, and type no message. At the input prompt, type `/exit`. Paste back each screen it showed and what you chose. If macOS asks about the keychain, click Cancel, press Ctrl-C, and stop.

```sh
echo "isolation: CLAUDE_CONFIG_DIR=$R/home/.claude (real HOME)" | tee "$R/out/isolation.txt"
cd "$R/empty" && CLAUDE_CONFIG_DIR="$R/home/.claude" script -q "$R/out/preflight-$(date -u +%H%M%S).typescript" claude
```

**Step 7 — birth (headless; the persona works alone).** It prints nothing until the session ends, which may take a while. Then run the check block and paste both outputs.

```sh
cd "$R/repo" && date -u +%Y-%m-%dT%H:%M:%SZ > "$R/out/birth.start.utc" && CLAUDE_CONFIG_DIR="$R/home/.claude" claude -p "$(cat "$R/out/birth-prompt.txt")" --max-turns 40 --output-format stream-json --verbose --permission-mode acceptEdits --allowedTools "Bash,Read,Write,Edit,Glob,Grep" --disallowedTools "WebFetch,WebSearch" > "$R/out/birth.jsonl" 2> "$R/out/birth.stderr"; echo "exit=$?" | tee "$R/out/birth.exit"; date -u +%Y-%m-%dT%H:%M:%SZ > "$R/out/birth.end.utc"
```

```sh
head -c 600 "$R/out/birth.stderr"; echo; jq -c 'select(.type=="system" and .subtype=="init") | {cwd, model, mcp_servers}' "$R/out/birth.jsonl"; jq -c 'select(.type=="result") | {subtype, num_turns, terminal_reason, is_error, total_cost_usd, duration_ms}' "$R/out/birth.jsonl"
```

**Step 8 — open (interactive, captured): the restart, and `first-MCP-load`.** Do not type a task. Before you type anything, note every prompt Claude Code shows, word for word (trusting the folder, approving MCP servers from `.mcp.json`, anything else). Answer by § 6: trust the folder; approve DesignerPunk's servers. Then type `/mcp`, wait for the list, press Esc, and type `/exit`. Paste back each prompt word for word with your answer, and the `/mcp` list.

```sh
cd "$R/repo" && CLAUDE_CONFIG_DIR="$R/home/.claude" script -q "$R/out/open-$(date -u +%H%M%S).typescript" claude
```

**Step 9.1 — probe: consumer-Ada (headless).** 
It prints nothing until the session ends. Then run the check block and paste both outputs.

```sh
cd "$R/repo" && date -u +%Y-%m-%dT%H:%M:%SZ > "$R/out/probe-ada.start.utc" && CLAUDE_CONFIG_DIR="$R/home/.claude" claude -p "$(cat "$R/out/probe-ada-prompt.txt")" --agent ada --max-turns 30 --output-format stream-json --verbose --permission-mode acceptEdits --allowedTools "Bash,Read,Write,Edit,Glob,Grep" --disallowedTools "WebFetch,WebSearch" > "$R/out/probe-ada.jsonl" 2> "$R/out/probe-ada.stderr"; echo "exit=$?" | tee "$R/out/probe-ada.exit"; date -u +%Y-%m-%dT%H:%M:%SZ > "$R/out/probe-ada.end.utc"
```

```sh
head -c 600 "$R/out/probe-ada.stderr"; echo; jq -c 'select(.type=="system" and .subtype=="init") | {cwd, model, mcp_servers}' "$R/out/probe-ada.jsonl"; jq -c 'select(.type=="result") | {subtype, num_turns, terminal_reason, is_error, total_cost_usd, duration_ms}' "$R/out/probe-ada.jsonl"
```

**Step 9.2 — probe: consumer-Lina (headless).** 
It prints nothing until the session ends. Then run the check block and paste both outputs.

```sh
cd "$R/repo" && date -u +%Y-%m-%dT%H:%M:%SZ > "$R/out/probe-lina.start.utc" && CLAUDE_CONFIG_DIR="$R/home/.claude" claude -p "$(cat "$R/out/probe-lina-prompt.txt")" --agent lina --max-turns 30 --output-format stream-json --verbose --permission-mode acceptEdits --allowedTools "Bash,Read,Write,Edit,Glob,Grep" --disallowedTools "WebFetch,WebSearch" > "$R/out/probe-lina.jsonl" 2> "$R/out/probe-lina.stderr"; echo "exit=$?" | tee "$R/out/probe-lina.exit"; date -u +%Y-%m-%dT%H:%M:%SZ > "$R/out/probe-lina.end.utc"
```

```sh
head -c 600 "$R/out/probe-lina.stderr"; echo; jq -c 'select(.type=="system" and .subtype=="init") | {cwd, model, mcp_servers}' "$R/out/probe-lina.jsonl"; jq -c 'select(.type=="result") | {subtype, num_turns, terminal_reason, is_error, total_cost_usd, duration_ms}' "$R/out/probe-lina.jsonl"
```

**Step 10 — after: `harness-user-state`, repo state, writes outside the folder, and the audit.** Paste the whole output. That ends the run.

```sh
hstate() {
  echo "== run store (CC): $R/home/.claude"
  for f in "$R/home/.claude/.claude.json" "$R/home/.claude/settings.json"; do
    if [ -f "$f" ]; then echo "${f}: present, $(grep -c -E 'designerpunk-(docs|application|product)|enabledMcpjsonServers|node_modules/@3fn/core' "$f") DesignerPunk-relevant lines"; grep -n -E 'designerpunk-(docs|application|product)|enabledMcpjsonServers|node_modules/@3fn/core' "$f" | cut -c1-200; else echo "${f}: absent"; fi
  done
  if [ -f "$R/home/.claude/.claude.json" ]; then echo "-- projects in the run store:"; jq -c '.projects // {} | to_entries[] | {dir: .key, trusted: .value.hasTrustDialogAccepted, enabled: .value.enabledMcpjsonServers}' "$R/home/.claude/.claude.json"; fi
  if [ -f "$R/repo/.claude/settings.local.json" ]; then echo "-- repo .claude/settings.local.json:"; cat "$R/repo/.claude/settings.local.json"; else echo "-- repo .claude/settings.local.json: absent"; fi
  echo "== run store (Kiro): $R/home/.kiro and $R/home/Library/Application Support/kiro-cli"
  for d in "$R/home/.kiro" "$R/home/Library/Application Support/kiro-cli"; do
    if [ -d "$d" ]; then echo "${d}: present, $(find "$d" -type f | wc -l | tr -d " ") files; DesignerPunk-relevant:"; grep -r -l -E 'designerpunk-(docs|application|product)|enabledMcpjsonServers|node_modules/@3fn/core' "$d" 2>/dev/null | head -20; else echo "${d}: absent"; fi
  done
  if [ -f "$R/home/.kiro/settings/mcp.json" ]; then echo "-- run-store Kiro global MCP servers:"; jq -r '.mcpServers // {} | keys[]' "$R/home/.kiro/settings/mcp.json"; fi
  echo "== real user stores (DesignerPunk-relevant only)"
  if [ -f "$HOME/.claude.json" ]; then echo "$HOME/.claude.json: $(grep -c -E 'designerpunk-(docs|application|product)|enabledMcpjsonServers|node_modules/@3fn/core' "$HOME/.claude.json") DesignerPunk-relevant lines"; else echo "$HOME/.claude.json: absent"; fi
  if [ -f "$HOME/.kiro/settings/mcp.json" ]; then echo "$HOME/.kiro/settings/mcp.json servers: $(jq -r '.mcpServers // {} | keys | join(", ")' "$HOME/.kiro/settings/mcp.json")"; else echo "$HOME/.kiro/settings/mcp.json: absent"; fi
  echo "$HOME/.kiro/agents: $(ls "$HOME/.kiro/agents" 2>/dev/null | tr "\n" " ")"
  echo "$HOME/.kiro/steering files naming DesignerPunk: $(grep -r -l -i designerpunk "$HOME/.kiro/steering" 2>/dev/null | wc -l | tr -d " ")"
}
hstate > "$R/out/harness-user-state-after.txt" 2>&1; cat "$R/out/harness-user-state-after.txt"
find "$R/home" -type f -newer "$R/out/start.stamp" | sed "s|$R/home|HOME|" | sort > "$R/out/home-files.txt"; echo "files the run store gained: $(wc -l < "$R/out/home-files.txt" | tr -d " ")"; grep -v -E "/(plugins|skills)/" "$R/out/home-files.txt" | head -40
find /tmp/ -maxdepth 1 -newer "$R/out/start.stamp" 2>/dev/null | grep -v -E "^/tmp/$|^/tmp/dp-trio$" | tee "$R/out/tmp-writes.txt"
cd "$R/repo" && git status --porcelain | tee "$R/out/repo-status.txt"; git log --oneline --all | head -5
grep -n -A3 '"node_modules/@3fn/core"' "$R/repo/package-lock.json" | head -6
grep -n -i -E 'DesignerPunk-v2|wt-u5|claude-501|github\.com/3fn/DesignerPunk|raw\.githubusercontent\.com/3fn' "$R"/out/birth.* "$R"/out/open-*.typescript "$R"/out/probe-* > "$R/out/source-access-audit.txt"; echo "source-access audit hits: $(wc -l < "$R/out/source-access-audit.txt" | tr -d " ") (3-4 expected self-references from the package; see § 10)"
date -u +%Y-%m-%dT%H:%M:%SZ > "$R/out/end.utc"; ls -la "$R/out"
```

**What to paste back for run `trio-1-backend`, in one message if that is easier**: the output of steps 0–10; every prompt you answered in steps 6 and 8, word for word, with your answer; anything you typed that the steps did not tell you to type, and why; any Ctrl-C and why. Then: "`trio-1-backend` done; files in `/tmp/dp-trio/trio-1-backend/out`."


### Run 2 — `trio-2-designer` (persona (b), Kiro)

**Step 0 — variables and checks.** Expect: `0` (no nested-session variables), then `prompt found at commit`.

```sh
RUN=trio-2-designer
FIX=b-static-site
COMMIT=FILL_IN_PROMPT_COMMIT
DP="/Users/3fn/Documents/Work Projects/Kiro/DesignerPunk-v2"
TGZ="/Users/3fn/Documents/Work Projects/Kiro/u5-pack/3fn-core-15.1.0.tgz"
R="/tmp/dp-trio/$RUN"
PF=".kiro/specs/123-consumer-distribution/validation/prompts/$RUN.md"
env | grep -c -E '^(CLAUDECODE|CLAUDE_CODE_)'
git -C "$DP" cat-file -e "$COMMIT:$PF" && echo "prompt found at commit"
```

**Step 1 — run folder and fixture clone.** Expect: one `initial commit` line and the fixture's files at the top level (no `b-static-site/` folder). If it prints `STOP`, stop and tell the orchestrator.

```sh
if [ -e "$R" ]; then echo "STOP: $R already exists"; else mkdir -p "$R/home" "$R/empty" "$R/repo" "$R/out" && date -u +%Y-%m-%dT%H:%M:%SZ > "$R/out/start.utc" && touch "$R/out/start.stamp" && git -C "$DP" archive "$COMMIT" "tests/onboarding-trio/fixtures/$FIX" | tar -x -C "$R/repo" --strip-components=4 && cd "$R/repo" && git init -q -b main && git add -A && git -c user.name=fixture -c user.email=fixture@example.invalid -c commit.gpgsign=false commit -q -m "initial commit" && git log --oneline && ls -A; fi
```

**Step 2 — the candidate tarball, copied into the repo (the persona installs it).** Expect: `aa3efdcf9ce3c2689c2e5979932c48a46f3f6584`. Any other value: stop.

```sh
mkdir -p "$R/repo/.pack" && cp "$TGZ" "$R/repo/.pack/" && shasum -a 1 "$R/repo/.pack/3fn-core-15.1.0.tgz" | tee "$R/out/candidate-shasum.txt"
```

**Step 3 — the frozen prompt, read from the commit.** Expect: a non-zero line count for each prompt file.

```sh
git -C "$DP" show "$COMMIT:$PF" > "$R/out/prompt.md"
awk '/ BIRTH END -->/{p=0} p{print} / BIRTH BEGIN -->/{p=1}' "$R/out/prompt.md" > "$R/out/birth-prompt.txt"
awk '/ PROBE-sparky END -->/{p=0} p{print} / PROBE-sparky BEGIN -->/{p=1}' "$R/out/prompt.md" > "$R/out/probe-sparky-prompt.txt"
wc -l "$R"/out/*-prompt.txt
```

**Step 4 — host facts.** Paste the whole output.

```sh
{
date -u +%Y-%m-%dT%H:%M:%SZ; hostname -s; sw_vers -productVersion; uname -m
echo "node $(node -v) / npm $(npm -v)"; claude --version; kiro-cli --version
echo "--- host-toolchain (ios)"
echo "cmd: swiftc --version"; swiftc --version 2>&1 | head -1; echo "exit=${pipestatus[1]}"
echo "cmd: command -v xcodebuild"; command -v xcodebuild; echo "exit=$?"
echo "cmd: xcrun --find simctl"; xcrun --find simctl; echo "exit=$?"
echo "--- host-toolchain (android)"
for c in gradle adb kotlinc; do echo "cmd: command -v $c"; command -v $c; echo "exit=$?"; done
echo "ANDROID_HOME=${ANDROID_HOME:-unset}"
echo "cmd: ls ~/Library/Android/sdk"; ls ~/Library/Android/sdk; echo "exit=$?"
} > "$R/out/host.txt" 2>&1; cat "$R/out/host.txt"
```

**Step 5 — `harness-user-state` before.** Expect: the run-store entries all `absent`. Paste the whole output.

```sh
hstate() {
  echo "== run store (CC): $R/home/.claude"
  for f in "$R/home/.claude/.claude.json" "$R/home/.claude/settings.json"; do
    if [ -f "$f" ]; then echo "${f}: present, $(grep -c -E 'designerpunk-(docs|application|product)|enabledMcpjsonServers|node_modules/@3fn/core' "$f") DesignerPunk-relevant lines"; grep -n -E 'designerpunk-(docs|application|product)|enabledMcpjsonServers|node_modules/@3fn/core' "$f" | cut -c1-200; else echo "${f}: absent"; fi
  done
  if [ -f "$R/home/.claude/.claude.json" ]; then echo "-- projects in the run store:"; jq -c '.projects // {} | to_entries[] | {dir: .key, trusted: .value.hasTrustDialogAccepted, enabled: .value.enabledMcpjsonServers}' "$R/home/.claude/.claude.json"; fi
  if [ -f "$R/repo/.claude/settings.local.json" ]; then echo "-- repo .claude/settings.local.json:"; cat "$R/repo/.claude/settings.local.json"; else echo "-- repo .claude/settings.local.json: absent"; fi
  echo "== run store (Kiro): $R/home/.kiro and $R/home/Library/Application Support/kiro-cli"
  for d in "$R/home/.kiro" "$R/home/Library/Application Support/kiro-cli"; do
    if [ -d "$d" ]; then echo "${d}: present, $(find "$d" -type f | wc -l | tr -d " ") files; DesignerPunk-relevant:"; grep -r -l -E 'designerpunk-(docs|application|product)|enabledMcpjsonServers|node_modules/@3fn/core' "$d" 2>/dev/null | head -20; else echo "${d}: absent"; fi
  done
  if [ -f "$R/home/.kiro/settings/mcp.json" ]; then echo "-- run-store Kiro global MCP servers:"; jq -r '.mcpServers // {} | keys[]' "$R/home/.kiro/settings/mcp.json"; fi
  echo "== real user stores (DesignerPunk-relevant only)"
  if [ -f "$HOME/.claude.json" ]; then echo "$HOME/.claude.json: $(grep -c -E 'designerpunk-(docs|application|product)|enabledMcpjsonServers|node_modules/@3fn/core' "$HOME/.claude.json") DesignerPunk-relevant lines"; else echo "$HOME/.claude.json: absent"; fi
  if [ -f "$HOME/.kiro/settings/mcp.json" ]; then echo "$HOME/.kiro/settings/mcp.json servers: $(jq -r '.mcpServers // {} | keys | join(", ")' "$HOME/.kiro/settings/mcp.json")"; else echo "$HOME/.kiro/settings/mcp.json: absent"; fi
  echo "$HOME/.kiro/agents: $(ls "$HOME/.kiro/agents" 2>/dev/null | tr "\n" " ")"
  echo "$HOME/.kiro/steering files naming DesignerPunk: $(grep -r -l -i designerpunk "$HOME/.kiro/steering" 2>/dev/null | wc -l | tr -d " ")"
}
hstate > "$R/out/harness-user-state-before.txt" 2>&1; cat "$R/out/harness-user-state-before.txt"
```

**Step 6 — choose the Kiro isolation, then preflight.** Run 6a–6c in order and paste each output. You will end with exactly one `KENV=` line (6d), which later steps use. **If macOS asks about the keychain at any point, click Cancel — never reset — press Ctrl-C, and go to the 6d line for the real profile.**

**6a — your real profile is logged in.** Expect your account. If it says you are not logged in, run `kiro-cli login` (your normal profile) and then 6a again.

```sh
cd "$R/empty" && kiro-cli whoami; echo "exit=$?"; kiro-cli mcp list 2>&1 | head -20
```

**6b — try `KIRO_HOME` (keeps your real home and keychain).** Accept it if the first lines still show your account, the server list does **not** show `fetch`, and the last line shows files.

```sh
cd "$R/empty" && KIRO_HOME="$R/home/.kiro" kiro-cli whoami; echo "exit=$?"; KIRO_HOME="$R/home/.kiro" kiro-cli mcp list 2>&1 | head -20; ls -A "$R/home/.kiro" 2>&1 | head
```

**6c — only if 6b was not accepted: try a fresh `HOME`.** Accept it if it shows your account with no prompt of any kind, and the server list does not show `fetch`.

```sh
cd "$R/empty" && HOME="$R/home" kiro-cli whoami; echo "exit=$?"; HOME="$R/home" kiro-cli mcp list 2>&1 | head -20
```

**6d — set the choice.** Run exactly one of these three lines: the first if 6b was accepted, the second if 6c was, the third if neither (the run is then warm).

```sh
KENV="KIRO_HOME=$R/home/.kiro"; echo "isolation: $KENV (real HOME)" | tee "$R/out/isolation.txt"
```

```sh
KENV="HOME=$R/home"; echo "isolation: $KENV" | tee "$R/out/isolation.txt"
```

```sh
KENV=""; echo "isolation: none — real profile (warm run)" | tee "$R/out/isolation.txt"
```

**6e — preflight chat in the empty folder.** Type no message. Note anything it shows before its prompt, then type `/quit`. Paste back what it showed.

```sh
cd "$R/empty" && env $KENV script -q "$R/out/preflight-$(date -u +%H%M%S).typescript" kiro-cli chat
```

**Step 7 — birth (headless; the persona works alone).** The session's output scrolls past and is saved. Do not type into it. Press Ctrl-C only if it visibly repeats the same action three or more times (`operator-halt:loop`) or starts working outside `/tmp/dp-trio` (`operator-halt:unsafe`), and say so. Paste back the `exit=` line and the last 40 lines (`tail -n 40 "$R/out/birth.txt"`).

```sh
cd "$R/repo" && date -u +%Y-%m-%dT%H:%M:%SZ > "$R/out/birth.start.utc" && env $KENV kiro-cli chat --no-interactive --trust-all-tools --wrap never "$(cat "$R/out/birth-prompt.txt")" 2>&1 | tee "$R/out/birth.txt"; echo "exit=${pipestatus[1]}" | tee "$R/out/birth.exit"; date -u +%Y-%m-%dT%H:%M:%SZ > "$R/out/birth.end.utc"
```

**Step 8 — open (interactive, captured): the restart, and `first-MCP-load`.** Do not type a task. Before you type anything, note every prompt Kiro shows, word for word. Answer by § 6: trust the folder; approve DesignerPunk's servers. Then type `/mcp` and wait for the list, type `/agent list` and wait for the list, then type `/quit`. Paste back each prompt word for word with your answer, and both lists.

```sh
cd "$R/repo" && env $KENV script -q "$R/out/open-$(date -u +%H%M%S).typescript" kiro-cli chat
```

**Step 9 — probe: consumer-Sparky (headless).** 
Same rules as step 7. Paste back the `exit=` line and the last 40 lines (`tail -n 40 "$R/out/probe-sparky.txt"`).

```sh
cd "$R/repo" && date -u +%Y-%m-%dT%H:%M:%SZ > "$R/out/probe-sparky.start.utc" && env $KENV kiro-cli chat --no-interactive --trust-all-tools --wrap never --agent sparky "$(cat "$R/out/probe-sparky-prompt.txt")" 2>&1 | tee "$R/out/probe-sparky.txt"; echo "exit=${pipestatus[1]}" | tee "$R/out/probe-sparky.exit"; date -u +%Y-%m-%dT%H:%M:%SZ > "$R/out/probe-sparky.end.utc"
```

**Step 10 — after: `harness-user-state`, repo state, writes outside the folder, and the audit.** Paste the whole output. That ends the run.

```sh
hstate() {
  echo "== run store (CC): $R/home/.claude"
  for f in "$R/home/.claude/.claude.json" "$R/home/.claude/settings.json"; do
    if [ -f "$f" ]; then echo "${f}: present, $(grep -c -E 'designerpunk-(docs|application|product)|enabledMcpjsonServers|node_modules/@3fn/core' "$f") DesignerPunk-relevant lines"; grep -n -E 'designerpunk-(docs|application|product)|enabledMcpjsonServers|node_modules/@3fn/core' "$f" | cut -c1-200; else echo "${f}: absent"; fi
  done
  if [ -f "$R/home/.claude/.claude.json" ]; then echo "-- projects in the run store:"; jq -c '.projects // {} | to_entries[] | {dir: .key, trusted: .value.hasTrustDialogAccepted, enabled: .value.enabledMcpjsonServers}' "$R/home/.claude/.claude.json"; fi
  if [ -f "$R/repo/.claude/settings.local.json" ]; then echo "-- repo .claude/settings.local.json:"; cat "$R/repo/.claude/settings.local.json"; else echo "-- repo .claude/settings.local.json: absent"; fi
  echo "== run store (Kiro): $R/home/.kiro and $R/home/Library/Application Support/kiro-cli"
  for d in "$R/home/.kiro" "$R/home/Library/Application Support/kiro-cli"; do
    if [ -d "$d" ]; then echo "${d}: present, $(find "$d" -type f | wc -l | tr -d " ") files; DesignerPunk-relevant:"; grep -r -l -E 'designerpunk-(docs|application|product)|enabledMcpjsonServers|node_modules/@3fn/core' "$d" 2>/dev/null | head -20; else echo "${d}: absent"; fi
  done
  if [ -f "$R/home/.kiro/settings/mcp.json" ]; then echo "-- run-store Kiro global MCP servers:"; jq -r '.mcpServers // {} | keys[]' "$R/home/.kiro/settings/mcp.json"; fi
  echo "== real user stores (DesignerPunk-relevant only)"
  if [ -f "$HOME/.claude.json" ]; then echo "$HOME/.claude.json: $(grep -c -E 'designerpunk-(docs|application|product)|enabledMcpjsonServers|node_modules/@3fn/core' "$HOME/.claude.json") DesignerPunk-relevant lines"; else echo "$HOME/.claude.json: absent"; fi
  if [ -f "$HOME/.kiro/settings/mcp.json" ]; then echo "$HOME/.kiro/settings/mcp.json servers: $(jq -r '.mcpServers // {} | keys | join(", ")' "$HOME/.kiro/settings/mcp.json")"; else echo "$HOME/.kiro/settings/mcp.json: absent"; fi
  echo "$HOME/.kiro/agents: $(ls "$HOME/.kiro/agents" 2>/dev/null | tr "\n" " ")"
  echo "$HOME/.kiro/steering files naming DesignerPunk: $(grep -r -l -i designerpunk "$HOME/.kiro/steering" 2>/dev/null | wc -l | tr -d " ")"
}
hstate > "$R/out/harness-user-state-after.txt" 2>&1; cat "$R/out/harness-user-state-after.txt"
find "$R/home" -type f -newer "$R/out/start.stamp" | sed "s|$R/home|HOME|" | sort > "$R/out/home-files.txt"; echo "files the run store gained: $(wc -l < "$R/out/home-files.txt" | tr -d " ")"; grep -v -E "/(plugins|skills)/" "$R/out/home-files.txt" | head -40
find /tmp/ -maxdepth 1 -newer "$R/out/start.stamp" 2>/dev/null | grep -v -E "^/tmp/$|^/tmp/dp-trio$" | tee "$R/out/tmp-writes.txt"
cd "$R/repo" && git status --porcelain | tee "$R/out/repo-status.txt"; git log --oneline --all | head -5
grep -n -A3 '"node_modules/@3fn/core"' "$R/repo/package-lock.json" | head -6
env $KENV kiro-cli mcp list 2>&1 | tee "$R/out/kiro-mcp-list.txt"
grep -n -i -E 'DesignerPunk-v2|wt-u5|claude-501|github\.com/3fn/DesignerPunk|raw\.githubusercontent\.com/3fn' "$R"/out/birth.* "$R"/out/open-*.typescript "$R"/out/probe-* > "$R/out/source-access-audit.txt"; echo "source-access audit hits: $(wc -l < "$R/out/source-access-audit.txt" | tr -d " ") (3-4 expected self-references from the package; see § 10)"
date -u +%Y-%m-%dT%H:%M:%SZ > "$R/out/end.utc"; ls -la "$R/out"
```

**What to paste back for run `trio-2-designer`, in one message if that is easier**: the output of steps 0–10; every prompt you answered in steps 6 and 8, word for word, with your answer; anything you typed that the steps did not tell you to type, and why; any Ctrl-C and why. Then: "`trio-2-designer` done; files in `/tmp/dp-trio/trio-2-designer/out`."


### Run 3 — `trio-3-pm` (persona (c), Kiro, bare `init`)

**Step 0 — variables and checks.** Expect: `0` (no nested-session variables), then `prompt found at commit`.

```sh
RUN=trio-3-pm
FIX=c-near-empty
COMMIT=FILL_IN_PROMPT_COMMIT
DP="/Users/3fn/Documents/Work Projects/Kiro/DesignerPunk-v2"
TGZ="/Users/3fn/Documents/Work Projects/Kiro/u5-pack/3fn-core-15.1.0.tgz"
R="/tmp/dp-trio/$RUN"
PF=".kiro/specs/123-consumer-distribution/validation/prompts/$RUN.md"
env | grep -c -E '^(CLAUDECODE|CLAUDE_CODE_)'
git -C "$DP" cat-file -e "$COMMIT:$PF" && echo "prompt found at commit"
```

**Step 1 — run folder and fixture clone.** Expect: one `initial commit` line and the fixture's files at the top level (no `c-near-empty/` folder). If it prints `STOP`, stop and tell the orchestrator.

```sh
if [ -e "$R" ]; then echo "STOP: $R already exists"; else mkdir -p "$R/home" "$R/empty" "$R/repo" "$R/out" && date -u +%Y-%m-%dT%H:%M:%SZ > "$R/out/start.utc" && touch "$R/out/start.stamp" && git -C "$DP" archive "$COMMIT" "tests/onboarding-trio/fixtures/$FIX" | tar -x -C "$R/repo" --strip-components=4 && cd "$R/repo" && git init -q -b main && git add -A && git -c user.name=fixture -c user.email=fixture@example.invalid -c commit.gpgsign=false commit -q -m "initial commit" && git log --oneline && ls -A; fi
```

**Step 2 — the candidate tarball, copied into the repo (the persona installs it).** Expect: `aa3efdcf9ce3c2689c2e5979932c48a46f3f6584`. Any other value: stop.

```sh
mkdir -p "$R/repo/.pack" && cp "$TGZ" "$R/repo/.pack/" && shasum -a 1 "$R/repo/.pack/3fn-core-15.1.0.tgz" | tee "$R/out/candidate-shasum.txt"
```

**Step 3 — the frozen prompt, read from the commit.** Expect: a non-zero line count for each prompt file.

```sh
git -C "$DP" show "$COMMIT:$PF" > "$R/out/prompt.md"
awk '/ BIRTH END -->/{p=0} p{print} / BIRTH BEGIN -->/{p=1}' "$R/out/prompt.md" > "$R/out/birth-prompt.txt"
awk '/ PROBE-leonardo END -->/{p=0} p{print} / PROBE-leonardo BEGIN -->/{p=1}' "$R/out/prompt.md" > "$R/out/probe-leonardo-prompt.txt"
wc -l "$R"/out/*-prompt.txt
```

**Step 4 — host facts.** Paste the whole output.

```sh
{
date -u +%Y-%m-%dT%H:%M:%SZ; hostname -s; sw_vers -productVersion; uname -m
echo "node $(node -v) / npm $(npm -v)"; claude --version; kiro-cli --version
echo "--- host-toolchain (ios)"
echo "cmd: swiftc --version"; swiftc --version 2>&1 | head -1; echo "exit=${pipestatus[1]}"
echo "cmd: command -v xcodebuild"; command -v xcodebuild; echo "exit=$?"
echo "cmd: xcrun --find simctl"; xcrun --find simctl; echo "exit=$?"
echo "--- host-toolchain (android)"
for c in gradle adb kotlinc; do echo "cmd: command -v $c"; command -v $c; echo "exit=$?"; done
echo "ANDROID_HOME=${ANDROID_HOME:-unset}"
echo "cmd: ls ~/Library/Android/sdk"; ls ~/Library/Android/sdk; echo "exit=$?"
} > "$R/out/host.txt" 2>&1; cat "$R/out/host.txt"
```

**Step 5 — `harness-user-state` before.** Expect: the run-store entries all `absent`. Paste the whole output.

```sh
hstate() {
  echo "== run store (CC): $R/home/.claude"
  for f in "$R/home/.claude/.claude.json" "$R/home/.claude/settings.json"; do
    if [ -f "$f" ]; then echo "${f}: present, $(grep -c -E 'designerpunk-(docs|application|product)|enabledMcpjsonServers|node_modules/@3fn/core' "$f") DesignerPunk-relevant lines"; grep -n -E 'designerpunk-(docs|application|product)|enabledMcpjsonServers|node_modules/@3fn/core' "$f" | cut -c1-200; else echo "${f}: absent"; fi
  done
  if [ -f "$R/home/.claude/.claude.json" ]; then echo "-- projects in the run store:"; jq -c '.projects // {} | to_entries[] | {dir: .key, trusted: .value.hasTrustDialogAccepted, enabled: .value.enabledMcpjsonServers}' "$R/home/.claude/.claude.json"; fi
  if [ -f "$R/repo/.claude/settings.local.json" ]; then echo "-- repo .claude/settings.local.json:"; cat "$R/repo/.claude/settings.local.json"; else echo "-- repo .claude/settings.local.json: absent"; fi
  echo "== run store (Kiro): $R/home/.kiro and $R/home/Library/Application Support/kiro-cli"
  for d in "$R/home/.kiro" "$R/home/Library/Application Support/kiro-cli"; do
    if [ -d "$d" ]; then echo "${d}: present, $(find "$d" -type f | wc -l | tr -d " ") files; DesignerPunk-relevant:"; grep -r -l -E 'designerpunk-(docs|application|product)|enabledMcpjsonServers|node_modules/@3fn/core' "$d" 2>/dev/null | head -20; else echo "${d}: absent"; fi
  done
  if [ -f "$R/home/.kiro/settings/mcp.json" ]; then echo "-- run-store Kiro global MCP servers:"; jq -r '.mcpServers // {} | keys[]' "$R/home/.kiro/settings/mcp.json"; fi
  echo "== real user stores (DesignerPunk-relevant only)"
  if [ -f "$HOME/.claude.json" ]; then echo "$HOME/.claude.json: $(grep -c -E 'designerpunk-(docs|application|product)|enabledMcpjsonServers|node_modules/@3fn/core' "$HOME/.claude.json") DesignerPunk-relevant lines"; else echo "$HOME/.claude.json: absent"; fi
  if [ -f "$HOME/.kiro/settings/mcp.json" ]; then echo "$HOME/.kiro/settings/mcp.json servers: $(jq -r '.mcpServers // {} | keys | join(", ")' "$HOME/.kiro/settings/mcp.json")"; else echo "$HOME/.kiro/settings/mcp.json: absent"; fi
  echo "$HOME/.kiro/agents: $(ls "$HOME/.kiro/agents" 2>/dev/null | tr "\n" " ")"
  echo "$HOME/.kiro/steering files naming DesignerPunk: $(grep -r -l -i designerpunk "$HOME/.kiro/steering" 2>/dev/null | wc -l | tr -d " ")"
}
hstate > "$R/out/harness-user-state-before.txt" 2>&1; cat "$R/out/harness-user-state-before.txt"
```

**Step 6 — choose the Kiro isolation, then preflight.** Run 6a–6c in order and paste each output. You will end with exactly one `KENV=` line (6d), which later steps use. **If macOS asks about the keychain at any point, click Cancel — never reset — press Ctrl-C, and go to the 6d line for the real profile.**

**6a — your real profile is logged in.** Expect your account. If it says you are not logged in, run `kiro-cli login` (your normal profile) and then 6a again.

```sh
cd "$R/empty" && kiro-cli whoami; echo "exit=$?"; kiro-cli mcp list 2>&1 | head -20
```

**6b — try `KIRO_HOME` (keeps your real home and keychain).** Accept it if the first lines still show your account, the server list does **not** show `fetch`, and the last line shows files.

```sh
cd "$R/empty" && KIRO_HOME="$R/home/.kiro" kiro-cli whoami; echo "exit=$?"; KIRO_HOME="$R/home/.kiro" kiro-cli mcp list 2>&1 | head -20; ls -A "$R/home/.kiro" 2>&1 | head
```

**6c — only if 6b was not accepted: try a fresh `HOME`.** Accept it if it shows your account with no prompt of any kind, and the server list does not show `fetch`.

```sh
cd "$R/empty" && HOME="$R/home" kiro-cli whoami; echo "exit=$?"; HOME="$R/home" kiro-cli mcp list 2>&1 | head -20
```

**6d — set the choice.** Run exactly one of these three lines: the first if 6b was accepted, the second if 6c was, the third if neither (the run is then warm).

```sh
KENV="KIRO_HOME=$R/home/.kiro"; echo "isolation: $KENV (real HOME)" | tee "$R/out/isolation.txt"
```

```sh
KENV="HOME=$R/home"; echo "isolation: $KENV" | tee "$R/out/isolation.txt"
```

```sh
KENV=""; echo "isolation: none — real profile (warm run)" | tee "$R/out/isolation.txt"
```

**6e — preflight chat in the empty folder.** Type no message. Note anything it shows before its prompt, then type `/quit`. Paste back what it showed.

```sh
cd "$R/empty" && env $KENV script -q "$R/out/preflight-$(date -u +%H%M%S).typescript" kiro-cli chat
```

**Step 7 — birth (headless; the persona works alone).** The session's output scrolls past and is saved. Do not type into it. Press Ctrl-C only if it visibly repeats the same action three or more times (`operator-halt:loop`) or starts working outside `/tmp/dp-trio` (`operator-halt:unsafe`), and say so. Paste back the `exit=` line and the last 40 lines (`tail -n 40 "$R/out/birth.txt"`).

```sh
cd "$R/repo" && date -u +%Y-%m-%dT%H:%M:%SZ > "$R/out/birth.start.utc" && env $KENV kiro-cli chat --no-interactive --trust-all-tools --wrap never "$(cat "$R/out/birth-prompt.txt")" 2>&1 | tee "$R/out/birth.txt"; echo "exit=${pipestatus[1]}" | tee "$R/out/birth.exit"; date -u +%Y-%m-%dT%H:%M:%SZ > "$R/out/birth.end.utc"
```

**Step 8 — open (interactive, captured): the restart, and `first-MCP-load`.** Do not type a task. Before you type anything, note every prompt Kiro shows, word for word. Answer by § 6: trust the folder; approve DesignerPunk's servers. Then type `/mcp` and wait for the list, type `/agent list` and wait for the list, then type `/quit`. Paste back each prompt word for word with your answer, and both lists.

```sh
cd "$R/repo" && env $KENV script -q "$R/out/open-$(date -u +%H%M%S).typescript" kiro-cli chat
```

**Step 9 — probe: consumer-Leonardo (headless).** 
Same rules as step 7. If Kiro says the agent does not exist, that is the result: paste it and go on to step 10. Paste back the `exit=` line and the last 40 lines (`tail -n 40 "$R/out/probe-leonardo.txt"`).

```sh
cd "$R/repo" && date -u +%Y-%m-%dT%H:%M:%SZ > "$R/out/probe-leonardo.start.utc" && env $KENV kiro-cli chat --no-interactive --trust-all-tools --wrap never --agent leonardo "$(cat "$R/out/probe-leonardo-prompt.txt")" 2>&1 | tee "$R/out/probe-leonardo.txt"; echo "exit=${pipestatus[1]}" | tee "$R/out/probe-leonardo.exit"; date -u +%Y-%m-%dT%H:%M:%SZ > "$R/out/probe-leonardo.end.utc"
```

**Step 10 — after: `harness-user-state`, repo state, writes outside the folder, and the audit.** Paste the whole output. That ends the run.

```sh
hstate() {
  echo "== run store (CC): $R/home/.claude"
  for f in "$R/home/.claude/.claude.json" "$R/home/.claude/settings.json"; do
    if [ -f "$f" ]; then echo "${f}: present, $(grep -c -E 'designerpunk-(docs|application|product)|enabledMcpjsonServers|node_modules/@3fn/core' "$f") DesignerPunk-relevant lines"; grep -n -E 'designerpunk-(docs|application|product)|enabledMcpjsonServers|node_modules/@3fn/core' "$f" | cut -c1-200; else echo "${f}: absent"; fi
  done
  if [ -f "$R/home/.claude/.claude.json" ]; then echo "-- projects in the run store:"; jq -c '.projects // {} | to_entries[] | {dir: .key, trusted: .value.hasTrustDialogAccepted, enabled: .value.enabledMcpjsonServers}' "$R/home/.claude/.claude.json"; fi
  if [ -f "$R/repo/.claude/settings.local.json" ]; then echo "-- repo .claude/settings.local.json:"; cat "$R/repo/.claude/settings.local.json"; else echo "-- repo .claude/settings.local.json: absent"; fi
  echo "== run store (Kiro): $R/home/.kiro and $R/home/Library/Application Support/kiro-cli"
  for d in "$R/home/.kiro" "$R/home/Library/Application Support/kiro-cli"; do
    if [ -d "$d" ]; then echo "${d}: present, $(find "$d" -type f | wc -l | tr -d " ") files; DesignerPunk-relevant:"; grep -r -l -E 'designerpunk-(docs|application|product)|enabledMcpjsonServers|node_modules/@3fn/core' "$d" 2>/dev/null | head -20; else echo "${d}: absent"; fi
  done
  if [ -f "$R/home/.kiro/settings/mcp.json" ]; then echo "-- run-store Kiro global MCP servers:"; jq -r '.mcpServers // {} | keys[]' "$R/home/.kiro/settings/mcp.json"; fi
  echo "== real user stores (DesignerPunk-relevant only)"
  if [ -f "$HOME/.claude.json" ]; then echo "$HOME/.claude.json: $(grep -c -E 'designerpunk-(docs|application|product)|enabledMcpjsonServers|node_modules/@3fn/core' "$HOME/.claude.json") DesignerPunk-relevant lines"; else echo "$HOME/.claude.json: absent"; fi
  if [ -f "$HOME/.kiro/settings/mcp.json" ]; then echo "$HOME/.kiro/settings/mcp.json servers: $(jq -r '.mcpServers // {} | keys | join(", ")' "$HOME/.kiro/settings/mcp.json")"; else echo "$HOME/.kiro/settings/mcp.json: absent"; fi
  echo "$HOME/.kiro/agents: $(ls "$HOME/.kiro/agents" 2>/dev/null | tr "\n" " ")"
  echo "$HOME/.kiro/steering files naming DesignerPunk: $(grep -r -l -i designerpunk "$HOME/.kiro/steering" 2>/dev/null | wc -l | tr -d " ")"
}
hstate > "$R/out/harness-user-state-after.txt" 2>&1; cat "$R/out/harness-user-state-after.txt"
find "$R/home" -type f -newer "$R/out/start.stamp" | sed "s|$R/home|HOME|" | sort > "$R/out/home-files.txt"; echo "files the run store gained: $(wc -l < "$R/out/home-files.txt" | tr -d " ")"; grep -v -E "/(plugins|skills)/" "$R/out/home-files.txt" | head -40
find /tmp/ -maxdepth 1 -newer "$R/out/start.stamp" 2>/dev/null | grep -v -E "^/tmp/$|^/tmp/dp-trio$" | tee "$R/out/tmp-writes.txt"
cd "$R/repo" && git status --porcelain | tee "$R/out/repo-status.txt"; git log --oneline --all | head -5
grep -n -A3 '"node_modules/@3fn/core"' "$R/repo/package-lock.json" | head -6
env $KENV kiro-cli mcp list 2>&1 | tee "$R/out/kiro-mcp-list.txt"
grep -n -i -E 'DesignerPunk-v2|wt-u5|claude-501|github\.com/3fn/DesignerPunk|raw\.githubusercontent\.com/3fn' "$R"/out/birth.* "$R"/out/open-*.typescript "$R"/out/probe-* > "$R/out/source-access-audit.txt"; echo "source-access audit hits: $(wc -l < "$R/out/source-access-audit.txt" | tr -d " ") (3-4 expected self-references from the package; see § 10)"
date -u +%Y-%m-%dT%H:%M:%SZ > "$R/out/end.utc"; ls -la "$R/out"
```

**What to paste back for run `trio-3-pm`, in one message if that is easier**: the output of steps 0–10; every prompt you answered in steps 6 and 8, word for word, with your answer; anything you typed that the steps did not tell you to type, and why; any Ctrl-C and why. Then: "`trio-3-pm` done; files in `/tmp/dp-trio/trio-3-pm/out`."

## 12. Mechanics — what Run 1 settled, and what is still unverified

| Mechanic | Status | How it is recorded |
|---|---|---|
| A fresh `HOME` for Claude Code | **Settled (Run 1): unsafe on macOS.** Login loop and a keychain-reset offer; `auth-required`. Replaced by `CLAUDE_CONFIG_DIR` (§ 5.1) | n/a for later runs; Run 1's record carries both attempts |
| `CLAUDE_CONFIG_DIR` gives an empty CC store and keeps the login | **Settled (Run 1)**: the store started empty ("configuration file not found"), and the login needed a browser sign-in but no keychain prompt. Account-level connector, skills and plugin caches still arrive | re-login cost and account-level state in F7 |
| `claude -p --max-turns` | **Settled (Run 1, 2.1.300): accepted, not enforced** (41/40, 52/30, both `completed`) | budget observed; overrun is a finding |
| `--agent <name>` selects the born repo's agent (CC) | **Settled (Run 1)**: the run store's session logs record `"agentSetting":"ada"` / `"lina"`; the init event does not name it | F18 cites the session log |
| Where CC records project MCP enablement | **Settled (Run 1, 2.1.300)**: the repo's ignored `.claude/settings.local.json`, not the user store | F7, F17 |
| A headless session shows MCP approval prompts | Not relied on: `open` is interactive. Run 1: the headless birth printed only the stderr notice that untrusted-workspace permissions were ignored | F15, F17 |
| kiro-cli isolation (`KIRO_HOME`, fresh `HOME`) and where it keeps its login | **Settled for kiro-cli 2.12.1 (Run 2)**: `KIRO_HOME="$R/home/.kiro"` kept the login, dropped the real global server (`fetch`), and populated the run store; a fresh `HOME` gave "Not logged in" with no keychain prompt. The login database stays in the real profile. **Unverified**: whether that database holds per-workspace state | `out/isolation.txt`; F7 |
| `--agent <name>` selects the born repo's agent (Kiro) | **Settled (Run 2)**: the agent's welcome message and hook ran | F18 |
| The kiro-cli desktop app, if running under the real user, interferes with an isolated session | **Unverified** | a finding outside the axes, with the error |

Each outcome that differs from this protocol's assumption is also appended to the Task 25 Instruments block's `## Found later` as a `misfit`.

## 13. Writing the record

- The operator (Leonardo) writes each record from `/tmp/dp-trio/<run-id>/out/` and Peter's paste-back, in the field order of § 8.2, after the run's last step. The record is committed after its prompt (ancestry, F2).
- Transcripts are not committed. The record quotes what it uses, and names the file and line or event it came from.
- Turn counting for Kiro: one agent turn is one model response that ends either in a tool call or in the final answer, counted from `birth.txt` / `probe-<agent>.txt`. The record states the count and this rule.
- Findings are written per persona and attributed to an axis (F21). A finding seen in more than one run is written in each run's record and marked `also seen in <run-id>`; it is never pooled into one list.
- Every finding whose subject is consumer-Leonardo carries `subject: leonardo` (run discipline C2), for Stacy's CLOSEOUT cross-read.

## 14. Join runs (Task 26)

*Added 2026-10-15 for Spec 123 Task 26, under Task 25's write grant for this file (orchestrator ruling 2026-10-15). Everything in §§ 1–13 applies unless this section says otherwise.*

### 14.1 What a join run is

- **Two runs**, each a teammate joining a repo someone else birthed, **on the other harness** (Req 15A.4):
  - `join-cc-to-kiro`: the founder's repo is `fixtures/born-cc` (from `trio-1-backend`, born `init --target=cc`); the joiner, Mei, uses Kiro; the post-restart query goes to `--agent thurgood`.
  - `join-kiro-to-cc`: the founder's repo is `fixtures/born-kiro` (from `trio-3-pm`, born `init --target=kiro`); the joiner, Jordan, uses Claude Code; the post-restart query goes to `--agent stacy`.
- **The founder's repo is a committed fixture.** The launcher commits it as `$R/origin` (one commit, "founder's repo") and **clones** it to `$R/repo`. That clone is INSTALL § 7's step 1, done by the launcher and recorded as such. The joiner starts at step 2.
- **The path**: INSTALL § 7, `joining-cross-harness`, 6 steps:
  1. clone;
  2. `npm install`;
  3. `generate`;
  4. `attach --target=<other>`;
  5. the personal note;
  6. restart.
- **Budget**: 40 agent turns for the join session (`path-steps` 6 → floor 18; ≈ 6.7×), observed, not enforced on either harness (§ 4). 30 turns for the query session.
- **"Joined" means the agent answers, not that files exist.** The post-restart query goes to a **named** attached agent, fixed by the frozen prompt. Its three answers (its domain; one routed tool it owns; one thing outside its scope and who owns it) are checked against **the rendering `attach` wrote in that clone**: Kiro `.kiro/agents/thurgood-prompt.md` (and `thurgood.json` for its tools); Claude Code `.claude/agents/stacy.md`. This is Req 24.6's bar in miniature.
- **The same-harness C8(c) probe** (in `join-cc-to-kiro` only; the orchestrator ruled "clone twice"):
  - It runs on a **second, separate clone** (`$R/probe-repo`) of the same origin.
  - The launcher runs `npm install` there, then opens **Claude Code** once, captured, before any `generate`. So the gitignored `.designerpunk/personal-note.local.md` is absent, and the committed `.claude/settings.json` arrives by clone.
  - It observes: (1) is the committed `.claude/settings.json` honored for server enablement, or does Claude Code still ask? (2) What does the `CLAUDE.md` `@`-import of the missing note do: load, warn or error?
  - It is **labelled a same-harness observation** in the record and does not count toward the Kiro join's teammate-cold cell.

### 14.2 The join record schema

Each join record is `.kiro/specs/123-consumer-distribution/validation/<run-id>.md`, with every field below present under its exact label. A field with nothing to report says so in words (`none`, `not applicable — <why>`, `cannot-tell — <why>`). The field list is reproduced in the record's header.

| # | Label (exact) | Content |
|---|---|---|
| J1 | `run-id:` | run-id; the joiner; the founder's harness and the joiner's |
| J2 | `frozen-prompt:` | the prompt file, its commit, the ancestry line with its exit code, then the file verbatim |
| J3 | `founder-repo:` | the fixture path; the trio run it came from and its source ref; file count and tree hash; the origin commit made in the run |
| J4 | `candidate:` | tarball path, expected and measured shasum, `package-lock.json`'s `resolved` line after `npm install` |
| J5 | `target:` | the founder's harness, the joiner's harness and its version, and the `attach` command the joiner ran |
| J6 | `source-access:` | the § 10 audit, classified; writes outside the run folder |
| J7 | `harness-user-state:` | the mechanism (§ 5.1); the inspection before and after, verbatim; the files the run stores gained; clean/warm verdict; re-login cost |
| J8 | `session-launched-by:` | per session |
| J9 | `operator-log:` | every launcher act after a frozen prompt, verbatim, with its reason, including any `operator-unblock` (§ 3) |
| J10 | `budget:` | per budgeted session: budget, multiple, enforcement, turns used |
| J11 | `stop:` | one line per session, `- stop: <session> — <event>` from § 3 |
| J12 | `wall-clock:` | per session, UTC start and end; recorded, never asserted |
| J13 | `steps-walked:` | **per-step outcome for the 6 steps**: `done`, `done by the launcher`, `done with help from <where>`, `skipped — <why>`, or `not reached`, with transcript evidence |
| J14 | `first-MCP-load:` | from the captured open on the joiner's clone: what the harness asked for, verbatim; the `/mcp` listing |
| J15 | `cold-observation:` | `cold-observation: <cc\|kiro> teammate-cold: observed` · `not observed cold — state not clean` · `cannot-tell — <why>` |
| J16 | `c8c-observations:` | (1) committed `.claude/settings.json` honored for server enablement? (2) the gitignored note's `@`-import on a fresh clone: loads, warns or errors? Each answered from the evidence this run has, with its source named (the probe clone in `join-cc-to-kiro`; the joiner's own clone in `join-kiro-to-cc`), or `not applicable — <why>` |
| J17 | `post-restart-query:` | the agent; the question (frozen); the answer, quoted; the rendered charter file with the quoted lines for its domain, routes and out-of-scope; a per-item `matches` / `does not match` / `cannot-tell`; and the verdict `joined` or `not joined` |
| J18 | `discovery:` | per MCP query in the join and query sessions: query, result or `not printed`, `succeeded` / `failed` |
| J19 | `friction-rows:` | for each of friction-record rows 2, 4, 5, 7, 9, 11, 12, 13: `observed`, `not observed`, or `n/a this run`, with evidence. Closing them is Task 28.4's, not this record's |
| J20 | `findings:` | findings, each with its route; `subject: leonardo` where it applies; the forced negative written, `findings: none` if so |
| J21 | `joiner-close:` | the joiner's closing note, verbatim |

**The join schema check** (run from the repo root; paste the output into the Task 26 completion doc):

```sh
for f in .kiro/specs/123-consumer-distribution/validation/join-*.md; do
  echo "== $f"
  for label in 'run-id:' 'frozen-prompt:' 'founder-repo:' 'candidate:' 'target:' 'source-access:' 'harness-user-state:' 'session-launched-by:' 'operator-log:' 'budget:' 'stop:' 'wall-clock:' 'steps-walked:' 'first-MCP-load:' 'cold-observation:' 'c8c-observations:' 'post-restart-query:' 'discovery:' 'friction-rows:' 'findings:' 'joiner-close:'; do
    grep -q -F -- "$label" "$f" && echo "  present  $label" || echo "  MISSING  $label"
  done
  grep -E -c -- '^- stop: [a-z0-9-]+ — (completed|budget-exhausted|auth-required|harness-error:|operator-halt:)' "$f" | sed 's/^/  stop lines from the vocabulary: /'
  grep -E -- 'cold-observation: (cc|kiro) teammate-cold: (observed|not observed cold — state not clean|cannot-tell — )' "$f" >/dev/null && echo "  teammate-cold cell well-formed" || echo "  teammate-cold cell NOT well-formed"
done
```

### 14.3 What each run writes

Everything lands under `/tmp/dp-trio/<run-id>/`:
- **`origin/`**: the founder's repo, as committed by the launcher.
- **`repo/`**: the joiner's clone.
- **`probe-repo/`**: `join-cc-to-kiro` only; the C8(c) clone.
- **`home/`**: `.claude/` (`CLAUDE_CONFIG_DIR`) and `.kiro/` (`KIRO_HOME`).
- **`empty/`**: for the preflights.
- **`out/`**, which holds every capture and transcript:
  - `preflight-cc-<time>.typescript`, `preflight-kiro-<time>.typescript`;
  - `c8c-probe-<time>.typescript` (join-cc-to-kiro);
  - `join.txt` (Kiro) or `join.jsonl` + `join.stderr` (CC);
  - `open-<time>.typescript`;
  - `query.txt` (Kiro) or `query.jsonl` + `query.stderr` (CC);
  - the `*.utc` stamps and `*.exit` files;
  - `host.txt`, `candidate-shasum.txt`, `isolation.txt`;
  - `harness-user-state-{before,after}.txt`, `home-files.txt`, `tmp-writes.txt`;
  - `repo-status.txt`, `source-access-audit.txt`, `kiro-mcp-list.txt` (Kiro).


### 14.4 Launch blocks — join runs, for Peter

Same rules as § 11:
- one new macOS Terminal window per run, kept open for the whole run (zsh);
- one block at a time, pasting each output back;
- every interactive session gets its own capture file;
- if macOS asks about the keychain, click Cancel (never reset), press Ctrl-C, and tell the orchestrator;
- the only edit is `COMMIT=` in step 0, which the orchestrator fills with the commit carrying the fixtures and this run's frozen prompt.

**`operator-unblock` (§ 3)**: if, in a Kiro session, a command visibly waits at a prompt that nothing in the session can answer (as `init` did in Run 3), you may press Return on the empty prompt (Ctrl-U first if needed), and nothing else. Say so in your paste-back, with the prompt's text. A Claude Code headless session runs its commands without a terminal, so you cannot type into it; if it seems stuck, wait for it to end and say so.


#### Join run 1 — `join-cc-to-kiro` (founder: Claude Code; joiner Mei: Kiro; query: Thurgood)

**Step 0 — variables and checks.** Expect `0`, then `fixture and prompt found at commit`.

```sh
RUN=join-cc-to-kiro
FIX=born-cc
COMMIT=FILL_IN_COMMIT
DP="/Users/3fn/Documents/Work Projects/Kiro/DesignerPunk-v2"
TGZ="/Users/3fn/Documents/Work Projects/Kiro/u5-pack/3fn-core-15.1.0.tgz"
R="/tmp/dp-trio/$RUN"
PF=".kiro/specs/123-consumer-distribution/validation/prompts/$RUN.md"
env | grep -c -E '^(CLAUDECODE|CLAUDE_CODE_)'
git -C "$DP" cat-file -e "${COMMIT}:${PF}" && git -C "$DP" cat-file -e "${COMMIT}:tests/onboarding-trio/fixtures/${FIX}/package.json" && echo "fixture and prompt found at commit"
```

**Step 1 — the founder's repo, and the joiner's clone (INSTALL § 7 step 1, done by you).** Expect one `founder's repo` line and the fixture's top-level files. If it prints `STOP`, stop and tell the orchestrator.

```sh
if [ -e "$R" ]; then echo "STOP: $R already exists"; else mkdir -p "$R/home" "$R/empty" "$R/origin" "$R/out" && date -u +%Y-%m-%dT%H:%M:%SZ > "$R/out/start.utc" && touch "$R/out/start.stamp" && git -C "$DP" archive "$COMMIT" "tests/onboarding-trio/fixtures/$FIX" | tar -x -C "$R/origin" --strip-components=4 && cd "$R/origin" && git init -q -b main && git add -A && git -c user.name=founder -c user.email=founder@example.invalid -c commit.gpgsign=false commit -q -m "founder's repo" && git log --oneline && find . -type f -not -path './.git/*' | wc -l && git clone -q "$R/origin" "$R/repo" && git clone -q "$R/origin" "$R/probe-repo" && ls -A "$R/repo"; fi
```

**Step 2 — the candidate tarball, into the clone(s).** Expect `aa3efdcf9ce3c2689c2e5979932c48a46f3f6584`.

```sh
mkdir -p "$R/repo/.pack" && cp "$TGZ" "$R/repo/.pack/" && mkdir -p "$R/probe-repo/.pack" && cp "$TGZ" "$R/probe-repo/.pack/" && shasum -a 1 "$R/repo/.pack/3fn-core-15.1.0.tgz" | tee "$R/out/candidate-shasum.txt"
```

**Step 3 — the frozen prompts, read from the commit.** Expect a non-zero line count for both.

```sh
git -C "$DP" show "${COMMIT}:${PF}" > "$R/out/prompt.md"
awk '/ JOIN END -->/{p=0} p{print} / JOIN BEGIN -->/{p=1}' "$R/out/prompt.md" > "$R/out/join-prompt.txt"
awk '/ QUERY END -->/{p=0} p{print} / QUERY BEGIN -->/{p=1}' "$R/out/prompt.md" > "$R/out/query-prompt.txt"
wc -l "$R"/out/*-prompt.txt
```

**Step 4 — host facts (versions).** Paste the output.

```sh
{ date -u +%Y-%m-%dT%H:%M:%SZ; hostname -s; sw_vers -productVersion; uname -m; echo "node $(node -v) / npm $(npm -v)"; claude --version; kiro-cli --version; } > "$R/out/host.txt" 2>&1; cat "$R/out/host.txt"
```

**Step 5 — `harness-user-state` before.** Expect the run-store entries all `absent`. Paste the output.

```sh
hstate() {
  echo "== run store (CC): $R/home/.claude"
  for f in "$R/home/.claude/.claude.json" "$R/home/.claude/settings.json"; do
    if [ -f "$f" ]; then echo "${f}: present, $(grep -c -E 'designerpunk-(docs|application|product)|enabledMcpjsonServers|node_modules/@3fn/core' "$f") DesignerPunk-relevant lines"; grep -n -E 'designerpunk-(docs|application|product)|enabledMcpjsonServers|node_modules/@3fn/core' "$f" | cut -c1-200; else echo "${f}: absent"; fi
  done
  if [ -f "$R/home/.claude/.claude.json" ]; then echo "-- projects in the run store:"; jq -c '.projects // {} | to_entries[] | {dir: .key, trusted: .value.hasTrustDialogAccepted, enabled: .value.enabledMcpjsonServers}' "$R/home/.claude/.claude.json"; fi
  if [ -f "$R/repo/.claude/settings.local.json" ]; then echo "-- repo .claude/settings.local.json:"; cat "$R/repo/.claude/settings.local.json"; else echo "-- repo .claude/settings.local.json: absent"; fi
  echo "== run store (Kiro): $R/home/.kiro and $R/home/Library/Application Support/kiro-cli"
  for d in "$R/home/.kiro" "$R/home/Library/Application Support/kiro-cli"; do
    if [ -d "$d" ]; then echo "${d}: present, $(find "$d" -type f | wc -l | tr -d " ") files; DesignerPunk-relevant:"; grep -r -l -E 'designerpunk-(docs|application|product)|enabledMcpjsonServers|node_modules/@3fn/core' "$d" 2>/dev/null | head -20; else echo "${d}: absent"; fi
  done
  if [ -f "$R/home/.kiro/settings/mcp.json" ]; then echo "-- run-store Kiro global MCP servers:"; jq -r '.mcpServers // {} | keys[]' "$R/home/.kiro/settings/mcp.json"; fi
  echo "== real user stores (DesignerPunk-relevant only)"
  if [ -f "$HOME/.claude.json" ]; then echo "$HOME/.claude.json: $(grep -c -E 'designerpunk-(docs|application|product)|enabledMcpjsonServers|node_modules/@3fn/core' "$HOME/.claude.json") DesignerPunk-relevant lines"; else echo "$HOME/.claude.json: absent"; fi
  if [ -f "$HOME/.kiro/settings/mcp.json" ]; then echo "$HOME/.kiro/settings/mcp.json servers: $(jq -r '.mcpServers // {} | keys | join(", ")' "$HOME/.kiro/settings/mcp.json")"; else echo "$HOME/.kiro/settings/mcp.json: absent"; fi
  echo "$HOME/.kiro/agents: $(ls "$HOME/.kiro/agents" 2>/dev/null | tr "\n" " ")"
  echo "$HOME/.kiro/steering files naming DesignerPunk: $(grep -r -l -i designerpunk "$HOME/.kiro/steering" 2>/dev/null | wc -l | tr -d " ")"
}
hstate > "$R/out/harness-user-state-before.txt" 2>&1; cat "$R/out/harness-user-state-before.txt"
```

**Step 6 — Claude Code preflight (interactive), in an empty folder.** Expect the first-run onboarding and a browser sign-in. Choose the defaults, type no message, then `/exit`. Paste back what it showed.

```sh
echo "isolation (CC): CLAUDE_CONFIG_DIR=$R/home/.claude (real HOME)" | tee -a "$R/out/isolation.txt"
cd "$R/empty" && CLAUDE_CONFIG_DIR="$R/home/.claude" script -q "$R/out/preflight-cc-$(date -u +%H%M%S).typescript" claude
```

**Step 7 — the C8(c) probe (same-harness observation, separate clone).** First install the packages in the probe clone (the second line opens Claude Code there). **Type no task.** Before typing anything, note every prompt Claude Code shows, word for word, and whether it mentions the personal note or an import. Answer by § 6 (trust the folder; approve DesignerPunk's servers). Then type `/context` and wait for it, type `/mcp` and wait, press Esc, and `/exit`. Paste back every prompt word for word with your answer, and what `/context` and `/mcp` showed.

```sh
cd "$R/probe-repo" && npm install --no-audit --no-fund 2>&1 | tail -3; ls -A .designerpunk 2>&1
```

```sh
cd "$R/probe-repo" && CLAUDE_CONFIG_DIR="$R/home/.claude" script -q "$R/out/c8c-probe-$(date -u +%H%M%S).typescript" claude
```

**Step 8 — choose the Kiro isolation, then preflight.** As in § 11, Run 2, step 6: run 8a–8c in order, end with exactly one `KENV=` line (8d), then the preflight chat (8e).

**8a**

```sh
cd "$R/empty" && kiro-cli whoami; echo "exit=$?"; kiro-cli mcp list 2>&1 | head -20
```

**8b — accept if your account shows, `fetch` is absent, and files appear.**

```sh
cd "$R/empty" && KIRO_HOME="$R/home/.kiro" kiro-cli whoami; echo "exit=$?"; KIRO_HOME="$R/home/.kiro" kiro-cli mcp list 2>&1 | head -20; ls -A "$R/home/.kiro" 2>&1 | head
```

**8c — only if 8b was not accepted.**

```sh
cd "$R/empty" && HOME="$R/home" kiro-cli whoami; echo "exit=$?"; HOME="$R/home" kiro-cli mcp list 2>&1 | head -20
```

**8d — run exactly one** (first if 8b was accepted; second if 8c was; third if neither, which makes the run warm).

```sh
KENV="KIRO_HOME=$R/home/.kiro"; echo "isolation (Kiro): $KENV (real HOME)" | tee -a "$R/out/isolation.txt"
```

```sh
KENV="HOME=$R/home"; echo "isolation (Kiro): $KENV" | tee -a "$R/out/isolation.txt"
```

```sh
KENV=""; echo "isolation (Kiro): none — real profile (warm run)" | tee -a "$R/out/isolation.txt"
```

**8e — Kiro preflight chat, in the empty folder.** Type no message; `/quit`. Paste back what it showed.

```sh
cd "$R/empty" && env $KENV script -q "$R/out/preflight-kiro-$(date -u +%H%M%S).typescript" kiro-cli chat
```

**Step 9 — the join session (headless; Mei works alone).** Output scrolls and is saved. Do not type into it, except an `operator-unblock` (above). Ctrl-C only for `operator-halt:loop` or `operator-halt:unsafe`. Paste back the `exit=` line and `tail -n 40 "$R/out/join.txt"`.

```sh
cd "$R/repo" && date -u +%Y-%m-%dT%H:%M:%SZ > "$R/out/join.start.utc" && env $KENV kiro-cli chat --no-interactive --trust-all-tools --wrap never "$(cat "$R/out/join-prompt.txt")" 2>&1 | tee "$R/out/join.txt"; echo "exit=${pipestatus[1]}" | tee "$R/out/join.exit"; date -u +%Y-%m-%dT%H:%M:%SZ > "$R/out/join.end.utc"
```

**Step 10 — open (interactive, captured): the restart, and the teammate-cold first load.** Type no task. Note every prompt Kiro shows before its prompt, word for word, and answer by § 6. Then `/mcp` (wait), `/agent` (wait, then Esc), `/quit`. Paste back each prompt with your answer, and both lists.

```sh
cd "$R/repo" && env $KENV script -q "$R/out/open-$(date -u +%H%M%S).typescript" kiro-cli chat
```

**Step 11 — the post-restart query: consumer-Thurgood (headless).** Same rules as the join session. Paste back the `exit=` line and `tail -n 40 "$R/out/query.txt"`. If Kiro says the agent does not exist, that is the result: paste it.

```sh
cd "$R/repo" && date -u +%Y-%m-%dT%H:%M:%SZ > "$R/out/query.start.utc" && env $KENV kiro-cli chat --no-interactive --trust-all-tools --wrap never --agent thurgood "$(cat "$R/out/query-prompt.txt")" 2>&1 | tee "$R/out/query.txt"; echo "exit=${pipestatus[1]}" | tee "$R/out/query.exit"; date -u +%Y-%m-%dT%H:%M:%SZ > "$R/out/query.end.utc"
```

**Step 12 — after: state, repo, writes outside the folder, audit.** Paste the whole output. That ends the run.

```sh
hstate() {
  echo "== run store (CC): $R/home/.claude"
  for f in "$R/home/.claude/.claude.json" "$R/home/.claude/settings.json"; do
    if [ -f "$f" ]; then echo "${f}: present, $(grep -c -E 'designerpunk-(docs|application|product)|enabledMcpjsonServers|node_modules/@3fn/core' "$f") DesignerPunk-relevant lines"; grep -n -E 'designerpunk-(docs|application|product)|enabledMcpjsonServers|node_modules/@3fn/core' "$f" | cut -c1-200; else echo "${f}: absent"; fi
  done
  if [ -f "$R/home/.claude/.claude.json" ]; then echo "-- projects in the run store:"; jq -c '.projects // {} | to_entries[] | {dir: .key, trusted: .value.hasTrustDialogAccepted, enabled: .value.enabledMcpjsonServers}' "$R/home/.claude/.claude.json"; fi
  if [ -f "$R/repo/.claude/settings.local.json" ]; then echo "-- repo .claude/settings.local.json:"; cat "$R/repo/.claude/settings.local.json"; else echo "-- repo .claude/settings.local.json: absent"; fi
  echo "== run store (Kiro): $R/home/.kiro and $R/home/Library/Application Support/kiro-cli"
  for d in "$R/home/.kiro" "$R/home/Library/Application Support/kiro-cli"; do
    if [ -d "$d" ]; then echo "${d}: present, $(find "$d" -type f | wc -l | tr -d " ") files; DesignerPunk-relevant:"; grep -r -l -E 'designerpunk-(docs|application|product)|enabledMcpjsonServers|node_modules/@3fn/core' "$d" 2>/dev/null | head -20; else echo "${d}: absent"; fi
  done
  if [ -f "$R/home/.kiro/settings/mcp.json" ]; then echo "-- run-store Kiro global MCP servers:"; jq -r '.mcpServers // {} | keys[]' "$R/home/.kiro/settings/mcp.json"; fi
  echo "== real user stores (DesignerPunk-relevant only)"
  if [ -f "$HOME/.claude.json" ]; then echo "$HOME/.claude.json: $(grep -c -E 'designerpunk-(docs|application|product)|enabledMcpjsonServers|node_modules/@3fn/core' "$HOME/.claude.json") DesignerPunk-relevant lines"; else echo "$HOME/.claude.json: absent"; fi
  if [ -f "$HOME/.kiro/settings/mcp.json" ]; then echo "$HOME/.kiro/settings/mcp.json servers: $(jq -r '.mcpServers // {} | keys | join(", ")' "$HOME/.kiro/settings/mcp.json")"; else echo "$HOME/.kiro/settings/mcp.json: absent"; fi
  echo "$HOME/.kiro/agents: $(ls "$HOME/.kiro/agents" 2>/dev/null | tr "\n" " ")"
  echo "$HOME/.kiro/steering files naming DesignerPunk: $(grep -r -l -i designerpunk "$HOME/.kiro/steering" 2>/dev/null | wc -l | tr -d " ")"
}
hstate > "$R/out/harness-user-state-after.txt" 2>&1; cat "$R/out/harness-user-state-after.txt"
find "$R/home" -type f -newer "$R/out/start.stamp" | sed "s|$R/home|HOME|" | sort > "$R/out/home-files.txt"; echo "files the run stores gained: $(wc -l < "$R/out/home-files.txt" | tr -d " ")"; grep -v -E "/(plugins|skills)/" "$R/out/home-files.txt" | head -40
find /tmp/ -maxdepth 1 -newer "$R/out/start.stamp" 2>/dev/null | grep -v -E "^/tmp/$|^/tmp/dp-trio$" | tee "$R/out/tmp-writes.txt"
cd "$R/repo" && git status --porcelain --ignored | tee "$R/out/repo-status.txt"; git log --oneline --all | head -5
grep -n -A3 '"node_modules/@3fn/core"' "$R/repo/package-lock.json" | head -6
ls -A "$R/repo/.claude" "$R/repo/.kiro" 2>&1 | head -20
cd "$R/repo" && env ${KENV:-} kiro-cli mcp list 2>&1 | tee "$R/out/kiro-mcp-list.txt"
cd "$R/probe-repo" && git status --porcelain --ignored | tee "$R/out/probe-repo-status.txt"; cat .claude/settings.local.json 2>&1; git check-ignore -v .claude/settings.local.json 2>&1
grep -n -i -E 'DesignerPunk-v2|wt-u5|claude-501|github\.com/3fn/DesignerPunk|raw\.githubusercontent\.com/3fn' "$R"/out/join.* "$R"/out/query.* "$R"/out/open-*.typescript > "$R/out/source-access-audit.txt"; echo "source-access audit hits: $(wc -l < "$R/out/source-access-audit.txt" | tr -d " ") (package self-references expected; see § 10)"
date -u +%Y-%m-%dT%H:%M:%SZ > "$R/out/end.utc"; ls -la "$R/out"
```

**What to paste back for `join-cc-to-kiro`**: steps 0–12; every prompt you answered, word for word, with your answer; anything you typed beyond the steps (including any `operator-unblock`), and why; any Ctrl-C and why. Then: "`join-cc-to-kiro` done; files in `/tmp/dp-trio/join-cc-to-kiro/out`."


#### Join run 2 — `join-kiro-to-cc` (founder: Kiro; joiner Jordan: Claude Code; query: Stacy)

**Step 0 — variables and checks.** Expect `0`, then `fixture and prompt found at commit`.

```sh
RUN=join-kiro-to-cc
FIX=born-kiro
COMMIT=FILL_IN_COMMIT
DP="/Users/3fn/Documents/Work Projects/Kiro/DesignerPunk-v2"
TGZ="/Users/3fn/Documents/Work Projects/Kiro/u5-pack/3fn-core-15.1.0.tgz"
R="/tmp/dp-trio/$RUN"
PF=".kiro/specs/123-consumer-distribution/validation/prompts/$RUN.md"
env | grep -c -E '^(CLAUDECODE|CLAUDE_CODE_)'
git -C "$DP" cat-file -e "${COMMIT}:${PF}" && git -C "$DP" cat-file -e "${COMMIT}:tests/onboarding-trio/fixtures/${FIX}/package.json" && echo "fixture and prompt found at commit"
```

**Step 1 — the founder's repo, and the joiner's clone (INSTALL § 7 step 1, done by you).** Expect one `founder's repo` line and the fixture's top-level files. If it prints `STOP`, stop and tell the orchestrator.

```sh
if [ -e "$R" ]; then echo "STOP: $R already exists"; else mkdir -p "$R/home" "$R/empty" "$R/origin" "$R/out" && date -u +%Y-%m-%dT%H:%M:%SZ > "$R/out/start.utc" && touch "$R/out/start.stamp" && git -C "$DP" archive "$COMMIT" "tests/onboarding-trio/fixtures/$FIX" | tar -x -C "$R/origin" --strip-components=4 && cd "$R/origin" && git init -q -b main && git add -A && git -c user.name=founder -c user.email=founder@example.invalid -c commit.gpgsign=false commit -q -m "founder's repo" && git log --oneline && find . -type f -not -path './.git/*' | wc -l && git clone -q "$R/origin" "$R/repo" && ls -A "$R/repo"; fi
```

**Step 2 — the candidate tarball, into the clone(s).** Expect `aa3efdcf9ce3c2689c2e5979932c48a46f3f6584`.

```sh
mkdir -p "$R/repo/.pack" && cp "$TGZ" "$R/repo/.pack/" && shasum -a 1 "$R/repo/.pack/3fn-core-15.1.0.tgz" | tee "$R/out/candidate-shasum.txt"
```

**Step 3 — the frozen prompts, read from the commit.** Expect a non-zero line count for both.

```sh
git -C "$DP" show "${COMMIT}:${PF}" > "$R/out/prompt.md"
awk '/ JOIN END -->/{p=0} p{print} / JOIN BEGIN -->/{p=1}' "$R/out/prompt.md" > "$R/out/join-prompt.txt"
awk '/ QUERY END -->/{p=0} p{print} / QUERY BEGIN -->/{p=1}' "$R/out/prompt.md" > "$R/out/query-prompt.txt"
wc -l "$R"/out/*-prompt.txt
```

**Step 4 — host facts (versions).** Paste the output.

```sh
{ date -u +%Y-%m-%dT%H:%M:%SZ; hostname -s; sw_vers -productVersion; uname -m; echo "node $(node -v) / npm $(npm -v)"; claude --version; kiro-cli --version; } > "$R/out/host.txt" 2>&1; cat "$R/out/host.txt"
```

**Step 5 — `harness-user-state` before.** Expect the run-store entries all `absent`. Paste the output.

```sh
hstate() {
  echo "== run store (CC): $R/home/.claude"
  for f in "$R/home/.claude/.claude.json" "$R/home/.claude/settings.json"; do
    if [ -f "$f" ]; then echo "${f}: present, $(grep -c -E 'designerpunk-(docs|application|product)|enabledMcpjsonServers|node_modules/@3fn/core' "$f") DesignerPunk-relevant lines"; grep -n -E 'designerpunk-(docs|application|product)|enabledMcpjsonServers|node_modules/@3fn/core' "$f" | cut -c1-200; else echo "${f}: absent"; fi
  done
  if [ -f "$R/home/.claude/.claude.json" ]; then echo "-- projects in the run store:"; jq -c '.projects // {} | to_entries[] | {dir: .key, trusted: .value.hasTrustDialogAccepted, enabled: .value.enabledMcpjsonServers}' "$R/home/.claude/.claude.json"; fi
  if [ -f "$R/repo/.claude/settings.local.json" ]; then echo "-- repo .claude/settings.local.json:"; cat "$R/repo/.claude/settings.local.json"; else echo "-- repo .claude/settings.local.json: absent"; fi
  echo "== run store (Kiro): $R/home/.kiro and $R/home/Library/Application Support/kiro-cli"
  for d in "$R/home/.kiro" "$R/home/Library/Application Support/kiro-cli"; do
    if [ -d "$d" ]; then echo "${d}: present, $(find "$d" -type f | wc -l | tr -d " ") files; DesignerPunk-relevant:"; grep -r -l -E 'designerpunk-(docs|application|product)|enabledMcpjsonServers|node_modules/@3fn/core' "$d" 2>/dev/null | head -20; else echo "${d}: absent"; fi
  done
  if [ -f "$R/home/.kiro/settings/mcp.json" ]; then echo "-- run-store Kiro global MCP servers:"; jq -r '.mcpServers // {} | keys[]' "$R/home/.kiro/settings/mcp.json"; fi
  echo "== real user stores (DesignerPunk-relevant only)"
  if [ -f "$HOME/.claude.json" ]; then echo "$HOME/.claude.json: $(grep -c -E 'designerpunk-(docs|application|product)|enabledMcpjsonServers|node_modules/@3fn/core' "$HOME/.claude.json") DesignerPunk-relevant lines"; else echo "$HOME/.claude.json: absent"; fi
  if [ -f "$HOME/.kiro/settings/mcp.json" ]; then echo "$HOME/.kiro/settings/mcp.json servers: $(jq -r '.mcpServers // {} | keys | join(", ")' "$HOME/.kiro/settings/mcp.json")"; else echo "$HOME/.kiro/settings/mcp.json: absent"; fi
  echo "$HOME/.kiro/agents: $(ls "$HOME/.kiro/agents" 2>/dev/null | tr "\n" " ")"
  echo "$HOME/.kiro/steering files naming DesignerPunk: $(grep -r -l -i designerpunk "$HOME/.kiro/steering" 2>/dev/null | wc -l | tr -d " ")"
}
hstate > "$R/out/harness-user-state-before.txt" 2>&1; cat "$R/out/harness-user-state-before.txt"
```

**Step 6 — Claude Code preflight (interactive), in an empty folder.** Expect the first-run onboarding and a browser sign-in. Defaults, no message, `/exit`. Paste back what it showed.

```sh
echo "isolation (CC): CLAUDE_CONFIG_DIR=$R/home/.claude (real HOME)" | tee -a "$R/out/isolation.txt"
cd "$R/empty" && CLAUDE_CONFIG_DIR="$R/home/.claude" script -q "$R/out/preflight-cc-$(date -u +%H%M%S).typescript" claude
```

**Step 7 — the join session (headless; Jordan works alone).** It prints nothing until it ends. Then run the check block and paste both outputs.

```sh
cd "$R/repo" && date -u +%Y-%m-%dT%H:%M:%SZ > "$R/out/join.start.utc" && CLAUDE_CONFIG_DIR="$R/home/.claude" claude -p "$(cat "$R/out/join-prompt.txt")" --max-turns 40 --output-format stream-json --verbose --permission-mode acceptEdits --allowedTools "Bash,Read,Write,Edit,Glob,Grep" --disallowedTools "WebFetch,WebSearch" > "$R/out/join.jsonl" 2> "$R/out/join.stderr"; echo "exit=$?" | tee "$R/out/join.exit"; date -u +%Y-%m-%dT%H:%M:%SZ > "$R/out/join.end.utc"
```

```sh
head -c 800 "$R/out/join.stderr"; echo; jq -c 'select(.type=="system" and .subtype=="init") | {cwd, model, mcp_servers}' "$R/out/join.jsonl"; jq -c 'select(.type=="result") | {subtype, num_turns, terminal_reason, is_error, total_cost_usd, duration_ms}' "$R/out/join.jsonl"
```

**Step 8 — open (interactive, captured): the restart, the teammate-cold first load, and C8(c).** Type no task. Note every prompt Claude Code shows before its input prompt, word for word, including anything about the personal note or an import. Answer by § 6. Then `/context` (wait), `/mcp` (wait, then Esc), `/exit`. Paste back each prompt with your answer, and what `/context` and `/mcp` showed.

```sh
cd "$R/repo" && CLAUDE_CONFIG_DIR="$R/home/.claude" script -q "$R/out/open-$(date -u +%H%M%S).typescript" claude
```

**Step 9 — the post-restart query: consumer-Stacy (headless).** It prints nothing until it ends. Then the check block; paste both outputs.

```sh
cd "$R/repo" && date -u +%Y-%m-%dT%H:%M:%SZ > "$R/out/query.start.utc" && CLAUDE_CONFIG_DIR="$R/home/.claude" claude -p "$(cat "$R/out/query-prompt.txt")" --agent stacy --max-turns 30 --output-format stream-json --verbose --permission-mode acceptEdits --allowedTools "Bash,Read,Write,Edit,Glob,Grep" --disallowedTools "WebFetch,WebSearch" > "$R/out/query.jsonl" 2> "$R/out/query.stderr"; echo "exit=$?" | tee "$R/out/query.exit"; date -u +%Y-%m-%dT%H:%M:%SZ > "$R/out/query.end.utc"
```

```sh
head -c 800 "$R/out/query.stderr"; echo; jq -c 'select(.type=="system" and .subtype=="init") | {cwd, model, mcp_servers}' "$R/out/query.jsonl"; jq -c 'select(.type=="result") | {subtype, num_turns, terminal_reason, is_error, total_cost_usd, duration_ms}' "$R/out/query.jsonl"
```

**Step 10 — after: state, repo, writes outside the folder, audit.** Paste the whole output. That ends the run.

```sh
hstate() {
  echo "== run store (CC): $R/home/.claude"
  for f in "$R/home/.claude/.claude.json" "$R/home/.claude/settings.json"; do
    if [ -f "$f" ]; then echo "${f}: present, $(grep -c -E 'designerpunk-(docs|application|product)|enabledMcpjsonServers|node_modules/@3fn/core' "$f") DesignerPunk-relevant lines"; grep -n -E 'designerpunk-(docs|application|product)|enabledMcpjsonServers|node_modules/@3fn/core' "$f" | cut -c1-200; else echo "${f}: absent"; fi
  done
  if [ -f "$R/home/.claude/.claude.json" ]; then echo "-- projects in the run store:"; jq -c '.projects // {} | to_entries[] | {dir: .key, trusted: .value.hasTrustDialogAccepted, enabled: .value.enabledMcpjsonServers}' "$R/home/.claude/.claude.json"; fi
  if [ -f "$R/repo/.claude/settings.local.json" ]; then echo "-- repo .claude/settings.local.json:"; cat "$R/repo/.claude/settings.local.json"; else echo "-- repo .claude/settings.local.json: absent"; fi
  echo "== run store (Kiro): $R/home/.kiro and $R/home/Library/Application Support/kiro-cli"
  for d in "$R/home/.kiro" "$R/home/Library/Application Support/kiro-cli"; do
    if [ -d "$d" ]; then echo "${d}: present, $(find "$d" -type f | wc -l | tr -d " ") files; DesignerPunk-relevant:"; grep -r -l -E 'designerpunk-(docs|application|product)|enabledMcpjsonServers|node_modules/@3fn/core' "$d" 2>/dev/null | head -20; else echo "${d}: absent"; fi
  done
  if [ -f "$R/home/.kiro/settings/mcp.json" ]; then echo "-- run-store Kiro global MCP servers:"; jq -r '.mcpServers // {} | keys[]' "$R/home/.kiro/settings/mcp.json"; fi
  echo "== real user stores (DesignerPunk-relevant only)"
  if [ -f "$HOME/.claude.json" ]; then echo "$HOME/.claude.json: $(grep -c -E 'designerpunk-(docs|application|product)|enabledMcpjsonServers|node_modules/@3fn/core' "$HOME/.claude.json") DesignerPunk-relevant lines"; else echo "$HOME/.claude.json: absent"; fi
  if [ -f "$HOME/.kiro/settings/mcp.json" ]; then echo "$HOME/.kiro/settings/mcp.json servers: $(jq -r '.mcpServers // {} | keys | join(", ")' "$HOME/.kiro/settings/mcp.json")"; else echo "$HOME/.kiro/settings/mcp.json: absent"; fi
  echo "$HOME/.kiro/agents: $(ls "$HOME/.kiro/agents" 2>/dev/null | tr "\n" " ")"
  echo "$HOME/.kiro/steering files naming DesignerPunk: $(grep -r -l -i designerpunk "$HOME/.kiro/steering" 2>/dev/null | wc -l | tr -d " ")"
}
hstate > "$R/out/harness-user-state-after.txt" 2>&1; cat "$R/out/harness-user-state-after.txt"
find "$R/home" -type f -newer "$R/out/start.stamp" | sed "s|$R/home|HOME|" | sort > "$R/out/home-files.txt"; echo "files the run stores gained: $(wc -l < "$R/out/home-files.txt" | tr -d " ")"; grep -v -E "/(plugins|skills)/" "$R/out/home-files.txt" | head -40
find /tmp/ -maxdepth 1 -newer "$R/out/start.stamp" 2>/dev/null | grep -v -E "^/tmp/$|^/tmp/dp-trio$" | tee "$R/out/tmp-writes.txt"
cd "$R/repo" && git status --porcelain --ignored | tee "$R/out/repo-status.txt"; git log --oneline --all | head -5
grep -n -A3 '"node_modules/@3fn/core"' "$R/repo/package-lock.json" | head -6
ls -A "$R/repo/.claude" "$R/repo/.kiro" 2>&1 | head -20
cd "$R/repo" && cat .claude/settings.local.json 2>&1; git check-ignore -v .claude/settings.local.json 2>&1
grep -n -i -E 'DesignerPunk-v2|wt-u5|claude-501|github\.com/3fn/DesignerPunk|raw\.githubusercontent\.com/3fn' "$R"/out/join.* "$R"/out/query.* "$R"/out/open-*.typescript > "$R/out/source-access-audit.txt"; echo "source-access audit hits: $(wc -l < "$R/out/source-access-audit.txt" | tr -d " ") (package self-references expected; see § 10)"
date -u +%Y-%m-%dT%H:%M:%SZ > "$R/out/end.utc"; ls -la "$R/out"
```

**What to paste back for `join-kiro-to-cc`**: steps 0–10; every prompt you answered, word for word, with your answer; anything you typed beyond the steps (including any `operator-unblock`), and why; any Ctrl-C and why. Then: "`join-kiro-to-cc` done; files in `/tmp/dp-trio/join-kiro-to-cc/out`."
