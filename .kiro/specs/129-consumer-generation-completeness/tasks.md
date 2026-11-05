# Implementation Plan: 129 — Consumer-Generation Completeness

**Date**: 2026-11-05
**Spec**: 129 - Consumer-Generation Completeness
**Status**: Tasks Phase — **R1**, for review (`feedback/tasks.md`). Execution starts after this file merges (Spec-Feedback-Protocol § "Sequential Formalization Gate").
**Author**: Thurgood (formalizer). Each parent names its PRIMARY; that seat's call governs its parent's how, within `requirements.md` and `design.md`.
**Go**: Peter, received 2026-11-05T22:48:15Z (`date -u` at receipt; orchestrator relay), verbatim: "673 and 675 are merged; go for tasks". What he read: "Your go for 129's tasks round. That's where the work is cut into units, and the compile check is built first."
**Dependencies**: as `requirements.md` header and `design.md` header. Spec 132 (planned, no directory) receives what 129 does not close; its deliverables, and its measured-cost record, are not tasks here.
**Facts**: `evidence/facts-at-d7f87174c.md`, the unedited stdout of `bash .kiro/specs/131-governance-simplification/evidence/spec-facts.sh 129 4d10202b2 d7f87174cc3af9593c8c1ab3831fbdfdd254e5f5`. Its row 3 names one record whose Trigger is this file (`2026-09-17-platform-build-verification-harness-candidate.md`); § "Merge preconditions" carries it.
**Criteria mode**: per-parent

---

## Implementation Plan

The compile harness is built first (U1), because every native "compiles" in 129 is accepted by it, and today's error counts hide each other until the first token fixes land (plan-r2 § 2). The comparator's falsification test is then registered as a named in-lane guard (U2). Generation follows in the order the seats measured: colours, shadows and the standalone native fixes (U3); the native type table with its same-PR component couplings (U4), after which the component repair is sized honestly; the validators, which depend on nothing else (U5); theme emission (U6) and the component theme reads (U7); the component-tier harvest (U8); the consumer's own source (U9); `init` and per-platform paths (U10); the charter and overlay text item (i) owes (U11); and the closeout (U12), which retires the native root files and reads the acceptance at the final head.

### Conventions for every parent

- **Instruments (M1, not M4).** The instruments parser PR has not merged at `d7f87174c` (`.kiro/issues/2026-09-29-instruments-parser-and-resolver.md` is at the issues root, and `scripts/completion-claims/` has no `INSTRUMENTS_RE`), so `P` does not exist and **no parent here carries an `**Instruments:**` block** (Process-Spec-Planning § "The Instruments block (M4)"). Each parent's PRIMARY writes `completion/task-<N>-instruments.md` before the first subtask, in M1's execution-time form (Start Up Tasks item 8); any `MISSING` row stops the subtasks that depend on it.
- **Completion docs.** Each parent's doc reproduces every Success Criteria bullet verbatim with Status and Evidence, carries the forced-negative line, the `**Instruments**:` header line and the `**Delegated-tier**:` line (Completion Documentation Guide). Every subtask gets its three-element doc (S-4).
- **Citing a harness context** (Req 2.13): the PR, the run URL at the head the unit merged, the comparator's summary line as printed, and the SHAs of the list file and `harness/pins.yaml` at that head.
- **A fix and its list edit land in the same diff** (Req 3.3). Before PR-open, a unit author dispatches the harness against the unit branch, because the harness is not in `complete-task.sh`'s `REQUIRED_WORKFLOWS` while it measures: `gh workflow run native-harness.yml --ref <branch>`.
- **A row a harness context accepts** has an entry tagged to its record on that context's list before the PR that fixes it, or its parent names the interim instrument (Req 2.14).
- **Token documentation** changes in the same PR as a token it describes (Req 15.4).
- **Limitation sentences** that a merged unit makes false are rewritten in one Integration Guide PR before each release's S, with INSTALL re-derived (Req 15's batching rule, moved here from R1 Requirement 15.3; Thurgood derives).
- **Sub-suites.** `npm test` does not run `test:consumer`, `test:scripts`, the `mcp-server` or the `application-mcp-server` suites. A parent whose artifacts those suites read runs them before completion and says so.
- **Edit kind and consult lines.** A PR touching `governance/**`, `.kiro/steering/**`, `.kiro/docs/ballots/**` or `canonical/agents/**` carries one `**Edit kind**:` line per file, and is Peter-merged under the standing carve-out. A unit PR touching a trigger surface carries `**Consulted**:`.
- **A D1, D2 or D3 row** changes only with Peter's dated words on the record first (Req 1.9).

### The list file format, the pin file and the run policy (decided here, Thurgood: Req 3's "the tasks round's")

- **Lists**: `harness/expected/<context>.tsv`, one per harness context. One entry per line, sorted by key, then tag. Tab-separated fields: the key (`<root>:<path> | <message>`, design § 1 K-2 and § 2), the count, the tag (a root record's file name, optionally `#<item label>`), and an optional `retagged=<YYYY-MM-DD>,<owner>,<from-record>` field. A `#` comment line is allowed only above the first entry. One line per entry keeps two PRs from conflicting unless they edit the same key (Thurgood R3 fold-back).
- **Pins**: one file, `harness/pins.yaml`, with `consumer`, `ios` and `android` sections. Req 3.5 (a) compares parsed values, so a comment or whitespace edit changes no pin.
- **Protected set**: `harness/protected-set.txt`, one record file name per line, sorted: the 129 intake records of `requirements.md` § "Record dispositions" plus rows 1, 3, 4, 15 and 22.
- **Job names**: `harness-generate` (confirmed), then the four contexts of the requirements' Conventions. Each job also has a `(unit-branch)` name on `workflow_dispatch`, as every workflow in this repo does.
- **Run policy (Req 2.10)**: `on: pull_request` with no `paths:` filter, plus `workflow_dispatch`. All four contexts run on every PR, a docs-only or records-only 129 unit PR included, so Req 2.10 never rests on a filter (Stacy design R1 § 2 item 5). The cost is a macOS run on every PR while the lanes measure; decision 6 (below) is where that is Peter's.
- **The Xcode pin (K-7, read at this round)**: `runner-images` `images/macos/macos-26-arm64-Readme.md`, image `20261026.0455.2`, read 2026-11-05 by `curl`: Xcode 26.6 (build `17F113`, `/Applications/Xcode_26.6.app`) is the default and newest stable on `macos-26`; Xcode 27 is announced only as a public preview. So the pin is Xcode 26.6 on `macos-26`, no runner label beyond `macos-26` is needed, and Kenya's fork does not reach Peter (K-7, "When it becomes Peter's"). Task 3 re-reads the readme at the unit's cut.

### Decision 6 — runner classes and the promotion criterion (Peter's; the PR body's `**Open for Peter**:` line)

The criterion the requirements ask this round to write (Req 2.12). A harness context is **offered to Peter for promotion** when all of these hold, each shown in `evidence/harness-stability.md` (Thurgood keeps it from U1's merge):
1. its floor (Req 3.4) and toolchain match (Req 3.11) are in place, and their falsification cases pass in `lane-functional-root`;
2. **10 consecutive PR runs** whose verdict changed only with a repo change: no red from the runner, the queue or the image (a re-run that turns green counts as a break and restarts the count);
3. three cold-cache runs, each under the 10-minute ceiling (125-A Req 6.3);
4. for an iOS context, the pinned Xcode is still on the `macos-26` image at the offer.

**Order**: the Android contexts first (the `ubuntu-24.04` class the gate already depends on), then the iOS contexts. **What each promotion is**: Peter's act per context, in one recorded change: `EXPECTED_CONTEXTS` +1 in `tools/agent-generator/verify-gate-registration.sh` (an issue-row grant naming that act, or Peter), the branch-protection setting (Peter), and `REQUIRED_WORKFLOWS` +1 in `.kiro/hooks/complete-task.sh` at the first promotion (Thurgood). Each fires Stacy's ARMING read. **Runner classes** proposed: `macos-26` and `ubuntu-24.04`, standard hosted runners, pinned by version in `runs-on`, never `-latest`; no billed larger runner.

---

## Declared Merge Units

| Unit | Parents | Gating parent | Midpoint carrier (specs ≥ 3 units) |
|---|---|---|---|
| **U1 — The compile harness** | Tasks 1–5 | Task 5 | — |
| **U2 — The comparator guard and the limitation markers** | Tasks 6–7 | Task 7 | — |
| **U3 — Native colours, shadows and the standalone native fixes** | Task 8 | Task 8 | — |
| **U4 — The native type table** | Task 9 | Task 9 | — |
| **U5 — Validators and config types** | Task 10 | Task 10 | — |
| **U6 — Native theme emission (generator)** | Task 11 | Task 11 | **U6 (this unit's merge carries the midpoint claims pass)** |
| **U7 — Component theme reads and repairs** | Task 12 | Task 12 | — |
| **U8 — The component tier reaches `generate`** | Task 13 | Task 13 | — |
| **U9 — `generate` reads the consumer's own source** | Task 14 | Task 14 | — |
| **U10 — `init` runs `generate`; per-platform output paths** | Task 15 | Task 15 | — |
| **U11 — Charter and overlay text for item (i)** | Task 16 | Task 16 | — |
| **U12 — Closeout: retire the native root files; acceptance at the final head** | Tasks 17–18 | Task 18 | — |

**Order and dependencies.** U1 → U2 → U3 → U4 → U6 → U7 → U8 → U9 → U11 → U12. U5 and U10 depend only on U2 and may run beside the chain at Peter's direction; each still branches from `main` after the unit it follows merges, and lock-carrying PRs merge one at a time. Why this order: U3's colour converter is what U4's import lists and U6's theme members emit through (design §§ 5, 6; Req 6.5's coupling); U4's type table is what `ComponentTokens` and the theme compile against; U7 follows U6 (design § 13); U8 needs U4's `ComponentTokens` form; U9's theme registry feeds U6's instances (design § 10); U11 lands before the S of the release that first carries U6 (Req 4.9); U12 is last.

**The midpoint carrier**: U6. It is the sixth of twelve units, and its merge is the first point at which D1's probe can read a theme (design § 4). The MIDPOINT record's path is `completion/claims-pass-midpoint.md`, never `completion/claims-pass.md`.

**Sizes** (each the named seat's estimate, in sessions; "unsized" where no seat gave one):

| Unit | Estimate | Source |
|---|---|---|
| U1 | 3–4 (iOS about 1, Android about 1, driver about 1, comparator 0.5–1), plus `pack-assert`'s resource rule 0.25 | plan-r2 § 8 (Lina's sum; Kenya, Data, Ada, Thurgood); Ada |
| U2 | about 0.5 (markers), plus minutes (registration) | plan-r2 § 8 (Ada) |
| U3 | unsized | plan-r2 § 8, "WP1, the other rows: unsized" |
| U4 | unsized; about 70 Android read sites on Lina's side | Ada design inbound § D-1 residual |
| U5 | row 1 about 2; rows 21 and 22 unsized | Ada design inbound § D-9 |
| U6 | unsized | — |
| U7 | about 0.5, plus the couplings carried in U4, U6 and U8 | Lina design inbound § 2 |
| U8 | 2.5–3 (the ruling is made) | plan-r2 § 8 (Ada) |
| U9 | 3–4 (DTCG about 1.5) | Ada design inbound § D-11 |
| U10 | about 0.5 for Q4's INSTALL change; Req 12 unsized | plan-r2 § 5 (Ada) |
| U11 | unsized | — |
| U12 | unsized | — |

### Delegated-tier plan (one PRIMARY per parent, the referent of its `**Delegated-tier**:` line)

Write scope for every seat below is granted by ballot `2026-09-26-tasks-row-write-scope-grant`: a PRIMARY and each tiered secondary may write exactly the parent's listed Primary Artifacts, on the unit's branch, until the unit merges, once Peter merges this file. **Tier rule**: Sonnet implements settled design (all of 129's calls are made in `design.md`); Opus where a named signal says residual judgment remains. Consulted seats carry no tier and get no grant. Attestations (signatures, confirm acts, Stacy's records) are outside every line.

| Parent | PRIMARY (tier) | Secondaries (tier) | Consulted |
|---|---|---|---|
| 1 | Ada (Sonnet) | — | Kenya, Data (the consumer they compile) |
| 2 | Thurgood (Opus) — the instrument every native acceptance rests on, with seven interacting verdict rules (design § 3) | Kenya (Sonnet) — the Swift parser; Data (Sonnet) — the Kotlin parser | Stacy (reads the falsification cases at review) |
| 3 | Kenya (Sonnet) | — | Thurgood |
| 4 | Data (Sonnet) | — | Thurgood |
| 5 | Thurgood (Sonnet) | Kenya (Sonnet) — the iOS jobs' steps; Data (Sonnet) — the Android jobs' steps | Ada, Lina |
| 6 | Thurgood (Sonnet) | — | Stacy |
| 7 | Thurgood (Sonnet) | — | Ada |
| 8 | Ada (Sonnet) | Sparky (Sonnet) — the `var()` and blue-tinted shadow `Consumer Guard` cases | Kenya, Data |
| 9 | Ada (Sonnet) | Lina (Sonnet) — the coupled Android component reads and the guideline type statements | Data, Kenya |
| 10 | Ada (Sonnet) | Lina (Sonnet) — the two component tokens files row 21's ruling disposes | — |
| 11 | Ada (Sonnet) | Lina (Sonnet) — Req 4.5's coupled reads | Kenya, Data |
| 12 | Lina (Sonnet) | — | Kenya, Data |
| 13 | Ada (Sonnet) | Lina (Sonnet) — the hand-written enums, row 18 R1 under `src/cli/sync/**`, the Spec 123 pointer line, the Integration Guide cascade sentence | Data, Sparky; Ada is consulted on Lina's `src/cli/sync/**` edit |
| 14 | Ada (Sonnet) | Sparky (Sonnet) — his charter's registered-theme line; Lina (Sonnet) — the regeneration and the lock | Lina (Q3a), Kenya, Data |
| 15 | Ada (Sonnet) | Thurgood (Sonnet) — the INSTALL derivation and `install-doc.test.ts` | Leonardo, Kenya, Data |
| 16 | Kenya (Sonnet) | Data (Sonnet) — his charter and overlay; Lina (Sonnet) — the regeneration and the lock | Stacy (confirmer) |
| 17 | Ada (Sonnet) | — | Thurgood (release text) |
| 18 | Thurgood (Sonnet) | Kenya (Sonnet), Data (Sonnet) — the "Native status" passage | Stacy, Ada |

---

## Merge preconditions (before this file merges)

1. **The harness charter's Trigger** (`.kiro/issues/2026-09-17-platform-build-verification-harness-candidate.md`, Kenya and Data) is `path:` this file, so it fires at this file's merge. Under README rule 11 a re-rule must be an ancestor of the firing commit, so Kenya and Data re-rule it in their own record-only PR that merges first, to `path:.kiro/specs/129-consumer-generation-completeness/completion/task-5-completion.md` (the harness parent), or close it with the build decision this file records (requirements.md Req 2, "Records").
2. **The second re-rule of the intake records** (requirements.md § "Record dispositions", Stacy's requirements-round point). After this file's last tasks round fixes the numbering, each owner re-rules their records from `completion/claims-pass.md` to the carrying parent's completion doc, in their own record-only PR that merges before this file. The table:

| Record | Owner | Carried by | New Trigger path (under `completion/`) |
|---|---|---|---|
| `2026-06-24-mathematical-relationship-parser-validation-gaps.md` (row 1) | Ada | Task 10 | `task-10-completion.md` |
| `2026-06-28-spec-094-platform-theme-emission-unwired.md` (row 2) | Ada | Task 11 | `task-11-completion.md` |
| `2026-08-13-component-token-platform-references-noncompiling.md` (row 3) | Ada | Task 9 | `task-9-completion.md` |
| `2026-10-03-native-generator-findings-for-spec-129-intake.md` (row 4) | Ada | Tasks 8, 9, 11 | `task-11-completion.md` (the last) |
| `2026-10-20-native-font-family-literals-unescaped-quotes.md` (row 5) | Ada | Task 9 | `task-9-completion.md` |
| `2026-10-20-kotlin-output-no-import-block.md` (row 6) | Ada | Task 9 | `task-9-completion.md` |
| `2026-10-24-kotlin-output-section-comment-bare-text.md` (row 7) | Ada | Task 8 | `task-8-completion.md` |
| `2026-10-24-native-primitive-values-do-not-match-declared-type.md` (row 8) | Ada | Task 9 | `task-9-completion.md` |
| `2026-10-26-ios-designtokens-members-not-public.md` (row 9) | Ada | Task 8 | `task-8-completion.md` |
| `2026-10-24-shadow-color-primitives-emitted-on-no-platform.md` (row 10) | Ada | Task 8 | `task-8-completion.md` |
| `2026-10-24-android-component-unit-type-mismatches.md` (row 12) | Lina | Tasks 9, 11 | `task-11-completion.md` (the last) |
| `2026-10-26-token-index-platform-name-readers.md` (row 13, item 3) | Ada | Task 11 | `task-11-completion.md` |
| `2026-09-26-native-component-theme-hardcoding.md` (row 15) | Lina | Task 12 | `task-12-completion.md` |
| `2026-11-04-progress-bar-native-theme-reads-malformed.md` (row 16) | Lina | Task 12 | `task-12-completion.md` |
| `2026-10-02-one-hop-upgrade-rehearsal-tracked-residuals.md` (row 18, R1 and R5) | Lina | Task 13 | `task-13-completion.md` |
| `2026-10-15-123-palette-read-from-package.md` (row 19) | Ada | Task 14 | `task-14-completion.md` |
| `2026-10-01-in-repo-generate-output-contaminates-package-dist.md` (row 20, row (g)) | Ada | Task 14 | `task-14-completion.md` |
| `2026-10-24-component-token-custom-values-unvalidated.md` (row 21) | Ada | Task 10 | `task-10-completion.md` |
| `2026-10-03-semantic-override-map-type-not-exported.md` (row 22) | Ada | Task 10 | `task-10-completion.md` |

   **Stay on `completion/claims-pass.md`, by design**: the charter `2026-10-02-consumer-generation-completeness-spec.md` (Ada; CLOSEOUT reads the spec); `2026-06-24-oklch-shadow-color-family-not-migrated.md` (row 11; its owed act at the claims pass is the re-rule to Spec 133, design § 8); `2026-11-04-consumers-get-no-report-of-what-an-upgrade-changed-in-generated-tokens.md` (left out; re-read at CLOSEOUT).

## Unit preconditions and the records 129's paths fire

| When | Record or act | Owner | What is owed |
|---|---|---|---|
| **Before U1's PR opens** | `ContainerCardBase.ios.swift` L816 parse defect (row 15's half, Req 4.7) | Lina | her own PR, merged; else it is carried as a tagged entry (Req 4.7 allows it) |
| **Before U1 merges** | `.kiro/issues/2026-11-05-icon-base-android-drawable-readme-breaks-resource-merge.md`, Trigger `path:harness/**` | Lina | the README move merged and the record closed (rule 5), or re-ruled, in an ancestor of U1's merge; otherwise U1's first Android run fails before any Kotlin compiles (Req 10.3) |
| **Before U1 merges** | `.kiro/issues/2026-09-26-native-component-distribution.md`, Trigger `path:harness/**` | Kenya, Data | the firing acts the charter names, or the narrowing to `path:harness/pins.yaml` Stacy preferred, in an ancestor of U1's merge |
| **The first unit PR that edits `tests/consumer-integration.test.ts`** (U5 at the earliest) | `2026-10-13-consumer-guard-c6-sync-dry-run-hits-npm-registry.md`, Trigger `path:tests/consumer-integration.test.ts` | Lina | the hermetic C6 fix in that PR, or a re-rule in an ancestor |
| **U5 (row 21 edits `src/build/tokens/defineComponentTokens.ts`)** | `2026-09-27-progress-token-harvest-may-not-cross-dual-instance-boundary.md`, Trigger `path:src/build/tokens/defineComponentTokens.ts` | Ada | the trace or a re-rule, in or before that PR |
| **Any unit PR that edits `src/cli/staleness.ts`** (Task 13's R5 may) | `2026-10-12-generate-staleness-decided-by-file-times.md` | Ada | the fix or a re-rule, in or before that PR |
| **Any unit PR that edits `src/components/core/Input-Text-Base/platforms/ios/**`** | `ios-readonly-focusable-prototype.md` | Kenya | the prototype run or a re-defer, at that PR |
| **After U1 merges** | the component-repair record (Req 1.5) | Lina | filed from U1's committed baseline run; sized at the first run after U4 merges |
| **After U1 merges** | `.github/in-lane-guards.json` entries (Req 3.10) | Thurgood | U2, Task 6 |
| **At U6's merge** | MIDPOINT claims pass | Stacy | `completion/claims-pass-midpoint.md` |
| **Before the S of the release carrying U6** | Req 4.9's charter and overlay text | Kenya, Data | U11 |
| **Before the S of the release carrying U9** | the Token-Governance § "Theme Registry (Spec 094)" ballot edit (Req 15.6) | Thurgood (holder), Ada (text) | a ballot, ratified and applied; Task 18 reads that it happened |
| **At U12's merge** | `2026-10-23-signing-act-shape-review.md` (Trigger `manual`: 129's final unit merge) | Thurgood | the review it names |
| **At U12's merge** | CLOSEOUT claims pass | Stacy | `completion/claims-pass.md` |

---

## Tasks

### UNIT 1 — The compile harness

- [ ] 1. The packed-install consumer driver (U1)

  **Type**: Parent · **Validation**: Tier 3 - Comprehensive · **Agent (plan)**: PRIMARY Ada (Sonnet)
  **Traces**: Req 1.8, 2.1, 2.2, 2.3, 4.8, 10.3 · design Architecture, § 3 ("Wiring")

  **Success Criteria:**
  - `scripts/harness/consumer.ts` runs `npm pack`, installs the tarball into a scratch directory, runs `init` and `generate`, and writes the consumer root as one directory a CI job can upload, reading nothing from the repository's own `dist/`.
  - The scratch consumer's config abbreviation is not `DP`, and `harness/pins.yaml` § `consumer` names it.
  - The harness input includes the product-token fixture at `harness/fixtures/product-tokens/`, holding one token that `ref`s a WCAG-only colour and one that `ref`s a composite token.
  - Until item (i) emits, each product-token fixture entry on a token list is tagged to row 2's record (theme getters) or row 13's record (composite and WCAG-only references), by cause.
  - The driver exits non-zero, naming the step, when `npm pack`, the install, `init` or `generate` fails.
  - `scripts/pack-assert.ts` fails on any packed file under `platforms/android/res/` whose path is not `res/<type>[-<qualifiers>]/<name>.<ext>` with an Android resource type and an allowed extension, and passes at this unit's head.

  **Primary Artifacts:**
  - `scripts/harness/consumer.ts`
  - `scripts/harness/__tests__/consumer.test.ts`
  - `harness/fixtures/product-tokens/**`
  - `harness/pins.yaml` (the `consumer` section)
  - `scripts/pack-assert.ts`

  **Completion Documentation:**
  - Detailed: `.kiro/specs/129-consumer-generation-completeness/completion/task-1-completion.md`
  - Summary: `docs/specs/129-consumer-generation-completeness/task-1-summary.md`

  **Post-Completion:** mark complete (`taskStatus`); `./.kiro/hooks/complete-task.sh "Task 1 Complete: The packed-install consumer driver (129)"` commits the docs on the U1 branch (no PR: U1's PR opens at Task 5); STOP.

  - [ ] 1.1 Driver: pack, install, `init`, `generate`, artifact layout
    **Type**: Implementation · **Validation**: Tier 2 - Standard · **Agent**: Ada (Sonnet)
    - Abbreviation from `harness/pins.yaml` § `consumer`; a Jest test of the step-failure messages
    - _Requirements: 1.8, 2.1, 2.2_
  - [ ] 1.2 Product-token fixture
    **Type**: Implementation · **Validation**: Tier 2 - Standard · **Agent**: Ada (Sonnet)
    - _Requirements: 2.3, 4.8_
  - [ ] 1.3 `pack-assert`'s native resource rule
    **Type**: Implementation · **Validation**: Tier 2 - Standard · **Agent**: Ada (Sonnet)
    - Lina's README move is a precondition (§ "Unit preconditions")
    - _Requirements: 10.3_

- [ ] 2. The comparator and its falsification test (U1)

  **Type**: Parent · **Validation**: Tier 3 - Comprehensive · **Agent (plan)**: PRIMARY Thurgood (Opus) · Kenya (Sonnet) — Swift parser · Data (Sonnet) — Kotlin parser
  **Traces**: Req 2.6 (the cross-tier rule), 3.1–3.11 · design §§ 1 (K-2), 2 (capture and key), 3

  **Success Criteria:**
  - `scripts/harness/compare.ts` reads `(key, count)` pairs, each compile's exit status, the context's list and `harness/pins.yaml` at the head and at the merge base, `harness/protected-set.txt` at both, the per-tier file count, and the issues root at the head, and prints one verdict and one summary line.
  - The summary line carries the expected count, the observed count, new failures, stale entries, additions by exception (a), (b) and (c), retags, files compiled against the floor, the entries remaining, and, in a component context, the cross-tier entries counted separately.
  - `scripts/harness/__tests__/compare.test.ts` makes the comparator fail once for each of: an observed key not on the list; an observed count above its pin; an observed count below its pin; a listed key that does not occur.
  - The same test makes it fail once for each of: fewer files than the floor; zero files; an addition at a readable merge base under none of exceptions (a), (b) or (c).
  - The same test shows that a comment-only or whitespace-only edit to `harness/pins.yaml` admits no addition, and that a changed pinned value does.
  - The same test makes it fail once for each of: a tag naming a record under `archive/`; a tag naming a missing record; a tag naming a record whose Trigger token is `manual`.
  - The same test makes it fail once for each of: a retag away from a protected record without a `retagged=` field and a same-diff append to that record; a record removed from `harness/protected-set.txt` while it is still at the issues root; and it shows that a retag prints `retagged: <key> <from> → <to>`.
  - The same test makes it fail once for each of: a toolchain version that differs from the pin; a compile that exits non-zero with no parsed error (`pre-compile`); a compile that exits zero with parsed errors (`parser`); a merge base whose list or pin file cannot be read (`base unreadable`).
  - The same test shows that a run with no merge base checks everything except additions and prints `additions not checked: no merge base`.
  - The same test shows that, in a component context, a `gen:` key the component compile reports and the baseline compile does not is kept and counted as `cross-tier`, and that a missing baseline result fails the context.
  - `scripts/harness/__tests__/parse-swift.test.ts` shows that a Swift diagnostic printed twice (location and caret) is counted once, and that a missing-return fixture yields one `missing return` key.
  - `scripts/harness/__tests__/parse-kotlin.test.ts` shows that a multi-line Kotlin diagnostic keeps its continuation lines joined by ` ⏎ `.
  - Both parser tests show that a key holds a root-relative POSIX path, no line or column, and its quoted identifiers.
  - A grep of `scripts/harness/compare.ts`, `scripts/harness/parse-swift.ts` and `scripts/harness/parse-kotlin.ts` for `GITHUB_TOKEN`, `GH_TOKEN`, `gh pr` and `pull_request` returns no line.
  - `harness/README.md` states the list, pin and protected-set formats of § "The list file format, the pin file and the run policy", and the comparator parses exactly that format.
  - `npm run test:scripts` passes with the three new suites, and the `lane-functional-root` run on the U1 PR shows them selected.

  **Primary Artifacts:**
  - `scripts/harness/compare.ts`
  - `scripts/harness/parse-swift.ts`
  - `scripts/harness/parse-kotlin.ts`
  - `scripts/harness/__tests__/compare.test.ts`
  - `scripts/harness/__tests__/parse-swift.test.ts`
  - `scripts/harness/__tests__/parse-kotlin.test.ts`
  - `scripts/harness/__tests__/fixtures/**`
  - `harness/README.md`
  - `harness/protected-set.txt`

  **Completion Documentation:**
  - Detailed: `.kiro/specs/129-consumer-generation-completeness/completion/task-2-completion.md`
  - Summary: `docs/specs/129-consumer-generation-completeness/task-2-summary.md`

  **Post-Completion:** mark complete; `complete-task.sh "Task 2 Complete: The comparator and its falsification test (129)"` on the U1 branch (no PR); STOP.

  - [ ] 2.1 Formats: lists, pins, protected set; `harness/README.md`
    **Type**: Implementation · **Validation**: Tier 2 - Standard · **Agent**: Thurgood (Sonnet)
    - _Requirements: 3.2, 3.7_
  - [ ] 2.2 Swift parser (`<root>:<path> | <message>`, K-2, O-17)
    **Type**: Implementation · **Validation**: Tier 2 - Standard · **Agent**: Kenya (Sonnet)
    - _Requirements: 3.2_
  - [ ] 2.3 Kotlin parser (D § 1.2)
    **Type**: Implementation · **Validation**: Tier 2 - Standard · **Agent**: Data (Sonnet)
    - _Requirements: 3.2_
  - [ ] 2.4 Comparator verdict rules and summary line
    **Type**: Implementation · **Validation**: Tier 3 - Comprehensive · **Agent**: Thurgood (Opus)
    - Req 3.3–3.9, 3.11; design § 3 rules 1–5
    - _Requirements: 2.6, 3.3, 3.4, 3.5, 3.6, 3.7, 3.8, 3.9, 3.11_
  - [ ] 2.5 Falsification suite
    **Type**: Implementation · **Validation**: Tier 3 - Comprehensive · **Agent**: Thurgood (Opus)
    - Each case red once, then green; the exact red string recorded in the completion doc
    - _Requirements: 3.10_

- [ ] 3. The iOS lanes (U1)

  **Type**: Parent · **Validation**: Tier 3 - Comprehensive · **Agent (plan)**: PRIMARY Kenya (Sonnet)
  **Traces**: Req 2.4, 2.6, 2.7, 2.8, 2.9, 3.4, 3.11, 6.2 · design § 1 (K-1 to K-7)

  **Success Criteria:**
  - On iOS, Stage T compiles the generated iOS files with `swiftc -emit-module -c -wmo -parse-as-library -module-name DPHarnessTokens -swift-version 6 -diagnostic-style llvm` for `arm64-apple-ios17.0-simulator`, and prints the invocation and its file list.
  - On iOS, Stage P compiles the probe generated from the consumer's `token-index/` with plain `import`, prints `probe: read <n> of <m> index names`, and fails when `n ≠ m`; while Stage T writes no module it prints `probe: blocked (token module not built)`.
  - On iOS, the probe reads every colour semantic the index names `theme.<name>` through each theme instance and through `\.dpTheme`, once item (i) emits them.
  - On iOS, Stage C compiles every non-test packaged `.swift` file and the generated files as module `DesignerPunk` at `-swift-version 5`, leaving out the package's `dist/ComponentTokens.*`, in the pinned order (package files, then generated files, each sorted by path).
  - On iOS, the T5 baseline compiles the generated files alone at `-swift-version 5` in the same job as Stage C, for the cross-tier rule.
  - On iOS, each stage runs its self-test first: the missing-return fixture gives exactly one `missing return` error, and at Stage P a planted `internal` member gives one entry and a read count of 2 of 2.
  - On iOS, each context reads Xcode's version, build and app path, the SDK and Swift, sets `DEVELOPER_DIR`, and fails on any field that differs from `harness/pins.yaml` § `ios`.
  - `harness/pins.yaml` § `ios` pins Xcode 26.6 (`17F113`), the SDK, the Swift language modes, and the compile flags, names the runner label `macos-26`, states that its pins are harness pins and not minimums, and sets the deployment target 17.0, equal to Core Goals' iOS minimum.
  - On iOS, each context computes its floor at run time from the packed tarball's file list plus the generated files, per tier, and prints the count it gave the compiler.

  **Primary Artifacts:**
  - `harness/ios/**`
  - `harness/pins.yaml` (the `ios` section)

  **Completion Documentation:**
  - Detailed: `.kiro/specs/129-consumer-generation-completeness/completion/task-3-completion.md`
  - Summary: `docs/specs/129-consumer-generation-completeness/task-3-summary.md`

  **Post-Completion:** mark complete; `complete-task.sh "Task 3 Complete: The iOS lanes (129)"` on the U1 branch (no PR); STOP.

  - [ ] 3.1 Re-read the `macos-26` image readme at the cut; set the pins
    **Type**: Setup · **Validation**: Tier 1 - Minimal · **Agent**: Kenya (Sonnet)
    - _Requirements: 2.8, 2.9_
  - [ ] 3.2 Stages T, P, C and T5; the probe generator; file order and floor
    **Type**: Implementation · **Validation**: Tier 2 - Standard · **Agent**: Kenya (Sonnet)
    - _Requirements: 2.4, 2.6, 2.7, 3.4_
  - [ ] 3.3 Self-tests (K-4) and the toolchain match (K-6)
    **Type**: Implementation · **Validation**: Tier 2 - Standard · **Agent**: Kenya (Sonnet)
    - _Requirements: 3.11, 6.2_

- [ ] 4. The Android lanes (U1)

  **Type**: Parent · **Validation**: Tier 3 - Comprehensive · **Agent (plan)**: PRIMARY Data (Sonnet)
  **Traces**: Req 2.4, 2.6, 2.7, 2.8, 2.9, 3.4, 3.11 · design § 2; D §§ 1.1–1.5

  **Success Criteria:**
  - On Android, `harness/android/` is one Gradle build with the `:tokens`, `:probe` and `:dp` modules, each `com.android.library` with the Compose compiler plugin applied.
  - On Android, each context runs one invocation, `gradle --continue :tokens:compileDebugKotlin :probe:compileDebugKotlin :dp:compileDebugKotlin`, and prints it with its sorted file list, package files first.
  - On Android, `:dp` compiles every non-test packaged `.kt` file and the generated Kotlin with Icon-Base's `res/` as its resources, leaving out the package's `dist/ComponentTokens.*`.
  - On Android, `:probe` reads every member the index names for Android from inside `@Composable` functions, prints `probe: read <n> of <m>`, fails when `n ≠ m`, and a planted `internal` member in a fixture yields an entry.
  - On Android, `harness-android-components` fails when `:tokens:compileDebugKotlin` has no task outcome in its own run.
  - `harness/pins.yaml` § `android` pins the JDK, Gradle, AGP, Kotlin, the Compose BOM (1.7 or later for `material-ripple`), `compileSdk`, `minSdk` 26, Coil, `material-icons-extended` and, while the generated Kotlin calls it, the colour library, names the runner label `ubuntu-24.04`, and states that its pins are harness pins and not minimums.
  - On Android, each context reads `java.version`, the Gradle version, the Kotlin compiler version and the resolved AGP and BOM versions, and fails on any difference from `harness/pins.yaml`.
  - On Android, each context passes explicit source files, computes its floor at run time per tier, and prints the count it gave the compiler.

  **Primary Artifacts:**
  - `harness/android/**`
  - `harness/pins.yaml` (the `android` section)

  **Completion Documentation:**
  - Detailed: `.kiro/specs/129-consumer-generation-completeness/completion/task-4-completion.md`
  - Summary: `docs/specs/129-consumer-generation-completeness/task-4-summary.md`

  **Post-Completion:** mark complete; `complete-task.sh "Task 4 Complete: The Android lanes (129)"` on the U1 branch (no PR); STOP.

  - [ ] 4.1 The Gradle build, three modules, explicit file list, floor
    **Type**: Implementation · **Validation**: Tier 2 - Standard · **Agent**: Data (Sonnet)
    - _Requirements: 2.4, 2.6, 3.4_
  - [ ] 4.2 The probe generator, the planted-member fixture, pins and toolchain match
    **Type**: Implementation · **Validation**: Tier 2 - Standard · **Agent**: Data (Sonnet)
    - _Requirements: 2.7, 2.8, 2.9, 3.11_

- [ ] 5. Workflow wiring, baselines and the fault run (U1)

  **Type**: Parent · **Validation**: Tier 3 - Comprehensive · **Agent (plan)**: PRIMARY Thurgood (Sonnet) · Kenya (Sonnet) — iOS job steps · Data (Sonnet) — Android job steps
  **Traces**: Req 1.4 (its list rule), 2.5, 2.10, 2.11, 2.12, 2.14, 3.5 (b) · design § 3 ("Wiring")

  **Success Criteria:**
  - `.github/workflows/native-harness.yml` defines `harness-generate` and the four contexts `harness-ios-tokens`, `harness-ios-components`, `harness-android-tokens` and `harness-android-components`, each its own job and check, triggered `on: pull_request` with no `paths:` filter and on `workflow_dispatch`.
  - The iOS jobs run on `runs-on: macos-26` and the Android jobs on `runs-on: ubuntu-24.04`, and no job uses a `-latest` label.
  - `harness-generate` runs `scripts/harness/consumer.ts` once and uploads its output as one artifact, and each compile context downloads it.
  - One dispatched run with a forced `harness-generate` failure shows each of the four contexts failing, not skipping, and its run URL is in this parent's completion doc.
  - The four baseline lists `harness/expected/harness-ios-tokens.tsv`, `harness-ios-components.tsv`, `harness-android-tokens.tsv` and `harness-android-components.tsv` are committed from the first full run, admitted under exception (b), with every entry tagged to a root record whose Trigger can fire.
  - All four contexts ran on the U1 PR and concluded success at its head, each printing its summary line, and the completion doc cites each per Req 2.13.
  - Every 129 row a harness context accepts has an entry tagged to its record on a baseline list, or this parent's completion doc names its interim instrument (row 12's groups B and C, masked behind row 6; row 9, `tokenIndexPlatformNames.test.ts`; row 2's probe half).
  - `tools/agent-generator/verify-gate-registration.sh` reports its count unchanged at the U1 head, and no harness context is in `EXPECTED_CONTEXTS` or in `complete-task.sh`'s `REQUIRED_WORKFLOWS`.
  - `evidence/harness-stability.md` exists with one row per context for the U1 PR's run, in the form § "Decision 6" reads.

  **Primary Artifacts:**
  - `.github/workflows/native-harness.yml`
  - `harness/expected/harness-ios-tokens.tsv`
  - `harness/expected/harness-ios-components.tsv`
  - `harness/expected/harness-android-tokens.tsv`
  - `harness/expected/harness-android-components.tsv`
  - `.kiro/specs/129-consumer-generation-completeness/evidence/harness-stability.md`

  **Grant limits** (`.github/**`): this row's grant over `.github/workflows/native-harness.yml` carries the acts README rule 8 and ballot `2026-09-27-ci-regime-standing-scope` M2 clause 5 exclude, and admits none: no new required context, no change to `EXPECTED_CONTEXTS`'s count, no removing or weakening a step, floor or execution assertion. It creates one new non-required workflow file and touches no other `.github/**` path.

  **Completion Documentation:**
  - Detailed: `.kiro/specs/129-consumer-generation-completeness/completion/task-5-completion.md`
  - Summary: `docs/specs/129-consumer-generation-completeness/task-5-summary.md`

  **Post-Completion:** mark complete; `complete-task.sh "Unit 1: The compile harness (129)"` opens U1's PR (body: Spec, Task 1–5, Agent, the completion docs, validation, `**Consulted**:`); report the URL; STOP.

  - [ ] 5.1 The workflow: jobs, labels, triggers, artifact hand-off
    **Type**: Implementation · **Validation**: Tier 2 - Standard · **Agent**: Thurgood (Sonnet), Kenya (Sonnet), Data (Sonnet)
    - _Requirements: 2.5, 2.10, 2.11, 2.12_
  - [ ] 5.2 The first full run; baseline lists with tags; the protected set filled
    **Type**: Implementation · **Validation**: Tier 2 - Standard · **Agent**: Thurgood (Sonnet)
    - Lina files the component-repair record from this run after U1 merges (§ "Unit preconditions")
    - _Requirements: 1.4, 2.14, 3.5_
  - [ ] 5.3 The forced-failure dispatch; the stability record opened
    **Type**: Implementation · **Validation**: Tier 2 - Standard · **Agent**: Thurgood (Sonnet)
    - _Requirements: 2.11_

### UNIT 2 — The comparator guard and the limitation markers

- [ ] 6. Register the harness falsification suites as named in-lane guards (U2)

  **Type**: Parent · **Validation**: Tier 3 - Comprehensive · **Agent (plan)**: PRIMARY Thurgood (Sonnet)
  **Traces**: Req 3.10 (registration)

  **Success Criteria:**
  - `.github/in-lane-guards.json` gains one entry each for `scripts/harness/__tests__/compare.test.ts`, `parse-swift.test.ts` and `parse-kotlin.test.ts`, with `config` `scripts/jest.config.js`, `context` `lane-functional-root`, and `record` naming this task's completion doc.
  - The additivity predicate of ballot `2026-10-20-in-lane-guard-registry-additive-entries` § 2 prints `true` against the PR's merge base, and the check prints `N registered in-lane guards; N selected` with N the entry count, green on the U2 PR.
  - The U2 PR's `.github/**` changes are exactly `.github/in-lane-guards.json`.

  **Primary Artifacts:**
  - `.github/in-lane-guards.json`

  **Completion Documentation:**
  - Detailed: `.kiro/specs/129-consumer-generation-completeness/completion/task-6-completion.md`
  - Summary: `docs/specs/129-consumer-generation-completeness/task-6-summary.md`

  **Post-Completion:** mark complete; `complete-task.sh "Task 6 Complete: Register the harness falsification suites (129)"` on the U2 branch (no PR); STOP. The U2 merge fires Stacy's ARMING read of this file.

  - [ ] 6.1 Add the three entries; record the predicate output and the check's line
    **Type**: Setup · **Validation**: Tier 1 - Minimal · **Agent**: Thurgood (Sonnet)
    - _Requirements: 3.10_

- [ ] 7. Limitation markers in the Integration Guide's install region (U2)

  **Type**: Parent · **Validation**: Tier 3 - Comprehensive · **Agent (plan)**: PRIMARY Thurgood (Sonnet)
  **Traces**: Req 15.2 · plan-r2 § 5

  **Success Criteria:**
  - Each limitation sentence in `governance/DesignerPunk-Integration-Guide.md`'s install region that a 129 row fixes carries `<!-- limitation: .kiro/issues/<file>.md -->` naming that row's record, and the completion doc lists every marked sentence with its record.
  - `scripts/__tests__/install-doc.test.ts` fails when a marked record is under `archive/` or missing while its sentence remains, shown by a fixture case red once.
  - `docs/consumer/INSTALL.md` is re-derived by `scripts/derive-install-doc.ts` and `install-doc.test.ts` passes.

  **Primary Artifacts:**
  - `governance/DesignerPunk-Integration-Guide.md`
  - `scripts/__tests__/install-doc.test.ts`
  - `scripts/derive-install-doc.ts`
  - `docs/consumer/INSTALL.md`

  **Completion Documentation:**
  - Detailed: `.kiro/specs/129-consumer-generation-completeness/completion/task-7-completion.md`
  - Summary: `docs/specs/129-consumer-generation-completeness/task-7-summary.md`

  **Post-Completion:** mark complete; `complete-task.sh "Unit 2: The comparator guard and the limitation markers (129)"` opens U2's PR (Peter-merged: `governance/**`; `**Edit kind**:` EXECUTION, Req 15.2); report the URL; STOP.

  - [ ] 7.1 Mark the sentences; teach the test; re-derive INSTALL
    **Type**: Implementation · **Validation**: Tier 2 - Standard · **Agent**: Thurgood (Sonnet)
    - Ada consulted on which sentences each of her rows fixes
    - _Requirements: 15.2_

### UNIT 3 — Native colours, shadows and the standalone native fixes

- [ ] 8. Native colours, shadows, section comments and `public` members (U3)

  **Type**: Parent · **Validation**: Tier 3 - Comprehensive · **Agent (plan)**: PRIMARY Ada (Sonnet) · Sparky (Sonnet) — the web `Consumer Guard` cases
  **Traces**: Req 1.6, 6.2, 6.10, 7.1–7.4, 15.4; rows 4 (items 2 and 4), 7, 9, 10, 11 · design §§ 5 (shadow composite), 6, 8, 9 (`var()` reach)

  **Success Criteria:**
  - On iOS, every generated colour is `Color(.displayP3, red:, green:, blue:, opacity:)` with values computed at generation, and no generated file calls `Color.oklch` or imports ChromaKit.
  - On Android, every generated colour is `Color(red, green, blue, alpha, ColorSpaces.DisplayP3)` with values computed at generation, and no generated file calls colormath.
  - A Jest test asserts that each emitted native colour inside Display P3 converts back to its OKLCH source with ΔE₀₀ ≤ 0.1, channels to 4 decimal places.
  - A Jest test asserts that colours outside Display P3 are mapped by CSS Color 4 § 13.2 gamut mapping with ΔE_OK 0.02, against a committed fixture whose header names its source (a reference implementation and version, or the specification's worked examples).
  - A Jest test asserts that every emitted Android colour channel is within 0–1.
  - `clampToGamut` in `src/color/OklchConverter.ts` takes a target gamut and uses ΔE_OK.
  - The WCAG override path emits native colour constructors, not `oklch(…)` text, on iOS.
  - The WCAG override path emits native colour constructors, not `oklch(…)` text, on Android.
  - `shadowBlack100`, `shadowBlue100`, `shadowOrange100` and `shadowGray100` are defined in OKLCH with the values of design § 8, and a Jest test asserts each converts back to its earlier `rgba` within § 6's tolerance.
  - Every shadow composite's colour primitive is emitted on web, on iOS and on Android, and each native shadow composite is a generated `ShadowToken`, not a `Typography` constructor.
  - `KNOWN_UNEMITTED_SHADOW_COLORS` and the warning `generate` prints for it are removed, and `ColorReferenceEmissionValidator.test.ts` passes with a case that no colour primitive a composite references goes unemitted.
  - A `Consumer Guard` case asserts, on the packed install's generated web CSS and the package's `component-tokens.css`, that every custom property a `var()` references is defined in the generated web CSS or on a pinned allowlist.
  - A `Consumer Guard` case asserts that one blue-tinted shadow composite on web uses its colour token's custom property.
  - The generated Kotlin's section comments are comment syntax, accepted by `harness-android-tokens` with row 7's entries removed in this diff.
  - Every member of the generated iOS token types is `public`, and `src/generators/__tests__/tokenIndexPlatformNames.test.ts` requires every index iOS name to resolve to a `public` member of a `public` enclosing type.
  - The shadow token family's documentation changes in this PR to the OKLCH definitions.
  - The token contexts' lists show the entries tagged to rows 4 (item 2), 7, 9 (where Stage T builds) and 10 removed in this diff, and every addition this diff makes prints under exception (a) or (c) with a tag.

  **Primary Artifacts:**
  - `src/generators/TokenFileGenerator.ts`
  - `src/generators/oklch/**`
  - `src/providers/iOSFormatGenerator.ts`
  - `src/providers/AndroidFormatGenerator.ts`
  - `src/providers/WebFormatGenerator.ts`
  - `src/providers/__tests__/**`
  - `src/color/OklchConverter.ts`
  - `src/tokens/**`
  - `src/validators/ColorReferenceEmissionValidator.ts`
  - `src/validators/__tests__/ColorReferenceEmissionValidator.test.ts`
  - `src/generators/__tests__/**`
  - `tests/consumer-integration.test.ts`
  - `harness/expected/harness-ios-tokens.tsv`
  - `harness/expected/harness-android-tokens.tsv`
  - `harness/expected/harness-ios-components.tsv`
  - `harness/expected/harness-android-components.tsv`
  - `harness/pins.yaml` (the colour library pin's removal, Req 3.5 (a))

  **Completion Documentation:**
  - Detailed: `.kiro/specs/129-consumer-generation-completeness/completion/task-8-completion.md`
  - Summary: `docs/specs/129-consumer-generation-completeness/task-8-summary.md`

  **Post-Completion:** mark complete; `complete-task.sh "Task 8 Complete: Native colours, shadows and the standalone native fixes (129)"` opens U3's PR; report the URL; STOP.

  - [ ] 8.1 The P3 converter and gamut mapping; both native constructors; the WCAG path
    **Type**: Implementation · **Validation**: Tier 2 - Standard · **Agent**: Ada (Sonnet)
    - _Requirements: 6.10_
  - [ ] 8.2 Shadow primitives in OKLCH; every composite's colour emitted; `ShadowToken`; the warning removed; family doc
    **Type**: Implementation · **Validation**: Tier 2 - Standard · **Agent**: Ada (Sonnet)
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 15.4_
  - [ ] 8.3 Section comments (row 7); `public` members and the tightened text guard (row 9)
    **Type**: Implementation · **Validation**: Tier 2 - Standard · **Agent**: Ada (Sonnet)
    - The text guard retires in the PR where Stage P first prints a full read count
    - _Requirements: 6.2_
  - [ ] 8.4 `Consumer Guard`: the `var()` check and the blue-tinted composite
    **Type**: Implementation · **Validation**: Tier 2 - Standard · **Agent**: Sparky (Sonnet)
    - No browser; reach includes `component-tokens.css` (design § 9)
    - _Requirements: 1.6, 7.1_

### UNIT 4 — The native type table

- [ ] 9. The native type table, import lists and font family, with their component couplings (U4)

  **Type**: Parent · **Validation**: Tier 3 - Comprehensive · **Agent (plan)**: PRIMARY Ada (Sonnet) · Lina (Sonnet) — the coupled Android reads and the guideline type statements
  **Traces**: Req 5.9, 6.3, 6.4, 6.5, 6.7, 6.8, 6.9; rows 3, 4 (item 1), 5, 6, 8, 12 (groups B, C, item 3's typography); I-1, I-2 · design §§ 5, 7, 12a (`ConfigHelpers`)

  **Success Criteria:**
  - On Android, the generated families emit the types of design § 5's table (Data's R2 rows, with any variant Ada and Data confirm in this round recorded in the completion doc), and one Jest test per table row asserts its emitted form.
  - On iOS, the generated families emit the types of design § 5's table, `TypographyToken` carries a computed `tracking: CGFloat` in points, and a Jest test asserts each row and the field.
  - On Android, a Jest test on the generator output asserts that `radius_half` emits `CornerSize(percent = 50)` (or the confirmed variant).
  - On iOS, `radiusHalf` emits `Circle()`, accepted by `harness-ios-tokens`.
  - On iOS, a font family emits as a `String?`, the first stack entry unquoted, and `nil` when that entry is a generic keyword, asserted by a Jest test.
  - On Android, a font family emits by design § 5's row, with the quotes gone, asserted by a Jest test.
  - The import list of `DesignTokens.android.kt` is computed from the types it emits, every import line precedes the first declaration, and a Jest test asserts both.
  - The import list of `ComponentTokens.android.kt` is computed from the types it emits, every import line precedes the first declaration, and a Jest test asserts both.
  - `ComponentTokens` refers to `DesignTokens.<name>` on iOS and on Android, and row 3's platform references compile, accepted by the token contexts.
  - On Android, sizing tokens emit as `Dp` (I-1), and Lina's removal of the 16 `.dp` sites lands in this diff, guarded by `src/components/__tests__/AndroidSizingDpReads.test.ts`.
  - On Android, `fontSize` emits as `TextUnit` (I-2), and row 12's groups B and C and item 3's typography constants in `InputTextBase.android.kt` change in this diff.
  - `src/components/__tests__/AndroidDpTokenReads.test.ts` knows every shape I-2 emits, `TextUnit` included.
  - The per-family Android type statements in `governance/platform-implementation-guidelines.md` match the generator in this diff, drafted by Lina and approved by Peter under the ballot-measure model.
  - `ConfigHelpers.ts` and `BuildOrchestrator.ts` default Android `minSdkVersion` to 26 with validation floors 26, naming Core Goals in the message, and default iOS `minimumDeploymentTarget` to `'17.0'`.
  - `harness-ios-tokens` and `harness-android-tokens` show the entries tagged to rows 3, 4 (item 1), 5, 6 and 8 removed in this diff, and every addition this diff makes prints under exception (c) with a tag.
  - Ada's release-note draft for I-1 and I-2 is in this parent's summary doc.

  **Primary Artifacts:**
  - `src/providers/AndroidFormatGenerator.ts`
  - `src/providers/iOSFormatGenerator.ts`
  - `src/providers/AndroidUnitConverter.ts`
  - `src/providers/iOSUnitConverter.ts`
  - `src/providers/__tests__/**`
  - `src/generators/**`
  - `src/tokens/**`
  - `src/build/workflow/ConfigHelpers.ts`
  - `src/build/BuildOrchestrator.ts`
  - `src/components/core/*/platforms/android/**`
  - `src/components/__tests__/AndroidSizingDpReads.test.ts`
  - `src/components/__tests__/AndroidDpTokenReads.test.ts`
  - `governance/platform-implementation-guidelines.md`
  - `harness/expected/harness-ios-tokens.tsv`
  - `harness/expected/harness-android-tokens.tsv`
  - `harness/expected/harness-ios-components.tsv`
  - `harness/expected/harness-android-components.tsv`

  **Completion Documentation:**
  - Detailed: `.kiro/specs/129-consumer-generation-completeness/completion/task-9-completion.md`
  - Summary: `docs/specs/129-consumer-generation-completeness/task-9-summary.md`

  **Post-Completion:** mark complete; `complete-task.sh "Task 9 Complete: The native type table (129)"` opens U4's PR (Peter-merged: `governance/**`; `**Edit kind**:` EXECUTION, Req 6.9); report the URL; STOP. After merge, the next harness run is the component repair's sizing event (Lina).

  - [ ] 9.1 Confirm design § 16's O-8 variants (Ada, Data) and record the final table
    **Type**: Architecture · **Validation**: Tier 3 - Comprehensive · **Agent**: Ada (Opus)
    - The one decide step in this parent: a variant changes a coupled read count
    - _Requirements: 6.4, 6.8_
  - [ ] 9.2 Generator: types per family, composites, font family, import lists, `ComponentTokens` references
    **Type**: Implementation · **Validation**: Tier 2 - Standard · **Agent**: Ada (Sonnet)
    - _Requirements: 5.9, 6.3, 6.4, 6.5_
  - [ ] 9.3 Coupled component reads (I-1, I-2, `fontWeight`, the composite's 9 reads); the two guards
    **Type**: Implementation · **Validation**: Tier 2 - Standard · **Agent**: Lina (Sonnet)
    - _Requirements: 6.7, 6.8_
  - [ ] 9.4 Guideline type statements (Lina drafts; Peter approves); `ConfigHelpers` floors
    **Type**: Documentation · **Validation**: Tier 2 - Standard · **Agent**: Lina (Sonnet), Ada (Sonnet)
    - _Requirements: 6.9_

### UNIT 5 — Validators and config types

- [ ] 10. The relationship validator, component-token custom values and the override types (U5)

  **Type**: Parent · **Validation**: Tier 3 - Comprehensive · **Agent (plan)**: PRIMARY Ada (Sonnet) · Lina (Sonnet) — the two component tokens files
  **Traces**: Req 13.1–13.3; rows 1, 21, 22 · design §§ 12, 12a (13.3)

  **Success Criteria:**
  - The `Consumer Guard` case `validate passes` (skipped at `tests/consumer-integration.test.ts` L354 at `c22c17a78`) is re-enabled and passes.
  - A Jest case with a token that breaks its declared relationship is still reported, and the pre-correction `blur000` string is its true-positive case.
  - A consumer component token with an off-grid custom value and no `offGridReason` makes `generate` warn, naming the token, and not fail, accepted by a `Consumer Guard` case.
  - A DesignerPunk component token that does not conform fails the repository's lane, shown by a Jest case red once.
  - Badge-Label-Base and Button-VerticalList-Item conform at this head, and Button-VerticalList-Item's `offGridReason` is Lina's text in design § 12.
  - A consumer `.ts` file importing `SemanticOverrideMap` and `SemanticOverride` from `@3fn/core/config` type-checks under `tsc --noEmit` in `Consumer Guard`.

  **Primary Artifacts:**
  - `src/validators/**`
  - `src/build/tokens/defineComponentTokens.ts`
  - `src/integration/ValidationCoordinator.ts`
  - `src/config/index.ts`
  - `src/tokens/**`
  - `src/components/core/Badge-Label-Base/tokens.ts`
  - `src/components/core/Button-VerticalList-Item/tokens.ts`
  - `tests/consumer-integration.test.ts`

  **Completion Documentation:**
  - Detailed: `.kiro/specs/129-consumer-generation-completeness/completion/task-10-completion.md`
  - Summary: `docs/specs/129-consumer-generation-completeness/task-10-summary.md`

  **Post-Completion:** mark complete; `complete-task.sh "Task 10 Complete: Validators and config types (129)"` opens U5's PR; report the URL; STOP.

  - [ ] 10.1 Row 1: family classification, `=` and `≈`, the `blur000` correction
    **Type**: Implementation · **Validation**: Tier 2 - Standard · **Agent**: Ada (Sonnet)
    - _Requirements: 13.1_
  - [ ] 10.2 Row 21: the grid rule, `offGridReason`, warn for consumers, fail for ours
    **Type**: Implementation · **Validation**: Tier 2 - Standard · **Agent**: Ada (Sonnet), Lina (Sonnet)
    - _Requirements: 13.2_
  - [ ] 10.3 Row 22: the exports
    **Type**: Implementation · **Validation**: Tier 2 - Standard · **Agent**: Ada (Sonnet)
    - _Requirements: 13.3_

### UNIT 6 — Native theme emission (generator)

- [ ] 11. Native theme emission, with Req 4.5's coupled reads (U6)

  **Type**: Parent · **Validation**: Tier 3 - Comprehensive · **Agent (plan)**: PRIMARY Ada (Sonnet) · Lina (Sonnet) — Req 4.5's coupled reads
  **Traces**: Req 1.7, 4.1, 4.2, 4.3, 4.5, 4.8, 5.6; rows 2, 4 (item 3), 12 (item 3's colours, Button-CTA), 13 (item 3) · design § 4

  **Success Criteria:**
  - On iOS, `generate` emits `public protocol DesignerPunkTheme: Sendable`, `DPThemeKey`, `EnvironmentValues.dpTheme`, the `<Name>Themes` holder, one conforming `Equatable` struct per registered theme and mode, the implicit members and `View.<name>Theme()`, and a generator test asserts the `: Sendable` clause.
  - On Android, `generate` emits `data class DesignerPunkTheme`, `LocalDPTheme = staticCompositionLocalOf { <Name>Themes.BaseLight }`, the `<Name>Themes` holder with one member per registered theme and mode, and `<Name>Theme(darkTheme = isSystemInDarkTheme()) { content }`, in `package com.designerpunk.tokens`.
  - No alias is emitted: no `typealias <Name>Theme`, no `Local<ABBR>Theme`, no second Swift key.
  - On iOS, the theme carries every colour semantic the index names `theme.<name>`, each with its resolved value per theme and mode.
  - On Android, the theme carries every colour semantic the index names `theme.<name>`, each with its resolved value per theme and mode.
  - The token index names every `category: color` semantic `theme.<name>` on iOS and Android, and `token-index/README.md` § "Platform names" states the root rule of design § 4.
  - A Jest test on output generated from the repository's real token definitions finds zero `Color.Unspecified`, `Color.clear` and `unresolved` in the emitted themes, per platform, and fails on one.
  - The theme block emits no `import` line, and each generated file has one import list at its head.
  - `SwiftThemeTypes.test.ts` and `KotlinThemeTypes.test.ts` are re-baselined against the component reads as #592 (`c176d2798`) left them, and the U6 PR body names the re-baseline.
  - On iOS, the probe constructs each theme instance and reads every theme colour under the name the components read, accepted by `harness-ios-tokens`.
  - On Android, the probe constructs each theme instance and reads every theme colour under the name the components read, accepted by `harness-android-tokens`.
  - Row 12's item 3 colours in `InputTextBase.android.kt` and Button-CTA's bare reads bind to `theme.` in this diff.
  - `validateProductTokens` refuses a composite `ref` with a message naming the token, accepted by a Jest test.
  - A WCAG-only colour `ref` in a product token emits the theme path by its `theme.` prefix, and the harness fixture's entry for it is removed from the token lists in this diff.
  - The scaffolded dark-override file's header and its list match the index's colour semantics, or a record naming the gap is at the issues root before this PR opens.
  - The token contexts' lists show the entries tagged to row 2 and row 13 (item 3) removed in this diff, and every addition prints under exception (c) with a tag.

  **Primary Artifacts:**
  - `src/generators/**`
  - `src/providers/**`
  - `src/build/product/**`
  - `src/cli/validateProductTokens.ts`
  - `src/cli/__tests__/**`
  - `src/tokens/**`
  - `token-index/**`
  - `application-mcp-server/src/**/__tests__/**` (only where a suite reading the real `token-index/` asserts the old platform names)
  - `src/components/core/Input-Text-Base/platforms/android/InputTextBase.android.kt`
  - `src/components/core/Button-CTA/platforms/**`
  - `harness/expected/harness-ios-tokens.tsv`
  - `harness/expected/harness-android-tokens.tsv`
  - `harness/expected/harness-ios-components.tsv`
  - `harness/expected/harness-android-components.tsv`

  **Completion Documentation:**
  - Detailed: `.kiro/specs/129-consumer-generation-completeness/completion/task-11-completion.md`
  - Summary: `docs/specs/129-consumer-generation-completeness/task-11-summary.md`

  **Post-Completion:** mark complete; `complete-task.sh "Task 11 Complete: Native theme emission (129)"` opens U6's PR; report the URL; STOP. U6's merge fires the MIDPOINT pass.

  - [ ] 11.1 The scaffolded dark-override file: fix it, or file the record (design § 16)
    **Type**: Setup · **Validation**: Tier 1 - Minimal · **Agent**: Ada (Sonnet)
    - _Requirements: 4.2_
  - [ ] 11.2 Fixed binding, holders, instances, providers, the local; resolved values through § 6's converter
    **Type**: Implementation · **Validation**: Tier 2 - Standard · **Agent**: Ada (Sonnet)
    - _Requirements: 4.1, 4.2_
  - [ ] 11.3 Index names and README; product-token emitters (`extension DesignerPunkTheme`, `LocalDPTheme`); the composite refusal
    **Type**: Implementation · **Validation**: Tier 2 - Standard · **Agent**: Ada (Sonnet)
    - _Requirements: 4.8, 5.6_
  - [ ] 11.4 Re-baseline the 094 fixtures; the real-definition tests
    **Type**: Implementation · **Validation**: Tier 2 - Standard · **Agent**: Ada (Sonnet)
    - _Requirements: 1.7, 4.3_
  - [ ] 11.5 Row 12 item 3 colours and Button-CTA bare reads
    **Type**: Implementation · **Validation**: Tier 2 - Standard · **Agent**: Lina (Sonnet)
    - _Requirements: 4.5_

### UNIT 7 — Component theme reads and repairs

- [ ] 12. Component theme reads, the theme-read guard, Progress-Bar and ripple (U7)

  **Type**: Parent · **Validation**: Tier 3 - Comprehensive · **Agent (plan)**: PRIMARY Lina (Sonnet)
  **Traces**: Req 4.4, 4.6, 4.7, 4.10, 8.2, 8.4; rows 14 (A5, A6's ripple part, A7), 15, 16 · design § 13

  **Success Criteria:**
  - A two-sided Jest guard in `src/components/__tests__/` fails on any component `theme.` read the generated Swift or Kotlin does not declare, and on any `DesignTokens.<semantic colour>` read, with a pinned list that only shrinks.
  - The 2 `DesignTokens.<semantic colour>` reads are re-pointed to `theme.`, and the guard's pinned list holds neither.
  - On iOS, row 16's reads in Progress-Bar drop the malformed prefix, accepted by `harness-ios-components` with their entries removed in this diff.
  - On Android, row 16's reads in Progress-Bar drop the malformed prefix, accepted by `harness-android-components` with their entries removed in this diff.
  - Row 15's theme-name defect is accepted by `harness-ios-components` under the non-`DP` consumer, with its entries removed in this diff.
  - Row 15's theme-name defect is accepted by `harness-android-components` under the non-`DP` consumer, with its entries removed in this diff.
  - Every component colour read resolves under Q13 (a), accepted by `harness-ios-components` with no entry tagged to row 2 at this head.
  - Every component colour read resolves under Q13 (a), accepted by `harness-android-components` with no entry tagged to row 2 at this head.
  - `rememberRipple` is replaced by `ripple(...)` at Button-Icon, Input-Checkbox-Base and Input-Radio-Base, accepted by `harness-android-components` with the three entries tagged to row 14's A5, A6 and A7 removed in this diff.
  - A text guard in `lane-functional-root` fails on a `rememberRipple` import in `VerticalListButtonItem.android.kt`, and the import is removed.
  - Row 14's record says that A3, I1–I3, A1, A2, A4 and A6's non-ripple parts move to Spec 132, dated and signed by Lina.

  **Primary Artifacts:**
  - `src/components/core/*/platforms/ios/**`
  - `src/components/core/*/platforms/android/**`
  - `src/components/__tests__/**`
  - `.kiro/issues/2026-10-18-drawn-control-drift-ios-android-web.md`
  - `harness/expected/harness-ios-components.tsv`
  - `harness/expected/harness-android-components.tsv`

  **Completion Documentation:**
  - Detailed: `.kiro/specs/129-consumer-generation-completeness/completion/task-12-completion.md`
  - Summary: `docs/specs/129-consumer-generation-completeness/task-12-summary.md`

  **Post-Completion:** mark complete; `complete-task.sh "Task 12 Complete: Component theme reads and repairs (129)"` opens U7's PR; report the URL; STOP.

  - [ ] 12.1 The two-sided theme-read guard
    **Type**: Implementation · **Validation**: Tier 2 - Standard · **Agent**: Lina (Sonnet)
    - _Requirements: 4.4_
  - [ ] 12.2 Row 16, the 2 re-points, row 15's theme name
    **Type**: Implementation · **Validation**: Tier 2 - Standard · **Agent**: Lina (Sonnet)
    - _Requirements: 4.6, 4.7, 4.10_
  - [ ] 12.3 Ripple, the dead-import guard, row 14's record line
    **Type**: Implementation · **Validation**: Tier 2 - Standard · **Agent**: Lina (Sonnet)
    - _Requirements: 8.2, 8.4_

### UNIT 8 — The component tier reaches `generate`

- [ ] 13. Ship and harvest DesignerPunk's component tokens; precedence; the name contract (U8)

  **Type**: Parent · **Validation**: Tier 3 - Comprehensive · **Agent (plan)**: PRIMARY Ada (Sonnet) · Lina (Sonnet) — enums, row 18 R1, the Spec 123 pointer, the cascade sentence
  **Traces**: Req 1.3, 5.1–5.5, 5.7, 5.8, 5.10, 5.11; rows 18 (R1, R5) · design §§ 9, 11

  **Success Criteria:**
  - The package ships DesignerPunk's six harvestable component token definition files, and `pack-assert` asserts each is present.
  - On iOS, `generate` harvests those definitions into the consumer's output as a third source, with references emitted by name.
  - On Android, `generate` harvests those definitions into the consumer's output as a third source, with references emitted by name.
  - A `Consumer Guard` case that changes a referenced primitive's value finds the component token following it.
  - The harvest reports a definition file that registers no tokens.
  - A consumer group sharing an emitted group name with ours replaces it, and `generate` prints `component tokens: <G> — yours replace DesignerPunk's`, with `(copied at init)` where byte-identical.
  - A package group whose component directory loses the union is not emitted, and `generate` prints `component tokens: <Group> — not emitted (DesignerPunk's <Component> is replaced by yours)`.
  - Two consumer files declaring one group fail `generate` with a message naming both, accepted by a Jest test.
  - A packed-install `Consumer Guard` case that deletes a referenced primitive gets a report from `generate`, and an upgrade that introduces such a reference gets one from `sync`, on every platform's output.
  - `scripts/harness/d2-check.ts` runs in `harness-generate` and concludes success at this unit's head on iOS: every component token in `token-index/components.yaml` appears in the generated output and no other does.
  - `scripts/harness/d2-check.ts` runs in `harness-generate` and concludes success at this unit's head on Android, by the same set equality.
  - The D2 check's completeness half shows the DesignerPunk entries in the merged index equal the component tokens defined in the shipped definition files, and a Jest case that drops one token from both fails.
  - The hand-written `AvatarTokens` and `BadgeLabelBaseTokens` enums are removed from `Avatar.ios.swift` and `BadgeLabelBase.ios.swift` in this diff, and the Android `AvatarTokens` / `GeneratedAvatarTokens` collision is resolved in this diff.
  - `generate` warns, naming the file, on a `.kt` file in `com.designerpunk.tokens` or `com.designerpunk.components.*` outside the skipped trees of design § 9, and a Jest test accepts the warning text.
  - When a consumer's group replaces ours and a shipped component reads a key their group lacks, `sync` reports the key and the component, accepted by a `Consumer Guard` case.
  - `sync`'s pre-123 migration reports a copied single-family component-token file by path and offers the record's fix, accepted by a Jest test.
  - When the generated output is not byte-identical to a fresh regeneration into a temporary directory (outside the header's timestamp), the name-contract run says so, accepted by a `Consumer Guard` case whose inputs change after the last `generate`.
  - `.kiro/specs/123-consumer-distribution/requirements.md` § Requirement 1.5 carries a dated pointer line to `design.md` § 9's signed decision.
  - The Integration Guide says, in Lina's text with Sparky, to import the consumer's own `ComponentTokens.web.css` after the package's `component-tokens.css`, that on web "yours wins" is per token by order, and that bundler code-splitting can reorder CSS chunks.
  - The token and component contexts at this head show every addition this diff makes printed under exception (c) with a tag.

  **Primary Artifacts:**
  - `package.json` (`files[]`)
  - `scripts/pack-assert.ts`
  - `src/cli/loadComponentTokens.ts`
  - `src/cli/sync/**`
  - `src/cli/shared/errorCatalog.ts`
  - `src/generators/**`
  - `src/build/tokens/**`
  - `scripts/harness/d2-check.ts`
  - `scripts/harness/__tests__/d2-check.test.ts`
  - `.github/workflows/native-harness.yml` (one step added to `harness-generate`)
  - `tests/consumer-integration.test.ts`
  - `src/components/core/Avatar-Base/platforms/**`
  - `src/components/core/Badge-Label-Base/platforms/**`
  - `.kiro/specs/123-consumer-distribution/requirements.md`
  - `governance/DesignerPunk-Integration-Guide.md`
  - `docs/consumer/INSTALL.md` (derived)
  - `harness/expected/harness-ios-tokens.tsv`
  - `harness/expected/harness-android-tokens.tsv`
  - `harness/expected/harness-ios-components.tsv`
  - `harness/expected/harness-android-components.tsv`

  **Grant limits** (`.github/**`): as Task 5's, admitting none. The one added step runs `scripts/harness/d2-check.ts`; nothing else in the workflow changes. Thurgood is consulted on the step.

  **Completion Documentation:**
  - Detailed: `.kiro/specs/129-consumer-generation-completeness/completion/task-13-completion.md`
  - Summary: `docs/specs/129-consumer-generation-completeness/task-13-summary.md`

  **Post-Completion:** mark complete; `complete-task.sh "Task 13 Complete: The component tier reaches generate (129)"` opens U8's PR (Peter-merged: `governance/**`; `**Edit kind**:` EXECUTION, Req 15 and design § 9); report the URL; STOP.

  - [ ] 13.1 Ship the six files; harvest as the third source; per-group precedence and reports
    **Type**: Implementation · **Validation**: Tier 2 - Standard · **Agent**: Ada (Sonnet)
    - _Requirements: 5.1, 5.2, 5.3_
  - [ ] 13.2 The name contract over the component tier; the reserved-package warning; R5 freshness (content)
    **Type**: Implementation · **Validation**: Tier 2 - Standard · **Agent**: Ada (Sonnet)
    - _Requirements: 5.4, 5.8_
  - [ ] 13.3 The D2 check and its completeness half; its step in `harness-generate`
    **Type**: Implementation · **Validation**: Tier 2 - Standard · **Agent**: Ada (Sonnet)
    - _Requirements: 1.3, 5.10_
  - [ ] 13.4 The hand-written enums; row 18 R1 (`src/cli/sync/**`, Ada consulted); the missing-key report
    **Type**: Implementation · **Validation**: Tier 2 - Standard · **Agent**: Lina (Sonnet)
    - _Requirements: 5.1, 5.7, 5.11_
  - [ ] 13.5 The Spec 123 Req 1.5 pointer line; the Integration Guide cascade sentence
    **Type**: Documentation · **Validation**: Tier 1 - Minimal · **Agent**: Lina (Sonnet)
    - _Requirements: 5.5_

### UNIT 9 — `generate` reads the consumer's own source

- [ ] 14. The six groups and the theme registry from the consumer's copy (U9)

  **Type**: Parent · **Validation**: Tier 3 - Comprehensive · **Agent (plan)**: PRIMARY Ada (Sonnet) · Sparky (Sonnet) — his charter line · Lina (Sonnet) — regeneration and the lock
  **Traces**: Req 9.2, 9.3, 9.4, 9.5, 15.1 (the served sentences); rows 19, 20 (row (g)) · design § 10

  **Success Criteria:**
  - For each of the six groups `docs/consumer/INSTALL.md` L77 names at `45f5262ee`, a `Consumer Guard` case edits it in the copied source, runs `generate`, and finds the edited value in the output, on web in the generated CSS.
  - With the package's own copies of the six groups removed from the installed `node_modules`, `generate` succeeds with byte-identical output, accepted by a `Consumer Guard` case.
  - `generate` builds the theme registry from the config's `themes`, the static imports at `generateTokenFiles.ts` L19–21 are removed, and in package mode the package's built-in themes still apply.
  - `ConfigTheme` accepts an optional `{ light, dark }` form, and `init` writes the WCAG entry with both maps.
  - `Consumer Guard` cases for a config with no `themes` key, for the old shape without a WCAG dark map, and for package mode each assert that the `:root[data-theme="wcag"]` block and the base `light-dark()` values are byte-identical to the pre-129 output for the same fixture.
  - When a built-in theme's override file is missing from the consumer's copy, `generate` prints that the theme or mode is not emitted and names the file.
  - A registered custom theme emits as `:root[data-theme="<name>"]`, and the `generate` message "registered, not applied yet" (`errorCatalog.ts` L557) changes in this diff.
  - The web agent's line on registered themes (`canonical/agents/sparky.md` L313 at `d7f87174c`) states what web now emits, in Sparky's words, regenerated with `diff-guard.ts` green and its signature redone.
  - The served sentences that say a registered theme is "not applied yet" (`governance/Rosetta-System-Architecture.md` L566, `governance/Token-Quick-Reference.md` L114 and the Integration Guide L546 at `d7f87174c`) state what is emitted, each in its owner's words, in this diff.
  - A Jest guard fails on a new value import from `src/tokens` under `src/generators`, `src/providers`, `src/resolvers` and `src/blend`.
  - A Jest test fails when the repository's root token files differ from a fresh generation from the base config.
  - The completion doc states which `ColorTokens.ts` importers this parent removed and which remain, and `.kiro/specs/133-color-track/design-outline.md` § 4 is corrected to match in this diff.
  - Kenya and Data confirm, in this parent's completion doc, the harness input when the consumer owns `src/tokens/platforms/{ios,android}/**`, and the harness compiles the consumer's copy of `MotionTokens` if they so confirm.

  **Primary Artifacts:**
  - `src/generators/generateTokenFiles.ts`
  - `src/generators/**`
  - `src/providers/**`
  - `src/resolvers/**`
  - `src/blend/**`
  - `src/config/**`
  - `src/cli/**`
  - `src/tokens/**`
  - `tests/consumer-integration.test.ts`
  - `.kiro/specs/133-color-track/design-outline.md`
  - `scripts/harness/consumer.ts`
  - `harness/ios/**` (only if Kenya and Data confirm the input change)
  - `harness/android/**` (only if Kenya and Data confirm the input change)
  - `canonical/agents/sparky.md`
  - `canonical/generated.lock`
  - `.claude/agents/**` (regenerated, never hand-edited)
  - `.kiro/agents/**` (regenerated, never hand-edited)
  - `governance/Rosetta-System-Architecture.md`
  - `governance/Token-Quick-Reference.md`
  - `governance/DesignerPunk-Integration-Guide.md`
  - `docs/consumer/INSTALL.md` (derived)

  **Completion Documentation:**
  - Detailed: `.kiro/specs/129-consumer-generation-completeness/completion/task-14-completion.md`
  - Summary: `docs/specs/129-consumer-generation-completeness/task-14-summary.md`

  **Post-Completion:** mark complete; `complete-task.sh "Task 14 Complete: generate reads the consumer's own source (129)"` opens U9's PR (Peter-merged: `governance/**` and charter text; `**Edit kind**:` per file); report the URL; STOP.

  - [ ] 14.1 One loaded token set from the consumer's barrel; the value-import guard; the removal case
    **Type**: Implementation · **Validation**: Tier 2 - Standard · **Agent**: Ada (Sonnet)
    - _Requirements: 9.2, 9.5_
  - [ ] 14.2 The theme registry from config; the fallback; package mode; the `{ light, dark }` form
    **Type**: Implementation · **Validation**: Tier 2 - Standard · **Agent**: Ada (Sonnet)
    - _Requirements: 9.2, 9.3_
  - [ ] 14.3 Row (g)'s freshness test; the 133 outline correction; the harness input confirmation
    **Type**: Implementation · **Validation**: Tier 2 - Standard · **Agent**: Ada (Sonnet)
    - _Requirements: 9.4_
  - [ ] 14.4 The shipped and served sentences on registered themes; the web agent line; regeneration and signature
    **Type**: Documentation · **Validation**: Tier 2 - Standard · **Agent**: Ada (Sonnet), Sparky (Sonnet), Lina (Sonnet)
    - _Requirements: 15.1_

### UNIT 10 — `init` runs `generate`; per-platform output paths

- [ ] 15. `init` runs `generate`, and `platforms:` writes each platform where its build reads it (U10)

  **Type**: Parent · **Validation**: Tier 3 - Comprehensive · **Agent (plan)**: PRIMARY Ada (Sonnet) · Thurgood (Sonnet) — INSTALL derivation and `install-doc.test.ts`
  **Traces**: Req 11.1–11.4, 12.1–12.4 · design §§ 12a, 14

  **Success Criteria:**
  - After `init` alone, a `Consumer Guard` case finds the token output and `token-index/`, and a `generate` run straight after writes byte-identical output.
  - Personal-note creation stays in the CLI layer, and `src/generators/generateTokenFiles.ts` gains no personal-note code.
  - When `generate` fails inside `init`, `init` finishes the config, the copied token source and the agent layer, prints `generate`'s message led by the re-run command, and exits non-zero, accepted by a `Consumer Guard` case.
  - INSTALL's founder path has the four steps of design § 14 in Leonardo's text, its `path-steps` front matter reads `founder: 4`, and `install-doc.test.ts` passes, all in this diff.
  - `init`'s closing message names the output folder and `generate`'s role in design § 14's words.
  - The config accepts `platforms:` with keys from `PLATFORM_KEYS = ['web', 'ios', 'android']` in `src/config/`, and the CLI validation imports the constant.
  - A `Consumer Guard` case with a `platforms:` config finds each named platform's files at its path and every other platform, web included, at `output`.
  - An unknown platform key, or a path resolving outside the project root, fails `generate` with a message naming it, accepted by Jest tests.
  - A folder `platforms:` names holds only that platform's files, and `pack-assert` fails when a generated native file name equals a packaged native source file name.

  **Primary Artifacts:**
  - `src/cli/init.ts`
  - `src/cli/**`
  - `src/config/**`
  - `src/generators/generateTokenFiles.ts`
  - `scripts/pack-assert.ts`
  - `tests/consumer-integration.test.ts`
  - `governance/DesignerPunk-Integration-Guide.md`
  - `docs/consumer/INSTALL.md`
  - `scripts/derive-install-doc.ts`
  - `scripts/__tests__/install-doc.test.ts`

  **Completion Documentation:**
  - Detailed: `.kiro/specs/129-consumer-generation-completeness/completion/task-15-completion.md`
  - Summary: `docs/specs/129-consumer-generation-completeness/task-15-summary.md`

  **Post-Completion:** mark complete; `complete-task.sh "Task 15 Complete: init runs generate; per-platform output paths (129)"` opens U10's PR (Peter-merged: `governance/**`); report the URL; STOP.

  - [ ] 15.1 `init` runs `generate`; the failure path; the closing message
    **Type**: Implementation · **Validation**: Tier 2 - Standard · **Agent**: Ada (Sonnet)
    - _Requirements: 11.1, 11.2, 11.4_
  - [ ] 15.2 INSTALL's founder count and `path-steps`; the derivation and its test
    **Type**: Documentation · **Validation**: Tier 2 - Standard · **Agent**: Thurgood (Sonnet)
    - Leonardo consulted on the step text
    - _Requirements: 11.3_
  - [ ] 15.3 `platforms:`, `PLATFORM_KEYS`, validation, the file-name check
    **Type**: Implementation · **Validation**: Tier 2 - Standard · **Agent**: Ada (Sonnet)
    - _Requirements: 12.1, 12.2, 12.3, 12.4_

### UNIT 11 — Charter and overlay text for item (i)

- [ ] 16. Kenya's and Data's theming text, and the consumer overlays, say what is emitted (U11)

  **Type**: Parent · **Validation**: Tier 3 - Comprehensive · **Agent (plan)**: PRIMARY Kenya (Sonnet) · Data (Sonnet) — his charter and overlay · Lina (Sonnet) — regeneration and the lock
  **Traces**: Req 4.9

  **Success Criteria:**
  - `canonical/agents/kenya.md`'s theming section states what item (i) emits on iOS (design § 4's names), and Kenya re-confirms it.
  - `canonical/agents/data.md`'s theming section states what item (i) emits on Android (design § 4's names), and Data re-confirms it.
  - `canonical/profiles/consumer/kenya.overlay.md` and `data.overlay.md` no longer carry their "no theme surface today" lines, and each states what is emitted.
  - `npx tsx tools/agent-generator/diff-guard.ts` is green on the branch, and `canonical/generated.lock` is the one a green run wrote.
  - The consumer-profile signatures for the changed units are redone by their signers, and `npx tsx tools/agent-generator/regrounding/verify-signing-chain.ts --audit --pr <n>` is green, with no authoring commit moving a `canonicalHash`.
  - The U11 PR merges before the S of the release that first carries U6.

  **Primary Artifacts:**
  - `canonical/agents/kenya.md`
  - `canonical/agents/data.md`
  - `canonical/profiles/consumer/kenya.overlay.md`
  - `canonical/profiles/consumer/data.overlay.md`
  - `canonical/generated.lock`
  - `.claude/agents/**` and `.kiro/agents/**` (regenerated, never hand-edited)

  **Completion Documentation:**
  - Detailed: `.kiro/specs/129-consumer-generation-completeness/completion/task-16-completion.md`
  - Summary: `docs/specs/129-consumer-generation-completeness/task-16-summary.md`

  **Post-Completion:** mark complete; `complete-task.sh "Task 16 Complete: Charter and overlay text for item (i) (129)"` opens U11's PR (Peter-merged: charter text; `**Edit kind**:` per file); report the URL; STOP.

  - [ ] 16.1 Charter and overlay text
    **Type**: Documentation · **Validation**: Tier 2 - Standard · **Agent**: Kenya (Sonnet), Data (Sonnet)
    - _Requirements: 4.9_
  - [ ] 16.2 Regenerate, lock, signatures
    **Type**: Implementation · **Validation**: Tier 2 - Standard · **Agent**: Lina (Sonnet)
    - Signatures are the signers' attestations, outside every delegated-tier line
    - _Requirements: 4.9_

### UNIT 12 — Closeout

- [ ] 17. Retire the native root files and announce it (U12)

  **Type**: Parent · **Validation**: Tier 3 - Comprehensive · **Agent (plan)**: PRIMARY Ada (Sonnet)
  **Traces**: Req 10.1, 10.2, 10.4 · design § 0 (7 (a))

  **Success Criteria:**
  - The package stops shipping `dist/DesignTokens.ios.swift`, `dist/DesignTokens.android.kt`, `dist/ComponentTokens.ios.swift` and `dist/ComponentTokens.android.kt`, and `pack-assert` asserts each is absent.
  - `dist/ComponentTokens.web.css` and the web CSS exports still ship, and `pack-assert` asserts each is present.
  - This change lands in a minor release after a release that carries U6 and U8 (Peter's 7 (a)), and the completion doc names both releases.
  - The release that retires them announces the retirement in its notes, and those notes name item (iii), I-1 and I-2 as changes that may break a consumer.
  - Charter item (iii) in `.kiro/issues/2026-10-02-consumer-generation-completeness-spec.md` matches this parent, edited by Ada.

  **Primary Artifacts:**
  - `package.json` (`files[]`)
  - `scripts/pack-assert.ts`
  - `scripts/generate-platform-tokens.ts`
  - `CHANGELOG.md`
  - `.kiro/issues/2026-10-02-consumer-generation-completeness-spec.md`

  **Completion Documentation:**
  - Detailed: `.kiro/specs/129-consumer-generation-completeness/completion/task-17-completion.md`
  - Summary: `docs/specs/129-consumer-generation-completeness/task-17-summary.md`

  **Post-Completion:** mark complete; `complete-task.sh "Task 17 Complete: Retire the native root files (129)"` commits on the U12 branch (no PR: U12's PR opens at Task 18); STOP.

  - [ ] 17.1 `files[]`, `pack-assert`, the build script; release-note text
    **Type**: Implementation · **Validation**: Tier 2 - Standard · **Agent**: Ada (Sonnet)
    - _Requirements: 10.1, 10.2, 10.4_

- [ ] 18. Acceptance at the final head, and the shipped wording (U12)

  **Type**: Parent · **Validation**: Tier 3 - Comprehensive · **Agent (plan)**: PRIMARY Thurgood (Sonnet) · Kenya (Sonnet), Data (Sonnet) — the "Native status" passage
  **Traces**: Req 1.1–1.7, 2.10, 14.1, 14.3, 15.1, 15.5, 15.6, 9.3

  **Success Criteria:**
  - The quotation in `requirements.md`'s Introduction is byte-identical to the charter's acceptance sentence at `b841db957`.
  - At U12's head, `harness-ios-tokens` concludes success with zero entries on its list (D1, iOS).
  - At U12's head, `harness-android-tokens` concludes success with zero entries on its list (D1, Android).
  - At U12's head, the D2 check concludes success on iOS.
  - At U12's head, the D2 check concludes success on Android.
  - At U12's head, `harness-ios-components` concludes success, and every entry on its list is tagged to an open root record whose Trigger can fire, none to row 12, row 14's A5, A6 (ripple) or A7, row 15 or row 16 (D3, iOS).
  - At U12's head, `harness-android-components` concludes success, and every entry on its list is tagged to an open root record whose Trigger can fire, none to row 12, row 14's A5, A6 (ripple) or A7, row 15 or row 16 (D3, Android).
  - Lina's component-repair record is at the issues root, its Trigger can fire, and the remaining component entries are tagged to it.
  - At U12's head, `Consumer Guard` concludes success, including the `var()` check of Task 8.
  - All four harness contexts ran on every 129 unit PR, each cited by run URL in this parent's completion doc.
  - A grep of the CHANGELOG, INSTALL, the Integration Guide, the READMEs, the consumer overlays, the served corpus and `generate`'s messages at each release S in 129's range finds no claim that a tier "compiles" while its list held entries, and each release that carried the harness says "compile except N pinned errors, listed at <path>; no app linked, no tests run" with N its count at S.
  - Where item (i) shipped in a release before Task 14's U9, that release's CHANGELOG limitation was rewritten to say what still came from the package (Req 9.3), or the completion doc states it did not arise.
  - The Integration Guide's "Native status" passage states 129's reach as Requirement 1 accepts it, in Kenya's and Data's words, as a CORRECTION edit, with "compiled for an iOS 17.0 deployment target; not run on any device or simulator".
  - `governance/Token-Governance.md` § "Theme Registry (Spec 094)" matches items (i) and (vi) as shipped, through a ratified ballot applied before the S of the release that carried U9.
  - `derivePlatformReadiness`'s native test patterns in `application-mcp-server/src/indexer/ComponentIndexer.ts` are unchanged over 129's range, by `git log` over that range on the file.
  - No 129 shipped text claims runtime theme switching on iOS or Android.

  **Primary Artifacts:**
  - `governance/DesignerPunk-Integration-Guide.md`
  - `docs/consumer/INSTALL.md` (derived)
  - `.kiro/specs/129-consumer-generation-completeness/evidence/harness-stability.md`

  **Completion Documentation:**
  - Detailed: `.kiro/specs/129-consumer-generation-completeness/completion/task-18-completion.md`
  - Summary: `docs/specs/129-consumer-generation-completeness/task-18-summary.md`

  **Post-Completion:** mark complete; `complete-task.sh "Unit 12: Closeout (129)"` opens U12's PR (Peter-merged: `governance/**`); report the URL; STOP. U12's merge fires CLOSEOUT and the signing-act shape review.

  - [ ] 18.1 Read the final head: D1, D2, D3, web, every unit PR's runs
    **Type**: Implementation · **Validation**: Tier 2 - Standard · **Agent**: Thurgood (Sonnet)
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 2.10_
  - [ ] 18.2 The release-text grep over 129's range; the Req 9.3 read; the readiness-pattern read
    **Type**: Implementation · **Validation**: Tier 2 - Standard · **Agent**: Thurgood (Sonnet)
    - _Requirements: 1.7, 9.3, 14.1, 15.1_
  - [ ] 18.3 The "Native status" passage
    **Type**: Documentation · **Validation**: Tier 1 - Minimal · **Agent**: Kenya (Sonnet), Data (Sonnet)
    - _Requirements: 15.5_
  - [ ] 18.4 Confirm the Token-Governance ballot was ratified and applied in time
    **Type**: Setup · **Validation**: Tier 1 - Minimal · **Agent**: Thurgood (Sonnet)
    - _Requirements: 15.6_

---

## Traceability

| Requirement | Parents |
|---|---|
| 1 | 18 (1.1–1.7); 8 (1.6's check); 13 (1.3's check); 1 (1.8); 1.9 is a standing rule (Conventions) |
| 2 | 1 (2.1–2.3); 3, 4 (2.4, 2.6–2.9); 2 (2.6's cross-tier rule); 5 (2.5, 2.10–2.12, 2.14); 18 (2.10 over every unit PR); 2.13 is a standing rule (Conventions) |
| 3 | 2 (3.1–3.11); 3, 4 (3.4, 3.11 per platform); 6 (3.10's registration) |
| 4 | 11 (4.1–4.3, 4.5, 4.8); 12 (4.4, 4.6, 4.7, 4.10); 16 (4.9); 4.7's L816 half is a unit precondition |
| 5 | 13 (5.1–5.5, 5.7, 5.8, 5.10, 5.11); 11 (5.6); 9 (5.9) |
| 6 | 8 (6.2, 6.10); 9 (6.3–6.5, 6.7–6.9) |
| 7 | 8 |
| 8 | 12 (8.2, 8.4) |
| 9 | 14 (9.2–9.5); 18 (9.3's read) |
| 10 | 1 (10.3); 17 (10.1, 10.2, 10.4) |
| 11 | 15 |
| 12 | 15 |
| 13 | 10 |
| 14 | 18 (14.1, 14.3) |
| 15 | 7 (15.2); 8 (15.4 for the shadow family); 18 (15.1, 15.5, 15.6); 15.4 is also a standing rule (Conventions) |
