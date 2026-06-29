# Task 6 Completion: Relocate Non-Identity Docs to `governance/` (Atomic with Companion Re-Point)

**Date**: 2026-06-29
**Task**: 6. Relocate Non-Identity Docs to `governance/` (Atomic with Companion Re-Point)
**Type**: Parent
**Status**: Complete (pending main-loop re-verification + commit)
**Agent**: Thurgood (6.1, 6.3) / Lina (6.2, family-guidance) — executed together as one atomic unit with Task 7
**Validation**: Tier 3 — Comprehensive

> Sequencing step 4 (design.md § "Sequencing"): relocation runs AFTER the resolver (Task 2), frozen legacy-path manifest (Task 3), and rename (Task 5) are live. Original `.kiro/steering/…` paths vanish here and resolve only via `legacy-fallback`. **Highest-risk op** — landed as one coherent change with Task 7 (the main loop reviews, re-verifies, rebuilds the index, spot-checks the move + companion health + resources repoint, and commits on `spec-119a-relocation`). **Not committed by me.**

---

## 6.1 — Move the 80 relocated-role docs → `governance/`

Created `governance/` at project root and moved the **80** relocated-role docs out of `.kiro/steering/`. The **9** that stay (8 identity + the removed-role meta-guide, which is deleted later in Task 10) remain in `.kiro/steering/`.

**Post-move state:**
- `.kiro/steering/` = **9** `.md`: `00-steering-documentation-directional-priorities.md` (meta-guide, removed-role, stays for now), `AI-Collaboration-Principles.md`, `Agent-Directory.md`, `Civitas-System-Overview.md`, `DesignerPunk-Systems-Overview.md`, `Spec-Feedback-Protocol.md`, `core-goals.md`, `personal-note.md`, `start-up-tasks.md`.
- `governance/` = **80** `.md`.

**History + content:**
- **79 moved via `git mv`** (history preserved). 1 file — `Component-Schema-Format.md` — was an untracked working-tree file colliding (on the case-insensitive macOS FS) with a git-tracked lowercase `component-schema-format.md`; I moved it and staged it as a tracked rename (`git rm --cached` lowercase + `git add` the new `governance/Component-Schema-Format.md`). Content byte-identical to the HEAD blob; this also normalizes its casing to the canonical capital form matching its `Component-*` siblings.
- **Content byte-unchanged**: of the 80 renames, **76 are `R100`** (byte-identical). The **4 `R099`** are the only docs with intended edits, and their diffs contain ONLY those single-line edits (verified blob-vs-blob):
  - `governance/Component-Family-Button.md`, `…-Container.md`, `…-Form-Inputs.md` — the 3 reverse-link depth fixes (`../../family-guidance/` → `../family-guidance/`, subtask 6.2).
  - `governance/DesignerPunk-Integration-Guide.md` — the Integration-Guide MCP-config template `MCP_STEERING_DIR` repoint (Task 7.2).
- The Task-4-frozen `id:` frontmatter is on disk and unchanged by the move.

**`id` backfill confirmation:** the relocation pass opened every file; the Task-4 `id:` is present on every relocated doc (spot-checked `token-governance`, `component-schema-format`, and proven en masse by the reachability harness resolving relocated docs by `id` — see below).

---

## 6.2 — Atomic family-guidance companion re-point (all 22 + README + 3 reverse-links)

Re-pointed **all 22** `companion:` values across `family-guidance/*.yaml` from `.kiro/steering/Component-Family-*.md` to `governance/Component-Family-*.md` (by-`governance/`-path, option b — code-free, NO `FamilyGuidanceIndexer` change; companion-by-`id` remains deferred to 122):
- **9 top-level** (gate-visible) + **13 nested** under `composesWithFamilies` (gate-blind / correctness-only). All 22 re-pointed — re-pointing only the 9 the gate watches would leave 13 silently broken.

Re-pointed the companion-path template in `family-guidance/README.md:32` (`.kiro/steering/` → `governance/`).

Corrected the **3 reverse-coupling** `../../family-guidance/*.yaml` links inside the now-relocated Component-Family docs (Button, Container, Form-Inputs): from `governance/` (project-root level) the depth to repo-root `family-guidance/` shortens by one (`../../` → `../`).

**Atomicity:** all of 6.2 lands in the same change as the 6.1 move (and Task 7), so component health never transiently degrades — there is no lagged-companion warning window.

**Family-guidance health (Req 8 AC6 axis):** the `FamilyGuidanceIndexer` does `path.resolve(projectRoot, guidance.companion)` + `fs.existsSync` on the **9 top-level** companions only. All 9 now resolve to existing `governance/` files (disk-truth verified). The pre-move baseline was **0 warnings**; it stays **0 new warnings**. (App-MCP `get_component_health` reports `healthy / 0 warnings`, but its live `lastIndexTime` predates the move — the authoritative check is the indexer's resolve+existsSync logic over disk, which I ran directly.)

---

## 6.3 — Rollback + idempotency

**Rollback** (relocation is the highest-risk op, Req 4 AC5): a single `git revert` of the move commit (which lands the move + companion re-point + the Task 7 `MCP_STEERING_DIR` rewire as one coherent unit) restores the prior state. Because the resolver + legacy-path fallback are live **before** the move, references resolve in BOTH the rolled-forward state (relocated docs by `id` / `governance/` indexed-key; old `.kiro/steering/…` strings via `legacy-fallback`) AND the rolled-back state (docs back in `.kiro/steering/`, indexed directly) — **no window where a revert orphans references.**

**Idempotency** (each pass re-runnable; partial failure safe to re-run rather than requiring a clean revert):
- **Move**: a second run finds the 80 docs already under `governance/` and the 9 already in `.kiro/steering/` → no-op.
- **Companion re-point**: re-pointing a `companion:` already at a `governance/` path is a no-op (the `.kiro/steering/` → `governance/` substitution finds nothing to change).
- **`id` backfill**: a re-run finds `id:` already present on every doc → skip (the Task-4 idempotency contract).

---

## Verification (run by me; main loop re-runs authoritatively)

- **The move**: `git status` shows 80 renames into `governance/` (76 `R100` byte-identical + 4 `R099` with only the intended single-line edits) + the tracked Component-Schema-Format rename; `.kiro/steering/` = 9 files (named above); `governance/` = 80.
- **Reachability (direct `DocumentIndexer` against `governance/`, relative keying + source frozen-manifest seed)**: relocated docs resolve by `id` (`token-governance`, `test-development-standards`, `component-family-button`, `rosetta-system-architecture`, `platform-implementation-guidelines`, `stemma-system-principles` → `strategy:'id'`); `governance/Token-Governance.md` → `strategy:'indexed-key'`; legacy `.kiro/steering/Token-Governance.md`, `…/Completion Documentation Guide.md`, `…/Browser Distribution Guide.md` → `strategy:'legacy-fallback'` to the correct `governance/` keys + ids.
- **Family-guidance**: all 9 top-level companions resolve to existing `governance/` files → 0 new warnings.
- **Full suites** (see Task 7 completion for the consolidated run): root `npm test` **377 suites / 8990 tests / 0 failed**; mcp-server `35 suites / 582 tests`; root + scripts + mcp-server `tsc` all clean.

## Honest Notes

- **Live MCP server is stale** (predates the Task 2 resolver / Task 3 seeding); it will not reflect `DEFAULT_STEERING_DIR=governance/` until **restarted** (not just `rebuild_index`). Reachability was therefore proven by instantiating `DocumentIndexer` directly (as prior tasks did). The Task 11 gate does the authoritative end-to-end check.
- **Frozen legacy-path manifest is not copied into `dist/`** (`tsc` doesn't copy `.json`; `FROZEN_MANIFEST_PATH` uses `__dirname`). The compiled server therefore has an empty legacy index until that JSON is packaged. This is a **pre-existing packaging detail**, not introduced here — flagged for the Task 11 gate / build owner. My reachability proof pointed the indexer at the source manifest via `setLegacyManifestPath` to exercise the fallback.
- **The 13 nested companions are gate-blind**: a green family-guidance axis means "the 9 top-level resolve," NOT "all 22 verified." I re-pointed all 22 for correctness; the axis cannot attest to the 13.
