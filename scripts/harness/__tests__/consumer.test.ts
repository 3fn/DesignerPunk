/**
 * Tests for `scripts/harness/consumer.ts`, the packed-install consumer driver (Spec 129 Task 1).
 *
 * No process is started and nothing is downloaded: the driver's `Runner` seam is replaced with a fake that
 * does what each real command would leave behind (a tarball, an installed package, a config, generated
 * files). That is enough to show the step order, the step-failure messages and exit status, that only
 * `npm pack` ever runs in the repository, the consumer root's layout and the pin-file rules. The one real run
 * of the whole driver is recorded in the Task 1 completion docs.
 *
 * Also here, for Task 1.2: the product-token fixture holds the two `ref`s Req 2.3 asks for, checked against
 * the shipped token index.
 */

import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import * as yaml from 'js-yaml';
import {
  addProductTokens,
  defaultRunner,
  HarnessStepError,
  isInside,
  listFiles,
  main,
  parseArgs,
  platformOutputFolders,
  pruneNodeModules,
  readConsumerPins,
  runDriver,
  Runner,
  Step,
  DriverOptions,
  ConsumerManifest,
} from '../consumer';

const REAL_REPO = path.resolve(__dirname, '..', '..', '..');

// ─── Fixtures: a throwaway repository and a fake command runner ──────────────────────────────────

const PINS = `consumer:
  name: HarnessConsumer
  abbreviation: HX
  productTokensFixture: harness/fixtures/product-tokens
  productTokens: product/tokens
`;

const INIT_CONFIG = `import { defineConfig } from '@3fn/core/config';

export default defineConfig({
  name: 'HarnessConsumer',
  abbreviation: 'HX',
  tokenSource: './src/tokens',
  output: './dist/tokens',
});
`;

let sandbox: string;
let repoRoot: string;
let outDir: string;

function mkdirp(p: string): void {
  fs.mkdirSync(p, { recursive: true });
}

function write(p: string, text: string): void {
  mkdirp(path.dirname(p));
  fs.writeFileSync(p, text);
}

beforeEach(() => {
  sandbox = fs.realpathSync(fs.mkdtempSync(path.join(os.tmpdir(), 'consumer-test-')));
  repoRoot = path.join(sandbox, 'repo');
  outDir = path.join(sandbox, 'out', 'consumer');
  write(path.join(repoRoot, 'harness', 'pins.yaml'), PINS);
  write(path.join(repoRoot, 'harness', 'fixtures', 'product-tokens', 'harness.yaml'), 'category: harness\ntokens: {}\n');
});

afterEach(() => {
  fs.rmSync(sandbox, { recursive: true, force: true });
});

interface Call {
  command: string;
  args: string[];
  cwd: string;
}

/**
 * A runner that leaves behind what each real command would. `failAt` makes the named step's command exit 1
 * with output on stderr; `calls` records every command and where it ran.
 */
function fakeRunner(failAt?: Step): { run: Runner; calls: Call[] } {
  const calls: Call[] = [];
  const run: Runner = (command, args, { cwd }) => {
    calls.push({ command, args, cwd });
    const ok = { status: 0, stdout: '', stderr: '' };
    const fail = (why: string) => ({ status: 1, stdout: '', stderr: why });
    const isNode = command === process.execPath;
    if (command === 'npm' && args[0] === 'pack') {
      if (failAt === 'pack') return fail('npm ERR! prepack failed');
      const dest = args[args.indexOf('--pack-destination') + 1];
      write(path.join(dest, '3fn-core-9.9.9.tgz'), 'not really a tarball');
      return ok;
    }
    if (command === 'tar') {
      return { ...ok, stdout: 'package/\npackage/package.json\npackage/bin/designerpunk.js\npackage/src/a.swift\n' };
    }
    if (command === 'npm' && args[0] === 'install') {
      if (failAt === 'install') return fail('npm ERR! code ENOTFOUND');
      write(path.join(cwd, 'node_modules', '@3fn', 'core', 'package.json'), '{"name":"@3fn/core","version":"9.9.9"}');
      write(path.join(cwd, 'node_modules', '@3fn', 'core', 'bin', 'designerpunk.js'), '// bin');
      write(path.join(cwd, 'node_modules', 'js-yaml', 'index.js'), '// a dependency');
      write(path.join(cwd, 'node_modules', '.bin', 'tsx'), '// a link');
      return ok;
    }
    if (isNode && args[1] === 'init') {
      if (failAt === 'init') return fail('init: refused');
      write(path.join(cwd, 'designerpunk.config.ts'), INIT_CONFIG);
      return ok;
    }
    if (isNode && args[1] === 'generate') {
      if (failAt === 'generate') return fail('generate: System token generation failed');
      write(path.join(cwd, 'dist', 'tokens', 'DesignTokens.ios.swift'), '// swift');
      write(path.join(cwd, 'dist', 'tokens', 'DesignTokens.android.kt'), '// kotlin');
      write(path.join(cwd, 'dist', 'tokens', 'product', 'ProductTokens.ios.swift'), '// swift');
      write(path.join(cwd, 'dist', 'tokens', 'product', 'ProductTokens.android.kt'), '// kotlin');
      write(path.join(cwd, 'token-index', 'semantics.yaml'), 'tokens: {}\n');
      return ok;
    }
    if (isNode && args[0] === '-e') {
      if (failAt === 'package') return fail('could not load the config');
      return { ...ok, stdout: JSON.stringify({ outputDir: path.join(cwd, 'dist', 'tokens') }) };
    }
    return fail(`fakeRunner: unexpected command ${command} ${args.join(' ')}`);
  };
  return { run, calls };
}

function options(run: Runner, overrides: Partial<DriverOptions> = {}): DriverOptions {
  return {
    repoRoot,
    out: outDir,
    pinsPath: path.join(repoRoot, 'harness', 'pins.yaml'),
    packIgnoreScripts: false,
    offline: false,
    preferOffline: false,
    keepNodeModules: false,
    run,
    log: () => undefined,
    ...overrides,
  };
}

// ─── The step-failure messages (Task 1 criterion 4) ──────────────────────────────────────────────

describe('runDriver — a failing step is named, and the exit status is non-zero', () => {
  const failing: Step[] = ['pack', 'install', 'init', 'generate'];

  it.each(failing)('throws a HarnessStepError naming step "%s" when that command exits 1', (step) => {
    const { run } = fakeRunner(step);
    let caught: unknown;
    try {
      runDriver(options(run));
    } catch (err) {
      caught = err;
    }
    expect(caught).toBeInstanceOf(HarnessStepError);
    expect((caught as HarnessStepError).step).toBe(step);
    expect((caught as HarnessStepError).message).toContain(`step "${step}" failed`);
    // the failing command's own output is carried, so the CI log says why
    expect((caught as HarnessStepError).message).toMatch(/exited 1/);
  });

  it.each(failing)('main() returns 1 and prints `step "%s" failed` to stderr', (step) => {
    const { run } = fakeRunner(step);
    const errors: string[] = [];
    const spyErr = jest.spyOn(console, 'error').mockImplementation((...a: unknown[]) => { errors.push(a.join(' ')); });
    const spyLog = jest.spyOn(console, 'log').mockImplementation(() => undefined);
    try {
      const status = main(['--out', outDir, '--pins', path.join(repoRoot, 'harness', 'pins.yaml')], run, repoRoot);
      expect(status).toBe(1);
    } finally {
      spyErr.mockRestore();
      spyLog.mockRestore();
    }
    expect(errors.join('\n')).toContain(`harness-consumer: step "${step}" failed`);
  });

  it('a command that cannot start is a failure of its step too', () => {
    const run: Runner = () => ({ status: null, stdout: '', stderr: '', error: new Error('spawn npm ENOENT') });
    expect(() => runDriver(options(run))).toThrow(/step "pack" failed: could not run `npm pack.*spawn npm ENOENT/);
  });

  it('stops at the failing step: a later command never runs', () => {
    const { run, calls } = fakeRunner('install');
    expect(() => runDriver(options(run))).toThrow(HarnessStepError);
    expect(calls.some((c) => c.args.includes('init') || c.args.includes('generate'))).toBe(false);
  });

  it('a usage error is status 2 and names no step', () => {
    const errors: string[] = [];
    const spyErr = jest.spyOn(console, 'error').mockImplementation((...a: unknown[]) => { errors.push(a.join(' ')); });
    try {
      expect(main([], fakeRunner().run, repoRoot)).toBe(2);
    } finally {
      spyErr.mockRestore();
    }
    expect(errors.join('\n')).toContain('--out <dir> is required');
  });
});

// ─── The whole driver over the fake (Task 1 criterion 1) ─────────────────────────────────────────

describe('runDriver — pack, install, init, generate, one consumer root', () => {
  it('runs the four commands in order and writes the manifest, the tarball list and the pruned root', () => {
    const { run, calls } = fakeRunner();
    const manifest = runDriver(options(run, { offline: true, packIgnoreScripts: true }));

    const kinds = calls.map((c) => (c.command === 'npm' ? `npm ${c.args[0]}` : c.command === 'tar' ? 'tar' : `node ${c.args[0] === '-e' ? '-e' : c.args[1]}`));
    expect(kinds).toEqual(['npm pack', 'tar', 'npm install', 'node init', 'node generate', 'node -e']);
    expect(calls[0].args).toContain('--ignore-scripts');
    expect(calls[2].args).toContain('--offline');

    const init = calls[3].args;
    expect(init.slice(1)).toEqual(['init', '--name', 'HarnessConsumer', '--abbreviation', 'HX']);

    expect(manifest.schema).toBe(1);
    expect(manifest.packageRoot).toBe('node_modules/@3fn/core');
    expect(manifest.package).toMatchObject({ name: '@3fn/core', version: '9.9.9', tarball: '3fn-core-9.9.9.tgz', fileList: 'harness-tarball-files.txt' });
    expect(manifest.platformOutputs).toEqual({ web: 'dist/tokens', ios: 'dist/tokens', android: 'dist/tokens' });
    expect(manifest.generated.ios).toEqual(['DesignTokens.ios.swift', 'product/ProductTokens.ios.swift']);
    expect(manifest.generated.android).toEqual(['DesignTokens.android.kt', 'product/ProductTokens.android.kt']);
    expect(manifest.tokenIndex).toBe('token-index');
    expect(manifest.productTokens).toBe('product/tokens');

    const onDisk = JSON.parse(fs.readFileSync(path.join(outDir, 'harness-consumer.json'), 'utf8')) as ConsumerManifest;
    expect(onDisk).toEqual(manifest);
    // the tarball's file list: sorted, relative to the package root, no directory entries
    expect(fs.readFileSync(path.join(outDir, 'harness-tarball-files.txt'), 'utf8')).toBe('bin/designerpunk.js\npackage.json\nsrc/a.swift\n');
    // only the packed package is kept under node_modules/
    expect(fs.readdirSync(path.join(outDir, 'node_modules'))).toEqual(['@3fn']);
    expect(fs.readdirSync(path.join(outDir, 'node_modules', '@3fn'))).toEqual(['core']);
  });

  it('copies the fixture in and points the consumer config at it', () => {
    runDriver(options(fakeRunner().run));
    expect(fs.existsSync(path.join(outDir, 'product', 'tokens', 'harness.yaml'))).toBe(true);
    const config = fs.readFileSync(path.join(outDir, 'designerpunk.config.ts'), 'utf8');
    expect(config).toContain("output: './dist/tokens',\n  productTokens: './product/tokens',\n");
  });

  it('--keep-node-modules keeps the package dependencies', () => {
    runDriver(options(fakeRunner().run, { keepNodeModules: true }));
    expect(fs.existsSync(path.join(outDir, 'node_modules', 'js-yaml', 'index.js'))).toBe(true);
  });

  it('--tarball installs the given file and runs no `npm pack`', () => {
    const tgz = path.join(sandbox, 'given.tgz');
    write(tgz, 'x');
    const { run, calls } = fakeRunner();
    runDriver(options(run, { tarball: tgz }));
    expect(calls.some((c) => c.command === 'npm' && c.args[0] === 'pack')).toBe(false);
    expect(calls.find((c) => c.command === 'npm' && c.args[0] === 'install')?.args).toContain(tgz);
  });

  it('fails the package step when `generate` did not write the product-token fixture output', () => {
    const base = fakeRunner();
    const run: Runner = (command, args, o) => {
      const r = base.run(command, args, o);
      if (command === process.execPath && args[1] === 'generate') {
        fs.rmSync(path.join(o.cwd, 'dist', 'tokens', 'product'), { recursive: true, force: true });
      }
      return r;
    };
    expect(() => runDriver(options(run))).toThrow(/step "package" failed: `generate` wrote no ProductTokens\.ios\.swift/);
  });
});

// ─── Reads nothing from the repository's dist/ (Task 1 criterion 1) ──────────────────────────────

describe('runDriver — the repository is touched only by `npm pack`', () => {
  it('every command but `npm pack` runs in the consumer root or the scratch folder, never in the repository', () => {
    const { run, calls } = fakeRunner();
    runDriver(options(run));
    const inRepo = calls.filter((c) => isInside(repoRoot, c.cwd));
    expect(inRepo.map((c) => `${c.command} ${c.args[0]}`)).toEqual(['npm pack']);
    for (const c of calls.filter((x) => !isInside(repoRoot, x.cwd))) {
      expect(isInside(outDir, c.cwd) || isInside(os.tmpdir(), c.cwd)).toBe(true);
    }
  });

  it('no command argument names a path under the repository (its dist/ included)', () => {
    const { run, calls } = fakeRunner();
    runDriver(options(run));
    for (const c of calls) {
      for (const a of c.args) {
        if (path.isAbsolute(a)) expect(isInside(repoRoot, a)).toBe(false);
      }
    }
  });

  it('runs the installed CLI by absolute path inside the consumer root', () => {
    const { run, calls } = fakeRunner();
    runDriver(options(run));
    const bins = calls.filter((c) => c.command === process.execPath && c.args[0] !== '-e').map((c) => c.args[0]);
    expect(bins).toEqual([path.join(outDir, 'node_modules/@3fn/core/bin/designerpunk.js'), path.join(outDir, 'node_modules/@3fn/core/bin/designerpunk.js')]);
  });

  it('refuses an --out inside the repository, including through a not-yet-created subfolder', () => {
    expect(() => runDriver(options(fakeRunner().run, { out: path.join(repoRoot, 'tmp', 'consumer') }))).toThrow(/step "prepare" failed: --out .* is inside the repository/);
    expect(fs.existsSync(path.join(repoRoot, 'tmp'))).toBe(false);
  });

  it('refuses an --out that already holds files', () => {
    write(path.join(outDir, 'stale.txt'), 'x');
    expect(() => runDriver(options(fakeRunner().run))).toThrow(/step "prepare" failed: --out .* not an empty folder/);
  });

  it('isInside compares resolved paths, so a sibling with a shared prefix is outside', () => {
    expect(isInside(repoRoot, `${repoRoot}-other`)).toBe(false);
    expect(isInside(repoRoot, path.join(repoRoot, 'a', 'b'))).toBe(true);
  });
});

// ─── The pin file and the abbreviation (Task 1 criterion 2) ──────────────────────────────────────

describe('readConsumerPins — the abbreviation is not DP', () => {
  const pinsFile = (text: string): string => {
    const p = path.join(sandbox, 'pins.yaml');
    fs.writeFileSync(p, text);
    return p;
  };

  it('the committed harness/pins.yaml § consumer names an abbreviation that is not DP', () => {
    const pins = readConsumerPins(path.join(REAL_REPO, 'harness', 'pins.yaml'));
    expect(pins.abbreviation.toUpperCase()).not.toBe('DP');
    expect(pins.abbreviation).toMatch(/^[A-Za-z][A-Za-z0-9]*$/);
    expect(pins.name.length).toBeGreaterThan(0);
  });

  it('the committed pin file has the fixture folder the driver copies, and it exists', () => {
    const pins = readConsumerPins(path.join(REAL_REPO, 'harness', 'pins.yaml'));
    expect(fs.statSync(path.join(REAL_REPO, pins.productTokensFixture)).isDirectory()).toBe(true);
  });

  it.each(['DP', 'dp', 'Dp'])('BITES on abbreviation %s', (abbr) => {
    expect(() => readConsumerPins(pinsFile(PINS.replace('HX', abbr)))).toThrow(/must not be DP/);
  });

  it('BITES on a missing consumer section, a missing key and an escaping path', () => {
    expect(() => readConsumerPins(pinsFile('ios:\n  xcode: "26.6"\n'))).toThrow(/no `consumer` section/);
    expect(() => readConsumerPins(pinsFile(PINS.replace('  abbreviation: HX\n', '')))).toThrow(/`abbreviation` must be a non-empty string/);
    expect(() => readConsumerPins(pinsFile(PINS.replace('product/tokens', '../tokens')))).toThrow(/relative path with no `\.\.`/);
    expect(() => readConsumerPins(path.join(sandbox, 'absent.yaml'))).toThrow(/pin file not found/);
  });

  it('is unaffected by sections other tasks add (ios, android) and by comments', () => {
    const text = `# comment\n${PINS}\nios:\n  xcode: "26.6"\nandroid:\n  jdk: 17\n`;
    expect(readConsumerPins(pinsFile(text)).abbreviation).toBe('HX');
  });

  it('the generated consumer config carries the pinned abbreviation, via init\'s argument', () => {
    const { run, calls } = fakeRunner();
    runDriver(options(run));
    const init = calls.find((c) => c.args[1] === 'init');
    expect(init?.args[init.args.indexOf('--abbreviation') + 1]).toBe('HX');
  });
});

// ─── Config edit, output folders, pruning ────────────────────────────────────────────────────────

describe('addProductTokens', () => {
  it('adds productTokens after the output line, with the same indent', () => {
    expect(addProductTokens(INIT_CONFIG, 'product/tokens')).toContain("  output: './dist/tokens',\n  productTokens: './product/tokens',\n});");
  });

  it('BITES when there is no output line to anchor on, and when productTokens is already set', () => {
    expect(() => addProductTokens("export default {};\n", 'product/tokens')).toThrow(/no `output:` line/);
    expect(() => addProductTokens(addProductTokens(INIT_CONFIG, 'product/tokens'), 'x')).toThrow(/already sets `productTokens`/);
  });
});

describe('platformOutputFolders — read from the resolved config, never hard-coded', () => {
  it('uses `output` for every platform when no platform sets its own', () => {
    mkdirp(path.join(outDir, 'dist', 'tokens'));
    expect(platformOutputFolders({ outputDir: path.join(outDir, 'dist', 'tokens') }, outDir)).toEqual({ web: 'dist/tokens', ios: 'dist/tokens', android: 'dist/tokens' });
  });

  it('uses platforms.<platform>.output where the resolved config carries it, else `output` (the U10 shape)', () => {
    mkdirp(outDir);
    const folders = platformOutputFolders(
      { outputDir: path.join(outDir, 'dist'), platforms: { ios: { output: path.join(outDir, 'ios', 'Tokens') }, android: { output: path.join(outDir, 'android', 'tokens') } } },
      outDir,
    );
    expect(folders).toEqual({ web: 'dist', ios: 'ios/Tokens', android: 'android/tokens' });
  });
});

describe('listFiles and pruneNodeModules', () => {
  it('listFiles returns sorted POSIX paths with the extension, recursively', () => {
    write(path.join(sandbox, 'g', 'b.swift'), '');
    write(path.join(sandbox, 'g', 'a', 'z.swift'), '');
    write(path.join(sandbox, 'g', 'c.kt'), '');
    expect(listFiles(path.join(sandbox, 'g'), '.swift')).toEqual(['a/z.swift', 'b.swift']);
    expect(listFiles(path.join(sandbox, 'absent'), '.swift')).toEqual([]);
  });

  it('pruneNodeModules keeps only @3fn/core', () => {
    write(path.join(sandbox, 'r', 'node_modules', '@3fn', 'core', 'package.json'), '{}');
    write(path.join(sandbox, 'r', 'node_modules', '@3fn', 'other', 'package.json'), '{}');
    write(path.join(sandbox, 'r', 'node_modules', 'x', 'index.js'), '');
    write(path.join(sandbox, 'r', 'node_modules', '.package-lock.json'), '{}');
    pruneNodeModules(path.join(sandbox, 'r'));
    expect(fs.readdirSync(path.join(sandbox, 'r', 'node_modules', '@3fn'))).toEqual(['core']);
    expect(fs.readdirSync(path.join(sandbox, 'r', 'node_modules'))).toEqual(['@3fn']);
  });
});

describe('parseArgs', () => {
  it('requires --out, resolves paths, and defaults the pin file to the repository\'s', () => {
    const a = parseArgs(['--out', 'x/y', '--offline'], repoRoot);
    expect(a.out).toBe(path.resolve('x/y'));
    expect(a.pins).toBe(path.join(repoRoot, 'harness', 'pins.yaml'));
    expect(a.offline).toBe(true);
    expect(() => parseArgs([], repoRoot)).toThrow(/--out <dir> is required/);
    expect(() => parseArgs(['--out'], repoRoot)).toThrow(/needs a value/);
    expect(() => parseArgs(['--out', 'x', '--bogus'], repoRoot)).toThrow(/unknown argument/);
    expect(() => parseArgs(['--out', 'x', '--offline', '--prefer-offline'], repoRoot)).toThrow(/exclusive/);
  });

  it('the default runner reports a missing command as `error`, not as a thrown exception', () => {
    const r = defaultRunner('definitely-not-a-command-129', [], { cwd: sandbox });
    expect(r.error).toBeDefined();
    expect(r.status).toBeNull();
  });
});

// ─── Task 1.2: the product-token fixture (Task 1 criterion 3) ────────────────────────────────────

describe('the product-token fixture at harness/fixtures/product-tokens/', () => {
  interface IndexEntry { themeVarying: boolean; platforms: { web: unknown; ios: unknown; android: unknown } }
  const semantics = (yaml.load(fs.readFileSync(path.join(REAL_REPO, 'token-index', 'semantics.yaml'), 'utf8')) as { tokens: Record<string, IndexEntry> }).tokens;
  const fixtureDir = path.join(REAL_REPO, 'harness', 'fixtures', 'product-tokens');
  const fixtureTokens = (): Record<string, { ref?: string }> => {
    const merged: Record<string, { ref?: string }> = {};
    for (const f of fs.readdirSync(fixtureDir).filter((n) => n.endsWith('.yaml'))) {
      const doc = yaml.load(fs.readFileSync(path.join(fixtureDir, f), 'utf8')) as { tokens: Record<string, { ref?: string }> };
      Object.assign(merged, doc.tokens);
    }
    return merged;
  };

  it('holds exactly two tokens, both refs', () => {
    const tokens = fixtureTokens();
    expect(Object.keys(tokens)).toHaveLength(2);
    for (const t of Object.values(tokens)) expect(typeof t.ref).toBe('string');
  });

  /** A WCAG-only colour: the base index flags it `themeVarying: false`, yet its iOS and Android names are `theme.` names. */
  const isWcagOnlyColor = (name: string): boolean => {
    const e = semantics[name];
    return !!e && e.themeVarying === false && String(e.platforms.ios).startsWith('theme.') && String(e.platforms.android).startsWith('theme.');
  };
  /** A composite: the index names it on web with a list (one custom property per property), not one string. */
  const isComposite = (name: string): boolean => Array.isArray(semantics[name]?.platforms.web);

  it('one token refs a WCAG-only colour that exists in the shipped index', () => {
    const refs = Object.values(fixtureTokens()).map((t) => t.ref as string);
    expect(refs.filter(isWcagOnlyColor)).toHaveLength(1);
  });

  it('one token refs a composite token that exists in the shipped index', () => {
    const refs = Object.values(fixtureTokens()).map((t) => t.ref as string);
    expect(refs.filter(isComposite)).toHaveLength(1);
  });

  it('the oracle bites: a plain colour and a plain spacing token are neither', () => {
    const plain = Object.keys(semantics).find((n) => n.startsWith('color.') && semantics[n].themeVarying === false && !String(semantics[n].platforms.ios).startsWith('theme.'));
    expect(plain).toBeDefined();
    expect(isWcagOnlyColor(plain as string)).toBe(false);
    expect(isComposite(plain as string)).toBe(false);
  });
});
