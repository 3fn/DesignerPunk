# Task 5 Completion — Target adapters (C4): CC first, then Kiro

**Spec**: 122 — Agent Generator
**Unit**: U1 (Substrate) — parent inside a multi-parent unit; **no PR at this completion** (U1's PR opens at Task 8).
**Type**: Parent
**Date**: 2026-07-10
**Branch**: `task/122-substrate`

---

## What was built

### 5.1 — The `TargetAdapter` interface (Architecture, main loop)
`tools/agent-generator/adapters/index.ts`: the verbatim design-C4 seam (`emitAgent`/`emitSkills`/`emitAlwaysLayer`/`toolRef`/`skillRef`/`renderWriteScope`/`dispositions`) + shared substrate: `EmittedFile` with the **attribution rule decided at the seam** (every emission carries a sidecar — multi-span for prose, single render-span for machine JSON, single passthrough-span for copied skills — keeping P2 literally total over the whole emitted surface); `FieldDispositionTable` typed to the **authored** vocabulary (incl. Task 1.3's legitimate fourth value `handled-elsewhere`); the C2.5 shared-catalog parser; `AdapterContext` (adapters never read canonical inputs from disk — emission stays pure, P1).

### 5.2 — CC adapter (Implementation, Sonnet + main-loop adjudication)
`adapters/cc.ts`: the full Kiro→CC transform table — namespaced `toolRef` (`mcp__<server>__<tool>`, fail-loud), flat Skill-tool `skillRef`, **behavioral** write-scope note naming the facet-7 enforcement options (PreToolUse hook / `isolation: worktree`), `emitAgent` (frontmatter tool expansion; ordered body: verbatim pass-through → **C11 lane-2 inline embeds** from `ctx.embeds` with loud-throw on a missing id → workflow rules → routing → commands + shared catalog → knowledge fallback → write scope → agentSpawn pre-flight; `keyboardShortcut`/`welcomeMessage`/`includeMcpJson` render **nothing**), `emitSkills` (byte-identical copies), `emitAlwaysLayer` (**C11 lane 1**: generated `CLAUDE.md` banner + `@`-import lines via `ctx.steeringIdToPath` — live references, `resolve` op without `mode: embed`).

**Incorporation adjudications (recorded)**: combined commands+catalog render span — accepted (P2 wants totality, not per-entry grain); shared-cue fail-loud when the agent's subset lacks the tool — accepted (C7 class-c would fail that agent anyway); unconditional empty `## Ambient (per-agent)` header — **overruled** (omitted when zero members; prompt noise for empty-by-design agents) with a regression test.

### 5.3 — Kiro adapter (Implementation, Sonnet) — **the Req 24 AC3 proof**
`adapters/kiro.ts`: native (non-namespaced) `toolRef`; `skill://` `skillRef`; base write-scope note (Kiro has the declarative field); `emitAgent` → **two files**: `.kiro/agents/<agent>.json` (real-config grammar matched against `ada.json`/`data.json`: `prompt: "file://./<agent>-prompt.md"`, `tools: ["*"]`, `includeMcpJson: true`, server-level `allowedTools` grants with canonical `toolSubset` the checkable object, `resources` from the ambient manifest — id→path via the new additive `ctx.docIdToPath`, scheme per member `delivery` hint — plus skill rows, `kiro:` fields carried through incl. `writeScope → toolsSettings.write.allowedPaths`) and `<agent>-prompt.md` (pass-through + rendered sections, native tool names, **no inline ambient** — Kiro has a reference mechanism, so per the Rosetta framing the reference form is used). `emitAlwaysLayer` returns `[]` (Kiro's native always-mechanism is `inclusion: always` on the docs + config resources — nothing separate to emit).

**Req 24 AC3 VERIFIED — the extensibility contract held.** The verbatim `git status --porcelain` at 5.3's landing:
```
 M tools/agent-generator/adapters/index.ts     (one additive optional ctx field)
?? tools/agent-generator/__tests__/kiro-adapter.test.ts
?? tools/agent-generator/adapters/kiro.ts
```
Zero pipeline-engine files touched. Adding the second target = the interface + one context field, exactly as designed.

## Verification (main-loop, Fable 5)

- Both emitters read in the main loop; 5.2's three flagged ambiguities and 5.3's three adjudicated (above / below).
- Real-config grammar spot-verified (ada.json's grant + resources forms; the rich `knowledgeBase` object shape inspected first-hand).
- **Unit lane**: `npm run test:agent-generator` → **186/186** (14 suites; +57 over Task 4). Determinism (byte-identical double-emission) and attribution totality asserted per adapter.
- **Typecheck** clean. **Parent validation**: full `npm test` → **8987/8987** — zero regressions.

## Delegated-tier capture
Planned `**Agent**: Thurgood`. Executed: 5.1 main loop (Fable 5 — the seam is an architecture decision); 5.2/5.3 Sonnet subagents (settled-design implementation) with main-loop verification + explicit adjudication of every flagged ambiguity (one overruled). Plan held with the by-now-standard conscious tiering.

## Open items (carried forward — NOT blocking Task 5)

1. **Kiro `knowledgeBase` resource objects (5.3 flag, adjudicated → Task 9/Ada's cutover)**: real configs carry rich objects (`type/source/name/description/indexType/autoUpdate`) beyond canonical `knowledgeBases: {name, globs}`. The generated config currently emits only ambient+skills string entries. The cutover content-carry (Req 15 AC2 — hand-wiring preserved, never clobbered) must extend the canonical schema/carry for these; **the diff-vs-baseline merge gate at U2 will force it loudly if forgotten** (a regenerated `ada.json` missing her three knowledgeBases = visible regression lines).
2. **`emitSkills` copy-logic duplication** (cc.ts/kiro.ts private helpers) — accepted minor duplication (exporting from cc.ts was outside 5.3's sanctioned surface); cleanup candidate if a third adapter lands.
3. **Generation entry point** (assembles AdapterContext: embeds via the corpus session, both id→path maps, shared files) — Task 8's fixture run builds it; the adapters are deliberately pure consumers.
