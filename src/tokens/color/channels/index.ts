/**
 * Color Channel Primitives — Barrel Export
 *
 * Exports all hue, lightness, and chroma channel primitives.
 */

export { colorHues, neutralHue, type ChromaticFamily } from './hues';

export {
  pinkLightness, orangeLightness, yellowLightness, greenLightness,
  cyanLightness, tealLightness, purpleLightness,
} from './lightness/chromatic';

export { whiteLightness, grayLightness, blackLightness } from './lightness/neutral';

export {
  pinkChroma, orangeChroma, yellowChroma, greenChroma,
  cyanChroma, tealChroma, purpleChroma,
} from './chroma/chromatic';

export { whiteChroma, grayChroma, blackChroma } from './chroma/neutral';
