/**
 * PackageReadiness — a consumer sees DesignerPunk's components at their real readiness.
 *
 * Release-3 ruling item 5 (2026-10-13; #312 finding 8). The package ships each component's
 * schema, contracts, meta and native sources, but not its web source, `types.ts` or tests, so a
 * file scan inside `node_modules/@3fn/core` read every component as web `not-started`. The
 * indexer now serves the readiness recorded from this repo's scan for packaged components.
 *
 * 1. The record equals a fresh scan of src/components/core (regenerate:
 *    UPDATE_PACKAGE_READINESS=1 npx jest --config application-mcp-server/jest.config.js PackageReadiness).
 * 2. The consumer condition: Nav-TabBar-Base laid out as the package ships it, under a
 *    `node_modules/` path, reads its recorded readiness (web production-ready), not web `not-started`.
 * 3. Control: the same shipped files OUTSIDE `node_modules/` (a consumer's own copy) are still
 *    derived from their files, which reproduces the pre-fix reading.
 *
 * @see .kiro/specs/086-component-meta-extraction-pipeline/design.md § Decision 4 (dated note 2026-10-13)
 */

import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { ComponentIndexer } from '../ComponentIndexer';
import { PACKAGE_READINESS } from '../packageReadiness.generated';
import { renderPackageReadinessModule } from '../packageReadiness';
import type { PlatformReadiness } from '../../models';

const REPO_COMPONENTS = path.resolve(__dirname, '../../../../src/components/core');
const GENERATED = path.resolve(__dirname, '../packageReadiness.generated.ts');
const EXAMPLE = 'Nav-TabBar-Base';

/** The files of one component that `package.json` `files` ships (schema, contracts, meta, native sources; no web, types.ts or tests). */
function copyAsShipped(srcDir: string, destDir: string): void {
  fs.mkdirSync(destDir, { recursive: true });
  for (const f of fs.readdirSync(srcDir)) {
    if (f.endsWith('.schema.yaml') || f === 'contracts.yaml' || f === 'component-meta.yaml') {
      fs.copyFileSync(path.join(srcDir, f), path.join(destDir, f));
    }
  }
  const native: Array<[string, RegExp, RegExp]> = [
    ['ios', /\.swift$/, /Tests\.swift$/],
    ['android', /\.kt$/, /Test\.kt$/],
  ];
  for (const [platform, keep, drop] of native) {
    const from = path.join(srcDir, 'platforms', platform);
    if (!fs.existsSync(from)) continue;
    const to = path.join(destDir, 'platforms', platform);
    fs.mkdirSync(to, { recursive: true });
    for (const f of fs.readdirSync(from)) {
      if (keep.test(f) && !drop.test(f)) fs.copyFileSync(path.join(from, f), path.join(to, f));
    }
  }
}

describe('PackageReadiness — the recorded readiness of shipped components', () => {
  let live: Record<string, PlatformReadiness>;

  beforeAll(async () => {
    const indexer = new ComponentIndexer();
    await indexer.indexComponents(REPO_COMPONENTS);
    live = {};
    for (const entry of indexer.getCatalog()) live[entry.name] = entry.readiness;
    if (process.env.UPDATE_PACKAGE_READINESS === '1') {
      fs.writeFileSync(GENERATED, renderPackageReadinessModule(live));
    }
  });

  it('the record equals a fresh scan of src/components/core (regenerate with UPDATE_PACKAGE_READINESS=1 if not)', () => {
    expect(Object.keys(live).length).toBeGreaterThan(20);
    expect(PACKAGE_READINESS).toEqual(live);
  });

  describe(`the consumer condition, on ${EXAMPLE}`, () => {
    let tmp: string;
    beforeAll(() => {
      tmp = fs.realpathSync(fs.mkdtempSync(path.join(os.tmpdir(), 'dp-package-readiness-')));
    });
    afterAll(() => fs.rmSync(tmp, { recursive: true, force: true }));

    it('the repo reads it production-ready on web (the premise; its native rows read scaffold in this repo too)', () => {
      expect(PACKAGE_READINESS[EXAMPLE].web.status).toBe('production-ready');
    });

    it('laid out as the package ships it, under node_modules/@3fn/core, it reads its recorded readiness (not web not-started)', async () => {
      const root = path.join(tmp, 'consumer', 'node_modules', '@3fn', 'core', 'src', 'components', 'core');
      copyAsShipped(path.join(REPO_COMPONENTS, EXAMPLE), path.join(root, EXAMPLE));
      expect(fs.existsSync(path.join(root, EXAMPLE, 'platforms', 'web'))).toBe(false); // no web source, as shipped
      expect(fs.existsSync(path.join(root, EXAMPLE, 'types.ts'))).toBe(false);
      const indexer = new ComponentIndexer();
      await indexer.indexComponents(root);
      const meta = indexer.getComponent(EXAMPLE);
      expect(meta).not.toBeNull();
      expect(meta!.readiness.web.status).not.toBe('not-started');
      expect(meta!.readiness).toEqual(PACKAGE_READINESS[EXAMPLE]);
    });

    it('control: the same shipped files outside node_modules are derived from their files (the pre-fix reading)', async () => {
      const root = path.join(tmp, 'own-tree', 'src', 'components');
      copyAsShipped(path.join(REPO_COMPONENTS, EXAMPLE), path.join(root, EXAMPLE));
      const indexer = new ComponentIndexer();
      await indexer.indexComponents(root);
      const r = indexer.getComponent(EXAMPLE)!.readiness;
      expect([r.web.status, r.ios.status, r.android.status]).toEqual(['not-started', 'scaffold', 'scaffold']);
    });
  });
});
