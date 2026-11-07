/**
 * Tests for `scripts/harness/native-rules.ts` (Spec 129 Task 5.4; design.md § 4). Owner: Thurgood.
 *
 * Every expected value is a literal written from design § 4's text, so a change to the module
 * that the design did not make turns a case red; none is computed by the module under test.
 * Ada's consult on the rules, Kenya's review of the Swift rules and Data's of the Kotlin rules
 * are recorded in 5.4's completion doc.
 *
 * Configs S and C are Task 11's (tasks.md Task 11):
 *   S: `dark` in mode `dark`, then `wcag` in mode `light` (the themes `init` writes at 233e04bf1).
 *   C: `wcag` in mode `both`, then `high-contrast` in mode `both`, `brand` in mode `light` and
 *      `default` in mode `dark`. `dark` is not registered.
 */

import {
  BINDING,
  PRODUCT_FILE,
  PRODUCT_GEN_PATH,
  ThemeEntry,
  checkHarnessConsumerConfig,
  checkThemeConfig,
  familyCases,
  holderName,
  instanceNames,
  familyTypeName,
  isSwiftIdentifier,
  kotlinHolderMemberLine,
  kotlinHolderOpenLine,
  kotlinProviderFunction,
  providerName,
  providerReads,
  swiftFamilyType,
  swiftHolderMemberLine,
  swiftHolderOpenLine,
  swiftProviderFunction,
  productAccess,
  productCategories,
  productCategoryOf,
  productCategoryPascal,
  productFileIsRead,
  productGenKeyRoot,
  productReads,
  productTokenOnPlatform,
  selectInstance,
  swiftBackingStruct,
  swiftCaseDeclaration,
  swiftImplicitMember,
  swiftThemeMemberName,
  themeWords,
  instances,
} from '../native-rules';

const CONFIG_S: ThemeEntry[] = [
  { name: 'dark', mode: 'dark' },
  { name: 'wcag', mode: 'light' },
];
const CONFIG_C: ThemeEntry[] = [
  { name: 'wcag', mode: 'both' },
  { name: 'high-contrast', mode: 'both' },
  { name: 'brand', mode: 'light' },
  { name: 'default', mode: 'dark' },
];

describe('the fixed binding names (design § 4, Q12)', () => {
  it('are DesignerPunk\'s, whatever the consumer names itself', () => {
    expect(BINDING.swift.themeProtocol).toBe('DesignerPunkTheme');
    expect(BINDING.swift.environmentKeyType).toBe('DPThemeKey');
    expect(BINDING.swift.environmentMember).toBe('dpTheme');
    expect(BINDING.swift.keyPath).toBe('\\.dpTheme');
    expect(BINDING.kotlin.themeClass).toBe('DesignerPunkTheme');
    expect(BINDING.kotlin.local).toBe('LocalDPTheme');
    expect(BINDING.kotlin.themePackage).toBe('com.designerpunk.tokens');
    expect(BINDING.kotlin.productPackage).toBe('com.designerpunk.product.tokens');
  });
  it('key the product files under gen:product/, not gen:ProductTokens.<ext>', () => {
    expect(PRODUCT_FILE.ios).toBe('ProductTokens.ios.swift');
    expect(PRODUCT_FILE.android).toBe('ProductTokens.android.kt');
    expect(PRODUCT_GEN_PATH.ios).toBe('product/ProductTokens.ios.swift');
    expect(PRODUCT_GEN_PATH.android).toBe('product/ProductTokens.android.kt');
    expect(productGenKeyRoot('ios')).toBe('gen:product/ProductTokens.ios.swift');
    expect(productGenKeyRoot('android')).toBe('gen:product/ProductTokens.android.kt');
  });
  it('name the holder with the config name, not the abbreviation', () => {
    expect(holderName('Probe')).toBe('ProbeThemes');
    expect(holderName('DesignerPunk')).toBe('DesignerPunkThemes');
  });
});

describe('theme-instance rule, item 1: four fixed instances, always', () => {
  it('emits the four with no themes registered', () => {
    expect(instanceNames([], 'ios')).toEqual(['baseLight', 'baseDark', 'wcagLight', 'wcagDark']);
    expect(instanceNames([], 'android')).toEqual(['BaseLight', 'BaseDark', 'WcagLight', 'WcagDark']);
  });
  it('emits the four whatever the config registers (a custom theme only adds)', () => {
    expect(instanceNames([{ name: 'brand', mode: 'both' }], 'ios').slice(0, 4)).toEqual(['baseLight', 'baseDark', 'wcagLight', 'wcagDark']);
  });
});

describe('theme-instance rule, item 2: three reserved names', () => {
  it('`dark` adds no instance', () => {
    expect(instanceNames([{ name: 'dark', mode: 'dark' }], 'ios')).toEqual(['baseLight', 'baseDark', 'wcagLight', 'wcagDark']);
    expect(instanceNames([{ name: 'dark', mode: 'dark' }], 'android')).toEqual(['BaseLight', 'BaseDark', 'WcagLight', 'WcagDark']);
  });
  it('`wcag` adds no instance in mode light, dark, both or the { light, dark } form', () => {
    for (const w of [{ name: 'wcag', mode: 'light' }, { name: 'wcag', mode: 'dark' }, { name: 'wcag', mode: 'both' }, { name: 'wcag', pair: true }]) {
      expect(instanceNames([w], 'ios')).toEqual(['baseLight', 'baseDark', 'wcagLight', 'wcagDark']);
    }
  });
  it('config S (dark, then wcag in mode light) has exactly the four, in order, on both platforms', () => {
    expect(instanceNames(CONFIG_S, 'ios')).toEqual(['baseLight', 'baseDark', 'wcagLight', 'wcagDark']);
    expect(instanceNames(CONFIG_S, 'android')).toEqual(['BaseLight', 'BaseDark', 'WcagLight', 'WcagDark']);
  });
  it('config S has none of darkDark, Dark, or an unsuffixed Wcag', () => {
    for (const bad of ['darkDark', 'dark', 'wcag']) expect(instanceNames(CONFIG_S, 'ios')).not.toContain(bad);
    for (const bad of ['DarkDark', 'Dark', 'Wcag']) expect(instanceNames(CONFIG_S, 'android')).not.toContain(bad);
  });
  it('a theme registered as `base` adds nothing (it is a refusal, never an instance)', () => {
    expect(instanceNames([{ name: 'base', mode: 'both' }], 'ios')).toEqual(['baseLight', 'baseDark', 'wcagLight', 'wcagDark']);
  });
});

describe('theme-instance rule, item 3: one instance per mode a theme covers', () => {
  it('mode light adds <t>Light only', () => {
    expect(instanceNames([{ name: 'brand', mode: 'light' }], 'ios').slice(4)).toEqual(['brandLight']);
  });
  it('mode dark adds <t>Dark only', () => {
    expect(instanceNames([{ name: 'brand', mode: 'dark' }], 'ios').slice(4)).toEqual(['brandDark']);
  });
  it('mode both adds both, light first', () => {
    expect(instanceNames([{ name: 'brand', mode: 'both' }], 'ios').slice(4)).toEqual(['brandLight', 'brandDark']);
  });
  it('the { light, dark } form adds both', () => {
    expect(instanceNames([{ name: 'brand', pair: true }], 'android').slice(4)).toEqual(['BrandLight', 'BrandDark']);
  });
  it('no instance is emitted for a mode the theme does not cover', () => {
    expect(instanceNames([{ name: 'brand', mode: 'light' }], 'ios')).not.toContain('brandDark');
    expect(instanceNames([{ name: 'default', mode: 'dark' }], 'ios')).not.toContain('defaultLight');
  });
  it('config C: the exact set and order on iOS', () => {
    expect(instanceNames(CONFIG_C, 'ios')).toEqual([
      'baseLight', 'baseDark', 'wcagLight', 'wcagDark', 'highContrastLight', 'highContrastDark', 'brandLight', 'defaultDark',
    ]);
  });
  it('config C: the exact set and order on Android', () => {
    expect(instanceNames(CONFIG_C, 'android')).toEqual([
      'BaseLight', 'BaseDark', 'WcagLight', 'WcagDark', 'HighContrastLight', 'HighContrastDark', 'BrandLight', 'DefaultDark',
    ]);
  });
  it('config C emits none of brandDark, defaultLight, darkDark or an unsuffixed brand or default', () => {
    for (const bad of ['brandDark', 'defaultLight', 'darkDark', 'brand', 'default']) expect(instanceNames(CONFIG_C, 'ios')).not.toContain(bad);
    for (const bad of ['BrandDark', 'DefaultLight', 'DarkDark', 'Brand', 'Default']) expect(instanceNames(CONFIG_C, 'android')).not.toContain(bad);
  });
  it('config order is kept, the light instance before the dark one', () => {
    const themes: ThemeEntry[] = [
      { name: 'zeta', mode: 'both' },
      { name: 'alpha', mode: 'both' },
    ];
    expect(instanceNames(themes, 'ios').slice(4)).toEqual(['zetaLight', 'zetaDark', 'alphaLight', 'alphaDark']);
  });
});

describe('theme-instance rule, item 4: names', () => {
  it('splits the theme name at every - and _', () => {
    expect(themeWords('high-contrast')).toEqual(['high', 'contrast']);
    expect(themeWords('high_contrast')).toEqual(['high', 'contrast']);
    expect(themeWords('a-b_c')).toEqual(['a', 'b', 'c']);
    expect(themeWords('highContrast')).toEqual(['highContrast']);
  });
  it('writes high-contrast as highContrastLight on Swift and HighContrastLight on Kotlin', () => {
    const t: ThemeEntry[] = [{ name: 'high-contrast', mode: 'light' }];
    expect(instanceNames(t, 'ios')[4]).toBe('highContrastLight');
    expect(instanceNames(t, 'android')[4]).toBe('HighContrastLight');
  });
  it('treats an underscore like a hyphen', () => {
    expect(instanceNames([{ name: 'high_contrast', mode: 'dark' }], 'ios')[4]).toBe('highContrastDark');
    expect(instanceNames([{ name: 'high_contrast', mode: 'dark' }], 'android')[4]).toBe('HighContrastDark');
  });
  it('changes only the first letter of each word: highContrast is one word', () => {
    expect(instanceNames([{ name: 'highContrast', mode: 'light' }], 'ios')[4]).toBe('highContrastLight');
    expect(instanceNames([{ name: 'highContrast', mode: 'light' }], 'android')[4]).toBe('HighContrastLight');
  });
  it('lower-cases the first letter on Swift and keeps the rest of a capitalised word', () => {
    expect(instanceNames([{ name: 'Brand', mode: 'light' }], 'ios')[4]).toBe('brandLight');
    expect(instanceNames([{ name: 'Brand', mode: 'light' }], 'android')[4]).toBe('BrandLight');
    expect(instanceNames([{ name: 'ab-CD', mode: 'light' }], 'ios')[4]).toBe('abCDLight');
    expect(instanceNames([{ name: 'ab-CD', mode: 'light' }], 'android')[4]).toBe('AbCDLight');
  });
  it('keeps a digit in a later word', () => {
    expect(instanceNames([{ name: 'high-2x', mode: 'light' }], 'ios')[4]).toBe('high2xLight');
  });
  it('always writes the suffix, for a theme of one mode too', () => {
    expect(instanceNames([{ name: 'brand', mode: 'light' }], 'ios')[4]).toBe('brandLight');
    expect(instanceNames([{ name: 'brand', mode: 'dark' }], 'ios')[4]).toBe('brandDark');
  });
  it('derives the backing struct and the implicit member from the Pascal instance name', () => {
    const inst = instances([{ name: 'high-contrast', mode: 'light' }])[4];
    expect(swiftBackingStruct('Probe', inst)).toBe('ProbeHighContrastLightTheme');
    expect(swiftImplicitMember('PB', inst)).toBe('pbHighContrastLight');
    const baseDark = instances([])[1];
    expect(swiftBackingStruct('Probe', baseDark)).toBe('ProbeBaseDarkTheme');
    expect(swiftImplicitMember('PB', baseDark)).toBe('pbBaseDark');
    const wcagLight = instances([])[2];
    expect(swiftImplicitMember('pb', wcagLight)).toBe('pbWcagLight');
  });
});

describe('the theme family (6(b)): cases', () => {
  it('has exactly base and wcag for a config with no custom theme (config S), on both platforms', () => {
    expect(familyCases(CONFIG_S, 'ios')).toEqual(['base', 'wcag']);
    expect(familyCases(CONFIG_S, 'android')).toEqual(['Base', 'Wcag']);
    expect(familyCases([], 'ios')).toEqual(['base', 'wcag']);
  });
  it('config C: base, wcag, then the other themes in config order; no dark case', () => {
    expect(familyCases(CONFIG_C, 'ios')).toEqual(['base', 'wcag', 'highContrast', 'brand', 'default']);
    expect(familyCases(CONFIG_C, 'android')).toEqual(['Base', 'Wcag', 'HighContrast', 'Brand', 'Default']);
  });
  it('never has a dark case even when dark is registered', () => {
    expect(familyCases([{ name: 'dark', mode: 'dark' }, { name: 'brand', mode: 'both' }], 'ios')).toEqual(['base', 'wcag', 'brand']);
  });
  it('declares a Swift reserved-word case in backticks and others plain', () => {
    expect(swiftCaseDeclaration('default')).toBe('`default`');
    expect(swiftCaseDeclaration('class')).toBe('`class`');
    expect(swiftCaseDeclaration('brand')).toBe('brand');
    expect(swiftCaseDeclaration('highContrast')).toBe('highContrast');
    expect(swiftCaseDeclaration('base')).toBe('base');
  });
});

describe('Selection: every row of the table', () => {
  it('base: baseLight in the light scheme, baseDark in the dark scheme', () => {
    expect(selectInstance(CONFIG_C, 'base', 'light', 'ios')).toBe('baseLight');
    expect(selectInstance(CONFIG_C, 'base', 'dark', 'ios')).toBe('baseDark');
    expect(selectInstance(CONFIG_C, 'Base', 'light', 'android')).toBe('BaseLight');
    expect(selectInstance(CONFIG_C, 'Base', 'dark', 'android')).toBe('BaseDark');
  });
  it('wcag: wcagLight and wcagDark', () => {
    expect(selectInstance(CONFIG_C, 'wcag', 'light', 'ios')).toBe('wcagLight');
    expect(selectInstance(CONFIG_C, 'wcag', 'dark', 'ios')).toBe('wcagDark');
    expect(selectInstance(CONFIG_C, 'Wcag', 'light', 'android')).toBe('WcagLight');
    expect(selectInstance(CONFIG_C, 'Wcag', 'dark', 'android')).toBe('WcagDark');
  });
  it('wcag in dark gives wcagDark, not baseDark, although config S registers it in mode light', () => {
    expect(selectInstance(CONFIG_S, 'wcag', 'dark', 'ios')).toBe('wcagDark');
    expect(selectInstance(CONFIG_S, 'Wcag', 'dark', 'android')).toBe('WcagDark');
  });
  it('wcag always has both instances whatever mode its entry declares, or when it is not registered', () => {
    for (const mode of ['light', 'dark', 'both']) {
      expect(selectInstance([{ name: 'wcag', mode }], 'wcag', 'light', 'ios')).toBe('wcagLight');
      expect(selectInstance([{ name: 'wcag', mode }], 'wcag', 'dark', 'ios')).toBe('wcagDark');
    }
    expect(selectInstance([], 'wcag', 'dark', 'ios')).toBe('wcagDark');
    expect(selectInstance([{ name: 'wcag', pair: true }], 'wcag', 'light', 'ios')).toBe('wcagLight');
  });
  it('a registered theme of mode both: <t>Light and <t>Dark', () => {
    expect(selectInstance(CONFIG_C, 'highContrast', 'light', 'ios')).toBe('highContrastLight');
    expect(selectInstance(CONFIG_C, 'highContrast', 'dark', 'ios')).toBe('highContrastDark');
    expect(selectInstance(CONFIG_C, 'HighContrast', 'light', 'android')).toBe('HighContrastLight');
    expect(selectInstance(CONFIG_C, 'HighContrast', 'dark', 'android')).toBe('HighContrastDark');
  });
  it('a theme in the { light, dark } form selects like mode both', () => {
    const t: ThemeEntry[] = [{ name: 'brand', pair: true }];
    expect(selectInstance(t, 'brand', 'light', 'ios')).toBe('brandLight');
    expect(selectInstance(t, 'brand', 'dark', 'ios')).toBe('brandDark');
  });
  it('single-mode rule, mode light: shows <t>Light in light and baseDark in dark', () => {
    expect(selectInstance(CONFIG_C, 'brand', 'light', 'ios')).toBe('brandLight');
    expect(selectInstance(CONFIG_C, 'brand', 'dark', 'ios')).toBe('baseDark');
    expect(selectInstance(CONFIG_C, 'Brand', 'light', 'android')).toBe('BrandLight');
    expect(selectInstance(CONFIG_C, 'Brand', 'dark', 'android')).toBe('BaseDark');
  });
  it('single-mode rule, mode dark: shows baseLight in light and <t>Dark in dark', () => {
    expect(selectInstance(CONFIG_C, 'default', 'light', 'ios')).toBe('baseLight');
    expect(selectInstance(CONFIG_C, 'default', 'dark', 'ios')).toBe('defaultDark');
    expect(selectInstance(CONFIG_C, 'Default', 'light', 'android')).toBe('BaseLight');
    expect(selectInstance(CONFIG_C, 'Default', 'dark', 'android')).toBe('DefaultDark');
  });
  it('returns null for a case the config does not have', () => {
    expect(selectInstance(CONFIG_S, 'brand', 'light', 'ios')).toBeNull();
    expect(selectInstance(CONFIG_C, 'dark', 'dark', 'ios')).toBeNull();
    expect(selectInstance(CONFIG_C, 'Brand', 'light', 'ios')).toBeNull();
  });
});

// ---------------------------------------------------------------------------------------------
// Item 5: each refusal, applied to a harness config (config S plus one offending entry)
// ---------------------------------------------------------------------------------------------

describe('theme-instance rule, item 5: refusals on a harness config', () => {
  const withEntry = (e: ThemeEntry): ThemeEntry[] => [...CONFIG_S, e];

  it('accepts configs S and C', () => {
    expect(checkThemeConfig(CONFIG_S)).toEqual([]);
    expect(checkThemeConfig(CONFIG_C)).toEqual([]);
    expect(checkThemeConfig([])).toEqual([]);
    expect(checkHarnessConsumerConfig(CONFIG_S)).toEqual([]);
    expect(checkHarnessConsumerConfig(CONFIG_C)).toEqual([]);
  });

  describe('(a) a name that is not an identifier on both platforms', () => {
    it('an empty name', () => {
      expect(checkThemeConfig(withEntry({ name: '', mode: 'both' }))).toEqual([
        { rule: 'a', entry: 2, message: 'themes[2] "": the name is empty' },
      ]);
    });
    it('a character other than an ASCII letter, a digit, - or _', () => {
      expect(checkThemeConfig(withEntry({ name: 'bra nd', mode: 'both' }))).toEqual([
        { rule: 'a', entry: 2, message: 'themes[2] "bra nd": the name contains a character other than an ASCII letter, a digit, "-" or "_"' },
      ]);
      expect(checkThemeConfig(withEntry({ name: 'brând', mode: 'both' }))[0].rule).toBe('a');
    });
    it('a leading, trailing or doubled separator', () => {
      for (const name of ['-brand', 'brand-', 'a--b', 'a-_b', '_']) {
        expect(checkThemeConfig(withEntry({ name, mode: 'both' }))).toEqual([
          { rule: 'a', entry: 2, message: `themes[2] "${name}": the name has an empty word (a leading, trailing or doubled "-" or "_")` },
        ]);
      }
    });
    it('a first word that begins with a digit', () => {
      expect(checkThemeConfig(withEntry({ name: '2fast', mode: 'both' }))).toEqual([
        { rule: 'a', entry: 2, message: 'themes[2] "2fast": the first word begins with a digit' },
      ]);
    });
    it('does not refuse a digit that begins a later word', () => {
      expect(checkThemeConfig(withEntry({ name: 'fast-2x', mode: 'both' }))).toEqual([]);
    });
  });

  it('(b) a theme named base', () => {
    expect(checkThemeConfig(withEntry({ name: 'base', mode: 'both' }))).toEqual([
      { rule: 'b', entry: 2, message: 'themes[2] "base": a theme is named "base"; the base theme is never registered' },
    ]);
  });

  describe('(c) dark registered with a mode other than dark, or in the { light, dark } form', () => {
    it('mode light', () => {
      expect(checkThemeConfig([{ name: 'dark', mode: 'light' }])).toEqual([
        { rule: 'c', entry: 0, message: 'themes[0] "dark": "dark" must be registered with mode "dark" only, and not in the { light, dark } form' },
      ]);
    });
    it('mode both', () => {
      expect(checkThemeConfig([{ name: 'dark', mode: 'both' }]).map((r) => r.rule)).toEqual(['c']);
    });
    it('the { light, dark } form', () => {
      expect(checkThemeConfig([{ name: 'dark', pair: true }]).map((r) => r.rule)).toEqual(['c']);
    });
    it('mode dark is accepted', () => {
      expect(checkThemeConfig([{ name: 'dark', mode: 'dark' }])).toEqual([]);
    });
  });

  describe('(d) a name that matches base, dark or wcag ignoring case and separators', () => {
    it('WCAG', () => {
      expect(checkThemeConfig(withEntry({ name: 'WCAG', mode: 'both' }))).toEqual([
        { rule: 'd', entry: 2, message: 'themes[2] "WCAG": the name matches "wcag" when letter case and separators are ignored, but is not spelled exactly that way' },
      ]);
    });
    it('Dark', () => {
      expect(checkThemeConfig([{ name: 'Dark', mode: 'dark' }]).map((r) => r.rule)).toEqual(['d']);
    });
    it('Base', () => {
      expect(checkThemeConfig(withEntry({ name: 'Base', mode: 'both' })).map((r) => r.rule)).toEqual(['d']);
    });
    it('separators are ignored: wc-ag', () => {
      expect(checkThemeConfig(withEntry({ name: 'wc-ag', mode: 'both' })).map((r) => r.rule)).toEqual(['d']);
    });
    it('a name that merely contains a reserved word is accepted', () => {
      expect(checkThemeConfig(withEntry({ name: 'wcag-plus', mode: 'both' }))).toEqual([]);
    });
  });

  describe('(e) two themes with the same Pascal words, ignoring case', () => {
    it('high-contrast and high_contrast, naming both entries', () => {
      expect(checkThemeConfig([{ name: 'high-contrast', mode: 'both' }, { name: 'high_contrast', mode: 'both' }])).toEqual([
        { rule: 'e', entry: 1, message: 'themes[1] "high_contrast": gives the same Pascal words as themes[0] "high-contrast" when letter case is ignored' },
      ]);
    });
    it('high-contrast and highContrast', () => {
      expect(checkThemeConfig([{ name: 'high-contrast', mode: 'both' }, { name: 'highContrast', mode: 'both' }]).map((r) => r.rule)).toEqual(['e']);
    });
    it('brand and Brand differ only in case', () => {
      expect(checkThemeConfig([{ name: 'brand', mode: 'both' }, { name: 'Brand', mode: 'both' }]).map((r) => r.rule)).toEqual(['e']);
    });
    it('three that collide give two refusals, each naming the first', () => {
      const r = checkThemeConfig([
        { name: 'high-contrast', mode: 'both' },
        { name: 'high_contrast', mode: 'both' },
        { name: 'highContrast', mode: 'both' },
      ]);
      expect(r.map((x) => [x.rule, x.entry])).toEqual([['e', 1], ['e', 2]]);
    });
  });

  it('(f) a name registered twice', () => {
    expect(checkThemeConfig(withEntry({ name: 'wcag', mode: 'both' }))).toEqual([
      { rule: 'f', entry: 2, message: 'themes[2] "wcag": the name is already registered at themes[1] "wcag"' },
    ]);
    expect(checkThemeConfig([{ name: 'brand', mode: 'light' }, { name: 'brand', mode: 'dark' }]).map((r) => r.rule)).toEqual(['e', 'f']);
  });

  describe('(g) a mode that is not light, dark or both', () => {
    it('a different word', () => {
      expect(checkThemeConfig(withEntry({ name: 'brand', mode: 'auto' }))).toEqual([
        { rule: 'g', entry: 2, message: 'themes[2] "brand": the mode "auto" is not "light", "dark" or "both"' },
      ]);
    });
    it('an absent mode', () => {
      expect(checkThemeConfig(withEntry({ name: 'brand' }))).toEqual([
        { rule: 'g', entry: 2, message: 'themes[2] "brand": the mode (absent) is not "light", "dark" or "both"' },
      ]);
    });
    it('a mode in the wrong case', () => {
      expect(checkThemeConfig(withEntry({ name: 'brand', mode: 'Light' })).map((r) => r.rule)).toEqual(['g']);
    });
  });

  describe('(h) a Swift family case of self, init or allCases', () => {
    it('self', () => {
      expect(checkThemeConfig(withEntry({ name: 'self', mode: 'both' }))).toEqual([
        { rule: 'h', entry: 2, message: 'themes[2] "self": the Swift family case would be "self", which is refused' },
      ]);
    });
    it('init, and Init (lower-cased on Swift)', () => {
      expect(checkThemeConfig(withEntry({ name: 'init', mode: 'both' })).map((r) => r.rule)).toEqual(['h']);
      expect(checkThemeConfig(withEntry({ name: 'Init', mode: 'both' })).map((r) => r.rule)).toEqual(['h']);
    });
    it('allCases, written as all-cases or all_cases too', () => {
      expect(checkThemeConfig(withEntry({ name: 'allCases', mode: 'both' })).map((r) => r.rule)).toEqual(['h']);
      expect(checkThemeConfig(withEntry({ name: 'all-cases', mode: 'both' })).map((r) => r.rule)).toEqual(['h']);
      expect(checkThemeConfig(withEntry({ name: 'all_cases', mode: 'both' })).map((r) => r.rule)).toEqual(['h']);
    });
    it('another reserved word is accepted: default is declared in backticks', () => {
      expect(checkThemeConfig(withEntry({ name: 'default', mode: 'dark' }))).toEqual([]);
    });
  });

  it('reports every refusal that holds, in entry order', () => {
    const r = checkThemeConfig([
      { name: 'base', mode: 'both' },
      { name: 'brand', mode: 'weird' },
    ]);
    expect(r.map((x) => [x.rule, x.entry])).toEqual([['b', 0], ['g', 1]]);
  });

  it('checkHarnessConsumerConfig prefixes each refusal as a fixture check, not a consumer refusal', () => {
    expect(checkHarnessConsumerConfig([{ name: 'base', mode: 'both' }])).toEqual([
      'harness consumer config, refusal (b): themes[0] "base": a theme is named "base"; the base theme is never registered',
    ]);
  });
});

// ---------------------------------------------------------------------------------------------
// Product tokens
// ---------------------------------------------------------------------------------------------

describe('product tokens: what generate reads', () => {
  it('reads *.yaml directly in the folder, and not a file in a subfolder', () => {
    expect(productFileIsRead('brand.yaml')).toBe(true);
    expect(productFileIsRead('brand-colors.yaml')).toBe(true);
    expect(productFileIsRead('nested/brand.yaml')).toBe(false);
    expect(productFileIsRead('brand.yml')).toBe(false);
    expect(productFileIsRead('brand.json')).toBe(false);
    expect(productFileIsRead('.yaml')).toBe(false);
  });
  it('contributes no category for a subfolder file, a file that did not parse, or one with no tokens key', () => {
    const cats = productCategories([
      { path: 'sub/inner.yaml', doc: { tokens: { a: {} } } },
      { path: 'broken.yaml', doc: null },
      { path: 'broken-too.yaml', doc: undefined },
      { path: 'notokens.yaml', doc: { category: 'x', description: 'no tokens here' } },
      { path: 'list.yaml', doc: [1, 2] },
      { path: 'ok.yaml', doc: { tokens: { a: { value: 1 } } } },
    ]);
    expect(cats).toEqual([{ category: 'ok', tokens: [{ key: 'a' }] }]);
  });
  it('takes the category from the file name and not from the YAML\'s category field', () => {
    const cats = productCategories([{ path: 'brand.yaml', doc: { category: 'somethingElse', tokens: { a: { value: 1 } } } }]);
    expect(cats.map((c) => c.category)).toEqual(['brand']);
    expect(productCategoryOf('brand-colors.yaml')).toBe('brand-colors');
  });
  it('keeps the keys as the YAML has them, in file order', () => {
    const cats = productCategories([{ path: 'c.yaml', doc: { tokens: { zeta: {}, alpha: {}, Mid_key: {} } } }]);
    expect(cats[0].tokens.map((t) => t.key)).toEqual(['zeta', 'alpha', 'Mid_key']);
  });
  it('reads ref and platforms from a token', () => {
    const cats = productCategories([{ path: 'c.yaml', doc: { tokens: { a: { ref: 'color.action.primary', platforms: ['ios', 'android'] }, b: { value: '#fff' } } } }]);
    expect(cats[0].tokens).toEqual([{ key: 'a', ref: 'color.action.primary', platforms: ['ios', 'android'] }, { key: 'b' }]);
  });
});

describe('product tokens: the names', () => {
  it('writes the category in PascalCase split at - only', () => {
    expect(productCategoryPascal('brand')).toBe('Brand');
    expect(productCategoryPascal('brand-colors')).toBe('BrandColors');
    expect(productCategoryPascal('brand_colors')).toBe('Brand_colors');
    expect(productCategoryPascal('a-b-c')).toBe('ABC');
    expect(productCategoryPascal('brandColors')).toBe('BrandColors');
    expect(productCategoryPascal('brand-colorsX')).toBe('BrandColorsX');
  });
  it('names a Swift theme member product<Cat><Key>, upper-casing only the key\'s first letter', () => {
    expect(swiftThemeMemberName('brand', 'actionPrimaryRef')).toBe('productBrandActionPrimaryRef');
    expect(swiftThemeMemberName('brand-colors', 'primary_x')).toBe('productBrandColorsPrimary_x');
    expect(swiftThemeMemberName('harness', 'actionPrimaryRef')).toBe('productHarnessActionPrimaryRef');
  });
});

describe('product tokens: the platforms filter', () => {
  it('an absent list means every platform', () => {
    expect(productTokenOnPlatform({ key: 'a' }, 'ios')).toBe(true);
    expect(productTokenOnPlatform({ key: 'a' }, 'android')).toBe(true);
  });
  it('a list keeps the token for the platforms it names only', () => {
    expect(productTokenOnPlatform({ key: 'a', platforms: ['ios'] }, 'ios')).toBe(true);
    expect(productTokenOnPlatform({ key: 'a', platforms: ['ios'] }, 'android')).toBe(false);
    expect(productTokenOnPlatform({ key: 'a', platforms: ['web', 'android'] }, 'ios')).toBe(false);
    expect(productTokenOnPlatform({ key: 'a', platforms: ['web', 'android'] }, 'android')).toBe(true);
  });
  it('an explicit empty list emits the token nowhere', () => {
    expect(productTokenOnPlatform({ key: 'a', platforms: [] }, 'ios')).toBe(false);
    expect(productTokenOnPlatform({ key: 'a', platforms: [] }, 'android')).toBe(false);
  });
});

describe('product tokens: access (the theme. rule from U6)', () => {
  const index: Record<string, Record<string, string | string[]>> = {
    'color.action.primary': { ios: 'theme.actionPrimary', android: 'theme.actionPrimary' },
    'color.brand': { ios: 'DesignTokens.brand', android: 'DesignTokens.brand' },
    'typography.bodyMd': { ios: ['a', 'b'], android: ['a', 'b'] },
  };
  const lookup = (ref: string, p: 'ios' | 'android'): string | readonly string[] | undefined => index[ref]?.[p];

  it('a token with a ref whose index entry has a theme. name is a theme member, named without the prefix', () => {
    expect(productAccess({ key: 'a', ref: 'color.action.primary' }, 'ios', lookup)).toEqual({ kind: 'theme', member: 'actionPrimary' });
    expect(productAccess({ key: 'a', ref: 'color.action.primary' }, 'android', lookup)).toEqual({ kind: 'theme', member: 'actionPrimary' });
  });
  it('a ref whose index name has no theme. prefix is static', () => {
    expect(productAccess({ key: 'a', ref: 'color.brand' }, 'ios', lookup)).toEqual({ kind: 'static' });
  });
  it('a ref the index cannot resolve is static', () => {
    expect(productAccess({ key: 'a', ref: 'no.such.token' }, 'ios', lookup)).toEqual({ kind: 'static' });
  });
  it('a token with a value and no ref is static', () => {
    expect(productAccess({ key: 'a' }, 'ios', lookup)).toEqual({ kind: 'static' });
  });
  it('is decided per platform', () => {
    const only = (ref: string, p: 'ios' | 'android'): string | undefined => (p === 'ios' ? 'theme.x' : 'DesignTokens.x');
    expect(productAccess({ key: 'a', ref: 'r' }, 'ios', only)).toEqual({ kind: 'theme', member: 'x' });
    expect(productAccess({ key: 'a', ref: 'r' }, 'android', only)).toEqual({ kind: 'static' });
  });
});

describe('product tokens: the reads a probe makes', () => {
  const lookup = (ref: string): string | undefined => (ref === 'color.action.primary' ? 'theme.actionPrimary' : undefined);
  const cats = productCategories([
    {
      path: 'brand-colors.yaml',
      doc: {
        tokens: {
          accent: { ref: 'color.action.primary' },
          fixed: { value: '#112233' },
          iosOnly: { value: 1, platforms: ['ios'] },
          androidOnly: { value: 2, platforms: ['android'] },
          nowhere: { value: 3, platforms: [] },
        },
      },
    },
    { path: 'spacing.yaml', doc: { tokens: { gap: { value: 8 } } } },
    { path: 'sub/ignored.yaml', doc: { tokens: { x: { value: 1 } } } },
    { path: 'empty.yaml', doc: { description: 'no tokens key' } },
  ]);

  it('iOS: a static token is Product<Cat>.<key>, a theme member is product<Cat><Key>; one read per token on the platform', () => {
    const reads = productReads(cats, 'ios', lookup);
    expect(reads.map((r) => [r.name, r.access.kind, r.composable])).toEqual([
      ['productBrandColorsAccent', 'theme', false],
      ['ProductBrandColors.fixed', 'static', false],
      ['ProductBrandColors.iosOnly', 'static', false],
      ['ProductSpacing.gap', 'static', false],
    ]);
    expect(reads.length).toBe(4);
  });
  it('Android: every token is Product<Cat>.<key>, a theme member inside @Composable', () => {
    const reads = productReads(cats, 'android', lookup);
    expect(reads.map((r) => [r.name, r.access.kind, r.composable])).toEqual([
      ['ProductBrandColors.accent', 'theme', true],
      ['ProductBrandColors.fixed', 'static', false],
      ['ProductBrandColors.androidOnly', 'static', false],
      ['ProductSpacing.gap', 'static', false],
    ]);
    expect(reads.length).toBe(4);
  });
  it('a category left with no tokens for a platform contributes no read', () => {
    const only = productCategories([{ path: 'web-only.yaml', doc: { tokens: { a: { value: 1, platforms: ['web'] } } } }]);
    expect(productReads(only, 'ios', lookup)).toEqual([]);
    expect(productReads(only, 'android', lookup)).toEqual([]);
  });
  it('no categories gives no reads (0 of 0)', () => {
    expect(productReads([], 'ios', lookup)).toEqual([]);
  });
});

describe('product tokens: harness-only reading of a malformed fixture (Ada\'s consult, gaps 4 and 5)', () => {
  it('sorts the categories by file name (brand-colors.yaml before brand.yaml, as "-" is below "."), whatever order the caller lists the files', () => {
    const files = [
      { path: 'spacing.yaml', doc: { tokens: { gap: {} } } },
      { path: 'brand.yaml', doc: { tokens: { a: {} } } },
      { path: 'brand-colors.yaml', doc: { tokens: { b: {} } } },
      { path: 'Zeta.yaml', doc: { tokens: { c: {} } } },
    ];
    expect(productCategories(files).map((c) => c.category)).toEqual(['Zeta', 'brand-colors', 'brand', 'spacing']);
    expect(productCategories([...files].reverse()).map((c) => c.category)).toEqual(['Zeta', 'brand-colors', 'brand', 'spacing']);
  });
  it('a tokens key holding null contributes no category', () => {
    expect(productCategories([{ path: 'a.yaml', doc: { tokens: null } }])).toEqual([]);
  });
  it('a tokens key holding a list throws, naming the file', () => {
    expect(() => productCategories([{ path: 'bad.yaml', doc: { tokens: [{ a: 1 }] } }])).toThrow('bad.yaml: "tokens" is a list; it must be a mapping of key to token');
  });
  it('a null platforms reads as absent: every platform', () => {
    const cats = productCategories([{ path: 'a.yaml', doc: { tokens: { x: { value: 1, platforms: null } } } }]);
    expect(cats[0].tokens).toEqual([{ key: 'x' }]);
    expect(productTokenOnPlatform(cats[0].tokens[0], 'ios')).toBe(true);
    expect(productTokenOnPlatform(cats[0].tokens[0], 'android')).toBe(true);
  });
  it('any other platforms value that is not a list throws, naming the file and the token', () => {
    expect(() => productCategories([{ path: 'a.yaml', doc: { tokens: { x: { platforms: 'ios' } } } }])).toThrow('a.yaml: token "x" has a "platforms" value that is not a list');
    expect(() => productCategories([{ path: 'a.yaml', doc: { tokens: { y: { platforms: { ios: true } } } } }])).toThrow('a.yaml: token "y" has a "platforms" value that is not a list');
  });
});

describe('product tokens: a key the Swift probe cannot write (Kenya\'s review)', () => {
  it('recognises an identifier', () => {
    for (const ok of ['primary', 'primaryColor', '_x', 'a1', 'Key_2']) expect(isSwiftIdentifier(ok)).toBe(true);
    for (const bad of ['primary-color', '2fast', '', '_', 'has space', 'a.b']) expect(isSwiftIdentifier(bad)).toBe(false);
  });
  it('marks an iOS read valid:false for a key that is not an identifier, and keeps it counted', () => {
    const cats = productCategories([{ path: 'brand.yaml', doc: { tokens: { ok: { value: 1 }, 'primary-color': { value: 2 } } } }]);
    const reads = productReads(cats, 'ios', () => undefined);
    expect(reads.map((r) => [r.name, r.valid])).toEqual([['ProductBrand.ok', true], ['ProductBrand.primary-color', false]]);
    expect(reads.length).toBe(2);
  });
  it('marks a theme member invalid when its composed name is not an identifier', () => {
    const cats = productCategories([{ path: 'brand.yaml', doc: { tokens: { 'a-b': { ref: 'r' }, fine: { ref: 'r' } } } }]);
    const reads = productReads(cats, 'ios', () => 'theme.x');
    expect(reads.map((r) => [r.name, r.valid])).toEqual([['productBrandA-b', false], ['productBrandFine', true]]);
  });
  it('marks a category that is not an identifier invalid for a static read', () => {
    const cats = productCategories([{ path: 'a.b.yaml', doc: { tokens: { k: { value: 1 } } } }]);
    expect(productReads(cats, 'ios', () => undefined).map((r) => [r.name, r.valid])).toEqual([['ProductA.b.k', false]]);
  });
  it('marks every Android read valid', () => {
    const cats = productCategories([{ path: 'brand.yaml', doc: { tokens: { 'primary-color': { value: 2 } } } }]);
    expect(productReads(cats, 'android', () => undefined).map((r) => r.valid)).toEqual([true]);
  });
});

describe('the family type and the provider names', () => {
  it('names the family <Name>ThemeFamily on both platforms', () => {
    expect(familyTypeName('Probe')).toBe('ProbeThemeFamily');
    expect(familyTypeName('DesignerPunk')).toBe('DesignerPunkThemeFamily');
    expect(swiftFamilyType('Probe')).toBe('ProbeThemeFamily');
  });
  it('Swift: the provider is <name>Theme, the first letter of <Name> lower-cased', () => {
    expect(swiftProviderFunction('Probe')).toBe('probeTheme');
    expect(swiftProviderFunction('DesignerPunk')).toBe('designerPunkTheme');
    expect(swiftProviderFunction('PB')).toBe('pBTheme');
  });
  it('Kotlin: the provider is <Name>Theme', () => {
    expect(kotlinProviderFunction('Probe')).toBe('ProbeTheme');
    expect(kotlinProviderFunction('DesignerPunk')).toBe('DesignerPunkTheme');
  });
  it('providerName picks the platform\'s form', () => {
    expect(providerName('Probe', 'ios')).toBe('probeTheme');
    expect(providerName('Probe', 'android')).toBe('ProbeTheme');
  });
});

describe('the provider reads (the m of probe: provider read <n> of <m>)', () => {
  it('iOS: the default call, then one call per family case (1 + cases)', () => {
    expect(providerReads(CONFIG_S, 'ios')).toEqual([
      { kind: 'default' },
      { kind: 'case-call', familyCase: 'base' },
      { kind: 'case-call', familyCase: 'wcag' },
    ]);
    expect(providerReads(CONFIG_C, 'ios').length).toBe(6);
  });
  it('Android: the default call, then a family read and a call per entry (1 + 2 x cases)', () => {
    expect(providerReads(CONFIG_S, 'android')).toEqual([
      { kind: 'default' },
      { kind: 'family-read', familyCase: 'Base' },
      { kind: 'case-call', familyCase: 'Base' },
      { kind: 'family-read', familyCase: 'Wcag' },
      { kind: 'case-call', familyCase: 'Wcag' },
    ]);
    expect(providerReads(CONFIG_C, 'android').length).toBe(11);
  });
  it('config C iOS cases are in family order, in the platform\'s spelling', () => {
    expect(providerReads(CONFIG_C, 'ios').map((r) => r.familyCase)).toEqual([undefined, 'base', 'wcag', 'highContrast', 'brand', 'default']);
  });
  it('no themes: the default and the two fixed cases', () => {
    expect(providerReads([], 'ios').length).toBe(3);
    expect(providerReads([], 'android').length).toBe(5);
  });
});

describe('the holder\'s declaration lines (Task 11\'s pin; the per-run check parses them)', () => {
  it('Kotlin: the object line, and each member on its own line at four spaces', () => {
    expect(kotlinHolderOpenLine('Probe')).toBe('object ProbeThemes {');
    expect(kotlinHolderMemberLine('BaseLight')).toBe('    val BaseLight = DesignerPunkTheme(');
    expect(kotlinHolderMemberLine('HighContrastDark')).toBe('    val HighContrastDark = DesignerPunkTheme(');
  });
  it('Swift: the enum line, and each member as public static let <instance>: any DesignerPunkTheme =', () => {
    expect(swiftHolderOpenLine('Probe')).toBe('public enum ProbeThemes {');
    expect(swiftHolderMemberLine('baseLight')).toBe('    public static let baseLight: any DesignerPunkTheme =');
    expect(swiftHolderMemberLine('defaultDark')).toBe('    public static let defaultDark: any DesignerPunkTheme =');
  });
});
