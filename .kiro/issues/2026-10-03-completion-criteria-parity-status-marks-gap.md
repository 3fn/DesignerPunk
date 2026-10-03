# Issue: `completion-criteria-parity` does not enforce the closed Status vocabulary (known gap D-2), plus four lows

**Date**: 2026-10-03
**Status**: ACTIVE. It carries a grant, which does nothing until Peter's merge activates it.
**Owner**: Thurgood (instrument owner; register row `completion-criteria-parity`, `owner: thurgood`).
**Trigger**: **whichever comes first**:
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
