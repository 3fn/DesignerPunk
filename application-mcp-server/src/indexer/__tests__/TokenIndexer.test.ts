/**
 * @category evergreen
 * @purpose Verify TokenIndexer loads YAML index and serves queries
 */

import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'js-yaml';
import { TokenIndexer } from '../TokenIndexer';

const TEST_DIR = path.join(__dirname, 'fixtures', 'token-index');

function createTestIndex(): void {
  fs.mkdirSync(TEST_DIR, { recursive: true });

  fs.writeFileSync(path.join(TEST_DIR, 'primitives.yaml'), yaml.dump({
    tokens: {
      space100: { family: 'spacing', value: 8, formula: 'baselineGrid * 1', platforms: { web: '--space-100', ios: 'space100', android: 'space_100' } },
      space200: { family: 'spacing', value: 16, formula: 'baselineGrid * 2', platforms: { web: '--space-200', ios: 'space200', android: 'space_200' } },
      cyan300: { family: 'color', value: 'rgba(0, 240, 255, 1)', platforms: { web: '--cyan-300', ios: 'cyan300', android: 'cyan_300' } },
    },
  }));

  fs.writeFileSync(path.join(TEST_DIR, 'semantics.yaml'), yaml.dump({
    tokens: {
      'color.action.primary': { category: 'color', primitiveReferences: { value: 'cyan300' }, themeVarying: true, platforms: { web: '--color-action-primary', ios: 'theme.colorActionPrimary', android: 'theme.color_action_primary' }, consumers: ['Button-CTA', 'Button-Icon'] },
      'space.inset.200': { category: 'spacing', primitiveReferences: { value: 'space200' }, themeVarying: false, platforms: { web: '--space-inset-200', ios: 'spaceInset200', android: 'space_inset_200' }, consumers: ['Container-Base'] },
    },
  }));

  fs.writeFileSync(path.join(TEST_DIR, 'components.yaml'), yaml.dump({
    tokens: {
      'buttonIcon.inset.large': { component: 'Button-Icon', primitiveReferences: { value: 'space150' }, platforms: { web: '--button-icon-inset-large', ios: 'buttonIconInsetLarge', android: 'button_icon_inset_large' } },
    },
  }));
}

describe('TokenIndexer', () => {
  let indexer: TokenIndexer;

  beforeAll(async () => {
    createTestIndex();
    indexer = new TokenIndexer();
    await indexer.indexTokens(TEST_DIR);
  });

  afterAll(() => {
    fs.rmSync(TEST_DIR, { recursive: true, force: true });
  });

  it('loads all three tiers', () => {
    const health = indexer.getHealth();
    expect(health.primitives).toBe(3);
    expect(health.semantics).toBe(2);
    expect(health.componentTokens).toBe(1);
  });

  it('search by family returns matching tokens', () => {
    const results = indexer.search({ family: 'spacing' });
    expect(results.length).toBe(3); // 2 primitives + 1 semantic
    expect(results.every(r => (r.family || r.category) === 'spacing')).toBe(true);
  });

  it('search by tier returns only that tier', () => {
    const results = indexer.search({ tier: 'semantic' });
    expect(results.length).toBe(2);
    expect(results.every(r => r.tier === 'semantic')).toBe(true);
  });

  it('search by name substring', () => {
    const results = indexer.search({ name: 'space' });
    expect(results.length).toBeGreaterThanOrEqual(2);
  });

  it('getDetails returns full entry', () => {
    const entry = indexer.getDetails('space100');
    expect(entry).not.toBeNull();
    expect(entry!.value).toBe(8);
    expect(entry!.formula).toBe('baselineGrid * 1');
    expect(entry!.platforms.web).toBe('--space-100');
  });

  it('getDetails returns semantic with theme-varying status', () => {
    const entry = indexer.getDetails('color.action.primary');
    expect(entry).not.toBeNull();
    expect(entry!.themeVarying).toBe(true);
    expect(entry!.consumers).toContain('Button-CTA');
  });

  it('getDetails returns null for unknown token', () => {
    expect(indexer.getDetails('nonexistent')).toBeNull();
  });

  it('getFamily returns tokens across tiers', () => {
    const results = indexer.getFamily('color');
    expect(results.length).toBeGreaterThanOrEqual(2); // cyan300 primitive + color.action.primary semantic
  });

  it('getConsumers returns components via reverse index', () => {
    const consumers = indexer.getConsumers('color.action.primary');
    expect(consumers.length).toBe(2);
    expect(consumers.map(c => c.component)).toContain('Button-CTA');
    expect(consumers.map(c => c.component)).toContain('Button-Icon');
  });

  it('getConsumers returns empty for token with no consumers', () => {
    expect(indexer.getConsumers('space100')).toHaveLength(0);
  });

  it('handles missing directory gracefully', async () => {
    const emptyIndexer = new TokenIndexer();
    await emptyIndexer.indexTokens('/tmp/nonexistent-token-index');
    expect(emptyIndexer.getHealth().primitives).toBe(0);
    expect(emptyIndexer.getWarnings().length).toBeGreaterThan(0);
  });

  it('handles malformed YAML gracefully', async () => {
    const badDir = path.join(TEST_DIR, '..', 'bad-token-index');
    fs.mkdirSync(badDir, { recursive: true });
    fs.writeFileSync(path.join(badDir, 'primitives.yaml'), '{{invalid yaml');
    fs.writeFileSync(path.join(badDir, 'semantics.yaml'), yaml.dump({ tokens: { 'test.token': { category: 'test', platforms: { web: 'x', ios: 'x', android: 'x' } } } }));

    const badIndexer = new TokenIndexer();
    await badIndexer.indexTokens(badDir);
    expect(badIndexer.getHealth().primitives).toBe(0); // bad file skipped
    expect(badIndexer.getHealth().semantics).toBe(1); // good file loaded
    expect(badIndexer.getWarnings().length).toBeGreaterThan(0);

    fs.rmSync(badDir, { recursive: true, force: true });
  });
});
