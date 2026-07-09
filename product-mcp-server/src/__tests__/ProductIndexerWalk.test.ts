/**
 * @jest-environment node
 * @category evergreen
 * @purpose Integration tests for ProductIndexer walk — reverse indexes, gap detection, enriched map, template cross-refs
 */

import * as path from 'path';
import { ProductIndexer } from '../indexer/ProductIndexer';

const FIXTURE_DIR = path.join(__dirname, 'fixtures');
const MOCK_COMPONENTS = path.join(FIXTURE_DIR, 'mock-components');

describe('ProductIndexer walk integration', () => {
  let indexer: ProductIndexer;
  let consoleErrorSpy: jest.SpyInstance;

  beforeAll(async () => {
    // ProductIndexer.index() logs an indexing summary via console.error (informational, not a failure)
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    indexer = new ProductIndexer(FIXTURE_DIR, MOCK_COMPONENTS);
    await indexer.index();
  });

  afterAll(() => {
    consoleErrorSpy.mockRestore();
  });

  describe('reverse indexes — components', () => {
    it('indexes Nav-Header-App from legislation-list', () => {
      const refs = indexer.getReverseIndexes().componentToScreens.get('Nav-Header-App');
      expect(refs).toBeDefined();
      expect(refs!.some(r => r.screen === 'legislation-list')).toBe(true);
    });

    it('indexes Container-Base from multiple screens', () => {
      const refs = indexer.getReverseIndexes().componentToScreens.get('Container-Base');
      const screens = refs!.map(r => r.screen);
      expect(screens).toContain('legislation-list');
      expect(screens).toContain('dashboard');
    });

    it('indexes Button-CTA from onboarding', () => {
      const refs = indexer.getReverseIndexes().componentToScreens.get('Button-CTA');
      expect(refs).toBeDefined();
      expect(refs!.some(r => r.screen === 'onboarding')).toBe(true);
    });

    it('indexes one-off component legislation-card', () => {
      const refs = indexer.getReverseIndexes().componentToScreens.get('legislation-card');
      expect(refs).toBeDefined();
      expect(refs!.some(r => r.screen === 'legislation-list')).toBe(true);
    });

    it('indexes nonexistent-widget (still in component index even though gap)', () => {
      const refs = indexer.getReverseIndexes().componentToScreens.get('nonexistent-widget');
      expect(refs).toBeDefined();
    });
  });

  describe('reverse indexes — tokens', () => {
    it('indexes color.structure.surface from legislation-list', () => {
      const refs = indexer.getReverseIndexes().tokenToScreens.get('color.structure.surface');
      expect(refs).toBeDefined();
      const screens = refs!.map(r => r.screen);
      expect(screens).toContain('legislation-list');
    });

    it('indexes color.action.primary from multiple screens', () => {
      const refs = indexer.getReverseIndexes().tokenToScreens.get('color.action.primary');
      expect(refs).toBeDefined();
      const screens = refs!.map(r => r.screen);
      expect(screens).toContain('legislation-list');
      expect(screens).toContain('onboarding');
    });

    it('indexes space.inset.normal', () => {
      const refs = indexer.getReverseIndexes().tokenToScreens.get('space.inset.normal');
      expect(refs).toBeDefined();
      expect(refs!.length).toBeGreaterThanOrEqual(1);
    });
  });

  describe('reverse indexes — domain objects', () => {
    it('indexes bill from legislation-list', () => {
      const refs = indexer.getReverseIndexes().domainObjectToScreens.get('bill');
      expect(refs).toBeDefined();
      expect(refs!.some(r => r.screen === 'legislation-list')).toBe(true);
    });
  });

  describe('gap detection', () => {
    it('detects nonexistent-widget as not-found', () => {
      const gaps = indexer.getGaps('legislation-list');
      const widgetGap = gaps.find(g => g.component === 'nonexistent-widget');
      expect(widgetGap).toBeDefined();
      expect(widgetGap!.issue).toBe('not-found');
    });

    it('detects Progress-Stepper-Base as not-found (absent from mock catalog)', () => {
      const gaps = indexer.getGaps('onboarding');
      const stepperGap = gaps.find(g => g.component === 'Progress-Stepper-Base');
      expect(stepperGap).toBeDefined();
      expect(stepperGap!.issue).toBe('not-found');
    });

    it('does not flag known components', () => {
      const gaps = indexer.getGaps('legislation-list');
      expect(gaps.find(g => g.component === 'Nav-Header-App')).toBeUndefined();
      expect(gaps.find(g => g.component === 'Container-Base')).toBeUndefined();
    });

    it('does not flag one-off components', () => {
      const gaps = indexer.getGaps('legislation-list');
      expect(gaps.find(g => g.component === 'legislation-card')).toBeUndefined();
    });

    it('includes path in gap entries', () => {
      const gaps = indexer.getGaps('legislation-list');
      const widgetGap = gaps.find(g => g.component === 'nonexistent-widget');
      expect(widgetGap!.path).toContain('component');
    });

    it('returns empty array for screens with no gaps', () => {
      expect(indexer.getGaps('dashboard')).toEqual([]);
    });
  });

  describe('enriched experience map', () => {
    it('includes referencedComponents for legislation-list', () => {
      const entry = indexer.getEnrichedExperienceMap().find(e => e.name === 'legislation-list');
      expect(entry!.referencedComponents).toContain('Nav-Header-App');
      expect(entry!.referencedComponents).toContain('Container-Base');
      expect(entry!.referencedComponents).toContain('legislation-card');
    });

    it('includes referencedDomainObjects for legislation-list', () => {
      const entry = indexer.getEnrichedExperienceMap().find(e => e.name === 'legislation-list');
      expect(entry!.referencedDomainObjects).toContain('bill');
    });

    it('includes blockedReasons for legislation-list', () => {
      const entry = indexer.getEnrichedExperienceMap().find(e => e.name === 'legislation-list');
      expect(entry!.blockedReasons).toEqual({ android: 'Waiting on sync tool' });
    });

    it('includes tags for legislation-list', () => {
      const entry = indexer.getEnrichedExperienceMap().find(e => e.name === 'legislation-list');
      expect(entry!.tags).toEqual(['civic', 'legislation']);
    });

    it('has no blockedReasons for non-blocked screens', () => {
      const entry = indexer.getEnrichedExperienceMap().find(e => e.name === 'onboarding');
      expect(entry!.blockedReasons).toBeUndefined();
    });
  });

  describe('template cross-refs', () => {
    it('maps card-grid to legislation-list and dashboard', () => {
      const screens = indexer.getTemplateScreens('card-grid');
      expect(screens).toContain('legislation-list');
      expect(screens).toContain('dashboard');
    });

    it('returns empty for unknown template', () => {
      expect(indexer.getTemplateScreens('nonexistent')).toEqual([]);
    });
  });

  describe('catalog size', () => {
    it('reports mock catalog size', () => {
      expect(indexer.getCatalogSize()).toBe(5);
    });
  });
});
