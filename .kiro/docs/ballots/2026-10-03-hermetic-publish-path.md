# Ballot Measure: the hermetic publish path — one tarball, from the tag, compared on both registries; the two-phase RELEASE form

**Date**: 2026-10-03 (drafted)
**Drafted by**: Thurgood (Opus), at the orchestrator's brief carrying Peter's 2026-10-03 ruling
**Status**: **RATIFIED (Peter, 2026-10-03)**, relayed by the orchestrator. Peter's words, verbatim: *"Go with your reads on all four, have Thurgood ratify."* "Your reads" are the orchestrator's reads on forks F-1 to F-4 as presented to him; they are recorded as ruled in § 9.
- **Precondition**: P1 was met before the ruling (#279 merged, `762b8c20`). The draft and both review rounds reached `main` in #282 (`b934fa73`).
- **Record-first** (`.kiro/docs/ballots/README.md` § "The Ratification Protocol"): this Status line, § 9's rulings and the F-4 consequence in § 4 are committed **before** any law edit, in the first commit of the application PR `chore/ratify-hermetic-publish-path`. The edits follow in the next commit. Peter's merge of that PR, under the governance carve-out, is the platform-verified act.
- **No `Ratified-machine:` line**: that mechanism belongs to the one ballot `completion-criteria-parity` parses (the B-U1 omission precedent).
- *Drafting-time status, kept for the record*: DRAFT, with ratification waiting for Ada's fix PR to merge, because law must not cite an instrument that is not on `main`.
**Required reviewer**: **Stacy.** The two-phase form (§ 3.4) governs her pass, and her claims-pass records RS-6…RS-9 are the evidence here. **Consulted**: Ada, on the build/publish half (R1 + R2 cross-read, 2026-10-03; her fix PR is the instrument).
**Authority for drafting**: Peter, 2026-10-03, relayed verbatim by the orchestrator: *"Let's go with your recommendations, but anything deferred I want captured."* The accepted recommendations are summarised in § 1.
**Absorbs**: `.kiro/issues/2026-10-02-release-audit-two-phase-clarification.md` (triggered by #273's merge; this ballot is its vehicle), and Stacy's RS-6, RS-7, RS-8, RS-9 (`.kiro/specs/123-consumer-distribution/completion/claims-pass-release-15.0.0.md` § "Phase 2 standards implications").
**Sibling record, not duplicated here**: Ada's incident and rulings sections in `.kiro/issues/2026-10-01-in-repo-generate-output-contaminates-package-dist.md`. That file owns the build half and its deferred items; § 6 cites it by pointer.

---

## 1. What happened, and what Peter ruled

**15.0.0 shipped two different artifacts under one version.**
- GitHub Packages got a fresh-clone build: 1,638 files, sha1 `65d2ec0b…`.
- Public npm got a build from the main checkout: 1,700 files, sha1 `48dd8cdd…`. It carried 62 stale `dist/` files and MCP bundles resolved from gitignored nested `node_modules` (zod 3.25.76 / ajv 8.20.0 instead of zod 4.3.6 / ajv 8.18.0).

**Why it happened.** The fresh-clone rule lived only in the 2026-10-02 deferral's guard list, which was bound to Ada's seat. The person at the public step followed RELEASE-FLOW step 5 as written (`git switch main && git pull`, then `npm publish`). Stacy's R-2 is the finding. This ballot answers its class (RS-6, RS-7).

**Peter's ruling, 2026-10-03, as accepted:**
1. **ONE tarball.** It is built in a scripted fresh clone at the tag and checked by `pack-assert`. The script publishes it to GitHub Packages. The same file is handed to Peter for public npm.
2. **The esbuild root-resolution plugin and its build-time assertion are DROPPED.** They are deferred and captured on Ada's issue.
3. **The `dist/` wipe/prune is DROPPED.** `pack-assert` detects leftovers instead.
4. **Step 6 compares both registries.** It reads GitHub Packages through the npm config that authenticated `npm view`/`npm pack` from the clone directory on 2026-10-03. Only if that fails does it ask Peter for a `read:packages` token.
5. **A separate grant covers Ada's record corrections.** That grant is hers, not this ballot's.

## 2. What this ballot carries, and what it does not

**Carries (law text, applied at ratification):**
- RELEASE-FLOW: § "Deriving the delta" item 4, and steps 5 and 6 of § "The sequence" (§ 3.1–3.4).
- `governance/release-management-system.md` § 5 (line 41) (§ 3.5) and line 31 (§ 3.6).
- `.kiro/hooks/README.md` line 109 (§ 3.7).
- RELEASE-FLOW step 6's rail paragraph (§ 3.8), added at R2.

§§ 3.6 and 3.7 were added 2026-10-03 from the documentation sweep.
- A `proposed` register row, `hermetic-publish-path` (§ 4).
- The README entry, and one annotation in Spec 123's `tasks.md` (§ 5, application).

**Does not carry:**
- **The instrument.** The publish script, the `prepublishOnly` tripwire and `pack-assert`'s leftover check are Ada's fix PR, under her issue-row grant.
- **Any change to `verify-publish-rail.sh`.** Peter's B-U1 ruling keeps the rail guard npm-CLI-free and npmjs-only. The two-registry comparison is a separate step (6b) that deliberately uses the npm CLI with the project's registry config. The two rulings do not conflict: one is a hermetic liveness probe, the other an authenticated parity read.

**Preconditions to ratification**, checked by the author before Peter rules. The mechanical fact for each is cited in the ratification commit.
- **P1. MET: Ada's fix PR #279 merged (`762b8c20`).**
  - **Script**: `scripts/release-publish.ts` (also `npm run release:publish -- <args>`), tested by `scripts/__tests__/release-publish.test.ts`.
  - **Modes**: `--dry-run <S>` and `<version>` with an optional `--expect-sha <S>`. § 3 has been corrected to what landed.
  - **Three corrections from #279's body, folded into § 3.2 on 2026-10-03**:
    1. `verify:token-index-clean` runs AFTER the pack, because the build inside `prepack` regenerates the index.
    2. "Refuses unless the tag resolves to S" is three checks: the optional `--expect-sha <S>`, the tag commit being on `origin/main`, and the tagged `package.json` version matching.
    3. The script runs from the MAIN checkout. GitHub Packages auth is that checkout's gitignored `.npmrc`, and the `npm whoami` preflight refuses from a worktree.
- **P2. `npm publish <tarball>` runs NO lifecycle scripts: verified by reading the source.** Ada read the installed npm 10.9.3 CLI source in her R2 (`/Users/3fn/.claude/projects/-Users-3fn-Documents-Work-Projects-Kiro-DesignerPunk-v2/memory/release-15-handoff/consult-hermetic-publish/ada-r2.md`):
  - `lib/commands/publish.js` runs `prepublishOnly`, `publish` and `postpublish` only when `spec.type === 'directory' && !ignoreScripts`;
  - `libnpmpack/lib/index.js` gates `prepack`/`postpack` the same way.

  **Consequences:**
  - the `prepublishOnly` tripwire refuses folder publishes only, and never the script's tarball publish;
  - the script must itself run `check:drift` before the pack and `verify:token-index-clean` after it (the build inside `prepack` regenerates the index; Ada confirms, and Stacy R1 verified it against the source) — **A5**;
  - **no `postpublish` runs on either registry, so the step-6 record is the only post-publish check.**

  **Second leg: SATISFIED by pointer.** See `.kiro/issues/2026-10-01-in-repo-generate-output-contaminates-package-dist.md` § "P2, second leg: an observed tarball publish runs no lifecycle script":
  - `npm publish <tgz> --dry-run`: exit 0, 0 lifecycle lines;
  - npm's shasum equals the script's sha1.
- **P3. SATISFIED by pointer.** See `.kiro/issues/2026-10-01-in-repo-generate-output-contaminates-package-dist.md` § "P3: the tripwire bites": a folder `npm publish --dry-run` exits 1 with the refusal naming the script, and no `prepack` runs.

## 3. Edit sites (verbatim; apply exactly as written)

### 3.1 `.kiro/hooks/RELEASE-FLOW.md` § "Deriving the delta", item 4

**Before:**
> 4. Publish mechanics: the dual-registry playbook (public npm needs Peter's login/2FA; expect the ~30-day token expiry — an E404 on publish is a masked auth failure).

**After:**
> 4. Publish mechanics: § "The sequence" steps 5–6 — **one tarball, built by `scripts/release-publish.ts` in a fresh clone at the tag, published unchanged to both registries**. The public-npm flags are written out in step 5.4. They were previously only in "the dual-registry playbook", which is not in this repo, so a fresh session could not find it. Auth note: public npm needs Peter's login/2FA, and the token expires in about 30 days, so an E404 on publish is a masked auth failure. **The release notes disclose any change in embedded dependency versions against the previous release's public artifact** (the first instance is § "Dependency disclosure" of ballot `2026-10-03-hermetic-publish-path`).

### 3.2 `.kiro/hooks/RELEASE-FLOW.md` § "The sequence", step 5 (whole step replaced)

*Numbering note*: substeps 5.1–5.4 belong to § "The sequence". § "Deriving the delta" has its own **Step 5**, with **5a** (the owed-set query) and **5b** (the arming question). Both charters and Stacy's command catalog cite that 5a/5b. They are unchanged by this ballot and are a different step.

**Before** (lines 124–131 at `0a299f2d`):
> 5. **Publish from merged `main`**: `git switch main && git pull`, then `npm publish`
>    (per the dual-registry playbook where applicable).
>    - `prepublishOnly` runs `build` + `check:drift` + `verify:token-index-clean` —
>      if the freshly-built `token-index/` differs from what's committed, **publish
>      aborts loudly before anything ships** (the fix: go back to step 2's regeneration
>      on a branch; the release PR was incomplete).
>    - `postpublish` never pushes. If `token-index/` somehow changed during publish
>      anyway, it prints a warning telling you to route the diff through a PR.

**After:**
> 5. **Tag, then publish ONE tarball from the tag.** The release commit is the release PR's squash commit **S**. A later record-only PR never changes what is tagged or published.
>    - **5.1 Dry run at S, before the tag is pushed**: `npx tsx scripts/release-publish.ts --dry-run <S>`, **run from the main checkout**.
>      - It works in a fresh clone at S: `npm ci`, then `check:drift`, then `npm pack` with lifecycle scripts on, so `prepack` builds.
>      - **After the pack** it runs `verify:token-index-clean`, because the build inside `prepack` regenerates the index.
>      - It then runs `pack-assert` on the tarball: no leftover `dist/` files, the MCP bundle shape (root `node_modules` only), no machine path in `dist/**`, no `dist/{ios,android,web}/**`, the eight root token files, `themes: []`, the closure present.
>      - **Keep its output**: the dry run's `N/M assertions passed.` tally and its sha1 are pasted into the step-6 `.txt` (A3).
>      - It runs these checks itself because a tarball publish runs no lifecycle scripts (P2).
>
>      **Nothing is published.** A red stops the release before any tag exists; fix it on a branch and re-merge (back to step 1).
>    - **5.2 Tag S** and push the tag: `git tag -a v<version> <S> && git push origin v<version>`. **The GitHub release is NOT created yet** (step 7).
>    - **5.3 Publish to GitHub Packages**: `npx tsx scripts/release-publish.ts <version> --expect-sha <S>`, **run from the main checkout**. GitHub Packages auth is that checkout's gitignored `.npmrc`; an `npm whoami` preflight refuses before any build if it fails, and it refuses from a worktree.
>      - It repeats 5.1 in a fresh clone **at the tag**.
>      - It refuses unless `v<version>` resolves to `--expect-sha <S>`, the tag commit is on `origin/main`, and the tagged `package.json` version equals `<version>`.
>      - It then records the tarball's path, file count and sha1 in `release-publish-record.json` (in an OS temp dir; the script prints its path), publishes **that tarball** to GitHub Packages, and prints the public-npm command for 5.4 with the sha1 to check.
>      - **Keep the tarball and its record until 6b is recorded** (A11). The record's full contents (commit, sha1, fileCount, bytes, pack-assert passed/total, createdAt) are pasted into the step-6 `.txt` (A3), because the temp dir is never committed and 6b's comparand must be.
>    - **5.4 Publish the same tarball to public npm** (Peter's terminal, web 2FA): first check the printed sha1 against the file, then run `npm publish <tarball> --registry https://registry.npmjs.org --@3fn:registry=https://registry.npmjs.org --access public`. **Never a folder publish, never `--ignore-scripts`, never a tarball the script did not produce.** A folder publish is refused by `prepublishOnly`, which names this script. That refusal is the tripwire, not the guard: the guard is the script.
>    - **Guards live in the command the operator runs, never in a list addressed to a seat** (RS-7). A release check that cannot be put in the script is written into this step's text, at the point where the operator meets it.
>    - **A tarball publish runs no lifecycle scripts**: no `prepublishOnly`, no `postpublish` (npm 10.9.3 source; ballot `2026-10-03-hermetic-publish-path` P2). The script runs the pre-publish checks itself. **Step 6 is the only post-publish check.** `postpublish`'s `token-index/` warning fires only on a folder publish, which the tripwire refuses.

### 3.3 `.kiro/hooks/RELEASE-FLOW.md` § "The sequence", step 6: the two-registry record (inserted after step 6's code block and its "do not announce" paragraph, before "**Land the result on `main`**")

**Insert:**
> **6b — the two-registry record.** In the same `.txt`, first paste the script's comparands:
> - the 5.3 `release-publish-record.json` contents (commit, sha1, fileCount, bytes, pack-assert passed/total, createdAt);
> - the 5.1 dry run's tally line.
>
> Then record, for **each** registry:
> - the version is present;
> - the registry's own publish time, from the packument's `time["<version>"]`, never an operator estimate (RS-8);
> - the tarball's file count;
> - `dist.shasum`;
> - the sha1 of the fetched tarball's own bytes (`shasum` of the file), an independent read beside the registry's claim (A4).
>
> **All four sha1s (two `dist.shasum`, two fetched-bytes) must equal the sha1 pasted from the 5.3 record.** Any mismatch is a release incident: record it and stop before step 7. Published bytes cannot be replaced, so the remedy is Peter's ruling, not a re-publish.
>
> **Run every 6b command from the MAIN checkout.** That is the npm config 5.3's `whoami` preflight proved (A2). A fresh clone or a worktree carries no `.npmrc` (it is gitignored), and the GitHub Packages read there fails with E401.
>
> **Every `npm` command names the registry twice, `--registry <r> --@3fn:registry=<r>`** (A1). The main checkout's `.npmrc` maps the `@3fn` scope to GitHub Packages, and a scoped name follows that mapping over a bare `--registry`. Measured on 15.0.0 (Stacy R1): `npm view … --registry https://registry.npmjs.org` alone returned GitHub's sha1 `65d2ec0b…`; with the scope flag, npmjs's `48dd8cdd…`. Without it, 6b would have hidden the 15.0.0 divergence.
>
> Commands, with `<r>` = `https://registry.npmjs.org` or `https://npm.pkg.github.com`:
> - **npmjs, metadata**: `curl -s https://registry.npmjs.org/@3fn%2fcore` for `time` and `versions["<v>"].dist.shasum`.
> - **GitHub Packages, metadata**: `npm view @3fn/core@<v> dist.shasum time --json --registry https://npm.pkg.github.com --@3fn:registry=https://npm.pkg.github.com`.
> - **Each tarball**: `npm pack @3fn/core@<v> --registry <r> --@3fn:registry=<r> --pack-destination <tmp>`, then `shasum <file>` and `tar -tzf <file> | wc -l`.
>
> **Only if the GitHub Packages read fails on auth from the main checkout**, ask Peter for a `read:packages` token, and record that the fallback was used.

### 3.4 `.kiro/hooks/RELEASE-FLOW.md` § "The sequence", step 6: the two-phase RELEASE claims pass, plus a new step 7 (appended after step 6's last paragraph, "…without a committed record the pass has nothing to read.")

**Append:**
> **The RELEASE claims pass runs in two phases, recorded in one file** (Stacy's pass; this text sets only *when*):
> - **Phase 1** runs on **S after 5.1 is green and before the tag (5.2)**. A red 5.1 moves S, so phase 1 never reads a commit that will not be tagged (A7). It covers the release delta, the 5a owed-set paste, the 5b arming line and 5.1's tally. Its record lands by a record-only PR and states `publish-rail liveness: owed`.
> - **Phase 2** is a dated section appended to the same record. It reads the committed step-6 `.txt`: the rail result and the 6b two-registry record. **Its trigger is the merge of the step-6 release-record PR.**
>
> **Phase 2 may be drafted against that PR while it is still open.** If it is, it MUST end with a **merge-confirmation line** written at the PR's merge:
> - **Scope: every file phase 2 read from that PR**, not only the `.txt` (A6). It records `git diff --quiet <read-sha> <merge-sha> -- <each path read>`.
> - If a merged file differs from the read, the line records every changed hunk re-read and every phase-2 reading it changes.
> - **A finding resolved by a commit after the read stays in the record**, with its resolution and the resolving SHA. It is never deleted (A6; 15.0.0's R-4).
> - **Where it lands**: in phase 2's own PR if that PR is still open at the step-6 PR's merge. Otherwise it goes in a follow-up record-only PR. On 15.0.0, phase 2's PR (#274) merged 16 s after #273, and the line needed #275.
> - Until that line exists, the liveness reading is "read, not committed". (RS-9: on 15.0.0 the merged file differed from the one phase 2 read, and only the confirmation line caught it.)
>
> 7. **Announce last**: create the GitHub release (`gh release create v<version> --notes-file docs/releases/release-<version>.md`) **only after** step 6's rail PASS and a matching 6b record. Notes must not state a guard as applied before the step that applies it has run (R-3).

### 3.5 `governance/release-management-system.md` § 5 (line 41)

**Before:**
> 5. **Publish per RELEASE-FLOW.md** (repo-internal; and the dual-registry playbook it references): release PR → the release owner merges → publish from merged `main` → then tag and GitHub release: `git tag -a vX.Y.Z && git push origin vX.Y.Z && gh release create vX.Y.Z --notes-file docs/releases/release-X.Y.Z.md`.

**After:**
> 5. **Publish per RELEASE-FLOW.md** (repo-internal): release PR → the release owner merges (commit **S**) → a dry-run pack at S → **tag S** (`git tag -a vX.Y.Z <S> && git push origin vX.Y.Z`) → **one tarball**, built by the publish script in a fresh clone at the tag and published unchanged to every registry → verify both registries (same sha1) → **then** the GitHub release (`gh release create vX.Y.Z --notes-file docs/releases/release-X.Y.Z.md`). Never publish from a working checkout, never `--ignore-scripts`, never a folder publish.

*Shipped-doc note*: this file ships in the package (`files[]` keeps `governance/`). The edit is therefore consumer-visible and rides the next release's notes as a 🔵 internal-process change.

### 3.6 `governance/release-management-system.md`, line 31 (added 2026-10-03 from the documentation sweep)

**Before:**
> - Verification stays mechanized; judgment stays human. DesignerPunk's publish guard scripts (`check:drift`, `verify:token-index-clean`, the `prepublishOnly` chain — this repo's package scripts, not shipped to consumers) block a broken publish mechanically and are NOT part of the retired tool.

**After:**
> - Verification stays mechanized; judgment stays human. DesignerPunk's publish guard is its publish script (`scripts/release-publish.ts`, which runs `check:drift`, `verify:token-index-clean` and `pack-assert` itself, in a fresh clone at the tag). `prepublishOnly` is only a tripwire that refuses a folder publish. These are this repo's package scripts, not shipped to consumers. They block a broken publish mechanically and are NOT part of the retired tool.

### 3.7 `.kiro/hooks/README.md`, line 109 (added 2026-10-03 from the documentation sweep)

**Before:**
> See `RELEASE-FLOW.md` in this directory for the release sequence under the PR gate (version-bump PRs, the `prepublishOnly` token-index gate, and the derive-classify-ratify notes recipe).

**After:**
> See `RELEASE-FLOW.md` in this directory for the release sequence under the PR gate (version-bump PRs, the derive-classify-ratify notes recipe, and the publish path: one tarball built by `scripts/release-publish.ts` in a fresh clone at the tag, which runs the token-index gate itself; `prepublishOnly` only refuses a folder publish).

### 3.8 `.kiro/hooks/RELEASE-FLOW.md` § "The sequence", step 6, the rail paragraph's last sentence (added at R2, A10: RS-8's residue)

**Before** (L142–144 at `1453dad6`):
> **If it fails within the first few minutes of publishing, the
>    registry may just not have indexed the version yet — wait a minute and
>    re-run by hand; this step never retries automatically.**

**After:**
> **If it fails, read the registry's own record before re-running.**
>    - If the packument (`curl -s https://registry.npmjs.org/@3fn%2fcore`) has no `time["<version>"]`, the version is not published yet. A 404 is then the correct answer, not indexing lag (15.0.0's R-4).
>    - If `time["<version>"]` is present and the rail still fails within a few minutes of it, re-run by hand.
>    - This step never retries automatically.**

*Not drafted here*: the same teaching appears in `scripts/verify-publish-rail.sh`'s `FAIL[version]` message. The script is outside this ballot (§ 2). The register's `publish-rail-guard` row names `owner: thurgood`, and Thurgood built it at Spec 123 Task 7. It is not in his charter write scope, so the vehicle is **a chartered issue naming Thurgood, with `**Grant paths**: scripts/verify-publish-rail.sh` and a re-recorded `FAIL[version]` bite**, filed at application (§ 5 item 8).

## 4. The register row (verbatim; applied as `proposed`; arms per F-4 as ruled)

### hermetic-publish-path

```yaml
rule: "Every @3fn/core version SHALL be published as ONE tarball, built by the committed publish script in a fresh clone at the version's tag with lifecycle scripts on and checked by pack-assert, and published unchanged to every registry; the registries' sha1s SHALL equal the script's recorded sha1, recorded in the step-6 release record"
boundary_call:
  class: functional
  rationale: "Artifact half: mechanical — the script's fresh clone and tag check, pack-assert's listing checks, the prepublishOnly tripwire refusing a folder publish, and sha1 equality across registries. The ordering half (dry run before tag, announce last) is OPERATIONAL, carried by RELEASE-FLOW's step text and the RELEASE claims pass, by the publish-rail-guard precedent"
verification:
  disposition: barrier
  owner: ada
  check_state: proposed
  checks: []
  # P2 second leg and P3 are recorded (2026-10-03, pointer in § 2). THE FLIP (A9; F-4 RULED by Peter 2026-10-03:
  # arm at the first release run under the law, not in the application PR). This row lands `proposed` with the
  # application PR. It flips to `armed`, `armed_at: tool-time` in the release-record PR of the FIRST release
  # published under RELEASE-FLOW steps 5–7; that release's 6b record is the live evidence. At the flip, checks[] =
  #   ["scripts/release-publish.ts (RELEASE-FLOW 5.1/5.3: fresh clone at the tag; three tag checks; check:drift;
  #     verify:token-index-clean after the pack; pack-assert; sha1 record)",
  #    "package.json prepublishOnly tripwire (folder publish refused; P3)",
  #    "RELEASE-FLOW step 6b two-registry record (four sha1s equal the 5.3 record)"].
  # The CI half (`test:pack-contents` in lane-functional-root, #281) is build-time evidence, not this row's
  # tool-time check. ARMING read: Stacy, at the flip PR's merge.
  # Owner is ada because she maintains the instrument (script, tripwire, pack-assert); the law text is Thurgood's.
education:
  disposition: "AUTHOR: RELEASE-FLOW steps 5–7 (ballot 2026-10-03-hermetic-publish-path § 3) and governance/release-management-system.md § 5 are the education. PRUNED: the 2026-10-02 deferral's three manual guards are superseded by the script (Ada's issue records that). HONEST REACH: a publish run with --ignore-scripts, or of a tarball the script did not produce, is NOT detected before publish; 6b's sha1 comparison detects it after publish, and published bytes cannot be replaced"
history:
  - { date: 2026-10-03, change: "entry created at ballot 2026-10-03-hermetic-publish-path (DRAFT), from 15.0.0's two-artifact divergence (Stacy R-2; RS-6/RS-7/RS-8). check_state proposed. P2 (source read, Ada R2; observed leg) and P3 recorded on Ada's issue 2026-10-03. The flip PR and checks[] are named in the verification comment (Stacy R1 A9). RATIFIED 2026-10-03 (Peter; F-3 owner ada; F-4: arms at the first release run under the law, the release-record PR of that release being the flip PR — not at this application)", by: thurgood }
```

## 5. Application (at ratification, one PR, Peter-merged under the governance carve-out)

1. The record-first Status flip in this file. Then §§ 3.1–3.8 and § 4, verbatim. Then the README "Ballots on record" entry.
2. **Straggler sweep**: `grep -rnE "Publish from merged|publish from merged|git switch main && git pull|prepublishOnly|dual-registry playbook|then tag and GitHub release|not have indexed|indexing lag|indexed" .kiro/hooks governance .kiro/steering canonical docs/*.md README.md scripts/verify-publish-rail.sh`. Every hit is either brought in line or listed as intentionally historical. The 2026-10-03 pre-application sweep (`.kiro/issues/2026-10-02-release-audit-two-phase-clarification.md` § "2026-10-03 — documentation consistency sweep") is the baseline this sweep is diffed against.
3. **The tasks.md annotation owed by the absorbed issue (its owed act 2)**: a dated annotation on Spec 123 `tasks.md`'s line "RELEASE fires at the release tag, before publish", pointing here (phase 1 at S before the tag; phase 2 after the step-6 record PR).
4. `rebuild_index` after merge: `governance/` is a served root.
5. Close and archive `.kiro/issues/2026-10-02-release-audit-two-phase-clarification.md` (`git mv` to `archive/`).
6. **Charter follow-ups, by vehicle (b)**: a canonical-charter edit plus regeneration (Spec 122), in a separate PR after this one merges. Never hand-edit `.claude/agents/*` or `CLAUDE.md`.
   - **Stacy's RELEASE row** (`canonical/agents/stacy.md` L393): her wording, lifted verbatim from § 10 [STACY R1] item (7). It has an event cell, an appended scope sentence, and an F-2 clause if F-2 is permitted. Her consumer overlay row (`stacy.overlay.md` L73) stays unchanged.
   - **Thurgood's LIVENESS read 2** (`canonical/agents/thurgood.md` L448): two cases are events without a complete record. One is a RELEASE record with phase 1 only, still reading `publish-rail liveness: owed`. The other, if F-2 is permitted, is a phase 2 drafted against an open PR that has no merge-confirmation line (A8).
   - **Signing cost (A8)**: Stacy's row is in the Stacy-signed rendered unit `#the-trigger-set-the-114-superset-table-names-never-numbers`. The charter PR stales it, so one Stacy re-sign is owed (it enters Peter's Stacy-signed sample frame), plus one operative-set confirmation. Whether Thurgood's L448 row is rendered is checked at that PR.
   - Both are listed in the sweep section named in item 2.
7. **Notify Stacy** of the before→after and the effective date. This is a standards change to her pass's timing, so notification is a charter duty, not a courtesy.
8. **File the rail-script issue** named in § 3.8 (owner Thurgood; `**Grant paths**: scripts/verify-publish-rail.sh`).

## 6. Deferred — captured

**Build side: by pointer only.** Two tables in `.kiro/issues/2026-10-01-in-repo-generate-output-contaminates-package-dist.md` hold these rows.

In § "2026-10-03 -- after the Ada + Thurgood consult" ("Deferred — captured per Peter's instruction"):
- **(a)** the esbuild root-resolution plugin and build-time assertion;
- **(b)** the `dist/` wipe or prune;
- **(c)** option B, a single dependency tree;
- **(d)** tool-boot-smoke booting the shipped bundles. **Owner: Thurgood.** Its paths are outside his standing scope, so it needs its own grant;
- **(e)** bypass prevention (publish from CI with provenance);
- **(f)** the open A/C "prevent" fork.

In § "2026-10-03 -- the fix" ("Deferred, discovered while building"):
- **(g)** base-config freshness;
- **(h)** retire `postpublish`, triggered by this ballot's ratification;
- **(i)** limits of the leftover rule;
- **(j)** `test:pack-contents` is red locally in any checkout with nested installs or stale `dist/`. The lane step is placed before the nested install for this reason.

Option D's test fix shipped in #279 and is no longer deferred.

They are not restated here, so the two lists cannot drift.

**Law side: captured here, each with its trigger.**
- **L-1. In-repo agents run zod 3 until option B.** The docs and application MCPs that agents use (`.mcp.json` → the sub-package `tsc` dists, nested locks) are not the bundles that ship (root lock). Civitas MCP health checks see the former only. *Trigger*: Ada's option B ruling, or the first consumer-reported MCP defect that does not reproduce in-repo.
- **L-2. Pre-publish bypass detection: none.** `--ignore-scripts`, or a hand-made tarball, passes the tripwire. Only 6b catches it, after the bytes are permanent. *Trigger*: the first 6b mismatch, which promotes "a script-only publish credential" (for example, publishing via a CI job holding the token) to a ruling.
- **L-3. 6b's commands are pasted evidence, not a script.** *Trigger*: the first 6b record that is incomplete or wrong. That promotes 6b into the publish script's verify mode: the staged-mechanization ladder, first rung.
- **L-4. The B-U1 rail guard stays npmjs-only.** Two-registry presence lives in 6b. *Trigger*: whether consumers on GitHub Packages exist is asked at the next release's notes; if none, 6b's GitHub Packages half can retire by ballot.

## 7. Dependency disclosure (an obligation on the next release's notes)

The next release's public-npm artifact moves from the shape 14.1.0 and public 15.0.0 shipped (nested locks) to the fresh-clone shape (root lock). GitHub Packages 15.0.0 already ships the root-lock shape. Against **public 15.0.0**, the next notes MUST disclose, for the docs and application MCP bundles:
- **zod** 3.25.76 → 4.3.6;
- **ajv** 8.20.0 → 8.18.0;
- **application server only, js-yaml** 4.1.1 → 4.2.0, same major. The docs bundle embeds no js-yaml (orchestrator-verified on both 15.0.0 artifacts, 2026-10-03).

The versions are whatever the root lock pins at that release. The notes author re-reads them from the built bundles and does not copy these figures. The SDK's declared range is `zod ^3.25 || ^4.0`. Cold-install smoke on both 15.0.0 artifacts found identical tool lists, schemas and sampled outputs for the probed tools only.

## 8. Counter-arguments (fold-back applied)

1. **"Two scripted builds are enough; one tarball adds friction at Peter's terminal."**
   - *Folded*: the script prints the command and the sha1, so Peter's step is one checked command.
   - *Survives*: two builds can never be byte-identical (`Generated:` timestamps), so 6b could not use sha1 equality. The friction is the price of a decidable comparison.
2. **"A ballot is out of proportion; fix the step-5 text by chore."**
   - *Folded*: none. `governance/**` is ballot-only, and RS-6 is four texts disagreeing, so they move together or drift again.
   - *Survives*: ballot latency means the next publish waits on this ratification as well as on Ada's PR.
3. **"Tag-before-publish strands a tag if the publish then fails."**
   - *Folded*: the 5.1 dry run at S runs the same assertions before any tag exists.
   - *Survives*: a failure *between* 5.2 and 5.4 (auth, network, a registry error) leaves a pushed tag for an unpublished version. **Fork F-1**: retry at the same tag (my lean: nothing has shipped, the tag is still true) or bump a patch.
4. **Guards see one publish at a time** (the cross-read's unstated residual).
   - *Folded*: 6b compares both registries against one recorded sha1.
   - *Survives*: the comparison is post-publish. A divergent second publish is detected, never prevented (L-2).
5. **The in-repo agents' MCPs are not the shipped MCPs** (L-1).
   - *Folded*: disclosure (§ 7) and cold-install smoke.
   - *Survives*: until option B, a zod-4-only defect in an unprobed tool ships green, and no in-repo signal sees it.

## 9. Forks for Peter — RULED (Peter, 2026-10-03)

**The ruling, verbatim** (relayed by the orchestrator): *"Go with your reads on all four, have Thurgood ratify."* "Your reads" are the orchestrator's reads, as presented to Peter:
- **F-1, RULED: retry at the same tag.** Reason: nothing has shipped under it, so the tag is still true.
  - **Lost-tarball sub-case, RULED: bump a patch, never a mismatch on record.** This is the case where GitHub Packages already holds the bytes, the built tarball is lost, and a rebuild cannot reproduce the sha1.
- **F-2, RULED: phase 2 drafted against an open PR is PERMITTED, with the mandatory merge-confirmation line in the A6 form** (§ 3.4). Reason: on 15.0.0 the line caught the drift, and a replay shows the wording catches that class.
- **F-3, RULED: the register row's owner is `ada`.** Reason: the owner is whoever repairs the check when it goes red or dormant, and she maintains the instrument.
- **F-4, RULED: the row arms at the first release run under the law, not in the application PR.** The reason given to Peter: arming on paper before the script has ever published is how 15.0.0's manual guard failed.
  - **Recorded as owed and not taken**: Stacy's read on F-4 was owed (the fork was created at R2) and was not obtained. Peter ruled on the orchestrator's read.
  - Thurgood's lean below was (i). The ruling is (ii).

*The fork text as presented, kept for the record:*

- **F-1** — a failure after the tag is pushed (§ 8 item 3): retry at the same tag, or bump a patch.
  - **Thurgood's read**: retry at the same tag. Nothing has shipped, so the tag is still true.
  - **Stacy's read (R1)**: the same, with a case that needs its own ruling (A11). GitHub Packages may already hold the bytes when the 5.3 tarball is lost (temp dir, reboot). A rebuild cannot reproduce the sha1 (§ 8 item 1), so a "retry" there forces a 6b mismatch.
  - **What § 3.2 now does about it**: the operator keeps the tarball and its record until 6b is recorded. That prevents the loss but does not rule on it.
  - **The sub-question for Peter**: in the lost-tarball case, bump a patch, or publish a rebuild to npmjs and accept a recorded, ruled 6b mismatch.
- **F-2** — phase 2 against an open PR (§ 3.4): **permitted with the mandatory merge-confirmation line**, or forbidden (simpler, but phase 2 waits for the merge).
  - **Thurgood's read**: permitted, as drafted. On 15.0.0 it worked once and the line caught the drift.
  - **Stacy's read (R1)**: permitted with the line. A replay shows the § 3.4 wording would have caught 15.0.0. Her residual is (iv) in § 10.
- **F-3** — the register row's owner: `ada`, who maintains the instrument (drafted), or `thurgood`, who owns the law text (the publish-rail-guard precedent, where the author built the script).
  - **Stacy's read**: `ada`. The owner is whoever repairs a check that goes red or dormant, and that precedent does not separate the two options.
- **F-4** (new at R2, from A9) — when the row arms.
  - **Option (i)**: `armed`/`tool-time` in the application PR itself. This follows the publish-rail-guard same-commit precedent. The evidence already exists: the P2/P3 bites and #279's end-to-end `--dry-run`, 94/94. Stacy's binding condition carries over: if the row lands without steps 5–7, it lands `proposed`.
  - **Option (ii)**: `proposed` until the first release run under the law, with that release's 6b record as the flip PR.
  - **Thurgood's lean**: (i).
  - **Stacy**: her read is owed on this fork. It was not in her R1, because A9 created it.

## 10. Review round record

### [STACY R1]

2026-10-03. Pre-step: no `[@STACY]` mentions in this file. Read at `1453dad6`: this ballot; `scripts/release-publish.ts`; `scripts/pack-assert.ts` §§ 1–10; `package.json` scripts; `lane-timing.yml` (the #281 step); my RELEASE record § PHASE 2; the two-phase issue and its sweep; Ada's issue (2026-10-03 sections); the four consult reads. Every "measured" below was run by me on 2026-10-03. Nothing was published. No `.npmrc` was read: npm used it from its own directory.

**(1) § 3 against the instrument.**

Matches, verified against the source:
- 5.1 order: clone, `npm ci`, `check:drift`, `npm pack` with scripts on, then `verify:token-index-clean`, then pack-assert.
- 5.3's three tag checks: the `--expect-sha` prefix match, `merge-base --is-ancestor` against `origin/main`, and the `package.json` version at the tag.
- The `npm whoami` preflight runs before the clone. **Measured**: exit 1 (ENEEDAUTH) from this worktree and from a non-repo directory; `3fn` from the main checkout. "Refuses from a worktree" holds on this machine.
- GitHub Packages publish, then the printed `shasum` line and the 5.4 command; the tripwire's text; P2/P3 as recorded.

Mismatches:
- **§ 2 P2, consequences bullet 2 (L57)**: "run `check:drift` and `verify:token-index-clean` **before it packs**" contradicts P1 correction 1 (L48) and the script. `verify:token-index-clean` runs after the pack.
- **§ 3.2 5.1's pack-assert list** leaves out 10e (no machine path in `dist/**`). It is not wrong, but the list is not the whole check.
- **§ 3.2 5.3**: `--expect-sha` is optional in the script. Without it, the only link between the tag and S is ancestry plus version. The step's command always passes it, so the law holds only while the operator types the step's command. This is an observation, not an amendment.

**(2) 6b, executable blind?** No, as written. I ran each 6b command for 15.0.0 and found three defects:
- **(a) The scope-mapping trap.** The main checkout maps `@3fn:registry` to GitHub Packages. **Measured** from it: `npm view @3fn/core@15.0.0 dist.shasum --registry https://registry.npmjs.org` returns `65d2ec0b…`, which is **GitHub's** sha1. Adding `--@3fn:registry=https://registry.npmjs.org` returns `48dd8cdd…`. 6b's file-count command (`npm pack @3fn/core@<v> --registry <r>`) therefore fetches GitHub's tarball for "npmjs" from that directory. On 15.0.0 it would have recorded 1,638 = 1,638 and hidden R-2 on the count. (The npmjs sha1 survives only because that read is `curl`.)
- **(b) The directory.** "a directory whose npm config authenticates (on 2026-10-03 the fresh clone's directory did)". **Measured**: from a directory with no `.npmrc`, the GitHub read returns E401. A fresh clone carries no `.npmrc`, because it is gitignored. From the main checkout: sha1 `65d2ec0b…`, `time["15.0.0"]` = `2026-10-03T02:08:27Z`. The law text has to name the main checkout, the same config 5.3's preflight proves.
- **(c) The comparand is never committed.** The script's sha1 is in `release-publish-record.json`, in an OS temp directory. 6b compares against it, but nothing pastes it into the `.txt`. Phase 2 could then compare one registry with the other but never with the script.

Present and adequate: per-registry `time[<v>]` (the GitHub `time` map is readable through `npm view` from the main checkout); the stop before step 7; the fallback-used line.

**(3) F-2, the two-phase form.** My read: **permitted, with the line.** On 15.0.0, forbidding it would have delayed nothing that mattered, and the line caught a real change. **Replayed**: `git diff --quiet 2f55329c eadc7f45 -- docs/releases/15.0.0/publish-verification.txt` returns rc=1, so the § 3.4 wording **would have caught 15.0.0**. Three gaps remain:
- It diffs the `.txt` only. #273 also carried Ada's issue section, which phase 2 read at `2f55329c`. That file did not change this time; the scope should be every path phase 2 read from the PR.
- It does not say where the line lands. On 15.0.0, phase 2's own PR (#274) merged 16 s after #273, so the line needed a third record-only PR (#275).
- It does not say what happens to a finding that a post-read commit resolves. On 15.0.0, R-4 was fixed *because of* the read. The record kept it as raised-and-resolved, and the text should require that.

**(4) Forks (the pick is Peter's).**
- **F-1: retry at the same tag.** No bytes exist under the tag, so it is still true. One case the fork omits: GitHub Packages already holds the bytes, then the 5.3 tarball is lost (temp directory, reboot). A rebuild cannot reproduce the sha1 (§ 8 item 1's own reason), so "retry" becomes a forced 6b mismatch. That case needs a ruling too.
- **F-3: `ada`.** The row's `checks[]` will name her script, pack-assert § 10 and the tripwire. The owner should be whoever repairs a check that goes red or dormant. The publish-rail-guard precedent does not tell the two options apart: there the law author and the builder were the same agent (Thurgood).

**(5) RS-6…RS-9 absorption.**
- RS-6: absorbed (§§ 3.1–3.7, the straggler sweep).
- RS-7: absorbed (§ 3.2's "guards live in the command").
- RS-9: absorbed apart from the item (3) gaps.
- **RS-8 residue**: 6b records `time[<v>]`, but what produced R-4 is still taught where the operator meets it. That is step 6's rail paragraph ("the registry may just not have indexed the version yet", RELEASE-FLOW L142–144) and `verify-publish-rail.sh`'s FAIL[version] message. Neither points to `time[<v>]`, and the § 5 item 2 grep pattern does not match them. The sweep's "checked accurate" for the rail script judged it against the publish-path phrases, not against RS-8.

**(6) Counter-arguments, fold-back.**

Absorbed by the ballot: the one-tarball friction (§ 8.1), proportion (§ 8.2), the stranded tag (§ 8.3, partly; see F-1), and one publish at a time (§ 8.4 / L-2).

What survives, added:
- **(i) The floor misses § 10.** Section 10 contributes 16 assertions: 8 root files, themes, 2 for leftovers, the bundle count, 3 bundles, and the machine path. 94 − 16 = 78 ≥ 75, so a refactor that drops § 10 entirely stays green in CI. The script has no floor either: it refuses only on a failed finding. The floor selects the script, not the section. It can also go stale upward, since the gap widens as pack-assert grows. Owners: Thurgood (the step) and Ada (the script). A3's committed tally at least makes a drop visible at phase 2.
- **(ii) Row (j)'s habit.** CI placement is safe. The risk is local: "pack-contents is red, expected" gets learned in the main checkout, and the same labels later meet a script red, which comes from a fresh clone and so is never a row-(j) red. This is Ada's to mitigate, for example with a hint line in the nested-roots detail.
- **(iii) The signing-chain cost of the charter follow-ups** (sweep B1's open check, answered). My RELEASE row sits in the rendered unit `#the-trigger-set-the-114-superset-table-names-never-numbers` (`stacy.dispositions.yaml`: `re-pointed`, Stacy-signed, `canonicalHash` pinned). The charter PR stales it, which costs one Stacy re-sign (it enters Peter's Stacy-signed frame) and one operative-set confirmation. My intent: `stacy.overlay.md` L73's consumer row stays unchanged, because a consumer has no step-6 record. Thurgood's B2 row: check whether it is rendered. The cost is small, but § 5 item 6 should name it.
- **(iv) Under F-2 "permitted",** the pass's open-PR read shapes the record before it merges (R-4). It is not a gate, since #273 merged regardless. The retention rule in A6 keeps that visible; it does not remove it.
- **(v) The closure check reads committed state.** pack-assert § 1 reads the committed `floor-closure.json`, which the script never regenerates (pack-assert's header leaves that to callers). This is low priority and Ada's.

**(7) My RELEASE row, for the charter PR to lift verbatim** (`canonical/agents/stacy.md` L393; the consumer overlay is unchanged):
- **Event cell**: `**Two phases, one record**: phase 1 on the release squash S, before the tag; phase 2 at the merge of the step-6 release-record PR`
- **Scope cell**: keep the current text, then append: `Phase 2 reads the committed step-6 record — the rail result and the two-registry record (each registry's time[<v>], file count and sha1, equal to the publish script's recorded sha1) — against the published bytes; until it does, the record reads publish-rail liveness: owed.`
- If F-2 is ruled "permitted", add: `Drafted against the open record PR, it ends with the merge-confirmation line.`

**(8) Amendments.** \* = must land before Peter's ruling.
- **A1\*** § 3.3: every `npm` command in 6b carries `--@3fn:registry=<r>` beside `--registry <r>` (item 2a).
- **A2\*** § 3.3: run the GitHub Packages read from **the main checkout**, the config 5.3's `whoami` proved, and drop the fresh-clone parenthetical (item 2b). § 1 ruling 4 is the ruling's record and stays.
- **A3\*** §§ 3.2–3.3: paste `release-publish-record.json` from 5.3 into the step-6 `.txt` (commit, sha1, fileCount, bytes, pack-assert passed/total, createdAt). Record 5.1's dry-run tally too (item 2c).
- **A4** § 3.3: beside `dist.shasum`, record the sha1 of each fetched tarball's bytes. That is the independent read; phase 2 made it on 15.0.0.
- **A5\*** § 2 P2, L57: "check:drift before the pack and verify:token-index-clean after it" (item 1).
- **A6\*** § 3.4, the confirmation line (item 3):
  - path scope: every file phase 2 read from the PR;
  - placement: a follow-up record-only PR if phase 2's own PR has already merged;
  - a finding resolved by a post-read commit stays in the record, with its resolution.
- **A7** § 3.4: phase 1 runs on S **after 5.1 is green**, because a red 5.1 moves S. It reads 5.1's tally (A3).
- **A8** § 5 item 6: name the re-sign cost (item 6 iii). Add to Thurgood's LIVENESS follow-up: if F-2 is permitted, a phase 2 drafted against an open PR with no confirmation line is also an event without a complete record.
- **A9** § 4: the comment's "(PR after #279)" becomes #281; the history's "pending P2 observed leg and P3 bite" is stale; name the PR that flips `check_state` and fills `checks[]`, and what `checks[]` will list. My ARMING read fires at that PR's merge and needs it named.
- **A10** § 3 or § 5 item 2: RS-8's residue (item 5). Add an edit site or a straggler pattern (`indexed|indexing`) for step 6's rail paragraph, and a pointer for the rail script's message, which is Thurgood's script. Named, not drafted.
- **A11** § 9 F-1: add the lost-tarball case (item 4). § 3.2 5.3: keep the tarball and its record until 6b is recorded.

**Verdict: APPROVE-WITH-AMENDMENTS.** 11 amendments. A1, A2, A3, A5 and A6 must land before Peter's ruling; the rest may land with R2 or be recorded as residuals with triggers. Forks surfaced, not picked: F-1 (same tag), F-2 (permitted, with the line), F-3 (`ada`).

> No pass, at any grain, is ever a required check, a review gate, or a blocking condition on any PR. This round reviews law text; it gates no PR.

### [THURGOOD R2]

2026-10-03. Pre-step: there are no `[@THURGOOD]` mentions in [STACY R1]. Incorporated into the body (woven in, not appended). Status stays **DRAFT**. Forks F-1, F-2 and F-3 stay open, each with both reads written into § 9. A9 surfaced a new fork, F-4.

**Disposition tally: 11 of 11 amendments incorporated, 0 answered with no change.** Of her item-(1) notes, the 10e omission is incorporated and the `--expect-sha` observation is answered (below).

| # | Disposition | Where |
|---|---|---|
| A1\* | Incorporated. Every 6b `npm` command carries `--registry <r> --@3fn:registry=<r>`, with her 15.0.0 measurement as the reason | § 3.3 |
| A2\* | Incorporated. 6b runs from the MAIN checkout. The fresh-clone parenthetical is dropped from the law text; § 1 ruling 4 stays as the ruling's record | § 3.3 |
| A3\* | Incorporated. The 5.3 `release-publish-record.json` contents and 5.1's tally are pasted into the step-6 `.txt` as 6b's comparands | §§ 3.2, 3.3 |
| A4 | Incorporated. Each fetched tarball's own `shasum` is recorded beside `dist.shasum`, so four sha1s must equal the record | § 3.3 |
| A5\* | Incorporated. `check:drift` runs before the pack and `verify:token-index-clean` after it | § 2 P2 |
| A6\* | Incorporated. Scope is every file phase 2 read; placement is phase 2's PR if open, else a follow-up record-only PR (#275's case); a post-read resolution stays in the record | § 3.4 |
| A7 | Incorporated. Phase 1 runs on S after 5.1 is green, and reads 5.1's tally | § 3.4 |
| A8 | Incorporated. The signing cost is named, and LIVENESS gains the F-2 no-line case | § 5 item 6 |
| A9 | Incorporated. #281 is named; the history line is corrected; the flip PR and the full `checks[]` are named. This opened **F-4** (arm at application vs. at the first release run) | § 4, § 9 |
| A10 | Incorporated. New edit site § 3.8 (the rail paragraph's indexing-lag sentence); the straggler pattern gains `indexed\|indexing lag` and the rail script; the script's message is named, not drafted | § 3.8, § 5 items 2 and 8 |
| A11 | Incorporated. Keep the tarball and its record until 6b is recorded; the lost-tarball case is added to F-1 as a sub-question | §§ 3.2, 9 |

**Answered, no change**: `--expect-sha` is optional in the script, so the tag-to-S link rests on the operator typing step 5.3's command. The law text always passes it. Making it mandatory in the script is Ada's call, and this ballot does not legislate the script's argument parser. **Residual**: an operator who drops the flag gets ancestry plus a version match, not identity with S.

**A correction to the brief I was handed.** The orchestrator's message called `verify-publish-rail.sh` "Ada's file". The register says otherwise: row `publish-rail-guard` has `owner: thurgood`, and I built the script at Spec 123 Task 7. Stacy's A10 reads the same way. The follow-up in § 3.8 is therefore an issue naming me, with a grant. That is needed because `scripts/**` is outside my charter write scope.

**Stacy's added residuals, recorded:**
- **(i) The floor misses § 10. SURVIVES until a lane PR.**
  - **Proposed form**, additive and inside my P1 scope (deletions 0): in the same step's `run:` block, add `PUB=$(grep -c "^PASS: publish path:" "$RUNNER_TEMP/pack-contents.out")` and `[ "$PUB" -ge 14 ]` (16 today: 10a 8 + 10b 1 + 10c 2 + 10d 1+3 + 10e 1). A refactor that drops § 10 then reds the lane, whatever the total.
  - **Raising `M ≥ 75`** would delete a line, which is outside P1. It is not needed once the section floor exists.
  - **The script's own floor** (refuse if the publish-path PASS count is below 16): Ada's. Routed to her as a candidate deferred row (k) on her issue; I do not edit her file.
- **(ii) Row (j)'s false-alarm habit. SURVIVES.** Ada's to mitigate, for example with a "nested `node_modules` present? this red is row (j); the script's fresh clone never shows it" hint in the 10d detail. Routed.
- **(iii) The signing cost of the charter follow-ups. ABSORBED** (§ 5 item 6).
- **(iv) Under F-2 "permitted", the read shapes the record before merge. SURVIVES**, made visible by A6's retention rule. It is the price of the permission, and F-2 is Peter's.
- **(v) `floor-closure.json` is never regenerated by the script. SURVIVES.** Ada's (pack-assert's header leaves regeneration to callers). Routed.

**The one thing Peter must read before ruling**: A1 in § 3.3. The scope-mapping trap is the difference between a step 6b that catches a 15.0.0-class divergence and one that certifies it.
