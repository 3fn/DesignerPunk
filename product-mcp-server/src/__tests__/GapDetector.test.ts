/**
 * @jest-environment node
 * @category evergreen
 * @purpose Unit tests for GapDetector — catalog loading, exact matching, one-off exclusion, root-set union
 */

import * as fs from 'fs';
import * as os from 'os';
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
  /**
   * Root-set union (issue 2026-09-26-product-server-component-root). The born-repo case:
   * after `init`, the consumer's `src/components/` exists and holds only a README. Reading
   * only the precedence winner (roots[0]) would build an EMPTY catalog without tripping the
   * "gap detection disabled" path — every DesignerPunk component would report not-found.
   */
  describe('with a precedence-ordered root set (born repo)', () => {
    const PACKAGE_ROOT = MOCK_COMPONENTS; // 5 components
    let tmp: string;
    let consumerRoot: string;

    const writeComponent = (root: string, name: string): void => {
      fs.mkdirSync(path.join(root, name), { recursive: true });
      fs.writeFileSync(path.join(root, name, 'component-meta.yaml'), `purpose: ${name} fixture\n`);
    };

    beforeEach(() => {
      tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'gapdetector-'));
      consumerRoot = path.join(tmp, 'born', 'src', 'components');
      fs.mkdirSync(consumerRoot, { recursive: true });
      fs.writeFileSync(path.join(consumerRoot, 'README.md'), '# Your components\n');
    });

    afterEach(() => {
      fs.rmSync(tmp, { recursive: true, force: true });
      jest.restoreAllMocks();
    });

    it('README-only consumer root: package components are in the catalog', () => {
      const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
      const detector = new GapDetector([consumerRoot, PACKAGE_ROOT], new Set());
      detector.loadCatalog();
      expect(detector.getCatalogSize()).toBe(5);
      expect(detector.check('Button-CTA')).toBe('ok');
      expect(detector.check('Container-Base')).toBe('ok');
      expect(detector.check('Nonexistent-Widget')).toBe('not-found');
      expect(spy).not.toHaveBeenCalled();
    });

    it('consumer-only and package components both resolve; unknown names do not', () => {
      writeComponent(consumerRoot, 'Widget-Local');
      const detector = new GapDetector([consumerRoot, PACKAGE_ROOT], new Set());
      detector.loadCatalog();
      expect(detector.getCatalogSize()).toBe(6);
      expect(detector.check('Widget-Local')).toBe('ok');
      expect(detector.check('Nav-Header-App')).toBe('ok');
      expect(detector.check('Progress-Stepper-Base')).toBe('not-found');
    });

    it('a consumer fork of a package component is counted once', () => {
      writeComponent(consumerRoot, 'Button-CTA');
      const detector = new GapDetector([consumerRoot, PACKAGE_ROOT], new Set());
      detector.loadCatalog();
      expect(detector.getCatalogSize()).toBe(5);
      expect(detector.check('Button-CTA')).toBe('ok');
    });

    it('a missing root alongside an existing one does not disable gap detection', () => {
      const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
      const detector = new GapDetector([path.join(tmp, 'absent'), PACKAGE_ROOT], new Set());
      detector.loadCatalog();
      expect(detector.getCatalogSize()).toBe(5);
      expect(spy).not.toHaveBeenCalledWith(expect.stringContaining('gap detection disabled'));
    });

    it('disables gap detection only when no root exists', () => {
      const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
      const detector = new GapDetector([path.join(tmp, 'a'), path.join(tmp, 'b')], new Set(['my-widget']));
      detector.loadCatalog();
      expect(detector.getCatalogSize()).toBe(0);
      expect(detector.check('my-widget')).toBe('ok');
      expect(spy).toHaveBeenCalledWith(expect.stringContaining('gap detection disabled'));
    });

    it('counts a pre-123 legacy core/ level under a root, with a named warning', () => {
      const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
      writeComponent(path.join(consumerRoot, 'core'), 'Legacy-Copied');
      writeComponent(path.join(consumerRoot, 'core'), 'Legacy-Other');
      const detector = new GapDetector([consumerRoot, PACKAGE_ROOT], new Set());
      detector.loadCatalog();
      expect(detector.getCatalogSize()).toBe(7);
      expect(detector.check('Legacy-Copied')).toBe('ok');
      expect(detector.check('core')).toBe('not-found');
      expect(spy).toHaveBeenCalledWith(expect.stringContaining('Legacy component level'));
    });

    it('leaves a core/ that IS another root in the set to that root (steward-repo shape)', () => {
      const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
      const stewardComponents = path.join(tmp, 'steward', 'src', 'components');
      const stewardCore = path.join(stewardComponents, 'core');
      writeComponent(stewardCore, 'Button-CTA');
      writeComponent(stewardCore, 'Icon-Base');
      const detector = new GapDetector([stewardComponents, stewardCore], new Set());
      detector.loadCatalog();
      expect(detector.getCatalogSize()).toBe(2);
      expect(detector.check('Icon-Base')).toBe('ok');
      expect(spy).not.toHaveBeenCalledWith(expect.stringContaining('Legacy component level'));
    });

    it('still accepts a single root string (legacy form)', () => {
      const detector = new GapDetector(PACKAGE_ROOT, new Set());
      detector.loadCatalog();
      expect(detector.getCatalogSize()).toBe(5);
    });
  });
});
