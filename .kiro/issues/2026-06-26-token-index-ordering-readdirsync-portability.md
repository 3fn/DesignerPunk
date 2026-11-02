# Issue: Token-Index Ordering Ties to `readdirSync`/Filesystem Order (Portability)

**Date**: 2026-06-26
**Severity**: Low — latent portability risk; no current breakage (the committed `token-index/` reproduces on the dev/CI filesystem)
**Discovered during**: Spec 124 Task 2 (R6 token-index ordering spike) — `findings/r6-ordering-spike.md`
**Type**: Token-index determinism / filesystem-order dependency
**Status**: Open (seeded; deliberately not pursued in 124)
**Owner**: Ada *(added 2026-10-20, Ada, site 9 of ballot 2026-10-20-manual-records-routed-readers)*
**Primary owner**: Ada (Rosetta token-index pipeline) — to pursue only as a deliberate, separate re-baseline decision
**Trigger**: `path:.kiro/specs/131-governance-simplification/requirements.md` — the first commit that adds Spec 131's requirements, where this record is taken in, combined, or left out with a reason. *(Re-ruled 2026-11-01, Ada, owner, rules 1, 9 and 11, with a dated reason: Peter's fork D routes the manual-trigger P3 records to Spec 131 in place ("Route them. We'll evaluate them as part of that effort — perhaps they can better inform the spec, be combined or inform other proposals, etc."), and this record's Routed line reads: "Spec 131 § "2026-11-01 (scope intake, second batch, record only: it names records and settles no design)", the outline row added in the same PR as this line *(2026-11-01, Thurgood, steward, rule 9; under Peter's fork D, R11 line 16, "Route them", `DLG@d34fc77868f649d3c67bd1b1da47bc6f2a805920` and R10, batch routing)*. The Trigger is unchanged. Under fork B (R11 line 14, route in place) its owner re-rules it to `path:.kiro/specs/131-governance-simplification/requirements.md` after this batch merges. This record is not due at 16.2.0's S." Authority: `DLG@d34fc77868f649d3c67bd1b1da47bc6f2a805920`, `R10@ee5ea2b80e58c26a6dea7e6dfd538d006193f755`, and `R11@25bd478ddb4aca1c77da9eada750f601374fc62a` line 16 (Peter's fork D answer), all in `.kiro/issues/2026-10-30-release-16-2-peter-rulings-and-delegation.md`. Rule 11's condition is met: Spec 131's `design-outline.md` § 13 second batch names this record (#617, `81077eeba88c1a1d73d167156b1bce5b92416914`).)* *(was, verbatim: `manual` — the deliberate, separate re-baseline decision the `**Primary owner**:` line names, due before any cross-filesystem CI is introduced; no path event names it. At that decision `components.yaml` is re-committed in sorted order or the record is re-ruled. *(Set 2026-10-20, Ada, rules 1 and 9.)*)*
**Class**: P3 improvement · defect *(set 2026-10-20, Ada, rule 12. Latent portability risk with no current breakage (macOS/APFS and CI both reproduce the committed order); `generateTokenIndex.ts` still iterates `readdirSync` order with no sort (read 2026-10-20).)*

---

## Problem

The committed `token-index/components.yaml` order is **directory-scan order, not a stable sort**: Source 1 (`{tokenSourceRoot}/component/`, `readdirSync` order) first, then Source 2 (config `componentTokens` dirs, each `scanForTokenFiles` recursive in `readdirSync` order), brand-filtered, with authored intra-file array order preserved. The generator (`generateTokenIndex.ts`) iterates in array order with no sort; `getAll()` is Map-insertion order; `yaml.dump` emits insertion order.

`readdirSync` order is **not guaranteed by POSIX** across all filesystems. On the current dev/CI filesystem (macOS/APFS) it returns lexicographic order and is stable (verified two-call identical), and the committed file was produced the same way — so today there is no breakage. But if CI ever runs on a filesystem with different `readdirSync` order, the regenerated `components.yaml` would reorder and the R6 `git diff`-empty gate would fail there.

## Why 124 Did NOT Fix This

Spec 124 deliberately **preserves scan order and introduces no sort key**, so that R6 (regenerate → `git diff token-index/` empty) is a pure no-op against the committed reference. Imposing a canonical sorted order would guarantee a non-empty diff against the current committed file and break R6 — unless `components.yaml` is **re-committed in sorted order as a deliberate, separate decision**. That re-baseline cannot be smuggled into the "reproduce committed" gate, so it was scoped out. (See the Task 2 finding's Section 3 counter-argument.)

## Correct Fix (if pursued)

1. Impose a deterministic canonical sort (e.g. by `component` then authored token order, or a documented stable key) in the harvest or in `generateTokenIndex`.
2. **Re-baseline** `token-index/components.yaml` in that sorted order as an explicit committed change.
3. Update any order-dependent assertions / R6-style gates to the new canonical order.

This decouples the committed index from `readdirSync`'s platform behavior — more portable long-term — but is a conscious re-baseline, not a no-op refactor.

## Notes

- This is a **pre-existing** dependency the repo already had (the committed file was produced via the same scan order); not a Spec 124 regression.
- Recommend Peter/Ada decide whether portability robustness warrants the re-baseline before any cross-filesystem CI is introduced.

**Walk 2026-10-20 (Thurgood, walk line under rule 9; ledger `archive/TRIAGE-2026-10-20.md` row 12, call BACK-FILL)**: this record lacks the rule-1 Trigger token (`**Trigger**: ` followed by one of `tag:v<semver>`, `merge:#<N>`, `path:<glob>`, `release:<ver>:phase-1` or `manual`) and the rule-12 `**Class**:` header. That is a walk finding. The owner writes both (rule 9); the steward writes neither. Steward's proposal, which the owner may override: Proposed `manual` · `P3 improvement · defect`.

**Routed**: Spec 131 § "2026-11-01 (scope intake, second batch, record only: it names records and settles no design)", the outline row added in the same PR as this line *(2026-11-01, Thurgood, steward, rule 9; under Peter's fork D, R11 line 16, "Route them", `DLG@d34fc77868f649d3c67bd1b1da47bc6f2a805920` and R10, batch routing)*. The Trigger is unchanged. Under fork B (R11 line 14, route in place) its owner re-rules it to `path:.kiro/specs/131-governance-simplification/requirements.md` after this batch merges. This record is not due at 16.2.0's S.
