# Task 11.4 Completion — Confirmer + verbatim checks: the temporary precursor test

**Spec**: 123 — Consumer Distribution · **Unit**: U2a · **Parent**: Task 11 · **Agent**: Thurgood (Opus)

**CI-provenance**: branch-head dispatch @ a300b73483cc1d741a90b956ae5f104f094fc0f0 — https://github.com/3fn/DesignerPunk/actions/runs/36369546680, https://github.com/3fn/DesignerPunk/actions/runs/36369550922, https://github.com/3fn/DesignerPunk/actions/runs/36369555504, https://github.com/3fn/DesignerPunk/actions/runs/36369562218, https://github.com/3fn/DesignerPunk/actions/runs/36369566091, https://github.com/3fn/DesignerPunk/actions/runs/36369570482

**Authority**: tasks.md amendment 2026-09-27 (item 1), ruled by Peter, merged as #220 (`a4ad7e25`). No instrument existed at 11.4, so the check for Task 11 is a temporary precursor test.

**Write scope**: `src/__tests__/**` is in **Thurgood's charter write scope**. This file is not granted by Task 11's row (T1-(B)); it is not in Task 11's Primary Artifacts.

**Retirement**: **Task 13, freshness criterion (v)** — 13.6 (U2b) absorbs every assertion and deletes this file. The evidence will be `git ls-tree` on the U2b PR head returning empty. The file's header carries the same pointer (Test-Development-Standards § "Temporary Tests").

**State at this checkpoint**: **knowingly red on two tests, pending Lina's confirmation notes** (see Targeted checks). **11.4 is NOT ticked here**: its line claims "checks green". It is ticked at the final green, after Lina's 11.2 half is merged and this test is re-run over all six record and note files.

## What changed

- **`src/__tests__/operative-set-records.test.ts`** (new, temporary). For every `canonical/operative-sets/*.yaml` record it asserts the following. The semantics are Stacy's record-and-note check script (`task-11-2-stacy-completion.md`), so 13.6 inherits one definition.
  - `confirmer:` = the C1 function of (owner, profile author `thurgood`): owner; else the counterpart seat `stacy`; both roles on one agent → `peter`. It has its own unit test over all three branches.
  - The `source:` file exists. Every unit key resolves to a unit of `partition(splitFrontmatter(<source>).body)`.
  - `canonicalHash` = `sha256:` + hex SHA-256 over the unit's exact UTF-8 bytes.
  - Item ids are unique per unit, and every `kind` is one of `obligation | step | member | route | command`.
  - Every item `text` is a verbatim substring of its unit, with no edge whitespace.
  - Each `confirmation:` fragment names its own unit. The note path is **git-tracked** ("committed note"). **Exactly one** `## ` block matches the unit. That block's `confirmer:`, `canonicalHash:` and `items:` lines equal the record's (ids in record order; `items: none` for an empty set), and it carries `date: YYYY-MM-DD`.
  - **Non-vacuity**: at least one record file, and each carries at least one unit.
- **`tasks.md`**: 11.3 ticked. Stacy's work was merged at `87742c71` (`e4602cc5`, `ae190618`) and her docs `task-11-3-completion.md` / `task-11-3-exemplars-g-gprime.md` exist. 11.4 is not yet ticked (above).

## Pre-flagged risks, checked before writing

1. **Discovery — PASS.**
   - `jest.config.js` `roots` includes `'<rootDir>/src'`, and its `testMatch` includes `'**/__tests__/**/*.test.ts'`.
   - `jest.functional.config.js` spreads the base config and adds only the performance ignores (`performance/__tests__`, `__tests__/performance`, `PerformanceValidation`).
   - `npx jest --config jest.functional.config.js --listTests | grep operative-set` → `…/src/__tests__/operative-set-records.test.ts`.
   - In `npm test` the suite runs and counts (385 suites; see below).
2. **Importing `tools/` — PASS under Jest; a static import FAILS `tsc`.**
   - A probe with `import { partition } from '../../tools/agent-generator/partition'` passed under Jest (ts-jest transforms it).
   - But `npx tsc --noEmit` failed: `error TS6059: File '…/tools/agent-generator/frontmatter.ts' is not under 'rootDir' '…/src'` (the root tsconfig's `rootDir` is `./src`).
   - **Resolved with the repo's existing pattern, not a workaround**: a runtime `require(path.join(REPO_ROOT, 'tools/agent-generator/…'))` with local structural types. The precedent is `src/__tests__/integration/Spec107-DesignLanguageContext.test.ts:11–12` (`require(path.resolve(__dirname, '../../../application-mcp-server/…'))`).
   - After the change, `tsc` exits 0.
   - *Cost*: the test does not type-check against the splitter's signatures. A signature drift surfaces as a runtime failure of this test, not as a compile error.

## Targeted checks + result

- **`npx jest --config jest.functional.config.js src/__tests__/operative-set-records.test.ts`** → **Tests: 2 failed, 20 passed, 22 total**. The two reds are the expected ones:
  - `component-family-navigation.yaml › resolves every confirmation: …` → `"confirmation note missing: canonical/profiles/consumer/confirmations/component-family-navigation.md"`;
  - `lina.yaml › resolves every confirmation: …` → `"confirmation note missing: canonical/profiles/consumer/confirmations/lina.md"`.
  - Lina is writing both notes in her worktree under the 11.2 grant (#220). **Every other check is green for all four records**: confirmer, source, anchors and hashes, ids/kinds/verbatim for all four, and full note resolution for `stacy.yaml` and `start-up-tasks.yaml`.
- **Bites** — each run with `-t 'stacy.yaml'` against a green baseline and reverted with `git checkout --`. The baseline was re-run green after each one (`Tests: 17 skipped, 5 passed`).

  | # | Mutation | Result |
  |---|---|---|
  | 1 | Drop `cut-stacy` from the note's `items:` line (`confirmations/stacy.md`) | RED — `"note items != record items: #the-charter-cut-ratified-verbatim (1 vs 2)"` |
  | 2 | Corrupt `#what-parity-means`'s `canonicalHash` in the record | RED ×2 — `"stale canonicalHash: #what-parity-means"`, `"note hash: #what-parity-means"` |
  | 3 | Paraphrase item `parity-interaction-model` (`Same interaction model` → `The same interaction model`) | RED — `"item text not verbatim: #what-parity-means parity-interaction-model"` |
  | 4 | `confirmer: stacy` → `confirmer: thurgood` in the record | RED — `Expected: "confirmer stacy"` / `Received: "confirmer thurgood"`, plus the note-confirmer mismatch |
  | 5 | Rename the note heading `` ## `#what-parity-means` `` → `## what parity means` | RED — `"confirmation resolves to 0 note blocks (want 1): canonical/profiles/consumer/confirmations/stacy.md#what-parity-means"` |

- **`npx tsc --noEmit`** → exit 0.
- **`npm test`** → `Test Suites: 1 failed, 384 passed, 385 total` · `Tests: 2 failed, 9288 passed, 9290 total`. The only failures are this suite's two expected reds.
- **Parity** (`npm run --silent check:completion-criteria-parity`, after ticking 11.3) → `SUMMARY: parents evaluated 13, pass 13, fail 0; emissions 0; reds 0`.
- **CI**: this checkpoint used **`--no-ci`**, because it is **knowingly red** (the two missing notes). The CI-provenance line comes from the final-green checkpoint after Lina's merge.

## Application-time adaptations

1. **Note matching is exact on the anchor, not by slug** — a deliberate difference from Stacy's script. Her rule, `slugify(heading) === fragment`, drops the `:` of a `#<parent>:preamble` anchor (`slugify` strips everything outside `[a-z0-9-]`). So it could never resolve the note for a preamble unit — Lina's `#component-scaffolding-workflow:preamble` and `#platform-implementation-true-native-architecture:preamble`.
   - The test instead requires the heading text, with one pair of enclosing backticks removed, to **equal** the full anchor. It also requires **exactly one** such block.
   - Every existing note heading (`` ## `#anchor` ``) already satisfies it. **13.6 should inherit the exact rule.**
2. **"Committed note" is checked with `git ls-files`**. A note that exists only in a working tree is red. That is the criterion's word, and it means a confirmer runs the test after committing.
3. **Runtime `require` of `tools/`** (risk 2, above), on the Spec107 precedent.
4. **11.4 is left unticked** despite the brief's instruction to tick it. A ticked "checks green" line over a red suite would be a false claim. The tick lands at the final green.

---

## Addendum 2026-09-27 — the final green (parent close)

*The body above records the knowingly-red checkpoint at `9054de14`. This addendum records the final state.*

- **Lina's 11.2 half is merged** (`d05f1565`, `ea329e87`, with the notes for `lina.md` and `component-family-navigation.md`), and so is Stacy's 11.5 (`2081c865`). Re-run over all four records and all four notes at `a300b734`:
  - `npx jest --config jest.functional.config.js src/__tests__/operative-set-records.test.ts` → **Tests: 22 passed, 22 total**.
  - The exact-anchor matching resolves Lina's two `:preamble` notes, which the slug rule could not.
- **`npm test`** → `Test Suites: 385 passed, 385 total` · `Tests: 9290 passed, 9290 total`. **`npx tsc --noEmit`** → exit 0. Both are local, on the merged state before the lock commit, which changes no source.
- **The CI-provenance line above** binds to `a300b734`. That is the lock-refresh checkpoint, and it carries this test file unchanged since `9054de14`. The later commits change only completion docs, the summary and `tasks.md` checkboxes (guide § "CI provenance", rule 5).
- **11.4 ticked at the parent close.**
