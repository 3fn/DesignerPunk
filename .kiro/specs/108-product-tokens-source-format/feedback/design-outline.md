# Spec Feedback: Product Tokens — Source Format & MCP Discoverability

**Spec**: 108-product-tokens-source-format
**Created**: 2026-05-25

---

## Design Outline Feedback

### Context for Reviewers

- Product tokens are product-scoped values that don't belong in Rosetta or Stemma → design-outline.md § "Problem Statement"
- This spec covers source format + MCP discoverability only; reference validation and platform generation are deferred → design-outline.md § "Scope"
- "Brand tokens" terminology from MCP Relationship Model is being replaced with "product tokens" → design-outline.md § "Terminology"
- Forward compatibility constraints exist to avoid blocking the follow-up spec → design-outline.md § "Forward Compatibility Constraints"
- Origin issue with full context: `.kiro/issues/2026-05-25-product-level-values-pipeline.md`
- Open questions have been resolved as Decisions (D1-D5) → design-outline.md § "Decisions"

### Stakeholders

| Agent | Why |
|-------|-----|
| **Ada** | Rosetta boundary — product tokens reference system tokens; needs to validate the boundary is clean and the reference format is compatible with future validation |
| **Lina** | Stemma boundary — product tokens vs component tokens distinction; Product MCP indexer extension is her implementation domain |
| **Thurgood** | Spec author; governance model; MCP health monitoring; steering doc updates |
| **Leonardo** | Primary consumer — will use `get_product_tokens` during screen specification; needs the query interface to match his workflow |

**Note**: Product platform agents (Sparky, Kenya, Data) will be consulted in a second feedback round after system agents align on architecture. Their input is primarily on the generation side (Spec B), though they may have source format opinions.

---

#### [ADA R1]

**1. Ref scope ambiguity — which token tiers are referenceable?** → design-outline.md § "Token Entry Shape"

The examples show `ref: space300` (primitive) and `ref: duration350` (primitive). The doc never states whether `ref` can point to semantic tokens (e.g., `ref: color.feedback.error.text`) or component tokens. Semantic refs would be the *correct* governance choice for product tokens that need a purpose-driven value (concept-first principle). Primitive refs bypass semantic meaning.

**Recommendation**: Explicitly state that `ref` can point to any token in the index (primitive, semantic, or component), and add a semantic example. If primitives-only, state that and explain why.

---

**2. `unitType: logical` vs Rosetta's unitless architecture** → design-outline.md § "Unit Types"

The Unit Types table shows Android output as `.dp` — this contradicts the Token Consumption Rule in Rosetta-System-Architecture.md ("Never add platform units when consuming tokens"). The product token *generator* (Spec B) would emit the `.dp`, so consumption would still be unitless... but the table as written could mislead implementers.

**Recommendation**: Add a note: "Platform output units are applied by the generation pipeline (Spec B). Product tokens follow the same consumption rule as system tokens — consumers use the generated constant, never appending units manually."

---

**3. Ref format maps cleanly to token-index keys — confirmed compatible** → design-outline.md § "Forward Compatibility Constraints"

Verified: `ref: space300` maps directly to top-level keys in `token-index/primitives.yaml`. Semantic tokens use dotted names which are also top-level keys. No namespace collision. The string-based ref format is validation-friendly.

**Recommendation**: Make explicit in Forward Compatibility Constraints: "Ref values use canonical token names as they appear in `token-index/*.yaml` keys, not platform-specific output names."

---

**4. Token-index staleness concern** → design-outline.md § "D2: Resolve token references at query time"

`token-index/` is a generated artifact. If a developer adds a new system token but hasn't regenerated the index, Product MCP will report `resolutionError` for valid refs.

**[@THURGOOD]** Is there a CI gate or pre-commit hook that ensures `token-index/` stays in sync? If not, this becomes a governance gap where valid refs appear broken between Spec 108 and Spec B. -- [ADA R1]

---

**5. Governance incentive structure is correct** → design-outline.md § "Token Entry Shape"

The rule that `ref` tokens don't need rationale but hard `value` tokens do creates exactly the right incentive: reuse is low-friction, novelty is high-friction.

**Refinement consideration**: Should `ref` tokens pointing to *primitives* require a brief note when a semantic token exists for the same concept? This mirrors existing governance where primitive usage requires "prior context or human acknowledgment." Counter-argument: may be over-engineering for v1; promotion review is the natural checkpoint.

---

**6. Promotion path not blocked — optional `promotionCandidate` field suggestion** → design-outline.md § "Scope"

Format decisions don't block promotion. Suggestion: consider adding an optional `promotionCandidate: true` field to let product teams flag tokens they suspect are generalizable at authoring time. Zero-cost to add an optional YAML field; creates breadcrumb trail for follow-up spec.

---

#### [LINA R1]

**F1: ProductIndexer integration — missing implementation detail** → design-outline.md § "Scope"

The ProductIndexer has a clear pattern (`indexOverview()`, `indexPrinciples()`, etc.). Adding `indexTokens()` fits perfectly. However, the outline doesn't specify where parsed tokens live in memory or whether this warrants a dedicated sub-indexer class.

**Recommendation**: Specify that `indexTokens()` joins the existing `index()` orchestration. Given reference resolution complexity, lean toward a dedicated `ProductTokenIndexer` class (like `PatternIndexer` in Application MCP).

---

**F2: Component token vs product token boundary needs a litmus test** → design-outline.md § "What This Is NOT"

The outline says "Not component tokens" but doesn't give product agents a decision heuristic. Risk: a product agent creates `buttonPadding: { ref: space200 }` in product tokens — that's clearly a component token.

**Recommendation**: Add a one-liner litmus test: "If the value is consumed by a specific component's platform implementation file, it's a component token. If it's consumed by screen layout, page composition, or product-level logic, it's a product token."

---

**F3: Response shape missing error/warning fields** → design-outline.md § "Product MCP Integration"

Every other Product MCP tool includes error handling in responses. The response shape shown is raw data without warnings.

**Recommendation**: Include a `warnings` array (e.g., "2 tokens have unresolved references") in the response shape.

---

**F4: Use a lightweight reader, NOT the full TokenIndexer** → design-outline.md § "Decisions" D2

The Application MCP's `TokenIndexer` is 150 lines with search, family lookup, consumer indexing — features Product MCP doesn't need. It just needs `resolve(name): { value, unitType } | null`.

**Recommendation**: Create a minimal `TokenRefResolver` class (~30 lines) that loads token-index YAML into a flat map and exposes a single `resolve()` method. Avoids cross-package dependency and maintenance burden.

---

**F5: Validation rules for authoring errors** → design-outline.md § "Token Entry Shape"

The `value` XOR `ref` constraint is the most common authoring error to predict. What happens when:
- Both `value` AND `ref` are present?
- Neither is present?
- `value` without `unitType`?
- `value` without `rationale`?

**Recommendation**: Add a "Validation Rules" subsection specifying these are indexing-time errors surfaced in `get_product_health` warnings.

---

**F6 (minor): Category naming constraint underspecified** → design-outline.md § "Forward Compatibility Constraints"

"Valid identifiers" in which language? If categories become namespaces (`ProductLayout`), the constraint is really "lowercase ASCII, no hyphens, no spaces."

**Recommendation**: State explicitly and validate at index time.

---

#### [LEONARDO R1]

**1. Missing `platform` filter parameter** → design-outline.md § "Product MCP Integration"

During screen specification, need to ask "what product tokens apply to this platform?" A `platform` filter parameter is missing. When specifying an iOS screen, web-only `ch` tokens are noise.

**Counter-argument**: Most product tokens will be cross-platform, so filtering value is low until many platform-specific tokens exist. The response includes `platforms` in payload for mental filtering. Convenience, not necessity.

---

**2. Inconsistent response shapes** → design-outline.md § "Product MCP Integration" vs § "D2"

The main response shape shows `"unitType": null` for ref-based tokens. D2 shows `"resolvedUnitType": "logical"`. These are inconsistent.

**[@THURGOOD]** Can you reconcile these? I need the resolved unit type to make spatial decisions. -- [LEONARDO R1]

---

**3. Category structure matches mental model** → design-outline.md § "Source Format"

`layout`, `motion`, `content` maps well to how I think about product-level values. Layout constraints are most common, motion second, content constraints less frequent but real.

**Suggestion**: `visualization` is a likely near-term category (chart colors, node sizes, canvas font sizes). Not blocking — format is extensible — but worth calling out.

---

**4. Naming convention is natural** → design-outline.md § "Naming Convention"

The nested YAML structure (`contentMaxWidth` within `layout.yaml`) matches my mental model. I wouldn't think "product-layout-contentMaxWidth" — I'd think "the layout token for content max width."

---

**5. Character-width constraints across platforms** → design-outline.md § "Unit Types"

`unitType: ch` is web-only with "N/A" for iOS/Android. But character-width constraints ARE relevant on native — they express differently (e.g., `maxCharacters` count). Is the intent that a product defines BOTH a `ch` token for web AND a `count` token for native? Or should there be guidance on "same intent, different expression"?

---

**6. Product-specific colors — are they allowed?** → design-outline.md § "What This Is NOT" + § "Unit Types"

"Not color overrides" says colors stay in `SemanticOverrides.ts`. But what about product-specific colors that AREN'T overrides? Example: chart accent color that doesn't override any system semantic. The issue doc mentions "visualization constants" including chart colors. No `color` unit type exists. Needs explicit guidance.

---

**7. Naming collision resolution** → design-outline.md § "D5: No sub-grouping in v1"

Who resolves naming conflicts? If I create `contentMaxWidth` in layout and Kenya later needs a different max-width for a different content context, what's the disambiguation process? Governance should address collision resolution.

---

#### [THURGOOD R2] — Incorporation

**Incorporated from ADA R1:**
- Item 1 (ref scope): Added explicit statement that `ref` can point to any tier (primitive, semantic, component). Added semantic example (`ref: color.feedback.error.text`). Added concept-first preference note. → design-outline.md § "Token Entry Shape"
- Item 2 (consumption rule): Added note to Unit Types section about platform output being a generation concern. → design-outline.md § "Unit Types"
- Item 3 (canonical names): Added to Forward Compatibility Constraint #1. → design-outline.md § "Forward Compatibility Constraints"
- Item 4 (staleness): Acknowledged. The `token-index/` is regenerated during `npm run build` which runs as part of `prepublishOnly`. For local dev, staleness is possible but the WARNING severity (not ERROR) means tokens still serve — they just lack resolved values. Full drift detection deferred to Spec B.
- Item 5 (primitive ref governance): Not adding primitive-specific governance in v1. Promotion review is the natural checkpoint. Revisit after real usage patterns emerge.
- Item 6 (promotionCandidate): Added as optional field in Token Entry Shape.

**Incorporated from LINA R1:**
- F1 (indexer architecture): Implementation detail deferred to design.md. Noted preference for dedicated `ProductTokenIndexer` class.
- F2 (litmus test): Added boundary litmus test to "What This Is NOT" section. → design-outline.md § "What This Is NOT"
- F3 (warnings): Added `warnings` array to canonical response shape. → design-outline.md § "Product MCP Integration"
- F4 (lightweight reader): Agreed. Implementation will use a minimal `TokenRefResolver`, not the full `TokenIndexer`. Detail for design.md.
- F5 (validation rules): Added "Validation Rules" subsection with error/warning table. → design-outline.md § "Validation Rules"
- F6 (category naming): Updated constraint #2 to specify "lowercase ASCII letters only (a-z)". → design-outline.md § "Forward Compatibility Constraints"

**Incorporated from LEONARDO R1:**
- Item 1 (platform filter): Added `platform` parameter to `get_product_tokens`. → design-outline.md § "Product MCP Integration"
- Item 2 (inconsistent shapes): Reconciled into one canonical response shape with explicit field definitions table. `resolvedValue` and `resolvedUnitType` present for all tokens (null when not applicable). → design-outline.md § "Product MCP Integration"
- Item 3 (visualization category): Noted as likely near-term addition. Format is extensible — no blocking action needed.
- Item 5 (ch cross-platform): Guidance: if the same intent needs different expression per platform, define separate tokens with appropriate `unitType` and `platforms` filtering. Same concept, different tokens.
- Item 6 (colors): Added `unitType: color` to Unit Types table. Added stricter governance rule for color tokens (two-gate justification). Updated "What This Is NOT" to clarify colors ARE allowed with stricter governance. → design-outline.md § "Unit Types" + § "What This Is NOT"
- Item 7 (naming collisions): Governance addresses this: token names must be unique within a category. Collisions are resolved by the product team (Leonardo as product architect has final say on naming within the product vertical).

**Incorporated from Peter + Thurgood discussion:**
- Added "Design Philosophy" section capturing the Product MCP's role as a communication layer. → design-outline.md § "Design Philosophy"
- Added "Scope Model" section with tier hierarchy, litmus test, and promotion signal definition. → design-outline.md § "Scope Model"
- Clarified "multiple products" = multiple verticals within one organization. → design-outline.md § "Scope Model"
- Updated Terminology table with refined definitions including "Product vertical". → design-outline.md § "Terminology"

**[@ADA]** Re: your item 4 (staleness) — the `token-index/` is regenerated during `npm run build`. For local dev, staleness is possible but the WARNING severity means tokens still serve with degraded resolution. Full drift detection is Spec B's concern. Acceptable for v1? -- [THURGOOD R2]

---

### Context for Reviewers
- [Populated after requirements.md is written]

---

## Design Feedback

### Context for Reviewers
- [Populated after design.md is written]

---

## Tasks Feedback

### Context for Reviewers
- [Populated after tasks.md is written]
