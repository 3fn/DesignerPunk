# Disabled States in Meridian — Proposal

**Status**: proposal, not yet adopted
**Date**: 2026-09-20
**Scope**: `tokens.json`, `components/button.css`, and the markup rules product code must follow

---

## Summary

Meridian should add disabled-state support, but should add it as a **narrow last resort with three
named alternatives ranked above it** — not as a general-purpose "grey it out" affordance.

Concretely:

1. Adopt a **decision ladder** (below) that product reviews can point at. Most requests for a
   disabled control are better served by one of the first three rungs.
2. Add **three flat hex tokens** — `disabled-background`, `disabled-text`, `disabled-border` — in
   Meridian's existing style. No opacity token, no alpha, no scale.
3. Add a **disabled block to `button.css`** that also neutralises the existing `:hover` rule.
4. Require that the disabled state is **always paired with a visible reason**, and that it is
   carried by `aria-disabled` rather than the native `disabled` attribute in the common case.

The reasoning behind all four points was sourced from an external design system's documentation
corpus. What follows separates what that corpus argues from what Meridian should actually do.

---

## Where this reasoning came from

I used the DesignerPunk documentation corpus (via the `designerpunk-docs` MCP) purely as a
**reference for how a mature system reasons about this problem**. Its architecture does not match
Meridian's — it has mathematically-derived token scales, a primitive/semantic token hierarchy, and
cross-platform output for web/iOS/Android. None of that is imported here. No token name, value, or
code from that system appears in this proposal.

### An important conflict in the source material

The corpus does not speak with one voice, and the disagreement is chronological. That matters for
which parts are worth translating:

| Source | Date | Position |
|---|---|---|
| Opacity token family docs | reviewed 2026-03-06 | Disabled states exist; render them at 48% opacity |
| Blend token family docs | 2026-07-15 | Their disabled-desaturate token **deprecated**, "no disabled states", slated for removal |
| Component templates, Button family, Form-Inputs family | 2026-07-15 | Disabled-state contracts **banned corpus-wide, zero exceptions** |

A 2026-07-15 adjudication moved that system from "disabled states are a styling problem" to
"disabled states are a design smell". Their stated reason: *"does not support disabled states for
usability and accessibility reasons. If an action is unavailable, the component should not be
rendered."* The older opacity guidance is simply stale — it survived the ruling because nobody
went back to revise it, and the ban is now enforced by an automated test in their repo.

So I weighted the July position over the March one. **But I did not adopt their conclusion
wholesale**, because their ban is affordable for reasons Meridian does not share — see below.

---

## Why Meridian should *not* copy the outright ban

That system can ban disabled states because it controls every component, has a contract system to
enforce the ban mechanically, and has loading/validation/error states already built to absorb the
cases the ban displaces. Meridian has one hand-written button with a hover state, no JS layer, no
loading state, and no error state. Banning disabled controls here would displace work onto product
teams that Meridian currently gives them no tools to do — which is how the gap has stayed open
through multiple product reviews.

The transferable insight is not the ban. It is the **claim that motivates the ban**: a disabled
control is a dead end that does not explain itself. A user who cannot tell *why* a button is
inert has no path forward, and if the state never reaches assistive technology, some users cannot
even perceive that it is inert.

Meridian can honour that claim without the ban — by making the explanation mandatory rather than
making the state forbidden.

---

## The decision ladder

Before styling anything as disabled, work down this list. Only rung 4 uses the disabled tokens.

**1. Is the action in flight?**
Then it is not disabled, it is *busy*. Meridian has no loading state today (see Open Questions).
Until it does, prefer keeping the button live and making the destination handle the double-submit.

**2. Is the action available, but the current input invalid?**
Let the user press it, then show the error. Pre-emptively disabling a submit button hides *which*
field is wrong and gives the user nothing to act on. Validate on press or on blur and surface the
problem.

**3. Is the action genuinely unavailable, with no path forward for this user?**
Do not render the control at all. A permanently inert button is visual noise that implies a
capability the user does not have.

**4. Is the action unavailable *right now*, with a reason the user can act on?**
This is the only case that earns a disabled state — and only when the reason is shown next to the
control. "Select at least one row to continue" beside a greyed button is fine. A greyed button
with no adjacent explanation is not.

---

## Proposed tokens

Add to the `colors` block in `tokens.json`:

```json
"disabled-background": "#EDEDED",
"disabled-text": "#6B6B6B",
"disabled-border": "#C9C9C9"
```

**Why flat hex rather than an opacity value.** The reference corpus renders disabled states by
dropping the whole element's opacity, and then has to carry two standing warnings about it: that
low-opacity text may fail contrast, and that opacity should sit on backgrounds rather than on text.
Those warnings exist because a multiplied value cannot be checked until it composites against
whatever is behind it. Meridian's flat-hex idiom dissolves the problem instead of managing it —
bake the muted value once, check it once, and it is correct everywhere. This is a case where
Meridian's simpler architecture is genuinely better suited, not merely different.

**Contrast.** Computed from the WCAG 2.1 relative-luminance formula (by hand — `node` was
unavailable in this sandbox, so please re-verify in a checker before adopting):

| Pair | Ratio | Against AA normal text (4.5:1) |
|---|---|---|
| `disabled-text` `#6B6B6B` on `disabled-background` `#EDEDED` | ~4.55:1 | passes |
| `disabled-text` `#6B6B6B` on `background` `#FFFFFF` (secondary variant) | ~5.33:1 | passes |
| `disabled-border` `#C9C9C9` on `background` `#FFFFFF` | ~1.66:1 | boundary cue only, not text |

WCAG 1.4.3 technically exempts inactive controls from contrast minimums. The proposal meets 4.5:1
anyway, for two reasons: the recommended markup below keeps the control focusable (so treating it
as exempt is a stretch), and a disabled label the user cannot read cannot communicate the reason
that rung 4 requires.

`disabled-border` `#C9C9C9` is deliberately one step darker than the existing `border` `#D8D8D8`.
The disabled fill `#EDEDED` sits at only ~1.17:1 against the white page, so the fill alone is not a
reliable boundary — the border is doing the shape-definition work.

**Naming.** `disabled-*` is a flat, literal name consistent with Meridian's existing
`text-primary` / `brand-blue-dark` convention. Meridian has no primitive/semantic split and should
not grow one for this.

---

## Proposed CSS

Append to `components/button.css`. **Order matters** — these must come *after* the existing
`:hover` rules, since Meridian's hover rules are unconditional and would otherwise re-colour a
disabled button on mouse-over.

```css
/* Disabled — read meridian-disabled-states.md before using.
   A disabled button must always be accompanied by a visible reason. */

.meridian-button:disabled,
.meridian-button[aria-disabled="true"] {
  background-color: #EDEDED;
  border-color: #C9C9C9;
  color: #6B6B6B;
  cursor: not-allowed;
}

/* Neutralise the hover rules above. */
.meridian-button:disabled:hover,
.meridian-button[aria-disabled="true"]:hover {
  background-color: #EDEDED;
  border-color: #C9C9C9;
}

.meridian-button--secondary:disabled,
.meridian-button--secondary[aria-disabled="true"] {
  background-color: #FFFFFF;
  border-color: #C9C9C9;
  color: #6B6B6B;
}

.meridian-button--secondary:disabled:hover,
.meridian-button--secondary[aria-disabled="true"]:hover {
  background-color: #FFFFFF;
}

/* Windows High Contrast / forced-colors: system keywords, not Meridian tokens. */
@media (forced-colors: active) {
  .meridian-button:disabled,
  .meridian-button[aria-disabled="true"] {
    color: GrayText;
    border-color: GrayText;
  }
}
```

Three notes on what this does and does not do:

- **Both selectors are styled.** `:disabled` matches the native attribute; `[aria-disabled="true"]`
  matches the recommended markup. Styling both means product code can use either without the button
  looking wrong.
- **The secondary variant needs its own border override**, because it currently inherits
  `border: 1px solid #2B6CB0` from the base class and only overrides `background-color` and `color`.
- **`forced-colors` uses `GrayText`**, the system keyword for disabled content. Design tokens are
  the wrong thing to put inside this media query — the OS palette wins there by design. This block
  is also the reason the state survives for users who override page colours entirely.

There is no transition and no animation, so there is nothing here that needs a
`prefers-reduced-motion` guard. If a transition is added later, that changes.

---

## Markup rules for product code

**Prefer `aria-disabled="true"` over the native `disabled` attribute on buttons.**

This is the single most consequential recommendation here, and it has a real cost, so the trade-off
should be explicit:

| | Native `disabled` | `aria-disabled="true"` |
|---|---|---|
| Removed from tab order | yes | no |
| Can be focused and read aloud | no | yes |
| Blocks click natively | yes | **no — product JS must block it** |
| User can discover the reason | only by hunting for it | focus the button, hear the reason |

The native attribute makes the control unreachable by keyboard. A keyboard or screen-reader user
tabbing through a form never lands on it, so the button — and any explanation attached to it —
silently does not exist for them. That is exactly the dead end the reference corpus banned disabled
states to avoid.

`aria-disabled` keeps the button in the tab order and announces it as disabled, so the reason can be
attached with `aria-describedby` and actually reach the user. **The cost is that it does not block
activation** — product code must ignore the click. Meridian ships no JS today, so this is work that
lands on the consuming team, and the team should agree to it before this rule is adopted.

Recommended pattern:

```html
<button
  class="meridian-button"
  aria-disabled="true"
  aria-describedby="submit-reason"
>
  Submit
</button>
<p id="submit-reason" class="meridian-hint">Select at least one row to continue.</p>
```

Where the consuming code genuinely cannot intercept the click, native `disabled` is an acceptable
fallback — but then the reason must be visible in the surrounding layout rather than attached to
the button, since nobody will ever focus it.

**Never signal disabled by colour alone.** The colour change, the `cursor: not-allowed`, the ARIA
state, and the written reason are four cues and all four should be present. The reference corpus is
explicit that its dimming treatment was never sufficient on its own; Meridian's flat fill has the
same limitation.

---

## Review checklist

For anyone reviewing a PR that introduces a disabled control:

- [ ] Rungs 1–3 of the ladder were considered and ruled out
- [ ] A reason is visible to the user, adjacent to the control
- [ ] The reason is programmatically associated (`aria-describedby`) if `aria-disabled` is used
- [ ] `aria-disabled` is used, **and** the click is blocked in product code — or native `disabled`
      is used and the reason is visible without focusing the button
- [ ] The state is not communicated by colour alone
- [ ] The control still reads correctly with forced colors active

---

## Open questions for the team

1. **Will product code block clicks?** The `aria-disabled` recommendation depends on it. If the
   answer is no, Meridian should say so plainly and standardise on native `disabled` plus a
   visible-reason requirement, rather than recommending a pattern the team will not implement.
2. **Should Meridian add a loading state?** Rung 1 of the ladder currently dead-ends, because
   Meridian has nothing to offer for in-flight actions. This is the most common legitimate reason
   to want a disabled button, and it is arguably the higher-value gap to close next.
3. **Should this extend past buttons?** The tokens are written to be component-neutral and should
   work for inputs and checkboxes unchanged, but only the button is specified here.
4. **Should `button.css` move to CSS custom properties?** The file currently hardcodes hex values
   that duplicate `tokens.json`, and this proposal follows that existing convention rather than
   breaking it. That duplication is a pre-existing issue and a separate decision — worth making
   deliberately rather than as a side effect of adding disabled support.
