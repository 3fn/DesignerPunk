# Task 23.1 Completion: Predicate + guard + bite

**Spec**: 123-consumer-distribution · **Unit**: U4 (`task/123-u4-content`) · **Agent**: Thurgood (Sonnet) · **Date**: 2026-10-13
**Instruments block**: `.kiro/specs/123-consumer-distribution/completion/task-23-instruments.md` (rows 1.4–1.8, 2.1–2.6, 3.1)

## What changed

- **`scripts/audience-banner/predicate.ts`** (new). One module holds the whole convention:
  - Ada's predicate, byte-exact: `PREDICATE_STRINGS` = `complete-task\.sh`, `Peter merges`, `RATIFIED`, `ballot`; `PREDICATE_ERE` is the `grep -E` pattern as Req 20.3 prints it; `matchesPredicate(text)`; the scan scope `SCAN_SCOPE = 'governance/*.md'`; `PREDICATE_VERSION = 1`.
  - The under-inclusion limit in the file's own header (Req 20.3, 11.3.1's pattern), naming the two known misses, `Component-Readiness-Status` and `Component-Quick-Reference`, also exported as `KNOWN_UNDER_INCLUSIONS`.
  - The banner template, one symbol for authoring and the guard: `renderBanner({subject, workedExample, transferable})` and `hasBanner(text)`. The form is a `> **Audience framing**: this describes **DesignerPunk's own <process | components | process and components>**, not yours. **Worked example**: … **Transferable**: …` blockquote (single line, or wrapped over consecutive `>` lines). `hasBanner` requires the label in the doc's preamble (after any front matter, before the first heading below H1), the subject phrase, and a non-empty worked-example part followed by a non-empty transferable part.
  - The guard: `listGovernanceDocs`, `matchedDocs`, `auditBanners`, `formatReport`, and a CLI (`npx tsx scripts/audience-banner/predicate.ts`, exit 1 if any matched doc lacks a banner). The report's first line is the scoped claim and every matched doc is listed by path.
- **`scripts/audience-banner/__tests__/audience-banner.test.ts`** (new, 43 tests). Predicate bytes and near-misses; a differential against `grep -lE` over `governance/*.md` (non-vacuity: the matched set is non-empty and equals grep's); 0 of the `Token-Family-*.md` docs match; the header assertions; the template and `hasBanner` cases; the synthetic two-sided bite; the real-corpus guard with a pending list.

No governance doc, workflow, generator file or lock was touched.

## Targeted tests and result

- `npx jest --config scripts/jest.config.js scripts/audience-banner` → **43 passed**.
- `npm run test:scripts` → **19 suites, 451 tests passed**. `--listTests` over `scripts/jest.config.js` now returns **19** files (18 before) and names `scripts/audience-banner/__tests__/audience-banner.test.ts`. The root `jest.functional.config.js` `--listTests | grep -c audience-banner` → **0** (the lane is `npm run test:scripts`, as the block's row 2.2 says).
- `npm run typecheck:scripts` → clean.
- **The scoped line (pasted, from the run's console output)**:

  `audience-banner guard — predicate v1 coverage over governance/*.md (83 scanned): 18 match; 0 carry`

  with all 18 listed `[MISSING]` by path. **0 carry, not 1**: `release-management-system.md` L11 is a process-only banner with no worked-example / transferable pair, so `hasBanner` is false for it. (The block's O-3 note said "1 carry"; that was written before `hasBanner` existed and is corrected here.)
- **The bite, real corpus (red)**: the test file copied with its pending list emptied (a scratch copy, deleted after) → `Tests: 19 failed, 24 passed, 43 total`: the live guard `every matched doc not on the pending list carries a banner` plus one `✕ governance/<doc>.md carries a conforming audience banner` for each of the 18 docs. In the committed file those 18 entries are `test.failing` on `PENDING_UNTIL_23_2` (Task 19's form), so the suite is green on the branch and each entry flips, leaving the list, in the commit that lands its banner.
- **The bite, synthetic (two-sided, runs from 23.1)**: a temp corpus with a matching doc and no banner → `2 match; 1 carry`, `[MISSING] governance/Matches-NoBanner.md`; adding a conforming banner → `2 match; 2 carry`; a doc with the label but no worked-example / transferable pair is still missing. All pass.

## Application-time adaptations

1. **Test path**: `scripts/audience-banner/__tests__/audience-banner.test.ts`, as the block's row 2.1/2.2 settled (a file outside a `__tests__` directory would be selected by neither jest config).
2. **Pending form**: one `test.failing` entry per doc (18) plus a live guard for any unlisted miss, per Stacy's consult outcome, in place of the block's N1 alternative of leaving the real-corpus case out.
3. **A CLI was added** to `predicate.ts` (not in the plan), so 23.3 can paste the scoped line without Jest.
4. **`hasBanner` strictness** (block note N5): the label must be in the preamble and carry both parts; an old-style L11 banner does not count. That is a design decision of this subtask, for Ada's read of `predicate.ts` along with her four strings.
5. **Ada's read (CONFIRMED, 2026-10-13) and her three edits to `predicate.ts`**: (i) the `BANNER_LABEL` comment now says L11 is the precedent for the label only, not the template; (ii) the header states that extending the predicate is a `PREDICATE_VERSION` bump decided by Ada with a re-measured count; (iii) the `KNOWN_UNDER_INCLUSIONS` wording now reads "v1 does not extend; extension is a version bump decided by Ada with a re-measured count", with her measurement recorded in the header (every candidate string that catches the two docs adds at least 5 more: readiness emoji 38, `Production Ready` forms 32, `Component-Family-*` references 23, toward the corpus-wide banding Req 20.4 forbids). Whether the two docs are banded outside the predicate (declared, unguarded) is a fork with Peter and was not acted on.
6. Nothing else departed from the plan: `none` beyond the above.
