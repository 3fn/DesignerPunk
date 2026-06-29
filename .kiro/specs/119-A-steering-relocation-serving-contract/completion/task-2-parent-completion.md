# Task 2 Completion: Frontmatter `id` Addressing Plane — Reader + Type + Resolver

**Date**: 2026-06-29
**Task**: 2. Frontmatter `id` Addressing Plane: Reader + Type + Resolver
**Type**: Parent
**Status**: Complete (pending main-loop re-verification + commit)
**Agent**: Thurgood / Docs-MCP infra
**Validation**: Tier 3 — Comprehensive

> Net-new resolver on the single chokepoint all five path-taking Docs-MCP tools funnel through (`getDocumentContent`). Hard prerequisite (with Task 3) for any rename/relocation. **Not committed** — the main loop reviews, re-verifies, and commits.

---

## Artifacts Modified

- `mcp-server/src/indexer/frontmatter-parser.ts` — `slugifyTitle`; `FrontmatterInfo.id?` + `idSource`; `id`/`idSource` derivation in `extractFrontmatterInfo` (explicit → name-slug → H1-slug → none).
- `mcp-server/src/models/DocumentationMap.ts` — `DocumentMetadata.id: string` (required), documented as the indexed relative key sibling.
- `mcp-server/src/models/LegacyPathManifest.ts` — **NEW** `LegacyPathManifest` type (Data Models shape); exported via `models/index.ts`. (Artifact JSON + producer are Task 3.)
- `mcp-server/src/models/index.ts` — re-export `LegacyPathManifest`.
- `mcp-server/src/indexer/DocumentIndexer.ts` — `ResolutionStrategy` + `ResolvedRef` types; `idIndex` + `legacyPathIndex` maps; index maintenance in `indexDirectory` (clear) + `reindexFile` (delete-branch prune, re-add repopulate) + `indexFile` (populate + in-place-id-change prune); `loadLegacyPathManifest`; `resolveRef`; `normalizeRef`; `documentNotResolved`; `getDocumentContent` routed through `resolveRef`.

## Tests

- `mcp-server/src/indexer/__tests__/frontmatter-parser.test.ts` — `slugifyTitle` (incl. the 10 space-bearing titles + empty-slug edge); `id`/`idSource` for `frontmatter` / `derived-name` / `derived-h1` (the 14-doc no-`name:` path) / `none` (incl. slug-collapses-to-empty → none, not `id:''`).
- `mcp-server/src/indexer/__tests__/DocumentIndexer.resolver.test.ts` — **NEW**: the four resolveRef outcomes; normalizeRef edge cases (`./`, trailing slash, OS backslashes, doubled slash, renamed space-bearing legacy form) shared across strategy 2 + 3; chokepoint routing via `getDocumentFull`; `loadLegacyPathManifest` skip/idempotency; full index-maintenance invariant (clear-on-rescan, legacy re-seed obligation, delete-branch prune of reverse id + dangling legacy, re-add repopulate, in-place id-change).
- `mcp-server/src/indexer/__tests__/DocumentIndexer.test.ts` — added a `doc.id` assertion to the existing metadata test (id populated during `indexFile`).
- `mcp-server/src/query/__tests__/find-docs-rubric.test.ts` — fixture builder gains a default `id` (now-required field).

---

## Implementation Details

### 2.1 — `id`/`idSource` reader + `slugifyTitle`
`slugifyTitle` implements Component 1 exactly: lowercase → spaces/underscores to `-` → strip non-`[a-z0-9-]` → collapse repeated `-` → trim leading/trailing `-`. `extractFrontmatterInfo` resolves `id` as: explicit `id:` (trimmed) → slug of `name:` → slug of first H1 → `undefined`/`none`. A slug that collapses to empty is treated as no usable id (→ `none`), never `id: ''`. `idSource` records the provenance for the Task 4 guard/codemod. The `derived-h1` and `none` paths are unit-covered explicitly (the Task 1 finding: 14 docs lack a `name:` field, 6 of them identity docs — the H1 fallback is exercised more than the design assumed).

### 2.2 — `DocumentMetadata.id`
Added `id: string` (required). Populated in `indexFile` from the parser (`frontmatter.id ?? ''`). `path` stays the indexed relative key — unchanged. The empty-string default is only for a genuinely unaddressable doc (no `id:`, `name:`, or H1); such docs are not added to `idIndex`.

### 2.3 — `idIndex` + `legacyPathIndex` with full index maintenance
- **Build** (`indexFile`): `idIndex[id] = indexedKey`; both maps store the same key `documentContent` is keyed on (`path.join(dirPath, entry.name)`), never an absolute path. `legacyPathIndex` is NOT derived from the tree (originals vanish post-relocation) — it is seeded via `loadLegacyPathManifest`.
- **Clear** (`indexDirectory`): both `idIndex` and `legacyPathIndex` cleared alongside `documentMap`/`documentContent` (design-verified `:69-70`). Because a full re-scan (incl. `rebuildIndex`) clears `legacyPathIndex`, the index-build wiring **must re-call `loadLegacyPathManifest` after** `indexDirectory`/`rebuildIndex` — a documented **re-seed obligation handed to Task 3.2**. Until Task 3 wires the artifact, the map is simply empty (correct — nothing to forward yet).
- **Delete branch** (`reindexFile`, file gone): `pruneAddressingEntriesForKey` removes the reverse `idIndex` entry **and** any `legacyPathIndex` entry pointing at the vanished key (design-verified `:96-101`).
- **Re-add branch** (`reindexFile`, file present → `indexFile`): repopulates `idIndex`. Additionally, `indexFile` prunes any prior id forward-entry pointing at the same key before re-adding — covers an **in-place id rewrite with no delete event** (an edge the delete-branch prune alone does not cover).
- `loadLegacyPathManifest(manifest)` seeds `legacyPathIndex` keyed on `normalizeRef(legacyPath)` → the indexed key the entry's target `id` currently resolves to. Entries whose target id is not indexed (identity docs, not-yet-migrated) are skipped (transition-only; a normal miss if probed). Idempotent / re-callable.

### 2.4 — `resolveRef` chokepoint + routing
Resolution order (Component 3 pseudocode, exactly):
1. `idIndex.get(ref)` → `{ strategy:'id', id: ref }` (raw ref; ids are not path-normalized)
2. `key = normalizeRef(ref)`; `documentContent.has(key)` → `{ strategy:'indexed-key', id: documentMap.get(key).id }`
3. `legacyPathIndex.get(key)` → `{ strategy:'legacy-fallback', id: documentMap.get(ik).id }`
4. miss → `DocumentNotResolved(ref, ['id','indexed-key','legacy-fallback'])`

`normalizeRef` is a **single private helper** used by BOTH strategy 2 and strategy 3 (one helper, two call sites): trim → backslashes to `/` → strip leading `./` → collapse repeated `/` → strip trailing `/`. Strategy 2 normalizes **before** the `documentContent.has` probe (without it, a stray `./` or trailing slash silently skips strategy 2 and falls through).

`getDocumentContent` changed from `documentContent.get(filePath)` to `documentContent.get(this.resolveRef(ref).indexedKey)`. The five path-taking tools and `QueryEngine.validatePath` are **unchanged**.

---

## Design Decision 1 (chokepoint) + keyspace invariant

- **Decision 1 honored**: resolution inserted at exactly one chokepoint (`getDocumentContent`), so all five tools (`get_document_summary`/`get_document_full`/`get_section`/`list_cross_references`/`validate_metadata`) inherit id/legacy resolution with no per-tool changes. No per-tool resolution was introduced.
- **Keyspace invariant honored**: both indexes resolve to the indexed (relative) key — `path.join(dirPath, entry.name)` — never an absolute path. (In the unit tests `dirPath` is an absolute test dir, so the key is absolute there; in production `DEFAULT_STEERING_DIR = '.kiro/steering/'`, so the key is the relative literal. The resolver is agnostic — it resolves to whatever key the indexer used.)
- **Guard-ordering invariant honored**: `validatePath` (rejects `..`) runs in each tool BEFORE `resolveRef`. `normalizeRef` deliberately does NOT touch `..`. The legacy keyspace is `..`-free by construction; the Task 3 producer asserts this.
- **Error contract preserved**: `DocumentNotResolved` carries `errorType` + `ref` + `triedStrategies` for gate attribution, and its message preserves the legacy `Document not found` substring so existing tool/indexer error tests still match.

---

## Validation (Tier 3: Comprehensive)

- ✅ `tsc --noEmit` (mcp-server) clean, exit 0 — run twice.
- ✅ Full `npx jest` (mcp-server): **31 suites / 554 tests / 0 failed** — run twice, stable. (Baseline before this task: 520 tests; +34 new.)
- ✅ The pre-existing flaky `token-efficiency.test.ts` afterAll `ENOTEMPTY` fixture-teardown race did NOT recur across the verification runs.
- ✅ Four resolveRef outcomes unit-covered (id / indexed-key / legacy-fallback / miss) + id-precedence.
- ✅ `derived-h1` and `none` slug paths unit-covered explicitly (per the Task 1 14-doc finding).
- ✅ Index-maintenance invariant unit-covered across clear / delete-branch / re-add / in-place-id-change.
- ✅ Changes contained entirely within `mcp-server/`; no external importer constructs `DocumentMetadata` literals or calls the new APIs (the one root-level reference, `src/__tests__/browser-distribution/mcp-queryability.test.ts`, only runtime-`require`s the compiled indexer for instantiation).

**Rebuild note**: the parser + indexer changed — a `rebuild_index` (`mcp__designerpunk-docs__rebuild_index`) is needed after this lands so the live index carries `id` on every doc. (Backfill of literal `id:` onto disk is Task 4; until then every indexed doc gets a *derived* id at index time, which is sufficient for resolution.)

---

## Requirements Compliance

- ✅ Req 2.1 / 2.9 — `id`/`idSource` reader + slug derivation (the reader that MUST precede the Task 4 codemod).
- ✅ Req 2.9 — `DocumentMetadata.id` on every indexed doc.
- ✅ Req 2.2 / 2.3 / 2.9 — `resolveRef` id → indexed-key → legacy-fallback at the single chokepoint; `idIndex`/`legacyPathIndex` maintained on every path touching `documentContent`.

---

## Honest Notes / Re-verify in the main loop

1. **Legacy re-seed obligation is a live coupling for Task 3.** `indexDirectory`/`rebuildIndex` clear `legacyPathIndex` per the design's clear-both invariant; the seed therefore must be re-applied after every full re-scan. This is documented in-code and handed to Task 3.2. If Task 3 wires `loadLegacyPathManifest` only once at startup and never after `rebuild_index`, legacy refs will silently stop resolving after the first rebuild. **Worth a main-loop spot-check when Task 3 lands.**
2. **In-place-id-change prune is beyond the design's literal invariant.** The design's delete-branch covers rename = delete-old + add-new. A same-path `id:` rewrite with no delete event would otherwise leave a stale old-id → key entry, so `indexFile` now prunes any prior id pointing at the same key before re-adding. Small, defensive, unit-covered — flagging it because it's an addition, not a transcription of the spec text.
3. **Empty-string `id` on unaddressable docs.** `DocumentMetadata.id` is required (`string`), defaulting to `''` for a doc with no id/name/H1; such docs are excluded from `idIndex` (an empty id is not a key). The Task 4 guard's `idSource: 'none'` worklist should surface these as explicit exceptions rather than treating `''` as a real id.
4. **Strategy-2 key form in production vs tests.** Tests use absolute test-dir keys; production uses the relative `.kiro/steering/…` literal. Resolution is agnostic, but the legacy manifest's `legacyPath` strings (Task 3) must normalize to the SAME relative form the indexer keys on, or strategy 3 won't hit. The shared `normalizeRef` is used on both seed and probe sides to keep them aligned.

## Related Documentation

- [Task 2 Summary](../../../../docs/specs/119-A-steering-relocation-serving-contract/task-2-summary.md)
