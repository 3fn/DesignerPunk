# Task 5.5 Completion — Component-copy migration; legacy agents/steering retained with the U1 report string

**Spec**: 123 — Consumer Distribution · **Unit**: U1 · **Parent**: Task 5 · **Agent**: Lina (Opus). Ada (Sonnet, secondary seat) authored the three token-side strings: see `task-5-5-token-strings-completion.md`.

## What changed

### `src/cli/sync/Migration.ts` (new), wired in `index.ts`

- **Trigger (C7)**: a legacy manifest, or `src/components/core/<dirs>` on disk (`migrationTrigger`).
- **Fetch — the consumer's rail, cache first (L2-D2)**: `npmRailFetcher(projectRoot)` runs `npm view @3fn/core versions --json --prefer-offline` and `npm pack @3fn/core@<v> --prefer-offline --pack-destination <scratch> --json`, then `tar -xzf`, all with `cwd` set to her project so HER `.npmrc` applies.
  - Real smoke test against npmjs: it listed `["13.0.0","14.0.0","14.1.0"]`, fetched 13.0.0 and loaded its transform, and `fetch('12.0.5')` returned `null`, which gives `cannot-tell`.
  - Tests inject a fetcher over `fixtures/sync/package-snapshots.json`.
- **The range**: from the earliest fetchable version to the installed version, newest first. The installed version comes from the manifest's `installedVersion`, else `package-lock.json`, else unknown (→ `cannot-tell`). A legacy manifest's version (the last sync) never bounds it; see 5.1 for dp-portfolio's lag.
- **The transform, loaded from each fetched tarball (`loadTransform`)**:
  1. `dist/cli/shared/transforms.js` (13.0.0+);
  2. `src/cli/shared/transforms.ts` through tsx (11.9.0–12.x did not ship `dist/cli/shared/`) — **ACCEPTED as an adaptation by the coordinator, 2026-09-26** (tsx is a runtime dependency; verified from the compiled CLI);
  3. identity when the version's `init` never mentions `rewriteBuildImports` (before Spec 104);
  4. otherwise `unknown` (11.3.0–11.8.x, where the transform is private to `init.ts`). **Ruled: keep as built** (below).
- **Per file**: `.ts` files get the transform and other files are hashed raw; `__tests__` is excluded. A component is `unmodified` iff every file is. A file shipped by every matched version but missing from the copy makes it a fork. A component no fetched version ships is `yours`. A failed fetch, an unknown transform, or an unknown installed version gives `cannot-tell`, never `unmodified`.
- **Report**:
  - unmodified: "shadow package updates — remove them to receive updates (`sync --migrate-components`)";
  - forks: the catalog row;
  - yours: authored here;
  - per-path `cannot tell`: the catalog row, followed by the new **actionable remedy line** (below);
  - Ada's two token-side lines;
  - **the U1 RETAINED string**.
- **`--migrate-components`**: removes unmodified copies, moves forks and "yours" components to `src/components/<Name>/` (skipping, and reporting, a target that already exists), leaves `cannot-tell` in place, and removes an emptied `core/`. **Nothing is removed without the flag.**

### Peter's ruling on the transform fork (2026-09-26): option (A), with two conditions

**The fork**: C7 assumed `dist/cli/shared/transforms.js` exists from 11.9.0 onward and that everything before Spec 104 used the identity. In reality:
- 11.9.0–12.x ship only the `.ts` (handled by the accepted tsx load);
- 11.3.0–11.8.x keep the transform private to `init.ts`.

Peter ruled **(A): keep as built**. The 11.3–11.8 private transform stays `unknown`.

**Condition 1 — the cannot-tell message is actionable.**
- The catalog row (`cannot tell whether <path> was modified — the package content for version <v> could not be retrieved. Review before removing.`) named no path forward.
- It stays **string-equal** to the catalog row, which is pinned by `sync.catalog.test.ts`.
- It is now followed, once per report, by `cannotTellRemedyMessage(names)`. Final text for one component:

  > `sync cannot judge Button-Icon, so 'sync --migrate-components' leaves it in src/components/core/. Decide each by hand: if you edited it, move it to src/components/<Name>/ (it becomes your fork); if you didn't, delete it and you'll get the package's version. Until then, the old core/ level keeps logging its legacy warning each time the component index loads.`

- The legacy warning it refers to is real. The application MCP indexer logs `Legacy component level: … in the pre-123 'core/' layout …` on each load (`application-mcp-server/src/indexer/ComponentIndexer.ts:555`, Task 1.4).
- **Design-text erratum, for the coordinator to route**: the catalog row's reason clause is wrong for two of the three `cannot-tell` causes.
  - For the 11.3–11.8 unknown-transform cause, the content WAS retrieved; its transform is the unknown part. The row still prints "`… for version 11.3.0 could not be retrieved`".
  - For an unknown installed version, `<v>` prints as `unknown`.
  - Proposed row: `cannot tell whether <path> was modified — <the package content for version <v> could not be retrieved | version <v>'s copy transform cannot be recovered | the installed version is unknown>. Review before removing.`
  - Until it is routed, the code stays string-equal to the current row.

**Condition 2 — REVIVAL TRIGGER (recorded here, and to be carried into the parent completion doc)**:

> *If any consumer surfaces whose copies date from 11.3–11.8, build option (B) (extract the transform from that version's own `init.ts`).* — Peter's ruling, 2026-09-26.

**The honest cost of (A)**:
- Because the range always reaches back into 11.3–11.8, **a fork whose only edits are in `.ts` files reads `cannot-tell` and stays in `core/`**. `--migrate-components` does not relocate it. Forks with non-`.ts` edits or deleted files are still detected.
- **A pristine 11.3–11.8 copy of a `.ts` file whose source changed before 11.9 reads `cannot-tell` and keeps shadowing that component** until she acts by hand. The remedy line tells her how.
- Unmodified copies from 11.9+ (all of dp-portfolio's recorded baselines, per 5.1) are unaffected.
- Asserted by the tests `a .ts edit: cannot-tell while the unknown-transform window … is in range; modified once it is not` and `the 11.3.0–11.8.x window …`.

### Ada's detection-rule finding — closed where cheap, residual recorded

- **Comment case, CLOSED**: `scanTokenFiles` now searches `stripComments(text)`. The comment stripping mirrors `scripts/floor-closure.ts`'s: block comments, then `//` not preceded by `:`, so `https://` in a string survives. A file that mentions `defineComponentTokens` only in a comment is now an old-name reference map.
- **Aliased-import case, KNOWN RESIDUAL**: `import { defineComponentTokens as dct }` still reads as branded, because the identifier appears in code. A string literal containing the name would too. Task 8's lint counts brands at runtime; the migration deliberately never executes her copied `.ts`, so the text approximation stays.
- **`brandedTokenFiles` could include consumer-authored components — now SCOPED TO COPIES.** Her own branded file was always hers, and the string's "copied … now register as YOUR component tokens" was inaccurate for it. `oldNameReferenceMaps` is NOT scoped, because the lint fires on her files too and Ada's string addresses both owners.
  - **Flag for the coordinator**: that string still opens with "`N copied reference map(s)`", and `Nav-Header-App/tokens.ts` in the (f) fixture is hers, not copied. Ada's own rationale ("whether it's one of ours or one you named yourself") conflicts with the word "copied". This is Ada's string, so I did not edit it.

## Targeted tests + result

- `npx jest src/cli/__tests__/sync.migration.test.ts` → **35/35**. That is Lina's 27 from the handoff, updated, plus 8 more across 5.5 and 5.6:
  - the remedy printed on the offline path;
  - the remedy's content (both paths + the legacy warning);
  - the comment-only mention → old-name;
  - `stripComments` semantics;
  - branded scoped to copies (a yours `nav.tokens.ts` excluded);
  - and 5.6's four (see that doc).
- Criteria sub-items, per test name:
  - (a) `a copy edited BEFORE the first sync → modified`;
  - (b) `copies made at %s` × 5 (11.2.1 pre-104, 12.0.5, 13.0.0, 14.0.0, 14.1.0), plus `each distinguishable version is actually consulted`, `the pre-Spec-104 boundary`, and `the 11.3.0–11.8.x window`;
  - (c) `offline`, `the public rail … → cannot-tell`, and `installed version unknown`;
  - (e) `--migrate-components: …` and `nothing is removed without --migrate-components`;
  - (f) `the forks string, the yours line, and the Lina A5 notes` and `sync.catalog.test.ts` (the forks and cannot-tell rows, string-equal);
  - RETAINED: `U1 RETAINS copied agents, steering and governance — string-equal, and no removal is offered (T-L1)`.
- The two manifest branches: `manifest PRESENT (dp-portfolio …)` and `manifest ABSENT …`.

### Bites recorded red (mutate → run → restore; `cmp` confirmed each restore)

From the handoff, at `e88d1eff`:

| Bite | Result |
|---|---|
| the tarball transform not applied | 9 failed (every post-104 copy) |
| the pre-104 boundary moved (the rewrite applied to identity versions) | 3 failed (`copies made at 11.2.1`, the distinguishable test, the boundary test) |
| an unreadable version list read as an empty, decidable range | `✕ offline…` |
| unmatched files defaulting to `unmodified` | 4 failed |
| a deletion no longer makes a fork | `✕ a file DELETED…` |
| forks removed instead of relocated | `✕ (e)…` |
| the forks string drifting | `✕ migration — modified copies` (catalog) |
| the RETAINED string offering removal | `✕ U1 RETAINS…` |

This session:

| Bite | Result |
|---|---|
| raw-text search, no comment stripping | `✕ a defineComponentTokens mention ONLY in a comment does not read as branded` — 1 failed |
| branded not scoped to copies | `✕ brandedTokenFiles is scoped to COPIES…` — 1 failed |
| the remedy line removed | `✕ offline: the version list cannot be read → every component cannot-tell, with the catalog string` — 1 failed |

**Range bite, honestly scoped**: 12.0.5 and 13.0.0 are byte-identical for the fixture files, so each is distinguishable from the other only as a pair. The distinguishable test asserts the matched version for 11.2.1, 14.0.0 and 14.1.0.

## Application-time adaptations

1. **The tsx load for 11.9.0–12.x** — accepted by the coordinator (see above).
2. **Ruled (A) — the 11.3.0–11.8.x unknown transform**, plus the actionable remedy line and the revival trigger. Peter, 2026-09-26.
3. **The consumer-authored ("yours") classification is new**, and so is its report line (not in the catalog). dp-portfolio's real manifest holds one such component (`Nav-Header-App`, per 5.1).
4. **A fork is "a file every matched version ships that the copy lacks"**, scoped to the versions that explained its other files, so a file added in a later release is not read as her deletion.
5. **The ordering-caution cross-link with 5.6**: while copies remain on disk, the registry-pin offer tells her to migrate first.
6. **`requireTs` picks the loader by environment**: Jest's own require under ts-jest, tsx's scoped require at runtime.

## Addendum (2026-09-26) — the cannot-tell message is three-cause, matching the design erratum

**Trigger**: Thurgood's design.md erratum at `d4ff5eab` (`completion/task-5-erratum-cannot-tell.md`), step 2 of Peter's "fix both, then complete the parent". It makes the row "migration — cannot tell" three-cause, and adds the row "migration — cannot tell (remedy)", transcribed verbatim from `cannotTellRemedyMessage`.

**What changed**:
- `cannotTellMessage(path, cause)` now takes a `CannotTellCause` and is string-equal to the erratum'd row for each cause:
  - `fetch-failed` → `… — the package content for version <v> could not be retrieved. Review before removing.`
  - `transform-unrecoverable` → `… — version <v>'s copy transform cannot be recovered. Review before removing.`
  - `version-unknown` → `… — the installed version is unknown. Review before removing.`
- The assessment records the cause on each `cannot-tell` file (`FileVerdict.cause`). The precedence:
  1. an unknown installed version;
  2. a retrieval failure: the version list could not be read (`<v>` = the installed version), or a tarball fetch failed (`<v>` = the failed versions);
  3. an unrecoverable transform (`<v>` = the 11.3–11.8 versions that left that file undecidable).
- The report prints one line per component when every file shares one cause, and per-file lines otherwise.
- The remedy line is unchanged. It is now pinned by the new catalog row.
- This corrects the inaccuracy recorded above under "Design-text erratum". Before this change, the 11.3–11.8 case printed "`… for version 11.3.0 could not be retrieved`", and an unknown version printed "`version unknown`".

**Tests**:
- `sync.catalog.test.ts` → **11/11**. It covers seven rows (count asserted) and the three cause variants of the cannot-tell row, each string-equal to the row with its reason transcribed verbatim from the erratum's alternation (`CANNOT_TELL_REASONS`, count 3 asserted). It also covers the remedy row, singular (`it`) and plural (`them`).
- `sync.migration.test.ts` now also asserts that each cause is **selected** in context:
  - `transform-unrecoverable` (`11.3.0`) in the window test;
  - `fetch-failed` (`12.0.5, 11.3.0, 11.2.1`) on the public-rail test and (`12.0.5`) offline;
  - `version-unknown` when the installed version is unknown.
- Sync suites: 5 suites, 77/77.

**Bite recorded red**: I gave the `transform-unrecoverable` cause the fetch-failed reason → `✕ migration — cannot tell — cause 2/3: the 11.3–11.8 copy transform cannot be recovered`.
- `Expected: "… — version 11.3.0's copy transform cannot be recovered. Review before removing."`
- `Received: "… — the package content for version 11.3.0 could not be retrieved. Review before removing."`
- Result: 1 failed, 10 passed. Restored; `cmp` confirmed; 11/11.

**Application-time adaptations**: none.
