# Investigation: Claude Code Portability Dry-Run (Spec 119)

**Date**: 2026-06-22
**Spec**: 119 — Steering Progressive Disclosure Redesign
**Type**: Investigation / empirical evidence (NOT spec-doc feedback — see `feedback.md` for that)
**Investigator**: Claude Code (main thread) + Thurgood subagent
**Status**: COMPLETE — all four seams tested (Round 1 in-domain retrieval; Round 2 cross-domain-to-known-owner; Round 3 Android skills channel + un-routed token retrieval; Round 4 ownerless/exploratory) plus two generator-design probes (Leonardo MCP-heavy consumption; impeccable script-skill). ALL PASSED. The remaining work is delivery-layer (MCP) hardening + the agent generator, not agent behavior.

---

## Purpose

Spec 119 proposes "activation lives in agent prompts, delivery via the Docs MCP" and rejects Kiro-proprietary mechanisms for portability (e.g., a possible future move to Claude Code). The design outline argues this model works but had no empirical test of it. This investigation runs the model **for real on Claude Code** to convert 119's assumptions into evidence before committing to the full migration (Phases 9–12).

## Setup (additive — Kiro stack untouched)

- Ported `designerpunk-docs` + `designerpunk-application` MCP servers via a new project `.mcp.json` (same built server binaries Kiro uses; gitignored — absolute paths to be relativized before any commit). `designerpunk-product` included for parity (intentionally empty in source repo).
- Ported one agent — **Thurgood** — to a Claude Code subagent (`.claude/agents/thurgood.md`), derived from canonical `.kiro/agents/thurgood-prompt.md`, **with the Kiro `resources:` injection deliberately removed**. This forces the 119 model: the agent must find its context via prompt-routing + MCP queries alone, with no auto-injected steering docs.
- `.kiro/agents/thurgood-prompt.md` remains the source of truth. The Claude Code file is a derived copy; long-term this should be generated from a single source (see Finding 4).

## Test 1 — In-domain retrieval (PASS)

**Task**: With no steering docs injected, confirm docs-MCP health, then retrieve and summarize the "Requirements Document Format" from `Process-Spec-Planning.md` via MCP alone.

**Result**: PASS. Thurgood drove `get_index_health → get_documentation_map → get_section` and reconstructed the standard end-to-end. He also stayed fully in persona — invoked the ballot-measure model and refused to unilaterally fix the issues he found (flagging them instead, per his Civitas remit). The portable model held for the in-domain case where the agent has a routing-table entry.

## Test 2 — Cross-domain deferral (PASS)

**Task**: Peter asks Thurgood directly for a token decision squarely in Ada's domain ("Should `space550` be primitive or semantic, and what value?"). This is the exact scenario in Decision 1's counter-argument ("Peter asks Thurgood about tokens") and the seam predicted to be 119's weakest.

**Result**: PASS, and better than expected. Thurgood:
- **Refused to prescribe** a classification or value, explicitly naming the failure mode he was avoiding ("getting the mathematical foundation wrong... is exactly the kind of error my second-guessing would introduce") — certainty-calibration working as intended; the opposite of the confident-wrong tail failure.
- **Deferred to Ada** while staying useful within his own lane (offered to audit test coverage / formalize a spec).
- **Surfaced a sharp adjacent insight and correctly flagged rather than resolved it**: the name `space550` implies a mid-scale insertion between `space500`/`space600`, which can quietly break the assumption of a clean spacing progression — "but that's her call to make, not mine."
- Did this in **0 tool calls / ~10s** — correctly answered a boundary question from his prompt alone without over-researching (addresses the agents' R1 concern that calibration could cause excessive querying).

**Important scoping caveat**: this was cross-domain to a **clearly-owned** other domain (tokens → Ada), which Thurgood's boundary rules explicitly cover. It is *not* the same as the genuinely untested case — an **ownerless / exploratory** query that maps to no domain and no routing entry (the real substance of Open Question 5, e.g. the Atlassian analysis). The deferral worked precisely *because* tokens have a clear owner; an ownerless query currently has nowhere to fall back (the Documentation Directory doesn't exist yet). That remains the open risk.

---

## Round 3 — Data (Android platform agent) + the skills channel (staged)

Porting Data exposed a knowledge channel Thurgood didn't have. Thurgood's entire knowledge base was MCP-served steering docs (ported clean). Data's capability is spread across **three** channels, and the design outline's two-bucket model (identity + Docs-MCP) only names one:

1. **Steering docs** (`skill://`/`file://` steering refs) — ✅ Docs MCP. Fine.
2. **Non-doc injected resources** — `file://dist/android/DesignTokens.android.kt`, `ComponentTokens.android.kt` (generated Kotlin token files). Not docs, not skills. Ported as: read directly / query application MCP (`get_token_details`/`get_token_family`).
3. **Genuine packaged Skills** — four Google-authored Android skills (`edge-to-edge`, `adaptive`, `navigation-3`, `theming-styles`), each `SKILL.md` + bundled `references/` (and the unrelated `impeccable` skill even ships executable `scripts/*.mjs`). These are **not in the Docs MCP index** (which serves only the 89 steering docs) and are **procedural** ("how to do X"), not reference.

**Finding 5 — Procedural skills are a third knowledge type 119 doesn't address (HIGH for migration completeness).** 119's "everything else via Docs MCP" silently omits skills. They don't belong in a docs MCP (procedural; some carry scripts). For Kiro they're delivered via `skill://` resource injection.

**Finding 6 — On Claude Code the skills gap is an *opportunity*, not a cost.** The Kiro `SKILL.md` files are already in Claude Code's native skill format (verified: `edge-to-edge` is a Google Compose skill with standard `name`/`description`/`metadata` frontmatter + steps + references). Lifted verbatim into `.claude/skills/`, Claude Code auto-discovered all four **immediately, with no restart** (description always visible ~50 tokens; full SKILL.md + references loaded only on use) — i.e. native progressive disclosure for procedural knowledge, delivered by the platform for free. This is arguably a *better* home than Kiro `skill://` injection. Net: the asset that looked like Data's hardest-to-port capability is one of the cleanest wins on migration.

**Finding 7 — Skills hot-load; MCP servers and subagents do not.** Creating `.claude/skills/*` surfaced the skills to the Skill tool in the same session. By contrast, `.mcp.json` servers and `.claude/agents/*.md` subagents required a full Claude Code restart to register. A migration runbook should account for this asymmetry.

**Finding 8 — Claude Code derives the skill identifier from the directory, not frontmatter.** The `theming/styles` skill's frontmatter `name:` was `styles`, but it loaded as `theming-styles` (its copied dir name). Directory name wins; frontmatter `name` is cosmetic for discovery. (Fixed the frontmatter for hygiene anyway.)

**Model-difference noted (not a defect):** Kiro binds skills *to an agent* (Data's `resources`); Claude Code surfaces skills as a *shared, description-gated pool* available to whatever task matches, not scoped per-agent. Probably fine, but it's a real semantics change — "Data's Android skills" become "Android skills available whenever Android work happens."

**Staged artifacts for Round 3:**
- `.claude/agents/data.md` — Data subagent (derived from canonical `data-prompt.md`; granted the `Skill` tool so the skills channel can actually fire; no `resources:` injection)
- `.claude/skills/{edge-to-edge,adaptive,navigation-3,theming-styles}/` — verbatim copies of `.kiro/skills/android/*` (gitignored as dry-run duplicates pending a generator)

**Round 3 RESULT (PASS — the crux):** A **subagent (Data) successfully invoked a native Claude Code skill** (`edge-to-edge`) via the Skill tool, and the full SKILL.md loaded from inside the subagent — and demonstrably *informed the output* (the plan used the skill's specific IME double-padding WRONG case, `contentWindowInsets`/`consumeWindowInsets`, `LazyColumn contentPadding`, `StatusBarProtection`). So the per-platform-agent model + native skills works end-to-end on Claude Code; skills are not main-thread-only. Data also resolved a DesignerPunk spacing token with **no injected token files and no routing table** — MCP-first (`search_tokens` → `get_token_details`), then a file read. Priority order (DesignerPunk tokens first, skill for Android-runtime concerns) was applied correctly and unambiguously; Data even reasoned (correctly) that inset values should *not* be tokenized.

**Finding 9 — `get_token_details` omits resolved value + platform accessor (MEDIUM — application MCP gap).** The token-detail response surfaces the platform *name string* (`space_inset_200`) but not the resolved numeric value or the Kotlin accessor path. So under the "no injected token files" model an agent must (a) chase semantic→primitive for the number and (b) still drop to a `Read` of `dist/android/DesignTokens.android.kt` to get the actual `DesignTokens.space_inset_200` (16.dp) reference. **A `resolvedValue` + `{platform}Accessor` field on `get_token_details` would eliminate the file read and complete the portability model.** Until then, "delivery via MCP" is incomplete for token consumption.

---

## Findings (Round 1–2, Thurgood / docs MCP)

### Finding 1 — Silent under-retrieval is real (HIGH)

`get_section` returns content up to the next `##` heading. The requirements-format guidance is one logical unit split across sibling headings, so the obvious single query returned **only a preamble + an empty template stub** — the actual EARS patterns and acceptance-criteria rules were under the sibling heading.

> Thurgood: "A naive single-query agent would have under-retrieved and not known it."

This is the **confident-wrong tail failure** the portability model is most exposed to: an agent returns a stub as "the format," is wrong, and has no signal that it's wrong. Observed on the **first** task.

- **Direction**: Make **summary-first discovery a hard workflow rule** in the activation model (not left to agent diligence). `get_document_summary` made the second query discoverable; without it the agent under-retrieves silently. 119's prompt-routing guidance should state this explicitly rather than treating `get_section` as a direct hit.

### Finding 2 — Prompt-embedded heading strings drift (MEDIUM)

The prompt's routing example referenced `heading: "Requirements Document Format"`; the indexed heading is `"Requirements Document Format (Conditional Loading)"`. `get_section` requires an exact match, so the shorthand would not have matched without a summary call first.

- **Implication for 119**: Hardcoding exact heading strings across 8 agent prompts is a maintenance/drift surface the design outline did not fully account for. Options: keep routing tables heading-agnostic (doc-level, discover headings at runtime), add a prompt-to-steering currency check (Thurgood's remit), or add fuzzy / stable-section-ID lookup at the MCP.

### Finding 3 — `get_section` ambiguity on duplicate headings (MEDIUM — MCP capability gap)

The doc outline contains repeated generic headings ("Artifacts Created", "Validation (Tier 2: Standard)", "Implementation Details"). `get_section` by heading alone is ambiguous for any non-unique heading; resolving it needs positional/parent context.

- **Direction**: MCP enhancement — address sections by `path + parent` or stable section IDs. Candidate for the **MCP Evolution Roadmap** (possibly related to deferred Option C).

### Finding 4 — Dual-source agent files are a drift surface (MEDIUM — process)

Maintaining a Kiro `.json`+`prompt.md` AND a Claude Code `.md` for the same agent invites divergence. Adaptations required for the Claude Code port (each a portability data point):

| Kiro mechanism | Ports? | Adaptation |
|---|---|---|
| MCP servers | ✅ free | protocol-standard |
| Agent prompt body | ✅ as text | copied |
| `@designerpunk-docs` syntax | ⚠️ renamed | `mcp__designerpunk-docs__*` tool names |
| `resources:` / `skill://` injection | ❌ none | replaced by MCP routing (119's core bet) |
| `/knowledge` semantic search + KBs | ❌ none | fell back to Grep/Glob — **open gap** |
| `toolsSettings.write.allowedPaths` | ❌ none | write-scope now **behavioral-only** (lost guardrail) |
| agent-swap hotkeys | ❌ none | softened to "recommend the specialist" |

- **Direction for 119b**: a build step that generates both Kiro and Claude Code agent files from one canonical source, rather than hand-maintaining copies.

**Cross-cutting observation**: the Kiro mechanisms that *don't* port are precisely the **deterministic guardrails** (resource injection, declarative write-scoping, structured routing). Claude Code's model is more behavioral/probabilistic — which is why the *reliability* of self-directed retrieval (Findings 1–2) is the central risk of the migration, more so than the relocation mechanics.

---

## Round 4 — Ownerless / exploratory query (PASS behaviorally; exposed the discovery gap)

**Task**: an exploratory, no-spec question with no domain owner and no routing entry ("should DesignerPunk make i18n/RTL a first-class concern, where would it live, who owns it?") — the real substance of Open Question 5, and the seam predicted most likely to produce confident confabulation.

**Behavioral result: PASS — the predicted failure did not materialize.** Thurgood:
- **Did not confabulate.** He explicitly resisted two pulls toward confident-wrong answers: (a) a "you already have substantial RTL coverage" false reassurance after a grep returned 14 files — he opened the matching lines, found most were false positives, and corrected to "coverage is thin"; (b) the agreeable "yes, make it a pillar" — he landed instead on the *smaller, honest* recommendation (formalize the RTL bet already made; defer the bigger pillar absent a demand signal). Bias-self-monitoring and certainty-calibration held under the exact conditions designed to break them.
- **Grounded existence-claims in the repo, not training data** (grep over `.kiro/steering/`), and was explicit about which layer was project-grounded vs general expertise.
- **Surfaced a real project finding** (see "Project issue surfaced" below).
- Offered a ballot-measure proposal rather than writing steering unilaterally — persona intact.

**Finding 10 — `get_documentation_map()` is unusable at scale (HIGH).** The one tool meant to answer "what docs exist across all domains" **errored: 78K chars, exceeded the token limit.** The cross-domain index that already exists could not be loaded in the moment. This directly breaks 119's progressive-disclosure story for discovery.

**Finding 11 — No concept-indexed cross-domain discovery (HIGH — and it decides the "Documentation Directory" question).** The agent routing table is a *known-item* lookup: it assumes you already know the filename. There is no way to ask "given concept X (that I can't predict the filename for), which docs touch it and who owns them?" For an emergent cross-cutting concern, the agent fell back to raw grep + manual false-positive filtering — slow, and correctness depended on diligence. **Proposed fix: a lightweight `find_docs({ concept })` on the docs MCP returning ~50 tokens/doc summaries — exactly the shape the application MCP already provides via `find_components`.**

**Implication for 119's Documentation Directory decision (important):** 119 proposes a *hand-curated, manual-inclusion* Documentation Directory to solve cross-domain discovery. This round is evidence that (a) the absence of cross-domain discovery genuinely hurts, but (b) the better fix is **at the MCP layer** (`find_docs({concept})` + making `get_documentation_map` paginate/summarize), not a hand-maintained Directory that is itself a drift surface. The portable, low-maintenance answer is concept-indexed MCP discovery. Recommend 119 reconsider the manual Documentation Directory in favor of this.

**Project issue surfaced (out of scope for 119, logged separately):** the web platform already adopted the foundational RTL primitive — CSS logical properties mandated, physical directional properties prohibited (Hard Rule, `Web-Authoring-Standards.md` lines 34-36, 326) — but with **no stated policy, no cross-platform parity contract, and only one component family (`Component-Family-Form-Inputs.md`, lines 1323/1334) even naming RTL.** A foundational bet adopted without governance — the patch/adopt-without-guard pattern at the policy level. Worth a scoped "RTL parity" governance decision (NOT full i18n).

## Probes — generator design inputs (Leonardo + impeccable, both PASS)

Two remaining mechanisms were probed via a ported Leonardo (MCP-heavy product architect) running a design task, to inform the agent-generator design:

- **Script-skill from inside a subagent — PASS.** Leonardo invoked the `impeccable` skill via the Skill tool; it loaded, its 35 reference files opened at the **repointed** `.claude/skills/impeccable/reference/` path, and its bundled `scripts/detect.mjs` **ran** (`node … --help` exited 0). So a "playbook with a working tool inside" ports AND executes from a subagent. Skills hot-load (no restart), subagents reach them, bundled scripts run. **Generator implication:** the transform must repoint internal skill reference paths (`.kiro/skills/…` → `.claude/skills/…`) — a real, mechanical step the generator owns.
- **MCP-heavy consumption — PASS.** `get_design_philosophy`/`rules`/`color_strategy`, `list`/`get_experience_pattern`, `get_component_catalog`, `validate_assembly` all returned rich data with no injected context. Product MCP (empty here) degraded gracefully with structured "not configured" responses; the skill's documented fallback was actionable.

**Finding 12 — `find_components()` returns empty on natural-language queries (MEDIUM — application MCP gap; SAME FAMILY as Finding 11).** `context:"login"`, `purpose:"text input field"`, `purpose:"primary action button"` all returned `data: []` with no error — the tool matches structured taxonomy, not keywords. A naive consumer would conclude no login components exist, when `Input-Text-Email`, `Input-Text-Password`, `Button-CTA`, and the `simple-form` pattern all do. Leonardo recovered via `list_experience_patterns` + `get_component_catalog`.

**Unifying insight (Findings 11 + 12): natural-language / concept *discovery* is the single systemic weak spot across BOTH MCPs.** Retrieval-by-known-identifier works everywhere; discovery-by-concept fails on both the docs MCP (`get_documentation_map` too big, no `find_docs`) and the application MCP (`find_components` taxonomy-only). The delivery-layer hardening's spine should be **a discovery story** (keyword/concept indexing), not just point-fixes.

## Not yet tested

- (none — all four seams + both generator-design probes complete; experiment closed)
- ~~**Platform-agent port** (no existing routing table — Data/Kenya)~~ — DONE (Round 3, Data). Un-routed token retrieval worked via MCP-first; the gap was the MCP's response shape (Finding 9), not the agent's ability to route.

## Artifacts created

- `.mcp.json` (gitignored) — Claude Code MCP config
- `.claude/agents/thurgood.md` — Thurgood subagent (derived from canonical Kiro prompt)
