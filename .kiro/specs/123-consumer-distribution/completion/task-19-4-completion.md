# Task 19.4 Completion — the marked region, the derivation, the reference sweep

**Date**: 2026-10-03 (assembled, owner-reviewed, committed)
**Agent**: Thurgood (Opus) · PRIMARY, Task 19
**Branch**: `task/123-u3-onboarding` @ `7e838ed10` + the uncommitted 19.4 assembly
**State**: assembled, then **reviewed by all six owners**, and their corrections were applied verbatim before the commit (Peter's owner-review ruling, 2026-10-03). The lock refresh is at Task 19's close (after 19.5), not here.
**CI-provenance**: local runs only (listed under § "Tests"). The orchestrator adds the branch-head dispatch after his checkpoint push.

**Owner reviews of the assembled text**, as received (each byte-equal to the copy the orchestrator relayed): `completion/task-19-4-owner-review/{sparky,kenya,data,lina,ada,leonardo}.md`.

**Owner wording, as received** (the record this sweep cites; each file is byte-equal to the copy the orchestrator relayed):
- `completion/task-19-4-owner-wording/ada.md`
- `completion/task-19-4-owner-wording/leonardo.md`
- `completion/task-19-4-owner-wording/lina.md`

## Markers (chosen here, recorded)

- Begin: `<!-- designerpunk:install-region:begin -->`
- End: `<!-- designerpunk:install-region:end -->`

Each occurs exactly once. The begin marker is the first non-blank line after the metadata block's closing `---`, and the scope sentence is the region's first paragraph. `## Reference` follows the end marker, with the lead line "This part of the guide is reference, not setup steps. …". The remainder sits under it: the old `##` sections are demoted to `###`, and their children by one level.

## What changed

- **`governance/DesignerPunk-Integration-Guide.md`**: the markers, `## Reference` and its lead line, the sweep below, and four region corrections:
  - two 19.1 defects, Ada's and Lina's wording verbatim (`task-19-1-completion.md` § "Addendum 2");
  - Prerequisites: Node sourced, npm's unsourced "9+" removed (§ "Unsourced numbers");
  - the Web sub-section's import-list pointer, which now resolves in the derived copy too.
- **`scripts/derive-install-doc.ts`** (new): `deriveInstallDoc(guide)` writes front matter carrying the guide's `path-steps` line, then a fixed header citing `governance/DesignerPunk-Integration-Guide.md`, then the region verbatim. Run it with `npx tsx scripts/derive-install-doc.ts`. There is no `package.json` script line.
- **Owner-review corrections, verbatim** (applied before the commit):
  - Web: the `wcag` theme example (Sparky);
  - iOS: C1–C3 (Kenya);
  - Android: C-1 to C-4 (Data);
  - Product Tokens "Generation": Ada's final, which closes held item 1;
  - Governance Gradient's "Product extending" row: Ada's tokens cell, with Leonardo's other cells, which closes held item 2;
  - the `get_product_tokens` row gains `promotionCandidate?` (Leonardo);
  - § 4's self-reference "in section 4" becomes "above" (Ada's optional item, applied as a correction).

  The region items are recorded in `task-19-1-completion.md` § "Addendum 3", and #268's changed content points in B-U3 § 5.
- **`docs/consumer/INSTALL.md`** (new, the committed derivation, re-derived after the review corrections; `deriveInstallDoc` reproduces it byte for byte).
- **`scripts/__tests__/install-doc.test.ts`**:
  - `region()` now reads the markers, and the interim delimiter is retired;
  - the seven 19.2 pending tests are **flipped to plain tests**, so `PENDING_UNTIL_19_4` is now empty and its guard is kept;
  - five new 19.4 tests: each marker once and in order; the region opens the doc; the identity check; the identity bite; the path-steps carry.

  54 tests in total.
- **`.kiro/docs/ballots/2026-10-03-123-b-u3-install-guide.md`** (DRAFT): P4 and P6 annotated, § 5's interim state closed.
- **`completion/task-19-instruments.md`**: two `## Found later` entries.
- **`completion/task-19-1-completion.md`**: Addendum 2.

## Remainder table — one row per pre-sweep `##`/`###` section, plus the Setup Loop's `####` children

Owner = whose wording the row applies. Source = the owner-wording section, whose ledger carries the `file:line` citations; Thurgood's own rows cite source inline.

| Section (pre-sweep) → assembled | Verb | Reason (one line) | Source | Owner |
|---|---|---|---|---|
| `## Setup Loop` (heading) | removed | replaced as the step list by the region | Peter's ruling 2026-10-03 (`tasks.md` C11 annotation) | Thurgood |
| `### 1. Install` | removed | teaches GitHub Packages, an `.npmrc` and a token; the region installs from public npm | `src/cli/init.ts:176-179` ("No .npmrc scaffold", per `lina.md` § 11); region Prerequisites | Thurgood |
| `### 2. Configure` → `### Configuring your design system` | corrected | `init` writes the config; the theme-type-name comments are false; the example import does not compile | `ada.md` § 1 | Ada |
| `#### Token Source Configuration` | corrected | the pre-123 framing, and a false theme-override rule | `ada.md` § 2 | Ada |
| `#### Creating a Theme` → `#### Themes` | corrected | the tutorial became a status note (themes are not applied or validated) | `ada.md` § 3 | Ada |
| `### 3. Start MCP Servers` → `### Starting the MCP servers by hand` | corrected | the agent tool starts the servers; the startup sample is false | `lina.md` § 1 | Lina |
| `### 4. Configure Agent Connections` → de-numbered | corrected | the intro was Kiro-only and assumed a hand-written config | `lina.md` § 2 | Lina |
| `#### 4a. Configure MCP server connections` → `#### The files \`init\` and \`attach\` write` | removed (JSON) + replacement text | a hand-copied config approving the unregistered `validate_component` and the mutating `rebuild_index` | `lina.md` § 2 | Lina |
| `#### 4b. Set up agent prompts` → de-numbered | kept | every claim checks | `lina.md` § 2 | Lina |
| `### 5. Verify — …` → de-numbered | corrected | the counts 34 and 9 rot; "with MCP servers running" | `lina.md` § 3 | Lina |
| `### 6. Generate Tokens` → `### Generating tokens — options` | corrected | the banner showed a custom theme as applied; `--force` was misdescribed; the output list was duplicated and false | `ada.md` § 4; `lina.md` § 4 | Ada |
| `### Platform Dependencies for OKLCH Color Output` | removed | native is unsupported; "init scaffolds these" is false | `ada.md` § 5 | Ada |
| `### 7. Build Your Product` (with its `#### Web` and `#### iOS and Android`) | removed — moved to the region | duplicates § Platforms; B-U3 rows P1–P3 | B-U3 § 5 | Thurgood |
| `## Running Component Tests` | corrected | wrong tsconfig; wrong count; "tests that ship" is false; the helpers don't resolve under the preset in an installed package; the validators are unexported; "re-run init" is false | `lina.md` § 5 | Lina |
| › `### Setup` | corrected (tsconfig = `init`'s text) | | `lina.md` § 5 | Lina |
| › `### Running Tests` | kept | | `lina.md` § 5 | Lina |
| › `### Shared Test Utilities` | corrected (status note; heading casing kept) | | `lina.md` § 5 | Lina |
| › `### Stemma Validators` | removed | not exported | `lina.md` § 5 | Lina |
| › `### Notes` | corrected (the "re-run init" note removed) | | `lina.md` § 5 | Lina |
| `## Native Platform Sync — Target Model (M0b)` | removed | two commands and a config key that do not exist; #268 left it for 19.4; on Leonardo's checklist | `lina.md` § 6; #268 ballot L243 | Lina |
| `## Available Imports` | corrected | "34" rots; four exported subpaths were missing; step 7's pointer was stale | `ada.md` § 7; `lina.md` § 7; Thurgood: the pointer only (B-U3 P4) | Lina (Ada's rows are Ada's words) |
| `## Product MCP Setup` → `### Specifying screens (Product MCP)` | corrected (retitle) | | `leonardo.md` | Leonardo |
| › `### Starting the Product MCP` | corrected | the config-path step does not exist; the `COMPONENT_DIR` advice is obsolete | `leonardo.md` | Leonardo |
| › `### Product Data Directory` | kept | | `leonardo.md` | Leonardo |
| › `### Product Tokens` | corrected (the Generation lines + a native note) | `dist/product/` was false; the native files are reference output | `owner-review/ada.md` § "Held item 1" (Leonardo deferred: `owner-review/leonardo.md`) | Ada |
| › `### Writing Screen Specs` | corrected (`space.inset.200`) | | `leonardo.md` | Leonardo |
| › `### UI Tree Convention (Draft)` | corrected (inset; platform-branch traversal) | | `leonardo.md` | Leonardo |
| › `### One-off Component Metadata` | kept | | `leonardo.md` | Leonardo |
| › `### Principles with YAML Frontmatter` | kept | | `leonardo.md` | Leonardo |
| › `### Product MCP Example Queries` | kept | | `leonardo.md` | Leonardo |
| `## Governance Gradient` | corrected | "Ecosystem" → "Design system"; the Principle sentence; the "Product extending" tokens cell is now `product/tokens/` | `ada.md` § 9; `owner-review/ada.md` § "Held item 2" (Leonardo agrees) | Ada |
| `## CLI Commands` | corrected | lists 4 of 11 commands; the `mcp:*` rows implied the user starts the servers | `lina.md` § 8 (Leonardo's flag carried: "Your agent tool normally starts it") | Lina |
| `## Knowledge Base Setup` → `### Knowledge Base Setup (Kiro CLI)` | corrected (retitle; the third row) | Kiro-only; `**/*.ts` matches nothing shipped | `lina.md` § 10 | Lina |
| `## MCP Query Reference` | corrected | tables were missing registered tools | Thurgood, below | Thurgood |
| `## Upgrading` (with How Sync Works, Conflict Resolution, `.designerpunkignore`, CI/CD) | corrected | the body described the retired pre-15 `sync` | `lina.md` § 9 | Lina |
| › `### OKLCH Color Migration (v12+)` | removed | depends on the retired `sync`; native-only; the product-token claim is false | `ada.md` § 6 | Ada |

**MCP Query Reference (Thurgood): the source for each added row.**
- **Application**: `get_design_philosophy`, `get_design_rules`, `get_design_guidance({ category? })`, `get_color_strategy({ tier? })` (`application-mcp-server/src/index.ts:231,237,243,254`; purposes from each tool's own description).
- **Docs**: `validate_metadata({ path })` and `rebuild_index()`. The registered set is `mcp-server/src/index.ts:67-76`; the definitions are at `mcp-server/src/tools/validate-metadata.ts:18` and `rebuild-index.ts:17`.
  - **Not added**: `get_health_status`, which `lina.md` § 11 listed as omitted. It is **not registered**: `mcp-server/src/index.ts:63-66` says it is "deliberately NOT included".
- **Product**: `get_brand_context()` and `get_product_tokens({ category?, name?, platform?, promotionCandidate? })` (`product-mcp-server/src/index.ts:48,151-163`), as Leonardo flagged. He supplied the `promotionCandidate?` parameter at review.

## Widened grep — every hit dispositioned (run on the assembled guide)

`git grep -n -E "product-template|src/components/core/|npm\.pkg\.github\.com|@designerpunk:|sync:ios|sync:android|--accept-all|\.kiro/sync-manifest\.json" -- governance/DesignerPunk-Integration-Guide.md` returns **3 hits**. Before the sweep it returned 10.

| Line | Hit | Disposition |
|---|---|---|
| L174 | `src/components/core/*/platforms/android/` | kept: Data's sentence, verbatim (the shipped Android sources' location) |
| L913 | `.kiro/sync-manifest.json` | kept: the 14.x conversion fact (#268 Site 3, via `lina.md` § 9) |
| L931 | `--accept-all` | kept: says `--accept-all` is retired |

**Zero counts** (`grep -o -F`): `npm.pkg.github.com` / `@designerpunk:` are 0 / 0 in the guide, 0 / 0 in `docs/consumer/INSTALL.md` and 0 / 0 in `README.md`. "Setup Loop" occurs 0 times in the guide.

## #268 preservation — targets confirmed (B-U3 § 5)

Line numbers are in the assembled guide. Each content point was found by a fixed-string grep.

| Row | Target confirmed at (post-review lines) |
|---|---|
| P1 Site 1 | (i) L23, L160, L174; (ii) L163, L177; (iii) L166, L178 **narrowed, see below**; (iv) L160 (`\.dpTheme`), L174 (`LocalDPTheme`); (v) the 14: L167, L179; (vii) Spec 129: L170, L182; (viii) iOS 17.0+: L170, Compose BOM: L182. **Retired** (vi): "compiling target", 0 hits; (v)'s four names, 0 in the region |
| P2 2a | L128 |
| P3 2b | (i) L141; (iii) L144; (iv) L147; (v) L148 **corrected, see below**; (vi) L154; scope sentence L23 |
| P4 2c | L492; the pointer at L491 |
| P5 2d | `inter.css`: 0 hits |
| P6 Site 3 | § Reference › Upgrading, L900 (the report comes first), L913 (manifest conversion and `--migrate-legacy --target`); region § 4, L113 |
| P7 4a | region § 4, L96–97 |
| P8 4b | scope sentence L23; Web L154; § Reference › Themes, L308 |

**Changed content points**, recorded in B-U3 § 5 with the evidence, for Peter at the U3 merge:
- **P1 (iii)**: "the components require" `ComponentTokens.*` is narrowed per Kenya (C1) and Data (C-1).
- **P3 (v)**: the `<div data-theme="wcag">` example is corrected to `<html>` per Sparky.

## Unsourced numbers — resolved

- **Node 18+**: now sourced. It is the floor the runtime dependencies declare: `tsx@4.21.0` `engines.node ">=18.0.0"` and `@modelcontextprotocol/sdk@1.29.0` `">=18"` (read from `node_modules/*/package.json`). `package.json` has no `engines` field.
  - "22+ recommended" now reads "DesignerPunk's own CI runs on 22" (`.github/workflows/lane-timing.yml:67`, `node-version: '22'`).
  - *Residual*: DesignerPunk itself is not tested on Node 18.
- **npm 9+**: **removed** (the cell is now "—"). Nothing in the repo states it.
- **"34 components" / "9 patterns"**: **removed**, by Lina's Verify text and her `@3fn/core` row. Both were true in the steward repo (`lina.md` § 3), but they rot. The region carries no such count.
- **Kiro's `/knowledge`** (Lina, U): it is the section's own claim, kept as is and unverified. It is on Lina's review row.

## Held and open items

**Settled at review** (previously held): held item 1, Product Tokens Generation (Ada's final; Leonardo deferred to Ada as a token-output fact), and held item 2, the "Product extending" row (Ada's tokens cell, Leonardo's other cells; both agree).
- The two crossed: each review says it takes the other's wording. Leonardo's quoted block is Ada's original phrasing without her native note. Ada's final carries Leonardo's phrasing plus the note.
- **Applied: Ada's final, per the orchestrator.** Leonardo's review says he gives up nothing in that text, and he does not call the note polish.

**Exceptions to the top-level-only retitle limit** (recorded as directed; Peter was told and has not objected — **informed, not ruled**):
- `#### Creating a Theme` → `#### Themes`: the old title promised a capability the section now says does not exist (Ada; Leonardo: "a correction, not polish").
- The `#### 4a` replacement heading "The files `init` and `attach` write": it is accurate to the replacement content (Lina; Leonardo: no objection).

**Pending Peter — the build-claim wording.** Nothing was changed for it.
- The plan (`tasks.md` Task 19, C15 R2 bullet) gives the build-claim strings as iOS `not built in this amendment` and Android `not build-verified — no Android toolchain has been run`.
- The guide reads "No iOS build was run." (L170) and "no Android build has been run" (L174).
- Kenya (fork F) and Data (C-5) prefer the guide's version-free wording.
- No test asserts either string. The asserted label strings hold, and no sub-section claims a build was run.

**Not applied, with the reason**:
- Data C-5: the optional alignment to the plan string. It is the build-claim item above, pending Peter.
- Data C-6: the WCAG override lines in `DesignTokens.android.kt` are CSS `oklch(…)` syntax. Data: "Leonardo/Thurgood ruling needed — I do not require it". It is a true generator defect, but adding it is a ruling on scope, so it is listed and not added. It is routed to Lina/Ada as a generator defect (Spec 129).
- Kenya § "Findings": `swiftc -typecheck` of the dist files, and the probable `AvatarTokens` redeclaration. Kenya routed these himself (generator output, not 123); no guide text.
- Sparky's flag: his own charter (`canonical/agents/sparky.md` "Web Theming") says `data-theme` works on any element, which the source contradicts. That is a canonical-agent edit outside U3's no-overlap paths, routed to Leonardo/Thurgood. He also asks Ada whether `:root`-only scope is intended; `TokenFileGenerator.ts:1025-1027`'s docstring disagrees with the code. Both are routed, not edited.
- Leonardo: L682's duplicate comment. He calls it harmless and leaves it, since the sweep does not polish.

**Stated dependency (Lina's review (e))**: these sentences are DESIGN-ONLY at this commit, true only once U3's later subtasks land:
- the region's "(`generate` creates it)", L219 and L230, needs 22.1;
- "the CI-needs starter spec, which `init` places in your repo's `specs/`", L244, needs 21.3;
- `COMMIT-POLICY.md`'s rows on the `specs/` scaffold, note creation and the `.gitignore` block need 21.3, 22.1 and 20.2.

If any of 20.2, 21.3 or 22.1 is cut or deferred from U3, those sentences must be corrected in the same PR. Nothing asserts them mechanically today.

**Jest preset (OPEN with Peter: fix in U3 / separate PR before the release-3 tag / stated limitation). No code was changed.**
- Lina reproduced the defect: a test importing `@3fn/core/testing` fails under the shipped preset in a packed install.
- Running Component Tests as written is truthful about it. § "Shared Test Utilities" says the helpers "do not work under the preset in an installed package" and names the four unshipped mappings.
- The section no longer shows an import example. Its remaining instructions (`jest.config.js` with the preset, the install command, `npx jest`) work: a plain test passes (Lina's reproduction).
- The Available Imports `@3fn/core/testing` row points to that note.
- **One surface outside the guide still teaches the helpers**: the `init` jest-collision string (`src/cli/shared/errorCatalog.ts:110`, per `owner-review/lina.md`). That is Lina's, and is for whoever fixes the preset.

## Owner review — section → owner → verdict

Anchors are lines in the committed guide, after the review corrections. Each verdict cites its review file in `completion/task-19-4-owner-review/`. Owners who supplied wording reviewed their own words (a stated residual).

| Section | Lines | Owner | Verdict (record) |
|---|---|---|---|
| Scope sentence (the region's first paragraph) | L23 | Leonardo | CONFIRMED (`leonardo.md`) |
| § Prerequisites | L25–38 | Thurgood | CONFIRMED (Thurgood: Node sourced to the dependencies' `engines` and CI's `'22'`; npm's "9+" removed; Lina's review (d) re-verified the Node line) |
| § 1 Which posture? | L39–49 | Thurgood | CONFIRMED (Thurgood: no behaviour claim beyond `init` = birth; `vocabulary.ts` forms) |
| § 2 CONSUME | L50–66 | Lina | CONFIRMED (`lina.md`) |
| § 3 BECOME | L67–84 | Lina | CONFIRMED (`lina.md`) |
| § 4 Your language vs our updating surface | L85–114 | Ada | CONFIRMED; "section 4" → "above" applied (`ada.md`) |
| § Platforms (intro) | L115–118 | Thurgood | CONFIRMED (Sparky ledger row 15 checks its section numbers) |
| § Platforms › Web | L119–157 | Sparky | CONFIRMED-WITH-CORRECTIONS, applied (`sparky.md`) |
| § Platforms › iOS | L158–171 | Kenya | CONFIRMED-WITH-CORRECTIONS, C1–C3 applied; fork F pending Peter (`kenya.md`) |
| § Platforms › Android | L172–183 | Data | CONFIRMED-WITH-CORRECTIONS, C-1 to C-4 applied; C-5 pending Peter; C-6 not applied (`data.md`) |
| § 5 When sync reports a missing token | L184–195 | Lina | CONFIRMED (`lina.md`) |
| § 6 Your agent layer | L196–199 | Lina | CONFIRMED (`lina.md`) |
| § Adding a second harness | L200–209 | Lina | CONFIRMED (`lina.md`) |
| § 7 Joining | L210–234 | Lina | CONFIRMED (`lina.md`; heading text stable for COMMIT-POLICY's pointer) |
| § 8 CI needs | L235–247 | Thurgood | CONFIRMED, with the DESIGN-ONLY dependency on 21.3 stated above |
| § 9 Ownership | L248–253 | Lina | CONFIRMED (`lina.md`) |
| `## Reference` lead | L256–259 | Thurgood | CONFIRMED |
| Configuring your design system (with Token Source Configuration, Themes) | L260–309 | Ada | CONFIRMED (`ada.md`) |
| Starting the MCP servers by hand | L310–323 | Lina | CONFIRMED (`lina.md`) |
| Configure Agent Connections | L324–355 | Lina | CONFIRMED (`lina.md`) |
| Verify — Explore the Component Catalog | L356–381 | Lina | CONFIRMED (`lina.md`) |
| Generating tokens — options | L382–424 | Ada | CONFIRMED (`ada.md`) |
| Running Component Tests | L425–484 | Lina | CONFIRMED; "do not work" is now verified by reproduction (`lina.md`) |
| Available Imports | L485–505 | Lina (rows `types` and `build` Ada's) | CONFIRMED (`lina.md`; Ada's rows confirmed in `ada.md`) |
| Specifying screens (Product MCP) | L506–789 | Leonardo (Product Tokens co-owned with Ada) | CONFIRMED; held item 1 settled to Ada's final (`leonardo.md`, `ada.md`) |
| Governance Gradient | L790–803 | Ada (product rows co-owned with Leonardo) | CONFIRMED-WITH-CORRECTIONS; held item 2 settled (`ada.md`, `leonardo.md`) |
| CLI Commands | L804–821 | Lina | CONFIRMED (`lina.md`) |
| Knowledge Base Setup (Kiro CLI) | L822–835 | Lina | CONFIRMED (`lina.md`; `/knowledge` remains unverified) |
| MCP Query Reference | L836–897 | Thurgood (the Product table reviewed by Leonardo) | CONFIRMED; `promotionCandidate?` added per `leonardo.md`; Lina withdrew `get_health_status` (`lina.md` (b)) |
| Upgrading | L898–951 | Lina | CONFIRMED (`lina.md`) |
| `docs/consumer/INSTALL.md` | whole file | Lina (Ada for its token lines) | CONFIRMED (`lina.md`, `ada.md`) |

## Tests (re-run on the tree after the review corrections, before the commit)

- `npm run test:scripts`: **17/17 suites, 369/369 tests**. `install-doc.test.ts`: **54/54**.
- `npm test`: **390/390 suites, 9377/9377 tests**.
- `npx tsc --noEmit`: exit 0.
- `npm run check:section-citations`: PASS (191).
- `node scripts/validate-steering-metadata.js`: the guide is valid, 0 errors.
- `npm run check:drift`: clean.
- Diff guard through `runGuard({refreshLock:false})`: `full-run-green` (input-closure-changed), freshness 0. `outputs` did not move. `canonical/generated.lock` is byte-identical (sha1 `c3edb546…`).
- No-overlap diff (merge-base..HEAD, and the working tree's status on the listed paths): empty.
- Docs MCP `get_document_summary` (at assembly): 12 region sections plus `Reference`, with 13 subsections.
- `INSTALL.md` equals `deriveInstallDoc(<guide>)` after re-derivation (checked directly, and by the identity test).
- **Not run this turn**: `test:pack-contents`, `test:consumer`, the mcp-server and application-mcp-server suites. They are owed at Task 19's close (C20).

**Bites** (19.4 classes; each mutation applied to the working-tree file, then restored, with `cmp` confirming):
- a region edit without re-deriving → identity red (2 tests);
- "Setup Loop" outside the region → red;
- a numbered heading outside the region → red;
- a second `## Reference` → red;
- `npm.pkg.github.com` in the reference → red;
- a CLI-table description drift → red;
- a duplicate end marker → **the suite fails to load** (`extractRegion` throws);
- text before the begin marker → "region opens the doc" red.

## Application-time adaptations

1. **Demotion.** "Under one top-level `## Reference` heading" needed the old `##` remainder sections demoted to `###`, and their children by one level. Heading levels changed, but heading text did not, except for the retitles listed. No `get_section` citation targets the guide (round-1 consult).
2. **INSTALL.md's order.** Front matter comes first, because it must open the file to be front matter. The fixed header follows it, then the region. The criterion lists the header first.
3. **Region Web pointer.** "The full import list is in § Available Imports, below" would dangle in INSTALL.md, so it now names the Integration Guide's reference part. This is a region edit; Sparky reviews it.
4. **"Shared Test Utilities"** keeps its original casing. Lina's text has "Shared test utilities", and changing the case would be polish.
5. **`pendingUntil194`** is now unused, but kept with its guard, so a future pending entry must be declared on the list.
6. **The CLI string pointer** `§ "When sync reports a missing token"` still resolves: the region heading is unchanged.
