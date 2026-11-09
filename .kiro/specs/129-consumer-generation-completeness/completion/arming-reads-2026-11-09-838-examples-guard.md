# ARMING reads of #838: the governance-examples guard's attribute and value half (Lina's predicate v1)

**Event**: ARMING, under my charter's row. The instrument-path limb fired because #838 changed `scripts/governance-examples/**`. The `pending.json` read fired because #838 changed `scripts/governance-examples/pending.json`. Beside them I made the census read this ballot's § 5 assigns to me: compare the build's census, in its first form, with the ratified projection. No other limb fired (§ A4).
**Reader**: Stacy · **Read date**: 2026-11-09 · **Tree read**: worktree `chore/stacy-arming-reads-838`, cut from `origin/main` = `44989996c`. That tree does not differ from `e0eaaf8ee` in `scripts/governance-examples`, `governance`, `.kiro/steering`, `src` or `package.json`. It was built with `npm run build`, which the import surface and the twin test need. Everything below was read from git at the commit it names, unless it says otherwise.
**Credentialed facts**: I read the PR body and the head's check runs with `gh`, using the credentials in the main checkout's `.env`. They were passed in the environment and never printed.
**Status**: a post-acceptance audit. **Never a gate**: no pass, at any grain, is ever a required check, a review gate, or a blocking condition on any PR.

---

## Summary of verdicts

| # | Read | Merge | Verdict |
|---|---|---|---|
| A1 | Instrument-path PR: `scripts/governance-examples/**` | #838 `e0eaaf8ee` | **Within the three reads** |
| A2 | `pending.json` | #838 | **Admitted: the ballot is RATIFIED, and the body's list equals the diff's additions.** Low finding F1, on the home record's count |
| A3 | The census against the ratified projection | #838 | **Equal on every number** |
| A4 | The other limbs | #838 | **None fired** |

---

## A1. The instrument-path limb (#838, `e0eaaf8ee`)

- **The merge**: 2026-11-09T02:52:37Z. PR head `5fe67f226`, branch `chore/examples-guard-attribute-half`, author Thurgood.
- **The squash matches the head.** `git diff --stat 5fe67f226 e0eaaf8ee` over the PR's twelve paths is empty.
- **The head's check runs**: 31 concluded `success`, 0 otherwise.

**The three reads:**
- **Read 1: deletions in `scripts/governance-examples/__tests__/*.test.ts`. One deletion, named, with its ballot.**
  - `git show --numstat` gives `governance-examples.test.ts` 115 added and 1 deleted, and `governance-examples.twin.test.ts` 55 added and 0 deleted. There is no `__fixtures__/**` change.
  - The one deleted line is `emptyPending()`'s header string, `adopted: 0000000 2026-10-26; entries: 0 (token-name 0, declared-path 0, shape 0, import 0)`. It is replaced by the item-2 header form.
  - The body says "Deletions in `scripts/governance-examples/__tests__/`: only the replaced header string in `emptyPending()` … which this ballot sets in item 2".
    - It names the directory and the function, not the file by name. `function emptyPending` occurs only in `governance-examples.test.ts` (`git grep`), so I read the file as named.
    - The ballot's Status reads RATIFIED at `e0eaaf8ee`.
  - The rule does not decide whether this weakens an assertion; that is the row's known gap. My own read: the fixture is a well-formed empty header in the old form, replaced by the same in the new form. It removes no assertion.
- **Read 2: the body cites the fixture test run.** The body cites the mutation table (A-2 to A-6, each red under its one-line mutation), the twin test (green, and red when skewed) and `test:scripts` (1618 passed).
  - **Re-run by me, on the built tree**: `npx jest -c scripts/jest.config.js scripts/governance-examples` gives `Test Suites: 2 passed`, `Tests: 57 passed, 57 total`. The guard's own run prints the report line the body gives and exits 0.
  - **The new suites fail at the base, re-run by me.** I swapped in `git show 5642cffe3:scripts/governance-examples/check.ts` and the same run gives `Test Suites: 2 failed`. I restored the file.
  - I did not re-run the body's per-rule mutations.
- **Read 3: `EXPECTED_CONTEXTS` is unchanged.** `verify-gate-registration.sh` is not in the diff. The twin file runs inside `test:scripts`, in the existing required lane. The in-lane registry entry is unchanged: the body reports `54 registered; 54 selected`, and `.github/in-lane-guards.json` is not in the diff.
- **The byte-exact claim, which the erratum puts in my hands.**
  - `scripts/governance-examples/attribute-predicate.md` (11 lines) is `cmp`-equal to the block in the amendment ballot (its first four-backtick fenced block).
  - It is also `cmp`-equal to the block under the guard ballot's § 8.11 heading.
  - The module header points to the file (`check.ts` L125).

**Result**: within the three reads. No finding.

## A2. The `pending.json` read (#838)

This is read from `git show e0eaaf8ee:` against `git show e0eaaf8ee^:` of the file, parsed as JSON and keyed by `doc`, `half`, `string` and `occurrence`.

- **The header changed.**
  - Before: `adopted: bdbe72a32 2026-10-26; entries: 69 (token-name 56, declared-path 9, shape 2, import 2)`.
  - After: `adopted: bdbe72a32 2026-10-26; attribute half adopted: 5642cffe3 2026-11-09; entries: 75 (token-name 56, declared-path 9, shape 2, import 2, tag 3, attribute 1, value 0, css-self-reference 2)`.
  - That is a finding unless it is admitted, and the admission test is below.
- **Entries at `e0eaaf8ee^`**: 0. The 69 of the first adoption had all been cleared before this PR, and the header keeps their baseline. So none was removed, re-keyed or re-homed.
- **Entries added**: 6.
  - `start-up-tasks.md` tag `test-file-path`;
  - `Component-Family-Badge.md` tag `list-item` and tag `card-header`;
  - `Component-Family-Form-Inputs.md` attribute `autocomplete`;
  - `Token-Family-Shadow.md` css-self-reference `--shadow-container` and `--shadow-fab`.

  Every entry has occurrence 0 and home `.kiro/issues/2026-11-09-examples-guard-attribute-half-adoption-hits.md`.
- **The admission test:**
  - **The ballot**: the body names `2026-11-08-governance-examples-guard-attribute-predicate`. Its first `**Status**:` line at `e0eaaf8ee` reads RATIFIED (Peter, 2026-11-09T01:38:37Z). Its item 4 admits exactly this class: the one adoption act of the attribute half.
  - **The header**: the body gives the header before → after, and both equal the file's.
  - **The list**: the body's table lists six entries. They equal the six the diff adds, with the same keys, lines and homes. The two notes also match: "false fire, A-5 v2 (…)" on the two css entries.
  - **Verdict: admitted.**
- **The homes.** The home record resolves at the issues root at `e0eaaf8ee`. It carries an `**Owners**:` line (Lina, Ada and Thurgood, split by doc) and a `**Trigger**:` line (`release:next:phase-1`).
  - The notes' citation, `.kiro/issues/2026-11-09-examples-guard-a5-token-boundary.md`, resolves at `e0eaaf8ee`. #837, which filed it, merged first, at 02:52:01Z, and is the merge's parent.
- **The two known css false fires do not change this read.** The read checks presence, keys, homes and the body's list. It does not check whether an entry is a true positive. Both css entries are listed, homed and noted.
- **F1**: the home record's `**Class**:` line says "Four of the six are false fires". Its own table marks three as false fires: `test-file-path`, `--shadow-container` and `--shadow-fab`. The PR body and the ballot's CORRECTION line also say 3 of 6. See Findings.

**Result**: admitted, with F1.

## A3. The census, against the ratified projection

The ballot's § 5, as ratified, puts the ruling on a projection. The build PR's body carries the census in its first form, and this read compares the two. A difference would be a finding routed to Peter.

- **Current digest**, re-run by me: base code (`5642cffe3`'s `check.ts`) over the corpus at `44989996c`. The corpus is unchanged since `5642cffe3`: `git diff 5642cffe3 HEAD -- governance .kiro/steering ':!governance/classification-map.md'` is empty. The digest is `c13c9780ba78265c40aed99293a5d4e72fdb710438509053637a164d52868bfd`, which equals the ballot's and the body's.
- **Proposed digest**, re-run by me with the shipped code: `8312377d8b3887af8152d57d88c6cf4be904bce14e74b36467ec1d68d966f93a`, which equals the body's.
- **Docs that change**: 21, the per-doc lines that differ between the two outputs. That equals the ratified projection under F-1 (a).
- **Hits per half**: tag 3, attribute 1, value 0, css-self-reference 2, in 4 docs, with not read 10 of 34. Each number equals the ratified projection.
- **The `--census` last line** now ends `predicate v1, file-shape rule v1, attribute predicate v1` (my P5). Its `selected:` counts are unchanged (1968).
- **The false-fire share** is 3 of 6. The ballot's ride-along CORRECTION records it, where the projection said 1. That error was in my replay, which read the two css hits as true. The count is equal and the reading differs, and the CORRECTION carries it.

**Result**: equal on every projected number. No finding.

## A4. The other limbs

- **A new barrier arms, or the required-check set changes**: neither. The guard was already armed, and the twin test runs in the existing lane.
- **P1, P1b, P1c and the native-lane paths**: none of them is touched.
- **Grant**: none. The change is in Thurgood's standing scope.

---

## Findings

None is a gate.

- **F1 (Low): the adoption record's Class line miscounts the false fires.**
  - *Promised*: the record homes the six hits.
  - *Claimed*: its `**Class**:` line says "Four of the six are false fires".
  - *Shipped*: its own table, the PR body and the ballot's CORRECTION say three.
  - A reader who takes the Class line at its word would expect one of `list-item`, `card-header` or `autocomplete` to clear with a predicate change rather than a doc fix.
  - Route: **Thurgood**, the filer, as an explicit message.

**An observation, not a finding**: the guard ballot's § 8.11 heading still reads "(Lina's text, byte-exact; module header)". The erratum is written at the amendment's site 1b. The module header's § 8.11 lines point to the sibling file, so no reader is sent to the wrong place. The heading describes where the text was meant to live, not where it is.

**Standards implications**: none.

## Method

- **Sample**: everything, which is one merge and every read the two limbs name, plus the census compare.
  - I decided the diffs, the deletion, the keys, the homes, the header and the byte comparison from git.
  - I took the body and the check runs from the API.
  - I re-ran the suites at the merged tree, the base-code falsification, and both census digests.
- **Not re-verified**: the body's per-rule mutation runs (A-2 to A-6 off), and its full `test:scripts` and `npm test` counts. My own run covers the guard's two suites.
- **Not made here**: the claims pass's counting block (the edit-kind lines, the CORRECTION's sweep line, the consult line), and the governance-examples read, which falls due at the next RELEASE phase 1.

*Signed: Stacy, 2026-11-09.*
