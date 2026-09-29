/**
 * derive.stale-overlay.test.ts — Spec 123 Task 15.2: `derive()` (design C22, C19; Req 14.8–14.9).
 *
 * Criterion row (Task 15): "`derive()` refuses on a stale overlay and an orphaned key over the real
 * profile." At the FUNCTION level here; over the real profile at 15.4 (Thurgood).
 *
 *   - the refusals (stale overlay, orphaned key, missing row) come FIRST, as ONE error carrying
 *     every finding's exact catalog string, and nothing is emitted — through
 *     `generateConsumerRendering`, no adapter runs;
 *   - the derived BODY is the one `emitSpans` selection, byte-identical to every target's body;
 *   - the derived FRONTMATTER drops disposed leaves (and the containers they empty), keeps retained
 *     values; an always-set document (`counterpart:`) carries none (C19);
 *   - a re-pointed frontmatter entry or shared member REFUSES, pending Task 15.2's Q1 ruling.
 */
import * as path from 'path';
import { load as loadYaml } from 'js-yaml';
import { type AdapterContext, type FieldDispositionTable, type TargetAdapter } from '../adapters/index';
import { CcAdapter } from '../adapters/cc';
import { KiroAdapter } from '../adapters/kiro';
import { checkAttributionTotality } from '../attribution';
import { derive, DeriveError, deriveSharedCatalog, deriveText, pruneFrontmatter, repointedEntryPendingMessage } from '../derive';
import type { YamlDoc } from '../frontmatter';
import { generateConsumerRendering, type ConsumerProfileInputs, type ResolvedForEmission } from '../generate';
import { entryTree, partition } from '../partition';
import { hashText } from '../regrounding/hash';
import { parseOverlay, toSpanOverlay } from '../regrounding/overlay';
import type { ResolvedAgent } from '../pipeline';
import type { Dispositions, DispositionRow } from '../spans';

const REPO_ROOT = path.resolve(__dirname, '..', '..', '..');
const SOURCE = 'canonical/agents/twin.md';
const DISP = 'canonical/profiles/consumer/twin.dispositions.yaml';
const OVERLAY = 'canonical/profiles/consumer/twin.overlay.md';
const FIELD_DISPOSITIONS: FieldDispositionTable = { configFields: [], runtimeToolRefs: [] };
const hex = (h: string) => h.replace(/^sha256:/, '');

const BODY = ['# Twin', '', '## Kept', '', 'Kept verbatim.', '', '## Regrounded', '', 'Steward-only operative text.', '', '## Dropped', '', 'Steward-only, no counterpart.', ''].join('\n');
const FM = (): YamlDoc => ({
  agent: 'twin',
  agentType: 'consumer',
  description: 'A twin agent for derive().',
  toolSubset: { 'designerpunk-docs': ['find_docs', 'get_section'] },
  commands: [
    { name: 'unit-tests', cmd: 'npm test', runContext: 'this-repo', cue: 'run the unit suite' },
    { name: 'ship', cmd: './.kiro/hooks/complete-task.sh', runContext: 'this-repo', cue: 'complete the task' },
  ],
  writeScope: ['a/**', 'b/**'],
});

const unitText = (a: string) => partition(BODY).units.find((u) => u.anchor === a)!.text;
const OVERLAY_TEXT = (pin = hashText(unitText('#regrounded'))) => `## @unit #regrounded @ sha256:${hex(pin)}\n## Regrounded\n\nConsumer-grounded operative text.\n`;

/** Every unit and leaf an explicit row: retained, except #regrounded (re-pointed) and #dropped / the `ship` command / `b/**` (no counterpart). */
function rows(over: { body?: Record<string, DispositionRow>; frontmatter?: Record<string, DispositionRow> } = {}, drop: string[] = []): Dispositions {
  const body: Record<string, DispositionRow> = {};
  for (const u of partition(BODY).units) body[u.anchor] = { disposition: 'retained' };
  body['#regrounded'] = { disposition: 're-pointed', destination: '#regrounded' };
  body['#dropped'] = { disposition: 'no-consumer-counterpart' };
  const fm: Record<string, DispositionRow> = {};
  for (const l of entryTree(FM()).units) fm[l.path] = { disposition: 'retained' };
  fm['commands[ship]'] = { disposition: 'no-consumer-counterpart' };
  fm['writeScope[b/**]'] = { disposition: 'no-consumer-counterpart' };
  Object.assign(body, over.body ?? {});
  Object.assign(fm, over.frontmatter ?? {});
  for (const k of drop) {
    delete body[k];
    delete fm[k];
  }
  return { body, frontmatter: fm };
}
const run = (disp: Dispositions = rows(), overlayText = OVERLAY_TEXT()) =>
  derive({ source: SOURCE, frontmatter: FM(), body: BODY, dispositions: disp, overlay: parseOverlay(overlayText, OVERLAY), dispositionsFile: DISP });
const findings = (f: () => unknown): string[] => {
  try {
    f();
  } catch (e) {
    if (e instanceof DeriveError) return e.findings.map((x) => x.message);
    throw e;
  }
  return [];
};

describe('derive() refuses first — every finding, one error, nothing emitted', () => {
  it('stale overlay: derive() refuses, with the exact catalog string', () => {
    const stalePin = hashText('an earlier canonical #regrounded\n');
    expect(findings(() => run(rows(), OVERLAY_TEXT(stalePin)))).toEqual([
      `overlay for #regrounded re-grounds canonical text sha256:${hex(stalePin)}, but the current canonical is sha256:${hex(hashText(unitText('#regrounded')))} — re-author the overlay; refusing to derive`,
    ]);
  });

  it('orphaned key: a disposition row naming a renamed unit refuses, with the exact catalog string', () => {
    expect(findings(() => run(rows({ body: { '#kept-old-name': { disposition: 'retained' } } })))).toEqual([
      `disposition/overlay key #kept-old-name names nothing in ${SOURCE} — the unit was renamed or removed; re-key or delete the row`,
    ]);
  });

  it('orphaned key: an overlay entry naming nothing refuses', () => {
    const text = OVERLAY_TEXT() + `## @unit #gone @ sha256:${hex(hashText('x'))}\nx\n`;
    expect(findings(() => run(rows(), text))).toEqual([`disposition/overlay key #gone names nothing in ${SOURCE} — the unit was renamed or removed; re-key or delete the row`]);
  });

  it('missing row: a unit with no row refuses, never read as retained', () => {
    expect(findings(() => run(rows({}, ['#kept'])))).toEqual([
      `#kept in ${SOURCE} has no disposition row — every unit carries an explicit row (write 'retained' if it ships as-is)`,
    ]);
  });

  it('ONE error carries EVERY finding (orphan, missing row and stale overlay together)', () => {
    const stalePin = hashText('an earlier canonical #regrounded\n');
    const all = findings(() => run(rows({ body: { '#old': { disposition: 'retained' } } }, ['#kept']), OVERLAY_TEXT(stalePin)));
    expect(all.map((m) => m.split(' — ')[0])).toEqual([
      `disposition/overlay key #old names nothing in ${SOURCE}`,
      `#kept in ${SOURCE} has no disposition row`,
      `overlay for #regrounded re-grounds canonical text sha256:${hex(stalePin)}, but the current canonical is sha256:${hex(hashText(unitText('#regrounded')))}`,
    ]);
  });

  it('a refusal stops the whole render: through generateConsumerRendering, no adapter emits anything', () => {
    const adapters: TargetAdapter[] = [new CcAdapter(FIELD_DISPOSITIONS), new KiroAdapter(FIELD_DISPOSITIONS)];
    const spies = adapters.map((a) => jest.spyOn(a, 'emitAgent'));
    const stale = parseOverlay(OVERLAY_TEXT(hashText('an earlier canonical\n')), OVERLAY);
    const inputs: ConsumerProfileInputs = { dispositions: { twin: rows() }, overlays: { twin: stale }, missing: [] };
    expect(() => generateConsumerRendering([resolvedFor()], adapters, inputs)).toThrow(DeriveError);
    for (const s of spies) expect(s).not.toHaveBeenCalled();
  });
});

describe('derive() emits the consumer canonical', () => {
  it('the body is the emitSpans selection: re-pointed → overlay text, retained → verbatim, no counterpart → absent', () => {
    const d = run();
    expect(d.body).toContain('Consumer-grounded operative text.');
    expect(d.body).toContain('Kept verbatim.');
    expect(d.body).not.toContain('Steward-only operative text.');
    expect(d.body).not.toContain('Steward-only, no counterpart.');
  });

  it('the derived body is byte-identical to every target’s body (never a second selection)', () => {
    const d = run();
    for (const adapter of [new CcAdapter(FIELD_DISPOSITIONS), new KiroAdapter(FIELD_DISPOSITIONS)]) {
      const prose = adapter.emitAgent(resolvedFor().resolved, consumerCtx()).find((f) => f.path.endsWith('.md'))!;
      expect(`${adapter.target}: ${prose.content.includes(d.body)}`).toBe(`${adapter.target}: true`);
    }
  });

  it('the frontmatter drops disposed leaves and keeps retained values', () => {
    const fm = run().frontmatter as YamlDoc;
    expect(fm.commands).toEqual([{ name: 'unit-tests', cmd: 'npm test', runContext: 'this-repo', cue: 'run the unit suite' }]);
    expect(fm.writeScope).toEqual(['a/**']);
    expect(fm.toolSubset).toEqual({ 'designerpunk-docs': ['find_docs', 'get_section'] });
    expect(fm.agent).toBe('twin');
    expect(run().text.startsWith('---\n')).toBe(true);
    expect(loadYaml(run().text.split('---\n')[1])).toEqual(fm);
  });

  it('its attribution is total: the frontmatter block is C1 glue, the body spans are sourced to the canonical origin', () => {
    const d = run();
    expect(checkAttributionTotality(d.attribution, d.text.split('\n').length - 1).errors).toEqual([]);
    expect(d.attribution.spans[0].source).toBe('C1:frontmatter');
    expect(d.attribution.spans.filter((s) => s.source === `${SOURCE}#regrounded`).map((s) => s.op)).toEqual(['render']);
    expect(d.attribution.spans.some((s) => s.source === `${SOURCE}#dropped`)).toBe(false);
  });

  it('an always-set document (counterpart:) carries NO frontmatter (C19)', () => {
    const disp = { ...rows(), frontmatter: undefined, counterpart: '.kiro/steering/twin.md' } as Dispositions & { counterpart: string };
    const d = derive({ source: SOURCE, frontmatter: FM(), body: BODY, dispositions: disp, overlay: parseOverlay(OVERLAY_TEXT(), OVERLAY) });
    expect(d.frontmatter).toBeUndefined();
    expect(d.text).toBe(d.body);
    expect(d.text.startsWith('---')).toBe(false);
  });

  it('deriveText splits a canonical file’s text first', () => {
    const text = `---\n${JSON.stringify(FM())}\n---\n${BODY}`;
    expect(deriveText({ source: SOURCE, text, dispositions: rows(), overlay: parseOverlay(OVERLAY_TEXT(), OVERLAY) }).body).toBe(run().body);
  });
});

describe('re-pointed frontmatter and shared members — refused, pending Q1', () => {
  it('a re-pointed frontmatter entry refuses loudly rather than choosing a derived form', () => {
    expect(findings(() => run(rows({ frontmatter: { 'writeScope[a/**]': { disposition: 're-pointed', destination: 'frontmatter:writeScope[a/**]' } } })))).toEqual([
      repointedEntryPendingMessage('frontmatter entry writeScope[a/**]', DISP),
    ]);
  });
});

describe('pruneFrontmatter — positions come from the entry tree', () => {
  it('ambient section leaves drop their claims; an entry with no claim left goes, and so does an emptied container', () => {
    const fm: YamlDoc = {
      agent: 'x',
      ambient: { governanceAsLaw: [{ id: 'law', owner: 'o', assert: [{ claim: 'c1', section: 'Sec One' }, { claim: 'c2', section: 'Sec Two' }] }] },
    };
    const tree = entryTree(fm);
    const one = pruneFrontmatter(fm, tree, (p) => p === 'ambient[law#sec-one]');
    expect((one.ambient as { governanceAsLaw: { assert: unknown[] }[] }).governanceAsLaw[0].assert).toEqual([{ claim: 'c2', section: 'Sec Two' }]);
    const both = pruneFrontmatter(fm, tree, (p) => p.startsWith('ambient[law#'));
    expect(both).toEqual({ agent: 'x' });
  });

  it('kiro.agentSpawn is the preflight list; a scalar leaf is its map-key path; the input is not mutated', () => {
    const fm: YamlDoc = { agent: 'x', kiro: { keyboardShortcut: 'ctrl+x', agentSpawn: [{ command: 'echo a' }, { command: 'echo b' }] } };
    const out = pruneFrontmatter(fm, entryTree(fm), (p) => p === 'preflight[echo a]' || p === 'kiro.keyboardShortcut');
    expect(out).toEqual({ agent: 'x', kiro: { agentSpawn: [{ command: 'echo b' }] } });
    expect((fm.kiro as { agentSpawn: unknown[] }).agentSpawn).toHaveLength(2);
  });

  it('duplicate member identities (`-2`) drop the right element by position', () => {
    const fm: YamlDoc = { writeScope: ['a/**', 'a/**', 'c/**'] };
    const tree = entryTree(fm);
    expect(tree.units.map((l) => l.path)).toEqual(['writeScope[a/**]', 'writeScope[a/**-2]', 'writeScope[c/**]']);
    expect(pruneFrontmatter(fm, tree, (p) => p === 'writeScope[a/**-2]')).toEqual({ writeScope: ['a/**', 'c/**'] });
  });
});

describe('deriveSharedCatalog', () => {
  const CATALOG = 'members:\n  - id: keep-me\n    kind: command\n    owner: thurgood\n  - id: drop-me\n    kind: command\n    runContext: this-repo\n    owner: thurgood\n';
  it('drops members disposed no-consumer-counterpart, keeps retained', () => {
    const out = loadYaml(deriveSharedCatalog(CATALOG, { members: { 'keep-me': { disposition: 'retained' }, 'drop-me': { disposition: 'no-consumer-counterpart' } } }));
    expect(out).toEqual({ members: [{ id: 'keep-me', kind: 'command', owner: 'thurgood' }] });
  });
  it('refuses a missing row and a re-pointed member (pending Q1)', () => {
    expect(findings(() => deriveSharedCatalog(CATALOG, { members: { 'keep-me': { disposition: 're-pointed', destination: 'x' } } }))).toEqual([
      "drop-me in canonical/shared/shared-catalog.yaml has no disposition row — every unit carries an explicit row (write 'retained' if it ships as-is)",
      repointedEntryPendingMessage('shared member keep-me', 'canonical/profiles/consumer/_shared.dispositions.yaml'),
    ]);
  });
});

function resolvedFor(): ResolvedForEmission {
  const fm = FM();
  const resolved = {
    agent: 'twin',
    doc: { frontmatter: fm, body: BODY, sourcePath: SOURCE },
    resolutions: [],
    unresolved: [],
    ambientManifests: { cc: { agent: 'twin', target: 'cc', members: [] }, kiro: { agent: 'twin', target: 'kiro', members: [] } },
  } as unknown as ResolvedAgent;
  return { resolved, emitCtx: baseCtx() } as unknown as ResolvedForEmission;
}
function baseCtx(): AdapterContext {
  return { workflowRules: [], skillsMap: { rows: [] }, alwaysSet: [], dispositions: FIELD_DISPOSITIONS, sharedCatalog: [], repoRoot: REPO_ROOT, embeds: {}, docIdToPath: {}, steeringIdToPath: {} } as unknown as AdapterContext;
}
function consumerCtx(): AdapterContext {
  return { ...baseCtx(), profile: 'consumer', consumer: { dispositions: { twin: rows() }, overlays: { twin: toSpanOverlay(parseOverlay(OVERLAY_TEXT(), OVERLAY)) } } };
}
