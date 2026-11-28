# Button-VerticalList-Set on iOS hard-codes its error text at `size: 14`; Android and web use `typography.bodySm`. The token audit's iOS pattern cannot see the call

**Date**: 2026-11-27
**Owner**: Lina (the component and `scripts/audit-component-tokens.js`, both hers)
**Filed by**: Lina, under rule 10, as an owner act. Found classifying the 30 fixed-size font calls for T-12 in Spec 132's outline round (`[LINA R2]` on #880, item 7).
**Class**: P2 obligation (guard) · defect *(set 2026-11-27, Lina, rule 12. The literal is a token-compliance defect. The audit script's header says it "Scans component files for hard-coded values", and its iOS pattern requires `Font.system(` on one line, so it misses `.system(size: 14` (the implicit-member form) and every multi-line call. That makes the instrument weaker than its claim.)*
**Trigger**: `release:next:phase-1` — the next release's S. A P2 record that would ride another change takes this token (rule 1). The fix is small, and it is not left to ride Spec 132's units.

---

## What is wrong (VERIFIED at `origin/main` `017514064`)

- `src/components/core/Button-VerticalList-Set/platforms/ios/ButtonVerticalListSet.ios.swift` L545, in `errorMessageView`: `.font(.system(size: 14, weight: .regular))`. It is production code: the file's first preview marker is at L962.
- **The same text on the other platforms reads the token.** Android: `fontSize = DesignTokens.typography_body_sm.fontSize`, `fontWeight = DesignTokens.typography_body_sm.fontWeight` (`ButtonVerticalListSet.android.kt` L525–L526). Web: `--_vls-error-font-size: var(--typography-body-sm-font-size)` (`Button-VerticalList-Set.styles.css` L47). The schema lists `typography.bodySm` (`Button-VerticalList-Set.schema.yaml` L107–L108).
- **The audit's blind spot**: `scripts/audit-component-tokens.js` L863 matches `/Font\.system\s*\(\s*size:\s*(\d+(?:\.\d+)?)/g`, line by line. So `.system(size: 14` and the 4 multi-line `.font(.system(` calls are never read. The audit is an npm script (`audit:tokens`), not a registered check.

## Fix shape (owner's)

1. The iOS error text reads `typographyBodySm`, matching Android and web. T-12's later scaled form then converts it with the rest.
2. The audit's iOS font pattern matches the implicit-member form and spans lines, with a fixture that is red on today's L545.

## Done when

The PR carrying both merges. Then this record gets rule 5's outcome line and moves to `archive/`.

*Signed: Lina, 2026-11-27.*
