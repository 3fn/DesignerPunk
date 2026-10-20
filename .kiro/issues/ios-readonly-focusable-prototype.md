# Tracking: iOS `.focusable(interactions:)` Prototype for readOnly FKA Reachability

**Date**: 2026-07-15
**Owner**: Kenya (assigned in the iOS readOnly adjudication, condition 2 — accepted in [KENYA R2])
**Status**: OPEN — DEFERRED (Peter, 2026-07-15: no hardware access currently;
revisit in a later roadmap phase). Until then the `interaction_focusable`
iOS readOnly carve-out stands as the declared, mitigable exception the
contract words it as — nothing degrades by waiting, and the auto-tighten
clause fires whenever this runs.
**Source**: `.kiro/issues/input-text-base-ios-readonly-adjudication.md`, RULED B-prime (Peter, 2026-07-15)
**Class**: P3 improvement · owed-act *(set 2026-10-20, Kenya, rule 12. The owed act is the on-device `.focusable(interactions:)` prototype (Kenya, adjudication condition 2). It is deferred by Peter and nothing degrades by waiting: the `interaction_focusable` iOS readOnly carve-out stands as the declared exception the contract words it as. Not P2: no reader is misled and no guard is weaker than its claim.)*
**Trigger**: `path:src/components/core/Input-Text-Base/platforms/ios/**` — the next change to the iOS Input-Text-Base implementation, the surface this prototype would change; at that PR the owner either runs the prototype (if hardware is by then available) or re-defers on the record. Peter's deferral (no hardware access; revisit in a later roadmap phase) is a start condition, not an event, so it stays prose above. *(Set 2026-10-20, Kenya, rule 9. Overrode the steward's `manual` proposal: a deferral with no computable event is the "calendar hope" rule 1 forbids, and this path is where the carve-out lives.)*

---

## What

On-device verification of whether `.focusable(interactions:)` (iOS 17+) can put the
readOnly `Text` rendering of Input-Text-Base into the Full Keyboard Access focus
order — the mitigation that would shrink the ruling's declared iOS focus-order
carve-out to zero.

## Protocol (from [KENYA R2] §4)

Real hardware, Full Keyboard Access enabled, verifying:

- (a) reachability in FKA order
- (b) whether copy is invocable from keyboard focus
- (c) interaction with the component's `accessibilityElement(children: .contain)` grouping
- (d) behavior with an external keyboard *without* FKA
- (e) (from implementation review) whether VoiceOver reliably utters the
  container-level "Read only" hint when landing on the inner selectable `Text`

## Outcome handling (contracted in `state_readonly`)

- **Verifies** → the contract auto-tightens: iOS re-enters focus order; the
  `interaction_focusable` carve-out shrinks to zero; promote `.focusable` from
  tracked enhancement to contracted behavior.
- **Fails** → per Data's recorded dissent, the ruling's ledger entry stands:
  iOS FKA/external-keyboard users are knowingly served worse than Android
  keyboard users for read-only content — declared, monitored, not erased.

**Walk 2026-10-20 (Thurgood, walk line under rule 9; ledger `archive/TRIAGE-2026-10-20.md` row 84, call BACK-FILL)**: this record lacks the rule-1 Trigger token (`**Trigger**: ` followed by one of `tag:v<semver>`, `merge:#<N>`, `path:<glob>`, `release:<ver>:phase-1` or `manual`) and the rule-12 `**Class**:` header. That is a walk finding. The owner writes both (rule 9); the steward writes neither. Steward's proposal, which the owner may override: Proposed `manual` · `P3 improvement · owed-act`.
