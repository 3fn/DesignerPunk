# Design Document: 125-B — Classification Map & Deferred Enforcement Layers

**Date**: 2026-07-13
**Spec**: 125-B — Classification Map & Deferred Enforcement Layers
**Status**: Design Phase
**Dependencies**: Spec 125-A (shipped substrate); Spec 122 (complete — generator at `tools/agent-generator/`, manifest, canonical source); requirements.md (17 requirements, settled on main, PR #72)

---

## Overview

This design realizes the 17 settled requirements: the classification-map register as a concrete artifact, the U1 pilot's end-to-end workflow (measurement protocol → probe → trial → prune PR → observation window), the three checks (tool-boot smoke, WCAG re-arm + validation-criteria promotion, console-fail allowlist), the closeout record, and charter-grain sketches for U1b/U3. **Requirements are settled; this document decides HOW, never re-opens WHAT.** Every element carries its requirement trace.

Four decisions the requirements explicitly deferred to this phase are resolved in § Design Decisions (DD1–DD4), each with rationale and the verification that grounds it; DD5–DD8 record design-level calls made along the way. **Design-R1 incorporated (2026-07-13)**: both criticals resolved — the register relocated out of the diff-guarded root (DD1 revised) and the trial fallback rebuilt on recorded authority per Peter's void-trial decision (DD5 revised, C3); the [THURGOOD R2] entry in feedback.md carries the full incorporation record. Verify-first discipline: every system-state claim below was checked against source on 2026-07-13; citations inline.

---

## Architecture

```
governance/classification-map.md          ← THE REGISTER (DD1)
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

**Artifact**: `governance/classification-map.md` (DD1 — format rationale there).

**Shape**: one markdown file with standard steering-doc metadata header (governance/ is MCP-served); a header section documenting entry addressing + citation format (Req 1.6); then one `### <entry-id>` heading per rule, each followed by a fenced YAML block carrying the machine-readable fields (schema in § Data Models). The heading text IS the stable entry id (Req 1.4) — kebab-case, never renamed (supersede via `history`, Req 1.5). **Entry-id constraint (ADA R1, mandated in the register header): ids SHALL be unique AND no id may be a substring of another id** — sweep-1 resolves headings by verbatim SUBSTRING (`common.ts:186`), so `token-creation` would false-resolve against a later `token-creation-primitive`; the non-substring rule makes every citation unambiguous by construction.

**Entry citation format** (documented in the register header): `governance/classification-map.md § "<entry-id>"` — exactly the `path § "heading"` grammar sweep-1's resolver verifies (verified: `tools/agent-generator/sweeps/common.ts:176` resolves markdown headings by verbatim substring).

**crossRef re-point (Req 4)**: `shared-catalog.yaml`'s `crossRef` becomes `governance/classification-map.md § "record-first-ratification"`; `crossRefStatus: interim` + `crossRefResolveWhen` removed. The reciprocal half: the register entry's YAML carries `crossRef: canonical/shared/shared-catalog.yaml` + the entry id. Sweep-1 verifies the forward ref mechanically post-merge (Req 4.4).

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

**The three-surface prune design** (Req 2): per-surface, per-clause edits guided by the recorded assessments — imperative what-restatements ("run `npm test` before marking complete" as instruction) pruned; teaching (WHY the gate exists, lane-selection guidance, Jest-not-Vitest education) retained; clause-grain cuts each carry a two-blade justification in the assessment record. **Clause-separation discipline (LINA R1): the per-surface assessment record SHALL log the npm-test imperative and the adjacent Jest-not-Vitest functional education as SEPARATELY-CLASSIFIED clauses** — they are DISTINCT rules co-located in the same steering surfaces, and the rule-grain prune of the first must not silently take the second with it (the clause-grain edge landing concretely). The candidate diff is produced BEFORE ratification so the probe/trial can consume the pruned variant (Req 6.3, 7.1).

### C3. The Cloned-Agent Trial (Req 7, 9)

**Mechanics — all inside the spec dir, no standing tooling (Req 8.6, 9.3):**

- **Arms**: two git worktrees — `trial-control` (current main) and `trial-pruned` (main + the candidate prune diff applied). Worktrees are disposable; removed at trial end.
- **Total context substitution (Req 7.1), three legs**:
  1. *Worktree steering files*: the pruned diff applied in `trial-pruned` — inherent to the worktree.
  2. *Generated prompt*: run 122's generator (`tools/agent-generator/generate.ts`) inside the pruned worktree so the prompt/CLAUDE.md surface regenerates from pruned canonical sources.
  3. *MCP index*: the docs MCP instance launched for a session in the pruned worktree indexes THAT worktree's corpus; `rebuild_index` invoked at session start to force freshness.
  - **Verification before each run** (Req 7.1 "verified before the run") — all three legs DETECTED, none assumed (STACY R1): (1) worktree files + (2) generated prompt: grep the pruned text — zero hits required; (3) **MCP leg, positive detection**: query the docs MCP running in the pruned worktree for the pruned rule's text and assert it is absent from what the server RETURNS — the on-disk grep cannot see a stale served index, so the served output itself is checked (a manual query, inside Req 8.6's caps). All three results recorded in the evidence file.
  - **MCP-unsubstituted runs are VOID trials — Req 7.1 as ratified, no amendment (DECIDED, Peter, 2026-07-13, option a).** A run whose MCP leg is not substituted MAY still be executed and recorded, but ONLY as an **explicitly-labeled supplementary observation**: it appears in the evidence file under its own heading ("Supplementary observation — MCP leg unsubstituted"), it is NOT the trial, and it does NOT feed the trial verdict. *Rationale on the record: the leak biases systematically toward "no difference" — exactly the result that would certify the prune safe — so a leaky run cannot serve the trial's primary purpose.* **Escalation route (explicit):** IF the MCP-substitution leg proves genuinely costly during U1 execution, THAT is when a recorded amendment request goes to Peter with the cost evidence in hand — the design does not pre-soften the requirement. *(History note: an earlier draft cited a "pre-authorized fallback" on relayed authority that had no committed record — caught by STACY R1 as the relayed-authority pattern, owned by the coordinator in the round record, and resolved by Peter's decision above.)*
- **Agent invocation**: the trial agent is a cloned session launched in the arm's worktree with the arm's generated prompt; battery task issued as an ordinary task instruction. Transcript captured to `completion/pilot/trial-transcripts/` (retained unedited — Req 7.6).
- **Scoring**: rubric applied to each transcript — actions present/absent → the scored diff table (`completion/pilot/trial-diff-table.md`). Paired runs, ≤2 per arm per task, ≤20 transcripts total (Req 9.2).
- **Battery**: 3–5 queued real small tasks (Spec 126 candidate); relevance gate = control-arm transcript exhibits the rubric's target actions (Req 7.3, ratified); synthetic replay fallback triggered by relevance failure.
- **Ethics (Req 7.6)**: ordinary-work tasks only; protocol + results in the spec record; transcripts treated as work product.

### C4. Observation Window Measurement (Req 8)

Manual/query-only (Req 8.6): first-push failure rate via `gh pr list` + `gh api` check-run queries against the N=20 observed PRs; re-accretion scan via `git log -p` / grep over the three pruned surfaces; allowlist churn (once Req 11 arms) counted from allowlist-file diff history. Each query documented in the measurement protocol so it is repeatable by hand. Wall-clock span recorded as a datum (Req 8.7). Staleness: any merge touching the three surfaces (or a 122 regen affecting them) triggers re-baseline (Req 8.4); material-change-event frequency tallied for Req 10.6(c); **re-baseline semantics + bound per DD8**.

**"Observed PR" defined** (design resolution of a requirements silence — flagged in the report): a PR *opened* after the prune merges, counted at open; its first-push check outcome computed when its first check run completes. N=20 such PRs closes the window. **Operationalized for auditability (STACY R1):** "agent-authored" = PRs whose head branch matches the task-flow conventions (`task/*`, `fix/*`, `chore/*` per Task-Completion-Protocol § Branch and PR Conventions) — a mechanical filter, no judgment; "first push" = the PR's head SHA at open, **pinned in the window dataset at observation time**, so the counted check outcome is the one attached to that SHA and an auditor reproduces the exact set by hand.

### C5. The Closeout Record (Req 17)

`completion/pilot/u1-closeout.md` + the standard parent-task summary doc (existing completion-doc conventions, Req 17.3). Five mandatory sections mirroring Req 17.1's contract: Window Findings (per-criterion met/unmet/indeterminate); Methodology Amendments (or "none"); At-Scale Window Parameters (N-per-wave, overlap/serialization policy, grounded in the wall-clock datum + material-change frequency + the 10.6(b) analytic answer); Dial Decision Point; Return-Edge First-Exercise Note. **The U1b entry gate checks CONTENT completeness, not header presence (STACY R1):** the gate verifies that EVERY pre-committed criterion carries an explicit met/unmet/indeterminate verdict, that EACH of 10.6's three problems carries its answer-or-datum, and that the parameters section states actual values — **a present-but-TBD section fails the gate.** Req 10.1's "exists and is complete" is a content check against this list (Req 17.2).

### C6. Tool-Boot Smoke (Req 5)

A CI job (new required check, `125B-tool-boot-smoke`) + a script confined to the check's own workflow: for each server in `canonical/registry/tool-registry.json` (verified present), boot the server from compiled output, perform the MCP handshake, call `tools/list`, assert every registry-declared tool name for that server appears, **AND invoke each declared tool once with empty arguments, asserting that a JSON-RPC response returns — result OR structured error, payload uninspected** (DD7 as upgraded per STACY R1: a tool advertised in `tools/list` whose handler throws on invocation is a distinct failure mode the list-only design would have silently passed). NO assertion touches returned data or payload content (Req 5.2, normative: a declared-but-index-empty tool passes — a structured "invalid params" error IS a valid response; listing and responding ≠ returning data). Selection floor: zero tools parsed from the manifest → FAIL (Req 5.3). Arming proof: one deliberate gate-bite PR (mangle a tool name, observe BLOCKED, revert — the 125-A pattern, Req 5.4).

### C7. WCAG Re-arm + Validation Promotion (Req 12)

**Re-arm** (`behavioral-contract-validation.test.ts:325–350`, verified: hardcoded six-name array, exact `.includes` match): replace the array with an allowlist matcher supporting the two forms in Req 12.2 — exact names (`interaction_focusable`, `interaction_focus_ring`, `state_disabled`, `state_error`) and wildcards, **stated normatively (LINA R1): `accessibility_*` = `startsWith('accessibility_')`; `content_*_label` = `startsWith('content_') AND endsWith('_label')`** — a bare `content_` prefix over-selects every non-label content contract into the WCAG-required set and is NOT compliant. Audit-before-arm (Req 12.3): a one-off audit pass (run inside the U2 task, output = an adjudication table in the spec dir) — **the audit SHALL enumerate through the SAME matcher function and the same `COMPONENTS` loader the armed check uses (LINA R1), so audit-clean ⇒ arm-green by construction**; nulls adjudicated with Lina; fixes/exemptions land in the same PR as the re-arm. **Match floor (DD3)**: aggregate floor PLUS per-literal presence (each of the four exact names must match ≥1 contract; wildcards aggregate-only) — rationale in DD3. **Validation promotion (Req 12.6)**: `:435` assertion flips from `toBeGreaterThan(0)` to `withoutValidation === 0` after the inventory pass; inherited-contract skip preserved; exemption mechanism per DD4 (none — fix-all/escalate). Implementation Lina's; this section is the mechanism spec she implements against.

### C8. Console-Fail Allowlist (Req 11)

A jest console-capture hook that fails on non-allowlisted output. **The hook is NET-NEW global wiring (LINA R1, verified): root `jest.config.js` has no `setupFilesAfterEnv` today** — the C8 task adds one (a governance-visible config edit scoped with its own gate-bite proof), it does not slot into an existing surface. **Scope (explicit decision, Lina's recommendation endorsed): the ROOT functional lanes only for U2** — where PR #39's adjudication evidence lives; sub-package console-fail (`mcp-server`, `application-mcp-server` — own jest 29 configs outside root `roots`) is **recorded as a deferred register row**, not silently skipped. If ever replicated to the sub-packages, the capture implementation must be **version-agnostic** (plain `jest.spyOn`/method swap — stable on jest 29 and 30; no jest-30-only API) — constraint recorded now so the future implementer inherits it. **Allowlist storage**: one checked-in file, `src/__tests__/console-allowlist.json` — an array of `{ suite: "<test-file path or describe-scope>", pattern: "<regex or literal>", reason: "<one line>" }` entries (the suite × message-pattern grain, Req 11.1), **serialized one-entry-per-line so diff-line adds equal entry adds; the churn count counts parsed objects, not raw `+` lines (LINA R1 — reformat-proof)**. **Churn counting** (Req 11.3): entries-added-per-PR from `git log -p -- src/__tests__/console-allowlist.json` — manual query, consistent with Req 8.6. Seeded from the PR #39 adjudications; the jsdom stylesheet-limitation doc addition folds into the seeding task. Promotion (making the hook fail rather than warn) follows the allowlist landing, per Req 11.2.

### C9. U1b / U3 (charter-grain sketches)

- **U1b** (Req 10): waves executed with the C2 pipeline per wave (register rows → probe → trial → prune PR → window per the closeout-set at-scale parameters). No new machinery — the pilot's protocol documents are the wave template. Wave PRs declare rule count + sizing rationale in the PR body (Req 10.4).
- **U3** (Req 13): CODEOWNERS file mapping the four governance-law path groups to Peter; branch protection gains required review (Peter's settings action); the authority-row register entry flips `proposed → armed` in the same PR. Token/governance diff-gates designed AFTER **Experiment 3's (Req 16)** evidence lands — deliberately not designed here (charter grain). *(Mislabel fixed per ADA R1 — an earlier draft fused "Experiment 3" with "Requirement 16.")*

**Experiment 3 execution (Req 16 — placement + counting frame, answering ADA R1):**
- **Placement**: an **early-U2 subtask** — executed by **Ada** (she owns the token-side detection logic, Req 16.4), Thurgood audits. Not pre-requirements (that window has passed); U2 is where its output is first consumed-adjacent (the register rows) while staying ahead of U3's need.
- **Counting frame (design grain)**: the spike targets `src/tokens/**` only, so generated-output reshuffle is excluded by path scope before counting starts. **Positives** = a diff introducing a new token definition — (a) a new entry in an existing `*Tokens.ts` export, or (b) a new `*Tokens.ts` file. **FP** = a flagged diff Ada adjudicates as sanctioned (approval context present). **FN** = a known unsanctioned addition the prototype misses — counted against a **labeled ground set of historical token-addition PRs that Ada adjudicates** before the spike runs. **Precise counting rules (what marker forms count as "approval context") are deferred to the U2 task breakdown WITH Ada consulted** — they are token-domain judgments, hers to make; this design fixes the frame so the task can't drift from it.

---

## Data Models

**Register entry** (fenced YAML under each `### <entry-id>` heading):

```yaml
rule: "governance-law changes require Peter's ratification"   # the rule, one line
boundary_call:
  class: operational            # functional | operational | ideological
  rationale: "..."              # one line (scalar rows); scoped rows may push rationale into scope[]
verification:
  disposition: record-check     # barrier | record-check | warn | none | scoped
                                # ADA R1: when scope[] is present, the top-level disposition
                                # SHALL be the sentinel `scoped` (or omitted — `scoped` is the
                                # documented default) — a scoped row has NO valid scalar here
                                # (barrier flags the definition layer; none misses consumption)
  owner: thurgood
  check_state: armed            # none | proposed | armed | dormant | retired   (Req 1.3)
  checks: ["122-sweep-1-refs"]  # the concrete check(s), when armed
  scope:                        # OPTIONAL (Req 1.2); REQUIRED when boundary is surface-dependent
    - surface: "consumption sites"
      disposition: barrier
      check_state: proposed     # ADA R1: checks + check_state are PER-SCOPE when scoped —
      checks: []                # "lint at consumption / no check at definition" must serialize
      rationale: "..."
    - surface: "definition layer + theme overrides"
      disposition: none         # literals-by-design
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

- **Trial-arm contamination** (pruned text found on any delivery surface pre-run, incl. the MCP served-output check): the run is void (Req 7.1) — fix the substitution, re-verify, rerun; voided runs don't count against the ≤2-runs-per-arm cap but ARE logged in the evidence file. **Void ceiling (STACY R1): more than 2 voided attempts on the same arm → STOP and escalate to Peter as a substitution-harness finding** (parallel to the staleness escalation) — void-rerun loops are not unbounded.
- **Relevance failure** (control arm never exhibits target actions): task swapped for the synthetic-replay fallback (Req 7.3); swap recorded.
- **Window staleness event** (per Req 8.4; semantics + bound = **DD8**): a re-baseline **SEGMENTS the window — the N counter does NOT reset**; observed PRs keep accumulating toward N=20, metrics are computed per segment, and the report notes the segmentation (an under-populated segment reports its criteria as indeterminate, which Req 8.5's discipline handles honestly). **Pre-committed bound: more than K=3 re-baselines before the window closes → STOP and escalate to Peter** as a corpus-volatility finding. *(Fixes STACY R1's category error: the window closes on N observed PRs — Req 8.2 — not on the trial's transcript cap, which is a different budget.)*
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

**DD1 — Register format/location: `governance/classification-map.md`, markdown headings + fenced YAML. [REVISED post-design-R1 — the original location collided with a shipped required check.]** (Resolves Req 1.7.) *Format grounds (unchanged)*: sweep-1's crossRef resolver only resolves `path § "heading"` against **markdown heading lines** (verified `common.ts:176`), so a pure-YAML register can never satisfy Req 4; single file with fenced YAML avoids YAML↔markdown drift; headings give Req 1.4's stable anchors (with the non-substring id constraint, C1); fenced YAML gives machine-readability. *Location grounds (rewritten per ADA R1's CRITICAL)*: the original `canonical/registry/` placement sat inside a **whole-directory guarded root of 122's bidirectional diff-guard** (verified `generate.ts:435` `guardedRoots()`; `diff-guard.ts:8` fails on stale extras) — a hand-authored file there reds a 125-A required check on landing; additionally ALL of `canonical/` is enumerated by `coverage-map.ts`'s `enumerateSurfaces()` (verified :113–119). The register therefore lives **outside `canonical/` entirely**. `governance/` verified against all three enumerations (guardedRoots static set; the coverage glob; generate.ts references governance/** only for corpus doc-id derivation, not guarding): (a) unguarded — no check collision; (b) **MCP-served** — agents can query the register, fitting a register agents read against; (c) already inside **U3's CODEOWNERS path set** (Req 13.1: `governance/**`) — the map becomes a Peter-gated surface exactly when the ratification barrier arms, which is the correct gravity for governance law. *Counter-considered*: file-graining the guard to admit the register in canonical/registry — rejected (ADA R1 concurs): editing a shipped 122 required check to accommodate a new artifact inverts the dependency (the original DD1's own counter-consideration, now applied to itself).

**DD2 — Req 14.2's two target docs: `canonical/agents/thurgood.md` (health-check side) and `governance/Product-Handoff-Protocol.md` (lessons-process side). [REVISED post-design-R1 — the pointer-to-a-pointer resolved.]** *Grounds*: STACY R1 verified that stacy.md *declares* the capture duty but defers the synthesis-review **process definition** to `governance/Product-Handoff-Protocol.md` (verified: the protocol's Lessons Synthesis Review section at :142–178 IS the process — inputs, trigger, steps, routing). The mutual naming therefore joins the two **process-defining** surfaces: thurgood.md (canonical source of the monthly health-check review items — auto-regen keeps the generated prompt current) ↔ Product-Handoff-Protocol.md (the synthesis-review definition). stacy.md needs no edit — it already points at the protocol, so the duty→process chain closes without a third surface. Both edits ride the normal Peter-merged governance PR flow.

**DD3 — Match floor: aggregate floor PLUS per-literal presence. [ENDORSED by the lane owner, design-R1, with her coupling note recorded.]** (Resolves Req 12.4's conscious call.) The aggregate floor (total allowlist matches ≥ a set minimum) satisfies the DORMANT lesson; ADDITIONALLY each of the four exact-name concepts must individually match ≥1 contract — verified safe on the current corpus (LINA R1: `interaction_focusable`=11, `interaction_focus_ring`=11, `state_disabled`=21, `state_error`=4 live consumers). *Rationale*: the DORMANT incident was literal-name staleness — the literals are precisely where re-dormancy demonstrably occurs; wildcards get aggregate-only because their concept universe legitimately churns. **Coupling note (LINA R1, recorded so it never reads as a mystery failure): per-literal presence couples the check's green to those four names remaining IN USE — if the last consumer of one (e.g. `state_error`, only 4 today) is intentionally removed, the floor reds the suite. That is the backstop working as designed**, and the fix is a conscious floor update in the same PR as the removal, not a puzzled revert. The wildcard-family-rename residual is accepted and recorded, as Req 12.4 already noted.

**DD4 — Req 12.6 exemption mechanism: NONE — fix-all, escalate-if-candidate.** If the audit surfaces a contract that seems legitimately zero-validation, work STOPS on that contract and it goes to Peter with Lina's owner-read attached; no test-level exemption list is built. *Rationale*: the domain owner's position is that a contract with zero validation criteria is defective by definition — building an exemption mechanism is machinery for a case the owner says cannot legitimately exist (Req 9.3's escalate-don't-build philosophy applied to test machinery); if reality disagrees with the owner's read, that is a finding worth a human decision, not a silent allowlist entry. Lina's parallel (inherited-contract skip) is preserved because inheritance is a *structural* skip, not an exemption.

**DD5 — Trial context substitution via disposable worktrees + in-worktree regeneration + worktree-scoped MCP index, all three legs positively detected; MCP-unsubstituted runs are VOID trials. [REVISED post-design-R1 — Peter's decision, 2026-07-13, option (a): Req 7.1 as ratified, no amendment.]** *Rationale*: worktrees give total substitution without touching the real corpus; the generator and docs-MCP both operate on whatever corpus they're pointed at, so no new tooling is required — the harness stays inside Req 8.6/9.3's caps. The MCP leg is verified by querying the served output, not assumed from `rebuild_index` (C3). An MCP-unsubstituted run may be recorded ONLY as an explicitly-labeled supplementary observation that does not feed the trial verdict; the escalation route (recorded amendment request to Peter, with cost evidence, if the leg proves genuinely costly in execution) is documented in C3. *History*: the prior draft's "pre-authorized fallback" cited relayed authority with no committed record — caught by STACY R1, owned by the coordinator in the round record, resolved by Peter's decision. The design now cites only recorded authority.

**DD6 — "Observed PR" = opened after the prune merge, counted at open; denominator and SHA operationalized. [TIGHTENED post-design-R1.]** (C4). Counting at open keeps the denominator unambiguous and manual-queryable; a PR straddling the window close still contributes its first-push outcome. Per STACY R1: "agent-authored" = head branch matches the task-flow conventions (`task/*`, `fix/*`, `chore/*`) — a mechanical filter; the first-push SHA is pinned in the window dataset at observation time so an auditor reproduces the exact counted set.

**DD7 — Smoke "responds" = handshake + `tools/list` presence + per-tool empty-args invocation asserting a JSON-RPC response returns (result OR structured error, payload uninspected). [UPGRADED post-design-R1 — Stacy's option (b) chosen over recording a narrowing.]** *Rationale for upgrading rather than recording*: the original list-only design silently passed a tool whose handler throws on invocation — a real, distinct failure mode; the empty-args call closes it at trivial cost (one call per tool, seconds total), requires NO per-tool schema knowledge (an "invalid params" structured error IS a valid response — the assertion is "a JSON-RPC response returned," nothing about its content), and honors Req 5.1's plain reading ("responds to a cheap call") instead of reinterpreting it. Req 5.2's returns-data exclusion is structurally preserved: no payload is ever inspected.

**DD8 — Re-baseline semantics: SEGMENT, never reset; pre-committed bound K=3. [NEW post-design-R1, resolving STACY R1's judgment hole.]** A staleness re-baseline (Req 8.4) segments the window: the N counter keeps accumulating toward N=20 (a reset would let recurring 122 regens prevent the window from EVER closing — the exact failure Stacy named); metrics are computed per segment; an under-populated segment reports indeterminate (Req 8.5 handles that honestly). **Bound: more than K=3 re-baselines before window close → escalate to Peter as a corpus-volatility finding.** *Why K=3*: at N=20 (≈ under a week to two weeks of PRs), three material changes to the three pruned surfaces (or 122 regens affecting them) is well above routine churn — 122 regens accompany ordinary governance work, so K=1–2 would escalate on noise; K=3 marks the point where the corpus is demonstrably too volatile for a clean window and a human should re-plan rather than the pilot silently grinding.

---

## Cross-References

- `requirements.md` (this directory) — the 17 settled requirements; all traces point there
- `design-outline.md` + `feedback.md` (this directory) — settled outline + full history
- `tools/agent-generator/sweeps/common.ts:176, :186` — the crossRef resolution grammar + substring resolution (DD1/C1 grounds)
- `tools/agent-generator/generate.ts:435` (`guardedRoots()`), `tools/agent-generator/coverage-map.ts:113–119` (`enumerateSurfaces()`) — the enumerations the register's location was verified against (DD1 revised)
- `canonical/registry/tool-registry.json`, `canonical/shared/shared-catalog.yaml` — verified 2026-07-13
- `canonical/agents/thurgood.md`, `governance/Product-Handoff-Protocol.md` (:142–178, the Lessons Synthesis Review) — DD2's verified targets (revised); `canonical/agents/stacy.md` :~391 verified as the duty→protocol pointer
- `src/__tests__/stemma-system/behavioral-contract-validation.test.ts:325–350, :435` — C7's verified current state
- `.kiro/specs/122-agent-generator/cutover/ob7-probe-evidence.md` — the evidence-file pattern
