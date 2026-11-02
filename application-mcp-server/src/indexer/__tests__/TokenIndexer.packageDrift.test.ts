/**
 * TokenIndexer.packageDrift.test.ts — the consumer index's package-tagged component tokens are
 * compared, by content, with the installed package's token-index/components.yaml.
 *
 * Record: .kiro/issues/2026-10-25-application-mcp-stale-package-token-version-warning.md
 * (comparand: Ada's read of 2026-10-30 — compare the fields `generate` merges, never version strings).
 */
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import * as yaml from 'js-yaml';
import { TokenIndexer, packageComponentTokenDrift, type TokenIndexEntry } from '../TokenIndexer';

const shippedEntry = {
  component: 'Avatar',
  definedBy: 'Avatar-Base',
  primitiveReferences: { value: 'size300' },
  platforms: { web: '--avatar-size-xs', ios: 'AvatarTokens.sizeXs', android: 'AvatarTokens.sizeXs' },
  consumers: ['Avatar-Base'],
};

function tmp(): string {
  return fs.mkdtempSync(path.join(os.tmpdir(), 'pkg-drift-'));
}
function writeIndex(dir: string, tokens: Record<string, unknown>): void {
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'components.yaml'), yaml.dump({ tokens }));
}
const consumerEntry = (over: Record<string, unknown> = {}): TokenIndexEntry =>
  ({ name: 'avatar.size.xs', tier: 'component', ...shippedEntry, consumers: ['My-Fork'], source: { package: '@3fn/core', version: '16.1.0' }, ...over }) as TokenIndexEntry;

describe('packageComponentTokenDrift', () => {
  it('content equal, version tag older: no warning (a version string is not a difference)', () => {
    const pkg = tmp();
    writeIndex(pkg, { 'avatar.size.xs': shippedEntry });
    expect(packageComponentTokenDrift([consumerEntry()], pkg)).toBeNull();
  });

  it('a merged field differs: one warning naming the entry and the tagged version', () => {
    const pkg = tmp();
    writeIndex(pkg, { 'avatar.size.xs': { ...shippedEntry, primitiveReferences: { value: 'size400' } } });
    expect(packageComponentTokenDrift([consumerEntry()], pkg)).toBe(
      "token-index/components.yaml: 1 component token entry differs from the installed package's (tagged from @3fn/core 16.1.0): avatar.size.xs. Run `npx designerpunk generate`."
    );
  });

  it('the installed package no longer has the entry: it differs', () => {
    const pkg = tmp();
    writeIndex(pkg, {});
    expect(packageComponentTokenDrift([consumerEntry()], pkg)).toContain('1 component token entry differs');
  });

  it('consumers and source are not compared', () => {
    const pkg = tmp();
    writeIndex(pkg, { 'avatar.size.xs': { ...shippedEntry, consumers: ['Something-Else'] } });
    expect(packageComponentTokenDrift([consumerEntry({ source: { package: '@3fn/core', version: '0.0.1' } })], pkg)).toBeNull();
  });

  it('untagged entries are never read: no warning, and the shipped file is not needed', () => {
    const untagged = { ...consumerEntry(), source: undefined } as TokenIndexEntry;
    expect(packageComponentTokenDrift([untagged], path.join(os.tmpdir(), 'does-not-exist-pkg-drift'))).toBeNull();
  });

  it('a damaged install (no shipped index) says it cannot check, and does not throw', () => {
    const pkg = path.join(tmp(), 'token-index');
    const line = packageComponentTokenDrift([consumerEntry()], pkg);
    expect(line).toMatch(/^Cannot check this index's package component tokens: the installed package has no .*components\.yaml\.$/);
  });

  it('two tagged versions and many entries: one line, versions listed, names capped at five', () => {
    const pkg = tmp();
    writeIndex(pkg, {});
    const entries = Array.from({ length: 7 }, (_, i) =>
      consumerEntry({ name: `t.${i}`, source: { package: '@3fn/core', version: i % 2 ? '16.0.0' : '16.1.0' } })
    );
    expect(packageComponentTokenDrift(entries, pkg)).toBe(
      "token-index/components.yaml: 7 component token entries differ from the installed package's (tagged from @3fn/core 16.0.0, 16.1.0): t.0, t.1, t.2, t.3, t.4, and 2 more. Run `npx designerpunk generate`."
    );
  });
});

describe('TokenIndexer.indexTokens with a package token index', () => {
  it('a differing tagged entry becomes a health warning; the same directory is never compared with itself', async () => {
    const root = tmp();
    const consumerDir = path.join(root, 'consumer', 'token-index');
    const pkgDir = path.join(root, 'pkg', 'token-index');
    const { name: _n, tier: _t, ...consumerYaml } = consumerEntry() as unknown as Record<string, unknown>;
    writeIndex(consumerDir, { 'avatar.size.xs': consumerYaml });
    writeIndex(pkgDir, { 'avatar.size.xs': { ...shippedEntry, platforms: { ...shippedEntry.platforms, web: '--avatar-size-x-small' } } });

    const indexer = new TokenIndexer();
    await indexer.indexTokens(consumerDir, root, undefined, pkgDir);
    expect(indexer.getWarnings().filter((w) => w.includes('component token entr'))).toHaveLength(1);

    const self = new TokenIndexer();
    await self.indexTokens(consumerDir, root, undefined, consumerDir);
    expect(self.getWarnings().filter((w) => w.includes('component token entr') || w.startsWith('Cannot check'))).toEqual([]);

    const none = new TokenIndexer();
    await none.indexTokens(consumerDir, root);
    expect(none.getWarnings().filter((w) => w.includes('component token entr') || w.startsWith('Cannot check'))).toEqual([]);
  });
});
