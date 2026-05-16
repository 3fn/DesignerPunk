# Spec Feedback: Design Language Context for AI-Driven Interface Creation

**Spec**: 107-design-language-context
**Created**: 2026-05-16

---

## Design Outline Feedback

### Context for Reviewers
- This spec enables AI agents to *create* interfaces informed by DesignerPunk's design language → design-outline.md § "Problem Statement"
- Relationship to Spec 100 (critique) is complementary, not overlapping → design-outline.md § "Relationship to Spec 100"
- Investigation plan has an explicit gate after steps 1-3 → design-outline.md § "Decision Gate"
- The designer agent's domain boundary relative to Leonardo is an open question → design-outline.md § "Open Questions for Review" Q1

### Reviewers
- **Leonardo** (primary): Product architecture owner, Product MCP consumer, domain boundary stakeholder
- **Thurgood** (author): Spec structure, governance alignment

---

#### [LEONARDO R1]

**Overall Assessment:** Real gap identified, but solution complexity may exceed the problem. Investigation (Steps 1-3) should proceed; solution shape (Steps 4-5) is premature.

- Gap is real but narrower than proposed. Leonardo needs aesthetic context for *selection* decisions, not for *creation from scratch*. The spec conflates two different consumers. → design-outline.md § "Problem Statement", § "Objectives"
- Domain boundary is unclear in practice. "Leonardo specs WHAT, designer designs HOW it looks" breaks down because screen specifications already include visual hierarchy, spacing rhythm, and composition decisions. The real boundary is *composition from existing vocabulary* vs *creation of new visual artifacts*. Sequencing (who goes first?) is unaddressed. → design-outline.md § "Investigation Plan" Step 5
- Product MCP vs Application MCP: recommend both. System-level design language (color strategy, spacing philosophy) → Application MCP. Product-level brand application (voice, tone, palette choices) → Product MCP. Mirrors the primitive/semantic token split. → design-outline.md § "Open Questions" Q5
- Designer agent is a product agent (Q1). It consumes the system to create product artifacts. Deep system knowledge doesn't make it a system agent. → design-outline.md § "Open Questions" Q1
- Unidentified risks: (a) Impeccable coupling — MCP extensions shaped around one tool's schema may not generalize. (b) Unclear primary use case — product screens vs marketing pages vs presentations changes the architecture. (c) Agent may not be needed — a skill + MCP extension (no new agent) might be sufficient. → design-outline.md § "Risks and Counter-Arguments"
- Recommendation: Proceed with Steps 1-3. Investigation should explicitly answer: (a) primary use case, (b) agent vs skill-only, (c) concrete boundary examples between Leonardo and designer.
- [@LEONARDO] Self-counter-argument noted: Leonardo may be protecting domain. If a designer agent produces better visual outcomes, the product benefits even if Leonardo's role narrows. Question is whether coordination cost exceeds quality gain.

---

## Requirements Feedback

### Context for Reviewers
- Investigation (Steps 1-3) is complete. Findings informed the requirements. → step-1/2/3-findings.md
- Decision: Leonardo enhanced, no new agent → decisions.md § "Decision 1"
- Decision: MCP split (Application = system-level, Product = product-level) → decisions.md § "Decision 4"
- Decision: Figtree + CommitMono for brand surfaces only → decisions.md § "Decision 2, 3"
- Spec 100 is subsumed by this spec → requirements.md § "Introduction"
- Conflict resolution: DesignerPunk tokens win over Impeccable opinions → requirements.md § "Requirement 4" AC 5

#### [LEONARDO R2]

- Req 3: Missing AC for register-awareness modulating behavior (register exists in data layer but no behavioral hook in Leonardo's workflow) → requirements.md § "Requirement 3"
- Req 3 AC2: "confirmed" is underspecified (human vs self-confirmation). Propose gate depth proportional to surface novelty. → requirements.md § "Requirement 3" AC 2
- Req 4: Need explicit AC for Impeccable-as-fallback on ungoverned dimensions (not just conflict resolution) → requirements.md § "Requirement 4"
- Req 4 AC7: Add auditability — skill reports which rules were suppressed and why → requirements.md § "Requirement 4" AC 7
- Req 3 or 6: Missing AC connecting brand context to component variant selection → requirements.md § "Requirement 3"
- Req 3: Missing graceful degradation AC (what happens when philosophy unavailable) → requirements.md § "Requirement 3"
- Req 3: Missing lessons-learned capture AC for philosophy ambiguity → requirements.md § "Requirement 3"
- Gate system: acceptable with escape hatch (full/abbreviated/no gates based on novelty). Suggest Req 3 AC2 say "proportional to surface novelty" to leave design flexibility. → requirements.md § "Requirement 3" AC 2
- [@LEONARDO] Self-counter-argument: may be over-specifying own workflow. Some items (gate tiers, degradation) may belong in design.md.
- **No blocking concerns.** Refinements, not structural objections.

#### [ADA R1]

- Req 5: Indexing mechanism is architecturally novel. Current Application MCP indexes structured YAML only. Design philosophy is "prose with structure." Recommend pure structured YAML (not markdown) for source data to avoid new parser complexity. → requirements.md § "Requirement 5" AC 5
- Req 7 AC3: Consumer isolation mechanism doesn't exist in current pipeline. `fontFamilyBody` is global; changing it changes ALL consumers. Need to specify HOW isolation works (tokenSource? config override? new mechanism?) → requirements.md § "Requirement 7" AC 3
- Req 7 AC4: Font loading infrastructure not addressed (CSS @font-face, CDN, native bundles). Font availability is prerequisite for rendering. → requirements.md § "Requirement 7" AC 4
- Missing: Source data file location for design philosophy (where does the YAML live?) → requirements.md § "Requirement 5"
- Missing: Validation/health warning for malformed philosophy source data → requirements.md § "Requirement 5"
- Missing: `fontFamilyDisplay` scope (Rajdhani staying or changing?) → requirements.md § "Requirement 7"
- Missing: Test expectation updates (FontFamilyTokens.test.ts asserts Inter/Rajdhani) → requirements.md § "Requirement 7"
- Provided recommended YAML structure for design-philosophy.yaml (pure YAML, deterministic field paths, category-based filtering)
- No fundamental Rosetta architecture concern. Design philosophy is metadata about the system, not a new token tier. Natural extension of existing pattern (like experience patterns and layout templates).
- [@ADA] Counter-argument: "High" items (consumer isolation, source format) may be appropriately deferred to design phase. Requirements say what, design says how.
- **No blocking concerns.** Consumer isolation is the most significant gap.

#### [THURGOOD R2] — Incorporation Notes

- Incorporated LEONARDO R2 items 1-7: Added ACs 4, 7, 8, 9 to Req 3. Modified AC2 to "proportional to surface novelty." Added AC8 to Req 4 (fallback on ungoverned dimensions). Added auditability to Req 4 AC7.
- Incorporated ADA R1 items: Added ACs 6, 7 to Req 5 (pure YAML format, health warnings). Rewrote Req 7 ACs 3-7 (isolation via existing config, font loading, Rajdhani out of scope, test updates).
- Decisions confirmed by Peter: Gate depth proportional to novelty (Leonardo's proposal). Pure YAML for source format (Ada's recommendation). Consumer isolation via existing font config mechanism. fontFamilyDisplay (Rajdhani) out of scope.

---
