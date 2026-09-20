# Task 2 Completion: Build and prove the instrument (U2)

**Date**: 2026-09-19
**Task**: 2. Build and prove the instrument (U2)
**Type**: Implementation
**Status**: Complete
**Spec**: 127 — Completion-Claims Integrity
**Unit**: U2 — The instrument (single-parent unit; this parent IS the merge unit; **midpoint carrier** — the MIDPOINT pass fires at this unit's merge, record at `completion/claims-pass-midpoint.md`, never `claims-pass.md`)
**Delegated-tier** _(exception-based note)_: plan held — main-session execution with Stacy invoked at 2.1 as scheduled. One tier data-point: Stacy's fixture-specification authoring ran **Opus-tier** (adversarial falsification design — a decide-shaped task); no Sonnet-tier module delegation was used (modules were small and contract-coupled; delegation would have cost more in verification than it saved).

> The criteria table below reproduces every `tasks.md` success criterion for Task 2 verbatim, as an exact set, per `governance/completion-documentation-guide.md` § "Parent Success-Criteria Fidelity". One row is ⚠️, deliberately — see the forced-negative line.

---

## Success Criteria Verification

| Criterion (verbatim) | Status | Evidence |
|---|---|---|
| `npm test` passes with the six new suites in the functional lane (the loud-string catalog-conformance cases live **inside `verdict.test.ts`** — Stacy A-9's disambiguation) | ✅ | `npm test` → **365 suites / 9,027 tests passed** (2026-09-19, this branch, post-fixture-encode + post-⚠️-link-predicate). The six suites under `scripts/completion-claims/__tests__/` run in the functional lane via the `jest.config.js` roots extension (subtree root `scripts/completion-claims`); the loud-string catalog-conformance cases are `verdict.test.ts` § "CATALOG CONFORMANCE" (10 cases, expected strings transcribed literally from the design's Error-Handling table) |
| `npm run check:completion-criteria-parity` exits green with 127's Task-1 doc evaluated as in-scope, output (association manifest + emission summary) recorded — **a self-consistency check; the falsification load is carried by the fixture suite** (Stacy A-6's framing correction) | ✅ | Run recorded below (§ "First live in-scope run"): exit 0, `spec 127-completion-claims-integrity (per-parent)`, association manifest for parents 1–3, parent 1 PASS. Falsification load: `fixtures.test.ts` (31 fixtures, 23 falsification / 8 controls) |
| The CI run on the U2 PR itself is green over the full population **including this parent's own completion doc**, checked before submission (Stacy A-10 — the recorded 2.7 run and the gate run evaluate different populations; both must be green) | ⚠️ | Local full-population run green **including this document** (§ "Gate-population pre-check" below, run after this doc landed — parent 2 PASS); the workflow is `.github/workflows/completion-criteria-parity.yml` and the PR's own CI run completes this criterion at the gate — it cannot have run before the PR exists, so it is ⚠️ here, not claimed |
| Every class in `expected-classes.json` has at least one encoded fixture; every fixture carries a provenance header citing a spec file in `fixtures/`; `fixtures.test.ts` passes — and **the floor's red-at-zero behavior is itself asserted by a standing unit test** (the floor logic run against an empty set expects failure — Stacy A-5: reconstructible from the shipped tree, not a transient demonstration) | ✅ | `fixtures.test.ts` § "the coverage floor": every manifest class covered (17 classes / 31 fixtures); per-fixture provenance asserted (`every fixture declares a manifest class and a resolvable provenance spec`); **STANDING red-at-zero test**: `uncoveredClasses(manifest.classes, [])` must equal the full class list — reconstructible from the shipped tree |
| The `--verify-extraction` digest over the corpus is recorded in the completion doc and **reconciled against the ballot's per-class counts — every difference attributed to enumerated corpus changes in the U1→U2 interval, never to extraction behavior** (Stacy BLOCKING-3: the design ruled the corpus moves; reconciled-with-attribution is the falsifiable form of a match the design declined to assert) | ✅ | Digest + totals recorded below (§ "--verify-extraction reconciliation"): **all eight classes match ballot § 5.7 exactly** — P1 1128, P2 793, P3 66, P4 17, P5 710, P6 17, P7 3, P8 1 over 154 files. Differences attributed: **NONE — zero `tasks.md` files changed in the U1→U2 interval** (the U2 branch adds no tasks.md; 127's own tick-state edits are mask-invariant by Req 2.3.2) |
| Every loud-failure string emitted by the checker is string-equal to its design-catalog row | ✅ | `verdict.test.ts` § "CATALOG CONFORMANCE" — each catalog row asserted string-equal against a literal transcription of the design table (slots filled: parent numbers, line numbers, the pinned ballot path); fixture `expected.json`s pin slot-filled instances a second, independent time |
| The CI workflow exists with check context `completion-criteria-parity` and is **not** in any required-checks list or `EXPECTED_CONTEXTS` | ✅ | `.github/workflows/completion-criteria-parity.yml` — job name/check context `completion-criteria-parity`, `pull_request` trigger, `fetch-depth: 0`. `grep -c completion-criteria-parity tools/agent-generator/verify-gate-registration.sh` → **0**; no required-checks list touched |
| Stacy's fixture set is delivered per Req 6.5 — reviewed on-branch **with the ruled contest path exercised or waived-by-no-contest recorded** (Thurgood may contest a fixture as out-of-scope for the rule as authored; Peter arbitrates; a fixture that disappears from the set is the failure — Stacy A-11) — or the completion doc records the escalation to Peter as a blocked deliverable (the forced-negative path) | ✅ | 31 specifications delivered in `.kiro/specs/127-completion-claims-integrity/fixtures/` (INDEX.md § "Review record"). **The ruled contest path was exercised**: `evidence-warn-row-without-followup` contested by Thurgood as out-of-scope for the instrument as designed; escalated; **Peter ruled disposition 1 — MECHANIZE (2026-09-19, this session)**; the ⚠️-link predicate implemented and the fixture encoded as specified. No fixture disappeared from the set |

Unmet or partially met criteria: **(1)** "The CI run on the U2 PR itself is green over the full population including this parent's own completion doc, checked before submission" — the local pre-check over the full population **including this document** is green and recorded below; the CI run itself fires when the PR opens (this doc commits before the PR exists) and the criterion completes at the gate. Follow-up: the `completion-criteria-parity` check on the U2 PR (workflow `.github/workflows/completion-criteria-parity.yml`; Peter merges on green).

### Additional verification

*(Task 2 declares no `**Merge gate:**` clause — no gate-condition rows are owed.)*

Primary Artifacts: all shipped as declared — `scripts/completion-claims/normalize.ts`, `tasks-md.ts`, `completion-doc.ts`, `materiality.ts`, `verdict.ts`, `scripts/check-completion-criteria-parity.ts`, `scripts/completion-claims/__fixtures__/` (31 encoded fixtures + `expected-classes.json`, 17 classes), `scripts/completion-claims/__tests__/` (six suites), `.github/workflows/completion-criteria-parity.yml`, `package.json` (modified: `check:completion-criteria-parity`). One additional modified file beyond the declared set, recorded rather than silent: `jest.config.js` (roots extension — required for the six suites to run in the functional lane at all; discovered at build: jest's roots did not previously cover `scripts/`).

---

## First live in-scope run (criterion 2's record)

```
== completion-criteria-parity ==
ratification record: 2026-09-19 (.kiro/docs/ballots/2026-09-19-completion-claims-integrity.md)
spec 127-completion-claims-integrity (per-parent):
  association: parent 1 ← block at line 46
  association: parent 2 ← block at line 84
  association: parent 3 ← block at line 119
  parent 1: PASS
population: 154 tasks.md — 1 declared per-parent, 0 spec-level (skipped), 153 legacy (skipped)
SUMMARY: parents evaluated 1, pass 1, fail 0; emissions 0; reds 0
```

(Recorded at 2.7's first run, before this document existed. The falsification load is carried by the fixture suite — this run is a self-consistency check, per Stacy A-6.)

## Gate-population pre-check (criterion 3's local limb)

Run after this document landed on the branch — output pasted verbatim in § "Validation" of the summary and reproduced by `npm run check:completion-criteria-parity`:

- parent 1: PASS · parent 2: PASS · parent 3 unticked (not evaluated) · exit 0.

## --verify-extraction reconciliation (criterion 5's record)

```
TOTALS (154 files): P1=1128 P2=793 P3=66 P4=17 P5=710 P6=17 P7=3 P8=1 segments=8892
corpus digest: sha256:d962e502093858af50862844c781388551057013a187786dfee327756bd59593
```

Ballot § 5.7 baseline: P1 1128 · P2 793 · P3 66 · P4 17 · P5 710 · P6 17 · P7 3 files · P8 1 file. **Exact match on all eight classes.** Attribution of differences: none exist — no `.kiro/specs/*/tasks.md` was added, removed, or edited between U1's merge (`9bcc114e`) and this run (the U2 branch's tasks.md edits are tick-state only, which the checkbox mask makes canonical-form-invariant). Interpreter note (ballot § "Named interpreter"): the counts here are computed by `countPatternClasses` — grep-equivalent semantics replicated in TypeScript, decoupled from the segment extractor precisely so differences could never be attributed to extraction behaviour (Stacy BLOCKING-3).

## Design-surface deltas, all recorded (never silent)

1. **The ⚠️-link predicate — Peter-ruled amendment (2026-09-19, this session).** Stacy's contested fixture was escalated per Req 6.5; Peter ruled mechanize. A claiming ⚠️ row with no link-shaped token (path, `#NNN`, URL, or `§`-anchored locatable-record citation) is `EVIDENCE_NONCOMPLIANT`. The `§`-citation admission keeps the live Task-1 doc's honest ⚠️ rows (whose follow-ups are ballot-§ records, with no issue owed) compliant.
2. **Annotation rows** (implementation decision, C3): a row whose Status cell is the em-dash `—` claims no verdict and is excluded from the claimed multiset — the live Task-1 AV table's "(none — no merge gate declared)" placeholder shape. Not abusable: marking a real criterion `—` removes it from the claimed set and still mismatches.
3. **Evidence-kind heuristic implementation notes** (C3's stated heuristic, instantiated): bare repo filenames with known extensions and optional `:line` anchors classify as `path`; quoted review confirmations ("independently confirmed at review: …") classify as `decision-record`; a backticked `invocation → result` pair classifies as `command`; a slashed token needs ≥2 separators, an extension, or in-repo resolution (so "and/or" stays prose). All four were forced by live-corpus or fixture false-reds — the fixture pipeline doing its job.
4. **Doc-less ticked parents print `not evaluated`**, never PASS, and count in neither pass nor fail — the named third state kept honest in the summary line.
5. **Poisoned parents**: a parent implicated in a criteria-block malformation has no promise set computed and is skipped (evaluating a fabricated set would assert parity against fiction — Req 2.2.2).

## Subtask contributions

- **2.1** — Stacy's fixture-specification authoring invoked as the unit's first act (Opus-tier subagent; 28 specs delivered in parallel with the build, +3 ratification-record specs after the route-1 adjudication); `normalize.ts` (four rules, bounded rule-(iii) scope, checkbox mask) + `normalize.test.ts`.
- **2.2** — `tasks-md.ts` (three parent forms + the 054a falsifier, association, declared-none, malformations, units-block precedence) and `completion-doc.ts` (glob-family location, three-column tables, forced-negative, AV, fixed-form deferrals/exemptions) with suites.
- **2.3** — `materiality.ts` (generous P1–P8 extraction + canonical-form comparison + `--verify-extraction`) with suite; corpus run reconciled: exact match, zero attributions needed.
- **2.4** — `verdict.ts` + CLI (full-scan parity incl. AV gate-row parity under the same predicate, declared-none narrow waiver, doc-not-found emission, catalog strings verbatim, association manifest, emission contract scoped per B-9, ratification-record loud-red with no vacuous-green state) with `verdict.test.ts` incl. catalog conformance.
- **2.5** — `check:completion-criteria-parity` wired in `package.json`; CI workflow authored, context fixed, non-required; `EXPECTED_CONTEXTS` untouched (verified 0 occurrences).
- **2.6** — On-branch review of all 31 specs; adjudications in INDEX.md § "Review record" (route 1 accepted for `ratification-record`; `MALFORMATION` taken as the recorded defensible member for the deferral near-miss; the ⚠️-link contest escalated and ruled); 1:1 encoding via fragment extraction from the spec files themselves (the 1:1 property held by construction); all five named encoding hazards verified (NBSP/ZWSP insertions, ASCII arrow, em-dash exemption, table-cell machine-line token); floor + red-at-zero standing tests.
- **2.7** — `npm test` 365/9,027 green; typecheck green; first live in-scope run recorded; gate-population pre-check green including this doc.

## Lessons learned

**The fixture pipeline caught four real defects before any human did** — a collector leak after a two-blocks malformation, evaluation of poisoned parents, two evidence-classifier false-red classes, and the PASS-display of unevaluated parents. Stacy's controls (the PASS-expected half of the set) did exactly the work she designed them for: three of the four were false-POSITIVE classes only a control can catch.

**Encoding by extraction beats encoding by transcription.** The fixtures were encoded by parsing Stacy's spec files and lifting their fenced fragments programmatically — the 1:1 property the provenance headers promise became true by construction, and the five invisible-codepoint hazards were applied as recorded insertions rather than hand-copied risk.
