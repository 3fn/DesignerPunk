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
  *[Amended per Platform Consult (Data), below: only web explicitly announces
  "read only"; Android exposes a correct non-editable accessibility tree but
  no explicit read-only utterance. iOS remains the sole platform announcing
  the WRONG state — the framing weakens in precision, not conclusion.]*
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

## Platform Consult (Kenya)

**Date**: 2026-07-15
**Scope**: Independent verification of the SwiftUI claims + consumer's-eye view. Read-only consult; no code changed. Verified against `src/components/core/Input-Text-Base/platforms/ios/InputTextBase.ios.swift` (lines 224, 249, and `InputTextBaseFieldStyle` at 363–397), `InputTextBase.android.kt:308`, `InputTextBase.web.ts:302`, and `contracts.yaml:6`.

### 1. Claim-by-claim verification

**Claim: `.disabled(true)` blocks focus, hit-testing, and announces "dimmed" — VERIFIED, accurate.**
`.disabled()` propagates `\.isEnabled = false` down the environment. For a `TextField`/`SecureField` on iOS 17+: the field can never become first responder, so `@FocusState` can never engage (line 223/248's `.focused($isFocused)` is dead code when `readOnly` is true — the focus ring, float-label-on-focus, and `onFocus`/`onBlur` callbacks all silently no-op). Full Keyboard Access and iPad hardware-keyboard tab order both skip disabled controls. Touch interaction is fully inert: no cursor placement, no selection, no long-press edit menu, no copy. VoiceOver applies the not-enabled trait and appends "dimmed" — which is affirmatively the *wrong* state announcement for read-only, not merely a missing one. Lina's characterization is correct, not overstated.

**Claim: `InputTextBaseFieldStyle` pins `foregroundColor`, masking disabled dimming — VERIFIED, and slightly understated.**
Line 377 applies `theme.colorTextDefault` unconditionally, which overrides SwiftUI's default disabled text dimming. More than that: the style never reads `\.isEnabled` at all — border, background, and padding are all state-blind to disablement. So a readOnly field is *visually indistinguishable* from an editable one while being completely inert. That's arguably the worst combination: it doesn't even have the (wrong) affordance of looking disabled — to a sighted touch user it looks like a broken text field. One mitigating note for the record: because the float label keys off `isFilled` (line 124), a *filled* readOnly field does show its label floated correctly; an *empty* readOnly field shows the label in placeholder position and nothing can ever float it.

**Claim: constant binding keeps focus/selection/copy but has IME flicker + keyboard raise — VERIFIED, accurate; keyboard raise is NOT avoidable in pure SwiftUI.**
`Binding(get: { value }, set: { _ in })` keeps the field focusable, cursor-placeable, selectable, and copyable. The costs are real: (a) the visible-then-reverted character flicker on each keystroke as SwiftUI resyncs the field to the unchanged binding, which gets genuinely broken with marked-text IMEs (Japanese/Chinese composition can desync); (b) tapping the field raises the software keyboard for input that will be silently discarded — to a user this reads as "the app is ignoring my typing," which is worse UX than either honest alternative. There is no public pure-SwiftUI API on iOS 17 or 18 to suppress the keyboard for a focused `TextField` (no `inputView` equivalent; iOS 18's `TextField(text:selection:)` adds selection binding, not read-only). Suppressing the keyboard requires dropping to UIKit. I'd go further than Lina: mechanism 1 should be ruled out, not just flagged as risky.

**Claim: `UIViewRepresentable` UITextField is the most faithful web-`readonly` equivalent — VERIFIED, accurate; costs are real and if anything underweighted.**
`shouldChangeCharactersIn → false` plus `inputView = UIView()` is the canonical UIKit read-only field: first responder works, cursor/selection/copy work, software keyboard stays down, hardware keystrokes are rejected cleanly. But the integration costs for *this* component are larger than the adjudication doc conveys: `InputTextBaseFieldStyle` is a SwiftUI `TextFieldStyle` — it cannot apply to a representable, so font/color/padding/background/border/focus-ring must all be re-implemented in UIKit or wrapped externally. Worse, the whole component's state machine (float label, focus ring, `onFocus`/`onBlur`) is driven by `@FocusState`, which does not bind to UIKit first-responder status — you'd bridge it manually through delegate callbacks. That means either two rendering paths (SwiftUI field when editable, representable when readOnly — with subtle focus/caret/autofill behavioral drift between them) or a wholesale UIKit rewrite of the field. This is a permanent maintenance tax on the entire Form Inputs family (Email/Password/PhoneNumber inherit it), paid to reproduce a web idiom.

**Claim: `Text(value).textSelection(.enabled)` is selectable, VoiceOver-correct, and matches iOS convention — VERIFIED, with two nuances.**
VoiceOver reads it as static text with the correct content, no "dimmed" — correct state representation, provided the component composes label + value (e.g., `accessibilityLabel(label)` + value, or `LabeledContent`, which is exactly Apple's iOS 16+ API for labeled non-editable values — the Settings/Contacts-view-mode precedent Lina cites is real and strong). Nuances: (1) on iOS, `.textSelection(.enabled)` gives long-press → select/copy of the text — but unlike a text field, partial substring selection is limited; in practice you copy the whole string. For the reference-number case that's actually the desired behavior; it's a difference from web `readonly` worth stating in the contract. (2) Full Keyboard Access: static `Text` is not in the FKA focus order, so external-keyboard users cannot reach it to copy — this is the concrete cost behind Lina's "leaves the form-control focus order" line, and it's accurate. iOS 17's `.focusable(interactions:)` can put non-control views into keyboard focus, which could partially mitigate this, but its FKA behavior on iOS is inconsistent enough that I'd treat it as an enhancement to verify empirically, not a contracted guarantee.

**What Lina missed — nothing material, three additions:**
- **There is no trait/API route that fixes the status quo.** No "read-only" accessibility trait exists on iOS; `accessibilityRespondsToUserInteraction` is a hint to assistive tech about interactability, not an announcement mechanism. The correct announcement route on any option is appending "read only" via `accessibilityHint` or a composed `accessibilityValue`. So C cannot be patched into correctness — this confirms C is out.
- **`allowsHitTesting(false)` is a trap someone may propose**: it blocks touch but leaves the field focusable and *editable* via hardware keyboard/FKA. Not an option; pre-empting it.
- **Dead callback surface under the status quo**: with `.disabled(readOnly)`, `onFocus`/`onBlur` never fire for readOnly fields on iOS but do on web/Android — a behavioral divergence beyond the a11y one, relevant to any product screen wiring analytics or validation to those callbacks.

**Verdict on Lina's findings overall: verified, no overstatements. The one place I'd sharpen: Option A mechanism 1 (constant binding) should be off the table entirely, which narrows A to the UIViewRepresentable path — and that changes A's cost profile significantly.**

### 2. Consumer verdict

As the person who will build the screens that consume this:

- **Pre-filled confirmation screen**: I don't want disabled-looking fields or fields that raise keyboards. The iOS-native rendering of "here's what you entered" is labeled display rows (`LabeledContent` style). Option B is what I'd build by hand if the component didn't exist.
- **Locked email on a profile form**: this is B's hardest case — one non-editable value amid editable float-label fields. If B renders as a bare `Text`, the visual rhythm of the form breaks. What I actually want is B's *semantics inside A's chrome*: the same bordered container, floated label, and typography, with `Text(value).textSelection(.enabled)` in place of the `TextField`. Visually consistent with siblings, semantically honest, zero UIKit.
- **Copyable reference number**: B wins outright — whole-string copy is exactly the desired interaction, and a keyboard raising on tap would be actively wrong.

I do not want Option A as specified. Mechanism 1 produces interactions I'd have to apologize for in review (keyboard raises, typing swallowed, IME breakage). Mechanism 2 makes every Form Inputs field carry a UIKit bridge whose theming and focus behavior will drift from the SwiftUI path — and I'd be the one filing the "readOnly field's focus ring animates differently" bugs.

### 3. Recommendation

**B, refined: render readOnly as `Text(value).textSelection(.enabled)` inside the existing field chrome** (same `InputTextBaseFieldStyle` visual treatment: border, background, padding, floated label when filled), with composed accessibility (label + value + "read only" hint). Call it B-prime if the distinction matters for the ruling: it's Option B's semantics with the form's visual continuity preserved, which answers the strongest objection to B (the locked-field-amid-editable-fields case) without any UIKit.

**Strong counter-argument to my own choice**: B breaks the `interaction_focusable` contract for keyboard users in a way A does not. An external-keyboard/FKA user tabbing through a profile form will skip the locked email entirely — they can't reach it, can't copy it, and may not realize it exists. Web and Android keep it in focus order and announce "read only"; iOS under B silently drops it. That is a genuine accessibility regression relative to A's UIViewRepresentable path, and "it's the platform convention" is doing real load-bearing work in excusing it — Settings rows are reachable by VoiceOver but genuinely aren't in FKA focus order, so the convention has this same gap natively. If Peter weighs keyboard-user parity above native idiom, A (mechanism 2 only) is the defensible ruling and its maintenance cost is the price. A middle mitigation — `.focusable()` on the read-only Text for FKA reachability — should be prototyped, but contracted only if it verifies on-device.

**Contract wording constraints if B (or B-prime) wins:**
1. `interaction_focusable` needs an explicit, declared iOS readOnly carve-out (platform note), not silence — the current breach is bad precisely because it's undeclared.
2. The new readOnly contract should pin: content is selectable/copyable on all platforms (whole-string copy acceptable on iOS); VoiceOver/TalkBack/screen-reader announcement includes the label, the value, and a read-only indication, never a disabled/dimmed trait; `onFocus`/`onBlur` are declared not-fired on iOS readOnly (or the contract drops them from readOnly semantics on all platforms — pick one, cross-platform).
3. Keyboard focus order: declared per-platform (web/Android: in order, announced "read only"; iOS: not in FKA order, per platform convention) — with the `.focusable()` mitigation listed as a tracked enhancement, not a contracted behavior.
4. Regardless of ruling: Follow-up 1 (extend `DISABLED_EXCLUSION_GUARD_PATTERNS` with an iOS `.disabled(` guard) should proceed — the current guard missing this is how a "dimmed" readOnly field survived two cleanup passes.

**Status quo (C) is not defensible.** Independent of philosophy: it misannounces state to VoiceOver, silently kills contracted callbacks, and — because the custom style masks all disabled styling — presents users a normal-looking field that ignores them. That is the one option that is wrong on every axis.

---

## Platform Consult (Data)

**Date**: 2026-07-15
**Read-only consult, no files modified. Verified against**: `src/components/core/Input-Text-Base/platforms/android/InputTextBase.android.kt` (full file), the three semantic children (`Input-Text-Email/Password/PhoneNumber` Android impls), `types.ts`, `Input-Text-Base.schema.yaml`, `InputTextBase.web.ts`/`.web.css`, `InputTextBase.ios.swift` (lines 215–255), and a repo-wide search for Android test coverage. Compose behavioral claims are from the Compose foundation `BasicTextField`/`CoreTextField` contract (legacy `value`/`onValueChange` API — which is the API our component uses); TalkBack cannot be run from this repo, so device-level utterances below are flagged with confidence levels.

### Claim-by-claim verification

**1. "Compose `readOnly = true` keeps the field focusable, selectable, copyable, non-editable" — TRUE, with one small correction.**
Our component passes `readOnly` straight to `BasicTextField(readOnly = readOnly)` (line 308) and never touches `enabled` (defaults `true`). All three semantic children pass `readOnly` through unmodified (Email:155, Password:256, PhoneNumber:255). Compose's documented contract for `readOnly = true` is exactly what the adjudication claims: the field remains focusable, the user can select and copy text, and editing is blocked without disabled semantics. One nuance: Compose suppresses the editing caret in readOnly mode (cursor rendering is gated on `!readOnly`); the user gets tap-to-focus and long-press selection/copy, not a blinking caret. The substantive claims (focusable, selectable, copyable, not editable, not disabled) all hold.

**2. "Android announces 'read only'" — OVERSTATED. This is the doc's weakest Android claim.**
- *What Compose does mechanically (high confidence)*: `CoreTextField` gates the edit semantics actions (`setText`, `insertTextAtCursor`) on `enabled && !readOnly`, and modern Compose sets the `isEditable` semantics property false, which maps to `AccessibilityNodeInfo.isEditable = false`. So the accessibility tree is *correct* — no editing affordances are exposed, and critically nothing disabled-flavored is set.
- *What TalkBack actually says (medium confidence, verify on device)*: TalkBack does **not** utter the words "read only" for a non-editable text field. The read-only-ness is conveyed by omission — no editing hints — which is ambiguous to the user, not announced. There is no out-of-the-box "read only" utterance analogous to web's `aria-readonly` announcement.
- *What our component adds*: **nothing**. The only semantics block in the file (lines 228–235) sets `contentDescription` from helperText and `error()` from errorMessage. No `stateDescription`, no readOnly-conditional semantics anywhere.

So the doc's three-way table is right that Android is *correct* but wrong that Android is *explicit*. The honest ranking on announcement is: **web announces read-only correctly** (native `readonly` attribute → implicit `aria-readonly`); **Android is silent-but-not-wrong** (correct tree, no explicit utterance); **iOS is actively wrong** ("dimmed"). iOS remains the only platform that *misannounces* state — that part survives — but "iOS is the outlier on announcement" needs the qualification that only web actually announces.

**3. Keyboard/IME — VERIFIED, and it strengthens Option A more than the doc realizes.**
A focused readOnly `BasicTextField` does **not** raise the soft keyboard — Compose gates the input session on `enabled && !readOnly`. This directly undercuts the "Against A" counter-argument's premise ("keyboard raises for a field that won't accept input"): that is an iOS implementation hurdle, not an intrinsic property of focusable-read-only fields. Android demonstrates natively that focusable-without-IME is the coherent behavior, and Option A's `inputView = UIView()` note is the iOS equivalent of what Compose gives us for free.

**4. Focus order — VERIFIED.** With `enabled = true`, readOnly fields participate in hardware-keyboard Tab traversal and in TalkBack swipe order. We never set `enabled = false`, so readOnly fields stay in the focus order — consistent with the `interaction_focusable` contract.

**5. Disabled-adjacent residue on Android — NONE in behavior; one shared-types doc-comment.**
No `enabled =` anywhere on the readOnly path, no alpha/desaturation/styling tied to readOnly. However: `types.ts:57` still documents the prop as *"Read-only state (alternative to disabled)"* — disabled-vocabulary residue in the shared contract surface. Also worth stating plainly: Android renders **zero visual affordance** for readOnly — identical border/background, label still floats on focus, focus ring still shows. Web has the same gap (no `:read-only` styling in the CSS). That is a shared design gap, not an Android divergence.

**6. Test coverage — a gap the doc doesn't mention.** There are no Android `*Test.kt` files for Input-Text-Base at all, and no test anywhere in the component (shared `__tests__/` included) references readOnly. The Android readOnly behavior verified above is verified by reading, not by any executable contract. Follow-up #2 (authoring the readOnly contract) should land with tests on all three platforms.

### Consumer verdict

For the real product cases — pre-filled confirmation screens, locked profile fields, copyable reference numbers — the current Android behavior serves well mechanically: fields stay in reading and focus order, content is long-press copyable, and no keyboard pops up to falsely invite editing. I would ship product screens against it today. Two things I'd want regardless of the iOS ruling:

1. **Explicit TalkBack read-only semantics** — add `stateDescription` (e.g., "read only") in a `Modifier.semantics` block when `readOnly` is true. Cheap, idiomatic, and it brings Android to announcement parity with web instead of relying on ambiguity-by-omission. This should be pinned in the new readOnly contract, not left to platform discretion.
2. **A visual affordance decision** (muted background or similar) routed through Leonardo/Lina — currently a readOnly field is visually indistinguishable from an editable one on both Android and web, which is a discoverability problem in exactly the "locked profile field" case. Design decision, not a defect.

### Implication for the ruling

**The framing holds on mechanics, needs qualification on announcement.** Web and Android genuinely agree on the behavioral core — focusable, selectable, copyable, non-editable, never disabled-flavored — and iOS genuinely diverges from both, so "iOS is the outlier" is fair for everything the `interaction_focusable` contract touches. But only web announces; Android's tree is correct but silent, and our component adds no semantics to close that. iOS is still the sole platform that announces the *wrong* state, which is the accessibility violation that matters — the framing weakens in precision, not in conclusion.

On the options: this verification strengthens **Option A**. The strongest counter-argument against A (keyboard raising on a focusable non-editable field) is refuted by Android's own native behavior — Compose ships focusable-read-only-without-IME as the platform default, so A asks iOS to match a pattern two platforms already exhibit natively, not a web idiom. If Peter picks A, the readOnly contract should pin: focusable yes, selectable/copyable yes, editable no, IME/keyboard no, announced read-only **explicitly on all three platforms** — which means Android takes a small change too (the `stateDescription` above), and the contract lands with the currently-nonexistent Android tests. If Peter picks B, Android should remain as-is behaviorally but still gain the explicit semantics, and the contract must document Android/web vs iOS as a declared platform difference including focus-order divergence.

---

## Ruling

*(pending)*
