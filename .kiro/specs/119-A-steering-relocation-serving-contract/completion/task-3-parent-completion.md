# Task 3 Completion: Legacy-Path Forwarding Manifest (Producer + Frozen Artifact)

**Date**: 2026-06-29
**Task**: 3. Legacy-Path Forwarding Manifest (Producer + Frozen Artifact)
**Type**: Parent
**Status**: Complete (pending main-loop re-verification + commit)
**Agent**: Thurgood / Docs-MCP infra
**Validation**: Tier 3 — Comprehensive

> The build-time artifact that seeds the resolver's `legacyPathIndex` (Task 2). With the Task 2 resolver, it is the second hard prerequisite that MUST be live/frozen BEFORE rename (Task 5) / relocation (Task 6) — the original `.kiro/steering/…` strings vanish after the move. **Not committed** — the main loop reviews, re-verifies, and commits on the branch.

---

## Artifacts Created / Modified

**Created:**
- `mcp-server/src/legacy-path/generate-manifest.ts` — **producer core** (testable): `buildLegacyPathManifest`, `extractSteeringRefs` (spaces-tolerant), `PROMPT_FILES`, `REQ3_RENAME_MAP`. Two inputs, de-dupe, template-placeholder skip, `..`-free assertion (throws).
- `mcp-server/src/legacy-path/index.ts` — **frozen-artifact loader**: `FROZEN_MANIFEST_PATH`, `loadFrozenManifest`, `seedLegacyPathsFromFrozenManifest` (structurally typed to avoid an import cycle).
- `mcp-server/src/legacy-path/legacy-path-manifest.json` — **THE FROZEN ARTIFACT** (one-way gate; see below).
- `scripts/generate-legacy-path-manifest.ts` — thin `tsx` CLI wrapper over the producer core (writes + reports).
- `mcp-server/src/legacy-path/__tests__/generate-manifest.test.ts` — producer unit tests.
- `mcp-server/src/legacy-path/__tests__/reseed-integration.test.ts` — re-seed-survives-rebuild integration.

**Modified:**
- `mcp-server/src/indexer/DocumentIndexer.ts` — wired the re-seed: `seedLegacyPaths()` (private) called at the **tail of `indexDirectory`** (the single chokepoint every index-build path funnels through); `setLegacyManifestPath()` (test override); import of `seedLegacyPathsFromFrozenManifest`.

---

## 3.1 — The producer

**Two inputs (design § Data Models → "Producer"), each row paired to its target doc's `id`:**

1. **Grep-extract** the `.kiro/steering/…md` refs from the 8 `.kiro/agents/*-prompt.md` files. `extractSteeringRefs` is spaces-tolerant: a ref runs from `.kiro/steering/` to the next string-literal delimiter (`"`, backtick, `)`, `<`, `>`, newline) and must end in `.md`, so a space-bearing filename is captured WHOLE (bounded by the closing quote, not the space). Bare-directory mentions (`.kiro/steering/` with no `…md`) are excluded.
2. The **literal Req-3 rename map** (`REQ3_RENAME_MAP`, the 10 space-bearing originals → kebab targets) so each ORIGINAL space-bearing `.kiro/steering/…` string is a key too — even the identity docs no prompt references.

**`id` derivation reuses the resolver's exactly** — `extractFrontmatterInfo` (explicit `id:` → slug of `name:` → slug of H1). The producer does NOT reinvent slug derivation. For a doc with no on-disk `id:` yet (Task 4 backfill hasn't run), it derives the same slug the resolver would.

**Emits** `LegacyPathManifest { generatedAt, transitionOnly: true, entries: [{ legacyPath, id }] }`, entries sorted + de-duped on `legacyPath`.

**`..`-free assertion:** the producer iterates every emitted key and **throws** if any contains `..` (the guard-ordering invariant — `QueryEngine.validatePath` rejects `..` before `resolveRef` runs, so a `..`-bearing key could never be reached). Unit-covered both ways (natural keys are `..`-free; an injected `..` ref throws).

**Skipped (reported, NOT emitted):** a ref whose target is a template placeholder (`{Name}` / `{FamilyName}`) or resolves to no on-disk doc. Emitting a bogus `id` would seed a dangling `legacyPathIndex` entry. The 3 template refs in the live prompts are skipped.

## 3.2 — Generate + freeze + wire the loader

**Frozen artifact** generated against the current pre-rename/pre-relocation tree and checked in at `mcp-server/src/legacy-path/legacy-path-manifest.json`. **This is a one-way gate:** after Tasks 5/6 the original `.kiro/steering/…` strings no longer exist on disk and cannot be recovered — the frozen JSON is the only record. It MUST exist before Tasks 5/6 begin.

**Re-seed wiring (honors the Task 2 obligation).** `indexDirectory` clears `legacyPathIndex` on every full re-scan, and `rebuildIndex` + the StalenessGate rebuild both go through `indexDirectory`. Rather than wire the seed at each of the three call sites (startup, StalenessGate `onRebuild`, `rebuild_index`), the seed is called **once at the tail of `indexDirectory`** — after all files are indexed (so `idIndex` is fully populated, which `loadLegacyPathManifest` needs to resolve each entry's target id to an indexed key). Every index-build path funnels through `indexDirectory`, so the re-seed fires on the initial index AND on every rebuild. No-op when the frozen artifact is absent (correct degraded behavior — resolver simply has no legacy fallback).

---

## (b) Live prompt-ref count + manifest entry count

- **Live distinct prompt refs (grep-extracted at freeze time): 28** (57 total occurrences: ada 13, leonardo 1, lina 20, thurgood 23; data/kenya/sparky/stacy 0). This matches the Task 1 live audit (57 `.md` refs / 28 distinct), NOT the spec's recorded 60. The keyspace is keyed off the live grep, not hardcoded.
- Of the 28 distinct prompt refs, **3 are template placeholders** (`Component-Family-{FamilyName}.md`, `Component-Family-{Name}.md`, `Token-Family-{Name}.md`) → skipped (no target doc). **25 real prompt-ref docs** remain.
- Plus the **10 Req-3 rename keys**; **2 overlap** with prompt refs (`Completion Documentation Guide.md`, `Cross-Platform vs Platform-Specific Decision Framework.md`).
- **Total manifest entries after de-dupe: 33** (25 real prompt-ref docs + 10 rename keys − 2 overlap).

## (c) `..`-free confirmation

Every emitted `legacyPath` is `..`-free. The producer asserts it (throws otherwise); the unit test confirms none of the 33 natural keys contain `..` and that an injected `..` ref throws. The CLI reports `..-free assertion: PASSED`.

## (d) Re-seed wiring + before/after-rebuild proof

- **Where:** `DocumentIndexer.indexDirectory` tail → `seedLegacyPaths()` → `seedLegacyPathsFromFrozenManifest(this, …)` → `loadLegacyPathManifest`.
- **Proof (`reseed-integration.test.ts`):** with the indexer pointed at a fixture manifest, BOTH a space-bearing original (`.kiro/steering/Cross-Platform vs Platform-Specific Decision Framework.md`) AND a normal prompt ref (`.kiro/steering/Token-Governance.md`) resolve via `strategy: 'legacy-fallback'` after the initial index; then `rebuildIndex()` is called and BOTH STILL resolve via `legacy-fallback` (proving the re-seed fires on rebuild, not just startup). A third case confirms the legacy ref resolves through `getDocumentFull` (the tool chokepoint) post-rebuild.

---

## (e) Validation (Tier 3: Comprehensive) — run by me

- ✅ **mcp-server** `tsc --noEmit` clean (exit 0).
- ✅ **mcp-server** `npx jest --runInBand`: **33 suites / 569 tests / 0 failed** (baseline after Task 2: 554; +15 new). The known pre-existing parallel-only `test-fixtures` teardown flake did not recur (serial run, per the brief).
- ✅ **Root** `tsc --noEmit` clean (exit 0).
- ✅ **Root** `npm test`: **377 suites / 8990 tests / 0 failed**.
- ✅ Producer unit tests cover: both input sources represented, de-dupe (multi-prompt + rename overlap), `..`-free assertion (both directions), template-placeholder skip, missing-file skip, spaces-tolerant extraction, deterministic clock.

---

## Requirements Compliance

- ✅ Req 2.3 — manifest keyed on the original pre-rename/pre-relocation `.kiro/steering/…` strings, covering the live prompt refs AND the 10 renamed space-bearing files, each paired to its target `id`; `transitionOnly: true`; `..`-free.
- ✅ Req 4.5 — frozen before rename/relocate (one-way gate), supporting the rollback/idempotency model (resolver + fallback live before the move).

---

## Honest Notes / Re-verify in the main loop

1. **Count is 33, not 60.** The spec's "60 prompt refs" is stale; the live tree yields 57 occurrences / 28 distinct / 25 real prompt-ref docs (Task 1 already flagged this). Manifest = 33 entries. If you expected a count near 60, the gap is (a) the 60→57 counting-convention drift + (b) de-dup to 28 distinct + (c) −3 template placeholders + the +10/−2 rename-key math. Worth a spot-check of `legacy-path-manifest.json`.
2. **Template placeholders are deliberately excluded.** `Component-Family-{Name}.md` etc. have no target doc. They are reported as `skipped`, not emitted. The Task 11 gate's per-reference axis must NOT expect these 3 to resolve (they are substitution patterns, not refs); if the gate enumerates raw prompt strings it should apply the same placeholder filter.
3. **Re-seed wired at `indexDirectory` tail (one place), not three call sites.** This is more robust than wiring each caller, but it is a (small) design choice beyond the literal Task 2 note ("call after indexDirectory/rebuildIndex"). Calling at the tail satisfies that for all callers. Spot-check that no future index-build path bypasses `indexDirectory`.
4. **Derived ids can differ from the filename slug.** E.g. `Component-Templates.md` → `id: component-family-templates`, `Component-MCP-Document-Template.md` → `mcp-component-family-document-template`, `00-Steering…` → `steering-documentation-directional-priorities` (numeric prefix stripped). This is correct — the id derives from frontmatter `name:`, which is what the resolver indexes by. The legacy path forwards to the indexed doc regardless of filename.
5. **Frozen `generatedAt` timestamp** is a real wall-clock value in the checked-in JSON. If the main loop regenerates, the timestamp changes (only field that does). The entries are deterministic/sorted.

## Related Documentation

- [Task 3 Summary](../../../../docs/specs/119-A-steering-relocation-serving-contract/task-3-summary.md)
