# Task 21.3 Completion — `init` scaffolds the starter specs into `specs/`

**Date**: 2026-10-03
**Agent**: Lina (Sonnet) · subtask 21.3 of Task 21 (PRIMARY: Thurgood). Task 21's instruments block is Thurgood's (`completion/task-21-instruments.md`); row 3.1 resolved there, not overwritten.
**Branch**: `task/123-u3-onboarding`, after 21.1/21.2 (`ea348aa76`).

## What changed

- **`src/cli/init.ts`**: Step 11a, between the `.designerpunkignore` step and the `.gitignore` block.
  - `scaffoldStarterSpecs` writes `src/cli/templates/starter-specs/<spec>/<file>` to `specs/<spec>/<file>`: `specs/ci-needs/{needs,tasks}.md` and `specs/regrounding/tasks.md` (the layout the starter specs' own text names: `specs/ci-needs/`, `specs/regrounding/report.md`).
  - **Never overwrites.** A path that exists is kept byte-identical, reported, and not recorded.
  - Every file written is recorded `origin: 'generated'` (C1's manifest row, "no generated file lacks an entry"); after the write it is the consumer's, and `sync` never reads it.
  - `--re-scaffold`'s preview lists a starter-spec file that is missing, so a deleted one is never re-added silently (Req 15A.3's "resurrection is never silent").
  - If the package carries no `starter-specs` source (a diet defect), `init` prints the existing degradation catalog string instead of silently scaffolding nothing.
- **`src/cli/shared/errorCatalog.ts`**: `starterSpecCollisionMessage` and `starterSpecsWrittenMessage`, **authored here**: the design catalog has no row for either (`task-21-instruments.md` § "Found later").
- **`src/cli/__tests__/init.test.ts`**: seven cases.
- `task-21-instruments.md`: row 3.1 resolved in-row (the original MISSING stays readable), a `## Found later` entry, current counts. `task-20-1-completion.md`: addendum, row 8. `task-20-instruments.md`: the dated pointer note on the design erratum. `tasks.md`: 21.3 ticked.

## Targeted tests and result

- `npx jest src/cli/__tests__/init.test.ts`: **49 passed** (42 before, +7).
- **Bite** (each mutation made, run red, restored): overwrite on collision → 2 red; no manifest record → 1 red; no `--re-scaffold` preview → 1 red.
- `npm run test:scripts`: **18 suites, 396 tests passed** (including Thurgood's `starter-specs.test.ts`). **No install-doc assertion moved.**
- `npm test`: **391 suites, 9433 tests passed**. `npx tsc --noEmit`: clean.
- **Not run**: `test:consumer`, `test:pack-contents`, the MCP sub-suites. The `src/cli/templates/` directory already ships through its `files[]` entry (`package.json`), so 21.3 needs no `files[]` edit; the `pack-assert` rows for the three spec files are 22.3b's (Task 21 instruments row 4.2).

## Application-time adaptations

- **Mirror layout**: `specs/<spec>/<file>`, because the starter specs' own text points at `specs/ci-needs/` and `specs/regrounding/report.md`.
- **Recorded in the manifest**, although the files become the consumer's immediately: C1's manifest row says every file `init` wrote has an entry, and `jest.config.js` and `tsconfig.test.json` are recorded the same way.
- **The re-scaffold preview** change is beyond the criterion's words and inside Req 15A.3's.
- None otherwise.

## Wording checked against what was built (no edits made)

- **Guide § 8 and INSTALL.md § 8**: "The CI-needs starter spec, which `init` places in your repo's `specs/`, carries the needs. Your agent runs it." Agrees: `init` places `specs/ci-needs/`, the spec's own tasks say "Run it with your agent".
- **`COMMIT-POLICY.md`**: `specs/**` is listed as committed repo state; agrees. The doc does not describe the scaffold, so there is nothing to contradict.
- **`init`'s next steps** (`printNextSteps`) do not yet mention `specs/`. That line is Task 22.2's ("whose next steps list the `specs/` scaffold"), not 21.3's.
- No disagreement found.

## Claims, and what each rests on

| # | Claim | Rests on | State |
|---|---|---|---|
| 1 | `init` scaffolds both starter specs into `specs/` | `src/cli/init.ts:344-352` (Step 11a), `:529-553` (`scaffoldStarterSpecs`); `init.test.ts` ("scaffolds both … byte for byte") | VERIFIED-CODE |
| 2 | Exactly two starter specs ship from the source `init` reads | `src/cli/templates/starter-specs/{ci-needs,regrounding}/`; `init.test.ts` ("ships exactly two"); Thurgood's `starter-specs.test.ts` | VERIFIED-CODE |
| 3 | A path that exists is kept, reported, and not recorded | `init.ts:538-541`; `init.test.ts` RED case | VERIFIED-CODE |
| 4 | Written files are recorded `generated` with the hash of the bytes written | `init.ts:546` (`recordFile`, `init.ts:62-73`); `init.test.ts` | VERIFIED-CODE |
| 5 | `--re-scaffold` lists a missing starter spec and re-adds it, leaving an edited sibling alone | `init.ts` `previewReScaffold` (the added loop); `init.test.ts` | VERIFIED-CODE |
| 6 | `src/cli/templates/` ships through the existing `files[]` entry | `package.json` `files` (L31 at `762b8c209`: `"src/cli/templates/"`); `design.md` L275-L276 | ratified record; not re-run via `test:pack-contents` (U) |
| 7 | The guide § 8 sentence is true as stated | rows 1-2 | VERIFIED-CODE |

## Notes

- **Unverified**: the packed-install result (`test:consumer` not run); that `files[]` ships the nested `starter-specs/**` files (a directory prefix, per design; not packed here).
- **Counter-argument and residual**: scaffolding at birth means every founder gets two spec folders whether or not they ever run them, and the CI-needs spec's `notes.md` is created later by the agent, not by `init`. The plan chose scaffold-at-init (Req 16.3); the residual is clutter in `specs/` for a user who never uses them, which `COMMIT-POLICY.md` also tells them to commit.
- **Delegated-tier**: plan held (subtask; no parent line owed).
