# Spec 115 Phase B: Migrate Shadow Primitives and Delete Legacy ColorTokens.ts

**Date**: 2026-09-12
**Chartered by**: Peter (ruling at the dual-color-source divergence fix session — "queue both follow-ups")
**Domain**: Ada (token pipeline)
**Severity**: Medium (debt closeout — the live consumer harm is closed by the Option A fix; this ends the defect *class*)
**Status**: Queued — spec-sized, needs formalization (Thurgood) before execution
**Owner**: Ada *(added 2026-10-20, Ada, site 9 of ballot 2026-10-20-manual-records-routed-readers)*
**Class**: P2 obligation (record) · charter *(set 2026-10-20, Ada, rule 12. `src/tokens/ColorTokens.ts` carries a `@deprecated` header promising Phase B removes it, and its unread light/dark matrix still reads as live data, so the record of the migration is wrong while the Option A parity test keeps every consumer correct; no reader of a shipped surface is misled, so not P1. Overrides the steward's proposed P3: an unkept promise in the file's own header is an obligation, not an improvement. Kind charter: it is the standing charter for the color-track spec.)*
**Trigger**: `path:.kiro/specs/133-color-track/requirements.md` — the first commit that adds Spec 133 (color-track)'s requirements, where this record is taken in, combined, or left out with a reason. Charter item 1 (the four shadow primitives into OKLCH) is now done in Spec 129 under Requirement 7.4, by Peter's P-2 answer "(1)" (received 2026-11-05T05:54:32Z); what waits here is the deletion and items 2 and 3. *(Re-ruled 2026-11-05, Ada, owner, rules 1, 9 and 11, with a dated reason: the color-track spec now has a directory, so its formalization is a git-visible event and `manual` no longer has a reason. Authority: Peter, received 2026-11-05T13:05:54Z (`date -u` at receipt; orchestrator relay), verbatim: "yes, 4 (a), 7 (a)", whose "yes" answers "Colour-track: yes to (iv)?", the proposal `[ADA P-2]` (give the color-track spec a folder now with a placeholder outline, move its waiting records to a git-visible Trigger on its future `requirements.md`, fix the rgba record's split routing, record 129's leftovers in the outline; placement in his order unchanged). The folder is `.kiro/specs/133-color-track/`, created by Thurgood in #669, whose outline § 2 names this record and § 3 names this token. The token does not need the folder to exist on `main` to be valid: it fires on the first commit that adds the spec's requirements.)* *(was, verbatim: `manual` — the color-track spec's formalization opens (this record folds into it with the blend/OKLCH alignment record and color-token enforcement; ranked after Spec 130). *(Set 2026-10-20, Ada, rule 9. `manual` for the same reason as the blend record: the spec has no directory or name yet, so a `path:` glob would be a guess; re-rule to `path:` in the PR that creates the directory. Was: no Trigger line; Status "Queued — spec-sized, needs formalization (Thurgood) before execution".)*)*
**Ruling (Peter, 2026-10-20, relayed)**: "agreed" — folded into the color-track spec, ranked after Spec 130.
**Origin**: `.kiro/issues/2026-08-25-dual-color-source-divergence.md` § "Option B"

---

## Charter

Finish what `src/tokens/ColorTokens.ts`'s own `@deprecated` header promises: **Spec 115 Phase B removes the file.** The Option A divergence fix (2026-09-12) repointed the DTCG/Figma primitive path at the OKLCH source of record, but the legacy file survives as:

1. **Sole source for the four shadow primitives** (`shadowBlack100`, `shadowBlue100`, `shadowOrange100`, `shadowGray100`) on ALL platforms — these must migrate to the OKLCH source (`src/tokens/color/`) with Ada adjudicating the OKLCH values.
2. **Structural/iteration source for the DTCG export** and whatever else the importers below lean on.
3. **Dead-but-live-looking data**: its entire `light/dark × base/wcag` matrix is unread on every shipped path (the divergence issue documents this) — exactly the misleading surface that produced three stale governance-doc claims.

## Sized blast radius (measured 2026-08-27)

**9 non-test importers**: `src/providers/WebFormatGenerator.ts`, `src/providers/iOSFormatGenerator.ts`, `src/providers/AndroidFormatGenerator.ts`, `src/resolvers/SemanticValueResolver.ts`, `src/validators/buildValidation.ts`, `src/generators/DTCGFormatGenerator.ts`, `src/tokens/index.ts`, `src/tokens/semantic/AccessibilityTokens.ts`, `src/tokens/semantic/index.ts` — plus **17 test files**. All three platform format generators are in the set: this is a real spec with a feedback round, not an issue-driven fix.

## Design questions the spec must settle

- Shadow-primitive OKLCH values: converted-from-legacy-RGBA (visual no-op) vs. re-derived on the OKLCH ramp system (Ada adjudicates; visual no-op is the conservative default).
- What replaces ColorTokens.ts as the DTCG structural/iteration source.
- The `SemanticValueResolver` legacy fallback branch: delete or keep as a guarded error path.
- Whether `buildValidation.ts` and `AccessibilityTokens.ts` consume values that only exist legacy-side.

## Guard until then

The Option A parity test (DTCG `$value` ↔ OKLCH source, per primitive) makes any re-divergence loud. It protects the seam but NOT the misleading-surface problem — the file still reads as live data.

**Walk 2026-10-20 (Thurgood, walk line under rule 9; ledger `archive/TRIAGE-2026-10-20.md` row 18, call PETER)**: this record lacks the rule-1 Trigger token (`**Trigger**: ` followed by one of `tag:v<semver>`, `merge:#<N>`, `path:<glob>`, `release:<ver>:phase-1` or `manual`) and the rule-12 `**Class**:` header. That is a walk finding. The owner writes both (rule 9); the steward writes neither. Steward's proposal, which the owner may override: Proposed `manual` (Peter ranks it) · `P3 improvement · charter`. Peter's question: rank this spec-sized item, and fold the rgba-cleanup and shadow-OKLCH records into it?
