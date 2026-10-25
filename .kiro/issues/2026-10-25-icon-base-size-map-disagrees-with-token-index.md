# Icon-Base's size map says `size050` is 13px and `size125` is 32px; the token index computes 16px and 28px

**Date**: 2026-10-25
**Type**: DEFECT RECORD. It fixes nothing.
**Owner**: **Lina** (Icon-Base's `types.ts`, schema and README are hers). **Consulted**: Ada (the icon-size tokens and their formula are hers).
**Filed by**: Lina, under rule 10, while fixing sub-row 3a of `2026-10-23-served-docs-teach-non-key-token-names.md` on branch `fix/release-16.1.0-floor-lina`.
**Class**: P0 false-claim · defect *(set 2026-10-25, Lina, rule 12. `Icon-Base.schema.yaml` is served by the application MCP, and its `size` description pairs `size050` with 13px and `size125` with 32px, while `icon.size050` and `icon.size125` generate 16px and 28px. An agent that reads the schema and then uses the token gets a different size than it was told. Only Peter downgrades a P0. Filed after the 16.1.0 walk, so under the walk's own rule this is a phase-1 finding, not a walk row.)*
**Trigger**: `merge:#471` — the fixing PR, which closes this record (rule 11) by recording the outcome and archiving it. *(was: `release:next:phase-1` — the release falsity floor's due point for a P0: fixed, or waived by Peter in that release's floor batch (ballot `2026-10-18-obligation-drain-and-release-falsity-floor` M7). Start condition (prose): Ada's read of which side is true.)* *(Re-ruled 2026-10-25, Lina, rules 1 and 9: the vehicle PR now exists, so the Trigger names its number, per ballot 2026-10-22-trigger-names-the-event-not-the-vehicle.)*
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

---

## Ada's read, Lina's fix, and the fork for Peter (2026-10-25, Lina)

**Ada's read** (`scratchpad/read-3a-icon-ada.md` § 2): "Truth: the token. icon.size050 = fontSize050 13 x custom 1.231 = 16 (deliberate optical correction, IconTokens.ts L100-104, comment '16px icon for 13px text'); icon.size125 = 18 x 1.556 = 28. Generated: dist web 16px/28px, iOS iconSize050=16/iconSize125=28. The '13' is the typography fontSize, conflated with the icon size." The misleading side is the docs and comments, not the rendering: iOS and Android take the token value, and web maps the literal 13 to `size-050` (`sizePixelMap` 13:16), so it renders 16. The prop literal 32 renders 32 (size200); "32px (size125/200/300)" is wrong for size125 only. Wrong served lines: `Icon-Base.schema.yaml` L65 and L69, `contracts.yaml` L45, README L126 and L129. Not served: `types.ts` L102–136, `styles.css` L49–61, the web error message ("18"). **P0 under M7: yes.** No token change (Ada: none).

**Fixed here** in `dc89e261c1f4279107a08a85553002fc48c82b9e` (CORRECTION; truth: `src/tokens/semantic/IconTokens.ts` and `token-index/semantics.yaml`): every line above now states 16px for size050 and 28px for size125; the multipliers in the comments are the token's (13 × 1.231, 14 × 1.429, 18 × 1.556, and so on); the error message lists 20, not 18, and says 13 renders 16px; the schema and README say at the site that the accepted value 13 renders 16px via `icon.size050`. The public literal 13 is still accepted. Icon-Base suite 21/21; `npm run generate:platform-tokens` leaves `token-index/` unchanged.

**Fork for Peter** (Ada's wording): "the public literal `13` renders 16px. Renaming it is a breaking API change. Keeping it needs a note saying the accepted value 13 renders 16px."
- **My recommendation: keep 13 and the note now** (done above). A rename, if ever, is a 17.0.0 candidate, since `IconBaseSize` is public API and a consumer's `size={13}` would stop compiling.
- **Ada's surviving counter-argument**: spec 006 may have intended 13, and the 16 override came later as drift. The token comment shows 16 is deliberate, but the record cannot prove who decided. If Peter wants 13 back, that is a token change (Ada's), and every consumer re-renders.
- **A second item I found, held for Peter, not changed**: `iconBaseSizes.size125` is the value `32` in `types.ts` (a public runtime constant), so `size={iconBaseSizes.size125}` renders 32px on web while the `icon.size125` token and iOS render 28px. I annotated it in the comment and left the value, because changing it re-renders consumers. My recommendation is to change it to 28 (it is still a valid `IconBaseSize`); that is a rendering change, so it is Peter's call. Input-Checkbox-Base's `ICON_SIZE_MAP` (`sm: 13 // icon.size050 → 16px rendered`) is already correct against the note.

Trigger unchanged; it becomes `merge:#<N>` when the PR opens.
