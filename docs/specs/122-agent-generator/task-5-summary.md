# Task 5 Summary — Target adapters (Spec 122, U1)

**Status**: Done on branch `task/122-substrate` (parent inside unit U1; accepted at U1's merge, Task 8).
**Date**: 2026-07-10

Both target adapters are built on one interface (design C4), CC first then Kiro per the ratified build order. The CC adapter implements the full Kiro→CC transform table — namespaced tool refs, flat Skill-tool refs, the behavioral write-scope note, inline per-agent ambient embeds (CC has no per-agent import channel), and the generated-CLAUDE.md always-lane with live `@`-imports. The Kiro adapter emits real-grammar configs + prompts (matched against the actual `ada.json`/`data.json` — server-level grants, `file://`/`skill://` resources from the ambient manifest's delivery hints, `kiro:` fields carried through) and uses references, not inlining, since Kiro has a reference mechanism.

**The headline: Req 24 AC3 is VERIFIED.** The Kiro adapter — deliberately built second — landed touching exactly three files: itself, its test, and one additive optional context field. Zero pipeline changes. Adding a target is additive, as the design demanded; the recorded `git status` is the evidence.

Every emission carries an attribution sidecar (P2 total over the whole surface, three-tier span rule) and double-emits byte-identical (P1). Validation: agent-generator lane 186/186; full `npm test` 8987/8987; tsc clean.

**Open items**: Kiro's rich `knowledgeBase` resource objects await the cutover content-carry (Ada's diff-vs-baseline gate will force it); the generation entry point that assembles adapter inputs arrives with Task 8's fixture run.

**Execution**: 5.1 in the main loop (the architecture seam); 5.2/5.3 Sonnet subagents with main-loop verification — six flagged ambiguities adjudicated, one overruled (empty ambient sections are now omitted).
