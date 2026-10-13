# Task 20.3 Completion — a fresh clone of a policy-applied repo runs joining steps 2–4

**Date**: 2026-10-03
**Agent**: Lina (Sonnet) · PRIMARY, Task 20
**Branch**: `task/123-u3-onboarding`, after 22.1 (`ff5f2d53f`). **Instruments block**: `completion/task-20-instruments.md`; row 4.4 resolved in-row by 22.1, two `## Found later` entries appended here.
**Delegated-tier**: plan held (subtask; no parent line owed).

## What changed

- **`tests/consumer-integration.test.ts`**: one new `describe`, "Spec 123 Task 20.3 — a fresh clone of a policy-applied repo runs joining steps 2-4 (C24; A8)", inside the Consumer Guard. It is **built at test time and nothing is committed** (R2, Lina RC-4):
  1. a founder repo: `npm init`, `npm install` of the PACKED tarball (saved), a `.gitignore` already holding `node_modules/`, then `init` (which appends the DesignerPunk block, 20.2) and `generate`;
  2. the commit policy applied: `git add -A && git commit`, so exactly the repo state the policy names is in git;
  3. `git clone`, then joining step 2 (`npm install`, from the committed lockfile and the packed tarball) and step 3 (`npx designerpunk generate`).
- Six cases: the founder repo's tracked set is exactly the policy's commit column and none of its right-hand column (`token-index/`, `.designerpunk/`, `node_modules/`); the clone starts without the regenerated and local files; step 2 restored the package; step 3 `generate` succeeded and regenerated `token-index/` and `dist/tokens/`; **step 4: `.designerpunk/personal-note.local.md` was created by `generate`, byte-equal to the template the installed package ships, untracked, with the "created" row and no unignored-directory row**; and the clone's `.gitignore` carries the founder's block.
- `tasks.md`: 20.3 ticked.

**Scope, as the criterion words it**: file-provable completeness, not harness session load. Whether Claude Code's `@`-import of the freshly created, gitignored note loads on a fresh clone is unmeasured until U5 (C8(c)).

## Targeted tests and result

- `npm run test:consumer` (the packed-install lane): **50 passed, 1 skipped (the pre-existing `validate` skip), 0 failed**, run twice (once before and once after the bite below). It includes 22.1's three 16.6 flips running against a real packed install, and the six new cases.
- **Bite** (made, run red, restored; the lane re-run green after): with `generate`'s posture gate forced to a non-born state, **joining step 4 goes red** (the note is not created) while steps 2–3 stay green.
- `npx tsc --noEmit`: clean. `npm run test:scripts`: 18 suites, 397 passed. `npm test`: 394 suites, 9511 passed.
- **Not run**: `test:pack-contents` and the `mcp-server`, `application-mcp-server`, `product-mcp-server` suites. The build `test:consumer` runs dirtied `docs/tokens.css`; reverted each time (`git status` clean apart from the test file).

## Application-time adaptations

- **The founder and the clone are siblings under one temp parent**: the saved dependency is a `file:` path relative to the founder directory, so a clone anywhere else could not restore the tarball (`## Found later`, row 4.3's `misfit`).
- **The founder's `.gitignore` already holds `node_modules/`** before `init` runs: the block ignores exactly `token-index/` and `.designerpunk/` and nothing else, so `git add -A` would otherwise commit `node_modules/` (`## Found later`, `unlisted`).
- **The founder also runs `generate`** before committing, so the platform output the policy commits by default (DD1) is in the history and the clone's `generate` runs over a repo that already carries `dist/tokens/`.
- **Not part of the case**: `sync` (the joining path never runs it), and the harness restart step 5.

## Claims, and what each rests on

| # | Claim | Rests on | State |
|---|---|---|---|
| 1 | The tracked set of a policy-applied founder repo includes the config, manifest, `package.json`, lockfile, `.gitignore`, `.designerpunkignore`, token tier, `CLAUDE.md`, a starter spec, the generated agent files and the platform output, and none of `token-index/`, `.designerpunk/`, `node_modules/` | `tests/consumer-integration.test.ts` first 20.3 case (`git ls-files` after the policy commit) | VERIFIED-CODE (run) |
| 2 | `npm install` in a fresh clone restores the packed package | second and third cases | VERIFIED-CODE (run) |
| 3 | `generate` in the clone succeeds and regenerates `token-index/` and the platform output | fourth case | VERIFIED-CODE (run) |
| 4 | `generate` creates `.designerpunk/personal-note.local.md` from the template in the clone, prints the "created" row, no unignored row, leaves nothing untracked | fifth case; `src/cli/designerpunk.ts:252-263`; `src/cli/shared/personalNote.ts` | VERIFIED-CODE (run) |
| 5 | The founder's block (`init`, 20.2) is what the clone carries | sixth case; `src/cli/init.ts` Step 11 | VERIFIED-CODE (run) |
| 6 | CC's `@`-import of the freshly created note loads on a fresh clone | nothing | **DESIGN-ONLY**: unmeasured until U5 (C8(c)); out of this case's scope |

## What remains for Task 20's parent

20.1, 20.2 and 20.3 are done on the branch. **Not written: the parent completion doc.** What it still needs:
- **C7** (`COMMIT-POLICY.md` ships as an explicit `files[]` path with its `pack-assert` ADD-present row) is **22.3b's** (Ada): instruments row 7.3, still MISSING. Per the guide, a nonzero `missing` at completion is legal only with the criterion ⚠️ and its follow-up link; or the parent doc waits for 22.3b.
- **C8's offer** (20.2) is built; its interactive prompt against a real terminal is unverified.
- The parent doc reproduces the eight success-criterion rows verbatim with Status + Evidence, the forced-negative line, the `**Instruments**:` header line (counts above), and `docs/specs/123-consumer-distribution/task-20-summary.md`.

## Notes

- **Unverified by me**: a real-terminal run of the interactive `[y/N]` offer; the 22.2-owned strings (naming row, born-repo row).
- **Counter-argument and residual**: the case proves the files and the commands, not the experience. A joiner whose harness does not load a gitignored `@`-imported note on a fresh clone gets a created file that the agent never reads, and nothing here can show it (U5's persona run is the instrument).
