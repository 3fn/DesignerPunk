/**
 * Integration test for `npx designerpunk attach` (Spec 123 Task 16.2 — modes,
 * refusals, the restart line, the vocabulary object, safe re-run).
 *
 * Uses the REAL package root (this repo, already built — `dist/consumer-canonical`,
 * `dist/generator/consumer-entry.js`, `dist/mcp/tool-manifest.json` all present) and a
 * scratch CONSUMER directory, mirroring `init.test.ts`'s own pattern. `attach.ts`
 * resolves its own package root via `resolvePackageRoot(__dirname)`, so no override is
 * needed — only the consumer side is faked.
 *
 * @see .kiro/specs/123-consumer-distribution/design.md § "C20. The consumer emission lane"
 * @see .kiro/specs/123-consumer-distribution/design.md § "Error Handling"
 */

import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { runAttach } from '../attach';
import { main, printHelp } from '../designerpunk';
import { resolvePackageRoot } from '../shared/resolvePackageRoot';
import { attachUnbornRepoMessage, restartLineSequencedMessage, restartLineNowMessage } from '../shared/errorCatalog';
import { attachUsage, lifecycleVerb, LIFECYCLE_VERBS, ATTACH_OBJECT } from '../shared/vocabulary';
import { initBornRepoMessage, existingMcpEntryMessage } from '../shared/errorCatalog';

const PKG_ROOT = resolvePackageRoot(path.join(__dirname, '..'));

// ---------------------------------------------------------------------------
// Helpers (mirrors init.test.ts's own scratch-dir helpers)
// ---------------------------------------------------------------------------

function createScratchDir(): string {
  return fs.realpathSync(fs.mkdtempSync(path.join(os.tmpdir(), 'dp-attach-test-')));
}

function markGitBoundary(dir: string): void {
  fs.mkdirSync(path.join(dir, '.git'), { recursive: true });
}

const PRIMITIVE_BARREL_FUNCTION = `\nexport function getAllPrimitiveTokens() { return []; }\n`;
const SEMANTIC_BARREL_FUNCTION = `\nexport function getAllSemanticTokens() { return []; }\n`;

function writeFile(dir: string, relPath: string, content: string): void {
  const full = path.join(dir, relPath);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, content, 'utf8');
}

/** Scaffolds a minimal BORN repo (config + a DesignerPunk-shaped tier) — same shape `bornRepo.test.ts` uses. */
function makeBornRepo(dir: string): void {
  writeFile(dir, 'src/tokens/index.ts', PRIMITIVE_BARREL_FUNCTION);
  writeFile(dir, 'src/tokens/semantic/index.ts', SEMANTIC_BARREL_FUNCTION);
  writeFile(
    dir,
    'designerpunk.config.ts',
    `import { defineConfig } from '@3fn/core';\nexport default defineConfig({ name: 'T', abbreviation: 'T', tokenSource: './src/tokens' });\n`
  );
  markGitBoundary(dir);
}

interface RunResult {
  output: string;
  lines: string[];
  exitCode: number | undefined;
}

/** Run `runAttach` against a scratch directory by chdir'ing into it first. Captures console output and a `process.exit` call without killing the test process. */
async function runAttachIn(scratchDir: string, args: string[]): Promise<RunResult> {
  const originalCwd = process.cwd();
  process.chdir(scratchDir);

  const logSpy = jest.spyOn(console, 'log').mockImplementation();
  const errorSpy = jest.spyOn(console, 'error').mockImplementation();
  const exitSpy = jest.spyOn(process, 'exit').mockImplementation(((() => undefined) as unknown) as () => never);

  try {
    await runAttach(args);
  } finally {
    process.chdir(originalCwd);
  }

  const calls = [...logSpy.mock.calls, ...errorSpy.mock.calls];
  const lines = calls.map((call) => call.join(' '));
  const output = lines.join('\n');
  const exitCode = exitSpy.mock.calls[0]?.[0] as number | undefined;
  logSpy.mockRestore();
  errorSpy.mockRestore();
  exitSpy.mockRestore();

  return { output, lines, exitCode };
}

function readManifest(dir: string): any {
  return JSON.parse(fs.readFileSync(path.join(dir, 'designerpunk.manifest.json'), 'utf-8'));
}

// eslint-disable-next-line @typescript-eslint/no-var-requires
const consumerEntry = require(path.join(PKG_ROOT, 'dist/generator/consumer-entry.js'));

// ---------------------------------------------------------------------------
// Refusals
// ---------------------------------------------------------------------------

describe('attach — refusals (design.md § Error Handling)', () => {
  let scratchDir: string;

  beforeEach(() => {
    scratchDir = createScratchDir();
    markGitBoundary(scratchDir);
  });

  afterEach(() => {
    fs.rmSync(scratchDir, { recursive: true, force: true });
  });

  test('unborn repo, no --reference → the exact catalog refusal, exit 1', async () => {
    const result = await runAttachIn(scratchDir, ['--target=cc']);
    expect(result.exitCode).toBe(1);
    expect(result.output).toContain(attachUnbornRepoMessage());
  });

  test('partial repo (config-no-tier), no --reference → the shared partial-case message, exit 1', async () => {
    writeFile(
      scratchDir,
      'designerpunk.config.ts',
      `import { defineConfig } from '@3fn/core';\nexport default defineConfig({ name: 'T', abbreviation: 'T', tokenSource: './src/tokens' });\n`
    );
    // No tier written — config-no-tier.
    const result = await runAttachIn(scratchDir, ['--target=cc']);
    expect(result.exitCode).toBe(1);
    expect(result.output).toContain('this repo looks partly initialized');
  });
});

// ---------------------------------------------------------------------------
// `attach --reference`
// ---------------------------------------------------------------------------

describe('attach --reference — CONSUME posture wiring (C20, DD22)', () => {
  let scratchDir: string;

  beforeEach(() => {
    scratchDir = createScratchDir();
    markGitBoundary(scratchDir);
  });

  afterEach(() => {
    fs.rmSync(scratchDir, { recursive: true, force: true });
  });

  test('writes a posture: "consume" manifest, MCP config for docs+application only, no agents', async () => {
    const result = await runAttachIn(scratchDir, ['--target=cc', '--reference']);
    expect(result.exitCode).toBeUndefined();

    const manifest = readManifest(scratchDir);
    expect(manifest.posture).toBe('consume');

    const mcpJson = JSON.parse(fs.readFileSync(path.join(scratchDir, '.mcp.json'), 'utf-8'));
    expect(Object.keys(mcpJson.mcpServers).sort()).toEqual(['designerpunk-application', 'designerpunk-docs']);
    expect(mcpJson.mcpServers['designerpunk-product']).toBeUndefined();

    // No agents: no .claude/agents directory and no CLAUDE.md.
    expect(fs.existsSync(path.join(scratchDir, '.claude/agents'))).toBe(false);
    expect(fs.existsSync(path.join(scratchDir, 'CLAUDE.md'))).toBe(false);
  });

  test('restart-now line is printed LAST', async () => {
    const result = await runAttachIn(scratchDir, ['--target=cc', '--reference']);
    const nonEmpty = result.lines.filter((l) => l.trim().length > 0);
    expect(nonEmpty[nonEmpty.length - 1]).toBe(restartLineNowMessage());
  });

  test('re-running --reference is clean (idempotent) — a second run adds no new keys', async () => {
    await runAttachIn(scratchDir, ['--target=cc', '--reference']);
    const firstManifest = readManifest(scratchDir);

    const result = await runAttachIn(scratchDir, ['--target=cc', '--reference']);
    expect(result.exitCode).toBeUndefined();

    const secondManifest = readManifest(scratchDir);
    expect(secondManifest.posture).toBe('consume');
    expect(Object.keys(secondManifest.entries).sort()).toEqual(Object.keys(firstManifest.entries).sort());
  });

  test('works in an UNBORN repo (the documented case) and does not itself establish birth', async () => {
    const result = await runAttachIn(scratchDir, ['--target=cc', '--reference']);
    expect(result.exitCode).toBeUndefined();
    // A later bare `attach` (no --reference) over the same repo still refuses as unborn —
    // C2 ignores a consume-posture manifest as a birth signal (findDesignSystemRoot, L217).
    const second = await runAttachIn(scratchDir, ['--target=cc']);
    expect(second.exitCode).toBe(1);
    expect(second.output).toContain(attachUnbornRepoMessage());
  });
});

// ---------------------------------------------------------------------------
// Born-repo attach — full emission, attachedTargets, safe re-run, collisions
// ---------------------------------------------------------------------------

describe('attach — born repo, full emission (C1 agent-layer row, C7 manifest)', () => {
  let scratchDir: string;

  beforeEach(() => {
    scratchDir = createScratchDir();
    makeBornRepo(scratchDir);
  });

  afterEach(() => {
    fs.rmSync(scratchDir, { recursive: true, force: true });
  });

  test('writes the agent layer, the CLAUDE.md managed region, and the full three-server MCP config', async () => {
    const result = await runAttachIn(scratchDir, ['--target=cc']);
    expect(result.exitCode).toBeUndefined();

    expect(fs.existsSync(path.join(scratchDir, '.claude/agents'))).toBe(true);
    const agentFiles = fs.readdirSync(path.join(scratchDir, '.claude/agents'));
    expect(agentFiles.length).toBeGreaterThan(0);

    expect(fs.existsSync(path.join(scratchDir, '.claude/identity'))).toBe(true);

    const claudeMd = fs.readFileSync(path.join(scratchDir, 'CLAUDE.md'), 'utf-8');
    expect(claudeMd).toContain('<!-- designerpunk:managed:begin -->');
    expect(claudeMd).toContain('<!-- designerpunk:managed:end -->');
    expect(claudeMd).toContain('@.claude/identity/');

    const mcpJson = JSON.parse(fs.readFileSync(path.join(scratchDir, '.mcp.json'), 'utf-8'));
    expect(Object.keys(mcpJson.mcpServers).sort()).toEqual([
      'designerpunk-application',
      'designerpunk-docs',
      'designerpunk-product',
    ]);

    const manifest = readManifest(scratchDir);
    expect(manifest.posture).toBe('born');
    expect(manifest.attachedTargets).toEqual(['cc']);
    expect(manifest.entries['CLAUDE.md#managed']).toBeDefined();
    expect(manifest.entries['CLAUDE.md#managed'].grain).toBe('region');
  });

  test('restart-sequenced line is printed LAST', async () => {
    const result = await runAttachIn(scratchDir, ['--target=cc']);
    const nonEmpty = result.lines.filter((l) => l.trim().length > 0);
    expect(nonEmpty[nonEmpty.length - 1]).toBe(restartLineSequencedMessage());
  });

  test('safe re-run: re-attaching the SAME target changes nothing (idempotent)', async () => {
    await runAttachIn(scratchDir, ['--target=cc']);
    const before = readManifest(scratchDir);
    const beforeClaudeMd = fs.readFileSync(path.join(scratchDir, 'CLAUDE.md'), 'utf-8');

    const result = await runAttachIn(scratchDir, ['--target=cc']);
    expect(result.exitCode).toBeUndefined();
    expect(result.output).toMatch(/unchanged/);

    const after = readManifest(scratchDir);
    expect(after.attachedTargets).toEqual(['cc']);
    expect(Object.keys(after.entries).sort()).toEqual(Object.keys(before.entries).sort());
    expect(fs.readFileSync(path.join(scratchDir, 'CLAUDE.md'), 'utf-8')).toBe(beforeClaudeMd);
  });

  test('`attach --target=<t>` ADDS to attachedTargets, never replaces it (C9)', async () => {
    await runAttachIn(scratchDir, ['--target=cc']);
    expect(readManifest(scratchDir).attachedTargets).toEqual(['cc']);

    await runAttachIn(scratchDir, ['--target=kiro']);
    expect(readManifest(scratchDir).attachedTargets.sort()).toEqual(['cc', 'kiro']);

    // BITE (recorded red): a literal `attachedTargets: ['cc', 'kiro']` assignment instead of an
    // append would pass this particular assertion too, so the append is also checked by running
    // --target=cc FIRST alone and asserting it is the sole entry before kiro is ever attached —
    // see the assertion right above (['cc'] after the first call).
  });

  test('re-running on an already-attached target never duplicates it in attachedTargets', async () => {
    await runAttachIn(scratchDir, ['--target=cc']);
    await runAttachIn(scratchDir, ['--target=cc']);
    expect(readManifest(scratchDir).attachedTargets).toEqual(['cc']);
  });

  test('package-mode is treated the same as born (application-time adaptation, documented in attach.ts)', async () => {
    const pmDir = createScratchDir();
    markGitBoundary(pmDir);
    writeFile(
      pmDir,
      'designerpunk.config.ts',
      `import { defineConfig } from '@3fn/core';\nexport default defineConfig({ name: 'T', abbreviation: 'T' });\n`
    );
    try {
      const result = await runAttachIn(pmDir, ['--target=cc']);
      expect(result.exitCode).toBeUndefined();
      expect(fs.existsSync(path.join(pmDir, '.claude/agents'))).toBe(true);
    } finally {
      fs.rmSync(pmDir, { recursive: true, force: true });
    }
  });
});

describe('attach — collision rule (Req 19.8: report, never silently skip or overwrite)', () => {
  test('a pre-existing, unmanaged file at an emitted path is reported and left untouched', async () => {
    const scratchDir = createScratchDir();
    makeBornRepo(scratchDir);
    try {
      const result = await consumerEntry.emitConsumer({
        packageRoot: PKG_ROOT,
        consumerRoot: scratchDir,
        target: 'cc',
        mode: 'attach',
      });
      const fileGrain = result.files.find((f: { grain: string }) => f.grain === 'file');
      expect(fileGrain).toBeDefined();

      const foreignContent = '# this is the consumer’s own file, not generated by DesignerPunk\n';
      writeFile(scratchDir, fileGrain.path, foreignContent);

      const run = await runAttachIn(scratchDir, ['--target=cc']);
      expect(run.output).toMatch(/skipped:.*already exists.*not overwriting/);

      const onDisk = fs.readFileSync(path.join(scratchDir, fileGrain.path), 'utf-8');
      expect(onDisk).toBe(foreignContent);

      // It is NOT silently recorded as ours either.
      const manifest = readManifest(scratchDir);
      expect(manifest.entries[fileGrain.path]).toBeUndefined();
    } finally {
      fs.rmSync(scratchDir, { recursive: true, force: true });
    }
  });

  // The 15.0.0 upgrade rehearsal (.kiro/issues/2026-10-02-sync-steering-dir-suggestion-writes-broken-path.md):
  // a pre-123 repo's own MCP entries survive attach, and the advice for an outdated one names
  // attach — the verb that rewrites MCP wiring in a born repo — never "re-run init".
  test.each([
    ['kiro', '.kiro/settings/mcp.json'],
    ['cc', '.mcp.json'],
  ] as const)(
    'an existing DesignerPunk MCP entry (%s) is left unchanged, and the advice names attach, not init',
    async (target, configFile) => {
      const scratchDir = createScratchDir();
      makeBornRepo(scratchDir);
      try {
        const ownEntry = { command: 'node', env: { MCP_STEERING_DIR: './.kiro/steering' } };
        writeFile(scratchDir, configFile, JSON.stringify({ mcpServers: { 'designerpunk-docs': ownEntry } }, null, 2));

        const run = await runAttachIn(scratchDir, [`--target=${target}`]);
        expect(run.exitCode).toBeUndefined();
        expect(run.output).toContain(existingMcpEntryMessage(configFile, 'designerpunk-docs', target));
        expect(run.output).toContain(`npx designerpunk attach --target=${target}`);
        expect(run.output).not.toContain('re-run init');

        const onDisk = JSON.parse(fs.readFileSync(path.join(scratchDir, configFile), 'utf-8'));
        expect(onDisk.mcpServers['designerpunk-docs']).toEqual(ownEntry);
      } finally {
        fs.rmSync(scratchDir, { recursive: true, force: true });
      }
    },
  );
});

// ---------------------------------------------------------------------------
// `attach --target=<t>` validates the target against the declared profile
// ---------------------------------------------------------------------------

describe('attach — undeclared target', () => {
  test('throws, naming the declared set, for a target the packaged profile does not declare', async () => {
    const scratchDir = createScratchDir();
    makeBornRepo(scratchDir);
    const originalCwd = process.cwd();
    process.chdir(scratchDir);
    try {
      await expect(runAttach(['--target=nonexistent-harness'])).rejects.toThrow(/not declared by the installed package/);
    } finally {
      process.chdir(originalCwd);
      fs.rmSync(scratchDir, { recursive: true, force: true });
    }
  });
});

// ---------------------------------------------------------------------------
// Vocabulary — "the verb never appears without its object" (C20, DD4)
// ---------------------------------------------------------------------------

describe('vocabulary.ts — the fifth lifecycle verb, paired with its object', () => {
  test('attachUsage() is the paired form', () => {
    expect(attachUsage()).toBe(`attach ${ATTACH_OBJECT}`);
    expect(attachUsage()).toBe('attach a harness (agents + MCP config + approvals)');
  });

  test('LIFECYCLE_VERBS has exactly five entries, attach is the fifth', () => {
    expect(LIFECYCLE_VERBS.length).toBe(5);
    expect(LIFECYCLE_VERBS[4].verb).toBe('attach');
    expect(LIFECYCLE_VERBS[4].description).toContain(attachUsage());
  });

  test('lifecycleVerb("attach") returns the paired entry; an unknown verb throws', () => {
    expect(lifecycleVerb('attach').description).toContain(attachUsage());
    expect(() => lifecycleVerb('bogus' as never)).toThrow(/unknown lifecycle verb/);
  });

  test('the born-repo refusal (initBornRepoMessage) pairs attach with its object (C20\'s named surface)', () => {
    expect(initBornRepoMessage('/root')).toContain(attachUsage());
  });

  test('the CLI help text pairs attach with its object (C20\'s named surface)', () => {
    const logSpy = jest.spyOn(console, 'log').mockImplementation();
    try {
      printHelp();
      const output = logSpy.mock.calls.map((c) => c.join(' ')).join('\n');
      expect(output).toContain(attachUsage());
    } finally {
      logSpy.mockRestore();
    }
  });
});

// ---------------------------------------------------------------------------
// Dispatch reachability (instrument row 4.6)
// ---------------------------------------------------------------------------

describe('attach — reachable from the bin (designerpunk.ts dispatch)', () => {
  test('`designerpunk attach --reference` reaches runAttach through main()', async () => {
    const scratchDir = createScratchDir();
    markGitBoundary(scratchDir);
    const originalCwd = process.cwd();
    const originalArgv = process.argv;
    process.chdir(scratchDir);
    process.argv = ['node', 'designerpunk', 'attach', '--target=cc', '--reference'];

    const logSpy = jest.spyOn(console, 'log').mockImplementation();
    const errorSpy = jest.spyOn(console, 'error').mockImplementation();
    try {
      await main();
      const manifest = readManifest(scratchDir);
      expect(manifest.posture).toBe('consume');
    } finally {
      process.chdir(originalCwd);
      process.argv = originalArgv;
      logSpy.mockRestore();
      errorSpy.mockRestore();
      fs.rmSync(scratchDir, { recursive: true, force: true });
    }
  });
});

// ---------------------------------------------------------------------------
// Task 16.5 corrections to the 16.2 write path (the region grain; a release-1 copy on a generated path)
// ---------------------------------------------------------------------------

describe('attach — Task 16.5 corrections', () => {
  let scratchDir: string;
  const sha = (s: string) => require('crypto').createHash('sha256').update(s).digest('hex');
  const MARK_BEGIN = '<!-- designerpunk:managed:begin -->';
  const MARK_END = '<!-- designerpunk:managed:end -->';

  beforeEach(() => {
    scratchDir = createScratchDir();
    makeBornRepo(scratchDir);
  });
  afterEach(() => {
    fs.rmSync(scratchDir, { recursive: true, force: true });
  });

  test('first attach into her EXISTING CLAUDE.md (no markers, no recorded region): the region is APPENDED — her bytes stay, in place, as the prefix', async () => {
    const hers = '# My project\n\nHow I like to work.\n';
    writeFile(scratchDir, 'CLAUDE.md', hers);

    const r = await runAttachIn(scratchDir, ['--target=cc']);

    const text = fs.readFileSync(path.join(scratchDir, 'CLAUDE.md'), 'utf-8');
    expect(text.startsWith(`${hers}\n${MARK_BEGIN}\n`)).toBe(true);
    expect(text.trimEnd().endsWith(MARK_END)).toBe(true);
    expect(text).toContain('@.claude/identity/designerpunk-');
    expect(r.output).not.toContain('missing its markers');
    const entry = readManifest(scratchDir).entries['CLAUDE.md#managed'];
    expect(entry).toMatchObject({ grain: 'region', origin: 'generated' });

    // Re-run: spliced in place, byte-identical.
    await runAttachIn(scratchDir, ['--target=cc']);
    expect(fs.readFileSync(path.join(scratchDir, 'CLAUDE.md'), 'utf-8')).toBe(text);
  });

  test('a RECORDED region whose markers she removed: the catalog "markers missing" string, and no write (never re-appended)', async () => {
    await runAttachIn(scratchDir, ['--target=cc']);
    writeFile(scratchDir, 'CLAUDE.md', '# I took the markers out\n');

    const r = await runAttachIn(scratchDir, ['--target=cc']);

    expect(r.output).toContain('the DesignerPunk-managed region in CLAUDE.md is missing its markers');
    expect(fs.readFileSync(path.join(scratchDir, 'CLAUDE.md'), 'utf-8')).toBe('# I took the markers out\n');
  });

  test('a release-1 COPY on a generated Kiro path: replaced while unmodified (origin → generated); an EDITED copy is hers — reported, untouched', async () => {
    writeFile(scratchDir, '.kiro/agents/ada.json', 'release-1 ada\n');
    writeFile(scratchDir, '.kiro/agents/lina.json', 'her edited lina\n');
    fs.writeFileSync(
      path.join(scratchDir, 'designerpunk.manifest.json'),
      JSON.stringify({
        version: '1', posture: 'born', installedVersion: '14.1.0', contractHash: '', attachedTargets: [],
        entries: {
          '.kiro/agents/ada.json': { hash: sha('release-1 ada\n'), grain: 'file', origin: 'copy' },
          '.kiro/agents/lina.json': { hash: sha('release-1 lina\n'), grain: 'file', origin: 'copy' },
        },
      }, null, 2) + '\n',
    );

    const r = await runAttachIn(scratchDir, ['--target=kiro']);

    const m = readManifest(scratchDir);
    expect(m.entries['.kiro/agents/ada.json'].origin).toBe('generated');
    expect(fs.readFileSync(path.join(scratchDir, '.kiro/agents/ada.json'), 'utf-8')).not.toBe('release-1 ada\n');
    expect(fs.readFileSync(path.join(scratchDir, '.kiro/agents/lina.json'), 'utf-8')).toBe('her edited lina\n');
    expect(m.entries['.kiro/agents/lina.json']).toEqual({ hash: sha('release-1 lina\n'), grain: 'file', origin: 'copy' });
    expect(r.output).toContain('skipped: .kiro/agents/lina.json already exists and was not generated by DesignerPunk');
  });
});
