# Task 5 Completion — `sync` re-scope, key-grain JSON, manifest, and component-copy migration

**Spec**: 123 — Consumer Distribution · **Unit**: U1 — Distribution substrate & packaging truth (Tasks 1–9, gated at Task 9) · **Type**: Implementation · **Validation**: Tier 3
**Agent (plan)**: PRIMARY Lina (Opus); Ada (Sonnet) — 5.5 token-side strings
**Delegated-tier**: plan held — Lina (Opus) PRIMARY on 5.1–5.6 and Ada (Sonnet) on the 5.5 token-side strings (`f7470dcf`, `d19cb50a`), as planned. Thurgood's design.md erratum (`d4ff5eab`) was a routed owner edit to his own spec artifact under his Task 2.6 seat, not an agent pulled into this parent, so it is not a divergence.
**Traces**: Reqs 5.1, 5.2, 5.5–5.8, 21 · design C7, DD2, DD21

---

## Success Criteria

**Addendum (2026-09-27)**: this table originally held only the first 7 rows below. `parseTasksMd`'s D1 defect (PR #211) stopped a criteria block at the blank line before the `**Instrument**:` paragraph, so the remaining 14 rows were reproduced, verbatim with status and evidence, in a separate table (§ "Criterion rows the parity parser does not extract"). D1 is now fixed, tasks.md's Task 5 block has been normalized to bulleted lines, and all 21 rows below are extracted by the parser as a single table — the separate table is retired and its rows merged here, in tasks.md order. No status or evidence changed.

| Criterion (verbatim) | Status | Evidence |
|---|---|---|
| **Ours never flows into theirs**: a fixture with an unedited copied token file and a newer package runs `sync --apply` → **byte-unchanged**. A deleted token file → not re-added. *(A `MANAGED_DIRS` diff alone would be presence-of-a-token.)* | ✅ verified met | `src/cli/__tests__/sync.test.ts › sync — end to end (Task 5) › ours never flows into theirs (Req 5.8) › born manifest: unedited copied token file → byte-unchanged; deleted token file → not re-added` and `… › legacy manifest that recorded the token tier: still byte-unchanged, still not re-added`. Both assert `dirHash(scratch, 'src/tokens')` equality (a directory hash, not a managed-list diff). `npx jest src/cli/__tests__/sync.test.ts → 14/14`. Bite (pre-123 managed set) → `✕ legacy manifest that recorded the token tier…`, recorded in `.kiro/specs/123-consumer-distribution/completion/task-5-4-completion.md`. |
| Classification: `deleted-by-you`, `untracked-new`, and `removed` only under managed entries (`sync.classify.test.ts`, three cases, bites recorded). | ✅ verified met | `src/cli/__tests__/sync.classify.test.ts › case 1/3 — deleted-by-you…`, `› case 2/3 — untracked-new…`, `› case 3/3 — removed-only-under-managed…`; the `three named cases` count is asserted. `npx jest src/cli/__tests__/sync.classify.test.ts → 4/4`. Four bites recorded red in `.kiro/specs/123-consumer-distribution/completion/task-5-4-completion.md` § "Bites recorded red". |
| **No class applies without the report first**: an off-TTY run without `--apply` changes zero files (directory hash unchanged). | ✅ verified met | `src/cli/__tests__/sync.test.ts › NO CLASS APPLIES WITHOUT THE REPORT FIRST — off a terminal without --apply, zero files change` (whole-repo `dirHash`, ≥6 files, with updates, relocation and key changes pending) and `› apply behavior › terminal: the report prints BEFORE the confirmation; declining applies nothing`. Bite (off-TTY guard removed) → 2 failed, recorded in `.kiro/specs/123-consumer-distribution/completion/task-5-4-completion.md`. |
| **Key-grain JSON, reading = PARSED VALUES** (§ "Open inputs" 5.3): | ✅ verified met | `src/cli/sync/KeyGrain.ts` (three `KEY_SURFACES`; only manifest-recorded or package-emitted keys classified). `src/cli/__tests__/sync.keygrain.test.ts › exactly three key-grain shapes are managed (2 × mcpServers, 1 × permissions.allow)`. `npx jest src/cli/__tests__/sync.keygrain.test.ts → 13/13`. |
| a consumer's own server key, and a consumer-authored `mcp__designerpunk-*` rule, survive `sync` **with parsed value unchanged**; | ✅ verified met | `src/cli/__tests__/sync.keygrain.test.ts › consumer entries survive an UPDATING sync with parsed value unchanged (all three shapes)`. Every surface is written in that test, and consumer entries are deep-equal before and after. Bite (the writer drops consumer servers) → 2 failed, recorded in `.kiro/specs/123-consumer-distribution/completion/task-5-3-completion.md`. |
| **when our keys are unchanged, the file's bytes are unchanged** (no write); | ✅ verified met | `src/cli/__tests__/sync.keygrain.test.ts › <file> › our keys unchanged → the file bytes are unchanged (no write), even with hand formatting` ×3 (bytes and mtime asserted on a hand-reformatted file). Bite (`unchanged` misread as `updated-safe`) → 3 failed, recorded in `.kiro/specs/123-consumer-distribution/completion/task-5-3-completion.md`. |
| editing our key → `conflict`; deleting it → `deleted-by-you`. | ✅ verified met | `src/cli/__tests__/sync.keygrain.test.ts › .kiro/settings/mcp.json › editing our key → conflict…`, `› .mcp.json › editing our key → conflict…`, and `› <file> › deleting our key → deleted-by-you…` ×3. Scope: at the `permissions.allow` array-entry grain an entry's identity IS its string, so an edit reads as `deleted-by-you` plus "yours" (`› .claude/settings.json › editing an allow entry reads as deleted-by-you + yours`). Bites: conflict→updated-safe (2 failed) and deleted-by-you→new (4 failed), recorded in `.kiro/specs/123-consumer-distribution/completion/task-5-3-completion.md`. |
| **Instrument**: `sync.keygrain.test.ts` over **three shapes**: `mcpServers.<key>` ×2 files and the `permissions.allow` array-entry grain. | ✅ verified met | `src/cli/__tests__/sync.keygrain.test.ts` (`describe.each` over `KEY_SURFACES`, count 3 asserted) → `npx jest src/cli/__tests__/sync.keygrain.test.ts → 13/13` |
| Manifest: the root path; stable order; one entry per line (re-serialize-equals-file); the legacy path read and relocated; pruning with its report. | ✅ verified met | `src/cli/__tests__/Manifest.test.ts` (13/13: root path, stable order, one entry per line, re-serialize equals file, legacy read/convert/pointer, pruning groups). `src/cli/__tests__/sync.test.ts › manifest relocation › legacy → root manifest (one entry per line), pointer left in the old file; the next run writes nothing`. Bites in `.kiro/specs/123-consumer-distribution/completion/task-5-2-completion.md`. |
| **The de-managed `src/types` pruning line states that the files remain required by their token tier's relative imports** (Ada D-T-A5). | ✅ verified met | `src/cli/sync/Manifest.ts` `SRC_TYPES_PRUNE_CLAUSE` (authored by Ada, `f7470dcf`). `src/cli/__tests__/Manifest.test.ts › one report line per pruned group; the src/types line states the files remain required (Ada D-T-A5)`. Ada's bite is in `.kiro/specs/123-consumer-distribution/completion/task-5-5-token-strings-completion.md`. |
| **A fixture shows `generate` green after pruning.** | ✅ verified met | `src/cli/__tests__/sync.test.ts › generate after the src/types pruning (Ada D-T-A5) › after sync prunes src/types, the files are still on disk and the token tier still loads through ../types` (plus its standing bite). **And the full CLI, end to end, 2026-09-27**: a legacy-layout scratch consumer (real `init`, then raw `src/tokens` + `src/types` + a 67-entry legacy manifest) → `node bin/designerpunk.js sync --apply` → prunes 59 `src/tokens` + 8 `src/types` entries → `node bin/designerpunk.js generate --force → exit 0` (217 primitives, 193 semantics, 10 component tokens). Bite: `src/types` moved aside → `generate --force → exit 1` ("Token source … failed to load"); restored → exit 0. |
| **Migration** (`sync.migration.test.ts`; each case's red recorded): | ✅ verified met | `src/cli/__tests__/sync.migration.test.ts` → `npx jest src/cli/__tests__/sync.migration.test.ts → 35/35`. Reds recorded in `.kiro/specs/123-consumer-distribution/completion/task-5-5-completion.md` and `task-5-6-completion.md` |
| (a) a copy edited before first sync → `modified`; | ✅ verified met | `src/cli/__tests__/sync.migration.test.ts › (a) a copy edited BEFORE the first sync → modified (judged against shipped content, not the baseline)`. Bite (unmatched → unmodified) → 4 failed (`task-5-5-completion.md`) |
| (b) unmodified copies across the version range → `unmodified`. **Range named and enumerated: the fixture covers 12.0.5 (dp-portfolio), 13.0.0, 14.0.0 and 14.1.0, plus the pre-Spec-104 identity-transform boundary** (S-T-A4); | ✅ verified met | `src/cli/__tests__/sync.migration.test.ts › (b) … › copies made at %s` ×5 (11.2.1, 12.0.5, 13.0.0, 14.0.0, 14.1.0), `› each distinguishable version is actually consulted…`, `› the pre-Spec-104 boundary…`; fixture `src/cli/__tests__/fixtures/sync/package-snapshots.json` (provenance inside). Bites: transform not applied → 9 failed; boundary moved → 3 failed (`task-5-5-completion.md`). Scope: 12.0.5 and 13.0.0 are byte-identical for the fixture files, so they are distinguishable only as a pair. |
| (c) offline → `cannot-tell`; | ✅ verified met | `src/cli/__tests__/sync.migration.test.ts › (c) … › offline: the version list cannot be read → every component cannot-tell, with the catalog string`, `› the public rail … → cannot-tell, not modified`, `› installed version unknown … → cannot-tell`. The three-cause message is string-equal to the erratum'd row: `src/cli/__tests__/sync.catalog.test.ts` → 11/11 (`c33c54ef`). |
| (d) the registry-pin repair is **not offered before the fetch**; | ✅ verified met | `src/cli/__tests__/sync.migration.test.ts › 5.6 — repairs, offered only AFTER the migration fetch › (d) the registry-pin repair is not offered before the fetch (trace order), with its named explanation`. Bite (offers moved above the fetch) → 2 failed (`task-5-6-completion.md`) |
| (e) modified copies relocated; | ✅ verified met | `src/cli/__tests__/sync.migration.test.ts › (e) --migrate-components: forks relocated to src/components/<Name>/, unmodified removed, cannot-tell left, yours moved`; `› nothing is removed without --migrate-components…`. Bite (forks removed instead of relocated) → red (`task-5-5-completion.md`) |
| (f) the forks string and the Lina A5 notes. | ✅ verified met | `src/cli/__tests__/sync.migration.test.ts › (f) the forks string, the yours line, and the Lina A5 notes name their files`; `src/cli/__tests__/sync.catalog.test.ts › migration — modified copies` (string-equal to the catalog row). Ada's strings are in `task-5-5-token-strings-completion.md` (`f7470dcf`, "copied" fix `d19cb50a`). Bite (forks string drift) → `✕ migration — modified copies` |
| **U1's migration report states that copied agents, steering and governance are RETAINED until the next release, and does not offer their removal** (T-L1). String-equal. | ✅ verified met | `src/cli/__tests__/sync.migration.test.ts › U1 RETAINS copied agents, steering and governance — string-equal, and no removal is offered (T-L1)`. Bite (the string offers removal) → red (`task-5-5-completion.md`) |
| **dp-portfolio input**: Peter's `ls .kiro/sync-manifest.json` result is quoted, **or** the doc records *"not obtained — both branches covered by fixtures"*. Fixtures cover manifest-present and manifest-absent either way. | ✅ verified met | Quoted in `.kiro/specs/123-consumer-distribution/completion/task-5-1-completion.md` (PRESENT, 142,698 bytes, 12.0.3 lagging the installed 12.0.5). `src/cli/__tests__/sync.migration.test.ts › the two manifest branches (5.1) and the lag › manifest PRESENT…` and `› manifest ABSENT…`; fixture `src/cli/__tests__/fixtures/sync/dp-portfolio.legacy-manifest.json` |
| The Applier source branch is deleted: `grep -n "isSourceTs" src/cli/sync/` → 0. | ✅ verified met | `grep -rn "isSourceTs" src/cli/sync/ \| wc -l → 0` at `d19cb50a` (the source tier is gone from `src/cli/sync/Applier.ts`) |

Unmet or partially met criteria: None

---

## Additional verification

Primary Artifacts: all shipped as declared — `src/cli/sync/{FileScanner,Classifier,Manifest,Applier,Reporter,index,Migration,KeyGrain}.ts` (`Migration.ts` and `KeyGrain.ts` new; the rest rewritten), plus tests (`src/cli/__tests__/{sync,sync.classify,sync.keygrain,sync.migration,sync.catalog,Manifest,FileScanner}.test.ts`, `syncTestKit.ts`, `fixtures/sync/*.json`; `Applier.test.ts`, `Classifier.test.ts` and `Reporter.test.ts` deleted as superseded).

No `**Merge gate:**` block is declared for this parent (`parseTasksMd` → `mergeGate: []`). No artifact is deferred to a later unit.

### Validation (at `d19cb50a`, before this doc's commit)

- `npx tsc --noEmit` → 0 errors
- `npm test` → 381 suites, 9229 tests passed
- `npm run test:scripts` → 9 suites, 179 tests passed
- `npx tsx scripts/pack-assert.ts` → 40/40 assertions passed
- `npx jest src/cli/__tests__/sync src/cli/__tests__/Manifest.test.ts src/cli/__tests__/FileScanner.test.ts` → 7 suites, 93 tests passed (keygrain 13, classify 4, sync 14, catalog 11, migration 35, Manifest 13, FileScanner 3)
- `npx tsx scripts/check-completion-criteria-parity.ts --base origin/main` → spec-123 parity lines are in the task report
- Build noise (`docs/tokens.css`, `token-index/semantics.yaml`, `token-index/meta.json`) reverted before every commit

---

## Rulings, adaptations and records carried

### Peter's ruling on the migration transform fork — option (A) (2026-09-26)

- **The fork**: C7 assumed `dist/cli/shared/transforms.js` exists from 11.9.0 on and that everything before Spec 104 used the identity. In reality, 11.9.0–12.x ship only the `.ts`, and 11.3.0–11.8.x keep the transform private to `init.ts`.
- **Ruled (A)**: keep as built. The 11.3–11.8 transform stays unknown, which gives `cannot-tell`.
- **Condition 1 (actionable)**: `cannotTellRemedyMessage` follows the cannot-tell lines. It names both manual paths (edited → move to `src/components/<Name>/`; not edited → delete it and get the package's version) and says the old `core/` level keeps logging its legacy warning (`application-mcp-server/src/indexer/ComponentIndexer.ts:555`).
- **Condition 2 — REVIVAL TRIGGER**: *if any consumer surfaces whose copies date from 11.3–11.8, build option (B) (extract the transform from that version's own `init.ts`).* — Peter's ruling, 2026-09-26.
- **Honest cost**:
  - `.ts`-only forks stay in `core/`: they read `cannot-tell` and are not relocated.
  - A pristine 11.3–11.8 copy of a `.ts` file whose source changed before 11.9 reads `cannot-tell` and keeps shadowing that component until she acts by hand.
- Records: `.kiro/specs/123-consumer-distribution/completion/task-5-5-completion.md` § "Peter's ruling on the transform fork".

### The cannot-tell erratum chain

1. Lina flagged the single-cause row as wrong for two of three causes (5.5 report).
2. Thurgood's design.md erratum made it three-cause and added the remedy row (`d4ff5eab`, `completion/task-5-erratum-cannot-tell.md`).
3. Lina's code became string-equal per cause; the cause is selected per file (`c33c54ef`, `task-5-5-completion.md` § Addendum). Bite: transform cause given the fetch-failed reason → red.

### Ada's token-side strings

- `SRC_TYPES_PRUNE_CLAUSE` was carried unchanged, and `oldNameReferenceMaps` and `brandedTokenFiles` were rewritten (`f7470dcf`).
- Her "copied" fix (`d19cb50a`) makes `oldNameReferenceMaps` owner-neutral, because that list includes consumer-authored files.
- Records: `completion/task-5-5-token-strings-completion.md`.

### The detection fix and its residual

- `scanTokenFiles` searches `stripComments(text)`, so a comment-only mention no longer reads as branded.
- `brandedTokenFiles` is scoped to copies.
- **Residual**: an aliased import (`import { defineComponentTokens as dct }`), or a string literal containing the name, still reads as branded. The migration deliberately never executes her copied `.ts`; Task 8's lint counts brands at runtime.

### Accepted adaptation

The migration loads 11.9.0–12.x's transform from `src/cli/shared/transforms.ts` through tsx (a runtime dependency). This was **accepted by the coordinator, 2026-09-26**, and verified from the compiled CLI.

### Disclosed out-of-list edits (the brief's minimal, disclosed rule)

1. `src/cli/init.ts`: the manifest write goes through `serializeManifest` (call-site swap + imports), so the first `sync` does not rewrite a born repo's committed manifest. (5.2)
2. `src/cli/shared/mcpConfig/cc.ts`: `.claude/settings.json` is recorded per allow entry (`recordKey`) instead of as one file (two call sites). (5.3)
3. `src/cli/designerpunk.ts`: `runSyncCommand` → `parseSyncArgs` (call-site swap), plus one help line (`--accept-all` → `--apply`). (5.4)
4. `src/cli/__tests__/Prompter.test.ts`: one fixture line (`tier: 'source'`) deleted. `Prompter.ts` is now unused. (5.4)

### dp-portfolio

- The over-read of dp-portfolio's `.npmrc` (token redacted, never printed), its `package-lock.json` and its directory listings went beyond the permission. It was disclosed in the 5.5 handoff and is recorded in `task-5-1-completion.md`.
- **The coordinator's rule for the rest of U1: no reading credential files (`.npmrc`, `.env`, auth configs) in any repo other than this one, even redacted; stop and ask if a check needs registry configuration.**

### The steward guard

- `sync` stops before reading or writing when the package root is the project root.
- This repo's stale `.kiro/sync-manifest.json` is **left untouched and routed to Thurgood** (Civitas steward). It is asserted by `mcp-server/src/relocation-integrity-gate/relocation-integrity-gate.ts:254`.
- Record: `task-5-4-completion.md`.

**Addendum (2026-09-27, Thurgood, CI gatefix on U1 PR #215)**: routed item investigated, not a code fix. The gate's A1 check on `.kiro/sync-manifest.json` (line 254) currently PASSES (82 governance keys, 9 identity keys, meta-guide dropped). It was NOT the cause of the `lane-mcp-server-suite` CI failure on U1 — that was a different check (A7, the `FileScanner.ts` `MANAGED_DIRS` shape Task 5.4 itself retired; fixed by re-pointing to `Manifest.ts`'s `COPY_ROOTS`, see `task-9-ci-gatefix-completion.md`). The steward guard means `sync` never reads or writes `.kiro/sync-manifest.json` in this repo, so the file is frozen and cannot be corrupted going forward — A1 is a fossil check on inert content, not a live risk. Left unchanged: it currently passes, protects a real historical fact, and this repo has no `designerpunk.manifest.json` to re-point it to (the steward guard prevents one from ever being created here). Treating the routed item as resolved in the sense that mattered — confirmed non-blocking, confirmed non-corruptible — not in the sense of a code change.

---

## Carried, not fixed in this task

1. **`untracked-new` names `npx designerpunk attach`, which ships in release 2** (Task 16). The string is string-equal to the catalog; in release 1 it can appear only for a born repo whose manifest recorded no key for an attached surface. (`task-5-3-completion.md`, adaptation 4)
2. **A mutating approval is reported, not withdrawn.** When a tool's `readOnlyHint` flips to false, a recorded approval is listed under "Removed from package" and left in place → **U2 Task 16.5** (generated-surface `sync`). (`task-5-3-completion.md`, adaptation 3)
3. **The CLI help lacks the new flags** (`--migrate-components`, `--repair-npmrc`, `--repair-tsconfig`). `designerpunk.ts` is outside the list → **Task 16 / C27**. (`task-5-6-completion.md`, adaptation 3)
4. **`npm run test:consumer` › "generate produces output files" fails before this task.** It fails identically at `e0496a10` without Task 5's changes (it expects `inputradio.box.sm` from copied components) → **Task 9**.
5. `transforms.ts`'s deprecation comment still says the Applier calls `rewriteBuildImports`. That file is Task 2's; left for Task 9's removal of the function.

## Findings routed

- **For Thurgood (owner of the `completion-criteria-parity` instrument)**: `parseTasksMd` stops a criteria block at its first blank line. Task 5's block has a blank line before its `**Instrument**:` paragraph, so **14 of 21 criterion rows are not extracted**. A parity PASS on parent 5 covers the 7 extracted rows only. The other 14 are verified above, but outside the predicate's reach. The instrument's own principle is that absorbing a row is not the same as dropping it. Either the parser should continue past an indented or blank-separated paragraph within the block, or `tasks.md` authoring guidance should forbid blank lines inside a criteria block (a tasks-round lint). **Resolved (2026-09-27, PR #211)**: this defect (D1) is fixed, and tasks.md's Task 5 block is normalized to bulleted lines — see the addendum in § "Success Criteria" above.

## Subtask completion docs

`.kiro/specs/123-consumer-distribution/completion/task-5-1-completion.md`, `task-5-2-completion.md`, `task-5-3-completion.md`, `task-5-4-completion.md`, `task-5-5-completion.md` (Lina), `task-5-5-token-strings-completion.md` (Ada), `task-5-6-completion.md`; design erratum record `task-5-erratum-cannot-tell.md` (Thurgood).
