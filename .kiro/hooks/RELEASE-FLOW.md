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

1. **Derive**: `git log $(git describe --tags --abbrev=0)..main --oneline` (all changes — squash titles are the changelog spine) and the same log scoped to the SHIPPED surface — **authoritative list: `package.json` `files[]`** (`src/` alone misses served-content roots like `governance/`; v14's docs-corpus entry lived there). Issue-driven work appears ONLY here — never assume spec summaries cover the delta.
2. **Classify** each change 🔴 breaking / 🟡 minor / 🔵 patch-internal, reading task summaries or PR bodies for substance.
3. **Peter ratifies the bump**; notes are hand-authored at `docs/releases/release-X.Y.Z.md` (v14.0.0 = format precedent) and ride the release PR below.
4. Publish mechanics: § "The sequence" steps 5–6 — **one tarball, built by `scripts/release-publish.ts` in a fresh clone at the tag, published unchanged to both registries**. The public-npm flags are written out in step 5.4. They were previously only in "the dual-registry playbook", which is not in this repo, so a fresh session could not find it. Auth note: public npm needs Peter's login/2FA, and the token expires in about 30 days, so an E404 on publish is a masked auth failure. **The release notes disclose any change in embedded dependency versions against the previous release's public artifact** (the first instance is § "Dependency disclosure" of ballot `2026-10-03-hermetic-publish-path`).
5. **Claims-pass owed set + the arming question** — see the named step below. **Both lines produce artifacts, not reminders.**

### Step 5 — run the owed-set query, paste its output, and confront the arming question

Release is where both of this repository's consumer-reaching completion-claim escapes crossed. Two named lines run here, at release-prep start.

#### 5a — RUN the owed-set query and PASTE its output into release-notes prep

**The predicate**, verbatim:

> **`closeout-owed(S)`** ⟺ S's final declared unit has merged **AND** `.kiro/specs/S/completion/claims-pass.md` does not exist **AND** that merge is dated on or after the ratification date recorded in `.kiro/docs/ballots/2026-09-19-completion-claims-integrity.md`.

**The pipeline** — four stages, as **documented commands, not a committed script**. Run it; paste what it prints.

```bash
BALLOT=.kiro/docs/ballots/2026-09-19-completion-claims-integrity.md
RATIFIED=$(grep -m1 '^Ratified-machine: ' "$BALLOT" | awk '{print $2}')
[ -n "$RATIFIED" ] || { echo "FATAL: cannot resolve ratification record at $BALLOT"; exit 1; }
echo "ratification date: $RATIFIED"
# Boundary PINNED TO MIDNIGHT: a bare date resolves via git approxidate to the date
# at the CURRENT time of day, silently dropping same-day-earlier merges from stage 1a
# (CLOSEOUT pilot F-1, 2026-09-19 — the owed-set's first wrong result, repaired in all
# three copies in one commit).

# Stage 1a — every spec with post-ratification merge activity on main's first-parent line
SPECS=$(git log --first-parent --since="$RATIFIED 00:00" --name-only --pretty=format: -- '.kiro/specs/' \
        | sed -n 's|^\.kiro/specs/\([^/]*\)/.*|\1|p' | sort -u)
echo "specs with post-ratification merge activity: $(echo "$SPECS" | grep -c .)"

A=0; B=0; C=0; CLOSED=0; OWED=""
for S in $SPECS; do
  T=".kiro/specs/$S/tasks.md"
  # Stage 1b — classify into exactly one class, units-form precedence first
  if   grep -qE '^## Declared Merge Units' "$T" 2>/dev/null \
    || grep -qE '^\*\*Merge units \(' "$T" 2>/dev/null \
    || grep -qiE '^#{2,4} .*merge unit' "$T" 2>/dev/null; then cls=a; A=$((A+1))
  else
    n=$(git log --first-parent --oneline --since="$RATIFIED 00:00" -- ".kiro/specs/$S/" | wc -l | tr -d ' ')
    if [ "$n" -le 1 ]; then cls=b; B=$((B+1)); else cls=c; C=$((C+1)); fi
  fi
  # Stage 2 — the final anchor's merge commit and date
  ANCHOR=$(git log --first-parent -1 --format='%h %cs' -- ".kiro/specs/$S/")
  # Stage 3 — does the closeout record exist?
  if [ -f ".kiro/specs/$S/completion/claims-pass.md" ]; then CLOSED=$((CLOSED+1))
  else OWED="$OWED  $S ($cls, anchor $ANCHOR)\n"; fi
done

# Stage 4 — emit the owed set PLUS the enumerated exclusion counts, by name
echo "OWED SET:"; [ -n "$OWED" ] && printf "$OWED" || echo "  (empty)"
echo "EXCLUSIONS: $CLOSED closed; ${A}(a) / ${B}(b) / ${C}(c) per class; \
K excluded as pre-ratification (no first-parent activity since $RATIFIED)"
```

**What each class means, and why class (b) is spelled out**: **(a)** the spec declares units in any recognized form — the canonical `## Declared Merge Units` heading, the legacy bold-prose declaration, or a heading containing "merge unit", tried in that precedence order — so CLOSEOUT anchors on the **final declared unit**. **(b)** no units block and a single PR: that PR **is** the spec's only unit. *This is the corpus's most common shape, and a stage that silently drops it produces a healthy-looking short list — the exact failure this enumeration exists to make impossible.* **(c)** no units block, more than one PR: the anchor is the PR carrying the **last parent completion doc**.

**The one judgment point, named rather than hidden**: stage 2 resolves the anchor as *the most recent first-parent commit touching the spec*. For class (a) that is a proxy for "the final declared unit merged" and for class (c) a proxy for "the PR carrying the last parent completion doc". **Where the proxy and the definition disagree, the definition governs and the operator says so in the pasted output.** A wrong owed-set result noticed here counts toward the promotion ladder below.

**Named classes in the exclusion line, so a wrong answer is a falsifiable count rather than a healthy-looking short list.** Stacy's command catalog (`canonical/agents/stacy.md`, U3) carries this same pipeline as its authoritative home; this step and the monthly health check's LIVENESS item are its two run surfaces.

**An empty set is pasted as an empty result.** The step produces a record either way — that is the whole point of running a query instead of recalling an obligation.

*Note on the MIDPOINT record*: a spec declaring ≥ 3 units carries its midpoint pass at `completion/claims-pass-midpoint.md`. The predicate above keys on `claims-pass.md` **exactly**, so a midpoint record never discharges a closeout obligation.

#### 5b — *"if arming is undecided, decide it now"*

**Release-prep start — concretely, the creation of the version-bump PR — is the event anchor for the `completion-criteria-parity` arming decision.** If that decision is still open when this step runs, **it is decided here**, not deferred past a release. Deciding **not** to arm is a lawful outcome: the evidence guard forbids arming before the convention has shipped, the Tier-3 worked example is fixed, and **N ≥ 5** in-scope parents have completed under the convention with parity **measured by audit, not by the checker**. What is not lawful is shipping a release with the question unexamined.

> **Note (Peter, 2026-09-26, PR #205 — added adjacent to the ratified paragraph above, not part of it):** this same sitting also decides `.kiro/hooks/complete-task.sh`'s **authoring-time** parity check — whether it stays advisory or becomes blocking. That check is **advisory until this sitting decides otherwise**; see the script's header comment and its parity-check block.

#### The staged-mechanization ladder, and its named de-facto detectors

The owed-set pipeline is **documented commands, not a committed script**, deliberately. Its promotion path is pre-committed and is the only path:

**documented pipeline → (second wrong result) committed script + scoped grant → (the Q2 re-evaluation sitting) publish-hook decision.**

**The de-facto detectors are named**: a wrong owed-set result **noticed in ordinary use** counts toward promotion, and the two ordinary-use surfaces are **(1) the LIVENESS read at the monthly Civitas health check** and **(2) this release step**. No detection project is created and no new obligation is added — the two places the query is already run are the two places a wrong answer is already visible. *Recorded honestly: this is detection-by-use, not detection-by-guard. It cannot catch an omission that neither reader recognizes. It converts an unfireable trigger into a fireable one; it does not make the pipeline self-checking.*

**Successor release tooling inherits this step as a REQUIREMENT, not as a convention it may re-derive.** Any future release tooling that replaces this document carries step 5 forward in both halves — the run-and-paste owed-set query and the arming line. **There is to be no parallel second mechanism**: the ladder above is the only path from documented pipeline to automation.

*(The automated analyze/notes/release CLI was retired 2026-08-12 — ballot `2026-08-12-q6-release-manager-retirement.md`. Tag and GitHub release are manual, and they are **two separate acts**. The tag is pushed at § "The sequence" step 5.2 (`git tag -a vX.Y.Z <S> && git push origin vX.Y.Z`). The GitHub release is created **last**, at step 7, only after step 6's rail PASS and a matching 6b record (`gh release create vX.Y.Z --notes-file docs/releases/release-X.Y.Z.md`). Erratum 2026-10-03, ballot `2026-10-03-hermetic-publish-path`.)*

## The sequence

1. **Release branch**: `git switch -c task/<spec>-<N>-<slug>` (or `chore/release-vX.Y.Z`
   for a standalone release) from up-to-date `main`.
2. **Prepare the release on the branch**:
   - version bump in `package.json` (and any sub-packages),
   - release notes / changelog updates,
   - **regenerate the token-index**: run `npm run build` (its generation steps
     refresh `token-index/`), then commit any resulting `token-index/` diff.
3. **Open the release PR** (`./.kiro/hooks/complete-task.sh` for spec-task releases,
   or `gh pr create` for standalone chores). Required checks run on the PR.
4. **Peter merges on green.** The version bump + notes + token-index land on `main`
   as one squash commit.
5. **Tag, then publish ONE tarball from the tag.** The release commit is the release PR's squash commit **S**. A later record-only PR never changes what is tagged or published.
   - **5.1 Dry run at S, before the tag is pushed**: `npx tsx scripts/release-publish.ts --dry-run <S>`, **run from the main checkout**.
     - It works in a fresh clone at S: `npm ci`, then `check:drift`, then `npm pack` with lifecycle scripts on, so `prepack` builds.
     - **After the pack** it runs `verify:token-index-clean`, because the build inside `prepack` regenerates the index.
     - It then runs `pack-assert` on the tarball: no leftover `dist/` files, the MCP bundle shape (root `node_modules` only), no machine path in `dist/**`, no `dist/{ios,android,web}/**`, the eight root token files, `themes: []`, the closure present.
     - **Keep its output**: the dry run's `N/M assertions passed.` tally and its sha1 are pasted into the step-6 `.txt` (A3).
     - It runs these checks itself because a tarball publish runs no lifecycle scripts (P2).

     **Nothing is published.** A red stops the release before any tag exists; fix it on a branch and re-merge (back to step 1).
   - **5.2 Tag S** and push the tag: `git tag -a v<version> <S> && git push origin v<version>`. **The GitHub release is NOT created yet** (step 7).
   - **5.3 Publish to GitHub Packages**: `npx tsx scripts/release-publish.ts <version> --expect-sha <S>`, **run from the main checkout**. GitHub Packages auth is that checkout's gitignored `.npmrc`; an `npm whoami` preflight refuses before any build if it fails, and it refuses from a worktree.
     - It repeats 5.1 in a fresh clone **at the tag**.
     - It refuses unless `v<version>` resolves to `--expect-sha <S>`, the tag commit is on `origin/main`, and the tagged `package.json` version equals `<version>`.
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
   - If the packument (`curl -s https://registry.npmjs.org/@3fn%2fcore`) has no `time["<version>"]`, the version is not published yet. A 404 is then the correct answer, not indexing lag (15.0.0's R-4).
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
   file is not enough. Paste the **full output, including the exit code**, to
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

   **The RELEASE claims pass runs in two phases, recorded in one file** (Stacy's pass; this text sets only *when*):
   - **Phase 1** runs on **S after 5.1 is green and before the tag (5.2)**. A red 5.1 moves S, so phase 1 never reads a commit that will not be tagged (A7). It covers the release delta, the 5a owed-set paste, the 5b arming line and 5.1's tally. Its record lands by a record-only PR and states `publish-rail liveness: owed`.
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
