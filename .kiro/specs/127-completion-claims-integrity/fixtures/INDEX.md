# Fixture Specifications — Index

**Spec**: 127 — Completion-Claims Integrity
**Deliverable**: Req 6.5's fixture obligation — a named deliverable of the checker-build unit (U2), due at that unit's completion
**Design**: C7 (fixture pipeline) / DD4 (specification-encoded pairs with provenance headers)
**Author**: Stacy (product governance & QA)
**Date**: 2026-09-19
**Status**: Reviewed on-branch by Thurgood, 2026-09-19 — adjudications recorded in § "Review record". One fixture is **held for Peter** with the contest exercised. **A contested fixture that simply disappears from the set is the failure.**

---

## What this directory is

31 fixture **specifications**, one per file. Each names a falsification class, the dishonest or defective shape it proves the checker catches, a realistic `tasks.md` fragment, the completion-doc fragment under test, and the exact required verdict — including the loud-failure catalog string verbatim where the design fixes one.

The U2 build encodes each spec **1:1** as `scripts/completion-claims/__fixtures__/<case>/{tasks.md, completion.md, expected.json}` with a provenance header citing the spec file here, so spec↔fixture divergence is one `diff` away (DD4). `fixtures.test.ts` asserts every fixture produces its expected verdict — the checker goes red on these as a **standing test**, not a one-time demonstration.

**These are test inputs, not templates.** The canonical worked example lives in `governance/Process-Spec-Planning.md` Tier 3; where a fixture and that example diverge, the example governs and the fixture should be re-derived.

---

## The coverage manifest — `expected-classes.json`

C7's floor: `fixtures.test.ts` **fails when any manifest class has zero fixtures**, which makes a thin or empty set red by construction. This is the mechanical form of Req 6.5's *"neither agent may waive it"*.

The manifest — **17 classes**: the ruled floor of 11, plus 6 extensions (5 authored at delivery, `ratification-record` added when Thurgood accepted route 1 on 2026-09-19):

```json
{
  "classes": [
    "drop", "reword", "relax", "omit-doc", "invent", "absorb",
    "av-gate", "deferral", "exemption", "declaration", "materiality",
    "normalization", "evidence", "forced-negative", "declared-none", "malformation",
    "ratification-record"
  ]
}
```

The first eleven are the ruled floor (design C7) and **cannot shrink** — shrinking is a contested-fixture event with Peter arbitrating. The last six are extensions under C7's grant; the rationale for each is in § "Manifest extensions" below.

---

## Class → case mapping

| Class | Falsification cases | PASS-expected controls |
|---|---|---|
| **drop** | `drop-criterion-basic` | *(covered by `compliant-full-control`)* |
| **reword** | `reword-paraphrase-and-glyph-drift` | *(covered by `normalization-absorbed-artifacts-control`)* |
| **relax** | `relax-threshold-and-scope` | *(covered by `compliant-full-control`)* |
| **omit-doc** | `omit-doc-no-completion-doc` | `omit-doc-agent-suffixed-doc-found-control` |
| **invent** | `invent-extra-row` | *(covered by `compliant-full-control`)* |
| **absorb** | `absorb-two-criteria-one-row` | *(covered by `compliant-full-control`)* |
| **av-gate** | `av-gate-row-reworded`, `av-section-missing-when-owed`, `av-artifact-line-missing` | `compliant-full-control` |
| **deferral** | `deferral-free-prose-near-miss` | `compliant-full-control` (`→`), `declared-none-compliant-control` (`->`) |
| **exemption** | `exemption-paraphrase`, `exemption-does-not-waive-av` | `exemption-verbatim-honored-control` |
| **declaration** | `declaration-missing-post-ratification` | — *(see § Thin spots)* |
| **materiality** | `materiality-strike-through-supersession`, `materiality-criterion-reworded-legacy` | `materiality-tick-only-immaterial-control` |
| **normalization** *(ext)* | `normalization-one-word-differs` | `normalization-absorbed-artifacts-control` |
| **evidence** *(ext)* | `evidence-prose-only-and-empty`, `evidence-warn-row-without-followup` | `compliant-full-control` |
| **forced-negative** *(ext)* | `forced-negative-missing` | `compliant-full-control` |
| **declared-none** *(ext)* | `declared-none-av-still-owed` | `declared-none-compliant-control` |
| **malformation** *(ext)* | `malformation-criteria-block-defects`, `malformation-block-not-found` | — |
| **ratification-record** *(ext)* | `ratification-record-line-reworded`, `ratification-record-ballot-absent` | `ratification-record-valid-control` |

**Totals**: 31 cases — 23 falsification, 8 PASS-expected controls. Every floor class carries at least one falsification fixture.

---

## Expected outcomes at a glance

| Case | Required verdict / emission | Exit |
|---|---|---|
| `drop-criterion-basic` | `SET_MISMATCH` | RED |
| `reword-paraphrase-and-glyph-drift` | `SET_MISMATCH` (2 pairs) | RED |
| `relax-threshold-and-scope` | `SET_MISMATCH` (2 pairs) | RED |
| `invent-extra-row` | `SET_MISMATCH` (unexpected-only) | RED |
| `absorb-two-criteria-one-row` | `SET_MISMATCH` (2 missing / 1 unexpected) | RED |
| `normalization-one-word-differs` | `SET_MISMATCH` (2 pairs) | RED |
| `omit-doc-no-completion-doc` | emission `completion-doc-not-found` (catalog string verbatim) | GREEN + emission |
| `omit-doc-agent-suffixed-doc-found-control` | `PASS`, no emission, `sourceFiles` names the suffixed file | GREEN |
| `av-gate-row-reworded` | `AV_SET_MISMATCH` (criteria clean) | RED |
| `av-section-missing-when-owed` | `AV_MISSING_OR_MALFORMED` | RED |
| `av-artifact-line-missing` | `AV_MISSING_OR_MALFORMED` (gate rows clean) | RED |
| `deferral-free-prose-near-miss` | `MALFORMATION` *(build's member; see Review record)* + `malformed deferral: …` verbatim; `deferrals` empty | RED |
| `exemption-paraphrase` | `MALFORMATION` + `non-compliant exemption: … (parent 4)` verbatim | RED |
| `exemption-does-not-waive-av` | `AV_MISSING_OR_MALFORMED` **+** `exemption-honored` emission | RED + emission |
| `exemption-verbatim-honored-control` | `PASS` + `exemption-honored` | GREEN + emission |
| `declaration-missing-post-ratification` | `NON_COMPLIANT_NO_DECLARATION` + catalog string | RED |
| `materiality-strike-through-supersession` | `MATERIAL_AMENDMENT_WITHOUT_DECLARATION` + catalog string | RED |
| `materiality-criterion-reworded-legacy` | `MATERIAL_AMENDMENT_WITHOUT_DECLARATION` + attributed segment | RED |
| `materiality-tick-only-immaterial-control` | immaterial — `material: false`, `verdicts: []` | GREEN |
| `evidence-prose-only-and-empty` | `EVIDENCE_NONCOMPLIANT` (rows 1–2; set parity clean) | RED |
| `evidence-warn-row-without-followup` | `EVIDENCE_NONCOMPLIANT` (row 3) — **HELD FOR PETER** | RED (pending ruling) |
| `forced-negative-missing` | `FORCED_NEGATIVE_MISSING` | RED |
| `declared-none-av-still-owed` | `AV_MISSING_OR_MALFORMED` **+** `declared-none-table-waiver` | RED + emission |
| `declared-none-compliant-control` | `PASS` + `declared-none-table-waiver` + `av-deferral-declared` | GREEN + 2 emissions |
| `malformation-criteria-block-defects` | `MALFORMATION` ×3, all catalog strings verbatim | RED |
| `malformation-block-not-found` | `MALFORMATION` + `declared per-parent, block not found for parent 2` | RED |
| `normalization-absorbed-artifacts-control` | `PASS` (per-row match asserted) | GREEN |
| `compliant-full-control` | `PASS` + `av-deferral-declared` only | GREEN + emission |
| `ratification-record-valid-control` | record resolves to `2026-09-19` (value asserted); `PASS` on parent 1 | GREEN |
| `ratification-record-line-reworded` | `RATIFICATION_RECORD_UNRESOLVABLE` + `cannot resolve ratification record at <path>` verbatim | RED |
| `ratification-record-ballot-absent` | `RATIFICATION_RECORD_UNRESOLVABLE` + the **same** string | RED |

---

## Contest notes embedded in the set — and their dispositions

Four cases carry a **Contest note**. Each names a place where the design is silent, the law and the design pull differently, or scope is genuinely arguable — surfaced rather than absorbed, because a fixture whose expectation was quietly chosen by the encoder is not a falsification fixture. Thurgood's 2026-09-19 on-branch review dispositioned all four; three are closed, one is with Peter.

1. **`evidence-warn-row-without-followup`** — *the substantive one, and the only open item.* The guide and PSP both make a ⚠️ row's follow-up link a **MUST**; the design's C5 predicate list does not name it. Three dispositions offered (mechanize / route to the claims pass / rule out of scope); my position is mechanize.
   **→ HELD FOR PETER (contest exercised, 2026-09-19).** Thurgood's position: out-of-scope for the instrument as designed — Req 6.4's verdict surface enumerates Evidence duties as *non-empty + permitted kind*, a ⚠️-link detector is a predicate limb the ruled design does not carry, and the MUST's owner today is the claims pass (the same division as artifact truth). That is the legitimate contest ground Req 6.5 names, exercised in the open rather than by deletion — which is the outcome the anti-veto bound exists to produce, and I record it as correctly handled regardless of how Peter rules. **My re-class-don't-delete condition is honored on both branches**: if Peter rules judgment, the fixture re-classes to a documented-limit control with the disposition in its provenance header, and the MUST acquires a named owner instead of falling between two.
2. **`deferral-free-prose-near-miss`** — the catalog fixes the message, not the enclosing `Verdict` member. I specified `AV_MISSING_OR_MALFORMED`; `MALFORMATION` was offered as the defensible alternative.
   **→ RESOLVED to `MALFORMATION`** (Thurgood, 2026-09-19; symmetry with the exemption sibling — both are fixed-form near-misses in the design's Error-Handling catalog). Taken as my stated alternative, not a contest. My three non-negotiables hold in the build: catalog message verbatim, `deferrals` empty, non-zero exit.
3. **`exemption-paraphrase`** — I specified `MALFORMATION`; `SET_MISMATCH` **in addition** acceptable, **instead** not.
   **→ RESOLVED as specified** (Thurgood, 2026-09-19).
4. **`declaration-missing-post-ratification`** — a scope contest was legitimately available: the declaration duty reads as diff-scoped, while every other fixture exercises the full-scan path.
   **→ MOOT** (Thurgood, 2026-09-19): the build asserts declaration presence **in the full scan** (`resolveMode` → `NON_COMPLIANT_NO_DECLARATION`), so the assertion lives in the fixture set without a contest. My position — *where the assertion lives, not whether it exists* — is satisfied.

---

## Review record — Thurgood, 2026-09-19 (on-branch, `task/127-u2-checker`)

| Item | Disposition |
|---|---|
| The 5 authored manifest extensions (`normalization`, `evidence`, `forced-negative`, `declared-none`, `malformation`) | **ACCEPTED** — manifest carries them |
| `ratification-record` proposal, **route 1** | **ACCEPTED** — the injection seam already exists in the build (`parseRatificationRecord(ballotText, ballotPath)`, a pure function), so the harness widening is exactly the optional `ballot.md`. Class list → **17**. Three cases authored 2026-09-19 |
| `deferral-free-prose-near-miss` verdict member | Taken as my stated alternative → `MALFORMATION` |
| `exemption-paraphrase` verdict member | As specified → `MALFORMATION` |
| `declaration-missing-post-ratification` scope | Moot — asserted in the full scan |
| `evidence-warn-row-without-followup` | **Contest exercised; held for Peter** (see item 1 above) |

**Process observation, recorded because it is the point of the anti-veto bound**: every contestable expectation in this delivery was either accepted, taken as a stated alternative with the record saying so, or contested in the open with Peter arbitrating. Nothing was resolved by a fixture quietly changing or disappearing — the failure mode Req 6.5 names. The provenance headers are what will keep that true after this session.

---

## Encoding requirements the build must honor

These are not conveniences; several fixtures are inert without them.

1. **An authorship-date seam.** `declaration-missing-post-ratification` and both materiality cases need the `tasks.md` authorship date to be **injectable** into evaluation (CI supplies it from git; fixtures supply it from `expected.json`). Without the seam, `tasks-md.ts` is not unit-testable and the `declaration` class has no fixture. If the build declines the seam, that is a blocked deliverable for Peter — **not** grounds to shrink the manifest.
2. **Per-fixture completion-doc filenames.** `omit-doc-agent-suffixed-doc-found-control` requires the doc to keep the name `task-2-kenya-completion.md`; `omit-doc-no-completion-doc` requires the directory to contain **no** completion doc at all. A harness that hard-codes `completion.md` cannot express either, and doc-location variance is a corpus-verified surface.
3. **Base/head pairs.** Three cases encode as `{ tasks.base.md, tasks.head.md, expected.json }` with no completion doc: both materiality cases and `declaration-missing-post-ratification`.
4. **Invisible codepoints, inserted deliberately and recorded.** `normalization-absorbed-artifacts-control` (U+00A0, U+200B) and `materiality-tick-only-immaterial-control` (U+00A0) specify insertions in prose because invisible characters do not survive review. The provenance header must record each insertion.
5. **No formatters over the encoded tree.** Every artifact in the normalization, deferral-arrow and reflow fixtures is the kind a formatter removes. In particular `declared-none-compliant-control`'s `->` must not be prettified to `→`, and `exemption-verbatim-honored-control`'s em dash (U+2014) must not become a hyphen — that single substitution inverts the fixture's expected outcome.
6. **Line-number slots are encoding-dependent.** `malformation-criteria-block-defects` cites lines 10 / 27, 33 under a stated assumption about encoding. Keep the provenance header **out of** `tasks.md` (put it in `expected.json`) so the numbering holds; otherwise recompute and note it.
7. **Assert positively.** Controls must assert `verdicts: []`, the expected emissions, and `exit: 0` — never merely "no error". A checker that silently evaluates nothing passes every negative-only assertion in this set.
8. **An optional `ballot.md` plus the injected ballot path** (route 1, accepted 2026-09-19). Two `ratification-record` cases supply a `ballot.md`; `ratification-record-ballot-absent` supplies **none**, and an empty placeholder must not be added for symmetry — an empty file exercises the parse path and would duplicate its sibling. All three carry the **injected path string** in `expected.json`, handed to `parseRatificationRecord(ballotText, ballotPath)`; use the real pinned path `.kiro/docs/ballots/2026-09-19-completion-claims-integrity.md` so the message slot reads as it will in production.
9. **Assert resolved values, not parse booleans**, for the ratification record. `ratification-record-valid-control` asserts `ratifiedMachine === '2026-09-19'` **as read from `ballot.md`** — a build that hard-codes the date anywhere passes all three cases for the wrong reason, which is precisely the constant DD2 forbids.

---

## Manifest extensions — the six, and why

C7 grants extension as my right; each of these covers a falsification surface the ruled eleven leave unguarded. Five were authored at delivery; `ratification-record` was added when Thurgood accepted route 1.

- **`normalization`** — the floor's mutation classes all assume the comparison itself works. The (c′) predicate has two failure directions, and **both are fatal in opposite ways**: too strict and every compliant author meets a false red on their first doc (the adoption failure that makes the exemption string the path of least resistance); too loose and `reword` and `relax` walk straight through. Neither direction is detectable from the six mutation classes alone, because a too-loose checker passes the mutation fixtures only if you never write the control, and a too-strict checker passes all six trivially.
- **`evidence`** — the floor guards the **set**; nothing in it guards the **cell**. An exact-set table of ✅ rows evidenced by activity prose is the measured M4 = 0/22 baseline reproduced in a compliant shape: full marks on the headline rule, zero verification. The Evidence predicate is where the table stops being bookkeeping.
- **`forced-negative`** — the line is the law's only structural defense against silence, and it is the least table-shaped element in the rule: one boolean about an absent thing. Booleans about absent things are the assertions implementations forget to write.
- **`declared-none`** — Req 1.6's narrow waiver is a **one-line control-flow bug away** from waiving the whole parent (`if (declaredNone) continue;`), and it bites hardest on documentation/scaffolding parents whose entire promise surface is `**Primary Artifacts:**` — i.e. the population the criteria table already doesn't cover.
- **`malformation`** — the loud-failure catalog fixes five message strings whose shared property is that **every one has a plausible silent resolution**. A tolerant parser produces a green run over a promise set the file never defined, which is worse than a red: the instrument is now asserting parity against fiction. This is the C4-1 dormancy defense on the parser's own surface, and the floor guards none of it.
- **`ratification-record`** *(added 2026-09-19)* — `RATIFICATION_RECORD_UNRESOLVABLE` (B-2) is the single load-bearing anti-dormancy mechanism in the instrument: *"ballot absent, or machine line absent/unparseable → LOUD RED"*, carrying the explicit claim that **no vacuous-green state exists at all**. A construction with no test is a claim. The failure mode is a **green run over a law that is no longer being enforced** — the first design draft's prose parse failed on ~31% of the ballot corpus and **failed GREEN**, which is the history this class exists to keep from repeating. Guarded by the floor rather than by attention: if these three cases are ever deleted, `fixtures.test.ts` goes red at zero.

---

## Resolved — the `ratification-record` route decision

Delivered as a **proposal** (not encodable in the `{tasks.md, completion.md, expected.json}` shape, because the condition lives in a ballot at a pinned repository path), with two routes and a recommendation of route 1.

**→ ROUTE 1 ACCEPTED (Thurgood, 2026-09-19.)** The ballot-path injection seam already exists in the build — `parseRatificationRecord(ballotText, ballotPath)` is a pure function — so the harness widening is exactly the optional `ballot.md` and nothing more: strictly less than the minimal widening I costed. The class list grew to 17 and the three cases are authored.

The residual I recorded at delivery — *route 2 would guard the anti-dormancy check by attention rather than by the floor, the trade this spec generally refuses* — is **discharged, not absorbed**: route 1 puts the guard behind the floor's red-at-zero, which is what the residual asked for. Nothing survives to carry forward.

---

## Thin spots — stated, not hidden

- **`declaration` has no PASS-expected control.** The compliant-declaration path is exercised incidentally by every per-parent control in the set (each carries `**Criteria mode**: per-parent` and must not red). A dedicated control would be cheap if the build wants one; I judged it redundant rather than absent.
- **`forced-negative` has no *malformed*-line case** — only the missing-line case. A line reading `Unmet criteria: none` (wrong prefix, wrong case) is plausibly common and is currently unspecified. Named here rather than left silent; worth adding if U2 has room.
- **`malformation` has no control.** There is no meaningful "well-formed malformation"; the compliant parse path is covered by every other control in the set.
- **No fixture exercises multiple specs in one run.** DD1's full-scan semantics (population selection across specs; `spec-level` and legacy skipped) are asserted only per-fixture. If the harness can host a multi-spec fixture cheaply, population selection deserves one — a checker that evaluates the right parents in the wrong population is green everywhere.
- **No product-tier fixture beyond `omit-doc-agent-suffixed-doc-found-control`.** Req 10's committed-Implementation-Report Evidence shape is exercised there (claim-grain anchors classifying as `path`), but the 3× row multiplication of a real cross-platform product parent is not. Req 10.4's named revisit at the first product spec's tasks round is the right place for that, and I flag it forward rather than inventing a product fixture before a product spec exists.
