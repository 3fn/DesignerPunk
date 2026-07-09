/**
 * @jest-environment node
 * @category evergreen
 * @purpose Unit tests for GapDetector — catalog loading, exact matching, one-off exclusion
 */

import * as path from 'path';
import { GapDetector } from '../indexer/GapDetector';

const MOCK_COMPONENTS = path.join(__dirname, 'fixtures', 'mock-components');

describe('GapDetector', () => {
  describe('with valid component directory', () => {
    let detector: GapDetector;

    beforeEach(() => {
      detector = new GapDetector(MOCK_COMPONENTS, new Set(['legislation-card']));
      detector.loadCatalog();
    });

    it('loads catalog from component-meta.yaml files', () => {
      expect(detector.getCatalogSize()).toBe(5);
    });

    it('returns ok for a component in the catalog', () => {
      expect(detector.check('Button-CTA')).toBe('ok');
      expect(detector.check('Container-Base')).toBe('ok');
      expect(detector.check('Nav-Header-App')).toBe('ok');
    });

    it('returns ok for a one-off component', () => {
      expect(detector.check('legislation-card')).toBe('ok');
    });

    it('returns not-found for an unknown component', () => {
      expect(detector.check('nonexistent-widget')).toBe('not-found');
    });

    it('returns not-found for a component not in catalog or one-offs', () => {
      expect(detector.check('Progress-Stepper-Base')).toBe('not-found');
    });

    it('uses exact string matching — no fuzzy', () => {
      expect(detector.check('button-cta')).toBe('not-found');
      expect(detector.check('BUTTON-CTA')).toBe('not-found');
      expect(detector.check('Button-CTA ')).toBe('not-found');
    });
  });

  describe('with missing component directory', () => {
    beforeEach(() => {
      // GapDetector logs "gap detection disabled" via console.error when the dir is missing;
      // only the first test below asserts on it — silence it for the others.
      jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    it('logs warning and leaves catalog empty', () => {
      const spy = jest.spyOn(console, 'error').mockImplementation();
      const detector = new GapDetector('/nonexistent/path', new Set());
      detector.loadCatalog();
      expect(detector.getCatalogSize()).toBe(0);
      expect(spy).toHaveBeenCalledWith(expect.stringContaining('gap detection disabled'));
    });

    it('returns not-found for all components when catalog is empty', () => {
      const detector = new GapDetector('/nonexistent/path', new Set());
      detector.loadCatalog();
      expect(detector.check('Button-CTA')).toBe('not-found');
    });

    it('still returns ok for one-offs when catalog is empty', () => {
      const detector = new GapDetector('/nonexistent/path', new Set(['my-widget']));
      detector.loadCatalog();
      expect(detector.check('my-widget')).toBe('ok');
    });
  });
});
