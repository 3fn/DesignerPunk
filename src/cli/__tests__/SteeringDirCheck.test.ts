/**
 * @category evergreen
 * @purpose sync's stale-`MCP_STEERING_DIR` recommendation never points at a directory a
 * consumer repo does not have. The pre-123 `init` wrote the BARE `./.kiro/steering`;
 * swapping its segment gave `./governance`, and the docs MCP then indexed 0 documents
 * (status `failed`) where the template value indexes 83 (the 15.0.0 upgrade rehearsal,
 * `.kiro/issues/2026-10-02-sync-steering-dir-suggestion-writes-broken-path.md`).
 */
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import {
  applySteeringDirFix,
  detectStaleSteeringDir,
  recommendedSteeringDir,
  reportAndMaybeFixStaleSteeringDir,
  templateSteeringDir,
  MCP_TEMPLATE_REL,
} from '../sync/SteeringDirCheck';

const REPO_ROOT = path.resolve(__dirname, '../../..');

/** The template's own value — the comparand, read the same way a consumer's install would hold it. */
function templateValueFromDisk(): string {
  const template = JSON.parse(fs.readFileSync(path.join(REPO_ROOT, MCP_TEMPLATE_REL), 'utf-8'));
  return template.mcpServers['designerpunk-docs'].env.MCP_STEERING_DIR;
}

function tempRepoWithKiroConfig(steeringDir: string): string {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'steering-dir-check-'));
  fs.mkdirSync(path.join(dir, '.kiro/settings'), { recursive: true });
  fs.writeFileSync(
    path.join(dir, '.kiro/settings/mcp.json'),
    JSON.stringify(
      {
        mcpServers: {
          'designerpunk-docs': {
            command: 'node',
            args: ['./node_modules/@3fn/core/dist/mcp/docs-mcp.js'],
            env: { MCP_STEERING_DIR: steeringDir },
          },
        },
      },
      null,
      2,
    ),
  );
  return dir;
}

describe('SteeringDirCheck — the template value', () => {
  test('templateSteeringDir reads the package template, and the template points into the installed package', () => {
    const fromTemplate = templateValueFromDisk();
    expect(templateSteeringDir(REPO_ROOT)).toBe(fromTemplate);
    expect(templateSteeringDir()).toBe(fromTemplate); // the default package-root resolution finds the same file
    expect(fromTemplate).toContain('node_modules/');
    expect(fromTemplate.endsWith('governance')).toBe(true);
  });

  test('an unreadable template yields null, never a guess', () => {
    const empty = fs.mkdtempSync(path.join(os.tmpdir(), 'steering-dir-no-template-'));
    expect(templateSteeringDir(empty)).toBeNull();
  });
});

describe('SteeringDirCheck — recommendedSteeringDir', () => {
  const template = templateValueFromDisk();

  test.each(['./.kiro/steering', './.kiro/steering/', '.kiro/steering'])(
    'the pre-123 bare value %s recommends the template value, never ./governance',
    (bare) => {
      const recommended = recommendedSteeringDir(bare);
      expect(recommended).toBe(template);
      expect(recommended).not.toBe('./governance');
      expect(recommended).not.toBe('governance');
    },
  );

  test('the package-prefixed value keeps its prefix (unchanged behavior)', () => {
    expect(recommendedSteeringDir('./node_modules/@3fn/core/.kiro/steering')).toBe(
      './node_modules/@3fn/core/governance',
    );
  });

  test('a bare value with no readable template gets no recommendation', () => {
    expect(recommendedSteeringDir('./.kiro/steering', null)).toBeNull();
  });
});

describe('SteeringDirCheck — detect, report and apply on a pre-123 config', () => {
  test('the bare value is detected as stale', () => {
    const dir = tempRepoWithKiroConfig('./.kiro/steering');
    expect(detectStaleSteeringDir(dir)).toEqual([
      { configPath: '.kiro/settings/mcp.json', serverKey: 'designerpunk-docs', currentValue: './.kiro/steering' },
    ]);
  });

  test('applying the fix writes the template value into the config', () => {
    const dir = tempRepoWithKiroConfig('./.kiro/steering');
    const [finding] = detectStaleSteeringDir(dir);
    expect(applySteeringDirFix(dir, finding)).toBe(true);
    const written = JSON.parse(fs.readFileSync(path.join(dir, '.kiro/settings/mcp.json'), 'utf-8'));
    expect(written.mcpServers['designerpunk-docs'].env.MCP_STEERING_DIR).toBe(templateValueFromDisk());
    expect(detectStaleSteeringDir(dir)).toEqual([]); // no longer stale
  });

  test('with no template, applying writes nothing', () => {
    const dir = tempRepoWithKiroConfig('./.kiro/steering');
    const before = fs.readFileSync(path.join(dir, '.kiro/settings/mcp.json'), 'utf-8');
    const [finding] = detectStaleSteeringDir(dir);
    expect(applySteeringDirFix(dir, finding, null)).toBe(false);
    expect(fs.readFileSync(path.join(dir, '.kiro/settings/mcp.json'), 'utf-8')).toBe(before);
  });

  test('the advisory report recommends the template value and writes nothing', async () => {
    const dir = tempRepoWithKiroConfig('./.kiro/steering');
    const before = fs.readFileSync(path.join(dir, '.kiro/settings/mcp.json'), 'utf-8');
    const lines: string[] = [];
    const spy = jest.spyOn(console, 'log').mockImplementation((...args: unknown[]) => {
      lines.push(args.join(' '));
    });
    try {
      await expect(reportAndMaybeFixStaleSteeringDir(dir, { dryRun: true })).resolves.toBe(0);
    } finally {
      spy.mockRestore();
    }
    const out = lines.join('\n');
    expect(out).toContain(
      `.kiro/settings/mcp.json → designerpunk-docs: "./.kiro/steering" (recommended: "${templateValueFromDisk()}")`,
    );
    expect(out).not.toContain('(recommended: "./governance")');
    expect(fs.readFileSync(path.join(dir, '.kiro/settings/mcp.json'), 'utf-8')).toBe(before);
  });
});
