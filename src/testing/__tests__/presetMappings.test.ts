/**
 * The Jest preset's `@3fn/core/*` mappings resolve to files the package ships.
 *
 * In-repo half of the guard for .kiro/issues/2026-10-03-jest-preset-maps-unshipped-source.md.
 * The packed-install half (a consumer test importing `@3fn/core/testing` and a token file
 * rewritten to `@3fn/core/types`, both run under the preset) is in
 * tests/consumer-integration.test.ts, run by `npm run test:consumer`.
 */

import * as path from 'path';
import { MAPPED_SUBPATHS, exportTarget, subpathMappings } from '../presetMappings';

const REPO_ROOT = path.resolve(__dirname, '../../..');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const pkg = require(path.join(REPO_ROOT, 'package.json'));
// eslint-disable-next-line @typescript-eslint/no-var-requires
const preset = require('../jest-preset');

describe('jest preset — @3fn/core subpath mappings', () => {
  it('maps every subpath to the file package.json exports serves to require', () => {
    const mapper: Record<string, string> = preset.moduleNameMapper;
    for (const subpath of MAPPED_SUBPATHS) {
      expect(mapper[`^@3fn/core/${subpath}$`]).toBe(path.join(REPO_ROOT, pkg.exports[`./${subpath}`].require));
    }
  });

  it('maps no subpath into src/ (the package ships no src/**/index.ts for them)', () => {
    // BITE: restoring any pre-2026-10-13 mapping, e.g. path.join(pkgRoot, 'src/testing/index.ts'), turns this red.
    const mapper: Record<string, string> = preset.moduleNameMapper;
    const targets = Object.entries(mapper)
      .filter(([pattern]) => pattern.startsWith('^@3fn/core/'))
      .map(([, t]) => path.relative(REPO_ROOT, t).split(path.sep).join('/'));
    expect(targets).toHaveLength(MAPPED_SUBPATHS.length);
    expect(Object.keys(subpathMappings(REPO_ROOT)).sort()).toEqual(MAPPED_SUBPATHS.map((s) => `^@3fn/core/${s}$`).sort());
    for (const target of targets) {
      expect(target).toMatch(/^dist\/.+\.js$/);
      expect(target).not.toMatch(/__tests__/);
    }
  });

  it('keeps the CSS mock as the first mapping, so a .css import never reaches a subpath rule', () => {
    expect(Object.keys(preset.moduleNameMapper)[0]).toBe('\\.css$');
  });

  it('reads a string export entry as its own target', () => {
    expect(exportTarget({ './types': './dist/types/index.js' }, 'types')).toBe('./dist/types/index.js');
  });

  it('fails loudly, naming the subpath, when exports has no require target', () => {
    expect(() => exportTarget({}, 'testing')).toThrow('no require target for "./testing"');
    expect(() => exportTarget({ './testing': { import: './dist/testing/index.mjs' } }, 'testing')).toThrow(
      '@3fn/core/jest-preset'
    );
  });
});
