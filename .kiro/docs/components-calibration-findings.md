# Components calibration instrument — findings (q1)

**Date**: 2026-10-17
**Charter**: `.kiro/issues/2026-10-17-components-calibration-instrument-charter.md` (merged #387 → `67d9d807a`).
**Owner**: Lina (pre-registration, results, arms table, keys rationale); Thurgood (method-conformance section only). Grant path: charter header, "Grant paths".
**Status**: **PRE-REGISTERED.** No arm other than status quo has been run on the q1 fixture. Results come in a later commit on this branch, below the pre-registration block.

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

## 2. Results

_Not yet run._
