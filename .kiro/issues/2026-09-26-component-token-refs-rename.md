# Issue: `*.refs.ts` rename — retire the dual-meaning `tokens.ts` filename (Q8)

**Date**: 2026-09-26
**Status**: ACTIVE
**Owner**: Lina
**Trigger**: MUST land before Spec 123 U1's harvest-zero lint merges (her own declared gate, tightened from "before U3's install doc" — a lint whose trigger set includes our own unrenamed files launches with an exemption list)
**Source**: Spec 124's authoring-convention seed (`.kiro/specs/124-component-token-return-contract/findings/component-token-authoring-convention-seed.md`), ruled at the Spec 123 requirements round (Q8, Lina's ruling: lint as U1 rider + rename as this separate bounded issue)

## The work

Rename the 7 semantic-reference map files currently sharing the `*.tokens.ts` / `tokens.ts` filename with `defineComponentTokens` value-registration files, to the `*.refs.ts` convention — behavior-preserving, plus their ~12 importers (platform import specifiers included). Lina re-measured the scope at requirements R2: **7 files** (14 scan-reachable, 7 branded), correcting her earlier denominator of 15.

## Context

- Two token mechanisms wear the same filename; 124's brand makes the *harvest* correct but the *authoring model* stays fractured — the exact "I wrote a tokens.ts, why aren't my tokens showing up?" consumer support case.
- R7/Model B strengthened both halves: package-primary removes the diff-against-a-neighbour self-service path (the lint becomes the primary diagnostic), and the shipped filtered tree becomes a read-only exemplar set at whatever version consumers install — so the migration price steps up discontinuously at 123's release. With zero external consumers, the price is at its lifetime minimum now.
- Migration note (Lina's design-round A5): pre-123 consumers hold 7 old-name copies that will trip the lint on their first generate — the rename's consumer-facing story rides Spec 123's migration design.

## Filed by

Steward (main-loop), 2026-09-26, at Lina's design-R1 flag (her A6: no record existed and `.kiro/issues/` is outside her write scope).
