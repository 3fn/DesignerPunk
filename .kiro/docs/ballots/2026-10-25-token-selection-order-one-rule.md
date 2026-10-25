# Ballot Measure: one token-selection order, in Token Governance; Core Goals points to it

**Date**: 2026-10-25
**Drafted by**: Ada (Rosetta; owner of `governance/Token-Governance.md` and of the ambient `token-governance` embed), the measure text of §§ 2–3 and sites 6–7; Lina (Stemma), the text of sites 3–5 and her reads of F-1, F-2 and F-3; filed, framed and re-based by Thurgood (Civitas steward; owner of `.kiro/steering/core-goals.md`, the Core Goals part of item 2 and the census and re-sign frame). At Peter's direction. Peter, chat, 2026-10-25, relayed verbatim by the orchestrator: *"Fix all of them as the owners recommend; T is (A)"*. On walk row 6 that adopts the owner's pick: draft the ballot (not waive), with Ada's order, Token-Governance's scoped and Core Goals' last two steps folded into its STOP step; and 6(ii), Core Goals is a pointer only. **6(i) is not ruled** (walk record `.kiro/issues/2026-10-25-release-16.1.0-walk.md` L175: "STILL OPEN, and it holds the merge"). This ballot carries it as F-1. *Unverified here: the relay is chat only; the walk record (L173, L177) and the row's record (`.kiro/issues/2026-10-24-token-selection-order-core-goals-vs-token-governance.md` § "Owner line (2026-10-25, Ada, rule 9)") commit his words.*
**Status**: **DRAFT**, not ratified. No edit site below is applied. A merge with this line still reading DRAFT is a recording defect, not a ratification.
**Owners**: Ada (item 1, Token Governance) and Thurgood (item 2, Core Goals). Each follow-on site's owner is named at the site (§ 4).
**Proposers**: Ada (the order, §§ 2–3, F-1 (a) and F-2 as drafted; her 6(i) consult of the same day moves her to F-1 (b), § 7), Lina (sites 3–5; picks F-1 (b), F-2 (B), F-3 (A)).
**Required reviewer**: **Stacy** (R1). She is the census reader (README § "Conventions", "Instrument census"), the C1 confirmer and signer of Core Goals' `#development-practices` (§ 6), and the reader of the governance-edit-kind lines.
**Reviewers**: **Lina** (sites 3–5 are hers; F-1 and F-2 change how her components read their own tokens); **Sparky** (site 5's L106 sits in the `web-authoring-standards` § "Hard Rules" embed in his charter, and § 7 Q-S asks him whether his screen chain is a second order). **Peter** ratifies (site 2 edits Core Goals, his document).
**Class**: LAW. It changes what governance requires: it makes one of two contradictory MUST orders the law, moves the hard-coded last resort into the STOP step, and, under F-1 (b), removes a checkpoint. A normative order has no truth referent, so no item can be a CORRECTION (README § "When a governance edit needs a ballot — three kinds"; the row's record, Thurgood review, 2026-10-24).
**Amends**: `governance/Token-Governance.md` §§ "Token Selection Matrix", "Component Token Usage", "Token Creation Governance", "Example 7"; `.kiro/steering/core-goals.md` § "Development Practices" L61–76 (and L58 under F-1 (b), L51 under F-2 (B)). Follow-on sites in § 4.
**Cap**: four Token-Governance hunks, one Core Goals hunk (plus at most two one-line hunks under F-1 (b) and F-2 (B)), five follow-on sites. **Retroactivity**: none. It binds from its application merge; shipped component code is not re-judged by it.
**Base**: `main` at `1eced6cd5`. Every before-text below is quoted from that tree. Ada's measure was drafted at `652074c6b`; the served-docs CORRECTION PR #472 (`1524a96aa`) merged between, and § 0 lists what the re-base changed.

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

**Scope of "the one order"**: the order binds design-system token selection, which is where component tokens exist. `governance/Web-Authoring-Standards.md` § "Hard Rules" item 3 (L94–104) gives Sparky a chain for product screen CSS (semantic → primitive → product token, "There is no step 4"). The filer's reading is that it is the matrix's screen specialisation, not a second order: screens use no component tokens, and a missing value becomes a product token under Product-Token-Governance. Sparky is asked to confirm in R1 (§ 7, Q-S).

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

**After, F-2 (B)**: as F-2 (A), except steps 1 and 2 exchange places and numbers, so step 1 reads "**The component you are building has its own component token for this property** → use it […]" with its scope sentences, and step 2 reads "**A semantic token exists for the use** → use it. […]"; the Key Insight is unchanged. *(Written out by the filer from the measure's instruction, "Site 1a swaps steps 1 and 2 and keeps step 2's scope sentence"; Ada confirms the wording at R1.)*

**Under F-1 (b) with the class rule** (§ 7, F-1): one sentence is added as the first line of § "Token Usage Governance" (after the heading at L92), Ada's text from her 6(i) consult: "A use-time checkpoint applies only where that use was not reviewed when the token was made." *(Placement proposed by the filer; Ada confirms at R1.)*

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
> **Why?** *(unchanged)*
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
> **Exception**: *(unchanged)*

**After, F-1 (b)** (no checkpoint inside the owner; the checkpoint kept for another component's token):
> **Autonomy Level**: Full autonomy inside the owning component
> **Friction**: Low
> **Requirement**: The token belongs to the component being built and is for this property
>
> Inside the component a token belongs to, AI agents use that component token without a checkpoint, as step 2 of § "Token Selection Matrix". A token that belongs to another component is not a selection step: using one needs the step-4 checkpoint, in this format:
>
> **Why?** A component token exists because a human decided, when it was created, that the semantic tokens did not meet this component's need (§ "Token Creation Governance"). Using it inside its own component carries out that decision; a checkpoint would ask the same question again.
>
> **Checkpoint format (another component's token):**
> ```
> AI: "This component needs [value]. I've checked:
> - Semantic concept tokens: [what was checked, why insufficient]
> - Primitive tokens: [what was checked, why insufficient]
> - Another component's token: [token name] belongs to [component]
>
> Recommendation: [use it / create a token for this component / new primitive / new semantic]
> Awaiting your decision before proceeding."
> ```

(Under (b) the **Exception** line goes: nothing inside the owner is left to pre-authorize. L174–178, "**Component Token Pattern**", are untouched by either option.)

*R1 item for Ada (filer's note, not a change)*: her 6(i) consult words the (b) bound as "for the property it was made for" and names "an owner token for another property" beside another component's token as needing a checkpoint. The measure's (b) text reaches the same result through step 2's "for this property" (an owner token used for another property is not step 2, is not a primitive, so it falls to step 4), but its checkpoint heading names only another component's token. Ada decides at R1 whether the heading names both.

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

**After** (Ada's text, unchanged by the re-base):
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

(The 10px case is the same under F-2's two options: no semantic token fits, so step 1 never competes with step 2. Keys verified at `1eced6cd5`: `buttonicon.inset.medium` → `space125` in `token-index/components.yaml` L228–232; `space.inset.100` and `space.inset.150` in `semantics.yaml`, and no `space.inset.125`.)

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

- **L58, F-1 (b) only.** Before: `- **Component tokens**: Requires explicit human approval before use`. After: `- **Component tokens**: Use freely inside the component they belong to, for the property they were made for; any other use requires explicit human approval`. *(Thurgood's text as Core Goals owner. It joins the measure's "Use freely inside the component they belong to; another component's token requires explicit human approval" with the bound in Ada's 6(i) consult, "for the property it was made for". Ada reviews at R1.)*
- **L51, F-2 (B) only.** Before: `- **MUST** use semantic tokens first — only use primitive tokens when no semantic token exists for the use case`. After: `- **MUST** use semantic tokens first, except a component's own token inside that component — only use primitive tokens when no semantic token exists for the use case`. *(Thurgood's text.)*

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
> When nothing in that order fits, the step is a checkpoint with Peter and a hand-off to Ada (§ "When a Token Is Missing"); you never create the token to finish the selection.

(Lina: the second paragraph keeps the one rule that is hers, not creating a token to make a selection work, under the MUST heading. It states no order, so it cannot drift from the matrix.)

**After, verbatim fallback, F-1 (a)** (only if Peter wants the steps ambient for Lina):
> 1. **Semantic tokens** — purpose-built for specific use cases (e.g., `color.contrast.onAction` for content on action-colored backgrounds, `space.inset.100` for inset padding). Use freely. Verify semantic correctness.
> 2. **The component's own token** — a token that belongs to the component you are building and is for this property (e.g., `buttonicon.inset.medium` inside Button-Icon). Requires a human checkpoint unless the spec names the token. Another component's token is not a step; using one goes to step 4.
> 3. **Primitive tokens** — when no semantic or own token exists. Requires prior context (spec docs reference it) or Peter's acknowledgment.
> 4. **Nothing fits — stop.** Checkpoint with Peter. He decides: a new component token (built by the rule below, created by Ada), a new primitive, a new semantic token, or, as the last resort, a hard-coded value. Always flag these.

**After, verbatim fallback, F-1 (b)**: as (a), except step 2 ends "Use it without a checkpoint; a human approved it when it was created. Another component's token is not a step; using one goes to step 4." Under F-2 (B) the fallback's steps 1 and 2 swap; that text is owed from Lina before R1 closes only if Peter keeps the fallback live.

L506–507 (her construction rule) and L509–516 (§ "When a Token Is Missing", including L516's routed-query sentence) are unchanged under every option; no route is added.

### Site 4: `governance/Component-Development-Guide.md` § "Token Selection Decision Framework" (L142–214) and two adjuncts (Lina's text)

The section heading L142 is unchanged (Lina's route `token-selection-framework` resolves to it). Four H3 headings change, so the two "WHEN … THEN read" lines that name them change in the same PR (adjunct A).

**Before** (L142–214; structure, text at `1eced6cd5`): Step 1 "Check Semantic Tokens First" (L144–155); Step 2 "Use Primitives Only When Unavoidable" (L157–165: "use primitives and document why", no acknowledgment named); "What If Tokens Don't Exist?" (L167–178: "Pause and ask", primitive as the fallback named); **Step 3 "Create Component-Level Tokens for Variants"** (L180–207: "create component-level tokens", no checkpoint; its example `// ButtonCTA/tokens.ts` / `buttonCTATokens` is a file that does not exist, in a plain-object shape the repo does not use); Step 4 "Propose Semantic Token Elevation" (L209–214).

**After** (replaces L142–214):

> ## Token Selection Decision Framework
>
> The selection order is Token Governance § "Token Selection Matrix". This section is the component-side how-to for each step; it is not a second copy of the order.
>
> ### Step 1: Check Semantic Tokens First
> *(L146–155 unchanged: the token-file list and the example, Button text color → `color.action.primary`, not `cyan300`)*
>
> ### Step 2: Use the Component's Own Token for the Property
>
> **If the component you are building has a token for this property, use it.** Component tokens live with their component: `src/components/core/<Component>/<component>.tokens.ts`.
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
>       reasoning: 'Medium variant uses 10px padding (1.25× base) for compact appearance...',
>     },
>     // 'inset.large' → space150, 'inset.small' → space100
>   },
> });
> ```
>
> ### After the Decision: Propose Semantic Token Elevation *(not a selection step)*
> *(L211–214 body unchanged: "If 3+ components use same pattern ...")*

Under F-2 (B), Lina's instruction: Steps 1 and 2 swap, and the semantic step gains "for a property the component has no token of its own for". The written-out text is owed from Lina before R1 closes if F-2 (B) stays live. (Verified at `1eced6cd5`: `buttonIcon.tokens.ts` L55–65 defines `ButtonIconInsetTokens` with `component: 'ButtonIcon'`, `family: 'spacing'`, `'inset.medium'` → `spacingTokens.space125`; `ButtonIcon.web.css` L76 reads `var(--buttonicon-inset-medium)`.)

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
- After (the same under every option): `**Note**: This priority chain is Sparky's decision tree for screen CSS. Lina follows the component-side order in Token Governance § "Token Selection Matrix", which includes a component's own token. Component tokens are not part of Sparky's workflow.`

**L386** (§ "Related Documentation"; outside the embed):
- Before: `- **Core Goals.md** — System token priority (semantic → primitive → component)`
- After: `- **Token-Governance.md** § "Token Selection Matrix" — The token selection order (Core Goals points to it)`

Sparky's asserted string ("These are non-negotiable. Every CSS file — component or screen — must follow these rules.", L34) is outside both hunks. **Sparky consult: OPEN** (L106 is a claim about his workflow, rendered in his charter; and Q-S, § 7).

### Site 6: `.cursor/rules/tokens.mdc` L9–14, L22 under F-1 (b), and L41–42 (Ada's text owed; **needs a grant**)

`.cursor/rules/**` is in no seat's standing write scope, so the application grant (Peter's ratification, or a grant record before the application PR) names the file and its applying seat (the 2026-09-19 counter-argument ballot's B1 precedent edited `.cursor/rules/designerpunk-core.mdc`). The measure gives this site's requirement only ("matches the matrix or points to it"; the two `get_section` paths, which are not doc ids, corrected in the same hunk). **The after-text below is the filer's placeholder, derived from sites 2 and 3's pointer form and site 2's L58; Ada confirms or replaces it before R1 closes.**

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
  > The one token-selection order is Token Governance § "Token Selection Matrix"; query it before you choose a token (see "For Detailed Guidance" below). When nothing in it fits, stop and ask the human; never create a token to finish a selection.
- L22, F-1 (b) only. Before: `| Component tokens | Requires explicit human approval |`. After: `| Component tokens | Use freely inside the component they belong to, for the property they were made for; any other use requires explicit human approval |`
- L41–42 before: `get_section({ path: ".kiro/steering/Token-Governance.md", heading: "Token Selection Matrix" })` / `get_section({ path: ".kiro/steering/Component-Development-Guide.md", heading: "Token Selection Decision Framework" })`. After: `get_section({ path: "token-governance", heading: "Token Selection Matrix" })` / `get_section({ path: "component-development-guide", heading: "Token Selection Decision Framework" })` (the two doc ids, read from each file's frontmatter `id:`).

L25–31 (the Component Token Rule copy) is unchanged under both F-3 options.

### Site 7: `canonical/agents/ada.md` L389 — F-1 (b) only (Ada's text)

- Before: `Your token-governance autonomy levels (semantic freely / primitive with prior context / component with explicit approval / creation always human-reviewed) are delivered as ambient law — see the Ambient section's `token-governance` embed; apply them as written there.`
- After, F-1 (b): `Your token-governance autonomy levels (semantic freely / primitive with prior context / component freely inside its own component, another component's token with explicit approval / creation always human-reviewed) are delivered as ambient law — see the Ambient section's `token-governance` embed; apply them as written there.`
- Under F-1 (a): unchanged. Ada's charter has no "Token Selection Priority" restatement (`grep -n -i priority canonical/agents/ada.md` → none); L314's hierarchy line is the reference hierarchy, not the order, and does not move.

### Not edited, and why

- `governance/Component-Development-Guide.md` § "Component Token Files" (~L562–600): a different teaching (a token-reference map); **a rule-10 record, Lina to file**.
- `src/build/tokens/TokenSelector.ts` L4–9, `TokenSelection.ts` L27–30, `TokenIntegrator.ts` L5/L61, `src/build/errors/ErrorDocumentation.ts` L260, `ErrorReporter.ts` L278: code and messages that encode Core Goals' old order. Not a governance path and not a registered instrument; **a rule-10 record, owner Ada** (walk record § "Row 6", L362). `src/build` is in no seat's standing scope.
- `tests/onboarding-trio/fixtures/born-{cc,kiro}/**`: frozen captures of past runs, evidence, not readers.
- `canonical/_consumer-output/**`, `.claude/agents/**`, `.kiro/agents/**`: generated; regenerated at application.
- Ledgers that cite Core Goals L73–74 (`.kiro/issues/2026-10-24-component-token-custom-values-unvalidated.md` L14): a dated append under F-3 (A), never a rewrite.
- `.kiro/steering/core-goals.md` L84–87: unchanged (§ 3).

## 5. Census

`governance/Token-Governance.md`, `.kiro/steering/core-goals.md`, the Component-Development-Guide and Web-Authoring-Standards, and `canonical/agents/{lina,ada}.md` are each loaded by registered instruments (condition 1). No item names an instrument code change.

Item 1 (Token Governance):
- `**Census**: not in scope — check-section-citations (scripts/check-section-citations.ts, citing roots governance/, .kiro/steering/, canonical/) — no cited heading is renamed or removed ("Token Selection Matrix", "Token Usage Governance", "Component Token Usage", "Token Creation Governance", "Decision Examples" keep their text); the item adds one H3 (F-3 (A)) and no get_section / get_document_* citation`
- `**Census**: not in scope — 122-canonical-vs-truth (governanceAsLaw mustContain over the asserted sections) — Ada's two asserted strings, "freely use semantic concept tokens" (L100) and "Creating ANY token (semantic, primitive, or component) requires human review" (L186), are outside every hunk and unchanged`
- `**Census**: not in scope — 122-sweep-1-refs (route resolution over canonical/agents/*.md) — every routed heading on token-governance (Lina's token-usage-law → "Token Usage Governance"; Ada's theme-registry-law → "Theme Registry (Spec 094)") keeps its text`
- `**Census**: not in scope — 122-diff-guard (tools/agent-generator/diff-guard.ts; governance/ is an input-closure root) — an ordinary closure input; the Ada embed's rendered text changes (§ 6), which is regeneration, not a verdict change of the instrument; the lock is refreshed at application`

Item 2 (Core Goals):
- `**Census**: not in scope — check-section-citations (scripts/check-section-citations.ts; .kiro/steering/ is a citing root) — no instrument change; the hunk removes two citations (L63–64) and adds one (token-governance § "Token Selection Matrix", a served doc and a heading site 1a keeps), which the application run reads as resolving`
- `**Census**: not in scope — 122-diff-guard (tools/agent-generator/diff-guard.ts, with the operative-set freshness sweep) — no instrument change; the sweep will report core-goals #development-practices stale (and, through the consumer copy, its signature), which are the owed acts of § 6, not a verdict change of the instrument`
- `**Census**: not in scope — verify-signing-chain --ci (tools/agent-generator/regrounding/verify-signing-chain.ts, a step of 122-diff-guard) — no instrument change; the § 6 re-sign commits are its inputs at application, checked by links 1–3 as written`

Item 3 (follow-on sites):
- `**Census**: not in scope — check-section-citations — sites 3, 5 and 7 rename no heading; site 4 renames four H3 headings of Component-Development-Guide (Step 2, "What If Tokens Don't Exist?" → Step 4, Step 3 and Step 4 → "After the Decision: …"), and no citation in a citing root names them (git grep at 1eced6cd5: hits only in .kiro/specs/021-mcp-documentation-server/ history, the mcp-server README example and mcp-server test mocks, none in governance/, .kiro/steering/ or canonical/); the L43/L48 lines that name two of them change in the same hunk (adjunct A); the citations the sites add target token-governance § "Token Selection Matrix", which site 1a keeps`
- `**Census**: not in scope — 122-sweep-1-refs — Lina's routes token-usage-law ("Token Usage Governance") and token-selection-framework ("Token Selection Decision Framework", the H2 site 4 keeps) keep their target headings`
- `**Census**: not in scope — 122-canonical-vs-truth — Sparky's asserted string in Web-Authoring-Standards § "Hard Rules" (L34) is outside site 5's hunks`
- `**Census**: not in scope — 122-diff-guard / verify-signing-chain --ci — no instrument change; the stale units sites 3 and 7 produce are § 6's owed acts`
- Site 6 (`.cursor/rules/tokens.mdc`): no registered instrument reads `.cursor/`; no census line is owed (not presumptively in scope).

*(Filer's correction to the measure: its item-3 census line read "sites 3–5 and 7 rename no heading", which Lina's site-4 text makes false. The line above replaces it; the census reader reads the replacement.)*

## 6. Re-sign consequences and who acts (owed with the edit, never by hand)

**The seat-object boundary** (Spec 123 design C1/C16; the #472 precedent): the operative-set items, the overlay units and every dispositions-row field except its signature are the **profile author's** (Thurgood's) authoring acts; a seat's acts are its re-confirmation (the confirmation sub-object and its sheet section, where the confirmer may correct the item set, as Stacy did for Core Goals, 21 → 23) and its re-signature. A seat's own charter line is applied by Thurgood **byte for byte** from the seat's text, because the seat's authoring commit would stale the unit it then confirms (six-roots ballot errata (f)). In #472 this was `46ae0efda` (Thurgood re-quoted Core Goals', Kenya's, Data's and Lina's items) and `3071015d2` (Thurgood re-grounded the four overlays), then each seat's confirm and sign.

| Signed / retained unit | Moves under | Acts |
|---|---|---|
| Core Goals `#development-practices` (`canonical/operative-sets/core-goals.yaml` L52–147; owner Thurgood, confirmer Stacy) | always | **The second re-sign in two days**: #472 re-confirmed (`e73a4fc1b`) and re-signed (`3c7a41c1d`) this unit on 2026-10-25, the outcome Ada's co-owner line foresaw if the served-docs PR merged first. Thurgood re-authors the items: `token-governance-query` and `practice-15`…`practice-18` go; one pointer item is added (`token-selection-pointer`, kind obligation, text = the pointer line); `construction-rule` goes under F-3 (A); `practice-13` is re-authored under F-1 (b); `practice-8` is re-authored under F-2 (B). Stacy re-confirms (C16) in `canonical/profiles/consumer/confirmations/core-goals.md` § `#development-practices`; its ruling that `practice-15` carries "MUST follow this order" so a reordering is detected retires with the item, and the pointer item carries the order's only home instead |
| Core Goals consumer row `#development-practices` (`canonical/profiles/consumer/always-set/core-goals.dispositions.yaml` L9, re-pointed, signer Stacy) and its overlay unit (`always-set/core-goals.overlay.md` L23) | always | Thurgood re-renders the overlay unit (the amendment pointer's ballot path is DesignerPunk-internal; whether a subtraction removes it is his call at application); the row's three removals quote text outside the hunk and stand. Stacy re-signs (C1), `canonical/profiles/consumer/signatures/core-goals.md` § `#development-practices` |
| Lina `#token-selection-priority-must-follow-this-order` (`canonical/operative-sets/lina.yaml` L450–469; confirmer Lina; consumer row `canonical/profiles/consumer/lina.dispositions.yaml` L26, re-pointed, signer Lina; overlay `canonical/profiles/consumer/lina.overlay.md` L48) | always (site 3) | Also its second re-sign (#472: `137dd98c2` confirm, `d45e17e02` sign). Thurgood applies site 3 byte for byte, re-authors the items (the four `priority-*` items go; under the pointer form Lina proposes `priority-pointer`, obligation: query the matrix before choosing, and `priority-no-creation`, obligation: a missing token is a checkpoint and a hand-off, never created to finish a selection), and re-renders the overlay unit; the row's `removals` entry ("Peter") still quotes text in the pointer form and stands. Lina re-confirms and re-signs |
| Ada `#what-this-means-in-practice` (`canonical/operative-sets/ada.yaml` L284–307, item `practice-ambient-law`; consumer row `canonical/profiles/consumer/ada.dispositions.yaml` L19, re-pointed, signer Ada; overlay `canonical/profiles/consumer/ada.overlay.md` L67) | **F-1 (b) only** (site 7) | Thurgood applies L389 byte for byte, re-authors the item and re-renders the overlay unit. Ada re-confirms and re-signs |
| Ada `#in-scope` | does not move | none |
| Ada's ambient `token-governance` embed (§ "Token Usage Governance" + § "Token Creation Governance"; consumer rows retained) | always (sites 1b, 1c; the class-rule sentence under F-1 (b)) | Rendered text changes in `.claude/agents/ada.md`, `.kiro/agents/ada-prompt.md` and the consumer outputs. A retained embed carries no signature (`tools/agent-generator/regrounding/dispositions.ts` L34: an embed is never re-pointed): regeneration only, no act. *(Read from the dispositions rule; that the freshness sweep reports nothing for it is confirmed by the application run's sweep.)* Site 1a is outside the embed |
| Sparky's ambient `web-authoring-standards#hard-rules` (retained) | always (site 5, L106) | regeneration only, no act |

**Grants**: Thurgood's authoring acts above are outside his standing write scope. Peter's ratification names the files, or a grant record does before the application PR: `.kiro/steering/core-goals.md`; `canonical/operative-sets/{core-goals,lina}.yaml` (and `ada.yaml` under F-1 (b)); `canonical/profiles/consumer/always-set/core-goals.{dispositions.yaml,overlay.md}`; `canonical/profiles/consumer/lina.{dispositions.yaml,overlay.md}` (and `ada.*` under F-1 (b)); `canonical/agents/lina.md` L499–504 (and `canonical/agents/ada.md` L389 under F-1 (b)), byte for byte from the owner's text; `canonical/generated.lock` and the generated roots, for the one regeneration. Ada applies item 1 (`governance/Token-Governance.md`) and Lina sites 4–5 (`governance/Component-Development-Guide.md`, `governance/Web-Authoring-Standards.md`), each named in the grant as #472 did. `.cursor/rules/tokens.mdc` needs the grant to name its applying seat (site 6). Each seat's confirmation and signature sections are its own acts and need no grant (signing-act ballot M1).

## 7. Forks for Peter (none is picked here)

**Open for Peter**: F-1 = walk line 6(i). Inside the owning component, does using its own component token still need a checkpoint? **(a) Yes, waived when the spec names the token** (Ada's measure as drafted): today's rule kept, scoped to step 2; sites 1b (scope line, one format line) and 1d's checkpoint; Core Goals L58, Ada's L389, Lina's wording and `.cursor` L22 stay true. *Surviving counter*: when the spec is silent, an agent inside Button-Icon checkpoints to use Button-Icon's own token before it may use a lower-friction primitive. **(b) No checkpoint inside the owner, for the property the token was made for; another component's token, or an owner token for another property, only through step 4** (Lina: "I would argue no checkpoint inside the owner, with the checkpoint kept for another component's token", walk record L175; **Ada's 6(i) consult of 2026-10-25 also picks (b)**, "agreeing with Lina"): site 1b rewritten, Core Goals L58, Ada's L389 (one more signed unit), `.cursor` L22, about 2 more hours and one more re-sign. **Orchestrator's recommendation: (b), with the class rule "a use-time checkpoint applies only to a use not reviewed at creation"** (Ada's consult sentence: "A use-time checkpoint applies only where that use was not reviewed when the token was made", placed by site 1a's note). It covers every tier: semantic use stays free, primitive use stays gated (primitives are made for the system, not for one use), component tokens are gated at creation and at any use outside their owner. *Surviving counter (Ada)*: nothing proves the creation review happened. Older component tokens predate the creation rule and some were pre-authorized in bulk in specs, so no one reviewed each value, and nothing checks "the property it was made for"; with the use-time gate gone, the only check left is Stacy's claims pass, after the fact. Your answer: (a) / (b) / (b) with the class rule.

**Open for Peter**: F-2 (found while drafting). Inside the owning component, does a fitting semantic token still beat the component's own token? Evidence that the ruled order misfires: `buttonicon.inset.small` references `space100`, and the semantic `space.inset.100` also references `space100`; Button-Icon reads its own token on every platform (`ButtonIcon.web.css` L77, `var(--buttonicon-inset-small)`). Read literally, step 1 fires for the small size, so the order calls shipped Button-Icon code wrong and splits one inset family across two tiers. **(A) As ruled**: semantic → own token → primitive → STOP; no extra effort. *Counter*: that misfire, in every component whose token shares a value with a semantic token. **(B) Inside the owning component, its own token for the property first; everywhere else, semantic first**: site 1a's steps 1 and 2 swap, Core Goals L51 gains "except a component's own token inside that component" (same unit, already re-signing), about 1 hour. *Counter*: "semantic first" stops being unconditional in always-loaded text, and a badly made component token shadows a good semantic one inside its component, where (A) would catch it. **Lina picks (B)**: "Inside its own component, the component's own token for the property should win … a human decided the semantic set did not cover this component"; her surviving counter, the shadowing, she answers at creation (the Step 4 checkpoint, the construction rule, her compliance tests). **Ada: no pick** (she found the defect and leaves it to Lina's read and yours). Your answer: (A) / (B).

**Open for Peter**: F-3. Where does the Component Token Construction Rule live once Core Goals' token section is a pointer? **(A) Moved verbatim to Token Governance § "Token Creation Governance"** (site 1c): step 4 cites it there; Ada's embed carries it and Lina's charter keeps its own copy (L506–507). *Counter*: every other seat and consumer loses it from always-loaded context; Core Goals L59 ("Creating ANY token: Always requires human review") stays always-loaded for them. **(B) Kept in Core Goals at L73–74**, the pointer replacing the rest. *Counter*: Core Goals stays a second home of component-token law; it is not the order, so it cannot contradict the matrix, but 6(ii)'s "pointer only" reads less cleanly. **Lina picks (A)**: "Only Ada and Lina create or consume component tokens, and both keep it ambient … The rule is creation law, and Token Creation Governance is where step 4 sends the creator." Ada drafted (A) and picks neither. Your answer: (A) / (B).

**Q-S, directed to Sparky (R1; not a Peter fork unless he disagrees)**: [@SPARKY] (1) Does site 5's L106 sentence state your workflow correctly ("This priority chain is Sparky's decision tree for screen CSS … Component tokens are not part of Sparky's workflow")? (2) Is your screen chain (Web-Authoring-Standards L96–102: semantic → primitive → product token, "There is no step 4") the matrix's specialisation for product screen CSS, as § 1 "Scope" reads it, or a second order this ballot must reconcile? If you read it as a specialisation, the ballot needs no further edit; Lina's L106 text says so in your embed. If not, the disagreement goes to Peter before ratification. -- [THURGOOD R0]

## 8. Sequencing

1. **This PR files the DRAFT.** Its merge records the measure; it ratifies nothing and applies nothing.
2. **Stacy's R1** (required; census lines, kinds, re-sign read), with Lina's and Sparky's entries, and the owed texts: Ada's site 6 text (or acceptance of the placeholder) and her two R1 items (site 1a's F-2 (B) wording and class-rule placement; site 1b's (b) checkpoint heading); Lina's F-2 (B) texts for site 4 and the site-3 fallback, if those stay live.
3. **Peter ratifies** in chat with his F-1, F-2 and F-3 answers; the receiving session commits the Status line first (record-first), with the README roll entry in the same commit.
4. **One application PR**, Peter-merged: every hunk as ratified; § 6's acts in order (Thurgood's applications and authoring, then each seat's confirm and sign commits under its own `Agent:` trailer); **one regeneration** and one lock refresh, last.
5. **With the fix-now ballot** (`2026-10-24-ballot-audit-fix-now-law.md`, DRAFT): its item 4 re-signs Core Goals `#core-project-context`, a different unit with no shared before-text. Applied in one window, they share one regeneration and one lock refresh.
6. **Timing against S**: walk row 6 (P0) closes before S only if this ballot is ratified and applied before S. Otherwise it lapses at S and escalates (walk record L364).

## 9. Counter-argument (after fold-back)

**Run against the whole ballot**: the pointer-only Core Goals takes the order out of always-loaded context, so an agent that never pulls the matrix keeps L51 ("semantic first, primitive only when no semantic token exists") and L58 and never meets step 2. *Folded*: the pointer line says to query before choosing and names the exact `get_section` call; Lina, the one seat that consumes component tokens, keeps a pointer plus her no-creation rule in her charter; the matrix states that it is the only copy; step 2 is scoped to the owning component, which removes the old matrix's reading that any component token beats any primitive anywhere.

**What survives**:
1. **The salience loss is real** (6(ii)'s named cost, accepted by Peter's ruling): an agent that does not follow the pointer meets no order. L51 still keeps it from the worst mistake (primitive before semantic).
2. **F-2 is a defect in the ruled order**, not a style question. Ratifying F-2 (A) makes shipped Button-Icon code read as non-compliant.
3. **Two adjacent contradictions stay, and this ballot does not fix them**: Example 6 and the Creation Decision Matrix row "One-off value, doesn't fit math → Component token" (L228) against the construction rule; and `src/build`'s encoded old order. They go to rule-10 records, or into `2026-10-24-component-token-custom-values-unvalidated.md`, at Ada's call (walk record L363). *(A third the measure listed, Token Governance L85 "Component tokens should reference semantic tokens", was rewritten by #472 to "Component colors reference semantic tokens" and no longer contradicts the construction rule.)*
4. **The filer wrote two texts in owners' sites** (the site 6 placeholder and the F-2 (B) write-out of site 1a). Both are labelled, and each owner can replace them at R1; until then a reader cannot tell the owner agreed.

## 10. Cost

- Measure and site texts: done (Ada, Lina). Filing, re-base and frame: this PR.
- Stacy's R1: one review round. Lina's and Sparky's entries: minutes each. Ada's owed site-6 text and two R1 items: under an hour.
- Application PR: about 0.5–1 day elapsed. Four Token Governance hunks, one Core Goals hunk (plus up to two one-liners), five follow-on sites; re-sign acts by Thurgood (authoring), Stacy and Lina (and Ada under F-1 (b)); one regeneration, the lock refresh, `rebuild_index`.
- Peter: F-1, F-2, F-3; ratify; merge two PRs.

## 11. Application (on ratification, one PR, Peter-merged)

1. Flip the Status line to `**Status**: **RATIFIED (Peter, <date>)** — <F-1, F-2, F-3 answers>`, fill `<ratification date>` in the amendment pointers, and commit before any edit site (README § "The Ratification Protocol"); add the README roll entry in the same commit.
2. Branch `chore/token-selection-order-one-rule`. Apply each hunk exactly as ratified, with one bracket kept per fork; stop on any before-text that does not match at the application base, and report (`git diff --quiet 1eced6cd5 <base> -- <site files>` first).
3. PR body: one `**Edit kind**: <path> — LAW (.kiro/docs/ballots/2026-10-25-token-selection-order-one-rule.md)` line per governance-path file (Token-Governance, core-goals, Component-Development-Guide, Web-Authoring-Standards, `canonical/agents/lina.md`, and `canonical/agents/ada.md` under F-1 (b)); `**Consulted**:` Ada, Lina, Sparky, Stacy.
4. § 6's acts in the same PR, under the grant; each seat's commit under its own `Agent:` trailer, the trailer in the commit message's final paragraph.
5. Straggler sweep, expecting only ledger, frozen-fixture, spec-history and `src/build` hits: `git grep -n -i -E "Token Selection Priority|Core Goals' token selection|semantic → primitive → component|COMPONENT TOKEN EXISTS" -- governance .kiro/steering canonical/agents canonical/profiles .cursor README.md`.
6. `npm run build:generator`; `npm run -s check:122:diff-guard` (commit the lock refresh it writes); `npm run -s check:section-citations`; `node scripts/validate-steering-metadata.js`; `npm test` (canonical-vs-truth and the sweeps run in the root lane); docs MCP `rebuild_index` (Token-Governance, Component-Development-Guide and Web-Authoring-Standards are served).
7. Close `.kiro/issues/2026-10-24-token-selection-order-core-goals-vs-token-governance.md` by a dated outcome line in the application PR. Under F-3 (A), append the dated L73–74 note to `2026-10-24-component-token-custom-values-unvalidated.md`. File the two rule-10 records of § 4 "Not edited" (Lina: CDG § "Component Token Files"; Ada: `src/build`), if not filed earlier.

## 12. Review record

### [THURGOOD R0] — filing (2026-10-25)
- Filed from Ada's measure (`measure.md`, 310 lines, 2026-10-25) and Lina's sites (`lina-sites.md`, 2026-10-25), both drafted outside the repo; this file is their first committed form.
- Re-based every before-text onto `1eced6cd5` (§ 0). The after-texts of §§ 2–3 are Ada's except where labelled; sites 3–5 are Lina's except where labelled.
- Frame changes to Ada's measure: F-1's attribution updated with her 6(i) consult (she now picks (b)); the Example 7 before-text and its defect statement re-based; the served-docs sequencing note retired as moot; the item-3 census line corrected (site 4 renames headings); § 5's Core Goals row gains `practice-8` under F-2 (B) and the "second re-sign" note; Lina's unit row gains its own second-re-sign note; the grants paragraph widened to every authoring file; the L85 survivor retired (fixed by #472); the scope statement for Sparky's screen chain added (§ 1) with Q-S.
- Frame changes to Lina's sites: her own re-authoring of the operative-set items, the overlay unit and the dispositions row is corrected to the seat-object boundary (§ 6): Thurgood applies her charter text byte for byte (errata (f)) and authors the items and the overlay; her acts are the re-confirm and the re-sign, and her two proposed items are carried as her proposal; the consumer-profile path note confirmed (`canonical/profiles/consumer/lina.*`, not `always-set/`); the glossary line is L261.
- The row's record is `.kiro/issues/2026-10-24-token-selection-order-core-goals-vs-token-governance.md` (walk line 6). `.kiro/issues/2026-10-24-component-token-usage-forks.md` is a different record (Input-Text success border, Button-CTA typography, restated variant tokens) and is not touched by this ballot.

*(Stacy R1, Lina, Sparky and any owner R1 entries follow here.)*
