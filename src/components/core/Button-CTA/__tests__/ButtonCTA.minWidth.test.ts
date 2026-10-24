/**
 * @jest-environment node
 * @category evergreen
 * @purpose Button-CTA minimum width: web, iOS and Android read the same sizing primitive for
 *          each size, and that primitive is the one the schema declares.
 *
 * Requirements 6.1–6.3 (Spec 005): small 56, medium 72, large 80. These are the sizing
 * primitives size700, size900 and size1000. Button-CTA registers no component tokens for
 * them (decided 2026-10-23, Lina and Ada: the values encode no derivation, so a component
 * token would be a rename). Before that, Android read the primitives while web and iOS
 * hard-coded the numbers, and a TS-only `ButtonCTATokens.minWidth` map that no platform
 * read stood in for a token.
 *
 * Swift and Kotlin cannot run in Jest, so this reads each platform's source. Each read is
 * mapped back to its token-index key through the committed index's `platforms.<platform>`
 * names (the identifiers the generators emit), so a platform reading a different primitive,
 * a misspelled one, or a literal goes red.
 *
 * Bite (recorded in the PR): put `min-width: 72px` back in `.button-cta--medium`, or
 * `return 56` back in the iOS `minWidth`, or change Android's `minWidth = DesignTokens.size_900`
 * to `size_800` → this suite goes red.
 */

import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'js-yaml';

const COMPONENT_DIR = path.resolve(__dirname, '..');
const REPO_ROOT = path.resolve(COMPONENT_DIR, '../../../..');

type Platform = 'web' | 'ios' | 'android';
type Size = 'small' | 'medium' | 'large';

const EXPECTED: Record<Size, { key: string; value: number }> = {
  small: { key: 'size700', value: 56 },
  medium: { key: 'size900', value: 72 },
  large: { key: 'size1000', value: 80 },
};
const SIZES = Object.keys(EXPECTED) as Size[];

type PrimitiveEntry = { value?: number; platforms?: Partial<Record<Platform, string>> };
const primitives = (
  yaml.load(fs.readFileSync(path.join(REPO_ROOT, 'token-index', 'primitives.yaml'), 'utf8')) as {
    tokens: Record<string, PrimitiveEntry>;
  }
).tokens;

/** The token-index key whose emitted identifier on `platform` is `identifier`, or undefined. */
function keyFor(platform: Platform, identifier: string): string | undefined {
  const hits = Object.entries(primitives)
    .filter(([, entry]) => entry.platforms?.[platform] === identifier)
    .map(([key]) => key);
  return hits.length === 1 ? hits[0] : undefined;
}

function read(rel: string): string {
  return fs.readFileSync(path.join(COMPONENT_DIR, rel), 'utf8');
}

const css = read('platforms/web/ButtonCTA.web.css');
const swift = read('platforms/ios/ButtonCTA.ios.swift');
const kotlin = read('platforms/android/ButtonCTA.android.kt');
const schema = yaml.load(read('Button-CTA.schema.yaml')) as { tokens?: Record<string, string[]> };

/** The value of `min-width` in the `.button-cta--<size>` rule. */
function webRead(size: Size): string {
  const rule = css.match(new RegExp(`\\.button-cta--${size}\\s*\\{([^}]*)\\}`));
  if (!rule) throw new Error(`no .button-cta--${size} rule in ButtonCTA.web.css`);
  const decl = rule[1].match(/(?:^|[;\s])min-width:\s*([^;]+);/);
  if (!decl) throw new Error(`.button-cta--${size} declares no min-width`);
  return decl[1].trim();
}

/** What the iOS `minWidth` computed property returns for `.<size>`. */
function iosRead(size: Size): string {
  const body = swift.match(/private var minWidth: CGFloat \{([\s\S]*?)\n    \}/);
  if (!body) throw new Error('no `private var minWidth: CGFloat` in ButtonCTA.ios.swift');
  const ret = body[1].match(new RegExp(`case \\.${size}:\\s*return ([^\\s/]+)`));
  if (!ret) throw new Error(`iOS minWidth has no case .${size}`);
  return ret[1];
}

/** The `minWidth =` argument of Android's ButtonCTASizeConfig for `<SIZE>`. */
function androidRead(size: Size): string {
  const config = kotlin.match(
    new RegExp(`ButtonCTASize\\.${size.toUpperCase()} -> ButtonCTASizeConfig\\(([\\s\\S]*?)\\n        \\)`)
  );
  if (!config) throw new Error(`no ButtonCTASize.${size.toUpperCase()} config in ButtonCTA.android.kt`);
  const arg = config[1].match(/minWidth = ([^,\s]+)/);
  if (!arg) throw new Error(`Android ${size} config has no minWidth`);
  return arg[1];
}

/** The token-index key each platform's read resolves to (undefined: not a token read). */
function resolved(size: Size): Record<Platform, string | undefined> {
  const web = webRead(size).match(/^var\((--[\w-]+)\)$/);
  const ios = iosRead(size).match(/^DesignTokens\.(\w+)$/);
  const android = androidRead(size).match(/^DesignTokens\.(\w+)$/);
  return {
    web: web ? keyFor('web', web[1]) : undefined,
    ios: ios ? keyFor('ios', ios[1]) : undefined,
    android: android ? keyFor('android', android[1]) : undefined,
  };
}

describe('Button-CTA minimum width — one sizing primitive per size, on every platform', () => {
  describe.each(SIZES)('%s', (size) => {
    const { key, value } = EXPECTED[size];

    it(`web, iOS and Android all read ${key}`, () => {
      expect(resolved(size)).toEqual({ web: key, ios: key, android: key });
    });

    it(`${key} is ${value} in the token index (Requirement 6)`, () => {
      expect(primitives[key]?.value).toBe(value);
    });
  });

  it('the schema declares the three primitives under sizing, and nothing names a component token for them', () => {
    expect(schema.tokens?.sizing).toEqual(expect.arrayContaining(SIZES.map((s) => EXPECTED[s].key)));
    const declared = Object.values(schema.tokens ?? {}).flat();
    expect(declared.filter((name) => /minwidth/i.test(name))).toEqual([]);
  });
});
