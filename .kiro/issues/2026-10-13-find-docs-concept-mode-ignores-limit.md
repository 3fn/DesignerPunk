# Defect: `find_docs` concept mode ignores `limit` (and `cursor`)

**Date**: 2026-10-13
**Type**: DEFECT RECORD + grant (README rule 8). Two PRs: this record, which Peter merges to activate the grant, then the one fixing PR on the paths below.
**Owner**: **Thurgood** (docs matcher).
**Trigger**: Peter's merge of this record starts the fixing PR. **Backstop**: if the fix is unexecuted at the next monthly Civitas health check, that is a walk finding against Thurgood.
**Origin**: Settings call ledger, friction item 5 (`archive/2026-10-12-leonardo-settings-call-ledger.md` L213, row S3 at L90). It was first routed to Spec 123 U3. Thurgood's conformance note on #347 re-routed it here as a docs-matcher defect, and Peter gave the go on 2026-10-13.
**Grant paths** (Thurgood's write scope over exactly these, on the one fixing PR, until it merges; activated by this record's merge):
- `mcp-server/src/query/QueryEngine.ts`
- `mcp-server/src/query/__tests__/find-docs-limit.test.ts` (new)
- `mcp-server/src/tools/find-docs.ts`: the `cursor` input-schema **description string only**, under option (a) below.
- `.kiro/issues/2026-10-13-find-docs-concept-mode-ignores-limit.md` (this file: outcome block, then `git mv` to `archive/`)

**Not granted**: `mcp-server/src/index.ts`. Its `find_docs` case (L161–169) already passes `limit` and `cursor` through to `handleFindDocs` unchanged, so no edit is needed. Nothing under `scripts/**`.
**Consulted**: none needed. This is the author's own matcher defect, surfaced in his conformance note; record plus grant is the standard path.

---

## 1. The defect (source at `9cb59e1da`)
- `mcp-server/src/query/QueryEngine.ts`:
  - **L325** `findDocs` destructures `{ concept, list, cursor, limit }`.
  - **L333** List mode passes `{ cursor, limit }` to `findDocsList`.
  - **L336** Concept mode calls `findDocsConcept(allDocs, concept.trim())` and **drops both `limit` and `cursor`**.
  - **L884–913** Only `findDocsList` applies the bound: L888 defaults to `FIND_DOCS_DEFAULT_LIMIT` (20, L562), L890 caps at ×5 (100), L898 slices, and `nextCursor` is set when more results remain.
- **The tool's own contract says otherwise.** `mcp-server/src/tools/find-docs.ts` L66–70 describes `limit` as "Max results per page (default 20). Bounded for token-limit safety", with no mode restriction. In practice concept mode returns **every** match, unbounded.

## 2. Observed effect (Settings ledger, row S3)
`find_docs({concept:"product data directory overview.yaml experience-map pages domain-objects format", limit:6})` returned **75** entries. The doc that answered the question ranked 43rd.

The cost is tokens, not correctness. Rank and tier were what the matcher computed; only the requested bound was ignored.

## 3. Fix design
1. Apply the list-mode bound in `QueryEngine.findDocs` to the **already ranked and tiered** array from `findDocsConcept`. Use the same default (20), the same ×5 cap, slice from `cursor`, and set `nextCursor` when more results remain, so truncation is visible and pageable.
2. `findDocsConcept` stays untouched. That keeps every entry's rank, `matchConfidence`, `matchedOn` and coverage identical, along with the top-level `none` contract.
3. Test (`find-docs-limit.test.ts`):
   - `limit: 3` returns 3 entries, with `nextCursor` present.
   - Following that cursor returns entries 4–6.
   - For every oracle concept and k ∈ {1, 3, 20}, `findDocs({concept, limit: k}).data` deep-equals `findDocsConcept(docs, concept).data.slice(0, k)`.
   - `limit: 500` is capped at 100.
   - A no-match query still returns the pinned `{ data: [], error: null, matchConfidence: 'none' }`.

**Fork, for Peter at this record's merge.** I lean (a); it is adopted unless Peter amends at merge.
- **(a) The documented default applies to concept mode too.** A call that omits `limit` gets 20 results plus `nextCursor`. This matches the tool's own description; the `cursor` description loses its "for list mode" qualifier.
  - Cost: every concept response without a `limit` shrinks, for example from 75 to 20. A caller that relied on deep ranks must now page. `nextCursor` makes the cut visible, so nothing is silently hidden.
- **(b) Bound only when `limit` is passed.** Default responses are unchanged, but the description's "default 20" stays false for concept mode, which means the contract stays wrong.

## 4. Re-run owed
The alias-hygiene amendment (`.kiro/specs/121-claude-code-portability/discovery-confidence-rubric.md`) sends matcher changes (indexer, tokenizer, rank) to the oracle plus a fresh set. This fix is none of those. It shapes the response **after** ranking, so no fresh set is owed.

The study runners (`scripts/discovery-study-stage1.ts`, `scripts/discovery-indexer-fix-run.ts`) and the dry-run call `findDocsConcept` directly, and the fix leaves it untouched. The oracle run at head and at merge-base will therefore be **identical by construction**. The fixing PR runs it anyway and states both SHAs with the result 83/0/0 and rank-1-strong unchanged.

The **load-bearing proof** that ranks and tiers are unchanged is the test in § 3 that checks every oracle concept against the slice of the unbounded result.
