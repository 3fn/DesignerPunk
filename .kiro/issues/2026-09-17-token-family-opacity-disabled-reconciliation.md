# Token-Family-Opacity: disabled-state content reconciliation (pre-philosophy drift, discovery-layer exposure)

**Date chartered**: 2026-09-17 (125-B U1b wave 4, step (a) — routed record; the edits do NOT ride the wave PR)
**Owner**: Ada (ruled REWRITE at her wave-4 consult; chartered as its own issue at her election, deliberately NOT folded into her queued Token-Family claims-vs-source pass — different investigation class, bounded repair, cross-referenced FROM that pass so it does not re-litigate)
**Priority**: HIGH (Ada's grading — raised from the steward's MEDIUM-HIGH on the discovery-layer fact)
**Trigger**: next Ada session / next Peter burst with token-doc capacity; independent of the campaign (the drift exists whether or not wave 4's rows ratify)
**Evidence**: `wave-4-consult-ada.md` §3 (full 14-hit enumeration + ruling); `wave-4-assessment.md` §2.5; register row `governance/classification-map.md § "no-disabled-states"` (education disposition, routed item 2)

---

## The defect

`governance/Token-Family-Opacity.md` carries a full disabled-states teaching layer authored BEFORE the no-disabled-states ruling (Peter, 2026-07-15, `.kiro/issues/button-cta-disabled-state-adjudication.md` — corpus-wide, zero exceptions) and never reconciled. Its sibling `Token-Family-Blend.md` was reconciled the same day (the ruling's Follow-up 1 routed the token deprecation to Ada by name); nobody swept the sibling family doc that had no token to deprecate.

**The sharpest edges:**
- `:451-468` — `### Disabled State Accessibility` with a **`// ✅ CORRECT: Opacity + ARIA for disabled state`** worked example emitting `disabled` and `aria-disabled="true"` — `aria-disabled` is a `DISABLED_EXCLUSION_GUARD_PATTERNS` literal that REDs the armed guard on the 4 Input-Text components. A ✅ on a gate-RED pattern.
- **`:5` — the MCP frontmatter `description`** ("Load when working with … disabled states …"): the contradiction sits in the **discovery layer** — `find_docs` routes "disabled states" queries into this doc. `Token-Quick-Reference.md:44` and `:289` compound the funnel (TQR § Interactive States routes "disabled states" → Opacity).
- Full footprint: 14 hits — `:5, :47, :135, :253` (`.disabled-overlay` CSS example), `:369-382` (`### Disabled States`), `:451-468`, `:510` (semantic-selection guidance), `:546-548` (decision tree step 5), + the two TQR routing lines.

## Repair scope (Ada's §3.4c, verbatim-in-substance — the Token-Family-Blend model: state the prohibition, name the alternatives, cite the ruling)

1. `:5` — strike "disabled states" from the frontmatter description (**first** — the discovery-layer fix, cheapest high-value line).
2. `:369-382` — replace `### Disabled States` with the Blend-model inversion: a `❌ Don't style disabled states` block naming the ruling, its date, and the three alternatives (`state_loading` / validate-on-press / don't render).
3. `:451-468` — **delete** `### Disabled State Accessibility` outright, ✅ example included (a ✅ on a gate-RED pattern cannot be rehabilitated by a caveat).
4. `:47, :135, :510, :546-548` — re-word the use-case/selection references; `opacity048` and `opacity.heavy` keep their legitimate uses (modal scrim, strong dimming, de-emphasis); only the disabled framing goes. **The tokens themselves are NOT deprecated** — `src/tokens/OpacityTokens.ts` is verified clean and untouched by this repair.
5. `:253` — rename the `.disabled-overlay` CSS example (e.g. `.scrim-overlay`).
6. `Token-Quick-Reference.md:44, :289` — drop the disabled-state routing.
7. Post-merge: docs-MCP `rebuild_index` (both docs are served).

## Verification obligation (stated per Stacy's wave-4 B4 — "routed to owner" must not become the path by which an unverified education change leaves the campaign's verification regime)

**No gate verifies token-doc territory** — that is said plainly rather than assumed away. The verification attached to this repair is therefore its own, named here before the work:
- Post-rewrite re-sweep: `grep -niE "disabled" governance/Token-Family-Opacity.md governance/Token-Quick-Reference.md` — remaining hits must be ONLY the prohibition/inversion content (the Blend `:31/:431` class), zero teaching-the-practice hits.
- Discovery-path re-query after `rebuild_index`: `find_docs` for "disabled states" must no longer route into a ✅-marked example (the Blend doc's ❌-framed content is the acceptable destination).
- **Open ruling for Peter (rides the wave-4 PR body)**: does a reconciliation-rewrite of pre-philosophy education content — where NO gate owns the territory — count as a prune requiring wave-(b) machinery, or as a correction-into-agreement repair on the owner's authority? **This charter proceeds on the repair reading unless he rules otherwise.**

## Adjacent, tracked here so it is not lost (NOT this charter's scope)

- TQR path-staleness: its family table points at `.kiro/steering/Token-Family-*.md` for ~14 docs that live in `governance/` — routed to Thurgood's infra-health queue (the monthly health check) or the claims-vs-source pass, whichever fires first.
