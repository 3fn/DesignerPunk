# Issue: `completion-criteria-parity` does not enforce the closed Status vocabulary (known gap D-2), plus four lows

**Date**: 2026-10-03
**Status**: CLOSED 2026-10-19: the exact-match checker and the 360 cells, normalised by their owners, landed in the fixing PR `fix/d2-status-exact-match` (§ "Outcome (2026-10-19)", below). Archived in that PR, effective at its merge. *(Was: ACTIVE. It carries a grant, which does nothing until Peter's merge activates it. *(2026-10-19, Thurgood: S4 guide line applied by PR `chore/ballot-sitting-2-application`; open for the checker fix, § "S4 applied (2026-10-19)".)*)*
**Owner**: Thurgood (instrument owner; register row `completion-criteria-parity`, `owner: thurgood`).
**Trigger**: `manual` — this record's fixing PR merges: the checker fix (`parseStatus` exact-match, `[STATUS_NONCOMPLIANT]`, the fixtures incl. a criterion marked `—`, the live-corpus run before merge), the Req 6.4 erratum, the `design.md` L217 correction and the lows of § 3. *(Re-ruled 2026-10-19, Thurgood: S4 (the guide's status-marks line) is ratified and applied in PR `chore/ballot-sitting-2-application`, so the law now states what the gate is to enforce, and the close moves to the checker fix. Authority: the owner's Trigger-line right (README rule 9) and ballot `2026-10-18-sitting-2-subtask-tests-tasks-sweep-criteria-form` (RATIFIED, Peter 2026-10-18/19). The superseded 2026-10-18 Trigger line, verbatim, is the next line.)*
**Superseded trigger (re-ruled 2026-10-19; verbatim)**: `manual` — the capped sitting's ballot (sitting item S4, a rider) merges; the checker fix follows it in this record's fixing PR. Written as `merge:#<N>` once the ballot PR is known. *(Re-ruled 2026-10-18, Thurgood: the old first clause, "before the next RELEASE claims pass", fired at the 15.1.0 RELEASE pass and again at 16.0.0's with the gap still open, and the guide line is governance law that cannot ship without a ballot, so the ballot is the next event, not the fix. Authority: the owner's Trigger-line right (README rule 9), re-ruled under rule 11 in a diff carrying this dated reason, and Peter's routing of 2026-10-18 ("Go on the W-1 records PR and the capped sitting", relayed in the orchestrator's brief; the PR body cites it). The superseded trigger, verbatim:)* kept verbatim in the next block.
**Class**: P2 obligation (guard) · defect *(set 2026-10-18, Thurgood, rule 12. The required gate accepts a Status cell outside the closed vocabulary (`Partial`, `Done`, `N/A`, `✅ (partially)`) as claiming, so a partial result can pass without the follow-up link the guide requires: a guard weaker than its claim.)*
**Superseded trigger (re-ruled 2026-10-18; verbatim)**: **whichever comes first**:
- before the next RELEASE claims pass;
- the first completion doc observed, by anyone, with a Status cell outside the closed vocabulary.
**Source**:
- the register row's 2026-10-03 history line ("KNOWN GAP D-2 …"), merged at #292 (`8bd4bb50`);
- Stacy's fixture specification, `.kiro/specs/127-completion-claims-integrity/completion/arming-2026-10-03-parity-flip-fixtures.md` § 5 items 1, 4, 5, 6, 7 and 12 (#291);
- **Peter's ruling, 2026-10-03, verbatim: "flip now and record the gap".**

---

## 1. The gap (D-2)

**The law**:
- The register rule requires "a Status mark … per row".
- `governance/completion-documentation-guide.md` § "Status vocabulary" names exactly three marks: **✅ verified met**, **⚠️ verified unmet or partial**, which "MUST link a tracking issue or follow-up task", and **❌ verified absent**.

**The checker** (`scripts/completion-claims/completion-doc.ts`, `parseStatus`, L98–105):
- It maps any cell *containing* ✅, ⚠️ or ❌ to that mark.
- It maps `—`, `-` or `–` (exactly) to the annotation marker, which claims no verdict.
- **Anything else becomes `'other'`, and `'other'` counts as `claiming`** (L224: `claiming: status !== '—'`).
- The ⚠️ follow-up-link check fires only on `⚠️`.

**The consequence**: a partial result written as `Partial`, `Done` or `N/A`, with test or command evidence and no link, passes the gate. That is the "more polite ✅" that Peter's 2026-09-19 ruling mechanized against, reached by a different spelling.
- **Measured**: characterization K-status-nonmark (Beta Status `Partial`, Evidence `` `npm test` → 3 failing ``) gives `reds 0`.
- **The control pair IS red**: `⚠️` with no link gives `RED [EVIDENCE_NONCOMPLIANT] … is ⚠️ with no follow-up link`. The bite record is `.kiro/issues/2026-10-03-completion-criteria-parity-flip.md` (archived), and #292's history line.

**A second, smaller hole on the same line**: `includes()` means `✅ (partially)` or `✅⚠️` reads as ✅.

## 2. The fix shape

1. **Checker**: `parseStatus` returns `'other'` for any cell that is not exactly one closed mark after trimming. `'other'` becomes a **new RED class**, for example `[STATUS_NONCOMPLIANT] criteria row "<…>" Status '<cell>' is not one of ✅ ⚠️ ❌ (or — for an annotation row)`. Exact-match also closes the `includes()` hole.
   - Files: `scripts/completion-claims/completion-doc.ts` and `verdict.ts`, with the CLI's reporting in `scripts/check-completion-criteria-parity.ts` if the class needs a new reporting branch.
2. **Jest fixtures**, in the set `fixtures.test.ts` runs:
   - one fixture per spelling class: a word (`Partial`), a mark with trailing text (`✅ (partially)`) and a combined mark;
   - one control: the closed marks, plus `—` on an annotation row;
   - the new class added to `__fixtures__/expected-classes.json`, so the coverage floor holds it red at zero.
3. **Live-corpus check BEFORE merge (DD1, the arming-day consequence)**: the check is now REQUIRED and does a full scan, so a tightened `parseStatus` that reds any accepted doc in Spec 123 or 127 **blocks every PR to `main`**.
   - Run the tightened checker over the tree first, and record the result in the fixing PR.
   - Any doc it reds is either fixed in that PR, through the doc's owner, or the tightening waits.
4. **The guide: a one-line tightening is owed. It is a governance edit, so it needs a ballot or erratum and is Peter-merged.**
   - § "Status vocabulary" lists the three marks but never says (a) that nothing else is a Status, or (b) that `—` is the annotation marker for a row claiming no verdict. The checker has used (b) since U2 (`completion-doc.ts` L20–25); the guide never states it.
   - **Proposed line**: *"The Status cell is exactly one of ✅, ⚠️, ❌ — or `—` on an annotation row that claims no verdict; any other text is non-compliant."*
   - It lands **with or before** the checker change, so the law states what the gate enforces.
5. **Requirement scope**: Req 6.4 (the verdict surface) enumerates the red classes and does not list Status validity. Stacy's counter-argument (§ 5 item 1) is therefore live: the fix enforces the register rule but sits outside Req 6.4's enumeration.
   - **Route**: an erratum to Spec 127 `requirements.md` Req 6.4, adding Status validity to the verdict surface, in the fixing PR.
   - `.kiro/specs/**` is inside Thurgood's charter scope. Spec 127 is closed, so this is an erratum, not an amendment.

**Re-bite or not**: a change confined to `parseStatus` and the verdict classes does **not** need a re-bite. The bite on #290 proved the CI path: the trigger, the exit code turning the check-run red, the full-scan reach, merge-base resolution and authorship dating. This change does not touch that path, and its red is proven by the new jest fixtures, which run in `lane-functional-root`.
- **If the fixing PR touches `main()`'s exit paths, the git invocations or the workflow, the touched path is re-bitten.**
- Low items (a) and (b) below do touch that path.

## 3. The lows, routed with it (Stacy's spec § 5)

- **(a) Silent green on an unresolvable merge base (item 4).** `git merge-base` fails, then `note: … diff-scoped duties skipped`, then exit 0. The only CI evidence that this does not happen is run 6 (B-material) on #290, plus the zero-note greps.
  - **Fix**: make it loud. Exit non-zero, or at least emit a red-class line in a PR context, where `GITHUB_BASE_REF` is set.
  - **Touches the CI path, so it is re-bitten.**
- **(b) Silent green on a failed authorship lookup (item 5).** `authorshipDate()` swallows git errors and returns `undefined`, so `resolveMode` reads the file as legacy. A shallow fetch therefore turns the declaration duty off silently. The only CI evidence is run 5 (B-undeclared).
  - **Fix**: a lookup failure in CI is loud.
  - **Re-bitten** for the same reason.
- **(c) Misleading `fatal:` stderr (item 6).** Every PR that adds a `tasks.md` prints `fatal: path … exists on disk, but not in '<sha>'` on a green run, because `git show` runs before the declared-or-authorship short-circuit with inherited stderr.
  - **Fix**: pipe stderr, or check existence at the base first. Cosmetic.
- **(d) Over-counts (item 7).**
  - (i) The population line counts an undeclared non-compliant spec as "declared per-parent" (seen live on #290 run 5: `4 declared per-parent` with 3 declared).
  - (ii) An exemption-honored parent is counted in `pass`.
  - **Fix**: split the counts. The claims pass reads emissions, but a SUMMARY read as coverage over-counts.

## 4. The Req 6.4 → 6.6 citation correction still owed (Stacy's spec § 5 item 12)

- **Where**: `.kiro/specs/127-completion-claims-integrity/design.md` § "Testing Strategy" (L217) reads "**Gate-bite** (Req 6.4)", but AC 6 is the gate-bite and AC 4 is the verdict surface.
- **Already recorded**: the register row's 2026-10-03 line records the correction, and the 2026-09-19 line stays as written, because history is append-only.
- **Whose**: Spec 127's spec artifacts are Thurgood's, and `.kiro/specs/**` is inside his charter scope.
- **Route**: a dated erratum line in `design.md`, in the fixing PR, beside the Req 6.4 erratum in item 2.5. Not `completion/`, which is Stacy's record space.

## 5. Grant

Thurgood's charter `writeScope` (`canonical/agents/thurgood.md` L233–237) is `src/__tests__/**`, `.kiro/specs/**`, `docs/specs/**` and `.github/workflows/lane-timing.yml`. **It does not cover the checker or its tests**, so the fix needs this grant. The spec errata in §§ 2.5 and 4 are already in charter scope. The guide line (§ 2.4) is governance and cannot be granted.

**Grant paths**: `scripts/check-completion-criteria-parity.ts`, `scripts/completion-claims/**`

- **Grantee**: Thurgood, this issue's named owner.
- **Activation**: Peter's merge of the PR whose diff adds this list and whose body names this grant (`.kiro/issues/README.md` rule 8).
- **Expiry**: the fixing PR's merge.
- **Not covered, and not needed**:
  - `.github/**`: the workflow is unchanged;
  - `tools/agent-generator/verify-gate-registration.sh`: no context or count change;
  - `package.json`: the `check:completion-criteria-parity` line is unchanged.

  So none of M1's excluded acts arises.
- **Discipline**: the fixing PR's `git diff --name-only` is the list above, plus the two Spec 127 errata (charter scope), plus, if Peter routes it there, the guide line under the governance carve-out, named in the PR body. An out-of-list edit is a claims-pass finding.

## Triage (2026-10-18)

*Signed: Thurgood (owner). Nothing above is rewritten; the old Trigger text is kept verbatim in the block under the Class line.*

- **Re-verified live**: `governance/completion-documentation-guide.md` § "Status vocabulary" still names three marks and states neither that nothing else is a Status nor that `—` is the annotation marker; `git log --first-parent --since=2026-10-03 -- scripts/completion-claims scripts/check-completion-criteria-parity.ts` is empty, so the checker is unchanged since the flip. Whether the second old clause (an observed Status outside the vocabulary) has fired is not asserted here; no observation is on record in this file.
- **The issue-row grant is now redundant, not void.** Section 5 says the charter's write scope "does not cover the checker or its tests". Since the six-roots ballot (2026-10-17) my standing scope lists `scripts/completion-claims/**` and `scripts/check-completion-criteria-parity.ts`. The grant list stays as filed (rule 10: a grant list lives in a merged record); the fixing PR needs no grant to edit those two paths and still cites the list. The Spec 127 errata are in `.kiro/specs/**`, also standing scope. The **guide line stays governance law** and cannot be granted.
- **Routed to the capped sitting of 2026-10-18, item S4, a rider** (shares the sitting-2 ballot with S3 and the D3 rider S6): the ballot or erratum carrying (a) the one-line tightening of the guide's § "Status vocabulary" (§ 2.4's proposed line), landing **with or before** the checker change, and (b) the Req 6.4 erratum adding Status validity to the verdict surface. The checker fix (`parseStatus` exact-match, new `[STATUS_NONCOMPLIANT]` class, fixtures, the live-corpus pre-merge run) and the lows in § 3 follow in this record's fixing PR; items (a) and (b) of § 3 touch the CI path and are re-bitten.
- **Closes** when the fixing PR merges with the dated outcome line and the archive move.

## Lapse (2026-10-18)

*Signed: Thurgood (owner), observed under README rule 11 as applied in #408.*

- **Fired events**: the old trigger's first clause, the next RELEASE claims pass, fired at the 15.1.0 pass, #348, `1caddd21d2bb26b25ef5016a1c46b8303714e292` (2026-10-13), and again at the 16.0.0 pass, #382, `308a588f3de39ff1a85d1498ca00989738f2e3b6` (2026-10-16). No commit that is an ancestor of the event's commit closed this record (rule 5's dated outcome line, or the archive move) or re-ruled it (its Trigger line changed in a diff carrying a dated reason and authority). The record stayed open across both.
- **Consequence (rule 11)**: first lapse of a P2 (guard) → escalation to Peter: spec / drop / fix-now. The sitting-2 ballot's D-2 rider (item S4) is the proposed fix-now vehicle, so Peter's go on the sitting answers it; **answered 2026-10-19 (sitting 2 S4/S6 ratified)**.

## S4 applied (2026-10-19)

*Signed: Thurgood (owner). Nothing above is rewritten.*

- **Ruled**: ballot `.kiro/docs/ballots/2026-10-18-sitting-2-subtask-tests-tasks-sweep-criteria-form.md` S4, ratified with **the bracketed sentence kept** (Peter, 2026-10-18/19, § 8).
- **Applied by PR `chore/ballot-sitting-2-application`** (Thurgood): `governance/completion-documentation-guide.md` § "Status vocabulary", one paragraph after the ❌ bullet: "The Status cell is exactly one of ✅, ⚠️, ❌ — or `—` on an annotation row that claims no verdict; any other text is non-compliant. A criterion marked `—` claims nothing, and so reads as missing from the table." § 2.4's line, verbatim, then the kept sentence.
- **Still owed here** (the fixing PR, an EXECUTION PR after the application merges; write authority the § 5 grant and, redundantly, my standing scope; the PR cites both): the checker fix, its fixtures (one added by the ballot: a real criterion marked `—` reads as a mismatch), the live-corpus run before merge counting `-`, `–` and `⚠` without U+FE0F, the Req 6.4 erratum, the `design.md` L217 citation correction, and the lows (a)–(d) with re-bites where they touch the CI path.

- 2026-10-19 (Thurgood): trigger fired at #413 (`3b84122c9`, the sitting's ratification); read as re-ruled by the ratification it carried, which named this record's fix vehicle, so no lapse under rule 11; token re-keyed to this record's checker-fix PR (Trigger line above). *(The coordinator's reading, recorded as such; reversible if Peter reads it otherwise.)*
- 2026-10-19 (Thurgood): **The lows (a)–(d) and the `design.md` L217 citation erratum landed in PR `fix/d2-lows`**, with the catalog rows for the lows' red strings. **How they were tested**: unit and catalog-conformance tests in jest. Each low was also re-bitten **locally, in scratch clones** (not in CI), old checker (`58ec2aea5`) against new. (a) A merge base that cannot be resolved, via `--base` and via `GITHUB_BASE_REF`. (b) A copy with no `.git`, a `--depth 1` clone, and `CI=true` with an uncommitted `tasks.md`. (c) A branch adding two `tasks.md` and amending a legacy one materially. (d) The same branch with an exempt parent and an undeclared post-ratification spec. No CI re-bite was run. The CI exit path (`reds > 0 → 1`) and the workflow are unchanged since #290's bite, which still stands for them. **The exact-match tightening is HELD** on Peter's fork. That is commits 3–6 of branch `fix/d2-status-vocabulary`: `parseStatus` exact-match, `[STATUS_NONCOMPLIANT]`, the fixtures, the Req 6.4 erratum and the live-corpus record (360 reds, all Spec 123). The fork: owners rewrite the labelled cells (option 1) or a ballot admits the labelled forms (option 3), plus the guide-bullet fix. The record stays ACTIVE, and the Trigger is unchanged.

## Fixing PR — live-corpus run (2026-10-19)

*Signed: Thurgood (owner). Nothing above is rewritten.*

- **The observation (DD1, § 2.3)**: the exact-match checker (`parseStatus`, `[STATUS_NONCOMPLIANT]`), run over the live corpus before any doc changed, gave `SUMMARY: parents evaluated 34, pass 3, exempt 0, fail 31; emissions 0; reds 360`. Every red was `STATUS_NONCOMPLIANT`, all in Spec 123, 31 of 31 parents; Spec 127's three parents passed.
  - The cells: `✅ verified met` ×347, `⚠️ verified unmet or partial` ×12, `⚠️ verified partial` ×1 (parent 15). Each copies a vocabulary bullet of the guide's § "Status vocabulary" (then L113–115), which bolded mark and label together.
  - The three spellings S4 named for this run (`-` and `–` as the annotation marker, `⚠` without U+FE0F): 0 in the gate population, and 0 across all 1,069 criteria and condition rows in `.kiro/specs/*/completion/`.
  - By parent PRIMARY (every doc's delegated-tier line reads `plan held`): Ada 1, 2, 3, 6, 8 (71 cells); Lina 4, 5, 10, 14, 16, 17, 18, 20, 22, 29, 30 (114); Thurgood 7, 9, 11, 12, 13, 15, 19, 21, 23, 24, 28, 31 (153); Leonardo 25, 26, 27 (22).
- **The fork as put to Peter**: (1) each owner normalises the cells in their own docs to the bare mark, mark and Evidence unchanged; (2) exact-match binds only docs authored on or after #416, by ballot; (3) a ballot admits the three labelled forms as exact alternates; (4) the exact-match waits and the lows merge alone. With it, the class option: the guide's bullets teach the joined spelling, so they change whichever option is picked. Consults (read-only, 2026-10-19): Ada, Lina and Leonardo for option 1 on their own docs; Stacy rated 1 and 3 equal on gate honesty; all four named the bullet fix as the class fix. Stacy's consult (c) is carried as an obligation in `.kiro/issues/2026-10-19-census-mode-completion-criteria-parity.md`.
- **Peter's ruling (chat, 2026-10-19), verbatim**: "Option 1, and treat the list fix as a correction."
- **What landed, on branch `fix/d2-status-exact-match`** (cut from `8033f3a3e`; SHAs are the branch's):
  - `98cb1bd27` exact-match and `[STATUS_NONCOMPLIANT]`; `d5d5765e8` nine fixtures and coverage class `status`; `19a462e11` the Req 6.4 erratum and the catalog row (cherry-picked from `fix/d2-status-vocabulary`, which is superseded).
  - `05d955bf7` the finding names the fix: `Status '<cell>' is not a bare mark — write the mark only (✅, ⚠️, ❌; — on an annotation row)`, pinned in the catalog-conformance test, the status fixtures and the `design.md` catalog row.
  - `a3211f5d1` the guide's three vocabulary bullets now bold the mark alone and gloss the label after it, every rule kept; the S4 line is unchanged. Edit kind CORRECTION: observation this section; truth the S4 line.
  - The 360 cells, each owner's own commit, label dropped and mark, Evidence and links unchanged, one dated provenance line per doc: Thurgood `b3ca9ffe5` (153 cells, 12 docs); Ada `6bf398d51` (71, 5); Lina `1ea8c7a70` (114, 11); Leonardo `a93b9c171` (22, 3). Subtask docs are outside the gate population and were not touched.
  - `canonical/generated.lock`: `inputClosure` refreshed from a green `check:122:diff-guard` run (the guide is in the closure); `outputs` unmoved.
- **Out of § 5's list, disclosed**: the 31 Spec 123 docs (`.kiro/specs/**`, standing scope, each edited by its owner), the guide (governance carve-out, Peter-merged, by his ruling), the lock (tool-written) and the two issue files (rule 9).
- **The live-corpus run after every cherry-pick**: `npm run check:completion-criteria-parity` → exit 0, `SUMMARY: parents evaluated 34, pass 34, exempt 0, fail 0; emissions 0; reds 0`; with `--base main`, the same line, exit 0.

## Outcome (2026-10-19)

*Signed: Thurgood (owner). Nothing above is rewritten.*

- **Closed at the merge of PR `fix/d2-status-exact-match`** (the PR number is in its body), the fixing PR the Trigger line names: the exact-match, `[STATUS_NONCOMPLIANT]`, the fixtures including a criterion marked `—`, the live-corpus run, the Req 6.4 erratum and the `design.md` correction; the lows of § 3 landed earlier in `fix/d2-lows` (#422). D-2 is fixed: the gate reds any Status cell other than ✅, ⚠️, ❌, or `—` on an annotation row.
- **The § 5 grant expires** at this merge (rule 8); the paths stay in standing scope.
- Closed and moved to `archive/` in the fixing PR (README rules 2, 5 and 11).
