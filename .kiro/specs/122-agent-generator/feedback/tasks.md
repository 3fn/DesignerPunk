# Spec Feedback: Agent Generator (122) — Tasks

**Spec**: 122-agent-generator
**Round**: Tasks R1 — PENDING (awaiting reviewers). Thurgood abstains as author, incorporates as R2.
**Created**: 2026-07-07
**Artifact under review**: `tasks.md` (DRAFT — 18 parent tasks across Group 1 Substrate / phase gate / Group 2 cutovers / Group 3 OB-7 / Closeout)

---

## Tasks Feedback

### Context for Reviewers

- Requirements and design are BOTH RATIFIED (requirements 2026-07-05; design 2026-07-07 — CC-model reframe enacted, Req 1 AC1 bright-line applied). Review the **decomposition** for: task-type/tier correctness, the phase-gate boundary, PR-sizing, agent assignment, and traceability — do NOT re-open ratified requirements or design decisions.
- The substrate→agent phase gate is encoded as **Task 8** (the blocking parent that commits the C13 closure-evidence bundle, with C12's provisioning gated inside it). No Group 2 task starts until Task 8 merges. Challenge the gate's placement if you see substrate work misfiled into Group 2 or agent work leaking into Group 1.
- Task types per the ratified four-type taxonomy; Documentation-type Tier-2 escalation is CONJUNCTIVE (SHALL/SHALL-NOT contract semantics AND cross-spec dependency). The three Tier-2 Documentation subtasks (8.3, 17.2, 18.1) each carry a one-line conjunctive rationale — challenge any you think is really Tier 1.
- Seat-specific review targets: Ada — Task 9 (her cutover, the 30-baseline signal); Lina — Task 10 (the L1 server-grant FAIL exercised on her live config) + Task 3 (skills relocation, she confirms activation descriptions); Data — Task 13 (artifact-path trims, `shape: per-theme-set`, K-D1 orphans); Kenya — Task 15 (never-ported baseline D-A4, zero-skills sweep-2 PASS, standingFacts K-D3); Sparky — Task 14 (8+3 content carry, dev-server-absence intentional); Leonardo — Task 12 (routes prose→frontmatter LE-D1, the ~60% member-figure signal) + the cutover ORDER question below; Stacy — Task 8.2 (her C12 provisioning gated into the gate) + Task 16 (her own cutover) + the coverage-of-coverage evidence chain.

### Two flagged design under-specifications (surfaced, not papered over)

1. **First CC cutover: fixture vs a real debut agent.** Design (C11 L5 / C10.1) says "the first CC cutover MUST NOT be the highest-risk agent — sequence a low-blast-radius agent (or the fixture) first." The fixture runs at Task 8 (inside the substrate gate) as the dry-run, which arguably satisfies "prove the emission before it matters." But design does not name WHICH real agent is the first Group 2 cutover, so a task cannot state a crisp "this is the debut, it carries extra scrutiny" done-condition without a choice. I proposed Ada first (already-ported system agent, debug-safe, low blast radius) — reviewers should confirm or redirect. **This is a design gap in cutover-sequence specificity, not a tasks defect.**

2. **Group 2 cutover ORDER.** Design constrains the order only by "first ≠ highest-risk" and "never-ported first-generations are cutovers, same sequence." It does NOT pin a total order. My proposed sequence — Ada → Lina → Thurgood → Leonardo → Data → Sparky → Kenya → Stacy (system agents first, then consumer/product, never-ported seats last so the pipeline is most-proven before first-generation risk) — is a reading, not a design mandate. Reviewers (esp. Kenya/Sparky/Stacy, whose first-generations land late) should weigh in: is "never-ported last" right, or does a debut seat want to go earlier while the reviewers are most engaged?

---

*(Agent feedback rounds below. Scan and answer any `[@YOUR_NAME]` mentions before adding your own review, per the Spec-Feedback-Protocol.)*
