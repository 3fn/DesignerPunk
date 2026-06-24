# Spec 118 → Spec 117 Closeout Note

**Date**: 2026-06-24
**Author**: Thurgood (Spec 118 — the 117↔118 relationship)
**Status**: Authoritative correction — supersedes decision-record **items 3 & 7** (both marked "⚠ SUPERSEDED PENDING SPEC 118")
**Source**: Spec 118 Increment 1 (Tasks 1–3), committed `041aaea8`. See 118 § "Relationship to Spec 117" + Decision 4, and 118 `findings/loader-selection.md`.

---

## Purpose

Spec 117's decision-record items 3 and 7 were marked "⚠ SUPERSEDED PENDING SPEC 118," deferring their authoritative correction to a Spec 118 subtask (118 Decision 4). **Spec 118 Increment 1 is now complete; this note is that correction.** It does not rewrite 117 in place — the original items stand as historical record, and this note supersedes them.

## What was empirically false (item 3)

Item 3 held that the broken documented `generate` CLI was caused by a one-line directory import (`designerpunk.config.ts:16`, `'./src/config'` → `'./src/config/index.ts'`), and that fixing that one-liner was the verification prerequisite for Task 5.3.

**That premise is false.** Spec 118 confirmed empirically (resolution-matrix harness — 118 `findings/loader-selection.md`) that the one-liner only **relocates the failure one hop down the barrel chain**. The real blocker was deeper: `loadConfig` used a raw `await import()` of the `.ts` config with no TS-aware resolution, so the config and its transitive relative raw-`.ts` imports failed under Node's strict-ESM resolver. The one-liner addresses none of that.

## What actually unblocks the documented CLI (Spec 118 Increment 1)

Two barriers, both fixed in Increment 1:

1. **The config-load primitive (Task 2).** `loadConfig` now uses a TS-aware loader — **Approach A** (`tsx/cjs/api` namespaced `register` + scoped `require` + mandatory `unregister`), selected empirically in Task 1 (`tsImport` failed from `loadConfig`'s CJS host). It resolves the `.ts` config and its transitive relative raw-`.ts` imports, carrying its own resolution and assuming no ambient loader.
2. **The `./config` package export (Task 3, "Option C").** The documented config does `import { defineConfig } from '@3fn/core/config'`. `./config` was `import`-only, so Approach A's CJS `require` failed with `ERR_PACKAGE_PATH_NOT_EXPORTED`. A `require` condition was added (→ the existing CJS `dist/config/index.js`).

With both, the **documented consumer workflow now runs end-to-end** — verified by the Spec 118 consumer-guard subprocess test: `init` → config (importing `@3fn/core/config`) → `npx designerpunk generate` → 217 tokens × 3 platforms, no errors. **117's documented-CLI generation path is now executable.**

## Action for Spec 117 — re-run your own trust gate

Spec 118 makes 117's **Task 5.3** documented-CLI verification *executable*; it does **not** lift 117's provisional status on 117's behalf. **117 should re-run its own Task 5.3** (documented-CLI generation-integrity verification) and, if it passes, certify **non-provisionally**.

## Scope of restored trust — config-load path ONLY

Restored trust is scoped to the **config-load + documented-`generate` path**, which Increment 1 makes work. **Still unverified:** the **raw-`.ts` package exports** — `./blend` (`src/blend/index.ts`), `./build` (`src/build/tokens/index.ts`), `./types` (`src/types/index.ts`) — which remain raw `.ts` and unreconciled until **Spec 118 Increment 3b**.

Precision: `./config` is **no longer** among the unverified exports — it was resolved in Increment 1 (above). 117's `generate` path runs end-to-end without depending on the raw-`.ts` subpaths at runtime; but any runtime consumer of `./blend`/`./build`/`./types` stays unverified until 3b. So 117 may certify the documented-generate path non-provisionally; the raw-`.ts` exports surface is out of 117's renewed scope and is tracked to Spec 118 Increment 3b.

## What this note does NOT do

- It does not assert 117's readiness — 117 re-runs its own Task 5.3.
- It does not rewrite decision-record items 3/7 in place; they stand as historical record (with their "superseded pending 118" markers), and this note is the correction they point to.
