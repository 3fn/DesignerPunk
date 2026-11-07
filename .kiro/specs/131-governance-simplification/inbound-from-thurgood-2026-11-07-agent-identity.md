# Inbound from Thurgood: agents act through Peter's credential, so no check can verify that words are his

**Date**: 2026-11-07
**Author**: Thurgood (Spec 131's formalizer, and maintainer of the checks named below), at Peter's direction. **Verifier of the facts**: Stacy. She named the separate agent identity as the class answer in her cross-read of the merge-hold scope.
**Peter's words**, recorded with `date -u` at receipt (orchestrator relay; **UNVERIFIED** beyond the relay):
- 2026-11-07T17:36:23Z: *"Let's defer it, but I want to capture it. This feels governance related, but I could be wrong. Would it be something to address for spec 131?"* The orchestrator answered yes.
- 2026-11-07T17:41:21Z: *"Let's update 131 or provide an inbound, but consult with relevant agents to sure-up the proposal."*
**Status of 131**: design outline merged, paused at the edge of requirements. Its park re-asks at `path:.kiro/specs/132-*/completion/first-family-measured-cost.md`, and Spec 132 has no directory yet, so this inbound may wait a long time. § 4 says what would make it urgent sooner.
**Consulted**: Stacy — rule 10 owes an issues-root record (filed: `.kiro/issues/2026-11-07-agents-act-through-peters-credential.md`); § 4 rows 1 and 3 corrected; Ada — the release flow's token needs, verified on `origin/main` (§ 6); Lina — nothing she owns reads the PR author, the commit email or `3fn`, and the committer question is open (§ 6 item 5). Their reads were relayed by the orchestrator on 2026-11-07 and are folded here; other § 7 seats were not consulted.
**Record**: `.kiro/issues/2026-11-07-agents-act-through-peters-credential.md` (owner Thurgood, verifier Stacy, Trigger `path:` on this spec's `requirements.md`).

This is **a consideration, not direction** (Peter's standing rule for inbounds, 2026-11-04T13:23:25Z, as `inbound-governance-cost-ledger.md` § 1 quotes it). It rules nothing.

---

## 1. The class

Governance law treats Peter's words as what ratifies, answers and authorizes. A question "holds the merge" until "Peter's answer is on the record — his words, dated" (`.kiro/steering/Task-Completion-Protocol.md` § "Branch and PR Conventions"). Every agent session acts through Peter's own GitHub credential. So no instrument can tell Peter's act from an agent's act made in his name: a PR comment, a review, a body edit, a label or a committed file all look the same. A check can confirm that an answer is **present and cited**. It cannot confirm **who** gave it.

The merge-hold rule and the record-first protocol (`.kiro/docs/ballots/README.md` § "The Ratification Protocol") read as authorship guarantees, and the platform cannot enforce authorship here. That is a guard weaker than its claim.

## 2. The facts

- **VERIFIED (`gh pr view 719`)**: #719 was authored by `3fn` and merged by `3fn`. Agents open PRs as `3fn`.
- **VERIFIED (`gh api repos/3fn/DesignerPunk/collaborators`)**: one collaborator, `3fn`.
- **VERIFIED (file)**: `.kiro/hooks/complete-task.sh` L560–578 reads `GH_TOKEN` or `GITHUB_TOKEN` from the environment, and otherwise from the repo-root `.env`. `tools/agent-generator/verify-gate-registration.sh` and `scripts/harness/stability.ts` read a token from the environment or `.env` too.
- **VERIFIED (`gh auth status`, with no token in the environment)**: "You are not logged into any GitHub hosts." There is no `gh` login on this machine today. *Correction to my cross-read of 2026-11-07, which named "Peter's `gh` keyring" as a second source: none exists now.*
- **VERIFIED (`git config --get-all credential.helper`)**: `osxkeychain`. A plain `git push` uses the macOS keychain's GitHub credential. `complete-task.sh` bypasses that helper on purpose (its header, L82–85). **UNVERIFIED**: which account the keychain entry belongs to. I did not read it.
- **Every session on this machine runs as the same local user.** Any file or keychain entry Peter can read, an agent session can read too.
- **Recalled from GitHub's documentation, UNVERIFIED live**: a PR's author cannot approve that PR, so "Peter approves by review" is not possible while agents author as `3fn`.

## 3. The triggering incident

PR #719 (Spec 129 U4) carried an `**Open for Peter**:` line asking him to ratify a LAW measure. It merged at 2026-11-07T16:52:22Z with all 26 checks green, while the ballot read DRAFT at the merge commit `30e2f727b` (**VERIFIED**). Peter ratified at 17:00:13Z, 7 min 51 s later, and #720 recorded the finding. The cost entry is `inbound-governance-cost-ledger.md` L-10.

That was a lapse of memory, not a forgery. Peter's Decision 1 (17:33:23Z, "Re: Decision 1, Yes") answers the memory lapse without this inbound: a format ballot, and one workflow with two jobs.

## 4. What would make this urgent before 131 resumes, and how each would be noticed

| Event | Why it matters | How it would be noticed today | Gap |
|---|---|---|---|
| **A forged answer**: an answer, a RATIFIED Status or a PR comment in Peter's name that he did not give | The failure the law claims to prevent has happened | **Peter only**, when he reads what was recorded in his name. Decision 1's merge-hold job confirms presence, not author | Nothing detects it mechanically |
| **An answer that cannot be traced to Peter**: cited words with no relay record, no `date -u` receipt or no source he can confirm | The record can neither be confirmed nor refuted | **Stacy counts these at each claims pass** (the governance-edit-kind and answer reads) | The count is a sample read, after the merge |
| **Agents move to isolated or cloud sessions** (for example, Claude Code on the web, or a hosted CI agent) | Each new runtime needs a credential. If it gets Peter's token, the exposure spreads beyond this machine | **Peter only**: it is his setup decision. `complete-task.sh`'s credential preflight fails loud where no token is present | No record requires that the credential question be asked at that moment |
| **A fourth party gets write access**: a second human, or an agent running under a separate account | `3fn` stops being "Peter or an agent he runs". The record-first protocol's assumption about who can commit changes | `gh api repos/3fn/DesignerPunk/collaborators` would list a second login. **Nothing reads it today.** *Recalled, UNVERIFIED*: that call may not list an installed GitHub App or a deploy key with write access; those would need their own reads (deploy keys through `gh api repos/3fn/DesignerPunk/keys`; installed Apps on the repo's Settings page) | A health-check line reading collaborators, Apps and deploy keys would notice it. **That changes what the health check is, so it needs Peter's word** (my charter: owning `governance-check.sh` does not let me change what the check is). It is proposed here, not done |

Any one of these is a reason to take this inbound out of the 131 queue and route it to Peter as its own item.

## 5. What Decision 1's law-ratified job covers, and what only identity work closes

**Decision 1 covers** (once built and required):
- A PR whose body carries `**Edit kind**: <path> — LAW (<ballot>)` cannot merge unless that ballot's Status reads RATIFIED at the PR head. #719 would have stayed red.
- With the edit-kind presence limb, a PR that touches a governance path without an edit-kind line cannot merge either.
- The merge-hold job, advisory, makes an open `**Open for Peter**:` line show as a red check, so "all green" stops hiding it.

**Decision 1 does not cover; only an identity Peter alone holds closes these:**
- **Who wrote RATIFIED.** An agent can write the Status line, and the job will pass.
- **Who answered.** An agent can add an answer line or a PR comment, and the merge-hold job will pass.
- **Who merged.** Today the merge itself is a `3fn` act an agent could perform. Rules forbid it; nothing prevents it.

With a separate agent identity, both jobs could check a `3fn` review or comment instead of a text line. That turns "an answer is cited" into "Peter answered".

## 6. The options: a GitHub App or a machine user

Both give agents an identity that is not `3fn`. In both, branch protection then requires a review that only Peter can give: one approval, with Peter as code owner, on every PR or on governance paths only (a fork for 131).

**A machine user** (a second GitHub account, for example `designerpunk-agent`, added as a collaborator).
- *Recalled, UNVERIFIED*: GitHub's terms allow one machine account per person. A collaborator seat is free on a public repo. It uses a long-lived personal access token, fine-grained to this repo.
- *My read*: the simplest swap. `complete-task.sh`, `gh` and git need only a different token. PRs and pushes show the machine user. The token is long-lived, so a leaked token stays usable until revoked.

**A GitHub App** (installed on `3fn/DesignerPunk`).
- *Recalled, UNVERIFIED*: an App authenticates with a private key, from which a short-lived installation token is minted (about an hour). Its permissions are set per App (contents, pull requests, actions). Its acts show as `<app>[bot]`.
- *My read*: stronger on permissions and token lifetime. But the private key is itself a long-lived secret on the same local account, so the exposure in § 2 moves rather than vanishes. It also needs a minting step in `complete-task.sh` and in every script that calls `gh`, which is more code to own.

**Setup common to both**:
1. The agent token replaces Peter's in `.env`, with actions write. Today's PAT gets 403 on `workflow_dispatch` (`verify-gate-registration.sh` header).
2. Peter's credential is removed from agent reach: none in `.env`, the keychain's GitHub entry removed or replaced, and no `3fn` `gh` login (true today; it must stay true).
3. Branch protection requires Peter's approval (Peter's act, in Settings).
4. `verify-gate-registration.sh` needs read access to branch protection: either the agent identity has it, or Peter runs the script.
5. **Signing chain**: no change found. `tools/agent-generator/regrounding/verify-signing-chain.ts` keys on commit trailers and committer time, not on the GitHub login. Lina confirms that nothing she owns reads the PR author, the commit email or `3fn`, and that no workflow reads `github.actor` or `pull_request.user`; records keep their meaning through the `Agent:` trailer. **Her open question**: whether the bot is also the git **committer**. The signing chain reads committer time, so a change of committer must keep that time meaningful. Local git authorship (`Peter Michaels Allen`) is a separate setting; whether author or committer moves is a fork for 131.
6. **The release flow** (Ada, verified on `origin/main`):
   - `gh workflow run`, `gh pr view` and `gh release create` work under contents, pull requests and actions write.
   - `complete-task.sh` L240 reads `check-runs`, and `scripts/harness/stability.ts` reads check-run annotations, so the agent identity also needs **checks read**.
   - **Publishing to GitHub Packages** (`scripts/release-publish.ts` L196 `ghPublishArgs`, L368 `npm whoami --registry=…`) needs `packages:write`, and possibly a classic PAT (*recalled*). So RELEASE-FLOW step 5.3 stays Peter's act, like 5.4.
   - **The tag (5.2) stays Peter's.** That is either kept as a rule, or enforced by tag protection (a Settings act, Peter's).
   - **npmjs (5.4)** is Peter's 2FA, with no GitHub token involved.

**Cost**: about one agent session, plus Peter's setup. **PROJECTED**.

**What survives either option**:
- **The shared local account.** If Peter's credential is ever stored where an agent session can read it, the guarantee is gone, and nothing reports that.
- **An extra click per merge** if approval is required on every PR.
- **The guarantee lapses silently if a `3fn` login returns.** A health-check line confirming that no `3fn` credential is reachable would be the instrument; it does not exist.

## 7. Seats this proposal affects (for the orchestrator's consults)

- **Peter**: creates the identity, changes Settings, removes his credential from agent reach, and approves PRs. His merge habit gains an approval step.
- **Thurgood**: `complete-task.sh` (token source; minting step if an App), `verify-gate-registration.sh` (read access), the monthly health check (proposed collaborator and credential lines), and Decision 1's two jobs (upgraded to check `3fn` acts).
- **Stacy**: her claims-pass reads of authorship and answers, and her ARMING reads that run `verify-gate-registration.sh`. Her merge-hold audit could read a `3fn` review instead of a cited line.
- **Lina**: owner of the generator's shared core. Nothing she owns reads the GitHub login (§ 6 item 5); the committer question is hers to check.
- **Ada**: `scripts/harness/stability.ts` reads a token and needs checks read. In the release flow, steps 5.2 (tag), 5.3 (GitHub Packages) and 5.4 (npmjs) stay Peter's acts (§ 6 item 6).
- **Data, Kenya, Sparky, Leonardo**: they open PRs through `complete-task.sh`, so the PR author changes for them. The unit-branch dispatches `complete-task.sh` fires (`gh workflow run`) need actions write on the new identity. No other change to their workflow.

## 8. What 131 is asked to weigh

Take it into a requirement, or rule it out with a reason. It bears on two of 131's rulings: the fix-first spine (F-9, design-outline § 4), and "Trust, but verify" (F-2, § 5), where Peter's words are "one thing I need is to know that any one agent isn't working unilaterally". Today no instrument can tell an agent acting alone in Peter's name from Peter. Forks that are 131's: an App or a machine user; approval on every PR or on governance paths only; whether local git authorship moves too.

**Surviving counter-argument**: the evidence is one incident, and it was not a forgery. Every authorship rule in the corpus already rests on records committed by sessions (the README's ratification protocol, step 1), and none has failed through forgery. Against that: the protocol's own "Why" names authority that exists only as a claim as the gap. And once Decision 1 lands, its jobs will look like authorship checks, which they are not.
