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
> - the additivity predicate prints `true`, its old side the PR's merge base `<base>` (`git merge-base origin/main HEAD` in the PR; `<m>^` at the read after merge `<m>`, which decides): `jq -n --slurpfile a <(git show <base>:.github/in-lane-guards.json) --slurpfile b .github/in-lane-guards.json '$a[0].version == $b[0].version and (($a[0]|keys) == ($b[0]|keys)) and ($a[0].guards - $b[0].guards) == [] and ($b[0].guards|length) > ($a[0].guards|length) and all($b[0].guards[]; keys == ["config","context","file","record"])'`;
> - the check's line `N registered in-lane guards; N selected` from the PR's own CI run, with N the number of entries in `guards` at the PR head, **and the step green** (a red run still prints an `N; N` line);
> - for each added entry: the record that names the guard; that `config` is a config the `context`'s job runs; and the assertion (the `it(…)` name) in the file that the record's claim rests on.
>
> ARMING audits each such PR at its merge.

**Why a predicate, not `--numstat` deletions `0`**: in JSON a pure-add diff can modify an entry. I tested this on a scratch copy of the live registry. I inserted one line, a second `"file":` key, inside entry 0, after its own `file` line. `git diff --numstat` reads `1 0`. Both `JSON.parse` and `jq` take the last duplicate key, so entry 0 now points at a different file. The predicate reads the parsed file. On scratch copies it gives `true` for an appended entry, and `false` for: a modified entry; a removed entry; a changed `version`; and the duplicate-key copy, even with a real entry appended as well.

## 3. Edit sites (at ratification)

1. **Ballot `2026-09-27-ci-regime-standing-scope` § 2**: a dated ledger line under the "narrowed to P1" note: *"(Amended 2026-10-20 by ballot `2026-10-20-in-lane-guard-registry-additive-entries`: P1b, added entries in `.github/in-lane-guards.json`. The P1 row is unchanged; the clause lives in that ballot.)"*
2. **`canonical/agents/thurgood.md` frontmatter `writeScope`**: after `".github/workflows/lane-timing.yml"`, add `".github/in-lane-guards.json"`, with a comment that the glob cannot carry the limit and the In Scope bullet does. This is P1's own pattern.
3. **`canonical/agents/thurgood.md` § "In Scope"**, the CI-regime bullet. Before `Every other CI path goes through an issue-row grant (§ 3).`, insert: *"In `.github/in-lane-guards.json` only (P1b, ballot 2026-10-20-in-lane-guard-registry-additive-entries): **add** an entry, never change or remove one, never change `version` or another key (that is weakening a floor: an issue-row grant naming the act, or Peter's); the PR shows the additivity predicate `true` against its merge base, the step green with `N registered; N selected` (N the entry count), and per added entry the assertion its record rests on."*
4. **`canonical/agents/stacy.md`, the ARMING row**: **Stacy's text at R1, applied verbatim** — the two insertions (Event; Scope) fenced in her § 7 entry, item 3, applied byte for byte under the six-roots erratum (f). The author does not write in her seat.
5. **`.kiro/steering/Agent-Directory.md`, § "Thurgood" Owns line**: `(`lane-timing.yml` test-script steps with floors; ballot 2026-09-27-ci-regime-standing-scope)` → `(`lane-timing.yml` test-script steps with floors, and added entries in `.github/in-lane-guards.json`; ballot 2026-09-27-ci-regime-standing-scope, amended 2026-10-20)`.
6. **`.kiro/docs/ballots/README.md` § "Ballots on record"**: the entry for this ballot.

**Not edited, and why**:
- **The register**: no `governance/classification-map.md` row carries M1. A grep finds rows for M2 (`issue-row-write-scope-grant`) and M3 (`instrument-rows-disposed-not-fixed`) only, so there is no rule text or history line to amend. Creating an M1 row is a separate item, outside this one rule.
- **`.kiro/issues/README.md` rule 8**: it says when a grant is needed. It does not say a registry entry needs one, so it stays true without a new sentence.

## 4. Application, and F12′

- **Order**:
  1. Commit RATIFIED, carrying Peter's words, dated, in chat or on the PR (the form recorded in § 8). **Every phase-3 commit in this PR comes after it** — the six-site application and the F-1/F-2 registry entries alike — so no entry lands before the clause that admits it.
  2. Thurgood applies sites 1, 2, 3, 5 and 6, and Stacy's site 4 text (her R1 text, verbatim) byte for byte. He updates the `#in-scope` removal text in `canonical/profiles/consumer/thurgood.dispositions.yaml` and the matching item text in `canonical/operative-sets/thurgood.yaml`, and adds a `writeScope[.github/in-lane-guards.json]` row (`no-consumer-counterpart`, `subtraction-2`, unsigned). He does the same for Stacy's ARMING row in `stacy.yaml` and `stacy.dispositions.yaml`, and for the Owns line in `agent-directory.yaml` and its always-set dispositions row. Every one of these is an authoring act, in non-signing commits with `Agent: Thurgood`.
  3. Regenerate with `npx tsx tools/agent-generator/generate.ts`.
  4. Stacy, in her own seat commits (`Agent: stacy`), re-confirms the three operative-set units (`thurgood`, `stacy`, `agent-directory`), re-signs their three dispositions rows, and first-signs the new `writeScope` row.
  5. Lock refresh, then `diff-guard` green, then `verify-signing-chain --ci` green.
  6. The F-1 and F-2 registry entries, as P1b adds, each with § 2's evidence in the PR body.
- **First firing**: this PR's merge is P1b's first ARMING firing. Its old side is `<m>^`, so Stacy's read covers the phase-3 entries exactly as it covers any later P1b PR.
- **F12′**: `verify-signing-chain` fails a seat's own charter edit inside a signing commit (F12), and the same edit split across two commits with that seat's trailer (F12′). **Thurgood signs nothing in this PR.** Every Thurgood unit's confirmer and signer is Stacy (`canonical/operative-sets/thurgood.yaml` `confirmer: stacy`; every `thurgood.dispositions.yaml` row `signer: stacy`). So his edit to his own charter is pure authoring. Stacy's commits are signing-only, with no authoring hunk. This follows the #397 precedent (six-roots erratum (f)): there too, Thurgood applied text byte for byte, Stacy re-confirmed and re-signed in her own commits, and her drafted ARMING row was applied by him for the same F12′ reason.

## 5. Recommendation, and the surviving counter

**I recommend ratifying the clause as written** (as amended at R2: Stacy's A1–A4).

**Fold-back.** The first counter was "an additive-only clause can still register a bogus guard". That changed two things:
- **Evidence**: the clause requires the CI run's `N registered; N selected` line, and a per-entry statement that `config` is run by the `context`'s job.
- **Additivity test**: the clause tests additivity by predicate, not by `--numstat`; at R2 the predicate also fixes each entry's shape (A1), and the evidence asks for N equal to the entry count with the step green (A2) and names each added entry's assertion (A3), which turns hole 2's read from "is it a guard?" into "does this named assertion red on the violation?".

**Two kinds of bogus entry are caught by the floor itself.** An entry whose file the config does not select reds the lane (DORMANT). So does an entry whose `context` is not in `EXPECTED_CONTEXTS`.

**What survives: two holes the floor reads green.**
1. **A config the context's job never runs.** The check confirms that the file is selected by the named config and that the context is required. It does not confirm that the context's job runs that config (verified in `check-in-lane-guards.ts`: no config-to-job read). An entry naming a real config that no required job runs would print `selected` while nothing runs it in CI. Today only the ARMING read catches this, by reading `lane-timing.yml`. Step 2 (map-column derivation, Lina + Stacy) is where it could close mechanically.
2. **A selected file that guards nothing.** A file can be selected and still not assert the claim its `record` names. That inflates `N` with a guard in name only. The claims passes and the ARMING read catch it. No mechanical check does.

3. **Maintenance friction (Stacy R1).** Renaming or moving a registered guard file reds the required lane (`registered file is absent`). The repair edits an existing entry's `file`, which P1b excludes, so it needs an issue-row grant or Peter's own act. P1b grows the registry, so it raises how often this happens. Fork F-2 in § 6.

**Cost moved, not removed.** The clause makes registration cheap for the author. It does not make it cheap for the auditor: Stacy's ARMING read fires on every P1b PR. If registrations become frequent, the read is the cost to watch.

## 6. Cost, retroactivity, fork, census

- **Cost**:
  - one sitting and one application inside this PR: five text sites, one glob, Stacy's 3 re-confirms, 3 re-signs and 1 first signature, and a lock refresh;
  - per later registration: no grant, one ARMING read.
- **Retroactivity**: none. The 18 existing entries and #421 are not re-read. No past PR moves in or out of scope.
- **Fork F-1, for Peter — who may add an entry**:
  - **(a) the CI-regime owner only**, as written. **My recommendation, and Stacy's.** It keeps the floor's denominator with one owner and a second reader before each entry lands, and one charter carrying a `.github/**` glob. Under (a) the guard's owner still picks the suites and the record text (F-2 is Ada's pick); Thurgood authors the JSON line. Counter that survives: if Thurgood is not in a unit, the guard's author must brief him or leave the guard unregistered, and an unregistered guard is the thing the floor cannot see. **Revisit trigger (Stacy's)**: the second unregistered in-lane guard, found at an ARMING read or a claims pass, whose cause is "the author's seat could not register" re-opens (b).
  - **(b) any seat, for a guard file inside its own write scope.** Cheaper for the author. Counter: seven more charter edits, and under `charter-write-scope-render-fidelity`'s rule ("moves only by a `canonical/agents/**` edit, Peter-merged with every affected seat consulted") seven seat consults and seven consumer-dispositions rows, plus an ARMING read on every seat's PR.
- **Fork F-2, for Peter — a renamed guard file's re-point**:
  - **(i) leave it excluded**: a re-point goes through an issue-row grant or Peter's own act. **My recommendation, and Stacy's lean**, with the trigger: the first instance is followed by an amendment ballot for (ii). It keeps § 2 one rule, and git's rename detection is a heuristic (a rename with heavy edits reads as delete + add, not `R`), so (ii) would not cover every rename anyway. Counter that survives: the first instance arrives as a red required check on someone else's unit, at the worst time to need Peter.
  - **(ii) admit now** one more act: a re-point of an existing entry's `file` whose old path is renamed in the same PR (an `R` row in `git diff -M --name-status <base>`), decidable from git. Counter: it is a second act inside the clause and a modification path into the floor, and a re-point to a weaker file passes it; the assertion read (A3) is the only check on that.
- **Census** (ballots README § "Conventions", "Instrument census"). Three registered instruments load the edit sites:
  - `**Census**: not in scope — 122-diff-guard (tools/agent-generator/diff-guard.ts) — the item changes no instrument code and no rule, pattern or grammar the guard implements; the edited canonical units are its ordinary inputs, regenerated and lock-refreshed at application, where the guard's verdict is read (green, or the application stops)`
  - `**Census**: not in scope — verify-signing-chain (tools/agent-generator/regrounding/verify-signing-chain.ts) — no instrument code or rule changes; the re-confirms and re-signs in § 4 are its ordinary inputs, read by --ci at application`
  - `**Census**: not in scope — check-section-citations (scripts/check-section-citations.ts) — the new text adds no MCP section citation; the guard's corpus changes only by prose it does not parse`
  - `scripts/ci/check-in-lane-guards.ts` is not a registered instrument: its register row is deferred to step 2 (the named-guard record, § "Grant paths", "Not granted"). So no line is owed for it, though the clause governs its input.

## 7. Review round record

#### [STACY R1]

*Read at `164ee6d12` from source, git and scratch runs; the PR body and CI logs were not read (no credentials in this seat). `[@STACY]` mentions: none open. Mandate: attack the width.*

**1. Does P1b close the class without weakening the floor? Yes, with three should-amendments.** I ran the § 2 predicate as written on scratch copies of the live registry (`jq-1.7.1`):

| Variant | Prints | Floor (`check-in-lane-guards.ts`) |
|---|---|---|
| pure append | `true` | — |
| duplicate `"file"` key inside entry 0 (re-point) | `false` | — |
| the same, plus a real append | `false` | — |
| entry 0 re-pointed, its original appended at the end | `true` | same parsed effect as one added entry: not a weakening |
| removal; removal plus append | `false`; `false` | — |
| `version` bump; bump plus append | `false`; `false` | — |
| two entries swapped (no append) | `false` | — |
| swapped plus append | `true` | reorder changes no entry: not a weakening |
| an existing entry appended a second time | **`true`** | red: `FAIL: … duplicate of entry 3 … counted once`, exit 1, but the line still reads `18 registered in-lane guards; 18 selected` |
| append with an extra key (`"skip": true`) | **`true`** | green: the check ignores extra fields |
| new top-level key plus append; an entry's `record` modified plus append | `false`; `false` | — |

Thurgood's § 2 claims reproduce. Two `true`s the clause does not cover:
- **A1 (should)**: add `and all($b[0].guards[]; keys == ["config","context","file","record"])` to the predicate. With it, the extra-key append prints `false` and every other row is unchanged (re-run). The clause says the added entry is a `{file, config, context, record}` object, and the predicate should test that. Harmless today, because the check ignores extra fields. But a later checker that reads a field such as `optional` would turn an append that passes the predicate into a weakening.
- **A2 (should)**: the evidence line should read: *the check's line `N registered in-lane guards; N selected`, with N the number of entries in `guards` at the PR head, and the step green.* As written, a red run satisfies "the N; N line" (the duplicate row above). The lane reds it, so it cannot merge green, but the evidence should not be readable as passing. Also: in the PR body, `git show main:` should be the merge base. At ARMING I read `<merge>^` against `<merge>`, and that read decides.
- **A3 (should)**: the per-entry evidence should also name *the assertion (the `it(…)` name) that the record's claim rests on*. That makes hole 2 checkable at the read (§ 4 below).
- **A4 (should, ordering)**: § 4 should say that the phase-3 registry commits in this PR come after the RATIFIED commit carrying Peter's dated words. Better still, his ruling should be on the PR as his own comment, outside the diff it authorizes (the spirit of issues README rule 10, which is written for grant lists). § 4 should also say that this PR's merge is P1b's first ARMING firing, over phase 3. The predicate's old side is `<merge>^`, so the read covers the F-1 and F-2 entries like any later ones.

**Residual the ballot does not name (a fork for Peter, not a blocker): maintenance friction.** Suppose a guard's owner renames or moves a registered file (say Lina renames a test). The required lane goes red: `registered file is absent`. The repair is to change the entry's `file`, which is a modification, so it is excluded and needs an issue-row grant or Peter's own act. P1b makes the registry grow (18 entries now; F-1 adds six or seven, and F-2 up to the rest of Ada's cited suites), so it also raises how often this blocks a merge. Options:
- (i) leave it, and renames go through Peter or a grant;
- (ii) admit one more act: a re-point whose old `file` is renamed in the same PR (an `R` row in `git diff -M --name-status`), which is decidable.

My lean is (i) until the first instance, then (ii) by amendment. It stays one rule now, and the trigger can be checked. Surviving counter: the first instance arrives as a red required check on someone else's unit, at the worst time to need Peter.

**2. Fork (a)/(b). I recommend (a); the pick is Peter's.**
- (a) keeps the floor's denominator with its owner. A second reader sees each entry before it lands, and my read comes after. It keeps one charter carrying a `.github/**` glob, not eight. The `charter-write-scope-render-fidelity` rule ("moves only by a `canonical/agents/**` edit, Peter-merged with every affected seat consulted") makes (b)'s true cost seven seat consults, not just seven edits. It also needs seven consumer-dispositions rows, under that row's planned fifth fixture. § 6's (b) cost line should say so.
- **Does (a) force Ada's registrations through Thurgood's seat? Yes, as authorship of the JSON line only.** The choice of suites and the record text stay Ada's: Thurgood's F-2 owner line already says "Which of the two is Ada's pick". F-1's suites are the `completion-criteria-parity` instrument's tests, Thurgood's own, so no cross-seat act. I find that acceptable. Under (a), a name-only finding lands on the adder (Thurgood), and the remedy goes to the file's owner.
- Surviving counter: if Thurgood is not in a unit, the guard's author must brief him or leave the guard unregistered, and an unregistered guard is the thing the floor cannot see. Revisit trigger I can count: at ARMING and at claims passes, an unregistered in-lane guard whose cause is "the author's seat could not register". The second instance re-argues (b).

**3. My ARMING-row text for P1b** (`canonical/agents/stacy.md`, trigger table, ARMING row). Apply it byte for byte under errata (f), as two insertions. Both avoid `|` (the row is a table cell) and the volatile-fact patterns. If A1 is taken, the read picks up the stronger predicate through its § 2 reference, with no change here.

Event: insert after `(ballot 2026-10-17-standing-write-scope-six-roots § 3 item 4)`:
```text
 / a PR whose diff touches `.github/in-lane-guards.json` merges (ballot 2026-10-20-in-lane-guard-registry-additive-entries, P1b; keyed on the path, never on the PR's own claim to be P1b)
```
Scope: insert after `on CI paths unless the grant names the act`:
```text
; for a PR touching `.github/in-lane-guards.json` — read at its merge `<m>` against `<m>^`, the first four reads decidable from git, the workflow and the check, the fifth a judgment: the PR's `.github/**` changes are exactly that file; the additivity predicate of ballot 2026-10-20-in-lane-guard-registry-additive-entries § 2, with `git show <m>^:.github/in-lane-guards.json` as its old side, prints `true`; the check's line reads `N registered in-lane guards; N selected` with N the number of entries in `guards` at `<m>` and the step green, from the PR's CI run (read by a session holding credentials) or else from your own run at `<m>`, saying which; for each added entry, its `config` is run by an unconditional step (no `if:`, no `continue-on-error`) of the job whose `name:` resolves to its `context` on a pull_request event, directly or through the `package.json` script that step calls (`git show <m>:.github/workflows/<file>`, `git show <m>:package.json`), and its `record` resolves at `<m>` and names the guard, or a class the PR body lists the file under; and the assertion in the file that the record's claim rests on, named, or a finding that the entry guards in name only. A `false` predicate or a touched existing entry is a finding on the executing agent, routed to Peter as an unadmitted weakening of a floor; a name-only entry is a finding on the adder, its remedy a stronger file, never a removal under this clause
```

**4. The two holes: acceptable residuals for a P1b. Neither must close before it ships.**
- **Hole 1 (a config no required job runs)**: confirmed. `check-in-lane-guards.ts` reads the registry, `EXPECTED_CONTEXTS` (evaluated by bash) and `npx jest --config <config> --listTests`. It never reads `.github/workflows/**`, so nothing ties a `config` to the `context`'s job. It is decidable, and the read above checks it on every P1b merge. Its exposure runs from the merge to my read, and only P1b entries can open it: the 18 existing entries use the two configs `lane-functional-root` runs (`npm test` gives `jest.functional.config.js`, at `lane-timing.yml` L242; `npm run test:scripts` gives `scripts/jest.config.js`, at L260; checked at #421). Step 2 is its mechanical home.
- **Hole 2 (a selected file that asserts nothing)**: confirmed, and permanent. No predicate can decide "asserts the claim". It predates P1b, but P1b raises its rate by making a name-only entry cheap. The clause also makes such an entry sticky: removing it is excluded, so the remedy is a stronger file (in the owner's scope, with no grant) or Peter. That bias is the right direction. A3 turns the read from "is it a guard?" into "does this named assertion red on the violation?". **The F-2 instance, checked myself**: `src/tokens/__tests__/FontSizeTokensFormulaValidation.test.ts` L172–173 asserts `Object.keys(fontSizeTokens).length` is `toBeGreaterThanOrEqual(11)`. A new, autonomous font-size token passes it. Registered under `§ no-autonomous-token-creation`, it would be hole 2 from birth. To Ada, through the F-2 owner line: register it only under a record naming what it does guard (formula values), add a closed-set assertion first, or narrow the row. Which one is her pick.

**5. Census check: correct.** All three lines use the `not in scope` form correctly, and each call holds:
- `122-diff-guard` (register `never-hand-edit-122-generated`, armed): the edited canonical units are its ordinary inputs;
- `verify-signing-chain` (`signing-act-consistency`, armed): the re-confirms and re-signs are its ordinary inputs;
- `check-section-citations` (`section-citation-resolution`, armed): it parses `get_section` / `get_document_*` blocks. The new text, including my row text above, adds none.

`check-in-lane-guards.ts` and `in-lane-guards` appear in no `governance/classification-map.md` row, so no line is owed.

One more instrument the census did not name, and correctly so: `charter-write-scope-render-fidelity` reads `check_state: proposed` with `checks: []`. That makes it no registered instrument under the census definition, so no line is owed. Its rule binds edit site 2 (see item 2), and the `writeScope[.github/in-lane-guards.json]` dispositions row in § 4 meets its planned fifth fixture.

`Standards implications: none` — the amendments are to this ballot's evidence and ordering, not to a standard.

**Verdict: ready with amendments (listed).** A1 (shape clause in the predicate), A2 (N equals the entry count, and the step green), A3 (name the assertion per entry), A4 (ordering: Peter's words before phase 3; this merge is the first P1b firing); plus my row text above for site 4. The maintenance-friction fork and the (a)/(b) fork go to Peter. Nothing blocks.

#### [THURGOOD R2]

*Incorporation, 2026-10-20, from `c1a24416b`. Nothing in [STACY R1] is rewritten.*
- **A1** (shape clause in the predicate): **in**, verbatim → § 2.
- **A2** (N equals the entry count and the step green; old side the merge base, `<m>^` at the read): **in** → § 2, and site 3's sentence.
- **A3** (name the `it(…)` assertion per added entry): **in** → § 2; § 5 fold-back.
- **A4** (phase-3 commits after the RATIFIED commit with Peter's dated words; this merge is P1b's first ARMING firing): **in** → § 4. The form recorded: Peter's words, dated, in chat or on the PR.
- **Site 4**: her two insertions (item 3) are the text applied, verbatim, under erratum (f) → § 3 site 4, § 4 step 2.
- **Fork (a)/(b)**: her recommendation and revisit trigger recorded under F-1 (a); (b)'s cost line now names the seven consults and dispositions rows → § 6.
- **Maintenance friction**: recorded as hole 3 (§ 5) and fork F-2 (§ 6); I recommend (i) with her trigger.
- **Hole 2, the F-2 instance** (`FontSizeTokensFormulaValidation.test.ts`, `toBeGreaterThanOrEqual(11)`): Ada's F-2 word excludes it from the suites to register (relayed by the orchestrator); recorded in the named-guard record's F-2 owner line, not here.
- **Census**: her read holds; no change.

## 8. Ratification

*(Empty at draft.)*
