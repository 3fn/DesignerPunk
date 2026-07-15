# Input-Text-Base: iOS readOnly-as-Disabled Adjudication

**Date**: 2026-07-15
**Owner recommendation**: Lina (fix iOS — parity or documented native adaptation; `.disabled()` valid under neither)
**Source**: Post-merge review of the no-disabled-states cleanup (PRs #83–#85)
**Status**: OPEN — awaiting ruling

---

## Question

`InputTextBase.ios.swift` implements the `readOnly` prop via SwiftUI's
`.disabled(readOnly)` (lines 224, 249; inherited by Email/Password/PhoneNumber).
This makes a read-only field unfocusable, unselectable/uncopyable, and
announced by VoiceOver as "dimmed" (disabled) — while web (`readonly`
attribute) and Android (Compose `readOnly = true`) keep the field focusable,
selectable, and correctly announced. Is this a defensible platform adaptation,
or de-facto disabled semantics contradicting the no-disabled-states
philosophy and cross-platform parity?

## Findings (Lina)

- Born 2026-01-01 (commit 343c2903, Spec 034 Task 4) as
  `.disabled(readOnly || isDisabled)` — readOnly piggy-backed on the disabled
  mechanism SIX DAYS before the no-disabled-states philosophy (Spec 038,
  2026-01-07). Same grandfathering window as Button-CTA.
- Survived two disabled-cleanup passes (Spec 066 web, 2026-03-01; PR #84
  iOS/Android, 2026-07-15) because both were scoped to *disabled* semantics.
  PR #84 consciously retained `.disabled(readOnly)` with a documented but
  technically incorrect rationale ("SwiftUI's mechanism for readOnly" —
  input-text-base-disabled-implementation-cleanup.md:51). SwiftUI has no
  read-only TextField; `.disabled()` produces disabled semantics regardless
  of intent.
- Three-way divergence: web (`InputTextBase.web.ts:302`) and Android
  (`InputTextBase.android.kt:308`) keep readOnly fields focusable, selectable,
  copyable, announced "read only"; iOS blocks focus, selection, and copy, and
  VoiceOver announces the WRONG state ("dimmed").
- Live contract breach: `contracts.yaml` `interaction_focusable`
  (required: true, platforms [web, ios, android], WCAG 2.1.1) has no readOnly
  carve-out. No readOnly contract exists at all, and no read-only concept
  exists in the 136-concept Catalog — a contract gap.
- Governance letter violated: Test-Behavioral-Contract-Validation.md's
  exclusion-guard checklist asserts "iOS: no `.disabled()` modifier applied" /
  "No platform-equivalent disabled semantic … is ever applied". The mechanical
  guard (`form-inputs-contracts.test.ts:134` DISABLED_EXCLUSION_GUARD_PATTERNS)
  misses it — no `.disabled(` pattern.
- Demo divergence: `demos/input-text-demo.html` claimed read-only is
  "focusable but not editable" (false on iOS) and still described a disabled
  state the component no longer has (stale; reworked platform-neutral in the
  residue-cleanup branch pending this ruling).

## Options

**A — Parity fix (recommended)**: iOS readOnly keeps the field focusable,
selectable, copyable, non-editable. Candidate mechanisms: read-only binding
(`Binding(get:, set: { _ in })`) with an appended "read only"
accessibilityValue/hint; or UIViewRepresentable UITextField
(`shouldChangeCharactersIn → false`, optional `inputView = UIView()`) for the
most faithful web-readonly equivalent.

**B — Documented native adaptation**: iOS renders readOnly as
`Text(value).textSelection(.enabled)` (Settings-row convention: display, not
field). Selectable/copyable/VoiceOver-correct, but leaves the form-control
focus order — a declared, contracted platform difference, not a silent one.

**C — Status quo**: keep `.disabled(readOnly)`. Not defensible under either
philosophy reading: it re-introduces disabled semantics the system banned
corpus-wide for accessibility reasons, misannounces state to VoiceOver, and
breaches the live interaction_focusable contract.

## Counter-arguments

- Against A: "focusable but not editable" is a web idiom; SwiftUI resists it
  (keyboard raises for a field that won't accept input; constant-binding IME
  quirks). True Native architecture permits adaptation — B may be the more
  honest iOS answer.
- Against B: it breaks the shared types.ts behavioral contract silently for
  keyboard users who expect form fields in the focus order, and requires a
  new contract concept + platform-notes machinery to document properly.

## Follow-ups (either ruling)

1. Extend DISABLED_EXCLUSION_GUARD_PATTERNS with an iOS `.disabled(` guard
   (allowlisting none in Form Inputs).
2. Propose a read-only concept for the Concept Catalog (ballot) and author the
   readOnly contract in Input-Text-Base/contracts.yaml pinning focusability/
   selectability/announcement per the ruling.
3. Fix demos/input-text-demo.html readOnly copy per the ruling (interim: the
   residue-cleanup branch reworded it platform-neutral).
4. Correct the retention note in
   input-text-base-disabled-implementation-cleanup.md:51 to reference this
   adjudication.

## Ruling

*(pending)*
