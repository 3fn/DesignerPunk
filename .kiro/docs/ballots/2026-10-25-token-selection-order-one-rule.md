# Ballot Measure: one token-selection order, in Token Governance; Core Goals points to it

**Date**: 2026-10-25
**Drafted by**: Ada (Rosetta; owner of `governance/Token-Governance.md` and of the ambient `token-governance` embed), the measure text of §§ 2–3 and sites 6–7; Lina (Stemma), the text of sites 3–5 and her reads of F-1, F-2 and F-3; filed, framed and re-based by Thurgood (Civitas steward; owner of `.kiro/steering/core-goals.md`, the Core Goals part of item 2 and the census and re-sign frame). At Peter's direction. Peter, chat, 2026-10-25, relayed verbatim by the orchestrator: *"Fix all of them as the owners recommend; T is (A)"*. On walk row 6 that adopts the owner's pick: draft the ballot (not waive), with Ada's order, Token-Governance's scoped and Core Goals' last two steps folded into its STOP step; and 6(ii), Core Goals is a pointer only. **6(i) is not ruled** (walk record `.kiro/issues/2026-10-25-release-16.1.0-walk.md` L175: "STILL OPEN, and it holds the merge"). This ballot carries it as F-1. *Unverified here: the relay is chat only; the walk record (L173, L177) and the row's record (`.kiro/issues/2026-10-24-token-selection-order-core-goals-vs-token-governance.md` § "Owner line (2026-10-25, Ada, rule 9)") commit his words.*
**Status**: **DRAFT**, not ratified. No edit site below is applied. A merge with this line still reading DRAFT is a recording defect, not a ratification.
**Owners**: Ada (item 1, Token Governance) and Thurgood (item 2, Core Goals). Each follow-on site's owner is named at the site (§ 4).
**Proposers**: Ada (the order, §§ 2–3, F-1 (a) and F-2 as drafted; her 6(i) consult of the same day moves her to F-1 (b), § 7), Lina (sites 3–5; picks F-1 (b), F-2 (B), F-3 (A)). Thurgood, as Core Goals owner, picks F-2 (B) and F-3 (A) for the lines he owns (L51, L73–74; § 7, R2).
**Required reviewer**: **Stacy** (R1). She is the census reader (README § "Conventions", "Instrument census"), the C1 confirmer and signer of Core Goals' `#development-practices` (§ 6), and the reader of the governance-edit-kind lines.
**Reviewers**: **Lina** (sites 3–5 are hers; F-1 and F-2 change how her components read their own tokens); **Sparky** (site 5's L106 sits in the `web-authoring-standards` § "Hard Rules" embed in his charter, and § 7 Q-S asked him whether his screen chain is a second order; answered at R1). **Peter** ratifies (site 2 edits Core Goals, his document). Kenya and Data are notified, not reviewers: site 8 (added at R2, text Ada's) changes one line rendered in their `product-token-governance` embeds, regeneration only (§ 6). **R1 and R2 are recorded** (Stacy, Sparky, Ada, Lina; § 12), incorporated at [THURGOOD R2] and [THURGOOD R3].
**Class**: LAW. It changes what governance requires: it makes one of two contradictory MUST orders the law, moves the hard-coded last resort into the STOP step, and, under F-1 (b), removes a checkpoint. A normative order has no truth referent, so no item can be a CORRECTION (README § "When a governance edit needs a ballot — three kinds"; the row's record, Thurgood review, 2026-10-24).
**Amends**: `governance/Token-Governance.md` §§ "Token Selection Matrix", "Component Token Usage", "Token Creation Governance", "Example 7"; `.kiro/steering/core-goals.md` § "Development Practices" L61–76 (and L58 under F-1 (b), L51 under F-2 (B)). Follow-on sites in § 4, six since R2 (site 8, `governance/Product-Token-Governance.md` L77). § 11 step 5 re-points two `governance/classification-map.md` rows' education citations (EXECUTION of this ballot; no requirement or `check_state` changes).
**Cap**: four Token-Governance hunks, one Core Goals hunk (plus at most two one-line hunks under F-1 (b) and F-2 (B)), six follow-on sites (sites 3–8: R2 struck site 3's verbatim fallback and added site 8). **Retroactivity**: none. It binds from its application merge; shipped component code is not re-judged by it.
**Base**: `main` at `1eced6cd5`. Every before-text below is quoted from that tree. Ada's measure was drafted at `652074c6b`; the served-docs CORRECTION PR #472 (`1524a96aa`) merged between, and § 0 lists what the re-base changed. Re-checked at R2 against `fa8aa254f`: `git diff --stat 1eced6cd5 fa8aa254f -- governance .kiro/steering canonical .cursor src/components src/tokens` prints nothing, so no before-text moved.

> **Conflict of interest, stated first.** Ada recommended the order this ballot drafts, and F-2 is a defect she found in her own recommendation. Lina picks the F-1 branch that widens her own autonomy. I own Core Goals and author the items and overlays of every unit this ballot stales (§ 6), and Core Goals was re-signed two days running because #472 merged first. Stacy's review and Peter's ruling are the checks.

---

## 0. The re-base onto `1eced6cd5` (what #472 moved)

`git diff --stat 652074c6b 1eced6cd5` over the edit sites: `.kiro/steering/core-goals.md` (6 lines), `canonical/agents/lina.md` (2), `governance/Component-Development-Guide.md` (112), `governance/Token-Governance.md` (93); Web-Authoring-Standards, `canonical/agents/ada.md` and `.cursor/rules/tokens.mdc` unchanged. Per site:

- **1a** (Matrix L39–67): unchanged text and lines.
- **1b** (Component Token Usage): text unchanged, now **L153–172** (was L152–171). The Component Token Pattern lines below it are now L174–178, rewritten by #472; untouched here.
- **1c**: the insert goes after **L188** (was L186); the CHECKED lines are **L200–202** (was L198–200).
- **1d** (Example 7): **before re-based**. #472 rewrote it from Avatar color to Avatar size (`avatar.size.md`, L430–450). Its defect under the ruled order is now different (it checks a primitive before the component's own token); Ada's after-text is unchanged.
- **Ada's two asserted strings**: now L100 and L186 (were L99, L184). Both outside every hunk.
- **Core Goals** L61–76: **before re-based**. #472 changed L68, L70 and L76 (token names). The after-text removes them anyway. The measure's sequencing note for the served-docs PR (skip those five lines) is moot: that PR merged first and edited them, and this ballot quotes the edited text.
- **Lina's charter** L499–504: L501 changed by #472 (example names); re-based.
- **Component-Development-Guide**: Lina wrote against the served-docs branch; that branch merged as #472, and her line numbers equal `1eced6cd5`'s (L142–214, L43, L48), except the glossary line, which is **L261** (she wrote ~L262).
- **Amendment pointers**: the "prior text at" SHA in each after-text is `1eced6cd5`, the base the before-texts are quoted from (the measure had `652074c6b`).

## 1. The defect (quoted at `1eced6cd5`)

Two texts that agents meet each give a MUST order, and they invert steps 2 and 3.

`.kiro/steering/core-goals.md` L67–71 (always loaded; ships to consumers as `designerpunk-core-goals.md`):
> **Token Selection Priority (MUST follow this order):**
> 1. **Semantic tokens** — purpose-built for specific use cases (e.g., `color.contrast.onAction` for content on action-colored backgrounds, `space.inset.100` for inset padding)
> 2. **Primitive tokens** — when no semantic token exists, check if a primitive token provides the needed value
> 3. **Component tokens referencing primitives** — when a component needs a semantic name but the value exists as a primitive, create a component token that references the primitive (e.g., `buttonicon.inset.medium = space125`)
> 4. **Hard-coded values** — only as last resort, requires user approval

`governance/Token-Governance.md` L39 and L47–62 (docs MCP), § "Token Selection Matrix":
> When you need a token value, follow this priority order:
> 1. SEMANTIC CONCEPT TOKEN EXISTS? └── YES → Use it (verify semantic correctness)
> 2. COMPONENT TOKEN EXISTS? └── YES → Use it (requires human checkpoint)
> 3. PRIMITIVE TOKEN EXISTS? └── YES → Use it (requires context/acknowledgment)
> 4. NO EXISTING TOKEN WORKS? └── STOP → Human checkpoint required … Human decides: component token vs new primitive vs new semantic

Three conflicts:
- **Order**: primitive before component (Core Goals) against component before primitive (Token Governance).
- **Creation inside selection**: Core Goals step 3 says "create a component token", against its own L59 ("**Creating ANY token**: Always requires human review — no autonomous token creation") and Token Governance L67 ("Steps 1-3 are about USING existing tokens. Step 4 is about CREATING new tokens").
- **Last resort** (Stacy, 2026-10-24): Core Goals step 4 allows hard-coded values; Token Governance step 4 never offers them.

And one sentence false whatever the pick: Core Goals L61–63 sends the reader to the matrix "for detailed governance", and the matrix reverses Core Goals' order.

Three more texts restate an order: Lina's charter (`canonical/agents/lina.md` L499–504, Core Goals' order), `.cursor/rules/tokens.mdc` L9–14 (Core Goals' order), and `governance/Component-Development-Guide.md` § "Token Selection Decision Framework", which goes semantic → primitive → "Step 3: Create Component-Level Tokens for Variants" (L180–185), creating tokens with no checkpoint. No ballot or record has ruled the order (`git grep -n -iE "Token Selection Priority|Token Selection Matrix" -- .kiro/docs/ballots .kiro/issues governance/classification-map.md`, excluding the row's record and the walk record → none).

**Scope of "the one order"**: the order binds design-system token selection, which is where component tokens exist. `governance/Web-Authoring-Standards.md` § "Hard Rules" item 3 (L94–104) gives Sparky a chain for product screen CSS (semantic → primitive → product token, "There is no step 4"). It is this order applied to a product screen, not a second order (Sparky R1; Lina R1). The ballot's reading, in Ada's words (R1), which replace the sentence Sparky proposed because its clause "is that governance's form of the matrix's human checkpoint" is false against Product-Token-Governance § "Authoring Workflow" (L58–62: platform agents add product tokens during implementation, the indexer validates naming, and there is no per-token human checkpoint): "Sparky's screen chain is this order applied to a product screen: it omits the component step (screens have none). It differs in two stated ways: its primitive step carries no acknowledgment gate, and its last step is not the matrix's STOP. A value no system token covers becomes a product token under Product-Token-Governance § 'System-First Value Selection' (system token first; written rationale for a `value:`), with review by audit." This sentence edits no site. Its residual, Core Goals L59 ("Creating ANY token … human review") read against product-token authoring, predates this ballot and is Ada's rule-10 record to file, Leonardo consulted (§ 4, "Not edited").

## 2. Item 1 — Token Governance carries the one order (Ada's text)

### Site 1a: § "Token Selection Matrix", the order and the Key Insight

**Before** (`governance/Token-Governance.md` L39–67): L39 "When you need a token value, follow this priority order:", the box diagram L41–65 (quoted in § 1), and L67:
> **Key Insight**: Steps 1-3 are about USING existing tokens. Step 4 is about CREATING new tokens. These have fundamentally different governance requirements.

**After, F-2 (A)** (replaces L39–67; the heading L37 and § "Concept-First Selection Guidance" L69–88 are unchanged):

> When you need a token value, take the first step that applies. This is the one token-selection order: Core Goals points here and does not restate it. *(Amended <ratification date> by ballot 2026-10-25-token-selection-order-one-rule, item 1; prior text at `1eced6cd5`.)*
>
> 1. **A semantic token exists for the use** → use it. Verify it is semantically correct (§ "Semantic Concept Token Usage").
> 2. **The component you are building has its own component token for this property** → use it [F-1 (a): **with a human checkpoint, unless the spec names the token**] [F-1 (b): **with no checkpoint**] (§ "Component Token Usage"). A component token is named for its component (`buttonicon.inset.medium` belongs to Button-Icon), so this step applies only inside that component. A token that belongs to another component is not a selection step: using one goes to step 4.
> 3. **A primitive token exists** → use it, with prior context or the human's acknowledgment (§ "Primitive Token Usage").
> 4. **Nothing above fits** → **STOP. Human checkpoint.** Present the value needed, what you checked, and your recommendation (§ "Creation Checkpoint Format"). The human decides one of:
>    - a new component token, built by the Component Token Construction Rule (§ "Token Creation Governance");
>    - a new primitive token;
>    - a new semantic token;
>    - as the last resort, a hard-coded value. If the human chooses it, tell the user where the value is and why no token fits.
>
> **Key Insight**: Steps 1–3 USE existing tokens. Step 4 CREATES a token, or uses a hard-coded value as the last resort, and only the human decides it. These have different governance requirements.

(The box diagram goes: the numbered list is the same content and needs no box art to stay aligned. The ratified text keeps one F-1 bracket and drops the brackets' labels.)

**After, F-2 (B)** (replaces L39–67, as F-2 (A); steps 1 and 2 exchange places and numbers; the filer's write-out, confirmed by Ada at R1 as "the right text"):

> When you need a token value, take the first step that applies. This is the one token-selection order: Core Goals points here and does not restate it. *(Amended <ratification date> by ballot 2026-10-25-token-selection-order-one-rule, item 1; prior text at `1eced6cd5`.)*
>
> 1. **The component you are building has its own component token for this property** → use it [F-1 (a): **with a human checkpoint, unless the spec names the token**] [F-1 (b): **with no checkpoint**] (§ "Component Token Usage"). A component token is named for its component (`buttonicon.inset.medium` belongs to Button-Icon), so this step applies only inside that component. A token that belongs to another component is not a selection step: using one goes to step 4.
> 2. **A semantic token exists for the use** → use it. Verify it is semantically correct (§ "Semantic Concept Token Usage").
> 3. **A primitive token exists** → use it, with prior context or the human's acknowledgment (§ "Primitive Token Usage").
> 4. **Nothing above fits** → **STOP. Human checkpoint.** Present the value needed, what you checked, and your recommendation (§ "Creation Checkpoint Format"). The human decides one of:
>    - a new component token, built by the Component Token Construction Rule (§ "Token Creation Governance");
>    - a new primitive token;
>    - a new semantic token;
>    - as the last resort, a hard-coded value. If the human chooses it, tell the user where the value is and why no token fits.
>
> **Key Insight**: Steps 1–3 USE existing tokens. Step 4 CREATES a token, or uses a hard-coded value as the last resort, and only the human decides it. These have different governance requirements.

Under F-2 (B) three other hunks carry the swap (Ada R1): site 1b's "step 2" reads "step 1"; site 1c's CHECKED lines swap their first two; site 1d's Example 7 is the (B) text there.

**Under F-1 (b) with the class rule** (§ 7, F-1): insert after L93 (the blank line under the `## Token Usage Governance` heading at L92) and before `### Semantic Concept Token Usage` (L94), this paragraph followed by one blank line:

> A use-time checkpoint applies only where that use was not reviewed when the token was made. *(Amended <ratification date> by ballot 2026-10-25-token-selection-order-one-rule, item 1; prior text at `1eced6cd5`.)*

(Ada's wording and placement, Ada R1; it renders into her `token-governance` embed. Under F-1 (a), and under F-1 (b) without the class rule, nothing is inserted.)

### Site 1b: § "Component Token Usage" (L151–172) — the F-1-dependent hunk

**Before** (L153–172):
> **Autonomy Level**: Human checkpoint required
> **Friction**: High
> **Requirement**: Explicit human approval
>
> AI agents MUST checkpoint with human before using component tokens, even if the component token already exists.
>
> **Why?** Component tokens represent an acknowledgment that the existing semantic token system is insufficient for a specific component's needs. Using them should be a deliberate decision, not a default.
>
> **Checkpoint format:**
> ```
> AI: "This component needs [value]. I've checked:
> - Semantic concept tokens: [what was checked, why insufficient]
> - Primitive tokens: [what was checked, why insufficient]
> - Existing component token: [token name] exists for this component
>
> Recommendation: Use existing component token [token name]
> Awaiting your approval to proceed."
> ```
>
> **Exception**: If the spec explicitly calls for using a specific component token, the AI can proceed without additional checkpoint (prior acknowledgment).

**After, F-1 (a)** (the checkpoint stays, waived when the spec names the token). Two changes: a scope line after **Requirement**, and the "Primitive tokens" line leaves the format (step 2 now comes before primitives, so none were checked):
> **Autonomy Level**: Human checkpoint required
> **Friction**: High
> **Requirement**: Explicit human approval
> **Scope**: step 2 of § "Token Selection Matrix": a component's own token, used inside that component.
>
> AI agents MUST checkpoint with human before using component tokens, even if the component token already exists.
>
> **Why?** Component tokens represent an acknowledgment that the existing semantic token system is insufficient for a specific component's needs. Using them should be a deliberate decision, not a default.
>
> **Checkpoint format:**
> ```
> AI: "This component needs [value]. I've checked:
> - Semantic concept tokens: [what was checked, why insufficient]
> - Existing component token: [token name] exists for this component
>
> Recommendation: Use existing component token [token name]
> Awaiting your approval to proceed."
> ```
>
> **Exception**: If the spec explicitly calls for using a specific component token, the AI can proceed without additional checkpoint (prior acknowledgment).

**After, F-1 (b)** (no checkpoint inside the owner; the checkpoint kept for another component's token):
> **Autonomy Level**: Full autonomy inside the owning component
> **Friction**: Low
> **Requirement**: The token belongs to the component being built and is for this property
>
> Inside the component a token belongs to, AI agents use that component token for the property it was made for without a checkpoint, as step 2 of § "Token Selection Matrix". A token that belongs to another component, or the owner's token for another property, is not a selection step: using one needs the step-4 checkpoint, in this format:
>
> **Why?** A component token exists because a human decided, when it was created, that the semantic tokens did not meet this component's need (§ "Token Creation Governance"). Using it inside its own component carries out that decision; a checkpoint would ask the same question again.
>
> **Checkpoint format (another component's token, or the owner's token for another property):**
> ```
> AI: "This component needs [value]. I've checked:
> - Semantic concept tokens: [what was checked, why insufficient]
> - Primitive tokens: [what was checked, why insufficient]
> - Another component's token, or the owner's token for another property: [token name] belongs to [component]
>
> Recommendation: [use it / create a token for this component / new primitive / new semantic]
> Awaiting your decision before proceeding."
> ```

(Under (b) the **Exception** line goes: nothing inside the owner is left to pre-authorize. L174–178, "**Component Token Pattern**", are untouched by either option.)

*Resolved at R2 (Ada R1)*: under (b) the heading, the format line and the step-2 sentence name both cases, "another component's token, or the owner's token for another property", as written above. Ada's residual stands: nothing checks "the property it was made for". *Aligned at R3 (Ada R2 (d))*: the sentence now says "the owner's token for another property", as the heading does, and its first sentence says "for the property it was made for".

**Under F-2 (B)** (Ada R1): every "step 2" in this site reads "step 1". The (a) Scope line reads `**Scope**: step 1 of § "Token Selection Matrix": a component's own token, used inside that component.`, and the (b) sentence reads "… use that component token for the property it was made for without a checkpoint, as step 1 of § "Token Selection Matrix". …".

**Under F-2 (B) with F-1 (a)** (Ada R2 (c) confirms the drop): the own token is step 1, so no semantic token was checked, and the "Semantic concept tokens" line leaves the (a) format, as the "Primitive tokens" line already does. The (a) format under (B) reads, in full:
> ```
> AI: "This component needs [value]. I've checked:
> - Existing component token: [token name] exists for this component
>
> Recommendation: Use existing component token [token name]
> Awaiting your approval to proceed."
> ```

The (b) format keeps both lines ("Semantic concept tokens", "Primitive tokens"), because there steps 2 and 3 were checked before the step-4 checkpoint. The same drop holds for site 4's (B) Step 1 checkpoint (Lina R2 (b)). -- [THURGOOD R3]

### Site 1c: § "Token Creation Governance" — the construction rule's new home (F-3) and the checklist order

**Insert** after L188 (end of § "Universal Rule: Human Review Required"), F-3 (A) only:
> ### Component Token Construction Rule
>
> Component tokens must either reference an existing primitive token OR conform to how that primitive token family's values are defined. Never introduce arbitrary values at the component level that don't align with the underlying token family's value system. *(Moved verbatim from Core Goals § "Development Practices" by ballot 2026-10-25-token-selection-order-one-rule, item 1; prior home `.kiro/steering/core-goals.md` L73–74 at `1eced6cd5`.)*

**Before** (L200–202, the "CHECKED" lines of § "Creation Checkpoint Format"):
> - Semantic tokens: [what was checked]
> - Primitive tokens: [what was checked]
> - Component tokens: [what was checked]

**After** (the checklist follows the order an agent checked in; under F-2 (B) its first two lines swap):
> - Semantic tokens: [what was checked]
> - This component's own component tokens: [what was checked]
> - Primitive tokens: [what was checked]

### Site 1d: § "Example 7" (L430–450), rewritten to the order

**Before** (L430–450, re-based: #472's text):
> ### Example 7: Avatar Component Token Usage
>
> **Situation**: Building an avatar component, need the medium size.
>
> **Correct approach**:
> 1. Check semantic tokens → none covers avatar sizing
> 2. Check primitives → `size500` exists
> 3. Check component tokens → `avatar.size.md` exists (references `size500`)
> 4. Component token exists → Checkpoint required
>
> ```
> AI: "Avatar medium variant needs a size. I've checked:
> - Semantic concept tokens: none covers avatar sizing
> - Primitive tokens: size500 exists
> - Existing component token: avatar.size.md exists (references size500)
>
> Recommendation: Use component token avatar.size.md
> REASONING: Component token provides component-scoped discovery while referencing the primitive
>
> Awaiting your approval to proceed."
> ```

Its defect under the ruled order: it checks primitives (its step 2) before the component's own token (its step 3), which is Core Goals' order, and its checkpoint lists a primitive as checked. (At `652074c6b` the defect was a non-key name; #472 fixed that, not the order.)

**After, F-2 (A)** (Ada's text, unchanged by the re-base):
> ### Example 7: A Component's Own Token
>
> **Situation**: Building Button-Icon's medium size, need its inset (10px).
>
> **Correct approach**:
> 1. Check semantic tokens → no `space.inset.*` token is 10px (`space.inset.100` is 8px, `space.inset.150` is 12px)
> 2. The component has its own token for this property → `buttonicon.inset.medium` (references `space125`)
> 3. [F-1 (a)] The spec names `buttonicon.inset.medium` → use it. If the spec is silent, checkpoint first:
> ```
> AI: "Button-Icon medium needs a 10px inset. I've checked:
> - Semantic concept tokens: no space.inset.* token is 10px
> - Existing component token: buttonicon.inset.medium exists for this component (references space125)
>
> Recommendation: Use existing component token buttonicon.inset.medium
> Awaiting your approval to proceed."
> ```
> 3. [F-1 (b)] Use `buttonicon.inset.medium` → no checkpoint needed.

**After, F-2 (B)** (Ada R1: under (B) "Example 7's 'Correct approach' lists the own-token check before the semantic check", optionally with Button-Icon small, "since it shows the case F-2 is about"; the filer's write-out of that instruction, with her optional example; **confirmed by Ada R2 (b)**. Her optional addition to the checkpoint's Recommendation line, "(the semantic `space.inset.100` is also 8px)", is not adopted: she does not need it):
> ### Example 7: A Component's Own Token
>
> **Situation**: Building Button-Icon's small size, need its inset (8px).
>
> **Correct approach**:
> 1. The component has its own token for this property → `buttonicon.inset.small` (references `space100`). Use it, even though the semantic `space.inset.100` is also 8px: inside its own component, the component's own token comes first
> 2. [F-1 (a)] The spec names `buttonicon.inset.small` → use it. If the spec is silent, checkpoint first:
> ```
> AI: "Button-Icon small needs an 8px inset. I've checked:
> - Existing component token: buttonicon.inset.small exists for this component (references space100)
>
> Recommendation: Use existing component token buttonicon.inset.small
> Awaiting your approval to proceed."
> ```
> 2. [F-1 (b)] Use `buttonicon.inset.small` → no checkpoint needed.

(Keys verified at `fa8aa254f`: `buttonicon.inset.small` → `space100` in `token-index/components.yaml` L239–243; `space.inset.100` → `space100` in `semantics.yaml` L2368–2371; `buttonIcon.tokens.ts` L67–69 gives `'inset.small'` the reasoning "Small button variant uses 8px padding (1× base)…"; `ButtonIcon.web.css` L77 reads `var(--buttonicon-inset-small)`.)

(On the F-2 (A) text: no semantic token fits the 10px case, so its step 1 never competes with its step 2; the case does not show F-2, which is why the (B) text uses the small size. Keys verified at `1eced6cd5`: `buttonicon.inset.medium` → `space125` in `token-index/components.yaml` L228–232; `space.inset.100` and `space.inset.150` in `semantics.yaml`, and no `space.inset.125`.)

## 3. Item 2 — Core Goals points to it (Thurgood's file)

### Site 2: `.kiro/steering/core-goals.md` L61–76 → one pointer line (6(ii), ruled)

**Before** (L61–76, at `1eced6cd5`):
> **For detailed governance**, query Token Governance via MCP:
> ```
> get_section({ path: "token-governance", heading: "Token Selection Matrix" })
> get_section({ path: "token-governance", heading: "Token Usage Governance" })
> ```
>
> **Token Selection Priority (MUST follow this order):**
> 1. **Semantic tokens** — purpose-built for specific use cases (e.g., `color.contrast.onAction` for content on action-colored backgrounds, `space.inset.100` for inset padding)
> 2. **Primitive tokens** — when no semantic token exists, check if a primitive token provides the needed value
> 3. **Component tokens referencing primitives** — when a component needs a semantic name but the value exists as a primitive, create a component token that references the primitive (e.g., `buttonicon.inset.medium = space125`)
> 4. **Hard-coded values** — only as last resort, requires user approval
>
> **Component Token Construction Rule:**
> Component tokens must either reference an existing primitive token OR conform to how that primitive token family's values are defined. Never introduce arbitrary values at the component level that don't align with the underlying token family's value system.
>
> **Why semantic first?** Semantic tokens are self-documenting, theme-aware, and encode design intent. Using `space.inset.100` instead of `space100` makes code readable and maintainable.

**After, F-3 (A)** (one line):
> **Token selection**: the one order is Token Governance § "Token Selection Matrix"; query it before you choose a token: `get_section({ path: "token-governance", heading: "Token Selection Matrix" })`. *(Amended <ratification date> by ballot 2026-10-25-token-selection-order-one-rule, item 2; prior text at `1eced6cd5`.)*

**After, F-3 (B)**: L73–74 (the construction rule, heading and sentence) kept verbatim above the same pointer line; site 1c's insert is dropped.

Unchanged: L49–59 except the two lines below, and L78–87. L84–87 ("For detailed token guidance, see") stay: they name Token-Governance and the Component Development Guide's framework, and site 4 makes that framework the component-side how-to of the matrix, so L87 stays true.

- **L58, F-1 (b) only.** Before: `- **Component tokens**: Requires explicit human approval before use`. After: `- **Component tokens**: Use freely inside the component they belong to, for the property they were made for; any other use requires explicit human approval`. *(Thurgood's text as Core Goals owner. It joins the measure's "Use freely inside the component they belong to; another component's token requires explicit human approval" with the bound in Ada's 6(i) consult, "for the property it was made for". Ada R1: "Core Goals L58 is better than my consult's line (it carries the property bound and 'any other use')".)*
- **L51, F-2 (B) only.** Before: `- **MUST** use semantic tokens first — only use primitive tokens when no semantic token exists for the use case`. After: `- **MUST** use semantic tokens first, except a component's own token inside that component — only use primitive tokens when no semantic token exists for the use case`. *(Thurgood's text; Ada R1: "L51 under (B) is acceptable".)*

## 4. Item 3 — follow-on sites (owners' text)

### Site 3: `canonical/agents/lina.md` L499–504 (Lina's text)

Heading L499 stays, so the anchor and the unit key `#token-selection-priority-must-follow-this-order` are unchanged.

**Before** (L501–504):
> 1. **Semantic tokens** — purpose-built for specific use cases (e.g., `color.contrast.onAction` for content on action-colored backgrounds, `space.inset.100` for inset padding). Use freely. Verify semantic correctness.
> 2. **Primitive tokens** — when no semantic token exists. Requires prior context (spec docs reference it) or Peter's acknowledgment.
> 3. **Component tokens referencing primitives** — when a component needs a semantic name but the value exists as a primitive. Requires explicit human approval before use.
> 4. **Hard-coded values** — only as last resort. Requires user approval. Always flag these.

**After, pointer form** (Lina recommends; the same under F-1 (a) and (b), and under F-2 (A) and (B)):
> Token selection has one order, and it lives in Token Governance § "Token Selection Matrix". Query it before you choose a token: `get_section({ path: "token-governance", heading: "Token Selection Matrix" })`. This charter does not restate it.
>
> When nothing in that order fits, the step is a checkpoint with Peter and a hand-off to Ada (§ "When a Token Is Missing"); you never create a token, or hard-code a value, to finish the selection.

(Lina: the second paragraph keeps the one rule that is hers, not creating a token, and not hard-coding a value, to make a selection work, under the MUST heading. It states no order, so it cannot drift from the matrix. The hard-code half was added at R3 on Lina R2 (c); it matches Ada's site 6 wording.)

**Verbatim fallback: struck at R2** (Stacy R1, M-1). It was a second, ambient copy of the order in a charter, offered "only if Peter wants the steps ambient for Lina", and so an unlisted fork. Lina's R1 wrote its F-2 (B) variants but gives no reason to keep it, and her own pick is the pointer form above; 6(ii) ruled that the order is stated once, and a charter copy would be the drift this ballot removes. Her fallback texts stay in her R1 entry (§ 12). Bringing it back would be a fourth fork, which this ballot does not carry.

*Resolved at R3 (Lina R2 (c))*: the hard-code half is in the second paragraph, one phrase, so L504's content survives in the matrix's step 4 (through the pointer) and in her charter's second paragraph, and her `priority-no-creation` item covers both halves. -- [THURGOOD R3]

L506–507 (her construction rule) and L509–516 (§ "When a Token Is Missing", including L516's routed-query sentence) are unchanged under every option; no route is added.

### Site 4: `governance/Component-Development-Guide.md` § "Token Selection Decision Framework" (L142–214) and two adjuncts (Lina's text)

The section heading L142 is unchanged (Lina's route `token-selection-framework` resolves to it). Four H3 headings change, so the two "WHEN … THEN read" lines that name them change in the same PR (adjunct A).

**Before** (L142–214; structure, text at `1eced6cd5`): Step 1 "Check Semantic Tokens First" (L144–155); Step 2 "Use Primitives Only When Unavoidable" (L157–165: "use primitives and document why", no acknowledgment named); "What If Tokens Don't Exist?" (L167–178: "Pause and ask", primitive as the fallback named); **Step 3 "Create Component-Level Tokens for Variants"** (L180–207: "create component-level tokens", no checkpoint; its example `// ButtonCTA/tokens.ts` / `buttonCTATokens` is a file that does not exist, in a plain-object shape the repo does not use); Step 4 "Propose Semantic Token Elevation" (L209–214).

**After** (replaces L142–214):

> ## Token Selection Decision Framework
>
> The selection order is Token Governance § "Token Selection Matrix". This section is the component-side how-to for each step; its steps follow that order, number for number, and change in the same PR when it changes.
>
> ### Step 1: Check Semantic Tokens First
>
> **ALWAYS start by reading semantic token files** to see what exists:
> - `src/tokens/semantic/ColorTokens.ts` - Brand, status, text, surface colors
> - `src/tokens/semantic/TypographyTokens.ts` - Body, heading, UI, specialized text
> - `src/tokens/semantic/SpacingTokens.ts` - Layout and inset spacing
> - `src/tokens/semantic/ShadowTokens.ts` - Elevation shadows
> - `src/tokens/semantic/index.ts` - Complete semantic token exports
>
> **Example**: Button needs text color
> - ❌ DON'T: Use primitive `cyan300`
> - ✅ DO: Read `ColorTokens.ts`, find `color.action.primary`
>
> ### Step 2: Use the Component's Own Token for the Property
>
> **If the component you are building has a token for this property, use it.** Component tokens live with their component: `src/components/core/<Component>/*.tokens.ts` (e.g. `Button-Icon/buttonIcon.tokens.ts`).
>
> **Example**: Button-Icon medium needs a 10px inset.
> - ❌ DON'T: reach for a primitive or hard-code `10px`
> - ✅ DO: check semantic tokens (no `space.inset.*` token is 10px), then use `buttonicon.inset.medium` (references `space125`), which `buttonIcon.tokens.ts` defines and the web CSS reads as `var(--buttonicon-inset-medium)`
>
> A component token belongs to the component it is named for. Another component's token is not a selection step; using one goes to Step 4.
>
> [F-1 (a):] **Checkpoint first** unless the spec names the token: "This component needs [value]. Semantic tokens checked: [why insufficient]. Existing component token: [name]. Recommendation: use it. Awaiting your approval."
> [F-1 (b):] **No checkpoint inside the owning component.** A human approved the token when it was created; use it as the spec and the contract describe.
>
> ### Step 3: Use Primitives Only When Unavoidable
>
> **If no semantic token and no token of the component's own fits**, use a primitive **with prior context (the spec names it) or Peter's acknowledgment**, and document why:
> - Read `src/tokens/*.ts` to find the appropriate primitive
> - Add a comment explaining why no semantic token exists
> - Consider proposing semantic token elevation if a pattern emerges
>
> **Example**: Custom brand color not in semantic tokens
> - ✅ OK: Use `purple300` with comment: `// TODO: Evaluate for semantic token elevation`
>
> ### Step 4: Nothing Fits — Stop and Ask
>
> **When you need a token that no step above supplies:**
>
> 1. **Pause and ask**: "I need [token] for [use case]. I checked semantic tokens, this component's own tokens and primitives: [why each is insufficient]. Options: a component token, a new primitive, a new semantic token, or, as the last resort, a hard-coded value. Which?"
> 2. **Document the gap**: Add to the design doc's "Token Gaps" section
> 3. **Never assume**: Don't assume a primitive or a hard-coded value is an acceptable fallback
> 4. **Wait for guidance**: Peter decides. Token creation is never part of selection and is not yours to do: the decision goes to Ada (Token Creation Governance)
>
> **Why this matters**: Token gaps often indicate design system opportunities. Pausing prevents premature decisions and helps the design system evolve intentionally.
>
> **For strategic guidance on token resolution**, see [Token Resolution Patterns](token-resolution-patterns)
>
> ### After the Decision: Component Tokens for Variants *(not a selection step)*
>
> **If the decision in Step 4 is a component token**, Ada creates it; you consume it afterwards as Step 2.
> - Reference: `.kiro/specs/responsive-layout-system/component-sizing-token-guide.md`
> - A component token references an existing primitive or conforms to that family's values: [F-3 (A):] Token Governance § "Component Token Construction Rule" / [F-3 (B):] Core Goals § "Component Token Construction Rule"
> - Never use hard-coded values
>
> **Example**: Button-Icon inset variants (`src/components/core/Button-Icon/buttonIcon.tokens.ts`)
> ```typescript
> export const ButtonIconInsetTokens = defineComponentTokens({
>   component: 'ButtonIcon',
>   family: 'spacing',
>   tokens: {
>     'inset.medium': {
>       reference: spacingTokens.space125,
>       reasoning: 'Medium button variant uses 10px padding (1.25× base strategic flexibility token) for compact appearance while maintaining adequate touch area',
>     },
>     // 'inset.large' → space150, 'inset.small' → space100
>   },
> });
> ```
>
> ### After the Decision: Propose Semantic Token Elevation *(not a selection step)*
>
> **If 3+ components use same pattern**, propose semantic token elevation:
> - Document the pattern in component completion notes
> - Suggest semantic token name and structure
> - Reference component-sizing-token-guide.md for elevation criteria

(Verified at `1eced6cd5`: `buttonIcon.tokens.ts` L55–65 defines `ButtonIconInsetTokens` with `component: 'ButtonIcon'`, `family: 'spacing'`, `'inset.medium'` → `spacingTokens.space125`; `ButtonIcon.web.css` L76 reads `var(--buttonicon-inset-medium)`.)

**After, F-2 (B)** (Lina R1; it replaces the Step 1 and Step 2 blocks of the After-text above, and Steps 3 and 4 differ only in the lines named below it). "This property" has one test under F-1 (b) and F-2 (B): "the property named by the token's name and its `reasoning` field" (Lina R1).

> ### Step 1: Use the Component's Own Token for the Property
>
> **Read the component's token file first** (`src/components/core/<Component>/*.tokens.ts`, e.g. `Button-Icon/buttonIcon.tokens.ts`). **If it has a token for this property, use it, even where a semantic token has the same value.** "This property" is the one the token's name and its `reasoning` field say it was made for; a token for another property is not this step.
>
> **Example**: Button-Icon small needs an 8px inset.
> - ❌ DON'T: use `space.inset.100` because it is also 8px; that splits one inset family across two tiers
> - ✅ DO: use `buttonicon.inset.small` (references `space100`), as `inset.medium` and `inset.large` do
>
> A component token belongs to the component it is named for. Another component's token is not a selection step; using one goes to Step 4.
>
> [F-1 (a):] **Checkpoint first** unless the spec names the token: "This component needs [value]. Existing component token: [name], made for this property. Recommendation: use it. Awaiting your approval."
> [F-1 (b):] **No checkpoint inside the owning component.** A human approved the token when it was created; use it as the spec and the contract describe.
>
> ### Step 2: Check Semantic Tokens First
>
> **For a property the component has no token of its own for**, read the semantic token files to see what exists:
> - `src/tokens/semantic/ColorTokens.ts` - Brand, status, text, surface colors
> - `src/tokens/semantic/TypographyTokens.ts` - Body, heading, UI, specialized text
> - `src/tokens/semantic/SpacingTokens.ts` - Layout and inset spacing
> - `src/tokens/semantic/ShadowTokens.ts` - Elevation shadows
> - `src/tokens/semantic/index.ts` - Complete semantic token exports
>
> **Example**: Button needs text color
> - ❌ DON'T: Use primitive `cyan300`
> - ✅ DO: Read `ColorTokens.ts`, find `color.action.primary`

Under F-2 (B), Step 3 (primitives) opens "**If no token of the component's own and no semantic token fits**"; Step 4 item 1 lists "this component's own tokens, semantic tokens and primitives", in that order; and "After the Decision: Component Tokens for Variants" says "you consume it afterwards as Step 1" (Lina R1).

**Site 4 is a dependent copy** (Stacy R1, M-2). Its Steps 1–4 are numbered in the matrix's order, so they copy the order by nature, and F-2 (B) swaps both: site 1a's steps 1 and 2 and this site's Step 1 and Step 2 blocks, in the same PR. § 11 step 6's sweep checks that the two orders match after application.

*Resolved at R3 (Lina R2 (a), (b))*: the section's sentence is the final wording above ("its steps follow that order, number for number, and change in the same PR when it changes"), which reads with M-2 (a dependent copy). "Semantic tokens checked" is dropped from the (B) Step 1 checkpoint (Lina's replacement checkpoint text above); under (A) the line stays in Step 2 (Step 2 of the (A) text is where semantic is checked first). -- [THURGOOD R3]

**Adjunct A** (L43 and L48, § "WHEN creating component-level tokens / semantic tokens THEN read"):
- L43 before: `1. ✅ **Step 3: Create Component-Level Tokens for Variants**` → after: `1. ✅ **After the Decision: Component Tokens for Variants**`
- L48 before: `1. ✅ **Step 4: Propose Semantic Token Elevation**` → after: `1. ✅ **After the Decision: Propose Semantic Token Elevation**`

**Adjunct B** (L261, § "System-Specific Terminology Glossary"; outside L142–214, so the site is widened to it):
- Before: `- **Location**: Within component directory (e.g., `ButtonCTA/tokens.ts`)`
- After: `- **Location**: Within component directory (e.g., `Button-Icon/buttonIcon.tokens.ts`)`

**Not in this site**: § "Component Token Files" (about L562–600, a third `buttonCTATokens` copy teaching a token-reference map). It teaches a different thing and goes to a rule-10 record, Lina's to file (§ 4, "Not edited").

### Site 5: `governance/Web-Authoring-Standards.md` L106 and L386 (Lina's text; Sparky consulted on L106)

**L106** (in § "Hard Rules" → "3. Token Priority"; inside Sparky's ambient embed):
- Before: `**Note**: This priority chain is Sparky's decision tree for screen CSS. Lina follows Core Goals' token selection priority which includes component tokens. Component tokens are not part of Sparky's workflow.`
- After (the same under every option; Lina R1, replacing her drafted sentence, whose "the component-side order" implied two orders): `**Note**: This priority chain is Sparky's decision tree for screen CSS: the one order in Token Governance § "Token Selection Matrix", with the component step removed because screens have none. Lina follows that order whole, including a component's own token. Component tokens are not part of Sparky's workflow.`

**L386** (§ "Related Documentation"; outside the embed):
- Before: `- **Core Goals.md** — System token priority (semantic → primitive → component)`
- After: `- **Token-Governance.md** § "Token Selection Matrix" — The token selection order (Core Goals points to it)`

Sparky's asserted string ("These are non-negotiable. Every CSS file — component or screen — must follow these rules.", L34) is outside both hunks. **Sparky consult: answered** (Sparky R1): the drafted L106 sentence is "true of my workflow"; his chain is a specialisation (§ 1); his pinned string is outside both hunks, so regeneration only, no act. Lina's replacement above states his own reading in his embed; he reads its bytes in the bytes-only R2. Lina asked Stacy to check that Product-Token-Governance states the checkpoint Sparky's sentence relied on; Ada checked it (it does not, § 1), and the filer re-read PTG L56–80 at `fa8aa254f` and agrees.

### Site 6: `.cursor/rules/tokens.mdc` L9–14, L22 under F-1 (b), and L41–42 (Ada's text, R1; **needs a grant**; Ada applies)

`.cursor/rules/**` is in no seat's standing write scope, so the application grant (Peter's ratification, or a grant record before the application PR) names the file and its applying seat (the 2026-09-19 counter-argument ballot's B1 precedent edited `.cursor/rules/designerpunk-core.mdc`). **The applying seat is Ada**, from her own text below (R1; "HEAD of the file unchanged by #472"). `.cursor/` is not a governance path, so her charter's rule against writing `governance/` files (`canonical/agents/ada.md` L384) does not reach this site; it does reach item 1 (§ 6, "Grants"). The two `get_section` paths, which are legacy `.kiro/steering/` forms rather than doc ids, are corrected in the same hunk; today they resolve only through the transition-only legacy-path manifest (`mcp-server/src/legacy-path/legacy-path-manifest.ts` L44, L144).

**`.cursor/rules/components.mdc` L28** (Lina R1, finding 3) carries the same legacy path for the Component Development Guide. **Not added to this site; filed as a rule-10 record** in the R2 commit, `.kiro/issues/2026-10-25-cursor-rules-legacy-steering-paths.md` (owner Thurgood). Reason: it is one line of a class. The same legacy form sits in eleven `get_section` lines across four `.cursor/rules` files at `fa8aa254f` (`components.mdc` L28, L33, L34; `specs.mdc` L19, L24, L29, L30; `tests.mdc` L43, L44; and this site's L41–42), and `components.mdc` L33–34 do not resolve at all (no manifest entry for `Component-Quick-Reference.md`). Fixing L28 here would leave nine lines of the class, and a ballot is not where a path class is fixed; one PR over the four files is.

- L9–14 before:
  > ## Token Selection Priority (MUST follow this order)
  >
  > 1. **Semantic tokens** - purpose-built for use cases (e.g., `tapAreaRecommended`, `color.contrast.onPrimary`)
  > 2. **Primitive tokens** - when no semantic token exists
  > 3. **Component tokens referencing primitives** - when component needs semantic name but value exists as primitive
  > 4. **Hard-coded values** - LAST RESORT, requires user approval

  After:
  > ## Token Selection
  >
  > The one token-selection order is Token Governance § "Token Selection Matrix". Query it before you choose a token (see "For Detailed Guidance" below); this file does not restate it. When nothing in it fits, stop and ask the human; never create a token, or hard-code a value, to finish a selection.

  (Ada R1. It replaces the heading and the four steps; the blank lines at L8 and L15 stay. It adds "ask the human" for the hard-coded case and drops the MUST heading, because the order is no longer stated here.)
- L22, F-1 (b) only. Before: `| Component tokens | Requires explicit human approval |`. After: `| Component tokens | Use freely inside the component they belong to, for the property they were made for; any other use requires explicit human approval |`
- L41–42 before: `get_section({ path: ".kiro/steering/Token-Governance.md", heading: "Token Selection Matrix" })` / `get_section({ path: ".kiro/steering/Component-Development-Guide.md", heading: "Token Selection Decision Framework" })`. After: `get_section({ path: "token-governance", heading: "Token Selection Matrix" })` / `get_section({ path: "component-development-guide", heading: "Token Selection Decision Framework" })` (the two doc ids, read from each file's frontmatter `id:`).

L25–31 (the Component Token Rule copy) is unchanged under both F-3 options (Ada R1).

### Site 7: `canonical/agents/ada.md` L389 — F-1 (b) only (Ada's text)

- Before: `Your token-governance autonomy levels (semantic freely / primitive with prior context / component with explicit approval / creation always human-reviewed) are delivered as ambient law — see the Ambient section's `token-governance` embed; apply them as written there.`
- After, F-1 (b): `Your token-governance autonomy levels (semantic freely / primitive with prior context / component freely inside its own component, another component's token with explicit approval / creation always human-reviewed) are delivered as ambient law — see the Ambient section's `token-governance` embed; apply them as written there.`
- Under F-1 (a): unchanged. Ada's charter has no "Token Selection Priority" restatement (`grep -n -i priority canonical/agents/ada.md` → none); L314's hierarchy line is the reference hierarchy, not the order, and does not move.

### Site 8: `governance/Product-Token-Governance.md` L77 (Ada's file and text; found at R2 by the filer; Ada's after-text replaced the filer's at R2)

Found by the filer at R2 while checking Ada's § 1 correction. L77, in § "System-First Value Selection" → "The Workflow" step 2, sends the reader to Core Goals for the order: "Check semantic tokens first per Core Goals token priority." After site 2 Core Goals states no priority, so the sentence points at nothing. § 11 step 6's patterns did not catch it ("Core Goals token priority"); step 6 now does.

- Before: `2. **Query system tokens (semantic first, then primitives)** — `search_tokens({ family: "opacity" })` or `get_token_family({ family: "opacity" })`. Check semantic tokens first per Core Goals token priority.`
- After (Ada R2 (a), replacing the filer's proposal; the same under every option, since product tokens have no component step and F-2 does not reach it). Whole L77:

```
2. **Query system tokens (semantic first, then primitives)** — `search_tokens({ family: "opacity" })` or `get_token_family({ family: "opacity" })`. Check semantic tokens first, then primitives, in the order of Token Governance § "Token Selection Matrix"; step 5 below decides `ref:` or `value:`.
```

Ada's reason (R2): the filer's line "drops the one thing the old sentence carried". Product tokens have no component step, and the Matrix's step 4 STOP is a creation rule that Core Goals L59 and Token-Governance L186 already answer for product authors, so pointing the lookup at the Matrix and leaving that question alone keeps the meaning. The heading, the tool calls and the L68 pin are untouched. The section is a retained ambient embed in Sparky's, Kenya's and Data's charters (`ambient[product-token-governance#system-first-value-selection]`, retained in each consumer dispositions file), so the hunk is regeneration only, no act; the pinned `mustContain` sentence (L68, "If a system token (semantic or primitive) exists within perceptual tolerance of your intended value, use `ref:` instead.") is outside it.

### Not edited, and why

- `governance/Component-Development-Guide.md` § "Component Token Files" (~L562–600): a different teaching (a token-reference map); **a rule-10 record, Lina to file**.
- `src/build/tokens/TokenSelector.ts` L4–9, `TokenSelection.ts` L27–30, `TokenIntegrator.ts` L5/L61, `src/build/errors/ErrorDocumentation.ts` L260, `ErrorReporter.ts` L278: code and messages that encode Core Goals' old order. Not a governance path and not a registered instrument; **a rule-10 record, owner Ada** (walk record § "Row 6", L362). `src/build` is in no seat's standing scope.
- `tests/onboarding-trio/fixtures/born-{cc,kiro}/**`: frozen captures of past runs, evidence, not readers.
- `canonical/_consumer-output/**`, `.claude/agents/**`, `.kiro/agents/**`: generated; regenerated at application.
- Ledgers that cite Core Goals L73–74 (`.kiro/issues/2026-10-24-component-token-custom-values-unvalidated.md` L14): a dated append under F-3 (A), never a rewrite.
- `.kiro/steering/core-goals.md` L84–87: unchanged (§ 3).
- `.cursor/rules/{components,specs,tests}.mdc` (eleven legacy `get_section` paths, with this ballot's L41–42): **a rule-10 record, filed by Thurgood in the R2 commit**, `.kiro/issues/2026-10-25-cursor-rules-legacy-steering-paths.md` (§ 4, site 6).
- Core Goals L59 ("Creating ANY token: Always requires human review") read against product-token authoring, where platform agents add product tokens with review by audit (Ada R1, § 1): **a rule-10 record, Ada's, Leonardo consulted, filed in this PR** (`.kiro/issues/2026-10-25-core-goals-l59-vs-product-token-authoring.md`; she commits it after R3). It predates this ballot and this ballot does not change either text.
- `governance/Process-Spec-Planning.md` L1732, L2106 ("### Decision 2: Token Selection Priority") and L2259: a worked example of a completion document for a past build-system TokenSelector ("semantic > primitive"). It records that implementation's decision, not the order, and it is true under both F-2 options outside an owning component. Not edited; an expected hit of § 11 step 6's sweep.

## 5. Census

`governance/Token-Governance.md`, `.kiro/steering/core-goals.md`, the Component-Development-Guide, Web-Authoring-Standards and Product-Token-Governance, and `canonical/agents/{lina,ada}.md` are each loaded by registered instruments (condition 1). No item names an instrument code change.

**Condition 2 (added at R2, Stacy R1 B-1).** Two more registered instruments are presumptively in scope because their rows' `education` cites edit-site files as the law they teach: `no-autonomous-token-creation` (cites `core-goals.md:55-59`, `Token-Governance.md:180-186` and "Component Development Guide's token-selection framework", and `canonical/agents/ada.md`) and `no-hardcoded-color` (cites `core-goals.md:50/:53/:71`, `Component-Development-Guide.md:183`, `canonical/agents/lina.md:459`, `ada.md:326` and `Web-Authoring-Standards.md:92/:235/:361/:373`). Neither instrument's code cites an edit site. Each line below rests on the code at `fa8aa254f`: the 17 suites in the `no-autonomous-token-creation` barrier `checks[]` (the same 17 paths as the `src/tokens/**` entries of `.github/in-lane-guards.json`) import only token modules and types (`../OpacityTokens`, `../../types/PrimitiveToken`, `require('../index')` and the like) and call no `readFileSync`, `readdirSync` or doc path (`grep -l -E "readFileSync|readdirSync|governance/|steering|core-goals|\.md['\"]|canonical/|\.cursor"` over the 17 → none); the 7 `*.stemma.test.ts` assertions of `no-hardcoded-color` read only their own component's `platforms/web/*.web.ts` (`WEB_COMPONENT_PATH`, `fs.readFileSync`), and `src/validators/StemmaTokenUsageValidator.ts` reads only the source it is given (L570) and names one doc, `.kiro/steering/stemma-system-principles.md`, in an `@see` comment (L9), which is not an edit site. Their education citations do go stale, and § 11 step 5 re-points them with a register history entry.

Item 1 (Token Governance):
- `**Census**: not in scope — check-section-citations (scripts/check-section-citations.ts, citing roots governance/, .kiro/steering/, canonical/) — no cited heading is renamed or removed ("Token Selection Matrix", "Token Usage Governance", "Component Token Usage", "Token Creation Governance", "Decision Examples" keep their text); the item adds one H3 (F-3 (A)) and no get_section / get_document_* citation`
- `**Census**: not in scope — 122-canonical-vs-truth (governanceAsLaw mustContain over the asserted sections) — Ada's two asserted strings, "freely use semantic concept tokens" (L100) and "Creating ANY token (semantic, primitive, or component) requires human review" (L186), are outside every hunk and unchanged`
- `**Census**: not in scope — 122-sweep-1-refs (route resolution over canonical/agents/*.md) — every routed heading on token-governance (Lina's token-usage-law → "Token Usage Governance"; Ada's theme-registry-law → "Theme Registry (Spec 094)") keeps its text`
- `**Census**: not in scope — 122-diff-guard (tools/agent-generator/diff-guard.ts; governance/ is an input-closure root) — an ordinary closure input; the Ada embed's rendered text changes (§ 6), which is regeneration, not a verdict change of the instrument; the lock is refreshed at application`
- `**Census**: not in scope — no-autonomous-token-creation (the 17 family-integrity suites in lane-functional-root, each registered in .github/in-lane-guards.json; check_state armed) — in scope by condition 2 only (education cites Token-Governance.md:180-186); the suites import token modules and types and read no file at fa8aa254f, so no edited doc is an input and no verdict can change; the cited lines were already two off after #472 (the section is L182-188) and site 1a moves them further; § 11 step 5 re-points the citation to § "Token Creation Governance"`

Item 2 (Core Goals):
- `**Census**: not in scope — check-section-citations (scripts/check-section-citations.ts; .kiro/steering/ is a citing root) — no instrument change; the hunk removes two citations (L63–64) and adds one (token-governance § "Token Selection Matrix", a served doc and a heading site 1a keeps), which the application run reads as resolving`
- `**Census**: not in scope — 122-diff-guard (tools/agent-generator/diff-guard.ts, with the operative-set freshness sweep) — no instrument change; the sweep will report core-goals #development-practices stale (and, through the consumer copy, its signature), which are the owed acts of § 6, not a verdict change of the instrument`
- `**Census**: not in scope — verify-signing-chain --ci (tools/agent-generator/regrounding/verify-signing-chain.ts, a step of 122-diff-guard) — no instrument change; the § 6 re-sign commits are its inputs at application, checked by links 1–3 as written`
- `**Census**: not in scope — no-autonomous-token-creation (the 17 family-integrity suites) — condition 2 only (education cites core-goals.md:55-59, the autonomy ladder); the suites read no doc (item 1's line); L55-59 keep their numbers because site 2 lies below them, and under F-1 (b) L58's component rung changes text, which § 11 step 5's history entry records`
- `**Census**: not in scope — no-hardcoded-color (the 7 per-component stemma assertions 'should not have hardcoded color values' over src/validators/StemmaTokenUsageValidator.ts, lane-functional-root; check_state dormant) — condition 2 only (education cites core-goals.md:50/:53/:71); each assertion reads only its component's platforms/web/*.web.ts and the validator reads no doc at fa8aa254f, so no verdict can change; L50 and L53 are unchanged, and site 2 removes :71 (the ladder's hard-coded step), whose content moves to Token-Governance § "Token Selection Matrix" step 4; § 11 step 5 re-points the citation`

Item 3 (follow-on sites):
- `**Census**: not in scope — check-section-citations — sites 3, 5, 7 and 8 rename no heading, and site 8 adds no get_section citation; site 4 renames four H3 headings of Component-Development-Guide (Step 2, "What If Tokens Don't Exist?" → Step 4, Step 3 and Step 4 → "After the Decision: …"; five under F-2 (B), where "Step 1: Check Semantic Tokens First" becomes Step 2 and Step 1 is new), and no citation in a citing root names them (git grep at 1eced6cd5: hits only in .kiro/specs/021-mcp-documentation-server/ history, the mcp-server README example and mcp-server test mocks, none in governance/, .kiro/steering/ or canonical/); the L43/L48 lines that name two of them change in the same hunk (adjunct A); the citations the sites add target token-governance § "Token Selection Matrix", which site 1a keeps`
- `**Census**: not in scope — 122-sweep-1-refs — Lina's routes token-usage-law ("Token Usage Governance") and token-selection-framework ("Token Selection Decision Framework", the H2 site 4 keeps) keep their target headings`
- `**Census**: not in scope — 122-canonical-vs-truth — Sparky's asserted string in Web-Authoring-Standards § "Hard Rules" (L34) is outside site 5's hunks; the product-token-governance pin asserted by Sparky's, Kenya's and Data's charters (§ "System-First Value Selection", L68) is outside site 8's L77 hunk`
- `**Census**: not in scope — 122-diff-guard / verify-signing-chain --ci — no instrument change; the stale units sites 3 and 7 produce are § 6's owed acts`
- `**Census**: not in scope — no-autonomous-token-creation (the 17 family-integrity suites) — condition 2 only (education cites the Component Development Guide's token-selection framework, site 4, and canonical/agents/ada.md, a file site 7 edits at L389 under F-1 (b)); the suites read no doc; site 4 strengthens the cited framework (its old Step 3 created component tokens with no checkpoint; the new Step 4 stops and hands the decision to the human and creation to Ada), and the cited ada.md L11 and L14-27 lie outside site 7`
- `**Census**: not in scope — no-hardcoded-color (the 7 per-component stemma assertions) — condition 2 only (education cites Component-Development-Guide.md:183, canonical/agents/lina.md:459, ada.md:326 and Web-Authoring-Standards.md:92/:235/:361/:373); the assertions read no doc; site 4 moves "Never use hard-coded values" (L185 at fa8aa254f) into "After the Decision: Component Tokens for Variants"; site 3's pointer form removes the cited lina.md clause (now L504, "Hard-coded values — only as last resort. Requires user approval. Always flag these."), whose content lives on in Token-Governance § "Token Selection Matrix" step 4, reached through her pointer; site 5 edits WAS L106 and L386 only, and ada.md L326 lies outside site 7; § 11 step 5 re-points the citations and records the removal`
- Site 6 (`.cursor/rules/tokens.mdc`): no registered instrument reads `.cursor/`, and no row's education cites it; no census line is owed (not presumptively in scope).

*(Filer's correction to the measure: its item-3 census line read "sites 3–5 and 7 rename no heading", which Lina's site-4 text makes false. The line above replaces it; the census reader reads the replacement.)*

## 6. Re-sign consequences and who acts (owed with the edit, never by hand)

**The seat-object boundary** (Spec 123 design C1/C16; the #472 precedent): the operative-set items, the overlay units and every dispositions-row field except its signature are the **profile author's** (Thurgood's) authoring acts; a seat's acts are its re-confirmation (the confirmation sub-object and its sheet section, where the confirmer may correct the item set, as Stacy did for Core Goals, 21 → 23) and its re-signature. A seat's own charter line is applied by Thurgood **byte for byte** from the seat's text, because the seat's authoring commit would stale the unit it then confirms (six-roots ballot errata (f)). In #472 this was `46ae0efda` (Thurgood re-quoted Core Goals', Kenya's, Data's and Lina's items) and `3071015d2` (Thurgood re-grounded the four overlays), then each seat's confirm and sign.

| Signed / retained unit | Moves under | Acts |
|---|---|---|
| Core Goals `#development-practices` (`canonical/operative-sets/core-goals.yaml` L52–147; owner Thurgood, confirmer Stacy) | always | **The second re-sign in two days**: #472 re-confirmed (`e73a4fc1b`) and re-signed (`3c7a41c1d`) this unit on 2026-10-25, the outcome Ada's co-owner line foresaw if the served-docs PR merged first. Thurgood re-authors the items: `token-governance-query` and `practice-15`…`practice-18` go; one pointer item is added (`token-selection-pointer`, kind obligation, text = the pointer line); `construction-rule` goes under F-3 (A); `practice-13` is re-authored under F-1 (b); `practice-8` is re-authored under F-2 (B). Stacy re-confirms (C16) in `canonical/profiles/consumer/confirmations/core-goals.md` § `#development-practices`; its ruling that `practice-15` carries "MUST follow this order" so a reordering is detected retires with the item, and the pointer item carries the order's only home instead |
| Core Goals consumer row `#development-practices` (`canonical/profiles/consumer/always-set/core-goals.dispositions.yaml` L9, re-pointed, signer Stacy) and its overlay unit (`always-set/core-goals.overlay.md` L23) | always | Thurgood re-renders the overlay unit. **The amendment pointer is subtracted** (decided at R2, Stacy R1 item 5): the row gains a fourth removal, `{"text": " *(Amended <ratification date> by ballot 2026-10-25-token-selection-order-one-rule, item 2; prior text at `1eced6cd5`.)*", "cites": "subtraction-2"}` (the leading space included, so the rendered pointer line ends at "…heading: "Token Selection Matrix" })`."), on the precedent of `canonical/profiles/consumer/always-set/ai-collaboration-principles.dispositions.yaml` L10, whose `#counter-argument-requirement` row removes the fold-back ballot's pointer under `subtraction-2`; a ballot path and a DesignerPunk commit SHA mean nothing in a consumer repo. The rendered overlay unit then reads the pointer line without it. The row's three existing removals quote text outside the hunk and stand. Stacy re-signs (C1), `canonical/profiles/consumer/signatures/core-goals.md` § `#development-practices` |
| Lina `#token-selection-priority-must-follow-this-order` (`canonical/operative-sets/lina.yaml` L450–469; confirmer Lina; consumer row `canonical/profiles/consumer/lina.dispositions.yaml` L26, re-pointed, signer Lina; overlay `canonical/profiles/consumer/lina.overlay.md` L48) | always (site 3) | Also its second re-sign (#472: `137dd98c2` confirm, `d45e17e02` sign). Thurgood applies site 3 byte for byte, re-authors the items (the four `priority-*` items go; under the pointer form Lina proposes `priority-pointer`, obligation: query the matrix before choosing, and `priority-no-creation`, obligation: a missing token is a checkpoint and a hand-off, never created, and no value hard-coded, to finish a selection), and re-renders the overlay unit; the row's `removals` entry ("Peter") still quotes text in the pointer form and stands. Lina re-confirms and re-signs |
| Ada `#what-this-means-in-practice` (`canonical/operative-sets/ada.yaml` L284–307, item `practice-ambient-law`; consumer row `canonical/profiles/consumer/ada.dispositions.yaml` L19, re-pointed, signer Ada; overlay `canonical/profiles/consumer/ada.overlay.md` L67) | **F-1 (b) only** (site 7) | Thurgood applies L389 byte for byte, re-authors the item and re-renders the overlay unit. Ada re-confirms and re-signs |
| Ada `#in-scope` | does not move | none |
| Ada's ambient `token-governance` embed (§ "Token Usage Governance" + § "Token Creation Governance"; consumer rows retained) | always (sites 1b, 1c; the class-rule sentence under F-1 (b)) | Rendered text changes in `.claude/agents/ada.md`, `.kiro/agents/ada-prompt.md` and the consumer outputs. A retained embed carries no signature (`tools/agent-generator/regrounding/dispositions.ts` L34: an embed is never re-pointed): regeneration only, no act. *(Read from the dispositions rule; that the freshness sweep reports nothing for it is confirmed by the application run's sweep.)* Site 1a is outside the embed |
| Sparky's ambient `web-authoring-standards#hard-rules` (retained) | always (site 5, L106) | regeneration only, no act (Sparky R1 agrees) |
| Sparky's, Kenya's and Data's ambient `product-token-governance#system-first-value-selection` (retained in each consumer dispositions file) | always (site 8, L77; Ada kept the site with her own text, R2) | regeneration only, no act |

**Grants**: Thurgood's authoring acts above are outside his standing write scope. Peter's ratification names the files, or a grant record does before the application PR: `.kiro/steering/core-goals.md`; `canonical/operative-sets/{core-goals,lina}.yaml` (and `ada.yaml` under F-1 (b)); `canonical/profiles/consumer/always-set/core-goals.{dispositions.yaml,overlay.md}`; `canonical/profiles/consumer/lina.{dispositions.yaml,overlay.md}` (and `ada.*` under F-1 (b)); `canonical/agents/lina.md` L499–504 (and `canonical/agents/ada.md` L389 under F-1 (b)), byte for byte from the owner's text; `governance/classification-map.md`, the two rows' `education` and `history` fields only (§ 11 step 5; Thurgood applies, Ada consulted as both rows' owner); `canonical/generated.lock` and the generated roots, for the regeneration and the lock refresh. **Ada** applies item 1 (`governance/Token-Governance.md`), site 6 (`.cursor/rules/tokens.mdc`) and site 8 (`governance/Product-Token-Governance.md`); **Lina** applies sites 4–5 (`governance/Component-Development-Guide.md`, `governance/Web-Authoring-Standards.md`); each is named in the grant. **The grant overrides Ada's charter for the two `governance/` files she applies**: `canonical/agents/ada.md` L384 reads "You do NOT write to `.kiro/steering/` or `governance/` files", with no "unilaterally" (Lina's L557 and Thurgood's charter carry it). Her charter's own process (L377–380, "**Apply**: If approved, apply precisely as approved") is what a ratification is, and Peter's grant naming her as the applying seat is that approval (#472's squash message cites, as its authority for her governance-doc edits, Peter's direction "Fix all of them as the owners recommend"); the override is for the named files in the application PR only. `.cursor/rules/tokens.mdc` is not a governance path, so no override reaches it. Each seat's confirmation and signature sections are its own acts and need no grant (signing-act ballot M1).

## 7. Forks for Peter (none is picked here)

**Open for Peter**: F-1 = walk line 6(i). Inside the owning component, does using its own component token still need a checkpoint? **(a) Yes, waived when the spec names the token** (Ada's measure as drafted): today's rule kept, scoped to step 2; sites 1b (scope line, one format line) and 1d's checkpoint; Core Goals L58, Ada's L389, Lina's wording and `.cursor` L22 stay true. *Surviving counter*: when the spec is silent, an agent inside Button-Icon checkpoints to use Button-Icon's own token before it may use a lower-friction primitive. **(b) No checkpoint inside the owner, for the property the token was made for; another component's token, or an owner token for another property, only through step 4** (Lina: "I would argue no checkpoint inside the owner, with the checkpoint kept for another component's token", walk record L175; **Ada's 6(i) consult of 2026-10-25 also picks (b)**, "agreeing with Lina"): site 1b rewritten, Core Goals L58, Ada's L389 (one more signed unit), `.cursor` L22, about 2 more hours and one more re-sign. **Orchestrator's recommendation: (b), with the class rule "a use-time checkpoint applies only to a use not reviewed at creation"** (Ada's consult sentence: "A use-time checkpoint applies only where that use was not reviewed when the token was made", placed by site 1a's note). It covers every tier: semantic use stays free, primitive use stays gated (primitives are made for the system, not for one use), component tokens are gated at creation and at any use outside their owner. *Surviving counter (Ada)*: nothing proves the creation review happened. Older component tokens predate the creation rule and some were pre-authorized in bulk in specs, so no one reviewed each value, and nothing checks "the property it was made for"; with the use-time gate gone, the only check left is Stacy's claims pass, after the fact. (Ada R1: the attribution is true, and her counter is quoted correctly.) Your answer: (a) / (b) / (b) with the class rule.

**Open for Peter**: F-2 (found while drafting). Inside the owning component, does a fitting semantic token still beat the component's own token? Evidence that the ruled order misfires: `buttonicon.inset.small` references `space100`, and the semantic `space.inset.100` also references `space100`; Button-Icon reads its own token on every platform (`ButtonIcon.web.css` L77, `var(--buttonicon-inset-small)`). Read literally, step 1 fires for the small size, so the order calls shipped Button-Icon code wrong and splits one inset family across two tiers. **(A) As ruled**: semantic → own token → primitive → STOP; no extra effort. *Counter*: that misfire, in every component whose token shares a value with a semantic token. **(B) Inside the owning component, its own token for the property first; everywhere else, semantic first**: site 1a's steps 1 and 2 swap, Core Goals L51 gains "except a component's own token inside that component" (same unit, already re-signing), about 1 hour. *Counter*: "semantic first" stops being unconditional in always-loaded text, and a badly made component token shadows a good semantic one inside its component, where (A) would catch it. **Lina picks (B)**: "Inside its own component, the component's own token for the property should win … a human decided the semantic set did not cover this component"; her surviving counter, the shadowing, she answers at creation (the Step 4 checkpoint, the construction rule, her compliance tests). **Ada: no pick** (she found the defect and leaves it to Lina's read and yours). **Lina's stated cost of (B)** (R1): "Under (B) the always-ambient rule 'semantic first' is true only after a component-file read, so an agent that skips the component's token file takes the semantic token and misses step 1. That is the same salience loss the ballot accepts for Core Goals, and the only mitigation is the Step 1 text above ('read the component's token file first')." **Thurgood picks (B)**, as owner of Core Goals L51: under (A) the always-loaded order calls shipped, human-approved Button-Icon code wrong on the first component it meets, and a rule that misfires there teaches agents to read around it; L51's one clause keeps the line true. *What survives my pick*: Lina's cost, which no text removes, and the shadowing counter. Under (B), Example 7 becomes Button-Icon small (§ 2, site 1d). Your answer: (A) / (B).

**Open for Peter**: F-3. Where does the Component Token Construction Rule live once Core Goals' token section is a pointer? **(A) Moved verbatim to Token Governance § "Token Creation Governance"** (site 1c): step 4 cites it there; Ada's embed carries it and Lina's charter keeps its own copy (L506–507). *Counter*: every other seat and consumer loses it from always-loaded context; Core Goals L59 ("Creating ANY token: Always requires human review") stays always-loaded for them. **(B) Kept in Core Goals at L73–74**, the pointer replacing the rest. *Counter*: Core Goals stays a second home of component-token law; it is not the order, so it cannot contradict the matrix, but 6(ii)'s "pointer only" reads less cleanly. **Lina picks (A)**: "Only Ada and Lina create or consume component tokens, and both keep it ambient … The rule is creation law, and Token Creation Governance is where step 4 sends the creator." Ada drafted (A) and picks neither. **Thurgood picks (A)**, as owner of Core Goals L73–74: the rule is creation law; the two seats that create or consume component tokens keep it ambient (Ada's embed, which carries § "Token Creation Governance", and Lina's L506–507); and it leaves Core Goals' token section a pointer only, which is the plain reading of 6(ii). *What survives my pick*: every other seat, and every consumer, loses the rule from always-loaded text. If a consumer seat comes to author component tokens (Spec 128/129 scope), that spec's rounds decide where it reads the rule. Your answer: (A) / (B).

**Q-S, answered (R1; not a Peter fork)**. Sparky: (1) the L106 sentence is "true of my workflow"; (2) his chain is "a specialisation, not a second order", with one real difference: its last step is not the matrix's STOP. Lina agrees and replaced her L106 text to say "one order with a screen specialisation" (site 5). Ada corrected one clause of the sentence Sparky proposed for § 1 (it claimed a human checkpoint that Product-Token-Governance does not have) and named both differences; her wording is in § 1. No party disagrees on the substance, so Q-S goes to Peter only if Sparky rejects Ada's wording in the bytes-only R2.

## 8. Sequencing

1. **This PR files the DRAFT.** Its merge records the measure; it ratifies nothing and applies nothing.
2. **R1 and the bytes-only R2 are done** (Stacy required; Sparky, Ada, Lina; § 12). R2 passed with items (Stacy), and every owner read is answered: Ada (site 8 replaced, Example 7 (B), the (B)×(a) format, the 1b wording), Lina (site 4 sentence, site 4 checkpoint, site 3 hard-code half), Sparky (accepted as drafted). All are folded at [THURGOOD R3]; none was a fork. Nothing remains before Peter rules except his F-1, F-2 and F-3.
3. **Peter ratifies** in chat with his F-1, F-2 and F-3 answers; the receiving session commits the Status line first (record-first), with the README roll entry in the same commit.
4. **One application PR**, Peter-merged, in § 11's order: **authoring → regeneration → seat acts → lock refresh** (Stacy R1 B-2). A C1 signature's `renderedHash` is computed over the committed rendering, so no seat signs before the regeneration commit; #472 did the same (regeneration `94ce930bf` before its confirm and sign commits, lock `f218beb42` after them). The lock refresh is a second generator run, because the signatures land in dispositions rows, which are inputs to the closure the lock hashes.
5. **With the fix-now ballot** (`2026-10-24-ballot-audit-fix-now-law.md`, DRAFT): its item 4 re-signs Core Goals `#core-project-context`, a different unit with no shared before-text. Applied in one window, they share one regeneration and one lock refresh.
6. **Timing against S**: walk row 6 (P0) closes before S only if this ballot is ratified and applied before S. Otherwise it lapses at S and escalates (walk record L364).

## 9. Counter-argument (after fold-back)

**Run against the whole ballot**: the pointer-only Core Goals takes the order out of always-loaded context, so an agent that never pulls the matrix keeps L51 ("semantic first, primitive only when no semantic token exists") and L58 and never meets step 2. *Folded*: the pointer line says to query before choosing and names the exact `get_section` call; Lina, the one seat that consumes component tokens, keeps a pointer plus her no-creation rule in her charter; the matrix states that it is the only copy; step 2 is scoped to the owning component, which removes the old matrix's reading that any component token beats any primitive anywhere.

**What survives**:
1. **The salience loss is real** (6(ii)'s named cost, accepted by Peter's ruling): an agent that does not follow the pointer meets no order. L51 still keeps it from the worst mistake (primitive before semantic).
2. **F-2 is a defect in the ruled order**, not a style question. Ratifying F-2 (A) makes shipped Button-Icon code read as non-compliant.
3. **Two adjacent contradictions stay, and this ballot does not fix them**: Example 6 and the Creation Decision Matrix row "One-off value, doesn't fit math → Component token" (L228) against the construction rule; and `src/build`'s encoded old order. They go to rule-10 records, or into `2026-10-24-component-token-custom-values-unvalidated.md`, at Ada's call (walk record L363). *(A third the measure listed, Token Governance L85 "Component tokens should reference semantic tokens", was rewritten by #472 to "Component colors reference semantic tokens" and no longer contradicts the construction rule.)*
4. **Filer texts in owners' sites** (all read by their owners at R2, none left open): site 1a's F-2 (B) write-out was confirmed at R1; site 6 is Ada's own text; site 1d's (B) Example 7 was confirmed by Ada R2 (b); the dropped "Semantic concept tokens" line in site 1b's (B)×(a) format was confirmed by Ada R2 (c) and the matching line in site 4 dropped by Lina R2 (b); site 8's after-text is Ada's own (R2 (a)), replacing the filer's.
5. **The census rule's reach** (Stacy R1, residual): condition 2 put two rows in scope whose checks never load the edited files (§ 5), and their lines cost a read of each check's code to say so. Thurgood's answer as the rule's drafter is in [THURGOOD R2] (§ 12): the reach is intended, and a revisit, if the lines keep finding nothing, belongs to register row `instrument-census-at-draft`, not to this ballot.

## 10. Cost

- Measure and site texts: done (Ada, Lina). Filing, re-base and frame: this PR.
- R1: done (four entries). R2 incorporation: this commit. The bytes-only R2: Stacy's read plus the owner reads in [THURGOOD R2], minutes each.
- Application PR: about 0.5–1 day elapsed. Four Token Governance hunks, one Core Goals hunk (plus up to two one-liners), six follow-on sites, two register rows' education re-pointed; re-sign acts by Thurgood (authoring), Stacy and Lina (and Ada under F-1 (b)); one regeneration, the lock refresh (a second generator run), `rebuild_index`.
- Peter: F-1, F-2, F-3; ratify; merge two PRs.

## 11. Application (on ratification, one PR, Peter-merged)

1. **The Status commit** (record-first; README § "The Ratification Protocol"), before any edit site. It flips the Status line to `**Status**: **RATIFIED (Peter, <date>)** — <F-1, F-2, F-3 answers>`, fills `<ratification date>` in every amendment pointer (and in the overlay removal of § 6), and adds the README roll entry. **It also appends `## 13. Resolved after-texts`** (Stacy R1, M-4): for each site, the after-text exactly as it will be applied under Peter's answers, with every fork bracket, bracket label, "/" alternative and duplicated step resolved (site 1d's two step 3s, site 4's F-3 "/" pair, site 4's two checkpoint lines), and the § 11 step 5 register text. The claims pass compares the application diff with § 13 byte for byte; nothing in § 13 is new text, and a § 13 line that is not a resolution of a line above is a finding.
2. Branch `chore/token-selection-order-one-rule`. Stop on any before-text that does not match at the application base, and report: `git diff --quiet 1eced6cd5 <base> -- governance/Token-Governance.md .kiro/steering/core-goals.md canonical/agents/lina.md canonical/agents/ada.md governance/Component-Development-Guide.md governance/Web-Authoring-Standards.md governance/Product-Token-Governance.md .cursor/rules/tokens.mdc governance/classification-map.md` first. (`governance/classification-map.md` is checked over the two rows' `education` and `history` only; other rows may move.)
3. PR body: one `**Edit kind**: <path> — LAW (.kiro/docs/ballots/2026-10-25-token-selection-order-one-rule.md)` line per governance-path file (Token-Governance, core-goals, Component-Development-Guide, Web-Authoring-Standards, Product-Token-Governance (site 8), `canonical/agents/lina.md`, and `canonical/agents/ada.md` under F-1 (b)), and `**Edit kind**: governance/classification-map.md — EXECUTION (ballot 2026-10-25-token-selection-order-one-rule § 11 step 5)`; `**Consulted**:` Ada, Lina, Sparky, Stacy; Kenya and Data named as notified (site 8, regeneration only).
4. **Authoring**, under the grant (§ 6): Ada applies item 1 and sites 6 and 8; Lina applies sites 4 and 5; Thurgood applies site 2, sites 3 and 7 byte for byte from § 13, and the operative-set items, overlay units and dispositions-row fields of § 6 (the Core Goals row's fourth removal included). Each commit under its author's `Agent:` trailer, the trailer in the message's final paragraph.
5. **Register (EXECUTION of this step; Thurgood applies, Ada consulted as both rows' owner)**, `governance/classification-map.md` (Stacy R1, B-1). The education citations of two rows cite text the ballot moves; they are re-pointed by section, so later line moves cannot stale them again, and each row gains one history entry.
   - `no-autonomous-token-creation`, `education.disposition`: `Token-Governance.md:180-186 the canonical statement + creation checkpoint + decision matrix` → `Token-Governance.md § 'Token Creation Governance' the canonical statement + creation checkpoint + decision matrix`. History entry: `- { date: <application date>, change: "EXECUTION (ballot 2026-10-25-token-selection-order-one-rule § 11 step 5). Education citation re-pointed by section: Token-Governance.md:180-186 (two lines off since #472, and moved again by the ballot's site 1a) is now § 'Token Creation Governance'. core-goals.md:55-59 keeps its lines[F-1 (b): ; its component rung now reads 'Use freely inside the component they belong to, for the property they were made for; any other use requires explicit human approval']. The Component Development Guide's token-selection framework no longer creates component tokens inside selection (its old Step 3): a missing token stops at a checkpoint, and creation goes to Ada. No requirement, scope or check_state changes; census: the ballot's § 5, not in scope.", by: thurgood }`
   - `no-hardcoded-color`, `education.disposition`, four replacements: (i) `core-goals.md:50/:53/:71 (the token-selection priority ladder — teaches the ORDER and the escalation, which no detector supplies)` → `core-goals.md:50/:53 and Token-Governance.md § 'Token Selection Matrix' step 4 (the selection order and its escalation, a hard-coded value only as the human's last resort — which no detector supplies)`; (ii) `Component-Development-Guide.md:183 ('Never use hard-coded values'` → `Component-Development-Guide.md § 'Token Selection Decision Framework', 'After the Decision: Component Tokens for Variants' ('Never use hard-coded values'`; (iii) `canonical/agents/lina.md:459 ('Hard-coded values — only as last resort. Requires user approval. Always flag these.')` → `canonical/agents/lina.md § 'Token Selection Priority (MUST follow this order)' (a pointer to Token-Governance § 'Token Selection Matrix', whose step 4 carries the last resort)`; (iv) `(core-goals:50/:53/:71, CDG:183, PIG:410-422)` → `(core-goals:50/:53, Token-Governance § 'Token Selection Matrix' step 4, CDG § 'Token Selection Decision Framework', PIG:410-422)`. Each before-string occurs once in the file at `fa8aa254f`. History entry: `- { date: <application date>, change: "EXECUTION (ballot 2026-10-25-token-selection-order-one-rule § 11 step 5). Education citations re-pointed after the ballot moved the text they cite: core-goals.md:71 (the ladder's hard-coded step) is gone, and its content is Token-Governance § 'Token Selection Matrix' step 4 (a hard-coded value only as the human's last resort); Component-Development-Guide.md:183 is cited by section; canonical/agents/lina.md:459 (L504 before the ballot) is removed by her pointer form, and her charter reaches the last resort through that pointer. The KEEP scores stand: the content is still taught, in one home. No requirement, scope or check_state changes; census: the ballot's § 5, not in scope.", by: thurgood }`
   - `<application date>` is the application PR's date, the one value § 13 cannot fix in advance.
6. **Straggler sweep over the source tree**, before the regeneration (Stacy R1 item 9): `git grep -n -i -E "Token Selection Priority|Core Goals' token selection|Core Goals token priority|semantic → primitive → component|COMPONENT TOKEN EXISTS" -- . ':!.kiro/specs' ':!.kiro/issues' ':!.kiro/docs' ':!.claude' ':!.kiro/agents' ':!canonical/_consumer-output'`. **Expected hits, and only these** (each read at `fa8aa254f`): (a) the kept heading `### Token Selection Priority (MUST follow this order)` at `canonical/agents/lina.md` L499 and in `canonical/profiles/consumer/lina.overlay.md`; (b) ledgers that quote superseded text: `canonical/profiles/consumer/confirmations/core-goals.md` and `canonical/profiles/consumer/signatures/core-goals.md`; (c) frozen fixtures, `tests/onboarding-trio/fixtures/born-{cc,kiro}/**`; (d) `src/build/**`: `tokens/TokenSelector.ts`, `tokens/TokenSelection.ts`, `tokens/TokenIntegrator.ts`, `tokens/ComponentToken.ts`, `tokens/ComponentTokenGenerator.ts`, `tokens/__tests__/TokenSelector.test.ts`, `errors/ErrorDocumentation.ts`, `errors/ErrorReporter.ts`, `errors/README.md` (Ada's rule-10 record, § 4); (e) `tools/agent-generator/__tests__/partition.golden.test.ts` L283, a slug-function test literal; (f) `governance/Process-Spec-Planning.md` L1732, L2106 and L2259 (§ 4, "Not edited"). Any other hit stops the PR and is reported. **Dependent-copy check** (M-2): site 4's Step 1–4 headings name the same steps, in the same order, as site 1a's list.
7. **Regeneration**: `npm run build:generator`; commit the generated roots as the pre-signature rendering (as #472's `94ce930bf`). Re-run step 6's command without the three generated-root exclusions: the only new hits are Lina's kept heading in her generated charters (`.claude/agents/lina.md`, `.kiro/agents/lina-prompt.md`, `canonical/_consumer-output/**/lina*`). **Order check** (Stacy R2, residual: the ballot's authoring → regeneration order, with the operative-set items edited before the regeneration, was reasoned from #472's order and not run): run the generator once on the authoring commits before the profile-author items commit and once after it; the generated roots must be byte-identical. A difference means the items enter the rendering: stop and report it to Stacy before any seat acts.
8. **Seat acts**, against the committed rendering: Stacy re-confirms and re-signs Core Goals `#development-practices`; Lina re-confirms and re-signs `#token-selection-priority-must-follow-this-order`; Ada re-confirms and re-signs `#what-this-means-in-practice` under F-1 (b). Each act is the seat's own commit under its own `Agent:` trailer.
9. **Lock refresh**: a second `npm run build:generator`. The signatures sit in dispositions rows, which the lock's input closure hashes, so the lock moves; **every output must stay byte-identical** (#472's `f218beb42`: "the fresh regen wrote 387 files and left every output byte identical"). Commit `canonical/generated.lock` only. A changed output means a signed rendering moved after its signature: stop and report.
10. Checks: `npm run -s check:122:diff-guard` (with `verify-signing-chain --ci`); `npm run -s check:section-citations`; `node scripts/validate-steering-metadata.js`; `npm test` (canonical-vs-truth and the sweeps run in the root lane); docs MCP `rebuild_index` (Token-Governance, Component-Development-Guide, Web-Authoring-Standards, Product-Token-Governance and the register are served).
11. Close `.kiro/issues/2026-10-24-token-selection-order-core-goals-vs-token-governance.md` by a dated outcome line in the application PR. Under F-3 (A), append the dated L73–74 note to `2026-10-24-component-token-custom-values-unvalidated.md`. File the rule-10 records of § 4 "Not edited" that are not filed earlier (Lina: CDG § "Component Token Files"; Ada: `src/build`). The Core Goals L59 record is already filed in the #480 draft PR: `.kiro/issues/2026-10-25-core-goals-l59-vs-product-token-authoring.md` (Ada; cite it in the application PR's close-out line).

## 12. Review record

### [THURGOOD R0] — filing (2026-10-25)
- Filed from Ada's measure (`measure.md`, 310 lines, 2026-10-25) and Lina's sites (`lina-sites.md`, 2026-10-25), both drafted outside the repo; this file is their first committed form.
- Re-based every before-text onto `1eced6cd5` (§ 0). The after-texts of §§ 2–3 are Ada's except where labelled; sites 3–5 are Lina's except where labelled.
- Frame changes to Ada's measure: F-1's attribution updated with her 6(i) consult (she now picks (b)); the Example 7 before-text and its defect statement re-based; the served-docs sequencing note retired as moot; the item-3 census line corrected (site 4 renames headings); § 5's Core Goals row gains `practice-8` under F-2 (B) and the "second re-sign" note; Lina's unit row gains its own second-re-sign note; the grants paragraph widened to every authoring file; the L85 survivor retired (fixed by #472); the scope statement for Sparky's screen chain added (§ 1) with Q-S.
- Frame changes to Lina's sites: her own re-authoring of the operative-set items, the overlay unit and the dispositions row is corrected to the seat-object boundary (§ 6): Thurgood applies her charter text byte for byte (errata (f)) and authors the items and the overlay; her acts are the re-confirm and the re-sign, and her two proposed items are carried as her proposal; the consumer-profile path note confirmed (`canonical/profiles/consumer/lina.*`, not `always-set/`); the glossary line is L261.
- The row's record is `.kiro/issues/2026-10-24-token-selection-order-core-goals-vs-token-governance.md` (walk line 6). `.kiro/issues/2026-10-24-component-token-usage-forks.md` is a different record (Input-Text success border, Button-CTA typography, restated variant tokens) and is not touched by this ballot.

*(R1 entries, reproduced as each reviewer wrote them, in the order received: Stacy, Sparky, Ada, Lina.)*

#### [STACY R1]
**Verdict: R1 BLOCKED on B-1 and B-2.** Both are cheap. Read at `1d8d9f420`; `main` is now `fa8aa254f`, which touches no site file.

1. **Before-texts: all match** `1eced6cd5` byte-for-byte: every TG, CG, charter, WAS, tokens.mdc and CDG quote, the one-line hunks included. → §§ 2–4
2. **One rule.** Core Goals as a pointer only holds 6(ii). **M-1**: site 3's "verbatim fallback" is a live second copy and an unlisted fork. Strike it or list it as F-4. **M-2**: site 4 numbers Steps 1–4 in the matrix's order, so it is a second copy, and F-2 (B) must swap both. Call it a dependent copy and add it to the § 11.5 sweep. → § 4
3. **Forks.** All three are real: each changes what gets built, and F-2 (B) and F-3 also change Core Goals. Each option carries a pick and a surviving counter-argument. Gap: Thurgood owns CG L51 and L73–74 and gives no pick on F-2 or F-3. State one, or "none — <reason>". → § 7
4. **Census.** All eleven lines are in the right grammar, and I reproduced each reason. **B-1**: under condition 2, two registered instruments are presumptively in scope and have no line:
   - `no-autonomous-token-creation` (armed family-integrity suites): its education cites core-goals.md:55–59, TG § "Token Creation Governance" and the CDG framework.
   - `no-hardcoded-color` (dormant stemma assertion): its education cites core-goals.md:71, CDG:183 and lina.md's "Hard-coded values — only as last resort". Sites 2–3 remove two of those three.

   Both are probably "not in scope", but the lines are owed. Their education citations also go stale: add a register history entry to § 11. → § 5
5. **Re-sign table: complete** against the seat-object boundary. Items, signers and removals verified; both second re-signs named with the #472 SHAs. Low: the overlay subtraction is left as "his call at application". Decide it before ratification, because my signature reads that rendering. → § 6
6. **Grants.** **M-3**: site 6's applying seat is unnamed. Name it. Note that the grant overrides Ada's practice-no-write, and name the classification-map file if B-1's register entry needs a grant. → § 6
7. **B-2, sequencing.** §§ 8.4 and 11 put the regeneration after the sign acts. A C1 signature's renderedHash is computed over the committed rendering, and #472 regenerated (`94ce930bf`) before its signs. The order should be: authoring → regeneration → seat acts → lock refresh. State whether the lock refresh needs another generator run. → §§ 8, 11
8. **Placeholders still open**: site 6; site 1a's F-2 (B) write-out (its "[…]" cannot be checked byte for byte); the class-rule placement; the 1b heading; L58; Lina's F-2 (B) site-4 text; Q-S. **My call**: R1 can close with them present, but ratification cannot. Before Peter rules, each one is either written by its owner and read by me in a bytes-only R2, or struck.
9. **LENS.** A claims pass can verify every site, with one addition. **M-4**: resolving the brackets takes interpretation (labels dropped, "/" alternatives, two step-3s in 1d). The Status commit should carry the resolved after-text for each site under Peter's answers, so the pass compares bytes to bytes. Also: § 11.5's sweep paths leave out the src/build and fixture paths it expects hits in, and Process-Spec-Planning L2106 will hit without being listed.

**Counter-argument (folded)**: B-1 can read as form over substance, since neither suite reads a doc. I kept it because the README makes a missing line a finding. **Residual**: condition 2 reaches rows whose checks never load the edited files. Whether that reach is intended is a question for Thurgood about the census rule, not for this ballot.

#### [SPARKY R1]
- **(1) L106 sentence** → Web-Authoring-Standards § "Hard Rules" item 3: Accept as drafted. It is true of my workflow: I pick among semantic, primitive and product tokens, and I never select a component token. No alternative wording needed.
- **(2) Screen chain (L96–104)** → ballot § 1 "Scope of the one order": A specialisation, not a second order. Same sequence (semantic, then primitive), with the component step removed because screens have none, and the product token standing as my consumer-side tier. One real difference the ballot's "same order" must not hide: the matrix's last step is STOP / human checkpoint (Token-Governance § "Token Selection Matrix" step 4). Mine reads "There is no step 4. If no system token exists, create a product token." That is a delegation, not a divergence: Product-Token-Governance § "System-First Value Selection" is the checkpoint (`ref:` before `value:`, written rationale, Leonardo's `value:` decisions trusted). Surviving residual: a reader could take "no step 4" as skipping the human checkpoint Core Goals demands for token creation. Add to § 1 "Scope of the one order": "Sparky's screen chain is this order applied to a product screen: it omits the component step (screens have none), and its terminal step, a product token authored under Product-Token-Governance's system-first rule, is that governance's form of the matrix's human checkpoint." No other ballot edit needed.
- **(3) Signing** → § 5 / ballot line 458: The L106 hunk is inside the embed that renders into my charter, but my pinned `mustContain` string ("These are non-negotiable. Every CSS file — component or screen — must follow these rules.", `canonical/agents/sparky.md` L36, doc L34) is outside both hunks. Regeneration plus lock refresh only; no re-sign act from me. Agrees with the ballot's "regeneration only, no act" row.

#### [ADA R1]
- **Site 6 after-text** → ballot § 4 "Site 6": the filer's placeholder is right in substance; I replace it with the text below (adds "ask the human" for the hard-coded case, drops the MUST heading because the order is no longer stated here). Applies to `.cursor/rules/tokens.mdc` on main (HEAD of the file unchanged by #472). L25–31 stay under both F-3 options.

L9–14 (replaces the heading and the four steps; the blank lines at L8 and L15 stay):
```
## Token Selection

The one token-selection order is Token Governance § "Token Selection Matrix". Query it before you choose a token (see "For Detailed Guidance" below); this file does not restate it. When nothing in it fits, stop and ask the human; never create a token, or hard-code a value, to finish a selection.
```
L22, F-1 (b) only:
```
| Component tokens | Use freely inside the component they belong to, for the property they were made for; any other use requires explicit human approval |
```
L41–42 (both F-1 options; ids read from each file's `id:`):
```
get_section({ path: "token-governance", heading: "Token Selection Matrix" })
get_section({ path: "component-development-guide", heading: "Token Selection Decision Framework" })
```

- **F-2 (B) written out** → § 2 "Site 1a": confirmed as the right text. Two carry-overs the ballot should state, or the (B) branch contradicts itself: every "step 2" in site 1b (the (a) Scope line; the (b) sentence "as step 2") reads "step 1" under (B), and Example 7's "Correct approach" lists the own-token check before the semantic check under (B). Optional: under (B) use Button-Icon small (`space100` = `space.inset.100`) as the example, since it shows the case F-2 is about.
- **Class-rule sentence** → § 2 "Site 1a", last paragraph: placement confirmed (first line under `## Token Usage Governance`, before `### Semantic Concept Token Usage`; it renders into my embed). Use my wording, not the § 7 paraphrase: "A use-time checkpoint applies only where that use was not reviewed when the token was made." Add the amendment pointer, like the other hunks.
- **Site 1b heading** → § 2 "Site 1b", filer's R1 item: yes, name both. Under (b) the checkpoint heading and format read "another component's token, or the owner's token for another property"; step 2's "belongs to another component" sentence adds "or is for another property". Same residual as my consult: nothing checks "the property it was made for".
- **Re-base review** → § 0, § 2 "Site 1d": Example 7's new defect statement is accurate against main L430–450 (primitive checked at its step 2, own token at step 3, primitive listed as checked). My after-text stands. The item-3 census line is right to retract "sites 3–5". Core Goals L58 is better than my consult's line (it carries the property bound and "any other use"); L51 under (B) is acceptable.
- **F-1 attribution** → § 7 F-1 and header: true. My measure drafted (a) and left 6(i) to Peter; my 6(i) consult of 2026-10-25 picked (b), agreeing with Lina, with the class rule. The surviving counter is quoted correctly.
- **Sparky's sentence** → § 1 "Scope": it conflicts, in one clause. "Is that governance's form of the matrix's human checkpoint" is false against Product-Token-Governance § "Authoring Workflow": platform agents add product tokens in implementation, and review is the indexer plus a later audit, with no per-token human checkpoint. Also his primitive step has no acknowledgment gate. Replace with: "Sparky's screen chain is this order applied to a product screen: it omits the component step (screens have none). It differs in two stated ways: its primitive step carries no acknowledgment gate, and its last step is not the matrix's STOP. A value no system token covers becomes a product token under Product-Token-Governance § 'System-First Value Selection' (system token first; written rationale for a `value:`), with review by audit." Surviving residual: Core Goals L59 ("Creating ANY token … human review") then reads against product-token authoring. Not caused by this ballot; file a rule-10 record (owner Ada, consult Leonardo).

#### [LINA R1]

**Accept the seat-object boundary** → ballot § 6 / § 12 [THURGOOD R0]. I do not re-author items, the overlay unit or the dispositions row. Thurgood applies site 3 byte for byte; my acts are the re-confirm and the re-sign. My two items (`priority-pointer`, `priority-no-creation`) are a proposal; at the re-confirm I may correct the set, as Stacy did for Core Goals. Path note confirmed (`canonical/profiles/consumer/lina.*`).

**Re-base verified against `1d8d9f420`** → § 0, § 4. Correct: lina.md heading L499, items L501–504; CDG L142–214, L43, L48, glossary L261; Web-Authoring-Standards L106 and L386. The four H3 renames are right under F-2 (A): old Step 2 (primitives), "What If Tokens Don't Exist?", Step 3 and Step 4 stop existing as headings. Findings:
1. **Census, F-2 (B)** → § 5 item 3: under (B) a fifth heading changes (old "Step 1: Check Semantic Tokens First"). Add "(five under F-2 (B))". My git grep of titles outside specs/generated roots finds the same non-hits you did.
2. **Site 4 filename error, mine** → § 4 site 4 Step 2: `src/components/core/<Component>/<component>.tokens.ts` is wrong; filenames vary (`buttonIcon.tokens.ts`, `avatar.tokens.ts`, `checkbox-sizing.tokens.ts`). Replace with `src/components/core/<Component>/*.tokens.ts` (e.g. `Button-Icon/buttonIcon.tokens.ts`). The same fix applies in the (B) text below.
3. **`.cursor/rules/components.mdc` L28** carries the same stale `get_section` path as tokens.mdc L42 (site 6). Add it to site 6 and its grant, or file a rule-10 record.
4. CDG L28 "(Step 1-4)" and L37 "(all steps)" stay true under both options; no edit.

**Sparky's R1 vs my component-side reading** → § 1 "Scope of the one order", site 5 L106. Sparky's § 1 sentence does not conflict with my reading and I want it added. One conflict is in my own L106 text: "the component-side order" implies two orders. Sparky's reading is one order with a screen specialisation, so my sentence should say so. Replace the L106 After with:
```
**Note**: This priority chain is Sparky's decision tree for screen CSS: the one order in Token Governance § "Token Selection Matrix", with the component step removed because screens have none. Lina follows that order whole, including a component's own token. Component tokens are not part of Sparky's workflow.
```
His mustContain string is still outside the hunk; regeneration only. Stacy should check that Product-Token-Governance § "System-First Value Selection" does state the checkpoint his sentence relies on.

**F-2 (B) after-texts** → site 3 fallback and site 4. The pointer form of site 3 is unchanged. The test for "this property" is the property named by the token's name and its `reasoning` field; this keeps F-1 (b)'s bound and F-2 (B)'s "for the property" to one test.

Site 3 fallback, F-2 (B) with F-1 (a):
```
1. **The component's own token** — a token that belongs to the component you are building and is for this property (e.g., `buttonicon.inset.medium` inside Button-Icon), even where a semantic token has the same value. Requires a human checkpoint unless the spec names the token. Another component's token is not a step; using one goes to step 4.
2. **Semantic tokens** — for a property the component has no token of its own for; purpose-built for specific use cases (e.g., `color.contrast.onAction` for content on action-colored backgrounds, `space.inset.100` for inset padding). Use freely. Verify semantic correctness.
3. **Primitive tokens** — when no own or semantic token exists. Requires prior context (spec docs reference it) or Peter's acknowledgment.
4. **Nothing fits — stop.** Checkpoint with Peter. He decides: a new component token (built by the rule below, created by Ada), a new primitive, a new semantic token, or, as the last resort, a hard-coded value. Always flag these.
```
Site 3 fallback, F-2 (B) with F-1 (b): as above, except step 1's second sentence reads "Use it without a checkpoint; a human approved it when it was created."

Site 4, F-2 (B): replaces the Step 1 and Step 2 blocks of the § 4 After-text; Steps 3 and 4 differ only in the two lines shown.
```
### Step 1: Use the Component's Own Token for the Property

**Read the component's token file first** (`src/components/core/<Component>/*.tokens.ts`, e.g. `Button-Icon/buttonIcon.tokens.ts`). **If it has a token for this property, use it, even where a semantic token has the same value.** "This property" is the one the token's name and its `reasoning` field say it was made for; a token for another property is not this step.

**Example**: Button-Icon small needs an 8px inset.
- ❌ DON'T: use `space.inset.100` because it is also 8px; that splits one inset family across two tiers
- ✅ DO: use `buttonicon.inset.small` (references `space100`), as `inset.medium` and `inset.large` do

A component token belongs to the component it is named for. Another component's token is not a selection step; using one goes to Step 4.

[F-1 (a):] **Checkpoint first** unless the spec names the token: "This component needs [value]. Semantic tokens checked: [why insufficient]. Existing component token: [name]. Recommendation: use it. Awaiting your approval."
[F-1 (b):] **No checkpoint inside the owning component.** A human approved the token when it was created; use it as the spec and the contract describe.

### Step 2: Check Semantic Tokens First

**For a property the component has no token of its own for**, read the semantic token files to see what exists:
- (the five file bullets, unchanged)

**Example**: Button needs text color
- ❌ DON'T: Use primitive `cyan300`
- ✅ DO: Read `ColorTokens.ts`, find `color.action.primary`
```
Step 3 (primitives) opens "**If no token of the component's own and no semantic token fits**". Step 4 item 1 lists "this component's own tokens, semantic tokens and primitives", in that order. "After the Decision: Component Tokens for Variants" says "you consume it afterwards as Step 1".

**F-2 (B) cost I should have stated** → § 7 F-2. Under (B) the always-ambient rule "semantic first" is true only after a component-file read, so an agent that skips the component's token file takes the semantic token and misses step 1. That is the same salience loss the ballot accepts for Core Goals, and the only mitigation is the Step 1 text above ("read the component's token file first").

### [THURGOOD R2] — incorporation (2026-10-25)

Merged `origin/main` (`fa8aa254f`) into the branch first; no site file moved (header, "Base"). The four R1 entries are reproduced above as the reviewers wrote them; their text is woven into §§ 1–11.

**Stacy R1**
- **B-1** → § 5, "Condition 2": five census lines, `no-autonomous-token-creation` for items 1, 2 and 3 and `no-hardcoded-color` for items 2 and 3, each reasoned from the code at `fa8aa254f` (the 17 family suites import token modules and types and read no file; the 7 stemma assertions read only their own `.web.ts`; the validator names one doc, in a comment, which is not an edit site). Item 1 owes no `no-hardcoded-color` line: that row's education cites no Token-Governance text. The stale education citations are re-pointed by section, with one history entry per row, in § 11 step 5; the grant names `governance/classification-map.md` (§ 6).
- **B-2** → § 8 item 4 and § 11 steps 4–9: authoring → regeneration → seat acts → lock refresh, on #472's order (`94ce930bf` before its signs, `f218beb42` after). **The lock refresh does need another generator run**: the signatures land in dispositions rows, which the lock's closure hashes; the run must leave every output byte-identical, and a changed output stops the PR.
- **M-1** → site 3's verbatim fallback **struck**. Lina's R1 wrote its (B) variants because R0 asked for them "only if Peter keeps the fallback live"; it gives no reason to keep it, and her pick is the pointer form. A second ambient copy of the order is what 6(ii) removes. Her texts stay in her entry above.
- **M-2** → site 4 is named a dependent copy; F-2 (B) swaps both lists (Lina's (B) blocks, site 4); § 11 step 6 checks the two orders match. Lina's sentence "it is not a second copy of the order" reads against this; asked of her below.
- **M-3** → site 6's applying seat is **Ada**. `.cursor/` is not a governance path, so her charter's L384 ("You do NOT write to … `governance/` files", with no "unilaterally") does not reach it; it does reach item 1 and site 8, and § 6 states that the grant overrides it for those two files only. Lina's `components.mdc` L28 finding: **filed as a rule-10 record**, `.kiro/issues/2026-10-25-cursor-rules-legacy-steering-paths.md` (owner Thurgood, P3, `manual`), not added to site 6. It is one line of an eleven-line class across four files, two of whose lines (`components.mdc` L33–34) do not resolve at all; fixing one line here leaves the class.
- **M-4** → § 11 step 1: the Status commit appends `## 13. Resolved after-texts`, every site and the register text resolved under Peter's answers, so the claims pass compares bytes to bytes.
- **Item 3** → Thurgood's picks as Core Goals owner, § 7: **F-2 (B)** (L51) and **F-3 (A)** (L73–74), each with what survives it.
- **Item 5** → the overlay subtraction is decided now: the Core Goals row gains a fourth removal of the amendment pointer under `subtraction-2`, on the `ai-collaboration-principles` `#counter-argument-requirement` precedent (§ 6).
- **Item 9** → § 11 step 6's sweep runs over the whole tree minus ledgers and generated roots, with every expected hit listed (Lina's kept heading, two ledgers, the frozen fixtures, nine `src/build` files, one slug-test literal, Process-Spec-Planning L1732, L2106, L2259); a dry run at `fa8aa254f` returns exactly those plus the lines this ballot edits. The pattern gains "Core Goals token priority", which found site 8.
- **Residual, the census rule's reach** (asked of me as the rule's drafter): the reach is intended. Condition 2 exists for the case where a law edit can change what a check ought to verify though the check never loads the doc; "not in scope" is the cheap form for when it cannot, and saying so costs one read of the check's code, which is what found nothing here and is the evidence the line carries. If such lines keep finding nothing across ballots, the revisit belongs to register row `instrument-census-at-draft`, not to this ballot.

**Sparky R1** → L106 accepted (site 5); regeneration only, no act (§ 6 table). His proposed § 1 sentence is replaced by Ada's (next).

**Ada R1** → site 6's after-text is hers and replaces the placeholder; site 1a's F-2 (B) text is confirmed and now written out in full; the class-rule sentence is in her words, with the amendment pointer and her placement (after L93, before L94); site 1b names both cases under (b), in the heading, the format line and the sentence; the F-2 (B) carry-overs are stated (1b's "step 2" reads "step 1"; Example 7 under (B) uses her optional Button-Icon small, because it shows the case F-2 is about); her Example 7 defect statement and the re-base stand; L58 and L51 accepted; the F-1 attribution is true; her § 1 wording replaces Sparky's, after the filer re-read Product-Token-Governance L56–80 and agrees no per-token checkpoint is stated. Her rule-10 record on Core Goals L59 against product-token authoring is hers to file, Leonardo consulted (§ 4, § 11 step 11). One reading of mine: her "step 2's 'belongs to another component' sentence adds 'or is for another property'" is applied to site 1b (b)'s sentence, the one inside the 1b hunk; site 1a's step 2 already carries "for this property" in its condition, so nothing was added there.

**Lina R1** → the seat-object boundary accepted; her F-2 (B) texts for site 4 replace the R0 note; `*.tokens.ts` fixed in both variants; the fifth heading under (B) is in the item-3 census line; her replacement L106 sentence is site 5's After; her stated cost of (B) is in F-2; her site-3 (B) fallback texts are recorded in her entry and the fallback is struck (M-1); `components.mdc` went to a rule-10 record (M-3); CDG L28 and L37 need no edit. Her request that Stacy check Product-Token-Governance was met by Ada's read and mine (§ 1).

**Found at R2** (the filer): `governance/Product-Token-Governance.md` L77, "Check semantic tokens first per Core Goals token priority", points at nothing once site 2 lands. Added as **site 8**, Ada's file; the after-text is the filer's proposal and Ada's bytes are owed. It renders in Sparky's, Kenya's and Data's retained embeds: regeneration only, no act; their pin (L68) is outside it.

**Still open.** The three forks, F-1, F-2 and F-3, are Peter's. Every R1 placeholder is resolved. Before Peter rules, the bytes-only R2 (§ 8 item 2) owes these reads; none is a fork, and a rejected item is struck or rewritten by its owner:
1. **Stacy**: a bytes-only read of every text added at R2, and her census-reader read of the five new lines.
2. **[@ADA]**: (a) site 8's after-text: confirm, replace or strike; (b) site 1d's (B) Example 7, the filer's write-out of her instruction; (c) site 1b's (B)×(a) format without the "Semantic concept tokens" line; (d) the 1b (b) placement of "or is for another property" read above.
3. **[@LINA]**: (a) site 4's sentence "it is not a second copy of the order" (a proposed rewording is at site 4); (b) the "Semantic tokens checked" line in site 4's (B) Step 1 checkpoint under F-1 (a); (c) optional: the hard-code half in site 3's second paragraph.
4. **[@SPARKY]**: Ada's § 1 wording (the ballot's reading; it edits no site) and Lina's replacement L106 bytes.

Nothing is applied; the Status line still reads DRAFT. -- [THURGOOD R2]

*(R2 entries, reproduced as each reviewer wrote them, in the order received: Stacy, Ada, Lina, Sparky.)*

#### [STACY R2]
**Verdict: R2 PASS with items.** Read at `c0d0fe5c6`; `main` is `d740624b8`, the branch base.

1. **B-1: resolved.** The five lines name the right instruments, with right reasons and grammar.
   - I re-ran the check. The 17 family suites exist and none matches the file-read pattern. All 7 stemma suites read only `platforms/web`. The validator's one doc is an `@see` comment.
   - I swept every row's `education` for edit-site files. Only these two rows cite them as law, so no other line is owed.
   - The § 11 step 5 re-points and history entries are well formed, and their before-strings are in the file.
2. **B-2: matches #472, with a nuance.** The SHAs and the "387 files" quote are true (`94ce930bf` → signs → `f218beb42`). #472 also ran items (`46ae0efda`) after the regeneration and a dispositions edit (`ce735ba7c`) after Kenya's and Data's signs. The ballot's order is stricter and safe, since items do not enter the rendering. Low: the § 6 precedent path is `always-set/ai-collaboration-principles.dispositions.yaml`; add the directory.
3. **M-1: resolved** (fallback struck, reason accepted). **M-2: resolved** (dependent copy, step 6 check), but Lina's "not a second copy" still stands at site 4 L334; her call is owed. **M-3: resolved** (Ada applies, override scoped, class filed as a rule-10 record). **M-4: resolved** (§ 13 at the Status commit). **Items 3, 5, 9: resolved.** I ran step 6's sweep: every hit is expected or an edit site, and L2106 is listed.
4. **Before-texts: all match.** The eight site files and the register are byte-identical `1eced6cd5` → HEAD. All 52 R1 blockquote lines that are file text are unchanged at R2, and R2 added only after-text.
5. **Placeholders still open.** No "[…]" remains. Owed reads, all named in [THURGOOD R2]:
   - **Site 8**: Ada's bytes (the filer's proposal).
   - **Ada**: site 1d's (B) Example 7, site 1b's (B)×(a) format line, and the L181 carry-over.
   - **Lina**: the L334 wording, and "Semantic tokens checked" in site 4's (B) Step 1 checkpoint (L416).
   - **Sparky**: § 1 and L106.
   - **`(the five file bullets, unchanged)`** at site 4: § 13 must expand this elision, or the claims pass cannot compare bytes.
   
   None blocks this PASS. Ratification waits on them.

**Counter-argument (folded)**: the order check is by commit order, not by a run. **Residual**: I did not test that regenerating before the items edit gives identical bytes.


#### [ADA R2]
Bytes-only read against main `d740624b8` and branch HEAD `c0d0fe5c6`.

- **(a) Site 8: replace.** The filer's line is accurate but drops the one thing the old sentence carried. Product tokens have no component step, and the Matrix's step 4 STOP is a creation rule that Core Goals L59 and Token-Governance L186 already answer for product authors. Pointing the lookup at the Matrix and leaving that question alone keeps the meaning. Heading, tool calls and the L68 pin are untouched. After-text, whole L77:

```
2. **Query system tokens (semantic first, then primitives)** — `search_tokens({ family: "opacity" })` or `get_token_family({ family: "opacity" })`. Check semantic tokens first, then primitives, in the order of Token Governance § "Token Selection Matrix"; step 5 below decides `ref:` or `value:`.
```

- **(b) Example 7 under F-2 (B): confirmed.** `buttonicon.inset.small` and `space.inset.100` both resolve to `space100` (`token-index/components.yaml` L240–244). The checkpoint lists only the component token, which agrees with (c). Optional: add "(the semantic `space.inset.100` is also 8px)" to the checkpoint's Recommendation line, so the human sees the shadowed token. I don't need it.
- **(c) Dropping "Semantic concept tokens": confirmed.** Under (B) the own token is step 1, so no semantic token was checked. The same drop holds for Lina's site 4 Step 1 checkpoint. The (b) format keeps both lines, because there steps 2 and 3 were checked.
- **(d) Placement: correct.** "Or is for another property" reads as any token, a semantic one included. Rewrite the 1b (b) sentence to match the heading: "A token that belongs to another component, or the owner's token for another property, is not a selection step …". Also make the first sentence say "uses that component token *for the property it was made for* without a checkpoint".
- **Rule-10 record (Core Goals L59 vs product-token authoring): rides #480.** Rule 10 puts the filing in the PR that records the obligation, and § 11 step 11 is a plan line citing no record. One file under `.kiro/issues/`, mine to author. Review by audit; Leonardo consulted. Its trigger is the application merge. Core Goals L59 stays after site 2, and Token-Governance L186 is unchanged.


#### [LINA R2]
- **M-1, site 3 verbatim fallback** → site 3. Strike accepted. A second ambient copy is what 6(ii) removes, and my pick was always the pointer form. My (B) fallback texts stay in my R1 entry as a record, not as a live option.
- **(a) Site 4 sentence** → site 4 After. Your rewording is confirmed, because my sentence was wrong against M-2. Final text, applied as written (one change: it names the same-PR duty, so a later edit to the matrix cannot leave this section stale):

  > The selection order is Token Governance § "Token Selection Matrix". This section is the component-side how-to for each step; its steps follow that order, number for number, and change in the same PR when it changes.

- **(b) "Semantic tokens checked"** → site 4, (B) Step 1, F-1 (a). Drop it. Under (B) the own token wins "even where a semantic token has the same value", so no semantic token was checked. I made the same mistake in R1. Under (A) the line stays in Step 2, where semantic really is checked first. The (B) line reads:

  > [F-1 (a):] **Checkpoint first** unless the spec names the token: "This component needs [value]. Existing component token: [name], made for this property. Recommendation: use it. Awaiting your approval."

  This matches the line you propose to drop at site 1b ([@ADA]). The line stays in the (A)-order texts at site 4 Step 2 and site 1b.
- **(c) Hard-code half** → site 3, second paragraph. Yes, add it. It is one phrase, states no order, and matches Ada's site 6 wording. Replace "you never create the token to finish the selection" with:

  > you never create a token, or hard-code a value, to finish the selection.

  The `priority-no-creation` item then covers both halves, and I will carry that at the re-confirm. L504's content still survives in the matrix, reached through the pointer.
- No other changes. My F-2 (B) pick and the stated cost of (B) stand.


#### [SPARKY R2]
- § 1 scope sentence: **Accept** Ada's wording. Both differences are true of my chain (Web-Authoring-Standards L94-104: no acknowledgment gate on the primitive step; "no step 4", product token not STOP). "Review by audit" holds against Product-Token-Governance L56-62 and L230. Her reading replaces mine.
- Site 5, L106: before-text matches `d740624b8` byte for byte (file L106). My `mustContain` string (L34, "These are non-negotiable...") is outside the hunk; the L386 hunk is also outside it. Row stays regeneration-only; no re-sign act.
- One non-blocking note: the after sentence names only "component step removed". It omits Ada's other two differences (no ack gate; product token, not STOP). It is true, so I accept as drafted. Ballot § 1 carries the full statement.


### [THURGOOD R3] — incorporation (2026-10-25)

Four R2 entries reproduced above as written; their text is woven into §§ 2–11. Base unchanged (`d740624b8`; no site file moved).

**Stacy R2 (PASS with items)**
- § 6 precedent path now `canonical/profiles/consumer/always-set/ai-collaboration-principles.dispositions.yaml` (her item 2).
- The "(the five file bullets, unchanged)" elision at site 4 is expanded into the five bytes. The same was done for every other elision a § 13 comparison would meet: site 1b (a)'s "(unchanged)" Why and Exception lines, site 4's Step 1 body and the elevation-step body (both are now written out), and the `reasoning: '…'` string in site 4's Button-Icon example, which read "…compact appearance..." and now carries the source string from `buttonIcon.tokens.ts` L63 (the one place I expanded text of Lina's: it is the true source string, and her re-confirm reads it). A grep of the ballot body (§§ 0–11) for `[…]`, `[@`, "bytes owed", `(unchanged)` and `...` finds nothing in any after-text; the remaining `…` and `...` hits are quotations of before-text (the old matrix's step 4 line in § 1) and prose.
- Her residual (regenerating before the items edit is untested for byte identity) is now a check: § 11 step 7, "Order check".
- Her M-2 note (Lina's "not a second copy" at site 4) is closed by Lina R2 (a).

**Ada R2**
- (a) Site 8: her fenced block replaces the filer's after-text; whole L77. § 6 and § 11 step 3 no longer condition on Ada keeping the site.
- (b) Example 7 (B): confirmed. Her optional parenthetical on the Recommendation line is not adopted.
- (c) The "Semantic concept tokens" line is dropped from the (B)×(a) format at site 1b, which is now written out in full; the (b) format keeps both lines.
- (d) Site 1b (b) rewritten: first sentence "for the property it was made for"; second "A token that belongs to another component, or the owner's token for another property, is not a selection step". The F-2 (B) carry-over sentence matches.
- Her rule-10 record on Core Goals L59 rides this PR. She commits it after this commit: `.kiro/issues/2026-10-25-core-goals-l59-vs-product-token-authoring.md`; § 4 "Not edited" and § 11 step 11 cite it by that name.

**Lina R2**
- Site 3: strike accepted; second paragraph now ends "you never create a token, or hard-code a value, to finish the selection." The § 6 `priority-no-creation` item covers both halves.
- Site 4: the sentence is final as she wrote it; "Semantic tokens checked" is out of the (B) Step 1 checkpoint, replaced by her text; the (A) texts keep the line.

**Sparky R2**: accepted as drafted. Nothing to change.

**State.** The ballot is ready for ratification pending Peter's F-1, F-2 and F-3 answers. Nothing else is open: no owner read, placeholder or elision remains. The Status line still reads DRAFT, and nothing is applied. -- [THURGOOD R3]
