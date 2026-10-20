# release-publish preflight checks only GitHub Packages auth: public-npm login expiry hit 5.4 two releases running (RS-31)

**Date**: 2026-10-18
**Status**: FIXED — closes at this PR's merge; archive at the next walk (rule 5)
**Owner**: Ada (script) · Thurgood (RELEASE-FLOW text)
**Trigger**: `release:next:phase-1` — the fix lands first, or a dated waiver line here. *(Re-ruled 2026-10-18, Ada: was "before release-5 step 5.1 (the next 5.1 dry run)". No token expresses 5.1, which precedes phase 1; `release:next:phase-1` is the looser, machine-visible choice, so the M3 walk counts the record at phase 1 (it fires at S). `manual` would be exact but invisible to the walk, and this is a guard record. A fix that is not in the tagged squash S does not hold at 5.3 in any case. Authority: ballot 2026-10-18-obligation-drain-and-release-falsity-floor M2/M5 back-fill, the application PR `chore/ballot-sitting-application`. The superseded trigger, verbatim:)* before release-5 step 5.1 (the next 5.1 dry run) — fix lands first, or a dated waiver line here *(Met 2026-10-18, Ada: the fix lands before `release:next:phase-1`; see `## Fixed (2026-10-18)`.)*
**Source**: RS-31, Stacy's RELEASE phase 2 for 16.0.0 (`.kiro/specs/123-consumer-distribution/completion/claims-pass-release-16.0.0.md`, "Phase 2 standards implications"). Stacy named the gap and did not draft it.
**Grant paths**: none here. The fixing PR touches `scripts/release-publish.ts` (Ada, standing, six-roots ballot § scripts-by-file) and, if the text changes, `.kiro/hooks/RELEASE-FLOW.md` (law: `**Consulted**:` line, Peter-merged). Owning the script does not let Ada change RELEASE-FLOW without a ballot.
**Consulted**: none needed — filing only; Thurgood is named owner of the text half
**Class**: P2 obligation (guard) · owed-act *(set 2026-10-18, Ada, rule 12, replacing "P2 obligation (proposed — the option-D class ballot is not yet drafted)", which is superseded: the class ballot is ratified. The `(guard)` reading is M5's: the 5.3 preflight is a guard weaker than its claim, since it checks one of the two registries and the other first fails after a version is already published. No reader is misled, so P0 is not read; under rule 11 a P2 `(guard)` escalates at its first lapse.)* *(Met 2026-10-18, Ada: the guard now checks both registries before any build; its residual is stated below.)*

## The gap

The 5.3 publish-mode preflight (`scripts/release-publish.ts` L259) runs `npm whoami --registry=<GitHub Packages>` and nothing else. Public-npm auth is first exercised at 5.4, after one registry already holds the version. Two releases running, 5.4 met an expired npmjs login (npm reports it as E404 on a scoped PUT, pitfall 4):

- **15.1.0**: 5.4 first attempt E404 on PUT; fixed by `npm login --auth-type=web`, same tarball (`docs/releases/15.1.0/publish-verification.txt` L37).
- **16.0.0**: GitHub Packages got the version at 14:31:56Z; 5.4 attempt 1 E404 (`whoami` against npmjs: E401, read at 14:37:44Z); npmjs `time["16.0.0"]` appeared 14:52:24Z. About 20 minutes with the version on one registry only. Handled correctly both times; the exposure is the window, not a wrong outcome.

## Fix shape — NOT picked

- **(a) Add a second `whoami` to the 5.3 preflight**: `npm whoami --registry https://registry.npmjs.org --@3fn:registry=https://registry.npmjs.org`; the script refuses before building if either registry fails. Cost: one script edit plus a bite. Surviving counter-argument: 5.4 runs in Peter's terminal with web 2FA, so a pass at 5.3 time does not guarantee the 5.4 PUT (a login can expire in between, and 2FA is per-publish). It shrinks the window's likelihood, it does not close it.
- **(b) A 5.4 wrapper subcommand** in the script that preflights npmjs, then publishes the SAME tarball (sha1 checked first). Cost: new script surface and a RELEASE-FLOW text change to replace the printed 5.4 command. Surviving counter-argument: it moves 5.4 into the script, which widens what the script does with Peter's credentials and 2FA step, and the preflight still runs before the PUT, not before 5.3.
- **(c) RELEASE-FLOW text only** ("run `npm whoami` against npmjs before 5.3"). Cost: law edit, Peter-merged, no script change. Surviving counter-argument: a step an operator can skip is the failure class this record exists for; it has been in the pitfalls list since 15.1.0 and did not prevent the second occurrence.

**Lean (a lean, not a pick)**: (a), with at most a one-line RELEASE-FLOW sentence naming that 5.3 now checks both logins and that 5.4 can still fail on 2FA. It is the only option that makes the refusal mechanical before anything is published. Its residual (expiry or 2FA between 5.3 and 5.4) stays.

## Unverified

- Whether npmjs auth lives in the same npm config the script reads at 5.3 (the main checkout's `.npmrc`) or in Peter's user config only; if the latter, (a) could refuse falsely or pass falsely and needs a check before it is built.
- Whether a pass at 5.3 time would have caught the 16.0.0 expiry (the login may have lapsed between 14:31:56Z and 14:37:44Z); the record does not say.

## Fixed (2026-10-18)

**Fork taken**: (a), per Peter's "proceed as recommended" (2026-10-18, relayed by the orchestrator; the owner's lean, recorded above). (b) and (c) are not taken; (c)'s one-line RELEASE-FLOW sentence is Thurgood's, after this PR (law; his seat).

**What changed**
- `scripts/release-publish.ts` L265-L273: the 5.3 publish-mode preflight now also runs `npm whoami --registry=https://registry.npmjs.org --@3fn:registry=https://registry.npmjs.org` (registry named twice, RELEASE-FLOW A1), from the operator checkout, beside the existing GitHub Packages check (L260-L263) and before any clone, install or build. A failure refuses naming the registry, the exit code and the remedy (`npm login --auth-type=web --registry=https://registry.npmjs.org`), and says that 5.4 still runs in the operator's terminal with web 2FA, so a pass shrinks the window and does not close it. Header comment L32-L35 lists the new refusal.
- 5.1 (`--dry-run`) is unchanged: it ran no `whoami` before and runs none now (the existing dry-run test asserts it).
- `scripts/__tests__/release-publish.test.ts`: the publish happy path asserts the npmjs `whoami` runs, in the operator cwd, before the first clone fetch; the refusal table gains a public-npm case, and the GitHub Packages case now targets only its own `whoami`; a dedicated test checks the message (registry, `exit 1`, login remedy, 2FA residual) and that no `git init`/`git fetch`/`npm ci`/publish ran. The new tests bite: against the old script, 3 tests fail. `npm run test:scripts`: 19 suites, 496 tests pass (release-publish: 59).

**Unverified point (i), resolved by construction**: the script never reads npm config; it invokes `npm whoami` from the operator checkout, so it sees whatever `npm` itself resolves there (project `.npmrc`, then the user's `~/.npmrc`). If the npmjs login lives in the user config, the check passes and the 5.4 PUT uses the same config. Not exercised against a real registry from this session (no credentials; the preflight is tested through the injected runner only).

**Unverified point (ii), left as recorded**: whether a pass at 5.3 time would have caught the 16.0.0 expiry is not testable here.

**Residual (stated, not solved)**: 5.4 runs in the operator's terminal with web 2FA. A login that lapses between this check and the 5.4 PUT, or a 2FA failure at 5.4, still stops 5.4 after GitHub Packages holds the version. The check shrinks that window's likelihood only.

**Text half**: one sentence for RELEASE-FLOW 5.3 is owed by Thurgood (his seat; law, Peter-merged). The script is fixed independently of it.

## Archived (2026-10-20)

*Signed: Thurgood (Civitas steward), archived by the steward, early walk act, Peter's go 2026-10-20 ("Go on the records PR with the class option and resolving F-1 and F-2, please", chat, relayed by the orchestrator); README rule 5, "otherwise at the next health-check walk".*

- **Outcome**: the script fix (§ "Fixed (2026-10-18)") and the RELEASE-FLOW 5.3 "both logins" sentence (the text half owed by Thurgood, under the ratified micro-ballot `2026-10-18-release-flow-5-3-single-run-and-both-logins`) merged together as #410, `0baeadda8` (2026-10-19), before release-5 phase 1. The outcome above is the owner's (Ada); this line adds the merge SHA and records the text half delivered. Moved to `archive/` by `git mv` in the same commit as this line.
