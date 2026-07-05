# Inbound: 2026-07-05 Gate Clearance + Ratifications → Spec 122

**Date**: 2026-07-05
**Source**: main-loop session (Peter + Claude): input-fidelity fixes, gap-#7 ratification, A9 governance review, 13.0.0 release
**Status**: Facts and decided law for formalization — the ratification is a DECISION; the rest is cleared-precondition state.

---

## 1. All three §6 Input-Fidelity Gates are CLEARED

- **117/136 reconciliation — DONE** (`3dd50f94`). Lina adjudicated empirically: **136**, counted from the per-category Concept Catalog lists (the enforced source of truth via `contract-catalog-name-validation.test.ts`, 237/237 green pre+post). All four in-doc references reconciled incl. MCP-served frontmatter. Root cause recorded in-doc: the last full sweep was the 2026-03-18 gradient_glow ballot; only the rolling "Updated:" line tracked later additions.
- **`.web.tsx` → `.web.ts` — DONE at NINE sites across five files** (`3dd50f94`): the two known prompt sites plus seven more in `Component-Development-Guide`, `Component-Schema-Format`, and `technology-stack`. The known-list-of-two was wrong in exactly the way §8's meta-finding predicts — treat as further evidence the sweeps must be mechanical, not enumerated.
- **Data `start-up-tasks` drop — ADJUDICATED assessment-gap** (`b7c3c148`), corrected in the per-agent-ambient-design; the same omission existed in 6 of 8 blocks (see #2).

Requirements can now be written; no gate remains open from §6's list.

## 2. Gap #7 composition rule — RATIFIED (Peter, 2026-07-05, `9d8070ae`) — decided law

**Each agent's ambient layer = (locked always-set) ∪ (per-agent five-class members). Inlined always-set docs in per-agent blocks are class annotations, never membership selection.** Per-agent always-set exceptions are deliberately inexpressible (an always-set an agent can opt out of is not an always-set; a doc that shouldn't reach some agent is a redesign of the set's membership). Consequence: the parallel per-agent-block omissions need no edits. Formalization consumes this as settled — do not re-open.

## 3. Per-runtime transform inputs (from the A9 governance review, Thurgood 2026-07-05)

- `governance/Process-Spec-Planning.md` references **`getDiagnostics` / `taskStatus`** as universal workflow steps — they are Kiro-runtime tools. Known portability gap; the generator's per-tool transforms (§2.3) should carry a disposition for runtime-specific tool references in *governance docs agents are pointed at*, not only in prompts.
- The Thurgood CC port's header claims "no relocation has happened yet" — false post-119-A. Live OB-6 evidence; regenerated ports fix it by construction.

## 4. Baseline context

13.0.0 shipped 2026-07-05 (both registries): the corrected canonical inputs (Concept Catalog at 136, governance/ relocation, `find_docs`) are now the **published** baseline consumers see — first-generation cutover (§3b) will ratchet against this state, not 12.0.5's.
