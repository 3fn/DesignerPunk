# DesignerPunk — Project Context (Claude Code)

> ## ⚠️ INTERIM STOPGAP — retire/supersede in Spec 122
>
> In **Kiro**, the ~9 identity/"always" steering docs are auto-injected into every agent
> session via `inclusion: always`. **Claude Code has no equivalent mechanism**, so after the
> Spec 119-A relocation those important docs were not reliably reaching CC agents (no
> always-load; not referenced in `.claude/agents/*.md`; deliberately NOT in the MCP index,
> which is `governance/`-only). This file restores the always-layer for Claude Code by
> importing the 9 identity docs below — Claude Code loads `CLAUDE.md` into the main session
> **and into subagents** (all custom + built-in types except `Explore`/`Plan`).
>
> **This is a temporary stopgap.** Spec 122's agent generator will deliver each agent's
> always-layer per-agent from canonical source (fed by 119-A Task 9's per-agent five-class
> ambient design). **When 122 lands, retire or supersede this file** so there is exactly one
> always-layer mechanism per runtime — do not let `CLAUDE.md` and the 122-generated ambient
> layer coexist. Tracked as **OB-7** in
> `.kiro/specs/119-steering-progressive-disclosure-redesign/119-B-deferred-obligations.md`.
>
> The other ~80 governance docs are **MCP-served** (`find_docs` / `get_section` via the
> `designerpunk-docs` MCP) and are intentionally **not** imported here — query them on demand.

## Always-loaded identity layer (the 9 `.kiro/steering/` docs)

**Formative** — who we are / how we relate:
@.kiro/steering/personal-note.md
@.kiro/steering/core-goals.md

**Reflexive principle** — applied every task (includes the certainty-calibration rule):
@.kiro/steering/AI-Collaboration-Principles.md
@.kiro/steering/Spec-Feedback-Protocol.md

**Governance-as-law / operational** — applied continuously:
@.kiro/steering/start-up-tasks.md
@.kiro/steering/Task-Completion-Protocol.md

**Capability routing:**
@.kiro/steering/Agent-Directory.md

**Orientation reference:**
@.kiro/steering/DesignerPunk-Systems-Overview.md
@.kiro/steering/Civitas-System-Overview.md

---

**Fallback (in case the imports above did not load):** treat the 9 docs in `.kiro/steering/`
as always-applicable governance and read them directly before acting. The non-identity
corpus lives in `governance/` and is reached via the `designerpunk-docs` MCP.
