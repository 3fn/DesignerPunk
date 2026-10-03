# Task 19.2 Completion — the install-doc test file

**Date**: 2026-10-03
**Agent**: Thurgood (Opus) · PRIMARY, Task 19
**Branch**: `task/123-u3-onboarding`

## What changed

**`scripts/__tests__/install-doc.test.ts`** grows from 19.1's two README tests to **49 tests**. Each class below names its criterion:
- **Path steps (C1, C16)**: the front matter equals C23's map; § 2 has one list of 3; § 3 one list of 5, in C23 order; § 7 a joining list of 5 and a cross-harness list of 6, which is the joining list with `attach` after step 3; no numbered item anywhere else in the region; the README's § "Getting Started" has one list of 5, in C23 order.
- **Heading order and § Platforms (C2, C13)**: the region's 15 headings match C23-erratum prefix matchers in order; Web, iOS and Android sit only under § Platforms; § Platforms has no numbered step.
- **Scope sentence (C14)**: it is the region's first paragraph, and the README's status paragraph, identical to the string in § "Expected release count". The CHANGELOG surface is added at 22.4 (O-2 ruling).
- **Native labels (C5, C15)**: both strings in § Platforms › iOS and › Android.
- **Owed-AC residuals (C3)**: 15.5, 15.6 and 15.7 inside the CONSUME span.
- **Approval instruction (C4)**: one asserted string that names no harness. It is the last step of all five path lists (four in the region, one in the README).
- **119-B lint (C17)**: (i) section-less route lines; (ii) the cue's citation is present, the emitter denylist (`find_docs`, `find_components`) is absent, and the cited register heading exists; (iv) no `aliases:`. (iii) is cited to `npm run check:section-citations`, not re-implemented. (v) is `none`. Pure lint functions carry self-bites.
- **Req 3.2 guard (C18)**: no `generate` in a code span or numbered step inside the CONSUME span. It carries a fixture bite.
- **Imported CLI strings (C6, C18)**:
  - All five `LIFECYCLE_VERBS` descriptions appear in the region, and `attach`'s first prose use carries `attachUsage()`.
  - `missingTokenMessage(…)` is rendered with placeholders, and § 5 must contain it. The message's own `§ "When sync reports a missing token"` must resolve to a region heading.
  - § 9 carries `cloneHatchMessage()`'s clause, and § 3 carries `personalNoteNamingMessage()`'s.
- **README (C16)**: the "Install guide" link targets `docs/consumer/INSTALL.md`; the README carries no cause marker.
- **Stale-scope zero counts (C11)**: active on the README.
- **Pending until 19.4** (`test.failing`, through `pendingUntil194`, against a declared list of seven ids, guarded by an equality test). Each was confirmed red for its stated reason:
  - `interim-delimiter-retired`: the region is still found through the interim `## Setup Loop` anchor.
  - `no-setup-loop-string-outside-region`: 1 hit.
  - `no-numbered-step-heading-outside-region`: 9 headings.
  - `one-reference-heading`: 0 headings.
  - `guide-zero-stale-scope`: 2 / 1.
  - `install-md-zero-stale-scope`: the file is absent.
  - `cli-commands-table-uses-vocabulary`: the `generate` row drifts.

**`governance/DesignerPunk-Integration-Guide.md`**: three region edits, each made to match an imported CLI string (adaptation 2).

## Targeted tests + result

- `npx jest --config scripts/jest.config.js scripts/__tests__/install-doc.test.ts`: **49/49 passed.** The seven pending tests pass as `test.failing`, because their assertions are red.
- `npm run test:scripts`: **16/16 suites, 358/358 tests.**
- `npm run check:section-citations`: PASS.
- `npx tsc --noEmit`: exit 0. Its scope is `src/**`, so it does not cover the test file; ts-jest compiled the test file.
- `npm run check:completion-criteria-parity`: 21/21 parents PASS, 0 reds.
- `122-diff-guard` through `runGuard({refreshLock:false})`: `full-run-green` (input-closure-changed), freshness 0. `outputs` did not move, and the lock was not written.

**Bites**: 23 mutations, each applied to the working-tree file and then restored from a byte copy, with `cmp` confirming the restore. Each turned the expected test(s) red:

| Mutation | Red |
|---|---|
| extra step in § 2's list | § 2 count; region total |
| § 8 renumbered as 9 | heading order |
| a `### Web` outside § Platforms | heading order; platform placement |
| a numbered step in § Platforms | region total; Platforms no-steps; approval |
| one word of the README's scope sentence changed | README status identical |
| a paragraph inserted before the scope sentence | first paragraph |
| `Native onboarding is not supported` removed from Android | Android labels |
| 15.5's sentence reworded | 15.5 |
| a restart step reworded to name a harness | approval |
| a route line with `§` | lint (i) |
| `find_docs` named | lint (ii) |
| `aliases:` added | lint (iv) |
| `` `npx designerpunk generate` `` added in § 2 | Req 3.2 guard |
| `sync`'s description reworded | vocabulary (`sync`) |
| `attach`'s object removed at first use | attach object |
| the message's `See: …` tail removed | name contract |
| README link changed | Install guide link |
| `dpTheme` added to README | no cause sentence |
| `npm.pkg.github.com` added to README | README zero |
| clone clause reworded | clone hatch |
| note clause reworded | personal note |
| `founder: 6` in front matter | front matter; founder count; region total; README count |
| **pending flip**: the guide's two `npm.pkg.github.com` lines removed (which also removes `@designerpunk:`) | `[pending 19.4: guide-zero-stale-scope]` **goes red**: the flip mechanism works |

## Application-time adaptations

1. **The pending instrument was chosen over the alternatives.**
   - Assertions that are red by construction until 19.4 are `test.failing` entries on a named, guarded list, as the orchestrator suggested. They are not skipped and not weakened.
   - Before markers exist, **the region is found through an interim delimiter** (the metadata's closing `---` to the `---` before `## Setup Loop`, flagged `USING_INTERIM_DELIMITER`).
     - If `## Setup Loop` disappears without markers in place, `region()` throws.
     - The pending test `interim-delimiter-retired` goes red once the flag is set false, so 19.4 must flip it.
   - **No marker strings are chosen here.** The markers are 19.4's.
   - The C9 checks for content outside the region are included as pending tests, though 19.2's subtask list names only "stale-scope zero assertions". Writing them now costs nothing, and 19.4 flips them. I did not treat this as a fork: the plan places C9's instrument in this file, and 19.2 and 19.4 share it.
2. **Three region edits, made so the doc matches imported strings** (the CLI strings are read, never reworded):
   - § 5's heading drops the backticks around `sync`, so that the CLI message's pointer, `§ "When sync reports a missing token"`, is a substring of the heading. C23's erratum writes it with backticks; the imported string governs.
   - § 5's quoted message is now `missingTokenMessage`'s full text, including "DesignerPunk's value, for reference" and its `See:` pointer. One explanatory sentence was added (`NameContract.ts` L68).
   - § 3's step-4 note now uses `personalNoteNamingMessage()`'s clause verbatim.

   B-U3 (`0f6c347d`) is an ancestor of these edits.
3. **The C6 whole-guide check is narrowed to a decidable form**: a table row for a lifecycle verb, in the form `npx designerpunk <verb>`, must contain vocabulary.ts's description. Today it is pending, red on § "CLI Commands"'s `generate` row. Prose elsewhere in the remainder is not checked; that is a scope limit, stated.
4. **`find_docs` and `find_components` are the whole emitter denylist.** It catches a named emitter, not a paraphrase, as C17 (ii) states.
5. **The guide's other numbered lists**, in the remainder (for example "How to find which tokens to override"), are outside the region and are not path lists. Only *headings* outside the region are checked (C9).
6. **README "only"**: the README test asserts the cause markers are absent, the link is present, and the list has five items. It does not assert that nothing else is in § "Getting Started", which would need its own content definition.
