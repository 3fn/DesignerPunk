# Task 1.5 Completion: crossRef Re-point + Reciprocal Half

**Date**: 2026-07-14
**Spec**: 125-B — Classification Map & Deferred Enforcement Layers
**Task**: 1.5 crossRef re-point + reciprocal half (Implementation, Tier 2 — Standard)
**Agent**: Thurgood (Sonnet) — as planned in tasks.md; no divergence
**Requirements**: 4.1–4.4; Design: C1

---

## Precondition Check (Req 4.1)

Verified by direct inspection (not the sweep report — that check happened after the edit, see below): `canonical/shared/shared-catalog.yaml`'s `record-first-ratification` member carried `crossRefStatus: interim` (line 53, pre-edit) with `crossRef: ".kiro/docs/ballots/README.md § \"The Ratification Protocol (record-first) — approved by Peter, 2026-07-05\""`. The interim target was still live — the re-point proceeds (not a verify-and-discard case).

## What Was Edited

### 1. Re-point (`canonical/shared/shared-catalog.yaml`, `record-first-ratification` member)

- `crossRef` changed from the interim ballots-README target to:
  ```
  crossRef: "governance/classification-map.md § \"record-first-ratification\""
  ```
  Format verified against `tools/agent-generator/sweeps/common.ts:164–168` (`parseRepoSectionRef`: `/^(\S+)(?:\s+§\s+"(.+)")?\s*$/` — `<path> § "<heading>"`) and matched to the exact same grammar the interim ref already used, and to the citation format the register itself documents (`governance/classification-map.md § "About This Register" / "Addressing and Citation"`: `governance/classification-map.md § "<entry-id>"`).
- `crossRefStatus: interim` and `crossRefResolveWhen: ...` **removed** (both fields are optional on `SharedCatalogMember` per `tools/agent-generator/adapters/index.ts:130–132`; removing them is a clean edit, not a schema violation).
- The explanatory comment block above `crossRef` was rewritten to record the re-point (date, task, reciprocal-half pointer) and to retain a short historical note of the prior interim target and its approval, rather than deleting the provenance outright.

### 2. Reciprocal half (`governance/classification-map.md` § `record-first-ratification`)

Inspected before editing — **already present and correct**, authored by Task 1.3 (Exp 2):
```yaml
crossRef: "canonical/shared/shared-catalog.yaml#record-first-ratification"
```
This matches the schema's documented reciprocal-half convention exactly (design.md § C1: *"the register entry's YAML carries `crossRef: canonical/shared/shared-catalog.yaml` + the entry id"*; register's own Entry Schema table example: `crossRef: "canonical/shared/shared-catalog.yaml#example-rule-id"`). No edit was needed on this side — verified, not assumed.

## Guard Check (before editing)

Confirmed `canonical/shared/shared-catalog.yaml` is a hand-edited canonical **source**, not a generated output, before touching it: `tools/agent-generator/generate.ts`'s `guardedRoots()` (the diff-guard's protected-output list) enumerates `canonical/registry`, `.claude/skills`, `.kiro/skills`, `canonical/manifests`, `canonical/_fixture-output`, `canonical/coverage-map.yaml`, `canonical/coverage-manifest.yaml`, `CLAUDE.md`, `CLAUDE.md.attribution.json` — `canonical/shared/**` is absent from that list. No guard trip; the edit is in scope for direct hand-authoring, consistent with how the interim value was originally authored (Spec 122 Task 7).

## Sweep-1 Verification (Req 4.4)

Ran the local sweep runner directly (found via `.github/workflows/agent-generator.yml:110–111`):

```
npx tsx tools/agent-generator/sweeps/sweep-1-refs.ts
```

Result:
```
122-sweep-1-refs: PASS — 0 fail, 0 unadjudicated, 0 adjudicated, 0 info
```

This is the platform-verified confirmation Req 4.4 asks for, produced locally rather than only in CI. Two things confirmed by the report:

1. **The forward ref resolves**: leg 2 (`resolveRepoSectionRef` against `sharedCatalog[...].crossRef`) parsed `governance/classification-map.md § "record-first-ratification"` and found a markdown heading line containing `record-first-ratification` verbatim (`### record-first-ratification`, `governance/classification-map.md:138`) — no FAIL finding.
2. **The interim count decremented to zero**: pre-edit, this same member would have emitted an `INFO` finding (`INTERIM crossRef target: ...`) per the sweep's interim-enumeration leg (`sweep-1-refs.ts:157–165`, keyed on `member.crossRefStatus === 'interim'`). Post-edit the report shows `0 info` — the interim enumeration is empty, consistent with the interim being resolved rather than merely silenced (the field itself was removed, not left stale).

The in-PR CI run of `122-sweep-1-refs` (required check, `.github/workflows/agent-generator.yml`) provides the platform-verified confirmation at merge time; this local run is the same code path (`main()` in `sweep-1-refs.ts`) run manually and is not a substitute claim.

## Two-Ended Cross-Reference — Final State

| Side | File | Field | Value |
|---|---|---|---|
| Forward | `canonical/shared/shared-catalog.yaml` | `crossRef` | `governance/classification-map.md § "record-first-ratification"` |
| Reciprocal | `governance/classification-map.md` § `record-first-ratification` | `crossRef` | `canonical/shared/shared-catalog.yaml#record-first-ratification` |

Both ends resolve; the interim is fully retired (no `crossRefStatus`/`crossRefResolveWhen` remaining on the catalog member). The 122-inherited obligation (`.kiro/specs/125-mechanical-enforcement-strategy/inbound-to-125-B-from-122.md`) is discharged.

## Validation (Tier 2)

- `npx tsx tools/agent-generator/sweeps/sweep-1-refs.ts` → PASS, 0 fail / 0 info (interim enumeration empty).
- Manual inspection of both crossRef fields for grammar conformance against `common.ts`'s `parseRepoSectionRef` regex and the register's own documented citation format.
- `guardedRoots()` inspected to confirm `canonical/shared/shared-catalog.yaml` is not a protected generated output.

## Not Done Here (out of scope for 1.5)

- No commit made (per task instructions — reported for Peter/branch-owner review).
- Full `npm test` / `tsc` were not re-run for this subtask (Tier 2, targeted validation only — sweep-1 is the targeted check that governs this change).
