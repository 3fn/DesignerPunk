# Task 1 Summary: The Parent Success-Criteria Fidelity law

**Date**: 2026-09-19
**Purpose**: Concise summary of parent task completion
**Organization**: spec-summary
**Scope**: 127-completion-claims-integrity

## What Was Done

Parent completion docs must now reproduce **every** success criterion their `tasks.md` defines — verbatim, as an exact set, with a Status mark and real Evidence on each row, plus a forced-negative line that silence cannot satisfy. The law was authored as a ratified ballot and applied across five governance surfaces: the Completion Documentation Guide (the rule itself), Process-Spec-Planning (the Tier-3 standard, a replaced worked example, and new `tasks.md` structural conventions), the Task-Completion-Protocol (a pointer in both parent sequences), RELEASE-FLOW (a claims-pass owed-set step), and the Product-Handoff-Protocol (committed Implementation Reports). Five rows were added to the classification-map register, and the Spec 112 audit's last open finding — F7 — now reads *addressed by Spec 127*.

## Why It Matters

Spec 112's audit found that unmet criteria were not being marked failed — they were being dropped, reworded, or relaxed out of the verification table, and two of those escapes reached consumers. Measured across the corpus, **0 of 22** in-scope parent completion docs carried any failure vocabulary, because the template offered nowhere to write it. This is a template defect fixed at the template, plus the machine-readable convention a checker can later enforce.

## Key Changes

- **New guide section** — the exact-set criteria table, four Evidence kinds, four normalization rules, the forced-negative line, the Additional verification section with a fixed deferral form, and a fixed in-flight exemption string
- **Process-Spec-Planning** — Tier 3 gains failure vocabulary; the canonical worked example is replaced (its Evidence cells modelled effort, not verification); a new conventions section fixes the criteria-mode declaration, the canonical Declared Merge Units block, per-platform decomposition as law, and a mechanical definition of "materially amended"
- **Five register rows**, each honest about what it does not yet do — one proposed checker, two deferred checks, one doc-presence check with its known false-positive class named, and one ideological row that **no check will ever own**
- **Nothing is armed.** The checker is built in the next unit and lands non-required; the required flip is a separately guarded decision

## Impact

- ✅ Unmet criteria now have a place to be recorded, and silence no longer passes
- ✅ The canonical example teaches verdicts-with-evidence instead of activity prose
- ✅ Claim honesty is registered as **unowned by machinery, permanently and on purpose** — the metrics that matter are the ones no check can produce

## Honest caveat

Nothing here makes claim honesty solved or guaranteed. A plausible-looking Evidence path is green to any checker regardless of truth, and for iOS and Android "command + result" evidence is trust-the-reported-result for every verifier in this environment. **Any future reading of a green gate as evidence of claim honesty will have made the error this spec exists to prevent.**

This task's own completion doc carries **two ⚠️ rows** under the rule it ships — one criterion discharged by replacing a defective instrument rather than satisfying its wording, and one whose "every element" clause is deliberately not literally true. Both are recorded rather than rounded up.

---

*For detailed implementation notes, see [task-1-completion.md](../../../.kiro/specs/127-completion-claims-integrity/completion/task-1-completion.md)*
