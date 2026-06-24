# Inbound from Spec 117 (Token-Index Generation Integrity) — for Spec 123

**Date**: 2026-06-24
**Status**: 117 complete & on `main`. (123 is direction-gated on 118's Task-8 decision; this is context to carry in, not an unblock.)

117 touched several **consumer-facing / distribution** surfaces 123 will care about.

## 1. Package-mode component-token loading is now fixed + guarded (R4)

A consumer in **package mode** authoring their own component tokens had them **silently dropped** — `loadComponentTokens` was gated on `tokenSourceMode === 'local'`. 117 R4 re-gated loading on **source presence** (convention dir and/or `componentTokenDirs`), independent of mode, and built a **consumer-package-mode fixture test** (`src/tools/integrity/__tests__/consumer-package-mode.test.ts`, Task 5.2) covering both halves: consumer tokens load, and the "none found" warning fires in package mode. So this consumer-distribution behavior now works and is regression-guarded — 123 can build on it rather than re-discover the gap.

## 2. Distribution-layer items 117 surfaced/deferred to 123

- **`js-yaml` clean-install crash** — `npx designerpunk init` crashed on a clean consumer install because `js-yaml` was undeclared (fixed `f01a1491`). 117's decision-record (F-C1) explicitly scopes this distribution/packaging class to **Spec 123**. Reaffirming the pointer.
- **Raw-`.ts` package exports** — `./blend`, `./build`, `./types` export to raw `.ts` (all of `import`/`require`/`types`), even though the compiled JS is what's packaged (`@3fn/core/blend` consumers import compiled `dist/blend/*.js`). Coherence reconciliation is **118 Increment 3b**, but it's a distribution concern 123 intersects.

## 3. Blend distribution quality (tracked, holistic)

`.kiro/issues/2026-06-24-blend-system-architecture-and-oklch-alignment.md`: the shipped blend utilities compute interaction-state colors in **RGB/HSL**, while an OKLCH-correct `OklchBlendCalculator` sits orphaned — so consumers currently get blends in a different color space than the OKLCH foundation. Distribution-quality relevance; parked for a holistic blend review.

## Cross-spec tie

117's documented-`generate` path is certified (via 118 Increment 1's loader), but trust is **config-load-path-only** until 118 Increment 3b. 123's distribution work and 118's exports reconciliation are the two sides that close the consumer-facing surface.
