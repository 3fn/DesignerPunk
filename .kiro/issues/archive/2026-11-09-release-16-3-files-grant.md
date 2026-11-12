# Grant: write scope for the 16.3.0 release PR's version, notes, CHANGELOG, README, generated CSS header, token-index, the 11.1.0 notes and the generated lock

**Date**: 2026-11-09
**Owner**: Thurgood (the 16.3.0 release author, RELEASE-FLOW § "Deriving the delta" and § "The sequence"). The 16.2.0 grant (`.kiro/issues/archive/2026-11-02-release-16-2-files-grant.md`) is the precedent, path for path, plus one path: the 11.1.0 notes.
**Trigger**: `release:16.3.0:phase-1` — the event that owes the close is the 16.3.0 release PR (RELEASE-FLOW step 3), and for `docs/releases/16.3.0/**` the step-6 release-record PR. Activated by Peter's merge of the record-only PR that adds this file, whose body names this record and lists the paths below (`.kiro/issues/README.md` rule 8).
**Class**: P3 improvement · grant *(set 2026-11-09, Thurgood, owner, rule 12, on the 16.2.0 precedent.)*
**Source**: Peter's ruling of 2026-11-09T03:33:57Z, release 16.3.0 now as a minor (#844), and the release brief relayed by the orchestrator on 2026-11-09.
**Consulted**: none needed — the grantee's own filing, on 16.2.0's path list plus the 11.1.0 notes

---

**Grant paths**: `package.json`, `package-lock.json`, `CHANGELOG.md`, `README.md`, `docs/releases/release-16.3.0.md`, `docs/releases/RELEASE-NOTES-11.1.0.md`, `docs/releases/16.3.0/**`, `docs/tokens.css`, `token-index/**`, `canonical/generated.lock`

## What each path is for

- **`package.json`, `package-lock.json`**: the version bump to 16.3.0, the version fields only.
- **`CHANGELOG.md`**: the `## [Unreleased]` section retitled `## [16.3.0]`, with no date in the heading (RELEASE-FLOW step 2). The native harness line uses the plan's fixed wording: "compile except N pinned errors, listed at <path>; no app linked, no tests run". It never says "compiles" while entries remain.
- **`README.md`**: the version badge and its notes link only.
- **`docs/releases/release-16.3.0.md`**: the hand-authored release notes.
- **`docs/releases/RELEASE-NOTES-11.1.0.md`**: corrected or removed (`.kiro/issues/2026-11-04-release-notes-11-1-0-describes-a-release-that-never-shipped.md`).
- **`docs/tokens.css`**: its header names the package version; written by `npm run build`.
- **`token-index/**`**: the regenerated index from `npm run build`, if it moves.
- **`canonical/generated.lock`**: written only by a green `npm run check:122:diff-guard`. The release PR also carries `governance/` CORRECTIONs, which are input-closure roots. `outputs` is expected not to move; if it moves, the author stops and reports.
- **`docs/releases/16.3.0/**`**: the publish-rail record (RELEASE-FLOW step 6), written by the step-6 release-record PR.

## What this grant does not cover

- **`governance/**`, `.kiro/steering/**`, `.kiro/hooks/RELEASE-FLOW.md`, `.kiro/docs/ballots/**` and agent charters**: an issue grant never covers them (rule 8). The release PR's `governance/` CORRECTIONs are made by each doc's owner, under that owner's `**Edit kind**:` line:
  - the Integration Guide L407 and L584 (the `validate` sentences that 129 U5 made false; owner Ada);
  - `Test-Development-Standards.md` and `MCP-Evolution-Roadmap.md` (owner Thurgood; composed-loop record item 4).
- **`scripts/__tests__/install-doc.test.ts`** and any other test pinning a CHANGELOG or version string. If one breaks, the author stops and reports.

## Duration and close

- **The release PR**: the grant expires at its merge for every path except `docs/releases/16.3.0/**`.
- **`docs/releases/16.3.0/**`**: the grant expires at the step-6 release-record PR's merge. That PR adds rule 5's dated outcome line here, naming both merges, and moves this file to `archive/`.
- **Discipline**: each PR's `git diff --name-only` is a subset of the list as it stood at the activating merge, apart from `.kiro/issues/**` (standing scope) and the named `governance/` CORRECTIONs. An edit outside the list is a claims-pass finding.

*Signed: Thurgood, 2026-11-09, as owner and grantee.*

**Outcome (2026-11-12, Thurgood)**: closed — the grant is spent and expires at this PR's merge (#856, the step-6 release-record PR). I cannot name #856's own squash SHA in a file that merges in #856, so, as the 16.2.0 grant's outcome line did, this line names the PR and says "at its merge"; the SHA is `git log --first-parent --grep '(#856)'` on main. The two merges it names:
- **The release PR, #852**, squash `6f507c039ed4140eee4578aa6b75d713a5d4ad9d` (16.3.0's S), merged 2026-11-10T01:00:01Z. It consumed and expired `package.json`, `package-lock.json`, `CHANGELOG.md`, `README.md`, `docs/releases/release-16.3.0.md`, `docs/releases/RELEASE-NOTES-11.1.0.md`, `docs/tokens.css` and `canonical/generated.lock`. `token-index/**` was granted and not touched. Its diff also changed paths this grant does not list: `floor-closure.json` (its own grant, #853), the named `governance/` CORRECTIONs (Integration Guide, Test-Development-Standards, MCP-Evolution-Roadmap, each under its owner's Edit kind line), and `src/cli/shared/errorCatalog.ts`, `src/cli/__tests__/errorCatalog.test.ts` and `tests/consumer-integration.test.ts`. The last is Stacy's RL-55 (`.kiro/issues/2026-11-10-release-16.3.0-phase-1-findings.md`), dispositioned there; I did not read the errorCatalog pair against a grant and leave it to the claims pass.
- **The step-6 release-record PR, #856**, at its merge. Its one act under the grant is `docs/releases/16.3.0/publish-verification.txt`.

It was activated by #851 (`5d72723ea`). Archived under rule 5 in this PR, as § "Duration and close" says.
