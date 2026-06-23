# Design Outline (STUB): Agent Generator

**Date**: 2026-06-23
**Spec**: 122 — Agent Generator (the former "121-B")
**Author**: Thurgood (placeholder scaffolding)
**Status**: **PLACEHOLDER STUB — not a design outline.** Formalization is **gated on Spec 118's module-resolution direction decision** (bundle-vs-tsx / CJS-vs-ESM). This document captures scope, dependencies, and cross-references only so the references from Spec 121 resolve and the dependency graph is navigable. **No architecture or design decisions are recorded here** — they would pre-empt 118.

---

## Why This Is a Stub

This effort was split out of Spec 121 (see 121 requirements § "Spec split" and Decision 1). Its real design depends on how Spec 118 resolves the runtime module-resolution direction: the generator emits agent configs + skills with tool-specific path-context and runtime assumptions, and those assumptions are exactly what 118 is deciding. Formalizing 122 before 118's direction decision would bake in a direction that 118 may overturn.

**Do not formalize until Spec 118 reaches its direction decision point.**

---

## Scope (captured from Spec 121's design-outline, "Spec 121-B — Agent Generator")

A build step modeled on the token pipeline: **one canonical agent definition → per-tool configs.** Lifted from 121's stub, not re-derived:

- **Single canonical source per agent → per-tool configs.** Define each agent once; generate the per-tool outputs. Never hand-edit generated outputs (the same rule Rosetta enforces for tokens). Canonical format = Markdown body + YAML frontmatter (121 Resolved Decision 1).
- **Transforms** encode the per-tool deltas the 121 dry-run catalogued: MCP query syntax → namespaced tool names; `resources:`/`skill://` injection → MCP routing + native skills; `/knowledge` → grep/MCP fallback note; hotkeys removed; write-scope as a behavioral note (Claude Code can't path-scope writes).
- **Skill repointing** — skills lifted and internal paths repointed by the generator (`.kiro/skills/…` → `.claude/skills/…`); bundled scripts travel as-is.
- **Neutral `skills/` root** — skills live in a neutral top-level `skills/` root (sibling to 119's `governance/`), kept conceptually distinct from governance. Generator copies/repoints into each tool's location (121 Resolved Decision 2).
- **Pluggable target adapter** — Kiro + Claude Code first; adding a target = adding an adapter/transform, not a rearchitecture (121 Resolved Decision 4, a hard design constraint).
- **Regenerate-and-diff guard** — commit generated configs, paired with a CI/pre-commit guard that regenerates-and-diffs (fails if committed ≠ fresh generate), turning drift into a loud failure (121 Resolved Decision 5).

*(Scope lifted verbatim-in-substance from Spec 121. Refine — do not expand — during formalization, after 118.)*

---

## Dependencies

- **Spec 118 (Module-Resolution Coherence)** — **direction-gating.** 118's runtime module-resolution / bundle-vs-tsx decision determines the generator's path-context and runtime assumptions. **122 cannot formalize until 118's direction decision point.**
  - `.kiro/specs/118-module-resolution-coherence/design-outline.md`
- **Spec 121 (Claude Code Portability)** — **benefits from / consumes.** 122 was split out of 121-B; it consumes 121's discovery + delivery fixes, and propagates 121's summary-first workflow rule into generated agent prompts (121 Requirement 5).
  - `.kiro/specs/121-claude-code-portability/design-outline.md`
  - `.kiro/specs/121-claude-code-portability/requirements.md`
- **Feeds Spec 119 (Steering Progressive Disclosure)** — the generator regenerates agent prompts; 119's prompt-routing/regeneration work consumes 122's output.
  - `.kiro/specs/119-steering-progressive-disclosure-redesign/design-outline.md`
- **Feeds Spec 123 (Consumer Distribution)** — `npx designerpunk init` runs the generator for the consumer's chosen tool; 123 packages and distributes generator output.
  - `.kiro/specs/123-consumer-distribution/design-outline.md`

---

## Cross-References

- Spec 121 design-outline — source of this stub's scope (§ "Spec 121-B — Agent Generator"): `.kiro/specs/121-claude-code-portability/design-outline.md`
- Spec 121 requirements — names 122 as "Agent Generator (the former 121-B)" and the summary-first propagation contract (Req 5): `.kiro/specs/121-claude-code-portability/requirements.md`
- Spec 118 design-outline — the gating direction decision: `.kiro/specs/118-module-resolution-coherence/design-outline.md`
- Spec 119 design-outline — consumes regenerated agent prompts: `.kiro/specs/119-steering-progressive-disclosure-redesign/design-outline.md`
- Spec 123 design-outline — downstream consumer/packaging of generator output: `.kiro/specs/123-consumer-distribution/design-outline.md`

---

*Stub only. Scope + dependencies + status + cross-references captured. Formalization (requirements → feedback → design → tasks) follows after Spec 118's direction decision, in a fresh session.*
