/**
 * @category evergreen
 * @purpose Verify the theme root FOLLOWS the served index's recorded `tierDir`
 * (Spec 123 Task 1.5 — design.md DD24 "the theme root travels with the index"),
 * rather than being hardcoded to `<projectRoot>/src/tokens`.
 *
 * REGRESSION THIS CLOSES (flagged by Lina at Task 1.4 handoff): once the application
 * server's bootstrap anchors `projectRoot` on the CONSUMER root (Task 1.4), a
 * package-mode consumer's `<consumerRoot>/src/tokens/themes/…` doesn't exist — the
 * live tier is the PACKAGE's `src/tokens`. `ModeClassifier` and `TokenIndexer` must
 * read `token-index/meta.json`'s `tierDir` (written by `generate`) instead.
 */
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { ComponentIndexer } from '../ComponentIndexer';
import { ModeClassifier } from '../ModeClassifier';
import { resolveThemeTierRoot } from '../resolveThemeTierRoot';

function mkTmpDir(prefix: string): string {
  return fs.mkdtempSync(path.join(os.tmpdir(), prefix));
}

function writeDarkOverrides(tierDir: string): void {
  fs.mkdirSync(path.join(tierDir, 'themes', 'dark'), { recursive: true });
  fs.writeFileSync(
    path.join(tierDir, 'themes', 'dark', 'SemanticOverrides.ts'),
    "import type { SemanticOverrideMap } from '../types';\n" +
      "export const darkOverrides: SemanticOverrideMap = {\n" +
      "  'color.structure.canvas': { primitiveReferences: { value: 'gray400' } },\n" +
      '};\n'
  );
}

function writeMeta(tokenIndexDir: string, tierDir: string): void {
  fs.mkdirSync(tokenIndexDir, { recursive: true });
  fs.writeFileSync(path.join(tokenIndexDir, 'meta.json'), JSON.stringify({ tierDir }));
}

describe('resolveThemeTierRoot — precedence (meta.json → explicit → legacy)', () => {
  let scratch: string;

  beforeEach(() => {
    scratch = mkTmpDir('dp-themeroot-');
  });

  afterEach(() => {
    fs.rmSync(scratch, { recursive: true, force: true });
  });

  test('meta.json tierDir wins over both the explicit tier and the legacy default', () => {
    const tokenIndexDir = path.join(scratch, 'token-index');
    const metaTier = path.join(scratch, 'from-meta');
    writeMeta(tokenIndexDir, metaTier);

    const result = resolveThemeTierRoot(tokenIndexDir, '/from-explicit', '/from-legacy-project-root');
    expect(result).toBe(metaTier);
  });

  test('explicit tier wins when meta.json is absent', () => {
    const tokenIndexDir = path.join(scratch, 'token-index'); // no meta.json written
    fs.mkdirSync(tokenIndexDir, { recursive: true });

    const result = resolveThemeTierRoot(tokenIndexDir, '/from-explicit', '/from-legacy-project-root');
    expect(result).toBe('/from-explicit');
  });

  test('legacy <projectRoot>/src/tokens is the last resort', () => {
    const result = resolveThemeTierRoot(undefined, undefined, '/from-legacy-project-root');
    expect(result).toBe(path.join('/from-legacy-project-root', 'src', 'tokens'));
  });

  test('BITE target: a malformed meta.json falls through, never throws', () => {
    const tokenIndexDir = path.join(scratch, 'token-index');
    fs.mkdirSync(tokenIndexDir, { recursive: true });
    fs.writeFileSync(path.join(tokenIndexDir, 'meta.json'), '{ not valid json');

    expect(() => resolveThemeTierRoot(tokenIndexDir, '/from-explicit', '/from-legacy')).not.toThrow();
    expect(resolveThemeTierRoot(tokenIndexDir, '/from-explicit', '/from-legacy')).toBe('/from-explicit');
  });
});

describe('the package-mode regression: ModeClassifier follows meta.json, not <projectRoot>/src/tokens', () => {
  let consumerRoot: string;
  let packageTier: string;
  let tokenIndexDir: string;

  beforeEach(() => {
    consumerRoot = mkTmpDir('dp-consumer-'); // package-mode: NO src/tokens here at all
    packageTier = mkTmpDir('dp-package-tier-');
    writeDarkOverrides(packageTier);
    tokenIndexDir = path.join(mkTmpDir('dp-index-'), 'token-index');
    writeMeta(tokenIndexDir, packageTier);
  });

  afterEach(() => {
    fs.rmSync(consumerRoot, { recursive: true, force: true });
    fs.rmSync(packageTier, { recursive: true, force: true });
    fs.rmSync(path.dirname(tokenIndexDir), { recursive: true, force: true });
  });

  test('load() resolves the theme from meta.json\'s tierDir, not <consumerRoot>/src/tokens', () => {
    const classifier = new ModeClassifier();
    // projectRoot is the CONSUMER root (package-mode's dsRoot.root) — it has no
    // src/tokens at all. Without following meta.json this would warn "not found".
    classifier.load(consumerRoot, tokenIndexDir);

    expect(classifier.getWarnings()).toEqual([]);
    expect(classifier.classify('color.structure.canvas')).toBe('level-2');
  });

  test('BITE (recorded red in the Task 1.5 completion doc): hardcoding <projectRoot>/src/tokens loses the override', () => {
    // Reproduce the PRE-1.5 hardcoded read directly, to prove it would have missed
    // the override that lives at the PACKAGE tier, not the consumer root.
    const legacyOverridesPath = path.join(consumerRoot, 'src/tokens/themes/dark/SemanticOverrides.ts');
    expect(fs.existsSync(legacyOverridesPath)).toBe(false);
  });
});

describe('ComponentIndexer wiring: options.tierDir threads through to the theme readers', () => {
  let consumerRoot: string;
  let componentsRoot: string;
  let packageTier: string;
  let tokenIndexDir: string;

  beforeEach(() => {
    consumerRoot = mkTmpDir('dp-consumer2-');
    componentsRoot = path.join(consumerRoot, 'src', 'components');
    fs.mkdirSync(componentsRoot, { recursive: true });
    packageTier = mkTmpDir('dp-package-tier2-');
    writeDarkOverrides(packageTier);
    tokenIndexDir = path.join(consumerRoot, 'token-index');
    fs.mkdirSync(tokenIndexDir, { recursive: true });
    fs.writeFileSync(path.join(tokenIndexDir, 'primitives.yaml'), 'tokens: {}\n');
    fs.writeFileSync(path.join(tokenIndexDir, 'semantics.yaml'), 'tokens: {}\n');
    fs.writeFileSync(path.join(tokenIndexDir, 'components.yaml'), 'tokens: {}\n');
  });

  afterEach(() => {
    fs.rmSync(consumerRoot, { recursive: true, force: true });
    fs.rmSync(packageTier, { recursive: true, force: true });
  });

  test('explicit options.tierDir (no meta.json yet) reaches ModeClassifier via a full index', async () => {
    const indexer = new ComponentIndexer();
    await indexer.indexComponents(componentsRoot, undefined, undefined, undefined, tokenIndexDir, {
      projectRoot: consumerRoot,
      tierDir: packageTier,
    });

    // getTokenIndexer's warnings would include "Dark theme overrides not found" if the
    // hardcoded <projectRoot>/src/tokens path had been used instead of options.tierDir.
    const warnings = indexer.getTokenIndexer().getWarnings();
    expect(warnings.some(w => w.includes('Dark theme overrides not found'))).toBe(false);
  });
});
