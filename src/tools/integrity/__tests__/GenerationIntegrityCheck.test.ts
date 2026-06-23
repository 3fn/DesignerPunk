import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { GenerationIntegrityCheckImpl } from '../GenerationIntegrityCheck';
import { ArtifactRef, FreshGenerator, IntentionalDivergenceManifest } from '../types';
import { EMPTY_MANIFEST } from '../manifest';

function makeFresh(
  files: Record<string, string | null>,
  opts?: Partial<Pick<FreshGenerator, 'generatedVia' | 'provisional'>>,
): FreshGenerator {
  return {
    generatedVia: opts?.generatedVia ?? 'ts-node-workaround',
    provisional: opts?.provisional ?? true,
    read: (p) => (p in files ? files[p] : null),
  };
}

describe('GenerationIntegrityCheckImpl', () => {
  let root: string;

  beforeEach(() => {
    root = fs.mkdtempSync(path.join(os.tmpdir(), 'integrity-'));
  });

  afterEach(() => {
    fs.rmSync(root, { recursive: true, force: true });
  });

  function writeCommitted(rel: string, content: string): void {
    const full = path.join(root, rel);
    fs.mkdirSync(path.dirname(full), { recursive: true });
    fs.writeFileSync(full, content);
  }

  const ref = (p: string, kind: ArtifactRef['kind'], optional = false): ArtifactRef => ({ path: p, kind, optional });

  it('reports allEqual when committed and fresh are semantically equal, and flows provisional/generatedVia through', () => {
    writeCommitted('token-index/primitives.yaml', 'tokens:\n  space100:\n    value: 8\n');
    const fresh = makeFresh({ 'token-index/primitives.yaml': 'tokens:\n  space100:\n    value: 8\n' });
    const result = new GenerationIntegrityCheckImpl(fresh, root).run({
      inventory: [ref('token-index/primitives.yaml', 'yaml')],
      manifest: EMPTY_MANIFEST,
    });
    expect(result.allEqual).toBe(true);
    expect(result.diffs[0].status).toBe('equal');
    expect(result.provisional).toBe(true);
    expect(result.generatedVia).toBe('ts-node-workaround');
  });

  it('reports diverged when a value changes', () => {
    writeCommitted('token-index/primitives.yaml', 'tokens:\n  space100:\n    value: 8\n');
    const fresh = makeFresh({ 'token-index/primitives.yaml': 'tokens:\n  space100:\n    value: 9\n' });
    const result = new GenerationIntegrityCheckImpl(fresh, root).run({
      inventory: [ref('token-index/primitives.yaml', 'yaml')],
      manifest: EMPTY_MANIFEST,
    });
    expect(result.allEqual).toBe(false);
    expect(result.diffs[0].status).toBe('diverged');
    expect(result.diffs[0].divergences[0].locator).toBe('tokens.space100.value');
  });

  it('surfaces an emptied components.yaml as a component-presence divergence (the R4 drift)', () => {
    writeCommitted('token-index/components.yaml', 'tokens:\n  buttonicon.size.small:\n    component: ButtonIcon\n');
    const fresh = makeFresh({ 'token-index/components.yaml': 'tokens: {}\n' });
    const result = new GenerationIntegrityCheckImpl(fresh, root).run({
      inventory: [ref('token-index/components.yaml', 'yaml')],
      manifest: EMPTY_MANIFEST,
    });
    expect(result.allEqual).toBe(false);
    const div = result.diffs[0].divergences[0];
    expect(div.dimension).toBe('component-presence');
    expect(div.freshValue).toBeUndefined();
  });

  it('treats an allowlisted divergence as equal-enough but still records it as diverged', () => {
    writeCommitted('token-index/primitives.yaml', 'tokens:\n  space100:\n    value: 8\n');
    const fresh = makeFresh({ 'token-index/primitives.yaml': 'tokens:\n  space100:\n    value: 9\n' });
    const manifest: IntentionalDivergenceManifest = {
      version: '1.0.0',
      entries: [
        {
          matcher: 'token-index/primitives.yaml#tokens.space100.value',
          reason: 'test fixture',
          approvedBy: 'test',
          date: '2026-06-13',
        },
      ],
    };
    const result = new GenerationIntegrityCheckImpl(fresh, root).run({
      inventory: [ref('token-index/primitives.yaml', 'yaml')],
      manifest,
    });
    expect(result.allEqual).toBe(true);
    expect(result.diffs[0].status).toBe('diverged');
  });

  it('flags a missing-fresh artifact', () => {
    writeCommitted('dist/DesignTokens.web.css', ':root { --x: 1; }\n');
    const fresh = makeFresh({ 'dist/DesignTokens.web.css': null });
    const result = new GenerationIntegrityCheckImpl(fresh, root).run({
      inventory: [ref('dist/DesignTokens.web.css', 'css')],
      manifest: EMPTY_MANIFEST,
    });
    expect(result.diffs[0].status).toBe('missing-fresh');
    expect(result.allEqual).toBe(false);
  });

  it('fails loudly on a non-ENOENT read error instead of masking it as drift', () => {
    // A directory at the artifact path triggers EISDIR on read — a real I/O error
    // that must propagate, not be swallowed into a missing/divergence result.
    const rel = 'token-index/primitives.yaml';
    fs.mkdirSync(path.join(root, rel), { recursive: true });
    const fresh = makeFresh({ [rel]: 'tokens: {}\n' });
    expect(() =>
      new GenerationIntegrityCheckImpl(fresh, root).run({
        inventory: [ref(rel, 'yaml')],
        manifest: EMPTY_MANIFEST,
      }),
    ).toThrow();
  });

  it('treats an unconfigured optional artifact (absent on both sides) as equal', () => {
    const fresh = makeFresh({ 'dist/product/ProductTokens.web.css': null });
    const result = new GenerationIntegrityCheckImpl(fresh, root).run({
      inventory: [ref('dist/product/ProductTokens.web.css', 'css', true)],
      manifest: EMPTY_MANIFEST,
    });
    expect(result.diffs[0].status).toBe('equal');
    expect(result.allEqual).toBe(true);
  });
});
