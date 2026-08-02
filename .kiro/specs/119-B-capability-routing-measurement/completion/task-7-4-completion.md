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

## Registry input-closure (discovered at the PR gate, resolved same-branch)

The first PR push failed `122-diff-guard` with `input-closure-changed: canonical/registry/tool-registry.json` — the guard boots the live server and compares tool definitions against the canonical registry, and the D5 description update made them diverge. Unanticipated by the "zero window interaction" framing, resolved with proof rather than assumption:

1. Registry synced to the new description (1-line diff).
2. `generate.ts` run: **274 files written, zero content changes** (`git status` clean on all guarded roots) — the description is registry-input but renders into NO generated output (only the tool NAME appears in thurgood/stacy routing). A provably-NULL regen.
3. **Window consequence: NONE** — no `thurgood.md` output change → no segment (§ 7.1.iii); confirmed mechanically against the merged window dataset (1 of K=3 boundary events used, unchanged). Not a qualifying regen (zero output delta) → no regen-log line; this note is the auditable record instead.
4. `npm run test:agent-generator`: 27 suites / 331 tests green locally.
