# Integration Guide Step 4 Still Ships Without MCP Config Documentation

**Date**: 2026-05-08
**Severity**: Medium (consumers can't configure MCP without external guidance)
**Agent**: Ada (surfaced during Spec 102 Task 2.5 verification)
**Blocks**: Nothing functionally — workaround exists (manual mcp.json authoring)
**Status**: 📝 Tracked
**Suggested Owner**: Thurgood (Spec 102 Task 1.8, already assigned)

## Problem

`@3fn/core@11.1.1` shipped with `.kiro/steering/DesignerPunk-Integration-Guide.md` Step 4 still reading:

> "Connect your Kiro agents to the running MCP servers using the connection details printed at startup."

This doesn't tell consumers:
- WHERE to put the connection config (`.kiro/settings/mcp.json`)
- WHAT the config should contain (the direct-node invocation pattern)
- That a Kiro session restart is needed after saving the config

The canonical MCP config template (`src/cli/templates/mcp-config.json.template`) now ships with the package and `npx designerpunk init` scaffolds it correctly — so consumers who run init get a working config. But consumers reading the Integration Guide standalone (without running init first, or troubleshooting a broken config) have no documentation path.

## Context

- Spec 102 Task 1.8 is assigned to Thurgood and covers this exact fix
- The canonical template (Task 1.1, committed `a98284bd`) is the source of truth for the embedded example
- Task 1.8 depends on Task 1.1 being landed (it is)
- The guide update will ship in the next publish after Thurgood executes Task 1.8

## What the Fix Looks Like

Replace the vague Step 4 text with:
1. Concrete file path (`.kiro/settings/mcp.json`)
2. Full JSON template embedded verbatim from `src/cli/templates/mcp-config.json.template`
3. Note about restarting the Kiro agent session
4. Note that `npx designerpunk init` creates this file automatically (so manual authoring is only needed if init wasn't used or if the file needs updating)

## References

- Spec 102 tasks.md § "1.8"
- `.kiro/issues/2026-05-07-consumer-onboarding-gaps.md` § "Gap 4"
- Canonical template: `src/cli/templates/mcp-config.json.template`
