# Issue: agents act through Peter's credential, so no check can verify that words are his

**Date**: 2026-11-07
**Owner**: Thurgood
**Verifier**: Stacy. She raised the class answer in her cross-read of the merge-hold scope, on 2026-11-07. She verifies the record's facts when it closes; she does not own it.
**Class**: P2 obligation (guard) · charter
**Trigger**: `path:.kiro/specs/131-governance-simplification/requirements.md` — the event that owes the close is Spec 131's requirements. The first commit that adds them takes this record in, or leaves it out with a reason (`governance/Process-Spec-Planning.md` § "Before Formalizing: Records That Name the Spec"). The owner then closes this record into 131 under rule 5, or re-rules it with a dated reason.
**Source**: Peter, verbatim, recorded with `date -u` at receipt 2026-11-07T17:36:23Z (orchestrator relay; **UNVERIFIED** beyond the relay): "Let's defer it, but I want to capture it. This feels governance related, but I could be wrong. Would it be something to address for spec 131?" The orchestrator answered yes. Nothing in this record is ruled beyond the deferral and the capture.

---

## The class

Governance law says Peter's words are what ratify, answer and authorize: a question "holds the merge" until "Peter's answer is on the record — his words, dated" (`.kiro/steering/Task-Completion-Protocol.md` § "Branch and PR Conventions"). Every agent session acts through Peter's own GitHub credential. So no instrument can tell Peter's act from an agent's act made in his name, whether the act is a PR comment, a PR review, a body edit, a label or a committed file. A check can confirm that an answer is **present and cited**. It cannot confirm **who** gave it.

This is a guard weaker than its claim (P2 `(guard)`): the merge-hold rule and the record-first protocol (`.kiro/docs/ballots/README.md` § "The Ratification Protocol") read as authorship guarantees, and the platform cannot enforce authorship here.

---

## The facts (each labelled)

- **VERIFIED (`gh pr view 719`)**: #719 was authored by `3fn` and merged by `3fn`. Agents open PRs as `3fn`. So "Peter approves by GitHub review" is not available today, because (from GitHub's documentation, recalled; **UNVERIFIED** live) a PR's author cannot approve it.
- **VERIFIED (file)**: `.kiro/hooks/complete-task.sh` L560–578 reads `GH_TOKEN` or `GITHUB_TOKEN` from the environment, and otherwise from the repo-root `.env`. `tools/agent-generator/verify-gate-registration.sh` reads `GITHUB_TOKEN` the same way, to read branch protection.
- **VERIFIED (`gh auth status`, with no token in the environment)**: "You are not logged into any GitHub hosts." There is no `gh` keyring login on this machine today. *Correction to my cross-read of 2026-11-07, which named "Peter's `gh` keyring" as a second source: none exists now.*
- **VERIFIED (`git config --get-all credential.helper`)**: `osxkeychain`. A plain `git push` from any session uses the macOS keychain's GitHub credential. `complete-task.sh` bypasses that helper on purpose (its header, L82–85). **UNVERIFIED**: which account's credential the keychain holds. I did not read it.
- **Every session on this machine runs as the same local user**, so any file or keychain entry Peter can read, an agent session can read too.

---

## The option captured: a separate identity for agents

A machine user or a GitHub App whose token agents use, so that `3fn` acts only when Peter acts.

**Setup**:
1. Create the bot (a machine user, or a GitHub App installed on `3fn/DesignerPunk`). Permissions: contents write, pull requests write, actions write. Today's PAT gets 403 on `workflow_dispatch` (`verify-gate-registration.sh` header), so the bot needs dispatch that the PAT lacks.
2. **Token swap**: the bot's token replaces Peter's in `.env`.
3. **Remove Peter's credential from agent reach**: none in `.env`. The keychain's GitHub entry is removed, or replaced with the bot's. No `gh` login under `3fn` (true today; it has to stay true).
4. **Branch protection** (Peter's act): require 1 approving review, require code-owner review, with Peter as code owner. Required approval on every PR, or only on governance paths through CODEOWNERS, is a fork for 131.
5. **`complete-task.sh`**: only its token source changes. The PR author becomes the bot.
6. **`verify-gate-registration.sh`**: reading branch protection needs admin read. Either the bot is given it, or Peter runs the script.
7. **Signing chain**: no change found. `tools/agent-generator/regrounding/verify-signing-chain.ts` keys on commit trailers and committer time, not on the GitHub login. Local git authorship (`Peter Michaels Allen`) is a separate setting; whether it changes is a fork for 131.

**Cost**: about one agent session, plus Peter's setup (creating the bot, Settings, keychain). **PROJECTED**.

**What survives the option**:
- **Anything reachable on the shared local account.** If Peter's credential is ever stored anywhere an agent session can read (a file, the keychain, a `gh` login), the guarantee is gone, and nothing reports that it is gone.
- **An extra click per merge**, if approval is required on every PR.
- **The guarantee lapses silently if a `3fn` login returns** (for example, `gh auth login` run for convenience). A health-check line that confirms no `3fn` credential is reachable would be the instrument; it does not exist.

---

## The triggering incident

PR #719 (Spec 129 U4) carried `**Open for Peter**: Ratify the per-family Android type statements … as LAW (ballot .kiro/docs/ballots/2026-11-07-129-u4-android-type-statements.md …)? This PR is not merged until your dated answer is in that ballot's Status.` It merged at 2026-11-07T16:52:22Z with all 26 checks green, while the ballot read DRAFT at the merge commit `30e2f727b` (**VERIFIED**). Peter ratified at 17:00:13Z, 7 min 51 s later. #720 recorded that as a finding. The cost entry is ledger L-10 (`.kiro/specs/131-governance-simplification/inbound-governance-cost-ledger.md`).

That incident was a lapse of memory, not a forgery. Peter's Decision 1 (17:33:23Z, "Re: Decision 1, Yes") answers it without this record: a format ballot, and one workflow with two jobs (merge-hold, advisory, promoted after N clean runs that parsed a marker; and law-ratified, required once a test PR shows it red, with the edit-kind presence limb). Both jobs check that an answer is present, not who gave it.

**How Decision 1's jobs would change if this lands**: once `3fn` acts only for Peter, the merge-hold job can accept an answer only when it is a PR review or comment by `3fn` posted after the marker line was added. The law-ratified job can require a `3fn` approval on any PR whose body carries a `LAW` edit-kind line. That turns "an answer is cited" into "Peter answered".

---

## What 131 is asked to weigh (not law)

Take it into a requirement, or rule it out with a reason. It bears on two of 131's rulings: the fix-first spine (F-9, design-outline § 4), and "Trust, but verify" (F-2, § 5), where Peter's words are "one thing I need is to know that any one agent isn't working unilaterally". Today no instrument can tell an agent acting alone in Peter's name from Peter. Two forks are 131's: approval on every PR or on governance paths only, and whether local git authorship moves to the bot too.

**Surviving counter-argument**: the evidence is one incident, and it was not a forgery. Every authorship rule in the corpus already rests on records committed by sessions (the README's ratification protocol, step 1), and that has not failed through forgery. Against that: the protocol's own "Why" names authority that exists only as a claim as the gap. And Decision 1's jobs will read as authorship checks, which they are not.
