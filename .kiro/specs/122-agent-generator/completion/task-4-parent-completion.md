# Task 4 Completion — Registry generator (C5): declaration-keyed, index-agnostic

**Spec**: 122 — Agent Generator
**Unit**: U1 (Substrate) — parent inside a multi-parent unit; **no PR at this completion** (U1's PR opens at Task 8).
**Type**: Parent
**Date**: 2026-07-09
**Branch**: `task/122-substrate`

---

## What was built

### 4.1 — MCP introspection + registry emitter (Implementation)
- **`tools/agent-generator/registry.ts`**: a fixed three-server table (repo-relative entries mirroring `.mcp.json`, machine-independent; env computed from `repoRoot` at spawn time); `introspectServer` (MCP SDK stdio: `initialize` + `listTools()`, session closed after; **throws loud naming server + entry on any failure — no cached-registry fallback exists**, design § Error Handling); `hashInputSchema` (`sha256:` + hex over `canonicalStringify(inputSchema ?? null)` — reuses the P1 backbone); **`assembleRegistry` as a pure function** (servers + tools sorted by name, no timestamps) separated from the introspection I/O so determinism is unit-testable without spawning; `writeRegistry` → `canonical/registry/tool-registry.json`; `if (require.main === module)` main block (importing never introspects — the pattern PR #35 established).
- **`canonical/registry/tool-registry.json`** (generated, committed): `designerpunk-application` 21 tools · `designerpunk-docs` 8 tools · `designerpunk-product` 14 tools.
- **Tests** (`registry.test.ts`, functional lane — no real spawning in Jest): assembly sort-determinism (differently-ordered input → byte-identical output), `inputSchemaHash` stability under key reordering, loud-failure propagation (a rejecting introspector never writes).

## The two design proofs, recorded

1. **Index-agnostic (Req 7 AC2)**: this repo's product index is EMPTY (the server logs "Product directory not found … starting with empty data") — yet `tools/list` declared all **14** product tools and they drive the registry identically (`find_principles`, `find_screens`, `find_templates`, …). Declaration-keying is proven on the live degenerate case, not asserted.
2. **Determinism (P1 / Req 7 AC3 precondition)**: the real generation was run twice; both runs produced **byte-identical** files (sha256-compared) — the property the C6 diff-guard will key on. (The registry is new/untracked, so this was verified by direct double-run byte comparison — stronger than a git diff at this state.)

## Verification (main-loop, Fable 5)

- **Truth-check against independent live data**: the registry's docs-server tool list matches exactly the 8 tools I introspected directly from the running docs MCP during Task 2's resolver smoke (`find_docs`, `get_document_full`, `get_document_summary`, `get_index_health`, `get_section`, `list_cross_references`, `rebuild_index`, `validate_metadata`); the retired `get_documentation_map` is correctly absent (Req 3 AC3 consistency).
- **Placement**: all three files on `task/122-substrate`; `dist/mcp/product-mcp.js` was rebuilt fresh pre-introspection (esbuild; `dist/` is gitignored so the rebuild leaves no git-visible trace).
- **Code read**: header/server-table/schema/error-contract read in the main loop — faithful to design C5 (schema exactly; no authored input surface exists).
- **Unit lane**: `npm run test:agent-generator` → **129/129** (11 suites). **Typecheck**: clean. **Parent validation**: full `npm test` → **8987/8987** — zero regressions.

## Delegated-tier capture (per Task-Completion-Protocol)
- Planned `**Agent**: Thurgood`. Executed by a **Sonnet subagent** (settled-design implementation) with **main-loop (Fable 5) verification** incl. an independent truth-check of the emitted registry against live session data. Plan held; tier chosen consciously.

## Open items (carried forward — NOT blocking Task 4)
1. **The registry becomes a C6 guarded surface at Task 6** (diff-guard); its 125 tool-boot-smoke consumption is the 125-A Task 9 handback (deferred there "once 122's registry exists" — it now exists).
2. **`ResolveContext.registry` wiring** (pipeline.ts) lands when a consumer needs it (Task 5 adapters / Task 6 checks) — additive, no spine change.
