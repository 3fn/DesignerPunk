/**
 * consumer-rendering.survivors.test.ts — Spec 123 Task 15.3 (fixture shapes; the real profile is
 * 15.4):
 *   - identity MEMBER FILES per target (C19): CC `.claude/identity/designerpunk-<id>.md`, Kiro
 *     `.kiro/steering/designerpunk-<id>.md` with exactly `id` + `inclusion: always`; the shipped
 *     doc's own frontmatter never carried; routed through `emitSpans` (spans sourced per unit);
 *   - the Kiro JSON config's CONSUMER form: built from the derived frontmatter's values — a
 *     re-grounded `writeScope` glob lands in `allowedPaths` — with `resources` pointing at the
 *     per-target identity member files and the installed package, asserted per entry;
 *   - "nothing renders that no surviving member sourced": container pieces vanish with their last
 *     member (the bite), shared-catalog members follow `_shared.dispositions.yaml`;
 *   - "target renderings = rendering(derive(x))": a re-pointed value renders exactly as the same
 *     adapter renders a charter that already carries it.
 */
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import type { AdapterContext, FieldDispositionTable, IdentityMemberInput, TargetAdapter } from '../adapters/index';
import { CcAdapter } from '../adapters/cc';
import { KiroAdapter } from '../adapters/kiro';
import { checkAttributionTotality } from '../attribution';
import type { RowFile } from '../derive';
import type { YamlDoc } from '../frontmatter';
import {
  consumerDocIdToPath,
  generateConsumerRendering,
  loadIdentityDocs,
  type ConsumerProfileInputs,
  type GeneratedOutput,
} from '../generate';
import { entryTree, partition } from '../partition';
import type { ResolvedAgent } from '../pipeline';
import { hashEntry } from '../regrounding/hash';
import { parseOverlay } from '../regrounding/overlay';
import type { AgentFrontmatter, CanonicalAgentDoc } from '../schema';
import { emitSpans, SpanEmissionError, type Dispositions, type DispositionRow } from '../spans';
import { AttributionAccumulator } from '../attribution';
import { survivorViolations, type SurvivorProfile } from './survivor-sourced';

const REPO_ROOT = path.resolve(__dirname, '..', '..', '..');
const FIELD_DISPOSITIONS: FieldDispositionTable = { configFields: [], runtimeToolRefs: [] };
const FILE = 'canonical/agents/twin.md';
const BODY = ['# Twin', '', '## Kept', '', 'Kept verbatim.', ''].join('\n');
const hex = (h: string) => h.replace(/^sha256:/, '');

const FM = (): AgentFrontmatter =>
  ({
    agent: 'twin',
    agentType: 'consumer',
    description: 'A twin agent for the survivor-sourced checks.',
    toolSubset: { 'designerpunk-docs': ['find_docs'] },
    routes: { docs: [{ id: 'token-governance', cue: 'you need token governance' }] },
    commands: [{ name: 'unit-tests', cmd: 'npm test', runContext: 'this-repo', cue: 'run the unit suite' }],
    knowledgeBases: [
      { name: 'kb-one', globs: ['src/one/**'] },
      { name: 'kb-two', globs: ['src/two/**'] },
    ],
    writeScope: ['a/**', 'b/**'],
    kiro: { agentSpawn: [{ command: 'git status --porcelain' }] },
    ambient: {
      governanceAsLaw: [
        {
          id: 'token-governance',
          owner: 'ada',
          assert: [
            { claim: 'one', section: 'Sec One', mustContain: ['one'] },
            { claim: 'two', section: 'Sec Two', mustContain: ['two'] },
          ],
        },
      ],
    },
  }) as unknown as AgentFrontmatter;

const SHARED_TEXT = [
  'members:',
  '  - id: keep-me',
  '    kind: governance-rule',
  '    statement: Keep this rule.',
  '    owner: thurgood',
  '  - id: drop-me',
  '    kind: command',
  '    cmd: ./.kiro/hooks/steward-only.sh',
  '    cue: run the steward-only hook',
  '    runContext: this-repo',
  '    owner: thurgood',
  '',
].join('\n');

const IDENTITY_SOURCE = '.kiro/steering/core-goals.md';
const IDENTITY_TEXT = ['---', 'id: core-goals', 'inclusion: always', 'description: this repo\'s steward specifics', '---', '# Core Goals', '', '## Keep', '', 'A consumer-true goal.', '', '## Drop', '', 'A steward-only goal.', ''].join('\n');

/** Rows: every unit / leaf / member retained, then the overrides. */
function rows(over: Record<string, DispositionRow> = {}): Dispositions & RowFile {
  const body: Record<string, DispositionRow> = {};
  for (const u of partition(BODY).units) body[u.anchor] = { disposition: 'retained' };
  const fm: Record<string, DispositionRow> = {};
  for (const l of entryTree(FM() as unknown as YamlDoc).units) fm[l.path] = { disposition: 'retained' };
  return { source: FILE, body, frontmatter: { ...fm, ...over } } as Dispositions & RowFile;
}
const SHARED_ROWS = (over: Record<string, DispositionRow> = {}) => ({
  source: 'canonical/shared/shared-catalog.yaml',
  members: { 'keep-me': { disposition: 'retained' }, 'drop-me': { disposition: 'no-consumer-counterpart', cites: 'subtraction-1' }, ...over },
});
const identityRows = () =>
  ({
    source: IDENTITY_SOURCE,
    counterpart: IDENTITY_SOURCE,
    body: { '#keep': { disposition: 'retained' }, '#drop': { disposition: 'no-consumer-counterpart', cites: 'subtraction-2' } }, // the title rides forward into #keep (C13)
  }) as unknown as Dispositions & RowFile;

const MANIFEST_MEMBERS = [
  { id: 'core-goals', class: 'formative', lane: 'always', delivery: 'file' },
  { id: 'personal-note', class: 'formative', lane: 'always', delivery: 'file' },
  { id: 'token-governance', class: 'governance-as-law', lane: 'per-agent', delivery: 'file' },
];

function ctxFor(): AdapterContext {
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
  } as unknown as AdapterContext;
}

async function render(opts: { rows?: Dispositions & RowFile; shared?: Record<string, DispositionRow>; overlay?: string } = {}): Promise<GeneratedOutput[]> {
  const { body: identityBody } = { body: IDENTITY_TEXT.split('---\n').slice(2).join('---\n') };
  const inputs: ConsumerProfileInputs = {
    dispositions: { twin: opts.rows ?? rows() },
    overlays: opts.overlay ? { twin: parseOverlay(opts.overlay, 'canonical/profiles/consumer/twin.overlay.md') } : {},
    shared: { dispositions: SHARED_ROWS(opts.shared) as unknown as RowFile },
    identity: { 'core-goals': { dispositions: identityRows() } },
    missing: [],
    authored: true,
  };
  return generateConsumerRendering({
    agents: [{ frontmatter: FM(), body: BODY, sourcePath: FILE } as CanonicalAgentDoc],
    identity: [{ id: 'core-goals', source: IDENTITY_SOURCE, body: identityBody }],
    sharedCatalogText: SHARED_TEXT,
    inputs,
    adapters: [new CcAdapter(FIELD_DISPOSITIONS), new KiroAdapter(FIELD_DISPOSITIONS)],
    resolve: async (doc) => {
      // A resolver stub over the DERIVED doc: the per-agent manifest and the embeds follow its
      // surviving ambient claims, as the real resolveForEmission does (C11 lane 2).
      const law = doc.frontmatter.ambient?.governanceAsLaw ?? [];
      const perAgent = law.map((e) => ({ id: e.id, class: 'governance-as-law', lane: 'per-agent', delivery: 'file' }));
      const embedSections = Object.fromEntries(law.map((e) => [e.id, e.assert.map((c) => ({ section: c.section, text: `#### ${c.section}\n\n${c.section} text.` }))]));
      const embeds = Object.fromEntries(Object.entries(embedSections).map(([id, parts]) => [id, parts.map((p) => p.text).join('\n\n')]));
      const resolved = {
        agent: doc.frontmatter.agent,
        doc,
        resolutions: [],
        unresolved: [],
        ambientManifests: { cc: { agent: 'twin', target: 'cc', members: perAgent }, kiro: { agent: 'twin', target: 'kiro', members: MANIFEST_MEMBERS } },
      } as unknown as ResolvedAgent;
      return { resolved, emitCtx: { ...ctxFor(), embeds, embedSections } };
    },
    docIdToPath: {
      'core-goals': '.kiro/steering/designerpunk-core-goals.md',
      'personal-note': '.designerpunk/personal-note.local.md',
      'token-governance': 'node_modules/@3fn/core/governance/Token-Governance.md',
    },
    alwaysSetIds: ['core-goals', 'personal-note'],
  });
}

const byPath = (outputs: GeneratedOutput[], p: string) => outputs.find((o) => o.path === p);
const profileOf = (r: Dispositions & RowFile, shared = SHARED_ROWS()): SurvivorProfile => ({
  sources: {
    [FILE]: { tree: entryTree(FM() as unknown as YamlDoc), body: r.body, frontmatter: r.frontmatter },
    [IDENTITY_SOURCE]: { body: identityRows().body },
  },
  shared: shared.members as Record<string, DispositionRow>,
});

describe('identity member files per target (C19; Task 15.3)', () => {
  it('CC and Kiro each get designerpunk-<id>.md; Kiro carries exactly id + inclusion: always; no source frontmatter', async () => {
    const out = await render();
    const cc = byPath(out, 'canonical/_consumer-output/cc/.claude/identity/designerpunk-core-goals.md')!;
    const kiro = byPath(out, 'canonical/_consumer-output/kiro/.kiro/steering/designerpunk-core-goals.md')!;
    expect(cc.content.startsWith('# Core Goals')).toBe(true);
    expect(kiro.content.startsWith('---\nid: designerpunk-core-goals\ninclusion: always\n---\n\n# Core Goals')).toBe(true);
    for (const f of [cc, kiro]) {
      expect(f.content).not.toContain("steward specifics");
      expect(f.content).toContain('A consumer-true goal.');
      expect(f.content).not.toContain('A steward-only goal.'); // disposed no-consumer-counterpart
      expect(checkAttributionTotality(f.attribution!, f.content.split('\n').length - 1).errors).toEqual([]);
      expect(f.attribution!.spans.filter((s) => s.source === `${IDENTITY_SOURCE}#keep`).map((s) => s.op)).toEqual(['passthrough']);
    }
    // The derived identity doc lands once in _canonical/ (derive() — C22).
    expect(byPath(out, 'canonical/_consumer-output/_canonical/always-set/core-goals.md')!.content).toBe(cc.content);
  });

  it('refuses under the steward profile (the steward keeps today’s always-layer)', () => {
    const member: IdentityMemberInput = { id: 'core-goals', source: IDENTITY_SOURCE, body: '# Core Goals\n', dispositions: { body: {} } };
    expect(() => new CcAdapter(FIELD_DISPOSITIONS).emitIdentityMembers([member], ctxFor())).toThrow('emitIdentityMembers is the CONSUMER profile');
    expect(() => new KiroAdapter(FIELD_DISPOSITIONS).emitIdentityMembers([member], ctxFor())).toThrow('emitIdentityMembers is the CONSUMER profile');
  });

  it('loadIdentityDocs drops the shipped doc’s frontmatter and skips the template member', () => {
    const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'identity-'));
    try {
      fs.mkdirSync(path.join(tmp, '.kiro/steering'), { recursive: true });
      fs.writeFileSync(path.join(tmp, '.kiro/steering/core-goals.md'), IDENTITY_TEXT);
      fs.writeFileSync(path.join(tmp, '.kiro/steering/personal-note.md'), '# Personal Note\n');
      const docs = loadIdentityDocs(tmp, ['personal-note', 'core-goals']);
      expect(docs.map((d) => d.id)).toEqual(['core-goals']);
      expect(docs[0].body.startsWith('# Core Goals')).toBe(true);
    } finally {
      fs.rmSync(tmp, { recursive: true, force: true });
    }
  });
});

describe('the Kiro JSON config’s consumer form (Task 15.3, following the entry-overlay ruling)', () => {
  it('builds from derived values: a re-grounded writeScope glob lands in allowedPaths; resources point at member files and the installed package, per entry', async () => {
    const r = rows({
      'writeScope[a/**]': { disposition: 're-pointed', destination: 'frontmatter:writeScope[a/**]' },
      'writeScope[b/**]': { disposition: 'no-consumer-counterpart' },
    });
    const overlay = `## @entry writeScope[a/**] @ sha256:${hex(hashEntry('a/**'))}\nsrc/**\n`;
    const out = await render({ rows: r, overlay });
    const config = JSON.parse(byPath(out, 'canonical/_consumer-output/kiro/.kiro/agents/twin.json')!.content) as { toolsSettings: { write: { allowedPaths: string[] } }; resources: string[] };
    expect(config.toolsSettings.write.allowedPaths).toEqual(['src/**']);
    expect(config.resources).toEqual([
      'file://.kiro/steering/designerpunk-core-goals.md',
      'file://.designerpunk/personal-note.local.md',
      'file://node_modules/@3fn/core/governance/Token-Governance.md',
    ]);
    // Each resource entry names a surviving manifest member at its consumer path.
    const expected = MANIFEST_MEMBERS.map((m) => `file://${{ 'core-goals': '.kiro/steering/designerpunk-core-goals.md', 'personal-note': '.designerpunk/personal-note.local.md', 'token-governance': 'node_modules/@3fn/core/governance/Token-Governance.md' }[m.id]}`);
    expect(config.resources).toEqual(expected);
  });

  it('consumerDocIdToPath over the real repo: identity docs → member files, the template → .designerpunk/, everything else → the installed package', () => {
    const map = consumerDocIdToPath(REPO_ROOT, ['core-goals', 'personal-note']);
    expect(map['core-goals']).toBe('.kiro/steering/designerpunk-core-goals.md');
    expect(map['personal-note']).toBe('.designerpunk/personal-note.local.md');
    expect(map['token-governance']).toBe('node_modules/@3fn/core/governance/Token-Governance.md');
  });
});

describe('nothing renders that no surviving member sourced (Task 15.3; fixture shapes)', () => {
  it('a fully retained render passes the survivor check on every artifact', async () => {
    const out = await render();
    expect(survivorViolations(out, profileOf(rows()))).toEqual([]);
  });

  it('THE BITE: dispose every member under one header → the header vanishes; restore one → it returns', async () => {
    const cc = (o: GeneratedOutput[]) => byPath(o, 'canonical/_consumer-output/cc/.claude/agents/twin.md')!.content;
    const none = rows({ 'knowledgeBases[kb-one]': { disposition: 'no-consumer-counterpart' }, 'knowledgeBases[kb-two]': { disposition: 'no-consumer-counterpart' } });
    const gone = await render({ rows: none });
    expect(cc(gone)).not.toContain('## Knowledge fallback');
    expect(survivorViolations(gone, profileOf(none))).toEqual([]);
    const one = rows({ 'knowledgeBases[kb-one]': { disposition: 'no-consumer-counterpart' } });
    const back = await render({ rows: one });
    expect(cc(back)).toContain('## Knowledge fallback');
    expect(cc(back)).toContain('kb-two');
    expect(cc(back)).not.toContain('kb-one');
  });

  it('shared-catalog members follow _shared.dispositions.yaml: a this-repo member never ships; the Commands section goes with its last member', async () => {
    const cc = (o: GeneratedOutput[]) => byPath(o, 'canonical/_consumer-output/cc/.claude/agents/twin.md')!.content;
    const out = await render();
    expect(cc(out)).toContain('Keep this rule.');
    expect(cc(out)).not.toContain('steward-only.sh');
    const noCommands = rows({ 'commands[unit-tests]': { disposition: 'no-consumer-counterpart' } });
    const allGone = await render({ rows: noCommands, shared: { 'keep-me': { disposition: 'no-consumer-counterpart' } } });
    expect(cc(allGone)).not.toContain('## Commands');
    const sharedOnly = await render({ rows: noCommands });
    expect(cc(sharedOnly)).toContain('## Commands');
    expect(survivorViolations(sharedOnly, profileOf(noCommands))).toEqual([]);
  });

  it('the checker catches a span no surviving row sourced (it is not vacuous)', async () => {
    const out = await render();
    const claimsDropped = rows({ 'writeScope[a/**]': { disposition: 'no-consumer-counterpart' } }); // rendered with a/** retained
    expect(survivorViolations(out, profileOf(claimsDropped))).toEqual([
      'canonical/_consumer-output/cc/.claude/agents/twin.md: canonical/agents/twin.md#frontmatter:writeScope[a/**] — frontmatter leaf without a surviving row',
      'canonical/_consumer-output/kiro/.kiro/agents/twin-prompt.md: canonical/agents/twin.md#frontmatter:writeScope[a/**] — frontmatter leaf without a surviving row',
    ]);
  });

  it('emitSpans refuses a container piece with no leaf under it (consumer)', () => {
    const acc = new AttributionAccumulator();
    const src = { file: FILE, body: BODY, frontmatter: { knowledgeBases: [] } as unknown as YamlDoc };
    expect(() => emitSpans(acc, src, 'consumer', { body: {}, frontmatter: {} }, undefined, [{ kind: 'entry', path: 'knowledgeBases', text: '## Knowledge fallback\n\n' }])).toThrow(SpanEmissionError);
  });
});

describe('CC ambient embeds under the consumer profile: one span per asserted section (Task 15.3)', () => {
  it('the ### <docid> header is a container over per-section spans; a disposed section is absent; the header goes with its last section', async () => {
    const cc = (o: GeneratedOutput[]) => byPath(o, 'canonical/_consumer-output/cc/.claude/agents/twin.md')!;
    const all = cc(await render());
    const sources = all.attribution!.spans.map((s) => s.source);
    expect(sources).toEqual(expect.arrayContaining([`${FILE}#frontmatter:ambient[token-governance]`, `${FILE}#frontmatter:ambient[token-governance#sec-one]`, `${FILE}#frontmatter:ambient[token-governance#sec-two]`]));
    const one = rows({ 'ambient[token-governance#sec-one]': { disposition: 'no-consumer-counterpart' } });
    const partial = cc(await render({ rows: one }));
    expect(partial.content).toContain('Sec Two text.');
    expect(partial.content).not.toContain('Sec One text.');
    expect(survivorViolations([partial], profileOf(one))).toEqual([]);
    const none = rows({ 'ambient[token-governance#sec-one]': { disposition: 'no-consumer-counterpart' }, 'ambient[token-governance#sec-two]': { disposition: 'no-consumer-counterpart' } });
    const gone = cc(await render({ rows: none }));
    expect(gone.content).not.toContain('### token-governance');
    expect(gone.content).not.toContain('## Ambient (per-agent)');
  });
});

describe('target renderings = rendering(derive(x)) (Task 15.3)', () => {
  it('a re-pointed knowledge base renders exactly as the same adapter renders a charter that already carries the value', async () => {
    const value = { name: 'kb-one', globs: ['node_modules/@3fn/core/src/one/**'] };
    const r = rows({ 'knowledgeBases[kb-one]': { disposition: 're-pointed', destination: 'frontmatter:knowledgeBases[kb-one]' } });
    const overlay = `## @entry knowledgeBases[kb-one] @ sha256:${hex(hashEntry({ name: 'kb-one', globs: ['src/one/**'] }))}\nname: kb-one\nglobs:\n  - node_modules/@3fn/core/src/one/**\n`;
    const out = await render({ rows: r, overlay });
    const consumer = byPath(out, 'canonical/_consumer-output/cc/.claude/agents/twin.md')!;
    const span = consumer.attribution!.spans.find((s) => s.source === `${FILE}#frontmatter:knowledgeBases[kb-one]`)!;
    expect(span.op).toBe('render');
    const lines = consumer.content.split('\n').slice(span.lines[0] - 1, span.lines[1]).join('\n');
    const already = { ...FM(), knowledgeBases: [value, FM().knowledgeBases![1]] } as AgentFrontmatter;
    const steward = new CcAdapter(FIELD_DISPOSITIONS)
      .emitAgent({ agent: 'twin', doc: { frontmatter: already, body: BODY, sourcePath: FILE }, resolutions: [], unresolved: [], ambientManifests: { cc: { agent: 'twin', target: 'cc', members: [] }, kiro: { agent: 'twin', target: 'kiro', members: [] } } } as unknown as ResolvedAgent, ctxFor())
      .find((f) => f.path.endsWith('.md'))!;
    const sSpan = steward.attribution.spans.find((s) => s.source === `${FILE}#frontmatter:knowledgeBases[kb-one]`)!;
    expect(lines).toBe(steward.content.split('\n').slice(sSpan.lines[0] - 1, sSpan.lines[1]).join('\n'));
    expect(lines).toContain('node_modules/@3fn/core/src/one/**');
  });
});
