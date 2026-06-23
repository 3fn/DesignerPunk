# Design Outline (STUB): Consumer Distribution

**Date**: 2026-06-23
**Spec**: 123 — Consumer Distribution (the former "121-C")
**Author**: Thurgood (placeholder scaffolding)
**Status**: **PLACEHOLDER STUB — not a design outline.** Formalization is **gated on Spec 118's module-resolution direction decision** (bundle-vs-tsx / CJS-vs-ESM). This document captures scope, dependencies, and cross-references only so the references from Spec 121 resolve and the dependency graph is navigable. **No architecture or design decisions are recorded here** — they would pre-empt 118.

---

## Why This Is a Stub

This effort was split out of Spec 121 (see 121 requirements § "Spec split" and Decision 1). Distribution mechanics — how the package resolves paths in a consumer repo, how the MCP entry is wired, what `init`/`sync` emit — depend directly on Spec 118's runtime module-resolution direction. Formalizing 123 before 118's direction decision would bake in path-context and resolution assumptions that 118 may overturn.

**Do not formalize until Spec 118 reaches its direction decision point.**

---

## Scope (captured from Spec 121's design-outline, "Spec 121-B — Consumer / package scope")

The generator is **consumer-facing**, not just an internal build tool. DesignerPunk installs into other projects; those projects choose their own tool. Lifted from 121's stub, not re-derived:

- **`npx designerpunk init --target`** runs the generator for the consumer's chosen tool (Kiro / Claude Code / Cursor), emitting agent configs + MCP config + skills that point at the **installed package paths** (`node_modules/@3fn/core/...`). Today `init` scaffolds Kiro only.
- **Dual path-context** — the same canonical agent generates with different base paths: repo-relative in this repo, `node_modules/@3fn/core`-relative in a consumer. (Generalizes 121's relativization work.)
- **MCP package-relative fallback** — MCP config resolves package-relative paths in the consumer so the bundled MCP servers (`dist/mcp`) are found regardless of consumer cwd.
- **`package.json` `files[]` / wiring + product-MCP entry** — ship the canonical agent sources, the neutral `skills/` root, the generator, and a product-MCP entry; ensure the consumer's MCP config references the bundled servers.
- **`npx designerpunk sync` repair** — detect/repair the new config locations (`.mcp.json`, `.cursor/mcp.json`), not just Kiro's `MCP_STEERING_DIR`; refresh vendored prompts/docs on upgrade (the dp-portfolio sync-refresh watch item inherited from 121 Requirement 4).

*(Scope lifted verbatim-in-substance from Spec 121. Refine — do not expand — during formalization, after 118.)*

---

## Live-Bug Context (feeds Spec 118, not resolved here)

The consumer dry-run surfaced live customer-facing bugs **F-C1 / F-C2 / F-C6**. These are the empirical evidence of the consumer-side module-resolution incoherence that **feeds Spec 118's direction decision**. They are **out of scope for 123** (and were out of scope for 121 — they are patch-release fixes; F-C1 is already resolved in 12.0.5). Captured here only as the bug context that 118 consumes.

- See `.kiro/specs/121-claude-code-portability/consumer-dry-run-findings.md` and 121 requirements § "Scope discipline".

---

## Dependencies

- **Spec 118 (Module-Resolution Coherence)** — **direction-gating.** 118's runtime module-resolution / bundle-vs-tsx decision determines how the package resolves paths and wires the MCP in a consumer. **123 cannot formalize until 118's direction decision point.** (F-C1/F-C2/F-C6 feed 118.)
  - `.kiro/specs/118-module-resolution-coherence/design-outline.md`
- **Spec 122 (Agent Generator)** — **consumes.** `init --target` runs the generator; 123 packages and distributes its output for consumers.
  - `.kiro/specs/122-agent-generator/design-outline.md`
- **Spec 121 (Claude Code Portability)** — **inherits.** 121's additive MCP contract (no breaking response-shape changes) is what lets 121-A fixes propagate to consumers for free on `npm update`; 123 inherits the dp-portfolio sync-refresh watch item (121 Requirement 4).
  - `.kiro/specs/121-claude-code-portability/design-outline.md`
  - `.kiro/specs/121-claude-code-portability/requirements.md`

---

## Cross-References

- Spec 121 design-outline — source of this stub's scope (§ "Spec 121-B — Consumer / package scope"): `.kiro/specs/121-claude-code-portability/design-outline.md`
- Spec 121 requirements — names 123 as "Consumer Distribution (the former 121-C)" + the sync-refresh watch item (Req 4): `.kiro/specs/121-claude-code-portability/requirements.md`
- Spec 121 consumer-dry-run-findings — F-C1/F-C2/F-C6 live-bug context: `.kiro/specs/121-claude-code-portability/consumer-dry-run-findings.md`
- Spec 118 design-outline — the gating direction decision (which F-C1/F-C2/F-C6 feed): `.kiro/specs/118-module-resolution-coherence/design-outline.md`
- Spec 122 design-outline — the generator this spec distributes: `.kiro/specs/122-agent-generator/design-outline.md`

---

*Stub only. Scope + dependencies + status + cross-references captured. Formalization (requirements → feedback → design → tasks) follows after Spec 118's direction decision, in a fresh session.*
