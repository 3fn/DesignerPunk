# Design Document: 123 — Consumer Distribution

**Date**: 2026-09-26 (R2 revision, same day)
**Spec**: 123 — Consumer Distribution (the former "121-C")
**Author**: Thurgood (test governance / spec standards / Civitas steward)
**Status**: Design Phase — **R2 REVISION**. R1 (four reviews, 24 blocking) is folded, and the dispositions are in `feedback/design.md` § `[THURGOOD R2]`. **Micro-confirms are pending, and two rulings are pending from Peter (slots P1 and P2 below).** `tasks.md` does not open until the round closes.
**Dependencies**: `requirements.md` (30 requirements, 282 ACs — PR #196, `aabb59fd`); `design-outline.md` (settled, PR #194); the Model B identity statement (Peter, 2026-09-26); Specs 111 (sync), 118, 122, 124, 127

---

## Framing obligation, carried from the requirements

> **§ 7.2's re-grounding check has failed falsification twice and is NOT signed off. Pass four is a U2 acceptance gate, and the author is recused.** This document specifies the machinery concretely and **claims nothing about whether it works.** A design that reads as complete is not evidence that the check discriminates; that is what gates G1 and G2 exist to establish. **R1 found the machinery's *domain* narrower than its requirements** (it covered charter bodies only, and the always-set had no emission site). R2 widens the domain. It does **not** widen any claim. *Traces: requirements.md § "Framing obligation"; Req 11.8; Lina R1 L-D3/L-D4.*

---

## Rulings pending from Peter — slots

The text below is written so that each ruling fills one line. **No branch is picked here.**

- **SLOT P1 — does 5A cover primitive names referenced by the compiled component surface?** *(Ada R1 [@PETER]; her lean is yes. The counter is that it taxes the consumer's language.)* **Where it lands**: C7's tier filter. Semantic names are **always** checked. Component-tier names are **never** checked. Primitive names are checked **iff P1 = yes**; if P1 = no, the gap is recorded as an accepted residual in the 5A report's "what a clean report does not establish" line. **Ruling: `____`**
- **SLOT P2 — after a REPEATED G1 BREAKS: "no mechanical floor, every unit routes" vs "U2 waits"** *(Stacy R1 S-D-B3; she holds no preference between the two, and a strong one that the Fork-A path is not silently available)*. **Where it lands**: § "Gates and sequencing", G1's BREAKS branch. Both branches are pre-written there. **Ruling: `____`**
- *(Leonardo's platform-output default was the third candidate. It is **derived** from the rulings rather than escalated, and recorded as **overturnable at the sitting**. See DD1.)*

---

## Overview

This design realizes the 30 settled requirements. **Requirements are settled; this document decides HOW, never re-opens WHAT.** Every component carries its requirement trace. Decisions the requirements left to design are resolved in § Design Decisions (DD1–DD22), each with a rationale and the surviving counter-argument.

**The thesis every component derives from** (Model B): DesignerPunk is an **engine** that births, then continuously runs, a design system that is the consumer's own. **`init` is the birth event, once per design system, ever.** The consumer's **language** (tokens) is theirs wholesale from birth. Our **updating surface** (components) is consumed by name and keeps flowing. The **name contract** is the one seam, and it reports, never writes.

**Substrate findings** (R1 found more than the draft did; all stated here so no reader meets them cold):

1. **`sync` already has a three-way baseline** (Spec 111 `Manifest` + `Classifier`) — reused. *(Req 5.6's parenthetical was a misreading, and Lina has recorded it as originating in her outline R1 A4.)*
2. **`sync`'s managed set contradicts the rulings as shipped today, and it is worse than the draft said.** It manages `src/tokens` and `src/types`. Its `new` classification resurrects deleted files **whatever the manifest says** (`Classifier.ts` L60–67). **Governance-tier `new` AUTO-APPLIES with no prompt** (`sync/index.ts` L70–78). And `updated-safe` **overwrites a consumer's unedited token files with ours** — our language flowing into theirs after birth (Ada D-B6). C7 repairs all of this.
3. **Claude Code and Kiro approve MCP tools through different mechanisms, and no server annotates which tools are read-only.** Kiro uses `autoApprove`; CC uses `permissions.allow` plus project-server trust. There are **zero `readOnlyHint` annotations** across the three server trees (Leonardo A3). C8.
4. **The always-layer is not an embedding lane on either target** (Lina L-D3). CC's `emitAlwaysLayer` writes `@`-import lines (`cc.ts` L427–458). Kiro's returns `[]` (`kiro.ts` L429–438). The consumer lane must **emit member files**. C12/C19.
5. **Roughly half of each rendered charter is not body** (Lina L-D4: lina 428 lines with the body ending at ~297; thurgood 905/~423; stacy 832/~409). That half — frontmatter-rendered Ambient, Routing, Commands, Write scope, Pre-flight, plus shared-catalog members — **carries the most repo-specifics.** The draft's re-grounding domain was body-only. C12–C17 widen it.
6. **The component indexer is single-root, and derives its project root as `componentsDir/../../..`** (Lina L-D2). The union must happen at pass 1, and the project root must come from C2.
7. **The shipped component-token CSS references only primitive custom properties. Component implementations reference 214 `var(--…)` names** (Ada D-B5). Schema `tokens:` blocks are **tier-mixed** (Lina L-D9). The name contract moves to the **compiled CSS level**. C7.

---

## Architecture

```
U1 — DISTRIBUTION SUBSTRATE & PACKAGING TRUTH
  src/cli/init.ts                    ← the birth event, rewritten to 19A's copy table (C1)
  src/cli/shared/bornRepo.ts         ← NEW: birth detection — cwd start, ancestor walk, DP-shaped signals (C2)
  src/cli/shared/mcpDataRoots.ts     ← component root SET; token-index posture split; product root anchored (C3)
  application-mcp-server/src/indexer/ComponentIndexer.ts ← multi-root at pass 1; projectRoot = bornRoot (C3)
  src/cli/designerpunk.ts            ← runner values per 19A.5a; user env wins; generate anchored (C3)
  src/cli/shared/transforms.ts       ← rewrite-BY-RESOLUTION for types / build / registries / Oklch (C4)
  scripts/floor-closure.ts           ← NEW: two named closures (C5)
  package.json files[]               ← explicit floor; config dropped; consumer-canonical + manifests added (C5)
  tests/consumer-integration.test.ts ← guard extensions, including subdir + over-rewrite arbiters (C6)
  src/cli/sync/*                     ← managed set, grains, classification, pruning, migration (C7)
  scripts/build-name-contract.ts     ← NEW: dist/name-contract.json from the compiled CSS surface (C7)
  scripts/build-tool-manifest.ts     ← NEW: dist/mcp/tool-manifest.json from registrations + readOnlyHint (C8)
  scripts/verify-publish-rail.sh     ← fail-fast, per-assertion messages and bites (C9)
  src/cli/loadComponentTokens.ts     ← per-file branded-export count → harvest-zero lint (C11)

U2 — CONSUMER GENERATION PROFILE (the emission lane — one subsystem, C12–C22)
  canonical/consumer-profile.yaml    ← declared target set + default target (C12)
  tools/agent-generator/frontmatter.ts ← NEW: the ONE frontmatter splitter (body | frontmatter) (C13)
  tools/agent-generator/partition.ts ← NEW: body splitter + frontmatter entry tree (C13)
  tools/agent-generator/spans.ts     ← NEW: the ONE span function, for body units AND frontmatter entries (C14)
  tools/agent-generator/regrounding/ ← derivation (11.4), triviality floor, sweeps (C15, C18)
  canonical/operative-sets/          ← committed canonical-side operative-item records (C16)
  canonical/profiles/consumer/       ← overlays (hash-pinned), dispositions (body + frontmatter + shared + always-set),
                                        confirmations/, signatures/  — the DURABLE record homes (C16, C17)
  tools/agent-generator/derive.ts    ← NEW: derive() — refuses on a stale overlay; two ruled call sites (C22)
  canonical/_consumer-output/        ← guarded: _canonical/ (once) + <target>/ (agents, identity member files) (C12)
  tools/agent-generator/consumer-entry.ts ← consumer emission lane; shipped inputs only (C20)
  product-template/ DELETED + enumerated sweep (C21)

U3 — ONBOARDING
  docs/consumer/INSTALL.md (shipped)  ← step unit defined once; path-steps front-matter (C23)
  docs/consumer/COMMIT-POLICY.md + the .gitignore managed block (C24)
  specs/ starter specs · personal-note template · init UX (C25–C27)

U4 — CONTENT POLICY
  scripts/audience-banner/predicate.ts + guard (C28) · U1b backward check · consumer CHANGELOG (C29)
  the release-recipe governance ballot (DD13)

U5 — VALIDATION & CLOSEOUT
  tests/onboarding-trio/ + .kiro/specs/123-consumer-distribution/validation/ (C30)
  TWO cross-target join runs (C24/C30) · 24.1 conformance (C31) · probe re-run · tarball · product query (C32)

GATES (inside U2)
  G1  C3 falsification  → .kiro/specs/123-consumer-distribution/completion/re-grounding-c3-falsification.md
  G2  pass four         → .kiro/specs/123-consumer-distribution/completion/re-grounding-pass-four.md
```

**Unit order is unconditional: U1 → U2 → U3 → U4 → U5** (Req 26.3). **MIDPOINT — CONFIRMED at U2 by Stacy, with two conditions** (§ "Gates and sequencing"). Record: `.kiro/specs/123-consumer-distribution/completion/claims-pass-midpoint.md`.

**Record homes, pinned from the repo root** (Stacy S-D-A4):
- **Spec-scoped** (one-time, closes with the spec): G1, G2, MIDPOINT, the U5 validation runs, and the U1b check → under `.kiro/specs/123-consumer-distribution/{completion,validation}/`.
- **Perpetual** (rewritten on every canonical change and every release, forever): operative-set confirmations and signatures → **`canonical/profiles/consumer/confirmations/<source-id>.md`** and **`canonical/profiles/consumer/signatures/<source-id>.md`**. These survive the spec's closure.
- **Per-release**: publish-rail logs → `docs/releases/<version>/publish-verification.log`. The recurring trio records → `docs/releases/<version>/trio-<persona>.md`.

---

## Components and Interfaces

### UNIT 1 — Distribution substrate & packaging truth

#### C1. The birth event — `init.ts` rewritten to 19A's copy table (Reqs 19A, 19, 15A.3, 1.2)

| Today's step | Disposition | Change |
|---|---|---|
| **0 (new)** birth check | **ADDED** | `findDesignSystemRoot(process.cwd())` (C2). `born` → refuse with the joining path. `partial` → refuse with the named partial message (C2 sub-case). **`--re-scaffold`** overrides either. |
| 2 `designerpunk.config.ts` | **KEPT** | `generateConfig()`: `tokenSource: './src/tokens'` (1.2(i)), local theme imports (1.2(ii–iii)), `componentTokens: ['./src/components', './src/tokens/component']` (1.2(iv)). |
| 3 `src/types` copy | **REMOVED** | Resolves via `@3fn/core/types` (19A.3), reachable through C4. |
| 3b `src/tokens` copy | **KEPT + TRANSFORM** | `rewriteByResolution` (C4). |
| 3c `src/tokens/component` copy | **KEPT + TRANSFORM** | `rewriteByResolution` (C4) — this subsumes the old `rewriteBuildImports` string regex. |
| 4 `src/components/core` copy | **REMOVED** | Req 2's union replaces it. `--skip-components` is accepted as a no-op with a deprecation note. |
| **4′** consumer components dir | **ADDED** | `src/components/` + `README.md`. The indexer filters to directories only (`ComponentIndexer.ts` L117), so the README is invisible to the catalog (Lina A8, confirmed). |
| 5 `product/overview.yaml` | **REPLACED** | C27's full tree, with a validity guard (Leonardo A12). |
| 6 / 7 / 7b agents, steering, governance copies | **REMOVED** | 6 is replaced by C20 generation for the selected target; 7 and 7b by gate 4b. |
| 8 MCP config | **REPLACED** | C8's per-target emitters (key-grain, C7). |
| 9 test config | **KEPT, purpose stated** (Leonardo A13) | `jest.config.js` (`@3fn/core/jest-preset`) + `tsconfig.test.json` exist so the consumer can **test their own forked and consumer-authored components with `@3fn/core/testing`** (exported). C27's collision string states *that* consequence. It no longer claims the scaffold runs "component tests" she does not have. |
| 10 `.designerpunkignore` | **KEPT** | Its example comment updated. |
| **(new)** `.gitignore` managed block | **ADDED** | C24 — the third marker region (C7). |
| **(new)** personal note | **ADDED** | C26. |
| **(new)** agent layer | **ADDED** | `attach` code path for the selected target (C20). **It returns its emitted file list.** |
| **(new)** manifest | **ADDED, LAST** (Lina L-D7) | `designerpunk.manifest.json` at the repo root (C7, DD1). It records **every file init wrote — including the generated agent layer and MCP config keys** — plus `attachedTargets` and `installedVersion`. **It is written after generation, so no generated file lacks an entry.** |
| 11 next steps | **REWRITTEN** | C27. |

- **Target selection**: `--target=<cc|kiro>`. With **no `--target`**: emit the declared default (DD9, U3 confirms) **and print the named-default notice** (Leonardo A2). The notice string is in the error catalog.
- **`--re-scaffold`**: prints every file it would RE-ADD and requires confirmation (on a TTY) or `--yes` (off a TTY).

#### C2. Birth detection — `src/cli/shared/bornRepo.ts` (Reqs 15A.3, 19A.5a; Ada D-B1/B2/B3, D-A1/A2/A3)

```ts
type BirthState = 'born' | 'partial' | 'unborn';
type PartialCase = 'config-no-tier' | 'package-mode-config' | 'tier-no-config' | 'manifest-only';
interface DesignSystemRoot {
  state: BirthState;
  root: string | null;                  // the anchoring directory; null iff unborn
  partialCase?: PartialCase;
  signals: { config: boolean; tier: boolean; manifest: boolean; legacyManifest: boolean };
}
function findDesignSystemRoot(startDir: string): DesignSystemRoot;
```

- **The start (D-B3)**: **every caller passes `process.cwd()` of the invoking process — never `__dirname`, never `pkgRoot`.** Spawned MCP servers inherit it: `spawnServer` passes **no `cwd` option**, and that absence is load-bearing, so it is stated in a comment at the call site and covered by a test.
- **The signals — DesignerPunk-SHAPED, never bare non-emptiness (D-B1)**:
  - **config**: `designerpunk.config.ts` exists.
  - **tier**: the tier directory (the config's `tokenSource`, else `src/tokens/`) contains `index.ts` **and** `semantic/index.ts`, and they **textually** export `getAllPrimitiveTokens` / `getAllSemanticTokens` (`verifyBarrelContract`'s signature, read without loading).
    - An auth or JWT `src/tokens/`, or another token system's tier, does **not** match.
  - **manifest**: `designerpunk.manifest.json` exists. **legacyManifest**: `.kiro/sync-manifest.json` exists (a pre-123 consumer; C7 Migration).
- **The walk (D-A1)**: ascend from `startDir`.
  - At **each** level, **test the signals first, then check for a stop**. The stop is `.git` via `existsSync` (it is a *file* in worktrees and submodules), or the filesystem root. Testing before stopping means the repo root, where `.git` and the config live together, **is** tested.
  - **Any directory with a `node_modules` path segment is skipped as a candidate** (never classified). This is what keeps `node_modules/@3fn/core/`, itself born-shaped, from ever being the root.
  - The first level with any signal is the root.
- **Classification**:
  - **born** = config ∧ tier.
  - **partial** = any signal without born, with a **named sub-case**:
    - `config-no-tier`;
    - **`package-mode-config`** — a config with `tokenSource` omitted. That is `ConfigLoader`'s supported package-mode shape, named so the message is right (D-A1 iii);
    - `tier-no-config`;
    - `manifest-only`.
  - **unborn** = no signal.
- **Consumers — FIVE, not two** (D-A2, Leonardo A11, Lina L-D2):
  1. `init`'s refusal;
  2. the MCP resolver (component, token-index and product roots);
  3. the component indexer's project root;
  4. **`generate` — BOTH the read side (the config) and the WRITE side (`token-index/` and platform output) anchor to `root`**. `generate` **refuses** in `tier-no-config` (D-B2) and in a subdirectory of a partial repo;
  5. `figma-push` / `figma-extract` — they read `path.resolve('designerpunk.config.ts')` (`figma-push.ts` L108/124, `figma-extract.ts` L148), the same cwd class found while answering Ada, and they anchor to `root`.
- **Limitation, stated (D-A1 iv)**: in a monorepo with the design system in `packages/ds` and the app elsewhere, the app reads as unborn. **The documented escape is explicit env** (`TOKEN_INDEX_DIR`, `COMPONENTS_DIR`, `PRODUCT_DIR`), which C3 honours in any posture.
- **What `born` establishes and what it does not (R26.8)**: config plus a DesignerPunk-shaped tier. It does **not** establish that `generate` ran, or that the tier is complete.

#### C3. The root-policy table as code — resolver, indexer, runner (Reqs 2.1, 2.1a, 19A.5a, 3.7a; Lina L-D2; Ada D-B2; Leonardo A11)

**Resolver** (`mcpDataRoots.ts`):
- **`resolveComponentRoots` → `{ roots: [consumerRoot?, packageRoot], sources }`**. `consumerRoot` = env value, else `bornRoot/src/components` (born); none when unborn. **The env value names the consumer root, never the only root.**
- **`resolveTokenIndexRoot`**:
  - explicit `TOKEN_INDEX_DIR` absent or empty → error, in any posture;
  - **born** → `bornRoot/token-index`, which errors if absent or empty (the "run generate" message);
  - **partial → its OWN error, naming the sub-case and pointing at `init --re-scaffold`. NEVER "run generate"** (D-B2 — following that string in `tier-no-config` produced package-mode generation served unlabelled as theirs);
  - **unborn** → the package index, `source: 'package-consume'`, with every response labelled `tokenOrigin: 'designerpunk-reference'`.
- **Product root** (A11): env, else **`bornRoot/product`** (born or partial); unborn → `cwd/product` (unchanged).
- The **type-level declaration test** covering both servers' hand-written `McpDataRootsModule` interfaces is kept (Lina confirmed it faithful to A8).

**Indexer** (`ComponentIndexer.ts`, L-D2):
- **The union is applied at pass 1.** `contractsCache` is filled from **the consumer root first, then the package root**, so a consumer fork inheriting a package parent resolves (Req 2.5).
- **Precedence keys on the DECLARED component name** (the `component` field), not the directory name. A fork whose directory name differs still collides correctly.
- Assembly iterates the precedence-resolved set.
- **Legacy level** (L-D8): under the consumer root, a directory named `core/` that contains component subdirectories is **recognized as one legacy level**, with a named warning on each load. This makes C7's MCP-config rewrite **order-independent**: pre-123 copies are neither dropped silently nor lost.
- **`projectRoot = bornRoot`** replaces `path.resolve(componentsDir,'..','..','..')` (L130); unborn → the package root, labelled. It feeds `modeClassifier.load` (the consumer's own `dark/SemanticOverrides.ts` under Model B), `guidanceIndexer`, and `tokenIndexer.indexTokens`. *(Lina's [@ADA] confirmation of this anchor is pending; it is in Ada's micro-confirm packet.)*

**Runner** (`designerpunk.ts`): the consumer-root defaults are removed; package-owned roots keep `pkgRoot`; **user env wins** in `spawnServer` for the declared data-root keys.

| Root | Keys | Resolves via | Runner default |
|---|---|---|---|
| component (set) | `COMPONENTS_DIR` / `COMPONENT_DIR` | `resolveComponentRoots` | none |
| token index | `TOKEN_INDEX_DIR` | `resolveTokenIndexRoot` | none |
| product | `PRODUCT_DIR` | env ‖ `bornRoot/product` ‖ `cwd/product` (unborn) | none |
| package-owned ×5 | `PATTERNS_DIR`, … | `resolvePackageOwnedRoot` | `pkgRoot` |

#### C4. Rewrite-at-copy — BY RESOLUTION, not by string (Req 19A.7; Ada D-B4, D-A6)

- **`rewriteByResolution(content, fileAbsPath, copyRoot)`** resolves each relative specifier (`import`, `import type`, `export … from`, `require`, `import()`) against the file's own location.
  - It rewrites **only** specifiers that resolve **outside `copyRoot`**, through a mapping table:

| Resolves into | Rewritten to |
|---|---|
| `src/types/**` | `@3fn/core/types` |
| `src/build/tokens/**` | `@3fn/core/build` |
| `src/registries/ComponentTokenRegistry` | `@3fn/core/build` (Ada C1) |
| `src/color/OklchConverter` | `@3fn/core/types` (`Oklch` added to the public types barrel) |

- **Intra-tree specifiers are never touched.** `themes/*/SemanticOverrides.ts` → `'../types'` resolves to `src/tokens/themes/types.ts`, **inside** the copy root, so it stays as written. *(The draft's regex rewrote these three, which broke the consumer's `tsc` on exactly the files their config imports. Nothing caught it, because the import is type-only and erased at runtime.)*
- **An out-of-root specifier with no mapping row fails the copy loudly.** This check covers under-rewrite. C6's `tsc` arbiter covers over-rewrite.
- **`sync`'s Applier source branch is DELETED** (D-A6). No source tier is managed after C7, and a second, divergent transform site is the latent defect.

#### C5. The packaging floor — two named closures + explicit `files[]` (Req 4, 3.9; Ada D-A5, D-B3; Lina L-D5, A7)

- **Closure 1 — rewrite completeness, over the TRANSFORMED COPY.** It runs over a scratch copy after C4. **Zero escaping relative references**, or the build fails. It governs C4, not `files[]`.
- **Closure 2 — the package's own runtime closure of `src/tokens`.** This is `src/types/{PrimitiveToken,SemanticToken}` + `src/build/tokens` + their closure. **It governs `files[]`**, because package-mode `generate` remains a supported behavior (Req 3.2's CONSUME-side re-entry). That is the D-A5 decision: **ship closure 2**, rather than making package-mode generate refuse.
- Output: `floor-closure.json` (both closures, labelled). The header says *"snapshot; the arbiter is the post-diet packed consumer-guard run (3.9)."*
- **Expected closure finding, pre-named (Lina A7)**: `dist/components/**/*.web.js` `require("./X.web.css")`, and `dist/components` holds **zero** `.css` files. Closure 2 does not traverse it; a C5 run over `dist/components` would surface it. **This is out of 123's scope and routed to Lina as a latent defect.** Consumers load components through the browser bundle, which inlines CSS.
- **`files[]`**:
  - **ADD**: the declared floor members (4.2); closure 2;
    - **`dist/consumer-canonical/**`** (**every extension**; the `dist/**/*.{js,d.ts,json,css,swift,kt}` glob drops `.md` and `.yaml` — L-D5);
    - `dist/generator/**`, `dist/mcp/tool-manifest.json`, `dist/name-contract.json`;
    - **the eight shipped identity docs by explicit path** (path B's counterparts, Req 12.1a) + `templates/personal-note.template.md`. **Peter's personal note never ships.**
  - **REMOVE**: `"product-template/"`, `".kiro/agents/"`, the `".kiro/steering/"` directory glob (only the eight named docs remain), the wholesale `"src/"`, and **`"designerpunk.config.ts"`** (D-B3; **nothing relies on the shipped copy** — see the R2 answer to Ada: `figma-*` and `ConfigLoader` read the consumer's cwd copy, and the only reference is help text, re-pointed to the install doc).
  - **NOT ADDED**: `product-mcp-server/src/` (DD14).
  - **EXCLUDED**: component `__tests__/`, `examples/`.
  - **KEPT pending Kenya/Data** (4.5): `*.swift`, `*.kt`.
- **Tarball target**: `tarball-target.json` from the post-diet `npm pack --json` (4.7).

#### C6. Consumer-guard extensions (Req 3) — every case names its test and its bite

| Case | Asserts | Bite |
|---|---|---|
| `local-mode generate over the init-copied tree` | `generate` succeeds over the copied + transformed tree | revert C4's mapping for `src/types` → red |
| **`over-rewrite arbiter`** (D-B4) | **consumer `tsc --noEmit` over the copied tree passes; the three `themes/*/SemanticOverrides.ts` still read `'../types'`** | restore the string regex → red |
| `component catalog equals shipped component-root count` | both sides derived | drop the YAML floor from `files[]` → red |
| `consumer component appears alongside ecosystem` | consumer component present; count = shipped + 1 | revert to first-non-empty → red |
| **`consumer fork inheriting a package parent resolves`** (L-D2) | the fork's inherited contracts resolve; precedence keys on the declared name | apply the union after pass 1 → red |
| `C′ token tiers` | a test token per tier appears in the served index | point the index at the package → red |
| `both launch paths × every 19A.5a row` | table-driven, **including the product row run from a subdirectory** (A11) | restore `pkgRoot` for `COMPONENTS_DIR` → red |
| **`launch from a subdirectory of a born repo`** (D-A3) | serves `bornRoot/token-index`, never the labelled package index; `generate` from the subdirectory writes to `bornRoot` | anchor the walk at `process.cwd()` without ascending → red |
| **`tier-only partial`** (D-B2) | MCP: the partial message, not "run generate"; `generate` refuses | reuse the born message → red |
| **`stranger repo with src/tokens`** (D-B1) | a JWT-utility `src/tokens/` classifies **unborn** | revert to non-empty detection → red |
| **`installed package dir is never born`** (D-B3) | walking from `node_modules/@3fn/core/src` never classifies it as root | drop the `node_modules` skip → red |
| **`legacy core/ level recognized`** (L-D8) | `src/components/core/<Name>` indexed, with a warning | remove the recognition → the copies vanish → red |
| `brand-survival — consumer-tree component token` | (a) swap to plain `Symbol()` → red; (b) delete `progress.ts` → the token disappears | as stated (Ada D-A9: confirmed) |
| `token index fails loud when born and absent/empty` | born + empty → error; unborn → labelled | restore the fallback for born → red |
| `init refuses in a born repo` / `partial` | exit non-zero with the exact catalog strings | remove the check → red |
| **post-diet re-certification** (3.9) | the whole suite against the post-narrowing pack, **including a consumer-lane emission from the packed install** (L-D5) | — (it is the arbiter) |

#### C7. `sync` — managed set, grains, classification, pruning, migration (Reqs 5, 5A, 5.8, 21; Thurgood finding + Ada D-B6 + Lina L-D7/L-D8/L-D9/A4/A5 + Leonardo Le-D1/A5/A6)

**Reused**: `Manifest` + `Classifier`, the three-way comparison. **Changed — and DD2 is corrected** (Lina A4): the design changes **what is managed AND at what grain**. Region extraction, key-grain JSON, a splicing applier and `path#region` / `path#key` manifest keys are **new units, sized as such**.

**The managed set** (row by row; Lina confirmed the removals):

| Entry | Disposition | Grain |
|---|---|---|
| `src/tokens`, `src/types`, `src/components/core` | **REMOVED** | — (Model B / 19A) |
| `.kiro/steering`, `governance`, `.kiro/agents`, `.kiro/skills` (package copies) | **REMOVED** | — (gate 4b) |
| generated agent artifacts for each `attachedTargets` member | **ADDED** | file |
| **generated identity member files** — CC `.claude/identity/<id>.md`; **Kiro `.kiro/steering/<id>.md`** (L-D3 knock-on: gate 4b stops copying **our** docs, but **their generated** identity files live there) | **ADDED** | file |
| `CLAUDE.md` | **ADDED** | **marker region** |
| **`.gitignore`** (Leonardo A5) | **ADDED** | **marker region** (the third) |
| `.mcp.json`, `.kiro/settings/mcp.json` | **ADDED** | **KEY** — server keys `designerpunk-*` only; consumers' own servers are never read or written (Lina A4) |
| `.claude/settings.json` | **ADDED** | **KEY** — `permissions.allow` entries matching `mcp__designerpunk-*` only |

*(Key-grain for JSON is proposed in answer to Lina's [@LEONARDO] question. JSON has no comment syntax for markers. **Leonardo confirms it in his micro-confirm.**)*

**The package side of the generated surfaces** is freshly generated, by `emitConsumer`, for the manifest's **`attachedTargets`**. `sync` therefore knows which targets to generate (Lina L-D7).

**Classification** (`FileClassification` gains two values):
- **`deleted-by-you`**: a manifest entry exists and the project lacks the file → **reported, never re-added** (`--restore <path>` re-adds).
- **`untracked-new`**: **no manifest entry and no project file** — the first-sync case (L-D7 hole a) → **REPORTED, NEVER APPLIED** on a generated surface. Re-adding requires `attach`, which records it.
- **`removed` is scoped to paths under currently managed entries** (D-B6).

**Apply behavior — the governance-tier auto-apply is RETIRED** (design statement, Lina's measurement):
- **No class applies without the report printing first.**
- `updated-safe` on generated surfaces applies after **one batch confirmation** (TTY) or **`--apply`** (off a TTY).
- `conflict` and `deleted-by-you` never apply without a per-path flag.
- *Rationale: under Model B the generated surfaces are theirs to commit and review (DD1). A silent write into a committed file is the report-never-overwrite principle broken at one remove.*

**Manifest**:
- **Path**: `designerpunk.manifest.json` at the repo root — **moved beside the config** (Leonardo A6), so a tool-dotdir gitignore cannot silently remove the teammate's baseline.
- **Format**: stable key order and one entry per line (merge-friendly, A6).
- **Fields**: `{ version, installedVersion, contractHash, attachedTargets, entries: { "<path>" | "<path>#<region>" | "<path>#<key>": { hash, grain } } }`.
- **Written by `init` and `attach`** for every file and key they emit (L-D7 hole b). **Pruned** of entries under de-managed paths on the first 123-era `sync`, with a one-line report per pruned group (D-B6). *(Without pruning, every sync would forever list the consumer's whole token language under "⚠️ Removed from package".)*

**The name contract (5A) — at the COMPILED CSS level, both sides** (Ada D-B5 + Lina L-D9 + Lina's answer to Ada):
- **Build step `scripts/build-name-contract.ts` → `dist/name-contract.json`**:
  - **Referenced names**:
    - `var(--x)` names in `dist/browser/designerpunk.esm.js` (esbuild inlines the component CSS; 183 names, 0 interpolated);
    - ∪ `getPropertyValue('--x')` literal reads (7, JS-side);
    - ∪ `var()` references in `dist/ComponentTokens.web.css`;
    - **minus** the custom properties `ComponentTokens.web.css` **defines** (our component tier, which stays behind the component surface — DD17).
  - **Per-component attribution** is derived from `src/components/**/*.{css,web.ts}` at build, with a **cross-check: bundle names ⊆ src-derived names, or the build fails.**
  - **Tier** is taken from the package token index, keyed by CSS custom-property name.
  - **Declared use** comes from each component's **`.schema.yaml` `tokens:` block** (L-D9's correct file). It is the *attribution* side, never the check source.
  - `IconBase`'s `` `var(--${color})` `` is the consumer's own prop value, and correctly falls outside the contract.
- **Check**: referenced names, **tier-filtered — semantic always; component never; primitive per SLOT P1** — minus **present names**, meaning the custom properties **defined in the consumer's generated web token CSS** (the output directory from their config).
  - **No generated web output → status `cannot check — run 'npx designerpunk generate'`. Never a clean report.**
- **Report string** (Leonardo A9 folded): the declared **use**, the **resolved value**, and **where semantic tokens live in her tree**. Exact text is in the error catalog.
- **Type contract** (D-A4):
  - **`contractHash` = the content hash of the emitted type-contract `.d.ts` surface** (the `PrimitiveToken` / `SemanticToken` interfaces + the `TokenCategory` / `SemanticCategory` enums). This covers **interface shape**, and **cannot be hand-bumped**.
  - A change is reported with the removed and added members, and **the remedy `npx tsc --noEmit`**. *(`generate` accepts an `undefined` category silently — `PrimitiveTokenRegistry.ts` L184–189 — so "run generate to check" checked nothing.)*
  - Then: *"fix each file tsc names; removed members are listed above."*
- **What a clean report establishes and what it does not**:
  - It establishes: every checked-tier name the **web** component surface references is defined in her generated web CSS.
  - It does **not** establish:
    - value suitability;
    - the unchecked tier (per P1);
    - the native surfaces — iOS and Android resolution is Kenya's and Data's model (DD17).

**Migration — existing consumers** (dp-portfolio at 12.0.5, and every pre-123 install). **Triggered by `legacyManifest` or by legacy copies on disk.** Nothing is removed without an explicit flag.
1. **Manifest move**: read `.kiro/sync-manifest.json`, key the migration on it, write `designerpunk.manifest.json`, and leave the old file with a one-line pointer comment for one release. **Without the move, the trigger never fires** (Le-D1(2)).
2. **"Unmodified" is judged against SHIPPED content, never against the first-sync baseline** (Le-D1(1)).
   - Fetch the package at `installedVersion` (`npm pack @3fn/core@<v>` into a temp directory), **re-apply the copy-time transform that version used**, and hash.
   - Equal → `unmodified`. Differ → `modified`.
   - **Version unknown, fetch fails (offline), or transform unknown → `cannot tell — review before removing`. Never "unmodified."**
   - *(The bootstrap baseline records whatever she had at first sync, so edits made before it would read as unmodified.)*
3. **Components**:
   - **Unmodified copies** → *"shadow package updates — remove them to receive updates (`sync --migrate-components`)"*.
   - **Modified copies → named as forks** (Le-D1(3)): *"these N modified copies now override the package's <names> and will not receive updates."* `--migrate-components` **relocates** modified copies to `src/components/<Name>/` and removes the unmodified ones.
   - Until then, the C3 legacy-level recognition keeps every copy visible, so the MCP-config key rewrite is order-independent (L-D8).
4. **Copied governance / steering / agents / skills** → the imposter-surface report and `--migrate-legacy`, **then `attach`**.
5. **Token-side migration notes** (Lina A5):
   - The 7 old-name `tokens.ts` reference maps in the copied tree **will fire C11's lint 7 times on the first `generate`, pointing at files DesignerPunk authored.** The report names them.
   - The copied branded `*.tokens.ts` now harvest as **consumer** component tokens. The report says so.
6. **Manifest pruning** (D-B6) and the **registry and tsconfig pins** (5.1, 5.2).
7. **The first 123-era sync never auto-applies anything** (L-D7 hole a).

*Lina is asked in her packet whether step 2's fetch-and-re-transform is implementable against the version-specific transform (Leonardo's [@LINA] question, unanswered at R1).*

#### C8. Per-harness MCP configuration + approvals (Reqs 5.3, 5.4, 7.3, 15A.1; Leonardo Le-D4/A3/A4, Lina L-D5)

- **`scripts/build-tool-manifest.ts` → `dist/mcp/tool-manifest.json`**. It is built from the servers' **registration modules** (imported statically at build), **never from live stdio introspection** (L-D5; `registry.ts` introspects live today, and the consumer lane cannot).
- **Read-only classification — ANNOTATIONS, not a hand list** (A3, decided): every tool registration gains an explicit MCP `readOnlyHint` (true or false). **A test fails if any registered tool lacks one.** The approval list = the tools with `readOnlyHint: true`.
  - The judgment is made once, at registration, as reviewed typed data beside the tool. It is not a list in a template.
  - `rebuild_index` is `false`. `find_docs` is `true`. `validate_component` is never emitted, because it is not registered.

| Target | Server config (key-grain) | Approvals (key-grain) |
|---|---|---|
| **Kiro** | `.kiro/settings/mcp.json` — `designerpunk-docs`, `designerpunk-application`, **`designerpunk-product`** (born only) | per-server `autoApprove` from the manifest |
| **CC** | `.mcp.json` — the same three keys, relative paths | `.claude/settings.json` `permissions.allow` = `mcp__designerpunk-<server>__<tool>` |

- **Trust, stated as UNVERIFIED** (A4): CC records per-project `enabledMcpjsonServers` in user-level `~/.claude.json`. **Whether a committed `.claude/settings.json` can pre-enable project servers is UNVERIFIED** (downgraded from the draft's "cannot"). Kiro's cold-open behavior is **UNVERIFIED**.
- **The instrument — U5, not U3** (Le-D4; the draft said U3, and there is no U3 instrument):
  - **(a) Every trio and join run record carries `first-MCP-load: <what the harness asked for, verbatim>`.** The trio's birth runs spread across both targets (23.6), so this observes **founder-cold on both targets.**
  - **(b) TWO cross-target join runs** — one joining a CC-born fixture as Kiro, one joining a Kiro-born fixture as CC. This observes **teammate-cold on both targets.** *(Chosen over a stated one-target limit: one extra run is cheap next to an acceptance record that would otherwise carry a both-harness claim over one observation.)*
  - **(c) The observation list** also records whether a committed `.claude/settings.json` was honored for server enablement (A4), and **whether CC's `@`-import of the gitignored personal note on a fresh clone loads, warns, or errors** (Lina A3).
- **Until U5's records land, the install doc's approval instruction is harness-agnostic** (*"approve the project's MCP servers if your harness asks"*). **U5's closeout edits it to the observed truth.** The install doc ships at U3 under release-between-units, so it ships the honest phrasing, not a guess.

#### C9. The publish-rail guard (Req 6; Stacy S-D-B5, S-D-A10)

```sh
#!/usr/bin/env bash
set -euo pipefail
check_version() {   # REQUIRED FORM (6.2), verbatim inside:
  npm view "@3fn/core@${VERSION}" version --@3fn:registry=https://registry.npmjs.org >/dev/null 2>&1 \
    || { echo "FAIL[version]: @3fn/core@${VERSION} is not visible on registry.npmjs.org (checked scope-explicitly) — do not announce this release"; exit 10; }
}
check_host() {      # HARDENING (6.8, augments): takes the tarball URL as input so it is independently bitable
  case "$1" in https://registry.npmjs.org/*) ;; *)
    echo "FAIL[host]: tarball for @3fn/core@${VERSION} is served from '$1', not registry.npmjs.org — wrong rail"; exit 11;; esac
}
check_version                                   # fail-fast: host never runs if version fails
check_host "$(npm view "@3fn/core@${VERSION}" dist.tarball --@3fn:registry=https://registry.npmjs.org)"
echo "PASS: @3fn/core@${VERSION} visible on npmjs; tarball host verified"
```

- **Per-assertion exit codes and named messages.** The log shows **which** assertion failed.
- **Three recorded bites**, committed under `scripts/__bites__/`:
  1. **the 6.3 verbatim command, as written** — `npm view @3fn/core@99.99.99 version --@3fn:registry=https://registry.npmjs.org` → red;
  2. the script with `VERSION=99.99.99` → **exit 10, `FAIL[version]`** (this proves the red came from the required line);
  3. `check_host https://npm.pkg.github.com/…` (invoked through a `--self-test-host <url>` mode) → **exit 11, `FAIL[host]`**.
- The hermetic invocation environment (Leonardo's A15 from the requirements round) and the paste target `docs/releases/<v>/publish-verification.log` are **unchanged**. The register row is `post-merge — adjudicated; not a PR check`.

#### C10. Product MCP wiring (Req 7) — the third key per target (C8); `init.test.ts:142` updated deliberately to three servers; product scaffold C27.

#### C11. The harvest-zero lint (Req 8)

- **Unchanged.** It is sequenced after Lina's `*.refs.ts` rename.
- **That rename has no issue record** (Lina A6, measured: `find … -name "*.refs.ts"` → 0, and `.kiro/issues/` is outside her write scope). **Flagged for the steward to file**, not filed by this author.

---

### UNIT 2 — The consumer emission lane (C12–C22): one subsystem

**Design shape, stated once** (R2 — L-D3, L-D4, L-D5 and L-D6 fixed together):

> **One disposition domain covers the whole rendered charter:** body units, frontmatter entries, shared-substrate members, and always-set members. It is processed by **one splitter family** (C13), **one span function** (C14), **one derivation function that refuses on staleness** (C22), and **one consumer lane that reads only shipped inputs** (C20). **Per-target differences live only in how identity members are delivered** (C19).

#### C12. Profile, targets, guarded surfaces (Reqs 9, 9.5, 12.1; L2-B3; Lina L-D3, A2)

- `AdapterContext.profile: 'steward' | 'consumer'`.
- `canonical/consumer-profile.yaml` = `{ targets: [cc, kiro], defaultTarget: cc }`, **the single declared list**, imported by everything that needs it.
- **Guarded surfaces** (`guardedRoots()` gains all of them):
  - `canonical/_consumer-output/_canonical/` — the derived charters and shared substrate, **rendered once** (`derive()` takes no target; Lina A2);
  - `canonical/_consumer-output/<target>/agents/…` — the rendered agents per target;
  - **`canonical/_consumer-output/<target>/identity/…` — the rendered identity MEMBER FILES per target** (L-D3: the guard covers the files that carry content, not `emitAlwaysLayer`'s return, which is 9 import lines on CC and empty on Kiro);
  - steward-side attribution sidecars for all of the above.

#### C13. The splitter family — `frontmatter.ts` + `partition.ts` (Req 10.G, 10.8; Lina L-D1, A1)

- **`splitFrontmatter(file) → { frontmatter: YamlDoc; body: string }`** — **ONE shared function, used by every consumer** (C14, C16, C18, C22). **`partition()` takes the BODY, never the file** (L-D1). *(Charters carry 6–18 `^# ` YAML-comment lines inside their frontmatter — 102 across the nine files — and partitioning the file would mint phantom H1 units. `_fixture.md` would then stop being degenerate.)*
- **`partition(body) → PartitionTree`** — **three behaviors plus the degenerate case** (A1: the unsized bulleted fallback is DROPPED — zero instances):
  1. **fence-aware tokenizer**;
  2. **heading tree → leaf units**, with **preambles as units**:
     - between a heading and its first child → `#<parent>:preamble`;
     - **before the first heading → `#doc:preamble`** (L-D1);
  3. **numbered top-level enumeration fallback, triggered by "no headings BELOW the document's root title"** (L-D1). `# Start Up Tasks` no longer suppresses it, so C19's seven items follow from C13.
     - **Item anchors slug from the item's bold label**, like headings (`#item-civitas-governance-health-check`), and fall back to position only when an item has no label (A1). *(Positional anchors renumber on insertion and re-open every later record.)*
  - **Degenerate**: no headings below the title, and no numbered enumeration → one unit, `#doc`, `degenerate: true`, a declared state.
- **Whitespace-only gaps attach to the PRECEDING unit.** A whitespace-only `#doc:preamble` attaches to the first unit. **No unit is whitespace-only.** *(Otherwise every blank line after a heading becomes a dispositionable empty unit.)*
- **Duplicate slugs** get a `-2` suffix, which is order-dependent. **Zero duplicates exist today** (Lina, measured). This is latent, and recorded.
- **Invariant**: the byte-identical join, asserted inside `partition()` with a throw.
- **Frontmatter entry tree** (L-D4): `entryTree(frontmatter) → PartitionTree`, whose nodes are **field paths**. Examples: `routes`, `routes.docs`, `routes.docs[<id>]`, `commands[<id>]`, `ambient[<docid>#<section>]`, `writeScope`, `preflight`, `knowledgeBases[<id>]`, `toolSubset`, `skills[<id>]`.
  - **Entries key by their stable identity** (`id`, `cmd`, doc-id + section), and by index only when they have none. This is the same rule as the enumeration-item labels.
  - **Containment is structural in the same `nodes` map**, never by string prefix. So 11.4's `isDescendantOrSelf` works identically on both trees.
- **Golden fixture** gains: a title-only numbered document, a frontmatter block with `^# ` comments, a `#doc:preamble`, and whitespace-gap cases.

#### C14. The span function — `spans.ts` (Req 10.S, 10.8a Constraint 1; Lina L-D4)

```ts
function emitSpans(acc, source: { file: string; body: string; frontmatter: YamlDoc },
                   profile: 'steward'|'consumer', dispositions?: Dispositions, overlay?: Overlay,
                   renderFrontmatterEntry: (path: string) => string /* adapter-supplied rendering */): Rendered;
```

- **Body units**: as in the draft. Retained → `passthrough #<anchor>`. Re-pointed → `render`, **`source` = the canonical origin `#<anchor>`**. Omitted → no span.
- **Frontmatter entries** (NEW): each rendered entry gets its own span.
  - **`source: canonical/agents/<a>.md#frontmatter:<path>`** (op `render`, or `resolve` + `mode: embed` for ambient embeds, whose content comes from `packageRoot/governance`).
  - **Shared-catalog members** → `source: canonical/shared/shared-catalog.yaml#<id>`.
- **Adapters supply only the per-target RENDERING of an entry.** They never construct spans or decide provenance. The `cc.ts` L244–247 / `kiro.ts` L322–325 inline sites, **and the frontmatter-section rendering loops in both adapters**, are replaced by calls through `emitSpans`.

#### C15. The 11.4 derivation checker (Req 11.4; Stacy S-D-B4)

- **Unchanged logic, wider domain.**
  - **DERIVATION**: `D` = spans whose source names this file and whose anchor or path satisfies `tree.isDescendantOrSelf(x, S)` **against the body tree or the entry tree**. Empty → `FAIL_NO_DERIVATION`, a failure and not routed.
  - **HONEST NAMING**: at least one span in `D` lies within the destination.
- **The per-target guard (input 21)**: **ONE file, `semantics-guard.test.ts`, with `describe.each(targets from consumer-profile.yaml)`**. **Test ids: `semantics-guard.test.ts › <target>`** (reconciled with the no-second-list rule; S-D-B4).
- **The two-sided per-target bite** (S-D-B4) — the only observation that proves routing through adapters:
  - mutate **`cc.ts`'s call site** so it bypasses `emitSpans` with an inline single span → **`› cc` RED, `› kiro` GREEN**;
  - the symmetric mutation on `kiro.ts` → **`› kiro` RED, `› cc` GREEN**.
  - Both logs are committed.
  - The shared-function mutation stays, as the **unit twin's** bite (`spans.source-origin.test.ts`), because it turns every target red and so cannot prove per-target routing.
  - *(Lina is asked in her packet whether the call-site mutation is cheap once C14 lands.)*

#### C16. Operative-set records (Req 11.6.5d; Stacy S-D-B1, S-D-B2, S-D-A3, S-D-A4)

```yaml
# canonical/operative-sets/stacy.yaml
source: canonical/agents/stacy.md          # body units, via splitFrontmatter → partition
owner: stacy
confirmer: stacy                           # C1: owner, unless owner == profile author (thurgood) → counterpart seat (stacy);
                                           #     both collapse onto one agent → peter
units:
  "#the-owed-set-pipeline":
    canonicalHash: sha256:…
    items:
      - id: owed-set-1
        kind: step
        label: "Stage 1a"                  # HUMAN LABEL ONLY — never matched
        text: |                            # THE COMPLETE OPERATIVE TEXT — the strict comparand (S-D-B2)
          Stage 1a — every spec with post-ratification merge activity on main's first-parent line …(full text)
    confirmation: canonical/profiles/consumer/confirmations/stacy.md#the-owed-set-pipeline
```

- **Example corrected to obey C1** (S-D-B1). For `thurgood.yaml`, `confirmer: stacy` (owner == profile author).
- **Both `confirmer:` and C17's `signer:` are mechanically checked against the C1 function** of (owner, profile author). Each has a catalog string.
- **Frontmatter entries have no operative-set records.** An entry is **atomic**: one route, command or scope value is exactly one operative item. So triviality does not apply at entry grain. Absence takes a disposition (11.3.5); re-pointing takes 11.4. *(Stacy decides in her packet whether that reading is inside G2's scope.)*
- **`operative-set-freshness`** fails when a canonical unit's hash differs from its `canonicalHash`.
  - **Bite** (S-D-A3): edit a canonical unit without re-confirming → red.
  - **Registration**: it runs as a sweep **inside the existing 122 diff-guard check** (no new CI context). If the tasks round finds that the diff-guard is not a required context (`verify-gate-registration.sh`), it becomes its own context, **and Stacy's ARMING event fires when it arms.**
- **Seat authentication, stated at its true reach** (S-D-A8):
  - the `confirmation:` note's existence and **internal consistency with the record** (item ids, hashes) are auditable;
  - **which seat wrote it is NOT establishable under one git identity**, and Stacy's audit does not close that.
  - **Adopted as design** (her option (i)): **every C1-carve-out artifact** (confirmations and signatures on Thurgood-owned sources) **lands in its own PR with `Agent: stacy`**, separate from profile-authoring PRs. That is separation, not authentication.
  - **Recorded as an open obligation** (her option (ii)): **one-time re-attestation of interim records when 125-B U3 lands.**
  - *Peter may strike either of these.*

#### C17. Dispositions, overlays, signatures, valves (Reqs 11.2, 11.5, 11.6.5b; Stacy S-D-B1, S-D-A2; Lina L-D4, L-D6)

```yaml
# canonical/profiles/consumer/stacy.dispositions.yaml
body:
  "#the-owed-set-pipeline":
    disposition: re-pointed
    destination: "#the-owed-set-pipeline"
    removals: [ { text: "…/.kiro/docs/ballots/2026-09-19-…", cites: subtraction-1 } ]
    signature:                                     # present iff ROUTED
      signer: stacy                                # C1: owner of THIS charter (stacy) ≠ profile author → stacy (S-D-B1)
      canonicalHash: sha256:…                      # VALVE 1
      renderedHash: sha256:…
      assent: { surviving: [owed-set-1, owed-set-2, owed-set-4] }   # VALVE 2 — itemized
      evidence: canonical/profiles/consumer/signatures/stacy.md#the-owed-set-pipeline
frontmatter:                                        # NEW (L-D4)
  "commands[complete-task-tooling]": { disposition: no-consumer-counterpart, cites: subtraction-1 }
  "writeScope":                      { disposition: re-pointed, destination: "frontmatter:writeScope" }
  "ambient[process-development-workflow#task-completion-workflow]": { disposition: retained }
# canonical/profiles/consumer/_shared.dispositions.yaml — shared-catalog members once, signed by each member's `owner:`
```

- **C1, corrected at the RULE level** (S-D-B1 — the draft's comment encoded a converse rule, *"the owner may not sign their own charter's rows."* It was a misreading, and it is corrected here, not only in the example):
  - **the signer is the charter's owning agent**;
  - **except where the owner is the profile author (Thurgood) → the counterpart verification seat (Stacy)**;
  - both roles collapsing onto one agent → Peter.
  - For shared-catalog members, "owner" is the member's `owner:` field. `runContext: this-repo` members are pre-flagged for clause (i).
- **Overlay entries pin the canonical text they re-ground** (L-D6, **adopted verbatim**): `## @unit #<anchor> @ sha256:<canonicalHash>` (frontmatter overlays: `## @entry <path> @ sha256:…`). **`derive()` REFUSES in steward CI when the pinned hash differs from the current canonical unit.** *(This is what makes the overlay derived rather than hand-maintained: an edit to a re-pointed unit forces re-authoring the overlay, even when the unit would clear C18 mechanically.)*
- **Ambient embeds take `retained | superseded-by | no-consumer-counterpart` — not `re-pointed`** (DD19). Re-grounding an embedded governance section means editing that owner's doc, which is a governance change.
- **Checks that previously had no string** (S-D-A2):
  - **a stale signature** (either hash differs from current) **fails** — `signature on <anchor> is stale — its canonical or rendered content changed since signing; re-sign or refuse`;
  - **a bare signature** (no `assent.surviving` and no `refuse`) **fails** — `signature on <anchor> carries no itemized assent — list the surviving item ids or refuse`.
  - Both have test rows.
- `repo-bound-in-entirety` stays a named rejected term.

#### C18. The triviality floor (Reqs 11.3, 11.6; Stacy S-D-B2, S-D-A5, S-D-A6)

- **Entry set, now mechanical** (S-D-A5): **every body unit whose rendering is not a byte-identical `passthrough`** of its canonical unit.
  1. **Domain restriction**: zero C16 items → inapplicable; (iii) covers removal.
  2. **The one-sided floor, strict comparand = the item's COMPLETE `text`** (S-D-B2). It clears mechanically **iff** `strictVerbatimRetained / |items| ≥ 1/2` **AND** no removal cites subtraction 1–4.
     - **Restated soundness claim**: matching complete item text **cannot count an item whose operative remainder was deleted**, because the remainder is part of the comparand. So the floor over-counts only if the complete item text is retained verbatim, which is **textual retention** — exactly what a mechanical pass claims, no more (S3-A2). *Label retention (clause (c)) is now unreachable inside the mechanical half.* Exemplar Lina-2 (titles kept, bodies cut) scores 0/7 and routes.
     - **The floor can under-count** (a re-grounded item routes). That is the intended one-sidedness.
  3. Otherwise → **ROUTED** → a C17 signature row, judged under the semantic correspondence rule.
  4. **Hard floor, population defined** (S-D-A6): a charter in which **every body unit with a non-empty C16 item set** is `no-consumer-counterpart` → **FAIL**. Preambles with zero items cannot be used to evade it.
- **Not built until G1 returns HOLDS.**

#### C19. The always-set — per-target member-file emission under path (B) (Req 12; Lina L-D3)

- **Counterpart (12.1a)**: the **shipped** identity doc. The eight docs ship by explicit path (C5); personal-note ships as its template. 11.3.3 is told which is which, via `counterpart:` in the dispositions file.
- **Transform at embed time, as 12.1a states**: the consumer lane runs **`derive()`** (C22) over the shipped doc + `always-set/<id>.overlay.md` + `.dispositions.yaml`, **at emit time**. Steward CI runs the **same `derive()`** to render the guarded surface and to enforce the stale-overlay refusal.
- **Per-target delivery — the ONLY target-varying part of the lane**:

| Target | Member files | Always-mechanism |
|---|---|---|
| **CC** | `.claude/identity/<id>.md` (derived content, spans per unit) | a `CLAUDE.md` **marker region** of `@.claude/identity/<id>.md` lines |
| **Kiro** | `.kiro/steering/<id>.md`, with `inclusion: always` frontmatter prepended by the adapter | each agent config's `resources` array points at those files |

- New adapter method **`emitIdentityMembers(members, ctx)`**, called under the consumer profile. **The steward profile keeps today's behavior** (CC imports repo paths; Kiro `[]`), because the steward repo has the files and the consumer does not.
- **Personal note**: a template member. The always-layer references `.designerpunk/personal-note.local.md`. Absent, or **all slots still `TODO`**, → treated as absent, with Req 13's warning (Leonardo A14).

#### C20. The consumer emission lane — shipped inputs only (Reqs 13, 14.1–14.3, 15A.1; Lina L-D5; Leonardo A1, A8)

- **`emitConsumer({ packageRoot, consumerRoot, target, mode: 'birth'|'attach'|'reference'|'sync' }) → { files, keys }`** reads **only**:

| Input | Shipped path |
|---|---|
| derived charters (body + frontmatter) | `dist/consumer-canonical/agents/<a>.md` |
| derived shared substrate | `dist/consumer-canonical/shared/{always-set,field-dispositions,shared-catalog,skills-map}.yaml` |
| skill trees (filtered) | `dist/consumer-canonical/skills/**` |
| identity docs + overlays | `.kiro/steering/<eight>.md`, `templates/personal-note.template.md`, `dist/consumer-canonical/always-set/*` |
| tool registry | **`dist/mcp/tool-manifest.json`** (`registry.fromManifest`) — never live introspection |
| ambient embed content | `packageRoot/governance` (Ada D-A8: confirmed) |
| outputs | `consumerRoot` |

- **No attribution sidecars are emitted.** Degradation in the consumer profile = warn and exit 0 (13).
- **The returned file and key list is what `init` and `attach` record in the manifest** (C7).
- **Compile lane**: `build:generator` (esbuild) → `dist/generator/consumer-entry.js`, run under plain `node` and included in `prepack`.
- **`designerpunk attach --target=<cc|kiro>` — "attach a harness (agents + MCP config + approvals)"** (Leonardo A1). The verb **never appears without its object**:
  - in help text, in the born-repo refusal, and at the install doc's first use;
  - it is the **fifth lifecycle verb** in `vocabulary.ts`;
  - it is taught in the joining section **and** in a founder-facing "add a second harness" section;
  - **re-running it on an attached target regenerates, is safe, and follows 19.8's collision rule.**
- **Modes**:
  - **born** → full emission;
  - **`--reference`** (unborn only) → **MCP config + approvals for the docs and application servers, no agents, no birth.** This is the CONSUME posture's mechanical wiring, and the target of Leonardo A8's refusal hint;
  - unborn without `--reference` → the refusal (catalog) naming both paths;
  - partial → the partial message.

#### C21. Legacy-path deletion + sweep (Req 14.5–14.7) — unchanged; Lina confirmed it faithful to L-B5.

#### C22. Q5 — derivable, with the stale-overlay refusal (Req 14.8, 14.9; Lina L-D6, L-D4, A2)

- **`derive(source, overlay, dispositions) → derived`**:
  - one function;
  - it covers **body and frontmatter** (L-D4: without the frontmatter half, the shipped consumer canonical would carry our commands and write scope);
  - **it refuses on any overlay entry whose pinned hash ≠ the current canonical unit or entry.**
- **Two ruled call sites**:
  - **prepack**, for charters and the shared substrate (Q5: *what ships SHALL be derived*) → `dist/consumer-canonical/`;
  - **consumer emit time**, for always-set members (12.1a: *transform at embed time*).
  - Steward CI renders both into `canonical/_consumer-output/` (charters **once**, under `_canonical/`).
- **Verdict — DERIVED.** *(Lina: "with that fix, my verdict is DERIVED, and I would sign it." Her signature is requested in her packet.)*
- The Q5 residual is unchanged: consumer regeneration is not reproducible against our lock hashes, and that is correct.

---

### UNIT 3 — Onboarding

#### C23. The install doc (Reqs 15, 15B, 22.2; Leonardo Le-D3, A1, A15)

**THE STEP UNIT, defined once** (Le-D3, adopting his proposal with two clarifications):

> **One step = one numbered item in the doc's path list = one user action or one command.** A **conditional** step is counted only in the variant that takes it. **A harness prompt answered during a step belongs to that step** (for example, approving MCP servers during the restart). **Reading is not a step.**

| Path | Numbered steps | Count |
|---|---|---|
| **founder** (BECOME) | 1 `npm install @3fn/core` · 2 `npx designerpunk init --target=<cc\|kiro>` · 3 `npx designerpunk generate` · 4 fill in your personal note · 5 restart your agent session (approve DesignerPunk's MCP servers if asked) | **5** |
| **joining** (same harness; agent layer committed per DD1) | 1 clone · 2 `npm install` · 3 `npx designerpunk generate` · 4 fill in your personal note · 5 restart (approve if asked) | **5** |
| **joining-cross-harness** | joining + `npx designerpunk attach --target=<yours>` after step 3 | **6** |
| **reference-no-init** (CONSUME) | 1 `npm install @3fn/core` · 2 `npx designerpunk attach --target=<cc\|kiro> --reference` · 3 restart (approve if asked) | **3** |

```yaml
path-steps: { founder: 5, joining: 5, joining-cross-harness: 6, reference-no-init: 3 }
```

- *"Lockfile or sync"* (15A.1) is **not** a joining step. Under DD1 the lockfile is committed, so `npm install` installs the founder's version. Version drift belongs to the update lifecycle (§ 4), where `sync` is taught.
- **U5's 22.2 assertion counts numbered items in each path list** against this front-matter. It counts nothing else, and never a run's steps.
- **Section order** is unchanged from the draft. It adds § "Adding a second harness" (A1) after § 6.
- **15B.3's "not read as each other" property is evidenced by persona (c)'s trio run** (harness-fluency axis), named in C30. **The `vocabulary.ts` test establishes consistency (15B.5) only** (A15, R26.8).

#### C24. The joining path and the commit policy (Req 15A; Leonardo Le-D2, A5, A6, Le-D4)

**Joining path** = C23's joining rows.

**Commit policy** (`docs/consumer/COMMIT-POLICY.md` + the `.gitignore` managed block):

| REPO STATE — commit | REGENERATED or LOCAL — do not commit |
|---|---|
| `designerpunk.config.ts` · `src/tokens/**` · `src/components/**` · `product/**` · **`specs/**`** (A5) · `package.json` + lockfile · `.designerpunkignore` · test configs · **`designerpunk.manifest.json`** · MCP configs (key-grain regions) · generated agent artifacts **and identity member files** for every attached target · `CLAUDE.md` / `.claude/settings.json` (your files, with managed regions or keys) · **`.gitignore` (your file, with a managed block)** · **generated platform output (default — DD1, derived)** | `token-index/` · **`.designerpunk/`** (local only: your personal note) |

- **`.designerpunk/` is now LOCAL-ONLY** (A6): it holds only per-user files, so ignoring it whole is safe. The manifest moved to the repo root.
- The `.gitignore` block carries, **commented, with its reason**:
  > `# uncomment if your build/deploy runs 'npx designerpunk generate' — then platform output need not be committed`
- **U5 join runs**: TWO (C8(b)), each from a committed born-repo fixture, cloned fresh, with the opposite target.

#### C25. Starter specs — unchanged (DD15)

- **The CI-needs spec gains a minimal-core need: "committed platform output matches `generate`"**, with a bite recipe (edit a token without regenerating → the check goes red). This is the counterweight to DD1's derived default.

#### C26. The personal note (Req 18; Leonardo A14)

- **The template personalizes into `.designerpunk/personal-note.local.md`.** On a TTY, init prompts. Off a TTY — the common case, since the founder's agent runs `init` — it writes `TODO` slots.
- **`init`'s output names the file and says what it is for**, by name.
- **A note whose slots are all `TODO` is treated as absent** (C19), so agents never read an unfilled template as instructions.

#### C27. `init` UX (Req 19; Leonardo A2, A12, A13)

- **Collision strings are truthful** (A13): `skipped: jest.config.js (already exists) — the DesignerPunk jest preset is not applied; to test your own forked components with @3fn/core/testing, add ...require('@3fn/core/jest-preset') to your config`.
- **The named-default notice** (A2) is printed on bare `init`.
- **`product/` tree + worked example screen**, with a **validity guard** (A12): the scaffolded tree indexes under the product MCP with **zero errors and zero unresolved references**. Bite: break a reference in `example-home.yaml` → red.

---

### UNIT 4 — Content policy

#### C28. Banner predicate + presence guard (Req 20) — unchanged.

#### C29. U1b backward check + release notes (Req 21) — unchanged (DD16).

---

### UNIT 5 — Validation & closeout

#### C30. The persona trio (Reqs 22, 23, 25.1, 25.5; Leonardo Le-D4, A15; Stacy S-D-A9)

- **Run records** (spec-scoped, `.kiro/specs/123-consumer-distribution/validation/trio-<n>-<persona>.md`; recurring per-release ones go to `docs/releases/<v>/`) carry everything the draft listed, **plus**:
  - **`first-MCP-load:` — what the harness asked for, verbatim** (Le-D4);
  - the C8(c) observations;
  - **for persona (c), whether 15B.3's distinction held** (A15).
- **Budgets** (S-D-A9):
  - they are **never wall-clock**;
  - they are **runaway guards set at ≥ 3× the declared `path-steps` for the persona's path** (in agent turns), and **the value is recorded**;
  - **`budget-exhausted` is recorded as a FINDING (the run did not complete), never a pass.**

#### C31. Re-grounding conformance (Req 24) — unchanged, except that **(v)'s mechanical half is listed as deterministic only if G2 returned PASSES over the domain its scope line names** (see Gates).

#### C32. Closeout (Req 25) — unchanged, plus **C8's install-doc edit to the observed approval truth**.

---

## Gates and sequencing (Stacy S-D-B3, S-D-A7; SLOT P2)

```
U2 step 1  splitFrontmatter + partition (C13) + golden bite (Bite 1)
U2 step 2  emitSpans (C14) over body AND frontmatter + adapter consolidation + unit twin
U2 step 3  exemplar operative sets (C16), confirmed under C1 — A, B, C(c1), C(c2), D, E, F, Lina-1, Lina-2
           (Stacy confirms A, B, C, D, E as owner; G1's record discloses it in the closed negative form — S-D-A11)
U2 step 4  ══ G1 — C3 FALSIFICATION (Stacy) ══
             HOLDS        → continue
             BREAKS       → C3 returns to its owner (Thurgood); rework; G1 RE-RUNS. U2 CANNOT BE ACCEPTED while G1 stands at BREAKS.
             NOT-RUNNABLE → treated as BREAKS
             REPEATED BREAKS → SLOT P2:
               (P2-a) "no mechanical floor": C18's clause 2 is removed; EVERY unit in the entry set ROUTES; labelled in 24.3
                      as "no mechanical triviality floor — all re-grounded units human-judged"; volume rises; never clears wrongly
               (P2-b) "U2 waits": no exit; U2 remains open until a G1 HOLDS
U2 step 5  triviality (C18) + dispositions/signatures (C17), body + frontmatter + shared + always-set
U2 step 6  derivation (C15) + two-sided grain guard (Bite 2) + TWO-SIDED PER-TARGET bite + stale-overlay refusal bite
U2 step 7  full consumer rendering (C12, C19, C20) — all 8 agents, identity members per target; first-render routing
U2 step 8  ══ G2 — PASS FOUR (Stacy; author recused) ══
             SCOPE (both halves, S-D-A7): (1) attack (a) verbatim; (2) the check reads the committed operative-set
             record, never a rendering-supplied denominator (11.6.5d)
             DOMAIN LINE (new): the verdict names which domains it exercised — body / frontmatter / always-set members —
             and any domain not exercised is written "not exercised", never implied
             PASSES → (v)'s mechanical half joins 24.3's deterministic list, FOR THE DOMAINS NAMED
             FAILS  → Fork A demotion edit
             NOT-RUNNABLE → treated as FAILS — BUT a G2 blocked by G1 BREAKS IS NOT NOT-RUNNABLE (S-D-B3):
                            NOT-RUNNABLE is for substrate proved unbuildable, never for a schedulable upstream gate
```

- **Why the "not NOT-RUNNABLE" clause matters**: without it, a G1 BREAKS could drain through G2's NOT-RUNNABLE → FAILS → Fork A into an accepted U2 **with C18 never built**, and a green acceptance table.
- **Frontmatter in G2's scope** (Lina's [@STACY] question) — **proposed**: **inside G2**, as a frontmatter analogue of attack (a). Empty `commands[<id>]` and point its destination at a sibling entry. That should be rejected by the entry-tree containment exactly as the body case is. **Stacy decides in her packet.** Either way, the domain line keeps a body-only PASS from being read as charter coverage.
- **MIDPOINT (confirmed U2)**:
  - **Condition 1**: U2's merge is the first-render release. Its C2 and assent rates are recorded as ***first render — not a baseline***.
  - **Condition 2**: the MIDPOINT pass audits that each G1/G2 branch was **executed and evidenced**, never the verdict content.
  - **Two records**: MIDPOINT + RELEASE, never merged.
- **Every bite runs isolated from C6**, under `tools/agent-generator/__fixtures__/`.

---

## Data Models

```ts
type BirthState = 'born' | 'partial' | 'unborn';
type PartialCase = 'config-no-tier' | 'package-mode-config' | 'tier-no-config' | 'manifest-only';

interface Unit { anchor: string; parent: string | null;
  kind: 'heading' | 'preamble' | 'doc-preamble' | 'enumeration' | 'degenerate';
  startLine: number; endLine: number; text: string; }
interface Entry { path: string; parent: string | null; value: unknown; }       // frontmatter entry tree

interface AttributionSpan { lines: [number, number]; op: 'resolve'|'render'|'passthrough'; source: string; mode?: 'embed'; }
// source forms: '<file>#<anchor>' | '<file>#frontmatter:<path>' | 'canonical/shared/shared-catalog.yaml#<id>'
//             | 'consumer-profile:<agent>:<id>' | 'id:<doc>#<section>'

interface OperativeItem { id: string; kind: 'obligation'|'step'|'enumeration'|'route'|'command';
  label?: string /* never matched */; text: string /* complete; the strict comparand */; }

type Disposition = 'retained' | 're-pointed' | 'superseded-by' | 'no-consumer-counterpart';
interface Signature { signer: string; canonicalHash: string; renderedHash: string;
  assent?: { surviving: string[] }; refuse?: 'should-re-point'; evidence: string; }

interface Manifest { version: string; installedVersion: string; contractHash: string;
  attachedTargets: Array<'cc'|'kiro'>;
  entries: Record<string /* path | path#region | path#key */, { hash: string; grain: 'file'|'region'|'key' }>; }

type FileClassification = 'new' | 'updated-safe' | 'conflict' | 'unchanged' | 'removed'
                        | 'deleted-by-you' | 'untracked-new';
type MigrationVerdict = 'unmodified' | 'modified' | 'cannot-tell';

type DerivationVerdict = 'VERIFIED' | 'FAIL_NO_DERIVATION' | 'FAIL_DISHONEST_NAMING';
type TrivialityOutcome = 'INAPPLICABLE' | 'CLEARED_MECHANICAL' | 'ROUTED';
type G1Verdict = 'HOLDS' | 'BREAKS' | 'NOT-RUNNABLE';
type G2Verdict = 'PASSES' | 'FAILS' | 'NOT-RUNNABLE';   // never NOT-RUNNABLE on account of G1
```

## Error Handling — the loud-failure catalog (exact strings)

| Condition | Message |
|---|---|
| `init` in a born repo (A7) | `this repo already has a design system (<root>) — init is the birth event and runs once. To join it: npm install → npx designerpunk generate → restart your agent session (approve DesignerPunk's MCP servers if asked). Using a different agent tool than this repo was set up for? Also run: npx designerpunk attach --target=<cc\|kiro> to attach a harness (agents + MCP config + approvals). To deliberately re-scaffold: npx designerpunk init --re-scaffold` |
| partial: `config-no-tier` | `found designerpunk.config.ts at <root> but no DesignerPunk token tier at <tokenSource> — this repo looks partly initialized. Refusing rather than guessing. Inspect it, or complete it deliberately: npx designerpunk init --re-scaffold` |
| partial: `package-mode-config` | `designerpunk.config.ts at <root> has no tokenSource — that is package mode (DesignerPunk's reference tokens), not a design system of your own. To make one yours: npx designerpunk init --re-scaffold` |
| partial: `tier-no-config` (MCP + `generate`) | `found a DesignerPunk token tier at <root>/src/tokens but no designerpunk.config.ts — refusing to generate or serve DesignerPunk's reference index as yours. Restore the config, or run: npx designerpunk init --re-scaffold` |
| partial: `manifest-only` | `found designerpunk.manifest.json at <root> but no config or token tier — the design system files are missing. Restore them from version control, or run: npx designerpunk init --re-scaffold` |
| bare `init` default notice (A2) | `no --target given — set up for Claude Code (the default). Using Kiro? npx designerpunk attach --target=kiro` |
| `attach` in an unborn repo (A8) | `no design system here. To create one: npx designerpunk init. Only reading DesignerPunk's docs and components? No init needed: npx designerpunk attach --target=<cc\|kiro> --reference` |
| born, token index absent or empty | `no token index in this design system (<root>/token-index is absent or empty) — run 'npx designerpunk generate'` |
| explicit `TOKEN_INDEX_DIR` missing | `TOKEN_INDEX_DIR is set to <path>, which is absent or empty — unset it, or run generate` |
| legacy `core/` level | `warning: <root>/src/components/core/ holds pre-123 copies of DesignerPunk components — they override the package's versions. Run 'npx designerpunk sync' for the migration report` |
| name contract — missing (A9) | `components now expect token '<name>' — <declared use> (used by <Components>). Add it to your set in <your semantic tier path>. Your tokens are yours; DesignerPunk never adds to them. DesignerPunk's value, for reference: <resolved value> ('<dp token name>' in DesignerPunk's language). See: install doc § "When sync reports a missing token".` |
| name contract — cannot check | `cannot check the name contract — no generated web token output found at <outputDir>. Run 'npx designerpunk generate' first. (This is not a clean report.)` |
| type contract changed | `the token type contract changed (removed: <X>; added: <Y>). Run 'npx tsc --noEmit' — fix each file it names; removed members are listed above.` |
| migration — modified copies (Le-D1(3)) | `these <N> modified copies now override the package's <names> and will not receive updates. Keep them as your forks, or move them with 'sync --migrate-components' (relocates modified copies to src/components/<Name>/).` |
| migration — cannot tell | `cannot tell whether <path> was modified — the package content for version <v> could not be retrieved. Review before removing.` |
| `deleted-by-you` | `<path> was generated earlier and you deleted it — not re-adding. To restore: npx designerpunk sync --restore <path>` |
| `untracked-new` | `<path> would be generated but was never recorded — not adding it on first sync. To add it: npx designerpunk attach --target=<t>` |
| managed region — markers missing | `the DesignerPunk-managed region in <file> is missing its markers — not rewriting the file. Restore the markers (see install doc § "Your agent layer") or re-run attach` |
| managed region — edited inside | `you edited inside the DesignerPunk-managed region of <file> — those edits will be replaced. Move them outside the region; not applying without --apply` |
| managed manifest pruned (D-B6) | `no longer managing <N> files under <paths> — under the current contract they are yours (not removed from disk)` |
| rejected disposition term | *(unchanged)* |
| operative set stale | `canonical unit <anchor> in <file> changed — its operative set must be re-confirmed by <confirmer>` |
| wrong confirmer | `operative set for <file> declares confirmer <x>; the C1 rule requires <y>` |
| **wrong signer** (S-D-B1) | `signature on <anchor> is by <x>; the C1 rule requires <y> (owner <o>, profile author <p>)` |
| stale signature (S-D-A2) | `signature on <anchor> is stale — its canonical or rendered content changed since signing; re-sign or refuse` |
| bare signature (S-D-A2) | `signature on <anchor> carries no itemized assent — list the surviving item ids or refuse` |
| **stale overlay** (L-D6) | `overlay for <anchor|entry> re-grounds canonical text sha256:<pinned>, but the current canonical is sha256:<now> — re-author the overlay; refusing to derive` |
| partition invariant | *(unchanged)* |
| derivation, no span | *(unchanged)* |
| consumer degradation | *(unchanged; warning, exit 0)* |
| publish rail | `FAIL[version]: …` / `FAIL[host]: …` (C9) |
| unannotated tool (A3) | `tool '<name>' in <server> has no readOnlyHint — every registered tool must declare it (true or false)` |

## Testing Strategy

- **Jest, functional lane, no timing assertions.** Every bite names its test id and runs isolated from C6.

| Bite | Test id | Mutation | Expected |
|---|---|---|---|
| 10.G Bite 1 | `partition.golden.test.ts` | collapse to `##` / partition the file instead of the body / trigger the fallback on "no headings" | differs from the hand-authored list |
| 10.G Bite 2 | `grain-guard.two-sided.test.ts` | collapse to `##` | the honest `###` re-pointing is REJECTED |
| **10.S per-target, two-sided** | `semantics-guard.test.ts › cc` / `› kiro` | cc.ts call site bypasses `emitSpans` | **cc RED, kiro GREEN** (and the symmetric pair) |
| 10.S twin | `spans.source-origin.test.ts` | shared function sources a re-grounded unit to the profile | red |
| **frontmatter derivation** | `derivation.frontmatter.test.ts` | empty `commands[x]`, destination = a sibling entry | FAIL_NO_DERIVATION |
| **stale overlay** | `derive.stale-overlay.test.ts` | edit a re-pointed canonical unit, leave the overlay | derive refuses |
| **operative-set freshness** | `operative-set-freshness.test.ts` | edit a canonical unit without re-confirming | red |
| **signer / stale / bare** | `signatures.test.ts` | wrong signer; hash drift; no assent | three reds |
| 3.6 brand | `consumer-integration › brand-survival` | `Symbol()`; delete `progress.ts` | red; disappears |
| **C4 over-rewrite** | `consumer-integration › over-rewrite arbiter` | restore the regex | tsc red |
| **C2 cases** | `bornRepo.test.ts` + guard cases | per the C6 table | per the C6 table |
| 5A | `sync.name-contract.test.ts` | remove a referenced semantic name from the fixture's generated CSS | reported |
| **name-contract build** | `build-name-contract.test.ts` | add a `var(--x)` to a component CSS | appears in `name-contract.json`; the bundle ⊆ src cross-check holds |
| **type contract** | `sync.type-contract.test.ts` | change a `PrimitiveToken` field | `contractHash` changes → reported |
| **sync classes** | `sync.classify.test.ts` | first sync with a deleted generated file; attach then delete; de-managed manifest entries | `untracked-new` not applied; `deleted-by-you`; pruned, not `removed` |
| **migration** | `sync.migration.test.ts` | edited-before-first-sync copy; offline fetch | `modified`; `cannot-tell` |
| **tool manifest** | `tool-manifest.test.ts` | drop a `readOnlyHint` | red |
| **product scaffold** | `init.product-scaffold.test.ts` | break a reference in `example-home.yaml` | red |
| 13 | `consumer-entry.degradation.test.ts` | delete a resolvable member | warning, exit 0 |
| 6 | `scripts/__bites__/verify-publish-rail.*.log` | three bites (C9) | exits 10 / 10 / 11 as specified |

- **The golden list** (DD6, S-D-A1):
  - hand-authored `expected-units.json` with a `_provenance` key;
  - the test **rejects `__snapshots__/` and any `toMatchSnapshot` / `toMatchInlineSnapshot` call in its own source** (inline snapshots closed);
  - **what does the protective work is the reviewed diff**, because a regenerated list under the collapse mutation shows as a visibly shorter list. The provenance key *declares* hand-authorship; it cannot prove it.

## Design Decisions

- **DD1 — Commit policy content (input 16)** — the table is at C24.
  - **Platform output: COMMITTED BY DEFAULT — DERIVED, and OVERTURNABLE at the sitting** (Leonardo Le-D2; recorded like L3-B2). **The derivation**:
    - (1) Q3's ruled trio includes **persona (b), a static site with no build tooling**, so she is a ruled user, not an edge case;
    - (2) under the ignore default, her deploy ships with **no token CSS, silently, in production**, and more generally so does every clone-and-deploy pipeline that does not know to run `generate`;
    - (3) under the commit default, the failure mode is **visible** (diff noise, possibly stale output), and it is caught by C25's new minimal-core CI need;
    - (4) this spec's consistent principle is **loud over silent** (fail-loud posture split, declared degradation, report-never-overwrite).
    - A default that fails a ruled persona silently is inconsistent with (1) and (4).
  - *Residual: teams with real build pipelines carry committed generated CSS they must un-commit (the commented `.gitignore` line makes that one edit), and committed output can go stale — the CI need is the guard, and it only guards teams that adopt it.*
  - *Agent artifacts and identity member files: committed* (reasons as before).
- **DD2 — Reuse Spec 111's machinery; the change is in WHAT is managed and at what GRAIN** (corrected per Lina A4). *Residual: region and key grain are three new units (extractor, keyed manifest, splicing applier) inside a classifier built for whole files. That surface is the largest new sync risk, and it is sized in tasks.*
- **DD3 — Birth detection**: start at cwd, skip `node_modules`, test then stop at `.git`, DesignerPunk-shaped signals. *Residual: the monorepo shape reads unborn from the app, with explicit env as the documented escape. A textual barrel check can be fooled by a deliberately mimicking repo — accepted; mimicry is not a stranger's accident.*
- **DD4 — `attach`, never without its object** (Leonardo A1: keep it, on that condition). *Residual: an unfamiliar verb costs one lookup.*
- **DD5 — `--re-scaffold` kept.**
- **DD6 — Golden list**: hand-authored, snapshot matchers banned (directory and inline), the reviewed diff does the work. *Residual: a correct splitter change costs a manual list edit; that friction is the point.*
- **DD7 — Per-target guard, one file, `describe.each`, bitten two-sided.** *Residual (S-D-A10): whether the call-site mutation is cheap depends on C14's final shape, so Lina confirms. If it is not cheap, input 21's property stays asserted-but-unbitten, and the design must then say so rather than claim it.*
- **DD8 — Per-harness approval: key-grain emitters, trust UNVERIFIED on both targets, observed in U5 by the first-MCP-load field and TWO cross-target join runs.** *Residual: the install doc ships at U3 with harness-agnostic phrasing and is corrected at U5 closeout, so one release carries the less specific instruction.*
- **DD9 — Bare `init` emits `cc`, with the named-default notice.** U3 confirms. *Residual: there is no evidence that `cc` is the persona's majority harness (Leonardo, honest note). The notice makes a wrong guess cost one command.*
- **DD10 — Name-contract CHECK source is the compiled CSS surface; the ATTRIBUTION source is `.schema.yaml tokens:`** (replaces the draft, which named the wrong files and the wrong level). *Residual: web only; native surfaces are unchecked until Kenya and Data specify resolution. The bundle ⊆ src cross-check fails the build if esbuild ever interpolates.*
- **DD11 — Type contract as a content hash of the `.d.ts` surface, with `tsc --noEmit` as the remedy; value guidance adopted, with the resolved value.** *Residual: a hash changes on cosmetic `.d.ts` edits (comments, ordering), producing a report with no member diff. The report then says "no member changes detected — shape or formatting changed"; that is noise, bounded by release cadence.*
- **DD12 — The host assertion augments.** *Residual (S-D-A10): the host pattern hard-codes npmjs's tarball URL form, so a registry host or CDN change false-reds a good release. The failure is loud and the fix is one line, but it lands on release day.*
- **DD13 — One release-recipe and governance ballot in U4.** *Residual: bundling delays everything if one item is contested.*
- **DD14 — `product-mcp-server/src/` not added; the existing server `src/` entries are decided by C5's closure.** *Residual (S-D-A10, replacing "none"): dropping `mcp-server/src/` and `application-mcp-server/src/` loses source maps and debuggability for consumers who step into the servers, and it changes 118's certified surface. That needs a consumer-guard re-certification, which 3.9 provides, and a note in the release changelog.*
- **DD15 — Starter specs at `specs/`.**
- **DD16 — A consumer `CHANGELOG.md`.**
- **DD17 — Req 1.1 subpath DE-SCOPED. Its re-entry trigger is JOINED with 3.2's** (Ada D-A7): a CONSUME flow that runs `generate` without `init` needs `SemanticOverrideMap` and the reference overrides importable, so the two triggers fire together. **Req 1.5**: our component tokens stay behind the component surface. The draft's "resolves against semantic names … exactly the name contract" **was false on the measured artifact** (Ada D-B5) and is replaced by DD10. *Residual: the native resolution model is Kenya's and Data's.*
- **DD18 — Frontmatter is inside the disposition domain, keyed by field path with stable identities** (L-D4). **It was an omission, not an intended limit** — see `[THURGOOD R2]`. *Residual: the frontmatter disposition volume adds to Lina's 3.3× grain price, and ambient embeds alone are dozens per agent. Carry-forward keeps the steady state at churn; the first render is heavier than the draft sized.*
- **DD19 — Ambient embeds cannot be `re-pointed`.** *Residual: an embed whose content is mostly transferable but carries one repo-bound paragraph can only be retained whole or dropped whole. The remedy is a banner or an edit to the owning doc, which travels its owner's normal path.*
- **DD20 — The always-set is delivered as per-target member files** (L-D3). *Residual: two harness layouts (`.claude/identity/`, `.kiro/steering/`) of the same derived content, so a Kiro consumer's `.kiro/steering/` now mixes generated identity files with anything she authors there. Key-by-filename management keeps her files untouched, but the directory is shared.*
- **DD21 — The manifest moved to the repo root; `.designerpunk/` is local-only** (Leonardo A6). *Residual: one more root-level file.*
- **DD22 — `attach --reference` as the CONSUME wiring command** (serves Leonardo A8 and Req 15.3). *Residual: it adds a mode to a verb whose name says "attach a harness" — here to the reference corpus, not to a design system. The help text says so.*

## Open design inputs 16–21 — dispositions (R2)

| # | Input | Disposition |
|---|---|---|
| 16 | Commit policy | **DECIDED** — DD1. Platform output committed by default (**derived, overturnable**); manifest at the root; `.designerpunk/` local-only. |
| 17 | Command names | **DECIDED** — `attach` (always with its object), `--re-scaffold`. |
| 18 | MCP approval | **DECIDED in design (key-grain, readOnlyHint-driven); trust UNVERIFIED on both targets; OBSERVED IN U5** (first-MCP-load field + two cross-target join runs). |
| 19 | 5A widening | **DECIDED** — compiled-CSS name contract (tier filter pending **P1**); `.d.ts` content-hash type contract. |
| 20 | Golden list | **DECIDED** — the inline-snapshot gap closed. |
| 21 | Per-target guard | **DECIDED** — one file, `describe.each`, **bitten two-sided** (Lina confirms the cost). |

## What resisted design-grain specification (round input, not defect)

1. **Cold-harness trust**: observed in U5, not asserted.
2. **Semantic correspondence**: a format and a calibration set; no algorithm.
3. **Seat authentication**: declared, and the note's consistency is auditable. **Authorship is not establishable under one git identity** (restated at its true reach, S-D-A8). Separation by `Agent: stacy` PRs is adopted, and re-attestation at 125-B U3 is an open obligation.
4. **The ½ threshold**: unfalsified; G1 tests it.
5. **Native name-contract resolution**: Kenya and Data.
6. **Monorepo birth detection**: explicit env is the escape.
7. **Migration's fetch-and-re-transform** depends on each historical version's copy transform being knowable. Where it is not, the verdict is `cannot-tell`, by design.
8. Tasks-round items: release count, tripwire thresholds, `.swift`/`.kt`, and the region/key-grain sync sizing.

## Cross-References

Requirement traces are inline. **R1 feedback IDs are cited inline at every changed component**, and dispositions are in `feedback/design.md` § `[THURGOOD R2]`. **This design introduces no new law.** The governance edits ride DD13's ballot, and slots P1 and P2 await Peter.
