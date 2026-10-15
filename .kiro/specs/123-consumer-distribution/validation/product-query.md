# Product query record — consumer-Leonardo, the seat and the bar

**Spec**: 123-consumer-distribution · **Task**: 28.3 (Task 28 criterion 3, "Product query — seat and bar"; Leonardo A7) · **Operator and author**: Leonardo (Opus) · **Run date**: 2026-10-15 · **Protocol**: `tests/onboarding-trio/protocol.md` § 16
**Sources**: read only, from `/tmp/dp-trio/product-query/{out,repo,home}/`, plus Peter's paste-back (steps 0–9 verbatim, and two screenshots of step 6, described by the orchestrator). Where a paste-back and a file disagree, the file is quoted. Transcripts are not committed; the excerpts below are.
**Traces**: Task 28 criterion 3 · Req 25.5 (forced negative; per-question discovery) · instruments rows 3.1–3.8 (`completion/task-28-instruments.md`)

> **The bar's evidence form (§ `bar:`) was fixed in the skeleton, committed in `67275cfee` before the run, and is not edited here.** Everything else was filled from the run's files.

---

### Evidence sentence (for Task 28 criterion 3)

**Met, n=1.** The run used a fresh headless Claude Code session (2.1.301), launched with `--agent leonardo`. The seat is confirmed: the session's 44 tools equal the `tools:` list in `.claude/agents/leonardo.md`. The session ran in a fresh clone of the CC-born fixture `born-cc` (preview candidate `aa3efdcf…`; the bar's sources are unchanged from `4c875235a` to `67275cfee`).
- Consumer-Leonardo called `get_product_overview {}` and `find_screens {}`.
- Their `tool_result`s carry `"name": "Order Status"` (`product/overview.yaml` L3 reads `name: "Order Status"`) and `example-home`.
- His answer states both.

The run is scoped: one session; the prompt names the server, not the tools; the tarball is the preview, not release 4. Sources: `validation/product-query.md` § `transcript-excerpt:` and § `bar:`.

---

### run-id:
`product-query`. **One** fresh headless Claude Code session, `--agent leonardo`, in **one** fresh clone of `tests/onboarding-trio/fixtures/born-cc`.
- Claude Code **2.1.301**, from the session's init event. `out/host.txt` reads 2.1.300: the CLI auto-updated between steps 4 and 6 (PQ-2).
- Model `claude-fable-5-1`. Session id `d2d7002d-0d23-452e-b0c1-22ea3849cb39`.

### frozen-prompt:
- File: `.kiro/specs/123-consumer-distribution/validation/prompts/product-query-leonardo.md`, added in `67275cfee`, the only commit that touches it. `out/prompt.md` is byte-identical to it (`git show 67275cfee:<path> | diff - out/prompt.md`, no output).
- Ancestry: `git merge-base --is-ancestor 67275cfee HEAD` → exit 0, run against the unit head when this record was written. The check is re-run against the record's commit.
- **Lexical check at freeze** (2026-10-15, over the PROMPT block as `awk` extracts it, 6 lines): `grep -c -i -E 'get_product_overview|find_screens|list_experience_map|Order Status|example-home'` → **0**. The prompt names the server (`designerpunk-product`), and neither tool nor either expected value. Step 3 extracted 6 lines (`out/product-query-prompt.txt`).
- Reproduced verbatim:

> # Frozen prompt — `product-query-leonardo`
>
> - **Run**: `product-query` (Spec 123 Task 28.3; Task 28 criterion 3, "Product query — seat and bar", Leonardo A7) · **Agent**: consumer-Leonardo, `claude --agent leonardo -p …` · **Harness**: Claude Code (`cc`); its stream-json keeps `tool_result` blocks, which Run 3's Kiro transcript did not (`validation/trio-3-pm.md` R3-7).
> - **Consumer repo**: a fresh clone of `tests/onboarding-trio/fixtures/born-cc` (Dana's `order-status` service, born `init --target=cc --name "Order Status"` from candidate `aa3efdcf…`, Task 26.1's CC-born fixture), stated as such. The launcher runs `npm install` and `npx designerpunk generate`, then opens Claude Code once to trust the folder and enable the servers (setup, not under test; protocol § 16).
> - **One session**, fresh, headless. Budget 15 turns (observed, not enforced; protocol § 4).
> - **What the prompt names, and what it does not**: it names the server (`designerpunk-product`), because A7's bar is that the seat makes the query rather than reading the fixture. It names neither tool and neither expected value. Lexical check over the PROMPT block, run at freeze: no `get_product_overview`, `find_screens`, `list_experience_map`, `Order Status` or `example-home`.
> - **Protocol**: `tests/onboarding-trio/protocol.md` § 16 · **Frozen**: 2026-10-15, by Leonardo (operator, and the system counterpart of the seat under test). Committed before the run and reproduced verbatim in the record.
> - The launcher sends only the text between the markers, as the session's first and only message.
>
> <!-- PROMPT BEGIN -->
> Hi Leonardo, I'm Dana. Before we plan any screens, I want to check what DesignerPunk already knows about this project. Please get the answers from DesignerPunk's product server (designerpunk-product), not by reading the files yourself:
>
> 1. What product is this repo for? Give its name exactly as it is recorded, and its register.
> 2. How many screens are already specified, and which ones? Name each one exactly as it is recorded, with its status.
>
> A few sentences is plenty. Please don't plan or change anything, and I can't answer questions while you work.
> <!-- PROMPT END -->

### consumer-repo:
- **Chosen**: one fresh clone of **Task 26.1's CC-born fixture, `tests/onboarding-trio/fixtures/born-cc`, stated as such** (instruments row 3.5, second form). It is Dana's `order-status` service, unchanged since `23be48ee1`. It was born by `npx designerpunk init --target=cc --name "Order Status" --abbreviation OST` from candidate `aa3efdcf…`, the `4c875235a` preview (`validation/trio-1-backend.md` L169).
- **It is not a release-4 birth.** The bar is about the seat and the Product MCP, not the tarball version. This run says nothing about the release-4 tarball itself.
- **Why the fixture stands in for release 4 on this bar**: every source the bar reads is unchanged from `4c875235a`:
  - `product-mcp-server/`;
  - `src/cli/` (`init`, and the product templates);
  - `canonical/_consumer-output/cc/.claude/agents/leonardo.md`;
  - `package-lock.json`.
- **The checks**:
  - At `2acf8fb87` (2026-10-15, before the run): 0 paths changed. The fixture's `leonardo.md` is identical to the canonical rendering. `product-mcp-server/src` imports nothing from `application-mcp-server/` or `mcp-server/src/`, the two servers that did change.
  - **At the run** (§ 16 step 0, at `COMMIT`, whose prompt file is byte-identical to `67275cfee`'s), verbatim: `measured sources unchanged since 4c875235a: 0 paths` and `seat rendering: fixture == canonical at COMMIT`.
  - **Re-checked at the U5 PR head**: DONE — at `8bae0346f` (PR #362's head, merged as `b10d5d3b6`) the diff reads **0 paths** (orchestrator, 2026-10-15; pasted in `completion/task-28-completion.md` § "PR gate and post-merge checks"). The record stands for release 4. Whoever opens the PR runs `git diff --name-only 4c875235a <PR head> -- product-mcp-server src/cli canonical/_consumer-output/cc/.claude/agents/leonardo.md package-lock.json`. If any path has moved, this record no longer stands for release 4, and the run is repeated against a fresh `init --target=cc` birth from the release-4 tarball.
- Run repo: `/tmp/dp-trio/product-query/repo`, cloned from `origin/`: `6f07b47 founder's repo`, **203** files.

### candidate:
- `/Users/3fn/Documents/Work Projects/Kiro/u5-pack/3fn-core-15.1.0.tgz`. Expected shasum `aa3efdcf9ce3c2689c2e5979932c48a46f3f6584`; measured the same (`out/candidate-shasum.txt`).
- Setup by the launcher (step 5), not under test:
  - `npm install`: "added 391 packages in 2s", after a `glob@7.2.3` deprecation warning;
  - `npx designerpunk generate`: "Component tokens: 10 ; ✅ System tokens generated";
  - `git status` after: `?? .pack/` only.

### target:
`cc`. The repo is CC-born, so no `attach` was needed.

### seat:
- **Rendering**: `repo/.claude/agents/leonardo.md`, as cloned (identical to the canonical CC rendering at `COMMIT`; step 0).
  - Its `tools:` list carries `mcp__designerpunk-product__find_screens` (L37) and `mcp__designerpunk-product__get_product_overview` (L42).
  - Its routing section carries "WHEN determining register (brand or product) for a surface THEN use mcp__designerpunk-product__get_product_overview" (L446) and "WHEN counting matching screens to determine novelty / gate depth THEN use mcp__designerpunk-product__find_screens" (L448).
- **That the session ran in that seat: established.** Step 8 compared the init event's `tools` with `leonardo.md`'s `tools:` frontmatter, sorted: **`identical (44 tools)`**, and `out/seat-diff.txt` is empty.
  - The method discriminates. On the conformance run's files, Stacy's session matched `stacy.md` exactly (29 tools) and differed from `leonardo.md`.
- **The charter's own pre-flight ran**: the first tool call was `git status --porcelain` ("Show working tree status (pre-flight)"), as § "Pre-flight" of the rendering prescribes.
- **"Fresh"**: launched with `-p`, with no `--continue` and no `--resume`. Its session id (`d2d7002d-…`) does not appear in the open's capture (`grep`, no match). The only earlier session in this repo is the setup open, in which no task was typed.

### source-access:
- Audit (`out/source-access-audit.txt`): **0 hits**. **Access attempts: none.**
- Writes outside the run folder (`out/tmp-writes.txt`): `/tmp/claude-501` and `/tmp/cc-socks`. Both are the orchestrator session's own harness directories, touched concurrently, not writes by the run (orchestrator note in the paste-back). No tool call in `product-query.jsonl` names either. The step's `find /tmp -newer` cannot separate concurrent sessions; that limit of the instrument is recorded, not a finding.

### harness-user-state:
- **Mechanism**: `CLAUDE_CONFIG_DIR="$R/home/.claude"` with the real `HOME` (`out/isolation.txt`: "isolation (CC): CLAUDE_CONFIG_DIR=/tmp/dp-trio/product-query/home/.claude (real HOME)").
- **Before** (`out/harness-user-state-before.txt`, step 4, before the preflight), verbatim:
  > `/tmp/dp-trio/product-query/home/.claude/.claude.json: absent` · `…/settings.json: absent` · `-- repo .claude/settings.local.json: absent` · `/Users/3fn/.claude.json: 18 DesignerPunk-relevant lines`
- **After** (`out/harness-user-state-after.txt`, step 9), verbatim excerpts:
  > `/tmp/dp-trio/product-query/home/.claude/.claude.json: present, 2 DesignerPunk-relevant lines` — `1479: "enabledMcpjsonServers": [],` · `1517: "enabledMcpjsonServers": [],`
  > `{"dir":"/private/tmp/dp-trio/product-query/empty","trusted":true,"enabled":[]}` · `{"dir":"/private/tmp/dp-trio/product-query/repo","trusted":true,"enabled":[]}`
  > `-- repo .claude/settings.local.json:` `{ "enabledMcpjsonServers": [ "designerpunk-docs", "designerpunk-application", "designerpunk-product" ] }`
  > `/Users/3fn/.claude.json: 18 DesignerPunk-relevant lines` (unchanged)
- **Where each answer landed** (observation 1, read under § `findings:`):
  - **trust** is in the run store, `projects[…/repo].hasTrustDialogAccepted: true`;
  - **the server enablement** is in the **repo's** `.claude/settings.local.json`, all three servers;
  - the run store's `enabledMcpjsonServers` stays `[]` for both projects.
  - The real user store's count did not move.
- **Files the run store gained**: 789 (`out/home-files.txt`). They are 550 under `plugins/` and 227 under `skills/` (account-level, not DesignerPunk's), plus `.claude.json`, its 3 backups, `settings.json`, `history.jsonl`, `.last-update-result.json` (the auto-update; PQ-2), `.last-cleanup`, 2 under `projects/` (the session logs) and 2 under `cache/`. None is DesignerPunk-relevant beyond the trust entries above.
- **Account-level state, named and not counted**:
  - the `claude.ai Claude Docs` connector (`source: claudeai`), connected in `/mcp`, in `claude mcp list` and in the session's init event;
  - the built-in `computer-use` entry, listed and not enabled.
- **Verdict**: the run store was clean before the preflight (every entry `absent`). **Not a cold-observation run**: the setup open trusts the folder and enables the servers before the session. No `first-MCP-load` observation is claimed and no `cold-observation` cell is written (the § 15 precedent).

### session-launched-by:
Peter, every session, from one macOS Terminal window:
- the preflight (`out/preflight-cc-212704.typescript`);
- the trust-and-enable open (`out/open-212800.typescript`);
- `claude mcp list` (not a session; `out/mcp-list.txt`);
- the product query (`out/product-query.jsonl`).

### operator-log:
- **Session under test (`product-query`)**: **none**. Nothing was typed into it, with no `operator-unblock` and no `operator-halt`.
- **Fixed setup steps**, from the captures (Peter did not transcribe the prompts; the captures are quoted):
  - `setup — npm install; npx designerpunk generate` · reason: § 16 step 5.
  - `preflight (empty folder, CC 2.1.300)` · reason: § 6, onboarding defaults:
    - the theme screen ("Choose the text style that looks best with your terminal");
    - "Select login method:" → "1. Claude account with subscription · Pro, Max, Team, or Enterprise";
    - browser sign-in, "Login successful" (the operator's account, `…@designerpunk.ai`);
    - "Security notes:" → Enter;
    - "Use Claude Code's terminal setup?" → "1. Yes, use recommended settings";
    - "Quick safety check: Is this a project you created or one you trust?" → "Yes, I trust this folder";
    - then `/exit`.
    - The capture also shows "✔ Update installed · Restart to update" (PQ-2) and the notice "Auto mode is now Claude Code's default permission mode" (PQ-1).
  - `approval (open, CC 2.1.301): "Quick safety check: Is this a project you created or one you trust? … ⚠ This folder pre-approves 40 tool permissions in .claude/settings.json: … These will apply without asking. Only proceed if you trust this configuration." → "Yes, I trust this folder"` · reason: § 6.
  - `approval (open): "3 new MCP servers found in this project. Select any you wish to enable. MCP servers may execute code or access system resources. All tool calls require approval. … [✔] designerpunk-docs [✔] designerpunk-application [✔] designerpunk-product" → "Enable selected"` · reason: § 6.
  - `open — /mcp ("Manage MCP servers — 5 servers"; Project MCPs: ✔ designerpunk-application 21 tools, ✔ designerpunk-docs 8 tools, ✔ designerpunk-product 14 tools; claude.ai: ✔ claude.ai Claude Docs 8 tools; Built-in: ◯ computer-use), Esc, /exit` · reason: fixed open steps.
  - `mcp list` (`out/mcp-list.txt`), verbatim: "designerpunk-docs: node ./node_modules/@3fn/core/dist/mcp/docs-mcp.js - ✔ Connected" · "designerpunk-application: … application-mcp.js - ✔ Connected" · "designerpunk-product: … product-mcp.js - ✔ Connected" (plus "claude.ai Claude Docs: … ✔ Connected") · reason: § 16 step 6, the server record.
  - Nothing else beyond the fixed steps.

### budget:
| Session | Budget | Enforcement | Turns used | Result |
|---|---|---|---|---|
| product-query | 15 | observed, not enforced (§ 4) | **4** | `success`, `completed`, `is_error: false`; 9,208 ms; $1.13; `permission_denials: []`; stderr empty |

### stop:
- stop: preflight-cc — completed
- stop: open — completed
- stop: product-query — completed

### wall-clock:
Recorded, never asserted. Run 21:25:54Z → 21:32:17Z. **Product query 21:29:13Z → 21:29:23Z** (10 s; `duration_ms` 9,208).

### transcript-excerpt:
From `out/product-query-excerpt.txt` (step 8's output) and `out/product-query.jsonl`. Both calls, both results and the answer, as the stream-json carries them.

- **Init event**: `{"cwd":"/private/tmp/dp-trio/product-query/repo","model":"claude-fable-5-1","claude_code_version":"2.1.301","permissionMode":"auto","mcp_servers":[{"name":"designerpunk-docs","status":"connected","source":"project"},{"name":"designerpunk-application","status":"connected","source":"project"},{"name":"designerpunk-product","status":"connected","source":"project"},{"name":"claude.ai Claude Docs","status":"connected","source":"claudeai"}]}`
- **Every tool call, in order** (`out/product-query-calls.txt`):
  1. `Bash {"command":"git status --porcelain","description":"Show working tree status (pre-flight)"}` → `?? .pack/`
  2. `mcp__designerpunk-product__get_product_overview {}`
  3. `mcp__designerpunk-product__find_screens {}`
- **`get_product_overview`**: call `toolu_01CGXLugWiQJsJyB9tHy6xMk`, input `{}`, `is_error` null. Result, verbatim (`out/result-get_product_overview.txt`):
  ```json
  {
    "name": "Order Status",
    "description": "Answers 'where is my order?' for the support team: an HTTP lookup service, soon with a small web status page.",
    "register": "product",
    "platforms": {
      "shipsFirst": ["web"],
      "minimumVersions": { "web": "TODO", "ios": "TODO", "android": "TODO" },
      "browsers": "TODO",
      "devices": "TODO",
      "assistiveTechnology": "TODO"
    }
  }
  ```
  (Arrays and objects are collapsed onto one line here; the field values are verbatim.)
- **`find_screens`**: call `toolu_01WvZxaVaAZ1867rdpUoUDfB`, input `{}`, `is_error` null. Result, verbatim (`out/result-find_screens.txt`), collapsed the same way:
  ```json
  [
    {
      "name": "example-home",
      "type": "feature-page",
      "tags": ["example", "home", "getting-started"],
      "status": { "spec": "complete", "web": "not-started", "ios": "not-started", "android": "not-started" },
      "referencedComponents": ["Nav-Header-App", "Container-Base", "Button-CTA"],
      "referencedDomainObjects": []
    }
  ]
  ```
- **The answer, verbatim** (`out/product-query-answer.txt`):

  > Hi Dana — here's what DesignerPunk's product server (`designerpunk-product`) reports, straight from its index, no files read.
  >
  > **1. Product and register**
  > The product is recorded as **"Order Status"**, with register **product** (not brand). Its description: answers "where is my order?" for the support team — an HTTP lookup service, soon with a small web status page. Web is the ships-first platform; minimum versions, browsers, devices, and assistive technology are all still `TODO` in `product/overview.yaml`.
  >
  > **2. Screens already specified**
  > Exactly **one** screen is indexed: **`example-home`** (type `feature-page`, tagged example / home / getting-started). Its status is **spec: complete**, with **web, iOS, and Android all `not-started`**. It references `Nav-Header-App`, `Container-Base`, and `Button-CTA`, and no domain objects.
  >
  > One candid note: the name and tags mark it as the shipped starter example, not an Order Status screen — so in practical terms there are no product-specific screens specified yet. The pre-flight `git status` showed only an untracked `.pack/` directory; nothing was planned or changed.

### bar:
**Fixed before the run** (skeleton, `67275cfee`). Each limb is read from the stream-json's `tool_result` blocks and the session's final `result`, never from the agent's account of what it did.

| Limb | Comparator | Met when | Evidence | Verdict |
|---|---|---|---|---|
| (a) the overview's product name matches the scaffold | `product/overview.yaml` L3 in the run repo, quoted: **`name: "Order Status"`**. It is the line `init` filled from `--name "Order Status"` (template L3 `name: "__PRODUCT_NAME__"`, `src/cli/templates/product/overview.yaml` @ `cdb8296fa`) | the `get_product_overview` `tool_result` contains the quoted name, **and** the answer states it | step 8, verbatim: `overview.yaml L3: name: "Order Status"` · `bar (a) "Order Status": in the get_product_overview result: 1; in the answer: 2` | **met** |
| (b) `find_screens` returns `example-home` | `product/experience-map/pages/example-home.yaml` L3 `name: example-home`, the scaffold's screen (in-repo bar: `src/cli/__tests__/productScaffold.test.ts` L210) | the `find_screens` `tool_result` contains `example-home`, **and** the answer names it | step 8, verbatim: `bar (b) example-home: in the find_screens result: 1; in the answer: 1` | **met** |

- **Seat condition on both limbs**: met. The session ran as consumer-Leonardo (§ `seat:`, `identical (44 tools)`).
- **Rules fixed before the run, as they applied**:
  - both tools were called, once each, unfiltered (`{}`);
  - neither result was an error;
  - no file was read: the calls were `Bash` once, for the pre-flight `git status`, and the two Product MCP tools.
- **Criterion verdict: met.** Both limbs are met, and the excerpt above shows both calls, both results and both answers. Scope: § `what this record cannot establish:`.

### discovery:
Req 25.5's per-question record. The prompt put two questions, and each was answered through one Product MCP tool.

| Question (from the frozen prompt) | Tool and input | Result | Record |
|---|---|---|---|
| 1. What product is this repo for (name exactly as recorded; register)? | `get_product_overview {}` | `"name": "Order Status"`, `"register": "product"` | **succeeded**: the answer gives "Order Status" and register "product (not brand)" |
| 2. How many screens are already specified, and which (name as recorded; status)? | `find_screens {}` | one screen, `example-home`, `spec: complete`, web/ios/android `not-started` | **succeeded**: the answer gives "Exactly one screen", `example-home`, and its status |
| any other discovery call (`find_docs`, `get_section` and the like) | none | — | none made |

### findings:
**`subject: leonardo` findings: none.** Written, not implied. Consumer-Leonardo is the subject of every observation about the session's behaviour, and none of them is a defect. Observation 6 below is tagged `subject: leonardo` as a non-finding.

**Product findings** (DesignerPunk's server, scaffold, install doc or rendering): **none.**

**Instrument findings (the protocol; owner Leonardo, the operator)**:

| # | Axis | Finding | Evidence | Route (proposed) |
|---|---|---|---|---|
| PQ-1 | outside the axes (instrument) | **The session ran under `permissionMode: "auto"`, not the default mode § 16.1 assumed.** § 16 passed no `--permission-mode`, on the reasoning that "a write attempt shows up as a permission denial". Claude Code now defaults to auto mode: the preflight capture shows "Auto mode is now Claude Code's default permission mode … Claude checks each tool call for risky actions … runs the ones it assesses as lower-risk, and blocks the rest". So a write might have been allowed rather than denied. **No write was attempted** (`git status` after: `?? .pack/` only; no Write or Edit call), so the bar is unaffected. But this run **cannot tell** what let the two MCP calls through: the committed pre-approvals in `.claude/settings.json`, `--allowedTools`, or the auto-mode classifier. | `product-query.jsonl` init event; `out/preflight-cc-212704.typescript`; `out/repo-status.txt` | protocol (Leonardo): pass an explicit `--permission-mode` in future headless blocks. Thurgood, for the record: the same default reaches consumers, and whether it changes what INSTALL's "pre-approved … apply without asking" buys a user is **unobserved here** |
| PQ-2 | outside the axes (instrument) | **The harness auto-updated mid-run**, 2.1.300 → 2.1.301 between step 4 (`out/host.txt`) and step 6. The preflight capture shows "✔ Update installed · Restart to update", and the open, `/mcp` and the session's init event report 2.1.301. This record takes the version from the init event. Every earlier § 11/§ 14/§ 15 record took it from `host.txt`, which can be stale in the same way. | `out/host.txt`; `out/preflight-cc-212704.typescript`; init event; `home/.claude/.last-update-result.json` | protocol (Leonardo): record the session's version from its init event. Pin the CLI for a run, e.g. `DISABLE_AUTOUPDATER=1` (unverified at 2.1.301) |

**Observations that are not findings** (each read, with the reason):

1. **Where the trust and enable answers landed** (Peter's two answers in the open).
   - **What was observed**:
     - trust went to the run store (`hasTrustDialogAccepted: true` for `…/repo`);
     - the server enablement went to **the repo's** `.claude/settings.local.json`, all three servers;
     - the run store's `enabledMcpjsonServers` stays `[]` for both projects.
   - **Reading: confirmation, not a finding.** It reproduces R1-12 (`trio-1-backend.md`, on CC 2.1.300) and the C8(c) observation on 2.1.301.
   - **The install doc matches what was seen.** The step-5 sentence ("Claude Code then asks you to trust the folder and to enable DesignerPunk's three MCP servers: accept both") and its explanation (`docs/consumer/INSTALL.md` @ `992e2ae36`, L69) say Claude Code asks twice, lists the pre-approved permissions at trust, and preselects all three servers so "Enable selected" is the answer, and that "It keeps that choice per clone, so each person answers once."
   - **What is not new**: `.claude/settings.local.json` did not show in `git status` (`?? .pack/` only), because of the launcher's global git ignore. That is R1-12's erratum, already routed, not a new item.
   - **One nuance, recorded as a watch item and not as a defect**: the enable dialog's own text says "All tool calls require approval", while the trust dialog says the 40 pre-approvals "will apply without asking". Which governed this session cannot be separated from auto mode (PQ-1).
2. **The CC auto-update**: PQ-2 above.
3. **The `claude.ai Claude Docs` account connector** (`source: claudeai`) was present and connected in the run store. It is account-level state from the operator's login, not DesignerPunk's. Named, not counted. It made no call in the session.
4. **`tmp-writes`**: `/tmp/claude-501` and `/tmp/cc-socks` are the orchestrator session's harness directories, not the run's (§ `source-access:`). Not a finding.
5. **`permissionMode: "auto"`**: PQ-1 above.
6. **`subject: leonardo` — non-finding: consumer-Leonardo read the scaffold correctly, unprompted.**
   - He added: "the name and tags mark it as the shipped starter example, not an Order Status screen — so in practical terms there are no product-specific screens specified yet."
   - That matches the scaffold's own comment in `example-home.yaml` L1–2 ("An example screen spec. Your agents find it with find_screens; keep it, edit it, or delete it once you have specified a screen of your own"), which he did not read. He inferred it from the `example` tag and the name.
   - His other claims check against the record:
     - "no files read": the calls were `git status` and the two MCP tools;
     - "nothing was planned or changed": `git status` after shows `?? .pack/` only;
     - the `TODO` platform fields: present in the `get_product_overview` result.
   - It is the charter's candid-over-comfortable behaviour, and is recorded as such.

### what this record cannot establish:
- **Release 4's tarball.** The candidate is the `4c875235a` preview. The equivalence in § `consumer-repo:` is source-level: unchanged paths and the same lock. It is not a byte comparison of the two `dist/mcp/product-mcp.js` bundles, and it holds only while the U5 PR-head re-check reads 0 paths.
- **Unprompted routing.** The prompt names the server. That is A7's bar (the seat makes the query), but this run does not show that consumer-Leonardo reaches for the Product MCP when nobody mentions it. Run 3 (Kiro, unprompted) made both calls, but its results cannot be read (R3-7), so unprompted routing on Claude Code stays unobserved.
- **More than one sample.** n=1: one session, one repo, one harness version (2.1.301), one model (`claude-fable-5-1`). It shows the seat **can** answer both from the tools. It does not show that it **reliably** does.
- **Cold behaviour.** The setup open precedes the session, so nothing here speaks to first-MCP-load.
- **What permitted the MCP calls** (PQ-1): the committed pre-approvals, `--allowedTools`, or the auto-mode classifier.
- **Operator independence.** The operator is consumer-Leonardo's system counterpart, judging his own seat (run discipline C2). The bar is mechanical — string presence in `tool_result` blocks, fixed and committed before the run — which narrows that judgment. Stacy's CLOSEOUT cross-reads the `subject: leonardo` observations.
