# Grant: write scope for the 16.0.0 release PR's version, notes, CHANGELOG, README, generated CSS header, token-index and the CHANGELOG-title test string

**Date**: 2026-10-16
**Status**: ACTIVE (a grant; it does nothing until Peter's merge activates it)
**Owner**: Ada (the 16.0.0 release's packaging seat), as for 15.1.0 (`2026-10-14-release-15-1-files-grant.md`, the precedent this file mirrors). One path has a second seat: Thurgood reads the `install-doc.test.ts` string change (his file, Task 19; Lina's 22.4 block).
**Trigger**: **the 16.0.0 release PR** (RELEASE-FLOW § "The sequence", step 3; branch `chore/release-v16.0.0`). Activated by Peter's merge of the PR whose body names this file and lists the paths below (`.kiro/issues/README.md` rule 8). Expires as stated under "Duration".
**Source**: Peter's go for release-3 prep (2026-10-16, after the release-3 fix arc #335/#336/#338/#339/#337 merged; rulings record `.kiro/specs/123-consumer-distribution/completion/release-3-rulings-2026-10-13.md`); Ada's release-prep report (blocker 3: no grant exists for 16.0.0); ballot `2026-09-27-ci-regime-standing-scope` § 3.

---

**Grant paths**: `package.json`, `package-lock.json`, `CHANGELOG.md`, `README.md`, `docs/releases/release-16.0.0.md`, `docs/releases/16.0.0/**`, `docs/tokens.css`, `token-index/**`, `scripts/__tests__/install-doc.test.ts`

## What each path is for

- **`package.json`, `package-lock.json`**: the version bump to 16.0.0 (version fields only; sub-packages stay `0.1.0` as in #271).
- **`CHANGELOG.md`**: `## [Unreleased] — planned Release 3 (…)` becomes `## [16.0.0] — 2026-10-16 — Release 3 (…)`; the per-PR entries are kept; lines the merged PRs did not write are added (the native scope line, the MCP search fixes, the audience banners, `sync --migrate-legacy`'s note creation, an "Upgrading from 15.1.0" section); Known limitations lists what is still true.
- **`README.md`**: the version badge and its notes link. (The test-count lines are stale; changing them is optional and Peter's call.)
- **`docs/releases/release-16.0.0.md`**: the hand-authored release notes.
- **`docs/tokens.css`**: its header now names the package version (#339), so it changes once per bump — #339's body says the release PR carries that change.
- **`token-index/**`**: the regenerated index from `npm run build` on the release branch (RELEASE-FLOW step 2), if it moves.
- **`scripts/__tests__/install-doc.test.ts`**: ONLY the two hard-coded CHANGELOG-title strings (L47–48, L400–401 at `5ac23b74c`: `## [Unreleased] — planned Release 3`), which the retitle breaks. Thurgood reads the hunk. No other change to the file.
- **`docs/releases/16.0.0/**`**: the publish-rail record, `docs/releases/16.0.0/publish-verification.txt` (RELEASE-FLOW step 6).

## Fixing PRs and duration

- **The fixing PR is the 16.0.0 release PR** for every path except `docs/releases/16.0.0/**`; the grant over those paths **expires at the release PR's merge**.
- **`docs/releases/16.0.0/**` is written by RELEASE-FLOW step 6's post-publish release-record PR**, a second PR that cannot exist before the publish; the grant over that path expires at that PR's merge (the two-PR extent 15.1.0's grant stated, and #273 admitted).
- Both PRs cite this file and their path list. **An edit outside the list is a claims-pass finding.**

## What this grant does not cover

- **`canonical/generated.lock`**: the version bump moves the lock's `inputClosure` (`package.json` is in `INPUT_CLOSURE_FILES`); the refresh is **Thurgood's separate grant** (`2026-10-16-release-16-0-lock-refresh-grant.md`), written only by a green `check:122:diff-guard` run.
- **`governance/**`, `.kiro/steering/**`, `.kiro/docs/ballots/**`, agent charters**: never granted by an issue (rule 8; ballot § 3 clause 5). 16.0.0 needs no governance edit — the release-3 guide corrections landed in #337.
- **No ratification authority.** Additive to charter scope and nothing else.


---

## 2026-10-16 — Re-activation: a grant for the RL-11/RL-12/RL-13 pre-tag fix

**Why**: the `CHANGELOG.md` and `docs/releases/release-16.0.0.md` extent expired at the release PR's merge (#381, `4b940c45d`). Stacy's RELEASE claims pass, phase 1 (#382), then found three defects in those two files: **RL-11**, "header-only" (CHANGELOG L51, notes L19 and L85) is false where its reader meets it, because `DesignTokens.dtcg.json` also carries #368's `deprecatedReason` string; **RL-12**, the CHANGELOG's write-scope bullet (L31) states as observed what the Kiro runs only support as an inference; **RL-13**, the CHANGELOG's `## [16.0.0]` entry carries no blend-deprecation line, and the post-tag correction has no record. Peter ruled RL-11 fork (a), fix before the tag, on 2026-10-16.
- **Source**: `.kiro/specs/123-consumer-distribution/completion/claims-pass-release-16.0.0.md` § Findings, RL-11, RL-12 and RL-13.
- **Grantee**: Ada (the 16.0.0 release's packaging seat).
- **Activation**: Peter's merge of the PR whose body names this section (README rule 8): this fix PR, branch `chore/release-v16.0.0-rl11`.
- **Expiry**: that same merge.
- **This deviates from the 15.1 precedent** ("this section grants; it corrects nothing; the erratum is a later PR"). Here the grant and the correction ride ONE PR, on Peter's explicit direction (2026-10-16: "Ada authors the fix PR with the grant re-activation inside it"), so the grant is active at the moment the diff is judged against it. Because `CHANGELOG.md` is packed, the merge is the new release commit (S1), and step 5.1 and a dated phase-1 addendum re-run on it.

**Grant paths**: `CHANGELOG.md`, `docs/releases/release-16.0.0.md`

**What the fix is** (in the `## [16.0.0]` entry and the notes only):
- **RL-11**: Upgrading step 5 (CHANGELOG and notes) and notes L19 say the generated-output change is the version in each file plus, in `DesignTokens.dtcg.json`, the one `deprecatedReason` string; "no token value changed" is kept.
- **RL-12**: the CHANGELOG write-scope parenthetical states what was observed (Sparky refused to create `src/hello.ts`, with and without an in-session yes) and marks the screen-code refusal as the consequence.
- **RL-13**: one CHANGELOG Known-limitations line for the blend deprecation, and the notes' blend line extended to the token's own `description` and the wrappers' messages; both name the new record `.kiro/issues/2026-10-16-blend-deprecation-next-major-doc-correction.md`.
