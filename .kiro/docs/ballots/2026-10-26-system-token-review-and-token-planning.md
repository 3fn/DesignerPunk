# Ballot Measure: human review binds system-token creation; product token needs are planned at screen specification and discussed before implementation

**Date**: 2026-10-26
**Drafted by**: Ada (Rosetta; owner of `governance/Token-Governance.md`, `governance/Product-Token-Governance.md` and the L59 record), at Peter's direction. Leonardo's consult (relayed by the orchestrator, verified by him at `main` `df56d0ebc`) is folded in: the Web-Authoring-Standards sites (§ 3, sites 5–6), his charter line (site 7), the two forks of § 8, the precise reach of the teeth (§ 4) and his counter-argument (§ 10).
**Peter's direction** (chat, 2026-10-26, relayed verbatim by the orchestrator; *unverified here: chat only, no committed record yet*): between 00:28:49Z and 00:36:20Z, *"We might refine it to 'creating system tokens needs human review' and 'product teams should surface and discuss token gaps during planning and before implementation'"* and, clarifying, *"I'm trying to imply it's better to identify what tokens will be needed before implementation starts so the token needs can be identified and discussed — rather than ad hoc."* At 00:38:29Z, on the shape the team recommended: *"Proceed as the team recommends."* This resolves the L59 record's fork toward (B), scoping, and adds a planning duty the record did not have. It does not answer F-A or F-B (§ 8), which Leonardo's consult found after the shape was recommended.
**Status**: **DRAFT** — records the measure. It ratifies nothing and applies nothing.
**Owners**: Ada (item 1's Token Governance site and item 2, Product-Token-Governance); Thurgood (item 1's Core Goals site, the register row, and the charter and profile acts of § 7). Each other site's owner is named at the site.
**Required reviewer**: **Stacy** (R1): census reader (README § "Conventions", "Instrument census"), confirmer and signer of Core Goals `#development-practices` (§ 7), reader of the edit-kind lines.
**Reviewers**: **Thurgood** (Core Goals owner and register steward; Product MCP owner, § 4), **Leonardo** (the product workflow and site 7; his R1 supplies site 7's wording and his read of F-A and F-B), **Lina** (owner of `governance/Web-Authoring-Standards.md`, sites 5–6), **Sparky** (sites 5–6 are his routed law; site 8), **Kenya** and **Data** (Product-Token-Governance binds them; site 8). **Peter** ratifies (site 1 edits Core Goals).
**Class**: LAW. It changes what governance requires: it narrows a creation rule stated as non-negotiable, and it adds a duty (plan token needs at specification; surface a missed need before it is filled) that no text requires today. A normative scope has no truth referent, so no item is a CORRECTION.
**Amends**: `.kiro/steering/core-goals.md` § "Development Practices" L59; `governance/Token-Governance.md` § "Token Creation Governance" L171–173; `governance/Product-Token-Governance.md` §§ "Scope Model" L36, "Authoring Workflow" L56–62, "System-First Value Selection" L72; `governance/Web-Authoring-Standards.md` L102, L239, L283. Follow-on sites: `canonical/agents/ada.md` L28 (the asserted string), `.cursor/rules/tokens.mdc` L20, `governance/classification-map.md` row `no-autonomous-token-creation` (`rule:` and one history entry), `canonical/agents/leonardo.md` L340, `canonical/agents/{sparky,kenya,data}.md` L329/L301/L304.
**Cap**: one Core Goals line; two Token Governance lines; four Product-Token-Governance hunks; three Web-Authoring-Standards lines; four charter lines; one assertion string; one `.cursor` row; one register `rule:` plus one history entry. **Retroactivity**: none. It binds from its application merge. Product tokens already authored are not re-judged.
**Base**: `main` at `a03b92f02` (#491, the token-selection ballot's application). Every before-text below is quoted from that tree. *Re-based 2026-10-26 from `70dfb1396`, where the measure was drafted: #491 merged before this PR opened. Its text moved none of this ballot's before-texts, and it moved these lines: Token-Governance L186–188 → L171–173 (§ "Token Creation Governance" was rewritten above them, and the Component Token Construction Rule now follows L173), `.cursor/rules/tokens.mdc` L23 → L20, Web-Authoring-Standards L281 → L283, and Ada's other asserted string L100 → L87. Core Goals L59, Product-Token-Governance L36/L56–62/L72, Web-Authoring-Standards L102/L239, the four charter lines, Ada's L28 and the register row's `rule:` (L242) keep their lines. Every amendment pointer's "prior text at" is now `a03b92f02`.*

> **Conflict of interest, stated first.** I filed the L59 record and picked (B) there; this ballot carries (B). It also narrows a rule whose enforcement row I own (`no-autonomous-token-creation`). Stacy's review and Peter's ruling are the checks.

---

## 1. The defect (quoted at `a03b92f02`)

Two rules that agents meet give opposite answers to "may a platform agent create a product token?" (record `.kiro/issues/2026-10-25-core-goals-l59-vs-product-token-authoring.md` § "What is wrong").

- `.kiro/steering/core-goals.md` L59 (always loaded; ships to consumers as `designerpunk-core-goals.md`): "- **Creating ANY token**: Always requires human review — no autonomous token creation".
- `governance/Token-Governance.md` L171–173: "**Creating ANY token (semantic, primitive, or component) requires human review.** … This is non-negotiable. Token creation is an architectural decision that affects the entire design system. AI agents should never autonomously create tokens."
- `governance/Product-Token-Governance.md` L60: "**Platform agents** (Sparky, Kenya, Data) may add product tokens during implementation when they discover needs not anticipated in the screen spec." There is no per-token human checkpoint; the review is the indexer (naming, `rationale` presence) and a later audit (L230).

Leonardo's consult found the same collision in the web law Sparky follows, and it is the stronger form:
- `governance/Web-Authoring-Standards.md` L102 (inside § "Hard Rules", embedded in Sparky's charter): "There is no step 4. If no system token exists, create a product token."
- L239: "… and no system token (semantic or primitive) covers it — create a product token immediately."
- L283 (found while drafting): "5. **Nothing exists** → Create it following the naming schema".

And four charter lines say "token" where the law, once scoped, says "system token":
- `canonical/agents/leonardo.md` L340 (Out of Scope): "- **Token creation or modification** — escalate to Ada via system feedback (through Thurgood)", while his § "Product Tokens" (L327–334) has him author product tokens.
- `canonical/agents/sparky.md` L329, `kenya.md` L301, `data.md` L304 (Out of Scope): "- **Token creation or modification** — escalate through Leonardo to Thurgood (who triages to Ada)", while Product-Token-Governance L60 lets them add product tokens. *(Found while drafting; Leonardo's search was for Web-Authoring-Standards' kind of text, and he found none for Kenya or Data.)*

Two more texts restate L59: `.cursor/rules/tokens.mdc` L20 ("| Creating ANY token | Always requires human review |") and the register row `no-autonomous-token-creation`'s `rule:` (`governance/classification-map.md` L242). Ada's charter asserts L171's sentence verbatim (`canonical/agents/ada.md` L28, `mustContain`).

**What the system already does.** The register row's armed barrier is 17 family suites under `src/tokens/__tests__/` and `src/tokens/semantic/__tests__/`: it watches system tokens only. Product tokens are checked by the Product MCP indexer (naming, `rationale`, `ref:` resolution). So the enforcement already draws the line this ballot writes into the text. And #489 (`70dfb1396`; record `.kiro/issues/2026-10-25-generate-passes-semantic-references-to-unemitted-primitives.md`) shows why a system token in a founder's copy is still architectural: a colour primitive added to the copy is not emitted on any platform (colour primitives are written from the package's palette), and `generate` now refuses the semantic that points at it. Adding a system token, even in a copy, is pipeline work and stays behind a human.

## 2. Item 1 — human review binds system tokens

**The definition, written once and used at every site.** A **system token** is one in the Rosetta token source: a primitive or semantic token under `src/tokens/`, or a component token declared with `defineComponentTokens()` (a component's `*.tokens.ts`). This holds in DesignerPunk's repo and in a product's copy of the source. A **product token** is one in the product layer, `product/tokens/*.yaml`, governed by Product-Token-Governance.

*(Correction to the brief's shape, which put component tokens "in `src/tokens/`": they are declared in `src/components/**/*.tokens.ts`, and a product points `componentTokens` in `designerpunk.config.ts` at its own directories (`src/config/defineConfig.ts` L44–45). `src/tokens/component/progress.ts` is the one component-token file under `src/tokens/`. The definition names the declaration, not the directory, so it is right in both repos.)*

### Site 1: `.kiro/steering/core-goals.md` L59 (Thurgood's file; Ada's text, Thurgood's review at R1)

**Before** (L59):
> - **Creating ANY token**: Always requires human review — no autonomous token creation

**After** (L59, one list item):
> - **Creating ANY system token**: Always requires human review — no autonomous token creation. A system token is one in the Rosetta token source (a primitive or semantic token under `src/tokens/`, or a component token declared with `defineComponentTokens()`), in DesignerPunk's repo or a product's copy. A product token (`product/tokens/`) is planned instead: its need is identified at screen specification and discussed before implementation (Product-Token-Governance § "Authoring Workflow"). *(Amended <ratification date> by ballot 2026-10-26-system-token-review-and-token-planning, item 1; prior text at `a03b92f02`.)*

The second and third sentences are a fold-back (§ 10): without them the always-loaded rule only narrows, and an agent that never pulls Product-Token-Governance meets the scoping and not the duty that replaces the review for product tokens. Thurgood may cut them to the pointer alone at R1; the scoping in the first sentence is what Peter directed.

### Site 2: `governance/Token-Governance.md` L171–173 (Ada's file and text)

**Before** (L171, L173):
> **Creating ANY token (semantic, primitive, or component) requires human review.**
>
> This is non-negotiable. Token creation is an architectural decision that affects the entire design system. AI agents should never autonomously create tokens.

**After** (L171 replaced by one paragraph; L173's last sentence scoped; the Component Token Construction Rule that #491 placed after L173 is unchanged):
> **Creating ANY system token (semantic, primitive, or component) requires human review.** A system token is one in the Rosetta token source: a primitive or semantic token under `src/tokens/`, or a component token declared with `defineComponentTokens()`, in DesignerPunk's repo or in a product's copy of the source. Product tokens (`product/tokens/*.yaml`) are governed by Product-Token-Governance: their needs are planned at screen specification and discussed before implementation, and the indexer checks their naming and rationale. *(Amended <ratification date> by ballot 2026-10-26-system-token-review-and-token-planning, item 1; prior text at `a03b92f02`.)*
>
> This is non-negotiable. Token creation is an architectural decision that affects the entire design system. AI agents should never autonomously create system tokens.

The heading `### Universal Rule: Human Review Required` is kept: no citation or route names it (git grep at `a03b92f02`: only the heading itself, its generated copies and frozen trio fixtures), and a rename would only cost a sweep.

### Site 2a: `canonical/agents/ada.md` L28 — the asserted string (Thurgood applies byte for byte; EXECUTION of this ballot)

- Before: `            - "Creating ANY token (semantic, primitive, or component) requires human review"`
- After: `            - "Creating ANY system token (semantic, primitive, or component) requires human review"`

**Bound to site 2 in one commit.** 122-canonical-vs-truth reads this string against L171. Either edit alone turns it red. The claim id `creation-requires-human-review` and its section are unchanged.

### Site 2b: `.cursor/rules/tokens.mdc` L20 (Ada's text; **needs the grant**, § 7; Ada applies)

- Before: `| Creating ANY token | Always requires human review |`
- After: `| Creating ANY system token | Always requires human review (product tokens: Product-Token-Governance) |`

### Site 2c: `governance/classification-map.md`, row `no-autonomous-token-creation` (EXECUTION of this ballot; Thurgood applies as register steward, Ada consulted as the row's owner)

- `rule:` before: `"Creating ANY token (primitive, semantic, or component) requires human review — no autonomous token creation"`
- `rule:` after: `"Creating ANY system token (primitive, semantic, or component) requires human review — no autonomous token creation"`
- One history entry: `- { date: <application date>, change: "EXECUTION (ballot 2026-10-26-system-token-review-and-token-planning § 12 step 5). rule: scoped to system tokens (the Rosetta token source: primitives and semantics under src/tokens/, component tokens declared with defineComponentTokens()); product tokens are governed by Product-Token-Governance. No checks, check_state or scope change: the armed barrier's 17 suites already watch only system-token families", by: thurgood }`
- `checks`, `check_state`, `scope[]` and `education` are unchanged. (#491 re-pointed this row's education citation by section, to Token-Governance § 'Token Creation Governance'; this edit touches other fields.)

## 3. Item 2 — product token needs are planned, and a missed need is surfaced before it is filled

The slots `⟦F-A⟧` and `⟦F-B⟧` are filled by Peter's answers to § 8. Everything outside a slot is the same under every answer. At ratification the Status commit appends the resolved after-texts (the precedent of the token-selection ballot's § 13).

### Site 3: `governance/Product-Token-Governance.md` § "Authoring Workflow" L56–62 (Ada's file and text)

**Before** (L56–62):
> ## Authoring Workflow
>
> **Leonardo** defines product tokens during screen specification. He identifies product-level values, names them, and documents their purpose. This is the primary authoring path.
>
> **Platform agents** (Sparky, Kenya, Data) may add product tokens during implementation when they discover needs not anticipated in the screen spec. They follow the same naming conventions and governance rules.
>
> **Naming authority**: The indexer validates naming mechanically (camelCase enforcement). Leonardo sets naming patterns for the vertical (e.g., "layout tokens use `content*` prefix for content-area constraints"), but enforcement is the indexer's job, not a human routing step.

**After**:
> ## Authoring Workflow
>
> **Token needs are planned before implementation.** A screen's token needs are identified while the screen is specified, so they can be discussed rather than decided ad hoc during the build. The screen spec names them: the system tokens each element uses, each product token the screen introduces, and each need no system token covers, either as a new product token or as a system gap. A system gap goes to Thurgood, who triages it to Ada; creating a system token needs human review (Token Governance § "Token Creation Governance"). ⟦F-B: who the needs are discussed with⟧ before implementation starts. *(Amended <ratification date> by ballot 2026-10-26-system-token-review-and-token-planning, item 2; prior text at `a03b92f02`.)*
>
> **Leonardo** defines product tokens during screen specification. He identifies product-level values, names them, and documents their purpose. This is the primary authoring path.
>
> **A need the spec missed.** Some needs only appear on a platform, such as a safe-area or system-bar inset, a focus-ring offset, or a density value. A platform agent (Sparky, Kenya, Data) that meets one surfaces it and has it discussed before it is filled. It is never filled first and left to a later audit. ⟦F-A: the escape hatch⟧ The need never becomes a hard-coded value, or a value under a node's `props:`, which no index reads. The prototype escape hatch (§ "System-First Value Selection", `# TODO: snap to system`) is the same rule at the design phase.
>
> **Naming authority**: The indexer validates naming mechanically (camelCase enforcement). Leonardo sets naming patterns for the vertical (e.g., "layout tokens use `content*` prefix for content-area constraints"), but enforcement is the indexer's job, not a human routing step.

The naming-authority paragraph is unchanged: it governs how a token is named, not whether it is planned.

### Site 4: `governance/Product-Token-Governance.md` L36 and L72 (Ada's file and text)

- **L36** before: `| **Product token** | One product vertical, any number of surfaces | Product team authors freely |`
- **L36** after: `| **Product token** | One product vertical, any number of surfaces | Product team authors, with no system review; needs planned at screen specification (§ "Authoring Workflow") |`
- **L72** before: `**Responsibility**: This rule applies at the *authoring* point — Leonardo during screen spec, platform agents when discovering new needs during implementation. Platform agents consuming generated CSS custom properties don't need to worry about ref vs value at consumption time. If Leonardo's spec already includes a `value:` token with rationale, platform agents trust that decision during implementation.`
- **L72** after: `**Responsibility**: This rule applies at the *authoring* point — Leonardo during screen spec, and a platform agent for a need the spec missed, under § "Authoring Workflow". Platform agents consuming generated CSS custom properties don't need to worry about ref vs value at consumption time. If Leonardo's spec already includes a `value:` token with rationale, platform agents trust that decision during implementation.`

L24 ("Deviation is welcome; deviation without communication is not") is unchanged: the duty is that principle, applied before the build.

### Site 5: `governance/Web-Authoring-Standards.md` L102 (Lina's file; filer text, Lina's at R1; Sparky consulted)

- Before: `There is no step 4. If no system token exists, create a product token.`
- After: `There is no step 4. If no system token exists, the value is a product token, never a hard-coded value. Use the one the screen spec names; a need the spec did not name is surfaced and discussed before it is filled (Product-Token-Governance § "Authoring Workflow"). *(Amended <ratification date> by ballot 2026-10-26-system-token-review-and-token-planning, item 2; prior text at `a03b92f02`.)*`

L102 sits inside § "Hard Rules", item 3; #491 rewrote L106 of the same item (the token-selection ballot's site 5). The hunks do not overlap.

### Site 6: `governance/Web-Authoring-Standards.md` L239 and L283 (Lina's file; filer text, Lina's at R1; Sparky consulted)

- **L239** before: `If you need a spacing, color, typography, motion, radius, border, shadow, z-index, or grid value and no system token (semantic or primitive) covers it — create a product token immediately.`
- **L239** after: `If you need a spacing, color, typography, motion, radius, border, shadow, z-index, or grid value and no system token (semantic or primitive) covers it, the value is a product token. Use the one the screen spec names. If the spec names none, surface the need before you build on it (Product-Token-Governance § "Authoring Workflow"): a product token is not added silently and left to an audit. *(Amended <ratification date> by ballot 2026-10-26-system-token-review-and-token-planning, item 2; prior text at `a03b92f02`.)*`
- **L283** before: `5. **Nothing exists** → Create it following the naming schema`
- **L283** after: `5. **Nothing exists** → If the screen spec names it, create it following the naming schema. If the spec does not, surface it first (Product-Token-Governance § "Authoring Workflow").`

L92 ("The value becomes a product token … There is no 'hard-code and move on' path") and L235 ("every value that isn't covered by a system token becomes a product token") classify the value and stay true; they are not edited.

These three after-texts are fork-invariant on purpose. They say "surfaced and discussed before it is filled"; under F-A (ii) a provisional token on the branch counts as not yet filled until the discussion keeps it (§ 8), and the Web-Authoring-Standards text points at Product-Token-Governance for the mechanism, so it carries no copy of the slot.

### Site 7: `canonical/agents/leonardo.md` L340 (Leonardo's text at R1; Thurgood applies byte for byte)

- Before: `- **Token creation or modification** — escalate to Ada via system feedback (through Thurgood)`
- After (filer's proposal; Leonardo's R1 replaces it): `- **System token creation or modification** — escalate to Ada via system feedback (through Thurgood). Product tokens are yours to author at screen specification (§ "Product Tokens" above)`

### Site 8: `canonical/agents/sparky.md` L329, `kenya.md` L301, `data.md` L304 (each seat's text at R1; Thurgood applies byte for byte)

- Before (all three): `- **Token creation or modification** — escalate through Leonardo to Thurgood (who triages to Ada)`
- After (filer's proposal, the same for all three; each seat's R1 replaces it): `- **System token creation or modification** — escalate through Leonardo to Thurgood (who triages to Ada). A product token the screen spec does not name: surface the need first (Product-Token-Governance § "Authoring Workflow")`

**Why these three are in, and the cost.** Today they read as "a platform agent never creates a token" while Product-Token-Governance L60 says it may, so the collision predates this ballot. Leaving them unedited would leave the platform seats with a charter that contradicts the scoped law under F-A (ii) and is unclear under (i), which has the platform agent author the token after the spec is amended. The cost is three more re-confirm and re-sign pairs (§ 7). Not editing them is a defensible narrower ballot. I did not make it a fork, because nothing changes what the law requires: it is cleanup of the same contradiction. A reviewer who wants them out moves them to a rule-10 record.

## 4. Item 3 — the teeth: what makes the planning duty checkable, and what does not

**Named as enforcement, not implemented here**: Thurgood's record `.kiro/issues/2026-10-25-product-mcp-screen-token-refs-unchecked.md` (trio row R3-16). Today `rebuild_product_index` indexes a screen spec whose `tokens:` values name tokens that do not exist, and returns `warnings: []` (`product-mcp-server/src/indexer/ProductIndexer.ts` L340–362 at `c543bc29f`). Its fix resolves each screen token reference against `token-index/` and the product's tokens, and warns on a miss. With it, the part of the planning sentence that a machine can see is checked at spec time: a token the spec names does exist, either in the system or as an authored product token.

**What it does not check** (Leonardo, precise): the duty itself. A spec with no `tokens:` blocks passes. A product token added mid-build and referenced correctly passes. R3-16 checks that the named tokens exist, not that the needs were named. No index check can catch a spec that enumerates faithfully and chooses wrong (§ 10).

**Follow-ups, outside this ballot:**
- **Leonardo's proposal**, for his revision of the Integration Guide's UI Tree Convention (his to author): an optional top-level `token-gaps:` list in the screen spec (new product tokens introduced for the screen; system gaps escalated; each `agreed` or `escalated`, with a pointer). He advises against a full token-needs section, which would duplicate `tokens:` and drift. It is his to bring; this ballot does not require it.
- **An implementation-time check** (a product token added in a unit whose screen spec neither references nor lists it): a rule-10 record, owner Thurgood (Product MCP), Leonardo and Ada consulted, filed at application. It is the check that would close what R3-16 leaves open.
- **For Thurgood, on R3-16's fixing PR**: `governance/DesignerPunk-Integration-Guide.md` L851 ("no normalization, no validation against the token registry") becomes false at that merge. Its correction rides that PR, not this ballot.

## 5. Not edited, and why

- `governance/Product-Token-Governance.md` L24, L68–70, L84, L230: L24 and L84 are the principle and the precedent the duty extends; L68 is asserted by Sparky's, Kenya's and Data's charters and stays outside every hunk; L230's audit stays as the rationale-quality check.
- `governance/Web-Authoring-Standards.md` L92, L235: classify the value; true under the duty (§ 3, site 6).
- `.kiro/steering/Agent-Directory.md` (Ada's "When to involve: Token creation or modification…"): it says when to involve Ada, and product-token promotion still involves her. Scoping it would re-sign the Agent-Directory unit for no reader-visible gain. Thurgood's call at R1; if he wants it, it joins site 1's re-sign window.
- `governance/Token-Governance.md` L179–220 (Creation Checkpoint Format, Decision Points, Decision Matrix) and the Component Token Construction Rule after L173: already about system tokens in substance (component / primitive / semantic). The scoped L186 covers them.
- `governance/Product-Handoff-Protocol.md` § "Tier 1: Quick Clarifications": F-A (i) uses it as written. It is not edited.
- `governance/DesignerPunk-Integration-Guide.md` L820, L851: § 4.
- `docs/collaboration.md` L71 (the Jekyll showcase page, "**Creating any token**: Always requires human review"): descriptive, not a governance path and not served to agents, and its L70 is stale on component tokens since #491 applied the token-selection ballot's F-1 (b). Its owner is not named in any standing scope. **A rule-10 record at application** (filed by Ada, owner to be named by Thurgood at R1), so one CONTENT CORRECTION fixes both lines once this ballot applies.
- `tests/onboarding-trio/**`, `scripts/__fixtures__/discovery-*.ts`: frozen evidence, not readers.
- `.claude/agents/**`, `.kiro/agents/**`, `canonical/_consumer-output/**`: generated; regenerated at application.
- Ledgers that quote L59 or the old L186 (the L59 record, the token-selection ballot, the 16.1.0 trio records): a dated append where one is owed, never a rewrite.

## 6. Census

Every edited governance file and charter is loaded by registered instruments (condition 1). No item names an instrument code change. Lines at `a03b92f02`:

Item 1:
- `**Census**: not in scope — check-section-citations (scripts/check-section-citations.ts; citing roots governance/, .kiro/steering/, canonical/) — site 1 adds one prose reference (Product-Token-Governance § "Authoring Workflow", an existing heading) and no get_section call; site 2 renames no heading ("Universal Rule: Human Review Required" and "Token Creation Governance" keep their text)`
- `**Census**: not in scope — 122-canonical-vs-truth (governanceAsLaw mustContain over the asserted sections) — the asserted string in Token-Governance L171 is inside site 2's hunk, and site 2a changes the assertion in canonical/agents/ada.md L28 to the after-text's substring in the same commit, so the verdict over the pair is PASS before and after; applied apart, the check is red, which is why § 12 binds them. No instrument code changes. Ada's other asserted string ("freely use semantic concept tokens", L87) is outside every hunk`
- `**Census**: not in scope — 122-sweep-1-refs (route resolution over canonical/agents/*.md) — no routed heading changes; Ada's token-governance routes and the ambient embed's two sections keep their headings`
- `**Census**: not in scope — 122-diff-guard (tools/agent-generator/diff-guard.ts) and verify-signing-chain --ci — no instrument change; the freshness sweep will report Core Goals #development-practices stale, and the rendered text of Ada's retained token-governance embed changes; these are § 7's owed acts and regeneration, not verdict changes of the instruments`
- `**Census**: not in scope — no-autonomous-token-creation (the 17 family-integrity suites in lane-functional-root, armed) — in scope by condition 2 only (education cites core-goals.md:55-59 and, since #491, Token-Governance.md § 'Token Creation Governance', both containing this item's hunks, and canonical/agents/ada.md, site 2a); the suites import token modules and read no doc, so no verdict can change; site 2c changes the row's rule: text and appends history, and no checks, check_state or census field`
- Site 2b (`.cursor/rules/tokens.mdc`): no registered instrument reads `.cursor/` and no row's education cites it; no line owed.

Item 2:
- `**Census**: not in scope — check-section-citations — sites 3–6 rename no heading and add no get_section call; the prose references they add name existing headings (Product-Token-Governance § "Authoring Workflow", § "System-First Value Selection"; Token Governance § "Token Creation Governance")`
- `**Census**: not in scope — 122-canonical-vs-truth — the product-token-governance pin in Sparky's, Kenya's and Data's charters (§ "System-First Value Selection", L68) and Sparky's web-authoring-standards pin (§ "Hard Rules", L34) are outside every hunk`
- `**Census**: not in scope — 122-sweep-1-refs — Leonardo's route product-token-authoring ("Authoring Workflow") and Sparky's route to "Product Token Authoring (Sparky)" keep their target headings`
- `**Census**: not in scope — 122-diff-guard / verify-signing-chain --ci — no instrument change; sites 7–8 stale four #out-of-scope units, and site 5 changes the rendered text of Sparky's retained web-authoring-standards#hard-rules embed; § 7's owed acts and regeneration`

## 7. Re-sign consequences, who acts, and the grant

The seat-object boundary holds as in the token-selection ballot § 6: operative-set items, overlay units and dispositions-row fields other than the signature are the profile author's (Thurgood's) acts; a seat's acts are its re-confirmation and its re-signature; a seat's own charter line is applied by Thurgood byte for byte from the seat's text.

| Signed / retained unit | Moves under | Acts |
|---|---|---|
| Core Goals `#development-practices` (`canonical/operative-sets/core-goals.yaml`, item `practice-14`, L95–98; consumer row `canonical/profiles/consumer/always-set/core-goals.dispositions.yaml` L9; overlay `always-set/core-goals.overlay.md` L42) | site 1 | Thurgood re-authors `practice-14` to site 1's text without its amendment parenthetical, re-renders the overlay unit, and adds one removal to the consumer row for the amendment pointer (the token-selection ballot's § 13.9 precedent): `{"text": " *(Amended <ratification date> by ballot 2026-10-26-system-token-review-and-token-planning, item 1; prior text at `a03b92f02`.)*", "cites": "subtraction-2"}`. Stacy re-confirms and re-signs. **Shared with the token-selection ballot's application** if both apply in one window (§ 9) |
| Leonardo `#out-of-scope` (`canonical/operative-sets/leonardo.yaml` L136–, item at L149–150; consumer row `leonardo.dispositions.yaml` L10; overlay `leonardo.overlay.md` L40) | site 7 | Thurgood applies L340, re-authors the item, re-renders the overlay unit. Leonardo re-confirms and re-signs |
| Sparky, Kenya, Data `#out-of-scope` (operative sets `sparky.yaml` L145–146, `kenya.yaml` L149–150, `data.yaml` L153–154; consumer rows and overlays L41/L52/L53) | site 8 | The same, per seat: Thurgood authors; Sparky, Kenya and Data each re-confirm and re-sign |
| Ada's retained `token-governance` embed (§ "Token Creation Governance") | site 2 | Regeneration only, no act (a retained embed carries no signature) |
| Sparky's retained `web-authoring-standards#hard-rules` embed | site 5 | Regeneration only, no act |

**Grant paths** (activated by ratification; the application PR's body names them): **Ada** — `governance/Token-Governance.md` L171–173, `governance/Product-Token-Governance.md` L36, L56–62, L72, `.cursor/rules/tokens.mdc` L20. **Lina** — `governance/Web-Authoring-Standards.md` L102, L239, L283. **Thurgood** — `.kiro/steering/core-goals.md` L59; `governance/classification-map.md`, row `no-autonomous-token-creation`, `rule:` and `history` only; `canonical/agents/ada.md` L28, `canonical/agents/leonardo.md` L340, `canonical/agents/{sparky,kenya,data}.md` the § 1 lines, each byte for byte from § 14; `canonical/operative-sets/{core-goals,leonardo,sparky,kenya,data}.yaml` the § 7 items; `canonical/profiles/consumer/always-set/core-goals.{dispositions.yaml,overlay.md}` and `canonical/profiles/consumer/{leonardo,sparky,kenya,data}.{dispositions.yaml,overlay.md}` the `#out-of-scope` rows and units. **Each seat named in § 7** — its own signature fields and confirmation sheet section. **The generator run** — the generated roots and `canonical/generated.lock`.

## 8. Forks for Peter (none is picked here)

Both came from Leonardo's consult, after the shape Peter accepted was recommended. Each changes what a platform agent does when the spec missed a need, so neither is wording.

**Open for Peter**: **F-A — the escape hatch's shape** (fills `⟦F-A⟧` in site 3).
- **(i) Stop and ask, per value.** The platform agent stops on that value and raises it with Leonardo as a Tier 1 clarification (Product-Handoff-Protocol § "Tier 1: Quick Clarifications"): the need, the system tokens it checked (semantic first), and a proposed name with its `ref:` or `value:` and rationale. Leonardo resolves it one of three ways: the spec is amended to name an existing token; the spec is amended to name a new product token, which the platform agent then authors; or it is a system gap, routed to Thurgood and Ada, where creating the token needs human review under scoped L59. The platform agent records the outcome in its Implementation Report under "Decisions Made During Implementation". *Keeps*: Peter's "discussed before" literally; every product token is named in a spec. *Costs* (Leonardo): one blocking relay per gap, through Peter when agents run in separate sessions. *Risk* (Leonardo): agents route around the stop with hard-coded values or values in `props:`, which no index reads and which are less visible than a filled product token.
- **(ii) Provisional, but not mergeable.** The platform agent writes the token on the unit branch, provisionally, under the naming and rationale rules, and raises it in the same session with the same content as (i). The unit's PR does not merge until the need is discussed and the outcome is recorded in the Implementation Report and the PR body; the spec is amended to name a kept token, and a rejected one is removed before the merge. *Keeps*: the build moves; the discussion still happens before the token reaches `main`. *Costs*: it is filled before it is discussed, which is closer to the "ad hoc" Peter named; nothing mechanical blocks the merge (there is no `status` field in the product-token schema, and a product repo may have no PR gate). Leonardo: "add with a flagged status" is filled-and-audited-later under another name.
- **(iii) Split by kind.** (i) for colour tokens (already under the two-gate rule) and for suspected system gaps; (ii) for other families. This is how I read Leonardo's lean ("(i) for colours and system gaps"); he has not stated (iii) as his pick. *Costs*: two paths in one workflow; the split rests on the agent's judgment of "suspected system gap".

**Open for Peter**: **F-B — "discussed" with whom** (fills `⟦F-B⟧` in site 3, and the partner in F-A).
- **(a) Leonardo with the platform agents.** The product architect is the discussion partner at spec time and for missed needs. *Costs*: once L59 is scoped, no human sees a product token unless an audit does; an agent-to-agent discussion is the only check on a `value:` token's rationale.
- **(b) The product's human lead** (Peter in this repo; the founder in a product repo), through Leonardo. *Keeps*: the one human contact point the scoping would otherwise remove. *Costs*: human time on every screen spec's token list, and under F-A (i) on every missed need.
- **(c) Human at spec time, Leonardo for missed needs**, with colour tokens and system gaps reaching the human in both. *Keeps*: one human read per screen, at the point Peter's direction names, and keeps implementation-time gaps fast. *Costs*: a product token found mid-build and agreed with Leonardo still reaches no human. *Unverified*: whether a screen spec gets a human read today; if it already does, (c) adds little cost.

**What each preserves of Peter's direction**, for his reading: "identified and discussed before implementation" is met at spec time by every F-B option; "rather than ad hoc" is met for missed needs most literally by F-A (i), least by (ii). "Discussed" names no partner, so F-B is open in his words. Leonardo leans F-A (i) for colours and system gaps; I state no pick.

## 9. Sequencing

1. **This PR files the DRAFT.** Its merge records the measure.
2. **R1**: Stacy (required), Thurgood, Leonardo (site 7's wording; F-A and F-B reads), Lina (sites 5–6), Sparky, Kenya, Data (site 8, and their read of F-A). The author incorporates; a bytes-only R2 if R1 changes text.
3. **Peter ratifies** with F-A and F-B; the receiving session commits the Status line first, with the README roll entry and § 14's resolved after-texts in the same commit.
4. **One application PR**, Peter-merged, in § 12's order.
5. **Its own application PR, after 16.1.0's S.** The token-selection ballot's application merged as #491 (`a03b92f02`, 2026-10-26) before this PR opened, so there is no shared window: #491 re-confirmed and re-signed Core Goals `#development-practices` once tonight, and this ballot's application re-signs it once more (Stacy), with its own regeneration and lock refresh. Its hunks do not overlap #491's (Core Goals L58/L61 against L59; Token Governance's moved § "Token Creation Governance" against L171–173; `.cursor` L19 against L20; the register row's `education` against its `rule:`).
6. **Not on the 16.1.0 path.** The L59 record is P2 with `release:next:phase-1`; this ballot does not hold S. Its application opens after S, at whatever base `main` then has, and § 12 step 2 re-checks every before-text there.

## 10. Counter-argument (after fold-back)

**Run against the whole ballot**: scoping L59 removes the only always-loaded human-review sentence that reaches product tokens, and nothing replaces it where agents read it. *Folded*: site 1 carries the planning duty into Core Goals itself, so the always-loaded line now says what governs product tokens instead of only narrowing; site 3 forbids the two workarounds Leonardo predicts (hard-coded values and `props:` values); F-B puts the question of a human contact point to Peter explicitly.

**Run against item 2 (Leonardo's)**: under True Native many needs cannot be known at spec time (safe areas, system-bar insets, focus-ring offsets, density); the platform agents know them better than the architect; a blocking relay per gap costs Peter and invites workarounds less visible than a filled product token, against Product-Token-Governance L24, "Deviation is welcome; deviation without communication is not". *Folded*: site 3 names those platform-only needs and keeps a path for them; the prototype hatch (L84) is cited as the model; F-A offers (ii) and (iii) for exactly this cost.

**What survives**:
1. **Tightening on principle.** Nobody has shown harm from a product token added mid-build under audit. The duty is justified by Peter's direction and by the L59 contradiction, not by an observed failure. If no gap discussion ever changes a token, the duty is cost with no yield, and nothing in this ballot measures that.
2. **A faithful plan can still be wrong.** A spec can enumerate its needs faithfully and still choose the wrong token, value or tier. R3-16 checks existence, and no index check catches a wrong choice; only the discussion can, which is why F-B matters.
3. **The teeth are partial.** R3-16 makes "the spec's named tokens exist" checkable, not "the spec named its needs" (§ 4). Until the implementation-time check exists, a mid-build product token that bypasses the duty and is referenced correctly passes every check.
4. **The narrowing is real.** "Non-negotiable" now covers fewer tokens. Under F-B (a), a `value:` product token with a thin rationale is a new design value created with no human in the loop, caught only if the audit reads it (the residual the L59 record named against (B)).
5. **Leonardo's cost survives under F-A (i)**: one blocking relay per missed need, and the workaround risk is reduced by site 3's ban, not removed; a ban is education, and no check sees a hard-coded value in a screen (the `no-hardcoded-color` row's assertions cover components, not screens).

## 11. Cost

- Drafting: this PR. R1: seven readers, the platform seats' reads short (one line each, plus F-A).
- Application: about half a day elapsed. Two Core Goals / Token Governance lines, four Product-Token-Governance hunks, three Web-Authoring-Standards lines, five charter lines, one `.cursor` row, one register row; re-sign pairs for Core Goals (Stacy), Leonardo, Sparky, Kenya and Data (five); one regeneration, the lock refresh, `rebuild_index`. Core Goals' re-sign is its second in two days (after #491).
- Peter: F-A, F-B; ratify; merge two PRs.

## 12. Application (on ratification, one PR, Peter-merged)

1. **The Status commit** (record-first), before any edit site: Status → `RATIFIED (Peter, <date>)` with the F-A and F-B answers; `<ratification date>` filled in every pointer and in § 7's removal; the README roll entry; and `## 14. Resolved after-texts`, each site exactly as it will be applied, with every slot resolved and the seats' R1 texts for sites 5, 6, 7 and 8.
2. Branch `chore/system-token-review-and-token-planning`, cut from `main` after 16.1.0's S (§ 9). Stop on any before-text that does not match, and report: `git diff --quiet a03b92f02 <base> -- .kiro/steering/core-goals.md governance/Token-Governance.md governance/Product-Token-Governance.md governance/Web-Authoring-Standards.md canonical/agents/ada.md canonical/agents/leonardo.md canonical/agents/sparky.md canonical/agents/kenya.md canonical/agents/data.md .cursor/rules/tokens.mdc` first. A non-empty diff is read hunk by hunk: re-quote the lines that moved, and stop on any before-text that changed.
3. PR body: `**Edit kind**: <path> — LAW (.kiro/docs/ballots/2026-10-26-system-token-review-and-token-planning.md)` for `.kiro/steering/core-goals.md`, `governance/Token-Governance.md`, `governance/Product-Token-Governance.md`, `governance/Web-Authoring-Standards.md`, and the prose of `canonical/agents/{leonardo,sparky,kenya,data}.md`; `— EXECUTION (ballot 2026-10-26-system-token-review-and-token-planning § 2 site 2a)` for `canonical/agents/ada.md`; `— EXECUTION (… § 12 step 5)` for `governance/classification-map.md`. `**Consulted**:` Stacy, Thurgood, Leonardo, Lina, Sparky, Kenya, Data.
4. **Authoring**, under the grant: Ada applies sites 2, 2b, 3 and 4; **sites 2 and 2a land in one commit** (§ 6); Lina applies sites 5 and 6; Thurgood applies site 1, sites 2a, 8 and 9 byte for byte from § 14, and § 7's items, overlay units and row fields. Each commit under its author's `Agent:` trailer, the trailer in the final paragraph.
5. **Register** (EXECUTION of this step): Thurgood applies site 2c, Ada consulted.
6. **Straggler sweep**, before the regeneration: `git grep -n -i -E "Creating ANY token|create a product token immediately|may add product tokens during implementation|If no system token exists, create a product token|\*\*Token creation or modification\*\*" -- . ':!.kiro/specs' ':!.kiro/issues' ':!.kiro/docs' ':!.claude' ':!.kiro/agents' ':!canonical/_consumer-output' ':!tests/onboarding-trio'`. **Expected hits, and only these**: ledgers under `canonical/profiles/consumer/confirmations/` that quote superseded text, if any (none at `a03b92f02`); `tools/agent-generator/__tests__/canonical-vs-truth.test.ts` L159 (a fake-corpus fixture, not a reader); `docs/collaboration.md` L71 (§ 5); `scripts/__fixtures__/discovery-*` if any (frozen). Any other hit stops the application and is reported.
7. **Regeneration**: `npm run build:generator`; commit the generated roots. Re-run step 6 without the generated-root exclusions: no new hit.
8. **Seat acts**, against the committed rendering: Stacy (Core Goals `#development-practices`), Leonardo, Sparky, Kenya and Data (`#out-of-scope`), each re-confirming and re-signing in its own commit under its own `Agent:` trailer.
9. **Lock refresh**: a second `npm run build:generator`; every output byte-identical; commit `canonical/generated.lock` only. A changed output stops the application.
10. Checks: `npm run -s check:122:diff-guard` (with `verify-signing-chain --ci`); `npm run -s check:section-citations`; `node scripts/validate-steering-metadata.js`; `npm test`; docs MCP `rebuild_index` (Token-Governance, Product-Token-Governance, Web-Authoring-Standards and the register are served).
11. Close `.kiro/issues/2026-10-25-core-goals-l59-vs-product-token-authoring.md` by a dated outcome line in the application PR (Ada); file § 4's implementation-time-check record (Thurgood) and § 5's `docs/collaboration.md` record (Ada).

## 13. Review record

### [ADA R0] — filing (2026-10-26)

- Drafted from the shape Peter accepted (chat, 2026-10-26, 00:38:29Z, relayed) and Leonardo's consult (relayed by the orchestrator, verified by him at `df56d0ebc`). Folded from his consult: sites 5–6 (L102, L239; L281 added while drafting), site 7, F-A and F-B, § 4's precise reach and follow-ups, and his counter-argument (§ 10). Added while drafting: site 8 (the three platform charter lines), site 2a (the asserted string, which otherwise reds 122-canonical-vs-truth), site 2b, site 2c, and site 4.
- Corrected the brief's definition of system tokens (component tokens are declared in `*.tokens.ts`, not only under `src/tokens/`; § 2).
- [@LEONARDO] Site 7's wording; your read of F-A and F-B as drafted; whether (iii) is a fair statement of your lean. → § 3 site 7; § 8 -- [ADA R0]
- [@THURGOOD] Site 1's second and third sentences (keep, or the pointer alone?); site 2c; Agent-Directory (§ 5); and whether § 4's implementation-time-check record is yours. → § 2 site 1; § 5; § 4 -- [ADA R0]
- [@STACY] The 122-canonical-vs-truth census line for site 2 (an asserted string inside the hunk, changed with its assertion in one commit; my call is not in scope). → § 6 -- [ADA R0]
- [@LINA] Sites 5–6 are your file; replace the filer text or confirm. → § 3 sites 5–6 -- [ADA R0]
- [@SPARKY] [@KENYA] [@DATA] Site 8's line for your charter; and F-A from the implementing side. → § 3 site 8; § 8 -- [ADA R0]

### [ADA R0] — re-base (2026-10-26)

- #491 (`a03b92f02`) applied the token-selection ballot before this PR opened. I merged `origin/main` into this branch and re-quoted every before-text at `a03b92f02`. None changed text. These lines moved: Token-Governance L186–188 → L171–173, `.cursor` L23 → L20, Web-Authoring-Standards L281 → L283, and Ada's other asserted string L100 → L87. The census lines and the grant paths are re-cited to match (header "Base"). § 9 is rewritten: there is no shared window, this ballot's application is its own PR after 16.1.0's S, and it re-signs Core Goals `#development-practices` once more. The § 12 straggler sweep was re-run at `a03b92f02`, and its hits are the enumerated sites plus the expected hits.
