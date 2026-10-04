/**
 * @category evergreen
 * @purpose Spec 123 Task 22.1 — `sync` and the personal note (mechanism B; design.md C26): a non-migrating `sync`
 * creates the note from the template when absent and prints the "created" row alone; an existing unfilled note gets
 * the warning only; a filled note, nothing; created only in a born-posture repo (never a consume manifest, never
 * the steward checkout); `--dry-run` writes nothing. (`sync --migrate-legacy`'s naming row is asserted in
 * `sync.cohort.test.ts`, which owns the release-1 cohort fixture that run needs.)
 */

import * as fs from 'fs';
import * as path from 'path';
import { execFileSync } from 'child_process';
import { runSync } from '../sync';
import { MANIFEST_FILE, serializeManifest } from '../sync/Manifest';
import type { DesignerPunkManifest } from '../sync/Manifest';
import { personalNoteCreatedMessage, personalNoteUnfilledMessage, personalNoteUnignoredMessage } from '../shared/errorCatalog';
import { PERSONAL_NOTE_REL, PERSONAL_NOTE_TEMPLATE_REL } from '../shared/personalNote';
import { jestConfigModuleLoader } from '../../__tests__/helpers/configModuleLoader';
import { REPO_ROOT, captureConsole, createScratch, readText, setupPackage, writeFile } from './syncTestKit';

const TEMPLATE = fs.readFileSync(path.join(REPO_ROOT, PERSONAL_NOTE_TEMPLATE_REL), 'utf8');

describe('sync — the personal note (Task 22.1)', () => {
  let scratch: string;
  let con: ReturnType<typeof captureConsole>;
  const created = `ℹ️  ${personalNoteCreatedMessage()}`;
  const unfilled = `⚠️  ${personalNoteUnfilledMessage()}`;
  const unignored = `⚠️  ${personalNoteUnignoredMessage()}`;
  const notePath = () => path.join(scratch, PERSONAL_NOTE_REL);

  /** A BORN repo (config + tier), a manifest, a fake installed package that carries the real template. */
  function repo(opts: { posture?: 'born' | 'consume'; git?: boolean; manifest?: boolean } = {}): void {
    setupPackage(scratch, { files: { [PERSONAL_NOTE_TEMPLATE_REL]: TEMPLATE } });
    writeFile(scratch, 'src/tokens/index.ts', '\nexport function getAllPrimitiveTokens() { return []; }\n');
    writeFile(scratch, 'src/tokens/semantic/index.ts', '\nexport function getAllSemanticTokens() { return []; }\n');
    writeFile(scratch, 'designerpunk.config.ts', `module.exports = { tokenSource: './src/tokens', output: './dist/tokens' };\n`);
    if (opts.git === false) fs.mkdirSync(path.join(scratch, '.git'));
    else execFileSync('git', ['init', '-q'], { cwd: scratch });
    writeFile(scratch, '.gitignore', '.designerpunk/\n'); // keep the .gitignore block's offer out of these cases
    if (opts.manifest !== false) {
      const m: DesignerPunkManifest = {
        version: '1', posture: opts.posture ?? 'born', installedVersion: '15.0.0', contractHash: '', attachedTargets: [], entries: {},
      };
      writeFile(scratch, MANIFEST_FILE, serializeManifest(m));
    }
  }
  const run = (o: Partial<Parameters<typeof runSync>[0]> = {}) =>
    runSync({ projectRoot: scratch, isTTY: true, configLoader: jestConfigModuleLoader, ...o });

  beforeEach(() => {
    scratch = createScratch('dp-sync-note-');
    con = captureConsole();
  });
  afterEach(() => {
    con.restore();
    fs.rmSync(scratch, { recursive: true, force: true });
  });

  test('note absent → created from the template; the "created" row ONLY (no warning, no unignored row)', async () => {
    repo();
    const out = await run();
    expect(out.personalNote).toBe('created');
    expect(fs.readFileSync(notePath(), 'utf8')).toBe(TEMPLATE);
    expect(con.output()).toContain(created);
    expect(con.output()).not.toContain(unfilled);
    expect(con.output()).not.toContain(unignored);
  });

  test('the "created" row alone even where git does not ignore .designerpunk/ (sync answers that with the block offer, not this row)', async () => {
    repo();
    fs.rmSync(path.join(scratch, '.gitignore'));
    await run({ confirmGitignoreBlock: async () => false });
    expect(con.output()).toContain(created);
    expect(con.output()).not.toContain(unignored);
  });

  test('an existing UNFILLED note → the warning only; untouched', async () => {
    repo();
    writeFile(scratch, PERSONAL_NOTE_REL, TEMPLATE);
    const out = await run();
    expect(out.personalNote).toBe('unfilled');
    expect(con.output()).toContain(unfilled);
    expect(con.output()).not.toContain(created);
    expect(readText(scratch, PERSONAL_NOTE_REL)).toBe(TEMPLATE);
  });

  test('an existing FILLED note → no note row', async () => {
    repo();
    writeFile(scratch, PERSONAL_NOTE_REL, 'Mine.\n');
    const out = await run();
    expect(out.personalNote).toBe('filled');
    expect(con.output()).not.toContain(created);
    expect(con.output()).not.toContain(unfilled);
    expect(readText(scratch, PERSONAL_NOTE_REL)).toBe('Mine.\n');
  });

  test('POSTURE GATE: a consume manifest → no note; a repo with no manifest → no note', async () => {
    repo({ posture: 'consume' });
    expect((await run()).personalNote).toBeUndefined();
    expect(fs.existsSync(path.join(scratch, '.designerpunk'))).toBe(false);
    fs.rmSync(path.join(scratch, MANIFEST_FILE));
    expect((await run()).personalNote).toBeUndefined();
    expect(fs.existsSync(path.join(scratch, '.designerpunk'))).toBe(false);
  });

  test('POSTURE GATE: the steward checkout (the package\'s own tree) → no note', async () => {
    const out = await runSync({ projectRoot: REPO_ROOT, isTTY: true, dryRun: true });
    expect(out.stopped).toBe('steward');
    expect(out.personalNote).toBeUndefined();
  });

  test('`--dry-run` writes nothing: an absent note stays absent; an existing unfilled one is still reported', async () => {
    repo();
    const out = await run({ dryRun: true });
    expect(out.personalNote).toBe('absent');
    expect(fs.existsSync(notePath())).toBe(false);
    writeFile(scratch, PERSONAL_NOTE_REL, TEMPLATE);
    await run({ dryRun: true });
    expect(con.output()).toContain(unfilled);
  });

  test('a package without the template → the degradation warning, no note', async () => {
    repo();
    fs.rmSync(path.join(scratch, 'node_modules/@3fn/core', PERSONAL_NOTE_TEMPLATE_REL));
    const out = await run();
    expect(out.personalNote).toBe('template-missing');
    expect(fs.existsSync(notePath())).toBe(false);
    expect(con.output()).toContain('personal-note template');
  });
});
