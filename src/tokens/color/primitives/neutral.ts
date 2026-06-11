/**
 * Composed Neutral Color Primitives — OKLCH colors resolved from channel references.
 *
 * All neutral families share `neutralHue`. Composed at module load time.
 *
 * @see Spec 112 R2
 */

import type { Oklch } from '../../../color/OklchConverter';
import { neutralHue } from '../channels/hues';
import { whiteLightness, grayLightness, blackLightness } from '../channels/lightness/neutral';
import { whiteChroma, grayChroma, blackChroma } from '../channels/chroma/neutral';
import type { ComposedColor } from './chromatic';

type StepMap = Record<number, number>;

function composeNeutralFamily(
  family: string,
  lightness: StepMap,
  chroma: StepMap,
): ComposedColor[] {
  return Object.keys(lightness).map(k => {
    const step = Number(k);
    return {
      name: `${family}${step}`,
      family,
      step,
      channels: {
        hue: 'neutralHue',
        lightness: `${family}Lightness${step}`,
        chroma: `${family}Chroma${step}`,
      },
      resolved: { l: lightness[step], c: chroma[step], h: neutralHue },
    };
  });
}

export const neutralColors: ComposedColor[] = [
  ...composeNeutralFamily('white', whiteLightness, whiteChroma),
  ...composeNeutralFamily('gray', grayLightness, grayChroma),
  ...composeNeutralFamily('black', blackLightness, blackChroma),
];

/** Lookup a composed neutral color by name. */
export const neutralColorMap = new Map(neutralColors.map(c => [c.name, c]));
