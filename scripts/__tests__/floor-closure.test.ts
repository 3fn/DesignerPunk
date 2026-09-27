/**
 * Tests for `floor-closure.ts` (Spec 123 Task 3; design.md § "C5"; Req 4.1–4.7,
 * 3.9). Exercises the exported pure functions AND runs both closures over the
 * REAL repo tree (Task 2's convention — see `transforms.test.ts`'s "over the
 * REAL repo tree" tests) so the reconciliation against Ada's R2 measurement
 * (16 files: src/types×2, src/build/tokens×10, src/registries×2,
 * src/constants×1, src/build/types×1) is a live, re-runnable assertion, not a
 * one-time completion-doc claim.
 */

import { extractSpecifiers, walkNonTestTsFiles, computeClosure2, computeClosure1, resolveRelativeSpecifier } from '../floor-closure';
import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';

const PROJECT_ROOT = path.resolve(__dirname, '..', '..');

describe('extractSpecifiers', () => {
  it('follows a plain `import ... from` specifier', () => {
    const refs = extractSpecifiers(`import { X } from '../foo';`);
    expect(refs).toEqual([{ specifier: '../foo', kind: 'import-export' }]);
  });

  it('SKIPS a whole-declaration `import type ... from` specifier (Req 4.2: non-import-type)', () => {
    const refs = extractSpecifiers(`import type { X } from '../foo';`);
    expect(refs).toEqual([]);
  });

  it('SKIPS a whole-declaration `export type { X } from` re-export', () => {
    const refs = extractSpecifiers(`export type { X } from '../foo';`);
    expect(refs).toEqual([]);
  });

  it('does NOT skip a MIXED per-specifier import (`{ type X, Y }`) — Y is a value, so the whole statement is a real require()', () => {
    const refs = extractSpecifiers(`import { type X, Y } from '../foo';`);
    expect(refs).toEqual([{ specifier: '../foo', kind: 'import-export' }]);
  });

  it('follows require() calls anywhere in the file, including inside function bodies (Req 4.2 GAP 1 — dynamic requires)', () => {
    const refs = extractSpecifiers(`
      function f() {
        const { x } = require('./ZIndexTokens');
      }
    `);
    expect(refs).toEqual([{ specifier: './ZIndexTokens', kind: 'require' }]);
  });

  it('follows dynamic import()', () => {
    const refs = extractSpecifiers(`const m = await import('./lazy');`);
    expect(refs).toEqual([{ specifier: './lazy', kind: 'dynamic-import' }]);
  });

  it('records bare specifiers alongside relative ones', () => {
    const refs = extractSpecifiers(`import { x } from 'some-package';\nimport { y } from './local';`);
    expect(refs).toEqual([
      { specifier: 'some-package', kind: 'import-export' },
      { specifier: './local', kind: 'import-export' },
    ]);
  });

  it('ignores specifier-shaped text inside a block comment (Req 4.2 GAP 2 — docblock forms, e.g. defineComponentTokens.ts\'s @example)', () => {
    const refs = extractSpecifiers(`
      /**
       * import { defineComponentTokens } from '../../../build/tokens/defineComponentTokens';
       */
      import { real } from './actual';
    `);
    expect(refs).toEqual([{ specifier: './actual', kind: 'import-export' }]);
  });

  it('ignores specifier-shaped text inside a line comment', () => {
    const refs = extractSpecifiers(`// import { x } from '../fake';\nimport { y } from './real';`);
    expect(refs).toEqual([{ specifier: './real', kind: 'import-export' }]);
  });
});

describe('walkNonTestTsFiles', () => {
  const scratch = fs.mkdtempSync(path.join(os.tmpdir(), 'dp-floor-closure-walk-'));
  afterAll(() => fs.rmSync(scratch, { recursive: true, force: true }));

  it('excludes __tests__ directories and .test.ts files', () => {
    fs.mkdirSync(path.join(scratch, '__tests__'), { recursive: true });
    fs.writeFileSync(path.join(scratch, 'real.ts'), '');
    fs.writeFileSync(path.join(scratch, 'real.test.ts'), '');
    fs.writeFileSync(path.join(scratch, '__tests__', 'nested.ts'), '');

    const files = walkNonTestTsFiles(scratch).map((f) => path.relative(scratch, f));
    expect(files).toEqual(['real.ts']);
  });
});

describe('resolveRelativeSpecifier', () => {
  const scratch = fs.mkdtempSync(path.join(os.tmpdir(), 'dp-floor-closure-resolve-'));
  afterAll(() => fs.rmSync(scratch, { recursive: true, force: true }));

  it('resolves an exact file, then .ts, then /index.ts', () => {
    fs.writeFileSync(path.join(scratch, 'exact.ts'), '');
    fs.mkdirSync(path.join(scratch, 'dir'));
    fs.writeFileSync(path.join(scratch, 'dir', 'index.ts'), '');
    const fromFile = path.join(scratch, 'from.ts');

    expect(resolveRelativeSpecifier(fromFile, './exact')).toBe(path.join(scratch, 'exact.ts'));
    expect(resolveRelativeSpecifier(fromFile, './dir')).toBe(path.join(scratch, 'dir', 'index.ts'));
    expect(resolveRelativeSpecifier(fromFile, './nope')).toBeNull();
  });
});

describe('computeClosure2 — over the REAL repo tree (reconciled against Ada\'s R2 measurement)', () => {
  it('reproduces exactly the 16-file closure, by directory bucket, with zero bare specifiers', () => {
    const result = computeClosure2();

    expect(result.totalFiles).toBe(16);
    expect(result.byDirectory).toEqual({
      'src/types': 2,
      'src/build/tokens': 10,
      'src/build/types': 1,
      'src/registries': 2,
      'src/constants': 1,
    });
    expect(result.bareSpecifiers).toEqual([]);
  });

  it('names the exact 16 files (identity, not just counts)', () => {
    const result = computeClosure2();
    expect(result.files.sort()).toEqual(
      [
        'src/types/PrimitiveToken.ts',
        'src/types/SemanticToken.ts',
        'src/build/tokens/ComponentToken.ts',
        'src/build/tokens/ComponentTokenGenerator.ts',
        'src/build/tokens/PlatformTokens.ts',
        'src/build/tokens/TokenIntegrator.ts',
        'src/build/tokens/TokenSelection.ts',
        'src/build/tokens/TokenSelector.ts',
        'src/build/tokens/UnitConverter.ts',
        'src/build/tokens/defineComponentTokens.ts',
        'src/build/tokens/index.ts',
        'src/build/tokens/types.ts',
        'src/build/types/Platform.ts',
        'src/registries/PrimitiveTokenRegistry.ts',
        'src/registries/SemanticTokenRegistry.ts',
        'src/constants/StrategicFlexibilityTokens.ts',
      ].sort(),
    );
  });
});

// Closure-2's own bite (drop a closure file from `package.json`'s `files[]`,
// re-run `npm pack`, confirm red, restore) is exercised at the pack-assert
// layer — see Task 3.3/3.6's completion doc — since closure-2's computation
// here is a pure function of the checked-in tree with no meaningful
// standalone "red" state to induce beyond re-running it.

describe('computeClosure1 — over the REAL repo tree (rewrite completeness over the transformed copy)', () => {
  it('reports zero escaping references over the current tree', () => {
    const result = computeClosure1();
    expect(result.zeroEscapes).toBe(true);
    expect(result.escapingReferences).toEqual([]);
    expect(result.filesChecked).toBeGreaterThan(0);
  });

  it('BITE: skipping the rewrite on component/progress.ts produces an escaping reference (proves the scan is live, not vacuous)', () => {
    const result = computeClosure1({ biteSkipFile: 'component/progress.ts' });
    expect(result.zeroEscapes).toBe(false);
    expect(result.escapingReferences.length).toBeGreaterThan(0);
    expect(result.escapingReferences[0].file).toBe('component/progress.ts');
  });
});
