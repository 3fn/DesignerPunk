# Design Outline: 125-A — PR Gate + Mechanical Arming

**Date**: 2026-07-05
**Spec**: 125-A (first sub-spec of 125 Mechanical Enforcement Strategy, per the Spec 119 A/B model)
**Author**: main-loop scaffold (Peter-directed); Thurgood leads formalization review
**Status**: Draft scaffold — requirements + tasks drafted together under the Spec-Feedback-Protocol waiver Peter granted (one collective review round: Thurgood + Stacy). Nothing executed yet.

---

## Why a sub-spec (the split decision)

**DECIDED (Peter, 2026-07-05): 125 splits on the 119-A/119-B model.** The fault line is temporal and externally imposed: Phases 0 + 1a are executable now and gate everything downstream; the classification map and Phase 2+ consume Spec 122's canonical source and formalize AFTER 122 calcifies (as **125-B**). The split gives 125-A clean completion semantics (finish, verify, hand forward) instead of a spec held open for months across the 122 interlude. Sequence: **125-A → 122 → (125-B ∥ 119-B) → 123.**

## Scope

Exactly the umbrella outline's §4 "Phase 0 (GREENLIT shape)" + "Phase 1a" (the mechanical sliver of Phase 1). This sub-spec's design lives THERE (`../125-mechanical-enforcement-strategy/design-outline.md` §4, 2026-07-05 update) and in `.kiro/docs/ballots/README.md` (the record-first protocol Phase 0's law change uses) — this outline does not re-derive it. Two sequenced task groups with a hard gate between:

1. **Phase 0 — the PR gate**: branch protection on `main`; required checks = the currently-armed green set; Task-Completion-Protocol + `commit-task.sh` move to branch → PR → checks → merge (ratified record-first); checks-only merging (no required human review).
2. **Bake-in gate**: ≥1 week of ordinary work through the flow; ergonomics findings logged and resolved before group 2 begins.
3. **Phase 1a — mechanical arming**: full typecheck, `build:validate`, the wholesale functional suite, and the two MCP sub-package suites become required checks, each with selection-floor + scope guards ("armed = verified non-empty AND correct scope").

## Explicitly NOT in 125-A (negative scope — the right-sizing guard)

- The classification map, warn→fail promotions, pruning obligations → **125-B**
- `no-hardcoded-color` and net-new lints → **125-B** (Phase 2)
- CODEOWNERS / required-review on `governance/` (ratification layer 2) → **125-B** (Phase 2); Phase 0 is checks-only
- Consumer-side reach → **Spec 123** (Phase 3)
- The elective autonomy dial → parked with its activation trigger (Phase 1 closeout review)

## Exit criteria

The gate is live and unbypassed; the full mechanical check set blocks merges; the workflow law is ratified and applied; one bake-in week completed; Spec 122's formalization can begin merging through an armed gate.

## Cross-references

- `../125-mechanical-enforcement-strategy/design-outline.md` — the umbrella (§4 = this spec's design; §8 decisions; inbound notes)
- `.kiro/docs/ballots/README.md` — record-first ratification (the Phase 0 law change is its first planned use)
- `../125-mechanical-enforcement-strategy/inbound-from-2026-07-05-lane-viability.md` — the measurements behind Phase 1a
- `.kiro/specs/119-steering-progressive-disclosure-redesign/` — the A/B split precedent
