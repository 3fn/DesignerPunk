# Spec Feedback: Steering Progressive Disclosure Redesign

**Spec**: 119-steering-progressive-disclosure-redesign
**Created**: 2026-06-19

---

## Design Outline Feedback

### Context for Reviewers

- The root cause (Kiro `#[[file:...]]` references in the always-loaded meta-guide bulk-loading all ~90 docs) is confirmed → design-outline.md § "Problem Statement"
- Portability-first is a design principle — we're minimizing Kiro-proprietary surface area → design-outline.md § "Design Principle: Portability First"
- Activation logic lives in agent prompts, delivery via Docs MCP → design-outline.md § "Proposed Architecture"
- Kiro `auto` inclusion explicitly rejected as non-portable → design-outline.md § "Why NOT Kiro auto Inclusion"
- Directory relocation out of `.kiro/steering/` is in scope → design-outline.md § "Requirement B"
- Always-loaded identity layer is 9 docs (~7,500 tokens) → design-outline.md § "Decision 2"
- Documentation Directory is manual-inclusion (MCP-queried when outside your lane) → design-outline.md § "The Documentation Directory"
- Certainty calibration protocol (certain → research → ask) proposed → design-outline.md § "Decision 4a"
- Case study with before/after metrics is a requirement → design-outline.md § "Requirement C"

### Reviewers

- **Ada** — Token doc routing adequacy, Rosetta domain coverage in prompt routing
- **Lina** — Component doc routing adequacy, platform guidelines, Stemma domain coverage
- **Leonardo** — Product agent consumption perspective, certainty calibration protocol from consumer side
- **Sparky** — Web platform prompt enhancement needs
- **Kenya** — iOS platform prompt enhancement needs
- **Data** — Android platform prompt enhancement needs
- **Stacy** — Measurement methodology review, quality metric definitions

### Review Questions (All Agents)

1. Does your current agent prompt's MCP routing table adequately cover your domain? What's missing?
2. Does the certainty calibration protocol (certain → research → ask) work for your workflow?
3. Does the Documentation Directory concept (manual, MCP-queried) serve your cross-domain needs?
4. Are there docs you depend on that MUST remain always-loaded (not just convenient — actually required every session)?
5. Any concerns about the directory relocation impacting your workflow?

---

#### [ADA R1]

**Overall assessment**: Strong proposal. The leak fix alone is worth doing. The architecture is sound — agent prompts as activation, MCP as delivery mirrors how I already work when I'm reasoning well. My concerns are about coverage gaps in the transition, not the model itself.

**1. MCP Routing Table Coverage** → "Agent Prompt Routing: What Needs Enhancement"

My current prompt's routing table covers: Token-Family-{Name} docs (all 16), Token-Governance.md, Rosetta-System-Architecture.md, rosetta-system-principles.md, Token-Quick-Reference.md, Token-Resolution-Patterns.md, Token-Semantic-Structure.md, Completion Documentation Guide, Process-Spec-Planning.md, Component-Development-Guide § Token Selection Decision Framework.

**Gaps the design outline correctly identifies**: DTCG-Integration-Guide.md, Figma-Workflow-Guide.md, Token-Family-Blur.md (added Spec 089), Token-Family-Sizing.md (added Spec 089).

**Additional gaps NOT identified**: DesignerPunk-Integration-Guide.md (pipeline/config), Transformer-Development-Guide.md, MCP-Integration-Guide.md, Product-Token-Governance.md.

**Recommendation**: Phase 7 routing audit should verify my prompt covers all 16 Token-Family docs + 4 governance/architecture + 5 integration/pipeline docs. Total: ~25 docs in my routing table. → Phase 7

**2. Certainty Calibration Protocol** → "Decision 4a"

- Three-tier model maps well. Most work is Tier 1.
- **Concern**: Protocol says "query Documentation Directory first" at Tier 2. For token work, I'd go straight to the relevant Token-Family doc. Directory is for cross-domain, not in-domain uncertainty. Wording should clarify: Tier 2 = "research via Docs MCP (your routing table first, Documentation Directory if outside your lane)." → Decision 4a

**3. Documentation Directory** → "The Documentation Directory"

- Serves my cross-domain use case (process questions, hook system) well.
- **Risk**: If ~800 tokens with just names and paths, it doesn't help me understand *when* I'd need a doc. Include frontmatter `description` fields alongside paths for discoverability.

**4. Always-Loaded Dependencies** → "Decision 2"

- Core Goals: YES (Token Selection Priority)
- AI-Collaboration-Principles: YES (counter-argument requirement)
- Agent-Directory: YES
- Start Up Tasks + Task Completion Protocol: YES (split is sensible)
- Process-Development-Workflow: comfortable with `manual`
- No other always-loaded docs needed.

**5. Directory Relocation** → "Requirement B"

- **Primary concern**: ~25 MCP paths in my prompt break on relocation. Phase 10 effort estimate ("1 hour") feels low given 8 prompts × 5-25 paths = 40-200 path updates.
- **Risk**: Transition window where SOME paths old/SOME new is highest-risk. MCP should return redirect notice, or prompts updated atomically with relocation.
- **Recommendation on Open Question 6**: Atomic. All 8 prompts in same commit as relocation.
- **Open Question 3 preference**: Option (d) — MCP only indexes relocated docs. Identity docs always-loaded via native mechanism, don't need MCP serving.

**Additional**:
- Token-Family-Blur.md (Spec 089) may not appear in inventory if based on old snapshot. Phase 0 must reflect current state.
- Integration docs (DTCG/Figma/Transformer/MCP) need explicit ownership in routing audit.
- Documentation Directory should include frontmatter `description` fields.

---

#### [LINA R1]

**Overall assessment**: The architecture is correct — agent prompts as activation, MCP as delivery is how I already work at my best. The meta-guide leak means I've been swimming in token soup without realizing it. Fixing this is unambiguously good. My concerns are practical: routing table completeness, platform agent access to docs I own, and one always-loaded dependency that needs discussion.

**1. MCP Routing Table Coverage** → "Agent Prompt Routing: What Needs Enhancement"

My prompt's current routing table covers: Component-Development-Guide, Component-Templates, Component-Schema-Format, Component-Inheritance-Structures, Contract-System-Reference, platform-implementation-guidelines.md, Cross-Platform vs Platform-Specific Decision Framework.md, Component-Family-{Name} docs (all 14), Test-Behavioral-Contract-Validation, Component-Readiness-Status, Component-MCP-Document-Template, Completion Documentation Guide, Process-Spec-Planning (tasks format), Token-Governance (usage governance), Token-Quick-Reference, component-meta-authoring-guide, Component-Meta-Data-Shapes-Governance.

**Gaps the design outline correctly identifies**: Component-Readiness-Status is in my prompt but buried — needs elevation to a routing trigger ("when evaluating component maturity → query...").

**Additional gaps NOT identified**:
- `Component-Development-Standards.md` — I reference this for new family creation workflows. Missing from routing table.
- `Stemma-System-Principles.md` — architectural foundation. Referenced when explaining inheritance decisions or naming conventions.
- `Component-Primitive-vs-Semantic-Philosophy.md` — needed when advising on component selection decisions.
- `Web-Authoring-Standards.md` — I own CSS patterns for web components (logical properties, custom property naming). Should be in my routing table even though Sparky also uses it.
- `Browser Distribution Guide.md` — referenced when working on browser entry, demos, or bundle issues.

**Recommendation**: Phase 7 should verify my prompt covers all 14 Component-Family docs + ~12 architecture/governance/standard docs + ~3 process docs. Total: ~29 docs in my routing table. → Phase 7

**2. Certainty Calibration Protocol** → "Decision 4a"

- Three-tier model works well for component work. Most implementation is Tier 1 — I know which component family doc to query, which schema format to follow, which contract system reference to check.
- **Agree with Ada and Kenya**: Tier 2 wording needs correction. "Research via Docs MCP" should be "query your routing table first, Documentation Directory only when outside your lane." For component work, I'd never start at the Directory — I'd go straight to `get_section({ path: "Contract-System-Reference.md", heading: "Concept Catalog" })`.
- **Positive**: Explicit "still uncertain → prompt user" legitimizes the pause-and-ask behavior already documented in Component-Development-Guide § "When to Pause and Ask." This aligns, not conflicts.

**3. Platform Agent Access to My Docs** → "Requirement B" + "Agent Prompt Routing"

This is my primary concern. I own two docs that platform agents (Sparky, Kenya, Data) depend on:
- `platform-implementation-guidelines.md` — behavioral contract compliance rules, acceptable platform optimizations, prohibited variations, Android `.dp` pattern
- `Cross-Platform vs Platform-Specific Decision Framework.md` — when to use tokens vs native idioms

Post-migration these move out of `.kiro/steering/`. The platform agents' prompts MUST include explicit routing to these docs. Currently:
- **Sparky**: has vague "Platform implementation guidelines" mention — needs explicit MCP path
- **Kenya**: NO explicit path to either doc (confirmed in Kenya R1)
- **Data**: NO explicit path (confirmed in Data R1). The `.dp` rule in platform-implementation-guidelines is critical for Data.

**Recommendation**: Phase 8 must ensure ALL platform agents have explicit routing entries for both docs. These are cross-platform consistency docs that every platform agent touches every session. Missing them post-migration = behavioral contract violations creeping in.

**[@SPARKY, @KENYA, @DATA]** Can you confirm these two docs (`platform-implementation-guidelines.md`, `Cross-Platform vs Platform-Specific Decision Framework.md`) would be top-5 in your routing tables?

**4. Always-Loaded Dependencies** → "Decision 2"

- Core Goals: YES (Token Selection Priority, component token construction rule)
- AI-Collaboration-Principles: YES (counter-argument requirement)
- Agent-Directory: YES (domain routing)
- Start Up Tasks + Task Completion Protocol: YES (split is good architecture — I've observed the "buried instructions" problem firsthand)
- DesignerPunk-Systems-Overview: YES (three-system mental model for explaining Stemma's relationship to Rosetta/Civitas)
- Spec-Feedback-Protocol: YES (I participate in feedback rounds like this one)
- Process-Development-Workflow: Comfortable with `manual` — I query specific sections when completing tasks, don't need the whole doc loaded.

**No additional always-loaded requirements.** Component-Development-Guide is my most-referenced doc but it's large (~15K tokens) and I only ever need 1-2 sections per task. Perfect MCP candidate.

**5. Directory Relocation** → "Requirement B"

- **Low concern for my workflow.** My prompt already has explicit MCP paths — updating paths is mechanical.
- **Agree with Ada**: Phase 10 ("1 hour") is underestimated. My prompt alone has ~25 MCP paths. 8 agents × 5-25 paths = significant find-and-replace.
- **Agree with Ada on atomicity**: All 8 prompts updated in same commit as relocation. Transition window with mixed paths is the highest-risk period.
- **Open Question 3**: Prefer option (d) — identity docs are always-loaded, don't need MCP serving. MCP indexes only the relocated directory.
- **Concern about Open Question 4 (cross-references)**: Component-Family docs have `## Related Documentation` sections with relative paths. These ALL need updating. 14 family docs × 5-8 links = 70-112 path updates. Phase 11 estimate ("2-3 hours") may be tight if done thoroughly.

**Additional feedback**:

- **Agree with Kenya R1**: Gap table lumps platform agents together. Each platform agent has distinct routing needs. Phase 7 must treat them individually. → "Agent Prompt Routing: What Needs Enhancement"
- **Agree with Stacy R1**: Phase 3 (10 min) is insufficient validation. Need fresh sessions for at least 2 agents confirming only identity docs loaded. → "Implementation Estimate"
- **Knowledge Bases as third access pattern** (Kenya raises, Data echoes): The spec should acknowledge `/knowledge` search as complementary to MCP queries. For component implementation, KB search is often faster than MCP section queries. The spec's architecture diagram should show three access layers: always-loaded identity → MCP progressive disclosure → KB semantic search.
- **Component-Family docs have Component Metadata sections**: These are consumed by the extraction script (`npm run extract:meta`). Post-relocation, the extraction script's source path needs updating. Not in scope for this spec but should be flagged for Phase 9 checklist.
- **Task Completion Protocol split**: Strong support. I've observed agents burying completion doc instructions under Jest commands and date checks. Separation = salience. The hypothesis (structural problem → fix structure) is sound.
- **Open Question 7 (representative tasks)**: For component work specifically, I'd recommend: "Add a new behavioral contract to an existing component" — this exercises Contract-System-Reference, contracts.yaml format, platform-implementation-guidelines, and Component-Family doc updates. Tests in-domain routing depth.

---

#### [STACY R1]

**1. Measurement Methodology (Requirement C)** → "Requirement C"

- "Output quality assessment" and "comparative review" are undefined — who reviews, against what rubric, with what scoring? Without a defined rubric, case study becomes anecdotal.
- **Missing metric: Correction frequency per task type.** Operational definition: how many times does human intervene to correct factual error, process deviation, or wrong component/token selection per task?
- **Missing metric: MCP query accuracy.** Post-migration, track queries that return useful content vs. queries requiring follow-up or human redirect. Core quality signal.
- **Missing metric: First-attempt correctness.** Does agent produce spec-compliant output on first attempt without human saying "you forgot the completion doc" / "wrong token tier"?
- **Missing metric: Certainty calibration compliance.** Track how often agents actually escalate to Tier 2/3 vs. acting on insufficient context.
- **Time horizon confounder**: "Before" measurements give agents unfair advantage (everything loaded). Include 2-4 week stabilization period before "after" measurements. Acknowledge this in case study.

**2. Certainty Calibration Protocol** → "Decision 4a"

- Three-tier model aligns with how I audit platform agent work. Formalizes what should already be happening.
- **Tier 2 wording too weak**: Should specify "query your routing table first, Directory for cross-domain." Current wording makes Directory sound primary — inverts the architecture.
- **Missing: operational definition of "certain."** Agent is "certain" when: (a) identity docs cover the question, OR (b) prompt routing table has explicit entry for task type AND they've queried relevant section. Without this boundary, agents rationalize "certain" to avoid MCP overhead — completion bias the protocol exists to counter.

**3. Success Criteria** → "Success Criteria"

- Criterion 5 ("No degradation") unmeasurable as written. Replace: "First-attempt correctness rate on representative tasks within 10% of baseline (or improves)."
- Criterion 6 ("completion docs without prompting") needs operational definition: (a) mentioned, (b) file created, or (c) file meets Tier requirements? Require (c).
- **Missing criterion: No orphaned docs.** Every doc queryable via MCP, listed in Directory, reachable from at least one agent prompt's routing table.
- **Missing criterion: Agent prompt routing completeness.** 100% of task types per agent domain map to routing entries.
- Criterion 8 is a deliverable, not criterion. Reframe: "Case study demonstrates ≥90% token reduction with ≤10% quality degradation."

**4. Phased Migration QA Concerns** → "Implementation Estimate"

- Phase 3 ("validate leak is fixed" — 10 min) is insufficient. Require: fresh session for 2+ agents, verify only 9 identity docs loaded, run simple task confirming MCP queries work. 30-45 min.
- Phase 9 (relocate docs) needs explicit rollback protocol. "Independently reversible" not operationalized. Document: `git revert` of move + restore `MCP_STEERING_DIR`.
- Missing quality gate between Phase 8 and Phase 9. Run representative tasks after prompt enhancement, before relocation — catch bad prompts before amplifying with migration.
- Phase 7 for platform agents is "create from scratch" not "audit." Relabel and recalculate effort (system agents: 1hr audit; product agents: 2-3hrs creation × 4).
- Phase 14 lacks comparison protocol definition. Define before Phase 1, not after Phase 13.

**5. Recommended Representative Tasks** (5 tasks covering agent types, complexity, domain):

1. **Spec formalization** (Thurgood): Design outline → requirements.md. Signal: finds Process-Spec-Planning without it loaded.
2. **Component implementation** (Lina): New behavioral contract on existing component. Signal: finds Contract-System-Reference.
3. **Token creation governance** (Ada): Propose new semantic token. Signal: follows Token-Governance flow.
4. **Cross-domain query** (any): Question outside agent's domain. Signal: certainty calibration activates correctly.
5. **Parent task completion** (any): Complete parent task end-to-end. Signal: Task Completion Protocol + routing produces correct behavior.

**Why these 5**: Cover all system agents, test in-domain and cross-domain, test knowledge retrieval AND process adherence, repeatable with unambiguous success criteria.

**Critical process note**: "Before" measurement must use SAME task formulations as "after." Define exact prompts in Phase 1, reuse verbatim in Phase 14. Different phrasing = confounded comparison.

---

#### [LEONARDO R1]

**1. MCP Routing Table Coverage** → "Agent Prompt Routing: What Needs Enhancement"

- Current prompt has Application MCP queries (find_components, get_experience_pattern, validate_assembly) + general Docs MCP patterns — solid for screen specification.
- **Gap confirmed**: Layout-Specification-Vocabulary.md — every screen spec needs layout, should be prominent route.
- **Gap: Product-Token-Governance.md** — I author product tokens during screen specs; no "when authoring product tokens → query" route exists.
- **Gap: Web-Authoring-Standards.md** — lower priority but needed when directing Sparky.
- **Gap: DesignerPunk-Integration-Guide.md** — needed for setup/configuration questions.

**2. Certainty Calibration Protocol** → "Decision 4a"

- Maps well. Screen specification is high-frequency Tier 1. Application MCP covers most needs directly.
- **Risk: Speed concern for Tier 2.** Protocol says "query Documentation Directory first, then targeted sections." That's two MCP calls before getting content. I'd skip Directory and go straight to `list_layout_templates()` or specific doc. Protocol should acknowledge agents with domain-specific MCP access can skip Directory for in-domain queries.
- **Positive**: Explicit "still uncertain → prompt user" permission is valuable. Legitimizes asking Peter instead of over-researching.

**3. Documentation Directory** → "The Documentation Directory"

- Serves my ~10% cross-domain case (governance questions, ballot measure process).
- **Concern**: ~800-1,000 tokens is tight for ~90 docs with useful descriptions. If too terse, agents skip and guess. Quality > existence.

**4. Always-Loaded Dependencies** → "Decision 2"

- DesignerPunk-Systems-Overview: YES (three-system mental model for architectural decisions)
- Agent-Directory: YES
- Core Goals: YES (token selection priority referenced nearly every spec)
- Process-Development-Workflow: NO, agree with `manual`
- Spec-Feedback-Protocol: Soft yes (participates in feedback rounds, small enough)

**5. Losing Always-Available System Context** → "Proposed Architecture"

- **Primary concern: Token Quick Reference.** Every screen spec involves token selection. Post-migration needs automatic trigger: "when specifying a screen → query Token-Quick-Reference § Color Token Concept Lookup."
- **Positive**: Application MCP tools (find_components, search_tokens, get_token_details) already provide the *data*. What I lose is *narrative* context (when to use which concept). Routing table covers this.
- No concern about Product MCP — independent of steering docs.

**Additional**:
- Open Question 5 (exploratory conversations) resonates — include at least one exploratory conversation in Phase 1 representative tasks.
- Task Completion Protocol split is good architecture — observed the "buried in Start Up Tasks" problem.
- Phase 2 alone is transformative — even without full migration, removing `#[[file:...]]` delivers 97% of savings.

---

#### [SPARKY R1]

**1. Current routing table gaps**

- Prompt is vague on MCP paths — "Token documentation" and "Platform implementation guidelines" aren't actionable. Missing explicit entries: **Web-Authoring-Standards.md** (most critical — every CSS file), **Component-Development-Guide.md § Blend Utility Integration / Incremental DOM / CSS Custom Property Naming**, **Token-Family-Blend.md**, **Token-Family-Spacing.md § Inset Spacing**, **DesignerPunk-Integration-Guide.md § Available Imports**. → "Agent Prompt Routing: What Needs Enhancement"

**2. Certainty calibration protocol works**

- Tier 1 covers 90%+ (Leonardo's spec is primary input). Tier 2 triggers on unfamiliar component APIs or missing tokens. Tier 3 rare but valid. No concerns. → "Decision 4a"

**3. Most-referenced docs**

- Web-Authoring-Standards.md (every session), Component-Development-Guide.md (blend, incremental DOM, CSS naming), Token-Family-Spacing.md, Token-Family-Blend.md, DesignerPunk-Integration-Guide.md.

**4. Always-loaded requirements**

- None beyond proposed 9. Core Goals and Start Up Tasks only always-loaded docs actually used every session. → "Decision 2"

**5. Directory relocation**

- Minimal concern. Knowledge bases index from `src/`, not `.kiro/steering/`. Only concern: Phase 10 must include all 8 agent prompts.

**Additional**: Web-Authoring-Standards.md should be #1 entry in my routing table — my equivalent of Token-Governance.md for Ada.

---

#### [KENYA R1]

**1. Current routing table — NO explicit MCP routing table exists**

- Prompt has general guidance ("Query Token-Quick-Reference via docs MCP") but nothing structured. Missing explicit routes: `Platform-Implementation-Guidelines.md`, `Component-Development-Guide.md` § iOS-relevant sections, `Token-Family-Motion.md` § iOS Platform, `Component-Family-*.md` per implementation, `Token-Governance.md` § Token Usage Governance. → "Agent Prompt Routing: What Needs Enhancement"
- **Gap table lumps Sparky/Kenya/Data together — this is wrong.** Each platform agent needs its own gap analysis. I don't need Web-Authoring-Standards.md.

**2. Certainty calibration works**

- Three-tier maps well. Tier 1 covers ~80%.
- **Concern**: Protocol says "query Documentation Directory first" at Tier 2, but for iOS work I'd go straight to specific doc. Protocol should say "query your domain docs first, Directory only when outside your lane." → "Decision 4a"

**3. Most-referenced docs**

- Platform-Implementation-Guidelines.md, Component-Family-*.md (per family), Token-Quick-Reference.md, Token-Family-Motion.md, Token-Family-Color.md, Component-Development-Guide.md, DesignerPunk-Integration-Guide.md § iOS.

**4. Always-loaded: NONE beyond proposed 9.**

**5. Directory relocation**

- Prompt currently has zero hardcoded MCP paths (generic guidance only). Relocation won't break anything but prompt needs routing table ADDED, not just path-updated. Phase 8 is where my prompt gets useful for first time.
- Concern: If `get_section({ path: "Component-Family-Button.md" })` works today without full path, does it still work post-relocation?

**Additional**:
- Knowledge Bases (`/knowledge`) are a third access pattern not mentioned in the spec — should be acknowledged as complementary.
- Phase 8 (enhance prompts) is where my value gets added or lost. I'd want to review my updated prompt before it ships.

---

#### [DATA R1]

**1. Current routing table — NO explicit MCP routing table exists**

- Prompt has generic MCP section ("Token documentation — verify token names") but no trigger-based routing. Missing: `platform-implementation-guidelines.md` (Android .dp pattern), `Token-Family-Motion.md` (Android structure), `Component-Development-Guide.md` (Compose equivalents), `Token-Family-Spacing.md`. → "Agent Prompt Routing: What Needs Enhancement"
- **Gap table lumps Sparky/Kenya/Data together — wrong for me.** I need Android-specific routes, not web authoring standards.

**2. Certainty calibration works well**

- Three-tier maps cleanly. Tier 1: know the token name and Compose API. Tier 2: verify naming convention or check semantic token existence. Tier 3: unfamiliar component/pattern.
- **Concern**: Tier 2 "research via Docs MCP" assumes I know which doc to query. Without routing table, I'd hit Directory for things that should be direct lookups. Routing table IS the efficiency layer for Tier 2.

**3. Most-referenced docs**

- platform-implementation-guidelines.md (#1), Token-Family-Spacing.md, Token-Family-Motion.md, Component-Family-*.md, Token-Family-Color.md, Contract-System-Reference.md, Rosetta-System-Architecture.md § Token Consumption Rule.

**4. Always-loaded: NONE beyond proposed 9.**

- One flag: "Token Consumption Rule" (2 sentences: "Tokens are pre-unitized. Never add platform units.") is critical enough to live in Core Goals as a one-liner. Nice-to-have, not must.

**5. Directory relocation**

- No concerns. Knowledge bases index by content, not path. Prompt has zero hardcoded paths — needs routing table ADDED in Phase 8.
- Platform Resource Map in knowledge bases covers token file locations directly.

**Additional**:
- Phase 7 audit should review each platform agent separately, not grouped.
- Routing table should indicate when to use KB search vs MCP query — these are complementary access patterns.

---

#### [STACY R1]

*No response received — recommend follow-up in next round.*
