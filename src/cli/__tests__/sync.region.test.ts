/**
 * @category evergreen
 * @purpose Spec 123 Task 16.4 — region grain: `extractRegion` and `spliceRegion`
 * over a DesignerPunk-managed marker region (design.md § "C7" — `CLAUDE.md` /
 * `.gitignore` "marker region"; tasks.md Task 16's "Region grain" success
 * criterion: "the `CLAUDE.md` region is spliced; outside bytes unchanged;
 * missing markers → string, no write").
 *
 * Both functions are pure (no filesystem access) — see `RegionGrain.ts`'s
 * module docstring for the grain definition (first-pair-wins on nested or
 * duplicate markers; CRLF/LF detected from outside bytes).
 */

import {
  extractRegion,
  spliceRegion,
  regionMarkers,
  CLAUDE_MD_COMMENT,
  GITIGNORE_COMMENT,
  type RegionMarkers,
  normalizeRegionContent,
  wrapRegion,
  appendRegion,
} from '../sync/RegionGrain';
import {
  managedRegionMarkersMissingMessage,
  managedRegionEditedInsideMessage,
  gitignoreBlockOfferMessage,
  gitignoreBlockReportMessage,
  gitignoreBlockAddedMessage,
} from '../shared/errorCatalog';
import * as fs from 'fs';
import * as path from 'path';
import { execFileSync } from 'child_process';
import { runSync } from '../sync';
import { MANIFEST_FILE, parseManifest, serializeManifest } from '../sync/Manifest';
import type { DesignerPunkManifest } from '../sync/Manifest';
import {
  GITIGNORE_MARKERS,
  GITIGNORE_REGION_ID,
  applyGitignoreRegion,
  gitignoreRegionContent,
  gitignoreRegionEntry,
} from '../shared/gitignoreRegion';
import { jestConfigModuleLoader } from '../../__tests__/helpers/configModuleLoader';
import { captureConsole, createScratch, readText, setupPackage, writeFile } from './syncTestKit';

const CLAUDE_MARKERS = regionMarkers(CLAUDE_MD_COMMENT);

describe('RegionGrain — regionMarkers (comment syntax as a parameter)', () => {
  test('CLAUDE.md: HTML-style wrapping comment', () => {
    expect(regionMarkers(CLAUDE_MD_COMMENT)).toEqual<RegionMarkers>({
      begin: '<!-- designerpunk:managed:begin -->',
      end: '<!-- designerpunk:managed:end -->',
    });
  });

  test('.gitignore: line comment, no closer', () => {
    expect(regionMarkers(GITIGNORE_COMMENT)).toEqual<RegionMarkers>({
      begin: '# designerpunk:managed:begin',
      end: '# designerpunk:managed:end',
    });
  });
});

describe('RegionGrain — extractRegion', () => {
  test('finds the region; before + region + after reassembles the original text exactly', () => {
    const text =
      'first line\n' +
      'second line\n' +
      '<!-- designerpunk:managed:begin -->\n' +
      '@.claude/identity/designerpunk-personal-note.md\n' +
      '@.claude/identity/designerpunk-core-goals.md\n' +
      '<!-- designerpunk:managed:end -->\n' +
      'trailing line\n';

    const result = extractRegion(text, CLAUDE_MARKERS);
    expect(result.found).toBe(true);
    if (!result.found) return;

    expect(result.region).toBe('@.claude/identity/designerpunk-personal-note.md\n@.claude/identity/designerpunk-core-goals.md\n');
    expect(result.before + result.region + result.after).toBe(text);
    expect(result.before.endsWith('<!-- designerpunk:managed:begin -->\n')).toBe(true);
    expect(result.after.startsWith('<!-- designerpunk:managed:end -->')).toBe(true);
  });

  test('empty region: begin and end on adjacent lines with a blank line between', () => {
    const text = '<!-- designerpunk:managed:begin -->\n\n<!-- designerpunk:managed:end -->\n';
    const result = extractRegion(text, CLAUDE_MARKERS);
    expect(result.found).toBe(true);
    if (!result.found) return;
    // The blank line's own eol is the region's content — reassembly is exact either way.
    expect(result.region).toBe('\n');
    expect(result.before + result.region + result.after).toBe(text);
  });

  test('missing begin marker → not found', () => {
    const text = 'no markers here at all\n<!-- designerpunk:managed:end -->\n';
    expect(extractRegion(text, CLAUDE_MARKERS)).toEqual({ found: false });
  });

  test('missing end marker (begin present, unmatched) → not found', () => {
    const text = '<!-- designerpunk:managed:begin -->\nsome content\nno end marker\n';
    expect(extractRegion(text, CLAUDE_MARKERS)).toEqual({ found: false });
  });

  test('missing both markers → not found', () => {
    expect(extractRegion('plain file, nothing managed\n', CLAUDE_MARKERS)).toEqual({ found: false });
  });

  test('nested/duplicate markers: the FIRST begin/end pair is matched; a second pair is left in `after`', () => {
    const text =
      '<!-- designerpunk:managed:begin -->\n' +
      'first region content\n' +
      '<!-- designerpunk:managed:end -->\n' +
      'between the two pairs\n' +
      '<!-- designerpunk:managed:begin -->\n' +
      'second region content\n' +
      '<!-- designerpunk:managed:end -->\n';

    const result = extractRegion(text, CLAUDE_MARKERS);
    expect(result.found).toBe(true);
    if (!result.found) return;
    expect(result.region).toBe('first region content\n');
    // The second pair is untouched, inside `after`.
    expect(result.after).toContain('<!-- designerpunk:managed:begin -->\nsecond region content\n<!-- designerpunk:managed:end -->\n');
    expect(result.before + result.region + result.after).toBe(text);
  });
});

describe('RegionGrain — spliceRegion', () => {
  test('replaces ONLY the region; outside bytes (prefix through begin, end through EOF) are byte-identical', () => {
    const text =
      'Some consumer prose above.\n\n' +
      '<!-- designerpunk:managed:begin -->\n' +
      '@.claude/identity/designerpunk-old.md\n' +
      '<!-- designerpunk:managed:end -->\n\n' +
      'Some consumer prose below.\n';

    const result = spliceRegion(text, CLAUDE_MARKERS, '@.claude/identity/designerpunk-new-1.md\n@.claude/identity/designerpunk-new-2.md', 'CLAUDE.md');
    expect(result.ok).toBe(true);
    if (!result.ok) return;

    const prefixEnd = text.indexOf('<!-- designerpunk:managed:begin -->') + CLAUDE_MARKERS.begin.length;
    const suffixStart = text.indexOf('<!-- designerpunk:managed:end -->');
    const originalPrefix = text.slice(0, prefixEnd);
    const originalSuffix = text.slice(suffixStart);

    expect(result.text.startsWith(originalPrefix)).toBe(true);
    expect(result.text.endsWith(originalSuffix)).toBe(true);
    expect(result.text).toBe(
      'Some consumer prose above.\n\n' +
        '<!-- designerpunk:managed:begin -->\n' +
        '@.claude/identity/designerpunk-new-1.md\n@.claude/identity/designerpunk-new-2.md\n' +
        '<!-- designerpunk:managed:end -->\n\n' +
        'Some consumer prose below.\n',
    );
  });

  test('missing markers → the exact design-catalog string, and the caller never writes', () => {
    const text = 'a file with no managed region\n';
    const result = spliceRegion(text, CLAUDE_MARKERS, '@.claude/identity/designerpunk-x.md', 'CLAUDE.md');

    expect(result.ok).toBe(false);
    if (result.ok) return;

    // Verbatim design.md § "Error Handling" row: "managed region — markers missing".
    expect(result.message).toBe(
      'the DesignerPunk-managed region in CLAUDE.md is missing its markers — not rewriting the file. ' +
        'Restore the markers (see install doc § "Your agent layer") or re-run attach',
    );
    expect(result.message).toBe(managedRegionMarkersMissingMessage('CLAUDE.md'));

    // Demonstrate the never-write contract: a caller following the `ok` discriminant
    // (the only sanctioned way to consume a SpliceResult) never reaches a write on
    // this branch. The writer is a spy standing in for `fs.writeFileSync`.
    const writer = { writeFileSync: jest.fn() };
    if (result.ok) {
      writer.writeFileSync('/tmp/should-not-be-reached', (result as { text: string }).text);
    }
    expect(writer.writeFileSync).not.toHaveBeenCalled();
  });

  test('missing markers never throws (unmatched end-only case too)', () => {
    expect(() => spliceRegion('<!-- designerpunk:managed:end -->\nno begin\n', CLAUDE_MARKERS, 'x', 'CLAUDE.md')).not.toThrow();
    const result = spliceRegion('<!-- designerpunk:managed:end -->\nno begin\n', CLAUDE_MARKERS, 'x', 'CLAUDE.md');
    expect(result.ok).toBe(false);
  });

  test('nested/duplicate markers: splice touches only the FIRST pair; the second pair is preserved verbatim', () => {
    const text =
      '<!-- designerpunk:managed:begin -->\n' +
      'old first\n' +
      '<!-- designerpunk:managed:end -->\n' +
      'between\n' +
      '<!-- designerpunk:managed:begin -->\n' +
      'old second\n' +
      '<!-- designerpunk:managed:end -->\n';

    const result = spliceRegion(text, CLAUDE_MARKERS, 'new first', 'CLAUDE.md');
    expect(result.ok).toBe(true);
    if (!result.ok) return;

    expect(result.text).toBe(
      '<!-- designerpunk:managed:begin -->\n' +
        'new first\n' +
        '<!-- designerpunk:managed:end -->\n' +
        'between\n' +
        '<!-- designerpunk:managed:begin -->\n' +
        'old second\n' +
        '<!-- designerpunk:managed:end -->\n',
    );
  });

  test('idempotent on re-splice: splicing the same output with the same contents is a no-op', () => {
    const text =
      '<!-- designerpunk:managed:begin -->\n' + 'old\n' + '<!-- designerpunk:managed:end -->\n' + 'tail\n';

    const first = spliceRegion(text, CLAUDE_MARKERS, 'stable content', 'CLAUDE.md');
    expect(first.ok).toBe(true);
    if (!first.ok) return;

    const second = spliceRegion(first.text, CLAUDE_MARKERS, 'stable content', 'CLAUDE.md');
    expect(second.ok).toBe(true);
    if (!second.ok) return;

    expect(second.text).toBe(first.text);

    // A third splice is still a fixed point.
    const third = spliceRegion(second.text, CLAUDE_MARKERS, 'stable content', 'CLAUDE.md');
    expect(third.ok).toBe(true);
    if (!third.ok) return;
    expect(third.text).toBe(second.text);
  });

  test('CRLF files stay CRLF: outside bytes keep \\r\\n, and new region content is normalized to \\r\\n', () => {
    const text =
      'above\r\n' +
      '<!-- designerpunk:managed:begin -->\r\n' +
      'old\r\n' +
      '<!-- designerpunk:managed:end -->\r\n' +
      'below\r\n';

    const result = spliceRegion(text, CLAUDE_MARKERS, 'line one\nline two', 'CLAUDE.md');
    expect(result.ok).toBe(true);
    if (!result.ok) return;

    expect(result.text).toBe(
      'above\r\n' +
        '<!-- designerpunk:managed:begin -->\r\n' +
        'line one\r\nline two\r\n' +
        '<!-- designerpunk:managed:end -->\r\n' +
        'below\r\n',
    );
    // No stray LF-only line endings were introduced.
    expect(result.text.replace(/\r\n/g, '')).not.toContain('\n');
  });

  test('LF files stay LF (the common case, no CRLF anywhere in the file)', () => {
    const text = '<!-- designerpunk:managed:begin -->\nold\n<!-- designerpunk:managed:end -->\n';
    const result = spliceRegion(text, CLAUDE_MARKERS, 'new', 'CLAUDE.md');
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.text).toBe('<!-- designerpunk:managed:begin -->\nnew\n<!-- designerpunk:managed:end -->\n');
    expect(result.text).not.toContain('\r\n');
  });

  test('.gitignore region uses the line-comment marker form end to end', () => {
    const gi = regionMarkers(GITIGNORE_COMMENT);
    const text = 'node_modules/\n# designerpunk:managed:begin\n.designerpunk/old\n# designerpunk:managed:end\ndist/\n';
    const result = spliceRegion(text, gi, '.designerpunk/personal-note.local.md', '.gitignore');
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.text).toBe('node_modules/\n# designerpunk:managed:begin\n.designerpunk/personal-note.local.md\n# designerpunk:managed:end\ndist/\n');
  });
});

// Task 16.5 — the region's comparand and the first write into a file with no region.
describe('RegionGrain — normalizeRegionContent / wrapRegion / appendRegion (Task 16.5)', () => {
  const M = regionMarkers(CLAUDE_MD_COMMENT);

  test('normalizeRegionContent: LF-normalized, ONE trailing eol stripped — an extracted CRLF region and the emitted LF content agree', () => {
    expect(normalizeRegionContent('a\nb\n')).toBe('a\nb');
    expect(normalizeRegionContent('a\r\nb\r\n')).toBe('a\nb');
    const crlf = `x\r\n${M.begin}\r\na\r\nb\r\n${M.end}\r\n`;
    const r = extractRegion(crlf, M);
    if (!r.found) throw new Error('no region');
    expect(normalizeRegionContent(r.region)).toBe(normalizeRegionContent('a\nb\n'));
  });

  test('wrapRegion then extract round-trips the content; spliceRegion over it is a fixed point', () => {
    const text = wrapRegion(M, 'line 1\nline 2\n');
    expect(text).toBe(`${M.begin}\nline 1\nline 2\n${M.end}\n`);
    const s = spliceRegion(text, M, 'line 1\nline 2\n', 'CLAUDE.md');
    expect(s).toEqual({ ok: true, text });
  });

  test('appendRegion keeps every existing byte as the prefix, in the file\'s own eol style, separated by one blank line', () => {
    const lf = '# mine\n';
    expect(appendRegion(lf, M, '@x\n')).toBe(`# mine\n\n${M.begin}\n@x\n${M.end}\n`);
    const noEol = '# mine';
    expect(appendRegion(noEol, M, '@x\n')).toBe(`# mine\n\n${M.begin}\n@x\n${M.end}\n`);
    const crlf = '# mine\r\n';
    const out = appendRegion(crlf, M, '@x\n@y\n');
    expect(out.startsWith(crlf)).toBe(true);
    expect(out).toBe(`# mine\r\n\r\n${M.begin}\r\n@x\r\n@y\r\n${M.end}\r\n`);
    // And the appended region is then an ordinary region: splice is a fixed point.
    expect(spliceRegion(out, M, '@x\n@y\n', 'CLAUDE.md')).toEqual({ ok: true, text: out });
  });
});

// ---------------------------------------------------------------------------
// Task 20.2 — the `.gitignore` block through `sync`: the target-free round-trip, and PR-9's offer
// ---------------------------------------------------------------------------

describe('sync — the .gitignore block (Task 20.2; design.md C24 and its PR-9 erratum)', () => {
  let scratch: string;
  let con: ReturnType<typeof captureConsole>;

  /** A born repo as `init` leaves it, minus an agent layer: a manifest, a config, a fake installed package. */
  function bornRepo(opts: { output?: string; git?: boolean; block?: boolean; mine?: string; posture?: 'born' | 'consume' } = {}): void {
    setupPackage(scratch);
    writeFile(scratch, 'designerpunk.config.ts', `module.exports = { output: '${opts.output ?? './dist/tokens'}' };\n`);
    if (opts.git !== false) execFileSync('git', ['init', '-q'], { cwd: scratch });
    const entries: DesignerPunkManifest['entries'] = {};
    if (opts.mine !== undefined) writeFile(scratch, '.gitignore', opts.mine);
    if (opts.block) applyGitignoreRegion(scratch, gitignoreRegionContent('dist/tokens'), entries);
    const manifest: DesignerPunkManifest = {
      version: '1',
      posture: opts.posture ?? 'born',
      installedVersion: '15.0.0',
      contractHash: '',
      attachedTargets: [],
      entries,
    };
    writeFile(scratch, MANIFEST_FILE, serializeManifest(manifest));
  }

  const manifestOf = () => parseManifest(readText(scratch, MANIFEST_FILE));
  const giPath = () => path.join(scratch, '.gitignore');
  const gi = () => fs.readFileSync(giPath(), 'utf-8');

  const run = (o: Partial<Parameters<typeof runSync>[0]> = {}) =>
    runSync({ projectRoot: scratch, isTTY: true, configLoader: jestConfigModuleLoader, ...o });

  beforeEach(() => {
    scratch = createScratch('dp-sync-gitignore-');
    con = captureConsole();
  });
  afterEach(() => {
    con.restore();
    fs.rmSync(scratch, { recursive: true, force: true });
  });

  describe('the round-trip: outside lines byte-unchanged', () => {
    test('a recorded block that matches the config is unchanged: no write, the .gitignore bytes identical', async () => {
      bornRepo({ block: true, mine: 'node_modules/\n.env\n' });
      const before = gi();
      const out = await run({ confirmGitignoreBlock: async () => { throw new Error('no offer expected'); } });
      expect(gi()).toBe(before);
      expect(out.applied).not.toContain(GITIGNORE_REGION_ID);
      expect(out.gitignoreBlock).toBeUndefined();
      expect(con.output()).toContain('managed item unchanged');
    });

    test('the config\'s output changes → `--apply` rewrites ONLY the region; every outside byte is unchanged; the entry follows', async () => {
      bornRepo({ block: true, mine: 'node_modules/\n.env\n' });
      const beforeText = gi();
      const outsideBefore = beforeText.slice(0, beforeText.indexOf(GITIGNORE_MARKERS.begin));
      writeFile(scratch, 'designerpunk.config.ts', `module.exports = { output: './build/tokens' };\n`);
      const out = await run({ apply: true });
      expect(out.applied).toContain(GITIGNORE_REGION_ID);
      expect(gi()).toContain('# build/tokens/');
      expect(gi()).not.toContain('# dist/tokens/');
      expect(gi().startsWith(outsideBefore)).toBe(true);
      // everything after the end marker is also untouched (here: nothing follows)
      expect(gi().slice(gi().indexOf(GITIGNORE_MARKERS.end))).toBe(beforeText.slice(beforeText.indexOf(GITIGNORE_MARKERS.end)));
      expect(manifestOf().entries[GITIGNORE_REGION_ID]).toEqual(gitignoreRegionEntry(gitignoreRegionContent('build/tokens')));
    });

    test('lines she adds AFTER the block survive an update, byte for byte', async () => {
      bornRepo({ block: true, mine: 'node_modules/\n' });
      fs.appendFileSync(giPath(), 'coverage/\n.cache/\n');
      writeFile(scratch, 'designerpunk.config.ts', `module.exports = { output: './build/tokens' };\n`);
      await run({ apply: true });
      expect(gi().endsWith(`${GITIGNORE_MARKERS.end}\ncoverage/\n.cache/\n`)).toBe(true);
      expect(gi().startsWith('node_modules/\n\n')).toBe(true);
    });

    test('RED (edited inside): reported with the catalog row; the terminal confirmation alone never replaces it; `--apply` does', async () => {
      bornRepo({ block: true });
      fs.writeFileSync(giPath(), gi().replace('token-index/', 'token-index/\nmy-extra/'));
      const edited = gi();
      await run({ confirm: async () => true });
      expect(con.output()).toContain(managedRegionEditedInsideMessage('.gitignore'));
      expect(gi()).toBe(edited);
      await run({ apply: true });
      expect(gi()).not.toContain('my-extra/');
    });

    test('RED (markers gone): the catalog row, nothing written', async () => {
      bornRepo({ block: true });
      fs.writeFileSync(giPath(), 'only mine\n');
      await run({ apply: true });
      expect(con.output()).toContain(managedRegionMarkersMissingMessage('.gitignore'));
      expect(gi()).toBe('only mine\n');
    });
  });

  describe('PR-9: the offer for a repo born without a block (its own [y/N], default No)', () => {
    test('an unignored repo, interactive: the offer appears with the catalog text, and the block is written ONLY after a yes', async () => {
      bornRepo({ mine: 'node_modules/\n' });
      const questions: string[] = [];
      let existedWhenAsked: boolean | undefined;
      let bytesWhenAsked = '';
      const out = await run({
        confirmGitignoreBlock: async (q) => {
          questions.push(q);
          existedWhenAsked = fs.existsSync(giPath());
          bytesWhenAsked = gi();
          return true;
        },
      });
      expect(questions).toEqual([gitignoreBlockOfferMessage()]);
      expect(bytesWhenAsked).toBe('node_modules/\n'); // nothing written before the answer
      expect(existedWhenAsked).toBe(true);
      expect(out.gitignoreBlock).toBe('added');
      expect(gi().startsWith('node_modules/\n')).toBe(true);
      expect(gi()).toContain('token-index/');
      expect(gi()).toContain('# dist/tokens/');
      expect(manifestOf().entries[GITIGNORE_REGION_ID]).toEqual(gitignoreRegionEntry(gitignoreRegionContent('dist/tokens')));
      expect(con.output()).toContain(gitignoreBlockAddedMessage());
    });

    test('an already-ignored repo (her own line): no offer, no write', async () => {
      bornRepo({ mine: '.designerpunk/\n' });
      const before = gi();
      const out = await run({ confirmGitignoreBlock: async () => { throw new Error('asked'); } });
      expect(out.gitignoreBlock).toBeUndefined();
      expect(gi()).toBe(before);
      expect(con.output()).not.toContain(gitignoreBlockReportMessage());
      expect(manifestOf().entries[GITIGNORE_REGION_ID]).toBeUndefined();
    });

    test('non-interactive: the report and its corrected remedy are printed, zero bytes written, no question asked', async () => {
      bornRepo();
      const manifestBefore = readText(scratch, MANIFEST_FILE);
      const out = await run({ isTTY: false, confirmGitignoreBlock: async () => { throw new Error('asked'); } });
      expect(out.gitignoreBlock).toBe('reported');
      expect(con.output()).toContain(gitignoreBlockReportMessage());
      expect(con.output()).not.toContain('attach --target');
      expect(fs.existsSync(giPath())).toBe(false);
      expect(readText(scratch, MANIFEST_FILE)).toBe(manifestBefore);
    });

    test('`--apply` off a TTY: the report, and zero bytes written to .gitignore', async () => {
      bornRepo({ mine: 'node_modules/\n' });
      const out = await run({ isTTY: false, apply: true, confirmGitignoreBlock: async () => { throw new Error('asked'); } });
      expect(out.gitignoreBlock).toBe('reported');
      expect(con.output()).toContain(gitignoreBlockReportMessage());
      expect(gi()).toBe('node_modules/\n');
      expect(manifestOf().entries[GITIGNORE_REGION_ID]).toBeUndefined();
    });

    test('`--dry-run` never writes: the report row, nothing changed', async () => {
      bornRepo();
      const out = await run({ dryRun: true });
      expect(out.gitignoreBlock).toBe('reported');
      expect(fs.existsSync(giPath())).toBe(false);
    });

    test('answered No (or Enter): zero bytes written, and the offer recurs on the next interactive run', async () => {
      bornRepo({ mine: 'node_modules/\n' });
      let asked = 0;
      const no = async () => { asked++; return false; };
      const first = await run({ confirmGitignoreBlock: no });
      expect(first.gitignoreBlock).toBe('declined');
      expect(gi()).toBe('node_modules/\n');
      expect(manifestOf().entries[GITIGNORE_REGION_ID]).toBeUndefined();
      const second = await run({ confirmGitignoreBlock: no });
      expect(second.gitignoreBlock).toBe('declined');
      expect(asked).toBe(2);
    });

    test('a non-git directory (git exits 128): nothing printed, zero bytes, no question', async () => {
      bornRepo({ git: false });
      const out = await run({ confirmGitignoreBlock: async () => { throw new Error('asked'); } });
      expect(out.gitignoreBlock).toBeUndefined();
      expect(con.output()).not.toContain(gitignoreBlockOfferMessage());
      expect(con.output()).not.toContain(gitignoreBlockReportMessage());
      expect(fs.existsSync(giPath())).toBe(false);
    });

    test('a consume-posture repo is not offered a block', async () => {
      bornRepo({ posture: 'consume' });
      const out = await run({ confirmGitignoreBlock: async () => { throw new Error('asked'); } });
      expect(out.gitignoreBlock).toBeUndefined();
    });

    test('a repo already carrying the markers (block in place, not recorded) is not offered a second one', async () => {
      bornRepo({ mine: `# mine\n\n${GITIGNORE_MARKERS.begin}\ntoken-index/\n${GITIGNORE_MARKERS.end}\n` });
      const out = await run({ confirmGitignoreBlock: async () => { throw new Error('asked'); } });
      expect(out.gitignoreBlock).toBeUndefined();
    });
  });
});
