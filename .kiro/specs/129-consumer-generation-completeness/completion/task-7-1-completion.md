# Task 7.1 Completion: Mark the sentences; teach the test; re-derive INSTALL

**Date**: 2026-11-07
**Task**: 7.1 (Spec 129, Unit 2, parent 7)
**Agent**: Thurgood (Sonnet, as planned); Ada consulted, as the subtask names, with Lina, Kenya and Data (`feedback/tasks.md` § "Unit 2, Task 7.1")
**Branch**: `task/129-comparator-guard-markers`, from `main` @ `74d7566f5`

## 1. What changed

- **The Guide.** `governance/DesignerPunk-Integration-Guide.md` gains 17 `<!-- limitation: .kiro/issues/<file>.md -->` markers on 16 sentences of the install region, each naming the record whose archival makes its sentence false, as Ada and Lina ruled (`feedback/tasks.md`, `[THURGOOD U2 R2]`). A16 is split into two sentences so each half has its own record. Lina's rewrite of the "does not parse" clause is spliced at L164 and L173.
- **The deriver.** `scripts/derive-install-doc.ts` strips the markers (and the space before each) when it derives `INSTALL.md`, and exports `checkLimitationMarkers`, which fails a marked record that is under `archive/` or missing, a marker not of the form, and a marker outside the region.
- **The test.** `scripts/__tests__/install-doc.test.ts` gains 12 cases: the archived and missing records on a fixture issues tree, the malformed and outside-region markers, the real guide, the strip, and no marker in `INSTALL.md`. The existing `region()` helper now returns the reader-facing (stripped) text, and the region-verbatim case compares the stripped region.
- **`docs/consumer/INSTALL.md`** re-derived: three lines differ from before, Lina's two rewrites and A16's split; no marker appears in it.

## 2. Targeted tests run

- `npx jest --config scripts/jest.config.js scripts/__tests__/install-doc.test.ts` → 81 passed (69 before; 12 new).
- **Red once.** With `.kiro/issues/2026-08-13-component-token-platform-references-noncompiling.md` moved temporarily into `archive/` and nothing else changed, the case "the guide in this repository has no marked record that is archived or missing while its sentence remains" failed with `region line 148: .kiro/issues/2026-08-13-component-token-platform-references-noncompiling.md is under archive/ and its sentence remains`. I moved the record back; `git status .kiro/issues` is clean. The fixture cases carry the same two outcomes permanently.
- `npm run test:scripts` → 32 suites, 1349 tests passed. `npx tsc -p tsconfig.scripts.json --noEmit` → no errors.
- `cd mcp-server && npx jest` → 48 suites, 765 passed (the docs MCP reads the Guide). `npx tsx scripts/check-section-citations.ts` → PASS.

## 3. Application-time adaptations

1. **`region()` in the test now strips markers.** The scope-sentence case compared the region's first paragraph to a fixed string and failed once the marker followed it. The helper stands for the text a reader of INSTALL.md sees, so stripping there is its meaning, not a loosening; the byte-for-byte identity case still holds `INSTALL.md` equal to the derivation.
2. **A16 split into two sentences**, which the plan did not name. Ada ruled the halves go false at different units; one marker per sentence needs one sentence per half. The meaning is unchanged.
3. **The checker is in `derive-install-doc.ts`, not the test file**, so the deriver and the checker share one marker pattern.
