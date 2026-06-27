# Inbound from Spec 118 (Module-Resolution Coherence) — for Spec 123 (Consumer Distribution)

**Date**: 2026-06-27
**Status**: **Spec 118 is COMPLETE & committed. The gate on 123 is CLEARED.** 123's stub said "Do not formalize until Spec 118 reaches its direction decision point" — passed. 118 didn't just decide a direction; it shipped the consumer-side resolution mechanics 123 builds on. **123 can now formalize.**

---

## What 118 settled that 123 directly builds on

123's stub: *"Distribution mechanics — how the package resolves paths in a consumer repo, how the MCP entry is wired, what `init`/`sync` emit — depend directly on Spec 118's runtime module-resolution direction."* Those mechanics now exist:

- **Single `resolvePackageRoot()` (Class C)** — `src/cli/shared/resolvePackageRoot.ts`: resolve-up + self-check for `package.json` + cwd fallback, **survives compile-to-`dist`** (118 Task 9.5.2). This is the foundation for 123's **dual path-context** (repo-relative here vs `node_modules/@3fn/core`-relative in a consumer) and its **MCP package-relative fallback** — lean on it; don't re-derive package-root logic.
- **Consumer-aware catalog (Class C′)** — 118 made the generated token-index + the component→token map reflect the **consumer's** design system (components/schemas *they* add or edit), resolved from the **active config/source**, not `__dirname` (Task 9.5.2). This is the pattern 123's "`init` emits configs pointing at installed package paths, generates for the consumer's design system" generalizes. The same consumer-awareness 123 needs is already proven for the catalog.
- **`files[]` is now drift-resistant build-tracking globs** — 118 Task 9.5.3 replaced the curated `dist/...` list with `dist/**/*.{js,d.ts,json,css,swift,kt}` + `!dist/**/__tests__/**` + one re-included fixture (the curated list silently drifted and broke consumers — the consumer guard caught it repeatedly). 123's "ship the canonical agent sources / `skills/` root / generator / product-MCP entry via `files[]`" should extend this **glob** model, and **certify via the packed-install consumer guard** (`npm run test:consumer`, the arbiter — NEVER an in-repo load; that false-greens).
- **The bin runs compiled `dist/cli/designerpunk.js` under plain `node`** (no global tsx register; 118 Task 9.5.3). 123's path-context + MCP wiring should assume **compiled-dist execution**, not raw-TS-via-global-loader. tsx is the package's internal dependency for the per-site scoped consumer-`.ts` seams (Class B); the consumer installs no TS runtime.
- **MCP servers are an exempt bundled surface** (`dist/mcp/*.js` via esbuild; paired boot/smoke guards). 123's "MCP package-relative fallback so `dist/mcp` is found regardless of consumer cwd" is consistent with that — wire to the bundles.

The full contract is codified in steering: **`Rosetta-System-Architecture.md` § "Module-Resolution Contract (Spec 118)"** + "MCP/Browser Exemption Boundary" (relocating to `governance/` under Spec 119).

## 118 explicitly left 123's core decision OPEN (it did not pre-empt you)

118 `tasks.md` carries an explicit boundary marker: **"[BOUNDARY — Spec 123] consumer source distribution form (copied raw `.ts` vs shipped-package vs compiled) is 123's call; 9.5.1's scoped seams hold under any 123 outcome keeping raw-`.ts` authoring. Flag, don't pre-empt."** So:
- **The distribution form is yours to decide.** 118's per-site scoped-tsx seams (Task 9.5.1) work under any 123 choice that keeps raw-`.ts` consumer authoring — they don't constrain it.
- The live consumer bugs **F-C1/F-C2/F-C6** that fed 118 are addressed by the contract (F-C1 already fixed in 12.0.5). They are not 123's to re-fix.

## Two couplings to carry

1. **Spec 124 (Component-Token Return Contract)** landed alongside 118: `defineComponentTokens` no longer self-registers — it returns a branded value-map that `loadComponentTokens` harvests (sole writer). This removed the dual-instance split on the registerless path. 123 already has `inbound-from-124.md` (the C′ + component-token-loader coupling + the authoring-convention seed) — read it together with this note; the two specs jointly settle how component tokens load in a consumer.
2. **Release-system review (roadmap):** a new roadmap item proposes making the release manager **consumer-facing** (`docs/roadmap/release-system-review.md`). *If* that's built, 123 is its distribution path (`init`/`sync`/`files[]`) and it needs the same consumer-awareness (operate on the *consumer's* completion docs, the C′ pattern). Not a 123 dependency now — flagged so it's on the radar if the release review schedules before/with 123.

## Cross-references
- `.kiro/specs/118-module-resolution-coherence/findings/runtime-ts-resolution-target-model.md` (the contract by class — esp. C/C′)
- `.kiro/specs/118-module-resolution-coherence/findings/consumer-runtime-ts-resolution-audit.md` (the 3 consumer-`.ts` sites + scoped-seam pattern)
- `.kiro/specs/118-module-resolution-coherence/completion/task-9.5.3-completion.md` (registerless bin + the `files[]` glob model)
- `.kiro/specs/123-consumer-distribution/inbound-from-124.md` (the component-token-loading coupling)
- `.kiro/steering/Rosetta-System-Architecture.md` § "Module-Resolution Contract (Spec 118)" (the served law)
