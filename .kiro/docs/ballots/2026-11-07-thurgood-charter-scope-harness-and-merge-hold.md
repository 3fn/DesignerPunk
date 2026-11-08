# Ballot Measure: standing write scope for the compile harness's stability script and rules module, and a bounded fix scope for `merge-hold.yml` (P1c)

**Date**: 2026-11-07 (drafted 2026-11-07T21:44:57Z, `date -u`)
**Drafted by**: Thurgood (Civitas steward; owner of `scripts/harness/stability.ts` and `scripts/harness/native-rules.ts` under Spec 129's plan; maintainer of the `merge-hold` and `law-ratified` checks; author of ballot `2026-09-27-ci-regime-standing-scope`)
**Status**: **RATIFIED (Peter, 2026-11-07T22:30:08Z)**. Peter's words, verbatim. The orchestrator recorded them with `date -u` at receipt in `.kiro/specs/129-consumer-generation-completeness/evidence/2026-11-07-peter-rulings-charter-ballot-and-ripple.md` (`de7c66774`):
- 2026-11-07T22:16:40Z: "Re: 2, * F-1, (a) * F-2, Yes * F-3, As recommended * F-4, (a)". The line breaks are in the record. "2" is this ballot in the orchestrator's list. The fork rulings, read against § 7:
  - **F-1:** (a), so the bound is B1–B5, with B6 a judgment;
  - **F-2:** yes, so the six item-1 paths join Stacy's instrument-path limb and its deletions-zero read;
  - **F-3:** as recommended, so the demotion read stays in its record;
  - **F-4:** (a), so Kenya and Data **review**.
- 2026-11-07T22:30:08Z: "Re: charter-scope ballot, ratified".

**Record-first**: this commit is the record, made before any edit site is applied. The edit sites land in the application PR (§ 4). *(Prior text at `43404383e`: "**DRAFT** — not ratified. No edit site below is applied. A merge of this file's PR ratifies nothing; only Peter's dated words in this Status line do. Round 1 (five consults) and a cross-read round are in § 9, spliced byte for byte, and folded at `[THURGOOD R2]` (2026-11-07T21:59:54Z). Peter's forks are in § 7.")*
**Owner**: Thurgood.
**Required reviewer**: **Stacy** — mandate: attack the width. She keeps the ARMING read that § 3's bound feeds, she is the census reader, and she co-owns the demotion read that § 2 rests on.
**Consulted seats**: Lina, Kenya, Data, Stacy (named in the brief), and **Ada**, whom the author adds; § 6 says why each one is on the list and what each is asked.
**Unit**: a standalone record-first ballot on `main`. It edits a charter and `.kiro/steering/`, so **Peter merges it** under the governance carve-out. Application follows ratification, in its own PR (§ 7).
**Amends**: ballot `2026-09-27-ci-regime-standing-scope` § 2 (M1, the standing scope: P1 and P1b); `canonical/agents/thurgood.md` frontmatter `writeScope` and § "In Scope"; `.kiro/steering/Agent-Directory.md` § "Thurgood" **Owns** line; Spec 129 `design.md` § 4, "The shared harness module", the sentence "a change after U6 rides a task-row or issue-row grant, because `scripts/harness/**` is not in a standing scope" (`[LINA R1]` A2); and, in her seat and at her ruling, Stacy's ARMING row.
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
- **2026-11-06T23:31:58Z** (`…/evidence/2026-11-06-peter-rulings-round-3.md`; design.md L43): *"A enum, B Thurgood, C confirmed, D yes; merges done"*. "B" is, as design.md L43 and L471 record it: **Thurgood owns and authors `scripts/harness/native-rules.ts`**. The same ruling's design text, L477, reads: *"Ada is consulted on every rule change. Kenya and Data each review their own platform's rules."* (`[LINA R1]` A3; `[ADA R1]` A-1.)

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
  - **Its ownership is ruled**: "B Thurgood" (§ 1). `tasks.md` L855 and design.md L474 add the emitter test's maintenance after U6.
  - `native-rules-emitter.test.ts` holds it together with the generator's emitter. A later native spec (132 is next) that changes the emitter's naming on purpose turns that test red, and the repair lands in `native-rules.ts` or the test.
  - Its base rate so far is **one commit** (#707). The case for it is a ruled ownership and a required context, not recurrence. § 8 keeps the base rate against it.
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
| `scripts/harness/native-rules.ts` | Owner and author by Peter's "B Thurgood" (§ 1); the repair after any intended change to the emitter's naming | as above |
| `scripts/harness/__tests__/native-rules.test.ts` | Its literal-expected-value test. A registered in-lane guard (L299) | as above |
| `scripts/harness/__tests__/native-rules-emitter.test.ts` | The emitter-comparison test I maintain after U6 (`tasks.md` L855; design.md L474; Task 18 registers it) | as above |

- **[author's reading — Peter rules]**: "their tests" is read as the three test files and the stability fixture directory. The emitter test exercises two files in two seats: `native-rules.ts` (mine) and Ada's `src/generators/TokenFileGenerator.ts`. It is listed here because `tasks.md` L855 and design.md L474 name me its maintainer. `[LINA R1]` Q2 confirms this is what her fix 2b intended. Ada asks for no write access to it (`[ADA R1]`).
- **Excluded** (`[LINA R2]` and `[DATA R2]` item 3; `[DATA R1]` D-3's wording):
  - `compare.ts`, `consumer.ts`, `parse-kotlin.ts`, `parse-swift.ts`, `probe-kotlin.ts` and `probe-swift.ts`, plus `d2-check.ts` once U8 adds it (Task 13; not on `main`), with the `.test.ts` file of each;
  - `native-harness-workflow.test.ts`, "which tests the workflow and goes with the workflow's grant";
  - every `fixtures/` directory except `fixtures/stability/` (`fixtures/{kotlin,swift,parse-kotlin,parse-swift}` at `e7f57c20b`);
  - `harness/**`;
  - and every other file under `scripts/harness/` that the table does not name.

  Each stays with its task's PRIMARY while 129 is open, and with a grant afterwards.

  *(Amended 2026-11-08 by ballot `2026-11-07-native-lane-ownership` item 4: `compare.ts` and `compare.test.ts` join Thurgood's standing scope from Spec 129 U12's merge. Items 1, 2 and 5 of that ballot give the Kotlin, Swift and consumer files to Data, Kenya and Ada. The rest of this list is unchanged.)*

**The limits** — **[author's addition — Peter rules]**. A glob cannot carry these, so the charter states them:
- **Owning these files never authorizes changing a rule they state.**
  - `native-rules.ts` states design § 4's rules. While Spec 129 is open, a rule change goes into `design.md` § 4 first and into the file second, as its header already says. After 129 closes, it goes into the text of the spec that supersedes § 4.
  - `stability.ts` applies `tasks.md` § "Decision 6": the break rules, infra handling, and the demotion triggers' inputs. After 129 closes, it applies whatever record re-homes that text. Changing what counts as a break, a counted run, a cold run or a trigger is a change to that text, by its owner's act. It is never a code edit.
  - **A defect fix is mine**: code that disagrees with the text it implements, as MP-1's did. It ships with a falsification case in its test that was red before the fix.
- **Which copy is wrong** (`[ADA R1]` A-3). When the emitter comparison or the per-run instance check goes red with no intended change behind it, the code does not decide which copy is at fault. Ada and I each read the red against the design text. The copy that disagrees with the text is the one fixed. If the text is silent, that is a `DESIGN-GAP:`, answered in the design first.
- **The mirror's author is never the emitter's author** (`[ADA R1]` A-2; **[author's addition — Peter rules]**: the one exception to "grants never narrow"). A repair to `native-rules.ts` after the emitter comparison or the per-run instance check goes red cites, in its PR body, the design sentence each changed rule restores. It is authored by the module's owner, or by a grant holder who did not author the emitter change in the same unit. A task-row or issue-row grant over `native-rules.ts` never goes to the seat that holds `src/generators/**` in that unit. Both halves may land in one PR: the emitter half by its owner, the mirror half by me from the design sentence, without reading the emitter diff (`[ADA R1]` (2); `[LINA R2]` withdraws her residual on this ground).
- **Consults on `native-rules.ts` — one rule** (`[ADA R2]`, `[DATA R2]`, `[KENYA R2]`, `[LINA R2]`; it restores design.md L477's ruled "Ada is consulted on every rule change", which the draft narrowed without marking it):
  - **Ada** on every change to `native-rules.ts` outside its comments, a defect fix included, and on any change to `native-rules-emitter.test.ts`. Her consult reads the change against the design text, never against the emitter's output (`[ADA R2]` residual).
  - **Kenya and Data each review** every such change (F-4 (a), as ruled: design.md L477's word). A seat owes no review when every changed hunk lies inside a declaration or `BINDING` key named for the other platform. Swift-named: a top-level declaration named `swift*`, `isSwift*` or `SWIFT_*`, or the key `BINDING.swift`. Kotlin-named: `kotlin*`, `KOTLIN_*`, or `BINDING.kotlin`. A hunk is a hunk of `git diff -U0 <base> <m> -- scripts/harness/native-rules.ts`; it "lies inside" a declaration when its lines fall within that declaration's span in the file at `<m>` (at `<base>`, for a hunk that only deletes). A shared helper therefore goes to all three seats. That is correct: a shared helper changes both platforms' output (`[KENYA R2]`).
  - **The record** (`[KENYA R1]` A-2). Each owed consult or review is a `**Consulted**: <Seat> — <one-line read>` line in the PR body. Where a review is owed, the line cites the seat's review entry. A seat's review entry in the same unit satisfies the duty, cited on that line (`[KENYA R2]`).
  - **Review, as ruled** (F-4 (a), Peter, 2026-11-07T22:16:40Z). Kenya's and Data's duty is a review entry, as design.md L477 states it, not a consult.
  - *(Amended 2026-11-08 by ballot `2026-11-07-native-lane-ownership` item 4: a change is "outside its comments" when `git diff -U0 <base> <m> -- <file>` has an added or removed line, other than the `+++` and `---` headers, that is not blank and does not start, after leading spaces, with `//`, `/*`, `*` or `*/`.)*
- **Consults on `stability.ts`**:
  - **The annotation interface** (`[DATA R1]` D-1). The interface between the harness jobs and `stability.ts` is the set of annotation titles a harness job writes (`harness-verdict`, `harness-infra`, `cache`, and any title a later unit adds, such as U7a's `default-name`) and each one's message format. A change to how `stability.ts` reads that set consults the owner of each affected producer: Data for `harness/android/lane.ts` and the Android jobs' annotation steps, and Kenya for the iOS ones. A change to a producer, meaning `lane.ts`'s `infra.json` fields or values, a job's annotation step, or a new title, consults Thurgood. The second half binds producers outside this ballot's paths. It is a consult duty, not a write grant.
  - **The iOS reads** (`[KENYA R1]` A-3). Kenya is consulted on any change to how `stability.ts` computes an iOS context's queue time, reads the Xcode pin, or applies condition 3's iOS rule or condition 5.
- **Grants**: task-row and issue-row grants add to this scope and never narrow it, except as the A-2 limit above says. A later spec's task row that names one of these files gives its PRIMARY write access on that unit's branch alongside mine. The limits and consults above apply to that PR as they apply to mine.

### Item 2 — P1c: fixes to `.github/workflows/merge-hold.yml`, inside a mechanical bound

**The scope**: in `.github/workflows/merge-hold.yml` only, an edit that meets clauses **B1–B5** below. Each of them is decided from git, the PR body and the repository's own YAML parser. **B6** is a judgment, and is named as one. Nothing else in the file is in scope. Peter's verbatim limits (§ 1) apply unchanged. A new job, a renamed job, a changed trigger or a re-parented key is a context change or a weakening, and B2–B5 bar each of them mechanically. B5 is what bars the ones made by insertion alone (`[STACY R1]` F-A, F-E).

**Fixed at the PR head, before merge**: `<base>` is `git merge-base origin/main HEAD` and `<m>` is `HEAD`. At ARMING, after the squash merge, `<base>` is `<m>^` and `<m>` is the merge commit. The PR body is read with `gh pr view <n> --json body -q .body`. The query runs at the repository root after `npm ci`, because B5 loads the repository's `js-yaml`.

- **B1 — extent.** `git diff --name-only --no-renames <base> <m> -- .github` prints exactly `.github/workflows/merge-hold.yml`. The same PR may change files that are in my scope outside `.github/`, such as `scripts/completion-claims/merge-hold.ts`; that part is read by Stacy's instrument-path limb, as now.
- **B2 — deletions are comment lines only.** The deleted lines are the lines of `git diff -U0 --no-renames <base> <m> -- .github/workflows/merge-hold.yml` that begin `-`, except its `--- a/` and `--- /dev/null` headers, each with its leading `-` and trailing whitespace removed. This definition is ballot 2026-10-20 A-1's.
  - Their count equals `git diff --numstat`'s deletions for the file, or the read stops.
  - Each one is blank or a comment (`^[[:space:]]*#`).
  - **This is Peter's four clauses in their literal form.** A step, an `if:`, a floor, an assertion or a `run:` line can be removed or changed by deleting a line only if that line is not a comment. **[author's addition — Peter rules, F-1]**: B2 is stricter than those clauses read one at a time. It also bars changing any other key by deletion: `types:`, `permissions:`, `timeout-minutes:`, an action's version, `with:`. A change made by inserting a line alone is B5's to catch, not B2's.
  - **The block-scalar premise** (`[STACY R1]` amendment 2). Inside a `run: |` or `>` block, a `#` line is shell, not a YAML comment, so B2 alone would pass its deletion. The premise is no longer assumed: B5 fails any such deletion, because the scalar's string changes. The case table shows it.
- **B3 — deleted comment lines are quoted.** The PR body carries, at column 0 and outside any other fenced block, a line `**Deleted lines**: .github/workflows/merge-hold.yml`, followed by one fenced code block at column 0. Each line in the block reads as it does in the file.
  - The sorted multiset of the block's non-blank lines, trailing whitespace removed, **equals** the sorted multiset of the deleted non-blank lines.
  - Carriage returns are removed from the body before the comparison (`[STACY R1]` amendment 4), so a CRLF body is not a false finding.
  - This is stricter than A-1, which allows a superset: there, the quote is made at activation, before the fix exists; here, it is made in the fix PR itself.
  - A PR that deletes nothing carries no block.
- **B4 — added lines are allowlisted.** **[author's addition — Peter rules, F-1]** Each added line, taken the same way as in B2, is one of:
  - blank or a comment;
  - an `env:` key line (`^[[:space:]]+env:$`);
  - an environment entry `^[[:space:]]+[A-Z][A-Z0-9_]*: \$\{\{ github\.[A-Za-z0-9_.]+ \}\}$` whose key `<m>`'s `scripts/completion-claims/merge-hold.ts` reads as `process.env.<KEY>`, matched as a whole name (`process\.env\.<KEY>` not followed by a letter, digit or `_`; `[STACY R1]` amendment 3, F-C).
  - **Why**: Peter's clauses bound what is removed. Stacy's residual on A-1 (2026-10-20, `[STACY R1]`) is that an added line can weaken a check with nothing deleted: `continue-on-error: true`, `if: false`, a `paths:` filter, or a new job, which is a new context. Every weakening key in Actions is lower-case, so none of them can be added under B4's upper-case entry pattern (`[STACY R1]` (2)). #732's fix fits it: two comment lines, and `BASE_SHA` and `BASE_REF` in each job.
- **B5 — structure.** **[author's addition — Peter rules, F-1]** (`[STACY R1]` amendment 1). Both sides are parsed with the repository's `js-yaml` (4.x, `package-lock.json`), which rejects a duplicated mapping key.
  - `<m>` parses (F-B fails here).
  - The two trees are equal once every `env` map is removed from both.
  - Every `env` map at `<base>` is a sub-map of the map at the same path at `<m>`. No key is removed or changed.
  - Every key added to an `env` map meets B4's entry rule: an upper-case name, a `${{ github.* }}` value, and read by the script as a whole name.
  - **Why the parse, and not Stacy's cheaper route.** Her route removes `env:` lines from B4's allowlist and adds a duplicate-key check (`[STACY R2]` item 6). I take the parse, for four reasons:
    1. **The cheaper route leaves an insertion that only GitHub decides.** Case n8 below inserts `BASE_REF: ${{ github.head_ref }}` at indent 4, under the job. It passes B1–B4 under either allowlist: it is an entry line, not an `env:` line, and it has no duplicate. `js-yaml` reads it as a job key. Whether GitHub rejects that key or ignores it cannot be decided from git. B5 fails it, because the tree changes.
    2. **A duplicate-key check needs a parser anyway**, or a line rule that would have to rebuild YAML's nesting. Once the parser is paid for, a tree comparison costs about 25 lines more.
    3. **It turns the block-scalar premise from an assumption into a check** (amendment 2).
    4. **It keeps the `env:` line**, so a later fix that needs a step's first environment block still fits. #732 did not need one; the next fix may.
  - **What survives against the parse**: `js-yaml` is not GitHub's parser. They can differ on anchors, merge keys and duplicate-key handling. B5 decides what the repository's parser reads, not what Actions runs. It also makes the bound depend on `npm ci` and Node.
- **B6 — what an added environment entry does (judgment).** The PR body names each added entry, the script line that reads it, and one sentence on what it changes in the verdict. Whether it weakens the check is Stacy's read at ARMING, not something B1–B5 decide.
  - At `e7f57c20b` the script reads three keys: `BASE_REF`, `BASE_SHA` and `GITHUB_STEP_SUMMARY` (`merge-hold.ts` L365–372, L433). The first two are already set at step level in both jobs, and step level overrides job level.
  - So once B5 bars a duplicate, B6 has no live instance. It opens only when `merge-hold.ts` gains a new `process.env` read, and that change is an instrument-path PR that Stacy's limb already reads. **B6's exposure is coupled to the script half, not separate from it** (`[STACY R1]` (2); § 8 item 1).

**The read, as a query** (B1–B5; it prints one line per clause and a final `P1c bound: PASS` or `FAIL`):

```bash
# usage: bash p1c-bound.sh <base> <m> <pr-body-file>   (run at the repository root, after npm ci)
BASE=$1 M=$2 BODY=$3 F=.github/workflows/merge-hold.yml; fail=0
ext=$(git diff --name-only --no-renames "$BASE" "$M" -- .github)
[ "$ext" = "$F" ] && echo "B1 PASS extent" || { echo "B1 FAIL extent: $(echo $ext)"; fail=1; }
lines=$(git diff -U0 --no-renames "$BASE" "$M" -- "$F" | awk '
  /^(--- (a\/|\/dev\/null)|\+\+\+ (b\/|\/dev\/null))/ {next}
  /^-/ {l=substr($0,2); sub(/[ \t\r]+$/,"",l); print "D\t" l; next}
  /^\+/ {l=substr($0,2); sub(/[ \t\r]+$/,"",l); print "A\t" l}')
del=$(printf '%s\n' "$lines" | awk -F'\t' '$1=="D"' | cut -f2-)
add=$(printf '%s\n' "$lines" | awk -F'\t' '$1=="A"' | cut -f2-)
nd=$(printf '%s\n' "$lines" | awk -F'\t' '$1=="D"' | wc -l | tr -d ' ')
ns=$(git diff --numstat --no-renames "$BASE" "$M" -- "$F" | awk '{s+=$2} END{print s+0}')
bad=$(printf '%s\n' "$del" | grep -vE '^[[:space:]]*(#|$)')
[ "$nd" = "$ns" ] && [ -z "$bad" ] && echo "B2 PASS deletions: $nd, each a comment or blank" \
  || { echo "B2 FAIL deletions ($nd counted, $ns by numstat); not a comment: $bad"; fail=1; }
quote=$(tr -d '\r' < "$BODY" | awk '/^\*\*Deleted lines\*\*: \.github\/workflows\/merge-hold\.yml[[:space:]]*$/{f=1;next}
  f==1&&/^```/{f=2;next} f==2&&/^```/{exit} f==2{sub(/[ \t]+$/,"");print}' | grep -vE '^[[:space:]]*$' | sort)
want=$(printf '%s\n' "$del" | grep -vE '^[[:space:]]*$' | sort)
[ "$quote" = "$want" ] && echo "B3 PASS quoted: $(printf '%s' "$want" | grep -c .) line(s)" \
  || { echo "B3 FAIL: the **Deleted lines** block differs from the deleted non-blank lines"; fail=1; }
b4=0; while IFS= read -r a; do
  printf '%s\n' "$a" | grep -qE '^[[:space:]]*(#|$)' && continue
  printf '%s\n' "$a" | grep -qE '^[[:space:]]+env:$' && continue
  k=$(printf '%s\n' "$a" | sed -nE 's/^[[:space:]]+([A-Z][A-Z0-9_]*): \$\{\{ github\.[A-Za-z0-9_.]+ \}\}$/\1/p')
  if [ -n "$k" ] && git grep -q -E "process\.env\.$k([^A-Za-z0-9_]|\$)" "$M" -- scripts/completion-claims/merge-hold.ts; then echo "   env entry: $k"; continue; fi
  echo "B4 FAIL added line: $a"; b4=1
done <<< "$add"
[ $b4 = 0 ] && echo "B4 PASS additions: comments, blanks and env entries the script reads" || fail=1
node - "$BASE" "$M" <<'JS' || fail=1
const y = require(process.cwd() + '/node_modules/js-yaml'), cp = require('child_process');
const [base, m] = process.argv.slice(2), F = '.github/workflows/merge-hold.yml';
const show = (r) => cp.execFileSync('git', ['show', `${r}:${F}`]).toString();
const script = cp.execFileSync('git', ['show', `${m}:scripts/completion-claims/merge-hold.ts`]).toString();
let A, B;
try { A = y.load(show(base)); B = y.load(show(m)); } catch (e) { console.log('B5 FAIL parse: ' + e.message.split('\n')[0]); process.exit(1); }
const bad = [], keyRe = /^[A-Z][A-Z0-9_]*$/, valRe = /^\$\{\{ github\.[A-Za-z0-9_.]+ \}\}$/;
const strip = (x) => Array.isArray(x) ? x.map(strip) : (x && typeof x === 'object')
  ? Object.fromEntries(Object.keys(x).filter((k) => k !== 'env').map((k) => [k, strip(x[k])])) : x;
const walk = (a, b, p) => {
  if (Array.isArray(b)) { b.forEach((v, i) => walk(a ? a[i] : undefined, v, `${p}[${i}]`)); return; }
  if (!b || typeof b !== 'object') return;
  const ea = (a && a.env) || {};
  if ('env' in b) {
    const eb = b.env;
    if (!eb || typeof eb !== 'object' || Array.isArray(eb)) bad.push(`${p}.env is not a map`);
    else {
      for (const k of Object.keys(ea)) if (eb[k] !== ea[k]) bad.push(`${p}.env.${k} changed or removed`);
      for (const k of Object.keys(eb)) if (!(k in ea) && !(keyRe.test(k) && valRe.test(String(eb[k]))
        && new RegExp(`process\\.env\\.${k}(?![A-Za-z0-9_])`).test(script))) bad.push(`${p}.env.${k} not allowlisted`);
    }
  } else if (a && a.env) bad.push(`${p}.env removed`);
  for (const k of Object.keys(b)) if (k !== 'env') walk(a ? a[k] : undefined, b[k], `${p}.${k}`);
};
if (JSON.stringify(strip(A)) !== JSON.stringify(strip(B))) bad.push('the tree differs outside env maps');
walk(A, B, '$');
console.log(bad.length ? 'B5 FAIL structure: ' + bad.join('; ') : 'B5 PASS structure: equal outside env maps; env maps only grow, by allowlisted keys');
process.exit(bad.length ? 1 : 0);
JS
[ $fail = 0 ] && echo "P1c bound: PASS" || echo "P1c bound: FAIL"
```

**Exercised at `[THURGOOD R2]`** (`e7f57c20b`, 2026-11-07). The synthetic cases are single edits committed in scratch clones under the session scratchpad, never on a branch. Stacy's F-A, F-B, F-C and F-E are her R1 fixtures, rebuilt from the lines she gives.

| Case | Expected | Result |
|---|---|---|
| #732 (`cd340c59b^..cd340c59b`), with its one deleted comment line quoted | PASS | PASS |
| the same, with a CRLF body | PASS | PASS (was a false B3 FAIL before amendment 4) |
| #732 as merged: its body has no `**Deleted lines**:` block | FAIL B3 | FAIL B3 only. #732 would have owed the quote |
| #727, the build (`16d44a500`) | FAIL | FAIL B1 (it also touched `in-lane-guards.json`), B4 (`name:`, `on:`, …) and B5 (no file at its base) |
| n1: `continue-on-error: true` added to `law-ratified` | FAIL | FAIL B4, B5 |
| n2: `edited` dropped from `types:` | FAIL | FAIL B2, B3, B4, B5 |
| n3: `run:` line given `\|\| true` | FAIL | FAIL B2, B3, B4, B5 |
| n4: env entry `SKIP: "1"` (a literal value) | FAIL | FAIL B4, B5 |
| n5: env entry whose key the script does not read | FAIL | FAIL B4, B5 |
| n6: `if: false` added to the law-ratified step | FAIL | FAIL B4, B5 |
| n7: job `law-ratified` renamed (a context change) | FAIL | FAIL B2, B3, B4, B5 |
| n8: `BASE_REF: ${{ github.head_ref }}` inserted at indent 4, as a job key | FAIL | FAIL B5 only. It passes B1–B4, and would pass the cheaper route |
| F-A (Stacy): `env:` inserted between checkout's `with:` and `ref:` | FAIL | FAIL B5 only (`with` becomes null; `ref` and `fetch-depth` become env keys) |
| F-B (Stacy): a duplicate `BASE_REF` with the head ref | FAIL | FAIL B5 only (`duplicated mapping key (85:11)`) |
| F-C (Stacy): `BASE: ${{ github.sha }}`, a prefix of `BASE_SHA` | FAIL | FAIL B4, B5 (was a PASS before amendment 3) |
| F-E (Stacy): `env:` inserted right after `law-ratified:` | FAIL | FAIL B5 only (the required job becomes null; its body moves under `jobs.env`) |
| block scalar: a base whose `run: \|` holds a `# …` line; the fix deletes it, quoted | FAIL | FAIL B5 only (B2 and B3 pass) |
| a comment line reworded, not quoted / quoted | FAIL / PASS | FAIL B3 / PASS |

**Who reads it**: Stacy, at ARMING, keyed on the path. A PR whose diff touches `.github/workflows/merge-hold.yml` fires the read, whatever the PR claims about itself (the P1b precedent).
- **Which limb reads it** (`[STACY R1]` amendment 5, reworded at `[STACY R2]`). If an issue-row grant activated by `<m>^` lists the path, the grant limb reads the PR, and P1c does not. Otherwise P1c does. This selects which read applies; it never widens a grant. It does not conflict with item 1's A-2 limit, which concerns a different file and a different question (`[ADA R2]`, `[STACY R2]`).
- Every failing clause is a finding on the executing agent. A failing B2 or B5, or a B6 weakening, is routed to Peter as an unadmitted weakening of a required check. RELEASE is the backstop, over the release delta.
- **Evidence owed in each P1c PR's body**: the query's output against the PR's merge base, and B6's lines.
- **What a `P1c bound: PASS` says** (`[STACY R1]`, surviving counter-argument): the fix changed only what the bound lets it change. It does not say the fix is safe. The bound narrows what Peter has to read at the merge. It does not read for him.

**Review trigger** — **[author's addition — Peter rules]**, the P1 precedent: if P1c goes unused across two consecutive RELEASE passes, its removal is proposed by an amendment ballot. Any change to the required-context set re-reads P1c in the same record.

---

## 4. Before → after

### Edit site 1 — `canonical/agents/thurgood.md`, frontmatter `writeScope`

**(a) After L240** (`- ".github/in-lane-guards.json"`), insert:

```yaml
  # P1c, ballot 2026-11-07-thurgood-charter-scope-harness-and-merge-hold (RATIFIED Peter <date>): fixes inside its
  # § 3 bound B1–B6 only — the glob cannot carry the bound; the In Scope CI-regime bullet does
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

Before (L236–241 and L274–278 at `e7f57c20b`, unchanged at `894d87436`), for the record: L240 `  - ".github/in-lane-guards.json"` is followed by `  # Standing scope added by ballot 2026-10-17-standing-write-scope-six-roots …`. L277 `  - "scripts/governance-examples/**"` is followed by `  # § 2.3 — the docs MCP`. Nothing is removed. `[LINA R1]` verified the anchors. The Kiro adapter copies `writeScope` into `allowedPaths` unchanged (`adapters/kiro.ts` L294–296), and disposition rows are keyed by glob, so the inserts move no existing row.

### Edit site 2 — `canonical/agents/thurgood.md` § "In Scope", the CI-regime bullet (L361)

- **Before** (the fragment that changes): `… and per added entry the assertion its record rests on. Every other CI path goes through an issue-row grant (§ 3). ARMING audits each such PR at its merge.`
- **After**: `… and per added entry the assertion its record rests on. In `.github/workflows/merge-hold.yml` only (P1c, ballot 2026-11-07-thurgood-charter-scope-harness-and-merge-hold § 3 item 2): a fix that passes that ballot's bound B1–B5 — `.github/**` changes exactly that file; deleted lines are comments or blank, and quoted in the PR body's `**Deleted lines**:` block; added lines are comments, blanks, `env:` keys and `${{ github.* }}` entries the script reads by name; parsed with the repository's `js-yaml`, the file is unchanged outside its `env` maps, and those maps only grow — and whose PR body carries the bound's query output and names what each added entry changes (B6). Anything else in that file goes through an issue-row grant or is Peter's. Every other CI path goes through an issue-row grant (§ 3). ARMING audits each such PR at its merge.`

### Edit site 3 — `canonical/agents/thurgood.md` § "In Scope", a new bullet after the six-roots bullet (L362)

- **Before**: no bullet.
- **After** (F-4 (a): Kenya and Data review):
  > `- **Compile-harness instruments (ballot 2026-11-07-thurgood-charter-scope-harness-and-merge-hold § 3 item 1)**: you own `scripts/harness/stability.ts` and `scripts/harness/native-rules.ts` (Peter, "B Thurgood"), with `stability.test.ts`, `fixtures/stability/**`, `native-rules.test.ts` and `native-rules-emitter.test.ts`, because the demotion read of each promoted harness context (`.kiro/issues/2026-11-07-promoted-harness-contexts-demotion-read.md`) runs `stability.ts` at every monthly health check and every release's S, and outlives Spec 129. Owning them never authorizes changing a rule they state: `native-rules.ts` follows design § 4 (or the spec text that supersedes it) first, and `stability.ts` follows `tasks.md` § "Decision 6" (or the record that re-homes it) first; a fix where the code disagrees with that text is yours, with a falsification case red before it. When the emitter comparison or the per-run instance check goes red with no intended change, you and Ada each read it against the design text; the copy that disagrees with the text is fixed, and a silent text is a `DESIGN-GAP:` answered in the design first. A repair to `native-rules.ts` after such a red cites the design sentence each changed rule restores, is written by you or by a grant holder who did not write the emitter change in that unit, and no grant over `native-rules.ts` goes to the seat holding `src/generators/**` in that unit. Every change to `native-rules.ts` outside its comments, a defect fix included, and every change to `native-rules-emitter.test.ts`, consults Ada, who reads it against the design text, never against the emitter's output; Kenya and Data each review every such change to `native-rules.ts` unless every changed hunk lies inside a declaration or `BINDING` key named for the other platform (`swift*`, `isSwift*`, `SWIFT_*`, `BINDING.swift` / `kotlin*`, `KOTLIN_*`, `BINDING.kotlin`). The annotation titles a harness job writes (`harness-verdict`, `harness-infra`, `cache`, and any later title) and their formats are the interface to `stability.ts`: a change to how it reads them consults each affected producer's owner (Data for Android, Kenya for iOS), and a producer change consults you. Kenya is consulted on any change to how `stability.ts` computes iOS queue time, reads the Xcode pin, or applies condition 3's iOS rule or condition 5. Each owed consult or review is a `**Consulted**:` line in the PR body, citing the review entry where a review is owed; a seat's review entry in the same unit satisfies it. The rest of `scripts/harness/**` and `harness/**` is not yours.`

### Edit site 4 — `.kiro/steering/Agent-Directory.md` § "Thurgood", **Owns** line (L74)

- **Before**: `… **the CI regime's standing test-lane scope (`lane-timing.yml` test-script steps with floors, and added entries in `.github/in-lane-guards.json`; ballot 2026-09-27-ci-regime-standing-scope, amended 2026-10-20)**, **Civitas infrastructure** (…).`
- **After**: `… **the CI regime's standing test-lane scope (`lane-timing.yml` test-script steps with floors, added entries in `.github/in-lane-guards.json`, and bounded fixes to `merge-hold.yml`; ballot 2026-09-27-ci-regime-standing-scope, amended 2026-10-20 and 2026-11-07)**, **the compile harness's stability script and rules module (`scripts/harness/stability.ts`, `native-rules.ts`)**, **Civitas infrastructure** (…). *(amended <date> by ballot 2026-11-07-thurgood-charter-scope-harness-and-merge-hold § 4 site 4; prior text at <SHA>)*`

### Edit site 5 — ballot `2026-09-27-ci-regime-standing-scope` § 2, a ledger line after the P1b line

- **After**: `*(Amended <date> by ballot `2026-11-07-thurgood-charter-scope-harness-and-merge-hold`: P1c, fixes to `.github/workflows/merge-hold.yml` inside that ballot's § 3 bound. The P1 row, P1b and Peter's ruled limits are unchanged; the clause lives in that ballot.)*`
- Its "Excluded paths — every other `.github/**` path" sentence is not rewritten. The ledger line is the amendment, as P1b's was.

### Edit site 6 — `canonical/agents/stacy.md`, the ARMING row (L404) — Stacy's seat, her edit, her ruling

The author proposes the shape; **Stacy writes the words** (the caller-out duty runs both ways: I do not write her row). Her R1 amendments 5 and 6 commit her to the words below at application.
- **(a) The P1c event and read**: the Event gains "a PR whose diff touches `.github/workflows/merge-hold.yml` merges (P1c; keyed on the path)". The Scope gains "for a P1c PR, ballot 2026-11-07-thurgood-charter-scope-harness-and-merge-hold § 3 item 2: B1–B5 decided by its query, B6 a judgment". **Limb selection** (amendment 5, as reworded at `[STACY R2]`): a PR whose path an issue-row grant activated at `<m>^` lists is read under the grant limb, not P1c; this selects which read applies and never widens a grant. Failures of B2 or B5, and B6 weakenings, go to Peter as unadmitted weakenings of a required check.
- **(b) [author's addition — Peter rules, F-2]**: the instrument-path limb gains the six item-1 paths, **in its path list and in its deletions-zero read** (amendment 6). `stability.test.ts`, `native-rules.test.ts`, `native-rules-emitter.test.ts` and `fixtures/stability/**` carry `--numstat` deletions `0` unless the PR body names the file and its spec amendment. A deletion in `native-rules.test.ts` names the `design.md` § 4 amendment (or its successor) it applies, so item 1's "text first" limit is read at merge, not taken on trust. Stacy also checks the A-2 grant clause from the merged task rows and grant records at her tasks-round LENS (`[STACY R2]`). **Why**: `native-rules.ts` is loaded by `harness-android-tokens`, a required context, through `harness/android/lane.ts`. All three tests are registered in-lane guards or will be (Task 18). A weakening there is a weakening of a gate, and today nothing reads it at merge.

### Edit site 7 — the regenerated surfaces, re-confirmed and re-signed (the P1b precedent, #427 `c219488d6`)

- `canonical/operative-sets/{thurgood,stacy,agent-directory}.yaml`;
- the consumer profile: dispositions, overlays, confirmations and signatures for `thurgood`, `stacy` and `agent-directory`, each by its C1 seat. Each of the seven new `writeScope` entries needs a first signature, or `consumer-profile.real.test.ts`'s "every routed row is signed" fails (`[LINA R1]` Q1);
- **the `#in-scope` disposition's removal texts** (`[LINA R1]` A1). In `canonical/profiles/consumer/thurgood.dispositions.yaml`, the `#in-scope` row is `re-pointed` with three removals, and their stored text equals the bullets byte for byte (`subtraction-2` = L361; `subtraction-1` = L362). Nothing mechanical checks that text (`regrounding/freshness.ts` L86). So, named here for Stacy as the C1 signer: `subtraction-2`'s text is replaced with site 2's after-text, and a removal is added for site 3's bullet. Its cite is hers to choose as confirmer (Lina reads `subtraction-1`);
- regeneration (`.claude/agents/*`, `.kiro/agents/*`, including `thurgood.json`'s Kiro `allowedPaths`);
- `canonical/generated.lock`. **Lock slot** (`[LINA R1]` Q3): U9 and U11 also carry the lock before U12. The application PR takes a slot in the one-lock-PR-at-a-time order, named in its brief;
- `122-diff-guard` read green.

### Edit site 8 — Spec 129 `design.md` § 4, "The shared harness module" (`[LINA R1]` A2)

- **Before** (L474 at `894d87436`; L465 at `e7f57c20b`): `… with Ada consulted on any change to its emitter side; a change after U6 rides a task-row or issue-row grant, because `scripts/harness/**` is not in a standing scope.`
- **After**: `… with Ada consulted on any change to it; a change after U6 is in Thurgood's standing scope (ballot 2026-11-07-thurgood-charter-scope-harness-and-merge-hold item 1), with that ballot's limits and consults. *(amended <date> by that ballot, § 4 site 8; prior text at <SHA>)*`
- Thurgood writes it as the spec's author. It is a spec artifact, so the dated line is the spec's convention, not a pointer the README owes.

### Edit site 9 — records

- **Closed**: `.kiro/issues/2026-11-07-merge-hold-yml-edit-in-732-had-no-grant-correction-record.md`, whose trigger is this ballot's ratification. It gets a rule 5 outcome line.
- **Not closed**: the demotion-read charter (F-3).
- **Optional, Lina's offer as co-owner** (`[LINA R1]` Q1): a dated line on `.kiro/issues/2026-10-17-per-owner-test-folders.md` saying that `scripts/harness/__tests__/` is outside its move on purpose, assigned file by file. I take it.
- `.kiro/docs/ballots/README.md` § "Ballots on record": one entry, at ratification.

---

## 5. Census

Ballots README § "Conventions", "Instrument census". Every edit site is an ordinary input of the instruments below. No instrument's code, rule, pattern or grammar changes, so no item runs a census mode and there is no appendix.

- `**Census**: not in scope — 122-diff-guard (tools/agent-generator/diff-guard.ts, with workflow-rules-guard.ts) — the edited canonical units (sites 1–3, 6, and site 7's dispositions) are its ordinary inputs, regenerated and lock-refreshed at application, where its verdict is read`
- `**Census**: not in scope — 122-canonical-vs-truth and 122-sweep-1..8 (tools/agent-generator/canonical-vs-truth.ts, tools/agent-generator/sweeps/**) — they load canonical/** as ordinary inputs; no rule they implement changes; read green at application`
- `**Census**: not in scope — verify-signing-chain (tools/agent-generator/regrounding/verify-signing-chain.ts, with C1 and signatures.ts) — site 7's re-confirms and re-signs are its ordinary inputs, read by --ci at application`
- `**Census**: not in scope — check-section-citations (scripts/check-section-citations.ts) — the new text adds no MCP section citation`
- `**Census**: not in scope — law-ratified (scripts/completion-claims/merge-hold.ts --job law-ratified) — this ballot and the application PR's governance files are its ordinary inputs; the application PR's LAW lines cite this ballot, which must read RATIFIED at that head`
- `**Census**: not in scope — verify-gate-registration.sh — no context, job name or count changes; P1c's B2, B4 and B5 bar a job rename or addition in merge-hold.yml, including one made by insertion alone (`[STACY R1]` F-E; case n7 and F-E in § 3)`
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

The questions above are as asked at round 1. The answers are in § 9, and `[THURGOOD R2]` lists where each one landed.

---

## 7. Forks for Peter

- **F-1 — the form of the `merge-hold.yml` bound.**
  - **(a)** B1–B5 as folded: deletions are comments only (B2), quoted (B3); additions are allowlisted (B4); and the parsed file is unchanged outside its `env` maps, which only grow (B5).
  - **(b)** Peter's four clauses read one at a time: non-comment deletions are allowed unless they remove a step, an `if:`, a floor or an assertion, or change a `run:` line; additions are not bounded.
  - **Recommendation: (a).** Under (b), "floor" and "assertion" have no decidable test in a workflow file; Stacy confirms that (b) is not decidable at her seat (`[STACY R1]` (4)). It also lets through weakenings that delete nothing: dropping `edited` from `types:`, narrowing `permissions:`, `timeout-minutes: 1`, an added `paths:` filter, `continue-on-error: true`, and Stacy's insertions F-A and F-E. The cases in § 3 show (a) failing each of them.
  - **Ruled (Peter, 2026-11-07T22:16:40Z): (a).** The bound is B1–B5; B6 is a judgment.
  - **What survives against (a)**: it is stricter than Peter's words. A routine fix (an action-version bump, a `timeout-minutes` change, a `with:` change, a trigger fix) still needs a per-fix grant. B4 is shaped on the one fix that exists (#732), so the next real fix may not fit it. B5 rests on `js-yaml`, which is not GitHub's parser.
- **F-2 — site 6(b), the harness paths in Stacy's instrument-path limb.** Stacy takes them as her row's owner, provided the deletions-zero read reaches them too (`[STACY R1]` (3)). That is folded into site 6(b). Ada and Data read yes for Peter.
  - **Recommendation: yes.**
  - **Ruled (Peter, 2026-11-07T22:16:40Z): yes.**
  - **What survives**: about a minute of reading per harness PR for Stacy, including during Spec 132, where these files may change often. She accepts that cost.
- **F-3 — write the demotion read into the charters now** (mine and Stacy's), closing its record, **or leave it in the record.**
  - **Ruled (Peter, 2026-11-07T22:16:40Z): as recommended — it stays in the record.**
  - **Recommendation: leave it.** Stacy agrees (`[STACY R1]` (4)). The (b) thresholds in Decision 6 are "proposals for Peter at the first offer" and are not yet ruled. Writing them into two charters now would freeze proposals.
  - **What survives**: a live read stays in the weakest home, an issue record, until its owners' next ballot.
- **F-4 — Kenya and Data "review" or are "consulted" on `native-rules.ts` changes in their platform** (item 1).
  - **(a) "review"**, as design.md L477 states Peter's "B Thurgood" ruling: each seat's review entry is owed on the change, and the PR cites it.
  - **(b) "consult"**, as Kenya prefers (`[KENYA R1]` Q1): a read-only, non-blocking consult in the seat, recorded on the `**Consulted**:` line.
  - Either way, a seat's review entry in the same unit satisfies the duty (`[KENYA R2]`). That lowers the cost of (a); it does not decide between them.
  - **No recommendation was made.** Lina named the word Peter's (`[LINA R2]`).
  - **Ruled (Peter, 2026-11-07T22:16:40Z): (a).** Kenya and Data **review**, as design.md L477 states it. Item 1 and site 3 carry the ruled word.
  - **What survives either way**: under (a), Spec 132's native work waits on two platform reviews for shared helpers. Under (b), a wrong Swift- or Kotlin-side fix can merge before the platform seat reads it (`[KENYA R1]`, surviving counter-argument).

**Not a fork in this ballot, listed for Peter separately**: after U12, the native lanes' producers have no standing owner. These are `harness/android/lane.ts`'s classifier, `compare.ts`, the annotation steps in `native-harness.yml`, and on iOS `probe-swift.ts`, `parse-swift.ts` and `harness/ios/**` (`[DATA R1]` residual 1; `[KENYA R1]`; `[DATA R2]` item 5). The options are (i) per-event grants for producer fixes, which Data leans to on base rate, or (ii) a later ballot giving the lanes a standing home in the platform seats. This ballot cannot widen Data's or Kenya's charter. Data offers to file one record (owner Data, co-owner Kenya) with the orchestrator's go.

*(Answered 2026-11-08 by ballot `2026-11-07-native-lane-ownership`: the per-role split.)*

---

## 8. Counter-arguments (fold-back applied)

**What the counter-arguments changed in this draft:**
- At draft: B4's allowlist on additions; B3's exact equality; item 1's rule-change limits; the consults; the excluded-paths list; the review triggers; F-2.
- At `[THURGOOD R2]`:
  - B5, the parse-level clause, which closes Stacy's F-A, F-B and F-E and the block-scalar premise;
  - B4's whole-name match (F-C), and B3's carriage-return strip;
  - the one consult rule that restores Ada's ruled consult;
  - Ada's A-2 and A-3;
  - Data's annotation interface, and Kenya's iOS-read consult;
  - the closed Excluded list;
  - Lina's disposition, design-text and citation fixes;
  - Stacy's limb selection, and the deletions-zero read for the harness paths.

**What survives, stated plainly:**

1. **The bound limits the workflow file, not the check.** `scripts/completion-claims/merge-hold.ts` is already in my standing scope, and the script decides `law-ratified`'s verdict.
   - Weakening the gate through the script is far easier than through the YAML. P1c buys decidability on the half of the instrument where a weakening is least likely.
   - The script half is read only by Stacy's instrument-path ARMING read, after the merge. It is never a gate.
   - B6's exposure is coupled to that half. An environment entry can change the verdict only once the script reads a new key, which is a script change (`[STACY R1]` (2)).
   - So P1c mainly turns a recorded procedure lapse (F3) into an in-scope act. It does not make the gate safer, and it should not be read as doing so.
   - Every P1c PR body will carry `P1c bound: PASS`. That line will be read at the merge as "this fix is safe", and it never says that (`[STACY R1]`, surviving counter-argument).
   - A fix that passes the bound and weakens the check is on `main`, gating, before any claims read sees it. Peter's merge is the only check before that point.
2. **The base rates are thin.** `merge-hold.yml` has had one fix ever. `native-rules.ts` has had one commit ever.
   - The demotion read justifies `stability.ts` strongly.
   - `native-rules.ts` rests on a ruled ownership ("B Thurgood") and a required context, not on recurrence. In the case the ballot predicts, an intended emitter change after 129, the spec that makes it can grant the repair in its own task row. Standing scope earns its place only on an out-of-spec defect, and the base rate for that is zero (`[STACY R1]` (4)).
   - Peter ruled the class option and (ii), and Stacy sends nothing back on base rate. So this is a residual, not a fork.
3. **Concentration.** After this ballot, one seat owns all of these:
   - the script and the workflow of a required check (`law-ratified`);
   - the record that decides promotion offers and demotion offers;
   - the rules module behind a required context's per-run check;
   - and he writes the standards they are read against.

   The checks on him are Stacy's after-merge reads, the platform and generator consults, and Peter's merge. Of those, only Ada's consult on the mirror comes before the merge, and it is non-blocking. The limits in item 1 and the bound in item 2 narrow what one seat can do silently. They do not change who holds it.
4. **Independence of the mirror stays a discipline, not a mechanism** (`[ADA R1]` residual 1). The one mechanical part is the `src/`-import ban. No check can show that the mirror was written from the design text and not from the generator. A-2's design-anchor citation makes that auditable; it does not make it provable. Stacy can check that the citation is present, not that it is true (`[STACY R2]`).
5. **The consults add latency to Spec 132** (`[ADA R1]` residual 2). A shared-helper change consults three seats. They read in parallel, which costs about one round. Peter should see that cost.

---

## 9. Review round record

Stamp format per the Spec-Feedback-Protocol. Every entry below is spliced byte for byte from its seat's scratch file; nothing in it is edited by the author.

### Round 1 — consulted seats (read at `40188e75b`)

#### [STACY R1]

**Verdict: approve with amendments.** Read at `40188e75b` against `main` at `e7f57c20b`, 2026-11-07. I ran the § 3 query as written; my scratch copy is byte-identical to the ballot's after its usage line. The fixtures below were committed in a scratch clone under the session scratchpad, never on a branch. Each one is a single inserted line in `.github/workflows/merge-hold.yml` at `e7f57c20b`, so anyone can rebuild it from the line number given.

**The finding first.** An added `env:` line passes B4, and it can re-parent the unchanged lines that follow it. With nothing deleted, it changes what the YAML parses to. Three cases pass the query, `P1c bound: PASS`:

| Fixture | The one edit | Query | What the file now parses to (`js-yaml` 4, the repo's dependency) |
|---|---|---|---|
| **F-A** | insert `        env:` before L67 (between law-ratified checkout's `with:` and `ref:`) | B1–B4 PASS | checkout `with: null`; `ref` and `fetch-depth` become environment variables. The job checks out the default ref at depth 1 |
| **F-B** | insert `          BASE_REF: ${{ github.event.pull_request.head.ref }}` after L84 | B1–B4 PASS (B4 lists `BASE_REF`) | `js-yaml`: `duplicated mapping key (85:11)`. What GitHub does with it is **unverified**. If the last key wins, the base the script resolves becomes the head branch |
| **F-E** | insert `  env:` before L61 (right after `  law-ratified:`) | B1–B4 PASS | `jobs: { merge-hold: {…}, law-ratified: null, env: {runs-on, 4 steps} }`, which renames the required job |

- **Where the ballot is wrong.** F-A contradicts § 3 B2's "[it] also bars changing any other key: … `with:`". F-E contradicts § 3's "a renamed job … B2–B4 bar each of them mechanically", the case table's "job `law-ratified` renamed → FAIL", and § 5's `verify-gate-registration.sh` census line ("P1c's B2 and B4 bar a job rename or addition"). The table's rename case fails only because it deleted the `name` line. A rename by insertion deletes nothing.
- **Why this is not a gate hole today, and what it is instead.** F-E most likely fails closed at the gate. Either GitHub rejects a null job, or the required context `law-ratified` never reports. Both are unverified here, but either way the PR does not merge. F-A and F-B depend on GitHub's parser and on the script's error path, and git decides neither. So the bound is decidable, but it does not decide what § 3 says it decides. A `PASS` pasted into a P1c PR body would be read as "no structural change". F-A shows that reading is false.
- **The block-scalar premise has the same shape.** § 3 B2 says the comment rule holds "only while the file has no block scalars". That is true at `e7f57c20b`: I grepped for `: |` / `: >` and found none. But the query never checks it. Any later change that a grant or Peter makes can break the premise silently, and B2 then passes `#` lines that are shell.

**(1) Is each of B1–B4 decidable by me without asking you?** Yes, from git and the PR body, with one stop. Each input is named:
- **B1, B2**: decidable as written.
- **B3**: decidable. The query parses the body with LF line endings. A body with CR line endings false-FAILs B3: #732's quoted body with `\r` added gives `B3 FAIL` against its LF control's `PASS`. None of #732, #735, #737, #738, #739 or #741 carries a CR, so the risk is low. It still fails closed into a false finding against the executing agent.
- **B4**: decidable. The query's `git grep -F "process.env.$k"` is a substring match, though, and the clause says "reads". **F-C**: `BASE: ${{ github.sha }}` passes, because `process.env.BASE` is a prefix of `process.env.BASE_SHA`. An unread key is inert, so this is low. But my read runs the query, and the query and the clause must agree.
- **Which limb reads a given PR.** This is the one place I would have to ask. Your edit site 2 sends "anything else in that file" through an issue-row grant. Such a PR touches the same path, so my row's existing `.github/**` grant limb fires, and P1c's path key fires too. A granted PR would then fail P1c and draw a false finding. I will key it in my row: an activated grant listing the path at `<m>^` means the grant limb reads the PR; otherwise P1c does (amendment 5).

**(2) Does B4 close my A-1 residual for this file, and is B5 the right place for what is left?** It closes the residual at the key level, which is the part I named on 2026-10-20. Every weakening key in Actions is lower-case (`continue-on-error`, `if`, `paths`, `timeout-minutes`). B4's entry pattern needs `[A-Z][A-Z0-9_]*`, so none of them can be added under it. That is a stronger property than the ballot claims for it. B4 does not close the residual at the structure level: F-A, F-B and F-E. Once structure is decided, B5 is the right home. At `e7f57c20b` the script reads three keys (`BASE_REF`, `BASE_SHA` and `GITHUB_STEP_SUMMARY`; `merge-hold.ts` L365–372 and L433). The first two are already set at step level, and step level overrides job level. So once F-B is barred, B5 has no live instance. It opens only when `merge-hold.ts` gains a new `process.env` read, and that change is an instrument-path PR my limb already reads. Say so in § 8 item 1: B5's exposure is coupled to the script half, not separate from it.

**(3) Site 6(b): do I take the six harness paths into the instrument-path limb?** Yes, as my row's owner, and only if the deletions-zero read reaches them as well. Adding them to the path list alone does not. `scripts/harness/__tests__/fixtures/stability/**` is not under `__fixtures__/**` or `tools/agent-generator/__tests__/fixtures/**`. The three harness tests are not generator tests. As written, 6(b) would bring the paths in while the read that gives them meaning skipped them. I will write my row so that the three tests and the fixture directory carry `--numstat` deletions `0` unless the PR body names the file and its spec amendment. That escape is also the first decidable read item 1's limit gets. A deletion in `native-rules.test.ts`, the literal-expected-value test, must name the `design.md` § 4 amendment, or its successor, that it applies. "The rule text first, the code second" is then checked at merge, not taken on trust. My cost is about a minute per harness PR, as F-2's residual says. I accept that cost during Spec 132.

**(4) Attack the width.** I send nothing back on base rate. My 2026-09-27 R1 sent P2–P4 back on that ground when Peter had not ruled the paths. Here he ruled the class option by name, "stability.ts, native-rules.ts and their tests" (2026-11-07T20:21:05Z), and he ruled (ii) for `merge-hold.yml` (20:43:17Z). Sending a path back would re-ask a ruled question. The base-rate point survives as a residual:
- **`stability.ts` is fully justified.** It changed in three PRs in two days, and the live demotion read runs it.
- **`native-rules.ts` buys little in the case the ballot predicts.** That case is an intended emitter-naming change after 129. It lands in a spec, and that spec's task row can grant the repair in the same PR. The standing scope earns its place only on an out-of-spec defect, and the base rate for that is zero.
- **`native-rules-emitter.test.ts` is the widest of the six.** It is where a disagreement between two seats' files could be "fixed" by loosening the comparison. I accept it in the scope because 6(b), with the deletions-zero read, puts it under my merge-time read.
- **P1c's width is right in shape.** It is narrow on purpose, and Peter asked for "a mechanical bound". On F-1, (b) is not decidable at my seat: "floor" and "assertion" in a workflow file are judgments, which is what my A-1 residual said. The pick between (a) and (b) is Peter's. F-1's residual stands, and the amendments below make it stronger: a bound shaped on #732 alone will turn away the next real fix.
- **F-3: I agree with leaving it in the record.** The demotion read has not run once at my seat. Charter text written now would freeze Decision 6's unruled thresholds.

**Amendments** (the clause wording and the route are the instrument owner's; I name the fixtures each must fail and the stated claims each must make true):
1. **The bound FAILs F-A, F-B and F-E.** Until it does, strike "bars changing … `with:`" (§ 3 B2), "a renamed job … bar[red] mechanically" (§ 3), the rename row's mechanism in the case table, and § 5's `verify-gate-registration.sh` census reason. One decidable route is a parse-level comparison: parse both sides with `js-yaml`, which is already a dependency and rejects duplicate keys; require the trees equal once `env` maps are removed; require each `env` map at `<base>` to be a sub-map of the same path's map at `<m>`. That route makes amendment 2 unnecessary. Its own residual: `js-yaml` and GitHub's parser are not the same parser.
2. **The block-scalar premise becomes a clause the query checks at `<base>`**, stopping when it fails, or amendment 1's route covers it.
3. **B4's query matches the key as a whole word**, so F-C (`BASE`) FAILs.
4. **B3's query strips `\r` before comparing.** Low priority: it prevents false findings, not missed weakenings.
5. **Site 6(a), my words at application**: the P1c read is keyed on the path, and a PR whose path an activated issue-row grant lists at `<m>^` is read under the grant limb, not P1c. B2 failures, F-B-class failures and B5 weakenings go to Peter as unadmitted weakenings of a required check.
6. **Site 6(b), my words at application**: the six paths join both the path list and the deletions-zero read, with the spec-amendment escape. Item 1's rule-text-first limit is read through that escape.

**The surviving counter-argument.** Your § 8 item 1 is the strongest, and I hold it. The bound guards the YAML half, while `merge-hold.ts` decides the verdict and is read only after the merge. From my seat, one thing survives every amendment above. P1c turns F3, a recorded lapse, into an in-scope act, and every P1c PR body will carry a `P1c bound: PASS`. That line will be read at the merge as "this fix is safe". It never says that. Its question is narrower: did the fix change only what the bound lets it change? F-A shows that until amendment 1 lands, it does not even answer that. My read comes after acceptance by design (Q5): no pass, at any grain, is ever a required check, a review gate, or a blocking condition on any PR. So a fix that passes the bound and weakens the check is on `main` and gating before I see it. Peter's merge is the only check before that point. The bound narrows what he has to read. It does not read for him.

#### [ADA R1]

Consult from the generator's seat, read at `40188e75b` (the ballot) and checked against `main` at `e7f57c20b`. Nothing was edited. **Verdict: approve with amendments (A-1 to A-3).** The six paths, and standing scope over them, are right. A standing owner is better for the mirror than a grant per change: today nobody holds `native-rules.ts` between units. But the draft narrows a consult that Peter ruled, and it leaves one route by which the mirror and the emitter can end up with the same author.

**What "independent" means here** (design § 4, "The shared harness module"; the module's header, L4–13). `native-rules.ts` is a second statement of the rules, written from the design text and not from the generator. That is what makes `native-rules-emitter.test.ts` and the per-run instance check worth having. Independence rests on two things:
- **mechanical**: nothing under `src/` imports `scripts/harness/` (the `git grep` criterion at `tasks.md` L857). Standing scope does not touch this, and it holds;
- **a discipline**: when the two copies disagree, the mirror is corrected to the design text, never to the generator's output, and the mirror is never written by the author of the emitter change it is compared against. Standing scope keeps independence only if the charter states this discipline. Item 1's limits state most of it ("the text first, the code second"; a defect is "code that disagrees with the text it implements"). The gaps are below.

**Answers to § 6's questions to me**
- **(1) Do I accept the consults? Yes, and I want them wider than drafted (A-1).** The draft consults me on "any change to `native-rules.ts` that answers a `DESIGN-GAP:`, and on any change to `native-rules-emitter.test.ts`". Peter's "B Thurgood" (2026-11-06T23:31:58Z, `evidence/2026-11-06-peter-rulings-round-3.md`, item B, as the orchestrator paraphrased it) and design § 4's last bullet both read: **"Ada is consulted on every rule change."** A `DESIGN-GAP:` answer is one kind of rule change, not all of them. A change to `BINDING`, to `familyCases`, to the holder-line forms or to `productAccess` is a rule change with no gap marker. Under the draft it would consult me only if it happened to touch the emitter test. Taking the emitter test on, in full and not only its emitter side (design § 4 says "its emitter side"), is a widening I welcome. That test is the comparator, and a weakened comparator removes independence as surely as a copied mirror.
- **(2) After 129, when an intended emitter change turns the comparison red: same PR, with conditions (A-2).** The order that keeps the two copies independent is:
  1. **the design text first**: the sentence the change rests on, in the spec that supersedes § 4, merged before the code PR or in the same PR;
  2. **the emitter half by me**, in `src/generators/**`;
  3. **the mirror half by you, in your seat, from that sentence.** You do not read my emitter diff to write it. Your PR body cites the design anchor that each changed line of `native-rules.ts` restores.

  Both halves may land in one PR, and in practice they should, so that `main` never carries a red registered in-lane guard. Waiting for a separate PR adds a merge and buys no independence. **What does break independence is the same seat writing both halves**, and the draft's Grants bullet allows exactly that: "A later spec's task row that names one of these files gives its PRIMARY write access … alongside mine". In Spec 132 I am the likely PRIMARY for emitter work. If my task row named `native-rules.ts`, I could write the mirror to match my own emitter. The comparison would then pass and prove nothing.

**Amendments**
- **A-1 — restore the ruled consult.** In item 1's Consults bullet and edit site 3, change "Ada on any change to `native-rules.ts` that answers a `DESIGN-GAP:`" to **"Ada on every change to a rule `native-rules.ts` states (any change outside its comments and tests), and on any change to `native-rules-emitter.test.ts`"**. As drafted, the text narrows what Peter ruled, and § 1 does not mark it as **[author's addition — Peter rules]**.
- **A-2 — the mirror's author is never the emitter's author.** Add to item 1's limits and to edit site 3: **"A repair to `native-rules.ts` after the emitter comparison or the per-run instance check goes red cites, in its PR body, the design sentence each changed rule restores. It is authored by the module's owner, or by a grant holder who did not author the emitter change in the same unit. A task-row or issue-row grant over `native-rules.ts` never goes to the seat that holds `src/generators/**` in that unit."** This narrows the Grants bullet's "never narrow it" for this one file. That is deliberate, and it is the only exception I ask for.
- **A-3 — who decides which copy is wrong.** When the comparison goes red with no intended change behind it, it is not decided from the code which copy is at fault. Add: **"Ada and the module's owner each read the red against the design text. The copy that disagrees with the text is the one fixed. If the text is silent, it is a `DESIGN-GAP:`, answered in the design first."** Without this, "defect fix is mine" lets either seat call the other's copy the defect.

**What the scope touches that I own, and what I would be blocked from**
- `native-rules-emitter.test.ts` imports my `src/generators/TokenFileGenerator.ts` and my `src/generators/__tests__/helpers/realThemeContexts.ts`. When I refactor either API (a constructor, a method name, the helper's return shape), the test breaks only at its call sites, and that file is not mine to edit. **I am not blocked**: the PR names you, and you make the call-site edit in your seat. Standing scope makes that cheaper than it is today, when nobody holds the file. I ask for no write access to it; giving me any would cut against A-2.
- I also ask to be consulted when the test **changes its inputs** (it imports `realThemeContexts`). That is covered by "any change to the test" in A-1.
- Nothing else in the six paths, or in P1c, touches my scope.

**F-2 (Stacy rules her row; my read for Peter): yes.** `native-rules.ts` decides the per-run instance verdict of `harness-android-tokens`, a required context. A drift there weakens a gate as surely as a drift in my emitter would. The cost Thurgood names for Spec 132 is real, and from my seat it is worth paying.

**What survives**
1. **Independence stays a discipline, not a mechanism, even after A-1 to A-3.** No check can show that the person who wrote the mirror wrote it from the design text and not from the generator. A-2's design-anchor citation makes that auditable at my consult and at Stacy's after-merge read. It does not make it provable. The `src/`-import ban is the only mechanical part.
2. **A-1 adds latency to Spec 132.** If 132 changes the native naming often, every rule change waits on my consult and on design text first. I think that is the right price: two copies that are not checked against the text become one copy. But it costs 132 time, and it is a cost Peter should see.
3. **Concentration (the ballot's § 8 item 3) applies to this file too.** One seat holds the mirror, the comparator, and the stability record that decides whether the context stays required. My consult is the one check on the mirror that comes before the merge. A-1 keeps it. I do not reopen "B Thurgood": I leaned Kenya in round 3, and Peter ruled.

#### [DATA R1]

Consult from the Android harness seat, read at `40188e75b` (the ballot). I checked it against `main` at `e7f57c20b` and against U7a's row (Task 20) on `task/129-tasks-amendment-10` at `5a2fc2cd3`. Nothing was edited. **Verdict: approve with amendments (D-1 to D-3).** The scope is right, and a standing owner for `stability.ts` and `native-rules.ts` is better for my lane than the current position, where nobody holds them between units. The consult line on the annotation covers only the reading side of a three-link chain, and "a Kotlin rule" cannot be decided from a diff.

**The annotation is a chain, not one file** (at `e7f57c20b`):
- **Producer, my side.** `harness/android/lane.ts` classifies a failed resolve step, then writes `harness-out/infra.json` as `{ host, status, step }` (`resolveStep`, L531–545). `status` is an HTTP number, `network` or `unknown-host`. `step` is `wrapper`, `plugins` or `dependencies` (`InfraFault`, L453–459).
- **Formatter, the workflow.** Each Android job's "Verdict annotation" step in `.github/workflows/native-harness.yml` (L314–316 and L425–427) turns that file into `::notice title=harness-infra::<host> <status> <step>`. It reads `harness-verdict` from `compare.ts`'s `compare.txt`, and the "Cache state" step writes `cache`. This file is outside every seat's standing scope; each edit to it comes under a grant.
- **Reader, Thurgood's side.** `stability.ts` reads the `harness-infra`, `harness-verdict` and `cache` titles (L196–200). `parseInfra` (L121–124) accepts exactly three fields with no spaces in them.
- **Nothing ties the three together.** Each side is tested against its own literals. The reader's tests use `step: 'resolve'` and `status: 'timeout'` (`stability.test.ts` L224–225; `native-harness-workflow.test.ts` L83), and the classifier never emits either value. The chain works today because only the shape is parsed.
- **What a silent drift costs.** If I changed what the classifier emits (a fourth field, or a status with a space in it), `parseInfra` would return null and nothing would go red. That run would then read as "no harness-verdict annotation", a code failure, not as an infra run. Demotion (b) would go wrong in two directions:
  - the infra finding and the infra rate would undercount a real outage;
  - its re-run (FAIL, then PASS, with no `harness-infra` on either attempt) would count toward the attempts-differ trigger.
  So a producer-side change can produce a false demotion offer on `harness-android-tokens`, a required context, and the drafted consult line would not fire on it.

**Answers to § 6's questions to me**
- **(1) Name the annotation format as the interface, so that a change on either side consults the other: yes (D-1).** "A change to how `stability.ts` reads the annotation" covers the reader only. The producers are `lane.ts` (mine during 129, and under grants afterwards), the jobs' annotation steps in `native-harness.yml` (grants), and `compare.ts`'s verdict line (excluded from item 1). U7a shows the set is not closed. It adds a fourth title, `default-name`, to `harness-android-tokens`. As ruled in amendment 10's fold (my item 9; "no change in 129"), `stability.ts` reads no `default-name` title, and an environment fault in that step carries no `harness-infra`. I am not reopening that ruling. My point is that the next new title should be a consult event by rule, not something a reviewer happens to notice.
- **(2) Keep anything in `native-rules.ts` out of your standing scope? No.** I want none of it kept out. `harness/android/lane.ts` imports `checkHarnessConsumerConfig`, and U7a's verdict compares its provider-read count with `providerReads(…, 'android')`. One maintainer with my consult is better than a grant per fix. The trigger needs to be decidable, though (D-2). Most of the module is platform-parameterised, for example `instanceName`, `familyCases`, `productAccess`, `providerReads` and `checkThemeConfig` with its refusals (a)–(h). A change to any of them changes Kotlin output without being "a Kotlin rule" in any sense a diff can show.

**Amendments**
- **D-1 — the interface, named and reciprocal.** In item 1's Consults bullet and edit site 3, replace "and on any change to how `stability.ts` reads the `harness-infra` or `harness-verdict` annotation" with: **"The interface between the harness jobs and `stability.ts` is the set of annotation titles a harness job writes (`harness-verdict`, `harness-infra`, `cache`, and any title a later unit adds, such as U7a's `default-name`) and each one's message format. A change to how `stability.ts` reads that set consults the owner of each affected producer: Data for `harness/android/lane.ts` and the Android jobs' annotation steps, and Kenya for the iOS ones. A change to a producer, meaning `lane.ts`'s `infra.json` fields or values, a job's annotation step, or a new title, consults Thurgood."** The second half binds producers outside this ballot's paths. It is a consult duty, not a write grant, which is the same shape as the six-roots "Ada is consulted" line.
- **D-2 — make "a Kotlin rule" decidable.** Replace "Data on any change to a Kotlin rule in `native-rules.ts`" with **"Data on every change to `native-rules.ts` outside its comments, unless every changed hunk lies inside a Swift-only export (`swift*`, `SWIFT_*`, `isSwiftIdentifier`, `BINDING.swift`)"**. Kenya's line becomes the mirror, with `kotlin*` and `BINDING.kotlin`. A shared function then consults both of us. This follows Ada's A-1 boundary ("outside its comments"), so the three consult lines are read the same way.
- **D-3 — close the excluded list.** `scripts/harness/__tests__/native-harness-workflow.test.ts` is in neither the item 1 table nor the Excluded list. It tests `native-harness.yml`, not any of the scripts named there, so "their tests and fixtures" does not cover it. U7a's row gives it to Thurgood by task row. Add it to Excluded: **"`native-harness-workflow.test.ts`, which tests the workflow and goes with the workflow's grant."** Without that, the claim that the table "cannot be read as `scripts/harness/**`" is false for one file.

**What the scope touches that I own, and whether U7a is blocked: not blocked, and nothing overlaps.**
- **P1c is `merge-hold.yml` only.** U7a's PR does not touch that file, so neither B1–B5 nor Stacy's P1c read fires on it. U7a's edit to `native-harness.yml` stays under its issue-row grant (`.kiro/issues/2026-11-07-default-name-compile-grant.md`), which this ballot does not touch.
- **None of U7a's Primary Artifacts is among item 1's six paths.** Those artifacts are `lane.ts`, `probe-kotlin.test.ts`, `fixtures/kotlin/**`, `native-harness.yml`, `native-harness-workflow.test.ts`, the grant record and the task-11 pointer. U7a reads two of the six paths and writes neither: `providerReads` in `native-rules.ts`, and the duration definition in `stability.ts`. If U7a finds a defect in `providerReads`, ratification gives it a standing fixer, where today it would need a grant.
- **F-2 adds no read to U7a**, because U7a changes none of the six paths. The application PR (charters, operative sets, profile, `generated.lock`, `.claude/agents/*`, `.kiro/agents/*`) shares no file with U7a, and U7a regenerates nothing, so they can merge in either order with no lock conflict.
- **F-2, my read for Peter: yes.** `native-rules.ts` decides part of `harness-android-tokens`' verdict on every run.

**Recommended, outside the ballot (a record, routed to Thurgood after ratification; not a ballot edit and not U7a scope):** one round-trip case would make D-1 mechanical as well as procedural.
- It feeds each committed resolve fixture (`scripts/harness/__tests__/fixtures/kotlin/resolve/*.txt`) through `classifyResolveFailure`.
- It writes `infra.json` through `lane.ts`'s own writer.
- It runs the real Android "Verdict annotation" step, as `native-harness-workflow.test.ts` already does (L69–98).
- It asserts that `parseInfra` returns the classifier's host, status and step.
The cost is one test case. Its counter-argument is that it couples three seats' files in one test, so a refactor in any of them reaches it. That is the purpose of the test, and also its cost.

**What survives**
1. **The read gets an owner; its inputs do not.** Item 1 gives the demotion read's reader a standing home. The producers it reads (`lane.ts`'s classifier, `compare.ts`, and the annotation steps in `native-harness.yml`) still have no standing owner after U12. My `writeScope` is `.kiro/specs/**`, `docs/specs/**` and `.kiro/issues/**`. Suppose the monthly read finds a classifier defect, such as a new registry host or failure text that `REGISTRY_HOSTS` and the fixtures have never seen. That fix still needs a grant and a merge before it can land: the "owner may not touch what he owns" state of 2026-09-27 § 1, on the other side of the chain. **This is a fork for Peter, and not for this ballot**, because Thurgood cannot widen my charter:
   - (i) per-event grants for producer fixes;
   - (ii) a later ballot giving the Android lane a standing home in my seat.
   On base rate I lean (i): the classifier has changed once (Task 19). That lean is mine, and the pick is Peter's.
2. **D-1 is still a consult, not a gate,** even with the round-trip case. A producer change made under a grant, with no consult, is caught only by Stacy's read after the merge, and by the case if it exists. The case would catch format drift. It would not catch a new title that nobody reads.

### [KENYA R1] — consulted seat (iOS), 2026-11-07

**Read at**: the ballot at `40188e75b` (`chore/thurgood-charter-scope-ballot`). The code at `e7f57c20b` (`main`): `scripts/harness/native-rules.ts`, `scripts/harness/stability.ts`, `stability.test.ts`, `fixtures/stability/ios-queue.json`, `harness/pins.yaml` § `ios`, and design.md § 4's reserved-word paragraph (L224). `git diff e7f57c20b 40188e75b -- scripts/harness harness` is empty. Entry written 2026-11-07T21:51:02Z (`date -u`).

**My own bias, stated**: I hold no write scope over any of these paths, so I gain nothing from the grant. Condition 5 is my condition, though, and the reserved-word list is my measurement. I lean toward having more iOS reads of both. Weigh A-3 with that in mind.

**Verdict: APPROVE WITH AMENDMENTS** (A-1 to A-3). One finding (K-F1) and one gap (K-F2) are routed outside this ballot.

#### Q1 — a consult on Swift-rule changes, or a named review?

**A consult is enough, with design text first.** I do not want a named review.
- Item 1's limit already sends every rule change to design § 4 before the code. A named review would gate a second time and make my seat a bottleneck during Spec 132, when these files may change often.
- I do not own these files, and a review owner with no write scope adds a wait without adding any power to repair.

The consult needs two things to work: a decidable trigger, and a record a reader can check.

- **A-1 — make "a Swift rule" decidable, and include defect fixes.**
  - As drafted, "any change to a Swift rule" fails in two places.
    - Most of the Swift output goes through shared helpers with no Swift name: `themeWords`, `pascalName`, `lowerCamelName`, `nameFor`, `MODE_SUFFIX`, `instances`, `familyCases`. A change there changes Swift names without touching a "Swift rule" by its look.
    - Item 1 separates a rule change (text first) from a defect fix (Thurgood's alone). For Swift, whether code "disagrees with the text" can itself be a compile fact, such as whether a name declares. That is the case where I'm most useful.
  - **Exact change**, in § 3 item 1 "Consults" and in site 3's bullet. Replace "Kenya on any change to a Swift rule in `native-rules.ts`" with:
    > *"Kenya on any change to `native-rules.ts`, a defect fix included, unless every changed hunk is a comment or sits inside a declaration named `kotlin*` or `KOTLIN_*`."*
  - If Data takes the same rule for Kotlin, it reads the same way with `swift*`, `isSwift*` and `SWIFT_*`.
- **A-2 — the consult leaves a record in the PR body.** Each consult that item 1 owes is shown in the PR body by an Agent-Directory line, `**Consulted**: <Seat> — <one-line read>`. Without that line, Stacy's instrument-path limb (site 6(b), F-2) has nothing it can check, and a consult is only a promise.

#### Q2 — does #735's unfinished-run handling fit the macOS queue shape?

**For condition 2, yes. For conditions 3 and 5 on iOS, no.** Under one ordinary macOS-queue state, the stability record can show condition 5 green when the true answer is poor.
- **Why.** Android's cold rule counts any three `cache: miss` runs, so the order of runs does not matter. iOS's rule counts "the first three pull-request runs at the current Xcode pin", so the order does matter. #735 skips any run whose status is not `completed`.
  - On the macOS queue, the run most likely to be unfinished at read time is the one waiting longest for a runner, which is also the run most likely to exceed the ceiling.
  - Skipping it moves "the first three" on to later runs that have finished.
- **Measured** by running `analyze(normalize(...))` from `stability.ts` at `e7f57c20b` over `ios-queue.json`. The `harness-ios-tokens` context gives:
  - **As committed**: cold runs 801, 802 and 803; condition 5 POOR (801: queue 270 s + duration 340 s).
  - **801's iOS job not yet started** (run `status: in_progress`, job `started_at`/`completed_at`/`conclusion` null, annotations empty, which is #735's own `unfinished()` shape): cold runs 802, 803 and 804; **condition 5 "within the ceiling"**; 801 is listed only in the skipped-runs table.
  - **801 finishing later after a 20-minute queue**: cold runs 801, 802 and 803; POOR.
  - So two reads of one PR history, made minutes apart, give opposite condition-5 verdicts. The first is a false green on the condition that decides whether an iOS context is offered during 129.
- **This is a text question, not a defect** (K-F1 below). Decision 6 does not say whether an unfinished earlier run is among "the first three". So under item 1's own limit, the repair goes into the text first. That is an argument **for** item 1's limit as drafted: had a code edit been allowed to settle it, the code would have chosen the rule. #735's tests use `break-no-verdict.json` and `streak.json`; none exercises an unfinished run on an iOS context.
- **A smaller note, for Data's read**: `runStatus` comes from the workflow run, not the job, and `ApiJob` carries no `status`. While an iOS job waits for a macOS runner, the Android jobs of that run are skipped as well, even though they finished. That errs on the conservative side (a count goes down, nothing turns green), so I raise it only as an observation.
- **A-3 — consult Kenya on stability.ts's iOS reads.** Add to item 1's "Consults" and to site 3's bullet: *"Kenya on any change to how `stability.ts` computes an iOS context's queue time, reads the Xcode pin, or applies condition 3's iOS rule or condition 5."* This matches Data's annotation line: condition 5 is "Kenya's condition, ruled" (tasks.md L60), and K-F1 shows it is where this script can go wrong without any defect.

#### Does the scope touch anything I own, or block my work?

- **It touches nothing I own.** My write scope is `.kiro/specs/**`, `docs/specs/**` and `.kiro/issues/**`. Nothing I'd do is blocked.
- **The class gap stays open, and from my seat I'd leave it open for now.** After U12, `probe-swift.ts`, `parse-swift.ts` and `harness/ios/**` have no standing owner. The ballot excludes them on purpose. Until an iOS context is promoted, a break in them only costs time; it blocks no merge.
  - **Class option**: a later standing grant over the iOS lane files, to Kenya or to Thurgood, ruled at the first iOS promotion offer. Its cost is one more ballot, plus a write-scope change to a charter whose scope is behavioral today.
  - I don't recommend adding it to this ballot. The base rate is zero until promotion, which is § 8's residual 2 again.

#### For Stacy's bound (`merge-hold.yml`)

This is outside my seat. I have nothing to add to B1–B5.

#### Routed outside this ballot

- **K-F1 — Decision 6 clarification (mine to propose; the text first, then Thurgood's code).** For an iOS context, conditions 3 and 5 read "not yet measurable" while any unfinished pull-request run at the current Xcode pin comes before the third counted run, in run order. Until that text is ruled, at any iOS offer I read the skipped-runs table before trusting condition 5. I'll propose the clarification as a tasks amendment through the spec's author.
- **K-F2 — the reserved-word list was measured at a Swift other than the pinned one.**
  - design.md § 4 (L224) and `SWIFT_RESERVED_WORDS` record my check on Swift 6.4.2 (Xcode 27.2). `harness/pins.yaml` § `ios` pins Swift 6.3.3 (Xcode 26.6). The only Xcode on this machine is 6.4.2, so I cannot re-measure at the pin here.
  - **The risk is low and one-sided.** A word that is reserved on 6.4.2 but not on 6.3.3 still compiles in backticks. The only failure would be a word reserved on 6.3.3 and removed later.
  - **The real gap is the trigger.** § 4 says the list "is re-checked when `harness/pins.yaml` § `ios` moves to a new Swift", but nothing fires that re-check. A pin move does not touch `native-rules.ts`, so no consult in this ballot fires either. After 129 closes, nobody is due to do it.
  - With the orchestrator's go, I'll file a record that I own (Trigger `path:harness/pins.yaml`), for the re-measurement at the pin. It is not this ballot's to carry.

#### Surviving counter-argument (fold-back applied)

- **What fold-back changed**: I dropped a named review in favour of a consult (Q1), and A-1 and A-2 make that consult decidable and visible.
- **What survives**: every consult in item 1 is still non-blocking and read only after the merge. After 129, the Swift-side code of a required context's rules module, and the instrument that decides the iOS offers, belong to a seat that does not compile Swift. A defect fix lands on its falsification case and Thurgood's own reading of the design text. My read comes when I'm asked, and Stacy's after the merge. A-2 makes a missing consult visible after the fact. It does not stop a wrong fix from merging. K-F1 shows the failure is real: a careful author, a red-before test, and the record still reads green when it shouldn't. That came from an unstated rule, not a careless edit, and no ownership arrangement prevents it. The text-first limit is what routes it correctly, and I support the ballot because of that limit.

#### [LINA R1]

*Read-only, 2026-11-07T21:51:04Z (`date -u`). I read the ballot whole at `chore/thurgood-charter-scope-ballot` @ `40188e75b`. I checked it against `main` @ `e7f57c20b`: `canonical/agents/thurgood.md`, `canonical/profiles/consumer/thurgood.{dispositions.yaml,overlay.md}`, `tools/agent-generator/adapters/kiro.ts`, `spans.ts`, `partition.ts`, `regrounding/freshness.ts`, Spec 129's `design.md` and `tasks.md`, my `[LINA R3]` in `feedback/tasks.md`, `scripts/harness/__tests__/`, `.github/in-lane-guards.json` and `.kiro/issues/2026-10-17-per-owner-test-folders.md`. @-mention scan: the § 6 Lina row's three questions are answered below. Each claim is marked VERIFIED (checked at that head) or UNVERIFIED.*

**Verdict: approve with amendments.** Nothing here blocks the grant. A1 and A2 are owed before application. A3 and A4 are text fixes.

- **The before-anchors are exact at `e7f57c20b`.** VERIFIED: L240 `  - ".github/in-lane-guards.json"` and L277 `  - "scripts/governance-examples/**"`, each followed by the line § 4 says it is; site 2's fragment occurs on L361; site 4's fragment occurs on Agent-Directory L74; L362 is the six-roots bullet. → § 4 sites 1–4

- **Q1, the per-owner test folders and the rendering: no conflict.**
  - **Rendering.** VERIFIED: the Kiro adapter copies `writeScope` into `toolsSettings.write.allowedPaths` unchanged (`adapters/kiro.ts` L294–296), and the CC adapter renders each glob as listed. So the three named tests and `fixtures/stability/**` become writable for Thurgood on Kiro too, which the six-roots stem rule cannot do on Kiro today. Disposition rows are keyed by glob (`writeScope[<glob>]`, `spans.ts` L94, `partition.ts` L460), not by index. Inserting entries mid-list therefore moves no existing row. Each of the seven new entries needs a first signature, or `consumer-profile.real.test.ts`'s "every routed row is signed" fails. That work is in site 7.
  - **The issue.** VERIFIED: its move covers `tools/agent-generator/__tests__/` and `scripts/__tests__/`. It does not cover `scripts/harness/__tests__/`, so the fixing PR and these named entries do not collide. After this ballot, `scripts/harness/__tests__/` is a folder with several owners, assigned file by file: three files are Thurgood's by name, and `compare`, `parse-*`, `probe-*`, `consumer` and `native-harness-workflow` go by grant. That is a choice and not a defect. As that issue's co-owner, I'd add a dated line to it saying the folder is outside the move on purpose, so the move's author does not later sweep it into a per-seat glob. Optional; Thurgood can pick.
  → § 4 sites 1, 7; `.kiro/issues/2026-10-17-per-owner-test-folders.md`

- **Q2, listing the emitter test by name with Ada consulted: yes, that is what fix 2b intended.** Fix 2b asked for one line naming who maintains the test after U6, because "a test under `scripts/` follows the file it exercises" picks neither seat for a test that exercises two. Design § 4 L465 settled it as Thurgood. Naming it in `writeScope` makes that ruling enforceable. One difference, which is Ada's to accept: design § 4 consults her "on any change to its emitter side", and § 3 item 1 consults her "on any change to `native-rules-emitter.test.ts`". The wider consult is the safer one. → § 3 item 1; design.md § 4 "The shared harness module"

- **Q3, does any unit I lead or serve need these paths or `merge-hold.yml`: no.**
  - VERIFIED: U7 is merged (#739, `c71fb2452`; post-merge evidence #741, `e7f57c20b`), so it is not in flight. My remaining rows are secondary on U8 (Task 13), U9 (Task 14) and U11 (Task 16). None of them lists `stability.ts`, `native-rules.ts`, their tests or `.github/workflows/merge-hold.yml` in its Primary Artifacts. Task 13 lists `scripts/harness/d2-check.ts` and its test, and Task 14 lists `consumer.ts` and its test, all under other PRIMARYs.
  - **An interaction to schedule, not a block.** Site 7 puts `canonical/generated.lock` into the application PR. U9 and U11 also carry the lock, and I do the regeneration in both. All three land before U12, so the application PR needs a slot in the one-lock-PR-at-a-time order. I'd ask § 7, or the brief for the application PR, to name that slot.
  → § 4 site 7; tasks.md §§ "13.", "14.", "16."

- **A1 — site 7 must name the `#in-scope` disposition edits, because nothing mechanical catches them.**
  - VERIFIED: the `#in-scope` row in `thurgood.dispositions.yaml` is `re-pointed` with three `removals`. Its `subtraction-2` removal text equals L361, the CI-regime bullet, byte for byte, and its `subtraction-1` text equals L362 byte for byte.
  - Site 2 rewrites L361 and site 3 adds a bullet after L362. At application, the stored removal text then no longer matches the bullet, and the new bullet has no removal row. `freshness.ts` L86 states that removal text is not checked ("completeness of an item's text … the confirmer's"). The re-sign would catch the hash move, but nothing would catch stale removal text.
  - **Asked**: site 7 names the two edits for Stacy, the C1 signer: the `subtraction-2` removal's text is replaced with site 2's after-text, and a removal is added for site 3's bullet. It names repo-only paths, so it cites `subtraction-1` as I read it; the cite is Stacy's call as confirmer. The overlay already replaces the unit, so nothing leaks to consumers either way. The defect would be a signed record that no longer describes the text it signs.
  → § 4 site 7

- **A2 — add Spec 129 `design.md` § 4 L465 as an edit site.** VERIFIED: it reads "a change after U6 rides a task-row or issue-row grant, because `scripts/harness/**` is not in a standing scope". At application that sentence becomes false for the emitter test and for `native-rules.ts`. Asked: a dated amendment line in place, written by Thurgood as spec author and listed under **Amends**. → § 4; design.md § 4 "The shared harness module"

- **A3 — cite Peter's ownership ruling for `native-rules.ts`.** §§ 2 and 3 cite `tasks.md` L855 for "maintainer after U6". VERIFIED: L855 makes Thurgood the maintainer of the *test*. Ownership of the *module* comes from Peter's "B Thurgood" (2026-11-06T23:31:58Z, `evidence/2026-11-06-peter-rulings-round-3.md`; design L42: "Thurgood owns and authors `scripts/harness/native-rules.ts`"). With that citation, § 8 residual 2 also changes: the case for `native-rules.ts` rests on a ruled ownership and a required context, not only on a maintenance clause. → §§ 2, 3 item 1, 8

- **A4 — complete the Excluded list.** VERIFIED: the list does not name `scripts/harness/__tests__/native-harness-workflow.test.ts`, which exists and is registered (`in-lane-guards.json` L305), or `scripts/harness/d2-check.ts` with its test, which Task 13 will add at U8. Site 3's charter text already ends "The rest of `scripts/harness/**` … is not yours", so the charter is sound. The ballot's own list should name both, or close with "and every other file under `scripts/harness/`". → § 3 item 1

- **Also checked for Stacy's B2 caveat.** VERIFIED: `merge-hold.yml` has no block scalar at `e7f57c20b` (no `key: |` or `key: >` line). → § 3 item 2 B2

- **Surviving counter-argument (my seat's).** The emitter test joins two standing scopes through a gate. After Task 18 registers it, an intended change to Ada's emitter in `src/generators/**`, made in her own standing scope and not under a planned task row, turns a registered in-lane guard red. She cannot repair that in the same PR, because the test and `native-rules.ts` are Thurgood's. Item 1's co-access ("a later spec's task row … alongside mine") covers planned work only. So the ballot removes the grant cost on Thurgood's side and leaves an ordering dependency on Ada's side for unplanned emitter fixes: either Thurgood's design-text-first change lands first, or the two seats share a PR. That is the fork in § 6's Ada question (2). Ada and Peter should pick it; I don't. → § 3 item 1; § 6 Ada row

### Cross-read round (all five R1 entries read by each seat)

#### [STACY R2] — cross-read

**Item 2: Ada A-2 against my amendment 5. They do not conflict.**
- **They cover different files and answer different questions.** My amendment 5 concerns `merge-hold.yml` only. It decides which of my ARMING reads applies to a PR that touches that path: the grant limb or P1c. Ada's A-2 decides who may hold a grant over `native-rules.ts`.
- **A wording change to mine.** I reword amendment 5 from "takes precedence" to: "selects which read applies; never widens a grant".
- **A-2's checkable parts.** Its grant clause can be checked from the merged task rows and the grant records, so I add it to my LENS read at the tasks round.
- **A-2's self-reported part.** Its authorship clause rests on `Agent:` lines and commit trailers, which the author writes. My read of it can only test whether those records agree with each other; it cannot prove who wrote the code.
- **A-2's design-anchor citation.** My 6(b) read checks that the citation is present. Whether it is true is a sampled judgment.
- **Settlement:** accept A-2, with mine reworded as above.

**Item 4: Kenya's K-F1, from the claims view.**
- **#735's claim is true.** It said "an unfinished run is skipped, not a break", and the code does that. Its regenerated record shows "0 runs skipped". No committed record carries the false green. So this is not a claims finding.
- **What the ballot should say.** Nothing new. K-F1 is the first case of item 1's "text first" limit working as designed. Thurgood may cite it in § 8.
- **What should happen now.** Kenya files K-F1 now as a tasks amendment to Decision 6, through the spec's author. While 129 is open, that text change and the code that follows it need no ratification of this ballot. The code fix can ride the amendment's task row.
- **My interim rule until that text is ruled.** Suppose a stability record shows iOS condition 5 green, and some earlier unfinished run sits before its third counted run. I record condition 5 as `not re-verified — unfinished run precedes the third counted run`. I never count it as a green.

**Item 6: my bound holes.**
- **No other seat disputed them.** Lina's block-scalar check agrees with mine at `e7f57c20b`. It is still a check of one commit, and the premise has to be checked again at every `<base>`.
- **A cheaper settlement I would accept.** Remove `env:` key lines from B4's allowlist, and add a duplicate-key check. #732 added no `env:` line, so it still passes.
- **Why entry lines cannot do the same thing.** I inserted an entry line at indent 8 and at indent 2. `js-yaml` rejects both with "bad indentation". At indent 10 the entry becomes an unread checkout input, which does nothing. That leaves bare `key:` lines as the only way to re-parent.
- **My floor either way:** the bound must fail F-A, F-B and F-E. Whether to use this route or a parse-level comparison is Thurgood's choice.

#### [ADA R2] — cross-read, items 1 and 2

Read-only. I read all five entries in full.

**Item 1 — the consult load: one rule, and the three-seat price is right.** Kenya's A-1 and Data's D-2 are mirror images of each other, and both use my "outside its comments" boundary. They collapse into one sentence, which I'd accept as the replacement for item 1's three consult lines:

> *"Every change to `native-rules.ts` outside its comments, a defect fix included, consults Ada. It also consults Kenya unless every changed hunk lies inside a Kotlin-only export (`kotlin*`, `KOTLIN_*`, `BINDING.kotlin`), and Data unless every changed hunk lies inside a Swift-only export (`swift*`, `SWIFT_*`, `isSwiftIdentifier`, `BINDING.swift`). Each consult is a `**Consulted**:` line in the PR body."*

- The last sentence is Kenya's A-2. I take it: without it, Stacy's 6(b) read has nothing to check.
- **The price.** A shared helper does consult all three of us. That is correct, because a shared helper changes both platforms' output. The consults are read-only and run in parallel, so three of them cost about one round. I won't narrow my own consult: "every rule change" is Peter's ruled wording.
- **What changed my view.** Kenya's K-F1 shows a careful fix can still read green when it shouldn't. That is an argument for more readers on the mirror, not fewer.
- **Residual**: consulting the emitter's owner on the mirror risks pulling the generator into it ("make it match what I emit"). My consult reads the change against the design text, never against my output. I'd have Thurgood's site-3 bullet say so.

**Item 2 — A-2 against Stacy 5: they don't conflict.**
- **Stacy 5** decides *which ARMING limb reads* a `merge-hold.yml` PR that a grant covers.
- **A-2** decides *who may hold a grant* over `native-rules.ts`.
- They cover different files and different questions. The conflict would come only if Stacy 5 were read generally, as "a grant overrides the standing bounds". Settlement:
  1. Stacy 5 stays scoped to P1c.
  2. Item 1's limits (the text first, the consults, A-2) apply whether the author holds standing scope or a grant, as the ballot's Grants bullet already says for the consults.
- **A-2 is decidable at grant time, without asking anyone.** A grant record over `native-rules.ts` whose grantee also holds `src/generators/**` in the same unit's merged row is malformed on its face. Stacy can read that from the grant record and `tasks.md`.

**Lina's residual** (my unplanned emitter fix turns the registered guard red): this case is smaller than it looks.
- If my fix is a true defect fix, a correct mirror then agrees with it, and the comparison goes green.
- If the comparison goes red, one of the two copies disagrees with the text. That is A-3's read.
- Only a rule change needs both halves changed, and that needs the design text first anyway. So my R1 answer stands: one PR, with the mirror half written by Thurgood in his own seat.

#### [DATA R2] — cross-read

**Item 1: one rule, which I accept.** Kenya's A-1 and my D-2 are one rule, mirrored. "The seat whose platform's hunks changed" cannot be decided for a shared helper, which changes both platforms' output, so I keep the exclusion form:
- **"Ada on every change to `native-rules.ts` outside its comments, a defect fix included, and on any change to `native-rules-emitter.test.ts`.**
- **Kenya and Data on every such change, unless every changed hunk lies inside a declaration or `BINDING` key named for the other platform: `swift*`, `isSwift*`, `SWIFT_*` / `kotlin*`, `KOTLIN_*`."**

`BINDING.swift` and `BINDING.kotlin` are keys, not declarations, so neither draft covered them. Two or three non-blocking consults per change is an acceptable price. I adopt Kenya's A-2, which makes them checkable.

**Item 3: the exact list.** I adopt Lina's A4, plus a closing line. Excluded:
- `compare.ts`, `consumer.ts`, `parse-kotlin.ts`, `parse-swift.ts`, `probe-kotlin.ts`, `probe-swift.ts` and `d2-check.ts` (Task 13, U8; not on `main` yet), with their tests;
- `native-harness-workflow.test.ts`, which goes with the workflow's grant;
- every `fixtures/` directory except `fixtures/stability/`;
- every other file under `scripts/harness/`;
- `harness/**`.

**Item 5: a fork for Peter, not part of this ballot.** Thurgood cannot widen my charter. Kenya's entry makes it one class: the native lanes' producers have no standing owner. The Android gap is live now, because `harness-android-tokens` is required; the iOS gap opens at the first iOS promotion. With the orchestrator's go, I would file one record (owner Data, co-owner Kenya) offering Peter that class option. Its Trigger would be the first demotion-read finding traced to a producer, or the first iOS promotion offer.

**Kenya changed my view on one point.** His `runStatus` note reaches Android. `stability.ts` skips a run whose workflow is not `completed` (L311). So a finished Android `harness-infra` job, in a run whose iOS job is still queued, drops out of the infra count, the infra rate and the consecutive-infra finding. For demotion (b), that hides evidence. It belongs in K-F1's text-first Decision 6 clarification, with me consulted under D-1, not in a code fix.

#### [KENYA R2] — cross-read, items 1 and 4

**Item 1 — the consult load: one hunk rule.**
- **What moved me.** Ada A-1 is Peter's ruled consult, so I accept it. Data D-2 mirrors my A-1, and his list is better: `swift*` misses `isSwiftIdentifier`.
- **Settlement**:
  - Ada on every non-comment change.
  - Kenya unless every changed hunk lies in a Kotlin-only export (`kotlin*`, `KOTLIN_*`, `BINDING.kotlin`).
  - Data unless every changed hunk lies in a Swift-only export (`swift*`, `SWIFT_*`, `isSwiftIdentifier`, `BINDING.swift`).
- **Cost.** A shared-helper change costs three consults. That is the right price: a shared helper is where Swift names change without any Swift-named hunk.
- **To cut the load**: a seat's review entry in the same unit satisfies its consult, cited in `**Consulted**:`.

**Item 4 — the false pass.**
- **I'm revising my R1.** It is a defect after all, provided the fix outputs **"not yet measurable"**. While a run is unfinished, the text gives no answer, and that output picks no rule.
- **Timing.** No iOS offer can come before both Android contexts are promoted. File the record now (owner Thurgood, finder Kenya). The fix goes under item 1 after ratification, or under a grant if an iOS offer comes first. The ballot needs nothing.
- **Reproduction** at `e7f57c20b`: `analyze(normalize(raw))` on `fixtures/stability/ios-queue.json`, context `harness-ios-tokens`.
  - **Baseline**: cold runs 801, 802, 803; `queuePoor` true (801: 270 s queue + 340 s).
  - **Mutation**: the test's `unfinished(raw, 801, 'in_progress')`. Nulling only iOS job 900041 gives the same result.
  - **Result**: `skippedRuns` [801]; cold runs 802–804; `queuePoor` false; the render says "within the ceiling".
  - **Control**: 804 unfinished leaves 801–803 POOR.
  - **Mechanism**: L309–313 skips the run, then L372's `atPin.slice(0, 3)` takes the next three.
- **The fix.** For an iOS context, a skipped pull-request run at the current pin whose id is below the third cold run's id nulls `coldMet` and `queuePoor`, and the render names that run.
  - `skippedRuns` needs `xcodePin` added.
  - Falsification cases: the mutation (red before the fix) and the 804 control (stays green).

#### [LINA R2] — cross-read, items 1 and 3

*Read-only; all five entries read, checked at `e7f57c20b`.*

**Item 1 — the consults collapse into one rule, and two or three per change is the right price.**
- **Ada A-1 is right.** VERIFIED: design.md L468 reads "Ada is consulted on every rule change. Kenya and Data each review their own platform's rules." The draft narrows that text and does not mark the narrowing.
- **Kenya A-1 and Data D-2 are the same test, written from opposite sides.** I'd accept one clause in place of all three:
  > *Every change to `native-rules.ts` outside its comments consults Ada, Kenya and Data. A seat is not consulted when every changed hunk lies inside the other platform's declarations: a top-level export named `swift*`, `SWIFT_*` or `isSwift*`, or `BINDING.swift`; and likewise `kotlin*`, `KOTLIN_*` or `BINDING.kotlin`.*

  VERIFIED: these prefixes match the module's exports. The diff and the file at `<m>` decide the clause.
- **Price.** A change to a shared helper consults all three seats. That is correct, because it changes both platforms' output. The consults are read-only and parallel; the base rate is one commit. Kenya's A-2 (one `**Consulted**:` line per seat) lets Stacy's 6(b) read check the clause.
- **Peter's call:** the design says "review" and Kenya prefers "consult". If the ballot uses "consult", it marks the word **[author's addition — Peter rules]**.

**Where another entry changes my view.** Ada's answer to her question (2) settles the fork in my R1 residual. Both halves land in one PR: Ada writes the emitter half, and Thurgood writes the mirror half from the design sentence (her A-2). I withdraw that residual.

**Item 3 — the excluded list.** I take Data's D-3 wording for the workflow test. The list I'd agree to:
- `compare.ts`, `consumer.ts`, `parse-kotlin.ts`, `parse-swift.ts`, `probe-kotlin.ts` and `probe-swift.ts`, plus `d2-check.ts` once U8 adds it;
- the `.test.ts` file of each of those;
- `native-harness-workflow.test.ts`, "which tests the workflow and goes with the workflow's grant";
- `fixtures/{kotlin,swift,parse-kotlin,parse-swift}`, and `harness/**`;
- a closing line: "and every other file under `scripts/harness/` that the table does not name".

VERIFIED against `git ls-files scripts/harness`.

#### [THURGOOD cross-read] — author, read-only, 2026-11-07

**1. Consult load.** Ada is right: I narrowed Peter's ruled "Ada is consulted on every rule change" — my error.
- **Settlement**:
  - Ada on every non-comment change.
  - Data unless every changed hunk is Swift-only.
  - Kenya unless every changed hunk is Kotlin-only.
  - A shared hunk consults both platform seats.
- Add Kenya's A-2 `**Consulted**:` line and his A-3, which mirrors D-1.

**2. No conflict.** Stacy 5 decides which ARMING limb reads a `merge-hold.yml` PR. Ada A-2 decides who may hold a grant over `native-rules.ts`. I take A-2 as an author's addition, the single exception to "grants never narrow".

**3. Excluded list.** Add `native-harness-workflow.test.ts`, `d2-check.ts` and its test, then close with "every other file under `scripts/harness/` and `harness/**`".

**4. Kenya's false pass is real. I reproduced it.**
- With 801 queued, the cold runs become 802–804 and `queuePoor` reads `false`. As committed, they are 801–803 and `true`.
- Kenya is right that this is a gap in the text: Decision 6 does not say whether a pending earlier run counts as one of "the first three". #735's skip made that choice in code.
- **The fix**: Kenya's K-F1 text ("not yet measurable while an unfinished run precedes the third"), as a tasks amendment I author. Its row names `stability.ts` and its test, so the plan act grants the code fix, with Kenya's fixture red first.
- It needs no ratification and is not urgent (it bites only at an iOS offer). I file a record now; § 2 cites the case.

**5. Data's residual** is a separate fork for Peter: this ballot cannot widen Data's charter. It goes into § 8 as a residual.

**6. Yes, decidably.** My prototype B6 (`b6.cjs`):
- parses both sides with `js-yaml`, which rejects duplicate keys;
- requires the trees to be equal outside `env` maps;
- requires each `env` map at base to be a sub-map of the head's;
- requires added keys to be allowlisted.

Results: F-A, F-B, F-C and F-E FAIL; #732 and a comment-only edit PASS. B6 also covers the block-scalar premise, because a scalar change is a tree change. B3 strips `\r`.
- **Residual**: `js-yaml` is not GitHub's parser.
- I strike the false claims in § 3 and § 5 regardless.

**Folded without contest**: Lina A1–A3 and the lock slot; Stacy 5 and 6.

### Incorporation

#### [THURGOOD R2] — author incorporation, 2026-11-07T21:59:54Z (conflict restated: the author is folding consults on his own charter)

All five round-1 entries and all six cross-reads (mine included) are spliced above, byte for byte. The orchestrator's cross-read brief is the session's `crossread.md`. The folds:

- **The one consult rule for `native-rules.ts`** (Ada, Data, Kenya, Lina) → § 3 item 1 "Consults on `native-rules.ts`"; site 3.
  - Ada on every non-comment change, which restores design.md L477. The draft narrowed it without marking it; that was my error.
  - Kenya and Data on every change unless every hunk is in the other platform's named declarations or `BINDING` key.
  - The `**Consulted**:` line, and a same-unit review entry satisfying it.
  - "Review" versus "consult" is **F-4**, left to Peter: Kenya's same-unit point lowers the cost but does not settle the word.
- **Ada A-2 and A-3** → § 3 item 1 limits; site 3. A-2 is marked as an author's addition, the one exception to "grants never narrow".
- **Stacy 5**, reworded per `[STACY R2]` ("selects which read applies; never widens a grant") → § 3 item 2 "Which limb reads it"; site 6(a). Stacy 6 → site 6(b).
- **The Excluded list** (Lina's list, Data's D-3 wording, closing "every other file under `scripts/harness/` that the table does not name") → § 3 item 1.
- **Lina A1–A3** → site 7 (the `#in-scope` removal texts, first signatures, lock slot), site 8 (design.md § 4), § 1 and § 2 (the "B Thurgood" citation).
- **Data D-1** (the annotation interface, consults both ways) and **Kenya A-3** (the iOS reads) → § 3 item 1 "Consults on `stability.ts`"; site 3.
- **The bound** → § 3 item 2.
  - Stacy's F-A, F-B and F-E are closed by **B5, a parse-level comparison**, picked over her cheaper route. The reason is case n8: an env-shaped job key inserted at indent 4 passes B1–B4 and her route, and only GitHub, not git, would decide it.
  - Her amendment 2 (block scalars) is covered by B5, with a case. Her amendment 3 (whole-name match, F-C) is in B4 and B5; her amendment 4 (CRLF) is in B3.
  - The old judgment clause is now B6. The false claims she named in § 3 and § 5 are now true by B5, and their mechanism is restated.
  - The query was re-run on #732, #727, n1–n8, F-A, F-B, F-C, F-E, the block-scalar case and the comment cases (§ 3 table).
- **Not folded**:
  - **Kenya's K-F1** (the iOS condition-5 false pass in #735's `stability.ts`) stays out of this ballot. It goes through a tasks amendment to Decision 6, which the orchestrator briefs separately. My cross-read's "§ 2 cites the case" is withdrawn on that direction. Kenya's K-F2 (the reserved-word re-check trigger) is his record.
  - **Data's residual** (no standing owner for the native lanes' producers after U12) is a fork for Peter outside this ballot (§ 7, last paragraph).
  - Data's round-trip annotation test is a record for after ratification.
- **Re-read with Peter's 2026-11-07T21:56:42Z ruling** ("Re: 2, Class": every `.github/**` grant is an issue-row grant). P1c is standing scope, not a grant, so the ruling does not touch it. Site 2's "anything else in that file goes through an issue-row grant" already agrees with it.
