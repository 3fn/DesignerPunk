/**
 * semantics-guard.fixture.test.ts — Spec 123 Task 14.2: the agent-shaped fixture carrying E and
 * E-fm (`__fixtures__/semantics-guard/`, format in its README) is what it claims, and
 * `generateFixture`'s consumer lane (Task 15.0) routes a re-pointing through the real adapters.
 *
 * The per-target guard and its bites are semantics-guard.test.ts (14.3/14.4). This file holds
 * the fixture to its claims so a red there is about routing, never about a malformed fixture.
 */
import * as fs from 'fs';
import * as path from 'path';
import { load as loadYaml } from 'js-yaml';
import { adaptersFor } from '../adapters/index';
import { loadConsumerProfile } from '../consumer-profile';
import { checkDispositionKeys, keyUniverse, type RowFile } from '../derive';
import { splitFrontmatter } from '../frontmatter';
import { assembleContext, CONSUMER_FIXTURE_OUTPUT_ROOT, FIXTURE_SOURCE, generateFixture } from '../generate';
import { entryTree, partition } from '../partition';
import { checkDerivation } from '../regrounding/derivation';
import { validateDispositions } from '../regrounding/dispositions';
import { hashEntry, hashText } from '../regrounding/hash';
import { checkOverlayPins, parseOverlay } from '../regrounding/overlay';
import { assignOccurrences } from '../regrounding/triviality';
import type { Dispositions } from '../spans';
import { DISPOSITIONS_FILE, E_FM, EXTRA, loadSemguard, OVERLAY_FILE, S, SEMGUARD_ROOT, SOURCE } from '../__fixtures__/semantics-guard';

const REPO_ROOT = path.resolve(__dirname, '..', '..', '..');
const fixture = loadSemguard();

describe('the semguard fixture is what it claims (14.2)', () => {
  it('its three body units are byte-identical to stacy.md’s units of the same anchors (the first also carries the fixture’s own title line)', () => {
    const stacy = partition(splitFrontmatter(fs.readFileSync(path.join(REPO_ROOT, 'canonical/agents/stacy.md'), 'utf8')).body);
    const TITLE = '# Semguard\n\n';
    expect(fixture.trees.body.units[0].text.startsWith(TITLE)).toBe(true);
    for (const [i, unit] of fixture.trees.body.units.entries()) {
      const text = i === 0 ? unit.text.slice(TITLE.length) : unit.text;
      expect(`${unit.anchor}: ${stacy.units.find((u) => u.anchor === unit.anchor)?.text === text}`).toBe(`${unit.anchor}: true`);
    }
    expect(fixture.trees.body.units.map((u) => u.anchor)).toContain(S);
  });

  it('passes Task 13’s checks: the 13.1 schema, 13.5 orphan + missing row, 13.2 pin freshness', () => {
    const doc = loadYaml(fs.readFileSync(path.join(SEMGUARD_ROOT, DISPOSITIONS_FILE), 'utf8'));
    expect(validateDispositions(doc, DISPOSITIONS_FILE, { entries: fixture.trees.entry })).toEqual([]);
    expect(checkDispositionKeys(doc as never, DISPOSITIONS_FILE, keyUniverse(SEMGUARD_ROOT, SOURCE))).toEqual([]);
    expect(checkOverlayPins(fixture.parsedOverlay, { units: new Map(fixture.trees.body.units.map((u) => [u.anchor, u.text])), entries: new Map(fixture.trees.entry.units.map((l) => [l.path, l.value])) })).toEqual([]);
  });

  it('re-points exactly E, E-fm and the extra, each in place', () => {
    const repointed = [
      ...Object.entries(fixture.dispositions.body ?? {}).filter(([, r]) => r.disposition === 're-pointed').map(([k, r]) => `${k} -> ${r.destination}`),
      ...Object.entries(fixture.dispositions.frontmatter ?? {}).filter(([, r]) => r.disposition === 're-pointed').map(([k, r]) => `${k} -> ${r.destination}`),
    ];
    expect(repointed).toEqual([`${S} -> ${S}`, `${EXTRA} -> frontmatter:${EXTRA}`, `${E_FM} -> frontmatter:${E_FM}`].sort((a, b) => (a.startsWith('#') ? -1 : b.startsWith('#') ? 1 : a.localeCompare(b))));
    expect(Object.keys(fixture.parsedOverlay.units)).toEqual([S]);
    expect(Object.keys(fixture.parsedOverlay.entries).sort()).toEqual([EXTRA, E_FM].sort());
  });

  it('E stays ZERO-VERBATIM against S’s operative items (10.S Constraint 3): 0 credited', () => {
    const record = loadYaml(fs.readFileSync(path.join(REPO_ROOT, 'canonical/operative-sets/stacy.yaml'), 'utf8')) as { units: Record<string, { items: { id: string; text: string }[] }> };
    const items = record.units[S].items;
    expect(items.length).toBeGreaterThan(0);
    expect(assignOccurrences(fixture.overlay.units?.[S] as string, items)).toEqual([]);
  });

  it('E-fm’s re-grounded text does not carry the canonical glob verbatim', () => {
    expect(fixture.overlay.entries?.[E_FM]).not.toContain('.kiro/specs/**');
  });
});

describe('generateFixture’s consumer lane (Task 15.0) routes a re-pointing through every declared target’s adapter', () => {
  it('_fixture.md: the re-pointed #doc and writeScope member are VERIFIED in each target’s prompt, under _fixture-output-consumer/<target>/', async () => {
    const text = fs.readFileSync(path.join(REPO_ROOT, FIXTURE_SOURCE), 'utf8');
    const { frontmatter, body } = splitFrontmatter(text, FIXTURE_SOURCE);
    const bodyTree = partition(body);
    const tree = entryTree(frontmatter);
    const glob = tree.units.map((l) => l.path).find((p) => p.startsWith('writeScope[')) as string;
    const dispositions = {
      body: Object.fromEntries(bodyTree.units.map((u) => [u.anchor, u.anchor === '#doc' ? { disposition: 're-pointed', destination: '#doc' } : { disposition: 'retained' }])),
      frontmatter: Object.fromEntries(tree.units.map((l) => [l.path, l.path === glob ? { disposition: 're-pointed', destination: `frontmatter:${glob}` } : { disposition: 'retained' }])),
    } as Dispositions & RowFile;
    const hex = (h: string) => h.replace(/^sha256:/, '');
    const docText = bodyTree.units.find((u) => u.anchor === '#doc')?.text as string;
    const glbValue = tree.units.find((l) => l.path === glob)?.value;
    // Task 15.3 (the 15.0 (b) erratum): the `## @entry` body is a YAML VALUE — the re-grounded glob.
    const overlay = parseOverlay(`## @unit #doc @ sha256:${hex(hashText(docText))}\nThe fixture body, re-grounded for a consumer.\n## @entry ${glob} @ sha256:${hex(hashEntry(glbValue))}\nout/**\n`, 'fixture.overlay.md');
    const ctx = assembleContext(REPO_ROOT);
    const targets = loadConsumerProfile(REPO_ROOT).targets;
    const outputs = await generateFixture(REPO_ROOT, ctx, adaptersFor(targets, ctx.dispositions), { profile: 'consumer', dispositions, overlay });
    const trees = { body: bodyTree, entry: tree };
    const verdicts = targets.map((t) => {
      const prose = outputs.filter((o) => o.path.startsWith(`${CONSUMER_FIXTURE_OUTPUT_ROOT}/${t}/`) && o.path.endsWith('.md') && o.attribution);
      const spans = prose.flatMap((o) => o.attribution?.spans ?? []);
      const v = (s: string) => checkDerivation({ file: FIXTURE_SOURCE, trees, spans, s, destination: s }).verdict;
      return `${t}: #doc ${v('#doc')}, ${glob} ${v(`frontmatter:${glob}`)}, files ${prose.length}`;
    });
    expect(verdicts).toEqual(targets.map((t) => `${t}: #doc VERIFIED, ${glob} VERIFIED, files 1`));
  }, 120_000);
});
