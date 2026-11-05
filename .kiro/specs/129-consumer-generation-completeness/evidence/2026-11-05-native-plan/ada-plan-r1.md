#### [ADA PLAN R1]

Read `plan-draft-r1.md` in full, Peter's words (`peter-2026-11-05.md`), and Kenya R3, Data R3, Lina R3, Leonardo R3, Stacy R3 and Thurgood R4. Source read with `git show` and `git grep` on `origin/main` at `5c48f3ccb`. Labels: **MEASURED** = I ran it today in the existing `ada-pack/` scratch consumer (packed from `3375c2e79`), with no downloads; **READ** = read in source; **REASONING** = inference. Session counts are my estimates.

**In plain words.** I back two specs, with one change to where the line between them falls. Spec 129 owns everything `generate` writes and everything the package ships. Spec 132 owns everything written into, or run in, an adopter's own app. Four corrections from my side matter for what Peter approves:
- the package does not ship the definitions of DesignerPunk's own component tokens, so item (ii) means shipping them;
- files `init` writes belong to the adopter after day one, so the app manifest has to be maintained by `sync`;
- once native is supported, renaming a token breaks native adopters unless the generator can emit deprecated aliases;
- the plan's new INSTALL pointer points adopters at a file the package does not ship.

---

**1. Structure: B2, with the split defined by surface, not only by time.**

- **The pick.** I pick B2 (129, then 132, under one goal). I would add one rule for which work goes where:
  - **129** owns what `generate` emits and what the package ships: items (i)–(vi), item (ii) included, Q12 and Q13, the Kotlin type table, native colour values, row 9's `public`, and the package's file list (`files[]`).
  - **132** owns what is written into the adopter's project (the Swift and Gradle manifests, the scaffold for a new component) and what runs in their app (D3–D6).
- **Why this line, from the generator.**
  - **Item (ii) is already chartered in 129.** Its text is "DesignerPunk's component token definitions must reach the consumer's own generated output" (READ: charter § "Scope" (ii)). Item (v), "each platform's output lands where that platform's build reads it", is the generator half of the adopter manifest. So every generator precondition of D3 is in 129 already, and nothing on 132's side needs a generator scope amendment.
  - **The line is also where semver starts.** What 129 changes affects platforms no supported consumer uses yet. What 132 writes is the first native thing an adopter is promised (§ 2c). Keeping the promise in one spec puts the release where support is claimed, which is the line where the API freezes, in one place.
- **Gate inversion.** I agree with Thurgood's case against C. Under C, `tasks.md` would have to plan the render units before the harness has measured anything.
- **Fold-back.**
  - **The counter-argument**: the native API that 132 freezes is mostly *decided* in 129's design round (Q12's theme names, Q13's colour access, `Dp` and `TextUnit`, the colour form). That happens before any adopter app (D3) exists to test it. If 132's fixture app shows a 129 ruling is wrong, the fix is a generator change after 129 has closed. Splitting the specs splits one API decision across two closeouts.
  - **What it changed**:
    1. 129's design round marks each of those rulings "provisional until 132's D3 builds". Nothing native is supported before 132 claims it, so changing them costs no major release.
    2. 132's write scope includes the generator paths, and I am one of its owners, not just someone consulted.
    3. The harness is already built in the adopter's shape (Kenya R3, Data R3), so 129's rulings are tested against that shape, not against the repo.
  - **The residual that survives**: one design question is answered in one spec and confirmed in the next. If D3 overturns Q12 or Q13, 132 reopens a ruled 129 decision, with another round. I think that is cheaper than C's gate inversion, but it is a real second pass, and I cannot price it before the first run.

**2. My domain's rows**

**2a. Item (ii) is bigger than the plan's WP1 row implies, but it can be sized now, before the harness runs.** That answers Thurgood's question below.
- **MEASURED: the package does not ship DesignerPunk's component token definitions.**
  - The repo has 7 component `*tokens.ts` files under `src/components/` (READ, `git ls-tree`). The packed package contains **0** of them. Its only component token source is `src/tokens/component/progress.ts`, the file `init` copies.
  - `files[]` ships `src/components/**/{*.schema.yaml,contracts.yaml,component-meta.yaml}` and the native sources, not `tokens.ts` (READ, `package.json`).
  - The "33 (23 of them DesignerPunk's)" that `generate` prints is the token **index** merging a package index (`src/generators/generateTokenIndex.ts` L348, `mergePackageComponentTokens`). It is not the definitions.
  - Emission (`generateComponentTokens`) reads only what `loadComponentTokens` harvests from the consumer's tree, through Sources 1 and 2 (`src/cli/loadComponentTokens.ts` L88, L101).
- **So item (ii) is three pieces of work and one ruling**:
  1. **Ship the 7 definition files and harvest them as a third source** (`files[]`, `pack-assert`, `loadComponentTokens`), resolved against the consumer's primitives. That is the charter principle. REASONING: their imports (`../../../build/tokens`) resolve inside the package, because `src/build/tokens/*` ships. About 1 session.
  2. **Precedence by component, not by token.** If the adopter's tree defines a component's tokens (their copy of `progress.ts`), none of ours for that component are emitted. A per-token merge would bring our version of a token the adopter deleted back into their output, which breaks Model B. It also gives a clear error in place of Kenya's `invalid redeclaration of 'ProgressTokens'`. The index's merge and the emission must use **one rule with two callers**, or the index and the output will disagree. About 0.5–1 session.
  3. **Name-contract coverage of the component tier**, which the charter calls "a requirement of (ii), not optional". About 1 session.
  4. **The ruling**: Spec 123 Requirement 1.5 is reopened, and Lina leads it (charter).
  - Total: **about 2.5–3 sessions plus the ruling.** None of it waits on the harness's numbers. The first run only shows the result: the `cannot find 'ButtonIconTokens'` entries disappear. The harness's comparator should tag those entries to item (ii), not to Lina's component record (my answer to Lina R3, below).

**2b. Missing generator work before native can be claimed as supported: deprecated aliases.**
- Once native is supported, every emitted name is API: `DesignTokens` members, the component token enums, the theme protocol. A token rename that is routine on web becomes a native major release unless the generator can emit the old name as a deprecated alias (Swift `@available(*, deprecated, renamed:)`, Kotlin `@Deprecated(ReplaceWith(...))`).
- Neither generator does this today. REASONING: I know of no deprecation path for native tokens; I did not search for a web one.
- This belongs in 132's packaging unit, as a generator task with me as owner, about 1 session, **before the support claim**.
- A related rule for Q12 in 129's design: if the package defines the theme protocol and adopters conform to it, adding a theme-varying colour must stay additive. On iOS a new protocol requirement breaks every conformer that is not regenerated. On Android a new constructor parameter breaks hand-written instances (Data R1 item 18). So either a conforming theme can only be generated, or every addition ships with a default.

**2c. The `init`-written manifest needs to be `sync`-managed.** This corrects plan § 3 B2's 128 seam ("because `init` writes them, that is a generator change, not adopter work").
- `init` runs once. "`init` was the birth event; it does not run again" (INSTALL L80). What it writes then belongs to the adopter.
- So if 128 splits `@3fn/core` into platform packages and the paths change, every adopter would have to edit their `Package.swift` and Gradle settings by hand. **The rework risk is real** for files `init` writes.
- **The fix already exists.** `src/cli/sync/RegionGrain.ts` maintains a marked region that DesignerPunk manages inside a file the consumer owns (`CLAUDE.md` and `.gitignore` today). `sync` reports the change and writes it only on the adopter's go.
- Put the list of source directories in the manifests inside such a region. A path change from 128 then becomes a `sync` update, not adopter work. This is my CLI work in 132's packaging unit, and it adds little to Kenya's and Data's `init` estimates (REASONING).
- **Two constraints the 129 generator must meet for Kenya's root manifest** (Kenya R3, VERIFIED):
  - No generated Swift file may share a file name with a packaged Swift file in the same module (`filename "ComponentTokens.ios.swift" used twice`).
  - Native output should go to a folder per platform with nothing but that platform's files in it. That is item (v), and it removes Kenya's warnings about other file types.

**2d. Packaging defects found only by reading the package are a class, and `pack-assert` is where it gets fixed.**
- Data's `res/drawable/README.md` ships because `files[]` includes `platforms/android/res/**` (READ).
- Moving the README fixes this instance. The class fix is a `scripts/pack-assert.ts` rule that the packed native resource folders hold only resource files. That is in my standing scope, about 0.25 session, in 129 because it concerns what the package ships.

**2e. The adopter's `generate` for their own native components (WP6).**
- The token half already exists. MEASURED: my scratch consumer's own `src/tokens/component/progress.ts` was emitted as `ProgressTokens` in its native `ComponentTokens` files.
- What WP6 still needs from my side:
  - the item-(ii) precedence rule above, so the adopter's component tokens and ours never collide (129);
  - their component tokens checked by the name contract against their own primitives (129, with item (ii));
  - the `sync` region that adds their native source folder to the manifest, and a scaffold verb for a new native component (`src/cli`, 132).
- The served catalog stays in 128's lane 3, as the plan says.

**2f. Native colour values.** My lean is native colour values in Display P3, with no runtime dependency (Ada R3). That makes D3 an app with **no third-party package to resolve**. It also removes INSTALL L171's colormath step in the same 129 PR (plan § 4, row 3).

**3. Definition of done (D1–D6), from the token tier**

- **D1 can be green while item (ii) is undone.**
  - The missing DesignerPunk component token enums fail inside the *component* files, so those errors land in D2's list, not D1's.
  - D1 needs a second, non-compile check: every component token in the merged index (`token-index/components.yaml`) appears in the adopter's generated output on each platform, and nothing extra appears. The driver can assert this as set equality, under the same rule as § 2a item 2.
- **"Themed" needs its oracles named.**
  - Row 2's probe (Data R3, Kenya R3) proves that the emitted theme compiles and can be read.
  - Item (vi) decides *whose* themes: the adopter's own copied theme tier, or the package's. If (vi) rules for the adopter's, a driver check, in the shape of row 19's, has to show that an override in the adopter's config changes the output. Otherwise "themed" can be met by DesignerPunk's built-in themes alone.
- **D3's "byte-identical" copy check would fail by construction as written.**
  - Model B has `init` copy the whole token tier into the adopter's tree, `src/tokens/component/progress.ts` included, byte for byte (MEASURED).
  - Limit the check to the packaged native source: `src/components/**/platforms/{ios,android}/**` and `src/blend/*`. Token source is copied on purpose.
- **Rows 19–22 are 129's acceptance, but no D row covers them.** They are accepted by the driver, `tsc` or Jest (Ada R2 § 2a; Stacy R3 agrees). D1–D6 is the native goal's definition of done, so 129's done must also name those instruments.
- **Missing: D7, "build more".** Peter's sentence includes "use DesignerPunk to build more as they require", and no D row tests it.
  - D7 would be a fixture native component **the adopter wrote**, with its own `defineComponentTokens` file in the adopter's tree. It compiles in the D3 app beside ours, its tokens do not collide with ours, and it passes D4.
  - That is the oracle for WP6, and it checks the precedence rule in § 2a.

**4. Peter's decision list (§ 5)**

- **Item 2's wording**, my answer to Thurgood:
  - **It fits the principle only if "token output" explicitly includes the component tier.** The principle reads "every token artifact their code compiles against" (charter), and the shipped components compile against our component tokens.
  - **"Compiles … with every remaining error pinned" claims more than its evidence** while the list has entries (Stacy R3 condition 4).
  - Suggested wording: *"A stranger's `init` → `generate` yields their own token output, the component tier included, that compiles and is themed on all three platforms, with nothing copied from `node_modules`. DesignerPunk's native component source compiles against it in place from a packed install, except for pinned errors, each tagged to an open record and none tagged to a 129 row."* On web, "compiles" means the existing consumer guard; the requirements should say so, or the sentence promises something on web that nothing measures.
- **Item 7, the native components becoming a supported API, is his, and it needs one more sentence.**
  - The proposal: native APIs enter semver at the release that claims support (132's D3 and D4 green), and not before. Until then native is "experimental", outside semver.
  - That is the honest reading of Q7: native has no supported consumer today, so none of 129's changes breaks one (I-1, I-2, the colour form, and item (iii), the native root files).
  - The consequence for 17.0.0: item (iii)'s "at the next MAJOR" (charter) and "Breaking changes ship together there" (17.0.0 charter) would otherwise hold item (iii) until 17.0.0. 17.0.0 is tied to 128's design, which comes after 132 under both of the plan's placements.
  - So Peter rules one of two:
    - **(a)** Native changes made before the claim ship in minor releases, item (iii) included, because no supported consumer exists to break. My lean.
    - **(b)** Item (iii) keeps its major and waits for 17.0.0.
  - After the claim, every native rename is a major unless § 2b's aliases exist. That is why they come before the claim.
- **For the team, not Peter**: where the INSTALL pointer points (§ 5 below). And whether the package's `dist/ComponentTokens.*` keeps shipping after item (ii). The 2026-10-02 consult said it keeps shipping, but once item (ii) emits the same enums into the adopter's output, the shipped copy is the "snapshot a consumer could mistake for theirs" that the principle rules out, and it collides in Kenya's single-module shape. That is a question for 129's requirements round, with Lina consulted. It reaches Peter only as a change to the charter's item (iii) text.

**5. The § 7 findings and § 4's INSTALL rows, where they touch me**

- **Confirmed**: the distribution charter's premise that "an SPM library cannot see the consumer's generated `DesignTokens`" is superseded by Kenya's root manifest. In one module, the components' `DesignTokens.<name>` reads bind to the adopter's tokens (Kenya R3). That also withdraws my R2 § 2d items 2 and 3 for this shape.
- **§ 4 row 1's pointer is a dead link for adopters.**
  - The proposed text points INSTALL at `.kiro/issues/2026-09-26-native-component-distribution.md`. `files[]` does not ship `.kiro/issues/**` (READ), so an adopter reading `node_modules/@3fn/core/docs/consumer/INSTALL.md` cannot open it. Issue files also move to `archive/` when they close (README rule 3), so even the GitHub link would break.
  - `governance/` does ship. So point at a "Native status" passage in the Integration Guide, inside the install region, which travels with the derivation. Or say "planned, not yet scheduled to a release" and give no internal path.
- **§ 4 misses a third pointer**: the guide's L274 table row, "build for iPhone or Android (not yet: Spec 129)" (READ). It needs the same edit, in the same PR.
- **The re-derivation is mechanical. Its cadence is not.**
  - About ten install-region lines describe defects that 129's rows fix: INSTALL L77 (row 19), L80 (row 1), L154–157, L163, L168–169 and L171 (rows 2–4 and 13, items (i) and (ii), the colour form). There is also the `path-steps: { founder: 5 }` front matter (item (iv), Q4).
  - Each fixing PR makes one of those lines false. Fixing each line means a `governance/**` edit plus `derive-install-doc.ts`, so every one of those PRs becomes a Peter-merged governance PR with an edit-kind line.
  - **Class option, for Thurgood (his script and test; I am consulted)**:
    - each limitation sentence in the install region carries a marker naming its record, for example `<!-- limitation: <record> -->`;
    - `scripts/__tests__/install-doc.test.ts` fails when a marked record is archived while its sentence remains.
  - The shipped text then cannot outlive the fix. One batched INSTALL PR before each release's S can carry the edits, with no per-row governance PRs. About 0.5 session (REASONING).

**6. Directed questions**

- [@LINA] Item (ii)'s size in § 2a assumes your Requirement 1.5 ruling (i) ships the 7 component `*tokens.ts` files as package source, harvested against the adopter's primitives, and (ii) takes precedence per component: the adopter's copy of a component's tokens replaces ours entirely. If you would rather emit from the package index's resolved data than ship the definitions, that changes the work and the principle reading. Which do you lean to? -- [ADA PLAN R1]
- [@THURGOOD] Will you take the install-region limitation markers (§ 5) into `install-doc.test.ts`? Without them, the plan's same-PR coupling makes every 129 row that changes shipped text a governance PR. -- [ADA PLAN R1]

**Answer to Lina R3's directed question to me** (it reached me after my R3):
- The "23 groups missing from the consumer's output" is **not a new record**. It is chartered item (ii), as Leonardo R3 found, and it is sized above.
- The harness should **not** read the package's `dist/ComponentTokens.*` in place. Kenya measured that it collides in one module (the file name used twice, `ProgressTokens` redeclared), and it would test a snapshot the principle says to retire.
- Instead, the comparator tags those entries to item (ii), so your component record carries only component defects.
