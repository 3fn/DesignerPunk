# Issue: `package-name-drift.yml` L5 comment — grant to replace with a `SCAN_DIRS` pointer

**Date**: 2026-09-28
**Status**: ACTIVE
**Owner**: Lina
**Trigger**: before Spec 123 Task 17.2 (the grep sweep). Task 17.2's repo-wide `product-template` grep will hit this line; the fix must land before that sweep runs so the sweep's row reads clean rather than ⚠️ or out-of-list.
**Source**: ballot `.kiro/docs/ballots/2026-09-28-123-b-u2.md` § 4 "F-2" ruling (Peter, 2026-09-28) and § 5 "Carried items, outside this ballot's edits" (C7, Stacy R1-4); ballot `.kiro/docs/ballots/2026-09-27-ci-regime-standing-scope.md` § 3 (the issue-row grant mechanism).

---

## The gap

`.github/workflows/package-name-drift.yml` line 5 is a comment enumerating the same directory list that `scripts/check-package-name-drift.js`'s `SCAN_DIRS` and `governance/classification-map.md`'s `package-name-scope-drift` rule also enumerate: `.kiro/steering/, src/, product-template/, .kiro/agents/, dist/`. It is a third copy of a list that Spec 123 Task 17 is already reconciling to two copies (the rule and `SCAN_DIRS`, held in parity by the standing test added at Task 17.4).

This site sits outside M2's sweep directories (`governance/`, `.kiro/steering/`) and outside Task 17's Primary Artifacts, so Task 17.2's repo-wide `product-template` grep will hit it as a non-historical, non-verified site. A `.github/**` path other than `lane-timing.yml` is outside Thurgood's M1-P1 standing CI-regime scope (`.kiro/docs/ballots/2026-09-27-ci-regime-standing-scope.md` § 2), so the edit needs an issue-row grant under that ballot's § 3, or Peter's direct action.

**Ruled at ratification (B-U2 F-2, Peter, 2026-09-28)**: the verb is *replace the list with a pointer to `SCAN_DIRS`* — not re-enumerate it. This keeps exactly two copies of the list under active parity (the rule and `SCAN_DIRS`, per the Task 17.4 standing test); the workflow comment becomes documentation, not a third data source that could itself drift.

---

## Grant

**Grant paths**: `.github/workflows/package-name-drift.yml`

Per `.kiro/docs/ballots/2026-09-27-ci-regime-standing-scope.md` § 3: this grant holds on the fixing PR's branch only, activated by Peter's merge of a PR whose body names this issue and this path list, and expires when that PR merges. It confers no ratification authority and is additive to Lina's charter scope. It carries M1's excluded acts unless named and admitted here — this fix does not need any of them: no new required context, no change to `EXPECTED_CONTEXTS`'s count, no removed or weakened step/floor/execution-assertion. It is a comment-text edit only.

---

## The fix

1. Replace line 5's enumerated list with a pointer sentence naming `scripts/check-package-name-drift.js`'s `SCAN_DIRS` as the authoritative list (e.g., "Scanned directories: see `SCAN_DIRS` in `scripts/check-package-name-drift.js`.").
2. No other line of the workflow file changes — no env, cache, runner, `if:`, `continue-on-error`, or step change; no required-context change.
3. Task 17.2's grep-sweep row cites this issue path as the site's disposition: "resolved by `.kiro/issues/2026-09-28-package-name-drift-workflow-comment-grant.md`".

---

## Criterion (decidable without consulting the author)

`git diff --name-only <base>..<fixing-PR-head>` is exactly `{.github/workflows/package-name-drift.yml}`, and `git grep -n "product-template\|\.kiro/agents\|\.kiro/steering" -- .github/workflows/package-name-drift.yml` returns zero hits for the enumerated members (the comment no longer lists them — it points at `SCAN_DIRS` instead). Verified concretely: after the fix, `grep -c "product-template" .github/workflows/package-name-drift.yml` → `0`.

---

## ARMING

Per the CI-regime ballot § 3 item 6: this is a `.github/**` grant, so the finding is read at the next RELEASE pass, or at ARMING if edit site 4's proposed extension (Stacy's ARMING-audits-issue-row-grants line, `.kiro/docs/ballots/2026-09-27-ci-regime-standing-scope.md` § 2 edit site 4) is taken. **ARMING fires at the fixing PR's merge** (Stacy) — cited here per the brief so the fixing PR names it in its own body.

---

## Filed by

Thurgood, 2026-09-28, as part of the Task 17 plan-amendment PR landing B-U2's F-2 ruling. Cites B-U2 § 5 C7 (Stacy R1-4) and the CI-regime ballot § 3 (issue-row grant mechanism).
