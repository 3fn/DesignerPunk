# Charter: the governance layer (125-B U3), re-homed — PR-approval-as-ratification, armed only once its preconditions are met

**Date**: 2026-11-08
**Status**: ACTIVE (waiting on its trigger)
**Owners**: **Thurgood** (the charter; the `record-first-ratification` register row it arms; the design work at the trigger) and **Stacy** (§ 6, the re-attestation duty; her record `.kiro/issues/2026-10-15-123-125b-u3-re-attestation.md`).
**Trigger**: `manual` — Peter creates the distinct PR-authoring identity (a machine account or a GitHub App installation) under which agent-authored PRs are opened, so that his code-owner approval of them is valid (§ 3, precondition #4). The event is Peter's act on GitHub and is not git-visible, so the token is `manual`; the monthly walk counts it with the other `manual` records. At the trigger the design work in § 5 is owed, and this charter closes into the vehicle that does it (a spec's requirements file, or an issue-driven arming record), or into Peter's decline of the layer. *(Set 2026-11-08, Thurgood, owner.)*
**Class**: P3 improvement · charter *(set 2026-11-08, Thurgood, rule 12; Stacy may re-class)*. Nothing shipped asserts the barrier: the register row's gated-surfaces scope reads `proposed`, and Task-Completion-Protocol keeps those paths Peter-merged under the standing carve-out meanwhile. No consumer is blocked (not P1), no guard claims more than it does (not P2 (guard)), and the record of the obligation is this file (not P2 (record)). It is an improvement Peter has kept open but not scheduled: he closed 125-B without it. *Reading that would re-class*: Peter scheduling the layer, or a PR claiming the PR-approval regime before the scope arms (that would be a P0 reading, Stacy's to raise).
**Source**: Peter, chat, relayed, recorded in `.kiro/specs/129-consumer-generation-completeness/evidence/2026-11-08-peter-rulings-f4-two-pr-and-u3-rehome.md` item 4 (2026-11-08T18:56:04Z, *"I'm fine with them not being part of 131"*; 2026-11-08T19:06:05Z, *"Re: Buckets 3 and 4, proceed as the relevant team members recommend"*). This file is step 2 of the four-step re-home adopted there. Carried from: `.kiro/specs/125-B-classification-map/requirements.md` Req 13; `design.md` § C9; `inbound-to-u3-from-5-6.md` §§ 2–4; `.kiro/docs/ballots/2026-10-01-signing-act-chain.md` L265–270.
**Law that points here**: once ratified and applied, ballot `.kiro/docs/ballots/2026-11-08-125b-u3-rehome.md` (DRAFT at this file's creation) re-points Task-Completion-Protocol L93 and L129, the `record-first-ratification` register row and the ballots README L26 from 125-B U3 to this charter or to the row that names it (its F-1).
**Grant paths**: none. The arming work will need `.github/CODEOWNERS`, which takes an issue-row grant (README rule 8; ballot 2026-11-07-github-grants-are-issue-row-grants): it is added to this record, or to the vehicle's, when that work is designed, not before.
**Consulted at the trigger** (not owners): Ada for the token-side diff-gate logic (Req 13.4, below); Peter owns every platform setting and the identity itself.
**Consulted**: Stacy — the joint position of 2026-11-08 (record item 3) put her re-attestation Trigger at `manual`, on an identity that distinguishes seats; § 6 leaves that edit to her.

---

## 1. Why this charter exists

125-B (`.kiro/specs/125-B-classification-map/`) declared U3 as its governance layer and never broke it down (`tasks.md` Task 6, "GATED PLACEHOLDER"). Its gate became a structural constraint, first recorded on 2026-09-18: **GitHub does not let a PR's author approve their own PR, and every PR in this repo is authored by Peter's account** (`inbound-to-u3-from-5-6.md` § 2). A code-owner review routed to Peter on his own PR cannot be given, so the layer cannot arm until agent PRs come from another identity. That is Peter's act, with no date.

Peter chose to close 125-B rather than hold it open behind that act (record item 4). This record carries what U3 owed, so 125-B's tasks amendment (step 3) can replace Task 6 and the U3 table row with a pointer here.

## 2. Scope: Req 13 and its design pointer, carried verbatim

From `.kiro/specs/125-B-classification-map/requirements.md` § "Requirement 13: U3 — Governance Layer (Charter Grain)" (at `77958cbb6`):

> **User Story**: As the later unit, I want the ratification barrier's requirements fixed at charter grain now, so that U3 can be designed later without re-opening the outline. *Traces: §3.1 (barrier half), §4 (U3), umbrella Phase 2.*
>
> 1. U3 SHALL deliver CODEOWNERS coverage mapping governance-law paths (`governance/**`, `.kiro/steering/**`, `.kiro/docs/ballots/**`, agent prompts/configs) to Peter, with required PR approval enforced by branch protection.
> 2. WHEN the barrier is live THEN Peter's PR approval SHALL constitute ratification for gated surfaces; the committed-record protocol (layer 1) SHALL remain in force for ungated artifacts. The authority-row register entry SHALL be updated from `proposed` to `armed` at that point.
> 3. Platform-settings configuration (CODEOWNERS enablement, review requirement) is Peter's action, per the 125-A protection-toggle precedent.
> 4. Token/governance diff-gates in U3 SHALL be informed by Experiment 3's spike evidence (Requirement 16: source-surface detection at `src/tokens/**`; the workflow-hygiene-not-correctness caveat carried). **Ownership attribution (ADA R1, mirroring Requirement 12.5's discipline): the token-side detection logic is Ada's** — she owns the check logic and is consulted on the spike; Thurgood audits.

From `.kiro/specs/125-B-classification-map/design.md` § "C9. U1b / U3 (charter-grain sketches)" (at `77958cbb6`):

> - **U3** (Req 13): CODEOWNERS file mapping the four governance-law path groups to Peter; branch protection gains required review (Peter's settings action); the authority-row register entry flips `proposed → armed` in the same PR. Token/governance diff-gates designed AFTER **Experiment 3's (Req 16)** evidence lands — deliberately not designed here (charter grain). *(Mislabel fixed per ADA R1 — an earlier draft fused "Experiment 3" with "Requirement 16.")*

These are carried as the requirements the vehicle at the trigger starts from, not re-ruled here. The vehicle may revise them through its own review round, and Peter rules.

**The one regime marker**: 125-B's campaign law (`tasks.md` Task 5, "Ratification [STACY R1]") pins any claim of PR-approval-as-ratification to the register row's `proposed → armed` dated history line, and "a self-declared regime claim is invalid". That rule outlives 125-B and binds this charter's arming PR.

## 3. The precondition ledger for the arming marker (`record-first-ratification`, gated-surfaces scope, `proposed` → `armed`)

Carried from `inbound-to-u3-from-5-6.md` § 3, with precondition #4 corrected (below) and a state column re-read on 2026-11-08.

| # | Precondition | State at capture (2026-09-18) | State re-read 2026-11-08T19:11:09Z (Thurgood, GitHub API, Peter's token) |
|---|---|---|---|
| 1 | "Require a pull request before merging" enabled | **MET** (2026-09-18) | **MET**: `required_pull_request_reviews` present on `main` |
| 2 | "Require review from Code Owners" enabled | open (blocked by #4) | open: `require_code_owner_reviews: false`, `required_approving_review_count: 0`. Must stay off until #4 is met, or every governance PR wedges |
| 3 | CODEOWNERS covers the governance-law paths (`governance/**`, `.kiro/steering/**`, `.kiro/docs/ballots/**`, agent prompts/configs); at capture it covered only package manifests | open (U3 authoring work) | open: `.github/CODEOWNERS` still names only `package.json` and `package-lock.json` (`@3fn`) |
| 4 | **One distinct PR-authoring identity** (a machine account or a GitHub App), so that the code owner's approval is valid | open, **the load-bearing one** | open: `gh api user` returns `3fn`, the account that authors every PR |
| 5 | Resolvable owner handle in CODEOWNERS (the `@3fn` caveat: an unresolvable entry silently fails to route) | open (verify against a real GitHub identity) | **partly evidenced**: `users/3fn` is a `User`, and `repos/3fn/DesignerPunk/codeowners/errors` reports 0 errors for the current file. Routing on a real PR is not shown; it is shown only once #2 and #4 make a review request possible |

Also in force at the re-read: 21 required status contexts, `enforce_admins: true`, required linear history.

**Precondition #4, as corrected.** It asks for **one** identity, distinct from Peter's, so that his approval of an agent-authored PR is valid. It **separates Peter from the agents; it does not separate one seat from another** (signing-act ballot `2026-10-01-signing-act-chain.md` L265, "verified at Thurgood's A-round R1"). Per-seat identity is a separate question, § 5 item 1. Earlier text that read U3 as bringing "per-seat authoring identity" (125-B `tasks.md` Task 6's carried-obligation line; the re-attestation record's Trigger prose) overstated it.

The identity is not a settings toggle. It is credential and workflow plumbing with its own security surface: token custody, scope, and the `.env` convention for agent sessions (`inbound-to-u3-from-5-6.md` § 2 item 3).

## 4. Ordering constraints this charter inherits

1. **The signing-act shape review ships first.** `.kiro/issues/2026-10-23-signing-act-shape-review.md` L6: "The review must ship before U3, whose re-attestation re-signs fresh rows that § 2 clause 5 and F5 reject." Its application is two PRs and counts as applied only when both have merged (record item 3; PR 2, the F-4 (a) pin and the 261 re-signs, merges before the next release's squash S). No re-attestation act under § 6 starts before PR 2 has merged.
2. **Stacy's re-rule merges before 125-B's tasks amendment.** Her record's present Trigger, `path:.kiro/specs/125-B-classification-map/tasks.md`, would fire on step 3's edit of that file. Her re-rule rides this record's PR (step 2).
3. **The re-home ballot applies in step 3**, after this record has merged (ballot § 6 step 2).

## 5. Owed at the trigger (not decided here)

1. **The per-seat question.** The signing-act ballot (L267–270) names this event as trigger (c): "U3's identity work opening — U3 then answers the per-seat question; a decline with reasons is allowed." The answer is recorded here (or in the vehicle) before the identity's design is fixed: either one identity (the agents as one author, Peter as the approver), or one per seat. A decline states its reasons and what it leaves unauthenticated (per the signing chain's own "consistency, not identity" label).
2. **The vehicle.** A spec, or issue-driven execution if the design fits one record. Its first round re-reads § 3, carries § 2, and names its merge unit(s). Peter's 2026-11-08T18:56:04Z message ("more mechanical mechanisms and less review — maybe even translating some documentation and ballots to CI or similar") bears on whether a review-based barrier is still the end state; the vehicle reads Spec 131's state on that question first and says how it answers it.
3. **The arming PR**, when #1–#5 are met: CODEOWNERS over the governance-law paths (with its issue-row grant); Peter's settings action for code-owner review; the register row's `proposed → armed` history line in the same PR (C9). Gate-bite PRs for it follow the 125-A pattern.
4. **The education re-assessment** of the propagated record-first statement (register row `education`: "RE-ASSESS the propagated statement's what-half when [the scope] arms"), accounting for the record-check two-blade degeneracy (`inbound-to-u3-from-5-6.md` § 4, closeout method finding 2).
5. **The token diff-gate**, from Exp-3's evidence (U2): the `no-autonomous-token-creation` row's unguarded scope names this territory (primitive spacing, component tokens, 11 semantic families), with `audit:theme-drift` as the best-shaped candidate mechanism; escalate-don't-build still applies. Ada owns the token-side logic; Thurgood audits (Req 13.4).

*Added 2026-11-08 (Thurgood, owner; rule 9; finding CL-1 of `.kiro/specs/125-B-classification-map/completion/claims-pass.md` @ `ccaf99f01`):* **6. The re-attestation bound ballot.** Ballot `.kiro/docs/ballots/2026-11-08-signing-act-shape-review.md`, RATIFIED with F-1 (d) (Peter, 2026-11-08T17:45:34Z), rules that no row is in bound for a re-attestation until a ballot sets its bound, once the identity mechanism is known. That ballot is owed at this charter's trigger, before any re-attestation act under § 6; the signing-act ballot § 2a names this charter as its home.

## 6. The re-attestation duty (Stacy's section)

The one-time re-attestation of Spec 123's interim C1 records is owed by `.kiro/issues/2026-10-15-123-125b-u3-re-attestation.md` (Owners: Stacy, Thurgood). This charter holds the duty by that pointer and does not restate the record's enumeration or scope question. Its event is **an identity that distinguishes seats existing**, which is not the same event as this charter's trigger: if § 5 item 1 answers "one identity", the re-attestation's event has not happened, and the record says so in its own walk line.

**What the duty is, and what this charter owes it** *(Stacy, 2026-11-08, rule 9)*:

1. **The event.** The record's Trigger is `manual`, on an identity that distinguishes seats existing (re-ruled in this PR, with its reason and authority in the record). One distinct PR-authoring identity, which this charter's trigger and § 3 precondition #4 ask for, separates Peter from the agents. It does not separate one seat from another (signing-act ballot L265). So this charter's trigger firing is not the record's event, and neither is the arming PR merging. A re-attestation made under one shared agent identity would attest nothing that the `Agent:` trailers do not already say.
2. **What this charter owes the record at its trigger.** § 5 item 1 records the per-seat answer. The answer is appended to the record as a dated line, by me or by Thurgood:
   - **One per seat**: the record's event is the first commit or PR authored under a per-seat identity. At that event, Thurgood re-runs the record's listing command and I re-attest by whatever that identity makes available (the record's § "Open at the trigger").
   - **One identity, or a decline**: the record's event has not happened and may never happen. I put the record to Peter with two options: keep it open on the per-seat event, or close it under rule 5 with a dated line that names what stays unauthenticated (the 124 `signer:` rows and ten confirmation files of its listing, as moved since). I do not choose between them.
3. **Order.** No re-attestation act starts before the signing-act shape review's PR 2 has merged (§ 4 item 1).
4. **What I read.** At 125-B's CLOSEOUT pass (step 4), I check two things: that step 3's tasks amendment fired no record of mine, and that Task 6's carried-obligation line now points here or at the record. At each release walk and claims pass, a PR that claims the re-attestation was made under an identity that does not tell seats apart is a finding. I route it to the PR's author.

## 7. Walk

At each monthly health check (Thurgood, rule 6): has Peter created the distinct identity? If yes and this record has no line saying so, the trigger has fired: append the dated fired line, and § 5 is owed. If no: one walk line, `not fired`, and the § 3 state column is not re-read unless a setting is known to have changed. A PR that claims the PR-approval regime while the scope reads `proposed` is a finding, routed to Stacy.

## 8. Closing

This record closes (rule 5, dated outcome line, then `git mv` to `archive/`) when one of these happens:
- the vehicle of § 5 item 2 exists and names this record as its source (the charter closes into it); or
- Peter declines the layer (for example through Spec 131), and the decline is recorded here with the re-point it owes in the law that points here.
