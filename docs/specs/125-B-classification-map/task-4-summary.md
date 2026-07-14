# Task 4 Summary: U2 — Net-New Checks + Re-arms (125-B)

**Date**: 2026-07-14
**Unit**: U2 | **Validation**: full `npm test` (377/8,987 green, post-rebase) + `tsc` clean

## What shipped

- **The dormant WCAG check lives again, aimed correctly**: the six stale legacy names replaced by the audited canonical allowlist (69 contracts selected through the same matcher the audit used — audit-clean ⇒ arm-green by construction). Floors: aggregate + per-literal on three names (Peter's amendment: `state_disabled` excluded *pending the Button-CTA adjudication*, routed as its own design item).
- **Validation-criteria completeness now blocks**: a contract with no way to verify it fails the suite — promoted safely because the pre-arm inventory found the corpus already clean (234/234).
- **Console noise is a hard gate on the root lanes**: unallowlisted console output fails the test; the 12-entry allowlist encodes the PR #39 adjudications and discharges the parked jsdom doc-ballot.
- **Experiment 3 answered the honesty-guard question with data**: token-creation *detection* is merely-hard (flat families near-perfect; nested families need real tooling — a deliberate U3 cost call); approval *verification* is unmechanizable at the diff surface. The rule's register row is warn-tier, never barrier — the first disposition set by measurement.
- **The register grew from 3 to 10 entries**, every one with dated, attributed history; drafted-by/landed-by attribution preserved where the steward landed owners' drafts.

## Carried forward

- Button-CTA disabled-state adjudication (chip; Lina → Peter ruling) — the register note reads "pending adjudication," deliberately unresolved.
- U1b candidate row: philosophy-conformance check (red on presence).
- U3 recommendation: token-grain detection for flat families + file-grain routing for nested; AST only if noise justifies.
- Post-merge: gate-bite proofs (console-fail, WCAG floors); U2's merge = window segment boundary (instrument PR, excluded from the observed set).
