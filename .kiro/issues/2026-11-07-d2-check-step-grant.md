# Issue: the D2 check's step in `harness-generate` (Spec 129 U8, Task 13), and its grant

**Date**: 2026-11-07
**Owner**: Thurgood
**Class**: P2 obligation (guard) · grant
**Trigger**: `path:.kiro/specs/129-consumer-generation-completeness/completion/task-13-completion.md` — the event that owes the close is U8's merge, which brings that doc to `main`. The close is this record's rule 5 outcome line, giving the fixing PR's `.github/**` diff, its deleted-line count, and the run URL of the step at head H.
**Source**: ballot `.kiro/docs/ballots/2026-11-07-github-grants-are-issue-row-grants.md` § 5, RATIFIED by Peter at 2026-11-07T23:28:57Z ("Re: F-1, All as recommended and ratified", recorded in `.kiro/specs/129-consumer-generation-completeness/evidence/2026-11-07-peter-ruling-github-grants-ballot-ratified.md` and read as F-1 (a) and F-2 (a)). Under F-2 (a), Thurgood holds this grant and writes the step, and Ada writes `scripts/harness/d2-check.ts` and its test. Under the ballot's class rule (Peter's "Re: 2, Class", 2026-11-07T21:56:42Z), a `tasks.md` row never grants a `.github/**` path. Task 13's row had listed this file under its own grant limits, so this record replaces that listing. The plan text is Spec 129 tasks amendment 11 (`tasks.md` Task 13, U8).

---

## The act

Add **one step** to the `harness-generate` job of `.github/workflows/native-harness.yml`. The step runs the D2 check (Req 1.3, with its completeness half, Req 5.10) over the scratch consumer that the job has just built and uploaded.

`harness-generate` is not a required context. But every compile context fails at its "Require harness-generate" step when `harness-generate` did not succeed (Req 2.11), and that includes `harness-android-tokens`, which has been required since #717 (`6572a601e`). So the step adds a way for a required job to fail. It adds no context and changes no count.

---

## The invocation contract

This fixes how the step and the script meet (the ballot's `[ADA R1]` amendment 1, with `[DATA R1]` and `[LINA R1]` the same). Both seats write to it. Task 13 reads this record as it stood at its last activating merge. A change to the contract or to the admitted edits after amendment 11's merge is made in a PR whose body names this record and carries `**ARMING**: at this merge and at the fixing PR's merge`. That PR is merged before either side changes, with Ada's dated agreement line appended here (`[STACY TASKS R9]` Medium-4).

- **Command line**, exactly: `npx tsx scripts/harness/d2-check.ts --consumer "${RUNNER_TEMP}/harness-consumer"`
- **Working directory**: the repository root, `${GITHUB_WORKSPACE}`. The step sets no `working-directory:`, like every other step in the job.
- **Arguments**: `--consumer <root>` only. `<root>` is the directory that "Build the scratch consumer" (`scripts/harness/consumer.ts --out`) built earlier in the same job. Under that root the script reads the consumer's `token-index/components.yaml`, its generated iOS and Android output, and the installed package's shipped definition files. Which files it reads, and how, is Ada's. There is no platform argument: one invocation checks both platforms.
- **Platforms**: iOS and Android. Web is not harvested in 129 (design § 9).
- **Output**: on stdout, exactly three lines, in this order:
  - one beginning `d2-check completeness: ` (Req 5.10);
  - one beginning `d2-check ios: `;
  - one beginning `d2-check android: `.

  Each prefix is followed by `PASS` or `FAIL`. The rest of each line is Ada's: counts, the first missing or extra keys, and so on. On a setup error the script prints instead exactly one line beginning `d2-check: FAIL setup (` and ending `)`.

  Stdout carries these lines and nothing else. All other output goes to stderr: progress, warnings and diagnostics (`[ADA TASKS R6]` item 2).
- **Exit codes**:
  - `0`: all three lines read `PASS`;
  - `1`: any of the three lines reads `FAIL`;
  - `2`: a setup or usage error, such as a consumer root, index, output folder or definition file that is missing or unreadable, or an unknown argument.

  **Precedence** (`[ADA TASKS R6]` item 1):
  - A setup or usage error prints only the setup line, prints no verdict line, and exits 2.
  - Otherwise all three verdict lines print, even when completeness reads `FAIL`, so iOS and Android are still reported.
  - The script catches an uncaught error at its top level and turns it into the setup line with exit 2. So the script never exits silently and never exits 1 with no lines.

  The step reads any other non-zero exit as a failure too.
- **The design rule** (Peter's F-4 ruling, 2026-11-08T00:33:06Z, "Re: 1, as recommended"; `.kiro/specs/129-consumer-generation-completeness/evidence/2026-11-08-peter-rulings-f4-and-u8-go.md`):
  - `d2-check.ts` takes every expected name from the index (`token-index/components.yaml`, including the `platforms.<p>` fields) and works out none itself.
  - It imports nothing from `src/generators/**`, `src/build/**` or `node_modules/@3fn/core`, and it lists none of its own definition files.
  - **A directory walk is allowed; a list is banned.** The walk has one root and one match, both fixed here:
    - **Root**: `node_modules/@3fn/core/dist/components/core/` under the consumer root (the package's compiled `src/components/core/`, since `tsconfig.json` has `rootDir ./src` and `outDir ./dist`). Task 13.1 ships the six files under it, and `pack-assert` asserts each. The script walks the root to its full depth.
    - **Match**: a file whose basename matches `^([^.]+\.)?tokens\.js$`, with no other include or exclude. On `origin/main` the seven `defineComponentTokens` source files all match as their `.ts` form: `Avatar-Base/avatar.tokens.ts`, `Badge-Count-Notification/tokens.ts`, `Badge-Label-Base/tokens.ts`, `Button-Icon/buttonIcon.tokens.ts`, `Button-VerticalList-Item/Button-VerticalList-Item.tokens.ts`, `Input-Checkbox-Base/checkbox-sizing.tokens.ts`, `Input-Radio-Base/radio-sizing.tokens.ts`. So whichever six 13.1 ships are matched; a `.d.ts` or `.map` is not.
    - **The one root literal the grep admits** is the string `node_modules/@3fn/core/dist/components/core/`, once, as the walk root. Any other path under `node_modules/@3fn/core`, and any file name, is a list.
    - Adding or moving a definition file under the root never forces an edit. The grep decides imports and path or name literals only. Whether the code works out a name, or the walk filters to a subset, is a code read at CLOSEOUT, named as judgment.
  - One exception: the completeness half's `component.key` derivation (Req 5.10) is restated as one line of rule in the script.
  - `d2-check.test.ts` carries a grep that fails on any of these: such an import, a path under those roots, or a hard-coded definition-file list. 
- **The floors** (Stacy's, as amended by Kenya):
  1. The falsification cases in `d2-check.test.ts` are append-only: a case is never removed or weakened. They include a Swift case in which a backtick-escaped name must still be matched against the index name.
  2. Each verdict line prints `count=<n>` (Ada's format: `d2-check <ios|android|completeness>: <PASS|FAIL> count=<n> <rest>`), `n` the number of expected names that line compared. `n` is never 0: a line with `count=0` is `FAIL` and exits 1. A count never differs between the base's and the head's scripts on the same consumer (floor 3) unless a spec row admits it.
  3. Floor 3 compares the base's script and the head's script on the same consumer: both run over the one scratch consumer root, and any difference in a verdict or a count is shown in the PR and needs a spec row.
- **The probe-coverage note** (Kenya; Data checked the Android premise). The lane probes already check D2's inclusion half with the compiler: a name in the index that the generated output lacks fails to compile. So D2's set equality adds the extra-name half and the completeness half. What neither sees is a name that is wrong in both the index and the output, because the same generators produce both; the probes catch part of that, not all.
- **After U8's merge** this record expires. The rule for later edits to `d2-check.ts` (no standing holder; a spec row or a per-fix grant; never to the seat holding `src/generators/**` in that unit) goes into the F-4 text of the native-lane ownership ballot and is carried by its application PR.
- **The step's side** (Thurgood):
  - It writes `::notice title=d2-check::<line>` for each `PASS` line, and `::error title=d2-check::<line>` for each `FAIL` line and for the setup line.
  - When the script printed none of these lines, it writes `::error title=d2-check::no d2-check line`.
  - On every run it writes one more `d2-check` annotation, giving the script's exit code and how many of the contract's lines it matched. It is a notice when the step passes and an error when it fails. Logs expire, so this annotation is what Task 13's § "The seam" reads (`[STACY TASKS R9]` Medium-3).
  - It fails when the script exits non-zero, or when any of the three verdict lines is missing or reads `FAIL`.
  - `d2-check` is a new annotation title. `scripts/harness/stability.ts` reads only the four compile contexts, and `harness-generate` is not one of them, so the script reads none of these annotations. The consult that a new title owes under ballot `2026-11-07-thurgood-charter-scope-harness-and-merge-hold` item 1 (`[DATA R1]` D-1) goes to the reader's owner. Here that owner is the step's author.

---

## Grant

**Grant paths**:
- `.github/workflows/native-harness.yml`

Per `.kiro/issues/README.md` rule 8:
- The grant holds on U8's branch only, and expires when U8's PR merges.
- It is activated by Peter's merge of the PR whose body names this record and this path list. That PR is Spec 129 tasks amendment 11's, and its body carries `**ARMING**: at this merge and at the fixing PR's merge`.
- It confers no ratification authority and is additive to Thurgood's charter scope.

**Admitted edits** (nothing else):
1. In the `harness-generate` job only, one new step, placed directly after the "Upload the consumer root" step as the job's last step. It runs the command line above and writes the annotations above. It carries no `working-directory:`, `if:` or `continue-on-error` key.
2. A comment above that step.
3. One added sentence in the file's header comment ("Jobs:" paragraph) naming the step. No existing header line is changed or deleted (`[STACY TASKS R9]` Low-4).

**Excluded acts** (none is admitted here):
- no new job and no new required context;
- no change to `EXPECTED_CONTEXTS` or `EXPECTED_COUNT`;
- no edit to any other job, or to any existing step, `env:`, cache key, runner, permission or trigger, the compile contexts' "Require harness-generate" steps included;
- no deleted line: the fixing PR's `git diff --numstat` deletions for the file are 0, so no `**Deleted lines**:` block is owed;
- no removing or weakening of a step, floor or execution assertion.

---

## Counter-argument and what survives

**The seam.** The step and the script are written by two seats. This record's contract holds the seam down, and Task 13's § "The seam" says which side a red belongs to. A script whose lines drift from the contract turns the step red, which is the loud side. What survives is the two-seat cost Peter accepted under F-2 (a): a contract change costs a record PR before either side moves.

**A D2 red hides the compile verdicts.** When the step is red, every compile context fails at "Require harness-generate". That run then shows no compile verdict, and a required job fails for a reason that is not a compile. Placing the step after the upload keeps the consumer root for diagnosis, but it cannot keep the compile verdicts. A separate job could, but it would add a context, which is excluded here. What survives: D2 is 129's acceptance row (Req 1.3), and Req 2.11 already says that a `harness-generate` failure fails every context. A D2 failure is a failure on the generate side under that rule. A deterministic D2 red is a break for condition 2 on every context in that run, not an infra run, because "Require harness-generate" writes no `harness-infra` annotation. A setup error (exit 2) reads the same way (`[DATA TASKS R6]` fix 2). Whether a generate-side setup fault should ever carry an infra tag is left open. It would need an annotation on the Require step, which this grant does not admit. A flake in the step counts toward the demotion read's attempts-differ signal (`tasks.md` § "Decision 6", step 6 (b)) for every promoted context, the same as a flake anywhere in `harness-generate`.

---

## Agreement

**Ada agrees**: 2026-11-08T00:08:11Z — I agree, as the owner of 13.3, to the invocation contract in this record as it stands at `20a3474b5`: the command line, working directory, argument, three-line stdout, the setup line, exit codes 0, 1 and 2 with their precedence, and stderr for all other output. `scripts/harness/d2-check.ts` and its test will be written to it (`[ADA TASKS R6]` items 1 and 2 are folded in as I worded them).

**Contract change 2026-11-08** (Thurgood): the design rule, the floors and the probe-coverage note were added to the invocation contract under Peter's F-4 ruling (2026-11-08T00:33:06Z, "Re: 1, as recommended"). The PR carries `**ARMING**: at this merge and at the fixing PR's merge`. It merges before 13.3 is written. Ada's dated agreement line is owed below, on the contract as this change leaves it.

**Ada agrees (contract change 2026-11-08)**: 2026-11-08T00:36:40Z — I agree, as the owner of 13.3, to the invocation contract as this change leaves it at `2e75221f2`: the design rule, floors 1 to 3 and the probe-coverage note, and the amended 13.3 criteria in `tasks.md`. I can build each and show it at U8's merge. Three fixings:
1. **Count format.** Each verdict line reads `d2-check <ios|android|completeness>: <PASS|FAIL> count=<n> <rest>`, where `<n>` is a base-10 integer with no separators and no sign, and `<rest>` is mine. For `ios` and `android`, `<n>` is the number of index names that line compared. For `completeness`, it is the number of index entries compared with the definition files. `count=0` always reads `FAIL` and the exit is 1. The setup line carries no count.
2. **Reading the definition files under the design rule.** The completeness half needs the shipped definition files. I read them as text from the installed package under `<root>`, found by walking the package's shipped folder for `*.tokens.*` files, with no import and no fixed file list. I read the rule's "lists none" as banning a hard-coded list, not a directory walk. The test's grep therefore fails on a literal definition-file name or path list, and passes on a walk. If Thurgood reads the rule as banning the walk too, say so before 13.3 starts, because then the completeness half has no way to find its input.
3. **Floor 3 at U8.** The base has no `d2-check.ts`, so the comparison is owed from U8's successors, as the criterion says. U8's completion doc says so.

**Contract change 2026-11-08, second** (Thurgood, folding `[STACY TASKS R12]`): the walk's root and match are fixed; floor 2 aligned to the ruled R-3 wording. Ada's agreement line at `e3886171e` predates both; a fresh line is owed at the last change before the merge. Merge order: the native-lane ownership ballot's PR (#748) merges before this PR, since both cite its evidence record.

**Ada does not agree yet (second contract change, read at `0afa4d8dc`)**: 2026-11-08T00:42:33Z — the walk's root and match are wrong, and I cannot build to them. Everything else in the change I accept, including the count format `count=<n>` and the reconciled grep.
- **What 13.1 ships.** On `task/129-13-component-tier`, `package.json` `files` gains the six definition files as `.ts` **source**: `src/components/core/Avatar-Base/avatar.tokens.ts`, `Badge-Label-Base/tokens.ts`, `Button-Icon/buttonIcon.tokens.ts`, `Button-VerticalList-Item/Button-VerticalList-Item.tokens.ts`, `Input-Checkbox-Base/checkbox-sizing.tokens.ts` and `Input-Radio-Base/radio-sizing.tokens.ts`. `pack-assert` asserts those `src/` paths (`HARVESTABLE_COMPONENT_TOKEN_FILES`). `generate` harvests them as `.ts`, and `loadComponentTokens.ts` matches `tokens.ts` and `*.tokens.ts`. 13.1 ships no `.js` definition file for the six on purpose.
- **Why the dist root is wrong.** `dist/components/core/**/tokens.js` ships only by the general `dist/**/*.js` glob. That includes the seventh file, `Badge-Count-Notification/tokens.js`, a constants object that registers no tokens. A stale local `dist` also holds `.js` files for components with no source now. A walk of the dist root would read compiled output that is not the harvest's input and would match the wrong set.
- **What I will build to instead.**
  - Root: `node_modules/@3fn/core/src/components/core/`, under the consumer root, walked to full depth.
  - Match: basename `^([^.]+\.)?tokens\.ts$`. It matches exactly the six that ship, because the seventh does not ship. It is the same set the harvest reads.
  - The grep's one admitted root literal becomes that string.
  - Everything else in the second contract change stands. A walk-and-match with no list is how I read the design rule.
- **Needed.** Thurgood folds the two-line change, and I append a fresh agreement naming that head. If Thurgood or Stacy hold that the compiled `.js` is the right input, say why: it would also need the seventh file excluded by something other than a list.
