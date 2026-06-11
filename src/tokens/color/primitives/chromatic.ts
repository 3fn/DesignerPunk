/**
 * Composed Chromatic Color Primitives — OKLCH colors resolved from channel references.
 *
 * Each color is composed at module load time from its family's hue, lightness, and chroma.
 * Components and semantics reference these composed tokens by name (e.g., 'pink300').
 *
 * @see Spec 112 R1 AC2
 */

import type { Oklch } from '../../../color/OklchConverter';
import { colorHues } from '../channels/hues';
import {
  pinkLightness, orangeLightness, yellowLightness, greenLightness,
  cyanLightness, tealLightness, purpleLightness,
} from '../channels/lightness/chromatic';
import {
  pinkChroma, orangeChroma, yellowChroma, greenChroma,
  cyanChroma, tealChroma, purpleChroma,
} from '../channels/chroma/chromatic';

export interface ComposedColor {
  name: string;
  family: string;
  step: number;
  channels: { hue: string; lightness: string; chroma: string };
  resolved: Oklch;
}

type StepMap = Record<number, number>;

function composeFamily(
  family: string,
  hue: number,
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
        hue: `${family}Hue`,
        lightness: `${family}Lightness${step}`,
        chroma: `${family}Chroma${step}`,
      },
      resolved: { l: lightness[step], c: chroma[step], h: hue },
    };
  });
}

export const chromaticColors: ComposedColor[] = [
  ...composeFamily('pink', colorHues.pink, pinkLightness, pinkChroma),
  ...composeFamily('orange', colorHues.orange, orangeLightness, orangeChroma),
  ...composeFamily('yellow', colorHues.yellow, yellowLightness, yellowChroma),
  ...composeFamily('green', colorHues.green, greenLightness, greenChroma),
  ...composeFamily('cyan', colorHues.cyan, cyanLightness, cyanChroma),
  ...composeFamily('teal', colorHues.teal, tealLightness, tealChroma),
  ...composeFamily('purple', colorHues.purple, purpleLightness, purpleChroma),
];

/** Lookup a composed chromatic color by name. */
export const chromaticColorMap = new Map(chromaticColors.map(c => [c.name, c]));
