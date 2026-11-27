# Lina R1: Q4 (RL-53, RL-54) and my three lapsed records

Read at `origin/main` and `origin/records/16.3.0-phase-1-stacy`. No edits made.

## RL-53: the 75→72 header

**#846 lowered the recorded baseline. It was my error.** The header records the adoption counts. It is not a running count:
- Guard ballot § 2.4 sets the form `adopted: <sha> <date>; entries: <N>` and "the entry count is at most the adopted count".
- `check.ts`'s module header says the counts "are the baselines of both adoptions".
- **Precedent**: #578, #609 and #595 removed 66 of the 69 entries and left the header at 69.
- **The rule**: adoption ballot § 2 clause 4 says no PR "changes the `header`, unless it executes a ballot, RATIFIED at that PR's merge, that names the change". My clause 2(a) grant covered my three entries, not the header.

**Effect.** The test's ceiling got stricter (72 against P = 3). What broke is the RELEASE comparand (F-3). The header is now half baseline (token-name 56) and half running count (tag 1). No verdict changed. The record is still false.

**Recommendation: put the header back to 75. Do not admit running counts by ballot.** The report line already prints P, and a running header would delete the baseline that F-3 reads.
- **The counter, folded in**: the restore is also a header change, so clause 4 needs a ratified ballot that names it. Thurgood would execute it, since he holds the file under clause 1.
- **The fold**: the restore rides the A-5 erratum below as a named class, so Peter rules once.
- **What survives**: this is ballot weight for undoing a one-string slip.

**Class option**: change the guard's stale line (`check.ts` L1605) to say "remove it; leave the header (adoption § 2 clause 4)", and pin the header in the test.
- **Cost**: two lines in Thurgood's instrument, with no law change.
- **What survives**: an editor can still change both lines. Only the ARMING read catches that, and RL-62 shows that read can run late.

## RL-54: #830's test change

**It is sound and tighter.**
- `toBeGreaterThan(1)` became `toBe(1)`, an exact pin.
- `7` became `6` because the renamed map no longer matches `isTokenFileName`.
- `resolveDeclaredPath('tokens.ts')` is still false for the same reason as before: it finds two files (L698). At `origin/main` those are `Badge-Label-Base/tokens.ts` and the `plain-map` fixture. Removing either one fails the test loudly.

The failure is one of form: my PR body didn't name the file. **Fix**: a dated line in Stacy's home citing record `2026-10-26-badge-count-notification-tokens-file-misnamed` and Thurgood's seat commit `22bfabc7b`.

## Does this need Peter's words?

- **RL-53: yes.** Clause 4 requires a ballot that is RATIFIED at the merge. The ARMING row routes header changes "to Peter". #857's `**Open for Peter**:` line also holds that PR's merge (Task-Completion-Protocol § "A question to Peter holds the merge").
- **RL-54: no.** The row leaves "whether a named deletion weakened an assertion" undecided, so the owner's dated line closes it.

## My lapsed records

All three are P2 guard records at their first lapse, so Peter picks spec, drop or fix-now (rule 11).

**1. Hand-written readiness claims: fix-now for the instances, spec 132 for the class.**
- **Why**: these are 80 false sentences in served docs, and M7 says fix them, not carry them.
- **Vehicle**: one Lina CORRECTION PR across 13 governance docs (about 80 lines, medium size, Peter-merged). It states each claim per platform, which leaves the generate-or-guard question open.
- **The class question** (generate the tables, or guard them) goes to a new rule-10 record, answered spec → 132. 132 is where native readiness first moves, and its D7 already feeds harness results into readiness.
- **132's merged outline does not name this record.** It needs an amendment line, which is Thurgood's to write as formalizer.
- **What survives**: rule 11 does not offer splitting a record. That split is my proposal.

**2. Icon-Base `name` values: fix-now.**
- **Why**: this is my domain and needs no ballot.
- **Vehicle**: a small Lina PR adding a `values:` list to `Icon-Base.schema.yaml`, derived from the `IconBaseName` union. A test fails on any difference, then the index is rebuilt.
- **Risk**: if it lapses again, fix-now is no longer an option.

**3. A-5 token boundary: fix-now, after Peter ratifies an erratum.** A-5 is ratified law (attribute-predicate ballot § 8.11).
- **Vehicle**: a small Thurgood instrument PR:
  - the regex gets the name boundary (`,`, `)` or whitespace);
  - `attribute-predicate.md` is updated byte-exact;
  - one fixture pair is added;
  - the predicate becomes "attribute predicate v2", with a census;
  - the two Shadow entries are deleted, with me on the `**Agent**:` line;
  - the header is restored to 75 (RL-53).
