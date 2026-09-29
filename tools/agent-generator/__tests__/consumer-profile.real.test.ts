/**
 * consumer-profile.real.test.ts — Spec 123 Task 15.4: the REAL consumer profile and its committed
 * rendering (`canonical/_consumer-output/**`), the population the Task 15 criteria name.
 *
 *   - population: every ledger agent × declared target, the derived `_canonical/` charters, and the
 *     8 identity members per target are committed — no silent zero (block row 2.6);
 *   - every unit and entry has an explicit row: the missing-row and orphaned-key refusals are clean
 *     over the full profile (every dispositions file), with the per-bucket row counts;
 *   - every operative-set record covers every body unit of its source (the hard floor's population is
 *     the whole charter), and the hard floor passes for all 8 charters;
 *   - "nothing renders that no surviving member sourced" over every committed consumer artifact;
 *   - `derive()` refuses a stale overlay and an orphaned key over the real profile;
 *   - Kenya's and Data's knowledge-fallback paths are re-grounded to the installed package.
 *
 * Reads committed files only (no docs MCP): the diff-guard binds the committed rendering to a fresh one.
 */
import * as fs from 'fs';
import * as path from 'path';
import { load as loadYaml } from 'js-yaml';
import { loadConsumerProfile } from '../consumer-profile';
import { checkDispositionKeys, derive, DeriveError, keyUniverse, type RowFile } from '../derive';
import { splitFrontmatter, type YamlDoc } from '../frontmatter';
import { parseCutoverLedger } from '../generate';
import { entryTree, partition } from '../partition';
import { parseOverlay } from '../regrounding/overlay';
import { hardFloor } from '../regrounding/triviality';
import type { Dispositions, DispositionRow } from '../spans';
import type { AttributionManifest } from '../attribution';
import { survivorViolations, type SurvivorProfile } from './survivor-sourced';

const ROOT = path.resolve(__dirname, '..', '..', '..');
const OUT = 'canonical/_consumer-output';
const PROFILE = 'canonical/profiles/consumer';
const read = (rel: string) => fs.readFileSync(path.join(ROOT, rel), 'utf8');
const exists = (rel: string) => fs.existsSync(path.join(ROOT, rel));
const LEDGER = parseCutoverLedger(read('canonical/cutover-ledger.yaml'));
const TARGETS = loadConsumerProfile(ROOT).targets;
const IDENTITY: Record<string, string> = {
  'core-goals': 'core-goals', 'ai-collaboration-principles': 'AI-Collaboration-Principles', 'spec-feedback-protocol': 'Spec-Feedback-Protocol',
  'start-up-tasks': 'start-up-tasks', 'task-completion-protocol': 'Task-Completion-Protocol', 'agent-directory': 'Agent-Directory',
  'designerpunk-systems-overview': 'DesignerPunk-Systems-Overview', 'civitas-system-overview': 'Civitas-System-Overview',
};
const DISP_FILES = [...LEDGER.map((a) => `${PROFILE}/${a}.dispositions.yaml`), `${PROFILE}/_shared.dispositions.yaml`, ...Object.keys(IDENTITY).map((id) => `${PROFILE}/always-set/${id}.dispositions.yaml`)];
const disp = (file: string) => loadYaml(read(file)) as RowFile & Dispositions & { source: string };

describe('the population is complete (no silent zero)', () => {
  it('8 ledger agents, the shared catalog and 8 identity docs each carry a dispositions file', () => {
    expect(LEDGER).toHaveLength(8);
    expect(DISP_FILES.filter((f) => !exists(f))).toEqual([]);
    expect(DISP_FILES).toHaveLength(17);
  });

  it('the committed rendering covers every agent × target, the derived charters once, and 8 identity members per target', () => {
    const want = [
      ...LEDGER.map((a) => `${OUT}/_canonical/agents/${a}.md`),
      `${OUT}/_canonical/shared/shared-catalog.yaml`,
      ...Object.keys(IDENTITY).map((id) => `${OUT}/_canonical/always-set/${id}.md`),
      ...LEDGER.map((a) => `${OUT}/cc/.claude/agents/${a}.md`),
      ...LEDGER.flatMap((a) => [`${OUT}/kiro/.kiro/agents/${a}.json`, `${OUT}/kiro/.kiro/agents/${a}-prompt.md`]),
      ...Object.keys(IDENTITY).flatMap((id) => [`${OUT}/cc/.claude/identity/designerpunk-${id}.md`, `${OUT}/kiro/.kiro/steering/designerpunk-${id}.md`]),
    ];
    expect(TARGETS).toEqual(['cc', 'kiro']);
    expect(want.filter((f) => !exists(f))).toEqual([]);
    expect(want).toHaveLength(8 + 1 + 8 + 8 + 16 + 16);
  });
});

describe('every unit and entry has an explicit row (DD25)', () => {
  it.each(DISP_FILES)('%s: no missing row, no orphaned key', (file) => {
    const d = disp(file);
    expect(checkDispositionKeys(d, file, keyUniverse(ROOT, d.source))).toEqual([]);
  });
});

describe('the operative-set records cover every body unit; the hard floor passes for the 8 charters (C18 clause 4)', () => {
  it.each(LEDGER)('%s', (agent) => {
    const source = `canonical/agents/${agent}.md`;
    const record = loadYaml(read(`canonical/operative-sets/${agent}.yaml`)) as { units: Record<string, { items: { id: string; kind: 'obligation'; text: string }[] }> };
    const anchors = partition(splitFrontmatter(read(source), source).body).units.map((u) => u.anchor);
    expect(Object.keys(record.units).sort()).toEqual([...anchors].sort());
    const rows = new Map(Object.entries(disp(`${PROFILE}/${agent}.dispositions.yaml`).body ?? {}));
    const floor = hardFloor(new Map(Object.entries(record.units).map(([a, u]) => [a, u.items])), rows, source);
    expect(floor.fails).toBe(false);
  });

  it.each(Object.entries(IDENTITY))('identity doc %s: the record covers every unit', (id, file) => {
    const source = `.kiro/steering/${file}.md`;
    const record = loadYaml(read(`canonical/operative-sets/${id}.yaml`)) as { units: Record<string, unknown> };
    expect(Object.keys(record.units).sort()).toEqual(partition(splitFrontmatter(read(source), source).body).units.map((u) => u.anchor).sort());
  });
});

describe('nothing renders that no surviving member sourced — the real profile', () => {
  const walk = (dir: string): string[] =>
    fs.readdirSync(path.join(ROOT, dir), { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(`${dir}/${e.name}`) : e.name.endsWith('.attribution.json') ? [`${dir}/${e.name}`] : []));
  it('every span of every committed consumer artifact (both targets and _canonical/) is survivor-sourced', () => {
    const sources: Record<string, SurvivorProfile['sources'][string]> = {};
    for (const agent of LEDGER) {
      const source = `canonical/agents/${agent}.md`;
      const d = disp(`${PROFILE}/${agent}.dispositions.yaml`);
      sources[source] = { tree: entryTree((splitFrontmatter(read(source), source).frontmatter ?? {}) as YamlDoc), body: d.body, frontmatter: d.frontmatter };
    }
    for (const [id, file] of Object.entries(IDENTITY)) sources[`.kiro/steering/${file}.md`] = { body: disp(`${PROFILE}/always-set/${id}.dispositions.yaml`).body };
    const shared = (disp(`${PROFILE}/_shared.dispositions.yaml`).members ?? {}) as Record<string, DispositionRow>;
    const sidecars = walk(OUT);
    expect(sidecars.length).toBeGreaterThanOrEqual(8 + 8 + 16 + 16); // _canonical agents + identity, cc + kiro prose (kiro JSON included)
    const artifacts = sidecars.map((s) => ({ path: s, attribution: JSON.parse(read(s)) as AttributionManifest }));
    expect(survivorViolations(artifacts, { sources, shared })).toEqual([]);
  });
});

describe('derive() refuses over the real profile (C22)', () => {
  const source = 'canonical/agents/ada.md';
  const { frontmatter, body } = splitFrontmatter(read(source), source);
  const overlayText = read(`${PROFILE}/ada.overlay.md`);
  const run = (d: RowFile & Dispositions, text = overlayText) =>
    derive({ source, frontmatter: frontmatter as YamlDoc, body, dispositions: d, overlay: parseOverlay(text, `${PROFILE}/ada.overlay.md`), dispositionsFile: `${PROFILE}/ada.dispositions.yaml` });
  const messages = (fn: () => unknown) => {
    try {
      fn();
    } catch (e) {
      if (e instanceof DeriveError) return e.findings.map((f) => f.check);
      throw e;
    }
    return [];
  };
  it('the committed profile derives cleanly', () => {
    expect(messages(() => run(disp(`${PROFILE}/ada.dispositions.yaml`)))).toEqual([]);
  });
  it('a stale overlay pin refuses', () => {
    const stale = overlayText.replace(/(## @unit #identity @ sha256:)[0-9a-f]{64}/, `$1${'0'.repeat(64)}`);
    expect(stale).not.toBe(overlayText);
    expect(messages(() => run(disp(`${PROFILE}/ada.dispositions.yaml`), stale))).toEqual(['stale-overlay']);
  });
  it('an orphaned key (a row naming a renamed unit) refuses', () => {
    const d = disp(`${PROFILE}/ada.dispositions.yaml`);
    const renamed = { ...d, body: { ...d.body, '#identity-renamed': { disposition: 'retained' as const } } };
    expect(messages(() => run(renamed))).toEqual(['orphaned-key']);
  });
});

describe("Kenya's and Data's knowledge-fallback paths are re-grounded to the installed package (Kenya/Data R1)", () => {
  it.each([['kenya', 'ios'], ['data', 'android']])('%s', (agent, dir) => {
    const rendered = [`${OUT}/cc/.claude/agents/${agent}.md`, `${OUT}/kiro/.kiro/agents/${agent}-prompt.md`, `${OUT}/kiro/.kiro/agents/${agent}.json`, `${OUT}/_canonical/agents/${agent}.md`].map(read).join('\n');
    expect(rendered).toContain(`node_modules/@3fn/core/src/components/core/*/platforms/${dir}/`);
    // Every mention of the platform source path is the package-relative one (never the steward repo's).
    const bare = rendered.split('\n').filter((l) => l.includes(`src/components/core/*/platforms/${dir}/`) && !l.includes('node_modules/@3fn/core/src/components/core/'));
    expect(bare).toEqual([]);
  });
});
