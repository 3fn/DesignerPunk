/**
 * @category evergreen
 * @purpose Verify Progress Indicator tokens translate correctly to web/iOS/Android
 */
/**
 * Progress Token Cross-Platform Translation Tests
 *
 * Validates that progress indicator component tokens generate correct
 * platform-specific output for web (CSS custom properties), iOS (Swift constants),
 * and Android (Kotlin constants).
 *
 * Uses the real TokenFileGenerator pipeline and ComponentTokenRegistry to verify
 * actual translation output — no mocks.
 *
 * @see .kiro/specs/048-progress-family/requirements.md (Requirements 6.1-6.5, 15.5-15.7)
 * @see .kiro/specs/048-progress-family/design.md (Platform Considerations)
 */

import { TokenFileGenerator } from '../../generators/TokenFileGenerator';
import { ComponentTokenRegistry } from '../../registries/ComponentTokenRegistry';

// Spec 124: defineComponentTokens no longer self-registers; the rich tokens ride back on
// the branded return. We reproduce the production harvest here (recover the rich tokens
// + register into the canonical registry) so the real TokenFileGenerator pipeline — which
// reads ComponentTokenRegistry.getAll() — has the Progress tokens to translate.
//
// Progress registers through THREE family calls (sizing / spacing / borderWidth), so the
// harvest is the concatenation helper rather than getTokenContract() of a single export.
import { getProgressRegisteredTokens } from '../../tokens/component/progress';

describe('Progress Token Cross-Platform Translation', () => {
  let generator: TokenFileGenerator;
  let webContent: string;
  let iosContent: string;
  let androidContent: string;

  beforeAll(() => {
    ComponentTokenRegistry.clear();
    for (const token of getProgressRegisteredTokens()) {
      ComponentTokenRegistry.register(token);
    }

    generator = new TokenFileGenerator();
    const results = generator.generateComponentTokens();

    const webResult = results.find(r => r.platform === 'web');
    const iosResult = results.find(r => r.platform === 'ios');
    const androidResult = results.find(r => r.platform === 'android');

    webContent = webResult?.content ?? '';
    iosContent = iosResult?.content ?? '';
    androidContent = androidResult?.content ?? '';
  });

  afterAll(() => {
    ComponentTokenRegistry.clear();
  });

  // ==========================================================================
  // Web CSS Output (Requirement 6.1, 15.5)
  // ==========================================================================

  describe('Web CSS output includes progress current size tokens', () => {
    it('should reference size200 for sm current size', () => {
      expect(webContent).toContain('--progress-node-size-sm-current');
      expect(webContent).toMatch(/--progress-node-size-sm-current:\s*var\(--size-200\)/);
    });

    it('should reference size250 for md current size', () => {
      expect(webContent).toContain('--progress-node-size-md-current');
      expect(webContent).toMatch(/--progress-node-size-md-current:\s*var\(--size-250\)/);
    });

    it('should reference size300 for lg current size', () => {
      expect(webContent).toContain('--progress-node-size-lg-current');
      expect(webContent).toMatch(/--progress-node-size-lg-current:\s*var\(--size-300\)/);
    });

    it('should reference sizing primitives for base size tokens', () => {
      expect(webContent).toContain('--progress-node-size-sm');
      expect(webContent).toContain('var(--size-150)');
      expect(webContent).toContain('--progress-node-size-md');
      expect(webContent).toContain('var(--size-200)');
      expect(webContent).toContain('--progress-node-size-lg');
      expect(webContent).toContain('var(--size-250)');
    });
  });

  // ==========================================================================
  // iOS Swift Output (Requirement 6.2, 15.6)
  // ==========================================================================

  describe('iOS Swift output includes progress current size tokens', () => {
    it('should reference size200 for sm current size', () => {
      expect(iosContent).toContain('nodeSizeSmCurrent');
      expect(iosContent).toMatch(/nodeSizeSmCurrent.*DesignTokens.size200/);
    });

    it('should reference size250 for md current size', () => {
      expect(iosContent).toContain('nodeSizeMdCurrent');
      expect(iosContent).toMatch(/nodeSizeMdCurrent.*DesignTokens.size250/);
    });

    it('should reference size300 for lg current size', () => {
      expect(iosContent).toContain('nodeSizeLgCurrent');
      expect(iosContent).toMatch(/nodeSizeLgCurrent.*DesignTokens.size300/);
    });

    it('should use CGFloat type for dimensional tokens', () => {
      expect(iosContent).toMatch(/nodeSizeSmCurrent:\s*CGFloat/);
    });

    it('should reference DesignTokens for base size tokens', () => {
      expect(iosContent).toContain('DesignTokens.size150');
      expect(iosContent).toContain('DesignTokens.size200');
      expect(iosContent).toContain('DesignTokens.size250');
    });
  });

  // ==========================================================================
  // Android Kotlin Output (Requirement 6.3, 15.7)
  // ==========================================================================

  describe('Android Kotlin output includes progress current size tokens', () => {
    it('should reference size200 for sm current size', () => {
      expect(androidContent).toContain('nodeSizeSmCurrent');
      expect(androidContent).toMatch(/nodeSizeSmCurrent\s*=\s*DesignTokens.size_200/);
    });

    it('should reference size250 for md current size', () => {
      expect(androidContent).toContain('nodeSizeMdCurrent');
      expect(androidContent).toMatch(/nodeSizeMdCurrent\s*=\s*DesignTokens.size_250/);
    });

    it('should reference size300 for lg current size', () => {
      expect(androidContent).toContain('nodeSizeLgCurrent');
      expect(androidContent).toMatch(/nodeSizeLgCurrent\s*=\s*DesignTokens.size_300/);
    });

    it('should reference DesignTokens for base size tokens', () => {
      expect(androidContent).toContain('DesignTokens.size_150');
      expect(androidContent).toContain('DesignTokens.size_200');
      expect(androidContent).toContain('DesignTokens.size_250');
    });
  });

  // ==========================================================================
  // Cross-Platform Value Consistency (Requirement 6.4-6.5)
  // ==========================================================================

  describe('Cross-platform value consistency', () => {
    it('should reference same sizing primitives for current sizes across all platforms', () => {
      const currentSizes = [
        { cssRef: 'size-200', swiftRef: 'DesignTokens.size200', kotlinRef: 'DesignTokens.size_200', cssName: 'sm-current', camelName: 'nodeSizeSmCurrent' },
        { cssRef: 'size-250', swiftRef: 'DesignTokens.size250', kotlinRef: 'DesignTokens.size_250', cssName: 'md-current', camelName: 'nodeSizeMdCurrent' },
        { cssRef: 'size-300', swiftRef: 'DesignTokens.size300', kotlinRef: 'DesignTokens.size_300', cssName: 'lg-current', camelName: 'nodeSizeLgCurrent' },
      ];

      for (const { cssRef, swiftRef, kotlinRef, cssName, camelName } of currentSizes) {
        expect(webContent).toMatch(new RegExp(`--progress-node-size-${cssName}:\\s*var\\(--${cssRef}\\)`));
        expect(iosContent).toMatch(new RegExp(`${camelName}.*${swiftRef.replace('.', '\\.')}`));
        expect(androidContent).toMatch(new RegExp(`${camelName}\\s*=\\s*${kotlinRef.replace('.', '\\.')}`));
      }
    });

    it('should include Progress tokens in all three platform outputs', () => {
      expect(webContent).toContain('Progress Component Tokens');
      expect(iosContent).toContain('ProgressTokens');
      expect(androidContent).toContain('ProgressTokens');
    });
  });
});
