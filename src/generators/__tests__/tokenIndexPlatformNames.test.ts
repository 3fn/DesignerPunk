/**
 * @category evergreen
 * @purpose Every platform name in the committed token index is defined in that platform's
 * generated output. `get_token_details` serves the index's `platforms` block as the token's
 * names, and the name sweeps check names against the index, so a name the output does not
 * carry is a false claim that passes every check downstream of it
 * (`.kiro/issues/2026-10-26-token-index-platform-names-not-emitted.md`, plan items 2 and 5).
 *
 * The generated output is produced here, from the repo's own token source, into a temporary
 * directory, so the test does not depend on a stale `dist/`. The index read is the committed
 * `token-index/`, the one that ships.
 *
 * The rule, per platform:
 * - web: a name passes when `DesignTokens.web.css` or `ComponentTokens.web.css` declares it.
 * - iOS / Android, primitive and semantic rows: a bare name passes when it is a member of
 *   `DesignTokens` (nested members as `Type.member`, e.g. `Duration.duration150`,
 *   `MotionFloatLabel.duration`). On iOS the member must also be `public`, and so must every
 *   type that encloses it: a member written without `public` is internal, unreadable from
 *   another module (`.kiro/issues/2026-10-26-ios-designtokens-members-not-public.md`, plan
 *   item 2; Spec 129 Task 8.3). A `theme.<name>` passes when the token is in the set the native
 *   generators leave out of `DesignTokens` for the theme types (`nativeThemeVaryingTokens`) and
 *   `<name>` is not a `DesignTokens` member. Those theme types are not emitted yet
 *   (`.kiro/issues/2026-06-28-spec-094-platform-theme-emission-unwired.md`, Spec 129); when they
 *   are, this rule checks `theme.<name>` against the emitted theme type instead.
 * - iOS / Android, component rows: `<Component>Tokens.<member>` is declared in
 *   `ComponentTokens.ios.swift` / `ComponentTokens.android.kt`; on iOS it is `public` too.
 * - `null` (the platform carries no name for the token) passes only with a `platformNotes`
 *   entry for that platform.
 *
 * This is row 9's interim instrument (Requirement 6.2): it retires in the PR where Stage P of
 * `harness-ios-tokens` first prints a full read count, because the probe reads every index name
 * from another module and an internal member fails it there.
 *
 * Bite (recorded in the PR): put back the stem for a composite (`platforms.web:
 * '--typography-body-md'` in `generateTokenIndex.ts`), or the base-scoped flag as the source of
 * the native `theme.` prefix, then regenerate: this suite goes red, naming the rows.
 */

jest.mock('../../cli/loadComponentTokens', () => {
  const actual = jest.requireActual('../../cli/loadComponentTokens');
  const { jestTsModuleLoader } = jest.requireActual('../../__tests__/helpers/tsModuleLoader');
  return { ...actual, loadComponentTokens: (config: unknown) => actual.loadComponentTokens(config, jestTsModuleLoader) };
});

import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import * as yaml from 'js-yaml';
import { loadConfig } from '../../config/ConfigLoader';
import { jestConfigModuleLoader } from '../../__tests__/helpers/configModuleLoader';
import { jestTsModuleLoader } from '../../__tests__/helpers/tsModuleLoader';
import { generateTokenFiles } from '../generateTokenFiles';
import { TokenFileGenerator } from '../TokenFileGenerator';
import { resolveTokens } from '../../cli/resolveTokens';
import { loadComponentTokens } from '../../cli/loadComponentTokens';
import { ComponentTokenRegistry } from '../../registries/ComponentTokenRegistry';

const REPO_ROOT = path.resolve(__dirname, '../../..');
const INDEX_DIR = path.join(REPO_ROOT, 'token-index');

type Platform = 'web' | 'ios' | 'android';
const PLATFORMS: Platform[] = ['web', 'ios', 'android'];
type Tier = 'primitives' | 'semantics' | 'components';

interface IndexRow {
  platforms?: Partial<Record<Platform, string | string[] | null>>;
  platformNotes?: Partial<Record<Platform, string>>;
}

function loadIndex(tier: Tier): Record<string, IndexRow> {
  const doc = yaml.load(fs.readFileSync(path.join(INDEX_DIR, `${tier}.yaml`), 'utf8')) as { tokens?: Record<string, IndexRow> };
  return doc.tokens ?? {};
}

/** Custom properties a stylesheet declares. */
function cssDeclarations(css: string): Set<string> {
  return new Set([...css.matchAll(/^\s*(--[A-Za-z0-9_-]+)\s*:/gm)].map(m => m[1]));
}

/**
 * Members a Swift or Kotlin file declares, by dotted path from the top-level type
 * (`DesignTokens.colorTextDefault`, `DesignTokens.Duration.duration150`, `AvatarTokens.sizeXs`),
 * each mapped to whether it is readable from another module: Swift, the member and every type
 * that encloses it written `public`; Kotlin, always `true` (a Kotlin member is public unless
 * marked otherwise). Brace depth decides nesting; comments are stripped first.
 */
function nativeMembers(source: string, lang: 'swift' | 'kotlin'): Map<string, boolean> {
  const typeRe = lang === 'swift'
    ? /^\s*(public\s+)?(?:struct|enum|class|extension)\s+(\w+)/
    : /^\s*(?:object|class|data class|enum class)\s+(\w+)/;
  const memberRe = lang === 'swift'
    ? /^\s*(public\s+)?static\s+(?:let|var)\s+(\w+)/
    : /^\s*(?:const\s+)?val\s+(\w+)/;
  const out = new Map<string, boolean>();
  const stack: Array<{ name: string; isPublic: boolean } | null> = [];
  for (const raw of source.split('\n')) {
    const line = raw.replace(/\/\*.*?\*\//g, '').replace(/\/\/.*$/, '');
    const owners = stack.filter((s): s is { name: string; isPublic: boolean } => s !== null);
    const member = line.match(memberRe);
    if (member && owners.length > 0) {
      const memberPublic = lang === 'swift' ? member[1] !== undefined : true;
      out.set([...owners.map(o => o.name), member[lang === 'swift' ? 2 : 1]].join('.'), memberPublic && owners.every(o => o.isPublic));
    }
    const opens = (line.match(/\{/g) ?? []).length;
    const closes = (line.match(/\}/g) ?? []).length;
    const type = line.match(typeRe);
    if (type && opens > closes) {
      stack.push(lang === 'swift'
        ? { name: type[2], isPublic: type[1] !== undefined }
        : { name: type[1], isPublic: true });
      for (let i = 1; i < opens - closes; i++) stack.push(null);
      continue;
    }
    for (let i = 0; i < opens; i++) stack.push(null);
    for (let i = 0; i < closes; i++) stack.pop();
  }
  return out;
}

/** The `DesignTokens.` members with the prefix removed — the index's spelling. */
function designTokensMembers(all: Map<string, boolean>): Map<string, boolean> {
  return new Map(
    [...all].filter(([n]) => n.startsWith('DesignTokens.')).map(([n, v]) => [n.slice('DesignTokens.'.length), v] as [string, boolean]),
  );
}

describe('token index platform names are defined in the generated output', () => {
  let tmpDir: string;
  let web: Set<string>;
  let iosDesign: Map<string, boolean>;
  let androidDesign: Map<string, boolean>;
  let iosComponent: Map<string, boolean>;
  let androidComponent: Map<string, boolean>;
  let nativeThemeVarying: Set<string>;
  const index = { primitives: loadIndex('primitives'), semantics: loadIndex('semantics'), components: loadIndex('components') };

  beforeAll(async () => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dp-index-names-'));
    jest.spyOn(console, 'log').mockImplementation(() => undefined);

    // The repo's own config (its token source and component roots), writing to a temporary directory.
    const config = { ...(await loadConfig(REPO_ROOT, jestConfigModuleLoader)), outputDir: tmpDir };
    ComponentTokenRegistry.clear();
    loadComponentTokens(config);
    const modeResolved = generateTokenFiles(resolveTokens(config, jestTsModuleLoader), config);
    nativeThemeVarying = modeResolved.nativeThemeVaryingTokens;
    const componentFiles = new TokenFileGenerator().generateComponentTokens({ outputDir: config.outputDir });
    const componentContent = (platform: Platform) => {
      const result = componentFiles.find(r => r.platform === platform);
      if (!result) throw new Error(`no ${platform} component token output`);
      return result.content;
    };

    const read = (f: string) => fs.readFileSync(path.join(config.outputDir, f), 'utf8');
    web = new Set([...cssDeclarations(read('DesignTokens.web.css')), ...cssDeclarations(componentContent('web'))]);
    iosDesign = designTokensMembers(nativeMembers(read('DesignTokens.ios.swift'), 'swift'));
    androidDesign = designTokensMembers(nativeMembers(read('DesignTokens.android.kt'), 'kotlin'));
    iosComponent = nativeMembers(componentContent('ios'), 'swift');
    androidComponent = nativeMembers(componentContent('android'), 'kotlin');
  });

  afterAll(() => {
    fs.rmSync(tmpDir, { recursive: true, force: true });
    jest.restoreAllMocks();
  });

  it('reads non-empty output and a non-empty index (the oracle is not vacuous)', () => {
    expect(web.size).toBeGreaterThan(500);
    expect(iosDesign.size).toBeGreaterThan(300);
    expect(androidDesign.size).toBeGreaterThan(300);
    expect(iosComponent.size).toBeGreaterThan(20);
    expect(androidComponent.size).toBeGreaterThan(20);
    expect(nativeThemeVarying.size).toBeGreaterThan(0);
    expect(Object.keys(index.semantics).length).toBeGreaterThan(150);
    // The parser reads nested native members, the shape the motion composites use.
    expect(iosDesign.has('MotionFloatLabel.duration')).toBe(true);
    expect(androidDesign.has('MotionFloatLabel.duration')).toBe(true);
  });

  /** Every name of every row that is not defined where the rule says it must be. */
  function undefinedNames(tier: Tier): string[] {
    const failures: string[] = [];
    for (const [token, row] of Object.entries(index[tier])) {
      for (const platform of PLATFORMS) {
        const value = row.platforms?.[platform];
        if (value === null) {
          if (!row.platformNotes?.[platform]) failures.push(`${token} ${platform}: null without a platformNotes entry`);
          continue;
        }
        if (value === undefined) {
          failures.push(`${token} ${platform}: no name and no null`);
          continue;
        }
        for (const name of Array.isArray(value) ? value : [value]) {
          if (platform === 'web') {
            if (!web.has(name)) failures.push(`${token} web: ${name} is not declared`);
            continue;
          }
          if (tier === 'components') {
            const declared = platform === 'ios' ? iosComponent : androidComponent;
            if (!declared.has(name)) failures.push(`${token} ${platform}: ${name} is not declared`);
            else if (platform === 'ios' && !declared.get(name)) failures.push(`${token} ios: ${name} is not a public member of a public type`);
            continue;
          }
          const members = platform === 'ios' ? iosDesign : androidDesign;
          if (name.startsWith('theme.')) {
            const bare = name.slice('theme.'.length);
            if (!nativeThemeVarying.has(token)) failures.push(`${token} ${platform}: ${name}, but the native generators keep the token in DesignTokens`);
            else if (members.has(bare)) failures.push(`${token} ${platform}: ${name}, but DesignTokens declares ${bare}`);
          } else if (!members.has(name)) {
            failures.push(`${token} ${platform}: ${name} is not a DesignTokens member`);
          } else if (platform === 'ios' && !members.get(name)) {
            failures.push(`${token} ios: ${name} is not a public member of a public type`);
          }
        }
      }
    }
    return failures;
  }

  it('primitives.yaml', () => {
    expect(undefinedNames('primitives')).toEqual([]);
  });

  it('semantics.yaml', () => {
    expect(undefinedNames('semantics')).toEqual([]);
  });

  it('components.yaml', () => {
    expect(undefinedNames('components')).toEqual([]);
  });

  it('a token the native generators leave out of DesignTokens has a theme. name on iOS and Android', () => {
    const missing = [...nativeThemeVarying]
      .filter(token => index.semantics[token])
      .flatMap(token => (['ios', 'android'] as const)
        .filter(p => !String(index.semantics[token].platforms?.[p]).startsWith('theme.'))
        .map(p => `${token} ${p}: ${index.semantics[token].platforms?.[p]}`));
    expect(missing).toEqual([]);
  });
});
