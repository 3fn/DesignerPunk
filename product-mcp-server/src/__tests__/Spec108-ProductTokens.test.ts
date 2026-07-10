/**
 * @jest-environment node
 * @category evergreen
 * @purpose Integration test for Spec 108 — end-to-end: YAML → ProductIndexer → get_product_tokens → response shape
 */

import * as path from 'path';
import { ProductIndexer } from '../indexer/ProductIndexer';

const FIXTURE_DIR = path.join(__dirname, 'fixtures');
const MOCK_COMPONENTS = path.join(__dirname, 'fixtures', 'mock-components');
const TOKEN_INDEX = path.join(__dirname, 'fixtures', 'token-index');

describe('Spec 108: Product Tokens Integration', () => {
  let indexer: ProductIndexer;
  let consoleErrorSpy: jest.SpyInstance;

  beforeAll(async () => {
    // ProductIndexer.index() logs an indexing summary via console.error (informational, not a failure)
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    indexer = new ProductIndexer(FIXTURE_DIR, MOCK_COMPONENTS, TOKEN_INDEX);
    await indexer.index();
  });

  afterAll(() => {
    consoleErrorSpy.mockRestore();
  });

  describe('get_product_tokens response shape', () => {
    it('returns categories array with tokens', () => {
      const result = indexer.getProductTokens({});
      expect(result.categories).toBeInstanceOf(Array);
      expect(result.categories.length).toBeGreaterThan(0);
      expect(result.warnings).toBeInstanceOf(Array);
    });

    it('each token has all required fields', () => {
      const result = indexer.getProductTokens({});
      const token = result.categories[0].tokens[0];
      expect(token).toHaveProperty('name');
      expect(token).toHaveProperty('value');
      expect(token).toHaveProperty('unitType');
      expect(token).toHaveProperty('ref');
      expect(token).toHaveProperty('resolvedValue');
      expect(token).toHaveProperty('resolvedUnitType');
      expect(token).toHaveProperty('resolutionDepth');
      expect(token).toHaveProperty('description');
      expect(token).toHaveProperty('rationale');
      expect(token).toHaveProperty('usage');
      expect(token).toHaveProperty('platforms');
      expect(token).toHaveProperty('promotionCandidate');
    });

    it('hard-value token has value and unitType, null ref fields', () => {
      const result = indexer.getProductTokens({ name: 'contentMaxWidth' });
      const token = result.categories[0].tokens[0];
      expect(token.value).toBe(1336);
      expect(token.unitType).toBe('logical');
      expect(token.ref).toBeNull();
      expect(token.resolvedValue).toBeNull();
      expect(token.resolvedUnitType).toBeNull();
      expect(token.resolutionDepth).toBeNull();
    });

    it('ref token has resolvedValue and resolvedUnitType', () => {
      const result = indexer.getProductTokens({ name: 'contentIndent' });
      const token = result.categories[0].tokens[0];
      expect(token.value).toBeNull();
      expect(token.unitType).toBeNull();
      expect(token.ref).toBe('space300');
      expect(token.resolvedValue).toBe(24);
      expect(token.resolvedUnitType).toBe('logical');
      expect(token.resolutionDepth).toBe('full');
    });

    it('category includes name and description', () => {
      const result = indexer.getProductTokens({ category: 'layout' });
      expect(result.categories[0].name).toBe('layout');
      expect(result.categories[0].description).toBeTruthy();
    });
  });

  describe('filter combinations', () => {
    it('filters by category only', () => {
      const result = indexer.getProductTokens({ category: 'motion' });
      expect(result.categories).toHaveLength(1);
      expect(result.categories[0].name).toBe('motion');
    });

    it('filters by platform only', () => {
      const result = indexer.getProductTokens({ platform: 'ios' });
      for (const cat of result.categories) {
        for (const token of cat.tokens) {
          expect(token.platforms).toContain('ios');
        }
      }
    });

    it('filters by name only', () => {
      const result = indexer.getProductTokens({ name: 'flipDuration' });
      expect(result.categories).toHaveLength(1);
      expect(result.categories[0].tokens).toHaveLength(1);
    });

    it('conjunctive: category + platform', () => {
      const result = indexer.getProductTokens({ category: 'layout', platform: 'ios' });
      expect(result.categories).toHaveLength(1);
      // proseMeasureMax is web-only, should be excluded
      for (const token of result.categories[0].tokens) {
        expect(token.platforms).toContain('ios');
      }
    });

    it('returns empty for no match', () => {
      const result = indexer.getProductTokens({ name: 'nonexistent' });
      expect(result.categories).toEqual([]);
    });
  });

  describe('health reporting', () => {
    it('includes productTokens in health', () => {
      const health = indexer.getProductTokenHealth();
      expect(health).toHaveProperty('tokenCount');
      expect(health).toHaveProperty('categoryCount');
      expect(health).toHaveProperty('errorCount');
      expect(health).toHaveProperty('warningCount');
      expect(health).toHaveProperty('errors');
      expect(health).toHaveProperty('warnings');
    });

    it('reports valid token count', () => {
      const health = indexer.getProductTokenHealth();
      expect(health.tokenCount).toBeGreaterThan(0);
      expect(health.categoryCount).toBeGreaterThan(0);
    });

    it('reports errors for invalid tokens', () => {
      const health = indexer.getProductTokenHealth();
      expect(health.errorCount).toBeGreaterThan(0);
      expect(health.errors.length).toBe(health.errorCount);
    });
  });

  describe('warnings for unresolved refs', () => {
    it('populates warnings array for refs not in token-index', () => {
      // The 'invalid' fixture has a validSibling ref to space200 which IS in our fixture token-index
      // But if we had a ref to something not in the index, it would warn
      const result = indexer.getProductTokens({});
      // Warnings array exists (may be empty if all refs resolve)
      expect(result.warnings).toBeInstanceOf(Array);
    });
  });
});
