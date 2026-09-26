/**
 * @jest-environment node
 * @category evergreen
 * @purpose Regression test for `.kiro/issues/2026-09-26-product-server-component-root.md` item 1
 *   (U1 side) — a born repo's ProductIndexer must pass the FULL precedence-ordered
 *   component root set through to GapDetector, never just `roots[0]`. Before the
 *   fix, a born repo's own (empty-of-components) `src/components/` directory was
 *   the ONLY root scanned, so every package component named in a screen spec
 *   reported `not-found` and every screen carried a spurious `_componentGaps`.
 *
 * Exercises `ProductIndexer` directly (the level `product-mcp-server/src/index.ts`'s
 * bootstrap constructs), not just `GapDetector` in isolation (already covered by
 * `GapDetector.test.ts`'s "precedence-ordered root set" describe block, added
 * alongside the `main`-side fix in #209).
 */

import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import * as yaml from 'js-yaml';
import { ProductIndexer } from '../indexer/ProductIndexer';

const PACKAGE_COMPONENTS = path.join(__dirname, 'fixtures', 'mock-components'); // has Button-CTA, Container-Base, etc.

describe('ProductIndexer — born-repo precedence-ordered component root set (U1 fix-up)', () => {
  let tmp: string;
  let productDir: string;
  let consumerComponentsRoot: string;
  let consoleErrorSpy: jest.SpyInstance;

  beforeEach(() => {
    tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'product-indexer-born-repo-'));
    productDir = path.join(tmp, 'product');
    consumerComponentsRoot = path.join(tmp, 'born', 'src', 'components');

    // Born repo's own (post-`init`) components directory: README only, per
    // Task 2's C1 row 4' — no components of its own yet.
    fs.mkdirSync(consumerComponentsRoot, { recursive: true });
    fs.writeFileSync(path.join(consumerComponentsRoot, 'README.md'), '# Your components\n');

    // One screen naming a PACKAGE component (Button-CTA lives only in
    // PACKAGE_COMPONENTS, never in the born repo's own empty root).
    const pagesDir = path.join(productDir, 'experience-map', 'pages');
    fs.mkdirSync(pagesDir, { recursive: true });
    fs.writeFileSync(
      path.join(pagesDir, 'test-screen.yaml'),
      yaml.dump({
        name: 'test-screen',
        type: 'feature-page',
        'ui-tree': { shared: [{ component: 'Button-CTA' }] },
      }),
    );

    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    fs.rmSync(tmp, { recursive: true, force: true });
    consoleErrorSpy.mockRestore();
  });

  it('the full root set (consumer ∪ package): a package component named in a spec reports NO gap', async () => {
    const indexer = new ProductIndexer(productDir, [consumerComponentsRoot, PACKAGE_COMPONENTS]);
    await indexer.index();

    expect(indexer.getGaps('test-screen')).toEqual([]);
  });

  it('BITE: passing roots[0] only (the pre-fix behavior) reproduces the gap — RED', async () => {
    // This is literally what the U1 bootstrap did before the fix: `componentDir =
    // component.path` where `component.path === componentRoots.roots[0]`.
    const indexer = new ProductIndexer(productDir, consumerComponentsRoot);
    await indexer.index();

    const gaps = indexer.getGaps('test-screen');
    expect(gaps.length).toBeGreaterThan(0);
    expect(gaps).toEqual([
      expect.objectContaining({ component: 'Button-CTA', issue: 'not-found' }),
    ]);
  });
});
