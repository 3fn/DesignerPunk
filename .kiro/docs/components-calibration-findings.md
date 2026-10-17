# Components calibration instrument — findings (q1)

**Date**: 2026-10-17
**Charter**: `.kiro/issues/2026-10-17-components-calibration-instrument-charter.md` (merged #387 → `67d9d807a`).
**Owner**: Lina (pre-registration, results, arms table, keys rationale); Thurgood (method-conformance section only). Grant path: charter header, "Grant paths".
**Status**: **RESULTS RECORDED** (§ 2). The pre-registration block (§ 1) is unchanged from `0c2e0a9bb`.

---

## 1. Pre-registration block (binding from this commit)

### 1.1 Commit chain on `chore/components-calibration-run`

| Step (charter § 5) | SHA | Author |
|---|---|---|
| (1) Raw seat answers | `ad7b13b06` | Thurgood |
| (2) Fixture with keys and F4 record, runner, arms, pre-exposure lists, guard test | `222f1aa7a` | Lina |
| (2) Pre-registration block (this file) | this commit; its SHA is recorded in the results commit | Lina |
| (3) Results | not yet written | Lina + Thurgood + orchestrator's re-run |

Charter § 5 describes step (2) as one commit. It is executed as **two** commits, per the orchestrator's brief: the build and keys first, then this block. Both precede the results commit, and the pre-registration takes effect at this commit. Squash-merge flattens the chain on `main`, so these SHAs are the record.

**What was run before this commit**: `--verify-only`, and one `--arms status-quo --table` run to prove the harness works. **Parity and R3 have not been run on the q1 fixture.** The keys were written before either run. The arm unit tests use synthetic evidence only.

### 1.2 R3 — exact text (copied verbatim from charter § 10, row "R3")

> **Tier rule (amended [date of the turn PR] — clause 1 replaced by R3, "names beat purpose"):**<br>- `strong` = at least one **high-signal-field hit**, AND either **(i)** a matched query token is a token of the component's own `name` or of its `family`, or **(ii)** at least two salient query tokens matched, and they are more than half of the salient query tokens.<br>- `partial` = any other match: at least one token matched and the match is not `strong`. This includes the single-low-signal-token case, low-signal-only coverage, and a lone `purpose` or concept-suffix hit without the support in (ii).<br>- `none` = zero tokens matched.<br>**What this changes, plainly:** this is "names beat purpose", a signal-class change in effect. `name` and `family` tokens reach `strong` on their own. `purpose` and contract concept-suffix tokens stay high-signal, but reach `strong` only with support (clause ii). The old ≥2-token full-coverage clause is subsumed by (ii). The signal-class gate is unchanged: low-signal-only coverage still caps at `partial`. Tokens are compared after the matcher's own normalization (`tokenizeForMatch`: stop words dropped, plurals folded). "Salient query tokens" is the existing coverage denominator. The `partial` and `none` **meanings** in the tier table are unchanged; the `partial` line is restated as the complement of `strong`, so no match falls between tiers. The rule reads only evidence the tool already emits (`name`, `family`, `matchedOn`, coverage), so a tier stays recomputable (Req 6.2 / P5).

**The code it runs as**: `application-mcp-server/src/calibration/arms.ts` → `r3Arm`. File blob `8b7e1d31eb87bf4ef1cc25ee80c39d92fd12d48f` at commit `222f1aa7a`.

### 1.3 The three arms (charter § 8)

- **Status quo**: the shipped `deriveMatchConfidence` at the branch point `67d9d807ad1f5396b7d7615f2445d0a3f67f13cf` (`main` after #387). `statusQuoArm` imports it unchanged. The runner aborts if the arm's tier or order differs from the shipped engine on any row.
- **Parity**: `parityArm`. `strong` iff ≥ 1 high-signal hit AND matchedTokens / totalTokens ≥ 0.5; no exact-multi-token branch.
- **R3**: `r3Arm`, as in 1.2.
- **Control (catalog read)**: specified in charter § 8, **not run**. The runner has no code path for it, and `--arms control` exits 2.
- **Rank**: every arm re-sorts with the shipped `rankCompare` / `countOwnNameHits`, imported unchanged. Rank-1 changes against status quo are listed, not gated.

### 1.4 Acceptance and the turn/revert rule (copied verbatim from charter § 6)

**Definitions** (every arm is scored on the same fixture; "status quo" = today's `deriveMatchConfidence` on `main`):
- **Confident-wrong (CW)**: a `strong` row in ranks 1–3 whose component is not in the query's key (a gap negative's key is empty) (F6).
- **True strong lost (TSL)**: a positive whose keyed component is `strong` at rank ≤ 2 under status quo and is not `strong` at rank ≤ 2 under the arm.
- **Net** = (CW under status quo that are not CW under the arm) − TSL.
- **R@1 / R@2**: rank-only; the share of positives whose keyed component is at rank 1 / rank ≤ 2.

**R3 is accepted iff, against status quo, all three hold, both with and without pre-exposed rows**:
1. **net ≥ +3**;
2. **no new CW** (no row that is CW under R3 and was not under status quo);
3. **R@1 and R@2 not lower.**

**Turn rule**: if R3 is accepted, Lina lands R3 as a dated rubric amendment in a **separate PR** (never in the instrument PR), carrying the re-run owed (§ 9) and a PR-body line that tiers change at merge. If R3 is not accepted: no turn; R3 is not re-tuned against this set (§ 2); the findings record the result and any variant needs fresh queries.

**Parity is a comparison arm, not a turn candidate.** If parity passes and R3 fails, that is reported and goes to Peter; this charter turns nothing else.

**Revert rule** (only if the fallback (C) fired and R3 is already on `main`): if the instrument then fails R3 on acceptance, Lina reverts R3 in the next PR, with the same re-run.

**Reading the numbers**: at n ≈ 32, net +3 is about a 10 % movement. The result is directional evidence for one tier rule, not a general claim about matcher quality.

**Fallback trigger (C), from the charter header:** the instrument has not run by the next PR that changes the components matcher OR the next product screen session, whichever comes first → § 1 (C).

### 1.5 Fixture, command, counts, flags

- **Fixture**: `application-mcp-server/src/calibration/__fixtures__/components-calibration-q1.json`
- **sha256**: `87de8a11a5fec5b48a57d20a5a58e6ceb513f6a41d6392240f9ce99d6af69a0c` (pinned in `application-mcp-server/src/calibration/__tests__/componentsCalibration.guard.test.ts`)
- **Corpus**: `src/components/core` at the measured SHA (34 components).
- **Verify**: `cd application-mcp-server && npx tsx src/calibration/run.ts --fixture src/calibration/__fixtures__/components-calibration-q1.json --verify-only`
- **Measurement command**: `cd application-mcp-server && npx tsx src/calibration/run.ts --fixture src/calibration/__fixtures__/components-calibration-q1.json --arms status-quo,parity,r3 --table`
- **How § 6 is computed** (`run.ts`, `scoreArm` / `acceptance`):
  - CW is counted per (phrase, component) pair in ranks 1–3.
  - A positive is a hit at R@1 / R@2, or a status-quo strong for TSL, if **any** component in its acceptable set qualifies.
  - R@1 and R@2 are compared as counts over the same subset's positives.
  - The "without pre-exposed" subset drops every row whose `preExposed` is non-empty.
- **Count check**: 36 phrases. **21 keyed positives, 15 keyed gap negatives, 0 F4 drops.** The gap share is 15 / 36 = 41.7 %, which meets both § 3 floors (≥ ⅓, ≥ 8), so no top-up seat is needed.
- **Pre-exposed (mechanical, § 2)**: KEN-4 `tab bar` (Lina's probes); LEO-1 and DAT-2 `primary action button` (Lina's and Thurgood's probes); SPA-5 `avatar` (Lina's and Thurgood's probes). Four rows. Acceptance is computed with and without them.

### 1.6 Keys — rationale summary (each row carries its own `note` in the fixture)

- **Text inputs** (KEN-1, LEO-2, DAT-1, SPA-1): the acceptable set is the whole `Input-Text-*` family. Every member is a labeled text input with validation and an inline error.
- **Cards** (KEN-3, LEO-4, DAT-4): `Container-Card-Base` and `Container-Base`, since no press behaviour is asked for. SPA-3 asks for press behaviour, so its key is `Container-Card-Base` only.
- **LEO-8** (a list row with leading icon, title, subtitle and chevron): keyed **positive** as `Button-VerticalList-Item`. The row exists; only its chevron slot is missing (gap G4). The seat labelled it B; under § 3 the key decides.
- **Gaps**:
  - switch: KEN-6, LEO-3, DAT-5, SPA-6;
  - empty state: KEN-7, LEO-7, DAT-7, SPA-7;
  - banner: KEN-8, LEO-9;
  - pull-to-refresh or spinner: KEN-9, DAT-8;
  - sheet: DAT-9;
  - toast: SPA-8;
  - skeleton: SPA-9.

  Each gap's `closestSensible` was set **before** any run: `Input-Checkbox-Base` for switches (the settings pattern's sanctioned placeholder); `Container-Base` and `Button-CTA` for empty states (their parts); `Progress-Bar-Base` for KEN-9 (the loading part); none for the others.
- **F4 drops**: none. Where siblings cannot be separated, an acceptable set is keyed instead, so no phrase needed dropping.
- **Declared conflict**: R3 is my rule and I keyed the set. The mitigations are the charter's: the keys come before any arm is scored (this chain), and the orchestrator re-runs the results independently.

### 1.7 Stacy's read (charter § 7)

_Recorded by the orchestrator (declared orchestration write; consult record, not a seat edit) after her read and before the measurement run. Read at HEAD 0c2e0a9bb, 2026-10-17; read-only; only `--verify-only` was run (exit 0)._

**Verdict: VERIFIABLE WITH NOTES.** No criterion wording was sent back.

- (1) Acceptance decidable from the runner's output alone — PASS. Every term resolves in `run.ts` (`scoreArm` / `acceptance`) plus § 1.5: confident-wrong = a (phrase, component) pair in ranks 1–3 outside the accept set; true-strong-lost = an accept member `strong` at rank ≤ 2 under status quo and not under the arm; "new" = pair set-difference; "not lower" = count comparison on the same subset. `findComponents` applies no default `limit`, so re-sorts see all rows; the runner's salient-token denominator equals the engine's.
- (2) Arms fixed before the run — PASS. R3's text in charter § 10 and § 1.2 here is byte-identical (diffed); `arms.ts` blob identical at 222f1aa7a and HEAD; parity defined; status quo imports the shipped `deriveMatchConfidence`; `src/query` and `src/indexer` unchanged against the merge-base 67d9d807a.
- (3) Sealing provable — PASS. ad7b13b06 precedes 222f1aa7a; the fixture's sha256 at both commits equals the pinned `87de8a11…`; a scripted raw↔fixture comparison matched 36/36 phrases, needs, seats, A/B labels and order.
- (4) Turn/revert rule and fallback trigger — PASS (observable events named).
- (5) Keying integrity (structure, not merits) — PASS. 1:1 rows; 0 drops recorded by class and count; LEO-8's judgment call carries its reason; pre-exposure flags recomputed by `validateFixture` and guard-pinned; exactly KEN-4, LEO-1, DAT-2, SPA-5 match; the probe lists equal charter App. A (34) and Lina's 68 verbatim; the Stage 0 strings equal the archived table rows 1–7; D8–D10 strings equal.

**Notes (record shape only) and their dispositions:**
- **N1** the runner prints two subset verdicts and no overall line → the results commit states the overall verdict as the AND of both, naming both. *Disposition: done in § 2 (e132bcd83).*
- **N2** the per-pair confident-wrong unit lives in § 1.5 / `run.ts`, not in charter § 6, so a reader of § 6 alone cannot compute `net`. *Disposition: Thurgood's text; he amends charter § 6 to the per-pair wording in the charter's closing commit (§ 3 below). Scored per phrase instead, R3 nets +7 and parity +5 with no new confident-wrong, so the verdict does not depend on the unit.*
- **N3** the one `--arms status-quo --table` harness check before the pre-registration commit departs from § 10's "verify-only is the only mode before (2)"; that it preceded keying is self-attested and unprovable from the chain. *Disposition: recorded as self-attested at the claims pass, not a finding.*
- **N4** the results commit must carry the pre-registration SHA, the `run.ts` blob, the corpus SHA, the orchestrator's run line, and whether the fallback trigger fired. *Disposition: all five are in § 2 (pre-registration 0c2e0a9bb; `run.ts` blob 0d82e2f983f8; corpus 0c2e0a9bb; run line with command + headline; fallback (C) did not fire between 67d9d807a and 0c2e0a9bb).*

**Consulted**: Stacy — VERIFIABLE WITH NOTES; chain sealed and byte-checked end to end; four record-shape notes, no criterion wording returned.

---

## 2. Results (Lina; results commit)

### 2.1 Overall verdict (charter § 6 — the AND of both subsets)

**R3: ACCEPTED on all scored rows (net +26) AND without pre-exposed rows (net +25) → acceptance met. Parity: likewise, ACCEPTED on all scored rows (net +24) AND without pre-exposed rows (net +24).** For both arms on both subsets: TSL 0, new CW 0, R@1 and R@2 unchanged (18/18 all; 14/14 without P).

### 2.2 Provenance

- **Pre-registration SHA**: `0c2e0a9bb`. Earlier chain commits: `ad7b13b06` (raw seat answers), `222f1aa7a` (keys and build).
- **Scoring code**: `application-mcp-server/src/calibration/run.ts`, blob `0d82e2f983f8`. Arms: `arms.ts`, blob `8b7e1d31eb87`.
- **Corpus SHA**: `0c2e0a9bb`, the branch HEAD at the run. `git diff --stat 67d9d807a 0c2e0a9bb -- application-mcp-server/src/query application-mcp-server/src/indexer src/components` is empty, so the matcher and the 34-component corpus are the merge-base's.
- **Fixture**: sha256 `87de8a11a5fec5b48a57d20a5a58e6ceb513f6a41d6392240f9ce99d6af69a0c` (verify OK at the run).
- **The run (orchestrator, 2026-10-17)**:
  - Command, at `0c2e0a9bb`: `cd application-mcp-server && npx tsx src/calibration/run.ts --fixture src/calibration/__fixtures__/components-calibration-q1.json --arms status-quo,parity,r3 --table`.
  - All scored rows: parity net +24, R3 net +26, both ACCEPTED.
  - Without pre-exposed rows: parity +24, R3 +25, both ACCEPTED.
  - The status-quo self-check passed.
- **Stacy's read (§ 7)**: verifiable with notes; no criterion wording was sent back. The orchestrator records it in § 1.7.
- **Fallback trigger (C)**: **did NOT fire** between `67d9d807a` and `0c2e0a9bb`. There was no components-matcher PR and no product screen session.
- **Self-attested**: my single `--arms status-quo --table` run before the pre-registration commit (§ 1.1) was a harness check. It is self-attested; no tool record exists of what I did or did not read from it. The keys were committed in `222f1aa7a` before it ran.

### 2.3 Arms table (headline, from the run output)

| Arm | Subset | Positives | R@1 | R@2 | CW pairs | Gaps none / partial / strong | vs status quo |
|---|---|---|---|---|---|---|---|
| status quo | all | 21 | 18 | 18 | 73 | 1 / 0 / 14 | — |
| parity | all | 21 | 18 | 18 | 49 | 1 / 5 / 9 | fixed 24, TSL 0, net +24, new CW 0 → ACCEPTED |
| R3 | all | 21 | 18 | 18 | 47 | 1 / 7 / 7 | fixed 26, TSL 0, net +26, new CW 0 → ACCEPTED |
| status quo | without P | 17 | 14 | 14 | 67 | 1 / 0 / 14 | — |
| parity | without P | 17 | 14 | 14 | 43 | 1 / 5 / 9 | fixed 24, TSL 0, net +24, new CW 0 → ACCEPTED |
| R3 | without P | 17 | 14 | 14 | 42 | 1 / 7 / 7 | fixed 25, TSL 0, net +25, new CW 0 → ACCEPTED |

### 2.4 Rank-1 changes, judged (listed, not gated)

- **KEN-6** (`toggle switch row`, gap), both arms: Chip-Filter (strong, CW) → Button-Icon (partial). **Tier right**: the CW is gone. **Rank neutral**: neither component is a sensible neighbour, and the sensible one (Input-Checkbox-Base) is not in the top 3.
- **KEN-8** (`inline banner for errors or offline`, gap), both arms: Button-VerticalList-Item (strong, CW) → Nav-Header-Base (partial). **Tier right. Rank neutral, leaning worse**: the new rank 1 is internal-only, so it is a poor labeled closest match even though it is flagged.
- **DAT-5** and **SPA-6** (`toggle switch`, gap), R3: Chip-Filter (strong, CW) → Chip-Base (partial). **Tier right. Rank neutral**: Input-Checkbox-Base, the sensible match, sits at rank 3, now `partial`.
- **DAT-9** (`bottom sheet`, gap), R3: Nav-TabBar-Base (strong, CW) → Nav-Header-Base (partial). **Tier right; rank neutral.** The query is **not** "bottom tab bar". It is the gap phrase "bottom sheet", and Nav-TabBar-Base came back `strong` only because of the word `bottom`. Removing that CW is correct. The new rank 1 is internal-only and not a sensible neighbour (`closestSensible` is empty), but R3 now marks both rows `partial`, which is the designed F5 (ii) outcome.

**Labeled-closest-match outcome (F5 ii), judged from the keys' pre-registered `closestSensible`**: under R3, 7 gaps return a `partial` closest match. Two are sensible: DAT-7 and SPA-7 (Button-CTA for an empty state). Five are not: KEN-6, KEN-8, DAT-5, DAT-9 and SPA-6. Under parity, 5 return a `partial` match, with the same two sensible.

### 2.5 Parity vs R3 — the honest reading

- **This set separates the two arms by a net of 2 CW pairs on all rows (26 vs 24), and by 1 without pre-exposed rows (25 vs 24).** The net hides more movement: the arms disagree on **16 pairs**.
  - **9 pairs fixed by R3 only**:
    - DAT-5 ×3 (Chip-Filter, Input-Checkbox-Base, Input-Text-Password)
    - SPA-6 ×3 (the same three)
    - DAT-9 (Nav-TabBar-Base)
    - SPA-8 (Badge-Count-Base)
    - KEN-4, pre-exposed (Chip-Filter)

    All of these come from R3's stricter coverage clause (>50 % rather than ≥50 %, with a lone purpose or suffix hit treated as `partial`). None comes from the name/family anchor.
  - **7 pairs fixed by parity only**:
    - KEN-9 ×2 (Progress-Indicator-Connector-Base and -Label-Base, via the name token `indicator`)
    - LEO-8 (Button-Icon, via `icon`)
    - DAT-3 and SPA-4 (Progress-Bar-Base, via `bar`)
    - SPA-9 ×2 (Button-VerticalList-Item and -Set, via `list`)

    Every one of these is **R3's own-name anchor firing on an incidental token of a compound name**.
- **What the anchor was for did not happen here.** The anchor exists to keep name hits that carry unmatched modifiers at `strong` (my probe set: "large dark checkbox", "chip that can be removed"). Parity loses no true strong on this set (TSL 0). So on this blind set the anchor's cost shows (7 pairs) and its benefit does not. **The choice of R3 over parity therefore rests on my probe-set reasoning, which is author-exposed, not on this blind set.** The blind set supports one thing directly: a stricter coverage gate than parity.
- **Other residual confident-wrongs under R3**:
  - SPA-8: Badge-Count-Notification, via the own-name token `notification`.
  - LEO-3: Input-Checkbox-Base, via clause (ii) with two purpose words, `toggle` and `setting`.
  - SPA-9: the VerticalList pair.
  - KEN-7 and LEO-7: Button-CTA and Button-Icon, empty-state rows.

  These are the surviving counter-argument, carried into the turn PR. Under § 2 no variant may be tuned against this set: an R3 that drops or narrows the anchor needs fresh queries.

### 2.6 Keys rationale

The keys are in § 1.6 and in each fixture row's `note`, and are unchanged since `222f1aa7a`. **No answer-key errors were found** reading the results. DAT-1 and SPA-1 (Input-Checkbox-Base and Input-Radio-Base ahead of Input-Text-Base for "text input with … error message") are status-quo rank misses shared by all three arms; they are not key errors.

### 2.7 Spent set, and what happens next

- **SPENT-SET line (charter § 2): q1 is spent as a tuning target at this commit, whatever the outcome.** From here it is a regression guard only. No matcher change may be tuned against it or justified by it; a later change needs fresh queries authored under § 4.
- **Next, per the turn rule (§ 6)**: R3 is accepted, so it turns. I land R3 as a dated rubric amendment in a **separate PR, after this instrument PR merges**. That PR carries:
  - the § 9 re-run and charter § 10's row "Re-run owed";
  - the identity check that the shipped tier equals `r3Arm` on every q1 row;
  - the deliberately flipped assertions, named;
  - a PR-body line that tiers change at merge;
  - § 2.5's anchor finding as its surviving counter-argument.

  Parity is a comparison arm, not a turn candidate; it also passed, and that is reported here.

### 2.8 Run output (verbatim, as captured by the orchestrator)

```text
fixture: application-mcp-server/src/calibration/__fixtures__/components-calibration-q1.json  sha256 87de8a11a5fec5b48a57d20a5a58e6ceb513f6a41d6392240f9ce99d6af69a0c
counts: 36 rows — 21 positives, 15 gap negatives, 0 dropped (F4); gap share 41.7 %
pre-exposed (scored): KEN-4, LEO-1, DAT-2, SPA-5
verify: OK
ran 36 scored phrases under: status-quo, parity, r3 (status-quo self-check passed)

| id | class | P | status-quo: rank 1 · 2 · 3 | parity: rank 1 · 2 · 3 | r3: rank 1 · 2 · 3 |
|---|---|---|---|---|---|
| KEN-1 | positive |  | Input-Text-Base (strong) ✓ · Input-Text-Email (strong) ✓ · Input-Text-Password (strong) ✓ | Input-Text-Base (strong) ✓ · Input-Text-Email (strong) ✓ · Input-Text-Password (strong) ✓ | Input-Text-Base (strong) ✓ · Input-Text-Email (strong) ✓ · Input-Text-Password (strong) ✓ |
| KEN-2 | positive |  | Button-CTA (strong) ✓ · Button-Icon (strong) CW · Button-VerticalList-Item (strong) CW | Button-CTA (strong) ✓ · Button-Icon (strong) CW · Button-VerticalList-Item (strong) CW | Button-CTA (strong) ✓ · Button-Icon (strong) CW · Button-VerticalList-Item (strong) CW |
| KEN-3 | positive |  | Container-Card-Base (strong) ✓ · Container-Base (strong) ✓ · Chip-Filter (strong) CW | Container-Card-Base (strong) ✓ · Container-Base (strong) ✓ · Chip-Filter (strong) CW | Container-Card-Base (strong) ✓ · Container-Base (strong) ✓ · Chip-Filter (strong) CW |
| KEN-4 | positive | P | Nav-TabBar-Base (strong) ✓ · Progress-Bar-Base (strong) CW · Chip-Filter (strong) CW | Nav-TabBar-Base (strong) ✓ · Progress-Bar-Base (strong) CW · Chip-Filter (strong) CW | Nav-TabBar-Base (strong) ✓ · Progress-Bar-Base (strong) CW · Badge-Count-Base (partial) |
| KEN-5 | positive |  | Avatar-Base (strong) ✓ · Nav-SegmentedChoice-Base (strong) CW · Nav-TabBar-Base (strong) CW | Avatar-Base (strong) ✓ · Nav-SegmentedChoice-Base (strong) CW · Badge-Count-Base (partial) | Avatar-Base (strong) ✓ · Nav-SegmentedChoice-Base (strong) CW · Badge-Count-Base (partial) |
| KEN-6 | gap |  | Chip-Filter (strong) CW · Input-Checkbox-Base (strong) CW · Input-Text-Password (strong) CW | Button-Icon (partial) · Button-VerticalList-Item (partial) · Button-VerticalList-Set (partial) | Button-Icon (partial) · Button-VerticalList-Item (partial) · Button-VerticalList-Set (partial) |
| KEN-7 | gap |  | Button-CTA (strong) CW · Button-Icon (strong) CW · Button-VerticalList-Item (strong) CW | Button-CTA (strong) CW · Button-Icon (strong) CW · Button-VerticalList-Item (partial) | Button-CTA (strong) CW · Button-Icon (strong) CW · Button-VerticalList-Item (partial) |
| KEN-8 | gap |  | Button-VerticalList-Item (strong) CW · Button-VerticalList-Set (strong) CW · Icon-Base (strong) CW | Nav-Header-Base (partial) · Badge-Count-Base (partial) · Badge-Label-Base (partial) | Nav-Header-Base (partial) · Badge-Count-Base (partial) · Badge-Label-Base (partial) |
| KEN-9 | gap |  | Progress-Bar-Base (strong) CW · Progress-Indicator-Connector-Base (strong) CW · Progress-Indicator-Label-Base (strong) CW | Progress-Bar-Base (strong) CW · Progress-Indicator-Connector-Base (partial) · Progress-Indicator-Label-Base (partial) | Progress-Bar-Base (strong) CW · Progress-Indicator-Connector-Base (strong) CW · Progress-Indicator-Label-Base (strong) CW |
| LEO-1 | positive | P | Button-CTA (strong) ✓ · Button-Icon (strong) CW · Button-VerticalList-Item (strong) CW | Button-CTA (strong) ✓ · Button-Icon (strong) CW · Button-VerticalList-Item (strong) CW | Button-CTA (strong) ✓ · Button-Icon (strong) CW · Button-VerticalList-Item (strong) CW |
| LEO-2 | positive |  | Input-Text-Base (strong) ✓ · Input-Text-Email (strong) ✓ · Input-Text-Password (strong) ✓ | Input-Text-Base (strong) ✓ · Input-Text-Email (strong) ✓ · Input-Text-Password (strong) ✓ | Input-Text-Base (strong) ✓ · Input-Text-Email (strong) ✓ · Input-Text-Password (strong) ✓ |
| LEO-3 | gap |  | Input-Checkbox-Base (strong) CW · Input-Text-Password (strong) CW · Nav-SegmentedChoice-Base (strong) CW | Input-Checkbox-Base (strong) CW · Input-Text-Password (strong) CW · Nav-SegmentedChoice-Base (strong) CW | Input-Checkbox-Base (strong) CW · Input-Text-Password (strong) CW · Nav-SegmentedChoice-Base (strong) CW |
| LEO-4 | positive |  | Container-Card-Base (strong) ✓ · Container-Base (strong) ✓ · Chip-Filter (strong) CW | Container-Card-Base (strong) ✓ · Container-Base (strong) ✓ · Chip-Filter (strong) CW | Container-Card-Base (strong) ✓ · Container-Base (strong) ✓ · Chip-Filter (strong) CW |
| LEO-5 | positive |  | Nav-TabBar-Base (strong) ✓ · Nav-Header-Base (strong) CW · Nav-Header-App (strong) CW | Nav-TabBar-Base (strong) ✓ · Nav-Header-Base (strong) CW · Nav-Header-App (strong) CW | Nav-TabBar-Base (strong) ✓ · Nav-Header-Base (strong) CW · Nav-Header-App (strong) CW |
| LEO-6 | positive |  | Badge-Label-Base (strong) ✓ · Badge-Count-Base (strong) CW · Badge-Count-Notification (strong) CW | Badge-Label-Base (strong) ✓ · Badge-Count-Base (strong) CW · Badge-Count-Notification (strong) CW | Badge-Label-Base (strong) ✓ · Badge-Count-Base (strong) CW · Badge-Count-Notification (strong) CW |
| LEO-7 | gap |  | Button-CTA (strong) CW · Button-Icon (strong) CW · Button-VerticalList-Item (strong) CW | Button-CTA (strong) CW · Button-Icon (strong) CW · Button-VerticalList-Item (partial) | Button-CTA (strong) CW · Button-Icon (strong) CW · Button-VerticalList-Item (partial) |
| LEO-8 | positive |  | Button-VerticalList-Item (strong) ✓ · Nav-Header-Page (strong) CW · Button-Icon (strong) CW | Button-VerticalList-Item (strong) ✓ · Nav-Header-Page (strong) CW · Button-Icon (partial) | Button-VerticalList-Item (strong) ✓ · Nav-Header-Page (strong) CW · Button-Icon (strong) CW |
| LEO-9 | gap |  | Input-Radio-Set (strong) CW · Input-Text-Base (strong) CW · Input-Text-Email (strong) CW | Input-Radio-Set (strong) CW · Input-Text-Base (strong) CW · Input-Text-Email (strong) CW | Input-Radio-Set (strong) CW · Input-Text-Base (strong) CW · Input-Text-Email (strong) CW |
| DAT-1 | positive |  | Input-Checkbox-Base (strong) CW · Input-Radio-Base (strong) CW · Input-Text-Base (strong) ✓ | Input-Checkbox-Base (strong) CW · Input-Radio-Base (strong) CW · Input-Text-Base (strong) ✓ | Input-Checkbox-Base (strong) CW · Input-Radio-Base (strong) CW · Input-Text-Base (strong) ✓ |
| DAT-2 | positive | P | Button-CTA (strong) ✓ · Button-Icon (strong) CW · Button-VerticalList-Item (strong) CW | Button-CTA (strong) ✓ · Button-Icon (strong) CW · Button-VerticalList-Item (strong) CW | Button-CTA (strong) ✓ · Button-Icon (strong) CW · Button-VerticalList-Item (strong) CW |
| DAT-3 | positive |  | Nav-TabBar-Base (strong) ✓ · Nav-Header-Base (strong) CW · Progress-Bar-Base (strong) CW | Nav-TabBar-Base (strong) ✓ · Nav-Header-Base (strong) CW · Badge-Count-Base (partial) | Nav-TabBar-Base (strong) ✓ · Nav-Header-Base (strong) CW · Progress-Bar-Base (strong) CW |
| DAT-4 | positive |  | Badge-Count-Base (strong) CW · Button-VerticalList-Item (strong) CW · Container-Card-Base (strong) ✓ | Badge-Count-Base (strong) CW · Button-VerticalList-Item (strong) CW · Container-Card-Base (strong) ✓ | Badge-Count-Base (strong) CW · Button-VerticalList-Item (strong) CW · Container-Card-Base (strong) ✓ |
| DAT-5 | gap |  | Chip-Filter (strong) CW · Input-Checkbox-Base (strong) CW · Input-Text-Password (strong) CW | Chip-Filter (strong) CW · Input-Checkbox-Base (strong) CW · Input-Text-Password (strong) CW | Chip-Base (partial) · Chip-Filter (partial) · Input-Checkbox-Base (partial) |
| DAT-6 | positive |  | Avatar-Base (strong) ✓ · Nav-SegmentedChoice-Base (strong) CW · Nav-TabBar-Base (strong) CW | Avatar-Base (strong) ✓ · Nav-SegmentedChoice-Base (strong) CW · Badge-Count-Base (partial) | Avatar-Base (strong) ✓ · Nav-SegmentedChoice-Base (strong) CW · Badge-Count-Base (partial) |
| DAT-7 | gap |  | Button-CTA (strong) CW · Button-Icon (strong) CW · Button-VerticalList-Item (strong) CW | Button-CTA (partial) · Button-Icon (partial) · Button-VerticalList-Item (partial) | Button-CTA (partial) · Button-Icon (partial) · Button-VerticalList-Item (partial) |
| DAT-8 | gap |  | — (none) | — (none) | — (none) |
| DAT-9 | gap |  | Nav-TabBar-Base (strong) CW · Nav-Header-Base (partial) | Nav-TabBar-Base (strong) CW · Nav-Header-Base (partial) | Nav-Header-Base (partial) · Nav-TabBar-Base (partial) |
| SPA-1 | positive |  | Input-Checkbox-Base (strong) CW · Input-Radio-Base (strong) CW · Input-Text-Base (strong) ✓ | Input-Checkbox-Base (strong) CW · Input-Radio-Base (strong) CW · Input-Text-Base (strong) ✓ | Input-Checkbox-Base (strong) CW · Input-Radio-Base (strong) CW · Input-Text-Base (strong) ✓ |
| SPA-2 | positive |  | Button-CTA (strong) ✓ · Button-Icon (strong) CW · Button-VerticalList-Item (strong) CW | Button-CTA (strong) ✓ · Button-Icon (strong) CW · Button-VerticalList-Item (strong) CW | Button-CTA (strong) ✓ · Button-Icon (strong) CW · Button-VerticalList-Item (strong) CW |
| SPA-3 | positive |  | Container-Card-Base (strong) ✓ · Container-Base (strong) CW · Chip-Filter (strong) CW | Container-Card-Base (strong) ✓ · Container-Base (strong) CW · Chip-Filter (strong) CW | Container-Card-Base (strong) ✓ · Container-Base (strong) CW · Chip-Filter (strong) CW |
| SPA-4 | positive |  | Nav-TabBar-Base (strong) ✓ · Nav-Header-Base (strong) CW · Progress-Bar-Base (strong) CW | Nav-TabBar-Base (strong) ✓ · Nav-Header-Base (strong) CW · Badge-Count-Base (partial) | Nav-TabBar-Base (strong) ✓ · Nav-Header-Base (strong) CW · Progress-Bar-Base (strong) CW |
| SPA-5 | positive | P | Avatar-Base (strong) ✓ · Badge-Count-Base (partial) | Avatar-Base (strong) ✓ · Badge-Count-Base (partial) | Avatar-Base (strong) ✓ · Badge-Count-Base (partial) |
| SPA-6 | gap |  | Chip-Filter (strong) CW · Input-Checkbox-Base (strong) CW · Input-Text-Password (strong) CW | Chip-Filter (strong) CW · Input-Checkbox-Base (strong) CW · Input-Text-Password (strong) CW | Chip-Base (partial) · Chip-Filter (partial) · Input-Checkbox-Base (partial) |
| SPA-7 | gap |  | Button-CTA (strong) CW · Button-Icon (strong) CW · Button-VerticalList-Item (strong) CW | Button-CTA (partial) · Button-Icon (partial) · Button-VerticalList-Item (partial) | Button-CTA (partial) · Button-Icon (partial) · Button-VerticalList-Item (partial) |
| SPA-8 | gap |  | Badge-Count-Notification (strong) CW · Badge-Count-Base (strong) CW · Badge-Label-Base (partial) | Badge-Count-Notification (strong) CW · Badge-Count-Base (strong) CW · Badge-Label-Base (partial) | Badge-Count-Notification (strong) CW · Badge-Count-Base (partial) · Badge-Label-Base (partial) |
| SPA-9 | gap |  | Button-VerticalList-Item (strong) CW · Button-VerticalList-Set (strong) CW · Progress-Stepper-Detailed (strong) CW | Button-VerticalList-Item (partial) · Button-VerticalList-Set (partial) · Avatar-Base (partial) | Button-VerticalList-Item (strong) CW · Button-VerticalList-Set (strong) CW · Avatar-Base (partial) |

### Headline — all scored rows

| arm | positives | R@1 | R@2 | CW (pairs, ranks 1–3) | gaps: none / partial / strong |
|---|---|---|---|---|---|
| status-quo | 21 | 18 | 18 | 73 | 1 / 0 / 14 |
| parity | 21 | 18 | 18 | 49 | 1 / 5 / 9 |
| r3 | 21 | 18 | 18 | 47 | 1 / 7 / 7 |

**parity vs status quo (all scored rows)**: fixed CW 24; TSL 0; net +24; new CW 0; R@1 18→18; R@2 18→18 → **ACCEPTED** on this subset

**r3 vs status quo (all scored rows)**: fixed CW 26; TSL 0; net +26; new CW 0; R@1 18→18; R@2 18→18 → **ACCEPTED** on this subset

### Headline — without pre-exposed rows

| arm | positives | R@1 | R@2 | CW (pairs, ranks 1–3) | gaps: none / partial / strong |
|---|---|---|---|---|---|
| status-quo | 17 | 14 | 14 | 67 | 1 / 0 / 14 |
| parity | 17 | 14 | 14 | 43 | 1 / 5 / 9 |
| r3 | 17 | 14 | 14 | 42 | 1 / 7 / 7 |

**parity vs status quo (without pre-exposed rows)**: fixed CW 24; TSL 0; net +24; new CW 0; R@1 14→14; R@2 14→14 → **ACCEPTED** on this subset

**r3 vs status quo (without pre-exposed rows)**: fixed CW 25; TSL 0; net +25; new CW 0; R@1 14→14; R@2 14→14 → **ACCEPTED** on this subset

### Rank-1 changes against status quo (listed, not gated)

- KEN-6 (parity): Chip-Filter → Button-Icon
- KEN-6 (r3): Chip-Filter → Button-Icon
- KEN-8 (parity): Button-VerticalList-Item → Nav-Header-Base
- KEN-8 (r3): Button-VerticalList-Item → Nav-Header-Base
- DAT-5 (r3): Chip-Filter → Chip-Base
- DAT-9 (r3): Nav-TabBar-Base → Nav-Header-Base
- SPA-6 (r3): Chip-Filter → Chip-Base
```

---

## 3. Method conformance (Thurgood)

**Verdict: CONFORMS WITH NOTES.** The run was sealed, keyed, pre-registered and scored as the charter requires. One note must be closed before the PR opens (M7); one is a charter text defect I own (M8). The outcome holds under every reading I could construct.

**Independent re-run (mine, 2026-10-17, read-only).**
- Run at `e132bcd83`, using the measurement command in § 1.5. `run.ts` blob `0d82e2f983f8`; fixture sha256 `87de8a11…69a0c` (matches the guard pin).
- The output is identical to § 2.8 on every headline line: R3 net +26 / +25, parity +24 / +24, TSL 0, new CW 0, R@1 / R@2 unchanged, status-quo self-check passed.
- `git diff --stat 222f1aa7a e132bcd83 -- application-mcp-server/src/calibration application-mcp-server/src/query application-mcp-server/src/indexer src/components` is empty. So the fixture, keys, arms and runner have not changed since the keys commit, and the matcher and corpus are the merge-base's.

### Conformance by charter section

- **M1 — § 4, sealing: CONFORMS.**
  - Four fresh sessions were run; the harness counted tool_uses = 1 for each (the hand-back).
  - The raw file (`ad7b13b06`) holds the prompt verbatim and each answer byte-identical to the orchestrator's relay, which I diff-checked at capture.
  - That the seats saw only the prompt is orchestrator-attested; there is no other record.
- **M2 — § 3, size and keys: CONFORMS.**
  - 36 phrases: 21 positive and 15 gap, so the gap share is 41.7 % (≥ ⅓, ≥ 8). No top-up seat; no F4 drops.
  - LEO-8 was labelled B by its seat and keyed positive. That is § 3 as written: the key decides the class.
  - The gap `closestSensible` values were set before any run.
- **M3 — keys before scoring: CONFORMS.**
  - The keys, arms and runner landed together in `222f1aa7a`, before any arm was run on q1. No calibration code or key has changed since (re-run paragraph above).
- **M4 — Stacy's N3, the self-attested status-quo harness check: IMMATERIAL to the outcome.**
  - The run came after the keys and the arm code were committed, and neither has changed since. R3's text was fixed in the charter (#387) before any seat wrote.
  - A status-quo table could not have shaped any input that decides acceptance.
  - Recorded as self-attested, as § 2.2 already says.
- **M5 — § 5, pre-registration before the run: CONFORMS WITH NOTE.**
  - Step (2) ran as two commits, `222f1aa7a` then `0c2e0a9bb`. Both precede the run and the results commit `e132bcd83`. § 1.1 records the split; this is not a deviation in substance.
  - The pre-registration block carries every item § 5 lists: R3 text, arms, acceptance and turn/revert verbatim, fixture hash, command, counts and pre-exposure flags.
- **M6 — §§ 6 and 8, arms fixed and acceptance applied as written: CONFORMS.**
  - Arms: status quo imports the shipped function. Parity and R3 match § 8 and § 1.2. The control arm is not run, as specified (`--arms control` exits 2).
  - The verdict is the AND of both subsets (Stacy's N1).
  - Pre-exposure was computed mechanically from all four § 2 sources (`preExposure.ts`): 4 rows.
- **M7 — § 7, Stacy's read: DONE, NOT YET RECORDED.**
  - § 1.7 still holds its placeholder; § 2.2 carries only the one-line verdict.
  - The orchestrator records her read and notes N1–N4 in § 1.7 before the PR opens. Until then, the record of a non-gating read lives outside the PR.
- **M8 — Stacy's N2, the CW unit: a defect in my § 6 text.**
  - Charter § 6 says "a `strong` row in ranks 1–3". It does not say whether a "row" is a phrase or a (phrase, component) pair, so a reader of § 6 alone cannot compute `net`.
  - **For q1 the unit is binding as pre-registered.** § 1.5 ("CW is counted per (phrase, component) pair in ranks 1–3") was already in `0c2e0a9bb`, before the run.
  - **The outcome does not depend on the unit.** Re-scored per phrase from the same run output (a phrase is CW if any top-3 `strong` falls outside its key):
    - status quo 32 phrases;
    - parity 27, so net +5;
    - R3 25, so net +7;
    - new CW 0 for both;
    - the same fixed counts without the pre-exposed rows (parity +5, R3 +7).

    Both arms clear net ≥ +3 under either reading.
  - **The fix: a charter amendment, not a gloss here.** In the charter's closing commit (§ 14) I amend § 6's CW definition to read "a (phrase, component) pair: a `strong` result in ranks 1–3 whose component is not in the phrase's key (a gap negative's key is empty); `net` and 'new CW' count pairs". The amendment is dated and cites this note.
  - The charter's method outlives q1, and bound 1 of my charter cut makes an interpretation question my text's defect. It does not move q1's goalposts: the amended text is the unit q1 pre-registered.
- **M9 — § 2, spent-set rule: IN FORCE.** q1 is spent as a tuning target from `e132bcd83` (§ 2.7) and is a regression guard only. The F3 freeze SHA is `222f1aa7a` (the fixture's last change). Walk line: `git log --oneline 222f1aa7a.. -- application-mcp-server/src/calibration/__fixtures__/components-calibration-q1.json`.
- **M10 — fallback (C): did not fire** between `67d9d807a` and the run, as § 2.2 states. No revert rule applies.

### Method ruling on the turn (for Peter's decision; the decision is his)

**What the pre-registered turn rule permits, given § 2.5's disagreement analysis:**
- **(a) R3 turns as written.** It met all three criteria on both subsets. That is what the turn rule says happens.
- **(b) Turning parity instead is NOT pre-registered.** Parity is a comparison arm ("this charter turns nothing else"). A parity turn would be a new decision on a spent set. It would need Peter's ruling as a fresh choice, and under § 2 its justification could not rest on q1.
- **(c) An R3′ with the anchor restricted to non-incidental name tokens is tuning on a spent set.** It needs fresh queries authored under § 4, with the anchor-specific cases pre-registered.

**The anchor finding does not undo the acceptance.**
- The seven anchor-fragment pairs (`indicator`, `icon`, `bar`, `list`) were confident-wrong under status quo too. R3 leaves them as they are, so "no new CW" holds.
- The finding shows that R3's anchor has an untested benefit and a measured cost **relative to parity**. The pre-registered comparison was against status quo, not parity.
- Using a post-hoc split of a passed test to reverse a pre-registered acceptance is the same forking-paths error as tuning on the set, in the other direction.

**The step I sign:**
1. Turn R3 as pre-registered, in Lina's separate PR, carrying the § 9 re-run and § 2.5 as its surviving counter-argument.
2. File the anchor-fragment observation as a recorded follow-up (Lina's, in the charter's closing):
   - **What**: R3's own-name anchor fires on incidental tokens of compound names; its benefit (name hits carrying unmatched modifiers) is supported only by author-exposed probes.
   - **Trigger**: the next fresh components set authored under § 4 — for the next components-matcher change or the next instrument run, whichever comes first.
   - **What that set must pre-register**: name-with-modifier positives and compound-name-fragment negatives, plus an R3′ arm (anchor restricted to whole-name or family tokens) beside R3 and parity.

**Holding the turn** is Peter's to choose, and it does not violate the method, but it departs from the pre-registered rule. If he holds, the reason belongs in the charter's closing record. I would not sign the method for "turn parity" or "turn R3′" on q1.

**Surviving counter-argument.** The turn embeds "names beat purpose" when the blind set supports only "a stricter coverage gate than parity". Over parity, R3 wins by 2 pairs (1 without pre-exposed rows), which is inside noise at n = 36. If the next fresh set shows the anchor's benefit never arrives, the system will have carried a rule whose distinctive clause cost more than it bought. The pre-registration bound the decision to status quo, not to this question.
