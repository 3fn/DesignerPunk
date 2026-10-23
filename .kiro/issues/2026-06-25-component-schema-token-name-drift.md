# Component Schemas Declare Non-Canonical Token Names → Real Consumer Relationships Silently Dropped

**Date**: 2026-06-25
**Discovered during**: Spec 118 Task 9.5.2 — fixing the dead `buildConsumerMap` array-group reader (which populated the token-index `consumers` field). Lina's domain-review of the 329 new relationships surfaced this.
**Reporters**: Lina (component-schema review), Claude (routing)
**Severity**: Medium — the catalog (token-index + MCP) is now **correct-but-incomplete**: some real token→component relationships are missing because the schema *declares the wrong token name*. A consumer querying e.g. "who uses `color.feedback.success.text`" gets an empty answer that is actually false.
**Type**: Component-schema authoring drift / token-name canonicalization (NOT a generation or inversion bug)
**Primary owner**: Lina (component-schema audit) + Ada (token-name canonicalization — the canonical semantic/primitive names)
**Status**: **RESOLVED-pending-merge (PR named at open)** *(set 2026-10-23, Ada, co-owner, rule 5; was: "Open — tracked follow-up. Does NOT block Spec 118 9.5.2 (the 329 relationships that DO resolve are correct + shipped; this is about ADDITIONAL relationships silently dropped).")* Outcome: § "Outcome (2026-10-23)" at the end.
**Owners**: Lina, Ada *(added 2026-10-20, Lina, site 9 of ballot 2026-10-20-manual-records-routed-readers)*
**Class**: P0 false-claim · defect *(set 2026-10-20, Lina, rule 12. Accepted the steward's reading. The Application MCP's `get_token_consumers`, and the consumers field of `get_token`, answer from this index. For tokens whose real consumers declare a non-canonical name (Input-Text-Base still declares `color.error.strong` and `color.success.strong`, which are not token-index keys) they return no consumer. That is an MCP response a package reader meets, and the record has known it since 2026-06-25. Still live at 2026-10-20: 17 core schemas still declare at least one of the non-resolving forms the record names (grep). One reading Stacy may press: an empty list is incomplete rather than false; I class it P0 because the tool is named for the question it answers wrongly. Only Peter downgrades.)*
**Trigger**: `manual` — the component-schema normalization pass merges together with its unknown-token-name guard (§ Recommended disposition). No path token: a path over the schemas would fire on every unrelated schema edit, and a P0 lapses at its first firing (rule 11). A floor-class row for the next release walk (M7).

---

## Summary

`buildConsumerMap` (`src/generators/generateTokenIndex.ts`) builds the token→component `consumers` map by inverting each component's `.schema.yaml` `tokens:` declarations. The inverter is now correct (Spec 118 9.5.2; Lina verified zero inversion discrepancies). But several schemas declare **token names that match no token-index key** (neither the 193 semantic keys nor the primitive set), so those declarations resolve to nothing and the intended relationships are **silently dropped** from the catalog.

This predates 118; the dead-reader fix merely made the consequences visible (previously the whole map was empty, so no one noticed).

## Findings (from Lina's review — verify + extend during the fix)

1. **Input-Text family declares non-canonical feedback colors.** `Input-Text-{Base,Email,Password,PhoneNumber}/*.schema.yaml` declare `color.error.strong` / `color.success.strong` / `color.error` — none are semantic keys. The canonical names are `color.feedback.error.text` / `color.feedback.success.*`. Consequence: the Input-Text components are **absent** from `color.feedback.error/success.text` consumers, while their siblings `Input-Checkbox-Base`/`Input-Radio-Base` (which declare the correct `color.feedback.*` names) DO appear. This is also why `color.feedback.success.*` shows 0 consumers despite Input-Text clearly having a success state. **Inconsistent declarations across sibling Input families.**
2. **Radius/border notation drift.** Schemas use `radius.100`, `radius-100`, `radiusFull`, `radiusSmall`, `borderDefault` (Container, Chip, Input, Nav, Progress) where the canonical names are primitive `radius100` or semantic `radius.full`/`radius.small`/`border.default`. These resolve to neither universe → dropped. (e.g. Chip declares both `radius.full` AND the stray `borderDefault`.)
3. **Other non-resolving declarations:** `color.contrast.onPrimary`, `color.primary`, `color.background`, `color.border`, `color.canvas`, `color.surface` (Button-CTA, Button-Icon, Input-Text, Container); `accessibility.tapArea.recommended` (vs primitive `tapAreaRecommended`); `typography.button.small` / `typography.title*` / `typography.label.lg` (dotted vs canonical `typographyButtonSm`-style); `color.select.*` (Button-VerticalList-Item); `fontSize.050`. Each is a declared string matching no token-index key.

## Why out of scope for Spec 118 9.5.2

118 9.5.2 fixed the *reader* (a module-resolution-adjacent generation concern) and shipped a correct map of the relationships that DO resolve. Canonicalizing component-schema token names is a **component-authoring + token-governance** effort (which tokens are the right names, fixing 34 schemas, possibly tightening the schema contract to reject unknown token names) — a different domain, deliberately not folded in.

## Recommended disposition

A focused component-schema-normalization pass (Lina) + token-name canonicalization (Ada): audit the 34 core schemas' `tokens:` declarations against the canonical token-index keys; fix the drift (esp. the Input-Text feedback inconsistency); consider a **validation guard** so a schema declaring an unknown token name fails loudly rather than silently dropping (the standing-guard discipline — prevents recurrence). Acceptance: every schema `tokens:` ref resolves to a real token-index key (or is intentionally a pending token, documented); the feedback/success/radius relationships appear in the catalog.

## Cross-References

- Surfaced by: Spec 118 Task 9.5.2 (`.kiro/specs/118-module-resolution-coherence/findings/consumer-component-schema-discovery.md`, the array-group reader fix commit `0b9ee827`).
- Pattern sibling (silently-dead feature exposed): the array-group reader bug itself (consumers field 0/193 until 9.5.2).

**Walk 2026-10-20 (Thurgood, walk line under rule 9; ledger `archive/TRIAGE-2026-10-20.md` row 10, call BACK-FILL (Lina))**: this record lacks the rule-1 Trigger token (`**Trigger**: ` followed by one of `tag:v<semver>`, `merge:#<N>`, `path:<glob>`, `release:<ver>:phase-1` or `manual`) and the rule-12 `**Class**:` header. That is a walk finding. The owner writes both (rule 9); the steward writes neither. Steward's proposal, which the owner may override: Proposed `manual` · `P0 false-claim · defect`, on the steward's reading of M7: the shipped token index, served by the Application MCP, answers "no consumer" for tokens that have consumers. That is an MCP response a package reader meets. Lina classes; Stacy may confirm or dispute; only Peter downgrades a P0.

## Outcome (2026-10-23)

**2026-10-23 — Ada (co-owner): RESOLVED-pending-merge (PR named at open), branch `fix/schema-token-name-drift-and-consumer-index`.** What landed, in one PR, as the ruling required (normalization, union read and all-tiers consumers together):
- **Names** (Lina, `14281f27b`): the 97 non-resolving declarations across 21 schemas normalized to token-index keys — 81 rewrites, 16 deletions (8 because the replacement was already declared). Lina's F-2 ruling is in it: Nav-Header-Page's `composition:` token group is deleted (a component does not declare the tokens of the components it composes). Index regenerated (`c224d8661`).
- **Consumers on all three tiers** (Ada, `00d1f8dea`): `generateTokenIndex` writes `consumers` on primitive and component-token entries, not only semantic ones. `space300` and `avatar.size.md` now return Avatar-Base.
- **Package schemas read in a consumer's `generate`** (Ada, `eeaec4401`): R1-7's fix, the union the Application MCP serves (`src/cli/shared/componentSources.ts`).
- **The guard** (Ada, `239823ea8`): `src/generators/__tests__/schemaTokenRefs.test.ts` — every `tokens:` value is an exact, case-sensitive key of the committed primitives, semantics or components index, and every resolving declaration is listed in that entry's `consumers`; no allowlist. The same check warns in a consumer's `generate`. Mutation-checked: `space300` → `space.300` in Avatar-Base turns it red.

At `239823ea8`: 513 declarations, 0 unresolved; consumer pairs 392 semantic, 78 primitive, 43 component-token. This record's acceptance is met: every schema `tokens:` value resolves to a token-index key, and `color.feedback.success.text` now lists the four Input-Text components. **Not closed by this record** (each has its own home): declared-versus-read completeness (94 web-read tokens undeclared; `.kiro/issues/2026-10-23-component-token-usage-findings-from-drift-pass.md` item 4); DesignerPunk's component tokens missing from a born repo's index (`.kiro/issues/2026-10-23-born-repo-index-lacks-package-component-tokens.md`, found in this fix); Button-CTA's `minWidth` creation candidate C-1 (Peter); the doc correction for the platform identifiers the served token docs teach (ruling § 6, a separate CORRECTION proposal). The record archives under rule 5 once the PR merges.

**2026-10-23 — Lina (co-owner): C-1 executed as option (b), the joint Lina and Ada recommendation.** No tokens are created. Web (`ButtonCTA.web.css`) and iOS (`ButtonCTA.ios.swift`) now read `size700`, `size900` and `size1000`, as Android already does. The unused TS-only `ButtonCTATokens.minWidth` map (`Button-CTA.refs.ts`), its `index.ts` export and its test are retired; Ada confirmed none of them is reachable through the package's `exports` (🔵 patch-internal, the bump reading is Peter's). `ButtonCTA.minWidth.test.ts` maps each platform's read back to its token-index key and fails if any platform reads a different primitive or a literal. Peter rules only if he wants (a), three `buttoncta.minWidth.*` component tokens. One fact the consult did not cite: Spec 023 (H3, Decision 3) chose component tokens for these widths, and its completion doc claims all platforms use them; they were never registered, and web and iOS hard-coded the numbers. Option (b) supersedes that decision; it does not carry it out. Found while doing this: Android's sizing reads assign `Float` to `Dp` (`.kiro/issues/2026-10-23-component-token-usage-findings-from-drift-pass.md` item 5).
