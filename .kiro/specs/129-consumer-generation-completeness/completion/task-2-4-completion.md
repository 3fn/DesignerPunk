# Task 2.4 Completion: Comparator verdict rules and summary line

**Date**: 2026-11-06
**Task**: 2.4 (Spec 129, Unit 1, parent 2)
**Agent**: Thurgood (Opus)
**Branch**: `task/129-compile-harness-t2`

## 1. What changed

- **`scripts/harness/compare.ts`** now holds the whole comparator. The 2.1 interface types are unchanged, so Kenya's and Data's branches build against the same contract. On top of them:
  - **The file-format readers**: `parseList`, `parseProtectedSet`, `parsePins` (js-yaml; the parsed document in canonical form for exception (a)), `parseTag`, `parseRetagged`, `triggerOf`, `tokenKind` and `labelFound`.
  - **`evaluate`**, a pure function. It applies design § 3 rules 1–5 and Req 3.3–3.8 and 3.11:
    - exit status against the parsed set, the probe exception, the cross-tier baseline;
    - the toolchain match, the floor, the two-sided comparison;
    - tags that resolve and can fire, under the requirements' "Can fire" definition;
    - additions under (a), (b) and (c), retags and the protected set;
    - the Req 3.8 summary line and one verdict line.
  - **`compareRepo`** reads the head and the merge base from git (the head from the commit, never the working tree) and the issues root at the head. It computes FIRED from local history by `scripts/issues-owned.sh`'s rules and never fetches.
  - **`main`** is the command line Tasks 3–5 wire against. Its run file, flags, exit status and checkout requirements are in `harness/README.md` § "The comparator's command line".
- **`harness/README.md`** gains § "The comparator": the selection per context, the failure classes, and the tag, addition and retag rules. It also gains the command line, and the rulings on Kenya's six and Data's eight observations, marked in place.

## 2. Targeted tests run

- `npx tsc -p tsconfig.scripts.json`: exit 0.
- `npx jest --config scripts/jest.config.js scripts/harness`: 1 suite, 96 tests, all pass. The suite is 2.5's.
- The credential grep `grep -n 'GITHUB_TOKEN\|GH_TOKEN\|gh pr\|pull_request' scripts/harness/compare.ts`: no line, exit 1.
- `npm run test:scripts`: 25 suites, 856 tests, all pass.

## 3. Application-time adaptations

1. **A pin file absent at a readable base counts as a changed pin** under (a). This is my reading of "a pinned value changes" when there was no pin. The orchestrator accepted it on 2026-11-06, and it has its own case.
2. **Exception (c) counts a lowered count as a removal**: "the same diff removes an entry" is read as "lowers the summed count of a key, the key gone included". A correct fix that halves a count is still a fix, and Req 3 means such a fix never to be a finding.
3. **Cross-tier is decided per key.** A `gen:` key the baseline reports at any count is dropped from the component context; a count difference alone is not cross-tier. This is design § 3 rule 5's wording ("a `gen:` key … the baseline does not [report]"). It has its own case.
4. **The retag rule for split keys.** Per key, a tag whose count falls is a source and a tag whose count rises is a destination, and each pair is one retag. A move between two labels of one record is printed but is not away from it. The protected set the rule reads is the union of the set at the base and at the head, so adding a record to the set in the same diff cannot be used to escape the rule.
5. **FIRED is computed locally.**
   - The rules mirror `scripts/issues-owned.sh`: `path:` after the last Trigger change, `merge:#<N>` by a first-parent `(#<N>)` subject, `tag:` by the tag's existence.
   - The history is the merge base's first-parent line, or the head's when there is no base.
   - A record new at the head, or one whose Trigger line the diff changes, has not fired.
   - Two limits, written in the README: a `merge:#<N>` closed without merging still reads as able to fire, and a glob the PR's own diff touches fires at the merge, not in the run.
6. **A new failure class, `history unreadable`, for a shallow clone.** The tag rules read the Trigger history, and a shallow clone gives a wrong FIRED answer instead of an error. The README states `fetch-depth: 0` for Task 5.
7. **While the probe is blocked, its listed `probe:` keys are not counted stale.** Design § 3 rule 1 exempts a blocked probe, and "its count is not compared" (Task 4's criterion).
8. **A floor of 0 fails**, as does a zero file count, whatever the floor. A floor computed as 0 means the lane's file list read nothing.
9. **The item-label rule was refined** from the 2.1 text. A label that ends a sentence (`A5.`) is found, and `A5` inside `A5.1` or `A5-x` is not. The 2.1 rule missed the sentence-end case; 2.5's first run found it.
10. **`--emit-observed`** was added, so that Task 5.2's baselines start from the comparator's own selection.
11. **The parsers are loaded at run time** (`require('./parse-swift')`), so this branch type-checks before Kenya's and Data's files merge. **Pending**: after the merges, switch to static imports, so `tsc` checks each parser against `ParseSwift` and `ParseKotlin`.
12. **Rulings on the seats' observations**, each marked in the README:
    - **Adopted as written**: `.txt` fixtures; the meaning of "printed twice" and Kenya's dedupe; the wider `unrooted`; Kenya's tie order `gen`, `pkg`, `probe`; Data's header lifetime and blank-line rule; the module names `tokens`, `probe` and `dp`; Data's Gradle flags.
    - **New rules**: the `formatKey` round-trip; `i:` and `v:` as terminators.
    - **Reconciled to the design**: location-less error lines are neither keys nor `unrooted` on either platform. Design § 3 rule 1 names "a driver error with no file path" as `pre-compile`.
13. **Observations for Stacy's review of the cases (not changes):**
    - Exception (a) is not scoped by platform, as Req 3.5 (a) is not. An iOS pin change admits an Android addition, and a case shows it.
    - A run with no merge base cannot check retags or protected-set removals either, because both are diffs. The summary line says so, after the required `additions not checked: no merge base`.
