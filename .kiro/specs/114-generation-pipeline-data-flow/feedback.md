# Spec Feedback: Generation Pipeline Data Flow Restructure

**Spec**: 114-generation-pipeline-data-flow
**Created**: 2026-06-05

---

## Design Outline Feedback

### Context for Reviewers
- Three bugs share one root cause (generators import tokens directly instead of receiving them) → design-outline.md § "Problem Statement"
- Solution is data flow restructure, not individual patches → design-outline.md § "Proposed Solution"
- Product token generation already works (Spec 109) — this fixes the trigger/staleness and error isolation → design-outline.md § "Scope"
- The double-registration issue is specifically in generateTokenIndex.ts side-effect imports → design-outline.md § "Architecture"
- Related issue files: `.kiro/issues/bug-component-token-double-registration.md`, `.kiro/issues/ada-2026-05-09-generator-bypass.md`, `.kiro/issues/2026-06-04-product-token-generation-stale.md`

### Requested Reviewers
- **Ada** — Primary implementer. Owns all pipeline files being modified. Please review architecture proposal and open questions.
- **Sparky** — Consumer who filed the staleness bug. Please review from consumer DX perspective.

### Open Questions (for reviewers)

1. [@ADA] Does `ComponentTokenRegistry` already have a `clear()` method, or does it need to be added? If not, would idempotent registration (skip re-registration of same token name from same component) be preferable to clear-and-reload? → design-outline.md § "Key Changes"
2. [@ADA] Should `--product-only` skip system token validation entirely, or just skip system output generation? What's the minimal path to get product tokens regenerated without touching system tokens? → design-outline.md § "Open Questions"
3. [@SPARKY] Should staleness detection be opt-out (`--force` always regenerates) or opt-in (`--if-stale`)? What behavior would have saved you the 20-minute debugging session? → design-outline.md § "Open Questions"
4. [@ADA] The proposed architecture has `loadComponentTokens` returning `ComponentTokenEntry[]` instead of just a count. Is there a clean way to extract registered entries from the registry after loading, or does the loader need to collect them during registration? → design-outline.md § "Key Changes"
5. [@SPARKY] For the independent error boundaries — if system token generation fails but product succeeds, should the CLI exit 0 (partial success) or exit 1 (any failure = failure)? What serves the consumer better? → design-outline.md § "Architecture"

#### [THURGOOD R1]
- Design outline drafted and ready for technical review. My primary concern is whether the proposed `TokenIndexInput` interface change (optional → required + component tokens added) breaks any existing test infrastructure that calls `generateTokenIndex` directly. Ada would know. → design-outline.md § "Risk Assessment"
- Staleness detection via mtime is simple and correct, but worth confirming there are no scenarios where YAML files are regenerated with identical content (which would update mtime without changing output). If that's a concern, content hashing would be more robust but more complex. → design-outline.md § "Architecture"

#### [SPARKY R1]

**Overall**: This proposal directly addresses the three problems I hit during Spec 007. The root cause analysis is accurate — the issue is generators importing their own data instead of receiving it. The proposed data flow diagram matches exactly what I expected to exist when I first ran `generate` after adding product token YAMLs. Strong support for this spec.

**Q3 Answer — Staleness detection: opt-out (`--force`) is correct.**

The default behavior should be: **always check staleness, regenerate if stale**. The `--force` flag provides an escape hatch to regenerate regardless.

Here's why: During my 20-minute debugging session, I didn't know the output was stale. I ran `generate`, it exited successfully (or so I thought — it skipped silently), and I assumed my tokens were current. The problem was the *silent skip*. If the default had been "check mtimes, regenerate when source is newer," I'd never have hit the bug.

An `--if-stale` opt-in flag means the developer has to *already know* staleness is a risk — which defeats the purpose. You don't add `--if-stale` until after you've been burned. Staleness detection should be invisible infrastructure that just works.

`--force` is the right escape hatch for CI environments or "something feels wrong, nuke the cache" situations. → design-outline.md § "Open Questions" Q3

**Q5 Answer — Exit code: exit 1 with structured output.**

If system token generation fails but product succeeds, the CLI should exit 1. Partial success is still failure from a CI/build perspective. BUT — and this is critical — the output should clearly communicate what succeeded and what failed:

```
✅ Product tokens generated (6 categories, 42 tokens)
❌ System token generation failed: Component token conflict "progress.node.size.sm"

Exit 1 — partial failure. Use --product-only to generate product tokens independently.
```

Why exit 1: If I have this in a build script or CI pipeline, I want to know something went wrong. Exit 0 with partial failure is the "silent skip" problem all over again — you don't notice until rendering breaks.

Why structured output: The error message should tell me (a) what DID work, (b) what didn't, and (c) what flag to use if I only care about the part that succeeded. This way, when I'm debugging portfolio CSS and system tokens aren't my concern, I know to use `--product-only` next time. → design-outline.md § "Architecture"

**Consumer DX feedback:**

1. **`--product-only` flag is essential.** This was literally the first thing I asked for in my bug report (§ "Expected Behavior" item 4). During active product development, I'm iterating on product tokens constantly — borders, shadows, layout values. I shouldn't need the system token pipeline to be healthy to get my product tokens regenerated. Strong support. → design-outline.md § "Scope"

2. **Staleness detection should log when it skips.** Even in the happy path. Something like `⏭ Product tokens up-to-date (source unchanged since 2026-06-04T10:22:31)`. During my debugging session, the problem wasn't just staleness — it was *silent* staleness. If the CLI had printed "skipping product tokens — output newer than source," I'd have immediately known to investigate. → design-outline.md § "Architecture" (staleness detection)

3. **Pipeline independence is the highest-value change.** The compounding failure where double-registration blocked product tokens was the most frustrating part of the experience. Product token generation is a simple YAML→CSS transform with no dependency on the component registry. The proposed try/catch independence means that even when the system pipeline has bugs, my product development isn't blocked. → design-outline.md § "Design Principles" principle 3

4. **Minor concern — mtime vs content hashing.** Thurgood raised this and I agree it's worth acknowledging. In practice, I've never seen YAML files get touched without content changes in our workflow (we don't have any automated YAML reformatting). Mtime is fine for v1. If it becomes a problem, content hashing can be added later without changing the external behavior. → design-outline.md § "Architecture" (re: Thurgood's R1 note on mtime)

5. **Gap: What happens with `--product-only` when product token YAML has `ref` to a system token that doesn't exist locally?** If I use `--product-only` and my YAML has `ref: space300`, does the generator validate that `space300` exists? Or does it blindly emit `var(--space-300)`? Currently it emits the var reference without validation (Spec 109 behavior), which is correct — but worth stating explicitly in the spec so nobody adds validation that would re-couple the pipelines. → design-outline.md § "Scope" (out of scope boundary)

#### [ADA R1]

**Overall assessment**: Architecture is sound. The root cause analysis is correct and the data-flow restructure is the right fix. A few findings below.

**Q1 — ComponentTokenRegistry.clear() exists?**

Yes. `ComponentTokenRegistry` already has a `clear()` method (line ~234 in the impl). It clears `.tokens`, `.byComponent`, and `.byFamily` maps. The design outline's proposed `clear()` call before `loadComponentTokens` is viable as-is — no new method needed.

HOWEVER, I'd recommend **idempotent registration over clear-and-reload** for robustness:
- `clear()` creates a window where the registry is empty. If anything queries it between `clear()` and the end of loading, it gets an empty set.
- The registry already supports `allowOverwrite: true` in `RegistrationOptions`. The cleaner fix: have `loadComponentTokens` register with `{ allowOverwrite: true }` when `tokenSourceMode === 'local'`. This is atomic per-token — no empty-window race.
- Counter-argument: `clear()` is simpler to reason about and the window is effectively zero (synchronous single-threaded). But `allowOverwrite` is a single-line change to `registerBatch` that's already supported infrastructure.

**Recommendation**: Use `allowOverwrite: true` instead of `clear()`. Less risk, already implemented, no behavioral difference in the single-threaded CLI path.

**Q2 — Should `--product-only` skip system token validation entirely?**

Yes. `--product-only` should skip system token *resolution*, *generation*, AND *validation*. Rationale:

1. Product tokens validate against `token-index/` (YAML lookup of `system:` refs), not against live system tokens. The `ProductTokenGenerator` reads `token-index/*.yaml` files. System tokens don't need to be loaded at all.
2. The consumer use case (Sparky's bug) is "I added a YAML file, I want my product output updated." Requiring system token resolution adds ~4s latency and introduces failure modes unrelated to the task.
3. The only dependency is `token-index/` being up-to-date. If stale, product generation still works — it just may have broken refs (already reported as warnings in current output).

**Minimal path**: `--product-only` should:
- Load config (`loadConfig`)
- Skip `resolveTokens`, `loadComponentTokens`, `generateTokenFiles`, `generateTokenIndex`
- Run `generateProductTokens(config)` directly
- Exit code based only on product generation success

**Q4 — Can `loadComponentTokens` return `ComponentTokenEntry[]` cleanly?**

The design outline uses `ComponentTokenEntry[]` but that type doesn't exist. The registry stores `RegisteredComponentToken[]`. Two options:

**Option A (recommended)**: After `loadComponentTokens` finishes (which populates the registry via `require()` → `defineComponentTokens()` → `registerBatch()`), call `ComponentTokenRegistry.getAll()` to get the full `RegisteredComponentToken[]` array. This is the simplest change:

```typescript
export function loadComponentTokens(config: ResolvedConfig): RegisteredComponentToken[] {
  if (config.tokenSourceMode === 'local') {
    ComponentTokenRegistry.clear(); // or use allowOverwrite
  }
  // ... existing discovery and require() logic ...
  return ComponentTokenRegistry.getAll();
}
```

No need to collect during registration — the registry IS the collector. `getAll()` returns everything registered regardless of where it came from.

**Option B**: Thread a collection array through registration. This would require modifying `defineComponentTokens` to return the array instead of values, which breaks the existing API contract (components use the return value as `{ 'inset.large': 12 }`). Not recommended.

**Additional findings:**

**1. Missed caller: `src/cli/generateProductTokens.ts` (line 29)**

The design outline's risk assessment lists `designerpunk.ts` and test files as callers. It misses that `generateProductTokens.ts` ALSO calls `generateTokenIndex(tokenIndexDir)` — without passing any input. This is arguably Defect 1's most critical manifestation: product token generation regenerates the token-index using bare barrel imports, undoing any local-source-aware index that `designerpunk.ts` just generated.

**Impact on proposed architecture**:
- This call should be REMOVED, not just updated. The CLI already calls `generateTokenIndex` before `generateProductTokens`. Product token gen doesn't need to regenerate the index.
- If `--product-only` skips system generation (per Q2), the token-index is NOT regenerated. That's correct — product tokens read existing `token-index/*.yaml`, they don't need it regenerated.

**2. Missed caller: `scripts/generate-token-index.ts`**

This standalone script calls `generateTokenIndex(OUTPUT_DIR)` without passing input (no second argument). It manually imports component token files at the top. After the proposed change makes `input` required, this script will fail at compile time.

**Fix**: Script should `import { getAllPrimitiveTokens } from '../src/tokens'` etc. and pass them explicitly. Since this is a package-internal script (runs within the DesignerPunk repo, not in product repos), it's allowed to import from barrel files directly — it IS the package.

**3. ThemeRegistry re-instantiation in generateTokenIndex**

Lines 80-83 of `generateTokenIndex.ts` create a fresh `ThemeRegistry` and register only `dark` and `wcag` themes. This ignores any product-registered themes from `designerpunk.config.ts`. The token-index will show incorrect `themeVarying` values for product repos with custom themes.

This isn't new to Spec 114, but the restructure should address it since we're already changing the function signature. Recommendation: add `themeVaryingTokens: Set<string>` to `TokenIndexInput` (computed from the config's registered themes in the CLI) instead of having the generator compute it internally.

**4. Thurgood's mtime concern (YAML regenerated with identical content)**

Valid edge case but unlikely in practice. Product token YAMLs are hand-authored, not machine-generated. `mtime` is the right default. A `--force` flag (always regenerate regardless of staleness) covers the corner case without the complexity of content hashing. I'd go with the design outline's proposed `--force` as opt-out.

**5. Exit code question (relates to Q5 for Sparky)**

From a pipeline correctness standpoint: if system generation fails and product succeeds, exit code should be **1** (failure). Rationale: CI/CD pipelines need to know something is broken. A partial success is still a failure state. The fix is to fix the system generation, not to pretend it's fine. However, the *product output files* should still be written (which the proposed independent try/catch achieves). So: write output optimistically, but signal failure honestly.

#### [THURGOOD R2]
- Incorporated all ADA R1 items into design-outline.md R2.
- Incorporated all SPARKY R1 items into design-outline.md R2.
- Key incorporations: allowOverwrite instead of clear(), removed redundant generateTokenIndex from generateProductTokens, added themeVaryingTokens to TokenIndexInput, added scripts/generate-token-index.ts to scope, explicit --product-only data flow diagram, exit 1 with structured output, staleness logging in all cases.
- Added "Decisions Made" table to design outline documenting all R1 resolutions with rationale and source.
- Design outline ready for Peter's approval before formalization.

---

## Requirements Feedback

### Context for Reviewers
- 9 requirements covering data flow restructure, pipeline independence, staleness, --product-only, backward compat → requirements.md
- All acceptance criteria use EARS patterns (WHEN/THEN/SHALL) → requirements.md § "Requirements"
- R1-R2 address the core bugs; R3-R5 add new capabilities; R6-R9 are cleanup and compat → requirements.md
- Design outline decisions (allowOverwrite, mtime, exit 1) are encoded in the acceptance criteria → design-outline.md § "Decisions Made"

#### [SPARKY R2]

**R3 (Pipeline Independence) — ✅ Complete.** AC1-5 cover my exact scenario: system fails (double-registration), product succeeds, files written, exit 1, and the `--product-only` recommendation. AC5 is particularly important — the recommendation in error output is the thing that would have immediately told me "use this flag" instead of debugging for 20 minutes.

**R4 (Staleness Detection) — ✅ Complete.** AC1-5 map precisely to the behavior I needed.

- **AC5 "never silent" — yes, this captures my concern perfectly.** The root of my June 4 issue was that I ran `generate`, it appeared to succeed, and I had no idea output was stale. "Never silent" as an explicit acceptance criterion means any implementation that skips without logging fails the spec. This is the single most important AC from a consumer perspective.

- **Minor note on AC2 wording**: "all product token output files are newer than all YAML source files" — this correctly uses "all output newer than all source" (not "any output"). Good. The bug scenario is: I add a new YAML file (newest mtime), existing outputs are older. AC1 catches this correctly.

**R5 (--product-only) — ✅ Complete.**

- **AC4 "existing warning without failing the pipeline" — yes, correct.** This preserves the Spec 109 behavior where `ref: space300` emits `var(--space-300)` with a warning but doesn't error. Critical because under `--product-only`, the token-index may be stale (system pipeline didn't run), so refs might not resolve. The right behavior is warn-and-emit, not fail. If this AC had said "SHALL validate refs against token-index" it would have re-coupled the pipelines — glad it doesn't.

- **One gap I want to confirm is covered**: R5 AC2 says "using the existing `token-index/*.yaml` files on disk." This implies that if `token-index/` doesn't exist at all (fresh clone, never ran full generate), `--product-only` would fail or produce incomplete output. That's acceptable — the user story is "iterating on product tokens," not "bootstrapping from scratch." But worth a test case. I see Task 4.2 has integration tests; suggest adding a test for "token-index missing → clear error message suggesting full generate first."

**No gaps found that would have prevented the June 4 session.** The combination of R3 (pipeline independence) + R4 AC5 (never silent) + R5 (--product-only escape hatch) addresses all three compounding failures I experienced: (1) silent staleness, (2) unrelated pipeline failure blocking product gen, (3) no fast path to regenerate just product tokens.

---

## Design Feedback

### Context for Reviewers
- Architecture follows bottom-up data flow: CLI resolves → passes to generators → generators never import → design.md § "Architecture"
- Four new/modified interfaces defined with TypeScript signatures → design.md § "Components and Interfaces"
- Error handling uses exit code matrix for all system/product success/failure combinations → design.md § "Error Handling"
- Testing strategy covers unit (staleness, generateTokenIndex, loadComponentTokens), integration (pipeline independence, product-only), and regression → design.md § "Testing Strategy"

#### [SPARKY R2]

**Error Handling — ✅ Matches my R1 feedback exactly.**

The exit code matrix covers all six combinations I care about. Specifically checking the scenario I raised:

| System Result | Product Result | Exit Code | Output |
|:---:|:---:|:---:|---|
| ❌ | ⏭ (up-to-date) | 1 | System failure, product was already current |

**Yes — this covers "product up-to-date + system fails."** Exit 1 is correct (system is broken, CI should know), and the product skip is logged (⏭). This is exactly the scenario where my June 4 session would have been a 10-second read of the terminal output instead of a 20-minute debugging dive.

**Staleness logging — ✅ Correct.**

The three log states cover all paths:
- Stale → regenerates (shows generation output) — the "something changed" case
- Up-to-date → `⏭ Product tokens up-to-date (source unchanged since <timestamp>)` — the "nothing to do" case with proof
- Forced → `🔄 Product tokens regenerated (--force)` — explicit override

The timestamp in the up-to-date message is the detail that would have saved me. On June 4, seeing "source unchanged since May 27" would have immediately told me "wait, I added files on June 3 — something is wrong with my path config."

**Design Decision 4 (Remove generateTokenIndex from generateProductTokens) — ✅ Strong support.**

This was Ada's R1 finding and it's the correct fix. The current behavior where product gen redundantly re-generates the index with package barrel defaults was undoing the local-source-aware index. Removing it entirely is cleaner than "update it to pass explicit data" because the function's contract is "reads token-index from disk" — it shouldn't be responsible for generating what it reads.

**One observation on Decision 2 (mtime vs content hash):**

The trade-off note says "If a tool reformats YAML without changing semantics, mtime triggers unnecessary regeneration. This is harmless (regeneration is fast) and rare." Confirmed — product token generation takes <200ms in Portfolio. False-positive regeneration is a non-issue. I'd rather regenerate unnecessarily once than miss a genuine change.

---

## Tasks Feedback

### Context for Reviewers
- 5 parent tasks, 13 subtasks, all Ada-owned → tasks.md
- Sequence is bottom-up: interfaces (Task 1) → registration fix (Task 2) → CLI restructure (Task 3) → new features (Task 4) → verification (Task 5) → tasks.md § "Implementation Plan"
- Task 3.2 is the only Architecture-typed subtask (CLI error boundary design); rest are Implementation → tasks.md
- All subtasks reference specific requirement IDs → tasks.md

#### [SPARKY R2]

**Task 4 (Staleness + --product-only) — ✅ Covers everything I need.**

Task 4.1 (isProductTokenStale) correctly implements:
- `--force` returns true regardless
- Missing output file → always regenerate
- Oldest output mtime comparison against all YAML sources
- References R4 AC1-5

Task 4.2 (--product-only CLI flag) correctly implements:
- Skips all system processing
- Reads existing token-index from disk
- Exit code based only on product gen result
- References R5 AC1-5

Task 4.3 (integrate staleness into main pipeline) ensures staleness applies in BOTH modes (full and --product-only), which is R5 AC5. Good — I want staleness detection regardless of which mode I'm in.

**One suggested test case for Task 4.2:**

The integration tests should include: "WHEN `--product-only` is run AND `token-index/` directory does not exist THEN the CLI SHALL exit with a clear error message directing the user to run full `generate` first." This covers the bootstrap edge case I noted in the requirements feedback. Currently R5 AC2 says "using existing token-index/*.yaml files on disk" but doesn't specify what happens when they don't exist. A good error here prevents confusion for new developers setting up for the first time.

**Task sequencing is correct from my perspective.** Task 4 depends on Task 3 (CLI restructure with error boundaries must exist before --product-only can use them), and Task 3 depends on Tasks 1-2 (generateTokenIndex must accept explicit input before the CLI can pass it). The dependency chain matches my mental model of the fix.

**No missing tasks identified.** The five-task plan covers: fix the interfaces (1-2), restructure the CLI (3), add new consumer features (4), verify nothing broke (5). This maps cleanly to the three bugs I filed: double-registration (Task 2), barrel import bypass (Task 1), staleness (Task 4), with pipeline independence (Task 3) as the architectural improvement that prevents compounding failures.

#### [ADA R2]

**Overall**: Requirements are well-structured and testable. EARS format is consistent. All R1 findings are captured. A few clarifications and one gap below.

**R1 AC3 — Compiler type error for missing input**: Accurate. Current signature is `input?: TokenIndexInput` (optional). Making it non-optional achieves this. The only files currently calling without the second param are `scripts/generate-token-index.ts` (calls `generateTokenIndex(OUTPUT_DIR)` with no input) and `src/cli/generateProductTokens.ts` line 29 (calls `generateTokenIndex(tokenIndexDir)` with no input). Both will produce compile errors as expected. No test files directly import/call `generateTokenIndex`, so no hidden breakage there — confirmed via grep.

**R2 AC3 — "SHALL NOT trigger side-effect imports"**: This is correctly identified but the fix is in Task 1, not Task 2. When `generateTokenIndex` barrel imports are removed (Task 1.1), the side-effect registration chain breaks. Worth noting that the AC is validated *after* Task 1 completes, not after Task 2 alone. Cross-task dependency is correctly sequenced in the tasks doc.

**R4 AC2 — Precision of wording**: "all product token output files are newer than all YAML source files" — semantically equivalent to the design's "oldest output file newer than newest source file," but the design's framing is clearer for implementation. Not a blocker — just noting the two descriptions are equivalent.

**R7 AC2 — Gap: base light/dark color difference computation not explicitly required.** This AC says "compute themeVaryingTokens from the config's registered themes." In the current codebase (`generateTokenFiles.ts` lines 159-168), theme-varying tokens are the UNION of:
1. `ThemeRegistry.getThemeVaryingTokens()` (override keys from registered themes)
2. Color tokens where resolved light primitive value ≠ resolved dark primitive value

**Recommendation**: R7 AC2 should explicitly state "including tokens that differ between base light and dark contexts (not only tokens with explicit theme overrides)" to make the AC testable against the full computation. Without this, an implementation that only collects override keys would pass the AC but produce incorrect token-index output.

**Gap: R5 — missing token-index directory under --product-only**: Sparky raised this in R2. If `token-index/` doesn't exist and `--product-only` is used, `ProductTokenGenerator` emits warnings for every `ref:` (Spec 109 behavior). R5 AC4 covers the warning emission, but no AC covers a *helpful error message* when `token-index/` is entirely absent vs just missing a specific token. Not a blocker — existing behavior is acceptable — but a test case worth adding.

**No other gaps from R1 findings.** All five Ada R1 items are captured:
- ✅ `allowOverwrite` over `clear()` → R2 AC1, R9 AC1
- ✅ Remove generateTokenIndex from generateProductTokens → R6 AC1
- ✅ `scripts/generate-token-index.ts` scope → R8 AC1-3
- ✅ ThemeRegistry re-instantiation → R7 AC1-3
- ✅ Exit 1 strict → R3 AC3

#### [ADA R2] — Design Feedback

**Interface verification against codebase — findings:**

**1. `RegisteredComponentToken` export — ✅ Confirmed.** The type IS exported from `src/registries/ComponentTokenRegistry.ts` (line 19, `export interface RegisteredComponentToken`). The design's import path is correct.

**2. `TokenIndexInput` interface — correct expansion.** Current interface has `primitiveTokens?: PrimitiveToken[]` and `semanticTokens?: SemanticToken[]` (both optional, no componentTokens/themeVaryingTokens). The design correctly makes all four required and adds the two new fields. The current `generateTokenIndex` also uses `ComponentTokenRegistry.getAll()` directly (line 149) — the design correctly replaces this with `input.componentTokens`.

**3. `computeThemeVaryingTokens` — CRITICAL design clarification needed.** The design says "Computes base light/dark differences for color tokens" which is correct intent. However, the function signature is:
```typescript
computeThemeVaryingTokens(config: ResolvedConfig, semanticTokens: SemanticToken[]): Set<string>
```

In `generateTokenFiles.ts` (lines 159-168), the existing computation compares RESOLVED semantics (post-`resolveSemanticTokenValue`):
```typescript
const lv = lt.primitiveReferences?.value ?? ''; // resolved rgba string
const dv = dt.primitiveReferences?.value ?? ''; // resolved rgba string
if (lv !== dv) themeVaryingTokens.add(lt.name);
```

This comparison works on resolved rgba values AFTER Level 1 resolution. The proposed `computeThemeVaryingTokens` receives unresolved `SemanticToken[]`.

**Resolution**: For the token-index purpose, we don't need full rgba resolution. We need to know WHETHER the token varies by mode. Two approaches:

**Approach A (recommended — lightweight)**: A color semantic token is theme-varying at the primitive-reference level if:
- It has an explicit override in any registered theme (Level 2), OR
- Its referenced primitive name has different `light.base` vs `dark.base` values in the `ColorTokenValue` definition (Level 1)

This can be determined from semantic token `primitiveReferences.value` (the primitive NAME) + looking up that primitive's `ColorTokenValue` to check if light ≠ dark. No `resolveSemanticTokenValue` needed.

**Approach B (heavier)**: Pass resolved semantic arrays. This creates a circular dependency: `computeThemeVaryingTokens` needs resolution results, but `generateTokenFiles` (which does the resolution) also needs the theme-varying set for generation. The existing code avoids this by computing theme-varying AFTER resolution within `generateTokenFiles`. If we extract it, Approach A avoids the circularity.

**Recommendation**: Document Approach A in the design. The function needs access to primitive token definitions (or at minimum the color primitive value map) to compare light/dark primitive values by name.

**4. `loadComponentTokens` return type change — ✅ verified feasible.** `ComponentTokenRegistry` is a singleton. `getAll()` returns `RegisteredComponentToken[]`. Clean change.

**5. `isProductTokenStale` — output path knowledge.** `getProductTokenOutputPaths(config)` needs to know output file names. Currently hardcoded in `generateProductTokens.ts`: `ProductTokens.web.css`, `ProductTokens.ios.swift`, `ProductTokens.android.kt` under `config.outputDir + '/product/'`. The staleness helper should either import these names from a shared constant or hardcode them with a comment referencing the emitter source. Minor DRY concern.

**6. Testing strategy gap.** No test is specified for verifying `computeThemeVaryingTokens` includes base light/dark diff tokens (not just override keys). This is the most subtle correctness requirement. Suggest adding to Task 1.2 test list: "tokens with different light/dark primitive values are included in theme-varying set even without explicit overrides."

#### [ADA R2] — Tasks Feedback

**Sequencing — correct.** Dependency order is sound:
- Task 1 → Task 3.2 (interface must exist before CLI can pass data)
- Task 2 → Task 3.2 (registration fix provides RegisteredComponentToken[] for CLI)
- Task 3.1 is independent (can run anytime)
- Task 4 → depends on Task 3.2 (product pipeline try/catch is where staleness integrates)
- Task 5 correctly last

**Task 1.1 — verified accurate.** All listed imports exist at the stated locations in `generateTokenIndex.ts` (lines 11, 12, 19, 20, 21-23). No missing removals.

**Task 1.2 — needs implementation guidance.** As noted in Design Feedback #3, the function needs access to primitive token light/dark values to compute the base diff. The task says "Migrate logic from the removed ThemeRegistry code in generateTokenIndex" but the light/dark diff logic isn't IN generateTokenIndex — it's in `generateTokenFiles.ts` (lines 159-168). Task should reference the correct source: "Migrate override-key logic from generateTokenIndex ThemeRegistry usage AND base light/dark diff logic from generateTokenFiles.ts (lines 159-168)."

Additionally, the function needs `primitiveTokens` (or a color primitive value lookup) as input to perform the base diff. The proposed signature `computeThemeVaryingTokens(config, semanticTokens)` may need to become `computeThemeVaryingTokens(config, semanticTokens, primitiveTokens)` — OR the function internally imports primitive definitions (acceptable if this is package-internal code running within the CLI, since the CLI already has resolved primitives available from `resolveTokens`).

**Recommendation**: Update signature to accept primitiveTokens:
```typescript
computeThemeVaryingTokens(config: ResolvedConfig, semanticTokens: SemanticToken[], primitiveTokens: PrimitiveToken[]): Set<string>
```
This keeps the function pure (no internal imports) and the CLI already has all three inputs available at the point where it's called (step 4 in the pipeline diagram, after steps 2-3).

**Task 1.3 — one clarification needed.** The script's existing side-effect imports for component token files (lines 15-19) must be KEPT — they populate the registry so `ComponentTokenRegistry.getAll()` works. Task says "Import and register component tokens to populate registry" which covers intent. Should explicitly note: "Retain existing side-effect imports for component token files; add `import { ComponentTokenRegistry } from '../src/registries/ComponentTokenRegistry'` and pass `ComponentTokenRegistry.getAll()` as `componentTokens`."

Also needs `computeThemeVaryingTokens` or equivalent inline logic for `themeVaryingTokens`. Since this is a package-internal script, it can instantiate ThemeRegistry directly (same approach as current code, just extracted to a variable passed to the function). Task should mention this.

**Task 3.2 — cross-task data flow should be explicit.** The step "Pass full `TokenIndexInput` to `generateTokenIndex`" requires results from:
- `resolveTokens` → primitiveTokens, semanticTokens (step 2)
- `loadComponentTokens` → componentTokens (step 3, Task 2 return value)
- `computeThemeVaryingTokens` → themeVaryingTokens (step 4, Task 1.2)

This data flow is implicit in the pipeline ordering but should be explicit in Task 3.2's step description: "Collect primitiveTokens and semanticTokens from resolveTokens result, componentTokens from loadComponentTokens result, and themeVaryingTokens from computeThemeVaryingTokens result. Pass all four as TokenIndexInput."

**Task 4.1 — output path computation.** The helper `getProductTokenOutputPaths` needs to know the three hardcoded filenames (`ProductTokens.web.css`, `.ios.swift`, `.android.kt`) and the output subdirectory (`product/`). These are currently implicit in `generateProductTokens.ts`. Consider extracting to a shared constant. Minor.

**Task 5.1 — regression test approach.** "Full pipeline produces identical output to pre-restructure for default configs" is the hardest test. Suggest: capture a fixture of current token-index YAML output (before changes), then assert post-restructure output matches byte-for-byte. This prevents accidental format/ordering changes.

**No missing tasks.** All 9 requirements have clear traceability. The risk of implementation surprise is concentrated in Task 1.2 (computeThemeVaryingTokens needing primitive data for base diff) — flagged above with recommendation.

#### [THURGOOD R3]
- Incorporated ADA R2 critical finding: `computeThemeVaryingTokens` signature updated to accept `primitiveTokens` parameter for base light/dark diff computation without circular dependency (Approach A). Updated design.md interface, design-outline.md diagram, and tasks.md Task 1.2.
- Incorporated ADA R2 Task 1.2 source correction: references `generateTokenFiles.ts` lines 159-168 (not generateTokenIndex) for base diff logic.
- Incorporated ADA R2 Task 1.3 clarification: retain existing side-effect imports, add ComponentTokenRegistry import.
- Incorporated SPARKY R2 suggested test case: Task 4.2 now includes test for missing `token-index/` directory under `--product-only`.
- R7 AC2 updated to explicitly include "tokens that differ between base light and dark contexts."
- All blocking items resolved. Spec ready for Peter's final approval before execution begins.