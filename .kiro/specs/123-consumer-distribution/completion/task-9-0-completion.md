# Task 9.0 Completion — Pre-release-1 hygiene: the bundle path leak and the #204 orphan deletion

**Spec**: 123 — Consumer Distribution · **Unit**: U1 · **Parent**: Task 9 · **Agent**: Lina (Sonnet)
**Delegated-tier**: plan held
**Runs before Task 7** (amendment 2026-09-27). Two independent fixes: (a) the browser-bundle absolute-path leak; (b) the #204 orphaned Input-Text `.browser.ts` files.

## What changed

### (a) The bundle absolute-path leak — `.kiro/issues/archive/2026-09-27-bundle-absolute-path-leak.md`

- **`scripts/esbuild-css-plugin.js`**: `onResolve` now returns a path relative to `process.cwd()` (the package root) instead of the absolute filesystem path, carrying the real absolute path separately via esbuild's `pluginData` so `onLoad` still reads the correct file. esbuild's own `// <namespace>:<path>` module-boundary comment (written above each inlined-CSS module in non-minified output) now reads `// css-as-string:src/components/…/X.web.css` instead of `// css-as-string:/Users/<name>/…/src/components/…/X.web.css`.
- **`scripts/build-name-contract.ts`**: `bundleModules()`'s doc comment updated to describe the relative form as current. **No parsing-logic change was needed** — the function already preferred a bare `src/…` prefix over the absolute-path fallback (a forward-looking accommodation left in the code specifically for this fix; comment there already said so).
- **`scripts/__tests__/build-name-contract.test.ts`**: the synthetic `world()` fixture's bundle comment updated from `// css-as-string:/abs/checkout/${cssRel}` to `// css-as-string:${cssRel}` (the new relative form), exercising the parser's `src/`-prefix branch instead of the absolute-path fallback branch.
- **New guard**: `src/__tests__/browser-bundle-no-absolute-paths.test.ts` (functional lane — `npm test`, CI's `lane-timing.yml` `lane-functional-root` required check; never `test:scripts`, which no workflow runs — `.kiro/issues/archive/2026-09-27-test-scripts-lane-not-in-ci.md`). Reads every `dist/browser/*.js` file built by the tested commit (does not build them itself, matching the `bundler-resolution.test.ts` precedent) and asserts none contains `/Users/`, `/home/`, or a single-letter Windows drive prefix (`\b[A-Za-z]:[\\/]`, word-boundary-anchored so it doesn't false-positive on `http://`). *Limit (R26.8): exactly these three prefix families; a build root outside them passes undetected.*

### (b) The #204 orphan deletion — `.kiro/issues/archive/2026-09-26-input-text-browser-ts-orphans.md`

- Deleted `src/components/core/Input-Text-{Base,Email,Password,PhoneNumber}/platforms/web/*.browser.ts` (four files) after confirming orphan status (see § "Orphan proof").
- **`src/components/core/Input-Text-Base/__tests__/InputTextFamily.token-resolution.test.ts`**: removed the `KNOWN_DEFERRED` allow-list (its one entry named the now-deleted `InputTextPassword.browser.ts:--color-background-hover`) and the four `.browser.ts` entries from `FAMILY_WEB_FILES`; tightened the file-count assertion from a `toBeGreaterThanOrEqual(6)` floor to an exact `toBe(4)`; updated the header comment to describe the deletion instead of the (now-gone) `.browser.ts` deferral; lowered the literal-read-count floor from `>20` to `>10` to stay non-trivial against the halved (4 vs. 8 files) input set.
- **READMEs**: `Input-Text-Email/README.md`, `Input-Text-Password/README.md`, `Input-Text-PhoneNumber/README.md` — removed the `InputTextX.browser.ts # Browser build` line from each file-tree block. (`Input-Text-Base/README.md` never named the file; no change needed there.)
- **Dated addenda** (originals unchanged, per `.kiro/issues/README.md` rule): `.kiro/issues/archive/2026-09-26-input-text-phantom-css-vars.md` and `.kiro/issues/archive/2026-09-26-container-base-phantom-css-vars.md` (item 1) — each corrects the "renders nothing on web across the whole family" / "in the browser variants" framing: almost all phantom instances lived only in the unused `.browser.ts` files; the live `.web.ts` path carried exactly two (the `InputTextBase.web.ts` icon-color literal, fixed #202; the `InputTextPassword.web.ts` toggle hover, fixed #203).
- Both source issues closed with a dated "Outcome" section and `git mv`'d to `.kiro/issues/archive/`.

## Orphan proof (before deletion)

1. **`git grep -n "\.browser'" -- ':!.kiro' ':!docs' ':!*.md'`** → 0 hits (no code imports any `.browser` module anywhere outside docs).
2. **`git grep` for the four filenames by name** → hits only in `InputTextFamily.token-resolution.test.ts` (the guard that scanned and allow-listed them) and the three component READMEs (documentation, not code).
3. **`src/browser-entry.ts`** (the real bundle entry `build:browser` compiles) imports only the four `.web.ts` files (`InputTextBase.web`, `InputTextEmail.web`, `InputTextPassword.web`, `InputTextPhoneNumber.web`) — never `.browser.ts`.
4. **`package.json` `exports`** — no subpath export references any `.browser` file.
5. **`npm pack --dry-run` (before deletion)** — the `.browser.ts` **source** never shipped: `files[]`'s `src/components/**` glob only allow-lists `.schema.yaml`/`contracts.yaml`/`component-meta.yaml` (line 46). But the **compiled** output DID ship, via the broad `dist/**/*.{js,d.ts,json,css,swift,kt}` glob:
   ```
   npm notice 854B  dist/components/core/Input-Text-Base/platforms/web/InputTextBase.browser.d.ts
   npm notice 8.0kB dist/components/core/Input-Text-Base/platforms/web/InputTextBase.browser.js
   npm notice 972B  dist/components/core/Input-Text-Email/platforms/web/InputTextEmail.browser.d.ts
   npm notice 9.2kB dist/components/core/Input-Text-Email/platforms/web/InputTextEmail.browser.js
   npm notice 1.4kB dist/components/core/Input-Text-Password/platforms/web/InputTextPassword.browser.d.ts
   npm notice 14.7kB dist/components/core/Input-Text-Password/platforms/web/InputTextPassword.browser.js
   npm notice 1.2kB dist/components/core/Input-Text-PhoneNumber/platforms/web/InputTextPhoneNumber.browser.d.ts
   npm notice 13.0kB dist/components/core/Input-Text-PhoneNumber/platforms/web/InputTextPhoneNumber.browser.js
   ```
   8 files, ~50KB — dead compiled weight, zero consumers, shipping for nothing.

No consumer surfaced at any of the five checks. **No stop-and-report condition was hit.**

## Comment-form choice (a)

**Chosen: package-root-relative (`src/…`), not "no comment."** Reasons:
1. `build-name-contract.ts`'s parser already had a `src/`-prefix acceptance branch specifically anticipating this fix (its own comment said so) — using it required a zero-logic-change fix, the smallest possible surface for a pre-release-1 hygiene item.
2. Dropping the comment entirely would have required a logic change to `bundleModules()` (an alternate CSS-module-identification path), touching Ada's Task 6 file more than the "change it only as far as the new comment form needs" scope allowed.
3. The relative form still gives a human reading the bundle useful provenance (which source file this inlined CSS came from) without leaking the build machine's identity — better than dropping the comment outright.

## Guard lane (a)

`src/__tests__/browser-bundle-no-absolute-paths.test.ts` lives under `src/__tests__/` and runs in the **functional lane** (`npm test` → `jest.functional.config.js`, whose `roots` include `src/`). This is CI's `lane-timing.yml` `lane-functional-root` required check, which runs a full `npm run build` (including `build:browser`) before `npm test` — so the bundles the guard reads are always fresh for the commit under test, matching the existing `bundler-resolution.test.ts` precedent (also under `src/__tests__/`, also reads `dist/browser/*` without building it). It is **not** in `test:scripts` (`scripts/jest.config.js`'s separate root), which no CI workflow runs.

Locally, `npm run build:browser` (or `npm run build`) must run before this test; it fails loudly (a thrown error naming the missing directory and the required command) rather than silently passing if `dist/browser` is absent.

## Bites

**(a) — the absolute-path leak, restored and re-broken:**
- Reverted `esbuild-css-plugin.js`'s `onResolve` to return the absolute path; rebuilt (`npm run build:browser`).
- `npm test -- src/__tests__/browser-bundle-no-absolute-paths.test.ts` → **RED**: 54 offenders (27 in `designerpunk.esm.js`, 27 in `designerpunk.umd.js`), each an absolute `/Users/3fn/Documents/Work Projects/Kiro/DesignerPunk-v2/...` path.
- Restored the fix; rebuilt; re-ran → **GREEN** (2/2 tests pass, 0 offenders).

**(a) — the name-contract ⊆ check, re-run after the fix:**
- `npm run build:name-contract` → exit 0, 143 semantic + 41 primitive referenced, 21 dynamic sites, 0 not-checked.
- `npm run test:scripts -- build-name-contract.test.ts` → **19/19 pass**, including the pre-existing "bundle ⊆ src: a bundle-only name FAILS the build" synthetic bite (still red on a deliberately-introduced bundle-only name, confirming the check's catching behavior survived the comment-form change).

**(b) — the Input-Text guard, phantom planted and reverted:**
- Planted `const __phantomBiteVar = "var(--phantom-not-a-real-token)";` as the first line of `InputTextBase.web.ts`.
- `npm test -- InputTextFamily.token-resolution.test.ts` → **RED**: 2 of 6 tests failed, both naming `src/components/core/Input-Text-Base/platforms/web/InputTextBase.web.ts: --phantom-not-a-real-token` explicitly.
- Reverted (restored the original file from a pre-edit copy); `git diff --stat` on the file showed no changes; re-ran → **GREEN** (6/6 pass).

## The CHANGELOG hand-off (for Task 7.4)

Two consumer-facing sentences, for release 1's entry:

1. **Browser bundle fix**: The published ESM and UMD bundles no longer embed the publishing machine's filesystem path in an internal module comment — a build-machine-identity leak with no functional effect on consumers, now removed.
2. **Package contents change**: Four unused `Input-Text-*` browser-build files (`InputTextBase.browser.ts`, `InputTextEmail.browser.ts`, `InputTextPassword.browser.ts`, `InputTextPhoneNumber.browser.ts`, and their compiled `.js`/`.d.ts` output) have been removed from the package. They were never imported by the shipped bundle or by any documented usage path; removing them has no effect on any documented integration.

## Validation

- `npx tsc` (full, `--skipLibCheck`) — clean, 0 errors.
- `npm test` (full functional lane) — **384/384 suites, 9266/9266 tests passed.**
- `npm run test:scripts` — **11/11 suites, 219/219 tests passed** (includes `build-name-contract.test.ts`'s 19/19).
- `npx tsx scripts/pack-assert.ts` — **40/40 assertions passed.** No pack assertion referenced any `.browser.ts`/`.browser.js` path (`grep -n "browser" scripts/pack-assert.ts` → 0 hits) — the deletion changed nothing the script asserts on directly; the tarball's `entryCount` reflects the 8 fewer compiled files, and the `component metadata floor: schema=34 contracts=34 component-meta=34` count is unaffected (the Input-Text family's component-level metadata files are untouched).
- `npm run check:completion-criteria-parity` — **SUMMARY: parents evaluated 9, pass 9, fail 0; emissions 0; reds 0.**
- `npm run build:name-contract` and `git status --porcelain` reviewed before every commit; build-noise files (`docs/tokens.css`, `token-index/semantics.yaml`, untracked `token-index/meta.json`) reverted/removed after each rebuild, never committed.

## Application-time adaptations

- **`FAMILY_WEB_FILES`'s count assertion tightened to an exact `toBe(4)`** rather than lowering the old `>=6` floor to `>=4` — an exact count is more meaningful here (all four components always have exactly one live `.web.ts` file; a floor would silently tolerate a future accidental duplicate).
- **The literal-read-count floor (`reads.length`) was lowered from `>20` to `>10`** after measuring the actual count against only the four `.web.ts` files (the `.browser.ts` files roughly doubled the prior count) — kept as a non-trivial floor, not removed, so the assertion stays meaningful rather than vacuous.
- **`build-name-contract.ts`'s `bundleModules()` required no logic change**, only a doc-comment update — the task's "change it only as far as the new comment form needs" scope was satisfied with zero logic edits, which is the minimal-footprint outcome for a file primarily owned by Ada's Task 6.
