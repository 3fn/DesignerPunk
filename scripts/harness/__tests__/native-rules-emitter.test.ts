/**
 * @category evergreen
 * @purpose Hold the generator's theme emitter and the shared harness module together
 *          (Spec 129 Task 11; design § 4, "The shared harness module"). The module is an
 *          independent copy of the theme-instance rule; this test runs both on configs S and C and
 *          the default-name case and asserts, per platform, that the emitted holder members equal
 *          the module's instances and the emitted family cases equal the module's cases, in the
 *          declaration forms the per-run instance check parses.
 *
 * It imports both, which the one-way ban allows: nothing under `src/` imports `scripts/harness/`.
 */

import { TokenFileGenerator, type ThemeOverrideSet } from '../../../src/generators/TokenFileGenerator';
import { realThemeContexts } from '../../../src/generators/__tests__/helpers/realThemeContexts';
import {
  familyCases,
  holderName,
  instanceNames,
  kotlinHolderMemberLine,
  kotlinHolderOpenLine,
  swiftHolderMemberLine,
  swiftHolderOpenLine,
  type ThemeEntry,
} from '../native-rules';

const contexts = realThemeContexts();
const generator = new TokenFileGenerator();

const custom = (name: string, mode: 'light' | 'dark' | 'both'): ThemeOverrideSet => ({
  name, mode, lightTokens: contexts.semanticTokens, darkTokens: contexts.darkSemanticTokens, overrideKeys: new Set(),
});

/** The module's entries for the registered themes, as `init` and config C write them. */
const S: ThemeEntry[] = [{ name: 'dark', mode: 'dark' }, { name: 'wcag', mode: 'light' }];
const C: ThemeEntry[] = [
  { name: 'wcag', mode: 'both' }, { name: 'high-contrast', mode: 'both' }, { name: 'brand', mode: 'light' }, { name: 'default', mode: 'dark' },
];
const cases: Array<{ label: string; name: string; abbreviation: string | undefined; entries: ThemeEntry[]; themes: ThemeOverrideSet[] }> = [
  { label: 'config S', name: 'WrKingClass', abbreviation: 'WKC', entries: S, themes: [] },
  { label: 'config C', name: 'PB', abbreviation: 'PB', entries: C, themes: [custom('high-contrast', 'both'), custom('brand', 'light'), custom('default', 'dark')] },
  { label: 'the default name', name: 'DesignerPunk', abbreviation: 'DP', entries: S, themes: [] },
];

describe.each(cases)('$label', ({ name, abbreviation, entries, themes }) => {
  const opts = { ...contexts, productName: name, abbreviation, themeOverrides: themes };
  const swift = generator.generateNativeThemes('ios', opts).join('\n');
  const kotlin = generator.generateNativeThemes('android', opts).join('\n');

  it('iOS: the emitted holder members equal the module\'s instances, in the module\'s declaration form', () => {
    const open = swift.indexOf(swiftHolderOpenLine(name));
    expect(open).toBeGreaterThan(-1);
    const block = swift.slice(open, swift.indexOf('\n}', open)).split('\n').slice(1);
    const emitted = block.filter(l => l.startsWith(swiftHolderMemberLine('').slice(0, -0))).map(l => /^    public static let (\w+):/.exec(l)![1]);
    expect(emitted).toEqual(instanceNames(entries, 'ios'));
    for (const instance of instanceNames(entries, 'ios')) {
      expect(block.some(l => l.startsWith(swiftHolderMemberLine(instance)))).toBe(true);
    }
  });

  it('iOS: the emitted family cases equal the module\'s', () => {
    const start = swift.indexOf(`public enum ${name}ThemeFamily:`);
    const body = swift.slice(start, swift.indexOf('\n}', start));
    const emitted = [...body.matchAll(/^    case (\S+)$/gm)].map(m => m[1].replace(/`/g, ''));
    expect(emitted).toEqual(familyCases(entries, 'ios'));
  });

  it('Android: the emitted holder members equal the module\'s instances, in the module\'s declaration form', () => {
    expect(kotlin).toContain(`\n${kotlinHolderOpenLine(name)}\n`);
    const start = kotlin.indexOf(kotlinHolderOpenLine(name));
    const block = kotlin.slice(start, kotlin.indexOf('\n}', start));
    const emitted = [...block.matchAll(/^    val (\w+) = DesignerPunkTheme\($/gm)].map(m => m[1]);
    expect(emitted).toEqual(instanceNames(entries, 'android'));
    for (const instance of instanceNames(entries, 'android')) expect(block).toContain(kotlinHolderMemberLine(instance));
  });

  it('Android: the emitted family entries equal the module\'s', () => {
    const start = kotlin.indexOf(`enum class ${name}ThemeFamily {`);
    const body = kotlin.slice(start, kotlin.indexOf('\n}', start));
    const emitted = [...body.matchAll(/^    (\w+),?$/gm)].map(m => m[1]);
    expect(emitted).toEqual(familyCases(entries, 'android'));
  });

  it('the holder is named by the module', () => {
    expect(swift).toContain(`public enum ${holderName(name)} {`);
    expect(kotlin).toContain(`object ${holderName(name)} {`);
  });
});
