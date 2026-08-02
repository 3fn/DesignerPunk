# Task 7.4 Completion: Surfacing Channels + Scanner Repoint + D5

**Date**: 2026-08-02 · **Unit**: OB-1 · **Type**: Implementation subtask

## Dropped-candidate channels (design Component 6.2, Ada dR1 middle path)

1. **Index-health aggregate**: `determineIndexHealth` gains optional `crossRefTotals`; when `droppedBareIdCount > 0` it emits ONE warning — `"N unresolved bare-id link targets — run scan-cross-references.sh for the list"` — on the daily-consumer channel. `totalCrossReferences` reports the validated count when supplied (stable index property). Zero drops → no warning (tested both ways).
2. **Scanner individual listing**: `scripts/scan-cross-references.sh` rewritten — scans BOTH roots (`governance/*.md` + `.kiro/steering/*.md`), lists every bare-id link target per doc with `[UNRESOLVED]` marking (resolution = governance frontmatter `id:` match), plus `.md` targets; stdout, exit 0 (diagnostic, not a gate). Header records the Spec-020 origin, the Spec-099 deprecation, and this 119-B repoint/revival as the opt-in detail channel (R9 AC4 bundle: parser id-awareness + repoint travel together).
   - Verification run (2026-08-02): exits green; **92 docs scanned (83 governance + 9 steering) — exceeds the old 9**; 116 path refs, 237 bare-id refs, 8 UNRESOLVED listed individually.

## D5 normalization

`listCrossReferences` routes its document parameter through `resolveRef` — the SAME strategy chain (id → indexed key → legacy path) as `get_document_summary` — and returns the validated set. The tool description now DOCUMENTS the contract (accepted ref forms + bare-id targets returned as doc ids + drop behavior); the stale `.kiro/steering/…` example in the input schema is replaced. Tests: resolution via id, indexed key, and `./`-prefixed key return identical results; unresolvable ref throws the shared `DocumentNotResolved` contract.

## Public-API note

`list_cross_references` response shape is UNCHANGED (target/context/section/lineNumber; no `kind` tag). New behavior is additive: bare-id refs now appear with target = the doc id.
