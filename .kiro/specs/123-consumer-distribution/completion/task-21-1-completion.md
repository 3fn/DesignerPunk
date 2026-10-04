# Task 21.1 Completion — the CI-needs starter spec, and the structure test

**Date**: 2026-10-03
**Agent**: Thurgood (Opus) · PRIMARY, Task 21
**Branch**: `task/123-u3-onboarding`, after the Task 21 instruments block (`d93d1b95e`)

## What changed

- **`src/cli/templates/starter-specs/ci-needs/needs.md`** (new): four needs, **need count 4** — two minimal core, two optional hardening. Each need has a Tier, a Why, an Applies-when, a Check, a Bite recipe and a two-sided Price line.

  | Need | Title | Tier |
  |---|---|---|
  | N1 | Committed platform output matches `generate` (design C25's mandated need) | minimal core |
  | N2 | After a package update, the name contract is clean | minimal core |
  | N3 | Your own component tests run | optional hardening |
  | N4 | Product token references resolve | optional hardening |

- **`src/cli/templates/starter-specs/ci-needs/tasks.md`** (new): six checkbox tasks for the consumer's agent: inventory, decide (quoting each need's price), implement, gate (red blocks merge), arm (each bite recipe run red **in CI**, then green), close.
- **`scripts/__tests__/starter-specs.test.ts`** (new, 27 tests, shared with 21.2). For the CI-needs spec it asserts:
  - every need's tier, bite recipe, two-sided price, check and why;
  - C25's need is present and minimal core;
  - the recorded count equals the parsed needs, by tier;
  - the arming task;
  - vocabulary only in `vocabulary.ts`'s words, and `attach` only with its object;
  - both harnesses' paths or neither;
  - a repo-specifics deny-list.
- **The install region agrees, so no region edit was made.** § 8 (guide L235–247) says the needs carry the why, a bite recipe, a tier and both costs. It gives C25's example, "edit a token without regenerating, and the check goes red", and says `init` places the spec in `specs/`. Every one of those holds in `needs.md`. COMMIT-POLICY's `specs/**` row (repo state) and its "platform output is committed by default" section agree with N1's Why and Applies-when.

## Bite recipes — each RUN in a scratch born repo

**The scratch repo**:
- `npm pack --ignore-scripts` of this branch at `a9ece59fd`, plus the uncommitted 21.1 files. The tarball did not contain them, and none of the recipes depends on them.
- Installed into a fresh `git init` scratch directory outside this repo, then `npx designerpunk init --target=cc --name MyProduct --abbreviation MP`, then `npx designerpunk generate`, then a baseline commit.
- Node v22.20.0, git 2.50.1.
- For each need: check green at baseline → apply the bite → check **red** → revert → check green.

| Need | Check as run | Baseline | Bite | Red output | Reverted |
|---|---|---|---|---|---|
| N1 | `generate`, then `git diff --exit-code -I 'Generated: \|generatedAt' -- dist/tokens`, plus no untracked files there | green | `space125: { value: 10` → `12` in `src/tokens/SpacingTokens.ts`, not regenerated | "output differs" | green |
| N2 | `generate`, then `sync --dry-run` output must contain `name contract: clean` | green | grouped spacing `normal` → `normalx` in `src/tokens/semantic/SpacingTokens.ts` | not clean; `sync` printed `components now expect token '--space-grouped-normal' …` | green |
| N3 | `npx jest --passWithNoTests` (with the jest devDependencies installed) | green | a test asserting `expect(1).toBe(2)` under `src/components/__tests__/` | `Tests: 1 failed` | green |
| N4 | `validate --product-tokens`, with `productTokens` set and one `product/tokens/layout.yaml` | green ("All product token references valid") | `ref: space300` → `space999` | exit 1, "1 broken reference found" | green |

**Not run**: the recipes inside a real CI. The spec's task 5 makes that the consumer's arming step. The runs above establish that each check bites in a born repo, not that a given CI wires it correctly.

## Claim ledger (class guard: every behaviour, path and command claim in the spec)

Marks: **VERIFIED-RUN** (observed in the scratch born repo), **VERIFIED-CODE** (read at the line), **DESIGN-ONLY** (built later in U3), **EXTERNAL** (outside DesignerPunk).

| Claim (file) | Source | Mark |
|---|---|---|
| "`npx designerpunk init` placed this spec in your repo" (`tasks.md`) | Task 21.3 (Lina) builds it; `init.ts` has no `specs/` scaffold at `a9ece59fd` | DESIGN-ONLY |
| By default the repo commits the platform output (N1 Why) | `docs/consumer/COMMIT-POLICY.md` § "Platform output is committed by default"; the `.gitignore` block's commented output line (seen in the born repo) | VERIFIED-RUN |
| The output directory is `output` in `designerpunk.config.ts` | `src/config/defineConfig.ts:47`; born repo `dist/tokens` | VERIFIED-RUN |
| Every `generate` run rewrites a `Generated:` line, and `"generatedAt"` in DTCG | `src/generators/TokenFileGenerator.ts:307,382,461`; `src/generators/DTCGFormatGenerator.ts:238`. Two consecutive runs in the born repo differed in 7 files, only in those lines | VERIFIED-RUN + VERIFIED-CODE |
| `git diff -I` needs git 2.30 or later | git's own release notes (not read here); ran with 2.50.1 | EXTERNAL |
| A spacing value lives in `src/tokens/SpacingTokens.ts` | `init` copies `src/tokens` (`src/cli/init.ts:193-202`); born repo | VERIFIED-RUN |
| `sync` reports "components now expect token …" and never adds the token | `src/cli/sync/NameContract.ts:65-69`; `src/cli/sync/index.ts:4-9` | VERIFIED-CODE + VERIFIED-RUN |
| `sync --dry-run` prints the name contract; `name contract: clean` | `src/cli/sync/index.ts:528` (computed), `:561` (dry-run returns after the report); `NameContract.ts:101` | VERIFIED-CODE + VERIFIED-RUN |
| `sync`'s exit code does not reflect its report | `src/cli/designerpunk.ts:491-492` (`runSyncCommand` sets no code); born repo exit 0 with the report present | VERIFIED-CODE + VERIFIED-RUN |
| The grouped spacing `normal` key, and the token `--space-grouped-normal` | born repo `src/tokens/semantic/SpacingTokens.ts`; the `sync` output | VERIFIED-RUN |
| A component in `src/components/` wins on its declared name | `application-mcp-server/src/indexer/ComponentIndexer.ts:178-181` | VERIFIED-CODE |
| `init` writes `jest.config.js` (the preset) | `src/cli/init.ts:277-284`; born repo | VERIFIED-RUN |
| Jest exits non-zero with no tests, so `--passWithNoTests` | born repo: `npx jest` exit 1 ("No tests found"); with the flag, exit 0 | VERIFIED-RUN |
| Five test devDependencies | guide § Running Component Tests (the install command); `src/testing/jest-preset.ts:18-24` (per `owner-review/lina.md`) | VERIFIED-CODE |
| `@3fn/core/testing` helpers do not resolve under the preset in an installed package | Lina's packed-install reproduction (`completion/task-19-4-owner-review/lina.md`) | VERIFIED-RUN (Lina's) |
| `productTokens` in config; `generate` refreshes `token-index/`; `validate --product-tokens` exits non-zero on a broken ref | `src/config/defineConfig.ts:62`; `src/cli/designerpunk.ts:268`; `src/cli/validateProductTokens.ts:50-53` | VERIFIED-CODE + VERIFIED-RUN |
| Verb descriptions (`generate`, `sync`, `validate`) | `src/cli/shared/vocabulary.ts` `LIFECYCLE_VERBS`, asserted by the test | VERIFIED-CODE |

## Candidates considered and NOT shipped as needs

- **`npx designerpunk validate` passes** (token definitions). Its bite is writable, but the check is **red at birth**: on the token source `init` copies, the mathematical-relationships check fails, with 102 errors listed (font sizes, scales, blur and others). This was reproduced in the scratch born repo, and in this repo too (`npx designerpunk validate`: exit 1, "1 of 4 checks failed"). A need that is red before the consumer changes anything would be skipped wholesale, so it is not shipped. **Finding, routed to Ada.**
- **The type contract after an update** (`sync` reports "the token type contract changed"). Its bite needs a second package version to exist, so it cannot be written as a recipe a consumer runs in a born repo. Not shipped (Req 17.2).
- **No hand-edits to generated agent files** (`sync` reports conflicts). DesignerPunk's guarantees do not depend on it, because `sync` never overwrites a conflict. Not shipped. The support surface applies per need.

## Targeted tests + result

- `npx jest --config scripts/jest.config.js scripts/__tests__/starter-specs.test.ts`: 27/27.
- `npm run test:scripts`: 18/18 suites, 396/396 tests.
- `npx tsc --noEmit`: exit 0.
- `npm test`: 391/391 suites, 9426/9426 tests.
- No-overlap diff: empty.
- **Test bites** (each mutation applied, then restored; `diff -r` confirms):
  - a third spec directory;
  - a need's tier changed;
  - a bite recipe without "goes red";
  - a one-sided price;
  - the C25 need retitled;
  - the recorded count changed;
  - the arming task's "in your CI" removed;
  - a drifted `sync` description;
  - a bare `attach`;
  - a repo-specific path (`.kiro/specs`).

  Each turned its own test red.

## Application-time adaptations

1. **N1's check ignores the timestamp lines.** A byte comparison is red on every run, because `generate` stamps a time into every output file. The `-I` form, run here, is green at baseline and red on the bite. **Finding, routed to Ada**: `generate`'s output is not deterministic across runs, which every consumer adopting C25's need will meet.
2. **N3 uses `--passWithNoTests`.** A born repo has no tests, and Jest exits 1. The guide's § Running Component Tests shows bare `npx jest # Run all tests`, which fails the same way in a born repo with no tests. **Flag for Lina** (her section). The guide is not edited here.
3. **Structure**: the spec is a directory, `ci-needs/needs.md` plus `ci-needs/tasks.md`, so the declarations and the executable tasks are separate files. `tasks.md` writes its record to a consumer-side `notes.md`.
4. **One commit for 21.1 and 21.2.** The structure test covers both specs, so splitting them would leave a red intermediate commit.

## Addendum (2026-10-03) — owner confirmations applied

Records: `completion/task-21-owner-review/{ada,stacy}.md`, each byte-equal to the copy the orchestrator relayed.

| Need / task | Owner | Verdict | Applied |
|---|---|---|---|
| N1 Committed platform output matches `generate` | Ada | CONFIRMED-WITH-CORRECTIONS | Ada's Check bullet, verbatim: `generate --force`, and the product-token stamp added to the `-I` pattern. **Plus one correction of Thurgood's own** (see below) |
| N2 the name contract (the token example) | Ada | CONFIRMED | — |
| N2 the `sync` check | Lina | routed by the orchestrator; no record received here | — |
| N3 your own component tests | Lina | routed by the orchestrator (her § Running Component Tests, finding 3) | — |
| N4 product token references | Ada | CONFIRMED | — |
| `tasks.md` T1–T3 | Stacy | CONFIRMED | — |
| `tasks.md` T4 Gate | Stacy | GAP → corrected | her text, verbatim |
| `tasks.md` T5 Arm | Stacy | GAP → corrected | her text, verbatim |
| `tasks.md` T6 Close | Stacy | GAP; a correction is offered, but whether it suits a solo founder is an open fork | **HELD** (the old text stays) until the orchestrator returns the fork |

**The corrected N1 recipe was re-run**, in the same scratch born repo with `productTokens` configured and one `product/tokens/layout.yaml`, at a new committed baseline:
- baseline: green;
- bite A, a spacing value edited: red;
- bite B, the product token `ref: space300` → `space400`: red;
- revert: green.

**Ada's `--force` reasoning, verified by run**: with that product-token edit backdated (`touch -t 202001010000`), a plain `generate` did **not** regenerate the product output, so the change was masked; `generate --force` caught it, and the check went red.

**One more correction, found by that re-run (Thurgood's own text, carried in Ada's bullet)**: the second sub-bullet, "`git status --porcelain --untracked-files=all -- <output>` prints nothing", is **false**. After `generate`, every stamped file shows as modified (` M`), because its timestamp changed. The baseline went red on the first re-run for exactly that reason. My 21.1 runner masked it with an untracked-only test, so the shipped sentence and the run I recorded disagreed.
- **Replaced with** "`git ls-files --others --exclude-standard -- <output>` prints nothing (no new, uncommitted output file)", which is what the run checks.
- **Ada should confirm the replacement**: it sits inside her corrected bullet.

**Findings handled elsewhere**: `validate` red on unmodified source becomes the region and reference sentences (`task-19-1-completion.md` § "Addendum 4"). Generator determinism (10 stamped files, per Ada) is Ada's issue to file. Nothing in N1 changes for it beyond the `-I` pattern.

**Note on N3 and Lina's section** (finding 3 is routed to Lina): N3 says `npx jest --passWithNoTests`. If her fix to § Running Component Tests uses a different form, for example a starter test file instead of the flag, N3 and the guide would disagree. Flag it when her fix lands.
