# Button-CTA: Disabled-State Adjudication — RULED: REMOVE

**Date**: 2026-07-15
**Ruled by**: Peter
**Owner recommendation**: Lina (remove)
**Source**: Routed out of Spec 125-B U2 (deliberately not resolved inside the CI work)
**Status**: RESOLVED — removal implemented

---

## Question

Button-CTA was the only component in the corpus with a live `state_disabled`
contract, while 16+ components carry the standardized exclusion
("DesignerPunk does not support disabled states for usability and
accessibility reasons. If an action is unavailable, the component should not
be rendered."). Was Button-CTA's disabled state deliberate, or an oversight?

## Findings (Lina)

- Button-CTA shipped 2025-11-20 (Spec 005) with `disabled` designed in as a
  first-class prop on all three platforms. The no-disabled-states philosophy
  first appears **seven weeks later** (2026-01-07, Spec 038). Button-CTA was
  grandfathered, never retrofitted.
- Spec 066 (2026-03-01) adjudicated the 9 excluded components as intentional
  and removed Input-Text-Base's live `state_disabled` contract — but
  explicitly left Button-CTA out of scope (task-3.3-completion.md note).
  Deferred, not affirmed.
- Spec 112 maintained the contract (OKLCH ΔC thresholds) and
  `InteractionStateAudit.test.ts` codified "Only Button-CTA has a disabled
  state in DesignerPunk" — the anomaly was known but never adjudicated.
- No product consumers used the `disabled` prop (demo page and blend audit
  test only).

## Ruling

**Remove** — align Button-CTA with the no-disabled-states philosophy.
`state_loading` covers in-flight async actions; validate-on-press covers
form-invalid; hide covers unavailable actions. The philosophy now holds
corpus-wide with zero exceptions.

## Changes (this branch)

- `contracts.yaml`: `state_disabled` contract removed → standardized
  `excludes.state_disabled` block; disabled references removed from
  focusable/pressable/hover/pressed contracts.
- `types.ts`: `disabled` prop removed; NO DISABLED STATES header added.
- Platforms: disabled handling removed from web (`.web.ts` + `.web.css`),
  iOS (`.ios.swift`), Android (`.android.kt`). Buttons no longer render
  `disabled`/`aria-disabled` attributes.
- Schema: `disabled` property and `blend.disabledDesaturate` token reference
  removed from `Button-CTA.schema.yaml`.
- Tests: disabled-behavior tests replaced with exclusion-guard tests
  (contracts.yaml shape, no observed attribute, consumer-set `disabled`
  attribute ignored). `css-bundling.test.ts` flipped to assert the browser
  bundle ships NO disabled styles. `InteractionStateAudit.test.ts` disabled
  case reduced to calculator-capability only.
- Docs/demos: README, examples, `demos/button-cta-demo.html`,
  `governance/Component-Family-Button.md`,
  `governance/Component-Development-Guide.md`,
  `governance/browser-distribution-guide.md`, `docs/token-system-overview.md`.

## Follow-ups

1. **Ada — token deprecation**: `blend.disabledDesaturate` has no remaining
   component consumers (still referenced by blend utilities
   `disabledColor`/`disabledBlend` and blend tests). Deprecation is Ada's
   call; the calculator capability and token were deliberately left intact.
2. **125-B U2 register note**: `governance/classification-map.md`'s WCAG-floor
   note excluding `state_disabled` "pending the Button-CTA disabled-state
   adjudication" (and stemma-pre-arm-adjudication.md §7) should be updated to
   reference this ruling: adjudicated REMOVE, 2026-07-15 — `state_disabled`
   may now join the per-literal presence assertion with no carve-out. That
   register lives on the in-flight U2 branch, not on `main` at time of ruling.
3. **U1b candidate row (log, don't build)**: philosophy-conformance check
   "components must not declare disabled states unless allowlisted" — reds on
   PRESENCE of a violation. Allowlist is now empty; the check needs no
   Button-CTA carve-out.
4. **Versioning**: removing a public prop from `@3fn/core`'s flagship button
   is a breaking API change — flag for the next major-version decision.

## Validation

- `npx tsc --noEmit` clean.
- `npm test`: 8983/8983 pass.
- `npm run test:all`: 9059/9059 pass (idle re-run; an interleaved first run
  showed 2 wall-clock-sensitive performance failures, gone when serialized).
