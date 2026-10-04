# Task 22.2 Completion — C27 completion: notice, next steps, the corrected rows

**Date**: 2026-10-03
**Agent**: Lina (Sonnet) · PRIMARY, Task 22
**Branch**: `task/123-u3-onboarding`, after 20.3 (`cb2e94f58`). **Instruments block**: `completion/task-22-instruments.md` (rows 3.1–3.5, 4.1–4.2, 6.2 are this subtask's).
**Delegated-tier**: plan held (subtask; no parent line owed).

> **`npm run test:scripts` is RED at this commit, by design: one assertion.** `scripts/__tests__/install-doc.test.ts` › "CLI strings, imported — never literals (C6, C18) › § 3 names the personal note with init's purpose clause" imports `personalNoteNamingMessage()` and requires the guide's region to contain its clause; I corrected the string (the 2026-10-03 design erratum) and the region still carries the old clause. I did not edit the guide, INSTALL.md, README, COMMIT-POLICY or his test, and did not weaken the assertion. Thurgood's doc fix turns it green. Every other lane is green (below).

## What changed

- **`src/cli/shared/errorCatalog.ts`**:
  - `personalNoteNamingMessage` and `initBornRepoMessage` carry the **corrected** design-row text (three slots and the walkthrough; "fill in your personal note (generate creates it; your agent can walk you through it)").
  - `namedDefaultNoticeMessage(defaultTarget, targets)` (new): the A2 row; with the shipped profile and `cc` as default it is the row's string verbatim; it follows the profile, never a literal target list.
  - `initNextStepsMessage(name, ctx)` (new): lists positively what the repo needs next, names the `.gitignore` block and the `specs/` scaffold, omits every step a skip made untrue.
- **`src/cli/init.ts`**: bare `init` prints the named-default notice **first** (after the birth check, before any prompt or write), not when `--target` is given and not under `--skip-agents`; `printNextSteps` now prints the catalog function's output for what `init` did, then the clone hatch, the naming row and the sequenced restart row, which stays the last thing printed.
- **Collision strings truthful** (C3): `jestConfigCollisionMessage` was already the A13 string; the 20.2 and 21.3 collision strings state their consequence; and a skip now removes its step from the next steps (an existing `jest.config.js` → no install-jest step; the config would not load → no "commit .gitignore" step).
- **Tests**: `errorCatalog.test.ts` (transcribed rows updated to the corrected design text; +4 cases), `init.test.ts` (+5: notice first, none with `--target` or `--skip-agents`, the tail in order, a skip drops its step, no block → no commit step), `tests/consumer-integration.test.ts` (the real `init` from the packed install prints the notice first and names the `.gitignore` block and the `specs/` scaffold).
- `tasks.md`: 22.2 ticked.

## Targeted tests and result

- `npx jest src/cli`: **green** (init 57, errorCatalog 28 at their last run).
- `npm test`: **394 suites, 9520 passed**. `npx tsc --noEmit`: clean.
- `npm run test:scripts`: **18 suites, 397 tests: 396 passed, 1 FAILED** (the intended red above).
- Not run at this commit: `test:consumer` (runs after 22.3 this turn), `test:pack-contents`, the MCP sub-suites.

## For Thurgood: the guide/INSTALL.md lines now false, and the assertion that moved

| Where | Line | Why | Assertion |
|---|---|---|---|
| `governance/DesignerPunk-Integration-Guide.md` | **L81** (§ 3, "Step 4, your personal note") | still carries the old two-slot clause "who you are and how you want to be worked with" | **moved**: `install-doc.test.ts` "§ 3 names the personal note with init's purpose clause" (`personalNoteNamingMessage().split(' — ')[1]` is now "who you are, what you and your organization value, and how you like to work together") |
| `docs/consumer/INSTALL.md` | **L67** (the derived copy of L81) | same | re-derive after the guide changes (the identity test) |
| `governance/DesignerPunk-Integration-Guide.md` | **L393** (§ Reference, "Generating tokens — options", the banner sample) | shows the bare `Themes: dark (dark), wcag (light)`; `generate` prints the suffixed line (22.1) | none (Reference, not asserted) |
| `docs/consumer/COMMIT-POLICY.md` (mine) | **L33** | says the note is "who you are and how you want to be worked with": stale against the three-slot note, not false | none |

Not false: guide L219, L230 and INSTALL.md L205, L216 ("`generate` creates it") are now true (22.1). The guide's § 7 sentence that `init` in a born repo "refuses and prints these steps" is still true; the printed step 4 wording changed (`initBornRepoMessage`) but the guide does not quote it.

## For Thurgood: the single design erratum, row → final string → where it is built

Where the design row and Leonardo's committed wording (`design-inputs/catalog-wording.md`, `b3e055366`) differ, **his wording governs**.

| Design row | Status | Governing string | `src/cli/shared/errorCatalog.ts` |
|---|---|---|---|
| bare `init` default notice (A2) | row exists, **unchanged** | `no --target given — set up for Claude Code (the default). Using Kiro? npx designerpunk attach --target=kiro` | `namedDefaultNoticeMessage`, L461 |
| personal-note naming | corrected text (design L987) | `fill in .designerpunk/personal-note.local.md — who you are, what you and your organization value, and how you like to work together — or, after the restart, ask your agent to walk you through it. Your agents read it every session (it stays on your machine)` | L127 |
| `init` in a born repo (A7) | corrected text (design L939 erratum) | step "fill in your personal note (generate creates it; your agent can walk you through it)"; the rest unchanged | L95 |
| generate created the personal note | corrected (design L983) | `created .designerpunk/personal-note.local.md from the template — fill it in, or ask your agent to walk you through it. Your agents read it every session (it stays on your machine)` | L401 |
| personal note unfilled | row exists | design L988, verbatim | L413 |
| personal note created in an unignored directory | row exists | design L991, verbatim | L428 |
| **generate — registered theme not emitted** | design L992 holds **Ada's draft**; **Leonardo's final governs** | `Themes: <name> (<mode>)[, <name> (<mode>)…] — registered, not applied yet: a theme you register does not change your generated output; light and dark mode and the wcag theme use DesignerPunk's built-in values` | `generateThemesLine`, L440 |
| `.gitignore` block — offer / report | rows exist | design L989, L990, verbatim | L324, L336 |
| **`.gitignore` block — config unreadable** | NEW row | `DesignerPunk's .gitignore block was not written — designerpunk.config.ts could not be loaded (<first line of the load error>), so the platform output path is unknown and none was guessed. Add the lines token-index/ and .designerpunk/ to .gitignore yourself, or fix the config and run 'npx designerpunk sync'.` | L354 |
| **`.gitignore` block — added** | NEW row | `.gitignore: added DesignerPunk's block (it ignores .designerpunk/ and token-index/)` | L368 |
| **managed region — markers missing** | row exists; **split by file** | `.gitignore`: `the DesignerPunk-managed block in .gitignore is missing its markers — not rewriting the file. Restore the lines '# designerpunk:managed:begin' and '# designerpunk:managed:end' around the block, and 'npx designerpunk sync' keeps it current again.`; every other file: the existing row | L187 |
| **starter spec — collision** | NEW row | `skipped: <specs/path> (already exists) — your file is kept as it is; the starter spec's version was not written` | L381 |
| **starter specs — written** | NEW row | `specs/: <n> starter spec file(s) (<spec names>) — run them with your agent` | L386 |
| **`init` — next steps** | NEW row, **authored here, no design row** | the function's output: `Your product "<name>" is ready.` / `Next steps:` and numbered steps (`npm install`; `npm install --save-dev jest @types/jest ts-jest jest-environment-jsdom` only when `jest.config.js` was written; `npx designerpunk generate`; the attach step only under `--skip-agents`; `specs/ holds your starter specs (<names>): run them with your agent when you are ready` when present; `commit .gitignore with the rest: DesignerPunk's block in it ignores .designerpunk/ and token-index/` when the block is in place), then the customize note and the sync tip | L485 |

Held, not changed (decision open with Peter): the "markers missing" row's behaviour for someone who removed the block on purpose; I did not touch it beyond Leonardo's wording.

## Application-time adaptations

- **`--skip-agents` prints no named-default notice**: nothing was set up for a harness, so "set up for Claude Code" would be untrue. It instead adds an attach step to the next steps.
- **The attach step's wording** reuses the vocabulary's object ("to attach a harness (agents + MCP config + approvals)"); it appears only when no agent layer was emitted.
- **No new `init`-only collision string**: the generic `skipped: <x> (already exists)` lines for the config, README, overview, `tsconfig.test.json` and `.designerpunkignore` are unchanged. The criterion's "truthful" is met by A13 (jest), the 20.2/21.3 strings and the omission rule; I did not invent consequence clauses for the others.
- **The `generate created` row's corrected string was applied at 22.1**, so 22.2 only verified it.

## Claims, and what each rests on

| # | Claim | Rests on | State |
|---|---|---|---|
| 1 | Bare `init` prints the named-default notice first, string-equal to the A2 row; none with `--target` or `--skip-agents` | `src/cli/init.ts:180-186`; `errorCatalog.ts:461`; `init.test.ts` (22.2 describe), `errorCatalog.test.ts`; the packed install's real `init` (consumer test) | VERIFIED-CODE (consumer lane: run after 22.3) |
| 2 | The sequenced restart row is the last thing `init` prints, after the hatch and the naming row | `init.ts:405-410` (`printNextSteps`); `init.test.ts` ("the tail in order") | VERIFIED-CODE |
| 3 | Next steps name the `.gitignore` block and the `specs/` scaffold, and omit steps a skip made untrue | `errorCatalog.ts:485-510`; `init.ts:400-409`; `errorCatalog.test.ts`; `init.test.ts` | VERIFIED-CODE |
| 4 | The naming and born-repo rows equal their corrected design text | `errorCatalog.ts:127,95`; `errorCatalog.test.ts` (transcribed corrected rows) | VERIFIED-CODE |
| 5 | The jest collision string is the A13 string | `errorCatalog.ts:140`; `errorCatalog.test.ts`; `init.test.ts` (skip case) | VERIFIED-CODE |
| 6 | The guide and INSTALL.md state the three-slot naming clause | `install-doc.test.ts` (red) | **FALSE until Thurgood's fix** (L81, L67) |

## Notes

- **Unverified**: the packed-install `init` output (consumer lane runs after 22.3); a real-terminal view of the notice.
- **Counter-argument and residual**: printing the next steps from a function of "what `init` did" makes the output depend on four booleans, so a future `init` step that is skipped needs its own flag or its step will not vanish with it. The alternative (static text) is exactly the defect C3 names; the residual is one more place to remember when `init` grows a step.

## Addendum 2026-10-03: reconciliation pass (after Thurgood's doc fix and the catalog-close erratum)

Commit: the one carrying this addendum. Items from the coordinator's pass, in its order.

1. **COMMIT-POLICY L33**: see the 20.1 addendum of the same date.
2. **`init`'s customize note** ("The validator will warn if changes break these relationships during generation") was FALSE. Verified against source: `generateTokenFiles.ts:63-95` runs the semantic-reference check only (the override-key check is at `:126-162`); the mathematical check exists only in `validate` (`validate.ts:36-39`); I ran `validate` on unmodified source and its mathematical-relationships check fails (exit 1). **Replaced with Ada's exact sentence**: "`generate` does not check these relationships, and `npx designerpunk validate`'s check for them currently fails even on unmodified token source (a known defect in the checker, not in your tokens)." (`errorCatalog.ts`, `initNextStepsMessage`). **No design catalog row exists** for this paragraph: `grep` over design.md finds none, and it is part of the next-steps block, which I recorded at 22.2 as authored with no design row (Thurgood's erratum covers the block).
3. **Jest devDependencies, four vs five**: **five is right; `init` was wrong.** The `tsconfig.test.json` that `init` writes declares `types: ['jest', 'node']` (`init.ts`, Step 9), and the preset's own header lists five (`src/testing/jest-preset.ts:18-24`). I installed the four into a scratch repo: `@types/node` was present, hoisted transitively through `@jest/types` (`dependencies['@types/node']: "*"`), so four happens to work under npm's hoisting and does not under a strict layout; a `types` entry naming `node` should be backed by a direct dependency. **Fixed on my side**: `init`'s next step now installs `jest @types/jest ts-jest jest-environment-jsdom @types/node` (`initNextStepsMessage`; `errorCatalog.test.ts` asserts it). **The guide's "Running Component Tests" (five) and the CI-needs spec's N3 are right**: no change for Thurgood.
4. **The guide's bare `npx jest`**: verified in a scratch repo with the preset-less `jest.config.js` and no tests: `npx jest` prints "No tests found, exiting with code 1" and exits **1**; `npx jest --passWithNoTests` exits **0**. N3 already uses `--passWithNoTests` (`ci-needs/needs.md:44`). **Exact replacement for Thurgood**, guide L468 (under "Running Tests"):
   `npx jest --passWithNoTests       # Run all tests (a fresh repo has none yet: without the flag jest exits 1, "No tests found")`
   L469 (`npx jest src/components/`, "once you've added some") and L470 are correct as written.
5. **Token-fact correction to the `Themes:` suffix (Ada, token owner)**: Leonardo's clause "light and dark mode and the wcag theme use DesignerPunk's built-in values" is false for light mode: light values come from the user's own token source; only the dark and WCAG override maps are DesignerPunk's (`generateTokenFiles.ts:19-21, 150-171`). **Replaced** with Ada's clause: "dark mode and the wcag theme apply DesignerPunk's built-in overrides to your tokens"; the rest of the suffix is unchanged (`generateThemesLine`, `errorCatalog.ts`). `personalNote.test.ts` and `generate.personalNote.test.ts` assert the function (the latter through the function, so it moved with it).

**Intended red at this commit** (one test, in `npm test` and `npx jest src/cli`): `personalNote.test.ts` › "the committed wording source (catalog-wording.md § 1) agrees with generateThemesLine". It reads Leonardo's committed file at run time, which still carries the pre-correction clause. I did not edit his file and did not weaken the assertion: it turns green when he updates it. `npm run test:scripts` is green (397/397); `npm run test:consumer` 53 passed, 1 skipped; `npx tsc --noEmit` clean.

**Surfaces item 5 made stale (not edited by me)**:
- `governance/DesignerPunk-Integration-Guide.md` **L393** (the banner sample carries the old clause "light and dark mode and the wcag theme use DesignerPunk's built-in values"); INSTALL.md carries only the region, so not there.
- `.kiro/specs/123-consumer-distribution/design.md` **L995** (Thurgood's catalog-close erratum row, `8df365308`).
- `.kiro/specs/123-consumer-distribution/design-inputs/catalog-wording.md` **§ 1** (Leonardo's committed final wording), the source the red test reads.
- My own prose: `task-22-2-completion.md` § erratum table (the `Themes:` row, L51) and `task-22-instruments.md` row 17.1 record the pre-correction string as history; left as written (records, not specifications).

## Addendum 2026-10-03 (second pass): Leonardo's 19.5 review, items 2, 3, 5, 6, 9

Source: `completion/task-19-5-review/leonardo.md`. One commit (the one carrying this addendum).

**Item 2 — `npm install` in `init`'s next steps.** Answer to "was it there for a case he did not find?": **mostly no, with one narrow case.**
- It was the release-1 text, when `init` copied files and a fresh install was needed. Today `init` changes no dependency: it never writes the consumer's `package.json` (the only `package.json` it reads is the package's, `init.ts:585`), and `--re-scaffold` does not either. So a bare `npm install` after `init` is a no-op for anyone who followed INSTALL step 1.
- **The one real case**: `init` run through `npx` with no `npm install @3fn/core` first. Then `@3fn/core` is not in the repo, and the config `init` wrote imports `@3fn/core/config`, so `generate` cannot load it. The right step there is `npm install @3fn/core`, **never** a bare `npm install`.
- **Applied**: the numbered list now begins at `npx designerpunk generate` (INSTALL step 3). `initNextStepsMessage` takes `packageInstalledHere` (`node_modules/@3fn/core/package.json` exists, checked by `init`); only when false, step 1 is `npm install @3fn/core (it is not installed in this repo, and the config init wrote imports from it)`. The jest install is no longer a step: after the list, one line, `Optional, to test your own components: npm install --save-dev jest @types/jest ts-jest jest-environment-jsdom @types/node`, printed only when `jest.config.js` was written (five devDependencies, as corrected in the first pass). Tests: `errorCatalog.test.ts` (list order; optional line; the one-case step) and `init.test.ts`; the packed lane asserts a real `init` prints no `npm install` step, starts at `generate`, and prints the optional line.
- **For Thurgood, design row "`init` — next steps"**: the block's numbered list is (a) *only when `@3fn/core` is not installed in the repo*: `npm install @3fn/core (it is not installed in this repo, and the config init wrote imports from it)`; (b) `npx designerpunk generate`; (c) *only under `--skip-agents`*: the attach step; (d) *when the starter specs are in `specs/`*: `specs/ holds your starter specs (<names>): run them with your agent when you are ready`; (e) *when the `.gitignore` block is in place*: `commit .gitignore with the rest: DesignerPunk's block in it ignores .designerpunk/ and token-index/`. After the list, *only when `jest.config.js` was written*: a blank line and `Optional, to test your own components: npm install --save-dev jest @types/jest ts-jest jest-environment-jsdom @types/node`. Then the unchanged customize paragraph and sync tip. No bare `npm install` anywhere.

**Item 3 — `jestConfigCollisionMessage`**: replaced with Leonardo's truthful-now string, verbatim: `skipped: jest.config.js (already exists) — the DesignerPunk jest preset is not applied; to test your own components with it, add ...require('@3fn/core/jest-preset') to your config (in this version @3fn/core/testing does not load under the preset; see the Integration Guide's "Running Component Tests")`. True as shipped today (the preset's four missing mapped files, reproduced in my 19.4 review); when the preset is fixed, only the parenthetical goes. The preset is not touched. `errorCatalog.test.ts`'s transcribed row is updated to match. **Design row to update (Thurgood): "jest.config.js collision (C27 A13)".**

**Item 5 (COMMIT-POLICY)**: the paragraph added after the first paragraph of § "Platform output is committed by default": "In this version every `generate` run rewrites a timestamp line in each generated file, so committed output shows as changed after every run even when no token changed (a known defect). Compare with the timestamp lines ignored, as the CI-needs spec's N1 check does." Verified against source: `Generated:` stamps at `TokenFileGenerator.ts:307,382,461`, and N1's check (`ci-needs/needs.md:24-27`) uses `git diff -I 'Generated: |generatedAt|Product tokens — generated'`. The C24 table and `commit-policy.test.ts` are untouched (6 passed).

**Item 6 — guide L320, confirmed, not edited.** Leonardo's replacement is true against what 22.3 built: `init` scaffolds `product/` with the overview, `home-layout` and `example-home` (`init.ts:256-263`; guard cases in `productScaffold.test.ts` and the packed lane), `find_screens` returns `example-home`, and the Product MCP with no `product/` directory starts with empty data (`product-mcp-server/src/index.ts:208`). Exact text for Thurgood, replacing the sentence "The Product MCP starts with empty data if no `product/` directory exists yet; that is expected for a new project (see "Specifying screens (Product MCP)" below).": `The Product MCP starts with an empty index where no \`product/\` directory exists; a repo \`init\` created has one, with an example screen (see "Specifying screens (Product MCP)" below).`

**Item 9 — "install doc" → "install guide"**: the two CLI strings now say `install guide`: `NameContract.ts:69` (`See: install guide § "When sync reports a missing token".`) and `errorCatalog.ts` `managedRegionMarkersMissingMessage`, agent-layer form (`… (see install guide § "Your agent layer") or re-run attach`). **The `.gitignore` form and the markers-missing remedy are untouched** (open with Peter). Tests that transcribe them are updated (`sync.name-contract`, `sync.region`, `gitignoreRegion`).

**Intended red at this commit**: `npm run test:scripts` is **398/399**. The one failure is `install-doc.test.ts` › "§ 5 quotes the name-contract message, and the section it points to exists": `missingTokenMessage` now ends `See: install guide § "…"`, and the quote is still `install doc §` in **guide L189** and **INSTALL.md L175**. Thurgood updates the region quote and re-derives INSTALL.md. Everything else is green: `npm test` 9546/9546, `npm run test:consumer` 53 passed (1 skipped), `npx tsc --noEmit` clean.

**Erratum list for Thurgood (row → final string → `file:line`, `src/cli/shared/errorCatalog.ts` unless stated)**:
| Design row | Final | Where |
|---|---|---|
| `init` — next steps | as above | `initNextStepsMessage` (and `InitNextStepsContext.packageInstalledHere`) |
| jest.config.js collision (C27 A13) | the string in item 3 | `jestConfigCollisionMessage` |
| name contract: missing token | the same string, `See: install guide § "When sync reports a missing token".` | `src/cli/sync/NameContract.ts:69` |
| managed region — markers missing (agent-layer form) | `… Restore the markers (see install guide § "Your agent layer") or re-run attach` | `managedRegionMarkersMissingMessage` |

**Also found, not changed**: the README `init` writes into `src/components/` says "See the install doc's "Your first component" section for the merge model" (`src/cli/init.ts:600`): it uses the old name AND points at a section that does not exist. A user-facing string in a scaffolded file; Leonardo and Thurgood decide the target section before I reword it.
