/**
 * @category evergreen
 * @purpose Generation reads the token source through the one TokenSet `generate` passes it, so no
 *          file under `src/generators`, `src/providers`, `src/resolvers` and `src/blend` may
 *          import `src/tokens` for a value (Spec 129 U9, design § 10 "The six groups"; Req 9.2).
 *
 * A value import is an `import` that is not type-only, an `export ... from`, a dynamic `import()`
 * or a `require()` that resolves into `src/tokens`. `import type` and `typeof import('...')` are
 * types and carry no value. The ALLOWED list below is the set U9 leaves, each with the reason; a
 * file not on it that gains a value import fails this test, and a file on it that loses its last
 * one must leave the list (so the list only shrinks).
 */
import * as fs from 'fs';
import * as path from 'path';
import * as ts from 'typescript';

const SRC = path.resolve(__dirname, '..', '..');
const TOKENS = path.join(SRC, 'tokens');
const GUARDED_DIRS = ['generators', 'providers', 'resolvers', 'blend'];

/** Files that still import `src/tokens` for values after U9, with why. Shrinks only. */
const ALLOWED: Record<string, string> = {
  'blend/BlendCalculator.ts': 'the blend runtime utility (BlendDirection); `generate` never loads it (BlendUtilityGenerator emits source text)',
  'generators/BlendValueGenerator.ts': 'not constructed by `generate`; reads the package blend primitives for the repository build',
  'generators/ResponsiveGridGenerator.ts': 'not constructed by `generate`; reads the package breakpoint and grid tokens for the repository build',
  'providers/WebUnitConverter.ts': 'a unit provider the translation layer uses; `generate` never constructs it',
  'generators/generateTokenFiles.ts': 'the built-in override maps, until Task 14.2 reads them by registration',
};

export function valueImportsOf(file: string, text: string): string[] {
  const found: string[] = [];
  const sf = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true);
  const hit = (spec: string): void => {
    if (!spec.startsWith('.')) return;
    const abs = path.resolve(path.dirname(file), spec);
    if (abs === TOKENS || abs.startsWith(TOKENS + path.sep)) found.push(path.relative(TOKENS, abs) || 'index');
  };
  const visit = (n: ts.Node): void => {
    if (ts.isImportDeclaration(n) && ts.isStringLiteral(n.moduleSpecifier)) {
      const ic = n.importClause;
      const named = ic?.namedBindings && ts.isNamedImports(ic.namedBindings) ? ic.namedBindings.elements : [];
      const typeOnly = !!ic && (ic.isTypeOnly || (!ic.name && named.length > 0 && named.every(e => e.isTypeOnly)));
      if (!typeOnly) hit(n.moduleSpecifier.text);
    } else if (ts.isExportDeclaration(n) && n.moduleSpecifier && !n.isTypeOnly && ts.isStringLiteral(n.moduleSpecifier)) {
      hit(n.moduleSpecifier.text);
    } else if (ts.isCallExpression(n) && n.arguments[0] && ts.isStringLiteralLike(n.arguments[0])) {
      if (n.expression.kind === ts.SyntaxKind.ImportKeyword) hit(n.arguments[0].text);
      else if (ts.isIdentifier(n.expression) && n.expression.text === 'require') hit(n.arguments[0].text);
    }
    ts.forEachChild(n, visit);
  };
  visit(sf);
  return found;
}

function files(dir: string, out: string[] = []): string[] {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) { if (e.name !== '__tests__' && e.name !== 'node_modules') files(p, out); }
    else if (/\.ts$/.test(e.name) && !/\.(d|test)\.ts$/.test(e.name)) out.push(p);
  }
  return out;
}

describe('no value import of src/tokens in generation code (Spec 129 U9, Req 9.2)', () => {
  const observed = new Map<string, string[]>();
  for (const d of GUARDED_DIRS) {
    for (const f of files(path.join(SRC, d))) {
      const mods = valueImportsOf(f, fs.readFileSync(f, 'utf8'));
      if (mods.length) observed.set(path.relative(SRC, f).split(path.sep).join('/'), mods);
    }
  }

  it('only the files on the allowed list import src/tokens for a value', () => {
    const unexpected = [...observed].filter(([f]) => !(f in ALLOWED)).map(([f, m]) => `${f} -> ${m.join(', ')}`);
    expect(unexpected).toEqual([]);
  });

  it('every file on the allowed list still has such an import (the list only shrinks)', () => {
    expect(Object.keys(ALLOWED).filter(f => !observed.has(f))).toEqual([]);
  });

  describe('the scanner (bite)', () => {
    const at = path.join(SRC, 'generators', 'X.ts');
    it('counts a value import, an export-from, a dynamic import and a require', () => {
      expect(valueImportsOf(at, "import { a } from '../tokens/ColorTokens';")).toEqual(['ColorTokens']);
      expect(valueImportsOf(at, "export { a } from '../tokens/semantic';")).toEqual(['semantic']);
      expect(valueImportsOf(at, "const m = import('../tokens/color');")).toEqual(['color']);
      expect(valueImportsOf(at, "const m = require('../tokens');")).toEqual(['index']);
    });
    it('does not count a type import or a typeof import()', () => {
      expect(valueImportsOf(at, "import type { A } from '../tokens/ColorTokens';")).toEqual([]);
      expect(valueImportsOf(at, "import { type A } from '../tokens/ColorTokens';")).toEqual([]);
      expect(valueImportsOf(at, "type T = typeof import('../tokens/color');")).toEqual([]);
    });
  });
});
