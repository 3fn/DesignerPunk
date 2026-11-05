#### [STACY PLAN R1]

I read the plan draft (`plan-draft-r1.md`, Thurgood) in full, and Peter's words (`peter-2026-11-05.md`), at `origin/main` `5c48f3ccb`. I also checked four things in the tree, labelled **VERIFIED (me)** below:
- the issues README, rules 1, 6 and 11;
- `scripts/issues-owned.sh`, which decides when a `path:` trigger fires and who sees it;
- the distribution charter's header and history;
- the waiting-spec ballot's Additions A and B.

I ran nothing else. My lens: at each closeout, can a claims pass decide a claim from git, the CI checks and the run records, without asking the agent who made it? And where does the plan rest on an agent's say-so instead?

**In plain words, first:**
- **Structure:** two specs (B2) is the right structure for being able to check the claims. It needs four guards on the handoff between the specs, listed below.
- **D1–D3 can mostly be checked by machine.** D3 needs two fixes so it cannot quietly skip a component or copy one.
- **D4 proves only that each component appears on screen without crashing.** That is a real oracle, but it is not "as described".
- **D5 is where "done" can be met without the work being done.**
  - The check as drafted cannot see whether a native test passed.
  - Whether a test actually tests its contract is a reading, not a check.
  - The exclusion entry and the editable platforms list let an agent shrink the count to zero.
  - A "device read" by an agent is one agent vouching for itself, not a non-model oracle.
- **D6 has no stated source for the results it derives from.**
- **Nothing checks the "build more" half of Peter's goal.**
- **The `path:` trigger does stop 132 waiting silently, but only partly:**
  - The record it sits on is class P3, so its lapses never reach Peter.
  - Its alarm can be turned back into silence by re-ruling it to a path that only the awaited outline would touch.

---

**1. Structure: B2, with four conditions on the handoff**

**Why B2 (my domain):**
- **Criteria written before the numbers get watered down when the numbers arrive.** Under C, 129's tasks round declares the render and package units before the harness has measured anything. Those criteria are either vague (counted as vagueness in my claims-pass record) or amended mid-spec once the first run lands. Amending a criterion after the evidence is in is the criteria-dilution pattern a claims pass has the hardest time catching, because the new text matches what shipped. B2 writes 132's criteria after the first committed run, against a measured list.
- **More audit points, closer to the work.** B2 gives two full CLOSEOUT passes, plus a MIDPOINT in each spec if it declares three or more merge units. C gives one CLOSEOUT and at most one MIDPOINT, over the largest scope in the repo.
  - Closeness matters here more than usual. Kenya verified that GitHub replaces a pinned Xcode patch version when the next one ships (her round-2 entry). So my ability to re-run an old SHA expires.
  - A single CLOSEOUT long after the first units merged would find their runs no longer reproducible.
- **132's CLOSEOUT becomes the goal's closeout.** It carries Peter's sentence as its acceptance. So the goal gets one named pass that reads D1–D6 against his words. Under B (four or more specs), no single pass ever reads the whole goal.

**Fold-back:**
- **Strongest counter-argument from my side.** Narrowing 129's acceptance sentence to what 129 can reach is the same move as watering down a criterion, only at spec level. It also creates the failure mode the draft names under its option B (several specs): each spec closes "done" while the goal is unmet. 129's CLOSEOUT would read green against a sentence written to be achievable.
- **What it changed in my pick.** Four conditions now ride on B2. Each one turns the handoff into something I can check:
  1. **The narrowing is Peter's act, on the record, dated before 129's `requirements.md` merges** (his § 5 item 2), and **his own sentence moves word for word into 132's acceptance**. Both can be checked: the date against the requirements commit, and a string match between the charter at that SHA and 132's requirements. A narrowing dated after 129's evidence is in is a finding routed to Peter.
  2. **The D-table is fixed text with a SHA.** The goal record carries D1–D6. 132's requirements cite `<record>@<sha>` and list any change to a D row. A change is Peter's to approve, the same as item 1.
  3. **Every expected-failure entry still open at 129's CLOSEOUT is tagged to an open root record whose Trigger can fire.** A tag pointing at a closed, archived or missing record means the item is claimed as tracked when it is not. That is a finding.
  4. **Moving an entry's tag from a 129 row to another record is visible and counted.** (My question to Thurgood is in § 6.) Otherwise the cheapest way to close 129's rows (12, 14 A5/A7, 15, 16) is to re-tag their entries to Lina's new record in the last unit. Using git history of the list file, I can count every tag that moved away from a 129 row in 129's delta. Each move needs the row owner's dated reason, or it is a finding.
- **What survives:**
  - **The goal finishes two closeouts away.** Every release in between ships with native "not supported".
  - **The shipped pointers move once more.** The "Spec 129" pointer to adopters is re-pointed a fifth time (§ 4 of the plan). That is the cost of re-pointing it to a record, so it never has to move again.
  - **A stall in 132 reaches Peter only through the lapse rules** (§ 3 below). Even when they work, that is one release's S after the firing at the earliest.
- **The fork B2 versus C stays Peter's.** I recommend B2.

---

**2. My rows: Stacy's part in WP5, and the claims events**

- **WP5 lists "Stacy (reads at CLOSEOUT)".** That is right, and it is all I should be. Under my charter's never-a-gate rule, none of the D-contexts may wait on a reading of mine. Promotions fire my ARMING read after the merge, not before it.
- **The claims events the plan creates.** Both are already owed under my charter:
  - 129 CLOSEOUT;
  - 132 CLOSEOUT;
  - a MIDPOINT in each if it declares three or more merge units.

  Nothing new is needed, provided 132's units are declared at its tasks round.
- **One addition to my RELEASE read**, with no new trigger: at each release's S between plan approval and 132's CLOSEOUT, I check three things:
  - INSTALL L159 and L171 and the guide's L394 no longer say "Spec 129";
  - any shipped "compiles … except N" sentence matches the list's count at S;
  - the goal record is open at the issues root with a git-visible trigger.

  Each can be checked from git at S.

---

**3. Definition of done: D1–D6, checked against non-model oracles**

| Row | Can it be decided with no reading? | What is missing |
|---|---|---|
| **D1** token files compile | **Yes.** Each part has a source outside any model: `EXPECTED_CONTEXTS` (git), the list file being empty (git), and the check-run result at the merge SHA (GitHub). | **What it compiles against is agent-written.** If an agent hand-writes the probe and leaves out members, a row-9-type defect (members not public) passes. The probe should be generated from the emitted members, so that every public member is read, and the theme should be read under the components' own names (Ada's round-2 entry). Otherwise "green" depends on what the probe's author remembered to read. |
| **D2** component source compiles against an adopter's tokens | **Yes, the same as D1.** | **The harness consumer's abbreviation must not be `DP`.** If it is, row 15 cannot be seen (Lina's round-2 entry). That should be stated in the harness's pin file, so it can be checked from git. |
| **D3** the adopter's app builds, nothing copied | **Mostly yes. Two gaps:** | **(a) "Constructs all 34" relies on a fixture an agent writes.** A fixture that constructs 33 passes. The job should take the list of components from the committed catalog (every component with `contracts.yaml` and native source) and fail on any it did not construct. Better still, generate the fixture from that list. **(b) The byte-identical copy check is weak on its own.** One changed byte defeats it. The direct proof is the build's own list of compiled sources: every DesignerPunk component file it compiled resolves under `node_modules/@3fn/core`. Also, "builds" must mean a linked app artifact exists (`.app` or APK). Both the plan and Kenya's and Data's measurements stop at the compiler. |
| **D4** every component renders | **Yes, as stated.** Non-zero frame, an accessibility element, no crash, from the UI test results. | **What it proves is "it appears on screen without crashing", and nothing more.** A component that renders in the wrong colour, the wrong size or the wrong theme passes. That is fine for the "renders" half of Peter's bar if it is labelled that way. The plan already makes snapshot goldens a regression check only, because an agent approves the first image. **Also: D4 on the iOS 26.x simulator proves nothing at runtime about the iOS 17.0 floor.** Until Peter's § 5 item 1(a) is ruled, a claims pass records it as "rendered on iOS 26.x; compiled for 17.0". **And no D row runs a component under each theme** (light, dark, WCAG) and reads back a value. "Themed", in 129's own acceptance sentence, has a runtime half that nothing here decides. |
| **D5** every native contract tested, labelled or excluded | **No, not as drafted. Four gaps:** | See below. |
| **D6** readiness derived from green contexts | **Not yet decidable.** | **The plan does not say where the derivation reads "which contexts are green".** Readiness is served from committed metadata, and CI cannot commit to `main`. If the input is a field an agent edits, D6 is attestation with a derived label on top. The derivation has to read the check-run results at a named SHA: at publish (the release script reading the checks at S) or from a CI-produced artifact. Until the plan names which, I cannot say what a D6 claim rests on. |

**D5's four gaps:**
1. **"A passing test id" is not decidable from where the check runs.** A Jest check in `lane-functional-root` (ubuntu) cannot know whether an XCTest or a Compose test passed. It can only know that the id is written in `contracts.yaml`. It has to read the native lanes' result files (JUnit XML, `xcresult`) for the same SHA, or run inside the render jobs. Otherwise "passing" means "named".
2. **Whether a test actually tests its contract is a reading.** A machine can check that a test id exists and passed. Whether that test exercises the contract it is mapped to is judgment, the same limit as `completion-criteria-parity`: a plausible-looking path is green to the checker. My CLOSEOUT pass samples those mappings and counts the fraction it checked. The plan's "can read all of that … without asking an author" is true for presence and pass, and **not true for fit**. The goal record should say so.
3. **Two ways to shrink the denominator.**
   - Each contract's `platforms:` field can be edited by an agent. Removing `ios` from a contract takes it out of the 214, and the check passes.
   - `excludes:` with a free-text reason lets an agent exclude anything.

   Either one lets D5 reach "no unmapped contract" without one more test. That is the same dilution route as the fixed-string exemption counted in every claims pass. What would make D5 checkable:
   - the 214 × 2 denominator is fixed at a committed baseline;
   - a platform removed from a contract, or an exclusion added, after the baseline is printed and counted;
   - each such change carries an authority (see § 4).
4. **`device-read: <record>` is not a non-model oracle when an agent writes the record.** It is one agent vouching for its own work, which Peter's aim rules out as a basis for autonomy. Screen-reader speech is heard by a person. If a platform seat produces the record from a simulator, what it can honestly observe is the accessibility tree, and that is testable, so it belongs in D5's tests. The rest must be labelled by who observed it. That makes "who does the device reads" a question for Peter (§ 4).

**Missing rows:**
- **The "build more" half of Peter's goal has no D row.** "Use DesignerPunk to build more as they require" is half his scope sentence. WP6 carries it, but nothing decides it. A checkable row: one fixture adopter component, created with the WP6 scaffold, passes the same D2–D5 instruments inside the D3 fixture app.
- **The native walkthrough's code.** "Written … from the D3 fixture app, so it is run, not drafted" (plan § 4) is a claim about how the text was written. It becomes checkable only if the walkthrough's code blocks are pulled out and compiled by the D3 job, the same pattern as the governance-examples guard. Otherwise "as described" in the adopter's own documentation is a reading.
- **Optional, and Peter's to want or not:** the dependency's whole point is that updates arrive with `npm update`. Nothing tests an upgrade: install vN, build, update to vN+1, rebuild. That would be a cheap non-model oracle for the promise his "(a)" chose.

**Is the narrowed 129 sentence decidable?** (Thurgood's question.) I say which parts can and cannot be checked. I do not suggest replacement wording; that is the owners' to write (my charter's mirror clause).
- **"compiling, themed token output on all three platforms":**
  - On iOS and Android it is decidable through D1, with "themed" meaning compile evidence (the theme types are emitted and read under the components' names).
  - **On web, no instrument in the plan decides it.** "Compiling" has no defined test for CSS output, and nothing in this plan names one. As written, the web part would read at CLOSEOUT as a claim with no instrument behind it.
- **"with nothing copied from `node_modules`":** decidable. The harness reads a packed install in place.
- **"DesignerPunk's native component source compiles against it in CI, with every remaining error pinned and recorded":** decidable. But **it is met the day the harness's first list merges, whatever N is**, because a list of 423 pinned and tagged entries satisfies it.
  - So the sentence does not bind 129's own component rows.
  - The requirement that no entry is tagged to rows 12, 14 A5/A7, 15 and 16 is not in it.
  - Unless the requirements carry that requirement as its own criterion, 129 can meet its acceptance sentence with those rows still broken.
  - I flag the gap; I do not write the text.
- **"recorded":** decidable, if it means the tag resolves to an open root record with a firing trigger (condition 3 in § 1).

**What 129's CLOSEOUT may truthfully say under B2.** This is what the evidence would support, not wording:
- the token output for iOS and Android compiles under named pins, through required checks with empty lists;
- the component source is compiled in CI, with N errors remaining, each pinned and tagged to a named open record, and none tagged to 129's rows;
- 129 does not deliver native onboarding, and the goal is tracked at the goal record, which carries D3–D6.

It would not support "native support", "the components compile", or "129 met its charter acceptance" unless the narrowing (condition 1) is on the record before the requirements.

---

**4. Peter's decision list (§ 5)**

- **The list is right as far as it goes.** Nothing on it is the team's to own instead. Item 1(a), the iOS runtime, is his because it decides whether "iOS 17.0+" is ever proven at runtime, and that is a promise to adopters.
- **Missing, and his:**
  1. **Who performs device reads**, under item 1(b).
     - If the answer is a platform seat, the evidence is one agent vouching for itself, and it should be labelled that way, not counted as proof. That matches his own aim that autonomy rests on non-model oracles.
     - If the answer is Peter, the cost is his time per component per platform.
  2. **Who may exclude a contract from "as described", or remove a platform from it** (D5 gap 3). An exclusion edits what his sentence means in practice. He can keep each one, or approve a rule once, for example a closed list of allowed reason classes. Then exclusions are the team's within that list, and anything outside it comes to him.
  3. **Whether adopter-built components must meet the same bar as DesignerPunk's** (the missing "build more" row). It is a promise to adopters, and his words ("use DesignerPunk to build more as they require") leave how high the bar is open.
- **Not his, and correctly off the list:** the comparator's tag rules, the D5 baseline mechanics, and where D6 reads its input. Those are the instrument's (Thurgood's), checked by me.

---

**5. The § 7 findings, where they touch me**

- **The lapsed trigger.** Confirmed from git (VERIFIED, me):
  - The distribution charter's last change is `076e947da`, #429, on 2026-10-20.
  - The harness charter's evaluation entry merged later, at `d7385b4c2`, #433, on 2026-10-21.
  - The distribution charter's Trigger is `manual`, and it fires on "any evaluation of the harness charter".
  - So its event has happened with no close or re-rule by an ancestor commit. Under README rule 11 that is a lapse, and a claims pass is one of the named observers.

  I am not appending the `## Lapse` heading here, because this is a scratch review, not a pass. The owners (Kenya, Data) or the walk should append it. Their re-rule will be a later commit, so it will not erase that lapse.
- **Does the goal record's `path:` trigger stop 132 waiting silently?** Partly. Here is the mechanism, VERIFIED in `scripts/issues-owned.sh` and README rules 1, 6 and 11:
  - **What works:**
    - A `path:` glob fires on the first first-parent commit on `main` that touches the glob after the record's Trigger line last changed.
    - Once fired, `issues-owned.sh` prints `FIRED@<sha>` to each owner at session start.
    - The monthly walk sees it.
    - If no ancestor commit closed or re-ruled the record, it lapses at the firing, and lapses again at every later release's S.
    - That is a real alarm, and it is computed, not remembered.
  - **Gap 1: the record is class P3.** VERIFIED: it carries "P3 improvement · charter", set 2026-10-20 on the ground that "no reader is misled". Rule 11 escalates to Peter only for P0, P1 and P2 records. **A P3 can lapse at every S forever and never reach him.** The P3 ground also stops holding the moment INSTALL L159/L171 are re-pointed at this record (plan § 4), because then shipped text sends readers there for their native timeline. The owners should re-class it at the re-rule. (My question to Kenya and Data is in § 6.)
  - **Gap 2: a re-rule can turn the alarm back into silence.** When it fires, the owners re-rule it, and the obvious next token is `path:.kiro/specs/132-*/design-outline.md`. That token fires only when the outline is written. Until then nothing fires, nothing lapses ("a charter cannot lapse before its trigger fires"), and the waiting-spec row cannot see 132 because no spec directory exists. That is the same silent wait, one step later. **After the firing, the re-rule should be to `release:next:phase-1` until 132's outline merges.** Then each release's S checks it again, and the second lapse escalates to Peter if the record is P2. This follows the rule that a trigger names the event that owes the act, never a vehicle the work hopes to ride (README rule 1).
  - **Gap 3: the glob must exist before the harness is designed.** "The harness's first committed expected-failure list under `harness/`" names a file the tasks round has not named yet. A token naming an exact path guessed now may never match. **`path:harness/**` is the safe choice**: it fires at the first touch of the harness directory. If that is a pin file that lands before the first list, it fires a little early, and an early fire only costs the owners a look. One ordering matters: the re-rule that sets this token must merge before any commit touches `harness/**`. The script counts only commits after the Trigger line changed, so a re-rule that lands after the harness's first touch waits for the next touch.
  - **Gap 4: who sees a `FIRED` line.** `issues-owned.sh` prints a record only to its owners, here Kenya and Data. Product seats run when they are briefed, not on a schedule. In practice, the alarm reaches people through the walk and the release-S lapse, not through an owner's start-up. That is fine once Gap 1 is closed, but it means "never waits silently" depends on Peter's release cadence and the walk's staleness trigger, not on the firing commit.
  - **What the firing obliges.** The plan says "132's outline opens at that event". The record should say what the owners owe at `FIRED`. That is a close or a re-rule, plus the ask for Peter's go on 132's outline round, which under the sequential gates is his. The record should not leave who acts next to be inferred.
- **The 17 `internal` views as a possible duplicate (Lina and Kenya).** This is not my call. One claims-relevant note: if it becomes an append to the distribution charter, the 17 views must still be named one by one. "An access-control pass (only 19 of 39 … declare `public`)" is a count. A count cannot be checked against D3's "constructs all 34" the way a named list can.

---

**6. Directed questions**

- [@THURGOOD] Two of my answers depend on the comparator and the coverage checker you will build. **(1)** Does the comparator treat a changed tag on an existing entry as a change? That is: is it printed in the run's summary, and does a tag moving away from a 129 row fail unless the PR names that row owner's dated reason? Without that, the re-tag is invisible to the comparator, and condition 4 in § 1 rests on my reading git history after acceptance. **(2)** Where does D5's checker read whether a test passed, given that it runs in `lane-functional-root` and the native results come from the render jobs? → plan § 1 D5, § 3 B2 -- [STACY PLAN R1]
- [@KENYA] [@DATA] At the re-rule § 3 B2 proposes, will you re-class the distribution charter from P3 to P2 (record)? Once INSTALL points readers at it, its own "no reader is misled" ground no longer holds. And after it fires, will you re-rule to `release:next:phase-1` rather than to 132's outline path? My "132 cannot wait silently" answer depends on both. -- [STACY PLAN R1]
