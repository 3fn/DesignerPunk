/**
 * @category evergreen
 * @purpose Verify component token validation meets NFR 3 timing thresholds
 *
 * Component Token Validation Performance Tests (NFR 3)
 *
 * Wall-clock threshold assertions live in the performance lane
 * (`npm run test:performance`), not the default functional lane — under
 * parallel Jest workers these timings flake (observed 2026-07-03: the
 * scaling-ratio test failed under 16-worker `npm test`, passed in
 * isolation). Lane scoping per Spec 125 design-outline §4 Phase 1.
 *
 * Extracted from ComponentTokenValidation.test.ts, which keeps the
 * functional coverage for Requirements 3.1-3.6.
 */

import { ValidationCoordinator } from '../../ValidationCoordinator';
import { ThreeTierValidator } from '../../../validators/ThreeTierValidator';
import { PrimitiveTokenRegistry } from '../../../registries/PrimitiveTokenRegistry';
import { SemanticTokenRegistry } from '../../../registries/SemanticTokenRegistry';
import { ComponentTokenRegistry, RegisteredComponentToken } from '../../../registries/ComponentTokenRegistry';

describe('Component Token Validation Performance (NFR 3)', () => {
  let coordinator: ValidationCoordinator;
  let validator: ThreeTierValidator;
  let primitiveRegistry: PrimitiveTokenRegistry;
  let semanticRegistry: SemanticTokenRegistry;

  beforeEach(() => {
    validator = new ThreeTierValidator();
    primitiveRegistry = new PrimitiveTokenRegistry();
    semanticRegistry = new SemanticTokenRegistry(primitiveRegistry);

    coordinator = new ValidationCoordinator(
      validator,
      primitiveRegistry,
      semanticRegistry,
      {
        strategicFlexibilityThreshold: 0.8,
        primitiveUsageThreshold: 0.2,
        enableUsageTracking: true
      }
    );

    // Clear the ComponentTokenRegistry before each test
    ComponentTokenRegistry.clear();
  });

  /**
   * Helper function to generate mock component tokens for performance testing
   *
   * Generates tokens across multiple components and families to simulate
   * realistic usage patterns.
   */
  function generateMockComponentTokens(count: number): RegisteredComponentToken[] {
    const tokens: RegisteredComponentToken[] = [];
    const components = ['Button', 'Card', 'Input', 'Modal', 'Dropdown', 'Tooltip', 'Badge', 'Avatar', 'Chip', 'Tab'];
    const families = ['spacing', 'radius', 'fontSize'];
    const validSpacingValues = [0, 2, 4, 6, 8, 10, 12, 16, 20, 24, 32, 40, 48, 56, 64];
    const validRadiusValues = [0, 2, 4, 6, 8, 12, 16, 24, 32, 9999];
    const validFontSizeValues = [16, 18, 20, 23, 26, 29, 32];

    for (let i = 0; i < count; i++) {
      const component = components[i % components.length];
      const family = families[i % families.length];

      let value: number;
      switch (family) {
        case 'spacing':
          value = validSpacingValues[i % validSpacingValues.length];
          break;
        case 'radius':
          value = validRadiusValues[i % validRadiusValues.length];
          break;
        case 'fontSize':
          value = validFontSizeValues[i % validFontSizeValues.length];
          break;
        default:
          value = 8;
      }

      tokens.push({
        name: `${component.toLowerCase()}.${family}.token${i}`,
        component,
        family,
        value,
        reasoning: `Performance test token ${i} for ${component} ${family}`,
      });
    }

    return tokens;
  }

  it('should validate 50 component tokens in under 1 second (NFR 3.2)', () => {
    // Setup: Register 50 component tokens (typical upper bound per NFR 3.2)
    const tokens = generateMockComponentTokens(50);
    tokens.forEach(token => ComponentTokenRegistry.register(token));

    // Verify tokens are registered
    expect(ComponentTokenRegistry.getAll()).toHaveLength(50);

    // Measure validation time
    const startTime = performance.now();
    const result = coordinator.validateAllComponentTokens();
    const endTime = performance.now();

    const duration = endTime - startTime;

    // NFR 3.2: validation SHALL complete in under 1 second
    expect(duration).toBeLessThan(1000);

    // Verify validation actually ran (all tokens should be valid)
    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it('should validate individual component tokens efficiently', () => {
    // Test single token validation performance
    const token: RegisteredComponentToken = {
      name: 'button.padding.test',
      component: 'Button',
      family: 'spacing',
      value: 8,
      reasoning: 'Performance test token',
    };

    // Measure validation time for single token
    const startTime = performance.now();
    const result = coordinator.validateComponentToken(token);
    const endTime = performance.now();

    const duration = endTime - startTime;

    // Single token validation should be very fast (< 10ms)
    expect(duration).toBeLessThan(10);
    expect(result.valid).toBe(true);
  });

  it('should scale linearly with token count', () => {
    // Test that validation time scales reasonably with token count
    const smallBatch = generateMockComponentTokens(10);
    const largeBatch = generateMockComponentTokens(50);

    // Register and validate small batch
    smallBatch.forEach(token => ComponentTokenRegistry.register(token));
    const smallStartTime = performance.now();
    coordinator.validateAllComponentTokens();
    const smallDuration = performance.now() - smallStartTime;

    // Clear and register large batch
    ComponentTokenRegistry.clear();
    largeBatch.forEach(token => ComponentTokenRegistry.register(token));
    const largeStartTime = performance.now();
    coordinator.validateAllComponentTokens();
    const largeDuration = performance.now() - largeStartTime;

    // Large batch (5x tokens) should not take more than 10x the time
    // This ensures roughly linear scaling with reasonable overhead
    expect(largeDuration).toBeLessThan(smallDuration * 10);
  });
});
