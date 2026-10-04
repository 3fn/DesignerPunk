# Task 20.1 Completion — `COMMIT-POLICY.md`

**Date**: 2026-10-03
**Agent**: Lina (Sonnet) · PRIMARY, Task 20
**Branch**: `task/123-u3-onboarding` · **Instruments block**: `.kiro/specs/123-consumer-distribution/completion/task-20-instruments.md` (committed first, `1224be9cf`; no MISSING row blocks 20.1)

## What changed

- **`docs/consumer/COMMIT-POLICY.md`** (new; `docs/consumer/` did not exist). It reproduces C24's two-column table, then says why each item sits where it does, what the `.gitignore` block carries, why platform output is committed by default, and the joining path in five lines.
  - Two design-internal tags are dropped from the table because a consumer page cannot resolve them: `(A5)` after `specs/**` and `— DD1, derived` after "generated platform output (default)". Every other cell, including each parenthetical, is C24's text. The test normalizes exactly those two tags and nothing else.
  - **Not touched by 20.1**: `package.json` and `scripts/pack-assert.ts`. The `files[]` path and its `pack-assert` row are the packaging subtask's (22.3b, Ada; tasks.md L1090, L1216; instruments row 7.3). The plan is not ambiguous about this, so there is no fork.
- **`scripts/__tests__/commit-policy.test.ts`** (new): parses C24's table out of `design.md` and the doc's table, and asserts equality item for item and in order; asserts the doc carries no `(A5)`-style or `DD<n>` tag; three BITE cases (an item dropped, an item moved across the columns, the order changed) each fail with the named difference.
- **`.kiro/specs/123-consumer-distribution/tasks.md`**: 20.1 ticked.

## Targeted tests and result

- `npx jest --config scripts/jest.config.js scripts/__tests__/commit-policy.test.ts`: 1 suite, **6 passed**.
- `npm run test:scripts` (the lane that selects the new file): **17 suites, 364 tests passed**.
- Not run: the root `npm test` and `tsc`, because 20.1 touches no `src/**` file. 20.2 changes `src/cli/**` and will run both.

## Application-time adaptations

- The instruments block lists the doc's table check as built here (row 1.3); the test is in `scripts/__tests__/`, not under `src/`, so `npm run test:scripts` selects it (row 1.4).
- The joining section repeated the guide's steps. **Cut after Peter's ruling; see the Addendum below.**
- Otherwise none.

## Agreement with Thurgood's install region

- The guide passage that names the doc is § 7, L228: "Which files the founder commits, and which each of you regenerates, is set by the commit policy (`docs/consumer/COMMIT-POLICY.md`)." The doc says exactly that. The guide's L237 ("committed platform output matches `generate`") agrees with the doc's committed-by-default platform output. L109 (commit your lockfile) agrees.
- **One disagreement, not edited here**: the guide's `Native Platform Sync` section, L1183, reads "Updates `.kiro/sync-manifest.json` (commit this to git …)". The doc, C24 and `init.ts` L334 put the manifest at `designerpunk.manifest.json` in the repo root. L1155 already marks that section as pre-15.0.0; it is inside Task 19.4's widened grep and remainder sweep.

## Claims in `COMMIT-POLICY.md` and what each rests on

Class guard (Peter, 2026-10-03). `VERIFIED-CODE` means the behaviour exists on this branch at the cited line. `DESIGN-ONLY` means it rests on ratified design text and is **not yet true in code**.

| # | Claim in the doc | Rests on | State |
|---|---|---|---|
| 1 | The founder commits the left column and a joiner regenerates the right, which is what makes "clone, install, generate" true | requirements.md L600 (Req 15A.1a) | ratified record |
| 2 | The table (14 repo-state items, 2 regenerated or local) | design.md L775–777 (C24); equality asserted by `commit-policy.test.ts` | ratified record + test |
| 3 | `init` writes `designerpunk.config.ts` once; a pre-existing one is kept | `src/cli/init.ts` L181–189 (`createFileIfNotExists`) | VERIFIED-CODE |
| 4 | `generate` reads the config and the token tier | `src/cli/designerpunk.ts` L206 (`loadConfig`); `src/config/ConfigLoader.ts` L92–L126 | VERIFIED-CODE |
| 5 | `init` writes `src/tokens/**` at birth | `src/cli/init.ts` L193–L214 | VERIFIED-CODE |
| 6 | `init` creates `src/components/` empty, with a README | `src/cli/init.ts` L217–L228 | VERIFIED-CODE |
| 7 | `product/**` is repo state; `init` writes `product/overview.yaml` | `src/cli/init.ts` L230–L237; design.md L777 | VERIFIED-CODE (the file); table (the policy) |
| 8 | `specs/**` is repo state | design.md L777 (A5) | DESIGN-ONLY for the scaffold: nothing in `src/cli/init.ts` creates `specs/` at this commit (Task 21.3 builds it). The **policy** (commit it) holds regardless |
| 9 | Commit the lockfile so a teammate installs the version you built against | `governance/DesignerPunk-Integration-Guide.md` L109; requirements.md L597 | ratified record |
| 10 | `.designerpunkignore` lists files `sync` never touches; teams share it | `src/cli/init.ts` L310–L329; `src/cli/sync/IgnoreFilter.ts` L15–L18 | VERIFIED-CODE |
| 11 | Test configs are `jest.config.js` and `tsconfig.test.json`, written by `init` | `src/cli/init.ts` L266–L308 | VERIFIED-CODE |
| 12 | `designerpunk.manifest.json` is at the repo root, records what DesignerPunk wrote and at which version, so ignoring a tool directory never removes the baseline | `src/cli/init.ts` L331–L337; design.md L346–L348 (Manifest path, Leonardo A6); DD21, design.md L1063 | VERIFIED-CODE (path); ratified record (the reason) |
| 13 | MCP configs are `.mcp.json` (Claude Code) and `.kiro/settings/mcp.json` (Kiro), at DesignerPunk's own keys; `.claude/settings.json` holds the Claude Code approval list | `src/cli/shared/mcpConfig/cc.ts` L37, L82; `src/cli/shared/mcpConfig/kiro.ts` L101 | VERIFIED-CODE |
| 14 | `CLAUDE.md` carries a managed region in the consumer's own file | `src/cli/attach.ts` L275–L280 (region applied after her bytes) | VERIFIED-CODE |
| 15 | Generated agent artifacts and identity member files exist for each attached target (`.claude/agents/`, `.kiro/agents/`, identity docs) | `src/cli/init.ts` L239–L248 (the agent layer emitter), L310–L318 (the `.claude/agents/` and `.kiro/agents/` paths named in the ignore-file comment); `canonical/_consumer-output/cc/.claude/identity/**` (identity doc paths) | VERIFIED-CODE |
| 16 | Committing the agent layer means a same-tool teammate needs no extra step; a different-tool teammate runs `attach --target=<cc\|kiro>` once | guide L219–L225; design.md L739–L740 (C23 joining rows) | ratified record |
| 17 | `sync` leaves everything outside a marked region byte for byte as written | `src/cli/__tests__/sync.region.test.ts` L111 ("replaces ONLY the region; outside bytes … byte-identical") | VERIFIED-CODE for the grain; DESIGN-ONLY for the `.gitignore` region (see 24) |
| 18 | `token-index/` is derived from the token source, rebuilt by `generate`, and read by the Application MCP | `src/cli/designerpunk.ts` L268 (written at the discovered root); guide L100 | VERIFIED-CODE |
| 19 | `.designerpunk/` is local to one person and holds the personal note at `.designerpunk/personal-note.local.md` | `src/cli/shared/errorCatalog.ts` L98, L129; `tools/agent-generator/consumer-entry.ts` L106; requirements.md L663 (Req 18.5: per-user-local, not committed) | VERIFIED-CODE (the path, in catalog strings); ratified record (the policy) |
| 20 | A joiner never inherits the founder's note | requirements.md L663 (Req 18.5) | ratified record |
| 21 | `generate` creates the note when it is absent | design.md L799 (C26); guide L214 and L225 say it already | **DESIGN-ONLY**: no source file outside tests writes `.designerpunk/personal-note.local.md` at this commit (instruments row 4.4); Task 22.1 builds it |
| 22 | `generate` writes platform output to the config's `output` path; the default is `./dist/tokens` in the config `init` writes | `src/generators/generateTokenFiles.ts` L54, L223, L281; `src/cli/designerpunk.ts` L240; `src/cli/init.ts` L640 | VERIFIED-CODE |
| 23 | Platform output is committed by default, so previewed bytes are shipped bytes; a team whose build runs `generate` need not commit it | design.md L1037–L1041 (DD1, derived; marked overturnable at the sitting in the text; C24's table is the settled form); guide L237 | ratified record |
| 24 | `init` adds a `.gitignore` block between begin and end markers, ignoring exactly `token-index/` and `.designerpunk/`, with the commented line and the configured output path; `sync` keeps it and leaves other lines untouched | tasks.md L1080, L1081, L1088; design.md L780–L782, L789 | **DESIGN-ONLY**: `init` writes no `.gitignore` and `src/cli/shared/gitignoreRegion.ts` is absent at this commit (instruments rows 2.1, 2.3); 20.2 builds it. The `.gitignore` line-comment marker grain exists (`src/cli/sync/RegionGrain.ts`; `sync.region.test.ts` L37, L247) |
| 25 | For a repo born on 15.0.0, `sync` offers the block when git is not ignoring `.designerpunk/`, asks before writing (yes-or-no, default no), and when nobody can answer prints a report and writes nothing | tasks.md L1091–L1103 (PR-9 RULED, Peter: "Re: walkthrough 1, offer"); design.md L784–L789, L989–L990 | **DESIGN-ONLY**: `sync` has no such offer at this commit (instruments rows 8.3, 8.4); 20.2 builds it. `git check-ignore -q` exits 1/0/128 for unignored/ignored/not-a-repo (run in scratch for the instruments block, row 8.1) |
| 26 | The joining path is clone, `npm install`, `generate`, optional `attach --target=<cc\|kiro>`, fill in the note, restart; `init` is never the join mechanism | guide L205–L228 (§ 7); requirements.md L596–L603 (Req 15A.1–15A.3); `src/cli/shared/errorCatalog.ts` L97 (`init` refuses in a born repo) | REMOVED 2026-10-03 (see Addendum) for the five steps; the `init`-is-never-the-join-mechanism sentence stays, on the sources cited |
| 27 | The install guide's section is named "Joining an existing design system" | guide L205 (`## 7. Joining an existing design system`) | REMOVED 2026-10-03 (see Addendum): the joining section was cut from the doc |

**DESIGN-ONLY rows: 8 (scaffold half), 21, 24, 25** (and the `.gitignore` half of 17). All four are built inside this same unit (Task 21.3 for `specs/`, Task 22.1 for the note, Task 20.2 for the block and the offer), so they are true when U3 merges, but **not on this commit**. The doc ships in release 3 with them.

## Notes

- **Unverified by me**: that a joiner's `generate` creates the note today (row 21: the guide already says so, the code does not); that `specs/` is scaffolded (row 8); the 15.0.0 offer (row 25).
- **Counter-argument and residual**: none open on the joining steps: they are cut (Addendum), so the doc no longer carries a second copy to keep in step with the guide.
- **Delegated-tier**: plan held (subtask; no parent line owed).

## Addendum 2026-10-03: the joining steps are cut (Peter's ruling)

**Ruling** (Peter, 2026-10-03, on the open question in "Application-time adaptations"): "cut it. If valuable, reference the steps and its location where the steps are being cut from."

- `docs/consumer/COMMIT-POLICY.md` § "Joining a repo that already has a design system" no longer repeats the five steps. It is now a pointer: the steps are in the install guide, `docs/consumer/INSTALL.md` in the `@3fn/core` package, under "7. Joining an existing design system". It keeps one sentence, that `init` is never the join mechanism (claim 26's `init` half; requirements.md L602-L603, `src/cli/init.ts:127-133`).
- **Forward reference**: `docs/consumer/INSTALL.md` does not exist on this branch until Task 19.4 derives it (the served source is the Integration Guide's install region, `governance/DesignerPunk-Integration-Guide.md` § 7). The README already carries the same forward reference (`README.md` § "Getting Started" links "Install guide" to `docs/consumer/INSTALL.md`). INSTALL.md ships as an explicit `files[]` path by 22.3b (design.md L275), so the pointer is true for a reader of the shipped package.
- **Claims table**: rows 26 and 27 are marked REMOVED (the steps and the section-name claim left the doc; the pointer's heading string is the guide's own, L205). The new pointer's two claims: the section heading text (**V** guide L205, `## 7. Joining an existing design system`) and "says which step to add if you use a different agent tool" (**V** guide L219-L226).
- The C24 table and `commit-policy.test.ts` are untouched.
- Tests re-run after the cut: `commit-policy.test.ts` 6 passed; `npm run test:scripts` 17 suites, 364 passed.
- Also corrected here: the instruments commit's SHA above. The two commits were re-written to fix the trailer block (`Agent: Lina` and `Co-Authored-By` adjacent in the final paragraph); the content and split are unchanged.

## Addendum 2026-10-03 (after Task 20.2): the DESIGN-ONLY rows, re-checked

Row numbers are the claims table's. `VERIFIED-CODE` now means the behaviour exists at the cited line on this branch after 20.2 (`src/cli/shared/gitignoreRegion.ts`, `src/cli/init.ts`, `src/cli/sync/index.ts`); detail in `task-20-2-completion.md`.

| Row | Was | Now | Evidence |
|---|---|---|---|
| 17 (the `.gitignore` half: `sync` leaves outside lines byte for byte) | DESIGN-ONLY for the `.gitignore` region | **VERIFIED-CODE** | `src/cli/sync/index.ts:455-490` (the target-free region joins the report and apply rules); `src/cli/__tests__/sync.region.test.ts` § "the round-trip: outside lines byte-unchanged" (three cases, outside bytes asserted equal before and after, lines after the block included) |
| 24 (`init` adds the block between markers, ignoring exactly `token-index/` and `.designerpunk/`, with the commented line and the configured output path; `sync` keeps it) | DESIGN-ONLY | **VERIFIED-CODE** | `src/cli/init.ts:341-356`; `src/cli/shared/gitignoreRegion.ts:47-62` (content), `:115-143` (apply); `init.test.ts` § "the .gitignore managed block" (default config; two pre-existing configs; her own `.gitignore` kept); real-node smoke: `init` from source under `tsx` with the production loader wrote the block and `git check-ignore -q .designerpunk/` then exited 0 |
| 25 (`sync` offers the block to a repo born on 15.0.0 when git is not ignoring `.designerpunk/`; asks before writing, default No; reports and writes nothing when nobody can answer) | DESIGN-ONLY | **VERIFIED-CODE** | `src/cli/sync/index.ts:297-329` (`offerGitignoreBlock`), `:306` (by-effect detection), `:309` (off a TTY and `--dry-run`: report only), `:319` (its own question); `sync.region.test.ts` § "PR-9" (nine cases); real-node smoke: `sync` with stdin from `/dev/null` printed the report row and wrote nothing |
| 8, 21 | DESIGN-ONLY | **still DESIGN-ONLY** | `specs/` scaffold (Task 21.3) and `generate` creating the note (Task 22.1) are not built by 20.2 |

Not re-verified by me: the interactive prompt against a real terminal (the `[y/N]` is exercised through its test seam and `confirmGitignoreBlock` through a fake `readline`; no terminal was driven).

## Addendum 2026-10-03 (after Task 21.3): row 8, re-checked

| Row | Was | Now | Evidence |
|---|---|---|---|
| 8 (`specs/**` is repo state; `init` scaffolds `specs/`) | DESIGN-ONLY for the scaffold half | **VERIFIED-CODE** | `src/cli/init.ts` `scaffoldStarterSpecs` (Step 11a): writes `src/cli/templates/starter-specs/**` into `specs/<spec>/<file>`, records each `generated`; `src/cli/__tests__/init.test.ts` § "the starter specs into specs/" (seven cases: byte-for-byte scaffold, manifest entries, `--skip-agents`, collision kept and reported, `--re-scaffold` preview, absent source). The **policy** half (commit it) is unchanged. Row 21 (`generate` creating the note) is still DESIGN-ONLY (Task 22.1). |


## Addendum 2026-10-03 (reconciliation pass after 22.2): COMMIT-POLICY L33

`docs/consumer/COMMIT-POLICY.md` L33 described the personal note with the old two-slot wording ("who you are and how you want to be worked with"). It now reads "who you are, what you value, and how you like to work with your agents": a short true description of the three-slot note, not a copy of `personalNoteNamingMessage()`. No claim in the 20.1 claims table changes state. `commit-policy.test.ts`: 6 passed (the table is untouched).
