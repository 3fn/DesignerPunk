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
import type { ShadowColor } from '../../tokens/color/primitives/shadow';

export interface OklchTokenMetadata {
  oklch: Oklch;
  /** Absent for the shadow colours, which have no channel tokens (Spec 129 design § 8). */
  channels?: {
    hue: string;
    lightness: string;
    chroma: string;
  };
}

/**
 * Generate OKLCH metadata for a composed color token's token-index entry.
 */
export function getOklchMetadata(color: ComposedColor): OklchTokenMetadata & Required<Pick<OklchTokenMetadata, 'channels'>>;
export function getOklchMetadata(color: ComposedColor | ShadowColor): OklchTokenMetadata;
export function getOklchMetadata(color: ComposedColor | ShadowColor): OklchTokenMetadata {
  const metadata: OklchTokenMetadata = { oklch: color.resolved };
  if ('channels' in color && color.channels) metadata.channels = color.channels;
  return metadata;
}
