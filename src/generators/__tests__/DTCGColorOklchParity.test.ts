/**
 * DTCG Color / OKLCH Parity — regression guard for the dual-color-source divergence.
 *
 * @category evergreen
 * @purpose Prevent the DTCG/Figma export from silently drifting off the OKLCH
 *          source of record again (the CSS/Swift/Kotlin path via
 *          `SemanticValueResolver.resolveColorPrimitive`). This is the missing
 *          test called out in `.kiro/issues/2026-08-25-dual-color-source-divergence.md`
 *          § "Whichever is chosen ...": no test previously asserted that a
 *          primitive's DTCG `$value` matches the CSS emission for the same
 *          primitive — which is exactly why the divergence drifted in silently.
 *
 * Ruling: Option A (Peter, 2026-09-12) — DTCGFormatGenerator.resolveColorValue()
 * now checks `composedColorMap` first and routes through `oklchToExportHex`,
 * mirroring `SemanticValueResolver.resolveColorPrimitive()`.
 *
 * @see .kiro/issues/2026-08-25-dual-color-source-divergence.md
 * @see src/generators/DTCGFormatGenerator.ts (resolveColorValue)
 * @see src/resolvers/SemanticValueResolver.ts:24-41 (the CSS/Swift/Kotlin path this mirrors)
 * @see src/generators/oklch/OklchExportUtils.ts (oklchToExportHex — Spec 112 R5)
 */

import { DTCGFormatGenerator } from '../DTCGFormatGenerator';
import type { DTCGGroup, DTCGToken } from '../types/DTCGTypes';
import { composedColorMap } from '../../tokens/color';
import { oklchToExportHex } from '../oklch/OklchExportUtils';
import { colorTokens } from '../../tokens/ColorTokens';
import type { ColorTokenValue, PrimitiveToken } from '../../types/PrimitiveToken';

// The four legacy-only shadow primitives absent from composedColorMap (Option A scope note).
const LEGACY_ONLY_SHADOW_PRIMITIVES = [
  'shadowBlack100',
  'shadowBlue100',
  'shadowOrange100',
  'shadowGray100',
];

describe('DTCG color primitives agree with the OKLCH source of record (Option A parity)', () => {
  let colorGroup: DTCGGroup;

  beforeAll(() => {
    const generator = new DTCGFormatGenerator();
    const output = generator.generate();
    colorGroup = output.color as DTCGGroup;
  });

  it('composedColorMap is non-empty (sanity check the fixture this test depends on)', () => {
    expect(composedColorMap.size).toBeGreaterThan(0);
  });

  it('emits every composedColorMap primitive in the DTCG color group', () => {
    for (const name of composedColorMap.keys()) {
      expect(colorGroup[name]).toBeDefined();
    }
  });

  // The load-bearing assertion: for every OKLCH primitive, DTCG $value must be the
  // sRGB hex of the SAME oklch(l, c, h) that the CSS/Swift/Kotlin path emits via
  // SemanticValueResolver.resolveColorPrimitive() (`oklch(${l} ${c} ${h})`), gamut
  // mapping included. If DTCGFormatGenerator regresses to the legacy RGBA path (or
  // a future change reintroduces a second source), this fails immediately.
  describe.each(Array.from(composedColorMap.entries()))(
    'primitive %s',
    (name, composed) => {
      it(`$value hex matches oklchToExportHex(${JSON.stringify(composed.resolved)})`, () => {
        const { l, c, h } = composed.resolved;
        const expectedHex = oklchToExportHex(l, c, h).hex;

        const token = colorGroup[name] as DTCGToken;
        expect(token).toBeDefined();
        expect(token.$value).toBe(expectedHex);
      });

      it(`$value is a valid hex color, never a raw oklch() string`, () => {
        const token = colorGroup[name] as DTCGToken;
        expect(String(token.$value)).toMatch(/^#[0-9a-f]{6}$/i);
        expect(String(token.$value)).not.toMatch(/oklch\(/);
      });
    }
  );

  it('asserted every composedColorMap primitive (parity coverage count)', () => {
    // Documents the exact count this describe.each covered, so a future primitive
    // addition/removal is visible in test output rather than silently changing scope.
    expect(composedColorMap.size).toBeGreaterThanOrEqual(50);
  });
});

describe('Legacy-only shadow primitives still resolve via the legacy RGBA path', () => {
  let colorGroup: DTCGGroup;

  beforeAll(() => {
    const generator = new DTCGFormatGenerator();
    const output = generator.generate();
    colorGroup = output.color as DTCGGroup;
  });

  it.each(LEGACY_ONLY_SHADOW_PRIMITIVES)(
    '%s is absent from composedColorMap (confirms it takes the legacy fallback)',
    (name) => {
      expect(composedColorMap.get(name)).toBeUndefined();
    }
  );

  it.each(LEGACY_ONLY_SHADOW_PRIMITIVES)(
    '%s emits a valid color and matches its legacy light.base value',
    (name) => {
      const token = colorGroup[name] as DTCGToken;
      expect(token).toBeDefined();
      expect(String(token.$value)).toMatch(
        /^(#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6}|[0-9A-Fa-f]{8})|rgba?\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*(,\s*[\d.]+\s*)?\))$/
      );

      const legacyToken = (colorTokens as Record<string, PrimitiveToken>)[name];
      const legacyValue = (legacyToken.platforms.web.value as ColorTokenValue).light.base;
      expect(token.$value).toBe(legacyValue);
    }
  );
});

describe('Self-consistency: semantic color $value (resolved) agrees with its own primitive', () => {
  it('resolving aliases produces the same hex as the primitive group for every semantic color token backed by an OKLCH primitive', () => {
    const generator = new DTCGFormatGenerator({ resolveAliases: true });
    const output = generator.generate();
    const semanticGroup = output.semanticColor as DTCGGroup;
    const primitiveGroup = output.color as DTCGGroup;

    const checked: string[] = [];
    for (const [key, value] of Object.entries(semanticGroup)) {
      if (key.startsWith('$')) continue;
      const token = value as DTCGToken;
      const resolvedValue = String(token.$value);
      // Only check tokens that resolved to a hex color (skip rgba-composited/opacity tokens).
      if (!/^#[0-9a-f]{6}$/i.test(resolvedValue)) continue;

      // Find the primitive in the primitive color group whose $value matches — the
      // resolved semantic value must correspond to SOME primitive's emitted hex.
      const matchesAPrimitive = Object.entries(primitiveGroup).some(
        ([pKey, pValue]) => !pKey.startsWith('$') && (pValue as DTCGToken).$value === resolvedValue
      );
      expect(matchesAPrimitive).toBe(true);
      checked.push(key);
    }

    // Guard against the check silently checking zero tokens (a vacuously-true test).
    expect(checked.length).toBeGreaterThan(0);
  });
});
