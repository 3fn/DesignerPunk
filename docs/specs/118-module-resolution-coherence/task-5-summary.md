# Task 5 Summary: MCP/Browser Principled Exception + Boot/Smoke Guard

**Date**: 2026-06-25
**Purpose**: Concise summary of parent task completion
**Organization**: spec-summary
**Scope**: 118-module-resolution-coherence

## What Was Done

Paired the bundled-subsystem exemption (the 3 MCP servers + the browser bundle are exempt from the runtime-resolution contract because bundling resolves imports at build time) with a **boot/smoke guard**, so the exemption is a coherent, enforced boundary rather than a silent corner. Added an MCP guard (subprocess spawn → stderr ready sentinel) and a browser guard (jsdom execution → custom-element registration), wired into the consumer-guard CI lane after a bundle build. Staged the exemption-boundary documentation for the Task-11 governance ballot.

## Why It Matters

R12's whole point: an exemption that isn't guarded is a silent corner where a bundled subsystem could break unnoticed. These guards make the exempt subsystems fail loudly on a boot-time resolution error, completing the direction-agnostic guard set.

## Key Changes

- `tests/mcp-boot-smoke.test.ts` + `tests/browser-boot-smoke.test.ts` — the paired boot/smoke guards (bite-tested).
- `consumer-guard.yml` — `build:mcp`/`build:browser` + the two guard steps.
- `findings/mcp-browser-exemption-boundary.md` — staged boundary doc (ts-node dev configs documented per Decision 2; steering form rides Task 11).

## Impact

- ✅ Bundled-subsystem exemption is now guarded (both guards verified to bite on broken bundles).
- ✅ R12 single-owner guard set complete; direction-agnostic guards (Tasks 4 + 5) done.
- ✅ Full sweep green: `npm run build` exit 0, `npm test` 374/8972, token-index unchanged.

---

*For detailed implementation notes, see [task-5-completion.md](../../../.kiro/specs/118-module-resolution-coherence/completion/task-5-completion.md)*
