# Ada Action: Rosetta Documentation Accuracy Fixes

**Date**: 2026-06-05
**Source**: `.kiro/issues/2026-06-05-rosetta-docs-verification-findings.md` (findings 3, 4, 5)
**Agent**: Ada
**Priority**: Low — documentation accuracy, no architectural or code changes
**Effort**: ~15 minutes total

---

## Context

During Spec 008 design-outline preparation, Ada identified three documentation accuracy issues in Rosetta steering docs. These are independent of any pipeline work and can be addressed directly.

---

## Fix 1: Architecture Doc Entry Points Need Consumer Context (Finding 3)

**File**: `.kiro/steering/Rosetta-System-Architecture.md`
**Section**: Subsystem Entry Points

**Problem**: Lists paths like `src/generators/TokenFileGenerator.ts` that exist inside `@3fn/core` but not in product repos consuming the package. Agents in product repos follow these paths and find nothing.

**Fix**: Add a brief note to the entry points section:

> These paths reference `@3fn/core` package source. In product repos consuming the package, these subsystems are accessed via the pipeline CLI (`npx designerpunk generate`) and the `defineConfig()` API. To inspect pipeline internals: `node_modules/@3fn/core/src/`.

---

## Fix 2: Pipeline Stage Count Inconsistency (Finding 4)

**Files**:
- `.kiro/steering/DesignerPunk-Systems-Overview.md` — Mermaid diagram shows 5 stages
- `.kiro/steering/Rosetta-System-Architecture.md` — details 6 stages (includes Mode Resolution)

**Problem**: Mode Resolution (theme override application, light/dark set production) is a genuine stage omitted from the overview diagram.

**Fix**: Add a parenthetical or note below the overview's Mermaid diagram:

> (Mode Resolution sits between Registry and Generation for color tokens — see Rosetta-System-Architecture.md for full detail.)

---

## Fix 3: token-index/ Directory Needs README (Finding 5)

**Path**: `token-index/README.md` (new file)

**Problem**: `token-index/primitives.yaml`, `semantics.yaml`, and `components.yaml` appear to be generated output but nothing documents what generates them, when, or what consumes them.

**Fix**: Create `token-index/README.md` explaining:
- What generates these files (pipeline command/stage)
- When they're regenerated (on `npx designerpunk generate`)
- What consumes them (Application MCP TokenIndexer, Product MCP TokenRefResolver)
- Whether they should be committed (yes — MCP servers read them at runtime)

---

## Governance Note

Fixes 1 and 2 modify steering docs — per ballot measure model, Ada drafts the changes and Peter approves before applying. Fix 3 is a new file in a non-steering directory and can be created directly.
