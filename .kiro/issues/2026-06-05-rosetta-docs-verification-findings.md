# @3fn/core Feedback: Rosetta Documentation Page Verification Findings

**Date**: 2026-06-05
**Context**: During verification of narrative claims for the Rosetta documentation page (Spec 008), several documentation and content issues were identified that affect the portfolio site and steering docs.
**Source**: Ada (token verification) during Spec 008 design-outline preparation
**Priority**: Low — none are architectural issues; all are documentation accuracy

---

## 1. Context Reduction Metric Discrepancy (-87% vs 82%)

**Issue**: The portfolio site displays two different numbers for the same concept:
- Stats section: "-87% Context load"
- Ecosystem section: "82% context reduction"

**Impact**: Technical evaluators will notice the discrepancy. For a system built on "every decision must be queryable," an inconsistent marketing stat undermines credibility.

**Recommendation**: Align to one number, or clarify that they measure different things (if they do). The ecosystem stat references MCP rule delivery specifically; the stats section references overall context load. If these are genuinely different measurements, make that distinction visible.

---

## 2. No Documented Methodology for -87% Claim

**Issue**: No document in the repo explains how the -87% context load reduction was measured. The mechanism is real (MCP progressive disclosure: ~200 tokens for summaries vs 5000-15000 for full docs), but the specific number has no traceable derivation.

**Impact**: Under scrutiny from a technical audience, "every decision must be queryable" applies to the system's own claims. A claim without methodology is anecdotal, not architectural.

**Recommendation**: Create a brief methodology note (even 200 words) in `docs/` or `analysis/` explaining:
- What was measured (context tokens loaded per agent task)
- How it was measured (with MCP vs without, across N tasks or theoretical calculation)
- When it was measured (baseline date)

Doesn't need to be rigorous science — needs to be *traceable*.

---

## 3. Architecture Doc References Paths That Don't Exist in Product Repos

**Issue**: `Rosetta-System-Architecture.md` lists entry points like:
- `src/generators/TokenFileGenerator.ts`
- `src/validators/ThreeTierValidator.ts`
- `src/registries/PrimitiveTokenRegistry.ts`
- `src/resolvers/SemanticOverrideResolver.ts`

These paths exist inside `@3fn/core` but not in product repos that consume the package. An AI agent in a product repo following these paths gets nothing.

**Impact**: Agent confusion when following documented entry points. The portable pipeline pattern (Spec 094) means products don't have these files locally.

**Recommendation**: Add a brief note to the Architecture doc's Subsystem Entry Points section:

> "These paths reference `@3fn/core` package source. In product repos consuming the package, these subsystems are accessed via the pipeline CLI (`npx designerpunk generate`) and the `defineConfig()` API. To inspect pipeline internals: `node_modules/@3fn/core/src/`."

---

## 4. Pipeline Stage Count Inconsistency (5 vs 6 stages)

**Issue**: 
- `DesignerPunk-Systems-Overview.md` Mermaid diagram: Definition → Validation → Registry → Generation → Output (5 stages)
- `Rosetta-System-Architecture.md` detailed pipeline: Definition → Validation → Registry → Mode Resolution → Generation → Output (6 stages)

Mode Resolution is a genuine stage (theme override application, light/dark set production). The overview omits it for simplicity.

**Impact**: Agents reading the overview get a slightly different mental model than those reading the architecture doc. Minor but avoidable.

**Recommendation**: Add a parenthetical to the overview diagram label or a note below it: "(Mode resolution sits between Registry and Generation for color tokens — see Architecture doc for full detail.)"

---

## 5. token-index/ Directory Has No README

**Issue**: `token-index/primitives.yaml`, `token-index/semantics.yaml`, and `token-index/components.yaml` appear to be generated pipeline output (they contain platform variable names like `--space-000`, `space000`, `space_000`), but nothing documents:
- What generates these files
- When they're regenerated
- What consumes them (MCP servers? Build process?)
- Whether they should be committed or are build artifacts

**Impact**: Someone encountering the repo cold cannot distinguish these from hand-authored files.

**Recommendation**: Add a `token-index/README.md` explaining provenance, generation command, and consumption context.

---

## Summary

| # | Type | Owner | Effort |
|---|------|-------|--------|
| 1 | Content inconsistency | Site content (Peter/Sparky) | 5 min |
| 2 | Missing methodology | Civitas (Thurgood) | 30 min |
| 3 | Doc accuracy | Steering docs (Ada/Peter) | 10 min |
| 4 | Doc consistency | Steering docs (Ada/Peter) | 5 min |
| 5 | Missing documentation | Rosetta (Ada) | 10 min |

None of these are blocking for Spec 008 — the Rosetta documentation page narrative is defensible as-is. These are improvements for overall system credibility.
