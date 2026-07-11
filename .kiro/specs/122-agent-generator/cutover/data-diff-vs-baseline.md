# Data (U7) — Classified Diff vs Baseline

**Cutover**: Task 13, Unit U7 — Data (Android platform engineer)
**Baseline**: `.claude/agents/data.md` @ `HEAD` (11254d84) — the hand-authored CC port (pre-cutover)
**Generated**: `.claude/agents/data.md` regenerated from `canonical/agents/data.md`
**Gate**: zero unexplained regressions; every channel-move trim resolves under C7; regressions (if any) adjudicated below.

Data WAS CC-ported, so this is a **diff-against-baseline** (not a content-completeness check). The generated
output is *larger* than the baseline by design: the CC per-agent always-layer members (his two governance-as-law
docs) are **inlined** into the agent body (C11 lane 2 — CC has no per-agent import channel), and the capability
catalog (routing cues, commands, knowledge fallback, write-scope, pre-flight) is **rendered** from canonical
frontmatter. Those are additive generated sections, attributed in `.claude/agents/data.md.attribution.json`.

---

## Summary

- **Zero baseline body sections dropped without a channel.** Every baseline `##`/`###`/`####` line-item is
  present, renamed, channel-moved, carried, or dropped-with-reason (table below).
- **Tool grant = strict superset**: every baseline-granted tool retained; **one added** —
  `rebuild_product_index` (see § "Tool-grant delta").
- **Regression adjudications: none.** No baseline content was lost.

---

## Baseline-subsection reconciliation table (Stacy U6 amendment)

Every baseline heading line-item, classified. `carried` = prose delivered (verbatim or trivially reworded);
`channel-moved` = relocated to a rendered/generated section (its content survives, differently homed);
`renamed` = heading text changed; `dropped-with-reason` = deliberately removed.

| Baseline line-item | Classification | Where it lives now / reason |
|---|---|---|
| `> ## ⚙️ Claude Code Port Note — READ FIRST` (+ all 6 bullets) | **dropped-with-reason** | Hand-port stopgap meta-note. The generated output IS the port (Req 15 AC1 supersession). Its 6 bullets each channel-moved: MCP-namespacing → rendered tool names; "Android skills native / Skill tool" → `skills:` frontmatter + generator render + retained Android Skills prose; "Kotlin files NOT injected / read directly" → `## Ground truth` trims; "no /knowledge → Grep/Glob" → `## Knowledge fallback`; "no hotkeys → route via Peter" → `## Routing` + keyboardShortcut drop-with-reason; "write-scope behavioral only" → `## Write scope`. Nothing lost. |
| `# Data — Android Platform Engineer` | carried | Verbatim. |
| `## Identity` | carried | Prose carried; sibling+system agent list (Leonardo/Kenya/Sparky/Stacy/Ada/Lina/Thurgood) condensed into prose (all 7 still named), Sparky-template style. "recommend Peter route / no hotkeys" → channel-moved to `## Routing`. |
| `## Domain Boundaries` → `### In Scope` | carried | Verbatim. |
| `### Android Theming (Spec 094)` | carried | Verbatim + a ground-truth-live pointer added; "Static tokens … remain on the `DesignTokens` object" carried (+"the"). |
| `### Product Tokens (Specs 108/109)` | **renamed** | → `### Product Tokens (Spec 108/109)` (singular — matches the existing `Spec 094` style and clears the volatile-fact lint false-positive on `Specs 108`). Body carried; "Query available tokens: `get_product_tokens({platform:android})`" neutralized to prose + routed cue; "read directly" lines → `## Ground truth`. |
| `### Out of Scope` | carried | Verbatim. |
| `### Blocking Exception: Direct Escalation to Peter` | carried | Verbatim. |
| `### The Implement vs Direct Distinction` | carried | Verbatim. |
| `## Operational Mode: Screen Implementation` → Steps 1–5 | carried | Verbatim, except Step 2 "Import … from DesignTokens.android.kt (read directly …)" **channel-moved** to "query the application MCP … never read the stale `dist/*.kt`" (the trim); "(routed)"/"(Product Handoff Protocol, Tier 2)" minor edits. |
| `## Operational Mode: Platform Expertise` (What/How You Provide) | carried | Verbatim. |
| `## Collaboration Model` (Leonardo/Siblings/Stacy/Peter) | carried | Verbatim incl. the Tier 1/2/3 Product Handoff Protocol paragraph. |
| `## Token Consumption` → How to Use / Token Reference Pattern | carried + channel-moved | Prose carried; "Import DesignTokens.android.kt / ComponentTokens.android.kt (read directly)" → `## Ground truth` (trims) + "query the application MCP"; "Query Token-Quick-Reference via …get_section" → routed Token Documentation Map. |
| `## Platform Currency Expectations` | carried | Verbatim. |
| `## Platform Reference Pointers` | carried | Verbatim. |
| `## Android-Specific Guidance` | carried | Verbatim; "consumed as Kotlin constants from DesignTokens.android.kt" + ground-truth-live note. |
| `### Android Skills (… — now native Claude Code skills)` | **renamed** + channel-moved | → `### Android Skills (Official Google Patterns)`. The 4 skills + priority order carried as prose; the "native CC skills / invoke with Skill tool" wiring channel-moved to `skills:` frontmatter + generator render. |
| `## MCP Usage` (+ Application/Docs/Product MCP tool lists) | **channel-moved** | → `## Routing` (rendered capability cues, one per tool) + `## MCP Practice Notes` (the ground-truth-live + fallback prose). |
| `### Progressive Disclosure` (1–4) | **channel-moved** | The spec-first ordering → Operational Mode Step 1; the WHEN-to-query-what → the `## Routing` triggered cues. Not carried verbatim (matches the Sparky template, which has no standalone Progressive Disclosure list). |
| `### Write-Side Rebuild Protocol` (+ table) | carried | → `## MCP Practice Notes` "Write-side rebuild protocol" (table → prose; the volatile "30s threshold" neutralized to "on a delay"). `rebuild_product_index` now granted (see below). |
| `## Collaboration Standards` (Counter-Args/Candid/Bias/Ask) | carried | Verbatim; "Follow AI-Collaboration-Principles and …Framework" → "always-loaded spine; pull the fuller Framework on demand"; Bias bullets → semicolon prose (all items retained). |
| `## Knowledge Lookups` | **channel-moved** + renamed | → `## Knowledge fallback` (rendered from `knowledgeBases`: android component sources + `*Test.kt` globs, Req 11 AC1). |
| `## Testing Practices` (What You Own / Don't Own) | carried | Verbatim. |

### Generated sections ADDED (not in baseline — the always-layer + capability catalog)

`## Ambient (per-agent)` (inlined law: platform-implementation-guidelines §§ Android Implementation Patterns /
`.dp` Pattern / 3. Token Usage Consistency, + product-token-governance §§ System-First Value Selection / …),
`## Ground truth` (the 2 dist-`.kt` trims), `## Workflow rules`, `## Routing` (cues + doc routes + the Leonardo
agent route), `## Commands`, `## Knowledge fallback`, `## Write scope`, `## Pre-flight` (agentSpawn). All
generated from frontmatter, attributed in the sidecar.

---

## Tool-grant delta

| Direction | Tool | Disposition |
|---|---|---|
| **added** | `mcp__designerpunk-product__rebuild_product_index` | **baseline-parity fix.** The baseline's own Write-Side Rebuild Protocol tells Data to call `rebuild_product_index`, but the hand grant omitted it (a latent inconsistency — a cued-but-ungranted tool would FAIL C7 class (c)). His sibling Sparky grants it. Added to `toolSubset.designerpunk-product`; now cued and granted coherently. |
| dropped | — | none |

Every other baseline-granted tool is retained. The grant is a strict superset (parallels Leonardo U6's superset).

---

## Token-law adjudication (channel-move at the ambient layer, not a diff-vs-baseline regression)

Independent of the CC-port diff, Data's **governance-as-law lockset** changed vs the 119-A design spine: the spine's
`token-quick-reference` lock was **demoted** to an on-demand route and **`product-token-governance`** locked in its
place (Ada's ruling — see `data-cutover-report.md` § "Token-law adjudication"). This surfaces as sweep-4 deltas,
**recorded in `canonical/adjudications.yaml`** as `assessment-gap` (both directions), not as a diff-vs-baseline
line (the baseline hand port force-loaded BOTH docs; both still reach Data — one as law, one as a route — so no
ambient doc is lost). The 2 stale `dist/*.kt` trims and the 9 other on-demand demotions each carry a `replaces:`
cue (sweep 8 green).

---

## Regression adjudications

**None.** No baseline content was dropped without a channel; the one tool change is an addition.
