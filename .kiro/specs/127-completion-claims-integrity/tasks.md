# Implementation Plan: 127 — Completion-Claims Integrity

**Date**: 2026-09-19
**Spec**: 127 — Completion-Claims Integrity (the F7 disposition)
**Author**: Thurgood
**Status**: Tasks Phase — DRAFT, awaiting the tasks feedback round (the LENS seat's first firing)
**Criteria mode**: per-parent

> **Self-application note (design DD8)**: this `tasks.md` is authored pre-ratification and is therefore legacy by authorship date; the `**Criteria mode**: per-parent` declaration above is a **voluntary opt-in**. Every parent below carries decomposition-compliant, per-parent Success Criteria written to the convention this spec ships — the pilot (Req 8.7) audits exactly these criteria, and the checker's first live in-scope evaluation (Task 2's self-test criterion) runs against Task 1's completion doc.

---

## Declared Merge Units

| Unit | Parents | Gating parent | Midpoint carrier (specs ≥ 3 units) |
|---|---|---|---|
| **U1 — The law** | Task 1 | Task 1 | — |
| **U2 — The instrument** | Task 2 | Task 2 | **U2 (this unit's merge carries the midpoint claims pass)** |
| **U3 — The charters** | Task 3 | Task 3 | — |

**Order**: U1 → U2 → U3. U1 first because DD2's ratification-record mechanism reads the merged ballot and the law must exist before the instrument that reads it. U2 as midpoint carrier per the design's proposal: it is the middle unit, and the midpoint pass's **seat authority is the 2026-09-17 settle ballot (already ratified)** — U3 is text propagation, not authority creation, so the pass at U2's merge is fully chartered (design § Architecture, answering Stacy A-3). U3 last preserves Req 7.8's separability: if Q5 execution would delay anything, Q5 yields — the law and instrument never wait on the charters.

**Execution routes (the Req 6.1 route-naming duty — nothing defaults):**
- **All three units**: main-session execution on the unit branch (`task/127-u1-law`, `task/127-u2-checker`, `task/127-u3-charters`), branched from `main` after the prior unit's merge.
- **U1 and U3 are Peter-merged under the governance carve-out** (`governance/**`, `.kiro/steering/**`, `.kiro/docs/ballots/**`, `canonical/**`, agent prompts). U1 additionally follows record-first: the ballot's `RATIFIED` status + `Ratified-machine:` line are committed before the law edits apply (same PR, per the settle-ballot precedent).
- **U2** touches `scripts/**`, `package.json`, `.github/workflows/**` — outside both agents' writeScopes; route: main-session execution, ordinary required checks, Peter merges on green. The new CI job lands **non-required** (Req 6.6).
- **Stacy's fixture specifications** are authored by Stacy (subagent session) into `.kiro/specs/127-completion-claims-integrity/fixtures/` — inside her writeScope; the U2 build encodes them (design C7).
- `.kiro/issues/archive/**` (Task 1's F7 update): main-session on the U1 branch, same carve-out PR.

**Post-unit obligations (not tasks — verified by the claims pass, not by completion docs):**
- Post-U1 merge: docs-MCP `rebuild_index` (guide, PSP, PHP, classification-map — Req 12.8); post-U3 merge: `rebuild_index` if any served doc changed, plus the 122 regeneration's generated mirrors ride U3 itself.
- **At U2's merge: the MIDPOINT claims pass fires** (Stacy; population = Tasks 1–2's parents; hour-class, per the design's costing).
- **After U3's merge (127's final unit): CLOSEOUT fires — the pilot** (Req 8.7). The pilot record IS `completion/claims-pass.md`; its hand-done exact-set parity is M2-by-audit evidence toward guard (ii)'s N ≥ 5.
- **The arming is NOT in this plan** (Req 6.7; Q2's guarded deferral — decided at the 5.Z sitting or at release-prep start, whichever fires first). The A-2 accounting question (do Task 1's pre-ratification-authored parents count toward N ≥ 5?) **rides to that sitting** with the pilot's counted N.

---

## Tasks

- [ ] 1. Author and ratify the law (U1)

  **Type**: Documentation
  **Agent**: Thurgood (main session; Sonnet-tier subagents only for mechanical census re-derivation, verified in-session)

  - [ ] 1.1 Author the law ballot: rulings compiled by reference, the full before→after edit inventory (design C11's list), censuses as fenced commands + outputs (frozen recipes: the format census; the 36/37/39 reconciliation with delta memberships; the 9-file non-frozen enumeration; the materiality pattern set + its 153-file `--verify-extraction` result run from the design branch's spec), the recorded interpretations and quoting instructions (Req 12.4), the (d8) sentence, the M-baseline with recipes, and the `Ratified-machine:` line slot
  - [ ] 1.2 Apply the law edits per the inventory: guide subsection (design C8.1's full element list); PSP Tier 3 + the full-convention worked example (C8.2: registry case, ⚠️-with-link, grouped triple with the Method-honesty string, AV shapes, deferral form, neutrality line) + the conventions § (C8.3: units-block canonical form, structural limb as law, fallback tag, criteria-mode/declared-none/exemption/deferral/materially-amended definitions, flag-discipline guidance); TCP pointer ×2; RELEASE-FLOW step (C8.5 incl. the inheritance clause); PHP § Tier 2 (C8.6 incl. the revisit block with Leonardo's three questions); ballots-README entry; F7 update at the archived path
  - [ ] 1.3 Author the five register rows (design C10; owners per Req 5.2–5.6, `promised-artifact-exists` owner assigned at this ballot); run and record the live non-substring sweep (22+5, both directions)
  - [ ] 1.4 Run the straggler sweep per edit class with stated-matching outputs; request Stacy's REQUIRED ballot review; fold; submit for ratification (record-first; Peter's merge is the ratifying act)

  **Success Criteria:**
  - The ballot exists at its pinned path with `Status: RATIFIED (Peter, <date>)` and a `Ratified-machine: YYYY-MM-DD` line alone on its own line, parseable by the design C5 regex
  - Every edit site in the ballot's before→after inventory is applied, and each straggler-sweep command's recorded output matches its re-run output at submission
  - All five register rows parse as schema-valid YAML, carry dated+attributed history entries, and the recorded non-substring sweep output shows zero relations across all live + proposed ids in both directions
  - Every census in the ballot appears as a fenced command block with its output, and re-running each command at submission reproduces its recorded output
  - The guide subsection, PSP Tier-3 section, and PHP Tier-2 section each contain their design-C8 element list in full, verified by the per-element checklist in the completion doc citing line anchors
  - The worked example contains at least one ⚠️ row with a follow-up link, a grouped per-platform triple carrying `not re-verified — toolchain unavailable`, an `Artifact deferred:` declaration, and no Evidence cell containing activity prose
  - Stacy's ballot review is recorded in the ballot with every blocking finding dispositioned

  **Primary Artifacts:**
  - .kiro/docs/ballots/2026-09-XX-completion-claims-integrity.md
  - governance/completion-documentation-guide.md
  - governance/Process-Spec-Planning.md
  - governance/Product-Handoff-Protocol.md
  - governance/classification-map.md
  - .kiro/steering/Task-Completion-Protocol.md
  - .kiro/hooks/RELEASE-FLOW.md
  - .kiro/docs/ballots/README.md
  - .kiro/issues/archive/2026-09-12-spec-112-completion-claims-audit.md

- [ ] 2. Build and prove the instrument (U2)

  **Type**: Implementation
  **Agent**: Thurgood (main session; Sonnet-tier subagent may implement individual modules against design C1–C5 as settled contracts, verified in-session with placement checks)

  - [ ] 2.1 Implement `scripts/completion-claims/normalize.ts` (the four rules + bounded rule-(iii) scope + checkbox mask) with `normalize.test.ts`
  - [ ] 2.2 Implement `tasks-md.ts` and `completion-doc.ts` per design C2/C3 (all parent forms, declared-none, glob-family doc location, evidence-kind heuristic, fixed deferral/exemption forms, units-block precedence) with their suites
  - [ ] 2.3 Implement `materiality.ts` (generous extraction + canonical-form comparison + `--verify-extraction`) with its suite; run `--verify-extraction` over the corpus and record the digest
  - [ ] 2.4 Implement `verdict.ts` + the CLI (full-scan parity incl. AV gate-row parity, declared-none narrow waiver, doc-not-found emission, loud-failure strings verbatim from the design catalog, association manifest, emission contract, ratification-record loud-red) with its suite
  - [ ] 2.5 Wire `check:completion-criteria-parity` into `package.json` and the CI workflow (context name fixed, non-required)
  - [ ] 2.6 Receive Stacy's fixture specifications; encode each 1:1 with provenance headers; author `expected-classes.json`; `fixtures.test.ts` red-at-zero and red-below-floor verified by deliberate temporary manifest violation, recorded
  - [ ] 2.7 Full validation: `npm test` green; the checker's first live in-scope run — against 127's own Task-1 parent completion doc — green, output recorded

  **Success Criteria:**
  - `npm test` passes with the six new suites included in the functional lane
  - `npm run check:completion-criteria-parity` exits green on the corpus, its output containing the association manifest and the emission summary line, with 127's Task-1 doc evaluated as in-scope (the first live evaluation, output recorded in the completion doc)
  - Every class in `expected-classes.json` has at least one encoded fixture; every fixture carries a provenance header citing a spec file in `fixtures/`; `fixtures.test.ts` passes — and its red-at-zero behavior is demonstrated by a recorded temporary violation
  - The `--verify-extraction` digest over all 153 tasks.md files is recorded in the completion doc and matches the ballot's recorded result
  - Every loud-failure string emitted by the checker is string-equal to its design-catalog row, verified by the catalog-conformance test
  - The CI workflow exists with check context `completion-criteria-parity` and is not in any required-checks list or `EXPECTED_CONTEXTS`
  - Stacy's fixture set is delivered per Req 6.5 — or the completion doc records the escalation to Peter as a blocked deliverable (the forced-negative path, not a waiver)

  **Primary Artifacts:**
  - scripts/completion-claims/normalize.ts
  - scripts/completion-claims/tasks-md.ts
  - scripts/completion-claims/completion-doc.ts
  - scripts/completion-claims/materiality.ts
  - scripts/completion-claims/verdict.ts
  - scripts/check-completion-criteria-parity.ts
  - scripts/completion-claims/__fixtures__/ (encoded set + expected-classes.json)
  - scripts/completion-claims/__tests__/ (six suites)
  - .github/workflows/completion-criteria-parity.yml
  - package.json (modified)

- [ ] 3. Execute the charters (U3)

  **Type**: Documentation
  **Agent**: Thurgood (main session — canonical edits + regeneration; no delegation: generated-tree placement hazards are the recorded lesson)

  - [ ] 3.1 Apply the Stacy charter package to `canonical/agents/stacy.md` (Req 7.1–7.5: the cut, the § 11.4 superset table, the claims-pass template incl. the interim-owner clause and Req 8.8 sentence, the mirror clause verbatim, the carve-out with spelled-out falsification conditions, the owed-set pipeline in her command catalog, knowledgeBases + source tree + git history)
  - [ ] 3.2 Apply the Thurgood package to `canonical/agents/thurgood.md` (composed-loop duties, LIVENESS-as-query + the proposed-row read, the caller-out duty, the three Req 7.9 bounds) and update Agent-Directory via its canonical source
  - [ ] 3.3 Regenerate both trees; diff-guard green; verify the generated mirrors carry every new section verbatim

  **Success Criteria:**
  - `canonical/agents/stacy.md` contains the ratified charter cut, all rows of the § 11.4 superset trigger table with the Scope column's binding text, the mirror anti-rot clause string-equal to ballot § 16.2's quoted form, the three enumerated carve-out verbs with both falsification conditions spelled out, and the owed-set pipeline's four stages with enumerated exclusion classes
  - `canonical/agents/thurgood.md` contains the composed-loop duties, LIVENESS as a query, the proposed-row register read, and the three Req 7.9 bounds, each locatable by its ballot-quoted phrase
  - Agent-Directory's Stacy and Thurgood rows state the post-Q5 charters consistently with the canonical texts
  - `npx tsx tools/agent-generator/diff-guard.ts` reports green on the branch, and each new charter section appears verbatim in both generated mirrors (`.claude/agents/`, `.kiro/agents/`)
  - The claims-pass template in the charter text contains the Method fraction clause, the per-row per-platform honesty string, the `Standards implications:` line, and the never-a-gate sentence

  **Primary Artifacts:**
  - canonical/agents/stacy.md
  - canonical/agents/thurgood.md
  - canonical/agents/ (Agent-Directory canonical source)
  - .claude/agents/ + .kiro/agents/ (regenerated — never hand-edited)
  - canonical/generated.lock

---

## What this plan deliberately does not contain

- **The arming** (Req 6.7 — Q2's guards; the 5.Z sitting or release-prep start decides). `EXPECTED_CONTEXTS` is untouched until then.
- **The claims passes** (MIDPOINT at U2's merge, the CLOSEOUT pilot after U3) — post-acceptance audits, never tasks, never gates (Req 8.8).
- **Backfill of anything** (rider (c)); the O-3/triage/walk chores (done, ##171/173/174); the AICP amendment (done, #176/#177).
