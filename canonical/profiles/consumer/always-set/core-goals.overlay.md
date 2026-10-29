## @unit #core-project-context @ sha256:809e8be5a1088c68b6641c0fc1af3419698ced6ecd18007501a1c8df309e7491
## Core Project Context

This design system is built on DesignerPunk — a True Native cross-platform design system with mathematical foundations, built for Human-AI collaboration — and carries its principles.

**Key Principles:**
- Build-time platform separation (web/iOS/Android) rather than runtime detection
- Mathematical foundation: REM-style baseline grid with modular scale
- Accessibility-first: WCAG 2.1 AA compliance
- Cross-platform consistency through unitless token architecture
- Human-AI partnership as foundational value

**Platform Minimum Versions:**
- iOS: 17.0+
- Android: Not yet constrained
- Web: Not yet constrained

**For detailed architectural guidance, see (docs MCP):**
- True Native Architecture: `platform-implementation-guidelines`
- Token System: `rosetta-system-architecture`
- Mathematical Foundation: `rosetta-system-principles`

## @unit #development-practices @ sha256:32062538bc2af63fb4f40fbcd0f063e08cc01a097e467f1b76e423117bae4da1
## Development Practices

**Task Completion:**
- Follow your repo's own task-completion workflow — branch, review, and merge as your team does; the human lead's acceptance is the authorization act (see the Task Completion Protocol member)

**For detailed workflow guidance, see:**
- Spec planning: `process-spec-planning` (docs MCP, conditional)

**Token Usage:**
- **Always** prioritize design tokens over hard-coded values
- **MUST** use semantic tokens first, except a component's own token inside that component — only use primitive tokens when no semantic token exists for the use case
- All tokens must follow Rosetta System: mathematical relationships, unitless values, primitive→semantic hierarchy
- Inform user if hard-coded values are necessary

**Token Governance (Autonomy Levels):**
- **Semantic tokens**: Use freely (verify semantic correctness)
- **Primitive tokens**: Requires prior context (spec docs) or human acknowledgment
- **Component tokens**: Use freely inside the component they belong to, for the property they were made for; any other use requires explicit human approval
- **Creating ANY system token** (primitive, semantic or component): Always requires human review — no autonomous token creation (what a system token is: Token Governance § "Token Creation Governance"). A product token is planned instead: its need is identified at screen specification and discussed before implementation, and a need the spec missed is surfaced, never filled silently (Product-Token-Governance § "Authoring Workflow").

**Token selection**: the one order is Token Governance § "Token Selection Matrix"; query it before you choose a token: `get_section({ path: "token-governance", heading: "Token Selection Matrix" })`.

**Token-First in Specs:**
- Specs reference tokens, not pixel values: `icon.size100` not `24px`
- Hard values in source docs (design-outlines) **must** be translated to token references when available
- Format: `token.name` with value as comment only when needed for clarity
- Query Token Quick Reference via MCP when uncertain which token to use

**For detailed token guidance, see:**
- Token governance: `Token-Governance.md` (Layer 2, MCP-accessible) — Selection, usage, and creation governance
- Component development: `Component-Development-Guide.md` (Layer 3, conditional)
- Token selection: Component Development Guide's "Token Selection Decision Framework"

**Documentation Approach:**
- Maintain concept-based documentation preventing contamination vectors
- Apply process-first tool development: prove manual processes before automation