/**
 * consumer-entry.paths.test.ts — Spec 123 Task 16.1; design C20 ("Input ≠ output, asserted",
 * Lina R2), Task 16 criterion 1.
 *
 * Asserts, for every declared target:
 *   - every path `emitConsumer` READS resolves under `packageRoot`, never `consumerRoot` (a
 *     spy on the fs read calls catches the adapters' own reads as well as the entry's);
 *   - every path it EMITS is relative and resolves under `consumerRoot`;
 *   - on Kiro, where the identity input (`.kiro/steering/<Doc>.md`) and output
 *     (`.kiro/steering/designerpunk-<id>.md`) share a relative prefix, the resolved input and
 *     output paths still differ. A decoy in the consumer's own `.kiro/steering/` (and a decoy
 *     `governance/`) never reaches an emitted byte, which is design § Testing Strategy's bite
 *     ("resolve identity inputs against `consumerRoot` → red") built into the assertion;
 *   - `registry.fromManifest` is used, with the shipped manifest;
 *   - no process starts (a spy on every `child_process` entry point). This holds for the TS
 *     source and for the BUILT bundle (`build:generator`'s own esbuild command, re-pointed at
 *     a temp outfile). The bundle carries no introspection or stdio-transport code;
 *   - no `*.attribution.json` is emitted (C20; closes the no-sidecar half of
 *     `.kiro/issues/2026-09-27-attribution-sidecars-shipped.md`);
 *   - the constants restated from `generate.ts` (the bundle may not import it) equal the originals.
 */

import * as fs from 'fs';
import * as path from 'path';
import * as registryModule from '../registry';
import * as entry from '../consumer-entry';
import * as generate from '../generate';
import { loadConsumerProfile } from '../consumer-profile';
import { identityDocPath, makePackageRoot, REPO_ROOT } from './consumer-entry.helpers';

// The REAL module objects (not `import * as` namespaces, whose bindings are non-configurable
// getters): a spy installed here is what every module's `fs.` / `child_process.` call reaches.
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fsReal = require('fs') as typeof import('fs');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const childProcess = require('child_process') as typeof import('child_process');

const TARGETS = loadConsumerProfile(REPO_ROOT).targets;
const READ_FNS = ['readFileSync', 'readdirSync', 'existsSync', 'statSync', 'lstatSync', 'openSync'] as const;
const SPAWN_FNS = ['spawn', 'spawnSync', 'fork', 'exec', 'execSync', 'execFile', 'execFileSync'] as const;

let tmp: string;
let packageRoot: string;
let consumerRoot: string;

beforeAll(() => {
  ({ tmp, packageRoot, consumerRoot } = makePackageRoot());
  // Decoys in the CONSUMER's repo at the input-shaped paths: if any input resolved against
  // consumerRoot, these bytes would surface in the emission.
  const decoy = '# DECOY-CONSUMER-ROOT\n\nThis file is the consumer\'s own; the lane must never read it.\n';
  for (const rel of [identityDocPath('core-goals'), '.kiro/steering/designerpunk-core-goals.md', 'governance/Contract-System-Reference.md']) {
    fs.mkdirSync(path.dirname(path.join(consumerRoot, rel)), { recursive: true });
    fs.writeFileSync(path.join(consumerRoot, rel), decoy);
  }
});

afterAll(() => {
  fs.rmSync(tmp, { recursive: true, force: true });
});

afterEach(() => {
  jest.restoreAllMocks();
});

/** Run `fn` with every fs read call recorded; returns the absolute paths read. */
async function recordReads<T>(fn: () => Promise<T>): Promise<{ result: T; reads: string[] }> {
  const reads: string[] = [];
  for (const name of READ_FNS) {
    const original = (fsReal as unknown as Record<string, (...a: unknown[]) => unknown>)[name];
    jest.spyOn(fsReal, name as never).mockImplementation(((p: unknown, ...rest: unknown[]) => {
      if (typeof p === 'string') reads.push(path.resolve(p));
      return original.call(fsReal, p, ...rest);
    }) as never);
  }
  const result = await fn();
  jest.restoreAllMocks();
  return { result, reads };
}

const under = (child: string, parent: string): boolean => {
  const rel = path.relative(parent, child);
  return rel !== '' && !rel.startsWith('..') && !path.isAbsolute(rel);
};

describe.each(TARGETS)('emitConsumer › %s', (target) => {
  const run = (mode: entry.EmitMode = 'attach') => entry.emitConsumer({ packageRoot, consumerRoot, target, mode });

  test('every input resolves under packageRoot; none under consumerRoot', async () => {
    await run(); // warm: lazy requires (the adapter registry) load outside the recorded window
    const { result, reads } = await recordReads(() => run());
    expect(result.files.length).toBeGreaterThan(0);
    expect(reads.length).toBeGreaterThan(0);
    const outside = reads.filter((r) => !under(r, packageRoot));
    expect(outside).toEqual([]);
    expect(reads.filter((r) => under(r, consumerRoot))).toEqual([]);
  });

  test('every output is relative and resolves under consumerRoot; no attribution sidecar', async () => {
    const { files } = await run();
    for (const f of files) {
      expect(path.isAbsolute(f.path)).toBe(false);
      expect(under(path.resolve(consumerRoot, f.path), consumerRoot)).toBe(true);
      expect(under(path.resolve(consumerRoot, f.path), packageRoot)).toBe(false);
    }
    expect(files.filter((f) => f.path.endsWith('.attribution.json'))).toEqual([]);
  });

  test('no decoy byte from the consumer\'s own repo reaches the emission', async () => {
    const { files } = await run();
    expect(files.filter((f) => f.content.includes('DECOY-CONSUMER-ROOT')).map((f) => f.path)).toEqual([]);
  });

  test('registry.fromManifest is used, with the shipped manifest', async () => {
    const spy = jest.spyOn(registryModule, 'fromManifest');
    await run();
    expect(spy).toHaveBeenCalledTimes(1);
    const shipped = JSON.parse(fs.readFileSync(path.join(packageRoot, entry.TOOL_MANIFEST_PATH), 'utf8'));
    expect(spy.mock.calls[0][0]).toEqual(shipped);
  });

  test('no process starts', async () => {
    const spies = SPAWN_FNS.map((name) => jest.spyOn(childProcess, name as never));
    await run();
    for (const spy of spies) expect(spy).not.toHaveBeenCalled();
  });

  test('reference mode (CONSUME posture) emits no agent layer', async () => {
    const result = await run('reference');
    expect(result.files).toEqual([]);
    expect(result.warnings).toEqual([]);
  });
});

describe('emitConsumer › Kiro: identity input and output share a prefix but never a path', () => {
  test('the resolved identity inputs and the resolved outputs are disjoint sets', async () => {
    if (!TARGETS.includes('kiro')) return;
    const { result, reads } = await recordReads(() => entry.emitConsumer({ packageRoot, consumerRoot, target: 'kiro', mode: 'attach' }));
    const identityInputs = reads.filter((r) => r.includes(`${path.sep}.kiro${path.sep}steering${path.sep}`));
    const identityOutputs = result.files.filter((f) => f.path.startsWith('.kiro/steering/')).map((f) => path.resolve(consumerRoot, f.path));
    expect(identityInputs.length).toBeGreaterThan(0);
    expect(identityOutputs.length).toBeGreaterThan(0);
    // Same relative directory (`.kiro/steering/`), different roots — and so different paths.
    expect(identityInputs.every((r) => under(r, packageRoot))).toBe(true);
    expect(identityOutputs.every((o) => under(o, consumerRoot))).toBe(true);
    expect(identityInputs.filter((r) => identityOutputs.includes(r))).toEqual([]);
  });
});

describe('emitConsumer › refusals', () => {
  test('an undeclared target throws, naming the declared ones', async () => {
    await expect(entry.emitConsumer({ packageRoot, consumerRoot, target: 'not-a-target', mode: 'attach' })).rejects.toThrow(/not declared by the installed package/);
  });

  test('the packaged profile is the byte copy of canonical/consumer-profile.yaml, read by the one loader', () => {
    expect(fs.readFileSync(path.join(packageRoot, entry.PACKAGED_PROFILE_PATH), 'utf8')).toBe(
      fs.readFileSync(path.join(REPO_ROOT, 'canonical/consumer-profile.yaml'), 'utf8')
    );
    expect(entry.loadPackagedConsumerProfile(packageRoot)).toEqual(loadConsumerProfile(REPO_ROOT));
  });
});

describe('constants restated from generate.ts (the bundle may not import it)', () => {
  test('each equals its original', () => {
    expect(entry.TEMPLATE_MEMBERS).toEqual(generate.TEMPLATE_MEMBERS);
    expect(entry.TEMPLATE_MEMBER_PATH).toBe(generate.TEMPLATE_MEMBER_PATH);
    expect(entry.CONSUMER_PACKAGE_ROOT).toBe(generate.CONSUMER_PACKAGE_ROOT);
  });
});

describe('the BUILT bundle (build:generator)', () => {
  let bundlePath: string;

  beforeAll(() => {
    // build:generator's OWN esbuild command, re-pointed at a temp outfile — never a copied flag list.
    const script = (JSON.parse(fs.readFileSync(path.join(REPO_ROOT, 'package.json'), 'utf8')) as { scripts: Record<string, string> }).scripts['build:generator'];
    const esbuild = script.split('&&').map((s) => s.trim()).find((s) => s.startsWith('npx esbuild'));
    const OUTFILE = '--outfile=dist/generator/consumer-entry.js';
    if (!esbuild || !esbuild.includes(OUTFILE)) throw new Error(`build:generator no longer carries "${OUTFILE}" — update this test with it`);
    bundlePath = path.join(tmp, 'bundle', 'consumer-entry.js');
    childProcess.execSync(esbuild.replace(OUTFILE, `--outfile=${JSON.stringify(bundlePath)}`), { cwd: REPO_ROOT, stdio: 'pipe' });
  }, 60_000);

  test('carries no live-introspection or stdio-transport code', () => {
    const text = fs.readFileSync(bundlePath, 'utf8');
    expect(text.match(/introspectServer|generateRegistry|StdioCorpusClient|createStdioDocsClient|StdioClientTransport|generateAll/g) ?? []).toEqual([]);
  });

  test('emits what the TS source emits, starting no process', async () => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const bundled = require(bundlePath) as typeof entry;
    for (const target of TARGETS) {
      const spies = SPAWN_FNS.map((name) => jest.spyOn(childProcess, name as never));
      const fromBundle = await bundled.emitConsumer({ packageRoot, consumerRoot, target, mode: 'attach' });
      for (const spy of spies) expect(spy).not.toHaveBeenCalled();
      jest.restoreAllMocks();
      const fromSource = await entry.emitConsumer({ packageRoot, consumerRoot, target, mode: 'attach' });
      expect(fromBundle).toEqual(fromSource);
    }
  });
});
