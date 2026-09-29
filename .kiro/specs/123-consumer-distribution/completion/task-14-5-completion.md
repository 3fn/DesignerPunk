# Task 14.5 completion: Golden Bite 2 (the two-sided grain guard) + `derivation.frontmatter.test.ts`

**Spec**: 123 (Consumer Distribution) · **Unit**: U2b · **Parent**: Task 14 · **Agent**: Lina (Opus), PRIMARY
**Date**: 2026-09-28 · **Branch**: `task/123-u2b-profile` (unit branch, main checkout), from `8a5c9c25`

**Write scope**: Task 14's Primary Artifacts name "the guard tests". Both files here are new tests: `tools/agent-generator/__tests__/grain-guard.two-sided.test.ts` (the design's named file for Bite 2) and `tools/agent-generator/__tests__/derivation.frontmatter.test.ts` (the criterion's named file). **No source file changed.**

**CI-provenance**: local

**Scope of this checkpoint** (orchestrator's go, 2026-09-28): checker and `emitSpans` level. It runs ahead of 14.2–14.4, which wait for 15.0.

## What changed

- **`grain-guard.two-sided.test.ts`** (new) is Golden Bite 2 (Req 10.G). Spans come from `emitSpans` under the consumer profile over the real `canonical/agents/stacy.md`, and 11.4 runs alone (Req 10.8a Constraint 2).
  - **(a) an honest `###`-grain re-pointing is ACCEPTED**: exemplar E on S (`#the-owed-set-pipeline-…`), destination S, gives `VERIFIED`.
  - **(b) attack (a) is REJECTED**: S superseded, its content inside the sibling `#the-trigger-set-…`, with the disposition naming the sibling, gives `FAIL_NO_DERIVATION`.
  - **The honest profile is committed data written at the finest grain.** Its S is the `###` unit, and the test does not recompute S from the current splitter. So collapsing the splitter orphans S, and 13.5 refuses a row that names no current unit.
- **`derivation.frontmatter.test.ts`** (new) is 11.4 on the entry tree, over the real `canonical/agents/lina.md`. Its `commands` list is keyed per member by `name`. The spans come from `emitSpans` with one `member` piece per command, the form the adapters' frontmatter loops use.
  - **`commands[<name>]` emptied with a sibling destination gives `FAIL_NO_DERIVATION`.** "Emptied" is exercised both ways a rendering can empty an entry: the row omits it (`no-consumer-counterpart`), or the piece is kept with no text (an empty piece emits no span).
  - Controls:
    - the member rendered with itself as destination → `VERIFIED`;
    - the member rendered with its sibling as destination → `FAIL_DISHONEST_NAMING`;
    - a span on the `commands` container → `FAIL_NO_DERIVATION` (an ancestor is a super-range).

## Targeted tests + result

- `npx jest --config tools/agent-generator/jest.config.js tools/agent-generator/__tests__/grain-guard.two-sided.test.ts tools/agent-generator/__tests__/derivation.frontmatter.test.ts` → **`Tests: 8 passed, 8 total`** (grain guard 2, frontmatter 6).
- `npm run test:agent-generator` → **`Test Suites: 45 passed, 45 total` · `Tests: 718 passed, 718 total`**. `npx tsc -p tools/agent-generator/tsconfig.json --noEmit` → exit 0.
- `npm run check:completion-criteria-parity` after the tick → `SUMMARY: parents evaluated 16, pass 16, fail 0; emissions 0; reds 0`.

### Bites (each mutated, run under a 90 s hang guard, restored; `cmp` clean)

| # | Mutation | Red (exact) |
|---|---|---|
| 1 | **Golden Bite 2 — the splitter collapsed to `##` grain** (`partition.ts` tokenize: headings deeper than `##` ignored) | **Two-sided, as required.** `✕ (a) an honest ###-grain re-pointing is ACCEPTED` and **`✓ (b) attack (a) is REJECTED`**. `Expected: "honest re-pointing of #the-owed-set-pipeline-…: VERIFIED"` / `Received: "honest re-pointing of #the-owed-set-pipeline-…: FAIL_NO_DERIVATION"`. `Tests: 1 failed, 1 passed, 2 total`. **(b) staying green under the mutation is the reason the guard is two-sided (Lina R3)**; this run shows it. |
| 2 | SIBLINGS read as contained (overlap through a shared parent) | attack (a) → `Received: "…: VERIFIED"`; the frontmatter sibling control → `Expected: "FAIL_DISHONEST_NAMING"` / `Received: "VERIFIED"`; both emptied-member cases → `VERIFIED`. `Tests: 5 failed, 3 passed, 8 total`. |

## Application-time adaptations

- **Bite 2 runs over `emitSpans`, not over `generateFixture` and the adapters.** Req 10.G's recipe needs only the checker and the shared span function, and routing through the adapters is the per-target guard's job (14.3/14.4). So this is complete for Bite 2, not a stand-in.
- **"Emptied" is tested both ways the rendering can empty an entry** (omitted, or kept with no text). The criterion names the outcome and not the mechanism, so both mechanisms are covered.
- **Carried to the parent doc** (orchestrator note): the partition root-id hang found at 14.1 reaches **G2's pass four**, which runs this checker. The sentence goes in Task 14's carries so Task 18's brief inherits it.

*Provenance follow-up (2026-09-29)*: all six runs dispatched at `3de7f4c9` concluded `success`:
- Consumer Guard https://github.com/3fn/DesignerPunk/actions/runs/36421413401
- 125B Tool-Boot Smoke https://github.com/3fn/DesignerPunk/actions/runs/36421422040
- Section Citation Guard https://github.com/3fn/DesignerPunk/actions/runs/36421430508
- Agent Generator (122) https://github.com/3fn/DesignerPunk/actions/runs/36421438747
- Package Name Drift Detection https://github.com/3fn/DesignerPunk/actions/runs/36421446990
- Lane Timing https://github.com/3fn/DesignerPunk/actions/runs/36421454626

**They are NOT carried on a `**CI-provenance**:` line, and this doc stays `local`.** Rule 5 (Completion Documentation Guide § "CI provenance") requires `git diff --name-only 3de7f4c9..<the commit carrying this line>` to list only completion docs and `tasks.md`. Task 15.0's code (`895997e5`) landed on the unit branch in between, so no later commit can satisfy it. The runs are recorded here as information only.
