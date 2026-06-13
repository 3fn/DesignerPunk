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
 */

import { ComponentTokenRegistry, RegisteredComponentToken } from '../../registries/ComponentTokenRegistry';

// Re-export RegisteredComponentToken for convenience
export type { RegisteredComponentToken } from '../../registries/ComponentTokenRegistry';

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
 * 3. Registers tokens with the global ComponentTokenRegistry
 * 4. Returns usable token values for immediate component consumption
 * 
 * @template T - Record type mapping token names to their definitions
 * @param config - Configuration object with component name, family, and token definitions
 * @returns Object mapping token names to their numeric values
 * 
 * @throws Error if component name is empty
 * @throws Error if family name is empty
 * @throws Error if no tokens are defined
 * 
 * @example
 * ```typescript
 * const tokens = defineComponentTokens({
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
 * // Use the token value
 * const padding = tokens['inset.large']; // 12
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

  // Register with global registry
  ComponentTokenRegistry.registerBatch(component, registeredTokens);

  return values as ComponentTokenValues<T>;
}
