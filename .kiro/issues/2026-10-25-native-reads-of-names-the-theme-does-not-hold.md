# Two Native Component Files Read Theme Names That Are Not Token-Index Keys

**Date**: 2026-10-25
**Filed by**: Lina, under rule 10, found by the declared-versus-read scan of the 16.1.0 floor row 4 schema pass (`2026-10-23-schema-tokens-declared-vs-read-completeness.md`, owner line 2026-10-25)
**Owner**: Lina (the component reads). Ada is consulted on which token each should read.
**Class**: P1 consumer-blocking · defect *(set 2026-10-25, Lina, rule 12, on a reasoned read, not a build: no Swift or Kotlin toolchain here. Each site names a member of the generated `theme` that the token index does not hold, which a native build reports as an unresolved reference. Native ships as reference source, so no reader is misled about it building, which keeps this out of P0; it is P1 for the same reason as `2026-10-24-android-component-unit-type-mismatches.md`.)*
**Trigger**: `release:16.3.0:phase-1` — the event that owes the close is the PR that points both sites at keys the index holds, no later than 16.3.0's S (Ada's reads, 2026-10-30). For Avatar xxl, that is `color.contrast.onDark`, with the two Swift comments and the README row that name `color.contrast.onSurface` corrected. For Container-Base, the `color.border.emphasis` mapping is **removed**, not re-pointed, per the schema at L218–L220; Android L564's retired `color.border.default` key moves to `color.structure.border`; and the README L320/L335 are corrected. *(Re-ruled 2026-11-01, Lina, owner, rules 9 and 11. Disposition: fix-now by 16.3.0's S (sheet r2.1, row A1). Authority: Peter's one-off delegation, `DLG@d34fc77868f649d3c67bd1b1da47bc6f2a805920` (`.kiro/issues/2026-10-30-release-16-2-peter-rulings-and-delegation.md` § "Delegation"), under which the collective's disposition sheet r2.1 ruled this row; his R8 answers, `R8@0184efb3fd7b2956677351fdf84899767a5ac74a`; and his ruling of 2026-11-01 that the dispositions ruled under DLG and R8 are a valid state for 16.2.0 (relayed via the Spec 131 session, received before 2026-11-01T13:42:54Z: "Proceed as you recommend", on "(a) on both"). Owner's recommendation: the 16.2.0 escalation package, Lina's file, as cross-read by the collective. The superseded line is quoted verbatim at the end of this record.)*

---

## What is wrong

1. **`Avatar.ios.swift` L583** (`borderColor`, case `.xxl`): `return theme.colorStructureBorderXxl`. There is no token `color.structure.border.xxl` (or any key whose iOS name is `colorStructureBorderXxl`) in `token-index/semantics.yaml`. The header comment above it says the xxl border is `color.contrast.onSurface` "(white) with full opacity", a different name again. Which token the xxl border should read is Ada's to say.
2. **`ContainerBase.android.kt` L566 and `TokenMapping.kt` L231, L345**: `"color.border.emphasis" -> theme.color_border_emphasis`. `color.border.emphasis` is a retired name (the border colours are `color.structure.*`); `color_border_emphasis` is not in the index. Container-Base's README (L320, L335) and iOS `TokenMapping.swift` L457 (`colorBorderEmphasis`, a hard-coded `Color.gray.opacity(0.5)`) carry the same retired name, so the README is wrong in the same way and the iOS value is a literal, not a token.

## Fix shape

Point each site at a key the index holds (the owner's pick after Ada's read on the two names), and correct the Container-Base README lines. No declaration to add: the schema pass found nothing to declare for either.

*Signed: Lina, 2026-10-25.*

*(2026-11-01, Lina, owner, rules 9 and 11: Trigger re-ruled as above. The superseded Trigger line, verbatim:)*

> **Trigger**: `release:next:phase-1` — the event that owes the close is the PR that points both sites at keys the index holds. *(Set 2026-10-25, Lina, rule 1: the fixing PR's number does not exist yet; the owner changes this to `merge:#<N>` when it opens.)*
