# Ballot Measure: standing owners for the native compile harness's producers after Spec 129 (the per-role split)

**Date**: 2026-11-07 (drafted 2026-11-07T23:28:53Z, `date -u`)
**Drafted by**: Data (Android platform engineer; author of `harness/android/**`, `probe-kotlin.ts` and `parse-kotlin.ts` under Spec 129 Task 4), holding the pen at Peter's direction (§ 1). **Kenya writes the iOS clause** (§ 3 item 2, § 4 sites 3, 4 and 9 (b)), written in her seat at 2026-11-07T23:39:02Z.
**Status**: **DRAFT** — not ratified. No edit site below is applied. A merge of this file's PR ratifies nothing; only Peter's dated words in this Status line do.
**Owner**: Data (items 1 and 3's `android:` half), Kenya (item 2 and 3's `ios:` half), Thurgood (item 4), Ada (item 5 and 3's `consumer:` part). Each seat owns the text of its own charter's edit site.
**Required reviewer**: **Stacy** — mandate: attack the width. She keeps the ARMING read that items 3–5 feed (site 10 is her row), and she is the census reader.
**Consulted seats**: Data, Kenya, Thurgood, Stacy and Ada, in three pre-draft rounds (§ 10). **Lina** is added for the review round **[author's addition — Peter rules]**: § 6 says why.
**Unit**: a standalone record-first ballot on `main`. It names edits to four charters and to `.kiro/steering/Agent-Directory.md`, so **Peter merges it** under the governance carve-out. Application follows ratification, in its own PR (§ 4 site 12).
**Class**: LAW. Every item changes a seat's write scope.
**Amends**: `canonical/agents/data.md`, `kenya.md`, `ada.md` and `thurgood.md` (frontmatter `writeScope` and § "In Scope"); `.kiro/steering/Agent-Directory.md`, four **Owns** lines; ballot `2026-11-07-thurgood-charter-scope-harness-and-merge-hold` (item 1's Excluded list and § 7's closing paragraph, by ledger line); and, in her seat and at her ruling, Stacy's ARMING row.
**Deadline**: ratified and applied before Spec 129's U12 merges, in the order § 5 gives.
**Base**: `main` at `f28a1fefd`. Every before-text below is quoted from that tree, except Thurgood's (site 8) and the Agent-Directory Thurgood line (site 9 (d)), which are quoted from the after-text of the ratified charter-scope ballot's sites 3 and 4, not yet applied.

> ## Conflict of interest — stated first
>
> **The author is widening his own charter, and drafting text for three other seats' charters.**
> - (1) This disclosure.
> - (2) Peter's ruled words are transcribed verbatim (§ 1).
> - (3) Every element the author adds beyond them is marked **[author's addition — Peter rules]**.
> - (4) Every path is listed by name. There is no `scripts/harness/**` or `harness/**` umbrella.
> - (5) Each seat confirms its own site's text in the review round. Kenya writes hers. Ada and Thurgood may replace the author's wording for theirs.

---

## 1. Authority to draft (Peter's words, verbatim)

From `.kiro/specs/129-consumer-generation-completeness/evidence/2026-11-07-peter-rulings-native-lane-ownership.md` (`218e29929`). The orchestrator recorded both messages with `date -u` at receipt. The paraphrase of what each answered is the orchestrator's; only the quoted words are Peter's.

- **2026-11-07T23:17:52Z**:
  > Re: press settings and `consumer.ts`, Inform to leans to the relevant agents to better inform the lean if necessary
  > Re: Thurgood owning, I can confirm "no" and we can pursue the class option?
- **2026-11-07T23:23:23Z**:
  > Re: 1, Both approved as recommended
  > Re: 2, 744 is merged
  > Re: 3, Looks like some checks failed

**What those words ruled, as the record states it:**
- **Thurgood does not own every producer.**
- **The class option, the per-role split, goes into one ballot:**
  - Data and Kenya each hold standing scope over their own platform's lane files (`harness/<platform>/**` and their `probe-*`/`parse-*` pieces);
  - `scripts/harness/compare.ts` goes to Thurgood, with Data and Kenya reviewing;
  - `native-harness.yml` gets a grant per fix, per the `.github/**` grants ballot (#745);
  - no seat holds standing write over `harness/expected/**`; it changes only under a spec row or an issue-row grant;
  - the producer paths join Stacy's ARMING instrument-path read;
  - Data holds the pen, and Kenya writes the iOS clause;
  - sequence: after #745 and after the charter-scope application PR, in place before U12 merges. Android activates at U12's merge, and iOS at the merge of the first iOS promotion.
- **"Both approved as recommended"** approves the two leans the five seats tested in round 3:
  - **`harness/pins.yaml`, option (b)**: each platform seat holds its own section only (`ios:` Kenya, `android:` Data), under five conditions (item 3), and the `consumer:` section gets an owner in this ballot;
  - **`scripts/harness/consumer.ts`, option (a)**: Ada holds standing scope, under six conditions (item 5).
- **"744 is merged"**: the charter-scope ballot (`f28a1fefd`) is merged; its application PR follows.

**Earlier direction on the same question**: 2026-11-07T22:30:08Z, *"Let's do the consultation first"* (`evidence/2026-11-07-peter-rulings-charter-ballot-and-ripple.md`).

---

## 2. The gap

- **Who writes the producers today.** The native lanes' producer code is in no seat's standing write scope. Checked over every `canonical/agents/*.md` `writeScope` at `f28a1fefd`: none names `harness/` or `scripts/harness/compare.ts`, `consumer.ts`, `probe-*` or `parse-*`. Data's and Kenya's scopes are `.kiro/specs/**`, `docs/specs/**` and `.kiro/issues/**` (data.md L240–245, kenya.md L238–243). Spec 129's tasks-row grants cover each file unit by unit, and they end at U12, 129's closeout (`tasks.md` L106, Task 18).
- **The exposure is a required check.** `harness-android-tokens` is in `EXPECTED_CONTEXTS` (`tools/agent-generator/verify-gate-registration.sh` L95; `EXPECTED_COUNT=21`, L98). A red there blocks every PR. iOS gets the same exposure at its first promotion.
- **Breaks come from outside the repository.** Each one is verified at `f28a1fefd` except where marked:
  - **Android, the JDK.** The job runs Gradle on the image's default JDK, `JAVA_HOME_17_X64` (`harness/pins.yaml` L94–96), and `java.version: "17.0.21"` is in the toolchain match (L107). The comparator fails a context on any toolchain field that differs (`compare.ts` L736–750). So an image update alone can turn the required context red, with no PR author at fault (`[DATA R3]`). How often the image moves the JDK patch is not verified.
  - **Android, the resolve classifier.** `REGISTRY_HOSTS` (`harness/android/lane.ts` L444) decides which resolve failures are infra. A new registry host or failure text needs a code change there.
  - **iOS, the Xcode folder.** `harness/ios/lane.ts` L656 stops with `toolchain missing` when the pinned `/Applications/Xcode_26.6.app` is not on the runner. Kenya's reading that GitHub's macOS images drop Xcode minors every few months is from training, not checked (`[KENYA]` R1).
  - **Every context, the driver.** All four contexts `needs: harness-generate` (`native-harness.yml` L93, L160, L231, L345) and fail when it fails (`[ADA]` cross-read). `harness-generate` runs `scripts/harness/consumer.ts`, which runs the CLI's `pack`, `init` and `generate`.
  - **Every context, the comparator.** `compare.ts` decides every verdict (`harness-verdict:`, L901). Its header names its owner: "Owner: Thurgood" (L2).
- **The workflow cannot show a red on `main` by itself.** `native-harness.yml` runs on `pull_request` and `workflow_dispatch` only (L33–40). A break from outside shows first on whichever PR runs next. The base state is measured by a dispatch on `main`. The conditions below rely on that.
- **The cost of per-fix grants alone.** Under per-fix grants, an outside break waits on a grant record before its fix, while every PR is blocked or the context is demoted. Thurgood's correction (`[DATA]` cross-read): Peter can merge the grant and the fix in one sitting, so the saving on Android is one ruling, not one merge cycle. Kenya's case on iOS, a forced pin move, is the stronger one.

---

## 3. The items

Each item states its paths, its limits and what it excludes. **"Active"** is defined in item 7. **"`B`"** is a PR's merge base, `git merge-base origin/main <m>`, and **"`m`"** is its head.

### Item 1 — the Android lane (Data)

**Paths, by name:**

| Path | Why |
|---|---|
| `harness/android/**` | The lane (`lane.ts`, its infra classifier), the Gradle project and wrapper, and `harness/android/README.md`. Data wrote all of it under Task 4 |
| `scripts/harness/probe-kotlin.ts` | The Kotlin probe the lane runs |
| `scripts/harness/parse-kotlin.ts` | The Kotlin diagnostic parser behind the comparator's interface (`compare.ts` L5) |
| `scripts/harness/__tests__/probe-kotlin.test.ts` | Tests `probe-kotlin.ts` and `harness/android/lane.ts` |
| `scripts/harness/__tests__/parse-kotlin.test.ts` | Tests `parse-kotlin.ts` |
| `scripts/harness/__tests__/fixtures/kotlin/**` | Read by `probe-kotlin.test.ts` |
| `scripts/harness/__tests__/fixtures/parse-kotlin/**` | Read by `parse-kotlin.test.ts` |
| `harness/pins.yaml`, the `android:` section only | Under item 3's conditions only |

**Limits** (Thurgood's clause, accepted by every seat in round 2):
- **Owning the lane never authorizes changing what it decides.** The verdict rules (design § 3), the infra and run rules (`tasks.md` § "Decision 6" and § "The list file format, the pin file and the run policy", or the records that re-home them after 129), and the parser contract (`compare.ts` part 1) are text first. A change to what they say is a change to that text, by its owner's act.
- **A defect fix is mine**: code that disagrees with the text it implements. It ships with a falsification case, in the test that exercises the file, that is red at `B`.
- **The annotation interface stays as ratified.** A change to `infra.json`'s fields or values, a job's annotation step, or a new annotation title consults Thurgood (ballot `2026-11-07-thurgood-charter-scope-harness-and-merge-hold` item 1, "Consults on `stability.ts`"). This ballot adds nothing to that duty. The annotation steps themselves are in `native-harness.yml`, which is not in this scope (item 6).

**Excluded**: everything item 6 lists; `harness/ios/**` and the iOS files (item 2); `compare.ts` (item 4); `consumer.ts` (item 5); `stability.ts`, `native-rules.ts` and their tests (Thurgood's, by the charter-scope ballot); the `ios:` and `consumer:` sections of `harness/pins.yaml`; and every other file under `scripts/harness/` that the table does not name.

### Item 2 — the iOS lane (Kenya)

*Written by Kenya, 2026-11-07T23:39:02Z (`date -u`). Kenya is widening her own charter, so the conflict-of-interest disclosure above applies to this item unchanged. Each element beyond Peter's ruled words is marked **[Kenya's addition — Peter rules]**.*

**Paths, by name:**

| Path | Why |
|---|---|
| `harness/ios/**` | The lane (`lane.ts`: the toolchain read, the stages and the self-tests), the self-test sources (`selftest/**`) and `harness/ios/README.md`. Kenya wrote all of it under Task 3 |
| `scripts/harness/probe-swift.ts` | The Swift probe the lane runs (`harness/ios/lane.ts` L61) |
| `scripts/harness/parse-swift.ts` | The Swift diagnostic parser behind the comparator's interface (`compare.ts` L5–6, "`parse-swift.ts` is Kenya's, 2.2") |
| `scripts/harness/__tests__/probe-swift.test.ts` | Tests `probe-swift.ts` and `harness/ios/lane.ts` (its L10, L64) |
| `scripts/harness/__tests__/parse-swift.test.ts` | Tests `parse-swift.ts` |
| `scripts/harness/__tests__/fixtures/swift/**` | Read by `probe-swift.test.ts` (L69) |
| `scripts/harness/__tests__/fixtures/parse-swift/**` | Read by `parse-swift.test.ts` (L18) |
| `harness/pins.yaml`, the `ios:` section only | Under item 3's conditions only, read for iOS below |

**Limits** (Thurgood's clause, as item 1 states it):
- **Owning the lane never authorizes changing what it decides.** The verdict rules (design § 3), the toolchain, self-test and Xcode-pin rules (design K-4, K-6 and K-7), the infra and run rules (`tasks.md` § "Decision 6" and § "The list file format, the pin file and the run policy", or the records that re-home them after 129), and the parser contract (`compare.ts` part 1) come text first. A change to what they say is a change to that text, made by its owner.
- **The self-test sources decide what the self-test must catch** **[Kenya's addition — Peter rules]**. `harness/ios/selftest/**` (the missing return and the planted token module) is what K-4 says the compiler must reject. A change that makes the self-test catch less is a change to K-4's text, not a defect fix.
- **A defect fix is Kenya's**: code that disagrees with the text it implements. It ships with a falsification case, in the test that exercises the file, red at `B`.
- **The annotation interface stays as ratified.** A change to a job's annotation step, or a new annotation title, consults Thurgood (ballot `2026-11-07-thurgood-charter-scope-harness-and-merge-hold` item 1, "Consults on `stability.ts`"). The iOS jobs write no `harness-infra` today, so writing one would be a new use of that title and would consult him. This ballot adds nothing to that duty. The annotation steps are in `native-harness.yml`, which is outside this scope (item 6).

**How item 3's P1–P6 read for `ios:`, and P7.** Where a bullet says "as written", item 3's text applies unchanged.
- **P1, as written.** On iOS both of P1's first two forms occur. A toolchain field that differs from the pin does not stop the lane (`harness/ios/lane.ts` L652–663), so the comparator fails it as `harness-verdict: <context> FAIL (toolchain)`. A missing pinned Xcode folder stops the lane before it reads anything, as `FAIL toolchain missing:` with no verdict (L656, printed at L766). The iOS lane writes no `harness-infra`, so P1's third form never applies on iOS.
- **P2.** The deleted keys are `ios.image` and `ios.toolchain`. That keeps `ios.runner`, `ios.statement`, `ios.deploymentTarget` and `ios.compile` unchanged by construction:
  - `runner` must equal the workflow's `runs-on` (Req 2.8), so a label move also needs that file's grant;
  - `deploymentTarget` equals Core Goals' iOS minimum (Req 2.9);
  - `compile` holds the compile flags every stage reads (`harness/ios/lane.ts` L11).
- **P3, for a `toolchain`-class red: as written.** Each moved field takes the value that `R`'s comparator line reports, `ios.toolchain.<field> observed "<v>"` (`compare.ts` L747).
- **P3, for a `toolchain missing` red** **[Kenya's addition — Peter rules, with F-2]**. `R` observed nothing, so the head takes its values from two reads, and neither one is a choice:
  - **(i) The Xcode is K-7's pick, re-read.** `ios.toolchain."xcode.app"`, `"xcode.version"` and `"xcode.build"` at `m` name the newest stable Xcode 26 minor in the Xcode table of `actions/runner-images` `images/macos/macos-26-arm64-Readme.md`, read at a commit of that repository. That readme's image version equals `ios.image.version` at `m`. The PR body cites the readme's commit URL and pastes the table rows.
  - **(ii) Every other toolchain field** at `m` equals what the head run's lane log prints for it, `harness-ios: toolchain <field> = "<v>"` (`harness/ios/lane.ts` L658), in each iOS context of P5's run.
  - **Not a repair:** if the readme has no stable Xcode 26 minor, because only Xcode 27 or later remains, the move changes the runner line too, and it goes by grant or spec row.
- **P4, as written, and `harness/ios/selftest` unchanged** **[Kenya's addition — Peter rules]**. The git command gains the path `harness/ios/selftest`.
- **P5, as written**, for every iOS context. Both use the macOS queue, so `R` and the head run each wait for a `macos-26` runner. That costs time and changes no condition.
- **P6, as written.**
- **P7 — the reserved-word re-check (iOS only)** **[Kenya's addition — Peter rules]**. When `ios.toolchain."swift.version"` differs between `B` and `m`, the PR body carries a `**Reserved-word re-check**:` line with one of two things. Design § 4 (L233) re-checks the list "when `harness/pins.yaml` § `ios` moves to a new Swift", and nothing fires that today (K-F2).
  - **(a)** The re-check's output at the new Swift: each listed word fails as a plain `case` and compiles in backticks, no contextual keyword fails as a plain `case`, and `xcrun swiftc --version` from the same machine is pasted.
  - **(b)** The path of a record at `m`, owner Kenya, that carries the re-check.
  - **Why (b) may stand in for (a):**
    - The risk is one-sided. A word that is reserved at the old Swift and not at the new one still compiles in backticks, so a stale list cannot turn the head red.
    - No CI makes the measurement today, and a repair should not wait for one.
  - **A re-check that disagrees with the list** is a change to design § 4 first. Then `native-rules.ts` changes, by its holder (Thurgood, with Kenya's review under the charter-scope ballot), and never in the pin-move PR.
- **A pin-move PR may also change item 2's paths**, except `harness/ios/selftest/**` and the fixtures (P4), under the limits above. One case needs this: a new Xcode whose version output `parseToolchain` cannot read (L282–306), where the pin and the lane fix must land together for P5 to be green. The falsification case then sits in the test file, red at `B`.

**Excluded**: everything item 6 lists; `harness/android/**` and the Android files (item 1); `compare.ts` (item 4); `consumer.ts` (item 5); `stability.ts`, `native-rules.ts` and their tests (Thurgood's, by the charter-scope ballot, which Kenya reviews); the `android:` and `consumer:` sections of `harness/pins.yaml`; and every other file under `scripts/harness/` that the table does not name.

**Kenya's records**, outside this ballot. Each is filed under `.kiro/issues/**` with owner Kenya, in its own PR. None is a ballot edit:
- **(a)** The iOS lane writes no `harness-infra` on `toolchain missing`, so the demotion read counts a retired Xcode as a code failure (`[KENYA R2]` item 7). It consults Thurgood under D-1.
- **(b)** The lane refuses a manifest without `themes` when the fixture registers themes (`[KENYA R3]`). It consults Thurgood under D-1.
- **(c)** K-F2: the list was measured at Swift 6.4.2, not at the pinned 6.3.3. The record also names a lane self-test that would turn P7 (a) into a CI read.

### Item 3 — `harness/pins.yaml`, option (b), and the owner of `consumer:`

**The sections:**
- **`android:`** — Data, for a move that meets P1–P6.
- **`ios:`** — Kenya, for a move that meets P1–P6 as item 2 reads them for iOS.
- **`consumer:`** — Ada, for `name` and `abbreviation` only, under item 5. **`productTokensFixture` and `productTokens` change only under a spec row**: they decide which fixture is tested (`[ADA]` cross-read).

**Why Ada holds `consumer:`.** `consumer.ts` is the only reader of the section's values (`harness/pins.yaml` L10–21; `consumer.ts` "prepare"). `name` and `abbreviation` are the arguments to `designerpunk init`, which is in Ada's CLI scope (`src/cli/**`). A CLI change to what `init` accepts is the one event that would force a change to them, and Ada makes that change. The section serves no platform lane, so a platform seat is the wrong holder. The comparator reads `consumer:` only as part of the whole file's parsed form, so a change there counts as "the pins changed" for exception (a) (`compare.ts` L447, L839). Item 5's C6 holds the lists fixed, so that exception admits nothing on a standing-scope change. Ada proposed this (`[ADA R3]`), and no seat objected.

**A standing-scope move in a platform section meets all of P1–P6.** Each condition reads git, the PR body, and the workflow's runs. None needs anyone asked.

- **P1 — the red is environment-only.** The PR body cites a `native-harness` run `R` with `event` `workflow_dispatch` on ref `main`, and `R`'s `headSha` is `B`, or is an ancestor of `B` with `git diff --quiet <R.headSha> B -- harness scripts/harness .github/workflows/native-harness.yml` exiting 0. In `R`, at least one context of the section's platform concluded `failure`. For each such context, one of these holds:
  - its `harness-verdict` annotation reads exactly `harness-verdict: <context> FAIL (toolchain)`, with `toolchain` the only class;
  - the job wrote no `harness-verdict` annotation, and its lane log carries a line beginning `FAIL toolchain missing:` (iOS, `harness/ios/lane.ts` L656, printed at L766);
  - the job wrote a `harness-infra` annotation (Android, `harness/android/lane.ts` L573, L619).
  Read with `gh run view <R> --json event,headBranch,headSha,jobs`, the jobs' annotations and `gh run view <R> --log`.
- **P2 — only the image and toolchain fields change.** Load `harness/pins.yaml` at `B` and at `m` with the repository's `js-yaml`. Delete these keys from both, and the two must be deep-equal:
  - Android: `android.imageVersion` and `android.toolchain`;
  - iOS: `ios.image` and `ios.toolchain` (item 2).
  So `runner`, `deploymentTarget`, `minSdk`, `compileSdk`, `libraries`, the `consumer:` section and the other platform's section are unchanged by construction.
- **P3 — each moved toolchain field takes the value the red run observed** **[author's addition — Peter rules, F-2]**. For each `<platform>.toolchain.<field>` whose value differs between `B` and `m`, `R`'s comparator output for that platform's context carries the line `<platform>.toolchain.<field> observed "<v>", pinned "<old>"` (`compare.ts` L747), and the value at `m` is `<v>`. A `harness-infra` red therefore moves no toolchain field. For a `toolchain missing` red, item 2 states the reading.
- **P4 — the decided files are unchanged.** `git diff --quiet B <m> -- harness/expected harness/protected-set.txt harness/fixtures scripts/harness/__tests__/fixtures` exits 0. The deployment target and `minSdk` are covered by P2.
- **P5 — the lane is green at the head.** The PR's `native-harness` run at `m` (`event` `pull_request`, `headSha` `m`) concludes `success` for every context of the section's platform, each with `harness-verdict: <context> PASS`. The PR body pastes, from `R` and from that run, each context's verdict and summary lines and the `toolchain` failure lines. Run artifacts expire after seven days (`native-harness.yml`, `retention-days: 7`), so a link alone does not survive to a later read.
- **P6 — Thurgood reviews it.** The PR body carries `**Consulted**: Thurgood — review: <where the entry is>`, and the review entry exists at that place. Its presence is decidable. Its content is Thurgood's judgment.

**Why P1–P5 close self-greening mechanically.** With `harness/expected/**` unchanged (P4), the comparator fails a context on any `new`, `count-above`, `count-below` or `stale` entry (`compare.ts` L777–797). A pin move cannot add to the list either, because exception (a), "added (a)" when the parsed pins differ (L837–849), needs a list edit, and P4 forbids one. So a green at `m` means the new toolchain reproduced the listed failure set exactly (`[STACY R3]`; `[THURGOOD R3]`). Blocked-probe `probe` entries skip `stale` (L794), which is the one gap `[STACY R3]` names.

**Anything else** in a platform section, or a move that fails any of P1–P6, goes by an issue-row grant or a spec row. That includes every move on a green base, which is a choice, not a repair.

### Item 4 — `scripts/harness/compare.ts` (Thurgood)

**Paths**: `scripts/harness/compare.ts` and `scripts/harness/__tests__/compare.test.ts`.

**Why Thurgood.** The comparator is the verdict oracle for all four contexts, not a producer: it admits additions to the expected lists (L837–849). A seat that holds both a lane's output and its comparison could green its own check (`[STACY R1]`, which changed Kenya's view and Thurgood's reason, `[KENYA R2]`, `[THURGOOD R2]`). Its header already names him (L2), and he was its Task 2 PRIMARY. A per-fix grant would be slowest exactly where the exposure is widest: a `compare.ts` break turns all four contexts red (`[THURGOOD R2]`).

**Limits:**
- **Owning it never authorizes changing a verdict rule.** The rules are design § 3, Req 3, and `tasks.md` § "The list file format, the pin file and the run policy" (or the spec text that supersedes them). A rule change goes into that text first. `harness/README.md` is the prose form (`compare.ts` L12–13), and it is not in this scope (item 6).
- **A defect fix is his**, with a falsification case in `compare.test.ts` that is red at `B`.
- **Data and Kenya each review every change to `compare.ts` outside its comments**, cited on the PR's `**Consulted**:` line. A seat's review entry in the same unit satisfies the duty. **[author's reading — Peter rules]**: the record says "with Data and Kenya reviewing", without a platform split. The author reads it as every non-comment change, because the file has no per-platform declarations to split on (`spec.platform` is a parameter), and its base rate is low.

### Item 5 — `scripts/harness/consumer.ts`, option (a) (Ada)

**Paths**: `scripts/harness/consumer.ts`, `scripts/harness/__tests__/consumer.test.ts`, and `harness/pins.yaml`'s `consumer.name` and `consumer.abbreviation` (item 3).

**Why Ada.** She wrote the driver (Task 1, PRIMARY) and was granted it again in Tasks 14 and 15. It breaks when the CLI, the config or the package changes, and those are in her standing scope already. Under any other holder, Ada could change `init` and break the driver, and then need another seat to repair it (`[ADA]` cross-read).

**A standing-scope change meets all of C1–C6.** "A change" is one PR whose diff touches an item-5 path. It may also touch `src/cli/**` or other files in Ada's scope: a CLI change and its driver change land in one PR, or the required check goes red between them (`[ADA R3]`; `[THURGOOD R3]`, "not barred").

- **C1 — the base and head runs.** The PR body cites a `native-harness` run `R` with `event` `workflow_dispatch` on ref `main` and `headSha` `B`, and the PR's own run at `m`. Both URLs are given.
- **C2 — the generated-file diff from CI.** From the `harness-consumer` artifact of each run, the PR body pastes:
  - `diff` of `harness-tarball-files.txt`;
  - `diff` of `jq -r '.generated.ios[], .generated.android[]' harness-consumer.json | sort`;
  - `diff` of `jq -r '[paths | map(tostring) | join(".")] | .[]' harness-consumer.json | sed -E 's/\.[0-9]+(\.|$)/\1/g' | sort -u` (the manifest's key paths, array indexes dropped);
  - `diff` of the consumer root's top-level entries (`ls -A`).
  An empty diff is written `none`. Each removal is explained in the body. If `R`'s `harness-generate` failed, `R` has no artifact: the body says so, and C5 applies.
- **C3 — no shrink.** For the first two listings, every line at `R` is present at `m`: `comm -23 <R listing> <m listing>` prints nothing. **A change that shrinks either listing goes by spec row, never by standing scope** (`[THURGOOD R3]`). Where `R` has no artifact, the comparison is against the newest earlier dispatch on `main` with one, and the body names it.
- **C4 — the reviews.**
  - **Thurgood reviews every change**, cited on the `**Consulted**:` line.
  - **Data and Kenya each review** a change whose C2 key-path diff or top-level-entry diff is not `none`, which is a change to the manifest or the root layout the lanes read (`[ADA]` cross-read; `[KENYA R3]`, verified: the iOS lane reads its themes only from `harness-consumer.json`).
  - The trigger is the C2 output, so it is decidable. A seat's review entry in the same unit satisfies the duty.
- **C5 — a repair shows red before green.** Where `R`'s `harness-generate` concluded `failure`, the change is a repair. Its diff adds or changes a case in `consumer.test.ts` that fails when run against `consumer.ts` at `B`, and the body names the case.
- **C6 — the same files stay unchanged, and green stays green.**
  - `git diff --quiet B <m> -- harness/expected harness/protected-set.txt harness/fixtures scripts/harness/__tests__/fixtures` exits 0.
  - `harness/pins.yaml`, loaded at `B` and `m` with `consumer.name` and `consumer.abbreviation` deleted from both, is deep-equal. `consumer.abbreviation` at `m` is not `DP` in any case (Req 2.2; `consumer.ts` L233 refuses it already).
  - Every context that concluded `success` in `R` concludes `success` at `m` (`[STACY R3]`).

**What stays out of the scope**: the Req 2.1–2.2 rules the driver states (it reads no repository `dist/`; it refuses `DP`), `consumer.productTokensFixture`, `consumer.productTokens` and `harness/fixtures/product-tokens/**`. Each changes only under a spec row (`[ADA]` cross-read). Whether a diff changes one of the two rules is a judgment, read in Thurgood's C4 review. The deletions-zero read on `consumer.test.ts` (item 8) protects the tests that assert them.

### Item 6 — the paths no seat holds standing write over

- **`harness/expected/**`** and **`harness/protected-set.txt`**: a spec row or an issue-row grant (ruled; § 1).
- **`harness/fixtures/**`** (today, `product-tokens/` only): a spec row (`[ADA]` cross-read).
- **`.github/workflows/native-harness.yml`**, with **`scripts/harness/__tests__/native-harness-workflow.test.ts`**, "which tests the workflow and goes with the workflow's grant" (the charter-scope ballot's Excluded list): an issue-row grant per fix (§ 5).
- **`harness/README.md`** **[author's reading — Peter rules]**: the prose form of the comparator's and the lanes' file formats. It changes with the spec text it restates, by a spec row or a grant.
- **`scripts/harness/d2-check.ts`** and its test, once U8 adds them (Task 13; not on `main`): **not assigned here**. No seat was consulted on it. It runs in `harness-generate` (#745 § 2), so after U12 it has the same exposure as `consumer.ts`. § 8 names it.

### Item 7 — activation

- **Items 1, 4 and 5, and the `android:` and `consumer:` parts of item 3, are active from U12's merge**: the first commit on `main` whose diff ticks Spec 129's Task 18,
  `git log --reverse --format=%H -G'^- \[x\] 18\. ' origin/main -- .kiro/specs/129-consumer-generation-completeness/tasks.md | head -1`.
- **Item 2 and the `ios:` part of item 3 are active from the later of U12's merge and the merge of the first iOS promotion**: the first commit on `main` whose diff adds an `EXPECTED_CONTEXTS` entry for an iOS context,
  `git log --reverse --format=%H -G'^  "harness-ios-(tokens|components)"' origin/main -- tools/agent-generator/verify-gate-registration.sh | head -1`.
  "The later of" **[author's reading — Peter rules]**: before U12, Spec 129's rows grant the iOS files anyway, and the iOS promotion could come first.
- **Before activation**, an edit to an item's paths needs the task-row or issue-row grant it needs today. An edit that rests on this ballot's scope before its activation commit is an out-of-scope edit. Whether a PR's merge commit precedes the activation commit is `git merge-base --is-ancestor`.
- **Once active, a scope stays active.** A demotion does not revoke it, because the repair a re-promotion needs is the scope's purpose. **Review trigger**: when no harness context is in `EXPECTED_CONTEXTS`, the holders propose removing these scopes, mirroring the charter-scope ballot's review trigger.

### Item 8 — Stacy's ARMING read (ruled condition; her words, site 10)

- **The instrument-path limb gains every path of items 1, 2, 4 and 5**, and `harness/pins.yaml`.
- **Its deletions-zero read reaches** `probe-kotlin.test.ts`, `parse-kotlin.test.ts`, `compare.test.ts`, `consumer.test.ts`, the iOS tests item 2 names, and `fixtures/kotlin/**`, `fixtures/parse-kotlin/**`, `fixtures/swift/**` and `fixtures/parse-swift/**`, with the existing spec-amendment escape (`[STACY R1]`; `[DATA]` cross-read item 6).
- **For a PR whose diff changes `harness/pins.yaml`** outside an activated grant or spec row: P1–P6 are read at its merge. **For a standing-scope `consumer.ts` PR**: C1–C6. **For any PR touching these paths**: whether its merge precedes the item's activation (item 7).
- **The ARMING read sees each producer PR after it merges.** That answers Data's R1 point that standing scope removes the merged record of a fix's intent (`[THURGOOD R2]` item 6). It is a read, never a gate.

---

## 4. Before → after

Line numbers are at `f28a1fefd` unless stated. Each site is re-read at application; a before-text that does not match stops that site, per the ballots README.

### Edit site 1 — `canonical/agents/data.md`, frontmatter `writeScope`

**After L245** (`  - ".kiro/issues/**"`, followed by `kiro:` at L246), insert:

```yaml
  # ballot 2026-11-07-native-lane-ownership items 1 and 3 (RATIFIED Peter <date>), active from Spec 129 U12's merge:
  # the native harness's Android lane; in pins.yaml the android: section only, under P1–P6 — the In Scope bullet carries the limits
  - "harness/android/**"
  - "scripts/harness/probe-kotlin.ts"
  - "scripts/harness/parse-kotlin.ts"
  - "scripts/harness/__tests__/probe-kotlin.test.ts"
  - "scripts/harness/__tests__/parse-kotlin.test.ts"
  - "scripts/harness/__tests__/fixtures/kotlin/**"
  - "scripts/harness/__tests__/fixtures/parse-kotlin/**"
  - "harness/pins.yaml"
```

**Before**, for the record: L240–245 are `writeScope:`, `.kiro/specs/**`, `docs/specs/**`, the six-roots comment (two lines) and `.kiro/issues/**`. Nothing is removed.

### Edit site 2 — `canonical/agents/data.md` § "In Scope", a new bullet after L283

- **Before**: L283 is `- Advising Leonardo on Android-specific constraints and opportunities`; no harness bullet.
- **After**, a new last bullet:
  > `- **The native compile harness's Android lane (ballot 2026-11-07-native-lane-ownership items 1 and 3; active from Spec 129 U12's merge)**: you own `harness/android/**`, `scripts/harness/probe-kotlin.ts` and `scripts/harness/parse-kotlin.ts`, with `probe-kotlin.test.ts`, `parse-kotlin.test.ts`, `fixtures/kotlin/**` and `fixtures/parse-kotlin/**`, because `harness-android-tokens` is a required check and a break from outside the repository (a runner image's JDK, a registry host or failure text, a Gradle resolve change) lands on it with no PR author at fault. Owning the lane never authorizes changing what it decides: the verdict rules, the infra and run rules, and the parser contract follow their spec text first; a fix where the code disagrees with that text is yours, with a falsification case red at the merge base. A change to `infra.json`'s fields or values, an annotation step or title consults Thurgood. In `harness/pins.yaml` you hold the `android:` section only, and only for a move that passes that ballot's P1–P6: the red it repairs, on a dispatch at the merge base, is environment-only; only `imageVersion` and `toolchain` change, each moved toolchain field to the value the red run observed; `harness/expected/**`, `harness/protected-set.txt` and every fixture are unchanged; every Android context is green at the PR head, with both runs' verdict lines pasted; and Thurgood's review is cited on the `**Consulted**:` line. Any other move goes by grant or spec row. Not yours: `harness/expected/**`, `harness/protected-set.txt`, `harness/fixtures/**`, `harness/README.md`, the rest of `harness/pins.yaml`, `compare.ts` (Thurgood's; you review it), `consumer.ts` (Ada's; you review its manifest and layout changes), `stability.ts` and `native-rules.ts` (Thurgood's), and `native-harness.yml` with `native-harness-workflow.test.ts` (an issue-row grant per fix). Before U12's merge, your write over these paths is Spec 129's task-row grants.`

### Edit site 3 — `canonical/agents/kenya.md`, frontmatter `writeScope` (Kenya's text)

**After L243** (`  - ".kiro/issues/**"`, followed by `kiro:` at L244), insert:

```yaml
  # ballot 2026-11-07-native-lane-ownership items 2 and 3 (RATIFIED Peter <date>), active from the later of Spec 129 U12's merge and the first iOS promotion's merge:
  # the native harness's iOS lane; in pins.yaml the ios: section only, under P1–P7 — the In Scope bullet carries the limits
  - "harness/ios/**"
  - "scripts/harness/probe-swift.ts"
  - "scripts/harness/parse-swift.ts"
  - "scripts/harness/__tests__/probe-swift.test.ts"
  - "scripts/harness/__tests__/parse-swift.test.ts"
  - "scripts/harness/__tests__/fixtures/swift/**"
  - "scripts/harness/__tests__/fixtures/parse-swift/**"
  - "harness/pins.yaml"
```

**Before**, for the record: L238–243 are `writeScope:`, `.kiro/specs/**`, `docs/specs/**`, the six-roots comment (two lines) and `.kiro/issues/**`. Nothing is removed.

### Edit site 4 — `canonical/agents/kenya.md` § "In Scope", a new bullet after L281 (Kenya's text)

- **Before**: L281 is `- Advising Leonardo on iOS-specific constraints and opportunities`; no harness bullet.
- **After**, a new last bullet:
  > `- **The native compile harness's iOS lane (ballot 2026-11-07-native-lane-ownership items 2 and 3; active from the later of Spec 129 U12's merge and the first iOS promotion's merge)**: you own `harness/ios/**`, `scripts/harness/probe-swift.ts` and `scripts/harness/parse-swift.ts`, with `probe-swift.test.ts`, `parse-swift.test.ts`, `fixtures/swift/**` and `fixtures/parse-swift/**`, because a promoted iOS context is a required check and a break from outside the repository (the runner image retiring or rebuilding the pinned Xcode) lands on it with no PR author at fault. Owning the lane never authorizes changing what it decides: the verdict rules, the toolchain, self-test and Xcode-pin rules (K-4, K-6, K-7), the infra and run rules, and the parser contract follow their spec text first, and a change that makes `harness/ios/selftest/**` catch less is a change to K-4; a fix where the code disagrees with that text is yours, with a falsification case red at the merge base. A change to an annotation step or title, including a first `harness-infra` on iOS, consults Thurgood. In `harness/pins.yaml` you hold the `ios:` section only, and only for a move that passes that ballot's P1–P7: the red it repairs, on a dispatch at the merge base, is a `toolchain` verdict or `toolchain missing`; only `image` and `toolchain` change, each moved field to the value the red run observed or, for a missing Xcode, to K-7's pick from the runner-images readme at a cited commit and the head run's printed toolchain; `harness/expected/**`, `harness/protected-set.txt`, `harness/ios/selftest/**` and every fixture are unchanged; every iOS context is green at the PR head, with both runs' verdict lines pasted; Thurgood's review is cited on the `**Consulted**:` line; and a new Swift version carries the reserved-word re-check or a record of it. Any other move goes by grant or spec row. Not yours: `harness/expected/**`, `harness/protected-set.txt`, `harness/fixtures/**`, `harness/README.md`, the rest of `harness/pins.yaml`, `compare.ts` (Thurgood's; you review it), `consumer.ts` (Ada's; you review its manifest and layout changes), `stability.ts` and `native-rules.ts` (Thurgood's; you review `native-rules.ts` changes outside Kotlin-named declarations), and `native-harness.yml` with `native-harness-workflow.test.ts` (an issue-row grant per fix). Before activation, your write over these paths is Spec 129's task-row grants or an issue-row grant.`

### Edit site 5 — `canonical/agents/ada.md`, frontmatter `writeScope`

**After L272** (`  - ".kiro/issues/**"`, followed by `kiro:` at L273), insert:

```yaml
  # ballot 2026-11-07-native-lane-ownership item 5 (RATIFIED Peter <date>), active from Spec 129 U12's merge: the
  # harness consumer driver; in pins.yaml consumer.name and consumer.abbreviation only — the In Scope bullet carries C1–C6
  - "scripts/harness/consumer.ts"
  - "scripts/harness/__tests__/consumer.test.ts"
  - "harness/pins.yaml"
```

Nothing is removed.

### Edit site 6 — `canonical/agents/ada.md` § "In Scope", a new bullet after the six-roots bullet (L320)

- **Before**: no bullet.
- **After** (Ada may replace the wording):
  > `- **The native harness's consumer driver (ballot 2026-11-07-native-lane-ownership item 5; active from Spec 129 U12's merge)**: you own `scripts/harness/consumer.ts` and `consumer.test.ts`, and `consumer.name` and `consumer.abbreviation` in `harness/pins.yaml`, because the driver runs your CLI's `pack`, `init` and `generate`, and a break there fails `harness-generate` and with it every harness context, the required ones included. A driver change may land in one PR with the `src/cli/**` change it follows. Each change cites a `native-harness` dispatch on `main` at its merge base and its own head run, and pastes the generated-file diff between them (`harness-tarball-files.txt`, the manifest's `generated` lists, its key paths, the consumer root's entries); a change whose generated-file listing at the head lacks a line the base has goes by spec row, never by this scope. Thurgood reviews every change, and Data and Kenya each review one whose key-path or root-entry diff is not empty. A repair of a red `harness-generate` adds a `consumer.test.ts` case red against the base's driver. `harness/expected/**`, `harness/protected-set.txt`, every fixture and the rest of `harness/pins.yaml` stay unchanged, `consumer.abbreviation` is never `DP`, and every context green at the base run is green at the head. Owning the driver never authorizes changing what it decides: the Req 2.1–2.2 rules (it reads no repository `dist/`; it refuses `DP`), `consumer.productTokensFixture`, `consumer.productTokens` and `harness/fixtures/product-tokens/**` change only under a spec row. Before U12's merge, your write over these paths is Spec 129's task-row grants.`

### Edit site 7 — `canonical/agents/thurgood.md`, frontmatter `writeScope`

**After the line `  - "scripts/harness/__tests__/native-rules-emitter.test.ts"`**, which the charter-scope ballot's site 1 (b) inserts after L277, insert:

```yaml
  # ballot 2026-11-07-native-lane-ownership item 4 (RATIFIED Peter <date>), active from Spec 129 U12's merge: the
  # harness comparator, with its test; the limits are in the In Scope compile-harness bullet
  - "scripts/harness/compare.ts"
  - "scripts/harness/__tests__/compare.test.ts"
```

If that line is not present at application (the charter-scope application PR has not merged), this site stops (§ 5).

### Edit site 8 — `canonical/agents/thurgood.md` § "In Scope", the compile-harness bullet (Thurgood may replace the wording)

- **Before** (the closing sentence of the bullet that the charter-scope ballot's site 3 adds): `The rest of `scripts/harness/**` and `harness/**` is not yours.`
- **After**: `From Spec 129 U12's merge you also own `scripts/harness/compare.ts` and `compare.test.ts` (ballot 2026-11-07-native-lane-ownership item 4), the verdict oracle for every harness context: a verdict rule follows design § 3, Req 3 and the tasks round's list-file and pin-file text (or the spec text that supersedes them) first; a defect fix is yours, with a falsification case red at the merge base; Data and Kenya each review every change to `compare.ts` outside its comments, cited on the `**Consulted**:` line. You review each lane owner's standing-scope pin move (that ballot's P6) and every standing-scope change to Ada's `consumer.ts` (C4). The rest of `scripts/harness/**` and `harness/**` is not yours.`

### Edit site 9 — `.kiro/steering/Agent-Directory.md`, four **Owns** lines

- **(a) Data, L122.**
  - **Before**: `**Owns**: Android product screen implementation using DesignerPunk Compose components and Kotlin token constants.`
  - **After**: `**Owns**: Android product screen implementation using DesignerPunk Compose components and Kotlin token constants; **the native compile harness's Android lane** (`harness/android/**`, `probe-kotlin.ts`, `parse-kotlin.ts`, and repair moves in `harness/pins.yaml`'s `android:` section; ballot 2026-11-07-native-lane-ownership, from Spec 129 U12's merge). *(amended <date> by ballot 2026-11-07-native-lane-ownership § 4 site 9; prior text at <SHA>)*`
- **(b) Kenya, L114.**
  - **Before**: `**Owns**: iOS product screen implementation using DesignerPunk SwiftUI components and Swift token constants.`
  - **After**: `**Owns**: iOS product screen implementation using DesignerPunk SwiftUI components and Swift token constants; **the native compile harness's iOS lane** (`harness/ios/**`, `probe-swift.ts`, `parse-swift.ts`, and repair moves in `harness/pins.yaml`'s `ios:` section; ballot 2026-11-07-native-lane-ownership, from the later of Spec 129 U12's merge and the first iOS promotion's merge). *(amended <date> by ballot 2026-11-07-native-lane-ownership § 4 site 9; prior text at <SHA>)*`
- **(c) Ada, L58.**
  - **Before**: `**Owns**: Primitive and semantic token creation, formula validation, cross-platform generation pipeline, Rosetta architecture, token governance enforcement.`
  - **After**: `**Owns**: Primitive and semantic token creation, formula validation, cross-platform generation pipeline, Rosetta architecture, token governance enforcement, **the native compile harness's consumer driver (`scripts/harness/consumer.ts`; ballot 2026-11-07-native-lane-ownership, from Spec 129 U12's merge)**. *(amended <date> by ballot 2026-11-07-native-lane-ownership § 4 site 9; prior text at <SHA>)*`
- **(d) Thurgood, L74**, as the charter-scope ballot's site 4 leaves it.
  - **Before** (fragment): `**the compile harness's stability script and rules module (`scripts/harness/stability.ts`, `native-rules.ts`)**`
  - **After** (fragment): `**the compile harness's stability script, rules module and comparator (`scripts/harness/stability.ts`, `native-rules.ts`, `compare.ts`)**`, with the line's dated pointer extended: `*(amended <date> by ballot 2026-11-07-thurgood-charter-scope-harness-and-merge-hold § 4 site 4 and <date> by ballot 2026-11-07-native-lane-ownership § 4 site 9; prior text at <SHA>)*`.

### Edit site 10 — `canonical/agents/stacy.md`, the ARMING row (L404) — Stacy's seat, her edit, her ruling

The author proposes the shape (item 8); **Stacy writes the words**. Her round-1 condition is the ruled source. The row gains: the item 1, 2, 4 and 5 paths and `harness/pins.yaml` in the instrument-path limb's path list; the named tests and fixture directories in its deletions-zero read; the P1–P6 read for a standing-scope pin move and the C1–C6 read for a standing-scope `consumer.ts` change; and the activation read of item 7.

### Edit site 11 — ballot `2026-11-07-thurgood-charter-scope-harness-and-merge-hold`, two ledger lines

A ballot is a ledger: these lines are appended, and nothing in it is rewritten.
- **After item 1's Excluded list** (§ 3): `*(Amended <date> by ballot `2026-11-07-native-lane-ownership` item 4: `compare.ts` and `compare.test.ts` join Thurgood's standing scope from Spec 129 U12's merge. Items 1, 2 and 5 of that ballot give the Kotlin, Swift and consumer files to Data, Kenya and Ada. The rest of this list is unchanged.)*`
- **After § 7's closing paragraph** ("Not a fork in this ballot…"): `*(Answered <date> by ballot `2026-11-07-native-lane-ownership`: the per-role split.)*`

### Edit site 12 — the regenerated surfaces, re-confirmed and re-signed (the charter-scope ballot's site 7 pattern)

- `canonical/operative-sets/{data,kenya,ada,thurgood,stacy,agent-directory}.yaml`.
- The consumer profile: dispositions, overlays, confirmations and signatures for those six units, each by its C1 seat. Each new `writeScope` entry needs a first signature, or `consumer-profile.real.test.ts`'s "every routed row is signed" fails. The author expects each to be `no-consumer-counterpart`, since a consumer project has no harness, and leaves that call to each signer.
- **The `#in-scope` removal texts.** Data's, Kenya's, Ada's and Thurgood's `#in-scope` rows are `re-pointed` with stored removals (`canonical/profiles/consumer/<seat>.dispositions.yaml` L7–8). Each new bullet (sites 2, 4, 6) gets a removal whose text equals it byte for byte. For Thurgood, the removal that stores the compile-harness bullet (added by the charter-scope application) is replaced with site 8's after-text. Nothing mechanical checks those texts (`regrounding/freshness.ts` L86), so each signer reads them.
- Regeneration (`.claude/agents/*`, `.kiro/agents/*`, including each seat's Kiro `allowedPaths`), `canonical/generated.lock`, and `122-diff-guard` read green.
- **Lock slot**: after the charter-scope application PR, in the one-lock-PR-at-a-time order, named in the application brief.

### Edit site 13 — records

- `.kiro/docs/ballots/README.md` § "Ballots on record": one entry, at ratification.
- Not closed or opened here: Kenya's three records (item 2); a record for `d2-check.ts`'s owner (§ 8), if Peter wants one; Data's JDK record (§ 8).

---

## 5. Interaction with #745 and with the charter-scope ballot

**#745, ballot `2026-11-07-github-grants-are-issue-row-grants` (DRAFT; branch `chore/github-grants-issue-row-ballot` at `1eae2b8aa`; its `merge-hold` check is red on three unanswered markers).**
- **The two ballots edit disjoint text.** #745 governs **grants**; its § 4 rule says a charter standing scope "is not a grant, needs none, and is neither added to nor taken from here". This ballot grants standing scopes and adds **no `.github/**` path to any seat**.
- **`native-harness.yml` gets a grant per fix either way.**
  - If #745 is ratified, a fix there takes an issue-row grant (its item 1), and a `tasks.md` row listing the file grants nothing.
  - If #745 is not ratified, ballot `2026-09-27-ci-regime-standing-scope` § 2 already sends "every other `.github/**` path" through an issue-row grant or Peter's action, though a tasks-row could still list it (the U1 and U3a precedent #745 § 2 names).
  - So this ballot's item 6 holds under either outcome. The ruled sequence still puts ratification after #745 is ruled (§ 1).
- **`native-harness-workflow.test.ts`** is not a `.github/**` path, so #745 does not reach it. It goes with the workflow's grant because it tests the workflow: the grant record lists it in its `**Grant paths**:`.
- **A move of `runner`** in either platform section must match the workflow's `runs-on` (pins L37–38, L94–96), so it is a workflow change and takes that grant. P2 keeps `runner` out of a standing move.

**The charter-scope ballot, `2026-11-07-thurgood-charter-scope-harness-and-merge-hold` (RATIFIED; `f28a1fefd`; application PR not yet merged).**
- **This ballot narrows its item 1 Excluded list** by moving `compare.ts` and `compare.test.ts` into Thurgood's scope (sites 7, 8, 11). The other files on that list go to Data, Kenya and Ada here, or stay with no standing holder (item 6).
- **Its D-1 annotation-interface consult is unchanged** and binds the lane owners (item 1's third limit).
- **Its § 7 closing paragraph**, "Not a fork in this ballot…", named this gap. This ballot answers it (site 11).
- **Application order.** This ballot's application PR follows that ballot's application PR. Sites 7, 8 and 9 (d) anchor on text that PR adds; site 10 edits the ARMING row after that ballot's site 6 has. Both carry `canonical/generated.lock`.

**The sequence, as ruled (§ 1):** #745 ruled → this ballot ratified → the charter-scope application PR merges → this ballot's application PR merges → U12 merges, and the Android, compare and consumer scopes activate → at the first iOS promotion's merge, the iOS scope activates. If this ballot is not applied before U12's PR opens, Thurgood's R1 fallback applies: a record whose trigger is **U12's PR opening**, not its merge, so the gap never opens.

---

## 6. Census

Ballots README § "Conventions", "Instrument census". No instrument's code, rule, pattern or grammar changes; this ballot changes only who may write files. No item runs a census mode, and there is no appendix.

- `**Census**: not in scope — the harness contexts (harness/android/lane.ts, harness/ios/lane.ts, scripts/harness/compare.ts, consumer.ts, probe-*.ts, parse-*.ts, under native-harness.yml) — no file they run changes; only the seats that may change those files`
- `**Census**: not in scope — 122-diff-guard (tools/agent-generator/diff-guard.ts, with workflow-rules-guard.ts) — the edited canonical units (sites 1–10 and site 12's dispositions) are its ordinary inputs, regenerated and lock-refreshed at application, where its verdict is read`
- `**Census**: not in scope — 122-canonical-vs-truth and 122-sweep-1..8 (tools/agent-generator/canonical-vs-truth.ts, tools/agent-generator/sweeps/**) — they load canonical/** as ordinary inputs; no rule they implement changes; read green at application`
- `**Census**: not in scope — verify-signing-chain (tools/agent-generator/regrounding/verify-signing-chain.ts, with C1 and signatures.ts) — site 12's re-confirms and re-signs are its ordinary inputs, read by --ci at application`
- `**Census**: not in scope — law-ratified (scripts/completion-claims/merge-hold.ts --job law-ratified) — this ballot and the application PR's governance files are its ordinary inputs; the application PR's LAW lines cite this ballot, which must read RATIFIED at that head`
- `**Census**: not in scope — verify-gate-registration.sh — no context, job name or count changes; item 7 reads EXPECTED_CONTEXTS' history and does not edit it`
- `**Census**: not in scope — check-section-citations (scripts/check-section-citations.ts) — the new text adds no MCP section citation`

---

## 7. Who is consulted, and what each is asked in the review round

| Seat | Why on the list | Asked |
|---|---|---|
| **Stacy** (required) | Site 10 is her row; she reads P1–P6 and C1–C6 at ARMING; census reader | (1) Is each of P1–P6 and C1–C6 decidable at your seat with the commands as written? Name any input where it is not. (2) Is P3 a narrowing you would keep? (3) Attack the width: which path would you send back to per-fix grants? |
| **Kenya** | Writes item 2, sites 3, 4 and 9 (b) | Replace the placeholders. Do P1–P6, as worded, fit an Xcode move? |
| **Thurgood** | Item 4 is his; he reviews under P6 and C4; the charter-scope ballot is his | (1) Does site 8 read right in your bullet? (2) Is "every non-comment change" the right reading of Data and Kenya reviewing `compare.ts`? (3) Is the review load in six chains acceptable (§ 9 residual 3)? |
| **Ada** | Item 5 and the `consumer:` section are hers | (1) Do C1–C6 state your round-3 conditions? (2) Does site 6 read right? (3) Should `d2-check.ts` follow item 5 after U12 (§ 8)? |
| **Lina** — **[author's addition — Peter rules]**: not in the three pre-draft rounds | Generator shared-core primary: site 12 renders the new paths into Kiro `allowedPaths`. The rule that a test under `scripts/` follows the file it exercises is her test-ownership area, and `probe-kotlin.test.ts` exercises two files (`probe-kotlin.ts` and `harness/android/lane.ts`) | Does listing these tests and fixtures in three charters conflict with `.kiro/issues/2026-10-17-per-owner-test-folders.md`, or with how the generator renders `allowedPaths` for one file (`harness/pins.yaml`) in three seats? |

**Not affected, and why**: Leonardo and Sparky. No web or product surface reads these paths.

**For the PR body**: `**Consulted**: Data — author; Kenya — iOS clause author; Thurgood — compare.ts holder, P6 and C4 reviewer; Stacy — required reviewer; Ada — consumer.ts holder; Lina — allowedPaths rendering`, completed with each seat's one-line read after the review round.

---

## 8. Forks for Peter

- **F-1 — how activation is carried.**
  - **(a)** One application PR before U12. The frontmatter paths land then, and the In Scope bullets and Stacy's read carry the activation events (item 7).
  - **(b)** The frontmatter paths land at each activation: Android, `compare.ts` and `consumer.ts` in a PR at U12's merge, iOS in another at the first iOS promotion.
  - **Recommendation: (a).** Under (b), each activation is a charter edit with a lock slot and a signing cycle, and the iOS one lands at the moment a required iOS context is new, which is the wrong moment for a governance PR.
  - **What survives against (a)**: frontmatter cannot carry an event, so Kiro's `allowedPaths` admit the writes from the application PR's merge, before activation. Until then only the bullets' text and Stacy's after-merge read hold the line. For iOS that interval could be months.
- **F-2 — P3, each moved toolchain field takes the value the red run observed** **[author's addition]**.
  - **(a) Keep it.** A standing move can then set a pin only to what the runner reported. A deliberate bump, such as a Kotlin or Gradle version, cannot ride a forced JDK repair.
  - **(b) Drop it**, as Peter's approved wording has it: any `image` or `toolchain` field may move, with P4 and P5 still holding.
  - **Recommendation: (a).** P4 and P5 stop a move from hiding a failure, but not from changing what the lane measures. P3 makes "no intended change" decidable, not a review judgment.
  - **What survives against (a)**: on Android, a forced change that also needs a lane-file change (for example, a new JDK that needs a `gradle.properties` flag) still fits, because P2 and P3 bound only `pins.yaml`. But a forced move whose new value the red run cannot report, because the lane stops before it reads the toolchain, does not fit P3, and it waits for a grant. iOS `toolchain missing` is that case, and item 2 has to state its own reading.

**Not forks, listed for Peter:**
- **`scripts/harness/d2-check.ts`** (U8, Task 13) has no standing owner after U12, and it runs in `harness-generate`. The author's lean is that it follows item 5 to Ada, but no seat was consulted. Options: a ledger amendment to this ballot in the review round, if Ada and Stacy read yes, or a record with a trigger at U12's PR opening.
- **Data's class option on Android** (`[DATA R3]`): pin the JDK through `actions/setup-java`, which removes the image as a trigger. It is a `native-harness.yml` change, so it takes a grant. Its cost is a new download host that `REGISTRY_HOSTS` does not classify. Data files the record with the orchestrator's go.

---

## 9. Counter-arguments (fold-back applied)

**What the counter-arguments changed in this draft:**
- P1 names the dispatch on `main`, because the workflow has no push trigger.
- P3 (F-2) closes a deliberate bump riding a forced repair.
- P5 pastes the verdict lines, because artifacts expire in seven days.
- C2–C4 key the layout review and the shrink rule to CI output, not to reading code.
- C5 makes "a repair" decidable from the base dispatch.
- Item 7 takes "the later of" for iOS.
- `d2-check.ts` is named rather than silently left out.

**What survives, stated plainly:**

1. **Ada writes both the generator and the driver that tests it** (`[ADA R3]`; every seat accepted it). This is the surviving counter-argument the ruling names.
   - The risk is not bad CLI code. It is a driver change that hides a gap in the generator: pruning a file, skipping a step, or narrowing what the manifest carries.
   - C3 makes a shrink in the generated-file listing a spec-row change. C6 holds the expected lists and fixtures fixed. A pruned compile then reads as `not-run` and fails (`[DATA R3]`).
   - A narrowing that keeps every file but changes what one carries, such as a theme dropped from the manifest's `themes`, is not in the two listings C3 compares. `[KENYA R3]`'s verified case is this one: a manifest with no `themes` key reads as none, and the iOS instance check passes while checking nothing. C4's key-path diff sends it to Data and Kenya when the key disappears, but not when the array only shortens. Kenya's lane-side record closes it for iOS.
   - Thurgood says his review cannot judge which generated files should exist (`[THURGOOD R3]`).
   - So the invariant and the reviewers narrow the gap; they do not remove it the way separate ownership would. Per-fix grants for `consumer.ts` were the defensible alternative, and Peter approved (a).
2. **Product seats hold code-write scope over system infrastructure** (`[DATA]` R1; `[KENYA]` R1). The harness tests the generator, and these are the first code paths in Data's and Kenya's charters, which blurs the Agent Directory's tier line. Peter ruled the split ("Thurgood owning… 'no'"), so this is a residual, not a fork. The reason that survives on the other side: a Gradle or Xcode repair needs that seat's judgment.
3. **Review concentration.** After this ballot, Thurgood is in six review or consult chains: `native-rules.ts`, `compare.ts`'s other side, D-1, pin moves, `consumer.ts`, and the stability read. A review is an entry owed in the same unit, not a gate, which bounds the latency, but his seat is a single point of delay (`[THURGOOD R3]`).
4. **The checks come after the PR opens, and the reads after the merge.** P6 and C4 reviews happen on an open PR. Stacy's ARMING read happens after the merge. A reviewer can miss a deliberate move (`[KENYA R3]`). Only P1–P5 and C1–C3, C5 and C6 are mechanical, and nothing runs them as a gate.
5. **The base rate is thin** (`[STACY R1]`). Every producer change so far landed under a 129 task row. The changes we can predict after U12 are Spec 132 work, and 132's rows grant that work anyway. The standing scope pays only on a break outside any spec, on a required context. That rate is unknown and has been zero so far.
6. **A break that spans files needs several seats.** A break across `lane.ts` and `compare.ts` needs Data and Thurgood; across a lane and `native-harness.yml`, a grant as well. That cost is deliberate (`[STACY R1]`), and Peter's demotion and emergency paths remain.

---

## 10. Review round record

The three rounds below ran before this draft, as the orchestrator's read-only consults. Each file is spliced byte for byte from the session scratch directory `/private/tmp/claude-501/-Users-3fn-Documents-Work-Projects-Kiro-DesignerPunk-v2/5572d8be-d5f0-4ae6-a8b3-cb3c3b8aceed/scratchpad/lane-owner/`. That directory is temporary, so each file's sha256 is given with it. The orchestrator's three briefs are fenced, because they carry top-level headings. Round-1 entries were stamped by their seats without a round number; they are R1. The review round on this draft follows in § 11.

### Round 1 — consult (read at `894d87436`)

**Source**: `brief.md`, sha256 `102b35b7dd6cc19e8dfab92d63a6d4a6eb86446727f057545b1a18d32f42376c` (the orchestrator's brief, fenced)

````markdown
# Consult: who owns the native harness lanes' producer code after Spec 129 closes (read-only)

This is a read-only consult. **Do not edit the repo or commit.** Read with `git show origin/main:<path>`, and never run `git checkout`.

**Peter's direction.** At 2026-11-07T22:30:08Z Peter said "Let's do the consultation first". That came after the orchestrator explained the gap and offered two options. The record, on branch `chore/thurgood-charter-scope-ballot`, is `.kiro/specs/129-consumer-generation-completeness/evidence/2026-11-07-peter-rulings-charter-ballot-and-ripple.md`.

## The gap

Data raised it in the charter-scope ballot consult: `/private/tmp/claude-501/-Users-3fn-Documents-Work-Projects-Kiro-DesignerPunk-v2/5572d8be-d5f0-4ae6-a8b3-cb3c3b8aceed/scratchpad/charter-ballot/data.md` "What survives" 1, and `crossread-data.md` item 5. Read both.

- **The producers.** The native lanes' producer code has no standing owner:
  - Android: `harness/android/lane.ts` and its infra classifier, and `scripts/harness/compare.ts`;
  - the report steps in `.github/workflows/native-harness.yml`;
  - iOS: `harness/ios/lane.ts` and its equivalents.
- **Today.** Spec 129's tasks-row grants cover it unit by unit. Those grants end at U12, 129's closeout.
- **Standing scope.** Data's `writeScope` is `.kiro/specs/**`, `docs/specs/**` and `.kiro/issues/**`. Check Kenya's in `canonical/agents/kenya.md`.
- **Exposure.** `harness-android-tokens` is already a required check, so a producer break after U12 blocks every PR until someone with authority fixes it. iOS gets the same exposure at its first promotion.
- **The neighbouring scope.** Peter just ratified the charter-scope ballot: Thurgood gets standing scope over `stability.ts`, `native-rules.ts` and `merge-hold.yml`, the **reader** side. It does not cover the producers.
- **Grant rules in flight.** The `.github/**` grants ballot (#745, unratified) makes every `.github/**` grant an issue-row grant.

## The options shown to Peter

- **(i) Per-repair grants.** Each producer fix gets its own issue-row grant when needed. This is Data's lean, on base rate: the classifier has changed once.
- **(ii) Standing scope.** Data, and Kenya for iOS, get standing charter scope over their own lane's producer files, through a ballot like Thurgood's.
- **Orchestrator's untested lean:** (ii), because a required check whose fixer needs permission first is the costly failure.

## Answer from your seat

- Which option, and why. A third option is welcome. Examples: Thurgood owns all harness producers; or standing scope for the lane files and a per-fix grant for `native-harness.yml`, matching #745.
- **The cost** to your seat, and who reviews whom. Consider the F-4 "review" pattern Peter just ruled.
- **Timing.** A ballot now, or a record with a trigger at U12 or at the first iOS promotion?
- **The surviving counter-argument** to your pick.

Write `<seat>.md` in this directory, under 400 words. Reply in under 60 words.
````

**Source**: `data.md`, sha256 `60ffa26dd657b61af367f3e808b705855c088e52f832aa942df96629b462e8b2`

#### [DATA] — lane producers after U12 (`main` at `894d87436`)

**I withdraw my (i) lean.** "Changed once" is not a base rate: `lane.ts` is two days old (#707, #713). The breaks that matter come from outside: a new registry host or failure text (`REGISTRY_HOSTS`, L444), a Gradle resolve change, a runner image. Each one lands on a required check. Under (i), the fix waits on two Peter merges in sequence, the grant record and then the fix. Until both land, every PR is blocked, or `harness-android-tokens` is demoted.

**My pick: a third option, split by what each file is.**
- **Standing scope for each platform seat.** Data gets `harness/android/**`, `parse-kotlin.ts`, `probe-kotlin.ts`, and their tests and fixtures. Kenya gets the iOS mirror.
- **Out of my scope:**
  - `harness/expected/*.tsv`, the expected results. Owning them would let me mark my own work.
  - `harness/pins.yaml`: shared, and a pin move is deliberate, not a repair.
- **The shared producers go to Thurgood.** `compare.ts` and `consumer.ts` serve both lanes, and `compare.ts`'s verdict line is what his reader parses.
- **`native-harness.yml` gets a per-fix issue-row grant**, matching #745 and Thurgood's CI ownership. A change there can change the required checks, so ARMING should fire on it.

**Cost and review.**
- **My cost:** I become the named fixer for Android producer reds and for the demotion read's producer findings.
- **Review, on the F-4 pattern:**
  - Thurgood reviews my changes to the `infra.json` fields, the annotation titles, or how `lane.ts` computes its verdict inputs.
  - Each review is cited on the PR's `**Consulted**:` line.

**Timing: a ballot now, ratified before U12**. A record whose trigger is U12 fires at the moment the exposure begins, so it is late by construction. One ballot covers both platforms, and Kenya's half can take effect now.

**Surviving counter-argument, a fork for Peter.** Data and Kenya are product seats, and these lanes test the generator, which is system infrastructure. Giving us standing scope blurs the Agent Directory's tier line. The alternative is that Thurgood owns all the producers and Data and Kenya review: one seat for the whole harness, but Kotlin and Swift toolchain repairs then land in a seat without that expertise. The pick is Peter's.

**One more residual:** Peter can demote a red context quickly, which limits how badly (i) can fail. Standing scope also removes the merged record that shows him a fix's intent before the code.

**Source**: `kenya.md`, sha256 `b2b7df6a6ae0de24059e6a584ca8663c6c7cdcbe8bb9e812668b9e29c529cd33`

### [KENYA] — producer-owner consult (iOS seat), 2026-11-07T22:32:44Z

**Read at** `origin/main` `894d87436`. My `writeScope` is the same as Data's.

**The iOS break is not like Android's (verified).** The iOS jobs write no `harness-infra` title. `lane.ts` L656 stops with `toolchain missing` when `/Applications/Xcode_26.6.app` is not on the runner. The likely cause is outside the repo: GitHub's macOS image dropping that Xcode, which images do every few months (from my training; not checked). So a promoted iOS context will almost certainly break, and no PR author can fix it. The demotion read would count that break as a code failure. The fix is to move `pins.yaml` § `ios`, measure again in CI, and re-check K-F2's reserved words. The "changed once" base rate does not apply here.

**My pick: a third option, the split.**
- **Standing scope** over each lane's own files. For iOS that is `harness/ios/**`, the `ios:` section of `pins.yaml` (a hunk rule, as in F-4), `probe-swift.ts` and `parse-swift.ts`, with their tests.
- **Per-fix issue-row grants** for the shared files: `native-harness.yml` (so ARMING fires, matching #745), `compare.ts`, `consumer.ts` and `harness/expected/*.tsv`. A change to the expected set changes verdicts, so it never comes under a standing scope.

**Cost and review.** I would take on about 830 lines of TypeScript and the pin moves. Under the F-4 pattern, the owner of the reader reviews the producer: Thurgood reviews each of my changes to an annotation or to an exit shape. Shared files go under grants, so Data reviews nothing of mine.

**Timing.** iOS has no exposure until it is promoted, and no iOS offer can come before both Android contexts are promoted. File a record now, with its Trigger at the first iOS promotion offer, and hold that offer until the record is ruled. The scope lands before exposure, not after a red. If Peter wants one ballot covering both lanes now, I don't object. That fork is his.

**What survives.** The harness is system infrastructure, not a product screen. Code-write scope for a product seat blurs the Agent Directory's tier line, and it would be the first code scope in my charter. The strong alternative: Thurgood owns all producers and Kenya and Data review, F-4's own shape and more consistent. Against it I keep one point: a fix on iOS is an Xcode and Swift judgment, so its author should be the seat that can make that judgment.

**Source**: `stacy.md`, sha256 `535abbe103ca92325738477b736631022c4e74bca919c1abd54f0aaff1580919`

#### [STACY R1] — lane producers after U12

I read `origin/main` at `894d87436`. **The brief's producer list is short.** It leaves out `probe-kotlin.ts`, `parse-kotlin.ts`, `consumer.ts`, `harness/expected/*.tsv`, `harness/pins.yaml` and the gradle files. `compare.ts` serves both platforms (L68–76, L229–230). It admits additions to an expected list (L841–842): the verdict oracle, not a producer.

**Pick: a third option, split by role.**
- **(ii) for each lane's own producers.** Data gets `harness/android/**`, `probe-kotlin.ts` and `parse-kotlin.ts`. Kenya gets the iOS equivalents.
- **No producer seat gets `compare.ts` or `harness/expected/**`.** If one seat holds both the output and the comparison, it can green its own check. Put `compare.ts` with Thurgood's reader scope. Expected lists change only under spec rows.
- **`native-harness.yml` gets a per-fix grant, matching #745.** My ARMING grant read already covers that file.
- **My condition for (ii): the producer paths join my instrument-path list, with deletions-zero reads.** That covers their tests and `__tests__/fixtures/kotlin/**`, with the spec-amendment escape. Otherwise standing writers shape a required verdict with only RELEASE reading it.

**Cost and review.**
- **My cost:** about a minute per producer PR. Each grant under (i) costs me an activation read plus a subset read at the fixing PR.
- **Review, mirroring F-4.** Thurgood reviews producer changes that touch the annotation interface; D-1 already binds that consult. Data and Kenya each review `compare.ts` changes on their platform. A review entry in the same unit satisfies the duty.
- **I review no one before merge.** My ARMING read would otherwise audit my own approval.

**Timing: ballot now.** Android activates at U12's merge, iOS at the merge of the first iOS promotion.
- A record triggered at U12 leaves a gap between U12's merge and ratification. That gap is exactly when a producer break blocks every PR.
- An inactive iOS clause costs nothing; a later ballot repeats this round.

**Surviving counter-argument: base rate.**
- The classifier has changed once. Every `lane.ts` change so far (#707 to #739) landed under a 129 task row. The changes we can predict after U12 are Spec 132 work, and 132's rows grant that work anyway.
- The standing scope pays only on a break outside any spec, on a required context. That rate is unknown and has been zero so far.
- The split also means a break that spans `lane.ts` and `compare.ts` needs two seats. That cost is deliberate; Peter's emergency path remains.

**Source**: `thurgood.md`, sha256 `e8a4650eda5d9bcdab4bf7afd28cc0f3caed7077c83c9ff39229f786729047d7`

#### [THURGOOD] — lane-producer ownership consult (read-only, at `origin/main` and `de7c66774`)

**Pick: a split, (ii) for the lane files, my seat for the comparator, and grants for the workflow.**
- **Data** gets standing scope over `harness/android/**`, `parse-kotlin.ts`, `probe-kotlin.ts`, their tests and `fixtures/kotlin/**`. **Kenya** gets the iOS mirror (`harness/ios/**`, `parse-swift.ts`, `probe-swift.ts`). Each wrote these files in 129 (Tasks 2–4, 19).
- **`compare.ts` is not ownerless.** Its header says "Owner: Thurgood", and I was its Task 2 PRIMARY. My ballot excluded it only to stay narrow. It should come to my charter with `compare.test.ts`. It is platform-neutral, it serves all four contexts, and splitting it between two seats would be wrong.
- **`consumer.ts`** came from Ada (Task 1). That is her call, and I have not consulted her.
- **`native-harness.yml` and `native-harness-workflow.test.ts`** stay on issue-row grants, matching #745.
- **Each grant carries the clause my own grant has.** Owning a lane does not authorize changing what the lane decides (design § 3, `tasks.md` Decision 6). A fix needs a falsification case that is red first.

**Cost and review.**
- The review runs both ways, using the F-4 word. Data and Kenya review `native-rules.ts`, and they review `compare.ts` where their parser's interface changes. I review any producer change that touches the D-1 interface: the `infra.json` fields, an annotation title, or a new title.
- My cost is one file (one commit in its history) and roughly one review entry per interface change. I would also check the charter structure of Data's and Kenya's edits (the file list and the test-follows-file rule) and their Kiro `allowedPaths`.

**Timing: a ballot now.** Data and Kenya should author it, since it widens their charters.
- It is ratified after #745 is ruled, because the workflow line depends on #745.
- It is applied after the charter-scope application PR merges, so that two `generated.lock` PRs do not merge at once.
- It must land before U12 merges. If Peter defers, use a record whose trigger is **U12's PR opening**, not its merge. A trigger at the merge would open the gap.

**What survives.**
- **Base rate.** Every producer has 1–3 commits, all made under 129 grants. Peter merges every fix either way, so under (ii) each fix saves one ruling, which he can give in the same sitting. In exchange, the charters carry permanent weight, and this would be today's third charter ballot.
- **The split still leaves exposure.** A break in the workflow's report steps still waits for a grant. Only demotion or the emergency path clears that, and both are Peter's.
- Data's lean, (i) with a pre-written grant template, is defensible on these numbers. The choice between (i) and the split is Peter's.

### Round 2 — cross-read (all four R1 entries read by each seat; Ada joins)

**Source**: `crossread.md`, sha256 `92b58dfb4656f5744f1434d739a34781a821ddb731bbe8811af2260c75f69db2` (the orchestrator's brief, fenced)

````markdown
# Cross-read: native harness producer ownership after U12

This round is read-only. The first-round entries are in this directory: `data.md`, `kenya.md`, `stacy.md` and `thurgood.md`. Read all four. The common brief is `brief.md`.

## Agreed by all four

- **Per-platform lanes:** Data and Kenya each get standing scope over their own platform's lane files (`harness/<platform>/**`, plus their `probe-*`/`parse-*` pieces).
- **`native-harness.yml`:** per-fix issue-row grants, matching #745.

## Where they differ (orchestrator's summary; correct it if it's wrong)

1. **`scripts/harness/compare.ts`**, the shared verdict comparator:
   - Thurgood's standing scope (Stacy, Thurgood, Data). Thurgood's reasons: its header already names him, and he led Task 2.
   - Per-fix grants (Kenya).
2. **`scripts/harness/consumer.ts`**, the harness consumer builder:
   - Ada's (Thurgood, who has not consulted Ada);
   - Thurgood's standing scope (Data);
   - per-fix grants (Kenya).
3. **`harness/expected/**` and `harness/pins.yaml`:**
   - spec rows only (Stacy);
   - excluded from standing scope (Data);
   - per-fix grants (Kenya).

   Is that one position or three?
4. **Timing:**
   - a ballot now, ratified before U12 (Thurgood, Data, Stacy). Stacy adds activation at U12 and at the first iOS promotion.
   - Kenya prefers a record triggered at the first iOS promotion offer for iOS, and wants the Android side settled now.
5. **Data's fork for Peter:** Thurgood owning every producer instead of the split.
6. **Stacy's condition:** the producer paths join her ARMING instrument-path read.
7. **Kenya's claim, from her training and unchecked:** GitHub's macOS image dropping the pinned Xcode would stop the iOS lane. Does it change anyone's timing?

## Your job

Answer the items that touch your seat, and say where another entry changes your view. Give the settlement you would accept, or say an item is Peter's and why.

**Ada, new to this round:** read all four entries. Answer item 2 (is `consumer.ts` yours?) and item 1 if you have a view.

Write `crossread-<seat>.md` in this directory, under 300 words. Reply in under 50 words.
````

**Source**: `crossread-ada.md`, sha256 `720157175e28a6d0dc2583345c59b049795134aefb2442aad600248c47df21e4`

#### [ADA] — cross-read, harness producers (read at `origin/main` `894d87436`)

**Item 2: yes, `consumer.ts` is mine. I accept standing scope over it and `consumer.test.ts`.**
- **Verified:**
  - Task 1 (U1) row: "PRIMARY Ada". Tasks 14 (U9) and 15 (U10) grant me the file again, both as PRIMARY.
  - The file runs `npm pack`, `init` and `generate`, and reads the resolved config's `platforms.<p>.output`.
  - In `native-harness.yml` (L45–106), every context `needs: harness-generate` and fails when it fails. That includes the required `harness-android-tokens`.
- **Why it's mine, not Thurgood's (I disagree with Data here):** it breaks when the CLI, the config or the package changes, and those are in my standing scope already. Under Data's split, I could change `init` and break the driver, and then need another seat to repair the harness. That's the cost (ii) is meant to remove.
- **Kept out of my standing scope:**
  - `harness/fixtures/product-tokens/**` decides what gets tested (the WCAG-only `ref`, the composite `ref`).
  - The `consumer.ts` rules from Req 2.1–2.2: read no `dist/`, refuse `DP`.
  - Both change only under spec rows. This is Stacy's `expected/**` reasoning, and Thurgood's "owning a lane does not authorize changing what it decides".
  - `pins.yaml` § `consumer` (name, abbreviation) can be a hunk rule under my scope.
- **Review, F-4 pattern:** Data and Kenya read the consumer-root layout and `harness-consumer.json`, so they review any change to those. I review no one.
- **Stacy's condition:** I accept it. `consumer.ts` should be on her instrument-path list, with deletions-zero on `consumer.test.ts`.

**Item 1:** `compare.ts` should go to Thurgood. It decides the verdict, it serves every platform, its header names him, and no producer seat should hold it.

**Timing:** a ballot now. My line is exposed today, the same as Android's.

**What survives:** I write the generator under test and also the driver that builds what it is tested on. A driver change, for example pruning or skipping a theme, could hide a generator gap. The fixture and rule exclusions narrow this, and Stacy's read catches it after merge, not before. The other choice is to put `consumer.ts` under per-fix grants. That is defensible, and it's Peter's pick.

**Source**: `crossread-data.md`, sha256 `ffaa1e2cc9cbfdc7e1e7ea98929b32a99faedf8ded449f37863e71d3a902b4cc`

#### [DATA] — cross-read

**Thurgood corrects me.** Under (i), Peter can merge the grant record and the fix in the same sitting, so it is not two merges in sequence. Stacy adds that the Android changes we can predict fall under 132's rows. On Android, the split saves one ruling. The strong case is Kenya's on iOS: a forced pin move.

**My settlement:**
1. **`compare.ts`:** Thurgood's standing scope. Data and Kenya review it where their parser's interface changes. Stacy's reason decides it for me: one seat should not hold both a lane's output and its comparison.
2. **`consumer.ts`:** not mine. I named Thurgood without checking. Ada wrote it in Task 1, so I defer to her.
3. **The expected lists: one position, one fork.** All three entries keep them out of every standing scope. The fork is whether an issue-row grant may change them (Kenya) or only a spec row (Stacy). That is Peter's call, and I accept either.
   - **Kenya changed my view on `pins.yaml`:** her `ios:` hunk rule is right. I take the `android:` mirror for symmetry.
4. **Timing:** one ballot, co-authored with Kenya, in Thurgood's sequence:
   - ratified after #745;
   - applied after the charter-scope application PR merges;
   - in place before U12.

   Stacy's activations hold Kenya's condition: Android takes effect at U12's merge, iOS at the first iOS promotion's merge. If Peter defers, the trigger is U12's PR opening.
5. **The fork stands, and Kenya names it too.** Whatever Peter picks, one rule should cover both lanes. If he picks (i), a pre-written grant template makes it workable.
6. **Stacy's condition:** accepted, including deletions-zero on `fixtures/kotlin/**` with the spec-amendment escape.
7. **Kenya's Xcode claim:** unverified. It leaves the Android timing as it is and strengthens the iOS clause.

**Source**: `crossread-kenya.md`, sha256 `712265f0917f2c7a6981e4c8026a86a9f11b79fb0604abe0ae62b344745c7006`

#### [KENYA R2] — cross-read

**1. `compare.ts`: I withdraw per-fix and take Thurgood's scope.** Stacy changed my mind: a seat that writes both the output and the comparison can green its own check. The header (L1) already names Thurgood. Data and Kenya review changes to their own platform's interface.

**2. `consumer.ts`: Ada's call.** I withdraw per-fix. If she declines, Thurgood.

**3. Three wordings, two files.**
- **`harness/expected/**`**: no producer seat gets it. We agree on that. I take Stacy's form: it changes under spec rows only.
- **`pins.yaml`**: I accept Data's view and keep it out, for the same self-greening reason. **Residual, Peter's:** on iOS a forced pin move is a repair, not a choice, and it waits for a grant while a required check is red. The alternative is the `ios:` section in my scope, with Thurgood reviewing.

**4. I move to a ballot now.** Data showed that a U12 trigger is late by construction. Stacy showed that an iOS clause activating at the first iOS promotion costs nothing. I accept Thurgood's sequencing: after #745, after the application PR, before U12 merges. Data holds the pen and I write the iOS clause. I also accept Thurgood's red-first, no-decision-change clause.

**5. Peter's.** My lean is still the split.

**6. Accepted.** The iOS paths are `harness/ios/**`, `probe-swift.ts`, `parse-swift.ts`, their tests, `fixtures/swift/**` and `fixtures/parse-swift/**`.

**7. No timing change.** It feeds item 3's residual. One more point: the iOS lane writes no `harness-infra`, so a missing Xcode reads as a code failure. I'll file a record for that before the first iOS promotion. I own it, and Thurgood is consulted under D-1.

**Source**: `crossread-stacy.md`, sha256 `c1fa57aa2f667dfd9a456dacdee341b26e7c02e64ccc72a2caf7024c734a6e56`

#### [STACY R2] — cross-read

Read at `origin/main` `894d87436`.

**Item 1, `compare.ts`: Thurgood.** Its header reads "Owner: Thurgood" (L2). Kenya's grants would also work, and my read is the same either way, so this is not a real split.

**Item 3: one position, with one real difference.**
- No standing scope covers `harness/expected/**`. All four agree.
- Spec rows and Kenya's grants both work for me. Each leaves a record before the merge that I can read.
- **The difference is `pins.yaml`.** Kenya's case for putting the `ios:` section under her standing scope is strong. But a pin move changes what the lane measures.
- Settlement: a grant per move. If Peter makes it standing instead, each move's PR cites a CI re-measure, and the file joins my instrument-path read.

**Item 4: I adopt Thurgood's trigger, which fires when U12's PR opens.**
- Kenya's iOS record works for me if it holds the first iOS promotion offer.
- Promotion is an ARMING event, so I would check at its merge that the scope was ruled first.
- One ballot or two is Peter's call.

**Item 5: Peter's call.** From the claims view, there is one cost. If Thurgood owns every producer, he would write both sides of the D-1 interface and review himself.

**Item 6:** no one objected. My read applies under every option.

**Item 7 changes my demotion read, not my timing.**
- I checked iOS `lane.ts` L656 myself, and it throws `toolchain missing`. I have not checked Kenya's claim that the job then writes no `harness-infra` annotation.
- If her claim holds, I will record such a run as `not re-verified — toolchain missing`, never as a code failure.
- Adding a title for that stop needs Thurgood's D-1 consult. I'm routing that to Kenya and Thurgood.

**Source**: `crossread-thurgood.md`, sha256 `ce3088c411b1edee44b6329bdde1749eccc5a626fcd722a93a0f37eb262822e8`

#### [THURGOOD R2] — cross-read

**1. `compare.ts`: I keep it.** Stacy changed my reason. `compare.ts` admits additions to the expected lists, so it is part of the verdict oracle, not just a producer, and it belongs with the reader rather than with either lane. That reason matters more than the fact that I wrote it. To Kenya: a `compare.ts` break turns all four contexts red, so a per-fix grant would be slowest exactly where the exposure is widest. Settlement: my standing scope, and Data and Kenya each review `compare.ts` changes on their platform (Stacy's mirror).

**2. `consumer.ts`: Ada's answer comes first.** It drives pack, install, init and generate, which is the CLI surface. A break there fails `harness-generate`, so all four contexts go red. If Ada declines it, I would accept it on the same terms as `compare.ts`, rather than leaving it on grants.

**3. One position on `expected/**`, two on `pins.yaml`.** All three entries agree that no seat holds standing write over the expected lists. Spec rows and issue-row grants are both acceptable routes. `pins.yaml` is a separate question. Kenya's point is that moving the pin is the predictable iOS repair, and that persuades me. Settlement: each platform seat gets its own platform's hunk of `pins.yaml`, but only for a move that restores a red with no intended change. That PR has to cite the red run and a green CI measurement. Any other pin move goes by grant.

**4. Timing: one ballot now.** Android activates at U12's merge, and iOS at the merge of the first iOS promotion, as Stacy proposed. That gives Kenya the iOS timing he wants without a second round, and he said he does not object to one ballot.

**5. Me owning every producer: I recommend against it, and the pick is Peter's.** Gradle and Xcode repairs need judgment my seat does not have. It would also put both ends of the D-1 interface in one seat, which removes the cross-seat check.

**6. Stacy's condition: I accept it.** Her ARMING read also answers Data's point that standing scope removes the merged record of a fix's intent, because the read sees each producer PR after it merges.

**7. Kenya's Xcode claim does not change my timing.** I have not checked it. Before promotion, a dropped image stalls the measurement; it does not block merges. The claim is the case for having the pin hunk in scope when the iOS clause activates.

### Round 3 — the orchestrator's two leans, tested

**Source**: `round3.md`, sha256 `837d1f62a7bbe4539b46cde90debceb9007b411fc0a403cbe3704461c0eadcd7` (the orchestrator's brief, fenced)

````markdown
# Round 3: test the orchestrator's two leans (read-only)

Peter, 2026-11-07T23:17:52Z: "Re: press settings and `consumer.ts`, Inform to leans to the relevant agents to better inform the lean if necessary / Re: Thurgood owning, I can confirm "no" and we can pursue the class option?"

So two things are already settled:
- **Thurgood does not own every producer.**
- **The class option is being pursued.** That option is the per-role split everyone agreed in rounds 1 and 2:
  - lane seats own their own lane;
  - Thurgood owns `compare.ts`, with review;
  - workflows get per-fix grants;
  - the expected lists change only under spec rows or issue-row grants;
  - the producer paths join Stacy's ARMING read.

  It goes into one ballot, with Data holding the pen and Kenya writing the iOS clause.

What Peter wants is the orchestrator's two leans tested against your seat before he rules. The leans are untested. **Argue against them if you disagree.**

## Lean 1: `harness/pins.yaml`, option (b)

Each platform seat holds standing scope over **its own section only**: Kenya over `ios:` and Data over `android:`. Three conditions:
- Thurgood **reviews** every move, in the F-4 "review" sense: a review entry is owed and the PR cites it.
- Every move's PR cites a CI re-measure: the lane's run at the PR head, with the before and after diagnostics and verdicts.
- `pins.yaml` joins Stacy's ARMING instrument-path read.

**Why the orchestrator leans this way.** On iOS, a forced Xcode move after GitHub retires an image is a repair, not a choice. Under (a), a red required check waits on a grant merge.

**What survives against it.** A pin move changes what the lane measures, so a seat could make its own red go green. Under (b), review catches that after the PR opens. It does not prevent it.

## Lean 2: `scripts/harness/consumer.ts`, option (a) with review

Ada holds standing scope over it, because she led Tasks 1, 14 and 15. Thurgood **reviews** every change, in the F-4 sense. The fixture and the Req 2.1–2.2 rules stay on spec rows, as Ada said.

**Why the orchestrator leans this way.** The expertise stays with Ada, and an independent seat checks it. This is the pattern Peter ruled for `native-rules.ts` (F-4 (a)).

**What survives against it.** Ada would write both the generator and the driver that tests it. Review narrows that gap but does not close it the way separate ownership would. **Ada named this herself.**

## Your job

For each lean:
- Does it hold from your seat? Give the strongest objection, and the change that would make you accept it.
- Is any of the conditions above wrong or missing?

Write `round3-<seat>.md` in this directory, under 250 words. Reply in under 50 words.
````

**Source**: `round3-ada.md`, sha256 `952c643c980b9f24b1f3d879297ba84b3ea13751fc1459b38e75ede6e5ac7c8b`

#### [ADA R3] — the two leans (read at `origin/main` `894d87436`)

**Lean 2 (`consumer.ts`): it holds, with three changes.**
- **Strongest objection:** the risk is not bad CLI code. It is a change to the driver that hides a gap in the generator: pruning a file, skipping a step, or narrowing what it carries. Thurgood reviewing my intent will not catch that reliably.
- **Change 1, so the review is of a set:** every `consumer.ts` PR cites a CI run at its head, and the generated-file list in `harness-consumer.json` and `harness-tarball-files.txt` before and after. Every removal has to be explained.
- **Change 2, Thurgood's clause:** owning the driver does not authorize changing what it decides. A repair is red first.
- **Change 3, conditions missing from the lean:**
  - `consumer.ts` and `consumer.test.ts` join Stacy's ARMING read, with deletions-zero.
  - Data and Kenya review any change to the consumer-root layout, since they read it.
- **I can't accept a ban on co-change.** A CLI change and its driver change have to land in one PR, or the required check goes red. In that PR, the review covers the driver hunks by name.

**Lean 1 (`pins.yaml`):**
- **Gap:** the lean leaves out the `consumer:` section.
  - `name` and `abbreviation` go to me as a hunk, with the `DP` refusal fixed by Req 2.2.
  - `productTokensFixture` defines the fixture, so it changes only under spec rows.
- **I prefer Thurgood's narrower form:** only a move that restores a red is standing; every other move goes by grant.
- **One condition that prevents rather than reviews:** a pin-move PR may not touch `harness/expected/**`. Then a seat cannot move a pin and also edit the expected list that would turn its red green.

**What survives:** the post-merge reads still come after the merge. That is Peter's to weigh.

**Source**: `round3-data.md`, sha256 `38dbb5b26aead533cdf71f56fe91917eee804419d624bd9b45ede9d835ac2ee5`

#### [DATA R3] (`origin/main` `894d87436`)

**New Android fact (verified):** the job uses the image's default JDK, `JAVA_HOME_17_X64`. The pinned `java.version: "17.0.21"` is part of the toolchain match (`compare.ts` L736–744). When `ubuntu-24.04` takes a JDK patch, the required context goes red and no PR author is at fault. That is Kenya's iOS class, on Android. How often it happens is unverified.

**Lean 1 holds, with one change.** Review only catches self-greening after the fact. The comparator can prevent it.
- When a PR changes the pins, `compare.ts` L837–849 admits growth in the expected lists as "added (a)" without asking why.
- **Required condition:** a pin move under standing scope changes nothing in `harness/expected/**` or `protected-set.txt` in its PR or unit. Green then means the new toolchain reproduces the old list exactly. A move that needs additions goes by spec row or grant.
- **Second condition, Thurgood's:** the scope covers repair moves only. The PR cites the red run on `main` and the green re-measure.

**Class option, under a separate grant:** pin the JDK through `actions/setup-java`. That removes the Android trigger. Its cost is a new download host that `REGISTRY_HOSTS` does not classify.

**Lean 2 holds, with two additions.**
- Data and Kenya review changes to the consumer-root layout and to `harness-consumer.json`, as Ada offered.
- The same prevention: a `consumer.ts` change under standing scope ships with no change to `expected/**` or `fixtures/**`. A pruned compile then reads as `not-run` (L525) and fails, instead of hiding a gap.

**Source**: `round3-kenya.md`, sha256 `eb51e456e8808016057f2314477cdb713174f9f4243d41d14d9882fdcf51d131`

#### [KENYA R3] — the two leans (`origin/main` `894d87436`)

**Lean 1, `pins.yaml` (b): holds, if narrowed.**
- **Objection:** if any move is allowed, I can turn my own red green on purpose.
- **Accept with Thurgood's narrowing:** standing scope covers only a move that restores a red with no intended change, and the PR cites that red run. Any other move goes by grant.
- **Missing conditions:**
  - The same PR changes no expected list. A move that needs one is not a restoration.
  - Only `ios.image` and `ios.toolchain`. `runner` must match the workflow's `runs-on`, so it needs that file's grant. `deploymentTarget` is Core Goals' minimum, which is law.
  - A change of Swift version carries the reserved-word re-measure at the new pin (K-F2).
- **Residual:** a review is owed before the merge, but a reviewer can still miss a deliberate move.

**Lean 2, `consumer.ts` with Ada, Thurgood reviewing: holds, with one reviewer added.**
- **Objection (verified):** my lane reads its themes only from `harness-consumer.json` (`probeConfigFromManifest`), and a manifest with no `themes` key reads as none. So a `consumer.ts` change that dropped themes would make the iOS instance check pass while checking nothing.
- **Accept if:** Data and Kenya each review any change to the manifest or the root layout, as Ada offered. The lean names only Thurgood.
- **My side:** I'll file a record that the lane refuses a manifest without themes when the fixture registers themes. It's a producer change, consulting Thurgood under D-1.

**Source**: `round3-stacy.md`, sha256 `a953e1753395653af27efd5d3841a10571040ee3ff2d256d67135a8a9de74e7a`

#### [STACY R3] — the two leans

Read at `origin/main` `894d87436`.

**Lean 1, `pins.yaml` (b): I drop my grant-per-move lean, if narrowed.**
- `compare.ts` fails a context on any `new`, `count-above`, `count-below` or `stale` entry (L778–796). So the context is green at the head with an unchanged expected list only if the run reproduces the listed failure set. (Blocked-probe `probe` entries skip `stale`.)
- A pin move that hides a failure therefore shows as `stale`, and the self-greening risk becomes decidable.
- **Objection to (b) as worded:** one PR can move the pin and edit `harness/expected/**` together. Review sees it only after the PR opens.
- **My conditions:**
  - The base run is red with class `toolchain` or `toolchain missing`.
  - The PR touches no `harness/expected/**`.
  - `deploymentTarget` is unchanged (L48), because it is Core Goals' minimum.
  - The other sections parse equal.
  - The context is green at the head.
  - Any other pin move needs a grant.
- **Missing:** Thurgood's review is cited on the `**Consulted**:` line.

**Lean 2, `consumer.ts` (a): I accept it, with the same invariant.**
- Ada's own objection stands: changing the driver can shrink what gets tested.
- **My condition:** a standing-scope change keeps the expected lists unchanged, with every context green at the head. A change that needs a list edit goes under a spec row. `consumer.test.ts` gets deletions-zero.
- **Missing:** Data and Kenya review changes to the consumer-root layout and `harness-consumer.json`, as Ada named them.

**Source**: `round3-thurgood.md`, sha256 `73ae24ed6a37bc214ea482d365e5202cbdaaf32f72947209e0e6130725d1577a`

#### [THURGOOD R3] — testing the two leans (read at `origin/main`)

**The review load is acceptable.** Each new review is rare: an iOS pin move every few months, and `consumer.ts` changes that mostly come with 132's rows. The real cost is that I sit in five review chains (`native-rules.ts`, `compare.ts`, D-1, pins, `consumer.ts`), so my seat is a single point of latency. The duty is an entry owed in the same unit, not a gate, which keeps that latency bounded.

**Lean 1 holds, with one change.**
- **Most of the self-greening is closed mechanically.** `compare.ts` (L736–792) checks the observed toolchain against the pin, and it compares both ways: new failures, stale entries and count changes are all red. So a pin move cannot hide a diagnostic unless the expected list moves with it.
- **Change to accept:** the standing scope covers a pin move only when both of these hold:
  - the red run it cites failed on environment reasons only (`toolchain` reasons, `toolchain missing`, or `harness-infra`);
  - the PR changes nothing under `harness/expected/**`.
- **Why.** A red with new failures or count changes is never repaired by a pin move under standing scope. Each of these conditions can be checked from the verdict line and the diff, before review starts.
- **Add** Ada's `consumer:` section, as she proposed.

**Lean 2 holds, with one change.**
- **Strongest objection:** I can't judge which generated files should exist. So a change that prunes a theme or a platform is exactly the kind my review would miss.
- **Change to accept:** a `consumer.ts` change that shrinks the generated-file listing compared with the merge base goes by spec row, never by standing scope. That listing is in `harness-consumer.json` and `harness-tarball-files.txt`. Shrinkage can be read from the artifacts, so I am not checking from memory.
- **Not barred:** Ada changing `src/cli/**` and `consumer.ts` in one PR. That is the case standing scope exists for.
- **Conditions:** Stacy's ARMING read covers `consumer.ts` (Ada accepted). Data and Kenya review layout changes.

### Incorporation

#### [DATA R1] — author's draft, 2026-11-07 (conflict restated: the author is drafting his own charter's scope)

Where each pre-draft point landed:
- **The split** (all five seats, R1–R2; ruled): items 1, 2, 4, 5 and 6.
- **`compare.ts` to Thurgood** (Stacy R1, Thurgood R1–R2, Data and Kenya R2, Ada R2): item 4, sites 7, 8 and 11.
- **`consumer.ts` to Ada** (Ada R2; Thurgood and Kenya R2 defer to her): item 5, sites 5 and 6. Her three R3 changes are C2, C5 and C4's layout reviewers; Thurgood's R3 change is C3; Data's and Stacy's R3 invariant is C6.
- **`pins.yaml` (b)** (Kenya R1–R2, Thurgood R2–R3, Stacy R3, Data R3): item 3. P1 is Thurgood's and Stacy's environment-only red. P2 is Kenya's field list. P4 is Ada's, Data's and Stacy's unchanged-files rule. P5 is Stacy's green at the head. P6 is the lean's review. P3 is the author's addition (F-2).
- **`consumer:`'s owner** (Ada R3): item 3.
- **`expected/**` by spec row or issue-row grant** (Kenya R2 and Stacy R2, one position; ruled): item 6.
- **`native-harness.yml` by per-fix grant** (all seats): item 6 and § 5.
- **Stacy's condition** (R1; accepted by every seat): item 8 and site 10, her words.
- **Timing** (Thurgood R1 sequence; Stacy R1 activations; ruled): item 7 and § 5, with Thurgood's R1 fallback trigger.
- **Data's R1 fork, Thurgood owning every producer**: ruled "no"; residual 2 in § 9.
- **Kenya's iOS records and Data's JDK class option**: outside this ballot (item 2; § 8).

---

## 11. Review round (this draft)

Reviewers enter here in the Spec-Feedback-Protocol stamp format. Kenya's iOS clause replaces the placeholders in § 3 item 2 and § 4 sites 3, 4 and 9 (b).
