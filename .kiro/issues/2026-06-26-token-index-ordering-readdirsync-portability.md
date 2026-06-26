# Issue: Token-Index Ordering Ties to `readdirSync`/Filesystem Order (Portability)

**Date**: 2026-06-26
**Severity**: Low — latent portability risk; no current breakage (the committed `token-index/` reproduces on the dev/CI filesystem)
**Discovered during**: Spec 124 Task 2 (R6 token-index ordering spike) — `findings/r6-ordering-spike.md`
**Type**: Token-index determinism / filesystem-order dependency
**Status**: Open (seeded; deliberately not pursued in 124)
**Primary owner**: Ada (Rosetta token-index pipeline) — to pursue only as a deliberate, separate re-baseline decision

---

## Problem

The committed `token-index/components.yaml` order is **directory-scan order, not a stable sort**: Source 1 (`{tokenSourceRoot}/component/`, `readdirSync` order) first, then Source 2 (config `componentTokens` dirs, each `scanForTokenFiles` recursive in `readdirSync` order), brand-filtered, with authored intra-file array order preserved. The generator (`generateTokenIndex.ts`) iterates in array order with no sort; `getAll()` is Map-insertion order; `yaml.dump` emits insertion order.

`readdirSync` order is **not guaranteed by POSIX** across all filesystems. On the current dev/CI filesystem (macOS/APFS) it returns lexicographic order and is stable (verified two-call identical), and the committed file was produced the same way — so today there is no breakage. But if CI ever runs on a filesystem with different `readdirSync` order, the regenerated `components.yaml` would reorder and the R6 `git diff`-empty gate would fail there.

## Why 124 Did NOT Fix This

Spec 124 deliberately **preserves scan order and introduces no sort key**, so that R6 (regenerate → `git diff token-index/` empty) is a pure no-op against the committed reference. Imposing a canonical sorted order would guarantee a non-empty diff against the current committed file and break R6 — unless `components.yaml` is **re-committed in sorted order as a deliberate, separate decision**. That re-baseline cannot be smuggled into the "reproduce committed" gate, so it was scoped out. (See the Task 2 finding's Section 3 counter-argument.)

## Correct Fix (if pursued)

1. Impose a deterministic canonical sort (e.g. by `component` then authored token order, or a documented stable key) in the harvest or in `generateTokenIndex`.
2. **Re-baseline** `token-index/components.yaml` in that sorted order as an explicit committed change.
3. Update any order-dependent assertions / R6-style gates to the new canonical order.

This decouples the committed index from `readdirSync`'s platform behavior — more portable long-term — but is a conscious re-baseline, not a no-op refactor.

## Notes

- This is a **pre-existing** dependency the repo already had (the committed file was produced via the same scan order); not a Spec 124 regression.
- Recommend Peter/Ada decide whether portability robustness warrants the re-baseline before any cross-filesystem CI is introduced.
