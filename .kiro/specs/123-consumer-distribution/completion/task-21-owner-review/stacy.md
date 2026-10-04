# Stacy — owner confirmation, Task 21 starter specs (process parts)
Read at branch task/123-u3-onboarding @ ea348aa76. Read-only; nothing in the repo touched.
Marks: VERIFIED (read/run at the cited line) / UNVERIFIED.

## A. `src/cli/templates/starter-specs/ci-needs/tasks.md` — CONFIRMED-WITH-CORRECTIONS

Lens, per task (instrument; what red looks like):
- T1 Inventory: instrument = a CI record in `notes.md`; red = no record, or none and no choice made. OK.
- T2 Decide: instrument = one decision row per need in `notes.md`, price line quoted; red = a missing row or an unquoted price. OK. (Minor: N1's "Applies when" can make a need not apply; "adopt or skip" with the price quoted still covers it. Leave.)
- T3 Implement: red = a check whose command differs from the need's **Check**. OK.
- T4 Gate: **GAP.** "A red check must block the merge" names no instrument. Nothing in T4, T5 or T6 asks for a record of what makes the check blocking (a required-check setting or equivalent). T5 asks for "a link or a log excerpt" of the runs, and a run link shows red, not that the merge was blocked. As written, "the merge is blocked" is decidable only by the author's say-so.
- T5 Arm: **GAP.** "confirm the check goes red" is satisfied by ANY red (a mistyped workflow file goes red too). The red has to be red for the failure the recipe introduced (N1: the output diff; N2: `sync` prints `components now expect token '--space-grouped-normal'`; N3: `Tests: 1 failed`; N4: "1 broken reference found"; all four strings are in `.kiro/specs/123-consumer-distribution/completion/task-21-1-completion.md`, the bite table). Without that, T5's red run is a presence-of-a-red check.
- T6 Close: **GAP.** "Check it against the runs before you call the spec done" is the author auditing their own claim and leaves no record of the result. A summary whose links show no red/green is red here, but nothing says where that is written.

Replacement text (exact, minimal):

T4, replace: `A red check must block the merge, not only report.`
with: `A red check must block the merge, not only report. Record in `notes.md` what makes it block (for example the required-check setting), by name.`

T5, replace the last paragraph `Record the red and green runs (a link or a log excerpt) in `notes.md`. A need whose check did not go red is not done.`
with: `Record the red and green runs (a link or a log excerpt) in `notes.md`. The red run must show the failure you introduced, not some other failure, and the record must show the merge was blocked. A need whose check did not go red for that reason is not done.`

T6, replace: `That summary is the claim this spec makes. Check it against the runs before you call the spec done.`
with: `That summary is the claim this spec makes. Before you call the spec done, have a session other than the one that built the checks (Stacy, if you use her) open each run it links and write in `notes.md` which rows matched the runs and which did not.`

Counter-argument (folded): the T6 change adds a second session to a newcomer's first spec. It is one read, not a gate (nothing blocks a merge on it), and an author checking their own claim is exactly the thing the starter spec exists to avoid teaching. Residual: a solo founder with one agent session will skip it; if Peter/Leonardo judge the cost too high for the audience, keep T4/T5 and soften T6 to "...write in notes.md which rows you opened the run for" — the fork is theirs, not mine to pick.

Source checks on claims in this file:
- "`npx designerpunk init` placed this spec in your repo": UNVERIFIED as shipped. `src/cli/init.ts` has no `specs/` scaffold or starter-specs reference at this commit (grep: only three `@see` design lines); Task 21.3 (Lina) builds it. Thurgood's ledger already marks it DESIGN-ONLY. Not a defect, a dependency: the sentence is false until 21.3 lands.
- "needs.md beside this file" / "notes.md beside this file": VERIFIED present (`needs.md` in the directory; `notes.md` is consumer-written).
- The bite-recipe strings above: VERIFIED-as-recorded in Thurgood's ledger (his scratch-born-repo runs); I did not re-run them (UNVERIFIED by me).

## B. `regrounding/tasks.md` task 6 and task 5 — task 6 NOT-CONFIRMED as written; task 5 CONFIRMED

### Task 6 — defects (all are one root: the audit object is unnamed)

1. **Closed negative form is not the ratified string.** Req 24.1b says the closed form is `not exercised — upstream beat produced no artifact` (`.kiro/specs/123-consumer-distribution/requirements.md:830`; `tasks.md:1528` repeats it). The starter spec writes `not exercised — no spec was produced` (`regrounding/tasks.md:34`), and `scripts/__tests__/starter-specs.test.ts:204` asserts the starter's string, so the test would stay green while the string diverges from the one U5's beat 2 and my own record are read against. A "closed" form with two spellings is not closed. Fix both sites to the ratified string.
2. **"the formalized spec's completion claims" refers to nothing a born repo contains.** Task 4 formalizes (outline, requirements, design, tasks); no task executes the new spec, so no completion doc exists. The claim a consumer-Stacy can audit is Thurgood's claim to have done tasks 3–5. Req 24.1b says beat 1 "produces a completion claim"; the starter spec never says which artifact that is.
3. **Order.** Task 6 runs "After task 4" and records in `specs/regrounding/report.md`, which task 5 creates. If Stacy goes first, the file does not exist; if both write it, one overwrites the other. Task 6 must follow task 5.
4. **Approval is un-checkable.** Task 4 says "with your human's approval at each step". Nothing records approval anywhere a verifier can read, so it can only be reported as claimed, not shipped.
5. **No method line.** My charter's closed negative for unchecked rows is `not re-verified — toolchain unavailable`; that string is for a platform I cannot build, and does not fit here. What a consumer-Stacy needs instead is to state which rows she opened, out of how many; the fraction is the detector of a ritual pass. Nothing in task 6 asks for it.

What a consumer-Stacy can do with what a born repo contains (VERIFIED, my consumer rendering `canonical/_consumer-output/cc/.claude/agents/stacy.md`): read `specs/**`, run `git log --first-parent` and `git show <merge>:<path>` (`stacy.md:164-ish`, the "Git history is half of what a claims audit reads" paragraph), run `ls`/`grep`, and write under `specs/**`. She **cannot** run the owed-set query: it needs `docs/claims-pass-adoption.md` with a `^Adopted: ` line, and the query exits `FATAL` without it (rendered charter, owed-set block, `ADOPTION=docs/claims-pass-adoption.md`). A born repo has no such file; no template or init path creates it (grep of the repo found no producer). Task 6 does not depend on the query, so this does not block task 6. UNVERIFIED whether any other starter surface should create it; flagged for Thurgood/Peter as a seam in the consumer charter, outside this task.

Replacement text, task 6 (exact):

`- [ ] 6. **Verify the formalization's claims (Stacy).** After tasks 4 and 5, Stacy, not Thurgood, checks what Thurgood claims to have produced against what exists. **Promised**: task 4 above and `specs/README.md`. **Claimed**: Thurgood's rows in `specs/regrounding/report.md` for tasks 3 and 4, and any record under `specs/<name>/`. **Shipped**: the files in `specs/<name>/` and the repo's git history (`git log --first-parent -- specs/`). For each artifact the claims name, she confirms it exists and says what it contains. She says how many claims she opened, out of how many; a claim she could not check is recorded as not checked, never as passed. The human's approvals are shipped only if the repo records them, otherwise she records them as claimed. She writes her result in `specs/regrounding/report.md` under her own heading. If task 4 produced no spec, she records "not exercised — upstream beat produced no artifact", and never a pass or a fail.`

And in `scripts/__tests__/starter-specs.test.ts:204`, the matcher becomes `/not exercised — upstream beat produced no artifact/` (Thurgood's file; I do not edit it).

Counter-argument (folded): the replacement lengthens task 6 and prescribes method, which could be read as me writing Thurgood's standard. It prescribes only what Stacy herself does (my charter, "Claims-pass record: Method"), not what a completion record must contain; "what must it contain" stays `specs/README.md` (Thurgood's task 3). Residual: "a claim she could not check is recorded as not checked" is a second negative spelling next to the ratified one; the closed-vocabulary rule in my charter closes only the platform string, so I judge this acceptable, but Thurgood may prefer to fix the spelling in `specs/README.md`.

### "Report of what did not transfer" (task 5) — CONFIRMED
Instrument: `specs/regrounding/report.md`; red = a charter item from task 1 with no row, a row with no disposition from the closed set, or no closing line. Decidable without the author. The one-row-per-item count is checkable against task 1's list. No correction. (Note for the author, not a correction: the closing line "whether he could do his job here" is self-assessment; the audit of it is task 6, which now follows 5.)

## Summary
- CI-needs tasks.md: CONFIRMED-WITH-CORRECTIONS (T4, T5, T6 text above).
- regrounding task 6: NOT-CONFIRMED as written; corrected text above. Task 5: CONFIRMED.
- Standards implications: none for DesignerPunk's docs; one seam to route to Thurgood: no producer for `docs/claims-pass-adoption.md` in a born repo.
