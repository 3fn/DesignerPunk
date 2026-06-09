# Task 2 Summary: MCP Health Parity — Application MCP

**Date**: 2026-06-09
**Purpose**: Concise summary of Task 2 completion
**Organization**: spec-summary
**Scope**: 106-consumer-contract-testing

---

## What Was Done

Added three-state health reporting (healthy/degraded/failed), threshold staleness gate, expanded file watchers for all data sources, autoApprove for rebuild tools, and designLanguagePath CLI fix to the Application MCP.

## Key Changes

- Health status: `'empty'` → `'failed'`; `'degraded'` includes `staleFiles` array
- StalenessGate checks file mtimes every 30s before tool responses; rebuilds if stale
- FileWatcher expanded from components-only to all 5 data sources
- `rebuild_index` added to autoApprove; `DESIGN_LANGUAGE_PATH` passed by CLI
- `computeMaxMtime` for clock-independent staleness baseline

## Impact

- Agents get fresh data automatically (max 30s stale window)
- Health reporting distinguishes "no data" from "stale data" from "healthy"
- Self-recovery via autoApproved rebuild tools
