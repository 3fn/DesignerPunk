/**
 * @jest-environment node
 * @category evergreen
 * @purpose `resolveComponentSources` (src/cli/shared/componentSources.ts) is the Application
 *   MCP's pass-1 rule, lifted out so `generate` reads the component universe the MCP serves
 *   (R1-7; ruling 2026-10-23 § 4). Until `ComponentIndexer` adopts the shared module, this
 *   parity test runs BOTH over the same fixtures and fails if they choose different winners —
 *   the drift the extraction exists to prevent ("two readers of the component universe").
 *   When the indexer adopts the module, the parity half of this file retires.
 */

import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { resolveComponentSources } from '../shared/componentSources';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { ComponentIndexer } = require(path.resolve(__dirname, '../../../application-mcp-server/src/indexer/ComponentIndexer'));

const REPO_ROOT = path.resolve(__dirname, '../../..');

function writeComponent(root: string, dir: string, opts: { name: string; contractsName?: string }): void {
  const d = path.join(root, dir);
  fs.mkdirSync(d, { recursive: true });
  fs.writeFileSync(path.join(d, `${dir}.schema.yaml`), `name: ${opts.name}\n`);
  if (opts.contractsName) fs.writeFileSync(path.join(d, 'contracts.yaml'), `version: "1.0.0"\ncomponent: ${opts.contractsName}\ncontracts: {}\n`);
}

/** The MCP's winners: declared name → winning directory, read from the indexer after pass 1. */
async function indexerWinners(roots: string[]): Promise<Map<string, string>> {
  const indexer = new ComponentIndexer();
  const empty = fs.mkdtempSync(path.join(os.tmpdir(), 'cs-empty-'));
  try {
    await indexer.indexComponents(roots, empty, empty, empty, empty, { projectRoot: empty });
  } finally {
    fs.rmSync(empty, { recursive: true, force: true });
  }
  const owners = (indexer as any).ownerByDeclaredName as Map<string, { dirPath: string }>;
  return new Map(Array.from(owners.entries()).map(([name, o]) => [name, o.dirPath]));
}

function sharedWinners(roots: string[]): Map<string, string> {
  return new Map(resolveComponentSources(roots).winners.map(w => [w.declaredName, w.dirPath]));
}

describe('resolveComponentSources — parity with ComponentIndexer pass 1', () => {
  let tmp: string;

  beforeEach(() => {
    tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'component-sources-'));
    jest.spyOn(console, 'error').mockImplementation(() => {});
    jest.spyOn(console, 'warn').mockImplementation(() => {});
    jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
    fs.rmSync(tmp, { recursive: true, force: true });
  });

  it('a consumer fork, a legacy core/ level, a contracts-declared name and a same-root duplicate', async () => {
    const consumer = path.join(tmp, 'consumer', 'src', 'components');
    const pkg = path.join(tmp, 'pkg', 'src', 'components', 'core');
    writeComponent(pkg, 'Button-CTA', { name: 'Button-CTA', contractsName: 'Button-CTA' });
    writeComponent(pkg, 'Avatar-Base', { name: 'Avatar-Base' });
    writeComponent(pkg, 'Chip-Base', { name: 'Chip-Base' });
    // Same root, same declared name: a duplicate (first wins, warned).
    writeComponent(pkg, 'Chip-Base-Copy', { name: 'Chip-Base' });
    // The consumer's fork: another directory name, the same CONTRACTS-declared name.
    writeComponent(consumer, 'MyCTA', { name: 'SomethingElse', contractsName: 'Button-CTA' });
    // A legacy pre-123 level under the consumer root.
    writeComponent(path.join(consumer, 'core'), 'Old-Card', { name: 'Old-Card' });
    writeComponent(consumer, 'Pricing-Card', { name: 'PricingCard' });

    const roots = [consumer, pkg];
    const shared = sharedWinners(roots);
    expect(shared).toEqual(await indexerWinners(roots));
    expect(shared.get('Button-CTA')).toBe(path.join(consumer, 'MyCTA'));
    expect(shared.get('Old-Card')).toBe(path.join(consumer, 'core', 'Old-Card'));
    expect(resolveComponentSources(roots).warnings.some(w => w.startsWith('Duplicate declared component name Chip-Base'))).toBe(true);
  });

  it('the steward repo: src/components/core as the only root', async () => {
    const roots = [path.join(REPO_ROOT, 'src', 'components', 'core')];
    const shared = sharedWinners(roots);
    expect(shared.size).toBeGreaterThan(0);
    expect(shared).toEqual(await indexerWinners(roots));
  });

  it('a born consumer over the real package root, forking one real component', async () => {
    const consumer = path.join(tmp, 'consumer', 'src', 'components');
    writeComponent(consumer, 'Avatar-Base', { name: 'Avatar-Base', contractsName: 'Avatar-Base' });
    const roots = [consumer, path.join(REPO_ROOT, 'src', 'components', 'core')];
    const shared = sharedWinners(roots);
    expect(shared).toEqual(await indexerWinners(roots));
    expect(shared.get('Avatar-Base')).toBe(path.join(consumer, 'Avatar-Base'));
  });
});
