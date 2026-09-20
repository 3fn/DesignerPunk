# Task 2 Summary: Build and prove the instrument (U2)

**Date**: 2026-09-19
**Spec**: 127 — Completion-Claims Integrity
**Unit**: U2 — The instrument (single-parent unit; **midpoint carrier** — the MIDPOINT claims pass fires at this unit's merge, record at `completion/claims-pass-midpoint.md`)

## What shipped

**The `completion-criteria-parity` checker** — a real program implementing Requirement 2's predicate: five modules under `scripts/completion-claims/` (`normalize` — the four-rule shared core plus the checkbox mask; `tasks-md` — the strict parser; `completion-doc` — the glob-family locator and table/AV/deferral/exemption parser; `materiality` — the generous P1–P8 extractor with `--verify-extraction`; `verdict` — the parity predicate, emission contract, and the ratification machine-line gate with no vacuous-green state), plus the CLI (`scripts/check-completion-criteria-parity.ts`, wired as `npm run check:completion-criteria-parity`).

**The falsification fixture pipeline** — Stacy authored 31 fixture specifications (`.kiro/specs/127-completion-claims-integrity/fixtures/`); all 31 are encoded 1:1 by programmatic fragment extraction into `scripts/completion-claims/__fixtures__/` with provenance in every `expected.json`. The coverage manifest (`expected-classes.json`, 17 classes — the ruled floor of 11 plus Stacy's 6 extensions including `ratification-record`) is enforced red-at-zero by a standing test.

**Six jest suites in the functional lane** (jest roots extended to `scripts/completion-claims`): 135 tests, inside a full run of 365 suites / 9,027 tests, all green.

**CI wiring** — workflow `completion-criteria-parity`, context fixed at authoring, **non-required** (Req 6.6); `EXPECTED_CONTEXTS` untouched (0 occurrences). The arming remains Q2's guarded decision.

## The three governance events of the build

1. **The contest path fired and worked** (Req 6.5): Thurgood contested `evidence-warn-row-without-followup` as out-of-scope for the instrument as designed; **Peter ruled disposition 1 — mechanize (2026-09-19)**. A link-less ⚠️ row is now `EVIDENCE_NONCOMPLIANT`; the link-shaped-token set admits paths, `#NNN` references, URLs, and `§`-anchored record citations, keeping honest record-cited ⚠️ rows compliant. No fixture disappeared.
2. **The `--verify-extraction` reconciliation is an exact match** against ballot § 5.7 — all eight pattern classes (P1 1128 … P8 1, 154 files), zero corpus-change attributions needed.
3. **The fixture pipeline caught four real build defects** before any human review — three of them false-positive classes only Stacy's PASS-expected controls could catch.

## Validation

`npm test` → 365 suites / 9,027 tests green · `npm run typecheck:scripts` clean · first live in-scope run: 127 parent 1 PASS, exit 0 · gate-population pre-check **including Task 2's own completion doc**: parents 1–2 PASS, exit 0.

## What deliberately did NOT ship

The arming (Req 6.7 — Q2's guards; `EXPECTED_CONTEXTS` untouched); gate-bite (rides with the arming, per the register row's outstanding note); the MIDPOINT pass itself (fires at this unit's **merge**, Stacy's seat, hour-class).
