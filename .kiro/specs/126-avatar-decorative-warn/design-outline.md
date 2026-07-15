# Design Outline: 126 — Avatar Req 5.4 warn vs `decorative` prop

**Date**: 2026-07-09 (v2 — round 1 incorporated)
**Status**: O2 RATIFIED (Peter, 2026-07-09, recorded in feedback.md's `[PETER — DECISION, 2026-07-09]` entry — the ratification event for the settled edge semantics per Thurgood R1's process ruling) — IMPLEMENTED (Lina, Task 1, 2026-07-15).
**Author**: Main-loop session (Fable 5), from Lina's PR #39 domain review (2026-07-09)
**Origin**: Lina-confirmed defect, adjudicated during the PR #39 test-noise review and explicitly routed to a spec round rather than an inline fix
**Scope class**: small component-behavior correction (one check + tests + doc comment), web platform

---

## 1. The defect

`src/components/core/Avatar-Base/platforms/web/Avatar.web.ts` (~line 704) emits the Req 5.4 development warning on:

```ts
if (src && !alt && typeof console !== 'undefined') {
  console.warn('AvatarBaseElement: "alt" prop is required when "src" is provided for accessibility. …');
}
```

Two divergences from the ratified Spec 042 requirements, in one condition:

**(a) `decorative` is ignored — the confirmed defect (Lina, PR #39).** The component supports a `decorative` prop (Req 9.2: `decorative=true` → `aria-hidden="true"`; Req 9.3: defaults false) — the *official* signal that an avatar is intentionally non-informative. The check ignores it, so **a legitimately decorative avatar triggers a "you forgot alt" warning about a pattern the component officially supports** — a false positive that trains developers to ignore the warning.

> **Round-1 correction (Lina + Thurgood, independently converged): the operative fix is the `!decorative` clause, NOT an absent-vs-empty `alt` distinction.** The component's own `alt` property setter (~line 396) treats `''` as falsy and calls `removeAttribute('alt')` — so `avatar.alt = ''` yields `getAttribute('alt') === null`, identical to omitting alt. A genuine `alt=''` is reachable **only** via `setAttribute('alt','')`. Both native platforms likewise collapse empty→absent (iOS ~644, Android ~401). The `alt == null` vs `''` distinction in §4 therefore exists only for the raw-attribute form and is a documented minor edge, not the headline; the property-form `alt=''` lands in the "absent" bucket and (correctly) warns.

**(b) The type scope is wider than the ratified text — found while grounding this outline.** Req 5.4 as ratified (042 requirements.md line 117): "WHEN Avatar **human type** receives `src` prop THEN Avatar SHALL require `alt` prop for accessibility." The implementation warns for *all* types — including `type='agent'`, where `src` is documented as ignored entirely (no image renders, nothing needs describing). The PR #39 sweep's warning fixtures were exactly this case: agent-type avatars with `src`.

## 2. Ratified-text facts (Spec 042 requirements.md — the constraint set)

- **Req 5.4** (line 117): human type + `src` → SHALL require `alt`. *Silent on: empty-string alt; interaction with `decorative`.*
- **Req 5 AC 5** (line 118): agent type SHALL **ignore** `src` entirely — the *affirmative ratified basis* for O2's type guard (round-1 amendment, Lina + Thurgood concurring): warning on agent+src is the code violating this AC today, not a new-behavior request.
- **Req 9.1** (line 166): image renders → apply `alt` text for screen-reader announcement.
- **Req 9.2** (line 167): `decorative=true` → `aria-hidden="true"`.
- **Req 9.3** (line 168): `decorative` omitted → defaults false.

The ratified text does not define what "require" means at the edges — this round settles those edge semantics; it does not re-open the requirements themselves.

## 3. Platform parity facts

- **Web**: the only platform with the dev-warn. `alt` getter returns `getAttribute('alt')` (string | null); `decorative` getter is attribute === 'true'.
- **iOS** (`Avatar.ios.swift`): `alt: String?`, `decorative: Bool = false` (Req 9.3 mirrored). **No warn equivalent.**
- **Android** (`Avatar.android.kt`): alt/contentDescription + decorative supported. **No warn equivalent.**

The fix is therefore **web-scoped**. Whether iOS/Android *should* gain a debug-time parity warn is a separate question this outline names but does not decide (§6).

## 4. Options

Let `alt` be the raw attribute/prop value (`null` = absent, `''` = explicitly empty).

| # | New warn condition | Empty `alt=''` alone | `decorative` alone | Agent type + src | Assessment |
|---|---|---|---|---|---|
| **O0** (today) | `src && !alt` | ⚠️ warns (false positive) | ⚠️ warns (false positive) | ⚠️ warns (off-ratified-text) | The defect |
| **O1** (Lina's seed) | `src && alt == null && !decorative` | silent (HTML-idiomatic: `alt=""` *is* the standard decorative signal) | silent | ⚠️ still warns | Fixes (a) fully; leaves (b) |
| **O2** (O1 + type scope) | `type === 'human' && src && alt == null && !decorative` | silent | silent | silent | Fixes (a) and (b); matches the ratified Req 5.4 text most literally |
| **O3** (strict-intent) | `src && alt == null` (decorative irrelevant) | silent | ⚠️ warns unless alt also set | ⚠️ warns | Rejected: warning on a `decorative` avatar demands alt text that `aria-hidden` will never announce — pointless work |

> **Round-1 matrix correction:** the "Empty `alt=''` alone → silent" cells hold **only for the raw-attribute form** (`setAttribute('alt','')`). The property form (`avatar.alt = ''`) collapses to the absent/`null` bucket via the setter and **warns** under O1/O2 — behavior the new tests pin explicitly (§5).

**Recommendation: O2 — now owner-backed (Lina R1 superseded her own O1 seed; Thurgood concurs).** It is the ratified text applied as written: human-type scope per Req 5.4 + Req 5 AC 5, with `decorative` as the intent signal. Lina's framing: O2 is the *smaller* conceptual change — "make the warn match Req 5.4 as written" — since warning on agent+src is the code violating ratified AC 5 today. Recorded counter-argument (Lina): if Peter wants the absolute-minimum diff, O1 is defensible and the type-scope fix becomes a named one-line Lina-owned follow-up; she does not recommend it.

**Counter-argument on `alt=''`-as-intent (recorded, now demoted by the round-1 correction):** the HTML-convention argument for treating `alt=""` as sufficient intent is weaker than v1 stated, because the idiomatic property path cannot even produce it — `decorative` is the load-bearing signal on every platform.

## 5. Changes (under the chosen option)

1. **`Avatar.web.ts`**: the warn condition + the doc comment above it (cites Req 5.4 **and Req 5 AC 5** with the settled edge semantics). The warning message per the round's ratified constraint — **alt first, decorative as the deliberate exception, never readable as "hide the image to silence the warning"** (Lina's ordering rule, Thurgood-ratified). Thurgood's suggested final string: `AvatarBaseElement: "alt" is required when "src" is provided. Add an alt description of the image; or, if this avatar is purely decorative (non-informative), set the "decorative" prop to hide it from screen readers.`
2. **Tests** (`Avatar.accessibility.test.ts`, warn-coverage block — **Lina authors**, per the round's coverage amendments): the settled matrix, **six** tests —
   - human + src + alt-absent → **warns**
   - human + src + `setAttribute('alt','')` (raw-attribute form — the only reachable real-`''` path) → **no warn**
   - human + src + property-form `avatar.alt = ''` (collapses to null via the setter) → **warns** — pins the collapse explicitly
   - human + src + `decorative` → **no warn**, **co-asserted with `aria-hidden="true"`** (Req 9.2) in the same fixture, locking the semantic linkage
   - (O2) agent + src + alt-absent → **no warn**
   - (O2) agent + src + alt-present → **no warn** — confirms agent silencing is type-driven, not alt-driven
   Remove the interim local spy + tension comment on 'should apply empty alt when alt is empty string' (**explicit precondition: PR #39 merges first** — the interim lives on that branch).
3. **Contract surfaces (Lina-owned, from Thurgood's Q3a audit)**: `src/components/core/Avatar-Base/contracts.yaml` § `accessibility_alt_text` ("Web requires alt prop when src is provided") gains the settled edge-semantics note — shipping the code change without it re-creates the doc-vs-code drift class that produced this defect. Secondary: keep `Avatar-Base.schema.yaml` § properties.alt ("Required if src provided") consistent. (Family doc + Test-Behavioral-Contract-Validation checked — no reference; no change.)

## 6. Out of scope (named, not decided)

- **iOS/Android warn parity**: no equivalent exists today; adding one is a separate cross-platform decision (Lina's call whether to spin it out).
- **A different agent-type hint** ("src is ignored for agent avatars") — arguably useful, distinct message, distinct decision.
- **Re-opening Req 5.4/9.x themselves** — this round settles edge semantics within the ratified text, not the requirements.

## 7. Acceptance signals

- **Precondition (explicit, round-1 amendment): PR #39 is merged** before the interim-spy removal lands.
- The false-positive matrix is provably dead: the **six** new warn-behavior tests (§5) pass; the interim spy removed with **zero** console.warn blocks reappearing in the Avatar suites (recount over a captured full run).
- **Concrete non-regression signal (Thurgood R1, replacing the unmeasurable "no assertion weakened")**: the existing `'should warn when src is provided without alt'` test (accessibility.test.ts ~252, already human-typed) survives O2 **unchanged**.
- Full `npm test` green; `contracts.yaml` + schema edge-semantics notes landed in the same change (§5 item 3).
