# Ballot Measure: an added entry in the in-lane guard registry is inside the CI-regime standing scope (P1b)

**Date**: 2026-10-20
**Drafted by**: Thurgood (Civitas steward; CI-regime owner; owner of the named-guard selection floor)
**Status**: **DRAFT** — not ratified. No edit site below is applied.
**Required reviewer**: **Stacy** — mandate: attack the width. She keeps the ARMING read this clause relies on, and she re-confirms and re-signs every unit it moves (§ 4).
**Unit**: branch `chore/records-sweep-registry-amendment`, with the records sweep that carries her second ARMING read on #421 and the F-1/F-2 fixes that ride this clause. It edits charters and `.kiro/steering/`, so **Peter merges it** under the governance carve-out.
**Amends**: ballot `2026-09-27-ci-regime-standing-scope` § 2 (M1, the standing scope P1). Charter bullet "CI regime — standing test-lane scope" (`canonical/agents/thurgood.md` § "In Scope").

> **Conflict of interest, stated first.** The author widens his own charter by one path. Stacy's review and Peter's ruling are the checks on that.

---

## 1. The incident

#421 landed the named-guard selection floor: `.github/in-lane-guards.json`, 18 entries, checked in `lane-functional-root` by `scripts/ci/check-in-lane-guards.ts`. Its issue-row grant is used up at that merge (README rule 8). Stacy's second ARMING read (`.kiro/issues/2026-10-13-named-guard-selection-floor-then-map-column-derivation.md`, § "ARMING read at the fixing PR's merge") found two gaps, and both are fixed by adding entries:
- **F-1 (Medium)**: the six completion-claims suites are unregistered.
- **F-2 (Low)**: the `no-autonomous-token-creation` row claims 12 suites, and the registry holds 1.

Under M1, every `.github/**` path except `lane-timing.yml` is excluded. So each added entry needs a fresh issue-row grant: a record, then Peter's merge of a PR that names it, then the fixing PR. Stacy named the result at activation and again at #421: *"registration must be cheap, or agents will not register, and an unregistered guard is the thing the floor cannot see."* When I executed step 1, I offered this clause to Peter as the class option (that record, § "Step 1 executed", "Registry location").

## 2. The clause (the one rule)

> **P1b — added entries in the in-lane guard registry.** In `.github/in-lane-guards.json` only, the CI-regime owner may **add** an entry: a new `{file, config, context, record}` object in `guards`. No existing entry changes or is removed, no other key changes, and `version` stays the same, so the floor can only grow. **Removing or modifying an existing entry stays excluded.** That is weakening a floor, so it needs an issue-row grant that names the act (M2 clause 5), or Peter's own act. Evidence in the PR body:
> - the PR's `.github/**` changes are exactly this file;
> - the additivity predicate prints `true`: `jq -n --slurpfile a <(git show main:.github/in-lane-guards.json) --slurpfile b .github/in-lane-guards.json '$a[0].version == $b[0].version and (($a[0]|keys) == ($b[0]|keys)) and ($a[0].guards - $b[0].guards) == [] and ($b[0].guards|length) > ($a[0].guards|length)'`;
> - the check's `N registered in-lane guards; N selected` line from the PR's own CI run;
> - for each added entry, the record that names the guard, and that `config` is a config the `context`'s job runs.
>
> ARMING audits each such PR at its merge.

**Why a predicate, not `--numstat` deletions `0`**: in JSON a pure-add diff can modify an entry. I tested this on a scratch copy of the live registry. I inserted one line, a second `"file":` key, inside entry 0, after its own `file` line. `git diff --numstat` reads `1 0`. Both `JSON.parse` and `jq` take the last duplicate key, so entry 0 now points at a different file. The predicate reads the parsed file. On scratch copies it gives `true` for an appended entry, and `false` for: a modified entry; a removed entry; a changed `version`; and the duplicate-key copy, even with a real entry appended as well.

## 3. Edit sites (at ratification)

1. **Ballot `2026-09-27-ci-regime-standing-scope` § 2**: a dated ledger line under the "narrowed to P1" note: *"(Amended 2026-10-20 by ballot `2026-10-20-in-lane-guard-registry-additive-entries`: P1b, added entries in `.github/in-lane-guards.json`. The P1 row is unchanged; the clause lives in that ballot.)"*
2. **`canonical/agents/thurgood.md` frontmatter `writeScope`**: after `".github/workflows/lane-timing.yml"`, add `".github/in-lane-guards.json"`, with a comment that the glob cannot carry the limit and the In Scope bullet does. This is P1's own pattern.
3. **`canonical/agents/thurgood.md` § "In Scope"**, the CI-regime bullet. Before `Every other CI path goes through an issue-row grant (§ 3).`, insert: *"In `.github/in-lane-guards.json` only (P1b, ballot 2026-10-20-in-lane-guard-registry-additive-entries): **add** an entry, never change or remove one, never change `version` or another key (that is weakening a floor: an issue-row grant naming the act, or Peter's); the PR shows the additivity predicate `true` and the check's `N registered; N selected` line."*
4. **`canonical/agents/stacy.md`, the ARMING row**: the event and scope gain a P1b PR. **This is Stacy's text, drafted by her at R1.** The author does not write in her seat. What the row needs to cover: the predicate, the check line, and the config-runs-in-context read.
5. **`.kiro/steering/Agent-Directory.md`, § "Thurgood" Owns line**: `(`lane-timing.yml` test-script steps with floors; ballot 2026-09-27-ci-regime-standing-scope)` → `(`lane-timing.yml` test-script steps with floors, and added entries in `.github/in-lane-guards.json`; ballot 2026-09-27-ci-regime-standing-scope, amended 2026-10-20)`.
6. **`.kiro/docs/ballots/README.md` § "Ballots on record"**: the entry for this ballot.

**Not edited, and why**:
- **The register**: no `governance/classification-map.md` row carries M1. A grep finds rows for M2 (`issue-row-write-scope-grant`) and M3 (`instrument-rows-disposed-not-fixed`) only, so there is no rule text or history line to amend. Creating an M1 row is a separate item, outside this one rule.
- **`.kiro/issues/README.md` rule 8**: it says when a grant is needed. It does not say a registry entry needs one, so it stays true without a new sentence.

## 4. Application, and F12′

- **Order**:
  1. Commit RATIFIED.
  2. Thurgood applies sites 1, 2, 3, 5 and 6, and Stacy's site 4 text byte for byte. He updates the `#in-scope` removal text in `canonical/profiles/consumer/thurgood.dispositions.yaml` and the matching item text in `canonical/operative-sets/thurgood.yaml`, and adds a `writeScope[.github/in-lane-guards.json]` row (`no-consumer-counterpart`, `subtraction-2`, unsigned). He does the same for Stacy's ARMING row in `stacy.yaml` and `stacy.dispositions.yaml`, and for the Owns line in `agent-directory.yaml` and its always-set dispositions row. Every one of these is an authoring act, in non-signing commits with `Agent: Thurgood`.
  3. Regenerate with `npx tsx tools/agent-generator/generate.ts`.
  4. Stacy, in her own seat commits (`Agent: stacy`), re-confirms the three operative-set units (`thurgood`, `stacy`, `agent-directory`), re-signs their three dispositions rows, and first-signs the new `writeScope` row.
  5. Lock refresh, then `diff-guard` green, then `verify-signing-chain --ci` green.
- **F12′**: `verify-signing-chain` fails a seat's own charter edit inside a signing commit (F12), and the same edit split across two commits with that seat's trailer (F12′). **Thurgood signs nothing in this PR.** Every Thurgood unit's confirmer and signer is Stacy (`canonical/operative-sets/thurgood.yaml` `confirmer: stacy`; every `thurgood.dispositions.yaml` row `signer: stacy`). So his edit to his own charter is pure authoring. Stacy's commits are signing-only, with no authoring hunk. This follows the #397 precedent (six-roots erratum (f)): there too, Thurgood applied text byte for byte, Stacy re-confirmed and re-signed in her own commits, and her drafted ARMING row was applied by him for the same F12′ reason.

## 5. Recommendation, and the surviving counter

**I recommend ratifying the clause as written.**

**Fold-back.** The first counter was "an additive-only clause can still register a bogus guard". That changed two things:
- **Evidence**: the clause requires the CI run's `N registered; N selected` line, and a per-entry statement that `config` is run by the `context`'s job.
- **Additivity test**: the clause tests additivity by predicate, not by `--numstat`.

**Two kinds of bogus entry are caught by the floor itself.** An entry whose file the config does not select reds the lane (DORMANT). So does an entry whose `context` is not in `EXPECTED_CONTEXTS`.

**What survives: two holes the floor reads green.**
1. **A config the context's job never runs.** The check confirms that the file is selected by the named config and that the context is required. It does not confirm that the context's job runs that config (verified in `check-in-lane-guards.ts`: no config-to-job read). An entry naming a real config that no required job runs would print `selected` while nothing runs it in CI. Today only the ARMING read catches this, by reading `lane-timing.yml`. Step 2 (map-column derivation, Lina + Stacy) is where it could close mechanically.
2. **A selected file that guards nothing.** A file can be selected and still not assert the claim its `record` names. That inflates `N` with a guard in name only. The claims passes and the ARMING read catch it. No mechanical check does.

**Cost moved, not removed.** The clause makes registration cheap for the author. It does not make it cheap for the auditor: Stacy's ARMING read fires on every P1b PR. If registrations become frequent, the read is the cost to watch.

## 6. Cost, retroactivity, fork, census

- **Cost**:
  - one sitting and one application inside this PR: five text sites, one glob, Stacy's 3 re-confirms, 3 re-signs and 1 first signature, and a lock refresh;
  - per later registration: no grant, one ARMING read.
- **Retroactivity**: none. The 18 existing entries and #421 are not re-read. No past PR moves in or out of scope.
- **Fork, for Peter — who may add an entry**:
  - **(a) the CI-regime owner only**, as written. The author's lean: it keeps M1's single-owner shape and edits one charter. Counter: a guard's author in another seat still needs Thurgood in the PR, which is lower friction than a grant but not zero.
  - **(b) any seat, for a guard file inside its own write scope.** Cheaper for the author. Counter: seven more charter edits and their re-signs, and an ARMING read on every seat's PR.
  - The pick is Peter's.
- **Census** (ballots README § "Conventions", "Instrument census"). Three registered instruments load the edit sites:
  - `**Census**: not in scope — 122-diff-guard (tools/agent-generator/diff-guard.ts) — the item changes no instrument code and no rule, pattern or grammar the guard implements; the edited canonical units are its ordinary inputs, regenerated and lock-refreshed at application, where the guard's verdict is read (green, or the application stops)`
  - `**Census**: not in scope — verify-signing-chain (tools/agent-generator/regrounding/verify-signing-chain.ts) — no instrument code or rule changes; the re-confirms and re-signs in § 4 are its ordinary inputs, read by --ci at application`
  - `**Census**: not in scope — check-section-citations (scripts/check-section-citations.ts) — the new text adds no MCP section citation; the guard's corpus changes only by prose it does not parse`
  - `scripts/ci/check-in-lane-guards.ts` is not a registered instrument: its register row is deferred to step 2 (the named-guard record, § "Grant paths", "Not granted"). So no line is owed for it, though the clause governs its input.

## 7. Review round record

*(Empty at draft. Stacy R1 next.)*

## 8. Ratification

*(Empty at draft.)*
