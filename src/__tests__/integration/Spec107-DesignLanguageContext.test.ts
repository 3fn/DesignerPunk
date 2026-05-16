/**
 * @category evergreen
 * @purpose Integration tests for Spec 107 design language context (Application MCP + Product MCP + font tokens)
 */

import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';

// These live outside src/ — use require to avoid tsconfig rootDir constraints
const { DesignPhilosophyIndexer } = require(path.resolve(__dirname, '../../../application-mcp-server/src/indexer/DesignPhilosophyIndexer'));
const { ProductIndexer } = require(path.resolve(__dirname, '../../../product-mcp-server/src/indexer/ProductIndexer'));
import { getAllPrimitiveTokens } from '../../tokens';

const PHILOSOPHY_PATH = path.resolve(__dirname, '../../../design-language/design-philosophy.yaml');
const PRODUCT_FIXTURES = path.resolve(__dirname, '../../../product-mcp-server/src/__tests__/fixtures');

describe('Spec 107 Integration: Design Language Context', () => {

  describe('Application MCP — Design Philosophy', () => {
    let indexer: any;

    beforeAll(async () => {
      indexer = new DesignPhilosophyIndexer();
      await indexer.index(PHILOSOPHY_PATH);
    });

    test('serves design philosophy after indexing', () => {
      const p = indexer.getPhilosophy();
      expect(p).not.toBeNull();
      expect(p!.northStar).toBeTruthy();
      expect(p!.description).toBeTruthy();
      expect(p!.characteristics.length).toBeGreaterThan(0);
    });

    test('serves named design rules', () => {
      const rules = indexer.getRules();
      expect(rules.length).toBeGreaterThan(0);
      expect(rules[0]).toHaveProperty('name');
      expect(rules[0]).toHaveProperty('constraint');
      expect(rules[0]).toHaveProperty('rationale');
    });

    test('category filtering works for get_design_guidance', () => {
      const all = indexer.getGuidance();
      const spacing = indexer.getGuidance('spacing');

      expect(all.do.length).toBeGreaterThan(spacing.do.length);
      expect(spacing.do.every((i: any) => i.category === 'spacing')).toBe(true);
      expect(spacing.dont.every((i: any) => i.category === 'spacing')).toBe(true);
    });

    test('tier filtering works for get_color_strategy', () => {
      const all = indexer.getColorStrategy();
      const restrained = indexer.getColorStrategy('Restrained');

      expect(all.length).toBeGreaterThan(1);
      expect(restrained).toHaveLength(1);
      expect(restrained[0].tier).toBe('Restrained');
      expect(restrained[0]).toHaveProperty('definition');
      expect(restrained[0]).toHaveProperty('whenToUse');
      expect(restrained[0]).toHaveProperty('whenNotToUse');
    });

    test('"not authored" response when file missing', async () => {
      const fresh = new DesignPhilosophyIndexer();
      await fresh.index('/nonexistent/path.yaml');
      expect(fresh.getPhilosophy()).toBeNull();
      expect(fresh.getRules()).toEqual([]);
      expect(fresh.getWarnings().length).toBeGreaterThan(0);
    });
  });

  describe('Product MCP — Brand Context', () => {
    let indexer: any;

    beforeAll(() => {
      indexer = new ProductIndexer(PRODUCT_FIXTURES, path.resolve(__dirname, '../../../src/components/core'));
      indexer.index();
    });

    test('serves brand context from extended overview.yaml', () => {
      const brand = indexer.getBrandContext();
      expect(brand).not.toHaveProperty('status');
      expect(brand).toHaveProperty('personality');
      expect(brand).toHaveProperty('voice');
      expect(brand).toHaveProperty('register');
    });

    test('"not configured" response when brand fields absent', () => {
      const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dp-brand-'));
      fs.writeFileSync(path.join(tmpDir, 'overview.yaml'), 'name: NoBrand\n');
      const fresh = new ProductIndexer(tmpDir, path.resolve(__dirname, '../../../src/components/core'));
      fresh.index();
      const result = fresh.getBrandContext();
      expect(result).toHaveProperty('status', 'not_configured');
      fs.rmSync(tmpDir, { recursive: true });
    });
  });

  describe('Font Family Token Output', () => {
    test('fontFamilyBody references Figtree', () => {
      const tokens = getAllPrimitiveTokens();
      const body = tokens.find((t: any) => t.name === 'fontFamilyBody');
      expect(body).toBeDefined();
      expect(body!.platforms.web.value).toContain('Figtree');
    });

    test('fontFamilyMono references Commit Mono', () => {
      const tokens = getAllPrimitiveTokens();
      const mono = tokens.find((t: any) => t.name === 'fontFamilyMono');
      expect(mono).toBeDefined();
      expect(mono!.platforms.web.value).toContain('Commit Mono');
    });

    test('fontFamilyDisplay unchanged (Rajdhani)', () => {
      const tokens = getAllPrimitiveTokens();
      const display = tokens.find((t: any) => t.name === 'fontFamilyDisplay');
      expect(display).toBeDefined();
      expect(display!.platforms.web.value).toContain('Rajdhani');
    });
  });
});
