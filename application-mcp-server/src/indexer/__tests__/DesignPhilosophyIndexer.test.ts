/**
 * @category evergreen
 * @purpose Verify DesignPhilosophyIndexer parsing, retrieval, and validation (Spec 107)
 */

import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';
import { DesignPhilosophyIndexer } from '../DesignPhilosophyIndexer';

const FIXTURE_PATH = path.resolve(__dirname, 'fixtures/design-philosophy.yaml');

describe('DesignPhilosophyIndexer', () => {
  let indexer: DesignPhilosophyIndexer;

  beforeEach(async () => {
    indexer = new DesignPhilosophyIndexer();
    await indexer.index(FIXTURE_PATH);
  });

  describe('getPhilosophy', () => {
    test('returns philosophy with all fields', () => {
      const p = indexer.getPhilosophy();
      expect(p).not.toBeNull();
      expect(p!.northStar).toBe('Test North Star');
      expect(p!.description).toContain('Test description');
      expect(p!.characteristics).toHaveLength(2);
    });
  });

  describe('getRules', () => {
    test('returns all rules', () => {
      const rules = indexer.getRules();
      expect(rules).toHaveLength(2);
      expect(rules[0].name).toBe('Rule One');
      expect(rules[0].constraint).toBe('Do the thing correctly');
      expect(rules[0].rationale).toBe('Because correctness matters');
    });
  });

  describe('getGuidance', () => {
    test('returns all guidance when no category filter', () => {
      const g = indexer.getGuidance();
      expect(g.do).toHaveLength(2);
      expect(g.dont).toHaveLength(2);
    });

    test('filters by category', () => {
      const g = indexer.getGuidance('spacing');
      expect(g.do).toHaveLength(1);
      expect(g.do[0].directive).toBe('Use 8px grid');
      expect(g.dont).toHaveLength(1);
      expect(g.dont[0].directive).toBe('Use arbitrary values');
    });

    test('returns empty for unknown category', () => {
      const g = indexer.getGuidance('nonexistent');
      expect(g.do).toHaveLength(0);
      expect(g.dont).toHaveLength(0);
    });
  });

  describe('getColorStrategy', () => {
    test('returns all tiers when no filter', () => {
      const tiers = indexer.getColorStrategy();
      expect(tiers).toHaveLength(2);
    });

    test('filters by tier name (case-insensitive)', () => {
      const tiers = indexer.getColorStrategy('restrained');
      expect(tiers).toHaveLength(1);
      expect(tiers[0].definition).toBe('Neutral surfaces dominate');
    });
  });

  describe('getWarnings', () => {
    test('no warnings for valid fixture', () => {
      expect(indexer.getWarnings()).toHaveLength(0);
    });

    test('warns when file not found', async () => {
      const fresh = new DesignPhilosophyIndexer();
      await fresh.index('/nonexistent/path.yaml');
      expect(fresh.getWarnings()).toHaveLength(1);
      expect(fresh.getWarnings()[0]).toContain('not found');
    });

    test('warns when required fields missing', async () => {
      const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dp-phil-'));
      const tmpFile = path.join(tmpDir, 'empty.yaml');
      fs.writeFileSync(tmpFile, 'schemaVersion: 1\n');

      const fresh = new DesignPhilosophyIndexer();
      await fresh.index(tmpFile);
      const warnings = fresh.getWarnings();
      expect(warnings.length).toBeGreaterThan(0);
      expect(warnings.some(w => w.includes('northStar'))).toBe(true);

      fs.rmSync(tmpDir, { recursive: true });
    });
  });
});
