/**
 * consumer-profile.adapters.test.ts — Spec 123 Task 15.0: the consumer profile's slice.
 *
 * Task 15's criterion row: "The consumer path routes through `emitSpans` in both adapters:
 * under `profile: consumer`, per adapter, a unit test shows (a) a re-pointed body unit renders
 * its overlay text with `source` = its canonical `#<anchor>`; (b) a re-pointed frontmatter leaf
 * renders its `## @entry` overlay text with `source` = `…#frontmatter:<path>`; (c) a list-valued
 * field renders per member, so `writeScope[<glob>]` is its own span (DD26); (d) a missing row
 * throws." Plus the registry and the profile loader, which Task 14's guard reads.
 *
 * Scope: fixture shapes. The real 8-agent render is 15.3–15.5; the Kiro JSON config stays
 * steward-shaped (C20). `generateFixture`'s consumer options are exercised by Task 14.2 (they
 * need the docs MCP corpus session).
 */

import * as path from 'path';
import { adaptersFor, registeredAdapterFactories, type AdapterContext, type FieldDispositionTable, type TargetAdapter } from '../adapters/index';
import { CcAdapter } from '../adapters/cc';
import { KiroAdapter } from '../adapters/kiro';
import { loadConsumerProfile, parseConsumerProfile, ConsumerProfileError } from '../consumer-profile';
import { entryTree, partition } from '../partition';
import { derive, type RowFile } from '../derive';
import { hashEntry, hashText } from '../regrounding/hash';
import { parseOverlay, toSpanOverlay, type ParsedOverlay } from '../regrounding/overlay';
import type { Dispositions, DispositionRow, Overlay } from '../spans';
import type { ResolvedAgent } from '../pipeline';
import type { AgentFrontmatter, CanonicalAgentDoc } from '../schema';
import type { AttributionManifest } from '../attribution';
import type { YamlDoc } from '../frontmatter';

const REPO_ROOT = path.resolve(__dirname, '..', '..', '..');
const FILE = 'canonical/agents/twin.md';
const FIELD_DISPOSITIONS: FieldDispositionTable = { configFields: [], runtimeToolRefs: [] };

const BODY = ['# Twin', '', '## Kept', '', 'Kept verbatim.', '', '## Regrounded', '', 'Steward-only operative text.', ''].join('\n');

function frontmatter(): AgentFrontmatter {
  return {
    agent: 'twin',
    agentType: 'consumer',
    description: 'A twin agent for the consumer-profile slice.',
    toolSubset: { 'designerpunk-docs': ['find_docs'] },
    commands: [{ name: 'unit-tests', cmd: 'npm test', runContext: 'this-repo', cue: 'run the unit suite' }],
    writeScope: ['a/**', 'b/**'],
  } as AgentFrontmatter;
}

function resolvedAgent(): ResolvedAgent {
  const fm = frontmatter();
  const doc: CanonicalAgentDoc = { frontmatter: fm, body: BODY, sourcePath: FILE };
  return {
    agent: fm.agent,
    doc,
    resolutions: [],
    unresolved: [],
    ambientManifests: {
      cc: { agent: fm.agent, target: 'cc', members: [] },
      kiro: { agent: fm.agent, target: 'kiro', members: [] },
    },
  } as unknown as ResolvedAgent;
}

function baseCtx(extra: Partial<AdapterContext> = {}): AdapterContext {
  return {
    workflowRules: [],
    skillsMap: { rows: [] },
    alwaysSet: [],
    dispositions: FIELD_DISPOSITIONS,
    sharedCatalog: [],
    repoRoot: REPO_ROOT,
    embeds: {},
    docIdToPath: {},
    steeringIdToPath: {},
    ...extra,
  } as AdapterContext;
}

/** Every body unit and every frontmatter LEAF retained, then the overrides. */
function rows(overrides: { body?: Record<string, DispositionRow>; frontmatter?: Record<string, DispositionRow> } = {}, drop: string[] = []): Dispositions {
  const body: Record<string, DispositionRow> = {};
  for (const u of partition(BODY).units) body[u.anchor] = { disposition: 'retained' };
  const fm: Record<string, DispositionRow> = {};
  const tree = entryTree(frontmatter() as unknown as YamlDoc);
  for (const [id, node] of tree.nodes) if (node.kind === 'leaf') fm[id] = { disposition: 'retained' };
  Object.assign(body, overrides.body ?? {});
  Object.assign(fm, overrides.frontmatter ?? {});
  for (const k of drop) {
    delete body[k];
    delete fm[k];
  }
  return { body, frontmatter: fm };
}

const unitText = (anchor: string): string => partition(BODY).units.find((u) => u.anchor === anchor)!.text;

/** The re-grounded command — the `## @entry` body is a YAML VALUE (Task 15.3; the 15.0 (b) erratum). */
const REGROUNDED_CMD = { name: 'unit-tests', cmd: 'npm test', runContext: 'consumer-repo', cue: "run your repo's unit suite" };

/** The overlay in its committed `## @unit` / `## @entry` form, parsed as 13.2 parses it (pins included). */
function parsedOverlay(): ParsedOverlay {
  const fm = frontmatter() as unknown as YamlDoc;
  const cmd = (fm.commands as unknown[])[0];
  const hex = (h: string) => h.replace(/^sha256:/, '');
  const text = [
    `## @unit #regrounded @ sha256:${hex(hashText(unitText('#regrounded')))}`,
    '## Regrounded',
    '',
    'Consumer-grounded operative text.',
    '',
    `## @entry commands[unit-tests] @ sha256:${hex(hashEntry(cmd))}`,
    ...Object.entries(REGROUNDED_CMD).map(([k, v]) => `${k}: ${JSON.stringify(v)}`),
    '',
  ].join('\n');
  return parseOverlay(text, 'canonical/profiles/consumer/twin.overlay.md');
}
function overlay(): Overlay {
  return toSpanOverlay(parsedOverlay());
}

/** A consumer ctx over the CANONICAL frontmatter — only for the refusals that precede derivation. */
function consumerCtx(disp: Dispositions, ov: Overlay | undefined = overlay()): AdapterContext {
  return baseCtx({ profile: 'consumer', consumer: { dispositions: { twin: disp }, overlays: ov ? { twin: ov } : {} } });
}

/**
 * The consumer rendering as the generator produces it (Task 15.3): the adapter renders derive()'s
 * frontmatter (values substituted, disposed entries pruned), attributed through `entryOrigin`.
 */
function consumerPrompt(adapter: TargetAdapter, disp: Dispositions): { content: string; attribution: AttributionManifest } {
  const agent = resolvedAgent();
  const derived = derive({ source: FILE, frontmatter: agent.doc.frontmatter as unknown as YamlDoc, body: BODY, dispositions: disp as Dispositions & RowFile, overlay: parsedOverlay() });
  const derivedAgent = { ...agent, doc: { ...agent.doc, frontmatter: derived.frontmatter as unknown as AgentFrontmatter } } as ResolvedAgent;
  const ctx = baseCtx({ profile: 'consumer', consumer: { dispositions: { twin: disp }, overlays: { twin: overlay() }, entryOrigins: { twin: derived.entryOrigin } } });
  const file = adapter.emitAgent(derivedAgent, ctx).find((f) => f.path.endsWith('.md'));
  if (!file) throw new Error('no prose artifact');
  return { content: file.content, attribution: file.attribution };
}

/** The prose artifact each adapter emits for an agent (CC: the agent file; Kiro: the prompt). */
function prompt(adapter: TargetAdapter, ctx: AdapterContext): { content: string; attribution: AttributionManifest } {
  const files = adapter.emitAgent(resolvedAgent(), ctx);
  const file = files.find((f) => f.path.endsWith('.md'));
  if (!file) throw new Error('no prose artifact');
  return { content: file.content, attribution: file.attribution };
}

function spanOf(attribution: AttributionManifest, source: string) {
  return attribution.spans.filter((s) => s.source === source);
}
function linesOf(content: string, lines: [number, number]): string {
  return content.split('\n').slice(lines[0] - 1, lines[1]).join('\n');
}

const ADAPTERS: [string, () => TargetAdapter][] = [
  ['cc', () => new CcAdapter(FIELD_DISPOSITIONS)],
  ['kiro', () => new KiroAdapter(FIELD_DISPOSITIONS)],
];

describe.each(ADAPTERS)('%s adapter — the consumer path routes through emitSpans (Task 15.0)', (_name, make) => {
  it('(a) a re-pointed body unit renders its overlay text, sourced to its canonical #<anchor>', () => {
    const out = consumerPrompt(make(), rows({ body: { '#regrounded': { disposition: 're-pointed', destination: '#regrounded' } } }));
    expect(out.content).toContain('Consumer-grounded operative text.');
    expect(out.content).not.toContain('Steward-only operative text.');
    const spans = spanOf(out.attribution, `${FILE}#regrounded`);
    expect(spans).toHaveLength(1);
    expect(spans[0].op).toBe('render');
    expect(linesOf(out.content, spans[0].lines)).toContain('Consumer-grounded operative text.');
  });

  it('(b) a re-pointed frontmatter leaf renders its ## @entry overlay VALUE via the field’s per-kind renderer, sourced to …#frontmatter:<path> (15.0 (b) erratum, 2026-09-29)', () => {
    const out = consumerPrompt(make(), rows({ frontmatter: { 'commands[unit-tests]': { disposition: 're-pointed', destination: 'frontmatter:commands[unit-tests]' } } }));
    const spans = spanOf(out.attribution, `${FILE}#frontmatter:commands[unit-tests]`);
    expect(spans).toHaveLength(1);
    expect(spans[0].op).toBe('render');
    // "target renderings = rendering(derive(x))": the span is exactly what the SAME adapter renders
    // for a charter whose canonical command already IS the re-grounded value.
    const agent = resolvedAgent();
    const asCanonical = { ...agent, doc: { ...agent.doc, frontmatter: { ...agent.doc.frontmatter, commands: [REGROUNDED_CMD] } } } as unknown as ResolvedAgent;
    const steward = make().emitAgent(asCanonical, baseCtx()).find((f) => f.path.endsWith('.md'))!;
    const stewardSpan = spanOf(steward.attribution, `${FILE}#frontmatter:commands[unit-tests]`)[0];
    expect(linesOf(out.content, spans[0].lines)).toBe(linesOf(steward.content, stewardSpan.lines));
    expect(linesOf(out.content, spans[0].lines)).toContain("run your repo's unit suite");
    expect(out.content).not.toContain('run the unit suite');
  });

  it('(c) a list-valued field renders per member, so writeScope[<glob>] is its own span (DD26)', () => {
    const out = consumerPrompt(make(), rows({ frontmatter: { 'writeScope[b/**]': { disposition: 'no-consumer-counterpart' } } }));
    const a = spanOf(out.attribution, `${FILE}#frontmatter:writeScope[a/**]`);
    expect(a).toHaveLength(1);
    expect(linesOf(out.content, a[0].lines)).toBe('- `a/**`');
    expect(spanOf(out.attribution, `${FILE}#frontmatter:writeScope[b/**]`)).toHaveLength(0);
    expect(out.content).not.toContain('`b/**`');
    // The steward profile keeps the one-sentence container rendering, byte-identical to pre-15.0.
    const steward = prompt(make(), baseCtx());
    expect(steward.content).toContain('you may create or modify files only under `a/**`, `b/**`.');
    expect(spanOf(steward.attribution, `${FILE}#frontmatter:writeScope`)).toHaveLength(1);
    expect(spanOf(steward.attribution, `${FILE}#frontmatter:writeScope[a/**]`)).toHaveLength(0);
  });

  it('(d) a missing row throws', () => {
    expect(() => prompt(make(), consumerCtx(rows({}, ['#kept'])))).toThrow(
      'emitSpans: body unit #kept in canonical/agents/twin.md has no disposition row — never implied as retained.'
    );
    expect(() => prompt(make(), consumerCtx(rows({}, ['writeScope[a/**]'])))).toThrow(
      'emitSpans: frontmatter entry writeScope[a/**] in canonical/agents/twin.md has no disposition row — never implied as retained.'
    );
  });

  it('rendering the CANONICAL frontmatter under the consumer profile refuses a disposed entry (Task 15.3) — the adapters render derive()’s', () => {
    expect(() => prompt(make(), consumerCtx(rows({ frontmatter: { 'writeScope[b/**]': { disposition: 'no-consumer-counterpart' } } })))).toThrow(
      "emitSpans: frontmatter entry writeScope[b/**] in canonical/agents/twin.md is disposed no-consumer-counterpart but was rendered — the consumer profile renders derive()'s frontmatter and catalog, never the canonical ones."
    );
  });

  it('a consumer emit for an agent with no dispositions refuses', () => {
    expect(() => prompt(make(), baseCtx({ profile: 'consumer', consumer: { dispositions: {} } }))).toThrow(
      'emitSpans: the consumer profile requires dispositions — every unit and entry carries an explicit row.'
    );
  });
});

describe('the adapter registry (Task 15.0)', () => {
  it('builds one adapter per declared target, in declared order', () => {
    expect(adaptersFor(['cc', 'kiro'], FIELD_DISPOSITIONS).map((a) => a.target)).toEqual(['cc', 'kiro']);
    expect(Object.keys(registeredAdapterFactories())).toEqual(['cc', 'kiro']);
  });

  it('a declared target with no registered adapter fails loud, naming it', () => {
    expect(() => adaptersFor(['cc', 'ghost'], FIELD_DISPOSITIONS)).toThrow(
      'no adapter is registered for declared target "ghost" (canonical/consumer-profile.yaml) — register one in tools/agent-generator/adapters/index.ts (registered: cc, kiro; Req 24 AC3)'
    );
  });

  it('accepts an injected factory for a further target (Task 14’s fake third target), never a shadowing one', () => {
    const fake = (d: FieldDispositionTable) => ({ ...new CcAdapter(d), target: 'fake' }) as unknown as TargetAdapter;
    expect(adaptersFor(['cc', 'kiro', 'fake'], FIELD_DISPOSITIONS, { fake }).map((a) => a.target)).toEqual(['cc', 'kiro', 'fake']);
    expect(() => adaptersFor(['cc'], FIELD_DISPOSITIONS, { cc: fake })).toThrow('may not shadow the registered adapter "cc"');
  });
});

describe('the consumer profile (C12 — the single declared list)', () => {
  it('declares targets [cc, kiro] and defaultTarget cc', () => {
    const p = loadConsumerProfile(REPO_ROOT);
    expect(p.targets).toEqual(['cc', 'kiro']);
    expect(p.defaultTarget).toBe('cc');
  });

  it('refuses a malformed profile, naming the defect', () => {
    const cases: [string, string][] = [
      ['targets: []\ndefaultTarget: cc\n', 'targets: must be a non-empty list of target names'],
      ['targets: [cc, cc]\ndefaultTarget: cc\n', "targets: 'cc' is declared twice"],
      ['targets: [cc]\ndefaultTarget: kiro\n', 'defaultTarget: must be one of the declared targets (cc); got "kiro"'],
      ['targets: [cc]\ndefaultTarget: cc\nextra: 1\n', "unknown key 'extra' — allowed: targets, defaultTarget"],
    ];
    for (const [yaml, msg] of cases) {
      expect(() => parseConsumerProfile(yaml, 'p.yaml')).toThrow(ConsumerProfileError);
      expect(() => parseConsumerProfile(yaml, 'p.yaml')).toThrow(`p.yaml: ${msg}`);
    }
  });
});
