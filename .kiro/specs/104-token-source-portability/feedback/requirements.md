# Spec Feedback: Requirements

**Spec**: 104-token-source-portability
**Phase**: Requirements
**Created**: 2026-05-09

---

### Context for Reviewers
- Design outline approved by Ada (R2), Lina (R1), Leonardo (R1) — all approved to proceed
- Key resolutions from design outline feedback:
  - All-or-nothing principle for component tokens (Lina/Leo consensus over Ada's fallback)
  - Auto-discover `{tokenSource}/component/` + explicit `componentTokens` dirs (combined approach)
  - Lint boundary excludes `src/tokens/component/` (carve-out per Lina)
  - Ship `src/types/` with token source (Decision 1, Option B)
  - Inline constants into SpacingTokens (single consumer confirmed by Ada)
  - Inline `Math.round(16 * 0.88)` in TypographyTokens (stored value, not generation-time)
  - Generated config includes both `'./src/components/core'` and `'./src/tokens/component'`

---

### Ada — Requirements Review (2026-05-09)

**Verdict**: Approve to proceed to design. Requirements are well-structured, traceable, and correctly incorporate all feedback resolutions.

---

#### Strengths

1. **The all-or-nothing principle is clearly stated** in the introduction and enforced via Req 3 AC 5-6. No ambiguity about fallback behavior.

2. **Req 1 is minimal and precise** — exactly 2 files to refactor, with regression safety (AC 4) as an explicit criterion.

3. **Req 3 (Component Token Portability) correctly separates auto-discovery from explicit config** — AC 1 handles `{tokenSource}/component/`, AC 2 handles `componentTokens` directories. Both contribute to the same resolution.

4. **Req 6 (Lint Boundary) has the right carve-out** — AC 3 explicitly excludes `src/tokens/component/`. AC 4 catches `require()` calls too (which I flagged in R1).

5. **Traceability table is complete** — every requirement maps to a specific feedback item or issue.

---

#### Concerns

**1. Req 3 AC 1 — Auto-discovery glob pattern needs clarification**

AC 1 says "scanning for `*.ts` files" in `{tokenSource}/component/`. But AC 2 says "scanning for `*.tokens.ts` files" in `componentTokens` directories. These are different glob patterns.

The inconsistency matters:
- `{tokenSource}/component/` contains files like `progress.ts` (no `.tokens.` in the name)
- `src/components/core/*/` contains files like `buttonIcon.tokens.ts` and `avatar.tokens.ts`

**Recommendation**: AC 1 should scan for `*.ts` (all TypeScript files in the component subdirectory — it's a small, dedicated directory). AC 2 should scan for `*.tokens.ts` (to avoid loading non-token files from broader component directories). The current wording is actually correct — just noting that the difference is intentional, not an oversight. If it IS intentional, add a brief note in the design phase explaining why the patterns differ.

**2. Req 3 AC 4 — "reference local primitive token objects" needs implementation clarity**

AC 4 states component tokens "SHALL reference local primitive token objects (not package primitives)." This happens naturally if the component token file imports primitives via relative paths that resolve within the local source tree. But it's worth noting in the design: this works because `require()` caches modules by resolved path. If the component token file at `./src/tokens/component/progress.ts` does `require('../../tokens/SpacingTokens')`, it gets the LOCAL SpacingTokens (already loaded by `resolveTokens()`), not the package's.

**Wait** — actually, there's a subtlety. `resolveTokens()` calls `require(config.tokenSourceRoot)` which loads `src/tokens/index.ts`. But component token files do `require('../../tokens/SpacingTokens')` — a different require path that resolves to the same file. Node's module cache keys by resolved absolute path, so they WILL get the same module instance. ✅ This works. But the design should explicitly note this dependency on Node's module caching behavior.

**3. Req 5 AC 3 — "preserve relative directory structure" is vague**

What exactly must be preserved? The requirement should be more specific:
- `src/tokens/` at depth 1 from project root
- `src/types/` at depth 1 from project root (sibling to tokens)
- `src/components/core/` at depth 2 from project root
- `src/tokens/component/` at depth 2 from project root

This ensures `../types/` from `src/tokens/` resolves to `src/types/`, and `../../../tokens/` from `src/components/core/Button-Icon/` resolves to `src/tokens/`.

**Recommendation**: Either enumerate the required structure in the design phase, or add an AC: "Init SHALL place `src/types/`, `src/tokens/`, and `src/components/core/` as siblings under the product repo's `src/` directory."

**4. Req 7 vs Req 2 — Overlap**

Req 2 says "init SHALL copy `src/types/`" and Req 7 says "init SHALL copy `src/types/`". These are the same requirement stated twice. Req 2 focuses on the "why" (types available for token imports) and Req 7 focuses on the "how" (merge-mode, no overwrite).

**Not a blocker** — the ACs are complementary, not contradictory. But the design phase should treat them as a single implementation unit.

**5. Missing: What happens to the existing `rewriteTypeImports` transform?**

The 11.2.1 patch added a `rewriteTypeImports` transform in init that rewrites `../types/PrimitiveToken` → `@3fn/core/types`. If we're now shipping `src/types/` alongside tokens (Option B), do we still need this transform? The relative imports would resolve naturally.

**My recommendation**: Remove the type import transform. With `src/types/` shipped alongside `src/tokens/`, relative `../types/` imports just work. The transform becomes dead code. This should be an explicit AC somewhere — perhaps add to Req 5: "WHEN `src/types/` is shipped alongside token source THEN the type import rewrite transform SHALL be removed (relative imports resolve naturally)."

---

#### Minor Notes

- Req 4 AC 3 correctly limits the build import transform to component token files only (not primitive/semantic files, which shouldn't have build imports at all — the lint boundary enforces this).
- The scope boundaries are appropriate. No over-reach.
- "Docs only for migration" is the right call for V1.

---

#### Summary of Requested Clarifications

| # | Requirement | Clarification |
|---|-------------|---------------|
| 1 | Req 3, AC 1 vs AC 2 | Confirm different glob patterns are intentional (*.ts vs *.tokens.ts) |
| 2 | Req 3, AC 4 | Design should note dependency on Node module cache for primitive sharing |
| 3 | Req 5, AC 3 | Specify exact directory structure (src/tokens, src/types, src/components/core as siblings) |
| 4 | Req 2 + Req 7 | Treat as single implementation unit in design |
| 5 | Req 5 (missing) | Add AC to remove the 11.2.1 type import rewrite transform (now unnecessary) |

None are blockers. Approve to proceed to design.

---

### Lina — Requirements Review (2026-05-09)

#### [LINA R1]

**Verdict**: Approve to proceed to design.

Requirements are clean, correctly incorporate all design-outline resolutions, and the all-or-nothing principle is clearly enforced. My earlier concerns (component token asymmetry, lint boundary carve-out, generated config paths) are all addressed.

---

#### Agreements

1. **Req 1 (Self-Contained Token Files)** — Minimal, precise, with regression safety. Two files, two inlines, done.

2. **Req 3 (Component Token Portability)** — The auto-discover + explicit config combination (AC 1 + AC 2) is exactly what I proposed. AC 5-6 enforce the all-or-nothing principle. Good.

3. **Req 6 (Lint Boundary)** — The `component/` carve-out (AC 3) is correct. AC 4 catching `require()` is a good detail.

4. **Req 5 AC 4** — Generated config includes both directories. Matches my recommendation.

---

#### Concerns

**1. Ada's point #1 (glob pattern difference) — confirming it's intentional and correct**

- `{tokenSource}/component/` → scan `*.ts` — correct, because files there are named `progress.ts` (no `.tokens.` suffix)
- `componentTokens` directories → scan `*.tokens.ts` — correct, because `src/components/core/` contains many non-token files and we only want token definitions

The difference is intentional. The `component/` subdirectory within the token source is a dedicated directory where ALL files are component tokens. The `componentTokens` directories (like `src/components/core/`) are broader and need the `.tokens.ts` suffix filter to avoid loading component implementations, tests, etc.

Design should document this distinction explicitly.

**2. Ada's point #5 (remove `rewriteTypeImports` transform) — agree, important**

If `src/types/` ships alongside `src/tokens/`, the relative `../types/` imports resolve naturally. The `rewriteTypeImports` transform from 11.2.1 becomes dead code. It should be explicitly removed.

**Recommendation**: Add an AC to Req 5: "WHEN `src/types/` is copied alongside token source THEN the existing type import rewrite transform (`rewriteTypeImports`) SHALL be removed — relative imports resolve without transformation."

This is a cleanup item but it matters: leaving dead transforms in init creates confusion for future maintainers who wonder why the transform exists when the imports already work.

**3. Req 3 AC 3 — Loading order matters for registry population**

AC 3 says the CLI loads component token files "before calling the generator." But there's a sequencing subtlety:

1. `resolveTokens(config)` loads primitives and semantics from `tokenSource`
2. Component token files are loaded (triggering `defineComponentTokens()` which calls `ComponentTokenRegistry.registerBatch()`)
3. `generateTokenFiles(tokens, config)` is called — generator reads from `ComponentTokenRegistry.getAll()`

Step 2 must happen AFTER step 1, because component token files import primitive token objects (e.g., `spacingTokens.space150`). If the primitive module hasn't been loaded yet, the import would trigger loading from the package path (via Node's module resolution), not the local path.

**Actually** — this depends on whether `resolveTokens()` uses `import()` or `require()`. If it uses dynamic `import()` (as designed in Spec 103), the primitive modules are loaded and cached. When component token files subsequently `require('../../../tokens/SpacingTokens')`, Node resolves the absolute path and finds the module already in cache. ✅ Works.

But if the component token files are in a DIFFERENT directory than the token source (e.g., `src/components/core/Button-Icon/buttonIcon.tokens.ts` imports `../../../tokens/SpacingTokens`), the resolved absolute path must match what `resolveTokens()` loaded. In a product repo where both live under the same `src/`, this works. In core (where everything is in the same repo), this also works.

**Recommendation for design**: Document the loading sequence explicitly and note the dependency on Node's module cache. Not a requirements change — just a design-phase implementation note.

**4. Req 2 + Req 7 overlap — agree with Ada**

These describe the same action (init copies `src/types/`). Req 2 is the "why" (types needed for token imports), Req 7 is the "how" (merge-mode, no overwrite). Design should treat them as one implementation unit.

---

#### No Concerns About

- **Req 4 (`@3fn/core/build` subpath export)** — Straightforward. Standard package.json exports addition.
- **Scope boundaries** — Appropriate. No over-reach.
- **Traceability** — Complete. Every requirement maps to a feedback item.

---

#### Summary

| # | Item | Action |
|---|------|--------|
| 1 | Glob pattern difference (*.ts vs *.tokens.ts) | Document in design (intentional, not oversight) |
| 2 | Remove `rewriteTypeImports` transform | Add AC to Req 5 |
| 3 | Loading order (primitives before component tokens) | Document in design |
| 4 | Req 2 + Req 7 overlap | Treat as single implementation unit |

None are blockers. Approve to proceed to design.

---

### Leonardo — Requirements Review (2026-05-09)

#### [LEO R1]

**Verdict**: Approve to proceed to design.

**Perspective**: Product architect consuming the pipeline. My review focuses on whether these requirements, when implemented, will give platform agents a fully working `tokenSource` experience — no split-brain, no silent failures, no "why didn't my edit take effect?" moments.

---

#### Feedback Resolution Incorporation — Verified

| My Design-Outline Concern | Resolution | Where in Requirements |
|--------------------------|-----------|----------------------|
| All-or-nothing for component tokens | ✅ Adopted | Req 3, AC 5-6 |
| Auto-discover from `{tokenSource}/component/` | ✅ Adopted | Req 3, AC 1 |
| Init preserves directory structure (explicit AC) | ✅ Adopted | Req 5, AC 3 |
| Lint boundary carve-out for `component/` | ✅ Adopted | Req 6, AC 3 |
| Docs only for migration | ✅ Adopted | Scope boundaries |

All my design-outline concerns are addressed. No drift.

---

#### Agreements

1. **Req 1 is minimal and correct.** Two files, two inlines, regression safety. Nothing more needed.

2. **Req 3 AC 5-6 (all-or-nothing enforcement)** — This is the most important pair of ACs in the spec. They prevent the exact split-brain scenario I flagged. A warning when no component tokens are found is the right UX — it tells the developer what to do next without silently degrading.

3. **Req 6 (Lint Boundary)** — Prevention over reaction. This is what makes the spec durable. Without it, the next developer who adds an import to a token file silently breaks product repos again.

4. **Req 5 AC 3 (directory structure preservation)** — Glad this made it in as an explicit AC. "Probably works" isn't acceptable for a portability spec.

---

#### Concerns

**1. Agree with Ada #5: the `rewriteTypeImports` transform should be explicitly removed**

If `src/types/` ships alongside `src/tokens/` (Req 2), then relative `../types/` imports resolve naturally. The 11.2.1 `rewriteTypeImports` transform becomes dead code. Neither Req 2 nor Req 5 explicitly states it should be removed.

**Recommendation**: Add an AC to Req 5: "WHEN `src/types/` is shipped alongside token source THEN the existing type import rewrite transform (`rewriteTypeImports`) SHALL be removed — relative imports resolve without transformation." This prevents confusion about why a dead transform still exists in the codebase.

**2. Agree with Ada #1: glob pattern difference is intentional but should be documented**

- `{tokenSource}/component/` → `*.ts` (dedicated directory, all files are tokens)
- `componentTokens` directories → `*.tokens.ts` (broader directories, need suffix filter)

This is correct behavior but non-obvious. Design should document the rationale so a future maintainer doesn't "fix" the inconsistency.

**3. Req 3 AC 4 — "reference local primitive token objects" — the mechanism is implicit**

AC 4 states the desired outcome (component tokens reference local primitives) but not the mechanism. The mechanism is Node's module cache: `resolveTokens()` loads primitives first, then component token files `require()` the same absolute path and get the cached module.

This isn't a requirements problem — it's a design-phase implementation note. But it's worth flagging because if the mechanism breaks (e.g., different module resolution paths in an edge case), the AC would pass in testing but fail in a product repo with a different directory layout.

**Recommendation for design**: Include a brief note explaining WHY AC 4 works (module cache sharing) and under what conditions it could fail (different absolute paths resolving to the same logical module).

---

#### Product Workflow Completeness Check

After Spec 103 + Spec 104, the full `tokenSource` workflow:

| Action | Spec 103 | Spec 104 | Status |
|--------|----------|----------|--------|
| Set `tokenSource` in config | ✅ | — | Works |
| Edit primitive token locally | ✅ | — | Works |
| Edit semantic token locally | ✅ | — | Works |
| Edit component token locally | — | ✅ Req 3 | Will work |
| Token files load without import errors | — | ✅ Req 1, 2 | Will work |
| `validate` checks local source | ✅ | — | Works |
| `generate` uses local source | ✅ | ✅ Req 3 | Will work (all tiers) |
| Lint prevents future breakage | — | ✅ Req 6 | Will work |

After this spec, the `tokenSource` story is complete. No remaining gaps for the platform agent workflow.

---

#### Summary

| # | Item | Action |
|---|------|--------|
| 1 | Remove `rewriteTypeImports` transform | Add AC to Req 5 (agree with Ada) |
| 2 | Glob pattern difference documentation | Design-phase note (not a requirements change) |
| 3 | Module cache mechanism for AC 4 | Design-phase implementation note |

No blockers. Approve to proceed to design.