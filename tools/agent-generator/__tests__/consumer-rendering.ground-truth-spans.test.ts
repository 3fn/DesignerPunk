/**
 * consumer-rendering.ground-truth-spans.test.ts — VALVE-1 per-trim spans
 * (`.kiro/issues/2026-09-30-valve-1-per-trim-spans.md`; Req 11.5.6, design C17).
 *
 * VALVE 1 carries a signature forward until its unit's canonical source OR its rendered output
 * changes. A `groundTruthManifest` row's rendered half was unobservable: both adapters rendered
 * the whole Ground truth section as ONE span sourced `…#frontmatter:ambient.groundTruthManifest`,
 * which names no row, so every verdict and trim row hashed the empty piece list.
 *
 * Under the consumer profile the section is now one span per signed row: the heading is the
 * container (`ambient.groundTruthManifest`), the verdict's line(s) are the verdict row's, and each
 * trim is its member's. The bytes are unchanged, and the steward keeps the single span.
 *
 * What this asserts, over a twin agent rendered through BOTH adapters under the consumer profile:
 *   - each row's span exists, in every target, with exactly its own text;
 *   - the section's bytes equal the steward's single-span form;
 *   - editing one trim's rendered text moves that trim's rendered hash and no other row's
 *     (the property the issue's Verify bullet names; the bite against the single-span form is
 *     recorded in the fixing commit);
 *   - the catalog-is-manifest leg gives the verdict row the faithfulness cue.
 */

import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { type AdapterContext, type FieldDispositionTable, type TargetAdapter } from '../adapters/index';
import { CcAdapter } from '../adapters/cc';
import { KiroAdapter } from '../adapters/kiro';
import { deriveGroundTruthDirective } from '../compose';
import { readConsumerSpans, renderedHashOf } from '../derive';
import { generateConsumerRendering, writeOutputs, type ConsumerProfileInputs, type ResolvedForEmission } from '../generate';
import { entryTree, partition } from '../partition';
import { renderGroundTruthFaithfulness, renderGroundTruthTrims } from '../render';
import type { AgentFrontmatter, CanonicalAgentDoc, GroundTruthManifest } from '../schema';
import type { Dispositions, DispositionRow } from '../spans';
import type { YamlDoc } from '../frontmatter';
import type { ResolvedAgent } from '../pipeline';

const REPO_ROOT = path.resolve(__dirname, '..', '..', '..');
const FIELD_DISPOSITIONS: FieldDispositionTable = { configFields: [], runtimeToolRefs: [] };
const BODY = ['# Twin', '', '## Kept', '', 'Kept verbatim.', ''].join('\n');
const CHARTER = 'canonical/agents/twin.md';
const CC = 'canonical/_consumer-output/cc/.claude/agents/twin.md';
const KIRO = 'canonical/_consumer-output/kiro/.kiro/agents/twin-prompt.md';

const TRIMS: GroundTruthManifest = {
  verdict: 'none-trim-stale-snapshots',
  trims: [
    { artifact: 'dist/alpha.txt', fires: 'unconditional', cue: { negative: 'do NOT read the alpha snapshot dist/alpha.txt', tool: 'find_docs', mcp: 'docs' } },
    { artifact: 'dist/beta.txt', fires: 'unconditional', cue: { negative: 'do NOT read the beta snapshot dist/beta.txt', tool: 'find_docs', mcp: 'docs' } },
  ],
};
const CATALOG: GroundTruthManifest = { verdict: 'catalog-is-manifest' };

const row = (key: string) => `${CHARTER}#frontmatter:${key}`;
const VERDICT = row('ambient.groundTruthManifest.verdict');
const ALPHA = row('ambient.groundTruthManifest.trims[dist/alpha.txt]');
const BETA = row('ambient.groundTruthManifest.trims[dist/beta.txt]');
const CONTAINER = row('ambient.groundTruthManifest');

function frontmatter(groundTruthManifest: GroundTruthManifest): AgentFrontmatter {
  return {
    agent: 'twin',
    agentType: 'consumer',
    description: 'A twin agent for the per-trim span test.',
    toolSubset: { 'designerpunk-docs': ['find_docs'], 'designerpunk-application': ['get_component_full', 'get_component_health'] },
    ambient: { groundTruthManifest },
  } as AgentFrontmatter;
}

function resolvedFor(doc: CanonicalAgentDoc): ResolvedForEmission {
  const groundTruth = deriveGroundTruthDirective(doc.frontmatter.ambient?.groundTruthManifest);
  const resolved = {
    agent: 'twin',
    doc,
    resolutions: [],
    unresolved: [],
    ambientManifests: { cc: { agent: 'twin', target: 'cc', members: [], groundTruth }, kiro: { agent: 'twin', target: 'kiro', members: [], groundTruth } },
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

/** Every body unit and frontmatter leaf retained — the trims and the verdict included. */
function inputs(fm: AgentFrontmatter): ConsumerProfileInputs {
  const body: Record<string, DispositionRow> = {};
  for (const u of partition(BODY).units) body[u.anchor] = { disposition: 'retained' };
  const leaves: Record<string, DispositionRow> = {};
  for (const [id, node] of entryTree(fm as unknown as YamlDoc).nodes) if (node.kind === 'leaf') leaves[id] = { disposition: 'retained' };
  const dispositions: Dispositions = { body, frontmatter: leaves };
  return {
    dispositions: { twin: dispositions as never },
    overlays: {},
    identity: {},
    shared: { dispositions: { source: 'canonical/shared/shared-catalog.yaml', members: {} } as never },
    missing: [],
    authored: true,
  };
}

const ADAPTERS = (): TargetAdapter[] => [new CcAdapter(FIELD_DISPOSITIONS), new KiroAdapter(FIELD_DISPOSITIONS)];

async function renderTwin(manifest: GroundTruthManifest): Promise<void> {
  const fm = frontmatter(manifest);
  const doc: CanonicalAgentDoc = { frontmatter: fm, body: BODY, sourcePath: CHARTER };
  const outputs = await generateConsumerRendering({
    agents: [doc],
    identity: [],
    sharedCatalogText: 'members: []\n',
    inputs: inputs(fm),
    adapters: ADAPTERS(),
    resolve: async (derived) => resolvedFor(derived),
    docIdToPath: {},
    alwaysSetIds: [],
  });
  writeOutputs(tmp, outputs);
}

const read = (rel: string) => fs.readFileSync(path.join(tmp, rel), 'utf8');

let tmp: string;
beforeEach(() => {
  tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'ground-truth-spans-'));
});
afterEach(() => fs.rmSync(tmp, { recursive: true, force: true }));

describe('VALVE-1 — the trims leg renders one span per signed row (consumer profile)', () => {
  it('the verdict, each trim and the container each own their lines, in every target', async () => {
    await renderTwin(TRIMS);
    const spans = readConsumerSpans(tmp)!;
    for (const target of [CC, KIRO]) {
      const of = (source: string) => (spans.get(source) ?? []).filter((p) => p.artifact === target).map((p) => p.text);
      expect(of(CONTAINER)).toEqual(['## Ground truth\n\n']);
      expect(of(VERDICT)).toHaveLength(1);
      expect(of(VERDICT)[0]).toMatch(/^Your token ground truth is served LIVE by MCP .* query the live tool instead:\n$/);
      expect(of(ALPHA)).toHaveLength(1);
      expect(of(ALPHA)[0]).toMatch(/^- do NOT read the alpha snapshot dist\/alpha\.txt — use `.*find_docs` \(docs MCP\)\n$/);
      expect(of(BETA)).toHaveLength(1);
      expect(of(BETA)[0]).toMatch(/^- do NOT read the beta snapshot dist\/beta\.txt — use `.*find_docs` \(docs MCP\)\n\n$/);
    }
  });

  it("the section's bytes equal the steward's single-span form", async () => {
    await renderTwin(TRIMS);
    const directive = deriveGroundTruthDirective(TRIMS)!;
    expect(read(CC)).toContain(`## Ground truth\n\n${renderGroundTruthTrims(directive, (t) => `mcp__designerpunk-docs__${t}`)}\n\n`);
    expect(read(KIRO)).toContain(`## Ground truth\n\n${renderGroundTruthTrims(directive, (t) => t)}\n\n`);
  });

  it("editing one trim's rendered text moves that trim's hash and no other row's", async () => {
    await renderTwin(TRIMS);
    const before = readConsumerSpans(tmp)!;
    const hashes = (spans: typeof before) => ({ verdict: renderedHashOf(spans, VERDICT), alpha: renderedHashOf(spans, ALPHA), beta: renderedHashOf(spans, BETA) });
    const was = hashes(before);
    // Every row observes a rendering: none of them is the empty-piece hash any more.
    const empty = renderedHashOf(new Map(), 'x');
    for (const h of Object.values(was)) expect(h).not.toBe(empty);
    expect(new Set(Object.values(was)).size).toBe(3);

    fs.writeFileSync(path.join(tmp, KIRO), read(KIRO).replace('the alpha snapshot', 'the ALPHA snapshot'));
    const now = hashes(readConsumerSpans(tmp)!);
    expect(now.alpha).not.toBe(was.alpha);
    expect(now.beta).toBe(was.beta);
    expect(now.verdict).toBe(was.verdict);
  });
});

describe('VALVE-1 — the catalog-is-manifest leg gives the verdict row the faithfulness cue', () => {
  it('the verdict row owns the cue; the heading is the container; the bytes match the steward form', async () => {
    await renderTwin(CATALOG);
    const spans = readConsumerSpans(tmp)!;
    const directive = deriveGroundTruthDirective(CATALOG)!;
    const cue = renderGroundTruthFaithfulness(directive, (t) => `mcp__designerpunk-application__${t}`)!;
    expect((spans.get(VERDICT) ?? []).filter((p) => p.artifact === CC).map((p) => p.text)).toEqual([`${cue}\n\n`]);
    expect((spans.get(CONTAINER) ?? []).filter((p) => p.artifact === CC).map((p) => p.text)).toEqual(['## Ground truth\n\n']);
    expect(read(CC)).toContain(`## Ground truth\n\n${cue}\n\n`);
  });
});
