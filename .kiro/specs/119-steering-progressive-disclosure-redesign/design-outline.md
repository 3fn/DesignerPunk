# Design Outline: Steering Progressive Disclosure Redesign

**Date**: 2026-06-19
**Spec**: 119 - Steering Progressive Disclosure Redesign
**Author**: Thurgood
**Status**: Design Outline (feedback incorporated — R1 from Ada, Lina, Leonardo, Sparky, Kenya, Data, Stacy)

---

## Problem Statement

DesignerPunk's steering documentation architecture is designed for progressive disclosure — agents should load only the context relevant to their current task. However, a structural flaw in the implementation means **all 80+ steering docs load into every session**, regardless of their `inclusion: manual` frontmatter.

**Root cause**: The always-loaded meta-guide (`00-Steering Documentation Directional Priorities.md`) uses Kiro's `#[[file:...]]` reference syntax to point to every other steering doc. Kiro resolves these references as live content injection, overriding the individual files' `inclusion: manual` setting. The result: ~300,000+ tokens of steering context per session, most irrelevant to the current task.

**Impact**:
- Token waste contradicting our own architectural claims (ironic given our Atlassian DESIGN.md analysis)
- Attention dilution — agents reason worse with 300K tokens of noise than with 2K tokens of signal
- The Docs MCP's progressive disclosure capabilities go unused because everything's already in context
- No differentiation between always-needed governance (Core Goals) and occasionally-needed reference (Token-Family-Shadow)

---

## Design Principle: Portability First

This redesign prioritizes **tool-agnostic architecture**. DesignerPunk may migrate from Kiro to Claude Code, Cursor, or other tools. The context delivery system must minimize proprietary surface area.

**Portability assessment**:

| Layer | Portable? | Migration Cost |
|-------|-----------|---------------|
| Docs MCP (content delivery) | ✅ Universal (MCP protocol) | Zero |
| Application MCP (component queries) | ✅ Universal (MCP protocol) | Zero |
| Agent prompts (activation logic) | ✅ Mostly portable (text + MCP patterns) | Light reformatting |
| Kiro steering frontmatter (`auto`, `fileMatch`) | ❌ Kiro-specific | Reimplementation required |
| Kiro `#[[file:...]]` references | ❌ Kiro-specific | N/A (removing) |

**Implication**: Lean on MCP + agent prompts for context delivery and activation. Use Kiro's steering system only for the minimal always-loaded identity layer — a capability every tool can trivially replicate.

---

## Goals

**Hard requirements** (must achieve):
1. **Restore progressive disclosure**: Only identity docs always-loaded; everything else MCP-queried via agent prompt activation
2. **Preserve effectiveness**: Agents find what they need when they need it — no degradation in output quality
3. **Portability**: System works without Kiro-proprietary features beyond basic `always` inclusion
4. **Complete accounting**: Every doc inventoried, assigned a role, and reachable post-migration

**Benchmarks** (track and document, don't enforce as constraints):
5. **Always-loaded token cost**: Target ~7,500 tokens (down from ~335,000) — measure actual, document in case study
6. **Total session context**: Significantly lower than current ~335,000 tokens per session — exact threshold depends on task type
7. **Token reduction**: Expect ~95-98% reduction as natural consequence of correct architecture

---

## Additional Requirements

### Requirement A: Complete Doc Inventory

All steering docs must be accounted for in this migration — exact count established, each doc's role in the new system defined. The Documentation Directory serves as the single source of truth for "what exists." No doc should be orphaned or unaccounted for after migration.

**Note**: Current estimates range from ~84 to ~90 docs. The exact count must be established as a first deliverable before planning the per-doc migration.

### Requirement B: Directory Relocation

Docs relocated to `governance/` at project root — tool-agnostic, ships cleanly in the `@3fn/core` package, and fully decoupled from any tool-specific directory (`.kiro/`, `.cursor/`, `.claude/`). Only the ~9 always-loaded identity docs remain in `.kiro/steering/` (the one Kiro-specific dependency we retain for the minimal identity layer).

**Directory structure post-migration**:
```
governance/               ← Docs MCP indexes this; ships in @3fn/core
  Token-Governance.md
  Component-Development-Guide.md
  Documentation-Directory.md
  ...all ~75+ relocated docs

.kiro/steering/           ← Tool-specific always-load (identity only)
  Personal-Note.md
  Core-Goals.md
  Start-Up-Tasks.md
  Task-Completion-Protocol.md
  AI-Collaboration-Principles.md
  Spec-Feedback-Protocol.md
  DesignerPunk-Systems-Overview.md
  Civitas-System-Overview.md
  Agent-Directory.md
```

**Packaging implications** (`@3fn/core`):
- `package.json` `files` field updated to include `governance/`
- `MCP_STEERING_DIR` env var points to `./node_modules/@3fn/core/governance` in product repos
- Integration Guide MCP configuration template updated
- `npx designerpunk init` scaffolds the updated `mcp.json` with new path
- `npx designerpunk sync` detects stale `MCP_STEERING_DIR` path and prompts update for existing product repos

**Env var naming**:
- Keep `MCP_STEERING_DIR` as the env var name (stable API contract) — renaming is a breaking change not worth the migration pain
- Document that the var name is historical; the content is governance docs
- Alternative: rename to `MCP_DOCS_DIR` in a future major version with `sync` handling backward compat

**Why `governance/` at root** (not `.kiro/governance/`):
- `.kiro/` is a tool-specific directory. If DesignerPunk migrates to Claude Code or Cursor, `.kiro/` becomes dead weight or needs relocation again.
- `governance/` is tool-agnostic — works regardless of which AI tool manages the project
- Aligns with portability-first design principle
- Civitas ownership is clear from the directory name regardless of parent path

**Needs confirmation**: That Kiro's steering system ONLY watches `.kiro/steering/` and `~/.kiro/steering/`. If confirmed, `governance/` at root is fully invisible to Kiro's steering scanner.

### Requirement C: Statistical Measurement for Case Study

Capture quantitative data before and after migration to build a case study demonstrating the value of MCP-first progressive disclosure.

**Before metrics** (capture while leak exists):
- Exact token count of all context entries loaded per session
- Number of docs loaded per session
- Representative task runs (spec formalization, component work, audit) with: tokens consumed, turns taken, time to completion, output quality assessment

**After metrics** (capture post-migration):
- Always-loaded token count (identity layer only)
- MCP query volume per task type (which docs queried, how many tokens)
- Total context consumed per task (identity + MCP queries)
- Same representative tasks repeated with: tokens consumed, turns taken, time to completion, output quality assessment

**Quality metrics**:
- Do agents write completion docs without prompting? (tracked before/after)
- Do agents miss critical context? (correction frequency per task type — how many human interventions to correct errors)
- First-attempt correctness: does agent produce spec-compliant output without human correction?
- MCP query accuracy: post-migration, do agents query the RIGHT docs? (useful queries vs. follow-up/redirect needed)
- Certainty calibration compliance: how often do agents escalate to Tier 2/3 vs. acting on insufficient context?
- Output accuracy on equivalent tasks (comparative review)

**Stabilization period**: "Before" measurements have an inherent advantage (all context available). "After" measurements should include a 2-4 week stabilization period for agents to learn query patterns before final comparison. Acknowledge this confounder in the case study.

**Critical protocol**: Define exact task prompts in Phase 1. Reuse verbatim in Phase 14. Different phrasing = confounded comparison.

---

## Current State Analysis

### What's Always Loaded Now (Everything)

| Category | Doc Count | Estimated Tokens |
|----------|-----------|-----------------|
| Layer 0-1 Foundation | ~11 | ~25,000 |
| Layer 2 Process/Frameworks | ~25 | ~100,000 |
| Layer 2 Token Governance/Architecture | ~8 | ~40,000 |
| Layer 3 Token Family Docs | ~16 | ~80,000 |
| Layer 3 Component Family Docs | ~14 | ~60,000 |
| Layer 3 Integration/Tooling | ~10 | ~30,000 |
| **Total** | **~84** | **~335,000** |

### What Should Be Always Loaded (Designed Intent)

| Doc | Reason | Est. Tokens |
|-----|--------|-------------|
| 00-Steering Documentation Directional Priorities | Meta-guide | ~2,000 |
| Personal Note | Collaboration identity | ~600 |
| Core Goals | Token priority, practices | ~550 |
| Start Up Tasks | Essential checklist | ~700 |
| AI-Collaboration-Principles | Skepticism requirements | ~800 |
| Spec-Feedback-Protocol | Multi-agent protocol | ~1,500 |
| DesignerPunk-Systems-Overview | Architecture diagrams | ~1,000 |
| Process-Development-Workflow | Task completion | ~3,500* |
| Process-File-Organization | Metadata standards | ~3,500* |
| Civitas-System-Overview | Governance layer | ~1,000 |
| Agent-Directory | Agent routing | ~1,200 |
| **Total** | | **~16,350** |

*These two are candidates for `auto` inclusion instead.

---

## Proposed Architecture

### Core Model: Agent Prompts as Activation, MCP as Delivery

Activation logic (knowing *when* to fetch context) lives in agent prompts. Delivery logic (serving the right content at the right depth) lives in the Docs MCP. Kiro's steering system is used *only* for a minimal identity layer that any tool can replicate.

```
┌─────────────────────────────────────────────────────────────────┐
│  Always-Loaded Identity Layer (~7,500 tokens)                    │
│  Mechanism: Kiro `inclusion: always` (or equivalent in any tool) │
│  ─ Personal Note, Core Goals                                     │
│  ─ Start Up Tasks, Task Completion Protocol                      │
│  ─ AI-Collaboration-Principles, Spec-Feedback-Protocol           │
│  ─ DesignerPunk-Systems-Overview, Civitas-System-Overview        │
│  ─ Agent-Directory                                               │
│  Purpose: WHO we are, HOW we collaborate, WHERE to route         │
└──────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│  Agent Prompt (per-agent activation logic)                        │
│  Mechanism: Agent system prompt (portable to any AI tool)         │
│  ─ Domain-specific MCP query routing table                        │
│  ─ "When doing spec work → query Process-Spec-Planning.md"       │
│  ─ "When doing token work → query Token-Governance.md"           │
│  ─ "When completing tasks → query Completion Documentation"      │
│  Purpose: WHEN to fetch context, WHAT to fetch                   │
└──────────────────────────────┬──────────────────────────────────┘
                               │
                               │ Agent recognizes task type,
                               │ executes targeted MCP query
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│  Docs MCP (progressive disclosure delivery)                      │
│  Mechanism: MCP protocol (universal, tool-agnostic)              │
│  ─ get_document_summary() → ~200 tokens (structure)              │
│  ─ get_section() → ~500-2,000 tokens (targeted)                  │
│  ─ get_document_full() → full doc (rare, comprehensive)          │
│  Purpose: HOW MUCH context to deliver, at what depth             │
└─────────────────────────────────────────────────────────────────┘
```

### What Each Layer Solves

| Layer | Problem Solved | Portable? | Token Cost |
|-------|---------------|-----------|------------|
| Identity (steering) | "Who we are, how we work" | Trivially — every tool has system prompts | ~5,000 fixed |
| Activation (agent prompts) | "When to fetch, what to fetch" | Yes — text translates to any agent config | 0 marginal (part of prompt) |
| Delivery (Docs MCP) | "What content, at what depth" | Yes — MCP protocol is universal | Variable, on-demand |

### Why Agent Prompts Are the Natural Home for Activation

1. **Agent prompts already contain domain-specific routing** — Thurgood's prompt has MCP query tables for spec work; Ada's for token work; Lina's for component work. This exists today.

2. **Activation is inherently agent-specific** — Thurgood needs spec standards, Ada needs token governance, Lina needs component guides. A shared routing artifact becomes lowest-common-denominator for all agents.

3. **No shared artifact to maintain** — A shared Context Router or meta-guide creates a coordination point that can drift. Agent prompts are self-contained.

4. **Maximum portability** — Agent prompts are text. They translate to Claude Code's `CLAUDE.md`, Cursor's `.cursorrules`, or any future agent configuration format. No Kiro-proprietary mechanism needed.

5. **Already proven** — Agent prompts with MCP query patterns have been working for months. The problem isn't that the pattern doesn't work; it's that the meta-guide's `#[[file:...]]` references override it by bulk-loading everything.

### Why NOT a Shared Context Router

Considered and rejected:
- Duplication: Agent prompts already contain routing — Router adds a second source
- Portability: A Kiro steering file is less portable than text in an agent prompt
- Maintenance: One Router serving 8 agents with different domains = mediocre for all
- Unnecessary: Fix the leak + existing agent prompts = problem solved

### Why NOT Kiro `auto` Inclusion

Considered and rejected:
- **Non-portable**: `auto` is Kiro-proprietary. Migration requires reimplementing the matching logic.
- **Reliability unknown**: No data on accuracy of Kiro's description matching for agent-initiated work.
- **Redundant**: If agent prompts trigger MCP queries, `auto` is a second activation mechanism that may conflict.
- **Design principle**: Minimize Kiro-proprietary surface area.

### The Documentation Directory (Cross-Domain Awareness)

While activation logic lives in agent prompts and the meta-guide is removed, agents still need a way to discover context *outside* their domain. The Documentation Directory solves this as a **manual-inclusion doc queried only when needed** — not always-loaded.

**What it is**: A human-curated table of contents (~800-1,000 tokens) organized by domain, listing key docs with their MCP paths and frontmatter `description` fields. No trigger conditions, no reading priorities, no file references — just "here's what exists, what it covers, and where to find it."

**When agents use it**: When their pre-existing context (agent prompt routing + identity docs) doesn't have the answer. The agent prompt includes one line:

> "If your task requires context outside your domain, query the Documentation Directory: `get_document_full({ path: '.kiro/steering/Documentation-Directory.md' })`"

**How it layers with the Agent Directory**:

| Artifact | Always Loaded? | Answers | Use Case |
|----------|---------------|---------|----------|
| Agent-Directory | Yes | "Who owns what domain?" | Route to the right agent |
| Documentation-Directory | No (manual, MCP-queried) | "What docs exist where?" | Find context when working outside your lane |

**Why NOT always-loaded**: ~90% of sessions, agents stay in their domain and never need it. Loading 800-1,000 tokens every session for a 10% use case is wasteful. The MCP query cost (one `get_document_full` call) is negligible when actually needed.

**Why NOT just `get_documentation_map()`**: The MCP's documentation map is a flat list with metadata. The Documentation Directory is human-curated with domain grouping — "token stuff is here, component stuff is here, process stuff is here." Oriented for quick scanning, not exhaustive cataloging.

### Inclusion Mode Assignments

| Doc | Current | Proposed | Rationale |
|-----|---------|----------|-----------|
| Personal Note | `always` | `always` | Core identity, tiny (~600 tokens) |
| Core Goals | `always` | `always` | Token priority, universal (~550 tokens) |
| Start Up Tasks (refocused) | `always` | `always` | Pre-task checklist only (~400 tokens) |
| Task Completion Protocol (new) | N/A | `always` | End-of-task sequence, when/what/where for completion docs (~400 tokens) |
| AI-Collaboration-Principles | `always` | `always` | Skepticism + certainty calibration protocol (~900 tokens) |
| Spec-Feedback-Protocol | `always` | `always` | Multi-agent protocol (~1,500 tokens) |
| DesignerPunk-Systems-Overview | `always` | `always` | Architecture reference (~1,000 tokens) |
| Civitas-System-Overview | `always` | `always` | Governance layer (~1,000 tokens) |
| Agent-Directory | `always` | `always` | Agent routing (~1,200 tokens) |
| Documentation-Directory (new) | N/A | `manual` | Cross-domain awareness, queried when agent is outside its lane |
| Process-Development-Workflow | `always` | `manual` | Queried via agent prompts when completing tasks |
| Process-File-Organization | `always` | `manual` | Queried via agent prompts when creating, organizing, or modifying files |
| 00-Steering Directional Priorities | `always` | **remove** | Replaced by agent prompt routing + Documentation Directory + MCP |
| All other docs (~75+) | `manual` (broken) | **relocated** | Moved out of `.kiro/steering/`, served exclusively via Docs MCP |

**Always-loaded total**: ~7,550 tokens (9 docs)
**Reduction**: ~335,000 → ~7,550 = **97.7% reduction**

---

## Key Design Decisions

### Decision 1: Where Activation Logic Lives

**Option A**: Agent prompts (each agent has its own MCP routing table) ← **Selected**
**Option B**: Shared Context Router (always-loaded steering doc with trigger → query mappings)
**Option C**: Enhanced MCP (proactively suggests relevant docs in query responses)

**Selected: Option A**

**Rationale**:
- Most portable (text files work everywhere)
- Already partially implemented (agent prompts have MCP query patterns today)
- No shared artifact to maintain
- Agent-specific routing naturally matches agent-specific needs
- Fix the leak + existing prompts = minimal new work

**Counter-argument**: Cross-domain conversations (e.g., Peter asks Thurgood about tokens) may not trigger the right queries because the prompt focuses on Thurgood's domain. Mitigation: Agent Directory + domain routing ("that's Ada's area") handles this case already. Documentation Directory fallback handles the "I need to research something outside my lane" case.

**Option C Assessment** (considered, deferred):

The idea: MCP responses include a "Related context available" section suggesting relevant docs the agent hasn't queried. Example: query `get_component_full("Button-CTA")` → response includes "Related: Token-Governance.md § Token Selection Matrix, Component-Development-Guide.md § Blend Utility Integration."

- Pro: Solves "unknown unknowns" elegantly — agent discovers context without knowing to ask
- Pro: Zero steering overhead — activation lives entirely in the MCP
- Con: Requires modifying MCP tool response shapes (interface change)
- Con: Relatedness logic is non-trivial — how does the MCP decide what's relevant?
- Con: Adds token cost to every response even when suggestions aren't needed
- Con: Only helps if agent queries MCP first — doesn't help agents working from prompt alone

**Verdict**: Interesting future enhancement if post-migration data shows agents missing context despite good prompt routing + Documentation Directory fallback. Capture in MCP Evolution Roadmap, don't build now.

### Decision 2: What Stays Always-Loaded

**Option A**: 8 identity docs (~7,350 tokens)
**Option B**: Only Core Goals + Start Up Tasks + Agent-Directory (~2,450 tokens)
**Option C**: 8 identity docs + Process-Development-Workflow + Process-File-Organization (~14,350 tokens)
**Option D**: 9 identity docs — split Start Up Tasks into pre-task checklist + Task Completion Protocol ← **Selected**

**Selected: Option D**

**Rationale**: Observed signal that agents frequently need reminding about completion documentation — when to write it, what tier, where to put it. This suggests the instructions are buried in Start Up Tasks' mixed-concern format (date checks, test commands, AND completion sequence all in one file).

**The split**:
- **Start Up Tasks** (keep, refocus): Date check, governance health, Jest commands, authorization rules — the "before you start" checklist (~400 tokens)
- **Task Completion Protocol** (new): When to write completion docs, what tier, parent vs subtask distinction, the "when you finish" sequence (~400 tokens)

**Why this works**:
- Smaller, focused docs are harder to miss than one dense multi-concern doc
- Each doc has one job — start-of-task vs end-of-task
- Total token cost barely changes (~800 tokens combined vs ~700 original)
- Testable hypothesis: if agents stop needing reminders about completion docs after the split, the signal was structural (buried instructions), not behavioral

**Always-loaded inventory (proposed)**:

| Doc | Purpose | Est. Tokens |
|-----|---------|-------------|
| Personal Note | Collaboration identity | ~600 |
| Core Goals | Token priority, practices | ~550 |
| Start Up Tasks (refocused) | Pre-task checklist | ~400 |
| Task Completion Protocol (new) | End-of-task sequence | ~400 |
| AI-Collaboration-Principles | Skepticism, candor | ~800 |
| Spec-Feedback-Protocol | Multi-agent review | ~1,500 |
| DesignerPunk-Systems-Overview | Architecture diagrams | ~1,000 |
| Civitas-System-Overview | Governance layer | ~1,000 |
| Agent-Directory | Agent routing | ~1,200 |
| **Total** | | **~7,450** |

### Decision 3: Process-Development-Workflow and Process-File-Organization

**Option A**: Move to `manual`, queried via agent prompt routing ← **Selected**
**Option B**: Keep as `always` (~7,000 tokens combined)
**Option C**: Move to `auto` (Kiro-specific, non-portable)

**Selected: Option A**

**Rationale**: Portability-first. These docs are frequently needed but not universally needed. Agent prompts already specify when to query them ("when completing tasks" → query completion workflow). Moving to `manual` and relying on prompt-triggered MCP queries is portable and efficient.

**Counter-argument**: Agents may forget to query these before task completion, leading to process deviations. Mitigation: Start Up Tasks (always-loaded) contains the task completion checklist with explicit instructions. The MCP provides depth; Start Up Tasks provides the trigger.

### Decision 4: Handling the Meta-Guide Removal

**Option A**: Remove meta-guide entirely, rely on agent prompts ← **Selected**
**Option B**: Replace with a thin Context Router (~1,000 tokens)
**Option C**: Rewrite meta-guide without `#[[file:...]]` references

**Selected: Option A**

**Rationale**: The meta-guide's *content* (a directory of all docs with reading priorities) is exactly what `get_documentation_map()` provides. Duplicating it in a steering file is redundant. Agent prompts provide domain-specific routing that's more useful than a generic directory. The meta-guide has no remaining purpose once the routing lives in prompts and the catalog lives in the MCP.

**Counter-argument**: New agents or unfamiliar users lose the "overview of what exists" layer. Mitigation: Documentation Directory (manual, MCP-queried) provides this when needed. Agent prompts include a certainty calibration protocol (see below).

### Decision 4a: Certainty Calibration Protocol

Agents must have defined behavior for different certainty levels to prevent confident wrong output when context is missing. This belongs in the always-loaded identity layer (likely AI-Collaboration-Principles or as a standalone behavioral rule).

**Proposed three-tier protocol**:

1. **Certain** → Act on existing context. Agent is "certain" when: (a) identity docs cover the question, OR (b) prompt routing table has an explicit entry for this task type AND the agent has queried the relevant section.
2. **Uncertain** → Research via Docs MCP: query your prompt's routing table entries first; use the Documentation Directory only when the question is outside your domain.
3. **Still uncertain** → Prompt the user: "I don't have sufficient context for this. Options: (a) I can research further via MCP, (b) you can provide direct context, (c) we can discuss the approach before proceeding"

**Where this lives**: Added to AI-Collaboration-Principles (always-loaded) as a behavioral rule. One paragraph, ~100 tokens.

**Why this matters**: Prevents the failure mode where agents *confidently produce wrong output* because they assumed rather than asked. It's the AI Optimism Problem (completion bias, confirmation bias) manifesting as an information-seeking failure. The protocol makes "I don't know, let me check" a defined behavior rather than an exception.

**Counter-argument**: Agents might become overly conservative — querying the MCP excessively or asking permission too frequently. Mitigation: The calibration targets uncertainty about *approach* (how to proceed), not *minor details* (which specific token value). The three tiers provide gradient — most work stays at tier 1.

**Captured note (2026-06-22) — refine the "uncertain" tier to propose-best-fit + go/no-go** *(to formalize when 119 is worked; not a reformalization of the protocol above)*:

Raised during Spec 121 requirements review. The "uncertain"/"still uncertain" tier above should resolve to a **"propose best-fit + confidence + rationale → human go/no-go"** decision, not an open-ended ask. Applicable **either before or after broadening** the search — when the agent has a plausible-but-weak candidate, it surfaces that candidate for a binary human decision rather than an open question.

- **Guardrail**: the proposal MUST carry its own uncertainty — the candidate, *why* confidence is low, and *what was tried* (queries / broadening attempted). Never a bare "here's X, ok?", which would anchor the human into rubber-stamping a weak guess. This keeps the refinement consistent with the counter-arguments-mandatory and candid-over-comfortable standards in AI-Collaboration-Principles (a best-fit is offered *with* its weakness stated, not laundered into false confidence).
- **Dependency**: relies on **Spec 121, Requirement 6** (Low-Confidence / Empty Discovery Contract) surfacing ranked best-fit candidates with below-threshold confidence/match-strength flags. Without that tool-side signal, the agent cannot distinguish a weak match it should propose from a genuinely-empty result it should report as such. See `.kiro/specs/121-claude-code-portability/requirements.md` § Requirement 6.
- **Status**: captured decision; to formalize into the three-tier protocol wording (and propagate to agent prompts per Decision 4a's home in AI-Collaboration-Principles) when 119 is actively worked.

### Decision 5: Migration Strategy

**Phased** ← **Selected**

See **Implementation Estimate** section for the full 14-phase breakdown. Summary:

- **Phases 0-3**: Immediate wins — inventory, baseline metrics, leak fix, validation
- **Phases 4-8**: Architecture work — Directory, Task Completion Protocol, certainty calibration, prompt audit and enhancement
- **Phases 9-12**: Migration — relocate docs, update paths, update cross-references, remove meta-guide
- **Phases 13-14**: Measurement — capture "after" metrics, comparative analysis

**Rationale**: Each phase is independently valuable and independently reversible. Phase 2 alone (leak fix) eliminates ~280,000 tokens of waste. The architecture and migration phases can proceed at whatever pace makes sense without blocking the immediate improvement.

---

## Agent Prompt Routing: What Needs Enhancement

Current agent prompts have varying levels of MCP routing coverage. System agents (Thurgood, Ada, Lina) have structured routing tables. Platform agents (Sparky, Kenya, Data) have generic MCP references with no trigger-based routing. Each agent needs individual gap analysis.

### System Agents (audit existing routing)

| Agent | Routing Table Size | Key Gaps Identified |
|-------|-------------------|---------------------|
| **Thurgood** | ~15 docs | Completion Documentation Guide, Hook Operations |
| **Ada** | ~25 docs | DTCG-Integration-Guide, Figma-Workflow-Guide, Transformer-Development-Guide, MCP-Integration-Guide, Product-Token-Governance, Token-Family-Blur, Token-Family-Sizing, DesignerPunk-Integration-Guide |
| **Lina** | ~29 docs | Component-Development-Standards, Stemma-System-Principles, Component-Primitive-vs-Semantic-Philosophy, Web-Authoring-Standards, Browser Distribution Guide |

### Product Agents (create routing tables from scratch)

| Agent | Current State | Priority Routes Needed |
|-------|--------------|----------------------|
| **Leonardo** | Has Application MCP queries; no Docs MCP routing table | Layout-Specification-Vocabulary, Product-Token-Governance, Token-Quick-Reference § Color Concept Lookup, DesignerPunk-Integration-Guide |
| **Sparky** | Generic MCP references only | Web-Authoring-Standards (#1), Component-Development-Guide § Blend/DOM/CSS Naming, Token-Family-Blend, Token-Family-Spacing § Inset, DesignerPunk-Integration-Guide § Imports |
| **Kenya** | Generic MCP references only | Platform-Implementation-Guidelines (#1), Component-Family-* (per task), Token-Family-Motion § iOS, Token-Family-Color § OKLCH iOS, Component-Development-Guide § Blend/Icon |
| **Data** | Generic MCP references only | Platform-Implementation-Guidelines (#1 — .dp rule), Token-Family-Motion § Android, Token-Family-Spacing, Component-Family-* (per task), Contract-System-Reference |
| **Stacy** | Product handoff, lessons synthesis | Quality standards, measurement protocols |

### Critical Cross-Agent Routes

Two docs owned by Lina are consumed by ALL platform agents and must appear in each platform agent's routing table:
- `platform-implementation-guidelines.md` — behavioral contract compliance, acceptable/prohibited variations
- `Cross-Platform vs Platform-Specific Decision Framework.md` — token vs native idiom decisions

### Complementary Access Patterns

The routing table is not the only way agents access context. Three patterns work together:

1. **Agent prompt routing table** → Docs MCP queries (primary for governance/reference docs)
2. **Knowledge Base semantic search** (`/knowledge`) → indexed source code and test files (primary for implementation patterns)
3. **Application MCP tools** → component and token data (primary for structured lookups)

The routing table handles governance and reference docs. Knowledge Bases handle source patterns. Application MCP handles structured data. These are complementary, not competing.

**Scope of work**: 
- System agents: Audit and enhance existing routing tables (1hr per agent)
- Platform agents: Create structured routing tables from scratch (2-3hrs per agent)
- All agents: Add Documentation Directory fallback line + certainty calibration awareness

---

## Open Questions

1. **Does Kiro ONLY watch `.kiro/steering/` for steering files?** If confirmed, relocating docs fully decouples them from Kiro's scanning. If Kiro watches other directories or uses some other discovery mechanism, the relocation strategy needs adjustment.

2. **~~What's the new home directory for relocated docs?~~** → **Resolved**: `governance/` at project root. Tool-agnostic, ships in package, Civitas-aligned. See Requirement B.

3. **How does the Docs MCP index post-relocation?** Identity docs stay in `.kiro/steering/` while relocated docs live elsewhere. `MCP_STEERING_DIR` currently points to one path. Options: (a) MCP indexes a parent directory containing both, (b) MCP accepts multiple paths, (c) identity docs duplicated in new location, (d) MCP only indexes the relocated directory since identity docs are always-loaded and don't need MCP serving. **Signal from feedback**: Ada and Lina both prefer option (d) — cleanest mental model, identity docs never need MCP serving.

4. **How do we handle the transition period for cross-references?** Active docs get updated paths. Historical docs (specs, completions) keep old paths. But what about docs that are *between* — referenced by both active and historical content?

5. **What about exploratory conversations?** Conversations like the Atlassian analysis (cross-domain, no clear task type) don't map to any specific prompt trigger. Are these adequately served by the identity layer + certainty calibration protocol + Documentation Directory fallback?

6. **How do we handle agent prompt updates across 8 agents?** Each prompt needs path updates, routing table enhancements, and the new fallback line. **Signal from feedback**: Ada, Lina, and Leonardo all recommend atomic update (all 8 prompts in same commit as relocation). Transition window with mixed paths is highest-risk period.

7. **What representative tasks should we use for before/after comparison?** Need 2-3 tasks that span different domains (spec formalization, component implementation, audit) and are repeatable for fair comparison.

---

## Risk Assessment

| Risk | Severity | Mitigation |
|------|----------|-----------|
| Agents miss critical context | High | Certainty calibration protocol + Documentation Directory fallback + prompt routing audit |
| Process deviations (completion docs) | High | Task Completion Protocol (always-loaded, focused, unmissable) |
| Directory relocation breaks references | Medium | Update active docs; leave historical as-is; validate MCP paths post-move |
| Agent prompt routing tables drift over time | Low | Civitas steward responsibility; review during prompt updates |
| Breaking existing workflows during migration | Medium | Phased approach — each phase independently reversible |
| Cross-domain queries fall through gaps | Low | Agent Directory routing + Documentation Directory + certainty calibration |
| Case study data inconclusive | Low | Capture broad metrics; quality is subjective but measurable via correction frequency |

---

## Success Criteria

**Hard criteria** (spec fails without these):
1. Only identity docs loaded via steering system — all other docs served exclusively via Docs MCP
2. All ~90 docs accounted for in Documentation Directory (single source of truth)
3. Each agent prompt has complete MCP routing for its domain (100% task-type coverage)
4. No degradation in agent effectiveness — first-attempt correctness rate within 10% of baseline (or improves)
5. Agents write completion docs meeting Tier requirements without prompting (tracked before/after)
6. System is fully portable — works without Kiro-specific features beyond basic `always` inclusion
7. No orphaned docs — every doc queryable via MCP, listed in Directory, reachable from at least one agent prompt

**Benchmarks** (measured and documented, not pass/fail):
8. Always-loaded token count (target: ~7,500 — document actual)
9. Total context consumed per representative task type (identity + MCP queries)
10. Token reduction percentage vs current state (~335,000 baseline)
11. Case study produced with before/after data demonstrating that correct architecture naturally produces significant efficiency gains

---

## Scope Boundaries

**In scope**:
- Establishing exact doc inventory (single source of truth in Documentation Directory)
- Capturing "before" metrics for case study (token counts, representative task runs)
- Removing `#[[file:...]]` references from meta-guide (Phase 1)
- Relocating ~75+ docs from `.kiro/steering/` to `governance/` at project root
- Updating `MCP_STEERING_DIR` env var and all MCP query paths in agent prompts
- Updating `package.json` `files` field to include `governance/`
- Updating Integration Guide MCP configuration template
- Updating `npx designerpunk init` scaffolded `mcp.json` template
- Adding `npx designerpunk sync` detection for stale `MCP_STEERING_DIR` path
- Updating cross-references in active docs (historical docs left as-is)
- Splitting Start Up Tasks into pre-task checklist + Task Completion Protocol
- Adding certainty calibration protocol to AI-Collaboration-Principles
- Creating the Documentation Directory (manual-inclusion, ~800 tokens)
- Auditing and enhancing agent prompt MCP routing tables
- Adding Documentation Directory fallback line to each agent prompt
- Removing the meta-guide entirely
- Capturing "after" metrics for case study
- Validating the migration doesn't degrade quality

**Out of scope**:
- Changing Docs MCP tool interfaces (stays as-is — only env var path changes)
- Rewriting steering doc *content* (only frontmatter and location change)
- Creating new MCP tools or capabilities (Option C deferred to MCP Evolution Roadmap)
- Changes to Application MCP or Product MCP
- Kiro-specific features (`auto`, `fileMatch`) — intentionally avoided
- Updating historical docs (specs, completion docs) that reference old paths

---

## Implementation Estimate

| Phase | Effort | Risk | Dependency |
|-------|--------|------|-----------|
| 0. Establish exact doc inventory | 1 hour | None | None |
| 1. Capture "before" metrics (token counts + 5 representative task runs) | 2-3 hours | None | Phase 0 |
| 2. Fix the leak (remove file references from meta-guide) — **SHIPPED** (commit `5489b6cf`) | 30 min | Very low | None |
| 3. Validate leak is fixed (fresh sessions for 2+ agents, verify only identity docs load, run simple task) | 30-45 min | None | Phase 2 |
| 4. Create Documentation Directory (with description fields) | 1-2 hours | Low | Phase 0 |
| 5. Create Task Completion Protocol + refocus Start Up Tasks | 1 hour | Low | None |
| 6. Add certainty calibration protocol to AI-Collaboration-Principles | 30 min | Low | None |
| 7a. Audit system agent routing tables (Thurgood, Ada, Lina) | 1-2 hours | Low | Phase 4 |
| 7b. Create platform agent routing tables from scratch (Sparky, Kenya, Data, Leonardo, Stacy) | 3-5 hours | Medium | Phase 4 |
| 8. Finalize agent prompts (routes + Directory fallback + calibration protocol) | 1-2 hours | Low | Phases 5, 6, 7a, 7b |
| **Quality Gate**: Run representative tasks to validate prompt enhancements before relocation | 1-2 hours | Low | Phase 8 |
| 9. Relocate docs out of `.kiro/steering/` | 1-2 hours | Medium | Quality Gate |
| 10. Update MCP env vars + query paths in ALL agent prompts (atomic — same commit as Phase 9) | 2-3 hours | Medium | Phase 9 |
| 11. Update cross-references in active docs (~100-200 links across ~30 docs) | 3-4 hours | Low | Phase 9 |
| 12. Remove meta-guide | 5 min | Medium | Phase 11 |
| 13. Capture "after" metrics + comparative analysis (after 2-4 week stabilization) | 2-3 hours | None | Phase 12 + stabilization |
| 14. Validation (run same 5 representative tasks from Phase 1, compare baselines) | 2-3 hours | Low | Phase 13 |

**Total**: ~22-32 hours of focused work, split across phases.

**Critical path**: Phases 0-3 are immediate wins (~4 hours). Phases 4-8 + Quality Gate are architecture work (~10-14 hours). Phases 9-12 are migration (~8-11 hours). Phases 13-14 are measurement (~5 hours, after stabilization period).

**Rollback protocol**: Phase 9 (relocation) is the highest-risk phase. Rollback: `git revert` the move commit + restore original `MCP_STEERING_DIR` env var. All other phases are individually reversible by reverting their specific changes.

### Representative Tasks for Measurement (Phases 1 & 14)

Based on agent feedback, use these 5 tasks (define exact prompts in Phase 1, reuse verbatim in Phase 14):

1. **Spec formalization** (Thurgood): Design outline → requirements.md. Signal: finds Process-Spec-Planning without it loaded.
2. **Component implementation** (Lina): Add new behavioral contract to existing component. Signal: finds Contract-System-Reference and Component-Development-Guide.
3. **Token creation governance** (Ada): Propose new semantic token. Signal: follows Token-Governance flow without it pre-loaded.
4. **Cross-domain query** (any agent): Question outside agent's domain. Signal: certainty calibration activates — agent researches rather than guessing.
5. **Parent task completion** (any agent): Complete parent task end-to-end. Signal: Task Completion Protocol produces correct behavior without Process-Development-Workflow pre-loaded.

---

## Cross-Spec Context (captured note, 2026-06-23 — not a reformalization)

Captured to keep the dependency graph navigable; formalize when 119 is actively worked.

- **Phase 2 leak-fix is already SHIPPED** (commit `5489b6cf` — "Spec 119: remove steering-doc context leak from meta-guide"). The `#[[file:...]]` bulk-load is removed; the remaining 119 phases (inventory, relocation, Directory, prompt routing, measurement) are unaffected and still pending.
- **Relationship to Spec 121** — 119 *consumes* 121's discovery + delivery fixes. Per 121 Decision 4 (a **recommended amendment to 119**), the hand-curated **Documentation Directory** (this outline's § "The Documentation Directory") should be **dropped in favor of 121's `find_docs` MCP discovery** — `find_docs` is portable and self-maintaining, where a curated Directory is itself a drift surface. When 119 is worked, reconcile the "Documentation Directory (new, `manual`)" decision against this amendment. See `.kiro/specs/121-claude-code-portability/design-outline.md` (Decision 4) and requirements.md (Requirement 1).
- **Relationship to Spec 122 (Agent Generator)** — 119's per-agent prompt-routing work (§ "Agent Prompt Routing", Phases 7-8, 10) is **regenerated by the Spec 122 generator** once it lands: agent prompts become generated outputs from a single canonical source rather than 8 hand-edited files. 119's atomic-prompt-update concern (Open Question 6) is largely subsumed by the generator. See `.kiro/specs/122-agent-generator/design-outline.md` (stub; gated on 118).

## Related Work

- `.kiro/opportunities/2026-06-16-atlassian-design-md-insights.md` — Atlassian analysis that surfaced this investigation
- `.kiro/steering/MCP-Evolution-Roadmap.md` — Known MCP gaps (Option C deferred here)
- `.kiro/steering/MCP-Relationship-Model.md` — Three-MCP boundaries and access model
- `.kiro/steering/Civitas-System-Overview.md` — Governance layer definition
- `notes/kiro-steering.md` — Kiro steering documentation (inclusion modes reference)
