# Ballot Measure: standing write scope for the compile harness's stability script and rules module, and a bounded fix scope for `merge-hold.yml` (P1c)

**Date**: 2026-11-07 (drafted 2026-11-07T21:44:57Z, `date -u`)
**Drafted by**: Thurgood (Civitas steward; owner of `scripts/harness/stability.ts` and `scripts/harness/native-rules.ts` under Spec 129's plan; maintainer of the `merge-hold` and `law-ratified` checks; author of ballot `2026-09-27-ci-regime-standing-scope`)
**Status**: **DRAFT** — not ratified. No edit site below is applied. A merge of this file's PR ratifies nothing; only Peter's dated words in this Status line do.
**Owner**: Thurgood.
**Required reviewer**: **Stacy** — mandate: attack the width. She keeps the ARMING read that § 3's bound feeds, she is the census reader, and she co-owns the demotion read that § 2 rests on.
**Consulted seats**: Lina, Kenya, Data, Stacy (named in the brief), and **Ada**, whom the author adds; § 6 says why each one is on the list and what each is asked.
**Unit**: a standalone record-first ballot on `main`. It edits a charter and `.kiro/steering/`, so **Peter merges it** under the governance carve-out. Application follows ratification, in its own PR (§ 7).
**Amends**: ballot `2026-09-27-ci-regime-standing-scope` § 2 (M1, the standing scope: P1 and P1b); `canonical/agents/thurgood.md` frontmatter `writeScope` and § "In Scope"; `.kiro/steering/Agent-Directory.md` § "Thurgood" **Owns** line; and, in her seat and at her ruling, Stacy's ARMING row.
**Deadline**: ratified and applied before Spec 129's CLOSEOUT (U12), when the last tasks-row grants over `scripts/harness/**` end (Peter, 2026-11-07T20:24:04Z, "Re: bottleneck plan, approved": this ballot is sixth in the queue, before U12).

> ## Conflict of interest — stated first
>
> **The author is widening his own charter.** Every path below is one he benefits from owning. The conditions of the 2026-09-27 precedent apply here:
> - (1) this disclosure;
> - (2) Peter's ruled words are transcribed verbatim (§ 1);
> - (3) every element the author adds beyond them is marked **[author's addition — Peter rules]**;
> - (4) every path is listed by name and justified by a named recurring task, with a review trigger. There is no `scripts/harness/**` umbrella.

---

## 1. Authority to draft (Peter's words, verbatim)

From the orchestrator's records on `main`. The paraphrase of what each answered is the orchestrator's; only the quoted words are Peter's.

- **2026-11-07T20:21:05Z** (`.kiro/specs/129-consumer-generation-completeness/evidence/2026-11-07-peter-rulings-post-midpoint.md`): *"Re: 3, Fix approved with class option"*.
  - The class option he approved, as that record states it: **standing write scope for Thurgood over `scripts/harness/stability.ts`, `scripts/harness/native-rules.ts` and their tests, through `canonical/agents/thurgood.md`.**
  - The fix half (MP-1) is done: #735 (`3422fc026`), under his dated direction (README rule 10).
- **2026-11-07T20:24:04Z** (same record, follow-up): *"Re: bottleneck plan, approved"*. This ballot is sixth in the queue, before U12.
- **2026-11-07T20:43:17Z** (`…/evidence/2026-11-07-peter-rulings-arming-batch.md`): *"Re: Decision 1, (ii)"*. Option (ii), as that record states it: **`merge-hold.yml` joins this ballot**, which
  - "carries a mechanical bound on what counts as a fix: no step, `if:`, floor or assertion is removed; `run:` lines are unchanged; deleted comment lines are quoted";
  - "amends `2026-09-27` § 2 as needed";
  - "is consulted with Stacy";
  - "goes to Peter for ratification".
  - The option not picked: (i), one grant per fix.

**Peter's ruled limits from 2026-09-27 § 2 stay in force, verbatim**: *"New required contexts, changes to `EXPECTED_CONTEXTS`'s count, branch protection and repo settings stay Peter's."*

---

## 2. The gap, and why the scope is standing

### The gap

- **`scripts/harness/stability.ts` and `scripts/harness/native-rules.ts` are in no seat's standing write scope.** Checked over every `canonical/agents/*.md` `writeScope` at `e7f57c20b`: none names `scripts/harness/`. The author wrote both under Spec 129's tasks-row grants:
  - Task 5 (U1): `stability.ts` and `native-rules.ts`;
  - Task 19 (U3a): `stability.ts` again.
  - Those grants ended at their merges (Task-Completion-Protocol § "Coherent Units"). My MP-1 consult found this when the MIDPOINT pass routed a `stability.ts` defect to me (`completion/claims-pass-midpoint.md` MP-1).
- **`.github/workflows/merge-hold.yml` is outside the CI-regime standing scope.** That scope is `lane-timing.yml` test-script steps (P1) and added entries in `.github/in-lane-guards.json` (P1b). Ballot 2026-09-27 § 2 sends "every other `.github/**` path" through an issue-row grant.
  - #732 (`cd340c59b`) fixed the file with no grant. The correction record is `.kiro/issues/2026-11-07-merge-hold-yml-edit-in-732-had-no-grant-correction-record.md`. Stacy found it (F3, R9).
  - Its script, `scripts/completion-claims/merge-hold.ts`, is already mine (`scripts/completion-claims/**`, ballot 2026-10-17 § 2.2). So the owner of the `law-ratified` check can change what it decides but cannot change the file that runs it.

### Why the scope is standing: the demotion read outlives Spec 129

- **The read.** `.kiro/issues/2026-11-07-promoted-harness-contexts-demotion-read.md` (a P2 guard charter; owners Thurgood and Stacy) charters it. Each promoted harness context is read for demotion:
  - by me, at **every monthly health check and every release's S**;
  - by Stacy, at RELEASE;
  - in each case "from a stability record re-run then", which is `scripts/harness/stability.ts`'s output.
- **It is live now.** `harness-android-tokens` was promoted on 2026-11-07 and is in `EXPECTED_CONTEXTS` (`tools/agent-generator/verify-gate-registration.sh`). The read started at that merge.
- **It does not end with the spec.** Its close condition is that no harness context stays required, or that the read moves into a standing home by its owners' ballot. Spec 129's CLOSEOUT is neither.
- **Its instrument breaks in ordinary use.**
  - `stability.ts` has changed in three PRs over two days: #707, #713 and #735.
  - #735 (MP-1) fixed a defect that the committed record itself showed: an in-progress run was counted as a break.
  - The read is where that class of defect gets found. After U12, no tasks-row grant covers the file, so each fix would cost a grant record and a merge before the fix PR.
  - That is the resting state 2026-09-27 § 1 named as the defect: *the owner may not touch what he owns*.
- **`native-rules.ts` feeds a required context on every run.**
  - `harness/android/lane.ts` and `harness/ios/lane.ts` import it.
  - `probe-kotlin.ts` and `probe-swift.ts` take the theme-instance rule and the product-token names from it.
  - `tasks.md` L855 makes me its maintainer after U6.
  - `native-rules-emitter.test.ts` holds it together with the generator's emitter. A later native spec (132 is next) that changes the emitter's naming on purpose turns that test red, and the repair lands in `native-rules.ts` or the test.
  - Its base rate so far is **one commit** (#707). The case for it is that maintenance clause and the required context, not recurrence. § 8 keeps that against it.
- **`merge-hold.yml`** defines the required context `law-ratified` (`EXPECTED_COUNT` 21) and the advisory `merge-hold`. It has had one fix (#732), and that fix is the one that had no grant.

---

## 3. The items

### Item 1 — standing scope over the stability script and the rules module, with their tests

**The paths, by name** (condition 4):

| Path | Named recurring task | Review trigger |
|---|---|---|
| `scripts/harness/stability.ts` | The demotion read, monthly and at each release's S; each promotion offer's re-run (`tasks.md` § "Decision 6", step 1) | Removal proposed when no harness context remains required, the demotion-read charter's own close event |
| `scripts/harness/__tests__/stability.test.ts` | The falsification case each fix owes (the MP-1 pattern). A registered in-lane guard (`.github/in-lane-guards.json` L293) | as above |
| `scripts/harness/__tests__/fixtures/stability/**` | The recorded API shapes that test reads; a fix adds one per defect (the #717 instance in #735) | as above |
| `scripts/harness/native-rules.ts` | Maintainer after U6 (`tasks.md` L855); the repair after any intended change to the emitter's naming | as above |
| `scripts/harness/__tests__/native-rules.test.ts` | Its literal-expected-value test. A registered in-lane guard (L299) | as above |
| `scripts/harness/__tests__/native-rules-emitter.test.ts` | The emitter-comparison test I maintain after U6 (`tasks.md` L855; Task 18 registers it) | as above |

- **[author's reading — Peter rules]**: "their tests" is read as the three test files and the stability fixture directory. The emitter test exercises two files in two seats: `native-rules.ts` (mine) and Ada's `src/generators/TokenFileGenerator.ts`. It is listed here because `tasks.md` L855 names me its maintainer. Ada is consulted on any change to it (below).
- **Excluded** (named so the table cannot be read as `scripts/harness/**`): `compare.ts`, `consumer.ts`, `parse-kotlin.ts`, `parse-swift.ts`, `probe-kotlin.ts`, `probe-swift.ts`, their tests and fixtures, and everything under `harness/**`. Each stays with its task's PRIMARY while 129 is open, and with a grant afterwards.

**The limits** — **[author's addition — Peter rules]**. A glob cannot carry these, so the charter states them:
- **Owning these files never authorizes changing a rule they state.**
  - `native-rules.ts` states design § 4's rules. While Spec 129 is open, a rule change goes into `design.md` § 4 first and into the file second, as its header already says. After 129 closes, it goes into the text of the spec that supersedes § 4.
  - `stability.ts` applies `tasks.md` § "Decision 6": the break rules, infra handling, and the demotion triggers' inputs. After 129 closes, it applies whatever record re-homes that text. Changing what counts as a break, a counted run, a cold run or a trigger is a change to that text, by its owner's act. It is never a code edit.
  - **A defect fix is mine**: code that disagrees with the text it implements, as MP-1's did. It ships with a falsification case in its test that was red before the fix.
- **Consults** (they mirror the six-roots bullet's "Ada is consulted on any change to `scripts/derive-install-doc.ts`"):
  - **Ada** on any change to `native-rules.ts` that answers a `DESIGN-GAP:`, and on any change to `native-rules-emitter.test.ts`;
  - **Kenya** on any change to a Swift rule in `native-rules.ts`;
  - **Data** on any change to a Kotlin rule in `native-rules.ts`, and on any change to how `stability.ts` reads the `harness-infra` or `harness-verdict` annotation. That annotation is the interface between his resolve classifier and my script.
- **Grants**: task-row and issue-row grants add to this scope and never narrow it, as now. A later spec's task row that names one of these files gives its PRIMARY write access on that unit's branch alongside mine. The consult lines above still apply to that PR.

### Item 2 — P1c: fixes to `.github/workflows/merge-hold.yml`, inside a mechanical bound

**The scope**: in `.github/workflows/merge-hold.yml` only, an edit that meets clauses **B1–B4** below, each decided from git and the PR body; **B5** is a judgment, and is named as one. Nothing else in the file is in scope. Peter's verbatim limits (§ 1) apply unchanged. A new job, a renamed job, or a changed trigger is a context change or a weakening, and B2–B4 bar each of them mechanically.

**Fixed at the PR head, before merge**: `<base>` is `git merge-base origin/main HEAD` and `<m>` is `HEAD`. At ARMING, after the squash merge, `<base>` is `<m>^` and `<m>` is the merge commit. The PR body is read with `gh pr view <n> --json body -q .body`.

- **B1 — extent.** `git diff --name-only --no-renames <base> <m> -- .github` prints exactly `.github/workflows/merge-hold.yml`. The same PR may change files that are in my scope outside `.github/`, such as `scripts/completion-claims/merge-hold.ts`; that part is read by Stacy's instrument-path limb, as now.
- **B2 — deletions are comment lines only.** The deleted lines are the lines of `git diff -U0 --no-renames <base> <m> -- .github/workflows/merge-hold.yml` that begin `-`, except its `--- a/` and `--- /dev/null` headers, each with its leading `-` and trailing whitespace removed. This definition is ballot 2026-10-20 A-1's.
  - Their count equals `git diff --numstat`'s deletions for the file, or the read stops.
  - Each one is blank or a comment (`^[[:space:]]*#`).
  - **Why this decides Peter's four clauses**: a step, an `if:`, a floor, an assertion or a `run:` line can be removed or changed only by deleting a non-comment line. So "no step, `if:`, floor or assertion removed; `run:` lines unchanged" holds whenever B2 does. **[author's addition — Peter rules, F-1]**: B2 is stricter than those clauses read one at a time. It also bars changing any other key: `types:`, `permissions:`, `timeout-minutes:`, an action's version, `with:`.
  - **This holds only while the file has no block scalars.** At `e7f57c20b` it has no `run: |` and no `>`, and B4 bars adding one. Inside a block scalar, a `#` line is shell, not a YAML comment.
- **B3 — deleted comment lines are quoted.** The PR body carries, at column 0 and outside any other fenced block, a line `**Deleted lines**: .github/workflows/merge-hold.yml`, followed by one fenced code block at column 0. Each line in the block reads as it does in the file.
  - The sorted multiset of the block's non-blank lines, trailing whitespace removed, **equals** the sorted multiset of the deleted non-blank lines.
  - This is stricter than A-1, which allows a superset: there, the quote is made at activation, before the fix exists; here, it is made in the fix PR itself.
  - A PR that deletes nothing carries no block.
- **B4 — additions are allowlisted.** **[author's addition — Peter rules, F-1]** Each added line, taken the same way as in B2, is one of:
  - blank or a comment;
  - an `env:` key line (`^[[:space:]]+env:$`);
  - an environment entry `^[[:space:]]+[A-Z][A-Z0-9_]*: \$\{\{ github\.[A-Za-z0-9_.]+ \}\}$` whose key `<m>`'s `scripts/completion-claims/merge-hold.ts` reads as `process.env.<KEY>` (`git grep -F "process.env.<KEY>" <m> -- scripts/completion-claims/merge-hold.ts`).
  - **Why**: Peter's clauses bound what is removed. Stacy's residual on A-1 (2026-10-20, `[STACY R1]`) is that an added line can weaken a check with nothing deleted: `continue-on-error: true`, `if: false`, a `paths:` filter, or a new job, which is a new context. B4 bars each of them. #732's fix fits it: two comment lines, and `BASE_SHA` and `BASE_REF` in each job.
- **B5 — what an added environment entry does (judgment).** The PR body names each added entry, the script line that reads it, and one sentence on what it changes in the verdict. Whether it weakens the check is Stacy's read at ARMING, not something B1–B4 decide. This is the bound's known gap (§ 8).

**The read, as a query** (B1–B4; it prints one line per clause and a final `P1c bound: PASS` or `FAIL`). Run it at the repository root:

```bash
# usage: bash p1c-bound.sh <base> <m> <pr-body-file>
BASE=$1 M=$2 BODY=$3 F=.github/workflows/merge-hold.yml; fail=0
ext=$(git diff --name-only --no-renames "$BASE" "$M" -- .github)
[ "$ext" = "$F" ] && echo "B1 PASS extent" || { echo "B1 FAIL extent: $(echo $ext)"; fail=1; }
lines=$(git diff -U0 --no-renames "$BASE" "$M" -- "$F" | awk '
  /^(--- (a\/|\/dev\/null)|\+\+\+ (b\/|\/dev\/null))/ {next}
  /^-/ {l=substr($0,2); sub(/[ \t]+$/,"",l); print "D\t" l; next}
  /^\+/ {l=substr($0,2); sub(/[ \t]+$/,"",l); print "A\t" l}')
del=$(printf '%s\n' "$lines" | awk -F'\t' '$1=="D"' | cut -f2-)
add=$(printf '%s\n' "$lines" | awk -F'\t' '$1=="A"' | cut -f2-)
nd=$(printf '%s\n' "$lines" | awk -F'\t' '$1=="D"' | wc -l | tr -d ' ')
ns=$(git diff --numstat --no-renames "$BASE" "$M" -- "$F" | awk '{s+=$2} END{print s+0}')
bad=$(printf '%s\n' "$del" | grep -vE '^[[:space:]]*(#|$)')
[ "$nd" = "$ns" ] && [ -z "$bad" ] && echo "B2 PASS deletions: $nd, each a comment or blank" \
  || { echo "B2 FAIL deletions ($nd counted, $ns by numstat); not a comment: $bad"; fail=1; }
quote=$(awk '/^\*\*Deleted lines\*\*: \.github\/workflows\/merge-hold\.yml[[:space:]]*$/{f=1;next}
  f==1&&/^```/{f=2;next} f==2&&/^```/{exit} f==2{sub(/[ \t]+$/,"");print}' "$BODY" | grep -vE '^[[:space:]]*$' | sort)
want=$(printf '%s\n' "$del" | grep -vE '^[[:space:]]*$' | sort)
[ "$quote" = "$want" ] && echo "B3 PASS quoted: $(printf '%s' "$want" | grep -c .) line(s)" \
  || { echo "B3 FAIL: the **Deleted lines** block differs from the deleted non-blank lines"; fail=1; }
b4=0; while IFS= read -r a; do
  printf '%s\n' "$a" | grep -qE '^[[:space:]]*(#|$)' && continue
  printf '%s\n' "$a" | grep -qE '^[[:space:]]+env:$' && continue
  k=$(printf '%s\n' "$a" | sed -nE 's/^[[:space:]]+([A-Z][A-Z0-9_]*): \$\{\{ github\.[A-Za-z0-9_.]+ \}\}$/\1/p')
  if [ -n "$k" ] && git grep -q -F "process.env.$k" "$M" -- scripts/completion-claims/merge-hold.ts; then echo "   env entry: $k"; continue; fi
  echo "B4 FAIL added line: $a"; b4=1
done <<< "$add"
[ $b4 = 0 ] && echo "B4 PASS additions: comments, blanks and env entries the script reads" || fail=1
[ $fail = 0 ] && echo "P1c bound: PASS" || echo "P1c bound: FAIL"
```

**Exercised at draft** (`e7f57c20b`, 2026-11-07). Synthetic cases were committed in a scratch clone under the session scratchpad, never on a branch:

| Case | Expected | Result |
|---|---|---|
| #732 (`cd340c59b^..cd340c59b`), with its one deleted comment line quoted | PASS | PASS (B4 lists `BASE_SHA`, `BASE_REF` twice) |
| #732 as merged: its body has no `**Deleted lines**:` block | FAIL B3 | FAIL B3 only. #732 would have owed the quote |
| #727, the build (`16d44a500`) | FAIL | FAIL B1 (it also touched `in-lane-guards.json`) and B4 (`name:`, `on:`, …) |
| `continue-on-error: true` added to `law-ratified` | FAIL | FAIL B4 |
| `edited` dropped from `types:` | FAIL | FAIL B2, B3, B4 |
| `run:` line given `\|\| true` | FAIL | FAIL B2, B3, B4 |
| env entry `SKIP: "1"` (a literal value) | FAIL | FAIL B4 |
| env entry whose key the script does not read | FAIL | FAIL B4 |
| a step line rewritten to carry `if: false` | FAIL | FAIL B2, B3, B4 |
| job `law-ratified` renamed (a context change) | FAIL | FAIL B2, B3, B4 |
| a comment line reworded, not quoted / quoted | FAIL / PASS | FAIL B3 / PASS |

**Who reads it**: Stacy, at ARMING, keyed on the path. A PR whose diff touches `.github/workflows/merge-hold.yml` fires the read, whatever the PR claims about itself (the P1b precedent). Every failing clause is a finding on the executing agent. A failing B2, or a B5 weakening, is routed to Peter as an unadmitted weakening of a required check. RELEASE is the backstop, over the release delta. **Evidence owed in each P1c PR's body**: the query's output against the PR's merge base, and B5's lines.

**Review trigger** — **[author's addition — Peter rules]**, the P1 precedent: if P1c goes unused across two consecutive RELEASE passes, its removal is proposed by an amendment ballot. Any change to the required-context set re-reads P1c in the same record.

---

## 4. Before → after

### Edit site 1 — `canonical/agents/thurgood.md`, frontmatter `writeScope`

**(a) After L240** (`- ".github/in-lane-guards.json"`), insert:

```yaml
  # P1c, ballot 2026-11-07-thurgood-charter-scope-harness-and-merge-hold (RATIFIED Peter <date>): fixes inside its
  # § 3 bound B1–B5 only — the glob cannot carry the bound; the In Scope CI-regime bullet does
  - ".github/workflows/merge-hold.yml"
```

**(b) After L277** (`- "scripts/governance-examples/**"`), insert:

```yaml
  # ballot 2026-11-07-thurgood-charter-scope-harness-and-merge-hold item 1 (RATIFIED Peter <date>): the compile
  # harness's stability script and rules module, with their tests; the limits are in the In Scope bullet
  - "scripts/harness/stability.ts"
  - "scripts/harness/__tests__/stability.test.ts"
  - "scripts/harness/__tests__/fixtures/stability/**"
  - "scripts/harness/native-rules.ts"
  - "scripts/harness/__tests__/native-rules.test.ts"
  - "scripts/harness/__tests__/native-rules-emitter.test.ts"
```

Before (L236–241 and L274–278 at `e7f57c20b`), for the record: L240 `  - ".github/in-lane-guards.json"` is followed by `  # Standing scope added by ballot 2026-10-17-standing-write-scope-six-roots …`. L277 `  - "scripts/governance-examples/**"` is followed by `  # § 2.3 — the docs MCP`. Nothing is removed.

### Edit site 2 — `canonical/agents/thurgood.md` § "In Scope", the CI-regime bullet (L361)

- **Before** (the fragment that changes): `… and per added entry the assertion its record rests on. Every other CI path goes through an issue-row grant (§ 3). ARMING audits each such PR at its merge.`
- **After**: `… and per added entry the assertion its record rests on. In `.github/workflows/merge-hold.yml` only (P1c, ballot 2026-11-07-thurgood-charter-scope-harness-and-merge-hold § 3 item 2): a fix that passes that ballot's bound — `.github/**` changes exactly that file; deleted lines are comments or blank, and quoted in the PR body's `**Deleted lines**:` block; added lines are comments, blanks, `env:` keys and `${{ github.* }}` entries the script reads; the PR body carries the bound's query output and names what each added entry changes. Anything else in that file goes through an issue-row grant or is Peter's. Every other CI path goes through an issue-row grant (§ 3). ARMING audits each such PR at its merge.`

### Edit site 3 — `canonical/agents/thurgood.md` § "In Scope", a new bullet after the six-roots bullet (L362)

- **Before**: no bullet.
- **After**:
  > `- **Compile-harness instruments (ballot 2026-11-07-thurgood-charter-scope-harness-and-merge-hold § 3 item 1)**: you own `scripts/harness/stability.ts` and `scripts/harness/native-rules.ts`, with `stability.test.ts`, `fixtures/stability/**`, `native-rules.test.ts` and `native-rules-emitter.test.ts`, because the demotion read of each promoted harness context (`.kiro/issues/2026-11-07-promoted-harness-contexts-demotion-read.md`) runs `stability.ts` at every monthly health check and every release's S, and outlives Spec 129. Owning them never authorizes changing a rule they state: `native-rules.ts` follows design § 4 (or the spec text that supersedes it) first, and `stability.ts` follows `tasks.md` § "Decision 6" (or the record that re-homes it) first; a fix where the code disagrees with that text is yours, with a falsification case red before it. Ada is consulted on any change to `native-rules.ts` that answers a `DESIGN-GAP:` and on any change to `native-rules-emitter.test.ts`; Kenya on any change to a Swift rule; Data on any change to a Kotlin rule and to how `stability.ts` reads the `harness-infra` or `harness-verdict` annotation. The rest of `scripts/harness/**` and `harness/**` is not yours.`

### Edit site 4 — `.kiro/steering/Agent-Directory.md` § "Thurgood", **Owns** line (L74)

- **Before**: `… **the CI regime's standing test-lane scope (`lane-timing.yml` test-script steps with floors, and added entries in `.github/in-lane-guards.json`; ballot 2026-09-27-ci-regime-standing-scope, amended 2026-10-20)**, **Civitas infrastructure** (…).`
- **After**: `… **the CI regime's standing test-lane scope (`lane-timing.yml` test-script steps with floors, added entries in `.github/in-lane-guards.json`, and bounded fixes to `merge-hold.yml`; ballot 2026-09-27-ci-regime-standing-scope, amended 2026-10-20 and 2026-11-07)**, **the compile harness's stability script and rules module (`scripts/harness/stability.ts`, `native-rules.ts`)**, **Civitas infrastructure** (…). *(amended <date> by ballot 2026-11-07-thurgood-charter-scope-harness-and-merge-hold § 4 site 4; prior text at <SHA>)*`

### Edit site 5 — ballot `2026-09-27-ci-regime-standing-scope` § 2, a ledger line after the P1b line

- **After**: `*(Amended <date> by ballot `2026-11-07-thurgood-charter-scope-harness-and-merge-hold`: P1c, fixes to `.github/workflows/merge-hold.yml` inside that ballot's § 3 bound. The P1 row, P1b and Peter's ruled limits are unchanged; the clause lives in that ballot.)*`
- Its "Excluded paths — every other `.github/**` path" sentence is not rewritten. The ledger line is the amendment, as P1b's was.

### Edit site 6 — `canonical/agents/stacy.md`, the ARMING row (L404) — Stacy's seat, her edit, her ruling

The author proposes the shape; **Stacy writes the words** (the caller-out duty runs both ways: I do not write her row).
- **(a) The P1c event and read**: the Event gains "a PR whose diff touches `.github/workflows/merge-hold.yml` merges (P1c; keyed on the path)". The Scope gains "for a P1c PR, ballot 2026-11-07-thurgood-charter-scope-harness-and-merge-hold § 3 item 2: B1–B4 decided by its query, B5 a judgment".
- **(b) [author's addition — Peter rules, F-2]**: the instrument-path limb's path list gains the six item-1 paths. **Why**: `native-rules.ts` is loaded by `harness-android-tokens`, a required context, through `harness/android/lane.ts`. Both tests are registered in-lane guards. So a weakening there is a weakening of a gate, and today nothing reads it at merge.

### Edit site 7 — the regenerated surfaces, re-confirmed and re-signed (the P1b precedent, #427 `c219488d6`)

- `canonical/operative-sets/{thurgood,stacy,agent-directory}.yaml`;
- the consumer profile: dispositions, overlays, confirmations and signatures for `thurgood`, `stacy` and `agent-directory`, each by its C1 seat;
- regeneration (`.claude/agents/*`, `.kiro/agents/*`, including `thurgood.json`'s Kiro `allowedPaths`);
- `canonical/generated.lock`;
- `122-diff-guard` read green.

### Edit site 8 — records

- **Closed**: `.kiro/issues/2026-11-07-merge-hold-yml-edit-in-732-had-no-grant-correction-record.md`, whose trigger is this ballot's ratification. It gets a rule 5 outcome line.
- **Not closed**: the demotion-read charter (F-3).
- `.kiro/docs/ballots/README.md` § "Ballots on record": one entry, at ratification.

---

## 5. Census

Ballots README § "Conventions", "Instrument census". Every edit site is an ordinary input of the instruments below. No instrument's code, rule, pattern or grammar changes, so no item runs a census mode and there is no appendix.

- `**Census**: not in scope — 122-diff-guard (tools/agent-generator/diff-guard.ts, with workflow-rules-guard.ts) — the edited canonical units (sites 1–3, 6) are its ordinary inputs, regenerated and lock-refreshed at application, where its verdict is read`
- `**Census**: not in scope — 122-canonical-vs-truth and 122-sweep-1..8 (tools/agent-generator/canonical-vs-truth.ts, tools/agent-generator/sweeps/**) — they load canonical/** as ordinary inputs; no rule they implement changes; read green at application`
- `**Census**: not in scope — verify-signing-chain (tools/agent-generator/regrounding/verify-signing-chain.ts, with C1 and signatures.ts) — site 7's re-confirms and re-signs are its ordinary inputs, read by --ci at application`
- `**Census**: not in scope — check-section-citations (scripts/check-section-citations.ts) — the new text adds no MCP section citation`
- `**Census**: not in scope — law-ratified (scripts/completion-claims/merge-hold.ts --job law-ratified) — this ballot and the application PR's governance files are its ordinary inputs; the application PR's LAW lines cite this ballot, which must read RATIFIED at that head`
- `**Census**: not in scope — verify-gate-registration.sh — no context, job name or count changes; P1c's B2 and B4 bar a job rename or addition in merge-hold.yml`
- `**Census**: not in scope — the in-lane guards check (scripts/ci/check-in-lane-guards.ts) — no entry is added, changed or removed`
- Not a registered check, noted for completeness: the semantics-guard fixture `tools/agent-generator/__fixtures__/semantics-guard/canonical/agents/semguard.md` quotes an older copy of Stacy's ARMING row. It is a frozen fixture, and editing the real row does not change it.

---

## 6. Who is affected, and what each consulted seat is asked

| Seat | Why on the list | Questions |
|---|---|---|
| **Stacy** (required) | She reads P1c at ARMING (site 6 is her row). She is the census reader. She co-owns the demotion read whose instrument item 1 assigns. Her 2026-09-27 R1 narrowed P2–P4 on base rate, the same ground § 8 concedes. Peter named her for (ii) | (1) Is each of B1–B4 decidable by you **without asking me**, with the query as written? Name any input where it is not. (2) Does B4's allowlist close your A-1 residual for this file, and is B5 the right place for what is left? (3) Site 6(b): do you take the six harness paths into the instrument-path limb? (4) Attack the width: which of the six item-1 paths, or P1c itself, would you send back to per-event grants, on base rate? |
| **Data** | `harness-android-tokens`, the one promoted context, is his lane. `harness/android/lane.ts` and `probe-kotlin.ts` import `native-rules.ts`. His resolve classifier writes the `harness-infra` annotation that `stability.ts` reads. `harness-android-components` is the next promotion offer | (1) Is "Data is consulted on any Kotlin-rule change and on any change to how `stability.ts` reads the annotations" the right boundary, or should the annotation format be named as the interface, so that a change on **either** side consults the other? (2) Is anything in `native-rules.ts` you would want kept out of my standing scope? |
| **Kenya** | He reviewed the Swift rules in `native-rules.ts` (Task 5.4). `harness/ios/lane.ts` and `probe-swift.ts` import it. The iOS contexts' promotion and demotion use `stability.ts` | (1) Is a consult on Swift-rule changes enough, with design text first, or do you want a named review? (2) Does `stability.ts`'s unfinished-run handling (#735) fit the macOS queue shape (`fixtures/stability/ios-queue.json`) as you will read it at an iOS offer? |
| **Lina** | Generator shared-core primary: site 7 renders the new paths into Kiro `allowedPaths`. The six-roots rule that "a test under `scripts/` follows the file it exercises" is her test-ownership area, and the emitter test exercises two seats' files. She proposed that test's owner and its registration (`[LINA R3]` fixes 2a and 2b). She is PRIMARY of U7, in flight | (1) Does naming these tests in my frontmatter conflict with `.kiro/issues/2026-10-17-per-owner-test-folders.md`, or with how the generator renders `allowedPaths`? (2) Is listing the emitter test by name, with Ada consulted, what your R3 fix intended? (3) Does any remaining unit you lead (U7, U8 and on) need write access to these six paths, or to `merge-hold.yml`? |
| **Ada** — **[author's addition — Peter rules]**: not on the brief's list | `native-rules-emitter.test.ts` exercises her `TokenFileGenerator`, and she wrote it (Task 11, U6). `native-rules.ts`'s header makes her the one who answers each `DESIGN-GAP:`. Item 1 adds a consult obligation on her | (1) Do you accept being consulted on changes to the emitter test and on `DESIGN-GAP:` answers? (2) When an intended emitter change after 129 turns the comparison red, should the repair in `native-rules.ts` wait for your design text, or may it land in the same PR as your emitter change? |

**Not affected, and why**: Leonardo and Sparky. No web or product surface reads these paths.

---

## 7. Forks for Peter

- **F-1 — the form of the `merge-hold.yml` bound.**
  - **(a)** B1–B4 as drafted: deletions are comments only (B2), and additions are allowlisted (B4).
  - **(b)** Peter's four clauses read one at a time: non-comment deletions are allowed unless they remove a step, an `if:`, a floor or an assertion, or change a `run:` line; additions are not bounded.
  - **Recommendation: (a).** Under (b), "floor" and "assertion" have no decidable test in a workflow file. It also lets through weakenings that delete no step: dropping `edited` from `types:`, narrowing `permissions:`, `timeout-minutes: 1`, an added `paths:` filter, `continue-on-error: true`. The cases in § 3 show (a) failing each of them.
  - **What survives against (a)**: it is stricter than Peter's words. A routine fix (an action-version bump, a `timeout-minutes` change, a `with:` change, a trigger fix) still needs a per-fix grant. B4 is shaped on the one fix that exists (#732), so the next real fix may not fit it.
- **F-2 — site 6(b), the harness paths in Stacy's instrument-path limb.** Stacy rules on her row as its owner; Peter rules the fork.
  - **Recommendation: yes.** A rules-module weakening changes a required context's verdict.
  - **What survives**: about a minute of reading per harness PR for Stacy, including during Spec 132's native work, where these files may change often.
- **F-3 — write the demotion read into the charters now** (mine and Stacy's), closing its record, **or leave it in the record.**
  - **Recommendation: leave it.** The (b) thresholds in Decision 6 are "proposals for Peter at the first offer" and are not yet ruled. Writing them into two charters before that would freeze proposals, and cost Stacy a re-sign for a read that has not yet run once.
  - **What survives**: a live read stays in the weakest home, an issue record, until its owners' next ballot.

---

## 8. Counter-arguments (fold-back applied)

**What the counter-arguments changed in this draft:**
- B4's allowlist on additions: Stacy's A-1 residual, made decidable.
- B3's exact equality in place of a superset.
- Item 1's rule-change limits (the text first, the code second).
- The consults for Ada, Kenya and Data.
- The excluded-paths list, so the table cannot be read as `scripts/harness/**`.
- The review triggers.
- F-2.

**What survives, stated plainly:**

1. **The bound limits the workflow file, not the check.** `scripts/completion-claims/merge-hold.ts` is already in my standing scope, and the script decides `law-ratified`'s verdict.
   - Weakening the gate through the script is far easier than through the YAML. P1c buys decidability on the half of the instrument where a weakening is least likely.
   - The script half is read only by Stacy's instrument-path ARMING read, after the merge. It is never a gate.
   - B5 says the same for environment entries: an added `${{ github.* }}` value the script reads can change the verdict, and only a judgment reads that.
   - So P1c mainly turns a recorded procedure lapse (F3) into an in-scope act. It does not make the gate safer, and it should not be read as doing so.
2. **The base rates are thin.** `merge-hold.yml` has had one fix ever. `native-rules.ts` has had one commit ever. Stacy's R1 on 2026-09-27 sent P2–P4 back to per-event grants on exactly this ground.
   - The demotion read justifies `stability.ts` strongly. It justifies the other two by maintenance clauses and required-context exposure, not by recurrence.
   - Peter ruled the class option and (ii), so this is a residual, not a fork. If Stacy's width attack names a path, that is the evidence for sending it back.
3. **Concentration.** After this ballot, one seat owns all of these:
   - the script and the workflow of a required check (`law-ratified`);
   - the record that decides promotion offers and demotion offers;
   - the rules module behind a required context's per-run check;
   - and he writes the standards they are read against.
   The checks on him are Stacy's after-merge reads and Peter's merge. Both are human, and the first comes after the fact. The limits in item 1 and the bound in item 2 narrow what one seat can do silently. They do not change who holds it.

---

## 9. Review round record

*(Empty at draft. Consulted seats write their entries here per the Spec-Feedback-Protocol stamp format, `[STACY R1]`, `[DATA R1]`, `[KENYA R1]`, `[LINA R1]`, `[ADA R1]`; the author incorporates at `[THURGOOD R2]`.)*
