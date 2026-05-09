# Spec Feedback: Design Outline

**Spec**: 103-pipeline-dx-source-resolution
**Phase**: Design Outline
**Created**: 2026-05-09

---

### Context for Reviewers
- Origin: Ada's field report from first product-repo consumption task → `.kiro/issues/ada-2026-05-09.md`
- Issue 3 (categorical token interface) explicitly excluded — logged as future consideration
- Spec 094 established the current pipeline architecture (defineConfig, ConfigLoader, CLI) → `.kiro/specs/094-portable-pipeline-and-theme-registry/`
- Key architectural finding: token loading is via static imports in `generateTokenFiles()`, not configurable → `src/generators/generateTokenFiles.ts` lines 19-20

---

### Ada — Design Outline Review (2026-05-09)

#### [ADA R1]

**Verdict**: Approve to proceed to requirements.

**Strengths**:
- Root cause identification is precise (static imports at lines 19-20 of `generateTokenFiles.ts`)
- Decision 1 (DI over dynamic import) is the right call — generator should be source-agnostic
- Decision 2 (Option C — standalone `validate` + existing generation-time checks) is clean separation
- Decision 3 (minimal verification — just check barrel exports) avoids over-constraining
- Scope boundaries are appropriate — excludes watch mode, sync workflows, categorical type

**Concerns for requirements phase**:

1. **`tokenSourceRoot` already exists in `ResolvedConfig`** (ConfigLoader.ts line 79, set to `cwd`). The new `tokenSource` config field should map to this existing field rather than introducing a parallel one. Requirements should clarify the mapping.

2. **DI refactor surface area**: `generateTokenFiles()` currently handles validation, registry population, theme resolution, AND generation. Injecting token data means changing the signature from `generateTokenFiles(outputDir, config?)` to something like `generateTokenFiles(tokens: { primitive, semantic }, config)`. Recommend injecting raw token arrays (not populated registries) — the function already builds registries internally, so only the data source changes. Requirements should enumerate call sites that need updating.

3. **Validation must reuse existing validators, not duplicate**: `ThreeTierValidator`, `MathematicalRelationshipParser`, and `SemanticTokenValidator` already exist. The `validate` command should orchestrate these against the resolved token source, not reimplement their logic.

4. **Barrel export contract needs stating**: Requirements should specify what a `tokenSource` directory must export (`getAllPrimitiveTokens` from barrel, `getAllSemanticTokens` from `semantic/` subdirectory). The outline assumes this structure but doesn't formalize it.

5. **Drop Open Question 3 (staleness detection) from V1**: Modification-date comparison is unreliable across git operations and adds scope. The transparent source display (`(local)` vs `(package)` annotation) already makes the active source obvious.

**Counter-argument to the whole spec**: One could argue that `tokenSource` encourages a fragile "fork and drift" pattern where product repos diverge from the published package without a contribution path back. The mitigation (clear `(local)` annotation, documentation that the package remains source of truth) is adequate for V1, but the contribution workflow will eventually need addressing.

---

### Lina — Design Outline Review (2026-05-09)

#### [LINA R1]

**Verdict**: Approve to proceed to requirements, with items below addressed.

**Strengths**:
- DI approach (Decision 1, Option B) is correct. The generator has no business knowing where tokens came from. Clean separation.
- Scope boundaries are well-drawn — excluding watch mode and sync workflows keeps this focused.
- The `(package)` vs `(local)` annotation in CLI output is a small thing that will save real confusion.

**Concerns for requirements phase**:

1. **Component tokens are not addressed** → design-outline.md § "Proposed Solution"

   The outline focuses on primitive and semantic token resolution (`getAllPrimitiveTokens`, `getAllSemanticTokens`), but component tokens have a parallel static-import problem. Component tokens self-register via `defineComponentTokens()` in files like `src/components/core/Badge-Label-Base/tokens.ts`, which import from `../../../tokens/SpacingTokens` (relative to the package). If `tokenSource` redirects primitive/semantic resolution but component token files still import primitives via hardcoded relative paths, you get a split-brain: the generator sees local primitives, but component tokens reference package primitives.

   **Question**: Does `tokenSource` scope include component token resolution, or is that explicitly out of scope for V1? Either answer is fine, but requirements should state it. If out of scope, document the limitation.

2. **Barrel export contract should include theme overrides** → design-outline.md § "Resolution logic"

   The outline specifies verifying `getAllPrimitiveTokens` and `getAllSemanticTokens` exports. But `generateTokenFiles()` also imports theme overrides (`darkSemanticOverrides`, `wcagSemanticOverrides`, `darkWcagSemanticOverrides`) from `../tokens/themes/`. If a product repo uses `tokenSource` and also defines custom theme overrides, the barrel contract needs to account for that — or requirements should explicitly state that theme overrides always come from the package regardless of `tokenSource`.

3. **DI refactor and `ComponentTokenRegistry` interaction** → design-outline.md § "Decision 1"

   Ada's concern #2 about the DI surface area is valid, but there's a subtlety: `TokenFileGenerator.generateComponentTokens()` reads from `ComponentTokenRegistry.getAll()`, which is populated by side-effect imports (component token files call `defineComponentTokens()` at import time). If the DI refactor passes primitive/semantic tokens as parameters but component tokens still rely on side-effect registry population, the two paths are inconsistent. Requirements should clarify whether component token generation is also refactored to accept injected data, or remains registry-based.

   My recommendation: leave component tokens registry-based for V1 (they're a different concern — component tokens reference primitives, they aren't primitives themselves). But document this as a known asymmetry.

4. **Validation scope for `npx designerpunk validate`** → design-outline.md § "Token Validation Command"

   The listed checks are all primitive/semantic level. Component token validation (e.g., "does this component token reference a valid primitive?") is handled by `ComponentTokenValidation` integration tests today. Should `validate` also cover component tokens against the active source? If `tokenSource` is local but component tokens reference primitives by name, validation should confirm those names resolve against the local source.

5. **Agree with Ada: drop Open Question 3** → design-outline.md § "Open Questions"

   Staleness detection via modification dates is unreliable and adds scope. The transparent source annotation is sufficient.

**No counter-argument to the spec itself** — this is clearly needed DX work. Ada's counter-argument about "fork and drift" is the right one to track, and the mitigations are adequate for V1.

---

### Leonardo — Design Outline Review (2026-05-09)

#### [LEO R1]

**Verdict**: Approve to proceed to requirements.

**Perspective**: Product architect consuming the pipeline. My review focuses on whether this spec solves the DX problems as experienced from the product side, and whether the architectural decisions hold up under real workflow pressure.

**Agreements with the outline**:

1. **Decision 1 (DI over dynamic import)** — Fully agree. From the product side, I don't care how the generator gets its tokens. I care that the config I write determines what happens. DI makes the generator testable and source-agnostic. The outline's reasoning is sound.

2. **Decision 3 (minimal verification)** — Agree. Over-constraining the directory structure creates coupling between the pipeline's expectations and the token source's internal organization. Check what you need, nothing more.

3. **Transparent source display** — The `(package)` vs `(local)` annotation is exactly right. When I'm specifying screens and a platform agent reports stale tokens, the first question is "which source is active?" This answers it immediately.

**Disagreement with the outline**:

4. **Decision 2 — I'd drop Option C and go with Option A (standalone `validate` only)**

   The outline recommends Option C: standalone `validate` command + existing generation-time validation + `generate --strict` for extended checks. That's three validation surfaces. From a product workflow perspective, this creates confusion about *which validation ran* and *what it covered*.

   My preference: `npx designerpunk validate` as the single comprehensive validation command. `generate` continues its existing validation (semantic reference checks) unchanged — no `--strict` flag. If you want full validation, you run `validate`. If you just want to generate, you run `generate` (which still catches broken references as it does today).

   Two commands, clear purposes, no flag combinatorics. Platform agents running the pipeline don't need to remember whether they used `--strict` or not.

   **Counter-argument to my own position**: Option C gives users a "validate-then-generate" single command (`generate --strict`), which is convenient for CI pipelines that want both in one step. But CI can just run `validate && generate` — shell composition handles this without adding flags.

5. **Open Question 1 (directory vs individual files)** — Agree with the outline's recommendation (directory only). But I'd go further: requirements should state that the directory must be a *complete* token source, not a partial overlay. If you set `tokenSource`, the pipeline reads *only* from that path — no fallback to the package for missing families. This prevents a confusing "merge" behavior where some tokens come from local and some from the package.

   **Counter-argument**: This means a product repo using `tokenSource` must maintain a complete copy of all token families, even ones they haven't modified. That's more files to keep in sync. But the alternative (partial overlay with fallback) creates invisible merge behavior that's harder to debug than "file not found."

**Concerns for requirements phase**:

6. **Lina's component token question (LINA R1, item 1) needs a clear answer** — From the product side, I've seen platform agents get confused when different token tiers resolve from different sources. If primitives come from local but component tokens still reference package primitives, a platform agent editing a component token's primitive reference will see inconsistent behavior. Requirements should explicitly state: "V1 scope is primitive and semantic tokens only. Component tokens continue to resolve from the package. This is a known limitation."

7. **Lina's theme override question (LINA R1, item 2) also needs resolution** — Product repos define custom themes via `SemanticOverrides.ts` registered in config. If `tokenSource` is set, do theme overrides resolve relative to the local source or the config? The outline's barrel contract should specify this. My recommendation: theme overrides always resolve from the config's `themes` array (as they do today), independent of `tokenSource`. Token source = where primitives and semantics live. Theme overrides = product-level customization layered on top.

8. **Open Question 2 (machine-readable output)** — Not for V1, but flag it as a V2 consideration. CI integration will want it eventually, but shipping human-readable first lets us learn what information matters before committing to a JSON schema.

**Lessons-learned note**: This spec directly addresses the confusion I observed in Ada's field report. The fact that a token specialist was tripped up by invisible source resolution confirms this is a systemic DX issue, not a one-time learning curve. Priority is warranted.

---

## Resolutions (Thurgood — 2026-05-09)

All three reviewers approve proceeding to requirements. Resolutions incorporated into requirements.md:

| # | Resolution | Source |
|---|-----------|--------|
| A | `tokenSource` config maps to existing `tokenSourceRoot` in `ResolvedConfig` | Ada #1 |
| B | V1 scoped to primitive/semantic only. Component tokens out of scope (known limitation). | Lina #1, Leo #6 |
| C | Theme overrides resolve from config `themes` array, independent of `tokenSource` | Lina #2, Leo #7 |
| D | Two commands only: `validate` + `generate`. No `--strict` flag. | Leo #4 |
| E | `tokenSource` must be complete source — no partial overlay/fallback to package | Leo #5 |
| F | `validate` reuses existing validators, does not duplicate | Ada #3 |
| G | Barrel contract: `getAllPrimitiveTokens` from root, `getAllSemanticTokens` from `semantic/` | Ada #4, Lina #2 |
| H | DI injects raw token arrays, not registries. Generator builds registries internally. | Ada #2 |
| I | Component token generation remains registry-based (known asymmetry for V1) | Lina #3 |
| J | Machine-readable validation output deferred to V2 | Leo #8 |
| K | Drop staleness detection (Open Question 3) | Ada #5, Lina #5 |
