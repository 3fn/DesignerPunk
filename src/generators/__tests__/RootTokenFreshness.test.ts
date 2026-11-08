/**
 * @category evergreen
 * @purpose Row (g) of `.kiro/issues/2026-10-01-in-repo-generate-output-contaminates-package-dist.md`
 *          (Spec 129 Task 14.3, Req 9.4): the repository's root token files equal a fresh generation
 *          from the base config. The build writes `dist/` (the eight root token files every release
 *          ships, `ROOT_TOKEN_FILES` in `scripts/pack-assert.ts`) and the committed `token-index/`;
 *          `themes: []` in the build tree's config was the proxy for "the base config produces
 *          them". This test generates into a temporary directory by the build's own script
 *          (`scripts/generate-platform-tokens.ts --out`) and compares byte for byte. The committed
 *          `token-index/` is always compared; the `dist/` files are compared when the build has run
 *          (the CI lanes that run this suite run `npm run build` first), and the test says so when it
 *          has not.
 */
import { spawnSync } from 'child_process';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';

const ROOT = path.resolve(__dirname, '..', '..', '..');
/** The eight root token files (`ROOT_TOKEN_FILES` in `scripts/pack-assert.ts`, which a test below reads to keep this list honest). */
const ROOT_TOKEN_FILES = [
  'dist/ComponentTokens.android.kt',
  'dist/ComponentTokens.ios.swift',
  'dist/ComponentTokens.web.css',
  'dist/DesignTokens.android.kt',
  'dist/DesignTokens.dtcg.json',
  'dist/DesignTokens.figma.json',
  'dist/DesignTokens.ios.swift',
  'dist/DesignTokens.web.css',
];
const INDEX_FILES = ['components.yaml', 'primitives.yaml', 'semantics.yaml'];

const verdict = (generated: string, onDisk: string, remedy: string): string => (generated === onDisk ? 'equal' : `differs: ${remedy}`);

describe('the repository\'s root token files equal a fresh generation from the base config (row (g))', () => {
  let fresh: string;
  beforeAll(() => {
    fresh = fs.mkdtempSync(path.join(os.tmpdir(), 'dp-root-fresh-'));
    const r = spawnSync('npx', ['tsx', 'scripts/generate-platform-tokens.ts', '--out', fresh], { cwd: ROOT, encoding: 'utf-8', timeout: 240_000 });
    if (r.status !== 0) throw new Error(`generate-platform-tokens --out failed:\n${r.stdout}\n${r.stderr}`);
  }, 300_000);
  afterAll(() => {
    if (fresh) fs.rmSync(fresh, { recursive: true, force: true });
  });

  it('the base config registers no theme (the proxy this test makes unnecessary, kept as a tripwire)', () => {
    const config = fs.readFileSync(path.join(ROOT, 'designerpunk.config.ts'), 'utf-8');
    expect(config).toMatch(/themes:\s*\[\s*\]/);
  });

  it('the list above is pack-assert\'s ROOT_TOKEN_FILES', () => {
    const source = fs.readFileSync(path.join(ROOT, 'scripts', 'pack-assert.ts'), 'utf-8');
    const block = /export const ROOT_TOKEN_FILES = \[([\s\S]*?)\];/.exec(source)![1];
    expect([...block.matchAll(/'([^']+)'/g)].map(m => m[1])).toEqual(ROOT_TOKEN_FILES);
  });

  it('writes all eight root token files, and the token index', () => {
    for (const f of ROOT_TOKEN_FILES) expect(fs.existsSync(path.join(fresh, path.basename(f)))).toBe(true);
    for (const f of INDEX_FILES) expect(fs.existsSync(path.join(fresh, 'token-index', f))).toBe(true);
  });

  it.each(INDEX_FILES)('the committed token-index/%s equals the fresh generation', (f) => {
    const committed = fs.readFileSync(path.join(ROOT, 'token-index', f), 'utf-8');
    const generated = fs.readFileSync(path.join(fresh, 'token-index', f), 'utf-8');
    expect(verdict(generated, committed, `regenerate with \`npm run generate:platform-tokens\` and commit token-index/${f}`)).toBe('equal');
  });

  const built = ROOT_TOKEN_FILES.every(f => fs.existsSync(path.join(ROOT, f)));
  (built ? it.each(ROOT_TOKEN_FILES) : it.skip.each(ROOT_TOKEN_FILES))('dist root token file %s equals the fresh generation (needs `npm run build`)', (f) => {
    const built = fs.readFileSync(path.join(ROOT, f), 'utf-8');
    const generated = fs.readFileSync(path.join(fresh, path.basename(f)), 'utf-8');
    expect(verdict(generated, built, 'run `npm run build`')).toBe('equal');
  });

  it('bites: a one-byte change to a root token file is not "equal"', () => {
    const generated = fs.readFileSync(path.join(fresh, 'DesignTokens.web.css'), 'utf-8');
    expect(verdict(generated, generated, 'x')).toBe('equal');
    expect(verdict(generated, generated.replace('--space-100: 8px;', '--space-100: 9px;'), 'x')).toMatch(/^differs/);
  });
});
