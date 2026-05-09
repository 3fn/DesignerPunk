# Spec Feedback: Design

**Spec**: 104-token-source-portability
**Phase**: Design
**Created**: 2026-05-09

---

### Context for Reviewers
- Requirements approved by Ada with 5 clarifications (all addressed in this design)
- Key architectural mechanism: Node module cache ensures component tokens get local primitive values
- 2-file refactor (SpacingTokens, TypographyTokens) + component token loader + lint boundary + init updates
- Loading sequence: resolveTokens → loadComponentTokens → generateTokenFiles (all local)

---

### Ada — Design Review (2026-05-09)

**Verdict**: Approve to proceed to tasks. The design is clean, the loading sequence is correct, and the module cache mechanism is well-documented.

---

#### Strengths

1. **The architecture diagram is immediately clear.** Before: component tokens from package. After: component tokens from local via module cache. One diagram explains the whole change.

2. **The module cache mechanism is explicitly documented** with the failure condition (symlinks, different layouts). This was my requirements concern #2 — addressed perfectly.

3. **Split token source copy (Decision 1)** is the right approach. Conditional transforms within a single copy operation would be fragile. Two operations with clear, uniform behavior is simpler.

4. **Warning not error (Decision 3)** is correct. Blocking generation because component tokens aren't copied yet would be hostile DX. The warning is informative and actionable.

5. **The lint boundary test is well-designed.** Parametric (`test.each`), covers both `import` and `require()`, excludes `component/` directory. Will catch regressions immediately.

6. **Loading sequence section** makes the order of operations explicit. This is the kind of documentation that prevents future debugging sessions.

---

#### Concerns

**1. `loadComponentTokens` — the `require()` path for `{tokenSource}/component/` files**

The loader does:
```typescript
require(path.join(componentSubdir, file));
```

But these files (e.g., `progress.ts`) import primitives via relative paths like `from '../../tokens/SpacingTokens'`. From `{tokenSource}/component/progress.ts`, `../../tokens/SpacingTokens` resolves to... `{tokenSource}/../tokens/SpacingTokens`? No — wait.

If `tokenSourceRoot` is `/project/src/tokens`, then `componentSubdir` is `/project/src/tokens/component/`. The file `progress.ts` does `from '../../tokens/SpacingTokens'`. From `/project/src/tokens/component/`, `../..` = `/project/src/`, then `tokens/SpacingTokens` = `/project/src/tokens/SpacingTokens`. ✅ Correct.

But hold on — `resolveTokens()` loaded primitives via `require('/project/src/tokens')` (the barrel). Does `require('/project/src/tokens/SpacingTokens')` (the direct file) return the same module instance? 

In Node, `require('/project/src/tokens')` resolves to `/project/src/tokens/index.ts`, which does `export { spacingTokens } from './SpacingTokens'`. This causes Node to load `/project/src/tokens/SpacingTokens.ts` and cache it. When `progress.ts` later does `require('/project/src/tokens/SpacingTokens')`, Node finds it in cache. ✅ Same instance.

**This works.** Just wanted to trace through it explicitly to confirm. No concern here — just documenting my verification.

**2. `scanForTokenFiles` — recursive scan could be slow for large component directories**

The recursive scan of `componentTokenDirs` walks the entire directory tree looking for `*.tokens.ts`. For `src/components/core/` with 28+ component directories, this means reading ~28 directories. That's fine for 28 components, but worth noting: if a product repo has hundreds of components, this could add noticeable startup time.

**Not a blocker for V1.** If it becomes a problem, the fix is simple: cache the file list, or use a faster glob library. For now, `fs.readdirSync` is adequate.

**3. The `rewriteBuildImports` regex**

```typescript
/from\s+['"]\.\.\/(?:\.\.\/)*build\/tokens['"]/g
```

This matches `from '../build/tokens'`, `from '../../build/tokens'`, `from '../../../build/tokens'`, etc. Good — handles any depth.

But it also needs to handle the case where the import has a specific file: `from '../../build/tokens/defineComponentTokens'`. Let me check if any component token files import a specific file rather than the barrel...

Actually, looking at the evidence from earlier: `progress.ts` imports `from '../../build/tokens'` (the barrel). And `buttonIcon.tokens.ts` likely does the same. The barrel re-exports `defineComponentTokens`. So the regex targeting the barrel path is correct.

**But**: If any file imports `from '../../build/tokens/defineComponentTokens'` (specific file, not barrel), the regex won't match. The design should either:
- Verify no files use the specific-file import pattern (I believe they don't, but should confirm)
- Or extend the regex: `/from\s+['"]\.\.\/(?:\.\.\/)*build\/tokens(?:\/[^'"]*)?['"]/g`

**Recommendation**: Verify during implementation. If all files use the barrel import, the current regex is fine.

**4. Init-generated config includes theme imports that may not exist**

The generated config shows:
```typescript
import { darkSemanticOverrides } from './src/tokens/themes/dark/SemanticOverrides.ts';
import { wcagSemanticOverrides } from './src/tokens/themes/wcag/SemanticOverrides.ts';
```

Does init also copy `src/tokens/themes/`? The design doesn't mention this. If themes aren't copied, these imports will fail in the product repo.

**This may already be handled** by the existing init logic (Spec 094 era). But the design should confirm: either themes are copied by init, or the generated config shouldn't reference them until they exist.

**5. Minor: `STRATEGIC_FLEXIBILITY_TOKENS` inline — the design shows a simplified version**

The design shows:
```typescript
const STRATEGIC_FLEXIBILITY_TOKENS: Record<string, boolean> = {
  space025: true,
  space050: true,
  space075: true,
};
```

But the actual constant in `src/constants/StrategicFlexibilityTokens.ts` is a richer object with `value`, `derivation`, `baseToken`, `multiplier`, `category`, and `usage` fields. The inline needs to match what `SpacingTokens.ts` actually uses from the import.

**Recommendation**: During implementation, check which fields `SpacingTokens.ts` actually reads from `STRATEGIC_FLEXIBILITY_TOKENS`. If it only checks membership (e.g., `name in STRATEGIC_FLEXIBILITY_TOKENS`), the simplified `Record<string, boolean>` is fine. If it reads `.value` or `.multiplier`, the full object structure needs to be inlined.

---

#### Summary

No blocking issues. The design is implementable as-written with three implementation notes:

1. Verify no component token files use specific-file imports (e.g., `../../build/tokens/defineComponentTokens`) — if they do, extend the regex
2. Confirm init copies theme files (or adjust generated config)
3. Check which fields `SpacingTokens.ts` reads from `STRATEGIC_FLEXIBILITY_TOKENS` to determine inline shape

Approve to proceed to tasks.

---

### Lina — Design Review (2026-05-09)

#### [LINA R1]

**Verdict**: Approve to proceed to tasks.

The design is clean and the loading sequence is correct. The module cache mechanism is well-documented, and I've verified the path resolution works for all component token file locations.

---

#### Strengths

1. **Loading sequence section** is the most valuable part of this design. It makes the order of operations and the module cache dependency explicit. This prevents future debugging sessions.

2. **Split token source copy (Decision 1)** — correct. Two copy operations with uniform behavior is simpler than conditional transform logic.

3. **`require()` over dynamic import (Decision 2)** — correct. Component token registration is a synchronous side effect. No reason to add async complexity.

4. **Warning not error (Decision 3)** — correct. A developer iterating on primitives shouldn't be blocked because they haven't copied component tokens yet.

5. **The lint boundary test** is well-designed. Parametric, covers both `import` and `require()`, excludes `component/`. Will catch regressions at CI time.

---

#### Verification of Ada's Concerns

**Ada #3 (regex for build imports)**: I verified — no component token files use specific-file imports from `build/tokens/`. All use the barrel: `from '../../build/tokens'` or `from '../../../build/tokens'`. The regex is correct as-written.

**Ada #4 (theme files in init)**: Non-issue. The existing init copies the entire `src/tokens/` directory, which includes `src/tokens/themes/`. Theme override files are already available in product repos after init.

**Ada #5 (STRATEGIC_FLEXIBILITY_TOKENS shape)**: This IS a real concern. `SpacingTokens.ts` reads `.value` and `.derivation` fields from the constant (e.g., `STRATEGIC_FLEXIBILITY_TOKENS.space075.value`, `STRATEGIC_FLEXIBILITY_TOKENS.space075.derivation`). The design shows a simplified `Record<string, boolean>` — that won't work. The inline needs the full object structure with at least `value` and `derivation` fields for each token.

The correct inline is:
```typescript
const STRATEGIC_FLEXIBILITY_TOKENS = {
  space025: { value: 2, derivation: 'space100 × 0.25' },
  space050: { value: 4, derivation: 'space100 × 0.5' },
  space075: { value: 6, derivation: 'space100 × 0.75' },
  space125: { value: 10, derivation: 'space100 × 1.25' },
  space150: { value: 12, derivation: 'space100 × 1.5' },
  space250: { value: 20, derivation: 'space100 × 2.5' },
} as const;
```

The `baseToken`, `multiplier`, `category`, and `usage` fields can be dropped IF `SpacingTokens.ts` doesn't read them. Implementation should verify which fields are actually accessed.

---

#### Component Token Loading — Confirming Correctness

I traced through the module cache mechanism for both component token locations:

**`src/tokens/component/progress.ts`**:
- `resolveTokens()` loads `{tokenSourceRoot}` → Node caches `/project/src/tokens/index.ts` which re-exports from `./SpacingTokens` → Node caches `/project/src/tokens/SpacingTokens.ts`
- `loadComponentTokens()` requires `/project/src/tokens/component/progress.ts`
- `progress.ts` does `require('../../tokens/SpacingTokens')` → resolves to `/project/src/tokens/SpacingTokens.ts` → **cache hit** ✅

**`src/components/core/Button-Icon/buttonIcon.tokens.ts`**:
- Same cache state as above
- `loadComponentTokens()` requires `/project/src/components/core/Button-Icon/buttonIcon.tokens.ts`
- File does `require('../../../tokens/SpacingTokens')` → resolves to `/project/src/tokens/SpacingTokens.ts` → **cache hit** ✅

Both paths get the local primitive values. The mechanism is sound.

---

#### One Concern: `resolveTokens()` Uses `import()` but `loadComponentTokens()` Uses `require()`

Spec 103's design has `resolveTokens()` using dynamic `import()` (async). This design has `loadComponentTokens()` using `require()` (sync). Both populate the same Node module cache — but `import()` and `require()` have separate module caches in Node's ESM/CJS interop layer.

**Question**: Is the token source loaded as ESM (via `import()`) or CJS (via `require()`)? If `resolveTokens()` uses `import()` and component token files use `require()`, they might not share the same module instance.

**However**: The project uses `tsx` which registers a CJS loader (`require('tsx/cjs/api').register()`). Under tsx's CJS mode, `import()` is shimmed to use the CJS module cache. So both `import()` and `require()` resolve to the same cache. ✅ Works.

**Recommendation for design**: Add a one-line note in the "Loading Sequence" section: "Both `import()` (in resolveTokens) and `require()` (in loadComponentTokens) share the same module cache under tsx's CJS registration."

This prevents a future maintainer from wondering about ESM/CJS cache isolation.

---

#### Summary

One design correction needed (Ada's #5 — inline shape must include `value` and `derivation` fields, not just boolean). One documentation note (ESM/CJS cache sharing under tsx). No blocking issues.

Approve to proceed to tasks.

---

### Leonardo — Design Review (2026-05-09)

#### [LEO R1]

**Verdict**: Approve to proceed to tasks.

**Perspective**: Product architect consuming the pipeline. My review focuses on whether this design delivers the complete `tokenSource` experience — edit any token locally, regenerate, see the change everywhere.

---

#### Strengths

1. **The loading sequence section is the most valuable part of this design.** It makes the mechanism explicit: resolveTokens populates the cache, loadComponentTokens gets cache hits, generator reads local values. A platform agent debugging "why didn't my edit propagate?" can trace through this in 30 seconds.

2. **The architecture diagrams (before/after) tell the story immediately.** Before: component tokens from package ❌. After: component tokens from local via module cache ✅. Clear.

3. **Decision 3 (warning not error)** is the right DX call. A platform agent who sets `tokenSource` to iterate on a spacing value shouldn't be blocked because they haven't copied component tokens yet. The warning is informative and actionable ("Run `npx designerpunk init` to copy component tokens locally").

4. **The directory structure diagram** makes relative path resolution verifiable at a glance. Every import path is traced to its resolution. This is the kind of documentation that prevents "it works on my machine" issues.

5. **Decision 2 (`require()` over `import()`)** is correct. Side-effect registration is synchronous. No reason to add async complexity for `loadComponentTokens`.

---

#### Concerns

**1. Ada's #5 (STRATEGIC_FLEXIBILITY_TOKENS inline shape) — Lina confirmed this is real**

The design shows `Record<string, boolean>` but `SpacingTokens.ts` reads `.value` and `.derivation` fields. Lina provided the correct inline shape. This needs to be fixed in implementation — the simplified version will produce runtime errors.

Not a design-phase blocker (the correct shape is known), but flagging it so it doesn't get missed in tasks.

**2. Lina's ESM/CJS cache note — agree, add it**

The one-liner about `import()` and `require()` sharing the same cache under tsx's CJS registration should be in the Loading Sequence section. Without it, a future maintainer might reasonably worry about cache isolation. One sentence prevents that confusion.

**3. The warning message (Decision 3) is good but could be more specific**

Current:
```
⚠️  No component token files found.
   Searched: ./src/tokens/component/
   And: ./src/components/core (none configured)
   Component token output will be empty.
   Run `npx designerpunk init` to copy component tokens locally.
```

This is clear. One suggestion: if the developer HAS `componentTokens` configured but the directories don't exist yet, the message should distinguish "directory doesn't exist" from "directory exists but contains no token files." Minor DX polish — not blocking.

---

#### Product Workflow Validation

I walked through the complete workflow a platform agent will experience after this spec:

1. `npx designerpunk init` → scaffolds `src/tokens/`, `src/types/`, `src/tokens/component/`, `src/components/core/` with transforms applied
2. Config has `tokenSource: './src/tokens'` and `componentTokens: ['./src/components/core', './src/tokens/component']`
3. Agent edits `src/tokens/SpacingTokens.ts` (changes `space150` value)
4. `npx designerpunk validate` → confirms edit is valid
5. `npx designerpunk generate` → output reflects new `space150` in primitives, semantics that reference it, AND component tokens that use it (e.g., `buttonIcon.inset.medium`)

Step 5 is the key validation. The module cache mechanism ensures the component token's `require('../../../tokens/SpacingTokens')` gets the edited local module. The component token output uses the new value. ✅ Complete propagation.

**No split-brain. No dual-edit. No "which source is active?" confusion.** The `tokenSource` story is fully resolved across all token tiers.

---

#### Summary

No blocking issues. Two implementation notes to carry into tasks:
1. `STRATEGIC_FLEXIBILITY_TOKENS` inline must use the full object shape (with `value` and `derivation` fields) — Lina provided the correct structure
2. Add one-line note about ESM/CJS cache sharing under tsx (Lina's recommendation)

Approve to proceed to tasks.