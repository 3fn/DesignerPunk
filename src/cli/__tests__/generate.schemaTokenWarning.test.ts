/**
 * @jest-environment node
 * @category evergreen
 * @purpose `generate` WARNS about component-schema token names its token index does not hold
 *   (ruling 2026-10-23 § 3c; the same check FAILS as src/generators/__tests__/schemaTokenRefs.test.ts
 *   in DesignerPunk's own repo). Each name is labelled with whose schema it is in. DesignerPunk's
 *   schemas naming DesignerPunk's own component tokens resolve: `generate` merges those tokens from
 *   the package's shipped index (shape (c), .kiro/issues/2026-10-23-born-repo-index-lacks-package-component-tokens.md),
 *   so the one-line "not in your token index" note is retired.
 */

import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import * as yaml from 'js-yaml';
import { schemaTokenReport, resolveGenerateComponentRoots } from '../designerpunk';
import { generateTokenIndex } from '../../generators/generateTokenIndex';
import type { DesignSystemRoot } from '../shared/bornRepo';
import type { SemanticToken } from '../../types/SemanticToken';
import { readPackageComponentTokenIndex } from '../shared/packageComponentTokens';

function writeSchema(root: string, dir: string, name: string, tokens: string[]): void {
  fs.mkdirSync(path.join(root, dir), { recursive: true });
  fs.writeFileSync(
    path.join(root, dir, `${dir}.schema.yaml`),
    [`name: ${name}`, 'tokens:', '  color:', ...tokens.map(t => `    - ${t}`)].join('\n') + '\n',
  );
}

const semantic = (name: string) =>
  ({ name, category: 'color', description: '', primitiveReferences: { value: 'cyan300' }, context: '' }) as SemanticToken;

describe('generate — schema token names the token index does not hold', () => {
  let tmp: string;
  let bornRoot: string;
  let pkgRoot: string;

  beforeEach(() => {
    tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'generate-schema-warning-'));
    bornRoot = path.join(tmp, 'consumer');
    pkgRoot = path.join(bornRoot, 'node_modules', '@3fn', 'core');
    const pkgComponents = path.join(pkgRoot, 'src', 'components', 'core');
    // DesignerPunk's Button-CTA reads a semantic the consumer renamed away, and Avatar-Base
    // reads one of DesignerPunk's own component tokens.
    writeSchema(pkgComponents, 'Button-CTA', 'Button-CTA', ['color.action.primary']);
    writeSchema(pkgComponents, 'Avatar-Base', 'Avatar-Base', ['color.identity.human', 'avatar.size.md']);
    fs.mkdirSync(path.join(pkgRoot, 'token-index'), { recursive: true });
    fs.writeFileSync(
      path.join(pkgRoot, 'token-index', 'components.yaml'),
      yaml.dump({ tokens: { 'avatar.size.md': { component: 'Avatar', definedBy: 'Avatar-Base', primitiveReferences: { value: 'size500' }, platforms: { web: '--avatar-size-md', ios: 'AvatarTokens.sizeMd', android: 'AvatarTokens.sizeMd' } } } }),
    );
    fs.writeFileSync(path.join(pkgRoot, 'package.json'), JSON.stringify({ name: '@3fn/core', version: '16.1.0' }));
    // The consumer's own component declares a misspelled name.
    writeSchema(path.join(bornRoot, 'src', 'components'), 'Pricing-Card', 'PricingCard', ['color.identity.Human']);
    jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
    fs.rmSync(tmp, { recursive: true, force: true });
  });

  function run() {
    const dsRoot: DesignSystemRoot = { state: 'born', root: bornRoot, tierDir: null, signals: { config: true, tier: true, manifest: false, legacyManifest: false } };
    const result = generateTokenIndex(path.join(bornRoot, 'token-index'), {
      primitiveTokens: [],
      // The consumer's token source no longer has color.action.primary.
      semanticTokens: [semantic('color.identity.human')],
      componentTokens: [],
      modeResolved: { resolvedLight: [], resolvedDark: [], themeVaryingTokens: new Set(), primitiveOklch: new Map() } as any,
      componentSchemaDir: resolveGenerateComponentRoots(dsRoot, pkgRoot),
      packageComponentTokens: readPackageComponentTokenIndex(pkgRoot).index!,
    });
    return schemaTokenReport(result, pkgRoot, bornRoot);
  }

  it('names each unresolved name and whose schema it is in', () => {
    const { warning } = run();
    expect(warning).not.toBeNull();
    const lines = warning!.split('\n');
    expect(lines[0]).toBe(
      '2 token names declared in component schemas are not in this token index, so those components are not counted as their consumers (get_token_consumers):',
    );
    expect(lines).toContain('   your PricingCard (src/components/Pricing-Card/Pricing-Card.schema.yaml), tokens.color: color.identity.Human');
    expect(lines).toContain("   DesignerPunk's Button-CTA, tokens.color: color.action.primary");
    expect(warning).toContain('use the token\'s exact token-index name (case-sensitive)');
    expect(warning).toContain('your generated output no longer has the CSS variable or constant that component reads');
  });

  it('DesignerPunk\'s own component tokens resolve from the package\'s index: no warning line, no note', () => {
    const report = run();
    expect(report.warning).not.toContain('avatar.size.md');
    expect(report).not.toHaveProperty('note');
  });

  it('says nothing when every name resolves', () => {
    const result = { componentRoots: [], unresolved: [], unreadable: [] };
    expect(schemaTokenReport(result, pkgRoot, bornRoot)).toEqual({ warning: null });
  });
});
