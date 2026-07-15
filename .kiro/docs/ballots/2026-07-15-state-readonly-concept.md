# Ballot: Add `readonly` to the Concept Catalog (state category)

**Date**: 2026-07-15
**Author**: Lina (contract authored on `fix/input-text-readonly-b-prime`); ballot drafted by the coordinating session
**Status**: RATIFIED (Peter, 2026-07-15)
**Origin**: iOS readOnly adjudication, RULED B-prime by Peter 2026-07-15 (`.kiro/issues/input-text-base-ios-readonly-adjudication.md`), ruling condition 1: "new readOnly contract via Concept Catalog ballot"

---

## Problem evidence

Input-Text-Base has shipped a `readOnly` prop on all three platforms since Spec 034 (2026-01-01) with **no behavioral contract and no catalog concept** — the gap that let iOS implement readOnly via `.disabled()` (disabled semantics under a different prop name) and survive two disabled-cleanup passes undetected. The adjudication's synthesis round (Lina, Kenya, Data — unanimous) produced the `state_readonly` contract now authored in `src/components/core/Input-Text-Base/contracts.yaml`; the Concept Catalog enforcement test (`contract-catalog-name-validation.test.ts`, Spec 078) mechanically rejects the name until the concept exists. It currently passes via a self-cleaning `PENDING_BALLOT_CONCEPTS` allowlist that fails loudly the moment the concept lands, forcing allowlist removal.

## Review record

The concept was reviewed through the adjudication itself rather than a separate round: owner investigation (Lina), two independent platform consults (Kenya — iOS; Data — Android), and a three-agent synthesis round with preserved dissent, all recorded in the adjudication doc. All three agents co-signed the condition requiring this ballot. Peter ruled B-prime with conditions 2026-07-15.

## Proposed edits (`governance/Contract-System-Reference.md`)

**Edit 1 — line 5 (metadata description):**
- Before: `concept catalog with all 136 concepts`
- After: `concept catalog with all 137 concepts`

**Edit 2 — line 49 (catalog header):**
- Before: `136 concepts across 10 categories. Originally 116, derived from the 29 deployed contracts.yaml files in the Spec 078 audit; grown since through governed additions (`gradient_glow` ballot measure, Spec 088 Nav-Header concepts, Spec 090 Progress-Bar-Base concepts).`
- After: `137 concepts across 10 categories. Originally 116, derived from the 29 deployed contracts.yaml files in the Spec 078 audit; grown since through governed additions (`gradient_glow` ballot measure, Spec 088 Nav-Header concepts, Spec 090 Progress-Bar-Base concepts, `readonly` ballot measure 2026-07-15).`

**Edit 3 — line 51 (adjudicated count note), the parenthetical sum:**
- Before: `(26+6+7+17+19+6+1+15+10+29)` and `136 counted empirically`
- After: `(26+6+7+17+19+6+1+16+10+29)` and `137 counted empirically` — with a trailing sentence appended to the note: `state grew to 16 via the 2026-07-15 readonly ballot.`

**Edit 4 — line 81 (state category heading):**
- Before: `### state (15)`
- After: `### state (16)`

**Edit 5 — line 83 (state concept list), alphabetical insertion:**
- Before: `` `priority_derivation` · `selected` ``
- After: `` `priority_derivation` · `readonly` · `selected` ``

**Edit 6 — line 113 (catalog closing note):**
- Before: `The Concept Catalog above lists all 136 concepts.`
- After: `The Concept Catalog above lists all 137 concepts.`

## Application mechanics

1. Apply Edits 1–6 exactly as written (stop and report on any before-text mismatch).
2. Remove the `state_readonly` entry from `PENDING_BALLOT_CONCEPTS` in `src/__tests__/stemma-system/contract-catalog-name-validation.test.ts` — the allowlist is self-cleaning and will fail with an explicit instruction until removed.
3. Straggler sweep: `grep -rn "136 concepts" governance/ docs/ .kiro/steering/` (every count in this directory's first ballot was wrong at least once — sweep, don't trust the enumerated list).
4. Verification: `npx jest src/__tests__/stemma-system/contract-catalog-name-validation.test.ts src/__tests__/stemma-system/form-inputs-contracts.test.ts`; docs MCP index rebuild after merge.

## Scope decisions

- Concept name is `readonly` (canonical contract `state_readonly`), category `state` — consistent with `{category}_{concept}` and the existing `disabled` precedent (concept exists so exclusion blocks can reference it; `readonly` likewise serves both declaration on Base and exclusion on Password).
- The naming-convention examples table (line ~106) is NOT edited — it already illustrates the pattern adequately and was recently adjudicated.
- Contract semantics (per-platform announcements, iOS carve-out, auto-tighten clause) live in `Input-Text-Base/contracts.yaml`, not the catalog — the catalog records the concept only.

## Ratification

RATIFIED by Peter, 2026-07-15, in-session following the B-prime implementation review (PR #91). Per the record-first protocol, this status was committed before the edits in this measure were applied; the application commit follows.
