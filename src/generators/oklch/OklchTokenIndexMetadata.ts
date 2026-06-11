/**
 * OKLCH Token-Index Metadata — Enriches token-index color entries with OKLCH channels.
 *
 * Channel data is metadata on composed colors (not separate top-level entries).
 * Application MCP `get_token_details` returns these values alongside platform names.
 *
 * @see Spec 112 R9 AC1-4
 */

import type { Oklch } from '../../color/OklchConverter';
import type { ComposedColor } from '../../tokens/color/primitives/chromatic';

export interface OklchTokenMetadata {
  oklch: Oklch;
  channels: {
    hue: string;
    lightness: string;
    chroma: string;
  };
}

/**
 * Generate OKLCH metadata for a composed color token's token-index entry.
 */
export function getOklchMetadata(color: ComposedColor): OklchTokenMetadata {
  return {
    oklch: color.resolved,
    channels: color.channels,
  };
}
