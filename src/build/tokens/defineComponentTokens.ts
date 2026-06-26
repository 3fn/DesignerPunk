/**
 * Component Token Definition Helper
 * 
 * Provides a lightweight API for defining component tokens with explicit metadata.
 * This hybrid approach bridges lightweight authoring with rich metadata for pipeline integration.
 * 
 * Component tokens are component-specific values that supplement primitive and semantic tokens
 * when existing tokens are mathematically insufficient for design requirements.
 * 
 * @example
 * ```typescript
 * import { defineComponentTokens } from '../../../build/tokens/defineComponentTokens';
 * import { spacingTokens } from '../../../tokens/SpacingTokens';
 *
 * // Authors export the result; the value-map is destructured for component use.
 * // The rich token metadata rides back on a non-enumerable brand and is harvested
 * // by loadComponentTokens — defineComponentTokens does NOT self-register.
 * export const ButtonIconTokens = defineComponentTokens({
 *   component: 'ButtonIcon',
 *   family: 'spacing',
 *   tokens: {
 *     'inset.large': {
 *       reference: spacingTokens.space150,
 *       reasoning: 'Large button requires 12px padding for visual balance',
 *     },
 *     'inset.medium': {
 *       reference: spacingTokens.space125,
 *       reasoning: 'Medium button uses 10px padding for compact appearance',
 *     },
 *   },
 * });
 * ```
 *
 * @see Requirements 2.1-2.6 in .kiro/specs/037-component-token-generation-pipeline/requirements.md
 * @see .kiro/specs/124-component-token-return-contract/design.md for the branded-return contract
 */

import type { RegisteredComponentToken } from '../../registries/ComponentTokenRegistry';

// Re-export RegisteredComponentToken for convenience
export type { RegisteredComponentToken } from '../../registries/ComponentTokenRegistry';

/**
 * Frozen compatibility contract — the brand key under which the rich
 * `RegisteredComponentToken[]` is carried back on a `defineComponentTokens` result.
 *
 * This is the SINGLE source of the brand string (Spec 124 caveat (a)): both the brand
 * write (here) and the brand read ({@link getTokenContract} / the harvest) reference this
 * const. The literal MUST NOT be duplicated. The string is a frozen compatibility
 * contract — a parent must recognize results produced by older/newer `@3fn/core/build`
 * copies, so it cannot change without a coordinated deprecation.
 *
 * @see .kiro/specs/124-component-token-return-contract/design.md (Decision 2, caveats a–d)
 */
export const TOKEN_CONTRACT_BRAND = '@3fn/dp:tokenContract';

/**
 * Primitive token reference structure
 * 
 * Used when a component token references an existing primitive token.
 * The reference must have a baseValue property for value extraction.
 */
export interface PrimitiveTokenReference {
  /** Token name for reference tracking */
  name: string;
  /** Unitless base value from the primitive token */
  baseValue: number;
}

/**
 * Token definition with primitive reference
 * 
 * Use this when the component token should reference an existing primitive token.
 * This maintains the token chain and enables proper platform output generation.
 * 
 * @template T - Type of the primitive token reference
 */
export interface TokenWithReference<T extends PrimitiveTokenReference> {
  /** Reference to existing primitive token */
  reference: T;
  /** Required explanation of why this token exists */
  reasoning: string;
}

/**
 * Token definition with family-conformant value
 * 
 * Use this when no suitable primitive token exists and a custom value is needed.
 * The value must conform to the family's value definition pattern (e.g., BASE_VALUE * multiplier).
 */
export interface TokenWithValue {
  /** Value conforming to family's value definition pattern */
  value: number;
  /** Required explanation of why this token exists */
  reasoning: string;
}

/**
 * Union type for token definitions
 * 
 * A token can be defined either by referencing an existing primitive token
 * or by providing a family-conformant value.
 * 
 * @template T - Type of the primitive token reference (when using reference)
 */
export type TokenDefinition<T extends PrimitiveTokenReference = PrimitiveTokenReference> = 
  | TokenWithReference<T> 
  | TokenWithValue;

/**
 * Configuration for defineComponentTokens()
 * 
 * @template T - Record type mapping token names to their definitions
 */
export interface ComponentTokenConfig<T extends Record<string, TokenDefinition>> {
  /** Component name (e.g., 'ButtonIcon') */
  component: string;
  /** Token family (e.g., 'spacing', 'fontSize', 'radius') */
  family: string;
  /** Token definitions */
  tokens: T;
}

/**
 * Return type: usable token values
 * 
 * Maps token names to their numeric values for immediate consumption by components.
 * 
 * @template T - Record type of the original token definitions
 */
export type ComponentTokenValues<T extends Record<string, TokenDefinition>> = {
  [K in keyof T]: number;
};

/**
 * Type guard to check if a token definition uses a reference
 */
function isTokenWithReference<T extends PrimitiveTokenReference>(
  definition: TokenDefinition<T>
): definition is TokenWithReference<T> {
  return 'reference' in definition;
}

/**
 * Define component tokens with explicit metadata.
 *
 * This helper function provides a lightweight API for defining component tokens
 * while producing rich metadata for pipeline integration. It:
 *
 * 1. Validates that all required fields are present
 * 2. Extracts values from primitive references or uses provided values
 * 3. Brands the returned value-map with the rich `RegisteredComponentToken[]` under a
 *    non-enumerable {@link TOKEN_CONTRACT_BRAND} key, so the metadata rides back on the
 *    return value (recoverable via {@link getTokenContract})
 * 4. Returns usable token values for immediate component consumption
 *
 * It does NOT register with any global registry. The collection seam is the
 * return-value harvest in `loadComponentTokens`, which is the sole writer to the
 * canonical `ComponentTokenRegistry` (Spec 124, Decision 3). The brand is non-enumerable,
 * so spread / `Object.keys` / `JSON.stringify` of the result are unchanged from the bare
 * value-map; authors cannot accidentally depend on it (Spec 124, R1/R2).
 *
 * @template T - Record type mapping token names to their definitions
 * @param config - Configuration object with component name, family, and token definitions
 * @returns Object mapping token names to their numeric values, branded with the rich tokens
 *
 * @throws Error if component name is empty
 * @throws Error if family name is empty
 * @throws Error if no tokens are defined
 *
 * @example
 * ```typescript
 * export const ButtonIconTokens = defineComponentTokens({
 *   component: 'ButtonIcon',
 *   family: 'spacing',
 *   tokens: {
 *     'inset.large': {
 *       reference: spacingTokens.space150,
 *       reasoning: 'Large button requires 12px padding',
 *     },
 *   },
 * });
 *
 * // Use the token value (the public enumerable surface is the flat value-map)
 * const padding = ButtonIconTokens['inset.large']; // 12
 *
 * // The harvest (loadComponentTokens) recovers the rich tokens:
 * const rich = getTokenContract(ButtonIconTokens); // RegisteredComponentToken[] | undefined
 * ```
 */
export function defineComponentTokens<T extends Record<string, TokenDefinition>>(
  config: ComponentTokenConfig<T>
): ComponentTokenValues<T> {
  const { component, family, tokens } = config;

  // Validate required fields
  if (!component || component.trim() === '') {
    throw new Error('Component name is required for defineComponentTokens()');
  }

  if (!family || family.trim() === '') {
    throw new Error('Token family is required for defineComponentTokens()');
  }

  if (!tokens || Object.keys(tokens).length === 0) {
    throw new Error('At least one token definition is required for defineComponentTokens()');
  }

  const values: Record<string, number> = {};
  const registeredTokens: RegisteredComponentToken[] = [];

  for (const [key, definition] of Object.entries(tokens)) {
    // Generate full token name (lowercase component + key)
    const tokenName = `${component.toLowerCase()}.${key}`;
    
    if (isTokenWithReference(definition)) {
      // Token with primitive reference
      const primitiveToken = definition.reference;
      const value = primitiveToken.baseValue;
      
      values[key] = value;
      registeredTokens.push({
        name: tokenName,
        component,
        family,
        value,
        primitiveReference: primitiveToken.name,
        reasoning: definition.reasoning,
      });
    } else {
      // Token with family-conformant value
      values[key] = definition.value;
      registeredTokens.push({
        name: tokenName,
        component,
        family,
        value: definition.value,
        reasoning: definition.reasoning,
      });
    }
  }

  // Brand the value-map with the rich tokens (Spec 124, Decision 2 / caveats a–d):
  // a non-enumerable, namespaced, string-keyed property carrying the
  // RegisteredComponentToken[]. The brand survives the scoped-require module-duplication
  // boundary by value-equal string key (not by shared object identity). Non-enumerability
  // is load-bearing: spread / Object.keys / JSON.stringify of the result are unchanged.
  // The hasOwnProperty guard + configurable:true make re-application idempotent.
  // NO ComponentTokenRegistry registration — the harvest in loadComponentTokens is the
  // sole writer to the canonical registry (R5 AC1).
  if (!Object.prototype.hasOwnProperty.call(values, TOKEN_CONTRACT_BRAND)) {
    Object.defineProperty(values, TOKEN_CONTRACT_BRAND, {
      value: registeredTokens, // RegisteredComponentToken[]
      enumerable: false,       // load-bearing (caveat b)
      configurable: true,      // tolerate re-application (caveat c)
      writable: false,
    });
  }

  return values as ComponentTokenValues<T>;
}

/**
 * Recover the rich `RegisteredComponentToken[]` from a branded `defineComponentTokens`
 * result — the only sanctioned way to read the brand (Spec 124, caveat d).
 *
 * Reads the brand by direct / `hasOwnProperty` access to the single
 * {@link TOKEN_CONTRACT_BRAND} key — NEVER by enumerating the candidate's keys. Returns
 * `undefined` for any non-object or any object without the brand (plain value-maps,
 * getters, string consts, type aliases, etc. harvest to zero). This is the brand-read
 * counterpart to the brand-write in {@link defineComponentTokens}; both reference the
 * single frozen brand string so a result branded by one `@3fn/core/build` copy is
 * recognized by another (caveat a).
 *
 * @param candidate - Any module export to inspect.
 * @returns The rich tokens if `candidate` carries the brand, else `undefined`.
 */
export function getTokenContract(candidate: unknown): RegisteredComponentToken[] | undefined {
  if (candidate == null || typeof candidate !== 'object') {
    return undefined;
  }
  if (!Object.prototype.hasOwnProperty.call(candidate, TOKEN_CONTRACT_BRAND)) {
    return undefined;
  }
  return (candidate as Record<string, unknown>)[TOKEN_CONTRACT_BRAND] as RegisteredComponentToken[];
}
