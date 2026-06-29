# Task 2 Summary: `id` Addressing Plane — Reader + Type + Resolver

**Date**: 2026-06-29
**Purpose**: Concise summary of parent task completion (spec-level)
**Organization**: spec-summary
**Scope**: 119-A-steering-relocation-serving-contract

## What Was Done

Landed the net-new Docs-MCP addressing plane: a frontmatter `id`/`idSource` reader + `slugifyTitle`, `DocumentMetadata.id`, the `idIndex`/`legacyPathIndex` maps with full index maintenance, the `LegacyPathManifest` type + loader, and `resolveRef` — the single chokepoint (`getDocumentContent`) all five path-taking tools funnel through. Resolution order: **id → indexed-key → legacy-fallback → DocumentNotResolved**, with one shared `normalizeRef` used by both the indexed-key and legacy probes.

## Why It Matters

This is the hard prerequisite (with Task 3) for any rename/relocation: it makes doc addressing location-independent so the 8 prompts' 60 legacy `.kiro/steering/…` paths keep resolving through the transition window via the fallback, while every doc is reachable by its stable `id`. Design Decision 1 fixed the resolver at one chokepoint — all five tools inherit id-resolution with zero per-tool change.

## Verified Outcome

- ✅ mcp-server `tsc` clean; full `npx jest` **31 suites / 554 tests / 0 failed** — both run twice, stable (baseline 520; +34 new).
- ✅ Four `resolveRef` outcomes unit-covered; `derived-h1` (the 14-doc no-`name:` path) + `none` slug paths covered explicitly.
- ✅ Index-maintenance invariant covered: clear-on-rescan, delete-branch prune (reverse id + dangling legacy), re-add repopulate, in-place id-change.
- ✅ Keyspace + guard-ordering invariants honored (relative indexed key only; `normalizeRef` never touches `..`; runs after `validatePath`).

## Honest Notes

- **Legacy re-seed obligation handed to Task 3.2:** a full re-scan / `rebuild_index` clears `legacyPathIndex` per the design's clear-both invariant, so the wiring MUST re-call `loadLegacyPathManifest` after every rebuild — documented in-code; spot-check when Task 3 lands.
- **In-place id-change prune added** beyond the design's literal delete-branch (covers a same-path `id:` rewrite with no delete event). Small, defensive, unit-covered — flagged because it's an addition.
- **Unaddressable docs** (no id/name/H1) get `id: ''` and are excluded from `idIndex`; Task 4's `idSource:'none'` worklist should surface them as explicit exceptions.

## Rebuild / Next

- Parser + indexer changed → a `rebuild_index` is needed once this lands (every indexed doc then carries a derived `id`; literal on-disk `id:` backfill is Task 4).
- **Not committed** — main loop re-runs suite + tsc, spot-checks the resolver, and commits.
