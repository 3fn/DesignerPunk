# Task 5.4 Completion: CLI Validation in Fresh Repo

**Date**: 2026-04-08
**Spec**: 095 - Ecosystem Package Assembly
**Task**: 5.4 - CLI validation in fresh repo
**Type**: Implementation
**Validation Tier**: 2 - Standard
**Agent**: Lina

---

## Summary

Validated CLI commands from a fresh repo with `@3fn/core@10.2.5` installed from GitHub Packages.

## Results

| Command | Status | Notes |
|---------|--------|-------|
| `npx designerpunk generate` | ✅ Fully validated | 3 platforms generated (CSS, Swift, Kotlin), 0 failures |
| `npx designerpunk mcp:app` | ⚠️ Bundle validated | Bundle loads, all dependencies resolve. Full query validation deferred — stdio protocol prevents automated CLI testing. Tracked in deferred items. |
| `npx designerpunk mcp:docs` | ⚠️ Same as mcp:app | Same limitation. |

## Issues Found and Resolved During Validation

Three issues surfaced during fresh-repo testing, all resolved by Ada:

1. **CLI module resolution** — compiled CLI couldn't import TypeScript pipeline modules. Fix: `bin/designerpunk.js` wrapper registers `tsx` then loads TypeScript source.
2. **MCP path resolution** — CLI used hardcoded `@designerpunk/core` package name in `require.resolve`. Fix: `__dirname`-relative resolution.
3. **MCP server dependencies** — MCP servers' dependencies (`js-yaml`, etc.) not installed in product context. Fix: pre-bundled with esbuild to `dist/mcp/`.

## Deferred

MCP server end-to-end query validation in product context — tracked in `docs/roadmap/m0a-deferred-items.md`. Will be validated during Phase 1→2 transition when Sparky connects from the marketing site repo.

## Requirements Traced

- R5 AC 1: `npx designerpunk generate` works from product repo ✅
- R5 AC 2-3: MCP servers start (bundle loads, no module errors) ✅
- R5 AC 4: Connection details printed ✅
- R5 AC 5: Zero-config defaults work ✅
- R9 AC 3: Generate produces themed output ✅
- R9 AC 4: MCP servers start (partial — full query validation deferred) ⚠️
