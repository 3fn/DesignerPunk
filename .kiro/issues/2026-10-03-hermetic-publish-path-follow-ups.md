# Issue: hermetic publish path — the follow-ups owed after ratification (rail-script message, charter rows, two RELEASE-FLOW stragglers)

**Date**: 2026-10-03
**Status**: ACTIVE. Item 1 carries a grant, which does nothing until Peter's merge activates it. Item 2 is applied on `chore/charter-hermetic-publish-follow-ups`, with Stacy's re-sign pending. Item 3 is RESOLVED by erratum on #283.
**Owner**: Thurgood. Stacy authors the wording of her own charter row (item 2a).
**Trigger**: **before the next `@3fn/core` publish (15.0.1 or 15.1.0) to either registry.** That release is the first run under ballot `2026-10-03-hermetic-publish-path`, and its arming event per F-4. Its operator must not meet the old "indexing lag" message, and its RELEASE pass must not run under charter rows that predate the two-phase form.
**Source**: `.kiro/docs/ballots/2026-10-03-hermetic-publish-path.md` (RATIFIED Peter 2026-10-03): § 3.8's "Not drafted here" note, § 5 items 6 and 8, and the application PR's straggler sweep (§ 5 item 2).

---

## 1. The rail script's `FAIL[version]` message (§ 3.8, A10; RS-8's residue)

`scripts/verify-publish-rail.sh` L77 says *"If you published in the last few minutes, the registry may not show it yet — wait a minute and re-run."* Its header comment, L45, says the same. That is the teaching that produced 15.0.0's R-4: six 404s were read as indexing lag when the version was not yet published.

**The fix**: point the operator at the packument's `time["<version>"]`, in the same terms as RELEASE-FLOW step 6's ratified sentence (§ 3.8). Then re-record the affected bite.

The register row `publish-rail-guard` is `owner: thurgood`, and the script was built at Spec 123 Task 7. `scripts/**` is outside Thurgood's charter write scope, hence this grant.

**Grant paths**: `scripts/verify-publish-rail.sh`, `scripts/__bites__/bite-2-version-mismatch-exit10.txt`

- **Grantee**: Thurgood, this issue's named owner.
- **Activation**: Peter's merge of the PR whose body names this section, which is the ballot's application PR (`.kiro/issues/README.md` rule 8).
- **Expiry**: the fixing PR's merge.
- **What the paths are for**: the message and the header comment, and the bite file that carries the message text, re-recorded as a red against a non-existent version.
- **Discipline**: no other path. The register row's `checks` text is not edited; it names the bite by exit code, not by message. An out-of-list edit is a claims-pass finding.

## 2. Charter follow-ups (ballot § 5 item 6): a canonical-charter edit plus regeneration, Peter-merged

Spec 122 applies: never hand-edit `.claude/agents/*` or `CLAUDE.md`. No grant is needed or possible; `canonical/agents/**` is a governance-law path.

- **2a. Stacy's RELEASE row** (`canonical/agents/stacy.md` L393). Her wording is ratified with the ballot: § 10 [STACY R1] item (7) gives an event cell, an appended scope sentence, and the F-2 clause. F-2 was ruled **permitted**, so the clause applies. Her consumer overlay row (`stacy.overlay.md` L73) stays unchanged.
  - **Signing cost**: the row sits in the Stacy-signed rendered unit `#the-trigger-set-the-114-superset-table-names-never-numbers`. That costs one Stacy re-sign, which enters Peter's Stacy-signed sample frame, and one operative-set confirmation.
- **2b. Thurgood's LIVENESS read 2** (`canonical/agents/thurgood.md` L448). The ballot ratified **intent, not verbatim text**. These are events without a complete record:
  - a RELEASE record with phase 1 only, still reading `publish-rail liveness: owed`;
  - since F-2 is permitted, a phase 2 drafted against an open PR that has no merge-confirmation line.

  The exact sentence is drafted in the charter PR. **Vehicle for its authority is Peter's**: his carve-out merge of that PR, or a one-line record ballot. Check at that PR whether the row is rendered into the consumer profile; if so, the signing chain applies.

**2026-10-03, 2a and 2b APPLIED on `chore/charter-hermetic-publish-follow-ups`; re-sign owed to Stacy (a seat follows on the same branch).**

**What was applied:**
- **2a**: `canonical/agents/stacy.md`, the RELEASE row, in her R1 item (7) wording, verbatim. The F-2 clause is included. There is one stated adaptation: the period after "arming line", because the existing scope text had no terminal punctuation for her appended sentence to follow.
- **2b**: `canonical/agents/thurgood.md`, LIVENESS read 2. One sentence was appended after the existing parenthetical, kept to the ratified intent. **Authority**: Peter's carve-out merge of that PR, which is also stated in the PR body.

**Regeneration consequences, authored by Thurgood as profile author (C1: `PROFILE_AUTHOR = thurgood`):**
- **Overlay pins re-authored, text unchanged**:
  - `thurgood.overlay.md` `#trigger-types` → `sha256:50cfe904…`;
  - `stacy.overlay.md` `#the-trigger-set-…` → `sha256:eb7326f4…`.
- **Consumer text unchanged by design.** It matches Stacy's stated intent, and a consumer has no step-6 record.
- **Removals added (clause (iii), `subtraction-3`)** for the new canonical texts the consumer rendering drops:
  - one on `thurgood.dispositions.yaml` `#trigger-types`;
  - two on `stacy.dispositions.yaml` `#the-trigger-set-…`.
- **The semguard fixture's RELEASE row** was re-copied byte-for-byte. The fixture README notes the blob, following the 2026-09-29 precedent.

**Stale at this branch** (diff-guard's freshness sweep; 5 findings; all are Stacy's C1 acts):
- **Operative-set re-confirmations**:
  - `canonical/operative-sets/stacy.yaml` `#the-trigger-set-the-114-superset-table-names-never-numbers`: the hash, plus item `trigger-release`, whose text is no longer verbatim. Note: `confirmations/stacy.md` § `#the-trigger-set-…`.
  - `canonical/operative-sets/thurgood.yaml` `#trigger-types`: the hash. Note: `confirmations/thurgood.md` § `#trigger-types`.
- **Re-signs**:
  - `stacy.dispositions.yaml` `#the-trigger-set-…`: evidence at `signatures/stacy.md` § `#the-trigger-set-…`;
  - `thurgood.dispositions.yaml` `#trigger-types`: evidence at `signatures/thurgood.md` § `#trigger-types`.
- **After those**: the diff-guard's full run is expected to go green and to write `canonical/generated.lock`. On `main` @ `54d35a2f` the lock was already input-closure-stale, with outputs unmoved.

## 3. Two RELEASE-FLOW stragglers the application sweep found (not ratified edit sites; not edited)

- **3a. RELEASE-FLOW § "Deriving the delta" Step 5's retirement note** (L15 area). It reads *"tag + GitHub release are manual: `git tag -a vX.Y.Z && git push origin vX.Y.Z && gh release create …`"*. That teaches tag and GitHub release as one act, which contradicts the new step 7 ("Announce last").
- **3b. RELEASE-FLOW § "What changed and why"** (L218). The table's `prepublishOnly` row shows `build && check:drift && verify:token-index-clean` as the current "After". It is now the folder-publish tripwire.
- ~~**Fix for both**: a one-line annotation each, pointing to the ballot.~~
- ~~**Vehicle: Peter's pick.** Either a small follow-up ballot, or the orchestrator's `chore/` route if he rules errata to ratified text need none (the open question from the two-phase issue).~~

**RESOLVED 2026-10-03 by erratum on #283**, before its merge. Peter ruled, relayed verbatim: *"Erratum, go ahead"*, with no separate ballot.
- **3a** is applied as ballot erratum **E-1** and **3b** as **E-2**, in the ballot's `## Errata` section.
- Both land in **the third commit on `chore/ratify-hermetic-publish-path`**, the one that adds that section. This commit cannot cite its own SHA; the SHA is recorded in the #283 PR thread.
- **The one open question** from the two-phase issue (whether errata to ratified text need a ballot) is now ruled **for this case**: no.

**Item 1 (the rail-script message, under the grant) stays open.**

*Sweep note*: the ballot's straggler pattern `indexed` was too broad. It matched about 40 unrelated "MCP-indexed" hits. Only the rail script's lines (item 1) were relevant.

---

## 4. 2026-10-03: a standards gap in the signing-act ballot; #284 re-cut

**The gap**:
- **Where**: ballot 2026-10-01-signing-act-chain § 2, and `verify-signing-chain` link 1.
- **What**: a seat's correct "hold until X" has no recorded act form.
  - A C16 confirmation has no refuse counterpart.
  - On a signature, a refuse at unchanged hashes turns the later assent into an F5.
  - So the instrument reads a correct hold as an F5 sheet-only edit. Instance: #284, `b87a26ca` and `94ab3909`.
- **Owner**: Thurgood.
- **Trigger**: the next amendment to the signing-act ballot, or the second hold, whichever comes first.
- **Interim rule**: record a hold outside the sheets (the PR thread or the claims-pass record), never as a sheet edit.

**The re-cut**: #284 is closed and superseded by `chore/charter-hermetic-publish-follow-ups-v2`, cut from `main` @ `54d35a2f`.
- **Cherry-picked**: `e54ad53c`→`59e2b7ff`, `0acbcc5f`→`db3b7454`, `47160df6`→`d10cb6a5` (the `liveness-release-complete` item; cite this SHA), `64d01080`→`d6dfcf05`.
- **Redone fresh by a Stacy seat**: the four signing acts.
- **Record**: the holds stay on record at `refs/pull/284/head`.
