# Task 16.5 completion: generated-surface `sync`, `attachedTargets` consumed, legacy migration only-with-attach, the release-1 cohort

**Spec**: 123 (Consumer Distribution) · **Unit**: U2b · **Parent**: Task 16 · **Agent**: Lina (Opus, PRIMARY)
**Date**: 2026-10-01 · **Branch**: `task/123-u2b-profile`, from `e5350cad`
**Instruments**: `.kiro/specs/123-consumer-distribution/completion/task-16-instruments.md`, rows 5.1, 5.2, 6.1–6.4, 7.1, 7.4, 8.1–8.4. Each row read as stated. One unlisted instrument was found and is appended under § "Found later" there (see below).
**Commits**: `35c45d03` (PRIMARY housekeeping: 16.2–16.4 ticked, three Found-later rows), `1ec4b6c4` (16.5 code and tests), and this doc with the 16.5 tick.

## What changed

### `src/cli/sync/index.ts`: what `sync` manages (C7's ADDED rows)
- **The package side of the generated surfaces is emitted fresh** for the manifest's `attachedTargets` only. It goes through `emitConsumer` in `mode: 'sync'`, loaded from the installed package's `dist/generator/consumer-entry.js` through `attach.ts`'s `resolveAgentTarget` (C7 L319; C20). An `agentLayer` test seam stands in for the bundle, the same way the existing `fetcher`, `confirm` and `configLoader` seams do.
- **File grain**: `classifyFiles` runs over `origin: 'generated'` entries under the agent-layer roots. Those roots are derived from the emission itself (a path's first two segments), never from a list kept in `sync`. The outcomes:
  - a deleted generated file is `deleted-by-you`;
  - a file of a target with nothing recorded yet is `untracked-new`, reported with its `attach --target=<t>` row and never applied (C7 L323);
  - a generated file the package no longer emits is `removed`.
- **Region grain** (`CLAUDE.md#managed`):
  - `updated-safe` is spliced, and outside bytes are unchanged;
  - edited inside is the catalog's "edited inside" row, replaced only with `--apply` or `--overwrite CLAUDE.md#managed`, never by the terminal's batch confirmation alone;
  - a recorded region whose markers are gone gets the catalog's "markers missing" row, and nothing is written.
- **Applying writes generated content** from the in-memory package side, recorded `origin: 'generated'`. U1's `applyCopyFile` / `adoptCopyFile` are no longer called.
- **Key grain**: keys are reconciled for every target whose keys the manifest records. That is `attachedTargets` plus a target wired without its agent layer (`init --skip-agents`, `attach --reference`). A `posture: 'consume'` manifest's package side is limited to the reference servers (DD22: "the manifest lets `sync` repair the reference install's approval drift").
- **Legacy copies** (C7 Migration item 4) form a new report section, keyed on `origin: 'copy'` under `COPY_ROOTS`. `--migrate-legacy` and `--target=<t>` are parsed. The flow, `runMigrateLegacy`:
  1. Refuse, removing nothing, unless attach is available and there is a target.
  2. Remove the copies.
  3. Call `emitAgentLayer` (`attach`'s own code path, `mode: 'attach'`) for each target, in the same run.
  4. Save the manifest and print the sequenced restart row last.
  - Nothing else classified in that run is applied, because the attach step made it stale.
- Retired: the U1 `LEGACY_AGENTS_RETAINED_MESSAGE` branch and its `.kiro/steering` on-disk check. That check would have fired for every Kiro-attached repo, since generated `designerpunk-*` identity files live there.

### `src/cli/sync/Migration.ts`: Migration item 4
`legacyCopyEntries` (origin-keyed), `assessLegacyCopies`, the `AttachAvailability` type, the report strings, `removeLegacyCopies` and `legacyRemovalSummary`. The report strings (authored here, with no catalog row) are: the legacy-copies line, the modified and missing lines, the offer, unavailable, needs-a-target and refused.
- **Removal** deletes only copies whose bytes still equal the recorded copy hash. It re-checks the hash at removal time rather than trusting the report.
- **An edited copy** stays on disk as hers and is untracked.
- **A missing copy** has its record dropped.
- **Every legacy entry leaves the manifest.** Directories that the deletions empty are removed, up to the copy root.
- The offer composes `attachUsage()`, so the verb never appears without its object.

### `src/cli/sync/Classifier.ts`
- `classifyFiles` gains an options parameter: `origin` (default `'copy'`, which is the unchanged U1 behaviour) and `untracked`.
- The result gains `untrackedNew`. A package path holding an entry of another origin (a legacy copy on a generated path) is skipped, never classified as a `conflict`.
- New: `classifyRegion`, `regionEntryId`, `emptyClassification`. `managedCopyRoots` is kept, but `sync` no longer calls it.

### `src/cli/sync/RegionGrain.ts`
New pure functions: `normalizeRegionContent` (the one comparand form; the manifest's region hash is over it), `wrapRegion` and `appendRegion`.

### `src/cli/sync/Manifest.ts`
`COPY_ROOTS`' docblock is rewritten to its new meaning: the release-1 copy roots `sync` recognizes, no longer managed, and pinned by the 119-A gate. **The name, the literal and the membership are unchanged.**

### `src/cli/attach.ts` (corrections to the 16.2 write path, see A.1)
- **Region grain, append on first attach**:
  - The region is appended into an existing `CLAUDE.md` that has none and no recorded region. The consumer's bytes stay in place as the prefix.
  - A recorded region whose markers are gone still gets the catalog row, and no write.
  - Region hashes are taken over `normalizeRegionContent`.
- **A release-1 copy on a generated path** (Kiro `.kiro/agents/<a>.json`) counts as "ours" only while its bytes equal the recorded copy hash. An edited copy is a 19.8 collision: reported and left untouched.
- **New exports**: `REFERENCE_SERVERS` (shared with `sync`) and `attachRefusal(repoRoot)`. `runAttach` now uses `attachRefusal`, so `sync` never offers an attach that `attach` would refuse.

### `src/cli/shared/errorCatalog.ts`, `src/cli/designerpunk.ts`
- `managedRegionEditedInsideMessage`: design § Error Handling's row, verbatim.
- Help text: one `sync --migrate-legacy` line, composed with `attachUsage()`.

### Tests
**New `sync.cohort.test.ts`** (6 tests):
- **The cohort as captured.** It is reported, the offer equals `migrateLegacyOfferMessage(['cc','kiro'], …)` and carries `attachUsage()`, and none of the 124 paths is classified. That includes `.kiro/agents/ada.json`, which the package does emit.
- **`--migrate-legacy`.** The trace order is `migrate-legacy:removed:121` → `attach:cc` → `attach:kiro`. **Zero `origin: 'copy'` entries** remain under the three roots (and none anywhere). Generated entries replace them. Edits stay on disk as hers. The restart row is printed last. The next `sync` does not re-detect the cohort.
- **Only-with-attach, three tests.** Two cover attach being unavailable: no lane, and a repo attach would refuse. In both, no line offers `sync --migrate-legacy`, `--migrate-legacy` is refused, and the directory hash and the 124 copy entries are unchanged. The third checks that every offer line carries `attachUsage()`.
- **A `COPY_ROOTS` literal check.**

**New `sync.generated.test.ts`** (9 tests, real package via a `node_modules/@3fn/core` symlink):
- a freshly attached repo is all `unchanged`, with nothing from Kiro's lane;
- a deleted generated file is `deleted-by-you`, not re-added even with `--apply`, and `--restore` re-adds the package bytes;
- `updated-safe` applies, and an edited file is a conflict;
- `untracked-new` is reported and never applied;
- region: spliced with outside bytes byte-equal; edited inside, where the TTY confirmation alone does not apply and `--apply` does; markers missing, with no write;
- key: a deleted key is `deleted-by-you`;
- `attach --reference`: keys are reconciled against the reference scope (never the product server), and drift is reported.

**Additions to existing tests**:
- `attach.test.ts`: 3 tests (append into an existing `CLAUDE.md`, plus re-run idempotence; recorded markers removed, no write; an unmodified copy is replaced, an edited copy is left alone);
- `sync.region.test.ts`: 3;
- `errorCatalog.test.ts`: 1;
- `sync.test.ts`: `--migrate-legacy` / `--target` flag parsing.

**Moved vehicles.** `sync.test.ts` (report-first and apply behaviour) and `sync.classify.test.ts` cases 1 and 3 used release-1 copies under `.kiro/steering`, which 16.5 de-manages by design. They now use generated agent files through the seam. The properties they assert are unchanged. A Spec 111 legacy-manifest pruning test is added beside case 3. `sync.migration.test.ts`'s U1 T-L1 test ("retained until the next release") becomes U2's: dp-portfolio's copies are reported, and with no attach step nothing is offered.

## Targeted tests + result

| Lane | Result |
|---|---|
| `npm test -- src/cli/` | **35 suites, 411 tests, all green** |
| `npm test` (full functional) | **389 suites, 9352 tests, all green** |
| `npm run typecheck` | clean |
| `npm run check:122:diff-guard` | `no-op-green`. The lock did not move, no unit is stale, and no signed hash moved. |
| `npm run check:completion-criteria-parity -- --spec 123-consumer-distribution` | `parents evaluated 18, pass 18, fail 0; reds 0` |
| `cd mcp-server && npx jest` | **2 failed / 634 passed**, equal to the `e5350cad` baseline. The two failures are the relocation-gate tests (Thurgood's, PR #248). There are no other failures. |
| `cd application-mcp-server && npx jest` | **369 / 369**, equal to the baseline |
| `test:consumer` | not run (16.6) |

### Bites (each mutated, run, then restored from a saved copy and `cmp`-confirmed)
1. **The cohort bite**: the detection is keyed on the manifest's version instead of `origin`. In `sync/index.ts` the line `const legacy = assessLegacyCopies(projectRoot, entries);` was changed to `relocateLegacy ? assessLegacyCopies(…) : null`, which detects only a legacy-format (Spec 111) manifest. Result: **`sync.cohort.test.ts` 5 failed / 1 passed**. The cohort case's failing assertion:
   ```
   expect(out.legacyCopies).toBeDefined()   // sync.cohort.test.ts:102
   Received: undefined
   ```
   The `--migrate-legacy` case's failing assertion: `expect(steps).toEqual(["migrate-legacy:removed:121","attach:cc","attach:kiro"])`, which received `[]`. The release-1 manifest is current-format, so a version key goes silent on the whole cohort. Restored, and the suite is green.
2. **The only-with-attach bite**: `legacyCopyReportLines` was made to print the offer even when attach is unavailable. Result: **3 failed** (both "NOT offered" tests and the dp-portfolio U2 T-L1 test). The first failing assertion: `expect(con.output()).toContain(migrateLegacyUnavailableMessage('the agent-layer lane is unavailable'))`. Restored, and the suite is green.

## The A.1 calls

- **(16.2) `package-mode` treated as attachable: CONFIRMED.**
  - DD23 made `package-mode` a posture, not a partial. C20's Modes list (born / `--reference` / unborn / partial) predates that split.
  - `attach` is about the harness, not the token tier.
  - `attachRefusal` now carries the rule for both `attach` and `sync --migrate-legacy`. The header note is updated.
- **(16.2) `RegionGrain` wiring placed in `attach.ts`: KEPT, and CORRECTED in two places.** `attach` writes the region; `sync` reconciles it.
  - **(a) The first attach into an existing `CLAUDE.md` with no markers was reported as "markers missing".** A CC consumer who already has a `CLAUDE.md` (the common case) would never get the always-layer, and re-running `attach` could not fix it. `attach` now appends the region when the manifest records none. A recorded region whose markers are gone still gets the catalog row and no write.
  - **(b) The region hash recorded `sha(raw content)`.** `sync` compares the extracted region in `normalizeRegionContent` form, so the two forms are now one.
- **(16.3) `--skip-agents` = no agent files, no `attachedTargets` entry, MCP config still wired: CONFIRMED, with one 16.5 consequence handled.** `sync` keyed key-grain reconciliation on `attachedTargets`, so a `--skip-agents` repo (and every `attach --reference` repo, whose `attachedTargets` is `[]` by 16.2's call) would have silently lost MCP-key reconciliation. That would defeat DD22's stated reason for the consume manifest. Key-grain targets are now `attachedTargets` plus the targets with recorded keys, and a consume manifest's package side is the reference scope. The generated surfaces stay `attachedTargets`-only, per the criterion.
- **(16.3) `--re-scaffold` `adoptIdentical`: CONFIRMED.** An edited generated file is left byte-identical, reported, and not recorded. A later `sync` then sees no entry: if the content is byte-identical it is adopted, otherwise it is a no-history conflict, never overwritten. That is consistent with C7's rule that the manifest decides what is managed.
- **(16.3) `sync.test.ts` "freshly born repo syncs as a no-op" now asserts zero `copy` and at least one `generated`: CONFIRMED.** With 16.5 that test now exercises generated-surface `sync` end to end over the real package, and it stays green. `sync.generated.test.ts` asserts that a freshly attached repo classifies everything as `unchanged`.
- **(16.3) `tarball-target.json` not refreshed: CONFIRMED. It must NOT be refreshed, and this is not a grant gap.** It is Task 3's committed baseline from the post-diet pack. Task 28 (U5 closeout) compares the release tarball against it "with differences attributed" (tasks.md L1042). Refreshing it at Task 16 would erase the evidence that criterion attributes. No Task 16 criterion reads it.

## The `COPY_ROOTS` statement (for Thurgood, before merge)

**16.5 did NOT rename `COPY_ROOTS`, did NOT move the list, and did NOT drop any root.** The literal is still `export const COPY_ROOTS = ['.kiro/agents', '.kiro/steering', 'governance', '.kiro/skills'] as const;` on one line in `src/cli/sync/Manifest.ts`. Its meaning changed exactly as the issue anticipated: these are the release-1 copy roots `sync` recognizes, as legacy copies, and no longer manages at file grain. The cohort migration keys `origin: 'copy'` on exactly these roots (`Migration.ts` `legacyCopyEntries`). The gate's A7 regex was re-run against the file: `governance=true`, `steering=true`. `sync.cohort.test.ts` pins the membership too.

## Application-time adaptations

1. **Region edited inside applies with `--apply`, not with the TTY batch confirmation alone.** Design C7's apply rule says "`conflict` … never appl[ies] without a per-path flag". The catalog row for regions says "not applying without --apply". Both are honoured: `--apply` or `--overwrite CLAUDE.md#managed` applies it, and the confirmation alone never does.
2. **`--migrate-legacy`'s targets** are the manifest's `attachedTargets` plus any `--target=<t>` given.
   - For the release-1 cohort this is `['cc','kiro']` (release 1's two-target literal), so a Kiro-only cohort consumer also gets a CC agent layer. The residual: she can delete it afterwards, and `sync` then reports `deleted-by-you`, never re-adding it.
   - A legacy (Spec 111) manifest records no targets. There the offer names `--target=<cc|kiro>` (the packaged profile's declared set), and `--migrate-legacy` without a target refuses and removes nothing.
3. **"Unmodified" for a legacy copy is judged against the hash the manifest recorded.** For release-1 that is the hash at copy time, which is exact. For a Spec 111 entry it is the first-sync baseline, so an edit made before the first sync reads as unmodified and would be deleted. This is the same bootstrap caveat C7 step 2 names for component copies. It is accepted rather than fetching shipped content: the package no longer ships these paths, so a fetch would need the old tarball and the old copy semantics. It is recorded here as a residual.
4. **After `--migrate-legacy` runs, nothing else classified in that run is applied.** The attach step regenerated those surfaces. The output says to run `sync` again to review.
5. **Copies on disk with no manifest record** (a pre-123 repo with no manifest at all, such as dp-portfolio's possible case) are not identifiable as DesignerPunk's and are not reported. The U1 on-disk heuristic was retired because it false-fired on generated Kiro identity files. This is a residual: C7's "legacy copies on disk" trigger is implemented for component copies only (Task 5.5).
6. **The cohort test synthesizes the copied tree** at the fixture's paths. The fixture holds no file bytes, and its README directs exactly this. For the cases that need unmodified copies, the copy hashes are re-bound in memory to the synthesized bytes. The "as captured" case uses the fixture's own hashes, unmodified.
7. **Existing Task 5.4 test vehicles moved** from release-1 copies to generated files (see "Tests" above). The properties are unchanged; only the surface `sync` manages changed, by design.
8. **Outside the grant, untouched, flagged**:
   - `Applier.ts`'s `applyCopyFile` / `adoptCopyFile` are no longer called by `sync` and are dead in production.
   - `Classifier.ts`'s `managedCopyRoots` is likewise unused by `sync` (it is in the grant, and kept for the fixture README's references).
   - `Reporter.ts` and `KeyGrain.ts` are consumed unchanged.

## Found later (appended to the instruments block)
- **unlisted**: `src/cli/sync/Reporter.ts`'s catalog rows `deletedByYouMessage` / `untrackedNewMessage` and `buildReport`, consumed unchanged for the generated-surface report. Rows 8.1–8.4 name the classifier and the key grain, but not the reporter. Route: none needed. It exists, is consumed unchanged, and is outside the grant.

## Not done
- `test:consumer` (16.6).
- The `.gitignore` managed region (Task 20, as 16.4 recorded).
