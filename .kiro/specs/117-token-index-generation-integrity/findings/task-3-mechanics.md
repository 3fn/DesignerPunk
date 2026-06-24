# Task 3 Mechanics — Merged R3+R5 OKLCH Spine Fix

**Spec**: 117 — token-index generation integrity
**Task**: 3 (merged R3 + R5; `sharedRootCauseConfirmed: true`)
**Author**: Ada (Rosetta token specialist)
**Date**: 2026-06-24
**Status**: DESIGN — hold for Peter's ratification. No source/artifact modified.
**Method**: source-grounded against the working tree at HEAD (`spec-118-module-resolution-coherence`). Every structural claim carries file:line. Inferences are marked INFERENCE.

---

## 0. Thesis (restated, now evidenced)

One shared source — the dist path's Stage-4 mode resolution — feeding BOTH `generateTokenFiles` (dist) and `generateTokenIndex` (index), with two readouts: (R3) color value as mode-resolved OKLCH, and (R5) theme-varying derived from the *same* mode-resolved comparison dist already performs. The defect is structural: `runGenerate` resolves mode data **three times in parallel** (dist internally; index's primitive values; index's theme-varying via a separate `computeThemeVaryingTokens`), and the three drift. The fix collapses that to one resolution, surfaced once.

---

## 1. Shared-source data-flow design

### 1.1 Current (broken) flow — three parallel resolutions

`runGenerate` (`src/cli/designerpunk.ts:137-146`):

```
generateTokenFiles(tokens, config)                              // resolves mode INTERNALLY, returns void (line 137)
themeVaryingTokens = computeThemeVaryingTokens(config, …)        // SEPARATE resolution (line 139)
generateTokenIndex(dir, { primitiveTokens, semanticTokens,      // reads raw platforms.web.value (line 117)
                          componentTokens, themeVaryingTokens }) // (lines 141-146)
```

Three independent computations of "what is the mode-resolved truth":
1. **dist** — `generateTokenFiles.ts:143-167`: builds `contextSets` via `SemanticOverrideResolver.resolveAllContexts`, resolves light/dark with `resolveSemanticTokenValue`, computes `themeVaryingTokens` = registry overrides ∪ (resolved light vs dark `primitiveReferences.value` diff). **Returns none of it** (`: void`, line 31).
2. **index color value** — `generateTokenIndex.ts:117`: `value: token.platforms.web.value` — the collapsed rgba snapshot. Never sees mode resolution.
3. **index theme-varying** — `themeVarying.ts:21-59`: a *fourth-tier* re-derivation reading `primitive.platforms.web.value.{light,dark}.base` (lines 49-53).

That dist (1) returns nothing is the structural root: the index path (2,3) has no choice but to re-derive, and re-derives differently.

### 1.2 Proposed flow — one resolution, returned, two readouts

**Decision: extract the mode-resolved truth FROM `generateTokenFiles` by changing its return type, and pass it into `generateTokenIndex`.** Do NOT recompute in the CLI, and do NOT recompute inside `generateTokenIndex`. The CLI becomes a pure conduit.

Rationale for "extract-and-return" over "compute-in-CLI": dist's resolution is non-trivial and already correct (it is what ships to `dist/`, the certified target). Re-implementing it in the CLI would re-create the very drift we are removing (classification.md §"What merge means"). The single source of truth must be the code dist itself runs.

**New shared interface** (new type, co-located with `generateTokenFiles` or in a small `src/generators/ModeResolvedTokens.ts` — INFERENCE on file location; either is acceptable):

```ts
export interface ModeResolvedTokens {
  /** Semantic tokens with primitiveReferences resolved to mode-specific values. */
  resolvedLight: Array<Omit<SemanticToken, 'primitiveTokens'>>;   // contextSets['light-base'] resolved (generateTokenFiles.ts:146)
  resolvedDark:  Array<Omit<SemanticToken, 'primitiveTokens'>>;   // contextSets['dark-base'] resolved  (generateTokenFiles.ts:147)
  /** The exact set dist emitted as light-dark(): registry overrides ∪ light≠dark diff. */
  themeVaryingTokens: Set<string>;                                // generateTokenFiles.ts:158-167
  /** Per-primitive mode-resolved OKLCH for the R3 value readout. */
  primitiveOklch: Map<string, { light: OklchTokenMetadata; dark: OklchTokenMetadata }>;
}
```

**Functions/types changed:**

| File:line | Change |
|---|---|
| `src/generators/generateTokenFiles.ts:31` | Signature `: void` → `: ModeResolvedTokens`. At the end, return the already-computed `resolvedLight`, `resolvedDark`, `themeVaryingTokens` (lines 146-147, 158-167) plus the new `primitiveOklch` map. **No recomputation** — these locals already exist; only `primitiveOklch` is new. |
| `src/generators/generateTokenFiles.ts` (new, near 145) | Build `primitiveOklch` by mapping each color primitive through `getOklchMetadata` (`OklchTokenIndexMetadata.ts:25`) for the light/dark *resolved* OKLCH. See §3 for why light vs dark here is override-driven, not primitive-intrinsic. |
| `src/generators/generateTokenIndex.ts:26-31` | `TokenIndexInput`: replace `themeVaryingTokens: Set<string>` with `modeResolved: ModeResolvedTokens` (carries the set + the OKLCH + resolved light/dark). |
| `src/generators/generateTokenIndex.ts:117` | Replace `value: token.platforms.web.value` with the mode-aware OKLCH value built from `modeResolved.primitiveOklch` (see §2 for shape). |
| `src/generators/generateTokenIndex.ts:130` | `themeVarying.has(token.name)` now reads `modeResolved.themeVaryingTokens`. **CORRECTED (§4.1):** this must be the **base-scoped** set (the 5 base value-diff keys), NOT the raw `themeRegistry.getThemeVaryingTokens()` Set, which is registry-wide = 10 (includes WCAG-only keys). Pass-through of the raw Set re-introduces committed's stale 10. See §4.1 for the mechanism. |
| `src/cli/designerpunk.ts:137-146` | `const modeResolved = generateTokenFiles(tokens, config);` then pass `modeResolved` into `generateTokenIndex`. **Delete the `computeThemeVaryingTokens` call (line 139)** and its import (line 27). |
| `src/cli/themeVarying.ts` | Becomes dead for the index path. Disposition in §5 — recommend delete, not strip-and-keep. |

**Where `runGenerate` wires it:** `src/cli/designerpunk.ts:137-146`, replacing the parallel triple with a single returned object. One call site, ~8 lines net change in the CLI.

**Counter-argument (mandatory):** changing `generateTokenFiles`'s return type from `void` widens its contract — a generator that "writes files" now also "returns resolved data," arguably two responsibilities. **Response:** the data already exists as locals inside the function (lines 146-147, 158-167); we are not adding computation, only stopping the function from *discarding* its own intermediate truth. The alternative — extracting a standalone `resolveModes(tokens, config)` that both `generateTokenFiles` and the index call — is cleaner separation but is a larger refactor that moves the dark-overrides wiring (`generateTokenFiles.ts:19-21,104-143`) out of the generator. That is the *better long-term shape* but exceeds Task 3's blast budget. **INFERENCE / open recommendation:** propose returning-from-`generateTokenFiles` for Task 3, and log "extract `resolveModes` as a pure function" as a follow-up. Flag for Peter.

---

## 2. R3 value-shape decision

**Decision: mode-aware value carrying light/dark OKLCH (NOT a single representative value + flat channels).**

### Evidence from the `get_token_details` contract

The Application MCP already returns a **mode-nested** shape and reads it straight from `primitives.yaml`'s `value` field. Live `get_token_details("white100")` today returns:

```json
"value": { "light": { "base": "rgba(255,255,255,1)", "wcag": … }, "dark": { "base": "rgba(255,255,255,1)", … } }
```

— i.e. the tool is *already* contractually mode-aware (`value.light.base` / `value.dark.base`); it is merely carrying collapsed rgba because `generateTokenIndex.ts:117` feeds it the collapsed field. The fix does not change the contract's *shape*; it changes the contract's *content* from collapsed rgba to mode-resolved OKLCH. A single-representative-value shape would be a contract regression (it would flatten a field consumers already read as nested).

**Corroboration that the bug is consumer-visible today:** `get_token_details("color.structure.canvas")` returns `resolvedValue.dark.base: "rgba(255,255,255,1)"` (white) — but dist resolves canvas-dark to `oklch(0.42 0.018 260)` (near-black, `DesignTokens.web.css:559`). The MCP is currently surfacing the R3/R5 defect to consumers. Mode-aware OKLCH is what makes the MCP correct.

### Resulting `primitives.yaml` color-entry shape (proposed)

For a color primitive, replace the collapsed `value:` with mode-resolved OKLCH plus channels metadata (channels from `getOklchMetadata`, `OklchTokenIndexMetadata.ts:13-20`):

```yaml
white100:
  family: color
  value:
    light: { base: 'oklch(1 0 260)', wcag: 'oklch(1 0 260)' }
    dark:  { base: 'oklch(1 0 260)', wcag: 'oklch(1 0 260)' }
  oklch:
    light: { l: 1, c: 0, h: 260, channels: { lightness: '…', chroma: '…', hue: '…' } }
    dark:  { l: 1, c: 0, h: 260, channels: { … } }
  formula: Systematic white scale progression - pure white
  platforms: { web: --white-100, ios: white100, android: white_100 }
```

Notes / honest caveats:
- **Primitive light vs dark for an OKLCH primitive is identical** (white100 light==dark, gray400 light==dark — confirmed in committed `primitives.yaml:750-759, 652-661`, and structurally because `resolveColorPrimitive`'s OKLCH branch returns `composed.resolved` regardless of mode — `SemanticValueResolver.ts:26-31`). So the per-primitive `value.light`/`value.dark` will be equal for every primitive. That is correct and intended: **primitive-level mode variance does not exist in the OKLCH model**; mode variance lives at the *semantic* layer via overrides (§3). Keeping the nested shape preserves the existing MCP contract even though the two halves match.
- **`wcag` slot**: INFERENCE — the dist primitive block is not WCAG-varying at the primitive tier either; carry `wcag == base` per mode unless a primitive-tier WCAG mechanism is found at implementation time. Mark as a runtime check (§7).
- Whether `oklch` should be a sibling key (as above) or nested under `value` is a cosmetic call; sibling keeps `value` shape-compatible with the current MCP reader. Recommend sibling. Flag for Peter.

---

## 3. The open question, resolved — `color.structure.canvas` end-to-end

**Question:** with `themes: []`, how does dist obtain canvas's dark value `oklch(0.42 0.018 260)`?

**Answer: mechanism (b) — a semantic remapping via `darkSemanticOverrides`. NOT (a) primitive-intrinsic. NOT (c).**

### Trace

1. **Base semantic** — `color.structure.canvas` → `primitiveReferences: { value: 'white100' }` (`ColorTokens.ts:456-458`).
2. **Dark override exists** — `darkSemanticOverrides['color.structure.canvas'] = { primitiveReferences: { value: 'gray400' } }` (`dark/SemanticOverrides.ts:163`). This is one of exactly **5** populated overrides (lines 163-167).
3. **Override is applied regardless of `config.themes`** — `generateTokenFiles.ts:19` imports `darkSemanticOverrides` statically; line 131 wires it into `contextOverrides['dark-base']`; line 143 `resolveAllContexts` applies it; line 147 resolves `contextSets['dark-base']`. The `config.themes` array is never consulted on this path. So even with `themes: []`, canvas's dark context reference becomes `gray400`.
4. **Resolution to OKLCH** — `resolveSemanticTokenValue(canvas, 'dark', 'base')` takes the simple-reference branch (`SemanticValueResolver.ts:117-132`), calls `resolveColorPrimitive('gray400', 'dark', 'base')` → OKLCH branch returns `composed.resolved` for gray400 = `oklch(0.42 0.018 260)` (`SemanticValueResolver.ts:26-31`; matches `DesignTokens.web.css:559` dark slot). Light resolves `white100` → `oklch(1 0 260)`.
5. **light-dark() emission** — light ref (`oklch(1 0 260)`) ≠ dark ref (`oklch(0.42 0.018 260)`) → `themeVaryingTokens.add('color.structure.canvas')` (`generateTokenFiles.ts:164-166`) → emitted as `light-dark(oklch(1 0 260), oklch(0.42 0.018 260))` (`DesignTokens.web.css:559`).

**Why mechanism (a) is inert here:** the OKLCH branch of `resolveColorPrimitive` (`SemanticValueResolver.ts:26-31`) ignores its `mode` parameter entirely — it returns `composed.resolved`, a single Oklch. Primitive-intrinsic light/dark differentiation does not exist in the OKLCH model. (Confirmed: white100 and gray400 both show `light.base === dark.base` in committed `primitives.yaml`.)

### Consequence for how the index MUST compute theme-varying

The INDEX path's `computeThemeVaryingTokens` checks **only mechanism (a)** — `primitive.platforms.web.value.light.base !== dark.base` (`themeVarying.ts:49-53`). Since (a) is inert under OKLCH, this check finds **0** for canvas (and every token) — yet canvas IS theme-varying via (b). **The index must replicate dist's mechanism-(b) computation, not (a).** That is precisely why the fix wires the index to dist's `themeVaryingTokens` (registry overrides ∪ resolved-light-vs-dark diff, `generateTokenFiles.ts:158-167`) rather than to any primitive-intrinsic check. Computing theme-varying by mechanism, not coincidentally, *requires* reusing dist's resolved-semantic diff.

---

## 4. 10-vs-7 reconciliation

**The "7" is a miscount of occurrences; the correct base-context target is 5; committed's 10 over-marks by 5.**

### The dist truth (`DesignTokens.web.css`)

`grep "light-dark("` returns **7 occurrences**, but they span two CSS blocks:
- **Base `:root`** (lines 13-929) — **5** distinct tokens (lines 548, 559, 565, 566, 568):
  `color.action.navigation`, `color.structure.canvas`, `color.structure.border.subtle`, `color.background.primary.subtle`, `color.icon.navigation.inactive`.
- **`:root[data-theme="wcag"]`** (lines 932-940) — 2 *more* `light-dark()` (lines 937, 939): `color.action.navigation`, `color.background.primary.subtle` — **duplicates of base keys** re-emitted under the WCAG theme.

So 7 = 5 base + 2 WCAG-repeats. **The audit's "7" counted raw occurrences across both blocks.** The base-mode theme-varying set — what `semantics.yaml`'s `themeVarying` flag denotes — is **5**, and those 5 are **exactly** the 5 keys of `darkSemanticOverrides` (`dark/SemanticOverrides.ts:163-167`). Mechanism (b) fully accounts for the base set.

### Committed's 10 vs the correct 5

Committed `semantics.yaml` marks 10 `themeVarying: true`:
`feedback.info.text`, `feedback.info.background`, `feedback.info.border`, `action.primary`, `action.navigation`, `contrast.onAction`, `structure.canvas`, `structure.border.subtle`, `background.primary.subtle`, `icon.navigation.inactive`.

The correct dist base 5 is a **strict subset**. The 5 over-marks — `feedback.info.{text,background,border}`, `action.primary`, `contrast.onAction` — are **not** base-mode varying:
- `color.action.primary` emits a **single** value `oklch(0.76 0.148 202.5)` in base `:root` (`DesignTokens.web.css:546`), not `light-dark()`.
- `color.contrast.onAction` emits single `oklch(0 0 260)` (line 558).
- (info.* likewise have no `darkSemanticOverrides` entry and no base `light-dark()`.)

These tokens DO differ in the WCAG `[data-theme]` block (e.g. action.primary line 936) — that is **theme variance, not base light/dark mode variance**. Committed's 10 conflates the two. It is a stale artifact of an older computation (likely a prior primitive-intrinsic or WCAG-inclusive pass) that no longer matches how dist emits.

**Target: the 5 base-mode `light-dark()` keys = `darkSemanticOverrides` keys.** Do NOT reproduce committed's 10.

**RESOLVED EMPIRICALLY (2026-06-24, see §4.1 below): dist's in-memory `themeVaryingTokens` Set is WIDER than 5 — it is exactly the 10. Pass-through is UNSAFE.** The earlier hypothesis here ("union = 5") was WRONG: it assumed the registry held only the dark theme. It does not — `generateTokenFiles.ts:119-123` also registers the `wcag` theme, and `getThemeVaryingTokens()` unions override keys across *all* registered themes (`ThemeRegistry.ts:83-91`). The fix must therefore derive the index's `themeVarying` set from the **base light-vs-dark resolved value diff**, NOT from the raw `themeVaryingTokens` Set. See §4.1.

### 4.1 RESIDUAL UNKNOWN #1 — RESOLVED (runtime experiment, disposable worktree)

**Question (from §7):** is dist's in-memory `themeVaryingTokens` Set (the thing that would feed the index) exactly the 5 base keys (pass-through safe), or wider — including WCAG registry keys (pass-through unsafe)?

**Answer: WIDER. The Set is exactly 10, identical to committed's stale 10. Pass-through is UNSAFE.**

**Method:** disposable `git worktree` at HEAD (`041aaea8`), temporary `console.error` probes inserted at `generateTokenFiles.ts:158` (registry-only) and `:167` (final union), live `node bin/designerpunk.js generate` against this repo's `designerpunk.config.ts` (`themes: []`, confirmed line 21). Worktree torn down; real tree unmodified (verified). This is the **live generate path**, not a reconstruction.

**Captured dump (verbatim):**
```
PROBE_REGISTRY_ONLY ["color.action.navigation","color.action.primary","color.background.primary.subtle","color.contrast.onAction","color.feedback.info.background","color.feedback.info.border","color.feedback.info.text","color.icon.navigation.inactive","color.structure.border.subtle","color.structure.canvas"]
PROBE_BASEDIFF_NEW_ADDS []
PROBE_FINAL_SET ["color.action.navigation","color.action.primary","color.background.primary.subtle","color.contrast.onAction","color.feedback.info.background","color.feedback.info.border","color.feedback.info.text","color.icon.navigation.inactive","color.structure.border.subtle","color.structure.canvas"]
```

**Per-member source attribution** (registry-overrides `getThemeVaryingTokens()` vs base light/dark diff loop `:159-167`):

| Token | In base `:root` `light-dark()`? | Registry source (which theme's overrides) | Added by base-diff loop? |
|---|---|---|---|
| color.structure.canvas | YES (CSS :559) | dark (`dark/SemanticOverrides.ts:163`) | already present (no new add) |
| color.action.navigation | YES (CSS :548) | dark `:164` + wcag + dark-wcag | already present |
| color.background.primary.subtle | YES (CSS :566) | dark `:165` + wcag + dark-wcag | already present |
| color.structure.border.subtle | YES (CSS :565) | dark (`:166`) | already present |
| color.icon.navigation.inactive | YES (CSS :568) | dark (`:167`) | already present |
| color.action.primary | **NO** (single value, CSS :546) | **wcag only** (`wcag/SemanticOverrides.ts:20`) | no |
| color.contrast.onAction | **NO** (single value, CSS :558) | **wcag only** (`wcag/SemanticOverrides.ts:24`) | no |
| color.feedback.info.text | **NO** | **wcag only** (`wcag/SemanticOverrides.ts:15`) | no |
| color.feedback.info.background | **NO** | **wcag only** (`wcag/SemanticOverrides.ts:16`) | no |
| color.feedback.info.border | **NO** | **wcag only** (`wcag/SemanticOverrides.ts:17`) | no |

**Two decisive observations:**
1. `PROBE_REGISTRY_ONLY` already contains all 10 — the registry union alone (dark's 5 ∪ wcag's 7, with dark-wcag's 2 subsumed) = 10. The `wcag` theme registration (`generateTokenFiles.ts:119-123`) injects the extra 5 WCAG-only keys.
2. `PROBE_BASEDIFF_NEW_ADDS` is **empty** — the base light/dark value-diff loop (`:159-167`) adds **nothing new**, because the 5 base-varying keys are already a subset of the registry's 10. So under `themes:[]` the loop is inert as a *set-widener*; the final Set is determined entirely by the registry.

**Corroboration that dist's base CSS still emits exactly 5** (same worktree run): base `:root` `light-dark()` lines = 5 (CSS :548, :559, :565, :566, :568); total file occurrences = 7 (5 base + 2 WCAG-block repeats). This confirms §4's 10-vs-7-vs-5 reconciliation AND proves the Set (10) and the base emission (5) diverge by construction.

**Why they diverge — the mechanism (confirmed in source, not inferred):** the web base block does NOT consume `themeVaryingTokens` at all. `TokenFileGenerator.ts:1707` passes the Set only to non-web platforms (`platform !== 'web' ? options.themeVaryingTokens : undefined`). The web base `:root` derives `light-dark()` purely from a resolved light-vs-dark **value** comparison (`TokenFileGenerator.ts:886`: `lightParts.value !== darkParts.value`). That value diff yields exactly the 5 dark-override keys; the 5 WCAG-only keys have identical light/dark base values, so they never wrap. The 10-member Set and the 5-key base emission are produced by two independent mechanisms.

**DESIGN CONSEQUENCE — pass-through is UNSAFE; the index must source theme-varying from the base value-diff, not the Set.**

The §1.2 plan said `generateTokenIndex.ts:130` should read `modeResolved.themeVaryingTokens` as "the same Set dist emitted." That is now corrected: the raw `themeVaryingTokens` Set is **registry-wide (10)**, not base-scoped (5). Feeding it to the index would reproduce committed's stale 10 — i.e. it would re-introduce the exact R5 over-marking the fix exists to remove.

**Precise mechanism (revised):** `ModeResolvedTokens` must carry a **base-scoped** theme-varying set computed from the light-vs-dark resolved diff alone, NOT `themeRegistry.getThemeVaryingTokens()`. Two equivalent implementations:
- **(Preferred) Compute the set independently of the registry**: in `generateTokenFiles`, build `baseThemeVaryingTokens` by running ONLY the `:159-167` value-diff loop seeded from an **empty** Set (drop the `getThemeVaryingTokens()` seed for the index's purposes). Return *that* as `ModeResolvedTokens.themeVaryingTokens`. This makes the index set mechanism-(b)-derived by construction and matches the 5-key base CSS emission exactly. It does NOT change what dist passes to the non-web platform generators (they still get the registry Set at `:1707`, which is correct for *their* theme-block output).
- **(Alternative) Subtract WCAG-only keys**: keep the registry seed but subtract `wcagOverrideKeys` (already computed, `generateTokenFiles.ts:152-155`) that are not also base-varying. More fragile (depends on set arithmetic staying in sync); not recommended.

**Recommendation: the preferred mechanism.** Derive the index's base theme-varying set from the value-diff loop seeded empty — it is exactly the 5 base keys, it is mechanism-(b)-correct, and it is the same predicate the web base CSS already uses (`TokenFileGenerator.ts:886`), so index and dist base block bind by construction. This means `generateTokenFiles`'s *internal* `themeVaryingTokens` (registry-seeded, for non-web platforms) and the *returned* `ModeResolvedTokens.themeVaryingTokens` (base-scoped, for the index) are TWO DIFFERENT sets — a subtlety that must be explicit in the implementation and the type doc-comment, else a future maintainer will "simplify" them back into one and silently re-break R5. **Flag for Peter: this is the load-bearing correction to §1.2's line-66 claim.**

**Counter-argument:** returning a set that differs from the function's own internal `themeVaryingTokens` local is surprising — two near-identically-named sets with different membership invites exactly the conflation this whole spec is about. **Response:** name them distinctly (`themeVaryingTokens` internal/registry-wide vs `baseThemeVaryingTokens` returned/base-scoped) and doc-comment the WHY (registry includes WCAG theme; base CSS does not). The alternative — making the index consume the registry Set and filtering downstream — pushes the same subtlety into the index, which is worse (the index is the consumer that must NOT know about WCAG theme internals). Keep the scoping at the source. **INFERENCE on naming; mechanism is observed.**

**Validation hook update (§6 item 3):** the assertion "`semantics.yaml` `themeVarying:true` set == dist base-mode `light-dark()` key set (5)" is now doubly grounded: target is the 5-key base value-diff set, and it can be cross-checked against the base `:root` `light-dark(` lines in `DesignTokens.web.css`. It will fail on committed's 10 (desired). Additionally recommend a guard asserting the returned `ModeResolvedTokens.themeVaryingTokens` is NOT referentially the registry's `getThemeVaryingTokens()` output (catches a future re-conflation).

---

## 5. rgba-guard disposition (`themeVarying.ts:44`)

`if (typeof refName !== 'string' || refName.startsWith('rgba(')) continue;`

**Disposition: REMOVE the guard by removing the whole file from the index path** (recommend deleting `computeThemeVaryingTokens`; §1.2). The guard exists only because `computeThemeVaryingTokens` reads baked/collapsed references that can be literal `rgba(...)` strings; once the index sources theme-varying from dist's Set (computed over *semantic* `primitiveReferences`, pre-bake, `generateTokenFiles.ts:164-165`), this function and its guard have no caller.

**But the guard's *concern* is real and must not be naively dropped where it still applies.** dist's own diff at `generateTokenFiles.ts:164-166` compares `lt.primitiveReferences?.value` against `dt.primitiveReferences?.value` on **resolved** tokens — these are post-bake and CAN be literal `oklch(...)` / `rgba(...)` strings (e.g. opacity-composed tokens like `border.subtle`, `SemanticValueResolver.ts:74,83`). dist handles this correctly: it compares the two baked strings directly, so a token whose baked light/dark strings differ is correctly flagged, and one whose baked strings match is correctly not. **No rgba-guard is needed there because dist compares values, not names.** So:

- **Index path**: guard removed with the function (no consumer).
- **dist path**: no guard added — string-equality over baked values is correct and already handles baked-`rgba`/`oklch` refs. The audit's worry ("baked-alpha refs carrying literal rgba") is satisfied: those refs are *compared as values*, which is what we want, not skipped.

**Counter-argument:** if the index ever again needs a standalone theme-varying computation (e.g. dist return is rejected in ratification), deleting `themeVarying.ts` loses the guard knowledge. **Response:** preserve the reasoning in this doc; if a standalone path is reinstated it must compare resolved values (dist's approach), not names, making the guard moot anyway. Flag for Peter: delete vs keep-dormant.

---

## 6. Verification hooks (one fix, two assertions, via `GenerationIntegrityCheck`)

The harness (`GenerationIntegrityCheckImpl.run`, `GenerationIntegrityCheck.ts:49-65`) diffs committed vs fresh per inventory artifact with semantic equality. Both readouts are asserted from the single fix:

**R3 (no rgba; OKLCH matches dist):**
1. *Absolute-invariant scan* (the audit's P3, the only check that catches R3 since committed==fresh were both rgba): assert `token-index/primitives.yaml` color entries contain **zero** `rgba(` and that each color `value.{light,dark}.base` is a well-formed `oklch(...)`. (Pure absolute predicate, not a committed-vs-fresh diff.)
2. *Cross-artifact equality*: for each base-mode token, assert the index's mode-resolved OKLCH equals the value dist emitted in `DesignTokens.web.css` (e.g. canvas index dark == `oklch(0.42 0.018 260)`). This binds index to dist by value, closing the "index drifted from dist" gap.

**R5 (theme-varying matches dist set):**
3. Assert `semantics.yaml` `themeVarying: true` set == dist's base-mode `light-dark()` key set (target = 5 = `darkSemanticOverrides` keys; §4). Implement as: parse base `:root` `light-dark(` lines from `DesignTokens.web.css` → key set; compare to `themeVarying:true` set. This is the "matches dist by mechanism" assertion — it will *fail* on committed's stale 10, which is the desired signal that the fix corrected the over-marking.
4. Single-source guard: assert `runGenerate` no longer calls `computeThemeVaryingTokens` (structural — the index set is dist's set by construction). INFERENCE: enforce via the absence of the import, or a unit test that the value handed to `generateTokenIndex` is referentially dist's returned Set.

All four run inside the existing harness over the corrected inventory; (1) and (3) are the load-bearing new predicates. Because both readouts derive from one returned `ModeResolvedTokens`, a regression in mode resolution fails R3 and R5 together — the merge's intended property.

---

## 7. Risk / blast-radius + residual unknowns

**Blast radius:**
- `generateTokenFiles` return-type change (`void` → `ModeResolvedTokens`) — callers must be enumerated. Known caller: `runGenerate` (`designerpunk.ts:137`). **Must grep for all callers** (tests, `generateProductTokens`, integrity `DiskFreshGenerator`) before changing the signature; any caller ignoring the return is unaffected (widening void→object is source-compatible for call-as-statement). INFERENCE: low risk, but enumerate.
- `TokenIndexInput` shape change — internal to the generator + its tests (`OklchExport.test.ts`, others). Contained.
- `primitives.yaml` color-entry shape change — **consumer-facing** via the Application MCP. The shape stays nested (`value.light/dark.base`), so the MCP reader is preserved; only content (rgba→oklch) and the new `oklch` sibling change. Recommend Peter confirm no external consumer parses the rgba literal.
- `themeVarying.ts` deletion — confirm no other importer (grep). It is described as index-only.

**Residual unknowns needing a runtime experiment (disposable worktree):**
1. **RESOLVED (§4.1).** The dist in-memory `themeVaryingTokens` Set is **10, not 5** — wider, including WCAG-only keys, because `getThemeVaryingTokens()` unions the registered `dark` AND `wcag` themes (`generateTokenFiles.ts:119-123`, `ThemeRegistry.ts:83-91`). **Pass-through is UNSAFE.** The index's theme-varying set must be derived from the base light-vs-dark value diff (the 5 dark-override keys), seeded empty, returned as a base-scoped set distinct from the function's internal registry-wide Set. This corrects §1.2's line-66 pass-through claim. Evidence: live `generate` dump in §4.1.
2. **`wcag` slot for OKLCH primitives** (§2) — confirm `value.dark.wcag` / per-mode wcag has no primitive-tier mechanism; carry `wcag==base` only after checking.
3. **`primitiveOklch` construction for opacity-composed semantics** — tokens like `border.subtle` bake `oklch(… / alpha)` (`SemanticValueResolver.ts:74`); confirm the index value readout for *semantics* (if any) and the primitive readout don't double-handle alpha. (Primitive entries are un-composed, so likely clean — verify.)

None of these block the design; all are confirmable in a scratch worktree running `generate` and dumping the returned object, with no working-tree mutation.

---

## Appendix — evidence index (file:line)

- Index color value bug: `generateTokenIndex.ts:117`
- Index theme-varying consumption: `generateTokenIndex.ts:130`
- Orphaned OKLCH helper: `OklchTokenIndexMetadata.ts:25` (single-value, mode-agnostic)
- Index theme-varying re-derivation (mechanism-(a)-only): `themeVarying.ts:49-53`; rgba-guard `:44`
- dist mode resolution: `generateTokenFiles.ts:143-147` (contextSets, resolvedLight/Dark)
- dist theme-varying: `generateTokenFiles.ts:158-167` (value-diff, not name)
- dist returns void: `generateTokenFiles.ts:31`
- OKLCH branch ignores mode: `SemanticValueResolver.ts:26-31`
- canvas base ref: `ColorTokens.ts:456-458` (white100)
- canvas dark override (mechanism b): `dark/SemanticOverrides.ts:163` (→ gray400); full 5-key map `:161-168`
- dist canvas emission: `DesignTokens.web.css:559`
- dist base `light-dark()` = 5: `DesignTokens.web.css:548,559,565,566,568` (`:root` 13-929)
- dist WCAG repeats (+2 → 7 occurrences): `DesignTokens.web.css:937,939` (`[data-theme="wcag"]` 932-940)
- over-marked singles emit non-light-dark: `DesignTokens.web.css:546` (action.primary), `:558` (contrast.onAction)
- committed over-mark = 10: `token-index/semantics.yaml` (`themeVarying: true` ×10)
- CLI parallel wiring: `designerpunk.ts:137-146`; `computeThemeVaryingTokens` call `:139`, import `:27`
- MCP contract is mode-nested + surfaces the bug: live `get_token_details("color.structure.canvas").resolvedValue.dark.base == rgba(255,255,255,1)` (wrong vs dist near-black)
- harness: `GenerationIntegrityCheck.ts:49-65`
