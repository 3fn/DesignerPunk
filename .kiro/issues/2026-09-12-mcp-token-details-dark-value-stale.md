# Application MCP `get_token_details` Reports Light Value as the Dark Value for Theme-Varying Tokens

**Date**: 2026-09-12
**Discovered by**: Ada (incidental, during the F4 WCAG remediation — verifying the new dark override via MCP)
**Domain**: Ada (token metadata resolution inside the Application MCP) · Thurgood interest (MCP accuracy / claims-vs-source class)
**Severity**: Medium — no runtime impact (platform outputs resolve correctly), but the MCP is the agents' source of truth and it is wrong for every theme-varying token
**Status**: Fixed (2026-09-13, branch `fix/mcp-token-details-dark-value` — not yet merged)

---

## Symptom

`get_token_details` returns `resolvedValue.dark.base` equal to the **light** value for every token with a Level 2 dark override. Example: `color.structure.canvas` — dark override to `gray400` has shipped since Spec 050, platforms resolve it correctly, but the MCP reports its dark value as white100. Same for the new `color.feedback.success.text` → green300 override (which is how this surfaced).

## Why it matters

This is the same claims-vs-source defect class the 2026-09-12 Spec 112 audit documents: a surface that *looks* authoritative serving stale data. An agent asking the MCP for a token's dark value gets the wrong answer and will reason (or author docs/specs) from it. Pre-existing — NOT caused by the F4 change.

## Likely shape

The MCP's token-details resolver composes `resolvedValue` without applying `darkSemanticOverrides` (Level 2) — mirroring the resolution path that `generateTokenFiles` / the new `SemanticColorContrast.test.ts` DO apply. Fix belongs wherever the Application MCP builds `resolvedValue`; a regression assertion should pin at least one known theme-varying token (canvas) to its overridden dark value.

---

## Resolution (Ada, 2026-09-13 — authorized by Peter)

### Confirmed mechanism

`TokenIndexer.getDetails()` layered the Spec 121 resolved-value triple over the index entry via
`TokenRefResolver.resolve(name)`, which chain-resolves a token's **base** `primitiveReferences`
only. `darkSemanticOverrides` was never consulted. Compounding it: legacy colour primitives have
`light.base === dark.base`, so even the `dark` slot inside the resolved bundle repeated the light
value. Verified against the **compiled** `application-mcp-server/dist` build the live MCP runs
(2026-07-14 artifact): `color.structure.canvas` → `resolvedValue.dark.base = oklch(1 0 260)`
(white100) instead of gray400's `oklch(0.42 0.018 260)`.

### Shape chosen — additive `themeResolutions`

`get_token_details` now emits one new top-level key alongside the untouched triple:

```
themeResolutions: {
  dark: {
    primitiveReferences,   // the override's refs verbatim (e.g. { value: 'gray400' })
    resolvedValue,         // chain-resolved through the SAME path as the base triple
    resolvedUnitType,
    resolutionDepth,       // 'full' | 'partial' — same contract as the base triple
    modeValue              // convenience scalar: the dark.base slot, or null
  } | null
}
```

Why an object rather than flat `darkResolvedValue*` fields: a flat mirror costs 3+ top-level keys
per theme and would need 3+ more for each future theme. The object is the extension point — adding
`wcag` later is additive in exactly the way `dark` is today, without another top-level key.

**Null contract** (documented at the Spec 121 contract site, `TokenIndexer.ts § ThemeResolutions`):
`themeResolutions` is ALWAYS present, every tier, never omitted. `themeResolutions.dark` is `null`
when — and only when — the token has no Level 2 dark override, which means "dark resolves exactly
like the base triple" (correct for Level 1, mode-invariant, all primitives, all component tokens).
If the theme file itself is unreadable, every token reports `dark: null`; that degraded state is
surfaced as an index **warning** (→ component health) so it is visible rather than silent.

The base triple's meaning is unchanged: it remains the BASE (light) resolution. Nothing existing
moved or changed meaning.

**Composite overrides** (`color.structure.border.subtle` → `{ color: gray500, opacity: opacity048 }`)
are not collapsed into one value — there is no honest single terminal value for a colour+opacity
pair. They mirror the base triple's multi-ref branch (`resolutionDepth: 'partial'`, `resolvedValue`
= the token's own name, `modeValue: null`) with the full refs exposed so each part can be resolved
individually. Documented, not silently mishandled.

### Where override values are read

New `application-mcp-server/src/indexer/SemanticOverrideReader.ts` — text-parses a theme's
`SemanticOverrides.ts` (keys AND values), honouring ModeClassifier's no-pipeline-coupling design
constraint. Its key regex is byte-identical to ModeClassifier's former one, and `ModeClassifier`
now delegates to it, so mode classification is unchanged by construction. Values are extracted with
a brace-balanced scan (a `[^{}]*` inner match would silently drop any entry that ever nests).
`TokenIndexer.indexTokens(tokenIndexDir, projectRoot?)` loads the dark map; `ComponentIndexer`
passes the same `projectRoot` the mode classifier uses.

### WCAG: explicitly DEFERRED (not free symmetry)

Not included, deliberately. `wcag` is not one resolution but a matrix:
`src/tokens/themes/wcag/` AND `src/tokens/themes/dark-wcag/` layer over the dark theme with their
own precedence, and every primitive carries its own `.wcag` slot inside each of `light`/`dark`. So
"the wcag value" is at least two answers (light-wcag, dark-wcag) plus a slot-selection rule — its
own design pass, which belongs to the deferred **Semantic Contrast & Theme Coverage** spec. The
`themeResolutions` object is the extension point for it.

Related finding for that spec: the token index's own `themeVarying` flag is computed from the
**dark** override union only. `color.action.primary` is overridden in the wcag theme (cyan300 →
teal300) yet carries `themeVarying: false`. So wcag divergence is invisible in the index as well as
in the MCP — pinned by a test so the fact stays visible.

### Regression tests

`application-mcp-server/src/indexer/__tests__/ThemeResolution.test.ts` (live corpus — the defect was
a disagreement between two real files; a synthetic fixture could not have caught it):
- canvas: reports gray400, `modeValue = oklch(0.42 0.018 260)`, explicitly `not` white100's value
- canvas: base triple still the LIGHT resolution (additive-fix guard)
- `color.text.default` → white100, `color.text.muted` → white300, `color.feedback.success.text` → green300
- composite `color.structure.border.subtle` → partial + both refs, `modeValue` null
- null contract: wcag-only override (`color.action.primary`), non-colour semantic, primitive
- every key in the live dark theme file resolves to a non-null dark resolution
- missing-theme-file fixture: warns AND still answers `dark: null` (degraded, not silent)
- `SemanticOverrideReader` unit cases incl. multi-line / nested-brace entries

`application-mcp-server/src/__tests__/tool-boundary.contract.test.ts` — **deliberately re-baselined**:
`themeResolutions` appended to all three exact-key-set constants with a dated RE-BASELINE LOG entry
explaining that the guard fired because it was doing its job (additive field, not a breaking
change). Four new tool-boundary assertions prove the field survives `handleTool` assembly.

### Verification

- `application-mcp-server`: `npx tsc --noEmit` clean; `npm test` 24 suites / 343 tests pass
- Repo root: `npx tsc --noEmit` clean; `npm test` 359 suites / 8896 tests pass
- **Compiled-output proof** (MCP servers run from dist, not src): rebuilt both artifacts and probed
  each. `application-mcp-server/dist/index.js` — spawned as a real stdio server, `tools/call`
  `get_token_details` → canvas `themeResolutions.dark.modeValue = oklch(0.42 0.018 260)`
  (before rebuild: field absent, dark slot = `oklch(1 0 260)`). Same result from the shipped esbuild
  bundle `dist/mcp/application-mcp.js`.

### Out of scope / follow-ups

- **`product-mcp-server/src/indexer/ProductTokenIndexer.ts` shares the defect class** — it resolves
  product token refs through its own copy of `TokenRefResolver` and never consults theme overrides,
  so a product token pointing at a theme-varying semantic reports the light value. NOT fixed here
  (charter scope). The durable fix is the already-logged backlog item: one shared resolver module
  consumed by both MCPs (Spec 121 Decision 7 / Carried-Forward 2).
- The `get_token_details` **tool description** (duplicated in `canonical/registry/tool-registry.json`,
  which feeds generated agent prompts) was NOT updated — that edit implies a prompt regeneration
  cycle beyond this fix. Agents discover the field from the response, which always carries it.
- The file watcher/staleness gate watch `token-index/` and the component dirs, not
  `src/tokens/themes/**` — editing a theme override alone does not trigger a reindex (in practice a
  token change regenerates `token-index/*.yaml`, which does). Unchanged by this fix; noted so the
  contrast spec can decide whether to widen the watch set.
- No token values or mappings were changed.
