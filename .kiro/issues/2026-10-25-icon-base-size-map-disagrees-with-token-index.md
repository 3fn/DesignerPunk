# Icon-Base's size map says `size050` is 13px and `size125` is 32px; the token index computes 16px and 28px

**Date**: 2026-10-25
**Type**: DEFECT RECORD. It fixes nothing.
**Owner**: **Lina** (Icon-Base's `types.ts`, schema and README are hers). **Consulted**: Ada (the icon-size tokens and their formula are hers).
**Filed by**: Lina, under rule 10, while fixing sub-row 3a of `2026-10-23-served-docs-teach-non-key-token-names.md` on branch `fix/release-16.1.0-floor-lina`.
**Class**: P0 false-claim · defect *(set 2026-10-25, Lina, rule 12. `Icon-Base.schema.yaml` is served by the application MCP, and its `size` description pairs `size050` with 13px and `size125` with 32px, while `icon.size050` and `icon.size125` generate 16px and 28px. An agent that reads the schema and then uses the token gets a different size than it was told. Only Peter downgrades a P0. Filed after the 16.1.0 walk, so under the walk's own rule this is a phase-1 finding, not a walk row.)*
**Trigger**: `release:next:phase-1` — the release falsity floor's due point for a P0: fixed, or waived by Peter in that release's floor batch (ballot `2026-10-18-obligation-drain-and-release-falsity-floor` M7). Start condition (prose): Ada's read of which side is true.
**Status**: **OPEN**.

---

## What disagrees (VERIFIED, Lina, 2026-10-25, at `652074c6b` plus this branch)

- **Token index**, computed as `fontSize × lineHeight × 16` from `token-index/semantics.yaml` and `primitives.yaml`: `icon.size050` = 0.8125 × 1.231 = 16px; `icon.size125` = 1.125 × 1.556 = 28px. The generated `--icon-size-050: 16px` and `--icon-size-125: 28px` agree.
- **Icon-Base `types.ts`**: `iconBaseSizes.size050: 13` ("icon.size050"), `size125: 32` ("icon.size125"), and the doc comments at L102, L107, L133 and L136. `IconBaseSize` is `13 | 20 | 24 | 28 | 32 | 36 | 40 | 44 | 48`.
- **`Icon-Base.schema.yaml`** `size` description (served): "13px (size050)", "32px (size125/200/300)". The README's size table says the same.
- **Input-Checkbox-Base** `ICON_SIZE_MAP`: `sm: 13, // icon.size050 → 16px rendered`. A consumer already works around the gap.

## Not this record

- `18px` → `20px` for `size075` in the same schema line and the README. `IconBaseSize` has 20 and no 18, and `icon.size075` computes to 20px. That was a plain falsehood, and it is fixed on the branch named above (sub-row 3a's wider commit).

## The question (Ada's read first, then mine)

Is 13px (the `IconBaseSize` literal) the intended smallest icon, with `icon.size050` wrong? Or is `icon.size050` (16px) right, with Icon-Base's map and type wrong? The same question applies to `size125`: 28px or 32px. The fix follows the answer: either the token formula or override (Ada), or the type, schema, README and the checkbox map (Lina).

## What closes this record

Ada's read is appended here, the fixing PR names this record, and its outcome line is added under rule 5.
