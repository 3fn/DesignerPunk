# MCP/Browser Principled Exemption Boundary

**Status**: STAGED — awaiting Task-11 governance ballot (do not apply to steering directly)
**Date**: 2026-06-25
**Spec**: 118 — Module-Resolution Coherence
**Task**: 5.2 (boundary documentation, staged for Task-11 ballot)
**Author**: Lina

---

## Purpose of This Document

This is the staged exemption-boundary artifact for the Task-11 governance ballot. It documents:

1. **Which subsystems are exempt** from the runtime-resolution contract and why
2. **The paired boot/smoke guard** that makes the exemption a documented boundary rather than a silent carve-out
3. **The MCP servers' ts-node dev configs** as a documented principled exception per Resolved Decision 2

**This document does NOT modify any steering doc.** The steering form of this content rides the Task-11 ballot measure. See `tasks.md` Task 11 for the ballot-measure process.

---

## The Exemption: Bundled Subsystems

### Which subsystems are exempt

| Subsystem | Bundle artifact | Build command |
|-----------|----------------|---------------|
| Application MCP server | `dist/mcp/application-mcp.js` | `npm run build:mcp` (esbuild) |
| Docs MCP server | `dist/mcp/docs-mcp.js` | `npm run build:mcp` (esbuild) |
| Product MCP server | `dist/mcp/product-mcp.js` | `npm run build:mcp` (esbuild) |
| Browser bundle | `dist/browser/designerpunk.esm.js` (+ UMD/min) | `npm run build:browser` (esbuild) |

### Why they are exempt

The runtime-resolution contract governs **non-bundled runtime TS** — entry points that traverse Node's module resolver at runtime. Bundled subsystems are exempt because **bundling resolves imports at build time**:

- `npm run build:mcp` runs esbuild with `--bundle --platform=node --format=cjs` against each MCP server's entry point. esbuild resolves every `import`/`require` at build time and outputs a single self-contained CJS file. The output has no unresolved imports to traverse at runtime.
- `npm run build:browser` runs esbuild against `src/browser-entry.ts` and bundles all component code into a single ESM (and IIFE/UMD) file. Same principle.

At ship time, there is no runtime TS resolution for these subsystems. The exemption is therefore principled (it reflects a real architectural difference), not a carve-out for convenience.

**Design reference**: `design.md` § MCP/Browser Principled Exception; the architecture diagram at `design.md` § The target contract.

---

## The Paired Guard: Why the Exemption Is Not Silent

The exemption would be silent if there were no way to detect a broken bundle. To close that gap, **each exempt subsystem has a paired boot/smoke guard** (`tests/mcp-boot-smoke.test.ts`, `tests/browser-boot-smoke.test.ts`) wired into the consumer-guard CI lane (`.github/workflows/consumer-guard.yml`). The guards are described below.

### MCP boot/smoke guard (Task 5.1a)

**Mechanism**: subprocess spawn of each bundled MCP server (`dist/mcp/*.js`). Each server auto-starts under `require.main === module` and prints a boot sentinel to stderr on successful startup. The guard waits for the sentinel; if the process exits or throws before reaching it, the guard fails.

**Sentinel values** (verified from source):

| Server | Sentinel (substring match on stderr) | Source |
|--------|--------------------------------------|--------|
| application-mcp.js | `Server running on stdio` | `application-mcp-server/src/index.ts:365` |
| docs-mcp.js | `Server started` | `mcp-server/src/index.ts:321` |
| product-mcp.js | `Server running on stdio` | `product-mcp-server/src/index.ts:197` |

**What "reaching the sentinel" proves**: the server loaded all its bundled dependencies, initialized its index/data structures, and connected to stdio transport without a module-resolution error. Any missing dependency baked into the bundle at build time would throw before this point.

**Pattern reuse**: the sentinel-on-stderr wait pattern is from `tests/consumer-integration.test.ts:137-148` (the established subprocess guard infra for this spec).

**Test file**: `tests/mcp-boot-smoke.test.ts`

**CI attachment**: runs in `.github/workflows/consumer-guard.yml` after the `build:mcp` step (build-before-guard sequencing). Skips cleanly when `dist/mcp/` is absent locally (a developer who hasn't built sees a clear skip message, not a misleading failure).

### Browser bundle boot/smoke guard (Task 5.1b)

**Mechanism**: a jest-jsdom test that loads the ESM bundle content via `fs.readFileSync` and evaluates it in the jsdom window context (`window.eval`). jsdom provides `customElements`, `HTMLElement`, and the DOM APIs the bundle requires. The bundle calls `customElements.define()` for each component at module top-level; after the eval, the guard asserts `customElements.get('button-cta')` is defined.

**Why jsdom and not bare Node**: the bundle calls `customElements.define()` (and `HTMLElement` subclassing) at module top-level. In bare Node without jsdom, this throws "HTMLElement is not defined" — a false signal that looks like a resolution error but is actually a missing DOM API. jsdom is the correct execution context. (Verified 2026-06-25: `node --input-type=module` on the bundle confirms the "HTMLElement is not defined" behavior.)

**Why `window.eval()` and not `import()`**: the ESM bundle has native ES module `export { ... }` syntax at the end, which is not valid in non-module eval contexts and requires jest's experimental VM modules mode (a larger configuration footprint than this guard warrants). The `export {}` block is the only ES-module-specific syntax; all observable side effects (`customElements.define()` calls) happen before it. `window.eval()` strips the export block and runs the rest — the closest to "execute the bundle in a browser page" available in a jest-jsdom environment.

**What this guard catches**: any module-resolution error baked into the bundle at build time (surfaces as a thrown error during eval), missing bundled dependencies, and failures in the `customElements.define()` calls themselves.

**Confirmed sentinel** (verified 2026-06-25):
- `customElements.get('button-cta')` returns the `ButtonCTA` class after the bundle executes
- Source: `src/components/core/Button-CTA/platforms/web/ButtonCTA.web.ts:691`
- The browser bundle defines 35 custom elements (verified by grep count on built bundle)

**Test file**: `tests/browser-boot-smoke.test.ts`

**CI attachment**: runs in `.github/workflows/consumer-guard.yml` after the `build:browser` step (build-before-guard sequencing). Skips cleanly (with `console.warn`) when `dist/browser/designerpunk.esm.js` is absent locally.

---

## MCP Servers' ts-node Dev Configs: Documented Principled Exception

The three MCP servers each carry their own TypeScript execution configuration for **development use** (running the server from source, not from the built bundle). These configs use ts-node (directly or via a project reference) and are independent of the `designerpunk` CLI's runtime mechanism.

**This is a documented principled exception per Resolved Decision 2** — NOT a reconciliation target and NOT a gap in the module-resolution contract.

**Why it's a principled exception (not a gap)**:

1. The MCP servers' dev configs serve the servers' own development workflow (e.g., `ts-node application-mcp-server/src/index.ts` for local development). They do not load consumer configs, do not participate in the `loadConfig` path, and do not traverse the runtime-resolution contract's governed surfaces.

2. At ship time, the MCP servers run as **built bundles** (`dist/mcp/*.js`) — they do not use their dev ts-node configs in production. The runtime-resolution contract governs the shipped product.

3. The boot/smoke guard (Task 5.1a) exercises the **bundled** form (the shipped artifact), pairing the exemption with a real boot test. The dev configs' ts-node usage is not a path the guard needs to test.

**The retired "reconcile" framing**: an earlier discussion framed these ts-node dev configs as needing "reconciliation" with the module-resolution contract. Resolved Decision 2 closed this question: these configs are categorically different (dev tooling for the MCP servers' own build workflow, not runtime consumer-facing resolution). The word "reconcile" is deliberately not used here. The decision is final and this document records it, not reopens it.

**What this means for future work**: if a future increment changes the MCP servers' dev-time execution mechanism (e.g., as part of Increment 3a's runtime unification), the dev configs would be updated then — but that is Increment 3a's scope, not a Task-5 obligation.

---

## Build-Before-Guard Sequencing

Both guards depend on built bundles. The CI lane (`.github/workflows/consumer-guard.yml`) sequences:

```
npm ci
  → npm run lint           (Task 4.2)
  → jest DynamicImportGuard (Task 4.1)
  → npm run test:consumer   (Tasks 3.1 + Spec 106 R8)
  → npm run build:mcp       ← build:mcp before MCP guard
  → MCP boot/smoke guard    (Task 5.1a)
  → npm run build:browser   ← build:browser before browser guard
  → browser boot/smoke guard (Task 5.1b)
```

**Why scoped builds and not `npm run build`**: `npm run build` includes `tsc --skipLibCheck` + `build:validate` (ts-node build validation) — a heavier step that is not needed for the bundle guards. The scoped builds produce exactly the artifacts the guards need.

**Local no-build behavior**: both guard test files skip cleanly when their target `dist/` directories don't exist. The MCP guard uses a `bundlesExist` conditional to skip the entire describe block; the browser guard exits the test early with `console.warn`. Neither returns a test failure — they return a clear skip message. This keeps `npm test` (which runs `src/` roots only, never `tests/`) unaffected, and allows targeted guard runs (`npx jest --roots=tests --testMatch=...`) to skip cleanly without misleading errors.

---

## Cross-References

- `design.md` § MCP/Browser Principled Exception (full design)
- `design.md` § Architecture (diagram showing exempt subsystems)
- `tasks.md` Task 5 (this task's acceptance criteria)
- `tasks.md` Task 11 (the governance ballot where the steering form of this content is proposed)
- `tests/mcp-boot-smoke.test.ts` (5.1a guard implementation)
- `tests/browser-boot-smoke.test.ts` (5.1b guard implementation)
- `.github/workflows/consumer-guard.yml` (CI lane with build-before-guard sequencing)

---

*Staged artifact for the Task-11 governance ballot. Content is not applied to steering until Peter approves the ballot. The exemption boundary and guard implementations described here ARE active (the test files and workflow exist); only the steering-level codification is deferred.*
