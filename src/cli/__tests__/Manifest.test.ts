/**
 * @category evergreen
 * @purpose Spec 123 Task 5.2 — the root manifest: path, stable order, one entry
 * per line (re-serialize-equals-file), fields incl. posture/origin, legacy read
 * and conversion, pruning with its report (incl. the src/types clause), and the
 * legacy pointer.
 */

import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import {
  MANIFEST_FILE,
  LEGACY_MANIFEST_PATH,
  LEGACY_POINTER_TEXT,
  SRC_TYPES_PRUNE_CLAUSE,
  getManifestPath,
  loadManifest,
  loadLegacyManifest,
  parseManifest,
  serializeManifest,
  saveManifest,
  pruneDemanaged,
  pruneReportLines,
  prunedMessage,
  convertLegacyManifest,
  writeLegacyPointer,
  legacyHasPointer,
} from '../sync/Manifest';
import type { DesignerPunkManifest, LegacyManifest } from '../sync/Manifest';

function sample(): DesignerPunkManifest {
  return {
    version: '1',
    posture: 'born',
    installedVersion: '15.0.0',
    contractHash: '',
    attachedTargets: ['cc', 'kiro'],
    entries: {
      'governance/B.md': { hash: 'bb', grain: 'file', origin: 'copy' },
      '.mcp.json#designerpunk-docs': { hash: 'dd', grain: 'key', origin: 'emitted-key' },
      '.kiro/agents/a.json': { hash: 'aa', grain: 'file', origin: 'copy' },
      'designerpunk.config.ts': { hash: 'cc', grain: 'file', origin: 'generated' },
    },
  };
}

describe('Manifest — root path and format (Task 5.2)', () => {
  let tmp: string;
  beforeEach(() => {
    tmp = fs.realpathSync(fs.mkdtempSync(path.join(os.tmpdir(), 'dp-manifest-')));
  });
  afterEach(() => fs.rmSync(tmp, { recursive: true, force: true }));

  test('the manifest lives at the repo root, beside the config (DD21)', () => {
    expect(MANIFEST_FILE).toBe('designerpunk.manifest.json');
    expect(getManifestPath(tmp)).toBe(path.join(tmp, 'designerpunk.manifest.json'));
  });

  test('stable order: top-level keys in the design order; entries sorted; field order hash, grain, origin', () => {
    const text = serializeManifest(sample());
    const lines = text.split('\n');
    expect(lines.slice(1, 6).map((l) => l.trim().split('"')[1])).toEqual([
      'version',
      'posture',
      'installedVersion',
      'contractHash',
      'attachedTargets',
    ]);
    const entryLines = lines.filter((l) => l.startsWith('    "'));
    expect(entryLines).toHaveLength(4);
    const keys = entryLines.map((l) => JSON.parse(`{${l.trim().replace(/,$/, '')}}`));
    expect(keys.map((k) => Object.keys(k)[0])).toEqual([
      '.kiro/agents/a.json',
      '.mcp.json#designerpunk-docs',
      'designerpunk.config.ts',
      'governance/B.md',
    ]);
    for (const k of keys) expect(Object.keys(Object.values(k)[0] as object)).toEqual(['hash', 'grain', 'origin']);
  });

  test('ONE ENTRY PER LINE — every entry is exactly one line', () => {
    const text = serializeManifest(sample());
    const entryLines = text.split('\n').filter((l) => /^ {4}"/.test(l));
    expect(entryLines).toHaveLength(Object.keys(sample().entries).length);
    for (const l of entryLines) expect(l).toMatch(/"hash":.*"grain":.*"origin":/);
  });

  test('re-serialize equals file (and insertion order of input does not matter)', () => {
    const text = serializeManifest(sample());
    expect(serializeManifest(parseManifest(text))).toBe(text);
    const shuffled = sample();
    shuffled.entries = Object.fromEntries(Object.entries(shuffled.entries).reverse());
    expect(serializeManifest(shuffled)).toBe(text);
  });

  test('empty entries serialize to "{}" and still round-trip', () => {
    const m = { ...sample(), entries: {} };
    const text = serializeManifest(m);
    expect(text).toContain('"entries": {}');
    expect(serializeManifest(parseManifest(text))).toBe(text);
  });

  test('fields: posture and origin survive a save/load round trip', () => {
    saveManifest(tmp, sample());
    const loaded = loadManifest(tmp);
    expect(loaded.kind).toBe('ok');
    if (loaded.kind !== 'ok') return;
    expect(loaded.manifest.posture).toBe('born');
    expect(loaded.manifest.entries['.kiro/agents/a.json'].origin).toBe('copy');
    expect(loaded.manifest.entries['.mcp.json#designerpunk-docs']).toEqual({ hash: 'dd', grain: 'key', origin: 'emitted-key' });
  });

  test('saveManifest does not write when the bytes would be identical', () => {
    expect(saveManifest(tmp, sample())).toBe(true);
    const before = fs.statSync(getManifestPath(tmp)).mtimeMs;
    expect(saveManifest(tmp, sample())).toBe(false);
    expect(fs.statSync(getManifestPath(tmp)).mtimeMs).toBe(before);
  });

  test('a corrupt manifest is reported as corrupt — never treated as first sync', () => {
    fs.writeFileSync(getManifestPath(tmp), '{ not json', 'utf-8');
    expect(loadManifest(tmp).kind).toBe('corrupt');
  });
});

describe('Manifest — pruning (D-B6) and its report', () => {
  test('entries under de-managed paths are pruned into one group per root', () => {
    const entries = {
      'src/tokens/a.ts': { hash: '1', grain: 'file' as const, origin: 'copy' as const },
      'src/tokens/b/c.ts': { hash: '2', grain: 'file' as const, origin: 'copy' as const },
      'src/types/PrimitiveToken.ts': { hash: '3', grain: 'file' as const, origin: 'copy' as const },
      'src/components/core/X/x.ts': { hash: '4', grain: 'file' as const, origin: 'copy' as const },
      'governance/Keep.md': { hash: '5', grain: 'file' as const, origin: 'copy' as const },
      'src/tokensish/NotUnder.ts': { hash: '6', grain: 'file' as const, origin: 'copy' as const },
    };
    const groups = pruneDemanaged(entries);
    expect(groups).toEqual([
      { root: 'src/tokens', count: 2 },
      { root: 'src/types', count: 1 },
      { root: 'src/components/core', count: 1 },
    ]);
    expect(Object.keys(entries).sort()).toEqual(['governance/Keep.md', 'src/tokensish/NotUnder.ts']);
  });

  test('one report line per pruned group; the src/types line states the files remain required (Ada D-T-A5)', () => {
    const lines = pruneReportLines([
      { root: 'src/tokens', count: 59 },
      { root: 'src/types', count: 7 },
    ]);
    expect(lines).toHaveLength(2);
    expect(lines[0]).toBe(prunedMessage(59, 'src/tokens'));
    expect(lines[0]).not.toContain(SRC_TYPES_PRUNE_CLAUSE);
    expect(lines[1]).toBe(`${prunedMessage(7, 'src/types')}${SRC_TYPES_PRUNE_CLAUSE}`);
    expect(lines[1]).toMatch(/relative \.\.\/types/);
    expect(lines[1]).toMatch(/breaks generate/);
  });
});

describe('Manifest — the legacy path, read and relocated (C7 Migration step 1)', () => {
  let tmp: string;
  beforeEach(() => {
    tmp = fs.realpathSync(fs.mkdtempSync(path.join(os.tmpdir(), 'dp-manifest-legacy-')));
  });
  afterEach(() => fs.rmSync(tmp, { recursive: true, force: true }));

  const legacy: LegacyManifest = {
    version: '12.0.3',
    syncedAt: '2026-06-11T02:46:38.045Z',
    files: {
      '.kiro/steering/Doc.md': { hash: 's1', managed: true },
      '.kiro/agents/lina.json': { hash: 'a1', managed: true },
      'src/tokens/Color.ts': { hash: 't1', managed: false },
      'src/types/PrimitiveToken.ts': { hash: 'y1', managed: false },
      'src/components/core/Icon-Base/index.ts': { hash: 'c1', managed: false },
    },
  };

  test('reads the legacy manifest from .kiro/sync-manifest.json', () => {
    fs.mkdirSync(path.join(tmp, '.kiro'), { recursive: true });
    fs.writeFileSync(path.join(tmp, LEGACY_MANIFEST_PATH), JSON.stringify(legacy), 'utf-8');
    expect(loadLegacyManifest(tmp)).toEqual(legacy);
  });

  test('conversion: copy roots → origin copy (file grain); de-managed → pruned; attachedTargets empty; legacy version NOT carried', () => {
    const { manifest, pruned } = convertLegacyManifest(legacy, '15.0.0');
    expect(manifest.entries).toEqual({
      '.kiro/steering/Doc.md': { hash: 's1', grain: 'file', origin: 'copy' },
      '.kiro/agents/lina.json': { hash: 'a1', grain: 'file', origin: 'copy' },
    });
    expect(pruned).toEqual([
      { root: 'src/tokens', count: 1 },
      { root: 'src/types', count: 1 },
      { root: 'src/components/core', count: 1 },
    ]);
    expect(manifest.attachedTargets).toEqual([]);
    expect(manifest.posture).toBe('born');
    expect(manifest.installedVersion).toBe('15.0.0');
    expect(JSON.stringify(manifest)).not.toContain('12.0.3');
  });

  test('the legacy file keeps its content and gains a one-line pointer; idempotent', () => {
    fs.mkdirSync(path.join(tmp, '.kiro'), { recursive: true });
    fs.writeFileSync(path.join(tmp, LEGACY_MANIFEST_PATH), JSON.stringify(legacy), 'utf-8');
    expect(writeLegacyPointer(tmp)).toBe(true);
    const after = JSON.parse(fs.readFileSync(path.join(tmp, LEGACY_MANIFEST_PATH), 'utf-8'));
    expect(Object.keys(after)[0]).toBe('//');
    expect(after['//']).toBe(LEGACY_POINTER_TEXT);
    expect(after.files).toEqual(legacy.files);
    expect(legacyHasPointer(tmp)).toBe(true);
    expect(writeLegacyPointer(tmp)).toBe(false);
  });
});
