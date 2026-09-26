/**
 * @category evergreen
 * @purpose Pin the component indexer's multi-root behavior (Spec 123 Task 1.4 — design C3 "Indexer")
 *
 * Interactions under test (tasks.md Task 1, subtask 1.4):
 *   (i)   the consumer ∪ package UNION is applied at PASS 1; precedence keys on the DECLARED
 *         component name; the legacy `core/` level under the consumer root is recognized (L-D8);
 *   (iii) pass 3's composed-token resolution runs across BOTH roots;
 *   (iv)  the token reindex path anchors on `bornRoot` (the explicit anchor), never a stale /
 *         component-root-derived `lastProjectRoot`.
 * Interaction (ii) — watcher + StalenessGate over the consumer root — is exercised on the
 * application server in `src/__tests__/consumerRootLiveReindex.test.ts`.
 *
 * Fixture shape mirrors a real consumer install: the package root sits under
 * `node_modules/@3fn/core/src/components/core`, the consumer root at `src/components`.
 */

import * as fs from 'fs';
import * as path from 'path';
import { ComponentIndexer } from '../ComponentIndexer';
import { buildConsumerFixture, writeComponent, ConsumerFixture } from './fixtures/consumerFixture';

describe('ComponentIndexer — multi-root (Spec 123 Task 1.4)', () => {
  let fx: ConsumerFixture;

  beforeEach(() => {
    fx = buildConsumerFixture('dp-multiroot-');
  });

  afterEach(() => {
    fs.rmSync(fx.base, { recursive: true, force: true });
  });

  // (i) ---------------------------------------------------------------------
  it('(i) applies the union at pass 1: a fork with a different directory name, inheriting a package parent, resolves and wins on its DECLARED name', async () => {
    const indexer = new ComponentIndexer();
    await indexer.indexComponents([fx.consumerRoot, fx.packageRoot], undefined, undefined, undefined, undefined, { projectRoot: fx.base });

    // Asserted count: 3 package + 2 consumer, minus the 1 package component the fork shadows.
    const catalog = indexer.getCatalog();
    expect(catalog.map(c => c.name).sort()).toEqual(['Card-Consumer', 'Panel-Base', 'Widget-Base', 'Widget-Primary']);
    expect(catalog.filter(c => c.name === 'Widget-Primary')).toHaveLength(1);

    const fork = indexer.getComponent('Widget-Primary')!;
    // The fork won (its directory name `widget-primary-fork` differs from the declared name).
    expect(fork.description).toBe('FORK');
    expect(fork.tokens).toEqual(['color.fork']);
    // ...and its inheritance of the PACKAGE parent resolved at pass 1.
    expect(fork.contracts.inheritsFrom).toBe('Widget-Base');
    expect(fork.contracts.active.interaction_pressable?.source).toBe('inherited');
    expect(fork.contracts.active.visual_fork_marker?.source).toBe('own');
    expect(fork.contracts.active.visual_package_marker).toBeUndefined();
    expect(fork.warnings.filter(w => w.includes('Unresolved inheritance'))).toEqual([]);
  });

  it('(i) recognizes a legacy core/ level under the consumer root, with a named warning on each load', async () => {
    writeComponent(path.join(fx.consumerRoot, 'core'), { dir: 'Legacy-Thing', name: 'Legacy-Thing', contracts: ['visual_legacy'] });
    const indexer = new ComponentIndexer();
    for (let load = 0; load < 2; load++) {
      await indexer.indexComponents([fx.consumerRoot, fx.packageRoot], undefined, undefined, undefined, undefined, { projectRoot: fx.base });
      expect(indexer.getComponent('Legacy-Thing')).not.toBeNull();
      const legacyWarnings = indexer.getHealth().warnings.filter(w => w.startsWith('Legacy component level:'));
      expect(legacyWarnings).toHaveLength(1);
      expect(legacyWarnings[0]).toContain(path.join(fx.consumerRoot, 'core'));
      // `core/` itself is a level, not a component — no "has no schema.yaml" warning for it.
      expect(indexer.getHealth().warnings.filter(w => w.includes('has no schema.yaml: core'))).toEqual([]);
    }
    expect(indexer.getCatalog()).toHaveLength(5);
  });

  it('(i) a legacy core/ level that IS another root in the set (steward layout) is left to that root — no duplicates, no warning', async () => {
    // Steward shape: consumer root = <repo>/src/components, package root = <repo>/src/components/core.
    const stewardComponents = path.join(fx.base, 'steward', 'src', 'components');
    const stewardCore = path.join(stewardComponents, 'core');
    writeComponent(stewardCore, { dir: 'Steward-Thing', name: 'Steward-Thing', contracts: ['visual_steward'] });
    const indexer = new ComponentIndexer();
    await indexer.indexComponents([stewardComponents, stewardCore]);
    expect(indexer.getCatalog().map(c => c.name)).toEqual(['Steward-Thing']);
    expect(indexer.getHealth().warnings.filter(w => w.startsWith('Legacy component level:'))).toEqual([]);
  });

  // (iii) -------------------------------------------------------------------
  it('(iii) pass 3 resolves composed tokens across both roots', async () => {
    const indexer = new ComponentIndexer();
    await indexer.indexComponents([fx.consumerRoot, fx.packageRoot], undefined, undefined, undefined, undefined, { projectRoot: fx.base });

    // Consumer component composing a PACKAGE child.
    const card = indexer.getComponent('Card-Consumer')!;
    expect(card.resolvedTokens.composed).toEqual({ 'Widget-Base': ['space100'] });
    expect(card.warnings.filter(w => w.includes('not indexed'))).toEqual([]);

    // Package component composing a child the CONSUMER forked → the fork's tokens (precedence holds in pass 3).
    const panel = indexer.getComponent('Panel-Base')!;
    expect(panel.resolvedTokens.composed).toEqual({ 'Widget-Primary': ['color.fork'] });
    expect(panel.warnings.filter(w => w.includes('not indexed'))).toEqual([]);
  });

  // (iv) --------------------------------------------------------------------
  it('(iv) the token reindex path anchors on bornRoot — never a component-root derivation, never a stale anchor', async () => {
    const indexer = new ComponentIndexer();
    const tokenIndexer = indexer.getTokenIndexer();
    const spy = jest.spyOn(tokenIndexer, 'indexTokens').mockResolvedValue(undefined);

    const bornA = fx.base;
    await indexer.indexComponents([fx.consumerRoot, fx.packageRoot], undefined, undefined, undefined, undefined, { projectRoot: bornA });
    await indexer.reindexTokens('/tokens-a');
    expect(spy).toHaveBeenLastCalledWith('/tokens-a', bornA);
    // Non-vacuity: the pre-123 derivation from the consumer root would NOT have been bornA.
    expect(path.resolve(fx.consumerRoot, '..', '..', '..')).not.toBe(bornA);

    // A later full index with a different anchor → the reindex path follows it (no stale reuse).
    const bornB = path.join(fx.base, 'elsewhere');
    await indexer.indexComponents([fx.consumerRoot, fx.packageRoot], undefined, undefined, undefined, undefined, { projectRoot: bornB });
    await indexer.reindexTokens('/tokens-b');
    expect(spy).toHaveBeenLastCalledWith('/tokens-b', bornB);
    spy.mockRestore();
  });

  // Watcher-path precedence (supports interaction (ii)) ---------------------
  it('reindexComponent respects precedence: a shadowed package dir does not overwrite the fork; only the reindexed dir\'s own entry is replaced', async () => {
    const indexer = new ComponentIndexer();
    await indexer.indexComponents([fx.consumerRoot, fx.packageRoot], undefined, undefined, undefined, undefined, { projectRoot: fx.base });
    const before = indexer.getCatalog().map(c => c.name).sort();

    await indexer.reindexComponent(path.join(fx.packageRoot, 'Widget-Primary'));
    expect(indexer.getComponent('Widget-Primary')!.description).toBe('FORK');

    await indexer.reindexComponent(path.join(fx.consumerRoot, 'Card-Consumer'));
    expect(indexer.getCatalog().map(c => c.name).sort()).toEqual(before);
  });
});
