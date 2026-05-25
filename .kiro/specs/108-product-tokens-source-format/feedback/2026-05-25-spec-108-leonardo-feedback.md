# Feedback: Spec 108 Design Outline — Product Tokens

**Date**: 2026-05-25
**Reviewer**: Leonardo (Product Architect)
**Document reviewed**: `.kiro/issues/design-outline.md`
**Status**: Feedback submitted

---

## Overall Assessment

**Strong. Ready to proceed with minor clarifications.**

The design philosophy, scope boundary, and source format are well-considered. The phased approach (format + discoverability first, generation later) is pragmatic and unblocks product work immediately. The terminology cleanup and scope model provide the conceptual clarity that was missing.

---

## Strengths

1. **Design philosophy** ("deviation is welcome; deviation without communication is not") — correctly positions product tokens as signals, not governance failures
2. **Scope boundary** — steps 1-2 only, generation deferred. Unblocks product work without over-engineering.
3. **Validation rules** — practical governance that helps rather than blocks. Hard values require rationale; refs get validated.
4. **Unit type system** — declaring semantic kind (not platform unit) keeps source format platform-agnostic while supporting future generation.
5. **Terminology** — "brand tokens" → "product tokens" is clearer. Scope model (component → product → system) with litmus tests is immediately actionable.
6. **Resolution at query time (D2)** — minimizes agent round-trips, consistent with Application MCP's design principle.

---

## Questions and Concerns

### Q1: Category naming constraint vs practical filenames

The validation rule states "Category name contains non-identifier characters → ERROR" and "lowercase ASCII letters only (a-z)." Does this exclude hyphens?

If a product needs more specific category files (per D5's escape hatch: "more specific category files like `layout-grid.yaml`"), the hyphenated filename would fail validation. `layoutgrid` is valid but ugly and hard to scan.

**Suggestion**: Allow hyphens in filenames but use camelCase conversion for platform output (`layout-grid` → `ProductLayoutGrid`). Or clarify that the escape hatch means `layoutgrid.yaml` not `layout-grid.yaml`.

### Q2: Rationale friction at scale

The `rationale` requirement on hard values is the right governance for intentionality. However, a product with 30-50 tokens will feel this as paperwork. The risk: teams use `ref` with approximate tokens (avoiding rationale) rather than honest hard values with rationale.

**Not suggesting removal** — the friction is intentional and valuable. But worth monitoring during adoption.

**Suggestion**: Include 2-3 example rationales in the governance doc that demonstrate the expected quality bar. The portfolio's values provide good examples: "Optimized for 70-75 characters per line at body font size across common viewport widths" is excellent rationale.

### Q3: Color governance boundary with SemanticOverrides — needs a worked example

The doc correctly states product tokens CAN define colors with stricter governance. But the boundary between "product token color" and "SemanticOverrides entry" isn't obvious in edge cases.

**Clear case**: Chord diagram uses `#1a5fff` (blue) — no blue family exists. Product token with rationale. ✓

**Ambiguous case**: A product wants a slightly different pink than `pink300` for a chart accent. Is that a product token, a SemanticOverrides entry, or an application-level exception?

**Suggestion**: Include a decision tree or 2-3 worked examples in the governance doc covering this boundary.

### Q4: Stale token index → misleading warnings

Resolution at query time reads `token-index/` to resolve refs. If someone adds a system token but hasn't regenerated the index, refs fail resolution with a warning.

Agents might interpret the warning as "this product token is broken" rather than "the token index needs regenerating."

**Suggestion**: Differentiate warning messages: "Token '{ref}' not found in token-index — verify index is current (`npx designerpunk generate`)" rather than a generic "not found."

### Q5: Author before tooling ships?

The portfolio project needs product tokens now. The format is defined here; the MCP indexer comes later.

**Question**: Is the expectation that products author `product/tokens/*.yaml` now and accept they won't be MCP-queryable until the indexer ships?

**My recommendation**: Author now. The structured YAML is valuable even without MCP queryability — it's a single source of truth that agents can read directly. The MCP indexer adds convenience, not capability. Waiting blocks product work for tooling that isn't on the critical path.

---

## Platform Agent Perspectives

Based on consultations with Kenya (iOS) and Data (Android):

- **Kenya's needs met**: Swift caseless enums with `Product*` namespacing. `unitType: logical` → `CGFloat`, `unitType: duration` → `TimeInterval`. ✓
- **Data's needs met**: Kotlin objects with `Dp`-typed vals. `unitType: logical` → `.dp`, `unitType: duration` → `Long` (ms). ✓
- **Sparky's needs met**: CSS custom properties with `--product-{category}-{name}` convention. ✓
- **All three**: Namespace separation (`Product*` vs `DesignTokens`) is critical. Handled correctly — product tokens served by Product MCP, not Application MCP.

---

## Suggestions for Governance Documentation

The referenced "Product token governance doc (new)" should include:

1. The litmus test (already in the outline — promote to the doc)
2. Worked examples for the color boundary (Q3)
3. Example rationales at the expected quality bar (Q2)
4. The promotion signal (two verticals independently defining the same need)
5. What NOT to tokenize — values that are truly one-off implementation details (canvas coordinates, animation physics constants, SVG filter parameters)

---

## Summary

| Item | Type | Priority |
|------|------|----------|
| Q1: Hyphen handling in category names | Clarification | Medium |
| Q2: Rationale quality examples | Documentation | Low (non-blocking) |
| Q3: Color governance worked examples | Documentation | Medium |
| Q4: Stale index warning differentiation | Implementation detail | Low |
| Q5: Author before tooling ships? | Process decision | **High** (blocks portfolio work) |

**Recommendation**: Proceed to implementation. Q1-4 are refinements addressable during implementation or in the governance doc. Q5 needs a team decision — my lean is "author now, query later."
