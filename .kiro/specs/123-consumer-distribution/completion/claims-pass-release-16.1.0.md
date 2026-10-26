# Claims Pass — RELEASE 16.1.0: release 5

**Date**: 2026-10-26 (phase 1, UTC)
**Grain**: RELEASE. Release 5, the plan's fifth CHANGELOG entry. A minor.
**Auditor**: Stacy
**Release commit S**: `a95d6bf3d0cebb3e2dc1412d5aa4f9c045227a57`, the squash of PR #494, merged by Peter 2026-10-26T01:13:37Z. Its tree `dc3955e5` equals the PR head `777339183`'s tree.
**Firing event**: RELEASE, phase 1 (RELEASE-FLOW § "The sequence" step 6): on S, after 5.1 is green (5.1 record `createdAt` 2026-10-26T01:15:18.015Z) and before the tag (5.2).
**State at this writing**: no `v16.1.0` tag on `origin` (`git ls-remote --tags origin` lists `v16.0.0` as the newest). `registry.npmjs.org/@3fn%2fcore`: `dist-tags.latest` = `16.0.0`, and neither `time` nor `versions` has a `16.1.0` key. `docs/releases/16.1.0/` does not exist. **Nothing is published.**
**Release delta**: `git log --first-parent v16.0.0..S` = **109** squash commits, #384–#494. The notes' **108** is the same range at the release base `a03b92f02` (#491), before the release PR. Since the trio freeze F `de63033b9` (#484): 10 commits, #480, #474, #487, #485, #488, #486, #489, #490, #491, #494.
**Population**:
- **New parents in the delta: 0.** `check-completion-criteria-parity` at S: `SUMMARY: parents evaluated 34, pass 34, exempt 0, fail 0; emissions 0; reds 0`, the same 34 as at 16.0.0. No spec closed a parent in this delta.
- **Issue-driven PRs** (their PR bodies and records are the claims): the floor-row fixes #450–#453, #470–#472, #478, #479, #482, #486, #488–#491; the instrument and law PRs #396–#445; the records PRs.
- **The release PR #494**: Thurgood's CHANGELOG `## [16.1.0]`, `docs/releases/release-16.1.0.md`, and the walk record's At-S and re-cut sections, read against the 5.1 dry-run tarball at S and against public 16.0.0.
- **The walk record** `.kiro/issues/2026-10-25-release-16.1.0-walk.md` at S (RELEASE-FLOW 3a), landed by #469, #484, #487 and #494.
- **Cited, not re-audited**: 16.0.0's RELEASE record (`completion/claims-pass-release-16.0.0.md`, both phases), and my seat's ARMING reads in `.kiro/issues/archive/2026-10-24-instrument-path-arming-reads-missed.md` § 5 and `.kiro/issues/2026-10-20-in-lane-registry-arming-reads.md`.

> **PHASE 1 (pre-tag, pre-publish).** **5.1 is green at S** (below). **`publish-rail liveness: owed`.** Phase 2 is a dated section appended to this file. It reads the committed step-6 `.txt` (the rail result and the 6b two-registry record) at the merge of the step-6 release-record PR. If it is drafted against that PR while it is open, it ends with the merge-confirmation line.

> **Filename convention, load-bearing.** This record is `claims-pass-release-16.1.0.md`, never `claims-pass.md`. The owed-set predicate keys on `completion/claims-pass.md`, which is Spec 123's CLOSEOUT record (#364).

> **No pass, at any grain, is ever a required check, a review gate, or a blocking condition on any PR.** #494 merged before this pass ran. This record gates neither the tag nor the publish. Where a finding meets the release floor, the record names the fork for Peter and does not pick it.

**Standards implications: list — seven new items (RS-33 … RS-39); RS-10, RS-13 and RS-28 evidenced again. § "Standards implications" below.**

## For the tag (read this first)

**Every floor-class row of the walk is fixed or ruled at S.** Row 6 (#491) and F-E8 (#488), the two that held S, are fixed, and the L59 reading is ruled not floor-class in Peter's words. Under the letter of RELEASE-FLOW 3a, where "knows" means the rows of the walk record, nothing in the walk holds the tag.

**This record makes four more texts known-false (or, for the date, unfinished) at their reader, and so puts two forks in front of 5.2.** The 16.0.0 precedent is RL-11: a false packed CHANGELOG sentence found at phase 1, which Peter chose to fix before the tag.
- **Fork 1 (RL-19, RL-20, RL-21; the packed `CHANGELOG.md`)**. L53 says "The other Kiro agents were run on a preview of this release": false. The wording is mine, from my pre-S read. L5 says no "shipped file … was removed": false, and the same entry's L21 says so. The heading's date is `TBD`: no later step can write the date into the tarball.
- **Fork 2 (RL-22; a disputed floor-class reading)**. The consumer-Stacy charter that ships in the package still describes the owed-set query's retired `touch-only` and anchor rule (#473 changed the script). The owner classes the record P2 `(record)`. The charter text is my own seat's.

**My verdict line: the tag should wait for Peter's answer on these two forks, not for a fix.** Nothing else in phase 1 holds it. The forks are in RL-19 and RL-22.

**RULED (2026-10-26)**: Peter, chat, relayed by the orchestrator, received before 2026-10-26T12:42:58Z (the orchestrator's clock; after its message presenting both forks), verbatim: "Re: 1, (A) / Re: 2, (i)". *Unverified here: chat only. Peter may confirm the relay on the PR; his words are committed in this record.*
- **Fork 1 → (a), fix before the tag.** A CHANGELOG fix PR (Thurgood, under a fresh grant) carries RL-19, RL-20 and RL-21. Its squash is the new S, 5.1 re-runs there, and this record takes a dated phase-1 addendum on the new S. The tag waits for that.
- **Fork 2 → (i), RL-22 is read floor-class, and waived for 16.1.0.** The waiver is the reading of his "(i)" against the option text the orchestrator put to him, which was "(i) floor-class, waived for 16.1.0 in his words with the fix riding #473's follow-on". This record's own (i) read "the tag waits for the follow-on PR …, or for his own-words waiver". His words do not say "waive"; the waiver rests on the option text he answered. The charter fix rides #473's follow-on. RL-22 does not hold the tag.

---

## Scope

| Dimension | This pass |
|---|---|
| New parents | **0**. Parity at S: 34/34, reds 0, emissions 0 |
| Packed artifact | the orchestrator's 5.1 dry run at S, from the main checkout (fresh clone, scripts on). I copied the tarball, re-hashed it (sha1 equal) and extracted it. Compared with public 16.0.0, re-fetched from `registry.npmjs.org` (sha1 `e9d8bfca5371eacc6fdf30579a512b280c1c165a`, equal to the packument's `dist.shasum`) |
| Walk record | at S: both 3a greps re-run, the dispositions read, every floor-class row re-checked at S (§ "The release-falsity-floor read") |
| Signing-act walk | all **109** PRs in the delta, `--audit --exclude-signer stacy`: **108 non-Stacy acts in 7 PRs** (anchored 13 · FAIL 68 · record absent 22 · anomaly 5 · unanchored 0); **135 Stacy-signed acts in 16 PRs withheld** (the delegate's, not run) |
| J | frame computed; check 4 not read; **blind re-judgment not run (owed)** |
| Peter sample | `0 / 135` |
| Pre-S baseline | my pre-S read of 2026-10-25 (findings 1–11, Q3, Q4), read at `67f32779e` against `main` `56fdf50ca`: each re-read at S (§ "The pre-S read, at S") |
| Out of scope | phase 2 (the tag, 5.3/5.4, the rail, the 6b record, cold-install smoke); the GitHub Packages registry (needs auth this seat does not hold) |

---

## RELEASE-FLOW 5.1 — the dry-run tally (as handed over; log and record read by me)

Dry run at S from the main checkout, 2026-10-26T01:14:50Z → 01:15:21Z, `exit=0`:

```text
105/105 assertions passed.
files:      1694   bytes: 6589014   pack-assert: 105/105   publish path: 16 (floor 16)
sha1:       9bc2e33ca777901fe1e2200fda597558eb622038
tarball:    /var/folders/z2/kfvx4wfj7cb3hq2gn5c7smzr0000gn/T/dp-release-kEvD5a/out/3fn-core-16.1.0.tgz
```

**My read of the log and the record** (read, not re-run):
- L1: `release-publish: dry-run of @3fn/core@16.1.0 at a95d6bf3d0cebb3e2dc1412d5aa4f9c045227a57 (fresh clone of https://github.com/3fn/DesignerPunk.git)`. That is the full SHA of S.
- `check:drift`: `✓ No package name drift detected (1540 files scanned)`.
- Floor-closure compare: `Wrote floor-closure.json`, `Closure 1: 54 files checked, 0 escaping references`, `Closure 2: 54 seed files, 16 closure files, 0 bare specifiers`. The compare prints nothing on a pass, and the run continued, so it passed.
- `verify:token-index-clean` ran after the pack, with no error line.
- **105 `PASS` lines, 0 `FAIL`**. 16 of them are `PASS: publish path:`: `nested roots []` for all three MCP bundles, and the machine-path scan over `/Users/ | /home/ | /private/var/folders/ | <clone root> ×2`.
- `release-publish-record.json`: `mode` `dry-run`, `commit` = S, `sha1` `9bc2e33c…`, `fileCount` 1694, `bytes` 6589014, `checks` 105/105, `publishedTo` `[]`, `createdAt` 2026-10-26T01:15:18.015Z.

**This tarball is not the published artifact.** 5.3 rebuilds at the tag, and the build re-stamps timestamp files, so the published sha1 will differ from `9bc2e33c…`. 6b's comparand is the 5.3 record.

---

## RELEASE-FLOW step 5a — the owed-set query, run by this pass

Run at S in the worktree (branch `chore/release-16.1.0-claims-pass-phase-1` at S, clean), 2026-10-26T01:22:28Z, `bash scripts/owed-set.sh`, exit 0. Reasons cut at 200 characters:

```text
closed	123-consumer-distribution	completion/claims-pass.md present
closed	127-completion-claims-integrity	completion/claims-pass.md present
open	046-input-checkbox-base	1 of 8 parents unticked in tasks.md (a checkbox is an assertion, not a merge fact)
stub	113-onboarding-cli-workflows	no tasks.md; files: design-outline.md
stub	128-react-react-native-platform-admission	no tasks.md; files: design-outline.md, feedback/design-outline.md, inbound-from-identity-sitting-2026-10-20.md, inbound-from-peter-user-stories-2026-10-2
stub	129-consumer-generation-completeness	no tasks.md; files: design-outline.md, feedback/design-outline.md, inbound-from-ada-android-generator-defects-2026-10-24.md
stub	130-input-switch-base	no tasks.md; files: design-outline.md, feedback.md, inbound-from-ada.md, inbound-from-lina.md
stub	131-governance-simplification	no tasks.md; files: design-outline.md, evidence/2026-10-24-ballot-audit.md, evidence/2026-10-24-test01-upgrade-rehearsal.md, evidence/ballot-audit-readers/part-1.md,
touch-only	023-component-token-compliance-audit	closing commit f546c494c 2025-12-19 predates adoption (last unticked parent ticked); last touch a6ed875a9 2026-10-23 Schema token-name drift (97/532 nor
touch-only	086-component-meta-extraction-pipeline	closing commit 278ad6d9b 2026-03-28 predates adoption (last unticked parent ticked); last touch c9679e48b 2026-10-13 Fix Application MCP readiness in 
touch-only	121-claude-code-portability	closing commit 7fb9641bf 2026-06-23 predates adoption (last unticked parent ticked); last touch 6db219208 2026-10-17 Components tier rule: turn R3 ('names beat p
touch-only	122-agent-generator	closing commit cda5c5faf 2026-07-11 predates adoption (last unticked parent ticked); last touch 7fa64c6d8 2026-09-28 PR-2: audit:coverage-map lanes section — required-
owed-set: 0 candidates; excluded: 2 closed, 1 open, 5 stub, 4 touch-only; classes a/b/c = 0/0/0; 169 specs without activity since 2026-09-19; adoption 2026-09-19 from .kiro/docs/ballots/2026-09-19-com
```

**Row-sum identity**: 0 + 2 + 1 + 5 + 4 = 12 rows printed. It holds.

**My reading: the owed set is empty by definition.** It is the same as the re-cut's run at `bb9abb934`, and #494 touched no spec directory.
- `046-input-checkbox-base` (`open`): spot-read. Its one post-adoption first-parent touch is #471 (`83cfae189`, the row-8 checkbox fix), a fix that edited the spec's docs. Its unticked parent is 7 ("Audit & Diagnose Test-Implementation Mismatches"), a pre-adoption parent never completed. No final unit merged after adoption, so it is not owed.
- The four `touch-only` rows carry closing commits that predate adoption, and their last touches are post-closure edits. This is the first release run since #473 whose printed set needed no operator correction on the anchor proxy, the shape RS-3/RS-14 tracked across four releases.

**But the shipped and in-repo texts that describe this output still describe the retired rule.** → RL-22.

## RELEASE-FLOW step 5b — the arming question

**Decided at the 2026-10-02 sitting; nothing is open, so this release decides nothing new.**
- **The CI half: ARMED.** The register row reads `check_state: armed`. At S, `audit:coverage-map` reads `audit:coverage-map: PASS (surfaces PASS · lanes PASS)` and `required contexts : 19`.
- **The authoring-time half: ADVISORY.** It rides the register row's 2026-10-02 entry, merged by #267.
- **16.0.0's RL-15 is fixed at S.** `.kiro/hooks/complete-task.sh` L68–79 says `check_state: armed` and that the local mode stays advisory ("Comment corrected 2026-10-24; prior text at e4e61eea2"). Its operator-facing warning (L638) reads: "ADVISORY ONLY — not blocking this completion (this local run is advisory; completion-criteria-parity is a required check on the unit PR, where a red blocks the merge)". RELEASE-FLOW 5b carries Thurgood's recorder's note (2026-10-24) for the same fact.

`verify-gate-registration.sh` was not run: it needs credentials this seat does not hold.

---
## The walk record at S (RELEASE-FLOW 3a)

**The record**: `.kiro/issues/2026-10-25-release-16.1.0-walk.md` (Owner Thurgood; ``**Trigger**: `release:16.1.0:phase-1` ``; Class P2 obligation (record) · owed-act). Its runs, as its sections state them:
- the walk at `main at: 652074c6b05da8e2ee6fb33913f5aa8ffd396db1`, re-run on #469's tree;
- the addendum at `56fdf50ca`;
- the re-cut at the release base `a03b92f023ef88b80f30bd65691a2bee23725395`, tree `bb9abb934`.

Each paste has both commands verbatim and their exit codes.

### The two greps, re-run by this pass at S

The commands are verbatim from RELEASE-FLOW 3a, run in the worktree at S, with output cut at 140 characters:

````text
main at: a95d6bf3d0cebb3e2dc1412d5aa4f9c045227a57
… 33 Trigger lines in 32 records (listed in the walk's re-cut paste, minus one; see below) …
due-rows exit 0
.kiro/issues/2026-06-25-component-schema-token-name-drift.md:11:**Class**: P0 false-claim · defect *(set 2026-10-20, Lina, rule 12. Accepte
P0 exit 0
````

**Against the re-cut at `bb9abb934`** (34 lines in 33 records; P0 1 in 1):
- **Out (1)**: `2026-10-25-consumer-screen-spec-complete-unbound.md` (row 36, mine). I closed and archived it in #494 (`0995ac310`): both rows were fixed on `main` at `a03b92f02` (#490, #491).
- **In**: none. The CDG record (`2026-10-25-cdg-component-token-files-teaches-a-reference-map.md`) stays on the grep. Lina re-ruled its prose to the release after 16.1.0 in #494 (`404b0e4f3`).
- 34 − 1 = 33 lines, in 32 records. Two records carry `release:16.1.0:phase-1` (this walk record, and the files grant). **30** carry `release:next:phase-1`. **P0: 1 line, 1 record** (row 1, fixed by #452, `manual`).

The full output is the re-cut paste with that one line removed; I compared the two lists line by line.

### The release-falsity-floor read (ballot 2026-10-18-obligation-drain-and-release-falsity-floor M7)

One line per floor-class row. Each line gives the walk-record line (record path and `main at:` SHA). It gives Peter's dated answer where the row was carried or read as not false. It ends with my re-check of the surface at S (`git show S:<path>`, or the packed bytes, which are byte-equal to S for the files named).

| Row | Walk line | Disposition | Peter's answer | Re-check at S |
|---|---|---|---|---|
| 1 | `2026-06-25-component-schema-token-name-drift.md` @ `652074c6b` | fixed (#452) | n/a (fixed) | **fixed**: 0 packed component YAML files name `color.error.strong` or `color.success.strong` (16.0.0: 5 each) |
| 2 | `archive/2026-10-23-born-repo-index-lacks-package-component-tokens.md` @ `652074c6b` | fixed (#470) | n/a | **fixed in bytes**: `dist/cli/shared/packageComponentTokens.{js,d.ts}` and `componentSources.{js,d.ts}` are new in the tarball. The behaviour was not re-run (no installed born repo) |
| 3 | `archive/2026-10-23-served-docs-teach-non-key-token-names.md` @ `652074c6b` | fixed (#472) | n/a | **fixed**: in packed `governance/` and `.kiro/steering/`, `color.contrast.onPrimary`, `blend.iconLighter`, `color.error.strong` and `color.success.strong` have 0 hits (16.0.0: 1, 1, 1, 3). `borderDefault` and `radiusFull` each have 1 hit, inside a Swift example (`Token-Family-Border.md` L331, `Token-Family-Radius.md` L289). Both are the generated Swift constants' real names (`dist/DesignTokens.ios.swift` L536, L544), so they are true (O-27) |
| 3a | same record, Lina's sub-row @ `baf27eff6` | fixed (#471) | n/a | **fixed**: the six names have 0 hits in packed `src/components/**/*.yaml` (16.0.0: 13, 3, 5, 2, 5, 5) |
| 4 | `archive/2026-10-23-schema-tokens-declared-vs-read-completeness.md` @ `652074c6b` | fixed (#478); response shape RULED B | Peter, 2026-10-25T13:53:19Z, own words (#469 comment): "Response shape (row 4): (B), the list stays; the note lives in the description." | **fixed**: `CONSUMERS_SCOPE` ("… this is not a scan of platform code …") is in the bundled `get_token_consumers` description. The response is a bare array |
| 5 | `archive/2026-10-24-application-mcp-healthy-with-missing-component-root.md` @ `652074c6b` | fixed (#471) | n/a | **fixed in bytes**: the bundle carries the `COMPONENTS_DIR` missing-root path. `missingEnvComponentRoot.test.ts` ships. The test was not re-run here (the server's suite needs its own `node_modules`) |
| 6 | `archive/2026-10-24-token-selection-order-core-goals-vs-token-governance.md` @ `652074c6b`; held S per the addendum | fixed (#491) | n/a | **fixed**: `.kiro/steering/core-goals.md` L61 is the one pointer line to Token Governance § "Token Selection Matrix", with no numbered order. `Component-Development-Guide.md` § "Token Selection Decision Framework" L144 defers to the matrix "number for number". The packed consumer Lina charter L387 says the same (spot-check below) |
| 7 | `2026-10-15-123-u5-instrument-findings.md` @ `652074c6b` | read not false; **re-classed P2 `(record)`** | relayed batch "Fix all of them as the owners recommend; T is (A)", committed `2f971c4db` (2026-10-25T04:46:43Z), before #469's `mergedAt` (12:28:40Z). Own words: the #469 comment, 13:53:19Z | **not false at S**: its class line reads P2 `(record)`. No floor row remains in it |
| 8 | `archive/2026-10-25-checkbox-reset-semantics-contract-vs-code.md` @ `048bc1ea4` | fixed (#471) | n/a | **fixed**: packed `InputCheckboxBase.web.js` and `InputCheckboxLegal.web.js` carry `formResetCallback`. 24 component suites, 613/613 tests, pass at S (run by me, below) |
| 12 E6 | `2026-10-20-web-element-api-and-form-participation.md` @ `048bc1ea4` | fixed (#471, #484, #486) | E6-2: the #469 comment, own words | **fixed**: `Nav-SegmentedChoice-Base/contracts.yaml` L360–367 states the web limit both ways |
| 12 E5 (12b(i)) | same | fixed (#482) | "12b: E5 is P0. Fixed in #482." (#469 comment) | **fixed**: packed `ButtonCTA.web.js` L337/343 and `ButtonIcon.web.js` L373/379 `get/set variant`, L408/419 and L419/430 `get/set onPress` |
| 12 F-E8 | addendum line F-E8 @ `56fdf50ca` | fixed (#488) | "Re: 5, Fix" (chat, relayed, committed in #487 before its merge) | **fixed**: `Button-CTA/component-meta.yaml` L5 and L13, `AccessibilityChecker.ts` L49 message, `browser-distribution-guide.md` L355–379. Sparky's Chromium verifier line is still owed (the CHANGELOG says so) |
| 12 E2–E5 downgrade (12b) | same | **re-classed P2 `(guard)`** after E6/E7, re-ruled to a spec (#488, G-4 "Spec") | 12b: the #469 comment, 13:53:19Z. **That is after #469's merge (12:28:40Z), which carried 12b as an open line** → RL-23 | **not false at S** on the owner's reading: E2 is a gap no contract claims; E3–E4 are behaviour no contract promises |
| 29 | `archive/2026-10-25-icon-base-size-map-disagrees-with-token-index.md` (Lina's floor branch) | fixed (#471, #482) | (i) and (ii): the #469 comment | **fixed**: `Icon-Base/types.d.ts` L106 and L272 `readonly size125: 28`; `Icon-Base.schema.yaml` L66–68 "13 renders 16px (size050)" |
| L59 (re-cut) | `2026-10-25-core-goals-l59-vs-product-token-authoring.md` @ `a03b92f02` | **read not false at its reader** (RULED, not waived) | Peter, chat, relayed: the reframe at 00:28:49Z and the clarification at 00:36:20Z, committed `777339183` (01:07:28Z), before #494's `mergedAt` (01:13:37Z). Quoted in the walk's re-cut | **as ruled**: L59 still reads "**Creating ANY token**: Always requires human review — no autonomous token creation". The reconciliation lives in Peter's reading and the DRAFT #493, not yet in the loaded words (the walk owner's residual, unchanged) |

**Reading**: every floor-class row is **fixed**, or **ruled not false** with Peter's dated answer before the PR that carried it merged, **except 12b**. 12b was an open line when #469 merged, and its own-words answer came 1 h 25 min later. The row is not false at S on the owner's reading, so the floor holds in substance. The late answer is a merge-rule finding (RL-23), not a floor failure.

**A floor-class reading this pass offers, not in the walk**: RL-22. It is disputed, and Peter decides.

**Post-walk P0 filings, put to Peter through this phase-1 record (added 2026-10-26)**

Two P0 records were filed after the walk merged, on the upkeep branch. Neither is on `main` or on any pushed branch at this writing, so **this pass has not read either record**. Their content below is as the orchestrator relayed it. A P0 filed after the walk is a phase-1 finding, not a walk row (the walk record's § "How to read this record"), and the falsity floor is unchanged (RELEASE-FLOW 3a). The asking and the answer both happened in chat, so these are RULED lines, not `**Open for Peter**:` lines. The options put to Peter were: fix before the tag / waive in his words, with Spec 129 as the vehicle / rule it not P0.

**RULED (Peter, 2026-10-26, chat, relayed by the orchestrator, received before 13:29:02Z, the orchestrator's clock)**, verbatim: "Okay, waive the Android type issue and capture it in 129; resolve the radius names issue now, please". *Unverified here: chat only. Peter may confirm the relay on the PR; his words are committed in this record.*

- **`2026-10-26-android-guidelines-spacing-float-dp-claim.md`** (Data; P0 as filed).
  - **The claim**: `governance/platform-implementation-guidelines.md` L744 says spacing tokens are `Float` with an implicit `Dp`. `AndroidFormatGenerator.ts` L151–173 contradicts that, and the examples at L750 and L753–767 do not compile.
  - **WAIVED for 16.1.0** by his words ("waive the Android type issue and capture it in 129"). The vehicle is Spec 129: the Android section is regenerated from the final type table. Ada adds the 129 inbound line, and Lina re-rules the record.
  - **It does not hold the tag.**
  - My re-check at S: not run. The record is not readable from this worktree, and Android is `not re-verified — toolchain unavailable` in any case.
- **`2026-10-26-guidelines-platform-token-names-radius-input-motion-floatlabel.md`** (Lina; P0 as filed).
  - **The radius pair** (L145/L156 `DesignTokens.radius.input` → `radius150`): **FIXED BEFORE THE TAG**, by his words ("resolve the radius names issue now"). The vehicle is Lina's CORRECTION PR (number to follow). Its squash, or #499's, is the new S.
  - **My re-check of the radius pair belongs to the phase-1 addendum on the final S.** Until then the row is **owed**, not fixed, in this record.
  - **The motion pair** (L310/L321): it waits on Ada's name answer, and is then fixed by the same class of fix, or by Spec 129. **It does not hold the tag** under his words: they name the radius pair only.
- **The class**: both records are instances of the class that ballot #495 (RATIFIED, `f55bf3e04`: "governance-examples guard (token names resolve; declared files exist and have the right shape; package imports type-check)") guards. Neither was caught by it, because the guard is not yet built.
- **Distinct from F-3**: Peter's F-3 ruling (that pending-list true positives are not walk rows while the count falls) is a separate act. These two were put to him as **P0 filings**, and answered as such.

**I do not press Lina's invited reading** on `2026-10-25-application-mcp-stale-package-token-version-warning.md` (that "healthy" over a stale index is row 5's sibling). Every merged entry carries its own `source.version`, so the served data describes itself, and "healthy" there is a weak guard, not a false statement. P2 `(guard)` stands on my read (O-25).

### What lapses at S, recounted from commits that are ancestors of S

Of the 30 due `release:next:phase-1` records:
- **No lapse (6)**: four re-ruled in an ancestor of S, and two closed by their outcome lines. They are:
  - row 7 (re-ruled `2f971c4db`);
  - row 18 (`2026-10-15-123-cannot-tell-cells.md`: closed by its outcome lines at #474; the archive move is owed under rule 5);
  - row 19 (`2026-10-15-123-onboarding-trio-recurring.md`: re-ruled to release 6);
  - row 12 (re-ruled to the spec, #488);
  - row 35 (`2026-10-25-validate-assembly-empty-result-overstates-coverage.md`: re-ruled to the next release, #488);
  - the CDG record (`404b0e4f3`, in S).
- **Lapse at S (24)**:
  - **P1 (3)**, first lapses: `2026-06-28-spec-094-platform-theme-emission-unwired`, `2026-10-18-drawn-control-drift-ios-android-web`, `2026-10-25-native-reads-of-names-the-theme-does-not-hold`.
  - **P2 `(guard)` (8)**: `2026-10-01-in-repo-generate-output-contaminates-package-dist`, `2026-10-13-native-readiness-test-patterns-miss-repo-tests` (its second lapse), `2026-10-24-b-ci-post-flip-owed-acts`, `2026-10-24-migrated-mcp-config-keeps-pre-123-components-dir`, `2026-10-24-sync-migration-unlisted-copy-floor`, `2026-10-25-arming-read-class-option-fork` (**mine**), `2026-10-25-application-mcp-stale-package-token-version-warning`, `2026-10-25-issues-owned-fired-ignores-outcome-lines`.
  - **P2 `(record)` (13)**: `2026-09-28-full-survival-assent-signal-instrument`, `2026-10-12-steward-canonical-claims-theme-output` (second), `2026-10-15-123-palette-read-from-package`, `2026-10-19-decision-framework-consistency-after-tnd` (second), `2026-10-20-17-0-0-release-charter`, `2026-10-24-composed-loop-outcome-lines-missing`, `2026-10-24-steward-verb-carve-out-drop-limb-unapplied` (**mine**, co-owner), `2026-10-24-token-promotion-three-routes-never-run` (**mine**, co-owner), `2026-10-25-core-goals-l59-vs-product-token-authoring`, `2026-10-25-owed-set-law-text-after-closing-commit-anchor`, `2026-10-25-token-docs-unvetted-name-hits`, `2026-10-25-web-prop-mapping-rule-gap`, `2026-10-25-web-elements-served-prop-sweep`.
- **Escalations to Peter at S (rule 11), spec / drop / fix-now: 9.** That is the seven P2 `(guard)` first lapses, plus the two P2 `(record)` second lapses (`steward-canonical-claims-theme-output`, `decision-framework-consistency-after-tnd`). The native-readiness escalation is already owed from its first lapse. **This equals #494's body** ("24 lapse once: 3 P1, 8 P2 `(guard)`, 13 P2 `(record)`"; "9 escalate").
- **Arithmetic**: 6 + 24 = 30. By class: 3 + 8 + 13 = 24.
- **Mine, reported this session (Start Up Tasks item 9)**:
  - `arming-read-class-option-fork` lapses and escalates. Its question, Line A ((a) / (b) / drop), has been open for Peter since #469.
  - `steward-verb-carve-out-drop-limb-unapplied` lapses once. The drop is not applied, and no dated ruling says the limb did not fire.
  - `token-promotion-three-routes-never-run` lapses once. Ada accepted Thurgood's "drop the hop" (2026-10-25); the texts are not yet changed.
  - The `## Lapse` headings are mine to append, and I will not do it in this record-only PR. I report them here instead, which item 9 allows.
- **Filed-after-walk lapses**: 7 of the 24 were filed after #469 merged (the six 2026-10-25 records not rowed at the walk, plus `issues-owned-fired`). Each lapses within hours of its filing. That is the rule-11 gap Peter ruled "fix" for (the DRAFT ballot #492). → RS-28, evidenced again.

### Peter-gated items open at S (none is floor-class; none holds the tag)

- **Line X** (row 21, who charters 17.0.0): no answer in his words.
- **Line A** (row 27, mine): no answer.
- **The owed-set law-text kind** (#473, `2026-10-25-owed-set-law-text-after-closing-commit-anchor.md`): no answer. RL-22 makes it tag-relevant if Peter reads that row as floor-class.
- **The rule-11 ballot** (#492, DRAFT) and **the L59 ballot** (#493, DRAFT): sequenced after S by Peter's words.
- **The timebox**: "proposed, not ruled" (walk § "The six lines"); moot now that row 6 is fixed.

---

## The release delta: what this pass reads

| PRs | What they carry | Claims read |
|---|---|---|
| #388–#391, #405, #411 | `find_components` tiers, docs MCP fixes | packed bytes (strings), CHANGELOG L28–L29 |
| #394, #412, #451, #463, #465, #467, #472 | served-doc and charter corrections | rows 3/3a re-check; O-23 |
| #396, #397, #408, #415, #416, #419, #425, #427, #436, #445, #449 | law applications with signing acts | the signing-act walk |
| #438, #450–#453, #462, #470, #471, #478, #479, #482, #483 | the consumer-visible fixes | packed artifact table below |
| #439, #473 | `owed-set.sh` and its closing-commit anchor | 5a above; RL-22 |
| #474, #487 | the trio records; the walk addendum | § "Onboarding evidence" below |
| #480, #491 | the token-selection-order ballot and its application | row 6; the Edit-kind read |
| #484–#490 | the post-F fixes | rows E6, F-E8, G-1, G-3 |
| #494 | the release PR | the grant out-of-list read below; the CHANGELOG and notes |
| the rest (records, ballots, Spec 128–131 records) | provenance | the Edit-kind and consult-line reads (counting block) |

**Grant out-of-list read, #494** (`git diff --name-status S~1 S`): `CHANGELOG.md`, `README.md`, `canonical/generated.lock`, `docs/releases/release-16.1.0.md`, `docs/tokens.css`, `package-lock.json`, `package.json`, plus four `.kiro/issues/**` files.
- **The seven ⊆ the files grant's list** (`.kiro/issues/2026-10-25-release-16-1-files-grant.md`). `token-index/**` is granted and unchanged.
- **The four `.kiro/issues/**` files** are each the edit of an owner whose charter `writeScope` lists `.kiro/issues/**`:
  - Thurgood: the walk record;
  - Lina (`404b0e4f3`): the CDG re-rule;
  - Stacy (`0995ac310`): the row-36 close and archive;
  - Ada (`10640090d`): the G-1 archive move.
  
  #494's body names them. No out-of-list edit.
- **The version fields**: `package.json` and `package-lock.json` change only in `version` (both root fields in the lock). `README.md` changes only the badge and its link. `docs/tokens.css` changes only its header line.
- **The lock**: `canonical/generated.lock`'s `inputClosure` moves `b2a4dbd2` → `1914034a`, and `outputs` stays `3d0e3f1a` (against `a03b92f02`). An earlier refresh commit, `03bc82626`, recorded an outputs move that predated the bump (#478 did not refresh the lock). It told Peter the commit was separable, rather than stopping as the grant says. The regeneration `2e8570b2a` superseded it. Against main, outputs are unchanged (O-24).

**Classification** (Thurgood: 🔴 0 · 🟡 14 · 🔵 consumer-visible 15 · 🔵 internal the rest). I did not re-derive it. **The "51 touch a `files[]` path" count**: my pre-S recount was 47 up to F. The four after F (#486, #488, #490, #491) are the PRs that touch the § 5.0 line's 12 paths, which I re-derived as the packed files changed in `de63033b9..a03b92f02`. 47 + 4 = 51, consistent. #489 touches build inputs only (`src/validators/`), as notes L11 says.

---

## The packed artifact against the CHANGELOG and the release notes

**File set**: 1694 entries, against public 16.0.0's 1675.
- **Added: 21**: the calibration sources and tests under `application-mcp-server/src/calibration/`, `missingEnvComponentRoot.test.ts`, the docs-MCP banner, fenced-template, `h4` and logs-dir sources and tests, `dist/cli/shared/{componentSources,packageComponentTokens}.*`, `dist/validators/ColorReferenceEmissionValidator.*`, `governance/signing-seat-brief.md` and `scripts/owed-set.sh`.
- **Removed: 2**: `dist/components/core/Button-CTA/Button-CTA.refs.{js,d.ts}` → RL-20.
- **Changed: 221**, 80 of them under `dist/`.
- **`package.json`**: only `version` and the `files` list differ. `files[]` gains `scripts/owed-set.sh`. `exports` (15 keys) and `bin` are equal.
- **The packed `CHANGELOG.md` is byte-equal to S's** (`cmp`).

| Claim (CHANGELOG `## [16.1.0]` / notes) | Read | Result |
|---|---|---|
| L5 "no export, shipped file or token was removed, and no token value changed" | `exports` equal; token-index keys 217/193/33 both sides, 0 removed; the eight root token files and `browser/tokens.css` differ only in the version header, except below. **Two shipped files removed** | ❌ **RL-20** (the "shipped file" clause only) |
| Upgrading step 3: "commit what changes: the version number in each file that carries one (the Figma export carries none) and, in `DesignTokens.dtcg.json` and the Figma export …, the description text of `blend.disabledDesaturate`. No token value changed" | packed `DesignTokens.dtcg.json`: two lines (`rosettaVersion`, L3963 `$description`); `DesignTokens.figma.json`: one line (L3140 `description`), no version; every other generated file: the header line only | ✅ (16.0.0's RL-11 lesson applied) |
| L11 `variant` and `onPress` on both buttons; `buttonVariant` alias; `press` unchanged | packed web elements: `get/set variant`, `get/set buttonVariant`, `get/set onPress`; Button-CTA, Button-Icon suites pass at S | ✅ (bytes, test). "each runs once per press" in a browser: Sparky's line in the notes, not re-verified |
| L15 / L39 notes: `iconBaseSizes.size125` is 28 | `Icon-Base/types.d.ts` L106/L272 `readonly size125: 28` | ✅ |
| L16 checkboxes submit; `disabled` stripped | `formAssociated = true` on both; `attachInternals`, `setFormValue`; `removeAttribute('disabled')` (Base L211) | ✅ (bytes). Browser submission: Chromium 152 per the notes, Safari/Firefox owed, as stated |
| L17–L20, L44–L45 `get_token_consumers`, born-repo component tokens, scope sentence | `CONSUMERS_SCOPE` bundled; `packageComponentTokens` ships. 97/532/55, 81/16 and 229 not re-derived (#452, #478 bodies) | ✅ presence; counts not re-verified |
| L25 reset restores authored state | `formResetCallback` on both; suites pass | ✅ (test) |
| L26 `ariaControlsElements` | contract text as row E6 above | ✅ (contract text); browser exposure: CANNOT TELL, as stated |
| L27 `COMPONENTS_DIR` degraded | bundled path; test ships | ✅ (bytes) |
| L28 docs MCP banner, logs dir | `audienceBanner` ×4 and `DESIGNERPUNK_DOCS_MCP_LOGS` ×1 in `docs-mcp.js`. The `s13.1` ids and "up to 10" not read | ✅ partial |
| L29 `find_components` tiers; Button-CTA purpose | `component-meta.yaml` L1 purpose "Provide a prominent call-to-action button for primary user actions."; the in-repo application MCP serves the same | ✅ |
| L32 one token-selection order | row 6 re-check | ✅ |
| L33 / L49 Button-CTA does not submit a form on web | row F-E8 re-check; `type="button"` at packed `ButtonCTA.web.js` L506 | ✅ |
| L34 `generate` stops on an unemitted colour; L52 one shadow warning per run | `ColorReferenceEmissionValidator.js` ships with the message "… This is a known DesignerPunk defect, not a problem in your token source …"; `ColorReferenceEmissionValidator.test.ts` + `generateAbort.test.ts` 19/19 at S (run by me); the warning appears in the `test:consumer` log L11 | ✅ (test) |
| L23 + notes § "Dependency disclosure": sdk 1.32.2, fast-uri 3.1.9, js-yaml 4.3.2, zod 4.6.7; "The 5.1 dry run at S confirms them (root `node_modules/` only)" | root lock at S pins exactly these four; 5.1: `nested roots []` ×3; bundled zod version object `{major: 4, minor: 6, patch: 7}` (`docs-mcp.js` L9123; public 16.0.0: 4.3.6); `node_modules/@modelcontextprotocol/sdk/dist/*/client` paths: 0 in each bundle | ✅ confirmed |
| L53 "On Kiro, the Thurgood and Stacy agent files changed in this release and have not been run by our onboarding tests …. The other Kiro agents were run on a preview of this release." | trio-2 (Kiro) probed Sparky; trio-3 (Kiro) probed Leonardo; trio-1 (Claude Code) probed Ada and Lina; no run probed Kenya or Data; Ada's and Lina's Kiro prompts and the Kiro Core Goals steering changed after F (#491) | ❌ **RL-19** (second sentence) |
| L54 readiness: 32 of 34 `scaffold` on iOS and Android, 4 of 34 on web; Nav-Header-App `scaffold` on web and used by `init`'s starter | the in-repo application MCP (`lastIndexTime` 2026-10-26T00:56:01Z, after `a03b92f02`): iOS/Android production-ready = Button-VerticalList-Item, -Set only; web scaffold = Nav-Header-App, Nav-Header-Base, Progress-Indicator-Connector-Base, Progress-Indicator-Label-Base. Packed `example-home.yaml` L21 `component: Nav-Header-App` | ✅ measured |
| heading `## [16.1.0] — TBD — Release 5 …` | the packed file carries `TBD`; no step after S can change the tarball | ⚠️ **RL-21** |
| notes L57 "none of them [the walk rows that lapse at S] is a disclosure that is missing from a served surface" | `owed-set-law-text-after-closing-commit-anchor` lapses at S, and the shipped consumer-Stacy charter is one of its surfaces | ⚠️ conditional on RL-22 |
| notes L76: the release base dry run, 105/105, publish path 16, sha1 `d1761e12…`, pack version 16.0.0 | the orchestrator's log `dryrun-a03b92f02.log`: L1 `@3fn/core@16.0.0 at a03b92f0…`, `105/105`, `sha1: d1761e1201a835cab6a0fd558a4213de3b8f1e23`, `publish path: 16 (floor 16)` | ✅ |

**Sample**: 21 claim groups, chosen for consumer reach and for the post-F changes. **Not re-verified, the sample did not reach**:
- the `sync` report text (L39);
- the `validate --product-tokens` claim (L19);
- package mode (L20);
- the theme-text corrections (L22);
- L28's `####` ids and suggestion count;
- the 97/532/55 and 229 figures;
- the Android `.dp` claims (L38). `not re-verified — toolchain unavailable`: no Android build exists, as the CHANGELOG says.

---

## Onboarding evidence, CK-2 and `test:consumer`

**The evidence sentence** (notes L66, Leonardo's text with the post-F PR numbers) holds as written:
- **"After F, PRs #486, #488, #489, #490 and #491 changed shipped paths"** is true. #489 changes no tracked `files[]` path, but its build output ships as `dist/validators/ColorReferenceEmissionValidator.*`.
- **"No trio run saw these changes"** is true. F `de63033b9` is an ancestor of all five, and every trio record ran on the F candidate.
- **The five-record table**: true. Harness, what ran, and the F25 counts match the records' headers. `conformance-kiro-beat-1` reads "PARTLY RUN … steps 0–7 and the closing step 12", and beat 2 "not run".
- **The candidate cell** (F, sha1 `42515c34…`, pack version 16.0.0): read from the records, not re-hashed.
- **"`generate`'s new check is covered on the founder path by `npm run test:consumer` at `bb9abb934`: 56 passed, 1 skipped (57)"**: the orchestrator's log reads `Tests: 1 skipped, 56 passed, 57 total`, and L11 prints the shadow warning. The log does not print its SHA, so the `bb9abb934` attribution is the orchestrator's, read and not re-run. "Covered" is a little strong: the founder path exercises the check's warn-and-continue branch. The stop branch is exercised by unit tests only (`generateAbort.test.ts`, run by me, 19/19 with the validator suite). → O-22.

**CK-2, the Kiro pair. What this pass can claim**:
- **The written reason**: the Kiro plan's quota stopped model calls, and Peter re-queued the pair for November. "Go with the last option, re-queue the Kiro pair for November", 2026-10-25 about 21:55Z, chat, relayed, committed in `conformance-kiro-beat-1.md` and `.kiro/issues/2026-10-25-kiro-conformance-pair-requeue.md`. His candidate ruling for that run is committed in the same records: "Use the shipped tarball if it's out, otherwise the preview".
- **The measured rendering diff, two measurements on two bases**:
  - **Leonardo's** (`conformance-kiro-beat-1.md` § `why-run:`): `thurgood-prompt.md` 6 changed lines, `stacy-prompt.md` 54. That is the release-4 preview fixture (`tests/onboarding-trio/fixtures/born-kiro/`, `b10d5d3b6`) against the founder's repo born from the F candidate. **My pre-S read's "6 and 54" was this figure, repeated: it was not an independent read, and I said "measured" without that qualifier.**
  - **Mine, independent of the trio's instruments**: the committed generator output `canonical/_consumer-output/kiro/.kiro/agents/`.
    - `git diff --numstat v16.0.0 de63033b9`: `thurgood-prompt.md` 1/1, `stacy-prompt.md` 15/35. **Every** Kiro agent prompt changed in that range (ada 2/2, data 2/2, kenya 1/1, leonardo 2/2, lina 1/1, sparky 4/3).
    - `de63033b9..S`: `ada-prompt.md` 1/1, `lina-prompt.md` 3/4, `steering/designerpunk-core-goals.md` 3/18.
    - The bases differ (the 16.0.0 tag, not the release-4 preview), so the numbers differ. Both measurements say the two renderings changed.
- **Nothing about how consumer-Thurgood or consumer-Stacy behave on Kiro.** No probe or beat ran. **Disclosure**: consumer-Stacy is my own seat's consumer rendering, and I do not adjudicate her behaviour.
- **What the CHANGELOG does with it**: L53 states the pair's gap correctly. It then over-claims the rest → RL-19.

---

## The pre-S read (2026-10-25, findings 1–11), at S

| # | Pre-S finding | At S |
|---|---|---|
| 1 | Notes § "Onboarding evidence" placeholder stale | **landed**: five-record table, candidate cell, "not exercised" list (L64–L80) |
| 2 | Notes L7 DRAFT clause | **landed**: the authorship note is re-derived to `a03b92f02`, with F and the post-F PRs named |
| 3 | CHANGELOG owed-set line false | **landed** (L10, the five classes) |
| 4 | Palette limitation (add-a-primitive path) | **landed and superseded**: #489 makes `generate` stop; L34 and L46 say so |
| 5 | Button-CTA does not submit on web | **landed** (L49), and the served text is fixed (#488) |
| 6 | Readiness half measured | **landed** (L54); re-measured here: true |
| 7 | `find_components` `strong` caveat | **landed** (L29) |
| 8 | Kiro pair line | **landed with my wording, and the wording is wrong** → **RL-19** |
| 9 | Walk counts stale; filed-after-walk lapses | **recounted** in the re-cut and in #494's body (24 / 9), equal to mine. Row 36 is closed. The class went to the rule-11 ballot (#492, DRAFT) |
| 10 | Authority provenance (bump; zod) | **zod: landed** (notes L84 cites both). **Bump: still relayed only**, and #494's body casts the merge as the ratification → RL-23 |
| 11 | Row 6 conditional lines | **landed**: #491 merged before S; CHANGELOG L32; notes L35 and L66 |
| Q4 | Row 6 holds S | **resolved**: fixed by #491 |
| Q3 | The evidence sentence | **landed in substance** (notes L66, L78). The "6 and 54" figure is not in the shipped texts |

---
## Findings

Each finding takes two routes, and they are additive: an explicit message to the named owner (the orchestrator relays it), and its standards implications. The numbering continues 16.0.0's record (RL-18, O-21, RS-32).

### RL-19: Low (tag-relevant) — the CHANGELOG says "The other Kiro agents were run on a preview of this release". Four of the six were not, and the sentence is mine

- **Promised** (the ruled blocking test, RELEASE-FLOW 3a): "nothing ships that the release knows is false at the place where its reader meets it".
- **Claimed** (packed `CHANGELOG.md` L53): "On Kiro, the Thurgood and Stacy agent files changed in this release and have not been run by our onboarding tests; that run is re-queued for November. The other Kiro agents were run on a preview of this release."
- **Shipped evidence** (`tests/onboarding-trio/records/16.1.0/`):
  - On Kiro, trio-2 ran the Sparky probe and trio-3 the Leonardo probe.
  - Ada and Lina were probed on Claude Code (trio-1), not on Kiro.
  - Kenya and Data were probed on no harness.
  - After F, #491 changed `ada-prompt.md` and `lina-prompt.md` and the Kiro Core Goals steering file (committed generator output, `de63033b9..S`). No run on any harness has seen that text.
- **The first sentence holds.** The second is false for Ada, Lina, Kenya and Data.
- **The cause is my own**: the sentence is word for word what my pre-S read (finding 8) proposed. #494 applied it as written, and no one read it against the records. I proposed text, and then audited text I had written. That is the rot mode the mirror clause names, arriving from the release side → RS-33.
- **Impact**: a human reader is told four agents were exercised on Kiro when they were not. The notes (L66, L80) state the narrower truth ("No agent has been observed reading the post-F text listed above"), but the notes are not packed. Harm: low. Weight under the floor's letter: the same as 16.0.0's RL-11.
- **Fork, with RL-20 and RL-21, surfaced and not picked (Peter)**:
  - **(a) Fix before the tag.** One release-PR amendment to `CHANGELOG.md`: L53's second sentence, L5's clause (RL-20) and the heading's date (RL-21). That means a new S, 5.1 again, and a dated phase-1 addendum on the new S, as 16.0.0's S1. This delta read carries over, and only the artifact reads re-run. It is the only option that meets the floor's letter for all three.
  - **(b) Tag S.** Correct the notes before step 7 (they are not packed; the files grant over `docs/releases/release-16.1.0.md` expired at #494's merge, so this needs a grant), and carry the three CHANGELOG corrections as errata in the next release's entry. Needs Peter's own-words exception, as rulings item 13 was for R1-7 at 16.0.0.
  - **(c) Ship as is**, with the corrections carried in phase 2 and the next release. Also needs an exception in his words.
  - Text, if (a): the replacement wording is the author's (Thurgood) and Leonardo's (the trio's owner) to write, not mine. RS-33 is why.
  - **RULED (2026-10-26): (a).** Peter, chat, relayed by the orchestrator, received before 2026-10-26T12:42:58Z (the orchestrator's clock; after its message presenting both forks): "Re: 1, (A)". The questions above stay as asked. The fix PR is Thurgood's; the addendum on the new S is mine.
- **Route**: **Thurgood** (the CHANGELOG's release author); **Leonardo** (the trio evidence); **Peter** (the fork).

### RL-20: Low (tag-relevant) — "no … shipped file … was removed"; two shipped files were removed, and the same entry says so

- **Claimed** (packed `CHANGELOG.md` L5): "a minor release: no export, shipped file or token was removed, and no token value changed".
- **Shipped**: `dist/components/core/Button-CTA/Button-CTA.refs.js` and `.d.ts` are in public 16.0.0 and absent from the S tarball. L21 of the same entry says so: "In 16.0.0 the built file shipped under `dist`, because `files` includes it, but `exports` blocked its import path; in 16.1.0 the file is gone".
- **Reading**: the export and token clauses are true. `exports` is unchanged, so no documented entry point reaches the file. The notes' wording (L16, "nothing a 16.0.0 install relies on was removed") is the true form. A reader meets L5 first, and L21 corrects it sixteen lines on. Harm: nil to an install that respects `exports`.
- **Fork**: rides RL-19's. **Route**: **Thurgood**.

### RL-21: Low (tag-relevant) — the packed CHANGELOG's heading ships `TBD` for its date

- **Claimed** (the files grant, "What each path is for"; notes L3): "`## [Unreleased]` becomes `## [16.1.0] — TBD …` (the date is written at the tag)"; "**Date**: TBD (written at the tag)".
- **Shipped**: the packed `CHANGELOG.md` is byte-equal to S's, and its heading reads `## [16.1.0] — TBD — Release 5 …`. The tag goes on S, and 5.3 packs from the tag. So **no later step can write a date into the published CHANGELOG**. Only the notes (unpacked) can be dated at the tag, and that needs a grant. 15.1.0 and 16.0.0 shipped dated headings (`2026-10-14`, `2026-10-16`).
- **Reading**: `TBD` is a placeholder, not a false statement of fact. But the plan in the grant cannot reach the artifact it names, and the published entry will carry `TBD` permanently unless S moves.
- **Fork**: rides RL-19's ((a) dates the heading at the re-cut). **Route**: **Thurgood**. → RS-34.

### RL-22: Low (tag-relevant if Peter reads it floor-class) — the shipped consumer-Stacy charter describes the owed-set query's retired rule

- **Promised** (M7): "served docs, MCP contracts and agent charters are fixed, not disclosed".
- **Shipped**: packed `dist/consumer-canonical/agents/stacy.md` L343 defines `touch-only` as "no first-parent commit since adoption changed `tasks.md` or `completion/**` …; the reason is the last touching commit". It defines `candidate`'s anchor as "`<sha> <date>`" of the unit class. L347 calls `touch-only` "a path set". The shipped `scripts/owed-set.sh` (L45–L61, since #473) classes `touch-only` by the spec's **closing commit**: "the closing commit (below) predates adoption, and no task completion file was added after adoption". It anchors every `candidate` on the closing commit. The charter sentences are false about the script they describe.
- **Known before this pass**: `.kiro/issues/2026-10-25-owed-set-law-text-after-closing-commit-anchor.md` (Thurgood, P2 `(record)`, lapses at S) names this surface among four. Its class reasoning is "the printed output still carries its own reasons, which is why this is not a guard and not P1". The fix text is drafted (mine, for my charter and overlay). It waits on Peter's unanswered kind question (EXECUTION under fork (A), or LAW rounds), asked on #473.
- **My reading, offered as a finding to Peter and not an upgrade (rule 12)**:
  - By M7's letter this is floor-class. The reader is an agent, the surface is a charter, and the sentence is false where she meets it.
  - **The surviving counter-argument**: the same charter tells her to read the reason column ("The reason column says what was assumed, so read it"), and the script's reasons state the closing-commit rule. A consumer-Stacy who follows her charter is not misled into a wrong call. In this repo's output at S the two rules agree on every row.
  - **The fork is whether M7 reads the sentence or the outcome.** That is Peter's to rule, not mine.
- **Disclosure**: this is my own seat's consumer text, and I drafted its replacement. I do not adjudicate it, and I am not its reviewer.
- **Fork, surfaced, not picked (Peter)**:
  - (i) **floor-class**: the tag waits for the follow-on PR (his kind answer first), or for his own-words waiver;
  - (ii) **not floor-class**: carried in the law-text record, which lapses at S and goes to its second lapse at the next release.
  - Notes L57 ("none of them is a disclosure that is missing from a served surface") is false under (i).
  - **RULED (2026-10-26): (i), floor-class, waived for 16.1.0.** Peter, chat, relayed by the orchestrator, received before 2026-10-26T12:42:58Z (the orchestrator's clock; after its message presenting both forks): "Re: 2, (i)". The option text he answered was the orchestrator's ("(i) floor-class, waived for 16.1.0 in his words with the fix riding #473's follow-on"), which differs from the (i) written above. The waiver is the reading of his "(i)" against it, and his words do not say "waive". The questions above stay as asked. **What follows**:
    - the charter fix rides #473's follow-on PR (its EXECUTION-or-LAW kind is still his unanswered question there);
    - `2026-10-25-owed-set-law-text-after-closing-commit-anchor.md` carries the row;
    - notes L57 is false under this ruling. The notes are not packed, so its correction can ride the CHANGELOG fix PR (Thurgood's call).
- **Route**: **Peter** (the reading, and the kind question); **Thurgood** (the record's owner, RELEASE-FLOW § 5a and his charter's lines).

### RL-23: Low (record form) — three merges outran the questions their bodies put to Peter

The rule (Task-Completion-Protocol § "Branch and PR Conventions", Peter 2026-10-17): "The PR is not merged until Peter's answer is on the record … dated before the merge"; "A merge never answers a question; no author writes 'merge = yes', 'adopted at merge unless amended' or an equivalent".
- **#469** (the walk PR) merged at 2026-10-25T12:28:40Z. Its body carried four lines "STILL OPEN and holding the merge (6(i), X, A, 12b)".
  - 6(i) and 12b were answered in Peter's own words at 13:53:19Z, after the merge. 12b was a floor-class line (row 12 was P0 at the time).
  - X and A are still unanswered at S.
- **#474** (the trio): the walk addendum's W-3 asks me to read this one. The question (delete trio rows from Peter's kiro-cli profile?) was answered "Keep the rows". Leonardo's clock bounds put the answer between 22:23:16Z (the squash) and 22:25:46Z. The record of the words is `e5a2c458d` (22:29:10Z). **My reading: "dated before the merge" is not met.** The earliest bound equals the merge, and nothing shows the words came first. Harm: none, because the answer asks for no act.
- **#494** (the release PR): the body says "**Peter's merge ratifies the bump** (recipe step 3)" and "The ratification is relayed, and your merge ratifies it". The recipe (`governance/release-management-system.md` L29) names two acts: the release owner "ratifies the version bump **and** merges the release PR". Calling the merge the ratification is the "or an equivalent" the rule bars. The relayed words are the ratification on record, and no own-words record of it was read (pre-S finding 10, carried).
- **Reading**: this rule binds the merge, and Peter is the merger. The finding is put to him, not ruled. The author-side form was right on #469 and #474: the lines were marked and held.
- **Route**: **Peter** (his merges); **Thurgood** (#494's body wording; RS-35).

### RL-24: Medium (instrument; not tag-relevant) — the signing-act walk: 95 of 108 non-Stacy acts read other than `anchored`, mostly the instrument's known link-6 defect

Per-act lines are verbatim in Appendix A. Counts sit beside the lines, never in place of them, and no total is green: **108 acts — anchored 13 · FAIL 68 · record absent 22 · anomaly 5 · unanchored 0.**

My readings by class. These are readings, not triage of anyone's act. The instrument owner rules on the instrument:
- **`FAIL 6` ×67** (#397: Lina 39, Ada 25; #425: Data 3), all "prompt_snapshot ≠ `.claude/agents/<seat>.md` at <commit>".
  - #397's seats' transcripts record `gitBranch` `chore/write-scope-six-roots`, which was deleted at merge. The comparand fell to `38db7b1bb` (2026-10-17, an ancestor of the PR's base), whose charter text predates the PR's own charter edits.
  - That is **15.1.0's RL-1 / RS-10 class**: link 6 resolves the charter through branch refs, and the Branch Cleanup law deletes those at merge. It was carried at 16.0.0 as "did not bite here". **It bites here, on 62% of the population.** Not re-verified by restoring the ref (a ref write in the shared repository).
- **`FAIL 4` ×1** (#397, Kenya, `bf32bdae`: "a primary created a seat-trailered commit").
  - The creating session `57065fa3-e99f-4378-914b-e511c8da9ff5.jsonl` opens with `{"type":"agent-setting","agentSetting":"kenya"}`. It is a top-level Kenya session (Peter's `--agent kenya` run with a brief), not the orchestrator.
  - H3's test does not read the agent-setting record. **My reading: an instrument gap, not a forged trailer.** The act's own `Co-Authored-By` line names a different model (`Claude Fable 5.1`), which may bear on § 5.4's "meta `model` unlike the seat's plan". Not mine to rule.
- **`record absent` ×22**:
  - **#445 ×15**: the known record `.kiro/issues/2026-10-23-audit-link4-rejects-sha-alone-commit-line.md`. Its ballot is ratified (#448). The checker change has not merged: `verify-signing-chain.ts`'s last change is #437 (`9359c3805`, 2026-10-21, before the ballot of 2026-10-23).
  - **#416 ×6** (Ada, Lina, Leonardo `#in-scope` × operative-set and dispositions): "no transcript shows this commit being created". Not triaged. The candidate readings are H1 (a re-cut) or #445's commit-line form.
  - **#397 ×1** (Sparky `writeScope[.kiro/issues/**]`): "the row renders nothing". That is link 7 on a `no-consumer-counterpart` frontmatter row, which has no rendered line to find by construction.
- **`anomaly 4` ×5** (#397: Leonardo, Sparky, Data; #425: Leonardo, Kenya). Each reads "2 candidates (agent-X.jsonl, agent-X.jsonl)", the same file twice. My reading: one tool call printed both the `[<branch> <sha>]` line and the `git log -1` line, and the instrument counted them as two. That is H2a's intent inverted, and not verified.
- **Widening (§ 5.4)**: every act by Ada, Lina, Kenya, Leonardo, Sparky and Data in #397, and by Data, Leonardo and Kenya in #425, goes into J. **Blind re-judgment: not run (owed).** This seat cannot spawn seats.
- **The 13 anchored acts**: #451 (3), #472 (6), #491 (4).
- **Route**: **Thurgood** (the instrument: link 6 through `refs/pull/<n>/head`, H3's agent-setting read, the double-candidate count, link 7 on ncc rows; the #416 triage); **orchestrator** (J's blind seats). → RS-36.

### RL-25: Low (owed duty; fires trigger (d)) — the delegate audit did not run, and Peter's sample reads `0 / 135`

- **The first delegate walk under S5** (signing-act ballot § 5.3, amended 2026-10-19) was owed at this RELEASE. The delegate is **Ada** (the first walk takes Ada). The backlog runs from Spec 123's MIDPOINT population (#262) through this walk's base. There is no `delegate-audit-*` file anywhere in `.kiro/specs/` at S.
- `Delegate audit (Stacy-signed, Ada): 0 / 135 — no file at S (not run)`.
- `Peter sample (Stacy-signed): 0 / 135`.
- **N = 135**, counted from signature history. It is the instrument's withheld count under `--exclude-signer stacy`, i.e. acts whose signing commit's `Agent:` trailer is `stacy`, per PR: #396 12 · #397 63 · #408 6 · #412 1 · #415 1 · #416 4 · #419 4 · #427 7 · #436 12 · #439 4 · #445 5 · #449 3 · #465 3 · #467 4 · #472 4 · #491 2. Not counted from the delegate's run or from a brief. The backlog before 16.0.0 is additional and is not counted here.
- **Refusals among Stacy signing commits in those 16 PRs, by subject**: 0. Counting, not ruling.
- **Trigger (d) fires** (§ 8, as amended) on all three limbs: signing PRs reach RELEASE unwalked by the delegate; Peter's sample reads `0 / N` with N > 0; and the delegate line reads k < N with no committed file. **Thurgood charters an issue (owner + named trigger); Peter decides whether it becomes a spec.** No such record exists at S.
- **Route**: **Thurgood** (the brief, and the trigger-(d) record); **orchestrator** (dispatching Ada); **Peter** (his sample). → RS-37.

### RL-26: Low (record form, counted) — one PR with no Edit-kind lines, one with no consult line

- **#425** (True Native execution, 2026-10-20; after the edit-kinds application `c470a248f`): it touches five governance paths (`canonical/agents/{data,kenya,leonardo}.md`, `governance/Component-Development-Guide.md`, `governance/cross-platform-vs-platform-specific-decision-framework.md`), and its body has **no `**Edit kind**:` line**. The substance is in its Spec line ("EXECUTION of the ratified ballot …, edit sites 6.1–6.4, 6.6–6.9"), so the kind and authority are stated in prose, not per file. Counted as **missing** (not as no-authority).
- **#480** (the token-selection ballot's ratification record): it touches `.kiro/docs/ballots/**`, a trigger surface, and its body has **no `**Consulted**:` line**. Its Agent line lists the R1 entries by four seats, which is the substance, but not the line.
- **Route**: **Thurgood** (#480's and #425's bodies, with the orchestrator who opened #425). Acknowledgement is enough.

### Observations (not findings)

- **O-22 — "covered" in notes L66**: `test:consumer` exercises `generate`'s new check on its warn-and-continue branch (the pinned shadow colours). The stop branch is unit-tested (`generateAbort.test.ts`). "Exercised" is the exact word.
- **O-23 — a volatile count in always-loaded text**: the packed Civitas and Systems overviews say the docs MCP has "84 docs, 2,535 sections, 331 cross-references" (corrected and measured at #467). This session's docs MCP reads 84 / **2,537** / 331 (`lastIndexTime` 2026-10-26T01:45:42Z, in-repo). Two sections drifted after the measurement. This is the class ballot W-9 names for signed units. Under the floor's letter the number is false. Its harm is nil, and no count in always-loaded text can stay true. I do not offer it as a floor row.
- **O-24 — the lock refresh met the grant's stop condition and did not stop.** `03bc82626` recorded an outputs move (from #478, not from the bump) and named itself separable. The regeneration `2e8570b2a` superseded it, and against main the outputs are unchanged. The record was honest. The grant's "stops and reports" became "reports".
- **O-25 — `application-mcp-stale-package-token-version-warning`**: I do not press the P0 reading Lina invited. The entries carry their own `source.version`.
- **O-26 — #488's Consulted line names Sparky as "verifier per § E8 (not yet run …)"**. That is a pending verification listed as a consult. His Chromium line for F-E8 is still owed, and the notes say so.
- **O-27 — the two residual name hits** in packed `Token-Family-Border.md` L331 and `Token-Family-Radius.md` L289 are Swift examples whose names (`borderDefault`, `radiusFull`) are the generated constants' own (`dist/DesignTokens.ios.swift` L536, L544). They are not row-3 residue.
- **O-28 — `046-input-checkbox-base` reads `open`** because of a pre-adoption parent never completed. It is the same proxy row the walk reported.

---
## Re-grounding dispositions

**Population**: the signature events committed in this delta and reachable from a merged PR's head. That is **18 PRs** that touch `canonical/profiles/consumer/signatures/`, carrying 108 non-Stacy acts and 135 Stacy-signed acts by the instrument's count. It is the third population after the first render.

**`no-consumer-counterpart` rate (state metric; only its change is meaningful)**, over the whole profile at S against `v16.0.0` (PyYAML over `git show`):

| Bucket | At S | At `v16.0.0` |
|---|---|---|
| `_shared` | members 1/4 | 1/4 |
| `ada` | body 0/22 · frontmatter **33/93** | 0/22 · 10/70 |
| `data` | body 0/34 · frontmatter 7/66 | 0/34 · 6/65 |
| `kenya` | body 0/33 · frontmatter 9/63 | 0/33 · 8/62 |
| `leonardo` | body 0/44 · frontmatter 3/98 | 0/44 · 2/97 |
| `lina` | body 0/39 · frontmatter **45/120** | 0/39 · 8/83 |
| `sparky` | body 0/33 · frontmatter 16/72 | 0/33 · 15/71 |
| `stacy` | body 0/35 · frontmatter 11/75 | 0/35 · 10/73 |
| `thurgood` | body **1/48** · frontmatter **80/127** | 0/47 · 19/66 |
| `always-set/*` (8) | body ncc 0 in each except `start-up-tasks` **1/10** | 0 in each (`start-up-tasks` 0/9) |
| **All** | **body 2/372 · frontmatter 204/714 · members 1/4** | body 0/370 · frontmatter 78/587 · members 1/4 |

**The change**: +126 frontmatter ncc rows, almost all from #397's 123 first signatures on the new `writeScope[...]` rows. The ballot names those `no-consumer-counterpart` by design (the consumer rendering subtracts the repo's own write-scope paths). Body +2: one new `thurgood` unit, and Start Up Tasks item 9 (`scripts/issues-owned.sh`, which has no consumer counterpart). Neither is a drift signal. The jump is the ballot's own shape.

**Assent rate per signer on routed rows** (event metric, from history; non-Stacy acts by subject): **ada 29/29 · lina 42/42 · data 7/7 · kenya 6/6 · leonardo 3/3 · sparky 1/1** assent. Plus 16 C1 re-confirmations and 4 other subjects, which are not signature verdicts. **Refusal count: 0 issued** (non-Stacy, by subject; Stacy's signing commits, by subject: 0). **Standing refusals at S: 0** of the signed rows. A 100% assent rate at volume (Lina 42, Ada 29) is the ritual-stub signal. Here it is mostly `surviving: []` assents on `no-consumer-counterpart` write-scope rows, where nothing survives to judge.

**Spot-check of itemized assents: 2 / 88**, both #491 re-signs, read against the packed rendering:
- Lina `#token-selection-priority-must-follow-this-order`, surviving `priority-pointer`, `priority-no-creation`: both present in packed `dist/consumer-canonical/agents/lina.md` L387 and L389, in re-pointed form ("your human lead").
- Ada `#what-this-means-in-practice`, surviving 5 of 5: all five present in packed `ada.md` § "What This Means in Practice", re-pointed.

**Stacy-signed: `0 / 135` sampled by Peter.**

**Full-survival assent signal**: `not yet instrumented`. The record that owed the instrument "before release 5's RELEASE phase 1" (`2026-09-28-full-survival-assent-signal-instrument.md`) lapses at S. For reference, both spot-checked assents above are full-survival (2/2 and 5/5).

---

## The signing-act walk (ballot `2026-10-01-signing-act-chain` § 5.1, as amended by S5)

**Command**, in the worktree at S, once per PR, for all 109 PRs #384–#494: `npx tsx tools/agent-generator/regrounding/verify-signing-chain.ts --audit --pr <N> --exclude-signer stacy --store ~/.claude/projects/-Users-3fn-Documents-Work-Projects-Kiro-DesignerPunk-v2` (with `node_modules` symlinked from the main checkout). All 109 exited 0. The tool fetches `refs/pull/<N>/head` into `FETCH_HEAD`, and no ref or branch was written.
- **0 acts**: 102 PRs.
- **Acts in 7 PRs**: #397 (69), #416 (6), #425 (5), #445 (15), #451 (3), #472 (6), #491 (4). Per-act lines are verbatim in Appendix A.
- **Withheld** (Stacy-signed, the delegate's): 135 in 16 PRs (RL-25).

**Counts** (beside the per-act lines, never in place of them; no total is green): **108 acts — anchored 13 · unanchored 0 · record absent 22 · FAIL 68 · anomaly 5.** Readings by class: RL-24.

**A signing PR that reaches RELEASE unwalked**: none for non-Stacy acts. For Stacy-signed acts, all 16 PRs reach RELEASE without the delegate's walk → trigger (d) (RL-25).

## J — the judgment sample (§ 5.2)

**Frame**:
- refusals: 0;
- flips: not read;
- at least one act per distinct non-Stacy signer seat per PR: 25 seat-PR pairs (#397: ada, lina, kenya, leonardo, sparky, data; #416: ada, lina, leonardo; #425: data, leonardo, kenya; #445: ada, data, kenya, leonardo, lina, sparky; #451: ada, sparky; #472: data, kenya, lina; #491: ada, lina);
- one blind assent per seat per render population;
- widening (§ 5.4): every act of the nine seat-PR pairs in #397 and #425.

**Check 4 (once per brief): not read this pass.** The briefs live in the orchestrator's scratchpad, uncommitted. Ballot § 8 names the brief as the chain's unassured root.

**Blind re-judgment: NOT RUN — owed.** That is the widened acts in #397 and #425, plus one blind assent per seat for this population, plus the carried 15.1.0 (4) and 16.0.0 (2) blind seats. This seat cannot spawn seats. **Proposed, as at 15.1.0 and 16.0.0**: I author the packets, the orchestrator spawns the seats, and the results land in phase 2 or as a dated addendum.

## Peter sample (Stacy-signed acts, § 5.3)

**`Peter sample (Stacy-signed): 0 / 135`.** I name the zero. I do not adjudicate my own acts.

**`Delegate audit (Stacy-signed, Ada): 0 / 135 — no file at S (not run)`.**

---

## Counting block

| Item | Reading |
|---|---|
| Criteria-block omissions | **0**: parity 34/34 at S, reds 0, emissions 0. No new parent in the delta |
| Criteria vagueness; declared-none rate; fixed-string exemptions | n/a; n/a; 0 |
| Bundled-claim / incomplete-decomposition; `(platforms: …)` fallbacks | 0 / 0. The Android `.dp` claims read `not re-verified — toolchain unavailable` |
| Subtask-doc presence | no new subtasks in the delta. Spec 123's 30.3 (carried since 15.1.0, owner unsettled between Lina and Thurgood) not re-read |
| Delegated-tier capture | no new parent docs |
| Orchestrator consult line | **population: 54** delta PRs whose diff touches a trigger surface (governance, steering, ballots, charters, a spec's requirements/design, a non-checkbox `tasks.md` hunk, `canonical/adjudications.yaml`), read from PR bodies via `gh pr view`. **Presence 53/54**: missing on #480 (RL-26). Grammar variant: #407 (`**Consulted** (2026-10-18):`). **`none needed` on a trigger surface: 3** (#392, #465, #467). **Spot-check 2/54**: #490 → Leonardo's and Lina's reads are traced in committed records (the walk's G-3 correction; my archived row-36 record, "by Lina's call for 16.1.0"); #488 → self-attested (no committed trace), and its Sparky entry is a pending verification (O-26). Never a gate |
| Governance edit kinds | **population: 31** PRs after `c470a248f` whose diff touches a governance path, read from PR bodies. **Missing: 1 PR** (#425, five files; RL-26). **No-authority: 0.** **Rot-mode count: 0**: every LAW line's ballot reads RATIFIED at its merge (`git show <merge>:<ballot>`: #410, #419, #427, #436 ×2, #441, #444 ×2, #448, #491). EXECUTION and CORRECTION referents were not re-read per hunk (sample 0). Per-file coverage inside each PR was not checked |
| Instrument census | ballots added in the delta after the census ballot (2026-10-19): each carries `**Census**:` lines, except `2026-10-20-spec-128-platform-admission-identity.md` (CARRIED into Spec 128, 0 lines). `not in scope` lines: 85 across 9 ballots. `ran: none; count: no count`: 4 (all in the census ballot itself). Digests not reproduced at any line's `<sha>` (sample 0). Never a gate |
| Re-grounding dispositions | above |
| Instruments | no new parents |
| **M3** evidence presence / **M4** forced-negative / **M5** failure vocabulary | unchanged from CLOSEOUT (no new parent docs) |
| Carve-out data | **0** steward-verb-gated encounters this pass. The drop-limb record lapses at S (above). Neither falsification limb is applied in a charter |
| ARMING owed | **none new**. The delta's eight instrument-path PRs (#409, #417, #422, #423, #424, #437, #445, #459) have their reads in `archive/2026-10-24-instrument-path-arming-reads-missed.md` § 5. The two `.github/in-lane-guards.json` PRs (#421, #427) have theirs in the named-guard record and `2026-10-20-in-lane-registry-arming-reads.md`. No `.github/**` change after #427, no gate-list change (19 contexts) |

---

## Method

**Run by me at S** (worktree `chore/release-16.1.0-claims-pass-phase-1` at S; `git status --porcelain` empty before, and only this file after):
- `bash scripts/owed-set.sh`;
- `check-completion-criteria-parity`;
- `coverage-map.ts`;
- both 3a greps;
- 109 `--audit --exclude-signer stacy` walks;
- the ncc tally (PyYAML over `git show v16.0.0` and S);
- the Stacy signing-commit subject count over 16 PR heads;
- the grant out-of-list read and the version-field diffs;
- the post-F packed-path derivation;
- the tarball copy, re-hash and extraction;
- the file-set, `package.json`, per-file and token-index-key diffs against public 16.0.0 (re-fetched, sha1 `e9d8bfca…`, equal to its `dist.shasum`);
- the string greps in the packed bytes; the bundled zod version object; the sdk client-module absence;
- the committed Kiro rendering diffs (`canonical/_consumer-output/kiro/`) over `v16.0.0..F..S`;
- the PR bodies and merge times of all 109 PRs, and the two owner-confirmation comments on #494 (`gh`, with a credential read from `.env` in the same shell call and never printed);
- one transcript read: the first record and the commit call of session `57065fa3…`, for RL-24's `FAIL 4`;
- `get_component_catalog`, `get_component_health` and `get_index_health` (not withheld verbs).

**Tests run by me at S, in the worktree** (Jest, with the main checkout's `node_modules` symlinked):
- `npx jest src/validators/__tests__/ColorReferenceEmissionValidator.test.ts src/cli/__tests__/generateAbort.test.ts` → 2 suites, 19/19 passed;
- `npx jest src/components/core/{Button-CTA,Button-Icon,Input-Checkbox-Base,Input-Checkbox-Legal,Icon-Base,Nav-SegmentedChoice-Base}` → 24 suites, 613/613 passed.

**Read, not re-run**:
- the 5.1 dry run (the orchestrator's; I read its log and record and re-hashed its tarball);
- the release-base dry-run log;
- the `test:consumer` log (56 passed, 1 skipped, 57; its SHA is the orchestrator's attribution);
- #494's validation line (`npm test` 413 suites / 9805 tests at `2e8570b2a`);
- the trio records;
- the owners' confirmations (Lina `6405889551`, 01:01:00Z; Ada `6405895382`, 01:01:30Z; both before #494's merge, both read at an earlier head, `e5c03d173` / `2e8570b2a`, with only `.kiro/issues/**` and one CHANGELOG path string after it).

**Not run**:
- the root suite;
- the `application-mcp-server` and `mcp-server` suites (their `node_modules` are absent in the worktree);
- `generate`/`sync` in an installed repo;
- a re-pack;
- any iOS/Android toolchain;
- the GitHub Packages registry;
- `verify-gate-registration.sh` (credentials);
- J's blind seats;
- check 4.

**Disclosures**:
- **RL-19's sentence is my own proposed text** (pre-S finding 8).
- **RL-22's surface is my own seat's consumer charter**, and its replacement text is mine.
- I closed the row-36 record in #494 (`0995ac310`).
- I signed 135 acts in this population. Their audit is the delegate's.
- The 5.1 log and tarball are the orchestrator's evidence. This record's readings of them are mine.
- The `FETCH_HEAD` writes (127 fetches) are the only git writes besides this file.

---

## Open items carried (to phase 2, or to the next release unless resolved first)

**Before 5.2**: Peter's answers to RL-19's fork (RL-19/20/21) and to RL-22's reading. If (a) is taken in either, a new S, 5.1 again, and a dated phase-1 addendum on the new S.

**RULED (2026-10-26)**: "Re: 1, (A) / Re: 2, (i)" (Peter, chat, relayed by the orchestrator, received before 2026-10-26T12:42:58Z (the orchestrator's clock; after its message presenting both forks)). Owed before 5.2: the CHANGELOG fix PR's merge (the new S), 5.1 at the new S, and my dated phase-1 addendum on it. RL-22 is waived for 16.1.0 and does not hold the tag.

**Also owed before 5.2 (added 2026-10-26)**: Lina's radius-pair CORRECTION PR (the post-walk P0 above, ruled "resolve the radius names issue now"), and my re-check of it in the addendum on the final S. The Android record is waived for 16.1.0 (Spec 129). The motion pair does not hold the tag.

**To phase 2**:
1. The tag `v16.1.0` on S (or on a new S).
2. 5.3/5.4.
3. The rail result, every run pasted.
4. The 6b record: all four sha1s equal the 5.3 record.
5. The published bytes against this phase's tarball (expect only the re-stamped files to differ).
6. The cold-install smoke.
7. The merge-confirmation line, if phase 2 is drafted against the open step-6 PR.
8. The delegate audit (Ada) and Peter's sample, if run before phase 2.
9. J's blind seats.

**To the next release** (or earlier, if resolved first):

| Item | State at S | Owner |
|---|---|---|
| RL-1 / RS-10: link 6 through deleted branch refs | **bit at scale** (RL-24, 67 FAIL 6) | Thurgood |
| RL-2 and 16.0.0's J blind seats | not run; plus this release's | orchestrator spawns; I author packets |
| RL-24's other classes (H3 agent-setting, double candidate, link 7 on ncc rows, #416 triage) | new | Thurgood |
| RL-25 trigger (d) | fires at this RELEASE; no record yet | Thurgood (record); Peter (spec?) |
| 24 lapses, 9 escalations, plus native-readiness | owners append `## Lapse` (mine: three, reported above) | each owner; Peter for escalations |
| Lines X, A; the owed-set law-text kind; #492; #493 | open | Peter |
| Spec 123 30.3 subtask doc | carried, owner unsettled | Lina or Thurgood |
| RS-3 / RS-14 owed-set ladder | **the script is fixed (#473)**; the describing texts are not (RL-22) | Thurgood |
| 15.0.0 R-1 (steward theme claims) | record lapses at S (second lapse, escalates) | its owner |

---

## Standards implications

For Thurgood. He reads the pass in full and records a one-line outcome (the composed-loop record, `2026-10-24-composed-loop-outcome-lines-missing.md`, owes his line for this pass at its merge).

- **RS-33 (RL-19)**: my pre-S consult proposed replacement sentences for seven release lines, and the release took them verbatim. One is false. The mirror clause binds me at the LENS seat for criteria ("she may never say what it should say"). Nothing binds the same act at a pre-S release consult, and the result is the rot mode the clause names: the auditor audits her own text. The class question is whether a pre-S read names what is false and why, and leaves the replacement to the text's owner, or whether auditor-drafted text gets a second reader before it ships. **Owner**: Thurgood (the standard), with me. I name it and do not draft it.
- **RS-34 (RL-21)**: the grant and the notes plan to write the CHANGELOG's date "at the tag", after S. No step can reach the packed file then. The class fix is a RELEASE-FLOW step 2 sentence saying where the date comes from at S. **Owner**: Thurgood.
- **RS-35 (RL-23)**: three merges in one release cycle outran `**Open for Peter**:` lines, and one PR body cast the merge as the answer. The hold binds the merger, and no instrument reads the body at merge time. The author-side marking worked. **Owner**: Thurgood, with Peter.
- **RS-36 (RL-24)**: RS-10, evidenced at scale: the walk's evidentiary value for 62% of this population is void until link 6 reads pull refs. Also: H3 does not read a session's agent-setting; a double-printed commit line reads as two candidates; link 7 cannot anchor a row that renders nothing. **Owner**: Thurgood.
- **RS-37 (RL-25)**: S5 named who briefs and who dispatches the delegate audit, but no record or trigger fires it before a RELEASE phase 1. The first walk under it was missed. **Owner**: Thurgood.
- **RS-38 (RL-22)**: #473 changed the owed-set script's classification, and the four surfaces that describe it (RELEASE-FLOW § 5a, both charters, my consumer overlay) were not in its edit set. That is RS-29 turned around: law text that restates a script's behaviour has no straggler sweep. **Owner**: Thurgood.
- **RS-39 (RL-20)**: CHANGELOG summary lines ("no shipped file was removed") are written from the delta's intent. The packed file set against the previous public artifact (one `comm`) is the check that would catch them. It is the RS-25 class (16.0.0) for the file set, not the generated files. **Owner**: Thurgood (RELEASE-FLOW text).
- **RS-10, RS-13 and RS-28, evidenced again**: RL-24; the post-tag obligations still living in PR bodies and chat relays; the filed-after-walk lapses.

---

## Forced negative (this pass)

- **Three packed CHANGELOG sentences are false or unfinished**:
  - L53's second sentence (RL-19, my wording);
  - L5's "shipped file" clause (RL-20);
  - the `TBD` date (RL-21).
- **One shipped charter passage is false about the script it describes** (RL-22, my seat's; floor-class disputed).
- No other claim in the 21 sampled claim groups is false.
- No ❌ in any criterion row; no new parent.
- **No unverifiable claim was rolled into a ✅**:
  - the Android claims read `not re-verified — toolchain unavailable`;
  - browser-only claims say whose run they rest on;
  - the GitHub Packages registry was not read;
  - behaviour claims verified only by tests say "(test)".
- **Of 108 walked non-Stacy acts, 95 read other than `anchored`.** None is called green.
- The owed set is empty by definition, with no proxy correction needed.
- The 5b question is closed, and its tool text is now correct.

## Surviving counter-argument to my own verdict

My verdict, "the tag waits for Peter's answer on two forks", puts four small findings in front of a release that has already cleared its own walk.

**First, the forks' harm is small, and the cost of (a) is a re-cut.** RL-19 misstates test reach to a human reader. RL-20 is contradicted sixteen lines later in the same entry. RL-21 is a placeholder. RL-22's reader is told to read the reason column that tells the truth. Each by itself is Low. I hold them in front of the tag only because the floor's letter and 16.0.0's RL-11 precedent say a known falsity at its reader is Peter's to waive, not mine to rate away. I cannot reconcile a Low severity with that weight by choosing a severity. **What survives: if Peter's standing reading is that a CHANGELOG sentence is "disclosed" because the notes say the truth, then RL-19–RL-21 are not tag-relevant, and this record has spent his attention on them.** That reading is not on record, and 16.0.0 went the other way.

**Second, RL-19 is my own error, found by me.** A pass that finds its auditor's text false can look rigorous. But it is also evidence that the pre-S consult, whose findings 1–11 landed almost entirely as I wrote them, carried my mistakes into the shipped text with no second reader. The rate to weigh is 1 false of 7 proposed sentences, not "10 of 11 landed".

**Third, RL-24's volume is mostly the instrument, and I have not proven that.** I read 67 FAIL 6 lines as RL-1's class because the branch is deleted and the comparand is a pre-branch commit. I did not restore the ref to see them anchor. Until someone does, a reader may take 95 non-anchored acts as 95 bad acts, or I may be excusing real mismatches as instrument noise. Neither reading is earned yet.

---

## Phase 2 — placeholder

*To be appended as a dated section at the merge of the step-6 release-record PR (RELEASE-FLOW step 6). It reads:*
- the tag, and whether it is on S or on a new S;
- the committed `docs/releases/16.1.0/publish-verification.txt`: every rail run with its exit code, and the 6b record (the 5.3 record pasted, the 5.1 tally, and per registry the `time["16.1.0"]`, file count, `dist.shasum` and fetched-bytes sha1, all four equal to the 5.3 record);
- the cold-install smoke;
- the carried items above;
- *if drafted against the open step-6 PR*, the merge-confirmation line over every file it read.

---

## Appendix A — signing-act walk, per-act lines (verbatim; the human-readable section of each run with at least one non-Stacy act; the `--- machine-readable ---` JSON tail omitted; 102 PRs read `0 act(s)`)

```text
verify-signing-chain --audit — consistency, not identity — PR #397 (refs/pull/397/head = 4bf58254); store /Users/3fn/.claude/projects/-Users-3fn-Documents-Work-Projects-Kiro-DesignerPunk-v2
filter --exclude-signer stacy: 69 of 132 act(s) selected; 63 withheld
FAIL 6 — canonical/operative-sets/lina.yaml#in-scope — lina — d4190cc1 — prompt_snapshot ≠ .claude/agents/lina.md at 38db7b1b — spawnDepth 1, model opus — widening (§ 5.4)
FAIL 6 — canonical/profiles/consumer/lina.dispositions.yaml#in-scope — lina — d30b7350 — prompt_snapshot ≠ .claude/agents/lina.md at 38db7b1b — spawnDepth 1, model opus — widening (§ 5.4)
FAIL 6 — canonical/profiles/consumer/lina.dispositions.yaml#frontmatter:writeScope[scripts/extract-component-meta.ts] — lina — f34fa70c — prompt_snapshot ≠ .claude/agents/lina.md at 38db7b1b — spawnDepth 1, model opus — widening (§ 5.4)
FAIL 6 — canonical/profiles/consumer/lina.dispositions.yaml#frontmatter:writeScope[scripts/figma-component-generator.ts] — lina — f34fa70c — prompt_snapshot ≠ .claude/agents/lina.md at 38db7b1b — spawnDepth 1, model opus — widening (§ 5.4)
FAIL 6 — canonical/profiles/consumer/lina.dispositions.yaml#frontmatter:writeScope[scripts/audit-component-tokens.js] — lina — f34fa70c — prompt_snapshot ≠ .claude/agents/lina.md at 38db7b1b — spawnDepth 1, model opus — widening (§ 5.4)
FAIL 6 — canonical/profiles/consumer/lina.dispositions.yaml#frontmatter:writeScope[scripts/validate-examples.js] — lina — f34fa70c — prompt_snapshot ≠ .claude/agents/lina.md at 38db7b1b — spawnDepth 1, model opus — widening (§ 5.4)
FAIL 6 — canonical/profiles/consumer/lina.dispositions.yaml#frontmatter:writeScope[.kiro/hooks/lina-*.kiro.hook] — lina — f34fa70c — prompt_snapshot ≠ .claude/agents/lina.md at 38db7b1b — spawnDepth 1, model opus — widening (§ 5.4)
FAIL 6 — canonical/profiles/consumer/lina.dispositions.yaml#frontmatter:writeScope[tools/agent-generator/render.ts] — lina — f34fa70c — prompt_snapshot ≠ .claude/agents/lina.md at 38db7b1b — spawnDepth 1, model opus — widening (§ 5.4)
FAIL 6 — canonical/profiles/consumer/lina.dispositions.yaml#frontmatter:writeScope[tools/agent-generator/adapters/**] — lina — f34fa70c — prompt_snapshot ≠ .claude/agents/lina.md at 38db7b1b — spawnDepth 1, model opus — widening (§ 5.4)
FAIL 6 — canonical/profiles/consumer/lina.dispositions.yaml#frontmatter:writeScope[tools/agent-generator/compose.ts] — lina — f34fa70c — prompt_snapshot ≠ .claude/agents/lina.md at 38db7b1b — spawnDepth 1, model opus — widening (§ 5.4)
FAIL 6 — canonical/profiles/consumer/lina.dispositions.yaml#frontmatter:writeScope[tools/agent-generator/derive.ts] — lina — f34fa70c — prompt_snapshot ≠ .claude/agents/lina.md at 38db7b1b — spawnDepth 1, model opus — widening (§ 5.4)
FAIL 6 — canonical/profiles/consumer/lina.dispositions.yaml#frontmatter:writeScope[tools/agent-generator/generate.ts] — lina — f34fa70c — prompt_snapshot ≠ .claude/agents/lina.md at 38db7b1b — spawnDepth 1, model opus — widening (§ 5.4)
FAIL 6 — canonical/profiles/consumer/lina.dispositions.yaml#frontmatter:writeScope[tools/agent-generator/pipeline.ts] — lina — f34fa70c — prompt_snapshot ≠ .claude/agents/lina.md at 38db7b1b — spawnDepth 1, model opus — widening (§ 5.4)
FAIL 6 — canonical/profiles/consumer/lina.dispositions.yaml#frontmatter:writeScope[tools/agent-generator/skills.ts] — lina — f34fa70c — prompt_snapshot ≠ .claude/agents/lina.md at 38db7b1b — spawnDepth 1, model opus — widening (§ 5.4)
FAIL 6 — canonical/profiles/consumer/lina.dispositions.yaml#frontmatter:writeScope[tools/agent-generator/consumer-entry.ts] — lina — f34fa70c — prompt_snapshot ≠ .claude/agents/lina.md at 38db7b1b — spawnDepth 1, model opus — widening (§ 5.4)
FAIL 6 — canonical/profiles/consumer/lina.dispositions.yaml#frontmatter:writeScope[tools/agent-generator/consumer-profile.ts] — lina — f34fa70c — prompt_snapshot ≠ .claude/agents/lina.md at 38db7b1b — spawnDepth 1, model opus — widening (§ 5.4)
FAIL 6 — canonical/profiles/consumer/lina.dispositions.yaml#frontmatter:writeScope[tools/agent-generator/attribution.ts] — lina — f34fa70c — prompt_snapshot ≠ .claude/agents/lina.md at 38db7b1b — spawnDepth 1, model opus — widening (§ 5.4)
FAIL 6 — canonical/profiles/consumer/lina.dispositions.yaml#frontmatter:writeScope[tools/agent-generator/spans.ts] — lina — f34fa70c — prompt_snapshot ≠ .claude/agents/lina.md at 38db7b1b — spawnDepth 1, model opus — widening (§ 5.4)
FAIL 6 — canonical/profiles/consumer/lina.dispositions.yaml#frontmatter:writeScope[tools/agent-generator/registry.ts] — lina — f34fa70c — prompt_snapshot ≠ .claude/agents/lina.md at 38db7b1b — spawnDepth 1, model opus — widening (§ 5.4)
FAIL 6 — canonical/profiles/consumer/lina.dispositions.yaml#frontmatter:writeScope[tools/agent-generator/registry-manifest.ts] — lina — f34fa70c — prompt_snapshot ≠ .claude/agents/lina.md at 38db7b1b — spawnDepth 1, model opus — widening (§ 5.4)
FAIL 6 — canonical/profiles/consumer/lina.dispositions.yaml#frontmatter:writeScope[tools/agent-generator/resolve.ts] — lina — f34fa70c — prompt_snapshot ≠ .claude/agents/lina.md at 38db7b1b — spawnDepth 1, model opus — widening (§ 5.4)
FAIL 6 — canonical/profiles/consumer/lina.dispositions.yaml#frontmatter:writeScope[tools/agent-generator/resolve-stdio.ts] — lina — f34fa70c — prompt_snapshot ≠ .claude/agents/lina.md at 38db7b1b — spawnDepth 1, model opus — widening (§ 5.4)
FAIL 6 — canonical/profiles/consumer/lina.dispositions.yaml#frontmatter:writeScope[tools/agent-generator/workflow-rules-accessor.ts] — lina — f34fa70c — prompt_snapshot ≠ .claude/agents/lina.md at 38db7b1b — spawnDepth 1, model opus — widening (§ 5.4)
FAIL 6 — canonical/profiles/consumer/lina.dispositions.yaml#frontmatter:writeScope[tools/agent-generator/regrounding/derivation.ts] — lina — f34fa70c — prompt_snapshot ≠ .claude/agents/lina.md at 38db7b1b — spawnDepth 1, model opus — widening (§ 5.4)
FAIL 6 — canonical/profiles/consumer/lina.dispositions.yaml#frontmatter:writeScope[tools/agent-generator/regrounding/dispositions.ts] — lina — f34fa70c — prompt_snapshot ≠ .claude/agents/lina.md at 38db7b1b — spawnDepth 1, model opus — widening (§ 5.4)
FAIL 6 — canonical/profiles/consumer/lina.dispositions.yaml#frontmatter:writeScope[tools/agent-generator/regrounding/overlay.ts] — lina — f34fa70c — prompt_snapshot ≠ .claude/agents/lina.md at 38db7b1b — spawnDepth 1, model opus — widening (§ 5.4)
FAIL 6 — canonical/profiles/consumer/lina.dispositions.yaml#frontmatter:writeScope[tools/agent-generator/__fixtures__/g1-renderings/**] — lina — f34fa70c — prompt_snapshot ≠ .claude/agents/lina.md at 38db7b1b — spawnDepth 1, model opus — widening (§ 5.4)
FAIL 6 — canonical/profiles/consumer/lina.dispositions.yaml#frontmatter:writeScope[tools/agent-generator/__fixtures__/semantics-guard/**] — lina — f34fa70c — prompt_snapshot ≠ .claude/agents/lina.md at 38db7b1b — spawnDepth 1, model opus — widening (§ 5.4)
FAIL 6 — canonical/profiles/consumer/lina.dispositions.yaml#frontmatter:writeScope[tools/agent-generator/schema.ts] — lina — f34fa70c — prompt_snapshot ≠ .claude/agents/lina.md at 38db7b1b — spawnDepth 1, model opus — widening (§ 5.4)
FAIL 6 — canonical/profiles/consumer/lina.dispositions.yaml#frontmatter:writeScope[tools/agent-generator/partition.ts] — lina — f34fa70c — prompt_snapshot ≠ .claude/agents/lina.md at 38db7b1b — spawnDepth 1, model opus — widening (§ 5.4)
FAIL 6 — canonical/profiles/consumer/lina.dispositions.yaml#frontmatter:writeScope[tools/agent-generator/frontmatter.ts] — lina — f34fa70c — prompt_snapshot ≠ .claude/agents/lina.md at 38db7b1b — spawnDepth 1, model opus — widening (§ 5.4)
FAIL 6 — canonical/profiles/consumer/lina.dispositions.yaml#frontmatter:writeScope[tools/agent-generator/canonical-json.ts] — lina — f34fa70c — prompt_snapshot ≠ .claude/agents/lina.md at 38db7b1b — spawnDepth 1, model opus — widening (§ 5.4)
FAIL 6 — canonical/profiles/consumer/lina.dispositions.yaml#frontmatter:writeScope[tools/agent-generator/source.ts] — lina — f34fa70c — prompt_snapshot ≠ .claude/agents/lina.md at 38db7b1b — spawnDepth 1, model opus — widening (§ 5.4)
FAIL 6 — canonical/profiles/consumer/lina.dispositions.yaml#frontmatter:writeScope[tools/agent-generator/regrounding/hash.ts] — lina — f34fa70c — prompt_snapshot ≠ .claude/agents/lina.md at 38db7b1b — spawnDepth 1, model opus — widening (§ 5.4)
FAIL 6 — canonical/profiles/consumer/lina.dispositions.yaml#frontmatter:writeScope[tools/agent-generator/regrounding/operative-sets.ts] — lina — f34fa70c — prompt_snapshot ≠ .claude/agents/lina.md at 38db7b1b — spawnDepth 1, model opus — widening (§ 5.4)
FAIL 6 — canonical/profiles/consumer/lina.dispositions.yaml#frontmatter:writeScope[tools/agent-generator/__fixtures__/golden-partition/**] — lina — f34fa70c — prompt_snapshot ≠ .claude/agents/lina.md at 38db7b1b — spawnDepth 1, model opus — widening (§ 5.4)
FAIL 6 — canonical/profiles/consumer/lina.dispositions.yaml#frontmatter:writeScope[tools/agent-generator/jest.config.js] — lina — f34fa70c — prompt_snapshot ≠ .claude/agents/lina.md at 38db7b1b — spawnDepth 1, model opus — widening (§ 5.4)
FAIL 6 — canonical/profiles/consumer/lina.dispositions.yaml#frontmatter:writeScope[tools/agent-generator/tsconfig.json] — lina — f34fa70c — prompt_snapshot ≠ .claude/agents/lina.md at 38db7b1b — spawnDepth 1, model opus — widening (§ 5.4)
FAIL 6 — canonical/profiles/consumer/lina.dispositions.yaml#frontmatter:writeScope[.kiro/issues/**] — lina — f34fa70c — prompt_snapshot ≠ .claude/agents/lina.md at 38db7b1b — spawnDepth 1, model opus — widening (§ 5.4)
FAIL 6 — canonical/operative-sets/ada.yaml#in-scope — ada — da9acba6 — prompt_snapshot ≠ .claude/agents/ada.md at f34fa70c — spawnDepth 1, model opus — widening (§ 5.4)
FAIL 6 — canonical/profiles/consumer/ada.dispositions.yaml#in-scope — ada — 094b1313 — prompt_snapshot ≠ .claude/agents/ada.md at f34fa70c — spawnDepth 1, model opus — widening (§ 5.4)
FAIL 6 — canonical/profiles/consumer/ada.dispositions.yaml#frontmatter:writeScope[src/cli/**] — ada — fc57947a — prompt_snapshot ≠ .claude/agents/ada.md at f34fa70c — spawnDepth 1, model opus — widening (§ 5.4)
FAIL 6 — canonical/profiles/consumer/ada.dispositions.yaml#frontmatter:writeScope[scripts/generate-platform-tokens.ts] — ada — fc57947a — prompt_snapshot ≠ .claude/agents/ada.md at f34fa70c — spawnDepth 1, model opus — widening (§ 5.4)
FAIL 6 — canonical/profiles/consumer/ada.dispositions.yaml#frontmatter:writeScope[scripts/generate-token-types.ts] — ada — fc57947a — prompt_snapshot ≠ .claude/agents/ada.md at f34fa70c — spawnDepth 1, model opus — widening (§ 5.4)
FAIL 6 — canonical/profiles/consumer/ada.dispositions.yaml#frontmatter:writeScope[scripts/verify-opacity-types.ts] — ada — fc57947a — prompt_snapshot ≠ .claude/agents/ada.md at f34fa70c — spawnDepth 1, model opus — widening (§ 5.4)
FAIL 6 — canonical/profiles/consumer/ada.dispositions.yaml#frontmatter:writeScope[scripts/build-browser-bundles.js] — ada — fc57947a — prompt_snapshot ≠ .claude/agents/ada.md at f34fa70c — spawnDepth 1, model opus — widening (§ 5.4)
FAIL 6 — canonical/profiles/consumer/ada.dispositions.yaml#frontmatter:writeScope[scripts/build-name-contract.ts] — ada — fc57947a — prompt_snapshot ≠ .claude/agents/ada.md at f34fa70c — spawnDepth 1, model opus — widening (§ 5.4)
FAIL 6 — canonical/profiles/consumer/ada.dispositions.yaml#frontmatter:writeScope[scripts/build-tool-manifest.ts] — ada — fc57947a — prompt_snapshot ≠ .claude/agents/ada.md at f34fa70c — spawnDepth 1, model opus — widening (§ 5.4)
FAIL 6 — canonical/profiles/consumer/ada.dispositions.yaml#frontmatter:writeScope[scripts/floor-closure.ts] — ada — fc57947a — prompt_snapshot ≠ .claude/agents/ada.md at f34fa70c — spawnDepth 1, model opus — widening (§ 5.4)
FAIL 6 — canonical/profiles/consumer/ada.dispositions.yaml#frontmatter:writeScope[scripts/pack-assert.ts] — ada — fc57947a — prompt_snapshot ≠ .claude/agents/ada.md at f34fa70c — spawnDepth 1, model opus — widening (§ 5.4)
FAIL 6 — canonical/profiles/consumer/ada.dispositions.yaml#frontmatter:writeScope[scripts/release-publish.ts] — ada — fc57947a — prompt_snapshot ≠ .claude/agents/ada.md at f34fa70c — spawnDepth 1, model opus — widening (§ 5.4)
FAIL 6 — canonical/profiles/consumer/ada.dispositions.yaml#frontmatter:writeScope[scripts/verify-publish-rail.sh] — ada — fc57947a — prompt_snapshot ≠ .claude/agents/ada.md at f34fa70c — spawnDepth 1, model opus — widening (§ 5.4)
FAIL 6 — canonical/profiles/consumer/ada.dispositions.yaml#frontmatter:writeScope[scripts/check-package-name-drift.js] — ada — fc57947a — prompt_snapshot ≠ .claude/agents/ada.md at f34fa70c — spawnDepth 1, model opus — widening (§ 5.4)
FAIL 6 — canonical/profiles/consumer/ada.dispositions.yaml#frontmatter:writeScope[scripts/jest.config.js] — ada — fc57947a — prompt_snapshot ≠ .claude/agents/ada.md at f34fa70c — spawnDepth 1, model opus — widening (§ 5.4)
FAIL 6 — canonical/profiles/consumer/ada.dispositions.yaml#frontmatter:writeScope[scripts/esbuild-css-plugin.js] — ada — fc57947a — prompt_snapshot ≠ .claude/agents/ada.md at f34fa70c — spawnDepth 1, model opus — widening (§ 5.4)
FAIL 6 — canonical/profiles/consumer/ada.dispositions.yaml#frontmatter:writeScope[scripts/fix-tokens-css.js] — ada — fc57947a — prompt_snapshot ≠ .claude/agents/ada.md at f34fa70c — spawnDepth 1, model opus — widening (§ 5.4)
FAIL 6 — canonical/profiles/consumer/ada.dispositions.yaml#frontmatter:writeScope[scripts/audience-banner/**] — ada — fc57947a — prompt_snapshot ≠ .claude/agents/ada.md at f34fa70c — spawnDepth 1, model opus — widening (§ 5.4)
FAIL 6 — canonical/profiles/consumer/ada.dispositions.yaml#frontmatter:writeScope[scripts/__bites__/**] — ada — fc57947a — prompt_snapshot ≠ .claude/agents/ada.md at f34fa70c — spawnDepth 1, model opus — widening (§ 5.4)
FAIL 6 — canonical/profiles/consumer/ada.dispositions.yaml#frontmatter:writeScope[mcp-server/package.json] — ada — fc57947a — prompt_snapshot ≠ .claude/agents/ada.md at f34fa70c — spawnDepth 1, model opus — widening (§ 5.4)
FAIL 6 — canonical/profiles/consumer/ada.dispositions.yaml#frontmatter:writeScope[mcp-server/package-lock.json] — ada — fc57947a — prompt_snapshot ≠ .claude/agents/ada.md at f34fa70c — spawnDepth 1, model opus — widening (§ 5.4)
FAIL 6 — canonical/profiles/consumer/ada.dispositions.yaml#frontmatter:writeScope[mcp-server/tsconfig.json] — ada — fc57947a — prompt_snapshot ≠ .claude/agents/ada.md at f34fa70c — spawnDepth 1, model opus — widening (§ 5.4)
FAIL 6 — canonical/profiles/consumer/ada.dispositions.yaml#frontmatter:writeScope[mcp-server/jest.config.js] — ada — fc57947a — prompt_snapshot ≠ .claude/agents/ada.md at f34fa70c — spawnDepth 1, model opus — widening (§ 5.4)
FAIL 6 — canonical/profiles/consumer/ada.dispositions.yaml#frontmatter:writeScope[.kiro/hooks/ada-*.kiro.hook] — ada — fc57947a — prompt_snapshot ≠ .claude/agents/ada.md at f34fa70c — spawnDepth 1, model opus — widening (§ 5.4)
FAIL 6 — canonical/profiles/consumer/ada.dispositions.yaml#frontmatter:writeScope[.kiro/issues/**] — ada — fc57947a — prompt_snapshot ≠ .claude/agents/ada.md at f34fa70c — spawnDepth 1, model opus — widening (§ 5.4)
anomaly 4 — canonical/profiles/consumer/leonardo.dispositions.yaml#frontmatter:writeScope[.kiro/issues/**] — leonardo — 27b9bb0a — 2 candidates (agent-ad19f0a4943edc5f1.jsonl, agent-ad19f0a4943edc5f1.jsonl) — widening (§ 5.4)
anomaly 4 — canonical/profiles/consumer/sparky.dispositions.yaml#frontmatter:writeScope[.kiro/issues/**] — sparky — 15e19032 — 2 candidates (agent-a04bc2f543f5f76d5.jsonl, agent-a04bc2f543f5f76d5.jsonl) — widening (§ 5.4)
record absent 7 — canonical/profiles/consumer/sparky.dispositions.yaml#frontmatter:writeScope[.kiro/issues/**] — sparky — 7eb517fc — the row renders nothing — there is no rendered line to find — spawnDepth 1, model sonnet
anomaly 4 — canonical/profiles/consumer/data.dispositions.yaml#frontmatter:writeScope[.kiro/issues/**] — data — 50ea2d5f — 2 candidates (agent-a00650aacdcde10e5.jsonl, agent-a00650aacdcde10e5.jsonl) — widening (§ 5.4)
FAIL 4 — canonical/profiles/consumer/kenya.dispositions.yaml#frontmatter:writeScope[.kiro/issues/**] — kenya — bf32bdae — created in the main (orchestrator) session 57065fa3-e99f-4378-914b-e511c8da9ff5.jsonl — a primary created a seat-trailered commit — widening (§ 5.4)
counts (beside the per-act lines, never in place of them; no total is green): 69 act(s) — anchored 0 · unanchored 0 · record absent 1 · FAIL 65 · anomaly 3

verify-signing-chain --audit — consistency, not identity — PR #416 (refs/pull/416/head = 5946e127); store /Users/3fn/.claude/projects/-Users-3fn-Documents-Work-Projects-Kiro-DesignerPunk-v2
filter --exclude-signer stacy: 6 of 10 act(s) selected; 4 withheld
record absent 4 — canonical/operative-sets/ada.yaml#in-scope — ada — 12060d3a — no transcript shows this commit being created
record absent 4 — canonical/operative-sets/lina.yaml#in-scope — lina — 5d3addca — no transcript shows this commit being created
record absent 4 — canonical/operative-sets/leonardo.yaml#in-scope — leonardo — ca610db1 — no transcript shows this commit being created
record absent 4 — canonical/profiles/consumer/ada.dispositions.yaml#in-scope — ada — 3296834f — no transcript shows this commit being created
record absent 4 — canonical/profiles/consumer/leonardo.dispositions.yaml#in-scope — leonardo — f7384253 — no transcript shows this commit being created
record absent 4 — canonical/profiles/consumer/lina.dispositions.yaml#in-scope — lina — 1d453fe1 — no transcript shows this commit being created
counts (beside the per-act lines, never in place of them; no total is green): 6 act(s) — anchored 0 · unanchored 0 · record absent 6 · FAIL 0 · anomaly 0

verify-signing-chain --audit — consistency, not identity — PR #425 (refs/pull/425/head = d3319f45); store /Users/3fn/.claude/projects/-Users-3fn-Documents-Work-Projects-Kiro-DesignerPunk-v2
filter --exclude-signer stacy: 5 of 5 act(s) selected; 0 withheld
anomaly 4 — canonical/operative-sets/leonardo.yaml#what-consistent-means-in-true-native — leonardo — 10b4cd36 — 2 candidates (agent-a04f6adeeccae90d8.jsonl, agent-a04f6adeeccae90d8.jsonl) — widening (§ 5.4)
anomaly 4 — canonical/operative-sets/kenya.yaml#step-3-implement — kenya — 2e8c266c — 2 candidates (agent-addeb2cff7b28b346.jsonl, agent-addeb2cff7b28b346.jsonl) — widening (§ 5.4)
FAIL 6 — canonical/operative-sets/data.yaml#step-3-implement — data — b62e2119 — prompt_snapshot ≠ .claude/agents/data.md at 2e8c266c — spawnDepth 1, model opus — widening (§ 5.4)
FAIL 6 — canonical/operative-sets/data.yaml#android-specific-guidance:preamble — data — 1775cdbd — prompt_snapshot ≠ .claude/agents/data.md at 2e8c266c — spawnDepth 1, model opus — widening (§ 5.4)
FAIL 6 — canonical/profiles/consumer/data.dispositions.yaml#android-specific-guidance:preamble — data — fcf62b6d — prompt_snapshot ≠ .claude/agents/data.md at 2e8c266c — spawnDepth 1, model opus — widening (§ 5.4)
counts (beside the per-act lines, never in place of them; no total is green): 5 act(s) — anchored 0 · unanchored 0 · record absent 0 · FAIL 3 · anomaly 2

verify-signing-chain --audit — consistency, not identity — PR #445 (refs/pull/445/head = 0d16372f); store /Users/3fn/.claude/projects/-Users-3fn-Documents-Work-Projects-Kiro-DesignerPunk-v2
filter --exclude-signer stacy: 15 of 20 act(s) selected; 5 withheld
record absent 4 — canonical/profiles/consumer/ada.dispositions.yaml#frontmatter:description — ada — 1ddac1d2 — no transcript shows this commit being created
record absent 4 — canonical/profiles/consumer/ada.dispositions.yaml#frontmatter:writeScope[.kiro/specs/**] — ada — 1ddac1d2 — no transcript shows this commit being created
record absent 4 — canonical/profiles/consumer/data.dispositions.yaml#frontmatter:commands[android-build-test] — data — ea0bfe29 — no transcript shows this commit being created
record absent 4 — canonical/profiles/consumer/data.dispositions.yaml#frontmatter:commands[product-screen-commands] — data — ea0bfe29 — no transcript shows this commit being created
record absent 4 — canonical/profiles/consumer/data.dispositions.yaml#frontmatter:knowledgeBases[android-components] — data — ea0bfe29 — no transcript shows this commit being created
record absent 4 — canonical/profiles/consumer/data.dispositions.yaml#frontmatter:writeScope[.kiro/specs/**] — data — ea0bfe29 — no transcript shows this commit being created
record absent 4 — canonical/profiles/consumer/kenya.dispositions.yaml#frontmatter:commands[ios-build-test] — kenya — 314e6a01 — no transcript shows this commit being created
record absent 4 — canonical/profiles/consumer/kenya.dispositions.yaml#frontmatter:commands[product-screen-commands] — kenya — 314e6a01 — no transcript shows this commit being created
record absent 4 — canonical/profiles/consumer/kenya.dispositions.yaml#frontmatter:knowledgeBases[ios-components] — kenya — 314e6a01 — no transcript shows this commit being created
record absent 4 — canonical/profiles/consumer/kenya.dispositions.yaml#frontmatter:writeScope[.kiro/specs/**] — kenya — 314e6a01 — no transcript shows this commit being created
record absent 4 — canonical/profiles/consumer/leonardo.dispositions.yaml#frontmatter:description — leonardo — fc6ae901 — no transcript shows this commit being created
record absent 4 — canonical/profiles/consumer/leonardo.dispositions.yaml#frontmatter:writeScope[.kiro/specs/**] — leonardo — fc6ae901 — no transcript shows this commit being created
record absent 4 — canonical/profiles/consumer/lina.dispositions.yaml#frontmatter:writeScope[.kiro/specs/**] — lina — bd19189e — no transcript shows this commit being created
record absent 4 — canonical/profiles/consumer/sparky.dispositions.yaml#frontmatter:commands[product-screen-commands] — sparky — 81e4f9c7 — no transcript shows this commit being created
record absent 4 — canonical/profiles/consumer/sparky.dispositions.yaml#frontmatter:writeScope[.kiro/specs/**] — sparky — 81e4f9c7 — no transcript shows this commit being created
counts (beside the per-act lines, never in place of them; no total is green): 15 act(s) — anchored 0 · unanchored 0 · record absent 15 · FAIL 0 · anomaly 0

verify-signing-chain --audit — consistency, not identity — PR #451 (refs/pull/451/head = 3b959632); store /Users/3fn/.claude/projects/-Users-3fn-Documents-Work-Projects-Kiro-DesignerPunk-v2
filter --exclude-signer stacy: 3 of 3 act(s) selected; 0 withheld
anchored — canonical/operative-sets/sparky.yaml#web-theming — sparky — 977d1fd6 — transcript f6f839ac-be52-4d43-8a18-bf7959977f92/subagents/agent-a8ed0f9e221a7953d.jsonl — spawnDepth 1, model sonnet
anchored — canonical/operative-sets/ada.yaml#in-scope — ada — 7b8936a6 — transcript f6f839ac-be52-4d43-8a18-bf7959977f92/subagents/agent-ac41d6cfd5de1d551.jsonl — spawnDepth 1, model sonnet
anchored — canonical/profiles/consumer/ada.dispositions.yaml#in-scope — ada — b09c9ed0 — transcript f6f839ac-be52-4d43-8a18-bf7959977f92/subagents/agent-ac41d6cfd5de1d551.jsonl — spawnDepth 1, model sonnet
counts (beside the per-act lines, never in place of them; no total is green): 3 act(s) — anchored 3 · unanchored 0 · record absent 0 · FAIL 0 · anomaly 0

verify-signing-chain --audit — consistency, not identity — PR #472 (refs/pull/472/head = c672618c); store /Users/3fn/.claude/projects/-Users-3fn-Documents-Work-Projects-Kiro-DesignerPunk-v2
filter --exclude-signer stacy: 6 of 10 act(s) selected; 4 withheld
anchored — canonical/operative-sets/lina.yaml#token-selection-priority-must-follow-this-order — lina — 137dd98c — transcript f6f839ac-be52-4d43-8a18-bf7959977f92/subagents/agent-a3472b29d15358059.jsonl — spawnDepth 1, model sonnet
anchored — canonical/profiles/consumer/lina.dispositions.yaml#token-selection-priority-must-follow-this-order — lina — d45e17e0 — transcript f6f839ac-be52-4d43-8a18-bf7959977f92/subagents/agent-a3472b29d15358059.jsonl — spawnDepth 1, model sonnet
anchored — canonical/operative-sets/kenya.yaml#ios-theming-spec-094 — kenya — 43927428 — transcript f6f839ac-be52-4d43-8a18-bf7959977f92/subagents/agent-ae36ea4e0cc4122b3.jsonl — spawnDepth 1, model sonnet
anchored — canonical/profiles/consumer/kenya.dispositions.yaml#ios-theming-spec-094 — kenya — 2c03a3c4 — transcript f6f839ac-be52-4d43-8a18-bf7959977f92/subagents/agent-ae36ea4e0cc4122b3.jsonl — spawnDepth 1, model sonnet
anchored — canonical/operative-sets/data.yaml#android-theming-spec-094 — data — 1a53a2c6 — transcript f6f839ac-be52-4d43-8a18-bf7959977f92/subagents/agent-a19c265ea35706255.jsonl — spawnDepth 1, model sonnet
anchored — canonical/profiles/consumer/data.dispositions.yaml#android-theming-spec-094 — data — 50d90847 — transcript f6f839ac-be52-4d43-8a18-bf7959977f92/subagents/agent-a19c265ea35706255.jsonl — spawnDepth 1, model sonnet
counts (beside the per-act lines, never in place of them; no total is green): 6 act(s) — anchored 6 · unanchored 0 · record absent 0 · FAIL 0 · anomaly 0

verify-signing-chain --audit — consistency, not identity — PR #491 (refs/pull/491/head = bbe368e1); store /Users/3fn/.claude/projects/-Users-3fn-Documents-Work-Projects-Kiro-DesignerPunk-v2
filter --exclude-signer stacy: 4 of 6 act(s) selected; 2 withheld
anchored — canonical/operative-sets/lina.yaml#token-selection-priority-must-follow-this-order — lina — e1444c45 — transcript f6f839ac-be52-4d43-8a18-bf7959977f92/subagents/agent-a625263e52a2ab216.jsonl — spawnDepth 1, model opus
anchored — canonical/operative-sets/ada.yaml#what-this-means-in-practice — ada — 40943bce — transcript f6f839ac-be52-4d43-8a18-bf7959977f92/subagents/agent-a63fbecc0a6b77f0b.jsonl — spawnDepth 1, model opus
anchored — canonical/profiles/consumer/lina.dispositions.yaml#token-selection-priority-must-follow-this-order — lina — 13bd6cd9 — transcript f6f839ac-be52-4d43-8a18-bf7959977f92/subagents/agent-a625263e52a2ab216.jsonl — spawnDepth 1, model opus
anchored — canonical/profiles/consumer/ada.dispositions.yaml#what-this-means-in-practice — ada — 50f0058f — transcript f6f839ac-be52-4d43-8a18-bf7959977f92/subagents/agent-a63fbecc0a6b77f0b.jsonl — spawnDepth 1, model opus
counts (beside the per-act lines, never in place of them; no total is green): 4 act(s) — anchored 4 · unanchored 0 · record absent 0 · FAIL 0 · anomaly 0

```

---

## Phase 1 addendum — final S `dddf46d4f437abac2259b70b8cd783ea65dc18aa` (#500), 2026-10-26

**Written**: 2026-10-26. Reads taken 13:45:59Z → 13:58:50Z; this section appended at 13:59:08Z (each from `date -u` when taken).
**Final S**: `dddf46d4f437abac2259b70b8cd783ea65dc18aa`, the squash of **PR #500** (Lina, CORRECTION; head `4deef00b3127e036c98eb11a422bcd4f82aba591`, branch `fix/platform-guidelines-radius-input-names`), merged by `3fn` at **2026-10-26T13:43:52Z**. Its parent is `ff3e7dad7` (#499, merged 13:35:00Z; head `2d604fb7`, branch `release/16.1.0-fix-1`). Merge times, merge commits and heads are from GitHub's public API, read by me.
**Firing event**: RELEASE phase 1 on the new S. It is owed by Fork 1 (a) and by the radius ruling (both above), and by RELEASE-FLOW Phase 1 as amended by #496: "It also re-runs item 3a's two greps at S …".
**State at this writing** (13:57:04Z): no `v16.1.0` tag on `origin` (newest `v16.0.0`). `registry.npmjs.org/@3fn%2fcore`: `dist-tags.latest` = `16.0.0`, and no `16.1.0` key in `versions` or `time`. `origin/main` is the final S. **Nothing is tagged or published.**
**Append-only**: every section above stays as written. Where this addendum corrects one, it says so.

> **No pass, at any grain, is ever a required check, a review gate, or a blocking condition on any PR.** This addendum gates neither the tag nor the publish. Where a finding meets the release floor, it names the fork for Peter and does not pick it.

### For the tag (read this first)

- **Everything this record owed at the final S is fixed in the packed bytes**: RL-19, RL-20 and RL-21 (#499); the radius pair L145/L156, the motion pair L310/L321 and the six focus-ring lines (#500). RL-22 stays waived by Peter's "(i)". The Android Float/Dp record stays waived to Spec 129.
- **This read makes two more texts known-false or stale at their reader** (RL-27, RL-28 below), and so puts **one fork** in front of 5.2:
  - **RL-27**: the same served doc still names five `--dp-` web identifiers that no file in the package emits: L128, **L299–L300 (the web block of the Float Label example whose iOS and Android lines #500 corrected)**, and L661–L662.
  - **RL-28**: packed `CHANGELOG.md` L37 says "Other token docs were not checked for such names yet". Ada checked them in #495, before #499 edited this entry, and found 36 wrong names.
- **My verdict line for the tag at the final S: it should wait for Peter's answer on RL-27's fork (RL-28 rides it), not for a fix. Nothing else holds it.**
- **Open for Peter**: RL-27's fork, (a) / (b) / (c), below. This line belongs in #497's body as an `**Open for Peter**:` line.

### RELEASE-FLOW 5.1 at the final S

The orchestrator's dry run from the main checkout, 13:44:36Z → 13:45:05Z, `EXIT=0`. I read the log (`dry-run-finalS.out`, 2083 lines) for these lines:

```text
release-publish: dry-run of @3fn/core@16.1.0 at dddf46d4f437abac2259b70b8cd783ea65dc18aa (fresh clone of https://github.com/3fn/DesignerPunk.git)
✓ No package name drift detected (1540 files scanned)
Closure 1: 54 files checked, 0 escaping references
Closure 2: 54 seed files, 16 closure files, 0 bare specifiers
105/105 assertions passed.
sha1:       2c8e1907ccddc318f7aed0ddbe488b36b0268727
files:      1694   bytes: 6589704   pack-assert: 105/105   publish path: 16 (floor 16)
```

- **105 `PASS` lines, 0 `FAIL`**; 16 of them `PASS: publish path:`, with `nested roots []` for all three MCP bundles. With the temp-dir name masked, the 105 lines equal the prior S's line for line.
- The log's one `✖` is the `verify:token-index-clean` script's own command echo (L1963), not output.
- `release-publish-record.json`: `mode` `dry-run`, `commit` = the final S, `sha1` `2c8e1907…`, `fileCount` 1694, `bytes` 6589704, `checks` 105/105, `publishedTo` `[]`, `createdAt` 2026-10-26T13:45:01.652Z.
- I copied the tarball and the record from the run's `out/` directory, re-hashed the tarball (sha1 equal) and extracted it.
- As above: 5.3 rebuilds at the tag, so the published sha1 will differ. 6b's comparand is the 5.3 record.

### The delta since the prior S

**"S moved twice" holds for the packed files, not for `main`.** `git log --first-parent a95d6bf3d..dddf46d4f` has six commits: #492 (ballot RATIFIED, rule 11), #496 (its application), #498 (the fix-1 grant), #495 (ballot RATIFIED, the governance-examples guard, with Ada's new section in `2026-10-25-token-docs-unvetted-name-hits.md`), #499 and #500.

**The packed delta** (the prior tarball `9bc2e33c…` against the final `2c8e1907…`, both extracted):
- **The same 1694-path file set** (`comm -3` prints nothing).
- **6 files differ**:
  - three re-stamped timestamps, and nothing else: `dist/mcp/tool-manifest.json` (`generatedAt`), `dist/types/generated/TokenTypes.{d.ts,js}` (`Generated:`);
  - `CHANGELOG.md` (#499);
  - `governance/classification-map.md` (#496: the rule-11 register rows);
  - `governance/platform-implementation-guidelines.md` (#500).
  - Each of the last three is byte-equal to its file at the final S (`git show dddf46d4f:<path> | cmp`).
- **Unchanged**: `package.json` (byte-equal); the five token files the sample reads (`dist/DesignTokens.{web.css,ios.swift,android.kt,dtcg.json}`, `dist/browser/tokens.css`); `token-index/{primitives,semantics,components}.yaml` (byte-equal; keys 217/193/33); `.kiro/steering/**`; `dist/consumer-canonical/**`.

**What this means for my sample**:
- **The L266 row's counts hold**: token-index keys 217/193/33 on both sides, 0 removed. The final file set equals the prior S's, so against public 16.0.0 it is still 21 added and 2 removed.
- **Every claim group I read in bytes under `dist/`, `token-index/`, `src/components/**` or `.kiro/steering/` carries over unchanged.**
- **Re-read here**: the CHANGELOG groups (the RL-19/20/21 rows and L37); row 3's four names in packed `governance/` and `.kiro/steering/` (0 hits each, as at the prior S); and the guidelines (below).
- `governance/classification-map.md`'s change is the register text of the ballot #496 applies. It states the same rule-11 sentences as `.kiro/issues/README.md` at S.

**Signing acts in the delta**: `verify-signing-chain --audit --pr <N> --exclude-signer stacy` for #492, #495, #496, #498, #499 and #500 reads `0 of 0 act(s)` each, exit 0. No path under `canonical/profiles/` or `canonical/operative-sets/` changed. RL-24's and RL-25's counts are unchanged: `Delegate audit (Stacy-signed, Ada): 0 / 135 — no file at S (not run)`; `Peter sample (Stacy-signed): 0 / 135`.

**Grant out-of-list read, #499**:
- `git diff --name-status ff3e7dad7~1 ff3e7dad7` lists `CHANGELOG.md` and `docs/releases/release-16.1.0.md`. Both are in the fix-1 grant's list. `canonical/generated.lock` is not touched.
- The CHANGELOG hunks sit inside `[16.1.0]` (L4–L14 and L56–L62). The notes hunks are the Date line and L57, the two the grant names.
- No out-of-list edit.

### RL-19, RL-20, RL-21 and notes L57 at the final S

Read in packed `CHANGELOG.md`, which is byte-equal to the final S's:

| Finding | At the final S | Result |
|---|---|---|
| RL-21 | L7: `## [16.1.0] — 2026-10-26 — Release 5 …` | **fixed** |
| RL-20 | L11: "no export or token was removed, and no token value changed. One shipped file pair was removed, `dist/components/core/Button-CTA/Button-CTA.refs.{js,d.ts}`, which no documented entry point exports" | **fixed**. The pair is absent from the tarball, and `exports` is unchanged |
| RL-19 | L59: "On Kiro, our onboarding tests ran only the Sparky and Leonardo agents, on a preview of this release. The Thurgood and Stacy agent files changed in this release and have not been run …, and Ada, Lina, Kenya and Data were not run on Kiro (Ada and Lina were run on Claude Code). The Ada and Lina agent files and the Core Goals file changed after that preview, and no run has seen them on either harness." | **fixed**. It matches the records: trio-2 (Sparky) and trio-3 (Leonardo) on Kiro; trio-1 (Ada, Lina) on Claude Code; `conformance-kiro-beat-1.md` "No `--agent thurgood` session ran"; #491 after F |
| Notes (not packed) | `**Date**: 2026-10-26`. L57 now names RL-22 and Peter's waiver | **fixed** |

- **#499's fix survived #500's merge.** #500 touches neither `CHANGELOG.md` nor the notes, and the packed CHANGELOG is byte-equal to the final S.
- **RL-21's residual**: the heading carries S's date. If 5.2 runs after UTC midnight, the tag's date and the heading's differ by a day. That is not a falsity.
- The replacement wording of all three is Thurgood's, not mine (RS-33, observed).

### The post-walk P0 rows, re-checked against the packed artifact

Read in packed `governance/platform-implementation-guidelines.md` (byte-equal to the final S), against packed `dist/DesignTokens.{web.css,ios.swift,android.kt}` and `token-index/`:

| Line(s) | At the final S | Emitted (packed) and index | Row |
|---|---|---|---|
| L145, iOS | `RoundedRectangle(cornerRadius: DesignTokens.radius150)` | Swift L275 `public static let radius150: CGFloat = 12`; index `radius150` → ios `radius150` | owed → **fixed** |
| L156, Android | `shape = RoundedCornerShape(DesignTokens.radius_150)` | Kotlin L275 `val radius_150 = 12.dp`; index → android `radius_150` | owed → **fixed** |
| L310, iOS | `withAnimation(.easeOut(duration: DesignTokens.MotionFloatLabel.duration))` | Swift L639–L642 `public struct MotionFloatLabel { public static let duration = Duration.duration250 … }`; `duration250: TimeInterval = 0.25` | **fixed**: the name resolves, and the declared type fits `.easeOut(duration:)` on read |
| L321, Android | `durationMillis = DesignTokens.MotionFloatLabel.duration,` | Kotlin L636–L639 `object MotionFloatLabel { val duration = Duration.Duration250 … }`; `val Duration250 = 250` | **fixed**: the name resolves, and an `Int` fits `durationMillis` on read |
| L137–L138, web | `var(--accessibility-focus-width)` / `-color` / `-offset` | `DesignTokens.web.css` and `browser/tokens.css` L830, L832, L834 | **fixed** |
| L146–L147, iOS | `DesignTokens.accessibilityFocusColor` / `Width` / `Offset` | Swift L530, L532, L534 | **fixed**; see O-29 |
| L154–L155, Android | `DesignTokens.accessibility_focus_width` / `_color` | Kotlin L530, L532, L534 | **fixed** |

- **The old names anywhere in the packed artifact** (`radius.input`, `DesignTokens.accessibility.focus`, `motion.floatLabel.duration`, `--dp-accessibility`): **1 hit**. It is `src/components/core/Input-Text-Base/platforms/android/InputTextBase.android.kt` L481, a comment on a bodyless `const val`. That is component source, inside the Android disclosure at CHANGELOG L53. Lina's line on the upkeep branch routes it to `2026-10-24-android-component-unit-type-mismatches.md`. It is not a guidelines line.
- **Compile**: the iOS and Android rows are `not re-verified — toolchain unavailable`. The "fixed" calls are reads of names and declared types. #500's body says "Nothing was compiled".
- **Lina's record** `2026-10-26-guidelines-platform-token-names-radius-input-motion-floatlabel.md` (trigger `merge:#500`) **is not an ancestor of the final S**. It sits on `origin/chore/post-16.1.0-record-upkeep` (`7678b314e`), and `git merge-base --is-ancestor` fails. My greps run over `git archive dddf46d4f .kiro/issues`, so they do not reach it, and **it cannot fire here**. Its close (rule 5's outcome line and the archive move) is Lina's when the upkeep branch lands. The Android record (`2026-10-26-android-guidelines-spacing-float-dp-claim.md`) is on the same branch, is not read by the greps either, and stays waived.

### The two 3a greps at the final S (RELEASE-FLOW Phase 1, as amended by #496)

The commands are verbatim from RELEASE-FLOW 3a at S, with `V=16.1.0`. I ran them at 13:49:07Z over `git archive dddf46d4f .kiro/issues`, extracted to scratch: the worktree is not at S, but these are S's bytes. Output cut at 140 characters:

```text
main at: dddf46d4f437abac2259b70b8cd783ea65dc18aa
… 34 Trigger lines in 33 records …
due-rows exit 0
.kiro/issues/2026-06-25-component-schema-token-name-drift.md:11:**Class**: P0 false-claim · defect *(set 2026-10-20, Lina, rule 12. Accepte
P0 exit 0
```

- **Against the prior S** (33 lines in 32 records, compared sorted by path):
  - **In (1)**: `2026-10-26-release-16-1-fix-1-files-grant.md` (`release:16.1.0:phase-1`, #498).
  - **Out**: none.
  - **P0**: identical, 1 line in 1 record (row 1, fixed by #452).
- **By token**: 3 records carry `release:16.1.0:phase-1` (the walk record, the 16.1.0 files grant and the fix-1 grant). 30 carry `release:next:phase-1`, the same 30 as at the prior S.
- **Hits the walk record does not row** (the amended phase-1 read). The row test is rule 11's: a line of the walk record at S that begins `|` and contains the file name. Of the 30, **10 were filed after the walk merged** (`264c25661`, #469): 8 are not rowed, 1 is rowed (row 35), and 1 was re-ruled (the CDG record). **None carries `**Class**: P0`.** Their rule-11 states are below. The fix-1 grant is a grant, which rule 11 excludes.
- **Rule 11's new sentence 1 changes no count at this S.** Its carry applies only to post-walk records that the walk rows. The one such record (row 35, `2026-10-25-validate-assembly-empty-result-overstates-coverage.md`) was already re-ruled to the next release in #488, so it does not lapse either way.

**What lapses at the final S, recounted from ancestors of the final S**: the same as at the prior S. Between the two, the only `.kiro/issues/` changes are the new fix-1 grant and Ada's appended section in `2026-10-25-token-docs-unvetted-name-hits.md` (#495), which changes neither its Trigger nor its Class. No record was closed or re-ruled in the delta.
- **No lapse: 6**, the six listed above. **Lapse: 24**: P1 3, P2 `(guard)` 8, P2 `(record)` 13, the same records. **Escalations: 9**, the same. 6 + 24 = 30.
- **Erratum to my line above** ("7 of the 24 were filed after #469 merged"): **the count is 8.** All eight are 2026-10-25 records, and none is rowed:
  - `application-mcp-stale-package-token-version-warning`;
  - `core-goals-l59-vs-product-token-authoring`;
  - `issues-owned-fired-ignores-outcome-lines`;
  - `native-reads-of-names-the-theme-does-not-hold` (added in `26b7f5648`, which is not an ancestor of `264c25661`; the one I missed);
  - `owed-set-law-text-after-closing-commit-anchor`;
  - `token-docs-unvetted-name-hits`;
  - `web-elements-served-prop-sweep`;
  - `web-prop-mapping-rule-gap`.
  
  The lapse totals do not change.
- **Grants**: the fix-1 grant expired at #499's merge, by its own text, and carries no rule-5 outcome line at the final S. Rule 11 says "a grant still open at its fixing PR's merge is a walk finding" (O-31). The 16.1.0 files grant's `docs/releases/16.1.0/**` path stays open for step 6.
- **Mine** (Start Up Tasks item 9): unchanged from above. Three lapses, reported; the `## Lapse` headings are not appended in this record-only PR.

### RL-27: Low (tag-relevant) — the guidelines still name five `--dp-` web identifiers; two are the web block of the Float Label example #500 corrected

- **Promised** (M7, RELEASE-FLOW 3a): "served docs, MCP contracts and agent charters are fixed, not disclosed". Peter, 2026-10-26: "resolve the radius names issue now"; then, for the focus lines, "yes, include them in 500".
- **Claimed** (#500's title): "Focus Ring, Input-Text-Base radius and Float Label examples name the emitted tokens (…), not names no platform carries".
- **Shipped** (packed `governance/platform-implementation-guidelines.md`, byte-equal to the final S):
  - L128: `web: CSS Custom Properties (--dp-*)`;
  - L299–L300, the web block under "Example - Float Label Animation" (L295): `transition: transform var(--dp-motion-float-label-duration) ease-out,` and `font-size var(--dp-motion-float-label-duration) ease-out;`;
  - L661–L662: `prefix: --dp-` and `example: var(--dp-color-primary)`.
  - **No other file in the packed artifact has a `--dp-` name** (5 lines at the final S; 7 at the prior S, of which #500 removed L137–L138). The emitted name for L299–L300 is `--motion-float-label-duration` (`dist/DesignTokens.web.css` L902). `color.primary` is not a key in `token-index/`.
- **Reading**: this is the class of the radius pair Peter ruled fix-now, in the same served file. L299–L300 sits in the example whose iOS and Android blocks #500 fixed, so "Float Label examples name the emitted tokens" is true for two of its three platform blocks. A web agent who copies the block writes a `var()` that resolves to nothing. Harm: low (the transition loses its duration).
- **Known before this pass**: L128 only, in Lina's line on the unmerged upkeep branch: "Seen, for a later CORRECTION: the `--dp-*` prose at L128 … It is a prose line the guard does not read, so nothing will flag it". That record is not an ancestor of S, so by 3a's letter the release did not "know" any of the five lines until this read. I found L299–L300 and L661–L662 named nowhere.
- **Route**: **Lina** (the file's content owner, for the CORRECTION); **Peter** (the fork). → RS-40.

### RL-28: Low (tag-relevant; rides RL-27) — CHANGELOG L37 says the other token docs "were not checked … yet"; Ada checked them in #495

- **Claimed** (packed `CHANGELOG.md` L37): "Other token docs were not checked for such names yet (tracked: `.kiro/issues/2026-10-25-token-docs-unvetted-name-hits.md`)".
- **At the final S**: that record's section "Corrections and the vetted list (2026-10-26, Ada)" landed in #495 (`f55bf3e04`), which merged before #499 edited this entry. It reads: "Predicate v1 … finds **56 failures in 15 docs**", of which "**36 corrections** (CORRECTION; truth `token-index/`)".
- **Spot-check in the packed bytes** (2 of Ada's 8 correction docs; the other rows are her count, not re-derived): `governance/Token-Resolution-Patterns.md` L133–L136 (`'color.primary'`, `'color.secondary'`, `'color.success'`, `'color.error'`) and L218 (`DesignTokens.color.primary`); `governance/Token-Semantic-Structure.md` L85–L86 and L150. `color.primary` and `color.error` are not keys in packed `token-index/semantics.yaml`.
- **Reading**: the sentence was true when written and is stale at S. It understates: the docs were checked, and 36 strings are wrong. Its reader is human (the CHANGELOG), so this weighs as RL-20 did.
- **I do not raise the 36 themselves as a fork.** Peter's F-3 answer (ballot `2026-10-26-governance-examples-guard`, RATIFIED, an ancestor of S; "Proceeded as recommended", received before 01:54:41Z) is his dated answer for exactly these strings. The question put to him named them ("36 of Ada's 56") and the 16.1.0 walk, and he took option (b): "not a row; the RELEASE pass reads P and its trend, and the release notes carry the count". **What survives**: F-3's text keys to the guard's adoption, which has not happened. And its own cost-bound ("the release notes carry the count") is not met for 16.1.0: neither the notes nor the CHANGELOG carries the 36. L37 is where that count would go.
- **Route**: **Thurgood** (the CHANGELOG's author); **Ada** (the count's owner). The fork rides RL-27's.

### The fork (RL-27, with RL-28), surfaced and not picked: Peter's

- **(a) Fix before the tag.** Lina's CORRECTION of L128, L299–L300 and L661–L662 (truth: `dist/DesignTokens.web.css`), and Thurgood's L37 under a fresh grant (with the 36 count, if Peter wants F-3's cost-bound met now). That means a new S, 5.1 again, and a second dated addendum. It is the only option that meets the floor's letter for both.
- **(b) Tag the final S with his own-words waiver for 16.1.0.** The five lines ride Lina's planned post-tag CORRECTION (her upkeep line, widened from L128 to all five), and L37 is carried as an erratum in the next entry.
- **(c) Rule them not floor-class**: for example, L128 and L661–L662 describe a naming convention rather than an identifier, and L299–L300 is illustrative. This also needs his words.
- **The cost of (a)**: a third S today. The delta between S's has run six commits each time, all clean so far, but each re-cut is another 5.1 and another read.
- **Open for Peter**: RL-27's fork, (a) / (b) / (c). The tag waits for his answer, not for a fix.

### Observations (not findings)

- **O-29 — iOS `accessibilityFocusColor` is `static let`, not `public`** (packed Swift L534; L530 and L532 are `public`). The corrected L146 resolves inside one module and fails across a module boundary. It is known and classed at S: `2026-10-24-ios-token-declarations-not-public.md` (Ada, P3 · defect: "every colour token … and the 6 z-index tokens"; trigger: Spec 129's requirements). Lina's line on the upkeep branch names this instance. I do not dispute the record's reading, so it is not a floor row.
- **O-30 — the index's platform names for `motion.floatLabel`** are `motionFloatLabel` (iOS) and `motion_float_label` (Android) (`token-index/semantics.yaml` L2021). The corrected L310/L321 read `DesignTokens.MotionFloatLabel.duration`, which the generated files define. The index names point at the hand-kept `src/tokens/platforms/{ios,android}/MotionTokens.*`, and `motion_float_label` resolves in no packed `.kt` file. So `get_token_details` may answer an Android agent with a name that resolves nowhere; I did not trace what it serves for this key. Ada's answer in Lina's upkeep record states the split. I found no ancestor record of S that files it. → **Ada**: file it, or point to the record that holds it. Not offered as a floor row on this read.
- **O-31 — the fix-1 grant is open at the final S.** It has no rule-5 outcome line, and by its own text it expired at #499's merge. Its close is Thurgood's.
- **O-32 — notes L66's post-F list** names #486, #488, #489, #490 and #491. At the final S, #496 (`governance/classification-map.md`), #499 (`CHANGELOG.md`) and #500 (`governance/platform-implementation-guidelines.md`) also changed shipped paths after F. #500's body says "Thurgood adds this number at the step-6 record"; #496 and #499 belong in the same edit. "No trio run saw these changes" stays true.

### Standards implications (this addendum)

For Thurgood, read in full as above.
- **RS-40 (RL-27)**: a CORRECTION scoped to a ruled list (the radius pair, then the six focus lines) fixed every named line. It left the same file's other instances of the same class, including the third block of an example it edited. The guard ratified in #495 reads token-name keys. Lina's line says it does not read L128, and I did not verify whether it selects `var(--dp-…)` inside a fence. The class question: does a served-doc CORRECTION sweep its file for the class it corrects (here, one `grep -- '--dp-'`), or only its ruled lines? **Owner**: Thurgood (the standard), with Ada (the guard's predicate scope).
- **RS-41 (RL-28)**: a CHANGELOG disclosure that cites a record ("tracked: …") goes stale when the record moves before the tag. No step re-reads the cited records at the final S. **Owner**: Thurgood (RELEASE-FLOW text).
- **RS-33, evidenced and kept**: RL-19/20/21's replacement text is Thurgood's, and I did not draft it. The fork above names what is false and leaves the text to its owners.

**Standards implications: list — RS-40 and RS-41 (new); RS-33 evidenced.**

### Method (this addendum)

**Run by me** (worktree at `92ead5350`, branch `chore/release-16.1.0-claims-pass-phase-1`; `git status --porcelain` empty before, and only this file after):
- `git fetch origin`; `git log`, `git show` and `git diff` over `a95d6bf3d..dddf46d4f`; `git merge-base --is-ancestor` for Lina's record and the post-walk records;
- the public GitHub API, unauthenticated, for #499's and #500's `merged_at`, merge commit and head; `git ls-remote --tags origin`; the npm packument;
- both 3a greps over `git archive dddf46d4f .kiro/issues` (and over `a95d6bf3d`, for the comparison); the row test over the walk record at S;
- the copy, re-hash and extraction of both dry-run tarballs; `comm` and `diff -rq` between them; `cmp` of packed files against `git show dddf46d4f:<path>`; the greps in the packed bytes;
- `verify-signing-chain --audit --exclude-signer stacy` for the six delta PRs (six `FETCH_HEAD` writes; no ref or branch written).

**Read, not re-run**: the 5.1 dry run (the orchestrator's).

**Not run**:
- any compile;
- the root suite and the MCP suites;
- `owed-set.sh` (the delta touches no `.kiro/specs/` path, so its rows cannot change);
- `gh` (this session holds no credentials, and I read none);
- `verify-gate-registration.sh`.

### Forced negative (this addendum)

- **Two packed texts are false or stale at their reader**: the five `--dp-` lines (RL-27) and CHANGELOG L37 (RL-28).
- **No ✅ here rests on a compile.** Every iOS and Android row is `not re-verified — toolchain unavailable` for compilation, and its "fixed" is a read of names and declared types.
- No other claim group in my sample moved between the two S's.

### Surviving counter-argument

My verdict holds the tag a third time today, for findings rated Low.

**What survives**: Peter ruled on the radius names in his words ("resolve the radius names issue now"), and then widened #500 by name to the focus lines. A reader can say he scoped both the fix and the release, and that a fresh find in the same file belongs to the post-tag CORRECTION, not to the tag. I cannot rule that reading out. I hold the fork in front of the tag only because the floor's letter and both of today's precedents say a known falsity in a served doc is his to waive. L299–L300 also sits in the very example he had fixed. If his standing reading for finds like this is (b), this record has spent his attention on Low items once more.

---

## Phase 1 addendum 2 — final S `503fbfb84cfa48dee2929363e25493546b9a56d1` (#503), 2026-10-26

**Written**: 2026-10-26. Reads taken 14:39:07Z → 14:52:36Z; this section appended at 14:54:47Z (each from `date -u` when taken).
**Final S**: `503fbfb84cfa48dee2929363e25493546b9a56d1`, the squash of **PR #503** (Thurgood, fix 2; head `962c7e919`, branch `release/16.1.0-fix-2`), merged by `3fn` at **2026-10-26T14:36:53Z**. Its first-parent chain back to the prior S `dddf46d4f`:
- **#501** (grant record; head `fd3af02e3`, branch `chore/release-16.1.0-fix-2-grant`): squash `dce3199908fb0af06cdd9cb324929efeae630307`, merged **14:17:18Z**;
- **#502** (Lina's sweep; head `a9f1753ec`, branch `fix/platform-guidelines-dp-prefix-sweep`): squash `f1433b5bd798674297587faf33f2e23270099341`, merged **14:25:25Z**;
- **#503**: as above.

Merge times, merge commits, heads and merger are from GitHub's public API, read by me.
**Peter's answer, and its bound**: chat, relayed by the orchestrator, received before 2026-10-26T14:04:13Z (the orchestrator's clock), verbatim: *"Fix it now, and do the whole-file sweep"*. That is option (a) of the RL-27/RL-28 fork, plus the remedy of Lina's counter-argument. It is recorded on #497's body as an `**Answered (RL-27/RL-28 fork)**:` line (read by me from the public API; #497 head `3713247be`). All three merges are after the bound, so none outran the question (RL-23 does not repeat).
**Firing event**: RELEASE phase 1 on the new S, owed by option (a) ("a new S, 5.1 again, and a second dated addendum").
**State at this writing** (14:48:10Z): no `v16.1.0` tag on `origin`. `registry.npmjs.org/@3fn%2fcore`: `dist-tags.latest` = `16.0.0`, and no `16.1.0` key in `versions` or `time`. `origin/main` is the final S. **Nothing is tagged or published.**
**Append-only**: every section above stays as written. Where this addendum corrects one, it says so.

> **No pass, at any grain, is ever a required check, a review gate, or a blocking condition on any PR.** This addendum gates neither the tag nor the publish. Where a finding meets the release floor, it names the fork for Peter and does not pick it.

### For the tag (read this first)

- **RL-27 and RL-28 are fixed in the packed bytes.** No packed file has a `--dp-` name. Each of the four extra sweep lines is true against the generators. CHANGELOG L37 and the notes carry Ada's count, so **F-3's "the release notes carry the count" is met**. O-31 and O-32 are resolved.
- **Nothing else this record owed moved.** The packed delta is the two files the fix PRs edited, plus three re-stamped timestamps. Every claim group I read in bytes carries over.
- **One new reading, RL-29, is Peter's.** The token index's web names for 30 composite tokens (24 typography, 6 motion) and 7 elevation tokens are names that no packed CSS defines. `get_token_details` serves them, with no caveat. One served doc copies one of them: `governance/Component-Development-Guide.md` L609, `font: var(--typography-button-md);`. That line sits in the CSS block #472 corrected (floor row 3), against the index.
  - It is pre-existing: the index rows are the same at `v16.0.0`, where the line was L602.
  - It is not a walk row, and no record holds it at S.
  - I read it as P0-shaped at the web reader. The fork is below.
- **The L686/L711 access rule** ("`DesignTokens.<iOS|Android identifier from the token index>`"): **I rule it a rule with unlisted exceptions, not a false sentence under the floor.** The reasons are below. It does not hold the tag.
- **My verdict line for the tag at the final S `503fbfb84`: it should wait for Peter's answer on RL-29, not for a fix. Nothing else holds it.** By 3a's letter RL-29 does not hold it, because it is not a walk row. I hold it on the precedent of RL-27, and the counter-argument below says what that costs.
- **Open for Peter**: RL-29's fork, (a) / (b) / (c), below. This line belongs in #497's body as an `**Open for Peter**:` line.

### RELEASE-FLOW 5.1 at the final S

The orchestrator's dry run from the main checkout, 14:37:31Z → 14:38:00Z, `EXIT 0`. I read its log (`dry-run-finalS3.out`, 2083 lines) for these lines:

```text
release-publish: dry-run of @3fn/core@16.1.0 at 503fbfb84cfa48dee2929363e25493546b9a56d1 (fresh clone of https://github.com/3fn/DesignerPunk.git)
✓ No package name drift detected (1540 files scanned)
Closure 1: 54 files checked, 0 escaping references
Closure 2: 54 seed files, 16 closure files, 0 bare specifiers
105/105 assertions passed.
sha1:       d63b8af4321dcf0ea90f6215410d9848c1842f76
files:      1694   bytes: 6589802   pack-assert: 105/105   publish path: 16 (floor 16)
```

- **105 `PASS` lines, 0 `FAIL`.** 16 of them are `PASS: publish path:`, and all three MCP bundles read `nested roots []`. With the temp-dir name masked, the 105 lines equal the prior S's line for line.
- **The log against the prior S's log**, timestamps and temp-dir names masked: they differ only in the commit line, two esbuild timings, the `npm notice` sizes of `CHANGELOG.md` (71.1kB → 71.3kB) and `governance/platform-implementation-guidelines.md` (30.4kB → 30.6kB), and the shasum/integrity lines.
- **`release-publish-record.json`**: `mode` `dry-run`, `commit` = the final S, `sha1` `d63b8af4…`, `fileCount` 1694, `bytes` 6589802, `checks` 105/105, `publishedTo` `[]`, `createdAt` 2026-10-26T14:37:56.784Z.
- **The tarball**: I copied it and the record from the run's `out/` directory (still present at 14:39Z), re-hashed the tarball (sha1 equal), and extracted it.
- As before, 5.3 rebuilds at the tag, so the published sha1 will differ. 6b's comparand is the 5.3 record.

### The delta since the prior S `dddf46d4f`

**The packed delta** (the prior tarball `2c8e1907…` against the final `d63b8af4…`, both extracted):
- **The same 1694-path file set** (`comm -3` prints nothing).
- **5 files differ**:
  - three re-stamped timestamps, and nothing else: `dist/mcp/tool-manifest.json` (`generatedAt`), `dist/types/generated/TokenTypes.{d.ts,js}` (`Generated:`);
  - `CHANGELOG.md` (#503: L37 only);
  - `governance/platform-implementation-guidelines.md` (#502: L128–L130, L299–L300, L661–L662, L685, L710).
  - Both are byte-equal to their files at the final S (`git show 503fbfb84:<path> | cmp`).
- **Not packed**: `docs/releases/release-16.1.0.md`. The package has no `docs/releases/` path; its only `docs/` paths are `docs/consumer/{COMMIT-POLICY,INSTALL}.md`. The repo-local outputs #502 regenerated (`.claude/agents/data.md`, `canonical/_consumer-output/cc/.claude/agents/data.md`, `canonical/generated.lock`) are not packed either.
- **Byte-equal**: `package.json`; the token files (`dist/DesignTokens.{web.css,ios.swift,android.kt,dtcg.json}`, `dist/browser/tokens.css`, `dist/ComponentTokens.*`); `token-index/**`; `.kiro/steering/**`; `dist/consumer-canonical/**`.
- **What this means for my sample**:
  - **The L266 row's counts hold.** The token index is byte-equal, so its keys are 217/193/33, with 0 removed. The file set is unchanged, so against public 16.0.0 it is still 21 added and 2 removed.
  - **No sample claim group needs a re-verify.** Every group I read in bytes under `dist/`, `token-index/`, `src/components/**`, `.kiro/steering/` or `dist/consumer-canonical/` carries over. The two changed files are re-read below.
- **Signing acts in the delta**: `verify-signing-chain --audit --pr <N> --exclude-signer stacy` for #501, #502 and #503 reads `0 of 0 act(s)` each, exit 0. No path under `canonical/profiles/` or `canonical/operative-sets/` changed. RL-24's and RL-25's counts are unchanged: `Delegate audit (Stacy-signed, Ada): 0 / 135 — no file at S (not run)`; `Peter sample (Stacy-signed): 0 / 135`.
- **Grant reads**:
  - **#501** is record-only. It adds the fix-2 grant, and it closes and archives the fix-1 grant. The fix-1 change is append-only: an outcome line, then the move. **O-31 is resolved.**
  - **#503**: `git diff --numstat` lists `CHANGELOG.md` 1/1 and `docs/releases/release-16.1.0.md` 3/2. Both are in the fix-2 grant's list. The CHANGELOG hunk is L37 inside `[16.1.0]`. The notes hunks are L55, a new L59 and L67 (the grant's L66, moved down by the new bullet). `canonical/generated.lock` is not touched.
  - The fix-2 grant's acts on `release/16.1.0-fix-2` are `55533feb4`, `5300b4831` (14:27:19Z) and `962c7e919` (14:30:02Z), all after its activation at #501's merge (14:17:18Z). Its close (the outcome line) and archive move are in #503 itself, append-only.
  - No out-of-list edit.
  - **#502 rides no grant.** `governance/**` is outside Lina's charter write scope, and the PR is a Peter-merged CORRECTION by the file's content owner, as #500 was. Whether the edit-kinds law gives a content owner write access for a CORRECTION is not read here. I did not read it for #500 either.

### RL-27 at the final S: fixed

- **The whole packed artifact, `grep -rnI -- '--dp-'`: 0 hits in 0 files** (5 lines at the prior S). The `dp-` strings that remain are temp-dir prefixes (`dp-sync-keys-`, `dp-ts-`, and the like) and the consumer repo name `dp-portfolio`. None of them is a CSS name.
- **At S in git**: `git grep -- '--dp-'` over `governance`, `.kiro/steering`, `canonical`, `src` returns nothing. The one remaining hit in the repo is the frozen fixture (O-35), which is not a shipped path.
- **The five RL-27 lines, against the packed CSS** (`dist/DesignTokens.web.css`, `dist/browser/tokens.css`):
  - L128 `web: CSS Custom Properties (--<name>, no namespace prefix)`: **true**. `src/providers/WebFormatGenerator.ts` L116/L123 return `` `--${kebabName}` ``. 694 custom-property lines in `DesignTokens.web.css`, and every one is `--<lowercase>`.
  - L299–L300 `var(--motion-float-label-duration)`: **true** (`DesignTokens.web.css` and `browser/tokens.css` L902).
  - L661 `prefix: -- (plain; no namespace prefix)`: **true**, as L128.
  - L662 `example: var(--color-action-primary)`: **true** (L545, and L935 for the override set). `color.action.primary` is a key (`token-index/semantics.yaml` L268, web `--color-action-primary`).
- **The four extra sweep lines**, against the generators and the packed files:

| Line | At the final S | Generator | Packed file | True? |
|---|---|---|---|---|
| L129 | `ios: DesignTokens Swift struct (generated DesignTokens.ios.swift)` | `src/providers/iOSFormatGenerator.ts` L77 `'public struct DesignTokens {'` (also `iOSFileOrganizer.ts` L97) | `dist/DesignTokens.ios.swift` L9 `public struct DesignTokens {` | **true** |
| L130 | `android: DesignTokens Kotlin object (package com.designerpunk.tokens)` | `src/providers/AndroidFormatGenerator.ts` L63 `'package com.designerpunk.tokens'`, L65 `'object DesignTokens {'` | `dist/DesignTokens.android.kt` L7 `package com.designerpunk.tokens`, L9 `object DesignTokens {` | **true** |
| L685 | `method: DesignTokens Swift struct (generated DesignTokens.ios.swift)` | as L129 | as L129 | **true** |
| L710 | `method: DesignTokens Kotlin object (package com.designerpunk.tokens)` | as L130 | as L130 | **true** |

- "Package" was wrong for both, the old lines' error: the package ships no Swift package manifest (Integration Guide L164, as #502's ledger cites), and the Kotlin file's `package` is a namespace declaration, not a container. The new text names each container kind as generated.
- **#500's claim, re-read**: "Float Label examples name the emitted tokens" is now true for all three platform blocks (L299–L300 web, L310 iOS, L321 Android).
- **Row: RL-27 → fixed (#502).** The fix text is Lina's, not mine (RS-33).

### RL-28 at the final S: fixed; F-3's cost-bound met

**Packed `CHANGELOG.md` L37** (byte-equal to S) now reads: "A heuristic check of the other governance docs found 56 strings in 15 docs that are not keys: 36 wrong names that still ship in this release, and 20 example names not yet marked as examples (tracked: `.kiro/issues/2026-10-25-token-docs-unvetted-name-hits.md`)".

**The notes at S** (`docs/releases/release-16.1.0.md`, not packed):
- **L55**: "Three additions that belong to the record". It is followed by three bullets (L57, L58, L59), so it is true.
- **L59** (new) carries: Ada's predicate v1, run at `a95d6bf3d`; 56 strings in 15 governance docs, none in a steering doc; 36 wrong names that ship; 20 correct example names not yet marked; the 15 docs unchanged between `a95d6bf3d` and S; the guard ratified in #495 and not built yet; the CHANGELOG carrying the same count.

**L37 and L59, against the record and repo at S**:
- **The counts** equal Ada's section "Corrections and the vetted list (2026-10-26, Ada)": "56 failures in 15 docs", "36 corrections", "20 correct mentions". Her lists name 8 + 7 = **15 docs**, all under `governance/`. The ballot's scope includes the eight `.kiro/steering/*.md` files (`2026-10-26-governance-examples-guard.md` L45), so "none in a steering doc" holds.
- Her lists cite 31 lines for the 36 and 13 lines for the 20, so some lines hold more than one string. The string counts are hers; I did not re-run her predicate.
- **"The 15 docs did not change between `a95d6bf3d` and this release's S"**: `git diff --name-only a95d6bf3d 503fbfb84` is empty for each of the 15. **True.**
- **"The guard … is not built yet"**: `git grep` at S over `scripts`, `tools`, `src`, `.github` and `package.json` finds no `governance-examples` instrument. **True.**
- **"36 wrong names that still ship"**: the 15 docs are packed (`governance/**`) and unchanged. **True.**

**L67, against `git log --first-parent de63033b9..503fbfb84`** (F is an ancestor of S; 19 commits). I classed each by whether its diff touches a packed path, or source that builds into one:
- **Shipped-path PRs**: #488, #486, #489, #490, #491, (#494), #496, #499, #500, #502, #503.
- **Record-only PRs**: #480, #474, #487, #485, #492, #498, #495, #501.
- **L67 names #486, #488, #489, #490, #491, #496, #499, #500, #502 and #503**, and names #498 and #501 as record-only ("such as"). **It matches, with one omission: #494**, the release PR itself (version, CHANGELOG, README, the generated CSS header). L67 calls #494 "the release PR" ("diff line in the release PR"), so I read the omission as the sentence's frame, not a falsity (O-36).
- "No trio run saw these changes" stays true, because F precedes every one.
- **The Data charter clause** ("with the Data charter lines that embed them (#500 and #502)"): the packed `dist/consumer-canonical/agents/data.md` is byte-equal across the delta. The embedded guidelines text reaches a consumer's Data agent at `sync`, from the packed guidelines. So the clause is true in effect.

**F-3's cost-bound** (Peter's answer, ballot `2026-10-26-governance-examples-guard`: "the release notes carry the count"): **met**. The count is in notes L59, and in CHANGELOG L37 for the human reader. **O-32 is resolved by L67.**

**Row: RL-28 → fixed (#503).** The fix text is Thurgood's, not mine.

### The two 3a greps at the final S (RELEASE-FLOW Phase 1, as amended by #496)

The commands are verbatim from RELEASE-FLOW 3a at S, with `V=16.1.0`. I ran them at 14:45:27Z over `git archive 503fbfb84 .kiro/issues`, extracted to scratch, so these are S's bytes. Output cut at 140 characters:

```text
main at: 503fbfb84cfa48dee2929363e25493546b9a56d1
… 33 Trigger lines in 32 records …
due-rows exit 0
.kiro/issues/2026-06-25-component-schema-token-name-drift.md:11:**Class**: P0 false-claim · defect *(set 2026-10-20, Lina, rule 12. Accepte
P0 exit 0
```

- **Against the prior S** (34 lines in 33 records, compared sorted by path):
  - **In**: none.
  - **Out (1)**: `2026-10-26-release-16-1-fix-1-files-grant.md`, closed and archived by #501.
  - **Never at the root at either S**: the fix-2 grant, which #501 added and #503 archived.
  - **P0**: identical, 1 line in 1 record (row 1, fixed by #452).
- **By token**: 2 records carry `release:16.1.0:phase-1` (the walk record and the 16.1.0 files grant, whose `docs/releases/16.1.0/**` path stays open for step 6). 30 carry `release:next:phase-1`, the same 30 as at the prior S.
- **What lapses at the final S, recounted from ancestors of the final S**: the same as at the prior S. The delta's only `.kiro/issues/` changes are the two grant closes and moves. No `release:next` record was closed, re-ruled or added in the delta.
  - **No lapse: 6. Lapse: 24** (P1 3, P2 `(guard)` 8, P2 `(record)` 13). **Escalations: 9.** 6 + 24 = 30.
  - **My erratum carries**: 8 of the 24 were filed after the walk merged (`264c25661`, #469), and none of the 8 is rowed. The lapse totals do not change.
  - Mine (Start Up Tasks item 9): unchanged. Three lapses, reported; the `## Lapse` headings are not appended in this record-only PR.
- **Lina's upkeep record** `2026-10-26-guidelines-platform-token-names-radius-input-motion-floatlabel.md` (trigger `merge:#500`) is still not an ancestor of S. `origin/chore/post-16.1.0-record-upkeep` is at `7678b314e`, and `git merge-base --is-ancestor` fails. My greps cannot reach it, and it cannot fire here. The Android Float/Dp record on the same branch stays waived to Spec 129 by Peter.

### The governance-edit-kind read, #499–#503 (an erratum: my first addendum did not run it for #499 or #500)

The PR bodies are read from GitHub's public API, never from the squash message:
- **#499**: "**Edit kind**: none. No governance path is in the diff." True: `CHANGELOG.md` and the notes are not governance paths.
- **#500** (`governance/platform-implementation-guidelines.md` L137–L138, L145–L147, L154–L156, L310, L321): CORRECTION, citing `.kiro/issues/2026-10-26-guidelines-platform-token-names-radius-input-motion-floatlabel.md`. **That record does not resolve at the merge**: `git cat-file -e dddf46d4f:<path>` fails, because it is on the unmerged upkeep branch.
- **#502** (`governance/platform-implementation-guidelines.md`): CORRECTION, citing the same record @ `7678b314e` and RL-27 in this file @ `3713247be`. **Neither resolves at the merge `f1433b5bd`**: one is on the upkeep branch, the other on #497's branch.
  - Both truth referents resolve: the three `dist/DesignTokens.*` files as generated, and `src/providers/{Web,iOS,Android}FormatGenerator.ts`.
  - The three regeneration lines (`.claude/agents/data.md`, `canonical/_consumer-output/…`, `canonical/generated.lock`) are not governance paths; they are given for the record.
- **#501 and #503** touch no governance path. Their lines are given for the record.
- **The rot-mode count**: **2** CORRECTION lines (#500, #502) whose observation record does not resolve at the merge. There are no LAW hunks, so nothing goes to Peter from this read. → **RL-30** below.
- **Consult lines**: #500 and #502 (the trigger-surface PRs) both carry `**Consulted**:`. #501 and #503 carry one as well.

### #502's open items for Ada, and its fixture observation

Lina's #502 body lists three items as "Open for Ada (not guessed, not blocking; routed after the tag)", and one observation. My read of each:

**(1) The access rule at L686 and L711.** The lines read `access: DesignTokens.<iOS identifier from the token index>` and `access: DesignTokens.<Android identifier from the token index>`, with examples `DesignTokens.spaceInset100` / `DesignTokens.space_inset_100` (both true; Swift and Kotlin L563). They came from #472 (floor row 3), replacing `DesignTokens.category.subcategory`, which was false for every token.
- **I ran the rule over every primitive and semantic entry** (a scratch script over packed `token-index/*.yaml` and `dist/DesignTokens.{ios.swift,android.kt}`): it **holds for 379 of 410 on iOS and 380 of 410 on Android** (primitives 213/217 on both; semantics 166/193 iOS, 167/193 Android).
- **The iOS exceptions (31)**:
  - 4 shadow-colour primitives that no platform emits (`2026-10-24-shadow-color-primitives-emitted-on-no-platform.md`, P1; CHANGELOG L58);
  - 14 semantic colours that native output does not emit (CHANGELOG "Known limitations" L229; `docs/consumer/INSTALL.md` L157 and Integration Guide L171, both served; `2026-10-03-native-generator-findings-for-spec-129-intake.md`). Nine of them carry `theme.` names in the index, which the rule turns into `DesignTokens.theme.…`;
  - 6 motion composites, emitted as nested `public struct MotionFloatLabel {…}` and the like. The index's `motionFloatLabel` resolves only as a top-level `public let` in the hand-kept `src/tokens/platforms/ios/MotionTokens.swift` L146;
  - 7 `elevation.*` entries: iOS emits z-index, and the index gives iOS names for an Android family.
- **The Android exceptions (30)**: the same 4 and 14; 6 motion composites, where the index's `motion_float_label` resolves in no packed `.kt` file (the hand-kept `MotionTokens.kt` L220 uses `motionFloatLabel`); and 6 `zIndex.*` entries (Android emits elevation).
- **The 33 component tokens** carry their own container in the index (`ProgressTokens.connectorThickness`, `public enum ProgressTokens` in `dist/ComponentTokens.ios.swift` L75). The `DesignTokens.` prefix is wrong for them, and the index name alone is the access path.
- Also known: the iOS colour and z-index members are not `public` (`2026-10-24-ios-token-declarations-not-public.md`, P3). This fails only across a module boundary.

**My ruling: a rule with unlisted exceptions, not a false sentence under the floor.**
- The sentence is a schema whose output is true wherever the index row is true and the member is emitted, which is 92–93% of the entries. Each exception traces to an index row or a native-emission gap, not to the rule.
- Every exception is native-only. The owners' standing reading for native-name defects is that "native ships as reference source, so no reader is misled about it building, which keeps this out of P0" (Lina, `2026-10-25-native-reads-of-names-the-theme-does-not-hold.md`; Ada, the same frame in the 10-03 record). I do not dispute that reading for these lines.
- The largest exception (the 14 colours) is disclosed in two served docs, though not where L686 sits.
- **What survives**: an agent that applies L711 to `motion.floatLabel` writes `DesignTokens.motion_float_label`, which nothing defines. That is the shape of RL-27. The difference is that RL-27's lines were false for every reader, while this rule is false only where the index row or the emitter is.
- **Route**: **Lina** (the exception clause, or a narrowed rule; her text, not mine) and **Ada** (the exception list's facts). → O-33.

**(2) The index's web name `--motion-float-label` is not emitted.** True. Packed CSS has `--motion-float-label-duration` and `--motion-float-label-easing` (L902–L903), and no `--motion-float-label`. **This is one instance of RL-29**, which is a web falsity, outside the reference-source frame.

**(3) `accessibilityFocusColor` is not `public`.** This is O-29, unchanged: known and classed P3 at S (`2026-10-24-ios-token-declarations-not-public.md`, Ada). It is not floor-class, and it carries.

**The fixture observation**: `tests/onboarding-trio/fixtures/born-cc/.claude/agents/data.md` at S still carries `--dp-` and `radius.input` (L400, L409–L410, L417, L428). It was last changed in #362 (2026-10-15).
- The package has no `tests/` path, so it is **not shipped**, and it is not a floor row.
- It is a frozen born-repo snapshot. Whether a fixture should keep the text as it was born or follow the source is the harness owner's call. → O-35.

### RL-29: Low (tag-relevant if Peter reads it floor-class) — the token index's web names for composite and elevation tokens name CSS properties no packed file defines; one served doc copies one

- **Promised** (M7, RELEASE-FLOW 3a): "served docs, MCP contracts and agent charters are fixed, not disclosed". Floor row 3 (#472): "Served docs and charters name token-index keys".
- **Claimed**: `get_token_details` returns `platforms.web` as the token's web name, with no caveat. I read it for `motion.floatLabel` (`"web": "--motion-float-label"`) and `elevation.container` (`"web": "--elevation-container"`) from this session's Application MCP; the rows equal packed `token-index/semantics.yaml`.
- **Shipped** (the packed artifact at the final S):
  - **37 of 193 semantic web names in the index are defined in no packed CSS** (`dist/DesignTokens.web.css`, `dist/ComponentTokens.web.css`, `dist/browser/*.css`; 720 distinct custom properties):
    - **24 typography composites** and **6 motion composites**: the emitter writes per-property names (`--typography-body-sm-font-size`, `--motion-float-label-duration`), never the stem;
    - **7 `elevation.*`**: web emits `--z-index-*`, and `--elevation-container` is defined nowhere.
  - The 4 shadow-colour primitives are the fifth case. They are known and classed (P1, CHANGELOG L58), so I leave them out of this finding.
  - **One served doc copies a stem**: `governance/Component-Development-Guide.md` L609, `font: var(--typography-button-md);`. I searched packed `governance/` and `.kiro/steering/` for every `var(--typography-…|--motion-…|--elevation-…)` that does not end in a property suffix, and L609 is the only hit.
  - **L609 sits in the fenced CSS block (L602–L613) that #472 corrected** (L606–L607: `--space-inset-050`, `--space-inset-100`, `--color-action-primary`). Against row 3's own truth, the index, L609 is right: `--typography-button-md` is the index's web name for the key. Against the CSS, it renders nothing.
  - Served docs elsewhere teach the right form (`browser-distribution-guide.md` L307; `Web-Authoring-Standards.md` L76, L78, L138; `Token-Family-Motion.md` L176).
- **Age**: the index rows for `motion.floatLabel`, `elevation.container` and `zIndex.container` are identical at `v16.0.0`, and CDG had the same line at L602 there. **Pre-existing**, not introduced by this release.
- **Known?**:
  - No record at S holds the index part (searched `.kiro/issues/**` for composite, platform-name and the stems). The archived `2026-09-26-container-base-phantom-css-vars.md` item 4 notes that composites "expand into sub-properties … that are not single index entries", which is the mechanism, recorded as a guard limit, not as a defect.
  - My first addendum's O-30 saw the Android motion name and the web stem's mechanism, and did not offer it as a floor row. **Erratum to O-30**: "I did not trace what it serves for this key" is now traced (above). I should have read the web side against the floor then.
  - Lina's #502 body reads (2) as "not blocking; routed after the tag".
- **Reading**:
  - The truth chain for token names ends at `token-index/`. Row 3's sweep, the guard ratified in #495 and Lina's whole-file sweep all take the index as truth, so L609 passes all three. The false link is the index's web name for these 37 entries.
  - At the web reader, an agent calling `get_token_details` or reading CDG, it is a name that resolves to nothing. **Web CSS is a build input, so the reference-source frame that keeps native-name defects out of P0 does not reach it.** I read it as **P0-shaped**.
  - Harm: low. A `font:` or `transition:` that names an undefined property drops silently, which is worse than a native compile error, because nothing reports it.
  - **By 3a's letter it is not "known"**: it is not a walk row, and no record holds it.
- **Route**: **Ada** (the index's platform names; file the record and class it, rule 12; the owner classes, Stacy's P0 reading is offered and is not an upgrade); **Lina** (CDG L609, content owner); **Peter** (the fork). → RS-42.

### The fork (RL-29), surfaced and not picked: Peter's

- **(a) Fix before the tag.**
  - Only CDG L609 is a minutes fix: Lina's CORRECTION, with truth the packed CSS's per-property names.
  - The index rows need a change to Ada's index generator, or to what `platforms.web` means for a composite. That is not a pre-tag edit, so under (a) the index part still needs (b) or (c).
  - (a) means a fourth S, 5.1 again, and a third addendum.
- **(b) Tag the final S with his own-words waiver for 16.1.0.** Ada files the index record (trigger `release:next:phase-1`, or into Spec 129, which owns generation completeness), and Lina fixes L609 in her post-tag CORRECTION.
- **(c) Rule it not floor-class.** For example, `platforms.web` for a composite could be read as a stem by design. That needs his words, and the tool's description would then be the gap to close.
- **Already answered?** I checked his dated words for a ruling that covers this case.
  - "Fix it now, and do the whole-file sweep" ruled RL-27/RL-28 and the guidelines file.
  - F-3 ruled the guard's true-positive entries. L609 would not be one, because the guard resolves it against the index.
  - "resolve the radius names issue now" ruled the radius pair.
  - None of them covers the index or CDG L609, so I put the fork.
- **Open for Peter**: RL-29's fork, (a) / (b) / (c). The tag waits for his answer, not for a fix.

### RL-30: Low (record form, counted) — two CORRECTIONs cite an observation record that does not resolve at their merge

- **Promised** (ballot `2026-10-18-governance-edit-kinds`, as my charter's edit-kind read restates it): a CORRECTION hunk's observation record resolves at the merge.
- **Shipped**: #500 (`dddf46d4f`) and #502 (`f1433b5bd`) cite Lina's `2026-10-26-guidelines-platform-token-names-radius-input-motion-floatlabel.md`, which is on the unmerged upkeep branch. #502 also cites RL-27 in this record, which is on #497's unmerged branch. Neither resolves at either merge.
- **Reading**: the observations are real, and both are reachable by SHA on `origin`. The record form is wrong: a merge on `main` cites what `main` does not hold. When the upkeep branch lands, the citation will resolve on `main`, but never at those merges. The count stands.
- **Route**: **Lina** (the authoring agent: land the upkeep branch, or file observation records on `main` before their CORRECTION); the class question is RS-43.

### Observations (not findings)

- **O-31 — resolved** (#501: fix-1 grant closed, with the outcome line, and archived). The fix-2 grant closed and archived in its own fixing PR (#503), so the pattern did not repeat.
- **O-32 — resolved** (notes L67, above).
- **O-33 — the L686/L711 exception list**, ruled above (rule with unlisted exceptions). → Lina, Ada.
- **O-34 — `token-index/` `themeVarying` reads `false` for five of the 14 colours that native output omits** (`color.feedback.info.{text,background,border}`, `color.action.primary`, `color.contrast.onAction`). Their index iOS/Android names carry no `theme.` prefix, and no native file defines them. It is known: `2026-10-03-native-generator-findings-for-spec-129-intake.md` L59–L60 ("a token overridden only by WCAG is marked `themeVarying: false` … but it is absent from native output"), P2 `(record)`, Ada, trigger Spec 129's claims pass. Not a floor row on the owner's reading (native reference source), which I do not dispute.
- **O-35 — the born-cc fixture's old names** (above). → **Thurgood** (the onboarding-trio harness), with Lina for the text.
- **O-36 — notes L67 does not name #494** among the post-F PRs that changed shipped paths. #494 is the release PR, and L67 points at it as the diff line's home, so I do not read it as false. If Thurgood wants the list exhaustive, the step-6 record is the place.
- **O-37 — #502's write authority, not read** (above, under the grant reads).

### Standards implications (this addendum)

For Thurgood, read in full.
- **RS-42 (RL-29)**: the truth referent for token names, in row 3's sweep, the #495 guard's predicate and two CORRECTIONs today, is `token-index/`. The index's platform names are not checked against the emitted files, so a wrong index name passes every check downstream of it.
  - The class question: does a platform name in the index need a resolve-check against the generated output? The archived item 4 above says a family-wide guard needs "the generated CSS … or a composite-expansion map".
  - **Owner**: Ada (the index and the guard's predicate scope), with Thurgood (the standard: what counts as truth for a name).
- **RS-43 (RL-30)**: the edit-kind rule needs a CORRECTION's observation record to resolve at the merge. Today's pattern (an observation filed on a long-lived upkeep branch, then cited by a CORRECTION that merges first) defeats it every time. Should an observation record land first, or travel in the CORRECTION PR? **Owner**: Thurgood.
- **RS-40, evidenced and answered for this instance**: Peter's "do the whole-file sweep" is the per-file answer. #502 found four more wrong lines that a ruled-list fix would have left. The standard is still unwritten.
- **RS-41, evidenced**: RL-28 is the case. The cited record moved before the tag, and only this pass re-read it.

**Standards implications: list — RS-42 and RS-43 (new); RS-40 and RS-41 evidenced.**

### Method (this addendum)

**Run by me** (worktree at `3713247be`, branch `chore/release-16.1.0-claims-pass-phase-1`; `git status --porcelain` empty before, and only this file after):
- `git fetch origin`; `git log --first-parent`, `git show`, `git diff` and `git blame` over `dddf46d4f..503fbfb84`, `de63033b9..503fbfb84` and `v16.0.0..503fbfb84`; `git merge-base --is-ancestor`; `git cat-file -e` at the merges; `git fetch origin chore/post-16.1.0-record-upkeep` and `pull/503/head` (`FETCH_HEAD` writes only; no ref or branch written);
- the public GitHub API, unauthenticated, for #497, #499–#503 (merge facts and bodies); `git ls-remote --tags origin`; the npm packument;
- both 3a greps over `git archive 503fbfb84 .kiro/issues`;
- the copy, re-hash and extraction of the final tarball; `comm` and `diff -rq` against the prior tarball; `cmp` of packed files against `git show 503fbfb84:<path>`; the `--dp-` grep and the composite-name greps over the packed bytes;
- two scratch scripts (`python3 -I`, outside the extracted tree): the L686/L711 rule over every index entry, and the index-web-name-vs-packed-CSS set difference;
- `get_token_details` for `motion.floatLabel` and `elevation.container` (this session's Application MCP);
- `verify-signing-chain --audit --exclude-signer stacy` for #501, #502 and #503 (three `FETCH_HEAD` writes).

**Read, not re-run**: the 5.1 dry run (the orchestrator's); Ada's predicate counts (56/36/20).

**Not run**:
- any compile (every iOS and Android read is of names and declared kinds: `not re-verified — toolchain unavailable`);
- the root suite and the MCP suites;
- `owed-set.sh` (the delta touches no `.kiro/specs/` path);
- `gh` (this session holds no credentials, and I read none);
- `verify-gate-registration.sh`.

### Forced negative (this addendum)

- **One packed text class is P0-shaped by my reading at its reader**: RL-29, the 37 index web names and CDG L609. It is not a walk row, and it is Peter's.
- **No ✅ here rests on a compile.** The L129/L130/L685/L710 rows are reads of generator source and emitted declarations.
- **Not re-derived**: Ada's 56/36/20 counts, beyond the doc count and the unchanged-docs claim.
- No other claim group in my sample moved between the two S's.

### Surviving counter-argument

My verdict holds the tag a fourth time today, for a finding I rate Low, which is pre-existing since at least 16.0.0 and which the release did not introduce.

**What survives**:
- By 3a's letter, "knows" means the rows of the walk record, and RL-29 is not one. The content owner who raised the index half (Lina, in #502) read it as not blocking.
- Spec 129 already owns native generation completeness, and the index's platform names are the same class of work. A reader can say this belongs to the next release's walk, not to this tag.
- I cannot rule that reading out. I hold the fork in front of the tag for two reasons. The served-doc half (CDG L609) is the RL-27 shape in a block this release corrected. And the floor gives the waiver to Peter, not to me.
- If his standing answer for pre-existing finds outside the delta is (b), this record has spent his attention a fourth time on a Low item. The class option is RS-42: check the index's names against the output once, so these finds stop arriving one at a time.

---

## Phase 1 addendum 3 — final S `4abfbe6de35f7883912eb45df25642d3aba66a7d` (#504), 2026-10-26

**Written**: 2026-10-26. Reads taken 15:31:12Z → 15:43:23Z; this section appended at 15:45:39Z (each from `date -u` when taken).
**Final S**: `4abfbe6de35f7883912eb45df25642d3aba66a7d`, the squash of **PR #504** (Lina's whole-file CORRECTION sweep of `governance/Component-Development-Guide.md`; head `9dcea269c`, branch `fix/cdg-platform-token-names-sweep`), merged by `3fn` at **2026-10-26T15:29:57Z**. It is the only first-parent commit in `503fbfb84..4abfbe6de`. Its two commits: `fb8d23de9` (the sweep, 15:18:20Z) and `9dcea269c` (Ada's caveat sentence, 15:23:21Z). Merge facts, heads and merger are from GitHub's public API, read by me.
**Peter's answer, and its bound**: chat, relayed by the orchestrator, received before 2026-10-26T15:05:45Z (the orchestrator's clock), verbatim: his amendment *"Fix the guide section now, waive the index with a plan"*, then *"Go with the whole-file sweep and the dated plan"*. It is recorded on #497's body as an `**Answered (RL-29 fork)**:` line (read by me from the public API; #497 open, head `8665395fd`). Both commits and the merge are after the bound, so nothing outran the question (RL-23 does not repeat).
**Firing event**: RELEASE phase 1 on the new S, owed by Peter's answer (a fourth S, 5.1 again, a third addendum).
**State at this writing** (15:38:31Z): no `v16.1.0` tag on `origin`. `registry.npmjs.org/@3fn%2fcore`: `dist-tags.latest` = `16.0.0`, and no `16.1.0` key in `versions` or `time`. `origin/main` is the final S. **Nothing is tagged or published.**
**Append-only**: every section above stays as written. Where this addendum corrects one, it says so.

> **No pass, at any grain, is ever a required check, a review gate, or a blocking condition on any PR.** This addendum gates neither the tag nor the publish. Where a finding meets the release floor, it names the fork for Peter and does not pick it.

### For the tag (read this first)

- **RL-29 holds nothing now.** The doc half is fixed in the packed bytes: L609 is five longhands, each defined in the packed CSS, and no served doc or steering doc names a composite stem. The index half is waived for 16.1.0 by Peter's words, in Ada's P0 record with a dated plan, which merges after the tag by design.
- **The caveat sentence makes the native theme lines true about generation.** Every fact it states checks against S. One clause in it is false at S for one token (RL-34), and two Icon blocks carry `theme.` names with no pointer to it. Both are native-only, so not floor-class on the owners' standing reading, which I do not dispute.
- **One new reading, RL-31, is Peter's.** The same file still teaches two web examples that are false at the web reader, and the token-name sweep did not reach either:
  - L1519–L1520, presented as "Button-CTA CSS": two custom properties that reference themselves (`--color-action-primary: var(--color-action-primary);`). By the CSS cycle rule they compute to nothing, so the example's colour and transition drop without an error. It sits in a block #472 corrected.
  - L704, L787, L792, L897, L908, L909: `iconSize100` / `iconSize075` used as TypeScript names that nothing defines, and an import path that does not exist. These fail loudly.
  - Both are pre-existing at `v16.0.0`. Neither is a walk row, and no record at S holds either. #504's body names both, as an observation and as an open item for Ada.
- **Two notes items hold step 7 (the GitHub release), not the tag.** The release notes are not packed, and step 7 reads them from `main`.
  - RL-32: notes L67's list of post-F shipped-path PRs omits #504.
  - RL-33, an erratum to my addendum 2: the notes carry F-3's count for the token-name half only.
- **My verdict line for the tag at the final S `4abfbe6de`: it should wait for Peter's answer on RL-31, not for a fix. Nothing else holds it.** By 3a's letter RL-31 does not hold it, because it is not a walk row. I hold it on the precedent of RL-27 and RL-29, which Peter answered "fix it now" both times. The counter-argument below says what that costs, including a miss of mine.
- **Open for Peter**: RL-31's fork, (a) / (b) / (c), below. This line belongs in #497's body as an `**Open for Peter**:` line.

### RELEASE-FLOW 5.1 at the final S

The orchestrator's dry run from the main checkout, 15:30:40Z → 15:31:09Z, `EXIT=0`. I read its log (`dry-run-finalS4.out`, 2083 lines) only after its last lines showed `EXIT=0` and the second `UTC 2026` timestamp:

```text
release-publish: dry-run of @3fn/core@16.1.0 at 4abfbe6de35f7883912eb45df25642d3aba66a7d (fresh clone of https://github.com/3fn/DesignerPunk.git)
✓ No package name drift detected (1540 files scanned)
Closure 1: 54 files checked, 0 escaping references
Closure 2: 54 seed files, 16 closure files, 0 bare specifiers
105/105 assertions passed.
sha1:       378013557d2860dbb8fd8008ed116bfa048173a4
files:      1694   bytes: 6590246   pack-assert: 105/105   publish path: 16 (floor 16)
```

- **105 `PASS` lines, 0 `FAIL`.** 16 of them are `PASS: publish path:`, and all three MCP bundles read `nested roots []`.
- **The log against the prior S's log**, with timestamps, temp-dir names and millisecond timings masked: they differ only in the commit line, the `npm notice` size of `governance/Component-Development-Guide.md` (77.3kB → 78.4kB), and the shasum, integrity, sha1 and bytes lines.
- **`release-publish-record.json`**: `mode` `dry-run`, `commit` = the final S, `sha1` `37801355…`, `fileCount` 1694, `bytes` 6590246, `checks` 105/105, `publishedTo` `[]`, `createdAt` 2026-10-26T15:31:06.100Z.
- **The tarball**: I copied it and the record from the run's `out/` directory (present at 15:31:59Z), re-hashed the tarball (sha1 equal) and extracted it.
- As before, 5.3 rebuilds at the tag, so the published sha1 will differ. 6b's comparand is the 5.3 record.

### The delta since the prior S `503fbfb84`

**In git**: `git diff --numstat 503fbfb84 4abfbe6de` lists `governance/Component-Development-Guide.md` 36/28 and `canonical/generated.lock` 1/1. The lock change is `inputClosure` only; `outputs` stays `78ead3ba…`, so no agent output changed. `canonical/` is not packed (0 paths in the file list).

**The packed delta** (the prior tarball `d63b8af4…` against the final `37801355…`, both extracted):
- **The same 1694-path file set** (`comm -3` prints nothing).
- **4 files differ**:
  - three re-stamped timestamps, and nothing else: `dist/mcp/tool-manifest.json` (`generatedAt`), `dist/types/generated/TokenTypes.{d.ts,js}` (`Generated:`);
  - `governance/Component-Development-Guide.md`, byte-equal to its file at the final S (`git show 4abfbe6de:<path> | cmp`).
- **Byte-equal**: `CHANGELOG.md` (equal to S as well), `package.json`, `governance/platform-implementation-guidelines.md`, the token files (`dist/DesignTokens.*`, `dist/browser/tokens.css`, `dist/ComponentTokens.*`), `token-index/**`, `.kiro/steering/**`, `dist/consumer-canonical/**`.
- **What this means for my sample**:
  - **The L266 row's counts hold.** The token index is byte-equal, so its keys are 217/193/33, with 0 removed. The file set is unchanged, so against public 16.0.0 it is still 21 added and 2 removed.
  - **No sample claim group needs a re-verify** beyond the one changed file, which is read below.
- **Signing acts in the delta**: `verify-signing-chain --audit --pr 504 --exclude-signer stacy` reads `0 of 0 act(s) selected; 0 withheld`, counts all 0, exit 0 (`refs/pull/504/head` = `9dcea269`). No path under `canonical/profiles/` or `canonical/operative-sets/` changed. RL-24's and RL-25's counts are unchanged: `Delegate audit (Stacy-signed, Ada): 0 / 135 — no file at S (not run)`; `Peter sample (Stacy-signed): 0 / 135`.
- **Grant reads**: #504 rides no grant. As with #500 and #502, it is a Peter-merged CORRECTION by the file's content owner, and its write authority is not read here (O-37 carries).

### RL-29 at the final S: the doc half fixed, the index half waived

**The doc half, against the packed output.** #504's ledger, line by line. I read each new line in the packed CDG and resolved it in the packed files:

| Ledger line(s) | New text (packed CDG line) | Packed truth | True? |
|---|---|---|---|
| L609 | five longhands `var(--typography-button-md-<property>)` (L609–L613) | `dist/DesignTokens.web.css` L650–L654 (`-font-size` L650, `-line-height` L651, `-font-family` L652, `-font-weight` L653, `-letter-spacing` L654); `--typography-button-md` is defined nowhere | **true** |
| L620, L623, L624, L626 (iOS) | `DesignTokens.typographyButtonMd`, `.spaceInset100`, `.spaceInset050`, `.radius100` | `dist/DesignTokens.ios.swift` L469, L563, L569, L271, all `public static let` in `public struct DesignTokens` (L9) | **true** |
| L635, L639 (Android) | `DesignTokens.space_inset_100`, `.space_inset_050`, `.typography_button_md` | `dist/DesignTokens.android.kt` L563, L569, L469 in `object DesignTokens` (L9); `space_100 = 8.dp` (L371) and `space_050 = 4.dp` (L367), so the dropped `.dp` is right | **true** |
| L717, L812, L816, L882, L912, L801, L804 | `DesignTokens.iconSize075` / `.iconSize100` | `ios.swift` L519 (20), L520 (24) | **true** |
| L833, L838, L849, L856 | `DesignTokens.icon_size_100` / `.icon_size_075` | `android.kt` L520 (`24.dp`), L519 (`20.dp`) | **true** |
| L763 | `color="color-feedback-success-text"` | packed `IconBase.web.js` L191 and L432 build `var(--${color})`; `--color-feedback-success-text` is `web.css` L523; `--color-success` is defined nowhere | **true** |
| L975 | `val space_inset_100 = 8.dp` | `android.kt` L563 (the name; the value is `space_100` = `8.dp`) | **true** (name) |
| L1464, L1488 | `--_bi-pressed-bg` | packed `ButtonIcon.web.js` and the browser bundles; `--_bi-icon-color` has 0 hits in the package | **true** |

- **A script over the whole packed CDG** (`python3 -I`, outside the extracted tree): every `var(--…)` and every `DesignTokens.<name>` in the file, 46 in all, resolves against the packed CSS (all `dist/**/*.css`, plus the custom properties the packed component JS declares) and the two native token files. 0 fail.
- **Composite stems in served docs**: `var(--typography-…|--motion-…|--elevation-…)` over packed `governance/` and `.kiro/steering/` gives 17 uses, and every one ends in a property suffix. **0 stems** (1 at the prior S, L609).

**The six `theme.` names and the caveat.** The new `theme.` lines are L626 and L646 (`color.text.default`), L630 (`color.action.primary`), L811 and L845 (`color.feedback.success.text`), and L1018 (`theme.color_action_primary`); L1008 is unchanged. Ada's sentence (L999) reads: "The build does not yet emit the native theme surface: `generate` writes no `{Name}Theme` protocol or data class, environment key or `CompositionLocal`, and leaves the theme-varying colors out of `DesignTokens`, so on iOS and Android the `theme.` names below match the token index and the components but no generated file (…)". Each claim, at S:
- **No protocol, data class, environment key or `CompositionLocal`**: true. None in the four packed native token files (`dist/{DesignTokens,ComponentTokens}.{ios.swift,android.kt}`); `src/generators/TokenFileGenerator.ts` L1025 "Not yet called by the build"; `generateThemeOverrideBlocks` (L1028) has no caller in `src` outside its definition (`git grep` at S; the other hits are records and docs).
- **The theme-varying colours are out of `DesignTokens`**: true. The nine `themeVarying: true` colours in packed `token-index/semantics.yaml` are 0 of 9 in `ios.swift` and 0 of 9 in `android.kt`. `colorActionPrimary` is also absent (only `colorActionPrimary_wcag`, L687; Android L685).
- **"Match the components"**: true for all four names (`theme.colorTextDefault` in 10 packed native component files, `theme.colorActionPrimary` in 6, and so on).
- **"Match the token index"**: true for `color.text.default` (index L360/L361) and `color.feedback.success.text` (L9/L10). **False for `color.action.primary`**: the packed index gives the bare `colorActionPrimary` / `color_action_primary` (L275–L276). That covers both names the caveat's own section shows (L1008, L1018), and L630. → **RL-34**.

**My answer on the caveat: it makes the section true about generation at S.** A reader of § "Token Consumption by Platform (Spec 094)" now meets the disclosure before the native blocks. The ButtonCTA blocks reach it through the pointer lines L622 and L637. What it does not make true:
- the index clause for `color.action.primary`, which becomes true when Ada's plan item 5 lands;
- L811 and L845, in § "Platform-Specific Icon Usage", which carry `theme.` names with no pointer line. The caveat is 190 lines later, in another section.

Both are native-only. The owners' standing reading for native-name defects (native ships as reference source, so no reader is misled about it building) keeps them out of P0, as I read it for L686/L711 in addendum 2.

**Row: RL-29, doc half → fixed (#504).** The fix text is Lina's, and the caveat is Ada's, not mine.

**The index half → waived for 16.1.0** by Peter's words above. The record is Ada's `.kiro/issues/2026-10-26-token-index-platform-names-not-emitted.md`. I read it on `origin/chore/post-16.1.0-record-upkeep` at `ef911555d` (filed in `ec4fb3103`; plan item 5 appended in `ef911555d`).
- **Class**: P0 false-claim · defect, set by Ada.
- **Trigger**: `release:next:phase-1`, with a lapse condition. If items 1 and 2 are not an ancestor of the next release's S, the record lapses there and goes to Peter (rule 11).
- **The waiver section** quotes both of Peter's sentences with the bound above, and scopes the waiver to 16.1.0 only.
- **The dated plan**, each item due by the next release's walk:
  1. the index generator fix (Ada);
  2. a Jest check that every index platform name is defined in the generated output (Ada);
  3. a served-docs name scan (Thurgood's to take or decline; not owed by the record);
  4. `get_token_details` (Ada; true once item 1 lands);
  5. the native `theme.` names for the five WCAG-only colours (Ada; the RL-34 clause).
- **Not an ancestor of S**: `git merge-base --is-ancestor ef911555d 4abfbe6de` fails, and `git cat-file -e 4abfbe6de:<path>` fails. My greps cannot reach it, and it is not read at this walk, by design.

### The two 3a greps at the final S (RELEASE-FLOW Phase 1, as amended by #496)

The commands are verbatim from RELEASE-FLOW 3a at S, with `V=16.1.0`. I ran them at 15:37:45Z over `git archive 4abfbe6de .kiro/issues`, extracted to scratch, so these are S's bytes. Output cut at 140 characters:

```text
main at: 4abfbe6de35f7883912eb45df25642d3aba66a7d
… 33 Trigger lines in 32 records …
due-rows exit 0
.kiro/issues/2026-06-25-component-schema-token-name-drift.md:11:**Class**: P0 false-claim · defect *(set 2026-10-20, Lina, rule 12. Accepte
P0 exit 0
```

- **Against the prior S**: identical. The delta touches no `.kiro/issues/` path (`git diff --stat 503fbfb84 4abfbe6de -- .kiro/issues` is empty).
  - 33 lines in 32 records.
  - P0: 1 line in 1 record (row 1, fixed by #452).
  - By token: 2 records carry `release:16.1.0:phase-1` (the walk record and the 16.1.0 files grant), and 30 carry `release:next:phase-1`, one of them on two lines.
- **What lapses at the final S**: unchanged. **No lapse: 6. Lapse: 24** (P1 3, P2 `(guard)` 8, P2 `(record)` 13). **Escalations: 9.**
  - **My erratum carries**: 8 of the 24 were filed after the walk merged (`264c25661`, #469), and none of the 8 is rowed.
  - Mine (Start Up Tasks item 9): three lapses, reported; the `## Lapse` headings are not appended in this record-only PR.
- **Not ancestors of S**, so not reachable by these greps:
  - Lina's `2026-10-26-guidelines-platform-token-names-radius-input-motion-floatlabel.md`;
  - Ada's index record (above);
  - the rest of `origin/chore/post-16.1.0-record-upkeep` (`ef911555d`).

### The governance-edit-kind read, #504 (RL-30, counted)

#504's body, read from GitHub's public API, never from the squash message:
- `governance/Component-Development-Guide.md` — CORRECTION, citing RL-29 in this file @ `8665395fd` "on origin/chore/release-16.1.0-claims-pass-phase-1, not yet on main"; truth: the generated output at `503fbfb84`. **The observation record does not resolve at the merge**: `git cat-file -e 4abfbe6de:<this file>` fails, and `8665395fd` is not an ancestor of S. The truth referent resolves. The body states the non-resolution itself ("Per RL-30").
- `canonical/generated.lock` — EXECUTION (regeneration). This is not a governance path, so the line is given for the record.
- Both commits are covered by the one CORRECTION line. The caveat sentence is Ada's text from the consult.
- **`**Consulted**:`** is present (Lina; Ada).
- **The rot-mode count**: **3** CORRECTION lines across the three CDG and guidelines PRs (#500, #502, #504) whose observation record does not resolve at the merge. There are no LAW hunks, so nothing goes to Peter from this read. **Same finding class as RL-30. Counted, not new.**

### RL-31: Low (tag-relevant if Peter reads it floor-class) — the CDG still teaches two web examples that are false at the web reader; the token-name sweep did not reach either

- **Promised** (M7, RELEASE-FLOW 3a): "served docs, MCP contracts and agent charters are fixed, not disclosed". Peter's answer to RL-29: "Fix the guide section now", "Go with the whole-file sweep".
- **Claimed**: #504's body says "every token name in the file that is presented as real now resolves". It qualifies that with open item (3), and lists (i) below under "Observations, not changed (outside the token-name ruling)".
- **Shipped** (the packed CDG at the final S):
  - **(i) L1513–L1539, § "Implementation Example", `/* Button-CTA CSS showing both types */`**: `:host { … --color-action-primary: var(--color-action-primary); --motion-button-press-duration: var(--motion-button-press-duration); … }` (L1519–L1520), then (L1527–L1530) `.button-cta { background-color: var(--color-action-primary); transition: background-color var(--motion-button-press-duration) ease-out; }`.
    - Each of the two declarations is a custom property whose value references itself. By the CSS Custom Properties cycle rule (a property in a dependency cycle is invalid at computed-value time), each computes to the guaranteed-invalid value on `:host`. That shadows the value inherited from `:root`, so the two uses below resolve to nothing, and the browser drops both declarations without an error. **This is read from the spec's rule, not run in a browser.**
    - The comment calls it Button-CTA's CSS. A scan over packed `dist/components/`, `dist/browser/`, `governance/`, `.kiro/steering/` and `docs/` finds these two lines as the only self-referencing custom properties in the package, so no shipped component does this.
    - **#472 corrected this block** (floor row 3): at `v16.0.0` L1502 read `--color-primary: var(--color-primary);`, and #472 renamed it to the key and kept the cycle.
  - **(ii) L704, L792, L897, L908 (`iconSize100`) and L909 (`iconSize075`), as TypeScript names**. L792 is under "✅ CORRECT: Use token reference", and L704 describes how Button-CTA "internally uses" the Icon component.
    - Nothing in the package defines either name. The only `dist/**/*.d.ts` hits are doc comments in the two native format generators.
    - Icon-Base's web `size` is `IconBaseSize = 13 | 20 | 24 | 28 | 32 | 36 | 40 | 44 | 48` (`dist/components/core/Icon-Base/types.d.ts` L62). That type's own doc example is `const size: IconBaseSize = 24; // Standard size for body text` (L57). The same module carries the token-reference object `iconBaseSizes`, which packed `ButtonCTA.web.js` reads (`iconBaseSizes.size100`, L59). So the block's "❌ WRONG: Hard-coded size" (L795–L798, `size: 24`) is the shipped type's own example.
    - L787 imports `createIcon` from `@/components/core/Icon/platforms/web/Icon.web`, a path that does not exist. The module is `Icon-Base/platforms/web/IconBase.web`, where `createIcon` is an alias of `createIconBase` (`IconBase.web.js` L501).
    - These fail loudly: a TypeScript compile names the missing identifier and module.
- **Age**: both are pre-existing. At `v16.0.0` the CDG had the cycle (L1502–L1503, under the old name) and the TypeScript lines (L691, L772, L777, L882, L893).
- **Known?** No record at S holds either.
  - A search of `.kiro/issues/**` at S for `createIcon`, `Icon/platforms/web/Icon.web` and the self-reference finds nothing on point.
  - The CDG record at S (`2026-10-25-cdg-component-token-files-teaches-a-reference-map.md`, P2) covers § "Component Token Files" (L567–L673), not these lines.
  - The guard ratified in #495 under-includes both by declaration: unquoted identifiers, and an import surface limited to `@3fn/core` specifiers. So neither is a true-positive pending entry, and F-3 does not reach them.
  - Lina's #504 body names (i) as an observation and (ii) as open item (3) for Ada ("not guessed, not blocking").
  - Other served docs: the TypeScript names and the import path appear in no other packed `governance/` or `.kiro/steering/` doc.
- **Reading**:
  - Web is a build input, so the reference-source frame that keeps native-name defects out of P0 does not reach either. That is RL-29's frame. **I read both as P0-shaped at the web reader.**
  - Harm: low for (ii), which fails loudly. (i) is the RL-29 kind, because a dropped declaration reports nothing, and it sits in a block this release corrected.
  - **By 3a's letter it is not "known"**: it is not a walk row, and no record holds it.
- **Route**: **Lina** (the CDG's content: the CORRECTION text, or a rule-10 record; her text, not mine); **Ada** (her open item (3), whether the web gets a TypeScript token export, which bears on (ii)'s text); **Peter** (the fork).

### The fork (RL-31), surfaced and not picked: Peter's

- **(a) Fix before the tag.**
  - Lina's CORRECTION of L1519–L1520 and the six TypeScript lines, against the packed web output and Icon-Base's shipped types. Ada's item (3) bears on the TypeScript lines' text.
  - (a) means a fifth S, 5.1 again and a fourth addendum. RL-32's and RL-33's notes lines can ride the same round.
- **(b) Tag the final S with his own-words waiver for 16.1.0.** Lina files a rule-10 record with a dated plan, trigger `release:next:phase-1`. This is the shape of his RL-29 answer for the index.
- **(c) Rule it not floor-class.** For example: (ii) fails loudly at compile, or (i) reads as an illustrative fragment. That needs his words.
- **Already answered?** I checked his dated words.
  - "Fix the guide section now" and "Go with the whole-file sweep" ruled the guide's token names. One reading makes (a) his answer already, because the sweep he ordered is the whole file. I do not take that reading for him, for two reasons. (i) is not a token-name defect. And Lina routed (ii) to Ada in the PR he merged, and a merge answers nothing.
  - F-3 does not reach either (above).
- **Open for Peter**: RL-31's fork, (a) / (b) / (c). The tag waits for his answer, not for a fix.

### RL-32: Low (holds step 7, not the tag) — notes L67's list of post-F shipped-path PRs omits #504

- **Shipped** (`docs/releases/release-16.1.0.md` at S, not packed): L67 reads "After F, PRs #486, #488, #489, #490, #491, #496, #499, #500, #502 and #503 changed shipped paths". It then lists what no trio run saw, ending with the platform guidelines.
- **#504** changed `governance/Component-Development-Guide.md`, a `files[]` path, after F. It is in neither list. #504's own body says so ("the release record needs this PR's number, and S moves").
- **Reading**: an enumeration short by one. Unlike #494 (O-36), the sentence's frame does not explain it. The candidate was already stale under protocol § 5.0, so nothing else follows.
- **Not tag-relevant**: the notes are not in the package, and step 7 runs `gh release create --notes-file docs/releases/release-16.1.0.md` after step 6. The file on `main` at step 7 is what the reader meets. A notes fix merged after the tag leaves the tagged tree's copy as it is. Under (a) it can ride the fifth S instead.
- **Write scope**: the 16.1.0 files grant's notes path expired at the release PR's merge. The fix-1 and fix-2 grants are closed. A notes PR needs a new grant record, or Peter's direct edit.
- **Route**: **Thurgood** (the notes; the grant record), before step 7.

### RL-33: Low (holds step 7, not the tag; erratum to addendum 2) — the notes carry F-3's count for the token-name half only

- **Promised** (F-3, Peter "as recommended", ballot `2026-10-26-governance-examples-guard` § 2.4): "true-positive pending entries are not walk rows … and the release notes carry the count". The pending list spans every half of the guard: its content keys carry `half`, and its homes include Lina's CDG L576, L956 and L1108.
- **Shipped**: notes L59 and CHANGELOG L37 carry Ada's token-name count (56 strings in 15 docs; 36 wrong; 20 example names). Neither carries a count for the file-shape and import halves. The ballot measured those at `a95d6bf3d`:
  - declared-path: 10 of 16 fail, one of them (Integration Guide L699) named correct;
  - shape: CDG L576 and L956;
  - import: 3, all named real defects (CDG L1108, now L1117, `@3fn/core/ThemeAwareBlendUtilities`; Token-Family-Blend L88; Token-Family-Layering L76).
- **Erratum**: my addendum 2 wrote "F-3's cost-bound … met". It is met for the token-name half only. I read "the count" as the token-name count and did not check the other halves.
- **Reading**: the notes are short of F-3's cost-bound by those halves. CHANGELOG L37 is still true as written: it reports a check of token names. The added disclosure satisfies either reading of "the count", so I put no fork.
- **Route**: **Thurgood** (the notes line, before step 7), with **Lina's** count for her halves.
  - The CDG L1117 import is the one packed instance among them. It is covered by F-3 once the notes carry the count, so it is not RL-31's.

### RL-34: Low (not tag-relevant; native-only) — the caveat's "match the token index" is false for `color.action.primary`, and two Icon blocks carry `theme.` names with no pointer to the caveat

- **Shipped**: the caveat (L999) says the `theme.` names below "match the token index". For `color.action.primary` (L1008, L1018, and L630 above) the packed index gives `colorActionPrimary` / `color_action_primary` (L275–L276). L811 and L845 (§ "Platform-Specific Icon Usage") carry `theme.colorFeedbackSuccessText` / `theme.color_feedback_success_text` with no pointer line. The ButtonCTA blocks carry theirs at L622 and L637.
- **Reading**:
  - The names follow the components, and Ada ruled them right in #504's body. The false link is the index row, which her plan item 5 fixes. When it lands, the clause becomes true without an edit.
  - The missing pointers are a disclosure placed away from its reader.
  - Both are native-only, and the reference-source frame applies. **Not floor-class**, and I do not dispute that frame.
- **Route**: **Lina** (the pointer lines; whether the clause waits for item 5); **Ada** (item 5, already planned).

### Observations (not findings)

- **O-37 carries** (#504's write authority, not read).
- **O-38 — #504's other observations, read**:
  - native `Icon(...)` (the real name is `IconBase`) and the `Typography(...)` value shape: native, reference-source frame;
  - the L780–L781 `/* 16px */` comment beside `--icon-size-075` (emitted as 20px, L819): a value comment, not a name;
  - `src/components/core/Icon-Base/README.md` L30: packed but not MCP-served.
  - None is floor-class on my reading. → Lina.
- **O-39 — the caveat cites `.kiro/issues/2026-06-28-spec-094-platform-theme-emission-unwired.md`**, which resolves in the repo but is not packed. A consumer meets a path they cannot open. Other served docs cite `.kiro/issues/` the same way. This is not a falsity.
- **O-40 — my miss.** Addendum 2 searched the CDG for composite stems only, and reported L609 as "the only hit". Both RL-31 items were in the packed file then. Had I read the whole file, Peter would have had one fork for this file, not two. That is RS-40's per-file rule, which I did not apply to my own read (RS-45).

### Standards implications (this addendum)

For Thurgood, read in full.
- **RS-44 (RL-31)**: every name check this release ran on served docs (row 3's sweep, the #495 guard, two whole-file sweeps) reads names against the index or the generated output. None of them reads what an example does.
  - A self-referencing custom property passes every name check. So do a bare identifier and a non-package import path, which the guard declares out of scope.
  - The class question: should the web fences in served docs (`css`, `ts`) get a check beyond names? For example, a cycle check on custom properties, and a type-check of whole fences that are declared real. F-2's (c) chose import lines only, because whole fences hold hypothetical code. That trade-off is the open part.
  - **Owner**: Thurgood (the standard), with Lina (the examples' markers and the predicate's scope).
- **RS-45 (O-40)**: when a claims pass finds one served-doc falsity in a file, it reads the whole file before it puts the fork. The same per-file rule as RS-40, applied to my own reads. **Owner**: me (method); Thurgood if it belongs in the guide.
- **RS-42, evidenced and answered for this release**: Ada's plan items 1–5 are the index half's class fix. Item 3 is still Thurgood's to take.
- **RS-43, evidenced again**: #504 is the third CORRECTION in one cycle whose observation record does not resolve at its merge.

**Standards implications: list — RS-44 and RS-45 (new); RS-42 and RS-43 evidenced.**

### Method (this addendum)

**Run by me** (worktree at `8665395fd`, branch `chore/release-16.1.0-claims-pass-phase-1`; `git status --porcelain` empty before, and only this file after):
- `git fetch origin`; `git log --first-parent`, `git show`, `git diff`, `git log -L` and `git grep` over `503fbfb84..4abfbe6de` and `v16.0.0..4abfbe6de`; `git merge-base --is-ancestor`; `git cat-file -e` at S;
- the public GitHub API, unauthenticated, for #497 and #504 (merge facts, commits, bodies); `git ls-remote --tags origin`; the npm packument;
- both 3a greps over `git archive 4abfbe6de .kiro/issues`;
- the copy, re-hash and extraction of the final tarball; `comm` and `diff -rq` against the prior tarball; `cmp` of packed files against `git show 4abfbe6de:<path>`; a masked `diff` of the two dry-run logs;
- three scratch scripts (`python3 -I`, outside the extracted tree): every `var()` and `DesignTokens.` name in the packed CDG against the packed output; self-referencing custom properties over the packed served and component trees; the composite-stem grep;
- `verify-signing-chain --audit --pr 504 --exclude-signer stacy` (one `FETCH_HEAD` write).

**Read, not re-run**: the 5.1 dry run (the orchestrator's); Ada's predicate counts; the guard ballot's file-shape and import measurements.

**Not run**:
- any compile: every iOS and Android read is of names and declared kinds, `not re-verified — toolchain unavailable`;
- any browser, for RL-31 (i): the cycle reading is the spec's rule, read;
- a TypeScript compile of RL-31 (ii): the reading is from the packed `.d.ts` and `.js` files;
- the root suite and the MCP suites;
- `owed-set.sh` (the delta touches no `.kiro/specs/` path);
- `gh` (this session holds no credentials, and I read none);
- `verify-gate-registration.sh`.

### Forced negative (this addendum)

- **One packed text class is P0-shaped by my reading at its reader**: RL-31, two web examples in the CDG. It is not a walk row, and it is Peter's.
- **No ✅ here rests on a compile or a browser.** The native rows are reads of emitted declarations. RL-31 (i) is a reading of the CSS cycle rule.
- **Not re-derived**: the guard ballot's file-shape and import counts (RL-33).
- No other claim group in my sample moved between the two S's.

### Surviving counter-argument

My verdict holds the tag a fifth time today. The finding is Low, and it has been pre-existing since at least 16.0.0. Part of it, (ii), fails loudly. And I could have found all of it at addendum 2 (O-40).

**What survives**:
- By 3a's letter, "knows" means the rows of the walk record, and RL-31 is not one. The content owner read (ii) as not blocking and (i) as outside her ruling.
- A reader can say Peter's two "fix it now" answers ruled specific defects, not a standard that every pre-existing served-doc find holds the tag. On that reading, I am spending his attention on a pattern he has not asked me to enforce.
- I cannot rule that reading out. I hold the fork for three reasons. (i) is the RL-29 kind (silent, at the web reader) in a block this release corrected. Both items are in the one file he ordered swept whole. And the floor gives the waiver to him, not to me.
- If his answer is (b) or (c), this round cost a fork that a whole-file read at addendum 2 would have folded into RL-29's. The class option is RS-44: check what web examples do, not only what they name. With RS-45, these finds would arrive once per file, not once per round.
