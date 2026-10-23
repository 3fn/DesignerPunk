---
id: signing-seat-brief
inclusion: manual
name: Signing Seat Brief
description: Every rule a C1 signing or confirming seat follows on a consumer-profile row (bound, own objects, hashes, signature shape, itemized assent, sheet placement, hold form, trailers, the one-line commit print, merge-only), each with its law clause and the place the claims pass checks it, plus the orchestrator's duties when it briefs a seat (quote this doc by path@sha, seats in sequence, the early audit after the first seat). Load when briefing, running or auditing a signing act.
aliases: signing brief, seat brief, signing act, C1 signing, commit print, git log format, record absent link 4, hold line, early audit
---

# Signing Seat Brief

> **Audience framing**: this describes **DesignerPunk's own process**, not yours. **Worked example**: the C1 seats, the consumer-profile files under `canonical/profiles/consumer/`, `verify-signing-chain`, the ballot clauses and the claims passes are DesignerPunk's own. **Transferable**: an instruction document that agents are briefed with by path and commit, where every rule names the law it restates and the check that reads it, so a brief cannot drop a rule without the drop being visible.

**Date**: 2026-10-23
**Last Reviewed**: 2026-10-23
**Purpose**: The rules a C1 signing or confirming seat follows, each citing its law clause and the place the claims pass checks it, and the orchestrator's duties when it briefs a seat
**Organization**: process-standard
**Scope**: cross-project
**Layer**: 2
**Relevant Tasks**: agent-architecture, audit, task-completion

---

## What this document is

This document creates no rule. Each seat rule below restates a ratified clause and cites it. Where this text and a cited clause differ, the clause governs, and the difference is a defect in this text. The orchestrator section records Peter's 2026-10-23 ruling on the joint recommendation (Thurgood and Stacy, R2): those duties are practice, not law. Record: `.kiro/issues/2026-10-23-audit-link4-rejects-sha-alone-commit-line.md`.

Why it exists: on PR #445 all seven seats printed their signing commit in a form `--audit` link 4 cannot read, and all 20 acts read `record absent`. The rule was in the ballot (`2026-10-01-signing-act-chain.md` § 4.3); the seat briefs dropped it. A seat follows its brief exactly, so the rule has to reach the seat through the brief. This document is what the brief points at.

Who reads it:
- **a seat** briefed to sign or confirm a row: § "The seat's rules";
- **the orchestrator** that writes the brief: § "The orchestrator's duties".

Owner: Thurgood (Civitas steward), who maintains it. Edits are Peter-merged.

---

## The seat's rules

"Checked by" names where the check reads the rule: a `--ci` link runs on every PR inside the required context `122-diff-guard`; an `--audit` link and J are read by Stacy's claims pass after acceptance, never as a gate.

| # | Rule | Law clause | Checked by |
|---|---|---|---|
| S1 | **Sign only rows in bound.** A row is in bound when it is on the stale list or the unsigned-routed list your brief pastes. Both are printed by the freshness sweep (`npm run check:122:diff-guard`), taken before signing and re-taken each round. A row outside both lists is not yours to sign under this rule. | signing-act ballot § 2 clause 3 (erratum 2026-10-21); clause 5 | `--ci` link 1 (F5, FU cases) |
| S2 | **Touch only your own objects.** You may write the row's `signature` (or `confirmation`) sub-object, and your section of the row's sheet. Every other field is authoring, not signing: `disposition`, `destination`, `removals`, `cites`, overlay text, operative-set items, any canonical source, your own charter. The signer is `c1Seat(owner)`: the owner, except where the owner is the profile author (Thurgood), where it is Stacy. So Stacy signs the rows of `thurgood.dispositions.yaml` and the `_shared.dispositions.yaml` members Thurgood owns (all of them today). | § 2 clauses 1, 2, 4; `tools/agent-generator/regrounding/c1.ts` | `--ci` link 2 (F4, F12, F12′) and link 3 |
| S3 | **Leave nothing else in the tree.** A helper script for hashes lives in your session's scratchpad and imports the worktree's modules by absolute path. It never lives in the repo. Before committing, `git status --porcelain` shows only your dispositions file and your sheet. | § 2 clause 6 (iii): every hunk, and every commit carrying one, stays inside the signer's objects | `--ci` link 2 (commit grain) |
| S4 | **Recompute both hashes; never copy them.** `canonicalHash` equals the unit's pin in the profile's overlay, `<profile>.overlay.md` (`## @unit #<anchor> @ sha256:…` or `## @entry <key> @ sha256:…`), and your recomputation over the current canonical unit (for a frontmatter entry, `hashEntry(value)`, `regrounding/hash.ts`). If the two differ, stop and report: the pin is authoring, not yours to fix. `renderedHash` is `renderedHashOf(readConsumerSpans(<worktree>), rowSpanSource(<canonical source>, <section>, <key>))` (`tools/agent-generator/derive.ts`), over the committed `canonical/_consumer-output/`. A re-sign that moves neither hash is out of bound. | Spec 123 design C17 valve 1 (Req 11.5.6); § 2 clause 3 | `--ci` link 1 (F5) and the freshness sweep (stale signature) |
| S5 | **Write the signature in its closed shape.** Fields: `signer`, `canonicalHash`, `renderedHash`, then exactly one of `assent: {surviving: [...]}` or `refuse: should-re-point`, then `evidence: canonical/profiles/consumer/signatures/<sheet>.md#<anchor>`. No other field. Example: `canonical/profiles/consumer/ada.dispositions.yaml`, row `frontmatter."description"`, as committed at `1ddac1d23` (one-line flow form, appended to the row's existing object). | `regrounding/signatures.ts` `SIGNATURE_FIELDS` (design C17) | diff-guard's dispositions validation (format, bare, wrong signer) |
| S6 | **Keep the assent honest.** `surviving` names exactly the operative-set items that the unit's own rendering states or entails. Write `[]` when none survive; it is itemized, not bare. Never pad the list, and never trim it toward an answer the brief seems to expect. Where the function does not survive, refuse (`should-re-point`). | Req 11.5.6 (valve 2) with the 5e entailment rule (Req 11.6.5e) | `--audit` link 7 (the rendered line was read) and J, link 8 (a blind seat re-judges a sample); not mechanical |
| S7 | **Place your sheet section correctly.** Add a section headed `` ## `#<anchor>` `` with a `signer: <seat>` line, before the sheet's first `## Signing run summary` or `## Re-sign run summary` heading, or at the end where the sheet has neither. Never edit another seat's section, and never edit the preamble unless the whole sheet is yours. | § 2 clause 1 (b); placement is the sheets' convention (the #445 sheets) | `--ci` link 2 (a section's `signer:` equals the trailer) |
| S8 | **A hold is a line, not an edit.** If you will not sign yet ("not yet, until X"), make no sheet, signature or confirmation edit. Report the line for the PR body's acts list: `<dispositions file>#<row> — <seat> — hold: <reason>` for a signature; `<operative-set file>#<anchor> — <seat> — hold: <reason>` for a confirmation. A hold is not a signing act. It resolves as the row's later in-bound act, or as **withdrawn** when the row leaves the bound. | § 2 clause 6 (as amended 2026-10-22, ballot `2026-10-22-hold-act-recorded-in-pr-body`) | the claims pass reads the PR body |
| S9 | **Both trailers in the final paragraph.** `Agent: <Seat>` and `Co-Authored-By: <model attribution>` sit together in the message's last paragraph; git reads trailers only from there. Check before committing: `git interpret-trailers --parse` over the message text prints both lines. | § 2 clause 6 (ii); § 3 link 3 | `--ci` link 3 (no trailer, two trailers, or one above the final paragraph fails) |
| S10 | **Commit and print in one call, in this form.** See § "The commit line" below. One line comes out: the full SHA, a space, the subject. Never `;` between the commit and the log, never a pipe on the commit, never the commit and the log in separate calls, and never another format (`%h%n%B`, `%H%n%B` and `%h%n%b` all read `record absent` today). | § 4.3: success evidence (b), and "seat briefs commit as `git commit … && git log -1 --format='%H %s'`" | `--audit` link 4 |
| S11 | **Merge-only.** Never amend, rebase, cherry-pick, `merge --squash` or re-commit your commit. If it fails CI, make a new commit. Your commit enters the unit branch by merge or fast-forward, with its SHA unchanged. | § 4.6 (Lina's merge-only rule) | `--audit` H1: a rewritten SHA reads `record absent`, read through the parent chain under `refs/pull/<N>/head` |
| S12 | **Report your acts.** Return one line per act for the PR body: `<dispositions file>#<row> — <seat> — <commit sha7>`, plus any S8 hold lines. | § 2 clause 6 (iv) | the claims pass reads the PR body |

### The commit line

The heredoc form keeps the `&&` on the `git commit` line, before the message (§ 4.3, convention note):

```bash
git commit -q -F - <<'EOF' && git log -1 --format='%H %s'
<Seat> first signatures (C1): <rows> — <assent|refuse>

<body>

Agent: <Seat>
Co-Authored-By: <model attribution>
EOF
```

The output is one line: `<40-hex sha> <subject>`. That line is what `--audit` link 4 reads to find the call that created the commit.

This line is the conforming form. When the 2026-10-23 link-4 ballot is applied, the audit test is to take it from this document as its conforming fixture, so the document and the parser cannot drift apart silently.

---

## The orchestrator's duties

These are practice, from Peter's ruling of 2026-10-23 ("Proceed with the joint recommendation"). They are not law: omitting one is not a finding on a seat. The audit verdicts stay Stacy's.

| # | Duty | Why |
|---|---|---|
| O1 | **Quote this document in every signing or confirming brief** as `governance/signing-seat-brief.md@<sha>`, where `<sha>` is a `main` commit that carries it. Point the seat at § "The seat's rules"; do not paraphrase them. Paste the bound lists (S1) into the brief. | Both #445 misses were in brief assembly. A quoted path@sha shows, in the seat's first message, which rules the brief carried. (It shows in the subagent's first user message and in the parent's `tool_use` input; link 6's `prompt_snapshot` is the charter, not the brief.) |
| O2 | **Run seats one at a time on one worktree.** Each seat starts from the previous seat's commit. | Two seats in one tree at once can stage each other's files (S3, link 2). |
| O3 | **Run the early audit after the first seat commits**, before the next seat starts and before the PR opens: `npx tsx tools/agent-generator/regrounding/verify-signing-chain.ts --audit --branch <unit-branch>`. If that seat's act reads anything but `anchored`, fix the brief before the next seat runs. | A miss caught after the first seat costs one brief fix. Caught after all seats, it costs one remedy per seat: a re-commit that moves no hash fails F5, and merge-only bars amending. The run is feedback, not a verdict: its output is not a claims-pass record. |
| O4 | **Carry the record into the PR body**: the stale and unsigned-routed lists as re-taken for the round (S1), and every act and hold line (S8, S12). | § 2 clauses 3 and 6 (iv). |

---

## Keeping this document true

- **Edit site.** A ballot that amends a clause cited here lists this document as one of its edit sites, and its application updates the citing row in the same PR.
- **Fixture.** The audit test takes § "The commit line" as its conforming fixture. That wiring is part of the 2026-10-23 link-4 ballot's application, not of this document's first commit.
- **Kind.** An edit here is Peter-merged (`governance/**`). It names its kind in the PR body (Task-Completion-Protocol § "Branch and PR Conventions").
