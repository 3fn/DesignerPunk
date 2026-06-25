# Task 5 Completion: MCP/Browser Principled Exception + Paired Boot/Smoke Guard

**Date**: 2026-06-25
**Task**: 5 — MCP/Browser Principled Exception + Paired Boot/Smoke Guard (Increment 1, direction-agnostic, R12 single owner)
**Type**: Guard
**Status**: Complete
**Validation Tier**: Tier 2 (Standard)
**Agent**: Lina (boot/smoke guards + boundary doc) + main-loop (verification)
**Covers subtasks**: 5.1 (boot/smoke guard), 5.2 (exemption-boundary documentation).

---

## Outcome

The bundled-subsystem exemption (the 3 esbuild-bundled MCP servers + the browser bundle are exempt from the runtime-resolution contract because bundling resolves imports at build time) is now **paired with a boot/smoke guard** so the exemption is a coherent boundary, not a silent corner. R12 owns this guard (R10 AC2b references it). This completes the direction-agnostic guard set.

## Artifacts Created / Changed

- `tests/mcp-boot-smoke.test.ts` — 5.1a: spawns each bundled MCP server and waits for its stderr ready sentinel.
- `tests/browser-boot-smoke.test.ts` — 5.1b: executes the browser ESM bundle in jsdom and asserts custom-element registration.
- `.github/workflows/consumer-guard.yml` — added `build:mcp` + `build:browser` steps and the two guard steps; timeout 10→15 min.
- `.kiro/specs/118-module-resolution-coherence/findings/mcp-browser-exemption-boundary.md` — 5.2: staged boundary doc for the Task-11 ballot.

## 5.1a — MCP boot/smoke

Spawns each bundled MCP server (`dist/mcp/{application-mcp,docs-mcp,product-mcp}.js`, which auto-start under `require.main === module`) and waits for its **stderr ready sentinel**, failing if the process exits/throws before it (= a boot-time module-resolution error). Per-server sentinels (verified genuine — each prints *after* `server.connect()` succeeds):
- application-mcp → `running on stdio`
- docs-mcp → `Server started` (`mcp-server/src/index.ts:321`, after `connect()` at :318)
- product-mcp → `running on stdio`

Reuses the `waitForSentinel`-on-stderr pattern from `tests/consumer-integration.test.ts`. **Bite-tested:** a deliberately-broken `application-mcp.js` → that server fails (`exited with code 1 before emitting sentinel`) while the other two still pass (per-server isolation).

## 5.1b — Browser boot/smoke

A jest-**jsdom** test that loads `dist/browser/designerpunk.esm.js` and asserts a custom element is defined (`customElements.get('button-cta')`). **Bite-tested:** a broken bundle → fails; bare Node (no DOM) → `HTMLElement is not defined` (confirms jsdom is required).

*Mechanism note (Lina, flagged):* the test uses `readFileSync` + `window.eval()` (stripping the trailing side-effect-free `export {…}` block) rather than `import()`, because the native-ESM bundle can't be dynamically imported in CJS-mode jest without experimental VM modules — a larger footprint than this guard warrants. The detection goal is identical: the bundle code runs in a DOM context and any baked-in resolution error throws at eval time. Documented in the test + the boundary doc.

## Build dependency & local behavior

The guards read **built** bundles, so they must run after a build:
- **CI:** `consumer-guard.yml` runs `build:mcp` + `build:browser` (scoped esbuild) before the guard steps.
- **Local / no-build:** the MCP guard `it.skip`s if `dist/mcp/` is absent; the browser guard warns + passes if the bundle is absent (pre-condition miss, not a failure). Both live in `tests/`, which is **not** in `npm test`'s roots (`src/` + `product-mcp-server/src/`), so plain `npm test` is unaffected.

*Wiring note (Lina, flagged):* the builds run inside the guard lane rather than a separate CI job — acceptable for Spec 118's minimal guard home (guards read what CI just built, not stale artifacts).

## 5.2 — Staged exemption-boundary documentation

`findings/mcp-browser-exemption-boundary.md` documents: which subsystems are exempt and why (esbuild resolves at build time); the paired boot/smoke guards (mechanisms, sentinels, CI attachment); the MCP servers' ts-node dev configs as a **documented principled exception per Resolved Decision 2** (NOT "reconciled" — retired wording); build-before-guard sequencing; local skip behavior. Explicitly **STAGED** — does not edit steering; the steering form rides the **Task-11 ballot**.

## Validation (Tier 2: Standard)

- ✅ MCP + browser guards **pass** with built bundles (verified in main loop: 2 suites / 4 tests green).
- ✅ docs-mcp `Server started` sentinel confirmed genuine (prints after `connect()`).
- ✅ Bite checks confirm both guards FAIL on a broken bundle.
- ✅ `npm run build` exit 0; `git diff token-index/` empty; full `npm test` 374 suites / 8972 green (unaffected — guards are in `tests/`).

### Requirements Compliance
- ✅ **R12 AC1** — runtime-resolution contract governs non-bundled TS; the 3 esbuild MCP servers + the browser bundle are exempt (bundling resolves at build time).
- ✅ **R12 AC2** — exemption paired with a boot/smoke guard; **R12 is the single owner** (R10 AC2b references it).
- ✅ **R12 AC3** — exemption documented as a coherent boundary (staged for the Task-11 ballot).
- ✅ **R12 AC4** — MCP ts-node dev configs carried as a documented principled exception per Resolved Decision 2.

## Related Documentation
- [findings/mcp-browser-exemption-boundary.md](../findings/mcp-browser-exemption-boundary.md) (staged → Task 11)
- [Task 5 Summary](../../../../docs/specs/118-module-resolution-coherence/task-5-summary.md)
