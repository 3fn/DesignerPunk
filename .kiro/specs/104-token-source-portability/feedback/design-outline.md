# Spec Feedback: Design Outline

**Spec**: 104-token-source-portability
**Phase**: Design Outline
**Created**: 2026-05-09

---

### Context for Reviewers
- Origin: Ada's follow-up field report after 11.2.0 and 11.2.1 → `.kiro/issues/ada-2026-05-09-tokenSource-followup copy.md`
- 11.2.1 fixed type imports only; 5 files have deeper dependencies (constants, build, components)
- Core principle: token files should be self-contained, enforced by lint boundary
- Key decisions: how token files import types (Option A/B/C), where constants live, lint rule scope
- Spec 103 established `tokenSource` feature; this spec makes it actually work for the common case
- **ROUND 2 UPDATE**: Scope expanded to include component token portability per Peter's direction
- Ada's R1 narrowed primitive/semantic scope to 2 files (not 5)
- Component tokens added: `defineComponentTokens` needs `@3fn/core/build` export, CLI needs to load local component token files
- New Decision 4: how CLI loads local component tokens (recommending glob scan of `componentTokens` dirs)
- New open questions 4-6 about component token behavior

---

### Ada — Design Outline Review, Round 2 (2026-05-09)

**Context**: Scope expanded to include component token portability (item 6), `@3fn/core/build` subpath export, and CLI wiring for local component token loading.

**Verdict**: Still approve to proceed to requirements. The expanded scope is justified — without component token portability, `tokenSource` gives a half-working experience where primitive/semantic edits take effect but component token edits don't.

---

#### On the Expanded Scope (Item 6: Component Token Portability)

The architecture is sound:
1. Add `@3fn/core/build` subpath export → `defineComponentTokens` accessible from product repos ✅
2. Init transform rewrites `../../build/tokens` → `@3fn/core/build` ✅
3. CLI loads local component token files via `componentTokens` config directories ✅

**Decision 4 (CLI loading strategy): I agree with Option A** (scan directories for `*.tokens.ts`).

HOWEVER, there's a subtlety. The current `componentTokens` config field was designed for Spec 094 as "directories to scan for component token files" — but it was never actually wired up for loading. The `scripts/generate-platform-tokens.ts` hardcodes the import list. So this spec would be the first time `componentTokens` actually does something at generation time.

**Concern**: If `componentTokens` is empty (the default), and `tokenSource` is set, what happens? The pipeline should still load component tokens from *somewhere*. Options:
- **A**: If `componentTokens` is empty and `tokenSource` is set, load component tokens from the package (current behavior) — asymmetric but safe
- **B**: If `componentTokens` is empty and `tokenSource` is set, load NO component tokens — consistent with "all-or-nothing" but breaks output
- **C**: If `componentTokens` is empty, auto-discover from `tokenSource` path (look for `component/` subdirectory and `../components/core/*/tokens.ts` relative to it)

**My recommendation**: Option A for V1. If `componentTokens` is explicitly configured, use those paths. If empty, fall back to package component tokens. This matches the "progressive opt-in" pattern — you can use `tokenSource` for primitives/semantics without configuring component tokens, and add `componentTokens` when you're ready to localize those too.

---

#### Answers to New Open Questions

**Q4: Replace or merge component tokens?**

**Replace entirely** when `componentTokens` is explicitly configured. Consistent with primitive/semantic behavior. If `componentTokens` is empty/omitted, fall back to package (see concern above).

**Q5: Do relative paths resolve correctly after init?**

Yes — IF init preserves the relative directory structure. Component token files at `src/components/core/Button-Icon/buttonIcon.tokens.ts` import `../../../tokens/SpacingTokens`. After init copies both `src/tokens/` and `src/components/core/`, the relative path `../../../tokens/SpacingTokens` from `src/components/core/Button-Icon/` resolves to `src/tokens/SpacingTokens` — correct.

**But**: This assumes init copies component token files to `src/components/core/` (preserving the path depth). If init puts them somewhere else (e.g., `src/component-tokens/`), the relative imports break. The requirements should specify that init preserves the directory structure.

**Q6: Lint boundary for component token files?**

**No** — don't apply the same boundary to component token files. They legitimately need `@3fn/core/build` (for `defineComponentTokens`) and relative imports to `src/tokens/` (for primitive references). The lint boundary should only enforce on `src/tokens/*.ts` and `src/tokens/semantic/*.ts` — the "pure definition" files.

Component token files are a different authoring surface: they're consumers of primitives AND the build system. Constraining them the same way would be over-restrictive.

---

#### Revised Scope Assessment

| Item | Complexity | Notes |
|------|-----------|-------|
| Inline `STRATEGIC_FLEXIBILITY_TOKENS` | Trivial | 1 file change |
| Inline `UnitConverter` usage | Trivial | Replace with `Math.round(16 * 0.88)` |
| `@3fn/core/build` subpath export | Small | package.json exports + barrel file |
| Init transform for build imports | Small | Extend existing rewrite logic |
| CLI component token loading | Medium | Glob scan + require + registry population |
| Lint boundary test | Small | Jest test checking import patterns |
| Init copies `src/types/` | Small | Extend init to include types directory |

Total: ~medium spec. The CLI component token loading is the most complex piece — it needs to handle the glob, require each file (triggering side effects), and integrate with the existing generation flow.

---

#### Counter-Argument (Revisited)

My previous counter-argument about "transparent module resolution" is less relevant now that component tokens are in scope. The transparent resolver approach would need to handle `defineComponentTokens` registration side effects, which is fundamentally different from just resolving import paths. The self-contained approach with explicit loading is cleaner for component tokens.

The expanded scope strengthens the case for the self-contained approach.

---

### Ada — Response to Lina's Question (Concern #5) (2026-05-09)

**Lina asks**: Should the generated config include `'./src/tokens/component'` in `componentTokens`?

**Answer**: Yes. The current init generates `componentTokens: ['./src/components']`, which misses `src/tokens/component/progress.ts`. After this spec, the generated config should be:

```typescript
componentTokens: ['./src/components/core', './src/tokens/component'],
```

Two changes:
1. `'./src/components'` → `'./src/components/core'` — more precise (the glob scans for `*.tokens.ts`, and component tokens live in `core/` subdirectories, not directly in `src/components/`)
2. Add `'./src/tokens/component'` — captures family-shared component tokens like progress

**On the Ada vs Lina disagreement (fallback behavior)**:

I've reconsidered after reading both Lina's and Leonardo's arguments. They're right — the "split-brain" scenario (primitives from local, component tokens from package) is the exact confusion Spec 103 was designed to eliminate. My fallback recommendation was prioritizing safety over consistency, but the warning message approach handles the safety concern adequately.

**Revised position**: I concede to Lina's auto-discover approach. When `tokenSource` is set:
1. Auto-scan `{tokenSource}/component/` for component token files
2. Also scan any explicitly configured `componentTokens` directories
3. If neither yields results, emit a warning (not a silent fallback)

This makes `tokenSource` truly all-or-nothing, which is the cleaner mental model. The warning prevents silent breakage for developers who haven't copied component tokens locally yet.

---

### Lina — Design Outline Review (2026-05-09)

#### [LINA R1]

**Verdict**: Approve to proceed to requirements.

This spec directly addresses the "known asymmetry" I flagged in Spec 103 — component tokens resolving from the package while primitives/semantics resolve locally. Glad to see it tackled immediately.

---

#### Strengths

1. **The principle is right**: token files are a public authoring surface and must be self-contained. Enforcing this with a lint boundary prevents regression. Reactive patching (the 11.2.1 approach) doesn't scale.

2. **Component token portability (Item 6)** is the most valuable part of this spec from my perspective. Without it, `tokenSource` gives a confusing half-experience where editing a primitive value doesn't propagate to component tokens that reference it.

3. **Decision 1 (Option B — ship `src/types/` with token source)** is the right call. No tsconfig magic, no transforms. The types directory is small and read-only in product repos.

4. **Decision 4 (Option A — glob scan for `*.tokens.ts`)** is correct. The `componentTokens` config field already exists and accepts directory paths. Scanning is the natural behavior.

---

#### Concerns

**1. Component token file import paths within `src/tokens/component/`** → design-outline.md § "Item 6"

Component token files have TWO categories of imports that need handling:

| Import | Example | Resolution Strategy |
|--------|---------|-------------------|
| `defineComponentTokens` from build | `from '../../build/tokens'` | Rewrite to `@3fn/core/build` via init transform |
| Primitive token objects | `from '../../tokens/SpacingTokens'` | Resolves via relative path (structure preserved by init) |

The outline covers the first (subpath export + init transform). The second works naturally because init preserves directory structure. I verified:

- `src/tokens/component/progress.ts` imports `from '../../tokens/SpacingTokens'` — from `src/tokens/component/`, `../..` = `src/`, then `tokens/SpacingTokens` = `src/tokens/SpacingTokens`. ✅ Works in both core and product repos.
- `src/components/core/Button-Icon/buttonIcon.tokens.ts` imports `from '../../../tokens/SpacingTokens'` — from `src/components/core/Button-Icon/`, `../../..` = `src/`, then `tokens/SpacingTokens` = `src/tokens/SpacingTokens`. ✅ Works in both core and product repos.

No issue here — just confirming the paths resolve correctly.

**2. Disagreement with Ada's fallback recommendation for empty `componentTokens`** → Ada R2 § "Concern"

Ada recommends: if `componentTokens` is empty and `tokenSource` is set, fall back to package component tokens. I **disagree** for consistency reasons.

The design outline states `tokenSource` is "all-or-nothing" for primitives/semantics (Spec 103, Resolution E). If we make component tokens fall back to the package when unconfigured, we get inconsistent behavior:
- `tokenSource` set, `componentTokens` empty → primitives/semantics from local, component tokens from package
- `tokenSource` set, `componentTokens` configured → everything from local

This is the exact "split-brain" I flagged in Spec 103. A developer edits a primitive value locally, expects component tokens to reflect it, but they don't because component tokens are still reading package primitives.

**My recommendation**: When `tokenSource` is set, the CLI should auto-discover component token files from within the token source tree:
- Scan `{tokenSource}/component/` for `*.ts` files (covers `progress.ts` etc.)
- Scan `componentTokens` directories if explicitly configured (covers `src/components/core/*/tokens.ts`)
- If neither yields results, emit a warning: "No component token files found. Component token output will be empty."

This makes `tokenSource` truly all-or-nothing: set it, and ALL token resolution shifts to local. The `componentTokens` config becomes an *additional* directory to scan, not the sole source.

**Counter-argument to my own position**: This adds complexity to the resolution logic and may surprise users who set `tokenSource` for primitives but don't have local component tokens yet. Ada's fallback approach is simpler and more forgiving. But I think the debugging confusion of "why didn't my primitive edit affect component token output?" outweighs the simplicity benefit.

**3. Open Question 6 — lint boundary scope for `src/tokens/component/`** → design-outline.md § "Open Questions"

Agree with Ada: do NOT apply the lint boundary to component token files. They legitimately need `@3fn/core/build` (for `defineComponentTokens`) and relative imports to primitive token files.

But there's a subtlety: `src/tokens/component/progress.ts` lives INSIDE `src/tokens/`. So the lint boundary on `src/tokens/**/*.ts` would catch it unless there's a carve-out.

**Recommendation**: Either:
- Carve out `src/tokens/component/` from the lint boundary (simplest for V1)
- Move component token files out of `src/tokens/` entirely (cleaner long-term, but more churn)

I'd go with the carve-out for V1. The lint rule checks `src/tokens/**/*.ts` EXCLUDING `src/tokens/component/**/*.ts`.

**4. Init transform extension** → design-outline.md § "Item 6"

The current `rewriteTypeImports` transform handles `../types/` → `@3fn/core/types`. This spec adds a second pattern: `../build/tokens` → `@3fn/core/build`. The requirements should specify:
- The build import transform applies to component token files only (files in `src/components/core/` and `src/tokens/component/`)
- Primitive/semantic token files should NOT have build imports (the lint boundary enforces this)
- The transform can be a single function with two regex replacements, or two separate transforms applied to different file sets

**5. [@ADA] Question on `componentTokens` default in generated config**

The `generateConfig()` function in `init.ts` produces:
```typescript
componentTokens: ['./src/components'],
```

After this spec, should the generated config also include `'./src/tokens/component'`? The progress tokens live there. If a product repo uses `tokenSource` and has `componentTokens: ['./src/components']` only, it would miss the progress tokens in `src/tokens/component/`.

**Recommendation**: Update the generated config to:
```typescript
componentTokens: ['./src/components/core', './src/tokens/component'],
```

Or, if my auto-discover recommendation (concern #2) is adopted, this becomes less critical since `{tokenSource}/component/` would be scanned automatically.

---

#### Summary

| Item | My Position |
|------|-------------|
| Self-contained token files | ✅ Agree |
| Ship `src/types/` (Decision 1, Option B) | ✅ Agree |
| Glob scan for component tokens (Decision 4, Option A) | ✅ Agree |
| Lint boundary on `src/tokens/` (with `component/` carve-out) | ✅ Agree |
| Fallback to package when `componentTokens` empty | ❌ Disagree — prefer auto-discover from token source |
| Lint boundary on component token files | ❌ Don't apply |

Approve to proceed to requirements.

---

### Leonardo — Design Outline Review (2026-05-09)

#### [LEO R1]

**Verdict**: Approve to proceed to requirements.

**Perspective**: Product architect consuming the pipeline. My review focuses on whether this spec completes the `tokenSource` DX story — when a platform agent sets `tokenSource` and edits tokens locally, does *everything* work as expected?

---

#### Strengths

1. **The principle is correct and overdue.** Token files as a public authoring surface must be self-contained. The lint boundary prevents regression — no more reactive patching when a new internal import silently breaks product repos.

2. **Component token portability (Item 6) is the right scope expansion.** Without it, `tokenSource` delivers a confusing half-experience. A platform agent edits a spacing primitive, re-generates, and wonders why `buttonIcon.inset.medium` still uses the old value. That's the exact debugging tax Spec 103 was supposed to eliminate.

3. **Decision 1 (Option B — ship `src/types/`)** is the right call. Five small files, no magic. Platform agents won't be confused by a read-only `src/types/` directory — it's clearly infrastructure.

4. **Decision 4 (Option A — glob scan)** is correct. The `componentTokens` config field already exists. Scanning for `*.tokens.ts` is the natural behavior and scales to product-defined component tokens.

5. **The lint boundary as prevention** — this is the key insight. Spec 103 was reactive (fix what's broken). This spec is preventive (ensure it can't break again). That's the right architectural posture.

---

#### Concerns

**1. The Ada vs Lina disagreement on empty `componentTokens` fallback — I side with Lina**

Ada recommends: if `componentTokens` is empty and `tokenSource` is set, fall back to package component tokens. Lina recommends: auto-discover from the token source tree, making `tokenSource` truly all-or-nothing.

**I side with Lina**, and here's the product-side reasoning:

When a platform agent sets `tokenSource: './src/tokens'`, their mental model is: "the pipeline reads from my local files." If component tokens silently fall back to the package, the agent will:
1. Edit `./src/tokens/SpacingTokens.ts` (change a spacing value)
2. Run `npx designerpunk generate`
3. See updated primitive/semantic output ✅
4. See component tokens still using the OLD spacing value ❌
5. File a bug report or waste time debugging

This is the *exact same class of confusion* that Spec 103 was created to fix. We shouldn't reintroduce it at the component token layer.

**My recommendation**: When `tokenSource` is set, auto-discover `{tokenSource}/component/` for component tokens. If `componentTokens` is also explicitly configured, scan those directories too. If neither yields results, warn (don't silently fall back).

**Counter-argument**: Ada's approach is more forgiving for the "I just want to edit primitives" case. A developer who sets `tokenSource` but hasn't copied component tokens locally would get empty component token output under Lina's approach. But the warning message handles this: "No component token files found at ./src/tokens/component/. Run `npx designerpunk init` to copy component tokens locally, or configure `componentTokens` in your config."

**2. Open Question 3 (migration path) — docs only is correct for now**

Ada recommends docs only since there's 1 product repo. Agree. A `npx designerpunk migrate` command is over-engineering for a single consumer. Document the steps, move on. If more product repos appear, revisit.

**3. Open Question 5 (relative path resolution after init) — needs explicit verification in requirements**

The outline assumes init preserves directory structure such that `../../../tokens/SpacingTokens` resolves correctly from `src/components/core/Button-Icon/`. This is probably true, but "probably" isn't good enough for a portability spec. Requirements should include an AC that explicitly states: "Init SHALL preserve the relative directory structure between component token files and primitive token files such that existing relative imports resolve without modification."

**4. Lina's lint boundary carve-out (concern #3) — agree**

The lint boundary should exclude `src/tokens/component/**/*.ts`. These files legitimately import from `@3fn/core/build` and from primitive token files. They're a different authoring surface with different constraints. The carve-out is simple and correct.

---

#### Product Workflow Validation

After this spec, the complete platform agent workflow becomes:

1. `npx designerpunk init` → scaffolds local token source (primitives, semantics, types, component tokens)
2. Config has `tokenSource: './src/tokens'` and `componentTokens: ['./src/components/core', './src/tokens/component']`
3. Agent edits any token file locally (primitive, semantic, or component)
4. `npx designerpunk validate` → confirms edits are valid
5. `npx designerpunk generate` → produces output reflecting ALL local edits

No dual-edit. No split-brain. No "which source is active?" confusion. The `tokenSource` story is complete.

---

#### Decisions Summary

| Decision | My Position |
|----------|-------------|
| Decision 1 (types import strategy) | Option B — ship `src/types/` |
| Decision 2 (constants location) | Check usage; inline if single-file, `shared-constants.ts` if shared |
| Decision 3 (lint boundary) | As specified, with `component/` carve-out per Lina |
| Decision 4 (CLI component loading) | Option A — glob scan, with auto-discover from `tokenSource` |
| Empty `componentTokens` fallback | Side with Lina — auto-discover, don't fall back to package |
| Open Q3 (migration) | Docs only |
| Open Q6 (lint boundary on component tokens) | Don't apply |

---

#### Summary

No blocking issues. One substantive disagreement (fallback behavior for empty `componentTokens`) where I side with Lina over Ada — the all-or-nothing principle should extend to component tokens for DX consistency. Requirements should resolve this.

Approve to proceed to requirements.