---
id: signing-seat-brief
inclusion: manual
name: Signing Seat Brief
description: Every rule a C1 signing or confirming seat follows on a consumer-profile row (bound, own objects, hashes, signature shape, itemized assent, sheet placement, hold form, trailers, the one-line commit print, merge-only), each with its law clause and the place the claims pass checks it. A restatement of ratified clauses; it creates no rule. Load when briefing, running or auditing a signing act.
aliases: signing brief, seat brief, signing act, C1 signing, commit print, git log format, record absent link 4, hold line
---

# Signing Seat Brief

> **Audience framing**: this describes **DesignerPunk's own process**, not yours. **Worked example**: the C1 seats, the consumer-profile files under `canonical/profiles/consumer/`, `verify-signing-chain`, the ballot clauses and the claims passes are DesignerPunk's own. **Transferable**: an instruction document that agents are briefed with by path and commit, where every rule names the law it restates and the check that reads it, so a brief cannot drop a rule without the drop being visible.

**Date**: 2026-10-23
**Last Reviewed**: 2026-10-23
**Purpose**: The rules a C1 signing or confirming seat follows, each restating a ratified clause and naming the place the claims pass checks it
**Organization**: process-standard
**Scope**: cross-project
**Layer**: 2
**Relevant Tasks**: agent-architecture, audit, task-completion

---

## What this document is

This document creates no rule. Each rule below restates a ratified clause and cites it. Where this text and a cited clause differ, the clause governs, and the difference is a defect in this text.

The authorities it restates:
- ballot `.kiro/docs/ballots/2026-10-01-signing-act-chain.md` (RATIFIED 2026-10-01), §§ 2, 3, 4.3 and 4.6, with § 2 clause 3 as corrected by its 2026-10-21 erratum and § 2 clause 6 as amended 2026-10-22 by ballot `2026-10-22-hold-act-recorded-in-pr-body` (#444);
- ballot `.kiro/docs/ballots/2026-10-21-routes-floor-re-pointed-frontmatter-members.md` (RATIFIED 2026-10-22), applied as Spec 123 design § C18 clause 5, for which rows route;
- the C1 seat function and the signature format: Spec 123 design C16–C17 and Req 11.5.2, 11.5.4 and 11.5.6, implemented in `tools/agent-generator/regrounding/c1.ts` and `signatures.ts`.

Why it exists: on PR #445 all seven seats printed their signing commit in a form `--audit` link 4 cannot read, and all 20 acts read `record absent`. The rule was in the ballot (§ 4.3); the seat briefs dropped it. Record: `.kiro/issues/2026-10-23-audit-link4-rejects-sha-alone-commit-line.md`. Under the orchestrator's practice recorded there (§ 6), signing briefs quote this document by path and commit (`governance/signing-seat-brief.md@<sha>`).

Owner: Thurgood (Civitas steward), who maintains it. Edits are Peter-merged.

---

## The seat's rules

"Checked by" names where the check reads the rule: a `--ci` link runs on every PR inside the required context `122-diff-guard`; an `--audit` link and J are read by Stacy's claims pass after acceptance, never as a gate.

| # | Rule | Law clause | Checked by |
|---|---|---|---|
| S1 | **Sign only rows in bound.** A row is in bound when it is on the stale list or the unsigned-routed list your brief pastes. Both are printed by the freshness sweep (`npm run check:122:diff-guard`), taken before signing and re-taken each round. A row outside both lists is not yours to sign under this rule. | signing-act ballot § 2 clause 3 (erratum 2026-10-21); clause 5; which rows route: Spec 123 design § C18 clause 5 (a `re-pointed` frontmatter or members row routes; routes-floor ballot § 2) | `--ci` link 1 (F5, FU cases) |
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

This line is the conforming form (§ 4.3). Wiring it into the audit test as the conforming fixture is owed by ballot `.kiro/docs/ballots/2026-10-23-link4-candidate-first-sha-after-commit.md` (DRAFT) at its application.

---

## Keeping this document true

- **Edit site.** A ballot that amends a clause cited here reaches this document through the application's straggler sweep (`.kiro/docs/ballots/README.md` § "Conventions", edit discipline).
- **Fixture.** Owed by ballot `.kiro/docs/ballots/2026-10-23-link4-candidate-first-sha-after-commit.md` at its application (§ "The commit line").
- **Kind.** An edit here is Peter-merged (`governance/**`). It names its kind in the PR body (Task-Completion-Protocol § "Branch and PR Conventions").
