/**
 * Stacy's falsification fixtures for merge-hold.ts (ballot 2026-11-07-merge-hold-and-law-ratified-checks § 2
 * item 3, fixtures 1 to 17), plus the normalisation steps (item 1), the run record (A2) and the command line.
 * Each case is a committed body or file text with its expected verdict. Owner: Thurgood.
 *
 * The cases are numbered as the ballot numbers them ("F<n>").
 */

import * as fs from 'fs';
import * as path from 'path';
import {
  Adapter,
  ChangedFile,
  HoldContext,
  PrView,
  SUFFIX,
  STATUS_RE,
  bodyHash,
  escapeAnnotation,
  formatHold,
  formatLaw,
  isGovernancePath,
  judgeLawRatified,
  judgeMergeHold,
  main,
  normalizeQuote,
  parseBody,
  parsedLines,
  quoteFound,
  readRecord,
} from '../merge-hold';

const FIX = path.join(__dirname, '..', '__merge-hold-fixtures__');
const read = (n: string): string => fs.readFileSync(path.join(FIX, n), 'utf8');

const WORDS = 'Re: 2, Ratified. F-1, 5; F-2, Yes; F-3, Yes';
const REC = '.kiro/docs/ballots/2026-11-07-x.md';
const OK_STATUS = '# Ballot\n\n**Date**: 2026-11-07\n**Status**: **RATIFIED (Peter, 2026-11-07T17:59:15Z)**. Peter\'s words: "Re: 2, Ratified. F-1, 5; F-2, Yes; F-3, Yes".\n';

const ctx = (files: Record<string, string> = {}, comments: Record<string, string> = {}): HoldContext => ({
  repo: '3fn/DesignerPunk',
  pr: 725,
  fileAtHead: (p) => (p in files ? files[p] : null),
  commentBody: (kind, id) => (`${kind}-${id}` in comments ? comments[`${kind}-${id}`] : null),
});
const verdicts = (body: string, c: HoldContext): string[] => judgeMergeHold(body, c).map((f) => f.verdict);
const answer = (words: string, source: string, time = '2026-11-07T17:59:15Z'): string => `**Peter answered**: ${time} — "${words}" — ${source}`;
const marker = (q = 'Ratify X?'): string => `**Open for Peter**: ${q}`;

describe('merge-hold: the marker, its answer, the cited source', () => {
  it('F1: #719\'s body at its merge reads red on both jobs', () => {
    const body = read('pr-719-body.md');
    const hold = judgeMergeHold(body, ctx());
    expect(hold.map((f) => f.verdict)).toEqual(['unanswered']);
    const law = judgeLawRatified(body, [{ status: 'M', path: 'governance/platform-implementation-guidelines.md' }, { status: 'M', path: 'governance/DesignerPunk-Integration-Guide.md' }], (p) =>
      p === '.kiro/docs/ballots/2026-11-07-129-u4-android-type-statements.md' ? read('pr-719-ballot-at-merge.md') : null,
    );
    expect(law.map((f) => f.verdict)).toEqual(['ballot-not-ratified', 'ok', 'ok']);
  });

  it('F2: a marker inside a code fence or a code span is not counted', () => {
    const fenced = ['```', marker(), '```', '', 'text'].join('\n');
    expect(parseBody(fenced)).toEqual([]);
    expect(parseBody('text `**Open for Peter**: inline` more')).toEqual([]);
    expect(verdicts(fenced, ctx())).toEqual([]);
    expect(parseBody(['~~~', marker(), '~~~'].join('\n'))).toEqual([]);
  });

  it('F3: a pointer marker is counted, and needs an answer', () => {
    const body = marker('see .kiro/docs/ballots/2026-11-07-x.md § 6');
    expect(parseBody(body)).toHaveLength(1);
    expect(verdicts(body, ctx())).toEqual(['unanswered']);
    expect(verdicts([body, answer(WORDS, REC)].join('\n'), ctx({ [REC]: OK_STATUS }))).toEqual(['ok']);
  });

  it('F4: two markers with one answer is red', () => {
    const body = [marker('first?'), marker('second?'), answer(WORDS, REC)].join('\n');
    expect(verdicts(body, ctx({ [REC]: OK_STATUS }))).toEqual(['unanswered', 'ok']);
    expect(formatHold(judgeMergeHold(body, ctx({ [REC]: OK_STATUS }))).red).toBe(true);
  });

  it('F5: an answer whose quote is not in the cited file is red', () => {
    const body = [marker(), answer('Yes, go ahead', REC)].join('\n');
    expect(verdicts(body, ctx({ [REC]: OK_STATUS }))).toEqual(['quote-not-found']);
  });

  it('F6: a "not now — merge" answer naming no record is red; naming one is green', () => {
    const noRec = [marker(), answer('not now — merge', REC)].join('\n');
    expect(verdicts(noRec, ctx({ [REC]: 'Peter: "not now — merge"' }))).toEqual(['not-now-no-record']);
    const withRec = [marker(), `${answer('not now — merge', REC)} — filed in .kiro/issues/2026-11-07-y.md`].join('\n');
    expect(verdicts(withRec, ctx({ [REC]: 'Peter: "not now — merge"' }))).toEqual(['ok']);
  });

  it('F7: an answer line before its marker is red', () => {
    const body = [answer(WORDS, REC), marker()].join('\n');
    expect(verdicts(body, ctx({ [REC]: OK_STATUS }))).toEqual(['answer-before-marker', 'unanswered']);
  });

  it('F8: a cited path absent at the head is red', () => {
    expect(verdicts([marker(), answer(WORDS, REC)].join('\n'), ctx())).toEqual(['source-absent']);
  });

  it('F9: a comment URL on another PR or issue is red; on this PR it is read', () => {
    const url = (kind: string, n: number, frag: string): string => `https://github.com/3fn/DesignerPunk/${kind}/${n}#${frag}`;
    expect(verdicts([marker(), answer(WORDS, url('pull', 999, 'issuecomment-1'))].join('\n'), ctx({}, { 'issuecomment-1': WORDS }))).toEqual(['comment-other-pr']);
    expect(verdicts([marker(), answer(WORDS, url('issues', 725, 'issuecomment-1'))].join('\n'), ctx({}, { 'issuecomment-1': WORDS }))).toEqual(['comment-other-pr']);
    expect(verdicts([marker(), answer(WORDS, 'https://github.com/other/repo/pull/725#issuecomment-1')].join('\n'), ctx({}, { 'issuecomment-1': WORDS }))).toEqual(['comment-other-pr']);
    expect(verdicts([marker(), answer(WORDS, url('pull', 725, 'issuecomment-1'))].join('\n'), ctx({}, { 'issuecomment-1': WORDS }))).toEqual(['ok']);
    expect(verdicts([marker(), answer(WORDS, url('pull', 725, 'issuecomment-2'))].join('\n'), ctx({}, { 'issuecomment-1': WORDS }))).toEqual(['comment-absent']);
    expect(verdicts([marker(), answer(WORDS, url('pull', 725, 'pullrequestreview-7'))].join('\n'), ctx({}, { 'pullrequestreview-7': WORDS }))).toEqual(['ok']);
    expect(verdicts([marker(), answer(WORDS, url('pull', 725, 'discussion_r9'))].join('\n'), ctx({}, { 'discussion-9': WORDS }))).toEqual(['ok']);
  });

  it('F10: a quote wrapped inside a > blockquote in the cited file is green; one case per other normalisation step', () => {
    const body = [marker(), answer(WORDS, REC)].join('\n');
    const wrapped = '> Peter, 2026-11-07:\n> Re: 2, Ratified.\n> F-1, 5; F-2, Yes;\n> F-3, Yes\n';
    expect(verdicts(body, ctx({ [REC]: wrapped }))).toEqual(['ok']);
    expect(verdicts(body, ctx({ [REC]: '> > nested: Re: 2, Ratified. F-1, 5; F-2, Yes; F-3, Yes' }))).toEqual(['ok']);
    expect(verdicts(body, ctx({ [REC]: 'He said *Re: 2, Ratified.* **F-1, 5;** _F-2, Yes;_ F-3, Yes' }))).toEqual(['ok']);
    expect(verdicts([marker(), answer('Don\'t merge until I answer', REC)].join('\n'), ctx({ [REC]: 'He said “Don’t merge until I answer”' }))).toEqual(['ok']);
    expect(verdicts([marker(), answer('Go "now"', REC)].join('\n'), ctx({ [REC]: 'He said “Go “now””' }))).toEqual(['ok']);
    expect(verdicts(body, ctx({ [REC]: 'Re:\t2,\n\n   Ratified.   F-1,   5;\r\nF-2, Yes; F-3, Yes' }))).toEqual(['ok']);
  });

  it('the comparison is otherwise exact and case-sensitive', () => {
    expect(quoteFound('Yes', 'yes')).toBe(false);
    expect(quoteFound('Yes', 'Yes!')).toBe(true);
    expect(quoteFound('', 'anything')).toBe(false);
    expect(normalizeQuote('> a  *b*\n> “c”')).toBe('a b "c"');
  });

  it('F16: two markers, each with its own answer, is green', () => {
    const body = [marker('first?'), answer(WORDS, REC), '', marker('second?'), answer('F-1, 5', REC)].join('\n');
    expect(verdicts(body, ctx({ [REC]: OK_STATUS }))).toEqual(['ok', 'ok']);
  });

  it('F17: a marker inside a blockquote is not counted', () => {
    expect(parseBody('> **Open for Peter**: quoted from another PR')).toEqual([]);
    expect(parseBody('  **Open for Peter**: indented, not at column 0')).toEqual([]);
  });

  it('an answer with a bad time or shape is unparsed; a second answer for one marker is red', () => {
    expect(verdicts([marker(), answer(WORDS, REC, 'yesterday')].join('\n'), ctx({ [REC]: OK_STATUS }))).toEqual(['answer-unparsed']);
    expect(verdicts([marker(), '**Peter answered**: yes'].join('\n'), ctx())).toEqual(['answer-unparsed']);
    expect(verdicts([marker(), answer(WORDS, REC), answer(WORDS, REC)].join('\n'), ctx({ [REC]: OK_STATUS }))).toEqual(['ok', 'extra-answer']);
  });

  it('a body with no marker is green with nothing parsed', () => {
    const r = formatHold(judgeMergeHold('A body with no question.', ctx()));
    expect(r.red).toBe(false);
    expect(r.parsedMarker).toBe(false);
  });

  it('every output line ends with the authorship disclaimer', () => {
    const r = formatHold(judgeMergeHold([marker(), answer(WORDS, REC)].join('\n'), ctx({ [REC]: OK_STATUS })));
    expect(r.lines.length).toBeGreaterThan(0);
    for (const l of r.lines) expect(l.endsWith(SUFFIX)).toBe(true);
    for (const l of formatLaw(judgeLawRatified('', [], () => null)).lines) expect(l.endsWith(SUFFIX)).toBe(true);
  });
});

describe('law-ratified: the cited ballot and the presence limb', () => {
  const law = (p: string, ballot = REC): string => `**Edit kind**: ${p} — LAW (${ballot})`;
  const gov = (p: string, status = 'M'): ChangedFile => ({ status, path: p });
  const read2 = (files: Record<string, string>) => (p: string): string | null => (p in files ? files[p] : null);

  it('F11: a suffixed Status (RATIFIED-ready, RATIFIED?) reads red; the accepted forms read green', () => {
    for (const bad of ['**Status**: RATIFIED-ready, awaiting Peter', '**Status**: RATIFIED?', '**Status**: RATIFIEDX', '**Status**: **DRAFT**']) {
      expect(STATUS_RE.test(bad)).toBe(false);
    }
    for (const good of ['**Status**: **RATIFIED (Peter, 2026-11-07)**', '**Status**: RATIFIED', '**Status**: `RATIFIED` (Peter)', '**Status**: RATIFIED (Peter)']) {
      expect(STATUS_RE.test(good)).toBe(true);
    }
    const f = judgeLawRatified(law('governance/a.md'), [gov('governance/a.md')], read2({ [REC]: '**Status**: RATIFIED-ready\n' }));
    expect(f.map((x) => x.verdict)).toEqual(['ballot-not-ratified', 'ok']);
  });

  it('F12: a LAW line citing a path with no **Status**: line is red', () => {
    const f = judgeLawRatified(law('governance/a.md'), [gov('governance/a.md')], read2({ [REC]: '# A note\n\nNo status here.\n' }));
    expect(f.map((x) => x.verdict)).toEqual(['ballot-no-status', 'ok']);
  });

  it('F13: a ballot ratified on another branch reads DRAFT at the head, so red', () => {
    const f = judgeLawRatified(law('governance/a.md'), [gov('governance/a.md')], read2({ [REC]: '**Status**: **DRAFT**\n' }));
    expect(f[0].verdict).toBe('ballot-not-ratified');
  });

  it('F14: the same-PR record-first commit (the head carries RATIFIED) is green', () => {
    const f = judgeLawRatified(law('governance/a.md'), [gov('governance/a.md'), gov(REC, 'A')], read2({ [REC]: OK_STATUS }));
    expect(f.map((x) => x.verdict)).toEqual(['ok', 'ok']);
    expect(formatLaw(f).red).toBe(false);
  });

  it('a cited ballot absent at the head, and a LAW line citing no ballot, are red', () => {
    expect(judgeLawRatified(law('governance/a.md'), [gov('governance/a.md')], read2({})).map((x) => x.verdict)).toEqual(['ballot-absent', 'ok']);
    expect(judgeLawRatified('**Edit kind**: governance/a.md — LAW', [gov('governance/a.md')], read2({})).map((x) => x.verdict)).toEqual(['law-line-no-ballot', 'ok']);
  });

  it('F15: a deleted governance file needs a line naming its old path; a renamed one, its new path', () => {
    const del = judgeLawRatified('**Edit kind**: governance/old.md — CORRECTION (r; truth: t)', [gov('governance/old.md', 'D')], read2({}));
    expect(del.map((x) => x.verdict)).toEqual(['ok']);
    const delMissing = judgeLawRatified('', [gov('governance/old.md', 'D')], read2({}));
    expect(delMissing.map((x) => x.verdict)).toEqual(['no-edit-kind-line']);
    const renamedNew = judgeLawRatified('**Edit kind**: governance/new.md — EXECUTION (c)', [gov('governance/new.md', 'R')], read2({}));
    expect(renamedNew.map((x) => x.verdict)).toEqual(['ok']);
    const renamedOldOnly = judgeLawRatified('**Edit kind**: governance/old.md — EXECUTION (c)', [gov('governance/new.md', 'R')], read2({}));
    expect(renamedOldOnly.map((x) => x.verdict)).toEqual(['no-edit-kind-line']);
  });

  it('F-2: every canonical/agents/** file counts, frontmatter included; non-governance paths are not read', () => {
    expect(isGovernancePath('canonical/agents/ada.md')).toBe(true);
    expect(isGovernancePath('canonical/agents/anything/else.yaml')).toBe(true);
    expect(isGovernancePath('governance/x.md')).toBe(true);
    expect(isGovernancePath('.kiro/steering/x.md')).toBe(true);
    expect(isGovernancePath('.kiro/hooks/RELEASE-FLOW.md')).toBe(true);
    expect(isGovernancePath('.kiro/hooks/complete-task.sh')).toBe(false);
    expect(isGovernancePath('src/x.ts')).toBe(false);
    const f = judgeLawRatified('', [gov('canonical/agents/ada.md'), gov('src/x.ts')], read2({}));
    expect(f.map((x) => [x.where, x.verdict])).toEqual([['canonical/agents/ada.md', 'no-edit-kind-line']]);
  });

  it('presence is file-grain: one line naming a file with two LAW hunks passes', () => {
    const body = [law('governance/a.md'), '**Edit kind**: governance/a.md L10–12 — LAW (' + REC + ')'].join('\n');
    const f = judgeLawRatified(body, [gov('governance/a.md')], read2({ [REC]: OK_STATUS }));
    expect(f.every((x) => x.verdict === 'ok')).toBe(true);
  });

  it('an Edit-kind line inside a code fence is not read', () => {
    const f = judgeLawRatified(['```', law('governance/a.md'), '```'].join('\n'), [gov('governance/a.md')], read2({ [REC]: OK_STATUS }));
    expect(f.map((x) => x.verdict)).toEqual(['no-edit-kind-line']);
  });
});

describe('the run record (A2) and the command line', () => {
  const body = ['intro', marker(), answer(WORDS, REC)].join('\n');

  it('the annotation carries the body\'s sha256 and the parsed lines verbatim', () => {
    const r = readRecord(body);
    expect(r.summary).toBeNull();
    expect(r.message).toBe(`body-sha256: ${bodyHash(body)}\n${parsedLines(body).join('\n')}`);
    expect(parsedLines(body)).toEqual([`L2: ${marker()}`, `L3: ${answer(WORDS, REC)}`]);
    expect(bodyHash(body)).toMatch(/^[0-9a-f]{64}$/);
    expect(bodyHash(body + ' ')).not.toBe(bodyHash(body));
  });

  it('past the size limit the annotation carries the hash and a count, and the full lines go to the summary', () => {
    const big = Array.from({ length: 2000 }, (_, i) => marker('q'.repeat(60) + i)).join('\n');
    const r = readRecord(big);
    expect(r.message).toContain(`body-sha256: ${bodyHash(big)}`);
    expect(r.message).toContain('2000 marker and answer lines');
    expect(r.summary).not.toBeNull();
  });

  it('escapes the workflow-command characters', () => {
    expect(escapeAnnotation('a%b\nc\rd')).toBe('a%25b%0Ac%0Dd');
  });

  const adapter = (view: Partial<PrView>, files: Record<string, string>, changed: ChangedFile[]): Adapter => ({
    prView: () => ({ body: '', headSha: 'h', baseSha: 'b', repo: '3fn/DesignerPunk', number: 725, ...view }),
    fileAt: (_s, p) => (p in files ? files[p] : null),
    checkedOut: () => ({ headSha: null, baseSha: null }),
    changedFiles: () => changed,
    commentBody: () => null,
  });
  const run = (argv: string[], a: Adapter): { code: number; out: string } => {
    let out = '';
    const code = main(argv, a, (s) => (out += s));
    return { code, out };
  };

  it('merge-hold exits 1 on a red body, 0 on a green one, and prints the run record first', () => {
    const red = run(['--job', 'merge-hold', '--pr', '725'], adapter({ body: marker() }, {}, []));
    expect(red.code).toBe(1);
    expect(red.out.startsWith('::notice title=merge-hold-read::body-sha256: ')).toBe(true);
    const green = run(['--job', 'merge-hold', '--pr', '725'], adapter({ body: [marker(), answer(WORDS, REC)].join('\n') }, { [REC]: OK_STATUS }, []));
    expect(green.code).toBe(0);
  });

  it('law-ratified exits 1 when a governance file has no line, 0 when it has one', () => {
    expect(run(['--job', 'law-ratified', '--pr', '725'], adapter({ body: '' }, {}, [{ status: 'M', path: 'governance/a.md' }])).code).toBe(1);
    expect(run(['--job', 'law-ratified', '--pr', '725'], adapter({ body: '**Edit kind**: governance/a.md — EXECUTION (c)' }, {}, [{ status: 'M', path: 'governance/a.md' }])).code).toBe(0);
  });

  it('a usage error exits 2, and an unreadable PR prints one unavailable line', () => {
    expect(run(['--job', 'nope', '--pr', '1'], adapter({}, {}, [])).code).toBe(2);
    const bad: Adapter = { ...adapter({}, {}, []), prView: () => { throw new Error('boom'); } };
    const r = run(['--job', 'merge-hold', '--pr', '1'], bad);
    expect(r.code).toBe(2);
    expect(r.out).toBe('merge-hold: unavailable (the PR cannot be read) — continue\n');
  });

  it('judges the checked-out head and the event base, never the live ones', () => {
    const seen: string[] = [];
    const a: Adapter = {
      ...adapter({ body: '', headSha: 'LIVE-HEAD', baseSha: 'LIVE-BASE' }, {}, []),
      checkedOut: () => ({ headSha: 'RUN-HEAD', baseSha: 'RUN-BASE' }),
      fileAt: (s, p) => { seen.push(`file:${s}:${p}`); return null; },
      changedFiles: (b, h) => { seen.push(`diff:${b}..${h}`); return []; },
    };
    run(['--job', 'law-ratified', '--pr', '730'], a);
    expect(seen).toContain('diff:RUN-BASE..RUN-HEAD');
    expect(seen.join()).not.toContain('LIVE');
    const m = run(['--job', 'merge-hold', '--pr', '730'], { ...a, prView: () => ({ body: [marker(), answer(WORDS, REC)].join('\n'), headSha: 'LIVE-HEAD', baseSha: 'LIVE-BASE', repo: 'r/r', number: 730 }) });
    expect(m.code).toBe(1);
    expect(seen).toContain(`file:RUN-HEAD:${REC}`);
    expect(seen.join()).not.toContain('LIVE');
  });

  it('liveAdapter.checkedOut takes the base from the fetched base ref over the payload base.sha', () => {
    const { execFileSync } = require('child_process');
    const os = require('os');
    const fs = require('fs');
    const path = require('path');
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'mh-'));
    const g = (...a: string[]) => execFileSync('git', ['-C', dir, '-c', 'user.name=t', '-c', 'user.email=t@t', ...a], { encoding: 'utf8' }).trim();
    g('init', '-q', '-b', 'main');
    g('commit', '-q', '--allow-empty', '-m', 'a');
    g('commit', '-q', '--allow-empty', '-m', 'b');
    const tip = g('rev-parse', 'HEAD');
    g('update-ref', 'refs/remotes/origin/main', tip);
    const cwd = process.cwd();
    const saved = { r: process.env.BASE_REF, s: process.env.BASE_SHA };
    try {
      process.chdir(dir);
      process.env.BASE_REF = 'main';
      process.env.BASE_SHA = 'stale-payload-sha';
      expect(liveAdapter.checkedOut()).toEqual({ headSha: tip, baseSha: tip });
      process.env.BASE_REF = 'absent';
      expect(liveAdapter.checkedOut().baseSha).toBe('stale-payload-sha');
    } finally {
      process.chdir(cwd);
      if (saved.r === undefined) delete process.env.BASE_REF; else process.env.BASE_REF = saved.r;
      if (saved.s === undefined) delete process.env.BASE_SHA; else process.env.BASE_SHA = saved.s;
    }
  });
});
