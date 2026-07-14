---
id: classification-map
inclusion: manual
name: Classification Map
description: The per-rule classification-map register — each governance/design rule's boundary call (functional/operational/ideological), verification disposition + owner, and education disposition, recorded once and cited thereafter. Entries are stable, citable markdown headings with fenced-YAML machine-readable bodies.
aliases: classification map register, rule classification, boundary call, verification disposition, education disposition, enforcement ownership, which check verifies a rule, teacher or imposter, prune register, check-state facet, dormant check state
---

# Classification Map

**Date**: 2026-07-14
**Last Reviewed**: 2026-07-14
**Purpose**: The living register of per-rule classification decisions — boundary call, verification disposition + owner, and education disposition — so enforcement ownership is decided once and cited thereafter instead of re-litigated per agent, per prompt, per session
**Organization**: process-standard
**Scope**: cross-project
**Layer**: 2
**Relevant Tasks**: all-tasks

---

## About This Register

This is the **classification-map register**: one entry per governance/design rule, recording three decisions —

1. **Boundary call** — is the rule functional, operational, or ideological? (One-line rationale; scoped rows may carry per-scope rationale, since a surface-dependent boundary can require multiple realities stated at once.)
2. **Verification disposition + owner** — which check (if any) verifies the rule, at what strictness, and who owns that check.
3. **Education disposition** — what the education layer (docs MCP, skills, steering prose) keeps, authors, or prunes for this rule.

**Governing methodology**: Spec 125-B (Classification Map & Deferred Enforcement Layers), which formalizes the settled methodology of the Spec 125 design outline §2 — *"CI validates functional and operational requirements, never ideology; education and verification are complementary layers (strategy → tactics → validation loop)."* See `.kiro/specs/125-B-classification-map/` (requirements + design, merged) for the full procedure, including the two-bladed imposter test that guides per-surface education assessments.

**This is a LIVING register, not a one-time survey.** When a rule's classification changes, the entry is updated — never silently: every change is **dated and attributed** in the entry's `history` list (Req 1.5). Entries are superseded via `history`, never by renaming or deleting the entry heading.

---

## Addressing and Citation

**How to cite an entry** (from any spec, steering doc, crossRef, or agent):

```
governance/classification-map.md § "<entry-id>"
```

This is exactly the `path § "heading"` grammar that sweep-1 (`122-sweep-1-refs`) resolves and verifies mechanically — a citation in this format is platform-checkable.

**Entry-id rules:**

- An entry-id is a markdown `### <entry-id>` heading in the **Entries** section below. The heading text IS the identifier.
- Entry-ids are **kebab-case** (lowercase, hyphen-separated).
- Entry-ids are **NEVER renamed once cited.** A classification change is recorded in the entry's `history`; the heading is permanent. (A rename would silently break every external citation.)
- Entry-ids SHALL be **unique** within this register, **AND no entry-id may be a substring of another entry-id**.

**Why the non-substring rule** (record it so it never reads as pedantry): sweep-1 resolves `§ "heading"` citations against markdown heading lines by **verbatim substring match** (`tools/agent-generator/sweeps/common.ts:186`). If one id were a substring of another — e.g. `token-creation` alongside `token-creation-primitive` — a citation of the shorter id could **silently mis-resolve** against the longer heading and still report green. The non-substring constraint makes every citation unambiguous **by construction**, not by care.

Authors adding an entry MUST check both constraints against all existing entry-ids before landing the heading.

---

## Entry Schema

Every entry is a `### <entry-id>` heading followed by **one fenced YAML block** carrying the machine-readable fields. The schema (from 125-B design § Data Models):

**Top-level fields:**

| Field | Required | Content |
|-------|----------|---------|
| `rule` | yes | The rule itself, stated in one line |
| `boundary_call` | yes | `class` + `rationale` (see below) |
| `verification` | yes | `disposition`, `owner`, `check_state`, `checks`, optional `scope[]` (see below) |
| `education` | yes | `disposition` — what the education layer keeps/authors/prunes for this rule |
| `crossRef` | when applicable | The reciprocal half of any external cross-reference pointing at this entry (e.g. `canonical/shared/shared-catalog.yaml#<entry-id>`) |
| `history` | yes | List of `{ date, change, by }` — every classification change, dated and attributed |

**`boundary_call`:**

- `class`: `functional | operational | ideological`
- `rationale`: one line for scalar rows; rows with a `scope[]` qualifier MAY push per-surface rationale into the scope entries instead (a surface-dependent boundary can require multiple realities stated at once).

**`verification`:**

- `disposition`: `barrier | record-check | warn | none | scoped`
- `owner`: the agent who owns the verification decision/check for this rule
- `check_state`: `none | proposed | armed | dormant | retired`
  - **`dormant`** (the DORMANT state, Req 1.3) records an **armed, blocking check whose selection is empty or stale** — it runs and passes while verifying nothing. The corpus demonstrably produces this state; a register that cannot record it misrepresents the corpus.
- `checks`: list of the concrete check name(s), when armed (e.g. `["122-sweep-1-refs"]`)
- `scope[]`: **optional** per-surface qualifier — but **REQUIRED when the rule's boundary is surface-dependent** (for such rules a scalar disposition is not simplification, it is wrong). Entries without multi-surface needs stay scalar (the lens-not-columns guard). Each scope entry carries:
  - `surface`: the surface this line governs
  - `disposition`: `barrier | record-check | warn | none` (scalar dispositions only — never `scoped`)
  - `check_state` and `checks`: **per-scope** when scoped — "lint at consumption / no check at definition" must serialize per scope, not collapse into one top-level value
  - `rationale`: per-surface rationale line

**The `scoped` sentinel:** when `scope[]` is present, the top-level `disposition` SHALL be the sentinel value `scoped` — or omitted entirely (`scoped` is the documented default for scoped rows). **A scoped row has NO valid scalar top-level disposition**: writing `barrier` there falsely flags the definition layer; writing `none` there misses the consumption sites. The truth lives per-scope.

### Illustrative Example (documentation, NOT a register entry)

The following is schema documentation only. It is deliberately inside a fenced block AND its heading line is indented one space — because sweep-1's resolver matches heading lines by raw line-regex (`/^#{1,6}\s/`, `common.ts`) and is **not fence-aware**; the indent is what actually makes it un-resolvable, the fence is what makes it visually documentation. It **cannot be cited or resolved as a rule**. Do not copy its content as fact; copy its shape (and do NOT copy the indent into real entries).

````markdown
 ### example-rule-id

```yaml
rule: "a one-line statement of the rule"
boundary_call:
  class: operational            # functional | operational | ideological
  rationale: "one line (scalar rows); scoped rows may push rationale into scope[]"
verification:
  disposition: scoped           # barrier | record-check | warn | none | scoped
                                # scope[] present => top-level disposition is the
                                # sentinel `scoped` (or omitted — scoped is the default);
                                # a scoped row has NO valid scalar here
  owner: thurgood
  check_state: armed            # none | proposed | armed | dormant | retired
  checks: ["122-sweep-1-refs"]  # the concrete check(s), when armed
  scope:                        # OPTIONAL; REQUIRED when the boundary is surface-dependent
    - surface: "consumption sites"
      disposition: barrier
      check_state: proposed     # checks + check_state are PER-SCOPE when scoped
      checks: []
      rationale: "per-surface rationale"
    - surface: "definition layer + theme overrides"
      disposition: none         # literals-by-design
      rationale: "per-surface rationale"
education:
  disposition: "what the education layer keeps, authors, or prunes for this rule"
crossRef: "canonical/shared/shared-catalog.yaml#example-rule-id"   # reciprocal half, when applicable
history:
  - { date: 2026-07-14, change: "entry created", by: thurgood }
```
````

---

## Entries

<!-- Entries are added by 125-B Tasks 1.3/1.4 (pilot rows) and subsequent waves.
     Each entry: `### <entry-id>` heading (kebab-case, unique, non-substring — see
     Addressing and Citation above) + one fenced YAML block per the Entry Schema. -->

### record-first-ratification

```yaml
rule: "Governance-law changes require Peter's ratification — authority is verified against a committed record, never a relayed claim"
boundary_call:
  class: operational
  rationale: "Verifiable-record-vs-trusted-claim is an operational property of the workflow (origin: the 2026-07-05 relayed-authority incident — friction without protection); the boundary is surface-dependent, so per-scope realities are stated in scope[]"
verification:
  disposition: scoped
  owner: thurgood
  scope:
    - surface: "gated surfaces — governance-law paths behind the PR gate (governance/**, .kiro/steering/**, .kiro/docs/ballots/**, agent prompts/configs)"
      disposition: barrier
      check_state: proposed
      checks: []
      rationale: "PR-approval-as-ratification (branch protection + CODEOWNERS -> Peter) — delivered by 125-B U3; until it arms, the standing carve-out (Task-Completion-Protocol § The Merge Rule, :126) keeps these paths Peter-merged as the closest ratification proxy"
    - surface: "ungated artifacts — governance changes outside the PR gate's reach"
      disposition: record-check
      check_state: armed
      checks: ["record-first ballot-status verification (PROCEDURAL, per .kiro/docs/ballots/README.md § 'The Ratification Protocol (record-first)' — an agent-performed mechanical check, not a CI lane)"]
      rationale: "Layer 1, IN FORCE since 2026-07-05: apply only on a committed RATIFIED record; if the record is missing, report — never rubber-stamp a relayed claim and never refuse-and-stop on relay alone"
education:
  disposition: "KEEP all education surfaces — no imposters found (Exp 2, 2026-07-14): the ballots README teaches the protocol and the why; Task-Completion-Protocol teaches the gate-verifies-mechanics-not-authority boundary (:93, :125-126, :153); the canonical catalog statement (stated ONCE, canonical/shared/shared-catalog.yaml) propagates the agent-facing what+why into all 16 generated prompts via 122 auto-regen. RE-ASSESS the propagated statement's what-half when U3 arms the barrier for gated surfaces (the record-check remains operative for ungated artifacts regardless)."
crossRef: "canonical/shared/shared-catalog.yaml#record-first-ratification"
history:
  - { date: 2026-07-14, change: "entry created from Experiment 2 (authority-row resolution), U1 pilot — evidence: .kiro/specs/125-B-classification-map/completion/pilot/exp2-authority-row-record.md", by: thurgood }
```

### npm-test-before-complete

```yaml
rule: "Run the full validation suite before marking a task complete (the npm-test rule — the U1 pilot's prune-with-arm row)"
boundary_call:
  class: operational
  rationale: "Validation-before-completion is a workflow-ordering requirement; the artifact half (the suite itself passing) is functional and owned by the armed lanes — this row classifies the workflow imperative, not the suite"
verification:
  disposition: barrier
  owner: thurgood
  check_state: armed
  checks: ["the 125-A required-check set: root functional lane + both sub-package suite lanes + full typecheck + build:validate — suite-green gates every unit merge (armed 2026-07-10, proven per-lane)"]
education:
  disposition: "PILOT ROW — candidate prune PRODUCED (Task 1.4, 2026-07-14), NOT applied: imperative what-restatements at Task-Completion-Protocol :44/:45/:146 and Process-Development-Workflow step 2 rewritten to context/why in the candidate diff; KEEP the subtask targeted-tests instruction (no gate exists at subtask grain), ALL lane-selection teaching (single home: start-up-tasks §5), and the SEPARATELY-CLASSIFIED Jest-not-Vitest education (a distinct rule, provably untouched by the diff). Prune ratification = Task 2 (U1-p, ballot-gated, Peter-merged), gated on probe + trial evidence; the trial and window adjudicate whether the pruned imperatives were nags (map frame) or teaching (layered frame)."
history:
  - { date: 2026-07-14, change: "entry created from Experiment 1 classification (Task 1.4); per-surface assessments + candidate prune diff: .kiro/specs/125-B-classification-map/completion/pilot/pilot-row-assessment.md; prune candidate produced, not applied", by: thurgood }
```

### tool-boot-smoke

```yaml
rule: "Every tool declared in canonical/registry/tool-registry.json SHALL be listed (tools/list) and SHALL respond to a cheap empty-args call on its server — a listed-but-throws-on-invocation tool is caught at the gate, never returns-data asserted (Req 5)"
boundary_call:
  class: functional
  rationale: "A tool advertised in tools/list whose handler throws on invocation is a functional defect, not a style/workflow preference — barrier, nothing to prune (no prose predecessor; this is a net-new net-new check, not a reclassification of existing education)"
verification:
  disposition: barrier
  owner: thurgood
  check_state: armed
  checks: ["125B-tool-boot-smoke"]
education:
  disposition: "nothing to prune — no prose predecessor"
history:
  - { date: 2026-07-14, change: "entry created (U1-s pilot substrate, Task 1.6); check wired: .github/workflows/tool-boot-smoke.yml + tests/tool-boot-smoke.test.ts; local run 49/49 passing incl. Product MCP passing index-empty (Req 5.2); side-effect confirmation + gate-bite proof plan recorded in .kiro/specs/125-B-classification-map/completion/task-1-6-completion.md", by: thurgood }
```
