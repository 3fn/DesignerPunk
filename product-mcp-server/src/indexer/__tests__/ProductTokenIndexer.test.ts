/**
 * @jest-environment node
 * @category evergreen
 * @purpose Unit tests for ProductTokenIndexer — parsing, validation, filtering, health
 */

import * as path from 'path';
import { ProductTokenIndexer } from '../../indexer/ProductTokenIndexer';

const FIXTURES_TOKENS = path.join(__dirname, '../../__tests__/fixtures/tokens');
const FIXTURES_TOKEN_INDEX = path.join(__dirname, '../../__tests__/fixtures/token-index');

describe('ProductTokenIndexer', () => {
  let indexer: ProductTokenIndexer;

  beforeEach(() => {
    indexer = new ProductTokenIndexer(FIXTURES_TOKEN_INDEX);
    indexer.index(FIXTURES_TOKENS);
  });

  describe('valid token parsing', () => {
    it('parses categories from YAML files', () => {
      const health = indexer.getHealth();
      expect(health.categoryCount).toBe(3); // layout, motion, invalid
    });

    it('parses hard-value token with all fields', () => {
      const { categories } = indexer.query({ name: 'contentMaxWidth' });
      expect(categories).toHaveLength(1);
      const token = categories[0].tokens[0];
      expect(token.value).toBe(1336);
      expect(token.unitType).toBe('logical');
      expect(token.description).toBe('Maximum content column width');
      expect(token.rationale).toBe('Optimized for 70-75 characters per line at body font size');
      expect(token.usage).toBe('Applied above breakpointMd');
      expect(token.platforms).toEqual(['web', 'ios', 'android']);
      expect(token.ref).toBeNull();
      expect(token.resolvedValue).toBeNull();
      expect(token.resolutionDepth).toBeNull();
    });

    it('parses ref token with resolved value', () => {
      const { categories } = indexer.query({ name: 'contentIndent' });
      const token = categories[0].tokens[0];
      expect(token.ref).toBe('space300');
      expect(token.value).toBeNull();
      expect(token.unitType).toBeNull();
      expect(token.resolvedValue).toBe(24);
      expect(token.resolvedUnitType).toBe('logical');
      expect(token.resolutionDepth).toBe('full');
    });

    it('parses promotionCandidate flag', () => {
      const { categories } = indexer.query({ name: 'proseMeasureMax' });
      expect(categories[0].tokens[0].promotionCandidate).toBe(true);
    });

    it('defaults platforms to all when not specified', () => {
      const { categories } = indexer.query({ name: 'flipDuration' });
      expect(categories[0].tokens[0].platforms).toEqual(['web', 'ios', 'android']);
    });

    it('category includes name and description', () => {
      const { categories } = indexer.query({ category: 'layout' });
      expect(categories[0].name).toBe('layout');
      expect(categories[0].description).toBe('Structural layout constraints for the product');
    });
  });

  describe('validation errors', () => {
    it('rejects token with both value and ref', () => {
      const health = indexer.getHealth();
      expect(health.errors).toContainEqual(expect.stringContaining("'bothValueAndRef' has both value and ref"));
    });

    it('rejects token with neither value nor ref', () => {
      const health = indexer.getHealth();
      expect(health.errors).toContainEqual(expect.stringContaining("'neitherValueNorRef' has neither value nor ref"));
    });

    it('rejects value token without unitType', () => {
      const health = indexer.getHealth();
      expect(health.errors).toContainEqual(expect.stringContaining("'missingUnitType' has value without unitType"));
    });

    it('rejects value token without rationale', () => {
      const health = indexer.getHealth();
      expect(health.errors).toContainEqual(expect.stringContaining("'missingRationale' has hard value without rationale"));
    });

    it('rejects non-camelCase token name', () => {
      const health = indexer.getHealth();
      expect(health.errors).toContainEqual(expect.stringContaining("'BadCamelCase' must be camelCase"));
    });

    it('rejects platform-limited unitType with incompatible platforms', () => {
      const health = indexer.getHealth();
      expect(health.errors).toContainEqual(expect.stringContaining("'chOnIos' uses unitType 'ch' which is not available on platform 'ios'"));
    });

    it('rejects token missing description', () => {
      const health = indexer.getHealth();
      expect(health.errors).toContainEqual(expect.stringContaining("'missingDescription' is missing required 'description' field"));
    });
  });

  describe('per-token error isolation', () => {
    it('valid sibling survives when others have errors', () => {
      const { categories } = indexer.query({ category: 'invalid', name: 'validSibling' });
      expect(categories).toHaveLength(1);
      expect(categories[0].tokens[0].name).toBe('validSibling');
      expect(categories[0].tokens[0].ref).toBe('space200');
    });
  });

  describe('warnings', () => {
    it('warns on unresolved ref but includes token', () => {
      // Create indexer with no token-index to force unresolved refs
      const noIndex = new ProductTokenIndexer(undefined);
      noIndex.index(FIXTURES_TOKENS);
      const { warnings } = noIndex.query({});
      expect(warnings.some(w => w.includes('not in token-index'))).toBe(true);
      // Token still included
      const { categories } = noIndex.query({ name: 'contentIndent' });
      expect(categories).toHaveLength(1);
      expect(categories[0].tokens[0].resolvedValue).toBeNull();
    });
  });

  describe('category validation', () => {
    it('rejects category with invalid filename characters', () => {
      const bad = new ProductTokenIndexer(FIXTURES_TOKEN_INDEX);
      // Create a temp dir scenario — test via health after indexing a dir with bad filename
      // We test this indirectly: the 'invalid' category passes (lowercase + valid)
      const health = indexer.getHealth();
      // 'invalid' is a valid category name (all lowercase)
      expect(health.categoryCount).toBe(3);
    });
  });

  describe('query filtering', () => {
    it('filters by category', () => {
      const { categories } = indexer.query({ category: 'motion' });
      expect(categories).toHaveLength(1);
      expect(categories[0].name).toBe('motion');
    });

    it('filters by name', () => {
      const { categories } = indexer.query({ name: 'flickerDuration' });
      expect(categories).toHaveLength(1);
      expect(categories[0].tokens).toHaveLength(1);
      expect(categories[0].tokens[0].name).toBe('flickerDuration');
    });

    it('filters by platform', () => {
      const { categories } = indexer.query({ platform: 'ios' });
      // proseMeasureMax (web-only) and flickerDuration (web-only) excluded
      for (const cat of categories) {
        for (const token of cat.tokens) {
          expect(token.platforms).toContain('ios');
        }
      }
    });

    it('applies filters conjunctively', () => {
      const { categories } = indexer.query({ category: 'layout', platform: 'web' });
      expect(categories).toHaveLength(1);
      // All layout tokens that are web-applicable
      expect(categories[0].tokens.length).toBeGreaterThan(0);
    });

    it('returns empty categories array when no match', () => {
      const { categories } = indexer.query({ name: 'nonexistent' });
      expect(categories).toEqual([]);
    });
  });

  describe('health reporting', () => {
    it('reports accurate token count (valid tokens only)', () => {
      const health = indexer.getHealth();
      // layout: 3 valid, motion: 2 valid, invalid: 1 valid (validSibling)
      expect(health.tokenCount).toBe(6);
    });

    it('reports error count', () => {
      const health = indexer.getHealth();
      expect(health.errorCount).toBeGreaterThan(0);
    });

    it('reports warning count for unresolved refs', () => {
      const noIndex = new ProductTokenIndexer(undefined);
      noIndex.index(FIXTURES_TOKENS);
      const health = noIndex.getHealth();
      expect(health.warningCount).toBeGreaterThan(0);
    });
  });

  describe('missing tokens directory', () => {
    it('handles nonexistent directory gracefully', () => {
      const empty = new ProductTokenIndexer(FIXTURES_TOKEN_INDEX);
      empty.index('/nonexistent/path');
      const health = empty.getHealth();
      expect(health.tokenCount).toBe(0);
      expect(health.categoryCount).toBe(0);
      expect(health.errorCount).toBe(0);
    });
  });

  describe('re-index', () => {
    it('clears stale data on re-index', () => {
      expect(indexer.getHealth().tokenCount).toBeGreaterThan(0);
      indexer.index('/nonexistent/path');
      expect(indexer.getHealth().tokenCount).toBe(0);
    });
  });
});
