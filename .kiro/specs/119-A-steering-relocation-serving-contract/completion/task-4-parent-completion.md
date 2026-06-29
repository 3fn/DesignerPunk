# Task 4 Completion: Build-Time Uniqueness Guard + 89-Doc `id` Backfill Codemod

**Date**: 2026-06-29
**Task**: 4. Build-Time Uniqueness Guard + 89-Doc `id` Backfill Codemod
**Type**: Parent
**Status**: Complete (pending main-loop re-verification + commit)
**Agent**: Thurgood / Docs-MCP infra
**Validation**: Tier 3 — Comprehensive

> The third leg of the addressing-plane integrity machinery (with the Task 2 resolver + the Task 3 frozen manifest). `checkIdUniqueness` is the build-time guard; the backfill codemod freezes the derived slug onto disk as a literal `id:` so the resolver never re-derives. **Not committed** — the main loop reviews, re-verifies, rebuilds the index, and commits on `spec-119a-relocation`.

---

## Artifacts Created / Modified

**Created:**
- `mcp-server/src/id-guard/check-id-uniqueness.ts` — **guard core** (testable): `checkIdUniqueness(roots, projectRoot): IdGuardResult`, plus factored helpers `scanCorpus` (reads both roots, reuses `extractFrontmatterInfo`) and `verdictFromScan` (collision/derived/exception classification). Exports `STEERING_ROOTS = ['governance', '.kiro/steering']`.
- `mcp-server/src/id-guard/backfill-doc-ids.ts` — **codemod core** (testable): `backfillDocIds(roots, projectRoot, {dryRun})`, `insertIdIntoFrontmatter` (frontmatter-only insertion after the opening fence), `BackfillCollisionError` (HALT). Runs guard semantics over PROJECTED post-write corpus before any write.
- `mcp-server/src/id-guard/manifest-consistency.ts` — the **CRITICAL cross-check**: `crossCheckManifestConsistency(entries, projectRoot)` asserts every frozen-manifest id equals the on-disk literal id.
- `mcp-server/src/id-guard/__tests__/check-id-uniqueness.test.ts` — guard unit tests (8 tests).
- `mcp-server/src/id-guard/__tests__/backfill-doc-ids.test.ts` — codemod unit tests (5 tests).
- `scripts/check-id-uniqueness.ts` — thin `tsx` CLI wrapper over the guard core (the CI backstop leg).
- `scripts/backfill-doc-ids.ts` — thin `tsx` CLI wrapper over the codemod core (runs the manifest cross-check after applying).

**Modified:**
- `package.json` — net-new `check:id-uniqueness` script (`tsx scripts/check-id-uniqueness.ts`).
- `.github/workflows/consumer-guard.yml` — net-new CI step "id uniqueness guard (Spec 119-A Task 4.2)" running `npm run check:id-uniqueness` (the standing CI home; no separate workflow).
- `scripts/validate-steering-metadata.js` — the Thurgood metadata-validation hook now invokes the SAME guard (via the shared CLI) as part of doc create/modify validation; blocks if EITHER metadata validation OR the uniqueness guard fails.
- **89 `.kiro/steering/*.md` files** — each gained exactly one frontmatter `id:` line (zero body churn).

---

## 4.1 — `checkIdUniqueness` over both on-disk roots

`checkIdUniqueness(roots, projectRoot)` scans the on-disk corpus across BOTH `governance/` (does not exist yet — a missing root is treated as empty, not an error) and `.kiro/steering/`. These are **filesystem paths**, distinct from the resolver's indexed keys. It returns `{ ok, collisions, derived, totalDocs, exceptions }`:

- **`collisions`**: `id → [relPaths]` for any id claimed by >1 doc. A **derived collision is treated IDENTICALLY to an explicit one** — `verdictFromScan` keys on the resolved id regardless of `idSource`, so a `name:`-slug clash and an explicit `id:` clash both fail. A derived id colliding with an already-explicit id is also caught.
- **`derived`**: relPaths of docs whose id is `derived-name`/`derived-h1` (no on-disk `id:`) — the backfill worklist.
- **`totalDocs`**: 89 on the current corpus.
- **`exceptions`** (additive to the design's `IdGuardResult`): relPaths of `idSource:'none'` docs — surfaced, never treated as a collision under `''`.

**id derivation reuses the resolver's exactly** (`extractFrontmatterInfo` — explicit `id:` → slug of `name:` → slug of H1 → none), the SAME logic the Task 2 parser and Task 3 producer use. The guard never reinvents slug logic.

**Unit-tested**: explicit collision; derived collision; derived-vs-explicit mixed collision; derived worklist output (excludes already-frozen docs); `totalDocs`; graceful missing `governance/` root; `idSource:'none'` exception surfacing (never `id: ''`); and `checkIdUniqueness === verdictFromScan(scanCorpus(...))`.

## 4.2 — Wire the guard into CI + the Thurgood metadata hook (one function, two callers)

- **CI (net-new backstop):** `npm run check:id-uniqueness` → `tsx scripts/check-id-uniqueness.ts` → the shared `checkIdUniqueness` core. Wired as a step in `consumer-guard.yml` (the standing CI lane; design B1 — there was no existing steering build step to hang it on, so this is net-new).
- **Hook (day-to-day front line):** `scripts/validate-steering-metadata.js` runs under `node` (not tsx), so it invokes the SAME shared core through the same CLI (`npx tsx scripts/check-id-uniqueness.ts`) as a subprocess and blocks on a non-zero exit. **"One function, two callers" is literal** — there is exactly one `checkIdUniqueness` implementation in `mcp-server/src/id-guard/`, invoked from both the npm script AND the hook. No second copy of the uniqueness logic exists.

The hook now exits non-zero if EITHER metadata validation OR the uniqueness guard fails (verified: with the corpus clean, the full hook exits 0).

## 4.3 — Run the 89-doc `id` backfill codemod (idempotent, collision-halting)

- **Reader-before-writer honored**: the Task 2.1 reader is live, so the idempotency skip works.
- **Collision-surfacing duty (design B2)**: before any write, the codemod builds the PROJECTED post-write corpus (every `derived-*` doc re-marked as `frontmatter`, i.e. as-if its id were already frozen) and runs `verdictFromScan` over it. On any collision it throws `BackfillCollisionError` (HALT), emitting both colliding paths — **never writes colliding `id:` values**. On the live corpus there were zero collisions, so it proceeded.
- **Frontmatter-only**: `insertIdIntoFrontmatter` inserts the `id:` line immediately after the opening `---` fence; the body is provably untouched (unit-tested byte-for-byte).
- **Idempotent**: a second run finds `idSource:'frontmatter'` on all 89 and skips (verified: run 2 = 0 written / 89 skipped / `changed:false`).
- **`idSource:'none'` exceptions**: surfaced as exceptions, never written `id: ''`. On the live corpus there were **zero** such docs.

---

## (b) `checkIdUniqueness` result on the current corpus

| Field | Value |
|-------|-------|
| `totalDocs` | **89** |
| `collisions` | **none** (`ok: true`) |
| `derived` worklist size (pre-backfill) | **89** (every doc lacked an on-disk `id:`) |
| `exceptions` (`idSource:'none'`) | **0** |
| post-backfill `derived` | **0** (all 89 now frozen) |

## (c) Backfill stats + frontmatter-only confirmation

- **Written**: 89 (75 `derived-name`, 14 `derived-h1`).
- **Skipped**: 0 (first run); 89 (second run — idempotency proof).
- **Exceptions**: 0.
- **`git diff --numstat` over `.kiro/steering/*.md`**: **89 files, 89 insertions, 0 deletions** — every file exactly `1 +` / `0 -`. A grep over all added content lines confirms **every added line is an `id:` line** (zero non-`id:` additions). No body churn.

## (d) CRITICAL frozen-manifest consistency cross-check — PASS

After applying, the codemod cross-checked all **33** frozen `legacy-path-manifest.json` entries against the on-disk literal ids: **every manifest id exactly equals the backfilled literal id (RESULT: PASS, 0 mismatches)**. The failure mode the guard prevents — a legacy prompt ref forwarding to a stale/missing id and silently 404ing during the transition window — does not occur. This holds because the backfill derives ids with the SAME `extractFrontmatterInfo` logic the Task 3 producer used to freeze the manifest.

## (e) H1-fallback docs + `idSource:'none'` exceptions

**14 docs hit the H1 fallback (`derived-h1`)** — exactly the Task 1 finding (14 lack a `name:` field, 6 of them identity docs):

| Doc | id | Identity? |
|-----|-----|-----------|
| `00-Steering Documentation Directional Priorities.md` | `steering-documentation-directional-priorities` | |
| `A Vision of the Future.md` | `a-vision-of-the-future` | |
| `Agent-Directory.md` | `agent-directory` | identity |
| `AI-Collaboration-Principles.md` | `ai-collaboration-principles` | identity |
| `Civitas-System-Overview.md` | `civitas-system-overview` | identity |
| `Component-Family-Progress.md` | `progress-indicator-components` | |
| `Component-MCP-Document-Template.md` | `mcp-component-family-document-template` | |
| `Component-Primitive-vs-Semantic-Philosophy.md` | `primitive-vs-semantic-usage-philosophy` | |
| `Component-Templates.md` | `component-family-templates` | |
| `Core Goals.md` | `core-goals` | identity |
| `Personal Note.md` | `personal-note` | identity |
| `Process-Integration-Methodology.md` | `integration-methodology` | |
| `Release Management System.md` | `release-management-system` | |
| `Spec-Feedback-Protocol.md` | `spec-feedback-protocol` | identity |

The 6 identity docs (Agent-Directory, AI-Collaboration-Principles, Civitas-System-Overview, Core Goals, Personal Note, Spec-Feedback-Protocol) match the brief's count. Note several H1-derived ids differ from the filename slug (e.g. `Component-Family-Progress.md` → `progress-indicator-components`, `Process-Integration-Methodology.md` → `integration-methodology`) — correct: the id derives from the H1, which is what the resolver indexes, and these match the frozen manifest where present.

**`idSource:'none'` exceptions: NONE.** Every one of the 89 docs yielded a derivable id (either `name:` or a usable H1). No doc was written `id: ''`, and there were no exceptions to adjudicate.

## (f) Validation (Tier 3: Comprehensive) — run by me

- ✅ **mcp-server** `tsc --noEmit` clean (exit 0).
- ✅ **mcp-server** `npx jest --runInBand`: **35 suites / 582 tests / 0 failed** (baseline after Task 3: 33/569; +2 suites / +13 tests = the new id-guard units). Serial run — the known pre-existing parallel-only `test-fixtures` teardown flake did not recur.
- ✅ **Root** `tsc --noEmit --skipLibCheck` clean (exit 0).
- ✅ **`npm run typecheck:scripts`** clean (exit 0) — the new `scripts/check-id-uniqueness.ts` + `scripts/backfill-doc-ids.ts` typecheck under `tsconfig.scripts.json` (the CI typecheck-gate).
- ✅ **Root** `npm test`: **377 suites / 8990 tests / 0 failed** — identical to the Task 3 baseline (the backfill is frontmatter-only; the root suite does not assert `id:`).
- ✅ **`npm run check:id-uniqueness`**: PASS (89 docs, 0 collisions).
- ✅ **Hook end-to-end**: `node scripts/validate-steering-metadata.js` exits 0 (metadata 0 errors + id-guard PASS); the guard leg is invoked through the shared core.

---

## Requirements Compliance

- ✅ Req 2.1 — literal `id:` backfilled into the 89 docs from the `idSource` worklist (derived slug frozen on disk); reader-before-writer honored.
- ✅ Req 2.5 — `checkIdUniqueness` fails on any explicit-or-derived id collision, naming all colliding paths; the codemod runs the same semantics over planned writes and HALTS on a derived collision.
- ✅ Req 2.6 — the same `checkIdUniqueness` is wired into the Thurgood metadata-validation hook (front line) AND the net-new CI script (backstop) — one function, two callers.

---

## Honest Notes / Re-verify in the main loop

1. **Hook invokes the guard via the shared CLI subprocess, not a direct JS import.** `validate-steering-metadata.js` runs under `node`; the guard core is TypeScript in `mcp-server/src/id-guard/`. The faithful, non-duplicating way to honor "one function, two callers" from a `.js` hook is to shell out to the same `tsx scripts/check-id-uniqueness.ts` the CI leg runs — there is still exactly one `checkIdUniqueness` implementation. If you'd prefer the hook to be migrated to TS and import the core directly, that's a clean follow-up, but it would not change the "one function" invariant. The subprocess approach also keeps the hook's `node`-only runtime unchanged.
2. **`exceptions` is an additive field on `IdGuardResult`** beyond the design's `{ ok, collisions, derived, totalDocs }`. It does not change `ok` or `collisions`; it surfaces `idSource:'none'` docs for visibility/adjudication (zero on the live corpus). If you want the guard's contract to stay byte-for-byte the design shape, drop the field — but it is the cleanest place to surface the Task 1 "unaddressable doc" exception channel.
3. **The guard's CLI does NOT fail on exceptions, only on collisions.** Exceptions are reported (and would be a backfill/adjudication concern). On the live corpus there are none, so this is moot today — but if a future doc lands with no `name:`/H1, the guard stays green while the backfill surfaces it. Confirm that's the intended split (guard = uniqueness; backfill = addressability).
4. **89 derived, 0 already-frozen** — correct: this is the first time any steering doc carries a literal `id:` (pre-task grep found 0). The Task 3 manifest's ids were derived-not-frozen, which is exactly why the consistency cross-check matters and why it passes.
5. **Index not yet rebuilt.** The 89 docs now carry a literal `id:`; the docs index should be rebuilt so it serves the literal ids (the parser already derived the same value, so behavior is unchanged, but the `idSource` flips to `frontmatter`). Per the brief, the main loop calls `rebuild_index`.
6. **`governance/` does not exist yet** — the guard/codemod scan it as empty (graceful). The backfill happens pre-relocation per the sequencing; the Task 6 rename/relocate preserves each id.

## Related Documentation

- [Task 4 Summary](../../../../docs/specs/119-A-steering-relocation-serving-contract/task-4-summary.md)
