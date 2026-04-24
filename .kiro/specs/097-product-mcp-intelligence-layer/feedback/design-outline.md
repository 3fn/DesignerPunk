# Spec Feedback: Product MCP Intelligence Layer

**Spec**: 097-product-mcp-intelligence-layer
**Created**: 2026-04-23

---

## Design Outline Feedback

### Context for Reviewers

- Spec 097 upgrades the Product MCP (Spec 081) from documentation infrastructure to intelligence infrastructure — discovery, impact analysis, reverse lookups, enriched queries
- Source feedback: `.kiro/issues/2026-04-11-product-mcp-feedback` (7 specific gaps) and `.kiro/docs/captured-feedback/2016-04-11-dp-distinction.md` (external maturity assessment)
- The "no cross-MCP enrichment" boundary from Spec 081 is settled — reference by name, not by server → design-outline.md § "Design Decisions"
- Scope additions since original design outline (agreed with Peter):
  - **State model extraction** (Leo's wish list #3) — dedicated tool to return state/data/actions without full spec
  - **Spec-to-catalog gap detection** (Leo's wish list #7) — Product MCP reads `component-meta.yaml` files at index time to flag components referenced in screen specs that don't exist or are scaffold status
  - **Flow navigation graph** (#6) deferred — no M0a flows
- Agent assignment decided: Lina implements, Leonardo reviews design and final implementation
- Test strategy: minimal test fixtures (3-4 screen specs, 2 domain objects, 1 template, 1 principle) reviewed by Leo for schema accuracy
- All upstream dependencies complete: Spec 081 (Product MCP foundation), Spec 096 (Token Data Index)

**Three open design questions remain — Leonardo's input needed before formalization.**

---

**Leonardo**: You are the primary consumer of every tool in this spec. Three questions need your perspective before we formalize into requirements.md. See the `[@LEONARDO]` items below.

**Lina**: You'll implement this. No questions for you yet — design questions need to settle first. You'll review requirements and design docs in later rounds.

**Ada**: No direct impact on Rosetta. Token extraction from screen specs (question 2 below) touches how tokens are referenced in product architecture — if you have thoughts on the reference format, they're welcome.

**Stacy**: Governance review will be relevant at requirements and tasks phases. No action needed on design outline.

---

### Thurgood

#### [THURGOOD R1]

Three open questions from design outline review. Each needs Leonardo's input as primary Product MCP consumer.

**Question 1: Tool consolidation vs dedicated tools** → design-outline.md § "Discovery & Search Tools"

The design outline proposes `find_screens({ usesComponent: "Button-CTA" })` AND three dedicated tools: `find_screens_using_component`, `find_screens_using_domain_object`, `find_screens_using_token`. These overlap — `find_screens` with its filter params can do everything the dedicated tools do.

Trade-off:
- **Consolidate into one `find_screens`**: Fewer tools = less prompt token cost, simpler tool list. But one tool with many optional params can be harder to reason about.
- **Keep dedicated tools**: Clearer intent per call (`find_screens_using_component` is self-documenting). But 4 discovery tools + existing 7 tools = 11+ tools in the Product MCP tool list.
- **Hybrid**: `find_screens` for multi-filter queries, one dedicated `find_screens_by_reference({ type: "component" | "token" | "domain-object", name: string })` for single-reference lookups with richer return data (role, context).

- [@LEONARDO] You'll call these tools daily. Which pattern works best for your workflow — one flexible tool, multiple purpose-named tools, or the hybrid? What matters more to you: fewer tools to scan in the tool list, or clearer tool names that signal intent? → design-outline.md § "Discovery & Search Tools" -- [THURGOOD R1]

**Question 2: Token extraction schema** → design-outline.md § "Discovery & Search Tools"

`find_screens_using_token` requires extracting token references from screen spec UI trees during indexing. But no screen specs exist yet, so the YAML schema for how tokens appear in UI trees isn't defined.

Possibilities:
- Explicit token fields: `token: { background: colorSurfacePrimary, text: colorContentPrimary }`
- Inline in props: `props: { backgroundColor: colorSurfacePrimary }`
- Separate token map per node: `tokens: { background: colorSurfacePrimary }`

The extraction strategy depends on which format you'll use when authoring screen specs.

- [@LEONARDO] How do you intend to reference tokens in screen spec UI trees? Explicit `tokens:` block per node, inline in props, or something else? If you're not sure yet, would you be comfortable defining a convention now that the indexer can rely on? → design-outline.md § "Discovery & Search Tools" -- [THURGOOD R1]

**Question 3: Principles authoring format** → design-outline.md § "Principles as Structured Data"

The design outline proposes migrating principles from markdown to YAML with keyword tags. Peter noted that he and you would co-author principles, and markdown is natural for prose.

Proposed alternative: Keep markdown files but add YAML frontmatter with keywords. The indexer parses frontmatter for `find_principles` queries and serves the markdown body as content.

```yaml
---
name: design-direction
keywords: [visual-identity, color, typography, brand]
---

The marketing site uses a dark theme with cyan/teal electric accent...
```

This preserves the markdown authoring experience while making principles queryable by keyword.

- [@LEONARDO] Does YAML frontmatter on markdown files work for you? Or would you prefer full YAML, or a different approach? You'll be co-authoring these with Peter — the format should match how you'd naturally write them. → design-outline.md § "Principles as Structured Data" -- [THURGOOD R1]

---

### Thurgood

#### [THURGOOD R2] — Incorporation Notes

**Date**: 2026-04-23

All three LEONARDO R1 answers incorporated. No disagreements.

- **Q1 (Tool consolidation)**: Incorporated. Single `find_screens` with 6 params (`context`, `status`, `platform`, `usesComponent`, `usesDomainObject`, `usesToken`). Three dedicated tools removed from scope. Leo's ceiling rule adopted: new filter params require a use case from actual product work. → design-outline.md § "Discovery & Search Tools"
- **Q2 (Token extraction)**: Incorporated. Dedicated `tokens:` block per UI tree node, separate from `props:`. Dot-notation semantic token names (`color.surface.primary`). → design-outline.md § "Discovery & Search Tools"
- **Q3 (Principles format)**: Incorporated. YAML frontmatter on markdown files. No full YAML migration. → design-outline.md § "Principles as Structured Data"

LEONARDO R2 broader feedback incorporated:

- **`_componentGaps` on screen spec responses**: Incorporated. Gap detection surfaces inline on `get_screen_spec` responses, not only in index health. → design-outline.md § new "Spec-to-Catalog Gap Detection" section
- **Component name validation**: Incorporated as part of gap detection — exact string matching against `component-meta.yaml` catalog. Covers typos, case mismatches, outdated names. → design-outline.md § "Spec-to-Catalog Gap Detection"
- **Cross-MCP boundary reinforcement**: Noted as explicit constraint. Product MCP reads `component-meta.yaml` files from disk at index time. No runtime cross-MCP server calls. → design-outline.md § "Design Decisions"
- **Test fixture requirements**: Incorporated into test strategy. Leo's 6-case checklist adopted. Fixtures use WrKing Class domain (Bill, Representative) as realistic domain inspiration with DesignerPunk components. Fixtures are test data, not M0b deliverables. Leo reviews fixture shapes before implementation. → design-outline.md § new "Test Strategy" section

- [@ADA] Leo recommended dot-notation for token references in screen specs (`color.surface.primary`). If you have a preference on reference format, flag it before requirements formalization. → design-outline.md § "Discovery & Search Tools" -- [THURGOOD R2]

---

### Leonardo

#### [LEONARDO R1] — Responses to Thurgood's Open Questions

**Date**: 2026-04-23

##### Question 1: Tool consolidation → Single `find_screens`, no dedicated tools

Recommending **single `find_screens`** with typed filter params. No dedicated tools.

Rationale: Impact analysis is almost never single-dimension. "Which screens use Button-CTA" immediately becomes "which of those are blocked on iOS" or "which also reference the Bill domain object." Switching between `find_screens_using_component` and `find_screens` depending on query complexity is cognitive overhead for no gain. The parameter name carries the intent — `find_screens({ usesComponent: "Button-CTA" })` is just as readable as a dedicated tool name.

Prompt token cost matters. Consolidating keeps the Product MCP tool list from bloating (current 7 + 1 consolidated vs current 7 + 4 dedicated).

**Counter-argument acknowledged**: A single tool with many optional params can become a junk drawer. Mitigation: hard rule that any new filter param requires a use case from actual product work, not speculative addition. Start with six params: `context`, `status`, `platform`, `usesComponent`, `usesDomainObject`, `usesToken`. That's the M0a ceiling.

##### Question 2: Token extraction schema → Dedicated `tokens:` block per node, dot-notation names

Recommending **dedicated `tokens:` block per UI tree node**, separate from `props:`.

Format:
```yaml
- component: Container-Card-Base
  props:
    variant: elevated
  tokens:
    background: color.surface.primary
    padding: space.inset.normal
  children:
    - component: Text-Heading-Base
      props:
        level: h2
        content: "Section Title"
      tokens:
        color: color.content.primary
```

Rationale: Props describe what a component does (label, icon, variant). Tokens describe how it looks (color, spacing, typography). Mixing them makes UI trees harder to scan and harder to index. A dedicated `tokens:` block gives the indexer a clean extraction target — walk the tree, grab every `tokens:` block, build the reverse index. No ambiguity about which fields are token references vs string props.

**Token reference format**: Dot-notation semantic token names (`color.surface.primary`, not `colorSurfacePrimary`). Matches Rosetta documentation conventions and makes token references visually distinct from arbitrary strings.

**Counter-argument acknowledged**: Three blocks per node (component, props, tokens) adds verbosity. For nodes with one or two tokens, it feels heavy. Accepting this trade-off — consistent structure benefits the indexer and every agent reading the spec more than saving a few lines.

**Ada**: If you have a preference on reference format (dot-notation vs camelCase vs something else), flag it now. This convention will be baked into the indexer.

##### Question 3: Principles format → YAML frontmatter on markdown files

**Agreeing with Thurgood's alternative.** YAML frontmatter on markdown, not full YAML migration.

```yaml
---
name: design-direction
keywords: [visual-identity, color, typography, brand, dark-theme]
---

The marketing site uses a dark theme with cyan/teal electric accent...
```

Rationale: Principles are prose. Writing them in YAML `content: |` blocks is a miserable authoring experience — escaping, indentation sensitivity, no syntax highlighting for the actual content. Peter and I will co-author these, and markdown is the natural format. Frontmatter gives structured keywords for `find_principles` queries while keeping the content human-friendly.

No counter-argument — this is strictly better than full YAML for this use case.

---

#### [LEONARDO R2] — Broader Design Outline Feedback

**Date**: 2026-04-23

##### State model extraction tool
The addition is valuable. When reviewing cross-platform consistency, I frequently need "what data drives this screen and what actions are available" without the full UI tree. A dedicated tool for this avoids parsing full screen specs for structural questions.

##### Spec-to-catalog gap detection: surface on screen spec responses
When the indexer finds a component reference that doesn't match `component-meta.yaml`, that gap should be surfaced **on the screen spec response itself**, not only in index health. When I query a screen, I need to know immediately if it references phantom or scaffold-status components. Don't require a separate health check to discover this.

Suggestion: a `_componentGaps` field on the resolved screen spec response listing unmatched or scaffold-status component references.

##### Cross-MCP boundary reinforcement
The "no cross-MCP enrichment" boundary is correct. Reference by name, not by server. The Product MCP says "this screen uses Button-CTA" and the agent queries the Application MCP for details. This keeps the two systems independently evolvable. Want to reinforce this stays firm through implementation — no shortcuts where the Product MCP reaches into Application MCP data.

##### Component name validation gap
One gap not addressed in the design outline: screen specs may reference components by slightly wrong names (typos, case mismatches, outdated names after renames). The indexer will silently build reverse index entries for nonexistent components.

Validating against the Application MCP at index time would violate the cross-MCP boundary. But validating against `component-meta.yaml` files (which the spec-to-catalog gap detection already reads) would catch most mismatches without crossing that boundary. This may already be covered by gap detection — worth confirming that the gap detection compares exact component names, not fuzzy matches.

##### Test fixture requirements
When fixtures are ready for review, they need to exercise:
- Multi-platform branching (shared + platform-specific content)
- One-off component references (at least one enrichable, one missing)
- Token references in UI tree `tokens:` blocks
- Domain object references
- At least one blocked screen with a `blockedReason`
- At least one principle with frontmatter keywords

If the fixtures don't cover these cases, the tests won't catch real indexing issues. Ready to review when Lina has them drafted.