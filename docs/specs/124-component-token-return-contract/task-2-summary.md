# Task 2 Summary: Token-Index Ordering Spike

**Date**: 2026-06-26
**Purpose**: Concise summary of parent task completion
**Organization**: spec-summary
**Scope**: 124-component-token-return-contract

## What Was Done

Identified the committed `token-index/components.yaml` ordering rule and decided where deterministic order is imposed for the harvest, so the regenerated index reproduces the committed file (R6). The rule is **directory-scan order, NOT a sort**: Source 1 (`progress.ts`) first, then Source 2 (`src/components/core` scan in `readdirSync` order), brand-filtered, with authored intra-file array order preserved.

## Why It Matters

The R6 gate is `git diff token-index/` empty. If the harvest sorted the array, the regenerated file would reorder to alphabetical and the diff would never be empty. The spike proved (by falsifying alphabetical and component+name candidates against the committed sequence) that the committed order is the scan/traversal order itself — so the harvest must preserve it and introduce no sort key.

## Key Decision

- **Preserve scan order; no sort.** This **overturned the pre-spike lean toward a stable sort.** Sorting would be more robust long-term but requires a deliberate re-baseline of `components.yaml` — a separate conscious decision, not smuggled into the "reproduce committed" gate.

## Impact

- ✅ Ordering rule confirmed exact against the committed file; `readdirSync` verified stable (and lexicographic on this filesystem).
- ↪ Watch item to Task 3: multi-call files now order intra-file by `Object.values(mod)` enumeration; the R6 diff catches any shift.
- ↪ Seeded latent follow-up: scan-order ties the committed file to `readdirSync`/filesystem order — a canonical sorted order would be portable but needs a deliberate re-baseline (not 124).
