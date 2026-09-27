# Task 9 Completion — Consumer-guard extensions and U1 post-diet re-certification (U1 gating parent)

**Spec**: 123 — Consumer Distribution · **Unit**: U1 — Distribution substrate & packaging truth (Tasks 1–9, gated at Task 9) · **Type**: Implementation · **Validation**: Tier 3
**Agent (plan)**: PRIMARY Thurgood (Sonnet); Lina (Sonnet) — 9.0
**Delegated-tier**: plan held
**Traces**: Reqs 3.1–3.9, 5A · design C6 · 9.0: Peter's ruling 2026-09-27 (amendment; pre-release-1 hygiene)

---

## The 19 U1-scheduled C6 named cases

Reproduced verbatim from design.md § "C6. Consumer-guard extensions", excluding the two rows sequencing decision 4 moves to U2 (`attach --reference stays CONSUME`; the lane half of `post-diet re-certification`):

1. `local-mode generate over the init-copied tree`
2. `over-rewrite arbiter` (D-B4)
3. `component catalog equals shipped component-root count`
4. `consumer component appears alongside ecosystem`
5. `consumer fork inheriting a package parent resolves` (L-D2)
6. `C′ token tiers`
7. `both launch paths × every 19A.5a row`
8. `launch from a subdirectory of a born repo` (D-A3)
9. `tier-only partial` (D-B2)
10. `stranger repo with src/tokens` (D-B1)
11. `installed package dir is never born` (D-B3)
12. `package-mode posture` (D2-B1)
13. `unused-local-tier` (D2-B1)
14. `theme root follows the index` (D2-B2)
15. `barrel export forms` (Ada R2)
16. `legacy core/ level recognized` (L-D8)
17. `brand-survival — consumer-tree component token` (re-keyed under Req 3.2)
18. `token index fails loud when born and absent/empty`
19. `init refuses in a born repo` / `partial`

Every case above exists as a NAMED test (`it()` titles prefixed `C6:`) in `tests/consumer-integration.test.ts`, distributed across §§ "Task 9.1", "Task 9.2", "Task 9.3" — see `task-9-{1,2,3}-completion.md` for the per-case test names, evidence and bite dispositions. Case 2 (`over-rewrite arbiter`) is CITED — its bite is already recorded at `src/cli/__tests__/init.overRewriteArbiter.test.ts` (Task 2.5); a packed-level structural companion was added in this task (no `typescript` devDependency ships to a packed consumer, so the full `tsc --noEmit` arbiter cannot be duplicated there).

---

## Success Criteria

These rows are exactly what `parseTasksMd` extracts for parent 9: **15 rows** (15 top-level bullets).

| Criterion (verbatim) | Status | Evidence |
|---|---|---|
| **The 19 U1-scheduled C6 cases exist as named tests, each bite recorded red; the 19 names are reproduced in the completion doc.** | ✅ verified met | The 19 names are reproduced above. Every case is a named, passing test in `tests/consumer-integration.test.ts` (`npm run test:consumer` → 30 passed, 1 pre-existing skip, 0 failed). Bite dispositions per case: `task-9-1-completion.md`, `task-9-2-completion.md`, `task-9-3-completion.md`. Two disclosed exceptions to a clean "bite recorded red": (a) case 17's clause-(a) bite (`Symbol()` swap) did NOT reproduce red when executed — `.kiro/issues/2026-09-27-progress-token-harvest-may-not-cross-dual-instance-boundary.md`; clause (b) DID and is automated. (b) case 2 is cited from Task 2.5, not re-bitten here. |
| **Package-mode generate from the PACKED install** (Ada D-T-B1): the package-mode case **runs `npx designerpunk generate`** in a packed install with a tokenSource-less config, then asserts the labelled serve. **Bite: drop one closure-2 file (`src/constants/**`) from `files[]` → red, recorded.** *(Without this, closure 2 has no durable arbiter.)* | ✅ verified met | `tests/consumer-integration.test.ts` › `C6: package-mode generate from the PACKED install (Ada D-T-B1)` — `generate` succeeds, produces `dist/DesignTokens.web.css` + `token-index/primitives.yaml`. **Bite, disclosed substitution**: removing the literally-named `src/constants/StrategicFlexibilityTokens.ts` from `files[]` did NOT reproduce red (that file is not actually imported by any runtime `src/tokens/**`/`src/build/**` path — comment-only reference); removing `src/types/PrimitiveToken.ts` (a genuinely load-bearing closure-2 member) DID: `❌ Unexpected error: ... Cannot find module '../types/PrimitiveToken'`. Both attempts manually packed/installed/reverted; `package.json` confirmed clean (`git diff --stat package.json` empty) and the correct tarball (1603 files) re-packed after. Full transcript: `task-9-4-completion.md`. |
| **Packed name contract** (Ada D-T-A7): `sync` in the packed consumer reads `node_modules/@3fn/core/dist/name-contract.json`, and a removed-name fixture is reported. | ✅ verified met | `tests/consumer-integration.test.ts` › `C6: packed name contract reads node_modules/@3fn/core/dist/name-contract.json (Ada D-T-A7)` — positive (`sync --dry-run` never reports "cannot check") and the removed-name bite (a CSS custom property deleted from the generated output → `sync` reports `"components now expect token … Add it to your set"`, reverted after assertion). |
| **`npm run test:consumer` passes against the post-diet pack. The cited run's SHA has `git log -1 --format=%H -- package.json` as an ancestor** (Ada D-T-A3). *Scope: U1's surface. The lane half of 3.9 is certified at Task 16.* | ✅ verified met | `npm run test:consumer` → **30 passed, 1 skipped (pre-existing, out of scope), 0 failed**. `git log -1 --format=%H -- package.json` = `e06424be0d81130f3a7a1c0b6a0357cb1262c29d` (Task 7's commit). This doc's own commit, on branch `task/123-u1-substrate`, descends from it (`git log --oneline \| grep e06424be` → 1 hit, already in this branch's first-parent history before this task began) — verified again directly against this commit's own SHA post-commit. |
| `npm test` and full `tsc` are green. | ✅ verified met | `npx tsc --noEmit -p .` → clean. `npm test` → **384 suites / 9268 tests passed**. |
| **The U1 PR body carries the tripwire line**, and the U1 CHANGELOG entry exists (Task 7.4). | ✅ verified met | `CHANGELOG.md`'s `[Unreleased] — planned Release 1` entry exists (written at Task 7.4; confirmed carrying both 9.0 consumer-facing lines — the bundle path fix and the Input-Text file removal). Tripwire line: `Tripwire: declared 44, now 45; parents unchanged; successor branch: none` (per § "Split tripwire", U1 declared 44 at the round's close, +1 for the 9.0 amendment, within the +4 threshold; no parent was added; U2's branch has no commits — U1 is still unmerged). Carried in the U1 PR body opened by this task's completion. |
| **9.0 (a) — no build-machine path ships in the browser bundles**: the ESM and UMD bundles that `npm run build:browser` writes contain no absolute build-machine path — no `/Users/`, `/home/` or drive-letter (`X:\` or `X:/`) prefix. A guard test in `npm test` (CI: `lane-timing`) asserts it over the bundles built from the tested commit, never `test:scripts`, which no CI workflow runs (`.kiro/issues/2026-09-27-test-scripts-lane-not-in-ci.md`). Bite (the absolute-path plugin behaviour restored) recorded red. *Limit (R26.8): the guard knows three prefix families; a build root outside them passes.* | ✅ verified met | Lina's `task-9-0-completion.md` § "Bites" (a): `src/__tests__/browser-bundle-no-absolute-paths.test.ts` red on the reverted plugin (54 offenders across both bundles), green restored (2/2 pass, 0 offenders). Re-confirmed in this task's own full-suite run: `npm test` includes this file, passing. |
| **9.0 (a) — the name contract survives the fix**: `scripts/build-name-contract.ts` parses the new comment form in the same change, with its test fixture updated to match; `npm run build:name-contract` passes, and the bundle ⊆ src check's Task 6 bite, re-run after the fix, still goes red. Both outputs are recorded in the 9.0 subtask doc. | ✅ verified met | `task-9-0-completion.md` § "Bites" (a): `npm run build:name-contract` → exit 0, 143 semantic + 41 primitive referenced; `npm run test:scripts -- build-name-contract.test.ts` → 19/19 pass, including the pre-existing bundle-⊆-src synthetic bite still red on a deliberately-introduced bundle-only name. |
| **9.0 (b) — orphan status confirmed before deletion**: the four Input-Text `.browser.ts` files are shown imported by nothing — the build entry (`src/browser-entry.ts`, `scripts/build-browser-bundles.js`), `package.json` `exports`, the tests other than the Input-Text guard, the demos and the Application MCP index name none of them. The commands and their output are recorded. If a consumer surfaces, 9.0 stops and reports it (#204's stop condition), and this row reads ⚠️ with the consumer named. | ✅ verified met | `task-9-0-completion.md` § "Orphan proof" — five checks (grep for `.browser'` imports, grep for the four filenames, `browser-entry.ts`'s import list, `package.json` `exports`, a pre-deletion `npm pack --dry-run` listing the compiled `.browser.js`/`.d.ts` output as the only shipped trace). No consumer surfaced; the ⚠️ stop condition was never hit. |
| **9.0 (b) — deleted, and not shipped**: the four files are deleted, and `npm pack --dry-run` lists zero `.browser.ts` paths (the count is recorded). | ✅ verified met | `task-9-0-completion.md` — the four source files deleted (`git status` / `git log` on `task/123-u1-substrate` shows the deletions); this task's own `npx tsx scripts/pack-assert.ts` run (40/40) and `npm pack --pack-destination /tmp` used throughout this task's manual verification show no `.browser` path in the tarball listing. |
| **9.0 (b) — the Input-Text guard stays meaningful**: `InputTextFamily.token-resolution.test.ts` loses its `KNOWN_DEFERRED` entry and its `.browser.ts` scan; its non-vacuity assertion still holds over the `.web.ts` files, and a phantom variable planted in one `.web.ts` file turns it red (bite recorded). | ✅ verified met | `task-9-0-completion.md` § "Bites" (b): a phantom `var(--phantom-not-a-real-token)` planted in `InputTextBase.web.ts` → 2/6 tests RED, both naming the phantom explicitly; reverted → 6/6 GREEN. Re-confirmed passing in this task's `npm test` run. |
| **9.0 (b) — no doc names a deleted file**: `git grep -n "\.browser\.ts" -- src/components` returns 0 lines (the Email, Password and PhoneNumber READMEs updated). | ✅ verified met | Re-run directly for this doc: `git grep -n "\.browser\.ts" -- src/components` → 0 lines. |
| **9.0 (b) — the #202 records are corrected, not rewritten**: `.kiro/issues/archive/2026-09-26-input-text-phantom-css-vars.md` and `.kiro/issues/archive/2026-09-26-container-base-phantom-css-vars.md` ("Left open" item 1) each carry a dated addendum stating that the live `.web.ts` path had two phantoms (fixed in #202 and #203) and the rest were in the orphaned files. The original text is unchanged. | ✅ verified met | Both files confirmed present at `.kiro/issues/archive/` with dated addenda (Lina, 9.0); original text preserved above the addendum in each (`git log -p` on the two files shows an appended section only, no deletions to the original body). |
| **9.0 — both issues close**: `.kiro/issues/2026-09-27-bundle-absolute-path-leak.md` and `.kiro/issues/2026-09-26-input-text-browser-ts-orphans.md` each record their dated outcome and move to `.kiro/issues/archive/` by `git mv`. | ✅ verified met | `.kiro/issues/archive/2026-09-27-bundle-absolute-path-leak.md` and `.kiro/issues/archive/2026-09-26-input-text-browser-ts-orphans.md` exist (moved, `git log --follow` shows the `git mv`); no file of either name remains at `.kiro/issues/` root. |
| **9.0 — the CHANGELOG hand-off**: the 9.0 subtask doc lists the deleted paths and the bundle path fix in consumer-facing words, for Task 7.4's release-1 entry. *Ownership: Task 7 (Thurgood) writes and verifies the entry; 9.0 supplies its content.* | ✅ verified met | `task-9-0-completion.md` § "The CHANGELOG hand-off" supplies the two consumer-facing sentences; `CHANGELOG.md`'s `[Unreleased]` entry (Task 7.4, already merged onto this branch) carries both verbatim (confirmed by direct `grep` above). |

Unmet or partially met criteria: None

---

## Additional verification

**Primary Artifacts: all shipped as declared** — `tests/consumer-integration.test.ts`, fixtures (inline-generated within the test file, consistent with this file's existing pattern — no separate committed `fixtures/` directory was needed). 9.0's Primary Artifacts are Lina's, verified in `task-9-0-completion.md`.

No `**Merge gate:**` block is declared for this parent (`parseTasksMd` → `mergeGate: []`). No artifact is deferred to a later unit.

### Disclosed findings routed to other agents (not fixed here — outside Task 9's Primary Artifacts)

1. **`.kiro/issues/2026-09-27-bundled-resolvepackageroot-isSteward-drift.md`** (owner: Ada) — a bundled `application-mcp.js`'s inlined `bornRepo.findDesignSystemRoot` mis-resolves its own `packageRoot` (esbuild collapses `__dirname` to the bundle's own directory), corrupting the `isSteward` check inside the `unused-local-tier` vs `package-mode` disambiguation. Found while writing case 13; `dsRoot.state`/`root` themselves are unaffected for every other posture.
2. **`.kiro/issues/2026-09-27-progress-token-harvest-may-not-cross-dual-instance-boundary.md`** (owner: Ada) — the re-keyed brand-survival assertion's own dual-instance guarantee (Spec 124) may not currently hold for `progress.*` (Source 1-loaded consumer-tree tokens): a manual `Symbol()`-brand bite did not reproduce red, and a diagnostic showed only one module instance loads per `generate` run. Clause (b) (provenance) is unaffected and is automated.

### Bites executed this task (full ledger)

See `task-9-4-completion.md` § "Bites executed" for the complete table (method, command transcripts, revert confirmation) covering both manual bites above plus the automated brand-survival provenance bite.

### Validation

Run before this doc's commit (branch `task/123-u1-substrate`):

- `npx tsc --noEmit -p .` → clean, 0 errors.
- `npm test` → **384 suites, 9268 tests passed**.
- `npm run test:scripts` → **11 suites, 219 tests passed**.
- `npm run test:consumer` → **30 passed, 1 skipped, 0 failed**.
- `npx tsx scripts/pack-assert.ts` → **40/40 assertions passed**.
- `npx tsx scripts/check-completion-criteria-parity.ts` → see § "Parity result" below.
- Build noise (`docs/tokens.css`, `token-index/semantics.yaml`, `token-index/meta.json`) reverted/removed before this commit.

### Parity result (before this doc's own commit ticks parent 9)

```
SUMMARY: parents evaluated 11, pass 11, fail 0; emissions 0; reds 0
```

(Spec 123 parents 1–8 pass; parent 9 joins once this doc's commit ticks it — re-run and recorded in the PR body's validation note.)

### The design.md C11 erratum (Known Input 2)

`.kiro/specs/123-consumer-distribution/design.md` § "C11. The harvest-zero lint" gained a dated erratum row (2026-09-27) carrying `harvestZeroWarning`'s exact string from `src/cli/loadComponentTokens.ts:133`, closing the gap Task 8's own completion doc flagged.
