# Task 8 Completion (Parent): ⛔ SUBSTRATE PHASE GATE — the C13 closure-evidence bundle

**Date**: 2026-07-10
**Task**: 8 — Substrate phase gate: closure evidence (C13), fixture (C10.3), Stacy provisioning (C12) (Parent, Unit U1, Tier 3)
**Spec**: 122-agent-generator
**Branch**: task/122-substrate (U1 — this parent's completion OPENS U1's PR; **the phase gate IS U1's merge**)

> **This document is the recorded passage of the Req 6 phase gate** (Task 8.3's artifact).
> Its existence — with the reading-order index below AND Stacy's confirmed coverage-map —
> is the precondition every Group 2 task (9–16) checks. Group 2 does not begin until U1's
> PR is MERGED.

---

## The six C13 closure items — committed evidence

1. **`tool-registry.json` emitted through BOTH adapters' consumption paths.** The registry
   (live introspection, 43 tools across 3 MCPs — `canonical/registry/tool-registry.json`,
   Task 4) is consumed by the CC adapter (namespaced `mcp__<server>__<tool>` frontmatter
   grants) and the Kiro adapter (`allowedTools` `@server` grants) — both proven in the
   committed fixture outputs: `canonical/_fixture-output/cc/.claude/agents/_fixture.md`
   (4 namespaced tools) and `canonical/_fixture-output/kiro/.kiro/agents/_fixture.json`
   (3 server grants). Declaration-keyed; the Product MCP's declared-but-index-empty state
   participates live (its `get_product_overview` routes despite an empty index).
2. **`skills/` populated + both target trees emitted.** Six canonical skills under `skills/`
   (5 real + the C10.3 fixture specimen), each emitted byte-identical to
   `.claude/skills/**` AND `.kiro/skills/**` by the table-driven pipeline (Task 3 + 8.1).
3. **The three diff-guard runs** (local run records; the PLATFORM-level runs land on this
   PR's checks — the ten `122-*` required contexts registered in Task 7.3):
   - *Clean pass*: `full-run-green` / `no-op-green` (recorded Task 6.1; re-proven at every
     checkpoint since — most recently post-8.2, lock refreshed).
   - *Induced-hand-edit FAIL*: both prove-it-bites forms recorded in Task 6.2
     (completion/task-6-parent-completion.md; commit `d2561b7a`).
   - *Edit-an-embedded-section (S-D3 fail-leg — the Task 6 open item, CLOSED at 8.1)*:
     scratch edit to governance/Token-Governance.md § "Token Usage Governance" →
     `diff-guard: FAIL (input-closure-changed)` naming
     `changed: canonical/_fixture-output/cc/.claude/agents/_fixture.md` → revert →
     `no-op-green` (task-8-1-completion.md).
4. **Sweep-2 round-trip over the relocated skills, both targets.** Standing-report run at
   closure: `122-sweep-2-skills: PASS — 0 fail, 0 unadjudicated, 0 adjudicated, 0 info`
   (6↔6 rows; CC discovery contract incl. byte-equal activation descriptions; Kiro paths +
   `skill://` refs). Re-runs on every PR as a required check.
5. **The fixture's first clean end-to-end pass** (Req 23 AC4's content-agnosticism
   evidence): `canonical/agents/_fixture.md` → validate → resolve (live corpus session) →
   emit through BOTH adapters → committed under `canonical/_fixture-output/{cc,kiro}/`
   with attribution sidecars + per-target ambient manifests. Standing (inside C6's guarded
   surface). Its first pass caught and fixed three real defects — task-8-1-completion.md.
6. **C12 provisioning complete, Stacy-confirmed.** `canonical/coverage-map.yaml` (215
   surfaces / 214 guarded / 1 adjudicated blank) + derived `coverage-manifest.yaml` +
   `npm run audit:coverage-map` (PASS). **Closure cites Stacy's CONFIRMED validation**
   (Stacy amendment 6 — not merely the green script):
   > [STACY — Task 8.2 coverage-map validation] CONFIRMED — zero blank rows or
   > adjudicated-per-blank; S-D1 derivation verified; 2026-07-10
   (Full record + her routed items' dispositions: task-8-2-completion.md. She re-affirms
   on this PR — her recorded PR entry is the standing coverage-of-coverage seat.)

## Reviewer's reading order (Stacy amendment 2 — U1 carries Tasks 1–8 as ONE PR)

| # | Read | What to look for |
|---|---|---|
| 1 | `completion/task-1-parent-completion.md` | The canonical root + schema (C1, 5 validate rules) and the shared substrate files — the vocabulary everything else uses. Open item 2 (crossRef TODO) was RESOLVED 2026-07-10 (interim target, Peter-approved — see task-7-1). |
| 2 | `completion/task-2-parent-completion.md` | The pipeline engine (resolve/render/compose/attribution) — pure stages, injectable corpus. |
| 3 | `completion/task-3-parent-completion.md` | Skills relocation to the neutral root + the round-trip table — `.kiro/skills` became a generated output. |
| 4 | `completion/task-4-parent-completion.md` | The declaration-keyed registry (index never enters) — the carve-out is structural. |
| 5 | `completion/task-5-parent-completion.md` | The TargetAdapter seam; CC-first then Kiro landing zero-pipeline-change (Req 24 AC3 verified). Open item 1 (Kiro rich knowledgeBase objects) rides to Ada's cutover. |
| 6 | `completion/task-6-parent-completion.md` | The C6 guard + DD7 closure lock (governance/steering in-closure) and C7's five classes — the crux of generate-don't-curate. |
| 7 | `completion/task-7-{1,2,3,parent}-completion.md` | Eight sweeps with prove-it-bites (sweep 3's live bite found FOUR double-loading configs); ten contexts REGISTERED as required checks (N=17 count-asserted). The interim-crossRef visibility backstop lives in sweep 1. |
| 8 | `completion/task-8-{1,2}-completion.md` + this doc | The fixture (3 defects caught live incl. a C7 parser gap that would have false-failed every cutover), C12 + Stacy's confirmation, and this closure bundle. |

## Carried forward to Group 2 (named here so the cutovers inherit them)

- **`.claude/agents` joins `guardedRoots()` at each CC cutover** (Stacy routed item 3) —
  else emitted agents sit outside both the guard and the coverage-map universe.
- **Every canonical agent's docs subset must include `find_docs`** (Req 10 AC6 coupling,
  fail-loud proven at 8.1).
- **Four hand configs double-load `Product-Token-Governance.md`** (data/kenya/leonardo/
  sparky) — resolves per-agent at cutover under sweep 3.
- Kiro rich `knowledgeBase` resource objects → schema carry at Ada's cutover (Task 5 item).
- `expected-empty` KnowledgeBaseDeclaration schema one-liner (Task 6 item) — still open.
- Sweep 5 is registered PRE-CUTOVER ONLY; its removal after the last cutover updates
  `verify-gate-registration.sh`'s set + count in the same recorded protection change.

## Validation (Tier 3)

- Full suite: `npm test` → **8987/8987** (377 suites). Root `tsc --noEmit` clean; project
  tsc clean. Lane: **306/306** (26 suites).
- All ten check CLIs green on the closure state; `audit:coverage-map` PASS; diff-guard
  `no-op-green` at commit time (lock current).
- Platform evidence completes on THIS PR: the ten required contexts run live here — their
  first CI URLs are visible on the PR checks tab (the Task 6/7 bite records carry the
  local-run evidence; the PR is the platform-level record).

## Delegated-tier capture

8.1 + 8.3 main loop (Fable 5 — crux wiring + gate documentation); 8.2 build delegated to a
**Sonnet** subagent (settled S-D1 design), verified in the main loop; 8.2 validation by the
**Stacy agent** (session-model tier — the audit gates the closure). Conscious tiering;
divergence from the rote `Agent: Thurgood` stamps recorded per the exception-based rule.
