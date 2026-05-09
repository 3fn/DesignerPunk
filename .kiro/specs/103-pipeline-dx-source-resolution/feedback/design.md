# Spec Feedback: Design

**Spec**: 103-pipeline-dx-source-resolution
**Phase**: Design
**Created**: 2026-05-09

---

### Context for Reviewers
- Requirements approved by Ada with 5 clarifications (all addressed in this design)
- DI approach confirmed: inject `TokenInput { primitiveTokens, semanticTokens }`, generator builds registries
- 4 call sites enumerated and update strategy defined for each
- Validation reuses existing validators (SemanticTokenValidator, MathematicalRelationshipParser)
- Legacy signature removed, no backward-compatible overload
- Lina confirmed `src/` is in package.json `files` field — resolves Ada's concern #1 about package path resolution

---

### Ada — Design Review (2026-05-09)

**Verdict**: Approve. This is clean, minimal, and correctly scoped.

---

#### Strengths

1. **The architecture diagram is immediately clear.** Token resolution moves from inside the generator to the CLI orchestration layer. One sentence explains the whole change.

2. **`resolveTokens()` is the right abstraction.** Single function, single responsibility: load tokens from wherever the config says. The barrel contract verification is inline and produces actionable error messages.

3. **Call site update table is precise.** All 4 sites identified, each with a concrete "before → after." The decision to remove the `if (require.main === module)` block is correct — the CLI supersedes it.

4. **Validation command design is appropriately minimal.** Four checks, each delegating to existing infrastructure. No new validation logic invented. Exit code semantics are correct (0 = pass, non-zero = fail).

5. **Decision 4 (keep `scripts/generate-platform-tokens.ts`)** is pragmatic. Removing it would be a gratuitous breaking change for no benefit.

---

#### Concerns

**1. `resolvePackageTokensPath()` — the "consumption" case needs verification**

The design says:
> In consumption, the CLI runs from `node_modules/@3fn/core/src/cli/` (or `dist/cli/`), so the same relative path still works.

This depends on whether the published package ships `src/` or `dist/`. If the package publishes compiled JS to `dist/cli/designerpunk.js`, then `__dirname` is `dist/cli/` and `../../tokens` resolves to `dist/tokens/` — which may not have the barrel exports (it would have compiled JS, not TypeScript with `getAllPrimitiveTokens` as a named export).

**Question**: Does the published `@3fn/core` package include `src/` in its files, or only `dist/`? If only `dist/`, the relative path strategy breaks for the package-default case.

**Recommendation**: Check `package.json` `files` field during implementation. If `src/` is included, the relative path works. If only `dist/`, we need `require.resolve('@3fn/core/package.json')` to find the package root and resolve from there. This is an implementation detail, not a design flaw — but flag it for the tasks phase.

**2. Dynamic import path format**

```typescript
const tokenBarrel = await import(sourcePath);
const semanticBarrel = await import(`${sourcePath}/semantic`);
```

Dynamic `import()` with absolute paths works in Node.js, but TypeScript's module resolution may need the path to end with `/index.ts` or use a file URL (`pathToFileURL(sourcePath).href`). The `tsx` loader handles this, but it's worth noting in the design that the import path format may need adjustment during implementation (e.g., appending `/index` or converting to file URL).

Not a design change — just an implementation note for the tasks phase.

**3. `validateRequiredFields` and `validateFamilyMembership` — not shown**

The design shows the `runValidate()` orchestrator calling these functions but doesn't show their implementation. That's fine for a design doc (they're straightforward), but the tasks should note these are new helper functions that need writing. They're small (iterate array, check fields) but they're new code, not pure reuse of existing validators.

To be precise:
- `validateRequiredFields` — new (iterates primitives, checks non-null fields)
- `validateFamilyMembership` — reuses registry registration (which throws on invalid)
- `validateSemanticReferences` — reuses `SemanticTokenValidator`
- `validateMathematicalRelationships` — reuses `MathematicalRelationshipParser`

So 2 of 4 checks are pure reuse, 1 is "reuse via side effect" (registration validation), and 1 is new but trivial.

**4. `generateTokenFiles` still imports theme overrides statically**

The design correctly moves primitive/semantic token loading to DI. But `generateTokenFiles.ts` still has these static imports:

```typescript
import { darkSemanticOverrides } from '../tokens/themes/dark/SemanticOverrides';
import { wcagSemanticOverrides } from '../tokens/themes/wcag/SemanticOverrides';
import { darkWcagSemanticOverrides } from '../tokens/themes/dark-wcag/SemanticOverrides';
```

These are the base theme overrides. They're NOT affected by `tokenSource` (per Req 1 AC 5: "theme overrides SHALL continue to resolve from the config's `themes` array"). But it's worth noting explicitly in the design that these static imports remain intentionally — they're the base system's built-in themes, not user-configurable token source.

This isn't a problem, just a documentation clarity point. Someone reading the refactored code might wonder "why are these still static imports?" The answer: themes ≠ token source.

---

#### Minor Notes

- The `tokenSourceMode: 'local' | 'package'` field on `ResolvedConfig` is a nice touch — makes the CLI output trivial to implement.
- Error messages are specific and actionable. Good DX.
- Testing strategy is sound. The `ProductRepoSimulation` tests as regression gate is the right approach.

---

#### Summary

No blocking issues. The design is implementable as-written with two implementation notes to carry into tasks:
1. Verify `resolvePackageTokensPath()` works for the published package structure (check `files` field)
2. Dynamic import path format may need adjustment for TypeScript loader compatibility

Approve to proceed to tasks.

---

### Lina — Design Review (2026-05-09)

#### [LINA R1]

**Verdict**: Approve to proceed to tasks.

The design is clean and implementable. The DI refactor is minimal in surface area — the generator's internal logic is untouched, only the data entry point changes. That's exactly right.

---

#### Strengths

1. **Architecture diagrams (before/after)** make the change immediately graspable. The "key change" one-liner is accurate: token resolution moves to the CLI layer.

2. **`resolveTokens()` as a standalone module** (`src/cli/resolveTokens.ts`) is the right placement. It's CLI-layer orchestration, not generator logic. Clean separation.

3. **Error messages** are specific and actionable — they tell you what's missing and what was expected. This is the DX that was missing.

4. **Call site update table** is complete. I verified the 4 call sites match what's in the codebase.

5. **Decision 2 (relative from `__dirname`)** — I can confirm this works. The bin entry (`bin/designerpunk.js`) uses `require('tsx/cjs/api').register()` then `require('../src/cli/designerpunk.ts')`, so `__dirname` in the CLI is always `src/cli/` whether running from the repo or from `node_modules/@3fn/core/`. And `src/` is in the package's `files` field, so the token source TypeScript files are available in consumption.

---

#### Concerns

**1. Ada's concern #1 is resolved** — `src/` is in `package.json` `files` field

I checked: `package.json` includes `"src/"` in the `files` array. The bin entry loads `../src/cli/designerpunk.ts` via tsx. So in consumption, `__dirname` = `node_modules/@3fn/core/src/cli/` and `../../tokens` = `node_modules/@3fn/core/src/tokens/` — which exists and has the barrel exports. The relative path strategy works for both development and consumption. No `require.resolve` fallback needed.

**2. `generateTokenFiles` becomes sync consumer of async-resolved data — verify no issue**

`resolveTokens()` is async (dynamic import). `generateTokenFiles()` remains sync (it receives data, builds registries, writes files synchronously). This is fine — the CLI awaits `resolveTokens()` then calls `generateTokenFiles()` synchronously. Just confirming the design doesn't accidentally make the generator async.

**3. `scripts/generate-platform-tokens.ts` update needs token resolution**

Decision 4 says "update to use new signature." But this script currently calls `generateTokenFiles(outputDir)` with no config. After the refactor, it needs both a `TokenInput` and a `ResolvedConfig`. The simplest update:

```typescript
import { getAllPrimitiveTokens } from '../src/tokens';
import { getAllSemanticTokens } from '../src/tokens/semantic';

const tokens = { primitiveTokens: getAllPrimitiveTokens(), semanticTokens: getAllSemanticTokens() };
generateTokenFiles(tokens, config);
```

This is straightforward but the script also needs a `config` object. Currently it doesn't use one. Options:
- Have it call `loadConfig(process.cwd())` (makes it config-aware)
- Build a minimal `ResolvedConfig` inline (fragile)

**Recommendation for tasks**: Update the script to call `loadConfig()` like the CLI does. This makes it a thin wrapper that's functionally equivalent to `npx designerpunk generate` but runnable via `ts-node` directly. Minimal code, consistent behavior.

**4. [@ADA] Regarding concern #2 (dynamic import path format)** — the `tsx` loader registered via `require('tsx/cjs/api').register()` in the bin entry handles TypeScript resolution for `import()` calls. It resolves bare directory paths to `index.ts` automatically. I've seen this work in the existing codebase (e.g., `loadConfig` uses dynamic import for the config file). So `import(sourcePath)` where `sourcePath` is a directory should resolve to `sourcePath/index.ts` under tsx. Worth a quick smoke test during implementation but likely a non-issue.

---

#### Component Token Interaction — Confirming No Impact

The design explicitly states component token generation is untouched (`ComponentTokenRegistry` remains side-effect populated). I've verified this is correct:

- `TokenFileGenerator.generateComponentTokens()` reads from `ComponentTokenRegistry.getAll()`
- Component token files (`Badge-Label-Base/tokens.ts`, `Button-Icon/buttonIcon.tokens.ts`, etc.) call `defineComponentTokens()` at import time
- These files import primitive constants (e.g., `SPACING_BASE_VALUE`) from relative paths within the package
- None of this is affected by `tokenSource` — component tokens always reference package primitives

The known asymmetry (local primitives via `tokenSource` vs package primitives in component tokens) is correctly documented in scope boundaries. No design change needed.

---

#### Summary

No blocking issues. Two implementation notes for tasks:
1. `scripts/generate-platform-tokens.ts` should call `loadConfig()` rather than building a minimal config inline
2. Smoke test that `import(directoryPath)` resolves to `index.ts` under tsx (likely works, worth verifying)

Approve to proceed to tasks.

---

### Leonardo — Design Review (2026-05-09)

#### [LEO R1]

**Verdict**: Approve to proceed to tasks.

**Perspective**: Product architect and pipeline consumer. My review focuses on whether this design produces a pipeline that platform agents can use without confusion, whether the DX story lands, and whether the architecture supports future product-side needs.

---

#### Strengths

1. **The architecture diagram tells the whole story.** Token resolution moves from generator internals to CLI orchestration. One sentence, one diagram, done. Platform agents reading this will immediately understand what changed and why.

2. **Error messages are specific and actionable.** When Kenya or Sparky hits a misconfigured `tokenSource`, they'll see exactly what's wrong and what's expected. This is the DX that was missing — the original issue was "I edited a file and nothing happened." Now the pipeline tells you which file matters.

3. **`tokenSourceMode` on `ResolvedConfig`** — Small addition, big payoff. The CLI output becomes trivial (`(local)` vs `(package)`), and any future tooling that needs to know the resolution mode has it on the config object without re-deriving it.

4. **Validation output format** matches existing pipeline style (emoji + indented text). Platform agents already know how to read this. Consistency over novelty.

5. **The `validate` command's check-by-check reporting** is exactly what I'd want when reviewing a platform agent's token work. "Which specific check failed? Which token?" — both answered in the output.

---

#### Concerns

**1. `resolvePackageTokensPath()` — Lina resolved Ada's concern, but the design should reflect it**

Lina confirmed `src/` is in `package.json` `files` and the relative path strategy works. The design currently says:

> In consumption, the CLI runs from `node_modules/@3fn/core/src/cli/` (or `dist/cli/`), so the same relative path still works.

The "(or `dist/cli/`)" parenthetical is misleading — Lina confirmed it's always `src/cli/` because the bin entry loads TypeScript via tsx. The design should drop the `dist/cli/` mention to avoid confusion during implementation. Minor, but precision matters in architecture docs.

**2. `scripts/generate-platform-tokens.ts` — agree with Lina's recommendation**

Decision 4 says "update to use new signature." Lina recommends having it call `loadConfig()` like the CLI does. I agree — this makes the script a thin wrapper that behaves identically to `npx designerpunk generate`. If the script diverges from the CLI's behavior (e.g., by building a minimal config inline), platform agents will get different results depending on which entry point they use. Same entry logic, same behavior.

**3. No concern about the async boundary**

Lina flagged that `resolveTokens()` is async while `generateTokenFiles()` is sync. This is the correct pattern — the CLI awaits resolution, then calls the generator synchronously with data. No issue from the product workflow perspective. Platform agents run `npx designerpunk generate` and don't care about the internal async/sync boundary.

---

#### Product Workflow Validation

I walked through the three scenarios platform agents will encounter:

**Scenario A: Default (no `tokenSource`)** — Platform agent runs `npx designerpunk generate` in a product repo. Pipeline shows `Tokens: node_modules/@3fn/core/src/tokens (package)`. Agent knows: "I can't edit these locally, they come from the package." ✅ Clear.

**Scenario B: Local source configured** — Platform agent runs `npx designerpunk generate` with `tokenSource: './src/tokens'` in config. Pipeline shows `Tokens: ./src/tokens (local)`. Agent knows: "I edit files in `./src/tokens` and re-run generate." ✅ Clear.

**Scenario C: Validation before commit** — Platform agent edits a token, runs `npx designerpunk validate`. Output shows which checks pass/fail with specific token names. Agent fixes issues before committing. ✅ Clear.

All three scenarios produce unambiguous output. The DX story lands.

---

#### Cross-Platform Consistency Note

The `validate` command produces identical output regardless of which platform agent runs it (same source → same results). This is inherently true since it's a single CLI with no platform-conditional logic. Confirmed by reading the design — no branching based on platform. Good.

---

#### Counter-Argument

**Is `resolveTokens()` as a separate module over-engineered for 4 call sites?**

One could argue: just inline the dynamic import in `runGenerate()` and `runValidate()`. Two call sites, no abstraction needed.

But no — the abstraction is correct because:
- It encapsulates barrel contract verification (which is non-trivial error handling)
- It provides a single place to change if the resolution strategy evolves
- The `ProductRepoSimulation` tests will also need to resolve tokens, making it 3+ consumers
- It's a natural unit for testing (mock the import, verify the contract checking)

The abstraction earns its existence.

---

#### Summary

No blocking issues. Two minor notes for tasks:
1. Drop the "(or `dist/cli/`)" mention in `resolvePackageTokensPath` — it's always `src/cli/` per Lina's verification
2. `scripts/generate-platform-tokens.ts` should call `loadConfig()` (per Lina's recommendation) — don't build a minimal config inline

Approve to proceed to tasks.