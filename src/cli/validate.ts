/**
 * Validate Command
 *
 * Runs token validation checks against the active token source.
 * Reuses existing validators — no duplicated validation logic.
 *
 * @see Spec 103 design.md § "Validate Command"
 */

import * as path from 'path';
import { loadConfig } from '../config/ConfigLoader';
import { resolveTokens } from './resolveTokens';
import { PrimitiveTokenRegistry } from '../registries/PrimitiveTokenRegistry';
import { SemanticTokenRegistry } from '../registries/SemanticTokenRegistry';
import { SemanticTokenValidator } from '../validators/SemanticTokenValidator';
import { MathematicalRelationshipParser } from '../validators/MathematicalRelationshipParser';
import type { PrimitiveToken } from '../types/PrimitiveToken';
import type { SemanticToken } from '../types/SemanticToken';

interface CheckResult {
  name: string;
  passed: boolean;
  errors: string[];
  count?: number;
}

export async function runValidate(): Promise<void> {
  const config = await loadConfig(process.cwd());
  const tokens = resolveTokens(config);

  const relativePath = path.relative(process.cwd(), config.tokenSourceRoot);
  console.log(`🔍 Validating tokens from: ${relativePath} (${config.tokenSourceMode})\n`);

  const results: CheckResult[] = [];

  results.push(validateRequiredFields(tokens.primitiveTokens));
  results.push(validateFamilyMembership(tokens.primitiveTokens, tokens.semanticTokens));
  results.push(validateSemanticReferences(tokens.primitiveTokens, tokens.semanticTokens));
  results.push(validateMathematicalRelationships(tokens.primitiveTokens));

  reportResults(results);
  process.exit(results.every(r => r.passed) ? 0 : 1);
}

function validateRequiredFields(primitives: PrimitiveToken[]): CheckResult {
  const errors: string[] = [];
  const required = ['name', 'category', 'description', 'mathematicalRelationship', 'platforms'] as const;

  for (const token of primitives) {
    for (const field of required) {
      if (!token[field]) {
        errors.push(`${token.name || '(unnamed)'}: missing required field '${field}'`);
      }
    }
  }

  return { name: 'Required fields', passed: errors.length === 0, errors, count: primitives.length };
}

function validateFamilyMembership(primitives: PrimitiveToken[], semantics: SemanticToken[]): CheckResult {
  const errors: string[] = [];
  const primitiveRegistry = new PrimitiveTokenRegistry();
  const semanticRegistry = new SemanticTokenRegistry(primitiveRegistry);

  for (const token of primitives) {
    try {
      primitiveRegistry.register(token);
    } catch (err) {
      errors.push(`primitive '${token.name}': ${err instanceof Error ? err.message : String(err)}`);
    }
  }

  for (const token of semantics) {
    try {
      semanticRegistry.register(token);
    } catch (err) {
      errors.push(`semantic '${token.name}': ${err instanceof Error ? err.message : String(err)}`);
    }
  }

  return {
    name: 'Family membership',
    passed: errors.length === 0,
    errors,
    count: primitives.length + semantics.length,
  };
}

function validateSemanticReferences(primitives: PrimitiveToken[], semantics: SemanticToken[]): CheckResult {
  const primitiveRegistry = new PrimitiveTokenRegistry();
  const semanticRegistry = new SemanticTokenRegistry(primitiveRegistry);
  const validator = new SemanticTokenValidator(primitiveRegistry, semanticRegistry);

  const result = validator.validateSemanticReferences(semantics, primitives);

  if (result.level === 'Error') {
    return { name: 'Semantic references', passed: false, errors: [result.message], count: semantics.length };
  }
  return { name: 'Semantic references', passed: true, errors: [], count: semantics.length };
}

function validateMathematicalRelationships(primitives: PrimitiveToken[]): CheckResult {
  const errors: string[] = [];
  const parser = new MathematicalRelationshipParser();

  for (const token of primitives) {
    if (!token.mathematicalRelationship) continue;
    const result = parser.validate(token.mathematicalRelationship, token.baseValue, token.familyBaseValue);
    if (!result.isValid) {
      errors.push(`${token.name}: ${result.errors.join('; ')}`);
    }
  }

  return { name: 'Mathematical relationships', passed: errors.length === 0, errors, count: primitives.length };
}

export function reportResults(results: CheckResult[]): void {
  for (const result of results) {
    const icon = result.passed ? '✅' : '❌';
    const countStr = result.count ? ` (${result.count} checked)` : '';
    console.log(`${icon} ${result.name}${countStr}`);
    for (const err of result.errors) {
      console.log(`   - ${err}`);
    }
  }

  console.log('');
  const passed = results.every(r => r.passed);
  const failCount = results.filter(r => !r.passed).length;
  if (passed) {
    console.log('✨ All validation checks passed');
  } else {
    console.log(`❌ Validation failed (${failCount} of ${results.length} checks failed)`);
  }
}
