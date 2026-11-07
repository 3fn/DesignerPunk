# Implementation Plan: 129 — Consumer-Generation Completeness

**Date**: 2026-11-05
**Spec**: 129 - Consumer-Generation Completeness
**Status**: Merged at R2 (#678, `8d8ba1425`), with the seven R1 reviews, the Q3a addendum and Peter's Decision 6 answer folded in. **Amendment 1** (2026-11-06) folds Stacy's verifiability read of the merged file, `[STACY TASKS R2]`, requested by Peter ("Have Stacy check the tasks first", 2026-11-06T00:07:00Z), with `[THURGOOD R3]` notes (`feedback/tasks.md`). Execution starts after this file merges (Spec-Feedback-Protocol § "Sequential Formalization Gate").
**Amendment 5** (2026-11-07) moves the component-repair record's filing to before U1's component lists commit, and records that the blend entries outlast 129, under Peter's "a; blend entries fine", received 2026-11-07T02:04:38Z (`evidence/2026-11-07-peter-ruling-component-repair-record-timing.md`) (`feedback/tasks.md` `[THURGOOD R11]`).
**Amendment 3** (2026-11-06) carries Peter's theme rulings of 2026-11-06T22:38:12Z (`evidence/2026-11-06-peter-rulings-theme-and-downloads.md`), 23:31:58Z and 23:37:03Z (`evidence/2026-11-06-peter-rulings-round-3.md`) into Tasks 3, 4, 5, 6, 11, 14 and 16 and Decision 6 condition 3, with `requirements.md` Req 2.3, 2.4, 4.1 and 5.6 and `design.md` §§ 0, 2, 4 and 10 amended in place (`feedback/tasks.md` § "Tasks amendment 3", `[THURGOOD R6]`).
**Amended in this round**: `requirements.md` Requirements 10.1 (Ada R1) and 9.5 (Lina, the Q3a bridge), and `design.md` § 10 (the registration-keyed built-in bridge, Ada and Lina), each with a dated line in place.
**Author**: Thurgood (formalizer). Each parent names its PRIMARY; that seat's call governs its parent's how, within `requirements.md` and `design.md`.
**Go**: Peter, received 2026-11-05T22:48:15Z (`date -u` at receipt; orchestrator relay), verbatim: "673 and 675 are merged; go for tasks". What he read: "Your go for 129's tasks round. That's where the work is cut into units, and the compile check is built first."
**Dependencies**: as `requirements.md` header and `design.md` header. Spec 132 (planned, no directory) receives what 129 does not close; its deliverables, and its measured-cost record, are not tasks here.
**Facts**: `evidence/facts-at-d7f87174c.md`, the unedited stdout of `bash .kiro/specs/131-governance-simplification/evidence/spec-facts.sh 129 4d10202b2 d7f87174cc3af9593c8c1ab3831fbdfdd254e5f5`. Its row 3 names one record whose Trigger is this file (`2026-09-17-platform-build-verification-harness-candidate.md`); § "Merge preconditions" carries it. `main` has not moved since.
**Criteria mode**: per-parent

---

## Implementation Plan

The compile harness is built first (U1), because every native "compiles" in 129 is accepted by it, and today's error counts hide each other until the first token fixes land (plan-r2 § 2). The comparator's falsification suites are then registered as named in-lane guards (U2). Generation follows in the order the seats measured: colours, shadows and the standalone native fixes (U3); the native type table with its same-PR component couplings (U4), after which the component repair is sized honestly; the validators, which depend on nothing else (U5); theme emission (U6) and the component theme reads (U7); the component-tier harvest (U8); the consumer's own source (U9); `init` and per-platform paths (U10); the charter and overlay text item (i) owes (U11); and the closeout (U12), which retires the native root files and reads the acceptance at the final head.

### Conventions for every parent

- **Instruments (M1, not M4).** The instruments parser has not merged at `d7f87174c`, so `P` does not exist and **no parent here carries an `**Instruments:**` block** (Process-Spec-Planning § "The Instruments block (M4)"). The parser record is re-ruled to the next spec's tasks round by #680. Each parent's PRIMARY writes `completion/task-<N>-instruments.md` before the first subtask, in M1's execution-time form (Start Up Tasks item 8); any `MISSING` row stops the subtasks that depend on it.
- **Completion docs.** Each parent's doc reproduces every Success Criteria bullet verbatim with Status and Evidence, carries the forced-negative line, the `**Instruments**:` header line and the `**Delegated-tier**:` line (Completion Documentation Guide). Every subtask gets its three-element doc (S-4).
- **A unit closes the records it fires** (Stacy R1 § 2.A.1). A record re-ruled to `path:…/completion/task-<N>-completion.md` fires when that doc reaches `main`, at its unit's merge. So that unit's PR, or an owner's PR merged before it, carries each such record's rule 5 outcome line or a re-ruled Trigger with a dated reason, in the owner's act (README rules 9 and 11). Each gating parent carries this as a criterion.
- **A unit carries the records its diff fires** (`[STACY TASKS R2]` High-3). Before PR-open, the unit's author lists every root record whose `path:` Trigger glob the diff touches: the issues root's Trigger tokens, matched against `git diff --name-only <base>...HEAD`. The PR, or an owner's PR merged before it, carries each one's owed act: rule 5's outcome line or a re-ruled Trigger, by the record's owner. The PR body names the list, or says it is empty. Three records are at risk because units off the chain may reach their paths first: `2026-09-27-progress-token-harvest-may-not-cross-dual-instance-boundary.md` (Ada), `2026-10-12-generate-staleness-decided-by-file-times.md` (Ada) and `ios-readonly-focusable-prototype.md` (Kenya). *(Amended 2026-11-06, tasks amendment 1, `[STACY TASKS R2]` High-3; prior text at `8d8ba1425`.)*
- **Every unit records its harness runs** (Req 2.10, 2.13; Stacy R1 § 1). A completion doc is committed before the PR's last push, so it cannot cite runs at the head that merges. Each gating parent's completion doc therefore cites, for each of the four contexts, the PR, the run URL at **head H**, the comparator's summary line pasted, and the SHAs of the list file and `harness/pins.yaml` at H. **H** is the last head whose diff to the merged head **M** (`git diff --name-only H M`) touches only `completion/**`, `docs/specs/**` and the records the PR carries. Task 18 and Stacy's passes read the four contexts' conclusions at **M** from the checks API. Run logs expire, so the summary line is pasted, not linked. *(Amended 2026-11-06, tasks amendment 1, `[STACY TASKS R2]` High-1; prior text at `8d8ba1425`.)*
- **A fix and its list edit land in the same diff** (Req 3.3). Before PR-open, a unit author dispatches the harness against the unit branch, because the harness is not in `complete-task.sh`'s `REQUIRED_WORKFLOWS` while it measures: `gh workflow run native-harness.yml --ref <branch>`. GitHub triggers `workflow_dispatch` only for a workflow whose file is on the default branch (ballot `2026-09-27-b-ci-unit-branch-ci-feedback` L197), and U1 creates `native-harness.yml`. So a dispatch-only stub of that file merges to `main` before U1 dispatches anything, and the first dispatch against the unit branch is a probe that shows the run used the branch's copy of the file (§ "Unit preconditions"). *(Amended 2026-11-06, tasks amendment 2, Peter's Decision 1, "1 A", received 2026-11-06T14:04:52Z; prior text at `33380114c`.)*
- **A row a harness context accepts** has an entry tagged to its record on that context's list before the PR that fixes it, or its parent names the interim instrument (Req 2.14).
- **Token documentation** changes in the same PR as a token it describes (Req 15.4).
- **Limitation sentences** that a merged unit makes false are rewritten in one Integration Guide PR before each release's S, with INSTALL re-derived (Req 15's batching rule, moved here from R1 Requirement 15.3; Thurgood derives). INSTALL L84–L85 ("no theme surface yet") ride the first such PR after U6 (Kenya R1).
- **Sub-suites.** `npm test` does not run `test:consumer`, `test:scripts`, the `mcp-server` or the `application-mcp-server` suites. A parent whose artifacts those suites read runs them before completion and says so.
- **Edit kind and consult lines.** A PR touching `governance/**`, `.kiro/steering/**`, `.kiro/docs/ballots/**` or `canonical/agents/**` carries one `**Edit kind**:` line per file, and is Peter-merged under the standing carve-out. A unit PR touching a trigger surface carries `**Consulted**:`.
- **Signed charter text** (Tasks 14 and 16). The authoring commit never moves a `canonicalHash`. The profile author (Thurgood) re-quotes the operative-set items, re-grounds the overlay pins and writes the dispositions; the owner seat's confirmation and the signers' signatures are their own acts after the authoring commits, need no grant (ballot `2026-10-01-signing-act-chain`), and are checked by `verify-signing-chain.ts --audit --pr <n>`. Each signing commit runs as `git commit … && git log -1 --format='%H %s'`.
- **A D1, D2 or D3 row** changes only with Peter's dated words on the record first (Req 1.9).

### The list file format, the pin file and the run policy (decided here, Thurgood: Req 3's "the tasks round's")

- **Lists**: `harness/expected/<context>.tsv`, one per harness context. One entry per line, sorted by key, then tag. Tab-separated fields: the key (`<root>:<path> | <message>`, design § 1 K-2 and § 2), the count, the tag (a root record's file name, optionally `#<item label>`), and an optional `retagged=<YYYY-MM-DD>,<owner>,<from-record>` field. A `#` comment line is allowed only above the first entry. One line per entry keeps two PRs from conflicting unless they edit the same key (Thurgood R3 fold-back).
- **The `gen:` path rule** (Kenya R1, with Data's condition): a `gen:` key's path is relative to that platform's generated output folder, not to the consumer root, and each lane reads that folder from the consumer's config (`platforms.<platform>.output`, else `output`), never from a hard-coded path. Moving a platform's folder through `platforms:` then re-keys nothing.
- **Pins**: one file, `harness/pins.yaml`, with `consumer`, `ios` and `android` sections. Req 3.5 (a) compares parsed values, so a comment or whitespace edit changes no pin.
- **Protected set**: `harness/protected-set.txt`, one record file name per line, sorted: the 129 intake records of `requirements.md` § "Record dispositions" plus rows 1, 3, 4, 15 and 22.
- **Job names**: `harness-generate` (confirmed), then the four contexts of the requirements' Conventions. Each job also has a `(unit-branch)` name on `workflow_dispatch`, as every workflow in this repo does.
- **Run policy (Req 2.10)**: `on: pull_request` with no `paths:` filter, plus `workflow_dispatch`. All four contexts run on every PR, a docs-only or records-only 129 unit PR included, so Req 2.10 never rests on a filter (Stacy design R1 § 2 item 5). The cost is a macOS run on every PR while the lanes measure; Peter accepted it with decision 6 (below).
- **The first full run (U1)**: the first run of `native-harness.yml` against the unit branch, after Tasks 3 and 4 have joined it, in which every compile of all four contexts reaches the comparator with an outcome, and which is not the forced-failure run. Reaching the comparator is read from each context's `harness-verdict` check annotation, which outlasts the logs. "With an outcome" is read from the comparator's output, which Task 5's completion doc pastes for that run: each context's summary line and every `FAIL` line, none of them a `pre-compile` failure. Task 5's baseline lists are committed from it, and Kenya's Xcode 26.6 fixture (2.2) is cut from its iOS log. Under Decision 1's option A it is a dispatched run, so it has no merge base and checks no additions (design § 3 rule 3); exception (b) is checked when the lists reach U1's PR. *(Added 2026-11-06, tasks amendment 2, under Peter's Decision 1, "1 A", received 2026-11-06T14:04:52Z.)*
- **The Xcode pin (K-7)**: the newest stable Xcode 26 minor on the `macos-26` image at the unit's cut, with the readme's image version recorded. At this round's read (`actions/runner-images` `images/macos/macos-26-arm64-Readme.md`, image `20261026.0455.2`, `curl` 2026-11-05) that is Xcode 26.6 (`17F113`); Xcode 27 is only a public preview. No runner label beyond `macos-26` is needed, so Kenya's fork does not reach Peter (K-7, "When it becomes Peter's"; Kenya R1 confirms).

### Decision 6 — runner classes and the promotion criterion (**ruled**, Peter)

**Peter's answer**, received 2026-11-05T23:42:17Z (`date -u` at receipt; orchestrator relay), verbatim: "6 (a) with Kenya's condition; #676 (a) with the four fixes". The "#676" half is outside 129. **"6 (a)"**: the standard runners `macos-26` (Xcode per K-7) and `ubuntu-24.04` are approved now, and so is the promotion rule below. **"Kenya's condition"** is the softening in `[KENYA D6]`, which he read: the iOS checks are offered only after the Android ones, and only once three cold runs have measured the macOS queue time; if that queue time is poor, the iOS checks fall to promote-at-closeout. It is written as condition 5 below. The three seats consulted all picked (a): `[KENYA D6]`, `[DATA D6]` and `[STACY D6]`, spliced in `feedback/tasks.md` § "Decision 6 consult".

The criterion the requirements ask this round to write (Req 2.12). A harness context is **offered to Peter for promotion** when all of these hold, each read from `evidence/harness-stability.md`:
1. its floor (Req 3.4) and toolchain match (Req 3.11) are in place, and their falsification cases pass in `lane-functional-root`;
2. **10 consecutive pull-request runs** with no break. In order of run, a verdict change between two runs must come with a different head SHA; a run whose attempts end with different conclusions is a break; a `cancelled` or `timed_out` conclusion, or a job that failed before the comparator ran, is a break (read from the context's check annotations: a job with no `harness-verdict` annotation failed before the comparator ran; clarified 2026-11-06, tasks amendment 2, `[STACY TASKS R3]` Medium-4, measuring the ruled condition and changing nothing in it); a break restarts the count;
3. three cold-cache runs, each under the 10-minute ceiling (125-A Req 6.3). For an Android context, a run counts as cold when its job's check annotation reads `cache: miss` **and the run is a pull-request run**; a dispatched run does not count toward them. The Android job writes `::notice title=cache::<hit|miss>` after its cache-restore step, because step logs expire and the annotations endpoint does not (amended 2026-11-06, `[STACY TASKS R2]` Medium-1). For an iOS context, which has no dependency cache because `swiftc` resolves no package, every run counts as cold, and the three are the first three **pull-request** runs recorded at the current Xcode pin; a dispatched run does not count toward them *(clarified 2026-11-05, `[KENYA D6 R2]`; amended 2026-11-06, tasks amendment 2, Peter's Decision 2, "2 yes", received 2026-11-06T14:04:52Z, on Kenya's proposal to count only pull-request runs; prior text at `33380114c`)*. **On both platforms, a run counts only if its context reached the comparator**: its check annotations carry `harness-verdict`, which the context writes on a PASS verdict and on a FAIL verdict alike (Task 5). A run that died before comparing (a failed network fetch, a lane self-test failure, a toolchain that is missing or cannot be set up, a setup failure, a runner fault) does not count toward the three. A toolchain pin mismatch is not among them: the comparator reports it as `toolchain`, so that run reaches the comparator and counts like any FAIL (design § 3; `[THURGOOD R7]` fork 2, on `[DATA R4]` item 2; prior text at `d3dd101b9`: "a lane self-test, toolchain or setup failure") *(amended 2026-11-06, tasks amendment 3, under Peter's "D yes", received 2026-11-06T23:31:58Z (`evidence/2026-11-06-peter-rulings-round-3.md`), on Data's two proposals, `[DATA R3]` item 5: the Android clause counts only pull-request runs, as Decision 2 ruled for iOS at 14:04:52Z, and on both platforms only a run that reached the comparator counts. Prior text at `233e04bf1`: the Android clause read `cache: miss` alone, and neither clause named the comparator)*;
4. for an iOS context, the pinned Xcode is still on the `macos-26` image at the offer, by the readme read then;
5. **for an iOS context (Kenya's condition, ruled)**: both Android contexts are already promoted, and condition 3's three runs of that iOS context record their macOS queue time and duration in the stability record. Both are measured for that iOS job alone, excluding `harness-generate` (an ubuntu job shared with Android and measured there), from the Actions jobs API: from `max(created_at, harness-generate.completed_at)` to `completed_at`. Whether `created_at` for a job under `needs:` is the run's start or its dependency's finish is UNVERIFIED, and the `max` holds either way (amended 2026-11-06, `[STACY TASKS R2]` Medium-1). If any of those three runs' queue time plus its duration exceeds 10 minutes, the queue time is poor. That iOS context is then not offered during 129 and becomes a promote-at-closeout offer. *(The 10-minute bound reuses 125-A Req 6.3's ceiling. Kenya confirmed it, and both clarifications are hers, 2026-11-05, `[KENYA D6 R2]`; they clarify the ruled condition and open no new choice.)*

**The stability record is computed, not kept** (Stacy R1 § 3): `evidence/harness-stability.md` is the committed output of `scripts/harness/stability.ts` over the checks API, the check-run annotations endpoint and the Actions jobs API (run id, head SHA, attempt, conclusion, the `cache` annotation, `created_at`, `started_at`, `completed_at` and duration, per context). It covers runs up to its own commit, names its source endpoints, and is re-run before each offer. **Order**: the Android contexts first (the `ubuntu-24.04` class the gate already depends on), then the iOS contexts. **What each promotion is**: Peter's act per context, in one recorded change: `EXPECTED_CONTEXTS` +1 in `tools/agent-generator/verify-gate-registration.sh` (an issue-row grant naming that act, or Peter), the branch-protection setting (Peter), and `REQUIRED_WORKFLOWS` +1 in `.kiro/hooks/complete-task.sh` at the first promotion (Thurgood). Each fires Stacy's ARMING read. **Runner classes**, approved by Peter's "6 (a)": `macos-26` and `ubuntu-24.04`, standard hosted runners, pinned by version in `runs-on`, never `-latest`; no billed larger runner.

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

**Order and dependencies.** The chain: U1 → U2 → U3 → U4 → U6 → U7 → U8 → U9 → U12. Beside it, at Peter's direction: U5 and U10 depend only on U2, and **U11 depends only on U6** (Kenya R1: it must merge before the S of the first release carrying U6, which a chain position after U9 could not guarantee). Each unit still branches from `main` after the unit it follows merges, and lock-carrying PRs merge one at a time. Why this order: U3's colour converter is what U4's import lists and U6's theme members emit through (design §§ 5, 6; Req 6.5's coupling); U4's type table is what `ComponentTokens` and the theme compile against; U7 follows U6 (design § 13); U8 needs U4's `ComponentTokens` form; U9's theme registry feeds U6's instances (design § 10); U12 is last. If U9 changes something U11's text states, U9's PR carries the one-line charter correction.

**The midpoint carrier**: U6 (Stacy R1 confirms). It is the sixth of twelve units, and its merge is the first point at which D1's probe reads a theme (design § 4). MIDPOINT fires once, at U6's merge, scoped to the parents merged by then (U5, U10 or U11 included if they merged first). The record's path is `completion/claims-pass-midpoint.md`, never `completion/claims-pass.md`.

### Sizes (the seats' R1 estimates, in sessions)

Each figure is the named seat's own (`feedback/tasks.md`, R1 entries), or the plan-r2 § 8 figure where no seat re-estimated. Confidence: H high, M medium, L low.

| Parent | Estimate | Seat (confidence) |
|---|---|---|
| 1 | 1.25 | Ada (M) |
| 2 | 1–1.5 (comparator and suites 0.5–1; Swift parser 0.25; Kotlin parser 0.25) | Thurgood (plan-r2, M); Kenya (H); Data (M–H) |
| 3 | 1 | Kenya (M) |
| 4 | 1 | Data (M) |
| 5 | 0.75–1 (iOS steps 0.25; Android steps 0.25; wiring, baselines, fault run and the stability script 0.25–0.5) | Kenya (M); Data (M); Thurgood (L) |
| 6 | about 0.1 | Thurgood (H) |
| 7 | 0.5 | Ada (plan-r2, M) |
| 8 | 2.75–3.25 (Ada's 2.5–3, with Sparky's 8.4 at 0.5 against her 0.25) | Ada (M); Sparky (M) |
| 9 | 3–4 (Ada's 3–3.5, with Lina's share at 1–1.5 plus 0.25 against Ada's 1) | Ada (M–L); Lina (M–L) |
| 10 | about 3 | Ada (M) |
| 11 | 3.5–3.75 (Ada's 3.5, with Lina's share at 0.25–0.5) | Ada (M–L); Lina (M–L) |
| 12 | about 1 | Lina (M–L) |
| 13 | 4–5.5 (Ada's 4; Lina's 1.5 share may overlap it) | Ada (M–L); Lina (M–L) |
| 14 | 4.5–5.5 (Ada's 4–5; Sparky's line 0.25; the Q3b browser check 0.25) | Ada (M–L); Sparky (H) |
| 15 | about 2 (Leonardo reads Req 12 at about 1, inside Ada's figure) | Ada (M); Leonardo (L) |
| 16 | about 0.75, plus the regeneration and the profile author's acts, unsized | Kenya (M); Data (M) |
| 17 | 0.5 | Ada (H) |
| 18 | about 0.1, plus Thurgood's final-head reads, unsized | Kenya (H); Data (H) |

**Total of the sized parts: about 31–36 sessions**, mostly medium-to-low confidence. Ada's parents are about 24–27 of it. **Unsized**: the shared harness module (5.4) and the two probe-import subtasks (3.4, 4.3), added by amendment 3; the U5–U9 harness re-keying and list edits beyond each author's figure; the U10 layout change's list check (Kenya, Data); Task 16's regeneration (Lina) and profile-author acts (Thurgood); Task 18's reads (Thurgood); the preconditions (Lina's L816 and README PRs, the owners' record-only PRs). The total is a floor, not a schedule; the component repair Lina files after U1 is sized after U4 and is not in it.

### Delegated-tier plan (one PRIMARY per parent, the referent of its `**Delegated-tier**:` line)

Write scope for every seat below is granted by ballot `2026-09-26-tasks-row-write-scope-grant`: a PRIMARY and each tiered secondary may write exactly the parent's listed Primary Artifacts, on the unit's branch, until the unit merges, once Peter merges this file. **Tier rule**: Sonnet implements settled design (all of 129's calls are made in `design.md`, and O-8 closes in this round); Opus where a named signal says residual judgment remains. Consulted seats carry no tier and get no grant. Attestations (signatures, confirm acts, Stacy's records) are outside every line.

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
| 9 | Ada (Sonnet) | Lina (Sonnet) — the coupled Android and iOS component reads and the guideline type statements; Thurgood (Sonnet) — holds the Req 6.9 ballot record | Data, Kenya |
| 10 | Ada (Sonnet) | Lina (Sonnet) — the two component tokens files row 21's ruling disposes | — |
| 11 | Ada (Sonnet) | Lina (Sonnet) — Req 4.5's coupled reads and the two `DesignTokens` re-points | Kenya, Data |
| 12 | Lina (Sonnet) | — | Kenya, Data |
| 13 | Ada (Sonnet) | Lina (Sonnet) — the hand-written enums, row 18 R1 under `src/cli/sync/**`, the Integration Guide cascade sentence | Data, Sparky; Ada is consulted on Lina's `src/cli/sync/**` edit |
| 14 | Ada (Sonnet) | Sparky (Sonnet) — his charter's registered-theme line, the Q3b browser check and the review of the web single-mode form (14.6); Lina (Sonnet) — the regeneration and the lock; Thurgood (Sonnet) — the profile author's acts | Lina (Q3a), Kenya, Data |
| 15 | Ada (Sonnet) | Thurgood (Sonnet) — the INSTALL derivation and `install-doc.test.ts` | Leonardo, Kenya, Data |
| 16 | Kenya (Sonnet) | Data (Sonnet) — his charter and overlay text; Lina (Sonnet) — the regeneration and the lock; Thurgood (Sonnet) — the profile author's acts | Stacy (confirmer) |
| 17 | Ada (Sonnet) | — | Thurgood (release text) |
| 18 | Thurgood (Sonnet) | Kenya (Sonnet), Data (Sonnet) — the "Native status" passage | Stacy, Ada, Leonardo |

---

## Merge preconditions (before this file merges), in merge order

1. **#680** (Thurgood): the instruments-parser record re-ruled to the next spec's tasks round, and the dated pointer in Spec 128's outline. #678's merge is the event its old `manual` line named, so #680 merges first. *(Merged, `000e27d91`.)*
2. **The harness charter** (`.kiro/issues/2026-09-17-platform-build-verification-harness-candidate.md`, Kenya and Data) is `path:` this file, so it fires at this file's merge. Kenya and Data re-rule it, in one record-only PR with the other's agreement line, to `path:.kiro/specs/129-consumer-generation-completeness/completion/task-5-completion.md`. Both R1 entries agree on that target, and on re-rule rather than close (the obligation is a harness that exists). Task 5 then closes or re-rules it at U1's merge. *(Merged as #681, `3b644b6c6`, Kenya with Data agreeing.)*
3. **The second re-rule of the intake records** (requirements.md § "Record dispositions"). After this file's last round fixes the numbering, each owner re-rules their records from `completion/claims-pass.md` to the carrying parent's completion doc: Ada in one record-only PR (15 records), Lina in one (4 records, plus her C6 re-rule below). Stacy R1 notes the binding deadline is before U3 merges; the owners make them before this file anyway, so a renumbering is caught. Each carrying unit then closes or re-rules them (Conventions). *(Merged: Ada's 15 as #682, `05ba771f2`; Lina's 4, her C6 re-rule and the Spec 123 Req 1.5 pointer as #683, `657078b52`.)*

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
| `2026-09-26-native-component-theme-hardcoding.md` (row 15) | Lina | Tasks 11, 12 | `task-12-completion.md` (its final state check) |
| `2026-11-04-progress-bar-native-theme-reads-malformed.md` (row 16) | Lina | Task 12 | `task-12-completion.md` |
| `2026-10-02-one-hop-upgrade-rehearsal-tracked-residuals.md` (row 18, R1 and R5) | Lina | Task 13 | `task-13-completion.md` |
| `2026-10-15-123-palette-read-from-package.md` (row 19) | Ada | Task 14 | `task-14-completion.md` |
| `2026-10-01-in-repo-generate-output-contaminates-package-dist.md` (row 20, row (g)) | Ada | Task 14 | `task-14-completion.md` |
| `2026-10-24-component-token-custom-values-unvalidated.md` (row 21) | Ada | Task 10 | `task-10-completion.md` |
| `2026-10-03-semantic-override-map-type-not-exported.md` (row 22) | Ada | Task 10 | `task-10-completion.md` |

   **Stay on `completion/claims-pass.md`, by design** (Ada and Stacy R1 confirm): the charter `2026-10-02-consumer-generation-completeness-spec.md` (CLOSEOUT reads the spec); `2026-06-24-oklch-shadow-color-family-not-migrated.md` (row 11; its owed act at the claims pass is the re-rule to Spec 133, design § 8); `2026-11-04-consumers-get-no-report-of-what-an-upgrade-changed-in-generated-tokens.md` (left out; re-read at CLOSEOUT).

## Unit preconditions and the records 129's paths fire

| When | Record or act | Owner | What is owed |
|---|---|---|---|
| **Before U1's PR opens** | `ContainerCardBase.ios.swift` L816 parse defect (row 15's half, Req 4.7) | Lina | her one-line PR, with a dated line on the theme-hardcoding record for that half; else it is carried as a tagged entry (Req 4.7 allows it) |
| **Before any harness run on the U1 branch** (Peter's Decision 1, "1 A", received 2026-11-06T14:04:52Z; added by tasks amendment 2) | `.kiro/issues/2026-11-06-native-harness-dispatch-stub-grant.md` (`**Grant paths**: .github/workflows/native-harness.yml`), activated by the merge of tasks amendment 2's PR | Thurgood | **The stub**: a PR to `main` whose diff is that one file, declaring `on: workflow_dispatch` and no other trigger, merged by Peter. **The probe**: the first `gh workflow run native-harness.yml --ref task/129-compile-harness` after the stub merges, once the unit branch carries its own copy of the file (5.1's first commit). It passes when the run's `head_sha` is the dispatched unit-branch commit and its job names are the ones `git show <head_sha>:.github/workflows/native-harness.yml` defines, not the stub's single job (that first copy need not define all five jobs yet). It fails in either of two forms: the dispatch errors, or the run ran the stub's job. Task 5's completion doc records the result in whichever form applies: the run URL, its `head_sha` and job names; or the pasted error. **Fallback**: if the probe fails, U1 takes option D: the branch's copy adds `on: push: branches: [task/129-compile-harness]`, removed before PR-open. Its edits to Req 2.11, design § 3 rule 3 and this file's dispatch wording merge in a further amendment before U1's PR opens |
| **Before Task 4's first dispatched Android run** (Data R1) | `.kiro/issues/2026-11-05-icon-base-android-drawable-readme-breaks-resource-merge.md`, Trigger `path:harness/**` | Lina | the README moved out of `res/` and the record closed (rule 5 outcome line, then the archive move), merged to `main`, and `main` merged into the U1 branch before that run; otherwise every Android run on the branch ends `pre-compile` and no Android baseline can be committed |
| **Before U1 merges** | `.kiro/issues/2026-09-26-native-component-distribution.md`, Trigger `path:harness/**` at `d7f87174c` | Kenya, Data (co-owners) | **Settled, done** *(dated 2026-11-05, Thurgood)*: Stacy ruled Data's form, Kenya accepted it, and Data re-ruled the Trigger to `path:.kiro/specs/129-consumer-generation-completeness/completion/claims-pass.md`, switching to `release:next:phase-1` at 129's close, in #684 (`19c1dea43`), merged before U1. The R2 positions (Kenya: `release:next:phase-1`; Data: 129's claims pass) are kept in `feedback/tasks.md` `[THURGOOD R2]` |
| **Before #678 merges, in Lina's record-only PR** | `2026-10-13-consumer-guard-c6-sync-dry-run-hits-npm-registry.md`, Trigger `path:tests/consumer-integration.test.ts` | Lina | **Lina's call, as owner (rule 9):** re-rule to `manual`, naming its own fixing PR (a P3 riding another change, rule 1), because the fix is a test-file change outside her standing scope. Sparky R1 is right that the old token fires at **U3**, not U5 (Task 8 is the first parent listing that file), so the re-rule must merge before U3 at the latest |
| **The first 129 unit PR whose diff touches `src/build/tokens/defineComponentTokens.ts`** (U5 by row 21, or U8 through `src/build/tokens/**` if U8 merges first) | `2026-09-27-progress-token-harvest-may-not-cross-dual-instance-boundary.md` | Ada | the trace or a re-rule, in that PR or an owner PR merged before it (Ada R1 confirms; amended 2026-11-06, `[STACY TASKS R2]` High-3) |
| **The first 129 unit PR whose diff touches `src/cli/staleness.ts`** (U8 by R5, or U9 or U10 through `src/cli/**`) | `2026-10-12-generate-staleness-decided-by-file-times.md` | Ada | closed by R5's content check in U8's PR, or re-ruled in an earlier PR that touches the file (Ada R1; amended 2026-11-06, `[STACY TASKS R2]` High-3) |
| **The first 129 unit PR whose diff touches `src/components/core/Input-Text-Base/platforms/ios/**`** (U4 through its iOS reads, or U7) | `ios-readonly-focusable-prototype.md` | Kenya | a record-only re-defer merged before that PR (Kenya R1); its author tells Kenya at PR-open (amended 2026-11-06, `[STACY TASKS R2]` High-3) |
| **Before U1's component lists commit** (amended 2026-11-07) | the component-repair record (Req 1.5) | Lina | filed from the first full run (42324880305 at `cc2e71a51`), grouped by cause with counts, in a record-only PR merged into U1 first; sized at the first run after U4 merges. Kenya's `InputTextBase.ios.swift` L185 reading goes in it |
| **After U1 merges** | `.github/in-lane-guards.json` entries (Req 3.10) | Thurgood | U2, Task 6 |
| **Before U6's PR opens** (added 2026-11-06, tasks amendment 3 review fold, `[ADA R3]` fork 1) | a record that a product-token key which is a keyword on iOS or Android emits a member that does not compile | Ada | filed at the issues root, naming both platforms, with a fix at the source (the product MCP's indexer and `validateProductTokens`); 129 adds no emitter rule |
| **At U6's merge** | MIDPOINT claims pass | Stacy | `completion/claims-pass-midpoint.md` |
| **Before the S of the release carrying U9** | the Token-Governance § "Theme Registry (Spec 094)" ballot edit (Req 15.6) | Thurgood (holder), Ada (text) | a ballot, ratified and applied; Task 18 reads that it happened |
| **At U12's merge** | `2026-10-23-signing-act-shape-review.md` (Trigger `manual`: 129's final unit merge) | Thurgood | the review it names |
| **At U12's merge** | CLOSEOUT claims pass | Stacy | `completion/claims-pass.md` |

---

## Tasks

### UNIT 1 — The compile harness

- [ ] 1. The packed-install consumer driver (U1)

  **Type**: Parent · **Validation**: Tier 3 - Comprehensive · **Agent (plan)**: PRIMARY Ada (Sonnet)
  **Traces**: Req 1.8, 2.1, 2.2, 2.3, 10.3 · design Architecture, § 3 ("Wiring")

  **Success Criteria:**
  - `scripts/harness/consumer.ts` runs `npm pack`, installs the tarball into a scratch directory, runs `init` and `generate`, and writes the consumer root as one directory a CI job can upload, reading nothing from the repository's own `dist/`.
  - The scratch consumer's config abbreviation is not `DP`, and `harness/pins.yaml` § `consumer` names it.
  - The harness input includes the product-token fixture at `harness/fixtures/product-tokens/`, holding one token that `ref`s a WCAG-only colour and one that `ref`s a composite token.
  - The driver exits non-zero, naming the step, when `npm pack`, the install, `init` or `generate` fails.
  - `scripts/pack-assert.ts` fails on any packed file under `platforms/android/res/` whose path is not `res/<type>[-<qualifiers>]/<name>.<ext>` with an Android resource type and an allowed extension, shown by a case in `scripts/__tests__/pack-assert.test.ts` with a `README.md` under `res/drawable/` red once, and passes at this unit's head.

  **Primary Artifacts:**
  - `scripts/harness/consumer.ts`
  - `scripts/harness/__tests__/consumer.test.ts`
  - `harness/fixtures/product-tokens/**`
  - `harness/pins.yaml` (the `consumer` section)
  - `scripts/pack-assert.ts`
  - `scripts/__tests__/pack-assert.test.ts`

  **Completion Documentation:**
  - Detailed: `.kiro/specs/129-consumer-generation-completeness/completion/task-1-completion.md`
  - Summary: `docs/specs/129-consumer-generation-completeness/task-1-summary.md`

  **Post-Completion:** mark complete (`taskStatus`); `./.kiro/hooks/complete-task.sh "Task 1 Complete: The packed-install consumer driver (129)"` commits the docs on the U1 branch (no PR: U1's PR opens at Task 5); STOP.

  - [ ] 1.1 Driver: pack, install, `init`, `generate`, artifact layout
    **Type**: Implementation · **Validation**: Tier 2 - Standard · **Agent**: Ada (Sonnet)
    - Abbreviation from `harness/pins.yaml` § `consumer`; each platform's output folder passed to its lane from the config (§ "The `gen:` path rule"); a Jest test of the step-failure messages
    - _Requirements: 1.8, 2.1, 2.2_
  - [ ] 1.2 Product-token fixture
    **Type**: Implementation · **Validation**: Tier 2 - Standard · **Agent**: Ada (Sonnet)
    - _Requirements: 2.3_
  - [ ] 1.3 `pack-assert`'s native resource rule and its red case
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
  - `scripts/harness/__tests__/parse-swift.test.ts` shows that an `llvm`-style single diagnostic line yields one key, that a Swift diagnostic printed twice (location and caret) is counted once, and that a missing-return fixture yields one `missing return` key.
  - `scripts/harness/__tests__/parse-kotlin.test.ts` shows that a multi-line Kotlin diagnostic keeps its continuation lines joined by ` ⏎ `, that a `w:` line yields no key, and that a diagnostic ends at the next `e: `, `w: ` or Gradle line (`> `, `FAILURE`, `* `, `BUILD`).
  - Both parser tests show that a key holds a root-relative POSIX path, a `gen:` path relative to its platform's output folder, no line or column, and its quoted identifiers, on fixtures whose header names the toolchain they were recorded under.
  - A grep of `scripts/harness/compare.ts`, `scripts/harness/parse-swift.ts` and `scripts/harness/parse-kotlin.ts` for `GITHUB_TOKEN`, `GH_TOKEN`, `gh pr` and `pull_request` returns no line.
  - `harness/README.md` states the list, pin, protected-set and `gen:` path formats of § "The list file format, the pin file and the run policy", and the comparator parses exactly that format.
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

  - [ ] 2.1 Formats: lists, pins, protected set, the `gen:` path rule; `harness/README.md`
    **Type**: Implementation · **Validation**: Tier 2 - Standard · **Agent**: Thurgood (Sonnet)
    - _Requirements: 3.2, 3.7_
  - [ ] 2.2 Swift parser (`<root>:<path> | <message>`, K-2, O-17)
    **Type**: Implementation · **Validation**: Tier 2 - Standard · **Agent**: Kenya (Sonnet)
    - Fixtures recorded under Xcode 27.2 and labelled so; plus one fixture cut from the first full run's iOS log (§ "The first full run (U1)") under the pinned Xcode, labelled with that toolchain and run, before U1 merges (`[STACY TASKS R2]` Medium-2; Task 5 carries it as a criterion, amended 2026-11-06, tasks amendment 2; prior text at `33380114c`)
    - _Requirements: 3.2_
  - [ ] 2.3 Kotlin parser (D § 1.2)
    **Type**: Implementation · **Validation**: Tier 2 - Standard · **Agent**: Data (Sonnet)
    - Fixture cut from the 2026-11-04 K2 logs, scratch paths rewritten to `pkg:` and `gen:`, source named in the completion doc
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
  **Traces**: Req 2.4, 2.6, 2.7, 2.8, 2.9, 3.4, 3.11, 4.1, 4.8, 6.2 · design § 1 (K-1 to K-7); § 4 ("Product-token names and access", "The shared harness module"; amendment 3)

  **Success Criteria:**
  - On iOS, Stage T compiles the generated iOS files with `swiftc -emit-module -c -wmo -parse-as-library -module-name DPHarnessTokens -swift-version 6 -diagnostic-style llvm` for `arm64-apple-ios17.0-simulator`, and prints the invocation and its file list.
  - On iOS, Stage P compiles the probe generated from the consumer's `token-index/` with plain `import`, prints `probe: read <n> of <m> index names` and fails the context when `n ≠ m`, through the run file's `checks` and the comparator's `check` class (design § 3) *(amended 2026-11-06, tasks amendment 3 review fold, `[THURGOOD R7]` fork 1; prior text: "and fails when `n ≠ m`")*, shown at U1 by the planted fixture's `2 of 2` and by `probe-swift.test.ts` asserting that the generated probe's read count equals the index's iOS names; while Stage T writes no module it prints `probe: blocked (token module not built)`.
  - On iOS, `scripts/harness/__tests__/probe-swift.test.ts` asserts that the probe generator emits one theme read per `theme.`-named colour semantic per registered theme instance, and one read through `\.dpTheme`, from the index and the consumer config, with no harness change needed when item (i) emits.
  - On iOS, Stage P also reads the consumer's product tokens, as Android's `:probe` does *(added 2026-11-06, tasks amendment 3, under Peter's ruling 7, "7 yes", received 2026-11-06T22:38:12Z)*.
    - **Source.** The probe reads every `*.yaml` file directly in the consumer's `productTokens` folder, with no subfolders, found through `harness-consumer.json`. It never reads the generated file, the product MCP or a screen specification.
    - **Names and access.** The names and the static/theme rule are those of design § 4, "Product-token names and access" (the rule from U6), as `scripts/harness/native-rules.ts` states them. The probe keeps no copy of them.
    - **Reads.** For each token whose `platforms` list is absent or names ios:
      - a static token is read as `_ = Product<Cat>.<key>`;
      - a theme member is read once, not once per instance, as `_ = EnvironmentValues().dpTheme.product<Cat><Key>`.
    - **The count.** The product reads print and are compared on their own line, `probe: product read <n> of <m>`, beside the other group lines of design § 3, and a mismatch fails the context through `checks` *(amended 2026-11-06, tasks amendment 3 review fold, `[THURGOOD R7]` fork 1; prior text: "`m` and `n` both include these reads. The printed breakdown gains the field `product <p>` …")*.
    - **The harness consumer.** `probe-swift.test.ts` runs the generator over the committed fixture folder `harness/fixtures/product-tokens/` and asserts that the product reads equal the number of its tokens whose `platforms` list is absent or names ios, counted by the test from the YAML itself, with the static/theme split of the rule; and the lane prints the group lines in both states (compiled, and generated but not compiled). The first full run's iOS log, pasted in Task 5's doc, shows the harness consumer's figures. Because the test counts from the fixture, U6's removal of the composite changes no assertion *(Kenya's text, `[KENYA R4 addendum]` item 3, replacing in the review fold the whole-line `483 of 483` figure and the U6 `product 1` sentence, which `[STACY TASKS R4]` High-1 and High-2 found had no instrument at U1)*.
    - **Before item (i) emits**, each product-token entry that differs from the rule is a tagged entry on the token list (Req 4.8): to row 2's record for a theme getter, to row 13's record for a composite or WCAG-only reference, by cause. They are removed in U6's diff (Task 11). The probe is not changed for them.
    - **Test.** `probe-swift.test.ts` asserts, over a fixture product folder with one file per case: a static token; a theme member (read once for any number of instances); a `platforms` list absent, naming ios, and not naming ios (no read); the category taken from the file name and not from the YAML's `category:` field; a hyphenated file name; a file in a subfolder (not read); a file with no `tokens` key (contributes none); and that `n` equals `m`.
  - On iOS, `scripts/harness/probe-swift.ts` takes the theme-instance rule, the theme family's cases and the product-token names and access rule from `scripts/harness/native-rules.ts` (Task 5), and keeps no copy of any of them *(added 2026-11-06, tasks amendment 3, under Peter's ruling 4, "4 combine", and "B Thurgood", received 2026-11-06T23:31:58Z)*. `probe-swift.test.ts` asserts that `probe-swift.ts` defines none of `themeInstances`, `themeHolder` or a product-token naming function, that it imports the module, and that its theme reads equal the module's instances over the fixture config, once for each case in design § 4's theme-instance rule, items 1 to 4.
  - On iOS, the probe also reads the provider and the family, from outside the token module: `_ = EmptyView().<name>Theme()` and one `_ = EmptyView().<name>Theme(.<case>)` per case of the family the shared module gives. They are compared on their own line, `probe: provider read <n> of <m>` (design § 3). Before item (i) emits, the provider entries are tagged entries on the token list (to row 2's record) and are removed in U6's diff *(added 2026-11-06, tasks amendment 3 review fold, Kenya's text, `[KENYA R4]` item 4, with Data's agreement, `[DATA R4]`; its whole-line `486` figure and `provider 3` breakdown left out under `[THURGOOD R7]` fork 1)*.
  - On iOS, `harness-ios-tokens` runs the per-run instance check *(added 2026-11-06, tasks amendment 3, under Peter's "4 combine", received 2026-11-06T22:38:12Z, its third safeguard; placed here by Thurgood, `[THURGOOD R6]`)*. It compares the members of the `<Name>Themes` holder that the generated Swift declares with the instances `scripts/harness/native-rules.ts` gives for the harness consumer's config, prints one line beginning `theme instances:`, and fails the context through the run file's `checks` when they differ, naming each name that differs. It fails closed: it also fails, naming the holder, when the holder is declared and no member can be parsed from it, or when `DesignerPunkTheme` is declared and no holder is found. Only while the generated Swift declares neither (every run before U6) does the line read `theme instances: not checked` without failing. `probe-swift.test.ts` shows the check failing once on a fixture that declares an extra member, once on one that lacks a member, and once on a declared holder with no parsable member, and printing `not checked` on one with neither; its fixtures are written in the holder form Task 11 pins *(amended 2026-11-06, tasks amendment 3 review fold, `[ADA R3]` fork 4, `[KENYA R4]` item 6, `[THURGOOD R7]`)*.
  - On iOS, Stage C compiles every non-test packaged `.swift` file and the generated files as module `DesignerPunk` at `-swift-version 5`, leaving out the package's root token files, `dist/ComponentTokens.*` and `dist/DesignTokens.*`, in the pinned order (package files, then generated files, each sorted by path); where two files would share a native file name the lane fails, naming both paths, as Android's does *(amended 2026-11-06, tasks amendment 3, `[KENYA R4]` items 1 and 2; prior text at `d3dd101b9`: "leaving out the package's `dist/ComponentTokens.*`, … with one copy of each native file name")*. The excluded set is the `.swift` entries of `ROOT_TOKEN_FILES` (`scripts/pack-assert.ts`), and `probe-swift.test.ts` asserts that it equals them, and that a fixture tarball list holding two files of one name fails naming both *(`[KENYA R4 addendum]` item 2; `[STACY TASKS R4]` Medium-4)*.
  - On iOS, the T5 baseline compiles the generated files alone at `-swift-version 5` in the same job as Stage C, for the cross-tier rule.
  - On iOS, each stage runs its self-test first: the missing-return fixture gives exactly one `missing return` error, and at Stage P a planted `internal` member gives one entry and a read count of 2 of 2.
  - On iOS, each context reads Xcode's version, build and app path, the SDK and Swift, sets `DEVELOPER_DIR`, and fails on any field that differs from `harness/pins.yaml` § `ios`, through the comparator's `toolchain` class: the lane records the running versions in the run file and still runs its compiles (design § 3) *(amended 2026-11-06, tasks amendment 3 review fold, `[THURGOOD R7]` fork 2; prior text: the lane stopped before compiling)*.
  - `harness/pins.yaml` § `ios` pins the newest stable Xcode 26 minor on the `macos-26` image at the unit's cut, with the readme's image version recorded (26.6, `17F113`, at the tasks round's read), the SDK, the Swift language modes and the compile flags, names the runner label `macos-26`, states that its pins are harness pins and not minimums, and sets the deployment target 17.0, equal to Core Goals' iOS minimum.
  - On iOS, each context computes its floor at run time from the packed tarball's file list plus the generated files, per tier, and prints the count it gave the compiler.

  **Primary Artifacts:**
  - `harness/ios/**`
  - `harness/pins.yaml` (the `ios` section)
  - `scripts/harness/probe-swift.ts`
  - `scripts/harness/__tests__/probe-swift.test.ts`
  - `scripts/harness/__tests__/fixtures/swift/**`

  **Completion Documentation:**
  - Detailed: `.kiro/specs/129-consumer-generation-completeness/completion/task-3-completion.md`
  - Summary: `docs/specs/129-consumer-generation-completeness/task-3-summary.md`

  **Post-Completion:** mark complete, after 3.4, which starts only once Task 5's 5.4 has put the shared module on the unit branch; 3.1–3.3 may tick before 5.4. When Kenya's seat branch joins the unit, its ticks on 3.1–3.3 sit next to this amendment's 3.4 hunk: take this amendment's text and re-apply the three ticks (`[KENYA R4]` item 10). `complete-task.sh "Task 3 Complete: The iOS lanes (129)"` on the U1 branch (no PR); STOP. *(Amended 2026-11-06, tasks amendment 3 and its review fold.)*

  - [ ] 3.1 Re-read the `macos-26` image readme at the cut; set the pins
    **Type**: Setup · **Validation**: Tier 1 - Minimal · **Agent**: Kenya (Sonnet)
    - _Requirements: 2.8, 2.9_
  - [ ] 3.2 Stages T, P, C and T5; the probe generator; file order and floor
    **Type**: Implementation · **Validation**: Tier 2 - Standard · **Agent**: Kenya (Sonnet)
    - _Requirements: 2.4, 2.6, 2.7, 3.4_
  - [ ] 3.3 Self-tests (K-4) and the toolchain match (K-6)
    **Type**: Implementation · **Validation**: Tier 2 - Standard · **Agent**: Kenya (Sonnet)
    - _Requirements: 3.11, 6.2_
  - [ ] 3.4 The probe imports the shared module *(added 2026-11-06, tasks amendment 3, under Peter's "4 combine", received 2026-11-06T22:38:12Z, and "B Thurgood", received 2026-11-06T23:31:58Z)*
    **Type**: Implementation · **Validation**: Tier 2 - Standard · **Agent**: Kenya (Sonnet)
    - Starts after Task 5's 5.4 has put `scripts/harness/native-rules.ts` and its test on the unit branch
    - Removes `themeInstances` and `themeHolder` from `probe-swift.ts`; the instance names change as the module states them
    - Adds the product-token reads (the criterion above)
    - Builds the iOS half of the per-run instance check (the criterion above; added by Thurgood in the splice, `[THURGOOD R6]`)
    - In the review fold (`[THURGOOD R7]`): writes the group count lines and the per-run check into the run file's `checks` and exits 0 for them; moves the pin check to the comparator's `toolchain` class; replaces `selectFiles`' name-based drop with the `ROOT_TOKEN_FILES` exclusion and the fail-on-duplicate rule; adds the provider read
    - Appends the shared module, the per-run check, the product and provider reads and the `checks` route to `task-3-instruments.md` under `## Found later` as `unlisted` (Start Up Tasks item 8; `[STACY TASKS R4]` Low-1)
    - _Requirements: 2.7, 4.2_

- [ ] 4. The Android lanes (U1)

  **Type**: Parent · **Validation**: Tier 3 - Comprehensive · **Agent (plan)**: PRIMARY Data (Sonnet)
  **Traces**: Req 2.4 (as amended), 2.6, 2.7, 2.8, 2.9, 3.4, 3.11, 4.1, 4.8 · design § 2; D §§ 1.1–1.5; § 4 ("The shared harness module"; amendment 3)

  **Success Criteria:**
  - On Android, `harness/android/` is one Gradle build with the `:tokens`, `:probe` and `:dp` modules, each `com.android.library` with the Compose compiler plugin applied.
  - On Android, each context runs one invocation, `./gradlew --continue :tokens:compileDebugKotlin :probe:compileDebugKotlin :dp:compileDebugKotlin` from `harness/android/`, through the committed Gradle wrapper, and prints it with its sorted file list, package files first.
  - On Android, `:dp` compiles every non-test packaged `.kt` file and the generated Kotlin with Icon-Base's `res/` as its resources, leaving out the package's root token files, `dist/ComponentTokens.*` and `dist/DesignTokens.*`, with one copy of each native file name: the lane fails, naming both paths, when two files of the set share a base name. `probe-kotlin.test.ts` shows `assertOneCopyPerName` in `lane.ts` throwing, naming both paths, on a planted pair with one base name, passing on the real packed file list with the root files excluded, and `packagedKotlin` leaving out both root files and every test file *(`[DATA R4 addendum]`, on `[STACY TASKS R4]` Medium-4)*. *(Amended 2026-11-06, tasks amendment 3; prior text at `233e04bf1`: "leaving out the package's `dist/ComponentTokens.*`". The tarball also ships `dist/DesignTokens.android.kt`, which the first real run showed would be a second `DesignTokens.android.kt` beside the generated one.)*
  - On Android, `:probe` reads every member the index names for Android from inside `@Composable` functions, prints `probe: read <n> of <m> index names` and the `instances read`, `product read` and `provider read` lines of design § 3 (Android has no key group: each `LocalDPTheme.current.<name>` read is that `theme.` name's index read, and `instances read` counts the reads through the module's instances; reworded in tasks amendment 4, `[THURGOOD R9]` item 1), fails the context through the run file's `checks` when a group's `n ≠ m`; the count lines appear only when `:probe` compiles, and while `:tokens` fails the blocked line stands in, and the lane writes the count checks from the probe sources it wrote, with detail `blocked` (an `ok: false` if a count disagrees), beside the per-run instance check (`[THURGOOD R10]`; prior text: "`checks` holds only the per-run instance check") *(amended 2026-11-06, tasks amendment 3 owners' confirmation, `[DATA R4]`)*; and a planted `internal` member in a fixture yields an entry. `harness-android-tokens` runs `lane.ts --selftest` before the lane, once per run, and a FAIL stops the job before the comparator *(amended 2026-11-06, tasks amendment 3 review fold, `[THURGOOD R7]` fork 1, and `[DATA R4]` item 3; prior text: "prints `probe: read <n> of <m>`, fails when `n ≠ m`")*.
  - On Android, `:probe` also reads the family and the provider, from outside `:tokens`, in a `ProbeFamily.kt` inside `@Composable`: one `<Name>Theme { }` and, per family entry the shared module gives, one read `<Name>ThemeFamily.<Entry>` and one call `<Name>Theme(family = <Name>ThemeFamily.<Entry>) { }`, compared on the `probe: provider read <n> of <m>` line. Before item (i) emits they are tagged `probe:` entries, to row 2's record, removed in U6's diff *(added 2026-11-06, tasks amendment 3 review fold, Data's text, `[DATA R4]` fork position 1, matching Kenya's iOS read; the default call `<Name>Theme { }` added by Thurgood for parity)*.
  - On Android, while `:tokens` fails, the Android lane prints `probe: blocked (:tokens not compiled)` and `:probe`'s count is not compared. *(Amended 2026-11-06, tasks amendment 3, Data's lane fact, `[DATA R3]` item 3, design § 2 "The blocked line is the lane's"; prior text at `233e04bf1`: "`:probe` prints", but Gradle skips `:probe` when `:tokens` fails, so no code of `:probe` runs.)*
  - On Android, `scripts/harness/__tests__/probe-kotlin.test.ts` asserts, over a fixture index carrying `theme.` names and a fixture manifest, that `scripts/harness/probe-kotlin.ts` emits one read per `theme.`-named colour semantic through `LocalDPTheme.current` and one through each theme instance that `scripts/harness/native-rules.ts` gives for the manifest's themes, plus one read per product-token fixture member that the same module names, all inside `@Composable`, with no `harness/android/**` change needed when item (i) emits. `probe-kotlin.ts` imports `native-rules.ts` and keeps no local copy of the theme-instance rule or the product-token naming rule. *(Amended 2026-11-06, tasks amendment 3, under Peter's "4 combine" and "B Thurgood"; prior text at `233e04bf1`: the criterion named "each `<Name>Themes` member" with no module. Until `native-rules.ts` is on the unit branch, `themeMemberNames` and `productObjectName` in `probe-kotlin.ts` are the declared stand-ins, and Data's subtask 4.3 replaces and deletes them once Task 5's 5.4 has landed the module; ordering set in the splice, `[THURGOOD R6]`, in place of Data's "the task that adds the module replaces and deletes them".)*
  - On Android, `harness-android-tokens` runs the per-run instance check *(added 2026-11-06, tasks amendment 3, under Peter's "4 combine", received 2026-11-06T22:38:12Z, its third safeguard; placed here by Thurgood, `[THURGOOD R6]`)*. It compares the members of the `<Name>Themes` object that the generated Kotlin declares with the instances `scripts/harness/native-rules.ts` gives for the harness consumer's config, prints one line beginning `theme instances:`, and fails the context when they differ, naming each name that differs. It reports through the run file's `checks` and fails closed: it also fails when the object is declared and no member can be parsed from it, or when `DesignerPunkTheme` is declared and no object is found. Only while the generated Kotlin declares neither (every run before U6) does the line read `theme instances: not checked` without failing. It runs whether or not `:tokens` compiles, since it reads the generated files and needs no compile (tasks amendment 4, `[THURGOOD R9]` item 2). `probe-kotlin.test.ts` shows the check failing once on a fixture that declares an extra member, once on one that lacks a member, and once on a declared object with no parsable member, and printing `not checked` on one with neither; its fixtures are written in the holder form Task 11 pins *(amended 2026-11-06, tasks amendment 3 review fold, `[ADA R3]` fork 4, `[DATA R4]` item 1 and its addendum item 4)*.
  - On Android, the lanes read the generated Kotlin's location from the consumer's config (`platforms.android.output`, else `output`), never from a hard-coded path.
  - On Android, `harness-android-components` fails when `:tokens:compileDebugKotlin` has no task outcome in its own run.
  - `harness/android/gradle/wrapper/gradle-wrapper.properties` names the Gradle version `harness/pins.yaml` § `android` pins in its `distributionUrl`, and sets `distributionSha256Sum`.
  - `harness/pins.yaml` § `android` pins the JDK, Gradle, AGP, Kotlin, the Compose BOM (1.7 or later for `material-ripple`), `compileSdk`, `minSdk` 26, Coil, `material-icons-extended` and, while the generated Kotlin calls it, the colour library, names the runner label `ubuntu-24.04`, and states that its pins are harness pins and not minimums.
  - On Android, each context reads `java.version`, the Gradle version (the one the wrapper runs), the Kotlin compiler version (the Kotlin Gradle plugin's, which compiles the harness, not the runner image's `kotlinc`) and the resolved AGP and BOM versions, and fails on any difference from `harness/pins.yaml`, through the comparator's `toolchain` class (design § 3; `[THURGOOD R7]` fork 2, which keeps Android's path).
  - On Android, each context passes explicit source files, computes its floor at run time per tier, applying to the packed tarball's file list the same exclusions as `:dp`'s file set, and prints the count it gave the compiler. *(Amended 2026-11-06, tasks amendment 3, Data's text, `[DATA R3]` item 1: "the `pkg` floor applies the same exclusion to the packed tarball's file list"; prior text at `233e04bf1`.)*

  **Primary Artifacts:**
  - `harness/android/**`
  - `harness/pins.yaml` (the `android` section)
  - `scripts/harness/probe-kotlin.ts`
  - `scripts/harness/__tests__/probe-kotlin.test.ts`
  - `scripts/harness/__tests__/fixtures/kotlin/**`

  **Completion Documentation:**
  - Detailed: `.kiro/specs/129-consumer-generation-completeness/completion/task-4-completion.md`
  - Summary: `docs/specs/129-consumer-generation-completeness/task-4-summary.md`

  **Post-Completion:** mark complete, after 4.3, which starts only once Task 5's 5.4 has put the shared module on the unit branch; 4.1 and 4.2 may tick before 5.4, and the same tick-conflict note as Task 3's applies when Data's seat branch joins (`[DATA R4]`); `complete-task.sh "Task 4 Complete: The Android lanes (129)"` on the U1 branch (no PR); STOP. *(Amended 2026-11-06, tasks amendment 3.)*

  - [ ] 4.1 The Gradle build, three modules, explicit file list, floor
    **Type**: Implementation · **Validation**: Tier 2 - Standard · **Agent**: Data (Sonnet)
    - The first dispatched Android run waits for Lina's README move on the branch
    - _Requirements: 2.4, 2.6, 3.4_
  - [ ] 4.2 The data-driven probe generator (`scripts/harness/probe-kotlin.ts`) and its fixture test, the blocked state, the planted-member fixture, pins and toolchain match
    **Type**: Implementation · **Validation**: Tier 2 - Standard · **Agent**: Data (Sonnet)
    - _Requirements: 2.7, 2.8, 2.9, 3.11_
  - [ ] 4.3 The probe imports the shared module *(added 2026-11-06, tasks amendment 3, under Peter's "4 combine", received 2026-11-06T22:38:12Z, and "B Thurgood", received 2026-11-06T23:31:58Z)*
    **Type**: Implementation · **Validation**: Tier 2 - Standard · **Agent**: Data (Sonnet)
    - Starts after Task 5's 5.4 has put `scripts/harness/native-rules.ts` and its test on the unit branch
    - Replaces and deletes `themeMemberNames` and `productObjectName` in `probe-kotlin.ts`; takes the binding constants and the product files' `gen:` keys from the module
    - Builds the Android half of the per-run instance check (the criterion above)
    - Replaces, not only removes, the cases in `probe-kotlin.test.ts` that encode the current member set (the `MEMBERS` list and the registered-theme cases), with cases over the module's output (`[DATA R4]`)
    - In the review fold (`[THURGOOD R7]`): writes the group count lines and the per-run check into the run file's `checks`, the Gradle task no longer failing on a count; adds the family and provider reads; takes the excluded root files from `ROOT_TOKEN_FILES`
    - Appends the shared module, the per-run check, the product and provider reads and the `checks` route to `task-4-instruments.md` under `## Found later` as `unlisted` (Start Up Tasks item 8; `[STACY TASKS R4]` Low-1)
    - _Requirements: 2.7, 4.2_

- [ ] 5. Workflow wiring, baselines and the fault run (U1)

  **Type**: Parent · **Validation**: Tier 3 - Comprehensive · **Agent (plan)**: PRIMARY Thurgood (Sonnet) · Kenya (Sonnet) — iOS job steps · Data (Sonnet) — Android job steps
  **Traces**: Req 1.4 (its list rule), 2.5, 2.7 (the shared module), 2.10, 2.11, 2.12, 2.13, 2.14, 3.5 (b), 4.1 (the shared module), 4.8 · design § 3 ("Wiring"); § 4 ("The shared harness module"; amendment 3)

  **Success Criteria:**
  - `.github/workflows/native-harness.yml` defines `harness-generate` and the four contexts `harness-ios-tokens`, `harness-ios-components`, `harness-android-tokens` and `harness-android-components`, each its own job and check, triggered `on: pull_request` with no `paths:` filter and on `workflow_dispatch`.
  - This parent's completion doc records the probe dispatch of § "Unit preconditions": its run URL, its `head_sha` and the job names it ran, which are the ones `git show <head_sha>:.github/workflows/native-harness.yml` defines and not the stub's; or, if it failed, the failure in its form (the pasted dispatch error, or the run URL and the stub's job name) and the fallback amendment that merged before U1's PR opened.
  - The iOS jobs run on `runs-on: macos-26` and the Android jobs on `runs-on: ubuntu-24.04`, and no job uses a `-latest` label.
  - `harness-generate` runs `scripts/harness/consumer.ts` once and uploads its output as one artifact, and each compile context downloads it.
  - One dispatched run with a forced `harness-generate` failure shows each of the four contexts failing, not skipping, and its run URL is in this parent's completion doc.
  - That run's failure is forced by a `workflow_dispatch` input that is read in one step of `harness-generate` only, by that step's `if:` or its `run:`. At head H, no other `if:` in `.github/workflows/native-harness.yml` reads `github.event_name`, `github.event.`, `github.head_ref`, `github.base_ref`, `github.ref`, `github.ref_name` or `inputs.` (the jobs' `name:` expressions are not `if:` and may read `github.event_name`), so failing rather than skipping holds on `pull_request` too. `git diff --name-only F H -- .github/workflows/native-harness.yml scripts/harness/ ':!scripts/harness/__tests__/' harness/ios/ harness/android/` is empty, where F is the forced-failure run's head. Those are every path a context runs in deciding to fail rather than skip; tests and fixtures are left out, so a fixture added after F does not stale the run. This parent's completion doc pastes the dispatch command with its `-f` argument, `harness-generate`'s failing step output, and each context's failing step line from that run.
  - The four baseline lists `harness/expected/harness-ios-tokens.tsv`, `harness-ios-components.tsv`, `harness-android-tokens.tsv` and `harness-android-components.tsv` are committed from the first full run, admitted under exception (b), with every entry tagged to a root record whose Trigger can fire.
  - The first baselines are unaffected by the theme-instance rule: `grep -c '^probe:' harness/expected/*.tsv` prints `0` for each of the four files, or this parent's completion doc pastes the first full run's `probe: blocked` lines for both token contexts (the Android line also prints in `harness-android-components`, where it has no verdict effect, `[DATA R4 addendum]` item 3) *(added 2026-11-06, tasks amendment 3, Stacy's criterion, relayed by the orchestrator: the rule changes what the probes read, and at U1 neither probe runs while the token module does not build)*.
  - `scripts/harness/__tests__/fixtures/parse-swift/` holds one fixture cut from the first full run's iOS log, its header naming the pinned Xcode and that run's URL, and `scripts/harness/__tests__/parse-swift.test.ts` reads it and asserts the keys it yields against a committed `.keys.tsv` beside it.
  - On the token lists, each entry located in a product-token fixture file is tagged to row 2's record (theme getters) or row 13's record (composite and WCAG-only references), by cause.
  - Every 129 row a harness context accepts has an entry tagged to its record on a baseline list, or this parent's completion doc names its interim instrument: row 12's groups B and C (masked behind row 6), `AndroidDpTokenReads.test.ts`; row 9, Task 8's tightened `tokenIndexPlatformNames.test.ts`, shown red on the pre-fix output in Task 8's completion doc; row 2's probe half, Task 11's probe result.
  - `tools/agent-generator/verify-gate-registration.sh` reports its count unchanged at the U1 head, and no harness context is in `EXPECTED_CONTEXTS` or in `complete-task.sh`'s `REQUIRED_WORKFLOWS`.
  - `evidence/harness-stability.md` is the committed output of `scripts/harness/stability.ts` over the checks, check-run annotations and Actions jobs APIs, for U1's runs up to the record's own commit, naming its source endpoints, with the fields of § "Decision 6" per context, and the script applies the break rules of § "Decision 6".
  - The Android jobs write `::notice title=cache::<hit|miss>` after their cache-restore step.
  - Each of the four contexts writes `::notice title=harness-verdict::<the comparator's verdict line>` once the comparator has run, whether that line reads PASS or FAIL. The comparator's step exits 1 on FAIL, so the annotation is written either by that step before it exits, or by a later step with `if: always()` that reads the verdict from a file the comparator wrote and writes nothing when no such file exists. The comparator step runs whenever the lane wrote its run file, even when the lane step exited non-zero (`[KENYA R4]` item 9). So the annotation is absent only for a job that failed before the comparator ran: a toolchain that is missing or cannot be set up, a failed self-test or a failed setup, which write no run file; or a runner, image or network fault. A pin mismatch reaches the comparator as `toolchain` (design § 3; `[THURGOOD R7]` fork 2; prior text at `d3dd101b9` listed `FAIL toolchain` among the iOS failures before the comparator). This parent's completion doc shows all three states with each run's annotations read from the check-run annotations endpoint: the first full run, which is before the baselines and so a comparator FAIL, with the annotation; a PASS at H, with it; and the forced-failure run, without it (`[STACY TASKS R4]` Medium-3). `scripts/harness/stability.ts` reads that annotation to tell a job that failed before the comparator ran (no annotation) from one the comparator failed. *(Amended 2026-11-06, tasks amendment 3, under Peter's "D yes", received 2026-11-06T23:31:58Z (`evidence/2026-11-06-peter-rulings-round-3.md`); Kenya's and Data's texts merged, `[KENYA R3]` item 5 and `[DATA R3]` item 5; prior text at `233e04bf1`: "once the comparator has run, and `scripts/harness/stability.ts` reads that annotation …", with no word on a FAIL verdict.)*
  - Each Android job validates the committed Gradle wrapper with Gradle's wrapper-validation action before its first `./gradlew` call.
  - `scripts/harness/__tests__/stability.test.ts` shows, over recorded API fixtures, each break rule of § "Decision 6" condition 2 firing once, the iOS queue time taken from `max(created_at, harness-generate.completed_at)`, a dispatched run counted toward neither condition 2 nor either platform's clause of condition 3, and a pull-request run whose context carries no `harness-verdict` annotation counted toward neither platform's clause of condition 3, an Android one whose `cache` annotation reads `miss` among them. *(Amended 2026-11-06, tasks amendment 3, under Peter's "D yes", received 2026-11-06T23:31:58Z (`evidence/2026-11-06-peter-rulings-round-3.md`); prior text at `233e04bf1`: "… nor condition 3's iOS clause".)*
  - `scripts/harness/native-rules.ts` holds, as pure functions, design § 4's theme-instance rule (items 1–4), the theme family's cases, the "Selection" table with the single-mode rule, the product-token names and access rule from U6, the fixed binding names and the product files' `gen:` keys, and a check of the harness consumer's own config against item 5's refusals (a check on our fixture, not a consumer refusal). It is written from the design text, and its header says so *(added 2026-11-06, tasks amendment 3, under Peter's "B Thurgood", received 2026-11-06T23:31:58Z (`evidence/2026-11-06-peter-rulings-round-3.md`))*.
  - `scripts/harness/__tests__/native-rules.test.ts` asserts the module's output, each expected value written as a literal, for: each case of the theme-instance rule's items 1–4, configs S and C of Task 11 among them; each refusal of item 5 applied to a harness config; every row of the "Selection" table, with the single-mode rule's two cases; and the product-token rule's cases (the category from the file name, the `-`-only split, the platforms filter, a theme member and a static token, a file in a subfolder not read, a file with no `tokens` key). Ada's consult on the rules, Kenya's review of the Swift rules and Data's of the Kotlin rules are recorded in 5.4's completion doc.
  - Nothing under `src/` imports `scripts/harness/`: `git grep -nE "(from|require\(|import\()[[:space:]]*['\"][^'\"]*scripts/harness" -- src/` returns no line at head H (Conventions) *(amended 2026-11-06, tasks amendment 3 review fold, `[STACY TASKS R4]` Medium-1; prior text: "at the U1 head")*.
  - `scripts/harness/compare.ts` reads the run file's `checks: [{ name, ok, detail }]`, fails the context as class `check` for each `ok: false`, naming it in the verdict line, and fails it when a run file has no `checks` array; `scripts/harness/__tests__/compare.test.ts` shows each red once (an `ok: false` check, a missing `checks` array) and a run whose checks are all `ok: true`, `blocked` or `not checked` passing, an empty `checks` array included (`[DATA R4]`); and `harness/README.md` states the field (design § 3) *(added 2026-11-06, tasks amendment 3 review fold, on `[DATA R4]` item 1 and `[KENYA R4 addendum]` item 4; `[THURGOOD R7]`)*.
  - All four harness contexts ran on this unit's PR, and this parent's completion doc carries each one's run URL and pasted summary line at head H, the last head whose `git diff --name-only H M` to the merged head M touches only `completion/**`, `docs/specs/**` and the PR's records (Conventions).
  - `2026-09-17-platform-build-verification-harness-candidate.md`, whose Trigger names `task-5-completion.md`, carries at U1's merge Kenya's and Data's rule 5 outcome line or a re-ruled Trigger with a dated reason.
  - `2026-11-05-icon-base-android-drawable-readme-breaks-resource-merge.md` and `2026-09-26-native-component-distribution.md`, whose Triggers are `path:harness/**`, were closed or re-ruled by their owners in a PR merged before U1.

  **Primary Artifacts:**
  - `.github/workflows/native-harness.yml`
  - `harness/expected/harness-ios-tokens.tsv`
  - `harness/expected/harness-ios-components.tsv`
  - `harness/expected/harness-android-tokens.tsv`
  - `harness/expected/harness-android-components.tsv`
  - `scripts/harness/stability.ts`
  - `scripts/harness/__tests__/stability.test.ts`
  - `scripts/harness/native-rules.ts` (added by amendment 3)
  - `scripts/harness/__tests__/native-rules.test.ts` (added by amendment 3)
  - `scripts/harness/compare.ts`, `scripts/harness/__tests__/compare.test.ts` and `harness/README.md`, for the `checks` field and the `check` class only (added in amendment 3's review fold; Task 2, which created them, is done)
  - `.kiro/specs/129-consumer-generation-completeness/evidence/harness-stability.md`

  **Grant limits** (`.github/**`): this row's grant over `.github/workflows/native-harness.yml` carries the acts README rule 8 and ballot `2026-09-27-ci-regime-standing-scope` M2 clause 5 exclude, and admits one: replacing the dispatch stub's single job and its one step, which U1's diff deletes, because U1 turns the stub into the real workflow; U1's PR body quotes those lines, as merged by the stub's PR, in a `**Deleted lines**:` block. It admits nothing else: no new required context, no change to `EXPECTED_CONTEXTS`'s count, no other removing or weakening of a step, floor or execution assertion. *(Amended 2026-11-06, tasks amendment 2, `[STACY TASKS R3]` Medium-6; prior text at `33380114c`: "and admits none: no new required context, no change to `EXPECTED_CONTEXTS`'s count, no removing or weakening a step, floor or execution assertion.")* It turns the dispatch-only stub that `.kiro/issues/2026-11-06-native-harness-dispatch-stub-grant.md` puts on `main` into the non-required workflow above, and touches no other `.github/**` path. *(Amended 2026-11-06, tasks amendment 2, Peter's Decision 1, "1 A", received 2026-11-06T14:04:52Z; prior text at `33380114c`: "It creates one new non-required workflow file and touches no other `.github/**` path.")*

  **Completion Documentation:**
  - Detailed: `.kiro/specs/129-consumer-generation-completeness/completion/task-5-completion.md`
  - Summary: `docs/specs/129-consumer-generation-completeness/task-5-summary.md`

  **Post-Completion:** mark complete; `complete-task.sh "Unit 1: The compile harness (129)"` opens U1's PR (body: Spec, Task 1–5, Agent, the completion docs, validation, `**Consulted**:`); report the URL; STOP.

  - [ ] 5.1 The workflow: jobs, labels, triggers, artifact hand-off
    **Type**: Implementation · **Validation**: Tier 2 - Standard · **Agent**: Thurgood (Sonnet), Kenya (Sonnet), Data (Sonnet)
    - Starts after the stub is on `main`: the first commit gives the unit branch its own copy of the file, and the probe dispatch runs against it before any later harness run is cited (§ "Unit preconditions"; amended 2026-11-06, tasks amendment 2)
    - _Requirements: 2.5, 2.10, 2.11, 2.12_
  - [ ] 5.2 The first full run; baseline lists with tags; the protected set filled
    **Type**: Implementation · **Validation**: Tier 2 - Standard · **Agent**: Thurgood (Sonnet)
    - Lina files the component-repair record from this run before the component lists commit, and entries no other root record carries are tagged to it (§ "Unit preconditions"; amended 2026-11-07)
    - *(Tasks amendment 5, under Peter's "a; blend entries fine", received 2026-11-07T02:04:38Z (`evidence/2026-11-07-peter-ruling-component-repair-record-timing.md`): "a". Prior text at `34ea1bf48`, here and in § "Unit preconditions": the record was filed "after U1 merges" from U1's committed lists, which left 54 iOS and 185 Android entries of the first full run with no root record to tag, against this parent's baseline criterion. Lina's lines, spliced byte for byte, `[LINA R4]`.)*
    - The eight entries on `src/blend/ThemeAwareBlendUtilities.*` tag to `.kiro/issues/2026-06-24-blend-system-architecture-and-oklch-alignment.md` (Ada's; Trigger `path:.kiro/specs/133-color-track/requirements.md`). They outlast 129's closeout, as the component-repair record's go on to Spec 132 *(tasks amendment 5, under Peter's "a; blend entries fine", received 2026-11-07T02:04:38Z (`evidence/2026-11-07-peter-ruling-component-repair-record-timing.md`): "blend entries fine")*
    - _Requirements: 1.4, 2.14, 3.5, 4.8_
  - [ ] 5.3 The forced-failure dispatch; the stability script and its first record
    **Type**: Implementation · **Validation**: Tier 2 - Standard · **Agent**: Thurgood (Sonnet)
    - _Requirements: 2.11, 2.12_
  - [ ] 5.4 The shared harness module, `scripts/harness/native-rules.ts`, and its test; the run file's `checks` and the comparator's `check` class *(added 2026-11-06, tasks amendment 3, under Peter's "B Thurgood", received 2026-11-06T23:31:58Z; the `check` class added in the review fold, placed here on `[KENYA R4 addendum]` item 4)*
    **Type**: Implementation · **Validation**: Tier 2 - Standard · **Agent**: Thurgood (Sonnet)
    - Done first among the subtasks still open: it lands on the unit branch before 3.4 and 4.3 start, because both import it, and so before Tasks 3 and 4 complete and before 5.2's first full run
    - Written from design § 4's text, not from the generator or the probes. Ada is consulted on every rule; Kenya reviews the Swift rules and Data the Kotlin ones, each recorded in this subtask's completion doc
    - _Requirements: 2.7, 4.1, 4.2_

### UNIT 2 — The comparator guard and the limitation markers

- [ ] 6. Register the harness falsification suites as named in-lane guards (U2)

  **Type**: Parent · **Validation**: Tier 3 - Comprehensive · **Agent (plan)**: PRIMARY Thurgood (Sonnet)
  **Traces**: Req 3.10 (registration)

  **Success Criteria:**
  - `.github/in-lane-guards.json` gains one entry each for `scripts/harness/__tests__/compare.test.ts`, `parse-swift.test.ts`, `parse-kotlin.test.ts`, `probe-swift.test.ts`, `probe-kotlin.test.ts`, `consumer.test.ts`, `stability.test.ts` and `native-rules.test.ts` (added by amendment 3), with `config` `scripts/jest.config.js`, `context` `lane-functional-root`, and `record` naming this task's completion doc.
  - The additivity predicate of ballot `2026-10-20-in-lane-guard-registry-additive-entries` § 2 prints `true` against the PR's merge base, and the check prints `N registered in-lane guards; N selected` with N the entry count, green on the U2 PR.
  - The U2 PR's `.github/**` changes are exactly `.github/in-lane-guards.json`.

  **Primary Artifacts:**
  - `.github/in-lane-guards.json`

  **Completion Documentation:**
  - Detailed: `.kiro/specs/129-consumer-generation-completeness/completion/task-6-completion.md`
  - Summary: `docs/specs/129-consumer-generation-completeness/task-6-summary.md`

  **Post-Completion:** mark complete; `complete-task.sh "Task 6 Complete: Register the harness falsification suites (129)"` on the U2 branch (no PR); STOP. The U2 merge fires Stacy's ARMING read of this file.

  - [ ] 6.1 Add the eight entries; record the predicate output and the check's line *(amended 2026-11-06, tasks amendment 3; prior text: "the three entries", stale since the list grew to seven)*
    **Type**: Setup · **Validation**: Tier 1 - Minimal · **Agent**: Thurgood (Sonnet)
    - _Requirements: 3.10_

- [ ] 7. Limitation markers in the Integration Guide's install region (U2)

  **Type**: Parent · **Validation**: Tier 3 - Comprehensive · **Agent (plan)**: PRIMARY Thurgood (Sonnet)
  **Traces**: Req 2.10, 15.2 · plan-r2 § 5

  **Success Criteria:**
  - Each limitation sentence in `governance/DesignerPunk-Integration-Guide.md`'s install region that a 129 row fixes carries `<!-- limitation: .kiro/issues/<file>.md -->` naming that row's record, and the completion doc lists every marked sentence with its record (which sentences a row fixes is a reading).
  - `scripts/__tests__/install-doc.test.ts` fails when a marked record is under `archive/` or missing while its sentence remains, shown by a fixture case red once.
  - `docs/consumer/INSTALL.md` is re-derived by `scripts/derive-install-doc.ts` and `install-doc.test.ts` passes.
  - All four harness contexts ran on this unit's PR, and this parent's completion doc carries each one's run URL and pasted summary line at head H, the last head whose `git diff --name-only H M` to the merged head M touches only `completion/**`, `docs/specs/**` and the PR's records (Conventions).

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
  **Traces**: Req 1.6, 2.10, 6.2, 6.10, 7.1–7.4, 15.4; rows 4 (items 2 and 4), 7, 9, 10, 11 · design §§ 5 (shadow composite), 6, 8, 9 (`var()` reach)

  **Success Criteria:**
  - On iOS, every generated colour is `Color(.displayP3, red:, green:, blue:, opacity:)` with values computed at generation, and no generated file calls `Color.oklch` or imports ChromaKit.
  - On iOS, the generated token file imports SwiftUI.
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
  - A `Consumer Guard` case asserts, on the packed install's generated web CSS and the package's `component-tokens.css`, that every custom property a `var()` references is defined in the generated web CSS or on a pinned allowlist kept as a constant at the head of that test, whose count the test asserts.
  - A `Consumer Guard` case asserts that one blue-tinted shadow composite on web uses its colour token's custom property.
  - The generated Kotlin's section comments are comment syntax, accepted by `harness-android-tokens` with row 7's entries removed in this diff.
  - Every member of the generated iOS token types is `public`, and `src/generators/__tests__/tokenIndexPlatformNames.test.ts` requires every index iOS name to resolve to a `public` member of a `public` enclosing type, shown in the completion doc failing on the pre-fix output (the red string) and then passing.
  - `governance/Token-Family-Shadow.md` describes the four shadow primitives in OKLCH in this diff.
  - `governance/Rosetta-System-Architecture.md`'s native colour description (L100–L152 and L376 at `d7f87174c`) states the Display P3 constructors in this diff.
  - The token contexts' lists show the entries tagged to rows 4 (item 2), 7, 9 (where Stage T builds) and 10 removed in this diff, Android colour entries tagged to row 6 remain until U4, and every addition this diff makes prints under exception (a) or (c) with a tag.
  - All four harness contexts ran on this unit's PR, and this parent's completion doc carries each one's run URL and pasted summary line at head H, the last head whose `git diff --name-only H M` to the merged head M touches only `completion/**`, `docs/specs/**` and the PR's records (Conventions).
  - Every root record whose Trigger names `task-8-completion.md` carries, at U3's merge, its owner's rule 5 outcome line or a re-ruled Trigger with a dated reason, made in U3's PR or in a PR merged before it.

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
  - `governance/Token-Family-Shadow.md`
  - `governance/Rosetta-System-Architecture.md`
  - `harness/expected/harness-ios-tokens.tsv`
  - `harness/expected/harness-android-tokens.tsv`
  - `harness/expected/harness-ios-components.tsv`
  - `harness/expected/harness-android-components.tsv`
  - `harness/pins.yaml` (the colour library pin's removal, Req 3.5 (a))

  **Completion Documentation:**
  - Detailed: `.kiro/specs/129-consumer-generation-completeness/completion/task-8-completion.md`
  - Summary: `docs/specs/129-consumer-generation-completeness/task-8-summary.md`

  **Post-Completion:** mark complete; `complete-task.sh "Task 8 Complete: Native colours, shadows and the standalone native fixes (129)"` opens U3's PR (Peter-merged: `governance/**`; `**Edit kind**:` EXECUTION, design §§ 6 and 8, per file); report the URL; STOP.

  - [ ] 8.1 The P3 converter and gamut mapping; both native constructors; `import SwiftUI`; the WCAG path
    **Type**: Implementation · **Validation**: Tier 2 - Standard · **Agent**: Ada (Sonnet)
    - _Requirements: 6.10_
  - [ ] 8.2 Shadow primitives in OKLCH; every composite's colour emitted; `ShadowToken`; the warning removed; the family doc and the architecture doc
    **Type**: Implementation · **Validation**: Tier 2 - Standard · **Agent**: Ada (Sonnet)
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 15.4_
  - [ ] 8.3 Section comments (row 7); `public` members and the tightened text guard, red then green (row 9)
    **Type**: Implementation · **Validation**: Tier 2 - Standard · **Agent**: Ada (Sonnet)
    - The text guard retires in the PR where Stage P first prints a full read count
    - _Requirements: 6.2_
  - [ ] 8.4 `Consumer Guard`: the `var()` check with its pinned allowlist, and the blue-tinted composite
    **Type**: Implementation · **Validation**: Tier 2 - Standard · **Agent**: Sparky (Sonnet)
    - No browser; reach includes `component-tokens.css` (design § 9); follows 8.2
    - _Requirements: 1.6, 7.1_

### UNIT 4 — The native type table

- [ ] 9. The native type table, import lists and font family, with their component couplings (U4)

  **Type**: Parent · **Validation**: Tier 3 - Comprehensive · **Agent (plan)**: PRIMARY Ada (Sonnet) · Lina (Sonnet) — the coupled Android and iOS reads and the guideline type statements · Thurgood (Sonnet) — the Req 6.9 ballot record
  **Traces**: Req 2.10, 5.9, 6.3, 6.4, 6.5, 6.7, 6.8, 6.9; rows 3, 4 (item 1), 5, 6, 8, 12 (groups B, C, item 3's non-colour constants); I-1, I-2 · design §§ 5, 7, 12a (`ConfigHelpers`)

  **Success Criteria:**
  - On Android, the generated families emit the types of design § 5's table as merged at `5e894837c` (Data's R2 rows; O-8 closed at this tasks round), and one Jest test per table row asserts its emitted form.
  - On iOS, the generated families emit the types of design § 5's table, `TypographyToken` carries a computed `tracking: CGFloat` in points, and a Jest test asserts each row and the field.
  - On Android, a Jest test on the generator output asserts that `radius_half` emits `CornerSize(percent = 50)`.
  - On iOS, `radiusHalf` emits `Circle()`, accepted by `harness-ios-tokens`.
  - On iOS, a font family emits as a `String?`, the first stack entry unquoted, and `nil` when that entry is a generic keyword, asserted by a Jest test.
  - On Android, a font family emits by design § 5's row, with the quotes gone, asserted by a Jest test.
  - The import list of `DesignTokens.android.kt` is computed from the types it emits, every import line precedes the first declaration, and a Jest test asserts both.
  - The import list of `ComponentTokens.android.kt` is computed from the types it emits, every import line precedes the first declaration, and a Jest test asserts both.
  - `ComponentTokens` refers to `DesignTokens.<name>` on iOS and on Android, and row 3's platform references compile, accepted by the token contexts.
  - On Android, sizing tokens emit as `Dp` (I-1), and Lina's removal of the 16 `.dp` sites lands in this diff, guarded by `src/components/__tests__/AndroidSizingDpReads.test.ts`.
  - On Android, `fontSize` emits as `TextUnit` (I-2), and row 12's groups B and C and item 3's typography and remaining non-colour constants in `InputTextBase.android.kt` change in this diff.
  - At this head, no entry on `harness-android-components` is tagged to row 12 for groups B, C or item 3's non-colour constants, and entries this diff newly reveals print under exception (c) tagged to row 12 or to Lina's component-repair record.
  - On iOS, `NavSegmentedChoiceBase.ios.swift`'s `fontWeight` read compiles against `Font.Weight` in this diff, with its entry removed from `harness-ios-components`.
  - `src/components/__tests__/AndroidDpTokenReads.test.ts` knows every shape I-2 emits, `TextUnit` included.
  - The per-family Android type statements in `governance/platform-implementation-guidelines.md` match the generator in this diff, drafted by Lina and approved by Peter under the ballot-measure model (Req 6.9): a ballot record `.kiro/docs/ballots/*-129-u4-android-type-statements.md` whose Status reads RATIFIED (Peter) at U4's merge, and the U4 PR body carries `**Edit kind**: governance/platform-implementation-guidelines.md — LAW (<that ballot path>)` *(Amended 2026-11-06, tasks amendment 1, `[STACY TASKS R2]` Medium-4; prior text at `8d8ba1425`.)*
  - `ConfigHelpers.ts` and `BuildOrchestrator.ts` default Android `minSdkVersion` to 26 with validation floors 26, naming Core Goals in the message, and default iOS `minimumDeploymentTarget` to `'17.0'`.
  - `harness-ios-tokens` and `harness-android-tokens` show the entries tagged to rows 3, 4 (item 1), 5, 6 and 8 removed in this diff, and every addition this diff makes prints under exception (c) with a tag.
  - Ada's release-note draft for I-1 and I-2 is in this parent's summary doc.
  - All four harness contexts ran on this unit's PR, and this parent's completion doc carries each one's run URL and pasted summary line at head H, the last head whose `git diff --name-only H M` to the merged head M touches only `completion/**`, `docs/specs/**` and the PR's records (Conventions).
  - Every root record whose Trigger names `task-9-completion.md` carries, at U4's merge, its owner's rule 5 outcome line or a re-ruled Trigger with a dated reason, made in U4's PR or in a PR merged before it.

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
  - `src/components/core/Nav-SegmentedChoice-Base/platforms/ios/NavSegmentedChoiceBase.ios.swift`
  - `src/components/core/*/platforms/ios/**` (only where design § 5's iOS column changes a read)
  - `src/components/__tests__/AndroidSizingDpReads.test.ts`
  - `src/components/__tests__/AndroidDpTokenReads.test.ts`
  - `governance/platform-implementation-guidelines.md`
  - `.kiro/docs/ballots/*-129-u4-android-type-statements.md` (Thurgood, as ballot holder; Lina's text)
  - `harness/expected/harness-ios-tokens.tsv`
  - `harness/expected/harness-android-tokens.tsv`
  - `harness/expected/harness-ios-components.tsv`
  - `harness/expected/harness-android-components.tsv`

  **Completion Documentation:**
  - Detailed: `.kiro/specs/129-consumer-generation-completeness/completion/task-9-completion.md`
  - Summary: `docs/specs/129-consumer-generation-completeness/task-9-summary.md`

  **Post-Completion:** mark complete; `complete-task.sh "Task 9 Complete: The native type table (129)"` opens U4's PR (Peter-merged: `governance/**`; `**Edit kind**:` EXECUTION, Req 6.9); report the URL; STOP. After merge, the next harness run is the component repair's sizing event (Lina).

  - [ ] 9.1 Generator: types per family, composites, font family, import lists, `ComponentTokens` references
    **Type**: Implementation · **Validation**: Tier 2 - Standard · **Agent**: Ada (Sonnet)
    - _Requirements: 5.9, 6.3, 6.4, 6.5_
  - [ ] 9.2 Coupled component reads (I-1, I-2, `fontWeight` on both platforms, the composite's 9 reads, item 3's remaining constants); the two guards
    **Type**: Implementation · **Validation**: Tier 2 - Standard · **Agent**: Lina (Sonnet)
    - _Requirements: 6.7, 6.8_
  - [ ] 9.3 Guideline type statements (Lina drafts; the ballot record held by Thurgood, Peter ratifies at U4's merge); `ConfigHelpers` floors
    **Type**: Documentation · **Validation**: Tier 2 - Standard · **Agent**: Lina (Sonnet), Ada (Sonnet)
    - _Requirements: 6.9_

### UNIT 5 — Validators and config types

- [ ] 10. The relationship validator, component-token custom values and the override types (U5)

  **Type**: Parent · **Validation**: Tier 3 - Comprehensive · **Agent (plan)**: PRIMARY Ada (Sonnet) · Lina (Sonnet) — the two component tokens files
  **Traces**: Req 2.10, 13.1–13.3; rows 1, 21, 22 · design §§ 12, 12a (13.3)

  **Success Criteria:**
  - The `Consumer Guard` case `validate passes` (skipped at `tests/consumer-integration.test.ts` L354 at `c22c17a78`) is re-enabled and passes.
  - A Jest case with a token that breaks its declared relationship is still reported, and the pre-correction `blur000` string is its true-positive case.
  - A consumer component token with an off-grid custom value and no `offGridReason` makes `generate` warn, naming the token, and not fail, accepted by a `Consumer Guard` case.
  - A DesignerPunk component token that does not conform fails the repository's lane, shown by a Jest case red once.
  - Badge-Label-Base and Button-VerticalList-Item conform at this head, and Button-VerticalList-Item's `offGridReason` is Lina's text in design § 12.
  - A consumer `.ts` file importing `SemanticOverrideMap` and `SemanticOverride` from `@3fn/core/config` type-checks under `tsc --noEmit` in `Consumer Guard`.
  - All four harness contexts ran on this unit's PR, and this parent's completion doc carries each one's run URL and pasted summary line at head H, the last head whose `git diff --name-only H M` to the merged head M touches only `completion/**`, `docs/specs/**` and the PR's records (Conventions).
  - Every root record whose Trigger names `task-10-completion.md` carries, at U5's merge, its owner's rule 5 outcome line or a re-ruled Trigger with a dated reason, made in U5's PR or in a PR merged before it.

  **Primary Artifacts:**
  - `src/validators/**`
  - `src/build/tokens/defineComponentTokens.ts`
  - `src/integration/ValidationCoordinator.ts`
  - `src/config/index.ts`
  - `src/tokens/**`
  - `src/components/core/Badge-Label-Base/tokens.ts`
  - `src/components/core/Button-VerticalList-Item/Button-VerticalList-Item.tokens.ts`
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

- [ ] 11. Native theme emission, with Req 4.5's coupled reads and the two re-points (U6)

  **Type**: Parent · **Validation**: Tier 3 - Comprehensive · **Agent (plan)**: PRIMARY Ada (Sonnet) · Lina (Sonnet) — Req 4.5's coupled reads and the two re-points
  **Traces**: Req 1.7, 2.3 (as amended), 2.7, 2.10, 4.1 (as amended), 4.2, 4.3, 4.5, 4.7, 4.8, 4.10, 5.6 (as amended); rows 2, 4 (item 3), 12 (item 3's colours, Button-CTA), 13 (item 3), 15 (theme name) · design § 4

  **Success Criteria:**
  - On iOS, `generate` emits `public protocol DesignerPunkTheme: Sendable`, `DPThemeKey`, `EnvironmentValues.dpTheme`, the `<Name>Themes` holder with one member per instance of design § 4's theme-instance rule, one conforming `Equatable` struct per instance, the implicit members, `<Name>ThemeFamily` and `View.<name>Theme(_ family: <Name>ThemeFamily = .base)`, and a generator test asserts the `: Sendable` clause on the protocol and on the family. *(Amended 2026-11-06, tasks amendment 3, Lina's text, `[LINA R2]` block L2; prior text at `233e04bf1`: "… one conforming `Equatable` struct per registered theme and mode, the implicit members and `View.<name>Theme()`, and a generator test asserts the `: Sendable` clause".)*
  - On Android, `generate` emits `data class DesignerPunkTheme`, `LocalDPTheme = staticCompositionLocalOf { <Name>Themes.BaseLight }`, the `<Name>Themes` holder with one member per instance of design § 4's theme-instance rule, `enum class <Name>ThemeFamily` and `<Name>Theme(family: <Name>ThemeFamily = <Name>ThemeFamily.Base, darkTheme: Boolean = isSystemInDarkTheme(), content)`, in `package com.designerpunk.tokens`. *(Amended 2026-11-06, tasks amendment 3, Lina's text, `[LINA R2]` block L2; prior text at `233e04bf1`: "… the `<Name>Themes` holder with one member per registered theme and mode, and `<Name>Theme(darkTheme = isSystemInDarkTheme()) { content }` …".)*
  - No alias is emitted: no `typealias <Name>Theme`, no `Local<ABBR>Theme`, no second Swift key.
  - On iOS, the theme carries every colour semantic the index names `theme.<name>`, each with its resolved value per theme and mode.
  - On Android, the theme carries every colour semantic the index names `theme.<name>`, each with its resolved value per theme and mode.
  - The token index names every `category: color` semantic `theme.<name>` on iOS and Android, and `token-index/README.md` § "Platform names" states the root rule of design § 4.
  - A Jest test on output generated from the repository's real token definitions finds zero `Color.Unspecified`, `Color.clear` and `unresolved` in the emitted themes, per platform, and fails on one.
  - The theme block emits no `import` line, and each generated file has one import list at its head.
  - `SwiftThemeTypes.test.ts` and `KotlinThemeTypes.test.ts` are re-baselined against the component reads as #592 (`c176d2798`) left them, and the U6 PR body names the re-baseline.
  - The exact-set emitter tests (design § 4, "The theme-instance rule", "What checks the rule") are in `SwiftThemeTypes.test.ts` and `KotlinThemeTypes.test.ts`. Each expected list is written out as a literal in the test, not computed *(this bullet and the eight after it: added 2026-11-06, tasks amendment 3, Lina's text, `[LINA R2]` block L1, under Peter's "4 combine", received 2026-11-06T22:38:12Z, "A enum", received 2026-11-06T23:31:58Z, and "fall back to base", received 2026-11-06T23:37:03Z)*. They run on two configs:
    - **Config S**, the themes `init` writes at `233e04bf1`: `dark` in mode `dark`, then `wcag` in mode `light` *("at `233e04bf1`" added in the review fold, `[ADA R3]` fix 4, so config S stays a fixed literal after U9)*.
    - **Config C**: `wcag` in mode `both`, then `high-contrast` in mode `both`, `brand` in mode `light` and `default` in mode `dark`. `dark` is not registered. Config C's custom themes reach the emitter at U9 (design § 4, item 3), so in Task 11 its tests pass the themes straight to the emitter, not through `generate` *(Lina's continuation paragraph, joined to this sub-bullet in the review fold, `[LINA R3]`: the parity parser admits no non-bullet line in a criteria block, and as its own sub-bullet it read as a third config)*.
  - **Config S, instance set.** On iOS, the holder's members are exactly `baseLight`, `baseDark`, `wcagLight` and `wcagDark`, in that order. On Android they are exactly `BaseLight`, `BaseDark`, `WcagLight` and `WcagDark`. The test fails on an extra member, a missing member or a member in the wrong order. It names `darkDark`, `Dark` and an unsuffixed `Wcag` as members that must not appear.
  - **Config C, instance set and names.** On iOS, the holder's members are exactly `baseLight`, `baseDark`, `wcagLight`, `wcagDark`, `highContrastLight`, `highContrastDark`, `brandLight` and `defaultDark`, in that order. On Android they are the Pascal forms: `BaseLight`, `BaseDark`, `WcagLight`, `WcagDark`, `HighContrastLight`, `HighContrastDark`, `BrandLight` and `DefaultDark`. No `brandDark`, `defaultLight`, `darkDark` or unsuffixed `Brand` or `Default` is emitted.
  - **At U6, a config's custom themes reach no native output.** A Jest test in `src/cli/__tests__/` runs `generate` on config C in a temporary directory, at head H *(amended 2026-11-06, tasks amendment 3 review fold, `[STACY TASKS R4]` Medium-1 and Medium-2; prior text: "`generate` is run on config C at U6's head")*. On each platform it emits the four fixed instances and the family cases `base` and `wcag` only, and it prints "registered, not applied yet" for `high-contrast`, `brand` and `default`.
  - **Shared type, both configs.** Every iOS holder member is declared `any DesignerPunkTheme`. Each one is backed by a `public struct <Name><Pascal instance name>Theme: DesignerPunkTheme, Equatable` (for example `<Name>HighContrastLightTheme`), and has one implicit member (Kenya's idiom). Every Android holder member is a `DesignerPunkTheme` value. Every Swift holder is opened by the line `public enum <Name>Themes {` at column 0 and closed by a line `}` at column 0, and every Swift holder member is declared on its own line, indented four spaces inside it, as `    public static let <instance>: any DesignerPunkTheme = <Name><Pascal instance name>Theme()` (the backing struct's initialiser, for example `    public static let highContrastLight: any DesignerPunkTheme = <Name>HighContrastLightTheme()`), with no member list on one line, no continuation line and no tab, and any comment on a line of its own; and every Kotlin holder member as `val <Instance> = DesignerPunkTheme(` on its own line, at four spaces inside `object <Name>Themes {`: the forms the per-run instance check parses (`[KENYA R4]` item 6, `[DATA R4 addendum]` item 4; the Swift indentation and right-hand side added in amendment 4, `[KENYA R5]`; prior text at `e0b770438`: "Every Swift holder member is declared on its own line as `public static let <instance>: any DesignerPunkTheme = …`, and every Kotlin holder member as `val <Instance> = DesignerPunkTheme(` on its own line, at four spaces inside `object <Name>Themes {`: the forms the per-run instance check parses", which pinned the Kotlin indentation and left the Swift member's indentation and right-hand side open). Each instance's implicit member is `static var <abbr><Pascal instance name>`, `<abbr>` the abbreviation in lower case, on `extension DesignerPunkTheme where Self == <Name><Pascal instance name>Theme` (for example `.pbBaseDark`, `.pbWcagLight`, `.pbHighContrastLight`; `[KENYA R4]` item 7). The test asserts each declaration form on every member of each config's list, so `.environment(\.dpTheme, …)`, `LocalDPTheme provides …` and the 11 `any DesignerPunkTheme` sites in `VisualStateStyles.swift` accept every instance.
  - **Every member, resolved, with the same-mode fallback (config C, fixture maps).** Every instance declares every member of the theme, with a resolved value. Where a theme's map does not override a member, the instance takes the value of the base instance of the same mode: `brandLight` takes `baseLight`'s, and `defaultDark` takes `baseDark`'s, which carries the `dark` map. `wcagDark` is the base dark context with `dark`, then `wcag` light, then `wcag` dark applied, the later map winning. The test asserts this on a fixture member that each of the three maps overrides, and on one that only `dark` and `wcag` light override.
  - **The family type.** On iOS it is `public enum <Name>ThemeFamily: Sendable, Hashable, CaseIterable`. It has exactly these cases, per platform, in this order *(lead-in reworded in the owners' confirmation, `[LINA R3]`)*:
    - iOS, config S: `base` and `wcag`;
    - iOS, config C: `base`, `wcag`, `highContrast`, `brand` and `` `default` ``. The last is declared in backticks.
    - Android: `enum class <Name>ThemeFamily` has exactly `Base` and `Wcag` for config S, and `Base`, `Wcag`, `HighContrast`, `Brand` and `Default` for config C. No family has a `dark` case. *(The "iOS" and "Android" labels added in the review fold, `[LINA R3]`: Lina's Android paragraph had become a sub-bullet that read as an iOS case list, and the parity parser admits no paragraph here.)*
  - **Selection and the single-mode fallback (both configs).** The generated provider maps each family case and scheme to the instance in design § 4's "Selection" table and its single-mode rule ("fall back to base"). On iOS this is `View.<name>Theme(_ family: <Name>ThemeFamily = .base)`. On Android it is `<Name>Theme(family = <Name>ThemeFamily.Base, darkTheme = isSystemInDarkTheme()) { content }`. The test asserts every pair:
    - config C: `base` and `wcag` give their light and dark instances; `highContrast` gives `highContrastLight` and `highContrastDark`; `brand` gives `brandLight` and `baseDark`; `default` gives `baseLight` and `defaultDark`;
    - config S: `wcag` in the dark scheme gives `wcagDark`, not `baseDark`, although its config entry is mode `light`.
  - **Defaults (both configs).** On iOS, `DPThemeKey.defaultValue` is the base light instance, and `.<name>Theme()` with no argument selects `base`. On Android, `LocalDPTheme` is `staticCompositionLocalOf { <Name>Themes.BaseLight }`, and `<Name>Theme { … }` with no `family` argument selects `Base`. That keeps the 31 component previews in 20 files rendering without a provider.
  - **The default config name** *(added 2026-11-06, tasks amendment 3, on Data's point, `[DATA R3]` item 6.2; design § 4, "Android provider")*. Config S is also run with no `name`, so `ConfigLoader`'s default `DesignerPunk` applies. The test asserts the emitted names on both platforms: Swift `DesignerPunkThemes`, `DesignerPunkBaseLightTheme`, `DesignerPunkThemeFamily` and `View.designerPunkTheme(_:)`; Kotlin `object DesignerPunkThemes`, `enum class DesignerPunkThemeFamily` and `fun DesignerPunkTheme(family, darkTheme, content)` beside `data class DesignerPunkTheme`. This parent's completion doc records one Kotlin compile of that output at `harness/pins.yaml` § `android`'s versions, by a local build or a harness run on a default-name scratch consumer (Data's choice), and whether `DesignerPunkTheme { … }` resolves to the provider; Data's hand-written equivalent already compiles (`[DATA R4]`). If it does not compile, the rename touches the provider function only, the Q12 type `DesignerPunkTheme` being fixed (`[ADA R3]` fork 2), and is Ada's and Data's call, made before U6's PR opens.
  - On iOS, `generate` writes the theme family and the provider of design § 4 ("The theme family (6(b))" and "iOS provider") *(added 2026-11-06, tasks amendment 3, under Peter's ruling 6, "6 (b)", received 2026-11-06T22:38:12Z, and "A enum", received 2026-11-06T23:31:58Z)*, and a Jest test in `SwiftThemeTypes.test.ts`, over output generated from the repository's real token definitions for configs S and C (above; config C's themes passed straight to the emitter) *(two departures in the splice, `[THURGOOD R6]`: the config is S and C, because a custom theme reaches no native output through `generate` before U9; and Kenya's last sub-bullet, that the emitted members and cases equal `scripts/harness/native-rules.ts`'s, moved to the comparison test below, because nothing under `src/` imports `scripts/harness/`)*, asserts:
    - the declaration `public enum <Name>ThemeFamily: Sendable, Hashable, CaseIterable`, with no raw type;
    - the cases are exactly `base`, `wcag`, then one per other registered theme in config order, with no `dark` case, and a case that is a Swift reserved word is declared in backticks;
    - the provider `public extension View { func <name>Theme(_ family: <Name>ThemeFamily = .base) -> some View }`, whose generated modifier reads `@Environment(\.colorScheme)` and sets `\.dpTheme`;
    - the modifier selects the instance by an exhaustive `switch` over the family with no `default:` branch, so that a family case without a mapping fails to compile, and the mapping equals design § 4's table, including the single-mode rule;
    - no `String` raw value and no `RawRepresentable` conformance.
  - On Android, the generated Kotlin declares, in `package com.designerpunk.tokens`, `enum class <Name>ThemeFamily` with the entries `Base`, `Wcag`, then one entry per other registered theme in config order, each the theme's words in Pascal case with no mode suffix (until U9 exactly `Base` and `Wcag`), and `@Composable fun <Name>Theme(family: <Name>ThemeFamily = <Name>ThemeFamily.Base, darkTheme: Boolean = isSystemInDarkTheme(), content: @Composable () -> Unit)`, which provides `LocalDPTheme` with the instance that a `when (family)` selects by design § 4's Selection table. A theme of one mode shows `Base`'s instance for the scheme it does not cover (the single-mode rule), and `Wcag` always has both instances. `<Name>Theme { … }` still means `Base`. The generated `LocalDPTheme` stays a `staticCompositionLocalOf` defaulting to `<Name>Themes.BaseLight`. `KotlinThemeTypes.test.ts`, run on output generated from the repository's real token definitions, pins all of: the family's exact entry set for each case of the theme-instance rule, items 1–4 (configs S and C, above); the provider's exact signature and defaults; that every `when` branch names a member of `<Name>Themes` that the same output declares, and every member is named by some branch; that every `import` line precedes the first declaration; and that the output holds no `Color.Unspecified` and no `unresolved`. `harness-android-tokens` compiles the family and the provider in `:tokens`, and the probe's declared instances equal the generated `<Name>Themes` members in each run (Peter's ruling 4, third safeguard). *(Added 2026-11-06, tasks amendment 3, Data's text, `[DATA R3]` item 4, under Peter's "6 (b)", received 2026-11-06T22:38:12Z, "A enum", received 2026-11-06T23:31:58Z, and "fall back to base", received 2026-11-06T23:37:03Z; "(configs S and C, above)" added in the splice; prior text: the provider took no family.)*
  - `scripts/harness/__tests__/native-rules-emitter.test.ts` runs the generator's theme emitter and `scripts/harness/native-rules.ts` on configs S and C and the default-name case, and asserts, per platform, that the emitted holder members equal the module's instances and the emitted family cases equal the module's cases. It imports both, which the one-way ban allows (design § 4, "The shared harness module"). Thurgood, the module's owner, is consulted on the test, and maintains it after U6's merge (design § 4, "The shared harness module"); Task 18 registers it as a named in-lane guard *(owner and registration added in the review fold, `[LINA R3]` fixes 2a and 2b)*. *(Added 2026-11-06, tasks amendment 3; placed by Thurgood, `[THURGOOD R6]`, on Lina's note, `[LINA R2]` note 2)*.
  - **The per-run instance check at U6** (Peter's "4 combine", received 2026-11-06T22:38:12Z, its third safeguard; Tasks 3 and 4 build it). At head H (Conventions), `harness-ios-tokens` and `harness-android-tokens` each print their `theme instances:` line reporting the generated holder's members equal to the shared module's instances for the harness consumer's config (`baseLight`, `baseDark`, `wcagLight` and `wcagDark`; Kotlin `BaseLight`, `BaseDark`, `WcagLight` and `WcagDark`), not `not checked`, with its `checks` entry `ok: true`, and this parent's completion doc pastes both lines *(added 2026-11-06, tasks amendment 3; "at head H" in the review fold, `[STACY TASKS R4]` Medium-1)*.
  - Nothing under `src/` imports `scripts/harness/`: `git grep -nE "(from|require\(|import\()[[:space:]]*['\"][^'\"]*scripts/harness" -- src/` returns no line at head H (Conventions) *(added 2026-11-06, tasks amendment 3, under Peter's "B Thurgood"; "at head H" in the review fold, `[STACY TASKS R4]` Medium-1)*.
  - **Each family case carries a generated doc comment** naming its instance in each scheme and, for a theme of one mode, that the other scheme falls back to base (design § 4, "The theme family (6(b))"); `SwiftThemeTypes.test.ts` and `KotlinThemeTypes.test.ts` assert it on config C's `brand` and `default` cases *(added 2026-11-06, tasks amendment 3 review fold, Leonardo's remedy, `[LEONARDO R2]`; Ada confirmed it in the amendment 3 review fold)*.
  - **The Android components import `LocalDPTheme`.** Every non-test file under `src/components/core/*/platforms/android/` that reads `LocalDPTheme.current` (25 at `d3dd101b9`) imports `com.designerpunk.tokens.LocalDPTheme` in this diff, and in each of those files outside the four paths this row already lists, that import line is the file's only change in this unit. This is what makes the row 2 component-list criterion below true at U6 *(added 2026-11-06, tasks amendment 3 review fold, `[LINA R3]` item 1, option (i), `[THURGOOD R7]` fork 3; record `.kiro/issues/2026-11-06-android-components-do-not-import-localdptheme.md`)*.
  - On iOS, at U6's head, the probe constructs each theme instance and reads every `theme.`-named colour semantic through each instance and through `\.dpTheme`, accepted by `harness-ios-tokens` with its read count printed.
  - On Android, at U6's head, the probe reads every `theme.`-named colour semantic through `LocalDPTheme.current` and each `<Name>Themes` member, accepted by `harness-android-tokens` with its read count printed.
  - Row 12's item 3 colours in `InputTextBase.android.kt` and Button-CTA's bare reads bind to `theme.` in this diff.
  - The two `DesignTokens.<semantic colour>` reads (`AvatarPreview.kt` and `ProgressPaginationBase.ios.swift`) are re-pointed to `theme.` in this diff.
  - The component contexts' lists show the entries tagged to row 2 and to row 15's theme-name defect removed in this diff, on iOS and on Android.
  - `validateProductTokens` refuses a composite `ref` with a message naming the token, accepted by a Jest test.
  - The composite product token (`bodyTypographyRef`) is removed from `harness/fixtures/product-tokens/` in this diff, and its entries are removed from the token lists in this diff; the fixture keeps its WCAG-only `ref`. Neither probe filters product tokens *(added 2026-11-06, tasks amendment 3, under Peter's "C confirmed", received 2026-11-06T23:31:58Z (`evidence/2026-11-06-peter-rulings-round-3.md`); Req 2.3 as amended)*.
  - What `generate` does with a refused composite `ref`, fail naming it or skip it with a warning naming it, is Ada's decision in this parent, made after measuring it under Req 10.4 against a scratch copy of test01's config and product tokens (never `generate` in test01 itself), a scratch `init` from a 15.x-born packed install and the repository's fixtures (`[ADA R3]` fix 3; her lean, fork 3: fail with `validateProductTokens`' own message, or warn and skip on every platform until 17.0.0 if a supported consumer holds one). This parent's completion doc records the configs read, how many composite product `ref`s each holds, and the decision, and a Jest test accepts the chosen behaviour. If failing outright would break a supported consumer, it goes to Peter with the 17.0.0 charter quoted, before U6's PR opens *(added 2026-11-06, tasks amendment 3, under Peter's "C confirmed"; Req 5.6 as amended)*.
  - A WCAG-only colour `ref` in a product token emits the theme path by its `theme.` prefix, and the harness fixture's entry for it is removed from the token lists in this diff.
  - The scaffolded dark-override file's header and its list match the index's colour semantics in this diff.
  - The token contexts' lists show the entries tagged to row 2 and row 13 (item 3) removed in this diff, and every addition prints under exception (c) with a tag.
  - All four harness contexts ran on this unit's PR, and this parent's completion doc carries each one's run URL and pasted summary line at head H, the last head whose `git diff --name-only H M` to the merged head M touches only `completion/**`, `docs/specs/**` and the PR's records (Conventions).
  - Every root record whose Trigger names `task-11-completion.md` carries, at U6's merge, its owner's rule 5 outcome line or a re-ruled Trigger with a dated reason, made in U6's PR or in a PR merged before it.

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
  - `src/components/core/Avatar-Base/platforms/android/AvatarPreview.kt`
  - `src/components/core/Progress-Pagination-Base/platforms/ios/ProgressPaginationBase.ios.swift`
  - `harness/expected/harness-ios-tokens.tsv`
  - `harness/expected/harness-android-tokens.tsv`
  - `harness/expected/harness-ios-components.tsv`
  - `harness/expected/harness-android-components.tsv`
  - `harness/fixtures/product-tokens/**` (added by amendment 3, under Peter's "C confirmed"; Task 1, which created it, is done)
  - `src/components/core/*/platforms/android/**`, only for the `import com.designerpunk.tokens.LocalDPTheme` line, written by Lina in 11.5 (added in amendment 3's review fold)
  - `scripts/harness/__tests__/native-rules-emitter.test.ts` (added by amendment 3)

  **Completion Documentation:**
  - Detailed: `.kiro/specs/129-consumer-generation-completeness/completion/task-11-completion.md`
  - Summary: `docs/specs/129-consumer-generation-completeness/task-11-summary.md`

  **Post-Completion:** mark complete; `complete-task.sh "Task 11 Complete: Native theme emission (129)"` opens U6's PR; report the URL; STOP. U6's merge fires the MIDPOINT pass.

  - [ ] 11.1 The scaffolded dark-override file fixed (design § 16; Ada R1 (d))
    **Type**: Setup · **Validation**: Tier 1 - Minimal · **Agent**: Ada (Sonnet)
    - _Requirements: 4.2_
  - [ ] 11.2 Fixed binding, holders, instances, providers, the local; resolved values through § 6's converter; the theme-instance rule, the family and both providers' family parameter, the exact-set tests on configs S and C, the default-name case and the comparison test (amended 2026-11-06, tasks amendment 3)
    **Type**: Implementation · **Validation**: Tier 2 - Standard · **Agent**: Ada (Sonnet)
    - _Requirements: 4.1, 4.2_
  - [ ] 11.3 Index names and README; product-token emitters (`extension DesignerPunkTheme`, `LocalDPTheme`); the composite refusal, the fixture change and what `generate` does on a refusal (amended 2026-11-06, tasks amendment 3)
    **Type**: Implementation · **Validation**: Tier 2 - Standard · **Agent**: Ada (Sonnet)
    - _Requirements: 2.3, 4.8, 5.6_
  - [ ] 11.4 Re-baseline the 094 fixtures; the real-definition tests
    **Type**: Implementation · **Validation**: Tier 2 - Standard · **Agent**: Ada (Sonnet)
    - _Requirements: 1.7, 4.3_
  - [ ] 11.5 Row 12 item 3 colours, Button-CTA bare reads, the two re-points; the `LocalDPTheme` import in the 25 Android component files (amended 2026-11-06, review fold); the row 2 and row 15 list removals
    **Type**: Implementation · **Validation**: Tier 2 - Standard · **Agent**: Lina (Sonnet)
    - _Requirements: 4.5, 4.7, 4.10_

### UNIT 7 — Component theme reads and repairs

- [ ] 12. Component theme reads, the theme-read guard, Progress-Bar and ripple (U7)

  **Type**: Parent · **Validation**: Tier 3 - Comprehensive · **Agent (plan)**: PRIMARY Lina (Sonnet)
  **Traces**: Req 2.10, 4.4, 4.6, 4.7, 4.10, 8.2, 8.4; rows 14 (A5, A6's ripple part, A7), 15, 16 · design § 13

  **Success Criteria:**
  - A two-sided Jest guard in `src/components/__tests__/` fails on any component `theme.` read the generated Swift or Kotlin does not declare, and on any `DesignTokens.<semantic colour>` read, with a pinned list that only shrinks and holds neither of the two re-pointed reads.
  - The guard carries `@category temporary`, retiring when `harness-ios-components` and `harness-android-components` are both required.
  - On iOS, row 16's reads in Progress-Bar drop the malformed prefix, accepted by `harness-ios-components` with their entries removed in this diff.
  - On Android, row 16's reads in Progress-Bar drop the malformed prefix, accepted by `harness-android-components` with their entries removed in this diff.
  - At this head, no entry on `harness-ios-components` is tagged to row 15.
  - At this head, no entry on `harness-android-components` is tagged to row 15.
  - Every component colour read resolves under Q13 (a), accepted by `harness-ios-components` with no entry tagged to row 2 at this head.
  - Every component colour read resolves under Q13 (a), accepted by `harness-android-components` with no entry tagged to row 2 at this head.
  - `rememberRipple` is replaced by `ripple(...)` at Button-Icon, Input-Checkbox-Base and Input-Radio-Base, accepted by `harness-android-components` with the three entries tagged to row 14's A5, A6 and A7 removed in this diff.
  - A text guard in `lane-functional-root` fails on a `rememberRipple` import in `VerticalListButtonItem.android.kt`, and the import is removed.
  - Row 14's record says that A3, I1–I3, A1, A2, A4 and A6's non-ripple parts move to Spec 132, dated and signed by Lina.
  - All four harness contexts ran on this unit's PR, and this parent's completion doc carries each one's run URL and pasted summary line at head H, the last head whose `git diff --name-only H M` to the merged head M touches only `completion/**`, `docs/specs/**` and the PR's records (Conventions).
  - Every root record whose Trigger names `task-12-completion.md` carries, at U7's merge, its owner's rule 5 outcome line or a re-ruled Trigger with a dated reason, made in U7's PR or in a PR merged before it.

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
  - [ ] 12.2 Row 16; the row 15 and row 2 state checks
    **Type**: Implementation · **Validation**: Tier 2 - Standard · **Agent**: Lina (Sonnet)
    - _Requirements: 4.6, 4.7, 4.10_
  - [ ] 12.3 Ripple, the dead-import guard, row 14's outcome lines for A5 and A7
    **Type**: Implementation · **Validation**: Tier 2 - Standard · **Agent**: Lina (Sonnet)
    - _Requirements: 8.2, 8.4_

### UNIT 8 — The component tier reaches `generate`

- [ ] 13. Ship and harvest DesignerPunk's component tokens; precedence; the name contract (U8)

  **Type**: Parent · **Validation**: Tier 3 - Comprehensive · **Agent (plan)**: PRIMARY Ada (Sonnet) · Lina (Sonnet) — enums, row 18 R1, the cascade sentence
  **Traces**: Req 1.3, 2.10, 5.1–5.5, 5.7, 5.8, 5.10, 5.11; rows 18 (R1, R5) · design §§ 9, 11

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
  - The hand-written `AvatarTokens` and `BadgeLabelBaseTokens` enums are removed from `Avatar.ios.swift` and `BadgeLabelBase.ios.swift` in this diff, the same diff that turns on the third source, and the Android `AvatarTokens` / `GeneratedAvatarTokens` collision is resolved in it.
  - `generate` warns, naming the file, on a `.kt` file in `com.designerpunk.tokens` or `com.designerpunk.components.*` outside the skipped trees of design § 9, and a Jest test accepts the warning text.
  - When a consumer's group replaces ours and a shipped component reads a key their group lacks, `sync` reports the key and the component, accepted by a `Consumer Guard` case.
  - `sync`'s pre-123 migration reports a copied single-family component-token file by path and offers the record's fix, accepted by a Jest test.
  - When the generated output is not byte-identical to a fresh regeneration into a temporary directory (outside the header's timestamp), the name-contract run says so, accepted by a `Consumer Guard` case whose inputs change after the last `generate`, and `src/cli/staleness.ts` no longer decides freshness by file times.
  - `.kiro/specs/123-consumer-distribution/requirements.md` § Requirement 1.5 carries a dated pointer line to `design.md` § 9's signed decision.
  - The Integration Guide says, in Lina's text with Sparky, to import the consumer's own `ComponentTokens.web.css` after the package's `component-tokens.css`, that on web "yours wins" is per token by order, and that bundler code-splitting can reorder CSS chunks.
  - The token and component contexts at this head show every addition this diff makes printed under exception (c) with a tag.
  - All four harness contexts ran on this unit's PR, and this parent's completion doc carries each one's run URL and pasted summary line at head H, the last head whose `git diff --name-only H M` to the merged head M touches only `completion/**`, `docs/specs/**` and the PR's records (Conventions).
  - Every root record whose Trigger names `task-13-completion.md` carries, at U8's merge, its owner's rule 5 outcome line or a re-ruled Trigger with a dated reason, made in U8's PR or in a PR merged before it.

  **Primary Artifacts:**
  - `package.json` (`files[]`)
  - `scripts/pack-assert.ts`
  - `scripts/build-name-contract.ts`
  - `src/cli/**`
  - `src/generators/**`
  - `src/build/tokens/**`
  - `scripts/harness/d2-check.ts`
  - `scripts/harness/__tests__/d2-check.test.ts`
  - `.github/workflows/native-harness.yml` (one step added to `harness-generate`)
  - `tests/consumer-integration.test.ts`
  - `application-mcp-server/src/**/__tests__/**` (only where a suite reading the real `token-index/components.yaml` asserts the per-token merge)
  - `src/components/core/Avatar-Base/platforms/**`
  - `src/components/core/Badge-Label-Base/platforms/**`
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
    - `src/cli/shared/packageComponentTokens.ts` (the per-group merge) and `src/cli/shared/componentSources.ts` (the union rule)
    - _Requirements: 5.1, 5.2, 5.3_
  - [ ] 13.2 The name contract over the component tier; the reserved-package warning; R5 freshness (content, `src/cli/staleness.ts`)
    **Type**: Implementation · **Validation**: Tier 2 - Standard · **Agent**: Ada (Sonnet)
    - _Requirements: 5.4, 5.8_
  - [ ] 13.3 The D2 check and its completeness half; its step in `harness-generate`
    **Type**: Implementation · **Validation**: Tier 2 - Standard · **Agent**: Ada (Sonnet)
    - _Requirements: 1.3, 5.10_
  - [ ] 13.4 The hand-written enums; row 18 R1 (`src/cli/sync/**`, Ada consulted); the missing-key report
    **Type**: Implementation · **Validation**: Tier 2 - Standard · **Agent**: Lina (Sonnet)
    - _Requirements: 5.1, 5.7, 5.11_
  - [ ] 13.5 The Integration Guide cascade sentence; confirm the Spec 123 pointer line (Lina lands it in her own PR before U8)
    **Type**: Documentation · **Validation**: Tier 1 - Minimal · **Agent**: Lina (Sonnet)
    - _Requirements: 5.5_

### UNIT 9 — `generate` reads the consumer's own source

- [ ] 14. The six groups and the theme registry from the consumer's copy (U9)

  **Type**: Parent · **Validation**: Tier 3 - Comprehensive · **Agent (plan)**: PRIMARY Ada (Sonnet) · Sparky (Sonnet) — his charter line, the Q3b browser check and the review of the web single-mode form (14.6; added 2026-11-06, `[SPARKY R3]` fix 5) · Lina (Sonnet) — regeneration and the lock · Thurgood (Sonnet) — the profile author's acts
  **Traces**: Req 2.10, 4.1 (as amended: the custom-theme instances from U9), 9.2, 9.3, 9.4, 9.5 (as amended), 10.4, 15.1 (the served sentences); rows 19, 20 (row (g)) · design § 10 (as amended 2026-11-05); § 4 (the theme-instance rule's items 2, 3 and 5, the single-mode rule; amendment 3)

  **Success Criteria:**
  - For each of the six groups `docs/consumer/INSTALL.md` L77 names at `45f5262ee`, a `Consumer Guard` case edits it in the copied source, runs `generate`, and finds the edited value in the output, on web in the generated CSS.
  - With the package's own copies of the six groups removed from the installed `node_modules`, `generate` succeeds with byte-identical output for a fresh-`init` config that registers every built-in theme map, accepted by `Consumer Guard` case (b) (Req 9.5 as amended).
  - `generate` builds the theme registry from the config's `themes`, and the static imports at `generateTokenFiles.ts` L19–21 are removed.
  - A Jest test of the theme-source resolver covers the `dark`, `wcag` light and `wcag` dark maps, each registered, unregistered and registered-but-missing, in local and in package mode: registered reads the adopter's file, registered-but-missing fails `generate` naming the file, unregistered reads the package's built-in at run time through `scopedTsRequire`, and package mode reads the package's built-ins.
  - `ConfigTheme` accepts an optional `{ light, dark }` form, and `init` writes the WCAG entry with both maps.
  - `scripts/harness/consumer.ts` writes each theme entry into `harness-consumer.json`'s `themes` with its `mode` and, for a `{ light, dark }` entry, `pair: true`, which the shared module's `ThemeEntry.pair` reads for refusals (c) and (g); `scripts/harness/__tests__/consumer.test.ts` shows a pair-form entry carried with `mode: 'both'` and `pair: true`. At head H, with `init` writing the WCAG entry in the pair form, both token contexts' per-run instance check is `ok: true` and not `not checked` *(added 2026-11-06, tasks amendment 4, `[THURGOOD R9]` item 3, on Data's 4.3 report and Kenya's note; Thurgood consulted as the module's owner)*.
  - `Consumer Guard` case (a), a test01-shaped fixture with copies of all three built-in maps that differ from the package's and only `wcag` light registered, finds the `dark` and WCAG-dark web output byte-identical to the pre-U9 golden at `tests/fixtures/pre-u9-theme-css/`, whose header names its source SHA (the U9 branch's base on `main`) and the exact command that captured it, so it can be reproduced byte for byte at that SHA (amended 2026-11-06, `[STACY TASKS R2]` Medium-6, Low-3).
  - In case (a), the `wcag` light output equals the fixture's own file, and the first run prints how many of its values differ from DesignerPunk's built-in.
  - In case (a), the bridge warning of design § 10 prints for `dark` and for WCAG dark, word for word, on each of two consecutive `generate` runs.
  - `Consumer Guard` case (b), a fresh-`init` config that registers all three maps, prints no bridge warning.
  - `Consumer Guard` case (c), `wcag` registered with empty overrides, shows each `:root[data-theme="wcag"]` value equal to the same run's base `:root` value, and prints no warning.
  - `Consumer Guard` case (d), package mode, prints no warning and applies the package's built-ins.
  - `generate` never fails on an unregistered built-in map (Ada's "print, not fail", #682), and this parent's summary doc carries release-note text naming the bridge, its retirement at the next major, and that a registered built-in map now applies the adopter's own values (Req 10.4).
  - A registered custom theme emits as `:root[data-theme="<name>"]`, and the `generate` message "registered, not applied yet" (`errorCatalog.ts` L557) changes in this diff.
  - **Custom themes reach native output.** A `Consumer Guard` case runs `generate` on Task 11's config C, through the config, and finds that it emits on iOS and Android exactly the instance set and the family cases Task 11's exact-set test lists for config C, and no longer prints "registered, not applied yet" for `high-contrast`, `brand` or `default` (design § 4, the theme-instance rule, item 3); from this unit the `wcag` case's doc comment also names the bridge source where a built-in map applies (design § 4, `[LEONARDO R2]`) *(added 2026-11-06, tasks amendment 3; the instrument named in the review fold, `[STACY TASKS R4]` Medium-2)*.
  - **The WCAG dark composition** (design § 4, the theme-instance rule, item 2; design § 10, "Effects"): when the maps come from the config, `wcagDark` is the base dark context with `dark`, then `wcag` light, then `wcag` dark applied, each layer read from where the bridge says, accepted by a Jest case on a member each of the three maps overrides and on one that only `dark` and `wcag` light override. For a config that registers `wcag` light only, the top layer is the package's built-in `dark-wcag` map, and the bridge warning names it *(added 2026-11-06, tasks amendment 3, Ada's block 1c and rule item 2)*.
  - **The theme-instance rule's refusals** (design § 4, item 5, "Where the refusals land"; Peter's "5 U9", received 2026-11-06T22:38:12Z). Each of (a)–(h) is measured first under Req 10.4 against a scratch copy of test01's config and product tokens (never `generate` in test01 itself; `[ADA R3]` fix 3), a scratch `init` from a 15.x-born packed install and the repository's fixtures, and this parent's completion doc records, per refusal, the configs read and whether any is affected. A refusal no supported consumer trips ships in U9's release as a `generate` failure naming the config entry. One that a supported consumer trips prints its message as a warning, with the per-refusal fallback design § 4 lists for it, until 17.0.0 (`[ADA R3]` fix 2). Which form ships is decided from the code at H, not from the release (`[STACY TASKS R4]` Low-4). A Jest test per refusal, named by Ada, accepts the form it ships in *(added 2026-11-06, tasks amendment 3; the refusal tests were moved here from Task 11 on Lina's note, `[LINA R2]` note 1)*.
  - **The web form of the single-mode rule** (design § 4, "The single-mode rule"; Sparky's consult, `[SPARKY R2]`): a registered theme of one mode emits `light-dark()` with its uncovered half from `baseLight` or `baseDark` and no `color-scheme` line, a token whose two values are equal is written as a plain value, and `CSSThemeScoping.test.ts` is rewritten from its dark-only pin (L27–44 at `233e04bf1`). It is accepted by Jest cases in `CSSThemeScoping.test.ts` for a theme of mode `light` and one of mode `dark`, each built with only its covered mode's tokens (the `ThemeOverrideSet` shape of `TokenFileGenerator.ts` L97–100). Each case asserts the exact `light-dark(…)` string for a token whose base values differ across modes, a plain value for a token whose theme value equals the uncovered base value, and no `color-scheme` line in the block; a fixture that gave the theme both maps would pass today's skip at L1095. And `generate` on Task 11's config C writes `:root[data-theme="brand"]` and `:root[data-theme="default"]` in that form, accepted by a `Consumer Guard` case *(instrument and the `generate` run added in the review fold, Sparky's text, `[SPARKY R3]` fixes 1 and 2)*. This parent's summary doc carries the release-note text on what a theme of one mode shows in its other scheme, on web and native *(added 2026-11-06, tasks amendment 3, under Peter's "fall back to base", received 2026-11-06T23:37:03Z)*.
  - The web agent's line on registered themes (`canonical/agents/sparky.md` L313 at `d7f87174c`) states, in Sparky's words, that a registered theme emits as `:root[data-theme="<name>"]`, which matches `<html>` only, and that a theme on any other element still matches nothing.
  - INSTALL L77's exception for the override maps is reworded, not removed (Req 9.3, 15): they still come from the package for each built-in theme the config does not register, until the next major.
  - The served sentences that say a registered theme is "not applied yet" or does not produce a `[data-theme]` block (`governance/Rosetta-System-Architecture.md` L566, `governance/Token-Quick-Reference.md` L114, and the Integration Guide L158 and L546 at `d7f87174c`, with INSTALL re-derived) state what is emitted, each in its owner's words, in this diff.
  - `npx tsx tools/agent-generator/diff-guard.ts` is green on the branch, `canonical/generated.lock` is the one a green run wrote, no authoring commit moves a `canonicalHash`, and `verify-signing-chain.ts --audit --pr <n>` is green after Sparky's confirmation and signature.
  - Before U9's PR opens, Sparky's browser check for Q3b is committed at `evidence/q3b-browser-check.md`, naming the browser and its version, and the Q3b fork is filed as its own root record (Ada, with Leonardo on intent) with a Trigger, so U9's PR body asks Peter nothing about it *(Amended 2026-11-06, tasks amendment 1, `[STACY TASKS R2]` Medium-5; prior text at `8d8ba1425`.)*
  - A Jest guard fails on a new value import from `src/tokens` under `src/generators`, `src/providers`, `src/resolvers` and `src/blend`.
  - A Jest test fails when the repository's root token files differ from a fresh generation from the base config.
  - The completion doc states which `ColorTokens.ts` importers this parent removed and which remain, and `.kiro/specs/133-color-track/design-outline.md` § 4 is corrected to match in this diff.
  - The harness compiles one copy of each native file name: the consumer's copy of `src/tokens/platforms/{ios,android}/**` once this unit reads the consumer's source, and Kenya and Data confirm that rule in this parent's completion doc.
  - All four harness contexts ran on this unit's PR, and this parent's completion doc carries each one's run URL and pasted summary line at head H, the last head whose `git diff --name-only H M` to the merged head M touches only `completion/**`, `docs/specs/**` and the PR's records (Conventions).
  - Every root record whose Trigger names `task-14-completion.md` carries, at U9's merge, its owner's rule 5 outcome line or a re-ruled Trigger with a dated reason, made in U9's PR or in a PR merged before it.

  **Primary Artifacts:**
  - `src/generators/generateTokenFiles.ts`
  - `src/generators/**`
  - `src/providers/**`
  - `src/resolvers/**`
  - `src/blend/**`
  - `src/themes/**`
  - `src/config/**`
  - `src/cli/**`
  - `src/tokens/**`
  - `tests/consumer-integration.test.ts`
  - `tests/fixtures/pre-u9-theme-css/**`
  - `.kiro/specs/133-color-track/design-outline.md`
  - `.kiro/specs/129-consumer-generation-completeness/evidence/q3b-browser-check.md`
  - `.kiro/issues/*-q3b-web-data-theme-selector-scope.md` (the Q3b record; Ada's, filed before U9's PR opens)
  - `scripts/harness/consumer.ts`
  - `scripts/harness/__tests__/consumer.test.ts` (added by amendment 4, for the manifest's `pair` field)
  - `harness/ios/**` (only for the one-copy rule)
  - `harness/android/**` (only for the one-copy rule)
  - `canonical/agents/sparky.md`
  - `canonical/operative-sets/sparky.yaml`
  - `canonical/profiles/consumer/sparky.overlay.md`
  - `canonical/profiles/consumer/sparky.dispositions.yaml`
  - `canonical/_consumer-output/**` (regenerated, never hand-edited)
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

  **Post-Completion:** mark complete; `complete-task.sh "Task 14 Complete: generate reads the consumer's own source (129)"` opens U9's PR (Peter-merged: `governance/**` and charter text; `**Edit kind**:` EXECUTION per file, Ada R1); report the URL; STOP.

  - [ ] 14.1 One loaded token set from the consumer's barrel; the value-import guard; the removal case
    **Type**: Implementation · **Validation**: Tier 2 - Standard · **Agent**: Ada (Sonnet)
    - _Requirements: 9.2, 9.5_
  - [ ] 14.2 The theme registry from config (`src/themes/ThemeRegistry.ts`); the registration-keyed bridge, its warning and first-run count; package mode; the `{ light, dark }` form; the golden capture; cases (a)–(d)
    **Type**: Implementation · **Validation**: Tier 2 - Standard · **Agent**: Ada (Sonnet)
    - _Requirements: 9.2, 9.3_
  - [ ] 14.3 Row (g)'s freshness test; the 133 outline correction; the one-copy rule
    **Type**: Implementation · **Validation**: Tier 2 - Standard · **Agent**: Ada (Sonnet)
    - _Requirements: 9.4_
  - [ ] 14.4 The served sentences on registered themes; the web agent line; regeneration, profile-author acts, then Sparky's confirmation and signature
    **Type**: Documentation · **Validation**: Tier 2 - Standard · **Agent**: Ada (Sonnet), Sparky (Sonnet), Lina (Sonnet), Thurgood (Sonnet)
    - _Requirements: 15.1_
  - [ ] 14.5 The Q3b browser check and the Q3b record, before U9's PR opens
    **Type**: Setup · **Validation**: Tier 1 - Minimal · **Agent**: Sparky (Sonnet)
    - Runs after 14.6, and also renders one DesignerPunk component under config C's `brand` and `default` in both schemes, recording the colour it resolves in `evidence/q3b-browser-check.md` (`[SPARKY R3]` fix 6, added in the review fold: Jest checks strings, not that `light-dark()` resolves inside a shadow root)
    - _Requirements: 9 (Q3b, carried to design)_
  - [ ] 14.6 The theme-instance rule at U9: custom themes' native instances and family cases, the WCAG dark composition from config, each refusal measured then shipped or warned, and the web single-mode form *(added 2026-11-06, tasks amendment 3)*
    **Type**: Implementation · **Validation**: Tier 2 - Standard · **Agent**: Ada (Sonnet)
    - Sparky reviews the web form against his consult before U9's PR opens
    - _Requirements: 4.1, 9.2, 10.4_

### UNIT 10 — `init` runs `generate`; per-platform output paths

- [ ] 15. `init` runs `generate`, and `platforms:` writes each platform where its build reads it (U10)

  **Type**: Parent · **Validation**: Tier 3 - Comprehensive · **Agent (plan)**: PRIMARY Ada (Sonnet) · Thurgood (Sonnet) — INSTALL derivation and `install-doc.test.ts`
  **Traces**: Req 2.10, 11.1–11.4, 12.1–12.4 · design §§ 12a, 14

  **Success Criteria:**
  - After `init` alone, a `Consumer Guard` case finds the token output and `token-index/`, and a `generate` run straight after writes byte-identical output.
  - Personal-note creation stays in the CLI layer, and `src/generators/generateTokenFiles.ts` gains no personal-note code.
  - When `generate` fails inside `init`, `init` finishes the config, the copied token source and the agent layer, prints `generate`'s message led by the re-run command, and exits non-zero, accepted by a `Consumer Guard` case.
  - INSTALL's founder path has the four steps of design § 14 in Leonardo's text, its `path-steps` front matter reads `founder: 4`, and `install-doc.test.ts` passes, all in this diff.
  - `init`'s closing message names the output folder and `generate`'s role in design § 14's words.
  - The config accepts `platforms:` with keys from `PLATFORM_KEYS = ['web', 'ios', 'android']` in `src/config/`, and the CLI validation imports the constant.
  - A `Consumer Guard` case with a `platforms:` config in Spec 132's D4 layout (`ios/<dir>`, `android/<dir>`, beside a root `package.json`) finds each named platform's files at its path and every other platform, web included, at `output`.
  - An unknown platform key, or a path resolving outside the project root, fails `generate` with a message naming it, accepted by Jest tests.
  - A folder `platforms:` names holds only that platform's files, and `pack-assert` fails when a generated native file name equals a packaged native source file name.
  - The harness consumer uses the same D4 layout through `harness/pins.yaml` § `consumer`, and the four lists' `gen:` keys are unchanged in this diff (the `gen:` path rule).
  - All four harness contexts ran on this unit's PR, and this parent's completion doc carries each one's run URL and pasted summary line at head H, the last head whose `git diff --name-only H M` to the merged head M touches only `completion/**`, `docs/specs/**` and the PR's records (Conventions).

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
  - `scripts/harness/consumer.ts`
  - `harness/pins.yaml` (the `consumer` section)

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
  - [ ] 15.3 `platforms:`, `PLATFORM_KEYS`, validation, the file-name check; the harness consumer's D4 layout
    **Type**: Implementation · **Validation**: Tier 2 - Standard · **Agent**: Ada (Sonnet)
    - Kenya and Data consulted on the layout; no lane changes
    - _Requirements: 12.1, 12.2, 12.3, 12.4_

### UNIT 11 — Charter and overlay text for item (i)

- [ ] 16. Kenya's and Data's theming text, and the consumer overlays, say what is emitted (U11)

  **Type**: Parent · **Validation**: Tier 3 - Comprehensive · **Agent (plan)**: PRIMARY Kenya (Sonnet) · Data (Sonnet) — his charter and overlay text · Lina (Sonnet) — regeneration and the lock · Thurgood (Sonnet) — the profile author's acts
  **Traces**: Req 2.10, 4.9

  **Success Criteria:**
  - `canonical/agents/kenya.md`'s theming section states what item (i) emits on iOS: the fixed contract (`protocol DesignerPunkTheme: Sendable`, `DPThemeKey`, `\.dpTheme`), the consumer-named `<Name>Themes` holder and instances, the `<Name>ThemeFamily` family and the `.<name>Theme(_ family:)` provider and its single-mode fallback (a theme of one mode shows base in the other scheme; registering it in mode `both` gives it its own look in both), the family's lack of a raw value, every colour semantic read through the theme, and product tokens extending `DesignerPunkTheme` *(amended 2026-11-06, tasks amendment 3, under Peter's "6 (b)" and "A enum"; prior text at `233e04bf1`: "the `.<name>Theme()` provider"; the fallback, the `mode: both` remedy and the raw value added in the review fold, `[KENYA R4]` item 8, `[LEONARDO R2]`)*.
  - `canonical/agents/data.md`'s theming section states what item (i) emits on Android: `DesignerPunkTheme`, `LocalDPTheme` and its static default, the `<Name>Themes` holder, the `<Name>ThemeFamily` family and the `<Name>Theme(family = …, darkTheme = …)` provider, its single-mode fallback (a theme of one mode shows the base instance in its other scheme; registering it in mode `both` gives it its own look in both), that `darkTheme` forces a scheme, and every colour semantic read through the theme *(amended 2026-11-06, tasks amendment 3, under Peter's "6 (b)" and "A enum"; prior text at `233e04bf1`: "the `<Name>Theme(darkTheme = …)` provider"; the fallback, the remedy and `darkTheme` added in the review fold, `[DATA R4]` item 5, `[LEONARDO R2]`)*.
  - `canonical/profiles/consumer/kenya.overlay.md` and `data.overlay.md`, and `canonical/operative-sets/kenya.yaml` and `data.yaml`, no longer carry their "no theme surface today" text, and each states what is emitted.
  - `npx tsx tools/agent-generator/diff-guard.ts` is green on the branch, and `canonical/generated.lock` is the one a green run wrote.
  - Kenya's and Data's re-confirmations (C16) are each a `canonicalHash` move in `canonical/operative-sets/<seat>.yaml` with its record in `canonical/profiles/consumer/confirmations/<seat>.md`; their signatures (C1) are each the dispositions row and `canonical/profiles/consumer/signatures/<seat>.md`; and `npx tsx tools/agent-generator/regrounding/verify-signing-chain.ts --audit --pr <n>` is green, with no authoring commit moving a `canonicalHash` *(Amended 2026-11-06, tasks amendment 1, `[STACY TASKS R2]` Medium-3; prior text at `8d8ba1425`.)*
  - At U11's merge, `git tag --contains <U6's merge commit>` prints no release tag.
  - All four harness contexts ran on this unit's PR, and this parent's completion doc carries each one's run URL and pasted summary line at head H, the last head whose `git diff --name-only H M` to the merged head M touches only `completion/**`, `docs/specs/**` and the PR's records (Conventions).

  **Primary Artifacts:**
  - `canonical/agents/kenya.md`
  - `canonical/agents/data.md`
  - `canonical/profiles/consumer/kenya.overlay.md`
  - `canonical/profiles/consumer/data.overlay.md`
  - `canonical/profiles/consumer/kenya.dispositions.yaml`
  - `canonical/profiles/consumer/data.dispositions.yaml`
  - `canonical/operative-sets/kenya.yaml`
  - `canonical/operative-sets/data.yaml`
  - `canonical/manifests/kenya.cc.ambient-manifest.json` (only if the generator rewrites it)
  - `canonical/manifests/kenya.kiro.ambient-manifest.json` (only if the generator rewrites it)
  - `canonical/manifests/data.cc.ambient-manifest.json` (only if the generator rewrites it)
  - `canonical/manifests/data.kiro.ambient-manifest.json` (only if the generator rewrites it)
  - `canonical/_consumer-output/**` (regenerated, never hand-edited)
  - `canonical/generated.lock`
  - `.claude/agents/**` (regenerated, never hand-edited)
  - `.kiro/agents/**` (regenerated, never hand-edited)

  **Completion Documentation:**
  - Detailed: `.kiro/specs/129-consumer-generation-completeness/completion/task-16-completion.md`
  - Summary: `docs/specs/129-consumer-generation-completeness/task-16-summary.md`

  **Post-Completion:** mark complete; `complete-task.sh "Task 16 Complete: Charter and overlay text for item (i) (129)"` opens U11's PR (Peter-merged: charter text; `**Edit kind**:` per file); report the URL; STOP.

  - [ ] 16.1 Charter and overlay text
    **Type**: Documentation · **Validation**: Tier 2 - Standard · **Agent**: Kenya (Sonnet), Data (Sonnet)
    - _Requirements: 4.9_
  - [ ] 16.2 Operative-set re-quotes, overlay pins, dispositions
    **Type**: Documentation · **Validation**: Tier 2 - Standard · **Agent**: Thurgood (Sonnet)
    - _Requirements: 4.9_
  - [ ] 16.3 Regenerate and lock; then the owners' confirmations and signatures
    **Type**: Implementation · **Validation**: Tier 2 - Standard · **Agent**: Lina (Sonnet)
    - Signatures are the signers' attestations, outside every delegated-tier line
    - _Requirements: 4.9_

### UNIT 12 — Closeout

- [ ] 17. Retire the native root files and announce it (U12)

  **Type**: Parent · **Validation**: Tier 3 - Comprehensive · **Agent (plan)**: PRIMARY Ada (Sonnet)
  **Traces**: Req 10.1 (as amended), 10.2, 10.4 · design § 0 (7 (a))

  **Success Criteria:**
  - The package stops shipping `dist/DesignTokens.ios.swift`, `dist/DesignTokens.android.kt`, `dist/ComponentTokens.ios.swift` and `dist/ComponentTokens.android.kt`, and `pack-assert` asserts each is absent.
  - `dist/ComponentTokens.web.css` and the web CSS exports still ship, and `pack-assert` asserts each is present.
  - U6's and U8's merge commits are ancestors of U12's merge, by `git merge-base --is-ancestor`.
  - The `CHANGELOG.md` `[Unreleased]` entry announces the retirement, says the consumer's own `generate` now emits what the snapshot carried, and names item (iii), I-1 and I-2 as changes that may break a consumer.
  - Charter item (iii) in `.kiro/issues/2026-10-02-consumer-generation-completeness-spec.md` cites Peter's 7 (a) in place of "at the next MAJOR", edited by Ada.

  **Primary Artifacts:**
  - `package.json` (`files[]`)
  - `scripts/pack-assert.ts`
  - `scripts/generate-platform-tokens.ts`
  - `CHANGELOG.md`
  - `.kiro/issues/2026-10-02-consumer-generation-completeness-spec.md`

  **Completion Documentation:**
  - Detailed: `.kiro/specs/129-consumer-generation-completeness/completion/task-17-completion.md`
  - Summary: `docs/specs/129-consumer-generation-completeness/task-17-summary.md`

  **Post-Completion:** mark complete; `complete-task.sh "Task 17 Complete: Retire the native root files (129)"` commits on the U12 branch (no PR: U12's PR opens at Task 18); STOP. The release that carries U12 is read at Stacy's RELEASE pass.

  - [ ] 17.1 `files[]`, `pack-assert`, the build script; the CHANGELOG entry; the charter sentence
    **Type**: Implementation · **Validation**: Tier 2 - Standard · **Agent**: Ada (Sonnet)
    - _Requirements: 10.1, 10.2, 10.4_

- [ ] 18. Acceptance at the final head, and the shipped wording (U12)

  **Type**: Parent · **Validation**: Tier 3 - Comprehensive · **Agent (plan)**: PRIMARY Thurgood (Sonnet) · Kenya (Sonnet), Data (Sonnet) — the "Native status" passage
  **Traces**: Req 1.1–1.7, 2.10, 9.3, 14.1, 14.3, 15.1, 15.5, 15.6

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
  - Each of the twelve units' gating parents' completion docs carries the four contexts' run URLs and pasted summary lines at that unit's head H (Conventions), and the checks API shows all four contexts' conclusions at each unit's merged head M, with no 129 unit PR missing one.
  - A grep of the CHANGELOG, INSTALL, the Integration Guide, the READMEs, the consumer overlays, the served corpus and `generate`'s messages at each release S in 129's range finds no claim that a tier "compiles" while its list held entries, and each release that carried the harness says "compile except N pinned errors, listed at <path>; no app linked, no tests run" with N its count at S (the grep decides "compiles"; other wording is Stacy's RELEASE reading).
  - At U12's head, no shipped text names a `dist/` file Task 17 removes (the Integration Guide's L167, L170, L180 and L181 at `d7f87174c` included), with INSTALL re-derived.
  - Where item (i) shipped in a release before U9, that release's CHANGELOG limitation was rewritten to say what still came from the package (Req 9.3), or the completion doc states it did not arise.
  - The Integration Guide's "Native status" passage states 129's reach as Requirement 1 accepts it, in Kenya's and Data's words, as a CORRECTION edit, with "compiled for an iOS 17.0 deployment target; not run on any device or simulator" and "compiled for Android API 26 (`minSdk`); not run on any device or emulator".
  - `governance/Token-Governance.md` § "Theme Registry (Spec 094)" matches items (i) and (vi) as shipped, through a ratified ballot applied before the S of the release that carried U9.
  - `derivePlatformReadiness`'s native test patterns in `application-mcp-server/src/indexer/ComponentIndexer.ts` are unchanged over 129's range, by `git log` over that range on the file.
  - No 129 shipped text claims runtime theme switching on iOS or Android.
  - `.github/in-lane-guards.json` gains an entry for `scripts/harness/__tests__/d2-check.test.ts` and one for `scripts/harness/__tests__/native-rules-emitter.test.ts` (added 2026-11-06, tasks amendment 3 review fold, `[LINA R3]` fix 2a, `[STACY TASKS R4]` Low-2), in a PR whose `.github/**` changes are exactly that file, with the additivity predicate `true` and the check's `N registered; N selected` line green (`[STACY TASKS R2]` Low-1).
  - Every root record whose Trigger names `task-18-completion.md` carries, at U12's merge, its owner's rule 5 outcome line or a re-ruled Trigger with a dated reason, made in U12's PR or in a PR merged before it.

  **Primary Artifacts:**
  - `governance/DesignerPunk-Integration-Guide.md`
  - `docs/consumer/INSTALL.md` (derived)
  - `.kiro/specs/129-consumer-generation-completeness/evidence/harness-stability.md`
  - `.github/in-lane-guards.json` (Thurgood's standing P1b scope)

  **Completion Documentation:**
  - Detailed: `.kiro/specs/129-consumer-generation-completeness/completion/task-18-completion.md`
  - Summary: `docs/specs/129-consumer-generation-completeness/task-18-summary.md`

  **Post-Completion:** mark complete; `complete-task.sh "Unit 12: Closeout (129)"` opens U12's PR (Peter-merged: `governance/**`); report the URL; STOP. U12's merge fires CLOSEOUT and the signing-act shape review.

  - [ ] 18.1 Read the final head: D1, D2, D3, web; sum every unit's run records
    **Type**: Implementation · **Validation**: Tier 2 - Standard · **Agent**: Thurgood (Sonnet)
    - Entries still tagged at the final head to the component-repair record or to the blend record (`2026-06-24-blend-system-architecture-and-oklch-alignment.md`, Trigger Spec 133's requirements) are expected, not findings: both records' Triggers can fire after 129 (tasks amendment 5, under Peter's "a; blend entries fine", received 2026-11-07T02:04:38Z (`evidence/2026-11-07-peter-ruling-component-repair-record-timing.md`))
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 2.10_
  - [ ] 18.2 The release-text grep over 129's range; the retired-file sentences; the Req 9.3 read; the readiness-pattern read
    **Type**: Implementation · **Validation**: Tier 2 - Standard · **Agent**: Thurgood (Sonnet)
    - _Requirements: 1.7, 9.3, 14.1, 15.1_
  - [ ] 18.3 The "Native status" passage, iOS and Android
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
| 2 | 1 (2.1–2.3); 11 (2.3 as amended: the fixture's composite leaves); 3, 4 (2.4, 2.6–2.9); 2 (2.6's cross-tier rule); 5 (2.5, 2.11, 2.12, 2.14); every gating parent (2.10, 2.13); 11 (2.7's theme reads); 18 (2.10 summed) |
| 3 | 2 (3.1–3.11); 3, 4 (3.4, 3.11 per platform); 6 (3.10's registration) |
| 4 | 11 (4.1–4.3, 4.5, 4.7's theme name, 4.10's re-points); 14 (4.1's custom-theme instances, from U9); 5 (4.8's tagging; the shared harness module); 12 (4.4, 4.6, 4.7 and 4.10 state checks); 16 (4.9); 4.7's L816 half is a unit precondition |
| 5 | 13 (5.1–5.5, 5.7, 5.8, 5.10, 5.11); 11 (5.6, as amended); 9 (5.9) |
| 6 | 8 (6.2, 6.10); 9 (6.3–6.5, 6.7–6.9) |
| 7 | 8 |
| 8 | 12 (8.2, 8.4) |
| 9 | 14 (9.2–9.5; Q3b's browser check); 18 (9.3's read) |
| 10 | 1 (10.3); 17 (10.1 as amended, 10.2, 10.4) |
| 11 | 15 |
| 12 | 15 |
| 13 | 10 |
| 14 | 18 (14.1, 14.3) |
| 15 | 7 (15.2); 8 (15.4 for the shadow family); 14 (15.1's served sentences); 18 (15.1, 15.5, 15.6); 15.4 is also a standing rule (Conventions) |
