# Thurgood Consult — F7 Execution Mechanics (2026-09-13, pre-spec record)

*Transcribed from the F7 adjudication session's consult (Thurgood, execution-mechanics review). Condensed faithfully. This record is a Spec 127 design input. Note: portions are superseded or amended by the Stacy consult (same date) — B1 amends the draft rule text (evidence cell required); S2 supersedes the recording-form recommendation (ballot-grade, which Thurgood's own counter-consideration anticipated).*

## Placement (confirmed by inspection)

| File | Role |
|---|---|
| `governance/completion-documentation-guide.md` | Primary home for the rule content (table requirement, ⚠️/❌ convention, follow-up-link rule). MCP-served Layer 2; Task-Completion-Protocol already points here for depth. No existing subsection covers criteria-table fidelity. |
| `.kiro/steering/Task-Completion-Protocol.md` | **One-line pointer only**, in both PARENT TASK sequences' "Create completion doc" bullets. Layer 1, always-loaded via CLAUDE.md's live `@`-import. **Directly editable** — confirmed NOT generator output (no canonical/** template source; git history shows direct content PRs). No 122 regeneration needed. |
| `governance/classification-map.md` | New register entries, same PR. |
| *(Stacy adds)* `governance/Process-Spec-Planning.md` | Tier-3 parent template restore (the pre-existing stronger standard lives here at :1818-1853). |

Reindex: one `rebuild_index` covering the changed governance docs. No reindex for the TCP pointer (not MCP-served).

## Recording form

Original recommendation: issue-driven ruling + PR-merge-as-ratification (#141/F5 precedent). **Counter-consideration recorded in the same consult**: this touches Layer-1 operational law — "if you want Layer-1-law changes to always go through the heavier ballot form as a matter of course, that's a reasonable standing preference." **Stacy's S2 resolves this: ballot-grade** (2026-07-05-documentation-task-type precedent — same documents, balloted, Stacy required reviewer). Adopted direction for Spec 127: record-first ballot.

## 125-B classification discipline

- **Not on Wave 3's watchlist** (confirmed vs tasks.md §5.4: C7 canonical headers/steering prose, C8 token docs, C9 color guidance — completion-documentation-guide and TCP are neither).
- **Prune scar tissue**: Task-Completion-Protocol.md was a Wave-1 prune target (closed, `cbf9929c`). Keep the TCP addition a POINTER only — never a restated imperative block — to avoid re-accreting what Wave 1 removed.
- **Birth registration**: register entries land with the rule (living-register discipline; prevents future-imposter and unregistered-armed-check failure modes). Original draft used `check_state: none` ("proposed would overclaim — nothing queued"); under the full-package ruling the parity check IS queued to build, so `proposed` (and `build` when scheduled) becomes correct — align states with what the spec actually schedules.
- Mechanization posture: note "mechanization deferred, process-first (core-goals prove-manual-first)" only for the parts genuinely deferred (modified-vs-diff), not for the parity checker the spec builds.

## Draft rule text (v1 — AMENDED by Stacy B1: add the mandatory Evidence column; make exact-set explicit)

For `governance/completion-documentation-guide.md` (new subsection "Parent Success-Criteria Fidelity"):

> A parent task's completion doc's criteria/verification table MUST reproduce every success-criterion row defined for that parent in tasks.md — verbatim, in full, none dropped, none reworded to soften an unmet result *(B1 amendment: and none ADDED — exact set)*. Each row's mark must reflect a check actually performed against shipped source, not against intent or effort:
> - ✅ verified met · ⚠️ verified unmet/partial (MUST link a tracking issue or follow-up task) · ❌ verified absent (the "3.3 pattern" — a tested module created, the seam it was meant to reach never touched)
> *(B1 amendment: three mandatory columns — `Criterion (verbatim) | Status | Evidence (artifact path, test name, or command + result)`; a ✅ with an empty or prose-only Evidence cell is non-compliant.)*
> Never omit a row to avoid reporting bad news. Never mark ✅ without having checked the row against what actually shipped.

For `.kiro/steering/Task-Completion-Protocol.md` (append to the "Create completion doc" bullet, both parent sequences):

> — reproduce every tasks.md success-criterion row verbatim; mark unmet rows ⚠️/❌ with a follow-up link (Completion Documentation Guide § "Parent Success-Criteria Fidelity")
