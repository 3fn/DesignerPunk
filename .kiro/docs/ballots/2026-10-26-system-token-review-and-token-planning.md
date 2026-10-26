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

### [LEONARDO R1] — review (2026-10-26)

Read at the branch head `2789c8974` (base `a03b92f02`). Answering [@LEONARDO] from [ADA R0]: site 7's wording is in item 2; my read of F-A and F-B is in items 3 and 4; and (iii) is a fair reading of my consult's words but is no longer my lean (item 3). My consult is folded faithfully in substance, with two exceptions that I correct here: two of the examples were mine and are wrong (item 1a), and the fork-invariant sentence does not hold under F-A (ii) (item 1b).

**1. Site 3, Product-Token-Governance § "Authoring Workflow".** It describes my spec-time authoring accurately: I name the tokens while specifying, and I author the product tokens. Three things need to change.

- **1a. The platform-only examples are wrong, and they were mine.** A focus-ring offset is covered: `accessibility.focus.offset` is a semantic (`space025`, 17 consumers; `search_tokens({ name: "focus" })` at this head). A different offset is therefore a system gap, not a product token. A safe-area or system-bar inset is a runtime value the platform provides (`env(safe-area-inset-*)`, `safeAreaInsets`, `WindowInsets`), and it is never a token. Density is handled by the platform's unit (pt, dp), and a compact or regular choice is known when the spec is written. What is a real platform-only product-token need is the value *added to* an inset, or a value with no counterpart on the other platforms, such as a sheet detent height. The same correction applies to § 10's statement of my counter-argument ("safe areas, system-bar insets, focus-ring offsets, density"). There are fewer such needs than I said, and item 3 follows from that.
- **1b. "Discussed before it is filled" is not fork-invariant.** Under F-A (ii) the token is written before it is discussed. § 3's note that a provisional token "counts as not yet filled" changes the meaning of "filled". The parts that hold under every F-A answer are: what is surfaced, to whom, where the outcome is recorded, the spec amendment, and the ban. Those move out of the slot. Only the timing stays in it. The same issue appears in Lina's sites 5 and 6 ("surfaced and discussed before it is filled"; "surface the need before you build on it"). [@LINA] Under (ii) both are false. "Surfaced and discussed, never filled silently (Product-Token-Governance § "Authoring Workflow" says when)" holds under every answer. The words are yours to choose.
- **1c. "Loud", as I meant it**, has three parts: surfaced to a named partner with stated content, recorded in a place a person reads, and visible in the spec afterwards. It is never a hard-coded value or a `props:` value. The draft keeps the ban, but it puts the content and the record only inside the F-A options. The planning paragraph also does not say *where* the spec names its tokens. Naming the `tokens:` blocks is what lets R3-16 check them (§ 4).

**Replacement text for site 3's two new paragraphs** (the "**Leonardo** defines…" and naming-authority paragraphs are unchanged):

> **Token needs are planned before implementation.** A screen's token needs are identified while the screen is specified, so they can be discussed rather than decided ad hoc during the build. The screen spec names every token its nodes use in their `tokens:` blocks (Integration Guide § "Writing Screen Specs"): system tokens, semantic first, and the product tokens the screen introduces. It also names each need no system token covers, as a new product token or as a system gap. A system gap goes to Thurgood, who triages it to Ada; creating a system token needs human review (Token Governance § "Token Creation Governance"). Until the gap is resolved, the spec names the product token the screen uses in its place, with `promotionCandidate: true`, or the screen waits; the discussion decides which. ⟦F-B: who the needs are discussed with⟧ before implementation starts. *(Amended <ratification date> by ballot 2026-10-26-system-token-review-and-token-planning, item 2; prior text at `a03b92f02`.)*
>
> **A need the spec missed.** A platform agent (Sparky, Kenya, Data) that sees a missing need while reading the spec raises it before building (Product-Handoff-Protocol § "Platform → Leo (Raising Concerns Before Implementation)"). Some needs appear only during the build on one platform, such as spacing added to a safe-area or keyboard inset (the inset itself is the platform's value, not a token) or a sheet detent height. A platform agent that meets one first checks the system tokens, semantic first; a need they cover is not a gap. Otherwise it surfaces the need to Leonardo as a Tier 1 clarification (Product-Handoff-Protocol § "Tier 1: Quick Clarifications"), stating the need, the system tokens it checked, and a proposed name with its `ref:` or `value:` and rationale. ⟦F-B: whether Leonardo decides, or takes it to the product's human lead⟧ ⟦F-A: whether the value waits for the outcome, or is written provisionally on the unit branch and does not merge before the outcome⟧ The outcome is recorded in the Implementation Report under "Decisions Made During Implementation", and the screen spec is amended to name any token that is kept. A need is never filled silently and left to a later audit. It never becomes a hard-coded value, or a value under a node's `props:`, which no index reads. The prototype escape hatch (§ "System-First Value Selection", `# TODO: snap to system`) is the design-phase counterpart: the value is marked, and it is resolved before the work moves on.

The `promotionCandidate` sentence is optional; take it or leave it. Without it, a system gap found at spec time has no stated interim, and the screen either waits on system work or the gap gets filled ad hoc. The field exists (§ "Promotion Signals", "Optional signal"). If you take this text, the item-2 census line for check-section-citations has to add the three prose references (Integration Guide § "Writing Screen Specs"; Product-Handoff-Protocol §§ "Tier 1: Quick Clarifications" and "Platform → Leo (Raising Concerns Before Implementation)"). All three are existing headings, and none is a `get_section` call, so the verdict is unchanged.

**2. Site 7, my charter line.** Verbatim, replacing the filer's proposal:

`- **System token creation or modification** — escalate to Ada via system feedback (through Thurgood). Product tokens are yours: you plan and author them at screen specification (§ "Product Tokens" above)`

"Plan" is the duty. My route to § "Authoring Workflow" (WHEN defining a product token during screen specification) already reaches the rest, so no other line in my charter needs editing. **The `token-gaps:` list does not belong in this ballot.** It belongs in the revision of the UI Tree Convention, which is already named in the convention itself ("Draft — to be revised after 3-5 real screen specs"). The list is mine to propose, but the file is not mine to author: the Integration Guide's reference remainder is Thurgood's (ballot 2026-10-03-123-b-u3-install-guide § 4). § 4's "his to author" should read "his to propose, in Thurgood's file". The ballot does not need the list: under item 1's text, the `tokens:` blocks are where the plan is named, and a system gap is named in the spec's prose until the convention gives it a field.

**3. F-A.** Ada's reading of my words is fair. My lean is now **(i) throughout**. The stop applies to the one value, not to the build: the platform agent keeps building everything else. I am revising my lean, not correcting her. My reasons:
- Item 1a makes the set of real mid-build product-token needs smaller than my consult assumed, so (i)'s relay cost is smaller.
- The (ii) half of (iii) has no mechanical stop. The product-token schema has no `status` field, and a product repo may have no PR gate. In exactly the repos nobody watches, (ii) becomes filled-and-audited-later, the "ad hoc" case Peter named.
- (iii) depends on the agent judging what is a "suspected system gap", and a wrong judgment fails toward (ii).
- Item 1's pre-implementation catch moves some needs out of the build entirely.

*Surviving counter-argument*: my frequency estimate is reasoning, not data. No product screen has been built under this law, and this repo has no `product/`. If missed needs turn out to be common, (i) costs one human relay each, since agents cannot talk to each other directly (Product-Handoff-Protocol § "Communication Reality"). The workaround risk (a hard-coded literal in a screen, which no check sees) is reduced by a ban, which is education, and is not removed. A value the agent judges to be within tolerance of a system token is, by design, never raised. *Folded proposal*: a rule-10 record, triggered by the first product build's Lessons Synthesis Review, that counts the missed needs raised per screen and how many discussions changed the token. That measures § 10's residual 1 (cost with no yield) and residual 5. A high count re-opens F-A for (iii). The pick between (i) and (iii) is Peter's.

**4. F-B.** My read is **(c)**. On the cost Ada marked *unverified*: a screen spec does get a human read today, in the governance text. Product-Handoff-Protocol § "Leo → Platform (Screen Spec Handoff)" makes the handoff the product spec's `design.md` and `tasks.md`. Those pass the sequential formalization gate with feedback rounds, and Peter merges them. My Gate System (my charter, Design Creation mode) also has a human confirm direction on Novel and Established surfaces. This is verified in the text but not observed in practice, because no product screen has been built. So (c) costs little at spec time: the token list has to be legible inside a read that already happens.
- **(a)'s cost**: no human ever decides a product token. Agreement between two agents is not a check that is independent of the agents.
- **(b)'s cost**: every missed need is a human decision. In this repo Peter already carries every Tier 1 message, so the extra cost is his attention to the decision, not the relay. In a product repo run from one session, it adds an interruption for each need.
- **(c)'s surviving cost**: a non-colour product token found mid-build and agreed with me reaches a human only as a line in a committed Implementation Report at the PR merge (in a product repo, only if it has a PR gate), never as a decision. On a `value:` token, that leaves me as the only check on the rationale. The check that would close this is not a model: it is § 4's implementation-time check, and under (c) that record should not be left to drift.
- **One gap in (c)**: a Trivial surface gets no human gate. A modification that introduces a `value:` product token or a system gap should not count as Trivial. That is my charter's gate rule, and I will bring it as a follow-up, not in this ballot.

**5. What would make me refuse at application.**
- **Refuse (my seat act)**: § 12 step 4 has Thurgood apply "site 1, sites 2a, 8 and 9". There is no site 9, and site 7 is assigned to nobody. It must read "sites 1, 2a, 7 and 8". I re-confirm and re-sign `#out-of-scope` only against site 7 applied byte for byte from item 2 above, or from a later Leonardo round.
- **Would refuse**: a resolved site 3 that requires a separate list of every system token per element in addition to the `tokens:` blocks. That duplicates them and drifts (§ 4 records my advice against it).
- **Fix, not refuse**: § 5's "The scoped L186 covers them" should be L171 after the re-base. § 8 F-A (i)'s "Leonardo resolves it" should read "Leonardo, or under F-B (b) the human through him, resolves it". § 10's statement of my counter-argument should take item 1a's correction.

### [LINA R1] — review (2026-10-26)

Read at the branch head `421721ea9` (base `a03b92f02`). The before-texts of sites 5–6 match the worktree (L102, L239, L283). This answers [@LINA] from [ADA R0] (replace or confirm) and [LEONARDO R1] item 1b (the timing words in sites 5–6). I replace all three after-texts (item 1). Item 2 adds three charter lines that the draft missed. They are the lines that set what a platform agent does mid-build.

**1. Sites 5–6, Web-Authoring-Standards: replaced.** Leonardo is right that "surfaced and discussed before it is filled" and "surface the need before you build on it" are false under F-A (ii). I also do not take the draft's other choice, which was to have the web standard point at Product-Token-Governance for the mechanism and carry no copy of the slot. Sparky's ambient Product-Token-Governance is § "System-First Value Selection" only, and he has no route to § "Authoring Workflow" (`canonical/agents/sparky.md` L24–30, L79–91). His route for this moment is this doc's § "Product Token Authoring (Sparky)" (L85–87, cue "authoring a product token you discovered during screen implementation"). A pointer to a section he neither holds nor routes to adds friction at the moment of the decision, and that friction produces the workaround. So the texts split three ways. L102 is in § "Hard Rules" and renders into his charter, so it is short and fork-invariant. L239 (§ "The Rule", his routed section) carries the ⟦F-A⟧ slot as the web form of site 3's slot, resolved from the same answer. L283 defers to L239.

- **L102** after:
  `There is no step 4. If no system token exists, the value is a product token, never a hard-coded value: the one the screen spec names, or, for a need the spec did not name, one you surface to Leonardo and never add silently (§ "Product Token Authoring (Sparky)" below says when it may be written). *(Amended <ratification date> by ballot 2026-10-26-system-token-review-and-token-planning, item 2; prior text at `a03b92f02`.)*`
- **L239** after:
  `If you need a spacing, color, typography, motion, radius, border, shadow, z-index, or grid value and no system token (semantic or primitive) covers it, the value is a product token. If the screen spec names it, use it, or author it as the spec names it. If the spec does not, it is a need the spec missed: surface it to Leonardo as a Tier 1 clarification (Product-Handoff-Protocol § "Tier 1: Quick Clarifications"), with the need, the system tokens you checked (semantic first), and a proposed name with its `ref:` or `value:` and rationale. ⟦F-A, web form of site 3's slot⟧ The outcome goes in your Implementation Report under "Decisions Made During Implementation". The gap is never filled with a hard-coded value, or with a value under a node's `props:` in the screen spec. Product-Token-Governance § "Authoring Workflow" is the rule for every platform; this is its web form. *(Amended <ratification date> by ballot 2026-10-26-system-token-review-and-token-planning, item 2; prior text at `a03b92f02`.)*`
  - ⟦F-A⟧ under (i): `Until the outcome, the declaration uses the nearest system token, marked /* token-gap: <need> */, or is left out where no system token is near. You write the product token only once the screen spec names it. Surface every gap from one build pass in one message.`
  - ⟦F-A⟧ under (ii): `You may write it now on the unit branch, provisionally, under the naming schema and authoring rules below. The unit does not merge until the outcome is recorded in the PR body, the spec names a kept token, and a rejected one is removed.`
  - ⟦F-A⟧ under (iii): the (i) text for a colour value or a suspected system gap, and the (ii) text otherwise.
- **L283** after:
  `5. **Nothing exists** → If the screen spec names it, create it following the naming schema. If it does not, it is a need the spec missed: follow § "The Rule" above before you create it. *(Amended <ratification date> by ballot 2026-10-26-system-token-review-and-token-planning, item 2; prior text at `a03b92f02`.)*`

All three hold under every F-B answer. Sparky's partner is Leonardo under (a), (b) and (c); F-B decides what Leonardo does next, and that is site 3's text, not this doc's. L92 and L235 stay unedited (agreed, § 3).

- **The copy cost.** L239's slot is a second copy of site 3's ⟦F-A⟧, and it depends on site 3. § 14 resolves both from the one answer. § 12 step 6 should check that they agree, and the claims pass should compare them.
- **[@ADA] The (i) interim needs your text.** What sits in the code while the value waits is new here. Site 3's (i) text should carry it in platform-neutral words, or Kenya and Data have no interim (item 3 says why it matters). If you take it, I mirror your words in L239. If you do not, I strike the first sentence of the (i) text so the two copies match. -- [LINA R1]
- **Census**: the after-texts add only prose § references, all to existing headings (Product-Handoff-Protocol § "Tier 1: Quick Clarifications", Product-Token-Governance § "Authoring Workflow", this doc's § "Product Token Authoring (Sparky)" and § "The Rule"). check-section-citations reads MCP call blocks only (`scripts/check-section-citations.ts` header), so no verdict moves. Sparky's asserted string (L34) is outside every hunk. Site 5's row in § 7 stays "regeneration only, no act". The item-2 census line for check-section-citations should list these references.
- **A finding against my own text.** #491 applied my L106 and L386 after-texts without the dated pointer that ballots README § "Conventions" requires ("a document agents read as law carries only the current text plus a dated pointer", 2026-10-19, which predates #491). No round caught it. L106 is in the same Hard Rules item as L102, so I propose that the application carry both pointers as one CORRECTION line: `**Edit kind**: governance/Web-Authoring-Standards.md L106, L386 — CORRECTION (this entry; truth: ballots README § "Conventions", superseded-text bullet)`. I would apply it, and § 7's grant would add L106 and L386 for Lina. If the author wants it kept out of this ballot, I file a rule-10 record at application instead.

**2. The charter lines: all of them ride this ballot, plus three the draft missed.** Each platform charter's § "Product Tokens" says: "Author new tokens in `product/tokens/{category}.yaml` when you discover values Leonardo didn't anticipate — follow Product-Token-Governance (your ambient law), …". The lines are `canonical/agents/sparky.md` L322, `kenya.md` L294 and `data.md` L297 (operative items `product-tokens-5`, `product-tokens-6`, `product-tokens-6`). That is PTG L60 restated in always-loaded text. For Kenya and Data it is the only always-loaded statement of when to author: their ambient PTG is § "System-First Value Selection" alone, and they have no Web-Authoring-Standards. If PTG is scoped while these lines stand, the old law stays live in the seats it governs. If site 8 is edited without them, each charter contradicts itself the other way (Out of Scope says surface first; Product Tokens says author on discovery). § 12 step 6's regex misses them. Add `didn't anticipate|discover values` to it.

- **Site 8a** (my proposal; each seat's text at R1; Thurgood applies byte for byte):
  - Sparky L322 after: `- Author a product token in \`product/tokens/{category}.yaml\` when the screen spec names it. A value the spec did not anticipate is surfaced to Leonardo and never filled silently (Product-Token-Governance § "Authoring Workflow"; the routed product-token authoring section says when it may be written on web). Follow Product-Token-Governance (your ambient law), and the routed product-token authoring + naming sections`
  - Kenya L294 and Data L297 after: `- Author a product token in \`product/tokens/{category}.yaml\` when the screen spec names it. A value the spec did not anticipate is surfaced to Leonardo and never filled silently (Product-Token-Governance § "Authoring Workflow" says when it may be written). Follow Product-Token-Governance (your ambient law), and the routed product-token naming section`
  - These are fork-invariant: they point for the timing and claim none.
- **Why it should ride, not wait for a narrower ballot.** First, the application already falls after S and already re-signs Core Goals and Leonardo, so a split relieves no release pressure. Second, a narrower follow-on leaves a window, from this ballot's merge to that one's, in which the platform seats' always-loaded text contradicts the law. Third, the `#product-tokens` units are `retained` in the consumer profile (`sparky.dispositions.yaml` L9; `kenya.dispositions.yaml` and `data.dispositions.yaml` L10, `#product-tokens-spec-108109`), so site 8a costs each seat one re-confirm and no re-sign. The platform seats' total is three re-confirm and re-sign pairs (`#out-of-scope`) plus three re-confirms (`#product-tokens`). § 7's table, § 11's cost and the grant paths grow to match.
- **Surviving counter-argument.** That is six seat acts on three seats whose consumers do not exist in this repo (there is no `product/`), for law that no build has exercised. A narrower ballot after the first product build would cost the same acts once, with evidence in hand. Kenya and Data also get the timing only as a pointer to a section they neither hold ambient nor route to, which is the same friction I argued against for Sparky in item 1. The fix for that would be a route in their charters, which is their text. [@KENYA] [@DATA] Do you want a route to Product-Token-Governance § "Authoring Workflow" (cue: a value the screen spec did not anticipate)? -- [LINA R1]

**3. F-A and F-B from the platform side.**
- **Under (i), this is what Sparky does.** He finds a value with no system token. He cannot leave the declaration empty and still test the screen, and the draft names no legal interim. That gap, more than intent, is what produces `padding-block: 18px` or a value under `props:`. With the interim in item 1 (the nearest system token, marked, or the declaration left out), he keeps building, the tests run, and the screen is visibly close but not final. He batches every gap from the pass into one Tier 1 message. In this repo each message is one relay by Peter (Product-Handoff-Protocol § "Communication Reality"), so batching turns one relay per value into one relay per build pass. When the answer comes he writes the product token, swaps the declaration and removes the marker. The cost is a second short pass on each screen that had gaps.
- **Under (ii), this is what he does.** He writes the entry in `product/tokens/<category>.yaml` with its rationale, regenerates, uses `var(--product-…)`, finishes the screen and raises the same content. The gain is that the interim is in the index: `get_product_tokens` sees it, and the indexer checks its naming and rationale, so it is more visible than a comment. The losses are three. The discussion starts from a token that already exists and works, which tilts it toward keeping the token. A provisional token and a kept one are the same bytes, because the schema has no `status` field. In a product repo with no PR gate, "does not merge" stops nothing. I confirm Leonardo's point from the web side: nothing in Sparky's toolchain reads "provisional".
- **The workaround risk is real under both, and larger under (i) without an interim.** A hard-coded literal in a screen is invisible to every check I know of: the `no-hardcoded-color` assertions and the token-compliance tests read components, not screens. A `props:` value is invisible to the Product MCP index. The ban is education. The interim reduces the incentive but adds no detector. The class option is a detector for literal values in product screen code (px, hex, ms in screen CSS, and the Swift and Kotlin equivalents). Thurgood's implementation-time-check record (§ 4) is the natural home. I did not search a product repo for one; in this repo I found only the component-scoped checks.
- **My F-A read: (i), with the interim and batching.** It keeps "discussed before it is filled" literally true: the nearest system token is not a new value, and nothing is created. The interim removes the reason to hard-code. I agree with Leonardo that (iii) adds a judgment ("suspected system gap") that will fail toward (ii). *Surviving counter-argument*: the interim can ship. No check reads the marker, and a value within tolerance is never raised at all, by design (Leonardo's residual). If the discussion never happens, because a session ends or a relay is dropped, the screen ships on the nearest system token. That is wrong by a small amount but still on the system, and I would rather have that failure than a literal or an unreviewed `value:` token. The pick is Peter's.
- **F-B: the platform agents cannot see it.** Under every option Sparky's partner is Leonardo, and the options differ only in what Leonardo does next. My read is **(c)**, on Leonardo's evidence that a product spec already gets a human read (item 4 of his R1). From the component side, a component token needs explicit human approval before use. A product token is scoped to one vertical, so less rides on it, and that is why (c) is enough for me without (b). Under (a), the only gate on a `value:` product token is two agents agreeing. That is the residual § 10 item 4 names, and I would not take it.

**4. Refusals at application, and confirmations.**
- **Refuse**: applying sites 5–6 from any text that says a need is "discussed before it is filled" or "surfaced before you build on it" when F-A is (ii) or (iii). The text would be false the moment it is applied.
- **Refuse**: applying L239 if its resolved slot differs in substance from site 3's resolved slot. That would be one answer with two copies that disagree.
- **Refuse**: an application that lands sites 3 and 8 and leaves the three site-8a lines unedited, because Kenya's and Data's always-loaded text would then state the old law.
- **Confirm**: the system-token definition (§ 2) is right for my domain, including its consequence for product-built components. A product's one-off component declares its tokens with `defineComponentTokens()`, so they are system tokens under scoped L59 and need human review. That matches the component-token autonomy level already in Core Goals ("Requires explicit human approval before use").
- **Confirm**: Component-Development-Guide needs no edit. Its token-creation text (L42–48, L103, L1618–1620, L1756) is about component and semantic tokens, which are system tokens, and it says nothing about product tokens.
- **Fix, not refuse**: in § 5, "The scoped L186" should read "L171" (also Leonardo's item 5). § 12 step 4 should read "Lina applies sites 5 and 6 (and the L106/L386 pointers, if item 1's CORRECTION is taken)".
