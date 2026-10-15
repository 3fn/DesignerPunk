# Product query record — consumer-Leonardo, the seat and the bar

**Spec**: 123-consumer-distribution · **Task**: 28.3 (Task 28 criterion 3, "Product query — seat and bar"; Leonardo A7) · **Operator and author**: Leonardo (Opus) · **Run date**: PENDING · **Protocol**: `tests/onboarding-trio/protocol.md` § 16
**Sources**: read only, from `/tmp/dp-trio/product-query/{out,origin,repo,home}/`, plus Peter's paste-backs relayed by the orchestrator. Where a paste-back and a file disagree, the file is quoted. Transcripts are not committed; the excerpts below are.
**Traces**: Task 28 criterion 3 · Req 25.5 (forced negative; per-question discovery) · instruments rows 3.1–3.8 (`completion/task-28-instruments.md`)

> **Skeleton, written 2026-10-15 before the run.** Every cell marked `PENDING` is filled from the run's files. The bar's evidence form (§ `bar:`) is fixed here, **before** the run, and is not edited afterwards. If the run shows the form was wrong, that goes under `findings:`.

---

### run-id:
`product-query`. **One** fresh headless Claude Code session, `--agent leonardo`, in **one** fresh clone of `tests/onboarding-trio/fixtures/born-cc`. Claude Code PENDING (version from `out/host.txt`), model PENDING (from the init event).

### frozen-prompt:
- File: `.kiro/specs/123-consumer-distribution/validation/prompts/product-query-leonardo.md`, added in PENDING. `out/prompt.md` is byte-identical to it: PENDING (`diff`).
- Ancestry: `git merge-base --is-ancestor <prompt commit> <record commit>` → PENDING.
- **Lexical check at freeze** (2026-10-15, over the PROMPT block as `awk` extracts it, 6 lines): `grep -c -i -E 'get_product_overview|find_screens|list_experience_map|Order Status|example-home'` → **0**. The prompt names the server (`designerpunk-product`), and neither tool nor either expected value.
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
- **Why the fixture stands in for release 4 on this bar**: every source the bar reads is unchanged from `4c875235a` to the prompt commit:
  - `product-mcp-server/` (the server and its bundle source);
  - `src/cli/` (`init`, which fills the name, and the product templates, which carry `example-home`);
  - `canonical/_consumer-output/cc/.claude/agents/leonardo.md` (the seat);
  - `package-lock.json`.
  - Measured 2026-10-15 at `2acf8fb87`: `git diff --name-only 4c875235a 2acf8fb87 -- <those paths>` → 0 paths. The fixture's `leonardo.md` is identical to the canonical CC rendering (`diff`, no output). `product-mcp-server/src` imports nothing from `application-mcp-server/` or `mcp-server/src/`, the two servers that did change (`grep`, no match).
  - At the run (protocol § 16 step 0, at `COMMIT`): PENDING (expect `0 paths` and `seat rendering: fixture == canonical at COMMIT`).
  - **Re-checked at the U5 PR head**: PENDING. If any measured path has moved by then, this record no longer stands for release 4, and the run is repeated against a fresh `init --target=cc` birth from the release-4 tarball.
- **Why not a fresh birth now**:
  - the fixture's lock pins the preview tarball's integrity, so the release-4 tarball cannot be dropped into it without a re-lock;
  - a fresh birth waits on the release-4 tarball, and adds an `init` step that is setup here, not under test;
  - the § 15 recipe on this fixture is proven: all three servers were `connected` in every headless init event of the conformance run.
- Run repo: `/tmp/dp-trio/product-query/repo`, cloned from `origin/` (`founder's repo`, PENDING files; expect 203).

### candidate:
`/Users/3fn/Documents/Work Projects/Kiro/u5-pack/3fn-core-15.1.0.tgz`, expected shasum `aa3efdcf9ce3c2689c2e5979932c48a46f3f6584`, measured PENDING (`out/candidate-shasum.txt`). Setup by the launcher (step 5), not under test: `npm install` PENDING; `npx designerpunk generate` PENDING; `git status` after PENDING (expect `?? .pack/` only).

### target:
`cc`. The repo is CC-born, so no `attach` is needed.

### seat:
- **Rendering**: `repo/.claude/agents/leonardo.md`, as cloned. Its `tools:` list carries `mcp__designerpunk-product__get_product_overview` (L42) and `mcp__designerpunk-product__find_screens` (L37). Its routing section carries "WHEN determining register (brand or product) for a surface THEN use mcp__designerpunk-product__get_product_overview" (L446) and "WHEN counting matching screens to determine novelty / gate depth THEN use mcp__designerpunk-product__find_screens" (L448). Line numbers are from the fixture at `23be48ee1`.
- **That the session ran in that seat**: the init event names no agent, so the record uses the tool list. Step 8 compares the init event's `tools` with `leonardo.md`'s `tools:` frontmatter, sorted.
  - The method discriminates. On the conformance run's files, Stacy's session matched `stacy.md` exactly (29 tools). Against `leonardo.md` it differed by `Skill` and `get_color_strategy`.
  - Result: PENDING (`out/seat-diff.txt`).
- **"Fresh"**: no `--continue` or `--resume`. The session's `session_id`: PENDING (from the init event). The only earlier session in this repo is the setup open, in which no task was typed.

### source-access:
Audit (`out/source-access-audit.txt`): PENDING hits, each classified per protocol § 10, or `none`.
Writes outside the run folder (`out/tmp-writes.txt`): PENDING.

### harness-user-state:
- **Mechanism**: `CLAUDE_CONFIG_DIR="$R/home/.claude"` with the real `HOME` (`out/isolation.txt`).
- **Before** (`out/harness-user-state-before.txt`, taken before the preflight): PENDING (expect the run-store entries `absent`).
- **After** (`out/harness-user-state-after.txt`): PENDING. Expected entries: the open's trust (`projects` entries `trusted: true`) and the repo's `.claude/settings.local.json` enabling the three servers. Any other DesignerPunk-relevant entry is listed.
- Files the run store gained: PENDING (`out/home-files.txt`, count).
- **Not a cold-observation run.** The setup open precedes the session, so no `first-MCP-load` observation is claimed, and no `cold-observation` cell is written (the § 15 precedent).

### session-launched-by:
Peter, every session: preflight (PENDING capture name), the trust-and-enable open (PENDING), `claude mcp list` (not a session; recorded for completeness), and the product query. All from a macOS Terminal window. PENDING confirmation from the paste-back.

### operator-log:
- `setup — npm install; npx designerpunk generate` · reason: § 16 step 5, setup.
- `approval (open): PENDING, verbatim → PENDING` · reason: § 6.
- `open — /mcp (PENDING listing), /exit` · reason: fixed open steps.
- `mcp list — PENDING (out/mcp-list.txt)` · reason: § 16 step 6, the server record.
- Anything else the launcher typed: PENDING, or `none beyond the fixed open steps`. No `operator-unblock`, no `operator-halt`: PENDING.

### budget:
| Session | Budget | Enforcement | Turns used | Result |
|---|---|---|---|---|
| product-query | 15 | observed, not enforced (§ 4) | PENDING | PENDING (`subtype`, `terminal_reason`, ms, cost, `permission_denials`) |

### stop:
- stop: preflight-cc — PENDING
- stop: open — PENDING
- stop: product-query — PENDING

### wall-clock:
Recorded, never asserted. Run PENDING → PENDING. Product query PENDING → PENDING.

### transcript-excerpt:
From `out/product-query-excerpt.txt` (step 8's output). Both calls, both results and the answer, as the stream-json carries them.

- **Init event**: `mcp_servers`: PENDING (expect `designerpunk-docs`, `designerpunk-application` and `designerpunk-product` `connected`). Any account-level connector listed is named and not counted.
- **Every tool call, in order** (`out/product-query-calls.txt`): PENDING.
- **`get_product_overview`**: call id PENDING, input PENDING, `is_error` PENDING. Result excerpt, verbatim: PENDING.
- **`find_screens`**: call id PENDING, input PENDING, `is_error` PENDING. Result excerpt, verbatim: PENDING.
- **The answer, verbatim** (`out/product-query-answer.txt`): PENDING.

### bar:
**Fixed before the run.** Each limb is read from the stream-json's `tool_result` blocks and the session's final `result`, never from the agent's account of what it did.

| Limb | Comparator | Met when | Evidence | Verdict |
|---|---|---|---|---|
| (a) the overview's product name matches the scaffold | `product/overview.yaml` L3 in the run repo, quoted. At the prompt commit, the fixture's L3 reads `name: "Order Status"`. It is the line `init` filled from `--name "Order Status"` (template L3 `name: "__PRODUCT_NAME__"`, `src/cli/templates/product/overview.yaml` @ `cdb8296fa`) | the `get_product_overview` `tool_result` contains the quoted name, **and** the answer states it | step 8: `overview.yaml L3: …`; `bar (a) "<name>": in the get_product_overview result: <n>; in the answer: <n>`; the result excerpt above | PENDING |
| (b) `find_screens` returns `example-home` | `product/experience-map/pages/example-home.yaml` L3 `name: example-home`, the scaffold's screen (in-repo bar: `src/cli/__tests__/productScaffold.test.ts` L210) | the `find_screens` `tool_result` contains `example-home`, **and** the answer names it | step 8: `bar (b) example-home: in the find_screens result: <n>; in the answer: <n>`; the result excerpt above | PENDING |

- **Seat condition on both limbs**: the session ran as consumer-Leonardo (§ `seat:`). If the tool lists differ, both limbs are recorded as `not met — seat not established`, whatever the counts.
- **Limb-specific rules, fixed now**:
  - **A limb whose tool was never called is `not met`.** That holds even if the answer is right from reading the files, or from another tool such as `list_experience_map`. A7's bar is the query, made by the seat, and not a reading of the fixture.
  - A call whose result has `is_error: true` is `not met`, and the error is quoted.
  - A filtered `find_screens` call (for example `{"context": …}`) that returns `example-home` meets (b). One that returns no screen does not, and its input is quoted.
- **Criterion verdict** (both limbs met, and the excerpt above shows both calls and both answers): PENDING.

### discovery:
Req 25.5's per-question record. The prompt puts two questions, and each one is answered through one Product MCP tool.

| Question (from the frozen prompt) | Tool and input | Result | Record |
|---|---|---|---|
| 1. What product is this repo for (name exactly as recorded; register)? | PENDING | PENDING | PENDING (`succeeded` / `failed — <why>`) |
| 2. How many screens are already specified, and which (name as recorded; status)? | PENDING | PENDING | PENDING |
| any other discovery call the session made (`find_docs`, `get_section` and the like) | PENDING, or `none` | | |

### findings:
PENDING. Each finding is attributed to an axis (`agent-harness fluency`, `toolchain mechanics`, `design vocabulary`, `outside the axes`) and routed as a proposal. **Every finding whose subject is consumer-Leonardo is tagged `subject: leonardo`**; in this run, that is every finding about the session's behaviour. **The forced negative**: if there are none, this field reads `findings: none`, written, never implied.

### what this record cannot establish:
- **Release 4's tarball.** The candidate is the `4c875235a` preview. The equivalence in § `consumer-repo:` is source-level: unchanged paths, and the same lock. It is not a byte comparison of the two `dist/mcp/product-mcp.js` bundles.
- **Unprompted routing.** The prompt names the server. That is A7's bar (the seat makes the query), but it means this run does not show that consumer-Leonardo reaches for the Product MCP when nobody mentions it. Run 3 (Kiro, unprompted) made both calls, but its results cannot be read (R3-7). Unprompted routing on Claude Code stays unobserved.
- **More than one sample.** n=1: one session, one repo, one harness, one model. A pass shows the seat **can** answer both from the tools. It does not show it **reliably** does.
- **Cold behaviour.** The setup open trusts the folder and enables the servers before the session, so nothing here speaks to first-MCP-load.
- **Operator independence.** The operator is consumer-Leonardo's system counterpart, judging his own seat (run discipline C2). The bar is mechanical — string presence in `tool_result` blocks, fixed before the run — which narrows the judgment. Stacy's CLOSEOUT cross-reads the `subject: leonardo` findings.
