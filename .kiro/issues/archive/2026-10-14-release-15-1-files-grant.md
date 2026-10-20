# Grant: write scope for the 15.1.0 release PR's version, notes, CHANGELOG, README, generated CSS header, token-index and the CHANGELOG-title test string

**Date**: 2026-10-14
**Status**: ACTIVE (a grant; it does nothing until Peter's merge activates it)
**Owner**: Ada (the 15.1.0 release's packaging seat), as for 15.0.0 (`archive/2026-10-02-release-15-files-grant.md`, the precedent this file mirrors). One path has a second seat: Thurgood reads the `install-doc.test.ts` string change (his file, Task 19; Lina's 22.4 block).
**Trigger**: **the 15.1.0 release PR** (RELEASE-FLOW § "The sequence", step 3; branch `chore/release-v15.1.0`). Activated by Peter's merge of the PR whose body names this file and lists the paths below (`.kiro/issues/README.md` rule 8). Expires as stated under "Duration".
**Source**: Peter's go for release-3 prep (2026-10-14, after the release-3 fix arc #335/#336/#338/#339/#337 merged; rulings record `.kiro/specs/123-consumer-distribution/completion/release-3-rulings-2026-10-13.md`); Ada's release-prep report (blocker 3: no grant exists for 15.1.0); ballot `2026-09-27-ci-regime-standing-scope` § 3.

---

**Grant paths**: `package.json`, `package-lock.json`, `CHANGELOG.md`, `README.md`, `docs/releases/release-15.1.0.md`, `docs/releases/15.1.0/**`, `docs/tokens.css`, `token-index/**`, `scripts/__tests__/install-doc.test.ts`

## What each path is for

- **`package.json`, `package-lock.json`**: the version bump to 15.1.0 (version fields only; sub-packages stay `0.1.0` as in #271).
- **`CHANGELOG.md`**: `## [Unreleased] — planned Release 3 (…)` becomes `## [15.1.0] — 2026-10-14 — Release 3 (…)`; the per-PR entries are kept; lines the merged PRs did not write are added (the native scope line, the MCP search fixes, the audience banners, `sync --migrate-legacy`'s note creation, an "Upgrading from 15.0.0" section); Known limitations lists what is still true.
- **`README.md`**: the version badge and its notes link. (The test-count lines are stale; changing them is optional and Peter's call.)
- **`docs/releases/release-15.1.0.md`**: the hand-authored release notes.
- **`docs/tokens.css`**: its header now names the package version (#339), so it changes once per bump — #339's body says the release PR carries that change.
- **`token-index/**`**: the regenerated index from `npm run build` on the release branch (RELEASE-FLOW step 2), if it moves.
- **`scripts/__tests__/install-doc.test.ts`**: ONLY the two hard-coded CHANGELOG-title strings (L47–48, L400–401 at `5ac23b74c`: `## [Unreleased] — planned Release 3`), which the retitle breaks. Thurgood reads the hunk. No other change to the file.
- **`docs/releases/15.1.0/**`**: the publish-rail record, `docs/releases/15.1.0/publish-verification.txt` (RELEASE-FLOW step 6).

## Fixing PRs and duration

- **The fixing PR is the 15.1.0 release PR** for every path except `docs/releases/15.1.0/**`; the grant over those paths **expires at the release PR's merge**.
- **`docs/releases/15.1.0/**` is written by RELEASE-FLOW step 6's post-publish release-record PR**, a second PR that cannot exist before the publish; the grant over that path expires at that PR's merge (the two-PR extent 15.0.0's grant stated, and #273 admitted).
- Both PRs cite this file and their path list. **An edit outside the list is a claims-pass finding.**

## What this grant does not cover

- **`canonical/generated.lock`**: the version bump moves the lock's `inputClosure` (`package.json` is in `INPUT_CLOSURE_FILES`); the refresh is **Thurgood's separate grant** (`2026-10-14-release-15-1-lock-refresh-grant.md`), written only by a green `check:122:diff-guard` run.
- **`governance/**`, `.kiro/steering/**`, `.kiro/docs/ballots/**`, agent charters**: never granted by an issue (rule 8; ballot § 3 clause 5). 15.1.0 needs no governance edit — the release-3 guide corrections landed in #337.
- **No ratification authority.** Additive to charter scope and nothing else.

---

## 2026-10-14 — Re-activation: a grant for the 15.1.0 record erratum (RL-8, RL-9)

**Why**: the `docs/releases/15.1.0/**` extent expired at #351's merge. Stacy's RELEASE pass, phase 2 (PR #353), found two defects in the orchestrator's record-keeping: **RL-8** — the 6a section of `docs/releases/15.1.0/publish-verification.txt` omits the 02:42:13Z pre-publish rail run (`FAIL[version] … HTTP 404`, exit 10 — correct at the time: the packument carried no `time["15.1.0"]` until 02:44:42Z) and one of the two `npm pack`-wrote-no-file runs, and says "no guard retry"; **RL-9** — #351 also edited `.kiro/issues/2026-10-02-one-hop-upgrade-rehearsal-tracked-residuals.md`, which was outside this grant's path list (the grant's own clause makes that a claims-pass finding; the orchestrator accepts it; RS-18 asks whether a grant implicitly covers the issue files it serves).
- **Source**: `.kiro/specs/123-consumer-distribution/completion/claims-pass-release-15.1.0.md` § Phase 2, RL-8 and RL-9.
- **Grantee**: the orchestrator (the record's operator).
- **Activation**: Peter's merge of the PR whose body names this section (README rule 8) — the 15.1.0 follow-up records PR.
- **Expiry**: the erratum PR's merge.
- **This section grants; it corrects nothing.** The erratum is made in a later PR, after this grant merges (the 15.0.0 precedent, #280).

**Grant paths**: `docs/releases/15.1.0/publish-verification.txt`

**What the erratum is**: a dated `## Erratum (RL-8, RL-9)` section appended to the `.txt`: (i) the omitted 02:42:13Z rail run pasted in full with its exit code 10, and the two `npm pack` no-file runs named with their times; the "no guard retry" sentence corrected to "one pre-publish run, read against the packument, then one run after `time["15.1.0"]` appeared"; (ii) a line acknowledging RL-9 by name. 5.3's command line is also recorded there: `npx tsx scripts/release-publish.ts 15.1.0 --expect-sha e49359e49dc338078669a90aa5b37aa2436b60a4` (Ada's RL-7 evidence gap).

**Outcome (2026-10-20)**: archived by the steward at the 2026-10-20 walk, Peter's go; ground: grant consumed — #346 (`e49359e49`), #351 (`6efa34984`) and the re-activation's erratum PR #356 (`68cdbeea8`); rule 5, a grant archives at its fixing PR's merge. Rule 4: not a ruling on the merits. Ledger: `archive/TRIAGE-2026-10-20.md`. — Thurgood
