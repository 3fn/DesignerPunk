# Ballot Measure: link 4's candidate is the first SHA printed after a proven commit, with the subject read from the result or from that commit's own message (signing-act ballot § 4.3)

**Date**: 2026-10-23
**Drafted by**: Thurgood (Civitas steward; author of ballot `2026-10-01-signing-act-chain`; owner of `verify-signing-chain` and of the record `.kiro/issues/2026-10-23-audit-link4-rejects-sha-alone-commit-line.md`, whose § 4 option A this measure narrows).
**Authority to draft**: Peter, chat, 2026-10-23, verbatim: **"Proceed with the joint recommendation. 445 and 446 are merged"**. The joint recommendation (consult R2: Thurgood item 3, Stacy item 4) has three parts: the signing-seat brief now, the early audit as practice, and this narrow § 4.3 amendment, drafted now and executed after Spec 129. **The fork it left open** (amend § 4.3 in the narrow tolerant form, or keep it strict and leave #445's 20 acts as honest `record absent`) **is resolved by his "Proceed": amend, after 129.** The ballot text below still needs ratification.
**Status**: **DRAFT**, not ratified. No edit site below is applied. A merge with this line still reading DRAFT is a recording defect, not a ratification.
**Required reviewer**: **Stacy** (R1). § 4.3 is her rule ("The lookup rule (Stacy's, operative)"). She specifies every fixture (signing-act ballot § 4.5), so § 3's list is her R1 to confirm, amend or replace. She is the census reader, and the re-read of the 20 acts lands in her pass record.
**Class**: LAW. It amends a ratified ballot's operative rule (§ 4.3's candidate sentence) and adds one outcome (the store-shape canary). The record calls the instrument's behaviour correct against its closed spec (Stacy's read), so this is a law change, not a bug fix. Owning the instrument does not authorize changing the law it serves.
**Amends**: `.kiro/docs/ballots/2026-10-01-signing-act-chain.md` § 4.3: the candidate sentence, one outcome bullet and the dated pointer; § 5.4: one sentence (the canary does not widen; R2, Stacy R1 A3); and an Errata ledger line. Also `governance/classification-map.md` row `signing-act-consistency` (one history line, plus the `--audit` scope comment's LOOKUP RULE sentence, so the register does not restate superseded text) and `governance/signing-seat-brief.md` (rows that cite § 4.3). The instrument `tools/agent-generator/regrounding/verify-signing-chain.ts` and its audit test follow it.
**Census** (one line per registered instrument that loads an edit site, the hold ballot's A3 form). The signing-act ballot is the law `verify-signing-chain.ts` cites (its L1–2), and the item names a code change to that file, so it is presumptively in scope (conditions 2 and 3). The two `governance/` sites add two instruments (condition 1).
- `**Census**: not in scope — verify-signing-chain (tools/agent-generator/regrounding/verify-signing-chain.ts; the registered check is --ci, census --census-routed) — the change is confined to candidateLines / indexCandidates and runAudit's lookup, reached only from runAudit (L1343, L1352); no --ci verdict and no --census-routed line can change; --audit is post-acceptance and never a gate (its scope entry is check_state none, checks [])`
- `**Census**: not in scope — check-section-citations (scripts/check-section-citations.ts, citing corpus governance/) — the governance/ edits add or change no get_section / get_document_* citation`
- `**Census**: not in scope — 122-diff-guard (tools/agent-generator/diff-guard.ts; governance/ is an input-closure root) — governance/ is an ordinary closure input; no rule, pattern or grammar the guard reads changes; the lock is refreshed at application (§ 5 step 7), where its verdict is read`
**Application trigger** (README rule 1 grammar; the walked home is the record's Trigger line, which carries the same text): `manual`. The event that owes the close is the commit that appends the re-read of #445's 20 acts under the amended § 4.3 (§ 5 step 9), made after this ballot's application PR merges, at the merged tool SHA (R2, Stacy R1 A7: the application PR touches an instrument path, and the re-read is an audit verdict, so it follows the merge). Start condition (prose): after Spec 129's first unit merges, which is the first commit on `main` under `.kiro/specs/129-consumer-generation-completeness/completion/`. Deadline (prose): the application PR opens no later than **2027-03-21**, and both re-reads (Stacy's and the delegate's) are committed before **2027-04-21**, the 180-day retention edge for #445's seat transcripts (signing-act ballot § 6 item 1, `cleanupPeriodDays` 180; the seat commits are dated 2026-10-23). The first monthly Civitas walk dated on or after 2027-02-21 reads whether the application PR has opened. *Why `manual`, not a git token*: the closing event is a commit that follows this measure's own application PR, neither of which exists yet, and rule 1 puts a start condition in prose. `path:` would name the start (Spec 129's first unit), not the close. `release:next:phase-1` would tie the work to a release, which may come before 129.
**Retroactivity**: none for verdicts already recorded. The rule governs `--audit` runs after its application merge. The 20 acts are re-read then, and the result is **appended**, labelled, never written over the `record absent 20` line (§ 5 step 9).

> **Conflict of interest, stated first.** I wrote the ballot whose rule this amends, I own the instrument, I own the record, and I drafted the convention the seat briefs dropped. The narrowing in § 2 is Stacy's input route plus my R1 text; her review and Peter's ruling are the checks.

---

## 1. The defect

PR #445 (the routes-floor application; 20 first signatures by 7 seats; `--ci` PASS) reads `record absent 20` under `--audit` (record §§ 1–3). Every seat committed `git commit -q -m "<subject>" -m "<trailers>" && git log -1 --format=<f>`. `-q` suppresses the `[branch sha] subject` line, and `<f>` put the SHA alone on line one. Today's candidate form is a bracket line, or a first `git log` line reading `<hex> <subject>` (`HEX_LINE_RE`), so no candidate was found. The seven calls, read from the transcripts on 2026-10-23 (every one `is_error: false`, the SHA on output line 0):

| Seat | Commit | Format, and what follows the log | Output line 1 |
|---|---|---|---|
| Ada | `1ddac1d23` | `%h%n%B`, then `&& git status --porcelain; npx tsx …` | the subject |
| Data | `ea0bfe293` | `%h%n%B`, then `&& npx tsx …` | the subject |
| Kenya | `314e6a01e` | `%h%n%B`, then `&& git status --porcelain && npx tsx …` | the subject |
| Leonardo | `fc6ae901a` | `%h%n%B`, then `; git status --short; npx tsx …` | the subject |
| Sparky | `81e4f9c70` | `%h%n%B`, then `; git status --short \| head -3; npx tsx …` | the subject |
| Stacy | `4c0f6977b` | `%H%n%B \| cat`, then `; git status --porcelain …` | the subject |
| Lina | `bd19189e2` | `%h%n%b` (body only), then `&& git status --porcelain && npx tsx …` | `Agent: Lina` (no subject) |

In each call the commit reaches the log only through `&&`, so success evidence (b) holds for all seven. Only the candidate's line shape fails. The rule was in the ballot (§ 4.3, convention note), and the briefs dropped it. That brief-side fix landed separately, as `governance/signing-seat-brief.md`, together with the early audit after the first seat (record § 6).

**Why amend at all, given the brief fix?** Without it, the 20 acts stay `record absent` for good (a re-sign is unavailable: one that moves no hash fails F5, Stacy R1 (d)). And the next brief omission degrades the audit the same way. The ballot's own measurement (45 of 50 U2b seat commit calls outside any conforming shape, § 4.3) shows seats do not converge on `%H %s` unbriefed.

## 2. The rule (operative text, proposed)

**2a. The candidate sentence.** In `.kiro/docs/ballots/2026-10-01-signing-act-chain.md` § 4.3, replace the first paragraph of the quoted rule, which begins "> **A candidate** for commit C is", with:

> **A candidate** for commit C is either (i) the `[<branch> <sha>] <subject>` line printed by a `git commit` in the same tool call, or (ii) **the first SHA printed in the result of a tool call that runs a `git commit` and then a `git log`** (one per pass, where the call loops), in any line shape: a run of 7–40 lowercase hex characters bounded by whitespace or the line's ends. The SHA must be **a prefix of C's full SHA**. **C's exact subject must also be shown**, either in the result (the rest of the SHA's line, or the next non-empty line) or in the input: the call's first `git commit` invocation's first `-m` value, or the first line of its `-F -` heredoc. Nothing else in the command is read, and in a call that loops only the result shows the subject. A SHA appearing anywhere else — a brief that quotes it, a grep, a `git log` in a call with no `git commit`, a SHA that is not the first one printed, a `git log -1` after a failed commit — **is never a candidate**.

The second and third paragraphs (success is decided from evidence; the closed success-evidence set; "Seat briefs commit as `git commit … && git log -1 --format='%H %s'`") **are unchanged**. So are the convention note under the quote and the four outcome bullets.

**2b. One outcome added** (the store-shape canary), after the four bullets:

> - **the store's layout is unrecognized** — transcripts exist under the store, but no `tool_use` running a `git commit` pairs with a `tool_result` anywhere in it; or subagent transcripts exist and none has its `.meta.json` record → **every act not run under Kiro reads `anomaly` 4: store layout unrecognized**, never `record absent`. A harness format change is then loud, and is not read as a population of missing records. A store with no transcripts, or with main-session transcripts only, reads as before this amendment (`record absent` 4, `FAIL` 4 where a main-session candidate exists, `unanchored` under `--kiro`).

**2c. Pointer.** After the quoted rule: *(amended <application date> by ballot 2026-10-23-link4-candidate-first-sha-after-commit; prior text at `<main SHA at application>`.)*

**2d. The canary and the widening rule** (R2, Stacy R1 A3). In § 5.4, after the paragraph that begins "**A `FAIL`, an `anomaly`, a meta `spawnDepth` ≠ 1", add:

> An `anomaly` 4 that reads `store layout unrecognized` is evidence about the instrument, not about a seat: it sends no act into J, and it reaches Peter as one `**Open for Peter**:` line per `--audit` run, in place of § 5.3's per-act line for the Stacy-signed acts it covers.

**My read, the same as Stacy's**: no widening, one line per run. Widening sends every seat's acts into J on a fact about the harness, which tells J nothing about any seat. The case against: a store whose `.meta.json` files were deleted would escape J. But that same store reads `record absent` today, which does not widen either. So the canary is no weaker than today, and it is louder (a line to Peter). No fork.

**What does not change:**
- **What link 4 proves.** The candidate is still a creation event in one call: a commit proven by the closed evidence set, followed in the same call by the SHA it created. Links 5–7 still run on that call's transcript only. A SHA printed by another call, another seat or another session is never a candidate.
- **The success-evidence set** (a) and (b). A `;`-chained or piped commit still reads `anomaly`, and H2b holds as it does today.
- **The outcomes**: one candidate in a subagent transcript → links 5–7; candidates only in the main session → `FAIL` (H3); several → `anomaly`; none → `record absent`, or `unanchored` for a Kiro-run seat.
- **A `git log` is required** (R2, Stacy R1 A6). Route (ii) reads only a call that runs a `git commit` and then a `git log`. That is narrower than the summary in the record (§ 6 item 3, "the first sha printed after a successful `git commit` in the same call's result"). A log-less call (`commit && rev-parse`, `commit && push`) is outside (ii) and reads `record absent`, today's reading. It could never anchor anyway: success evidence (b) needs the log. Fixture N13.
- **The convention**: seat briefs still commit as `git commit … && git log -1 --format='%H %s'`, now carried by `governance/signing-seat-brief.md` S10.

**How the narrowing excludes the false matches** (Stacy R1 (a), Thurgood R1 (a) and R2 (1)):
- *C on a later line of a later call's `log -N`.* "First SHA printed" excludes it: a call that made D and ran `log -2` prints D first.
- *`git push`'s `old..new`.* `commit && push` with no `git log` is outside (ii). And where a log does run, the input subject is D's, not C's.
- *A bare SHA followed by an unrelated line.* Without the subject in the result or in the input, nothing matches.
- *Output printed before the commit in the same call* (a hook, an earlier command, a hex-looking word). It can only push C out of first place, which reads `record absent`, the safe direction. It cannot supply a false candidate: the SHA must prefix C's and carry C's subject.
- **Lina's `%h%n%b`** anchors through the input route, which keeps the subject binding. Thurgood R1's fork (drop the subject test for that line) is withdrawn.

## 3. Fixtures (proposed to Stacy; she specifies, Thurgood builds)

In `tools/agent-generator/__tests__/verify-signing-chain.audit.test.ts` (the test follows the module). The PR body names `tools/agent-generator/regrounding/verify-signing-chain.ts` as the exercised file.

**Negative cases:**

| # | Shape | Must read |
|---|---|---|
| N1 | another agent's call prints C, with no `git commit` in it | not a candidate |
| N2 | the same seat prints C in a later call with no commit | not a candidate |
| N3 | the call commits D, then `git log -2` prints D, then C | not a candidate for C |
| N4a | a failed commit, then `; git log -1` printing the previous HEAD | `anomaly` (as H2b) |
| N4b | the input-route H2b: a primary's quiet commit C has subject S; the seat then runs `git commit -q -m S …; git log -1 --format=%h`, which fails and prints C's SHA alone | `anomaly`, never `anchored`: the input route never anchors an unproven call |
| N5 | the main session prints C after its own commit (`commit D && git log -2`) | no candidate for C, and no spurious H3 `FAIL` |
| N6 | a bare SHA line, no subject in the result, and none readable from the input (`-F <file>`, `%h`) | `record absent` |
| N7 | `git commit -q … && git push`, no `git log`; the push output shows `old..C` | not a candidate (`record absent`) |
| N8 | `-F <file>`, so no input subject: (a) `%H %s` | (a) `anchored`, by the result route |
|    | (b) `%h` alone | (b) `record absent` |
| N9 | `git commit … && git -C <other> log -1` | the prefix fails: not a candidate for C |
| N10 | `git commit -q -m S && git push && git log -1 --format='%h%n%b'`; the push prints `old..C` before the log | `anchored` (input route): `old..C` is not a token under the boundary |
| N11 | `git rev-parse HEAD~1 && git commit -q -m S && git log -1 --format='%H %s'`: a hex token printed before the log | `record absent`: the first SHA is not C's (the safe direction) |
| N12 | the input-route H3: the main session commits C with `-q -m S -m "Agent: kenya" && git log -1 --format=%h` | `FAIL` 4 (H3). Today this form reads `record absent` |
| N13 | `git commit -q -m S && git rev-parse HEAD`: no `git log` | `record absent` |

**Positive cases**: one per #445 call shape (§ 1), modelled on the transcript's command and result:

| # | Shape | Must read |
|---|---|---|
| P1–P5 | `-q -m S -m T && git log -1 --format='%h%n%B'`, with the five tails seen (`&& … ;`, `&& …`, `&& … &&`, `; … ;`, `; … \| head`) | `anchored` (result route, next line) |
| P6 | `%H%n%B \| cat` (the full SHA; the pipe sits after the log, not on the commit) | `anchored` |
| P7 | `%h%n%b` (Lina's: the subject is not in the result) | `anchored` (input route, first `-m`) |
| P8 | **the conforming line, read from `governance/signing-seat-brief.md` § "The commit line"** (`-F - <<'EOF' && git log -1 --format='%H %s'`) | `anchored`. The test parses the document's fenced block, so the document and the parser cannot drift apart. |
| P9 | no `-q`: the `[<branch> <sha>] <subject>` line | `anchored` (unchanged) |

**Canary**: (C1) a store with transcripts but no paired commit call → every act reads `anomaly` 4 `store layout unrecognized`. (C2) subagent transcripts exist and none has a `.meta.json` → the same. (C3) control: an empty or missing store → every act reads `record absent` 4, or `unanchored` for an act declared under `--kiro`. (C4) control: main-session transcripts with paired commit calls and no subagent transcripts → `record absent` 4, and `FAIL` 4 (H3) where a main-session candidate exists. (C5) a run whose acts read the canary sends no act into J and prints one Peter line for the run (2d).

**Unchanged and still green**: H1–H7, H2c, and every `--ci` fixture (F1–F14, F12′, FU1–FU32). `--ci` does not reach the changed code.

**Beyond the 20** (Stacy R1 (b): a rule fitted to the acts it grades must be tested outside them): P8, P9, N1–N13 and C1–C5 are not #445 shapes.

## 4. The module header (store-layout assumptions, written down)

`verify-signing-chain.ts`'s header gains a STORE LAYOUT block naming what `--audit` assumes about the harness store. That way a harness change is diagnosable from the code, and the canary (2b) has a stated referent:
- **the slug rule**: `~/.claude/projects/<git-common-dir parent, [^A-Za-z0-9] → '-'>` (`defaultStore`);
- **main sessions**: `<store>/<session>.jsonl`;
- **subagents**: `<store>/<session>/subagents/agent-<id>.jsonl`, with `agent-<id>.meta.json` (`agentType`, `model`, `spawnDepth`, `toolUseId`). `agent-<id>.prefix.json` is also present and is not read;
- **block fields**: `message.content[]` with `tool_use {id, input.command}`, `tool_result {tool_use_id, content}`, and the `attachment` `prompt_snapshot` (`systemPrompt[0]`);
- **observed**: Claude Code **2.1.299** on 2026-10-23 (the `version` field of #445's seat transcripts). The facts were first verified 2026-09-30, version not recorded.
- **`is_error` is never law.** It is not read for success evidence, which stays the closed set.

## 5. Application (one PR, Peter-merged, after the trigger's start condition)

1. **Record-first**: this file's Status reads `RATIFIED (Peter, <date>)`, committed before any site.
2. **Signing-act ballot § 4.3 and § 5.4**: 2a's sentence, 2b's bullet, 2c's pointer and 2d's sentence (with § 5.4's own dated pointer), exactly as written.
3. **Same file, § Errata**: one line, `§ 4.3: the candidate is the first SHA printed after a proven commit, any line shape, with C's subject from the result or that commit's own message; the store-shape canary added, and in § 5.4 it does not widen (ballot 2026-10-23-link4-candidate-first-sha-after-commit; RATIFIED <date> — Peter, <channel>: "<words>"; drafted under Peter, 2026-10-23, "Proceed with the joint recommendation. 445 and 446 are merged").`
4. **`verify-signing-chain.ts`**: `candidateLines` takes the call's input subject (first `-m` value, or first `-F -` heredoc line) and reads the first SHA token of the result; `indexCandidates` passes it; `runAudit` applies the canary and prints its single Peter line per run; § 4's header block is added. **The tests (§ 3)** go in the audit test. The `--ci` suite is re-run unchanged.
5. **`governance/signing-seat-brief.md`**: S10's sentence on other formats ("read `record absent` under § 4.3 as it stands …") becomes the amended reading. § "The commit line"'s fixture sentence and the "Fixture" bullet under § "Keeping this document true" move to present tense, naming the test. The S10 row's law-clause cell cites the amended § 4.3.
6. **`governance/classification-map.md`, row `signing-act-consistency`**: the `--audit` scope comment's `LOOKUP RULE` sentence is replaced with 2a's text in the comment's own register. One history line: `{ date: <application date>, change: "§ 4.3 amended: a candidate is the bracket line, or the first SHA printed after a proven commit in the same call (any line shape), prefixing C's SHA, with C's exact subject from the result or from that commit's own first -m / -F - line; store-shape canary (anomaly 4, store layout unrecognized), which sends no act into J and reaches Peter once per run (§ 5.4); a git log is required; success-evidence set and outcomes unchanged (ballot 2026-10-23-link4-candidate-first-sha-after-commit); checks and check_state unchanged", by: thurgood }`.
7. **Lock refresh**: sites 5–6 move `canonical/generated.lock`'s `inputClosure`. Regenerate, commit, and paste `npm run check:122:diff-guard`'s output with its `operative-set-freshness` line. It should read PASS with stale 0; anything else stops the application and is reported.
8. **Census re-run** (README "Re-runs"): `npx tsx tools/agent-generator/regrounding/verify-signing-chain.ts --census-routed` at the PR's base and at its head. The two digests must be equal; if they differ, the PR stops and reports.
9. **The re-read of #445's 20 acts** (R2, Stacy R1 A7). It runs **after the application PR merges**, at the merged tool SHA, never inside that PR. It is appended, never written over, and both re-reads land before 2027-04-21.
   - **Where.** If a RELEASE claims-pass record carrying `record absent 20` is committed by then, the re-read is appended there. Otherwise it is appended to `.kiro/issues/2026-10-23-audit-link4-rejects-sha-alone-commit-line.md` (beside § 3), and the next RELEASE pass carries both lines.
   - **Stacy** runs `--audit --pr 445 --exclude-signer stacy` and appends `re-read under § 4.3 as amended <date> (ballot 2026-10-23-link4-candidate-first-sha-after-commit) @ <tool sha>`, with one verdict line per act. The original line stays (the 123 midpoint pass's Pre-R / Post-R precedent).
   - **The delegate** re-reads the Stacy-signed act (`4c0f6977b`) under § 5.3: `--audit --pr 445 --signer stacy`. The seat is the next in § 5.3's rotation (Ada, Lina, Leonardo) after the last walk's delegate line. Its file is `delegate-audit-link4-reread-<seat>.md`, beside the record that carries Stacy's lines, committed under its own `Agent:` trailer. Stacy's count line goes with it. Her hand-read does not count (Stacy R1 (d)).
   - "Anchors" is a prediction: links 5–7 have never run on these acts, so a `FAIL` is possible and is recorded as found.
10. **Close the record**, at the re-read, not at the application merge. In the same PR as the re-read when it lands in the record; otherwise in the record PR that follows the RELEASE record's commit. Rule 5's dated outcome line, naming both re-read commits, then `git mv` to `archive/`.
11. **Straggler sweep**: `git grep -n -i "first .git log. line"` → only the signing-act ballot's § 9 fold-back line (history, kept) and the record's §§ 1, 4 (a ledger, kept). `git grep -c "2026-10-23-link4-candidate-first-sha-after-commit"` → 2 in the signing-act ballot (the pointer and the Errata line), 1 in the register, and at least 1 in `governance/signing-seat-brief.md`.

## 6. Recommendation, counter-argument (fold-back applied), residual

**I recommend § 2.** It is the narrowest text that reads the shapes seats actually produce while keeping link 4 a creation event: the first SHA after a proven commit, bound to C's subject.

**The counter-argument (Thurgood R1, surviving): tolerance plus a template pays twice.** Once the parser tolerates the shape, nothing fails when the template's print line drifts, and each widening chases the last miss. The gain is anchors on an audit that never gates.

**What fold-back changed.**
- The conforming line is now the test's fixture (P8), read from the served document. The template cannot drift without the test reading it.
- The tolerance is bounded by position (the first SHA) and by the subject. It is not "a SHA anywhere in the result", which would have turned a later `log -3` or a push line into creation evidence (Stacy R1 (a)).
- The canary makes the next harness change loud instead of a silent `record absent` population.
- The fixtures reach beyond the 20 (Stacy R1 (b)).

**What survives.**
1. **The audit stops pressing on the brief's format.** A brief that drops the convention now anchors anyway, provided the seat's form shows a SHA then the subject, or the subject in `-m`. The brief-side fix (the served document plus the early audit) carries that pressure instead, and both are practice, not law.
2. **The rule is shaped by its first failure.** The fixtures beyond the 20 narrow this; they do not remove it.
3. **The input route reads shell text.** A message built from a variable (`-m "$MSG"`), a `$(…)` substitution, or quoting the reader does not parse yields no subject. That reads `record absent`, the safe direction, but it is a new surface the harness does not own.
4. **The value is small.** No consumer reads these anchors, and `--audit` is never a gate. The return is 20 acts made auditable before their transcripts expire, plus a parser that reads the shapes seats use.

5. **The served document becomes a test input** (Stacy R1, census residual). From application, the audit test reads `governance/signing-seat-brief.md` (P8). A later census of `verify-signing-chain` must count it.

**Fork**: none open. Peter's "Proceed" picked amend-after-129 over keep-strict, and the canary's widening (2d) is not a fork: Stacy and I read it the same way.

## 7. Cost

- **At application**: about 40 lines in `candidateLines` / `indexCandidates` / `runAudit` plus the header block; about 25 test cases; the § 4.3 sentence, one bullet, the pointer and the Errata line; the document and register edits; the lock refresh. One PR, one build session, and Stacy's fixture confirmation at R1.
- **The re-read**: one `--audit` run (seconds), Stacy's appended lines, and the delegate's line for one Stacy-signed act.
- **No re-sign**: no row's hash moves.

## 8. Review round record

#### [STACY R1] — 2026-10-23

**Verdict: ASSENT with A-items (A1–A8).** § 2a is the jointly agreed narrow form, with one narrowing beyond it (A6), which I accept once it is stated and tested. No `[@STACY]` mention appears in either consult note, so there is nothing to answer first.

**Grammar** (ballots README § "Conventions"): Status DRAFT ✓ · Required reviewer ✓ · Class LAW ✓ · Census ✓ (below) · Trigger ✓ (below) · Peter's words verbatim ✓ (header; record § 6).

**The rule against the agreed form** (consult R2: Thurgood item 1, Stacy item 1; record § 6 item 3). Each element matches: (ii) is the first SHA in the call's result, in any line shape; it must prefix C; C's exact subject comes from the rest of that line or the next non-empty line, or from the first `git commit` invocation's first `-m` value or first `-F -` heredoc line; nothing else in the command is read. The success-evidence set and the outcomes are unchanged. "First SHA in the result", in place of my R1's "first SHA after the commit", is the implementable reading: a result does not mark where each command's output starts, and output printed before the commit can only push C out of first place (§ 2, last bullet). The current code already reads the whole result (`candidateLines`, `hex.slice(0, 1)`). "One per pass, where the call loops" is carried from the ratified text.

- **A1 — the canary's second condition is vacuously true on a store with no subagent transcripts.** "No subagent transcript has its `.meta.json` record" fires on a store with zero subagent transcripts, and then every act reads `anomaly` where today, honestly, it reads `record absent`. C2 tests the intended case ("subagent transcripts with no `.meta.json`"). Make the text match C2: "subagent transcripts exist and none has its `.meta.json` record". Add **C4**: a store with main-session transcripts and paired commit calls, but no subagent transcripts → reads as today (`record absent` 4; H3 where a main-session candidate exists).
- **A2 — C3 must name its verdict.** "Reads as today" stops being checkable once the code changes. An empty or missing store yields no candidates (`listTranscripts` returns none), so C3 must read `record absent` 4 on every act, or `unanchored` for an act declared under `--kiro`.
- **A3 — say how the canary meets § 5.4 and § 5.3.** As written, a layout change makes every act in the population `anomaly`. Under § 5.4 that sends every seat's acts into J, and under § 5.3 every Stacy-signed act goes to Peter as its own `**Open for Peter**:` line. My read: a store-layout anomaly is evidence about the instrument, not about any seat, so it should not widen, and on Stacy-signed acts it should reach Peter as one line per run. That reaches § 5.4's text, so it would add one edit site. If Thurgood reads it the other way (widening as for any anomaly: loud, and Peter's time), that is a fork for Peter. Either way, 2b must say which.
- **A4 — define "token" and test the safe-direction claim.** "Standing alone as a token" needs a stated boundary. I propose: a run of 7–40 lowercase hex characters bounded by whitespace or the line's ends. Under that boundary, push's `a1b2c3d..e4f5a6b` is not a token, and the bracket line stays route (i). § 2's last bullet ("it can only push C out of first place") has no fixture. Add:
  - **N10**: `git commit -q -m S && git push && git log -1 --format='%h%n%b'`, where the push prints `old..C` before the log → `anchored` (input route; the push line is not a token);
  - **N11**: a hex token printed before the log in the same call (for example `git rev-parse HEAD~1 && git commit -q -m S && git log -1 --format='%H %s'`) → `record absent`.
- **A5 — the input route must be tested against the two threats link 4 exists for.** The input route can bind a subject to a SHA that today would read `record absent`, so the attack shapes need it too:
  - **N12** (H3 through the input route): the main session commits C with `-q -m S -m "Agent: kenya" && git log -1 --format=%h` → `FAIL` 4 (H3). Today this form reads `record absent`; after the change it must read `FAIL`.
  - **N4** split into (a) as written, and (b) the input-route H2b: a primary's quiet commit C has subject S, and the seat then runs `git commit -q -m S …; git log -1 --format=%h`, printing C's SHA alone → `anomaly`, never `anchored`. The input route never anchors an unproven call.
- **A6 — (ii) requires a `git log`, which is narrower than the ruled text.** Record § 6 item 3 reads "the first sha printed after a successful `git commit` in the same call's result, in any line shape". I accept the narrowing: success evidence (b) needs a `git log` in any case, so a log-less call can never anchor, and the only difference is `record absent` (today's reading) instead of `anomaly`. State it under "What does not change", and add **N13**: `git commit -q -m S && git rev-parse HEAD` → `record absent`.
- **A7 — § 5 step 9: when the re-read runs, and where it lands.**
  - **When.** The application PR changes `verify-signing-chain.ts`, which is an instrument path, so my ARMING row reads it after merge, never before. The re-read is an audit verdict, so it runs after the merge too, at the merged tool SHA, and not inside the application PR.
  - **Where.** "The claims-pass record that carries `record absent 20`" does not exist yet: today the line lives only in the record (§ 3) and in this ballot. Name both orders. If the RELEASE record carrying the line is committed by then, append there. Otherwise append to the issue record, and the next RELEASE pass carries both lines.
  - **Close event.** In the second order, the record closes at the re-read's commit, not at the application merge. Its Trigger is Thurgood's to re-rule (rule 9). I have appended a dated line to the record.
  - **The delegate.** Name the seat (the next in rotation after the last walk's delegate line, § 5.3) and its file name (`delegate-audit-link4-reread-<seat>.md`, beside the record that carries my lines).
  - **Deadline.** Both re-reads land before 2027-04-21, the retention edge. They cannot wait for the next walk.
- **A8 — step 3's Errata line cites the ratification.** As drafted, it cites only the drafting authority ("Proceed with the joint recommendation"). The errata precedent cites the ratifying words and their date (§ Errata, 2026-10-21 line). Add `RATIFIED <date> — Peter, <channel>: "<words>"`.

**Fixtures as listed** (§ 3), against my R1 and Thurgood R2: N1–N6 are mine and N7–N9 are his R2, with N6 widened to "neither result nor input", as he required ✓. P1–P7 are the seven #445 forms, Lina's P7 by the input route ✓. P8 is the brief's conforming line, parsed from the document ✓. P9 is the bracket line ✓. C1–C3 are the canary (A1, A2). Beyond the 20: P8, P9, N1–N13 and C1–C4.

**Census** (reader's read, README § "Conventions"). All three lines are in grammar (`not in scope — <instrument> — <why>`), and all three in-scope calls are right; there is no census form to reproduce.
- **verify-signing-chain**: `candidateLines` is called only from `indexCandidates` (L1197), which is called only from `runAudit` (L1352), reached only from the `--audit` CLI (L1695). `--census-routed` prints `freshness.ts` `routedCensus`. The register's `harness links 4-7` scope entry reads `check_state: none`, `checks: []`.
- **check-section-citations** and **122-diff-guard**: they match the trigger ballot's A1 precedent for a `governance/` edit site.
- **Residual**: from application, the audit test reads `governance/signing-seat-brief.md` (P8). The doc becomes a test input, by design, and a later census must consider it.

**Trigger** (the record's line, mirrored in this ballot's header): lawful under rule 1 as applied by #444. The event is this measure's own application PR, which is an event and not a ride (trigger ballot § 7, "a record's own fix is an event, not a ride"). It is P2 `(record)`, so `manual` is open to it (only a P1 consumer-blocking record is barred). The start condition and the deadline are prose. The retention arithmetic holds: #445's seat commits are dated 2026-10-23 between 02:26 and 02:43 −04:00, and 180 days later is 2027-04-21. **Residual**: a `manual` record never reaches a firing event, so it never lapses or escalates. The 2027-02-21 walk read is the only check, and missing it costs only the 20 anchors, while the honest `record absent` stands.

**Application plan**: appended, never rewritten ✓. My own act goes to the delegate, and my hand-read never counts ✓. "Anchors" is stated as a prediction ✓. A7 governs the order.

**Counter-argument and residual** (§ 6): I hold Thurgood's surviving point 1 as the strongest. The audit stops pressing on the brief's format, and the brief-side pressure that replaces it is practice. A5 adds no pressure back; it only keeps the new route from opening the two threats.

The A-items are law-text and fixture items, for Thurgood to weave. I specify the fixtures, and he builds them (§ 4.5).

#### [THURGOOD R2] — 2026-10-23

All eight A-items are folded into the text above, none forked. There is no `[@THURGOOD]` mention to answer.
- **A1** → 2b: the second condition reads "subagent transcripts exist and none has its `.meta.json` record". Stores with no transcripts, or with main-session transcripts only, read as before. **C4** added.
- **A2** → C3 names its verdict: `record absent` 4, or `unanchored` under `--kiro`.
- **A3** → new **2d**, a § 5.4 sentence: the canary sends no act into J and reaches Peter once per run, in place of § 5.3's per-act line. **My position is yours**, with the reason stated in 2d (no weaker than today's `record absent`, and louder). No fork. **C5** added. The header's Amends line and step 2 name § 5.4.
- **A4** → 2a's boundary is whitespace or the line's ends. **N10** and **N11** added.
- **A5** → **N12** (input-route H3 → `FAIL` 4) and **N4b** (input-route H2b → `anomaly`); N4 is now N4a.
- **A6** → "A `git log` is required", stated under "What does not change" against the record's summary. **N13** added.
- **A7** → step 9 now covers when (after the merge, at the merged tool SHA), where (both orders), the delegate (seat by § 5.3 rotation; file `delegate-audit-link4-reread-<seat>.md`) and the deadline (both re-reads before 2027-04-21). Step 10 closes the record at the re-read. The header's Application trigger and the record's Trigger line are re-ruled to match (rule 9: the record is mine).
- **A8** → step 3's Errata line cites `RATIFIED <date> — Peter, <channel>: "<words>"` alongside the drafting words.
- **Census residual** → § 6 residual 5.

