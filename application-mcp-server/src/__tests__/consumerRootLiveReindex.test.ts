/**
 * @category evergreen
 * @purpose A consumer component ADDED or EDITED while the application server runs is reflected in
 *          `get_component_catalog` (Spec 123 Task 1.4 (ii), T-L2).
 *
 * Criterion (tasks.md Task 1): the watcher and `StalenessGate` watch the CONSUMER root; the
 * package root is exempt as immutable. Scope: one add and one edit, exercised on the application
 * server — every call goes through `createTestableServer().callTool(...)`, the same dispatch path
 * as the live MCP handler. Both refresh paths are exercised: the staleness gate (threshold 0) and
 * the file watcher (gate disabled).
 *
 * Fixture: a consumer install — package root under `node_modules/@3fn/core/src/components/core`
 * (immutable), consumer root at `src/components`.
 */

import * as fs from 'fs';
import * as path from 'path';
import { createTestableServer, TestableServer } from '../index';
import { buildConsumerFixture, writeComponent, ConsumerFixture } from '../indexer/__tests__/fixtures/consumerFixture';

interface CatalogEntry { name: string; purpose: string | null }

async function catalog(server: TestableServer): Promise<CatalogEntry[]> {
  const result = (await server.callTool('get_component_catalog', {})) as { data: CatalogEntry[] };
  return result.data;
}

/** Set a file's mtime clearly after the server's last index (avoids coarse-mtime flakiness). */
function bumpMtime(filePath: string): void {
  const t = Date.now() / 1000 + 5;
  fs.utimesSync(filePath, t, t);
}

function writePurpose(dirPath: string, purpose: string): string {
  const metaPath = path.join(dirPath, 'component-meta.yaml');
  fs.writeFileSync(metaPath, `purpose: "${purpose}"\n`);
  return metaPath;
}

async function waitFor(predicate: () => Promise<boolean>, timeoutMs = 4000): Promise<boolean> {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    if (await predicate()) return true;
    await new Promise(r => setTimeout(r, 50));
  }
  return predicate();
}

describe('application server — consumer-root live reindex (Spec 123 Task 1.4 (ii))', () => {
  let fx: ConsumerFixture;
  let server: TestableServer;

  let errorSpy: jest.SpyInstance;

  beforeEach(() => {
    fx = buildConsumerFixture('dp-live-reindex-');
    errorSpy = jest.spyOn(console, 'error').mockImplementation(() => undefined); // gate's rebuild notice
  });

  afterEach(() => {
    errorSpy.mockRestore();
    server?.stopWatching();
    fs.rmSync(fx.base, { recursive: true, force: true });
  });

  it('watches the consumer root; the package root (immutable) is exempt from the watcher and the gate', async () => {
    server = createTestableServer({ componentsDir: [fx.consumerRoot, fx.packageRoot], projectRoot: fx.base }, { stalenessThresholdMs: 0 });
    await server.initialize();
    const dirs = server.getWatchedDirs();
    expect(dirs.watchedComponentRoots).toEqual([fx.consumerRoot]);
    expect(dirs.stalenessDataDirs).toContain(fx.consumerRoot);
    expect(dirs.stalenessDataDirs).not.toContain(fx.packageRoot);

    // Behavioral exemption: an edit under the immutable package root does not trigger a rebuild.
    bumpMtime(writePurpose(path.join(fx.packageRoot, 'Widget-Base'), 'package edit'));
    const entry = (await catalog(server)).find(c => c.name === 'Widget-Base')!;
    expect(entry.purpose).toBeNull();
  });

  it('staleness gate: a consumer component ADDED and then EDITED is reflected in get_component_catalog', async () => {
    server = createTestableServer({ componentsDir: [fx.consumerRoot, fx.packageRoot], projectRoot: fx.base }, { stalenessThresholdMs: 0 });
    await server.initialize();
    expect((await catalog(server)).map(c => c.name)).not.toContain('Consumer-Added');
    const countBefore = (await catalog(server)).length;

    // ADD
    const added = writeComponent(fx.consumerRoot, { dir: 'Consumer-Added', name: 'Consumer-Added', contracts: ['visual_added'] });
    for (const f of fs.readdirSync(added)) bumpMtime(path.join(added, f));
    const afterAdd = await catalog(server);
    expect(afterAdd.map(c => c.name)).toContain('Consumer-Added');
    expect(afterAdd).toHaveLength(countBefore + 1);

    // EDIT
    bumpMtime(writePurpose(added, 'edited while running'));
    const afterEdit = await catalog(server);
    expect(afterEdit.find(c => c.name === 'Consumer-Added')!.purpose).toBe('edited while running');
    expect(afterEdit).toHaveLength(countBefore + 1);
  });

  it('file watcher: a consumer component ADDED and then EDITED is reflected in get_component_catalog', async () => {
    // Gate effectively disabled so only the watcher can refresh the index.
    server = createTestableServer({ componentsDir: [fx.consumerRoot, fx.packageRoot], projectRoot: fx.base }, { stalenessThresholdMs: Number.MAX_SAFE_INTEGER });
    await server.initialize();
    const countBefore = (await catalog(server)).length;
    server.startWatching();
    await new Promise(r => setTimeout(r, 100)); // let fs.watch arm

    // ADD
    writeComponent(fx.consumerRoot, { dir: 'Watched-Added', name: 'Watched-Added', contracts: ['visual_watched'] });
    expect(await waitFor(async () => (await catalog(server)).some(c => c.name === 'Watched-Added'))).toBe(true);
    expect(await catalog(server)).toHaveLength(countBefore + 1);

    // EDIT
    writePurpose(path.join(fx.consumerRoot, 'Watched-Added'), 'watched edit');
    expect(await waitFor(async () => (await catalog(server)).find(c => c.name === 'Watched-Added')?.purpose === 'watched edit')).toBe(true);
    expect(await catalog(server)).toHaveLength(countBefore + 1);
  });
});
