/**
 * operative-set.checks.test.ts — Spec 123 Task 13.3: two of Task 13's nine checks over the C16
 * operative-set records — WRONG CONFIRMER and ITEM TEXT NOT VERBATIM — plus the structural item
 * assertions the Task 11 precursor makes, and a LIVE pass over every committed record.
 *
 * Wiring these into the `operative-set-freshness` sweep inside 122-diff-guard, and deleting the
 * precursor `src/__tests__/operative-set-records.test.ts`, is Task 13.6.
 */

import * as fs from 'fs';
import * as path from 'path';
import { load as loadYaml } from 'js-yaml';
import { splitFrontmatter } from '../frontmatter';
import { partition } from '../partition';
import { checkConfirmer, checkItems, checkOperativeSet, type OperativeSetRecord } from '../regrounding/operative-sets';

const REPO_ROOT = path.resolve(__dirname, '..', '..', '..');
const RECORDS_DIR = 'canonical/operative-sets';
const REC = 'canonical/operative-sets/twin.yaml';

const UNIT = '### Twin\n\nAlways run the owed-set pipeline before a release.\nNever skip stage 4.\n';
const record = (over: Partial<OperativeSetRecord> = {}): OperativeSetRecord => ({
  source: 'canonical/agents/twin.md',
  owner: 'twin',
  confirmer: 'twin',
  units: {
    '#twin': {
      canonicalHash: 'sha256:x',
      confirmation: 'c.md#twin',
      items: [
        { id: 'twin-1', kind: 'obligation', text: 'Always run the owed-set pipeline before a release.' },
        { id: 'twin-2', kind: 'obligation', text: 'Never skip stage 4.' },
      ],
    },
  },
  ...over,
});
const units = { '#twin': UNIT };

describe('wrong confirmer — one of Task 13\'s nine (13.3)', () => {
  it('wrong confirmer (nine-check) refuses a confirmer that is not the C1 seat, with the exact string', () => {
    expect(checkConfirmer(record(), REC)).toEqual([]);
    expect(checkConfirmer(record({ source: 'canonical/agents/thurgood.md', owner: 'thurgood', confirmer: 'stacy' }), REC)).toEqual([]);
    expect(checkConfirmer(record({ source: 'canonical/agents/thurgood.md', owner: 'thurgood', confirmer: 'thurgood' }), REC)).toEqual([
      {
        check: 'wrong-confirmer',
        file: REC,
        message: 'operative set for canonical/agents/thurgood.md declares confirmer thurgood; the C1 rule requires stacy',
      },
    ]);
  });
});

describe('item text not verbatim — one of Task 13\'s nine (13.3)', () => {
  it('item text not verbatim (nine-check) refuses a paraphrased item, with the exact string', () => {
    expect(checkItems(record(), REC, units)).toEqual([]);
    const r = record();
    r.units['#twin'].items[0].text = 'Always run the owed-set pipeline before any release.';
    expect(checkItems(r, REC, units)).toEqual([
      {
        check: 'item-text-not-verbatim',
        file: REC,
        anchor: '#twin',
        item: 'twin-1',
        message:
          'operative item twin-1 in canonical/operative-sets/twin.yaml: text is not a verbatim substring of canonical unit #twin — re-confirm with the complete canonical text',
      },
    ]);
  });

  it('cannot catch a prefix truncation — the confirmer\'s responsibility (C16, S-D2-A1)', () => {
    const r = record();
    r.units['#twin'].items[0].text = 'Always run the owed-set pipeline';
    expect(checkItems(r, REC, units)).toEqual([]);
  });
});

describe('structural item assertions (absorbed from the Task 11 precursor)', () => {
  it('refuses duplicate ids, unknown kinds, edge whitespace and missing text', () => {
    const r = record();
    r.units['#twin'].items = [
      { id: 'a', kind: 'obligation', text: 'Never skip stage 4.' },
      { id: 'a', kind: 'enumeration' as never, text: 'Never skip stage 4.\n' },
      { id: 'b', kind: 'step', text: '' },
    ];
    expect(checkItems(r, REC, units).map((f) => f.message)).toEqual([
      'operative set canonical/operative-sets/twin.yaml #twin: duplicate item id a',
      "operative set canonical/operative-sets/twin.yaml #twin: item a kind 'enumeration' is not one of obligation, step, member, route, command",
      'operative set canonical/operative-sets/twin.yaml #twin: item a text has leading or trailing whitespace',
      'operative set canonical/operative-sets/twin.yaml #twin: item b carries no text',
    ]);
  });

  it('leaves an anchor naming no current unit to the orphaned-key refusal (13.5)', () => {
    expect(checkItems(record(), REC, {})).toEqual([]);
  });
});

describe('live: every committed operative-set record', () => {
  const files = fs
    .readdirSync(path.join(REPO_ROOT, RECORDS_DIR))
    .filter((f) => f.endsWith('.yaml'))
    .sort();

  it('finds the records (non-vacuity)', () => {
    // Task 15.4: every body unit of the 8 charters and the 8 identity docs is recorded (plus exemplar F's family doc).
    expect(files).toEqual([
      'ada.yaml', 'agent-directory.yaml', 'ai-collaboration-principles.yaml', 'civitas-system-overview.yaml', 'component-family-navigation.yaml',
      'core-goals.yaml', 'data.yaml', 'designerpunk-systems-overview.yaml', 'kenya.yaml', 'leonardo.yaml', 'lina.yaml', 'sparky.yaml',
      'spec-feedback-protocol.yaml', 'stacy.yaml', 'start-up-tasks.yaml', 'task-completion-protocol.yaml', 'thurgood.yaml',
    ]);
  });

  it.each(files)('%s: confirmer is the C1 seat and every item text is verbatim', (f) => {
    const rel = `${RECORDS_DIR}/${f}`;
    const rec = loadYaml(fs.readFileSync(path.join(REPO_ROOT, rel), 'utf8')) as OperativeSetRecord;
    const tree = partition(splitFrontmatter(fs.readFileSync(path.join(REPO_ROOT, rec.source), 'utf8'), rec.source).body);
    const texts = new Map(tree.units.map((u) => [u.anchor, u.text]));
    // Every recorded anchor resolves here, so the verbatim check is not vacuously skipped.
    expect(Object.keys(rec.units).filter((a) => !texts.has(a))).toEqual([]);
    expect(checkOperativeSet(rec, rel, texts)).toEqual([]);
  });
});
