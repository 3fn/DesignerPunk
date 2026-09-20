# Token-source accuracy follow-ups (from the 2026-09-19 doc accuracy pass)

**Date chartered**: 2026-09-19 (at the accuracy pass's completion — capture-before-close, per the tracking ruling)
**Origin**: findings F1–F8 of the Ada token-doc accuracy pass (`archive/2026-09-18-ada-token-doc-accuracy-pass.md`; full ledger in the pass's PR body). These are the items the pass found and correctly did NOT fix — source defects, adjudications, and another agent's surface.
**Trigger**: F1–F5 — the next Ada token-source session (F1 first; it now reads contradictory against the corrected docs). F6/F7 — Peter's next adjudication burst. F8 — the next Lina component-token session. Walked by the monthly health-check charter walk.

## Ada (source defects — owner: Ada)

- **F1 — HIGHEST VALUE: `src/tokens/semantic/TypographyTokens.ts` descriptions carry wrong line-heights** (~11 descriptions: bodySm says 1.25, actual `lineHeight075`=1.429; bodyLg/buttonLg/labelLg say 1.75, actual 1.556; labelXs says 1.0, actual 1.538). The docs were corrected to source VALUES at the pass, so doc and source *description strings* now contradict until this lands.
- **F2 — `OklchValidator` is dead code in the pipeline** (`src/color/OklchValidator.ts` — no caller outside its own test). Naive wiring would red: white/black lightness scales violate `MIN_STEP_DISTANCE = 0.08`. Needs a decision: scope the rule to chromatic families and wire it, or leave it an authoring contract. The doc now states the current reality (defines-not-enforces).
- **F3 — `FigmaTransformer` emits an undeclared mode**: `generatePrimitivesCollection()` declares `modes: ['light','dark']` (`:261`) but every variable carries a `wcag` value (`:343`).
- **F4 — the Figma push drops all dark-theme overrides**: the transformer reads only `ext?.modes?.wcag` (`:322–324`) and mirrors light into dark; `modes.dark` data exists in the DTCG file and is unread. Designers see light values in Figma dark mode. Doc now states the limitation; the fix is code.
- **F5 — `baselineGridAlignment` inconsistent for value 4** across families (`space050`=false; `size050`/`blur025`=true). Low; means the predicate is not well-defined system-wide.

## Peter adjudication (not mechanical fixes)

- **F6 — WCAG level claim on `tapAreaMinimum` (44pt)**: source + `Token-Family-Accessibility.md:189` say "WCAG 2.1 AA"; same doc `:522` says AAA. Per WCAG: SC 2.5.5 (44×44) is **AAA**; the AA minimum is SC 2.5.8 (24×24, WCAG 2.2). Correcting changes an accessibility claim — Peter rules the intended posture, then Ada applies both surfaces consistently.
- **F7 — Inter font assets shipped but unreferenced** (`src/assets/fonts/inter/`, 8 files) post-Spec-107 Figtree replacement. Dead asset or deliberate fallback — Peter's call, then Ada executes.

## Lina (component surface — owner: Lina)

- **F8 — `Button-CTA.tokens.ts` hard-codes dimensions**: `minWidth: {56, 72, 80}` as raw numbers where `Token-Family-Sizing.md:74` lists Button-CTA as consuming `size700/900/1000`; also a comment citing nonexistent `space1000`. Values correct, token linkage absent.

## Corpus-wide residual (unowned surface, named)

The **Inter→Figtree drift almost certainly exists outside the token docs** (Spec 107 landed without a documentation sweep; the pass cleaned only its own 19-doc surface). A corpus grep for `Inter` across the other ~66 served docs is a cheap first probe whenever anyone opens this.

---

## CLOSED (2026-09-19) — all eight items resolved; Peter's rulings recorded

**Rulings**: F6 — Peter ruled the WCAG-accurate reading (44pt = SC 2.5.5 Level AAA; the AA minimum is SC 2.5.8's 24×24, WCAG 2.2); applied across TapAreaTokens, Token-Family-Accessibility, Token-Family-Responsive, the AccessibilityTokens README, and the `validateTapAreaAccessibility` thresholds (a behavior change to an exported, zero-call-site function — accepted as the ruling applied consistently, flagged in the PR for veto). F7 — Peter ruled the Inter assets deadweight; deleted with the full ~4×-larger-than-briefed reference surface reconciled (package export, exports snapshot, four font test suites cut over to Figtree, both platform-integration guides corrected).

**Resolutions**: F1 nine wrong line-height descriptions corrected + a tenth found (labelMdFloat — see residuals). F2 **premise falsified**: OklchValidator was never pipeline-dead (enforced via chromatic-channels + neutral-partition suites on every PR); the real gap — no step-check on neutral bands — closed with per-class MIN_STEP_DISTANCE (white 0.05 / gray 0.08 / black 0.07) + forced-negative and scoping tests; deliberately NOT wired into build:validate (consumer builds shouldn't fail on authoring math; residual: the prepack path runs build without tests — recorded, Peter may overrule, ~20 lines). F3/F4 — no `wcag` mode exists in the DTCG output at all; `collectModes()` now derives declarations from payload; dark overrides flow to Figma (9 tokens with distinct dark values, was 0); dark ships as resolved literal not alias (downstream alias-pair extraction can't express per-mode aliasing) — documented limitation. F5 — predicate settled to the enforcing code's own definition (multiple-of-8 AND participating family); 13 sub-grid flags corrected; standing 14-test guard added; generated artifacts zero-diff. F8 (Lina) — Button-CTA minWidth now references size700/900/1000 (values byte-identical, 110 tests green).

**Second-order residuals**: `2026-09-19-accuracy-pass-residuals.md`.
