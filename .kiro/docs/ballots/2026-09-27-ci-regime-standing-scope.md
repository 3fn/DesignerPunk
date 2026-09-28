# Ballot Measure: A standing scope for the CI-regime owner, issue-row grants, and the instrument rule

**Date**: 2026-09-28 (commissioned 2026-09-27)
**Drafted by**: Thurgood (Civitas steward; owner of the CI regime under B-CI § 5)
**Status**: **DRAFT** — not ratified. Nothing below is applied. **Record-first**: when Peter ratifies, the ratifying session commits `Status: RATIFIED (Peter, <date>)` before any edit is applied (`.kiro/docs/ballots/README.md` § "The Ratification Protocol").
**Rulings that commissioned it**:
- **Peter, 2026-09-27** — the "holistic path" on the PR-2 grant question: (1) PR-2 stays instrument-only; (2) a standing scope for the CI-regime owner; (3) the instrument rule.
- **Peter, 2026-09-28** — **both (a) the standing scope and (e) issue-row grants**. Thurgood authors, under the five conditions his and Stacy's consults independently named.

> ## ⚠️ CONFLICT OF INTEREST — stated first (condition 1)
>
> **The author is drafting a change to his own charter.** M1 widens `canonical/agents/thurgood.md`'s write scope, and Thurgood benefits from every path it adds. Peter ruled that he author anyway, under conditions, because a charter change is governance law in the owner's seat. The conditions:
> - **(1)** this disclosure;
> - **(2)** Peter's ruled limits are transcribed **verbatim** (§ 2, "Peter's ruled limits");
> - **(3)** every element the author adds beyond them is flagged **[author's addition — Peter rules]**;
> - **(4)** paths are enumerated exhaustively, each justified by a named recurring task and carrying a review trigger. There is no "CI lanes" umbrella;
> - **(5)** Stacy is the **required reviewer, with an explicit mandate to attack the width**. She audits the extent afterwards, so her incentive runs toward narrow.
>
> **The author also frames this ballot's counter-arguments (§ 6).** A self-serving framing is hard to see from inside the seat. Stacy's review and Peter's ruling are the only checks on it.

**Required reviewer**: Stacy — mandate: **attack the width** of M1 and M2. M3 changes how her instruments' surfaced rows are disposed, and she audits M1 and M2 afterwards.
**Unit**: a standalone record-first ballot on `main`. It touches governance law (a charter, `.kiro/issues/README.md` and `governance/classification-map.md`), so **Peter merges it** under the standing carve-out.

> **No `Ratified-machine:` line, deliberately.** It is the Spec 127 law ballot's parseable in-force record, for a checker that reads exactly one (the B-CI and T1-(B) precedent).

---

## 1. The gap

**B-CI names an owner of the CI regime but gives him no standing scope.**
- `.kiro/docs/ballots/2026-09-27-b-ci-unit-branch-ci-feedback.md` § 5 clause 1: *"Who. Thurgood (Civitas steward), as owner of the CI regime."*
- The owner's charter write scope, `canonical/agents/thurgood.md` L233–236, contains no workflow and no gate-registration file:
  ```yaml
  writeScope:
    - "src/__tests__/**"
    - ".kiro/specs/**"
    - "docs/specs/**"
  ```

**Every CI touch has needed a one-off grant.**
- **PR-1** needed B-CI § 5's grant, plus N1 (the six workflows by name), N2 (one fix-forward PR) and N3 (`.kiro/hooks/README.md`). The grant was time-boxed to PR-1's merge.
- **PR-2** needed C7a to extend it.
- **On 2026-09-27, the steward's second seat correctly refused** to apply a tested patch to `.github/workflows/lane-timing.yml`, because B-CI § 5 clause 4 had expired paths a–d at PR-1's merge.
  - **The patch**: an `npm run test:agent-generator` step, with a did-it-really-run selection floor, inside the existing required `lane-functional-root` job.
  - **What it closes**: the gap `.kiro/specs/123-consumer-distribution/completion/task-10-completion.md` § "Carried items" recorded — the agent-generator lane runs in no workflow.
  - **Tested locally**: 30 suites, 425 tests.
  - **The refusal was right; the scope was the defect.**

**Issues assign CI work that the owner's charter forbids.** `.kiro/issues/2026-09-27-test-scripts-lane-not-in-ci.md` names **Thurgood** as owner of adding `npm run test:scripts` "to an existing required lane". It became executable only because B-CI's temporary PR-1 grant happened to cover it. The step is now in `lane-functional-root` (`lane-timing.yml` L231–232). *(The issue still reads `ACTIVE`. That is an owner's closure, owed at the next walk, and outside this ballot.)* **The general shape**: an issue can name an owner for a path the owner cannot touch.

**Per-touch grants cost a ballot or an amendment each time**, and they make "the owner may not touch what he owns" the resting state. They also push fixes into instrument PRs (§ 4).

---

## 2. M1 — (a) the standing CI-regime scope

### Peter's ruled limits (verbatim, condition 2)

> **New required contexts, changes to `EXPECTED_CONTEXTS`'s count, branch protection and repo settings stay Peter's.**

### The enumerated scope (condition 4: every path justified by a named recurring task, with a review trigger)

| # | Path | What the owner may do | Named recurring task | Flag |
|---|---|---|---|---|
| P1 | `.github/workflows/lane-timing.yml` | **Additive steps inside its existing required jobs, each carrying its own did-it-really-run selection floor** (a non-empty suite or test count, or an execution assertion, in the 125-A convention) | **A test root that the functional lane does not select.** Now: the `tools/agent-generator/` suites (`task-10-completion.md` § "Carried items"). Recurring: each new `tools/**` or `scripts/**` suite root outside `jest.functional.config.js`'s roots (the `test:scripts` precedent, `lane-timing.yml` L219–232) | Peter's ruling (standing scope over the CI regime) |
| P2 | `.github/workflows/agent-generator.yml` | **Only** the `(unit-branch)` dispatch and context-name mirror hunks for a context Peter has added, and a step's re-pointing to a named npm script, with its floor unchanged | **When Peter adds a 122 context, its B-CI a2 unit-branch mirror name and dispatch follow** (B-CI § 5 item 3's PR-1 shape, recurring per added context) | **[author's addition — Peter rules]** (B-CI's dispatch/rename hunks) |
| P3 | `.github/workflows/completion-criteria-parity.yml` | **FORK — include or exclude.** If included: additive steps only, for example running the checker's own test roots before Q2 arms it | **The Q2 arming preparation.** The checker's own guards must be green in CI before the sitting (`.kiro/issues/2026-09-27-test-scripts-lane-not-in-ci.md`'s trigger). **Exclude** instead, and a touch before Q2 uses M2 | **[author's addition — Peter rules]** (include/exclude) |
| P4 | `tools/agent-generator/verify-gate-registration.sh` | **Only edits that leave the expected-context set unchanged**: message text, dispatch-name handling, assertion mechanics | **Keeping the script's mechanics and its C9 reconciliation header consistent when Peter changes the context set** (the set change is Peter's; the header record, messages and assertion mechanics around it follow). *Thinnest justification of the four; the file has no unit-branch handling today. Stacy: attack here first.* | Peter's ruling |

**Excluded paths** (no recurring owner task named). A touch on any of these uses **M2** (an issue-row grant) or Peter's direct action:
- `.github/workflows/consumer-guard.yml`, `tool-boot-smoke.yml`, `section-citations.yml`, `package-name-drift.yml`;
- every other `.github/**` path.

**Excluded acts, on every path:**
- **Peter's (verbatim, above)**: a new required context; a change to `EXPECTED_CONTEXTS`'s count; branch protection and repo settings.
- **[author's addition — Peter rules]**: **removing or weakening** an existing step, selection floor or execution assertion, anywhere in the enumerated paths. A tightening is additive; a loosening is excluded.

**Evidence owed in each PR's body** (B-CI § 5 clause 5, made standing):
- `git diff --name-only main...HEAD`, which must be a subset of P1–P4;
- an enumeration of every hunk that touches a did-it-really-run guard, each with its reason. **The expected state is additions only.**

**Audit — [author's addition — Peter rules]: the firing event is the next RELEASE claims pass.**
- The release delta `git log <last-tag>..main` includes every such `chore/` PR, so none escapes a claims event.
- A unit's MIDPOINT or CLOSEOUT pass reads the PR too, when the unit carries it.
- An edit outside P1–P4, or an excluded act, is a finding on the executing agent.

**Review trigger — [author's addition — Peter rules]**:
- **(i)** At each RELEASE claims pass, each enumerated path's use since ratification is read. **A path unused across two consecutive RELEASE passes is proposed for removal**, by an amendment ballot, not silently.
- **(ii)** **Any change to the required-context set** (Peter's act) re-reads P1–P4 in the same record.

### Before → after — `canonical/agents/thurgood.md`

**Frontmatter, L233–236.**

Before:
```yaml
writeScope:
  - "src/__tests__/**"
  - ".kiro/specs/**"
  - "docs/specs/**"
```
After (P3 shown included; **drop its line if Peter excludes it**):
```yaml
writeScope:
  - "src/__tests__/**"
  - ".kiro/specs/**"
  - "docs/specs/**"
  - ".github/workflows/lane-timing.yml"
  - ".github/workflows/agent-generator.yml"
  - ".github/workflows/completion-criteria-parity.yml"
  - "tools/agent-generator/verify-gate-registration.sh"
```

**Body.** The glob cannot carry the limits, so the charter states them.
- **Before**: § "Domain Boundaries" → "### In Scope" has no CI-regime line.
- **After**: append:
  > `- **CI regime — standing scope (ballot 2026-09-27-ci-regime-standing-scope § 2)**: P1 `lane-timing.yml` additive steps with a did-it-really-run floor; P2 `agent-generator.yml` unit-branch mirror/dispatch hunks and step re-pointing only; P3 `completion-criteria-parity.yml` additive steps only; P4 `verify-gate-registration.sh` edits leaving the expected-context set unchanged. **Never**: a new required context, a change to `EXPECTED_CONTEXTS`'s count, branch protection or repo settings (Peter's), or removing/weakening a guard. Each PR body lists its paths and every guard-touching hunk.`

**Before → after — `.kiro/steering/Agent-Directory.md`**, § "Thurgood" **Owns** line. **[author's addition — Peter rules]**
- **Before**: "…the `completion-criteria-parity` instrument (checker source, CI wiring, gate registration), **Civitas infrastructure** (…)."
- **After**: "…the `completion-criteria-parity` instrument (checker source, CI wiring, gate registration), **the CI regime's enumerated workflow paths (standing scope, ballot 2026-09-27-ci-regime-standing-scope)**, **Civitas infrastructure** (…)."

**Application, at ratification, in one PR:**
1. Commit RATIFIED.
2. Make both canonical edits.
3. Regenerate with `npx tsx tools/agent-generator/generate.ts`. This rewrites the rendered `.claude/agents/thurgood.md`, `.kiro/agents/thurgood-prompt.md`, the Kiro JSON config, their attribution sidecars, and `canonical/generated.lock`.
4. `npx tsx tools/agent-generator/diff-guard.ts` → green.
5. Edit the Agent-Directory line (if taken).
6. Run `rebuild_index`.
7. `node scripts/validate-steering-metadata.js` → no new errors.

**What M1 does not change**: no other charter; no ratification authority; the governance carve-out; Q2's gating of `completion-criteria-parity` as a required check.

---

## 3. M2 — (e) the issue-row grant (T1-(B)'s shape, applied to issues)

> **STANDING RULE — issue-row write-scope grant:**
> 1. **Extent.** A **merged** chartered issue under `.kiro/issues/` whose body carries a `**Grant paths**:` list grants write access to **exactly the paths in that list**, and to nothing else.
> 2. **Who.** The issue's **named owner** only. Agents the issue merely consults receive no grant.
> 3. **Duration.** The grant holds **on the fixing PR's branch only**, and **expires when that PR merges**. It covers one fixing PR, and the issue then closes (`git mv` to `archive/`, `.kiro/issues/README.md` convention item 5).
> 4. **Activation.** **Peter's merge of the issue file that contains the `**Grant paths**:` list.** An unmerged issue, or a list added after that merge, grants nothing until it is merged.
> 5. **What it does not change.** The grant is additive to charter scope and confers **no ratification authority**. **An issue can never grant a governance-law path**: `governance/**`, `.kiro/steering/**`, `.kiro/docs/ballots/**`, and agent charters, prompts or configs (`canonical/agents/**` and their renderings). Those stay ballot-only.
> 6. **Audit.** The fixing PR's `git diff --name-only` must be a subset of the list, cited in its body. **A path outside it is a claims-pass finding on the executing agent**, read at the next RELEASE pass (the same event as M1).
> 7. **Trace.** Every listed path must trace to the issue's stated gap. A listed path with no trace is a walk finding (the monthly health check).

- **Register row**: `governance/classification-map.md`, a new entry `issue-row-write-scope-grant`, modelled on `tasks-row-write-scope-grant`:
  - `boundary_call.class: functional`;
  - `verification: { disposition: audit, owner: stacy, check_state: none, checks: [] }`;
  - `education`: the law home is this ballot § 3, with a pointer-grade line in `.kiro/issues/README.md` § "The convention" (item 8, below);
  - `history`: the creation line.
- **Before → after — `.kiro/issues/README.md` § "The convention".**
  - **Before**: the list ends at item 6 ("The walk").
  - **After**: item 7 is § 4's, and add item 8:
    > `8. **Grant paths** (ballot 2026-09-27-ci-regime-standing-scope § 3): an issue whose body carries a `**Grant paths**:` list grants its named owner write scope over exactly those paths, on the fixing PR's branch, until that PR merges — activated by Peter's merge of the issue; never a governance-law path; the fixing PR cites its path list. An out-of-list edit is a claims-pass finding.`

---

## 4. M3 — the instrument rule (amended per both consults)

> **THE INSTRUMENT RULE.**
> - An instrument that surfaces rows ships in a PR carrying **no fix outside its own extent**. The instruments this covers include the 122 sweeps, `audit:coverage-map` and its lanes section, and the `completion-criteria-parity` checker.
> - **Each surfaced row, in the same PR**, is either:
>   - **adjudicated** under the instrument's `sweep:` key in `canonical/adjudications.yaml`; or
>   - **routed to its owner as a chartered item**, with owner, named trigger, and **a unique expiry string in the adjudication `record`**. The fix PR removes that string, citing `grep -c "<string>" canonical/adjudications.yaml` → 0.
> - **Fixes ship under the owner's standing scope, in their own PR.**
> - **Exception**: Peter's ruling, recorded in that PR, may admit a **named, text-preserving normalization of the instrument's own input** that the instrument's change turns red, provided **no criterion text changes**. This is #211's shape.
> - **[author's addition — Peter rules]** The fix PR, under whatever scope it ships, may remove **exactly the adjudication rows whose `record` carries its expiry string**, and commit the refreshed `canonical/generated.lock` that the green diff-guard writes. Without this clause the rule's own removal step would fall outside M1 and M2's paths.

**Placement — confirmed as steward, with the split stated.**
- **Law home**: `governance/classification-map.md`, a new entry `instrument-rows-disposed-not-fixed`. I agree with Stacy's read that cross-spec check law lives in the register. The rule's audit is a set comparison over a PR (the instrument's extent against its diff), and the register's schema carries exactly that: `verification: { disposition: audit, owner: stacy, check_state: none }`.
- **Operational half**: `.kiro/issues/README.md` § "The convention", item 7, pointer-grade. The "routed as a chartered item" disposition resolves there, and the walk checks it.
- **Not the completion guide**: it governs completion docs, not instrument PRs.
- **Not C8's design doc**: 122's C8 governs the adjudication row's form, which M3 cites and does not change.

**Before → after — `.kiro/issues/README.md` § "The convention".**
- **Before**: the list ends at item 6.
- **After**: add item 7:
  > `7. **Instrument-surfaced rows** (register entry `instrument-rows-disposed-not-fixed`; ballot 2026-09-27-ci-regime-standing-scope § 4): an instrument's PR carries no fix outside its own extent; each surfaced row is, in that PR, adjudicated under the instrument's `sweep:` key or filed here as a chartered item (owner + named trigger + a unique expiry string in the adjudication `record`, removed by the fix PR with `grep -c` → 0). A surfaced row with neither disposition is a walk finding.`

**Before → after — `governance/classification-map.md` § "Entries".**
- **Before**: no entry.
- **After**: `### instrument-rows-disposed-not-fixed`, with:
  - `rule`: the text above, in one line;
  - `boundary_call`: `class: functional` — the instrument PR's diff against the instrument's extent is a set comparison;
  - `verification`: `{ disposition: audit, owner: stacy, check_state: none, checks: [] }`;
  - `education`: the law home is this ballot § 4; pointer-grade in the issues README, item 7;
  - `history`: the creation line, citing #211 as the exception's shape.

---

## 5. First application

**On ratification, the agent-generator lane fix ships under M1 (P1)** as its own PR:
- the § 1 patch: `npm run test:agent-generator` plus at least one selection floor, in `lane-functional-root`;
- the PR-body evidence per § 2;
- **it closes Stacy's `assessment-gap` row** for the agent-generator lane (filed by PR-2 under M3's discipline), by removing it and citing `grep -c` → 0.

**The row's deadline is before U2b's first commit.** The gap is the lane that guards U2b's `triviality.ts` work.

**Fallback, if this ballot is not ratified by then**: Peter's human-direct PR carries the same patch. The row records that fallback, so U2b never starts with the lane unguarded.

---

## 6. Counter-arguments (fold-back applied; residuals from both consults)

- **Concentration of gate-adjacent authority in one seat.**
  - **Folded in**:
    - four enumerated paths, not a glob;
    - additive-only;
    - Peter keeps contexts, `EXPECTED_CONTEXTS`'s count and settings;
    - a guard-hunk enumeration in every PR;
    - a named audit event;
    - a use-based review trigger.
  - **Residual**: an additive step can still **mis-select**. A floor that counts the wrong suite reads green. The enumeration makes it visible; it does not prevent it.
- **"Additive" at the margin.**
  - **Folded in**: the exclusion is phrased as "removing or weakening". A tightening is additive.
  - **Residual**: some hunks are both, such as a re-pointed step whose new script selects differently. The claims pass decides those, after merge.
- **Post-merge audit only.**
  - **Residual, stated plainly**: a bad CI edit is caught after it merges. The PR's own required checks are the only pre-merge protection. They test the code, not whether the CI change narrowed what is tested.
- **M2's per-touch cost.**
  - **Residual**: each issue-granted fix costs an issue PR before the fix PR. That is cheaper than a ballot, but still per-touch. It is the price of an exact extent without a standing widening.
- **The author frames these counter-arguments (condition 1).**
  - **Residual**: the width of P1–P4 and the choice of RELEASE as the audit event were chosen by the seat that benefits. **Stacy's mandate is to attack exactly those.**
- **Forks for Peter (surfaced, not picked)**:
  - P3 include/exclude;
  - each **[author's addition — Peter rules]** item: P2, the "removing or weakening" exclusion, the RELEASE audit event, the review trigger, the Agent-Directory line, and M3's row-removal clause.

---

## 7. Review round record

*(empty — `[STACY R1]` to come, with the mandate to attack the width; the author records `[THURGOOD R1]` incorporation here)*
