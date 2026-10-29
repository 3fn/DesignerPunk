# Release Flow Under the PR Gate

**Date**: 2026-07-05
**Purpose**: The release sequence once `main` is branch-protected (Spec 125-A) — how version bumps, release notes, and the token-index traverse the gate, and why `npm publish` no longer touches git
**Organization**: process-standard
**Scope**: cross-project

> Built by Spec 125-A Task 2 (Req 4.4, form (a): **traverse — no standing exemption**).
> Task 4's law application references this doc. Before this reconciliation,
> `package.json`'s `postpublish` pushed a token-index commit directly to `main`,
> which would hard-fail MID-PUBLISH the moment branch protection lands (Task 3).

---

## The rule

**`npm publish` is a read-only git citizen.** Everything that must land in git —
version bump, release notes, regenerated `token-index/` — lands via a **release PR**
that traverses the gate *before* publish. Publish happens **from merged `main`**.
Nothing in the publish lifecycle commits or pushes.

## Deriving the delta (the judgment half — added 2026-08-12, Q6 ballot; proven by the v14.0.0 release)

Before step 1 below, the release author derives-classifies-ratifies:

1. **Derive**: `git log $(git describe --tags --abbrev=0)..main --oneline` (all changes — squash titles are the changelog spine) and the same log scoped to the SHIPPED surface — **authoritative list: `package.json` `files[]`** (`src/` alone misses served-content roots like `governance/`; v14's docs-corpus entry lived there). Issue-driven work appears ONLY here — never assume spec summaries cover the delta. The release's blocking test and due-row paste run at item 3a, once the bump is ratified.
2. **Classify** each change 🔴 breaking / 🟡 minor / 🔵 patch-internal, reading task summaries or PR bodies for substance.
3. **Peter ratifies the bump**; notes are hand-authored at `docs/releases/release-X.Y.Z.md` (v14.0.0 = format precedent) and ride the release PR below.
3a. **The walk** (ballot 2026-10-18-obligation-drain-and-release-falsity-floor M3, M7), before the release branch. **The blocking test**: **nothing ships that the release knows is false at the place where its reader meets it.** "Knows" = the rows of the walk record. A disclosure counts only where the reader meets the falsehood: agents never read the CHANGELOG, so served docs, MCP contracts and agent charters are fixed, not disclosed. The scope sentence counts as a shipped sentence. Every other row is carried with one bulk line per record (SHA, home, trigger). A **floor-class row** is a row whose record meets the P0 definition, whether or not it carries `**Class**: P0`. Every floor-class row, carried or read as not false at its reader, goes to Peter in one batch per release as `**Open for Peter**:` lines in the walk record's PR, held until he answers. The author's reading is one line offered with each row, never a carry. Only Peter waives a floor-class row, and his batch answers count as waivers only if quoted and dated, from outside the diff. Then, on up-to-date `main`:
   ```bash
   echo "main at: $(git rev-parse HEAD)"; V=<ratified version>; VE=$(printf %s "$V" | sed 's/\./\\./g')
   (set -o pipefail; grep -nE '^\*\*Trigger\*\*: `(release:('"$VE"'|next):phase-1|tag:v'"$VE"')`' .kiro/issues/*.md | LC_ALL=C sort); echo "due-rows exit $?"
   (set -o pipefail; grep -nE '^\*\*Class\*\*: P0' .kiro/issues/*.md | LC_ALL=C sort); echo "P0 exit $?"
   ```
   Both greps print their hits sorted (`LC_ALL=C sort`), so the walk record's paste is the same in every shell, and `pipefail` keeps the printed exit code grep's: `1` still means no hit. *(amended 2026-10-29 by ballot 2026-10-26-release-flow-batch-16-1, RS-46; prior text at `08b9c7a8e`)*

   **The walk record** is `.kiro/issues/<date>-release-<V>-walk.md`, an issue record (`**Owner**:` the walk's author; ``**Trigger**: `release:<V>:phase-1` ``; `**Class**: P2 obligation (record) · owed-act`), landed by a record-only PR before the release branch. It carries the `main at:` SHA, both commands verbatim with their outputs and exit codes (an empty result pasted as empty), and one row per due hit, per P0 record and per row of the release's findings records: `| record | floor-class? | disposition | evidence |`. Each disposition is **fixed** (the PR), **carried** (one bulk line: SHA, home, trigger; a floor-class row per M7), **waived** (Peter's quoted, dated words, sourced outside the diff) or **lapse** (rule 11). It closes and archives after phase 1 (rule 5).

   A due row the grep misses **on a record that carries a token**, noticed by a claims pass or the monthly walk, is a **miss**; the second miss promotes the grep to a committed script under a scoped grant (the owed-set ladder's first rung). A record with no token is a back-fill finding (rule 1), not a miss.

   The walk record reprints the priorities record's "Peter-gated deferrals" list (answered rows only, no P0 record) as one block headed `Peter-gated deferrals: answers on record, reprinted; nothing here holds the merge`, never as `**Open for Peter**:` lines. A row Peter takes up is re-ruled by its owner. *(Ballot 2026-10-20-manual-records-routed-readers, E3, F-2 (i).)*

   **A pre-S read of release text** (any seat's read, before S, of the release notes, the `CHANGELOG.md` entry or other packed text) names each sentence it finds false and why, with the evidence. It proposes no replacement sentence. The replacement is written by the text's owner (the release author for the notes and the `CHANGELOG.md` entry, the content owner for a served doc or a charter), who reads it against that evidence before the release PR merges. An owner who is handed replacement text by the reader says so at that exchange, and writes its own. *(added 2026-10-29 by ballot 2026-10-26-release-flow-batch-16-1, RS-33)*

   **The delegate audit is owed before phase 1** (ballot `2026-10-01-signing-act-chain` § 5.3, whose rotation and backlog clauses name the seat and the population). The walk record carries one row for it, which is not a record row: the delegate seat, the path of Thurgood's brief, and the output path that brief names. Its disposition is `owed` until the seat commits that file, then the file's path @ SHA. The orchestrator dispatches the seat (§ 5.3). A file not committed when phase 1 runs is § 8's trigger (d) at this release. *(added 2026-10-29 by ballot 2026-10-26-release-flow-batch-16-1, RS-37)*
4. Publish mechanics: § "The sequence" steps 5–6 — **one tarball, built by `scripts/release-publish.ts` in a fresh clone at the tag, published unchanged to both registries**. The public-npm flags are written out in step 5.4. They were previously only in "the dual-registry playbook", which is not in this repo, so a fresh session could not find it. Auth note: public npm needs Peter's login/2FA, and the token expires in about 30 days, so an expired npmjs login now surfaces as the 5.3 preflight refusal (RS-31), with the same remedy (`npm login --auth-type=web --registry https://registry.npmjs.org`); an E404 on a 5.4 publish is still a masked auth failure, after a login that lapsed since 5.3 or a 2FA failure. **The release notes disclose any change in embedded dependency versions against the previous release's public artifact** (the first instance is § "Dependency disclosure" of ballot `2026-10-03-hermetic-publish-path`).
5. **Claims-pass owed set + the arming question** — see the named step below. **Both lines produce artifacts, not reminders.**
6. **Onboarding trio** (from release 4): recipe step 6 in `governance/release-management-system.md`. Where the runs sit relative to the tag is set by the trio protocol (Spec 123 Task 25). The obligation's tracking record is Spec 123 Task 28.4's.

### Step 5 — run the owed-set query, paste its output, and confront the arming question

Release is where both of this repository's consumer-reaching completion-claim escapes crossed. Two named lines run here, at release-prep start.

#### 5a — RUN the owed-set query and PASTE its output into release-notes prep

**The predicate**, verbatim:

> **`closeout-owed(S)`** ⟺ S's final declared unit has merged **AND** `.kiro/specs/S/completion/claims-pass.md` does not exist **AND** that merge is dated on or after the ratification date recorded in `.kiro/docs/ballots/2026-09-19-completion-claims-integrity.md`.

**The query** is a committed script since Peter's "Yes." of 2026-10-21 (`.kiro/issues/2026-10-19-owed-set-query-over-lists-in-progress-specs.md`; the ladder's first rung, below). Run it on up-to-date `main`; paste what it prints.

```bash
bash scripts/owed-set.sh
```

It reads the ratification date from the ballot's `Ratified-machine:` line and pins the boundary to 00:00 on that day (CLOSEOUT pilot F-1, 2026-09-19: a bare date resolves to the current time of day and drops that day's earlier merges). It prints one row per spec that a first-parent commit since then touched, `<class>\t<spec>\t<reason>`, with exactly one class per spec, decided in this order:

- `closed` — `completion/claims-pass.md` exists.
- `stub` — no `tasks.md` (a charter-only spec); the reason names its files.
- `open` — at least one unticked parent (`- [ ]` at column 0); the reason gives `N of M` and says a checkbox is an assertion, not a merge fact.
- `touch-only` — no post-ratification first-parent commit changed `tasks.md` or `completion/**` (a feedback, inbound or post-closure touch); the reason names the last touching commit.
- `candidate` — everything else; the reason gives the unit class and the anchor.

**Rows are candidates, never verdicts.** `open` and `touch-only` are heuristics over checkboxes and paths, not merge facts; where the operator knows a row is wrong, the operator says so in the pasted output.

**What each unit class means, and why class (b) is spelled out**: **(a)** the spec declares units in any recognized form — the canonical `## Declared Merge Units` heading, the legacy bold-prose declaration, or a heading containing "merge unit", tried in that precedence order — so CLOSEOUT anchors on the **final declared unit**. **(b)** no units block and a single PR: that PR **is** the spec's only unit. *This is the corpus's most common shape, and a stage that silently drops it produces a healthy-looking short list — the exact failure this enumeration exists to make impossible.* **(c)** no units block, more than one PR: the anchor is the PR carrying the **last parent completion doc**.

**The one judgment point, named rather than hidden**: the anchor printed is *the most recent first-parent commit touching the spec*. For class (a) that is a proxy for "the final declared unit merged" and for class (c) a proxy for "the PR carrying the last parent completion doc". **Where the proxy and the definition disagree, the definition governs and the operator says so in the pasted output.** A wrong owed-set result noticed here is fixed in the script, with a falsification case in `scripts/__tests__/owed-set.test.ts`.

**The last line counts every class, so a wrong answer is a falsifiable count rather than a healthy-looking short list**: `owed-set: <n> candidates; excluded: <c> closed, <o> open, <s> stub, <t> touch-only; classes a/b/c = …; <p> specs without activity since <date>; adoption <date> from <source>; ref <sha>`. The rows sum to the counts and the unit classes split the candidates, so a dropped class is an arithmetic error. Stacy's command catalog (`canonical/agents/stacy.md`) names the same call; this step and the monthly health check's LIVENESS item are its two run surfaces.

**An empty set is pasted as an empty result**, and so is an `owed-set: unavailable (…) — continue` line: the script exits 0 always (a read, never a gate). The step produces a record either way — that is the whole point of running a query instead of recalling an obligation.

*Note on the MIDPOINT record*: a spec declaring ≥ 3 units carries its midpoint pass at `completion/claims-pass-midpoint.md`. The predicate above, and the script, key on `claims-pass.md` **exactly**, so a midpoint record never discharges a closeout obligation.

#### 5b — *"if arming is undecided, decide it now"*

**Release-prep start — concretely, the creation of the version-bump PR — is the event anchor for the `completion-criteria-parity` arming decision.** If that decision is still open when this step runs, **it is decided here**, not deferred past a release. Deciding **not** to arm is a lawful outcome: the evidence guard forbids arming before the convention has shipped, the Tier-3 worked example is fixed, and **N ≥ 5** in-scope parents have completed under the convention with parity **measured by audit, not by the checker**. What is not lawful is shipping a release with the question unexamined.

> **Note (Peter, 2026-09-26, PR #205 — added adjacent to the ratified paragraph above, not part of it):** this same sitting also decides `.kiro/hooks/complete-task.sh`'s **authoring-time** parity check — whether it stays advisory or becomes blocking. That check is **advisory until this sitting decides otherwise**; see the script's header comment and its parity-check block.

*Recorder's note (Thurgood, 2026-10-24), not part of Peter's note above: the sitting ran at 15.0.0 release-prep on 2026-10-02. It armed the CI check, and this authoring-time check stays **advisory** — the `completion-criteria-parity` register row's 2026-10-02 history entry, merged by #267 (`70f8fe54f`). Peter's quoted words there name the CI half; the advisory local mode rides the entry he merged.*

#### The staged-mechanization ladder, and its named de-facto detectors

The owed-set query began as **documented commands, not a committed script**, deliberately. Its promotion path is pre-committed and is the only path:

**documented pipeline → (second wrong result) committed script + scoped grant → (the Q2 re-evaluation sitting) publish-hook decision.**

**The first rung fired on Peter's "Yes." (2026-10-21)**: the query is `scripts/owed-set.sh`, built under the scoped grant in `.kiro/issues/2026-10-19-owed-set-query-over-lists-in-progress-specs.md`. The next rung is the Q2 sitting's.

**The de-facto detectors are named**: a wrong owed-set result **noticed in ordinary use** is how the first rung fired and is how the script's defects are found, and the two ordinary-use surfaces are **(1) the LIVENESS read at the monthly Civitas health check** and **(2) this release step**. No detection project is created and no new obligation is added — the two places the query is already run are the two places a wrong answer is already visible. *Recorded honestly: this is detection-by-use, not detection-by-guard. It cannot catch an omission that neither reader recognizes. It converts an unfireable trigger into a fireable one; it does not make the pipeline self-checking.*

**Successor release tooling inherits this step as a REQUIREMENT, not as a convention it may re-derive.** Any future release tooling that replaces this document carries step 5 forward in both halves — the run-and-paste owed-set query and the arming line. **There is to be no parallel second mechanism**: the ladder above is the only path from documented pipeline to automation.

*(The automated analyze/notes/release CLI was retired 2026-08-12 — ballot `2026-08-12-q6-release-manager-retirement.md`. Tag and GitHub release are manual, and they are **two separate acts**. The tag is pushed at § "The sequence" step 5.2 (`git tag -a vX.Y.Z <S> && git push origin vX.Y.Z`). The GitHub release is created **last**, at step 7, only after step 6's rail PASS and a matching 6b record (`gh release create vX.Y.Z --notes-file docs/releases/release-X.Y.Z.md`). Erratum 2026-10-03, ballot `2026-10-03-hermetic-publish-path`.)*

## The sequence

1. **Release branch**: `git switch -c task/<spec>-<N>-<slug>` (or `chore/release-vX.Y.Z`
   for a standalone release) from up-to-date `main`.
2. **Prepare the release on the branch**:
   - version bump in `package.json` (and any sub-packages),
   - release notes (`docs/releases/release-<version>.md`) **and the consumer `CHANGELOG.md` entry** (retitle `## [Unreleased]` to the version, with no date in the heading: the packed file is S's, so no step after S can date it, and the release's date is its tag's; recipe step 4 in `governance/release-management-system.md`; *(amended 2026-10-29 by ballot 2026-10-26-release-flow-batch-16-1, RS-34; prior text at `08b9c7a8e`)*),
   - **before the entry says that a file, an export or a generated output was added, kept, removed or changed, compare the packed output with the previous public artifact**, and paste the results, naming the commit they ran at, in the release PR body. This release's tarball: after `git fetch origin`, `npx tsx scripts/release-publish.ts --dry-run <the release branch's pushed head>`, run from the main checkout (a dry run of a commit not on `origin/main` is allowed, with a warning). The previous release's tarball: `npm pack @3fn/core@<previous version> --registry=https://registry.npmjs.org --@3fn:registry=https://registry.npmjs.org --pack-destination <tmp>`, its sha1 shown equal to the previous release's step-6 record. The file set: `LC_ALL=C comm -3 <(tar -tzf <previous>.tgz | LC_ALL=C sort) <(tar -tzf <this>.tgz | LC_ALL=C sort)` (column 1 removed, column 2 added). The generated files the entry describes: a `diff` of each between the two extracted tarballs; the build-timestamp files (`TokenTypes.*`, `tool-manifest.json` and the others the release records name) differ in their stamps alone. At each S, the author repeats the file-set compare on 5.1's tarball before the tag, and pastes it in the step-6 `.txt` (`docs/releases/<v>/publish-verification.txt`) under its own heading, with the UTC time it ran. *(added 2026-10-29 by ballot 2026-10-26-release-flow-batch-16-1, RS-39 and RS-25)*
   - **regenerate the token-index**: run `npm run build` (its generation steps
     refresh `token-index/`), then commit any resulting `token-index/` diff.
3. **Open the release PR** (`./.kiro/hooks/complete-task.sh` for spec-task releases,
   or `gh pr create` for standalone chores). Required checks run on the PR.
4. **Peter merges on green.** The version bump + notes + token-index land on `main`
   as one squash commit.
5. **Tag, then publish ONE tarball from the tag.** The release commit is the release PR's squash commit **S**. A later record-only PR never changes what is tagged or published.
   - **5.1 Dry run at S, before the tag is pushed**: `npx tsx scripts/release-publish.ts --dry-run <S>`, **run from the main checkout**.
     - It works in a fresh clone at S: `npm ci`, then `check:drift`, then `npm pack` with lifecycle scripts on, so `prepack` builds.
     - **Before the pack** it regenerates `floor-closure.json` in the clone and compares it with the committed file as parsed JSON, `generatedAt` ignored. A difference refuses: the committed closure is stale, so regenerate it (`npx tsx scripts/floor-closure.ts`), commit it, and cut the release again.
     - **After the pack** it runs `verify:token-index-clean`, because the build inside `prepack` regenerates the index.
     - It then runs `pack-assert` on the tarball: no leftover `dist/` files, the MCP bundle shape (root `node_modules` only), no machine path in any packed text file (`/Users/`, `/home/`, `/private/var/folders/` and the clone root, matched only at a path boundary, so `abc.com/home/…` in a URL is not a hit), no `dist/{ios,android,web}/**`, the eight root token files, `themes: []`, the closure present.
     - **The publish-path floor**: it refuses if fewer than 16 of pack-assert's `publish path:` findings passed (section 10 did not run in full). The tally line ends `publish path: N (floor 16)`.
     - **Keep its output**: the dry run's `N/M assertions passed.` tally, its `publish path: N (floor 16)` line and its sha1 are pasted into the step-6 `.txt` (A3).
     - `<S>` may be abbreviated here, if it resolves in the main checkout. `--source <path>` (clone from somewhere other than this checkout's `origin`) takes an **absolute** path: the clone fetches from inside its own temporary directory, so a relative path resolves there, not where you ran the command.
     - It runs these checks itself because a tarball publish runs no lifecycle scripts (P2).

     **Nothing is published.** A red stops the release before any tag exists; fix it on a branch and re-merge (back to step 1).
   - **5.2 Tag S** and push the tag: `git tag -a v<version> <S> && git push origin v<version>`. **The GitHub release is NOT created yet** (step 7).
   - **5.3 Publish to GitHub Packages**: `npx tsx scripts/release-publish.ts <version> --expect-sha <S>`, **run from the main checkout**, where `<S>` is the **full 40-character SHA** of the release squash (`git rev-parse <S>` prints it). GitHub Packages auth is that checkout's gitignored `.npmrc`; an `npm whoami` preflight refuses before any build if it fails, and it refuses from a worktree.
     - **Run 5.3 ONCE, from ONE terminal, and wait for its tally before touching anything else.** A second concurrent run builds a second tarball that the registry refuses (E409) and leaves an orphan work dir with no record that looks like a candidate; it is not one. The 16.0.0 record (`docs/releases/16.0.0/publish-verification.txt`, § "5.3 — a SECOND run (duplicate)") is the precedent. The script does not yet lock; a lock (`.kiro/issues/2026-10-18-release-publish-concurrent-runs.md` option (b)) is owed at the second duplicate run.
     - **The preflight checks both logins**: `npm whoami` runs against GitHub Packages and against public npm (registry named twice, A1) and refuses before any build if either fails (RS-31). It checks the login only: 5.4 runs in Peter's terminal with web 2FA, so it can still fail after a clean 5.3. A pass shrinks that window without closing it.
     - It repeats 5.1 in a fresh clone **at the tag**.
     - It refuses unless `--expect-sha` is a full 40-character SHA (a short SHA or prefix is refused), `v<version>` resolves to exactly that commit (an exact match, not a prefix), the tag commit is on `origin/main`, and the tagged `package.json` version equals `<version>`.
     - Every 5.1 refusal applies again at the tag, the closure compare and the publish-path floor included.
     - It then records the tarball's path, file count and sha1 in `release-publish-record.json` (in an OS temp dir; the script prints its path), publishes **that tarball** to GitHub Packages, and prints the public-npm command for 5.4 with the sha1 to check.
     - **Keep the tarball and its record until 6b is recorded** (A11). The record's full contents (commit, sha1, fileCount, bytes, pack-assert passed/total, createdAt) are pasted into the step-6 `.txt` (A3), because the temp dir is never committed and 6b's comparand must be.
   - **5.4 Publish the same tarball to public npm** (Peter's terminal, web 2FA): first check the printed sha1 against the file, then run `npm publish <tarball> --registry https://registry.npmjs.org --@3fn:registry=https://registry.npmjs.org --access public`. **Never a folder publish, never `--ignore-scripts`, never a tarball the script did not produce.** A folder publish is refused by `prepublishOnly`, which names this script. That refusal is the tripwire, not the guard: the guard is the script.
   - **Guards live in the command the operator runs, never in a list addressed to a seat** (RS-7). A release check that cannot be put in the script is written into this step's text, at the point where the operator meets it.
   - **A tarball publish runs no lifecycle scripts**: no `prepublishOnly`, no `postpublish` (npm 10.9.3 source; ballot `2026-10-03-hermetic-publish-path` P2). The script runs the pre-publish checks itself. **Step 6 is the only post-publish check.** `postpublish`'s `token-index/` warning fires only on a folder publish, which the tripwire refuses.
6. **Run the publish-rail guard and land its result via a release-record PR**
   (Req 6.4, 6.6, 6.7 — Spec 123 C9; `governance/classification-map.md` §
   "publish-rail-guard"):
   ```bash
   VERSION=<published-version> ./scripts/verify-publish-rail.sh
   ```
   This queries `registry.npmjs.org` directly over HTTP — no `npm` CLI, no
   `.npmrc` of any kind is read *(nor `~/.curlrc`; standard proxy environment
   variables such as `HTTPS_PROXY` are honoured)*. A non-zero exit means the release did not land
   where consumers install from: **do not announce it.** Fix and re-run before
   proceeding. **If it fails, read the registry's own record before re-running.**
   - If the packument (`curl -s https://registry.npmjs.org/@3fn%2fcore`) has no `time["<version>"]`, the registry has not recorded the version. Either it was never accepted (15.0.0's R-4: six 404s preceded the publish), or npm accepted it and is still processing it: npm prints "Your package is being processed and may take a few minutes to become available", and the measured windows are 10 min 59 s (16.0.0) and at least 1 min 59 s (16.1.0). Either way the 404 is the correct answer, not indexing lag, and the release is not announced. Read the packument again until `time["<version>"]` appears, and re-run the rail only then; this step sets no bound on the wait, because no publish has yet been measured that npm accepted and never recorded. npm's `+ @3fn/core@<version>` line is not evidence that the registry recorded the version: it printed for an out-of-flow publish of 16.0.0's tarball that the registry did not record (16.1.0's RL-36). *(amended 2026-10-29 by ballot 2026-10-26-release-flow-batch-16-1, RS-48; prior text at `08b9c7a8e`)*
   - If `time["<version>"]` is present and the rail still fails within a few minutes of it, re-run by hand.
   - This step never retries automatically.

   **6b — the two-registry record.** In the same `.txt`, first paste the script's comparands:
   - the 5.3 `release-publish-record.json` contents (commit, sha1, fileCount, bytes, pack-assert passed/total, createdAt);
   - the 5.1 dry run's tally line.

   Then record, for **each** registry:
   - the version is present;
   - the registry's own publish time, from the packument's `time["<version>"]`, never an operator estimate (RS-8);
   - the tarball's file count;
   - `dist.shasum`;
   - the sha1 of the fetched tarball's own bytes (`shasum` of the file), an independent read beside the registry's claim (A4).

   **All four sha1s (two `dist.shasum`, two fetched-bytes) must equal the sha1 pasted from the 5.3 record.** Any mismatch is a release incident: record it and stop before step 7. Published bytes cannot be replaced, so the remedy is Peter's ruling, not a re-publish.

   **Run every 6b command from the MAIN checkout.** That is the npm config 5.3's `whoami` preflight proved (A2). A fresh clone or a worktree carries no `.npmrc` (it is gitignored), and the GitHub Packages read there fails with E401.

   **Every `npm` command names the registry twice, `--registry <r> --@3fn:registry=<r>`** (A1). The main checkout's `.npmrc` maps the `@3fn` scope to GitHub Packages, and a scoped name follows that mapping over a bare `--registry`. Measured on 15.0.0 (Stacy R1): `npm view … --registry https://registry.npmjs.org` alone returned GitHub's sha1 `65d2ec0b…`; with the scope flag, npmjs's `48dd8cdd…`. Without it, 6b would have hidden the 15.0.0 divergence.

   Commands, with `<r>` = `https://registry.npmjs.org` or `https://npm.pkg.github.com`:
   - **npmjs, metadata**: `curl -s https://registry.npmjs.org/@3fn%2fcore` for `time` and `versions["<v>"].dist.shasum`.
   - **GitHub Packages, metadata**: `npm view @3fn/core@<v> dist.shasum time --json --registry https://npm.pkg.github.com --@3fn:registry=https://npm.pkg.github.com`.
   - **Each tarball**: `npm pack @3fn/core@<v> --registry <r> --@3fn:registry=<r> --pack-destination <tmp>`, then `shasum <file>` and `tar -tzf <file> | wc -l`.

   **Only if the GitHub Packages read fails on auth from the main checkout**, ask Peter for a `read:packages` token, and record that the fallback was used.

   **Land the result on `main`** — `main` is branch-protected, so a working-tree
   file is not enough. Paste the **full output of every step-6 rail run, failing runs included and in order, each with its exit code**, to
   `docs/releases/<v>/publish-verification.txt` (`.txt`, not `.log` — this
   repo's `*.log` gitignore rule would otherwise silently drop the file, the
   same trap Task 7.1's own bites hit once already) and open a small
   **release-record PR** for it, using the same mechanism step 3 already
   names (`gh pr create`, or `./.kiro/hooks/complete-task.sh` for a spec-task
   release) — Peter merges it like any other PR. This is a SECOND, POST-publish
   PR, distinct from step 3's PRE-publish release PR: step 3's PR cannot carry
   this file because the guard has nothing to verify until after step 5's
   publish has happened.

   This step is **mandatory**, not a documented instruction — the guard is a
   committed script, not a checklist reminder — and it is **never a PR check**
   (Req 6.6: the event it verifies, registry visibility, happens after merge,
   so there is nothing at PR time to gate). The RELEASE claims pass reads the
   committed `.txt` file to determine liveness (Req 6.7): a guard run is an
   event in the release *process*, not a diff in the release *delta*, so
   without a committed record the pass has nothing to read.

   **The RELEASE claims pass runs in two phases, recorded in one file** (Stacy's pass; this text sets *when* each phase runs, *what* each phase reads, and the method and the consequences each bullet below states; how she reads beyond that is hers) *(amended 2026-10-29 by ballot 2026-10-26-release-flow-batch-16-1, site 6, Stacy R2 and R3; prior text at `08b9c7a8e`)*:
   - **Phase 1** runs on **S after 5.1 is green and before the tag (5.2)**. A red 5.1 moves S, so phase 1 never reads a commit that will not be tagged (A7). It covers the release delta, the walk record (item 3a: its paste, its `main at:` SHA and each row's disposition), the 5a owed-set paste, the 5b arming line and 5.1's tally. It also re-runs item 3a's two greps at S and reads each hit the walk record does not row under rule 11's row test: a P0 among them is a floor-class row for this release, owed a fix or Peter's quoted, dated waiver before the tag (put to him as an `**Open for Peter**:` line in the phase-1 record's PR, which that rule holds until he answers; the read reports, and the tag stays his act); any other is listed with its rule-11 state *(added 2026-10-26 by ballot 2026-10-25-rule-11-post-walk-filings-and-spec-answers, site 3)*. At each S it also re-reads each `.kiro/issues/` record that a packed `CHANGELOG.md` sentence cites, and reads the sentence against it: a sentence its record has since made false is a finding against that S under 3a's blocking test *(added 2026-10-29 by ballot 2026-10-26-release-flow-batch-16-1, RS-41)*. It also reads, for each first-parent PR in the release delta whose diff changes a script named by path in `.kiro/hooks/RELEASE-FLOW.md` or in a `checks` line of `governance/classification-map.md`, both read at that PR's merge `<m>` (`git show <m>:<path>`), that PR's `**Straggler sweep**:` line (`.kiro/docs/ballots/README.md` § "Conventions"), read from the PR body (`gh pr view <n> --json body`, run for this seat by a session holding credentials), never from the squash message: a missing line is a finding on the PR's author, and each section the line lists is re-read at `<m>`, a section read as still false being a finding on the author too *(added 2026-10-29 by ballot 2026-10-26-release-flow-batch-16-1, RS-38)*. Its record lands by a record-only PR and states `publish-rail liveness: owed`.
   - **Phase 2** is a dated section appended to the same record. It reads the committed step-6 `.txt`: the rail result and the 6b two-registry record. **Its trigger is the merge of the step-6 release-record PR.**

   **Phase 2 may be drafted against that PR while it is still open.** If it is, it MUST end with a **merge-confirmation line** written at the PR's merge:
   - **Scope: every file phase 2 read from that PR**, not only the `.txt` (A6). It records `git diff --quiet <read-sha> <merge-sha> -- <each path read>`.
   - If a merged file differs from the read, the line records every changed hunk re-read and every phase-2 reading it changes.
   - **A finding resolved by a commit after the read stays in the record**, with its resolution and the resolving SHA. It is never deleted (A6; 15.0.0's R-4).
   - **Where it lands**: in phase 2's own PR if that PR is still open at the step-6 PR's merge. Otherwise it goes in a follow-up record-only PR. On 15.0.0, phase 2's PR (#274) merged 16 s after #273, and the line needed #275.
   - Until that line exists, the liveness reading is "read, not committed". (RS-9: on 15.0.0 the merged file differed from the one phase 2 read, and only the confirmation line caught it.)

7. **Announce last**: create the GitHub release (`gh release create v<version> --notes-file docs/releases/release-<version>.md`) **only after** step 6's rail PASS and a matching 6b record. Notes must not state a guard as applied before the step that applies it has run (R-3).

## What changed and why (Req 4.4 justification)

| Lifecycle script | Before | After |
|---|---|---|
| `prepublishOnly` | `build && check:drift` | `build && check:drift && verify:token-index-clean` — blocks publish if `token-index/` wasn't committed on the release branch. *Superseded 2026-10-03 (ballot `2026-10-03-hermetic-publish-path`): `prepublishOnly` is now only the tripwire that refuses a folder publish. `check:drift` and `verify:token-index-clean` run inside `scripts/release-publish.ts` (§ "The sequence" steps 5.1 and 5.3).* |
| `postpublish` | `git add token-index/ && git commit … && git push origin main` | warn-only tripwire; **no git write, no push** |

**Form chosen: pre-publish verification on the release branch** (Req 4.4 form (a),
"regenerated on the release branch pre-merge") rather than a postpublish auto-PR,
because:

- **Deterministic publish**: the published artifact and the committed `token-index/`
  are guaranteed in sync *at publish time*; an auto-PR form ships first and
  reconciles later, leaving `main` lagging the registry until someone merges.
- **No mid-publish git mutation**: publish cannot half-fail with a dangling local
  commit (the old failure mode Task 3 would have created).
- **Structurally cannot push `main`**: neither lifecycle script contains a push at all.

## Emergency note

If a publish is somehow needed while the gate blocks a required fix, that is the
Item 1f emergency procedure (Peter lifts protection, acts, re-enables, logs in the
125-A findings ledger) — never a script-level bypass.
