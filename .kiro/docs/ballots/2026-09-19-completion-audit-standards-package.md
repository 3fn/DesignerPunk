# Ballot: The Completion-Audit Standards Package (S-1 … S-7)

**Date**: 2026-09-19
**Status**: **DRAFT — submitted for Peter's review** (record-first: on ratification, the `RATIFIED` line and every law edit land in this same PR; a checks-only merge is not ratification)
**Author**: Thurgood (standards authorship, per the Q5 cut — every item below originated in a Stacy claims-pass and traveled the composed learning loop)
**Sources of authority**: the MIDPOINT pass (`.kiro/specs/127-completion-claims-integrity/completion/claims-pass-midpoint.md` §§ S-1…S-4) and the CLOSEOUT pilot (`completion/claims-pass.md` §§ S-5…S-7), with their appended composed-loop outcomes; **Peter's S-4 ruling — ENFORCE (2026-09-19, in-session, recorded in the pilot record's rulings appendix)**
**Ratified-machine slot**: *(written at ratification, alone on its line, per the C11 convention)*

---

## 1. What this ballot is

The first output of the composed learning loop: seven authoring-convention amendments mined from the first two claims passes. Each item names its evidence, its proposed law text, and its edit site. **None creates a gate** — every instrument here is authoring convention plus audit counting; Req 8.8 (no pass is ever a required check) is untouched.

Per the U1 pattern: this DRAFT carries the proposed text for review; the verbatim BEFORE→AFTER inventory and the straggler sweep are produced **at application**, after review, in this same PR.

---

## 2. The seven items

### S-1 — Denominators must be enumerable from the record (2 instances: MIDPOINT F-1, CLOSEOUT F-2)

**The defect**: a criterion reading "contains every element of <prose list>" is unverifiable at audit unless the enumeration survives — both instances produced ✅s resting on counts nobody could recompute, and the 20-vs-19 count split was pure segmentation ambiguity.

**Proposed law** (PSP § "`tasks.md` Structural Conventions", new paragraph; mirrored as an authoring note in the guide § "Parent Success-Criteria Fidelity"):

> A criterion whose denominator is a list SHALL make that list enumerable from the record: either (a) the criterion enumerates its elements inline in `tasks.md`, or (b) the completion doc's Evidence carries the **per-element checklist — the elements themselves, never only their total**. An aggregate count over an unenumerated prose list is non-compliant evidence for the criterion it totals.

### S-2 — Volatile embedded measurements (1 instance: T1-04, "all 153" measured 154)

**Proposed law** (PSP conventions §, one sentence beside the criteria-mode rules):

> A criterion embedding a measurement that can move between authoring and completion is reproduced **verbatim** in the completion doc with the delta attributed in the Evidence cell — never updated in place (in-place substitution is the **reword** class).

### S-3 — A named class for evidence insufficiency (2 instances)

**The defect**: the six mutation classes cover promised-vs-claimed table mutations; a verbatim row with a true-but-unreproducible ✅ has a metric (M3's quality gap) but no name, so passes improvise.

**Proposed law** (guide, beside the six mutation classes and the honest-reach statement):

> A seventh named finding class, **`unreproducible-evidence`**, at the claimed-vs-shipped tier: a ✅ whose stated verification instrument cannot be re-derived from the record. It is an audit-finding class only — counted by claims passes, never a checker verdict and never a gate (Req 8.8 binds).

### S-4 — The subtask completion-doc duty: **ENFORCE** *(RULED — Peter, 2026-09-19)*

**The evidence**: 0 subtask docs across 37 ticked subtasks in three consecutive specs (127: 0/14, 125-B: 0/21, 122: 0/5), against a live TCP duty; 127's Task 1 names the absence as the direct cause of four unrecorded application-time adaptations. Peter's ruling ground, quoted: *"if the agents and methods that are already fully informed of the expectations can't adhere to them, what chances do the agents without the context have?"*

**Proposed law**, in three parts — mandatory, light, and audited:

1. **TCP § "For SUBTASKS" step 2 gains the enforcement sentence**: *"This duty is enforced: the claims passes count subtask-doc presence per spec, and a ticked subtask without its doc is a **finding** on the authoring agent — not a counted observation."*
2. **The guide defines the subtask doc's floor, deliberately light** (so enforcement breeds records, not ritual): a compliant subtask doc is **three elements** — what changed (a sentence or two), the targeted tests run (command + result), and **any application-time adaptations made** (the element whose absence caused the recorded 127 loss; `none` is a valid entry and must be written). No summary doc, no criteria table, no ceremony at subtask grain.
3. **Stacy's counting block gains the row** (`canonical/agents/stacy.md`, carve-out PR + regeneration): subtask-doc presence, counted per spec; a missing doc is a finding routed to the authoring agent.

*Binding is forward from ratification — no backfill of the 37 (rider (c) discipline).*

### S-5 — Date boundaries in documented commands; correctness probes (1 instance: the owed-set F-1, repaired in PR #183)

**Proposed law** (PSP conventions §, documented-command authoring):

> A documented command embedding a date comparison SHALL pin its boundary explicitly (a bare date inherits the interpreter's defaulting behaviour — git approxidate resolves it to the **current time of day**). And a verification recipe SHALL distinguish its probes: **"it can return non-empty" is not "it returns the right set"** — a non-vacuity probe is not a correctness probe, and a recipe that ships with only the former says so.

### S-6 — Multi-homed byte-identical commands need an enumerated copy set (1 instance: the three-home pipeline repair)

**Proposed law** (PSP conventions §):

> A command maintained as byte-identical copies in multiple homes SHALL name the full copy set at each home, and a repair moves **all copies in one commit** with byte-equality re-verified and recorded. *(The owed-set pipeline already complies; this generalizes what its repair demonstrated.)*

### S-7 — Post-unit obligations name their verification surface (1 instance: the `rebuild_index` judgment call)

**Proposed law** (PSP conventions §, the post-unit-obligations convention):

> A post-unit obligation assigned to the claims passes SHALL name its verification surface; where that surface is gated behind the steward MCP verbs, it SHALL say so — the CLOSEOUT pilot resolved this correctly by the ambiguity-resolves-to-Stacy tiebreaker, and this sentence makes that resolution written law rather than judgment re-derived per pass.

---

## 3. Edit-site inventory (application scope; verbatim BEFORE→AFTER at application)

| Site | Items | Route |
|---|---|---|
| `governance/completion-documentation-guide.md` | S-1 (authoring note), S-3 (the named class), S-4 part 2 (the subtask-doc floor) | Peter-merged carve-out; MCP-served → `rebuild_index` post-merge |
| `governance/Process-Spec-Planning.md` § conventions | S-1 (law), S-2, S-5, S-6, S-7 | same |
| `.kiro/steering/Task-Completion-Protocol.md` | S-4 part 1 (the enforcement sentence) | carve-out; identity doc, not served |
| `canonical/agents/stacy.md` (+ regeneration, diff-guard) | S-4 part 3 (the counting row) | carve-out |

**No register rows change.** No checker code changes: `unreproducible-evidence` and subtask-doc presence are audit-side; any future mechanization of either is a separate, registered proposal.

## 4. Counter-argument on the record (AICP — the surviving residual)

**S-4 is the item with a real residual, stated so it is ratified with eyes open.** The corpus signal (0/37) is evidence the full-strength duty fights the grain of real work, and the 2026-07-05 workflow ballot relaxed subtask *commits* to judgment-based on similar evidence. Fold-back applied: the three-element floor above exists precisely to keep mandatory from meaning heavy. **What survives**: (a) enforcement-by-audit-finding will generate a steady finding stream against every active agent until habits change — that noise is the price of the ruling and should not be read, at the first few passes, as the convention failing; (b) a mandatory-but-light doc can still degrade into ritual stubs ("adaptations: none" written reflexively), which is the M4-shape at subtask grain — the claims passes should watch the `none`-rate on element 3 the way they watch declared-none rates. Peter ruled with the counter-argument presented; the ruling stands and this section is its honest record.

## 5. Ratification

*(Slot — on Peter's ratification this section gains `RATIFIED (Peter, <date>)`, the `Ratified-machine:` line, and the applied-edits inventory; the ballots-README entry is added in the same commit.)*
