/**
 * Token read-site inventory (release-4 rulings items 25 + 27, "PR 0").
 *
 * `generate` loads the consumer's COPIED token source only through `resolveTokens`. Every other
 * non-type import of `src/tokens/**` in pipeline code is a read of the PACKAGE's tokens: editing
 * that part of the consumer's copy does not change output. This test pins the full set of such
 * sites to a committed ledger, so a site cannot be added or removed without the ledger (and so
 * the known-limitation wording) being revisited.
 *
 * Ledger: ./fixtures/token-read-sites.json — one row per file: the `src/tokens` modules it
 * reads, the token part they cover, and whether `generate` reaches the file (`generateReach`).
 * Limitation record: .kiro/issues/2026-10-15-123-palette-read-from-package.md
 *
 * To update after an intended change: copy the "observed" rows from the failure message into the
 * ledger, fill `part`/`generateReach`, and correct the Known limitations wording to match.
 */
import * as fs from 'fs';
import * as path from 'path';
import * as ts from 'typescript';

const SRC = path.resolve(__dirname, '..', '..');
const TOKENS = path.join(SRC, 'tokens');
// Token source and component code are not pipeline readers; fixtures/tests are not shipped.
const SKIP_DIRS = new Set(['tokens', 'components', '__tests__', 'node_modules']);

interface LedgerRow { file: string; modules: string[]; part: string; generateReach: string }

function sourceFiles(dir: string, out: string[] = []): string[] {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) { if (!SKIP_DIRS.has(e.name)) sourceFiles(p, out); }
    else if (/\.tsx?$/.test(e.name) && !/\.(d|test)\.tsx?$/.test(e.name)) out.push(p);
  }
  return out;
}

/** Non-type static imports, re-exports and require() calls that resolve into src/tokens. */
function tokenModulesRead(file: string): string[] {
  const found = new Set<string>();
  const hit = (spec: string) => {
    if (!spec.startsWith('.')) return;
    const abs = path.resolve(path.dirname(file), spec);
    if (abs === TOKENS || abs.startsWith(TOKENS + path.sep)) found.add(path.relative(TOKENS, abs) || 'index');
  };
  const sf = ts.createSourceFile(file, fs.readFileSync(file, 'utf8'), ts.ScriptTarget.Latest, true);
  const visit = (n: ts.Node): void => {
    if (ts.isImportDeclaration(n) && ts.isStringLiteral(n.moduleSpecifier)) {
      const ic = n.importClause;
      const named = ic?.namedBindings && ts.isNamedImports(ic.namedBindings) ? ic.namedBindings.elements : [];
      const typeOnly = !!ic && (ic.isTypeOnly || (!ic.name && named.length > 0 && named.every(e => e.isTypeOnly)));
      if (!typeOnly) hit(n.moduleSpecifier.text);
    } else if (ts.isExportDeclaration(n) && n.moduleSpecifier && !n.isTypeOnly && ts.isStringLiteral(n.moduleSpecifier)) {
      hit(n.moduleSpecifier.text);
    } else if (ts.isCallExpression(n) && ts.isIdentifier(n.expression) && n.expression.text === 'require'
      && n.arguments[0] && ts.isStringLiteral(n.arguments[0])) {
      hit(n.arguments[0].text);
    }
    ts.forEachChild(n, visit);
  };
  visit(sf);
  return [...found].sort();
}

function observed(): Array<Pick<LedgerRow, 'file' | 'modules'>> {
  return sourceFiles(SRC)
    .map(f => ({ file: path.relative(path.dirname(SRC), f).split(path.sep).join('/'), modules: tokenModulesRead(f) }))
    .filter(r => r.modules.length > 0)
    .sort((a, b) => a.file.localeCompare(b.file));
}

describe('token read-site inventory (package reads in pipeline code)', () => {
  const ledger: { rows: LedgerRow[] } = JSON.parse(
    fs.readFileSync(path.join(__dirname, 'fixtures', 'token-read-sites.json'), 'utf8'));
  const seen = observed();
  const fmt = (r: { file: string; modules: string[] }) => `${r.file} -> ${r.modules.join(', ')}`;

  it('every read site matches the ledger exactly (no site added or removed unrecorded)', () => {
    const want = new Set(ledger.rows.map(fmt));
    const got = new Set(seen.map(fmt));
    const added = [...got].filter(x => !want.has(x));
    const removed = [...want].filter(x => !got.has(x));
    if (added.length || removed.length) {
      throw new Error(
        'Package token read sites changed without a ledger update.\n' +
        `  added/changed (not in ledger):\n    ${added.join('\n    ') || '(none)'}\n` +
        `  removed/changed (ledger only):\n    ${removed.join('\n    ') || '(none)'}\n` +
        `  observed rows:\n${JSON.stringify(seen, null, 2)}\n` +
        'Update src/generators/__tests__/fixtures/token-read-sites.json, then correct the CHANGELOG ' +
        'Known limitations wording and .kiro/issues/2026-10-15-123-palette-read-from-package.md.');
    }
  });

  it('every ledger row names the token part it covers and its generate reachability', () => {
    for (const r of ledger.rows) {
      expect(r.part.trim()).not.toBe('');
      expect(r.generateReach.trim()).not.toBe('');
    }
  });
});
