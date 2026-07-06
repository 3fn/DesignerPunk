# Spec Feedback: Agent Generator (122) — Design

**Spec**: 122-agent-generator
**Round**: Design R1 — pending (full roster per the requirements-round precedent; Thurgood abstains as author, incorporates as R2)
**Created**: 2026-07-05
**Artifact under review**: `design.md` (DRAFT — components C1–C13, DD1–DD13)

---

## Design Feedback

### Context for Reviewers

- Requirements are RATIFIED (Peter, 2026-07-05) — review the design's **mechanisms** for faithfulness to them; do not re-open requirement obligations. Every component carries a `Traces to:` line; the traceability table maps all 25 requirements.
- The deferred shapes requirements left to design are DECIDED in design.md § Design Decisions (DD1–DD13) — each carries a one-line rationale. Challenging a DD is in scope for this round; that is what they are surfaced for.
- Three **requirements-level findings** are flagged at the end of design.md (Req 1 AC1 × Req 16 AC1 tension; Req 23 AC1 arithmetic; the OB-1 record location). Reviewers should weigh in on all three — especially #1 (the CC declared-embed fallback), which touches the pipeline's core invariant.
- Seat-specific review targets: Ada — C7(a) predicate form (DD3), C1 `assert` schema; Lina — C8 sweep 5 semantics, her C10.2 signal mechanics; Data — C2.2 skills-map schema + sweep 2 discovery-contract assertions; Kenya — C1 `trims`/cue schema (his K2/K3 shapes), never-ported baseline (C10.1 step 2); Sparky — C7(d) command-currency semantics, run-context render; Leonardo — C8 sweep 6 directions + routes.agents schema; Stacy — C12 coverage-map format (DD5), C9 count-asserted registration, C10.1 evidence chain.
- Scope boundary: design-level altitude — schemas and algorithms, no code. Implementation file layout (`tools/agent-generator/` internals) is a tasks/execution matter.

[Agent feedback rounds land here]
