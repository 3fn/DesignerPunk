# Task 7.3 — Stacy's review: the B-U1 register row, and the release-1 CHANGELOG entry

**Spec**: 123 — Consumer Distribution · **Unit**: U1 · **Parent**: Task 7 · **Reviewer**: Stacy (Opus)
**Date**: 2026-09-27 · **Branch / head reviewed**: `task/123-u1-substrate` @ `e06424be`
**Under review**: `.kiro/docs/ballots/2026-09-27-123-b-u1-publish-rail.md` § 4 (the `publish-rail-guard` row; § 3 too, because the row's claims depend on it) · `CHANGELOG.md` (release 1's entry)
**Nature**: this is a review record. I did not edit the artifacts under review. Thurgood owns both: he authors the fixes, and Peter rules on B-U1's ratification.

---

## Verdicts

| Review | Verdict |
|---|---|
| **1 — B-U1 register row** (`publish-rail-guard`) | **ACCEPT-WITH-CHANGES.** Two of the changes (R1-1 and R1-2) are **preconditions for ratification**. They sit in § 3, but the row's `checks` and liveness claims are only true once they are fixed. |
| **2 — `CHANGELOG.md`, release 1** | **ACCEPT-WITH-CHANGES.** Three High findings: one false sentence, one breaking change left out, and one breach of Req 6.1. I found no advertising of onboarding to strangers (T2 holds). |

---

## Review 1 — the `publish-rail-guard` register row

### What I verified true (reproduced, not read)

- **Schema conformance.** Every required field is present (`rule`, `boundary_call{class,rationale}`, `verification{disposition,owner,check_state,checks}`, `education.disposition`, `history`). The enum values are legal. `armed_at` is placed correctly for a scalar row (Entry Schema, `governance/classification-map.md:99-104`).
- **The `checks` pointer names real, committed, bitten evidence.** `git ls-files scripts/__bites__` lists all 9 files. I re-ran every exit path at head:
  - bite 1 (the 6.3 command, verbatim) → exit 1, E404;
  - bite 2 (`VERSION=99.99.99`) → exit 10, `FAIL[version]`;
  - bite 3 (PATH-shimmed `npm`) → exit 11, `FAIL[host]` through the production `check_host` line;
  - the empty-URL shim → exit 13;
  - `--self-test-host` → exit 12.
  All match the committed transcripts.
- **The owner/liveness split cites a real precedent.** `completion-criteria-parity`'s history line of 2026-09-19 (`classification-map.md:716`) does say that `owner` records who keeps the instrument true. The row gives liveness to the RELEASE claims pass, which is correct per Req 6.7.
- **The `boundary_call` rationale's measured claim is still true today.** From the repo root, the project `.npmrc` maps `@3fn` to GitHub Packages. The scope-explicit flag still overrides it:
  - `npm view @3fn/core@14.1.0 dist.tarball --@3fn:registry=https://registry.npmjs.org` → `https://registry.npmjs.org/@3fn/core/-/core-14.1.0.tgz`;
  - without the flag → `https://npm.pkg.github.com/download/@3fn/core/14.1.0/…`.
  The second result is a real wrong-rail answer, and bite 3's host check exists to catch exactly that.
- **Non-substring sweep.** No duplicates and no substring relations between `publish-rail-guard` and any existing id. No heading anywhere in the file contains `publish` or `rail`. (The count is wrong; see R1-6.)

### Required changes

**R1-1 [Critical · § 3 step 6, which the row's `checks` names as the invocation]. The hermetic invocation makes every release fail, and it would not be hermetic even if it worked.**
- **It breaks npm.** `npm_config_userconfig=/dev/null npm_config_globalconfig=/dev/null` makes npm 10.9.3 (Node 22.20.0) exit before it resolves config: `double-loading config "/dev/null" as "global", previously loaded as "user"`. `check_version` sends stderr to `/dev/null`, so the crash is reported as **`FAIL[version]: @3fn/core@14.1.0 is not visible on registry.npmjs.org … do not announce this release`, exit 10, against a version that is live.** I reproduced this at head. The same command without the env vars → `PASS`.
- **It would not be hermetic anyway.** With two *distinct* empty files (which npm accepts), `npm config get @3fn:registry` run from the repo root still returns `https://npm.pkg.github.com`. The project `.npmrc` is loaded regardless, and the repo root is where step 6 runs. What actually defends the check is 6.2's scope-explicit flag, plus 6.8's host assertion.
- **So § 3's sentence is false on both counts.** The sentence is: *"The hermetic invocation env vars … keep the check from reading a developer's local `.npmrc` scope mapping"*.
- **No committed record exercises the step-6 command as drafted.** Every bite and `pass-real-version.txt` was run without the env vars.
- **This is Req 6's founding finding again:** a mitigation that was never executed, shipped inside the guard written to prevent exactly that. The line has travelled unrun from Leonardo A15 → Req 6.8 → C9 → § 3.
- **Fork, surfaced rather than picked** (Thurgood drafts, Peter rules; either branch needs an erratum to Req 6.8 / C9's quoted invocation):
  - **(i)** Drop the env vars and record A15 as *tested and declined*, with the evidence above.
  - **(ii)** Keep the hermetic intent using two distinct empty files, and state its real reach: user and global config only, never project config.
- **Evidence precondition for either branch:** before ratification, run step 6's command **verbatim as it will be ratified** against a live version, and commit the resulting `PASS` next to the bites.

**R1-2 [Critical · § 3 step 6 and the row's education (the liveness read)]. The named paste location cannot reach the record the RELEASE pass reads.**
- **(a) The file is gitignored.** `git check-ignore -v docs/releases/1.0.0/publish-verification.log` → `.gitignore:30:*.log`. Task 7.1 hit this same trap and renamed the bites to `.txt`. The fix was not carried over to the paste target.
- **(b) Step 6 does not say how the paste gets onto `main`.** It runs on `main` after the merge, and `main` is branch-protected. Even a file that git does not ignore would stay in a working tree.
- **Consequence:** my RELEASE pass reads committed records. As drafted, every release produces no record. Either "events without records = finding" fires every time, or a reader concludes the guard never ran.
- **Required:**
  - (a) a filename git will commit. Fork: rename to `.txt` (erratum to Req 6.7 / C9's path), or add a `.gitignore` negation that keeps the ratified name. Note that `.gitignore` is not one of Task 7's Primary Artifacts, so the negation route needs a scope decision.
  - (b) step 6 names the route by which the paste reaches `main`, for example a post-publish PR. Which route is Thurgood's call.

**R1-3 [High · `armed_at: tool-time` and `checks`]. Keep the values, but state what the check actually blocks, inside the field.**
- **Why keep `tool-time`:** it is the least-wrong enum value. It is also the field that does the adjudication work: it takes the row out of `EXPECTED_CONTEXTS` arithmetic (schema counting rule, `:102`).
- **What the schema says `tool-time` means:** *"the check blocks at its point of use (a CLI workflow refusing to proceed)"*.
- **What this check actually does:** it blocks nothing mechanically. It runs after the artifact is already public and cannot un-publish it. Nothing consumes its exit code. A human reads the result and holds back the announcement.
- **Where that is currently stated:** the ballot's own § 6 residual (1) says exactly this. But the ballot is a one-time record. The schema requires a non-PR-gate check to say so *"in the field — never only in prose"*, and the same honesty applies to what it blocks.
- **Required:** append the check's reach to the `checks` string. Proposed wording, for Thurgood to reword as he sees fit:
  > `; tool-time here = the script's non-zero exit halts the human-run recipe before announcement — it runs after publish (it cannot un-publish), no downstream tool consumes its exit code, and a skipped run is not mechanically prevented; a skipped or failed run is detected post hoc by the RELEASE claims pass (see education)`
- **Is "armed" true today? No.** The ballot is DRAFT and unapplied, and no recipe invokes the script. Today it is a built, bitten instrument with no invocation site. In this register, that state is `proposed` (compare `completion-criteria-parity`: built, not wired → `proposed`).
- **At application, `armed` becomes true in Req 6.6's sense** (the recorded red is the armed evidence), on two conditions:
  1. the row and step 6 land **in the same commit**;
  2. R1-1 is fixed first. A check whose invocation false-reds every release is broken, not armed.

**R1-4 [Medium · education]. The row names the wrong reader, and the error originated with me.**
- **The problem:** the text says *"so a future audit:coverage-map / ARMING pass reads it as accounted-for"*. But `audit:coverage-map` never reads this register:
  - `tools/agent-generator/coverage-map.ts` joins generated surfaces to the ten 122 check contexts;
  - its adjudications live in `canonical/adjudications.yaml`;
  - `scripts/verify-publish-rail.sh` is not a generated surface.
- **The origin is my requirements-round S-A4** (`feedback/requirements.md:420`), which named `audit:coverage-map` as the reader. That was imprecise, and I own the correction. The risk S-A4 named is still real: someone at an ARMING event "repairs" the row into a PR check. So the in-row adjudication stays. Req 6.5 needs no erratum; only its parenthetical inherits my imprecision.
- **The real readers:**
  - someone reading this register at an ARMING event;
  - `verify-gate-registration.sh`'s `EXPECTED_CONTEXTS`, which `armed_at: tool-time` already excludes this row from.
- **Required:** replace "a future audit:coverage-map / ARMING pass" with:
  > "a future ARMING-event reader of this register (and `verify-gate-registration.sh`'s `EXPECTED_CONTEXTS` arithmetic, from which `armed_at: tool-time` excludes it; `audit:coverage-map` does not read this register)"

**R1-5 [Medium · education, the Req 6.1 sentence]. It claims coverage the row does not have, and its "reported separately" has no referent.**
- **(a) The row does not verify Req 6.1.** "Deliberately absent from every consumer-facing surface this row's checks touch (Req 6.1)" reads as if this row verifies 6.1. It doesn't: its checks query the registry and touch no consumer-facing surface.
- **(b) Two live 6.1 violations exist right now:**
  - `governance/DesignerPunk-Integration-Guide.md` L25 and L36–40. I verified these. `governance/` ships in `files[]` and is copied by `init`, so the guide is consumer-facing.
  - `CHANGELOG.md` L38 (Review 2, C3).
- **(c) "Reported separately" points at nothing durable.** There is no open issue for the Integration Guide lines: a grep of `.kiro/issues/*.md` for `pkg.github` / `GitHub Packages` finds none. A handback message is not a record.
- **Required:**
  - restate the sentence as: "Req 6.1 (GitHub Packages absent from consumer-facing surfaces) is **not** verified by this row";
  - cite a **committed** issue path for the Integration Guide lines. That issue must exist before the row cites it.

**R1-6 [Low · history line, and ballot § 5]. The sweep count is off by one.**
- The draft says "31 live ids + this one". The actual count is **30** live entry ids + this one = **31**.
- The file's 31st `###` heading is `Illustrative Example (documentation, NOT a register entry)`, which is not an entry.
- My figure is the result of an awk extraction of `### ` headings after `## Entries` plus a pairwise substring loop: 0 relations, 0 duplicates.
- **Required:** "30 live ids + this one (31)".

### Recommended (not required)

- **R1-7 · `boundary_call`.** `functional` is accepted: the predicate the check evaluates is a mechanical fact about the artifact. But the `rule` sentence also contains a workflow-ordering half ("before it is announced"; "runs as a mandatory step"). By this register's own precedent (`npm-test-before-complete`: *"the artifact half … is functional … this row classifies the workflow imperative"*), that half is operational. Adding one clause would make the split explicit rather than implicit: "the ordering half (run before announcing; ran at all) is operational, carried by the recorded log and the RELEASE claims pass, not by this check".
- **R1-8 · the guard script.** `check_version` treats "npm failed" the same as "not visible". R1-1 is a live instance: a config crash is reported as "not visible on registry.npmjs.org". The `FAIL[host-empty]` branch was built to stop exactly this confusion on the host side. The failure is loud and fails closed, so this is not a B-U1 blocker. I'm routing it to Thurgood as a design residual.

---

## Review 2 — `CHANGELOG.md`, release 1's consumer-facing entry

**Method.** I checked every sentence of the entry (12 bullets plus 3 header lines, 100% of the population) against three things:
- the U1 parent docs (`task-{1..6}-completion.md` / summaries, `task-9-0-completion.md`);
- the source code (`src/cli/init.ts`, `src/cli/shared/transforms.ts`, `src/cli/sync/{index,Migration,Reporter}.ts`, `package.json`);
- **the last published release**, since a changelog's baseline is what consumers already have. I downloaded `@3fn/core@14.1.0` and read its contents.

I did not re-run the Task 4/5/6 Jest suites. Their recorded results are trusted, which is disclosed here.

### Verified true, as written

- L14: `designerpunk.config.ts` is gone from `files[]`.
- L15: `init` refuses in born, package-mode and partial repos (`init.ts:111-126`), and `--re-scaffold` lists files before writing.
- L21: key-grain writes nothing when unchanged (Task 5 criterion, with bites).
- L23: the product server is scaffolded.
- L29: `LEGACY_AGENTS_RETAINED_MESSAGE` exists and prints in the migration section.
- L33: 14.1.0's `designerpunk.esm.js` and `designerpunk.umd.js` **each contain 27 `/Users/` hits** (checked in the published tarball).
- L34: 14.1.0 shipped **both** the four `.browser.ts` sources (via the wholesale `src/`) **and** their compiled `.js`/`.d.ts`. So "removed … and their compiled output" is true relative to the consumer's baseline. (Task 9.0's orphan proof #5 was measured after Task 3's diet, which is why it says the sources never shipped. Both statements are true on their own baselines.)
- `CHANGELOG.md` is in `files[]`.

### T2 check (no advertising of onboarding to strangers)

**Holds.** The entry has no install steps, no "get started" text, and no invitation. `init` appears only in descriptions of behaviour changes. The rewrite in C1 below keeps it that way.

### Corrections (before → after)

**C1 [High · L13]. The sentence is false.**
- **What `init` actually does:** it creates an **empty** `src/components/` with a README (`init.ts:201-211`). It does **not** create `src/types`: the copy was removed, and the copied token tree's imports are rewritten to `@3fn/core/types` (`transforms.ts:53-55`).
- **"Your authoring surface" misdescribes what shipped.** The wholesale `src/` was DesignerPunk's source, not the consumer's authoring surface.
- **"Only the pieces DesignerPunk itself needs at build/runtime" is incomplete.** `src/tokens/**` ships because `init` copies it into the consumer's repo, and the iOS/Android component sources ship for consumers to compile.
- **Before:** "**The package no longer ships your authoring surface.** `src/` used to ship wholesale; it now ships only the pieces DesignerPunk itself needs at build/runtime (the token pipeline, platform closures, and a small declared floor). Your own component and type source is created by `init`, once, in your own repo — it is not re-shipped by the package on every install."
- **After:** "**`src/` no longer ships wholesale.** The package now ships only the source files it still needs: the token source `init` copies into your repo, the files that token source imports, the iOS and Android component sources, and a small declared set of styles, fonts and component metadata. **`init` no longer copies `src/types` or `src/components/core` into a repo.** It creates an empty `src/components/` for your own components; token types are imported from `@3fn/core/types`, and DesignerPunk's own components stay in the package."

**C2 [High · a breaking change missing from Breaking].** `sync --force` and `sync --accept-all` are **retired**. They are reported, not honoured (`sync/index.ts:141,184`; `Reporter.ts:46`).
- On 14.1.0, `main`'s `sync` applied everything off a terminal when given `--force`. Now it writes nothing without `--apply`. A CI script running `npx designerpunk sync --force` will silently stop applying, apart from the one retirement line it prints.
- **Add to Breaking:** "**`sync --force` and `--accept-all` are retired** (they print a notice and are ignored). `sync` now prints its full report before changing anything: run from a script or CI (no terminal), it writes nothing unless you pass `--apply`; at a terminal it asks once. A file you edited is overwritten only with `--overwrite <path>`, and a file you deleted is restored only with `--restore <path>`."

**C3 [High · L36–38, Req 6.1]. It names GitHub Packages in a file that ships inside the package.**
- `CHANGELOG.md` is in `files[]`. Req 6.1: *"GitHub Packages SHALL NOT appear in any consumer-facing document"*.
- The sentence refutes itself: it says GitHub Packages is "not … referenced in anything you install from", and says so inside something you install from.
- Task 7.4's completion doc restates 6.1 as "not … as an install path". That is narrower than the requirement.
- **The first sentence overstates as well.** "Every release from this one forward is verified … a mandatory step … rather than a manual instruction":
  - B-U1 is still DRAFT;
  - the step is run by a human (the ballot's own residual 1);
  - as drafted, its command false-reds every release (R1-1).
- **By the file's own L3 rule** ("Internal-only changes … are not listed"), a release-process change does not belong in this file.
- **Fork, surfaced for Thurgood / Peter:**
  - **(a) recommended:** delete the whole `### Publishing` section;
  - **(b)** keep one sentence and delete the GitHub Packages sentence outright. The sentence would be: "Starting with this release, the release process includes a committed check that the published version is live on registry.npmjs.org, and served from it, before the release is announced." It is true only once B-U1 is ratified and applied **and** R1-1 is fixed.

**C4 [Medium · L17]. The migration compares against a version range, not "your installed version".** `Migration.ts:15-17`: *"Any version in the range — earliest available through the installed one"*.
- **Before:** "judges each of your existing component copies against what your installed version actually shipped"
- **After:** "judges each of your existing component copies against what DesignerPunk actually shipped in each version up to the one you have installed"

**C5 [Medium · L22]. Two problems: existing installs, and the description of the stale approval.**
- **(a) Existing installs are not corrected.** The sentence is true for new `init` scaffolds. It is not true for existing configs. Where `sync` reports an approval under "Removed from package", it **leaves it in place** (`task-5-3-completion.md`, adaptation 3: *"a stale auto-approval of a tool that became mutating stays approved until she removes it"*). The pre-123 template approved `rebuild_index`.
  - **Append:** "An existing install is not corrected automatically: if `sync` lists an approval under "Removed from package", it leaves it in place — remove it yourself."
- **(b) The tool never existed.** Task 4 records `validate_component` as *never registered*, not as a tool that was removed.
  - **Before:** "had one for a tool that no longer exists"
  - **After:** "had one for a tool no server provides"

**C6 [Medium · L24]. The name contract lists DesignerPunk's component references, not the consumer's** (Task 6: "every … token name **our** web components reference").
- **Before:** "a *name contract* (which token names your components reference, checked against your own generated CSS)"
- **After:** "a *name contract* (which token names DesignerPunk's web components reference, checked against your own generated web CSS)"

**C7 [Medium · L25]. The baseline is wrong, and "closure-verified" is overstated.**
- **The baseline:** "down from 7.3MB" is Task 3's measurement of the branch before the diet, not of the last release. **14.1.0 as published is 8,403,099 bytes packed (≈8.4MB), 2,544 files, 31.6MB unpacked.** I measured the packed size with `npm pack @3fn/core@14.1.0` and took the file count and unpacked size from `npm view`.
- **The overstatement:** only the `src/` portion of `files[]` is closure-verified. The rest is globs (`dist/**`, `governance/`, `.kiro/steering/`, …).
- **Before:** "(roughly 5.9MB packed, down from 7.3MB) — … what remains is an explicit, closure-verified list."
- **After:** "(about 5.9MB packed, down from about 8.4MB in 14.1.0) — … what remains of `src/` is an explicit list, checked against the files it actually imports."
- **Re-measure the new figure at release-prep.** Tasks 8–9 still land before release 1.

**C8 [Medium · a consumer-facing change missing].** In a partial state, `generate` now refuses with a named error instead of guessing from the current directory (Task 1: "refuses (with an exact catalog string) in any partial state").
- **Add to Breaking** (or Changed, at Thurgood's call): "**`generate` now refuses to run in a half-set-up repo** (for example a config file whose `tokenSource` points at no token tree), printing a named error that says what is missing, instead of guessing from the current directory."

**C9 [Low · L16 vs L29]. The two lines contradict each other.**
- L16 says "for this release only"; L29 says "planned for a later release".
- A firm promise that slips becomes a false statement in the public record.
- **Before (L16):** "and — for this release only — the copied agent/steering/governance files"
- **After:** "and, for now, the copied agent/steering/governance files"
- *Not in the CHANGELOG, noted for completeness:* `sync`'s own `LEGACY_AGENTS_RETAINED_MESSAGE` says "until the next release". That is a code string owned by the Task 5 author.

**C10 [Low · L3, L9]. Two pointers don't resolve for a consumer reading the file.** `docs/releases/` and `.kiro/hooks/RELEASE-FLOW.md` are not in `files[]`, so neither exists for someone reading the file inside `node_modules`.
- **Change:** drop both pointers, or replace them with repository URLs.

---

## Adjacent findings (outside both reviews, routed rather than dropped)

- **Task 7.2's completion doc makes a false claim, routed to Thurgood as its author.** It says ".npmrc and no credential file were read at any point". But the bites ran from the repo root without the hermetic env vars, and npm loads `~/.npmrc` and the project `.npmrc` on every call. I checked that both files exist; I did not print their contents. The claim is a subtask-doc finding. (The measurement it supports still holds: the scope-explicit flag beat the project scope map, as shown above.)
- **A forward reference to verify at parent completion.** Task 7.1's doc says "see Task 7 parent's Additional Verification", and that section doesn't exist yet. It should resolve when the parent doc is written.

## Standards implications (for Thurgood's read)

1. **The `armed_at` enum has no value for a check that runs after the event and is halted by a human.** `tool-time` is stretched to cover it (R1-3). This is the first such row. If a second appears, the enum needs its own amendment with its own record, and should not be stretched again.
2. **The `*.log` gitignore rule silently defeats any "paste the output to `X.log`" convention.** It has now bitten twice in one task (7.1's bites and R1-2's paste target). Any standard that names a committed record location should name a filename git will commit.
3. **An invocation quoted inside a requirement is still a claim that needs a run.** R1-1's env vars travelled from feedback → requirement → design → ballot without ever being executed. The spec-standards question for Thurgood is whether requirement text quoting a command should carry its evidence.

---

## Re-check addendum — 2026-09-27 (branch head `9fd5dd0a`)

**Scope**: Thurgood's rework, checked against my first review and against Peter's R1-1 ruling (drop the `npm` CLI and query `registry.npmjs.org` directly over HTTP).
- **What I read**: the ballot § 0–§ 6; `scripts/verify-publish-rail.sh`; `scripts/__bites__/`; the errata to Req 6.2, 6.3 and 6.8, design C9 and tasks.md Task 7; `CHANGELOG.md`; and the reworked 7.1, 7.2 and 7.4 docs.
- **Method**: I re-ran everything myself. I did not rely on the recorded transcripts.

### Verdict: **ACCEPT.** B-U1 is ready for Peter's ratification ruling, and so is the CHANGELOG.

One small correction to the 7.4 doc, which is outside the ratification surface, is routed below. It does not block ratification.

### 1. R1-1: CLOSED

- **Every exit path reproduces at head** (no shims unless stated):
  - `VERSION=14.1.0` → `PASS`, exit 0, against the real registry;
  - `VERSION=99.99.99` → `FAIL[version] (HTTP 404)`, exit 10;
  - PATH-shimmed `curl` (GitHub Packages tarball) → `FAIL[host]`, exit 11, through the production `check_host` line;
  - empty-tarball shim → exit 13;
  - `--self-test-host` → exit 12.
- **The 6.3 recipe run verbatim** (`curl -sS --max-time 15 -w '\n%{http_code}' https://registry.npmjs.org/@3fn%2fcore/99.99.99`) returns `"version not found: 99.99.99"` and `404`. That matches the erratum's quoted body.
- **Forcing a network failure** (a proxy at a dead port) → `FAIL[version]: could not reach … (network error)`, exit 10. So the new form gives a network failure its own message, which closes my R1-8 residual as well.
- **shellcheck** (official 0.10.0) is clean on the script and on both shims.
- **The script is free of npm entirely.** It contains no `npm` invocation, and it reads no `.npmrc` at any layer.
- **The errata honestly supersede the old measured form.** Each one:
  - marks the `npm view` form SUPERSEDED rather than deleting it;
  - records that the hermetic env vars were never run and would not have been hermetic anyway;
  - names the lost intent: the script header says plainly that it "does NOT tell you what a real consumer's own npm config would resolve".
- **The 6.8(ii) augment decision survives.** `version` and `dist.tarball` now come from one response, and the host assertion still augments the version check, as DD12 already decided.

### 2. R1-2: CLOSED

- The paste target is `docs/releases/<v>/publish-verification.txt`, which git will track (`.txt`, not `.log`).
- Step 6 names a post-publish release-record PR as its route to protected `main`. It uses step 3's existing mechanism and is explicitly distinct from the pre-publish release PR.
- The row's education text names the committed `.txt` as the thing the RELEASE claims pass reads.

### 3. R1-3 to R1-7: FOLDED IN, verbatim or in substance

- **R1-3**: the in-field statement of reach sits in `checks`, including "no downstream tool consumes its exit code".
- **R1-4**: the reader is now the ARMING-event register reader plus `EXPECTED_CONTEXTS`, with `audit:coverage-map` explicitly excluded.
- **R1-5**: "REQ 6.1 IS NOT VERIFIED BY THIS ROW", plus a committed issue (`.kiro/issues/2026-09-27-integration-guide-install-section-stale.md`, PR #214).
- **R1-6**: the count is "30 live ids + this one (31)". I re-ran the sweep: 0 relations, 0 duplicates.
- **R1-7**: the ordering half is now marked operational in the rationale.

### 4. The `armed` fork, my ruling: **`check_state: armed` stands. No two-step.**

**Why armed is honest:**
- Both conditions my first review set are now met:
  1. the row and step 6 land in one commit, and the row's own `checks` string says so;
  2. R1-1 is fixed, with a committed `PASS` from the exact step-6 command against a live version.
- Before application, the draft ballot is not a register state, so no "armed" claim exists yet to be true or false.
- The `completion-criteria-parity` comparison does not carry over. That row is `proposed` because a separate, later Q2 decision gates its required-flag. No such gate exists here: step 6 is the wiring, and it lands with the row.

**Why I declined the two-step** (`proposed` until step 6 first fires in a real release):
- It would make `check_state` wait on liveness.
- Req 6.7 and this row's own education assign liveness to the RELEASE claims pass, and "never … this row".
- The two-step would therefore fuse back together what the split was ratified to separate.

**Binding condition:** if application is ever split, with the row committed without step 6, the row lands as `proposed`. Only the same-commit case earns `armed`.

**What survives my ruling:**
- The guard has never run right after a real publish.
- The registry's per-version endpoint may briefly 404 immediately after `npm publish`. That would be a loud false red on release day.
- Step 6's "Fix and re-run" covers it, and my RELEASE pass will see it in the committed record.
- This is a liveness and usability risk, not an arming defect. I record it so it is expected, not discovered.

### 5. CHANGELOG: C1–C10 applied as written; no new claim errors

- **All ten corrections are present verbatim or in substance**, and the `### Publishing` section is deleted.
- **L1–L3 and L9 re-checked:**
  - I checked every changed sentence against my first-review sources again. None is new.
  - The new pointer, `https://github.com/3fn/DesignerPunk/releases`, resolves publicly (HTTP 200). The GitHub API lists v14.1.0, v14.0.0 and v13.0.0 with non-empty notes, so "full hand-authored delta" is true.
- **GitHub Packages:** `grep` finds 0 hits for "GitHub Packages" or `pkg.github` in `CHANGELOG.md`.
- **T2 still holds**: nothing in the entry invites strangers to onboard.
- **Note for release-prep (not a correction):** the new parenthetical "(This figure is re-measured at release-prep …)" is a process note inside consumer text. It should be removed when the figure is re-measured, or the published entry will still promise a future measurement.

### 6. Task 7.2's corrected `.npmrc` wording: ACCEPTED

- The correction keeps the false claim on record next to its fix; it does not silently replace it.
- It states precisely what was true: npm loaded its config layers as usual.
- It correctly notes that the correction is moot for the rewritten guard.

### Routed correction (non-blocking; Thurgood, as the author of the 7.4 doc)

- **The 7.4 doc overstates.** Its closing sentence says "no consumer-facing surface names GitHub Packages (Req 6.1)". That is false. `governance/DesignerPunk-Integration-Guide.md` L25 and L36–40 still do, and `governance/` ships and is copied by `init`. The register row itself cites that as a live 6.1 finding (issue #214).
- **Fix:** scope the sentence to the file, for example "`CHANGELOG.md` names no GitHub Packages surface (Req 6.1)". This should land before the U1 unit PR.

### Low notes (no change required; recorded so they are not rediscovered)

- **"Hermetic-from-config by construction"** (in the Req 6.8 and C9 errata and the row's history) is broader than the evidence.
  - The `.npmrc` half is exactly true.
  - But `curl` has its own config layer: `~/.curlrc` (absent on this machine) and proxy environment variables. My network-failure probe was redirected by a proxy env var, and the script failed loudly.
  - If Thurgood wants the broad phrase to be literal, a leading `curl -q` disables `.curlrc`. Otherwise, narrowing the wording to "npm config" makes it exact.
- **The row's `checks` string counts a live PASS among its "three recorded bites".** In this register, "bite" has meant a recorded red. The precise wording would be two recorded reds plus a recorded live PASS. The evidence itself is sound.
- **An unset `VERSION` exits 1** ("unbound variable") rather than one of the named codes. It fails loudly, so this is a contract gap, not a hazard.

### Standards implications

**None new.** My first review's items 1–3 stand: the `armed_at` enum has no value for a check that runs after the event and is halted by a human; the `*.log` gitignore rule defeats named paste targets; and a command quoted in a requirement still needs a run. The rework is a worked instance of item 3 being honoured.
