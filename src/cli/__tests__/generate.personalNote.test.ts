/**
 * @category evergreen
 * @purpose Spec 123 Task 22.1 — `generate` and the personal note (mechanism B; design.md C26 and its 2026-10-03
 * errata): created from the template when absent (the joiner's fresh clone has none), with the "created" row and,
 * PR-13, the unignored-directory row; the unfilled warning for an existing unfilled note; nothing for a filled one;
 * never both rows; created only in a BORN repo; written at the design system's root, not the cwd. Also the
 * `Themes:` line's honest suffix (R3, Ada's advisory; Leonardo's final wording).
 */
jest.mock('../../config/ConfigLoader');
jest.mock('../resolveTokens');
jest.mock('../loadComponentTokens');
jest.mock('../../generators/generateTokenFiles');
jest.mock('../../generators/generateTokenIndex');
jest.mock('../../registries/ComponentTokenRegistry', () => ({
  ComponentTokenRegistry: { getAll: () => [] },
}));

import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { execFileSync } from 'child_process';
import { loadConfig } from '../../config/ConfigLoader';
import { generateTokenFiles } from '../../generators/generateTokenFiles';
import { resolveTokens } from '../resolveTokens';
import { loadComponentTokens } from '../loadComponentTokens';
import { runGenerate } from '../designerpunk';
import {
  generateThemesLine,
  personalNoteCreatedMessage,
  personalNoteUnfilledMessage,
  personalNoteUnignoredMessage,
} from '../shared/errorCatalog';
import { PERSONAL_NOTE_REL, PERSONAL_NOTE_TEMPLATE_REL } from '../shared/personalNote';

const TEMPLATE = fs.readFileSync(path.resolve(__dirname, '../../..', PERSONAL_NOTE_TEMPLATE_REL), 'utf8');

function write(dir: string, rel: string, content: string): void {
  const full = path.join(dir, rel);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, content, 'utf8');
}

describe('runGenerate — the personal note (Task 22.1)', () => {
  let dir: string;
  let originalCwd: string;
  let log: jest.SpyInstance;

  /** A BORN repo: a config with a local `tokenSource` and the token tier barrels. */
  function born(opts: { git?: 'repo' | 'ignored' | 'none'; themes?: Array<{ name: string; mode: string }> } = {}): void {
    write(dir, 'designerpunk.config.ts', `export default { name: 'T', abbreviation: 'T', tokenSource: './src/tokens' };\n`);
    write(dir, 'src/tokens/index.ts', 'export function getAllPrimitiveTokens() { return []; }\n');
    write(dir, 'src/tokens/semantic/index.ts', 'export function getAllSemanticTokens() { return []; }\n');
    if (opts.git === 'none' || opts.git === undefined) fs.mkdirSync(path.join(dir, '.git'));
    else {
      execFileSync('git', ['init', '-q'], { cwd: dir });
      if (opts.git === 'ignored') write(dir, '.gitignore', '.designerpunk/\n');
    }
    (loadConfig as jest.Mock).mockResolvedValue({
      name: 'T',
      abbreviation: 'T',
      themes: opts.themes ?? [],
      tokenSourceRoot: path.join(dir, 'src/tokens'),
      tokenSourceMode: 'local',
      componentTokenDirs: [],
      outputDir: path.join(dir, 'dist/tokens'),
      configDir: dir,
    });
  }

  const out = () => log.mock.calls.map((c) => c.join(' '));
  const created = `ℹ️  ${personalNoteCreatedMessage()}`;
  const unignored = `⚠️  ${personalNoteUnignoredMessage()}`;
  const unfilled = `⚠️  ${personalNoteUnfilledMessage()}`;
  const notePath = () => path.join(dir, PERSONAL_NOTE_REL);

  beforeEach(() => {
    originalCwd = process.cwd();
    dir = fs.realpathSync(fs.mkdtempSync(path.join(os.tmpdir(), 'dp-gen-note-')));
    process.chdir(dir);
    jest.spyOn(process, 'exit').mockImplementation((() => undefined) as never);
    log = jest.spyOn(console, 'log').mockImplementation(() => undefined);
    jest.spyOn(console, 'error').mockImplementation(() => undefined);
    jest.spyOn(console, 'warn').mockImplementation(() => undefined);
    (resolveTokens as jest.Mock).mockReturnValue({ primitiveTokens: [], semanticTokens: [] });
    (loadComponentTokens as jest.Mock).mockReturnValue([]);
    (generateTokenFiles as jest.Mock).mockReturnValue({
      resolvedLight: [], resolvedDark: [], themeVaryingTokens: new Set<string>(), primitiveOklch: new Map(),
    });
  });
  afterEach(() => {
    process.chdir(originalCwd);
    fs.rmSync(dir, { recursive: true, force: true });
    jest.restoreAllMocks();
  });

  test('absent → created from the template; the creation row (and, in an unignored git repo, the unignored row), NO warning', async () => {
    born({ git: 'repo' });
    await runGenerate();
    expect(fs.readFileSync(notePath(), 'utf8')).toBe(TEMPLATE);
    expect(out()).toContain(created);
    expect(out()).toContain(unignored);
    expect(out()).not.toContain(unfilled);
    expect(out().indexOf(unignored)).toBe(out().indexOf(created) + 1); // immediately after the creation row
  });

  test('created in an IGNORED repo → the creation row, no unignored row', async () => {
    born({ git: 'ignored' });
    await runGenerate();
    expect(out()).toContain(created);
    expect(out()).not.toContain(unignored);
  });

  test('created where git cannot answer (exit 128) → the creation row, no unignored row (R3)', async () => {
    born({ git: 'none' });
    await runGenerate();
    expect(out()).toContain(created);
    expect(out()).not.toContain(unignored);
  });

  test('an existing UNFILLED note → the warning only, and the file is untouched; an empty file too', async () => {
    born({ git: 'repo' });
    for (const content of [TEMPLATE, '']) {
      write(dir, PERSONAL_NOTE_REL, content);
      log.mockClear();
      await runGenerate();
      expect(out()).toContain(unfilled);
      expect(out()).not.toContain(created);
      expect(out()).not.toContain(unignored); // nothing was created, so PR-13's row never fires
      expect(fs.readFileSync(notePath(), 'utf8')).toBe(content);
    }
  });

  test('an existing FILLED note → no note row of any kind, file untouched', async () => {
    born({ git: 'repo' });
    write(dir, PERSONAL_NOTE_REL, '# Personal note\n\nMy words.\n');
    await runGenerate();
    expect(out()).not.toContain(created);
    expect(out()).not.toContain(unfilled);
    expect(out()).not.toContain(unignored);
    expect(fs.readFileSync(notePath(), 'utf8')).toBe('# Personal note\n\nMy words.\n');
  });

  test('POSTURE GATE: package mode (a config without tokenSource, no tier) → no note, no rows', async () => {
    write(dir, 'designerpunk.config.ts', `export default { name: 'T', abbreviation: 'T' };\n`);
    fs.mkdirSync(path.join(dir, '.git'));
    (loadConfig as jest.Mock).mockResolvedValue({
      name: 'T', abbreviation: 'T', themes: [], tokenSourceRoot: '/pkg/tokens', tokenSourceMode: 'package',
      componentTokenDirs: [], outputDir: path.join(dir, 'dist'), configDir: dir,
    });
    await runGenerate();
    expect(out()).toContain('📦 T (T)'); // generate RAN (this is not a refusal): the gate, not an early exit, is what withheld the note
    expect(fs.existsSync(path.join(dir, '.designerpunk'))).toBe(false);
    expect(out()).not.toContain(created);
    expect(out()).not.toContain(unfilled);
  });

  test('run from a SUBDIRECTORY: the note lands at the design system\'s root, not the cwd', async () => {
    born({ git: 'ignored' });
    fs.mkdirSync(path.join(dir, 'src/components'), { recursive: true });
    process.chdir(path.join(dir, 'src/components'));
    await runGenerate();
    expect(fs.existsSync(notePath())).toBe(true);
    expect(fs.existsSync(path.join(dir, 'src/components/.designerpunk'))).toBe(false);
  });

  describe('the Themes: line (R3; Ada\'s advisory; Leonardo\'s final wording)', () => {
    test('one registered theme → the line carries the honest suffix, string-equal to the catalog function', async () => {
      born({ git: 'ignored', themes: [{ name: 'dark', mode: 'dark' }] });
      await runGenerate();
      expect(out()).toContain(`   ${generateThemesLine([{ name: 'dark', mode: 'dark' }])}`);
      expect(out().some((l) => /^ {3}Themes: dark \(dark\)$/.test(l))).toBe(false); // RED: the bare line
    });

    test('several themes share ONE line with ONE suffix; none registered → no line', async () => {
      born({ git: 'ignored', themes: [{ name: 'dark', mode: 'dark' }, { name: 'wcag', mode: 'light' }] });
      await runGenerate();
      const themeLines = out().filter((l) => l.trim().startsWith('Themes:'));
      expect(themeLines).toHaveLength(1);
      expect(themeLines[0]).toContain('dark (dark), wcag (light) — registered, not applied yet');
      log.mockClear();
      born({ git: 'ignored', themes: [] });
      await runGenerate();
      expect(out().some((l) => l.trim().startsWith('Themes:'))).toBe(false);
    });
  });
});
