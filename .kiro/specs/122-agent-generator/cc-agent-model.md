# cc-agent-model.md — Claude Code Subagent Development Model

**Purpose**: Format specification for the Spec 122 Claude Code adapter — the concrete formats and mechanisms the generator must emit to produce a working CC subagent. This is the CC analogue of "what format does iOS Swift need" before writing a token emitter.

**Provenance**: Characterized 2026-07-07 by the `claude-code-guide` agent against current official Claude Code docs (docs.claude.com), the CC GitHub issue tracker, and verified by the main loop against this project's own live setup. Every claim tagged **[DOCUMENTED]** (with URL) / **[OBSERVED]** / **[UNCERTAIN — needs test]**.

**Main-loop verification of the crux (2026-07-07)**: confirmed against this repo — `CLAUDE.md` carries exactly **9** `@`-imports (the identity docs; the shared always-channel, working), and all **6** committed `.claude/agents/*.md` files carry **0** `@`-imports with everything inline (235–436 lines each). Our own ports already embody the finding: per-agent always-content is inlined because CC offers no per-agent import channel.

---

## SUMMARY — load-bearing constraints

1. **A CC subagent is one Markdown file** (`.claude/agents/<name>.md` project, or `~/.claude/agents/<name>.md` user): YAML frontmatter + a body that becomes the system prompt verbatim. Only `name` + `description` are required. [DOCUMENTED]
2. **THE CRUX — there is no per-agent always-import channel.** A subagent's always-context is (a) its own inline body, plus (b) the **shared** CLAUDE.md/memory hierarchy every non-Explore/Plan subagent auto-loads. `@`-imports resolve **only inside CLAUDE.md**, *not* inside `.claude/agents/*.md` bodies — that feature was requested (issue #5914) and **closed as not-planned**. Per-agent always-content **must be emitted inline into each agent body**. [DOCUMENTED + main-loop-verified]
3. **CLAUDE.md is shared, not per-agent.** There is no frontmatter field to give one agent a different CLAUDE.md. The shared-vs-per-agent split is the fundamental difference from an "each agent injects its own config" model. [DOCUMENTED]
4. **MCP/tools inherit by default**; `tools:`/`disallowedTools:` narrow, `mcpServers:` adds per-agent servers. **Permissions are session-wide** (settings.json); the only per-agent enforcement knobs are `tools`/`disallowedTools`/`permissionMode`/frontmatter hooks. **No declarative per-agent write-path-scope exists.** [DOCUMENTED]
5. **CC's native always-format, therefore, is two-channel**: shared always-set → CLAUDE.md `@`-imports (a live reference — no copy); per-agent always-content → inline agent body (a generated copy). The generator emits both from canonical source; the CLAUDE.md stopgap (OB-7) becomes a *generated output*, not a retired mechanism.

---

## Facet 1 — Subagent definition format
[DOCUMENTED — https://code.claude.com/docs/en/sub-agents]
- Markdown file: YAML frontmatter between `---` fences, then body (becomes the system prompt; subagents get only this prompt + appended environment details, not the full CC system prompt).
- Location precedence (high→low): managed settings → `--agents` CLI JSON → `.claude/agents/` (project) → `~/.claude/agents/` (user) → plugin `agents/`. Both scopes scanned recursively; identity = the `name` field (not the filename/subfolder, except plugin agents).
- Required frontmatter: `name` (lowercase-hyphen), `description`. Optional: `tools`, `disallowedTools`, `model`, `permissionMode`, `maxTurns`, `skills`, `mcpServers`, `hooks`, `memory`, `background`, `effort`, `isolation`, `color`, `initialPrompt`.
- Unavailable to subagents even if listed: `AskUserQuestion`, `EnterPlanMode`/`ExitPlanMode` (unless `permissionMode: plan`), `ScheduleWakeup`, `WaitForMcpServers`.

## Facet 2 — Always-context / ambient layer (THE CRUX)
- **What a non-fork subagent loads at startup** [DOCUMENTED — sub-agents.md §"What loads at startup"]: its own body prompt + env details; the delegation task message; **the full CLAUDE.md/memory hierarchy the main conversation loads** (`~/.claude/CLAUDE.md`, project rules, `CLAUDE.local.md`, managed policy); git status; preloaded `skills:` content. `Explore` and `Plan` are the only subagents that skip CLAUDE.md+git — no field changes this.
- **CLAUDE.md levels** [DOCUMENTED — memory.md]: managed → user → project (`./CLAUDE.md` or `./.claude/CLAUDE.md`) → local. Concatenated, delivered as a user message after the system prompt.
- **`@`-import syntax** [DOCUMENTED — memory.md §"Import additional files"]: `@path`, relative resolves against the *containing file*; **recursive, max depth 4**; expands inline at launch; skips code spans/fences; first external import triggers a one-time approval.
- **⚠️ CRUX ANSWER — can a per-agent `.claude/agents/*.md` carry resolving `@`-imports? NO.** [DOCUMENTED — issue #5914 closed-not-planned; main-loop-verified] `@`-import expansion is a CLAUDE.md/memory feature only, not part of the subagent format. An `@path` in an agent body only "works" if the model chooses to `Read` it at runtime — which needs the Read tool, re-reads each load, and is **not** an always-load. **The only always-channels reaching a subagent are its inline body and the shared CLAUDE.md.**
- `.claude/rules/*.md` (optional `paths:` scope) is another *shared* always/conditional channel — still project-wide, not per-agent. [DOCUMENTED]

**Design consequence**: to give each generated agent a distinct always-layer, emit that content **inline into the agent body**; put shared always-content in a **generated CLAUDE.md** (which may use `@`-imports). This is exactly the project's interim stopgap done deliberately and generated.

## Facet 3 — MCP / tool wiring
[DOCUMENTED — sub-agents.md, mcp.md]
- Inherit-all by default; `tools:` = allowlist, `disallowedTools:` = denylist (deny applies first). MCP naming: `mcp__<server>` / `mcp__<server>__*` (whole server), `mcp__<server>__<tool>` (one tool), `mcp__*` in deny = all MCP.
- Per-agent `mcpServers:` — string ref to a configured server (shares parent connection) or inline def (`.mcp.json` schema; `stdio|http|sse|ws`; connected on spawn); defining inline only on an agent keeps its tool descriptions out of the main context.
- `.mcp.json` scopes (project/user/local) configure servers session-wide; managed-MCP/`--strict-mcp-config` also filter agent-named servers.
- Tool-search/deferral exists; its interaction with a subagent's inline `mcpServers` is **[UNCERTAIN — needs test]**.

## Facet 4 — Skills
[DOCUMENTED — skills.md]
- `.claude/skills/<name>/SKILL.md` (project) / `~/.claude/skills/` (user) / `<plugin>/skills/`. Command name = **directory name**. Custom commands (`.claude/commands/<x>.md`) still work, same frontmatter; a skill wins over a same-named command.
- Frontmatter all optional (only `description` recommended): `name`, `description`, `when_to_use`, `argument-hint`, `arguments`, `disable-model-invocation`, `user-invocable`, `allowed-tools`, `disallowed-tools`, `model`, `effort`, `context` (`fork`), `agent`, `hooks`, `paths`, `shell`. Body supports `$ARGUMENTS`/`$N` + `` !`cmd` `` injection.
- **Subagents & skills**: `skills:` frontmatter **preloads full skill content at startup**; otherwise a subagent can invoke skills via the `Skill` tool at runtime (unless `Skill` is removed). `disable-model-invocation: true` skills can't be preloaded.

## Facet 5 — Slash / custom commands
[DOCUMENTED — skills.md] `.claude/commands/<name>.md` → `/name` (legacy, still supported, same frontmatter as skills; new work should use skills). Commands are a session-level surface, not part of the agent file; a subagent invokes them via the `Skill` tool. Orthogonal to the agent-definition format the generator emits (except `initialPrompt` on the `--agent` main-session path).

## Facet 6 — Model selection
[DOCUMENTED — sub-agents.md §"Choose a model"] `model:` accepts an alias (`sonnet`/`opus`/`haiku`/`fable`), a full ID (`claude-opus-4-8`, `claude-sonnet-5`, …), or `inherit`. Omitted = `inherit` (main conversation's model). Resolution: `CLAUDE_CODE_SUBAGENT_MODEL` env → per-invocation param → frontmatter → session. Excluded-by-org values fall back to inherited.

## Facet 7 — Write-scoping / permissions
[DOCUMENTED — permissions.md, settings.md]
- **No declarative per-agent write-path-scope exists.** Agent-level knobs: `tools`/`disallowedTools` (can drop `Write`/`Edit`), `permissionMode`, frontmatter `PreToolUse` hooks.
- Path patterns exist in **session-wide settings.json** (`Read()`/`Edit()`/`Write()` with gitignore-semantics anchors), applying to main + every subagent — **not scoped to one agent**. `Edit`/`Read` deny rules catch recognized Bash file cmds but not arbitrary subprocess I/O (use the sandbox for OS-level).
- `Agent(name)` rules gate which subagents may spawn; `Agent(model:opus)`-style rules gate invocations by scalar param.
- `permissionMode` per agent: `default`/`acceptEdits`/`auto`/`dontAsk`/`bypassPermissions`/`plan`. Parent `bypassPermissions`/`acceptEdits`/`auto` override a child.
- Plugin agents ignore `hooks`/`mcpServers`/`permissionMode`.

**Design consequence**: per-agent write-scope on CC cannot be a declarative field. Options: a per-agent `PreToolUse` hook rejecting out-of-scope `Edit`/`Write` paths, or `isolation: worktree`. Both [DOCUMENTED]; combining them for path-scope is [needs a confirming test].

## Facet 8 — Structural differences from "each agent injects its own config"
[DOCUMENTED]
- **Shared always-layer, not per-agent** (facet 2) — the biggest divergence; the agent file is the only per-agent surface and has no import expansion.
- **Permissions session-global** (facet 7).
- **Hooks split**: frontmatter hooks (per-agent lifecycle) vs settings.json `SubagentStart`/`SubagentStop` (session-level, matched by agent `name`).
- **Fresh isolated context**: a subagent sees no conversation history / prior skills / read files (except a `fork`). Everything it must know arrives via body / CLAUDE.md / preloaded skills / delegation message.
- **Persistent memory** (`memory: user|project|local`): a per-agent knowledge channel distinct from CLAUDE.md (injects first 200 lines/25KB of MEMORY.md).
- **`--agent <name>`** promotes an agent file to the whole session's system prompt; `initialPrompt` fires only here.
- **Plugin packaging** strips `hooks`/`mcpServers`/`permissionMode`.

---

## KNOWN vs NEEDS-TEST ledger

| # | Item | Status | Test (if needed) |
|---|------|--------|------------------|
| 2a | `@`-imports resolve inside `.claude/agents/*.md` bodies | **KNOWN — NO** (issue #5914 closed-not-planned; docs; main-loop-verified: 6/6 agents inline, 0 imports) | Optional belt-and-suspenders: `.claude/agents/probe.md` body = `@./probe-import.md` with a sentinel, spawn with `disallowedTools: Read`; if it can't echo the sentinel, imports don't load (expected). **Judged unnecessary — triangulated.** |
| 3 | MCP tool-search/deferral interaction with a subagent's inline `mcpServers` | **NEEDS TEST** | Inline MCP server with >N tools, tool-search on, inspect `/context` in the subagent. |
| 7b | A frontmatter `PreToolUse` hook reliably enforces a per-agent write-path allowlist | **NEEDS TEST** (mechanism documented; not a documented recipe) | Agent with `PreToolUse` matcher `Edit|Write` → script exits 2 unless path under allowed prefix; attempt in/out-of-scope edits. |

*(NEEDS-TEST items are non-blocking for the reframe — the crux (2a) is KNOWN. They surface at implementation if relevant.)*

## Sources
- [Create custom subagents](https://code.claude.com/docs/en/sub-agents) · [Memory](https://code.claude.com/docs/en/memory) · [Skills](https://code.claude.com/docs/en/skills) · [Permissions](https://code.claude.com/docs/en/permissions) · [Settings](https://code.claude.com/docs/en/settings) · [issue #5914 — @-imports in sub-agent files (closed not-planned)](https://github.com/anthropics/claude-code/issues/5914)
