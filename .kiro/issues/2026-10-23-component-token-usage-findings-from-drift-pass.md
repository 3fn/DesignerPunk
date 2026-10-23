# Component Token-Usage Findings Surfaced by the Schema Token-Name Drift Pass

**Date**: 2026-10-23
**Filed by**: Lina, from Ada's four flags in her 2026-10-23 drift ruling (§ 2 flags L-2, L-3, L-4, L-5), kept out of the normalization PR by instruction (Peter, 2026-10-23: that pass is names only)
**Discovered during**: normalizing 97 non-resolving `tokens:` declarations in 21 core schemas (`.kiro/issues/2026-06-25-component-schema-token-name-drift.md`)
**Owner**: Lina
**Class**: P3 improvement · defect *(set 2026-10-23, Lina, rule 12. Item 3 re-classes to P1 consumer-blocking if the probe in its line confirms the Android file does not compile; Stacy may read any item higher.)*
**Trigger**: `manual` — Lina's own fixing PR for items 1–3, or Ada's declared-versus-read instrument PR for item 4 (named in item 4). P3, so `manual` is admitted (rule 1).

---

None of these four is a token-name error, so the normalization PR does not fix them. Each is a place where what a component reads, or whether its code is valid, is in question. They are listed so none is lost (rule 10).

1. **Input-Text success border reads a text token.** `InputTextBase.web.css` L127–128 draws the success border with `--color-feedback-success-text` (green500). `color.feedback.success.border` (green400) exists, and Input-Checkbox uses `color.feedback.error.border`. The success value differs, so a change is visible, not a no-op. The error border has the same shape (`error.text` and `error.border` are both pink400, so only the success side changes colour). **Fork for Peter or the design owner**: keep the text token as a deliberate choice, or move the border to `*.border`. Until ruled, the Input-Text schemas declare `color.feedback.success.text` and `color.feedback.error.text`, which is what is read.
2. **Button-CTA typography differs across platforms.** Android reads `typography.buttonMd` and `typography.buttonLg` (`ButtonCTA.android.kt` L278–300); web and iOS read `typography.labelMd` and `typography.labelLg`. The schema now declares all four, so each declaration is true for one platform and the parity gap is visible there. **Owner question**: which pair is canonical. Stacy is asked to read this as a cross-platform parity finding. The small size has no declaration of its own: Android uses `buttonMd`, web and iOS `labelMd`.
3. **`InputTextBase.android.kt` L466–473 likely does not compile.** The block declares uninitialised `private val colorBorder: Color` and `colorBackground: Color`, and `private const val ...: Float` typography constants, each with a `// Generated from color.border` style comment. `color.border` and `color.background` are retired names (both now `color.structure.*`). Kotlin rejects a `val` with no initializer at top level, so I expect a compile error; I have not built it. **Probe**: build the Android target, or let the Spec 129 build-verification harness do so. If it fails, re-class this record P1 consumer-blocking and fix first.
4. **94 tokens that web code reads are still undeclared after the normalization.** After the pass every declared name resolves (513 declarations, 0 unresolved) but the declarations are not complete: Button-CTA reads `shadow.hover`, `radius200`, `tapAreaMinimum`, `space.inset.300` and `space.inset.400` without declaring them; Input-Checkbox reads `labelLg` and `caption`. The count is Ada's (drift ruling L-5), from a script that maps each `var(--…)` in `platforms/web/**` back to its token-index key; it was not recomputed here and must be re-run before anyone acts on the number. Consequence: `get_token_consumers` still omits those consumers. **Fix shape**: either add them to the schemas in a pass, or build the declared-versus-read instrument Ada offered (extending `StemmaTokenUsageValidator.validateAgainstSchema`, which today matches by substring) so the gap is caught by a guard rather than a review. The class option is the instrument.

## Notes

- Items 1 and 2 are component-semantics questions; Ada is consulted on token meaning, Stacy on parity.
- Item 4 is the second half of the P0 in `2026-06-25-component-schema-token-name-drift.md`: names now resolve, completeness does not. That record's fixing PR should cite this one so the residual is not read as closed.
