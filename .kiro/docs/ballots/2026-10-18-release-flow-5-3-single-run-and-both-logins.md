# Ballot Measure: RELEASE-FLOW step 5.3 — run once from one terminal; the preflight checks both logins (RS-32, RS-31)

**Date**: 2026-10-18
**Drafted by**: Thurgood (Civitas steward; owner of the RELEASE-FLOW text)
**Status**: **RATIFIED (Peter, 2026-10-18)**, relayed by the orchestrator. This commit is the record, made before either edit site is applied.
**Ratification**: Peter, 2026-10-18, in chat, answering the two edit sites below quoted to him verbatim with both counter-arguments stated: **"Ratify both"**. Relayed by the orchestrator; committed by Thurgood before any edit site was applied (`.kiro/docs/ballots/README.md` § "The Ratification Protocol").
**Unit**: standalone; edits `.kiro/hooks/RELEASE-FLOW.md` only, so Peter merges it under the governance carve-out. The same branch carries Ada's script change `87d3407f2` (`scripts/release-publish.ts`, standing scope).
**Edit text**: identical to the reverted commit `117254bcc` (`git show 117254bcc` against `1cac2e986` shows the same hunks), so a reviewer can diff the two.

---

## 1. The gap

- **RS-31** (`.kiro/issues/2026-10-18-release-publish-preflight-public-npm-auth.md`): the 5.3 preflight checked GitHub Packages auth only. An expired npmjs login first showed at 5.4, after one registry held the version: 15.1.0 (`docs/releases/15.1.0/publish-verification.txt` L37) and 16.0.0 (about 20 minutes on one registry). Ada's fork (a) is built (`87d3407f2`): the preflight now also runs `npm whoami` against npmjs and refuses before any build.
- **RS-32** (`.kiro/issues/2026-10-18-release-publish-concurrent-runs.md`): on 16.0.0 Peter ran 5.3 from two tabs 4 s apart. The registry refused the second (E409) and a kept orphan tarball with no record remained. Nothing in the script or in 5.3 names a second run. Fork (a), text only, is taken; the lock (b) is held.
- Both owners' leans were adopted by Peter's "proceed as recommended" (2026-10-18, relayed). That relay is not a ratification of text.

## 2. Edit sites (exactly two) — `.kiro/hooks/RELEASE-FLOW.md`

**(a) LAW — a new operator rule.** In § "The sequence" step 5.3, after the line ending "…and it refuses from a worktree." Before: nothing. After, a new sub-bullet:

> - **Run 5.3 ONCE, from ONE terminal, and wait for its tally before touching anything else.** A second concurrent run builds a second tarball that the registry refuses (E409) and leaves an orphan work dir with no record that looks like a candidate; it is not one. The 16.0.0 record (`docs/releases/16.0.0/publish-verification.txt`, § "5.3 — a SECOND run (duplicate)") is the precedent. The script does not yet lock; a lock (`.kiro/issues/2026-10-18-release-publish-concurrent-runs.md` option (b)) is owed at the second duplicate run.

**(b) Descriptive of the changed script, put to the ballot so no CORRECTION-versus-LAW argument remains.** Its referent, `scripts/release-publish.ts`, changes on this same branch, so the edit-kinds test (README § "three kinds") bars CORRECTION. Two hunks:

- Step 5.3, a second new sub-bullet after (a):

> - **The preflight checks both logins**: `npm whoami` runs against GitHub Packages and against public npm (registry named twice, A1) and refuses before any build if either fails (RS-31). It checks the login only: 5.4 runs in Peter's terminal with web 2FA, so it can still fail after a clean 5.3. A pass shrinks that window without closing it.

- The pitfall text, § "Publish mechanics" (item 4 of the pre-sequence list). Before: "…the token expires in about 30 days, so an E404 on publish is a masked auth failure." After:

> …the token expires in about 30 days, so an expired npmjs login now surfaces as the 5.3 preflight refusal (RS-31), with the same remedy (`npm login --auth-type=web --registry https://registry.npmjs.org`); an E404 on a 5.4 publish is still a masked auth failure, after a login that lapsed since 5.3 or a 2FA failure.

## 3. Counter-arguments (one each; no forks)

- **(a)**: it relies on the operator remembering a line, and the incident was the operator running the command twice. What survives: the registry's E409 and the 5.4 sha1 check against the record bound the harm, and the lock (b) is owed at the second duplicate run. The text is the cheap half, not the whole fix.
- **(b)**: a pass at 5.3 can read as a guarantee of 5.4. What survives: the sentence states the 2FA and expiry residual in the same breath, but an operator who skims still sees only "checks both logins".

## 4. Ratification mechanics

Merge = nothing. Ratification is Peter's word on the record, committed first as `Status → RATIFIED` with the quote and date. The two sites are then re-applied as a new commit (cherry-pick of `117254bcc` is acceptable: it is Thurgood's own non-signing commit). The RS-31 and RS-32 records are closed by the PR that carries the ratified text.
