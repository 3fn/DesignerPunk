/**
 * @category evergreen
 * @purpose Spec 123 Task 22.1 — the personal note, mechanism B (PR-4): the detection rule (unit cases, each with
 * its expected result, and the two-sided bite), creation that never overwrites, the posture gate, the rows each
 * status prints, the placed template (byte-equal to Leonardo's 22.0 design input and to its recorded
 * `git hash-object`), and every catalog string it prints, equal to its design row (read from design.md at run time).
 *
 * KNOWN FORWARD REFERENCE (pending, never skipped): the placed template points at
 * `node_modules/@3fn/core/src/cli/templates/personal-note.example.md`, which is not placed until Peter approves the
 * edited example (instruments rows 2.2/2.3) and a subtask places it. That assertion is held as an explicit
 * `test.failing` plus a named-list guard, the pattern `install-doc.test.ts` uses for the 19.4 items.
 */

import * as crypto from 'crypto';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { execFileSync } from 'child_process';
import {
  PERSONAL_NOTE_REL,
  PERSONAL_NOTE_TEMPLATE_REL,
  TEMPLATE_BEGIN,
  TEMPLATE_END,
  ensurePersonalNote,
  isNoteUnfilled,
  printPersonalNoteRows,
} from '../shared/personalNote';
import {
  generateThemesLine,
  personalNoteCreatedMessage,
  personalNoteNamingMessage,
  personalNoteUnfilledMessage,
  personalNoteUnignoredMessage,
} from '../shared/errorCatalog';

const ROOT = path.resolve(__dirname, '../../..');
const SPEC = path.join(ROOT, '.kiro/specs/123-consumer-distribution');
const TEMPLATE_PLACED = path.join(ROOT, PERSONAL_NOTE_TEMPLATE_REL);
const TEMPLATE_INPUT = path.join(SPEC, 'design-inputs/personal-note.template.md');
const TEMPLATE_RECORD = path.join(SPEC, 'design-inputs/personal-note.template.record.md');
const EXAMPLE_PLACED = path.join(ROOT, 'src/cli/templates/personal-note.example.md');
const DESIGN = fs.readFileSync(path.join(SPEC, 'design.md'), 'utf8');
const TEMPLATE = fs.readFileSync(TEMPLATE_PLACED, 'utf8');

const gitBlobSha = (buf: Buffer) => crypto.createHash('sha1').update(`blob ${buf.length}\0`).update(buf).digest('hex');
const scratch = () => fs.realpathSync(fs.mkdtempSync(path.join(os.tmpdir(), 'dp-note-')));

/** The last backtick span on the design.md row whose first cell starts with `label` (the corrected string). */
function designRow(label: string): string {
  const line = DESIGN.split('\n').find((l) => l.startsWith(`| ${label}`));
  if (!line) throw new Error(`design.md has no catalog row starting "| ${label}"`);
  const spans = [...line.matchAll(/`([^`]+)`/g)].map((m) => m[1]);
  return spans[spans.length - 1];
}

describe('the placed template (22.0 → 22.1; FK-1 (b))', () => {
  test('is byte-equal to the design input', () => {
    expect(fs.readFileSync(TEMPLATE_PLACED).equals(fs.readFileSync(TEMPLATE_INPUT))).toBe(true);
  });

  test('its git hash-object equals the one the 22.0 record names', () => {
    const recorded = /git hash-object`[^`]*`([0-9a-f]{40})`/.exec(fs.readFileSync(TEMPLATE_RECORD, 'utf8'))?.[1];
    expect(recorded).toBeDefined();
    expect(gitBlobSha(fs.readFileSync(TEMPLATE_PLACED))).toBe(recorded);
  });

  test('the template as shipped reads UNFILLED (so what `init`/`generate` create is set aside by agents)', () => {
    expect(isNoteUnfilled(TEMPLATE)).toBe(true);
  });

  test('the walkthrough-offer line follows the PLACED template ("theirs"), per the 22.0 reconciliation', () => {
    expect(TEMPLATE).toContain('Any answer of theirs under the headings ends the offer.');
    expect(TEMPLATE).not.toContain('Any answer of hers');
  });

  test('every template-authored line other than a heading sits inside the marked block', () => {
    const lines = TEMPLATE.split('\n');
    const b = lines.findIndex((l) => l.trim() === TEMPLATE_BEGIN);
    const e = lines.findIndex((l) => l.trim() === TEMPLATE_END);
    expect(b).toBeGreaterThan(-1);
    expect(e).toBeGreaterThan(b);
    const outside = [...lines.slice(0, b), ...lines.slice(e + 1)].filter((l) => l.trim() !== '');
    expect(outside.every((l) => /^#{1,6} /.test(l) || l.trim() === 'TODO')).toBe(true);
  });
});

describe('the detection rule — each case with its expected result (tasks.md Task 22, C9)', () => {
  const block = (body: string) => `${TEMPLATE_BEGIN}\n${body}\n${TEMPLATE_END}`;
  const slots = '## Who I am\n\nTODO\n\n## What I or my organization value\n\nTODO\n\n## How I like to communicate and collaborate\n\nTODO\n';
  const note = (inner: string) => `# Personal note\n\n${inner}\n\n${slots}`;

  test.each<{ name: string; text: string; unfilled: boolean }>([
    { name: 'the template as created', text: TEMPLATE, unfilled: true },
    { name: "an older template's slots, untouched (comments and TODOs, no block)", text: '# Personal note\n\n<!-- who you are -->\n## Who I am\n\nTODO\n\n<!-- values -->\n## Values\n\nTODO\n', unfilled: true },
    { name: 'the template with CRLF line endings', text: TEMPLATE.replace(/\n/g, '\r\n'), unfilled: true },
    { name: 'comments deleted, TODO left', text: note('').replace(/<!--[\s\S]*?-->/g, ''), unfilled: true },
    { name: 'the template block deleted, slots TODO', text: `# Personal note\n\n${slots}`, unfilled: true },
    { name: 'an empty file', text: '', unfilled: true },
    { name: 'one slot filled', text: TEMPLATE.replace('## Who I am\n\nTODO', '## Who I am\n\nI am a designer.'), unfilled: false },
    { name: 'all slots filled', text: TEMPLATE.replace(/\nTODO/g, '\nMy words.'), unfilled: false },
    { name: 'a user-added section with text, slots empty', text: `${TEMPLATE}\n## Extra\n\nSomething of mine.\n`, unfilled: false },
    { name: 'a free rewrite without slots', text: 'Just call me by my first name and be brief.\n', unfilled: false },
    { name: '`TODO: later` with text after it', text: TEMPLATE.replace('## Who I am\n\nTODO', '## Who I am\n\nTODO: later'), unfilled: false },
    { name: 'markers deleted, block text kept (an edit of hers)', text: TEMPLATE.replace(TEMPLATE_BEGIN, '').replace(TEMPLATE_END, ''), unfilled: false },
    { name: 'ONE marker deleted, the other kept: an unmatched marker removes nothing', text: TEMPLATE.replace(TEMPLATE_END, ''), unfilled: false },
    { name: 'the closing marker deleted instead', text: TEMPLATE.replace(TEMPLATE_BEGIN, ''), unfilled: false },
    { name: 'text written INSIDE an intact block (decided R2/R3: unfilled)', text: TEMPLATE.replace('Write your own; don\'t copy it.', 'Write your own; don\'t copy it. I am Sam and I ship web.'), unfilled: true },
    { name: 'an unmatched marker with the block text deleted too', text: `${TEMPLATE_BEGIN}\n\n## Who I am\n\nTODO\n`, unfilled: true },
  ])('$name → unfilled: $unfilled', ({ text, unfilled }) => {
    expect(isNoteUnfilled(text)).toBe(unfilled);
  });

  test('markers are whole trimmed lines, the first pair wins (a second pair is hers)', () => {
    const twoBlocks = `${block('first guidance')}\n\n## Who I am\n\nTODO\n\n${block('my own pasted guidance block')}\n`;
    expect(isNoteUnfilled(twoBlocks)).toBe(false);
    expect(isNoteUnfilled(`  ${TEMPLATE_BEGIN}  \nguidance\n  ${TEMPLATE_END}  \n## H\nTODO\n`)).toBe(true);
    expect(isNoteUnfilled(`text before ${TEMPLATE_BEGIN} guidance ${TEMPLATE_END}\n## H\nTODO\n`)).toBe(false);
  });

  test('BITE: forcing the rule to "filled" turns the template-as-created case red; forcing "unfilled" turns one-slot-filled red', () => {
    const forcedFilled = (_t: string) => false;
    const forcedUnfilled = (_t: string) => true;
    expect(forcedFilled(TEMPLATE)).not.toBe(isNoteUnfilled(TEMPLATE));
    const oneSlot = TEMPLATE.replace('## Who I am\n\nTODO', '## Who I am\n\nI am a designer.');
    expect(forcedUnfilled(oneSlot)).not.toBe(isNoteUnfilled(oneSlot));
  });
});

describe('ensurePersonalNote — create when absent, never overwrite, the posture gate', () => {
  let dir: string;
  beforeEach(() => { dir = scratch(); });
  afterEach(() => fs.rmSync(dir, { recursive: true, force: true }));
  const note = () => path.join(dir, PERSONAL_NOTE_REL);
  const call = (o: Partial<Parameters<typeof ensurePersonalNote>[0]> = {}) =>
    ensurePersonalNote({ root: dir, pkgRoot: ROOT, dsState: 'born', ...o });

  test('absent → created, byte-equal to the template; a second call finds it unfilled and does not rewrite it', () => {
    expect(call()).toBe('created');
    expect(fs.readFileSync(note()).equals(fs.readFileSync(TEMPLATE_PLACED))).toBe(true);
    const stat = fs.statSync(note()).mtimeMs;
    expect(call()).toBe('unfilled');
    expect(fs.statSync(note()).mtimeMs).toBe(stat);
  });

  test.each([
    ['an empty file', ''],
    ['the unfilled template', TEMPLATE],
    ['a filled note', '# Personal note\n\nMy own words.\n'],
  ])('%s is NEVER overwritten (Req 18.3)', (_n, content) => {
    fs.mkdirSync(path.dirname(note()), { recursive: true });
    fs.writeFileSync(note(), content);
    call();
    expect(fs.readFileSync(note(), 'utf8')).toBe(content);
  });

  test('statuses for an existing file: unfilled and filled', () => {
    fs.mkdirSync(path.dirname(note()), { recursive: true });
    fs.writeFileSync(note(), TEMPLATE);
    expect(call()).toBe('unfilled');
    fs.writeFileSync(note(), 'Mine.\n');
    expect(call()).toBe('filled');
  });

  test.each(['package-mode', 'partial', 'unborn'] as const)('POSTURE GATE: %s → nothing created, nothing read', (state) => {
    expect(call({ dsState: state })).toBe('skipped-posture');
    expect(fs.existsSync(path.join(dir, '.designerpunk'))).toBe(false);
  });

  test('`create: false` (a dry run) leaves an absent note absent', () => {
    expect(call({ create: false })).toBe('absent');
    expect(fs.existsSync(note())).toBe(false);
  });

  test('a package with no template → template-missing, nothing written', () => {
    expect(call({ pkgRoot: dir })).toBe('template-missing');
    expect(fs.existsSync(note())).toBe(false);
  });
});

describe('printPersonalNoteRows — who prints what; no run prints both', () => {
  let dir: string;
  let log: jest.SpyInstance;
  beforeEach(() => { dir = scratch(); log = jest.spyOn(console, 'log').mockImplementation(() => {}); });
  afterEach(() => { log.mockRestore(); fs.rmSync(dir, { recursive: true, force: true }); });
  const out = () => log.mock.calls.map((c) => c.join(' '));

  test("created + 'created' in an UNIGNORED git repo: the creation row, then the unignored row", () => {
    execFileSync('git', ['init', '-q'], { cwd: dir });
    printPersonalNoteRows('created', dir, 'created');
    expect(out()).toEqual([`ℹ️  ${personalNoteCreatedMessage()}`, `⚠️  ${personalNoteUnignoredMessage()}`]);
  });

  test("created + 'created' in an IGNORED repo: the creation row only", () => {
    execFileSync('git', ['init', '-q'], { cwd: dir });
    fs.writeFileSync(path.join(dir, '.gitignore'), '.designerpunk/\n');
    printPersonalNoteRows('created', dir, 'created');
    expect(out()).toEqual([`ℹ️  ${personalNoteCreatedMessage()}`]);
  });

  test("created + 'created' where git exits 128 (not a repository): the creation row only (R3)", () => {
    printPersonalNoteRows('created', dir, 'created');
    expect(out()).toEqual([`ℹ️  ${personalNoteCreatedMessage()}`]);
  });

  test("created + 'created-only' (non-migrating sync) in an UNIGNORED repo: the creation row alone (sync's answer is the .gitignore offer)", () => {
    execFileSync('git', ['init', '-q'], { cwd: dir });
    printPersonalNoteRows('created', dir, 'created-only');
    expect(out()).toEqual([`ℹ️  ${personalNoteCreatedMessage()}`]);
  });

  test("created + 'naming' (sync --migrate-legacy): the naming row, no unignored row; created + 'silent' (init): nothing", () => {
    execFileSync('git', ['init', '-q'], { cwd: dir });
    printPersonalNoteRows('created', dir, 'naming');
    expect(out()).toEqual([`ℹ️  ${personalNoteNamingMessage()}`]);
    log.mockClear();
    printPersonalNoteRows('created', dir, 'silent');
    expect(out()).toEqual([]);
  });

  test('unfilled → the warning, in every mode, and never a creation row', () => {
    for (const mode of ['created', 'naming', 'silent'] as const) {
      log.mockClear();
      printPersonalNoteRows('unfilled', dir, mode);
      expect(out()).toEqual([`⚠️  ${personalNoteUnfilledMessage()}`]);
    }
  });

  test.each(['filled', 'absent', 'skipped-posture', 'template-missing'] as const)('%s → nothing printed here', (status) => {
    printPersonalNoteRows(status, dir, 'created');
    expect(out()).toEqual([]);
  });
});

describe('catalog strings — equal to their design rows (read from design.md at run time)', () => {
  test('generate created the personal note (corrected 2026-10-03)', () => {
    expect(personalNoteCreatedMessage()).toBe(designRow('**generate created the personal note**'));
  });
  test('personal note unfilled', () => {
    expect(personalNoteUnfilledMessage()).toBe(designRow('**personal note unfilled**'));
  });
  test('personal note created in an unignored directory', () => {
    expect(personalNoteUnignoredMessage()).toBe(designRow('**personal note created in an unignored directory**'));
  });
  test('generate — registered theme not emitted: the suffix, with Ada\'s token-fact correction (the light-mode clause was false)', () => {
    const suffix =
      ' — registered, not applied yet: a theme you register does not change your generated output; dark mode and the wcag theme apply DesignerPunk\'s built-in overrides to your tokens';
    expect(generateThemesLine([{ name: 'dark', mode: 'dark' }])).toBe(`Themes: dark (dark)${suffix}`);
    expect(generateThemesLine([{ name: 'dark', mode: 'dark' }, { name: 'wcag', mode: 'light' }])).toBe(`Themes: dark (dark), wcag (light)${suffix}`);
    expect(generateThemesLine([{ name: 'dark', mode: 'dark' }])).not.toContain('light and dark mode');
  });

  // INTENDED RED until Leonardo updates his committed source (`design-inputs/catalog-wording.md` § 1 is not mine to edit):
  // it still carries the pre-correction clause "light and dark mode and the wcag theme use DesignerPunk's built-in values".
  test('the committed wording source (catalog-wording.md § 1) agrees with generateThemesLine', () => {
    const src = fs.readFileSync(path.join(SPEC, 'design-inputs/catalog-wording.md'), 'utf8');
    const final = /\*\*Final\*\*:\n```\n(Themes: [^\n]+)\n```/.exec(src)?.[1];
    expect(final).toBeDefined();
    expect(generateThemesLine([{ name: 'dark', mode: 'dark' }])).toBe(final!.replace('<name> (<mode>)[, <name> (<mode>)…]', 'dark (dark)'));
  });
});

describe('PENDING: the example the template points at (known forward reference)', () => {
  const PENDING = ['the-example-the-template-points-at-is-placed'] as const;
  const registered: string[] = [];
  const pending = (id: (typeof PENDING)[number], name: string, fn: () => void) => {
    registered.push(id);
    // test.failing: passes while red, FAILS once satisfied: flip it then. Not a skip.
    test.failing(`[pending: instruments rows 2.2/2.3] ${id}: ${name}`, fn);
  };

  test('the template names the example at its installed path', () => {
    expect(TEMPLATE).toContain('node_modules/@3fn/core/src/cli/templates/personal-note.example.md');
  });

  pending('the-example-the-template-points-at-is-placed', 'src/cli/templates/personal-note.example.md exists (Peter approves the edited example; a subtask places it)', () => {
    expect(fs.existsSync(EXAMPLE_PLACED)).toBe(true);
  });

  test('the registered pending set is exactly the declared list', () => {
    expect([...registered].sort()).toEqual([...PENDING].sort());
  });
});
