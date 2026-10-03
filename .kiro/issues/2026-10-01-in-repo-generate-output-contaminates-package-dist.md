# Issue: this repo's own `output: './dist'` makes the package's ship directory the working directory of its own token generation, and a second, separate writer fills `dist/{ios,android,web}/` — nothing asserts that what ships equals what the published base config produces

**Date**: 2026-10-01
**Status**: ACTIVE
**Owner**: Ada (config authoring and generator output layout are hers; she drafts the proposal). **Decision**: Peter — Ada's split packaging ruling (2026-09-29) recorded the root cause as "Peter's call". Any pick touches this repo's own tooling (`designerpunk.config.ts`, `scripts/generate-platform-tokens.ts`, `package.json` `exports`/scripts, `src/tools/integrity/inventory.ts`, `scripts/build-name-contract.ts`, the browser bundle script) and, for one option, test code in `src/build/__tests__/` (Thurgood's test governance — flag, do not decide).
**Trigger**: **before release 2's RELEASE record opens** — by that event Peter's pick (or an explicit recorded "defer past release 2") is on a branch, alongside the M0a issue's pick. **U2b's unit-PR merge is the checkpoint**: 16.3's `files[]` negations land with it, and the merge is when to confirm this issue is still ACTIVE. Honest scope of the deadline: with 16.3's negations in place **and** release 2 published through scripts (`prepublishOnly` → `build` → `prebuild`), this issue does **not** by itself put a wrong file in the package; it leaves that outcome unasserted. The record is the deadline because release 2 is the first package published under the 16.3 containment and the first with `pack-with-scripts` as a check — if the pick is a code change, it may follow the record, but a published package should not be the first place the question is asked again.
**Source**:
- Ada's **split packaging ruling** (2026-09-29), recorded in Spec 123's `.kiro/specs/123-consumer-distribution/completion/task-15-completion.md` on the unit branch (`task/123-u2b-profile`, read with `git show origin/task/123-u2b-profile:<path>`): **L94** (pack-with-scripts: `npm pack --ignore-scripts` tests workspace leftovers, not the published set — how the snapshot refusals found a mix of real and apparent staleness), **L112** (Task 16 carry: 16.3 names `!dist/ios/**`, `!dist/android/**`, `!dist/web/**`), **L120** (the carried governance item: "`output: './dist'` in this repo re-contaminates the package's `dist/` on every in-repo generate (root cause; Peter's call)"); also `task-15-5-completion.md` L159.
- Ada's **two 16.3 consults** (2026-10-01).
- **Peter's request** (2026-10-01) that carried items be captured as tracked issues by their owners.
- **Sibling issue**: `.kiro/issues/2026-10-01-integration-guide-m0a-vs-snapshot-negative.md` ("Related root cause — separate item") — that issue's trigger is independent of this one; neither covers the other.

---

## A correction to the premise this issue was asked to file

The carried wording (task-15 L120, my M0a issue's "Related root cause", and the request for this issue) says **every in-repo `generate` writes `dist/ios/…`, `dist/android/…`, `dist/web/…`**. Reading the generate path, that is **not what the CLI does**. There are **two separate writers into `dist/`**, and only one is the config line:

1. **The config-driven writer (flat, root of `dist/`).** `designerpunk.config.ts` L26 is `output: './dist'`. `npx designerpunk generate` (`src/cli/designerpunk.ts` `runGenerate` L163; `generateTokenFiles(tokens, config)` at L213) writes to `config.outputDir` (`src/generators/generateTokenFiles.ts` L54), and the file path is built as `${outputDir}/${config.fileName}` (`src/generators/TokenFileGenerator.ts` L1753). So it writes **flat** files: `dist/DesignTokens.{web.css,ios.swift,android.kt}`, `dist/ComponentTokens.{web.css,ios.swift,android.kt}`, `dist/DesignTokens.dtcg.json`, and `dist/DesignTokens.figma.json` (`generateTokenFiles.ts` L240–L318). It does **not** write `dist/ios/…`.
2. **The prebuild writer (same flat set, hard-coded to `dist`).** `package.json` `prebuild` = `generate:types && generate:platform-tokens`, and `build` runs it, so `prepack` (`npm run build`) and `prepublishOnly` (`npm run build && …`) both reach `scripts/generate-platform-tokens.ts`. That script calls `generateTokenFiles(tokenInput, config)` (L83, so the config's `output` for the token files) **and** writes the component tokens and `DesignTokens.dtcg.json` to a **hard-coded `path.join(process.cwd(), 'dist')`** (L34, L88, L123). The two agree today only because the config says `./dist`.
3. **The subtree writer (a different mechanism entirely).** `dist/{ios,android,web}/DesignTokens.*` come from `src/build/BuildOrchestrator.ts` L503 (`path.join(this.config.outputDir, platform)`), whose default config is `outputDir: './dist'` (`src/build/types/BuildConfig.ts` L113). It is instantiated with that default in `src/build/__tests__/BuildOrchestrator.test.ts` (`new BuildOrchestrator()` L23; builds at L287–L554, including `['web','ios','android']` at L405), a suite inside `jest.config.js` `roots: src` and not in an ignore pattern. So **running the test suite writes the subtrees into the real `dist/`**, not `generate`.

**Evidence, and its limit.** In the main checkout (read-only `ls`): `dist/ios/DesignTokens.ios.swift` is dated Sep 29 00:37 and is 39814 bytes; the root `dist/DesignTokens.ios.swift` is dated Oct 1 12:13 and is 39619 bytes; the `dist/{ios,android,web}/` directories themselves date from Jun 24. Same-named file, different bytes, different age: the subtree copies are **not** refreshed by `generate`/`build` and drift from the root files. That is consistent with the test being the writer; **I read the code and the mtimes, and did not re-run the test to reproduce the write**. Say "traced, not reproduced".

This also corrects the "mix of real and apparent staleness" at Task 15: the subtree files were genuinely stale relative to the root (different generator path, not refreshed); the root files were fresh (rewritten by prebuild) and looked stale only to an `--ignore-scripts` pack of a workspace that had not rebuilt. The M0a issue's and task-15 L120's one-line statement of the root cause should be read with this correction (an erratum to those lines is a follow-up for whoever next touches them; I have not edited either from this file).

## What the 16.3 negations contain, and what they do not

**Contained.** `!dist/ios/**`, `!dist/android/**`, `!dist/web/**` remove the subtree copies (writer 3) from the pack. `files[]` currently ships them through `dist/**/*.{js,d.ts,json,css,swift,kt}` (`package.json`); the negations are the containment for the *test-written* subtrees, whether or not `output` ever moves.

**Not contained, and unguarded.**
- **The root token files ARE the ship set and are regenerated from this repo's own config on every `npm run build`.** At a scripted pack/publish they are rewritten by prebuild from `designerpunk.config.ts` (`themes: []`), so a published root snapshot is the **base** theme. My earlier phrasing ("correct today by coincidence, not mechanically guarded", at the first 16.3 consult) was too strong for the scripted path: it is mechanically regenerated, not coincidental. It remains **unasserted** — I found no check that reads the root token files' content: `scripts/pack-assert.ts` checks that closure paths are present in `npm pack --dry-run --json --ignore-scripts` and its only `dist` mentions are comments; `verify:token-index-clean` covers `token-index/`; `check:drift` covers package-name drift.
- **Where the unguarded gap actually is:** (a) any pack taken with `--ignore-scripts` (what `pack-assert.ts` does by design) sees whatever is in the workspace `dist/`; (b) the root snapshots are whatever this repo's config produces at that moment — if someone registers a theme in `designerpunk.config.ts` (the file is documented as the reference example for product repos, so that edit is plausible), the shipped "base snapshot" silently becomes themed, and nothing fails; (c) a developer's working-tree `generate` (including with a scratch config edit) writes into the directory the next unscripted pack reads.
- **Three producers share one directory.** `tsc` (`tsconfig.json` `outDir: ./dist`), `esbuild` (`dist/browser/**`, `dist/mcp/**`) and the token generators all write into `dist/`, which is also what `files[]` and `exports` publish from. `dist/` is gitignored, so none of this is visible in review.

## What depends on the current path

The flat root `dist/` token files are read or published by:
- `package.json` `exports`: `./tokens.css` → `./dist/DesignTokens.web.css` (L84), `./component-tokens.css` → `./dist/ComponentTokens.web.css` (L85); `files[]` root-`dist` globs.
- **Browser bundle build-time fallback**: `scripts/build-browser-bundles.js` L109–L121 — candidate order `dist/DesignTokens.web.css`, `dist/web/DesignTokens.web.css`, `output/DesignTokens.web.css`, `output/web/…` (and the same four for `ComponentTokens.web.css`), merged into `dist/browser/tokens.css`. The first hit is the flat `dist/` file; the `dist/web/` candidate is a **second consumer of the subtree writer's output** (it would silently pick the stale subtree copy if the flat file were absent). `output/` is already an accepted fallback location, which matters for option A.
- **The M0a copy flow**: the Integration Guide's step 1 names `node_modules/@3fn/core/dist/DesignTokens.ios.swift` and `…ComponentTokens.ios.swift` / `.android.kt` (the flat root files). Not `dist/ios/…`.
- `scripts/build-name-contract.ts` L56–L57 (`dist/DesignTokens.web.css`, `dist/ComponentTokens.web.css`) — builds `dist/name-contract.json`, which ships.
- `src/tools/integrity/inventory.ts` L34–L50 (the integrity inventory lists the flat `dist/…` token files as non-optional) and `src/tools/integrity/cli/run-audit.ts` L77.
- Tests that read flat `dist/`: `src/__tests__/browser-distribution/bundler-resolution.test.ts` (L58, L62, L141+), `src/__tests__/package-drift-validation.test.ts` (L96, L159), `tests/consumer-integration.test.ts` (packed install).
- Figma tooling: `src/cli/figma-push.ts` L116–L130 and `src/cli/figma-extract.ts` L155–L169 read `output:` from `designerpunk.config.ts` by **regex** and fall back to `dist/DesignTokens.dtcg.json` — they follow a config change, but through a parse of the config text, not the loader.
- `pack-assert.ts` — nothing path-specific in `dist/` beyond closure presence (above); it would need a new check, not a path update, under any option.
- Nothing I found reads `dist/{ios,android,web}/` except the browser-bundle fallback above and agent text that *forbids* reading them (the Kenya/Data/Sparky overlay and prompt negatives, `tools/agent-generator/schema.ts` L73's example). So retiring the subtrees breaks nothing known.

## Options (drafted, not picked — the pick is Peter's)

The options split on **which of the two causes** they address: the config line (writers 1–2: root files) or the test-default (writer 3: subtrees). They compose; they are not exclusive.

### A. Move this repo's `output` to a non-package path (e.g. `./output`) and have the build produce the published root files into `dist/`
Generate becomes safe to run ad hoc; the ship set is produced only by the build step.
- **Cost**: a config change plus real work, because the build today relies on `output == dist`. `scripts/generate-platform-tokens.ts` hard-codes `dist` for component tokens and DTCG (L34/L88/L123) while token files follow the config — under a move the prebuild would split its own output across two directories unless it is rewritten; `exports` and `files[]` still point at `dist/` and so need a copy/emit-into-dist step (which is where "published set == base config" is then made explicit); `inventory.ts`, `build-name-contract.ts` and three test files change paths; the browser bundle script already accepts `output/` but would then find the fallback instead of the real file silently, which wants to become a hard error. The Figma regex readers follow the config automatically.
- **Surviving counter-argument**: it fixes writers 1–2 only. Writer 3 (the test default `./dist`) still writes the subtrees into `dist/` regardless of this repo's `output`, so A **alone leaves the leak that the 16.3 negations exist for**. And the build then needs an emit-into-`dist` step whose input is "this repo's config", so the sub-risk (b) — a theme added to the config reaching the ship set — is only closed if that step is hard-wired to the base config rather than reading `designerpunk.config.ts`.

### B. Keep `output: './dist'`; add a publish-time freshness and contents assertion
Extend the packaging checks (a new assertion in `pack-assert.ts` or a `prepublishOnly` step) to: pack **with** scripts; assert no `dist/{ios,android,web}/**` in the listing; assert the shipped root `DesignTokens.*`/`ComponentTokens.*` equal a fresh generation from a base config with `themes: []` (and that the config registers none).
- **Cost**: smallest code surface, no path moves, no test or tooling changes elsewhere; Thurgood owns the CI regime's standing scope for where it runs, Ada authors the content check. It makes the 16.3 containment **mechanical** (an assertion, not a belief).
- **Surviving counter-argument**: it **detects**, it does not remove the cause — `generate` and the test suite still write into the ship directory, so the assertion fires late (at pack), after a developer has already been misled by a contaminated workspace (the Task 15 experience). A freshness assertion comparing against a regeneration also needs the same generator state it is guarding, so it can pass for a wrong-but-reproducible output (e.g. a theme that was deliberately added). The check should compare against an *independent* statement of "base", which does not exist today.

### C. Split build output from generate output: this repo's `output` points outside the package, and the build writes the shipped root files from an explicit, base-only emit step decoupled from `designerpunk.config.ts`
A and an explicit ship step as one decision: `designerpunk.config.ts` becomes what it is documented to be (the reference example for product repos, free to carry a theme without consequences for the package), and the package's token files are produced by a dedicated build step that always runs the base theme.
- **Cost**: the largest of the three; everything in A, plus a deliberate new build step and its tests, and a ruling on whether `designerpunk.config.ts` is still the "working config" the Spec 094/118 docs say it is. Likely a task in a spec or an issue-driven change with owner routing, not an in-passing edit.
- **Surviving counter-argument**: it adds a second pipeline path (config-driven generate vs the dedicated emit) that can drift from the first — the divergent-second-path shape Spec 117 Task 3 removed for the token index. Whether the ship step should be a thin call into the *same* `generateTokenFiles` with a fixed base config (then it is mostly a config object, and C collapses toward A) or a distinct entry is the real sub-question; I do not know the answer.

### D. Fix the subtree writer only (independent of A–C)
Point `BuildOrchestrator`'s test default at a temp directory (or mock the write) so the suite stops writing into the real `dist/`.
- **Cost**: tiny and local to `src/build/__tests__/BuildOrchestrator.test.ts` — which is test code, so **Thurgood's/Lina's seat decides placement, not mine** (flag only). Composes with every other option, and would let the 16.3 negations become belt-and-braces rather than the only barrier.
- **Surviving counter-argument**: it removes the *known* writer; it does not fix the shape "ship directory is also a working directory", so the next test or script that defaults to `./dist` re-creates the problem (`BuildConfig.ts` L113 is itself a default pointing at the ship dir). D treats one instance, not the class.

### The fork this exposes, surfaced not picked
- **Prevent vs detect**: A/C remove the shared directory; B/D leave it and add a guard. Prevention costs tooling churn across six files; detection is cheap but leaves `dist/` a mixed workspace.
- **How much of `designerpunk.config.ts`'s role is to be the *package's* config vs a *reference example***: C only makes sense if it is the latter; A does not need the answer.
- **Whether release 2 waits on any of it**: with 16.3's negations and a scripted publish, release 2 is not known to ship a wrong file; the choice is about whether the guarantee is stated mechanically or kept by convention. That is a scheduling choice about the release, not a token one.

I am deliberately not stating a lean. Two of my own priors are in play: my split ruling chose the packaging-layer containment over the config change, so I have an interest in B/D looking sufficient; and my "coincidence" wording overstated the unguarded surface, which pulls the other way. Peter's pick should weigh the sub-risk (b) — a theme added to the reference config silently reaching the ship set — as the one failure none of the current guards would catch.

## Not in scope here

Any edit to `designerpunk.config.ts`, `package.json`, `scripts/generate-platform-tokens.ts`, `src/build/**`, `pack-assert.ts`, `inventory.ts`, the browser bundle script, or the Integration Guide. This issue is the tracked flag, the corrected measurement and the option set. The fixing change, when chosen, is Ada's (with Thurgood on the CI/test placement); the pick is Peter's.

---

## 2026-10-02 — Peter's ruling: DEFERRED past 15.0.0, behind three manual guards

**The ruling**: Peter, 2026-10-02, at the 15.0.0 release-prep sitting, relayed by the orchestrator with the words "verbatim-ish": *"Go with B, defer with the manual guards — and again, we need to capture this issue."*
- **Read as**: the structural options (A, C) are deferred past 15.0.0. The publish-time check (option B) and the test-write move (option D) are built right after the tag.
- **Inputs**: Ada's decision package (release-prep scratch, 2026-10-02) and the orchestrator consult (six seats).

**This release's procedure: three manual guards**, run at the 15.0.0 publish by the release's packaging seat (Ada) and cited in the release record:
1. **Fresh-clone publish.** Publish from a fresh clone at the merged release SHA, never the working checkout, so no workspace leftovers in `dist/` can ship.
2. **Packed-contents listing, with scripts on.** In that clone: `npm ci`, then `npm pack --dry-run --json` without `--ignore-scripts`, so `prepack` builds. The listing shows:
   - no `dist/{ios,android,web}/**`;
   - the eight root token files.

   **Also checked at the same step**: `designerpunk.config.ts` still reads `themes: []`. This is the read that covers sub-risk (b) above, which none of the mechanical checks catch.
3. **Native-member diff against the 14.1.0 tarball.** Compare the public member names of `dist/DesignTokens.{ios.swift,android.kt}` in the fresh-clone build with the 14.1.0 registry tarball.
   - **Expected difference**: exactly the four colours disclosed in 15.0.0's notes (`colorFeedbackSuccessText`, `colorTextDefault`, `colorTextMuted`, `colorTextSubtle`, and their Kotlin forms).
   - **Any other difference stops the publish** and comes back for a decision.

**Trigger (supersedes the header's)**: **the `v15.0.0` tag.**
- Right after it, Ada builds option B: a publish-time check of pack-with-scripts contents and base-config freshness, placed in CI by Thurgood.
- Option D (`BuildOrchestrator.test.ts` writes to a temp directory, not the real `dist/`) is routed to Thurgood/Lina, whose seat it is, in the same window.
- **B is blocking from the release after 15.0.0.** That release does not publish on manual guards.

**Status**: ACTIVE. A and C remain open as the "prevent" branch of the fork above. Peter's ruling picks sequencing (detect now), not that fork.

**What survives**: 15.0.0 is the second consecutive release whose base-snapshot guarantee is kept by a person following a list rather than by a check. The trigger above exists so that there is no third.

---

## 2026-10-03 -- 15.0.0 published from the working checkout: the deferral's guard #1 was not followed, and the two registries carry different bytes

**What happened.** The 2026-10-02 deferral above made **fresh-clone publish** the first of three manual guards. The GitHub Packages publish followed it (fresh shallow clone at `v15.0.0`, `npm ci`, scripted `npm publish`). The **public npm publish did not**: Peter ran it from the main checkout. RELEASE-FLOW step 5 itself says `git switch main && git pull && npm publish`; the fresh-clone rule lived only in this issue's guard list, so the human step followed the flow doc and the guard did not reach it. That is the same failure the deferral's closing line warned about, a base-snapshot guarantee kept by a person following a list.

**Consequence.** `@3fn/core@15.0.0` on the two registries has different bytes: GH 1638 files, sha1 `65d2ec0b140192bc0f0adc17b9ac6526332a6594`; public 1700 files, sha1 `48dd8cddbb360ff63d2d87cf7d0ac678ff6cc138`. The full record is `docs/releases/15.0.0/publish-verification.txt` (written under the release-files grant, step 6); in short:
- **62 inert stale `dist/` files only in the public artifact**: compiled residue of sources no longer on main (`dist/tools/release`, `dist/build/platforms`, `dist/build/validation`, `dist/tools/integrity`, and old `tokens.*` under `dist/components/core`). Nothing references them. 14.1.0 carried the same kind of residue on both registries, so this is the historical norm, not new.
- **The two MCP bundles differ substantively** (`dist/mcp/docs-mcp.js`, `dist/mcp/application-mcp.js`), plus 11 files that differ only in a `Generated:` timestamp. Public embeds zod 3.25.76 / ajv 8.20.0; GH embeds zod 4.3.6 / ajv 8.18.0. All are within the SDK's declared `zod ^3.25 || ^4.0`.
- Cold installs of both tarballs boot and answer identical tool lists, schemas and sampled outputs (docs 8 tools, application 21). No behavioural difference was found in the probed tools; that is not a proof for every tool.

**A second writer class, named as such.** This issue lists three writers into `dist/` (the config-driven writer, the prebuild writer, the `BuildOrchestrator` test writer) and a shared-directory shape. The divergence adds a different kind of contamination that none of those three explain: **`build:mcp` resolves its dependencies from the gitignored nested `mcp-server/node_modules` and `application-mcp-server/node_modules` when they exist, and from root `node_modules` when they do not.** The shipped bundle therefore depends on whether the *publishing checkout* has nested installs, not on the commit. This is a writer-input problem (the build is not hermetic), where the three above are writer-destination problems. Separately, the stale-`dist/` residue is the plain "shared directory, no clean step" shape, and `tsc` does not remove outputs for deleted sources; I had not listed that as a writer, and it is the cause of the 62 files. Both are recorded here as additions to the issue's scope, not as a new issue, because the fix shape overlaps: one guarded publish path.

**Peter's ruling, 2026-10-03** (relayed by the orchestrator, verbatim): **"Option 1"** -- accept 15.0.0 as published on both registries; record the divergence; fix the class next. Option 2 (15.0.1 from a fresh clone to both registries, `npm deprecate` the public 15.0.0) was **not taken**.

**Class-fix candidates (not picked; they await an Ada + Thurgood consult before any brief):**
1. **Hermetic `build:mcp`**: have the build install the nested dependencies first, so the shape no longer depends on the checkout.
2. **Single-rooted resolution**: remove the nested package manifests and locks and hoist the SDK dependency to root.
3. **A `prepublishOnly` guard** against stale `dist/` files (clean `dist/` before build, or assert the pack listing equals a fresh-clone listing) and against a non-fresh-clone publish.
4. The deferral's option B (pack-with-scripts contents and base-config freshness check) and option D (the `BuildOrchestrator` test writes to a temp directory) are still owed under the 2026-10-02 section; the `v15.0.0` tag, their stated trigger, has now passed.

*What would survive these:* (1)/(2) change which dependency versions ship (zod 3 vs 4 is the visible difference), so choosing the shape is a dependency-policy decision, not only a build tidy-up, and CI currently tests both shapes. (3) detects but a guard that only exists in `prepublishOnly` is bypassed by `--ignore-scripts` and does nothing for a publish that does not run it; a flow-doc fix (RELEASE-FLOW step 5 saying "fresh clone") is cheaper, and is a governance-adjacent doc this seat does not edit.

**Status**: stays **ACTIVE**. The deferred work has not been done, and this section widens the scope. No change to the header's Owner or Decision lines.

**Updated trigger (supersedes the 2026-10-02 trigger):** **the fix must merge before any 15.0.1 or 15.1.0 publish, to either registry.** Until it does, no publish may rest on manual guards alone, and guard #1 must be stated in RELEASE-FLOW step 5 (or the publish run from a script that enforces it) so the human step cannot skip it. The Ada + Thurgood consult is the next action, ahead of any brief.

---

## 2026-10-03 -- after the Ada + Thurgood consult: Peter's picks, the fix grant, and what is deferred

**Peter's ruling, 2026-10-03** (relayed by the orchestrator, verbatim): *"Let's go with your recommendations, but anything deferred I want captured."* The orchestrator relayed the five recommendations he accepted as follows:
1. **Publish path**: ONE tarball, built in a scripted fresh clone at the tag and checked there. The script publishes it to GitHub Packages and hands the same file to Peter for the public-npm publish.
2. **Drop** the esbuild root-resolution plugin and the build-time assertion. The tarball-level shape check in pack-assert is the guard.
3. **Drop** the `dist/` wipe and the post-build prune. Leftover files are detected in pack-assert instead.
4. **Yes** to RELEASE-FLOW step 6 comparing both registries.
   - The project `.npmrc` token already authenticated `npm view` and `npm pack` against GitHub Packages on 2026-10-03, from the clone directory. A new read token may therefore be unnecessary.
   - The script and the ballot use that route first, and ask Peter for a token only if it fails.
5. **Yes** to a separate grant for Ada's 15.0.0 record corrections. It is recorded in `.kiro/issues/2026-10-02-release-15-files-grant.md`, section 2026-10-03.

**Consult provenance**: Ada R1/R2 and Thurgood R1/R2, saved outside the repo at `/Users/3fn/.claude/projects/-Users-3fn-Documents-Work-Projects-Kiro-DesignerPunk-v2/memory/release-15-handoff/consult-hermetic-publish/`. The agreed kernel, so this issue stands alone:
- **Root shape by construction.** A fresh clone with only root `npm ci` bundles every MCP server from root `node_modules`. `product-mcp.js` is the existence proof: it has no nested manifest and was byte-identical on both 15.0.0 registries.
- **CI has never run the nested-shape docs and application bundles.** tool-boot-smoke and agent-generator build them, but they boot the nested servers' `tsc` builds. The only lanes that run the shipped `dist/mcp/{docs,application}-mcp.js` are consumer-guard's, and those run in root shape. The root shape is therefore the CI-proven one.
- **The consumer-visible change at the next release**: docs and application go from zod 3.25 to 4.3 and ajv 8.20 to 8.18; application's js-yaml stays on the same major. The docs bundle embeds no js-yaml. This change must be disclosed in that release's notes.
- **npm 10.9.3 runs no lifecycle scripts when publishing a tarball** (`npm publish <file>`), as verified in the CLI source.
  - In `lib/commands/publish.js` and `libnpmpack`, every lifecycle script is gated on `spec.type === 'directory'`.
  - So the script must run `check:drift` and `verify:token-index-clean` itself.
  - `prepublishOnly` becomes a tripwire that refuses a folder publish and names the script.
  - Command-line `--registry` flags override the tarball's `publishConfig.registry`, so one file serves both registries.
- **The process half is governance law.** It covers RELEASE-FLOW steps 5–6 (tag, then publish from the tag via the script; the step-6 dual-registry record), the publish-then-tag order in `governance/release-management-system.md` L41, and RS-6…RS-9.
  - Thurgood authors it as a ballot, and Peter ratifies.
  - This grant cannot carry it: an issue never grants a governance-law path.

**Grant paths**: `package.json`, `scripts/pack-assert.ts`, `scripts/__tests__/pack-assert.test.ts`, `scripts/release-publish.ts`, `scripts/__tests__/release-publish.test.ts`, `src/build/__tests__/BuildOrchestrator.test.ts`, `.kiro/issues/2026-10-01-in-repo-generate-output-contaminates-package-dist.md`

- **Grantee**: Ada, this issue's named owner.
- **Activation**: Peter's merge of the PR whose body names this section (`.kiro/issues/README.md` rule 8).
- **Expiry**: the fixing PR's merge.
- **What each path is for**:
  - **`package.json`**: the `prepublishOnly` tripwire, a `test:*` script that runs pack-assert (so Thurgood's lane step has an existing script to wire), and a script entry for the release script.
  - **`scripts/pack-assert.ts` and its new test**: option B's content checks on a with-scripts pack or a tarball:
    - no `dist/{ios,android,web}/**`;
    - the eight root token files, and `themes: []`;
    - leftover detection (no shipped `dist/**/*.js` without a source);
    - the bundle-shape check (no `*/node_modules/` module root other than root's);
    - falsification fixtures that plant residue and plant a nested root.
  - **`scripts/release-publish.ts` and its new test**:
    - fresh clone at `v<version>`;
    - `npm ci`, then `npm pack` with scripts on;
    - pack-assert on the tarball, `check:drift`, `verify:token-index-clean`;
    - record the sha1;
    - `npm publish <tgz>` to GitHub Packages;
    - print the exact public-npm command for the same file.
  - **`src/build/__tests__/BuildOrchestrator.test.ts`**: option D. Each suite passes an explicit `outputDir` from `fs.mkdtemp`, removed in `afterAll`. The placement is Thurgood's. `BuildConfig.ts`'s `./dist` default is left alone.
- **`.github/**` is NOT in this grant.**
  - Wiring the pack-assert `test:*` script into `lane-functional-root` (`lane-timing.yml`) is Thurgood's step, under his standing CI scope (ballot `2026-09-27-ci-regime-standing-scope`). It follows this fix's merge.
  - tool-boot-smoke changes are deferred; see row (d) below.
- **No `governance/**`, `.kiro/hooks/RELEASE-FLOW.md` or register path is in this grant.** Those belong to the ballot above.
- **An edit outside the list is a claims-pass finding.**

**Deferred — captured per Peter's instruction**:

| Row | Deferred item | Owner | Trigger |
|---|---|---|---|
| (a) | The esbuild root-resolution plugin and the build-time nested-root assertion in `build:mcp` | Ada | Any publish ever made outside `release-publish.ts`, or the in-repo agents starting to run the `dist/mcp/*.js` bundles rather than the nested `tsc` builds |
| (b) | A `dist/` wipe, or a post-build prune of files the build did not produce (Thurgood's preferred form: prune after a *successful* build, so a failed build deletes nothing) | Ada | The first leftover-file detection by pack-assert on the publish path |
| (c) | Option B: remove the nested server manifests and locks, giving one dependency tree. Lina joins as owner of `application-mcp-server/**`. **Until then**, the in-repo agents run zod 3 through the nested `tsc` builds while consumers get zod 4, so the bytes we dogfood are not the bytes we ship. | Ada + Lina (+ Thurgood for the lanes it breaks) | Peter's charter |
| (d) | tool-boot-smoke boots the SHIPPED `dist/mcp/*.js` bundles, not only the nested `tsc` builds. `tool-boot-smoke.yml` and `tests/tool-boot-smoke.test.ts` are outside Thurgood's standing scope and outside this grant, so this needs its own grant or a sibling issue naming Thurgood. | Thurgood | The fixing PR's merge |
| (e) | Bypass prevention. `--ignore-scripts`, or publishing a different tarball, cannot be detected before publish. Only step 6's cross-registry comparison catches it afterwards. Prevention means publishing from CI with provenance. | Peter (fork, later) | The first step-6 mismatch, or Peter's call |
| (f) | This issue's original A/C "prevent" fork (move this repo's `output` off `dist/`; a base-only emit step). Unchanged. | Ada drafts; Peter decides | Unchanged, still open |

**Status**: stays **ACTIVE**.

**Updated trigger (unchanged from the 2026-10-03 incident section above)**: **the fix must merge before any 15.0.1 or 15.1.0 publish, to either registry.** Until it does, no publish may rest on manual guards alone.

---

## 2026-10-03 -- the fix: what landed on `fix/hermetic-publish-path`, the P2/P3 observations, and what building it surfaced

**Vehicle**: branch `fix/hermetic-publish-path`, under this issue's 2026-10-03 grant (activated by #277). Code commit `81b5dc33`. Every edited path is on the grant list.

**Status**: stays **ACTIVE** until the fix PR merges. The ballot (`.kiro/docs/ballots/2026-10-03-hermetic-publish-path.md`) ratifies after that merge. The trigger is unchanged: no 15.0.1 or 15.1.0 publish before both.

### What shipped

**`scripts/release-publish.ts`**:
- **Two modes**, in the shape the ballot names:
  - `--dry-run <S>` is RELEASE-FLOW 5.1. `<S>` is a full or abbreviated SHA that resolves in the operator's checkout.
  - `<version>` (a leading `v` is accepted) is 5.3.
  - Options: `--source <git-url-or-path>` (default: the checkout's `origin`), `--expect-sha <S>` (publish mode), `--keep`.
  - `npm run release:publish -- <args>` runs the same thing.
- **Sequence**:
  1. A fresh shallow clone at the commit, or at `refs/tags/v<version>`, into a temp dir.
  2. HEAD must equal the requested commit, and the clone must be clean.
  3. `npm ci`, then the clone must still be clean.
  4. `npm run check:drift`.
  5. `npm pack` **with lifecycle scripts on** (prepack builds).
  6. `npm run verify:token-index-clean`.
  7. `pack-assert` on the tarball, read against the clone.
  8. A sha1, file count and bytes record (`release-publish-record.json` beside the tarball).
  9. In publish mode only: `npm publish <tgz> --registry=https://npm.pkg.github.com --@3fn:registry=https://npm.pkg.github.com`, followed by the printed `shasum` line and the exact public-npm command for the same file.
- **It refuses, with nothing published**, on any of:
  - the tag is missing;
  - the tag does not resolve to `--expect-sha`;
  - publish mode: the tagged commit is not on the checkout's `origin/main`;
  - publish mode: `npm whoami --registry=<GH>` fails from the checkout. This is checked before any clone or build. It prints a user name, never a token;
  - the clone's HEAD or `package.json` version does not match;
  - the clone is dirty after checkout or after `npm ci`;
  - any failed step or `pack-assert` finding.
- **Two departures from the ballot DRAFT**, for the author to correct at ratification (ballot P1):
  - **(1) `verify:token-index-clean` runs AFTER the pack, not "before packing" (§ 3.2, 5.1).** The token index is regenerated by the build inside pack's `prepack`; before the pack the check can only compare the committed index with itself. `check:drift` reads committed files and runs before the pack.
  - **(2) "refuses unless `v<version>` resolves to S" (5.3)** is implemented as three checks: the optional `--expect-sha <S>`, the tag commit on `origin/main`, and `package.json` at the tag equal to `<version>`. **Run the script from the main checkout**: GitHub Packages auth comes from that checkout's gitignored `.npmrc` (or the user's npm config). A worktree has no `.npmrc`, so the `npm whoami` preflight refuses there.

**`scripts/pack-assert.ts`**:
- **New section 10, the publish path**:
  - the eight root token files;
  - `themes: []` in the build tree's `designerpunk.config.ts` (comments stripped; exactly one `themes:`);
  - **no leftover `dist/` files**;
  - each `dist/mcp/*.js` resolves every module from the root `node_modules/`: no esbuild `// <prefix>node_modules/` comment with a non-empty prefix, and at least one root module per bundle so the check cannot pass vacuously;
  - no machine path in `dist/**`: `/Users/`, plus the build root's absolute path, so a fresh clone under the OS temp dir is covered too.
  - The pre-existing section 9 already asserted no `dist/{ios,android,web}` and `.kiro/steering/` = exactly the eight identity docs. That steering check is now factored into `steeringSetDiff` and tested.
- **How "leftover" is known.** This is not a comparison against a second build: in the publish path the tarball *is* the fresh build, so that comparison would be vacuous. The rule is that every packed `dist/` file must have one of:
  - (a) a source in the build tree: `src/<rel>.ts|.tsx|.js` for `.js`/`.d.ts`, or `src/<rel>` for copied JSON;
  - (b) a named producer, by exact file name per directory: the eight root token files and `name-contract.json`, `dist/mcp/` (4), `dist/generator/` (1) and `dist/browser/` (6);
  - (c) a home in `dist/consumer-canonical/`, whose producer deletes the directory before writing it (a test pins that `rmSync`).
  - Measured: a clean build packs 977 `dist/` files and all are accounted for.
- **Modes**: legacy (dry-run listing, `--ignore-scripts`, unchanged); `--pack`, which packs with scripts into a temp dir (that is `npm run test:pack-contents`); and `--tarball <tgz> [--root <dir>]`.

**`package.json`**:
- `prepublishOnly` is now the tripwire. It refuses every folder publish with a message naming `scripts/release-publish.ts`. It no longer builds; the script does.
- `test:pack-contents` and `release:publish` are added.
- **`postpublish` is kept unchanged.** It is dead on the only permitted path, since a tarball publish runs no scripts and the tripwire refuses folder publishes. The ballot DRAFT already describes it that way. See deferred row (h).

**`src/build/__tests__/BuildOrchestrator.test.ts`**:
- Every build writes to a per-run `fs.mkdtemp` dir, removed in `afterAll`. It used to write `./dist/{web,ios,android}` and `./test-output`.
- Before the fix, one run of the old file created all three `dist/` subtrees and `test-output/`. After it, a run creates none.
- `BuildConfig.ts`'s `./dist` default is untouched, per Thurgood's placement ruling.

### Validation (worktree with a real root `npm ci`; nothing published anywhere)

- **`npm run typecheck:scripts`**: exit 0.
- **`npm run test:scripts`**: 15 suites, 309 tests, all pass.
  - New in that count: `pack-assert.test.ts` (38 tests) and `release-publish.test.ts` (43).
  - The bites include a planted leftover, a planted nested-root comment, a wrong steering set, a registered theme, a planted machine path, and every refusal path stopping before any publish.
  - A mutation that disables the pack-assert refusal is caught.
- **`npm run test:pack-contents`** in a clean checkout: 94/94, 1,638 entries (the GitHub Packages 15.0.0 count).
  - **In the same checkout after `npm ci --prefix mcp-server`**: **red**, 93/94: `dist/mcp/docs-mcp.js … nested roots [mcp-server/]`. Removing the nested install brings it back to 94/94.
  - This is the 15.0.0 failure, caught live. The main checkout (nested installs plus 62+ stale `dist/` files) will therefore fail it **by design**.
- **Against the real 15.0.0 artifacts** (`--tarball`):
  - **public npm** (sha1 `48dd8cdd…`): **91/94**. It found exactly the **62** leftovers (the same set as `extras.txt`), plus nested roots in `docs-mcp.js` (`mcp-server/`) and `application-mcp.js` (`application-mcp-server/`).
  - **GitHub Packages** (sha1 `65d2ec0b…`): **94/94**.
  - So the check would have stopped 15.0.0's public artifact and passed its fresh-clone one.
- **`npm test`** (root): 388/390 suites; 9,375/9,377 tests.
  - The 2 failures (`mcp-component-integration`, `mcp-queryability`) assert that `mcp-server/dist/index.js` exists. That is the known fresh-worktree prerequisite, which `lane-functional-root` builds.
  - After `npm ci --prefix mcp-server && npm run build --prefix mcp-server`, both pass (46/46).
  - Neither is touched by this change.
- **End to end**: `npx tsx scripts/release-publish.ts --dry-run 1d75c5e5`, run with the committed script at `81b5dc33`.
  - Exit 0 in 31 s.
  - It made a fresh clone of `https://github.com/3fn/DesignerPunk.git` at `1d75c5e5…`, then ran `npm ci`, `check:drift`, `npm pack` with prepack's full build, and `verify:token-index-clean`.
  - **pack-assert: 94/94**, 1,638 files, 6,372,467 B, sha1 `2a1f79f02b437189121132c21996e04bcef8cc44`.
  - **Nothing was published.**
- **Live refusals** (cannot publish):
  - `release-publish.ts 99.0.0` → "tag v99.0.0 does not exist", exit 1.
  - `release-publish.ts 15.0.0 --expect-sha deadbeef` → "resolves to 9e1a3106…, not the expected deadbeef", exit 1.

### P2, second leg: an observed tarball publish runs no lifecycle script (ballot § 2)

- **Command**: npm 10.9.3, cwd = the fix worktree. That worktree's `package.json` carries the new tripwire `prepublishOnly`, and the tarball's own `package.json` (built from `1d75c5e5`) still carries the old `prepublishOnly: npm run build && …`.
  ```
  npm publish /var/folders/…/dp-release-KetK4f/out/3fn-core-15.0.0.tgz --dry-run
  ```
- **Observed**:
  - exit **0**;
  - **0** lifecycle lines (no line starting `> `): no `prepublishOnly` from either `package.json`, no `prepack`, no build output, no `postpublish`;
  - `npm notice shasum: 2a1f79f02b437189121132c21996e04bcef8cc44`, equal to the script's recorded sha1;
  - `total files: 1638`;
  - `Publishing to https://npm.pkg.github.com … (dry-run)`.
- **Reach**: this is a `--dry-run` (an "equivalent dry observation", as the ballot allows). The non-dry `publish`/`postpublish` scripts sit behind the same `spec.type === 'directory'` gate in `lib/commands/publish.js`, read in Ada R2.

### P3: the tripwire bites (ballot § 2)

- **Command**: `npm publish --dry-run`, a folder publish, in the same worktree.
- **Observed**:
  - exit **1**;
  - `> @3fn/core@15.0.0 prepublishOnly`, then `✖ Folder publish refused. @3fn/core is published ONLY as one tarball built in a fresh clone at the tag: npx tsx scripts/release-publish.ts <version> (dry run: --dry-run <S>). See .kiro/hooks/RELEASE-FLOW.md step 5 and ballot 2026-10-03-hermetic-publish-path.`;
  - **no `prepack` ran.** The refusal comes first, so nothing was built and nothing was packed.

### For Thurgood's CI step (not in this grant)

- `npm run test:pack-contents` must run **before** any `npm ci --prefix mcp-server` / `--prefix application-mcp-server` in the same job.
- `lane-functional-root` installs the `mcp-server` sub-package after its root build. If the step runs after that install, the next `build:mcp` (inside the step's own `prepack`) bundles from the nested tree, and the check goes red. That red is correct, but it would be a lane-ordering false alarm.
- **Placement**: right after the job's `npm run build`.

### Deferred, discovered while building, captured per Peter's instruction

These add to rows (a)–(f) above.

| Row | Deferred item | Owner | Trigger |
|---|---|---|---|
| (g) | **Base-config freshness.** The root token files equal a fresh generation from a base config. This is the 2026-10-02 deferral's option B in full; ballot § 6 names it. Not built: `themes: []` in the build tree's config is the proxy, and a fresh clone makes the generation the base generation by construction. The proxy misses a generator that emits non-base output without a theme. | Ada | The next change to how `scripts/generate-platform-tokens.ts` reads `designerpunk.config.ts`, or a non-empty `themes` ever proposed for this repo |
| (h) | **Retire `postpublish`.** It is dead under the tripwire (see "What shipped"). | Ada | The ballot's ratification. If the law text stops describing it, remove it in the next `package.json` change |
| (i) | **Limits of the leftover rule.** (1) A `tsc` output whose source still exists but has been excluded from compilation would pass. (2) `PRODUCER_OUTPUTS` is a named list, so a new build producer's output fails red until it is named. That is a loud failure, never a silent one. | Ada | The first false red from `test:pack-contents`/the script, or the first new build producer writing into `dist/` |
| (j) | **Local friction.** `test:pack-contents` is red in any checkout with nested MCP installs or stale `dist/` (the main checkout today). It is correct and documented, but a developer running it locally will see red. | Ada (with deferred row (b), the prune) | The first time someone needs it green locally without a fresh clone |
