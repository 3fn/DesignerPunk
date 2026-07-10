/**
 * Sweep 4 (ambient set-difference) tests — Spec 122 Task 7.1.
 * The prove-it-bites is Data's adjudicated `start-up-tasks` drop (b7c3c148): the machinery
 * re-run against the PRE-correction designed set shows the delta (ADJUDICATE, owner-routed);
 * the post-union live shape shows no-delta (Req 19 AC2).
 */

import { runSweep4, parseDesignedBlocks } from '../sweeps/sweep-4-ambient';
import type { AmbientManifest } from '../compose';

const ALWAYS = ['personal-note', 'ai-collaboration-principles', 'start-up-tasks'];

function manifest(agent: string, ids: string[]): AmbientManifest {
  return {
    agent,
    target: 'kiro',
    members: ids.map((id) => ({ id, class: 'governance-as-law', lane: 'per-agent' as const, delivery: 'file' as const })),
  };
}

describe('sweep 4 — ambient set-difference', () => {
  it('passes when generated == designed ∪ always-set (the post-union Data shape: no delta)', () => {
    const report = runSweep4({
      designedBlocks: { data: ['platform-implementation-guidelines', 'token-quick-reference', 'start-up-tasks'] },
      alwaysSetIds: ALWAYS,
      manifests: [
        manifest('data', [
          ...ALWAYS,
          'platform-implementation-guidelines',
          'token-quick-reference',
        ]),
      ],
    });
    expect(report.pass).toBe(true);
    expect(report.findings.filter((f) => f.verdict === 'ADJUDICATE')).toHaveLength(0);
  });

  it('PROVE-IT-BITES (b7c3c148 pre-correction shape): a designed member absent from generated is an owner-routed ADJUDICATE', () => {
    // Pre-union reading: the generator built from the per-agent block alone, so
    // start-up-tasks (all-agents inclusion:always) silently dropped from Data's ambient.
    const report = runSweep4({
      designedBlocks: { data: ['platform-implementation-guidelines', 'token-quick-reference', 'start-up-tasks'] },
      alwaysSetIds: [], // the pre-gap-#7 world: no union rule
      manifests: [manifest('data', ['platform-implementation-guidelines', 'token-quick-reference'])],
    });
    expect(report.pass).toBe(false);
    const delta = report.findings.find((f) => f.verdict === 'ADJUDICATE');
    expect(delta?.agent).toBe('data');
    expect(delta?.owner).toBe('data');
    expect(delta?.observed).toContain('start-up-tasks');
    expect(delta?.adjudicationKey).toBe('data/designed-minus-generated/start-up-tasks');
  });

  it('a recorded adjudication covers the delta (visible, no longer failing)', () => {
    const report = runSweep4({
      designedBlocks: { data: ['start-up-tasks'] },
      alwaysSetIds: [],
      manifests: [manifest('data', [])],
      adjudications: [
        {
          sweep: '122-sweep-4-ambient',
          key: 'data/designed-minus-generated/start-up-tasks',
          ruling: 'assessment-gap',
          owner: 'data',
          record: 'b7c3c148',
        },
      ],
    });
    expect(report.pass).toBe(true);
    const covered = report.findings.find((f) => f.adjudicatedBy);
    expect(covered?.adjudicatedBy?.record).toBe('b7c3c148');
  });

  it('reports BOTH directions: a generated member in no design block is also a delta', () => {
    const report = runSweep4({
      designedBlocks: { ada: ['token-governance'] },
      alwaysSetIds: ALWAYS,
      manifests: [manifest('ada', [...ALWAYS, 'token-governance', 'sneaky-extra-doc'])],
    });
    expect(report.pass).toBe(false);
    const delta = report.findings.find((f) => f.verdict === 'ADJUDICATE');
    expect(delta?.adjudicationKey).toBe('ada/generated-minus-designed/sneaky-extra-doc');
  });

  it('fails an emitted agent with no design block at all', () => {
    const report = runSweep4({
      designedBlocks: {},
      alwaysSetIds: ALWAYS,
      manifests: [manifest('ghost', ALWAYS)],
    });
    expect(report.pass).toBe(false);
    expect(report.findings[0].verdict).toBe('FAIL');
  });

  it('Req 10 AC4 set-inclusion: a designed App-MCP cue missing from the generated catalog FAILS', () => {
    const report = runSweep4({
      designedBlocks: { leonardo: [] },
      alwaysSetIds: ALWAYS,
      manifests: [manifest('leonardo', ALWAYS)],
      cueInclusion: [
        {
          agent: 'leonardo',
          cues: [
            { when: 'selecting components', tool: 'find_components', mcp: 'application' },
            { when: 'discovering docs', tool: 'find_docs', mcp: 'docs' }, // docs-MCP cue: not in AC4 scope
          ],
          catalogText: 'catalog without the tool name',
        },
      ],
    });
    expect(report.pass).toBe(false);
    const fail = report.findings.find((f) => f.verdict === 'FAIL');
    expect(fail?.observed).toContain('find_components');
    expect(report.findings.filter((f) => f.observed.includes('find_docs'))).toHaveLength(0);
  });

  it('records a visible vacuous PASS on zero manifests (pre-cutover)', () => {
    const report = runSweep4({ designedBlocks: {}, alwaysSetIds: ALWAYS, manifests: [] });
    expect(report.pass).toBe(true);
    expect(report.findings[0].verdict).toBe('INFO');
  });

  describe('parseDesignedBlocks (the Task-9 block parser)', () => {
    const DOC = [
      '## Per-agent designs (`PerAgentAmbientDesign[]`)',
      '',
      '### 1. Ada — token pipeline (`agentType: owner`)',
      '',
      '| ref | class | rationale | status119A |',
      '|---|---|---|---|',
      '| `personal-note` | formative | Universal. | `locked-always` |',
      '| `token-governance` | governance-as-law | Law. | `locked-always` |',
      '| `manifest:ada-token-manifest` (DESIGN: **none-standing**) | ground-truth-manifest | Directive. | `design-only` |',
      '| `catalog:ada` (DESIGN) | capability-catalog | Directive. | `design-only` |',
      '',
      '### 7. Data — Android platform (`agentType: consumer`)',
      '',
      '| ref | class | rationale | status119A |',
      '|---|---|---|---|',
      '| `start-up-tasks` | governance-as-law | Law. | `locked-always` |',
      '',
      '## Coverage matrix (Req 14 AC1)',
      '| agent | stuff |',
      '| `not-a-member` | outside any agent block |',
    ].join('\n');

    it('extracts doc refs per agent, excluding manifest:/catalog: directive rows and post-region tables', () => {
      const blocks = parseDesignedBlocks(DOC);
      expect(blocks.ada).toEqual(['personal-note', 'token-governance']);
      expect(blocks.data).toEqual(['start-up-tasks']);
      expect(Object.keys(blocks)).toEqual(['ada', 'data']);
    });

    it('parses the LIVE design doc: 8 agent blocks, Data includes start-up-tasks (b7c3c148)', () => {
      const fs = require('fs');
      const path = require('path');
      const live = fs.readFileSync(
        path.resolve(
          __dirname,
          '..', '..', '..',
          '.kiro/specs/119-A-steering-relocation-serving-contract/per-agent-ambient-design.md'
        ),
        'utf8'
      );
      const blocks = parseDesignedBlocks(live);
      expect(Object.keys(blocks)).toHaveLength(8);
      expect(blocks.data).toContain('start-up-tasks');
      expect(blocks.ada).toContain('token-governance');
    });
  });
});
