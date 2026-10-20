# One-hop upgrade rehearsal (pre-123 consumer → 15.0.0): the tracked residuals

**Date**: 2026-10-02
**Status**: ACTIVE (tracked items; **no grant**: this file carries no `**Grant paths**:` list)
**Owner**: Lina, for every item below unless the item says otherwise.
**Class**: `P2 obligation (record) · defect` *(set 2026-10-20, Lina, rule 12. Accepted. R2, R4 and R6 were waived for 16.0.0 by Peter on 2026-10-15 and are disclosed in the 16.0.0 notes (R2) and the INSTALL "Upgrading from 14.x" sentence (R4); no reader is misled, but the fixes are owed and have lapsed twice. R1 and R5 moved to Spec 129 on 2026-10-14. R2/R4/R6's fix still sits in sync code that is under the grant below.)*
**Trigger**: `release:next:phase-1` — Lina's `fix/` PR for R2, R4 and R6 under the grant below, merged before release 5's RELEASE phase 1, or a dated re-ruling; a third lapse routes to Peter as a spec-or-drop decision. The per-item triggers below (R1 to R6) still apply to their items. *(was: per item, below. Each item is an event, never a date. Token set 2026-10-20 from the ruled 2026-10-15 trigger in § Disclosed.)*
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

Left out on purpose: `canonical/generated.lock` (`src/cli` is not a diff-guard input-closure root, so the lock does not move); the `design.md` catalog rows these strings mirror (Thurgood's — errata with Lina's strings, as for release-3 item 8). Uncertain whether R2 (a) needs `PackageResolver.ts` or fits inside `Migration.ts`; listed so the PR does not stop halfway for a grant. An out-of-list edit is a claims-pass finding.

**Walk 2026-10-20 (Thurgood, walk line under rule 9; ledger `archive/TRIAGE-2026-10-20.md` row 43, call BACK-FILL)**: this record lacks the rule-1 Trigger token (`**Trigger**: ` followed by one of `tag:v<semver>`, `merge:#<N>`, `path:<glob>`, `release:<ver>:phase-1` or `manual`) and the rule-12 `**Class**:` header. That is a walk finding. The owner writes both (rule 9); the steward writes neither. Steward's proposal, which the owner may override: Proposed `release:next:phase-1` (ruled in prose, 2026-10-15: "before release 5's RELEASE phase 1") · `P2 obligation (record) · defect`. `src/cli/sync/**` is in Ada's standing scope since the six-roots ballot; the owner may re-route, as she did on 2026-10-17 for two CLI records.
