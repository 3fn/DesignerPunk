# Task 2 Completion: Tokenized Keyword Discovery on `find_components`

**Date**: 2026-06-23
**Task**: 2. Tokenized Keyword Discovery on `find_components` (Req 1)
**Type**: Parent
**Status**: Complete
**Agent**: Lina (component domain; implemented on Sonnet 4.6)

---

## Artifacts Modified

- `application-mcp-server/src/indexer/ComponentIndexer.ts` — auto-derived tokenized keyword index (signal-class grouped) + exported `tokenizeString()` + `ComponentKeywordEntry`/`KeywordIndex` + `getKeywordIndex()` accessor.
- `application-mcp-server/src/query/QueryEngine.ts` — tokenized matching in `findComponents`, `matchedOn` + coverage evidence, conjunctive narrowing, keyword-coverage sort, optional `limit`.
- `application-mcp-server/src/index.ts` — new optional `keyword` + `limit` params on the `find_components` tool schema and `handleFind()` routing.

## Implementation Details

### 2.1 — Auto-derived tokenized keyword index (Architecture)
Per-component keyword entry built at index-build time in `ComponentIndexer.assembleComponent()`, grouped by signal class:
- **high-signal:** tokenized `name`, tokenized `family`, `purpose`, contract concept keys + category names
- **low-signal:** `whenToUse`, `contexts`, `alternatives[].reason`, `description`
- **excluded:** `whenNotToUse` (negative-signal trap)

`tokenizeString()` splits on hyphen/underscore → camelCase → whitespace, strips leading/trailing punctuation, lowercases, drops empties. **Term-level, not substring** (load-bearing for multi-word queries). Optional reactive `aliases` is supported; its absence does not block auto-derived matching.

**O2b resolved (confirmed from code):** the indexer reads the **parsed `whenToUse`** (camelCase) on assembled `ComponentMetadata`, because `parsers.ts:198` maps `usage.when_to_use → whenToUse` upstream. Reading raw `when_to_use` on assembled metadata would be a phantom `undefined`.

### 2.2 — Tokenized matching in `findComponents`
Query is tokenized and matched term-level against the per-component index. For each candidate, computes `matchedOn` (labeled by signal class — `highSignal`/`lowSignal`/`aliases`) + `matchedTokens`/`totalTokens` coverage. Filters remain **conjunctive** — `keyword` runs after the existing exact-match filters, so `keyword` + `category` AND-narrows. When keyword is active, results sort by coverage desc then name.

> **Scope boundary (held):** Task 2 computes the *evidence* (`matchedOn` + coverage) but does NOT emit `matchConfidence` / `rank` / a viability field — the three-layer confidence emit is Task 5. The evidence is computed and available for Task 5 to consume.

### 2.3 — New optional `keyword` + `limit` params (back-compat)
Added to the `find_components` tool schema and `handleFind()` routing. The existing exact-match semantics of `context`/`concept`/`category` are unchanged. `ApplicationSummary` is returned unchanged, augmented with an OPTIONAL `matchedOn` only when `keyword` is supplied (not a thinned shape). Discovery→retrieval composition verified: a name found via keyword resolves via `get_component_summary` in one call.

### Beyond-spec fix (punctuation stripping)
The live corpus has comma-separated `when_to_use` values (e.g. `"...registration, login, or contact forms"`). A naïve whitespace/hyphen split yields `"login,"` and the `"login"` recall floor would silently miss. `tokenizeString()` strips leading/trailing punctuation per token to fix this — not called out in the spec but load-bearing for the hard floor.

## Validation (Tier 3: Comprehensive)

✅ Tokenized term matching (not substring); multi-word NL queries matchable
✅ New optional `keyword` rides alongside unchanged exact-match `context`/`concept`/`category` (back-compat)
✅ Index auto-derived from existing metadata; indexes the field set incl. `whenToUse`; excludes `whenNotToUse`; optional reactive `aliases`
✅ `ApplicationSummary` shape unchanged (+ optional `matchedOn` only when keyword supplied)
✅ `npx tsc --noEmit` — clean
✅ `npx jest` (full app-MCP suite) — **21 suites / 232 tests passing**

### Recall-floor fixtures (against the real index)
| keyword | returns | floor met |
|---|---|---|
| `"login"` | `Input-Text-Email`, `Input-Text-Password` | ✅ hard floor `Input-Text-Email` |
| `"text input field"` | all four `Input-Text-*` (family `FormInput`) + others | ✅ min `Input-Text-Base` |
| `"primary action button"` | `Button-CTA` (first) | ✅ `Button-CTA` |

## Requirements Compliance

✅ Req 1.3 (tokenized matching), 1.4 (indexed field set incl. `when_to_use`, excl. `when_not_to_use`), 1.5 (new optional param, exact-match unchanged), 1.6 (recall-floor fixtures non-empty), 1.7 (`ApplicationSummary` unchanged + optional `matchedOn`), 1.8 (auto-derived), 1.9 (optional `aliases`), 1.10 (discovery→retrieval composes)

## Open Items Carried Forward (not Task 2 scope)

- **Precision is deferred to Task 5.** `"text input field"` returns ~20 results (some false positives, e.g. `Avatar-Base` matching "text"). By design — "recall floor, not precision ceiling." The `matchedOn` + coverage evidence is computed for Task 5's tier derivation to filter precision.
- **`Button-CTA` not reachable for `"login"`.** Its `whenToUse` never says "login" (it says "submit, save, cancel"). The spec frames CTA-for-login as a soft "expect," not a hard floor. A future `aliases:` entry could capture it if real usage warrants — a tuning decision, not a defect.

## Related Documentation

- [Task 2 Summary](../../../../docs/specs/121-claude-code-portability/task-2-summary.md)
