# `find_components` keyword path — lexical defects and copy-pasted sibling metadata (DEFECT RECORD, routed)

**Date**: 2026-10-07
**Type**: DEFECT RECORD with routed owner — surfaced during the design consults for the discovery shadow study (`2026-10-07-discovery-shadow-study-charter.md`), not by any production incident
**Owner**: **Lina** (Stemma; `application-mcp-server/**` is inside her charter write scope — confirmed by Lina 2026-10-07, so the fixes need no grant). **Thurgood consulted** on the rank tie-breaker (it amends the Spec 121 components rubric decision record; precedent: docs `TITLE_RANK_TIEBREAK`, Peter-approved as rank-only, Spec 119-A) and on item 5.
**Trigger**: **Peter's ruling on fork F1 of the study charter** (all three consulted owners recommend authorizing the fixes now) → Lina opens the fixing PR(s). **No fix is authorized until that ruling.**
**Grant paths**: none needed (owner scope covers the surface).
**Contamination rule (binding on the fixer, from the study charter)**: fixes are driven ONLY by the defects recorded here and by the existing calibration tests in `application-mcp-server/src/__tests__/tool-boundary.contract.test.ts`. Neither the study's Q3 component fixture nor the sealed seat-written queries may be seen by whoever makes the fixes before the fixes merge.

---

## 1. Verified reproductions (orchestrator, live Application MCP, 2026-10-07)

| Query | Rank 1 (tier) | Why | Should have been |
|---|---|---|---|
| `a toast for errors` | Avatar-Base (strong) | the token `a` matched a high-signal field | nothing exists → no `strong` |
| `toggle` / `switch to turn a setting on or off` | Chip-Filter (strong) | stopwords `to/a/on/or/off` matched high-signal fields | nothing exists → no `strong` |
| `tabs` | Badge-Count-Base (strong) via `navigation-tabs` context | `tabs` ≠ `tab`; no plural folding | Nav-TabBar-Base (outside top 2) |
| `email field with validation` | Input-Checkbox-Base (strong) | `with` matched high-signal; `validation` is a contract-category token (high-signal) | Input-Text-Email (not in top 3) |
| `loading spinner while data fetches` | Avatar-Base (**partial**) above Button-CTA (**strong**, rank 2) | sort is coverage then alphabetical; tier is ignored | Progress-Bar-Base indeterminate (absent) → ideally no `strong` |
| `progress through onboarding steps` | Progress-Indicator-Connector-Base (strong) | the seven Progress-* share identical `whenToUse` → tie → alphabet | Progress-Stepper-Base / -Detailed |
| `bottom navigation between sections` | Nav-TabBar-Base (strong) ✓, Avatar-Base **strong at rank 2** on `between` | stopword | rank 2 is confident-wrong |

Source of record for the first three: Lina R1; for the rest: Leonardo R1 (study consult pass 3). Orchestrator re-ran rows 4 and 5 verbatim.

## 2. The defects

1. **No stopword filter** in the components tokenizer (`application-mcp-server/src/indexer/ComponentIndexer.ts`, tokenizer ~L128–141). The docs matcher has one (`mcp-server/src/query/stop-words.ts`). Because a single high-signal token hit is already `strong` (rubric clause 1), a stopword landing in `purpose` manufactures `strong`.
2. **No plural folding** (`tabs` ≠ `tab`).
3. **Rank ignores tier**: results sort by coverage, then name (`application-mcp-server/src/query/QueryEngine.ts`, sort block after `deriveMatchConfidence`). A `partial` can outrank a `strong`; alphabetical order breaks every tie. Fix candidate: tier-aware, then name-hit, then coverage — Thurgood's consult owed since it amends the rubric's decision record.
4. **Copy-pasted sibling metadata (content, not tokenizer)** — verified by grep 2026-10-07: the whenToUse block beginning "Triggering user actions (submit, save, cancel)" is pasted verbatim into all four `Button-*/component-meta.yaml`; the six-entry FormInput `alternatives` list beginning "When email address collection" is pasted into seven `Input-*/component-meta.yaml` (Checkbox-Base, Checkbox-Legal, Radio-Base, Radio-Set, Text-Base, Text-Password, Text-PhoneNumber). Leonardo reports the same across the seven Progress-* siblings. Identical text ⇒ identical coverage ⇒ alphabetical winner. No matcher of any kind (lexical, embedding, discriminative) survives this; the study charter makes de-duplication a precondition of its components round (fork F1b: fold into this issue or split).
5. **Contract-category names are high-signal tokens** (`validation`, `interaction`, …): a query containing "validation" hits every validatable component at `strong`. Open rubric question for Lina + Thurgood — not a tokenizer fix; may be intentional.

## 3. Not in scope here
The components `aliases` set is never populated (no indexer plumbing) and aliases are low-signal by deliberate rubric (Req 1.9). Lina's ruling 2026-10-07: intentional, keep; becomes a defect only if the study's outcome O2 fires for components.

## 4. What the walk checks
Has F1 been ruled? Ruled-yes with no fixing PR after one walk → finding. Fixing PR merged → record the SHA here, re-run the seven reproductions, record results, `git mv` to `archive/`.
