# Task 17 Completion (Parent): OB-7 — generate the CC always-layer + retire the interim CLAUDE.md

**Date**: 2026-07-11
**Task**: 17 — OB-7 retirement (Parent, Unit U10, Tier 3)
**Spec**: 122-agent-generator
**Branch**: task/122-ob7-claude-md (single-parent unit — opens U10's PR; governance-law carve-out — Peter-merged)
**Type**: Implementation (17.1 — engine) + Documentation (17.2 — record-first ballot)

> **Ratification gate**: this is a governance-law retirement (it changes an always-loaded delivery surface). Per the
> record-first protocol, the ballot must read `RATIFIED (Peter, <date>)` and be committed **before** the swap PR merges.
> The PR carries the staged swap + the ballot in `DRAFT`; **it must NOT merge until Peter ratifies.**

---

## Success criteria — met (retirement pending ratification)

1. **Both C11 delivery lanes emit from the generator** ✅ — lane 2 (per-agent inline) has emitted per-cutover (U2–U9);
   **lane 1 (the shared `CLAUDE.md` `@`-imports) is now wired** (17.1): `generateAll` calls `CcAdapter.emitAlwaysLayer`,
   which generates `CLAUDE.md` from `canonical/shared/always-set.yaml` as live `@`-import references (id→path at emit
   time, case-correct) + a generated banner. Kiro correctly emits nothing (it delivers via per-agent resources +
   `inclusion: always`).
2. **Probe-subagent test recorded — POSITIVE** ✅ — `cutover/ob7-probe-evidence.md`: a spawned subagent confirmed all
   9 always-layer docs, recited the certainty-calibration rule (`strong`/`partial`/`none`), and recited a deep-detail
   content canary (squash-merge-only) — proving the `@`-import delivers live doc **content** (resolution, not a hollow
   reference). Byte-identical `@`-imports between interim and generated establish the evidence covers the generated
   file; fresh-session re-probe is the post-merge confirmation.
3. **The interim CLAUDE.md is superseded** ✅ (staged) — its curated stopgap prose replaced wholesale by generated
   content (banner + the 9 `@`-imports); `CLAUDE.md` is now a **guarded output** (`guardedRoots` + coverage-map). The
   retirement completes at the ratified swap PR's merge (Req 16 AC2/AC3). No coexistence past 122.
4. **Union integrity across lanes** ✅ — sweep 4 checks the union regardless of lane (Req 9 AC3), green.

## Engineering (17.1)

- `tools/agent-generator/generate.ts`: wired `emitAlwaysLayer` into `generateAll` (a new step after skills emission),
  building `steeringIdToPath` via `buildDocIdToPath` and passing it in the adapter context; added `CLAUDE.md` +
  `CLAUDE.md.attribution.json` to `guardedRoots`. `CcAdapter.emitAlwaysLayer` was already implemented (it just wasn't
  called or written) — this task wires it and guards its output.
- **The swap**: `CLAUDE.md` went from a 48-line hand-maintained stopgap → a generated banner + 9 `@`-imports (−38/+6).
  The 9 `@`-import lines are byte-identical (delivery preserved; only the surrounding prose changed).

## Retirement ballot (17.2, record-first)

- `.kiro/docs/ballots/2026-07-11-claude-md-retirement.md` (Status: **DRAFT**) — before→after, evidence, scope,
  reviewers (Thurgood + Stacy). Added to the ballots README on-record list.
- `119-B-deferred-obligations.md` § OB-7 → **CLOSED** (retirement record: the ballot + the ratified U10 swap PR;
  closes at that PR's merge). Consumer-side CC delivery stays out of scope (123, Req 16 AC4).

## Validation

All ten `122-*` checks + coverage-map green (`CLAUDE.md` now a guarded surface; diff-guard **no-op-green**);
generator lane **330/330** (engine change breaks nothing); root + generator tsc clean; root `npm test` + `mcp-server`
suites green (see the validation note in the PR). Prove-it-bites for the new guarded surface: a hand-edit to the
generated `CLAUDE.md` is now a loud diff-guard failure (CLAUDE.md is in `guardedRoots`).

## The path to merge (what's Peter's)

1. Open the U10 PR (swap staged + ballot DRAFT + probe evidence). **Report + STOP.**
2. **Peter ratifies** the ballot → the ballot's `Status` becomes `RATIFIED (Peter, <date>)`, committed on the branch
   before merge (record-first).
3. **Peter merges** the swap PR — the ratified swap PR is the retirement record closing OB-7.
4. Post-merge: a fresh session loads the generated `CLAUDE.md`; the fresh-session re-probe confirms delivery
   definitively (the interim's own 2026-06-29 verification used the same method).

## Remaining in Spec 122

**U11 — Closeout** (Task 18): 119-B/123 handbacks + discharge **OB-8** (routing backfill + C7(b) strict-check) and
**OB-9** (owner-value audit); retire sweep-5's pre-cutover context.
