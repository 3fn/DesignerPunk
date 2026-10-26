# Grant: write scope for 16.1.0's release-notes correction after the tag (L67's post-F list, RL-32 and O-36; the count for F-3's other halves, RL-33; the disclosure of Peter's two later 16.1.0 waivers)

**Date**: 2026-10-26
**Owner**: Thurgood (the 16.1.0 release author)
**Trigger**: `manual` — the event is the merge of the notes-fix PR, branch `release/16.1.0-notes`, which is written only after this record's activating merge; `merge:#<N>` at its open. The grant is activated by Peter's merge of a PR whose body names this file and lists the paths below (`.kiro/issues/README.md` rule 8). It expires at the notes-fix PR's merge. That PR merges before RELEASE-FLOW step 7 (`gh release create v16.1.0 --notes-file docs/releases/release-16.1.0.md`), which reads the notes from `main`.
**Class**: P3 improvement · grant
**Source**: Stacy's RELEASE phase-1 addendum 3 on the final S `4abfbe6de` (#504), in `.kiro/specs/123-consumer-distribution/completion/claims-pass-release-16.1.0.md` on `chore/release-16.1.0-claims-pass-phase-1` (commit `737ff3e4e`, PR #497): findings **RL-32** (notes L67's list of post-F shipped-path PRs omits #504) and **RL-33** (her erratum to addendum 2: the notes carry F-3's count for the token-name half only). Both are Low, both hold step 7 and not the tag, and both route to Thurgood "before step 7". She puts no fork on either.
- **Stacy's addendum 4 on the final S `38f4ece47`** (#505), which adds #505 to RL-32's list: `<addendum 4 commit SHA — filled in when the orchestrator sends it>`.
- **O-36** (the same record, addendum 2): L67 does not name #494. Stacy reads that as the sentence's frame, not a falsity: "If Thurgood wants the list exhaustive, the step-6 record is the place." This grant puts it in the notes instead, because hunk (a) edits that sentence anyway.
- **Widened 2026-10-26, before this record's PR opened, at the orchestrator's direction**: #494 joins hunk (a), and hunk (c) discloses Peter's two later 16.1.0 waivers in the form of L57 ("L57 already discloses a waiver; leaving two later ones out would make the notes incomplete in the same way RL-32 is"). The records that hunks (b) and (c) cite are on `origin/chore/post-16.1.0-record-upkeep` at `6b0d01980`, and are not on `main` at this record's commit.

---

**Grant paths**: `docs/releases/release-16.1.0.md`

## What the path is for

Three hunks only.

- **(a) L67's post-F list (RL-32 with addendum 4, and O-36).**
  - "After F, PRs … #502 and #503 changed shipped paths" gains **#504** and **#505**. Each changed `governance/Component-Development-Guide.md` (a `files[]` path, `governance/`) and `canonical/generated.lock` after F.
  - **#494** is named among them as the release PR it is. Its shipped paths are `package.json`, `CHANGELOG.md` and `README.md` (npm packs all three whatever `files[]` lists); it also changed `package-lock.json`, `docs/tokens.css` and `canonical/generated.lock`, which are not packed (O-36).
  - The record-only parenthesis ("such as the grant records #498 and #501") may gain this grant PR's number. It changes no shipped path.
  - "No trio run saw these changes" gains what these PRs changed: the Component Development Guide's token names in its code examples (Lina's whole-file sweep, #504), its native-theme caveat (Ada's, #504), its Button-CTA CSS example (#505), and the release PR's version bump and CHANGELOG entry (#494). "No trio run saw these changes" stays true.
- **(b) The count for F-3's other halves (RL-33).** One bullet under § "Known limitations (disclosed, tracked)", directly after L59, the token-name count line. L55's "Three additions" becomes "Five additions" (this bullet and hunk (c)'s), so the sentence that introduces the bullets stays true. The bullet carries the counts the ballot measured at `a95d6bf3d` (`.kiro/docs/ballots/2026-10-26-governance-examples-guard.md`, the census line and § 7 `[LINA R1]` items 1–2, Lina's heuristic counts):
  - **declared paths**: 10 of 16 blocks fail. 9 name a file that does not exist or is ambiguous: Component-Development-Guide L576 and L956, Test-Development-Standards L1556, L1583, L1620, L1659 and L1902, and Token-Resolution-Patterns L204 and L247. The tenth, the Integration Guide L699 (`product/tokens/layout.yaml`), is a correct consumer path that takes `<!-- example: consumer -->`;
  - **token-file shape**: 2 fail, Component-Development-Guide L576 and L956, both also among the path failures;
  - **import surface**: 3 of 7 package-importing blocks fail, all real defects: Component-Development-Guide L1108 (`@3fn/core/ThemeAwareBlendUtilities`), Token-Family-Blend L88 (the same subpath) and Token-Family-Layering L76 (`zIndexTokens` from `@3fn/core`).
  - The bullet states what changed between `a95d6bf3d` and S, as L59 does. Of the docs above, only the Component Development Guide changed (#504, #505), and its three instances are still present at S `38f4ece47` (`// ButtonCTA/tokens.ts` L577, `// tokens.ts` L963, the dead subpath L1117; read by the author at S). Every doc named ships: `files[]` lists `governance/`.
  - It names where each is tracked:
    - the CDG three in `.kiro/issues/2026-10-25-cdg-component-token-files-teaches-a-reference-map.md` (L576 in its body; L956 and L1108 in Lina's 2026-10-26 append, which reads them as L955–L958 and L1109);
    - Ada's four in `.kiro/issues/2026-10-25-token-docs-unvetted-name-hits.md` § "Corrections and the vetted list";
    - the Test-Development-Standards five in `.kiro/issues/2026-10-26-tds-workflow-examples-declare-files-that-do-not-exist.md` (Thurgood's rule-10 record, `4a4f4d1c6`).
  - It says, as L59 does, that the guard was ratified in #495 and is not built yet (RELEASE-FLOW step 7, R-3: notes do not state a guard as applied).
  - The fix PR re-reads the counts at S, and asks Lina's read of the bullet for her halves (RL-33's route: "with Lina's count for her halves"). If a count differs at S, the author stops and reports, and the grant is amended before the bullet is written.
- **(c) The disclosure of Peter's two later 16.1.0 waivers.** One bullet under § "Known limitations (disclosed, tracked)", after hunk (b)'s, in the form of L57's RL-22 disclosure: what is false, the finding that found it, Peter's ruling, and where its fix lives.
  - **RL-29's index half**: `token-index/` gives 37 semantic tokens a web name that no packed CSS defines, and gives the motion composites and iOS elevation native names the generated files do not carry. `get_token_details` serves them as the token's names. Stacy's phase-1 addendum 2 found it (RL-29). Peter waived it for 16.1.0: "Fix the guide section now, waive the index with a plan", then "Go with the whole-file sweep and the dated plan". Record: `.kiro/issues/2026-10-26-token-index-platform-names-not-emitted.md` (Ada, P0, plan items 1–5, due before the next release's walk).
  - **RL-31 (ii)**: the Component Development Guide's web icon examples use TypeScript names nothing defines (`iconSize100`, `iconSize075`), import from a path that does not exist, and label the shipped type's own example WRONG. Stacy's phase-1 addendum 3 found it (RL-31). Peter waived it for 16.1.0: "Fix the CSS cycle now, waive the icon example with the plan". Record: `.kiro/issues/2026-10-26-cdg-web-icon-typescript-example-false.md` (Lina, P0, plan items 1–4, due before the next release's walk).
  - Both records give his words with their clock bounds (before 2026-10-26T15:05:45Z and before 16:24:20Z, the orchestrator's clock). The bullet may quote the words alone and point at the records for the bounds. It says both are waived for 16.1.0 only, as L57 does for RL-22.
- **Merge order for the cited records.** Hunks (b) and (c) cite records on `origin/chore/post-16.1.0-record-upkeep` at `6b0d01980`. The notes-fix PR merges after that branch's PR, so every path it cites resolves on `main` when step 7 reads the file. The author checks each cited path with `git ls-files` at the fix PR's base. If one is missing, the author stops and reports.

## What this grant does not cover

- **`CHANGELOG.md`**. The packed CHANGELOG is true at S: L37 reports a heuristic check of token names, and says so, which is RL-33's reading ("CHANGELOG L37 is still true as written"). It is in the package, so any edit would move S.
- **Any other line of the notes**, and `canonical/generated.lock` (the notes are not in the lock's input closure: #499 and #503 changed them, and the lock did not move). If a green `npm run check:122:diff-guard` moves the lock anyway, the author stops and reports.
- **`docs/releases/16.1.0/**`**: the step-6 record, still under `.kiro/issues/2026-10-25-release-16-1-files-grant.md`.
- An edit outside the list is a claims-pass finding.

## Why it merges after the tag, and why S does not move

- `docs/releases/release-16.1.0.md` is not in `files[]`, so the package at S `38f4ece47c425cc83cac6739cae7a1806bfb0818` (#505) does not hold it. This record's PR, the upkeep PR whose records hunks (b) and (c) cite, and the notes-fix PR all merge after the tag, by design. None is an ancestor of S, and none changes what is tagged or published (RELEASE-FLOW step 5: "A later record-only PR never changes what is tagged or published").
- The tagged tree keeps the notes as they stand at S. Step 7 reads the corrected file from `main`.
- **Why a new grant**: the 16.1.0 files grant's `docs/releases/release-16.1.0.md` path expired at the release PR's merge (#494, `a95d6bf3d`). The fix-1 grant expired at #499 and the fix-2 grant at #503; both are closed and archived. The open path of the files grant, `docs/releases/16.1.0/**`, covers none of the three hunks.
- **Precedent** (grant record first, fix PR second): #498 then #499 (fix 1), #501 then #503 (fix 2).

## Authority

- **The notes lines**: Stacy's routes for RL-32 and RL-33 (above), and Peter's F-3 answer in ballot `2026-10-26-governance-examples-guard` (RATIFIED; "as recommended"): "the release notes carry the count". RL-33 reads "the count" as every half of the guard's pending list.
- **Hunk (c)'s form**: L57, which discloses Peter's RL-22 waiver for 16.1.0 ("Peter ruled it floor-class and waived it for 16.1.0"). The two later waivers are disclosed the same way.
- **The PRs the list gains, and the two waivers**: Peter, chat, relayed by the orchestrator, verbatim. Received before 2026-10-26T15:05:45Z (the orchestrator's clock): *"Fix the guide section now, waive the index with a plan"*, then *"Go with the whole-file sweep and the dated plan"* (the RL-29 fork; #504). Received before 2026-10-26T16:24:20Z: *"Fix the CSS cycle now, waive the icon example with the plan"* (the RL-31 fork; #505). These rulings authorize #504, #505 and the waivers; this grant only records them in the notes.
- No ratification authority; additive to charter scope and nothing else.

*Signed: Thurgood, 2026-10-26.*
