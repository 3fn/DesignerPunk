# Implementation Plan: Steering Relocation & Serving Contract (119-A)

**Date**: 2026-06-29
**Spec**: 119-A - Steering Relocation & Serving Contract
**Status**: Implementation Planning
**Dependencies**:
- **Consumes Spec 121** (COMPLETE): `find_docs` (dual-mode), `get_section` enhancements, `matchConfidence: strong | partial | none`, importable `WORKFLOW_RULES`.
- **Consumes Spec 118** (COMPLETE): Module-Resolution Contract is live; docs are relocated in their already-updated form (location + frontmatter only, not content).
- **Sequenced BEFORE Specs 122/123.** Net: `119-A → 122 → 123 → 119-B`.
- **Precedes Spec 119-B** (deferred).

---

## Scope authority

These tasks cover ONLY the **Critical (119-A)** rows of the requirements' § "Severable Seam Partition". The **Severable (→ 119-B/122)** rows get **no implementation tasks** — see § "Deferred to 119-B / 122 (no tasks)" at the foot of this document for the single deferral note per severable surface. No task here builds a manifest, generates a capability catalog, decomposes/trims `resources`, re-points companions by `id`, builds routing tables, formalizes/propagates certainty-calibration, or runs the measurement case study.

## Sequencing is a correctness property

The parent tasks are ordered to honor the design's hard sequencing (design.md § "Sequencing"). The load-bearing blocking dependencies, called out per-subtask below:
1. The frontmatter `id` **reader** (Task 2.x) MUST precede the 89-doc `id` backfill **codemod** (Task 4.x) — so the codemod's idempotency skip works.
2. The **resolver** + the **legacy-path forwarding-manifest producer** (Tasks 2–3) MUST be live/frozen **before** filename rename (Task 5) + relocation (Task 6) — the original paths vanish after the move.
3. Then: rename → relocate → MCP/packaging rewiring → cross-ref migration → meta-guide removal (gated on the discovery dry-run) → the relocation-integrity gate as the exit check.

## Agent assignment key

- **Thurgood / infra** — Docs-MCP resolver build, indexer/parser changes, legacy-path manifest producer, uniqueness guard, `id` backfill codemod, dry-run + frozen oracle, relocation-integrity gate, relocation execution, cross-ref migration, meta-guide removal, certainty-calibration text, 118 pointer, per-agent AX-design artifact, `aliases` seeding execution (per Ada's flag: the Docs-MCP resolver build is infra, not the token domain; these are Civitas/governance surfaces).
- **Ada** — MCP + packaging config/pipeline rewiring; domain-owner alias seed lists (token).
- **Lina** — family-guidance companion re-point (Application-MCP / component domain); domain-owner alias seed lists (component).
- **Leonardo** — domain-owner alias seed lists (layout/system).
- `Agent A + Agent B` is used for genuinely cross-domain subtasks, with rationale. Agent field is a recommendation — Peter may reroute.

---

## Task List

- [x] 1. Doc Inventory + Comprehensive Steering-Path Coupling Sweep

  **Type**: Parent
  **Validation**: Tier 3 - Comprehensive (includes success criteria)

  **Success Criteria:**
  - Authoritative enumeration of all 89 docs exists, each with current path, current `inclusion` mode, and intended post-migration role (identity / relocated / removed).
  - The comprehensive steering-path coupling sweep is captured and classified into must-fix-119-A / deferrable / R3-scope-out buckets.
  - Content-stale docs are flagged for the separate Thurgood-led audit (triage only, no content modification); un-assignable docs surfaced as explicit exceptions.
  - The inbound family-guidance couplings (22 `companion:` + README template + 3 reverse-links) are enumerated as gate assertion targets.

  **Primary Artifacts:**
  - `.kiro/specs/119-A-steering-relocation-serving-contract/inventory/doc-inventory.md` (89 docs, role-assigned)
  - `.kiro/specs/119-A-steering-relocation-serving-contract/inventory/coupling-sweep.md` (classified, three buckets)

  **Completion Documentation:**
  - Detailed: `.kiro/specs/119-A-steering-relocation-serving-contract/completion/task-1-parent-completion.md`
  - Summary: `docs/specs/119-A-steering-relocation-serving-contract/task-1-summary.md`

  **Post-Completion:**
  - Mark complete: Use `taskStatus` tool to update task status
  - Run full suite: `npm test` (inventory introduces no code, but confirm green baseline before downstream tasks)
  - Commit changes: `./.kiro/hooks/commit-task.sh "Task 1 Complete: Doc Inventory + Coupling Sweep"`
  - Verify: Check GitHub for committed changes

  - [ ] 1.1 Enumerate all 89 docs with role assignment
    **Type**: Setup
    **Validation**: Tier 1 - Minimal
    **Agent**: Thurgood
    - Enumerate every steering doc via the MCP index as single source of truth (`find_docs`); do NOT depend on any Documentation Directory artifact (dropped — Req 11)
    - Record each doc's current path, current `inclusion` mode, intended post-migration role (identity / relocated / removed)
    - Confirm the count is exactly 89 (recorded, not estimated)
    - Surface any doc that cannot be assigned a role as an explicit exception (do not silently drop)
    - _Requirements: 1.1, 1.2, 1.3, 1.5_

  - [ ] 1.2 Staleness triage pass (flag, do not fix)
    **Type**: Setup
    **Validation**: Tier 1 - Minimal
    **Agent**: Thurgood
    - Flag content-stale docs for the separate Thurgood-led governance audit (R3); record, do not modify content
    - _Requirements: 1.4_

  - [ ] 1.3 Comprehensive steering-path coupling sweep, classified by remediation timing
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Thurgood
    - Enumerate every surface coupling to a `.kiro/steering/…` path; classify into MUST-FIX-119-A / DEFERRABLE / R3-scope-out per Req 1 AC7
    - MUST-FIX set: `sync-manifest.json` (89 path-keyed entries), agent-definition `resources` steering-doc `file://` entries (doc-entry break only, NOT decomposition), `.cursor/mcp.json` `MCP_STEERING_DIR` + Docs MCP `DEFAULT_STEERING_DIR`, `src/cli/init.ts` + `designerpunk.ts`, `src/figma/VariantAnalyzer.ts` + `DesignExtractor.ts`, `scripts/extract-component-meta.ts`
    - DEFERRABLE: the 8 agent `-prompt.md` 60 hardcoded path refs (covered by Req 2 AC3 fallback, swept 119-B)
    - R3-scope-out: `src/validators/Stemma*.ts` stale guidance constants, `.claude/settings.local.json` Bash allowlist
    - This classified inventory IS the per-surface input to the Severable Seam Partition; the MUST-FIX set is the assertion target of the Task 9 gate
    - _Requirements: 1.7_

  - [ ] 1.4 Enumerate inbound family-guidance couplings
    **Type**: Setup
    **Validation**: Tier 1 - Minimal
    **Agent**: Thurgood + Lina (cross-domain: Civitas inventory + Application-MCP family-guidance ownership)
    - Enumerate the 22 `companion:` paths (9 top-level + 13 nested under `composesWithFamilies`) and the companion-path template at `family-guidance/README.md:32`
    - Enumerate the 3 reverse-coupling `../../family-guidance/*.yaml` relative links in Component-Family docs that break on the directory-depth change
    - Record which 9 top-level are gate-visible (FamilyGuidanceIndexer parses only top-level) vs the 13 nested correctness-only/gate-blind — feeds Task 6.x re-point + Task 9 family-guidance axis
    - _Requirements: 1.6_

- [x] 2. Frontmatter `id` Addressing Plane: Reader + Type + Resolver

  **Type**: Parent
  **Validation**: Tier 3 - Comprehensive (includes success criteria)

  **Success Criteria:**
  - `extractFrontmatterInfo` surfaces `id` + `idSource` with the kebab-slug-of-`name:`→H1 derivation fallback (the reader that MUST land before the backfill codemod).
  - `DocumentMetadata` carries `id` on every indexed doc.
  - `DocumentIndexer.resolveRef` resolves a ref by id → indexed-key → legacy-fallback at a single chokepoint, with `idIndex`/`legacyPathIndex` maintained on every path that touches `documentContent` (clear, delete-branch, re-add-branch).
  - The net-new resolver is unit-covered for all four resolution outcomes (id / indexed-key / legacy-fallback / miss).

  **Primary Artifacts:**
  - `mcp-server/src/.../frontmatter-parser.ts` (additive: `id`, `idSource`, `slugifyTitle`)
  - `mcp-server/src/models/DocumentationMap.ts` (`DocumentMetadata.id`)
  - `mcp-server/src/indexer/DocumentIndexer.ts` (`resolveRef`, `idIndex`, `legacyPathIndex`, `loadLegacyPathManifest`, index maintenance)
  - `mcp-server/src/.../QueryEngine.ts` (`getDocumentContent` routes through `resolveRef`)

  **Completion Documentation:**
  - Detailed: `.kiro/specs/119-A-steering-relocation-serving-contract/completion/task-2-parent-completion.md`
  - Summary: `docs/specs/119-A-steering-relocation-serving-contract/task-2-summary.md`

  **Post-Completion:**
  - Mark complete: Use `taskStatus` tool to update task status
  - Run full suite: `npm test` then `tsc` (resolver is net-new code on the path all five tools funnel through — verify full blast radius, not just resolver units)
  - Rebuild index: call `mcp__designerpunk-docs__rebuild_index` (parser/indexer changed)
  - Commit changes: `./.kiro/hooks/commit-task.sh "Task 2 Complete: id Addressing Plane Reader + Resolver"`
  - Verify: Check GitHub for committed changes

  - [ ] 2.1 Add `id`/`idSource` extraction + `slugifyTitle` to frontmatter parser
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Thurgood
    - Extend `FrontmatterInfo` with `id?: string` and `idSource: 'frontmatter' | 'derived-name' | 'derived-h1' | 'none'`
    - Read `id:` from frontmatter when present; otherwise derive kebab-slug of `name:`, falling back to H1
    - Implement `slugifyTitle` (lowercase, spaces/underscores→`-`, strip non-`[a-z0-9-]`, collapse `-`)
    - Unit-test slug derivation, `idSource` cases, and explicit-`id` passthrough
    - **BLOCKING: this reader MUST land before the Task 4 backfill codemod** (idempotency skip depends on it)
    - _Requirements: 2.1, 2.9_

  - [ ] 2.2 Add `id` to `DocumentMetadata`
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Thurgood
    - Add `id: string` to `DocumentMetadata` (path stays the indexed relative key, NOT absolute)
    - Populate `id` during `indexFile` from the parser output
    - _Requirements: 2.9_

  - [ ] 2.3 Build `idIndex` + `legacyPathIndex` with full index maintenance
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Thurgood
    - In `indexFile`, build `idIndex` (id → indexed relative key) and `legacyPathIndex` (normalized legacy path → indexed relative key); both store the same key `documentContent` is keyed on, never an absolute path
    - Maintain on every path that touches `documentContent`: clear both in `indexDirectory` full re-scan; in `reindexFile` delete-branch delete the reverse `idIndex` entry + any `legacyPathIndex` entry for the vanished key; re-add branch repopulates via `indexFile`
    - Add `loadLegacyPathManifest(manifest)` to seed `legacyPathIndex` from the Task 3 manifest (not inferred at index time)
    - _Requirements: 2.4, 2.9_

  - [ ] 2.4 Implement `resolveRef` chokepoint + route `getDocumentContent` through it
    **Type**: Architecture
    **Validation**: Tier 3 - Comprehensive
    **Agent**: Thurgood
    - Implement `resolveRef(ref)` resolution order: (1) id index, (2) `normalizeRef(ref)` then `documentContent.has`, (3) `legacyPathIndex.get(normalizeRef(ref))`, (4) throw `DocumentNotResolved(ref, triedStrategies)`
    - Implement a single `normalizeRef` helper (trim, leading `./` strip, slash normalization to indexed-key form) used by BOTH strategy 2 and strategy 3
    - Change `getDocumentContent` from `documentContent.get(filePath)` to `documentContent.get(this.resolveRef(ref).indexedKey)`; leave the five path-taking tools and `QueryEngine.validatePath` unchanged
    - Honor the guard-ordering invariant: `validatePath` runs before `resolveRef` and rejects `..`; the legacy keyspace is `..`-free by construction (assert this assumption in the manifest producer, Task 3)
    - Unit-test all four outcomes + normalization edge cases (extra `./`, trailing slash, OS slash, the 10 renamed space-bearing forms)
    - Document the chokepoint design decision (Design Decision 1) and the keyspace invariant in the completion doc
    - _Requirements: 2.2, 2.3, 2.9_

- [x] 3. Legacy-Path Forwarding Manifest (Producer + Frozen Artifact)

  **Type**: Parent
  **Validation**: Tier 3 - Comprehensive (includes success criteria)

  **Success Criteria:**
  - A generated `LegacyPathManifest` keyed on the original pre-rename, pre-relocation `.kiro/steering/…` strings exists, covering BOTH the 60 prompt refs AND the 10 renamed space-bearing files, each paired to its target `id`.
  - The manifest is generated against the pre-rename/pre-relocation tree and FROZEN to a checked-in JSON before any rename/relocation begins.
  - Every emitted `legacyPath` is `..`-free (asserted by the producer).
  - The artifact is self-documenting (`transitionOnly: true`) and carries a 119-B removal obligation.

  **Primary Artifacts:**
  - `scripts/generate-legacy-path-manifest.ts` (producer, Thurgood/infra-owned)
  - `mcp-server/src/.../legacy-path-manifest.json` (frozen artifact)

  **Completion Documentation:**
  - Detailed: `.kiro/specs/119-A-steering-relocation-serving-contract/completion/task-3-parent-completion.md`
  - Summary: `docs/specs/119-A-steering-relocation-serving-contract/task-3-summary.md`

  **Post-Completion:**
  - Mark complete: Use `taskStatus` tool to update task status
  - Run full suite: `npm test` then `tsc`
  - Commit changes: `./.kiro/hooks/commit-task.sh "Task 3 Complete: Legacy-Path Forwarding Manifest"`
  - Verify: Check GitHub for committed changes

  - [ ] 3.1 Implement the legacy-path manifest producer
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Thurgood
    - Two inputs: (1) grep-extract the `.kiro/steering/…md` refs from the 8 prompts (the 60 current pre-rename forms), (2) the literal Req-3 rename map (10 space-bearing → kebab targets); pair each row to the target doc's `id`
    - Emit `LegacyPathManifest { generatedAt, transitionOnly: true, entries: [{ legacyPath, id }] }`
    - Assert every emitted `legacyPath` is `..`-free (the guard-ordering invariant the resolver relies on)
    - _Requirements: 2.3_

  - [ ] 3.2 Generate + freeze the manifest against the pre-rename tree
    **Type**: Setup
    **Validation**: Tier 1 - Minimal
    **Agent**: Thurgood
    - Run the producer against the current pre-rename / pre-relocation tree and check in the resulting JSON
    - **BLOCKING: this frozen artifact MUST exist before Task 5 (rename) and Task 6 (relocate)** — after the move the original `.kiro/steering/…` strings no longer exist on disk and cannot be recovered; the frozen JSON is the only record (one-way gate)
    - Wire `loadLegacyPathManifest` (Task 2.3) to load this artifact at index build
    - _Requirements: 2.3, 4.5_

- [x] 4. Build-Time Uniqueness Guard + 89-Doc `id` Backfill Codemod

  **Type**: Parent
  **Validation**: Tier 3 - Comprehensive (includes success criteria)

  **Success Criteria:**
  - `checkIdUniqueness(roots)` scans the on-disk corpus across BOTH `governance/` (future) and `.kiro/steering/` and fails on any explicit-or-derived `id` collision, naming all colliding paths.
  - One exported function, two callers: a net-new CI npm script AND the Thurgood metadata-validation hook.
  - The 89-doc `id` backfill runs as a codemod that is idempotent (skips docs with an existing `id:`) and HALTS on a derived collision (emits both colliding paths for human adjudication), never silently duplicating.

  **Primary Artifacts:**
  - `scripts/check-id-uniqueness.ts` (`checkIdUniqueness`, `IdGuardResult`)
  - `package.json` (`npm run check:id-uniqueness` script + CI wiring)
  - `scripts/backfill-doc-ids.ts` (the codemod)
  - Thurgood metadata hook wiring (invokes `checkIdUniqueness`)

  **Completion Documentation:**
  - Detailed: `.kiro/specs/119-A-steering-relocation-serving-contract/completion/task-4-parent-completion.md`
  - Summary: `docs/specs/119-A-steering-relocation-serving-contract/task-4-summary.md`

  **Post-Completion:**
  - Mark complete: Use `taskStatus` tool to update task status
  - Run full suite: `npm test` then `tsc`; run `npm run check:id-uniqueness` and confirm green
  - Rebuild index: call `mcp__designerpunk-docs__rebuild_index` (89 docs gained on-disk `id:`)
  - Commit changes: `./.kiro/hooks/commit-task.sh "Task 4 Complete: id Uniqueness Guard + Backfill Codemod"`
  - Verify: Check GitHub for committed changes

  - [ ] 4.1 Implement `checkIdUniqueness` over both on-disk roots
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Thurgood
    - Implement `checkIdUniqueness(roots): IdGuardResult` scanning the on-disk corpus across both roots (filesystem paths, distinct from the resolver's indexed keys)
    - Return `{ ok, collisions: Record<id, paths[]>, derived: string[], totalDocs }`; treat a derived collision identically to an explicit one
    - Unit-test collision detection (explicit + derived), derived-worklist output, and `totalDocs` (expected 89)
    - _Requirements: 2.5_

  - [ ] 4.2 Wire the guard into CI (net-new) and the Thurgood metadata hook
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Thurgood
    - Add a net-new `npm run check:id-uniqueness` script (no existing steering build step to hang this on) and wire it into CI as the backstop
    - Wire the same `checkIdUniqueness` into the Thurgood metadata-validation hook (the day-to-day front line) so doc create/modify blocks on collision — one function, two callers
    - _Requirements: 2.5, 2.6_

  - [ ] 4.3 Run the 89-doc `id` backfill codemod (idempotent, collision-halting)
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Thurgood
    - **BLOCKED ON Task 2.1** (the `id`/`idSource` reader): the codemod's "`id:` already present → skip" idempotency depends on the reader; reader-before-writer or a re-run double-writes
    - Write the literal `id:` into the frontmatter of the 89 docs lacking one (derived from `idSource` worklist), freezing the slug on disk
    - Run `checkIdUniqueness` semantics over the PLANNED writes first; HALT on any derived collision, emitting both colliding paths for human adjudication — never write colliding `id:` values silently
    - Idempotent: a second run finds `id:` present and skips
    - _Requirements: 2.1, 2.5_

- [x] 5. Filename Normalization (Mass-Rename of 10 Space-Bearing Files)

  **Type**: Parent
  **Validation**: Tier 3 - Comprehensive (includes success criteria)

  **Success Criteria:**
  - The kebab-case/no-spaces steering-filename standard is recorded (none existed).
  - The 10 verified space-bearing files are renamed to the convention; each file's stable `id` is unchanged by the rename.
  - Any `always`-inclusion wiring referencing a renamed identity doc by filename is updated.

  **Primary Artifacts:**
  - The 10 renamed files (in place)
  - Updated `always`-inclusion wiring for renamed identity docs

  **Completion Documentation:**
  - Detailed: `.kiro/specs/119-A-steering-relocation-serving-contract/completion/task-5-parent-completion.md`
  - Summary: `docs/specs/119-A-steering-relocation-serving-contract/task-5-summary.md`

  **Post-Completion:**
  - Mark complete: Use `taskStatus` tool to update task status
  - Run full suite: `npm test` then `tsc`
  - Rebuild index: call `mcp__designerpunk-docs__rebuild_index`; spot-resolve a renamed file's legacy path through the fallback to confirm continuity
  - Commit changes: `./.kiro/hooks/commit-task.sh "Task 5 Complete: Filename Normalization"`
  - Verify: Check GitHub for committed changes

  - [ ] 5.1 Rename the 10 space-bearing files
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Thurgood
    - **BLOCKED ON Tasks 2 + 3** (resolver live + legacy-path manifest frozen) — the rename changes the original paths, which then resolve only via the fallback
    - Rename the verified 10 (e.g. `Core Goals.md`, `Start Up Tasks.md`, `Cross-Platform vs Platform-Specific Decision Framework.md`, etc.) to kebab-case/no-spaces; `id` unchanged
    - Apply the rename to identity-layer docs too (filename convention is corpus-wide even though relocation is not)
    - Update any `always`-inclusion wiring referencing a renamed identity doc by filename
    - _Requirements: 3.2, 3.3, 3.4, 3.5_

  - [ ] 5.2 Record the kebab-case filename standard
    **Type**: Setup
    **Validation**: Tier 1 - Minimal
    **Agent**: Thurgood
    - Record kebab-case/no-spaces as the project steering-filename standard (feeds the Task 11 convention doc)
    - _Requirements: 3.1_

- [x] 6. Relocate Non-Identity Docs to `governance/` (Atomic with Companion Re-Point)

  **Type**: Parent
  **Validation**: Tier 3 - Comprehensive (includes success criteria)

  **Success Criteria:**
  - Every non-identity doc moves `.kiro/steering/` → `governance/`; the ~9 identity docs stay; content is byte-unchanged.
  - The 89-doc `id` backfill (Task 4.3) is executed/confirmed against the relocated tree; every relocated doc is reachable via the Docs MCP by its `id`.
  - The family-guidance companion re-point (all 22 + README template + 3 reverse-links) lands ATOMICALLY in the same commit as the move — no transient family-guidance warning window.
  - Relocation is treated as the highest-risk op: rollback = single revert; passes are idempotent/re-runnable.

  **Primary Artifacts:**
  - `governance/` populated with ~80 relocated docs
  - Re-pointed `family-guidance/*.yaml` `companion:` values + `family-guidance/README.md` template + 3 corrected reverse-links

  **Completion Documentation:**
  - Detailed: `.kiro/specs/119-A-steering-relocation-serving-contract/completion/task-6-parent-completion.md`
  - Summary: `docs/specs/119-A-steering-relocation-serving-contract/task-6-summary.md`

  **Post-Completion:**
  - Mark complete: Use `taskStatus` tool to update task status
  - Run full suite: `npm test` then `tsc` (relocation is the highest-risk op — full blast-radius verification, not targeted)
  - Rebuild index: call `mcp__designerpunk-docs__rebuild_index`; confirm relocated docs resolve by `id` and legacy paths resolve via fallback
  - Commit changes: `./.kiro/hooks/commit-task.sh "Task 6 Complete: Relocate Non-Identity Docs to governance/"`
  - Verify: Check GitHub for committed changes

  - [ ] 6.1 Move non-identity docs to `governance/` (idempotent, content-unchanged)
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Thurgood
    - **BLOCKED ON Tasks 2 + 3 + 5** (resolver live, manifest frozen, rename done) — original paths vanish here and resolve only via the fallback
    - Move every non-identity doc `.kiro/steering/` → `governance/`; keep the ~9 identity docs in `.kiro/steering/`; content byte-unchanged
    - Idempotent: a second run finds files already under `governance/` and skips
    - Confirm/execute the Task 4.3 `id` backfill against the relocated tree (the relocation pass opens every file)
    - _Requirements: 4.1, 4.2, 4.3, 4.4_

  - [ ] 6.2 Atomic family-guidance companion re-point (all 22 + README + reverse-links)
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Lina
    - Re-point ALL 22 `companion:` values (9 top-level + 13 nested under `composesWithFamilies`) to the new `governance/…` physical path — by-`governance/`-path (option b), code-free, NO `FamilyGuidanceIndexer` change (companion-by-`id` is deferred to 122)
    - Re-point the companion-path template in `family-guidance/README.md`
    - Correct the 3 reverse-coupling `../../family-guidance/*.yaml` relative links for the new directory depth
    - **ATOMICITY: this MUST land in the same commit as Task 6.1's move** so component health never transiently degrades (a lagged re-point fires FamilyGuidanceIndexer warnings)
    - Note: only the 9 top-level are gate-visible; re-pointing all 22 is for correctness (the 13 nested are gate-blind) — green axis ≠ all 22 verified
    - _Requirements: 4.6, 4.7_

  - [ ] 6.3 Document the rollback + idempotency handling
    **Type**: Setup
    **Validation**: Tier 1 - Minimal
    **Agent**: Thurgood
    - Record the rollback path: revert the move commit + restore prior `MCP_STEERING_DIR` wiring; because resolver + fallback are live before the move, references resolve in both rolled-forward and rolled-back states (no orphan window)
    - Confirm idempotency of the `id` backfill, the move, and the companion re-point (each re-runnable; partial failure safe to re-run rather than requiring a clean revert)
    - _Requirements: 4.5_

- [x] 7. Rewire the MCP and Packaging Surface to `governance/`

  **Type**: Parent
  **Validation**: Tier 3 - Comprehensive (includes success criteria)

  **Success Criteria:**
  - `MCP_STEERING_DIR`/`DEFAULT_STEERING_DIR`, `package.json files[]` (add `governance/`, keep `.kiro/steering/`), the `init` template + `init.test`, `sync` `MANAGED_DIRS` + net-new stale-detection, and `.cursor/mcp.json` all point at `governance/`.
  - Every MUST-FIX coupling surface from Task 1.3 is repointed to `governance/` and functional (the Task 9 gate's must-fix axis assertion targets).
  - `init.test.ts` moves its FULL assertion set (path string AND the doc-count assertions re-derived for the two-root split), not just the path literal.
  - The dead `get_documentation_map` reference is stripped from the init template `autoApprove` list and `.cursor/mcp.json` `autoApprove` (config listings only — NOT the tool implementation).

  **Primary Artifacts:**
  - `mcp-server` `DEFAULT_STEERING_DIR` + `.cursor/mcp.json` `MCP_STEERING_DIR`
  - `package.json` `files[]`
  - `src/cli/templates/mcp-config.json.template`, `src/cli/__tests__/init.test.ts`
  - `src/cli/sync/FileScanner.ts` `MANAGED_DIRS` + net-new stale-`MCP_STEERING_DIR` detection
  - `.kiro/sync-manifest.json`, `src/figma/VariantAnalyzer.ts` + `DesignExtractor.ts`, `scripts/extract-component-meta.ts`, `src/cli/init.ts` + `designerpunk.ts`

  **Completion Documentation:**
  - Detailed: `.kiro/specs/119-A-steering-relocation-serving-contract/completion/task-7-parent-completion.md`
  - Summary: `docs/specs/119-A-steering-relocation-serving-contract/task-7-summary.md`

  **Post-Completion:**
  - Mark complete: Use `taskStatus` tool to update task status
  - Run full suite: `npm test` then `tsc` (init/sync tests + figma + extract-component-meta are in blast radius)
  - Rebuild index: call `mcp__designerpunk-docs__rebuild_index` after `DEFAULT_STEERING_DIR` change
  - Commit changes: `./.kiro/hooks/commit-task.sh "Task 7 Complete: MCP + Packaging Rewiring to governance/"`
  - Verify: Check GitHub for committed changes

  - [ ] 7.1 Rewire MCP dir + packaging + init template/test
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Ada
    - Point `MCP_STEERING_DIR`/`DEFAULT_STEERING_DIR` and `.cursor/mcp.json` at `governance/` (retain the env var NAME as a stable API contract)
    - `package.json files[]`: ADD `governance/`; KEEP `.kiro/steering/` (identity docs keep shipping, per Peter)
    - Update `src/cli/templates/mcp-config.json.template` to emit the `governance/` path
    - Update `src/cli/__tests__/init.test.ts` FULL assertion set: the path literal AND the doc-count assertions (`:142`, `:187`, `:194-195` hard-code `89`/`90` against single-root — re-derive for the two-root split: identity count in `.kiro/steering/` + governance count in `governance/`)
    - B4 cleanup-in-passing: strip the dead `get_documentation_map` from the init template `autoApprove` list (`mcp-config.json.template:13`) and `.cursor/mcp.json` `autoApprove` if present (config listings ONLY, not the tool impl in `mcp-server/src`) — and DECIDE whether to add `find_docs` to the template `autoApprove` (currently absent; out-of-119-A-scope unless you want the list synced to the live tool set)
    - _Requirements: 5.1, 5.2, 5.3, 5.6_

  - [ ] 7.2 Repoint `sync` `MANAGED_DIRS` + add net-new stale-`MCP_STEERING_DIR` detection
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Ada
    - Add `governance` to `MANAGED_DIRS` (the `const` at `src/cli/sync/FileScanner.ts:17`; the existing `.kiro/steering` entry is at `:18`) so `sync` reconciles relocated docs; retain the `.kiro/steering` entry only while identity docs sync through it. NOTE the new `{ path: 'governance', tier: 'governance' }` reuses the existing `tier: 'governance'` *type* — don't conflate the directory `path` with the `tier` label
    - Add net-new stale-`MCP_STEERING_DIR` detection to `sync` (today zero `mcp.json` awareness) and prompt the consumer to update — net-new capability, not a tweak
    - Reflect the new `governance/` path in the Integration Guide MCP configuration template
    - _Requirements: 5.4, 5.5, 5.6_

  - [ ] 7.3 Remediate the remaining MUST-FIX coupling surfaces
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Ada + Thurgood (cross-domain: config/pipeline surfaces are Ada's; `sync-manifest.json` regen + `resources` doc-entry breaks are Civitas-governance surfaces Thurgood owns)
    - Regenerate `.kiro/sync-manifest.json` with `governance/` keys (89 path-keyed entries) — ties to the 7.2 `MANAGED_DIRS` repoint
    - Resolve the agent-definition `resources` steering-doc entries: **selectively repoint ONLY the relocating (non-identity) entries** to `governance/`, LEAVE identity entries (Core Goals, AI-Collaboration-Principles, Personal Note, Agent-Directory, etc.), and PRESERVE each entry's `file://`/`skill://` scheme. Doc-entry relocation-break ONLY — NOT the AX decomposition, which is severable
    - Repoint `src/figma/VariantAnalyzer.ts` + `DesignExtractor.ts` steering-doc-path construction and `scripts/extract-component-meta.ts` `STEERING_DIR` to `governance/`
    - `src/cli/init.ts`: **ADD a `governance/` copyDir, KEEP the `.kiro/steering` copy** (a literal repoint would drop the ~9 identity docs from the consumer scaffold — mirrors the 7.1 `files[]` treatment). `designerpunk.ts`: clean **repoint** to `governance/` (it spawns the docs MCP, which indexes only the served non-identity corpus)
    - Wiring correctness is verified by the Task 9 gate (the dissolved Phase 10 atomicity-with-prompts guarantee no longer holds)
    - _Requirements: 5.7, 1.7, 8.7_

- [~] 8. Identity Lock + Discovery Safety (Calibration Text, 118 Pointer, Aliases, Cross-Refs) — 8.1/8.2/8.3/8.5 done; 8.4 (aliases) deferred to post-Task-10.3 floor dry-run

  **Type**: Parent
  **Validation**: Tier 3 - Comprehensive (includes success criteria)

  **Success Criteria:**
  - The ~9-doc `always` ambient core is locked; no doc outside it remains `always`; `Process-Development-Workflow` + `Process-File-Organization` move `always`→`manual` and relocate.
  - The certainty-calibration behavioral rule TEXT lands in `AI-Collaboration-Principles.md`, forward-compatibly phrased in strong/partial/none shape (text only — formalization/propagation deferred to 119-B).
  - The 118 Module-Resolution-Contract one-line pointer lands as a distinct numbered surface in `DesignerPunk-Systems-Overview.md`.
  - `aliases` are seeded on relocated docs from domain-owner seed lists; the seeding worklist is the Task 10.3 floor dry-run and the verification gate is the Task 10.4 lift re-run.
  - Active-doc intra-doc cross-references migrate to `id`s (run after the legacy-path fallback is live); historical docs left as-is; un-`id`-able targets surfaced as explicit exceptions.

  **Primary Artifacts:**
  - `AI-Collaboration-Principles.md` (calibration rule text)
  - `DesignerPunk-Systems-Overview.md` (118 pointer)
  - Seeded `aliases` frontmatter across relocated docs
  - Migrated intra-doc cross-references (active docs)

  **Completion Documentation:**
  - Detailed: `.kiro/specs/119-A-steering-relocation-serving-contract/completion/task-8-parent-completion.md`
  - Summary: `docs/specs/119-A-steering-relocation-serving-contract/task-8-summary.md`

  **Post-Completion:**
  - Mark complete: Use `taskStatus` tool to update task status
  - Run full suite: `npm test` then `tsc`
  - Rebuild index: call `mcp__designerpunk-docs__rebuild_index` (aliases + inclusion-mode changes affect discovery/index)
  - Commit changes: `./.kiro/hooks/commit-task.sh "Task 8 Complete: Identity Lock + Discovery Safety"`
  - Verify: Check GitHub for committed changes

  - [ ] 8.1 Lock the `always` ambient core; demote the two process docs
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Thurgood
    - Lock the ~9-doc `always` set per Req 6 AC1 (Personal Note, Core Goals, AI-Collaboration-Principles, Spec-Feedback-Protocol, DesignerPunk-Systems-Overview, Civitas-System-Overview, Start Up Tasks, Task Completion Protocol, Agent-Directory)
    - Refocus Start Up Tasks (retain date/governance-health/Jest/authorization checklist); author the new always-loaded Task Completion Protocol doc (end-of-task sequence, tier, parent vs subtask)
    - Move `Process-Development-Workflow` + `Process-File-Organization` from `always` to `manual` and relocate to `governance/`
    - Assert no doc outside the AC1 set remains `always`
    - Record the AXA five-class overlay as a non-binding annotation (does not change any 119-A inclusion mode); carry the Agent-Directory → capability-catalog migration as an explicit 119-B/122 forward-reference (no decompose/trim/relocate of Agent-Directory here)
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.6_

  - [ ] 8.2 Land the certainty-calibration rule text (forward-compatible)
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Thurgood
    - Add the plain-English behavioral rule to `AI-Collaboration-Principles.md`: when unsure where guidance lives, run `find_docs` + a cheap fallback (e.g. `Grep`) before guessing; weight strong above partial; if still unsure, propose best guess and ask the human for go/no-go; never act confidently on empty/weak results
    - Phrase forward-compatibly in the strong/partial/none shape of the 121 `matchConfidence` signal so 119-B refines rather than rewrites
    - **Scope: TEXT ONLY** — formalization against the signal + propagation to the 8 prompts via 122 are deferred to 119-B
    - _Requirements: 6.5_

  - [ ] 8.3 Add the 118 Module-Resolution-Contract identity-layer pointer
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Thurgood
    - Add a single ~25-token pointer line to `DesignerPunk-Systems-Overview.md` stating module resolution is governed by the Module-Resolution Contract and should be pulled before touching those surfaces, referencing RSA § Module-Resolution Contract
    - Land it as a distinct, numbered surface (not buried between the prose note and the phase table); keep contract depth in the manual/MCP-served RSA
    - _Requirements: 7.1, 7.2, 7.3_

  - [ ] 8.4 Seed `aliases` on relocated docs
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Thurgood (executes) + Ada/Lina/Leonardo (domain-owner seed lists)
    - Civitas executes seeding across relocated docs' frontmatter; domain owners author their domains' seed lists (Ada: token; Lina: component; Leonardo: layout/system) per the per-agent-ax companion
    - Seed cross-domain discovery concepts NOT already in title/description (`find_docs` does not index body prose — `aliases` is the backstop); seeding does NOT alter any `id` (planes stay decoupled)
    - **BLOCKED ON Task 10.3 (floor dry-run) for the worklist**: the 10.3 floor WEAK/MISS set IS the seeding worklist; the Task 10.4 post-seeding "lift" re-run is the verification gate
    - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5_

  - [ ] 8.5 Migrate active-doc intra-doc cross-references to `id`s
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Thurgood
    - **BLOCKED ON Tasks 2 + 3 (fallback live)** so references resolve continuously during migration rather than transiently 404ing
    - Migrate active-doc cross-refs to doc `id`s (NOT new physical `governance/…` paths); heaviest in the token corpus (Token-Governance ~7 refs, Rosetta-System-Architecture ~6)
    - Leave historical docs (prior specs, completion docs) as-is; resolve in-between refs by the REFERENCING doc's own status (Design Decision 7)
    - Surface any cross-ref that cannot be expressed as `id` as an explicit exception — do NOT silently convert to a physical `governance/…` path
    - _Requirements: 10.1, 10.2, 10.3, 10.4_

- [x] 9. Per-Agent Five-Class Ambient-Set Design Artifact (Req 14, design-only)

  **Type**: Parent
  **Validation**: Tier 3 - Comprehensive (includes success criteria)

  **Success Criteria:**
  - A per-agent ambient-set DESIGN exists for all 8 agents, assigning each piece of ambient context to one of the five AXA classes (formative / reflexive-principle / governance-as-law / ground-truth-manifest / capability-catalog), typed so 122 has a contract to generate against.
  - Ground-truth-manifest and capability-catalog members are marked `design-only-*` (build/generation explicitly behind the seam).
  - The design is sourced from `per-agent-ax-assessments.md` (input-of-record) and captured as a design appendix, not re-derived.
  - No manifest is built and no catalog is generated; the "generate, don't curate" interim invariant (Req 4 AC8) is honored for any interim artifact.

  **Primary Artifacts:**
  - `.kiro/specs/119-A-steering-relocation-serving-contract/per-agent-ambient-design.md` (the typed `PerAgentAmbientDesign[]` design artifact / 122's canonical input)

  **Completion Documentation:**
  - Detailed: `.kiro/specs/119-A-steering-relocation-serving-contract/completion/task-9-parent-completion.md`
  - Summary: `docs/specs/119-A-steering-relocation-serving-contract/task-9-summary.md`

  **Post-Completion:**
  - Mark complete: Use `taskStatus` tool to update task status
  - Run full suite: `npm test` (design artifact introduces no code; confirm green baseline)
  - Commit changes: `./.kiro/hooks/commit-task.sh "Task 9 Complete: Per-Agent Five-Class Ambient-Set Design"`
  - Verify: Check GitHub for committed changes

  - [ ] 9.1 Produce the per-agent five-class ambient-set design
    **Type**: Architecture
    **Validation**: Tier 3 - Comprehensive
    **Agent**: Thurgood
    - For each of the 8 agents, produce a `PerAgentAmbientDesign` assigning each ambient member to one of the five classes; record `agentType` (owner / consumer / differential-auditor) per the companion
    - Treat formative + reflexive-principle as roughly universal; design governance-as-law + ground-truth-manifest + capability-catalog per-agent (role-specific)
    - For ground-truth-manifest members: specify the manifest's DESIGN (what it must contain) but mark the BUILD as behind the seam (`status='design-only-build-deferred'`)
    - For capability-catalog members: specify the catalog's DESIGN (commands/scripts, activation cues, deferred-tool awareness, absorbed Agent-Directory routing) but mark the GENERATION as behind the seam (`status='design-only-gen-deferred'`)
    - Source the per-agent content from `per-agent-ax-assessments.md` (input-of-record); capture as a design appendix, do not re-derive
    - Honor "generate, don't curate" (Req 4 AC8): any interim hand-curated artifact carries a tracked 122-replacement obligation + named owner
    - Document the design decisions + the seam boundary (design = 119-A; build/generation = severable) in the completion doc
    - _Requirements: 14.1, 14.2, 14.3, 14.4, 14.5, 14.6, 4.8_

- [~] 10. Discovery Dry-Run + Frozen Map-Oracle, then Gated Meta-Guide Removal — 10.1/10.2/10.3 done (oracle + harness + floor); 10.4 (lift) after Task 8.4; 10.5 (removal)/10.6 (no-regression) follow

  **Type**: Parent
  **Validation**: Tier 3 - Comprehensive (includes success criteria)

  **Success Criteria:**
  - The meta-guide's "Tier 2: MCP-Only Documents" concept→doc map is captured as a frozen, human-validated (stale-stripped) test oracle BEFORE the meta-guide is removed; the oracle is retained as 119-B's non-circular "before" anchor (test fixture, NOT a living doc).
  - `runDiscoveryDryRun` scores the three-point baseline (floor / lift / no-regression) against the same oracle, translating `find_docs` `path` results to `id` via a path→id map at scoring time.
  - The hard removal gate is satisfied: no oracle concept is WEAK/MISS (every correct doc at rank ≤ 2 with matchConfidence ≥ partial); the rank-1-strong rate is REPORTED as a signal (review-if-below-~80%, not a block).
  - The meta-guide (`00-Steering Documentation Directional Priorities.md`) is removed and the never-built Documentation Directory is formally dropped — ONLY after the gate clears.

  **Primary Artifacts:**
  - `scripts/discovery-dry-run.ts` (`runDiscoveryDryRun`, `DryRunResult`, `OracleEntry`)
  - Frozen map-oracle test fixture (`OracleEntry[]`)
  - Removed `00-Steering Documentation Directional Priorities.md`

  **Completion Documentation:**
  - Detailed: `.kiro/specs/119-A-steering-relocation-serving-contract/completion/task-10-parent-completion.md`
  - Summary: `docs/specs/119-A-steering-relocation-serving-contract/task-10-summary.md`

  **Post-Completion:**
  - Mark complete: Use `taskStatus` tool to update task status
  - Run full suite: `npm test` then `tsc`
  - Rebuild index: call `mcp__designerpunk-docs__rebuild_index` after meta-guide removal
  - Commit changes: `./.kiro/hooks/commit-task.sh "Task 10 Complete: Discovery Dry-Run + Gated Meta-Guide Removal"`
  - Verify: Check GitHub for committed changes

  - [ ] 10.1 Capture + human-validate the frozen map-oracle (before removal)
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Thurgood
    - Extract the meta-guide's "Tier 2: MCP-Only Documents" categories (Process / Token / Component / Layout / Integration / Testing / Architecture) → doc pointers BEFORE removal (Req 11 AC4 hard precondition)
    - Human-validate to STRIP STALE entries (an R3 staleness-triage pass — do not reproduce the map 100%, that enshrines its rot)
    - Store as a point-in-time test fixture (`OracleEntry[]`), NOT a living doc; retain as 119-B's non-circular "before" anchor
    - _Requirements: 11.4, 13.1, 13.2, 13.7_

  - [ ] 10.2 Implement the discovery dry-run harness (scoring + path→id translation)
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Thurgood
    - Implement `runDiscoveryDryRun(point, oracle)` scoring per-query rank-of-correct + `matchConfidence`, classified PASS / WEAK / MISS; compute `clearsThreshold` (true iff no WEAK/MISS) + `rank1StrongRate` (reported signal); emit `weakOrMiss[]`
    - Query set = union of (a) the map's concepts/categories and (b) each agent's domain queries; answer key = the validated oracle (Task 10.1)
    - B5: build/accept a path→id map at scoring time (translate each `find_docs` `path` to `id` via `documentMap.get(path).id`) before computing `rankOfCorrect` — without it every concept scores MISS (`path !== id`)
    - This subtask builds the HARNESS only; the three baseline RUNS are 10.3 / 10.4 / 10.6
    - _Requirements: 13.3, 13.5_

  - [ ] 10.3 Run the FLOOR baseline (pre-aliases) → emits the alias-seeding worklist
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Thurgood
    - **BLOCKED ON Tasks 10.1 (oracle) + 10.2 (harness).** Runs BEFORE alias seeding (the pre-aliases floor)
    - Record the floor `DryRunResult`; its `weakOrMiss[]` set IS the Task 8.4 alias-seeding worklist (hand it to 8.4)
    - _Requirements: 13.4, 9.5_

  - [ ] 10.4 Run the LIFT baseline (post-aliases-seeding) = the hard removal gate
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Thurgood
    - **BLOCKED ON Task 8.4 (alias seeding complete) + Task 10.3.** Re-run the same oracle post-seeding
    - Hard gate: PASS iff no oracle concept is WEAK/MISS (every correct doc rank ≤ 2 at ≥ partial). `rank1StrongRate` is REPORTED as a review-if-below-~80% SIGNAL (triggers an alias-seeding review loop back to 8.4), NOT a block (Design Decision 4)
    - _Requirements: 13.4_

  - [ ] 10.5 Remove the meta-guide + drop the Documentation Directory (GATED)
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Thurgood
    - **BLOCKED ON Task 10.4 clearing the hard gate** (no WEAK/MISS) — removal permitted ONLY then
    - Remove `00-Steering Documentation Directional Priorities.md` (the leak-source artifact; the `#[[file:...]]` bulk-load was already removed in `5489b6cf` — this removes the now-purposeless file)
    - Formally drop the never-built Documentation Directory from the inclusion model (zero-cost: "do not create it"); do NOT retain the oracle as a living fallback doc (git retains the file for rollback)
    - _Requirements: 11.1, 11.2, 11.3, 11.5, 13.6_

  - [ ] 10.6 Run the NO-REGRESSION baseline (post-relocation/removal)
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Thurgood
    - **BLOCKED ON Task 10.5** (and the Task 6 relocation). Re-run the same oracle to confirm discovery did not regress vs the 10.4 lift
    - Confirm the Task 11 relocation-integrity gate still passes (no referenced `id` depends on the removed meta-guide)
    - _Requirements: 13.4, 13.6_

- [ ] 11. Relocation-Integrity Gate (119-A Exit Check)

  **Type**: Parent
  **Validation**: Tier 3 - Comprehensive (includes success criteria)

  **Success Criteria:**
  - The gate enumerates and resolves every doc `id` and still-legacy path referenced across the 8 prompts (60 legacy refs resolve via the AC3 fallback, which the gate names as its resolution mechanism); a generic "MCP healthy / N indexed" check is insufficient — pass is per-reference.
  - Identity-doc references are verified by static presence (id in locked set + file exists at `.kiro/steering/`), NOT via MCP round-trip.
  - The must-fix coupling axis asserts every Task 1.3 MUST-FIX surface is repointed to `governance/` and functional; the family-guidance health axis asserts zero new companion warnings (the 9 top-level).
  - The gate asserts the always-layer AX DESIGN exists (Task 9) but explicitly EXCLUDES manifest-build and catalog-generation; on pass it stands as 119-A's exit gate.

  **Primary Artifacts:**
  - `scripts/relocation-integrity-gate.ts` (`runRelocationIntegrityGate`, `GateResult`)

  **Completion Documentation:**
  - Detailed: `.kiro/specs/119-A-steering-relocation-serving-contract/completion/task-11-parent-completion.md`
  - Summary: `docs/specs/119-A-steering-relocation-serving-contract/task-11-summary.md`

  **Post-Completion:**
  - Mark complete: Use `taskStatus` tool to update task status
  - Run full suite: `npm test` then `tsc`; run the gate and confirm a per-reference PASS across all axes
  - Commit changes: `./.kiro/hooks/commit-task.sh "Task 11 Complete: Relocation-Integrity Gate (119-A exit)"`
  - Verify: Check GitHub for committed changes

  - [ ] 11.1 Implement the per-reference resolution axis (8 prompts, legacy + id)
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Thurgood
    - Enumerate every doc `id` and still-legacy path referenced across the 8 prompts; resolve each via the Docs MCP post-relocation (legacy via the Req 2 AC3 fallback, which the gate names as its mechanism)
    - Fail and report the specific unresolved reference(s) on any miss; a generic health check is insufficient — pass is per-reference, attributed to its `sourcePrompt`
    - This axis exercises legacy-path-manifest completeness (resolving all 60 prompt refs)
    - _Requirements: 8.1, 8.2, 8.3, 8.4_

  - [ ] 11.2 Implement the identity-presence, must-fix-coupling, and family-guidance axes
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Thurgood + Lina (cross-domain: gate machinery is Thurgood's; the family-guidance health axis reads Application-MCP `FamilyGuidanceIndexer` warnings that are Lina's domain)
    - Identity axis: verify identity-doc refs by static presence — `id` in the Req 6 AC1 locked set AND file exists at its `.kiro/steering/` path — NEVER via MCP round-trip (identity docs aren't indexed). Materialize the identity set as the in-prompt/static always-set list, NOT a build artifact (Design Decision 5)
    - Must-fix axis: for every Task 1.3 MUST-FIX surface assert repoint-to-`governance/` + functional (`sync-manifest.json` regen; `resources` doc-entries resolve; `.cursor`/`DEFAULT_STEERING_DIR`; `init`/`designerpunk.ts`; `src/figma/*`; `extract-component-meta.ts`); fail and name any unremediated surface
    - Family-guidance axis: assert zero NEW companion-path warnings (the 9 top-level FamilyGuidanceIndexer parses); note green ≠ all 22 verified (13 nested are gate-blind)
    - _Requirements: 8.5, 8.6, 8.7_

  - [ ] 11.3 Finalize gate scope + exit-criterion semantics
    **Type**: Architecture
    **Validation**: Tier 3 - Comprehensive
    **Agent**: Thurgood
    - Assert ONLY the critical-core; EXPLICITLY EXCLUDE the severable seam's far side — the gate SHALL NOT require manifest BUILD (token/component) nor capability-catalog GENERATION to be present (Req 8 AC8)
    - Assert the always-layer AX DESIGN exists (Task 9 artifact) but NOT that any manifest/catalog is built/generated
    - On pass, the gate stands as 119-A's relocation exit gate (replacing the original pre-relocation prompt-quality gate, which moves to 119-B)
    - Document the seam-as-teeth design (Req 8 AC8 + the seam invariant) and the gate's exclusions in the completion doc
    - _Requirements: 8.8, 8.9_

- [ ] 12. Conventions Governance Doc (Req 12, ballot-measure)

  **Type**: Parent
  **Validation**: Tier 3 - Comprehensive (includes success criteria)

  **Success Criteria:**
  - A governance doc documents the `id` convention (kebab-slug of title, immutable, semantically inert), the composite `docid#sectionid` grammar (section-`id` noted deferred to Gap 7), the kebab-case/no-spaces filename convention, and the `aliases` seeding guidance (discovery-plane purpose; not body-prose-indexed).
  - The doc references the build-time uniqueness guard + the Thurgood metadata hook as the `id`-invariant enforcement mechanisms.
  - The token/component Documentation Requirements clause is recorded as waived-not-applicable (119-A introduces conventions, not tokens or components).
  - The MCP-Evolution-Roadmap Gap 7 ↔ addressing-grammar cross-link is recorded (Gap 7's trigger is now firing).

  **Primary Artifacts:**
  - The conventions governance doc (new or an addition to an existing governance/process doc)
  - MCP-Evolution-Roadmap Gap 7 cross-link

  **Completion Documentation:**
  - Detailed: `.kiro/specs/119-A-steering-relocation-serving-contract/completion/task-12-parent-completion.md`
  - Summary: `docs/specs/119-A-steering-relocation-serving-contract/task-12-summary.md`

  **Post-Completion:**
  - Mark complete: Use `taskStatus` tool to update task status
  - Run full suite: `npm test`
  - Rebuild index: call `mcp__designerpunk-docs__rebuild_index` (new governance doc indexed)
  - Commit changes: `./.kiro/hooks/commit-task.sh "Task 12 Complete: Conventions Governance Doc"`
  - Verify: Check GitHub for committed changes

  - [ ] 12.1 Author the conventions governance doc (ballot-measure)
    **Type**: Setup
    **Validation**: Tier 1 - Minimal
    **Agent**: Thurgood
    - NOTE (governance ballot-measure): per the documentation-governance ballot model, this doc is shared knowledge — author the proposal, present to Peter (what/why/counter-argument/impact), apply only on approval
    - Document: the per-doc `id` convention; the composite `docid#sectionid` grammar (section-`id` deferred to Gap 7); the kebab-case/no-spaces filename convention; the `aliases` seeding guidance (discovery-plane, not body-prose-indexed)
    - Reference the build-time uniqueness guard + the Thurgood metadata hook as the `id`-invariant enforcement mechanisms
    - Record the token/component Documentation Requirements clause as waived-not-applicable (conventions, not tokens/components)
    - Record the MCP-Evolution-Roadmap Gap 7 ↔ addressing-grammar cross-link (Gap 7's "122-generated agents persisting IDs / cross-refs by ID" trigger is now firing)
    - _Requirements: 12.1, 12.2, 12.3, 2.7, 2.8_

---

## Deferred to 119-B / 122 (no tasks)

These severable rows of the § "Severable Seam Partition" get NO implementation tasks here (the seam is the task-scope boundary). Each is noted once, where a reader expects it:

- **Agent-definition `resources` decomposition/trim** into the five AXA classes → 119-B/122. (Only the relocation-break of their steering-doc entries is a 119-A task — see Task 7.3.)
- **Ground-truth manifest *build*** (token-manifest, component-manifest) → 119-B/122. (Only the per-agent manifest *design* is a 119-A task — see Task 9.1.)
- **Capability-catalog *generation*** incl. Agent-Directory → catalog migration → 119-B/122. (Only the catalog *design* + the Agent-Directory forward-reference are 119-A — Tasks 9.1, 8.1.)
- **Companion-by-`id` re-point** (option a; `FamilyGuidanceIndexer` change) → 122. (119-A uses code-free by-`governance/`-path — Task 6.2.)
- **Per-agent routing tables; certainty-calibration *formalization* + propagation; before/after measurement case study** → 119-B. (119-A lands the calibration *text* only — Task 8.2 — and records the frozen oracle as the case study's "before" anchor — Task 10.1.)
- **Section-ID embedding** (roadmap Gap 7) → grammar designed not to preclude it (Task 12.1); not implemented here.
- **R3 staleness *fixes*** (`Stemma*.ts` constants; `.claude/settings.local.json`) → separate Thurgood-led audit. (119-A triages only — Tasks 1.2, 1.3.)
- **Deeper AX investments** (doing+recording, persistent memory) → out of 119 entirely.
