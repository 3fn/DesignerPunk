/**
 * @category evergreen
 * @purpose Verify MathematicalRelationshipParser validation catches invalid patterns and enforces rules
 */
/**
 * Mathematical Relationship Parser Tests
 * 
 * Tests the parser's ability to handle various mathematical relationship formats
 * and validate mathematical correctness.
 */

import { MathematicalRelationshipParser, CATEGORICAL_FAMILIES } from '../MathematicalRelationshipParser';
import { getAllPrimitiveTokens } from '../../tokens';
import { blur } from '../../tokens/BlurTokens';

describe('MathematicalRelationshipParser', () => {
  let parser: MathematicalRelationshipParser;

  beforeEach(() => {
    parser = new MathematicalRelationshipParser();
  });

  describe('parse', () => {
    describe('simple formats', () => {
      it('should parse "base × 2"', () => {
        const result = parser.parse('base × 2');
        
        expect(result.isValid).toBe(true);
        expect(result.operator).toBe('×');
        expect(result.operand).toBe(2);
        expect(result.leftSide).toBe('base × 2');
        expect(result.errors).toHaveLength(0);
      });

      it('should parse "8 × 2"', () => {
        const result = parser.parse('8 × 2');
        
        expect(result.isValid).toBe(true);
        expect(result.operator).toBe('×');
        expect(result.operand).toBe(2);
        expect(result.errors).toHaveLength(0);
      });

      it('should parse "base ÷ 2"', () => {
        const result = parser.parse('base ÷ 2');
        
        expect(result.isValid).toBe(true);
        expect(result.operator).toBe('÷');
        expect(result.operand).toBe(2);
        expect(result.errors).toHaveLength(0);
      });

      it('should parse "base + 4"', () => {
        const result = parser.parse('base + 4');
        
        expect(result.isValid).toBe(true);
        expect(result.operator).toBe('+');
        expect(result.operand).toBe(4);
        expect(result.errors).toHaveLength(0);
      });

      it('should parse "base - 2"', () => {
        const result = parser.parse('base - 2');
        
        expect(result.isValid).toBe(true);
        expect(result.operator).toBe('-');
        expect(result.operand).toBe(2);
        expect(result.errors).toHaveLength(0);
      });
    });

    describe('with result formats', () => {
      it('should parse "8 × 2 = 16"', () => {
        const result = parser.parse('8 × 2 = 16');
        
        expect(result.isValid).toBe(true);
        expect(result.operator).toBe('×');
        expect(result.operand).toBe(2);
        expect(result.expectedResult).toBe(16);
        expect(result.errors).toHaveLength(0);
      });

      it('should parse "base × 2 = 16"', () => {
        const result = parser.parse('base × 2 = 16');
        
        expect(result.isValid).toBe(true);
        expect(result.operator).toBe('×');
        expect(result.operand).toBe(2);
        expect(result.expectedResult).toBe(16);
        expect(result.errors).toHaveLength(0);
      });

      it('should parse "8 ÷ 2 = 4"', () => {
        const result = parser.parse('8 ÷ 2 = 4');
        
        expect(result.isValid).toBe(true);
        expect(result.operator).toBe('÷');
        expect(result.operand).toBe(2);
        expect(result.expectedResult).toBe(4);
        expect(result.errors).toHaveLength(0);
      });
    });

    describe('full expression formats', () => {
      it('should parse "base × 2 = 8 × 2 = 16"', () => {
        const result = parser.parse('base × 2 = 8 × 2 = 16');
        
        expect(result.isValid).toBe(true);
        expect(result.operator).toBe('×');
        expect(result.operand).toBe(2);
        expect(result.expectedResult).toBe(16);
        expect(result.leftSide).toBe('base × 2');
        expect(result.rightSide).toBe('8 × 2 = 16');
        expect(result.errors).toHaveLength(0);
      });

      it('should parse "base × 1 = 8 × 1 = 8"', () => {
        const result = parser.parse('base × 1 = 8 × 1 = 8');
        
        expect(result.isValid).toBe(true);
        expect(result.operator).toBe('×');
        expect(result.operand).toBe(1);
        expect(result.expectedResult).toBe(8);
        expect(result.errors).toHaveLength(0);
      });

      it('should parse "base ÷ 2 = 8 ÷ 2 = 4"', () => {
        const result = parser.parse('base ÷ 2 = 8 ÷ 2 = 4');
        
        expect(result.isValid).toBe(true);
        expect(result.operator).toBe('÷');
        expect(result.operand).toBe(2);
        expect(result.expectedResult).toBe(4);
        expect(result.errors).toHaveLength(0);
      });
    });

    describe('operator normalization', () => {
      it('should normalize * to ×', () => {
        const result = parser.parse('base * 2');
        
        expect(result.isValid).toBe(true);
        expect(result.operator).toBe('×');
        expect(result.operand).toBe(2);
      });

      it('should normalize x to ×', () => {
        const result = parser.parse('base x 2');
        
        expect(result.isValid).toBe(true);
        expect(result.operator).toBe('×');
        expect(result.operand).toBe(2);
      });

      it('should normalize / to ÷', () => {
        const result = parser.parse('base / 2');
        
        expect(result.isValid).toBe(true);
        expect(result.operator).toBe('÷');
        expect(result.operand).toBe(2);
      });
    });

    describe('edge cases', () => {
      it('should handle empty expression', () => {
        const result = parser.parse('');
        
        expect(result.isValid).toBe(false);
        expect(result.errors).toContain('Empty expression');
      });

      it('should handle whitespace-only expression', () => {
        const result = parser.parse('   ');
        
        expect(result.isValid).toBe(false);
        expect(result.errors).toContain('Empty expression');
      });

      it('should handle expression with extra whitespace', () => {
        const result = parser.parse('  base   ×   2  ');
        
        expect(result.isValid).toBe(true);
        expect(result.operator).toBe('×');
        expect(result.operand).toBe(2);
      });

      it('should handle decimal operands', () => {
        const result = parser.parse('base × 1.5');
        
        expect(result.isValid).toBe(true);
        expect(result.operator).toBe('×');
        expect(result.operand).toBe(1.5);
      });

      it('should handle decimal results', () => {
        const result = parser.parse('8 × 1.5 = 12');
        
        expect(result.isValid).toBe(true);
        expect(result.expectedResult).toBe(12);
      });

      it('should detect inconsistent results', () => {
        const result = parser.parse('8 × 2 = 15 = 16');
        
        expect(result.isValid).toBe(false);
        expect(result.errors.some(e => e.includes('Inconsistent results'))).toBe(true);
      });

      it('should handle invalid operand', () => {
        const result = parser.parse('base × abc');
        
        expect(result.isValid).toBe(false);
        expect(result.errors.some(e => e.includes('Invalid operand'))).toBe(true);
      });

      it('should handle missing operator', () => {
        const result = parser.parse('base 2');
        
        expect(result.isValid).toBe(false);
        expect(result.errors.some(e => e.includes('No valid operator'))).toBe(true);
      });
    });
  });

  describe('validate', () => {
    it('should validate correct multiplication relationship', () => {
      const result = parser.validate('base × 2 = 8 × 2 = 16', 16, 8);
      
      expect(result.isValid).toBe(true);
      expect(result.mathematicallyCorrect).toBe(true);
      expect(result.calculatedResult).toBe(16);
      expect(result.errors).toHaveLength(0);
    });

    it('should validate correct division relationship', () => {
      const result = parser.validate('base ÷ 2 = 8 ÷ 2 = 4', 4, 8);
      
      expect(result.isValid).toBe(true);
      expect(result.mathematicallyCorrect).toBe(true);
      expect(result.calculatedResult).toBe(4);
      expect(result.errors).toHaveLength(0);
    });

    it('should validate correct addition relationship', () => {
      const result = parser.validate('base + 4 = 8 + 4 = 12', 12, 8);
      
      expect(result.isValid).toBe(true);
      expect(result.mathematicallyCorrect).toBe(true);
      expect(result.calculatedResult).toBe(12);
      expect(result.errors).toHaveLength(0);
    });

    it('should validate correct subtraction relationship', () => {
      const result = parser.validate('base - 2 = 8 - 2 = 6', 6, 8);
      
      expect(result.isValid).toBe(true);
      expect(result.mathematicallyCorrect).toBe(true);
      expect(result.calculatedResult).toBe(6);
      expect(result.errors).toHaveLength(0);
    });

    it('should detect incorrect mathematical relationship', () => {
      const result = parser.validate('base × 2 = 8 × 2 = 16', 15, 8);
      
      expect(result.isValid).toBe(false);
      expect(result.mathematicallyCorrect).toBe(false);
      expect(result.calculatedResult).toBe(16);
      expect(result.errors.some(e => e.includes('Mathematical relationship incorrect'))).toBe(true);
    });

    it('should detect incorrect expected result', () => {
      const result = parser.validate('base × 2 = 8 × 2 = 15', 16, 8);
      
      expect(result.isValid).toBe(false);
      // The error message includes "Expected result" or mentions the mismatch
      expect(result.errors.length).toBeGreaterThan(0);
      expect(result.errors.some(e => e.includes('Expected result') || e.includes('15'))).toBe(true);
    });

    it('should validate simple format without result', () => {
      const result = parser.validate('base × 2', 16, 8);
      
      expect(result.isValid).toBe(true);
      expect(result.mathematicallyCorrect).toBe(true);
      expect(result.calculatedResult).toBe(16);
    });

    it('should handle floating point precision', () => {
      const result = parser.validate('base × 1.5', 12, 8);
      
      expect(result.isValid).toBe(true);
      expect(result.mathematicallyCorrect).toBe(true);
      expect(result.calculatedResult).toBe(12);
    });

    it('should validate identity relationship', () => {
      const result = parser.validate('base × 1 = 8 × 1 = 8', 8, 8);
      
      expect(result.isValid).toBe(true);
      expect(result.mathematicallyCorrect).toBe(true);
      expect(result.calculatedResult).toBe(8);
    });
  });

  describe('areEquivalent', () => {
    it('should recognize equivalent expressions with different formats', () => {
      const equivalent = parser.areEquivalent('base × 2', '8 × 2 = 16', 8);
      
      expect(equivalent).toBe(true);
    });

    it('should recognize equivalent expressions with normalized operators', () => {
      const equivalent = parser.areEquivalent('base * 2', 'base × 2', 8);
      
      expect(equivalent).toBe(true);
    });

    it('should recognize non-equivalent expressions', () => {
      const equivalent = parser.areEquivalent('base × 2', 'base × 3', 8);
      
      expect(equivalent).toBe(false);
    });

    it('should handle invalid expressions', () => {
      const equivalent = parser.areEquivalent('invalid', 'base × 2', 8);
      
      expect(equivalent).toBe(false);
    });
  });

  describe('normalize', () => {
    it('should normalize simple format to full format', () => {
      const normalized = parser.normalize('base × 2', 16, 8);
      
      expect(normalized).toBe('base × 2 = 8 × 2 = 16');
    });

    it('should normalize format with result', () => {
      const normalized = parser.normalize('8 × 2 = 16', 16, 8);
      
      expect(normalized).toBe('base × 2 = 8 × 2 = 16');
    });

    it('should normalize division', () => {
      const normalized = parser.normalize('base ÷ 2', 4, 8);
      
      expect(normalized).toBe('base ÷ 2 = 8 ÷ 2 = 4');
    });

    it('should normalize addition', () => {
      const normalized = parser.normalize('base + 4', 12, 8);
      
      expect(normalized).toBe('base + 4 = 8 + 4 = 12');
    });

    it('should normalize subtraction', () => {
      const normalized = parser.normalize('base - 2', 6, 8);
      
      expect(normalized).toBe('base - 2 = 8 - 2 = 6');
    });

    it('should return original if invalid', () => {
      const normalized = parser.normalize('invalid expression', 16, 8);
      
      expect(normalized).toBe('invalid expression');
    });
  });

  describe('generate', () => {
    it('should generate multiplication relationship', () => {
      const generated = parser.generate(16, 8);
      
      expect(generated).toBe('base × 2 = 8 × 2 = 16');
    });

    it('should generate division relationship', () => {
      const generated = parser.generate(4, 8);
      
      expect(generated).toBe('base ÷ 2 = 8 ÷ 2 = 4');
    });

    it('should generate relationship for 12 from 8', () => {
      const generated = parser.generate(12, 8);
      
      // Uses multiplication for consistency (12 = 8 × 1.5)
      expect(generated).toBe('base × 1.5 = 8 × 1.5 = 12');
    });

    it('should generate relationship for 6 from 8', () => {
      const generated = parser.generate(6, 8);
      
      // Uses multiplication for consistency (6 = 8 × 0.75)
      expect(generated).toBe('base × 0.75 = 8 × 0.75 = 6');
    });

    it('should generate identity relationship', () => {
      const generated = parser.generate(8, 8);
      
      expect(generated).toBe('base × 1 = 8 × 1 = 8');
    });

    it('should handle decimal multipliers', () => {
      const generated = parser.generate(12, 8);
      
      // Should use multiplication with decimal (preferred for consistency)
      expect(generated).toBe('base × 1.5 = 8 × 1.5 = 12');
    });

    it('should handle non-integer relationships', () => {
      const generated = parser.generate(10, 8);
      
      // Should use multiplication with decimal
      expect(generated).toBe('base × 1.25 = 8 × 1.25 = 10');
    });
  });

  describe('real-world token examples', () => {
    it('should validate space100 (base token)', () => {
      const result = parser.validate('base × 1 = 8 × 1 = 8', 8, 8);
      
      expect(result.isValid).toBe(true);
      expect(result.mathematicallyCorrect).toBe(true);
    });

    it('should validate space200 (double base)', () => {
      const result = parser.validate('base × 2 = 8 × 2 = 16', 16, 8);
      
      expect(result.isValid).toBe(true);
      expect(result.mathematicallyCorrect).toBe(true);
    });

    it('should validate space150 (1.5x base)', () => {
      const result = parser.validate('base × 1.5 = 8 × 1.5 = 12', 12, 8);
      
      expect(result.isValid).toBe(true);
      expect(result.mathematicallyCorrect).toBe(true);
    });

    it('should validate space050 (half base)', () => {
      const result = parser.validate('base ÷ 2 = 8 ÷ 2 = 4', 4, 8);
      
      expect(result.isValid).toBe(true);
      expect(result.mathematicallyCorrect).toBe(true);
    });

    it('should validate space075 (strategic flexibility)', () => {
      const result = parser.validate('base × 0.75 = 8 × 0.75 = 6', 6, 8);
      
      expect(result.isValid).toBe(true);
      expect(result.mathematicallyCorrect).toBe(true);
    });

    it('should validate fontSize100 (base token)', () => {
      const result = parser.validate('base × 1 = 16 × 1 = 16', 16, 16);
      
      expect(result.isValid).toBe(true);
      expect(result.mathematicallyCorrect).toBe(true);
    });

    it('should validate fontSize200 (modular scale)', () => {
      const result = parser.validate('base × 1.125 = 16 × 1.125 = 18', 18, 16);
      
      expect(result.isValid).toBe(true);
      expect(result.mathematicallyCorrect).toBe(true);
    });
  });
  /**
   * Spec 129 Task 10.1 (Req 13.1, design § 12): `validateToken` classifies by family.
   * A token set that is correct passes; a token that breaks its declared relationship is still reported.
   */
  describe('validateToken (family-classified, Spec 129 Task 10.1)', () => {
    const tok = (over: Record<string, unknown>) => ({
      name: 't', category: 'spacing', baseValue: 16, familyBaseValue: 8,
      mathematicalRelationship: 'base × 2 = 8 × 2 = 16', ...over,
    });
    const all = getAllPrimitiveTokens();
    const byName = new Map(all.map(t => [t.name, t.baseValue]));
    const resolve = (n: string) => (typeof byName.get(n) === 'number' ? (byName.get(n) as number) : undefined);

    it('passes every primitive in the token source (the set `validate` runs on)', () => {
      const failures = all
        .map(t => ({ n: t.name, r: parser.validateToken(t, resolve) }))
        .filter(x => !x.r.isValid)
        .map(x => `${x.n}: ${x.r.errors.join('; ')}`);
      expect(failures).toEqual([]);
    });

    it('TRUE POSITIVE: blur000 with its pre-correction string "0" is reported (a formula family states no equation)', () => {
      const pre = { ...blur.blur000, mathematicalRelationship: '0' };
      const r = parser.validateToken(pre, resolve);
      expect(r.isValid).toBe(false);
      expect(r.errors.join(' ')).toMatch(/no equation/);
      // and the old parser's reading of the same string was the false-positive-looking "16 × 1 = 16 ... is 0"
      expect(parser.validate('0', 0, 16).isValid).toBe(false);
    });

    it('the corrected blur000 passes', () => {
      expect(parser.validateToken(blur.blur000, resolve).isValid).toBe(true);
    });

    it('TRUE POSITIVE: a wrong value against its stated equation is reported', () => {
      const r = parser.validateToken(tok({ baseValue: 18 }), resolve);
      expect(r.isValid).toBe(false);
      expect(r.errors.join(' ')).toMatch(/baseValue is 18|incorrect/);
    });

    it('TRUE POSITIVE: an equation whose sides disagree is reported', () => {
      expect(parser.validateToken(tok({ mathematicalRelationship: 'base × 2 = 8 × 3 = 16' }), resolve).isValid).toBe(false);
    });

    it('TRUE POSITIVE: every formula-family token in the source fails when its value is perturbed', () => {
      const survivors = all
        .filter(t => !CATEGORICAL_FAMILIES.has(t.category))
        .filter(t => typeof t.baseValue === 'number')
        .filter(t => parser.validateToken({ ...t, baseValue: (t.baseValue as number) * 1.5 + 1 }, resolve).isValid)
        .map(t => t.name);
      expect(survivors).toEqual([]);
    });

    it('a categorical family is decided by family, not by the look of its string', () => {
      expect(parser.validateToken(tok({ category: 'color', mathematicalRelationship: 'lightest' }), resolve).isValid).toBe(true);
      expect(parser.validateToken(tok({ category: 'color', mathematicalRelationship: 'base × 9 = nonsense' }), resolve).isValid).toBe(true);
      // the same description on a formula family fails
      expect(parser.validateToken(tok({ category: 'spacing', mathematicalRelationship: 'lightest' }), resolve).isValid).toBe(false);
    });

    it('`=` is exact at the precision the string displays: an error below 0.1% but above that precision is reported', () => {
      // 12.005 differs from 12 by 0.04%, and the string shows three decimals, so it is reported
      expect(parser.validateToken(tok({ baseValue: 12, mathematicalRelationship: 'base × 1.5 = 12.005' }), resolve).isValid).toBe(false);
      // a rounded factor passes at its displayed precision (1.125⁶ = 2.0273 is shown as 2.027) ...
      const fs6 = { category: 'fontSize', baseValue: 32.432, familyBaseValue: 16 };
      expect(parser.validateToken(tok({ ...fs6, mathematicalRelationship: 'base × (1.125⁶) = 16 × 2.027' }), resolve).isValid).toBe(true);
      // ... and one digit off at that precision is reported (2.028 is 0.05% from 2.027)
      expect(parser.validateToken(tok({ ...fs6, baseValue: 32.448, mathematicalRelationship: 'base × (1.125⁶) = 16 × 2.028' }), resolve).isValid).toBe(false);
    });

    describe('the five false-negative categories of the 2026-06-24 record', () => {
      it('1. incidental hyphens/slashes in a description (cubic-bezier) are not operators', () => {
        expect(parser.validateToken(tok({ category: 'easing', mathematicalRelationship: 'cubic-bezier(0.4, 0.0, 0.2, 1)' }), resolve).isValid).toBe(true);
      });
      it('2. float tolerance: 0.3 × 1.33 ≈ 0.4 within half a step; 0.8 × 0.75 = 0.6 despite float error', () => {
        expect(parser.validateToken(tok({ category: 'shadow', baseValue: 0.4, familyBaseValue: 0.3, mathematicalRelationship: 'base × 1.33 = 0.3 × 1.33 ≈ 0.4' }), resolve).isValid).toBe(true);
        expect(parser.validateToken(tok({ category: 'glow', baseValue: 0.6, familyBaseValue: 0.8, mathematicalRelationship: 'base × 0.75 = 0.8 × 0.75 = 0.6' }), resolve).isValid).toBe(true);
        // but not beyond half a step
        expect(parser.validateToken(tok({ category: 'shadow', baseValue: 0.45, familyBaseValue: 0.3, mathematicalRelationship: 'base × 1.33 ≈ 0.45' }), resolve).isValid).toBe(false);
      });
      it('3. exponents, superscript and ^', () => {
        expect(parser.validateToken(tok({ category: 'fontSize', baseValue: 20, familyBaseValue: 16, mathematicalRelationship: 'base × (1.125²) = 16 × 1.266 ≈ 20' }), resolve).isValid).toBe(true);
        expect(parser.validateToken(tok({ category: 'fontSize', baseValue: 20, familyBaseValue: 16, mathematicalRelationship: 'base × 1.125^2 ≈ 20' }), resolve).isValid).toBe(true);
        expect(parser.validateToken(tok({ category: 'fontSize', baseValue: 30, familyBaseValue: 16, mathematicalRelationship: 'base × (1.125²) ≈ 30' }), resolve).isValid).toBe(false);
      });
      it('4. special-case literals: on a strategic-flexibility token only, and the stated value must equal baseValue', () => {
        const sf = { category: 'radius', isStrategicFlexibility: true, mathematicalRelationship: 'special case = 9999 (effectively infinite)' };
        expect(parser.validateToken(tok({ ...sf, baseValue: 9999 }), resolve).isValid).toBe(true);
        expect(parser.validateToken(tok({ ...sf, baseValue: 100 }), resolve).isValid).toBe(false);
        // the same string on a token that is not strategic flexibility is not an equation
        expect(parser.validateToken(tok({ ...sf, isStrategicFlexibility: false, baseValue: 9999 }), resolve).isValid).toBe(false);
      });
      it('5. categorical descriptions are skipped by family (see above), and a named token resolves', () => {
        expect(parser.validateToken(tok({ category: 'lineHeight', baseValue: 1.4, familyBaseValue: 1.5, mathematicalRelationship: 'fontSize150 × baseValue = 28' }), resolve).isValid).toBe(true);
        expect(parser.validateToken(tok({ category: 'lineHeight', baseValue: 1.2, familyBaseValue: 1.5, mathematicalRelationship: 'fontSize150 × baseValue = 28' }), resolve).isValid).toBe(false);
        expect(parser.validateToken(tok({ category: 'lineHeight', mathematicalRelationship: 'nosuchToken × baseValue = 28' }), resolve).isValid).toBe(false);
      });
    });
  });
});
