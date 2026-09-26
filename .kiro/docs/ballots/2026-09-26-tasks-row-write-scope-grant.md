# Ballot Measure: A merged tasks.md assignment row grants write scope over its parent's Primary Artifacts

**Date**: 2026-09-26
**Drafted by**: Thurgood (Civitas steward)
**Status**: **RATIFIED (Peter, 2026-09-26)** — ruled at the Spec 123 tasks-round sitting. Record-first: **Peter's merge of this PR is the record act** (PR-atomic, per the Spec 127 law ballot § 15 precedent).
**Origin**: Spec 123 tasks round, R1 — Lina's blocking finding T-L3 (the spec-wide write-scope gap)
**Unit**: this branch, `chore/t1b-write-scope-ballot`, Peter-merged under the standing governance carve-out
**Reviewed**: the rule text was reviewed in the Spec 123 tasks round (six seats: Ada, Lina, Stacy, Leonardo, Kenya, Data). It was drafted there as tasks.md § "Slots" → T1-(B), and settled in PR #198 (`15010947`).

> **No `Ratified-machine:` line, deliberately** (the orchestrator-role ballot's reasoning, which holds here). The machine line is the Spec 127 law ballot's own mechanism, parsed by `completion-criteria-parity` for *that* law's in-force date. Reproducing it would create a second parseable record for a checker that reads exactly one.

---

## 1. The problem

The Spec 123 delegated-tier plan seats each parent with an owning agent. **Most of those parents edit paths outside the seated agent's declared charter write scope.**
- Lina's scope is `src/components/**` and `application-mcp-server/**`, yet her parents edit `src/cli/**`, `tools/agent-generator/**`, `scripts/**` and `docs/consumer/**`.
- Ada's scope covers `src/tokens/**` and the generators, yet her parents edit `src/cli/**`, `scripts/**` and `package.json`.
- Thurgood, Stacy and Leonardo are the same shape.

The charters say *"treat paths outside this set as read-only"*, and a relayed instruction is not a record. **As written, the seated agents must decline the work they are seated for, one at a time, at execution.** (Lina R1 T-L3, measured against each `.claude/agents/<a>.md` § "Write scope".)

This is not a 123 accident. **Any spec whose plan seats owners by domain, rather than by path, meets it.** That is the orchestrator-role rule's intended shape: owners author in their seat.

---

## 2. The standing rule (verbatim from the settled tasks.md § "Slots" → T1-(B))

> **STANDING RULE — tasks-row write-scope grant:**
> 1. **Extent.** A parent task's assignment row in a **merged** `tasks.md` grants write access to **exactly the paths enumerated in that parent's Primary Artifacts list**, and to nothing else.
> 2. **Who.** The grant covers the parent's PRIMARY agent **and every secondary agent named on the same row**. **A secondary's access rides the same row, under the same extent and duration.** Consulted agents named without a tier receive no grant.
> 3. **Duration.** The grant holds **on that unit's branch only**, and **expires when the unit merges**. It does not carry to `main`, to other branches, or to later units.
> 4. **Activation.** The grant is activated by **Peter's merge of the `tasks.md` that contains the row**. An unmerged row grants nothing.
> 5. **What it does not change.** The grant **adds to, never replaces**, the agent's charter write scope. **Charter write scopes are otherwise unchanged.** The grant **confers no ratification authority**: governance-law paths remain subject to record-first ballots and the Peter-merge carve-out.
> 6. **Audit.** Edits outside a parent's listed artifacts remain out of scope. **Claims passes audit edit paths against the list; a path outside it is a finding on the executing agent.**
> 7. **Trace.** A Primary Artifact must trace to the parent's requirements or design components. A listed path with no such trace is a tasks-round finding, so the list cannot be used to widen scope beyond the work.

**The same four substantive points, in short**:
- **(i)** A merged row grants the seated agent, and the named secondaries, write scope over exactly that parent's listed Primary Artifacts, on that unit's branch, expiring at the unit's merge (clauses 1–4).
- **(ii)** It is additive only: it conveys no ratification authority, leaves the governance carve-out intact, and leaves charter scopes otherwise unchanged (clause 5).
- **(iii)** An out-of-list edit is a claims-pass finding (clause 6).
- **(iv)** Every listed Primary Artifact must trace to requirements or design, or its listing is a tasks-round finding (clause 7).

---

## 3. Scope — why this is a ballot and not a spec artifact

- **General and standing.** It applies to **any spec's merged `tasks.md`**, not Spec 123 alone. That is what "standing" means, and why it is ratified here rather than living as a 123 artifact that would close with the spec.
- **"Unit"** carries its TCP meaning (§ "Coherent Units"): a declared merge unit, or, for a small spec that declares none, the spec's single unit and branch.
- **First application**: Spec 123's five declared units (U1–U5). Every seat in its § "Delegated-tier plan" writes under this rule.

---

## 4. Provenance and the fork

1. **The gap** — Lina R1 T-L3 (Spec 123 `feedback/tasks.md`), blocking, spec-wide, with every seat enumerated.
2. **The fork, as presented by the orchestrator at the sitting**:
   - **(A) — NOT TAKEN**: a record-first ballot widening each seated agent's **charter** write scope to the paths its 123 parents list (canonical charters regenerated).
     - **Its recorded counter**: *permanent scope for temporary work.* A charter widening outlives the unit that needed it, accumulates across specs, and is never narrowed. Charters would drift toward "everything", and the scope field would stop meaning anything.
   - **(B) — SELECTED**: this standing rule (Lina's lean).
3. **Peter's clarifying exchange**: the rule **grants authorization records, not scope self-expansion**. The grant exists only because a merged, reviewed, Peter-merged artifact enumerates it, per parent. No agent can widen its own scope, and the tasks author cannot activate a grant without Peter's merge.
4. **The ruling**: **(B)** — Peter, 2026-09-26.

---

## 5. Counter-argument (fold-back applied)

- **Folded in**:
  - activation is **Peter's merge**, not the tasks author's commit (clause 4);
  - the grant is **per-parent and enumerated**, never per-agent or glob-wide (clause 1);
  - it **expires by construction** (clause 3);
  - listings must **trace** to requirements or design, so the list cannot become a scope-widening instrument (clause 7).
- **What survives, stated plainly**:
  - **(1) The tasks author becomes a scope-granter outside the per-case ballot path.** It is knowingly accepted, and mitigated by activation at Peter's merge and by the tasks feedback round (six seats reviewed every assignment row in 123's first application).
  - **(2) Enforcement is post-merge.** A claims pass catches an out-of-list edit as a **finding**; it does not **prevent** it.
    - **Mechanization is named and not proposed**: the edit paths of a unit's PR, compared with the union of its parents' Primary Artifacts, is mechanically decidable, and could later become an emission in the style of `completion-criteria-parity`.
  - **(3) Primary Artifacts lists written as directory globs** (e.g. `canonical/profiles/consumer/**`) grant a directory. Clause 7's trace requirement and the tasks round are the check on over-broad globs. There is no mechanical one.

---

## 6. Edit sites (applied in this PR)

| Site | Change |
|---|---|
| This file | The ballot record (new) |
| `governance/classification-map.md` | New entry `tasks-row-write-scope-grant` (non-substring sweep: 29 live ids + this one, relations 0, dupes 0) |
| `.kiro/docs/ballots/README.md` § "Ballots on record" | Index entry |
| `.kiro/steering/Task-Completion-Protocol.md` § "Coherent Units" | **One pointer bullet** (§ 7) |
| `.kiro/specs/123-consumer-distribution/tasks.md` | **Erratum**: T1-(B)'s ratification vehicle is now **this standalone ballot**, not a section committed first on the U1 branch. Task 7.0 and the U1 start gate re-pointed to it (§ 8) |

**Rebuild**: `classification-map` is docs-MCP-served, so `rebuild_index` runs post-merge. TCP is an identity doc and not served.

---

## 7. The multi-homed judgment (S-6) — does TCP need a pointer?

**Yes: one pointer line.**
- **Why**: a seated agent reads its charter's `## Write scope` block, which says "read-only" outside its set, and TCP, which is always loaded and covers branch and unit mechanics. **Without a pointer where agents read about units, the grant is invisible at the moment it matters**, and the agent declines.
- **The law home stays single**: this ballot, with the register row's one-line `rule:` as its citable summary. **TCP carries a pointer, not a copy of the rule text.**
- **Copy set (S-6)**: none. S-6 governs **byte-identical copies** of a command, and this is a pointer that restates nothing operative beyond the one-sentence summary, which points here.
- The **charter** write-scope blocks are **not** edited (clause 5: charter scopes unchanged). That is deliberate: the grant is per-parent and temporary, and a charter line would read as permanent.

---

## 8. Cross-references

- **The pre-draft**: `.kiro/specs/123-consumer-distribution/tasks.md` § "Rulings from Peter — slots" → T1 (the standing-rule text and rationale), plus Task 7's B-U1 criterion. **B-U1 now cross-references this ballot** instead of carrying the section (erratum in this PR).
- **Instances this dissolves** (Spec 123, recorded as resolved):
  - **Task 18's `CHANGELOG.md` edit** (Lina's seat; a listed Primary Artifact).
  - **Prompt pinning for the persona runs** (Leonardo's seat). *The prompts were re-pinned into the spec directory anyway, at the tasks closing fold, so that instance was already inside his charter scope.* The rule now also covers `tests/onboarding-trio/**`, Task 25's listed protocol and fixtures.
  - Every seat Lina's T-L3 enumerated.
- **Related register rows**: `owned-artifact-authorship` (the seat rule this grant makes executable) and `delegated-tier-capture` (the fixed-form line whose referent is each parent's PRIMARY).
