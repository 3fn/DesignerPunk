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

import * as fs from 'fs';
import * as path from 'path';
import { adaptersFor, registeredAdapterFactories, type AdapterContext, type FieldDispositionTable, type TargetAdapter } from '../adapters/index';
import { CcAdapter, CONSUMER_WRITE_SCOPE_EXCEPTION_SENTENCE } from '../adapters/cc';
import { renderRunContextAnnotation } from '../render';
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
    // The one profile-dependent piece is the run-context annotation (Task 15.5): consumer-true
    // under the consumer profile. Everything else is the same per-kind renderer.
    const stewardText = linesOf(steward.content, stewardSpan.lines).replace(renderRunContextAnnotation('consumer-repo'), renderRunContextAnnotation('consumer-repo', 'consumer'));
    expect(linesOf(out.content, spans[0].lines)).toBe(stewardText);
    expect(linesOf(out.content, spans[0].lines)).toContain('(run from your product repo)');
    expect(out.content).not.toContain('not this repo');
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

/** The `## Write scope` section of a rendered prose artifact (heading through the next heading / EOF). */
function writeScopeSection(content: string): string {
  const start = content.indexOf('## Write scope\n');
  if (start < 0) throw new Error('no ## Write scope section');
  const next = content.indexOf('\n## ', start + 1);
  return next < 0 ? content.slice(start) : content.slice(start, next + 1);
}

/**
 * Release-4 consumer write-scope exception (2026-10-16). In a consumer's repo the declared scope is
 * the PRE-APPROVED set; the governing prose itself states the exception (ask the human lead, write
 * only after they confirm in this session) and carries a target-true platform clause. An
 * "only under … read-only" sentence is a hard brake the agent obeys even over an in-session grant
 * (six Kiro runs, Peter, 2026-10-16), so it must not survive in the consumer lane. The steward lane
 * is byte-identical to what it was.
 */
const CONSUMER_WRITE_SCOPE_INTRO = 'Write scope (behavioral): these paths are pre-approved — you may create or modify files under them:';
const PLATFORM_CLAUSE: Record<string, string> = {
  cc: 'Claude Code may not show a permission prompt for such a write, so their confirmation is the check.',
  kiro: 'Kiro may also show its own permission prompt for such a write.',
};
const STEWARD_NOTE = 'Write scope (behavioral): you may create or modify files only under `a/**`, `b/**`. Treat paths outside this set as read-only.';
const FACET_7 =
  'CC has no declarative per-agent write-path field (cc-agent-model.md facet 7: path rules are session-global, not per-agent); ' +
  'the documented enforcement options are a per-agent `PreToolUse` hook rejecting out-of-scope `Edit`/`Write` paths, or ' +
  '`isolation: worktree` — named here as the enforcement mechanism, not emitted as a declarative scope.';
const STEWARD_SECTION: Record<string, string> = {
  cc: `## Write scope\n\n${STEWARD_NOTE} ${FACET_7}\n\n`,
  kiro: `## Write scope\n\n${STEWARD_NOTE}\n\n`,
};
const CONSUMER_SECTION: Record<string, string> = {
  cc: `## Write scope\n\n${CONSUMER_WRITE_SCOPE_INTRO}\n\n- \`a/**\`\n- \`b/**\`\n\n${CONSUMER_WRITE_SCOPE_EXCEPTION_SENTENCE} ${PLATFORM_CLAUSE.cc}\n\n${FACET_7}\n\n`,
  kiro: `## Write scope\n\n${CONSUMER_WRITE_SCOPE_INTRO}\n\n- \`a/**\`\n- \`b/**\`\n\n${CONSUMER_WRITE_SCOPE_EXCEPTION_SENTENCE} ${PLATFORM_CLAUSE.kiro}\n\n`,
};

describe.each(ADAPTERS)('%s adapter — the consumer write-scope exception (release 4, 2026-10-16)', (name, make) => {
  it('the exception sentence names no version and grants nothing by itself', () => {
    expect(CONSUMER_WRITE_SCOPE_EXCEPTION_SENTENCE).toBe(
      'Paths outside this set are not pre-approved: ask your human lead before writing there, and write there only after they confirm in this session.'
    );
    expect(CONSUMER_WRITE_SCOPE_EXCEPTION_SENTENCE).not.toMatch(/\d+\.\d+/);
  });

  it('the consumer lane renders the pre-approved set, the exception sentence and the target-true platform clause — exactly', () => {
    const out = consumerPrompt(make(), rows());
    const section = writeScopeSection(out.content);
    expect(section).toBe(CONSUMER_SECTION[name]);
    expect(section).not.toContain('read-only');
    expect(section).not.toContain('only under');
    // The other target's platform clause never leaks in.
    for (const [other, clause] of Object.entries(PLATFORM_CLAUSE)) if (other !== name) expect(section).not.toContain(clause);
  });

  it('the steward lane is byte-identical (one-sentence container note) and carries no exception sentence', () => {
    const steward = prompt(make(), baseCtx());
    expect(writeScopeSection(steward.content)).toBe(STEWARD_SECTION[name]);
    expect(steward.content).not.toContain(CONSUMER_WRITE_SCOPE_EXCEPTION_SENTENCE);
    expect(steward.content).not.toContain(CONSUMER_WRITE_SCOPE_INTRO);
  });
});

describe('the consumer write-scope exception in the committed renderings (release 4, 2026-10-16)', () => {
  const AGENTS = ['ada', 'data', 'kenya', 'leonardo', 'lina', 'sparky', 'stacy', 'thurgood'];
  const read = (rel: string): string => fs.readFileSync(path.join(REPO_ROOT, rel), 'utf8');
  const TARGETS: [string, (a: string) => string, (a: string) => string][] = [
    ['cc', (a) => `canonical/_consumer-output/cc/.claude/agents/${a}.md`, (a) => `.claude/agents/${a}.md`],
    ['kiro', (a) => `canonical/_consumer-output/kiro/.kiro/agents/${a}-prompt.md`, (a) => `.kiro/agents/${a}-prompt.md`],
  ];

  it.each(TARGETS)('%s: every consumer charter carries the sentence; every steward charter keeps the read-only note and lacks it', (target, consumerPath, stewardPath) => {
    for (const a of AGENTS) {
      const consumer = writeScopeSection(read(consumerPath(a)));
      expect(consumer).toContain(CONSUMER_WRITE_SCOPE_INTRO);
      expect(consumer).toContain(`${CONSUMER_WRITE_SCOPE_EXCEPTION_SENTENCE} ${PLATFORM_CLAUSE[target]}`);
      expect(consumer).not.toContain('read-only');
      const steward = writeScopeSection(read(stewardPath(a)));
      expect(steward).toContain('Treat paths outside this set as read-only.');
      expect(steward).not.toContain(CONSUMER_WRITE_SCOPE_EXCEPTION_SENTENCE);
    }
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
