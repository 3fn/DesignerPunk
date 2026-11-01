# 17.0.0: the major where the web element's public contract is cleaned up and React and React Native bind to it

**Date**: 2026-11-01
**Type**: charter. It names a direction. It plans no work and sets no date.
**Owner**: **Peter**. The direction is his; under rule 9 the body is his to edit, and any seat may append dated, signed lines. **Filed by**: Thurgood, under rule 10, as the fix of Peter's 2026-10-20 record `.kiro/issues/2026-10-20-17-0-0-release-charter.md` ("Who charters 17.0.0, and when?"), which closes in this PR by pointing here.
**Trigger**: `path:.kiro/specs/128-react-react-native-platform-admission/design.md` — the event that owes a reading of this charter is Spec 128's design landing. That is the caveat's test: does the binding need a breaking change? The monthly health-check walk also reads it, as an active charter (README rule 6).
**Class**: P2 obligation (record) · charter *(set 2026-11-01, Thurgood, filer, rule 12. It records a direction that open records depend on; no reader is misled by it, so `(record)`. Not P3: three records take their start condition from it.)*
**Source**: Peter's R11 line 12, `.kiro/issues/2026-10-30-release-16-2-peter-rulings-and-delegation.md` § "R11".

---

## Peter's direction, in his words

Chat, relayed by the orchestrator, received before 2026-11-01T15:29:54Z (the orchestrator's `date -u` at receipt). His first message, verbatim, with one typo corrected (meaning unchanged; "at 17" read as "a 17"):

> "I don't really plan releases that way... I focus more on what direction we take and versioning is a consequence. I would imagine adding react and react native would warrant a 17 release. Honest thoughts?"

**The text put to him in reply**, the orchestrator's honest read and the proposed charter:
- Adding React and React Native is additive: a minor on its own.
- What warrants a major is the web element's public-contract cleanup, G-4 items E2–E7, which React binding needs. Spec 128's own inbound says generated React wrappers do not ship before that cleanup.
- The proposed charter, in his words: 17.0.0 is the major where the web element's public contract is cleaned up (G-4) and React and React Native bind to it (128). Breaking changes ship together there. There is no date. The sequencing 129 → 131 → 128 → 130 is unchanged.
- The caveat: "unless 128's design shows the binding needs no breaking change".
- It is a record, not law, so criterion 3 is untouched.
- The alternative named was "standing exception": name no number before 128's design.

**His answer**, verbatim: "Charter it in those words"

## The charter

- **17.0.0 is the major where the web element's public contract is cleaned up and React and React Native bind to it.**
  - The cleanup is G-4: items E2–E7 of `.kiro/issues/2026-10-20-web-element-api-and-form-participation.md`, chartered as `.kiro/issues/2026-10-30-g4-web-element-public-contract-charter.md`.
  - The binding is Spec 128.
- **Breaking changes ship together there.**
- **No date.** Versioning follows direction (Peter: "versioning is a consequence").
- **The spec order is unchanged**: 129 → 131 → 128 → 130 (`.kiro/issues/2026-10-18-spec-priorities-by-outcome.md`).
- **The caveat**: unless 128's design shows the binding needs no breaking change. In that case 17.0.0 is not yet needed, and adding React and React Native alone is additive, a minor. The Trigger above fires at that design, so the caveat is read where it can be decided.

## What hangs on it

- **E2–E7** of `.kiro/issues/2026-10-20-web-element-api-and-form-participation.md` (Lina) are owed no later than 17.0.0. Their start condition was "the 17.0.0 charter"; this is it. They also ride G-4, with the gate in R8 item 5: 128's React (web) binding design is not approved before G-4's design merges.
- **Spec 128's generated-wrapper sequencing rule**: generated React web wrappers do not ship before the 17.0.0 element cleanup (`.kiro/specs/128-react-react-native-platform-admission/inbound-from-identity-sitting-2026-10-20.md` § 2 F-6, "Sequencing rule").
- **The blend deprecation's next-major removal**: `.kiro/issues/2026-10-16-blend-deprecation-next-major-doc-correction.md`, where "the next major version" in a 16.x package now means this 17.0.0.

## What it does not do

- It plans no work and sets no date.
- It is not law. Nothing here binds a seat beyond the start conditions the records above already name.
- It changes no spec order and no release's scope.

## State under 16.2.0's criterion 2

This charter is routed to itself, in place: its own named release, counted at the root (Stacy's charter split, 16.2.0 walk). It is not due at 16.2.0's S.

*Filed: Thurgood, 2026-11-01, for Peter.*
