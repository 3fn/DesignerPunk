# Consumer-Runtime-TS-Resolution Audit (Task 9.5)

**Date**: 2026-06-25 · **Spec**: 118 — Module-Resolution Coherence · **Task**: 9.5
**Agent**: Ada · **Tier**: 3 investigation — NO code changed, nothing marked done.
**Standard governing this audit** (Peter, 2026-06-25): define the IDEAL target architecture FIRST, justify every intermediate against it; a half-measure is acceptable ONLY as a guard-certified coherent intermediate on a *mapped* path to the ideal (CJS→ESM model). Sections (a)/(b)/(c) are FACTS (file:line, independently verifiable). Section (d) is my PROPOSAL for the main loop to develop into Peter's decision.

**Grep/audit method (so completeness is checkable)**:
- TS-runtime loaders: `grep -rn "tsx/cjs|ts-node/register|cjs/api|resolveTsRunner|\.register(" src bin scripts` (minus registry/component noise).
- Dynamic module loads: `grep -rn "require(|await import(| import(" src/cli src/config src/generators --include=*.ts` (minus `__tests__`, `import type`, comments) — the completeness grep is pasted in §(a.4).
- `__dirname` set: `grep -rn "__dirname|__filename|require.main|require.resolve" src/cli src/config src/generators src/validators scripts`.
- Consumer-path loads specifically: confirmed the only runtime loads keyed on consumer-supplied paths (`config.tokenSourceRoot`, `componentTokenDirs`, `configPath`) are the three sites in §(a).
- Cross-checked against `package.json` `files`/`exports`/`bin`/`scripts`, `tsconfig.json` `outDir`/`rootDir`, `bin/designerpunk.js`, and the Increment-1/entry-point/direction-decision findings (each re-verified, not absorbed).

> **Seed correction (re-verified, not absorbed)**: `entry-point-inventory.md` says "13 ts-node scripts." **ts-node is now fully retired** — `grep -n ts-node package.json` returns nothing; all 13 scripts run under `tsx` (`package.json:119-153`), and `resolveTsRunner()` (`designerpunk.ts:314`) has the ts-node fallback pruned. Increment 3a's committed scope (one runtime mechanism = tsx) is DONE. That part of the seed survey is stale; this audit supersedes it.

---

## (a) Complete runtime-TS-resolution site inventory

The package resolves TypeScript at runtime in exactly **three functional classes**. I split each row by **what it loads** (package's OWN `.ts` vs the CONSUMER's `.ts`), **how**, **which mode**, and **which entry point reaches it**.

### Class 1 — CONSUMER `.ts` loads (the irreducible runtime-TS need)

These are the only sites that resolve a **consumer-supplied path**. They are the heart of the discovery.

| # | Site (file:line) | Loads | How | Mode | Reached by |
|---|---|---|---|---|---|
| 1 | `src/config/ConfigLoader.ts:78` (`defaultConfigModuleLoader`) | CONSUMER's `designerpunk.config.ts` | **Scoped tsx** — `tsx/cjs/api` `register({namespace})` + scoped `require` + `unregister()` in `finally` (Approach A, Inc-1) | both (config is optional; defaults if absent) | `generate`, `validate`, `validate --product-tokens`, `runProductOnly`, `sync`(indirect), and the build script `generate-platform-tokens.ts` (which injects the ambient loader instead) |
| 2 | `src/cli/resolveTokens.ts:30-31` (+ `:46,:77` in `verifyBarrelContract`) | CONSUMER's token barrel — `<tokenSourceRoot>` and `<tokenSourceRoot>/semantic` | **Bare `require()`** — relies on a globally-registered ambient `.ts` loader | **local** mode loads consumer `src/tokens`; **package** mode loads the *package's own* `src/tokens` (via `__dirname`, see §b) | `generate`, `validate`, build script |
| 3 | `src/cli/loadComponentTokens.ts:43,71` | CONSUMER's component token `.ts` — `<tokenSourceRoot>/component/*.ts` and each `componentTokenDirs` entry's `*.tokens.ts`/`tokens.ts` | **Bare `require()`** (side-effect: triggers `defineComponentTokens()`) | both — Spec 117 R4 deliberately drives this off **source presence**, NOT mode (the bug-origin gate is gone) | `generate`, build script |

**Why these resolve at all**: sites 2 and 3 do plain `require('<path-to-a-.ts-file>')`. That only works because **the bin's global `require('tsx/cjs/api').register()`** (`bin/designerpunk.js:42`) has installed a process-global `.ts` resolver before the CLI runs. Site 1 is the one consumer-load that does NOT depend on the global register — Increment 1 gave it its own *scoped* register/unregister (Approach A). **Sites 2 and 3 are the still-unscoped consumer loads** — they are exactly what makes the bin's bare global register load-bearing, and exactly what re-broke when Ada tried to bundle/de-register the CLI this session.

### Class 2 — Package's OWN `.ts` loads (lazy `require` of package-relative modules)

These load the package's own source; they also depend on an ambient `.ts` loader being live, but they are NOT consumer-facing. Found via the completeness grep (§a.4).

| Site (file:line) | Loads (package's own) | How |
|---|---|---|
| `src/generators/generateTokenFiles.ts:299` | `./DTCGFormatGenerator` | lazy `require` |
| `src/generators/generateTokenFiles.ts:312` | `./transformers/FigmaTransformer` | lazy `require` |
| `src/generators/TokenFileGenerator.ts:1420-1422` | `../tokens/FontSizeTokens`, `../tokens/LineHeightTokens`, `../tokens/semantic/IconTokens` | lazy `require` |
| `src/generators/TokenFileGenerator.ts:1465-1467` | `../build/platforms/{Web,iOS,Android}Builder` | lazy `require` |

These resolve under whichever ambient loader hosts the process (the bin's global tsx in CLI mode; the `tsx <script>` ambient hook in build mode). They are package-internal — bundling the CLI would resolve them at build time and they would cease to be runtime loads.

### Class 3 — Entry points / runner mechanisms (HOW the above get a loader)

| # | Entry point (file:line) | Mechanism | What it executes |
|---|---|---|---|
| E1 | `bin/designerpunk.js:42-43` (prod CLI, `npx designerpunk`) | **global `tsx/cjs/api` register()** then `require('../src/cli/designerpunk.ts').__main()` | the CLI's OWN raw `.ts` **and** (transitively) the consumer `.ts` of Class-1 sites 2/3 and Class-2 lazy requires |
| E2 | `package.json:119-153` — 13 `tsx <script>` scripts (incl. `generate:platform-tokens`, `generate:types`, `build:validate`, `figma:*`, `release:*`) | **`tsx` ambient hook** (per-process, from the `tsx` shebang/invocation) | package's OWN scripts; `generate-platform-tokens.ts` additionally reaches Class-1 sites via the injected-ambient-loader seam (`loadConfig(cwd, (p)=>import(p))`, line 58) |
| E3 | `src/cli/designerpunk.ts:288-322` — `spawnServer` → `resolveTsRunner()` | for **bundled** servers spawns `node dist/mcp/*.js`; the TS branch (`runner='tsx'`) exists but is currently only reachable if a non-bundled server were passed — all three `runMcp*` pass `bundled:true` | MCP server bundles (EXEMPT, R12) — NOT a consumer-`.ts` path |
| E4 | `src/cli/designerpunk.ts:324-348` — `runFigmaCommand` | spawns `node dist/cli/figma-*.js` (compiled JS) | figma CLI reads JSON/text (`readFileSync` + regex on the config), NO `.ts` module load — see §a.3 |
| E5 | tests — ts-jest (`src/testing/jest-preset.ts`) | ts-jest transform under jest's module system | GOVERNED but jest-internal; the consumer guard must run as a **subprocess** precisely because in-process jest gives false-green |
| — | 3 MCP servers + browser bundle | esbuild `--bundle` (build-time resolution) | **EXEMPT (R12)** — no runtime TS resolution; see exemption-boundary finding |

### (a.1) Per-entry-point: which consumer/package `.ts` each reaches

- **`npx designerpunk generate`** (E1 → `runGenerate`, `designerpunk.ts:105`): `loadConfig` (site 1) → `resolveTokens` (site 2) → `loadComponentTokens` (site 3) → Class-2 generator lazy requires. **All three consumer-load classes fire on the documented CLI path.** This is the path the consumer guard exercises.
- **`npx designerpunk validate`** (E1 → `runValidate`, `validate.ts:27`): `loadConfig` (1) → `resolveTokens` (2). NOT `loadComponentTokens`.
- **`npx designerpunk validate --product-tokens`** (`validateProductTokens.ts:14`): `loadConfig` (1) only; product tokens are **YAML** (`ProductTokenGenerator` reads `*.yaml` via `js-yaml`, `ProductTokenGenerator.ts:78,119`) — NO consumer `.ts`.
- **`npx designerpunk generate --product-only`** (`runProductOnly`, `designerpunk.ts:187`): `loadConfig` (1) only; product pipeline is YAML.
- **`generate:platform-tokens` build script** (E2): `loadConfig` (injected ambient loader) → `loadComponentTokens` → `resolveTokens` → generators. Same three classes, but run in the **package's own repo** so the "consumer" is the package itself.
- **`init`** (`init.ts`): loads NO `.ts` at runtime — it is a file-copier (see §c). The one `require` in init (`init.ts:121`) is text inside a generated `jest.config.js` string, not a runtime load.
- **`sync`** (`src/cli/sync/*`): no consumer `.ts` module load — operates on files as text/diffs (`Applier.ts:36` inspects `.ts` by extension string; `Prompter.ts:98` `require('diff')` is a dep).
- **`figma:push`/`figma:extract`**: spawn compiled `dist/cli/figma-*.js`; read DTCG JSON + regex-scrape `designerpunk.config.ts` as **text** (`figma-push.ts:111-127`) — NO `.ts` module load.
- **`mcp:app`/`mcp:docs`/`mcp:product`**: spawn `node dist/mcp/*.js` bundles — EXEMPT.
- **`staleness`** (`staleness.ts`): mtime comparison on YAML + output files — no module load.

### (a.2) Completeness claim

The consumer-`.ts`-load surface is **exactly three sites** (ConfigLoader:78, resolveTokens:30/31/46/77, loadComponentTokens:43/71). I verified this two ways: (1) those are the only `require`/`import` calls keyed on a consumer-supplied path variable (`tokenSourceRoot`, `componentTokenDirs`, `configPath`); (2) the full `require(`/`import(` grep across `src/cli`+`src/config`+`src/generators` (§a.4) contains no other path-variable load — every remaining hit is either a node builtin (`require('fs')`), a dependency (`require('diff')`, `require('tsx/cjs/api')`), a package-relative own-module (Class 2), an `import type`, or text inside a generated string.

### (a.3) Site count

- **Consumer-`.ts` runtime-resolution sites: 3** (across 7 `require`/`register` call-lines).
- **Package-own lazy `.ts` `require` sites: 7 call-lines / 2 files** (Class 2).
- **Entry-point mechanisms: 5 governed (E1, E2, E3-TS-branch, E5; E4 is JS-spawn) + 4 exempt (3 MCP + browser).**

### (a.4) Completeness grep (pasted for checkability)

```
src/cli/init.ts:121            require('@3fn/core/jest-preset')   # text in generated jest.config string — NOT a load
src/cli/resolveTokens.ts:30,31,46,77   require(sourcePath[/semantic]) # CONSUMER load (site 2)
src/cli/loadComponentTokens.ts:43,71   require(componentSubdir/file|fullPath) # CONSUMER load (site 3)
src/cli/designerpunk.ts:84,329  require('fs')                     # builtin
src/config/ConfigLoader.ts:68   require('tsx/cjs/api')            # the loader dep
src/config/ConfigLoader.ts:78   unregister.require(configPath)    # CONSUMER config load (site 1)
src/cli/sync/Prompter.ts:98     require('diff')                   # dep
src/generators/generateTokenFiles.ts:299,312  require('./...')     # package-own (Class 2)
src/generators/TokenFileGenerator.ts:1420-1467 require('../...')    # package-own (Class 2)
```

---

## (b) Complete `__dirname` / module-relative assumption audit

Every `__dirname`/`__filename`/`require.main`/`require.resolve`/cwd-relative path in the runtime CLI/loader/generate/validate path. Method grep in header. I split **runtime-path** (breaks the discovery) from **build/dev-only** (lower blast radius) and flag what each resolves to today vs under compile-to-dist / bundle / relocation.

### (b.1) Runtime-path `__dirname` sites (the ones that matter for the discovery)

| # | Site (file:line) | Resolves today | Today's value (CLI runs from `src/`) | If module moved to `dist/` or bundled | Correct? |
|---|---|---|---|---|---|
| B1 | `src/config/ConfigLoader.ts:126` — `path.resolve(__dirname, '../tokens')` | package-mode token source root | `<pkg>/src/config` → `<pkg>/src/tokens` ✅ | `dist/config` → `<pkg>/dist/tokens` (no raw `.ts` there) → **package-mode "Token source not found"** | only under raw-`src/` execution |
| B2 | `src/generators/generateTokenIndex.ts:119` — `path.resolve(__dirname, '..', 'components', 'core')` | dir scanned by `buildConsumerMap` for `*.schema.yaml` (token→component consumer map) | `<pkg>/src/generators` → `<pkg>/src/components/core` ✅ | bundled CLI: `__dirname` collapses to `dist/cli` (or bundle dir) → wrong dir → **empty consumer map** (this is the Spec 117 R4-class silent-zeroing Ada hit) | only under raw-`src/` execution; **also blind to consumer-added components** (always reads the *package's* schemas, never `<consumer>/src/components`) |
| B3 | `src/cli/designerpunk.ts:80-88` — `resolvePackageRoot()` = `path.resolve(__dirname, '../..')` + `package.json` existence check, else `process.cwd()` | package root for MCP-server bundle paths + data dirs | `<pkg>/src/cli` → `<pkg>` ✅ | bundled to `dist/cli`: `../..` from `dist/cli` = `<pkg>` ✅ (still has package.json) — **this one survives relocation** because it self-checks for `package.json` and falls back to cwd | **most robust pattern in the codebase** — candidate single source of truth (see §d) |
| B4 | `src/cli/init.ts:219-225` — `resolvePackageRoot()` (duplicate of B3) | package root for the file-copy source | `<pkg>/src/cli` → `<pkg>` ✅ | same as B3 — survives, self-checking | robust, but **duplicated** logic (B3 + B4 are copy-paste) |
| B5 | `src/config/ConfigLoader.ts:78` — `unregister.require(configPath, __filename)` | the `fromFile` anchor for tsx scoped require | `<pkg>/src/config/ConfigLoader.ts` | shifts to `dist/config/ConfigLoader.js`; tsx scoped require's anchor must still resolve the **consumer's** absolute `configPath` (which is cwd-derived, not `__dirname`-derived) — **likely unaffected** since `configPath` is absolute from cwd | low risk; flag for guard |
| B6 | `src/cli/designerpunk.ts:316` — `require.resolve('tsx')` | proves tsx is installed (runner gate) | resolves from CLI module location | resolution base shifts with the module but tsx is a top-level dep — resolvable from any package location | low risk |

### (b.2) Build/dev-path `__dirname` sites (lower blast radius — run only in the package's own repo, not consumer)

| Site | Resolves | Risk |
|---|---|---|
| `src/generators/DTCGFormatGenerator.ts:227` — `__dirname, '../../package.json'` | reads own version | `src/generators`→`<pkg>/package.json` ✅; bundled would shift but it's `try/catch` with `'unknown'` fallback — **degrades gracefully** |
| `src/validators/ModeParity.ts:57` — `__dirname, '../tokens/themes/dark/SemanticOverrides.ts'` | audit reads theme file text | dev-audit only (`audit:mode-parity`), package-repo only |
| `scripts/extract-component-meta.ts:18-20`, `scripts/build-browser-bundles.js:256`, `scripts/*.js` | steering/components/demos dirs | build/dev scripts, package-repo only, never consumer runtime |
| `require.main === module` guards: `figma-extract.ts:326`, `figma-push.ts:283`, `buildValidation.ts:168`, `ModeParity.ts:115` | direct-exec guards | benign; bin uses `__main()` precisely to bypass require.main fragility (`bin/designerpunk.js` doc) |
| `src/cli/sync/PackageResolver.ts:21-23` — `require.resolve('@3fn/core/package.json', {paths:[projectRoot]})` | locates installed package from consumer | **correct by design** (cwd/projectRoot-scoped, not `__dirname`) — the right pattern |

### (b.3) `__dirname` count

- **Runtime-path sites that break under compile-to-dist/bundle/relocation: 2 hard (B1, B2)** + **2 robust-but-duplicated (B3, B4)** + **2 low-risk (B5, B6)** = **6 runtime-path sites**.
- **The two that silently mis-resolve (no error, wrong data): B1 (package-mode token source — errors loudly) and B2 (consumer map — silently empty).** B2 is the dangerous one: it zeroes data without failing. This is the Spec 117 R4 class.
- Build/dev-only sites: ~9 more, all package-repo-scoped, none on the consumer runtime path.

**The core `__dirname` finding**: the runtime path is correct **only because the CLI executes from raw `src/` via the bin's tsx register.** Every `__dirname` site assumes "I am running from `src/`." The moment the CLI is compiled-and-run-from-`dist` or bundled, B1 and B2 mis-resolve — B1 loudly, B2 silently. **B3/B4 already demonstrate the robust pattern** (`resolvePackageRoot()` self-checks for `package.json` and falls back to cwd), so a fix has a proven in-repo shape.

---

## (c) The consumer contract — `init` (read fully: `src/cli/init.ts`)

### What `init` sets up

`init` is a **file-copier**, not a code-loader (it loads no `.ts` at runtime). It copies, from `resolvePackageRoot()` (the installed package) into the consumer's cwd:

| Step (init.ts) | Copies (package → consumer) | Form | Transform |
|---|---|---|---|
| 56-61 | `src/types` → `<dest>/src/types` | raw `.ts` | none (so `../types` resolves naturally for tokens) |
| 64-69 | `src/tokens` (excl. `component`) → `<dest>/src/tokens` | raw `.ts` | none |
| 72-77 | `src/tokens/component` → `<dest>/src/tokens/component` | raw `.ts` | `rewriteBuildImports` (`../build/tokens` → `@3fn/core/build`) |
| 80-87 | `src/components/core` → `<dest>/src/components/core` | raw `.ts` | `rewriteBuildImports` |
| 49-53 | generates `designerpunk.config.ts` with `tokenSource: './src/tokens'`, `componentTokens: ['./src/components/core','./src/tokens/component']` | raw `.ts` | — |
| 90-150 | `product/overview.yaml`, agents, steering, `mcp.json`, `jest.config.js`, `tsconfig.test.json`, `.designerpunkignore` | yaml/json/js | — |

### Local mode vs package mode — what the consumer ends up loading at `generate` time

- **Local mode** (consumer ran `init`, so `tokenSource` is set in their generated config): `loadConfig` sets `tokenSourceMode='local'`, `tokenSourceRoot = <consumer>/src/tokens` (resolved from `configDir`, `ConfigLoader.ts:124-125`). `generate` then **`require()`s the consumer's raw `.ts`** — token barrel (site 2), `semantic/` barrel, and component token files under `<consumer>/src/tokens/component` + `<consumer>/src/components/core` (site 3). **This is the authoring model: the consumer owns and edits raw `.ts` token/component source, and the CLI loads it live via the bin's tsx register.** `init.ts:176-178` makes it explicit: *"Edit src/tokens/ to change base values… Run generate after changes."*
- **Package mode** (no `tokenSource` in config / no config at all): `tokenSourceRoot = path.resolve(__dirname,'../tokens')` = the **package's own** `src/tokens` (B1). Component tokens load from the package's own `src/tokens/component` if `componentTokenDirs` point there. The consumer gets DesignerPunk's defaults without copying source. **Package mode equally depends on raw `src/` shipping** — and it does: `package.json` `files:["src/"]` (line 16) ships the entire `src/` tree.

### Intended or incidental?

**Intended — a deliberate authoring model, NOT an accident.** The evidence is consistent and multi-point:
1. `init` deliberately copies raw `.ts` token + component source into the consumer and writes a config that points at it (`init.ts:49-87`). A copier that produced compiled artifacts would be a different design; this one is explicitly source-first.
2. `rewriteBuildImports` (`shared/transforms.ts`) exists *specifically* to make the copied raw `.ts` resolve its build-system imports against the installed package (`@3fn/core/build`). That transform is only needed because the consumer's `.ts` is **loaded as source at runtime**.
3. The direction-decision finding's **anchor fact** (R5 AC3, `direction-decision.md:17`): *"consumers author `designerpunk.config.ts`, and a TS-aware runtime loader is permanent."* The config-loader being permanent is a ratified decision; the token/component loaders are the same authoring model one layer down.
4. Spec 117 R4 *deliberately* re-architected `loadComponentTokens` to discover + load component `.ts` from source presence — a considered design move, documented in the code comment (`designerpunk.ts:109-114`, `loadComponentTokens.ts:21-30`).

**The boundary with Spec 123 (consumer distribution)**: what is *intended* is "the consumer authors and the CLI loads raw `.ts` token/component **source**." What is **incidental / unowned** is the *mechanism* by which that load resolves — a **bare global tsx register in the bin** (sites 2/3 piggyback on it). The authoring model is deliberate; the *global, unscoped, undocumented-as-load-bearing register* is the accident. Spec 123 will decide how source is distributed to consumers (copy-at-init vs shipped-package vs compiled); this audit's §d must not pre-empt that, but the two converge exactly at "what form does the consumer's token/component source take, and how is it loaded at generate-time."

---

## (d) PROPOSAL — the IDEAL target architecture + the mapped path

> This section is my proposal for the main loop / Peter, not a fact. It is framed against Peter's standard: state the ideal, justify every intermediate against it, no patch-to-work-now.

### The committed frame (not re-litigated here)

`direction-decision.md` (Task 8, Peter-ratified) commits **CJS-consistency now, ESM as a mapped future migration**. The runtime TS-config loader is **permanent** (R5 AC3 anchor). This audit's ideal must sit *inside* that frame: CJS-coherent now, ESM-reachable later, consumer-`.ts` loading permanent.

### The ideal end-state (per class)

**Class A — the package's OWN code (CLI, generators, exports).**
**Ideal: compiled-and-shipped (`dist/`), executed as compiled JS — NOT raw `.ts` via a runtime loader.** Justification: the package's own code has no irreducible runtime-TS need; compiling it (i) removes the package from the global-register dependency, (ii) gives a typecheck gate (R6 AC3), (iii) is the form 3b's exports reconciliation already moves the raw-`.ts` export trio (`./blend`/`./build`/`./types`) toward (`export-condition-inventory.md`), and (iv) is a prerequisite for any later ESM move (compiled `dist` is direction-portable; raw-`.ts`-via-loader is not). The bin would then `require('../dist/cli/designerpunk.js')` (which already builds — `dist/cli/designerpunk.js` exists) instead of the raw `.ts`.

**Class B — the CONSUMER's `.ts` (config / tokens / components / overrides).**
**Ideal: a SCOPED runtime TS loader, per-site, modeled on the Inc-1 Approach-A seam — the irreducible runtime-TS need, made explicit and bounded.** Justification: the consumer's `.ts` lives in the consumer's repo and *cannot* be resolved at our build time (the hard limit on the bundle-and-exempt principle, correctly flagged in `mcp-browser-exemption-boundary.md:14`). Approach A is the *proven* mechanism — it passed all five accept-criteria where ESM-native `tsImport` failed all four (`loader-selection.md`). The ideal is **three scoped seams** (one per Class-1 site: config — already done; `resolveTokens`; `loadComponentTokens`) replacing the one global bin register. Each seam registers tsx scoped, loads, and unregisters — no process-global residue.
- *Alternative considered — "precompile consumer `.ts` at `init`":* **rejected as the ideal** because it changes Spec 117 R4's **source-presence-discovery** contract (R4 drives component loading off live source presence, `designerpunk.ts:109-114`). Precompiling would freeze the consumer's tokens at init-time and break the "edit src/tokens, re-run generate" authoring model `init` explicitly promises (`init.ts:176`). It also collides with Spec 123's not-yet-made distribution decision. It may become viable IF Spec 123 chooses a compiled-distribution model — flag as a 123-coupled option, not the 118 ideal.

**Class C — the `__dirname` assumptions.**
**Ideal: a single `resolvePackageRoot()` source of truth** (the robust B3 pattern: resolve up, self-check for `package.json`, fall back to cwd), with B1 and B2 rewritten to derive from it instead of bare `__dirname`. Justification: B3/B4 already prove the pattern survives relocation; B1 (package-mode token root) and B2 (consumer-map components dir) are the two that silently/loudly mis-resolve under compile-to-dist. Routing all package-root-relative paths through one self-checking resolver makes Class-A compilation safe (the thing that re-broke Ada this session). **B2 additionally needs a decision**: today it always reads the *package's* component schemas and is blind to consumer-added components — a latent gap that compile-to-dist surfaces; the ideal resolves the components dir relative to the **active config's** source, not `__dirname`.

**Class D — the MCP-dev ts-node configs (R12 AC4 exception).**
**Ideal: a PERMANENT documented exception — NOT a unify-to-tsx target.** Resolving the seed's open question explicitly: the MCP servers ship as esbuild bundles (no runtime TS resolution at ship time); their ts-node dev configs serve only the servers' own local-dev workflow, never touch `loadConfig`, never load consumer `.ts` (`mcp-browser-exemption-boundary.md:100`). They are categorically outside the runtime-resolution contract. Unifying them to tsx would be churn with no coherence gain. Keep as documented exception (Resolved Decision 2). *Caveat*: if a future increment retires ts-node from the dev workflow wholesale, fold them in then — but that is not owed by the ideal.

### The mapped path (each step a consumer-guard-certified whole, each a real step toward the ideal)

1. **[CURRENT — certified] Interim register-keep.** Increment 3a unified the runtime mechanism to tsx and retired ts-node, but **deliberately kept the bin's global register** (`bin/designerpunk.js:14-40`) because retiring it without scoping sites 2/3 re-breaks consumer generate. **This is a legitimate intermediate, NOT a dead-end** — it is a guard-certified coherent whole (consumer-guard green) and it removed a real incoherence (the tsx/ts-node split). Its *only* debt is the global register, which steps 2-3 retire. The bin header already documents this honestly as "a documented interim — NOT the final coherent end-state."

2. **[NEXT — the seam step] Scope `resolveTokens` + `loadComponentTokens` to per-site tsx** (the Approach-A pattern Inc-1 proved on `loadConfig`). After this, sites 2/3 no longer depend on the global register. **Consumer-guard is the arbiter** — this step is only "done" when the packed-install subprocess guard is green (in-repo loads give false-green, per `task-3-completion.md`). Couples to nothing external; pure within-118.

3. **[THEN — the `__dirname` step] Route B1/B2 through a single `resolvePackageRoot()`** (B3 pattern), and resolve B2's components-dir off the active config rather than `__dirname`. This makes the package root relocation-safe — the prerequisite for step 4. Consumer-guard certified.

4. **[THEN — the compile step] Retire the bin's global register; bin requires compiled `dist/cli/designerpunk.js`.** Now safe because (2) scoped the consumer loads off the global register and (3) made `__dirname` relocation-safe. **Couples to 3b (exports)**: this is the same compile-and-ship move 3b makes for the export trio — sequence them together so the package presents one compiled form. Consumer-guard certified (the guard that caught all three surprises is exactly the arbiter for "did de-registering break consumer generate").

5. **[BOUNDARY — defer to 123] Consumer source distribution form.** Whether the consumer's tokens/components ship as copied raw `.ts` (today), shipped-package source, or compiled artifacts is **Spec 123's call**. Step 2's scoped seams are correct under *any* 123 outcome that keeps raw-`.ts` authoring; only a 123 decision to compile consumer source would revisit the Class-B "precompile at init" alternative. **Flag, don't pre-empt.**

6. **[FUTURE — ESM, mapped not owed] The CJS→ESM migration** (`direction-decision.md:56-68`). Steps 1-4 bank ~60-70% of the structural prep (unified mechanism, compiled exports, typecheck gate, `__dirname` source-of-truth). The ESM-specific marginal cost (loader-host re-investigation + jest→ESM) is a deliberately-triggered follow-on spec, not part of 118.

### Is the current interim a step toward the ideal, or a dead-end?

**A legitimate step.** It satisfies R6 (one runtime mechanism) and is consumer-guard green. Its single remaining debt — the global register — is precisely what steps 2→4 retire, in a mapped sequence where each step is independently guard-certified. The CJS→ESM model holds: CJS-consistency is a real waypoint with the ESM migration drawn, not a patch. **The one thing the interim must NOT become is permanent by default** — the bin header's own warning ("DO NOT 'finish the job' by deleting this line without the audit + the scoped-tsx seams in place") is the correct guard, and this audit is the audit it gates on.

### Where I am uncertain / where the consumer guard must arbitrate

- **Step 2's scoping under packed install**: I reason from the packed/consumer context that per-site scoped tsx will hold (it is the same primitive Inc-1 proved for `loadConfig`), but I have NOT executed it — the **packed-install consumer guard is the only trustworthy arbiter** before step 2 is called done. In-repo/synthetic loads will false-green.
- **B2's consumer-map blindness**: I assert today it reads the package's schemas, not the consumer's. Whether that is a latent bug (consumer-added components silently absent from the index's consumer map) or intended (the index documents the *package's* components only) is a **product-intent question for Peter** — flagged, not resolved.
- **The `dist/cli/designerpunk.js` readiness**: it builds today, but I have not verified the compiled CLI runs end-to-end through a consumer generate (the bin doesn't use it yet). Step 4 must be guard-certified, not assumed.
- **3b coupling sequencing**: steps 4 and 3b should land together; I have not traced 3b's task graph to confirm no ordering conflict — flag for the main loop.
```
