/**
 * @category evergreen
 * @purpose A consumer component root named by COMPONENTS_DIR that does not exist is reported, by
 *          name, path and remedy, in health, in the boot log and in the per-component answers —
 *          never a silent "healthy" over the package's components alone.
 *
 * Record: .kiro/issues/2026-10-24-application-mcp-healthy-with-missing-component-root.md
 * (items 1, 2, 4 and 5). Item 3 (the dev-fallback constant) is in `index.ts`'s bootstrap,
 * which runs only as the entry point; its reasoning is in the constant's comment.
 *
 * Every server-level call goes through `createTestableServer().callTool(...)`, the dispatch path
 * of the live MCP handler. Fixture: a consumer install (package root under
 * `node_modules/@3fn/core/src/components/core`, consumer root at `src/components`, holding a
 * fork of `Widget-Primary`).
 */

import * as fs from 'fs';
import * as path from 'path';
import { ComponentIndexer, missingEnvRootWarning } from '../indexer/ComponentIndexer';
import { createTestableServer, componentsEnvVarName } from '../index';
import { buildConsumerFixture, ConsumerFixture } from '../indexer/__tests__/fixtures/consumerFixture';

interface Answer { data: { description?: string; name?: string } | null; error: string | null; warnings: string[] }
interface Health { status: string; warnings: string[] }

describe('application MCP — missing env component root (2026-10-24 record)', () => {
  let fx: ConsumerFixture;
  let missingRoot: string;

  beforeEach(() => {
    fx = buildConsumerFixture('dp-missing-env-root-');
    // The migrated config's shape: COMPONENTS_DIR still names the pre-123 `core/` folder that
    // `sync --migrate-components` removed.
    missingRoot = path.join(fx.base, 'src', 'components', 'core');
  });

  afterEach(() => {
    fs.rmSync(fx.base, { recursive: true, force: true });
  });

  // Item 1 + 4 ---------------------------------------------------------------
  it('a missing env root with an existing package root gives degraded and the warning, naming the variable, the path and the remedy', async () => {
    const indexer = new ComponentIndexer();
    await indexer.indexComponents([missingRoot, fx.packageRoot], undefined, undefined, undefined, undefined, {
      projectRoot: fx.base, rootSources: ['env', 'package'], envVarName: 'COMPONENTS_DIR',
    });
    const expected =
      `COMPONENTS_DIR points at ${missingRoot}, which does not exist, so your own components are not indexed; ` +
      `only DesignerPunk's are. Point it at src/components (the default), or remove it.`;
    const health = indexer.getHealth();
    expect(health.status).toBe('degraded');
    expect(health.warnings).toContain(expected);
    expect(indexer.getRootWarnings()).toEqual([expected]);
    // The package's components are still served — the warning is what tells the reader they are all it has.
    expect(indexer.getComponent('Widget-Primary')?.description).toBe('PACKAGE');
  });

  it('names COMPONENT_DIR when that is the variable that set the root', async () => {
    const indexer = new ComponentIndexer();
    await indexer.indexComponents([missingRoot, fx.packageRoot], undefined, undefined, undefined, undefined, {
      projectRoot: fx.base, rootSources: ['env', 'package'], envVarName: 'COMPONENT_DIR',
    });
    expect(indexer.getRootWarnings()).toEqual([missingEnvRootWarning('COMPONENT_DIR', missingRoot, true)]);
    expect(indexer.getRootWarnings()[0].startsWith('COMPONENT_DIR points at ')).toBe(true);
  });

  it('an existing env root is unchanged: healthy, no root warning, the fork wins', async () => {
    const indexer = new ComponentIndexer();
    await indexer.indexComponents([fx.consumerRoot, fx.packageRoot], undefined, undefined, undefined, undefined, {
      projectRoot: fx.base, rootSources: ['env', 'package'], envVarName: 'COMPONENTS_DIR',
    });
    expect(indexer.getHealth().status).toBe('healthy');
    expect(indexer.getHealth().warnings).toEqual([]);
    expect(indexer.getRootWarnings()).toEqual([]);
    expect(indexer.getComponent('Widget-Primary')?.description).toBe('FORK');
  });

  it('a missing DEFAULT root (a born repo with no src/components/) is not a warning', async () => {
    fs.rmSync(fx.consumerRoot, { recursive: true, force: true });
    const indexer = new ComponentIndexer();
    await indexer.indexComponents([fx.consumerRoot, fx.packageRoot], undefined, undefined, undefined, undefined, {
      projectRoot: fx.base, rootSources: ['cwd', 'package'],
    });
    expect(indexer.getHealth().status).toBe('healthy');
    expect(indexer.getHealth().warnings).toEqual([]);
    expect(indexer.getRootWarnings()).toEqual([]);
  });

  it('with every root missing, health is failed and the env warning drops the "only DesignerPunk\'s are" clause, which would be false', async () => {
    const missingPackage = path.join(fx.base, 'nowhere', 'core');
    const indexer = new ComponentIndexer();
    await indexer.indexComponents([missingRoot, missingPackage], undefined, undefined, undefined, undefined, {
      projectRoot: fx.base, rootSources: ['env', 'package'],
    });
    const health = indexer.getHealth();
    expect(health.status).toBe('failed');
    expect(health.warnings).toEqual([
      `COMPONENTS_DIR points at ${missingRoot}, which does not exist, so your own components are not indexed. Point it at src/components (the default), or remove it.`,
      `Components directory not found: ${missingPackage}`,
    ]);
  });

  it('a later full index over a now-existing root clears the warning (it is recomputed, never sticky)', async () => {
    const indexer = new ComponentIndexer();
    const opts = { projectRoot: fx.base, rootSources: ['env', 'package'] };
    await indexer.indexComponents([missingRoot, fx.packageRoot], undefined, undefined, undefined, undefined, opts);
    expect(indexer.getRootWarnings()).toHaveLength(1);
    fs.mkdirSync(missingRoot, { recursive: true });
    await indexer.indexComponents([missingRoot, fx.packageRoot], undefined, undefined, undefined, undefined, opts);
    expect(indexer.getRootWarnings()).toEqual([]);
    expect(indexer.getHealth().status).toBe('healthy');
  });

  // Items 2 + 5, on the server --------------------------------------------------
  describe('on the server', () => {
    let errorSpy: jest.SpyInstance;
    beforeEach(() => { errorSpy = jest.spyOn(console, 'error').mockImplementation(() => undefined); });
    afterEach(() => { errorSpy.mockRestore(); });

    async function serverOver(consumerRoot: string) {
      const server = createTestableServer(
        {
          componentsDir: [consumerRoot, fx.packageRoot],
          componentRootSources: ['env', 'package'],
          componentsEnvVar: 'COMPONENTS_DIR',
          projectRoot: fx.base,
        },
        { stalenessThresholdMs: 60_000 },
      );
      await server.initialize();
      return server;
    }

    it('get_component_health is degraded, and get_component_full / get_component_summary carry the same warning, found or not found', async () => {
      const server = await serverOver(missingRoot);
      const expected = missingEnvRootWarning('COMPONENTS_DIR', missingRoot, true);

      const health = (await server.callTool('get_component_health', {})) as Health;
      expect(health.status).toBe('degraded');
      expect(health.warnings).toContain(expected);

      // The forked name answers with the package's component — and now says why.
      const full = (await server.callTool('get_component_full', { name: 'Widget-Primary' })) as Answer;
      expect(full.data?.description).toBe('PACKAGE');
      expect(full.warnings[0]).toBe(expected);

      const summary = (await server.callTool('get_component_summary', { name: 'Widget-Primary' })) as Answer;
      expect(summary.data?.name).toBe('Widget-Primary');
      expect(summary.warnings).toEqual([expected]);

      // A consumer-only name is "not found" — and says why.
      const fullMissing = (await server.callTool('get_component_full', { name: 'Card-Consumer' })) as Answer;
      expect(fullMissing.data).toBeNull();
      expect(fullMissing.warnings).toEqual([expected]);
      const summaryMissing = (await server.callTool('get_component_summary', { name: 'Card-Consumer' })) as Answer;
      expect(summaryMissing.data).toBeNull();
      expect(summaryMissing.warnings).toEqual([expected]);
    });

    it('the boot log prints the same line', async () => {
      const server = await serverOver(missingRoot);
      errorSpy.mockClear();
      server.logIndexSummary();
      const lines = errorSpy.mock.calls.map(c => String(c[0]));
      expect(lines).toContain(`[mcp-component-server] WARNING: ${missingEnvRootWarning('COMPONENTS_DIR', missingRoot, true)}`);
    });

    it('with an existing env root nothing is added: healthy, no root warning in the answers or the boot log', async () => {
      const server = await serverOver(fx.consumerRoot);
      expect(((await server.callTool('get_component_health', {})) as Health).status).toBe('healthy');
      const full = (await server.callTool('get_component_full', { name: 'Widget-Primary' })) as Answer;
      expect(full.data?.description).toBe('FORK');
      expect(full.warnings).toEqual([]);
      const summary = (await server.callTool('get_component_summary', { name: 'Widget-Primary' })) as Answer;
      expect(summary.warnings).toEqual([]);
      errorSpy.mockClear();
      server.logIndexSummary();
      expect(errorSpy.mock.calls.map(c => String(c[0])).filter(l => l.includes('WARNING'))).toEqual([]);
    });
  });

  it('componentsEnvVarName reads COMPONENTS_DIR first, then COMPONENT_DIR', () => {
    expect(componentsEnvVarName({ COMPONENTS_DIR: 'a', COMPONENT_DIR: 'b' })).toBe('COMPONENTS_DIR');
    expect(componentsEnvVarName({ COMPONENT_DIR: 'b' })).toBe('COMPONENT_DIR');
    expect(componentsEnvVarName({})).toBeUndefined();
    expect(componentsEnvVarName({ COMPONENTS_DIR: '' })).toBeUndefined();
  });
});
