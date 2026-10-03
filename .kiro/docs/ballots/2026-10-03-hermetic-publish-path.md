# Ballot Measure: the hermetic publish path — one tarball, from the tag, compared on both registries; the two-phase RELEASE form

**Date**: 2026-10-03 (drafted)
**Drafted by**: Thurgood (Opus), at the orchestrator's brief carrying Peter's 2026-10-03 ruling
**Status**: **DRAFT.** Ratification waits for **Ada's fix PR to merge**. This text names her publish script and the `prepublishOnly` tripwire, and law must not cite an instrument that is not on `main`. Before Peter rules, the author corrects any name this draft got wrong (see § 2 "Preconditions"). No `Ratified-machine:` line: that mechanism belongs to the one ballot `completion-criteria-parity` parses (the B-U1 omission precedent).
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
- `governance/release-management-system.md` § 5 (line 41) (§ 3.5).
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
  - the script must itself run `check:drift` and `verify:token-index-clean` before it packs (Ada confirms that it does);
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
> 4. Publish mechanics: § "The sequence" steps 5–6 — **one tarball, built by `scripts/release-publish.ts` in a fresh clone at the tag, published unchanged to both registries**. The dual-registry playbook still supplies the public-npm flags and its auth notes: public npm needs Peter's login/2FA, and the token expires in about 30 days, so an E404 on publish is a masked auth failure. **The release notes disclose any change in embedded dependency versions against the previous release's public artifact** (the first instance is § "Dependency disclosure" of ballot `2026-10-03-hermetic-publish-path`).

### 3.2 `.kiro/hooks/RELEASE-FLOW.md` § "The sequence", step 5 (whole step replaced)

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
>      - It then runs `pack-assert` on the tarball: no leftover `dist/` files, the MCP bundle shape (root `node_modules` only), no `dist/{ios,android,web}/**`, the eight root token files, `themes: []`, the closure present.
>      - It runs these checks itself because a tarball publish runs no lifecycle scripts (P2).
>
>      **Nothing is published.** A red stops the release before any tag exists; fix it on a branch and re-merge (back to step 1).
>    - **5.2 Tag S** and push the tag: `git tag -a v<version> <S> && git push origin v<version>`. **The GitHub release is NOT created yet** (step 7).
>    - **5.3 Publish to GitHub Packages**: `npx tsx scripts/release-publish.ts <version> --expect-sha <S>`, **run from the main checkout**. GitHub Packages auth is that checkout's gitignored `.npmrc`; an `npm whoami` preflight refuses before any build if it fails, and it refuses from a worktree.
>      - It repeats 5.1 in a fresh clone **at the tag**.
>      - It refuses unless `v<version>` resolves to `--expect-sha <S>`, the tag commit is on `origin/main`, and the tagged `package.json` version equals `<version>`.
>      - It then records the tarball's path, file count and sha1, publishes **that tarball** to GitHub Packages, and prints the public-npm command for 5.4 with the sha1 to check.
>    - **5.4 Publish the same tarball to public npm** (Peter's terminal, web 2FA): first check the printed sha1 against the file, then run `npm publish <tarball> --registry https://registry.npmjs.org --@3fn:registry=https://registry.npmjs.org --access public`. **Never a folder publish, never `--ignore-scripts`, never a tarball the script did not produce.** A folder publish is refused by `prepublishOnly`, which names this script. That refusal is the tripwire, not the guard: the guard is the script.
>    - **Guards live in the command the operator runs, never in a list addressed to a seat** (RS-7). A release check that cannot be put in the script is written into this step's text, at the point where the operator meets it.
>    - **A tarball publish runs no lifecycle scripts**: no `prepublishOnly`, no `postpublish` (npm 10.9.3 source; ballot `2026-10-03-hermetic-publish-path` P2). The script runs the pre-publish checks itself. **Step 6 is the only post-publish check.** `postpublish`'s `token-index/` warning fires only on a folder publish, which the tripwire refuses.

### 3.3 `.kiro/hooks/RELEASE-FLOW.md` § "The sequence", step 6: the two-registry record (inserted after step 6's code block and its "do not announce" paragraph, before "**Land the result on `main`**")

**Insert:**
> **6b — the two-registry record.** In the same `.txt`, record for **each** registry:
> - the version is present;
> - the registry's own publish time, from the packument's `time["<version>"]`, never an operator estimate (RS-8);
> - the tarball's file count;
> - `dist.shasum`.
>
> **Both sha1s must equal the sha1 the script recorded at 5.3.** Any mismatch is a release incident: record it and stop before step 7. Published bytes cannot be replaced, so the remedy is Peter's ruling, not a re-publish.
>
> Commands:
> - **npmjs**: `curl -s https://registry.npmjs.org/@3fn%2fcore` for `time` and `versions["<v>"].dist.shasum`.
> - **GitHub Packages**: `npm view @3fn/core@<v> dist.shasum time --json --registry https://npm.pkg.github.com`, run from a directory whose npm config authenticates to GitHub Packages (on 2026-10-03 the fresh clone's directory did).
> - **File counts**: from each fetched tarball (`npm pack @3fn/core@<v> --registry <r>` then `tar -tzf … | wc -l`).
>
> **Only if the GitHub Packages read fails on auth**, ask Peter for a `read:packages` token, and record that the fallback was used.

### 3.4 `.kiro/hooks/RELEASE-FLOW.md` § "The sequence", step 6: the two-phase RELEASE claims pass, plus a new step 7 (appended after step 6's last paragraph, "…without a committed record the pass has nothing to read.")

**Append:**
> **The RELEASE claims pass runs in two phases, recorded in one file** (Stacy's pass; this text sets only *when*):
> - **Phase 1** runs on **S, before the tag (5.2)**. It covers the release delta, the 5a owed-set paste and the 5b arming line. Its record lands by a record-only PR and states `publish-rail liveness: owed`.
> - **Phase 2** is a dated section appended to the same record. It reads the committed step-6 `.txt`: the rail result and the 6b two-registry record. **Its trigger is the merge of the step-6 release-record PR.**
>
> **Phase 2 may be drafted against that PR while it is still open.** If it is, it MUST end with a **merge-confirmation line** written at the PR's merge:
> - It records `git diff --quiet <read-sha> <merge-sha> -- docs/releases/<v>/publish-verification.txt`.
> - If the merged file differs from the read, the line records every changed hunk re-read and every phase-2 reading it changes.
> - Until that line exists, the liveness reading is "read, not committed". (RS-9: on 15.0.0 the merged file differed from the one phase 2 read, and only the confirmation line caught it.)
>
> 7. **Announce last**: create the GitHub release (`gh release create v<version> --notes-file docs/releases/release-<version>.md`) **only after** step 6's rail PASS and a matching 6b record. Notes must not state a guard as applied before the step that applies it has run (R-3).

### 3.5 `governance/release-management-system.md` § 5 (line 41)

**Before:**
> 5. **Publish per RELEASE-FLOW.md** (repo-internal; and the dual-registry playbook it references): release PR → the release owner merges → publish from merged `main` → then tag and GitHub release: `git tag -a vX.Y.Z && git push origin vX.Y.Z && gh release create vX.Y.Z --notes-file docs/releases/release-X.Y.Z.md`.

**After:**
> 5. **Publish per RELEASE-FLOW.md** (repo-internal): release PR → the release owner merges (commit **S**) → a dry-run pack at S → **tag S** (`git tag -a vX.Y.Z <S> && git push origin vX.Y.Z`) → **one tarball**, built by the publish script in a fresh clone at the tag and published unchanged to every registry → verify both registries (same sha1) → **then** the GitHub release (`gh release create vX.Y.Z --notes-file docs/releases/release-X.Y.Z.md`). Never publish from a working checkout, never `--ignore-scripts`, never a folder publish.

*Shipped-doc note*: this file ships in the package (`files[]` keeps `governance/`). The edit is therefore consumer-visible and rides the next release's notes as a 🔵 internal-process change.

## 4. The register row (verbatim; applied as `proposed`)

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
  # P2 second leg and P3 are recorded (2026-10-03, pointer in § 2). Arms (tool-time) only when RELEASE-FLOW steps 5–7
  # land; until then, proposed. The CI half (`test:pack-contents` in lane-functional-root, PR after #279) is
  # build-time evidence, not this row's tool-time check. ARMING read: Stacy.
  # Owner is ada because she maintains the instrument (script, tripwire, pack-assert); the law text is Thurgood's.
education:
  disposition: "AUTHOR: RELEASE-FLOW steps 5–7 (ballot 2026-10-03-hermetic-publish-path § 3) and governance/release-management-system.md § 5 are the education. PRUNED: the 2026-10-02 deferral's three manual guards are superseded by the script (Ada's issue records that). HONEST REACH: a publish run with --ignore-scripts, or of a tarball the script did not produce, is NOT detected before publish; 6b's sha1 comparison detects it after publish, and published bytes cannot be replaced"
history:
  - { date: 2026-10-03, change: "entry created at ballot 2026-10-03-hermetic-publish-path (DRAFT), from 15.0.0's two-artifact divergence (Stacy R-2; RS-6/RS-7/RS-8). check_state proposed pending the ballot's P2 observed leg and P3 bite (P2 verified by source read, Ada R2)", by: thurgood }
```

## 5. Application (at ratification, one PR, Peter-merged under the governance carve-out)

1. The record-first Status flip in this file. Then §§ 3.1–3.5 and § 4, verbatim. Then the README "Ballots on record" entry.
2. **Straggler sweep**: `grep -rn "Publish from merged\|publish from merged\|git switch main && git pull" .kiro/hooks governance .kiro/steering canonical`. Every hit is either brought in line or listed as intentionally historical.
3. **The tasks.md annotation owed by the absorbed issue (its owed act 2)**: a dated annotation on Spec 123 `tasks.md`'s line "RELEASE fires at the release tag, before publish", pointing here (phase 1 at S before the tag; phase 2 after the step-6 record PR).
4. `rebuild_index` after merge: `governance/` is a served root.
5. Close and archive `.kiro/issues/2026-10-02-release-audit-two-phase-clarification.md` (`git mv` to `archive/`).
6. **Notify Stacy** of the before→after and the effective date. This is a standards change to her pass's timing, so notification is a charter duty, not a courtesy.

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

## 9. Forks for Peter

- **F-1** — a failure after the tag is pushed (§ 8 item 3): retry at the same tag, or bump a patch.
- **F-2** — phase 2 against an open PR (§ 3.4): **permitted with the mandatory merge-confirmation line** (drafted, on tonight's evidence that it worked once and the line caught the drift), or forbidden (simpler, but phase 2 waits for the merge).
- **F-3** — the register row's owner: `ada`, who maintains the instrument (drafted), or `thurgood`, who owns the law text (the publish-rail-guard precedent, where the author built the script).

## 10. Review round record

*(empty — Stacy R1 owed)*
