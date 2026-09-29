/**
 * consumer-rendering.test.ts — Spec 123 Task 15.1: the consumer rendering lane and what reads it.
 *
 *   - `generateConsumerRendering`: every resolved ledger agent through every adapter under
 *     `profile: 'consumer'`, remapped to `canonical/_consumer-output/<target>/<path>`; the
 *     population is all-or-nothing (never a silent partial);
 *   - `loadConsumerInputs`: the committed dispositions + overlay per agent;
 *   - `guardedRoots()` guards the consumer output root (C12);
 *   - the freshness sweep reads a signature's `renderedHash` from the COMMITTED rendering's
 *     sidecars (the Task 13 carry: before this, every signature was refused);
 *   - `evidence:` notes resolve, and every profile file is reached by something the sweep checks
 *     (the Task 13 carry: the profile-dir glob claimed more than the sweep read).
 *
 * Scope: fixture shapes (a twin agent; the stale-unit fixture). The real eight-agent render is
 * 15.3–15.5, and `derive()` / `_canonical/` is 15.2.
 */

import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { type AdapterContext, type FieldDispositionTable, type TargetAdapter } from '../adapters/index';
import { CcAdapter } from '../adapters/cc';
import { KiroAdapter } from '../adapters/kiro';
import { checkAttributionTotality } from '../attribution';
import { CONSUMER_OUTPUT_ROOT } from '../consumer-profile';
import { readConsumerSpans, renderedHashOf, rowSpanSource } from '../derive';
import {
  generateConsumerRendering,
  guardedRoots,
  loadConsumerInputs,
  partialConsumerPopulationMessage,
  writeOutputs,
  type ConsumerProfileInputs,
  type ResolvedForEmission,
} from '../generate';
import { entryTree, partition } from '../partition';
import { runFreshnessSweep } from '../regrounding/freshness';
import { hashText } from '../regrounding/hash';
import { parseOverlay, toSpanOverlay } from '../regrounding/overlay';
import type { AgentFrontmatter, CanonicalAgentDoc } from '../schema';
import type { Dispositions, DispositionRow } from '../spans';
import type { YamlDoc } from '../frontmatter';
import type { ResolvedAgent } from '../pipeline';

const REPO_ROOT = path.resolve(__dirname, '..', '..', '..');
const FIELD_DISPOSITIONS: FieldDispositionTable = { configFields: [], runtimeToolRefs: [] };
const BODY = ['# Twin', '', '## Kept', '', 'Kept verbatim.', '', '## Regrounded', '', 'Steward-only operative text.', ''].join('\n');
const hex = (h: string) => h.replace(/^sha256:/, '');

function frontmatter(agent: string): AgentFrontmatter {
  return {
    agent,
    agentType: 'consumer',
    description: 'A twin agent for the consumer rendering lane.',
    toolSubset: { 'designerpunk-docs': ['find_docs'] },
    commands: [{ name: 'unit-tests', cmd: 'npm test', runContext: 'this-repo', cue: 'run the unit suite' }],
    writeScope: ['a/**', 'b/**'],
  } as AgentFrontmatter;
}

function resolvedFor(agent: string): ResolvedForEmission {
  const fm = frontmatter(agent);
  const doc: CanonicalAgentDoc = { frontmatter: fm, body: BODY, sourcePath: `canonical/agents/${agent}.md` };
  const resolved = {
    agent,
    doc,
    resolutions: [],
    unresolved: [],
    ambientManifests: { cc: { agent, target: 'cc', members: [] }, kiro: { agent, target: 'kiro', members: [] } },
  } as unknown as ResolvedAgent;
  const emitCtx = {
    workflowRules: [],
    skillsMap: { rows: [] },
    alwaysSet: [],
    dispositions: FIELD_DISPOSITIONS,
    sharedCatalog: [],
    repoRoot: REPO_ROOT,
    embeds: {},
    docIdToPath: {},
    steeringIdToPath: {},
  } as AdapterContext;
  return { resolved, emitCtx } as ResolvedForEmission;
}

/** Every body unit and frontmatter leaf retained, `#regrounded` re-pointed. */
function rows(agent: string): Dispositions {
  const body: Record<string, DispositionRow> = {};
  for (const u of partition(BODY).units) body[u.anchor] = { disposition: 'retained' };
  body['#regrounded'] = { disposition: 're-pointed', destination: '#regrounded' };
  const fm: Record<string, DispositionRow> = {};
  for (const [id, node] of entryTree(frontmatter(agent) as unknown as YamlDoc).nodes) if (node.kind === 'leaf') fm[id] = { disposition: 'retained' };
  return { body, frontmatter: fm };
}

const unitHash = (anchor: string) => hashText(partition(BODY).units.find((u) => u.anchor === anchor)!.text);
const overlayText = () => `## @unit #regrounded @ sha256:${hex(unitHash('#regrounded'))}\n## Regrounded\n\nConsumer-grounded operative text.\n`;

function inputsFor(agents: string[]): ConsumerProfileInputs {
  const inputs: ConsumerProfileInputs = { dispositions: {}, overlays: {}, missing: [] };
  for (const a of agents) {
    inputs.dispositions[a] = rows(a);
    inputs.overlays[a] = parseOverlay(overlayText(), `canonical/profiles/consumer/${a}.overlay.md`); // parsed, with pins (Task 15.2: derive() checks them)
  }
  return inputs;
}

const ADAPTERS = (): TargetAdapter[] => [new CcAdapter(FIELD_DISPOSITIONS), new KiroAdapter(FIELD_DISPOSITIONS)];

let tmp: string;
beforeEach(() => {
  tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'consumer-rendering-'));
});
afterEach(() => fs.rmSync(tmp, { recursive: true, force: true }));
const write = (rel: string, text: string) => {
  fs.mkdirSync(path.dirname(path.join(tmp, rel)), { recursive: true });
  fs.writeFileSync(path.join(tmp, rel), text);
};

describe('generateConsumerRendering (Task 15.1)', () => {
  it('emits every agent through every adapter, remapped under canonical/_consumer-output/<target>/', () => {
    const outputs = generateConsumerRendering([resolvedFor('twin')], ADAPTERS(), inputsFor(['twin']));
    expect(outputs.map((o) => o.path).sort()).toEqual([
      'canonical/_consumer-output/_canonical/agents/twin.md', // derive() — once, not per target (Task 15.2)
      'canonical/_consumer-output/cc/.claude/agents/twin.md',
      'canonical/_consumer-output/kiro/.kiro/agents/twin-prompt.md',
      'canonical/_consumer-output/kiro/.kiro/agents/twin.json',
    ]);
    for (const out of outputs.filter((o) => o.path.endsWith('.md'))) {
      expect(out.content).toContain('Consumer-grounded operative text.');
      expect(out.content).not.toContain('Steward-only operative text.');
      const total = checkAttributionTotality(out.attribution!, out.content.split('\n').length - 1);
      expect(total.errors).toEqual([]);
      expect(out.attribution!.spans.filter((s) => s.source === 'canonical/agents/twin.md#regrounded').map((s) => s.op)).toEqual(['render']);
    }
  });

  it('an unauthored profile (no agent has dispositions) emits nothing — the declared pre-15.4 state', () => {
    expect(generateConsumerRendering([resolvedFor('twin'), resolvedFor('pair')], ADAPTERS(), inputsFor([]))).toEqual([]);
  });

  it('a partial population refuses, naming the agents with no dispositions file', () => {
    expect(() => generateConsumerRendering([resolvedFor('twin'), resolvedFor('pair')], ADAPTERS(), inputsFor(['twin']))).toThrow(
      partialConsumerPopulationMessage(['pair'], ['twin'])
    );
    expect(partialConsumerPopulationMessage(['pair'], ['twin'])).toBe(
      'generateConsumerRendering: the consumer profile covers 1 ledger agent(s) (twin) but not pair — every ledger agent carries canonical/profiles/consumer/<agent>.dispositions.yaml, or none does yet; refusing to render a partial population (design C12; Req 9.5)'
    );
  });
});

describe('loadConsumerInputs (Task 15.1)', () => {
  const dispYaml = (agent: string, regrounded = 're-pointed, destination: "#regrounded"') =>
    [
      `source: canonical/agents/${agent}.md`,
      'body:',
      ...partition(BODY).units.map((u) => `  "${u.anchor}": { disposition: ${u.anchor === '#regrounded' ? regrounded : 'retained'} }`),
      '',
    ].join('\n');

  it('reads each agent’s committed dispositions and overlay; an agent without a file is listed missing', () => {
    write('canonical/profiles/consumer/twin.dispositions.yaml', dispYaml('twin'));
    write('canonical/profiles/consumer/twin.overlay.md', overlayText());
    const inputs = loadConsumerInputs(tmp, ['twin', 'pair']);
    expect(inputs.missing).toEqual(['pair']);
    expect(inputs.dispositions.twin.body?.['#regrounded']).toEqual({ disposition: 're-pointed', destination: '#regrounded' });
    expect(inputs.overlays.twin.units['#regrounded'].text).toBe('## Regrounded\n\nConsumer-grounded operative text.\n'); // parsed, pin kept (Task 15.2)
  });

  it('a schema-invalid dispositions file throws (13.1), never loads half a profile', () => {
    write('canonical/profiles/consumer/twin.dispositions.yaml', dispYaml('twin', 'repo-bound-in-entirety'));
    expect(() => loadConsumerInputs(tmp, ['twin'])).toThrow('not a disposition. Under R5');
  });
});

describe('guardedRoots() guards the consumer rendering (C12)', () => {
  it('lists canonical/_consumer-output — one root over _canonical/, <target>/agents and <target>/identity', () => {
    expect(CONSUMER_OUTPUT_ROOT).toBe('canonical/_consumer-output');
    expect(guardedRoots()).toContain(CONSUMER_OUTPUT_ROOT);
    expect(guardedRoots(REPO_ROOT)).toContain(CONSUMER_OUTPUT_ROOT);
  });
});

describe('the rendered hash, read back from the committed rendering (Task 15.1)', () => {
  it('names a row by its 10.S span source', () => {
    expect(rowSpanSource('canonical/agents/twin.md', 'body', '#regrounded')).toBe('canonical/agents/twin.md#regrounded');
    expect(rowSpanSource('canonical/agents/twin.md', 'frontmatter', 'writeScope[a/**]')).toBe('canonical/agents/twin.md#frontmatter:writeScope[a/**]');
    expect(rowSpanSource('canonical/shared/shared-catalog.yaml', 'members', 'find-docs-discovery')).toBe(
      'canonical/shared/shared-catalog.yaml#find-docs-discovery'
    );
  });

  it('reads every target’s pieces of a row; the hash moves with any target’s rendering and not with an unrelated row', () => {
    expect(readConsumerSpans(tmp)).toBeUndefined(); // no rendering at all
    writeOutputs(tmp, generateConsumerRendering([resolvedFor('twin')], ADAPTERS(), inputsFor(['twin'])));
    const spans = readConsumerSpans(tmp)!;
    const pieces = spans.get('canonical/agents/twin.md#regrounded')!;
    expect(pieces.map((p) => p.artifact)).toEqual([
      'canonical/_consumer-output/_canonical/agents/twin.md', // the derived canonical's body span (Task 15.2)
      'canonical/_consumer-output/cc/.claude/agents/twin.md',
      'canonical/_consumer-output/kiro/.kiro/agents/twin-prompt.md',
    ]);
    for (const p of pieces) expect(p.text).toBe('## Regrounded\n\nConsumer-grounded operative text.\n');
    const before = renderedHashOf(spans, 'canonical/agents/twin.md#regrounded');
    const kept = renderedHashOf(spans, 'canonical/agents/twin.md#kept');

    const kiroPrompt = path.join(tmp, 'canonical/_consumer-output/kiro/.kiro/agents/twin-prompt.md');
    fs.writeFileSync(kiroPrompt, fs.readFileSync(kiroPrompt, 'utf8').replace('Consumer-grounded operative text.', 'Consumer-grounded operative text!'));
    const after = readConsumerSpans(tmp)!;
    expect(renderedHashOf(after, 'canonical/agents/twin.md#regrounded')).not.toBe(before);
    expect(renderedHashOf(after, 'canonical/agents/twin.md#kept')).toBe(kept);
    // A row that renders nothing hashes the empty list — defined, not "unverifiable".
    expect(renderedHashOf(after, 'canonical/agents/twin.md#absent')).toBe(renderedHashOf(new Map(), 'x'));
  });
});

describe('the freshness sweep over a signed row, reading the committed rendering (Task 15.1)', () => {
  // The stale-unit fixture's charter + record + note, re-pinned fresh; then a signed dispositions
  // row and a hand-built committed rendering of `#alpha` under _consumer-output.
  const FIXTURE = path.join(REPO_ROOT, 'tools/agent-generator/__fixtures__/stale-unit/canonical');
  const STALE = 'sha256:13d322a0e44fa36b7bee580b15fe2134c24783138fb2d6087302b8d8a39c6ad4';
  const FRESH = 'sha256:c15f9d64f00a7acd9c6c200a49b0891f09bd34e439e68d703877cfe076ecac2c';
  const CHARTER = 'canonical/agents/fixture.md';
  const DISP = 'canonical/profiles/consumer/fixture.dispositions.yaml';
  const EVIDENCE = 'canonical/profiles/consumer/signatures/fixture.md';
  const ARTIFACT = 'canonical/_consumer-output/cc/.claude/agents/fixture.md';
  const RENDERED = '## Alpha\n\nRe-grounded: run your repo’s suite before completion.\n';

  const tracked = (): Set<string> => {
    const out = new Set<string>();
    const walk = (d: string) => {
      for (const e of fs.readdirSync(d, { withFileTypes: true })) {
        const p = path.join(d, e.name);
        if (e.isDirectory()) walk(p);
        else out.add(path.relative(tmp, p).split(path.sep).join('/'));
      }
    };
    walk(tmp);
    return out;
  };
  const sweep = () => runFreshnessSweep(tmp, { tracked: tracked() });
  const checks = () => sweep().findings.map((f) => f.check);
  const render = (text: string) => {
    write(ARTIFACT, text);
    write(`${ARTIFACT}.attribution.json`, JSON.stringify({ artifact: '.claude/agents/fixture.md', spans: [{ lines: [1, text.split('\n').length - 1], op: 'render', source: `${CHARTER}#alpha` }] }));
  };
  const signed = (renderedHash: string, evidence = `${EVIDENCE}#alpha`) =>
    write(
      DISP,
      `source: ${CHARTER}\nbody:\n  "#alpha":\n    disposition: re-pointed\n    destination: "#alpha"\n    signature:\n      signer: fixture\n      canonicalHash: ${FRESH}\n      renderedHash: ${renderedHash}\n      assent: { surviving: [fixture-run-suite] }\n      evidence: ${evidence}\nfrontmatter:\n  agent: { disposition: retained }\n`
    );
  const evidenceNote = (heading = '`#alpha`', signer = 'fixture') => write(EVIDENCE, `# Signatures — fixture\n\n## ${heading}\n\nsigner: ${signer}\n`);

  beforeEach(() => {
    fs.cpSync(FIXTURE, path.join(tmp, 'canonical'), { recursive: true });
    for (const rel of ['canonical/operative-sets/fixture.yaml', 'canonical/profiles/consumer/confirmations/fixture.md']) {
      write(rel, fs.readFileSync(path.join(tmp, rel), 'utf8').replace(STALE, FRESH));
    }
  });

  const currentRendered = () => renderedHashOf(readConsumerSpans(tmp)!, `${CHARTER}#alpha`);

  it('a signature pinned to the committed rendering is clean; editing the rendering stales it', () => {
    render(RENDERED);
    signed(currentRendered());
    evidenceNote();
    expect(sweep().findings).toEqual([]);
    render(RENDERED.replace('suite', 'tests'));
    expect(checks()).toEqual(['stale-signature']);
  });

  it('with no consumer rendering at all the signature is signature-unverifiable (fail-closed)', () => {
    signed(FRESH);
    evidenceNote();
    expect(checks()).toEqual(['signature-unverifiable']);
  });

  it('evidence: the note must name the row, sit under the profile dir, exist, carry one block, and match the signer', () => {
    render(RENDERED);
    const h = currentRendered();
    const evidenceMessages = () => sweep().findings.filter((f) => f.check === 'signature-evidence').map((f) => f.message);
    signed(h, `${EVIDENCE}#beta`);
    evidenceNote();
    expect(evidenceMessages()).toEqual([`signature on #alpha in ${DISP}: evidence fragment "#beta" does not name the row (want "#alpha")`]);
    signed(h, 'docs/elsewhere.md#alpha');
    expect(evidenceMessages()).toEqual([
      `signature on #alpha in ${DISP}: evidence note docs/elsewhere.md is not under canonical/profiles/consumer/ — the sweep guards only that dir`,
    ]);
    signed(h, 'canonical/profiles/consumer/signatures/nobody.md#alpha');
    expect(evidenceMessages()).toEqual([`signature on #alpha in ${DISP}: evidence note canonical/profiles/consumer/signatures/nobody.md does not exist`]);
    signed(h);
    evidenceNote('`#gamma`');
    expect(evidenceMessages()).toEqual([`signature on #alpha in ${DISP}: evidence resolves to 0 note blocks in ${EVIDENCE} (want 1)`]);
    evidenceNote('`#alpha`', 'stacy');
    expect(evidenceMessages()).toEqual([`signature on #alpha in ${DISP}: evidence note signer stacy ≠ signature signer fixture`]);
  });

  it('a profile file nothing reaches is profile-unreferenced — the glob claims only what the sweep reads', () => {
    write('canonical/profiles/consumer/stray.md', 'notes\n');
    expect(sweep().findings.map((f) => [f.check, f.message])).toEqual([
      [
        'profile-unreferenced',
        'profile file canonical/profiles/consumer/stray.md is reached by no operative-set record, dispositions file, overlay or signature evidence — the sweep cannot check it; reference it or remove it',
      ],
    ]);
  });
});
