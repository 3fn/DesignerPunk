# Grant: write scope for the 16.1.0 release PR's version, notes, CHANGELOG, README, generated CSS header, token-index and generated lock

**Date**: 2026-10-25
**Owner**: Thurgood (the 16.1.0 release author, RELEASE-FLOW § "Deriving the delta" and § "The sequence"). The 16.0.0 grants (`2026-10-16-release-16-0-files-grant.md` and `2026-10-16-release-16-0-lock-refresh-grant.md`, both archived) are the precedent; this file merges them because one seat now authors both halves.
**Trigger**: `release:16.1.0:phase-1` — the 16.1.0 release PR (branch `release/16.1.0`, RELEASE-FLOW step 3). Activated by Peter's merge of a PR whose body names this file and lists the paths below (`.kiro/issues/README.md` rule 8); expires as stated under "Duration".
**Class**: P3 improvement · grant
**Source**: the orchestrator's brief to the release author, 2026-10-25; Peter's rulings on record at https://github.com/3fn/DesignerPunk/pull/469#issuecomment-6398500848 and in chat ("take 4.6.7 now"; S as soon as the fixes merge). **No committed record of Peter's go for the release PR itself was read here; the activating PR is Peter's to merge or not.**

---

**Grant paths**: `package.json`, `package-lock.json`, `CHANGELOG.md`, `README.md`, `docs/releases/release-16.1.0.md`, `docs/releases/16.1.0/**`, `docs/tokens.css`, `token-index/**`, `canonical/generated.lock`

## What each path is for

- **`package.json`, `package-lock.json`**: the version bump to 16.1.0 (version fields only; sub-packages stay `0.1.0`). `scripts/release-publish.ts` refuses a tag whose `package.json` does not say the version.
- **`CHANGELOG.md`**: `## [Unreleased]` becomes `## [16.1.0] — TBD …` (the date is written at the tag), with the per-PR lines kept and the lines the merged PRs did not write added (recipe step 4(b)).
- **`README.md`**: the version badge and its notes link only.
- **`docs/releases/release-16.1.0.md`**: the hand-authored release notes (recipe step 4(a)).
- **`docs/tokens.css`**: its header names the package version, so it changes once per bump, written by `npm run build`.
- **`token-index/**`**: the regenerated index from `npm run build`, if it moves (RELEASE-FLOW step 2).
- **`canonical/generated.lock`**: the version bump edits `package.json`, which is in the lock's input closure, so `inputClosure` moves. Written only by a green `npm run check:122:diff-guard`, never by hand; `outputs` is expected unmoved, and if it moves the author stops and reports.
- **`docs/releases/16.1.0/**`**: the publish-rail record, `docs/releases/16.1.0/publish-verification.txt` (RELEASE-FLOW step 6).

## Duration

- **The fixing PR is the 16.1.0 release PR** for every path except `docs/releases/16.1.0/**`; the grant over those paths expires at the release PR's merge.
- **`docs/releases/16.1.0/**`** is written by step 6's post-publish release-record PR, a second PR that cannot exist before the publish; the grant over that path expires at that PR's merge.
- Both PRs cite this file and their path list. **An edit outside the list is a claims-pass finding.**

## What this grant does not cover

- `governance/**`, `.kiro/steering/**`, `.kiro/docs/ballots/**` and agent charters: never granted by an issue (rule 8).
- `scripts/__tests__/install-doc.test.ts`: not listed. If the retitle breaks a pinned CHANGELOG-title string there, the author stops and reports; the grant is then amended before the string is touched.
- No ratification authority. Additive to charter scope and nothing else.

**2026-10-26 — CLOSED at the step-6 release-record PR's merge (Thurgood, owner, rule 5).** Activated by #485 (`8191b7489`). Every path but `docs/releases/16.1.0/**` was consumed by #494 (`a95d6bf3d`, merged 2026-10-26T01:13:37Z) and expired there. `docs/releases/16.1.0/**` is consumed by the step-6 release-record PR (branch `chore/release-16.1.0-step-6-record`), whose one act under it is `docs/releases/16.1.0/publish-verification.txt` (commit `76238378b`). The grant expires, and this record closes, at that PR's merge. It is archived in the same PR, as rule 5 asks ("a grant archives at its fixing PR's merge"), so O-31 does not repeat. Rule 4: not a ruling on the merits.
