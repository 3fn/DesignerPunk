/**
 * @category evergreen
 * @purpose Verify chromatic channel primitives pass all OklchValidator constraints (Spec 112 R1)
 */

import { OklchValidator, ColorFamily } from '../../color/OklchValidator';
import { colorHues } from '../color/channels/hues';
import {
  pinkLightness, orangeLightness, yellowLightness, greenLightness,
  cyanLightness, tealLightness, purpleLightness,
} from '../color/channels/lightness/chromatic';
import {
  pinkChroma, orangeChroma, yellowChroma, greenChroma,
  cyanChroma, tealChroma, purpleChroma,
} from '../color/channels/chroma/chromatic';

const validator = new OklchValidator();

const families: ColorFamily[] = [
  { name: 'pink', hue: colorHues.pink, lightness: Object.values(pinkLightness), chroma: Object.values(pinkChroma) },
  { name: 'orange', hue: colorHues.orange, lightness: Object.values(orangeLightness), chroma: Object.values(orangeChroma) },
  { name: 'yellow', hue: colorHues.yellow, lightness: Object.values(yellowLightness), chroma: Object.values(yellowChroma) },
  { name: 'green', hue: colorHues.green, lightness: Object.values(greenLightness), chroma: Object.values(greenChroma) },
  { name: 'cyan', hue: colorHues.cyan, lightness: Object.values(cyanLightness), chroma: Object.values(cyanChroma) },
  { name: 'teal', hue: colorHues.teal, lightness: Object.values(tealLightness), chroma: Object.values(tealChroma) },
  { name: 'purple', hue: colorHues.purple, lightness: Object.values(purpleLightness), chroma: Object.values(purpleChroma) },
];

describe('Chromatic channel primitives validation (Spec 112 R1)', () => {
  for (const family of families) {
    describe(family.name, () => {
      it('passes all family constraints', () => {
        const result = validator.validateFamily(family);
        if (!result.valid) {
          fail(`${family.name} validation failed:\n  ${result.errors.join('\n  ')}`);
        }
      });

      it('has exactly 5 lightness steps', () => {
        expect(family.lightness).toHaveLength(5);
      });

      it('has exactly 5 chroma steps', () => {
        expect(family.chroma).toHaveLength(5);
      });

      it('has P3-only warnings at most (no hard gamut errors)', () => {
        const result = validator.validateFamily(family);
        expect(result.errors).toEqual([]);
      });
    });
  }

  it('all 7 chromatic families are present', () => {
    expect(families).toHaveLength(7);
  });
});
