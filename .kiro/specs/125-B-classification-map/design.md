# Design Document: 125-B — Classification Map & Deferred Enforcement Layers

**Date**: 2026-07-13
**Spec**: 125-B — Classification Map & Deferred Enforcement Layers
**Status**: Design Phase
**Dependencies**: Spec 125-A (shipped substrate); Spec 122 (complete — generator at `tools/agent-generator/`, manifest, canonical source); requirements.md (17 requirements, settled on main, PR #72)

---

## Overview

This design realizes the 17 settled requirements: the classification-map register as a concrete artifact, the U1 pilot's end-to-end workflow (measurement protocol → probe → trial → prune PR → observation window), the three checks (tool-boot smoke, WCAG re-arm + validation-criteria promotion, console-fail allowlist), the closeout record, and charter-grain sketches for U1b/U3. **Requirements are settled; this document decides HOW, never re-opens WHAT.** Every element carries its requirement trace.

Four decisions the requirements explicitly deferred to this phase are resolved in § Design Decisions (DD1–DD4), each with rationale and the verification that grounds it. Verify-first discipline: every system-state claim below was checked against source on 2026-07-13; citations inline.

---

## Architecture

```
canonical/registry/classification-map.md          ← THE REGISTER (DD1)
        │  entries = markdown headings (sweep-resolvable) + fenced YAML (machine-readable)
        │
        ├── consumed by 122's generator pipeline (soft coupling — auto-regen)
        ├── crossRef target for canonical/shared/shared-catalog.yaml (Req 4)
        │
U1 pilot (first subtask, inside the spec dir)
   1. measurement-protocol.md  (rubric + criteria + window definition — Req 8.1)
   2. probe: A/B scenario → probe-evidence file           (Req 6)
   3. trial: cloned agent, 2 arms → scored diff table     (Req 7)
   4. prune PR (ballot-gated, 3 surfaces, evidence attached)
   5. observation window (N=20, manual queries)           (Req 8)
   6. closeout record → gates U1b                         (Req 17, 10.1)

CI (required checks, 125-A substrate):
   tool-boot-smoke  (new lane — Req 5)
   WCAG re-arm + validation promotion (edits to the existing functional lane — Req 12)
   console-fail (jest setup hook + allowlist — Req 11)
```

---

## Components and Interfaces

### C1. The Classification-Map Register (Req 1, 4)

**Artifact**: `canonical/registry/classification-map.md` (DD1 — format rationale there).

**Shape**: one markdown file; a header section documenting entry addressing + citation format (Req 1.6); then one `### <entry-id>` heading per rule, each followed by a fenced YAML block carrying the machine-readable fields (schema in § Data Models). The heading text IS the stable entry id (Req 1.4) — kebab-case, never renamed (supersede via `history`, Req 1.5).

**Entry citation format** (documented in the register header): `canonical/registry/classification-map.md § "<entry-id>"` — exactly the `path § "heading"` grammar sweep-1's resolver verifies (verified: `tools/agent-generator/sweeps/common.ts:176` resolves markdown headings by verbatim substring).

**crossRef re-point (Req 4)**: `shared-catalog.yaml`'s `crossRef` becomes `canonical/registry/classification-map.md § "record-first-ratification"`; `crossRefStatus: interim` + `crossRefResolveWhen` removed. The reciprocal half: the register entry's YAML carries `crossRef: canonical/shared/shared-catalog.yaml` + the entry id. Sweep-1 verifies the forward ref mechanically post-merge (Req 4.4).

**122 consumption**: the generator reads canonical sources; a register row that reclassifies a rule is an ordinary canonical-source edit + regeneration — no new interface (soft coupling preserved).

### C2. U1 Pilot Execution (Reqs 2, 6, 7, 8, 9, 17)

**First-subtask sequence** (Req 8.1 ordering made concrete):

1. **Author** `completion/pilot/measurement-protocol.md`: the mechanical rubric (workflow actions scored present/absent — for the npm-test rule: *ran full validation before completion claim; referenced the gate as the reason; validated locally before push*), the pre-committed difference criteria, and the window definition (N=20; metrics; data source; staleness bound; the "observed PR" definition — see § Data Models).
2. **Classify**: register entry for the npm-test rule; per-surface teacher/imposter assessments with recorded blade verdicts (Req 2.2) — the three surfaces: `start-up-tasks.md`, `Task-Completion-Protocol.md`, the ambient workflow doc (`canonical/` source for the generated ambient — located during execution and enumerated in the assessment).
3. **Probe** (Req 6): scenario sourced per Req 7.2; two contexts (pruned candidate vs. current); verdict scored against the rubric → `completion/pilot/probe-evidence.md` (OB-7 pattern — verified shape: Date/Purpose header, "What was tested," per-target results; `.kiro/specs/122-agent-generator/cutover/ob7-probe-evidence.md`).
4. **Trial** (Req 7): design below (C3).
5. **Prune PR**: single ballot-gated governance-law PR editing all three surfaces (rule-grain, Req 2.3); probe + trial artifacts attached; Peter merges (standing carve-out).
6. **Window** (Req 8): manual queries per C4; closes at N=20 observed PRs.
7. **Closeout** (Req 17): C5.

**The three-surface prune design** (Req 2): per-surface, per-clause edits guided by the recorded assessments — imperative what-restatements ("run `npm test` before marking complete" as instruction) pruned; teaching (WHY the gate exists, lane-selection guidance, Jest-not-Vitest education) retained; clause-grain cuts each carry a two-blade justification in the assessment record. The candidate diff is produced BEFORE ratification so the probe/trial can consume the pruned variant (Req 6.3, 7.1).

### C3. The Cloned-Agent Trial (Req 7, 9)

**Mechanics — all inside the spec dir, no standing tooling (Req 8.6, 9.3):**

- **Arms**: two git worktrees — `trial-control` (current main) and `trial-pruned` (main + the candidate prune diff applied). Worktrees are disposable; removed at trial end.
- **Total context substitution (Req 7.1), three legs**:
  1. *Worktree steering files*: the pruned diff applied in `trial-pruned` — inherent to the worktree.
  2. *Generated prompt*: run 122's generator (`tools/agent-generator/generate.ts`) inside the pruned worktree so the prompt/CLAUDE.md surface regenerates from pruned canonical sources.
  3. *MCP index*: the docs MCP instance launched for a session in the pruned worktree indexes THAT worktree's corpus; `rebuild_index` invoked at session start to force freshness.
  - **Verification before each run** (Req 7.1 "verified before the run"): grep the pruned text across all three delivery surfaces in the trial worktree — zero hits required; recorded in the evidence file.
  - **Pre-authorized fallback** (if the MCP-index leg proves costly in practice): run with pruned files + pruned prompt only, and **record the MCP leak explicitly in the evidence artifact** — the trial remains valid as a weaker measurement with the leak named, per the coordinator-relayed authorization; the closeout notes it.
- **Agent invocation**: the trial agent is a cloned session launched in the arm's worktree with the arm's generated prompt; battery task issued as an ordinary task instruction. Transcript captured to `completion/pilot/trial-transcripts/` (retained unedited — Req 7.6).
- **Scoring**: rubric applied to each transcript — actions present/absent → the scored diff table (`completion/pilot/trial-diff-table.md`). Paired runs, ≤2 per arm per task, ≤20 transcripts total (Req 9.2).
- **Battery**: 3–5 queued real small tasks (Spec 126 candidate); relevance gate = control-arm transcript exhibits the rubric's target actions (Req 7.3, ratified); synthetic replay fallback triggered by relevance failure.
- **Ethics (Req 7.6)**: ordinary-work tasks only; protocol + results in the spec record; transcripts treated as work product.

### C4. Observation Window Measurement (Req 8)

Manual/query-only (Req 8.6): first-push failure rate via `gh pr list` + `gh api` check-run queries against the N=20 observed PRs; re-accretion scan via `git log -p` / grep over the three pruned surfaces; allowlist churn (once Req 11 arms) counted from allowlist-file diff history. Each query documented in the measurement protocol so it is repeatable by hand. Wall-clock span recorded as a datum (Req 8.7). Staleness: any merge touching the three surfaces (or a 122 regen affecting them) triggers re-baseline (Req 8.4); material-change-event frequency tallied for Req 10.6(c).

**"Observed PR" defined** (design resolution of a requirements silence — flagged in the report): a PR *opened* after the prune merges, counted at open; its first-push check outcome computed when its first check run completes. N=20 such PRs closes the window.

### C5. The Closeout Record (Req 17)

`completion/pilot/u1-closeout.md` + the standard parent-task summary doc (existing completion-doc conventions, Req 17.3). Five mandatory sections mirroring Req 17.1's contract: Window Findings (per-criterion met/unmet/indeterminate); Methodology Amendments (or "none"); At-Scale Window Parameters (N-per-wave, overlap/serialization policy, grounded in the wall-clock datum + material-change frequency + the 10.6(b) analytic answer); Dial Decision Point; Return-Edge First-Exercise Note. U1b's entry gate checks this file against that section list (Req 10.1).

### C6. Tool-Boot Smoke (Req 5)

A CI job (new required check, `125B-tool-boot-smoke`) + a script confined to the check's own workflow: for each server in `canonical/registry/tool-registry.json` (verified present), boot the server from compiled output, perform the MCP handshake, call `tools/list`, and assert every registry-declared tool name for that server appears. **"Responds" = server boots + lists the declared tool** — no tool is invoked with arguments and NO assertion touches returned data (Req 5.2, normative: a declared-but-index-empty tool passes because listing ≠ querying). Selection floor: zero tools parsed from the manifest → FAIL (Req 5.3). Arming proof: one deliberate gate-bite PR (mangle a tool name, observe BLOCKED, revert — the 125-A pattern, Req 5.4). *Design interpretation flagged: "responds to a cheap call" realized as handshake + `tools/list` presence rather than per-tool invocation — invocation requires per-tool arguments and would couple the smoke to tool schemas; list-presence is the cheapest true "declared and responds."*

### C7. WCAG Re-arm + Validation Promotion (Req 12)

**Re-arm** (`behavioral-contract-validation.test.ts:325–350`, verified: hardcoded six-name array, exact `.includes` match): replace the array with an allowlist matcher supporting the two forms in Req 12.2 — exact names (`interaction_focusable`, `interaction_focus_ring`, `state_disabled`, `state_error`) and **prefix wildcards** (`accessibility_*`, `content_*_label` → prefix `accessibility_` / pattern `content_*_label` as prefix+suffix match). Audit-before-arm (Req 12.3): a one-off audit pass (run inside the U2 task, output = an adjudication table in the spec dir) enumerating on-allowlist contracts and their `wcag` state; nulls adjudicated with Lina; fixes/exemptions land in the same PR as the re-arm. **Match floor (DD3)**: aggregate floor PLUS per-literal presence (each of the four exact names must match ≥1 contract; wildcards aggregate-only) — rationale in DD3. **Validation promotion (Req 12.6)**: `:435` assertion flips from `toBeGreaterThan(0)` to `withoutValidation === 0` after the inventory pass; inherited-contract skip preserved; exemption mechanism per DD4 (none — fix-all/escalate). Implementation Lina's; this section is the mechanism spec she implements against.

### C8. Console-Fail Allowlist (Req 11)

A jest setup hook (in the existing test-setup surface, functional lanes) that captures console output per suite and fails on non-allowlisted output. **Allowlist storage**: one checked-in file, `src/__tests__/console-allowlist.json` — an array of `{ suite: "<test-file path or describe-scope>", pattern: "<regex or literal>" , reason: "<one line>" }` entries (the suite × message-pattern grain, Req 11.1). **Churn counting** (Req 11.3): entries-added-per-PR = additions to this file per PR, countable by `git log -p -- src/__tests__/console-allowlist.json` — manual query, consistent with Req 8.6. Seeded from the PR #39 adjudications; the jsdom stylesheet-limitation doc addition folds into the seeding task. Promotion (making the hook fail rather than warn) follows the allowlist landing, per Req 11.2.

### C9. U1b / U3 (charter-grain sketches)

- **U1b** (Req 10): waves executed with the C2 pipeline per wave (register rows → probe → trial → prune PR → window per the closeout-set at-scale parameters). No new machinery — the pilot's protocol documents are the wave template. Wave PRs declare rule count + sizing rationale in the PR body (Req 10.4).
- **U3** (Req 13): CODEOWNERS file mapping the four governance-law path groups to Peter; branch protection gains required review (Peter's settings action); the authority-row register entry flips `proposed → armed` in the same PR. Token/governance diff-gates designed AFTER Experiment 16's evidence lands — deliberately not designed here (charter grain).

---

## Data Models

**Register entry** (fenced YAML under each `### <entry-id>` heading):

```yaml
rule: "governance-law changes require Peter's ratification"   # the rule, one line
boundary_call:
  class: operational            # functional | operational | ideological
  rationale: "..."              # one line (scalar rows); scoped rows may push rationale into scope[]
verification:
  disposition: record-check     # barrier | record-check | warn | none
  owner: thurgood
  check_state: armed            # none | proposed | armed | dormant | retired   (Req 1.3)
  checks: ["122-sweep-1-refs"]  # the concrete check(s), when armed
  scope:                        # OPTIONAL (Req 1.2); REQUIRED when boundary is surface-dependent
    - surface: "consumption sites"
      disposition: barrier
      rationale: "..."
education:
  disposition: "keeps the why (ballots README); generated prompts educate verify-the-record"
crossRef: "canonical/shared/shared-catalog.yaml#record-first-ratification"   # reciprocal half (Req 4.3)
history:
  - { date: 2026-07-XX, change: "entry created (U1 pilot)", by: thurgood }
```

**Evidence artifacts** (all in `.kiro/specs/125-B-classification-map/completion/pilot/` unless noted):
- `measurement-protocol.md` — rubric, criteria, window definition, query recipes (Req 8.1)
- `probe-evidence.md` — OB-7 pattern (Req 6.5)
- `trial-diff-table.md` — per-task × per-arm × per-run rubric scores + pre-committed criteria verdicts (Req 7.7)
- `trial-transcripts/` — unedited (Req 7.6)
- `u1-closeout.md` — five-section contract (Req 17)
- `exp2-authority-row-record.md` (spec dir root or completion/) — Req 3.4
- `exp3-spike-evidence.md` — boundary-call record + FP/FN counts + hygiene caveat (Req 16.3)
- WCAG audit adjudication table (U2 task record, Req 12.3)

**Console allowlist entry**: `{ suite, pattern, reason }` (C8).

---

## Error Handling

- **Trial-arm contamination** (pruned text found on any delivery surface pre-run): the run is void (Req 7.1) — fix the substitution, re-verify, rerun; voided runs don't count against the ≤2-runs-per-arm cap but ARE logged in the evidence file.
- **Relevance failure** (control arm never exhibits target actions): task swapped for the synthetic-replay fallback (Req 7.3); swap recorded.
- **Window staleness event**: re-baseline per Req 8.4; the event tallied (10.6c); if re-baselining recurs such that the window cannot close within the trial-cap budget, that is reported to Peter as a finding, not silently absorbed.
- **Smoke false-fail modes**: manifest unreadable/empty → fails with the selection-floor message (distinct from a tool-missing failure, so triage is immediate).
- **Re-arm red suite** (audit missed a null): the audit table is re-opened, the contract adjudicated, fix or exemption-escalation per DD4 — the check is NOT weakened to pass.
- **Ambiguity discipline**: any indeterminate criterion reports as indeterminate (Req 8.5) — error handling never converts ambiguity into a pass.

---

## Testing Strategy

*The strategy/tactics/validation loop applies to this spec itself: this section is the durable strategy; per-task test selections are tactics for tasks.md; CI is the validation.*

- **The register**: validated by sweep-1 post-re-point (the crossRef resolves — platform-verified, Req 4.4) and by the generator consuming it without error (soft-coupling smoke).
- **Tool-boot smoke**: gate-bite proof (deliberate BLOCKED PR — Req 5.4); the selection floor tested by a synthetic empty-manifest run before wiring.
- **WCAG re-arm**: the match-count floor + per-literal presence assertions self-test the selection (DD3); the audit table is the pre-arm evidence; suite green post-re-arm with a deliberately-broken contract as the local bite test.
- **Validation promotion**: same pattern — inventory first, flip, deliberate zero-validation fixture proves the bite locally.
- **Console-fail**: seeded allowlist + full functional run green; a deliberate un-allowlisted `console.error` in a scratch test proves the bite; removed before merge.
- **The pilot itself IS the test** of the methodology (probe → trial → window, pre-committed criteria); its integrity is protected by Req 8's pre-commitment + Req 17's closeout contract.
- **Full-suite regression**: every U1/U2 PR runs the standard required checks (125-A lanes) — no lane modifications land without the affected lane's own green + bite evidence.

---

## Design Decisions

**DD1 — Register format/location: `canonical/registry/classification-map.md`, markdown headings + fenced YAML.** (Resolves Req 1.7.) *Grounds*: sweep-1's crossRef resolver only resolves `path § "heading"` against **markdown heading lines** (verified `common.ts:176` — `^#{1,6}\s`, verbatim substring), so a pure-YAML register can never satisfy Req 4; `canonical/registry/` is the established home for machine-readable governance artifacts (tool-registry.json); a single file with fenced YAML avoids the YAML↔markdown drift a two-file design invites; headings give Req 1.4's stable citable anchors; fenced YAML gives Req 1's machine-readability (extractable by any consumer, incl. 122's generator). *Counter-considered*: pure YAML + extending sweep-1 to resolve YAML ids — rejected: modifying a shipped 122 required check to accommodate a new artifact inverts the dependency and grows tooling (Req 9.3's philosophy).

**DD2 — Req 14.2's two target docs: `canonical/agents/thurgood.md` and `canonical/agents/stacy.md`** (both verified present, 2026-07-13; stacy.md carries the lessons-learned capture duties at :248/:266/:320; thurgood.md is the canonical source of the Civitas steward's monthly health-check duties). *Rationale*: naming the canonical sources rather than generated prompts means the mutual cross-reference propagates through 122's auto-regen — edit once, both surfaces stay current; exactly the churn-rate placement the methodology teaches. Both edits are generator-source governance changes and ride the normal Peter-merged PR flow.

**DD3 — Match floor: aggregate floor PLUS per-literal presence.** (Resolves Req 12.4's conscious call.) The aggregate floor (total allowlist matches ≥ a set minimum) satisfies the DORMANT lesson; ADDITIONALLY each of the four exact-name concepts must individually match ≥1 contract. *Rationale*: the DORMANT incident was literal-name staleness — the literals are precisely where re-dormancy demonstrably occurs, and four presence assertions cost nothing; wildcards get aggregate-only because their concept universe legitimately churns (a per-concept floor there would false-fail on legitimate evolution). The residual risk (an entire wildcard family renamed while literals still match) is accepted and recorded — it is the same order of residual as Req 12.4 already noted.

**DD4 — Req 12.6 exemption mechanism: NONE — fix-all, escalate-if-candidate.** If the audit surfaces a contract that seems legitimately zero-validation, work STOPS on that contract and it goes to Peter with Lina's owner-read attached; no test-level exemption list is built. *Rationale*: the domain owner's position is that a contract with zero validation criteria is defective by definition — building an exemption mechanism is machinery for a case the owner says cannot legitimately exist (Req 9.3's escalate-don't-build philosophy applied to test machinery); if reality disagrees with the owner's read, that is a finding worth a human decision, not a silent allowlist entry. Lina's parallel (inherited-contract skip) is preserved because inheritance is a *structural* skip, not an exemption.

**DD5 — Trial context substitution via disposable worktrees + in-worktree regeneration + worktree-scoped MCP index** (C3), with the coordinator-authorized fallback (pruned files + prompt; MCP leak recorded) as the documented degraded mode. *Rationale*: worktrees give total substitution without touching the real corpus; the generator and docs-MCP both operate on whatever corpus they're pointed at, so no new tooling is required — the harness stays inside Req 8.6/9.3's caps.

**DD6 — "Observed PR" = opened after the prune merge, counted at open** (C4). Resolves a requirements silence (flagged in the R2 report rather than silently decided): counting at open keeps the denominator unambiguous and manual-queryable; a PR straddling the window close still contributes its first-push outcome.

**DD7 — Smoke "responds" = MCP handshake + `tools/list` presence, not per-tool invocation** (C6). Per-tool invocation needs per-tool arguments (schema coupling, real cost, and closer to returns-data territory); handshake+list is the cheapest call that proves declared-and-responding, and it structurally cannot violate the returns-data exclusion.

---

## Cross-References

- `requirements.md` (this directory) — the 17 settled requirements; all traces point there
- `design-outline.md` + `feedback.md` (this directory) — settled outline + full history
- `tools/agent-generator/sweeps/common.ts:176` — the crossRef resolution grammar (DD1's ground)
- `canonical/registry/tool-registry.json`, `canonical/shared/shared-catalog.yaml` — verified 2026-07-13
- `canonical/agents/thurgood.md`, `canonical/agents/stacy.md` — DD2's verified targets
- `src/__tests__/stemma-system/behavioral-contract-validation.test.ts:325–350, :435` — C7's verified current state
- `.kiro/specs/122-agent-generator/cutover/ob7-probe-evidence.md` — the evidence-file pattern
