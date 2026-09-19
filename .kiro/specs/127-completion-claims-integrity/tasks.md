# Implementation Plan: 127 — Completion-Claims Integrity

**Date**: 2026-09-19
**Spec**: 127 — Completion-Claims Integrity (the F7 disposition)
**Author**: Thurgood
**Status**: Tasks Phase — R1 incorporated (2026-09-19; the LENS's first firing — 8 blocking + 16 advisory, all dispositioned; `feedback/tasks.md`)
**Criteria mode**: per-parent

> **Self-application note (design DD8)**: this `tasks.md` is authored pre-ratification and is therefore legacy by authorship date; the declaration above is a **voluntary opt-in**. Every parent carries per-parent Success Criteria written to the convention this spec ships — **placed immediately after the parent line, before its subtasks, per the ruled association rule** (Req 2.4.1; corrected at the tasks round: the LENS's BLOCKING-1 caught this file associating its own criteria to subtasks). The pilot audits exactly these criteria; the checker's first live in-scope evaluation runs against Task 1's completion doc.

---

## Declared Merge Units

| Unit | Parents | Gating parent | Midpoint carrier (specs ≥ 3 units) |
|---|---|---|---|
| **U1 — The law** | Task 1 | Task 1 | — |
| **U2 — The instrument** | Task 2 | Task 2 | **U2 (this unit's merge carries the midpoint claims pass)** |
| **U3 — The charters** | Task 3 | Task 3 | — |

**Order**: U1 → U2 → U3. U1 first (DD2's ratification-record mechanism reads the merged ballot). U2 as midpoint carrier: the seat's authority is the **2026-09-17 settle ballot, already ratified** — U3 is text propagation, not authority creation (design § Architecture; accepted by Stacy at the tasks round with both A-3 silences discharged). U3 last preserves Req 7.8's separability. **The MIDPOINT record's path is `completion/claims-pass-midpoint.md`** — named here because the ruled owed-set predicate keys on `completion/claims-pass.md` *exactly*, and a midpoint record at that path would silently discharge `closeout-owed(127)` (Stacy BLOCKING-6, the mechanism's first-instance collision; the distinct filename resolves it without touching the ruled predicate, and U3's charter text documents the convention for every future carrier spec). At U2's merge the template's authoritative home is not yet charter text — the pass runs against Req 8.3 + design C9 as merged spec documents (Stacy A-14, accepted as the order's named price).

**Execution routes (the Req 6.1 route-naming duty — nothing defaults):**
- **All three units**: main-session execution on the unit branch (`task/127-u1-law`, `task/127-u2-checker`, `task/127-u3-charters`), branched from `main` after the prior unit's merge.
- **U1 and U3 are Peter-merged under the governance carve-out** (`governance/**`, `.kiro/steering/**`, `.kiro/docs/ballots/**`, `.kiro/hooks/**`, `canonical/**`, agent prompts — enumeration completed per Stacy A-13). U1 follows record-first: `RATIFIED` status + the `Ratified-machine:` line committed before the law edits apply, same PR. **If Peter's merge lands on a different date than the recorded one, U2's first commit corrects the machine line as a record-accuracy erratum, Peter-merged with U2** (Stacy A-7 — the in-force date is the merge's date; the recorded date is a prediction reconciled at first divergence).
- **U2** touches `scripts/**`, `package.json`, `.github/workflows/**`: main-session, ordinary required checks, Peter merges on green. The new CI job lands **non-required** (Req 6.6).
- **Stacy's fixture specifications**: authored by Stacy (subagent session) into `.kiro/specs/127-completion-claims-integrity/fixtures/` (her writeScope), **invoked at U2's start as the unit's first act** so authoring proceeds in parallel with 2.1–2.5 (Stacy A-11 — the invocation is scheduled, not assumed).
- `.kiro/steering/Agent-Directory.md` is a **hand-maintained identity doc with no canonical source** (Stacy BLOCKING-8, verified) — edited directly on the U3 branch, covered by the `.kiro/steering/**` carve-out.
- `.kiro/issues/archive/**` (Task 1's F7 update): main-session on the U1 branch, same carve-out PR.

**Post-unit obligations (not tasks — verified by the claims passes, not completion docs):**
- Post-U1 merge: docs-MCP `rebuild_index` (guide, PSP, PHP, classification-map — Req 12.8); post-U3: `rebuild_index` if any served doc changed.
- **At U2's merge: the MIDPOINT pass** (Stacy; `completion/claims-pass-midpoint.md`; population = Tasks 1–2's parents; hour-class).
- **After U3's merge: CLOSEOUT — the pilot** (Req 8.7; `completion/claims-pass.md`). Its hand-done parity is M2-by-audit evidence toward guard (ii)'s N ≥ 5 — **counted, not assumed** (the A-2 accounting question rides to the 5.Z sitting with the counted N), and **the pilot's composition bound rides with it** (Stacy A-12: 127 has zero platform-spanning claims, so the pilot cannot exercise the decomposition limb; its empty decomposition counts are absence-of-instances, not evidence of adoption).
- **The arming is NOT in this plan** (Req 6.7; Q2's guards). **Gate-bite rides with the arming** (Stacy BLOCKING-7's disposition): proven red on a throwaway PR at the flip, cited on the register row then — the U1 rows ship `check_state: proposed` with a history note recording gate-bite as outstanding-at-arming.

---

## Tasks

- [ ] 1. Author and ratify the law (U1)

  **Type**: Documentation
  **Agent**: Thurgood (main session; Sonnet-tier subagents only for mechanical census re-derivation, verified in-session)

  **Success Criteria:**
  - The ballot exists at its pinned path with `Status: RATIFIED (Peter, <date>)` and a `Ratified-machine: YYYY-MM-DD` line alone on its own line, parseable by the design C5 regex
  - The ballot's before→after inventory is **diff-checked against design C11's site list** (the sweep includes an inventory-completeness comparison — Stacy A-2), every listed site is applied, and each straggler-sweep command's recorded output matches its re-run output at submission
  - All five register rows parse under a quoted one-line YAML-parse command and pass a per-field checklist against the register's Entry Schema § (Stacy A-8 — no schema validator exists; inspection is stated as inspection, the parse as a command); each row carries dated+attributed history including the gate-bite-outstanding note; the recorded non-substring sweep output shows zero relations across all live + proposed ids in both directions
  - Every census in the ballot appears as a fenced command block with its output, re-running each at submission reproduces it — including the **materiality-extraction verification as frozen-recipe commands**: per-pattern-class match counts over all 153 `tasks.md`, quoted commands + outputs (Stacy BLOCKING-2's disposition: the U1 verification is a documented pipeline in the ballot's own census form, no unrouted instrument; U2's `--verify-extraction` later reproduces these counts programmatically as a stated cross-implementation check)
  - The guide subsection contains every design-C8.1 element, the PSP Tier-3 section every C8.2 element, and the PHP Tier-2 section every C8.6 element — verified by the completion doc's per-element checklist **enumerated from the design's C8 lists** (the stable denominator — Stacy A-3) with line anchors
  - The PSP conventions § contains every design-C8.3 element — **including Req 2.6.1's structural limb stated as law, the `(platforms: …)` fallback with its counting note, and the canonical units-block form** (Stacy BLOCKING-4)
  - The TCP "Create completion doc" bullets in **both** parent sequences carry the exact ruled pointer sentence (Stacy BLOCKING-4)
  - The RELEASE-FLOW step contains both named lines, the promotion ladder with named detectors, **and Req 11.3's inheritance clause in full** (Stacy BLOCKING-4)
  - The ballots-README "Ballots on record" entry exists, and the F7 section at the archived path reads addressed-by-Spec-127 with the closing condition stated (Stacy BLOCKING-4)
  - The worked example contains at least one ⚠️ row with a follow-up link
  - The worked example contains a grouped per-platform triple carrying `not re-verified — toolchain unavailable`
  - The worked example contains an `Artifact deferred:` declaration and an AV gate-condition row
  - No Evidence cell in the worked example contains activity prose
  - **127's own Declared Merge Units block conforms to the canonical form as shipped in the conventions §**, re-verified after that § is authored and corrected in the same commit if divergent (Stacy A-16)
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

  - [ ] 1.1 Author the law ballot: rulings compiled by reference; the full before→after inventory (design C11); censuses as fenced commands + outputs, **including the per-pattern-class extraction-verification recipes**; the recorded interpretations and quoting instructions (Req 12.4); the (d8) sentence; the M-baseline with recipes; the `Ratified-machine:` line slot
  - [ ] 1.2 Apply the law edits per the inventory: guide subsection (C8.1); PSP Tier 3 + worked example (C8.2) + conventions § (C8.3); TCP pointer ×2 (C8.4); RELEASE-FLOW step (C8.5); PHP § Tier 2 incl. the revisit block (C8.6); ballots-README entry; F7 update at the archived path; **then re-verify this file's own units block against the shipped canonical form**
  - [ ] 1.3 Author the five register rows (C10; owners per Req 5.2–5.6; `promised-artifact-exists`'s owner assigned at this ballot; the gate-bite-outstanding history note on the parity row); run and record the live non-substring sweep
  - [ ] 1.4 Run the straggler sweep per edit class with stated-matching outputs **plus the C11-inventory diff check**; request Stacy's REQUIRED ballot review; fold; submit for ratification (record-first; Peter's merge is the ratifying act)

- [ ] 2. Build and prove the instrument (U2)

  **Type**: Implementation
  **Agent**: Thurgood (main session; Sonnet-tier subagent may implement individual modules against design C1–C5 as settled contracts, verified in-session with placement checks)

  **Success Criteria:**
  - `npm test` passes with the six new suites in the functional lane (the loud-string catalog-conformance cases live **inside `verdict.test.ts`** — Stacy A-9's disambiguation)
  - `npm run check:completion-criteria-parity` exits green with 127's Task-1 doc evaluated as in-scope, output (association manifest + emission summary) recorded — **a self-consistency check; the falsification load is carried by the fixture suite** (Stacy A-6's framing correction)
  - The CI run on the U2 PR itself is green over the full population **including this parent's own completion doc**, checked before submission (Stacy A-10 — the recorded 2.7 run and the gate run evaluate different populations; both must be green)
  - Every class in `expected-classes.json` has at least one encoded fixture; every fixture carries a provenance header citing a spec file in `fixtures/`; `fixtures.test.ts` passes — and **the floor's red-at-zero behavior is itself asserted by a standing unit test** (the floor logic run against an empty set expects failure — Stacy A-5: reconstructible from the shipped tree, not a transient demonstration)
  - The `--verify-extraction` digest over the corpus is recorded in the completion doc and **reconciled against the ballot's per-class counts — every difference attributed to enumerated corpus changes in the U1→U2 interval, never to extraction behavior** (Stacy BLOCKING-3: the design ruled the corpus moves; reconciled-with-attribution is the falsifiable form of a match the design declined to assert)
  - Every loud-failure string emitted by the checker is string-equal to its design-catalog row
  - The CI workflow exists with check context `completion-criteria-parity` and is **not** in any required-checks list or `EXPECTED_CONTEXTS`
  - Stacy's fixture set is delivered per Req 6.5 — reviewed on-branch **with the ruled contest path exercised or waived-by-no-contest recorded** (Thurgood may contest a fixture as out-of-scope for the rule as authored; Peter arbitrates; a fixture that disappears from the set is the failure — Stacy A-11) — or the completion doc records the escalation to Peter as a blocked deliverable (the forced-negative path)

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

  - [ ] 2.1 **Invoke Stacy's fixture-specification authoring** (the unit's first act — her specs land in `fixtures/` in parallel with the build); implement `normalize.ts` (four rules + bounded rule-(iii) scope + checkbox mask) with `normalize.test.ts`
  - [ ] 2.2 Implement `tasks-md.ts` and `completion-doc.ts` per design C2/C3 with their suites
  - [ ] 2.3 Implement `materiality.ts` (+ `--verify-extraction`) with its suite; run over the corpus; reconcile against the ballot's per-class counts with differences attributed
  - [ ] 2.4 Implement `verdict.ts` + the CLI (full-scan parity incl. AV gate-row parity, declared-none narrow waiver, doc-not-found emission, catalog strings verbatim, association manifest, emission contract, ratification-record loud-red) with its suite incl. the catalog-conformance cases
  - [ ] 2.5 Wire `check:completion-criteria-parity` into `package.json` and the CI workflow (context name fixed, non-required)
  - [ ] 2.6 Review Stacy's fixture specs on-branch (contest path available per Req 6.5); encode 1:1 with provenance headers; author `expected-classes.json`; verify the floor's standing red-at-zero test
  - [ ] 2.7 Full validation: `npm test` green; the first live in-scope run recorded; the U2 PR's own CI run green over the full population

- [ ] 3. Execute the charters (U3)

  **Type**: Documentation
  **Agent**: Thurgood (main session — canonical edits + regeneration; no delegation: generated-tree placement hazards are the recorded lesson)

  **Success Criteria:**
  - `canonical/agents/stacy.md` contains the ratified charter cut (the § 11.1 dividing-verb text)
  - `canonical/agents/stacy.md` contains all rows of the § 11.4 superset trigger table with the Scope column's binding text
  - `canonical/agents/stacy.md` contains the mirror anti-rot clause string-equal to ballot § 16.2's quoted form
  - `canonical/agents/stacy.md` contains the three enumerated carve-out verbs with both falsification conditions spelled out
  - `canonical/agents/stacy.md` contains the owed-set pipeline's four stages with enumerated exclusion classes, **and the MIDPOINT record-path convention (`claims-pass-midpoint.md`, never `claims-pass.md`)**
  - The claims-pass template in her charter text contains the full design-C9 element list: Scope/Findings/Method with the fraction clause, the per-row per-platform honesty string, the `Standards implications:` line, **the counting block in full (omissions, vagueness, none-rates, exemption-string usage, bundled/incomplete-decomposition instances, fallback invocations, M3/M4/M5), the report-set comparison, the emission-reading duty with its interim-owner clause verbatim, the deferral walk-back, and Req 8.8's never-a-gate sentence** (Stacy BLOCKING-5)
  - `canonical/agents/thurgood.md` contains the composed-loop duties, LIVENESS as a query **with the owed-set pipeline verbatim in the health-check item**, the proposed-row register read, **Thurgood's own anti-rot clause verbatim (check that an audit happened, never re-decide what it concluded), the remediation route's explicit-message clause (never only a file in a spec directory)**, the caller-out duty, and the three Req 7.9 bounds (Stacy BLOCKING-5)
  - `.kiro/steering/Agent-Directory.md`'s Stacy and Thurgood sections contain the § 11.1 charter-cut sentences, and a grep for the superseded pre-Q5 ownership phrasings returns zero matches (Stacy BLOCKING-8 + A-4: the mechanical form of "consistent")
  - `npx tsx tools/agent-generator/diff-guard.ts` reports green on the branch, and each new charter section appears verbatim in both generated mirrors
  - `npm test` is green at parent completion — **the generator suites read canonical inputs, and diff-guard alone does not run them** (Stacy A-15: "met" and "mergeable" must not diverge)

  **Primary Artifacts:**
  - canonical/agents/stacy.md
  - canonical/agents/thurgood.md
  - .kiro/steering/Agent-Directory.md (direct-edit — no canonical source exists)
  - .claude/agents/ + .kiro/agents/ (regenerated — never hand-edited)
  - canonical/generated.lock

  - [ ] 3.1 Apply the Stacy charter package to `canonical/agents/stacy.md` (Req 7.1–7.5 + the full C9 template incl. the BLOCKING-5 elements + the midpoint record-path convention + knowledgeBases + command catalog)
  - [ ] 3.2 Apply the Thurgood package to `canonical/agents/thurgood.md` (composed loop, LIVENESS-as-query with the pipeline, proposed-row read, both anti-rot clauses, remediation route, Req 7.9 bounds); update `.kiro/steering/Agent-Directory.md` **directly** (hand-maintained identity doc)
  - [ ] 3.3 Regenerate both trees; diff-guard green; verify mirrors verbatim; `npm test` full validation

---

## What this plan deliberately does not contain

- **The arming** (Req 6.7 — Q2's guards; the 5.Z sitting or release-prep start decides). `EXPECTED_CONTEXTS` untouched until then. **Gate-bite rides with the arming** (Req 6.4/6.6; Stacy BLOCKING-7's disposition — proven at the flip, cited on the register row then; the rows ship with the outstanding-note).
- **The claims passes** (MIDPOINT at U2's merge → `claims-pass-midpoint.md`; the CLOSEOUT pilot after U3 → `claims-pass.md`) — post-acceptance audits, never tasks, never gates (Req 8.8).
- **Backfill of anything** (rider (c)); the O-3/triage/walk chores (done, ##171/173/174); the AICP amendment (done, #176/#177).
