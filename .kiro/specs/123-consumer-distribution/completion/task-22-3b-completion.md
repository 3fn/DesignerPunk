# Task 22.3b Completion — Packaging: U3's `files[]` lines, `pack-assert` rows, the `src/cli/templates/**` exact set

**Date**: 2026-10-12
**Agent**: Ada (Sonnet) · FK-2 (a): one author for every packaging hunk.
**Branch**: `task/123-u3-onboarding`, after `464a748dc`. **Instruments block**: `completion/task-22-instruments.md` rows 15.1, 15.2; `task-21-instruments.md` row 4.2; `task-20-instruments.md` row 7.3 (each resolved in the row).
**Delegated-tier**: plan held (subtask; no parent line owed).

## What changed

- `package.json` L32–33: `files[]` gains `docs/consumer/INSTALL.md` and `docs/consumer/COMMIT-POLICY.md`, explicit paths, directly after the `src/cli/templates/` entry. No `docs/consumer/**` glob. No `files[]` line for any template (they ship through the existing `src/cli/templates/` entry, per FK-1 (b) and Task 21).
- `scripts/pack-assert.ts`:
  - L365 `SHIPPED_CONSUMER_DOCS` (the two docs); L372–382 `SHIPPED_CLI_TEMPLATES` — the **explicit expected list**, hand-written, never derived from the tree (nine files); L385 `U3_TEMPLATE_ADDS` (the list minus `mcp-config.json.template`, which already has a declared-floor row).
  - L405–407: one `deferred ADD present: <path>` row per consumer doc and per U3 template/scaffold/starter-spec file (2 + 8 = 10 rows), section 9, outside the >= 14 `publish path:` floor.
  - L409–414: one `deferred exact set: the packed set under src/cli/templates/ equals exactly the 9 expected files` row.
  - L474 `templatesSetDiff` (exported; shaped like `steeringSetDiff`).
- `scripts/__tests__/pack-assert.test.ts` L217+: 5 cases for `templatesSetDiff` (list equals the nine files; green on the exact set ignoring other paths; BITES on a stray top-level / nested / `.bak` file; BITES on each of three dropped files; BITES on a rename (both halves) and on an empty directory).

### The expected list (nine files)

`mcp-config.json.template` · `personal-note.template.md` · `personal-note.example.md` · `product/overview.yaml` · `product/experience-map/pages/example-home.yaml` · `product/templates/home-layout.yaml` · `starter-specs/ci-needs/needs.md` · `starter-specs/ci-needs/tasks.md` · `starter-specs/regrounding/tasks.md` (all under `src/cli/templates/`). Matches `find src/cli/templates -type f` on the branch (VERIFIED-RUN).

## Bites (VERIFIED-RUN, `npx tsx scripts/pack-assert.ts`, a real `npm pack --dry-run` listing; each tree edit reverted)

| Perturbation | Result |
|---|---|
| none | `deferred exact set … PASS`; 102/105 (the 3 failures are the contamination below) |
| stray `src/cli/templates/stray.md` | `FAIL: deferred exact set … unexpected: [src/cli/templates/stray.md]` |
| stray nested `src/cli/templates/product/notes/d.yaml` | `FAIL: deferred exact set … unexpected: [… product/notes/d.yaml]` |
| `starter-specs/regrounding/tasks.md` moved away | `FAIL: deferred ADD present: …regrounding/tasks.md` **and** `FAIL: deferred exact set … missing: […]` |
| `docs/consumer/COMMIT-POLICY.md` line deleted from `files[]` | `FAIL: deferred ADD present: docs/consumer/COMMIT-POLICY.md` |

## Targeted tests and result

- `npm run test:scripts`: 18 suites, **404 passed** (399 + the 5 new). VERIFIED-RUN.
- `npm run test:pack-contents` (packs with `prepack`): **exit 1, 102/105**. All 10 new ADD-present rows and the exact-set row PASS in the real tarball. The 3 FAILs are the `publish path:` working-checkout contamination — `no leftover dist/ files` (62), `application-mcp.js` and `docs-mcp.js` nested roots — the 15.0.0 in-repo-generate class (`.kiro/issues/2026-10-01-in-repo-generate-output-contaminates-package-dist.md`); the same three fail on the stashed baseline (`91/94`, VERIFIED-RUN). Section 10 is meaningful only from a hermetic build; none of the three is in 22.3b's scope.
- `npm run test:consumer`: 53 passed, 1 skipped (pre-existing), 0 failed. `npx tsc --noEmit`: clean. VERIFIED-RUN.
- Not run: root `npm test` (no `src/` file or Jest-visible test changed; `pack-assert.test.ts` runs in `test:scripts`), the MCP sub-suites. `docs/tokens.css` was dirtied by the prepack builds and reverted both times.

## Application-time adaptations

- `mcp-config.json.template` is in the exact set (it is a file in the directory) but has no new ADD-present row; it keeps its declared-floor row (`pack-assert.ts` section 2). Judgment call, recorded.
- Noted, not fixed: the Jest preset maps `@3fn/core/blend|types|testing|config` to unshipped `src/**/index.ts` (#300's records). The exact set does not touch or expose it.
- No fork on scope: the plan names `src/cli/templates/**` only for the exact set (design L275; tasks.md 22.3b / FK-2).
