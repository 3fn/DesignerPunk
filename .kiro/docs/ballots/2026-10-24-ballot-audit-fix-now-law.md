# Ballot Measure: the ballot audit's fix-now LAW items (B-CI after the parity flip; Core Goals' historical pointers; two rules with no home)

**Date**: 2026-10-24
**Drafted by**: Thurgood (Civitas steward), at Peter's direction (fix-first, F-9, and "trust, but verify", F-2, ruled 2026-10-24; the fix-now list cleared now, relayed by the orchestrator). The fix-now list is § 4 of `.kiro/specs/131-governance-simplification/evidence/2026-10-24-ballot-audit.md`, plus `[THURGOOD R3]` "Corrected, with evidence" item 2 in `.kiro/specs/131-governance-simplification/feedback/design-outline.md`.
**Status**: **DRAFT**, not ratified. No edit site below is applied. A merge with this line still reading DRAFT is a recording defect, not a ratification.
**Base**: `main` at `e4e61eea2`. Every before-text below is quoted from that tree.
**Companion PR** (not this ballot): branch `fix/ballot-audit-fix-now-corrections` carries the same audit's CORRECTIONS and records. It corrects the descriptive text around items 1–3 (the guide's rule-5 premise sentence, `complete-task.sh`'s comments) without changing what either requires, and it files `.kiro/issues/2026-10-24-b-ci-post-flip-owed-acts.md`, the record that carries items 1–3 to this ballot. The two PRs are independent; neither's before-text is the other's after-text. **One overlap to watch**: if the companion merges first, the before-text of item 1 site 1 (the guide's rule-5 premise sentence) is the companion's corrected sentence, not the `e4e61eea2` text; item 1's after-text replaces whichever is present (§ 1, "Edit discipline note").
**Required reviewer**: **Stacy** — the census reader (README § "Conventions", "Instrument census"), the claims-pass reader of CI-provenance lines (CDG rule 6), the C1 confirmer and signer item 4's re-sign falls to, and the reader of the governance-edit-kind line.
**Consulted / reviewers**: **Lina** (item 4's True Native target is her framework doc; her read is in `lina-item4-read.md`, orchestrator notes, 2026-10-24); **Ada** (item 4's math target is her doc; her read in `ada-item4-read.md`, same folder); **Leonardo** (item 5 edits the Integration Guide, whose lead owner he is under `.kiro/issues/archive/2026-10-03-integration-guide-designer-friendly-rewrite-charter.md`); **Peter** (ratifier; item 4 edits Core Goals, his document).
**Class**: LAW. Each item changes what governance requires, or places ratified law in a new home with no ratified clause naming the edit (README § "three kinds": when in doubt, LAW).
**Cap**: six items. **Retroactivity**: none. Each item binds from its application merge.

> **Conflict of interest, stated first.** I authored B-CI (items 1–3), I own `complete-task.sh` and the `completion-criteria-parity` instrument, I drafted the TND ballot whose § 6.5 sets item 4's cost, and I wrote the audit that called item 5 and 6's homes "EXECUTION". That call was wrong (§ 5, § 6). Stacy's review and Peter's ruling are the checks.

---

## 0. Why these six are LAW, and what went to CORRECTION instead

| Audit item | Here as | Why not CORRECTION / EXECUTION |
|---|---|---|
| 3(a) rule 5's re-evaluation | item 1 | Rule 5 owed a re-evaluation at the flip; changing the rule is LAW. (Its premise *sentence*, which was simply false, is corrected in the companion PR.) |
| 3(a) rule 4 for dispatch lines | item 2 (with 3(c)) | A dispatch line's assertion is what the guide requires a reader to infer; narrowing it is LAW |
| 3(c) the dispatch set | item 2 | Enforcement code (`.kiro/hooks/**`) and a required gate's trigger (`.github/**`). README § "three kinds": enforcement code never serves as its own referent |
| 6 the `ci-provenance-line` row | item 3 | Adding a register row is LAW |
| 4 Core Goals L33, L35 | item 4 | The TND ballot (ratified) says so: "the Core Goals edit needs its own ballot and an identity-doc re-sign" (§ 6.5). The kind is surfaced as a fork (F-4) |
| 7 U3's install-region rule | item 5 | No ratified clause names a home for it. My audit's "EXECUTION" was wrong |
| 7 #12's rewrite-vehicle convention | item 6 | Same |

Went to the companion as CORRECTION: the BR roll (item 1), the signing-seat brief (item 2), the rule-5 premise sentence and `complete-task.sh` comments (item 3(a)/(b)), the four `governance/` historical pointers (item 4, Lina's and Ada's texts), and the Product MCP "conceptual" lines (item 8, on its own branch, held for re-confirm/re-sign).

---

## Item 1 — CDG § "CI provenance" rule 5: re-evaluated at the flip it named

**Problem evidence.** Rule 5 lets a doc carried by commit `D` cite CI runs at an earlier commit `<S>` if `<S>..<D>` changes only the spec's completion docs, summary docs and `tasks.md` checkboxes. Its premise was that no required check reads those paths, and it said "Rule 5 is re-evaluated at that flip, before it lands." The flip landed on 2026-10-03 (register row `completion-criteria-parity`, history 2026-10-03; `EXPECTED_COUNT=19`). `completion-criteria-parity` reads exactly those paths: the criteria table, Status and Evidence cells of parent completion docs, and `tasks.md`. No re-evaluation is recorded (`arming-2026-10-03-parity-flip.md` has no rule-5 or provenance read; Stacy's cross-check confirms). So a CI line at `<S>` can be compliant under rule 5 while `completion-criteria-parity` on `D` would read a different input than it did at `<S>`. The gate is not weakened (the PR's required check still runs on the merge ref of the final head), but the line can be read as saying more than was measured.

**Edit site 1**: `governance/completion-documentation-guide.md` rule 5, the premise paragraph.

Before (`e4e61eea2`, L195, the sentences after "The citation may be added in a docs-only commit after the runs finish."):
> **This rule rests on a premise**: no required check reads those paths. That holds for today's 18 contexts (verified 2026-09-27). **It stops holding when `completion-criteria-parity` becomes a required check (the Q2 flip)**, because that check reads exactly those paths. Rule 5 is re-evaluated at that flip, before it lands.

After (option (a), recommended):
> **This rule rests on a premise**: no required check other than `completion-criteria-parity` reads those paths (true of the 18 others; re-evaluated 2026-10-24 by ballot `2026-10-24-ballot-audit-fix-now-law` item 1). `completion-criteria-parity` reads exactly those paths, so **a CI line's result for `completion-criteria-parity` is a result at `<S>`, never at `D`**. A doc that reports parity's verdict on its own commit reports it as `local` (a run of `npm run check:completion-criteria-parity` at `D`), or not at all; the PR gate establishes it at merge. *(Amended <application date> by ballot 2026-10-24-ballot-audit-fix-now-law item 1; prior text at `<application base SHA>`.)*

**Edit discipline note.** If the companion PR has merged first, the before-text is its corrected sentence ("That held for the 18 required contexts of 2026-09-27. … its re-evaluation is open in `.kiro/issues/2026-10-24-b-ci-post-flip-owed-acts.md`. *(Corrected 2026-10-24 …)*"). The after-text replaces that whole premise paragraph from "**This rule rests on a premise**" to the end of the paragraph; anything else in it that does not match is a stop-and-report.

**Fork F-1** (surfaced, not picked):
- **(a)** narrow the premise and say parity's result does not carry from `<S>` to `D` (above). Cost: one paragraph. *Surviving counter*: it adds a sentence a doc author must read; a claims pass now has one more thing to check (a parity claim at `D` written up from a CI line).
- **(b)** leave rule 5 as it stands and record that its premise is false for one context. Cost: none now. *Surviving counter*: the guide keeps a rule whose stated premise is false, which is the defect this item exists to fix.
- There is no option that lets a doc cite a run on its own commit: the run follows the commit (rule 5's first sentence).

**Census** (CDG is an education home of `completion-criteria-parity`, so the item is presumptively in scope, condition 2; governance/ adds two instruments, condition 1):
- `**Census**: not in scope — completion-criteria-parity (scripts/check-completion-criteria-parity.ts and scripts/completion-claims/**) — rule text only, no instrument change; the checker parses no CI-provenance line (grep -n -i provenance over both paths at e4e61eea2 → 0 hits), so no verdict or surface can change`
- `**Census**: not in scope — check-section-citations (scripts/check-section-citations.ts, citing corpus governance/) — the edit adds or changes no get_section / get_document_* citation`
- `**Census**: not in scope — 122-diff-guard (tools/agent-generator/diff-guard.ts; governance/ is an input-closure root) — governance/ is an ordinary closure input; no rule, pattern or grammar the guard reads changes; the lock is refreshed at application, where its verdict is read`

**The census-mode wait, stated.** Ballot `2026-10-19-instrument-census-at-draft` § 2 and F-3 (A): the census mode and the row's `census` field exist before the first item presumptively in scope of an instrument leaves DRAFT. `completion-criteria-parity` has neither. This item is the first such item, so the owed act in `.kiro/issues/2026-10-19-census-mode-completion-criteria-parity.md` fires with this draft (dated line appended there in this PR). The line above is the `not in scope` form, not a census; **whether that form also waits for the field is the census reader's read** (Stacy). If it waits, items 1 and 2 wait for my census-mode PR; the other four do not.

---

## Item 2 — the dispatch set and what a dispatch line asserts (rule 4)

**Problem evidence.** `complete-task.sh` dispatches six workflows against the unit branch (`REQUIRED_WORKFLOWS`, count-asserted six). They produce 18 of the 19 required contexts. The seventh file, `completion-criteria-parity.yml`, has no `workflow_dispatch` and is not dispatched. Its exclusion was decided while it was "not required" (`.kiro/issues/archive/2026-09-27-unit-branch-ci-feedback.md`, its bullet: "its verdict is about a completion doc against its `tasks.md`, which is meaningful at the unit PR, and dispatching it would invite reading an advisory green as a gate"). At the flip the script's own C9 note ("If that script's workflow set ever changes, this array moves with it in the SAME recorded change") was not honoured, and no recorded change kept the exclusion. Meanwhile CDG rule 4 says a CI line with no `; not green:` tail "asserts that **every** required status context — the set `tools/agent-generator/verify-gate-registration.sh` asserts — was green at `<S>` … under its unit-branch dispatch name for a dispatch line". Since 2026-10-03 that set has 19 members and a dispatch produces 18, so every tail-less `branch-head dispatch` line asserts a context no dispatched run measured.

**Fork F-2** (surfaced, not picked; my recommendation is (a)):
- **(a) Keep `completion-criteria-parity` out of the dispatch set, by recorded decision, and narrow rule 4 for dispatch lines.** The exclusion's reason still holds, and the authoring-time feedback it would give already exists: `complete-task.sh` runs the same checker locally at every parent and unit-member completion (advisory, as decided at the 2026-10-02 sitting). Cost: one sentence in the guide; one comment line in the script. *Surviving counter*: a dispatch line can never report parity, so a multi-parent unit's first evidence of a parity red on CI is the unit PR; the local run is advisory and can be skipped (`--skip-parity`).
- **(b) Dispatch it.** Add `workflow_dispatch` and the unit-branch name expression (`${{ github.event_name == 'workflow_dispatch' && 'completion-criteria-parity (unit-branch)' || 'completion-criteria-parity' }}`) to `completion-criteria-parity.yml`; `REQUIRED_WORKFLOWS` 6 → 7 with its count-assert and messages; rule 4 unchanged. Cost: a `.github/**` change to a required gate's trigger and job name, which is outside the CI-regime standing scope (P1 is `lane-timing.yml` only), so it needs an issue-row grant naming and admitting the act (ballot `2026-09-27-ci-regime-standing-scope` § 3) and Stacy's ARMING read at its activating and fixing merges. *Surviving counter*: the archived reason — a dispatched green on a branch head can be read as the gate — returns for the one check whose verdict is about completion docs.

**Edit sites under (a):**

Site 1, `governance/completion-documentation-guide.md` rule 4. Before (`e4e61eea2`, L190):
> 4. **Every required check, one SHA.** A CI line without a `; not green:` tail asserts that **every** required status context — the set `tools/agent-generator/verify-gate-registration.sh` asserts — was green at `<S>`: under its required name for a gate line, and under its unit-branch dispatch name for a dispatch line. All of a line's runs are at the one commit `<S>` (each run's `headSha` shows it).

After:
> 4. **Every required check, one SHA.** A CI line without a `; not green:` tail asserts that **every** required status context — the set `tools/agent-generator/verify-gate-registration.sh` asserts — was green at `<S>`: under its required name for a gate line, and under its unit-branch dispatch name for a dispatch line. **A dispatch line's set excludes `completion-criteria-parity`, which is not dispatched** (ballot 2026-10-24-ballot-audit-fix-now-law item 2); a dispatch line asserts nothing about it, and naming it in the `; not green:` tail is not required. All of a line's runs are at the one commit `<S>` (each run's `headSha` shows it). *(Amended <application date> by ballot 2026-10-24-ballot-audit-fix-now-law item 2; prior text at `<application base SHA>`.)*

Site 2, `.kiro/hooks/complete-task.sh`, the `REQUIRED_WORKFLOWS` header comment (L106–111 at `e4e61eea2`; the companion PR rewrites the same block's description). After the sentence ending "(C9 discipline extended to CI dispatch — ballot B-CI § 5 grant item 2(a)).", the comment gains:
> `# The seventh workflow, completion-criteria-parity.yml, stays out of this array by recorded decision (ballot 2026-10-24-ballot-audit-fix-now-law item 2, F-2 (a)): its feedback comes from this script's local parity run, and its verdict is read at the unit PR.`
No code or count changes.

**Edit sites under (b)** (only if Peter takes (b)): the workflow file as above, by an issue-row grant filed at ratification; `complete-task.sh` `REQUIRED_WORKFLOWS` gains `"completion-criteria-parity.yml"`, the count-assert and its two messages move 6 → 7 and 18 → 19; `--dry-run-ci`'s "six" text → "seven"; rule 4 unchanged.

**Census**:
- `**Census**: not in scope — completion-criteria-parity (scripts/check-completion-criteria-parity.ts and scripts/completion-claims/**) — under (a) rule text and a comment only; under (b) a trigger and job-name change in the workflow file, the decision code and its inputs untouched; either way no verdict or surface can change` (the census-mode wait in item 1 applies here too)
- `**Census**: not in scope — check-section-citations (scripts/check-section-citations.ts, citing corpus governance/) — no citation added or changed`
- `**Census**: not in scope — 122-diff-guard (tools/agent-generator/diff-guard.ts; governance/ is an input-closure root) — ordinary closure input; the lock is refreshed at application`
- `complete-task.sh` is in no register row's `checks`, so it carries no census line.

---

## Item 3 — B-CI § 9 step 5: the `ci-provenance-line` register row, decided

**Problem evidence.** B-CI § 9 step 5: "Decide whether a `governance/classification-map.md` row is owed. The steward's read: **yes**, a row for `ci-provenance-line` at `check_state: proposed` (a parity presence-and-grammar check is a candidate, not armed). This is decided at ratification." It was not decided (BR roll: "not ruled at ratification and is carried open"). The CI-provenance line is ratified law with a decidable grammar and no register row, so nothing registers who keeps it true or whether a check is owed.

**Open for Peter — fork F-3** (surfaced, not picked):
- **(a) Add the row**, at `proposed`, `owner: thurgood`, `checks: []` (text below). Cost: one row; it registers an unbuilt candidate, and the register's count of unbuilt `proposed` rows goes 12 → 13 (audit § 3). *Surviving counter*: Spec 131 is weighing the cost of exactly these rows (outline § 3, row 14); adding one now, before that round, works against its direction.
- **(b) No row.** The line stays law in CDG with Stacy's claims-pass read as its only reader; the decision is recorded in B-CI § 9 by a dated line. Cost: none. *Surviving counter*: the line has no register entry naming its owner or its candidate check, which is the gap the register exists to show.

**Edit site under (a)**: `governance/classification-map.md`, a new entry after `### completion-criteria-parity`'s block:

```yaml
rule: "A completion doc SHALL declare where every run result it reports was measured, in one or more `**CI-provenance**:` header lines of the three fixed forms (local / branch-head dispatch @ <S> / PR gate #<n> @ <S> (merge ref)); a parent doc without one is non-compliant on its face; only a PR-gate line supports 'the gate is green'"
boundary_call:
  class: functional
  rationale: "Presence and grammar are decidable by the guide's regex; what a line supports is fixed by rule 3. Whether the cited runs are the ones the doc's claims rest on is judgment, and stays with the claims pass"
verification:
  disposition: barrier
  owner: thurgood
  check_state: proposed
  checks: []
education:
  disposition: "AUTHORED at B-CI (ballot 2026-09-27-b-ci-unit-branch-ci-feedback M2): completion-documentation-guide § 'CI provenance — where a green was measured' carries the rule, the grammar and rules 1–6. Nothing to prune. Candidate check: a presence-and-grammar pass in completion-criteria-parity over parent docs in scope (B-CI § 9 step 5), not built"
history:
  - { date: <application date>, change: "entry created by ballot 2026-10-24-ballot-audit-fix-now-law item 3, F-3 (a), closing B-CI § 9 step 5 (owed at ratification 2026-09-27, decided late). proposed, checks [], unbuilt; the claims pass reads the line meanwhile (CDG rule 6)", by: thurgood }
```

**Edit site under (b)**: `.kiro/docs/ballots/2026-09-27-b-ci-unit-branch-ci-feedback.md` § 9 step 5 gains a dated line: *"Decided <date> (Peter, ballot 2026-10-24-ballot-audit-fix-now-law item 3, F-3 (b)): no row."*

**Census**: `governance/classification-map.md` is loaded by two registered instruments (condition 1); the row adds no check:
- `**Census**: not in scope — check-section-citations (scripts/check-section-citations.ts, citing corpus governance/) — the row carries no get_section / get_document_* citation`
- `**Census**: not in scope — 122-diff-guard (tools/agent-generator/diff-guard.ts; governance/ is an input-closure root) — ordinary closure input; the lock is refreshed at application`

---

## Item 4 — Core Goals L33 and L35: stop pointing at `preserved-knowledge/` as current guidance

**Problem evidence.** TND § 8, Peter verbatim: the `preserved-knowledge` directory is "context and lessons learned from the previously failed attempts at building what is now DesignerPunk. They're the ideas DP is built from, so they're historical context rather than anything that we would point to today as reference material." TND § 6.5 lists `.kiro/steering/core-goals.md` L33 as a follow-up and says "the Core Goals edit needs its own ballot and an identity-doc re-sign." L35 is the same defect for the token-math file (Lina's and Ada's reads, 2026-10-24); TND did not list it. The two `governance/` pointers of the same class are corrected in the companion PR, with the owners' texts.

**Edit site**: `.kiro/steering/core-goals.md` § "Core Project Context". Before (`e4e61eea2`, L32–35):
> **For detailed architectural guidance, see:**
> - True Native Architecture: `preserved-knowledge/true-native-architecture-concepts.md`
> - Token System: `docs/token-system-overview.md`
> - Mathematical Foundation: `preserved-knowledge/token-architecture-2-0-mathematics.md`

After:
> **For detailed architectural guidance, see:**
> - True Native Architecture: Cross-Platform vs Platform-Specific Decision Framework (`cross-platform-vs-platform-specific-decision-framework`) § "Overview" (the Key Principle)
> - Token System: `docs/token-system-overview.md`
> - Mathematical Foundation: Rosetta System Principles (`rosetta-system-principles`) § "Mathematical Relationships"

L34 is unchanged (the path is current in-repo; Ada's read). The L33 target is Lina's (her read names the framework's Key Principle, live at framework L21–30, ratified by TND and executed at #425); the L35 target is Ada's text verbatim.

**Owed with the edit, never by hand** (the signed units; none is done by this ballot):
1. `canonical/operative-sets/core-goals.yaml` `#core-project-context`: the unit's `canonicalHash` goes stale; Stacy re-confirms (C16). Any item quoting L33–L35 is re-authored by the set's owner (Thurgood) to the new text first.
2. `canonical/profiles/consumer/always-set/core-goals.dispositions.yaml` `#core-project-context`: its subtraction-5 removal quotes L32–L35 verbatim. The profile author (Thurgood) re-authors the removal text to the new block; Stacy re-signs (C1).
3. Both are authoring acts in `canonical/**`, outside Thurgood's standing write scope: the application PR needs a grant for exactly those two files (a tasks-row or issue-row grant), unless Peter's ratification names them.
4. `canonical/generated.lock` refreshed by `check:122:diff-guard` at application; `rebuild_index` is not needed (Core Goals is an identity doc, never MCP-served).

**Fork F-4 — the kind** (surfaced, not picked):
- **(a) LAW, through this item** — TND § 6.5's ratified sentence binds ("needs its own ballot"). This draft is written that way.
- **(b) CORRECTION** — Ada's read: a pointer whose referent (TND § 8) held before the PR is a correction under the kinds README, and TND § 6.5's sentence was a cost estimate written while the replacement text was undecided. Under (b) this item is withdrawn and the same before→after lands in its own PR with an `**Edit kind**: … — CORRECTION` line; the re-sign (owed acts 1–2) stands either way.
- *Surviving counter to (a)*: a ballot for a two-line pointer fix is the kind of cost Spec 131 exists to cut. *To (b)*: it reads a ratified ballot's sentence as non-binding, which is the reading the rot-mode detector exists to catch; and Core Goals is Peter's document.

**Census**: Core Goals is loaded by 122-diff-guard (its input closure and the operative-set freshness sweep):
- `**Census**: not in scope — 122-diff-guard (tools/agent-generator/diff-guard.ts, with the operative-set freshness sweep and C1) — no instrument change; the sweep will report #core-project-context stale on both files, which is owed acts 1–2, not a verdict change of the instrument`

---

## Item 5 — U3's install-region rule gets a home in the guide

**Problem evidence.** Ballot `2026-10-03-123-b-u3-install-guide` § 3 (RATIFIED, Peter, 2026-10-13): "**The install region changes when the install process changes, with the why recorded.** It does **not** change by a vote on every edit. A typo or a broken link is fixed under the guide's ordinary maintenance. **A new platform is a new sibling section** under § Platforms … **A platform that needs a numbered step is an install-process change**, and it records its why under this discipline." The guide's region markers (`governance/DesignerPunk-Integration-Guide.md` L21 and the end marker) carry no rule; the ballot is its only home (audit row #29; Stacy: "its only charter trace is `canonical/agents/thurgood.md` L270 (writeScope path); no rule text"). A maintainer editing the region does not see it. No ratified clause names a home, so placing the text is LAW.

**Edit site**: `governance/DesignerPunk-Integration-Guide.md`, directly above the line `<!-- designerpunk:install-region:begin -->`, insert one HTML comment (outside the region, so `docs/consumer/INSTALL.md`'s derivation, `scripts/derive-install-doc.ts` `extractRegion`, is unchanged):

```
<!-- Region discipline (ballot 2026-10-03-123-b-u3-install-guide § 3, RATIFIED 2026-10-13): this region changes when the install process changes, with the why recorded; it does not change by a vote on every edit, and a typo or broken link is ordinary maintenance. A new platform is a new sibling section under § Platforms with no numbered path steps; a platform that needs a numbered step is an install-process change and records its why. Home placed by ballot 2026-10-24-ballot-audit-fix-now-law item 5. -->
```

*Surviving counter*: an HTML comment is invisible in rendered views and served text may strip it, so a reader of the rendered guide still does not see the rule; a visible line before the region would change what designers read first, which #442's ruling (the region keeps its developer voice, byte-identical) argues against. The comment is the home for the editor of the source, which is who the rule binds.

**Census**: the guide is an input of two registered instruments only as a `governance/` file (condition 1); `scripts/derive-install-doc.ts` and its test are in no register row's `checks`:
- `**Census**: not in scope — check-section-citations (scripts/check-section-citations.ts, citing corpus governance/) — the comment carries no get_section / get_document_* citation`
- `**Census**: not in scope — 122-diff-guard (tools/agent-generator/diff-guard.ts; governance/ is an input-closure root) — ordinary closure input; the lock is refreshed at application`

---

## Item 6 — #12 D4's rewrite-vehicle convention gets a home in the register's Methodology Notes

**Problem evidence.** Ballot `2026-09-18-u1b-campaign-closeout-verdict` Decision 4 (RATIFIED, Peter, 2026-09-18): "**Wave-4 form is the STANDING convention** … contradiction-rewrites route to the owning agent's fix PR with a verification obligation stated at routing time; the wave-2 hunk form is reserved for rewrites sharing territory with a same-wave prune." The same ballot's other standing law (notes 6–7) lives in `governance/classification-map.md` § "Methodology Notes"; D4 lives only in the ballot (audit row #12; grep: no record, no doc). The next arming campaign (the color-token enforcement candidate) would not find it. No ratified clause names a home.

**Edit site**: `governance/classification-map.md` § "Methodology Notes", after note 7 (`e4e61eea2` L47), insert:

> 8. **Rewrite vehicle for contradictions** (ballot `2026-09-18-u1b-campaign-closeout-verdict` Decision 4, RATIFIED Peter 2026-09-18; home placed by ballot 2026-10-24-ballot-audit-fix-now-law item 6). A wave that finds a contradiction to rewrite routes it to the owning agent's fix PR, with a verification obligation stated at routing time (the wave-4 form). The wave-2 form, a rewrite shipped as a hunk in the wave's own prune diff, is reserved for a rewrite that shares territory with a same-wave prune.

*Surviving counter*: § "Methodology Notes" is headed "measurement law — U1 pilot verdicts carried into the U1b campaign", and D4 is a method rule for campaigns after U1b; a later campaign's author may not look under that heading. The alternative home, a new register section, is more text for one sentence.

**Census**:
- `**Census**: not in scope — check-section-citations (scripts/check-section-citations.ts, citing corpus governance/) — no citation added`
- `**Census**: not in scope — 122-diff-guard (tools/agent-generator/diff-guard.ts; governance/ is an input-closure root) — ordinary closure input; the lock is refreshed at application`

---

## 7. Counter-argument (after fold-back)

**Run against the whole ballot**: six items in one ballot for a spec (131) that is about reducing ceremony. *Folded*: I moved everything the kinds test lets me call CORRECTION into the companion PRs (the branch `fix/ballot-audit-fix-now-corrections`, and `fix/ballot-audit-product-mcp-correction` for the held Product MCP lines), and I kept each item here independent, so Peter can ratify, modify or reject them one by one. *Folded*: item 2's two options each cost less than doing nothing about rule 4, because today's text over-claims on every dispatch line.

**What survives**:
1. **Items 5 and 6 may be over-classified.** The kinds README allows a CORRECTION of an omission whose referent is ratified law that held before the PR, and both items restate ratified text without changing what it requires. I called them LAW because no clause names the home and the brief's test says "when in doubt, LAW". If Peter or Stacy reads them as CORRECTION, they leave this ballot unchanged and land as a CORRECTION PR.
2. **The census-mode wait may hold items 1–2 behind a build I have not done.** If Stacy reads the F-3 (A) wait as applying to the `not in scope` form, items 1 and 2 cannot leave DRAFT until I ship the census mode for `completion-criteria-parity`; that is my owed act, and it fired with this draft.
3. **Item 4's re-sign costs two seats a signed act** for two pointer lines in a block the consumer profile subtracts entirely; consumers never see either line. The in-repo copy is the only reader helped.

**Forks for Peter**: F-1 (rule 5), F-2 (dispatch), F-3 (the row), F-4 (Core Goals' kind). None is picked here.

## 8. Application (on ratification, one PR, Peter-merged)

1. Flip this Status line to `**Status**: **RATIFIED (Peter, <date>)** — <tail>` and commit it before any edit site (README § "The Ratification Protocol"); add the BR roll entry in the same commit.
2. Apply each ratified item exactly as written; stop on any before-text that does not match, and report.
3. Item 4: the operative-set and dispositions re-authoring under the grant, then Stacy's re-confirm and re-sign, in the same PR (owed acts 1–3).
4. Straggler sweep: `git grep -n "today's 18 contexts\|re-evaluated at that flip"`, `git grep -n "preserved-knowledge/" -- .kiro/steering governance`, `git grep -n -c "2026-10-24-ballot-audit-fix-now-law"`.
5. `npm run build:generator`; `npm run -s check:122:diff-guard` (the lock refresh it writes is committed); `npm run -s check:section-citations`; `rebuild_index` (CDG and the register are served docs).
6. Close `.kiro/issues/2026-10-24-b-ci-post-flip-owed-acts.md` by rule 5's dated outcome line in the application PR.

## 9. Review round record

*(empty — DRAFT)*
