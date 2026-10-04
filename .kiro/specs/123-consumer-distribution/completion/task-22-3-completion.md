# Task 22.3 Completion — the `product/` scaffold: placement, mechanics, the validity guard (Lina's share)

**Date**: 2026-10-03
**Agent**: Lina (Sonnet) for placement, `init`'s mechanics and the guard · Leonardo (Opus) authored `example-home.yaml`, `home-layout.yaml` and `overview.yaml` and ran the token inspection (his record: `design-inputs/example-home.record.md`, `55bbc1243`).
**Branch**: `task/123-u3-onboarding`, after 22.2 (`fa3c1be3a`). **Instruments block**: `completion/task-22-instruments.md` (rows 5.3, 5.4, 5.7 are this share; 5.5, 5.6 resolved by Leonardo's commit; 5.8 is Leonardo's inspection).
**Delegated-tier**: plan held (subtask; no parent line owed).
**22.3 is NOT ticked in tasks.md as complete for the whole subtask** — see "What this share does not cover".

## What changed

- **`src/cli/templates/product/**`** (new): Leonardo's three files placed **byte-equal**: `overview.yaml`, `experience-map/pages/example-home.yaml`, `templates/home-layout.yaml`. Ships through the existing `src/cli/templates/` `files[]` entry (no `files[]` line). Their `git hash-object` values equal the ones his record names (`3b513185…`, `df3366d1…`, `b0af4ef8…`).
- **`src/cli/init.ts`** (Step 5): `init` scaffolds the tree into `product/`, replacing `generateOverview()` (deleted). The one placeholder `__PRODUCT_NAME__` (once, in `overview.yaml`, inside a double-quoted scalar) is substituted with the product name, **escaped for the quoted scalar** (`\`, `"`, newline, tab), so any name parses back to itself. A path she already has is kept and reported with the generic skip line; every file written is recorded `generated`. `--re-scaffold`'s preview lists a missing scaffold file.
- **Tests**:
  - `src/cli/__tests__/productScaffold.test.ts` (new, 21 cases): placement equality and recorded hashes; the placeholder count and that the unsubstituted file parses; `init` places the files, substitutes (equal to the authored file after substituting a fixed test name; four awkward names round-trip), records them, keeps a colliding file; and **the guard** with bites.
  - `tests/consumer-integration.test.ts` (+3 in the packed lane): the guard from the **packed** install, in the born repo right after `init` and before `generate`, and bites (1) and (2) there.
- `tasks.md`: not ticked (below).

## The validity guard

Bar (design C27 erratum): product index status `healthy` (zero warnings); zero `_componentGaps`; gap detection LIVE (non-empty catalog); the example screen indexed; every referenced template and domain-object name exists (the guard's own limb, because the indexer indexes those names without resolving them); honest status fields (iOS and Android `not-started`).

- **In process** (`productScaffold.test.ts`), over the real `ProductIndexer` and the real package components: zero violations for the scaffold. Bites, each run:
  - **(1)** misspelled component (`Button-CTAA`) → `gap in example-home: Button-CTAA (not-found)`;
  - **(1b)** no component root → "gap detection is OFF", the reason there are two bites;
  - **(2)** a deleted `home-layout.yaml` → the indexer alone still reports `healthy`; the guard's existence limb reports "example-home references template "home-layout", which does not exist";
  - **(3)** `ios: complete` → the honest-status limb.
- **Packed** (`consumer-integration.test.ts`): `get_product_health` is `healthy`, `warnings: []`, `gapCounts {0,0}`, `catalogSize > 0`, one screen and one template; `get_screen_spec example-home` has no gaps, names `home-layout`, status iOS/Android `not-started`; `token-index/` is absent at that point (before `generate`). Bite (1) there (a copy via `PRODUCT_DIR`): a `not-found` gap and `totalGaps > 0`. Bite (2): the template is missing from the index while health still reads `healthy`.
- **A real bite on the shipped file**: I misspelled the component in the placed `example-home.yaml`, re-ran the packed guard, and it went **red**; the file was restored (byte-equal to the design input) and the lane re-run green.

## Targeted tests and result

- `npx jest src/cli/__tests__/productScaffold.test.ts`: **21 passed**; `init.test.ts`: 59 passed.
- `npm test`: **395 suites, 9541 passed**. `npx tsc --noEmit`: clean.
- `npm run test:consumer`: **53 passed, 1 skipped (the pre-existing `validate` skip), 0 failed**, including 22.2's notice and next-steps assertions from a real packed `init`.
- `npm run test:scripts`: **18 suites, 397: 396 passed, 1 FAILED**, the same intended red as 22.2's commit (`install-doc.test.ts` § 3, waiting on Thurgood's guide fix). 22.3 moves nothing in it.
- Not run: `test:pack-contents` and the three MCP sub-suites. `docs/tokens.css` was dirtied by the lane build and reverted.

## What this share does not cover

- **Leonardo's ui-tree token inspection** (row 5.8, "token → `get_token_details` result" table "in 22.3's completion doc") is **his** and is in his record (`design-inputs/example-home.record.md`, § "Inspection"): `color.structure.canvas` and `space.inset.200`, both exist (checked by him against the Application MCP). I did not re-run it.
- **Packaging** (the `pack-assert` exact set over `src/cli/templates/**`, incl. these three files) is 22.3b (Ada).
- **The personal-note example** is **not placed** (Peter has not approved it; rows 2.2/2.3 stay MISSING); the `test.failing` / `it.failing` pending items are untouched.
- **22.3's parent-level wording** "(Lina) placement … + validity guard" is done here; the subtask line stays unticked until Leonardo's share is accepted by the orchestrator (his record says "22.3 is NOT ticked"). I did not tick it on his behalf.

## Application-time adaptations

- **The guard test `require`s `ProductIndexer`** (typed with a local interface) rather than importing it: `product-mcp-server/src` is outside the root `tsconfig`'s `rootDir`, so a typed import failed `tsc` (TS6059).
- **The same guard bar in two places**: an in-process version (fast, runs in `npm test`) and the packed version (the lane the criterion names). The existence limb in the packed lane compares `get_screen_spec`'s template against `list_product_templates`, because the test cannot import the in-process helper across the `tests/` boundary.
- **The placeholder is substituted by `split/join`**, not `replace`, so a product name containing `$&` or `$1` is written literally.
- **`init`'s old `generateOverview()` is gone**: the product overview is now Leonardo's file (description, register, and a free-form `platforms` map). No other consumer read the old section headings (`## Product Context`, `## Platform Status`).

## Claims, and what each rests on

| # | Claim | Rests on | State |
|---|---|---|---|
| 1 | The scaffold source is byte-equal to Leonardo's inputs, and each hash equals his record's | `src/cli/templates/product/**`; `productScaffold.test.ts` (equality; `git hash-object`) | VERIFIED-CODE |
| 2 | `init` places all three files into `product/`, substituting the name once; the substituted overview parses back to any name | `src/cli/init.ts:256-263`, `:756-790`; `productScaffold.test.ts` | VERIFIED-CODE |
| 3 | Files are recorded `generated`; a colliding file is kept and not recorded; `--re-scaffold` previews a missing one | `init.ts:263`, `:503`; `productScaffold.test.ts` | VERIFIED-CODE |
| 4 | The scaffolded tree indexes `healthy`, zero warnings, zero gaps, live gap detection, template exists, honest status | `productScaffold.test.ts` (in process); `consumer-integration.test.ts:2097` (packed, before `generate`) | VERIFIED-CODE (run) |
| 5 | Bite (1): a misspelled component → `not-found`; bite (2): a missing template is caught by the guard's own check | `productScaffold.test.ts`; `consumer-integration.test.ts:2124,2142`; a real mutation of the shipped file went red | VERIFIED-CODE (run) |
| 6 | The example screen's component and token names exist | Leonardo's inspection, `example-home.record.md` | VERIFIED by Leonardo (against the Application MCP); not re-run by me |
| 7 | `overview.yaml`'s `platforms` map is read by code | nothing: only `brand` and `register` are read (`ProductIndexer.ts:123-128`, per his record) | **DESIGN-ONLY** (a convention) |
| 8 | The guide's § "UI Tree Convention (Draft)" agrees with the example's `content:` key | nothing yet | **DESIGN-ONLY**: owed at 19.5 by Leonardo and Thurgood (his record) |

## Notes

- **Unverified by me**: a real terminal view of a fresh `init`'s `product/` tree through a harness (no harness was run); Leonardo's token checks; the guide's description of the new overview's shape (it describes a generic `overview.yaml`; nothing in it is false against the new file).
- **Counter-argument and residual**: scaffolding a worked example screen into every product means a new founder's Product MCP starts with one screen they did not write, and `find_screens` returns it forever until they delete it. The example's own header says so ("keep it, edit it, or delete it"), and the guard binds its health, not its usefulness; whether an example in the index is better than an empty `product/` is Leonardo's and Peter's call, made in the plan.
