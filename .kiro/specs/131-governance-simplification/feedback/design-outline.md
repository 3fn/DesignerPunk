# Spec Feedback: 131 — Governance Simplification

**Spec**: 131-governance-simplification
**Created**: 2026-10-24
**Structure**: split by phase (Spec-Feedback-Protocol § "The Feedback Document"). This file is the Design Outline phase. `requirements.md`, `design.md` and `tasks.md` feedback files open at their phases. The sequential gates are **not waived** (Peter, 2026-10-24).

---

## Design Outline Feedback

### Stakeholder identification

| Reviewer | Why | Asked to look at |
|---|---|---|
| **Stacy (required)** | She specified several layers the map retires, she owns the claims passes that row 10 reshapes, and she is the verifiability reader | The whole outline; especially the "Delivered?" cells, rows 1–3, 5, 7, 9, 10 and 20, and metric 2's denominator |
| **Lina** | She built the disposition modules (rows 1–3); `runGuard`'s freshness call is in her scope; she owns readiness (row 19) and P2 | Rows 1–3, 7 and 19; § 8's definition of "pure deletion" |
| **Ada** | Token tier of the compile lane; token governance (row 18); F17's filing failure (row 13); freeze fork F-5 | Rows 13 and 18; F-5; § 7's 129 dependency |
| **Leonardo** | Consumer surfaces (rows 17 and 19); the fixture's design; P10a; F-6 | Rows 17 and 19; F-6; § 5's "outside source of purpose" |
| **Kenya** | iOS half of the compile lane and the consumer fixture | § 7: who owns the fixture, and where it lives (129 or 131) |
| **Data** | Android half of the compile lane and the consumer fixture | § 7, the same question |
| **Outside read (orchestrator-run)** | One charter-free read at R1, because every seat is one model family | Smoothed-over forks; whether the map re-creates the complexity it diagnoses |

Not tagged: Sparky (no web-specific surface beyond P2, which Lina carries). Peter rules; he is not a round reviewer.

### Context for Reviewers

- **Settled, not re-opened.** 16.1.0 ships under current rules through its tag (item 0a, (i)). P1's scope (i) is a hypothetical planning input (item 1a), not a ruling. No suspension record is issued outside this spec → `synthesis-2026-10-23.md` § "Rulings"
- **Peter's words are carried verbatim**: concern, aim, problem, vehicle, gates and his four definitions → `design-outline.md` § "1. The problem, in Peter's words" and § "4. Design principles (PROPOSAL)"
- **Priority**: 129 → 131 → 128 → 130 (Peter, 2026-10-24) → `design-outline.md` header; `.kiro/issues/2026-10-18-spec-priorities-by-outcome.md` § "Walk log"
- **Facts are the synthesis's command-verified § 1 (F1–F31).** Dispute a fact by command, not by recollection → `synthesis-2026-10-23.md` § "1. Settled facts"
- **Closed in round A** (L3, L5, L6, L8; L7 superseded by the vehicle ruling) → `synthesis-2026-10-23.md` § "3. Disagreements"
- **Under review — all PROPOSALS**: the outcome map (§ 3), the principles and their two proposed additions (§ 4), the requirements approach, the self-sustaining list and the metrics (§ 5), the tasks-phase idea (§ 8)
- **Open forks, attributed and unresolved**: F-1 to F-8 → `design-outline.md` § "6. Open forks (attributed, unresolved)". Reviewers may add evidence to a fork. They do not pick it; that is Peter's.
- **The map's outcome cells cite each layer's own ballot or requirement.** If a cell misstates what a layer was built for, cite the § that says otherwise. "Unmeasured" cells are requests for a fact.
- **Conflicts, stated**: the author wrote much of what is retired (F31). Read the "Delivered?" cells with that in mind → `design-outline.md` § "Conflicts, stated"
- **Out of scope**: the release work (disclosure wording, Ada's parse fixes, #450's held questions) and building the compile lane, which is Spec 129's

[Agent feedback rounds here]
