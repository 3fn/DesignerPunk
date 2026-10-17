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

_Recorded by the orchestrator after her read, before the measurement run._

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
