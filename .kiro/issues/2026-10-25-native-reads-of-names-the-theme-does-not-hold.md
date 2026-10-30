# Two Native Component Files Read Theme Names That Are Not Token-Index Keys

**Date**: 2026-10-25
**Filed by**: Lina, under rule 10, found by the declared-versus-read scan of the 16.1.0 floor row 4 schema pass (`2026-10-23-schema-tokens-declared-vs-read-completeness.md`, owner line 2026-10-25)
**Owner**: Lina (the component reads). Ada is consulted on which token each should read.
**Class**: P1 consumer-blocking · defect *(set 2026-10-25, Lina, rule 12, on a reasoned read, not a build: no Swift or Kotlin toolchain here. Each site names a member of the generated `theme` that the token index does not hold, which a native build reports as an unresolved reference. Native ships as reference source, so no reader is misled about it building, which keeps this out of P0; it is P1 for the same reason as `2026-10-24-android-component-unit-type-mismatches.md`.)*
**Trigger**: `release:next:phase-1` — the event that owes the close is the PR that points both sites at keys the index holds. *(Set 2026-10-25, Lina, rule 1: the fixing PR's number does not exist yet; the owner changes this to `merge:#<N>` when it opens.)*

---

## What is wrong

1. **`Avatar.ios.swift` L583** (`borderColor`, case `.xxl`): `return theme.colorStructureBorderXxl`. There is no token `color.structure.border.xxl` (or any key whose iOS name is `colorStructureBorderXxl`) in `token-index/semantics.yaml`. The header comment above it says the xxl border is `color.contrast.onSurface` "(white) with full opacity", a different name again. Which token the xxl border should read is Ada's to say.
2. **`ContainerBase.android.kt` L566 and `TokenMapping.kt` L231, L345**: `"color.border.emphasis" -> theme.color_border_emphasis`. `color.border.emphasis` is a retired name (the border colours are `color.structure.*`); `color_border_emphasis` is not in the index. Container-Base's README (L320, L335) and iOS `TokenMapping.swift` L457 (`colorBorderEmphasis`, a hard-coded `Color.gray.opacity(0.5)`) carry the same retired name, so the README is wrong in the same way and the iOS value is a literal, not a token.

## Fix shape

Point each site at a key the index holds (the owner's pick after Ada's read on the two names), and correct the Container-Base README lines. No declaration to add: the schema pass found nothing to declare for either.

*Signed: Lina, 2026-10-25.*

## Lapse (2026-10-29)

Firing commit `38f4ece47` (#505, the squash tagged `v16.1.0`: release 16.1.0's S). No ancestor of S closed or re-ruled this record: it is in Stacy's recount, `.kiro/specs/123-consumer-distribution/completion/claims-pass-release-16.1.0.md` § "What lapses at S, recounted from commits that are ancestors of S", and no heading named this SHA. Appended by the walker at release 16.2.0's walk (`.kiro/issues/2026-10-29-release-16.2.0-walk.md`; rule 11: whoever observes a lapse appends). It records the lapse and decides nothing else; the owner's disposition stands. Signed Thurgood (steward, rule 11), 2026-10-29.
