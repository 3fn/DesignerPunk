# Task 8 Summary: Module-Direction Decision Point

**Date**: 2026-06-25
**Purpose**: Concise summary of parent task completion
**Organization**: spec-summary
**Scope**: 118-module-resolution-coherence

## What Was Done

Committed the module-resolution direction on the assembled Increment-2 evidence: **CJS-consistency, executed fully in-spec, escape-hatch NOT elected.** Ada interpreted the evidence independently; the 122/123 no-ESM-hard-requirement pre-check was cleared; Peter committed. Recorded in `findings/direction-decision.md`, with the future ESM-modernization path sized and roadmapped.

## Why It Matters

The April→June→117 cycle was caused by *assuming* this answer. Task 8 makes it **on evidence**: three independent axes (the shipped jest-preset blast radius, the surface being CJS top-to-bottom today, and the Task-1 finding that the ESM-native loader fails from the CJS host) point to CJS; the pro-ESM axes neutralize because the loader already resolves consumer configs of *both* styles, so internal direction is decoupled from consumer authoring. CJS-consistency is the lowest-incoherence end-state and lets 118 close on an *executed* coherent system — coherence-by-consolidation, not coherence-by-disruption.

## Key Changes

- `findings/direction-decision.md` — the committed direction + rationale + escape-hatch disposition (not elected) + ESM-modernization sizing + 122/123 clearance.
- `tasks.md` — Task 8 / 8.1 marked done.
- `docs/roadmap/m0a-deferred-items.md` — ESM-modernization path + the surfaced-issue triage recorded.

## Impact

- ✅ **Direction committed** — unblocks the Groups 9/10 second tasks pass (Group 9 = CJS branch of 3a/3b/3c + lint polarity bans explicit extensions; Group 10 does not fire) AND Specs 122/123 formalization.
- ✅ **118 closes on an executed end-state** — no escape-hatch, the consumer jest-preset never touched.
- ✅ **Forward-compat preserved** — consumers keep authoring ESM configs; the ESM door stays open with the migration path already mapped.
- ➡️ **Next:** Task 11 (governance codification) + the second tasks pass for Increment 3 (CJS execution).

---

*For detailed notes, see [task-8-completion.md](../../../.kiro/specs/118-module-resolution-coherence/completion/task-8-completion.md)*
