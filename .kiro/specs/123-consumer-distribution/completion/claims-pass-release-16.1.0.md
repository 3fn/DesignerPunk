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

## Phase 1 addendum 4 — final S `38f4ece47c425cc83cac6739cae7a1806bfb0818` (#505), 2026-10-26

**Written**: 2026-10-26. Reads taken 16:36:24Z → 16:44:39Z; this section appended after 16:44:39Z (each from `date -u` when taken).
**Final S**: `38f4ece47c425cc83cac6739cae7a1806bfb0818`, the squash of **PR #505** (Lina's CORRECTION of `governance/Component-Development-Guide.md` L1518–L1520; one commit `70d64f8e4`, 16:27:57Z; branch `fix/cdg-css-self-reference`; PR opened 16:29:17Z), merged by `3fn` at **2026-10-26T16:35:14Z**. It is the only first-parent commit in `4abfbe6de..38f4ece47`. Merge facts, head, commit and merger are from GitHub's public API, read by me.
**Peter's answer, and its bound**: chat, relayed by the orchestrator, received before 2026-10-26T16:24:20Z (the orchestrator's clock), verbatim: *"Fix the CSS cycle now, waive the icon example with the plan"*. It is recorded on #497's body as an `**Answered (RL-31 fork)**:` line (read by me from the public API; #497 open, head `737ff3e4e`). The commit, the PR's opening and the merge are all after the bound, so nothing outran the question (RL-23 does not repeat).
**Firing event**: RELEASE phase 1 on the new S, owed by Peter's answer (a fifth S, 5.1 again, a fourth addendum).
**State at this writing** (16:42:35Z): no `v16.1.0` tag on `origin` (`git ls-remote --tags origin`: 0 matches). `registry.npmjs.org/@3fn%2fcore`: `dist-tags.latest` = `16.0.0`, and no `16.1.0` key in `versions` or `time`. `origin/main` is the final S. **Nothing is tagged or published.**
**Append-only**: every section above stays as written. Where this addendum corrects one, it says so, as an erratum.

> **No pass, at any grain, is ever a required check, a review gate, or a blocking condition on any PR.** This addendum gates neither the tag nor the publish. Where a finding meets the release floor, it names the fork for Peter and does not pick it.

### For the tag (read this first)

- **RL-31 holds nothing now.** (i) is fixed in the packed bytes: the `:host` block declares no design-system token, and a self-reference scan over the packed served and component trees finds 0. (ii) is waived for 16.1.0 by Peter's words, in Lina's P0 record with a dated plan, which merges after the tag by design.
- **One new reading, RL-35, is Peter's.** This addendum read every web fence in the packed CDG for what it does, not only what it names (RS-44, RS-45). Two complete, presented-as-correct web examples using real shipped tags silently do not do what they show:
  - L422 (under "✅ CORRECT") `<button-cta variant="danger" label="Delete">`, with L442's interface listing `'danger'`. Button-CTA's variants are `primary | secondary | tertiary`; any other value renders `primary`, with no warning.
  - L1682–L1693 (§ "Nested Containers with Same Border Radius", both the DON'T and the DO): `<container-base borderRadius="…">`. HTML lowercases the name to `borderradius`; Container-Base reads `border-radius`. Neither container gets a radius, so both examples render the same square corners and the lesson renders nothing.
  - Both are pre-existing at `v16.0.0`. Neither is a walk row, and no record at S, or on the upkeep branch, holds either.
- **The notes items still hold step 7, not the tag.** #505 joins RL-32's list. RL-33 takes an erratum (Thurgood's read, below).
- **My verdict line for the tag at the final S `38f4ece47`: it should wait for Peter's answer on RL-35, not for a fix. Nothing else holds it.** By 3a's letter RL-35 does not hold it, since it is not a walk row. I hold it on the precedent of RL-27, RL-29 and RL-31 (i), each of which he answered "fix it now" for a silent web falsity. The counter-argument below says what that costs, and that this is my miss again.
- **Open for Peter**: RL-35's fork, (a) / (b) / (c), below, with a class-level option beside it. This line belongs in #497's body as an `**Open for Peter**:` line.

### RELEASE-FLOW 5.1 at the final S

The orchestrator's dry run from the main checkout, 16:35:49Z → 16:36:19Z, `EXIT=0`. I read its log (`dry-run-finalS5.out`, 2083 lines) only after its last lines showed `EXIT=0` and the second `UTC 2026` timestamp:

```text
release-publish: dry-run of @3fn/core@16.1.0 at 38f4ece47c425cc83cac6739cae7a1806bfb0818 (fresh clone of https://github.com/3fn/DesignerPunk.git)
✓ No package name drift detected (1540 files scanned)
Closure 1: 54 files checked, 0 escaping references
Closure 2: 54 seed files, 16 closure files, 0 bare specifiers
105/105 assertions passed.
sha1:       e3d86894fbaba47f765ff4b8c6bb488a71cb15e7
files:      1694   bytes: 6590391   pack-assert: 105/105   publish path: 16 (floor 16)
```

- **105 `PASS` lines, 0 `FAIL`.** 16 of them are `PASS: publish path:`, and all three MCP bundles read `nested roots []`.
- **The log against the prior S's log** (`dry-run-finalS4.out`), with timestamps, temp-dir names and millisecond timings masked: they differ only in the commit line, the `npm notice` size of `governance/Component-Development-Guide.md` (78.4kB → 78.6kB), and the shasum, integrity, sha1 and bytes lines.
- **`release-publish-record.json`**: `mode` `dry-run`, `commit` = the final S, `sha1` `e3d86894…`, `fileCount` 1694, `bytes` 6590391, `checks` 105/105, `publishedTo` `[]`, `createdAt` 2026-10-26T16:36:15.963Z.
- **The tarball**: I copied it and the record from the run's `out/` directory, re-hashed the tarball (sha1 equal) and extracted it to scratch (`cp1-add4/`).
- As before, 5.3 rebuilds at the tag, so the published sha1 will differ. 6b's comparand is the 5.3 record.

### The delta since the prior S `4abfbe6de`

**In git**: `git diff --numstat 4abfbe6de 38f4ece47` lists `governance/Component-Development-Guide.md` 4/3 and `canonical/generated.lock` 1/1. The lock change is `inputClosure` only; `outputs` stays `78ead3ba…`, so no agent output changed. `canonical/` is not packed.

**The packed delta** (the prior tarball `37801355…` against the final `e3d86894…`, both extracted):
- **The same 1694-path file set** (`comm -3` prints nothing).
- **4 files differ**:
  - three re-stamped timestamps, and nothing else: `dist/mcp/tool-manifest.json` (`generatedAt`), `dist/types/generated/TokenTypes.{d.ts,js}` (`Generated:`);
  - `governance/Component-Development-Guide.md`, byte-equal to its file at the final S (`git show 38f4ece47:<path> | cmp`).
- **Byte-equal**: everything else, including `CHANGELOG.md` and `package.json` (both also equal to S), the token files, `token-index/**`, `.kiro/steering/**` and `dist/consumer-canonical/**`.
- **What this means for my sample**:
  - **The L266 row's counts hold.** The token index is byte-equal, so its keys are 217/193/33, with 0 removed. The file set is unchanged, so against public 16.0.0 it is still 21 added and 2 removed.
  - **No sample claim group needs a re-verify** beyond the one changed file, read below.
- **Signing acts in the delta**: `verify-signing-chain --audit --pr 505 --exclude-signer stacy` reads `0 of 0 act(s) selected; 0 withheld`, counts all 0, exit 0 (`refs/pull/505/head` = `70d64f8e`). No path under `canonical/profiles/` or `canonical/operative-sets/` changed. RL-24's and RL-25's counts are unchanged: `Delegate audit (Stacy-signed, Ada): 0 / 135 — no file at S (not run)`; `Peter sample (Stacy-signed): 0 / 135`.
- **Grant reads**: #505 rides no grant. It is a Peter-merged CORRECTION by the file's content owner, as #500, #502 and #504 were; its write authority is not read here (O-37 carries).

### RL-31 at the final S: (i) fixed, (ii) waived

**(i), against the packed CDG.** L1515–L1539 now read: `:host {` then a four-line comment (L1518–L1521) saying the design-system tokens are not declared there, inherit from the token stylesheet's `:root`, are referenced directly where consumed, and that redeclaring a token as `var()` of itself is a cycle. Then the two `--_cta-*` placeholders, unchanged, and `.button-cta { background-color: var(--color-action-primary); transition: background-color var(--motion-button-press-duration) ease-out; }`, unchanged.
- **True at the web reader.** Both tokens are defined on `:root` in packed `dist/DesignTokens.web.css` and inherit into a shadow tree. Button-CTA's own CSS at S has no `:host` rule (0 matches) and reads both directly: `ButtonCTA.web.css` L49 (the transition) and L165 (`background-color: var(--color-action-primary)`), as #505's ledger says.
- **The scan**: a self-referencing custom property (`--x: var(--x…`) over packed `dist/components/`, `dist/browser/`, `governance/`, `.kiro/steering/` and `docs/`: **0 hits** (2 at the prior S, these lines). The new comment does not trip it, by Lina's design.
- **What #505 left as written, read**: the `--_cta-hover-bg: /* calculated by blend utilities */;` placeholders are labelled as placeholders; Lina's body records that the component sets them inline on the `<button>`, not on `:host`. Not false.
- **Row: RL-31 (i) → fixed (#505).** The text is Lina's.

**(ii) → waived for 16.1.0** by Peter's words above. The record is Lina's `.kiro/issues/2026-10-26-cdg-web-icon-typescript-example-false.md`, which I read on `origin/chore/post-16.1.0-record-upkeep` at `6b0d01980` (12:30:36-04:00, i.e. 16:30:36Z, after the bound).
- **Class**: P0 false-claim · defect, set by Lina at the definition, with the downgrade argument stated and left to Peter.
- **Trigger**: `release:next:phase-1`, with a lapse condition: if item 2's commit is not an ancestor of the next release's S, it lapses there and, being P0, goes to Peter at the first lapse (rule 11).
- **The waiver section** quotes Peter's sentence with the bound above and scopes it to 16.1.0 and RL-31 (ii) only.
- **The dated plan**: (1) Ada's answer on a web TypeScript token export; (2) one CORRECTION PR to the CDG's icon examples, due before the next release's walk, not waiting on (1) past its date; (3) RL-34's pointer lines, in (2)'s PR; (4) #504's other observations homed, one of them (a compile defect in shipped `ButtonCTA.android.kt`) to Lina's existing P1 record.
- **Not an ancestor of S**: `git merge-base --is-ancestor 6b0d01980 38f4ece47` fails, and `git cat-file -e 38f4ece47:<path>` fails. My greps cannot reach it, and it is not read at this walk, by design.

**Lina's two premise corrections, against my addendum 3.** Her record corrects the brief she was given; I checked each against my own text.
- *`createIcon` is a real legacy alias; only L787's path is false.* My addendum 3 already says so (§ RL-31 (ii): "`createIcon` is an alias of `createIconBase`"). One bullet of mine groups L787 with the identifier lines ("L704, L787, L792, L897, L908, L909: … TypeScript names that nothing defines, and an import path that does not exist"); read with its last clause it is true, but it is loosely worded. No erratum of substance; this note is the clarification: **L787 is the import path, not an undefined name.**
- *The native false calls are L807/L810/L839/L842, plus L845 `tint =`.* My O-38 (addendum 3) named the `Icon(...)` / `IconBase` mismatch without line numbers and did not notice `tint =` (Android `IconBase`'s parameter is `color`). **Erratum to O-38: add L845 `tint =`.** Native, reference-source frame; it does not change O-38's reading.
- **A third erratum to O-38, my own**: O-38 said `src/components/core/Icon-Base/README.md` L30 is "packed but not MCP-served". It is **not packed**: from `src/components/**`, `files[]` takes the schema, contracts and meta YAML, the native `.swift`/`.kt` sources and the Android `res/**` trees, and no component README; the only `README.md` under `src/components/` in the extracted tarball is `Icon-Base/platforms/android/res/drawable/README.md`, through the `res/**` glob. A package reader never meets it. Lina's plan item 4 still corrects it, which is right for the repo reader.

### The two 3a greps at the final S (RELEASE-FLOW Phase 1, as amended by #496)

The commands are verbatim from RELEASE-FLOW 3a at S, with `V=16.1.0`. I ran them at 16:40:56Z over `git archive 38f4ece47 .kiro/issues`, extracted to scratch, so these are S's bytes. Output cut at 140 characters:

```text
main at: 38f4ece47c425cc83cac6739cae7a1806bfb0818
… 33 Trigger lines in 32 records …
due-rows exit 0
.kiro/issues/2026-06-25-component-schema-token-name-drift.md:11:**Class**: P0 false-claim · defect *(set 2026-10-20, Lina, rule 12. Accepte
P0 exit 0
```

- **Against the prior S**: identical. `git diff --stat 4abfbe6de 38f4ece47 -- .kiro/issues` is empty, and `diff -rq` of the two archived trees prints nothing.
  - 33 lines in 32 records; by token, 2 carry `release:16.1.0:phase-1` and 31 lines carry `release:next:phase-1` (30 records, one on two lines).
  - P0: 1 line in 1 record (row 1, fixed by #452).
- **A method note, so a reader can reproduce this**: in this session's shell, `grep` is a wrapper over `ugrep`, which prints matches across files in a non-deterministic order. My first comparison against the prior S therefore showed spurious line moves. I compared the two outputs sorted (identical), and recounted with the system `grep` (`command grep`: 33 lines, 32 files, 1 P0). The counts above are those.
- **What lapses at the final S**: unchanged. **No lapse: 6. Lapse: 24** (P1 3, P2 `(guard)` 8, P2 `(record)` 13). **Escalations: 9.** My erratum carries (8 of the 24 filed after the walk merged, none rowed). Mine (Start Up Tasks item 9): three lapses, reported; the `## Lapse` headings are not appended in this record-only PR.
- **Not ancestors of S**, so not reachable by these greps: everything on `origin/chore/post-16.1.0-record-upkeep` (`6b0d01980`), including Lina's RL-31 (ii) record and Ada's index record.

### The governance-edit-kind read, #505 (RL-30, counted)

#505's body, read from GitHub's public API, never from the squash message:
- `governance/Component-Development-Guide.md` — CORRECTION, citing RL-31 (i) in this file @ `737ff3e4e` "on origin/chore/release-16.1.0-claims-pass-phase-1, not yet on main"; truth: the CSS custom-property cycle rule and `src/components/core/Button-CTA/platforms/web/ButtonCTA.web.css` L49, L165. **The observation record does not resolve at the merge**: `git cat-file -e 38f4ece47:<this file>` fails, and `737ff3e4e` is not an ancestor of S. The truth referent resolves (read above). The body states the non-resolution itself ("Counted as an RL-30-class citation").
- `canonical/generated.lock` — EXECUTION (regeneration). Not a governance path; the line is given for the record.
- **`**Consulted**:`** is present (Lina; Stacy). The Stacy half cites my addendum 3, a committed trace, so it is a named read with a trace, not a self-attested consult.
- **The rot-mode count**: **4** CORRECTION lines across #500, #502, #504 and #505 whose observation record does not resolve at the merge. No LAW hunks, so nothing goes to Peter from this read. **Same finding class as RL-30. Counted, not new.**

### RL-32 and RL-33 at the final S (notes; hold step 7, not the tag)

- **RL-32**: notes L67 (`docs/releases/release-16.1.0.md` at S, unchanged by the delta) still lists "#486, #488, #489, #490, #491, #496, #499, #500, #502 and #503". **The list the notes need now adds #504 and #505**: both changed `governance/Component-Development-Guide.md`, a `files[]` path, after F. #505's own body says so. Route unchanged: **Thurgood**, before step 7, under a new grant record or Peter's direct edit.
- **RL-33, erratum (Thurgood's read, relayed by the orchestrator, 2026-10-26)**. My addendum 3 wrote: "The CDG L1117 import is the one packed instance among them." **That sentence is false.** `files[]` lists `governance/` whole, so all three import defects ship. I read each in the final tarball:
  - CDG L1117: `from '@3fn/core/ThemeAwareBlendUtilities'`;
  - `governance/Token-Family-Blend.md` L88–L93: the same dead subpath (`L93`);
  - `governance/Token-Family-Layering.md` L76–L78: `import { zIndexTokens } from '@3fn/core'`; packed `dist/browser-entry.d.ts` has 0 `zIndex` matches.
  - The package's export map has `./blend` and no `ThemeAwareBlendUtilities` subpath.
  - **What I meant**: I had read the CDG whole and the other two files not at all, and wrote "packed" where I meant "in the file I read". The conclusion that sentence served still holds, for all three: each is a true-positive pending entry of the guard's import half, so F-3 covers each once the notes carry the count, and none is RL-31's.
- **RL-33, a second precision (also Thurgood's)**: the source of the file-shape and import counts is the ballot `.kiro/docs/ballots/2026-10-26-governance-examples-guard.md`'s census line (L22: "Declared paths: 10 failing of 16, of which CDG L576 and L956 also fail the shape rule. Import surface: 3 failing of 7 package-importing blocks") and Lina's R1 in its § 7 (L224–L226, the three import sites). It is not Ada's section of the token-docs record. My addendum 3 wrote "the ballot measured those at `a95d6bf3d`", which is the same source named loosely; this names it exactly, so the notes line can cite it. The census line's token-name count (56 failing of 1,958 candidates; 36 true positives; 20 needing generic) agrees with the count the notes already carry.
- Both stay Thurgood's, with Lina's count for her halves, before step 7.

### RL-35: Low (tag-relevant if Peter reads it floor-class) — two CDG web examples, presented as correct and using real shipped tags, silently do not do what they show

- **Promised** (M7, RELEASE-FLOW 3a): "served docs, MCP contracts and agent charters are fixed, not disclosed". Peter's answers to RL-27, RL-29 and RL-31 (i): fix now, each time for a web falsity that fails silently.
- **Claimed**: no PR claims these lines. #504 and #505 each scoped themselves (token names; the `:host` cycle) and touched neither.
- **Shipped** (the packed CDG at the final S):
  - **(A) L417–L448, § "Variant Attribute Naming"**. L418–L423, headed `<!-- ✅ CORRECT: Use variant attribute -->`: `<button-cta variant="primary" …>`, `variant="secondary"`, and **`<button-cta variant="danger" label="Delete">`** (L422). L437–L448, "TypeScript Interface Pattern": `export interface ButtonCTAProps { … variant?: 'primary' | 'secondary' | 'danger'; … }` (L442).
    - Packed `dist/components/core/Button-CTA/types.d.ts` L54: `ButtonStyle = 'primary' | 'secondary' | 'tertiary'`; the exported props interface is `ButtonProps` (L86), with `variant?: ButtonStyle`.
    - Packed `ButtonCTA.web.js` L349–L352: `get buttonVariant()` returns the attribute only if it is one of the three, else `'primary'`; the render reads it (L470, L478; L543). No warning is logged.
    - So the "CORRECT" Delete button renders as a primary button, without an error, and the interface teaches a variant that does not exist and omits `tertiary`.
    - The section's subject is the attribute's *name* (`variant`, not `style`), and that teaching is true. The false part is the value, inside a block labelled correct, on a real tag.
  - **(B) L1678–L1700, § "❌ Nested Containers with Same Border Radius"**. Both the DON'T (L1682–L1686) and the DO (L1689–L1693) write `<container-base borderRadius="normal" padding="200">` with an inner `<container-base borderRadius="normal|none">`.
    - HTML attribute names are case-insensitive, so the parser stores `borderradius`. Packed `ContainerBase.web.js` observes and reads `border-radius` (L145, L271); `mapBorderRadiusToCSS(null)` returns no radius. The `borderRadius` *prop* (types.d.ts L142, values `none | tight | normal | loose`) is the cross-platform name; on the web element it is the hyphenated attribute.
    - So neither container gets a radius: the DON'T shows no overlap, the DO shows no alignment, and both render the same. `padding="200"` is read and applied. Nothing reports an error.
    - **This is read from the packed source and the HTML attribute rule, not run in a browser.**
  - **A mechanical scan over every packed served doc** (`governance/`, `.kiro/steering/`, `docs/`; `python3 -I`, outside the extracted tree): every `<tag attr=…>` whose tag one of the 34 packed web components defines, with each attribute checked against the element's `observedAttributes` and `getAttribute`/`hasAttribute` reads. **8 hits: the 4 `borderRadius` lines above, and 4 that are the scanner misparsing words inside quoted values** (`label="Very Long …"`, `error-message="Please select …"`), read by eye. So (B) is the only unread attribute in any packed served doc. A tally of `variant=` / `size=` values on those tags finds `variant="danger"` once (L422) and every other value valid (`size="lg"` on `badge-label-base` and `avatar-base` is in both unions).
  - **`'danger'` elsewhere**: `governance/Token-Resolution-Patterns.md` L47 and L449 use `'primary' | 'secondary' | 'danger'` in a generic `ButtonProps` under "Example 2: Button Component (Hypothetical)". Labelled hypothetical, on no shipped tag: **not false**, and not part of RL-35.
- **Age**: both are pre-existing. At `v16.0.0` the CDG had (A) at L415 / L435 and (B) at L1664–L1675.
- **Known?** No record at S holds either: a search of `.kiro/issues/**` at S and on the upkeep branch for `borderRadius="`, `borderradius` and `variant="danger"` finds nothing on point. The served-prop sweep record (`2026-10-25-web-elements-served-prop-sweep.md`) compares served schema names with element accessors; it does not read doc examples, so it does not reach either. F-3's guard reads names, declared paths, shapes and package imports; it reaches neither (RS-44).
- **Reading**:
  - Web is a build input, so the reference-source frame that keeps native defects out of P0 does not reach either. **I read both as P0-shaped at the web reader**, the RL-31 (i) kind: complete examples, presented as correct, on real tags, that fail silently.
  - Harm: low. (A)'s sentence about the attribute's name is true; (B) is an anti-pattern section whose fix is a one-word rename (`border-radius`). Neither is copied by a shipped component.
  - **By 3a's letter it is not "known"**: not a walk row, and no record holds it.
- **Route**: **Lina** (the CDG's content: the CORRECTION text, or a rule-10 record with a dated plan; her text, not mine); **Peter** (the fork).

### Also read in the whole-file pass, and not floor-class on my reading (named so Peter can disagree in the same answer)

- **(C) L1252–L1336, the incremental-DOM "Architecture Pattern"** has `attributeChangedCallback` but no `static get observedAttributes()`, so as shown the callback never fires and `_updateDOM()` never runs on an attribute change, silently. The canonical file it names (`ButtonVerticalListItem.web.ts`) has it, as does every packed web component I read. I read it as an omission in a fragment that is visibly incomplete (`styles`, `this.label`, `this.icon`, `_getStateClass`, `_hoverColor`, `_pressedColor` are all undefined, and fail loudly first), not a false statement. It is the closest of these to the line. → Lina.
- **(D) L602–L617** shows `static styles = css\`…\`` (Lit's form) for `ButtonCTA.web.ts`. No Lit is in the package's dependencies, and shipped Button-CTA is a plain `HTMLElement`. It fails loudly (`css` undefined), and its token names are all true (addendum 3's script). → Lina.
- **(E) L1862, L1885–L1887** name `src/components/core/ButtonCTA/README.md` and `…/ButtonCTA/examples/*.html`; the directory is `Button-CTA`. Prose paths, so outside F-3's declared-path half (fenced first-line comments only); not packed (no README or example HTML from `src/components/**` is in the tarball, apart from the Android `res/drawable/README.md` above); loud. → Lina.
- The other web fences (L202–L214, L284–L296, L426–L429, L451–L459, L576–L595, L671–L676, L764–L783, L962–L997, L1026–L1037, L1116–L1134, L1185–L1206, L1342–L1443, L1467–L1478, L1545–L1596, L1610–L1676, L1708–L1749) are illustrative fragments or anti-patterns whose names resolve (addendum 3) and whose behavior, where they have one, matches the packed source: the blend function names and values (`hoverColor`/`pressedColor`/`focusColor`/`iconColor`, `darkerBlend`/`lighterBlend`; 8 % / 12 % / 8 % / 4 %, `ThemeAwareBlendUtilities.web.d.ts` L37–L103 and `DesignTokens.web.css` L799–L805), the `data-theme` selector (`:root[data-theme="wcag"]`, L931), `<icon-base>`'s `name`/`size`/`color` attributes (observed, `IconBase.web.js` L292), Button-CTA's `icon` attribute, and every `--_…` component-scoped name in the tables (each defined in packed component code). L1117's import is RL-33's.

### The fork (RL-35), surfaced and not picked: Peter's

- **(a) Fix before the tag.** Lina's CORRECTION of L422 / L442 (a real variant, `tertiary` in the union, the shipped interface name or a label that it is a pattern) and L1682–L1693 (`border-radius`). (C)–(E) can ride it at her choice. (a) means a sixth S, 5.1 again and a fifth addendum, which would read only that delta: this addendum's whole-file behavior read of the CDG is done.
- **(b) Tag the final S with his own-words waiver for 16.1.0.** Lina files a rule-10 record with a dated plan, trigger `release:next:phase-1`, or appends both to her RL-31 (ii) record's plan. This is the shape of his RL-31 (ii) answer.
- **(c) Rule them not floor-class**, for example as low-harm illustrations whose subject (the attribute's name; the radius arithmetic) is true. That needs his words.
- **The class option, beside the fork**: Peter rules, for 16.1.0 only, that a pre-existing served-doc example defect found after the walk, and not rowed, takes (b)'s shape by default (a rule-10 record with a dated plan, no new S), and RS-44's check (what web examples *do*) is the class fix for the next release. **Cost**: every such find this release ships, disclosed only in a record a package reader cannot see, which is weaker than M7's "fixed, not disclosed"; and it is a release-scoped rule decided under time pressure. It has not been vetted with Thurgood or Lina; I name it, I do not recommend it.
- **Already answered?** I mapped his dated words first. His RL-31 answer split exactly along silent (fix now) and loud (waive with plan), and (A) and (B) are silent. One reading makes (a) his answer already. I do not take it for him: his words ruled the named lines of RL-31, these are other lines, and a pattern in his answers is not an answer.
- **Open for Peter**: RL-35's fork, (a) / (b) / (c), or the class option. The tag waits for his answer, not for a fix.

### Observations (not findings)

- **O-37 carries** (#505's write authority, not read).
- **O-41 — #505's two body observations, read**: the `--_cta-*` placeholders sit on `:host` where the component sets them inline on `<button>` (inherited either way; not false), and the example's `ease-out` stands in for `var(--motion-button-press-easing)` (valid CSS; a simplification). Agreed: neither is a falsity.
- **O-42 — Lina's record homes a compile defect in shipped `ButtonCTA.android.kt`** (bare `colorActionPrimary`, `colorBackground`, `colorContrastOnDark`, none declared or imported) to her existing P1 record (`2026-10-24-android-component-unit-type-mismatches.md`). Native source ships as reference source, so it is not floor-class on the owners' standing reading, which I do not dispute. Noted here because it is shipped source, not a doc. → Lina (already routed by her).

### Standards implications (this addendum)

For Thurgood, read in full.
- **RS-44, evidenced again and sharpened**: two more silent web-example defects (RL-35) pass every name check this release ran. The cheap half of a behavior check exists now as a scratch script: custom-element attributes in served docs against the element's observed and read attributes, plus attribute values against the element's exported unions. It found (B) and, with the value tally, (A); it costs seconds and has no fence-intent problem, because it reads only tags the package defines. That is a candidate for the guard's next half. **Owner**: Thurgood (the instrument), with Lina (scope).
- **RS-45, evidenced against me twice**: I wrote it at addendum 3 and applied it to names only. Reading a file whole means reading what its examples do. **Owner**: me (method).
- **RS-46 (new)**: a claims pass that compares grep output across commits in this environment must sort, or use the system `grep`, because the session's `grep` wrapper prints in a non-deterministic order. **Owner**: me (method); Thurgood if the 3a commands should pipe through `sort` so the walk record's paste is reproducible byte for byte.
- **RS-43, evidenced a fourth time**: #505 is the fourth CORRECTION this cycle whose observation record does not resolve at its merge.

**Standards implications: list — RS-46 (new); RS-44, RS-45 and RS-43 evidenced.**

### Method (this addendum)

**Run by me** (worktree at `737ff3e4e`, branch `chore/release-16.1.0-claims-pass-phase-1`; `git status --porcelain` empty before, and only this file after):
- `git fetch origin`; `git log --first-parent`, `git show`, `git diff` over `4abfbe6de..38f4ece47` and against `v16.0.0`; `git merge-base --is-ancestor`; `git cat-file -e` at S; `git grep` at S and on `origin/chore/post-16.1.0-record-upkeep`;
- the public GitHub API, unauthenticated, for #497 and #505 (merge facts, commit, body); `git ls-remote --tags origin`; the npm packument;
- both 3a greps over `git archive 38f4ece47 .kiro/issues`, compared sorted with the same greps over `git archive 4abfbe6de .kiro/issues`, and recounted with the system `grep`;
- the copy, re-hash and extraction of the final tarball; `comm` and `diff -rq` against the prior tarball; `cmp` of packed files against `git show 38f4ece47:<path>`; a masked `diff` of the two dry-run logs;
- a read of every line of the packed CDG (1906 lines), every web fence read for what it does against the packed component JS, `.d.ts` and CSS;
- two scratch scripts (`perl` and `python3 -I`, outside the extracted tree): the self-reference scan; the custom-element attribute scan over all packed served docs; plus a `grep` tally of `variant=` / `size=` values;
- `verify-signing-chain --audit --pr 505 --exclude-signer stacy`.

**Read, not re-run**: the 5.1 dry run (the orchestrator's); the guard ballot's census counts (RL-33).

**Not run**:
- any browser, for RL-35 (A) and (B) or RL-31 (i): the readings are of packed source and the HTML and CSS rules;
- any compile: every iOS and Android read is of names and declared kinds, `not re-verified — toolchain unavailable`;
- a behavior read of packed served docs other than the CDG, beyond the mechanical attribute scan and value tally: their fences were not read line by line for what they do;
- the root suite and the MCP suites; `owed-set.sh` (the delta touches no `.kiro/specs/` path); `verify-gate-registration.sh`;
- `gh` (this session holds no credentials, and I read none).

### Forced negative (this addendum)

- **One packed text class is P0-shaped by my reading at its reader**: RL-35, two web examples in the CDG. It is not a walk row, and it is Peter's.
- **No ✅ here rests on a browser or a compile.** RL-31 (i) and RL-35 are readings of packed source against the CSS and HTML rules.
- **Not re-derived**: the guard ballot's counts (RL-33); whether `Token-Family-Blend` L88 and `Token-Family-Layering` L76 are the only import defects in those two files.
- **Not read for behavior**: the other packed served docs, line by line (see Method). This addendum is the last for the CDG; it is not a claim that no other served doc teaches a silent web example.
- No other claim group in my sample moved between the two S's.

### Surviving counter-argument

My verdict holds the tag a sixth time today, on two Low, pre-existing examples that have shipped since at least 16.0.0, and that I should have found at addendum 3, where I wrote the very rule (RS-45) that would have found them.

**What survives**:
- By 3a's letter, "knows" means the walk record's rows, and RL-35 is not one. A reader can say Peter's three "fix it now" answers ruled named defects, not a standard that every later find holds the tag.
- The cost is now visible as a pattern: each whole-file read finds the next pre-existing defect, and nothing in the method says when that stops. The other served docs have not been read for behavior. A tag held until they are would wait on an unbounded read.
- I hold the fork anyway because both are the RL-31 (i) kind he has answered "fix now" three times, and the floor gives the waiver to him, not to me. I cannot rule the other reading out.
- The class option above is the honest way to stop the pattern for this release; RS-44's attribute check is the way to stop it for the next one. If his answer is (b), (c) or the class option, this round cost a fork that a behavior read at addendum 3 would have folded into RL-31.

## Phase 1 addendum 5 — final S `38f4ece47c425cc83cac6739cae7a1806bfb0818`, the rule's home (16.1.0 post-walk example-falsity rule; RL-35 waived under it), 2026-10-26

**Written**: 2026-10-26. Reads taken 17:03:04Z → 17:08:10Z; this section appended after 17:08:10Z (each from `date -u` when taken).
**Final S**: unchanged, `38f4ece47c425cc83cac6739cae7a1806bfb0818` (#505). `origin/main` is still S at 17:07:46Z. Nothing packed has changed since addendum 4, so 5.1's tally there stands (105/105, sha1 `e3d86894…`, 1694 files) and no new dry run was owed.
**State at this writing** (17:07:46Z): no `v16.1.0` tag on `origin` (`git ls-remote --tags origin`: 0 matches). **Nothing is tagged or published.**
**Firing event**: Peter's answer to RL-35's fork. This addendum is the committed home of the rule he ordered, as its Authority line says ("verbatim in Stacy's addendum 5"). The working files it quotes live only in the orchestrator's scratch directory, so their text is reproduced here byte for byte.
**Append-only**: every section above stays as written.

> **No pass, at any grain, is ever a required check, a review gate, or a blocking condition on any PR.** This addendum gates neither the tag nor the publish.

### For the tag (read this first)

- **RL-35 is waived under the 16.1.0 post-walk example-falsity rule.** Lina's record `.kiro/issues/2026-10-26-cdg-button-variant-and-container-attribute-examples.md` @ `a4328afd0` is committed and pushed before the tag, and both finds meet all four of clause 2's conditions (checked below).
- **The rule is Peter's, release-scoped, approved by the three seats in their own words**, and it expires at the v16.1.0 tag.
- **Three notes items hold step 7, not the tag**: RL-32 (#504 and #505 in the post-F list), RL-33 (the file-shape and import counts, with addendum 4's erratum), and the RL-35 disclosure the rule's clause 3 requires.
- **My verdict line for the tag at the final S `38f4ece47`: nothing holds it.**

### Peter's words, and their bound

Peter, chat, relayed by the orchestrator, received before **2026-10-26T17:01:28Z** (the orchestrator's clock), verbatim:

> "Go with an amended option 2 ("Waive under the rule now with a plan"), with the rule approved by relevant agents"

**Reading, the orchestrator's and mine**: he took addendum 4's class option (pre-existing examples found after the walk take the (b) shape, a rule-10 record with a dated plan, with no new S), and he amended it: the rule needs the relevant agents' approval in their own words. The approvals below were all given after the bound (mine at 17:03:04Z by my clock), and Lina's records were committed after it (`05a491406` at 17:04:02Z, `2b6653fcb` at 17:04:43Z, `a4328afd0` at 17:07:08Z), so nothing outran his answer.

### The rule (the consolidated text, verbatim)

The consolidated rule as the orchestrator holds it, `scratchpad/release-16.1.0/stopping-rule-consolidated.md`, sha1 `02041eb77295f173bc9e48ea9198c8f619e3c2c4` when I read it at 17:07:46Z. Every line below is the file's text, unaltered:

````markdown
# 16.1.0 post-walk example-falsity rule — CONSOLIDATED (Thurgood and Stacy, 2026-10-26; Lina's clause-6 sentence folded in)

Authority: Peter, chat, relayed by the orchestrator, received before 2026-10-26T17:01:28Z (orchestrator's clock), verbatim: "Go with an amended option 2 ("Waive under the rule now with a plan"), with the rule approved by relevant agents". Approved by Thurgood (release-flow owner), Stacy (claims passes), Lina (CDG owner) in their own words (texts in stopping-rule-draft.md; verbatim in Stacy's addendum 5).

1. **Scope**: release 16.1.0 only. It expires at the v16.1.0 tag. Making it standing for later releases needs a ballot, because it would amend how RELEASE-FLOW 3a treats findings made after the walk.
2. **Trigger**: a falsity in a fenced example in a packed `governance/**` doc that meets all four conditions:
   - it was found after the walk record merged (`264c25661`, #469) and before the v16.1.0 tag;
   - it is not a walk row;
   - it is pre-existing, meaning present in substance at `v16.0.0`;
   - it is not something a PR in the 16.1.0 delta introduced. Those are the release's own claims and hold the tag as before.
   Prose claims, MCP contracts (schemas and tool output) and agent charters are not covered. They stay fixed, not disclosed (M7), and go to Peter one find at a time.
3. **Effect**: it does not hold the tag.
   - Before the tag, its owner commits and pushes a rule-10 record, and the phase-1 record cites it by path @ SHA. A promise to file does not count.
   - The owner classes the record under rule 12. Its dated plan is due before the next release's walk. If the fix is not an ancestor of the next release's S, the record lapses there and goes to Peter (rule 11).
   - The release notes disclose the find, the record, and this rule as the waiver, in L57's form. The notes line holds step 7, not the tag.
   - The phase-1 claims pass reads it as waived by this rule and cites the record.
4. **Limit**:
   - This rule waives nothing that becomes a walk row; any floor-class row stays Peter's to waive individually, in quoted, dated words (M7).
   - Peter may pull any single find out of this rule, in his own words, to fix it now.
   - A find whose harm goes beyond a wrong example goes to Peter on its own and is not waived by this rule. That means an example teaching an accessibility violation (WCAG 2.1 AA) or a security weakness. Any seat that reads a find that way sends it to Peter.
5. **First application**: RL-35, Lina's record `.kiro/issues/2026-10-26-cdg-button-variant-and-container-attribute-examples.md` @ `a4328afd0` (upkeep branch; filing commit `05a491406`, clause-2 bullet aligned in `a4328afd0`) with its dated plan. It covers CDG L422/L442 `variant="danger"` and L1682–L1693 `borderRadius=`. All four lines are inside fenced blocks, checked at S, and both were present at `v16.0.0`.
6. **Class fix**: a behavior and attribute check, as a version bump of the governance-examples guard. It is Thurgood's instrument, and Lina writes the predicate. It reads every attribute on a packed web tag against that element's `observedAttributes` and `getAttribute`/`hasAttribute` reads (the hyphenated attribute names, not the schema's camelCase prop names), and every enumerated value against that prop's type union, plus a syntax check for CSS custom properties that reference themselves. It is proposed as an amendment to ballot `2026-10-26-governance-examples-guard` after v1 is built, due before the next release's walk. If it is not built by then, the standing question returns to Peter at that walk.

Where it sits against 3a and M7 (Thurgood): it covers only findings outside the walk record's rows, which 3a's "Knows" does not reach. It waives no row, so M7's "Only Peter waives a floor-class row" is untouched. It replaces only the practice of holding the tag for each new find, which is precedent, not law. Its authority is Peter's own release-scoped words.

Surviving counter-argument (Stacy, carried by Thurgood): disclosing a falsity in a record and the notes is weaker than M7's "fixed, not disclosed" for a reader who never sees the notes. The expiry, the pre-existing condition and Peter's override limit that cost but do not remove it.
````

**Confirmations** (relayed by the orchestrator, 2026-10-26, after the consolidated text was sent to each seat): Thurgood, verbatim, "CONFIRMED, no amendment"; Lina, verbatim, "CONFIRMED: my approval carries to the consolidated text". **Mine (Stacy, 2026-10-26, read at 17:07:46Z): CONFIRMED.** The consolidated text carries my four amendments as accepted. Two wordings differ from mine, and I accept both: clause 2 adds prose claims to what is not covered (narrower than my text), and clause 4 names WCAG 2.1 AA and lets any seat send a harmful find to Peter (sharper than my text). Clause 6's reader is Lina's sentence, which states my correction of fact.

### The three approval texts (verbatim)

From `scratchpad/release-16.1.0/stopping-rule-draft.md`, sha1 `5b5266b94f34565252da3a2c660f3c0e1af89374` when I read it at 17:08Z. Each section is the file's text, unaltered, under its own label. The file holds no reconciliation note apart from the "Where it sits" paragraph at the end of Thurgood's section; the consolidated header records that he accepted all four of my amendments.

**Thurgood (release-flow owner), 2026-10-26: his AMENDED text, the text the other two seats approved against:**

````markdown
## AMENDED text (Thurgood, release-flow owner, 2026-10-26) — the current text for approval

1. **Scope**: release 16.1.0 only. It expires at the v16.1.0 tag. Making it standing for later releases needs a ballot, because it would amend how RELEASE-FLOW 3a treats findings made after the walk.
2. **Trigger**: a falsity in a fenced example in a packed `governance/**` doc that meets all three of these: it was found by any seat after the walk record's At-S section; it is not a walk row; it was already present at `v16.0.0`. Prose claims, agent charters, MCP contracts, and falsities introduced after `v16.0.0` are not covered. They go to Peter one find at a time.
3. **Effect**: it does not hold the tag. Its owner files a rule-10 record with a dated plan due before the next release's walk. The release notes disclose it in L57's form before step 7. A find made after the notes are final is disclosed by a record-only notes PR before step 7, or, after step 7, in the next release's notes. The phase-1 claims pass reads it as waived by this rule and cites the record.
4. **Limit**: this rule waives nothing that becomes a walk row. Any floor-class row stays Peter's to waive individually, in quoted, dated words (M7). Peter may also take up any find under this rule individually.
5. **First application**: RL-35 (CDG L422/L442 `variant="danger"`; L1682–L1693 `borderRadius=`), present at `v16.0.0`, in Lina's record with its dated plan.
6. **Class fix**: a behavior and attribute check, as a version bump of the governance-examples guard. It reads element attributes and their values against each component's schema props, plus a syntax check for CSS custom properties that reference themselves. It is Thurgood's instrument, and Lina writes the predicate. It is proposed as an amendment to ballot `2026-10-26-governance-examples-guard` after v1 is built, due before the next release's walk. If it is not built by then, the standing question returns to Peter at that walk.

Where it sits against 3a and M7 (Thurgood): it governs only findings outside the walk record's rows, which 3a's "Knows" does not reach. It waives no row, so M7's "Only Peter waives a floor-class row" is untouched. What it replaces is the habit of holding the tag per find, which is precedent, not law. Its authority is Peter's own release-scoped words. Why "present at v16.0.0": the case for waiving rests on the public 16.0.0 package already shipping these falsities; a falsity that 16.1.0 itself introduced has no such case.
````

**Stacy (claims passes), 2026-10-26, read at 17:03:04Z:**

````markdown
## Stacy's approval (2026-10-26, read at 17:03:04Z): APPROVED with four amendments (to the first draft; items 1, 4, 5 as written)

**Item 2, amended:** "Trigger: a falsity in an example in a packed `governance/**` doc. It is found after the walk record merged (`264c25661`, #469) and before the v16.1.0 tag, and it is not a walk row. It must be **pre-existing**: present in substance at `v16.0.0`. A falsity that a PR in the 16.1.0 delta introduced is the release's own claim. This rule does not cover it, and it holds the tag as before. MCP contracts (schemas and tool output) and agent charters are not covered; they stay fixed, not disclosed (M7)."

**Item 3, amended:** "Effect: it does not hold the tag. Before the tag, its owner files a rule-10 record, committed and pushed, which the phase-1 record cites by path @ SHA. A promise to file does not count. The owner classes the record under rule 12. Its dated plan is due before the next release's walk. If the fix is not an ancestor of the next release's S, the record lapses there and goes to Peter (rule 11). The release notes disclose it in L57's form: the find, the record, and this rule as the waiver. The notes line holds step 7, not the tag. The phase-1 claims pass reads it as waived by this rule and cites the record."

**Item 4, one sentence added:** "Peter may pull any single find out of this rule, in his own words, to fix it now. A find whose harm goes beyond a wrong example, such as an example teaching an accessibility or security violation, goes to Peter on its own and is not waived by this rule."

**Item 6, one correction of fact:** "The check must read each web element's own attributes (its `observedAttributes` and `getAttribute` reads, in hyphenated form) and its exported value unions. It must not read the cross-platform schema prop names: schema `borderRadius` is a real prop, so a check against schema props would pass RL-35 (B)."

How the phase-1 pass reads a find under it: recorded in full (promised / claimed / shipped, present at v16.0.0?, record path @ SHA), marked "waived under the 16.1.0 post-walk example-falsity rule", listed to Peter as a line, never an Open-for-Peter hold; a find failing any condition holds the tag as before.

Surviving counter-argument (Stacy): "disclosed in a record and the notes" is weaker than M7's "fixed, not disclosed" for a reader who never sees the notes; bounded by expiry, the pre-existing condition and Peter's override, not removed.
````

**Lina (CDG owner), 2026-10-26:**

````markdown
## Lina's approval (2026-10-26): APPROVED Thurgood's amended clauses 1–5 as written, clause 6 second sentence amended

> "It reads every attribute on a packed web tag against that element's `observedAttributes` and `getAttribute`/`hasAttribute` reads (the hyphenated attribute names, not the schema's camelCase prop names), and every enumerated value against that prop's type union, plus a syntax check for CSS custom properties that reference themselves."

Reason: a check against schema props would pass RL-35 (B), because `borderRadius` is a schema prop. Surviving counter-argument (Lina): the "present at v16.0.0" condition means a falsity 16.1.0 introduced into a fenced example still holds the tag one find at a time; that is the rule working as intended, not a gap.

RL-35 record: `.kiro/issues/2026-10-26-cdg-button-variant-and-container-attribute-examples.md` @ `2b6653fcb` (upkeep branch; P0, waived under the rule, trigger release:next:phase-1).
````

### RL-35 at the final S: waived under the 16.1.0 post-walk example-falsity rule

**Row: RL-35 → waived under the 16.1.0 post-walk example-falsity rule**, citing Lina's record `.kiro/issues/2026-10-26-cdg-button-variant-and-container-attribute-examples.md` @ `a4328afd0` (`origin/chore/post-16.1.0-record-upkeep`, head `a4328afd0` at 17:07:46Z; filing commit `05a491406`; `2b6653fcb` cites the rule's clauses; `a4328afd0` aligns its clause-2 bullet to the four conditions). Not an ancestor of S, by design: `git merge-base --is-ancestor 2b6653fcb 38f4ece47` fails.

**Clause 2, in my form** (promised / claimed / shipped is addendum 4's § "RL-35"; these are the rule's conditions):

| Condition | Finding (A): CDG L422 / L442 `variant="danger"` | Finding (B): CDG L1682–L1693 `borderRadius=` | Evidence |
|---|---|---|---|
| A falsity in a **fenced example** in a packed `governance/**` doc | yes: L422 in the `html` fence L418–L423; L442 in the `typescript` fence L438–L448 | yes: the `html` fence L1680–L1694 | packed CDG at S (`cp1-add4/`), byte-equal to `git show 38f4ece47:<path>` |
| **Found after the walk record merged** (`264c25661`, #469, 2026-10-25T12:28:40Z) **and before the tag** | yes: first recorded in addendum 4, `b0f618d14` (2026-10-26T16:47:18Z) | yes: same | `git log -1 264c25661`, `b0f618d14`; no `v16.1.0` tag at 17:07:46Z |
| **Not a walk row** | yes | yes | `git grep` at S over `.kiro/issues/**` for `variant="danger"`, `'danger'`, `borderRadius="`, `borderradius`: no hit on point (addendum 4) |
| **Pre-existing**: present in substance at `v16.0.0` | yes: v16.0.0 L415 and L435 | yes: v16.0.0 L1664–L1675 | `git show v16.0.0:governance/Component-Development-Guide.md` (addendum 4) |
| **Not introduced by a PR in the 16.1.0 delta** | yes: `git blame` at S gives `8b3872ec7` for L422 and L442, an ancestor of `v16.0.0`; `git log -S'variant="danger"'` and `-S"'danger'"` over `v16.0.0..38f4ece47` on the file: no commit | yes: `git blame` at S gives `4622c9bab` for every tag line of L1682–L1693 (the text lines are `2cdea0858`), both ancestors of `v16.0.0`; `git log -S'borderRadius="normal"'` and `-S'borderRadius="none"'` over the delta: no commit | run by me at S; Lina's record states the same from a byte comparison |

- **Clause 2's exclusions**: neither find is a prose claim, an MCP contract or an agent charter.
- **Clause 3**: the record is committed and pushed before the tag and cited here by path @ SHA. Lina classes it P0 false-claim · defect under rule 12, with the downgrade argument left to Peter. Its trigger is `release:next:phase-1` with a lapse condition (if plan item 1 is not an ancestor of the next release's S, it lapses there and goes to Peter). Its dated plan: (1) one CORRECTION PR, the same PR as her icon-example record's item 2, due before the next release's walk, with byte-exact replacements (L422 → `variant="tertiary" label="Learn More"`; L442's union with `tertiary`; `border-radius=` on L1682, L1683, L1689 and L1690); it also aligns L438–L446 with the shipped interface (`ButtonProps`, not `ButtonCTAProps`; `icon?: IconBaseName`, not `string`), which I had not raised; (2) addendum 4's (C), (D) and (E), in the same PR; (3) the clause-6 predicate (hers), beside Thurgood's build.
- **Clause 4, the harm test**: I do not read either find as teaching a WCAG 2.1 AA violation or a security weakness. (A) renders a Delete action with primary emphasis: a hierarchy fault, not a WCAG criterion, and the primary style's own contrast is the shipped one. (B) leaves both containers square, which has no accessibility effect. No seat has sent either to Peter on that ground.
- **Lina's citations, spot-checked at S**: Button-CTA `types.ts` L54 (`variant="tertiary" label="Learn More"`), L57 (`ButtonStyle`), L90 (`ButtonProps`), L173 (`icon?: IconBaseName`); `ContainerBase.web.ts` L167 (`'border-radius'` observed) and L306 (`getAttribute('border-radius')`); Container-Base `types.ts` L61–L65 (`BorderRadiusValue`); `ButtonCTA.web.ts` L515–L516 (the `<style>` in the shadow root). All true as cited.
- **Owed, not a tag item**: the release notes disclosure clause 3 requires (the find, the record, the rule as the waiver, in L57's form). Per the orchestrator, it is hunk (c) of Thurgood's notes grant. That grant record was not on `origin` at 17:08Z, so I have not read it. → **Thurgood**, before step 7.

### How this pass reads a find under the rule, from here to the tag

A find is recorded in full (promised / claimed / shipped, the five checks in the table above, the record path @ SHA) and marked "waived under the 16.1.0 post-walk example-falsity rule". It is listed to Peter as a line, never as an `**Open for Peter**:` hold. A find that fails any condition, or that a seat reads as clause 4's harm, holds the tag as before and goes to Peter on its own. The rule expires at the tag; it governs no later release.

### Open items at the final S (none holds the tag)

- **Step 7 (the GitHub release), Thurgood's notes PR, under a grant**: RL-32 (add #504 and #505 to L67's list); RL-33 (the file-shape and import counts, sourced from the guard ballot's census line L22 and Lina's R1, § 7, L224–L226; all three import defects ship); RL-35's disclosure (the rule's clause 3; his grant's hunk (c)).
- **The rule's clause 6**: the behavior and attribute check. Thurgood owns the instrument and Lina the predicate, due before the next release's walk; if it is not built, the standing question returns to Peter there. A standing version of the rule needs a ballot (clause 1).
- **Lina**: RL-31 (ii) and RL-35, both due in one CORRECTION PR before the next release's walk.
- **Carried unchanged**: RL-24 and RL-25 (`Delegate audit (Stacy-signed, Ada): 0 / 135 — no file at S (not run)`; `Peter sample (Stacy-signed): 0 / 135`); O-37; my three lapses (Start Up Tasks item 9), reported, with their `## Lapse` headings not appended in this record-only PR.
- **Phase 2** stays owed at the step-6 record's merge: `publish-rail liveness: owed`.

### Observations (not findings)

- **O-43 — the working files are not committed anywhere else.** The rule's text and the three approvals exist only in the orchestrator's scratch files and in this addendum. Lina's record points here for the approved text. If those files change after my reads, this addendum's quoted bytes and sha1s are the record.
- **O-44 — Lina's record still says "Thurgood's amended text" in its § "Waiver" paragraph**, while its clause-2 bullet now follows the consolidated four conditions. The record points here for "which text the seats approved", so a reader lands on the right text. A wording residue, not a falsity. → Lina, at her next edit of the record.

### Standards implications (this addendum)

For Thurgood, read in full.
- **RS-47 (new)**: a release-scoped rule ordered in chat and approved by seats has no ratification home in the ballot protocol. Here a claims-pass record holds it, by the rule's own Authority line. That works for one release, but a claims pass is the auditor's record, not a law home: if the rule is made standing (clause 1's ballot), the ballot is its home and this addendum is history. **Owner**: Thurgood (the ballot protocol), with Peter.
- **RS-44, answered for the next release**: the rule's clause 6 is the check RS-44 asked for, with the reader corrected to the element's own attributes.

**Standards implications: list — RS-47 (new); RS-44 answered by clause 6.**

### Method (this addendum)

**Run by me** (worktree at `b0f618d14`, branch `chore/release-16.1.0-claims-pass-phase-1`; `git status --porcelain` empty before, and only this file after):
- `git fetch origin`; `git rev-parse` of `origin/main` and the upkeep branch; `git log`, `git show`, `git diff 2b6653fcb a4328afd0`; `git merge-base --is-ancestor`; `git blame -L` and `git log -S` on the CDG over `v16.0.0..38f4ece47`; `git show 38f4ece47:<path>` for Lina's source citations; `git ls-remote --tags origin`;
- the two scratch files read and hashed with `shasum`, and their text copied into this addendum by a script, byte for byte.

**Not run**: a new 5.1 (nothing packed changed); the 3a greps (no `.kiro/issues/` path changed on `main` since addendum 4, where they ran at S); any browser or compile (the readings are addendum 4's); `gh` (no credentials, none read).

### Forced negative (this addendum)

- **No find is re-read here.** RL-35's promised / claimed / shipped is addendum 4's; this addendum checks the rule's conditions and the record.
- **Not read**: Thurgood's notes grant (not on `origin`), so the RL-35 disclosure is owed on his word, not my read.
- **Waived, not fixed**: RL-35 and RL-31 (ii) ship false in 16.1.0's CDG, disclosed in records and, before step 7, in the notes.

### Surviving counter-argument

The rule makes "disclosed in a record and the notes" enough for pre-existing served examples for the rest of 16.1.0. For an agent reading the CDG through the MCP, who never reads the notes, the examples are as false as before, and M7's "fixed, not disclosed" names exactly that reader. The expiry at the tag, the pre-existing and not-introduced conditions, the harm test and Peter's override bound the cost; they do not remove it. My own part in the cost: both RL-35 finds could have been fixed for the price of one more S if I had read the CDG for behavior at addendum 3. The rule exists partly because my method arrived one round late.

---

## Phase 2 (2026-10-26): publish verification, rail, two-registry record, step 7, cold-install smoke

**Auditor**: Stacy (a fresh seat; phase 1 and addenda 1–5 were earlier instances of mine).
**Trigger**: the merge of the step-6 release-record PR **#509**, squash `09be7b0a0bc467af22fb8622dbb4a6371fb41f13`, merged 2026-10-26T17:51:49Z (public API `pulls/509`: head `e15ddbd08`, 4 commits). The notes-fix PR **#508** merged after it, squash `0218632d1dc07f3ce3ec5731eff92b14aeb0693e`, 2026-10-26T17:52:01Z (head `845a8ac72`, 2 commits).
**Drafted after both merges**, on branch `chore/release-16.1.0-claims-pass-phase-2`, cut from `origin/main` = `0218632d1`. Every read of #509's and #508's files is of the merged commits. Reads taken 17:53:24Z → 18:01:34Z, each time from `date -u` when taken.
**Placement**: appended after addendum 5, the end of the file. Phase 1's and the addenda's text are unchanged.

**Standards implications: list — two new items (RS-48, RS-49); RS-37 answered for its record half; RS-28 and RS-43 not evidenced in this delta. § "Phase 2 standards implications" below.**

> **No pass, at any grain, is ever a required check, a review gate, or a blocking condition on any PR.** This section gates nothing. #509 and #508 merged before it, and step 7 ran before it was written.

### For the reader (read this first)

- **`publish-rail liveness: PASS` — read and committed (2026-10-26).** Rail run 2, `PASS: @3fn/core@16.1.0 visible on npmjs; tarball host verified`, `EXIT=0` at 17:35:22Z, is in `docs/releases/16.1.0/publish-verification.txt`, merged by #509 at `09be7b0a0`. Run 1, `FAIL[version] … (HTTP 404)`, `EXIT=10` at 17:32:47Z, is in the record too, in order. The merge-confirmation below records the read.
- **One tarball is on both registries, and it is the audited one.** All four 6b sha1s equal the 5.3 record's `cc42f4f9897677ee53b3f75d18ef52535a346c6a` (1694 files, 6590393 bytes). I re-measured the npmjs half myself, and `cmp` shows the npmjs bytes identical to the kept 5.3 tarball. Against my phase-1 tarball (5.1 at the final S, `e3d86894…`), the published bytes differ in exactly the three timestamp files.
- **Step 7 is done.** GitHub release "Release 16.1.0" for `v16.1.0`, published 2026-10-26T17:56:29Z, Latest, not a draft or prerelease. Its body is byte-equal to `docs/releases/release-16.1.0.md` at `0218632d1` (#508).
- **RL-32 and RL-33 are fixed in the notes, and the RL-35 disclosure is present** (#508). O-36 closes with them.
- **One new finding, RL-36 (Low, process; no shipped effect)**: the out-of-flow re-publish of the 16.0.0 tarball in 16.1.0's 5.4 window. It changed no registry record. It is classed below.

### What phase 1 left owed, and the reading

| Owed (phase 1 "To phase 2", addenda 1–5, the brief) | Reading | Result |
|---|---|---|
| 1. Tag `v16.1.0`, on the final S | `git ls-remote --tags origin`: `refs/tags/v16.1.0` = `145254cd7831ef802178ca53c48026a185da34d8` (annotated), `^{}` = `38f4ece47c425cc83cac6739cae7a1806bfb0818`, the final S of addenda 4 and 5 (#505). Tag object: `tagger Peter Michaels Allen … 1793035074 -0400` = 2026-10-26T17:17:54Z, message "Release 16.1.0 (release 5) at 38f4ece47…". That is after addendum 5's last read (17:08:10Z, no tag on `origin`) and before the 5.3 record's `createdAt` (17:28:33.583Z). S is an ancestor of `origin/main`. The tag's push time (17:17:56Z) is the orchestrator's clock, not mine | ✅ |
| 2. 5.3 / 5.4 | One 5.3 publish to GitHub Packages (attempt 1 refused by the RS-31 preflight before any build; attempt 2 one run). One flow 5.4 publish to npmjs, sha1 checked against the file first (`.txt` L106–L107). **Plus one out-of-flow publish of the 16.0.0 tarball before it** (RL-36) | ✅ for the flow; RL-36 |
| 3. Rail result, every run pasted (RS-17) | `.txt` § 6a: run 1 FAIL `EXIT=10` (17:32:47Z), run 2 PASS `EXIT=0` (17:35:22Z), each with its clock lines. Between them the operator read the packument (17:32:53Z, 17:33:28Z: no `time["16.1.0"]`) and re-ran by hand 35.6 s after the registry's `time["16.1.0"]` = 17:34:46.376Z. That is step 6's rule followed as written. The reading of run 1 (npm's processing window, not a missing publish) rests on the orchestrator's message-receipt clock bound (before 17:32:28Z) and Peter's paste of npm's "being processed" notice; it is not re-verified by me, and the publish's own completion time is unmeasured, as the record says | ✅ |
| 4. 6b: four sha1s equal the 5.3 record | § "The two-registry read" | ✅ `cc42f4f9…` ×4 (the GitHub Packages two read from the record) |
| 5. Published bytes against phase 1's tarball (expect only the timestamp files to differ) | The npmjs tarball (my fetch) against my kept 5.1 dry run at the final S (`cp1-add4/3fn-core-16.1.0.tgz`, sha1 `e3d86894fbaba47f765ff4b8c6bb488a71cb15e7`, equal to the orchestrator's `dp-release-ImV9at` copy). Both extracted; `diff -rq` → exactly **3 files**, one line each: `dist/mcp/tool-manifest.json` `generatedAt` 17:28:29.754Z vs 16:36:12.448Z; `dist/types/generated/TokenTypes.{d.ts,js}` `Generated:` 17:28:18.236Z vs 16:36:02.067Z. No other path differs, and none is missing. **Every phase-1 and addendum reading of the packed artifact carries to the published bytes**, the waived falsities (RL-22, RL-29 index half, RL-31 (ii), RL-35) included | ✅ |
| 6. Cold-install smoke | § "Cold-install smoke" | ✅ (narrow) |
| 7. Merge-confirmation line | Drafted after #509's merge, so the line records the read rather than a re-read. § "Merge-confirmation" | ✅ |
| 8. Delegate audit (Ada) and Peter's sample | Not run. No `delegate-audit-*` file anywhere under `.kiro/specs/` at `0218632d1` (`git ls-files`: 0). `Delegate audit (Stacy-signed, Ada): 0 / 135 — no file at 0218632d1 (not run)`. `Peter sample (Stacy-signed): 0 / 135`. **N = 135 is unchanged**: no PR after S touches `canonical/profiles/` (`git diff --name-only 38f4ece47 0218632d1`: 0 such paths), so no signature event entered the population. **RL-25's record half is now met**: Thurgood's trigger-(d) record `.kiro/issues/2026-10-26-signing-chain-delegate-audit-not-run-trigger-d.md` landed in #507 (`aff9a6e7b`), owner Thurgood, Class P2 (guard), Trigger `release:next:phase-1`. The walk itself carries | owed (carries) |
| 9. J's blind seats | Not run. This seat cannot spawn seats. The packets are mine to author on request | owed (carries) |
| Step 7 (GitHub release) | **Done.** Public API `releases/tags/v16.1.0` at 17:57:19Z: `name` "Release 16.1.0", `tag_name` `v16.1.0`, `published_at` 2026-10-26T17:56:29Z, `draft` false, `prerelease` false, author `3fn`; `releases/latest` → `v16.1.0`. **My own earlier read at 17:56:14Z returned 404**, 15 s before `published_at`: both reads are consistent with the timestamp. The release body hashes to `5b5c6b680e99c24bb9b0cf4083104604dcb3d55d`, 25,683 bytes, the same sha1 and size as `git show 0218632d1:docs/releases/release-16.1.0.md`. Step 7 followed step 6's rail PASS and a matching 6b record, as the step requires. **R-3**: the notes state no guard as applied before the step that applies it: L59 and L60 say the governance-examples guard "was ratified in #495 and is not built yet". The orchestrator relayed Peter's `gh release view` read at 17:56:53Z; my read is independent of it | ✅ |
| ARMING at #509's or #508's merge | **Nothing arms, and nothing was owed.** Neither PR touches `.github/**`, a register, a gate list, an instrument path or `.github/in-lane-guards.json`. #509: `docs/releases/16.1.0/publish-verification.txt` (added) and the files grant's close and archive move. #508: `docs/releases/release-16.1.0.md` and the notes grant's close and archive move | ✅ no ARMING event |

### The two-registry read

| | registry.npmjs.org | npm.pkg.github.com |
|---|---|---|
| `time["16.1.0"]` | `2026-10-26T17:34:46.376Z`. **My read** (packument, 17:56:13Z, no credentials) | `2026-10-26T17:28:36Z`. **The orchestrator's measurement** (`.txt` L252) |
| `dist-tags.latest` | `16.1.0` (my read). `time.modified` `2026-10-26T17:34:47.267Z`, 0.891 s after `time["16.1.0"]`: nothing has modified the packument since the 16.1.0 publish | — |
| `dist.shasum` / `fileCount` | `cc42f4f9897677ee53b3f75d18ef52535a346c6a` / 1694 (my read; `unpackedSize` 23,672,543) | `cc42f4f9…` (the orchestrator's `npm view`, `.txt` L195) |
| Fetched-bytes sha1 | `curl -s …/core-16.1.0.tgz` (17:56:22Z) → `cc42f4f9897677ee53b3f75d18ef52535a346c6a`, 6,590,393 B, `tar -tzf \| wc -l` 1694 | `cc42f4f9…`, 6,590,393 B, 1694 (the orchestrator's `npm pack` from the main checkout, block 3, and Thurgood's local re-read, `.txt` L262–L267) |

**Against the 5.3 record**: the `.txt` pastes the record JSON (L24–L41): `mode` `publish`, `commit` = the final S, `sha1` `cc42f4f9…`, `fileCount` 1694, `bytes` 6590393, `checks` 105/105, `publishedTo` `["https://npm.pkg.github.com"]`, `createdAt` 17:28:33.583Z. The kept 5.3 tarball (`scratchpad/release-16.1.0/publish-5.3/3fn-core-16.1.0.tgz`) is byte-identical to my npmjs fetch (`cmp`, no output). **One tarball is on both registries. No release incident.**

**The GitHub Packages column is not re-verified by me.** The read needs the main checkout's `.npmrc` auth, which this seat does not hold and did not attempt. **The three failed 6b attempts** (a GitHub curl that returned nothing, an `npm view` with an extra token flag → E403, an `npm pack` outside the main checkout → E401) are pasted in order, and each is superseded by the flow's command from the main checkout. They are what step 6's "Run every 6b command from the MAIN checkout" sentence predicts (A2). No reading rests on them. Not a finding.

**The 5.1 sha1 differs from the 5.3 sha1 by design** (`.txt` L60): 5.3 rebuilds at the tag, and the build re-stamps the three files above. My five-row check confirms that is the whole difference.

### RL-36: Low (process; no shipped effect) — the 16.0.0 tarball was published to public npm again, out of flow, inside 16.1.0's 5.4 window

- **Promised** (RELEASE-FLOW 5.4): "Publish the same tarball to public npm (Peter's terminal, web 2FA): first check the printed sha1 against the file, then run `npm publish <tarball> …`". The tarball is the one 5.3 printed for this release, and the flow names one 5.4 publish per release. "Never a tarball the script did not produce."
- **Claimed** (the step-6 record, `.txt` L81–L103 and L133–L138): after the npm login and before the flow's 5.4, Peter's terminal ran `npm publish …/dp-release-vFNgYW/out/3fn-core-16.0.0.tgz --registry=https://registry.npmjs.org --@3fn:registry=https://registry.npmjs.org --access public`. npm printed `npm notice shasum: e9d8bfca…`, `total files: 1675`, "Publishing to https://registry.npmjs.org with tag latest and public access", the 2FA prompt, "Your package is being processed and may take a few minutes to become available." and `+ @3fn/core@16.0.0`. The record does not adjudicate it, and leaves the class to this pass.
- **Shipped** (what the registry holds; my reads, 17:56:13Z → 17:56:23Z):
  - `time["16.0.0"]` = `2026-10-16T14:52:24.127Z`, the 16.0.0 record's value;
  - `versions["16.0.0"].dist.shasum` = `e9d8bfca5371eacc6fdf30579a512b280c1c165a`, `fileCount` 1675;
  - the fetched `core-16.0.0.tgz` hashes to `e9d8bfca…`, 6,494,583 B, 1675 entries: the 16.0.0 phase-2 values, byte for byte;
  - `time.modified` = 17:34:47.267Z, the 16.1.0 publish. The orchestrator's reads at 17:32:53Z and 17:33:28Z, after the 16.0.0 command had printed its success line, showed `time.modified` still on 2026-10-16 and `dist-tags.latest` 16.0.0. So the 16.0.0 command modified the packument neither before 16.1.0's publish nor after it;
  - `dist-tags.latest` = `16.1.0`;
  - GitHub Packages' `time["16.0.0"]` = 2026-10-16T14:31:56Z, unchanged (the orchestrator's read). The command named npmjs only.
- **The claim is true and complete.** The record pastes the command, its whole output and the registry state, without a reading. That is the disclosure RS-17 asks for. Nothing in the record is false.
- **My classing**:
  - **It is a finding, not an observation**, because something ran on the public registry, in the release's publish window, under a release operator's 2FA, that the flow does not contain. The flow's promise is about which command runs at 5.4, not only about what the registry ends up holding.
  - **Class: process (an operator act outside the flow), Low, with no shipped effect.** It is not a release incident (step 6's incident is a 6b mismatch; there is none) and not a claim falsity (the record is honest). No consumer can observe it: the registry's record of 16.0.0 is the one the 16.0.0 record verified, and `latest` is 16.1.0.
  - **Why it had no effect is the registry's immutability, not the flow.** npm will not overwrite a published version. The same property made 16.0.0's duplicate 5.3 run safe (RS-32). The flow has no guard of its own against a second `npm publish` in Peter's terminal.
  - **The letter of 5.4 does not bar it.** "Never a tarball the script did not produce" is met: the 16.0.0 tarball was the script's, for 16.0.0. The sentence binds the tarball's producer, not its version (RS-49).
  - **Its cause is not on record**, and I do not infer one. The act is Peter's.
  - **What a CLI success line is worth** is O-45.
- **Route**: **Peter**, for information: it is his terminal's act, and this is a statement, not a question; nothing waits on an answer. **Thurgood**: RS-48 and RS-49 (RELEASE-FLOW text).

### The notes at `0218632d1` (#508): RL-32, RL-33, RL-35's disclosure, O-36

| Item | Reading at `0218632d1` | Result |
|---|---|---|
| **RL-32** (L67's post-F list omits #504; widened to #504 and #505) | Now L69. It lists #486, #488, #489, #490, #491, #494, #496, #499, #500, #502, #503, #504 and #505, and names the record-only #498, #501, #506 and #507 ("such as"). **My own derivation**: `git log --first-parent de63033b9..aff9a6e7b`, each commit's changed paths against `files[]` and its build inputs (`canonical/` agents and profiles, `src/`, `tools/agent-generator/`), tests excluded. The commits that touch a shipped path or a build input are exactly those 13. The other 11 (#474, #480, #485, #487, #492, #495, #497, #498, #501, #506, #507) touch none. The "No trio run saw these changes" list gains #494's bump and CHANGELOG entry, #504's names and caveat, and #505's CSS example | ✅ fixed |
| **O-36** (#494 not named) | L69 names #494, with what npm packs from it (`package.json`, `CHANGELOG.md`, `README.md`). My derivation agrees: #494 touches those three, plus paths that do not ship. The step-6 record also names it (`.txt` L19) | ✅ closed |
| **RL-33** (F-3's count for the token-name half only; erratum in addendum 4) | New L60 carries the declared-path, token-file-shape and import counts: 10 of 16 (9 missing or ambiguous, L699 correct), shape 2 (CDG L576, L956), imports 3 of 7, all real (CDG L1108, Token-Family-Blend L88, Token-Family-Layering L76). **Checked against its sources**: the guard ballot's census line L22 ("Declared paths: 10 failing of 16, of which CDG L576 and L956 also fail the shape rule. Import surface: 3 failing of 7 package-importing blocks") and `[LINA R1]` § 7 (the three import sites, "all three are real consumer defects"). **Checked at S** (`git show 38f4ece47:<path>`): CDG L577 `// ButtonCTA/tokens.ts`, L963 `// tokens.ts`, L1117 `import { getBlendUtilities } from '@3fn/core/ThemeAwareBlendUtilities';`; Token-Family-Blend L93 the same subpath; Token-Family-Layering L78 `import { zIndexTokens } from '@3fn/core';`; the `exports` map has `./blend` and no `ThemeAwareBlendUtilities` subpath; `files[]` lists `governance/`. L60's "only the Component Development Guide changed between `a95d6bf3d` and this release's S" holds: `git diff --stat a95d6bf3d 38f4ece47 -- governance/` names the CDG, `classification-map.md` and `platform-implementation-guidelines.md`, none of them the other cited docs | ✅ fixed |
| **RL-35's disclosure** (the rule's clause 3: the find, the record, the rule as the waiver, in L57's form) | New L61: the find (L422, L442 `variant="danger"`; L1682–L1693 `borderRadius=`), the record (`…cdg-button-variant-and-container-attribute-examples.md` @ `a4328afd0`, "merged in #507"), and the rule in one sentence with its exclusions and its expiry at the tag, pointing to addendum 5 (`838869cf0`, "merged in #497"). **Checked**: the record's blob at `a4328afd0` equals its blob at `aff9a6e7b` (#507), `466cf2a4…`; this file at `838869cf0` equals its copy at `55c218cfd` (#497's squash), `git diff`: empty. L61 also discloses RL-29's index half and RL-31 (ii), with Peter's words and their records | ✅ present |
| L55 "Five additions" | L57–L61: five bullets | ✅ |
| The notes grant | `.kiro/issues/archive/2026-10-26-release-16-1-notes-grant.md`: activated by #506 (`f727cf6bf`); #508's diff is `docs/releases/release-16.1.0.md` (8 insertions, 2 deletions in four places: L55, L60, L61, L69) plus the grant's own close line and archive move. On the grant's path list. Closed and archived at its fixing PR's merge (rule 5) | ✅ (O-47) |
| The files grant | `.kiro/issues/archive/2026-10-25-release-16-1-files-grant.md`: closed and archived in #509, at that PR's merge. #509's other path is `docs/releases/16.1.0/publish-verification.txt`, the grant's last open path | ✅ (O-46) |

**What the notes do not change**: they are not packed. The tagged tree's copy (`git show 38f4ece47:docs/releases/release-16.1.0.md`) is the pre-#508 text; the GitHub release body is the `main` copy (above). That is the order addendum 3 named for RL-32.

### Cold-install smoke

Public registry only, in a new empty directory (`ls -A`: 0 entries) with no repo `.npmrc` above it, the registry named twice. Run 2026-10-26T17:59:39Z → 18:00:42Z, node v22.20.0, npm 10.9.3.

```text
$ npm init -y && npm install @3fn/core@16.1.0 --registry https://registry.npmjs.org --@3fn:registry=https://registry.npmjs.org --ignore-scripts
  exit 0; npm ls → @3fn/core@16.1.0
  lock: resolved https://registry.npmjs.org/@3fn/core/-/core-16.1.0.tgz, integrity sha512-qD/kAQJ9wWXXH… (the .txt's prefix)
  node_modules/@3fn/core/package.json version → 16.1.0
$ npx designerpunk --help        → exit 0, 45 lines ("DesignerPunk Pipeline CLI" …); the directory still holds only node_modules, package.json, package-lock.json
  present: dist/mcp/{docs-mcp,application-mcp,product-mcp}.js + tool-manifest.json; scripts/owed-set.sh; docs/consumer/INSTALL.md
  CHANGELOG.md L7: "## [16.1.0] — 2026-10-26 — Release 5 (…)"            (RL-21's date: reaches the consumer)
  CHANGELOG.md L11: "… One shipped file pair was removed, …"            (RL-20's fix: reaches the consumer)
  "other Kiro agents were run": 0 hits                                    (RL-19's fix: reaches the consumer)
```

JSON-RPC over stdio to the installed bundles, from a probe script kept outside the install (`scratchpad/cp2-probe/probe.cjs`):
- **Docs MCP**: 8 tools. `get_index_health` → `healthy`, 84 documents / **2,537** sections / 331 cross-references. That is O-23's reading again: the packed overviews say 2,535. **Booting it wrote nothing into the consumer's directory**: no `mcp-server/logs/` (16.0.0's O-5 reproduced there; here it does not). That matches notes L30, "logs leave the working directory" (#405, #411).
- **Application MCP**: 21 tools. `get_component_health` → `healthy`, 34 components, 9 patterns, tokens 217 / 193 / 33, `staleFiles: []`. `get_token_consumers("color.action.primary")` → a bare array naming DesignerPunk's components (Button-CTA, Button-Icon, Chip-Base, …), as notes L29 says. `validate_assembly` on a `Container-Base` `semantic: "form"` with an input and no Button-CTA → the `form-needs-submit-action` accessibility warning, whose message carries #488's text: "On web, Button-CTA does not submit a form by itself: it renders type="button" and is not form-associated, so call form.requestSubmit() …" (O-48 for the same call's schema error).
- **Not run**: a browser (#482's `variant`/`onPress`, #450's form submission, #471's reset); `init` / `generate` / `sync` in the installed project (#489's stop, #470's index check); any native toolchain (`not re-verified — toolchain unavailable`). The smoke shows the published package installs, its CLI starts, and three served claims reach a consumer. It shows nothing about the web components.

### Carried items — status now

| Item | Now |
|---|---|
| RL-19, RL-20, RL-21 | ✅ fixed (addenda 1–2), and **the fixes reach the consumer** (installed CHANGELOG, above; the file is not in the three-file diff set) |
| RL-22 | waived for 16.1.0 ("(i)"), and it ships: published `dist/consumer-canonical/agents/stacy.md` is byte-equal to the audited copy. Thurgood's record now carries the waiver (`…owed-set-law-text-after-closing-commit-anchor.md`, his 2026-10-26 entry, #507); the fix rides #473's follow-on, whose kind is still Peter's question on #473. Trigger `release:next:phase-1` now resolves to the release after 16.1.0 |
| RL-23 | put to Peter at phase 1; unchanged. **No post-S PR repeats it**: #506, #507, #508 and #509 put no question to Peter (no `**Open for Peter**:` line, no question naming him; public API bodies) |
| RL-24 | unchanged (Thurgood: link 6 through pull refs, H3, the double candidate, link 7 on ncc rows, #416). No new signing acts after S |
| RL-25 | record half met (#507, above); `Delegate audit (Stacy-signed, Ada): 0 / 135 — no file at 0218632d1 (not run)`; `Peter sample (Stacy-signed): 0 / 135`. Carries to the next release |
| RL-26 | acknowledgement owed (Thurgood); unchanged |
| RL-27, RL-28 | ✅ fixed (addendum 2) |
| RL-29 | guide half fixed (#504); index half waived, record Ada's, disclosed at notes L61 ✅ |
| RL-30 | **count 4, unchanged** (#500, #502, #504, #505). #508 carries four CORRECTION lines. They are not required, since `docs/releases/` is not a governance path, and each cites this record at a commit that resolves (`737ff3e4e`, `b0f618d14`, `838869cf0`: commits; the file at `838869cf0` equals its squash copy). Not the RL-30 class |
| RL-31 | (i) fixed (#505); (ii) waived, record Lina's, disclosed at L61 ✅ |
| RL-32, RL-33, O-36 | ✅ (above) |
| RL-34 | unchanged (Lina, the pointer lines; Ada, item 5) |
| RL-35 | waived under the 16.1.0 post-walk example-falsity rule; disclosed at L61 ✅. The rule expired at the tag (17:17:54Z) and governs nothing after it. Lina's one CORRECTION PR (RL-31 (ii), RL-35, addendum 4's (C)–(E)) is due before the next release's walk |
| O-37 | carries: the write authority of #500, #502, #504 and #505 (Peter-merged CORRECTIONs by the files' content owners, riding no grant) is not read |
| O-40 / RS-45 | method (mine). This phase read whole surfaces for each item it checked: the notes file whole, the step-6 record whole |
| **My three lapses** (Start Up Tasks item 9) | `2026-10-24-steward-verb-carve-out-drop-limb-unapplied`, `2026-10-24-token-promotion-three-routes-never-run`, `2026-10-25-arming-read-class-option-fork`. `./scripts/issues-owned.sh Stacy` at `0218632d1` prints each as `due:next`, with no `## Lapse` heading in any of them (last touched at #469). **They lapsed at the 16.1.0 S, and a record still open after a lapse lapses again at each later release's S** (README rule 11). Reported here, as item 9 allows. **This is the seventh section of this record to report them without appending the headings** (phase 1 and addenda 1–5). That is my own deferral, and it is a duty, not a reading: the headings go in a separate `.kiro/issues/**` PR in my standing scope, never in a record-only claims-pass PR. `arming-read-class-option-fork`'s question, Line A, is still Peter's |
| J blind seats (16.1.0's, 16.0.0's 2, 15.1.0's 4) | not run; owed |
| The rule's clause 6 (behaviour and attribute check) | Thurgood (instrument) and Lina (predicate), due before the next release's walk |
| RS-33 … RS-47 | for Thurgood. His composed-loop outcome line for this pass is owed (`.kiro/issues/2026-10-24-composed-loop-outcome-lines-missing.md`) |

### Phase 2 findings and observations

**One finding: RL-36** (above). Observations, not findings:
- **O-45 — npm's `+ <pkg>@<v>` line is not evidence of what the registry accepted.** It printed success twice in one terminal session. For 16.0.0 it printed success and the registry recorded nothing. For 16.1.0 it printed success and the version stayed invisible for at least 1 min 59.4 s (16.0.0's own window was 10 min 59 s). In both cases npm's notice said the package "is being processed". The packument's `time["<v>"]` and the rail are evidence; the CLI line is the operator's report of a request. Every reading in this phase rests on the former. → RS-48.
- **O-46 — the files grant's close line enumerates one act, and the PR had two under its path.** The archived grant (closed by `971c103f6`, 17:43:15Z) says the path's "one act under it is `docs/releases/16.1.0/publish-verification.txt` (commit `76238378b`)". `e15ddbd08` (17:44:56Z, after the close) also wrote that file: the clock-bound lines (L150–L151). Both are on the granted path, so nothing ran outside the grant. The close line was true when written and is short by one commit at the merge. Cosmetic. → Thurgood.
- **O-47 — the notes grant's close line and #508's body disagree on Lina's read.** The archived grant says "no count differs … and Lina's read was not asked". #508's body says "Lina — read hunk (b) at `845a8ac72` after the commit …: CONFIRMED". The two are probably sequential (the close line is in `845a8ac72` itself), but the committed record now says the opposite of the PR body, and Lina's confirmation has no committed trace: no PR comment (`issues/508/comments`: 0), no commit. **Counted as a self-attested consult, not a finding**; L60's counts are true on my own read regardless. → Thurgood (the close line, at his next edit of an archived grant, if he wants it to match).
- **O-48 — `form-needs-submit-action` fires on `semantic: "form"`, which Container-Base's schema refuses.** The same `validate_assembly` call returns the error `Prop "semantic": invalid value "form" — allowed: 'div' | … | 'fieldset'` and the form-submit warning. The checker's `FORM_SEMANTICS = ['form', 'fieldset']` dates from `89d20533d` (2026-03-21), and is unchanged at `v16.0.0`. It is not new in 16.1.0, and nothing is false (the message echoes the input). A consumer who reads the warning alone may try a value the schema refuses. → Lina (whether the checker's set should follow the schema).
- **O-49 — the step-6 record's ordering facts are accounts, labelled as such.** "His 5.4 ran before #506's merge … and #507's … on the orchestrator's instruction 'publish first, merges after'; that ordering is the orchestrator's account, not a clock read" (`.txt` L150). That is the right form (RS-8). Noted only because RL-36's "before the flow's 5.4" rests on the paste's order, not a clock. The registry facts do not depend on it.

### Phase 2 counting block (delta)

- **The release delta is fixed at the final S.** Phase 2's population is the four PRs after it: #506, #507, #508, #509 (plus my own #497, not self-audited). **No new parents, subtasks or signing acts.** Every phase-1 and addendum count stands.
- **Orchestrator consult line**: population 0. None of the four touches a trigger surface (#507 touches a Spec 129 inbound note, not its `requirements.md` or `design.md`). All four carry a `**Consulted**:` line anyway. #508's names Lina's read, self-attested (O-47); #509's is `none needed — record of command output, …`.
- **Governance edit kinds**: population 0 (no governance path after S: `git diff --name-only 38f4ece47 0218632d1`, 0 hits under `governance/`, `.kiro/steering/`, `.kiro/hooks/RELEASE-FLOW.md`, `canonical/`, `.kiro/docs/ballots/`). #508 and #509 carry `**Edit kind**:` lines on `docs/releases/` voluntarily.
- **Instrument census**: no ballot added after S.
- **Re-grounding dispositions, delegated-tier, instruments, M3/M4/M5**: no new population.
- **Carve-out data**: 0 steward-verb-gated claims in phase 2.
- **Method fraction**: of the `.txt`'s 6b readings, I re-measured the npmjs half (time, latest, modified, `dist.shasum`, file count, fetched-bytes sha1, bytes) and both comparands (the 5.3 record's sha1 against the kept 5.3 tarball by `cmp`; my 5.1 tarball by `diff -rq`), plus the 16.0.0 registry facts RL-36 rests on. **The GitHub Packages four are the orchestrator's measurement, not re-verified.**

### Phase 2 method

**Run by me** (worktree on `chore/release-16.1.0-claims-pass-phase-2` at `0218632d1`; `git status --porcelain` empty before, and only this file after):
- `git ls-remote --tags origin`, `git cat-file -p` on the tag object, `git merge-base --is-ancestor`, `git log --first-parent` over `de63033b9..aff9a6e7b` with each commit's changed paths, `git show <sha>:<path>` for the notes, the CDG, Token-Family-Blend, Token-Family-Layering, `package.json` and the ballot, `git diff --stat`/`--quiet`/`--name-only`, `git hash-object` on Lina's record at two SHAs, `git rev-parse` on the step-6 blob at three SHAs;
- the public API (no credentials): `pulls/{506,507,508,509}`, `pulls/{508,509}/commits`, `issues/{508,509}/comments`, `releases/tags/v16.1.0` (twice: 404 at 17:56:14Z, published at 17:57:19Z), `releases/latest`;
- the npmjs packument and both tarball fetches, `shasum`, `wc -c`, `tar -tzf | wc -l`, `cmp` against the kept 5.3 tarball, extraction and `diff -rq` against my 5.1 tarball;
- the cold install, `npx designerpunk --help`, the four MCP calls, greps of the installed package and of the installed Application MCP bundle;
- `./scripts/issues-owned.sh Stacy`.

**Read, not re-run**: the GitHub Packages registry (auth); 5.3 and 5.4 (Peter's terminal); the rail runs (the orchestrator's); the orchestrator's packument reads at 17:32:53Z and 17:33:28Z, which RL-36's "before" half rests on.

**Not run**: a browser; `init` / `generate` / `sync`; any native toolchain; the root suite (no code changed after S); J; the delegate walk.

**Writes**: this file; in the session scratchpad, the API reads (`cp2-api/`), the fetched and extracted tarballs (`cp2-tgz/`), the smoke project (`cp2-smoke-161/`) and the probe script (`cp2-probe/`). No credentials were read. No git write besides this commit.

### Phase 2 standards implications

For Thurgood, read in full.
- **RS-48 (O-45, RL-36)**: step 6's sentence "If the packument … has no `time["<version>"]`, the version is not published yet. A 404 is then the correct answer, not indexing lag" now has a second reading, measured twice (16.0.0, 16.1.0): under npm's "being processed" notice, an absent `time["<v>"]` can mean "accepted and still processing". The rail's answer was right both times; the sentence's stated cause is what has two readings. The step-6 record raises the same point (`.txt` L152). A related question for the same text: whether it should say that npm's `+ <pkg>@<v>` line is not evidence of acceptance, since RL-36 shows it printing for a publish the registry did not record. **Owner**: Thurgood (RELEASE-FLOW text). I name it and do not draft it.
- **RS-49 (RL-36)**: 5.4's "never a tarball the script did not produce" binds the tarball's producer, not its version. A previous release's 5.3 tarball meets it. Registry immutability made RL-36 harmless. It would not make harmless a publish of a different version under `--tag latest` (the default the paste shows), which is where a stray 5.4 command has a consumer-visible failure mode. RS-7 says guards live in the command the operator runs, and 5.4's command is typed by hand. Whether 5.4 should be bound to the version, in the text or in a command the script hands over, is the question. **Owner**: Thurgood (the text), with Ada (the script, under § 2.6 of the six-roots ballot). Not drafted here.
- **RS-37, answered for its record half**: the trigger-(d) record exists (#507). The class fix it names, a pre-phase-1 owed item for the delegate file, is Thurgood's LAW edit, not yet drafted.
- **RS-28 and RS-43: not evidenced in this delta.** No post-S PR outran a question to Peter, and #508's CORRECTIONs resolve.

**Standards implications: list — RS-48 and RS-49 (new); RS-37 answered for its record half.**

### Forced negative (phase 2)

- **One finding, RL-36: an out-of-flow publish with no shipped effect.** No registry record changed, and the record that discloses it is true.
- **No 6b mismatch**: four sha1s equal the 5.3 record. Only two of them are my own measurement.
- **The published bytes are the audited bytes**, three timestamp files aside, so **the waived falsities ship as audited**: RL-22 (the consumer-Stacy charter's owed-set lines), RL-29's index half, RL-31 (ii) and RL-35. They are disclosed in the notes and the GitHub release body, and an agent reading them through the MCP does not meet the disclosure.
- **No unverifiable claim is rolled into a ✅**: the GitHub Packages column is marked as the orchestrator's; browser, native and `generate` claims are not re-verified here; the processing-window reading of rail run 1 rests on the orchestrator's clock bound.
- **Not done by me**: the delegate audit (0 / 135), Peter's sample (0 / 135), J, and my three `## Lapse` headings.

### Surviving counter-argument

**First, RL-36 may be severity inflation, and it is an audit of the human's own act.** It changed nothing a consumer can observe, the record that discloses it is honest, and the act was Peter's, in his terminal, during a release he runs. Calling it a finding spends his attention on a no-op. I keep it Low and route it as information, not a question, because the flow's 5.4 promise is about which command runs, and a release audit that only reads end state would never see the one act whose failure mode (another version under `latest`) is consumer-visible. **What survives**: if Peter's standing reading is that only shipped state is audited at RELEASE, RL-36 is an observation, and RS-49 is the only part worth keeping.

**Second, "no effect" rests on packument reads, not on a registry-side log.** I read `time`, `dist.shasum`, `dist-tags` and `time.modified`, and the bytes. npm's processing is asynchronous and its queue is not visible to me. Twenty-one minutes have passed since `time.modified` (17:34:47Z), and nothing has changed since, so a late-processed 16.0.0 request is unlikely. It is not excluded by anything I can read.

**Third, the GitHub Packages half of the one-tarball claim is still not mine.** It rests on the orchestrator's `npm view` and `npm pack` from the main checkout, and on Thurgood's local re-read of the fetched file. Their numbers agree with mine wherever mine exist, but this seat has never read that registry.

### Merge-confirmation (#509, and #508's notes)

**#509**: head `e15ddbd081de0488de1dd48e92b3a1cfa87d92eb` (4 commits), squash `09be7b0a0bc467af22fb8622dbb4a6371fb41f13`, 2026-10-26T17:51:49Z. **#508**: head `845a8ac7238bcd8feb30e1d0af98d1e414f8a354` (2 commits), squash `0218632d1dc07f3ce3ec5731eff92b14aeb0693e`, 2026-10-26T17:52:01Z. **Read SHA**: `0218632d1` (drafted after both merges). **The files phase 2 read from #509**: `docs/releases/16.1.0/publish-verification.txt` and `.kiro/issues/archive/2026-10-25-release-16-1-files-grant.md`. `git diff --quiet 09be7b0a0 0218632d1 -- docs/releases/16.1.0/ .kiro/issues/archive/2026-10-25-release-16-1-files-grant.md` → exit 0. The `.txt`'s blob is `2500390194c8017b61daae9d7d45f0f3421faca3` at #509's head, at its merge and at the read SHA. **From #508**: `docs/releases/release-16.1.0.md` and the archived notes grant, read at `0218632d1`, which is #508's own merge. **No merged file differs from the read. No phase-2 reading changes. `publish-rail liveness: PASS — read and committed.`**

---

## [THURGOOD] Composed-loop outcome (2026-10-26)

Read per the charter duty: all of phase 1 and phase 2, every finding RL-19 to RL-36 and observation, and every standards section. I did not read Appendix A's per-act lines or each addendum's re-check tables line by line. Outcomes on the 17 standards items (RS-33 to RS-49), on what the docs should teach and never on what the audit concluded: **adopted** (13; each has a named vehicle, none merged): RS-33, 34, 36, 37, 38 (class half), 39, 40, 41, 43, 44, 47, 48, 49. **Split** (2): RS-42 (index half done by pointer, plan item 3 declined with reason, provisional); RS-46 (the `| sort` half adopted, the method half is Stacy's). **Declined-with-reason** (1): RS-35 (provisional; the instrument is a Peter fork). **None** (1): RS-45 (Stacy's method). Also adopted, found on the full read and not labelled RS: O-23, volatile docs-MCP counts in two always-loaded overviews. All rows are in `.kiro/issues/2026-10-26-release-16-1-standards-implications.md` (PR #521). The pass's own counts: 18 findings (RL-19 to RL-36), 17 Low and 1 Medium (RL-24); phase 1 `55c218cfd`, five addenda, phase 2 `b1a07fb7b`, liveness PASS.

---

## [STACY] Erratum to phase 2 (2026-10-26)

- **Erratum to my phase-2 RS-49 item ("5.4's command is typed by hand")**: that premise is false. `scripts/release-publish.ts` prints the command: at 5.3, L388–L390 print the `shasum … # must print <sha1>` line and the `npm publish` command, and a dry run prints it at L384–L385 ("and hand this command over for 5.4"), at `61581c641`. RL-36's command (`docs/releases/16.1.0/publish-verification.txt` L135) has the form the script prints, `--registry=` (`publicPublishArgs`, L138–L140), which RELEASE-FLOW L136's space form is not; no cause is inferred. The RS-49 question stands on the corrected premise: the printed command binds no version, and a dry run hands over a runnable publish line for a tarball with 5.3's version and different bytes (ballot `2026-10-26-release-flow-batch-16-1` § 11, `[ADA R1]` items 3 and 4). Found by Ada's consult and my R1 read of that ballot, not by this pass. No finding, count or verdict above changes.
