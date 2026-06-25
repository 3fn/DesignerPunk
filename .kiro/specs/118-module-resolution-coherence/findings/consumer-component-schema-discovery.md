# Consumer Component Schema Discovery — Lina's Findings

**Author:** Lina (Stemma component specialist)
**Date:** 2026-06-25
**Spec:** 118 — Module Resolution Coherence
**Status:** Design clarification for Ada to implement against. No code changes made.
**Decision context:** `.kiro/specs/118-module-resolution-coherence/findings/runtime-ts-resolution-target-model.md` § "Class C′" (consumer catalog SHALL reflect the consumer's design system, including added/edited components).

---

## TL;DR

- **Recommended discovery source:** derive the component-schema scan root from the **same config the token side already uses** — specifically resolve it from `config.configDir`, defaulting to `<configDir>/src/components/core`, with an optional explicit `componentSchemaDirs` override field for consumers whose components live elsewhere. Do **not** keep `path.resolve(__dirname, ...)`. (`generateTokenIndex.ts:119`)
- **Authoring contract:** the existing `<Component>/<Component>.schema.yaml` convention with a top-level `tokens:` map is the contract. It already works for consumer components; it is currently **internal-only documentation**. The gap is documentation/exposure, not format.
- **Copied-34 question:** Yes — `generate` should index the consumer's copy (`<configDir>/src/components/core`), not the package originals. The application MCP **already does exactly this** (`COMPONENTS_DIR=./src/components/core`); the token-index is the lone outlier.
- **Coherence:** the relationship-map (`buildConsumerMap`) and token-loading (`loadComponentTokens`) do **not** read the same source today, and the current config shape does **not** cleanly express "consumer component schema root" as a first-class concept. This is the one real gap — surfaced below.
- **123 boundary:** discovery *mechanics* (where `generate` and the MCP look, given a config) are 118's to settle. *What a consumer's design system formally IS / how it's distributed and served* is 123. Settle the scan-root resolution now; don't invent a distribution model.

---

## 1. Current state — verified against code

### The half-awareness is real and isolated to one line

- `buildConsumerMap(componentsDir)` (`src/generators/generateTokenIndex.ts:62-94`) scans a directory for `<dir>/*.schema.yaml`, reads each schema's `tokens` field, and inverts it into token→[components]. The logic itself is source-agnostic — it takes a `componentsDir` argument.
- The **only** problem is the call site: `const componentsDir = path.resolve(__dirname, '..', 'components', 'core')` (`generateTokenIndex.ts:119`). This hard-binds the scan to the **package's** `src/components/core`, regardless of who's running `generate`. Peter's summary is accurate.
- The output feeds `semanticsIndex[...].consumers` (`generateTokenIndex.ts:179`) — so a consumer's `PricingCard` consuming `color.semantic.primary` would never appear as a consumer of that token in their own `semantics.yaml`.

### The token side is already consumer-aware (different mechanism)

- `loadComponentTokens(config)` (`src/cli/loadComponentTokens.ts:39-70`) discovers token **values** from two config-driven sources: `{config.tokenSourceRoot}/component/` (`loadComponentTokens.ts:49`) and each dir in `config.componentTokenDirs` scanned for `*.tokens.ts` (`loadComponentTokens.ts:60-63`). Both are resolved from the consumer's config (`ConfigLoader.ts:117-123`).
- So today: consumer token **values** (consumer-aware, config-driven) + package **relationship-map** (package-bound, `__dirname`). Confirmed.

### The application MCP is ALREADY fully consumer-aware

This is the most important verification and it reframes the whole question:

- The MCP reads `componentsDir = process.env.COMPONENTS_DIR || 'src/components/core'` (`application-mcp-server/src/index.ts:480`, default at `:24`), resolved relative to the MCP process cwd (the consumer repo).
- The `init`-scaffolded MCP config sets `"COMPONENTS_DIR": "./src/components/core"` (`src/cli/templates/mcp-config.json.template`) — i.e. the **consumer's copy**, and `"TOKEN_INDEX_DIR": "./token-index"` (the consumer's generated index).
- So `get_component_full` / `find_components` already assemble from the consumer's schemas. A consumer who adds `PricingCard.schema.yaml` would see it in the MCP **today** — but their `token-index/semantics.yaml` would still omit it as a token consumer, because `generate` read the package copy.

**Conclusion:** the consumer-aware convention already exists and is already exercised by the MCP. The token-index simply diverged from it. We are aligning the token-index to an established pattern, not inventing one.

### `init` puts the schemas in the consumer's repo

- `init` copies `pkgRoot/src/components/core` → `<dest>/src/components/core` with `rewriteBuildImports` (`src/cli/init.ts:80-87`), merge-mode (never overwrites consumer edits — `copyDir` at `:306-307`). So the consumer owns 34 schemas locally and can edit/delete/add.
- The generated config's `componentTokens` already includes `'./src/components/core'` (`init.ts:455`) — meaning **the consumer's component directory is already a declared config input**, just only consumed for `*.tokens.ts`, not for `*.schema.yaml`.

---

## 2. Recommended discovery source

**Resolve the schema-scan root from config, not `__dirname`.** Concretely, in priority order:

1. **If a consumer sets an explicit `componentSchemaDirs` config field** → scan those (resolved relative to `configDir`, mirroring `componentTokenDirs` at `ConfigLoader.ts:123`).
2. **Else default to `<configDir>/src/components/core`** — the canonical location `init` writes to and the MCP already reads.

### Why this over the alternatives Peter listed

- **(a) scan copied `src/components/core` from active config** — this is the *default* in my recommendation. Correct and zero-ceremony for the common case. On its own it's slightly too rigid (hard-codes the convention path), hence pairing with (b) as an override.
- **(b) dedicated `componentSchemaDirs` field** — good as the *escape hatch* for consumers whose components don't live under `src/components/core`, but as the *only* mechanism it forces every consumer to configure something that `init` could default. Use it as override, not requirement.
- **(c) alongside `componentTokenDirs`** — tempting because `componentTokenDirs` already contains `./src/components/core`. **But I recommend against overloading it.** `componentTokenDirs` is documented as "directories to scan for `*.tokens.ts`" (`defineConfig.ts` `DesignerPunkConfig.componentTokens`). Schemas and token files are different artifacts with different scan semantics (`*.schema.yaml` vs `*.tokens.ts`, top-level-only vs recursive). Reusing one field for two artifact types couples them and will confuse the next person who edits either scan. Keep the *default root* shared (both happen to be `src/components/core`) but keep the *config field* distinct.
- **(d) derive from where `loadComponentTokens` discovers tokens** — this is the *intent* I most agree with (one consumer-component source of truth), but note the two scans legitimately differ: token loading reads `{tokenSourceRoot}/component/` **plus** `componentTokenDirs`, whereas schemas live in the component directories only. They overlap at `src/components/core` but are not identical sets. So "literally reuse the token discovery list" would pull `{tokenSourceRoot}/component/` (a token-only dir with no schemas) into the schema scan — harmless (no `.schema.yaml` there) but misleading. Better: share the **default convention path**, expose a **dedicated override**, and document that both default to the same place.

### Counter-argument (mandatory)

The simplest possible fix is one line: change `generateTokenIndex.ts:119` to resolve `<configDir>/src/components/core` and add no new config field at all. That genuinely covers the ratified `PricingCard` case, since `init` consumers always have their components there. **My recommendation adds `componentSchemaDirs` on top of that** — and that field may be speculative. If Peter wants to ship the minimum that satisfies Class C′, drop the override field for now and ship just the config-rooted default; add `componentSchemaDirs` only when a real consumer needs components outside `src/components/core`. I lean toward including the override because it costs little and matches the `componentTokenDirs` precedent, but the default-only path is defensible and YAGNI-cleaner. Peter's call.

### Plumbing constraint Ada must honor

`generateTokenIndex` does **not** currently receive `config` — it's called with a literal output path and a `TokenIndexInput` of pre-resolved token arrays (`designerpunk.ts:144-149`). The scan root is computed *inside* the generator from `__dirname`. To make it config-driven, the resolved scan root (or `config`) must be **passed in** from `runGenerate` (`designerpunk.ts:105-149`), not recomputed in the generator. Recommended: resolve the schema dirs in `runGenerate` (where `config` is in scope) and add them to `TokenIndexInput` (e.g. `componentSchemaDirs: string[]`), keeping the generator a pure function of its inputs. This also matches Spec 114's "no barrel/ambient fallbacks — data is explicitly provided" intent already stated in `TokenIndexInput`'s doc (`generateTokenIndex.ts:24-37`).

---

## 3. Authoring contract — how a consumer declares `PricingCard`

**The contract already exists. It is the Stemma schema convention, currently under-documented for consumers.**

To add `PricingCard` so it lands in both the token-index and the MCP, a consumer:

1. Creates `<configDir>/src/components/core/Pricing-Card/Pricing-Card.schema.yaml` (or `PricingCard/...` — see naming note).
2. Authors it by the existing schema convention. The fields `buildConsumerMap` requires are minimal:
   - `name:` — the component's display name (falls back to the directory name if absent — `generateTokenIndex.ts:78`).
   - `tokens:` — a map whose values are token references. The reader accepts three shapes per entry (`generateTokenIndex.ts:79-80`): a bare string, or an object with `.reference`, or an object with `.name`. Values may be arrays (the Icon-Base schema uses `tokens.icon: [icon.size050, ...]`) — note: `Object.values(schema.tokens)` iterates the top-level map values, so the array form means each *group* is one value; the reader's `tokenRef?.reference || tokenRef?.name` handling and string handling cover scalars, and array groups are walked as values. **Ada must verify array-group handling** — see constraint below.
3. Runs `npx designerpunk generate` → `PricingCard` now appears under `semantics.yaml` `consumers` for each token it references, and (already, independently) in the MCP catalog.

### Constraints Ada must honor

- **`tokens` field shape.** Only schemas with a top-level `tokens:` map contribute to the consumer map. I verified **31 of 34** package schemas have `tokens:`; 3 do not (e.g. `Badge-Count-Base.schema.yaml` has no `tokens:` field — it inherits/uses tokens via size variants described prose-only). So "no `tokens` field" is a legitimate, existing state — `buildConsumerMap` already skips them (`generateTokenIndex.ts:76`). A consumer component with no direct token consumption simply won't appear in the consumer map (but still appears in the MCP). This is correct behavior, not a bug — but it means the authoring doc must tell consumers: *if you want your component associated with tokens in the index, declare a `tokens:` map.*
- **Array-group values.** `buildConsumerMap`'s inner loop does `for (const tokenRef of Object.values(schema.tokens))` then treats each as scalar/object (`:79-80`). Icon-Base's schema nests arrays under group keys (`tokens.icon: [...]`). I could not confirm from this pass that array-valued groups are flattened correctly — the current code would treat an array as a single `tokenRef`, and `typeof array === 'object'`, so `array?.reference || array?.name` → `undefined` → skipped. **This is a latent correctness question Ada should validate**: if package schemas use the array-group shape and rely on appearing in the consumer map, the current reader may already be under-counting. Either way, the **authoring contract Ada documents for consumers should specify the exact accepted `tokens:` shape** so consumer schemas don't hit this ambiguity. (Flagging per obligation-to-flag; it predates this change but the doc work will expose it.)
- **Naming.** Stemma convention is `[Family]-[Type]-[Variant]` (e.g. `Badge-Count-Base`), directory name == schema `name`. Consumers *should* follow it for ecosystem-grade components, but per the governance gradient a product one-off can use a lighter name. The reader doesn't enforce naming; it uses `schema.name || dir.name`. No hard constraint, but document the convention so consumer components are coherent with the catalog.
- **Documentation status.** The schema format is currently **internal-only** — authored by me/the package, documented in steering (`Component-Schema-Format.md`) but not surfaced as a consumer authoring path. **For consumers to author `PricingCard`, the schema format + location + minimal-required-fields must be documented for them.** That doc work is partly mine (component authoring) and partly belongs to 123 (consumer-facing distribution docs) — see boundary below. This is a real gap: today a consumer *can* drop a schema in and it'll be read, but nothing tells them how.

---

## 4. The copied-34 question

**Yes — `generate` should index the consumer's copy, not the package originals.** Confirmed against the component model and, decisively, against existing behavior:

- It's their system now. `init` copies the 34 schemas into the consumer repo as a *starting point the product molds* (matches the Stemma ownership model: every component in the repo is the consumer's domain — there's no "ecosystem vs product" split at the file level). If a consumer deletes `Avatar-Base` or edits `Button-CTA`'s tokens, their catalog must reflect that.
- The application MCP **already** indexes the consumer's copy (`COMPONENTS_DIR=./src/components/core`). If the token-index kept reading the package copy, the two halves of the same catalog would disagree — the MCP would show the consumer's edited `Button-CTA` while `semantics.yaml` consumers reflected the package's. **Aligning the token-index to the consumer copy removes an existing divergence; keeping `__dirname` perpetuates it.**

Counter-argument: indexing the consumer's copy means a consumer who *breaks* a schema (malformed YAML, deletes the `tokens` field) silently drops that component from the consumer map. But `buildConsumerMap` already swallows parse errors (`:87-89`) and skips token-less schemas — so the failure mode is "component quietly absent," not "generate crashes." That's acceptable for a starting-point-you-mold model, though Ada may want a warning when a `.schema.yaml` fails to parse (currently a silent `catch {}`). Minor, optional.

---

## 5. Coherence with the token side — the one real gap

**The relationship-map and token-loading do NOT read the same source today, and the current config shape cannot cleanly express "consumer component schema root" as a first-class concept.** Stating this plainly per the brief.

- Token loading: config-driven (`tokenSourceRoot/component` + `componentTokenDirs`). Schema scan: `__dirname`-bound. Different mechanisms, different roots.
- After the fix, they'd both *default* to `<configDir>/src/components/core` — coherent for the common `init` case. But the config has **no field that means "where my component schemas live."** `componentTokenDirs` means token files; `tokenSource` means primitive/semantic source. The schema root is currently *implied* by convention, not *declared*.
- **Can the current config shape support it without a new convention?** Partially. The default-path approach (`<configDir>/src/components/core`) needs **no** new field and satisfies Class C′ for `init` consumers. But to be truly coherent — one declared source of truth for "the consumer's components" — there *should* be an explicit notion. My recommendation: add `componentSchemaDirs?: string[]` to `DesignerPunkConfig` (`defineConfig.ts`), defaulting to `['./src/components/core']`, resolved in `ConfigLoader` exactly like `componentTokenDirs` (`ConfigLoader.ts:123`), exposed on `ResolvedConfig`. That gives one declared, overridable, config-driven source — coherent with the token side's config-driven discovery — without overloading an existing field.

**Mismatch to flag for Ada:** if you reuse `componentTokenDirs` for schema scanning (option c), you inherit `{tokenSourceRoot}/component/` semantics confusion and couple two artifact lifecycles. If you add nothing (pure default), you satisfy the ratified case but leave "schema root" undeclared — fine until a consumer's components live elsewhere, at which point there's no escape hatch. The `componentSchemaDirs` field is the coherent middle. This is a config-shape decision that touches Ada's domain (config/token pipeline) — recommend Peter confirm the field with Ada before she builds.

---

## 6. The 123 boundary

**118 settles:** given a consumer config, *where* `generate` scans for `.schema.yaml` and how that scan root is resolved (config-driven, not `__dirname`); the plumbing of the schema root through `TokenIndexInput`; and the minimal `tokens:` authoring contract a consumer schema must satisfy to appear in the index. These are catalog-*generation* mechanics — squarely 118's "module resolution coherence" remit (the same class of `__dirname`-vs-config bug 118 exists to fix).

**123 owns:** what a consumer's design system formally *is* and how it's *distributed/served* — i.e. the consumer-facing authoring documentation for components (the "how do I author a PricingCard" guide as a published contract), whether component schemas are part of the distributed/served design-system surface, versioning of consumer components, and any promotion path from product one-off to ecosystem. Do **not** invent a distribution or serving model here.

**The seam between them:** this note establishes that the *format* (`.schema.yaml` + `tokens:` map) and *default location* (`src/components/core`) are stable enough to build 118's discovery against **right now**, without waiting on 123. If 123 later changes how the design system is served (e.g. schemas move into a manifest, or are served from the package rather than copied), the **config-driven scan root** recommended here is exactly the indirection that lets 123 redirect discovery without touching `generate`'s internals again. So building 118 this way doesn't pre-empt 123 — it gives 123 a clean seam.

**One explicit non-preemption:** the consumer-facing *authoring documentation* gap I flagged in §3 (schema format is internal-only today) is real, but writing the consumer-facing version of it is plausibly 123's deliverable, not 118's. 118 should document the *contract Ada implements against* (this note); the *consumer guide* can land with 123. Recommend Peter not block 118 on consumer-doc authoring.

---

## Summary for Ada

- **Discovery source:** resolve schema scan root from config (`<configDir>/src/components/core` default); pass it into `generateTokenIndex` via `TokenIndexInput` rather than computing from `__dirname` (`generateTokenIndex.ts:119` is the fix site; `designerpunk.ts:105-149` is where to resolve it). Recommend a dedicated `componentSchemaDirs?` config field as override (don't overload `componentTokenDirs`) — confirm the field with Peter.
- **Authoring contract:** existing `<Component>/<Component>.schema.yaml` with a top-level `tokens:` map. Already consumer-readable; format must be documented for consumers (partly 123's job).
- **Index the consumer's copy, not the package's** — aligns with the application MCP, which already does (`index.ts:480`, mcp-config template `COMPONENTS_DIR`).
- **Blocker/constraint surfaced:** config has no first-class "component schema root" concept today; the `tokens:` array-group shape in `buildConsumerMap` (`generateTokenIndex.ts:79-80`) has a latent correctness question Ada should validate while she's in there; and consumer authoring docs don't exist yet (123 seam).
