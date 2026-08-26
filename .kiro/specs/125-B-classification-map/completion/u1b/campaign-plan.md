# U1b Campaign Plan — Candidate-Rule Roster + Wave Cuts

**Date**: 2026-08-02
**Task**: 125-B Task 5.1
**Status**: roster of CANDIDATES only — classification and two-blade scoring happen inside each wave (freshness, Req 10.5). Wave (a)-steps re-enumerate surfaces authoritatively at execution time; this plan's surface lists are the sweep's findings, not frozen appendices.

---

## 1. Sweep method (recorded for reproducibility)

**Rule-first, gate-anchored**: the imposter test requires an armed mechanical gate that owns a rule's *what* — so the sweep enumerated the armed gate inventory (the 18 required checks + the platform/config gates: branch protection admin-enforced, squash-only merge method, head-branch auto-delete) and grepped the education layer for prose restating each gate's what. **Corpus at source grain (counts as-enumerated 2026-08-02): 9 `.kiro/steering` docs, 83 `governance/` docs, 9 `canonical/agents/*.md`, 4 `canonical/shared/*.yaml`** (skills: no separate canonical skill prose beyond `skills-map.yaml` routing — recorded; generated outputs scanned only as delivery surfaces, never as sources). Named inclusions folded per the amendment: `no-hardcoded-color`, philosophy-conformance, and the three register rows still `proposed`.

**Honest calibration from spot-checks**: several grep families resolved to *education about the gates* (e.g., TCP explaining that squash-only is closed "by configuration, not convention" — the retained teaching class) or code examples (console/tsc hits in Test-Development-Standards and task-template docs). The pilot pruned the corpus's largest imposter cluster already. Candidates below carry a confidence grade; a LOW grade means the sweep found the rule's vocabulary but initial characterization leans education — the wave's two-blade scoring decides, and **a wave finding zero imposters merges rows-only** (a legitimate outcome under the settled amendment).

## 2. Candidate roster

| # | Candidate rule | Owning gate(s) | Confidence | Sweep surfaces (wave re-enumerates) | Owner consult |
|---|----------------|----------------|------------|--------------------------------------|---------------|
| C1 | never-commit/push-to-`main`; work lands via PR | branch protection (admin-enforced) | HIGH (imperative forms verified, e.g. TCP:40 "Never commit to `main`") | Task-Completion-Protocol (multiple), Process-Development-Workflow, core-goals | Stacy (process) |
| C2 | squash-merge-only | repo merge-method config | MEDIUM (most hits are retained-class education about the config) | Task-Completion-Protocol, Process-Development-Workflow | Stacy (process) |
| C3 | typecheck/build green before merge | lane-typecheck, lane-build-validate | LOW (tsc hits are task-template examples, not imperatives) | Process-Task-Type-Definitions, Process-Spec-Planning, BUILD-SYSTEM-SETUP, canonical/thurgood (validation tiers) | Stacy (process) |
| C4 | WCAG refs required on accessibility contracts | armed WCAG-required-refs check | MEDIUM | Contract-System-Reference, Component-Development-Guide, component family docs | Lina |
| C5 | every contract carries validation criteria | armed validation-criteria-completeness check | MEDIUM | Contract-System-Reference, Component-Inheritance-Structures, Component-Development-Guide | Lina |
| C6 | no unexpected console output in tests | armed console-fail (root lanes) | LOW (TDS hits are code examples) | Test-Development-Standards | Lina |
| C7 | never hand-edit 122 generated outputs (edit canonical, regenerate) | 122-diff-guard + 8 sweeps + canonical-vs-truth | MEDIUM (rule mostly lives in generated CLAUDE.md + canonical comments; source-prose presence thin) | steering/process docs (thin), canonical agent headers | Thurgood |
| C8 | never hand-edit generated token/platform outputs | (gate ownership TBD at classification — Ada adjudicates) | MEDIUM | Token-Governance, Token-Quick-Reference, rosetta docs, DesignerPunk-Integration-Guide | **Ada** |
| C9 | `no-hardcoded-color` (NAMED INCLUSION — committed classify-only row; no lint task in 125-B) | none armed (a proposed-check row) | rows-only expected | Component-Development-Guide, platform guides (per its eventual row's scope[]) | Ada + Lina |
| C10 | philosophy-conformance check (U2's logged candidate; red-on-presence) | none armed (candidate row) | rows-only expected | (row-definition work, not prose pruning) | Thurgood |
| C11 | register rows still `proposed`, state confirmation/advance: record-first-ratification (barrier scope → U3 territory), no-autonomous-token-creation (→ U3 diff-gate territory), inverse-drift (WATCH) | various / U3 | rows-only expected | register + their evidence artifacts | per row |
| — | **Control-group non-candidates (recorded so the sweep's breadth is auditable)**: "Peter merges on green / never merge your own PR" (NOT gate-owned until U3 — operational teaching, keep); Jest-not-Vitest command forms (pilot precedent: education, keep) | | | | |

## 3. Wave cuts (2–4 rules each; sizing rationale per Req 10.4)

| Wave (task) | Rules | Territory + sizing rationale |
|-------------|-------|------------------------------|
| **Wave 1 (5.2)** | C1, C2, C3 | Workflow-gate territory — the pilot's home ground, method well-oiled. ONE PR-flow-traversing battery task exercises all three territories (relevance shareable per rule iff R1-PRESENT per territory — cap-safe at ≤5). Highest-confidence candidate (C1) leads. |
| **Wave 2 (5.3)** | C4, C5, C6 **+ wcag-format-validity education layer (rostered by amendment)** | Component/test-governance territory (Lina's armed checks). One component-work battery task shares territory; caps safe. **AMENDED (Peter, 2026-08-25, record-first, at wave-2 row ratification)**: wcag-format-validity — armed since 125-A, rostered in no wave (gap found at consult U6) — added to wave 2; its only found imposter is the dual-rule clause CDS:513, cut as hunk W2-2. Same ruling created the `contract-platforms-specified` register row (a second unregistered armed check, found at consult R2-2). Open 5.6 closeout item: audit whether the remaining non-C1–C11 armed rows are rostered anywhere. |
| **Wave 3 (5.4)** | C7, C8, C9 | Artifact-integrity territory (generated-output discipline; Ada consult central). C9 rides as its committed rows-only classification. |
| **Wave 4 (5.5)** | C10, C11 (4 row items) | Register maintenance — **rows-only expected** (no prune anticipated; merges as a rows-only PR, instrument-excluded, if that holds). Can run any time; no window needed unless a prune emerges. |

**Ordering**: Wave 1 first (strongest candidates, cleanest battery). Waves 2/3 may overlap each other and Wave 1's window per P3. Wave 4 any time. Every wave prune merges at the START of a Peter burst.

## 4. What 5.1 armed

- Campaign measurement protocol: `campaign-measurement-protocol.md` (parameters, rulings, **baseline B=2 computed pre-wave-1**, frozen check set, freeze mechanics, dataset layouts)
- Shared campaign dataset scaffold: `campaign-window-dataset.md` (opens at wave 1's prune)
- Register methodology notes: A1–A4 + campaign params recorded in `governance/classification-map.md` (steward-written; ratified at this PR's merge)
- Wave tasks 5.2–5.5 + 5.6 (closeout) instantiated in tasks.md from the reviewed templates — fill slots only
