# Design Document: 123 — Consumer Distribution

**Date**: 2026-09-26
**Spec**: 123 — Consumer Distribution (the former "121-C")
**Author**: Thurgood (test governance / spec standards / Civitas steward)
**Status**: Design Phase — **DRAFT, awaiting the design feedback round** (sequential gate; `tasks.md` does not open until this round completes)
**Dependencies**: `requirements.md` (30 requirements, 282 ACs — accepted at PR #196, `aabb59fd`, 2026-09-26); `design-outline.md` (settled, PR #194); the Model B identity statement (Peter, 2026-09-26); Specs 111 (sync), 118, 122, 124, 127

---

## Framing obligation, carried from the requirements

> **§ 7.2's re-grounding check has failed falsification twice and is NOT signed off. Pass four is a U2 acceptance gate, and the author is recused.** This document specifies the machinery concretely — the splitter, the span function, the 11.4 checker, the operative-set records, the disposition and signature formats — **and claims nothing about whether it works.** A design that reads as complete is not evidence the check discriminates; that is what the C3 falsification pass (gate G1) and pass four (gate G2) exist to establish. *Traces: requirements.md § "Framing obligation"; Req 11.8.*

---

## Overview

This design realizes the 30 settled requirements. **Requirements are settled; this document decides HOW, never re-opens WHAT.** Every component carries its requirement trace. Decisions the requirements left to design — including the **six open design inputs (16–21)** — are resolved in § Design Decisions (DD1–DD17), each with a rationale and the surviving counter-argument per the fold-back discipline.

**The thesis every component derives from** (Model B, requirements § Introduction): DesignerPunk is an **engine** that births and then continuously runs a design system that is the consumer's own. **`init` is the birth event, once per design system, ever.** The consumer's **language** (tokens) is theirs wholesale from birth; our **updating surface** (components) is consumed by name and keeps flowing; the **name contract** is the one seam, and it reports, never writes.

**Three findings from measuring the substrate while designing** — each changes a component, and each is stated here so no reviewer meets it cold:

1. **`sync` already has a three-way baseline** — Spec 111's `Manifest` records a per-file hash and version, and its `Classifier` distinguishes *new / updated-safe / conflict / unchanged / removed* against that baseline (`src/cli/sync/Classifier.ts`). **Req 5.6's parenthetical — "this requires shipping or recording a baseline, which nothing does today" — was a misreading; the machinery exists and this design reuses it** (C7). *(Correction of a reading, not of the requirement: 5.6's property stands.)*
2. **`sync`'s managed set contradicts the rulings as shipped today.** `MANAGED_DIRS` includes **`src/tokens` and `src/types`** (tier `source`) — so `sync` currently refreshes the consumer's token tier, **against Req 5.8 and the Model B thesis** — plus `.kiro/steering`, `governance` and `.kiro/agents`, which gate 4b stops copying. **And its `new` classification re-adds any package file absent from the project** — the **same resurrection defect Leonardo found in `init`** (L3-B2), one command over. C7 re-scopes it.
3. **Claude Code and Kiro approve MCP tools through different mechanisms.** Kiro reads a per-server `autoApprove` array in `.kiro/settings/mcp.json`; **Claude Code's `.mcp.json` has no `autoApprove` field** — its tool approvals are `permissions.allow` rules (`mcp__<server>__<tool>`) in `.claude/settings.json`, and project-scoped servers additionally need a one-time per-user trust approval. *(Verified against this repo's own working configurations: `.kiro/settings/mcp.json` carries `autoApprove` arrays of 8/7/8 tools; `.mcp.json` carries none; the CC approvals live as 30 `mcp__` allow rules in `.claude/settings.local.json`.)* **So Req 5.3's "generate `autoApprove` from tool registrations" must emit two harness-specific forms**, and **today's `init` writes only the Kiro file — a Claude Code consumer gets no `.mcp.json` at all** (C8).

---

## Architecture

```
U1 — DISTRIBUTION SUBSTRATE & PACKAGING TRUTH
  src/cli/init.ts                    ← the birth event, rewritten to 19A's copy table (C1)
  src/cli/shared/bornRepo.ts         ← NEW: ancestor-walk birth detection, shared by init + MCP (C2)
  src/cli/shared/mcpDataRoots.ts     ← component UNION; token-index posture split (C3)
  src/cli/designerpunk.ts            ← runner values per 19A.5a; user-env precedence (C3)
  src/cli/templates/mcp-config.json.template → per-target MCP config emitters (C8)
  src/cli/shared/transforms.ts       ← rewriteTypesImports (3b) + rewriteBuildImports extended (3c) (C4)
  scripts/floor-closure.ts           ← NEW: directory-scoped closure over import|require|import() (C5)
  package.json files[]               ← explicit floor entries; product-template/ + .kiro/agents/ removed (C5)
  tests/consumer-integration.test.ts ← guard extensions, both launch paths, brand re-key (C6)
  src/cli/sync/*                     ← MANAGED_DIRS re-scoped; repairs; name + type contract (C7)
  scripts/verify-publish-rail.sh     ← NEW: scope-explicit guard + recorded bite (C9)
  src/cli/loadComponentTokens.ts     ← per-file branded-export count → harvest-zero lint (C11)

U2 — CONSUMER GENERATION PROFILE
  canonical/consumer-profile.yaml    ← NEW: declared target set + default target (C12)
  canonical/profiles/consumer/       ← NEW: per-agent + always-set overlays and dispositions (C17)
  canonical/operative-sets/          ← NEW: committed canonical-side operative-item records (C16)
  canonical/_consumer-output/<target>/ ← NEW guarded surface: 8 agents + always-layer (C12, L2-B3)
  tools/agent-generator/partition.ts ← NEW: the ONE splitter, four behaviors (C13)
  tools/agent-generator/spans.ts     ← NEW: the ONE span-construction function; cc.ts/kiro.ts call it (C14)
  tools/agent-generator/regrounding/ ← NEW: derivation (11.4), triviality floor, sweep (C15, C18)
  tools/agent-generator/consumer-entry.ts ← NEW: distinct consumer emission lane (C20)
  build:generator (esbuild) + `designerpunk attach` subcommand (C20)
  product-template/ DELETED + enumerated sweep (C21)

U3 — ONBOARDING
  docs/consumer/INSTALL.md (shipped)  ← install doc; step count declared in front-matter (C23)
  starter-specs/{ci-needs,thurgood-re-grounding}/ (shipped) (C25)
  personal-note template + local personalization (C26)
  init terminal output, product/ scaffold, collision reporting (C27)

U4 — CONTENT POLICY
  scripts/audience-banner/predicate.ts + guard test (C28)
  U1b backward check record; consumer CHANGELOG (C29)

U5 — VALIDATION & CLOSEOUT
  tests/onboarding-trio/{protocol.md, fixtures/} + validation/ run records (C30)
  24.1 two-beat conformance run (C31) · probe re-run · tarball assertion · product query (C32)

GATES (inside U2 — § "Gates and sequencing")
  G1  C3 falsification pass   → completion/re-grounding-c3-falsification.md   (before any triviality code)
  G2  pass four               → completion/re-grounding-pass-four.md          (U2 acceptance)
```

**Unit order is unconditional: U1 → U2 → U3 → U4 → U5** (Req 26.3; the conditional was discharged by gate 4a). **MIDPOINT is owed** (five units ⇒ Req 26.2): **proposed carrier — U2's merge**, because U2 is where the § 7.2 machinery lands and the parent population is largest there. Record path pinned: `completion/claims-pass-midpoint.md`, never `claims-pass.md`. *The tasks round confirms the carrier.*

---

## Components and Interfaces

### UNIT 1 — Distribution substrate & packaging truth

#### C1. The birth event — `init.ts` rewritten to 19A's copy table (Reqs 19A, 19, 15A.3, 1.2)

**What `init.ts` becomes**, step by step against today's code (`src/cli/init.ts:38–195`):

| Today's step | Disposition | Change |
|---|---|---|
| **0 (new)** born-repo check | **ADDED** | `const state = findDesignSystemRoot(cwd)` (C2). `born` or `partial` → **refuse** with the joining path (or a named partial-birth explanation) **unless `--re-scaffold`**. |
| 2 `designerpunk.config.ts` | **KEPT** | `generateConfig()` emits `tokenSource: './src/tokens'` (**kept**, Req 1.2(i)), local theme imports (**kept**, 1.2(ii–iii)), `componentTokens: ['./src/components', './src/tokens/component']` (**re-pointed**, 1.2(iv)). |
| 3 `src/types` copy | **REMOVED** | Types resolve through `@3fn/core/types` (19A.3); reachable because of C4's rewrite. |
| 3b `src/tokens` copy | **KEPT + TRANSFORM** | Gains `transform: rewriteTypesImports` (C4). |
| 3c `src/tokens/component` copy | **KEPT + TRANSFORM EXTENDED** | `rewriteBuildImports` extended for the `registries` escape (Ada C1). |
| 4 `src/components/core` copy | **REMOVED** | Replaced by C1's step 4′ and Req 2's union. `--skip-components` becomes a no-op flag, **accepted with a deprecation note** so existing scripts do not break. |
| **4′ (new)** consumer components dir | **ADDED** | `mkdir -p src/components` with a one-line `README.md` explaining the merge-by-name rule (19A.6; 2.5). The README makes the directory non-empty on disk, but it is excluded from the component scan, so the union still presents the full ecosystem set. |
| 5 `product/overview.yaml` | **REPLACED** | By C27's full `product/` tree scaffold with a worked example screen (19.5). |
| 6 `.kiro/agents` copy | **REMOVED** | Replaced by generation for the selected target via C20 (19.2, 14.4). |
| 7 / 7b steering + governance copy | **REMOVED** | Gate 4b; the docs MCP serves `node_modules/@3fn/core/governance`. |
| 8 MCP config | **REPLACED** | By C8's per-target emitters. |
| 9 test config | **KEPT, collision-reported** | `createFileIfNotExists` gains a consequence line on skip (19.3; C27). |
| 10 `.designerpunkignore` | **KEPT** | Its example comment updated (no `.kiro/agents/` example — that path is no longer copied). |
| **(new)** personal note | **ADDED** | Local personalization of the template (C26). |
| **(new)** sync manifest | **ADDED** | `bootstrapManifest` over the new managed set (C7), written to `.designerpunk/manifest.json` — **repo state** (DD1), so a teammate's `sync` has the founder's baseline. |
| 11 next steps | **REWRITTEN** | C27 — step list consistent with what ran (19.4), session-restart line and its reason (15B.9), clone hatch re-anchored (15.9). |

**Target selection** (19.2, 19.7): `init --target=<tool>`. **Without `--target`: emit the declared default target's artifacts** (DD9 proposes the branch; U3 confirms it alongside the step count per 19.7). The default is read from `canonical/consumer-profile.yaml` (C12), so it is always a member of the declared target set.

**`--re-scaffold`** (15A.3, DD5): skips the refusal. **Before writing, it prints every file it would RE-ADD** — files present in the package copy source but absent from the repo — and requires confirmation (on a TTY), or `--yes` (off a TTY). *Resurrection is never silent, even when chosen.*

#### C2. Born-repo detection — `src/cli/shared/bornRepo.ts` (Reqs 15A.3, 19A.5a)

**One module, two consumers**: the `init` refusal (C1) and the MCP posture split (C3).

```ts
type BirthState = 'born' | 'partial' | 'unborn';
interface DesignSystemRoot {
  state: BirthState;
  root: string | null;          // the anchoring directory; null iff unborn
  signals: { config: boolean; tokenTier: boolean };
}
function findDesignSystemRoot(startDir: string): DesignSystemRoot;
```

- **The walk (Ada R4 clause (a))**: from `startDir`, ascend one directory at a time. **At each level, test both signals**:
  - **config**: `designerpunk.config.ts` exists;
  - **token tier**: the config's `tokenSource` resolves to a non-empty directory, or, with no config present, `src/tokens/` is non-empty.
- **The first level where either signal holds is the root.** The walk **stops without a match** at a directory containing `.git`, or at the filesystem root. Stopping at `.git` means one repo is never born because a parent repo was.
- **NEVER `process.cwd()` as the anchor.** This is Ada's closing case: `npx designerpunk mcp-app` run from a subdirectory of a born repo finds the bin, because npx walks up, and it must also find the design system.
- **Classification**: both signals → **born**; exactly one → **partial** (Req 15A.3: refuse with a named explanation, and **fail-loud side** for the MCP — *a started birth is not CONSUME*); neither found before the stop → **unborn**.
- **What the signal establishes and what it does not (R26.8)**: `born` establishes that a config or a token tier exists at an ancestor. It does **not** establish that `generate` has ever run, or that the tier is complete. Those are C3's and C7's concerns.

#### C3. The root-policy table as code — resolver, runner, template (Reqs 2.1, 2.1a, 19A.5a, 3.7a)

**Resolver** (`src/cli/shared/mcpDataRoots.ts`):

- **`resolveComponentRoots(opts) → { roots: string[]; sources: RootSource[] }`** is **NEW** and returns a **root SET**. The consumer root is resolved as env value → `bornRoot/src/components`. The package root is always appended. **Union-with-precedence happens in the indexer**: when names collide, the consumer's component wins (2.1). **The env value names the consumer's root; it never names the only root** (2.1, L-B1).
- **`resolveTokenIndexRoot(opts) → ResolvedDataRoot`** is **NEW** and implements 19A.5a's posture split:
  - **An explicitly set `TOKEN_INDEX_DIR` that is absent or empty → loud error, in any posture** (Ada R4 clause (b)).
  - **born or partial** → `bornRoot/token-index`, and if that is **absent or empty** → loud error: `no token index in this design system — run 'npx designerpunk generate'` (clause (c): *absent or empty*, per `existsNonEmpty`).
  - **unborn** → the package's `token-index/`, returned with `source: 'package-consume'`. The server **labels** every token response with `tokenOrigin: 'designerpunk-reference'`. The CONSUME posture is legitimately ours, but it is never presented as theirs.
- `resolveConsumerOwnedRoot` **remains for `product/` only** (no package fallback, unchanged). `resolvePackageOwnedRoot` is **unchanged**.
- **The shared-declaration seam** (Lina A8): both servers `require` the resolver through a **hand-written `McpDataRootsModule` interface with an unchecked `as` cast**. The new functions are added **to both servers' declarations in the same change**. A **type-level test** asserts each declaration is assignable from the real module's exported types, so a missed site fails to compile rather than failing at runtime as a zero-component catalog reported healthy. *(Consolidating the infra ring stays out of scope, per § 4.7. This test is the smallest thing that closes the three-site drift without doing that consolidation.)*

**Runner** (`src/cli/designerpunk.ts`):

- `runMcpApp` (L220–249): `COMPONENTS_DIR` and `TOKEN_INDEX_DIR` are **removed from the runner's defaults**. The server resolves them itself, from `bornRoot`, through the functions above. `PATTERNS_DIR`, `TEMPLATES_DIR`, `GUIDANCE_DIR`, `REGISTRY_PATH` and `DESIGN_LANGUAGE_PATH` **keep `pkgRoot`**. They are package-owned, and **`pkgRoot` is correct for them** (19A.5a).
- `runMcpProduct` (L266–284): `COMPONENT_DIR` and `TOKEN_INDEX_DIR` are removed from the defaults on the same rule. `PRODUCT_DIR` is **unchanged**, since it was already `env ‖ cwd/product`.
- **`spawnServer` (L287) precedence: user env WINS.** Today the spawn env is `{ ...process.env, ...envVars }`, so the runner overrides the user. It becomes `{ ...process.env }` followed by `envVars[k]` applied **only where `process.env[k]` is unset**, for the declared data-root keys. *The consumer can always correct a root by hand.*

**Template** → replaced by C8's emitters. The emitted component-root value is `./src/components`, and the token-index value is `./token-index`.

**Table ↔ code, one row each** (the denominator 3.7a exercises):

| Root | Keys | App server resolves via | Product server resolves via | Runner default |
|---|---|---|---|---|
| component | `COMPONENTS_DIR` / `COMPONENT_DIR` | `resolveComponentRoots` | `resolveComponentRoots` | **none** |
| token index | `TOKEN_INDEX_DIR` | `resolveTokenIndexRoot` | `resolveTokenIndexRoot` | **none** |
| product | `PRODUCT_DIR` | — | `resolveConsumerOwnedRoot` | `env ‖ cwd/product` |
| package-owned ×5 | `PATTERNS_DIR`, … | `resolvePackageOwnedRoot` | — | `pkgRoot` |

#### C4. Rewrite-at-copy transforms — `src/cli/shared/transforms.ts` (Req 19A.7)

- **`rewriteTypesImports(content)`** — **NEW**, attached to step **3b**, which has no transform today. It rewrites every `from '../(../)*types(/…)?'` and `require('../(../)*types(/…)?')` to `@3fn/core/types`.
  - It covers all **35 files / 37 statements**, as measured by Ada.
  - The two runtime values, **`TokenCategory` and `SemanticCategory`**, are string enums. That means the second-instance hazard from the scoped-tsx seam does not bite (Ada R4).
- **`rewriteBuildImports`** — **EXTENDED** for step **3c**. It additionally rewrites `from '../../registries/ComponentTokenRegistry'` to `@3fn/core/build`, which exports `RegisteredComponentToken` (Ada C1).
  - This break is **pre-existing**: it is also present in today's `init`.
- **`Oklch`** (Ada C2): **the type is ADDED to the public types barrel** (`src/types/index.ts` re-exports `Oklch` from `src/color/OklchConverter`), and 3b's rewrite maps `../../../color/OklchConverter` to `@3fn/core/types`. *Chosen over inlining because inlining forks a type that the generator's color validation also uses — the same latent-divergence argument Ada made against the fallback.*
- **Completeness is derived, not enumerated.** C5's closure tool runs over the **copy** (the transformed tree in a scratch directory). **Any escaping relative reference that survives the transforms fails the build step.**
- **Fallback** (19A.7, and worse than the fix, per Ada): re-copy `src/types`, recorded as a reversal of 19A.3. **Not planned.**

#### C5. The packaging floor — `scripts/floor-closure.ts` + explicit `files[]` (Reqs 4, 3.9)

- **`floor-closure.ts <dir>`** is a directory-scoped closure:
  - It enumerates **every** file under `<dir>`, not an import graph from a barrel. This is Ada's `readdirSync`-reachable third entry, and the directory scoping is **the reason the tool exists in this form** (4.2).
  - For each file it collects relative module references from **`import`, `export … from`, `require()` and dynamic `import()`**. `import type` is recorded separately (it matters for type-checking, not runtime).
  - It takes the transitive closure outside `<dir>`, and records **bare specifiers**, each verified to be a node builtin or a runtime `dependency` in `package.json`.
  - Output: `floor-closure.json`, committed. **It is a snapshot, and its header says so** (4.2): *"decays with transpiler semantics; the durable arbiter is the post-diet packed consumer-guard run (3.9)."*
- **`files[]`**: the **declared members** from Req 4.2, as explicit entries.
  - `src/tokens/**`, `src/styles/`, `src/assets/fonts/**`, `src/cli/templates/`, and `src/components/**/*.{schema.yaml,contracts.yaml,component-meta.yaml}`.
  - Any closure additions the tool reports.
  - **Removed**: `"product-template/"` and `".kiro/agents/"` (4.6b), `".kiro/steering/"` (gate 4b), and the wholesale `"src/"`.
  - **Not added**: `product-mcp-server/src/` (7.4, DD14).
  - **Excluded**: `src/components/**/{__tests__,examples}/` (4.4).
  - **Pending Kenya/Data** (4.5): `src/components/**/*.{swift,kt}`. Until they decide, these files **remain included**, so iOS and Android consumers are never silently stranded. *The default is "keep", because cutting them is the irreversible direction.*
- **Tarball target** (4.7): U1 records `tarball-target.json` = `{ packedBytes, unpackedBytes, files, lever: 'component-tests+examples, dead dirs, src/ narrowing' }` from the post-diet `npm pack --json`. U5 asserts against it (25.3).

#### C6. Consumer-guard extensions — `tests/consumer-integration.test.ts` (Req 3)

Each case is **a named test**, runs with the scaffolded env vars **set** (3.6), and carries its bite recipe in a comment block next to it.

| Case (test name) | Asserts | Bite |
|---|---|---|
| `local-mode generate over the init-copied tree` (3.2 replacement) | `generate` succeeds in a packed install whose token tree was copied **and transformed** by C4 | Revert `rewriteTypesImports` → red (unresolvable `../types`) |
| `component catalog equals shipped component-root count` (3.3) | `get_component_catalog` count **==** number of component directories in the package's shipped root, **both sides derived** | Narrow `files[]` to drop the YAML floor → red |
| `consumer component appears alongside ecosystem` (3.4) | consumer-authored component present **and** count == shipped + 1 | Revert the union to first-non-empty → red |
| `C′ token tiers — primitive, semantic, component` (3.7) | a test-authored token **per tier**, written into the consumer's copied tree, appears in the served index | Point the index at the package → red |
| `both launch paths × every 19A.5a row` (3.7a) | table-driven: scaffolded config **and** `mcp:app` / `mcp:product`, per root | Restore `pkgRoot` for `COMPONENTS_DIR` in the runner → red |
| **`brand-survival — consumer-tree component token`** (3.2 re-key, **before 3.9**) | the `progress.*` token from the copied `src/tokens/component/progress.ts` survives the dual-instance boundary into `components.yaml` | **(a)** swap the brand for a plain `Symbol()` → red (a **new 3.6 case**); **(b) provenance**: delete the consumer-tree `progress.ts` in-case → the token **disappears** from `components.yaml` |
| `token index fails loud when born and absent/empty` (19A.5a) | born + empty `token-index/` → loud error; unborn → labelled package index | Restore the package fallback for born repos → red |
| `init refuses in a born repo` (15A.3) | born → exit non-zero, joining path printed; partial → named explanation | Remove the check → red |
| **post-diet re-certification** (3.9) | **the whole suite, run against the post-narrowing pack**; the U1 completion doc cites this run's date and commit | — (it is the arbiter) |

#### C7. `sync` re-scoped — reusing Spec 111's three-way machinery (Reqs 5, 5A, 5.8, 21)

**What is reused**: `Manifest` is the baseline, and `Classifier` is the three-way comparison of package, project and manifest (finding 1). **Req 5.6's property is met by existing code.** The design changes **what** is managed, not **how**.

**`MANAGED_DIRS`, re-scoped** (`src/cli/sync/FileScanner.ts:17–25`):

| Entry today | Disposition | Why |
|---|---|---|
| `.kiro/steering` | **REMOVED** | Not copied (gate 4b); identity delivery is the generated always-layer. |
| `governance` | **REMOVED** | Not copied (gate 4b); the MCP serves `node_modules`. |
| `.kiro/agents` | **REPLACED** | By the generated agent surface for the attached targets. The "package file" side is **freshly generated output** (C20), not a package copy. |
| `.kiro/skills` | **REPLACED** | Likewise. |
| `src/tokens` | **REMOVED** | **Req 5.8 / Model B**: the consumer's language; no baseline applies. |
| `src/types` | **REMOVED** | Not copied (19A.3). |
| `src/components/core` | **REMOVED** | Not copied (19A.2); components flow through the package on `npm update`. |
| *(new)* MCP config files | **ADDED** | Regenerated by C8; `autoApprove` / `permissions.allow` drift is repaired here (5.3–5.4). |
| *(new)* managed regions | **ADDED, REGION-GRAIN** | `CLAUDE.md` and `.claude/settings.json` (C8, 19.9). **The comparison unit is the region**, delimited by the self-labelling markers; content outside the region is never read or written (5.6, A14). |

**The resurrection defect closes by construction.** `src/tokens` is no longer managed, so the classifier's `new` branch can no longer re-add files the consumer deleted from their language. For the surfaces that remain, which are generated, a file the consumer deleted is classified as **`deleted-by-you`** — a **new classification** keyed on the manifest having an entry while the project lacks the file. It is **reported and never re-added** unless `--restore <path>` names it.

**Repairs** (5.1, 5.2): `sync` detects an `@3fn` → `npm.pkg.github.com` mapping in `.npmrc`, and `paths` overrides pinning `@3fn/core/*` to `src/` in `tsconfig*.json`. It offers repair with the named explanation, and **never repairs silently**.

**The name contract (5A)** — `src/cli/sync/NameContract.ts`:

- **Source of truth (5A.3, DD10)**: the **component metadata the floor pins**. Each component's `contracts.yaml` / `component-meta.yaml` token references, plus the semantic references compiled into the package's `component-tokens` registry. Both already ship.
- **Check**: `referencedNames(package) − presentNames(consumer's resolved semantic barrel)` → for each missing name, the report line from 5A.1/5A.6:
  > `components now expect token 'color.action.subtle' (used by Button-CTA, Chip-Filter) — add it to your set. Your tokens are yours; DesignerPunk never adds to them. DesignerPunk's own value, for reference: purple300. See: install doc § "When sync reports a missing token".`
  - **Value guidance is adopted** (DD11): the component's declared use, plus our value **labelled as a reference**. This is the CONSUME posture informing the BECOME posture without writing.
- **The type contract (5A.7, DD11 — WIDENED)**: the package exports `TOKEN_CONTRACT_VERSION` together with the member lists of `TokenCategory` and `SemanticCategory`, and the manifest records them at each sync. A change is reported as:
  > `the token type contract changed (removed: X; added: Y) — run 'npx designerpunk generate' to check your tree`

  This is loud, and it never writes.
- **What a clean report establishes and what it does not (5A.4, R26.8)**: every referenced name exists in the consumer's set. It does **not** establish that the consumer's value suits the component, and it does not establish that the type contract is unchanged.

**Migration for existing consumers** — see § "Migration".

#### C8. Per-harness MCP configuration + approval emission (Reqs 5.3, 5.4, 7.3, 15A.1)

**One emitter per declared target**, driven by the servers' **tool registrations**. The source is the same `tools/list` data each server serves, exported at build time as `dist/mcp/tool-manifest.json`, so the approval lists cannot drift from the tools.

| Target | Server config | Approval mechanism | Committed? |
|---|---|---|---|
| **Kiro** | `.kiro/settings/mcp.json` — `command`/`args`/`env`, `disabled: false` | per-server **`autoApprove`** = the server's full read-only tool list from `tool-manifest.json` (**`find_docs` included**; `validate_component` never emitted unless it is registered) | yes (relative paths) |
| **Claude Code** | **`.mcp.json`** (project scope) — relative paths | **`.claude/settings.json` managed region**: `permissions.allow` = `mcp__<server>__<tool>` for the same list. **Project-server trust is a per-user, one-time prompt that CC stores outside the repo** — it cannot be pre-granted in committed config, so the install doc and the joining path instruct it (15A.1) | yes (managed region; the user's own entries outside it are untouched) |

- **The product server gets a third entry on both targets** (7.1), with a generated approval list that is **born clean** (7.3).
- **Per-harness trust behavior, stated with its verification status** (Open input 18, DD8):
  - **CC**: the config shape is verified against this repo's working setup. The one-time trust prompt is CC's documented behavior for project-scoped servers, and it is consistent with this repo storing no server approvals in committed settings. **A cold-session confirmation is still owed.**
  - **Kiro**: the config shape is verified. **Cold-open behavior (whether a workspace MCP server needs a trust step) is UNVERIFIED from here.**
  - **Both cold behaviors are verified live in U3** by C24's cross-target join run (15A.4). That is the one instrument that meets a cold harness, and its record states what each harness asked for.

#### C9. The publish-rail guard — `scripts/verify-publish-rail.sh` (Req 6)

```sh
# REQUIRED FORM (6.2), verbatim:
npm view "@3fn/core@${VERSION}" version --@3fn:registry=https://registry.npmjs.org
# HARDENING (6.8, DECIDED — DD12: AUGMENTS, does not supersede):
npm view "@3fn/core@${VERSION}" dist.tarball --@3fn:registry=https://registry.npmjs.org \
  | grep -q '^https://registry\.npmjs\.org/' || fail "tarball served by the wrong rail"
```

- **The script is invoked** as a mandatory step in `RELEASE-FLOW.md`. It writes its invocation and result to **`docs/releases/<version>/publish-verification.log`**, which is the **paste target** the RELEASE claims pass reads (6.7, S-B4).
- **Bite, recorded once and committed** (6.3):
  ```sh
  VERSION=99.99.99 scripts/verify-publish-rail.sh
  ```
  exits non-zero with 404. The red output is committed at `scripts/__bites__/verify-publish-rail.99.99.99.log`.
- **The register row** in `governance/classification-map.md`: owner `thurgood`, `check_state: armed`, and the disposition line **`post-merge — adjudicated; not a PR check (6.6)`**.
- **Leonardo's hermetic form** (A15) is folded in as the script's invocation environment: `npm_config_userconfig=/dev/null npm_config_globalconfig=/dev/null`.
- **The `RELEASE-FLOW.md` / `release-management-system.md` edits are governance edits.** They ride the single **release-recipe ballot** (DD13), together with 23.7's trio obligation and 21.2's changelog step.

#### C10. Product MCP wiring (Req 7)

The third server entry is emitted per target (C8). **The two-server equality assertion at `src/cli/__tests__/init.test.ts:142` is updated deliberately**, in the same change, to a three-server assertion, with the commit message naming Req 7.2. `product-mcp-server/src/` is **not** added to `files[]` (DD14). The `product/` scaffold is C27, and the U5 query is C32.

#### C11. The harvest-zero lint (Req 8)

- **Trigger**: a scanned `tokens.ts` / `*.tokens.ts` that exports **no `defineComponentTokens`-branded value** (8.1).
- **Instrumentation** (8.2): `harvestModule` gains a per-file tally (`Map<file, brandedExportCount>`), returned alongside the shared array. This is a loader change and is sized as one.
- **Output**:
  > `warning: <file> exports no defineComponentTokens value — if you meant to register component tokens, export the result of defineComponentTokens({...})`
- **Sequenced after Lina's `*.refs.ts` rename lands** (8.4), so the lint launches with zero warnings against our own source.

---

### UNIT 2 — Consumer generation profile

#### C12. The profile dimension and the consumer rendering surface (Reqs 9, 9.5, 12.1, L2-B3)

- **`AdapterContext.profile: 'steward' | 'consumer'`** (Q9(ii)). The `target` union is unchanged, and adapters branch only inside the shared span function (C14) and the always-layer emitter.
- **`canonical/consumer-profile.yaml`** — **the single declared target set**:
  ```yaml
  targets: [cc, kiro]        # the declared set (9.5 / 23.6 / 22 / 19.7)
  defaultTarget: cc          # 19.7's emit branch (DD9 — U3 confirms)
  ```
  Everything that needs "the declared target set" **imports this file**: `generateConsumerRendering`, the C15 per-target guard, the trio protocol and the `attach` command. **There is no second list** (S-A5).
- **`generateConsumerRendering(repoRoot, ctx, adapters)`** follows the **`generateFixture` precedent** (`generate.ts:305`). For each declared target it emits all eight agents **and the always-layer output** (`emitAlwaysLayer` with the consumer profile) under `canonical/_consumer-output/<target>/`. The steward-side attribution sidecars for those renderings are committed alongside them.
- **`guardedRoots()` gains `canonical/_consumer-output`**, so the consumer renderings are diff-guarded by C6/122-diff-guard like every other generated surface. *(This is the surface the § 7.2 sweep reads. Without it, the sweep has nothing to sweep: L2-B3's silent-zero, one layer up.)*

#### C13. The splitter — `tools/agent-generator/partition.ts` (Req 10.G, 10.8)

**One rule, four behaviors** (Lina's corrected sizing):

1. **A fence-aware tokenizer.** Lines inside ```` ``` ```` or `~~~` fences are never read as headings (Lina measured four fenced `^## ` lines in `Spec-Feedback-Protocol.md`).
2. **A heading tree and its leaf partition.** Headings build a tree, and every unit is a **leaf**: the finest heading level present on that branch.
3. **Orphan preambles are units.** Prose between a heading and its first child is unit `…#<parent>:preamble` (L2-B1).
4. **Top-level enumeration fallback.** A document with **no headings** partitions by its top-level numbered or bulleted items (`#item-<n>`), as in `start-up-tasks.md`.
- **The degenerate case**: no headings and no enumeration → **one unit, `#doc`**, returned with `degenerate: true`. It is recorded as a **declared state**, never a clean pass (10.G). `canonical/agents/_fixture.md` triggers it on every run, by design.

```ts
interface Unit {
  anchor: string;                 // '#the-owed-set-pipeline', '#operational-mode-claims-audit:preamble', '#item-3', '#doc'
  parent: string | null;          // anchor of the parent heading node; the TREE, not the string, carries containment
  kind: 'heading' | 'preamble' | 'enumeration' | 'degenerate';
  startLine: number; endLine: number;  // inclusive, 1-based, over the body
  text: string;
}
interface PartitionTree {
  units: Unit[];                  // leaves, in document order
  nodes: Map<string, { parent: string | null; children: string[] }>;  // every heading node, including non-leaves
  isDescendantOrSelf(anchor: string, of: string): boolean;             // walks nodes; NEVER compares strings by prefix
}
function partition(body: string): PartitionTree;
```

- **Invariant (10.8)**: `units.map(u => u.text).join('') === body`, **byte-identical**, including leading preamble and trailing content. This is asserted inside `partition()` itself, with a loud throw. It is not left to tests alone.
- **Anchors**: GitHub-style slugs; a duplicate slug gets a `-2` suffix. The **anchor string carries no containment meaning**: `#the-trigger-set` and `#the-trigger-set-examples` are siblings, and only `nodes` says so (Stacy R4).
- **Consumers**: C14 (spans), C16 (the operative-set unit keys), C18 (clause (ii)'s application unit), and C19 (always-set members).

#### C14. The span-construction function — `tools/agent-generator/spans.ts` (Req 10.S, 10.8a Constraint 1)

```ts
function emitBodySpans(
  acc: AttributionAccumulator,
  body: string,
  canonicalFile: string,                 // e.g. 'canonical/agents/stacy.md'
  profile: 'steward' | 'consumer',
  overlay?: ConsumerOverlay,             // C17; consumer profile only
): string /* the rendered body */;
```

- **Steward profile**: one `passthrough` span per unit, `source: <canonicalFile>#<anchor>`. The rendered text is **unchanged byte for byte** from today's single-span output; only the sidecars change.
- **Consumer profile**, per unit, per its disposition (C17):
  - **retained** → `passthrough`, `source: <file>#<anchor>`.
  - **re-pointed** → the overlay's re-grounded text, **`op: 'render'`, `source: <file>#<anchor>` — the CANONICAL ORIGIN** (10.S).
  - **superseded-by / no-consumer-counterpart** → the unit is omitted, and the rendering carries no span for it.
  - **profile-originated overlay text** (text with no canonical unit) → `op: 'render'`, `source: 'consumer-profile:<agent>:<id>'`.
- **`cc.ts` L244–247 and `kiro.ts` L322–325 are replaced by one call each**: `emitBodySpans(acc, agent.doc.body, \`canonical/agents/${fm.agent}.md\`, ctx.profile, overlay)`. **That consolidation is a named U2 deliverable.**

#### C15. The 11.4 derivation checker — `tools/agent-generator/regrounding/derivation.ts` (Req 11.4, the containment pin)

```ts
interface DerivationResult { unit: string; derivedSpans: AttributionSpan[];
  verdict: 'VERIFIED' | 'FAIL_NO_DERIVATION' | 'FAIL_DISHONEST_NAMING'; }
function checkDerivation(disposition: RePointed, manifest: AttributionManifest,
                         tree: PartitionTree, rendering: PartitionTree): DerivationResult;
```

1. **DERIVATION.** `D` is the set of spans whose `source` names this canonical file, **and** whose anchor satisfies `tree.isDescendantOrSelf(anchor, S)`. **Containment is resolved against the partition tree, never by string prefix** (Stacy's R4 pin, binding). **If `D` is empty → `FAIL_NO_DERIVATION`**, and it is **a failure, not routed** (11.4).
2. **HONEST NAMING.** The disposition's `destination` is a unit anchor **in the rendering**. At least one span in `D` must lie within that destination unit's line range. **Otherwise → `FAIL_DISHONEST_NAMING`.**
- **Attack (a), traced**: S = `#the-owed-set-pipeline`, emptied; destination = `#the-trigger-set`. That destination's span sources `#the-trigger-set`, which is a **sibling** of S, not a descendant. So `D = ∅` → **FAIL_NO_DERIVATION**.
- **The honest re-pointing (E), traced**: `{op:'render', source:'…#the-owed-set-pipeline'}` → S itself is in `D`, and the destination is that span → **VERIFIED**.
- **Per-target run shape (Open input 21, DD7)**: the **steady-state E-guard** is `describe.each(targets from consumer-profile.yaml)`. For each target it emits exemplar E **through that target's adapter** (not the shared function directly), then runs `checkDerivation` alone on the emitted manifest (Constraint 2).
  - Adding a target adds a guard run, with no second list.
  - An adapter that drifts back to inline emission goes red **for its own target**, while the unit-level twin stays green. That is exactly the case the per-target run exists to catch (Stacy R4 input B).

#### C16. The operative-set records — `canonical/operative-sets/` (Req 11.6.5d)

```yaml
# canonical/operative-sets/stacy.yaml   (one file per canonical source; always-set members under always-set/<id>.yaml)
source: canonical/agents/stacy.md
owner: stacy                       # the owning domain agent
confirmer: thurgood                # C1 rule: owner unless owner == profile author → 'stacy'; both collapse → 'peter'
units:
  "#the-owed-set-pipeline":
    canonicalHash: sha256:…        # hash of this unit's canonical text at confirmation
    items:
      - { id: owed-set-1, kind: step,        excerpt: "Stage 1a — every spec with post-ratification merge activity…" }
      - { id: owed-set-2, kind: enumeration, excerpt: "(a) declared units in any recognized form…" }
      # … every item a consumer implementation could VIOLATE (5c — normativity, not form)
    confirmation: completion/operative-set-confirmations/stacy.md#the-owed-set-pipeline
```

- **Fixed canonical-side, before any rendering** (5d.1): the records are keyed by **canonical** unit anchors from C13, and nothing on the rendering side is read to produce them.
- **Diff-guard wiring — the `operative-set-freshness` check**, a new sweep in the 122 guard family:
  - for every canonical unit, if its current text hash differs from `canonicalHash`, the check **FAILS** with: `canonical unit <anchor> changed — its operative set must be re-confirmed by <confirmer>`.
  - This makes **every canonical commit that changes a unit force a re-confirmation** — Stacy's R4 reading, which is the intent (5d). A **narrowed** item list shows up as a reviewed diff.
- **The confirmer rule is checked mechanically**: `confirmer` must equal the C1 function of `(owner, profileAuthor)`.
- **What the record establishes and what it does not (R26.8)**: the `confirmer` field establishes that the **right seat was declared**. It does **not** establish that the confirmation happened.
  - The evidence is the **`confirmation:` path**: a committed note authored in the confirmer's session. Stacy's CLOSEOUT pass audits it, in the closed negative form she stated (*not independently re-verified — confirmed by the auditing seat*).
  - **All agents commit under one git identity**, so a field alone cannot authenticate a seat. See § "What resisted design grain" item 3.
- **The check reads this record** to compute the triviality denominator (C18). **A rendering can never supply its own denominator** (5d.2). Pass four verifies that (11.6.5d, rides into pass four's scope).

#### C17. Overlays, dispositions, signatures, and the volume valves — `canonical/profiles/consumer/` (Reqs 11.2, 11.5, 11.6.5b)

```
canonical/profiles/consumer/<agent>.overlay.md       ← re-grounded text for re-pointed units, keyed "## @unit #<anchor>"
canonical/profiles/consumer/<agent>.dispositions.yaml
canonical/profiles/consumer/always-set/<id>.overlay.md / .dispositions.yaml   (path B members)
```

```yaml
# <agent>.dispositions.yaml
units:
  "#the-owed-set-pipeline":
    disposition: re-pointed            # re-pointed | superseded-by | no-consumer-counterpart | retained
    destination: "#the-owed-set-pipeline"
    removals:                          # (iii) — every removed block, with its authorizing clause
      - { excerpt: "…/.kiro/docs/ballots/2026-09-19-…", cites: subtraction-1 }
    signature:                         # present iff the row ROUTED (C18)
      signer: thurgood                 # C1 rule applied to the OWNER of this charter (stacy's own rows → thurgood)
      canonicalHash: sha256:…          # ─┐ VALVE 1 — carry-forward keyed to content:
      renderedHash:  sha256:…          # ─┘ the signature holds while BOTH hashes match; either changes → the row re-opens
      assent:                          # VALVE 2 — itemized: WHICH counterpart items survive (ids from C16)
        surviving: [owed-set-1, owed-set-2, owed-set-4, …]
      # OR: refuse: should-re-point    ← the one-flag return; routes back to the profile author
      evidence: completion/signatures/stacy.md#the-owed-set-pipeline
```

- **`repo-bound-in-entirety` is a named rejected term** (11.2.2): the schema validator emits the specific error text from the requirement.
- **Carry-forward (valve 1)**: each release re-judges **only the delta**, meaning rows whose canonical or rendered hash changed. A unit split or merge invalidates only the affected rows. **Steady-state volume is churn** (11.5.6).
- **Itemized assent (valve 2)**: an assent names the surviving item ids. A bare signature does not validate. *(The item list is what makes assent cost more than a glance.)*
- **The audit side is Stacy's seat**: a counted spot-check fraction, and the per-signer assent rate as the C2 block's second metric (11.5.7). Both are **baselines in 123**. **The first render is not read as a baseline** (11.5.8).
- **The C2 counting-block edit** to 127's claims-pass template is **this author's artifact** (11.5.3). It is scheduled in U2 and coordinated with Stacy before merge.

#### C18. The triviality floor and routing — `tools/agent-generator/regrounding/triviality.ts` (Reqs 11.3, 11.6)

For every canonical unit whose rendering is emptied, reduced or absent:

1. **Domain restriction (a)**: if the unit's C16 record has **zero items**, the triviality clauses are **inapplicable**. A removed unit is still covered by (iii).
2. **The one-sided mechanical floor (5b)** clears the unit mechanically **iff both** of these hold:
   - `strictVerbatimRetained / |items| ≥ 1/2`. Strict means the item's `excerpt` text appears verbatim in the rendered unit.
   - **none of the unit's removals cites subtraction bullets 1–4** (the S3-A1 closure).

   **A mechanical pass establishes textual retention only, not function retained (S3-A2).** The same unit still runs through clauses (i) and (iv).
3. **Otherwise the unit ROUTES.** A routed unit is **not a finding**: it becomes a signature row in C17 for the confirmer seat. The judgment applies the **semantic correspondence rule**: *an item is retained iff its function survives, including in re-grounded form*. Clause (c) still binds: a label with emptied content counts as **not retained**.
4. **The hard floor (11.5.5)**: a charter whose every operational unit is `no-consumer-counterpart` → **FAIL**.

- **Sequencing: this component is NOT BUILT until gate G1 (C3's falsification) returns HOLDS.** See § "Gates and sequencing".

#### C19. The always-set as a class, under path (B) (Req 12)

- **Counterpart** = the **shipped** steering document itself (12.1a). Its partition (C13) is the application unit: heading set, or the top-level enumeration fallback (`start-up-tasks.md` → seven `#item-<n>` units).
- The consumer profile applies `always-set/<id>.overlay.md` + `.dispositions.yaml` **at embed time** in `emitAlwaysLayer`.
- **Applicability verification (11.3.3) is told which is which**: for always-set members, the "canonical" side it reads is `.kiro/steering/<id>.md` (the shipped artifact), recorded in the dispositions file's `counterpart:` field.
- **`personal-note` is the template member**: its unit is its declared slot set (C26), and it is **tolerated when absent** with a named warning (R18.5, Req 13).
- **Path (A)** (canonicalize the nine) stays deferred, with its ballot precondition named (12.1a).

#### C20. The consumer emission lane, compile lane, and `attach` (Reqs 14.1–14.3, 13, 15A.1, 19.7)

- **`consumer-entry.ts`: `emitConsumer({ packageRoot, consumerRoot, target })`** — a distinct lane. **All three `repoRoot` jobs are assigned** (14.2):
  - canonical **inputs** ← `packageRoot/dist/consumer-canonical/` (the **derived** filtered inputs, C22);
  - **doc-id resolution** ← `packageRoot/governance` + `packageRoot/dist/consumer-canonical/always-set/`;
  - **outputs** → `consumerRoot`.
- **It emits agent artifacts and the always-layer only.** The allow-list is the operative test (14.3), and **it emits no attribution sidecars**: those are a steward-side verification artifact that would point at sources a consumer does not have.
- **Degradation (13)**: in the consumer profile, an unresolvable always-set member or embed → **omit the member, print a named warning, exit 0**. The steward profile keeps the throw. The bite is recorded in `consumer-entry.test.ts`: delete a resolvable member from a packed install → the warning text appears, the charter is emitted minus that member, and the exit code is 0.
- **Compile lane**: `build:generator` = esbuild bundle of `tools/agent-generator/consumer-entry.ts` + its imports → `dist/generator/consumer-entry.js`. This runs under plain `node` with **no TS runtime**, honouring 118's guarantee. It is added to `prepack`.
- **`designerpunk attach --target=<tool>`** (DD4): **the non-birth emit command.**
  - It runs `emitConsumer` + C8's MCP emitter for one target.
  - It runs **only in a born repo** (C2). In an unborn repo it refuses with: *"no design system here — run `init` to create one"*.
  - `init` calls the same code path at birth.
  - It applies **the same target selection as `init`** (15A.1b): no `--target` → `defaultTarget`.

#### C21. The legacy-path deletion and its enumerated sweep (Req 14.5–14.7)

- `product-template/` is **deleted** (the whole tree, which contains only `agents/`).
- **Sweep, one verb per entry** (L-B5):
  - `package.json files[]` `"product-template/"` → **removed** (C5);
  - `governance/DesignerPunk-Integration-Guide.md` § 4b → **edited**, to teach `attach`;
  - `governance/classification-map.md` L686 → **edited**. **This is a governance-law edit and rides the U2 ballot** (DD13);
  - `governance/MCP-Evolution-Roadmap.md` L217 → **verified historical, left unedited, recorded**.
- **`scripts/check-package-name-drift.js` `SCAN_DIRS`**: `'product-template'` is removed from the list **and** the scanner is made to no-op on a missing directory. **Both changes land before the deletion**, and a test proves the no-op, because the script is wired into `prepublishOnly`.

#### C22. Q5's derivability determination (Req 14.8, 14.9)

**DETERMINED: DERIVABLE — the filtered path holds, and canonical does not ship whole.**

- **The mechanism**:
  ```
  dist/consumer-canonical/<agent>.md = derive(canonical/agents/<agent>.md, profiles/consumer/<agent>.overlay.md,
                                              profiles/consumer/<agent>.dispositions.yaml)
  ```
  - The derivation is deterministic: partition (C13), then apply dispositions, then substitute overlay text for re-pointed units.
  - It runs at `prepack`.
  - Its output is **diff-guarded** by rendering the same derivation into `canonical/_consumer-output/<target>/_canonical/`.
- **Why it is not "a hand-curated second tree"**: the overlay holds **only** the re-pointed units' text, keyed to canonical anchors. Everything retained is carried over from canonical by the derivation, never copied by hand. **A canonical edit to a retained unit reaches the consumer inputs automatically. A canonical edit to a re-pointed unit trips C16's freshness check, and re-opens the C17 row through carry-forward**, so the overlay cannot silently fall out of step.
- **Consequence for the attribution back door** (Lina's Q5 argument): consumer installs carry **no** sidecars (C20) and **no** steward canonical, so nothing in the package maps re-grounded output back to steward source.
- **The Q5 residual, recorded as the ruling asked** (14.9): consumer regeneration is not reproducible against **our** lock hashes. That is correct; their guard surface is theirs.

---

### UNIT 3 — Onboarding

#### C23. The install doc — `docs/consumer/INSTALL.md` (shipped) (Reqs 15, 15B, 22.2)

**Front-matter declares the path's step count** (22.2 — declared in U3, asserted in U5):
```yaml
path-steps: { founder: 6, joining: 4, joining-cross-harness: 5, reference-no-init: 3 }
```
**Section order is the sequencing requirement** (15B.7):
1. **Which posture? — CONSUME or BECOME** (15B.2, *before any command*), with the engine-not-generator frame (15B.1).
2. **CONSUME — the reference-corpus / no-init path** (15.3): `npm install` → wire the docs MCP → **do not run `init`**. It also covers the four probe residuals: reference use is sanctioned (15.4), citation fidelity (15.5), retry on `SectionNotFound` using `suggestions` (15.6), and `lastReviewed` conflicts (15.7).
3. **BECOME — birth** (the founder path). `init` is taught **at its own step as the birth event, once ever**. The step after it covers **restart, and why**: the MCP is loaded at session start (15.8, 15B.9).
4. **Your language vs our updating surface.** `generate` is taught at its own step, and `init`'s birth is restated there (15B.3). **The update lifecycle** (15B.6): `npm update` refreshes components and **never** your tokens; then `sync`, which reports and never writes; then `generate`, after you change your own tokens.
5. **When `sync` reports a missing token** (15B.4 — the section the 5A message points at).
6. **Your agent layer** — a managed region, extensible outside it (15B.8).
7. **Joining an existing design system** (15A — C24).
8. **CI needs** — P1–P5 with two-sided pricing (17), linking the CI-needs starter spec.
9. **Ownership** — per-component forking by name first (2.5), then **the clone hatch re-anchored**: *the clone gets you the engine and the components; `init` already made the language yours* (15.9).

- **119-B constraints** (15.2) are checked by a doc lint in U3's tests:
  - section-less route form;
  - no emitter list asserted (cite `classification-map § certainty-calibration`);
  - no MCP-routed links to identity docs;
  - no new aliases.
- **Vocabulary consistency (15B.5)**: one shared `vocabulary.ts` module supplies the terms. The CLI terminal output and the starter specs import it, and a test asserts the install doc uses the same terms.

#### C24. The joining path and the commit policy (Req 15A)

- **The joining path**, as specified in 15A.1:
  1. clone;
  2. `npm install`;
  3. `generate`;
  4. **`attach --target=<yours>`**, *if your harness differs from the founder's, or the agent layer is not committed*;
  5. personalize your own note;
  6. restart, and approve the project's MCP servers if your harness asks;
  7. commit the lockfile, or run `sync` if your installed version differs.
- **The commit policy — CONTENT decided** (Open input 16, DD1), shipped as `docs/consumer/COMMIT-POLICY.md` and emitted into the consumer's `.gitignore` managed block at birth:

| REPO STATE — commit | REGENERATED — do not commit |
|---|---|
| `designerpunk.config.ts` · `src/tokens/**` (your language) · `src/components/**` (yours) · `product/**` · `package.json` + lockfile · `.designerpunkignore` · test configs · **`.designerpunk/manifest.json`** (sync's baseline) · **MCP configs for every attached target** · **generated agent artifacts for every attached target** · `CLAUDE.md` / `.claude/settings.json` (your files, with managed regions) | `token-index/` · generated platform output (`generate`'s CSS / Swift / Kotlin) · **your personalized personal note** (per-user-local, R18.5) |

- **The U5 join run** (15A.4): a **committed born-repo fixture** (one trio run's resulting repo), cloned fresh, **with a `--target` different from the birth run's**. It is the live verification of C8's cold-harness behavior (Open input 18).

#### C25. The starter specs — `starter-specs/` (shipped) (Reqs 16, 17)

- `starter-specs/ci-needs/` — `requirements.md`, `design.md`, `tasks.md`.
  - This **one atomic deliverable** holds the **P3 tier list** (a minimal core and optional hardening), and **every need's P2 bite recipe**.
  - **Every need is priced two-sided in one line** (17.4).
  - Any need whose bite recipe cannot be written is **not** in the list (17.2).
- `starter-specs/thurgood-re-grounding/` — consumer-Thurgood re-points his charter at the consumer's repo, establishes their steering and spec surface, and **reports what did not transfer**.
- **Harness-agnostic placement** (Leonardo A9, DD15): `init` and `attach` scaffold the specs into **`specs/`** at the repo root, which is not a harness-specific directory. The install doc points each harness's agent there. *(`.kiro/specs/` would privilege one harness, and P5 forbids that.)*

#### C26. The personal-note template (Req 18)

- The shipped template is `templates/personal-note.template.md`, a declared **slot set**: *who you are · how you want to be worked with · what you want candor about*.
- **`init` and the joining path personalize it into `.designerpunk/personal-note.local.md`** by prompting on a TTY, or by writing the template with `TODO` slots off a TTY. That file is **gitignored** by the commit-policy block. The always-layer references it by path and **tolerates its absence** (Req 13's warning).
- `sync` **never** touches it (5.7).

#### C27. `init` UX (Req 19)

- **Collision reporting** (19.3, 19.4): on a skip, `createFileIfNotExists` prints the **consequence**. Example:
  > `skipped: jest.config.js (already exists) — the DesignerPunk jest preset is NOT applied; add ...require('@3fn/core/jest-preset') to your config or 'npx jest' will not run component tests`

  Next-steps then **omits** any step the skip made untrue.
- **The `product/` tree** (19.5): the scaffold covers `overview.yaml`, `principles/`, `experience-map/{verticals,flows,pages}/`, `templates/`, `domain-objects/`, `components/` and `tokens/`. It includes **one worked example screen**, `experience-map/pages/example-home.yaml`, and **this is the artifact C32's product query reads** (7.5).
- **Terminal output** carries the session-restart line **with its reason**, and the re-anchored clone hatch (19.6).

---

### UNIT 4 — Content policy

#### C28. The banner predicate and its presence guard (Req 20)

- **`scripts/audience-banner/predicate.ts`**: Ada's predicate, versioned. It uses the regex `complete-task\.sh|Peter merges|RATIFIED|ballot` over `governance/*.md`, and its output is the measured set.
- The **under-inclusion limit** is carried in the predicate file's header and in the banner convention's text (20.3).
- **Guard**: `audience-banner.test.ts` asserts `predicate-match ⇒ banner-present`. It reports `N docs match the predicate; N carry banners`, and **never "the corpus is bannered."**
- **Arming** fires Stacy's ARMING event: `audit:coverage-map` + `verify-gate-registration.sh`.
- **Banner vocabulary**: two templates, *DesignerPunk's own process* and *DesignerPunk's own components* (20.7), each stating **what is worked example and what is transferable** (20.8).

#### C29. The U1b backward check and the release-notes disposition (Req 21)

- **U1b check**: a one-time record, `validation/u1b-backward-check.md`, covering the 125-B campaign's `governance/` prunes judged against consumer-serving needs. **Findings are routed to the owning agents as messages**, not fixed in 123.
- **Release notes — DECIDED** (DD16): ship a **consumer-facing `CHANGELOG.md`**, hand-authored at release, consumer-framed, with one entry per release. **The authoring step rides the release-recipe ballot** (DD13). `docs/releases/*.md` stays repo-only.

---

### UNIT 5 — Validation & closeout

#### C30. The persona trio — `tests/onboarding-trio/` (Reqs 22, 23, 25.1, 25.5)

- **`protocol.md`** covers the three personas and their axes (vocabulary / mechanics / agent-harness fluency), preconditions clause (i) (packed install, no DesignerPunk source tree access) and clause (ii) (named fixture per persona).
- **Fixtures are committed** (23.5):
  - `fixtures/a-ts-service/` has its own `tsconfig` and `jest.config.js`. **It exercises C27's collision path.**
  - `fixtures/b-static-site/`.
  - `fixtures/c-near-empty/`.
- **Targets are distributed across `consumer-profile.yaml` targets**, recorded per run (23.6).
- **Run record**: `validation/trio-<n>-<persona>.md`, with:
  - preconditions;
  - fixture;
  - target;
  - wall-clock (**recorded, never asserted**);
  - **findings per persona, attributed to their axis** (25.1);
  - **forced negative per persona**, owed even when no list is filed (25.5);
  - per-question discovery results;
  - **agents exercised: N of 8 / not exercised: [named]** (24.2a);
  - **stop events, from the closed vocabulary**: `completed | budget-exhausted | harness-error | operator-halt:<reason>` (22.4).
- **The assertion is on the PATH**: the install doc's declared `path-steps` vs a count of its own steps (22.2). **No assertion is ever made on a run's step count** — the forbidden form 22.5 names.
- **The recurring per-release obligation exits closeout as a committed record** under `.kiro/issues/`, with an owner and its trigger, and is walked by the health check (23.7).

#### C31. Re-grounding conformance — the 24.1 two-beat run (Req 24)

- **One U5 run** against a scratch consumer install (packed, no repo access).
- **Beat 1**: consumer-Thurgood executes `starter-specs/thurgood-re-grounding` → `validation/conformance-beat-1.md`, with a **bar**: *did he formalize the spec it assigns?*
- **Beat 2**: consumer-Stacy verifies beat 1's completion claims → `validation/conformance-beat-2.md`, **recorded separately**. If beat 1 produced nothing, beat 2 records **`not exercised — upstream beat produced no artifact`**.
- **Charter-identity probe** (24.6): run on **Thurgood and Stacy**. Answers are checked against **the consumer rendering's** declared domain, routes and out-of-scope list.
- **The honest labelling (24.3–24.5)** is carried into the U5 acceptance table:
  - deterministic clauses;
  - routed;
  - behavioral backstop;
  - **(v)'s mechanical half listed as deterministic only if G2 returned PASSES**.

#### C32. Closeout (Req 25)

- **The probe re-run** against the shipped artifacts (25.7): the no-init path, banners present, the reference section present. Scoping is stated in the Evidence cell (26.7).
- **Tarball assertion** against `tarball-target.json` (25.3).
- **Product query**: a consumer Leonardo answers `get_product_overview` / `find_screens` over C27's worked example screen (25.4).
- **Open obligations** (25.6) are enumerated from the Open inputs table plus 23.7, 23.9, 21.2, 4.5, 6.8 and 11.6. Each is recorded with its status.

---

## Gates and sequencing

**The § 7.2 machinery is built in an order that makes each gate schedulable:**

```
U2 step  1  partition.ts (C13) + golden-partition bite (Bite 1)
U2 step  2  spans.ts (C14) + the cc.ts/kiro.ts consolidation + unit-level twin (10.S twin)
U2 step  3  operative-set records for the EXEMPLAR sections (C16), confirmed under C1 — A, B, C(c1), C(c2), D, E, F, Lina-1, Lina-2
U2 step  4  ══ GATE G1 — C3's OWN FALSIFICATION PASS (Stacy) ══  → completion/re-grounding-c3-falsification.md
              HOLDS  → continue
              BREAKS → pass four BLOCKED; C3 returns to its owner (Thurgood); the blocking recorded in the U2 completion doc
              NOT-RUNNABLE → treated as BREAKS
U2 step  5  triviality.ts (C18) + dispositions/signatures (C17) + the (i)(ii)(iii)(iv) sweeps
U2 step  6  derivation.ts (C15) + two-sided grain guard (Bite 2) + per-target E-guard + 10.S bite
U2 step  7  full consumer rendering for all 8 agents + always-layer (C12, C19); operative sets for ALL units; first-render routing
U2 step  8  ══ GATE G2 — PASS FOUR (Stacy; author recused) ══  → completion/re-grounding-pass-four.md
              PASSES (w.r.t. attack (a); findings: …) → (v)'s mechanical half joins 24.3's deterministic list  [the table edit is the artifact]
              FAILS        → Fork A: (v)'s mechanical half struck; behavioral instruments own the property  [the demotion edit is the artifact]
              NOT-RUNNABLE → treated as FAILS
```

- **Why G1 sits at step 4.** C3's falsification tests the **definition** of triviality against exemplars, and the exemplars need **real units** (step 1) and **fixed operative sets** (step 3). The **triviality code is not written until the definition holds**, so a BREAKS verdict costs no rework of code (11.6.7).
  - **Option for Stacy**: a paper pass on this design's C18 text *during the design round* is permitted. It does **not** replace G1, because G1 runs against committed operative sets.
- **G2's precondition** (11.8.6): 10.G and 10.S are implemented **and their bites are recorded**, which happens at steps 1, 2 and 6. G2 is not schedulable before step 7.
- **Every bite runs isolated from C6** (10.8c): each fixture lives under `tools/agent-generator/__fixtures__/`, which is outside `guardedRoots()`, and each bite names its test id.

---

## Migration — existing consumers (dp-portfolio at `@3fn/core@12.0.5`, and any pre-123 install)

A pre-123 consumer has the **copied** `src/components/core`, `.kiro/steering`, `governance` and `.kiro/agents`. **Under the new resolver, their copied components would win every name and shadow every package update forever.** Their copied governance and agents are the imposter surface (D-live-2). `sync` (C7) therefore gains a **one-time migration report**, triggered when the manifest predates 123's contract version:

1. **Copied components**: for each file whose hash equals the manifest baseline (**unmodified by you**) → *"N unmodified copies of DesignerPunk components shadow package updates — remove them to receive updates (`sync --migrate-components`)"*. **Modified copies are listed as yours and kept.**
2. **Copied governance / steering / agents** → *"these copies carry DesignerPunk's internal process as if it were yours; the package now serves the docs and generates your agents — remove them (`sync --migrate-legacy`) and run `attach`"*.
3. **The registry pin and the tsconfig pin** (5.1, 5.2).

**Nothing is removed without an explicit flag.** This is the migration-scale version of report-never-silently-overwrite. *The dp-portfolio sync-refresh watch item (121 Req 4) is discharged by this report plus `attach`.*

---

## Data Models

```ts
// Birth detection (C2)
type BirthState = 'born' | 'partial' | 'unborn';

// Partition (C13)
interface Unit { anchor: string; parent: string | null; kind: 'heading'|'preamble'|'enumeration'|'degenerate';
  startLine: number; endLine: number; text: string; }

// Attribution (unchanged schema — 10.S changes only what `source` names and how many spans a body has)
interface AttributionSpan { lines: [number, number]; op: 'resolve'|'render'|'passthrough'; source: string; mode?: 'embed'; }

// Operative set (C16)
interface OperativeItem { id: string; kind: 'obligation'|'step'|'enumeration'|'route'|'command'; excerpt: string; }
interface OperativeUnit { canonicalHash: string; items: OperativeItem[]; confirmation: string /* path */; }

// Dispositions (C17)
type Disposition = 'retained' | 're-pointed' | 'superseded-by' | 'no-consumer-counterpart';
interface Signature { signer: string; canonicalHash: string; renderedHash: string;
  assent?: { surviving: string[] }; refuse?: 'should-re-point'; evidence: string; }

// Verdicts (C15, C18, gates)
type DerivationVerdict = 'VERIFIED' | 'FAIL_NO_DERIVATION' | 'FAIL_DISHONEST_NAMING';
type TrivialityOutcome = 'INAPPLICABLE' | 'CLEARED_MECHANICAL' | 'ROUTED';
type GateVerdict = 'PASSES' | 'FAILS' | 'NOT-RUNNABLE';        // G2; G1 uses HOLDS | BREAKS | NOT-RUNNABLE

// sync (C7)
type FileClassification = 'new' | 'updated-safe' | 'conflict' | 'unchanged' | 'removed' | 'deleted-by-you';
```

## Error Handling — the loud-failure catalog (exact strings)

| Condition | Message |
|---|---|
| `init` in a born repo | `this repo already has a design system (<root>) — init is the birth event and runs once. To join it: npm install → npx designerpunk generate → npx designerpunk attach --target=<tool>. To deliberately re-scaffold: npx designerpunk init --re-scaffold` |
| `init` in a partially-born repo | `found <config|token tier> at <root> but not <the other> — this repo looks partly initialized. Refusing rather than guessing. Inspect <root>, or run init --re-scaffold to complete it deliberately` |
| `attach` in an unborn repo | `no design system here — run 'npx designerpunk init' to create one` |
| Born repo, token index absent or empty | `no token index in this design system (<root>/token-index is absent or empty) — run 'npx designerpunk generate'` |
| Explicit `TOKEN_INDEX_DIR` missing | `TOKEN_INDEX_DIR is set to <path>, which is absent or empty — unset it, or run generate` |
| Rejected disposition term | `'repo-bound-in-entirety' is not a disposition. Under R5, a repo-bound section is the paradigm case for re-pointing. Choose 're-pointed', 'superseded-by', or 'no-consumer-counterpart'.` |
| Operative set stale | `canonical unit <anchor> in <file> changed — its operative set must be re-confirmed by <confirmer>` |
| Wrong confirmer | `operative set for <file> declares confirmer <x>; the C1 rule requires <y>` |
| Partition invariant broken | `partition(<file>) is not byte-identical to its source — refusing to emit spans` |
| Derivation, no span | `re-pointed <anchor>: no span in the rendering derives from it (containment checked against the partition tree) — FAILURE, not routed` |
| Consumer profile, unresolvable member | *(warning, exit 0)* `always-set member '<id>' is not in the installed package — emitted your agents without it. Run 'npm install' to repair a partial install.` |
| Publish rail | `@3fn/core@<v> is not visible on registry.npmjs.org (checked scope-explicitly) — do not announce this release` |

## Testing Strategy

- **Jest, functional lane, and no timing assertions**, per house law.
- **Every bite names its test and runs isolated from C6** (10.8c):

| Bite | Test id | Mutation | Expected red |
|---|---|---|---|
| 10.G Bite 1 | `partition.golden.test.ts` | collapse the splitter to `##` | the unit list differs from **hand-authored** `expected-units.json` |
| 10.G Bite 2 | `grain-guard.two-sided.test.ts` | collapse to `##` | the honest `###` re-pointing is REJECTED (assertion (a)) |
| 10.S | `semantics-guard.<target>.test.ts` (per target) | force `source: 'consumer-profile:…'` on a re-grounded unit | E is REJECTED |
| 10.S twin | `spans.source-origin.test.ts` | the same, in the shared function | `source ≠ S's anchor` |
| 3.6 brand | `consumer-integration › brand-survival` | swap the brand for `Symbol()`; delete the consumer-tree source file | red; the token disappears |
| 5A | `sync.name-contract.test.ts` | remove a referenced name from the fixture set | the report names it |
| 13 | `consumer-entry.degradation.test.ts` | delete a resolvable member | warning text, exit 0 |
| 6 | `scripts/__bites__/verify-publish-rail.99.99.99.log` | a version never published | 404, non-zero |

- **The golden expected-unit list — form and process** (Open input 20, DD6):
  - `tools/agent-generator/__fixtures__/golden-partition/fixture.md` holds all five behaviors: nested `##`/`###`, an orphan preamble, a fenced `##`, a heading-free enumerated member, and a zero-heading member.
  - **`expected-units.json` is HAND-AUTHORED.** It is canonical JSON with one object per unit, and its first key is `"_provenance": "HAND-AUTHORED — never regenerate from partition() output; changes are reviewed diffs"`.
  - **The test file does not import or call any snapshot API.** A companion assertion **fails if a `__snapshots__` directory exists** under `golden-partition/`, so `jest -u` has nothing to update.
  - A change to the list is a **reviewed diff** in the PR, and the PR body names why the expected partition changed.

## Design Decisions

- **DD1 — The commit policy's CONTENT (Open input 16).** The table is at C24.
  - **Agent artifacts are COMMITTED**, for every attached target:
    - (1) `CLAUDE.md` and `.claude/settings.json` are the consumer's own files with managed regions, and they **cannot** be gitignored;
    - (2) committed agent artifacts make a `sync`-driven agent change a reviewable diff;
    - (3) it matches this repo's own convention (generated, committed, diff-guarded);
    - (4) a same-harness joiner needs zero agent steps.
  - **The sync manifest is committed**, so a teammate's `sync` has the founder's baseline. Without it, every file classifies as a first-encounter conflict.
  - *Residual: a mixed-harness team commits several targets' artifacts, which is repo noise, and accepted. Generated platform output defaults to regenerated. A team whose build cannot run `generate` may commit it, and the policy says so rather than forbidding it.*
- **DD2 — Reuse Spec 111's `sync` machinery; re-scope `MANAGED_DIRS`** (C7). *Residual: the generated surfaces' "package side" is freshly generated output rather than a package file. That is a new input path into a classifier built for copies, so a mismatch in generation settings would read as `updated-safe` churn. It is bounded because `attach` and `sync` share `emitConsumer`.*
- **DD3 — Birth detection walks to the nearest ancestor and stops at `.git`** (C2). *Residual: in a monorepo whose design system lives in a sub-package, running from the monorepo root finds nothing and reads unborn. For the MCP that means a labelled reference index is served, which is loud rather than impersonating; for `init` it means a birth at the wrong level. Named, not solved. The error text shows the root it used.*
- **DD4 — The non-birth emit command is `designerpunk attach` (Open input 17).** `attach` means *join this harness to the design system*: it is **distinct from `init` (birth) and `generate` (the token pipeline)** under 15B's vocabulary law, and reads correctly in the joining path. `agents` was the literal alternative, but it understates the command, which also emits MCP config and approvals.
  - *Residual: an unfamiliar verb costs one lookup. Leonardo, as the persona's advocate, may prefer `agents`, and this is the most reviewer-sensitive naming decision here.*
- **DD5 — `--re-scaffold` keeps its name (Open input 17)**, with the requirement's semantics: refuse by default, an explicit flag, and no silent re-add. `--force` was rejected as dangerously generic, and `--rebirth` because Model B says birth happens once. *Residual: none beyond Leonardo's recorded counter.*
- **DD6 — The golden list is hand-authored JSON with a snapshot-API ban enforced by test (Open input 20).** *Residual: hand-authoring the expected partition of a five-behavior fixture takes about half a day (Lina's sizing), and a correct splitter change costs a manual list edit. That friction is the point.*
- **DD7 — The steady-state 10.S guard runs per declared target, through each adapter (Open input 21)** (C15). The unit twin stays as the cheap early bite. *Residual: the guard's run time scales with targets. It is trivial at two.*
- **DD8 — Per-harness MCP approval (Open input 18): two emitters, verification status stated, and cold behavior verified in U3's cross-target join run** (C8). **CC's approval is a `permissions.allow` managed region plus a per-user trust prompt that committed config cannot pre-grant. Kiro's is `autoApprove`.**
  - *Residual: Kiro's cold-open trust behavior is unverified until that run; the install doc's instruction is phrased harness-agnostically ("if your harness asks") until the run records the truth. Cursor is not a declared target, so it is not designed here.*
- **DD9 — 19.7's no-`--target` branch: EMIT the declared default (`cc`)**, as a proposal U3 confirms alongside the step count (the requirement puts the pick in U3). `cc` is proposed because R1's persona is a solo founder building with agents. *Residual: the refusal branch is one step longer and never guesses the harness. If U3's step-count work shows refusal reads more clearly, it wins.*
- **DD10 — The name-contract source of truth is the component metadata the floor already pins** (C7). *Residual: a token reference that exists only in component implementation code, and not in metadata, is invisible to the check. The metadata is the declared contract, and an undeclared reference is a component defect for Lina's domain.*
- **DD11 — 5A WIDENS to the type-contract seam, and value guidance is ADOPTED (Open input 19).** The type contract is checked with `TOKEN_CONTRACT_VERSION` plus the enum member lists, recorded in the manifest. The value guidance adds the component's declared use plus our value, labelled as a reference.
  - *Residual: showing our value risks reading as a suggestion to adopt our palette. The label is load-bearing, and the install doc's § "When sync reports a missing token" states that the value is a reference, not a recommendation.*
- **DD12 — The `dist.tarball` host assertion AUGMENTS 6.2's version check; it does not supersede it.** The version check proves the version exists on the rail; the host check proves where the answer came from. Each fails differently, and keeping both costs one line. *Residual: two assertions to maintain.*
- **DD13 — One release-recipe and governance ballot for 123's law edits.** It covers: `RELEASE-FLOW.md` (6.4, 6.7 paste target), `release-management-system.md` (the recurring trio obligation for 23.7 and the changelog step for 21.2), and `classification-map.md` (6.5's register row, C21's L686 edit). **It is one record-first ballot, Peter-merged, in U4.**
  - *Residual: bundling means one contested item delays the rest. The tasks round may split it.*
- **DD14 — `product-mcp-server/src/` is NOT added to `files[]`** (7.4). The bundles are the delivery form (118's exempt surface). The existing `mcp-server/src/` and `application-mcp-server/src/` entries are candidates for removal by the same logic, and C5's closure decides them. *Residual: none.*
- **DD15 — Starter specs are scaffolded to `specs/` at the repo root**, not to a harness directory (C25; P5). *Residual: `specs/` may collide with an existing directory in a consumer repo. On collision the scaffold reports and does not overwrite, per C27.*
- **DD16 — Release notes: a consumer-facing `CHANGELOG.md` ships** (C29). *Residual: it is one more artifact authored per release. It is the most deferrable item in U4, and the cut-line allows deferring it.*
- **DD17 — Req 1.1's CONSUME-posture subpath: DE-SCOPED.** No install-only use was identified, since CONSUME consumers read our themes through the docs MCP or use compiled CSS. **Re-entry trigger**: a documented CONSUME flow that imports theme overrides in code. **Req 1.5's decision**: our components' token definitions **stay behind the component surface**. They ship compiled, and resolve against the consumer's semantic names at the CSS custom-property level, which is exactly the name contract C7 checks. *Residual: this rests on CSS-level resolution for web. For iOS and Android the resolution model is Kenya's and Data's, and it joins their tasks-round question (4.5).*

## Open design inputs 16–21 — dispositions

| # | Input | Disposition |
|---|---|---|
| **16** | Commit policy CONTENT | **DECIDED** — DD1, table at C24. Agent artifacts, MCP configs and the sync manifest are **committed**; `token-index/`, platform output and the personal note are **regenerated or local**. |
| **17** | Non-birth emit command name; `--re-scaffold` final name | **DECIDED** — `designerpunk attach` (DD4); `--re-scaffold` kept (DD5). |
| **18** | Per-harness MCP approval | **DECIDED in design, cold behavior VERIFIED IN U3** — two emitters (C8, DD8). CC: `permissions.allow` managed region plus a per-user trust prompt. Kiro: `autoApprove`. **Shapes verified against this repo's live configs; cold-session behavior verified by the U3 cross-target join run.** |
| **19** | 5A type-contract widening; value guidance | **DECIDED** — widened (contract version + enum members); value guidance adopted, labelled (DD11). |
| **20** | Golden unit list form | **DECIDED** — hand-authored JSON, provenance key, snapshot ban enforced by test (DD6, Testing Strategy). |
| **21** | 10.S guard per-target shape | **DECIDED** — `describe.each` over `consumer-profile.yaml` targets, through each adapter; unit twin retained (DD7, C15). |

## What resisted design-grain specification (round input, not defect)

1. **Cold-harness trust behavior.** Config shapes are verified, but what a cold CC or Kiro session **asks** can only be observed live. Design names the instrument (the U3 cross-target join run) rather than asserting the behavior.
2. **The semantic correspondence judgment** (5b's routed half) is non-mechanical by ruling. Design gives it a **format** (itemized assent against fixed item ids) and a **calibration set** (the exemplar table), but **not an algorithm**, and it should not claim one.
3. **Seat authentication.** All agents commit under **one git identity**, so `confirmer:` and `signer:` fields **declare** a seat and cannot **prove** one. The evidence seam is a committed note at a cited path, audited post-merge by Stacy. **Real authentication awaits 125-B U3's authoring-identity and CODEOWNERS layer.** This is the presence-of-a-token class at the infrastructure layer, named rather than hidden (R26.8).
4. **The triviality threshold (½)** remains *arbitrary and currently unfalsified* (Stacy R2). Design carries it unchanged, and G1 tests it.
5. **iOS and Android name-contract resolution** (DD17's residual) depends on how platform component tokens resolve semantic names. That is Kenya's and Data's model, and it joins their tasks-round question.
6. **Monorepo birth detection** (DD3's residual): the stop-at-`.git` rule is right for single-repo products and underspecified for design systems nested in monorepo packages.
7. **Tasks-round items the requirements placed there, not design**: the expected release count (26.3), the tripwire thresholds (26.5), the `.swift`/`.kt` disposition (4.5), and the MIDPOINT carrier (proposed here as U2).

## Cross-References

Requirement traces are given inline throughout. Sources of authority are unchanged: `requirements.md` § Introduction (Model B + the ruled record), `design-outline.md` (settled), `feedback/requirements.md` (the full requirements round). **This design introduces no new law.** Every normative string above (messages, file paths, schema fields) is either quoted from a ruled source or fixed here as implementation detail for the round to attack. The governance edits it requires ride one ballot (DD13).
