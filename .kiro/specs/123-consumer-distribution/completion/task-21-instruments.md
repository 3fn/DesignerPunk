# Task 21 — Instruments block

**Written**: 2026-10-03, before subtask 21.1 (unit head `a9ece59fd`) · **PRIMARY**: Thurgood (Opus)

**Binding**: the instrument-existence ballot (`.kiro/docs/ballots/2026-09-28-parent-instrument-existence-check.md`) is RATIFIED (Peter, 2026-09-29), and Spec 123 stays on M1's execution-time form (ballot § 4a). No subtask of Task 21 has started; this block is the parent's first commit.
**Sha convention**: each `exists` row names the commit that last touched `<path>` as of `a9ece59fd`. Each was checked with `git cat-file -e <sha>:<path>` and `git merge-base --is-ancestor <sha> a9ece59fd`, and every one passed. For a command, `<path>` is its defining file.
**Criteria order**: Task 21's criteria in `tasks.md` order (`tasks.md` @ `a9ece59fd`, L1112–1136). The parity parser reads **7** criterion rows (`parseTasksMd`, 0 malformations): C1 CI-needs bites/prices · C2 the re-grounding spec's report · C3 `init` scaffolds · C4 location and shipping · C5 vocabulary · C6 P3 tiering · C7 21.3 is Lina's.

| # | Criterion (short ref) | Instrument | State | Fit (one line, `exists` rows) | Dependent subtasks |
|---|---|---|---|---|---|
| 1.1 | C1 the CI-needs spec | `src/cli/templates/starter-specs/ci-needs/…` | built here (21.1) | — | 21.1 |
| 1.2 | C1/C6 every need has a bite recipe, a two-sided price line and a tier; "committed platform output matches `generate`" is present; need count recorded | `scripts/__tests__/starter-specs.test.ts` | built here (21.1) | — | 21.1 |
| 1.3 | C1 the mandated need | design C25 ("committed platform output matches `generate`", with its bite) | exists (`.kiro/specs/123-consumer-distribution/design.md` @ `53a3d413b`) | the C25 bullet names the need and its bite | 21.1 |
| 1.4 | C1 needs, prices and tiers: their source | Req 17.1–17.6 (P2 non-negotiable; P3 tiers; P4 both sides; scaffolder, not integrations) and outline § 5.2 | exists (`.kiro/specs/123-consumer-distribution/requirements.md` @ `669b51b09`; `.kiro/specs/123-consumer-distribution/design-outline.md` @ `a062f44b3`) | Req 17 fixes the shape every need must carry; outline P3 names candidate core needs | 21.1 |
| 1.5 | C1 each bite recipe actually goes red (class guard: a recipe that does not bite in a born repo is a false claim) | a scratch born repo, built from the packed tarball (`npm pack`), outside this repo; each recipe run there, red then reverted | exists (`package.json` @ `762b8c209`: `bin`, `files`, the `designerpunk` CLI) | `npm pack` produces the consumer's package; `init`/`generate`/`validate`/`sync` run from it as a consumer would | 21.1 |
| 1.6 | C1 the CLI exit codes the recipes depend on | `validate` exits 1 on any failed check; `generate` exits 1 on system or product failure; `sync` returns no failing exit code | exists (`src/cli/validate.ts` @ `34b26b5a9`; `src/cli/designerpunk.ts` @ `d949ce8b7`; `src/cli/sync/index.ts` @ `a9ece59fd`) | `validate.ts:42`; `designerpunk.ts:305-311`; `runSync` returns an outcome and `runSyncCommand` (`designerpunk.ts:491-492`) never sets a code, so a `sync`-based need must test its report text, not its exit code | 21.1 |
| 1.7 | C1 the install region already describes the CI-needs spec | guide region § 8 | exists (`governance/DesignerPunk-Integration-Guide.md` @ `f45ccce7e`) | L235–247: needs with why, the bite rule, tiers, both costs, the C25 example, and "`init` places in your repo's `specs/`" — the spec must agree | 21.1 |
| 2.1 | C2 the re-grounding spec | `src/cli/templates/starter-specs/regrounding/…` | built here (21.2) | — | 21.2 |
| 2.2 | C2 its tasks include the report of what did not transfer | a `starter-specs.test.ts` assertion | built here (21.2) | — | 21.2 |
| 2.3 | C2 the contract it instantiates | Req 11 (re-ground / subtract; the closed vocabulary) and Req 16.1, 16.5; Req 24.1 (U5 runs it: consumer-Thurgood formalizes a spec, then consumer-Stacy verifies it) | exists (`.kiro/specs/123-consumer-distribution/requirements.md` @ `669b51b09`) | 16.1 names the three jobs (re-point, establish the steering/spec surface, report); 24.1 requires the spec to assign spec-formalization work | 21.2 |
| 2.4 | C2 who runs it | consumer-Thurgood's rendering (spec formalization; write scope `specs/**`) | exists (`canonical/_consumer-output/cc/.claude/agents/thurgood.md` @ `669b51b09`; `canonical/_consumer-output/kiro/.kiro/agents/thurgood-prompt.md` @ `669b51b09`) | the rendering's in-scope list carries spec formalization, and its write scope is `specs/**`, the scaffold home | 21.2 |
| 3.1 | C3 `init` scaffolds both into `specs/`, reporting on collision (`init.test.ts`) | `src/cli/init.ts` + `src/cli/__tests__/init.test.ts` | MISSING → Lina: Task 21.3 (`tasks.md` L1127–1128, L1134) → resolved 2026-10-03: built here (21.3) (`.kiro/specs/123-consumer-distribution/completion/task-21-3-completion.md`; `scaffoldStarterSpecs` in `src/cli/init.ts`, seven cases in `src/cli/__tests__/init.test.ts` § "the starter specs into specs/") | — | none of 21.1/21.2; Task 21's close |
| 3.2 | C3 the consumer-side home | `COMMIT-POLICY.md`'s `specs/**` row ("repo state") | exists (`docs/consumer/COMMIT-POLICY.md` @ `7e838ed10`) | `specs/**` is committed repo state, so a scaffolded spec is the consumer's file once written | 21.1, 21.2 |
| 4.1 | C4 location ships through the existing `files[]` entry | `package.json` `files` contains `src/cli/templates/` | exists (`package.json` @ `762b8c209`) | the entry is a directory prefix, so `starter-specs/**` beneath it packs with no `files[]` edit | 21.1, 21.2 |
| 4.2 | C4 each spec file gets a `pack-assert` ADD-present row | `scripts/pack-assert.ts` rows | MISSING → Ada: Task 22.3b (the packaging subtask, FK-2; `tasks.md` L1122) | — | none of 21.1/21.2; Task 21's close |
| 5.1 | C5 vocabulary consistency, starter specs vs `vocabulary.ts` | a block in `starter-specs.test.ts` importing `LIFECYCLE_VERBS` / `attachUsage` | built here (21.1/21.2) | — | 21.1, 21.2 |
| 5.2 | C5 the forms it imports | `src/cli/shared/vocabulary.ts` | exists (`src/cli/shared/vocabulary.ts` @ `669b51b09`) | `LIFECYCLE_VERBS` descriptions and `attachUsage()`; read, never reworded | 21.1, 21.2 |
| 5.3 | C5 the test file is run | `npm run test:scripts` (`scripts/jest.config.js` testMatch `**/__tests__/**/*.test.ts`) | exists (`scripts/jest.config.js` @ `5b86393be`) | `scripts/__tests__/starter-specs.test.ts` is selected (the same root picked up `install-doc.test.ts`) | 21.1 |
| 6.1 | C6 P3 tiering asserted | the tier assertion in `starter-specs.test.ts` (minimal core or optional hardening) | built here (21.1) | — | 21.1 |
| 7.1 | C7 21.3 is Lina's; order 21.3 after 21.1/21.2 and before 22.2 | the chain `20.2 → 21.3 → 22.1 → 20.3 → 22.2` | exists (`.kiro/specs/123-consumer-distribution/tasks.md` @ `a9ece59fd`) | L1127–1128 state the seat and the order; 20.2 is merged into the branch at `a9ece59fd` | — (21.3 starts after this parent's files exist) |

**Counts (at writing, 2026-10-03)**: N = 20 — exists 11 · built-here 7 · missing 2 · unlisted 0.

**MISSING rows**: neither blocks 21.1 or 21.2. Row 3.1 is the planned 21.3 (Lina), and row 4.2 is the planned 22.3b (Ada). Both bear on when Task 21 can close.

**Resolutions of MISSING rows** are appended in-row, in the form `→ resolved <date>: <new state> (<record>)`.

## Found later
- 2026-10-03 — unlisted — a design catalog row for the starter-spec collision report and the scaffold summary line — criterion C3 ("`init` scaffolds both into `specs/`, reporting on collision") — found at 21.3 (Lina) — the criterion names no text, and design.md § Error Handling has no row for either string. Both were authored in `src/cli/shared/errorCatalog.ts` as `starterSpecCollisionMessage` and `starterSpecsWrittenMessage`, each marked "AUTHORED AT 21.3", and asserted by `init.test.ts`. Route: a design erratum row owed, wording for Leonardo, formalization Thurgood; the same erratum as the Task 20 entries (see `task-20-instruments.md` § "Found later", the dated pointer note).

**Counts (current, 2026-10-03, after 21.3)**: N = 20 — exists 11 · built-here 8 · missing 1 (row 4.2, Ada's 22.3b) · unlisted 1.

