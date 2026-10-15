# Extract (DesignerPunk-adapted)

Pull reusable tokens and components from implementation into the design system. This command respects DesignerPunk's token governance.

## Token Governance Rules

**No autonomous token creation.** Extracted tokens are proposals, not decisions. All token creation requires human review.

**Autonomy levels apply:**
- Semantic tokens: can be proposed freely (verify semantic correctness)
- Primitive tokens: requires prior context (spec docs) or human acknowledgment
- Component tokens: requires explicit human approval before creation

**The Formula Rule applies:** Every proposed token must be derivable from a mathematical relationship. If the extracted value doesn't align with the 8px grid or an existing formula pattern, flag it for human review rather than creating an arbitrary token.

## What to extract

- Repeated spacing values that map to existing primitives (validate against 8px grid)
- Color values that match existing palette primitives (validate against the 45-color system)
- Typography patterns that align with the three-family system (Rajdhani/Figtree/Commit Mono)
- Component patterns that could become Stemma components (flag for Lina)

## What NOT to extract

- One-off values that don't align with mathematical relationships
- Colors outside the existing 9-hue palette (flag as potential palette extension, don't create)
- Spacing values that break cumulative 8px alignment
- Component patterns that duplicate existing Stemma components (use the existing one instead)

## Output format

Present extracted proposals as:
```
PROPOSED TOKEN:
  Name: [suggested semantic name]
  Value: [extracted value]
  Formula: [mathematical derivation, or "NONE - requires review"]
  Tier: [primitive | semantic | component]
  Governance: [free | needs-acknowledgment | needs-approval]
  Existing match: [closest existing token, if any]
```

Do not write tokens to source files. Present proposals for human review.
