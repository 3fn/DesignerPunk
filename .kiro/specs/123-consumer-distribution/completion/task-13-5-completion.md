# Task 13.5 completion: the orphaned-key and missing-row refusals (Lina's two of Task 13's nine checks)

**Spec**: 123 (Consumer Distribution) · **Unit**: U2b · **Parent**: Task 13 · **Agent**: Lina (Opus), tiered secondary. Thurgood (Opus) is PRIMARY.
**Date**: 2026-09-28 · **Branch**: `task/123-u2b-lina-13-4` (fast-forwarded by the orchestrator to `e81906ad`) · **Code commit**: `b88aedb7576d77bdac0c4b72045d2af2fb76c030`. This doc and the tick follow in a docs-only commit.
**Write grant**: Task 13's row.
- **Inside the grant**: the Primary Artifacts name `tools/agent-generator/derive.ts` (key checks). I created that file here with the key checks only; `derive()` itself is 15.2's (also mine).
- **Thurgood's files, on his handoff**: in `regrounding/check-catalog.ts`, only the two `test:` lines; in `check-catalog.test.ts`, only the pending-list test (its name, comment and expectation).
- **Out-of-list on a strict reading**: the new test `tools/agent-generator/__tests__/derive.keys.test.ts` (the design's named file for this bite).

**CI-provenance**: local

## Criteria rows served (tasks.md Task 13, verbatim; 13.5's share is the first two checks and completing the registry)

>   - **Nine checks, each with a named test, a recorded bite and its exact string**:
>     - orphaned key;
>     - missing row;
>     - `repo-bound-in-entirety`.
>   - Count asserted.

## What changed

- **`tools/agent-generator/derive.ts`** (new).
  - **`keyUniverse(repoRoot, source)`** reads, from the canonical source:
    - the `partition()` anchors;
    - every `entryTree()` node, and the leaves separately;
    - for the shared catalog, the member ids.
  - **`checkDispositionKeys(doc, file, universe)`** checks a dispositions file.
    - **Orphaned key**: a `body:` key must be a partition anchor; a `frontmatter:` key an entry-tree node; a `members:` key a catalog member.
    - A container key exists, so this check does not refuse it. That the key must be a leaf is 13.1's `container-key` check.
    - **Missing row**:
      - a charter file needs every body unit and every entry-tree leaf;
      - an always-set file (with `counterpart:`) needs body units only, because the identity doc's frontmatter is dropped (C19);
      - the shared file needs every member id.
    - Absence is never read as `retained`.
  - **`checkOverlayKeys`** and **`checkRecordKeys`**: orphans only. Records and overlays cover only some units, by design, so they owe no row per unit.
  - Messages come from the catalog strings, via `orphanedKeyMessage` and `missingRowMessage`.
  - `<file>` in both strings is the **canonical source**: the key "names nothing in" it, and the unit is "in" it. The finding's `file` field carries the dispositions, overlay or record path.
- **`check-catalog.ts`**: the two `test:` fields are filled. **The nine-check registry is complete: every entry names an existing test.** `check-catalog.test.ts` now asserts that the pending list is `[]`.

## Targeted tests + result

- `npx jest --config tools/agent-generator/jest.config.js tools/agent-generator/__tests__/derive.keys.test.ts tools/agent-generator/__tests__/check-catalog.test.ts` → **`Tests: 16 passed, 16 total`** (derive.keys 11, catalog 5).
- **Named tests**:
  - `derive.keys.test.ts › orphaned key (nine-check) refuses a key that names no current unit or entry, with the exact string`;
  - `derive.keys.test.ts › missing row (nine-check) refuses a unit or entry with no explicit disposition row, with the exact string`.
- **The design's bite, built into the named tests** (design § "Testing Strategy": *rename a canonical heading; drop a row → both refuse*):
  - Renaming `## Beta` to `## Gamma` gives `orphaned-key body #beta` + `missing-row body #gamma`. Exact string: `disposition/overlay key #beta names nothing in canonical/agents/twin.md — the unit was renamed or removed; re-key or delete the row`.
  - Dropping the `#alpha` row gives `#alpha in canonical/agents/twin.md has no disposition row — every unit carries an explicit row (write 'retained' if it ships as-is)`.
- **Live corpus**: every committed operative-set record keys only current units (zero orphans across 4 records).
- **Full `npm run test:agent-generator`** in this worktree → `Tests: 460 passed, 460 total` · `Test Suites: 11 failed, 30 passed, 41 total`. The same 11 suites as at 13.4 fail to **run**, because the worktree has no `mcp-server/dist`. None of them is mine; they are measured on the unit branch.
- `tsc -p tools/agent-generator`: no error in any new or edited file. Only the pre-existing `mcp-server/dist` errors remain.
- `npm run check:completion-criteria-parity` after the tick → `SUMMARY: parents evaluated 15, pass 15, fail 0; emissions 0; reds 0`.

### Bites (each mutated, run, and restored; `cmp` clean; re-run green)

| # | Mutation | Red (exact) |
|---|---|---|
| 1 | body orphans not refused | `orphaned key (nine-check) …` loses `"message": "disposition/overlay key #beta names nothing in canonical/agents/twin.md — the unit was renamed or removed; re-key or delete the row"`. 1 failed. |
| 2 | a missing body row read as retained | `missing row (nine-check) …` loses `"message": "#alpha in canonical/agents/twin.md has no disposition row — every unit carries an explicit row (write 'retained' if it ships as-is)"`. The rename test loses `"missing-row body #gamma"`. 3 failed. |
| 3 | frontmatter leaves not required | loses `"writeScope[docs/**] in canonical/agents/twin.md has no disposition row — …"`. 2 failed. |
| 4 | the registered test name drifts (`orphaned` → `orphan`) | `Expected: "orphaned-key: true"` / `Received: "orphaned-key: false"` (the catalog test). 1 failed. |

## Application-time adaptations

1. **The key checks live in `derive.ts`**, as the Primary Artifacts name it, and their test is `derive.keys.test.ts`, as the design names it. They do not go under `regrounding/`. 15.2 adds `derive()` to this file and calls these checks.
2. **`<file>` in both catalog strings is read as the canonical source.** The string says the key "names nothing in <file>" and the unit is "in <file>". The row-holding file is carried in `KeyFinding.file`.
3. **Records and overlays get orphan checks only**, never missing-row. A record covers only the units whose operative sets were confirmed, and an overlay covers only re-pointed units. C17's "every unit carries an explicit row" is a rule about dispositions files.
4. **No consumer dispositions or overlay files exist yet** (`canonical/profiles/consumer/` holds only `confirmations/`). The checks are exercised on a temp-dir charter and on the real shared catalog; the live-corpus check is over the operative-set records. **13.6 wires the record-key orphan check into the freshness sweep; the dispositions and overlay files are wired as they appear (Task 15).**
