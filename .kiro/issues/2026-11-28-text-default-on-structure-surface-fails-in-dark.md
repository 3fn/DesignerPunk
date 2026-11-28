# Issue: in both dark themes, `color.text.default` on `color.structure.surface` is white on near-white (1.16:1), so chips and other surface-backed components are unreadable

**Date**: 2026-11-28
**Owner**: Ada (tokens). Lina is consulted for the component reads. Leonardo judges whether a light surface on the dark canvas is intended. The colour choices are Peter's, as for every dark-theme pick (`2026-09-12-semantic-contrast-adjudication-queue.md`).
**Trigger**: `release:next:phase-1` — the event that owes this record's close is the next release's phase 1 (16.4.0 today). By then the fix has shipped, or Peter has ruled on it in that release's batch. The fix's vehicle is not chosen: a dark override now, 133 U1, or the semantic-contrast spec. So this record names the deadline, not a vehicle (rule 1).
**Class**: P1 consumer-blocking · defect *(set 2026-11-28, Ada, owner, rule 12.)*
- **Why P1**: an adopter whose app follows the system dark scheme ships chip labels at 1.16:1 on every platform. The web components involved are served production-ready. The only way out without our fix is a theme override of a system token.
- **Possible P0 reading, not taken by me**: the components are served production-ready under an accessibility-first, WCAG 2.1 AA goal (Core Goals). Stacy may read this as P0 false-claim. Only Peter rules on that.
**Source**:
- Raised as a question of intent: `[STACY R5]` in `.kiro/specs/132-native-components-in-app/feedback/design-outline.md` (L2455 onward), and `[ADA R6]` / `[ADA R14]` there.
- Measured while filing, with the repo's `contrastRatio` (`src/color/OklchConverter.ts`) over the token source. That measurement is what turns the intent question into a defect.
- `[THURGOOD R22]`, ibid., item (e).

---

## The defect (VERIFIED at `8f05f76b8` unless marked)

**The surface does not change with the theme.**
- `color.structure.surface` is `white200`, OKLCH L 0.95 (`src/tokens/semantic/ColorTokens.ts` L511).
- No dark map overrides it. In `src/tokens/themes/dark/SemanticOverrides.ts`, surface appears only in the commented base listing (L104–107), and `dark-wcag` holds two overrides, neither for surface.
- So the surface stays at L 0.95 in base-dark and wcag-dark, while the canvas goes to `gray400`, L 0.42 (dark map L182).

**The text does change with the theme.**
- `color.text.default` is `gray300` in light (L401), and `white100` in dark (dark map L177).
- That dark override is the 2026-09-13 interim fix, Peter-ratified, and it was measured against the canvas only (`2026-09-12-semantic-contrast-adjudication-queue.md` § "Interim fix", L84 onward).

**The ratios** (repo's `contrastRatio`):

| Pair | Light | Dark |
|---|---|---|
| `text.default` on `surface` | gray300 on white200: **4.76:1** (passes AA) | white100 on white200: **1.16:1** (fails 1.4.3's 4.5:1) |

The interim fix is what moved dark from passing to 1.16:1. Before it, dark kept gray300 at 4.76:1 on this surface.

**Components that render this pair.**
- Chip-Base on web: `ChipBase.styles.css` L61–62 (background `--color-structure-surface`, text `--color-text-default`).
- Chip-Base on iOS: `ChipBase.ios.swift` L241.
- Chip-Base on Android: `ChipBase.android.kt` L198 and L251/L264.
- Chip-Filter and Chip-Input inherit the same pair.
- Other components read `structure.surface`: Badge-Count-Base, Badge-Label-Base, Container-Base, Container-Card-Base, Nav-SegmentedChoice-Base (grep). Which text colour each places on it is UNVERIFIED, and is Lina's read.

**Why the guard misses it.** `src/tokens/__tests__/SemanticColorContrast.test.ts` asserts text roles against `color.structure.canvas` (L122), not against `structure.surface`. This pair is neither asserted nor in its exemption list.

## The fork (Leonardo reads intent; Peter picks)

1. **A dark surface.** Override `color.structure.surface` (and `.primary`, `.secondary`, `.tertiary`) in both dark maps to a dark step above the canvas. The text then passes as it is. This needs no new token, only a dark-theme pick, which is Peter's.
2. **Keep the light surface.** Give surface-backed text a role token that is paired with the surface: the contrast queue's "declared pairing contracts", deliverable 1. That would be a new semantic token, so Peter reviews it.

Either way, the guard gains `text.default` (and muted and subtle) against `structure.surface` in every theme, with a known-bad case that fails today. The 133 U1 state tokens derive from the surface, so the fork is settled before U1 computes them.

*Signed: Ada, 2026-11-28.*
