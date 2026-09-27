# Task 6 Completion — The name contract and the type contract

**Spec**: 123 — Consumer Distribution · **Unit**: U1 — Distribution substrate & packaging truth (Tasks 1–9, gated at Task 9) · **Type**: Implementation · **Validation**: Tier 3
**Agent (plan)**: PRIMARY Ada (Opus)
**Delegated-tier**: plan held
**Traces**: Reqs 5A.1–5A.7 · design C7 (name contract), DD10, DD11, DD17, P1 (YES)

*Tier note: Ada (Opus) was PRIMARY on 6.0–6.4. 6.1 stayed on Opus through its recorded own-index bite, and no downgrade happened.*

---

## Success Criteria

These rows are exactly what `parseTasksMd` extracts for parent 6: **18 rows**. The extraction is identical under the branch's parser and #211's (`9b6d269f`), and nested bullets are separate rows.

| Criterion (verbatim) | Status | Evidence |
|---|---|---|
| **GATE — Lina's Container-Base fix has merged before this parent runs** (T2-L1; like 8.1's rename gate). **Instrument**: her resolves-against-generated-CSS guard test passes on `main` at the U1 branch point, **and** 6.1's own-index check (below) is green over the Container-Base maps. **If it has not merged, this parent BLOCKS.** *(Today: 10 dangling references — `--border-border-{default,emphasis,heavy}`, `--zIndex-*` ×6, and `--color-border` — with tests pinning the broken strings.)* | ✅ verified met | `npx jest src/components/core/Container-Base/__tests__/ContainerBase.token-resolution.test.ts` → 5/5 at HEAD and 5/5 on a `git archive 874f6242` export; `git merge-base --is-ancestor af5842eb 874f6242` → true; `npx tsx scripts/build-name-contract.ts` → exit 0 over the Container-Base maps — `.kiro/specs/123-consumer-distribution/completion/task-6-0-completion.md` |
| `dist/name-contract.json` builds from the compiled surface. The bundle ⊆ src cross-check fails the build on a bundle-only name (bite recorded). Counts are reconciled against the design's 183 / 7, with differences attributed. | ✅ verified met | `npx tsx scripts/build-name-contract.ts` → `Wrote dist/name-contract.json` (143 semantic + 41 primitive); bundle-only bite → EXIT=1 `name-contract bundle ⊆ src: '--bundle-only-probe' …`; 183 reproduced at `5e98bd8f` (182 + 1 empty-match artifact), 7 = 6 literals + 1 template — `.kiro/specs/123-consumer-distribution/completion/task-6-1-completion.md` § "Counts reconciliation" |
| **Dynamic sites — enumerated MECHANICALLY, with a build failure on an unrecorded site** (Ada R2): | ✅ verified met | `scripts/__tests__/build-name-contract.test.ts` › the committed SITE_RECORD equals the scan exactly; `npx jest --config scripts/jest.config.js scripts/__tests__/build-name-contract.test.ts` → 19/19 |
| **The scan patterns**: `` var(--${ `` · `` `--${ `` · `` getPropertyValue(` `` · `'--' +`, over component source. | ✅ verified met | `scripts/__tests__/build-name-contract.test.ts` › the four scan patterns (plus helper calls) each find a site; › partial names before an interpolation/concatenation are sites too (patterns widened + `helper-call`, `task-6-1-completion.md` adaptations 3–4) |
| **The build fails when the scan finds a site absent from the committed site record.** A seventh site is caught at build, not missed. | ✅ verified met | `npx tsx scripts/build-name-contract.ts` with a seventh site appended to `ChipBase.web.ts` → EXIT=1 `UNRECORDED DYNAMIC SITE: …ChipBase.web.ts:482`; `scripts/__tests__/build-name-contract.test.ts` › a seventh site added to component source is caught at build, not missed |
| *The bundle ⊆ src check cannot see these sites; this criterion is what covers them.* | ✅ verified met | `scripts/__tests__/build-name-contract.test.ts` › an UNRECORDED dynamic site fails the build; `scripts/build-name-contract.ts` `SITE_RECORD` (21 sites, located by content) |
| **Each site takes one of THREE dispositions** (Lina R2's taxonomy + Ada's pre-positioned third): | ✅ verified met | `scripts/__tests__/build-name-contract.test.ts` › the expected-today dispositions hold; site → disposition table in `.kiro/specs/123-consumer-distribution/completion/task-6-1-completion.md` |
| (i) **closed — ours**: the finite literal set joins `referencedNames` in `dist/name-contract.json` under P1's filter; | ✅ verified met | `scripts/__tests__/build-name-contract.test.ts` › class (i) names and (iii) defaults resolve into referencedNames (own-index checked) |
| (ii) **component tier**: enumerated, **excluded** by P1 (recorded in `name-contract.json` `excluded[]` with its reason); | ✅ verified met | `scripts/__tests__/build-name-contract.test.ts` › P1: referencedNames carry only semantic and primitive tiers; the component tier is excluded with its reason |
| (iii) **consumer-supplied — out of 5A scope, default value resolved**: the consumer names the variable. Recorded in `excluded[]` with its reason, while **any default value in our code is resolved as class (i)**. | ✅ verified met | `scripts/__tests__/build-name-contract.test.ts` › the expected-today dispositions hold (`token-mapping.ts:351` → consumer-supplied + closed default) and › class (i) names and (iii) defaults resolve into referencedNames |
| **Expected today**: `ContainerCardBase:166` and `token-mapping.ts:70`'s closed maps → (i); `ProgressPaginationBase:232` → (ii); `IconBase:200/:476`, `ContainerBase:224` and `token-mapping.ts:70`'s typed props → (iii). | ✅ verified met | `scripts/__tests__/build-name-contract.test.ts` › the expected-today dispositions hold (located by content; drift `:70`→`:80`, `:166`→`:167` attributed to #201 in `task-6-1-completion.md`) |
| **Nothing is uncovered today.** If a future site is uncovered, the `sync` report carries a standing *"not checked: <component> builds token names dynamically"* line. A component with an uncovered site is never reported silently clean (R26.8). | ✅ verified met | `src/cli/__tests__/sync.name-contract.test.ts` › a component with an uncovered dynamic site carries the standing "not checked" line; `scripts/__tests__/build-name-contract.test.ts` asserts `notChecked` equals `[]` |
| **OWN-INDEX CHECK (T2-L1)**: every class-(i) resolved name is validated **against OUR OWN generated index** (`dist/DesignTokens.web.css` + `dist/ComponentTokens.web.css`) **before** it can enter the contract. **A name missing from ours FAILS THE BUILD as a component defect routed to Lina**, and never reaches a consumer report. **Bite recorded**: re-introduce `--border-border-default` → the build fails with the routed message. *(6.1 stays Opus until this bite is recorded.)* | ✅ verified met | `npx tsx scripts/build-name-contract.ts` with `Container-Base.refs.ts` `'border.border.default'` → EXIT=1 `name-contract OWN-INDEX CHECK: '--border-border-default' … route to Lina (Stemma components)`; `scripts/__tests__/build-name-contract.test.ts` › OWN-INDEX BITE |
| **Tier filter: semantic ALWAYS · primitive YES · component NEVER.** `sync.name-contract.test.ts`: removed semantic → reported; removed primitive → reported; a component-tier name → not reported. | ✅ verified met | `src/cli/__tests__/sync.name-contract.test.ts` › TIER FILTER 1/3, 2/3, 3/3; `npx jest src/cli/__tests__/sync.name-contract.test.ts` → 12/12 |
| No generated web output → `cannot check`, never clean. | ✅ verified met | `src/cli/__tests__/sync.name-contract.test.ts` › no generated web output → `cannot check` (string-equal), NEVER clean |
| The report string is string-equal to its catalog row over one fixture. | ✅ verified met | `src/cli/__tests__/sync.name-contract.test.ts` › TIER FILTER 1/3 — a removed SEMANTIC name → reported (string-equal to the catalog row) |
| `contractHash` covers the `.d.ts` surface: a `PrimitiveToken` field change → reported; a comment-only change → the "no member changes detected" string. | ✅ verified met | `src/cli/__tests__/sync.type-contract.run.test.ts` › previous A,B → current A,C → "removed: B; added: C" and › a comment-only change → "no member changes detected" (10/10); `scripts/__tests__/sync.type-contract.test.ts` › a PrimitiveToken field change → the hash changes (8/8) |
| *Scope stated*: web-surface names only. Native surfaces are out, per **Task 3.5's decision record** (Kenya/Data: the Swift and Kotlin compilers are the stricter native name contract, owned by the harness charter). | ✅ verified met | `scripts/build-name-contract.ts` writes `scope: web-surface names only …` into `dist/name-contract.json`; `src/cli/__tests__/sync.name-contract.test.ts` › everything defined → clean, with its scope statement (5A.4) |

Unmet or partially met criteria: None

---

## Additional verification

Primary Artifacts: all shipped as declared — `scripts/build-name-contract.ts`, `src/cli/sync/NameContract.ts`, and tests (`scripts/__tests__/build-name-contract.test.ts`, `scripts/__tests__/sync.type-contract.test.ts`, `src/cli/__tests__/sync.name-contract.test.ts`, `src/cli/__tests__/sync.type-contract.run.test.ts`).

No `**Merge gate:**` block is declared for this parent (`parseTasksMd` → `mergeGate: []`). No artifact is deferred to a later unit.

**`dist/name-contract.json` ships**: `npm pack --dry-run --json --ignore-scripts` lists `dist/name-contract.json`. The `files[]` pattern entry was committed ahead of this task by Task 3.

### Validation

Run before this doc's commit (on top of `23e3afcc` plus the fork-1 wiring):

- `npx tsc --noEmit` → 0 errors; `npm run typecheck:scripts` → 0 errors.
- `npm test` → **383 suites, 9251 tests passed**. Before Task 6 it was 381 / 9229; `sync.name-contract.test.ts` adds 12 and `sync.type-contract.run.test.ts` adds 10.
- `npm run test:scripts` → **11 suites, 206 tests passed** (was 9 / 179).
- Targeted suites: `npx jest src/cli/__tests__/sync src/cli/__tests__/Manifest.test.ts src/cli/__tests__/FileScanner.test.ts src/components/core/Container-Base/__tests__/ContainerBase.token-resolution.test.ts` → 10 suites, 120 tests passed.
- `npx tsx scripts/pack-assert.ts` → **40/40 assertions passed**. `dist/name-contract.json` is in the tarball.
- `npm run build` → exit 0. `build:name-contract` writes the contract: 143 semantic + 41 primitive, 21 sites, 0 not-checked.
- Build noise (`docs/tokens.css`, `token-index/semantics.yaml`, `token-index/meta.json`) was reverted before every commit.

---

## Peter's rulings (2026-09-27, relayed by the coordinator)

1. **Fork 1 = (B)**: when the manifest's `contractHash` differs from the installed one, `sync` fetches the **previous** version's `dist/name-contract.json` through Task 5's fetcher (her npm rail, cache first) and diffs the members.
   - A fetch failure is `cannot tell`, never clean.
   - A predating version, or `contractHash: ''`, is `no baseline`.
   - `contractHash` is re-recorded only when `sync` writes the manifest.
   - Implemented in `src/cli/sync/NameContract.ts` (`assessTypeContract`) and `src/cli/sync/index.ts` step 6c. See `.kiro/specs/123-consumer-distribution/completion/task-6-3-completion.md`.
2. **Fork 2 = (N)**: deprecate the `borderColor = "color.border.default"` alias on **native**. The issue is filed by the coordinator for Lina and Kenya/Data, outside U1.
   - **The alias has no 5A effect.** On the web, Container-Base's `borderColor` is a class (iii) consumer-supplied input (`token-mapping.ts:351`), excluded from the contract. Only our own default values for it (`BORDER_COLOR_TOKEN`, `cardBorderColorTokenMap`) resolve as class (i).
   - Native surfaces are outside 5A (Task 3.5's decision record).

## Deviations from design (application-time adaptations; detail in the subtask docs)

1. **The src side of bundle ⊆ src is the bundle's own module list** (esbuild's module-boundary comments), not C7's `src/components/**/*.{css,web.ts}` glob. Under the glob, 3 real bundle names (in `visualStateMapping.ts`) would be bundle-only today. (6.1)
2. **Names are read from comment-free string text via the TypeScript AST.** esbuild inlines component CSS with its comments, and `--space-125` is in the bundle only inside a comment. (6.1)
3. **The literal read is widened** from `getPropertyValue('--x')` to every complete `'--x'` literal (48). This catches the ternary reads at `ProgressPaginationBase.web.ts:233/234`. (6.1)
4. **The scan patterns are widened to partial prefixes, plus a fifth `helper-call` pattern.** After #201, `ContainerCardBase:166` and `ContainerBase:224` are helper calls, invisible to the four literal patterns. Bite recorded. (6.1)
5. **The own-index check covers every name that would enter the contract** (static references too), not only class-(i) names. (6.1)
6. **`--_` private and self-set properties (`--chrome-offset`, #203's blend-computed `--_itp-hover-bg`) are disposition (ii)**, recorded as `kind: component-internal`. The rule is that the component defines or sets the property itself, not the prefix. (6.1)
7. **The "missing (A9)" placeholders**: `<name>` is the CSS property; `<dp token name>` is the index name; `<declared use>` is composed from the schema `tokens:` blocks; `<your semantic tier path>` is filled per tier (primitives point to `src/tokens/`). (6.2)
8. **"Present names" = definitions in her `<outputDir>/DesignTokens.web.css`.** (6.2)
9. **Type contract**:
   - The no-member-diff case fills the row's parenthetical with DD11's residual string.
   - The previous version is the manifest's `installedVersion`.
   - A baseline-mismatch guard is added as a second cannot-tell cause.
   - There is no report when there is no manifest.
   - The test id is split into a build side (`scripts/__tests__/sync.type-contract.test.ts`) and a sync side (`src/cli/__tests__/sync.type-contract.run.test.ts`). (6.3)

## Strings with no design catalog row (for Thurgood's erratum, via the coordinator)

Five strings authored at 6.2, pinned by `src/cli/__tests__/sync.name-contract.test.ts`:
1. **clean**: `name contract: clean — every semantic and primitive token name DesignerPunk's web components reference is defined in your generated web CSS at <outputDir>.`
2. **scope (5A.4)**: `(A clean name contract does not establish that your values suit the components. DesignerPunk's component-tier tokens and the iOS/Android surfaces are not checked.)`
3. **not checked**: `not checked: <component> builds token names dynamically`. The text comes from tasks.md.
4. **contract missing in package**: `cannot check the name contract — the installed package has no dist/name-contract.json (<pkgRoot>). (This is not a clean report.)`
5. **config unreadable**: `cannot check the name contract — designerpunk.config.ts could not be loaded (<error>), so the generated output directory is unknown. (This is not a clean report.)`

Two PROPOSED rows from fork 1, pinned by `src/cli/__tests__/sync.type-contract.run.test.ts`:

6. **type contract — cannot tell**: `cannot tell what changed in the token type contract — <the package content for version <v> could not be retrieved|version <v>'s contract does not match the contractHash your manifest recorded>. It did change: run 'npx tsc --noEmit' — fix each file it names. (This is not a clean report.)`
7. **type contract — no baseline**: `no baseline to compare the token type contract against — <your manifest records no contractHash|version <v> predates DesignerPunk's name contract (it ships no dist/name-contract.json)>. sync records the installed contract as the baseline the next time it writes the manifest.`

## Disclosed out-of-list edits (the brief's minimal, disclosed rule)

1. `package.json`: adds `build:name-contract` and chains it into `build` after `build:browser`. (6.1)
2. `src/cli/sync/index.ts`:
   - step 6b (the name contract);
   - step 6c (the type contract);
   - a hash change counted in `manifestChanges`;
   - the `contractHash` re-record in the save step;
   - `SyncOptions.configLoader` (a test hook);
   - `SyncOutcome.nameContract` / `typeContract`;
   - two helpers. (6.2, 6.3)
3. `src/cli/init.ts`: `ManifestBuilder.build(installedVersion, contractHash)` and its call site. (6.3)

## Findings routed (not fixed)

- **Test governance (filed by the coordinator)**: `npm run test:scripts` runs in no CI workflow. Two of Task 6's four suites live there, as does Task 4's `tool-manifest.test.ts`. CI does enforce the build-level failures, because `lane-timing` runs `npm run build`.
- **For Lina**:
  - `src/components/core/Input-Text-Password/platforms/web/InputTextPassword.browser.ts:265` still has the phantom `var(--color-background-hover)`. It is not bundled, so it is outside the contract. It is #204's orphan-audit territory.
  - The `ContainerBase.web.ts` JSDoc example names a nonexistent `color.surface`.
- **For the browser-bundle owner**: `dist/browser/designerpunk.esm.js` ships the build machine's absolute paths in 27 `// css-as-string:/Users/…` comments (`scripts/esbuild-css-plugin.js`, pre-existing). The contract builder accepts a relative form too.
- **For Leonardo (15B)**: the `<declared use>` clause of the missing-token line gets long for widely used names. Real output is quoted in `.kiro/specs/123-consumer-distribution/completion/task-6-2-completion.md`.

## Subtask completion docs

`.kiro/specs/123-consumer-distribution/completion/task-6-0-completion.md`, `task-6-1-completion.md`, `task-6-2-completion.md`, `task-6-3-completion.md`, `task-6-4-completion.md`.
