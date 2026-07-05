# Release Notes — v13.0.0

**Date**: 2026-07-05
**Type**: Major Release
**Specs**: 117 (Token-Index Integrity), 118 (Module-Resolution Coherence), 119-A (Steering Relocation), 121 (MCP Delivery-Layer Hardening), 124 (Component-Token Return Contract) + consumer patches (F-C2/F-C6)
**Previous**: v12.0.5

---

## Summary

This release makes DesignerPunk work **out of the box for consumers**. The three bundled MCP servers now find their data with zero configuration when installed from npm, the CLI runs compiled code under plain Node (no TypeScript loader tricks), package exports resolve real JavaScript with types, and the documentation corpus has a stable discovery tool (`find_docs`) with reliable section addressing.

It is a **major version bump** because three public surfaces changed shape: one docs-MCP tool was replaced, component-token definition files have a new loading contract, and the steering documentation moved to a new directory inside the package.

---

## ⚠️ Breaking Changes

### 1. `get_documentation_map` removed — use `find_docs`

The docs MCP no longer serves `get_documentation_map`. Its replacement, `find_docs`, is strictly more capable:

- `find_docs({ concept: "..." })` — concept/keyword discovery with a `matchConfidence` signal (`strong | partial | none`)
- `find_docs({ list: true })` — the "what exists" enumeration the old tool provided

**Action required:** update any MCP client config that references `get_documentation_map` — including `autoApprove` lists in `mcp.json` files. Fresh `npx designerpunk init` output is already correct; hand-maintained or vendored configs need the one-line rename.

### 2. Component-token files must **export** their definitions

`defineComponentTokens(...)` no longer registers tokens as a side effect of being imported. It **returns** a value-map that the loader harvests from your module's **exports**.

```ts
// v12 — worked even without export (side-effect registration)
defineComponentTokens('button', { ... });

// v13 — the result must be exported, or your tokens silently never load
export const buttonTokens = defineComponentTokens('button', { ... });
```

The authored API is otherwise unchanged. This closed a class of bugs where consumer-authored component tokens were silently dropped across module boundaries.

**Action required:** check your `*.tokens.ts` files export the `defineComponentTokens` result.

### 3. Steering documentation relocated to `governance/`

The ~80 non-identity steering docs moved from `.kiro/steering/` to a top-level `governance/` directory (both ship in the package). The docs MCP's default root is now `governance/`; the `MCP_STEERING_DIR` env var still overrides it, unchanged.

**Action required:** only if you reference steering docs by file path — repoint `.kiro/steering/<doc>` → `governance/<doc>`. MCP queries by `id` are unaffected (ids are stable across relocation, with legacy-path forwarding for old references).

### 4. Package exports serve compiled JavaScript

`@3fn/core/blend`, `@3fn/core/build`, and `@3fn/core/types` previously exported raw `.ts` source, which failed under many consumer configurations. They now resolve compiled `dist/` JavaScript with type declarations. If you deliberately imported raw TypeScript source from those paths, import from `@3fn/core/src/...` explicitly instead.

---

## Fixed

- **MCP servers no longer serve an empty index from `node_modules`.** All three servers now resolve their data roots package-relatively when no local data or env var exists — a hand-wired consumer gets the full docs corpus, component catalog, and token index with zero setup. Each server logs which data source won (env / project / package) to stderr at boot.
- **The CLI runs everywhere.** The `designerpunk` bin executes compiled output under plain Node — no global TypeScript loader, no dependence on hoisting luck.
- **Token-index integrity.** The committed token index is OKLCH-native and generated from the same resolution path as platform output, so it can no longer drift from what `dist/` serves (stale rgba values and an outdated theme-varying set were fixed).

## Improved

- `get_section` supports disambiguation (`parent`, stable `sectionId`) and returns `siblingHeadings`, so a heading shared by multiple sections is addressable and partial retrievals are visible.
- `get_token_details` returns the resolved-value triple (raw, resolved, platform accessors); `find_components` supports tokenized keyword discovery.
- Discovery responses carry an explicit confidence model (match / viability / usability) instead of unqualified results.
- 20 of 21 npm security advisories cleared (dependency updates, including the MCP SDK to 1.29.0).

---

## Upgrade Notes

1. `npm install @3fn/core@13` (public npm and GitHub Packages both carry it).
2. Rename `get_documentation_map` → `find_docs` in any MCP config you maintain by hand.
3. Ensure component-token files `export` their `defineComponentTokens` result.
4. Repoint any hard-coded `.kiro/steering/` paths to `governance/`.
5. Re-running `npx designerpunk init` in a scratch project is a quick way to see the current reference config shape.

---

*The machine-generated changelog (full internal task detail) lives alongside this file as `release-13.0.0.md` / `.internal.md` / `.json`.*
