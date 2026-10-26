/**
 * Colour Reference Emission Validator
 *
 * Checks every colour reference a semantic token carries, after resolution, against the
 * colour primitives the platform generators emit. `generate` validates semantic references
 * against the token source's primitives, but it emits colour primitives from the palette of
 * the installed @3fn/core (`allComposedColors`; INSTALL § 4), so the two lists can differ: a
 * colour primitive added to a consumer's copy passes the reference check and is then written
 * out as a reference to a name no platform file defines (`var(--brand-300)` with no
 * `--brand-300`; an unresolved `brand300` in Swift and Kotlin), with exit 0.
 *
 * A reference is a finding when, after resolution, it is still a bare name (a palette colour
 * in a simple reference resolves to a literal `oklch(...)`), it is a colour reference, and the
 * name is not one the generators emit.
 *
 * @see .kiro/issues/2026-10-25-generate-passes-semantic-references-to-unemitted-primitives.md
 */

import type { SemanticToken } from '../types/SemanticToken';

/** The token shape `generate` resolves and emits. */
type ResolvedSemantic = Omit<SemanticToken, 'primitiveTokens'>;

/**
 * Colour primitives that are referenced by DesignerPunk's own shadow tokens and emitted on no
 * platform: a known defect, recorded in
 * `.kiro/issues/2026-10-24-shadow-color-primitives-emitted-on-no-platform.md` (P1, Ada) and
 * fixed there, not here. References to these names are reported as a warning so `generate`
 * keeps working; every other unemitted colour reference stops it. Remove a name from this list
 * when the generators emit it (ColorReferenceEmissionValidator.test.ts fails until you do).
 */
export const KNOWN_UNEMITTED_SHADOW_COLORS: ReadonlySet<string> = new Set([
  'shadowBlack100',
  'shadowBlue100',
  'shadowOrange100',
  'shadowGray100',
]);

/** One colour reference to a primitive the generators do not emit. */
export interface UnemittedColorReference {
  /** Semantic token name, e.g. `color.action.primary`. */
  token: string;
  /** The `primitiveReferences` key that carries the reference, e.g. `value` or `color`. */
  key: string;
  /** The referenced primitive name, e.g. `brand300`. */
  primitive: string;
  /** Whether the token source declares the primitive (as a colour primitive). */
  declaredInSource: boolean;
  /** Whether the primitive is on {@link KNOWN_UNEMITTED_SHADOW_COLORS}. */
  knownDefect: boolean;
}

/** A primitive as the check needs it: its name and category. */
export interface SourcePrimitive {
  name: string;
  category: string;
}

const BARE_NAME = /^[A-Za-z][A-Za-z0-9_.]*$/;

/**
 * Whether a reference is a colour reference. A name the token source declares as a colour
 * primitive is one, whatever token holds it. A name the source does not declare is judged by
 * the token: a colour token's reference (other than the `opacity` half of a
 * `{ color, opacity }` composition), a `color` key, or a token whose name ends in `.color`
 * (`accessibility.focus.color`). This covers every colour reference in DesignerPunk's own
 * token set (ColorReferenceEmissionValidator.test.ts checks it).
 */
export function isColorReference(
  token: ResolvedSemantic,
  key: string,
  sourcePrimitive: SourcePrimitive | undefined,
): boolean {
  if (sourcePrimitive) return sourcePrimitive.category === 'color';
  if (key === 'opacity') return false;
  return token.category === 'color' || key === 'color' || token.name.endsWith('.color');
}

/**
 * Find the colour references, in already-resolved semantic tokens, that name a primitive the
 * generators do not emit. Pass every resolution context `generate` writes; findings are
 * de-duplicated across contexts.
 *
 * @param resolvedContexts - Semantic tokens after `resolveSemanticTokenValue`, one array per context.
 * @param sourcePrimitives - The token source's primitives (`getAllPrimitiveTokens()` of the copy).
 * @param emittedColorNames - The colour primitive names the generators write
 *   (`TokenFileGenerator.emittedColorPrimitiveNames()`).
 */
export function findUnemittedColorReferences(
  resolvedContexts: ReadonlyArray<ReadonlyArray<ResolvedSemantic>>,
  sourcePrimitives: ReadonlyArray<SourcePrimitive>,
  emittedColorNames: ReadonlySet<string>,
): UnemittedColorReference[] {
  const byName = new Map(sourcePrimitives.map(p => [p.name, p]));
  const findings = new Map<string, UnemittedColorReference>();

  for (const tokens of resolvedContexts) {
    for (const token of tokens) {
      const refs = token.primitiveReferences;
      if (!refs) continue;
      for (const [key, ref] of Object.entries(refs)) {
        if (typeof ref !== 'string' || !BARE_NAME.test(ref)) continue; // a literal, or custom:X
        if (emittedColorNames.has(ref)) continue;
        const sourcePrimitive = byName.get(ref);
        if (!isColorReference(token, key, sourcePrimitive)) continue;
        const id = `${token.name}\u0000${key}\u0000${ref}`;
        if (findings.has(id)) continue;
        findings.set(id, {
          token: token.name,
          key,
          primitive: ref,
          declaredInSource: sourcePrimitive !== undefined,
          knownDefect: KNOWN_UNEMITTED_SHADOW_COLORS.has(ref),
        });
      }
    }
  }
  return [...findings.values()];
}

/** The example palette colour the remedy names. */
const EXAMPLE_PALETTE_COLOR = 'teal300';

/**
 * The message for one finding: the token, the primitive, why it is not emitted, and the remedy.
 */
export function unemittedColorReferenceMessage(f: UnemittedColorReference): string {
  const why =
    'colour primitives are emitted from the colour palette of the installed @3fn/core, not ' +
    'from your token source (INSTALL § 4), so a colour primitive added to your copy is not ' +
    'emitted on any platform';
  const remedy =
    `Point '${f.token}' at a palette colour \`init\` copied, such as '${EXAMPLE_PALETTE_COLOR}'.`;
  if (f.declaredInSource) {
    return (
      `Semantic token '${f.token}' references colour primitive '${f.primitive}', which generate ` +
      `does not emit: '${f.primitive}' is in your token source, but ${why}. ${remedy}`
    );
  }
  return (
    `Semantic token '${f.token}' references '${f.primitive}', which is neither in your token ` +
    `source's primitives nor in the colour palette generate emits. If '${f.primitive}' is a ` +
    `colour you added (in ColorTokens.ts or under color/primitives/): ${why}. ${remedy}`
  );
}

/** The one-line warning for references to {@link KNOWN_UNEMITTED_SHADOW_COLORS}. */
export function knownShadowColorWarning(findings: ReadonlyArray<UnemittedColorReference>): string {
  const tokens = new Set(findings.map(f => f.token));
  const names = [...new Set(findings.map(f => f.primitive))].sort();
  return (
    `${tokens.size} shadow token(s) reference shadow colour primitive(s) that no platform file ` +
    `defines (${names.join(', ')}). This is a known DesignerPunk defect, not a problem in your ` +
    `token source; generate continues.`
  );
}
