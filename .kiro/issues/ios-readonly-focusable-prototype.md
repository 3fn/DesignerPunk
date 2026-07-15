# Tracking: iOS `.focusable(interactions:)` Prototype for readOnly FKA Reachability

**Date**: 2026-07-15
**Owner**: Kenya (assigned in the iOS readOnly adjudication, condition 2 — accepted in [KENYA R2])
**Status**: OPEN — DEFERRED (Peter, 2026-07-15: no hardware access currently;
revisit in a later roadmap phase). Until then the `interaction_focusable`
iOS readOnly carve-out stands as the declared, mitigable exception the
contract words it as — nothing degrades by waiting, and the auto-tighten
clause fires whenever this runs.
**Source**: `.kiro/issues/input-text-base-ios-readonly-adjudication.md`, RULED B-prime (Peter, 2026-07-15)

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
