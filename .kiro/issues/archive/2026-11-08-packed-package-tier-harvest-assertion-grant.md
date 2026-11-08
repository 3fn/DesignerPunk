# Issue: the packed package-tier harvest assertion is outside Ada's scope; the grant

**Date**: 2026-11-08
**Owner**: Ada
**Class**: P2 obligation (guard) · grant
**Trigger**: `path:tests/consumer-integration.test.ts` — the event that owes the close is the merge of the fixing PR that adds the assertion. The close is this record's rule 5 outcome line, giving the fixing PR's number and the granted-file diff.
**Source**: Peter's routing of 2026-11-08T17:02:40Z ("Re: 2, Yes, please"), `.kiro/specs/129-consumer-generation-completeness/evidence/2026-11-08-peter-rulings-cracks-ballot-and-routing.md`; the CLOSEOUT claims pass, CP-3; record `.kiro/issues/2026-09-27-progress-token-harvest-may-not-cross-dual-instance-boundary.md` (whose Trigger this grant's fixing PR now owes).

---

## What is needed

The packed-install test asserts only `progress.*`, which never crosses the dual-instance boundary. One new assertion that a package-tier component token (one of the six harvested from the package's own tree) appears in the generated output makes the test fail if the brand stops surviving the boundary. `tests/consumer-integration.test.ts` is outside Ada's standing scope.

**Consulted**: Thurgood, on placement and the grant.

---

**Grant paths**: `tests/consumer-integration.test.ts`, limited to one new assertion that a package-tier component token is harvested. No existing assertion changes.

---

## The fixing PR

A later PR, opened after this grant merges (Ada). Its assertion lands only then.

## Acceptance

1. The `tests/consumer-integration.test.ts` diff is one added assertion and nothing else.
2. The assertion goes red when `TOKEN_CONTRACT_BRAND` is swapped for a plain `Symbol()` and green on `main`.
3. `npm run test:consumer` passes.

Counter-argument and what survives: the existing `progress.*` assertion plus the unit test `brand-dual-instance.test.ts` may be judged enough. What survives is that the unit test is not the packed install the record cites as authoritative; the cost is one more assertion in the consumer lane.

---

## Outcome

**Closed at the fixing PR's merge (Ada, owner; rule 5).** The fixing PR is #<N> (`chore/129-cp3-package-tier-assertion`). Its `tests/consumer-integration.test.ts` diff is one added assertion (`expect(componentsRaw).toContain('avatar.size.md')`, 3 lines with a comment, no existing assertion changed). Bite: with `TOKEN_CONTRACT_BRAND` swapped for a plain `Symbol()`, `generate produces output files` fails on that assertion (7 consumer cases fail in all) and the existing `progress.*` assertion alone had stayed green; at head `npm run test:consumer` passes 94 of 94. The grant expires with the close.
