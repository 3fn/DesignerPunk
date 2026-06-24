/**
 * ModeResolvedTokens — the single shared mode-resolution source (Spec 117 Task 3).
 *
 * `generateTokenFiles` performs the dist path's Stage-4 mode resolution exactly once
 * and returns this object. Both dist output (which `generateTokenFiles` writes itself)
 * and the token index (`generateTokenIndex`) read from this single source, so the two
 * can no longer drift. The CLI is a pure conduit: it threads this object from
 * `generateTokenFiles` into `generateTokenIndex` without recomputing anything.
 *
 * @see .kiro/specs/117-token-index-generation-integrity/findings/task-3-mechanics.md
 */

import type { SemanticToken } from '../types/SemanticToken';
import type { OklchTokenMetadata } from './oklch/OklchTokenIndexMetadata';

/** A semantic token with its primitiveReferences resolved to mode-specific values. */
export type ResolvedSemanticToken = Omit<SemanticToken, 'primitiveTokens'>;

/** Mode-resolved OKLCH for a single color primitive (light/dark). */
export interface PrimitiveOklchModes {
  light: OklchTokenMetadata;
  dark: OklchTokenMetadata;
}

/**
 * The mode-resolved truth produced once by `generateTokenFiles` and consumed by the index.
 */
export interface ModeResolvedTokens {
  /** Base-context light semantic tokens with primitiveReferences resolved. */
  resolvedLight: ResolvedSemanticToken[];
  /** Base-context dark semantic tokens with primitiveReferences resolved. */
  resolvedDark: ResolvedSemanticToken[];

  /**
   * BASE-SCOPED theme-varying set for the INDEX (Spec 117 §4.1).
   *
   * This is computed PURELY from the base light-vs-dark resolved value diff — the same
   * predicate the web base `:root` block uses to decide `light-dark()` emission
   * (`TokenFileGenerator.ts` value comparison). Under the shipped config it is exactly the
   * 5 dark-override keys.
   *
   * It is DELIBERATELY DISTINCT from `generateTokenFiles`'s internal registry-wide
   * `themeVaryingTokens` Set (which unions ALL registered themes — dark AND wcag — and is
   * therefore 10 under the shipped config, including WCAG-only keys that are NOT base
   * light/dark varying). The non-web platform generators legitimately consume that wider
   * registry Set; the index must NOT. Do not "simplify" these two sets back into one —
   * doing so re-introduces the R5 over-marking this spec exists to remove.
   */
  themeVaryingTokens: Set<string>;

  /**
   * Per-primitive mode-resolved OKLCH for the R3 value readout, keyed by primitive name.
   * For OKLCH color primitives light === dark by construction (mode variance lives at the
   * semantic layer via overrides, not at the primitive tier); both halves are carried to
   * preserve the existing mode-nested MCP value contract.
   */
  primitiveOklch: Map<string, PrimitiveOklchModes>;
}
