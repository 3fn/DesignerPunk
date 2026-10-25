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
- ballot `.kiro/docs/ballots/2026-10-01-signing-act-chain.md` (RATIFIED 2026-10-01), §§ 2, 3, 4.3, 4.6 and 5.3, with § 2 clause 3 as corrected by its 2026-10-21 erratum and § 2 clause 6 as amended 2026-10-22 by ballot `2026-10-22-hold-act-recorded-in-pr-body` (#444);
- ballot `.kiro/docs/ballots/2026-10-21-routes-floor-re-pointed-frontmatter-members.md` (RATIFIED 2026-10-22), applied as Spec 123 design § C18 clause 5, for which rows route;
- the C1 seat function, the signature format and its audit: Spec 123 design C16–C17 and Req 11.5.2, 11.5.4, 11.5.6 and 11.5.7, implemented in `tools/agent-generator/regrounding/c1.ts` and `signatures.ts`.

Why it exists: on PR #445 all seven seats printed their signing commit in a form `--audit` link 4 cannot read, and all 20 acts read `record absent`. The rule was in the ballot (§ 4.3); the seat briefs dropped it. Record: `.kiro/issues/2026-10-23-audit-link4-rejects-sha-alone-commit-line.md`. Under the orchestrator's practice recorded there (§ 6), signing briefs quote this document by path and commit (`governance/signing-seat-brief.md@<sha>`).

Owner: Thurgood (Civitas steward), who maintains it. Edits are Peter-merged.

---

## The seat's rules

"Checked by" names where a check reads the rule. A `--ci` link runs on every PR, inside the required context `122-diff-guard`. An `--audit` link and J run after acceptance and never gate: Stacy's claims pass reads them, except on Stacy-signed acts, where the § 5.3 delegate runs `--audit` and Peter runs J. "The PR body" is read as `gh pr view <n> --json body`, never from the squash message.

| # | Rule | Law clause | Checked by |
|---|---|---|---|
| S1 | **Sign only rows in bound.** A row is in bound when it is on the stale list or the unsigned-routed list your brief pastes. The freshness sweep (`npm run check:122:diff-guard`) prints both lists. They are taken before signing, re-taken each round, and pasted into the PR body. A row outside both lists is not yours to sign under this rule. | signing-act ballot § 2 clause 3 (erratum 2026-10-21); clause 5. Which rows route: Spec 123 design § C18 clause 5 (a `re-pointed` frontmatter or members row routes; routes-floor ballot § 2) | `--ci` link 1 (F5, FU cases); the pasted lists, read in the PR body |
| S2 | **Touch only your own objects.** You may write the row's `signature` (or `confirmation`) sub-object, and your section of the row's sheet. Every other field is authoring, not signing: `disposition`, `destination`, `removals`, `cites`, overlay text, operative-set items, any canonical source, your own charter. The signer is `c1Seat(owner)`: the owner, except where the owner is the profile author (Thurgood), in which case it is Stacy. So Stacy signs the rows of `thurgood.dispositions.yaml` and the `_shared.dispositions.yaml` members Thurgood owns (that file's header names them). | § 2 clauses 1, 2, 4; `tools/agent-generator/regrounding/c1.ts` | `--ci` link 2 (F4, F12, F12′) and link 3 |
| S3 | **Your commit carries only your objects.** Every hunk, and every commit that carries one, stays inside your objects. A helper script kept outside the repo is one way to hold that. | § 2 clause 6 (iii) | `--ci` link 2 (commit grain) |
| S4 | **The hashes are the current values.** A stale hash fails, and so does a re-sign that moves neither hash. How each is computed (the sweep's reference is `regrounding/freshness.ts` L608–612): `canonicalHash` is the current canonical unit's hash. For a body unit that is `hashText(unit text)`, the unit taken from `partition(body).units`. For a frontmatter entry it is `hashEntry(value)`, from `entryTree(frontmatter).units`. For a shared member it is `hashEntry(member)`, from `canonical/shared/shared-catalog.yaml`. Where the row has an overlay pin (`<profile>.overlay.md`: `## @unit #<anchor> @ sha256:…` or `## @entry <key> @ sha256:…`; re-pointed rows have one, `no-consumer-counterpart` and `superseded-by` rows do not), the pin must equal that hash. If it does not, stop and report: the pin is authoring. `renderedHash` is `renderedHashOf(readConsumerSpans(<worktree>), rowSpanSource(<source>, <section>, <key>))` (`tools/agent-generator/derive.ts`), over the committed `canonical/_consumer-output/`. The arguments: `<source>` is the dispositions file's top-level `source:`; `<section>` is `body`, `frontmatter` or `members`; `<key>` is the row key exactly as written. Body keys include the `#` (`#identity`), frontmatter keys are the entry path, and members use the catalog id. If `readConsumerSpans` returns `undefined` (no rendering), stop and report: the sweep reads that as `signature-unverifiable`. | Spec 123 design C17 valve 1 (Req 11.5.6); § 2 clause 3; § 2 clause 4 (the pin is authoring) | `--ci` link 1 (F5) and the freshness sweep (stale signature) |
| S5 | **The signature has a closed shape.** Its fields are `signer`, `canonicalHash` and `renderedHash`, then exactly one of `assent: {surviving: [...]}` or `refuse: should-re-point`, then `evidence: canonical/profiles/consumer/signatures/<sheet>.md#<anchor>`. No other field. Two examples, each in the one-line flow form, appended to the row's existing object. A frontmatter row: `canonical/profiles/consumer/ada.dispositions.yaml` row `frontmatter."description"` at `1ddac1d23` (evidence `…/ada.md#frontmatter:description`, `surviving: []`). A body row: the same file, row `body."#identity"` at `05513944e` (key and destination `#identity`, evidence `…/ada.md#identity`, `canonicalHash` by `hashText`, an itemized non-empty `surviving`). | § 2 clause 1 (a), the closed field set; `regrounding/signatures.ts` `SIGNATURE_FIELDS` (design C17) | the dispositions validation in the freshness sweep that `check:122:diff-guard` runs (format, bare, wrong signer) |
| S6 | **The assent is itemized and honest.** `surviving` names exactly the operative-set items that the unit's own rendering states or entails. `[]` when none survive is itemized, not bare. The list is never padded, and never trimmed toward an answer the brief seems to expect. Where the function does not survive, the act is a refusal (`should-re-point`). | Req 11.5.6 (valve 2) with the 5e entailment rule (Req 11.6.5e); Req 11.5.7 (the assent audited) | `--audit` link 7 (the rendered line was read); the claims pass's Req 11.5.7 spot-check of itemized assents against the rendering, with the fraction counted (Peter samples the Stacy-signed ones); J, link 8 (a blind seat re-judges a sample). Not mechanical |
| S7 | **Your sheet section is yours alone.** It is headed `` ## `#<anchor>` ``, where the anchor is the evidence anchor (`#identity` for a body row, `#frontmatter:<path>` for a frontmatter row), and it carries a `signer: <seat>` line. You do not edit another seat's section. The preamble counts as your object only when every section of the sheet names you. *Convention, not law, and no check reads it*: the #445 sheets place new sections before the first `## Signing run summary` or `## Re-sign run summary` heading, or at the end where there is neither. | § 2 clause 1 (b); the preamble reading is the instrument's (`verify-signing-chain.ts` header L74–75) | `--ci` link 2 (a section's `signer:` equals the trailer) |
| S8 | **A hold is a line, not an edit.** "Not yet, until X" makes no sheet, signature or confirmation edit. It is a line in the PR body's acts list: `<dispositions file>#<row> — <seat> — hold: <reason>` for a signature, or `<operative-set file>#<anchor> — <seat> — hold: <reason>` for a confirmation. A hold is not a signing act. It resolves as the row's later in-bound act, or as **withdrawn** when the row leaves the bound. | § 2 clause 6 (as amended 2026-10-22, ballot `2026-10-22-hold-act-recorded-in-pr-body`) | the claims pass reads the PR body |
| S9 | **`Agent:` is a trailer of the final paragraph.** Git reads trailers only from the message's last paragraph. A `Co-Authored-By:` line (the harness's attribution, not signing law) in a later paragraph of its own pushes `Agent:` out of git's trailer block, and the act then fails link 3. So both sit together in the final paragraph. `git interpret-trailers --parse` over the message text is a way to check this before committing. | § 2 clause 6 (ii); § 3 link 3 | `--ci` link 3 (no trailer, two trailers, or one above the final paragraph fails) |
| S10 | **Commit and print in one call, in the convention's form.** See § "The commit line" below. One line comes out: the full SHA, a space, the subject. The commit's success shows only through `&&` (or `set -e`) into the `git log`, in the same call. Other formats read `record absent` under § 4.3 as it stands (`%h%n%B`, `%H%n%B` and `%h%n%b` did on #445), and a `;` or a pipe on the commit reads `anomaly`. | § 4.3: success evidence (b), and "seat briefs commit as `git commit … && git log -1 --format='%H %s'`" | `--audit` link 4 |
| S11 | **Merge only.** Seat commits enter a unit branch by merge only (`--no-ff`, or a fast-forward), both of which keep the seat's SHA. They are never rebased, amended, cherry-picked, `merge --squash`-ed or re-committed from a seat's diff. A commit that fails CI is followed by a new commit. Conflicts are resolved in the merge commit, never by rebasing the side branch. | § 4.6 (Lina's merge-only rule) | `--audit` link 4: a rewritten SHA has no creating transcript and reads `record absent`, read through the parent chain under `refs/pull/<N>/head`. `--ci` F13: a merge that writes signature content no parent carried fails |
| S12 | **Every act is reported.** Each act is a line in the PR body: `<dispositions file>#<row> — <seat> — <commit sha7>`. A refusal is reported like any act. Any S8 hold lines go beside them. A refusal is a fact for the report, not a reason to change the judgment (S6): it stands until the profile author's re-disposition is answered by an in-bound act, and while it stands the profile's real test reads it as red (S-T3, "zero standing refusals", `tools/agent-generator/__tests__/consumer-profile.real.test.ts` L187). | § 2 clause 6 (iv); clause 4 (a re-disposition answering a refusal is authoring) | the claims pass reads the PR body |

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

This line is the conforming form (§ 4.3). Wiring it into the audit test as the conforming fixture (P8) is owed by ballot `.kiro/docs/ballots/2026-10-23-link4-candidate-first-sha-after-commit.md`, RATIFIED (Peter, 2026-10-23), at its application. That application waits for its start condition, Spec 129's first unit merge (the ballot's § 5), and it rewrites this sentence when it lands. *(Corrected 2026-10-24: this sentence called the ballot DRAFT; prior text at `e4e61eea2`.)*

---

## Keeping this document true

- **Edit site.** A ballot that amends a clause cited here reaches this document through the application's straggler sweep (`.kiro/docs/ballots/README.md` § "Conventions", edit discipline).
- **Fixture.** Owed (P8) by ballot `.kiro/docs/ballots/2026-10-23-link4-candidate-first-sha-after-commit.md`, RATIFIED 2026-10-23, at its application after Spec 129's first unit merge (§ "The commit line"). *(Corrected 2026-10-24; prior text at `e4e61eea2`.)*
- **Kind.** An edit here is Peter-merged (`governance/**`). It names its kind in the PR body (Task-Completion-Protocol § "Branch and PR Conventions").
