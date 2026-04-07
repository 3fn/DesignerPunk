# Spec 081 Discovery: Leonardo's Product MCP Wish List

**Date**: 2026-04-06
**Source**: Leonardo R2 in `docs/roadmap/m0a-pre-launch-feedback.md`
**Context**: Unconstrained wish list from the product architect perspective, ordered by frequency of use

---

## Tier 1 — Every Screen Spec (daily use)

1. **Screen → Component lookup**: Given a screen name, return the component tree. Queryable source of truth for screen specifications.
2. **Component → Screen reverse lookup**: Given a component, return all screens that use it. Impact analysis when components or tokens change.
3. **Screen state model query**: What data drives a screen, what user actions change state, what API calls are involved. Most-asked question from platform agents during implementation.
4. **Screen → Token lookup**: Semantic token references per screen. Impact analysis when tokens change.

## Tier 2 — Weekly Use

5. **Cross-platform implementation status**: Per-screen status across platforms (implemented, pending, issues).
6. **Flow navigation graph**: Screen A → Screen B via action X. Structured flow data.
7. **Spec-to-catalog gap detection**: Flag components referenced in screen specs that don't exist or are scaffold status.
8. **Lessons by screen/flow**: Queryable lesson routing by screen or flow, not just milestone.

## Tier 3 — Milestone Boundaries

9. **Cross-platform parity report**: Where are platforms divergent? Intentional (True Native) vs accidental?
10. **Open system escalations**: Structured requests to system agents and their status.
11. **Screen spec template generation**: Pre-populate spec with likely components, patterns, and layout templates based on screen purpose.

## Explicitly Out of Scope

- Code generation (platform agents' job)
- Product decisions (Peter's job)
- Duplicating Application MCP capabilities (proxy, don't reimplement)

## Single Most Valuable Capability

Bidirectional screen↔component lookup (#1 + #2). The bridge the Product MCP exists to provide.

## Caveat

Leo's own words: "Half of this list might turn out to be wrong." The foundation should ship with connection plumbing and extension points. Features grow from real friction during Phase 2 and M0b.

---

## Phase 1 Scope (M0a)

Only the foundation ships in Phase 1:
- Connect to Application MCP, proxy design system queries
- Accept product config file (name, platforms, theme)
- Extension points for product-specific data

The wish list informs what extension points need to support, but none of it gets built in Phase 1.
