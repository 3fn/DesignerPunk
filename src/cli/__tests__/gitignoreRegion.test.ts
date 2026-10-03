/**
 * @category evergreen
 * @purpose Spec 123 Task 20.2 — the `.gitignore` managed block's shared source (`shared/gitignoreRegion.ts`):
 * its content (ignores EXACTLY `token-index/` and `.designerpunk/`; the commented platform-output line carries
 * the CONFIGURED `outputDir`), its apply rules, the by-effect `git check-ignore` detection, and the catalog
 * strings it uses (string-equal to the design rows, read from design.md at run time).
 */

import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { execFileSync } from 'child_process';
import * as readline from 'readline';
import {
  GITIGNORE_IGNORED_PATHS,
  GITIGNORE_MARKERS,
  GITIGNORE_PLATFORM_OUTPUT_REASON,
  GITIGNORE_REGION_ID,
  applyGitignoreRegion,
  computeGitignoreRegion,
  designerpunkDirIgnoreState,
  gitignoreRegionContent,
  gitignoreRegionEntry,
  outputDirForRegion,
} from '../shared/gitignoreRegion';
import {
  gitignoreBlockAddedMessage,
  gitignoreBlockConfigUnreadableMessage,
  gitignoreBlockOfferMessage,
  gitignoreBlockReportMessage,
  managedRegionMarkersMissingMessage,
} from '../shared/errorCatalog';
import { confirmGitignoreBlock } from '../sync/Prompter';
import { extractRegion, normalizeRegionContent, wrapRegion } from '../sync/RegionGrain';
import type { ManifestEntry } from '../sync/Manifest';
import { jestConfigModuleLoader } from '../../__tests__/helpers/configModuleLoader';

const DESIGN = fs.readFileSync(path.resolve(__dirname, '../../../.kiro/specs/123-consumer-distribution/design.md'), 'utf8');

function scratch(): string {
  return fs.realpathSync(fs.mkdtempSync(path.join(os.tmpdir(), 'dp-gi-')));
}

/** The second cell (the exact string) of the design catalog row whose first cell starts with `label`. */
function designRowString(label: string): string {
  const line = DESIGN.split('\n').find((l) => l.startsWith(`| **\`.gitignore\` block — ${label}**`));
  if (!line) throw new Error(`design.md has no catalog row "\`.gitignore\` block — ${label}"`);
  const m = /\|\s*`([^`]+)`\s*\|\s*$/.exec(line);
  if (!m) throw new Error(`could not read the string cell of the "${label}" row`);
  return m[1];
}

describe('the block\'s content (design.md C24)', () => {
  test('ignores EXACTLY token-index/ and .designerpunk/ — the only non-comment lines', () => {
    const lines = gitignoreRegionContent('dist/tokens').split('\n');
    expect(lines.filter((l) => l.trim() !== '' && !l.startsWith('#'))).toEqual(['token-index/', '.designerpunk/']);
    expect([...GITIGNORE_IGNORED_PATHS]).toEqual(['token-index/', '.designerpunk/']);
  });

  test('carries, commented and with its reason, the CONFIGURED output path — never a placeholder', () => {
    expect(gitignoreRegionContent('build/tokens')).toBe(
      ['token-index/', '.designerpunk/', GITIGNORE_PLATFORM_OUTPUT_REASON, '# build/tokens/'].join('\n'),
    );
    expect(gitignoreRegionContent('out/design-tokens')).toContain('# out/design-tokens/');
    expect(gitignoreRegionContent('out/design-tokens')).not.toMatch(/<|placeholder|dist\/tokens/);
  });

  test('the reason line is design.md C24\'s, verbatim', () => {
    expect(DESIGN).toContain(`> \`${GITIGNORE_PLATFORM_OUTPUT_REASON}\``);
  });

  test('an output directory that cannot be named as an ignore line leaves the commented line out, never guessed', () => {
    expect(gitignoreRegionContent(undefined)).toBe('token-index/\n.designerpunk/');
  });

  test('outputDirForRegion: repo-relative, `/`-separated, no ./ and no trailing slash; root and outside-the-repo are undefined', () => {
    const root = path.join(path.sep, 'repo');
    expect(outputDirForRegion(root, path.join(root, 'dist', 'tokens'))).toBe('dist/tokens');
    expect(outputDirForRegion(root, path.join(root, 'dist', 'tokens') + path.sep)).toBe('dist/tokens');
    expect(outputDirForRegion(root, root)).toBeUndefined();
    expect(outputDirForRegion(root, path.join(path.sep, 'elsewhere', 'tokens'))).toBeUndefined();
  });

  test('the manifest entry is a generated region whose hash is over the normalized content', () => {
    const content = gitignoreRegionContent('dist/tokens');
    const e = gitignoreRegionEntry(content);
    expect(e).toMatchObject({ grain: 'region', origin: 'generated' });
    expect(e.hash).toBe(gitignoreRegionEntry(content + '\n').hash); // one trailing eol is not part of the content
    expect(e.hash).not.toBe(gitignoreRegionEntry(gitignoreRegionContent('other')).hash);
  });
});

describe('computeGitignoreRegion — from the config\'s outputDir (loadConfig)', () => {
  let dir: string;
  beforeEach(() => { dir = scratch(); });
  afterEach(() => fs.rmSync(dir, { recursive: true, force: true }));

  test.each([
    ['./build/tokens', 'build/tokens'],
    ['out/design-tokens', 'out/design-tokens'],
  ])('output %s → the commented line names %s', async (output, rel) => {
    fs.writeFileSync(path.join(dir, 'designerpunk.config.ts'), `module.exports = { output: '${output}' };\n`);
    const r = await computeGitignoreRegion(dir, jestConfigModuleLoader);
    expect(r).toEqual({ ok: true, content: gitignoreRegionContent(rel) });
  });

  test('a config that will not load → ok:false with the reason, and NO guessed path', async () => {
    fs.writeFileSync(path.join(dir, 'designerpunk.config.ts'), `throw new Error('boom');\n`);
    const r = await computeGitignoreRegion(dir, jestConfigModuleLoader);
    expect(r.ok).toBe(false);
    if (!r.ok) {
      expect(r.reason).toContain('boom');
      expect(JSON.stringify(r)).not.toContain('dist/tokens');
    }
  });
});

describe('applyGitignoreRegion — the apply rules, outside bytes untouched', () => {
  let dir: string;
  const content = gitignoreRegionContent('dist/tokens');
  beforeEach(() => { dir = scratch(); });
  afterEach(() => fs.rmSync(dir, { recursive: true, force: true }));
  const read = () => fs.readFileSync(path.join(dir, '.gitignore'), 'utf8');

  test('no .gitignore → created holding only the region; the entry is recorded', () => {
    const entries: Record<string, ManifestEntry> = {};
    expect(applyGitignoreRegion(dir, content, entries)).toEqual({ outcome: 'written' });
    expect(read()).toBe(wrapRegion(GITIGNORE_MARKERS, content));
    expect(entries[GITIGNORE_REGION_ID]).toEqual(gitignoreRegionEntry(content));
  });

  test('an existing .gitignore with no region (not recorded) → appended after her bytes, which stay in place', () => {
    fs.writeFileSync(path.join(dir, '.gitignore'), 'node_modules/\n.env\n');
    const entries: Record<string, ManifestEntry> = {};
    expect(applyGitignoreRegion(dir, content, entries).outcome).toBe('written');
    expect(read().startsWith('node_modules/\n.env\n')).toBe(true);
    expect(extractRegion(read(), GITIGNORE_MARKERS).found).toBe(true);
  });

  test('re-applying the same content is a no-op; new content splices ONLY the region', () => {
    const entries: Record<string, ManifestEntry> = {};
    fs.writeFileSync(path.join(dir, '.gitignore'), 'before\n');
    applyGitignoreRegion(dir, content, entries);
    const first = read();
    expect(applyGitignoreRegion(dir, content, entries).outcome).toBe('unchanged');
    expect(read()).toBe(first);
    const next = gitignoreRegionContent('build/tokens');
    expect(applyGitignoreRegion(dir, next, entries).outcome).toBe('written');
    expect(read().startsWith('before\n\n')).toBe(true);
    expect(normalizeRegionContent(extractRegion(read(), GITIGNORE_MARKERS).found ? (extractRegion(read(), GITIGNORE_MARKERS) as { region: string }).region : '')).toBe(next);
  });

  test('a recorded block whose markers are gone → the catalog string, nothing written', () => {
    const entries: Record<string, ManifestEntry> = {};
    applyGitignoreRegion(dir, content, entries);
    fs.writeFileSync(path.join(dir, '.gitignore'), 'mine only\n');
    const r = applyGitignoreRegion(dir, content, entries);
    expect(r.outcome).toBe('collision');
    expect(r.message).toBe(managedRegionMarkersMissingMessage('.gitignore'));
    expect(read()).toBe('mine only\n');
  });
});

describe('designerpunkDirIgnoreState — detected by effect, `git check-ignore -q .designerpunk/`', () => {
  let dir: string;
  beforeEach(() => { dir = scratch(); });
  afterEach(() => fs.rmSync(dir, { recursive: true, force: true }));

  test('exit 1 → not-ignored; exit 0 (her own line) → ignored', () => {
    execFileSync('git', ['init', '-q'], { cwd: dir });
    expect(designerpunkDirIgnoreState(dir)).toBe('not-ignored');
    fs.writeFileSync(path.join(dir, '.gitignore'), '.designerpunk/\n');
    expect(designerpunkDirIgnoreState(dir)).toBe('ignored');
  });

  test('exit 128 (not a git repository) → unknown', () => {
    expect(designerpunkDirIgnoreState(dir)).toBe('unknown');
  });

  test('git not on PATH → unknown', () => {
    const saved = process.env.PATH;
    process.env.PATH = '';
    try {
      expect(designerpunkDirIgnoreState(dir)).toBe('unknown');
    } finally {
      process.env.PATH = saved;
    }
  });
});

describe('catalog strings (design.md rows, read at run time)', () => {
  test('offer — string-equal to the design row, `[y/N]` included', () => {
    expect(gitignoreBlockOfferMessage()).toBe(designRowString('offer'));
    expect(gitignoreBlockOfferMessage().endsWith('[y/N]')).toBe(true);
  });

  test('report — string-equal to the design row; its remedy is not `attach --target`', () => {
    expect(gitignoreBlockReportMessage()).toBe(designRowString('report'));
    expect(gitignoreBlockReportMessage()).not.toContain('attach');
  });

  test('config-unreadable (authored at 20.2): names the reason, says nothing was written, guesses no path', () => {
    const m = gitignoreBlockConfigUnreadableMessage('Failed to load /x/designerpunk.config.ts: boom\n    at stack');
    expect(m).toContain('Failed to load /x/designerpunk.config.ts: boom');
    expect(m).not.toContain('at stack');
    expect(m).toContain('Nothing was written to .gitignore');
    expect(m).not.toContain('dist/tokens');
  });

  test('added (authored at 20.2)', () => {
    expect(gitignoreBlockAddedMessage()).toBe(".gitignore: added DesignerPunk's block (it ignores token-index/ and .designerpunk/)");
  });
});

describe('confirmGitignoreBlock — the offer\'s own question, default No', () => {
  const fakeRl = (answer: string) => ({ question: (_q: string, cb: (a: string) => void) => cb(answer) }) as unknown as readline.Interface;

  test.each([['y', true], ['Y', true], ['yes', true], ['', false], ['n', false], ['no', false], ['maybe', false], [' ', false]])(
    'answer %j → %s',
    async (answer, expected) => {
      expect(await confirmGitignoreBlock(gitignoreBlockOfferMessage(), fakeRl(answer))).toBe(expected);
    },
  );

  test('the question is printed exactly as the catalog row states it', async () => {
    let asked = '';
    const rl = { question: (q: string, cb: (a: string) => void) => { asked = q; cb(''); } } as unknown as readline.Interface;
    await confirmGitignoreBlock(gitignoreBlockOfferMessage(), rl);
    expect(asked).toContain(gitignoreBlockOfferMessage());
  });
});
