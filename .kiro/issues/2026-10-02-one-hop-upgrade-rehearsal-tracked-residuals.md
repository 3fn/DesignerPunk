# One-hop upgrade rehearsal (pre-123 consumer → 15.0.0): the tracked residuals

**Date**: 2026-10-02
**Status**: ACTIVE for R1 and R5 only (homed in Spec 129; see § Closing). R2, R4 and R6 are fixed by Lina's `fix/` PR under the grant below (outcome line, 2026-10-24); R3 was fixed by #321. *(Corrected 2026-10-24, Lina: the earlier text said "no grant", but § Grant has carried a `**Grant paths**:` list since #354's merge.)*
**Owner**: Lina, for every item below unless the item says otherwise.
**Class**: P2 obligation (record) · defect *(Re-checked 2026-10-24, Lina: unchanged for R1 and R5, which remain. Set 2026-10-20, Lina, rule 12. Accepted. R2, R4 and R6 were waived for 16.0.0 by Peter on 2026-10-15 and are disclosed in the 16.0.0 notes (R2) and the INSTALL "Upgrading from 14.x" sentence (R4); no reader is misled, but the fixes are owed and have lapsed twice. R1 and R5 moved to Spec 129 on 2026-10-14. R2/R4/R6's fix still sits in sync code that is under the grant below.)*
**Trigger**: `path:.kiro/specs/129-consumer-generation-completeness/requirements.md` — Spec 129's requirements round, which answers its outline's question 6 ("R1 and R5: do they become requirements of scope item (ii)?"): R1 and R5 close here when that file lands with them as requirements, or are re-ruled here if it declines them. *(Re-ruled 2026-10-24, Lina, owner: the `release:next:phase-1` obligation — Lina's `fix/` PR for R2, R4 and R6, before release 5's RELEASE phase 1 — is met by that PR, whose outcome line is in § Closing; the record stays open only for R1 and R5. This is also the dated re-trigger line Ada asked for when she accepted Spec 129 as R1's home (Spec 129 design outline, Lina item, "the residuals issue gets a dated re-trigger line"). Was: `release:next:phase-1`, token set 2026-10-20; before that, per item.)*
**Source**:
- Peter's ruling, 2026-10-02 (relayed by the orchestrator), verbatim: **"Go with the split, fix the three before the release branch"**. Under that ruling:
  - three findings are fixed before the release branch (F2, F4b, and F1's handling; each has its own grant file);
  - **F1's root cause, F3 and F5 are disclosed in the 15.0.0 notes and tracked.**
- Lina's one-hop upgrade rehearsal, 2026-10-02.
  - Copy: `/private/tmp/claude-501/-Users-3fn-Documents-Work-Projects-Kiro-DesignerPunk-v2/07af3405-cf65-4fd4-9ae6-d36fe6a77303/scratchpad/rehearsal/test01-copy`
  - Logs: `step2.log`, `step3.log`, `step4.log`, `step5b-*.log`.
  - *These are session scratch paths and may not persist. The verbatim lines here are the record.*
- **Related** (the three fixes):
  - `2026-10-02-token-index-meta-ships-absolute-path.md` (F2);
  - `2026-10-02-sync-steering-dir-suggestion-writes-broken-path.md` (F4b);
  - `2026-10-02-generate-stack-trace-on-component-token-family-mismatch.md` (F1's handling).

---

## Disclosed in the 15.0.0 notes, and tracked

### R1. F1's root cause: copied component-token files in the pre-fix single-family form

**What it is.** Pre-123 `init` copied two files, both in the single-family form the v14.1.0 guard (#127) rejects:
- `src/tokens/component/progress.ts`;
- `src/components/core/Button-Icon/buttonIcon.tokens.ts`.

Under Model B, sync calls them the consumer's. It neither updates nor flags them (full detail: the F1 handling file).

**The fix to track: migration-side detection.** `sync`'s pre-123 migration reports any copied component-token file under `src/tokens/component/` or `src/components/core/` that fails the family guard. It names the file and offers the fix: re-copy the package's split version, or split the call.

**Trigger**: **U3's tasks-round kickoff (Spec 123)**, where migration work is in scope. If U3 declines it, it moves to the consumer-generation completeness spec's design-outline round (`2026-10-02-consumer-generation-completeness-spec.md`). Its principle, *"the consumer's own `generate` is the single source of every token artifact"*, makes a copied, stale token file its concern.

### R2. F3: component-copy judging fails completely when the consumer's registry access fails

**What happened.** test01's `.npmrc` pins `@3fn` to GitHub Packages. `npm view … --prefer-offline` succeeded from the cache, but every `npm pack @3fn/core@<v>` returned:
```
"code": "E401", "summary": "401 Unauthorized - GET https://npm.pkg.github.com/@3fn%2fcore - unauthenticated: User cannot be authenticated with the token provided."
```
As a result, all 34 component copies were reported "cannot tell … could not be retrieved". That includes **14.1.0**, which was installed in `node_modules` and is on public npm.

**The fix to track.**
- (a) Judge the **installed** version from `node_modules/@3fn/core/` before fetching anything.
- (b) Report a registry-auth failure once, as auth, and not as 34 × 38 per-version "could not be retrieved" lines.
- (c) Revisit the advice to "repair npmrc after migrate-components" for a consumer whose token is dead.

**Trigger**: **U3's Task 19 kickoff (Spec 123)**.

### R3. F5: no personal note after migration

**What happened.**
- All 8 regenerated Kiro agents (and the CC identity layer) list `.designerpunk/personal-note.local.md` as a resource.
- `sync --migrate-legacy` neither creates that file nor prints `personalNoteNamingMessage` (which `init` prints).
- Yet the closing line says *"…DesignerPunk's MCP servers and your personal note load when a session starts…"*.
- The old copied `.kiro/steering/Personal Note.md` was removed as an unmodified copy.

**Trigger**: **U3's personal-note task kickoff (Spec 123: the `templates/personal-note.template.md` add, Task 22)**. Until then, the 15.0.0 notes tell a migrating consumer to create the file.

## Cosmetic (tracked; no release action)

All three have the same **trigger**: the next `src/cli/sync/**` change under any grant, or U3's Task 19 kickoff, whichever comes first.

- **R4 (F6). The apply-run report shows the pre-apply state.** In the same run that migrates, it prints *"105 files … are copies"* and *"✅ Everything DesignerPunk manages is up to date."* before applying. Also, the old `.kiro/sync-manifest.json` is said to "move" but is retained, with a `"//"` note.
- **R5 (F7). The name contract has no freshness check.** It reported *"name contract: clean"* against `dist/tokens` generated 2026-06-15, a pre-upgrade output. There is no check that the generated output postdates the installed package.
- **R6 (F8). The dry-run is noisy.** Each of the 34 "cannot tell" lines lists all 38 versions.

## Closing

Record each item's outcome here, dated, as it resolves. Archive the file when every item has a recorded outcome (`.kiro/issues/README.md` rule 5).

*(2026-10-14, Lina; lapse recorded by Stacy's 15.1.0 RELEASE pass, RL-3)* **R1 and R5 move to Spec 129.** R2, R4 and R6 were not fixed before the 15.1.0 tag. The 15.1.0 notes disclose R1 and R2 as known limitations. **New trigger for R2, R4 and R6**: Lina's own `fix/` PR, under the `**Grant paths**:` list below (activated by Peter's merge of the records PR that adds it), merged before release 4's prep opens. *(Corrected 2026-10-14 — RL-10 of the 15.1.0 RELEASE pass, phase 2: the earlier clause cited a row grant this issue never had.)*

*(2026-10-15, Peter; release-4 rulings item 12, `.kiro/specs/123-consumer-distribution/completion/release-4-rulings-2026-10-15.md`; written by Thurgood)* **Waived for 16.0.0 by Peter, 2026-10-15.** The trigger above lapsed a second time: R2, R4 and R6 were not fixed before release 4's prep opened.
- **R2** is disclosed in the 16.0.0 notes' Known limitations.
- **R4** is disclosed by one INSTALL "Upgrading from 14.x" sentence: the report printed before applying shows the pre-apply state, and the old manifest is kept, not moved. The sentence rides Thurgood's install-doc PR (V-DOC).
- **R6** is noise, not a false statement, and needs no disclosure.

**New trigger for R2, R4 and R6**: Lina's `fix/` PR, under the grant below, merged before release 5's RELEASE phase 1, or a dated re-ruling. **A third lapse routes to Peter as a spec-or-drop decision.**

*(2026-10-24, Lina)* **R2, R4 and R6: fixed by Lina's `fix/` PR (this PR), under the grant below.** The first measured fix under Peter's 2026-10-24 "fix-first" ruling. Each fix in one line:
- **R2 (a)**: `sync` judges the copies against the installed `node_modules/@3fn/core` FIRST, from disk, before it lists or fetches anything; when that settles every file, nothing is fetched (`Migration.ts` `assessComponentCopies` `installed`; trace `judged-installed:<v>`). Most 15.x+ installs ship no `.ts` under `src/components/core/`, so the gain is largest when the installed version is one the copies were made from.
- **R2 (b)**: a login refusal (E401, E403, ENEEDAUTH) is read from npm's own error, recorded once by the fetcher (`classifyNpmAuthError`, `PackageFetcher.authFailure`), and reported as ONE login line (`errorCatalog.registryAuthFailedMessage`) in place of one "could not be retrieved" line per copy. Every version is still tried, since the npm cache may serve some.
- **R2 (c)**: with a refused token, the "repair npmrc after --migrate-components" caution is replaced by `registryPinRefusedTokenMessage`. It says the pin already blocks every fetch, so waiting protects nothing; that renewing the token is the safe route for copies made before 13.0.0; and that removing the pin lets sync judge against what npm's default registry lists, which keeps a pre-13 copy in place only if the old manifest records a last sync before 13.0.0, and otherwise lets it read as a fork. **The guard behind that last clause is a heuristic** (`MigrationAssessment.unlistedBefore`). When the registry lists nothing as old as the legacy manifest's last sync (else the installed bound), an unmatched copy is `cannot-tell`, not `modified`. That also fixes the case where nothing listed is at or below the installed bound. It never makes a copy `unmodified`, so it cannot cause a removal. But the last sync is not a proven lower bound (design C7), so pre-13 copies in a repo last synced at 13.0.0 or later, or with no legacy manifest, still read as forks; a test pins that residual. The sound floor is a fork for Peter, filed as `.kiro/issues/2026-10-24-sync-migration-unlisted-copy-floor.md` (owner Lina, Ada consulted). *(Revised 2026-10-24, Lina, after Ada's review item (2): the first version of this line and of the advice promised "a copy it still cannot judge stays where it is", which the code does not give in every case.)*
- **R2 (b), security (Ada's review item (1))**: the registry named in the login line is reduced to its bare origin with `new URL(…).origin`. A login part (`https://user:token@host`) and a query-string token never reach the report; three tests pin it.
- **Report heading (Ada's review item (3))**: the "before this run applies anything" heading prints only when the run will apply something (a flag with something to act on, or managed work or a manifest change that `--apply` or a terminal's yes applies); a clean run on a terminal is not headed that way.
- **R4**: a run that may apply something heads its report as the before state; after the applies it prints "Result of this run" (what it applied, then what is still to do); the closing all-clear prints only when nothing is pending. This also covers the report-only case test01 found on 16.0.0 (Spec 131 evidence, F-9): `sync` without `--apply` no longer ends "Everything DesignerPunk manages is up to date" while its report offers legacy copies, component copies, a repair, the manifest's conversion, a stale `MCP_STEERING_DIR` or an unchecked managed surface; and off a terminal, a run where a flag applied its own step no longer says "nothing was changed". **The legacy manifest: the message was made true, not the behaviour changed.** The old `.kiro/sync-manifest.json` is converted and kept with a note, and the report, the result line and the note now say so. Kept, because the conversion prunes entries (the file is the only record of the pre-123 baseline), the migration still reads its `version` (last sync), birth detection reports its presence (`bornRepo` signal `legacyManifest`), and the served INSTALL and Integration Guide sentences (V-DOC) and the design's C7 step 1 already say "kept, not moved".
- **R6**: copies that share one `cannot tell` reason share one line (`errorCatalog.cannotTellGroupMessage`, the catalog's reason clause verbatim); a version list longer than three reads "14.1.0 and 37 older versions back to …" (`condenseVersions`).
- **Owed, not done here** (Lina, filer): the two new strings have no design.md catalog row; per § Grant they are Thurgood's, as an erratum with these strings (as for release-3 item 8). The served "Upgrading from 14.x" sentence (Thurgood's, V-DOC) stays true, but now under-describes the fixed run; trimming it is his call.

*(2026-10-24, Lina)* **R3: fixed by #321** (U3 onboarding, Spec 123 Task 22.1): `sync --migrate-legacy` creates `.designerpunk/personal-note.local.md` from `templates/personal-note.template.md` and prints the naming row before the restart row (`src/cli/sync/index.ts` `personalNoteStep(…, 'naming')`). Confirmed on 16.0.0 by the test01 rehearsal, step 6 ("personal note created"; Spec 131 evidence).

*(2026-10-24, Lina)* **R1 and R5: still open, homed in Spec 129** (design outline inbound list and question 6). The file stays at root until Spec 129's requirements land (the Trigger line); every other item now has an outcome.

## Grant (added 2026-10-14, Lina's list; activated by Peter's merge of the follow-up records PR; expires at the fixing PR's merge)

**Grant paths** (R2, R4, R6 only; R1 and R5 are Spec 129's):
- `src/cli/sync/Migration.ts` (R2 (a) judge the installed version first and (b) report a registry-auth failure once; R6 the per-version "cannot tell" lines)
- `src/cli/sync/PackageResolver.ts` (R2 (a): read the installed `node_modules/@3fn/core` version)
- `src/cli/sync/NameContract.ts` (R2: it shares the fetcher, cache first, and its `cannot tell` line)
- `src/cli/sync/Reporter.ts` (R4: the apply-run report states the post-apply result)
- `src/cli/sync/index.ts` (R4: report/apply ordering; the legacy manifest's "moves" line)
- `src/cli/sync/Manifest.ts` (R4: the legacy `.kiro/sync-manifest.json` is moved or the message stops saying it is)
- `src/cli/shared/errorCatalog.ts` (the new auth-failure row and the condensed cannot-tell row)
- `src/cli/__tests__/{sync.migration,sync.catalog,sync.name-contract,sync,errorCatalog}.test.ts`, `src/cli/__tests__/syncTestKit.ts`, `src/cli/__tests__/fixtures/sync/**`
- `CHANGELOG.md` (one consumer-facing `### Fixed` line)

**Consulted (2026-10-24, Lina, under ballot `2026-10-17-standing-write-scope-six-roots` § 6)**: every path above under `src/cli/**` is in **Ada's** standing scope since that ballot (§ 2.1), so this grant names **Ada** as the consulted seat. Her review of the fixing PR's diff is recorded in that PR's `**Consulted**:` line (Peter's "trust, but verify", 2026-10-24). The fixing PR edits only listed paths plus `.kiro/issues/**` records.

**Ada's review (2026-10-24, Ada)**: checked: the diff `origin/main...536acc204`; every changed file is in the Grant paths list or under `.kiro/issues/**`. Read `Migration.ts` `assessComponentCopies`, `classifyNpmAuthError`, `npmRailFetcher`, `repairOffers`, `Reporter.ts` and `index.ts` (`pendingOffers`, `resultDone`, `printResult`). Ran the five targeted suites (sync, sync.migration, sync.catalog, sync.name-contract, errorCatalog): 133/133 pass. Ran a throwaway probe of `classifyNpmAuthError`, deleted afterwards. Found: (1) **must fix** — the registry "origin" kept by `classifyNpmAuthError` keeps a URL's login part and query string. The probe returned `https://bob:s3cr3tTOKEN@npm.example.com` and `https://npm.example.com?token=abc`, and the result is printed by `registryAuthFailedMessage`. Parse the match with `new URL(…).origin`, and add those two cases to the test. (2) The `unlistedBefore` guard only turns a `modified` verdict into `cannot-tell`. It never makes anything `unmodified`, so it cannot cause a removal. When it fires, its verdict is honest, and so is the empty-list case, which fixes a real bug: before, a list with no version at or below the installed bound made every unmatched copy a fork. But it uses the last sync as the oldest version a copy can have come from, and design.md § C7 says copies can be older than the last sync. So a copy made before 13.0.0 in a repo last synced at 13.0.0 or later, or with no legacy manifest, is still called a fork and relocated when the pin is removed. That is not a regression, but `registryPinRefusedTokenMessage` ("a copy it still cannot judge stays where it is") and the code comments promise more than this. Fix the comments in this PR; the gap is a follow-up. (3) Low: on a terminal, `PRE_APPLY_REPORT_NOTE` also heads a run that has nothing to apply. (4) Low: findings from the name and type contracts are not counted as pending. F-9: covered for what it names (legacy copies, component copies, the tsconfig repair). What remains is F-8's half: the all-clear can still print beside a stale `COMPONENTS_DIR` or a stale autoApprove list. That is tracked in `2026-10-24-migrated-mcp-config-keeps-pre-123-components-dir.md`; I accept owner, Class and Trigger there, and I added autoApprove to its scope. Verdict: changes required — item (1) and the comment wording in (2); the rest are follow-ups.

Left out on purpose: `canonical/generated.lock` (`src/cli` is not a diff-guard input-closure root, so the lock does not move); the `design.md` catalog rows these strings mirror (Thurgood's — errata with Lina's strings, as for release-3 item 8). Uncertain whether R2 (a) needs `PackageResolver.ts` or fits inside `Migration.ts`; listed so the PR does not stop halfway for a grant. An out-of-list edit is a claims-pass finding.

**Walk 2026-10-20 (Thurgood, walk line under rule 9; ledger `archive/TRIAGE-2026-10-20.md` row 43, call BACK-FILL)**: this record lacks the rule-1 Trigger token (`**Trigger**: ` followed by one of `tag:v<semver>`, `merge:#<N>`, `path:<glob>`, `release:<ver>:phase-1` or `manual`) and the rule-12 `**Class**:` header. That is a walk finding. The owner writes both (rule 9); the steward writes neither. Steward's proposal, which the owner may override: Proposed `release:next:phase-1` (ruled in prose, 2026-10-15: "before release 5's RELEASE phase 1") · `P2 obligation (record) · defect`. `src/cli/sync/**` is in Ada's standing scope since the six-roots ballot; the owner may re-route, as she did on 2026-10-17 for two CLI records.
