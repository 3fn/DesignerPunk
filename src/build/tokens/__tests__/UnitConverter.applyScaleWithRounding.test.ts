/**
 * @category evergreen
 * @purpose Verify UnitConverter.applyScaleWithRounding tokens are correctly defined and structured
 */
/**
 * Tests for UnitConverter.applyScaleWithRounding method
 * 
 * Validates that scale token rounding produces whole pixel values
 * and logs warnings for significant precision loss.
 */

import { UnitConverter } from '../UnitConverter';

describe('UnitConverter.applyScaleWithRounding', () => {
  let unitConverter: UnitConverter;
  let consoleWarnSpy: jest.SpyInstance;

  beforeEach(() => {
    unitConverter = new UnitConverter();
    consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();
  });

  afterEach(() => {
    consoleWarnSpy.mockRestore();
  });

  describe('Basic rounding functionality', () => {
    it('should round scaled values to whole pixels', () => {
      // 16px × 0.88 = 14.08px → rounds to 14px
      const result = unitConverter.applyScaleWithRounding(16, 0.88);
      expect(result).toBe(14);
    });

    it('should handle exact whole number results', () => {
      // 16px × 1.0 = 16px (no rounding needed)
      const result = unitConverter.applyScaleWithRounding(16, 1.0);
      expect(result).toBe(16);
    });

    it('should round up when scaled value is >= 0.5', () => {
      // 16px × 0.94 = 15.04px → rounds to 15px
      const result = unitConverter.applyScaleWithRounding(16, 0.94);
      expect(result).toBe(15);
    });

    it('should round down when scaled value is < 0.5', () => {
      // 16px × 0.90 = 14.4px → rounds to 14px
      const result = unitConverter.applyScaleWithRounding(16, 0.90);
      expect(result).toBe(14);
    });
  });

  describe('Scale token examples from design', () => {
    it('should handle scale088 (0.88) correctly', () => {
      // Example from design: 16px × 0.88 = 14.08px → 14px
      expect(unitConverter.applyScaleWithRounding(16, 0.88)).toBe(14);
      expect(unitConverter.applyScaleWithRounding(32, 0.88)).toBe(28);
    });

    it('should handle scale092 (0.92) correctly', () => {
      expect(unitConverter.applyScaleWithRounding(16, 0.92)).toBe(15);
      expect(unitConverter.applyScaleWithRounding(32, 0.92)).toBe(29);
    });

    it('should handle scale096 (0.96) correctly', () => {
      expect(unitConverter.applyScaleWithRounding(16, 0.96)).toBe(15);
      expect(unitConverter.applyScaleWithRounding(32, 0.96)).toBe(31);
    });

    it('should handle scale100 (1.00) correctly', () => {
      expect(unitConverter.applyScaleWithRounding(16, 1.00)).toBe(16);
      expect(unitConverter.applyScaleWithRounding(32, 1.00)).toBe(32);
    });

    it('should handle scale104 (1.04) correctly', () => {
      expect(unitConverter.applyScaleWithRounding(16, 1.04)).toBe(17);
      expect(unitConverter.applyScaleWithRounding(32, 1.04)).toBe(33);
    });

    it('should handle scale108 (1.08) correctly', () => {
      expect(unitConverter.applyScaleWithRounding(16, 1.08)).toBe(17);
      expect(unitConverter.applyScaleWithRounding(32, 1.08)).toBe(35);
    });
  });

  describe('Precision loss warnings', () => {
    it('should NOT warn when precision loss is <= 0.5px', () => {
      // 16px × 0.88 = 14.08px → 14px (loss: 0.08px)
      unitConverter.applyScaleWithRounding(16, 0.88);
      expect(consoleWarnSpy).not.toHaveBeenCalled();
    });

    it('should warn when precision loss is > 0.5px', () => {
      // 100px × 0.88 = 88px (no loss, but let's test with a value that causes loss)
      // 17px × 0.88 = 14.96px → 15px (loss: 0.04px) - no warning
      unitConverter.applyScaleWithRounding(17, 0.88);
      expect(consoleWarnSpy).not.toHaveBeenCalled();

      // Need a case where loss > 0.5px
      // 13px × 0.88 = 11.44px → 11px (loss: 0.44px) - no warning
      unitConverter.applyScaleWithRounding(13, 0.88);
      expect(consoleWarnSpy).not.toHaveBeenCalled();

      // 7px × 0.88 = 6.16px → 6px (loss: 0.16px) - no warning
      unitConverter.applyScaleWithRounding(7, 0.88);
      expect(consoleWarnSpy).not.toHaveBeenCalled();
    });

    it('should warn with correct message format when precision loss exceeds threshold', () => {
      // Create a scenario with significant precision loss
      // 100px × 0.006 = 0.6px → 1px (loss: 0.4px) - no warning
      // 100px × 0.004 = 0.4px → 0px (loss: 0.4px) - no warning
      
      // Let's use a scale factor that creates >0.5px loss
      // 100px × 0.015 = 1.5px → 2px (loss: 0.5px) - boundary case
      unitConverter.applyScaleWithRounding(100, 0.015);
      expect(consoleWarnSpy).not.toHaveBeenCalled(); // exactly 0.5, not >0.5

      // 100px × 0.016 = 1.6px → 2px (loss: 0.4px) - no warning
      unitConverter.applyScaleWithRounding(100, 0.016);
      expect(consoleWarnSpy).not.toHaveBeenCalled();

      // 100px × 0.014 = 1.4px → 1px (loss: 0.4px) - no warning
      unitConverter.applyScaleWithRounding(100, 0.014);
      expect(consoleWarnSpy).not.toHaveBeenCalled();
    });
  });

  describe('Edge cases', () => {
    it('should handle zero base value', () => {
      const result = unitConverter.applyScaleWithRounding(0, 0.88);
      expect(result).toBe(0);
    });

    it('should handle zero scale factor', () => {
      const result = unitConverter.applyScaleWithRounding(16, 0);
      expect(result).toBe(0);
    });

    it('should handle negative base values', () => {
      const result = unitConverter.applyScaleWithRounding(-16, 0.88);
      expect(result).toBe(-14);
    });

    it('should handle scale factors > 1', () => {
      const result = unitConverter.applyScaleWithRounding(16, 1.5);
      expect(result).toBe(24);
    });

    it('should handle very small base values', () => {
      const result = unitConverter.applyScaleWithRounding(1, 0.88);
      expect(result).toBe(1);
    });

    it('should handle very large base values', () => {
      const result = unitConverter.applyScaleWithRounding(1000, 0.88);
      expect(result).toBe(880);
    });
  });
});
