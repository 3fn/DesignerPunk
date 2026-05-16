# Spec 107 Decisions Log

**Date**: 2026-05-16
**Spec**: 107-design-language-context
**Status**: Post-investigation decisions captured

---

## Decisions Made During Investigation

### Decision 1: Enhance Leonardo, Not a New Agent

**Decision:** Design creation capabilities will be added to Leonardo's scope rather than creating a 9th dedicated designer agent.

**Rationale:**
- Avoids coordination overhead (who goes first? Leonardo specs, designer refines, platform implements = three handoffs)
- Leonardo already owns screen specs; this extends him into "screen specs with aesthetic intentionality"
- Natural evolution of an existing role, not a new entity
- Reduces agent-to-agent coordination cost
- Leonardo flagged this concern in his own feedback (R1)

**Impact:** Leonardo's prompt gets Impeccable skill references (adapted for DesignerPunk), design philosophy context, gate system for visual direction, and color strategy vocabulary.

---

### Decision 2: Figtree for Body Typography

**Decision:** Transition from Inter to Figtree as the body/UI font for DesignerPunk's own brand surfaces.

**Rationale:**
- More personality than Inter (rounder terminals, more open apertures) while maintaining readability
- Not on Impeccable's reflex-reject list (Inter is)
- Google Fonts, free, widely available
- Good weight range (300-700) for hierarchy through weight contrast
- Distinctive enough to avoid "default AI output" perception

**Scope:** DesignerPunk's own brand surfaces only. The token system remains font-agnostic for consumers. Consumer typography tokens define their own fonts.

**Owner:** Ada (token-level change)

---

### Decision 3: CommitMono for Monospace

**Decision:** Adopt CommitMono as the monospace font for DesignerPunk's own brand surfaces.

**Rationale:**
- Designed specifically for code readability
- Smart kerning and zero-ambiguity character differentiation (0 vs O, 1 vs l vs I)
- Warmer personality than SF Mono or Fira Code while remaining clearly monospace
- Token names and code examples are prominent in DesignerPunk; the mono font carries real weight
- Signals deliberate choice rather than system default

**Scope:** DesignerPunk's own brand surfaces only. Same font-agnostic principle as body typography.

**Owner:** Ada (token-level change)

---

### Decision 4: Three Implementation Tracks (Sequenced)

**Decision:** Work is organized into three tracks with natural sequencing:

**Track 2 (Revisions) — First:**
- Figtree adoption (body font)
- CommitMono adoption (mono font)
- Address pure black/white in palette (modify #FFF and #000 usage)
- OKLCH exploration/adoption for color token source format
- Owner: Ada

**Track 1 (Additions) — Second (partially parallel):**
- Design philosophy documentation (structured, queryable form)
- Named design rules as governance pattern
- Color strategy vocabulary (Restrained/Committed/Full/Drenched)
- Register concept for surface-type awareness
- Impeccable skill adaptation for Leonardo
- Domain reference integration
- Owner: Thurgood (governance) + Leonardo (consumption)

**Track 3 (MCP Evolution) — Third (depends on 1 + 2):**
- Application MCP: design philosophy tools
- Product MCP: brand context extension, register field
- Named rules as structured queryable data
- Progressive disclosure of design guidance
- Owner: Ada (Application MCP) + Leonardo (Product MCP)

---

### Decision 5: Investigation Gate Passed

**Decision:** Steps 1-3 findings support proceeding to Steps 4-5 (formal spec design).

**Evidence:**
- Gap is real and well-defined (philosophy layer missing, not data)
- Adaptation path is clear (MCP queries replace file reads; reasoning flow stays intact)
- Value proposition is concrete (system-aware, aesthetically intentional output on first attempt)
- Practice enhancements are valuable independently of integration

**Timing:** Steps 4-5 proceed after the Super.com presentation. The manual PRODUCT.md/DESIGN.md samples serve the immediate need.

---

## Open Items (Deferred to Steps 4-5)

1. Exact scope of Leonardo's prompt enhancement
2. Which Impeccable references to adapt vs replace vs keep as-is
3. Data model for "design philosophy" as structured queryable content
4. Conflict resolution hierarchy (DesignerPunk tokens win when Impeccable opinions conflict)
5. How register-awareness modulates Leonardo's screen spec behavior
6. Whether anti-slop mechanisms belong in creation (this spec) or critique (Spec 100) or both
