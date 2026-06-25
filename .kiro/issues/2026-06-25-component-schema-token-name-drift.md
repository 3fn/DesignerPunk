# Component Schemas Declare Non-Canonical Token Names → Real Consumer Relationships Silently Dropped

**Date**: 2026-06-25
**Discovered during**: Spec 118 Task 9.5.2 — fixing the dead `buildConsumerMap` array-group reader (which populated the token-index `consumers` field). Lina's domain-review of the 329 new relationships surfaced this.
**Reporters**: Lina (component-schema review), Claude (routing)
**Severity**: Medium — the catalog (token-index + MCP) is now **correct-but-incomplete**: some real token→component relationships are missing because the schema *declares the wrong token name*. A consumer querying e.g. "who uses `color.feedback.success.text`" gets an empty answer that is actually false.
**Type**: Component-schema authoring drift / token-name canonicalization (NOT a generation or inversion bug)
**Primary owner**: Lina (component-schema audit) + Ada (token-name canonicalization — the canonical semantic/primitive names)
**Status**: Open — tracked follow-up. Does NOT block Spec 118 9.5.2 (the 329 relationships that DO resolve are correct + shipped; this is about ADDITIONAL relationships silently dropped).

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
