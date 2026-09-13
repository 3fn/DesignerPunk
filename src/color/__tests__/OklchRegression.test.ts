/**
 * @category evergreen
 * @purpose Composed-color stability guard. Asserts the composed OKLCH pipeline
 *   (channels → composed primitives) has not drifted from the frozen pre-migration
 *   sRGB reference: ΔE₀₀ < 1 for colors NOT intentionally changed by the OKLCH
 *   migration (Spec 112 R11 AC4). Intentional changes — family-hue systematization,
 *   chroma boosts, lightness redistribution, neutral partition redesign — are
 *   enumerated in INTENTIONALLY_CHANGED with a causal, one-line rationale each; the
 *   exemption criterion is causal, never magnitudinal (a color is exempt because a
 *   ratified design act caused its delta, never because its delta is large).
 *   See `.kiro/issues/2026-09-12-spec-112-completion-claims-audit.md` § "F5 Ruling
 *   & Remediation" (2026-09-13, Peter-ratified) for the full record.
 */

import { deltaE00, fromSrgbHex, toSrgbHex, type Oklch } from '../../color/OklchConverter';
import { composedColorMap } from '../../tokens/color';

/**
 * Pre-migration RGB hex values (from original ColorTokens.ts light.base).
 * These are the reference for regression validation.
 */
const PRE_MIGRATION_RGB: Record<string, string> = {
  // Pink
  pink100: '#ffdae8', pink200: '#ff82b4', pink300: '#ff2a6d', pink400: '#cc2257', pink500: '#801537',
  // Orange
  orange100: '#ffe5dc', orange200: '#ffb8a0', orange300: '#ff6b35', orange400: '#cc5529', orange500: '#8f3c1d',
  // Yellow
  yellow100: '#fefbcc', yellow200: '#fcf680', yellow300: '#f9f002', yellow400: '#c7c002', yellow500: '#8f8b01',
  // Purple
  purple100: '#f3e0ff', purple200: '#d98aff', purple300: '#b026ff', purple400: '#8d1ecc', purple500: '#63158f',
  // Cyan
  cyan100: '#ccfbff', cyan200: '#80f6ff', cyan300: '#00f0ff', cyan400: '#00c0cc', cyan500: '#00888f',
  // Teal (intentionally changed — chroma boost)
  teal100: '#d9e8ea', teal200: '#4d9ba5', teal300: '#1a535c', teal400: '#15424a', teal500: '#0f2e33',
  // Green (intentionally changed — lightness redistribution)
  green100: '#e6fff5', green200: '#80ffbb', green300: '#33ff99', green400: '#00ff88', green500: '#00cc6e',
  // Neutrals (intentionally changed — partition redesign)
  white100: '#ffffff', white200: '#f5f5fa', white300: '#e8e8f0', white400: '#c5c5d5', white500: '#9999ab',
  gray100: '#b2bcc4', gray200: '#5e707c', gray300: '#26323a', gray400: '#182228', gray500: '#10161a',
  black100: '#3a3a45', black200: '#22222a', black300: '#0a0a0f', black400: '#06060a', black500: '#000000',
};

/**
 * Colors intentionally changed by the migration (lightness redistribution, chroma boost,
 * neutral redesign, family-hue systematization). Exemption is causal, not magnitudinal —
 * see F5 Ruling, `.kiro/issues/2026-09-12-spec-112-completion-claims-audit.md`.
 */
const INTENTIONALLY_CHANGED = new Set([
  // Pink 100-200: hue normalization (original H≈353-356, normalized to family hue H=10)
  'pink100', 'pink200',
  // Teal: chroma boost
  'teal100', 'teal200', 'teal300', 'teal400', 'teal500',
  // Green100: family-hue systematization (H 169.75 → family hue 154 per R1 AC3; non-hue
  // residual 0.535, decimal rounding)
  'green100',
  // Green 200-500: lightness redistributed from compressed 0.88/0.88 to even steps
  'green200', 'green300', 'green400', 'green500',
  // Yellow: lightness redistributed from compressed 0.95/0.93 to even steps
  'yellow200', 'yellow300', 'yellow400', 'yellow500',
  // Cyan: lightness redistributed
  'cyan200', 'cyan300', 'cyan400', 'cyan500',
  // Purple 200-400: family-hue systematization (H 313.93/307.98/308.27 → family hue 310
  // per R1 AC3; L/C match to rounding, non-hue ΔE₀₀ ≤ 0.134)
  'purple200', 'purple300', 'purple400',
  // Neutrals: entire partition redesigned (new L/C/H values)
  'white100', 'white200', 'white300', 'white400', 'white500',
  'gray100', 'gray200', 'gray300', 'gray400', 'gray500',
  'black100', 'black200', 'black300', 'black400', 'black500',
]);

describe('OKLCH Migration Regression (Spec 112 R11 AC4)', () => {
  describe('non-intentionally-changed colors: ΔE₀₀ < 1', () => {
    const nonChanged = Object.keys(PRE_MIGRATION_RGB).filter(k => !INTENTIONALLY_CHANGED.has(k));

    for (const name of nonChanged) {
      it(`${name}: ΔE₀₀ < 1 vs original RGB`, () => {
        const composed = composedColorMap.get(name);
        expect(composed).toBeDefined();

        const originalOklch = fromSrgbHex(PRE_MIGRATION_RGB[name]);
        const newOklch = composed!.resolved;
        const dE = deltaE00(originalOklch, newOklch);

        // Ratified threshold (Spec 112 R11 AC4; F5 ruling 2026-09-13): the remaining 12
        // non-intentionally-changed colors max at ΔE₀₀ ≈ 0.741 (yellow100) — a real
        // quantization budget (R5 AC5), not a relaxed one.
        expect(dE).toBeLessThan(1);
      });
    }
  });

  describe('intentionally changed colors: causal exemptions (F5 ruling, 2026-09-13)', () => {
    const changed = Object.keys(PRE_MIGRATION_RGB).filter(k => INTENTIONALLY_CHANGED.has(k));

    it('every intentionally-changed name is a real color in both reference maps', () => {
      // Exemption-set hygiene: closes the reverse direction of the "all 50 composed
      // colors have a pre-migration reference" check below — every name claimed as
      // intentionally-changed must actually exist in both maps, not just be a string.
      const missingFromPreMigration = Array.from(INTENTIONALLY_CHANGED).filter(
        name => !(name in PRE_MIGRATION_RGB)
      );
      const missingFromComposed = Array.from(INTENTIONALLY_CHANGED).filter(
        name => !composedColorMap.has(name)
      );
      expect(missingFromPreMigration).toEqual([]);
      expect(missingFromComposed).toEqual([]);
    });

    it('white100: ΔE₀₀ ≈ 0 vs #ffffff — sRGB↔OKLab round-trip float residual only, not tinting (neutralHue is product-configurable per R2 AC6)', () => {
      const composed = composedColorMap.get('white100');
      expect(composed).toBeDefined();
      const originalOklch = fromSrgbHex(PRE_MIGRATION_RGB.white100);
      const dE = deltaE00(originalOklch, composed!.resolved);
      // Measured residual ≈ 1.29e-5 (l=1/c=0 does not round-trip to exactly 1/0 through the
      // sRGB↔OKLab conversion matrices in floating point). Too large for a ≤1e-9 epsilon —
      // verified before choosing — so bounded loosely but still far tighter than the < 1
      // migration threshold: any real hue tint would land orders of magnitude above this.
      expect(dE).toBeLessThan(0.0001);
    });

    it('black500: ΔE₀₀ exactly 0 vs #000000 — l=0/c=0 has no floating-point residual (neutralHue is product-configurable per R2 AC6)', () => {
      const composed = composedColorMap.get('black500');
      expect(composed).toBeDefined();
      const originalOklch = fromSrgbHex(PRE_MIGRATION_RGB.black500);
      const dE = deltaE00(originalOklch, composed!.resolved);
      // Verified: black500's dE computes to exact 0 (unlike white100), so strict
      // equality holds rather than needing an epsilon.
      expect(dE).toBe(0);
    });

    const remaining = changed.filter(name => name !== 'white100' && name !== 'black500');
    for (const name of remaining) {
      it(`${name}: exists in composed color map (magnitude not asserted — rider 3 declined per F5 ruling)`, () => {
        expect(composedColorMap.get(name)).toBeDefined();
      });
    }
  });

  it('all 50 composed colors have a pre-migration reference', () => {
    const composed = Array.from(composedColorMap.keys());
    const missing = composed.filter(name => !PRE_MIGRATION_RGB[name]);
    // All composed colors should have a reference (green100 and yellow100 are kept similar)
    expect(missing).toEqual([]);
  });
});
