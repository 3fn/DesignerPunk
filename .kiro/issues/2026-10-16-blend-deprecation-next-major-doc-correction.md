# Obligation: correct the "scheduled for removal in the next major version" text on the deprecated disabled blend (RL-13)

**Date**: 2026-10-16
**Status**: ACTIVE (shipped as a known limitation in 16.0.0)
**Owner**: **Ada** (content of `Token-Family-Blend.md` and `Token-Family-Color.md`; `BlendTokens.ts`; the blend wrappers). **Thurgood** reads the served-doc hunks for cross-surface consistency.
**Trigger**: `tag:v16.0.0` pushed → one PR before release 5's phase 1.
**Source**: claims pass `.kiro/specs/123-consumer-distribution/completion/claims-pass-release-16.0.0.md` § RL-13 (the obligation had no home). Peter ruled the blend fork (a) on 2026-10-16: ship 16.0.0 with the text as is, correct it after the tag (ruled in session; recorded in the release-4 rulings record by the orchestrator in the RL-11 fix PR).
**Grant paths**: none here. `governance/**` is never granted by an issue (rule 8): a served-doc content correction by its owner rides a normal PR carrying a `**Consulted**:` line, and Peter merges it. `src/blend/**` is outside Ada's charter write scope, so the fixing PR declares its own grant for it.
**Consulted**: none needed — the owner records her own obligation; Thurgood's read is named above for the fixing PR.

---

## What is wrong

16.0.0 is a major release and does not remove `blend.disabledDesaturate` or `disabledColor()`/`disabledBlend()`; no release is scheduled to. Read in a 16.0.0 package, "the next major version" means 17.0.0, which no record plans.

## The sentences (at `308a588f3`)

- Served docs: `governance/Token-Family-Blend.md` L31, L73, L112, L172, L219; `governance/Token-Family-Color.md` L187.
- Token source: `src/tokens/semantic/BlendTokens.ts` L139 (`description`), plus the comments at L127–128 and L225. The `description` regenerates into `dist/tokens/semantic/BlendTokens.js`, the DTCG `$description` and the Figma `description`.
- Wrappers (found while writing this record; also packed): `src/blend/ThemeAwareBlendUtilities.web.ts` L60, L98, L252; `.ios.swift` L31, L176, L281; `.android.kt` L40, L167, L285; `src/blend/OklchBlendCalculator.ts` L21, L29.

## What they should say

Deprecated, retained for backward compatibility; **removal is not scheduled**. Removing them is a breaking change, so it is scheduled only by a ruling that names the major release; until then the text names no release. Do not invent a target.

## What the change is not

The `description` edit is a source text change, not a value change: `token-index/` and every token value stay the same. The regenerated DTCG and Figma exports change in that text. The fixing PR's release entry says so.
