/**
 * @category evergreen
 * @purpose The theme-source resolver (Spec 129 U9, design § 10): for each built-in map (`dark`, `wcag`
 *          light, `wcag` dark), registered / unregistered / registered-but-missing, in local and in
 *          package mode. Registered reads the adopter's file; registered-but-missing fails naming the
 *          file; unregistered reads the package's built-in at run time through the token set, with the
 *          bridge warning in local mode; package mode reads the package's built-ins, no warning.
 */
import * as path from 'path';
import { loadTokenSet } from '../../config/TokenSetLoader';
import { jestTsModuleLoader } from '../../__tests__/helpers/tsModuleLoader';
import type { ConfigTheme } from '../../config/defineConfig';
import type { SemanticOverrideMap } from '../../tokens/themes/types';
import type { BuiltinThemeDir, TokenSet } from '../../generators/TokenSet';
import { countDifferingOverrides, resolveThemeMaps, isThemePair, type BuiltinThemeRole } from '../resolveThemeMaps';
import { unregisteredBuiltinThemeWarning, BUILTIN_THEME_REGISTRATION_LINES } from '../../cli/shared/errorCatalog';

const ref = (value: string): SemanticOverrideMap => ({ 'color.action.primary': { primitiveReferences: { value } } });
const PACKAGE: Record<BuiltinThemeDir, SemanticOverrideMap> = {
  dark: ref('package-dark'), wcag: ref('package-wcag'), 'dark-wcag': ref('package-dark-wcag'),
};
const ADOPTER: Record<BuiltinThemeDir, SemanticOverrideMap> = {
  dark: ref('adopter-dark'), wcag: ref('adopter-wcag'), 'dark-wcag': ref('adopter-dark-wcag'),
};
const tokenSet = (): TokenSet => ({
  root: '/src/tokens',
  mod: () => { throw new Error('not used'); },
  has: () => false,
  builtinTheme: (dir) => PACKAGE[dir],
});
const ROOT = '/consumer/src/tokens';
const VERSION = '9.9.9';
const run = (themes: ConfigTheme[], local: boolean) =>
  resolveThemeMaps(themes, tokenSet(), { local, tokenSourceRoot: ROOT, coreVersion: VERSION });

/** The registrations that register exactly one role. `wcag` light registers through the plain form; `wcag` dark needs the pair. */
const REGISTER: Record<BuiltinThemeRole, ConfigTheme[]> = {
  dark: [{ name: 'dark', mode: 'dark', overrides: ADOPTER.dark }],
  wcagLight: [{ name: 'wcag', mode: 'light', overrides: ADOPTER.wcag }],
  wcagDark: [{ name: 'wcag', mode: 'both', overrides: { light: PACKAGE.wcag, dark: ADOPTER['dark-wcag'] } }],
};
const MAP_OF: Record<BuiltinThemeRole, 'dark' | 'wcagLight' | 'wcagDark'> = { dark: 'dark', wcagLight: 'wcagLight', wcagDark: 'wcagDark' };
const PACKAGE_OF: Record<BuiltinThemeRole, SemanticOverrideMap> = { dark: PACKAGE.dark, wcagLight: PACKAGE.wcag, wcagDark: PACKAGE['dark-wcag'] };
const ADOPTER_OF: Record<BuiltinThemeRole, SemanticOverrideMap> = { dark: ADOPTER.dark, wcagLight: ADOPTER.wcag, wcagDark: ADOPTER['dark-wcag'] };
const NAME_MODE: Record<BuiltinThemeRole, [string, string]> = { dark: ['dark', 'dark'], wcagLight: ['wcag', 'light'], wcagDark: ['wcag', 'dark'] };
const DIR: Record<BuiltinThemeRole, string> = { dark: 'dark', wcagLight: 'wcag', wcagDark: 'dark-wcag' };

describe.each([['local', true], ['package', false]] as const)('theme-source resolver, %s mode', (_label, local) => {
  describe.each(['dark', 'wcagLight', 'wcagDark'] as const)('%s', (role) => {
    it('registered: reads the adopter\'s map, and prints no bridge warning for it', () => {
      const r = run(REGISTER[role], local);
      expect(r[MAP_OF[role]]).toBe(role === 'wcagDark' ? ADOPTER['dark-wcag'] : ADOPTER_OF[role]);
      expect(r.origins[role]).toBe('registered');
      expect(r.warnings.filter(w => w.includes(`(${NAME_MODE[role][1]})`) && w.includes(`'${NAME_MODE[role][0]}'`))).toEqual([]);
    });

    it('registered-but-missing: fails, naming the file the map would live in', () => {
      const bad: ConfigTheme[] = role === 'dark'
        ? [{ name: 'dark', mode: 'dark', overrides: undefined as never }]
        : role === 'wcagLight'
          ? [{ name: 'wcag', mode: 'light', overrides: undefined as never }]
          : [{ name: 'wcag', mode: 'both', overrides: { light: PACKAGE.wcag, dark: undefined as never } }];
      expect(() => run(bad, local)).toThrow(`${ROOT}/themes/${DIR[role]}/SemanticOverrides.ts`);
    });

    it(local
      ? 'unregistered: the package\'s built-in applies, with the bridge warning, word for word'
      : 'unregistered: the package\'s built-in applies, with no warning', () => {
      const r = run([], local);
      expect(r[MAP_OF[role]]).toBe(PACKAGE_OF[role]);
      if (local) {
        expect(r.origins[role]).toBe('bridge');
        const [name, mode] = NAME_MODE[role];
        expect(r.warnings).toContain(unregisteredBuiltinThemeWarning(name, mode, VERSION, BUILTIN_THEME_REGISTRATION_LINES[role]));
      } else {
        expect(r.origins[role]).toBe('package');
        expect(r.warnings).toEqual([]);
      }
    });
  });

  it('the bridge warning is the design\'s sentence, verbatim', () => {
    const r = run([], local);
    if (!local) return expect(r.warnings).toEqual([]);
    expect(r.warnings[0]).toBe(
      "generate: theme 'dark' (dark) is not registered in designerpunk.config.ts, so DesignerPunk's built-in overrides from @3fn/core 9.9.9 were applied, " +
      "as before 129. To use your own, register it: { name: 'dark', mode: 'dark', overrides: darkSemanticOverrides }. " +
      'From the next major release, an unregistered built-in theme is not applied.',
    );
    expect(r.warnings).toHaveLength(3);
  });

  it('a registration of wcag in the plain form leaves wcag dark to the built-in', () => {
    const r = run(REGISTER.wcagLight, local);
    expect(r.wcagLight).toBe(ADOPTER.wcag);
    expect(r.wcagDark).toBe(PACKAGE['dark-wcag']);
  });

  it('the opt-out: wcag registered with empty maps in the pair form applies nothing and warns of nothing', () => {
    const r = run([{ name: 'dark', mode: 'dark', overrides: {} }, { name: 'wcag', mode: 'both', overrides: { light: {}, dark: {} } }], local);
    expect(r.wcagLight).toEqual({});
    expect(r.wcagDark).toEqual({});
    expect(r.warnings).toEqual([]);
  });
});

describe('the count of values that differ from the built-in', () => {
  it('counts a key on one side only and a changed definition', () => {
    const builtin = { a: { primitiveReferences: { value: 'x' } }, b: { primitiveReferences: { value: 'y' } } };
    expect(countDifferingOverrides(builtin, builtin)).toBe(0);
    expect(countDifferingOverrides({ a: builtin.a, b: { primitiveReferences: { value: 'z' } }, c: builtin.a }, builtin)).toBe(2);
    expect(countDifferingOverrides({}, builtin)).toBe(2);
  });

  it('is reported for a registered map, and null when the package\'s own copy cannot be read', () => {
    const r = run(REGISTER.dark, true);
    expect(r.differences).toEqual([expect.objectContaining({ role: 'dark', differing: 1 })]);
    const noPackage: TokenSet = { ...tokenSet(), builtinTheme: () => { throw new Error('gone'); } };
    const all: ConfigTheme[] = [...REGISTER.dark, ...REGISTER.wcagDark];
    const r2 = resolveThemeMaps(all, noPackage, { local: true, tokenSourceRoot: ROOT, coreVersion: VERSION });
    expect(r2.differences.map(d => d.differing)).toEqual([null, null, null]);
  });
});

describe('the pair form', () => {
  it('is exactly { light, dark }', () => {
    expect(isThemePair({ light: {}, dark: {} })).toBe(true);
    expect(isThemePair({ light: {} })).toBe(false);
    expect(isThemePair({ 'color.action.primary': {} })).toBe(false);
    expect(isThemePair(undefined)).toBe(false);
  });
});

describe('the token set reads the package\'s built-in maps at run time', () => {
  it('builtinTheme returns the package\'s three maps through the loader it was given', () => {
    const set = loadTokenSet(path.resolve(__dirname, '../../tokens'), jestTsModuleLoader);
    expect(Object.keys(set.builtinTheme('dark')).length).toBeGreaterThan(5);
    expect(set.builtinTheme('wcag')['color.action.primary']).toBeDefined();
    expect(Object.keys(set.builtinTheme('dark-wcag'))).toEqual(expect.arrayContaining(['color.action.navigation']));
  });
});
