# Claims Pass — CLOSEOUT: Spec 123 (consumer-distribution)

**Date**: 2026-10-15
**Grain**: CLOSEOUT. It fires at the merge of the spec's final declared merge unit, U5 (`tasks.md` § "Declared Merge Units": U5 carries "RELEASE (release 4) + **CLOSEOUT**"; L144 pins this path).
**Firing event**: PR #362 `U5 validation & closeout (123)`, head `8bae0346fcd1f992841ec320260c3e1469564d75`, merged by Peter 2026-10-15T22:59:32Z as squash `b10d5d3b627763449e72b8dc7fae2d3a7c4edac9` (public API: `merged_at`, `merge_commit_sha`). `git diff --quiet 8bae0346f b10d5d3b6` → equal trees. The post-merge records PR #363 (`bd880973e`) is read as part of the unit's record.
**Read at**: `bd880973e` (= `main`), worktree `chore/123-closeout-claims-pass`, `git status --porcelain` empty before this file.
**Auditor**: Stacy. Authorized by Peter in chat ("run Stacy's CLOSEOUT pass"), relayed by the orchestrator.

> **Filename, load-bearing.** This is `completion/claims-pass.md`, the exact path the owed-set predicate keys on. Its merge discharges `closeout-owed(123)`. The MIDPOINT record is `claims-pass-midpoint.md` and never discharged it.

> **No pass, at any grain, is ever a required check, a review gate, or a blocking condition on any PR.** #362 and #363 merged before this pass ran. This record gates nothing, including release 4's tag.

**Standards implications: list — seven items (RS-19 … RS-24, and RS-13 escalated), § "Standards implications" below.**

---

## Scope

**What CLOSEOUT owes** (charter § "Operational Mode: Claims Audit", CLOSEOUT row): all the spec's parents, promised vs claimed vs shipped, plus the judgment residual the checker cannot reach.

**How the 31 parents are covered across the spec's five pass records** (no parent is unread):

| Parents | Unit · squash | Read by |
|---|---|---|
| 1–9 | U1 · `d566b30f` (#215) | MIDPOINT (`claims-pass-midpoint.md`) |
| 10–12 | U2a · `24c7f060` (#222) | MIDPOINT; plus the fork M-1 scoped read of Task 12 (`u2a-task-12-scoped-read.md`, fired because `G1 runs: 2`) |
| 13–18 | U2b · `669b51b0` (#262) | MIDPOINT; RELEASE 15.0.0 (`claims-pass-release-15.0.0.md`) |
| 19–22, 23–24, 29–30, 31 | U3 #321 · U4 #329 · U3g #313 · U3c #307 | RELEASE 15.1.0 (`claims-pass-release-15.1.0.md`, both phases) |
| **25–28** | **U5 · `b10d5d3b6` (#362) + records #363** | **this pass, fresh** |

**Decision on the brief's expected scope.** The brief listed U3, U3c, U3g and U4 as expected scope. Those nine parents were audited in RELEASE 15.1.0 (91 rows, sample 13 + all 8 ⚠️). I **cite, not re-audit** them, as MIDPOINT and both RELEASE records did for what preceded them. What this pass does for them is walk their findings' state (§ "Prior findings at closeout"). **Residual of that choice**: 70 of their 83 ✅ rows were never re-verified by any pass; CLOSEOUT does not reach them either.

**Fresh population (U5)**: 4 parents, 31 criterion rows (25: 6 · 26: 11 · 27: 5 · 28: 9), 18 subtasks, 9 validation records, 7 obligation records, the U5 diff (501 files; 410 of them the two born-repo fixture trees).

**Spec-level population**: the five-pass cost line; the tripwire line on all eight unit PR bodies; Req 25.5 (forced negatives on every U5 record); Req 25.6 (the enumerable obligation set vs the C4 table and the seven records); the `subject: leonardo` cross-read with the operator logs (`tasks.md` L1489–1490); the deferral walk-back; the parity emissions; the owed-set query.

**Out of scope**: the release-4 CHANGELOG entry and packed artifact against the published bytes (RELEASE 16.0.0's); the signing-act walk (RELEASE's; U5's diff touches no `canonical/**`); J and the Peter sample (no acts in this population).

---

## The owed-set query (run by this pass, verbatim pipeline from my charter, at `bd880973e`, before this file existed)

```
ratification date: 2026-09-19
specs with post-ratification merge activity: 7
OWED SET:
  086-component-meta-extraction-pipeline (b, anchor c9679e48b 2026-10-13)
  121-claude-code-portability (c, anchor e3bc68a6f 2026-10-13)
  122-agent-generator (a, anchor 7fa64c6d8 2026-09-28)
  123-consumer-distribution (a, anchor bd880973e 2026-10-15)
  128-react-react-native-platform-admission (b, anchor 869b29722 2026-10-03)
  129-consumer-generation-completeness (b, anchor e25fd5129 2026-10-03)
EXCLUSIONS: 1 closed; 3(a) / 3(b) / 1(c) per class; K excluded as pre-ratification (no first-parent activity since 2026-09-19)
```

- **123 is truly owed** before this record: final unit U5 merged 2026-10-15 (after 2026-09-19), and `completion/claims-pass.md` did not exist. Stage 2 anchors on the last first-parent touch (`bd880973e`, #363), not on U5's squash (`b10d5d3b6`). Both are post-ratification, so the answer is the same.
- **The other five are the known RS-14 false-positive shapes** (class (b) stubs with no `tasks.md` or a post-closure touch; 121 a post-closure maintenance touch; 122, whose final unit merged before ratification, touched again on 2026-09-28). Unchanged from 15.1.0's reading. RS-3/RS-14's ladder fork stays unruled.

**What this record discharges, and what stays owed**:
- **Discharged at this record's merge**: `closeout-owed(123)`.
- **Still owed for Spec 123**:
  - **RELEASE, release 4 (16.0.0)**, phase 1 on the release squash S before the tag, phase 2 at the step-6 record PR's merge (`claims-pass-release-16.0.0.md`). The open items it inherits are in § "Carried to RELEASE 16.0.0".
  - ARMING reads at any arming in the meantime (none is pending from 123).
- **Owed by my seat from 123's records**: re-attestation at 125-B U3's merge (`.kiro/issues/2026-10-15-123-125b-u3-re-attestation.md`, owner Stacy); review of § 2 of `.kiro/issues/2026-10-15-123-governance-edit-kinds-ballot.md` (required reviewer); the consumer-Stacy overlay half of C-4 (`.kiro/issues/2026-10-15-123-u5-instrument-findings.md` § 3). **Received and acknowledged here**; each fires on its own trigger.

---

## The parity emissions and the deferral walk-back

- `npx tsx scripts/check-completion-criteria-parity.ts` at `bd880973e` → `spec 123-consumer-distribution (per-parent):` … `SUMMARY: parents evaluated 34, pass 34, fail 0; emissions 0; reds 0` (34 = 123's 31 + 127's 3). **No emission lines** for 123: no declared-none waivers, no exemptions, no deferrals declared, no doc-not-found.
- **Deferral walk-back** (written CLOSEOUT duty): `grep -rn 'Artifact deferred' .kiro/specs/123-consumer-distribution/completion/` → **0 fixed-form declarations** in the whole spec (two hits are prose saying none applies: `task-3-completion.md` L53, `u2a-task-12-scoped-read.md` L91). **No free-prose artifact deferral** in the U5 docs. The forward-dated items in U5 are owed **acts**, not deferred artifacts (`rebuild_index`, V-DOC before the tag), and are handled as such below.
- `promised-artifact-exists` is unbuilt, so promised-artifact gaps are this pass's judgment. U5: every listed Primary Artifact exists on `main` (checked by path; the `.kiro/issues/<date>-123-*.md` pattern matches 7 files).

---

## The opened claims (U5)

Key: **verified** = re-measured or re-read by me at `bd880973e` or in the run folders · **verified (read)** = checked against the cited record, not re-measured · **not checked** = the sample did not reach it. No row is false.

### Task 25 — the persona trio (Leonardo)

| Row | Claim | Result |
|---|---|---|
| C1 | three records; packed install; no source access; committed fixture; frozen prompt; both targets | **verified**: `cmp` of each committed `validation/prompts/trio-*.md` vs `/tmp/dp-trio/<run>/out/prompt.md` → identical ×3; prompt commit `30f72d628` ancestor of `8bae0346f`; each run's `out/candidate-shasum.txt` = `aa3efdcf9ce3…`; source-access audit hits are package self-references (head of each `source-access-audit.txt` read); targets cc ×1, kiro ×2 |
| C2 | every C30 field + `operator-log`, `session-launched-by`, `subject:` | **verified**: my own `grep` for 12 key labels over the three records → none missing; `trio-1-backend.md` carries 25 `### …:` headings. Content of the operator logs: § "The `subject: leonardo` cross-read" |
| C3 | Kenya's and Data's corrected wording; host facts | **verified**: the iOS string verbatim once per record; "for want of a platform fixture" → 0 hits ×3. Host lines present (not re-run) |
| C4 | budgets ≥ 3× `path-steps`; `budget-exhausted` a finding | verified (read): the 41/40 overrun is disclosed as R1-11 (`--max-turns` not enforced); not re-derived |
| C5 | persona (c) bare `init` in Kiro; 15B.3 | **verified**: `trio-3-pm/out/birth.txt` shows two `Product name:` prompts, "Completed in 172.243s" and "63.693s", consistent with the two logged unblocks |
| C6 | scoped DD9 re-read | verified (read) |

### Task 26 — the joins and the install-doc correction (Leonardo; Thurgood 26.5)

| Row | Claim | Result |
|---|---|---|
| C1 | two records; fixtures born from the same packed artifact; frozen prompts; C1/C3 fields | **verified**: join prompts identical ×2; both candidate shasums `aa3efdcf…`; prompt commit `23be48ee1` ancestor of the PR head |
| C2–C6 | outcome rows: 6 steps, findings, forced negative, stop vocabulary | verified (read): the schema-check paste in the parent doc; forced-negative lines present in both records |
| C7 | post-restart query checked against the rendered charter | **not checked**: the line citations were not re-read |
| C8 | "joined" = the agent answers | verified (read) |
| C9 | cold-observation table, clean-state cells only | **verified**: `validation/cold-observation-table.md`, 4/4 observed; the trio-2 `cannot-tell` footnoted and not counted |
| C10 | C8(c) observations | verified (read) |
| C11 | install doc corrected only for cells observed cold; diff cited | **verified**: `git diff b10d5d3b6~1 b10d5d3b6` → Integration Guide +4/−4 and `INSTALL.md` +4/−4, matching the cited hunks; the guard-test change is a tightening (exact strings for both the observed and unobserved paths), not a weakening. Write scope: CL-3 |

### Task 27 — re-grounding conformance (Leonardo)

| Row | Claim | Result |
|---|---|---|
| C1 | frozen prompts; no instrument hint in beat 2 | **verified**: `cmp` beat-1/beat-2 prompts vs `out/prompt-{1,2}.md` → identical; the hint `grep` over the **delivered** beat-2 text (`out/beat-2-prompt.txt`) → exit 1, no hits (a `grep` over the whole prompt file hits only the meta note above the BEAT markers, not the delivered text) |
| C2 | beat 1 formalized: yes, with artifact paths | verified (read) |
| C3 | beat 2 exercised: 30/30 opened | **verified** (arithmetic): 24 + 2 + 1 + 3 = 30 |
| C4 | identity probe on both, checked against the consumer rendering | verified (read) |
| C5 | 24.3 labelling | **verified**: `re-grounding-pass-four.md` L13 `**Verdict**: PASSES with respect to attack (a)`; `re-grounding-g2-cycle-2.md` L13 `**Verdict**: HOLDS` |

### Task 28 — closeout (Thurgood; Leonardo 28.3)

| Row | Claim | Result |
|---|---|---|
| C1 | probe re-run against release-4 artifacts; 26.7's scoping sentence | **verified**: the tarball of record hashes `326d798dcd71320129267cbeb97a2d59c13bfba7`; the committed inputs' sha1s equal `out/inputs-sha1.txt` (6 of 6); session A `permissionMode auto`, 2.1.301, 34 turns, `success`; session B `default`, 2.1.301, 37 turns, `success`; the scoped sentence is present in the Evidence cell |
| C2 | tarball assertion vs `tarball-target.json`, attributed | **verified** (numbers): `tar -tzf` → **1675** entries; file size **6485550** B; summed member sizes **23504489** B, all equal to the claim. **Not checked**: pack-assert 105/105 and the 183/41/148 attribution's reconciliation (`attribute.mjs` not re-run) |
| C3 | consumer-Leonardo, fresh session: `get_product_overview` + `find_screens` | **verified** from `product-query/out/product-query.jsonl`: init 44 tools, 2.1.301, `permissionMode auto`; calls `Bash(git status)`, `get_product_overview`, `find_screens`; the first `tool_result` contains `"name": "Order Status"`, the second `example-home`. The bar was fixed before the run (`git show 67275cfee:…/product-query.md` § `bar:`). The source re-check `git diff --name-only 4c875235a 8bae0346f -- product-mcp-server src/cli …/leonardo.md package-lock.json` → **0**, re-run by me |
| C4 | the obligation enumeration (Req 25.6) | **verified with one false quote** → **CL-6**. Coverage: all 21 Open-inputs rows and the six handoffs (23.7, 23.9, 21.2, 4.5, 6.8, 11.6) are placed (§ "Req 25.6") |
| C5–C8 | the four named records, each with owner and trigger | **verified**: all seven `2026-10-15-123-*.md` carry `**Owner**:` and a named `**Trigger**:` (an event in each; 23.9's "first willing stranger" has no date, per Req 23.9) |
| C9 | tripwire line, CHANGELOG committed, `npm test` + `tsc` green | **verified**: live body (public API) `Tripwire: declared 18, now 18; parents unchanged; successor branch: none`; the PR head's check runs 21/21 `success` (public API, `commits/8bae0346f/check-runs`); `## [Unreleased]` (16.0.0) present. Local `npm test`/`tsc` figures: read, not re-run |

**Sample**: of 31 U5 rows, **15 re-verified** by measurement or mechanical re-read (25 C1–C3, C5; 26 C1, C9, C11; 27 C1, C3, C5; 28 C1–C4, C9); **14 verified (read)**; **2 not checked** (26 C7 in full; 28 C2's attribution half). Forced-negative line: `Unmet or partially met criteria: None` in 4/4 docs.

---

## Findings

Two routes for each, additive: an explicit message to the owner (the orchestrator relays it), and, where marked, a standards implication. **All six are Low. No claim is falsified in a way that changes a criterion's status.**

### CL-1: Low — `audit:coverage-map` reads FAIL on `main`, from a U5-committed probe-input `package.json`

- **Shipped**: `npm run audit:coverage-map` at `bd880973e` → exit 1, `audit:coverage-map: FAIL (surfaces PASS · lanes FAIL)`. The only unadjudicated lane row is `[FAIL] local-script:.kiro/specs/123-consumer-distribution/probes/reference-corpus-probe-inputs-2026-09-20/test`. Its source is the reconstructed September `package.json` (`"test": "echo \"Error: no test specified\" && exit 1"`), committed in `53a551e3c` (Peter's recovery session) and first on `main` at `b10d5d3b6`.
- **Why nothing caught it**: no workflow runs `audit:coverage-map` itself (`.github/workflows/` has only the coverage-map unit tests), and U5's validation did not run it. #361, merged the day before (`8ad81eb4b`), excluded `fixtures/` and `__fixtures__/` trees by directory name. This tree is named `probes/…-inputs-…`.
- **Impact**: none on any guarded surface (the script is inert and no lane should run it). But a standing audit is red on `main`, and my RELEASE 16.0.0 phase 1 will read it red unless it is fixed or adjudicated. The package.json cannot simply be edited: its bytes are part of the re-run's sha1-pinned inputs (`05b5075d…`).
- **Route**: **Thurgood** (the coverage-of-coverage instrument and its lanes adjudications: an adjudication entry, or a class fix to the exclusion); the **orchestrator** for the committing session's validation habit (run `audit:coverage-map` when a unit commits a foreign repo's tree). **Trigger**: before RELEASE 16.0.0 phase 1. → RS-22.

### CL-2: Low — two `**Instruments**:` header lines do not match their blocks; Task 28's fails the grammar

- **Promised**: Completion Documentation Guide § "The instruments line and block": the line is `<N> listed — exists <E> · built-here <B> · missing <M> · unlisted <U> — <path>` (anchored regex); "E, B and M count final states"; U counts `## Found later` entries "of both kinds"; a resolved row's new state is `exists (<path> @ <sha>)` or `built here (<subtask>)`.
- **Task 28** (`task-28-completion.md` header): `50 listed — exists 30 · built-here 15 · missing 5 (all 5 resolved 2026-10-15, in-row) · unlisted 0 · misfit 2 (rows 2.5 and 2.2, …) — …`. **Fails the regex** (two parentheticals, a `misfit` field). **M counts original states** (all five MISSING rows are resolved; the final-state count is M = 0). **U = 0 omits the two `## Found later` misfits** (U should be 2). Rows 1.6 and 3.6 resolve to a human act ("Peter launches from macOS Terminal …"), which is neither allowed state; the block's own counter-argument paragraph names that tension.
- **Task 26** (header written at 26.5): N = 29 against **30 final-state rows** in the block (E 18, B 12): row 6.4, `built here (26.4) — see row 4.3`, is a cross-reference row that the header left out.
- Tasks 25 and 27: grammar and counts match (25: 17 + 20 = 37, U 6; 27: 16 + 8 = 24, U 1).
- **Recurrence**: MP-3 (MIDPOINT) was the same class on Task 18.
- **Route**: **Thurgood** (author of both headers). Vehicle: a dated erratum line in each doc, or "accepted as recorded" in his reply. → RS-19.

### CL-3: Low — 26.5 wrote two paths outside Task 26's Primary Artifacts and outside its executor's charter

- **Promised**: ballot `2026-09-26-tasks-row-write-scope-grant` § 2 clause 6: "a path outside it is a finding on the executing agent". Task 26's list: the two join records and `governance/DesignerPunk-Integration-Guide.md`. Thurgood's charter: `src/__tests__/**`, `.kiro/specs/**`, `docs/specs/**`, `.github/workflows/lane-timing.yml`.
- **Shipped**: `docs/consumer/INSTALL.md` (+4/−4, derived by `scripts/derive-install-doc.ts`) and `scripts/__tests__/install-doc.test.ts` (+23/−5).
- **Mitigating, verified**: both are **declared** in `task-26-completion.md` § "Additional verification" and `task-26-5-completion.md`. The derived file cannot differ from its source without the guard failing, and the test change tightens (it pins both texts exactly).
- **Recurrence**: MP-6's class: a criterion whose object is a derived artifact ("the install doc … via the Integration Guide source") implies the derived file and its guard, and the list named only the source.
- **Route**: **Thurgood** (acknowledge). No remedy is owed beyond this record. → RS-21.

### CL-4: Low — Task 26's delegated-tier divergence names a class its own reason denies

- **Shipped** (`task-26-completion.md` header): `planned … Thurgood (Sonnet) — 26.5 → actual … Thurgood (Opus) — 26.5 — 26.5 ran in the Thurgood (Opus) seat the orchestrator was already continuing …, **not on a re-estimate of its demand**; class: **model-evolution**`.
- **The contradiction**: per TCP and the guide, model-evolution means "cognitive-demand estimate was off". The reason states that demand was not re-estimated: the tier moved because a seat was continued.
- **Not a charge**: overriding the stamp was correct, and the divergence is recorded (the guide: "a data point, never a charge"). The defect is the class label, which feeds model-tier recalibration with a demand signal that did not happen.
- **Route**: **Thurgood** (header author at 26.5). → RS-20 (the vocabulary has no slot for this cause).

### CL-5: Low — the docs-MCP `rebuild_index` owed after U5 has no committed record (RL-5's class, again)

- **Claimed**: `u5-pr-body.md` § "Owed after merge" and C4 item 39: "docs-MCP `rebuild_index` on `main`: a served `governance/` doc changed (26.5)".
- **Shipped**: nothing in #363 or any later commit records the run.
- **Carve-out**: verifying the act needs `rebuild_index`, a steward verb, so **the verification decision is Thurgood's**. This is the **third steward-verb-gated encounter** across 123's passes (RL-5 at 15.1.0 phase 1; the 15.1.0 release run; this). Recorded as data for the carve-out's falsification condition: Thurgood has not invoked the exclusion, and the passes keep meeting such claims, so neither limb fires yet.
- **Route**: **orchestrator** (run it and record it, as for 15.1.0); **Thurgood** (verification).

### CL-6: Low — the C4 enumeration quotes a forced negative its cited doc does not contain

- **Claimed** (`task-28-completion.md` C4 table, item 13): "Migration fetch-and-re-transform; dp-portfolio's manifest history — closed — `completion/task-5-1-completion.md` (forced negative: "not obtained — both branches covered by fixtures")".
- **Shipped**: `task-5-1-completion.md` L7 reads "### The dp-portfolio input — **OBTAINED (the forced negative does not apply)**", and L12 reports `.kiro/sync-manifest.json` → PRESENT.
- **Status unaffected**: "closed" holds, more strongly than the quote says. The defect is a fabricated quotation inside an evidence cell, which is exactly what a reader of an obligation table cannot afford to check one row at a time.
- **How it was found**: a sample of 10 of the table's 44 rows (items 1, 2, 7, 9, 10, 13, 24, 25, 32, 35). The other 9 read true.
- **Route**: **Thurgood** (author of the table): a dated erratum on item 13.

---

## Observations (not findings)

- **OB-1 — the `GITHUB_TOKEN` read (the brief asked me to decide).** Verified from the Task 28 seat's transcript (this session's `subagents/agent-adf69c397b83f190b.jsonl`, 2026-10-15T21:29:21Z): one Bash call set `GH_TOKEN` from the main checkout's `.env` and ran `git ls-remote --heads origin 'task/123-*'`. No value was printed (I read the command, not the output, and redacted any token pattern). The seat disclosed it in its handback: "It was never printed, and wasn't needed: git used its own credentials. Your checklist says no credential reads, so I'm flagging it." **My decision: not a claims finding.** No claim's truth depends on it (the repository is public: I read the same ref state through the unauthenticated API), and nothing shipped. **What is owed**: the disclosure lives only in an uncommitted handback, and `task-28-4-completion.md`'s "Targeted checks" lists that `ls-remote` without saying how it ran. **Route**: Thurgood (one dated line under 28.4's adaptations, his call); the **orchestrator** and **Peter**: the brief said "no credential reads" for seats, while the orchestrator's own standing note teaches exporting `GITHUB_TOKEN` as `GH_TOKEN`. Which seats may read credentials is a policy question, not mine. *Counter, surviving*: S-4's "written, never implied" spirit supports calling the omission a Low finding on 28.4's adaptations element. I judged it outside that element, because the element records changes to the work, not to the seat's conduct. The fork is real.
- **OB-2 — U5's consumer runs predate two 16.0.0 MCP changes.** The trio, both joins, the conformance run and the product query all ran on the preview candidate `aa3efdcf…`, packed at `4c875235a`. `git merge-base --is-ancestor` confirms #352 is in it, and #359 (`validate_assembly` prop-value checks) and #360 (`find_docs` paging) are **not**. `git diff --name-only 4c875235a 8bae0346f -- application-mcp-server/src mcp-server/src` → 7 files. Only the probe re-run ran on the d6b6c7445 candidate (`find_docs` use in both sessions, so #360 was exercised there, by one task). The recipe's step 6 says "Release 4's runs are Spec 123's own (Task 25)". That is true as a process statement, but no consumer run exercised 16.0.0's two "Changed" MCP behaviours. → carried to RELEASE 16.0.0.
- **OB-3 — the friction record.** `.kiro/issues/2026-10-12-consumer-birth-friction-for-123-u3.md` names CLOSEOUT: "Row 8 undecided at CLOSEOUT → finding. Then `git mv` to `archive/`." **Row 8 is decided** (Lina's disposition, fix #338), and it is **observed in a 15.1.0+ consumer** (`trio-1-backend.md` L249: web reads `production-ready`). So there is no finding. The closing note and the archive move are still owed (Task 28 and the PR body both say so; the orchestrator's call). The 2026-10-13 append was the U5 branch's first commit (`4c875235a`, "U5: append the Settings-ledger friction routing"), outside every row grant. That is RS-18's open class (a record act in an issue file), its second instance.
- **OB-4 — the committed PR body is a template.** `completion/u5-pr-body.md` carries the literal `PRHEAD_SHA`, while the live body (public API) carries `8bae0346f`. Cosmetic record drift. The live body is the claim, and it is true.
- **OB-5 — no `Agent:` trailers on U5's branch commits.** The seat is named in each subject's parenthetical ("(Leonardo; U5)"). The PR body's `Agent:` line is present. This is a delegated-tier referent that the claims passes read; it is weaker as prose.
- **OB-6 — a forward claim in the shipped CHANGELOG.** The R1-6 limitation line says the install guide's sentence "is corrected to match". That is true only if V-DOC merges before the tag (`task-28-4-completion.md` adaptation 4, self-disclosed). → carried to RELEASE 16.0.0.
- **OB-7 — an account-level connector in "clean" Claude Code sessions.** `claude.ai Claude Docs` is present in the init event of 9 of the 12 CC transcripts across the run folders. It is account state from the operator's login, disclosed in `probe-rerun.md` L376/L418, `product-query.md` obs. 3 and `join-kiro-to-cc.md` L176. **No session called it**: I scanned all 12 transcripts for non-DesignerPunk `mcp__*` tool uses → none.
- **OB-8 — Leonardo's writes to `tests/onboarding-trio/**` during Tasks 26, 27 and 28.3.** In my reading these are **inside** Task 25's grant: clauses 1–3 key on the agent (Leonardo is Task 25's PRIMARY), the paths, the unit branch and the duration, not on which parent motivated an edit. Both parent docs state the other reading as their residual. Not a finding. The ballot is silent → RS-23.
- **OB-9 — release 4's semver moved from minor (plan) to MAJOR (16.0.0)**, because of #352, which is not 123's work. Disclosed (`u5-pr-body.md`; instruments O-10). Peter ratifies at release prep.
- **OB-10 — Req 25.2 was discharged by ruling.** "Peter's mechanics run" was recorded as not run, the author-launched instrument runs standing in (Peter's ruling (2)). The ruling is recorded only in the executing seat's doc, as relayed. Peter's merge of #362, which carries it, is the record act.
- **OB-11 — a stale status line.** `.kiro/issues/2026-10-02-one-hop-upgrade-rehearsal-tracked-residuals.md` L4 still says "**no grant**: this file carries no `**Grant paths**:` list", while L77 now carries one (RL-10's fix). Lina's line.
- **OB-12 — the governance-edit-kinds claims-pass line, dry-run.** It is proposed, not ratified (`…-governance-edit-kinds-ballot.md` § 2), so it binds nothing. Applied as a dry run: U5's only `governance/**` hunk (the Integration Guide, 26.5) names its kind and its authority (pre-declared execution, design C8) in #362's body. It would pass.

---

## The `subject: leonardo` cross-read (`tasks.md` L1490; run discipline C2)

**Tagged findings found** (`grep` over all nine U5 records): `trio-3-pm` R3-5, R3-6, R3-7; `conformance-beat-2` D-1 (S2); `product-query` observation 6 (tagged as a non-finding). "None" is written in `trio-1`, `trio-2`, both joins and `conformance-beat-1`. In each of those, consumer-Leonardo was not invoked; I confirmed from the runs' probe agents (Ada and Lina; Sparky; the two joiners' queried agents Thurgood and Stacy; consumer-Thurgood). **No untagged finding about consumer-Leonardo exists**: he ran only in `trio-3-pm` and the product query.

| Tag | Operator's judgment | My read |
|---|---|---|
| **R3-5** (write scope sends screen specs where `find_screens` can't see them; "a rendering defect, not a lapse of judgment") | favourable to the seat | **Supported.** In the run's rendering (`fixtures/born-kiro/.kiro/agents/leonardo-prompt.md`, `diff`-equal to the run repo's copy): write scope L357–361 is `specs/**` only, while L44–46 has him author `product/tokens/` and L234 has him rebuild after "product screen specs … product YAML". The charter contradicts itself, and he obeyed the scope. *Residual*: the record does not ask whether he could have named the conflict. Routed to Thurgood (V-PROF); correct |
| **R3-6** (three charter steps skipped) | strict on the seat | **Supported, and the rendering is not too thin.** The outline carries `max-width ~800px`, `<768px`, `24px` (L81, L83, L105 of the run's `design-outline.md`). It carries no counter-argument (`grep` for counter/trade-off/however → none). The transcript has no `validate_assembly` call (0 hits). Each skipped step is **explicit** in the rendering: L87 (token-first), L104–105 "Step 4: Validate Assembly", L326 (WHEN … before hand-off THEN `validate_assembly`), L281–282 "Counter-Arguments Are Mandatory". **My disposition (R3-6 routed its decision here)**: these are n=1 behavioural skips under a headless, plain-words PM prompt, not a rendering gap. **No profile route is triggered from this read.** A recurrence in the 23.7 recurring trio would be the signal. "Every significant architectural recommendation" arguably does not reach a home-page plan for a non-technical founder, so the counter-argument skip is the weakest of the three |
| **R3-7** (Kiro prints calls, not results) | instrument; "does not meet 28.3's bar" | **Supported**, and the operator ruled against his own seat's evidence; 28.3 was re-run on Claude Code |
| **D-1 / S2** (false heading-token premise in a consumer outline written by consumer-Thurgood) | tagged although Leonardo was not the author | **Over-inclusive tagging**, which is the safe direction. The routing (consumer story only; no DesignerPunk defect) is right: the CSS emits `typography.h1`–`h6` per the operator's grep, not re-run by me |
| **Product query, obs. 6** ("read the scaffold correctly, unprompted"; "candid-over-comfortable") | favourable | **The facts check**: the calls were `git status` plus the two MCP tools, as stated. The bar was mechanical and fixed before the run. The praise is the operator's gloss on his own seat, is not load-bearing, and is noted as such |

**Operator logs (content read in all eight logged records)**: every operator message after the frozen prompt is logged with a reason. The only in-session inputs are `trio-3-pm`'s two `Ctrl-U, Return, Return` unblocks, made at the orchestrator's instruction and content-free. My check: two `Product name:` prompts in `birth.txt`, with the logged durations. Everything else is fixed setup or approval steps. `session-launched-by: Peter` on every record (self-attested plus Peter's paste-backs; not independently provable from a transcript). One launcher slip: the conformance `hstate` overwrite, logged and repaired by the no-clobber change.

**Cross-read result**: **no evidence of operator leniency toward his own seat.** One judgment is favourable and supported (R3-5), one is strict (R3-6), one rules against his own evidence (R3-7), and the tagging is over-inclusive. **What a cross-read cannot reach**: whether a second operator would have framed R3-5's cause the same way. The C2 disclosure is what makes that question visible.

---

## Req 25.5 and 25.6 — the spec-level closeout requirements

- **25.5 (forced negative on every probe and run, plus per-question discovery)**: present in **9 of 9** U5 records. Seven carry a labelled "Forced negative, written" line. `probe-rerun.md` L407 has one per session. `product-query.md` writes "`subject: leonardo` findings: none. Written, not implied." and "Product findings …: none." (the content of the forced negative, without the label). Per-persona: three trio records, one each.
- **25.6 (the enumerable obligation set)**: the C4 table places **all 21** Open-inputs rows: 1 and 13 → item 9; 4 → 10; 5 → 16; 16–21 → 1–6; 2, 3, 6–12, 14, 15 → item 35. I read item 35's "discharged at R1–R4" against the table (`requirements.md` L890–912): all are struck or marked ✅. It also places all six handoffs (23.7 → 19; 23.9 → 20; 21.2 → 36; 4.5 → 16; 6.8 → 37; 11.6 → 9). The seven records each carry an owner and a named trigger. **One false quote** in the table (CL-6).
- **Ownership note** (not a finding): the 23.7 record names Leonardo as owner. Its trigger line says "the release owner runs the trio", and the recipe defers to the record. Thurgood's own Task 28 handback flagged that "a walk may find nobody who thinks it is theirs". The record resolves it (Leonardo) but the trigger sentence re-blurs it.

## The tripwire, all eight units (public API, PR bodies)

| PR | Unit | Line | Threshold |
|---|---|---|---|
| #215 | U1 | `declared 44, now 45; parents unchanged; successor branch: none` (no `Tripwire:` prefix inside the code span) | +4: within |
| #222 | U2a | `declared 11, now 13; …; G1 runs: 2` | +3: within; k = 2 fired fork M-1's read (done) |
| #262 | U2b | `declared 31, now 34; …` | +4: within |
| #307 | U3c | `declared 6, now 6; …` | +2 |
| #313 | U3g | `declared 11, now 11; …` | +3 |
| #321 | U3 | `declared 16, now 18; …` | +3: within |
| #329 | U4 | `declared 6, now 6; …` | +2 |
| #362 | U5 | `declared 18, now 18; …; successor branch: none` | +3 |

8/8 present; no limb fired.

## The five-pass cost line (Req 26.3, amended)

Declared: three RELEASE + MIDPOINT + CLOSEOUT = **five**. Actual: MIDPOINT (#263) · RELEASE 15.0.0 (two phases) · RELEASE 15.1.0 (two phases) · **CLOSEOUT (this)** · RELEASE 16.0.0 (**owed**). **On plan**; no hotfix tags (`git tag` → v14.0.0, v14.1.0, v15.0.0, v15.1.0). Outside the five, as declared events and not passes: the fork M-1 scoped read, the G1 and G2 verdict records, and ARMING reads (the U2b-merge read, #294, #316, #331, #334, #357).

---

## Prior findings at closeout (state read at `bd880973e`; "carried" = not re-checked beyond the line given)

| Finding | State now |
|---|---|
| MP-1 … MP-7 (MIDPOINT) | **No routing record exists** (`grep -rln 'MP-[1-7]' .kiro/issues` → only unrelated files). Carried. MP-3 and MP-6 **recurred** in U5 (CL-2, CL-3) |
| R-1 (15.0.0; Kenya/Data theme text) | Its record (`2026-10-12-steward-canonical-claims-theme-output.md`) is ACTIVE; its trigger "release 3's RELEASE pass" passed without closing it. Carried |
| R-2 … R-4 (15.0.0 phase 2) | Closed by the hermetic path, armed at #355 (my ARMING read #357); R-4's class recurred as RL-8 and was repaired by erratum (#356) |
| RL-1 (link 6 vs deleted branches) | **Open**: `tools/agent-generator/regrounding/verify-signing-chain.ts` unchanged since #262 |
| RL-2 (directive signing briefs; J blind seats owed) | **Open** |
| RL-3 (lapsed pre-release obligations) | Partly closed by #354 (publish-rail-guard wording; the publish-path rows issue + grant; the one-hop grant). Signing-act errata RS-1/2/4: open (ballot unchanged since `dff78bcde`). Trigger (d) § 5.3 amendment: open |
| RL-4 (subtask docs 24.3, 30.3, 31.5) | **Open**: the three docs still do not exist. **At closeout this is spec-wide: 3 ticked subtasks without their doc** |
| RL-5 | Remedied for 15.1.0; recurred as CL-5 |
| RL-6 (P1 ARMING lapse) | Carried; no P1 merge since |
| RL-7 · RL-8 · RL-9 · RL-10 | Closed (#355; #356; acknowledged in #356; grant at L77, with OB-11's stale status line) |
| J divergents (9) · RS-3/RS-14 fork | Carried, unchanged |

**Proposed vehicle** (I do not write `.kiro/issues/`; my charter's write scope is `.kiro/specs/**` and `docs/specs/**`): the orchestrator appends a § 7 "CLOSEOUT carry" to `.kiro/issues/2026-10-15-123-u5-instrument-findings.md`, which is already walked at release-4 prep, listing CL-1 … CL-6, RL-1, RL-2, RL-4, MP-1 … MP-7's missing routing record, and R-1. This is the single home 123's findings never had (RL-3's MP row).

## Carried to RELEASE 16.0.0 (phase 1 reads these)

1. CL-1 (`audit:coverage-map` FAIL) fixed or adjudicated.
2. OB-6: V-DOC merged before the tag, or the CHANGELOG's "is corrected to match" is not yet true.
3. OB-2: no consumer run exercised #359/#360. Read the notes' claims about them against what was run.
4. The u5-instrument-findings walk: every row fixed or waived in writing (Peter's ruling (4)(a)). See RS-13 below on where that walk lives.
5. Ada's publish-path rows ("hard deadline: merged before release 4's RELEASE phase 1"); Lina's R2/R4/R6 ("before release 4's prep opens"); the hermetic follow-ups item 4.
6. The MAJOR ratification (OB-9); the signing-act walk over the release delta; J and the Peter sample.

---

## Counting block

| Item | Reading (U5 population unless stated) |
|---|---|
| Criteria-block omissions | **0** (parity 34/34; emissions 0; reds 0) |
| Criteria vagueness | 0 flagged in 31 rows |
| Declared-none rate | forced-negative `None` 4/4; instruments `none —` rows: 25: 2 · 26: 1 · 27: 0 · 28: 0 |
| Fixed-string exemption usage | 0 |
| Bundled-claim / incomplete-decomposition · `(platforms: …)` fallbacks | 0 / 0 · 0. No per-platform build rows. Native toolchains are not involved; Kenya and Data unexercised by ruling, with host facts recorded as facts |
| Subtask-doc presence | **U5: 18/18**; adaptations element 18/18; `None` 5/18 (25.5, 26.3, 26.4, 27.3, 27.4; four carry a reason, 27.3 is bare). **Spec-wide: 3 ticked subtasks with no doc remain** (RL-4) |
| Delegated-tier capture | presence 4/4; missing 0 · free-prose 0; divergence 1/4 (26, class `model-evolution` → CL-4); class split: model 1, agent 0; spot-check **1/3** `plan held` against an independent referent (Task 28: the harness transcripts' `model` field shows Thurgood `claude-opus-5-5` (283 messages) and Leonardo 28.3 `claude-opus-5-5` (86); consistent); reflexive `plan held` 3/4. Note: Task 28's `plan held` sits beside a Lina consult (Sonnet, read-only) whose CHANGELOG wording shipped → RS-20 |
| Orchestrator consult line | population: the trigger-surface PRs in this pass's delta after 15.1.0 phase 2: **#354, #355, #362** (#356, #357, #363 touch none). **Presence 3/3**; `none needed` on a trigger surface: **0**; grammar variant: #354 ("Ada, Thurgood, Lina — …", three agents in one pair). Spot-check **1/3**: #362's Lina pair → this session's `subagents/agent-ab985e321dfc008df.jsonl` ("Bounded, READ-ONLY consult … release-4 CHANGELOG entry"). A harness-store trace, not committed, so **self-attested** by the rule. Never a gate |
| Re-grounding dispositions | **No population**: no signature event in the delta; `canonical/profiles/**` unchanged since 15.1.0's S (only `canonical/registry/tool-registry.json` descriptions, #359/#360). The `no-consumer-counterpart` rate (state metric) is unchanged from 15.1.0's reading. Assent rate and refusal count (event metrics): no events. Itemized-assent spot-check: n/a. `Peter sample (Stacy-signed): 0 / 0` in this population (cumulative per 15.1.0: 0 / 314, owed). Full-survival assent signal: **not yet instrumented**. Observation, never a guard |
| Instruments | header presence 4/4; grammar **3/4** (28 fails); path names its own block 4/4; count equality **2/4** (26 off by one; 28 counts original states) → CL-2. Gaps: **self-reported** unlisted 0 · misfit **11** (25: 6 · 26: 2 · 27: 1 · 28: 2); **pass-found** unlisted **1** (26: the guard test's C4 harness-agnostic pin, which 26.5 had to supersede; the block named the test only as a body-identity check, and the doc records the supersession as an adaptation, not under `## Found later`) · misfit 0. `missing 0 · unlisted 0` with a pass-found gap: **0** (26 declares U 2) |
| **M3** evidence presence | 31/31 rows carry Status and Evidence |
| **M4** forced-negative line | 4/4 |
| **M5** failure vocabulary | ⚠️ 1 at PR open (28 C9, the merge-dependent row), flipped to ✅ post-merge in #363 with the gate pasted (U4's #331 pattern); ❌ 0 |

---

## Method

**Run by me** (worktree at `bd880973e`; `git status --porcelain` empty before; only this file after):
- the owed-set pipeline (verbatim from my charter);
- `check-completion-criteria-parity`;
- `audit:coverage-map` (CL-1) and `git diff 8ad81eb4b~1 8ad81eb4b -- tools/agent-generator/coverage-map.ts`;
- the U5 diff by path, set against the four Primary Artifacts lists and the Leonardo/Thurgood charters (`canonical/agents/{leonardo,thurgood}.md` `writeScope`);
- the instruments rows by final state (a script over the four blocks), and the header regex from the guide;
- `cmp` of nine frozen prompts against the run folders; the ancestry checks; the beat-2 hint `grep` on the delivered text;
- the tarball hash, entry count, size and unpacked size;
- the probe inputs' sha1s; init and result events of the two probe sessions and the product query;
- a scan of 12 transcripts for foreign MCP calls;
- the trio-3 birth prompt count; the rendering line reads for R3-5 and R3-6; the consumer outline `grep`;
- the 28.3 source re-check; the squash-tree equality;
- a sample of 10 of 44 C4 rows; the Open-inputs table read;
- the seven records' owner and trigger lines.

**Read via the public GitHub API** (no credentials): the eight unit PR bodies, #354–#357 and #363; PR #362's merge facts and its head's 21 check runs.

**Read from the harness store** (this session's subagent transcripts; read-only): Task 28's seat models; the Lina consult; the `GITHUB_TOKEN` command (values never printed; token patterns redacted in my reads).

**Read, not re-run**: the local validation figures (`tsc`, `npm test` 398/9571, `test:scripts`, `pack-contents`, the two MCP suites); pack-assert 105/105; the 28.2 attribution; the schema-check pastes; every `cannot-tell` cell's evidence.

**Not run**: `verify-gate-registration.sh` (needs credentials); `test:consumer`; any native toolchain (none involved; any native build claim would read `not re-verified — toolchain unavailable`); the Kiro transcripts' results (kiro-cli does not print them: R3-7); the Task 25–27 sessions' transcripts, which are in earlier sessions (delegated-tier spot-check limited to Task 28).

**Disclosures**:
- **Conformance beat 2 exercised consumer-Stacy, my own seat's consumer rendering.** I read its record as I would any other, and its C-4 finding names my overlay.
- The 125-B U3 re-attestation record names me as owner.
- Every finding here lands on Thurgood's seat or on the orchestrator. Thurgood is my counterpart across the Q5 cut; each finding is mechanical (a regex, a count, a path list, a quote compared with its source), so a reader can re-decide each without my judgment.

---

## Standards implications (for Thurgood; he reads in full and records a one-line outcome)

- **RS-19 (CL-2, recurring from MP-3)**: the `**Instruments**:` header was malformed twice in one spec, under Opus PRIMARYs, and its count rule ("final states") was read as "original states". The line is mechanical by nature, and its named successor (the mechanical read, ballot § 4 M3) is unbuilt. Whether `completion-criteria-parity` (or the instruments parser) should emit the header grammar and the N/E/B/M/U equalities, the way the delegated-tier limb's successor is planned, is the class question. **Owner**: Thurgood.
- **RS-20 (CL-4; Task 28's consult)**: two gaps in the delegated-tier vocabulary. (a) No class fits "the tier changed because an existing seat was continued", so CL-4 forced a demand label onto a continuity cause. (b) `plan held` means "no additional agents were pulled in". Under consult-first, a read-only consult whose wording ships (Lina's Breaking text) is common, and the guide does not say whether it counts. **Owner**: Thurgood (the guide).
- **RS-21 (CL-3, recurring from MP-6)**: Primary Artifacts lists keep naming a derived artifact's source and omitting the derived file and its guard, so a correct execution reads as out-of-list. **Owner**: Thurgood (the tasks-round convention), with the spec authors.
- **RS-22 (CL-1)**: #361's exclusion is keyed on directory names (`fixtures/`, `__fixtures__/`). The next foreign repo tree, committed one day later under `probes/…-inputs-…/`, reopened the class. Keying on names recurs once per new name. **Owner**: Thurgood (coverage-map).
- **RS-23 (OB-8)**: the tasks-row grant ballot does not say whether a grant is limited to its parent's purpose, or covers the agent's edits to those paths for any parent on the unit branch. Two U5 parent docs carried the question as a residual. **Owner**: Thurgood (the ballot), Peter.
- **RS-24 (OB-1)**: credential handling by delegated seats has no written home. A brief forbade it while the orchestrator's own standing pattern does it. Not a completion standard. Named so it lands somewhere. **Owner**: Peter, with the orchestrator.
- **RS-13, escalated (third instance)**: release-4 preconditions again live only in issue records: the u5-instrument-findings walk ("blocks RELEASE phase 1"), V-DOC "before the tag", Ada's rows "before RELEASE phase 1", Lina's R2/R4/R6 "before release 4's prep opens". RELEASE-FLOW names none of them, so a claims pass is again their only detector. Ruling (4)(a) also places a block **in front of my pass** rather than in the step the operator runs, which inverts RS-7 ("guards live in the command the operator runs"). **Owner**: Thurgood, with Peter.
- RS-18 (open since 15.1.0): a second instance (OB-3).

---

## Forced negative (this pass)

**No U5 criterion row is false.** Of 31, 15 were re-verified by measurement or mechanical re-read and 14 read against their cited records, and none changes status. Two were not checked (26 C7 in full; 28 C2's attribution half). **No ❌ and no unverifiable row rolled into a ✅.** Six Low findings: one instrument red on `main` (CL-1); three form defects in the closing seat's docs (CL-2, CL-4, CL-6, the last a misquote with its status unaffected); one declared out-of-list write (CL-3); one owed act unrecorded (CL-5). The `subject: leonardo` cross-read found no leniency. All 31 of the spec's parents have been read by at least one of its five passes.

## Surviving counter-argument to my own verdict

My verdict, "U5's claims hold; six Low findings", rests on the **mechanical half**: hashes, counts, prompts, presence, paths, the bar's strings. The claims that matter most at closeout are judgments this pass cannot re-make:
- whether the trio found the right findings;
- whether "closed" is true for the 34 C4 rows I did not sample (CL-6 shows the table's evidence was not proof-read: one in ten sampled rows misquoted its source);
- whether 26.7's scoping is honest about an instrument whose operator, launcher and subject seats are all inside the house.

The sample found one fabricated quote in ten rows, and a reader should weigh "the other 34 read true" by that rate, not by my verdict. And the RELEASE 15.1.0 residual stands: 70 ✅ rows of U3, U3c, U3g and U4 were covered by no pass, and CLOSEOUT chose to cite rather than re-read them. What the spec actually proves is that **every parent was read once, and roughly one row in six was re-verified across the spec**. That is the honest reach of five passes, and it is short of "the spec's claims are verified".
