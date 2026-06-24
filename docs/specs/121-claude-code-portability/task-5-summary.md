# Task 5 Summary: Discovery Confidence Model — Three-Layer Emit

**Date**: 2026-06-23
**Purpose**: Concise summary of Spec 121 Task 5 completion
**Organization**: spec-summary
**Scope**: 121-claude-code-portability

## What Was Done

Turned the raw match evidence from Tasks 2 and 3 into the three-layer discovery confidence model on both discovery tools:
- Each result now emits **Match** (`matchConfidence: strong|partial|none` — a tier derived by a per-domain rubric, not an opaque score), **Viability** (components `readiness`; docs `{ placeholder, deprecated }`), and **Usability** (`rank` + `matchedOn`) as three distinct fields, never collapsed.
- Implemented the validated false-confidence guards (components: signal-class-gated coverage; docs: incidental high-field token) so weak matches can't masquerade as strong.
- Added a versioned, docs-domain-owned stop-word module as a legible tuning knob.
- Closed the RTL/internationalization recall-floor gap by generalizing the reactive `aliases:` mechanism from components to docs (Peter-approved).

## Why It Matters

A search result is three questions, not one: did we find it, can it be used, and is it the best fit? Collapsing those into a single score is how an agent mistakes a top match for a usable answer — the model's headline example is a placeholder doc (`Component-Family-Modal`) that's a textbook `strong` match but must never be auto-acted-on. Emitting the three signals separately, with the tier reconstructable from visible evidence, lets the agent gate on viability and judge usability instead of trusting a label. The docs-aliases bridge keeps the recall floor meetable for semantic-synonym queries without shipping deferred embedding ranking.

## Key Changes

- `find_components` + `find_docs` now emit `matchConfidence` / viability / `rank` as distinct fields (additive).
- New `mcp-server/src/query/stop-words.ts` (versioned) and `frontmatter-parser.ts` (high-signal `title`/`description`/`aliases` + viability).
- Docs `aliases:` indexed as high-signal; `Web-Authoring-Standards.md` + `Component-Family-Form-Inputs.md` tagged for RTL discovery.

## Impact

- ✅ Three orthogonal signals, never collapsed; tier reconstructable from `matchedOn` + coverage
- ✅ False-confidence guards verified on both sides; placeholder docs flagged via the distinct viability field
- ✅ RTL recall floor now satisfied at `strong` (real-corpus verified)
- ✅ Fully additive — tsc clean; 249 (components) + 471 (docs) tests pass
- ⏳ Author-facing `aliases:` doc folded into Task 7.1; Task 4 pins these tiers at the tool boundary

---

*For detailed implementation notes, see [task-5-parent-completion.md](../../../.kiro/specs/121-claude-code-portability/completion/task-5-parent-completion.md)*
