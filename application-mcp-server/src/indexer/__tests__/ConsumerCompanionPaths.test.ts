/**
 * In a consumer, family-guidance companion paths resolve against the installed package, not the
 * consumer's project root (.kiro/issues/2026-10-03-app-mcp-degraded-companion-paths-in-consumer.md).
 *
 * Before the 2026-10-14 fix, `validateCrossReferences` resolved `companion:` paths
 * (`governance/Component-Family-*.md`) against `projectRoot`. In a consumer that is the consumer's
 * own directory, which has no `governance/`, so health read `degraded` with one warning per family
 * although the package ships every doc. This indexes the REAL package data (components, patterns,
 * templates, guidance) with a consumer-shaped `projectRoot`: a temp dir with no `governance/`.
 *
 * Bite: pass only `projectRoot` to `validateCrossReferences` (ComponentIndexer.ts) and the first
 * case goes red with nine "companion path not found" warnings.
 */

import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { ComponentIndexer } from '../ComponentIndexer';

const REPO_ROOT = path.resolve(__dirname, '../../../..');

describe('family-guidance companion paths in a consumer-shaped project root', () => {
  let consumerRoot: string;
  let indexer: ComponentIndexer;

  beforeAll(async () => {
    consumerRoot = fs.realpathSync(fs.mkdtempSync(path.join(os.tmpdir(), 'dp-companion-consumer-')));
    expect(fs.existsSync(path.join(consumerRoot, 'governance'))).toBe(false); // the consumer condition
    indexer = new ComponentIndexer();
    await indexer.indexComponents(
      path.join(REPO_ROOT, 'src', 'components', 'core'),
      path.join(REPO_ROOT, 'experience-patterns'),
      path.join(REPO_ROOT, 'layout-templates'),
      path.join(REPO_ROOT, 'family-guidance'),
      undefined,
      { projectRoot: consumerRoot },
    );
  });

  afterAll(() => fs.rmSync(consumerRoot, { recursive: true, force: true }));

  it('reports no companion-path warnings, and health is healthy', () => {
    const health = indexer.getHealth();
    expect(health.warnings.filter((w) => w.includes('companion path not found'))).toEqual([]);
    expect(health.status).toBe('healthy');
  });

  it('every declared companion still exists in the package data (the check is not vacuous)', () => {
    const companions = fs
      .readdirSync(path.join(REPO_ROOT, 'family-guidance'))
      .filter((f) => f.endsWith('.yaml'))
      .map((f) => /^companion:\s*["']?([^"'\n]+)["']?/m.exec(fs.readFileSync(path.join(REPO_ROOT, 'family-guidance', f), 'utf-8'))?.[1])
      .filter((c): c is string => Boolean(c));
    expect(companions.length).toBeGreaterThanOrEqual(9);
    for (const c of companions) expect({ c, exists: fs.existsSync(path.join(REPO_ROOT, c)) }).toEqual({ c, exists: true });
  });
});
