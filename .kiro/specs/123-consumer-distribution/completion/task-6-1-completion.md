# Task 6.1 Completion — `build-name-contract.ts`, the mechanical dynamic-site scan, the three dispositions, and the own-index check with its bite

**Spec**: 123 — Consumer Distribution · **Unit**: U1 · **Parent**: Task 6 · **Agent**: Ada (Opus)
**Tier note**: 6.1 stayed on Opus throughout, as planned. The own-index bite is recorded below, and no downgrade happened.

## What changed

**New: `scripts/build-name-contract.ts` → `dist/name-contract.json`** (a Primary Artifact). It reads both sides at the compiled level (DD10):

- **Referenced names**:
  - `var(--x)` references in `dist/browser/designerpunk.esm.js`, **plus** every complete `'--x'` literal in it (the JS-side reads);
  - ∪ `var()` references in `dist/ComponentTokens.web.css`;
  - ∪ the class-(i) names resolved at dynamic sites, and the (iii) defaults that our own code supplies.
- **Tier** comes from `token-index/{semantics,primitives,components}.yaml`, keyed by the CSS custom-property name.
  - Composite tokens (typography, motion) expand to `<web>-<kebab(key)>` for each `primitiveReferences` key. This is the generator's expansion, and it closes Lina's issue note 4 (*"needs a composite-expansion map"*).
- **Declared use** comes from each component's `.schema.yaml` `tokens:` block. It is used for attribution only.
- **Resolved value** is our `:root` value, followed through whole-value `var()` chains.
- **The build FAILS**, loudly and naming the owner, on any of these:
  1. **bundle ⊆ src**: a bundle name that no bundled source module contains;
  2. **an unrecorded dynamic site**, or a recorded site that has vanished (a stale record);
  3. **the OWN-INDEX CHECK**: any name that would enter the contract and is absent from `dist/DesignTokens.web.css` + `dist/ComponentTokens.web.css`. The message is routed to **Lina**, and the name never reaches a consumer report;
  4. a name our CSS defines but the index cannot tier. This one is routed to **Ada**.

**Committed site record**: `SITE_RECORD` in the script.
- Each site is located by **content** (trimmed line plus occurrence), never by line number. Line drift therefore never breaks it, while an edited line becomes a new, unrecorded site.
- The site's current line is written into `name-contract.json` → `dynamicSites[]`.

**Wiring (disclosed out-of-list edit)** — `package.json`:
- a new `build:name-contract` script;
- `build` runs it right after `build:browser`: `tsc → build:validate → build:browser → build:name-contract → build:mcp`.
- CI's `lane-timing` runs `npm run build`, so a failing contract fails CI.

### Counts reconciliation — the design's 183 / 7, attributed

The design's measurements are reproduced **exactly** at the design merge `5e98bd8f`. To get them, I rebuilt the browser bundle at five commits from `git archive` exports (`5e98bd8f`, `e5126cf5` #200, `af5842eb` #201, `3401e030` #202, `bb6a1d99` #203).

| Measure | Design | At `5e98bd8f`, reproduced | At HEAD (this contract) | Attribution |
|---|---|---|---|---|
| unique `var(--…)` names | **183** | `grep -oE 'var\(--[a-z0-9-]*'` → **183** = 182 names + **1 empty-match artifact** (the `*` also matches a bare `var(--` before `_` or `${`) | **243** total = **180** non-private + **63** `--_` private | **−1 artifact.** **−62/63 private names** excluded by the regex's character class (no `_`). **−1 comment name**: `--space-125` appears only in a `ButtonIcon.web.css` comment, since esbuild inlines component CSS **with its comments**; this contract reads comment-free string text. **#203**: `--color-background-hover` removed, `--_itp-hover-bg` added. #200/#201/#202: no bundle-name delta (measured). |
| "0 interpolated" | 0 | **3** `var(--${` sites: IconBase ×2, and Container-Base's `` `var(--${tokenName.replace(…)})` `` | **2** (IconBase ×2) | **The design's "0" was false when it was measured.** #201 moved Container-Base's construction to `` `--${kebab}` `` inside `tokenToCssCustomProperty`, which is not a `var(--${` form. All of them are recorded dynamic sites below. |
| `getPropertyValue('--…')` literal reads | **7** | 7 = **6** complete literal names + **1** template head (`` `--progress-node-size-${size}-current` ``) | 6 + 1, unchanged | The 7th is a dynamic site with disposition (ii). The contract's literal read is **wider**: all **48** complete `'--x'` literals. This catches the 4 ternary reads at `ProgressPaginationBase.web.ts:233/234` (`--space-grouped-{normal,tight}`, `--space-inset-{150,100}`) and the `REQUIRED_CSS_VARIABLES` array in `ButtonVerticalListItem.web.ts`, which the `getPropertyValue('--x')` form misses. |

**The contract at HEAD** (`dist/name-contract.json` → `counts`):
- `referencedNames`: **143 semantic + 41 primitive = 184**;
- excluded (ii): **16** component-token and **65** component-internal;
- excluded (iii): **7** consumer-supplied sites;
- 99 bundled modules, 21 recorded dynamic sites, **0 not-checked**.

### Dynamic sites — site → disposition → reason

The scan patterns run over `src/components/**/*.{ts,css}` (tests and `.d.ts` excluded):
- `` var(--${ ``, `` `--${ ``, `` getPropertyValue(` `` and `'--' +`, **each also matching a partial name before the interpolation or concatenation** (adaptation 3);
- plus **`helper-call`**, a call to the name-constructing helpers `tokenToCssCustomProperty` / `tokenToCssVar` (adaptation 4).

The scan finds 21 sites. `SITE_RECORD` holds exactly 21, and they are asserted equal.

| Site (HEAD line) | Pattern | Disposition | Reason / resolved set |
|---|---|---|---|
| `token-mapping.ts:80` `` return `--${kebab}`; `` | `` `--${ `` | helper | The construction itself. Every caller is a recorded site. *(The plan's `token-mapping.ts:70`: see drift.)* |
| `token-mapping.ts:100` (inside `tokenToCssVar`) | helper-call | helper | Wraps the construction. |
| `token-mapping.ts:130/161/192/223/254/285/316` (seven padding mappers) | helper-call | **(i) closed** | `paddingTokenMap` ∪ the card padding maps → 6 names (`--space-inset-{050…400}`). |
| `token-mapping.ts:349` (border width) | helper-call | **(i) closed** | `borderTokenMap` ∪ `cardBorderTokenMap` → `--border-{default,emphasis,heavy}` |
| `token-mapping.ts:351` (`borderColor ? … : BORDER_COLOR_TOKEN`) | helper-call | **(iii) `borderColor`** + **(i)** default | Consumer-named, out of 5A. Our defaults (`BORDER_COLOR_TOKEN`, `cardBorderColorTokenMap`) resolve: `--color-structure-border`, `--color-structure-border-subtle`. **See the `borderColor` alias fork in the parent report.** |
| `token-mapping.ts:382` (radius) | helper-call | **(i) closed** | `borderRadiusTokenMap` ∪ card → `--radius-{050,100,200}` |
| `token-mapping.ts:407` (`background`) | helper-call | **(iii) `background`** | Our default values are `cardBackgroundTokenMap` → `--color-structure-surface-{primary,secondary,tertiary}`. |
| `token-mapping.ts:432` (`shadow`) | helper-call | **(iii) `shadow`** | Our default value is `cardShadowTokenMap` → `--shadow-container`. |
| `token-mapping.ts:459` (`opacity`) | helper-call | **(iii) `opacity`** | Our default, `var(--opacity-subtle)`, is a static literal and is already in the contract. |
| `token-mapping.ts:492` (z-index) | helper-call | **(i) closed** | `layeringTokenMap.web` → `--z-index-{container,navigation,dropdown,modal,toast,tooltip}` |
| `ContainerBase.web.ts:224` | helper-call | **(iii) `background`** | Consumer-named. The fallbacks `--color-structure-{surface,canvas}` are static literals and are in the contract. |
| `ContainerCardBase.web.ts:167` *(plan: `:166`)* | helper-call | **(i) closed** | `cardBackgroundTokenMap` → 3 names |
| `IconBase.web.ts:200` and `:476` (occurrences 1 and 2) | `` var(--${ `` | **(iii) `color`** | The consumer's own prop value. **The values OUR components pass are resolved as (i)**: `Input-Text-Base`'s `color-feedback-error-text`, `color-feedback-success-text` and `color-text-subtle`, found mechanically from `createIconBase({ color })` and `<icon-base color="…">`, and attributed to Input-Text-Base. |
| `ProgressPaginationBase.web.ts:232` | `` `--${ ``, `` getPropertyValue(` `` | **(ii) component tier** | `--progress-node-size-{sm,md,lg}-current`, our component tier. The web getter clamps `size` to exactly these. Enumerated, **own-index checked**, and excluded by P1. |

**The expected-today mapping holds, located by content** (asserted in `build-name-contract.test.ts › the expected-today dispositions hold`):
- `ContainerCardBase:166` → (i);
- `token-mapping.ts:70`'s closed maps → (i);
- `ProgressPaginationBase:232` → (ii);
- `IconBase:200/:476` → (iii);
- `ContainerBase:224` → (iii);
- the typed props → (iii).
- **Nothing is uncovered today** (`notChecked: []`).

**Line drift, attributed**:
- The plan was merged at `15010947`. At that commit, `token-mapping.ts:70` was `` return `var(--${tokenName.replace(/\./g, '-')})`; `` and `ContainerCardBase:166` / `ContainerBase:224` were direct `` `--${….replace(…)}` `` constructions.
- **#201 (`af5842eb`)**, Lina's gate fix, folded all three into the `tokenToCssCustomProperty` helper. The construction moved to `:80`, and `:166` became `:167`.
- **The two callers are now helper calls, invisible to the four literal patterns.** That is why the `helper-call` pattern exists (adaptation 4).
- `IconBase:200/:476` and `ProgressPaginationBase:232` did not drift.

### The `--_`-prefixed private properties (#202 / #203), and `--chrome-offset`

**Disposition: (ii), recorded as `class: 'component-tier', kind: 'component-internal'`.**

Why:
- A name is component-internal **iff the component defines or sets it itself**: a CSS declaration `--x:` in its own CSS (or in CSS text inside its JS), or `setProperty('--x', …)`.
- `--_itp-hover-bg` (#203) is declared inside `InputTextPassword.web.ts`'s template CSS, with a blend-computed JS value. `--chrome-offset` is `setProperty`'d by `NavTabBarBase.web.ts:274` (not `--_`-prefixed, and caught by the rule, not by the prefix).
- These are not token names, so they are not (i). No consumer names them, so they are not (iii). **They stay behind the component surface, which is (ii)'s rationale (DD17).**
- A consumer's language cannot lack them, because the component supplies them.
- **The prefix alone is NOT the test.** A `--_x` that is referenced but never defined is not self-defined, so it falls through to the own-index check and fails the build.
- 65 names in total: 63 `--_`, `--_cta-icon-color` (literal-only), and `--chrome-offset`.

## Targeted tests + result

- `npx jest --config scripts/jest.config.js scripts/__tests__/build-name-contract.test.ts` → **19 passed, 19 total**:
  - synthetic worlds: the design bite row (*"add a `var(--x)` to a component CSS → appears; bundle ⊆ src holds"*), bundle ⊆ src fails, a comment name is not a reference, own-index fails and is routed to Lina, component-internal, component-token exclusion, the unrecorded site fails and a recorded one clears it, the pattern coverage, partial names;
  - the real surface: a clean build, P1 tiers, **SITE_RECORD ≡ scan**, the expected-today dispositions, (i)/(iii)-default resolution, component-internal, **the own-index bite**, a seventh site caught, and the written file equal to the build.
- `npx tsx scripts/build-name-contract.ts` → exit 0 (counts as above).

### Bites (mutate → run → restore; `cmp` confirmed each restore)

1. **OWN-INDEX BITE (the criterion's)**: re-introduce `--border-border-default`.
   - `Container-Base.refs.ts` `'default': 'border.default'` → `'border.border.default'`, then `npx tsx scripts/build-name-contract.ts` → **EXIT=1**:
     > `✖ name-contract OWN-INDEX CHECK: '--border-border-default' is referenced by Container-Base (site Container-Base (Container-Base.borderTokenMap, Container-Card-Base.cardBorderTokenMap)) but is not defined in DesignerPunk's own generated web CSS (dist/DesignTokens.web.css + dist/ComponentTokens.web.css). This is a component defect, not a consumer gap — route to Lina (Stemma components). It never reaches a consumer report.`
   - Restored: `cmp` OK, `git diff --quiet` OK.
2. **bundle ⊆ src, on the real bundle**: appended `const __probe = "var(--bundle-only-probe)";` to `dist/browser/designerpunk.esm.js` → **EXIT=1**:
   > `✖ name-contract bundle ⊆ src: '--bundle-only-probe' is in dist/browser/designerpunk.esm.js but in no bundled source module — esbuild synthesized or interpolated it. Refusing to build.`
   - The own-index line also fired for the same name.
   - Restored from backup: `cmp` OK, and the rebuild exits 0.
3. **An unrecorded seventh site, in real component source**: appended ``const __probeSite = (v: string) => `var(--chip-${v})`;`` to `ChipBase.web.ts` → **EXIT=1**:
   > `✖ name-contract UNRECORDED DYNAMIC SITE: src/components/core/Chip-Base/platforms/web/ChipBase.web.ts:482 … (pattern: var(--${) builds a token name at runtime and is not in SITE_RECORD …`
   - Restored: `cmp` and `git diff --quiet` OK.
4. **The patterns reverted to their bare forms** (`/var\(--\$\{/`, ``/`--\$\{/``) → `✕ partial names before an interpolation…`, `✕ a seventh site added to component source is caught…` — **2 failed**. Restored.
5. **The ⊆ check disabled in code** → `✕ bundle ⊆ src: a bundle-only name FAILS the build` — **1 failed**. Restored.
6. **The own-index failure disabled in code** → `✕ OWN-INDEX CHECK: a static reference absent…`, `✕ OWN-INDEX BITE: re-introduce --border-border-default…` — **2 failed**. Restored.

## Application-time adaptations

1. **The src side of bundle ⊆ src is the bundle's own module list**, not design C7's `src/components/**/*.{css,web.ts}` glob.
   - The list comes from esbuild's module-boundary comments: `// src/…`, and `// css-as-string:<abs>/src/…`.
   - **Measured**: under the design's glob, 3 bundle names are bundle-only today (`--color-feedback-error-background`, `--color-feedback-select-{background,text}-default`). They live in `Button-VerticalList-Item/platforms/web/visualStateMapping.ts`, which is not a `.web.ts` file, so the literal glob would fail the build on real code.
   - An empty module list fails closed.
2. **Names are read from comment-free STRING text via the TypeScript AST**, not by regex over the raw bundle.
   - esbuild inlines component CSS with its comments. `--space-125` is in the bundle only inside a `ButtonIcon.web.css` comment.
   - Template heads and middles that end at a `${` are "cut": a name running into the cut is being built, not referenced.
3. **The scan patterns are widened to partial prefixes**: `` var(--chip-${ ``, `` `--chip-${ `` and `'--chip-' +`. The bare four miss them (bite 4). This is a strict superset of the criterion's patterns.
4. **A fifth scan pattern, `helper-call`.** After #201, two of the plan's expected sites (`ContainerCardBase:166`, `ContainerBase:224`) are calls to `tokenToCssCustomProperty` and match none of the four patterns. Without it they would be invisible.
5. **The own-index check covers EVERY name that would enter the contract, not only class-(i) resolved names.**
   - This means static references too, which is the same defect class as #201/#202.
   - The self-defined exception is (ii), component-internal. Today it passes with **zero** static phantoms in the bundle.
6. **The literal read is widened** from `getPropertyValue('--x')` to every complete `'--x'` literal (see the reconciliation).
7. **Values are the `:root` light base value**, resolved through whole-value `var()` chains, e.g. `--space-grouped-normal` → `8px`. Colors read as their `oklch(…)` light value.
8. **Out-of-list edit, disclosed**: `package.json`, which adds `build:name-contract` and chains it into `build`. Authority: the brief's minimal, disclosed rule (build wiring is the named example).

## Known issues (routed, not fixed)

- **For Lina**: `src/components/core/Input-Text-Password/platforms/web/InputTextPassword.browser.ts:265` still references the phantom `var(--color-background-hover)`.
  - `*.browser.ts` is not in the browser bundle, so the contract (compiled surface, DD10) does not see it.
  - It is the orphan-audit territory of #204. **Open question**: does `dist/components/**/*.browser.js` ship to consumers?
- **For the browser-bundle owner**: `dist/browser/designerpunk.esm.js` ships the **build machine's absolute paths** in its 27 `// css-as-string:/Users/…` comments. This is pre-existing (`scripts/esbuild-css-plugin.js`), and it leaks a local path into the published tarball.
  - The contract builder accepts both the absolute form and a relative `src/…` form, so fixing the leak does not break it.
- **The ContainerBase.web.ts JSDoc example** `<container-base … background="color.surface">` names a token that does not exist (`color.surface`). It is a comment only, with no runtime effect.
