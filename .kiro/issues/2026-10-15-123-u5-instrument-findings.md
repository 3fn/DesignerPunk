# Spec 123 U5 instrument runs — every finding, with owner, PR vehicle and trigger (walked at release-4 prep)

**Date**: 2026-10-15
**Status**: ACTIVE
**Owner**: **this record — Thurgood** (keeps it and walks it). **Each row — its named owner.**
**Trigger**: **release-4 prep (16.0.0), before RELEASE phase 1.** At that walk, **every row without a merged fix is waived in writing (one line in the row's Disposition cell, with who waived it and why) or blocks RELEASE phase 1** (Peter's ruling (4)(a), 2026-10-15, ruled in the U5 session; recorded in `.kiro/specs/123-consumer-distribution/completion/task-28-completion.md`). Rows whose home is another active record keep that record's trigger for the fix; the release-4 walk still writes their waiver line.
**Source**: the U5 instrument runs — persona trio (Task 25), cross-target joins (Task 26), conformance two-beat (Task 27) — and the open rows of `.kiro/issues/2026-10-12-consumer-birth-friction-for-123-u3.md`. Peter's ruling (4), 2026-10-15: findings **sorted, not piled** — CLI behaviour to Lina in one `fix/` PR with tests; install-doc text to Thurgood's one doc PR; rendering/profile to Thurgood (consumer profile) and Lina (generator), each in its own PR.
**Grant paths**: none here. Each vehicle PR declares its own (an install-doc PR touches `governance/DesignerPunk-Integration-Guide.md`, so it carries a `**Consulted**:` line and is Peter-merged).
**Consulted**: none needed — the routes are the records' proposed routes, sorted by Peter's ruling (4).

**Record paths** (all under `.kiro/specs/123-consumer-distribution/validation/`): R1-* `trio-1-backend.md` · R2-* `trio-2-designer.md` · R3-* `trio-3-pm.md` · J-* `join-cc-to-kiro.md` · K-* `join-kiro-to-cc.md` · C-* `conformance-beat-1.md` · PQ-* `product-query.md` · P-* `probe-rerun.md` · BD-* = the `D-*` rows of `conformance-beat-2.md` (renamed here to avoid colliding with the U1b check's D-1–D-23) · FR-n = row n of the friction record.

**Vehicles**: **V-DOC** = Thurgood's install-doc `fix/` PR (Integration Guide install region → `docs/consumer/INSTALL.md` by `scripts/derive-install-doc.ts`; plus the root `README.md`), **before the release-4 tag** (Peter, 2026-10-15). **V-CLI** = Lina's one CLI `fix/` PR with tests. **V-PROF** = Thurgood's consumer-profile PR. **V-GEN** = Lina's generator/adapter PR. **V-OWN** = the owner's own PR.

---

## 1. Install-doc text → Thurgood, V-DOC (before the release-4 tag)

| ID | Finding | Owner | Vehicle | Disposition at release-4 prep |
|---|---|---|---|---|
| R3-1 (doc) | INSTALL § 3 says `init` "stops with an error" where nothing can answer; it hangs in an agent's shell (the code half is § 2) | Thurgood | V-DOC | |
| R2-1 | No path for a page with no build step in § Web (one exists in the shipped `governance/browser-distribution-guide.md`) | Thurgood | V-DOC | |
| R2-3 | A no-build page cannot load the module bundle from `file://`; it needs a local server | Thurgood | V-DOC | |
| R2-6 / R3-9 | "Restart your agent session" is not concrete per harness (26.5 fixed *what each harness asks*, not *how to restart*) | Thurgood | V-DOC | |
| R3-4 (doc) | Nothing a founder meets first points to INSTALL (CLI half in § 2) | Thurgood | V-DOC | |
| R3-8 | "MCP server" and "harness" are used and never defined | Thurgood | V-DOC | |
| R1-4 | "token", "primitive", "semantic" are used and never defined | Thurgood | V-DOC | |
| R1-5 (doc) | "Product" vs "design system" blur at birth (`--name` asks for a product name) | Thurgood | V-DOC | |
| R1-1 / R1-2 (doc) | The TypeScript-host repairs `init` makes necessary: `@3fn/core/types` under the host's `moduleResolution`; default output `./dist/tokens` inside the host's gitignored build output | Thurgood | V-DOC | |
| R1-6 (doc) | INSTALL § 4 says the tokens are "yours wholesale"; the palette, override maps, motion, layering and DTCG export are read from the package (Ada's sentence; pipeline fix: `.kiro/issues/2026-10-15-123-palette-read-from-package.md`) | Thurgood | V-DOC | |
| J-4 / K-2 | § 7 does not tell a cross-harness joiner to commit what `attach` wrote (`.kiro/` or `.claude/`, `.mcp.json`, `CLAUDE.md`, the manifest change) | Thurgood | V-DOC | |
| K-6 | § 7 does not say why a joiner runs `generate` when the output is committed | Thurgood | V-DOC | |
| J-3 / K-5 (doc) | `.claude/settings.local.json` (per-clone server enablement) is ignored by nothing DesignerPunk writes (code half in § 2) | Thurgood | V-DOC | |
| J-5 | The guide is found through the README, not by name (low) | Thurgood | V-DOC | |
| 26.5-add | The root `README.md` Getting Started list still carries the harness-agnostic approval sentence | Thurgood | V-DOC | |
| FR-9 | Start sessions from a normal terminal, not a shell inside a running Claude session or the desktop app's pane; name the native installer over `npm i -g` | Thurgood | V-DOC | |
| FR-11 | What `init` creates vs the layout the guide shows (`product/domain-objects/` shown, not created) | Thurgood | V-DOC | |
| FR-7 / FR-12 | One guide line on the order: `init` wires `TOKEN_INDEX_DIR`, `generate` populates it (not observed in the four join/trio runs; the message is catalogued) | Thurgood | V-DOC | |

## 2. CLI behaviour → Lina, V-CLI (one `fix/` PR with tests)

**Ruled into V-CLI** (Peter (4)): R3-1 first.

| ID | Finding | Owner | Vehicle | Disposition at release-4 prep |
|---|---|---|---|---|
| R3-1 | `init` prompts on stdin with no terminal check (`src/cli/init.ts` L188–193, `prompt()` L463–468) and hangs in an agent's shell; the re-scaffold confirmation in the same file does check | Lina | V-CLI (first) | |
| R3-2 | `init` ignores `--name=value` (parses only `--name <value>`, `init.ts` L436); the `=` form is dropped silently | Lina | V-CLI | |
| R2-5 / R3-11 / K-3 | The `.gitignore` `init` creates (or its managed block) does not ignore `node_modules/` | Lina | V-CLI | |
| 26.5-add | `init`'s refusal message still carries the harness-agnostic approval sentence (`src/cli/shared/errorCatalog.ts` L99) | Lina | V-CLI | |
| R3-3 | The DD9 notice offers `attach --target=kiro`, which presumes a born repo, when it fires before `init` fails for want of a name | Lina | V-CLI or later (Lina's call) | |
| R3-4 (CLI) | `--help` points to "the DesignerPunk repo's designerpunk.config.ts"; neither `--help` nor `init`'s output names INSTALL | Lina | V-CLI or later | |
| R2-4 | `init` scaffolds `jest.config.js`, `tsconfig.test.json` and a TypeScript config into a static HTML site | Lina | V-CLI or later | |
| R1-1 / R1-2 (code) | `init` breaks a TypeScript host's build (`@3fn/core/types` resolution); default output dir sits in `dist/` | Lina | V-CLI or later | |
| J-3 / K-5 (code) | The managed `.gitignore` block could carry `.claude/settings.local.json` | Lina | V-CLI or later | |
| R1-5 (code) | `init`'s prompt says "product name" where the persona births a company-wide system | Lina | V-CLI or later | |
| FR-2 | The abbreviation has no default (initials of the name, or a one-line reason in the prompt) | Lina | V-CLI or later | |

## 3. Rendering and the consumer profile → Thurgood (V-PROF) and Lina (V-GEN), own PRs

| ID | Finding | Owner | Vehicle | Disposition at release-4 prep |
|---|---|---|---|---|
| R3-5 | Consumer-Leonardo's rendered write scope is `specs/**` only, so his screen specs land where `find_screens` cannot read them (`subject: leonardo`) | Thurgood | V-PROF | |
| R2-2 | Consumer-Sparky's charter, and the browser guide, point a no-build site at DesignerPunk's base `tokens.css`, not the founder's generated `DesignTokens.web.css` | Thurgood (charter); Lina (`governance/browser-distribution-guide.md`) | V-PROF; V-OWN (Lina) | |
| R2-8 / R3-12 | kiro-cli 2.12.1 tags every server reached through the generated workspace agents `[legacy]` (`includeMcpJson: true`); meaning unverified | Lina | V-GEN | |
| C-3 / BD-2 (S1) | Served `process-spec-planning` binds the Instruments block to a parser the package's own `agent-directory.dispositions.yaml` removes for consumers | Thurgood | V-PROF (or the served-doc edit, kind per `.kiro/issues/2026-10-15-123-governance-edit-kinds-ballot.md`) | |
| C-6 | Served routed-format sections carry DesignerPunk-only paths and tools (`.kiro/specs/…`, `complete-task.sh`, Kiro `taskStatus`, ballots) | Thurgood | home: `.kiro/issues/2026-10-13-src-path-convention-for-served-governance-docs.md` (its trigger); V-PROF for the consumer cue | |
| C-4 | Consumer-Stacy's owed-set query hard-codes `docs/claims-pass-adoption.md`, which no born repo has | Stacy (overlay); Thurgood (profile) | home: `.kiro/issues/2026-10-03-consumer-stacy-owed-set-needs-adoption-record.md` (its trigger) | |

## 4. MCP servers and components

| ID | Finding | Owner | Vehicle | Disposition at release-4 prep |
|---|---|---|---|---|
| C-2 | `get_section` returns only the heading and the opening of a fenced template; the template's own `##` headings are indexed as siblings | Thurgood | home: `.kiro/issues/2026-10-13-discovery-study-stage1-followups.md` row 13 + `.kiro/issues/2026-10-12-docs-mcp-does-not-index-h4.md` (their trigger: the next indexer change) | |
| R1-3 / R2-7 / K-4 | The docs MCP writes `mcp-server/logs/` into the consumer's repo root (four runs) | Thurgood (filing); fix owner named at its trigger | home: `.kiro/issues/2026-10-02-docs-mcp-logs-dir-cwd-relative.md` — **now with consumer evidence**, which strengthens its case | |
| R1-7 | `get_token_consumers` returns `[]` in a born consumer for tokens the shipped Button-CTA reads; cause unverified (perhaps friction row 8's class) | Lina | V-OWN | |
| R1-8 | `find_components` ranks an internal-only scaffold first for "status indicator", and 11 of 15 rows are `strong` | Lina | V-OWN (the discovery study's find_components arm) | |
| FR-13 | `.mcp.json` sets `COMPONENTS_DIR` to `./src/components`; observed as configured in both joins, effect not exercised | Lina | V-OWN (decide defect vs intended) | |
| FR-14 | Application MCP token tools are dead for the session after born-then-generate (`tokenIndexDir` resolved once at startup) | Lina | V-OWN | |
| C-1 | `Button-CTA` declares `state_loading` (active, required); its web implementation has no loading / `aria-busy` handling | Lina | V-OWN | |
| R1-9 | `Badge-Label-Base` has no status tone, variant or styling hook (low; component gap) | Lina | V-OWN (or the component-gaps record) | |
| R1-14 / J-6 | `npm install` reports 37 vulnerabilities; attribution `cannot-tell` | Ada | `.kiro/issues/2026-10-15-123-cannot-tell-cells.md` row 5 | |
| R1-6 (pipeline) | `generate` reads palette, override maps, motion, layering, DTCG from the package | Ada | `.kiro/issues/2026-10-15-123-palette-read-from-package.md` | **Waived for 16.0.0 by Peter's ruling (1), 2026-10-15**: ship with the known-limitation paragraph |

## 4b. Instrument findings still open (the protocol) → Leonardo

| ID | Finding | Owner | Vehicle | Disposition at release-4 prep |
|---|---|---|---|---|
| PQ-1 | **Claude Code 2.1.301's default `permissionMode` is `"auto"`.** § 16 passed no `--permission-mode`, relying on the old default to surface a write as a permission denial. No write was attempted, so 28.3's bar is unaffected, but the run cannot tell what admitted the two MCP calls: the committed pre-approvals in `.claude/settings.json`, `--allowedTools`, or auto mode's classifier. **Consumers get the same default**, so whether it changes what INSTALL's "pre-approved … apply without asking" buys a user is **unobserved**. **It also reaches 28.1**: `validation/probe-rerun.md`'s blocks pass no `--permission-mode` either, so its comparison with the n=1's three denied `Bash` calls (CLI 2.1.278) has to read each session's init `permissionMode` before attributing any difference in denials to the product | Leonardo (protocol: an explicit `--permission-mode` in future headless blocks); Thurgood (INSTALL's "pre-approved" sentence, if a later run observes a difference — V-DOC) | V-OWN (protocol) | |
| PQ-2 | **The CLI auto-updated mid-run**, 2.1.300 → 2.1.301 between the host-facts step and the session. The version is to be read from the session's init event, not `host.txt`; every earlier record that took it from `host.txt` can be stale the same way | Leonardo | V-OWN (protocol) | |

## 4c. The reference-corpus probe re-run (Task 28.1)

| ID | Finding | Owner | Vehicle | Disposition at release-4 prep |
|---|---|---|---|---|
| P-1 | **Audience banners do not reach a reference-mode agent through the docs MCP's summary-first path**: `get_document_summary` and `get_section` omit a doc's preamble, where every banner sits; only `get_document_full` returns it. Both probe sessions fetched bannered docs that way and met no banner, so Req 20.8's "reference-mode framing rides the banner language" is not delivered on the MCP path | Thurgood (banner convention, docs MCP); the code fix is in `mcp-server/src/**`, outside his write scope — fixing owner named at the trigger | V-OWN (a docs-MCP change: e.g. the banner in the summary payload) | |
| P-2 | **INSTALL § 2's reference bullets ("For the agent reading this corpus") reached neither probe agent**: nothing on the reference path (`attach --reference`'s output, the manifest, the MCP) points to them | Thurgood | V-DOC can only move text; the delivery fix rides P-1's vehicle or `attach --reference`'s next-steps (Lina) | |
| P-3 | **`governance/Token-Family-Opacity.md` reads `Last Reviewed: 2026-03-06`** though its § Disabled States was rewritten on 2026-09-18 (#170); INSTALL's "defer to the more recently reviewed one" would weigh it wrongly | Thurgood (metadata); Ada (content review) | V-OWN (a CONTENT CORRECTION per `.kiro/issues/2026-10-15-123-governance-edit-kinds-ballot.md`) | |
| P-4 | **`SectionNotFound` suggestions cannot reach an H4**, so INSTALL's "retry using the `suggestions` field" fails where the probe needed it | Thurgood | home: `.kiro/issues/2026-10-12-docs-mcp-does-not-index-h4.md` (its trigger) | |
| P-5 | **Instrument: the probe's two sessions ran in different permission modes** (A `auto`, B `default`) on 2.1.301; `--allowedTools` did not bound A | Leonardo (protocol) | with PQ-1 (§ 4b) | |
| P-6 | **Comparator erratum**: the n=1 record's "no such heading exists" (the heading is an H4 at 14.1.0) and "unsourced addition" (the phrase is verbatim at 14.1.0 Component-Templates L774) were wrong | Thurgood | an erratum line on `.kiro/specs/123-consumer-distribution/probes/reference-corpus-probe-record.md` | **Done in U5** (erratum appended 2026-10-15, Task 28.1) |

## 5. Closed, or no DesignerPunk route (recorded so the count is whole)

| ID | Finding | Disposition |
|---|---|---|
| R1-12, K-1 | Committed / attached `.claude/settings.json` allow-list ignored until trust; enablement asked separately | **Closed by Task 26.5** (the observed approval line, `governance/DesignerPunk-Integration-Guide.md` +4/−4). **Re-confirmed on 2.1.301 by 28.3** (`product-query.md` § `findings:` observation 1): trust lands in the run store, the server enablement in the repo's `.claude/settings.local.json` — what INSTALL L69 says |
| R1-10, R1-11, R1-13, R2-9, R2-10, R3-10, J-1, J-2, K-7 | Instrument findings (writes outside the folder; `--max-turns` not enforced; fresh-`HOME` unsafe → `CLAUDE_CONFIG_DIR`; capture overwrite; `KIRO_HOME`; `operator-unblock`; zsh `:t` modifier; after-step defects; built-in tool named first) | **Closed in `tests/onboarding-trio/protocol.md`** (revised through Tasks 25–27, Leonardo) |
| R3-7 | kiro-cli transcripts show tool calls, not results | Instrument limit; **28.3's bar** is met by its own Claude Code run; the Kiro cells exit in `.kiro/issues/2026-10-15-123-cannot-tell-cells.md` |
| R3-6, BD-1 (S2) | Consumer-Leonardo skipped three charter steps; a consumer outline's heading-token premise was false (`typography.h1`–`h6` are emitted) — `subject: leonardo` | **No DesignerPunk defect** (the CSS is correct); Stacy's CLOSEOUT cross-reads the `subject: leonardo` tags (`tasks.md` L1490) |
| C-5, C-7, BD-3, BD-4 | Fixture `file:` dependency; beat-1 process deviations in the consumer story; beat 2 uncommitted; three claims not reached | **No DesignerPunk route** (instrument notes / correct behaviour) |
| FR-1 | Build left `docs/tokens.css` modified (a `Generated:` timestamp) | **Closed by #339** (`c2629954f`, no wall-clock stamps; the header now reads `Generated by: @3fn/core <version>`) |
| FR-4 | The guide's MCP step does not match what is written | **Not observed** in either join (`friction-rows:`); closed |
| FR-5 | `init`'s next steps start at `npm install` | **Fixed in U3**; trio-3 observed "generate as the first next step"; closed |

## 6. Carried design obligations with no other home (from the Task 28 C4 enumeration)

Not instrument findings; placed here so each has an owner and a walked trigger rather than a closed spec's prose.

| ID | Obligation | Owner | Vehicle / trigger | Disposition at release-4 prep |
|---|---|---|---|---|
| DO-1 | **Native name-contract resolution** (design § "What resisted design-grain specification" item 5; DD10's residual: "web only; native surfaces are unchecked until Kenya and Data specify resolution") | Kenya, Data | Spec 129's kickoff (`.kiro/issues/2026-10-03-native-generator-findings-for-spec-129-intake.md`) or the first release that supports native onboarding, whichever first | Not a release-4 item (native onboarding is unsupported in 16.0.0): waive in writing |
| DO-2 | **Req 11.6.5's C(c1) row, superseded-in-execution** (tasks.md "Carried obligations — placed": "Next requirements touch") | Thurgood | No further requirements touch is planned in Spec 123. Proposed disposition: closed by declaration — the tasks amendment of 2026-09-27 (item 4) is the operative text, and `requirements.md` is not edited at closeout. **For Peter**: rule this, or name a touch | |

## Raw evidence location (appended by the orchestrator, 2026-10-15, Peter's ruling)

The raw run evidence behind every U5 record (`validation/trio-*.md`, `join-*.md`, `conformance-beat-*.md`, `product-query.md`, `probe-rerun.md`) — stream-json transcripts, deliverables, interactive captures, before/after state files, plus the conformance clone's tracked tree, git bundle and beat-2 uncommitted files — is kept OUTSIDE the repository at **`~/Documents/Work Projects/Kiro/u5-pack/dp-trio-runs-2026-10-15/`** (one folder per run; README inside; 11 MB; copied from `/tmp/dp-trio/<run>/out/` and verified file-for-file before `/tmp/dp-trio` was removed). It is never committed: six preflight captures contain Claude Code browser sign-in material. A single local copy on Peter's machine, with no provenance check beyond the file counts recorded in the orchestrator's session — read it when a row above is contested or when the first release-4 trio run writes its per-finding disposition lines.

## 7. CLOSEOUT carry (Stacy's pass at #362/#363's merge; appended by the orchestrator 2026-10-15 as the routing record — an orchestration write, declared in the PR body)

Source: `.kiro/specs/123-consumer-distribution/completion/claims-pass.md` § Findings. Each row: a merged fix (PR) **or** a written waiver before RELEASE 16.0.0 phase 1, as the walk below says.

| ID | Severity | Finding (short) | Owner | Vehicle | Disposition |
|---|---|---|---|---|---|
| CL-1 | Low | `npm run audit:coverage-map` reads FAIL on `main`: the probe-input `package.json` committed at `53a551e3c` has a `test` script; #361's exclusion is keyed on `fixtures/` names; the file's bytes are sha1-pinned, so the fix is the audit's exclusion (class) or an adjudication, not an edit | Thurgood (audit class / adjudication); orchestrator (run the audit whenever a unit commits a foreign repo's tree) | Thurgood's next fix PR, or an adjudication line here | open |
| CL-2 | Low | Two `**Instruments**:` header lines do not match their blocks (Task 28: MISSING counted by original state, misfits outside U; Task 26: N 29 vs 30 rows). Repeats MIDPOINT MP-3 | Thurgood | dated errata in both completion docs (records PR) | open |
| CL-3 | Low | 26.5 edited `docs/consumer/INSTALL.md` and `scripts/__tests__/install-doc.test.ts`, outside Task 26's Primary Artifacts and the executor's charter (declared; the test change tightens). Repeats MP-6 | Thurgood | acknowledgement line in the same records PR | open |
| CL-4 | Low | Task 26's `**Delegated-tier**:` line says `class: model-evolution` while its reason says the tier did not change on a demand re-estimate | Thurgood | erratum in the same records PR | open |
| CL-5 | Low | the docs-MCP `rebuild_index` owed after U5 had no committed record (RL-5's class) | orchestrator | **DONE — this row is the record**: `rebuild_index` run 2026-10-15T23:27:05Z against the main checkout at `bd880973e` (after `git pull --ff-only`): healthy, 83 documents, 2517 sections, 333 cross-references, 2113762 bytes, 0 errors / 0 warnings. Note for Thurgood's walk: the 2026-10-13 rebuild read 2849 sections with the same 83 documents; the drop is unexplained (parser or content) | closed |
| CL-6 | Low | Task 28's C4 table item 13 quotes a forced negative ("not obtained") that `task-5-1-completion.md` L7 contradicts ("OBTAINED"); the closed status holds | Thurgood | dated erratum in `task-28-completion.md` (records PR) | open |
| OB-1 | — (not a finding; fork left open) | Thurgood's 28.2 seat exported `GITHUB_TOKEN` from `.env` as `GH_TOKEN` for one `git ls-remote` (never printed; disclosed in his handback; no claim depends on it). Which seats may read credentials has no home (RS-24) | Thurgood (standards) / Peter (the fork: Low finding on 28.4's adaptations, or not) | Thurgood's standards read of RS-19–RS-24 | open |

## Walk (release-4 prep)

For each row in §§ 1–4, 4b, 4c, 6 and 7: a merged fix (PR number) **or** a written waiver (who, why). **Any row with neither blocks RELEASE phase 1.** After 16.0.0 ships, rows still open move to their owners' records or the next release's walk, and this file archives with the release's record.
