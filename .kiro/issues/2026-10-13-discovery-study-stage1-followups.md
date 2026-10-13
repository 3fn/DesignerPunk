# Discovery study Stage 1 — routed follow-ups (hand-fixes + discoveries) — ROUTING RECORD

**Date**: 2026-10-13
**Type**: ROUTING RECORD — the follow-ups the merged Stage 1 findings (`.kiro/docs/discovery-study-stage1-findings.md`, #315) owe to owners. Each row is a separate owner action on its own PR; nothing here is done. The Stage 1 charter archives on this record's merge.
**Owner**: rows below (Lina, Thurgood, Leonardo, Ada). **Walk**: Thurgood.
**Trigger**: each row's owner's next docs session; **row 6 (alias-hygiene re-run) gates rows 1–3** — no alias lands without it.
**Grant paths**: none here (doc owners edit their own docs under their charters; the indexer fix has its own issue + grant).
**Consulted**: none needed — relay of the merged findings' § 4 and § 7; owners act.
**Class option (Peter, "keep the class options coming")**: row 6 — an **alias-hygiene re-run** as a standing rule: any PR adding a `aliases:` entry re-runs `scripts/discovery-study-stage1.ts` (oracle + frozen Q2, read-only) and shows no new confident-wrong and no regression. Cost: one command in the PR body; no new tooling. Rationale: KE-N2 — an alias seeded in 119-A to lift one oracle query manufactured a `strong` on an unrelated negative. Fixing three aliases without this check repeats the pattern.

---

## Hand-fixes (findings § 7, O1) — each doc's owner, own PR, AFTER the alias-hygiene re-run (row 6)
| # | Id | Doc | Owner | Alias | State |
|---|---|---|---|---|---|
| 1 | DA-02 | `component-development-guide` | **Lina** | "Theme-varying tokens — read from CompositionLocal" (accepted; verbatim guide L997) | tested → rank 1 strong (§ 6.7); still re-run under row 6 before landing |
| 2 | DA-11 | `platform-implementation-guidelines` | **Lina** | "TalkBack semantics" (her choice, from the doc's § 4 table) | **UNTESTED — re-run owed** |
| 3 | DA-05 | `test-development-standards` | **Thurgood** | not yet chosen | **re-run owed** |

## Discoveries (findings § 4) — routed, not fixed
| # | Discovery | Owner(s) | Action |
|---|---|---|---|
| 4 | D-1 cross-domain contradiction on `.dp`: `rosetta-system-architecture` § "Token Consumption Rule" (pre-unitized, never append `.dp`) vs `platform-implementation-guidelines` § "Android Token Usage: The `.dp` Pattern" (`Float`, `.dp` required) | **Ada + Lina** (Civitas cross-domain path: steward flags → both review → Peter arbitrates if they disagree) | adjudicate; one doc changes |
| 5 | D-2 product-token guidance duplicated: `web-authoring-standards` § "Product Token Authoring (Sparky)" vs `product-token-governance` | **Thurgood flags → Sparky/Ada adjudicate** (content consistency) | decide the canonical home; the other becomes a pointer |
| 6 | **Alias-hygiene re-run (the class option above)** | **Thurgood** (owns the runner and the docs rubric) | record as a rule on the docs-rubric's alias section (owner knob, dated amendment, no ballot) and in the PR-body convention; rows 1–3 wait on it |
| 7 | D-3 "where do product-screen files live?" — asked by three seats, no doc answers; charters route it to `process-file-organization`, which covers THIS repo's layout | **Leonardo** (consumer front door: the doc gap) + **Thurgood** (a ballot on the routing-cue wording in the seat charters) | Leonardo: where the answer should live (Integration Guide rewrite charter 2026-10-03 is the likely home); Thurgood: ballot draft |
| 8 | D-4 ST-05's answer is an H4 (still passed via other headings) | **Thurgood** | folded into `2026-10-13-find-docs-indexer-defects-from-stage1.md`; no separate action |
| 9 | D-5 Android "role heading" (`semantics { heading() }`) documented nowhere | **Lina** | content-debt queue (`2026-08-25-contract-education-content-debt.md` or her next docs session) |

## Also owed (study charter)
- **Leonardo's Q2-L addendum** — after his Settings ledger closes: same sealed prompt (+ one line allowing ~15–20 queries), own pre-registration SHA, own results line in the findings doc (Thurgood keys; Leonardo's filter pre-freeze).
- **Indexer fix** — `2026-10-13-find-docs-indexer-defects-from-stage1.md` (Thurgood; grant required; H3 indexing is not a free fix; one answer is an H4).

## What the walk checks
Row 6 recorded before any of rows 1–3 land (an alias PR without the re-run line → finding). Rows 4, 5, 7 dispositioned within two walks. Then `git mv` to `archive/`.
