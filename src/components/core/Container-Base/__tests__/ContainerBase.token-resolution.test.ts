/**
 * @category evergreen
 * @purpose Resolve-guard: every CSS custom property the Container family emits exists in
 *          the generated token index.
 *
 * Container-Base and Container-Card-Base build CSS variable names at runtime from token-name
 * maps (tokenToCssVar / getPropertyValue). A map value that is not a registered token name —
 * or a name→variable rule that diverges from the generator — emits a `var(--…)` that
 * resolves to nothing, and the style fails silently. That shipped: `--border-border-*`,
 * `--zIndex-*` and `--color-border` were emitted, and the unit tests pinned the broken
 * strings (text assertions, not resolution). This guard checks resolution instead.
 *
 * Oracle: the committed token index (`token-index/*.yaml`), whose `platforms.web` names are
 * the custom properties the web generator emits (DesignTokens.web.css / ComponentTokens.web.css).
 *
 * Bite (recorded in the PR): revert `borderTokenMap.default` to 'border.border.default', or
 * restore the dots-only rule in tokenToCssCustomProperty → this suite goes red.
 *
 * Imports go through the component barrels so the guard is independent of the maps' filenames.
 */

import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'js-yaml';
import { tokenToCssCustomProperty, tokenToCssVar } from '../platforms/web/token-mapping';
import {
  paddingTokenMap,
  borderTokenMap,
  borderRadiusTokenMap,
  layeringTokenMap,
  BORDER_COLOR_TOKEN
} from '../index';
import {
  cardPaddingTokenMap,
  cardVerticalPaddingTokenMap,
  cardHorizontalPaddingTokenMap,
  cardBackgroundTokenMap,
  cardShadowTokenMap,
  cardBorderTokenMap,
  cardBorderColorTokenMap,
  cardBorderRadiusTokenMap,
  cardDefaultTokens
} from '../../Container-Card-Base/index';

const REPO_ROOT = path.resolve(__dirname, '../../../../..');
const INDEX_DIR = path.join(REPO_ROOT, 'token-index');

type IndexEntry = { platforms?: { web?: string } };

function loadIndex(file: string): Record<string, IndexEntry> {
  const doc = yaml.load(fs.readFileSync(path.join(INDEX_DIR, file), 'utf8')) as {
    tokens?: Record<string, IndexEntry>;
  };
  return doc.tokens ?? {};
}

const semantic = loadIndex('semantics.yaml');
const primitive = loadIndex('primitives.yaml');
const component = loadIndex('components.yaml');

/** Every custom property the generator emits for a registered token. */
const GENERATED_WEB_NAMES: Set<string> = new Set(
  [semantic, primitive, component]
    .flatMap(tokens => Object.values(tokens))
    .map(entry => entry.platforms?.web)
    .filter((web): web is string => typeof web === 'string')
);

/** Token names fed into CSS-variable construction by the Container family (closed sets). */
function emittedTokenNames(): Array<{ source: string; token: string }> {
  const out: Array<{ source: string; token: string }> = [];
  const add = (source: string, map: Record<string, string>) => {
    for (const [key, token] of Object.entries(map)) {
      if (token) out.push({ source: `${source}.${key}`, token });
    }
  };
  add('paddingTokenMap', paddingTokenMap);
  add('borderTokenMap', borderTokenMap);
  add('borderRadiusTokenMap', borderRadiusTokenMap);
  add('layeringTokenMap.web', layeringTokenMap.web);
  out.push({ source: 'BORDER_COLOR_TOKEN', token: BORDER_COLOR_TOKEN });
  add('cardPaddingTokenMap', cardPaddingTokenMap);
  add('cardVerticalPaddingTokenMap', cardVerticalPaddingTokenMap);
  add('cardHorizontalPaddingTokenMap', cardHorizontalPaddingTokenMap);
  add('cardBackgroundTokenMap', cardBackgroundTokenMap);
  add('cardShadowTokenMap', cardShadowTokenMap);
  add('cardBorderTokenMap', cardBorderTokenMap);
  add('cardBorderColorTokenMap', cardBorderColorTokenMap);
  add('cardBorderRadiusTokenMap', cardBorderRadiusTokenMap);
  add('cardDefaultTokens', cardDefaultTokens as unknown as Record<string, string>);
  return out;
}

/** Literal `getPropertyValue('--…')` fallbacks in the family's web sources. */
function literalPropertyReads(): Array<{ file: string; name: string }> {
  const files = [
    path.join(REPO_ROOT, 'src/components/core/Container-Base/platforms/web/ContainerBase.web.ts'),
    path.join(REPO_ROOT, 'src/components/core/Container-Card-Base/platforms/web/ContainerCardBase.web.ts')
  ];
  const out: Array<{ file: string; name: string }> = [];
  for (const file of files) {
    const src = fs.readFileSync(file, 'utf8');
    for (const m of src.matchAll(/getPropertyValue\(\s*['"`](--[a-z0-9-]+)['"`]\s*\)/g)) {
      out.push({ file: path.relative(REPO_ROOT, file), name: m[1] });
    }
  }
  return out;
}

describe('Container family — emitted CSS custom properties resolve (resolve-guard)', () => {
  it('reads a non-trivial token index (the oracle is not empty)', () => {
    // A silently-empty oracle would make every membership check below vacuous.
    expect(Object.keys(semantic).length).toBeGreaterThan(100);
    expect(GENERATED_WEB_NAMES.size).toBeGreaterThan(300);
  });

  it('tokenToCssCustomProperty reproduces the generator name for every indexed token', () => {
    const mismatches: string[] = [];
    let checked = 0;
    for (const tokens of [semantic, primitive]) {
      for (const [name, entry] of Object.entries(tokens)) {
        const web = entry.platforms?.web;
        if (!web) continue;
        checked++;
        const derived = tokenToCssCustomProperty(name);
        if (derived !== web) mismatches.push(`${name}: derived ${derived}, generator ${web}`);
      }
    }
    expect(checked).toBeGreaterThan(300);
    expect(mismatches).toEqual([]);
  });

  it('every closed-set token name the family emits resolves to a generated custom property', () => {
    const entries = emittedTokenNames();
    expect(entries.length).toBeGreaterThan(20);
    const unresolved = entries
      .map(({ source, token }) => ({ source, token, cssVar: tokenToCssCustomProperty(token) }))
      .filter(({ cssVar }) => !GENERATED_WEB_NAMES.has(cssVar))
      .map(({ source, token, cssVar }) => `${source} = '${token}' → ${cssVar}`);
    expect(unresolved).toEqual([]);
  });

  it('tokenToCssVar wraps exactly the resolved custom property', () => {
    for (const { token } of emittedTokenNames()) {
      expect(tokenToCssVar(token)).toBe(`var(${tokenToCssCustomProperty(token)})`);
    }
  });

  it('every literal getPropertyValue fallback in the family resolves', () => {
    const reads = literalPropertyReads();
    expect(reads.length).toBeGreaterThan(0);
    const unresolved = reads
      .filter(({ name }) => !GENERATED_WEB_NAMES.has(name))
      .map(({ file, name }) => `${file}: ${name}`);
    expect(unresolved).toEqual([]);
  });
});
