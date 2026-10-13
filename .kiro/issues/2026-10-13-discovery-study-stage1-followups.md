# Discovery study Stage 1 — routed follow-ups (hand-fixes + discoveries) — ROUTING RECORD

**Date**: 2026-10-13
**Type**: ROUTING RECORD — the follow-ups the merged Stage 1 findings (`.kiro/docs/discovery-study-stage1-findings.md`, #315) owe to owners. Each row is a separate owner action on its own PR; nothing here is done. The Stage 1 charter archives on this record's merge.
**Owner**: rows below (Lina, Thurgood, Leonardo, Ada). **Walk**: Thurgood.
**Trigger**: each row's owner's next docs session; row 6 is RECORDED (2026-10-13) — rows 1–3 are unblocked and each alias PR carries the re-run line.
**Grant paths**: none here (doc owners edit their own docs under their charters; the indexer fix has its own issue + grant).
**Consulted**: none needed — relay of the merged findings' § 4 and § 7; owners act.
**Class option (Peter, "keep the class options coming")**: row 6 — an **alias-hygiene re-run** as a standing rule: any PR adding a `aliases:` entry re-runs `scripts/discovery-study-stage1.ts` (oracle + frozen Q2, read-only) and shows no new confident-wrong and no regression. Cost: one command in the PR body; no new tooling. Rationale: KE-N2 — an alias seeded in 119-A to lift one oracle query manufactured a `strong` on an unrelated negative. Fixing three aliases without this check repeats the pattern.

---

## Hand-fixes (findings § 7, O1) — each doc's owner, own PR, AFTER the alias-hygiene re-run (row 6)
| # | Id | Doc | Owner | Alias | State |
|---|---|---|---|---|---|
| 1 | DA-02 | `component-development-guide` | **Lina** | "Theme-varying tokens — read from CompositionLocal" (accepted; verbatim guide L997) | **LANDED on PR fix/stage1-alias-hand-fixes-lina (2026-10-13), re-run clean: DA-02 → rank 1 strong; no collateral** |
| 2 | DA-11 | `platform-implementation-guidelines` | **Lina** | "TalkBack semantics" (her choice, from the doc's § 4 table) | **LANDED on the same PR as alias `TalkBack semantics contentDescription` (her one allowed alternative; `TalkBack semantics` alone left DA-11 at rank 15): DA-11 → rank 1 partial, passes; no collateral** |
| 3 | DA-05 | `test-development-standards` | **Thurgood** | — | **NO-GO → ANSWER-KEY ERROR (2026-10-13).** Scratch test: the only lifting alias (L1192, "Validates structure, naming, and configuration at development time") plants a `strong` on a doc that does not answer how to structure or name a screen test — the KE-N2 harm aimed at a positive. Per the charter, key errors found after results are COUNTED AND EXCLUDED, never edited: gate-counted 6 → 5, O1 holds. The missing screen-test conventions become a CONTENT item for Thurgood to write into the doc. Findings doc owes a dated addendum under his next grant. |

## Discoveries (findings § 4) — routed, not fixed
| # | Discovery | Owner(s) | Action |
|---|---|---|---|
| 4 | D-1 cross-domain contradiction on `.dp`: `rosetta-system-architecture` § "Token Consumption Rule" (pre-unitized, never append `.dp`) vs `platform-implementation-guidelines` § "Android Token Usage: The `.dp` Pattern" (`Float`, `.dp` required) | **Ada + Lina** (Civitas cross-domain path: steward flags → both review → Peter arbitrates if they disagree) | adjudicate; one doc changes |
| 5 | D-2 product-token guidance duplicated: `web-authoring-standards` § "Product Token Authoring (Sparky)" vs `product-token-governance` | **Thurgood flags → Sparky/Ada adjudicate** (content consistency) | decide the canonical home; the other becomes a pointer |
| 6 | **Alias-hygiene re-run (the class option above)** | **Thurgood** | **RECORDED 2026-10-13** (Peter: "go the class option") — dated amendment at `.kiro/specs/121-claude-code-portability/discovery-confidence-rubric.md` L71–100 (after the Docs rubric block): re-run at the PR head AND at the merge-base on `main`, compare the per-query tables; both sides' `aliases:`; components use `tool-boundary.contract.test.ts` until a components fixture exists; oracle and Q2 both "matcher training set, still a valid alias regression guard"; the frontmatter `aliases` field is now named in the docs high-signal list (L62). Becomes a ballot only if made a required CI check. **Rows 1–3 UNBLOCKED** — Lina's DA-02 is the first use. |
| 7 | D-3 "where do product-screen files live?" — asked by three seats, no doc answers; charters route it to `process-file-organization`, which covers THIS repo's layout | **Leonardo** (consumer front door: the doc gap) + **Thurgood** (a ballot on the routing-cue wording in the seat charters) | Leonardo: where the answer should live (Integration Guide rewrite charter 2026-10-03 is the likely home); Thurgood: ballot draft |
| 8 | D-4 ST-05's answer is an H4 (still passed via other headings) | **Thurgood** | folded into `2026-10-13-find-docs-indexer-defects-from-stage1.md`; no separate action |
| 9 | D-5 Android "role heading" (`semantics { heading() }`) documented nowhere | **Lina** | content-debt queue (`2026-08-25-contract-education-content-debt.md` or her next docs session) |

## Found while landing rows 1–2 (routed)
| # | Finding | Owner | Action |
|---|---|---|---|
| 10 | `cd mcp-server && npx jest` run in PARALLEL fails intermittently: `token-efficiency.test.ts` and `performance.test.ts` both delete the shared `mcp-server/test-fixtures` dir and race (`ENOTEMPTY`); `--runInBand` passes 39/660. Pre-existing; unrelated to aliases. | **Thurgood** (test-suite health) | isolate the fixture dir per suite or serialize the two; CI lane check |

| 11 | **Components tokenizer has the "iOS" defect too**: `tokenizeString` (application-mcp-server/src/indexer/ComponentIndexer.ts L129–141) camelCase-splits "iOS" → `i`+`os`. Found by Thurgood designing the docs indexer fix (2026-10-13). | **Lina** | duplicate the versioned atoms list (iOS, iPadOS, macOS, tvOS, watchOS, iPhone, iPad) with cross-citing headers (the scorer precedent); own PR; her alias/calibration suite as the re-run |

## Also owed (study charter)
- **Leonardo's Q2-L addendum** — after his Settings ledger closes: same sealed prompt (+ one line allowing ~15–20 queries), own pre-registration SHA, own results line in the findings doc (Thurgood keys; Leonardo's filter pre-freeze).
- **Indexer fix** — `2026-10-13-find-docs-indexer-defects-from-stage1.md` (Thurgood; grant required; H3 indexing is not a free fix; one answer is an H4).

## What the walk checks
Row 6 recorded before any of rows 1–3 land (an alias PR without the re-run line → finding). Rows 4, 5, 7 dispositioned within two walks. Then `git mv` to `archive/`.
