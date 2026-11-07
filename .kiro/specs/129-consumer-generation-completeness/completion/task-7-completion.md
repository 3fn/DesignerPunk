# Task 7 Completion: Limitation markers in the Integration Guide's install region (U2)

**Date**: 2026-11-07
**Spec**: 129 - Consumer-Generation Completeness
**Task**: 7. Limitation markers in the Integration Guide's install region (U2) · subtask 7.1
**Type**: Parent · **Validation**: Tier 3 - Comprehensive
**Agent**: Thurgood (Sonnet), PRIMARY · Ada, Lina, Kenya and Data consulted on which sentences each row fixes · **Status**: Complete on the unit branch `task/129-comparator-guard-markers`, which is U2's PR; accepted at U2's merge, not before.
**Delegated-tier**: plan held
**CI-provenance**: PR gate #708 @ 96be4806e289b409bf1bbee8f0ae1767551a0be3 (merge ref) — https://github.com/3fn/DesignerPunk/pull/708/checks?sha=96be4806e289b409bf1bbee8f0ae1767551a0be3
**Instruments**: 9 listed — exists 8 · built-here 1 · missing 0 · unlisted 2 — .kiro/specs/129-consumer-generation-completeness/completion/task-7-instruments.md

---

## Success criteria

| Criterion (verbatim) | Status | Evidence |
|---|---|---|
| Each limitation sentence in `governance/DesignerPunk-Integration-Guide.md`'s install region that a 129 row fixes carries `<!-- limitation: .kiro/issues/<file>.md -->` naming that row's record, and the completion doc lists every marked sentence with its record (which sentences a row fixes is a reading). | ✅ | The 17 markers on 16 sentences are listed below, each with its record. `governance/DesignerPunk-Integration-Guide.md`; `npx jest --config scripts/jest.config.js scripts/__tests__/install-doc.test.ts › the guide in this repository has no marked record that is archived or missing while its sentence remains` → passed. Which sentences each row fixes: `.kiro/specs/129-consumer-generation-completeness/feedback/tasks.md` § "Unit 2, Task 7.1" (`[ADA U2 R1]`, `[LINA U2 R1]`, `[KENYA U2 R1]`, `[DATA U2 R1]`, `[THURGOOD U2 R2]`) |
| `scripts/__tests__/install-doc.test.ts` fails when a marked record is under `archive/` or missing while its sentence remains, shown by a fixture case red once. | ✅ | `scripts/__tests__/install-doc.test.ts › limitation markers: a marked record that is archived or missing while its sentence remains fails (Spec 129 Req 15.2) › FAILS when the marked record is under archive/ and its sentence remains` and `› FAILS when the marked record is missing and its sentence remains`, on a fixture issues tree. Red once on the real guide: with `.kiro/issues/2026-08-13-component-token-platform-references-noncompiling.md` temporarily moved to `archive/`, the case `the guide in this repository has no marked record …` failed with `region line 148: … is under archive/ and its sentence remains` (restored; `task-7-1-completion.md` § 2) |
| `docs/consumer/INSTALL.md` is re-derived by `scripts/derive-install-doc.ts` and `install-doc.test.ts` passes. | ✅ | `npx tsx scripts/derive-install-doc.ts` → `wrote docs/consumer/INSTALL.md from governance/DesignerPunk-Integration-Guide.md`; `npx jest --config scripts/jest.config.js scripts/__tests__/install-doc.test.ts` → 81 passed, including `docs/consumer/INSTALL.md equals deriveInstallDoc(<guide>), byte for byte (region identity)` and `docs/consumer/INSTALL.md carries no limitation marker` |
| All four harness contexts ran on this unit's PR, and this parent's completion doc carries each one's run URL and pasted summary line at head H, the last head whose `git diff --name-only H M` to the merged head M touches only `completion/**`, `docs/specs/**` and the PR's records (Conventions). | ✅ | All four contexts ran on U2's PR #708 at head H = `96be4806e289b409bf1bbee8f0ae1767551a0be3` (the run is https://github.com/3fn/DesignerPunk/actions/runs/42339305095; H is the PR head those runs and the required checks ran for; the commit that adds this row touches only `completion/**`), each concluded success, each wrote its `harness-verdict` annotation `PASS`. Comparator summary lines, pasted: `harness-ios-tokens · expected=208 · observed=208 · new=0 · stale=0 · count-changed=0 · additions=(a) 0, (b) 0, (c) 0 · retags=0 · files=gen 3/3 (compiled/floor) · remaining=19 entries · a pass means the failures match the list, not that it compiles`; `harness-ios-components · expected=172 · observed=172 · new=0 · stale=0 · count-changed=0 · additions=(a) 0, (b) 0, (c) 0 · retags=0 · files=gen 3/3, pkg 41/41 (compiled/floor) · remaining=115 entries · cross-tier=0 · a pass means the failures match the list, not that it compiles`; `harness-android-tokens · expected=291 · observed=291 · new=0 · stale=0 · count-changed=0 · additions=(a) 0, (b) 0, (c) 0 · retags=0 · files=gen 3/3 (compiled/floor) · remaining=25 entries · a pass means the failures match the list, not that it compiles`; `harness-android-components · expected=436 · observed=436 · new=0 · stale=0 · count-changed=0 · additions=(a) 0, (b) 0, (c) 0 · retags=0 · files=gen 3/3, pkg 41/41 (compiled/floor) · remaining=213 entries · cross-tier=0 · a pass means the failures match the list, not that it compiles`. Jobs: https://github.com/3fn/DesignerPunk/actions/runs/42339305095/job/128303498918 (ios-tokens), …/job/128303498948 (ios-components), …/job/128303498929 (android-tokens), …/job/128303498997 (android-components). SHAs at H: the four lists `harness/expected/*.tsv` and `harness/pins.yaml` were last changed by `74d7566f5`; blobs `25b84b686` (ios-tokens), `e819005c9` (ios-components), `b774953ea` (android-tokens), `6c19978df` (android-components), `fd064c0e9` (pins). A PASS means the failures match the list, not that the code compiles |

Unmet or partially met criteria: None

## Every marked sentence, with its record

Lines are the Guide's, at this commit. "Goes false at" is the unit whose merge makes the sentence false, from `[ADA U2 R1]` (Tasks 8, 9, 10, 11 and 14 are U3, U4, U5, U6 and U9).

| Line | Sentence (opening words) | Record (design-outline § 3 row) | Goes false at |
|---|---|---|---|
| L23 | "On web, a custom theme you register in `designerpunk.config.ts` does not change your generated output yet; …" | `.kiro/issues/2026-10-15-123-palette-read-from-package.md` (19) | U9, Task 14 |
| L91 | "`generate` takes the following from the installed package, so editing them in your copy does not change your output yet: …" | `.kiro/issues/2026-10-15-123-palette-read-from-package.md` (19) | U9, Task 14 |
| L94 | "One of its four checks, mathematical relationships, currently fails even on unmodified token source, …" | `.kiro/issues/2026-06-24-mathematical-relationship-parser-validation-gaps.md` (1) | U5, Task 10 |
| L98 | "`DesignTokens.ios.swift` — Swift constants (no theme surface yet; …)" | `.kiro/issues/2026-06-28-spec-094-platform-theme-emission-unwired.md` (2) | U6, Task 11 |
| L99 | "`DesignTokens.android.kt` — Kotlin constants (no theme surface yet; …)" | `.kiro/issues/2026-06-28-spec-094-platform-theme-emission-unwired.md` (2) | U6, Task 11 |
| L111 | "The exceptions above still apply: the colour palette, the dark and WCAG override maps, …" | `.kiro/issues/2026-10-15-123-palette-read-from-package.md` (19) | U9, Task 14 |
| L158 | "A theme you register in `designerpunk.config.ts` does not yet produce a `[data-theme=\"<name>\"]` block in any generated CSS. A custom `data-theme` value resolves against nothing yet." | `.kiro/issues/2026-10-15-123-palette-read-from-package.md` (19) | U9, Task 14 |
| L164 | "The shipped SwiftUI components are reference source, not a build input: they read a theme surface … and the package has no Swift package manifest." | `.kiro/issues/2026-06-28-spec-094-platform-theme-emission-unwired.md` (2) | U6, Task 11 |
| L168 | "`DesignTokens.ios.swift` also calls a `Color.oklch(...)` initializer … that no shipped file defines …" | `.kiro/issues/2026-10-03-native-generator-findings-for-spec-129-intake.md` (4) | U3, Task 8 (lag to U6, below) |
| L169 | "Product tokens that reference a theme-varying token are emitted into `ProductTokens.ios.swift` as an extension on `<YourName>Theme`; …" | `.kiro/issues/2026-10-03-native-generator-findings-for-spec-129-intake.md` (4) | U6, Task 11 |
| L170 | "`ComponentTokens.ios.swift` … refers to `SizingTokens`, `SpacingTokens` and `BorderWidthTokens`, which no shipped file defines." | `.kiro/issues/2026-08-13-component-token-platform-references-noncompiling.md` (3) | U4, Task 9 |
| L171 | "Native token output omits the **14 theme-varying semantic colours**, …" | `.kiro/issues/2026-06-28-spec-094-platform-theme-emission-unwired.md` (2) | U6, Task 11 |
| L177 | "The Compose components … read their theme from `LocalDPTheme`, which nothing in this package defines and `generate` does not emit today, and there is no Gradle module." | `.kiro/issues/2026-06-28-spec-094-platform-theme-emission-unwired.md` (2) | U6, Task 11 |
| L182 | "Native token output omits the same **14 theme-varying semantic colours**, … Only `_wcag` variants of some of them are emitted." | `.kiro/issues/2026-06-28-spec-094-platform-theme-emission-unwired.md` (2) | U6, Task 11 |
| L183 | "Product tokens that reference a theme-varying token are emitted as a read of `Local<your abbreviation>Theme`, which nothing defines." | `.kiro/issues/2026-10-03-native-generator-findings-for-spec-129-intake.md` (4) | U6, Task 11 |
| L185 (first) | "…the generated Kotlin calls `Oklch(…).toComposeColor()`, which needs the colormath library (github.com/ajalt/colormath), so you add that dependency yourself." | `.kiro/issues/2026-10-03-native-generator-findings-for-spec-129-intake.md` (4) | U3, Task 8 (lag to U6, below) |
| L185 (second) | "The generated file imports nothing, so you add the imports yourself." | `.kiro/issues/2026-10-20-kotlin-output-no-import-block.md` (6) | U4, Task 9 |

Markers per record: row 1: 1 · row 2: 6 · row 3: 1 · row 4: 4 · row 6: 1 · row 19: 4. Total 17.

**Lag entries** (the test is silent for these until the record archives; `feedback/tasks.md` `[THURGOOD U2 R2]`): L168 and L185 (first) go false at U3 and their record, row 4, archives at U6. The cover is the Conventions' batching rule and Stacy's RELEASE read; my pass at each release's S reads these two against the merged units.

**Not marked, with the reason** (`evidence/2026-11-07-u2-marker-candidates.md`): L23's first clause and the "no Swift package manifest" and "no Gradle module" clauses (Spec 132); the "does not parse" clause (already false; Lina's rewrite is spliced at L164 and L173, kind CORRECTION); L192 and the "No … build was run" statements (already false; Task 18.3, with Kenya's and Data's wording on the record); L195 (owned by Req 15.5 and Task 18.3, no record filed).

## Additional verification

Primary Artifacts: all shipped as declared

(`governance/DesignerPunk-Integration-Guide.md`, `scripts/__tests__/install-doc.test.ts`, `scripts/derive-install-doc.ts` and `docs/consumer/INSTALL.md` all changed. Also on the branch, outside the list: the owners' entries and my disposition in `feedback/tasks.md`, and the candidate list under `evidence/`, which are the record 7.1's consult needed.)

## Validation

- `npm test` (the parent tier) → 417 suites, 9881 tests passed, exit 0. Local.
- `npm run test:scripts` → 32 suites, 1349 tests passed; `npx tsc -p tsconfig.scripts.json --noEmit` → no errors. Local.
- `cd mcp-server && npx jest` → 48 suites, 765 passed (the docs MCP reads the Guide); `npx tsx scripts/check-section-citations.ts` → PASS. Local.
- `npx tsx scripts/check-completion-criteria-parity.ts` → `SUMMARY: parents evaluated 41, pass 41, exempt 0, fail 0; emissions 0; reds 0`.
- The run results above are local, except those criterion 4 cites, which are the PR's runs named on the `**CI-provenance**:` line (all 26 contexts on the PR, including `lane-functional-root`, concluded success at H).
- Not run: `test:consumer`, `application-mcp-server`.

## Records this unit's diff fires

Matched against `git diff --name-only refs/remotes/origin/main` (the registry, the Guide, `INSTALL.md`, the deriver and its test, and the spec's own files), the root records' `path:` Triggers name one: `.kiro/issues/2026-10-20-in-lane-registry-arming-reads.md` (`path:.github/in-lane-guards.json`, owner Stacy), whose owed act is her ARMING read at U2's merge. No other record's Trigger matches. The PR body names the list.

**The consequence the test adds, for the units that archive these records**: U4, U5, U6 and U9 each archive a marked record, so each of their PRs carries the rewrite of the sentences it falsifies and an INSTALL re-derive, or install-doc.test.ts fails there (`feedback/tasks.md` `[THURGOOD U2 R2]`, counter-argument 4). Their criteria do not say so yet.
