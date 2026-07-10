# Design Outline: 126 — Avatar Req 5.4 warn vs `decorative` prop

**Date**: 2026-07-09
**Status**: DRAFT — pending feedback round (Lina, Thurgood) + Peter's decision
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

**(a) `decorative` is ignored — the confirmed defect (Lina, PR #39).** The component supports a `decorative` prop (Req 9.2: `decorative=true` → `aria-hidden="true"`; Req 9.3: defaults false) — the *official* signal that an avatar is intentionally non-informative. It also renders the valid decorative-image pattern `alt=''` (asserted by `Avatar.accessibility.test.ts` › 'should apply empty alt when alt is empty string'). Because `!alt` is true for the empty string, **a legitimately decorative avatar triggers a "you forgot alt" warning about a pattern the component officially supports** — a false positive that trains developers to ignore the warning.

**(b) The type scope is wider than the ratified text — found while grounding this outline.** Req 5.4 as ratified (042 requirements.md line 117): "WHEN Avatar **human type** receives `src` prop THEN Avatar SHALL require `alt` prop for accessibility." The implementation warns for *all* types — including `type='agent'`, where `src` is documented as ignored entirely (no image renders, nothing needs describing). The PR #39 sweep's warning fixtures were exactly this case: agent-type avatars with `src`.

## 2. Ratified-text facts (Spec 042 requirements.md — the constraint set)

- **Req 5.4** (line 117): human type + `src` → SHALL require `alt`. *Silent on: empty-string alt; interaction with `decorative`; non-human types.*
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

**Recommendation: O2.** It is the ratified text applied literally (human-type scope) plus the owner's intent-signal rule (absent ≠ deliberately empty; `decorative` is an explicit signal). O1 is acceptable if the round prefers to treat the type-scope divergence as a separate matter, but both divergences live in the same line of code — fixing one while shipping the other seems like process for its own sake.

**Counter-argument (recorded):** silencing bare `alt=''` *without* `decorative` (all options except O0/O3-partial) accepts the HTML convention as sufficient intent — a developer who typos `alt=""` meaning to fill it later gets no nudge. Mitigation: that convention is three decades old and screen readers honor it; demanding `decorative` *in addition to* `alt=""` (a stricter variant) would warn on idiomatic HTML, recreating the false-positive class this round exists to kill.

## 5. Changes (under the chosen option)

1. **`Avatar.web.ts`**: the warn condition + the doc comment above it (cites Req 5.4 with the settled edge semantics). The warning *message* gains a pointer to the `decorative` prop (e.g., "…or set decorative to mark the avatar as hidden from screen readers").
2. **Tests** (`Avatar.accessibility.test.ts`, warn-coverage block): assert the settled matrix — human+src+alt-absent → warns; human+src+`alt=''` → no warn; human+src+`decorative` → no warn; (O2) agent+src+alt-absent → no warn. Remove the interim local spy + tension comment on 'should apply empty alt when alt is empty string' (**depends on PR #39 merging first** — the interim lives on that branch).
3. **Behavioral-contract check** (Thurgood): does the a11y contract wording for Avatar reference "alt required with src" anywhere that needs the same edge-semantics note? (Feedback-round question — see feedback.md.)

## 6. Out of scope (named, not decided)

- **iOS/Android warn parity**: no equivalent exists today; adding one is a separate cross-platform decision (Lina's call whether to spin it out).
- **A different agent-type hint** ("src is ignored for agent avatars") — arguably useful, distinct message, distinct decision.
- **Re-opening Req 5.4/9.x themselves** — this round settles edge semantics within the ratified text, not the requirements.

## 7. Acceptance signals

- The false-positive matrix is provably dead: the four new warn-behavior tests pass; PR #39's interim spy removed with **zero** console.warn blocks reappearing in the Avatar suites (recount over a captured full run).
- Full `npm test` green; no assertion in the existing 6 Avatar suites weakened.
