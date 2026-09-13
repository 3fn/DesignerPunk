# `extract-component-meta.ts` Silently Clobbers Sanctioned Hand-Edits (Length-Keyed Preservation Predicate)

**Date**: September 13, 2026
**Discovered By**: **Lina** (Stemma component owner) at the 125-B U1b wave-3 consult, while adjudicating the `component-meta.yaml` routing call (O-4) — a gap found by *scoring a KEEP line* (`Platform-Resource-Map.md:57`), not by hunting
**Spec**: None — spun out of `.kiro/specs/125-B-classification-map/` wave 3 step (a). Chartered independent of the register: the defect is live today with **no guard involved**.
**Status**: Open
**Priority**: MEDIUM — silent data loss on a sanctioned authoring path; no build breakage
**Impact**: 39 tracked `component-meta.yaml` files; the Application MCP's component metadata (purpose, contexts, usage, alternatives) that agents consume for component selection
**Assigned To**: **Lina** (component metadata is her domain; she took the predicate repair as her own item)

---

## Summary

`component-meta-authoring-guide.md` tells authors to hand-edit two fields. The extractor's preservation logic keys on **array LENGTH, not content**, so a whole class of sanctioned hand-edits is **silently destroyed** by the next `npm run extract:meta`.

**The guide sanctions an edit the tooling does not durably preserve.**

## The defect

```
scripts/extract-component-meta.ts:343
  if (existing && existing.usage.when_to_use.length > finalUsage.when_to_use.length)

scripts/extract-component-meta.ts:371
  if (existing && existing.alternatives.length > alternatives.length)
```

The usage branch swaps the **whole** `usage` object keyed on `when_to_use` length alone. Consequences:

- A sanctioned hand-edit that **rewrites** existing `when_to_use` entries without adding one is silently clobbered.
- A hand-edit to **`when_not_to_use` alone** is silently clobbered unless `when_to_use` happens to be longer than the derived content.

The guide explicitly instructs exactly these edits:

- `component-meta-authoring-guide.md:34` — "hand-edit usage/alternatives if the derived content is too generic"
- `:217` step 5 — "if `usage` or `alternatives` are too generic, hand-edit them directly"
- `:55` and `:97` — "**Do not edit directly in meta file** — edit the family doc and run `npm run extract:meta`" (the *other* half of the split, correct as written)

## Verified fact base (Lina's consult, independently checked against the draft's claims)

| Claim | Result |
|---|---|
| 39 tracked `component-meta.yaml` files | CONFIRMED (`git ls-files` → 39) |
| Edit-prohibition imperative at `:55` / `:97` | CONFIRMED verbatim |
| Hand-edit sanction at `:34` / workflow step at `:217` | CONFIRMED |
| `extract:meta` present in `package.json:98` only | CONFIRMED — **not in any workflow, not in any hook** |
| No regenerate-and-diff guard; not in `guardedRoots` | CONFIRMED against `tools/agent-generator/generate.ts:433-450` |
| No register row | CONFIRMED |
| The four test files touching `component-meta` | They test **consumption** (app-MCP indexer/parsers/readiness, product-MCP GapDetector); **none** asserts source↔output equality |

## Requirements for the future register row / any guard (field-grain, not file-grain)

Recorded so the routed work is actionable rather than a re-investigation:

1. **Field-grain rule statement.** `purpose` + `contexts` = unconditionally derived (edit the family doc). `usage` + `alternatives` = hand-editable with preservation. A future row's `scope[]` carries that split — the same shape as `no-hardcoded-color`'s.
2. **Guard design**: regenerate-and-diff restricted to `purpose` + `contexts`, compared as **parsed YAML fields, not bytes**. Those two fields are unconditionally derived, so a field-grain compare is sound **today with no tooling change**. A byte-grain guard (the 122 `diff-guard` pattern) is **unsound** while preservation is length-keyed.
3. **Precondition**: fix the preservation predicate (content-aware, or per-field) **or** document the clobber — *before* any guard ships. Otherwise the guard's green says nothing about half the file.
4. **Disposition if/when rostered**: `disposition: none`, `check_state: proposed`, `owner: lina`, with the field split in `scope[]` and this defect named in the rationale.

## Why this is NOT folded into an existing register row

Lina endorsed route-don't-fold, and rejected the alternative on the record:

> One could argue folding it into C7 (`never-hand-edit-122-generated`) is better — both are "generator output with a canonical source," and a second row multiplies rows where one concept lives. I reject that because C7's row is defined by `guardedRoots` membership and its gate is `122-diff-guard`; **a row whose `checks[]` describes a guard that provably does not reach the artifact would be a comfortable fiction** of exactly the kind this campaign exists to remove.

It is equally not C8 (`never-hand-edit-generated-token-outputs`) — component metadata is not a token output (Ada concurred).

## Routing

- Predicate repair: **Lina**, as a separate item from the wave-3 PR (scope + trial caps) — the same handling as her wave-2 U1/U3 items.
- Register row (if any): routed to **125-B Task 5.6 closeout**, alongside its existing "are the remaining armed/unregistered rows rostered anywhere" checklist item — this is the **unarmed-and-unregistered** direction of that same audit.

## Related

- Register row recording the gap: `governance/classification-map.md § "never-hand-edit-generated-token-outputs"` (education disposition, "ADJACENT GAP SURFACED, routed not folded").
- Wave-3 records: `.kiro/specs/125-B-classification-map/completion/u1b/wave-3-consult-lina.md` §3; `wave-3-assessment.md` §3.4.
- Precedent for the route-don't-fold pattern: the wave-2 `contract-platforms-specified` row (a gap found by adjudicating a KEEP line).
