# Token-Quick-Reference "Mode-Aware Token Lookup" Section Is Stale (Wrong Worked Example)

**Date**: August 19, 2026
**Discovered By**: Claude (main loop) during a high-level theming walkthrough for Peter
**Spec**: None — documentation defect against `governance/Token-Quick-Reference.md` (Layer 2, MCP-served)
**Status**: Proposed — captured, not yet triaged
**Priority**: Medium (agent-facing guidance defect; produces a wrong remediation, not a broken build)
**Impact**: Any agent selecting or adding mode-aware color tokens via the Quick Reference routing table
**Assigned To**: Ada (content correctness — token domain) + Thurgood (Civitas steward — staleness/metadata)

---

## Summary

`governance/Token-Quick-Reference.md` § "Mode-Aware Token Lookup (Spec 080)" (lines ~53–70) teaches the
two-level mode-resolution model with a worked example that **contradicts the current source**. The
mechanism it describes ("Level 1 — the primitive carries its own light/dark values") still exists in the
resolver path, so this is **not** a wholesale-wrong section. But the specific example is wrong in both
directions: the primitive it cites does not vary by mode, and the token it cites as needing no override
in fact has an active one.

An agent following this section for `color.structure.canvas`-shaped work would conclude "no override
needed — the primitive handles dark mode," and would ship a token that **does not change in dark mode**.

## Verified contradictions

**1. The `white100` values are wrong.** Doc (lines 67–68):

```
white100.light.base = 'oklch(1.0 0 0)'      // white in light mode
white100.dark.base  = 'oklch(0.21 0 0)'     // near-black in dark mode
```

Source, `src/tokens/ColorTokens.ts` (~:398–399) — light and dark are **identical pure white**:

```
light: { base: 'rgba(255, 255, 255, 1)', wcag: 'rgba(255, 255, 255, 1)' },
dark:  { base: 'rgba(255, 255, 255, 1)', wcag: 'rgba(255, 255, 255, 1)' }
```

The OKLCH channel-primitive layer (`src/tokens/color/primitives/neutral.ts`, Spec 112) carries no mode
dimension at all — a `ComposedColor` has a single `resolved: { l, c, h }`.

**2. `color.structure.canvas` is presented as the Level 1 example ("No semantic override needed"), but it
has an active Level 2 override.** `src/tokens/themes/dark/SemanticOverrides.ts:163`:

```typescript
'color.structure.canvas': { primitiveReferences: { value: 'gray400' } },
```

`gray400` lightness = 0.42 (`src/tokens/color/channels/lightness/neutral.ts:26`), which matches the emitted
`dist/DesignTokens.web.css:559` exactly:

```css
--color-structure-canvas: light-dark(oklch(1 0 260), oklch(0.42 0.018 260));
```

So the emitted dark canvas comes from the **override**, not from the primitive. The doc's own flagship
example demonstrates the mechanism it claims is unnecessary.

**3. The remediation instruction points at a file of uncertain authority.** Line 60 instructs: *"Level 1 —
populate primitive's dark value in `ColorTokens.ts`."* See the open question below — it is not established
that editing that file still changes platform output for a given primitive.

## Open question for Ada (do not resolve from this issue alone)

Two color sources are live in the pipeline with **different theming shapes**:

| Source | Shape | Reached via |
|---|---|---|
| `src/tokens/ColorTokens.ts` (legacy) | full `light/dark × base/wcag` per primitive | `SemanticValueResolver.getColorToken` → `resolveSemanticTokenValue()` (`generateTokenFiles.ts:168–171`) |
| `src/tokens/color/` (OKLCH, Spec 112) | single `{ l, c, h }` per primitive | `composedColorMap` (`generateTokenFiles.ts:216`) |

117 of 324 legacy value slots have `base !== wcag`, so the legacy file carries live theming data. Legacy is
additionally the sole source for DTCG/Figma export (`DTCGFormatGenerator.ts:28`) and the shadow generators.

**Unverified**: whether these two sources agree, and which is authoritative for a given primitive's mode
values. If they disagree, DTCG/Figma output could diverge from CSS/Swift/Kotlin on themed colors. This is a
*separate* investigation — flagged here because it is the plausible root cause of the doc drift, not because
it belongs to the doc fix.

## Why this slipped (staleness signal for Thurgood)

`governance/Token-Quick-Reference.md` metadata carries **`Date: 2025-12-01` and no `Last Reviewed` field**,
while sibling Layer 1/2 docs do carry one. The section is stamped "(Spec 080)" and predates Spec 112's
OKLCH channel-primitive restructure. No review gate would have flagged it.

Note the `npm run audit:mode-parity` tool (`src/validators/ModeParity.ts`) is **not** stale — it defines
Level 1 as *"commented-out in theme file — fallback to base"*, which is correct and materially different
from the doc's "the primitive differentiates by mode." The tool and the doc disagree on what Level 1 means;
the tool is right.

## Recommended resolution

1. **Ada** corrects § "Mode-Aware Token Lookup": replace the `white100`/`canvas` worked example with a
   real Level 1 token (one genuinely mode-differentiated at the primitive), and align the Level 1
   definition with `ModeParity.ts`'s ("no override → falls back to base") rather than the current
   "primitive differentiates by mode" phrasing.
2. **Ada** confirms or corrects the line-60 remediation instruction once the dual-source question above is
   settled.
3. **Thurgood** adds a `Last Reviewed` field to this doc and checks whether other Spec-080-stamped sections
   across the corpus carry pre-Spec-112 color assumptions.

## Verification required before "done"

- The corrected example's claimed values match source, checked against both color sources.
- The corrected Level 1 definition matches `ModeParity.ts` classification semantics.
- `npm run audit:mode-parity` output is consistent with the doc's revised model.
- MCP re-index so the served copy reflects the fix (`rebuild_index`).

## Evidence paths

- `governance/Token-Quick-Reference.md` (~:53–70 — the stale section; :118 — the audit-tool reference)
- `src/tokens/ColorTokens.ts` (~:385–399 — `white100`; legacy mode×theme matrix)
- `src/tokens/color/primitives/neutral.ts` (Spec 112 composed primitives, no mode dimension)
- `src/tokens/themes/dark/SemanticOverrides.ts:163` (the active canvas override)
- `src/tokens/color/channels/lightness/neutral.ts:26` (`gray400` = 0.42)
- `dist/DesignTokens.web.css:559` (emitted canvas value)
- `src/generators/generateTokenFiles.ts` (:168–171 resolver path; :216 composedColorMap path)
- `src/validators/ModeParity.ts` (the correct Level 1 semantics)

## Decision needed

Confirm routing (Ada for content, Thurgood for staleness metadata), and whether the dual-color-source
question is spun out as its own issue or folded into Ada's fix.

---

## RESOLUTION (2026-08-25, appended at close)

**Status: RESOLVED** (doc fix, branch `fix/token-quick-reference-mode-resolution`) **+ SPUN OUT** (the dual-source question — see below). Peter authorized 2026-08-25; routing as proposed (Ada content, Thurgood steward).

**Ada's fix (commit `e18fca05`)**: § "Mode-Aware Token Lookup" rewritten with verified examples — Level 1 = `color.feedback.error.text`→`pink400` (commented-out override at `dark/SemanticOverrides.ts:27`; single-value emission, no `light-dark()`, `dist/DesignTokens.web.css:527`); Level 2 = `color.structure.canvas` (the token this issue proved). Level 1 definition aligned with `ModeParity.ts` ("no override → falls back to base"). The line-60 remediation REPLACED with a routing table — the old instruction ("populate primitive's dark value in ColorTokens.ts") was unexecutable: **zero of 54 legacy primitives carry `light.base !== dark.base`, and `ColorTokens.ts` is not read on the platform path at all.** `audit:mode-parity` consistent (62 = 5 L2 + 48 L1 + 9 invariant); full suite + section-citation guard green.

**The dual-source open question: ANSWERED — the sources DIVERGE MATERIALLY. Spun out** as `.kiro/issues/2026-08-25-dual-color-source-divergence.md` (platform outputs read OKLCH exclusively; DTCG/Figma primitive `$value` reads legacy RGBA; 19/50 shared primitives differ, worst ΔL ≈ 0.21; one shipped DTCG token self-contradicts between `$value` and `$extensions.modes`). High priority for design/code parity, not a build breakage. First decision question there: whether anything consumes the DTCG/Figma export today.

**Steward sweep (the Thurgood item), corrected and closed**:
- **The staleness-signal claim in this issue was WRONG**: `Last Reviewed: 2026-06-24` EXISTED (batch-stamped in the 119-A relocation, commit `e83ce803`). The true lesson: a batch review stamp does not imply section-level review — this stale section survived one. TQR's Last Reviewed now updated to 2026-08-25 (a real review of the section). RSA/CDG stamps deliberately NOT updated (only single sections were reviewed there; whole-doc stamps would recreate the same false signal).
- Spec-080 stamp sweep: **two further instances of the wrong Level-1 model found and fixed in the same commit** (Rosetta-System-Architecture § Stage 4 Level-1 block, incl. dropping the unverifiable ~85% stat in favor of the self-refreshing audit tool; Component-Development-Guide:1879 parenthetical). Token-Semantic-Structure § Theme Override Pattern and Token-Governance Decision #12: swept CLEAN (TSS's cyan300→teal300 wcag example verified correct).

Docs-MCP reindex follows the merge. This issue closes at the fix PR's merge.
