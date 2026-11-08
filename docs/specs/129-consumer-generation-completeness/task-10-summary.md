# Task 10 Summary: `validate` passes, and component-token values and override types are checked (U5)

**Spec**: 129 - Consumer-Generation Completeness · **Unit**: U5 · **Date**: 2026-11-08

## What changed for an adopter

- `npx designerpunk validate` now passes on unmodified token source. It reads each token's relationship by its family: colour, font family, easing and breakpoint descriptions are not evaluated; every other family must state an equation that holds, and a token that breaks its relationship is reported by name. It was failing 102 checks on a healthy token set.
- `generate` warns, naming the token, when one of your component tokens has a spacing or sizing value that is not on the 2 px grid and carries no `offGridReason`. It never fails on this. A value off the grid is fine when `offGridReason` says how it is derived. The old upper limit of 8 grid steps is gone, so a value like 120 is on the grid.
- `SemanticOverrideMap`, `SemanticOverride` and `ThemeOverridePair` can be imported as types from `@3fn/core/config`.

## Release-note text

"**`validate` passes on a healthy token set.** The mathematical-relationships check was failing on correct tokens and made `validate` exit non-zero for every adopter. It now reads each family's relationship strings by that family's rules and still reports a token that breaks its own equation. **Component-token values are checked.** `generate` warns, naming the token, for a spacing or sizing component-token value that is off the 2 px grid and has no `offGridReason`; add the field to say how the value is derived, or move it onto the grid. It does not fail. **The theme override types are exported.** `import type { SemanticOverrideMap, SemanticOverride } from '@3fn/core/config'`."

## Open

`generate`'s off-grid warning covers spacing and sizing custom values; radius, fontSize and color custom values are checked by the repository's lane and not warned (`.kiro/issues/2026-11-08-generate-component-token-warning-spacing-sizing-only.md`, `release:next:phase-1`). The four harness contexts are owed at head H (completion doc, criterion 7). `docs/tokens.css` lags the generator from U8 until the next release rebuild. Integration Guide L407 and L584 repeat the old `validate` defect and are owed to the release batching PR. The lock refresh (Lina) is the last act before the PR opens.
