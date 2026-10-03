# Task 19.4 — Lina's owner wording (CLI, MCP-connection, testing, imports, upgrade rows)

Read against `task/123-u3-onboarding` @ `96628612d` (guide unchanged since `584da6db5`). Guide line numbers are HEAD's.
Legend: **V** = I read it, or ran it, on this branch. **U** = unverified. **D** = DESIGN-ONLY: true only by design text, or by code Task 20.2 / 21 / 22 builds later.
Read-only on the repo: I changed nothing but this file. One scratch pack was made outside the repo (see § 5 ledger).
I read `ada.md` and `leonardo.md` first. Nothing below overrides either; the overlaps are listed in § 11.

Rules applied: remove or correct, never polish; the only retitle I propose is at the end; every behaviour, path or count claim cites `file:line` or a ratified record.

---

## 0. Verb table

| Guide section (HEAD lines) | Verb | One-line reason |
|---|---|---|
| `### 3. Start MCP Servers` (L364–382) | **corrected** | The reader does not start the servers; the "data paths from the package" sentence and the startup sample are false. |
| `### 4. Configure Agent Connections` intro (L386) | **corrected** | Kiro-only and describes a hand-written config. |
| `#### 4a` (L388–451, the JSON, the "Template source" note) | **removed** | A hand-copied config that `init`/`attach` generate; it carries the unregistered `validate_component` and a false claim about the shipped template. |
| `#### 4b` (L453–467) | **kept** | Every claim matches the code (ledger). Its number prefix is Thurgood's mechanics. |
| `### 5. Verify` (L469–493) | **corrected** | Two hard counts and "all" claims are wrong in a repo that has its own components. |
| `### 6. Generate Tokens`, CLI-side statements (L495–548) | **kept**, with Ada's corrections | I confirm the CLI-side lines against source; nothing here contradicts Ada's wording (§ 4). |
| `## Running Component Tests` (L618–721) | **corrected** (one subsection **removed**) | Wrong tsconfig, wrong count, a false "tests that ship" premise, an example that cannot resolve, validators that are not exported, and a "re-run init" note that contradicts the birth rule. |
| `## Native Platform Sync — Target Model (M0b)` (L725–745) | **removed** | Two commands and one config key that do not exist. Not on my list, but #268 left it "for 19.4" (ballot L243). |
| `## Available Imports` rows `./testing`, `./jest-preset`, and the "34" count (L749–763) | **corrected** | Two exported subpaths are missing; the count rots. |
| `## CLI Commands` (L1074–1081) | **corrected** | 4 of 11 commands, and the three `mcp:*` rows say the user starts them. |
| `## Upgrading` (L1153–1208): body, How Sync Works, Conflict Resolution, `.designerpunkignore`, CI/CD | **corrected** | The body describes the retired pre-15.0.0 flow; only the `.designerpunkignore` idea survives. |
| `### OKLCH Color Migration (v12+)` (L1210–1220) | **removed** (Ada's row 6) | I concur; see § 11. |
| `## Knowledge Base Setup` (L1085–1095) | **corrected** | Kiro-only; the third row's `**/*.ts` include matches nothing the package ships. |

**Top-level retitle**: `## Knowledge Base Setup` → **`## Knowledge Base Setup (Kiro CLI)`**. No other.

---

## 1. `### 3. Start MCP Servers` (L364–382) — **corrected**

Reason:
- L372: "All commands resolve data paths from the installed package automatically" is false for the three consumer-owned roots.
- L376–382: the "Startup prints" sample is not what any server prints.
- The section reads as a step the reader performs. The agent tool starts the servers (Leonardo's flag, § 2 of `leonardo.md`).

**Replace L364–373** (heading through the "Create the directory…" sentence) **with:**

````markdown
### Starting the MCP servers by hand

Your agent tool starts DesignerPunk's MCP servers itself, from the MCP configuration that `init` or `attach` writes. You do not need to start them. To start one by hand, for example to read its log:

```bash
npx designerpunk mcp:app      # Application MCP — component + token queries
npx designerpunk mcp:docs     # Docs MCP — steering doc queries
npx designerpunk mcp:product  # Product MCP — screen specs, domain objects, product architecture
```

Each command runs its server on stdio and writes its log to stderr. Run it from inside your project: the Application and Product servers find your design system from the directory they start in, while the data that ships with the package (docs, experience patterns, layout templates, family guidance) is read from the package. The Product MCP starts with empty data if no `product/` directory exists yet; that is expected for a new project (see "Specifying screens (Product MCP)" below).
````

**Keep L374** ("Data freshness is automatic …").

**Remove L376–382** (the "On startup, each server prints its connection details" sample).

Ledger

| Claim | Source |
|---|---|
| Your agent tool starts the servers from the generated config | **V** `src/cli/templates/mcp-config.json.template` (each server entry is `command: node` over `./node_modules/@3fn/core/dist/mcp/*.js`); `src/cli/shared/mcpConfig/cc.ts:37-51`, `kiro.ts:101` write it |
| The three verbs exist and run their servers | **V** `src/cli/designerpunk.ts:63-71` (dispatch), `:350-410` (`runMcpApp`, `runMcpDocs`, `runMcpProduct`) |
| Package-owned data (patterns, templates, guidance, registry; docs governance dir) comes from the package | **V** `src/cli/designerpunk.ts:366-376` (app envs), `:386-398` (docs: `MCP_STEERING_DIR` = package `governance`) |
| The consumer-owned roots get no runner default and are found from the starting directory | **V** `src/cli/designerpunk.ts:352-359` (comment and code), `:410-415` (product: `{}`); `src/cli/shared/bornRepo.ts:343-370` (`findDesignSystemRoot` walks up from the cwd) |
| Log goes to stderr, protocol on stdio | **V** `src/cli/designerpunk.ts:363-368` (`console.error`); `application-mcp-server/src/index.ts:447` ("Server running on stdio") |
| What the removed sample claimed | **V false**: the app runner prints `DesignerPunk Application MCP / Protocol: stdio / Server: <bundle> / Starting...` (`designerpunk.ts:363-367`), with no `Data:` line and no "Ready for connections" (the only `Data:` line is the docs runner's, `:391`) |
| Empty Product MCP is expected | **V** per `leonardo.md` (`product-mcp-server/src/index.ts:614-616`); I did not re-open it |
| 30-second gate (kept L374) | **V** `application-mcp-server/src/staleness/StalenessGate.ts:40`, `mcp-server/src/staleness/StalenessGate.ts:40`, `product-mcp-server/src/staleness/StalenessGate.ts:40` (all `thresholdMs ?? 30_000`) |
| "Stale data … rebuild before responding" (kept) | **V** `mcp-server/src/index.ts:155-156` (`checkAndRebuildIfNeeded` before every non-exempt tool) |

Cross-reference: the text names Leonardo's retitle "Specifying screens (Product MCP)". If Thurgood does not take his retitle, change that string back to "Product MCP Setup".

---

## 2. `### 4. Configure Agent Connections` (L384–467)

### 4 intro (L386) — **corrected**

Reason: "Your Kiro agents" is wrong for a Claude Code target, and the section teaches a file you write by hand.

**Replace L386** with:

```markdown
Your agent tool needs two things to connect to DesignerPunk: an MCP configuration that tells it how to start the servers, and agent prompts that tell each agent its role. `init` writes both for the target you name, and `attach` writes them for another target or for a repo `init` did not create. Do not write the MCP configuration by hand: its approvals are generated from the servers' own tool registrations, and a hand-copied list drifts from them.
```

### 4a (L388–451) — **removed**

Reason:
- The JSON hand-copies what `attach` and `init` generate.
- Its application array approves `validate_component`, which no server registers.
- Its docs array approves `rebuild_index`, a mutating tool the generated policy deliberately leaves out.
- It carries two of the three servers.
- The "Template source" note (L451) is false: the template has no `autoApprove` at all.

**Replace L388–451 with:**

```markdown
#### The files `init` and `attach` write

- **Claude Code** (`cc`): `.mcp.json` (the servers) and `.claude/settings.json` (the approved read-only tools, under `permissions.allow`).
- **Kiro** (`kiro`): `.kiro/settings/mcp.json` (the servers, each with its approved read-only tools).

Both configure all three servers (docs, application, product). With `--reference`, only the docs and application servers are written, and no agents.

After the files are written, restart your agent session so it picks them up (section 3 says why). If a session shows a server as not connected, verify:
- `node_modules/@3fn/core/dist/mcp/` contains the bundled server files (they ship with the package)
- Your `@3fn/core` install completed without errors
- Paths in the MCP config resolve from your project root
```

The three verify bullets are L447–449, kept word for word.

Ledger

| Claim | Source |
|---|---|
| Hand-copied JSON's application array contains `validate_component` | **V** `governance/DesignerPunk-Integration-Guide.md:434` |
| No server registers it | **V** `scripts/__tests__/tool-manifest.test.ts:135-141`; names registered by `application-mcp-server/src/index.ts` do not include it (list in § 9) |
| The docs array approves `rebuild_index`; the generated policy approves read-only tools only | **V** guide L412; `src/cli/shared/mcpConfig/kiro.ts:50-68` (`readOnlyHint === true` filter), `:94`; `scripts/__tests__/tool-manifest.test.ts:126-133` (`rebuild_index` is NOT read-only) |
| The template carries no `autoApprove` and has three servers | **V** `src/cli/templates/mcp-config.json.template` (`designerpunk-docs`, `designerpunk-application`, `designerpunk-product`; no `autoApprove` key) |
| cc writes `.mcp.json` and `.claude/settings.json` `permissions.allow`; strips template `autoApprove`/`disabled` | **V** `src/cli/shared/mcpConfig/cc.ts:37-42` (`.mcp.json`), `:82-90` (settings, `mcp__<server>__<tool>`) |
| Kiro writes `.kiro/settings/mcp.json` with generated `autoApprove` | **V** `src/cli/shared/mcpConfig/kiro.ts:94,101` |
| `--reference` writes docs + application only, no agents | **V** `src/cli/attach.ts:344-353` (`REFERENCE_SERVERS`) |
| `init` also writes the MCP config for its target | **V** `src/cli/init.ts:239-262` (comment: "agent layer + MCP config for the selected target") |
| "Restart … section 3 says why" | **V** guide L81 (region) |
| Verify bullets' paths | **V** template `args` `./node_modules/@3fn/core/dist/mcp/…` |
| The generated approvals are what the tests assert | **V** `src/cli/__tests__/init.test.ts:283-293` (Kiro `autoApprove` set-equal to the manifest's read-only set), `:330` (cc) |

The "A `rebuild_index` alone is NOT sufficient if you've changed directory paths" sentence (L444) is covered by the restart rule in section 3 (L81). It is removed with 4a, not moved.

### 4b (L453–467) — **kept**

Every claim checks against the code, so it needs no edit:
- `init` emits the agent layer for the default target: `src/cli/init.ts:111-122` (bare `init` = the declared default; `--target=<t>` = `<t>`) and `:239-262`.
- `attach` is safe to re-run and takes `--reference`: `src/cli/attach.ts:344-353`.
- The `attach` sentence is `vocabulary.ts`'s `attachUsage()` plus ", for one target" (`src/cli/shared/vocabulary.ts:34-36,56`); `scripts/__tests__/install-doc.test.ts:477-480` already asserts it.

**D / mechanics for Thurgood**: with 4a removed, 4b is the section's only subsection. Its heading number goes with the Setup Loop de-numbering (your call).

---

## 3. `### 5. Verify — Explore the Component Catalog` (L469–493) — **corrected**

Reason: three claims are wrong or rot:
- "With MCP servers running": the agent tool runs them.
- "all 34 production components": the catalog is the package's components **plus** the reader's own, so the count is wrong the moment the reader adds one.
- "all 9 experience patterns": true today, but a hard count that goes stale.

**Replace L471** with: `Once your agent session is connected, verify DesignerPunk is working by querying the component catalog:`

**Replace L476** with: `→ Should return DesignerPunk's components, plus any you have added in your own \`src/components/\`, with names, types, families, and readiness.`

**Replace L486** with: `→ Should return the experience patterns that ship with DesignerPunk (simple-form, settings, onboarding, and others).`

Keep L479–481, L489–493.

Ledger

| Claim | Source |
|---|---|
| The catalog is the union of the consumer's components and the package's | **V** `src/cli/shared/mcpDataRoots.ts:183-205` (`resolveComponentRoots`: consumer root, then package `src/components/core`, always); `application-mcp-server/src/indexer/ComponentIndexer.ts:172-181` |
| The 34 and the 9 are true in the steward repo today | **V** Application MCP `get_component_health` → `componentsIndexed: 34`, `patternsIndexed: 9`; `ls src/components/core` = 34; `ls experience-patterns` = 9 yaml + README |
| `find_components({ context: "forms" })` returns Input-Text-Base and Button-CTA | **V** run here against the Application MCP: 20 components, including `Input-Text-Base` and `Button-CTA` |
| `simple-form`, `settings`, `onboarding` exist | **V** `experience-patterns/{simple-form,settings,onboarding}.yaml` |
| `get_experience_pattern`, `list_experience_patterns` exist | **V** `application-mcp-server/src/index.ts:121,127` |

---

## 4. `### 6. Generate Tokens`, CLI-side statements (L495–548) — **kept**, under Ada's wording

Ada owns the corrections (banner, flags table, output list). I checked the CLI-side lines she kept and the lines she replaced; none contradicts her text:

| Statement | Source | State |
|---|---|---|
| `npx designerpunk generate` and the banner format `📦 name (abbr)` / `Tokens:` / `Output:` / `Themes:` | **V** `src/cli/designerpunk.ts:236-243` (`Tokens: ${relativePath}  (${config.tokenSourceMode})`; `path.relative` drops the `./`) | agrees with Ada's replacement sample |
| `(local)` / `(package)` annotation (L509) | **V** `src/cli/designerpunk.ts:238`, `src/config/ConfigLoader.ts:123` (`'local' \| 'package'`) | true; Ada keeps L509 |
| `--force` touches only the product-token staleness check | **V** `designerpunk.ts:286-297` and `:332`; `src/cli/staleness.ts:36-37` | agrees with Ada's flags row |
| `--product-only` "run from your project root" | **V** `designerpunk.ts:317,325` (both `process.cwd()`); filed as `.kiro/issues/2026-10-03-generate-product-only-resolves-from-cwd.md` (#299) | Ada's text is the guide-side workaround until that issue's fix lands |
| `validate` checks (L533) | **V** per `ada.md` (`src/cli/validate.ts:36-39`); I did not re-open it | kept |
| `token-index/` written at the project root | **V** `designerpunk.ts:204,268` | agrees with Ada |

One edit, **not Ada's, not mine**: L537–538 and L548 reference "step 7" and the 15.0.0 spec path; Ada's replacement of L535–548 removes both. Nothing for me to add.

---

## 5. `## Running Component Tests` (L618–721) — **corrected**; `### Shared Test Utilities`, the example and `### Stemma Validators` **removed**

Reason, with the verified failure first:
- **The package's own jest preset maps four imports to files the package does not ship** (V, tarball packed and extracted; ledger). So the `@3fn/core/testing` import in L666–704 cannot resolve under the preset in an installed package.
- `@3fn/core/testing` **does not export** `validateComponentName` or `validateTokenUsage` (L711), so the Stemma Validators subsection cannot work either.
- The example's `import { ButtonCTA } from '../platforms/web/ButtonCTA.web'` resolves only for a component folder the reader wrote: the package ships no web component source.
- L620's "the same component tests that ship with `@3fn/core`" is false: no component test ships.
- L620 says "4 devDependencies"; L627 installs 5.
- The `tsconfig.test.json` at L640–656 uses `"module": "commonjs"` with `"moduleResolution": "bundler"`, which `init`'s own comment says fails (TS5095); `init` writes `node16`.
- L721 says "re-run `npx designerpunk init` to refresh component source": `init` is the birth event and refuses in a born repo, and it copies no component source.

**Replace L620** with:

```markdown
You can test your own components with the Jest preset that ships with `@3fn/core`. You extend the preset with one line and install 5 devDependencies.
```

**Replace the `tsconfig.test.json` block (L641–656)** with `init`'s text, so the guide and the scaffold agree:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "node16",
    "moduleResolution": "node16",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "resolveJsonModule": true,
    "downlevelIteration": true,
    "types": ["jest", "node"]
  },
  "include": ["src/**/*"]
}
```

**Keep** L622–638 (the install command, the "if you ran `init`" sentence, `jest.config.js`) and L658–664 (Running Tests).

**Replace L666–714** (`### Shared Test Utilities`, the minimal example, `### Stemma Validators`) **with:**

```markdown
### Shared test utilities

`@3fn/core/testing` exports test helpers (`registerComponent`, `createComponentFixture`, `cleanupDOM`, `waitForShadowDOM`, `setupTokenProperties`, `cleanupTokenProperties`, `setupBlendColorProperties`, `cleanupBlendColorProperties`, `readComponentCSS`). **In this version they do not work under the preset in an installed package**: the preset maps `@3fn/core/testing`, `@3fn/core/config`, `@3fn/core/blend` and `@3fn/core/types` to source files the package does not ship. `@3fn/core/build` is not affected.
```

**Keep L718–720** (the three notes: jsdom default, `jest-environment-jsdom`, `@types/node`). **Remove L721** (the "re-run init" note).

**Contingency, for Thurgood and Peter**: the status note above is the honest text today. If the preset fix lands before release 3, replace the note with the helpers list and restore the example with a comment that it assumes a component folder of your own, and reinstate no validators subsection (they remain unexported).

Ledger

| Claim | Source |
|---|---|
| The preset maps five specifiers to package paths | **V** `src/testing/jest-preset.ts:55-60`; compiled copy `dist/testing/jest-preset.js:84-91` |
| **Four of the five mapped targets are not in the tarball** | **V** I ran `npm pack --ignore-scripts` from this branch into the scratch folder, extracted it, and `fs.existsSync`'d each mapped path from the compiled preset: `^@3fn/core/blend$` → `src/blend/index.ts` **MISSING**; `^@3fn/core/types$` → `src/types/index.ts` **MISSING**; `^@3fn/core/testing$` → `src/testing/index.ts` **MISSING**; `^@3fn/core/config$` → `src/config/index.ts` **MISSING**; `^@3fn/core/build$` → `src/build/tokens/index.ts` exists; `\.css$` → `dist/testing/style-mock.js` exists. Cause: `package.json` `files` (L15-58) lists none of those four `src/` paths (it lists `src/types/PrimitiveToken.ts` and `SemanticToken.ts`, and `src/build/tokens/index.ts`). |
| That jest then fails with "could not locate module" | **U**: the mapped paths are missing (V); I did **not** run Jest in a packed install |
| No test covers the preset in a packed install | **V** `grep jest-preset\|src/testing` over `scripts/pack-assert.ts` and `tests/consumer-integration.test.ts`: no hits |
| `@3fn/core/testing` resolves to `dist/testing/index.js` and exports only the helpers above | **V** `package.json` exports `./testing`; `dist/testing/index.d.ts:13-73` (nine functions, no `validate*`) |
| The validators are in a separate file no export reaches | **V** `src/testing/validators.ts:10` (`export * from '../validators'`); `src/testing/index.ts` has no `export … from` line; `package.json` exports has no `./testing/validators` entry |
| `validateComponentName`, `validateTokenUsage` are real functions | **V** `src/validators/StemmaComponentNamingValidator.ts:127`, `StemmaTokenUsageValidator.ts:372` (so the repo's own `*.stemma.test.ts` files import them by relative path, e.g. `Badge-Label-Base/__tests__/BadgeLabelBase.stemma.test.ts:33`) |
| The package ships no web component source, and no component tests | **V** `npm pack --ignore-scripts --dry-run --json` file list: `src/components/core/Button-CTA/platforms/web/ButtonCTA.web.ts` absent; `package.json` `files` L57 ships only `*.schema.yaml`, `contracts.yaml`, `component-meta.yaml` under `src/components`, and L21 excludes `dist/**/__tests__/**`; `scripts/pack-assert.ts:139-148` asserts the web source absent (per `leonardo.md`) |
| The 5 devDependencies | **V** the install command at guide L627 lists five (`jest @types/jest ts-jest jest-environment-jsdom @types/node`); `src/testing/jest-preset.ts:18-24` (header comment lists the same five) |
| `init` writes `jest.config.js` (exactly the guide's text) and `tsconfig.test.json` | **V** `src/cli/init.ts:266-273` (jest), `:279-309` (tsconfig; `module: 'node16'`, `moduleResolution: 'node16'`, comment explaining why `bundler` fails: TS5095) |
| The guide's tsconfig differs from `init`'s | **V** guide L645-646 (`commonjs` / `bundler`) vs `init.ts:291-292` |
| Preset defaults to jsdom; `jest-environment-jsdom` is required | **V** `src/testing/jest-preset.ts:38` (`testEnvironment: 'jsdom'`), `:19-24` (comment) |
| Style mock returns `''` | **V** `src/testing/style-mock.ts:7` |
| `readComponentCSS` exists | **V** `src/testing/index.ts:150`, `dist/testing/index.d.ts:73` |
| `init` is never the way to refresh anything; it copies no component source | **V** `src/cli/init.ts:128-133` (refuses in a born repo), `:215` ("Step 4 … REMOVED"), `:217-228` (creates `src/components/` empty) |

**Defect to file (code, not guide)**: the preset's `moduleNameMapper` and `package.json` `files` disagree (four mapped paths unshipped), and `./testing` does not re-export the validators. The fix is in `src/testing/**` and `package.json` (neither is in my write scope). I recommend one issue; owner Lina for the component-test side, Ada for any `files[]` change. I have not filed it.

---

## 6. `## Native Platform Sync — Target Model (M0b)` (L725–745) — **removed**

Not on my list; included because #268 left it "for 19.4, so it is not touched twice" (ballot `2026-10-02-integration-guide-native-scoping.md` L243) and the widened grep (`sync:ios`, `sync:android`) hits it.

Reason: it describes two commands and a config key that do not exist.

Ledger

| Claim | Source |
|---|---|
| No `sync:ios` / `sync:android` command | **V** `src/cli/designerpunk.ts:45-87` (the full dispatch: `generate`, `validate`, `init`, `attach`, `mcp:*`, `figma:*`, `sync`, `--help`) |
| `platforms` is not a config option | **V** per `ada.md` (`src/config/defineConfig.ts:37-63` lists `name`, `abbreviation`, `themes`, `componentTokens`, `output`, `tokenSource`, `productTokens`) |
| "Runs automatically as part of `generate` when platform paths are configured" | **V false** `src/cli/designerpunk.ts:192-312` (`runGenerate` reads no platform path) |
| Native onboarding is unsupported in this release | **V** guide L156-177 (region) |

No replacement text. The region's § Platforms › iOS and Android already say what is true.

---

## 7. `## Available Imports` (L749–763) — **corrected** (my rows; Ada adds `types` and `build`)

**Replace L753** (`@3fn/core`) with:

```markdown
| `@3fn/core` | All web components (ESM bundle) |
```

**Add two rows**, after Ada's two:

```markdown
| `@3fn/core/jest-preset` | Jest preset for testing your own web components (see Running Component Tests) |
| `@3fn/core/testing` | Test helpers for web components (see Running Component Tests, which says what does not work in this version) |
```

Ledger

| Claim | Source |
|---|---|
| Both subpaths are exported | **V** `package.json` `exports`: `./jest-preset` → `./dist/testing/jest-preset.js` (require only); `./testing` → `./dist/testing/index.js` |
| Both files ship | **V** `npm pack --ignore-scripts --dry-run --json`: `dist/testing/jest-preset.js`, `dist/testing/index.js`, `dist/testing/style-mock.js` present |
| "All 34 web components": true today, so the count is dropped only because it rots | **V** 34 distinct `customElements.define(...)` tags in `src/components/core/*/platforms/web/*.ts` (grep); the bundle `dist/browser/designerpunk.esm.js` carries 35 `define` calls (one is a guard or helper; I did not trace it) |
| The `./testing` row's pointer to the status note | **D** on § 5: if the preset fix lands first, drop the parenthetical clause |

---

## 8. `## CLI Commands` (L1074–1081) — **corrected**

Reason:
- The table lists 4 of the 11 commands `--help` prints.
- The three `mcp:*` rows imply the user starts the servers (Leonardo's flag).
- The five lifecycle verbs must carry `vocabulary.ts`'s descriptions: the pending test `cli-commands-table-uses-vocabulary` (`scripts/__tests__/install-doc.test.ts:552`) flips to green when every `npx designerpunk init|generate|sync|validate|attach` row contains its `LIFECYCLE_VERBS` description (`cliTableDrift`, L245-254). I kept every flag inside the row for the verb, so no flag-only row can fail it.

**Replace L1076–1081** (the whole table) **with:**

```markdown
| Command | What It Does |
|---------|-------------|
| `npx designerpunk init` | the birth event — runs once per design system, ever. `--target=<cc\|kiro>` picks the harness. |
| `npx designerpunk generate` | the pipeline — run on every token change. `--force` regenerates product tokens even if unchanged; `--product-only` skips the system tokens. |
| `npx designerpunk sync` | reports package updates against the installed package — reports, never writes silently. `--dry-run` reports only; `--apply` applies without the confirmation; `--overwrite <path>` and `--restore <path>` apply one conflict or one deleted file; `--migrate-legacy` removes what an earlier `init` copied and attaches the generated agent layer. |
| `npx designerpunk validate` | validates token definitions against the active source. `--product-tokens` validates product token references against `token-index/`. |
| `npx designerpunk attach --target=<cc\|kiro>` | attach a harness (agents + MCP config + approvals), for one target. `--reference` writes only the MCP config and approvals, no agents. |
| `npx designerpunk mcp:app` | Start the Application MCP server by hand (component and token queries). Your agent tool normally starts it. |
| `npx designerpunk mcp:docs` | Start the Docs MCP server by hand (steering doc queries). Your agent tool normally starts it. |
| `npx designerpunk mcp:product` | Start the Product MCP server by hand (screen specs, domain objects, product architecture). Your agent tool normally starts it. |
| `npx designerpunk figma:push` | Push tokens to Figma (requires Figma Desktop + Console MCP). |
| `npx designerpunk figma:extract` | Extract design specs from Figma. |
| `npx designerpunk --help` | Show the command list. |
```

Ledger

| Claim | Source |
|---|---|
| The eleven commands, and nothing else | **V** `src/cli/designerpunk.ts:45-87` (dispatch) and `:497-517` (`printHelp`) |
| The five lifecycle descriptions, word for word | **V** `src/cli/shared/vocabulary.ts:50-56` (`LIFECYCLE_VERBS`), `:34-36` (`attachUsage()`) |
| `init`: `--target=<t>`; bare `init` = the declared default | **V** `src/cli/init.ts:111-122,381-393` (`parseInitArgs`) |
| `generate`: `--force`, `--product-only` | **V** `src/cli/designerpunk.ts:48-52` |
| `--force` regenerates product tokens only | **V** `designerpunk.ts:286-297`; Ada's row 4 |
| `sync` flags: `--dry-run`, `--apply`, `--overwrite <path>`, `--restore <path>`, `--migrate-legacy` | **V** `src/cli/sync/index.ts:214-232` (`parseSyncArgs`); `src/cli/sync/Reporter.ts:46` (`RETIRED_FORCE_MESSAGE` names all three), `:108` (conflicts: `--overwrite <path>`) |
| `--migrate-legacy`'s effect | **V** `src/cli/designerpunk.ts` help line (`sync --migrate-legacy  Remove an earlier init's copied agents/steering/governance, then attach a harness (…) in the same run`); the guide's own L111 and the dated note say the same |
| `validate --product-tokens` | **V** `src/cli/designerpunk.ts:92-100` (`runValidateCommand`), help L513 |
| `attach --reference` | **V** `src/cli/attach.ts:344-353` |
| `mcp:*` rows | **V** § 1 ledger |
| figma rows | **V** help text (`designerpunk.ts` help: "Push tokens to Figma (requires Figma Desktop + Console MCP)", "Extract design specs from Figma") |

Escaped pipes (`<cc\|kiro>`) are required inside a table cell. `cliTableDrift`'s regex (`[^`]*` between backticks) accepts them.

---

## 9. `## Upgrading` (L1153–1208) — **corrected**; `### OKLCH Color Migration (v12+)` **removed** (Ada's row)

Reason: the body describes the pre-15.0.0 `sync`, which the dated note above it says was retired. The new `sync` does not touch tokens or components, has no conflict prompt, has no `--accept-all`, and does not treat steering as a "governance auto-apply" tier. The note is #268's Site 3 (ballot L188-209), so its three facts are carried into the body below; **the note and its last line "Spec 123 Task 19.4 reconciles this section" go with the reconciliation** (a preservation-table row for you, Thurgood).

**Replace L1155–L1208** (the dated note through the end of CI/CD Integration) **with:**

````markdown
After upgrading `@3fn/core` to a new version, run `sync`. It prints a report of everything DesignerPunk manages in your repo, compared with the installed package, before it changes anything:

```bash
# Report only (no modifications)
npx designerpunk sync --dry-run

# On a terminal: the report, then one confirmation
npx designerpunk sync

# Off a terminal (for example CI): the report, then apply without a prompt
npx designerpunk sync --apply
```

Coming from 14.x: follow the 15.0.0 release notes. `sync` converts the old `.kiro/sync-manifest.json` to `designerpunk.manifest.json`, and `sync --migrate-legacy --target=<cc|kiro>` removes what an earlier `init` copied and attaches the generated agent layer, in the same run.

### How Sync Works

1. Reads `designerpunk.manifest.json` at your repo root: what DesignerPunk wrote into your repo, and at which version.
2. Generates DesignerPunk's side of what it manages, for each target you have attached (the generated agent files, the managed region in `CLAUDE.md`, and DesignerPunk's own keys in your MCP configuration), and compares it with your files by content hash.
3. Classifies each item: **new**, **updated** (the package changed and you did not), **conflict** (you edited it), **deleted by you**, **removed from the package**, **never recorded**, or **unchanged**.
4. Prints the report. Nothing is written until you confirm on a terminal or pass `--apply`.
5. Updates the manifest. Commit it: it is the baseline your teammates' `sync` compares against.

`sync` never writes your token source (`src/tokens`) or your own components. When an updated component needs a token your set does not have, it tells you (section 5) and you decide.

### Conflict Resolution

A file you edited that also changed in the package is a **conflict**. `sync` never overwrites it. The report lists it, and you choose per path:
- keep your version: do nothing
- replace it with the package version: `npx designerpunk sync --overwrite <path>`

A file you deleted that DesignerPunk generated earlier is reported, and comes back only with `npx designerpunk sync --restore <path>`. `--accept-all` and `--force` are retired: `sync` prints a message that points to `--apply`.

### .designerpunkignore

To permanently exclude files from sync (files you have intentionally customized), list them in `.designerpunkignore`, which `init` creates. It uses `.gitignore` syntax:

```gitignore
# .designerpunkignore — uses .gitignore syntax
.claude/agents/ada.md
.kiro/agents/ada.json
```

Agents you write yourself are never managed and need no entry.

### CI/CD Integration

Off a terminal, `sync` reports and writes nothing unless you pass `--apply`:

```bash
npx designerpunk sync --apply  # Applies the updates without prompting. Conflicts and deleted files still need --overwrite <path> and --restore <path>.
```
````

**Remove L1210–1220** (`### OKLCH Color Migration (v12+)`), as in `ada.md` § 6.

Ledger

| Claim | Source |
|---|---|
| The report comes first; off a terminal nothing is written without `--apply`; on a terminal, one confirmation | **V** `src/cli/sync/index.ts:21-23` (header), `:511-530` (`!options.apply` → off-TTY message or one `confirm`); `src/cli/sync/Reporter.ts:42-43` (`OFF_TTY_REPORT_ONLY_MESSAGE`: "not a terminal and --apply was not given — reported only; nothing was changed. Re-run with --apply …") |
| The three invocations | **V** `src/cli/sync/index.ts:214-232` (`--dry-run`, `--apply`); help `designerpunk.ts:504-507` |
| `--dry-run` writes nothing on any terminal | **V** `src/cli/sync/index.ts:444` (`if (options.dryRun) return …`); `:124-125` (comment: "Report only; never write (any TTY state)") |
| The old manifest is converted; `--migrate-legacy --target` | **V** `src/cli/sync/Manifest.ts` (`convertLegacyManifest`, `LEGACY_MANIFEST_PATH`) imported at `sync/index.ts:44-53`; `parseSyncArgs` `:228-230`; the dated note and guide L111 say the same (#268 Site 3) |
| `designerpunk.manifest.json` at the repo root, its role | **V** `src/cli/init.ts:331-337`; `design.md` L346-348 (C7 manifest path: "moved beside the config") |
| Managed set: generated agent files, `CLAUDE.md` region, MCP keys, for `attachedTargets` | **V** `src/cli/sync/index.ts:4-19` (header), `:651-706` (`classifyGenerated`) |
| Content-hash comparison | **V** `src/cli/sync/index.ts:661-669` (`hashBuffer` per file) |
| Seven classes | **V** `src/cli/sync/Classifier.ts:36-44` (`new`, `updated-safe`, `conflict`, `unchanged`, `removed`, `deleted-by-you`, `untracked-new`) |
| Tokens and own components are never written | **V** `src/cli/sync/index.ts:4-9` (header: "The token tier (`src/tokens`), `src/types` and the pre-123 component copies are NOT managed … never written (Req 5.8)") |
| The missing-token report | **V** `src/cli/sync/NameContract.ts:58-70`; asserted against the guide's § 5 by `install-doc.test.ts:484-496` |
| No conflict prompt; `--overwrite <path>` applies a conflict; `--restore <path>` a deleted file | **V** `src/cli/sync/index.ts:500-501` (`conflict` applies only when `overwrite.has`; `deleted-by-you` only when `restore.has`); `Reporter.ts:108`, `:21`; `resolveConflicts` is defined in `Prompter.ts:22` and is not called from `sync/index.ts` (grep) |
| `--accept-all`/`--force` retired, message points at `--apply` | **V** `src/cli/sync/index.ts:220,266`; `Reporter.ts:45-46` |
| `.designerpunkignore` read by `sync`, `.gitignore` syntax, created by `init` | **V** `src/cli/sync/IgnoreFilter.ts:2,15-18`; `src/cli/init.ts:310-329` (the two example lines are `init`'s own comment lines, L316-318; "Agents you write yourself are never managed" is L319) |

What I did **not** change: the `.designerpunkignore` section keeps its idea; only the example paths change (the old `src/tokens/MyCustomTokens.ts` is a path `sync` never touches).

**D**: nothing in this section is design-only. It describes what `sync` does today. The `.gitignore` block and its offer (Task 20.2) are **not** mentioned here, so this text does not depend on them; if Peter wants the offer in the Upgrading text, that is a later addition, not part of this sweep.

---

## 10. `## Knowledge Base Setup` (L1085–1095) — **corrected**; retitle

Reason: the section is for Kiro CLI's `/knowledge` and says so only in its first sentence. The third row's include (`**/*.ts`) matches nothing: the package ships only YAML, Swift and Kotlin under `src/components/core`.

**Retitle** L1085 to `## Knowledge Base Setup (Kiro CLI)`.

**Replace the third table row (L1093)** with:

```markdown
| designerpunk-application | `node_modules/@3fn/core/src/components/core` | `**/*.yaml` | Component schemas, contracts and metadata |
```

Keep L1087 and the first two rows (they are the reader's own `./src` and `./specs` or `./screens`). Keep L1095.

Ledger

| Claim | Source |
|---|---|
| The package ships only YAML (schema, contracts, meta), Swift and Kotlin under `src/components/core` | **V** `package.json` `files` L57 and L77-82; `npm pack --ignore-scripts --dry-run --json`: no `.ts` under `src/components/core` (e.g. `…/Button-CTA/platforms/web/ButtonCTA.web.ts` absent) |
| `/knowledge` is Kiro CLI's | **U**: taken from the section's own first sentence; I did not check Kiro's documentation |

---

## 11. Overlaps with `ada.md` and `leonardo.md`; flags for other owners

**No contradictions found.** Overlaps, each already agreeing:
- Ada § 4 (Generate options) and my § 8 `generate`/`--force` wording say the same thing.
- Ada § 7 adds `@3fn/core/types` and `@3fn/core/build`; my § 7 adds `jest-preset` and `testing`. Together: four new rows.
- Ada § 10 handed me the CLI Commands table; § 8 above takes it.
- Ada § 6 removes the OKLCH migration section; I concur with her reasons (the retired flow, unsupported native, and the product-token claim). My § 9 relies on it.
- Leonardo's "Starting the Product MCP" and my § 1 agree: the agent tool starts the servers; `mcp:product` is the by-hand verb; `--reference` never writes the product server (`attach.ts:344-353`). My § 2 and § 8 use the same facts.
- Leonardo's text names `attach` "without `--reference`" configuring the Product MCP: matches my § 2 ("Both configure all three servers … With `--reference`, only docs and application").

**For Thurgood (unassigned content I found):**
- `### 1. Install` (L253–266) still teaches GitHub Packages (`@designerpunk:registry=https://npm.pkg.github.com`, `GITHUB_TOKEN`). It contradicts the region (L30: public npm, no `.npmrc`, no token) and `src/cli/init.ts:176-179` ("No .npmrc scaffold"). Removed, by the widened grep's own terms.
- `### 7. Build Your Product` (L562–614) duplicates § Platforms › Web, iOS and Android; Kenya, Data and Sparky own the reconciliation.
- `## MCP Query Reference` (L1099–1149), besides Leonardo's two missing Product tools: the Application table lists 17 of the 21 registered tools (missing `get_color_strategy`, `get_design_guidance`, `get_design_philosophy`, `get_design_rules`), and the Docs table omits `validate_metadata` and `get_health_status`. **V** names from `grep "name: '…'"` over `application-mcp-server/src/index.ts` and `mcp-server/src/index.ts`; I counted, I did not read each tool's schema.
- `### 7. Build Your Product` and `## Upgrading` are both named in #268's preservation sites (Site 1, Site 3). My § 9 carries Site 3's three facts into the body; § 6's removal leaves the M0b target-model section the ballot said to leave for 19.4.

**For Ada:** `.kiro/settings/mcp.json:38` (the steward repo's own Kiro dev config, tracked) still approves `validate_component`; filed in `.kiro/issues/2026-10-03-mcp-auto-approve-names-unregistered-tool.md`. It is not part of this sweep.

**Defect to file, mine to route (not a guide edit):** § 5's preset defect (four mapped paths unshipped; `./testing` does not re-export the validators). I recommend filing it as one issue with owner Lina (the component-test surface), Ada for any `package.json` `files` change, and trigger "the first Task 19.4 or release-3 PR that ships a text about `@3fn/core/testing`, or a `fix/` PR on Peter's go". I have not filed it, since you asked for a read-only pass.

**Install region (L21–250) re-read for CLI / sync / testing claims**

I checked every command, flag and sync statement:

| Claim (guide line) | Source | Result |
|---|---|---|
| `attach --target=<cc\|kiro> --reference` writes MCP config and approvals, no agents (L53, L56) | `src/cli/attach.ts:344-353` | **V** |
| Docs server reads `node_modules/@3fn/core/governance` (L56) | template `MCP_STEERING_DIR` | **V** |
| `init --target=<cc\|kiro>` generates agent layer and MCP config for the target (L70, L75) | `src/cli/init.ts:111-122,239-262` | **V** |
| `init` copies the token source and writes `designerpunk.config.ts` (L75) | `src/cli/init.ts:181-214` | **V** |
| `generate` writes the listed files and `token-index/` at the root (L92–100) | `designerpunk.ts:268`; Ada's § 4 | **V** |
| `validate` description (L90) | `vocabulary.ts:52-55`; asserted by `install-doc.test.ts:473-475` | **V** |
| The three update-lifecycle verbs (L102–105) | `vocabulary.ts`; same test | **V** |
| `sync` "changes DesignerPunk's MCP configuration and generated agent files only on your go" (L104) | `src/cli/sync/index.ts:511-530` | **V** |
| `sync` converts the old manifest; `--migrate-legacy --target` (L111) | § 9 ledger | **V** |
| § 5 message text (L184) | `src/cli/sync/NameContract.ts:58-70`; `install-doc.test.ts:484-496` | **V**, byte-equal by test |
| § 6: agent files live in a self-labelled managed region (L193) | `src/cli/sync/RegionGrain.ts`; `attach.ts:275-280` | **V** |
| § 7: `init` refuses in a repo that already has a design system and prints the joining steps; `init --re-scaffold` previews what it would re-add (L207) | `src/cli/init.ts:127-158` (refusal, preview and confirmation) and `shared/errorCatalog.ts:96-103` | **V** |
| § 7 "`generate` creates it" (the personal note, L214, L225) | `design.md` L799 (C26) | **D**: no source writes `.designerpunk/personal-note.local.md` at this commit (Task 22.1 builds it; the same clause is in `errorCatalog.ts:98`, which the task file records as false at 15.0.0 and made true at 22) |
| § 8 "the CI-needs starter spec, which `init` places in your repo's `specs/`" (L239) | `tasks.md` Task 21.3 | **D**: `init` creates no `specs/` at this commit |
| § 9 "put your version in your repo's `src/components/` under the component's name. Yours wins on its name" (L245) | `application-mcp-server/src/indexer/ComponentIndexer.ts:172-181` | **Error (small)**: precedence keys on the **declared** name (the `component:` field of `contracts.yaml`, or the schema `name:`), "never the directory name"; "under the component's name" reads as the folder name. Minimal replacement for L245's first sentence: `**To own one component**, put your version in your repo's \`src/components/\`, declaring the component's name (the \`component:\` field of its \`contracts.yaml\`).` Then "Yours wins on its name, and every other component continues to come from the package" stands (**V** `ComponentIndexer.ts:178-181`; `mcpDataRoots.ts:183-205`). This is the Application MCP's catalog; the web bundle `@3fn/core` still registers the package's element tags. |
| Prerequisites: "Node.js 18+ (22+ recommended)", "npm 9+" (L29–30) | `package.json` has no `engines` field | **U**: nothing in the repo states either minimum (also Ada's note) |
| Testing claims in the region | none | none made; the region does not mention the test preset |

Nothing else in the region is an error on the CLI, sync, MCP-configuration or testing axes.

---

## 12. Unverifieds, in one place

- **U**: whether Jest actually fails in a packed install (§ 5). The four missing mapped files are V.
- **U**: the exact stderr text of each `mcp:*` verb beyond what `designerpunk.ts:350-410` prints; I did not run them.
- **U**: Kiro's `/knowledge` behaviour (§ 10); that Kiro ignores an auto-approve entry naming no tool (reasoned, not run).
- **U**: Node 18+/npm 9+ (§ 11).
- **U**: the `dist/browser` bundle's 35th `define` (§ 7).
- **D**: region L214/L225 (22.1) and L239 (21.3); nothing else in my rows depends on a later subtask.
