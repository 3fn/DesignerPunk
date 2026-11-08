/**
 * Mathematical Relationship Parser
 * 
 * Parses and validates mathematical relationship expressions for design tokens.
 * Supports multiple formats and validates mathematical correctness.
 * 
 * Supported formats:
 * - Simple: 'base × 2', '8 × 2', 'base ÷ 2'
 * - With result: '8 × 2 = 16', 'base × 2 = 16'
 * - Full expression: 'base × 2 = 8 × 2 = 16'
 * 
 * Supported operators: ×, *, x, ÷, /, +, -
 */

/**
 * Parsed mathematical relationship
 */
export interface ParsedRelationship {
  /** Original expression */
  original: string;
  
  /** Normalized expression (standardized operators) */
  normalized: string;
  
  /** Left side of equation (e.g., 'base × 2') */
  leftSide: string;
  
  /** Right side of equation (e.g., '8 × 2 = 16') */
  rightSide?: string;
  
  /** Operator used (×, ÷, +, -) */
  operator: '×' | '÷' | '+' | '-';
  
  /** Multiplier/divisor/addend/subtrahend value */
  operand: number;
  
  /** Expected result (if provided) */
  expectedResult?: number;
  
  /** Whether the expression is valid */
  isValid: boolean;
  
  /** Validation errors */
  errors: string[];
}

/**
 * Validation result for mathematical relationship
 */
export interface RelationshipValidationResult {
  /** Whether the relationship is valid */
  isValid: boolean;
  
  /** Validation errors */
  errors: string[];
  
  /** Parsed relationship */
  parsed?: ParsedRelationship;
  
  /** Whether the math is correct */
  mathematicallyCorrect: boolean;
  
  /** Calculated result */
  calculatedResult?: number;
  
  /** Expected result (from expression) */
  expectedResult?: number;
}

/**
 * Mathematical Relationship Parser
 */
export class MathematicalRelationshipParser {
  // Operator normalization map
  private readonly OPERATOR_MAP: Record<string, '×' | '÷' | '+' | '-'> = {
    '×': '×',
    '*': '×',
    'x': '×',
    '÷': '÷',
    '/': '÷',
    '+': '+',
    '-': '-'
  };

  /**
   * Parse a mathematical relationship expression
   * 
   * @param expression - Mathematical relationship expression
   * @returns Parsed relationship
   */
  parse(expression: string): ParsedRelationship {
    const errors: string[] = [];
    
    // Normalize whitespace
    const normalized = expression.trim().replace(/\s+/g, ' ');
    
    if (!normalized) {
      return {
        original: expression,
        normalized: '',
        leftSide: '',
        operator: '×',
        operand: 1,
        isValid: false,
        errors: ['Empty expression']
      };
    }

    // Split by equals sign to separate left and right sides
    const parts = normalized.split('=').map(p => p.trim());
    const leftSide = parts[0];
    const rightSide = parts.length > 1 ? parts.slice(1).join(' = ').trim() : undefined;

    // Parse left side (e.g., 'base × 2' or '8 × 2')
    const leftParsed = this.parseExpression(leftSide);
    
    if (!leftParsed.isValid) {
      errors.push(...leftParsed.errors);
    }

    // Parse right side if present
    let expectedResult: number | undefined;
    if (rightSide) {
      // Right side can be:
      // - Just a number: '16'
      // - An expression: '8 × 2'
      // - Multiple expressions: '8 × 2 = 16'
      
      const rightParts = rightSide.split('=').map(p => p.trim());
      
      // Try to parse each part
      for (const part of rightParts) {
        const parsed = this.parseExpression(part);
        
        if (parsed.isValid && parsed.result !== undefined) {
          // If we haven't set expected result yet, use this
          if (expectedResult === undefined) {
            expectedResult = parsed.result;
          } else if (expectedResult !== parsed.result) {
            // Multiple results that don't match
            errors.push(`Inconsistent results in expression: ${expectedResult} ≠ ${parsed.result}`);
          }
        }
      }
    }

    return {
      original: expression,
      normalized,
      leftSide,
      rightSide,
      operator: leftParsed.operator,
      operand: leftParsed.operand,
      expectedResult,
      isValid: errors.length === 0 && leftParsed.isValid,
      errors
    };
  }

  /**
   * Parse a single expression (e.g., 'base × 2' or '8 × 2')
   */
  private parseExpression(expr: string): {
    isValid: boolean;
    errors: string[];
    operator: '×' | '÷' | '+' | '-';
    operand: number;
    result?: number;
  } {
    const errors: string[] = [];
    
    // Find operator
    let operator: '×' | '÷' | '+' | '-' | undefined;
    let operatorIndex = -1;
    
    for (const [rawOp, normalizedOp] of Object.entries(this.OPERATOR_MAP)) {
      const index = expr.indexOf(rawOp);
      if (index !== -1) {
        operator = normalizedOp;
        operatorIndex = index;
        break;
      }
    }

    // If no operator found, check if it's just a number
    if (!operator) {
      const num = parseFloat(expr);
      if (!isNaN(num)) {
        // Just a number, treat as result
        return {
          isValid: true,
          errors: [],
          operator: '×',
          operand: 1,
          result: num
        };
      }
      
      errors.push(`No valid operator found in expression: ${expr}`);
      return {
        isValid: false,
        errors,
        operator: '×',
        operand: 1
      };
    }

    // Split by operator
    const leftPart = expr.substring(0, operatorIndex).trim();
    const rightPart = expr.substring(operatorIndex + 1).trim();

    // Parse operand (right side of operator)
    const operand = parseFloat(rightPart);
    if (isNaN(operand)) {
      errors.push(`Invalid operand: ${rightPart}`);
      return {
        isValid: false,
        errors,
        operator,
        operand: 1
      };
    }

    // Parse left side (base value or 'base')
    let result: number | undefined;
    const baseValue = parseFloat(leftPart);
    
    if (!isNaN(baseValue)) {
      // Left side is a number, calculate result
      result = this.calculate(baseValue, operator, operand);
    }
    // If left side is 'base', we can't calculate result without knowing base value

    return {
      isValid: errors.length === 0,
      errors,
      operator,
      operand,
      result
    };
  }

  /**
   * Calculate result of operation
   */
  private calculate(left: number, operator: '×' | '÷' | '+' | '-', right: number): number {
    switch (operator) {
      case '×':
        return left * right;
      case '÷':
        return left / right;
      case '+':
        return left + right;
      case '-':
        return left - right;
    }
  }

  /**
   * Validate a mathematical relationship against actual values
   * 
   * @param expression - Mathematical relationship expression
   * @param baseValue - Actual base value of the token
   * @param familyBaseValue - Family base value
   * @returns Validation result
   */
  validate(
    expression: string,
    baseValue: number,
    familyBaseValue: number
  ): RelationshipValidationResult {
    // Special case: For base tokens where baseValue === familyBaseValue,
    // allow descriptive relationships like "base value", "family base", etc.
    // These tokens don't need mathematical operators since they ARE the base
    // 
    // For non-numeric tokens (colors, strings), we can't do mathematical comparison,
    // so we accept descriptive relationships if they don't contain operators
    const isDescriptiveRelationship = !expression.match(/[×*x÷\/+\-]/);
    
    // Check if this is a base token (numeric comparison)
    const isNumericBaseToken = typeof baseValue === 'number' && 
                                typeof familyBaseValue === 'number' && 
                                Math.abs(baseValue - familyBaseValue) < 0.001;
    
    // Check if this is a non-numeric token (color, string, etc.)
    const isNonNumericToken = typeof baseValue !== 'number' || typeof familyBaseValue !== 'number';
    
    if ((isNumericBaseToken || isNonNumericToken) && isDescriptiveRelationship) {
      // This is either:
      // 1. A base token with a descriptive relationship - accept it
      // 2. A non-numeric token (color, string) - accept descriptive relationship
      return {
        isValid: true,
        errors: [],
        parsed: {
          original: expression,
          normalized: expression.trim(),
          leftSide: expression.trim(),
          operator: '×',
          operand: 1,
          isValid: true,
          errors: []
        },
        mathematicallyCorrect: true,
        calculatedResult: baseValue,
        expectedResult: baseValue
      };
    }
    
    const parsed = this.parse(expression);
    
    if (!parsed.isValid) {
      return {
        isValid: false,
        errors: parsed.errors,
        parsed,
        mathematicallyCorrect: false
      };
    }

    // Calculate what the result should be based on family base value
    const calculatedResult = this.calculate(familyBaseValue, parsed.operator, parsed.operand);
    
    // Check if calculated result matches actual base value
    const mathematicallyCorrect = Math.abs(calculatedResult - baseValue) < 0.001; // Allow for floating point errors
    
    const errors: string[] = [];
    
    if (!mathematicallyCorrect) {
      errors.push(
        `Mathematical relationship incorrect: ${familyBaseValue} ${parsed.operator} ${parsed.operand} = ${calculatedResult}, but token baseValue is ${baseValue}`
      );
    }

    // If expression includes expected result, verify it matches calculated result
    if (parsed.expectedResult !== undefined) {
      const expectedMatchesCalculated = Math.abs(parsed.expectedResult - calculatedResult) < 0.001;
      const expectedMatchesActual = Math.abs(parsed.expectedResult - baseValue) < 0.001;
      
      if (!expectedMatchesCalculated && !expectedMatchesActual) {
        errors.push(
          `Expected result ${parsed.expectedResult} does not match calculated result ${calculatedResult} or actual baseValue ${baseValue}`
        );
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
      parsed,
      mathematicallyCorrect,
      calculatedResult,
      expectedResult: parsed.expectedResult
    };
  }

  /**
   * Check if two mathematical relationships are equivalent
   * 
   * @param expr1 - First expression
   * @param expr2 - Second expression
   * @param familyBaseValue - Family base value for calculation
   * @returns Whether the expressions are equivalent
   */
  areEquivalent(expr1: string, expr2: string, familyBaseValue: number): boolean {
    const parsed1 = this.parse(expr1);
    const parsed2 = this.parse(expr2);
    
    if (!parsed1.isValid || !parsed2.isValid) {
      return false;
    }

    // Calculate results for both expressions
    const result1 = this.calculate(familyBaseValue, parsed1.operator, parsed1.operand);
    const result2 = this.calculate(familyBaseValue, parsed2.operator, parsed2.operand);
    
    // Check if results are equal (within floating point tolerance)
    return Math.abs(result1 - result2) < 0.001;
  }

  /**
   * Normalize a mathematical relationship expression
   * 
   * Converts various formats to a standard format: 'base × N = familyBase × N = result'
   * 
   * @param expression - Expression to normalize
   * @param baseValue - Actual base value
   * @param familyBaseValue - Family base value
   * @returns Normalized expression
   */
  normalize(expression: string, baseValue: number, familyBaseValue: number): string {
    const parsed = this.parse(expression);
    
    if (!parsed.isValid) {
      return expression; // Return original if invalid
    }

    // Calculate result
    const result = this.calculate(familyBaseValue, parsed.operator, parsed.operand);
    
    // Format: base × N = familyBase × N = result
    return `base ${parsed.operator} ${parsed.operand} = ${familyBaseValue} ${parsed.operator} ${parsed.operand} = ${result}`;
  }

  /**
   * Generate a mathematical relationship expression from values
   * 
   * @param baseValue - Token base value
   * @param familyBaseValue - Family base value
   * @returns Generated expression
   */
  generate(baseValue: number, familyBaseValue: number): string {
    // Calculate the relationship
    if (baseValue === familyBaseValue) {
      return `base × 1 = ${familyBaseValue} × 1 = ${baseValue}`;
    }

    // Try multiplication first (prefer integer multipliers)
    if (baseValue % familyBaseValue === 0) {
      const multiplier = baseValue / familyBaseValue;
      return `base × ${multiplier} = ${familyBaseValue} × ${multiplier} = ${baseValue}`;
    }

    // Try division (prefer integer divisors)
    if (familyBaseValue % baseValue === 0) {
      const divisor = familyBaseValue / baseValue;
      return `base ÷ ${divisor} = ${familyBaseValue} ÷ ${divisor} = ${baseValue}`;
    }

    // Use multiplication with decimal (preferred over addition/subtraction for consistency)
    const multiplier = baseValue / familyBaseValue;
    return `base × ${multiplier} = ${familyBaseValue} × ${multiplier} = ${baseValue}`;
  }
  // ==========================================================================
  // Family-classified token validation (Spec 129 Task 10.1, design § 12)
  // ==========================================================================

  /**
   * Validate one primitive token's `mathematicalRelationship` by its family.
   *
   * - **Categorical families** (`color`, `fontFamily`, `easing`, `breakpoint`) state a description.
   *   It is not evaluated. The decision is by family, never by what the string looks like.
   * - **Formula families** (every other family) must state an equation that evaluates and agrees
   *   with the token's `baseValue`. A formula-family token with no equation is a failure.
   *   `<expression> = <value>` is exact (equal at the precision the string displays); `<expression> ≈ <value>` is within half
   *   the family's rounding step (see {@link RELATIONSHIP_STEP}); `→ <value>` is a deliberate
   *   rounding to the next grid value (within one step).
   * - **Special-case form**: `special case … = <value>` / `percentage = <value>` is accepted when
   *   the stated value equals the token's `baseValue`.
   *
   * Expressions may use `base` (the family base value), `baseValue` (the token's own value),
   * numbers, `+ - × ÷ * / x`, parentheses, `^n` and superscript exponents, and the name of another
   * primitive token (resolved through `resolve`). A trailing parenthetical prose note is ignored.
   *
   * The residual (design § D-9): `≈` accepts a rounding error up to half a step, so a wrong value
   * inside that margin passes.
   */
  validateToken(
    token: {
      name: string;
      category: string;
      baseValue: unknown;
      familyBaseValue: unknown;
      mathematicalRelationship: string;
    },
    resolve?: (name: string) => number | undefined
  ): RelationshipValidationResult {
    const fail = (...errors: string[]): RelationshipValidationResult =>
      ({ isValid: false, errors, mathematicallyCorrect: false });
    const ok = (): RelationshipValidationResult =>
      ({ isValid: true, errors: [], mathematicallyCorrect: true });

    if (CATEGORICAL_FAMILIES.has(token.category)) return ok();

    const rel = (token.mathematicalRelationship ?? '').trim();
    if (!rel) return fail(`${token.category} is a formula family and states no equation`);
    const baseValue = token.baseValue;
    const familyBase = token.familyBaseValue;
    if (typeof baseValue !== 'number' || typeof familyBase !== 'number') {
      return fail(`${token.category} is a formula family but its values are not numbers`);
    }

    // Strip a trailing prose note: " (…)" whose content has a letter other than the identifiers we know.
    let text = rel.replace(/\s+\([^()]*[A-Za-z][^()]*\)\s*$/, '');
    // Superscripts and ^n.
    text = text.replace(/([\u00b2\u00b3\u00b9\u2070-\u2079]+)/g, m => '^' + [...m].map(c => SUPERSCRIPT[c]).join(''));

    // Special-case form.
    const special = /^(special case|percentage)\b[^=]*=\s*(-?[0-9.]+)\s*%?\s*(\([^)]*\))?\s*$/i.exec(rel);
    if (special) {
      const stated = parseFloat(special[2]);
      return Math.abs(stated - baseValue) < 1e-3
        ? ok()
        : fail(`special case states ${stated}, but token baseValue is ${baseValue}`);
    }

    // Split into segments on = ≈ →.
    const segments: string[] = [];
    const joiners: Array<'=' | '≈' | '→'> = [];
    let current = '';
    for (const ch of text) {
      if (ch === '=' || ch === '≈' || ch === '→') {
        segments.push(current.trim());
        joiners.push(ch);
        current = '';
      } else current += ch;
    }
    segments.push(current.trim());

    const step = RELATIONSHIP_STEP[token.category] ?? 1;
    const values: number[] = [];
    let referencesOwnValue = false;
    let hasOperation = joiners.length > 0;
    for (const seg of segments) {
      if (!seg) return fail(`${token.category} relationship '${rel}' has an empty side of an equation`);
      try {
        const ev = new ExpressionEvaluator(seg, familyBase, baseValue, resolve);
        const value = ev.evaluate();
        if (ev.sawOperator) hasOperation = true;
        if (ev.usedOwnValue) referencesOwnValue = true;
        values.push(value);
      } catch (e) {
        return fail(`${(e as Error).message}`);
      }
    }
    if (!hasOperation) {
      return fail(`${token.category} is a formula family and '${rel}' states no equation`);
    }

    const errors: string[] = [];
    // `=` is exact at the precision the string itself displays: where the right-hand side shows a
    // factor rounded (`16 × 2.027` for 16 × 1.125⁶), the left side's groups and powers are rounded to the
    // same number of decimals before the comparison, and the two must then be equal (to float noise).
    // An error that survives that rounding is reported, however small.
    const decimalsOf = (text: string): number =>
      Math.max(0, ...(text.match(/[0-9]*\.[0-9]+/g) ?? []).map(n => n.split('.')[1].length));
    const FLOAT = 1e-9;
    const tolerance = (j: '=' | '≈' | '→') => (j === '=' ? FLOAT : j === '≈' ? step / 2 : step);
    for (let i = 0; i < joiners.length; i++) {
      let left = values[i];
      if (joiners[i] === '=') {
        const d = decimalsOf(segments[i + 1]);
        try {
          left = new ExpressionEvaluator(segments[i], familyBase, baseValue, resolve, d).evaluate();
        } catch { /* already evaluated once above */ }
      }
      const tol = tolerance(joiners[i]);
      if (Math.abs(left - values[i + 1]) > tol + FLOAT) {
        errors.push(
          `Mathematical relationship incorrect: '${segments[i]}' = ${round(left)} ${joiners[i]} '${segments[i + 1]}' = ${round(values[i + 1])}` +
          (joiners[i] === '=' ? '' : ` (beyond ${tol})`)
        );
      }
    }
    if (!referencesOwnValue) {
      const last = values[values.length - 1];
      const tol = joiners.length === 0 ? 1e-9 : tolerance(joiners[joiners.length - 1]);
      if (Math.abs(last - baseValue) > tol + 1e-9) {
        errors.push(`Mathematical relationship incorrect: ${segments[segments.length - 1]} = ${round(last)}, but token baseValue is ${baseValue}`);
      }
    }
    return errors.length === 0 ? ok() : { isValid: false, errors, mathematicallyCorrect: false, calculatedResult: values[0] };
  }
}

/** Families whose relationship string is a description the parser does not evaluate. */
export const CATEGORICAL_FAMILIES: ReadonlySet<string> = new Set(['color', 'fontFamily', 'easing', 'breakpoint']);

/**
 * The rounding step of each formula family's stated results, for `≈` (half a step) and `→` (one step).
 * A family not listed uses 1 (whole pixels).
 */
export const RELATIONSHIP_STEP: Readonly<Record<string, number>> = {
  shadow: 0.01, glow: 0.01, opacity: 0.01, blend: 0.01, scale: 0.01, density: 0.01,
};

const SUPERSCRIPT: Record<string, string> = {
  '\u2070': '0', '\u00b9': '1', '\u00b2': '2', '\u00b3': '3', '\u2074': '4',
  '\u2075': '5', '\u2076': '6', '\u2077': '7', '\u2078': '8', '\u2079': '9',
};

function round(n: number): number {
  return Math.round(n * 1e6) / 1e6;
}

/** Recursive-descent evaluator for one side of a relationship equation. */
class ExpressionEvaluator {
  private pos = 0;
  sawOperator = false;
  usedOwnValue = false;

  constructor(
    private readonly src: string,
    private readonly familyBase: number,
    private readonly ownValue: number,
    private readonly resolve?: (name: string) => number | undefined,
    /** When set, a parenthesised group and a power are rounded to this many decimals as they are read. */
    private readonly roundGroupsTo?: number
  ) {}

  private group(v: number): number {
    return this.roundGroupsTo === undefined ? v : Math.round(v * 10 ** this.roundGroupsTo) / 10 ** this.roundGroupsTo;
  }

  evaluate(): number {
    const v = this.expr();
    this.skip();
    if (this.pos < this.src.length) {
      throw new Error(`Invalid operand: ${this.src.slice(this.pos)}`);
    }
    return v;
  }

  private skip(): void {
    while (this.pos < this.src.length && this.src[this.pos] === ' ') this.pos++;
  }

  private peek(): string {
    this.skip();
    return this.src[this.pos] ?? '';
  }

  private expr(): number {
    let v = this.term();
    for (;;) {
      const c = this.peek();
      if (c === '+' || c === '-') { this.pos++; this.sawOperator = true; const r = this.term(); v = c === '+' ? v + r : v - r; }
      else return v;
    }
  }

  private term(): number {
    let v = this.unary();
    for (;;) {
      const c = this.peek();
      const isX = c === 'x' && !/[A-Za-z0-9]/.test(this.src[this.pos + 1] ?? '');
      if (c === '×' || c === '*' || isX) { this.pos++; this.sawOperator = true; v = v * this.unary(); }
      else if (c === '÷' || c === '/') { this.pos++; this.sawOperator = true; v = v / this.unary(); }
      else return v;
    }
  }

  private unary(): number {
    if (this.peek() === '-') { this.pos++; return -this.unary(); }
    return this.power();
  }

  private power(): number {
    const b = this.atom();
    if (this.src[this.pos] === '^') {
      this.pos++;
      const m = /^[0-9]+/.exec(this.src.slice(this.pos));
      if (!m) throw new Error(`Invalid exponent in: ${this.src}`);
      this.pos += m[0].length;
      this.sawOperator = true;
      return this.group(Math.pow(b, parseInt(m[0], 10)));
    }
    return b;
  }

  private atom(): number {
    const c = this.peek();
    if (c === '(') {
      this.pos++;
      const v = this.expr();
      if (this.peek() !== ')') throw new Error(`Unbalanced parenthesis in: ${this.src}`);
      this.pos++;
      return this.group(v);
    }
    const num = /^[0-9]*\.?[0-9]+/.exec(this.src.slice(this.pos));
    if (num) { this.pos += num[0].length; return parseFloat(num[0]); }
    const id = /^[A-Za-z][A-Za-z0-9.]*/.exec(this.src.slice(this.pos));
    if (id) {
      this.pos += id[0].length;
      if (id[0] === 'base') return this.familyBase;
      if (id[0] === 'baseValue') { this.usedOwnValue = true; return this.ownValue; }
      const v = this.resolve?.(id[0]);
      if (v === undefined) throw new Error(`Invalid operand: ${id[0]}`);
      return v;
    }
    throw new Error(`Invalid operand: ${this.src.slice(this.pos) || this.src}`);
  }
}
