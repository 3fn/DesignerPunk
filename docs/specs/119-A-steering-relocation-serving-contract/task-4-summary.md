# Task 4 Summary: Build-Time Uniqueness Guard + 89-Doc `id` Backfill Codemod

**Date**: 2026-06-29
**Purpose**: Concise summary of parent task completion (spec-level)
**Organization**: spec-summary
**Scope**: 119-A-steering-relocation-serving-contract

## What Was Done

Built the build-time `id`-uniqueness guard + the 89-doc backfill codemod, the third leg of the addressing-plane integrity machinery (with the Task 2 resolver + the Task 3 frozen manifest). `checkIdUniqueness(roots)` (core in `mcp-server/src/id-guard/check-id-uniqueness.ts`) scans the on-disk corpus across BOTH `governance/` (empty pre-relocation, handled gracefully) and `.kiro/steering/`, returning `{ ok, collisions, derived, totalDocs, exceptions }` — a derived collision is treated identically to an explicit one. It is wired "one function, two callers": the net-new `npm run check:id-uniqueness` CI step (backstop) AND the Thurgood metadata-validation hook (`scripts/validate-steering-metadata.js`, front line) invoke the SAME core. The codemod (`backfill-doc-ids.ts`) writes the derived slug as a literal `id:` into frontmatter (frontmatter-only, body untouched), HALTS on any derived collision before writing, is idempotent, and surfaces `idSource:'none'` docs as exceptions rather than writing `id: ''`. id derivation reuses the resolver's `extractFrontmatterInfo` exactly.

## Why It Matters

The literal `id:` freezes each doc's stable address on disk so the resolver never re-derives it, and the guard prevents two docs from ever claiming the same id. Critically, every backfilled id MUST equal the id Task 3 froze into the legacy-path manifest — otherwise a legacy prompt ref would silently 404 during the relocation transition window. The codemod cross-checks this after applying.

## Verified Outcome

- ✅ Guard on the live corpus: **89 docs, 0 collisions, 0 `idSource:'none'` exceptions**; pre-backfill derived worklist = 89.
- ✅ Backfill: **89 written** (75 `derived-name`, 14 `derived-h1`), 0 skipped, 0 exceptions. Second run: 0 written / 89 skipped (idempotent).
- ✅ **CRITICAL consistency cross-check: PASS** — all 33 frozen-manifest ids match the on-disk literal ids (0 mismatches).
- ✅ `git diff --numstat` over `.kiro/steering/*.md`: **89 files / 89 insertions / 0 deletions**, every added line an `id:` line — frontmatter-only, zero body churn.
- ✅ The 14 `derived-h1` docs match the Task 1 finding (incl. the 6 identity docs).
- ✅ mcp-server `tsc` clean; `npx jest --runInBand` **35 suites / 582 tests / 0 failed** (+2 suites / +13 tests).
- ✅ Root `tsc` clean; `typecheck:scripts` clean; root `npm test` **377 suites / 8990 tests / 0 failed**.

## Honest Notes

- **Hook calls the guard via the shared CLI subprocess** (the hook is `node`-only JS; the core is TS) — still exactly one `checkIdUniqueness`. Migrating the hook to TS to import directly is a clean follow-up that wouldn't change the "one function" invariant.
- **`exceptions` is additive** to the design's `IdGuardResult` shape — surfaces `idSource:'none'` docs (zero on the live corpus); does not affect `ok`/`collisions`.
- **Guard fails on collisions, not exceptions** (uniqueness vs addressability split); the backfill is what surfaces unaddressable docs.
- **Several H1-derived ids differ from the filename slug** (e.g. `Component-Family-Progress.md` → `progress-indicator-components`) — correct; the id derives from the H1, matching the resolver and the frozen manifest.

## Next

- **Not committed** — main loop re-runs both suites + tsc, rebuilds the docs index (so it serves the literal ids), spot-checks the diff + manifest consistency, and commits on `spec-119a-relocation`.
- Unblocks Task 5 (rename) / Task 6 (relocate) — the rename/relocate preserve each frozen id.
