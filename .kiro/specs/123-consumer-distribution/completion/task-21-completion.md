# Task 21 Completion — The starter specs

**Spec**: 123 — Consumer Distribution · **Unit**: U3 — Onboarding (a declared multi-parent unit whose gating parent is Task 22, so this parent completes **done-on-branch**, with no PR) · **Type**: Documentation · **Validation**: Tier 2
**Agent (plan)**: PRIMARY Thurgood (Opus); 21.3 Lina (Sonnet), by the 2026-10-03 amendment
**Delegated-tier**: plan held
- 21.1, 21.2 and the structure test: Thurgood (Opus), the planned PRIMARY.
- 21.3: Lina (Sonnet), as amended.
- C4's `pack-assert` rows: Ada (Sonnet), in the packaging subtask 22.3b, as the criterion assigns.
**CI-provenance**: branch-head dispatch — run URLs appended by the orchestrator after the unit-member push
**Instruments**: 20 listed — exists 11 · built-here 9 · missing 0 · unlisted 1 — .kiro/specs/123-consumer-distribution/completion/task-21-instruments.md
**Traces**: Reqs 16, 17 · design C25, DD15

**Subtasks**:
- the instruments block, `d93d1b95e`;
- 21.1 + 21.2, `c2cd6b410` (one commit, because the structure test covers both);
- 21.3, `cc7567ada` (Lina);
- the owner confirmations applied, `08dded891` (Stacy, Ada) and `1c0e6c8bf` (T6 settled);
- C4's packaging, `4ed907eb1` (22.3b, Ada).

Their docs are `task-21-1-completion.md`, `task-21-2-completion.md` and `task-21-3-completion.md`. The owner records are in `task-21-owner-review/{ada,stacy}.md`. The instruments block's last MISSING row (4.2) is resolved in-row, and its final Counts line is refreshed in this commit.

## Success Criteria

| Criterion (verbatim) | Status | Evidence |
|---|---|---|
| The CI-needs spec gives every need a bite recipe and a two-sided price line, including "committed platform output matches `generate`" (structure test fails otherwise; need count recorded). | ✅ verified met | `src/cli/templates/starter-specs/ci-needs/needs.md`: four needs, N1–N4. Each carries a Tier, Why, Applies-when, Check, Bite recipe and a two-sided Price line. N1 is "Committed platform output matches `generate`" (C25), at minimal core. The recorded count is at § "Need count": "4: two minimal core (N1, N2) and two optional hardening (N3, N4)". `scripts/__tests__/starter-specs.test.ts` › "every need carries a tier, a bite recipe and a two-sided price line (and a check and a why)", "… is a minimal-core need (C25)", "the recorded need count equals the parsed needs, by tier", and the bite case "the need checker flags a need missing any one of the three". Run `npx jest --config scripts/jest.config.js scripts/__tests__/starter-specs.test.ts` → 28 passed; `npm run test:scripts` → 18 suites, 404 passed. **Every bite recipe was run red in a scratch born repo** built from the packed tarball (`task-21-1-completion.md` § "Bite recipes", and the re-run of the corrected N1 in its Addendum). |
| The re-grounding starter spec's tasks include the **report of what did not transfer**. | ✅ verified met | `src/cli/templates/starter-specs/regrounding/tasks.md` task 5, "**Report what did not transfer.** Thurgood writes `specs/regrounding/report.md`". The intro ends "It ends with a report of what did not transfer". `starter-specs.test.ts` › "its tasks include the report of what did not transfer"; the formalization task (Req 24.1) and Stacy's claims task after it (24.1b) are also asserted. 28 passed. Commit `c2cd6b410`; Stacy's task-6 correction is in `08dded891`. |
| `init` scaffolds both into `specs/`, reporting on collision (`init.test.ts`). | ✅ verified met | `src/cli/init.ts` Step 11a (L358–362) and `scaffoldStarterSpecs` (L547) write `specs/ci-needs/{needs,tasks}.md` and `specs/regrounding/tasks.md`. Nothing is overwritten: a path that already exists is kept byte-identical and reported with `starterSpecCollisionMessage`. `src/cli/__tests__/init.test.ts` covers this in seven cases, including **RED (collision)**: "an existing path is kept byte-identical, reported with the catalog string, and not recorded; the rest are still written". Run `npx jest src/cli/__tests__/init.test.ts` → 59 passed; `-t "starter specs"` → 7 passed. Lina's bites at 21.3 (overwrite on collision, no manifest record, no `--re-scaffold` preview) each went red, per `task-21-3-completion.md`. Commit `cc7567ada`. |
| *(amendment 2026-10-03 — the U3 cut. Reads: Ada, Lina, Thurgood. Record: `feedback/tasks.md` § "U3 amendment round (2026-10-03)".)* **The starter specs live at `src/cli/templates/starter-specs/**`.** They ship through the existing `src/cli/templates/` `files[]` entry, so no `files[]` edit is needed. This replaces `starter-specs/**`, which had no shipping path (Ada and Lina concur). · Each spec file gets a `pack-assert` ADD-present row, written by the packaging subtask (FK-2). | ✅ verified met | The three files live under `src/cli/templates/starter-specs/` (`find` lists exactly those three). `package.json` `files` carries `"src/cli/templates/"` (L31). The branch's only `package.json` edit is `4ed907eb1`, which adds the two `docs/consumer/*` lines and no starter-spec line. **The `pack-assert` rows** are in `scripts/pack-assert.ts`: the three paths are in `SHIPPED_CLI_TEMPLATES` (L379–381), with ADD-present checks over them (L405) and an exact-set check over `src/cli/templates/**`. Ada wrote them in 22.3b (`4ed907eb1`). `npm run test:pack-contents` at `53abf075c` built a real tarball (`3fn-core-15.0.0.tgz`, 1714 entries), in which `PASS: deferred ADD present:` holds for each of the three files and `PASS: deferred exact set: … equals exactly the 9 expected files`. The lane exits 1 on three other assertions; see Validation. |
| *(amendment 2026-10-03)* **Req 15B.5 covers the starter specs.** `scripts/__tests__/install-doc.test.ts`'s vocabulary-consistency block also reads both starter specs, against `src/cli/shared/vocabulary.ts`. *(R2, Stacy R-13: `install-doc.test.ts` is on Task 19's list, not Task 21's. **The starter-spec block lives in `scripts/__tests__/starter-specs.test.ts`**, Task 21's own file, importing the same `vocabulary.ts` forms; `install-doc.test.ts` keeps the guide and INSTALL.md.)* · **Red**: a lifecycle verb described in a starter spec differs from `vocabulary.ts`, or `attach` appears without its object. | ✅ verified met | `scripts/__tests__/starter-specs.test.ts` L31 `import { LIFECYCLE_VERBS, attachUsage } from '../../src/cli/shared/vocabulary'`. Tests › "describes a lifecycle verb only in vocabulary.ts's words (Req 15B.5)", "never names `attach` without its object", and the **red** cases › "vocabulary checker bites: flags a drifted description and a bare attach". `install-doc.test.ts` is unchanged by Task 21 and keeps the guide and INSTALL.md. `npm run test:scripts` → 404 passed. The 21.1 bites (a drifted `sync` description; a bare `attach`) each went red. |
| *(amendment 2026-10-03)* **P3 tiering is explicit** (Req 17.3). The structure test asserts that every CI need carries a tier (minimal core or optional hardening), a bite recipe and a two-sided price line. · **Red**: a need missing any of the three. The test sits in `scripts/__tests__/starter-specs.test.ts` and is Thurgood's (21.1/21.2). | ✅ verified met | `starter-specs.test.ts` › "every need carries a tier, a bite recipe and a two-sided price line (and a check and a why)"; **red** › "bite: the need checker flags a need missing any one of the three". In 21.1, a changed tier, a bite recipe without "goes red" and a one-sided price each turned the test red, then were restored (`task-21-1-completion.md` § "Targeted tests + result"). Authored by Thurgood, `c2cd6b410` (`Agent: Thurgood`). 28 passed. |
| *(amendment 2026-10-03)* **21.3 is Lina's (Sonnet)**, so that one seat holds every `src/cli/init.ts` edit in U3. It is the scaffolding and the collision reporting, in `src/cli/__tests__/init.test.ts`. · **Order**: 21.3 runs after 21.1/21.2's files exist and before 22.2 (whose next steps list the `specs/` scaffold), inside the chain 20.2 → 21.3 → 22.1 → 20.3 → 22.2. | ✅ verified met | 21.3 is `cc7567ada`, `Agent: Lina`. **Every** `src/cli/init.ts` commit on the branch since its merge-base with `main` (`981891e6e`) carries `Agent: Lina`: `a9ece59fd` (20.2), `cc7567ada` (21.3), `ff5f2d53f` (22.1), `fa3c1be3a` (22.2), `501c67cbd` (22.3), `b0fe66301`, `25fffb54f`. **Order** (first-parent history): `c2cd6b410` (21.1/21.2) precedes `cc7567ada` (21.3), which precedes `ff5f2d53f` (22.1) and `fa3c1be3a` (22.2). `a9ece59fd` (20.2) precedes 21.3. |

Unmet or partially met criteria: None

## Additional verification

Primary Artifacts: all shipped as declared.
- `src/cli/templates/starter-specs/**` (the amended location), `src/cli/init.ts`, `src/cli/__tests__/init.test.ts` and `scripts/__tests__/starter-specs.test.ts` exist and were written or changed by Task 21's commits.
- **Named, not adjudicated**: 21.3 (`cc7567ada`) also added two strings to `src/cli/shared/errorCatalog.ts`, `starterSpecCollisionMessage` and `starterSpecsWrittenMessage`. That file is not in Task 21's Primary Artifacts list; it is in Task 20's.
- The design rows for those two strings came by the catalog-close erratum (`8df365308`; instruments § "Found later", resolved).
- The edits that Task 21's owner-confirmation commit (`08dded891`) made to the guide and `INSTALL.md` are Task 19 artifacts. They are recorded in `task-19-1-completion.md` § "Addendum 4".

## Validation (local, Tier 2) — at `53abf075c` (`task/123-u3-onboarding`)

- `npm test` → `Test Suites: 395 passed`, `Tests: 9550 passed`.
- `npx tsc --noEmit` → exit 0.
- `npm run test:scripts` → `Test Suites: 18 passed`, `Tests: 404 passed`.
- `npx jest src/cli/__tests__/init.test.ts` → 59 passed.
- `npm run check:completion-criteria-parity` (this doc in the tree) → `parent 21: PASS`; `SUMMARY: parents evaluated 23, pass 23, fail 0; emissions 0; reds 0`.
- `npm run test:consumer` → `Tests: 1 skipped, 53 passed`, 0 failed. `docs/tokens.css`, dirtied by the lane's build, was reverted.
- `mcp-server` jest (`npx jest --testPathIgnorePatterns='tests/performance'`) → 37 suites, 612 passed.
- `application-mcp-server` jest → 29 suites, 374 passed.
- `npm run test:pack-contents` → **102 of 105 assertions; exits 1 on three FAILs**:
  - `no leftover dist/ files` (62 leftovers);
  - `dist/mcp/application-mcp.js` "resolves every module from the root node_modules/" (nested root `application-mcp-server/`);
  - `dist/mcp/docs-mcp.js` "resolves every module from the root node_modules/" (nested root `mcp-server/`).

  These are the **pre-existing in-repo-`generate` contamination class** (`.kiro/issues/2026-10-01-in-repo-generate-output-contaminates-package-dist.md`). They are the same three Task 20's close recorded. None concerns this task, and they were not chased. Every Task 21 row in the lane passes (criterion C4).
- **Not run**: the `product-mcp-server` standalone suite (its `src` is already in the root `npm test` roots); `npm run test:agent-generator` (Task 21 touches none of `tools/agent-generator`).
- **Where these were measured**: the lanes above `test:pack-contents` and the two MCP suites ran first in the main working tree, at `53abf075c`. That tree was switched to another branch mid-run, at 21:37:34. I therefore re-ran `npm test`, `tsc` and both MCP suites in a fresh worktree of this branch at `53abf075c` (installed and built), and the figures above are from that run. `test:scripts`, `init.test.ts`, `test:consumer` and `test:pack-contents` finished in the main tree before the switch (pack output at 21:37:28), still on `53abf075c`.

## Open items (stated, not criterion failures)

- **Ada's confirmation of the replacement sentence in N1's Check**, "`git ls-files --others --exclude-standard -- <output>` prints nothing". It replaced a false sub-bullet inside her corrected bullet (`task-21-1-completion.md` § Addendum, "Ada should confirm the replacement"). The run-verified form is shipped, but no record of her confirmation is on the branch.
- **Lina's record on N2's `sync` check** is listed as "routed by the orchestrator; no record received here" (21.1 Addendum). N3 now agrees with her guide § Running Component Tests: both say `npx jest --passWithNoTests` (guide L468; `needs.md` L44). That closes the 21.1 flag on N3. No N2 record has arrived.
- **Not run**: the bite recipes inside a real CI. The spec's arming task makes that the consumer's step. The re-grounding spec has no proof of arming before U5's conformance run (Req 24.1), a concession the outline records.
- **Consumer-Stacy's owed-set query needs `docs/claims-pass-adoption.md`**, and nothing in a born repo creates it (`task-21-owner-review/stacy.md`, flagged for Thurgood/Peter as a seam in the consumer charter). Task 6 of the re-grounding spec does not depend on it. The seam is outside Task 21's criteria and is not resolved here.
- **Findings routed out at 21.1**: `validate` is red on unmodified token source (Ada; now named by the guide's region sentences, 19.1 Addendum 4), and `generate`'s output is not deterministic across runs (Ada's issue to file).
