/**
 * @category evergreen
 * @purpose A product token whose `ref` names a composite (typography, shadow, motion) is refused
 *          with a message naming the token (Spec 129 Task 11; Req 5.6 as amended; decided under
 *          Req 10.4), and a WCAG-only colour `ref` emits the theme path by its `theme.` prefix.
 */

import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { ProductTokenGenerator } from '../../build/product/ProductTokenGenerator';
import { emitSwift } from '../../build/product/emitters/SwiftEmitter';
import { emitKotlin } from '../../build/product/emitters/KotlinEmitter';

let dir: string;
const config = () => ({
  productTokensDir: path.join(dir, 'tokens'),
  tokenIndexDir: path.join(dir, 'token-index'),
  outputDir: path.join(dir, 'out'),
  configName: 'Brand',
  configAbbreviation: 'BR',
});

beforeEach(() => {
  dir = fs.mkdtempSync(path.join(os.tmpdir(), 'dp-composite-ref-'));
  fs.mkdirSync(path.join(dir, 'tokens'));
  fs.mkdirSync(path.join(dir, 'token-index'));
  fs.writeFileSync(path.join(dir, 'token-index', 'semantics.yaml'), [
    'tokens:',
    '  typography.bodyMd:',
    '    category: typography',
    '    themeVarying: false',
    '    platforms:',
    '      web: [--typography-body-md-font-size, --typography-body-md]',
    '      ios: typographyBodyMd',
    '      android: typography_body_md',
    '  color.action.primary:',
    '    category: color',
    '    themeVarying: false',
    '    platforms:',
    '      web: --color-action-primary',
    '      ios: theme.colorActionPrimary',
    '      android: theme.color_action_primary',
  ].join('\n'));
  fs.writeFileSync(path.join(dir, 'tokens', 'harness.yaml'), [
    'tokens:',
    '  bodyTypographyRef:',
    '    ref: typography.bodyMd',
    '  actionPrimaryRef:',
    '    ref: color.action.primary',
  ].join('\n'));
});
afterEach(() => fs.rmSync(dir, { recursive: true, force: true }));

describe('a composite product-token ref', () => {
  it('is refused, with a message naming the token, the ref and the file', () => {
    const result = new ProductTokenGenerator(config()).validate();
    expect(result.compositeRefs).toHaveLength(1);
    expect(result.compositeRefs[0]).toMatchObject({ token: 'bodyTypographyRef', ref: 'typography.bodyMd', file: 'harness.yaml' });
    expect(result.compositeRefs[0].message).toContain("Product token 'bodyTypographyRef'");
    expect(result.compositeRefs[0].message).toContain('composite');
    expect(result.categories[0].valid).toBe(false);
  });

  it('is not a broken ref, and the generator reports it on generate too', () => {
    const result = new ProductTokenGenerator(config()).generate();
    expect(result.brokenRefs).toEqual([]);
    expect(result.compositeRefs.map(c => c.token)).toEqual(['bodyTypographyRef']);
  });
});

describe('a WCAG-only colour ref emits the theme path by its `theme.` prefix', () => {
  it('Swift: an extension on DesignerPunkTheme, whatever the consumer\'s name', () => {
    const { categories } = new ProductTokenGenerator(config()).generate();
    const swift = emitSwift(categories, config());
    expect(swift).toContain('public extension DesignerPunkTheme {');
    expect(swift).toContain('var productHarnessActionPrimaryRef: Color { self.colorActionPrimary }');
    expect(swift).not.toContain('BrandTheme');
  });

  it('Kotlin: a composable getter through LocalDPTheme, whatever the consumer\'s abbreviation', () => {
    const { categories } = new ProductTokenGenerator(config()).generate();
    const kotlin = emitKotlin(categories, config());
    expect(kotlin).toContain('import com.designerpunk.tokens.LocalDPTheme');
    expect(kotlin).toContain('@Composable @ReadOnlyComposable get() = LocalDPTheme.current.color_action_primary');
    expect(kotlin).not.toContain('LocalBRTheme');
  });
});
