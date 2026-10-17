# Components calibration instrument — seat queries, RAW (verbatim record)

**Date**: 2026-10-17
**Charter**: `.kiro/issues/2026-10-17-components-calibration-instrument-charter.md` (§ 3, § 4, § 5 commit (1)); merged #387 → `67d9d807a`.
**Owner**: Thurgood (sealed prompt; capture), on the charter's grant path. Seats are blind authors and hold no grant.
**What this file is**: the four sealed seats' answers, recorded **before any key is written**. It is commit (1) of the instrument chain on `chore/components-calibration-run`. Keys, F4 drops, the pre-exposure flags and the fixture come in Lina's pre-registration commit (2); nothing here is keyed, flagged or dropped.

**Rules for this file**
- Each seat's answer is pasted **UNEDITED** from the orchestrator's verbatim relay: no reformatting, no spelling fixes, no removals. A seat's "A"/"B" label is the seat's guess; Lina's key decides the class (charter § 3).
- The orchestrator ran each seat as a fresh session given the sealed prompt below and nothing else.
- Point-in-time record, not a navigational doc.

---

## The sealed prompt (verbatim — charter § 4; the blockquote markers are the charter's formatting, not part of the text)

```
You are writing search queries, not answering them. Do not call any tool and do not read any file before you answer.

Picture the product screens you would realistically build or implement in your role over the next few months — for example sign-up, settings, a feed, checkout, a profile, an empty state, a form with errors. For each screen, think about the UI pieces you would go looking for in a design system's component library.

Write the search phrases you would actually type into that library's component search, in your own words — the way you would phrase it while working, not the way a catalog would name it.

**A.** Five or six phrases for pieces you expect a design system like this to have.
**B.** Two or three phrases for pieces you would look for on a real screen but are not sure a design system like this has.

For each phrase give: the phrase exactly as you would type it; one line on what you need it for (the screen and the job); and A or B.

About eight phrases in total. Do not revise a phrase to make it more findable.
```

---

## Kenya

**Provenance**: fresh session · 2026-10-17 · tool_uses = 1 (harness telemetry, relayed by the orchestrator); the seat's own report: "No tools called"

```
Kenya (iOS) — component-search phrases, written the way I'd type them mid-implementation, not catalog names. No tools called, per instruction.

**A. Pieces I expect the system to have**

1. `text field with label and error message`
   Sign-up / settings form — the email and password inputs, with the validation state when the server rejects the value. (A)

2. `primary button`
   Sign-up "Create account", checkout "Pay now" — the one filled CTA at the bottom of a NavigationStack screen. (A)

3. `card container`
   Feed — each post / item wrapped in a surfaced container with padding and radius, stacked in a LazyVStack. (A)

4. `tab bar`
   App shell — bottom navigation between Feed / Profile / Settings; need to know whether to use the DS one or map to native TabView. (A)

5. `avatar with initials fallback`
   Profile header and feed rows — user image, falling back to initials when no photo. (A)

6. `toggle switch row`
   Settings — the "Notifications on/off" rows; the Toggle plus its label laid out as a list row. (A)

**B. Pieces I'd look for but am not sure the system has**

7. `empty state with illustration and call to action`
   Feed before the user follows anyone — centered message, optional graphic, one button to go do the thing. (B)

8. `inline banner for errors or offline`
   Checkout / feed — a non-modal strip at the top of the screen ("You're offline", "Payment failed, try again") that doesn't take over the view the way an alert does. (B)

9. `pull to refresh loading indicator`
   Feed — the spinner shown during refresh; unsure whether the DS has a loading component I should use or whether I just use SwiftUI's `.refreshable` and the native indicator. (B)
```

## Leonardo

**Provenance**: fresh session · 2026-10-17 · tool_uses = 1 (harness telemetry: the hand-back only; no tools called before answering)

```
Search phrases I'd actually type into the component library while spec'ing product screens over the next few months (Settings, sign-up/login, a feed, checkout, profile, empty states, error-state forms). Written as working phrases, not catalog names; none revised for findability.

**A — pieces I expect the system to have**

1. `primary action button` — Checkout and sign-up: the one committed CTA at the bottom of a form ("Place order", "Create account"). A
2. `text input field with error message` — Sign-up and settings forms: email/password/name fields that need to show inline validation when the user gets it wrong. A
3. `toggle switch for on/off setting` — Settings screen: the notification/privacy rows where each row is a label plus a single on/off control. A
4. `card container for grouped content` — Settings and profile: visually grouping related rows/options into a surfaced block with padding and border. A
5. `bottom tab bar navigation` — Feed/profile/settings app shell: the persistent top-level navigation across the main sections. A
6. `status badge or label` — Profile and settings: small "Verified", "Pro", "Pending" indicators next to a name or a row. A

**B — pieces I'd look for on a real screen but am not sure this system has**

7. `empty state with illustration and call to action` — Feed and search results when there's nothing to show: a centered message, optional graphic, and a single action to get the user unstuck. B
8. `list row with leading icon, title, subtitle and chevron` — Settings and profile: the tappable navigation row that drills into a sub-screen — the bread-and-butter "list item" I need everywhere and suspect isn't a first-class component yet. B
9. `inline banner for form-level error or success` — Checkout and sign-up: a non-modal strip above the form for "Payment failed" / "Account created" that isn't tied to a single field. B

Nine total (six A, three B). Phrases 7 and 8 are the two I'd flag first as likely lessons-learned candidates if `find_components` comes back empty — the list row in particular is the gap I'd expect to hit on day one of the Settings screen.
```

## Data

**Provenance**: fresh session · 2026-10-17 · tool_uses = 1 (harness telemetry: the hand-back only); the seat's own report: "No tools used, per instructions"

```
Search phrases I would actually type into the component library, written from the Android seat (screens I expect to build: sign-up, settings, a feed, checkout, profile, an empty state, a form with validation errors). No tools used, per instructions.

**A. Pieces I expect a design system like this to have**

1. `text input with error message`
   For the sign-up and checkout forms — a field that shows an inline validation error and announces it to TalkBack. (A)

2. `primary action button`
   The "Create account" / "Place order" call to action at the bottom of sign-up and checkout — the one filled button per screen. (A)

3. `bottom tab bar`
   Top-level navigation between feed, profile and settings — a persistent bar that survives nav changes. (A)

4. `card container for list item`
   Feed rows and the order summary on checkout — a surface with padding and radius I can put arbitrary content inside. (A)

5. `toggle switch`
   Settings screen — on/off rows for notifications, dark mode, etc. (A)

6. `avatar with initials fallback`
   Profile header and feed author rows — a round image that falls back to initials when there is no photo. (A)

**B. Pieces I would look for on a real screen but am not sure this library has**

7. `empty state illustration with message and action`
   The feed with no items yet, or an empty cart — an icon or illustration, a line of copy, and a button to get started, as one composed piece rather than three. (B)

8. `pull to refresh`
   The feed — the Compose-native refresh gesture; I suspect the library leaves this to the platform rather than owning it, but I would still check before reaching for Material's. (B)

9. `bottom sheet`
   Checkout (choose shipping option) and profile (edit photo menu) — a modal sheet that slides up from the bottom, handles system bar insets, and dismisses on scrim tap. (B)

One note: on phrases 7 and 9 I deliberately did not rewrite them into catalog-style names (e.g. "Modal-Sheet-Base"). Those are the words I'd reach for mid-implementation, and if the search doesn't match them that is itself a useful signal about the keyword index.
```

## Sparky

**Provenance**: fresh session · 2026-10-17 · tool_uses = 1 (harness telemetry: the hand-back only); the seat's own report: "No tools used, per your instruction"

```
Sparky here. Writing these as I'd actually type them into a component search mid-implementation, not as catalog names. No tools used, per your instruction.

**A — pieces I expect a system like this to have**

1. `text input with label and error message`
   Sign-up / settings form — the email and password fields that need a floating label, validation state, and an inline error I can wire to `aria-describedby`. (A)

2. `primary button`
   Sign-up submit, checkout "Place order", settings "Save" — the one high-emphasis CTA per screen, with loading/disabled handling. (A)

3. `card container`
   Feed items and the checkout order summary — a surfaced block with inset padding and optional press behavior so a whole card can be a tap target. (A)

4. `bottom tab bar`
   App shell navigation under the feed / profile / settings screens — persistent tabs with a selected state and ARIA tablist semantics. (A)

5. `avatar`
   Profile header and feed item author — image with initials fallback and size variants. (A)

6. `toggle switch`
   Settings screen — on/off rows (notifications, dark mode) that need a role="switch" implementation rather than a checkbox. (A)

**B — pieces I'd look for on a real screen but am not sure this system has**

7. `empty state illustration with message and action`
   Feed with no posts, search with no results — a centered icon/illustration, headline, supporting copy, and a single CTA. I'd expect to build this from Container + Button if there isn't a dedicated piece. (B)

8. `toast notification`
   Settings "Saved" confirmation, checkout error after a failed payment — a transient, non-blocking message with an `aria-live` region and auto-dismiss. Not sure the system has a feedback/toast family yet versus only modals. (B)

9. `skeleton loader for a list`
   Feed and profile while data loads — placeholder shapes that match the card layout, respecting reduced motion on the shimmer. The Loading family may only have a spinner. (B)

Nine phrases total; phrased as-typed, not tuned for findability.
```

---

## Tally (orchestrator's count, relayed; not a key)

- **36 phrases** from four seats (9 each): **24 labeled A + 12 labeled B** by the seats. Seat-labeled B share = ⅓ and B count = 12 ≥ 8, so no top-up seat was run (charter § 3). Whether the keyed set meets the ⅓ / ≥ 8 floors is decided by Lina's keys at commit (2), not by these labels.
- Each seat was asked for "about eight" and gave nine.
- **tool_uses**: the harness counted 1 for every seat (the hand-back call). Kenya's own report read "No tools called" (relayed as tool_uses=0); the harness count governs.
- Relay note, carried unscored: Leonardo's `primary action button` is also one of the probe queries in the record before this study; the mechanical pre-exposure flag (charter § 2) is computed at commit (2).
