# 125-B Backlog — Consolidated Input for Formalization

**Date**: 2026-07-11
**Spec**: 125-B (the classification map + later phases of Mechanical Enforcement Strategy)
**Status**: **CONSOLIDATED INPUT — not a spec, not ratified.** This is the single, deduplicated,
provenance-tagged input set for 125-B's eventual formalization (Thurgood-led). It supersedes the
scattered live inbounds as the *place to read* what 125-B owes; the source notes remain as the
evidence trail.

---

## Why this document exists

Spec 125-A shipped (PR gate + mechanical arming, closed 2026-07-10). Spec 122 is complete
(2026-07-11) — the gate the umbrella outline set for starting 125-B ("after 122 calcifies") is met.
But the 125-B input had accreted across seven inbound notes of mixed freshness — some consumed by
125-A, some historical sequencing, some genuinely still-owed — with no line drawn between "already
happened" and "still owed." This document draws that line once, so formalization starts from a clean
set instead of an archaeological dig.

**Decisions folded in (do not re-litigate):**
- **125-B stays a single, internally-phased spec** — NOT split into 125-C/125-D (Peter, 2026-07-11).
  Slice the *work* into declared merge units (the 122 pattern: substrate → units → closeout), not the
  *directory*. Rationale + the one counter-cost (a single spec stays open until its slowest unit) →
  design-outline.md § "8. Decisions on record".
- **The classification map is the spine** (design-outline.md § "5") and is 125-B's first unit.
- **Formalization is Thurgood's** (125 is Thurgood-led, design-outline.md § "7"). The triage below is
  *input* to his methodology + Peter's strictness calls — **not binding phasing**.

---

## Proposed unit shape (input to Thurgood, not binding)

A suggested slicing of 125-B's work into declared merge units, so it delivers incrementally within one
spec directory:

| Unit | Contents | Readiness |
|------|----------|-----------|
| **U1 — Classification map** | The §5 spine: per-rule block/warn/educate rows, seeded from 122's canonical source + the rows below. Discharges the crossRef re-point obligation. | **Ready now** (122 complete) |
| **U2 — Net-new checks** | Tool-boot smoke; warn→fail promotions (console-noise, inverse-drift). | Buildable; manifest exists |
| **U3 — Governance layer (Phase 2)** | CODEOWNERS + PR-approval-as-ratification (layer 2); token/governance diff-gates. | Later; may need platform work |
| **Elective** | The autonomy dial (policy doc, not machinery). | Peter's election, at U1/Phase-1 closeout |

---

## LIVE — still owed by 125-B (carried forward)

Each item cites its source note for provenance.

### MUST — the spine and its standing obligations

1. **The classification map itself** — the central deliverable. Currently **greenfield: zero ratified
   rows**. Seed material (proposed rows, NOT ratified):
   - **Authority row** — *"governance-law changes require Peter's ratification"* → **barrier** (PR-approval
     gate, layer 2) for gated surfaces; **record-check** (committed ballot status) for ungated artifacts;
     prose keeps only the *why*. Coordinate wording with 122's propagated verify-the-record rule so it is
     neither double-owned nor orphaned. → `inbound-from-ratification-protocol.md` §3; design-outline.md §5.
   - **Prune-with-arm rows** — 125-A Task 1's what/why splits (e.g. "run npm test before marking complete"
     shifts from instruction→context once the gate runs it as a required check). → `inbound-to-125-B-from-125-A.md`
     §4; `inbound-from-122.md` §4.
   - Methodology: for every enforceable rule pick barrier / prose / clean-split; honor the pruning
     obligation (arming a check obligates deleting the prose it replaces) and the honesty guard (default to
     prose ONLY after confirming a rule is truly unmechanizable, not merely hard). → design-outline.md §5.

2. **crossRef re-point obligation** (tied to U1 — only 125-B can author this). When the map artifact
   exists: (a) re-point `canonical/shared/shared-catalog.yaml`'s `record-first-ratification` crossRef from
   the ballots README to the map's entry and remove `crossRefStatus: interim` + `crossRefResolveWhen`;
   (b) author the reciprocal half (the map entry names the catalog back — two-ended requirement).
   **Standing visibility:** sweep-1 (`122-sweep-1-refs`, required check) enumerates all interim crossRefs
   every run — if the count already reads zero at formalization, verify and discard. → `inbound-to-125-B-from-122.md`.

### SHOULD — net-new mechanisms (buildable candidates)

3. **Tool-boot smoke** — CI check asserting each registry tool is **declared and responds** to a cheap
   call. **Calibration guard (Stacy): assert declared+responds, NEVER returns-data** — a declared-but-index-empty
   tool (Product MCP here) is correct. Manifest now **exists**: 122's `canonical/registry/tool-registry.json`
   enumerates all three MCPs' tools with repo-relative entries — no longer a wait-for-existence deferral.
   Home: a 125-B check or a 122-side registration — 125-B adjudicates. → `inbound-to-125-B-from-125-A.md` §2;
   `inbound-from-122.md` §2.

4. **Release-detection under the PR flow** (two ledger findings):
   - Finding 1 — `completion-documentation-guide.md:351` still instructs pre-PR `release-manager.sh auto`;
     release *detection* was out of Phase-0's ballot scope. 125-B decides where it lives under branch→PR→merge.
   - Finding 3 — the post-merge release-analysis job succeeds silently; its output went unconsulted through
     the entire soak. Surface it (release-PR comment or equivalent) — or retire it consciously.
   → `inbound-to-125-B-from-125-A.md` §1.

### SHOULD/LATER — strictness promotions (Peter owns each warn→fail call)

5. **Warn→fail candidates** observed during 125-A's arming:
   - **Fail-on-unexpected-console** — allowlist expected output, fail on anything new (PR #39 did the manual
     pass: 96 error + 72 warn blocks → 0). Initial-triage cost is real (Lina's per-suite pattern applies).
     Related pending ballot: the jsdom stylesheet-limitation doc addition (Thurgood chip, 2026-07-09).
   - **Inverse-drift / incremental-build integrity** — the armed `lane-functional-root` rebuilds from clean,
     masking incremental-build breakage and stale-artifact test dependencies (STACY R1 item 4, ratified for
     this list). Candidate: an incremental-path integrity check.
   → `inbound-to-125-B-from-125-A.md` §3.

### LATER — governance layer (Phase 2 / U3)

6. **CODEOWNERS + PR-approval-as-ratification (ratification layer 2)** — governance-law changes require
   Peter's PR approval, enforced by branch protection + CODEOWNERS on `governance/`. Platform-verified
   authority supersedes the manual record-first step **for gated surfaces**; the committed-record protocol
   (layer 1, in force now) remains for artifacts outside the gate. This is the barrier half of the §5
   authority row (item 1). → `inbound-from-ratification-protocol.md` §2; `inbound-to-125-B-from-125-A.md` §4;
   design-outline.md §4 Phase 2.

### ELECTIVE — Peter's election, do not let "optional" decay into "never"

7. **The autonomy dial** — a documented policy mapping armed checks → the autonomy expansions they purchase
   (e.g. once full typecheck + `build:validate` + the Stemma lane are required, agents may iterate against the
   gates *within* a task, human authorization retained at parent-task boundaries). **Lightweight by
   construction** — a policy section amending Task-Completion-Protocol scope, NOT new machinery; if it needs
   tooling it has outgrown its brief. Per-task-class and reversible (a regression through an armed gate is
   evidence to notch back down). **Activation trigger:** revisit at Phase 1 / U1 closeout — tracker item, so
   "optional" doesn't rot. **Counter-argument on record:** may be premature at solo scale — if stop-and-wait
   doesn't chafe once gates are armed, defer indefinitely. → `inbound-from-wordpress-thesis.md` §3.

### WATCH — known-deferred hazards (not action items yet)

8. **Sub-package jest major-version split** — root jest 30, both sub-packages jest 29. A jest-30 CLI flag was
   silently ignored by jest 29 during 122 Task 7 (masking an intended selection-emptying). Not currently
   harmful; a quiet interop hazard for any future cross-package test tooling. → `inbound-to-125-B-from-125-A.md` §5.

---

## CONSUMED / HISTORICAL — NOT carried (recorded so nobody re-mines them)

These were forward-looking inputs to a Phase 0/1 that has now shipped. They remain as evidence; they are
**not** open 125-B work.

- **`inbound-from-2026-07-05-lane-viability.md`** — the wholesale-suite + full-tsc measurements. **CONSUMED
  by 125-A** (it gates the full functional suite + full typecheck as required checks). Historical.
- **`inbound-from-122.md`** — §1 sequencing ("125 before 122") **happened**; §3 protocol-rewrite-by-hand
  **done in 125-A**; §5 solo-dev self-merge ergonomics **adopted**; §6 the 9-vs-2 datapoint is informational
  evidence, not an action. (§2 tool-boot smoke and §4 prune-with-arm are carried above — items 3 and 1.)
- **`inbound-from-wordpress-thesis.md`** — §1 sequencing + §2 execution-loop reframing **spent** (Phase 0/1
  shipped). §3 autonomy dial is carried above (item 7).
- **Ledger findings 2 / 4 / 5 / 6** (125-A `bake-in-ledger.md`) — resolved during soak or Peter-accepted at
  closure; **deliberately not carried — do not re-open** (per `inbound-to-125-B-from-125-A.md` §1).
- **PAT scope asymmetry** (`inbound-to-125-B-from-125-A.md` §5) — **RESOLVED** 2026-07-10 (fine-grained PAT
  gained Workflows + Actions read/write, both legs verified). Dropped.

---

## Cross-References
- `design-outline.md` — the umbrella strategy + §5 map methodology + §8 decisions
- `inbound-to-125-B-from-125-A.md`, `inbound-to-125-B-from-122.md` — the live source notes folded here
- `inbound-from-ratification-protocol.md` — the authority row + layer-2 source
- `inbound-from-wordpress-thesis.md` §3 — the autonomy-dial source
- `.kiro/docs/ballots/README.md` — record-first ratification (layer 1, in force)
- `canonical/registry/tool-registry.json` — the tool-boot-smoke manifest (122)
- `canonical/shared/shared-catalog.yaml` — the crossRef re-point target
