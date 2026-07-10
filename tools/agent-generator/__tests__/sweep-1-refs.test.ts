/**
 * Sweep 1 (reference-resolution) tests — Spec 122 Task 7.1.
 * Includes the prove-it-bites: an induced bogus doc id FAILS the sweep (Req 19 AC2).
 */

import type { CorpusClient, CorpusToolResult } from '../resolve';
import { runSweep1, RETIRED_NAMES, SWEEP_1 } from '../sweeps/sweep-1-refs';
import type { CanonicalAgentDoc } from '../schema';
import type { SharedCatalogMember } from '../adapters/index';

const ok: CorpusToolResult = { isError: false, text: 'section text' };
const err: CorpusToolResult = { isError: true, text: 'FileNotFound' };

/** Fake corpus: `known` doc ids resolve; `headings` maps "id#heading" → exists. */
function fakeCorpus(known: string[], headings: Record<string, boolean> = {}): CorpusClient {
  return {
    async getDocumentSummary(id: string) {
      return known.includes(id) ? ok : err;
    },
    async getSection(id: string, heading: string) {
      const key = `${id}#${heading}`;
      if (!known.includes(id)) return err;
      return (headings[key] ?? true) ? ok : err;
    },
    async listToolNames() {
      return [];
    },
    async close() {},
  };
}

function docWithLaw(agent: string, id: string, section: string): CanonicalAgentDoc {
  return {
    frontmatter: {
      agent,
      agentType: 'owner',
      description: 'x',
      ambient: {
        governanceAsLaw: [
          { id, owner: agent, assert: [{ claim: 'c1', section, mustContain: ['x'] }] },
        ],
      },
    },
    body: '',
  };
}

const repoFiles: Record<string, string> = {
  '/repo/.kiro/docs/ballots/README.md':
    '# Ballot Measures\n\n## The Ratification Protocol (record-first) — approved by Peter, 2026-07-05\n\ntext\n',
};
const readFake = (abs: string) => repoFiles[abs];

const interimMember: SharedCatalogMember = {
  id: 'record-first-ratification',
  kind: 'governance-rule',
  owner: 'thurgood',
  source: '.kiro/docs/ballots/README.md § "The Ratification Protocol (record-first)"',
  crossRef:
    '.kiro/docs/ballots/README.md § "The Ratification Protocol (record-first) — approved by Peter, 2026-07-05"',
  crossRefStatus: 'interim',
  crossRefResolveWhen: "125-B's classification-map artifact exists",
};

describe('sweep 1 — reference-resolution', () => {
  it('passes on resolving law refs + repo-file refs, and enumerates the interim crossRef as INFO', async () => {
    const report = await runSweep1({
      docs: [docWithLaw('ada', 'token-governance', 'Token Usage Governance')],
      corpus: fakeCorpus(['token-governance']),
      sharedCatalog: [interimMember],
      scanFiles: {},
      repoRoot: '/repo',
      readFile: readFake,
    });
    expect(report.sweep).toBe(SWEEP_1);
    expect(report.pass).toBe(true);
    const info = report.findings.filter((f) => f.verdict === 'INFO');
    expect(info).toHaveLength(1);
    expect(info[0].observed).toContain('INTERIM crossRef target');
    expect(info[0].observed).toContain('125-B');
  });

  it('PROVE-IT-BITES: an induced bogus doc id FAILS, naming the id and the owner', async () => {
    const report = await runSweep1({
      docs: [docWithLaw('ada', 'bogus-doc-id-does-not-exist', 'Some Heading')],
      corpus: fakeCorpus(['token-governance']),
      sharedCatalog: [],
      scanFiles: {},
      repoRoot: '/repo',
      readFile: readFake,
    });
    expect(report.pass).toBe(false);
    const fail = report.findings.find((f) => f.verdict === 'FAIL');
    expect(fail?.observed).toContain('bogus-doc-id-does-not-exist');
    expect(fail?.owner).toBe('ada');
  });

  it('fails when the id resolves but the verbatim heading does not exist', async () => {
    const report = await runSweep1({
      docs: [docWithLaw('ada', 'token-governance', 'Renamed Heading')],
      corpus: fakeCorpus(['token-governance'], { 'token-governance#Renamed Heading': false }),
      sharedCatalog: [],
      scanFiles: {},
      repoRoot: '/repo',
      readFile: readFake,
    });
    expect(report.pass).toBe(false);
    expect(report.findings[0].observed).toContain('Renamed Heading');
  });

  it('fails an unresolvable routes.docs section ref', async () => {
    const doc: CanonicalAgentDoc = {
      frontmatter: {
        agent: 'lina',
        agentType: 'owner',
        description: 'x',
        routes: { docs: [{ id: 'r1', doc: 'gone-doc', section: 'H', when: 'w' }] },
      },
      body: '',
    };
    const report = await runSweep1({
      docs: [doc],
      corpus: fakeCorpus([]),
      sharedCatalog: [],
      scanFiles: {},
      repoRoot: '/repo',
      readFile: readFake,
    });
    expect(report.pass).toBe(false);
    expect(report.findings[0].path).toBe('routes.docs[0]');
  });

  it('fails a shared-catalog repo-file ref whose file or heading is missing', async () => {
    const badMember: SharedCatalogMember = {
      id: 'x',
      kind: 'governance-rule',
      source: '.kiro/docs/ballots/README.md § "A Heading That Is Not There"',
    };
    const report = await runSweep1({
      docs: [],
      corpus: fakeCorpus([]),
      sharedCatalog: [badMember],
      scanFiles: {},
      repoRoot: '/repo',
      readFile: readFake,
    });
    expect(report.pass).toBe(false);
    expect(report.findings[0].observed).toContain('A Heading That Is Not There');
  });

  describe('retired-name scan', () => {
    it('fails on an unannotated retired mention, naming file:line', async () => {
      const report = await runSweep1({
        docs: [],
        corpus: fakeCorpus([]),
        sharedCatalog: [],
        scanFiles: { 'canonical/agents/x.md': 'use ts-node to run it\n' },
        repoRoot: '/repo',
        readFile: readFake,
      });
      expect(report.pass).toBe(false);
      expect(report.findings[0].path).toBe('canonical/agents/x.md:1');
      expect(report.findings[0].observed).toContain('ts-node');
    });

    it('exempts a mention annotated retired-mention-ok on the same or preceding line', async () => {
      const report = await runSweep1({
        docs: [],
        corpus: fakeCorpus([]),
        sharedCatalog: [],
        scanFiles: {
          'canonical/shared/c.yaml':
            '# retired-mention-ok(negation cue)\ncue: "get_documentation_map is removed"\nother: "fine — retired-mention-ok(inline) ts-node is retired"\n',
        },
        repoRoot: '/repo',
        readFile: readFake,
      });
      expect(report.pass).toBe(true);
    });

    it('covers both retired names', () => {
      expect(RETIRED_NAMES).toEqual(['get_documentation_map', 'ts-node']);
    });
  });
});
