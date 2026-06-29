# Task 3 Summary: Legacy-Path Forwarding Manifest (Producer + Frozen Artifact)

**Date**: 2026-06-29
**Purpose**: Concise summary of parent task completion (spec-level)
**Organization**: spec-summary
**Scope**: 119-A-steering-relocation-serving-contract

## What Was Done

Built the legacy-path forwarding manifest producer + froze its artifact + wired the re-seed. The producer (`scripts/generate-legacy-path-manifest.ts` over the testable core `mcp-server/src/legacy-path/generate-manifest.ts`) takes two inputs — the spaces-tolerant grep-extract of `.kiro/steering/…md` refs from the 8 prompts AND the literal Req-3 rename map (10 space-bearing originals) — derives each target's `id` via the resolver's own `extractFrontmatterInfo`, de-dupes, asserts every `legacyPath` is `..`-free (throws otherwise), and emits `LegacyPathManifest`. The frozen JSON lives at `mcp-server/src/legacy-path/legacy-path-manifest.json`. The re-seed is wired at the **tail of `DocumentIndexer.indexDirectory`** (the chokepoint every index-build path funnels through), so legacy refs keep resolving after every full re-scan / `rebuild_index`.

## Why It Matters

This is the second hard prerequisite (with the Task 2 resolver) for any rename/relocation. After Tasks 5/6 the original `.kiro/steering/…` strings vanish from disk and cannot be recovered — the frozen JSON is the only record. It is a one-way gate: it MUST be frozen + checked in before Tasks 5/6. Without the re-seed wiring, legacy refs would silently stop resolving after the first `rebuild_index` (the exact regression Task 2 flagged).

## Verified Outcome

- ✅ Live distinct prompt refs (grep-extracted): **28** (57 occurrences) — matches Task 1, NOT the spec's 60. After de-dupe + skipping 3 template placeholders + folding the 10 rename keys (2 overlap): **33 manifest entries**.
- ✅ Every emitted `legacyPath` is `..`-free (producer asserts; unit-covered both directions).
- ✅ Re-seed proof: a space-bearing original AND a normal prompt ref BOTH resolve via `legacy-fallback` after the initial index AND after `rebuildIndex` (integration test).
- ✅ mcp-server `tsc` clean; `npx jest --runInBand` **33 suites / 569 tests / 0 failed** (+15 new).
- ✅ Root `tsc` clean; root `npm test` **377 suites / 8990 tests / 0 failed**.

## Honest Notes

- **33 entries, not 60** — the spec figure is stale; the math: 28 distinct prompt refs − 3 template placeholders = 25 real, + 10 rename keys − 2 overlap = 33.
- **Template placeholders** (`{Name}` / `{FamilyName}`) are skipped (no target doc) — the Task 11 gate must apply the same filter when enumerating raw prompt strings.
- **Re-seed wired at one place** (`indexDirectory` tail) rather than three call sites — more robust, but a small choice beyond the literal Task 2 note; spot-check no future build path bypasses `indexDirectory`.
- **Derived ids can differ from the filename slug** (id comes from frontmatter `name:`) — correct, and how the resolver indexes.

## Next

- **Not committed** — main loop re-runs both suites + tsc, spot-checks `legacy-path-manifest.json` + the re-seed wiring, and commits on `spec-119a-relocation`.
- This frozen artifact unblocks Tasks 5 (rename) and 6 (relocate).
