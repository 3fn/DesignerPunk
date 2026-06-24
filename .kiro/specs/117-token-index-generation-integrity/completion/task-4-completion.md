# Task 4 Completion: Component-Token Loading Gated on Source Presence (R4) + dist ComponentTokens (N2)

**Date**: 2026-06-24
**Task**: 4. Component-Token Loading Gated on Source Presence (R4) + dist ComponentTokens (N2) (Parent)
**Type**: Parent / Implementation
**Validation**: Tier 2 — Standard
**Agent**: Ada (loader fix) · Lina consulted (loading semantics) · main-loop verification (Claude)
**Status**: Complete — verified; baseline correction ratified by Peter (2026-06-24)

---

## Summary

Un-gated component-token loading from `tokenSourceMode`, keying it on **source presence** instead. The shipped `designerpunk.config.ts` resolves to **package** mode, so the two `tokenSourceMode === 'local'` gates were silently dropping the entire component tier under the documented `generate`. The fix loads/indexes component tokens in all modes — and, as a verified side effect, **recovered 6 component tokens the bug had been silently dropping**.

## The fix (two gates, one axis)

1. **Call-site gate** — `src/cli/designerpunk.ts:108-121`: removed the `if (config.tokenSourceMode === 'local')` wrapper around the `loadComponentTokens(config)` call and the "none found" warning. Both now fire on source presence, in all modes (one removal fixes load-in-all-modes and warn-in-all-modes).
2. **allowOverwrite gate** — `src/cli/loadComponentTokens.ts:28-32, 52-55`: un-gated `setDefaultAllowOverwrite(true)` (and its reset) from `local`. `allowOverwrite` now travels with the loader regardless of mode — its own concern, not a mode concern.

## Source-presence trace (the pinned open risk — confirmed, not assumed)

Un-gating **alone** populated the registry; nothing more was needed. Under the shipped package-mode config, `componentTokenDirs` resolve to real absolute paths (`src/components/core`, `src/tokens/component`) and Source-1's convention dir (`{tokenSourceRoot}/component/`) exists — in **both** modes. The only thing suppressing discovery was the call-site `if`. Confirmed by `node bin/designerpunk.js generate --force`: before = `Component tokens: 0`; after = `Component tokens: 33`. Call-site un-gating is **sufficient** — the only remaining `tokenSourceMode` references in the generate path are display-only `console.log` labels; dist reads the same `ComponentTokenRegistry.getAll()` (mode-agnostic).

## Double-registration trace (carried from Task 1.2 — resolved)

**Package mode has a single registration path — no conflict.** A probe replicating loader discovery with `allowOverwrite=false` in package mode registered all 33 tokens with **0 conflicts**. Confirms [LINA R2]: the conflict `allowOverwrite` guards is a **local-mode dual-path artifact** (local copy + package `src` both required), absent in pure package mode. Enabling `allowOverwrite` with the loader is harmless here and future-proofs a consumer dual-path; R4's components.yaml semantic-reproduction check is the safety net against a wrong-definition overwrite (none occurred).

## Baseline correction — the committed 27 were a product of the bug (ratified by Peter)

The fix output is a **superset** of the committed file: all **27** committed tokens reproduce **value-identical** (verified — 0 value changes among the common set; raw-diff churn was reordering only), **plus 6 recovered** tokens — `inputcheckbox.box.{sm,md,lg}` and `inputradio.box.{sm,md,lg}`.

**These 6 are not new tokens.** Their source files (`Input-Radio-Base/radio-sizing.tokens.ts`, `Input-Checkbox-Base/checkbox-sizing.tokens.ts`) were first committed **2026-04-03** (`a0958aba`) — over two months *before* the committed `components.yaml` was last regenerated (**2026-06-11**, `fcc36bcf`). So the committed 27-token file is itself a **product of the silent failure** (R4's bug made visible), not a correct baseline.

**Disposition (Peter, 2026-06-24):** accept the **33-token** set as the corrected baseline and commit it — *not* an `IntentionalDivergenceManifest` entry. Fixing the committed artifact means Task 5.3's re-diff shows fresh == committed == 33 with no lingering divergence. (No token-creation governance checkpoint: the 6 are pre-existing source definitions, not newly authored tokens.)

## N2 — dist ComponentTokens populated (same fix, second readout)

`generateTokenFiles` → `generateComponentTokens(...)` reads the same `ComponentTokenRegistry`. Populating the registry populated both readouts:

| Artifact | Before (package-mode bug) | After |
|---|---|---|
| `token-index/components.yaml` (tracked) | 0 (`tokens: {}`) | **33** |
| `dist/ComponentTokens.web.css` (gitignored) | header-only (284 B) | **33** (5.7 KB) |
| `dist/ComponentTokens.ios.swift` (gitignored) | header-only (289 B) | **33** (6.6 KB) |
| `dist/ComponentTokens.android.kt` (gitignored) | header-only (306 B) | **33** (5.8 KB) |

## Verification (independently re-run in main loop)

- **Set comparison**: committed 27 ⊂ working 33; 0 keys lost; exactly 6 added. **Value parity**: 0 of the 27 common tokens changed value.
- **Source dates**: the 6 recovered tokens' sources predate the stale regen by 2+ months (confirms silent-drop, not new authorship).
- **Full suite**: `npm test` → **8955 passed / 371 suites**; `npx tsc --noEmit` → clean. Both re-run independently of the implementing agent. (A `BuildOrchestrator` metadata test flaked on one intermediate run — confirmed pre-existing/unrelated: a clean-HEAD full suite also passed 8955/8955; the flake correlated with concurrent `dist/` regeneration, not the code.)
- Local-mode path unregressed.

## Files Changed

| File | Change |
|------|--------|
| `src/cli/designerpunk.ts` | Removed call-site `tokenSourceMode === 'local'` gate (load + warn now source-presence, all modes) |
| `src/cli/loadComponentTokens.ts` | Un-gated `allowOverwrite` from mode (travels with the loader) |
| `src/cli/__tests__/loadComponentTokens.test.ts` | Test that asserted the *bug* (package mode → throw) updated to the corrected R4 contract |
| `src/cli/__tests__/backward-compat.test.ts` | Test that asserted the *bug* (loader not called in package mode) updated to assert it *is* called |
| `token-index/components.yaml` | Regenerated — corrected 33-token baseline (27 preserved + 6 recovered) |
| `dist/ComponentTokens.*` | Regenerated (gitignored) — N2 populated |

## Requirements Satisfied

- **R4** (AC1–AC4): component tokens load/index whenever sources are present, regardless of `tokenSourceMode`; gate keys on source presence; "none found" warning reachable in all modes; regenerated `components.yaml` reproduces (and corrects) the committed set.
- **N2**: `dist/ComponentTokens.{web,ios,android}` populated (no longer empty).
- **R4 AC5** (consumer blast radius) reachability confirmed empirically; the package-mode consumer **fixture + warning test** is **Task 5.2** (Thurgood).

## Follow-ups (logged, not done here)

1. **Task 5.2** (Thurgood) — package-mode consumer fixture (silent-drop half (a)) + the AC3 "none found" warning test *in package mode* (half (b)). Reachability verified here; the regression tests belong in 5.2.
2. **Task 5.3** — re-diff will see committed == fresh == 33 (this task corrected the baseline); confirm clean.
