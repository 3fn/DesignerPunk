# Task 26.5 Completion: Install-doc correction for observed cells

**Date**: 2026-10-15
**Agent**: Thurgood (Opus; planned Sonnet), secondary on Task 26

## What changed

- **`governance/DesignerPunk-Integration-Guide.md`**, install region only, 4 lines. The harness-agnostic approval instruction (design C8: "U5's closeout edits it to the observed truth") is replaced by what Task 25 and 26 observed cold (`validation/cold-observation-table.md`, all four cells "observed"):
  - **§ 3 BECOME step 5** (founder-cold, cc and kiro) and **§ 7 step 5 and step 6** (teammate-cold, cc and kiro) now read: "Restart your agent session. Claude Code then asks you to trust the folder and to enable DesignerPunk's three MCP servers: accept both. Kiro asks nothing."
  - **§ 3 "Step 5, the restart, and why"**: its last sentence ("Some tools ask you once to approve project-declared MCP servers; approve DesignerPunk's.") is replaced by the observed sequence:
    - Claude Code first asks whether you trust the folder. That prompt lists the pre-approved tool permissions, which are ignored until trust.
    - It then asks which of the three new servers to enable. All are selected, and the answer is "Enable selected".
    - The choice is kept per clone.
    - Kiro asks nothing: the servers run on first open, with their read-only tools pre-approved in `.kiro/settings/mcp.json`.
  - `path-steps` is unchanged (a restart is still one step). Nothing else in the guide changed, `Last Reviewed` included.
- **`docs/consumer/INSTALL.md`**: regenerated with `npx tsx scripts/derive-install-doc.ts` ("wrote docs/consumer/INSTALL.md from governance/DesignerPunk-Integration-Guide.md"). The same 4 lines changed.
- **`scripts/__tests__/install-doc.test.ts`** (adaptation: a Task 19 artifact, not a Task 26 Primary Artifact). The C4 test asserted that every path list ends with the agnostic string, so it pinned the old sentence. It now asserts:
  - the two paths not observed cold (§ 2's `--reference` list and the README's Getting Started) still end with the agnostic string;
  - the three observed paths (§ 3, § 7 ×2) end with the observed string;
  - the observed string names both targets.

`git diff --stat` (uncommitted, worktree at `76f281e3f`):
```
 docs/consumer/INSTALL.md                     |  8 ++++----
 governance/DesignerPunk-Integration-Guide.md |  8 ++++----
 scripts/__tests__/install-doc.test.ts        | 26 +++++++++++++++++++++-----
 3 files changed, 29 insertions(+), 13 deletions(-)
```
The guide hunks are at L75, L83, L220 and L231, reproduced in `task-26-completion.md` § "The install-doc diff (26.5)".

## Targeted tests and result

- `npm run test:scripts` → `Test Suites: 19 passed, 19 total` · `Tests: 454 passed, 454 total` (includes `install-doc.test.ts` and `pack-assert.test.ts`).
- `npx jest --config jest.functional.config.js src/cli/__tests__/init.test.ts src/cli/__tests__/errorCatalog.test.ts` → 2 suites, 91 passed. These are the other tests that read the install doc, or that carry the old sentence in `init`'s refusal message.
- `node scripts/validate-steering-metadata.js` → `DesignerPunk-Integration-Guide.md - Valid metadata`; 0 errors across the corpus (21 pre-existing warnings, none on this doc); id-uniqueness guard PASS (92 docs).

## Application-time adaptations

- **§ 2 (CONSUME, `attach --reference`) step 3 is NOT corrected.** This departs from the brief, which named § 2.
  - The criterion corrects "only for cells observed cold". The table's cells are target × {founder-cold, teammate-cold}, and the reference posture is neither, so no counted cell observed it.
  - Task 28.1's second session (`attach --reference`, Peter's ruling 2026-10-14) will observe it. The correction can follow that record.
- **§ 7's same-harness list (step 5) IS corrected**, though both teammate-cold cells rest on cross-harness joins. The table's grain is per target × teammate, not per join variant, and the observed behavior is the first open of a session in a repo carrying that target's config. Footnote 2 of the table also records the CC by-clone case observed the same way.
- **The test edit** (above) sits outside Task 26's Primary Artifacts. The C4 test was written to be superseded at U5 (design C8), and the guide edit cannot go green without it.
- **Not touched, though they carry the same agnostic sentence**: the root `README.md` Getting Started list and `init`'s refusal message (`src/cli/shared/errorCatalog.ts` L99). Neither is the install doc. They go with the routed list to the separate install-doc fix PR (Peter's ruling 2026-10-15).
