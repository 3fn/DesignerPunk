#!/usr/bin/env tsx
/**
 * d2-check.ts — D2's set equality and its completeness half, over a scratch consumer
 * (Spec 129 Task 13.3; requirements.md Req 1.3 and 5.10; design § 9).
 *
 *   npx tsx scripts/harness/d2-check.ts --consumer <consumer root>
 *
 * It keeps the invocation contract in `.kiro/issues/2026-11-07-d2-check-step-grant.md` (as amended
 * by tasks amendment 12): stdout carries exactly three verdict lines, in this order, and nothing else;
 * everything else goes to stderr.
 *
 *   d2-check completeness: <PASS|FAIL> count=<n> <rest>
 *   d2-check ios: <PASS|FAIL> count=<n> <rest>
 *   d2-check android: <PASS|FAIL> count=<n> <rest>
 *
 * On a setup or usage error it prints instead the one line `d2-check: FAIL setup (<reason>)`.
 * Exit 0: all three PASS. Exit 1: any FAIL. Exit 2: setup or usage error (including an uncaught
 * error, which is turned into the setup line, so the script never exits silently).
 *
 * The design rule (Peter's F-4 ruling, 2026-11-08): every expected NAME comes from the consumer's index
 * (`token-index/components.yaml`, the `platforms.<p>` fields). Nothing here works a name out for the
 * platform halves, imports a generator or build module, or lists a definition file. The one exception
 * is the completeness half, which restates the index's `component.key` rule in one line (`indexNameOf`).
 * A directory walk is allowed, and a list is not: the walk has one root and one basename match.
 *
 * `count=<n>` is the number of expected names the line compared. A line with `count=0` is a FAIL: a check
 * that compared nothing has shown nothing.
 */
import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'js-yaml';

/** The one place the check looks for definition files: the package as installed in the consumer. */
const DEFINITION_ROOT = 'node_modules/@3fn/core/src/components/core/';
/** The walk's one admitted name pattern. */
const DEFINITION_FILE = /^([^.]+\.)?tokens\.ts$/;

class SetupError extends Error {}

type Platform = 'ios' | 'android';
type Verdict = { name: string; pass: boolean; count: number; rest: string };

interface IndexEntry {
  component?: string;
  source?: unknown;
  platforms?: Partial<Record<Platform, string | null>>;
}

/** The index's rule for a component token's name: the component lowercased, a dot, the key. */
const indexNameOf = (component: string, key: string): string => `${component.toLowerCase()}.${key}`;

const fail = (reason: string): never => { throw new SetupError(reason); };

function parseArgs(argv: string[]): string {
  let consumer: string | undefined;
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === '--consumer') {
      consumer = argv[++i];
      if (consumer === undefined || consumer.startsWith('--')) fail('--consumer needs a directory');
    } else fail(`unknown argument ${argv[i]}`);
  }
  return consumer ?? fail('--consumer <root> is required');
}

function readFile(file: string, what: string): string {
  try { return fs.readFileSync(file, 'utf-8'); } catch { return fail(`${what} is missing or unreadable: ${file}`); }
}

const unquote = (s: string): string => s.replace(/`/g, '');

/** Strip comments from source text (block comments, and line comments that start a line or follow whitespace). */
function stripComments(text: string): string {
  return text.replace(/\/\*[\s\S]*?\*\//g, '').replace(/(^|\s)\/\/.*$/gm, '$1');
}

/** Swift: `Enum.member` for every `static let|var` inside a top-level `enum`, `struct` or `extension`. */
function parseSwiftMembers(text: string): Set<string> {
  const out = new Set<string>();
  let owner: string | null = null;
  for (const line of stripComments(text).split('\n')) {
    const open = /^(?:public\s+|internal\s+)?(?:enum|struct|extension)\s+(`?\w+`?)[^{]*\{\s*$/.exec(line);
    if (open) { owner = unquote(open[1]); continue; }
    if (/^\}\s*$/.test(line)) { owner = null; continue; }
    const member = /^\s+(?:public\s+|internal\s+)?static\s+(?:let|var)\s+(`?\w+`?)\s*[:=]/.exec(line);
    if (owner && member) out.add(`${owner}.${unquote(member[1])}`);
  }
  return out;
}

/** Kotlin: `Object.member` for every `val` directly inside a top-level `object`. */
function parseKotlinMembers(text: string): Set<string> {
  const out = new Set<string>();
  let owner: string | null = null;
  for (const line of stripComments(text).split('\n')) {
    const open = /^(?:\w+\s+)*object\s+(`?\w+`?)\s*\{\s*$/.exec(line);
    if (open) { owner = unquote(open[1]); continue; }
    if (/^\}\s*$/.test(line)) { owner = null; continue; }
    const member = /^\s+(?:\w+\s+)*val\s+(`?\w+`?)\s*[:=]/.exec(line);
    if (owner && member) out.add(`${owner}.${unquote(member[1])}`);
  }
  return out;
}

function readIndex(root: string): Record<string, IndexEntry> {
  const file = path.join(root, 'token-index', 'components.yaml');
  const doc = yaml.load(readFile(file, 'the consumer\'s token index (token-index/components.yaml)')) as { tokens?: unknown } | null;
  const tokens = doc?.tokens;
  if (!tokens || typeof tokens !== 'object' || Array.isArray(tokens)) return {};
  return tokens as Record<string, IndexEntry>;
}

/** The generated component-token file of a platform, found through the consumer's own manifest. */
function generatedComponentFile(root: string, platform: Platform): string {
  const manifest = JSON.parse(readFile(path.join(root, 'harness-consumer.json'), 'the consumer manifest (harness-consumer.json)')) as {
    platformOutputs?: Partial<Record<Platform, string>>;
    generated?: Partial<Record<Platform, string[]>>;
  };
  const dir = manifest.platformOutputs?.[platform];
  const rel = manifest.generated?.[platform]?.find(f => /(^|\/)ComponentTokens\./.test(f));
  if (!dir || !rel) return fail(`the manifest names no ${platform} ComponentTokens file`);
  return path.join(root, dir, rel);
}

function setCompare(label: string, expected: Set<string>, actual: Set<string>, expectedWhat: string, actualWhat: string): Verdict {
  const missing = [...expected].filter(n => !actual.has(n)).sort();
  const extra = [...actual].filter(n => !expected.has(n)).sort();
  const first = (xs: string[]) => (xs.length === 0 ? '' : ` [${xs.slice(0, 3).join(', ')}${xs.length > 3 ? ', ...' : ''}]`);
  const count = expected.size;
  const pass = count > 0 && missing.length === 0 && extra.length === 0;
  const rest = pass
    ? `${expectedWhat} and ${actualWhat} agree`
    : count === 0
      ? `no expected names to compare (${expectedWhat} is empty)`
      : `missing=${missing.length}${first(missing)} extra=${extra.length}${first(extra)} (in ${expectedWhat}, not in ${actualWhat}: missing)`;
  return { name: label, pass, count, rest };
}

/** The platform half: every index name appears in the generated file, and no other does. */
function platformVerdict(root: string, platform: Platform, index: Record<string, IndexEntry>): Verdict {
  const expected = new Set<string>();
  for (const entry of Object.values(index)) {
    const name = entry?.platforms?.[platform];
    if (typeof name === 'string' && name !== '') expected.add(unquote(name));
  }
  const text = readFile(generatedComponentFile(root, platform), `the generated ${platform} component tokens`);
  const actual = platform === 'ios' ? parseSwiftMembers(text) : parseKotlinMembers(text);
  return setCompare(platform, expected, actual, 'the index', 'the output');
}

/** Every file under `dir` whose basename matches the definition pattern, to full depth. */
function walkDefinitionFiles(dir: string): string[] {
  const out: string[] = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...walkDefinitionFiles(full));
    else if (e.isFile() && DEFINITION_FILE.test(e.name)) out.push(full);
  }
  return out.sort();
}

/**
 * The (component, key) pairs one definition file declares, read as text: each `component: '<X>'`
 * is followed by a `tokens: { ... }` object whose depth-1 keys are the token keys. Nothing is run.
 */
function declaredTokens(source: string): Array<{ component: string; key: string }> {
  const text = stripComments(source);
  const out: Array<{ component: string; key: string }> = [];
  const callRe = /\bcomponent\s*:\s*(['"])([^'"]+)\1/g;
  for (let m = callRe.exec(text); m; m = callRe.exec(text)) {
    const tokensAt = text.indexOf('tokens', m.index + m[0].length);
    const open = tokensAt < 0 ? -1 : text.indexOf('{', tokensAt);
    if (open < 0) continue;
    let depth = 0;
    let keyStart = -1;
    for (let i = open; i < text.length; i++) {
      const c = text[i];
      if (c === '{' || c === '[' || c === '(') depth++;
      else if (c === '}' || c === ']' || c === ')') { depth--; if (depth === 0) break; }
      else if (depth === 1 && (c === "'" || c === '"') && keyStart < 0) {
        const end = text.indexOf(c, i + 1);
        if (end > 0 && /^\s*:/.test(text.slice(end + 1, end + 40))) { out.push({ component: m[2], key: text.slice(i + 1, end) }); i = end; }
      }
    }
  }
  return out;
}

/**
 * The completeness half (Req 5.10): DesignerPunk's entries in the index (those carrying the package
 * tag) equal the component tokens the shipped definition files define. A group the consumer declares
 * itself is theirs alone (design § 9) and is not expected of the index.
 */
function completenessVerdict(root: string, index: Record<string, IndexEntry>): Verdict {
  const walkRoot = path.join(root, DEFINITION_ROOT);
  if (!fs.existsSync(walkRoot)) fail(`the shipped definition files are missing: ${walkRoot}`);
  const ownGroups = new Set(Object.values(index).filter(e => !e?.source && typeof e?.component === 'string').map(e => e.component!));
  const defined = new Set<string>();
  for (const file of walkDefinitionFiles(walkRoot)) {
    for (const t of declaredTokens(readFile(file, 'a shipped definition file'))) {
      if (!ownGroups.has(t.component)) defined.add(indexNameOf(t.component, t.key));
    }
  }
  const indexed = new Set(Object.entries(index).filter(([, e]) => e?.source).map(([name]) => name));
  return setCompare('completeness', defined, indexed, 'the definition files', 'the index');
}

function run(argv: string[]): number {
  const root = path.resolve(parseArgs(argv));
  if (!fs.existsSync(root) || !fs.statSync(root).isDirectory()) fail(`the consumer root does not exist: ${root}`);
  const index = readIndex(root);
  // Gather every verdict before printing any: a setup error prints the setup line alone.
  const verdicts = [completenessVerdict(root, index), platformVerdict(root, 'ios', index), platformVerdict(root, 'android', index)];
  for (const v of verdicts) process.stdout.write(`d2-check ${v.name}: ${v.pass ? 'PASS' : 'FAIL'} count=${v.count} ${v.rest}\n`);
  return verdicts.every(v => v.pass) ? 0 : 1;
}

function main(): void {
  try {
    process.exitCode = run(process.argv.slice(2));
  } catch (err) {
    const reason = (err instanceof Error ? err.message : String(err)).split('\n')[0].replace(/[()]/g, ' ').trim();
    if (!(err instanceof SetupError)) process.stderr.write(`d2-check: ${err instanceof Error ? err.stack : String(err)}\n`);
    process.stdout.write(`d2-check: FAIL setup (${reason})\n`);
    process.exitCode = 2;
  }
}

if (require.main === module) main();
