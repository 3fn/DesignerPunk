# Grant: write scope for the 16.2.0 release PR's version, notes, CHANGELOG, README, generated CSS header, token-index and generated lock

**Date**: 2026-11-02
**Owner**: Thurgood (the 16.2.0 release author, RELEASE-FLOW § "Deriving the delta" and § "The sequence"). The 16.1.0 grant (`.kiro/issues/archive/2026-10-25-release-16-1-files-grant.md`) is the precedent, path for path.
**Trigger**: `release:16.2.0:phase-1` — the event that owes the close is the 16.2.0 release PR (branch `release/16.2.0`, RELEASE-FLOW step 3), and for `docs/releases/16.2.0/**` the step-6 release-record PR. Activated by Peter's merge of the record-only PR that adds this file, whose body names this record and lists the paths below (`.kiro/issues/README.md` rule 8); it expires as stated under "Duration".
**Class**: P3 improvement · grant *(set 2026-11-02, Thurgood, owner, rule 12, on the 16.1.0 precedent.)*
**Source**: the release-PR brief relayed by the orchestrator on 2026-11-02, after F = `7db066e4f3be08fe6954ff8b00557f71cddc86ad` (#619's squash). The bump is Peter's R8 item 1 ("Re: 1, 16.2.0"), cited `R8@0184efb3fd7b2956677351fdf84899767a5ac74a`. **No committed record of Peter's go for the release PR itself was read here; the activating PR is Peter's to merge or not.**
**Consulted**: none needed — the grantee's own filing, on the same path list as 16.1.0.

---

**Grant paths**: `package.json`, `package-lock.json`, `CHANGELOG.md`, `README.md`, `docs/releases/release-16.2.0.md`, `docs/releases/16.2.0/**`, `docs/tokens.css`, `token-index/**`, `canonical/generated.lock`

## What each path is for

- **`package.json`, `package-lock.json`**: the version bump to 16.2.0, the version fields only. The sub-packages stay `0.1.0`. `scripts/release-publish.ts` refuses a tag whose `package.json` does not carry the version.
- **`CHANGELOG.md`**: the `## [16.2.0]` entry with no date in its heading (RELEASE-FLOW step 2, RS-34). There is no `## [Unreleased]` section to retitle, so the entry is written whole, from the walk record's "CHANGELOG lines owed".
- **`README.md`**: the version badge and its notes link only.
- **`docs/releases/release-16.2.0.md`**: the hand-authored release notes (recipe step 4(a)).
- **`docs/tokens.css`**: its header names the package version, so it changes once per bump. It is written by `npm run build`.
- **`token-index/**`**: the regenerated index from `npm run build`, if it moves (RELEASE-FLOW step 2).
- **`canonical/generated.lock`**: the version bump edits `package.json`, which is in the lock's input closure, so `inputClosure` moves. It is written only by a green `npm run check:122:diff-guard`, never by hand. `outputs` is expected not to move; if it moves, the author stops and reports. No commit in the release PR moves a `canonicalHash`.
- **`docs/releases/16.2.0/**`**: the publish-rail record, `docs/releases/16.2.0/publish-verification.txt` (RELEASE-FLOW step 6), phase 1 of it at S and phase 2 after step 6.

## Duration

- **The fixing PR is the 16.2.0 release PR** for every path except `docs/releases/16.2.0/**`. The grant over those paths expires at the release PR's merge.
- **`docs/releases/16.2.0/**`** is written by step 6's post-publish release-record PR, a second PR that cannot exist before the publish. The grant over that path expires at that PR's merge.
- Both PRs cite this file and its path list. Each PR's `git diff --name-only` is a subset of the list as it stood at the activating merge, apart from `.kiro/issues/**` (standing scope). **An edit outside the list is a claims-pass finding.**

## What this grant does not cover

- `governance/**`, `.kiro/steering/**`, `.kiro/hooks/RELEASE-FLOW.md`, `.kiro/docs/ballots/**` and agent charters. An issue grant never covers them (rule 8).
- `scripts/__tests__/install-doc.test.ts` and any other test pinning a CHANGELOG or version string. If one breaks, the author stops and reports, and this grant is amended before the string is touched.
- No ratification authority. It adds to charter scope and nothing else.

## Close

The step-6 release-record PR adds rule 5's dated outcome line here, naming both merges, and moves this file to `archive/` in the same PR.

*Signed: Thurgood, 2026-11-02, as owner and grantee.*
