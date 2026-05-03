# Task 2 Summary: Terminology Audit and Staleness Assessment

**Date**: 2026-05-03
**Spec**: 098-civitas-readiness-audit
**Type**: Parent

---

## What Was Done

Scanned 86 steering docs and 16 agent files for intelligence layer terminology to estimate the Civitas naming rollout blast radius. Ran the existing staleness detection script and cross-referenced results against the spec log to distinguish stale-and-inaccurate docs from stale-but-stable ones.

## Why It Matters

The terminology audit reveals that "intelligence layer" appears zero times in existing steering docs — Civitas introduces a new concept rather than renaming an existing one, which simplifies the rollout. The staleness assessment reveals that the primary issue is metadata governance (12 docs missing `Last Reviewed` fields), not document age — no docs are genuinely >6 months old.

## Key Changes

- `findings/terminology-audit.md` — 5 term families mapped; 30 Rosetta+Stemma paired references identified; blast radius estimated at 17-19 files, ~50-60 text changes
- `findings/staleness-assessment.md` — 7 docs stale-and-inaccurate, 8 stale-but-stable, 12 missing metadata, 59 fresh; Process docs most vulnerable domain (21%)

## Impact

- ✅ Naming rollout blast radius is manageable (~50-60 changes across ~18 files)
- ✅ Civitas is an umbrella term, not a replacement — specific terms (steering doc, MCP server, hook) remain
- ✅ Staleness problem reframed as metadata governance gap, not document age
- ✅ Staleness detection script confirmed functional but dormant and needing enhancement

---

*For detailed implementation notes, see [task-2-completion.md](../../.kiro/specs/098-civitas-readiness-audit/completion/task-2-completion.md)*
