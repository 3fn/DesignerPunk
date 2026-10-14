# Task 28 — Instruments block

**Written**: 2026-10-14 (UTC; 2026-10-13 local), before subtask 28.1 (unit head `4c875235a`; `task/123-u5-closeout`) · **PRIMARY**: Thurgood (Opus)

**Binding**: the instrument-existence ballot (`.kiro/docs/ballots/2026-09-28-parent-instrument-existence-check.md`) is RATIFIED (Peter, 2026-09-29). Spec 123 stays on M1's execution-time form (guide § "The instruments line and block": "Specs planned before `P`, Spec 123 included, keep the full block above"). No subtask of Task 28 has started.
**Sha convention**: each `exists` row names the commit that last touched `<path>` as of `4c875235a`. Each was checked with `git cat-file -e <sha>:<path>` and `git merge-base --is-ancestor <sha> 4c875235a`; every one passed (run 2026-10-14, every path cited below). For a command, `<path>` is its defining file or the record that prescribes it.
**Criteria order**: the parity parser (`parseTasksMd` + `normalizedCriteria`, `scripts/completion-claims/tasks-md.ts` @ `9b6d269f4`), run at `4c875235a`, reads **9** criterion rows for Task 28 and 0 malformations in the file: **C1** probe re-run + 26.7 scoping · **C2** tarball assertion, differences attributed · **C3** product query, seat and bar · **C4** open obligations enumerated from the three named sources, reproduced in the completion doc · **C5** exit: the 23.7 trio · **C6** exit: the 23.9 cold-human run · **C7** exit: the 125-B U3 re-attestation · **C8** exit: any `cannot-tell` / not-observed-cold cells · **C9** tripwire line, release-4 CHANGELOG entry, `npm test` + full `tsc` green.
**Source**: Thurgood's sweep of 2026-10-14 at `4c875235a`, every fact by command unless the row says "read". The orchestrator's preview pack (1673 / 6476258 / 23470696, shasum `aa3efdcf…`) is not cited as a measurement; rows name the measuring command.

| # | Criterion (short ref) | Instrument | State | Fit (one line, `exists` rows) | Dependent subtasks |
|---|---|---|---|---|---|
| 1.1 | C1 the n=1 comparator | the probe record | exists (`.kiro/specs/123-consumer-distribution/probes/reference-corpus-probe-record.md` @ `a062f44b3`) | Setup facts, the attempt-3 command line (L26 form), tool-call counts, three spot-checks, and § "What the no-init path failed to provide" (the four gaps the re-run is read against) | 28.1 |
| 1.2 | C1 the same task and the same foreign repo | the n=1's task prompt, verbatim, and the "Meridian" scaffold (`tokens.json`, `components/button.css`, `README.md`) | MISSING → Peter (recovery) / orchestrator (route): neither was committed. The record's command line carries the placeholder `"<TASK>"`, and the scaffold is described in prose only (L13). `find` over `/private/tmp` and `~/Documents` (depth 7) and `mdfind` for the deliverable `meridian-disabled-states.md` returned nothing. The attempt-3 `transcript.jsonl` (its first user event carries the prompt) lived in the 2026-09-20 coordinator's scratch dir (O-1) | 28.1 (freeze step and run) |
| 1.3 | C1 the frozen re-run prompt and committed fixture | prompt and fixture text in a `## Frozen inputs` section of `validation/probe-rerun.md`, committed before the run and reproduced verbatim | built here (28.1) | — | 28.1 |
| 1.4 | C1 "release-4 artifacts" (and C2's shipping-method measure) | `npx tsx scripts/release-publish.ts --dry-run <U5 head> --keep` | exists (`scripts/release-publish.ts` @ `762b8c209`) | L14–15: "everything except the publish, in a fresh clone at commit S"; `--source` (L21) clones from a given path when the head is not on `origin`. It builds the tarball the way the tag will (O-2) | 28.1, 28.2 |
| 1.5 | C1 the entry path the re-run takes | INSTALL § 2 "CONSUME — the reference corpus, no init"; the `attach --reference` code | exists (`docs/consumer/INSTALL.md` @ `cdb8296fa`; `src/cli/attach.ts` @ `cdb8296fa`) | L36–48: three steps (`npm install`, `attach --target=<cc\|kiro> --reference`, restart) and the reference-mode guidance bullets that answer the n=1's gaps ("Reference use is a sanctioned mode"; "Quoted text and dates are claims requiring re-verification"). The n=1 used a hand-written `--mcp-config` instead (O-3) | 28.1 |
| 1.6 | C1 the session launch | a headless `claude -p` session (`--mcp-config` or project config, `--allowedTools`, `--max-turns`, `--output-format stream-json --verbose`), launched outside this seat | MISSING → Peter: the launch act, from macOS Terminal, or a recorded permission rule letting the orchestrator launch. This harness's classifier denied a launch ("Create Unsafe Agents", orchestrator, 2026-10-13); this seat does not attempt one. The record carries `session-launched-by:` | 28.1 (run) |
| 1.7 | C1 the record | `.kiro/specs/123-consumer-distribution/validation/probe-rerun.md`: setup facts, transcript excerpts, MCP calls by name, spot-checks against the served docs, findings with the forced negative, per-question discovery-succeeded/failed, the scoped Evidence sentence | built here (28.1) | — | 28.1 |
| 1.8 | C1 what every probe record owes | Req 25.5 | exists (`.kiro/specs/123-consumer-distribution/requirements.md` @ `669b51b09`) | L854: forced negative written, never implied, "a run that files NO list is still owed it", plus "a per-question discovery-succeeded/failed record" | 28.1 |
| 1.9 | C1 26.7's scoping sentence and the pass/finding rule | Req 26.7; Stacy's R2 answer | exists (`.kiro/specs/123-consumer-distribution/requirements.md` @ `669b51b09`; `.kiro/specs/123-consumer-distribution/feedback/requirements.md` @ `aabb59fd4`) | L881: "ONE data point, AND IT MEASURED A PRE-CHANGE ARTIFACT … n=1, one corpus, one task, one harness"; feedback L345: a claim "scoped to what was measured" is a pass, an unscoped one a promised-vs-shipped finding. **Partial fit**: L881 is a paragraph, not one sentence (O-4) | 28.1, 28.4 |
| 1.10 | C1 what the re-run is the only evidence for | Req 25.7 / 20.8 | exists (`.kiro/specs/123-consumer-distribution/requirements.md` @ `669b51b09`) | L856: the re-run "is the only evidence Requirement 20.8's 'reference-mode framing rides the banner language' will ever have". The record states whether the agent met a banner and what it did with it | 28.1 |
| 2.1 | C2 the target and the lever | `tarball-target.json` | exists (`tarball-target.json` @ `d566b30ff`) | `target` 1597 / 5863534 / 21308710; `lever` "entryCount and unpackedSize (npm pack --dry-run --json, --ignore-scripts, against a fresh npm run build)". `measuredAt.commit` `82051e7bc` predates the `files[]` narrowing, so the target's listing is not reproducible from that sha (row 2.5) | 28.2 |
| 2.2 | C2 the target-method measurement | `npm run build && npx tsx scripts/pack-assert.ts` (dry-run mode) | exists (`scripts/pack-assert.ts` @ `cdb8296fa`) | L304 prints `Tarball (dry run, --ignore-scripts): entryCount=… size=… unpackedSize=…`, the same lever and method as the target. A working-checkout pack, not what ships (O-2) | 28.2 |
| 2.3 | C2 the shipping-method measurement | row 1.4's fresh-clone dry run, `npm pack --json` over its tarball | exists (`scripts/release-publish.ts` @ `762b8c209`) | Same instrument as row 1.4; read here for entryCount / size / unpackedSize of the tarball the tag would build | 28.2 |
| 2.4 | C2 the assertion per lever | a `jq` read of the target and both measurements, per lever: value, delta, direction | built here (28.2) | — | 28.2 |
| 2.5 | C2 a baseline listing to attribute against | the target's per-path listing, never committed: reconstructed by packing the commit that last wrote `tarball-target.json` on U1's branch (`git fetch origin refs/pull/215/head`; retention unverified); fallback, the U1 squash `d566b30ff`, with target→`d566b30ff` movement read from row 2.7 | built here (28.2) | — | 28.2 (O-13) |
| 2.6 | C2 differences attributed | `comm` over the sorted baseline and release-4 path lists, each added or removed path tied to its PR by `git log --first-parent --format='%h %s' <base>..<head> -- <path>` (`dist/**` by its source root) | built here (28.2) | — | 28.2 |
| 2.7 | C2 movement already recorded inside U1 | Task 3.6, 3 and 7.4 completion docs | exists (`.kiro/specs/123-consumer-distribution/completion/task-3-6-completion.md` @ `d566b30ff`; `…/task-3-completion.md` @ `d566b30ff`; `…/task-7-4-completion.md` @ `d566b30ff`) | 3.6 L13: first target 1589; 3 L82: 1597 after the `.gitkeep` correction; 7.4 L60: 1602 / 21561066, already above target inside U1 | 28.2 |
| 3.1 | C3 the two tools | the Product MCP's tool table and dispatch | exists (`product-mcp-server/src/index.ts` @ `d566b30ff`) | L42 `get_product_overview`, L54 `find_screens`; L371, L377 dispatch | 28.3 |
| 3.2 | C3 the seat: consumer-Leonardo routes both | the consumer CC rendering of Leonardo | exists (`canonical/_consumer-output/cc/.claude/agents/leonardo.md` @ `669b51b09`) | L37, L42: both tools in `tools:`; L446, L448: the routes. The run reads the rendering in the consumer repo itself; this is the expected text | 28.3 |
| 3.3 | C3 bar (a): the overview's name matches the scaffold | the `overview.yaml` template | exists (`src/cli/templates/product/overview.yaml` @ `cdb8296fa`) | L3 `name: "__PRODUCT_NAME__"`, which `init` fills. The bar compares the answer's name to the consumer repo's `product/overview.yaml`, quoted from that file | 28.3 |
| 3.4 | C3 bar (b): `find_screens` returns `example-home` | the scaffolded screen and its in-repo test | exists (`src/cli/templates/product/experience-map/pages/example-home.yaml` @ `cdb8296fa`; `src/cli/__tests__/productScaffold.test.ts` @ `cdb8296fa`) | L210: the indexer's screen keys equal `['example-home']`. That is the in-repo bar; the session is the consumer-side bar | 28.3 |
| 3.5 | C3 "the consumer repo" | a repo born by `npx designerpunk init --target=cc` from row 1.4's tarball in a fresh temp dir, under a fresh `HOME`; or Task 26.1's CC-born fixture, stated as such | built here (28.3) | — | 28.3 |
| 3.6 | C3 "a fresh session" | `claude --agent leonardo -p <frozen prompt> --output-format stream-json --verbose`, run in that repo, launched outside this seat | MISSING → Peter: the launch act, as row 1.6 (Leonardo's C3 `session-launched-by`) | 28.3 (run) |
| 3.7 | C3 the transcript excerpt | the frozen prompt (committed before the run), the stream-json transcript, and an excerpt showing both calls and both answers in the record | built here (28.3) | — | 28.3 (O-6 for the prompt's path) |
| 3.8 | C3 Leonardo's operator fields | U5 run discipline | exists (`.kiro/specs/123-consumer-distribution/tasks.md` @ `5ac23b74c`) | L1485–1491: frozen prompts, `operator-log`, `subject: leonardo`, `session-launched-by`, `harness-user-state` as evidence. Written for Tasks 25–27; 28.3 adopts them | 28.3 |
| 4.1 | C4 source 1 | design § "Open design inputs 16–21 — dispositions (final)" | exists (`.kiro/specs/123-consumer-distribution/design.md` @ `5ac23b74c`) | L1110–1119: six rows; 18 reads "trust UNVERIFIED on both targets; OBSERVED IN U5" (open until Tasks 25–26 report) | 28.4 |
| 4.2 | C4 source 2 | design § "What resisted design-grain specification" | exists (same file and sha) | L1121–1132: ten items (numbered 1–7, 9, 10, 8) | 28.4 |
| 4.3 | C4 source 3 | tasks § "Carried obligations — placed" | exists (`.kiro/specs/123-consumer-distribution/tasks.md` @ `5ac23b74c`) | L410–431: 14 obligation rows, each with its placement | 28.4 |
| 4.4 | C4 Req 25.6's enumerable set | the requirements' "Open inputs" table and the six named handoffs | exists (`.kiro/specs/123-consumer-distribution/requirements.md` @ `669b51b09`) | L855: "the Open inputs table plus the named handoffs at 23.7, 23.9, 21.2, 4.5, 6.8 and 11.6"; L890ff: rows 1–21. Not the criterion's design table (O-7) | 28.4 |
| 4.5 | C4 the enumerated list in the completion doc | one table: item, every source it appears in, status, exit (issue path, placement, or "closed by <record>") | built here (28.4) | — | 28.4 |
| 5.1 | C5–C8 the exit-record convention | the issues-dir convention | exists (`.kiro/issues/README.md` @ `2da748642`) | Rule 1: a root file is active and "SHALL carry an owner and a named trigger (an event, never a calendar hope)"; rule 6: the monthly walk. `.kiro/issues/<date>-123-*.md` is a Task 28 Primary Artifact, so the row grant covers the writes | 28.4 |
| 5.2 | C5 the trio exit and the records that point at it | Req 23.7; recipe step 6; RELEASE-FLOW step 6 | exists (`.kiro/specs/123-consumer-distribution/requirements.md` @ `669b51b09`; `governance/release-management-system.md` @ `2a85df7fc`; `.kiro/hooks/RELEASE-FLOW.md` @ `2a85df7fc`) | Req L814: exits "AS A COMMITTED RECORD with an owner and its trigger"; recipe L42 and RELEASE-FLOW L31 both name "Spec 123 Task 28.4" as the tracking record, so the record names them back | 28.4 |
| 5.3 | C5 the record | `.kiro/issues/<date>-123-onboarding-trio-recurring.md` | built here (28.4) | — | 28.4 |
| 6.1 | C6 the trigger, fixed by requirement | Req 23.9 | exists (`.kiro/specs/123-consumer-distribution/requirements.md` @ `669b51b09`) | L816: generic trigger "the first willing stranger"; "No date is invented"; Leonardo's counter recorded | 28.4 |
| 6.2 | C6 the record | `.kiro/issues/<date>-123-cold-human-run.md` | built here (28.4) | — | 28.4 |
| 7.1 | C7 the obligation's text | design C-seat note; tasks placement | exists (`.kiro/specs/123-consumer-distribution/design.md` @ `5ac23b74c`; `.kiro/specs/123-consumer-distribution/tasks.md` @ `5ac23b74c`) | design L598: "one-time re-attestation of interim records when 125-B U3 lands" (trigger: 125-B U3's merge); tasks L415 places it at 28.4 | 28.4 |
| 7.2 | C7 the record | `.kiro/issues/<date>-123-125b-u3-re-attestation.md`, listing the interim records by path | built here (28.4) | — | 28.4 |
| 8.1 | C8 the not-observed-cold cells | Task 26.4's cold-observation table (target × founder-cold / teammate-cold) | MISSING → Leonardo: Task 26.4 (planned, this unit; `validation/join-*.md` do not exist at `4c875235a`) | 28.4 (C8 exits only) |
| 8.2 | C8 the `cannot-tell` cells | Task 25's trio records (`validation/trio-*.md`) and their schema check | MISSING → Leonardo: Tasks 25.2–25.5 (planned, this unit; `validation/` holds only `u1b-backward-check.md`). Which field carries `cannot-tell` is undefined (O-8) | 28.4 (C8 exits only) |
| 8.3 | C8 one record per cell, or one record listing them | `.kiro/issues/<date>-123-*.md` | built here (28.4) | — | 28.4 |
| 9.1 | C9 the tripwire referent and line form | § "Split tripwire" | exists (`.kiro/specs/123-consumer-distribution/tasks.md` @ `5ac23b74c`) | L266: U5 declared **18**, threshold **+3**; L255: `Tripwire: declared <n>, now <m>; parents unchanged\|added; successor branch: none\|<sha>` | 28.4 |
| 9.2 | C9 the count | `grep -cE '^  - \[.\] (25\|26\|27\|28)\.[0-9a-z]+' .kiro/specs/123-consumer-distribution/tasks.md` | exists (`.kiro/specs/123-consumer-distribution/completion/task-22-completion.md` @ `8007105fa`) | L58 is the U3 form. Run at writing: **18**; parents 25–28: 4, unchanged | 28.4 |
| 9.3 | C9 Limb 2 for the last unit | `git ls-remote --heads origin 'task/123-*'` | exists (same file and line as 9.2) | Run 2026-10-14T03:50Z: one head, `task/123-u5-closeout` @ `4c875235a`. U5 has no declared successor, so Limb 2 has no referent (O-12) | 28.4 |
| 9.4 | C9 the PR opener | `complete-task.sh` parent mode, `--unit` | exists (`.kiro/hooks/complete-task.sh` @ `90fb0e71e`) | Builds the body from Spec, Task, Unit, Agent, completion docs and Validation; no Tripwire or Consulted field, so both are added after open (Task 24 block row 3.4) | 28.4 |
| 9.5 | C9 the body that carries the line | `completion/u5-pr-body.md`, applied with `gh pr edit <n> --body-file`; a `gh pr view <n> --json body` check appended to the completion doc | built here (28.4; precedent `.kiro/specs/123-consumer-distribution/completion/u3-pr-body.md` @ `cdb8296fa`) | — | 28.4 |
| 9.6 | C9 the CHANGELOG convention | `CHANGELOG.md`; recipe step 4 | exists (`CHANGELOG.md` @ `e49359e49`; `governance/release-management-system.md` @ `2a85df7fc`) | CHANGELOG L1–5: one plain-language consumer entry per release; L7 opens `[15.1.0]` and **no `## [Unreleased]` block exists**. Recipe L40: the entry "accumulates under `## [Unreleased]` as work merges, and the release PR retitles it" | 28.4 |
| 9.7 | C9 the release-4 entry | `## [Unreleased]` entry built from `git log --first-parent v15.1.0..HEAD`, scoped to `files[]` | built here (28.4) | — | 28.4 (O-10) |
| 9.8 | C9 `npm test` | `jest --config jest.functional.config.js` | exists (`package.json` @ `e49359e49`; `jest.functional.config.js` @ `a57d2fbae`) | `scripts.test` | 28.4 |
| 9.9 | C9 full `tsc` | `npx tsc --noEmit` | exists (`tsconfig.json` @ `041aaea8a`) | the U3 precedent's command (`task-22-completion.md` L50); `package.json` `typecheck` is the same | 28.4 |
| 9.10 | C9 the green, recorded | counts pasted in the completion doc, with where they were measured (CI-provenance) | built here (28.4) | — | 28.4 |

**Counts (at writing, 2026-10-14)**: N = 50: exists 30 · built-here 15 · missing 5 · unlisted 0. No `none` rows: every criterion has an instrument. Rows 1.4 and 2.3 name the same command for two criteria and are counted twice.

**Resolutions of MISSING rows** are appended in-row, in the form `→ resolved <date>: <new state> (<record>)`. The original `MISSING` stays readable.

## What the rows mean for scheduling

- **Can start now** (no MISSING row, no wait on Tasks 25–27):
  - **28.2's method work**: rows 2.5 and 2.6 (rebuild the baseline listing, write the attribution script) and a preview measurement. The measurement of record waits for the release-4 head, because Task 26.5's `governance/` edit and any Task 25–27 change move the tarball.
  - **28.4's drafting**: the enumeration (rows 4.1–4.5), the C5–C7 issue records (5.3, 6.2, 7.2), and the CHANGELOG entry's draft from `v15.1.0..HEAD` (row 9.7). Each is finalized at the release-4 head.
- **Stopped by MISSING rows that route to Peter**:
  - **28.1** waits on row 1.2 (the n=1 prompt and scaffold: recovered, or ruled reconstructable) and row 1.6 (a launch). Its freeze step (row 1.3) waits only on 1.2.
  - **28.3's run** waits on row 3.6. Its consumer repo (3.5) and frozen prompt (3.7) can be prepared before.
  - All three are Peter's acts. One sitting can clear them together with Tasks 25–27's launches.
- **Stopped by MISSING rows that route to Leonardo (planned work in this unit)**: rows 8.1 and 8.2 stop **only the C8 exits in 28.4**. 28.4's C8 records are written after Tasks 25.5 and 26.4 commit.
- **Runs last**: 28.1's run and 28.2's measurement of record use the tarball built at the release-4 head (row 1.4), so they follow Tasks 25–27's content commits. 28.4's validation, tripwire count and PR come after everything else.

## Notes bearing on the rows (not criteria)

These are obligations the completion doc must cite. They sit outside the block, because the block covers success criteria only.
- **N1 — CLOSEOUT at U5's merge** (Stacy): the record goes to `.kiro/specs/123-consumer-distribution/completion/claims-pass.md` (`tasks.md` L144). Its absence after the merge is what makes `closeout-owed(123)` true under the owed-set predicate (`.kiro/docs/ballots/2026-09-19-completion-claims-integrity.md` @ `9bcc114e8`). Stacy's CLOSEOUT also cross-reads the `subject: leonardo` findings and the operator logs (`tasks.md` L1490).
- **N2 — RELEASE (release 4)**, two-phase per ballot 2026-10-03-hermetic-publish-path: phase 1 on S, then phase 2 after the step-6 publish-verification record. Fires at the tag, after U5 merges.
- **N3 — docs-MCP `rebuild_index` is owed after U5's merge.** Task 26.5 edits `governance/DesignerPunk-Integration-Guide.md`, a served doc. `tasks.md` L359 lists U1, U2b, U3 and U4 only, but its stated reason applies to U5 (O-11). As steward I also run `node scripts/validate-steering-metadata.js` after 26.5's edit.
- **N4 — The completion doc's header lines**: `**Delegated-tier**:`, `**CI-provenance**:` and `**Instruments**:` (this block). It also carries an "Additional verification" section for the Primary Artifacts (`validation/probe-rerun.md`, `.kiro/issues/<date>-123-*.md`, `CHANGELOG.md`), plus the completion-criteria-parity paste.
- **N5 — Sub-suites the root suite does not run**: `mcp-server` and `application-mcp-server` jest, `npm run test:consumer` and `npm run test:pack-contents`. The criterion asks only `npm test` + `tsc`. 28.4 runs these as well, or says it did not, because release 4 changes packaging (#352) and served docs (26.5).

## Open items

These were found while writing. **None is resolved here, and `tasks.md` is not edited.**

- **O-1 — The n=1's prompt and scaffold were never committed (row 1.2).**
  - *Ask*: Peter checks whether the 2026-09-20 attempt-3 scratch dir survives (`transcript.jsonl`, `tokens.json`, `components/button.css`, `README.md`).
  - *If not found*: 28.1 reconstructs the prompt and fixture from the record's prose, freezes and commits them (row 1.3), and its Evidence says "comparable to the n=1 by description, not by bytes".
  - *Residual*: a reconstruction makes the re-run a second probe of the same kind, not a re-run of the same probe. A difference between the runs cannot then be put down to the product alone.
- **O-2 — What "release-4 artifacts" means before the merge (rows 1.4, 2.2, 2.3).**
  - The criterion's evidence must exist at the U5 PR, but release 4's tarball is built after the merge, at the tag.
  - *Lean*: measure both:
    - row 2.2, the target's own method, for lever comparability;
    - row 1.4, `release-publish.ts --dry-run` at the U5 head, as what the tag would ship. 28.1 installs this one.

    RELEASE's step-6 record later carries the shipped tarball's numbers.
  - *Residual*: the release PR adds the version bump, the lock and the CHANGELOG retitle, so the tarball 28.1 tests is not byte-identical to 16.0.0. The candidate's version string still reads 15.1.0.
- **O-3 — The entry path for the re-run (row 1.5).**
  - *Lean*: the shipped, documented path (INSTALL § 2, `attach --reference`). "An undocumented entry path" was one of the three pre-change gaps 26.7 names, and the n=1 hand-wired `--mcp-config` instead.
  - *Risk*: whether a headless session honors the project MCP config and the approvals `attach` writes is unverified (design open input 18). A failure there is a finding. Falling back to `--mcp-config` is then recorded in the operator log.
- **O-4 — "26.7's scoping sentence" is a paragraph (row 1.9).**
  - *Lean*: quote verbatim L881's lead ("The reference-corpus mode has ONE data point, AND IT MEASURED A PRE-CHANGE ARTIFACT") and its "n=1, one corpus, one task, one harness" clause. Then add the re-run's own scope in the same form.
  - Under the Q5 boundary's bound 1, this is a defect in my criterion text. I would fix it at the next tasks touch; it is not amended here.
- **O-5 — The three launches (rows 1.6, 3.6) are Peter's acts.** Either Peter launches from macOS Terminal, or he records a permission rule that lets the orchestrator launch. Batching them with Tasks 25–27's launches costs Peter one sitting rather than several.
- **O-6 — Where the frozen prompts live.** Task 28's Primary Artifacts list neither `validation/prompts/` nor a fixture path.
  - *Lean*: 28.1 keeps its prompt and fixture inside `validation/probe-rerun.md`, committed before the run, which stays within the row grant.
  - 28.3's prompt goes either under `validation/prompts/` (Task 25's row grant, held by Leonardo) or inside its own record.
  - The orchestrator rules.
- **O-7 — The enumeration's sources differ between the criterion and Req 25.6 (rows 4.1–4.4).**
  - The criterion names the design's "Open design inputs" table, which covers 16–21. Req 25.6 names the requirements' "Open inputs" table, which covers 1–21, plus six handoffs.
  - *Lean*: use the union, de-duplicated, with each item tagged by every source it appears in.
  - `tasks.md` § "What resisted tasks grain" (7 items) is named by neither source. Include it or not? That is the orchestrator's or Peter's call.
- **O-8 — "`cannot-tell` cells" has no defined field (row 8.2).** In design and tasks, `cannot-tell` appears only as `sync`'s migration verdict (design L932; tasks L575), not as a U5 record cell.
  - *Lean*: read C8 as any Task 25 or 26 record cell whose value is `cannot-tell` or "not observed cold".
  - Leonardo should confirm which C30 field that is before Task 25.5's schema check.
- **O-9 — Req 25.2 (Peter's mechanics run) is traced by Task 28, but no criterion or subtask carries it.** Has the run happened? Peter decides whether the completion doc records it, or records that it was not run.
- **O-10 — Release 4 is a MAJOR, and the plan says minor.**
  - `tasks.md` § "Expected release count" declares release 4 "minor", "U5 carrying U4". In fact:
    - U4 (#329, `2a85df7fc`) is an ancestor of `v15.1.0`, so it shipped in 15.1.0;
    - #352 (Input-Radio-Set, BREAKING) makes release 4 16.0.0;
    - #352 wrote no `## [Unreleased]` entry.
  - 28.4's entry must carry #352 under its own breaking/upgrade heading, in consumer wording Lina should supply.
  - The RELEASE pass will read the plan's "minor" against 16.0.0. Peter ratifies the major at release prep.
- **O-11 — `rebuild_index` is owed after U5, but `tasks.md` L359 does not list U5** (N3). Recorded so that a later reader does not take the list's silence as "not owed".
- **O-12 — Limb 2 for the final unit.**
  - U5 has no declared successor, so Limb 2 has no referent.
  - *Lean*: keep the grammar's `successor branch: none`. Follow the line with one sentence giving row 9.3's `task/123-*` listing; any other 123 head would mean work begun outside the declared units.
  - That reading is Peter's.
- **O-13 — The target's per-path listing was never committed (row 2.5).**
  - Attribution against the target itself needs either `refs/pull/215/head` (GitHub normally retains it; unverified) or the fallback in row 2.5.
  - The fallback attributes the first leg (target → `d566b30ff`) from completion-doc counts, not paths.

## Found later

## Surviving counter-argument to this block

**Rows 1.6 and 3.6 count a human act as a missing instrument**, which makes the header's "missing 5" look more blocked than the unit is. Nothing is absent: Peter can launch either session at any time. I wrote them as MISSING because the guide's alternative states do not fit. `exists` would claim the seat holds a capability it was denied, and `built here` would claim a subtask produces it. A reader may still weigh them differently from rows 1.2, 8.1 and 8.2, where an artifact really does not exist.

Several `exists` rows also carry partial fits that the counts do not show:
- row 1.9: a paragraph, not a sentence;
- row 2.1: the target's measuring commit cannot reproduce its listing;
- row 3.8: run discipline written for Tasks 25–27 and adopted here.
