# Inbound from Spec 121 (MCP Delivery-Layer Hardening) — for Spec 123

**Date**: 2026-06-23
**Status**: Spec 121 shipped. This note records the watch items 121 hands to consumer distribution.

123 follows 118 (not 121). 121 left these consumer-facing items in 123's lane:

## 1. The dp-portfolio sync-refresh watch (121 Req 4) — the load-bearing one
121 superseded `get_documentation_map` with `find_docs` and **swept all first-party references** to the new tool (steering docs, agent prompts, `mcp.json` autoApprove lists). The evidence showed **zero consumer *code* coupling** — the only references were in doc/config/prompt artifacts.

**The risk 121 explicitly deferred to 123:** if `sync` does **not** refresh dp-portfolio's *vendored* prompts/docs on upgrade, the swept `get_documentation_map → find_docs` references in the **consumer copy go stale** — the consumer would reference a tool that no longer exists. 123 must verify `sync` refreshes vendored prompts/docs on upgrade (and that the consumer's `mcp.json` autoApprove gets the new tool name).

## 2. The MCP surface ships to consumers only on the next release
The MCP servers run from compiled `dist/` (gitignored locally; built + published as part of `@3fn/core`). The new 121 surface (`find_docs`, the `keyword` param, the resolved-value triple, section addressing) reaches **consumers only when a new release is built and published** — it is NOT in `@3fn/core@12.0.5`. 123/release-process should ensure the rebuilt MCP `dist/` is published.

## 3. Out-of-121 consumer bugs (patch-release / 123 territory)
The consumer-install dry-run surfaced live customer-facing bugs that 121 explicitly scoped OUT (they are patch fixes, not gated behind 121): **F-C1** (already resolved in 12.0.5), **F-C2**, **F-C6**. See `.kiro/specs/121-claude-code-portability/consumer-dry-run-findings.md`.

## 4. `DesignerPunk-Integration-Guide.md` content is 123 scope
121 only **retargeted** the `get_documentation_map → find_docs` reference inside `DesignerPunk-Integration-Guide.md` (it was in the sweep set). That doc's *content updates* (consumer onboarding) are 123 scope — distinct from `MCP-Integration-Guide.md`, which 121 owned and updated (Task 7).
