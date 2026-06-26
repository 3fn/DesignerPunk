# Task 2 Completion: Token-Index Ordering Spike (GATES Task 3)

**Date**: 2026-06-26
**Task**: 2 — Token-index ordering spike; determine where deterministic order is imposed so the regenerated `components.yaml` reproduces the committed ordering (R6)
**Type**: Architecture
**Status**: **DONE** — decision made and feeds Task 3.2.
**Validation Tier**: Tier 2 — Standard
**Agent**: Ada
**Branch**: `spec-118-module-resolution-coherence`

---

## The question this spike answered

Before the harvest is written, where (if anywhere) must a deterministic order be imposed so the regenerated `token-index/components.yaml` is value- AND order-identical to the committed file (R6)? The design offered two candidates: sort the harvested array before `registerBatch`, or sort in `generateTokenIndex`.

## Outcome: the committed order is directory-scan order, NOT a sort

The committed `components.yaml` ordering rule was identified by testing each candidate against the committed 33-token sequence:

| Candidate | Matches committed? | Verdict |
|---|---|---|
| Alphabetical by `name` | No (committed leads with Progress, not Avatar) | Falsified |
| By `component` then `name` | No (same alpha-first problem) | Falsified |
| **Directory-scan order** (Source 1 then Source 2, `readdirSync` recursive, branded-only, authored intra-file order) | **Yes — exact** | **Confirmed** |

The mechanism: **Source 1** (`{tokenSourceRoot}/component/`) emits `progress.ts` first; then **Source 2** (config `componentTokens` dirs) scans `src/components/core` recursively in `readdirSync` order, filtered to files that actually call `defineComponentTokens`, yielding Avatar → BadgeLabelBase → ButtonIcon → VerticalListItem → InputCheckbox → InputRadio. Intra-component order is **authored array order** (`sm/md/lg`, not alphabetical `lg/md/sm`) — which also falsifies any sort. `generateTokenIndex.ts` iterates in array order with no sort; `getAll()` is Map-insertion order; `yaml.dump` emits insertion order.

## DECISION: preserve scan order — do NOT sort

The harvest (Task 3.2) must reproduce today's traversal: Source-1-then-Source-2 sequence, `readdirSync` order per directory, brand filter as the set filter (unbranded files harvest to zero — exactly reproducing today's "no side effect = no registration" exclusion), dedupe re-export aliases first-seen-wins, register in traversal order. **No explicit sort key is introduced.** A sort by `name` or `component+name` would reorder to alphabetical and break the R6 `git diff` gate.

**This overturned the pre-spike lean.** Ada's pre-spike review leaned toward a stable sort (it would make `getAll()` deterministic for all consumers, independent of filesystem traversal). The evidence overturned that lean: the committed reference file is in scan order, so sorting would guarantee a non-empty diff and fail R6 unless `components.yaml` were deliberately re-baselined in sorted order — a separate, conscious decision that cannot be smuggled into the "reproduce committed" gate.

## Counter-argument carried forward (the honest caveat)

A stable sort would decouple the gate from `readdirSync`'s platform behavior — more robust long-term. `readdirSync` order is not POSIX-guaranteed across all filesystems; on this dev/CI filesystem (macOS/APFS) it returns lexicographic order, and the committed file was produced the same way, so the dependency is **pre-existing, not a 124 regression**. If CI ever runs on a filesystem with different `readdirSync` order, preserve-scan-order would break the gate there and the sorted-canonical alternative would be the mitigation. **Seeded as a latent follow-up** (token-index filesystem-ordering portability) — not pursued in 124, which deliberately keeps R6 a pure no-op.

## Watch item handed to Task 3

Multi-`defineComponentTokens` files (Avatar = 3 calls; Badge-Label, Button-Icon, Button-VerticalList-Item, progress.ts = 2 each): the harvest now orders intra-file by `Object.values(mod)` enumeration (declaration order) rather than call order. These normally coincide, but the R6 `git diff` assertion in Task 3 is the catch if any shift occurs.

## Verification

- `readdirSync('src/components/core')` two-call identical (stable); already lexicographic on this filesystem.
- Ordering rule confirmed exact against the committed file (component-group sequence + full token-name sequence captured verbatim in the finding).
- Baseline (`tsc`/`build` green; `generate` = 0 due to the 118 split) recorded.

## Artifacts

`findings/r6-ordering-spike.md` (full spike); references to `src/generators/generateTokenIndex.ts`, `src/registries/ComponentTokenRegistry.ts`, `src/cli/loadComponentTokens.ts`, `designerpunk.config.ts`. _Requirements: 6.3._
