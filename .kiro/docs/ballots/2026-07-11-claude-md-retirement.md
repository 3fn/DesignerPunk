# Ballot Measure: Retire the interim `CLAUDE.md` stopgap (OB-7 closure)

**Date**: 2026-07-11
**Author**: Thurgood (Civitas steward) / Spec 122 Task 17
**Status**: **RATIFIED (Peter, 2026-07-11)** — approved. Ratified record-first per the README protocol: this record is
committed **before** the U10 swap PR (#66) merges. It changes an always-loaded governance delivery surface, so it stays
Peter-merged (the governance-law carve-out); merging #66 applies the retirement — the ratified swap PR is the OB-7
closure record (Req 16 AC3).
**Purpose**: Retire the interim hand-maintained `CLAUDE.md` by superseding it with the Spec 122 generator's output, so
there is exactly one always-layer mechanism per runtime (Req 16 AC2). Closes OB-7.

---

## The Problem (why the interim retires now)

`CLAUDE.md` was created in 119-A wrap-up as an **explicit interim stopgap** (its own banner says so): Claude Code has
no `inclusion: always` equivalent, so this file restored the CC always-layer by hand-maintaining `@`-imports of the 9
identity/steering docs. It was tracked as **OB-7** with a standing instruction: *"When 122 lands, retire or supersede
this file … do not let `CLAUDE.md` and the 122-generated ambient layer coexist."*

Spec 122 has now landed. All 8 agents are generator-SSOT (U2–U9 merged), and the generator emits the CC always-layer
on both C11 lanes: lane 2 (per-agent inline) has emitted per-cutover; lane 1 (the shared `CLAUDE.md` `@`-imports) is
wired in Task 17.1. **Two always-layer mechanisms now exist** (the hand-maintained `CLAUDE.md` and the generated one) —
the exact coexistence OB-7 forbids. This ballot retires the hand-maintained one by making `CLAUDE.md` a generated,
diff-guarded output.

## Before → After (the swap)

**Site**: `./CLAUDE.md` (repo root).

- **BEFORE** — hand-maintained interim (48 lines): a `# DesignerPunk — Project Context` heading, the
  `⚠️ INTERIM STOPGAP` explanation block, the 9 `@`-import lines, and a fallback note. Hand-edited; not guarded.
- **AFTER** — generated output (C11 lane 1): a `GENERATED FILE — do not hand-edit` banner + the 9 `@`-import lines,
  produced by `CcAdapter.emitAlwaysLayer` from `canonical/shared/always-set.yaml` (id→path at emit time, case-correct)
  and **diff-guarded** (a hand-edit is now a loud diff-guard failure; `CLAUDE.md` is in `guardedRoots`).

**Delivery is preserved, not changed.** The 9 `@`-import lines are **byte-identical** between before and after (same
docs, same case-correct paths) — verified by diff. Only the surrounding prose changes: the stopgap explanation → the
generated banner. The always-layer an agent receives is unchanged; the *maintenance mechanism* moves from hand to
generator.

## Evidence

- **Probe-subagent test — POSITIVE** (`.kiro/specs/122-agent-generator/cutover/ob7-probe-evidence.md`): a spawned
  subagent confirmed all 9 always-layer docs, recited the certainty-calibration rule (`strong`/`partial`/`none`), and
  recited a deep-detail content canary (squash-merge-only, from Task-Completion-Protocol) — proving the `@`-import
  delivers live doc **content**, not a hollow reference. Fresh-session re-probe of the generated file is the post-merge
  confirmation (CLAUDE.md snapshots at session start).
- **`@`-import equivalence**: `diff` of the before/after `@`-import sets → identical (delivery mechanism preserved).
- **All checks green**: the ten `122-*` checks + coverage-map (CLAUDE.md now a guarded surface), generator lane
  330/330, tscs clean, root + mcp-server suites green.

## Scope

- **In scope**: the in-repo `./CLAUDE.md` becomes a generated, diff-guarded output; the interim hand-maintained content
  is superseded (folded into generated output, Req 16 AC2); OB-7 closes.
- **Out of scope**: consumer-side CC always-layer delivery (the product that installs DesignerPunk) — that is 123
  (Req 16 AC4). This ballot touches only in-repo agents.

## Reviewers

Per the Spec-Feedback-Protocol: **Thurgood** (Civitas steward — author + the always-layer's infrastructure owner) and
**Stacy** (product governance & QA). The substance (the generated always-layer) was already validated across all 8
cutovers and the Task 17.1 probe; this ballot review confirms the retirement mechanics + records the ratification.

## Application (record-first)

1. Peter ratifies → this ballot's `Status` is updated to `RATIFIED (Peter, <date>)` and **committed** (on the U10
   branch) before merge.
2. The swap is already staged on the U10 branch (`CLAUDE.md` regenerated; `emitAlwaysLayer` wired; `CLAUDE.md`
   guarded). The **ratified swap PR is the retirement record closing OB-7** (Req 16 AC3).
3. `119-B-deferred-obligations.md` § OB-7 → `CLOSED`, referencing this ballot + the swap PR.
4. Confirm no coexistence: after merge, the only always-layer mechanism per runtime is the generator (Kiro:
   `inclusion: always` + per-agent resources; CC: generated `CLAUDE.md` lane 1 + per-agent inline lane 2).

---

**Status: `RATIFIED (Peter, 2026-07-11)`** — ratified record-first (this record committed before merge). Merge the U10
swap PR (#66) to apply the retirement; the ratified swap PR is the OB-7 closure record.
