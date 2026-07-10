/**
 * @category evergreen
 * @purpose Verify the pipeline spine wiring (C3): validate() composes the schema rules with
 *          the WORKFLOW_RULES anti-duplication guard, and resolveAgent() resolves corpus
 *          refs (routes.docs + governanceAsLaw section refs) via the corpus resolver while
 *          composing per-target ambient manifests that include the always-set (P3).
 */

import { validate, resolveAgent, type ResolveContext } from '../pipeline';
import { CorpusResolver, type CorpusClient, type CorpusToolResult } from '../resolve';
import type { AgentFrontmatter, CanonicalAgentDoc } from '../schema';
import type { AlwaysSetMember } from '../compose';
import type { WorkflowRule } from '../workflow-rules-guard';

const ALWAYS_SET: AlwaysSetMember[] = [
  { id: 'personal-note', class: 'formative', delivery: { cc: 'file', kiro: 'file' } },
  { id: 'core-goals', class: 'formative', delivery: { cc: 'file', kiro: 'file' } },
];

function doc(frontmatter: Partial<AgentFrontmatter>, body = '## Identity\n\nClean prose.\n'): CanonicalAgentDoc {
  return {
    frontmatter: { agent: 'data', agentType: 'consumer', description: 'x', ...frontmatter },
    body,
    sourcePath: 'canonical/agents/data.md',
  };
}

describe('validate() — schema rules + WORKFLOW_RULES anti-duplication', () => {
  it('passes a clean doc', () => {
    const result = validate(doc({}), ['personal-note', 'core-goals']);
    expect(result.valid).toBe(true);
    expect(result.schemaErrors).toEqual([]);
    expect(result.duplicationErrors).toEqual([]);
  });

  it('flags a body that hand-restates an encoded WORKFLOW_RULE (Req 4 AC3)', () => {
    const result = validate(
      doc({}, '## Notes\n\nRemember the summary-first rule when you query.\n'),
      ['personal-note']
    );
    expect(result.valid).toBe(false);
    expect(result.duplicationErrors.length).toBeGreaterThan(0);
  });

  it('flags a schema-rule violation (rule 4: per-product without authoredPerProduct)', () => {
    const result = validate(
      doc({ commands: [{ class: 'ios-build', runContext: 'per-product', gap: 'no in-repo iOS build' }] }),
      ['personal-note']
    );
    expect(result.valid).toBe(false);
    expect(result.schemaErrors.some((e) => e.rule === 4)).toBe(true);
  });

  it('rule 1 per-doc: an unknown top-level frontmatter key fails, naming it (Task 1 open item 1)', () => {
    const bad = doc({});
    (bad.frontmatter as unknown as Record<string, unknown>).bogusUnregisteredKey = true;
    const result = validate(bad, ['personal-note']);
    expect(result.valid).toBe(false);
    const rule1 = result.schemaErrors.filter((e) => e.rule === 1);
    expect(rule1.length).toBeGreaterThan(0);
    expect(rule1.some((e) => (e.path ?? e.message).includes('bogusUnregisteredKey'))).toBe(true);
  });

  it('rule 1 per-doc: a doc using only known frontmatter keys does not false-positive', () => {
    const result = validate(
      doc({ routes: { docs: [] }, commands: [], skills: [], toolSubset: {}, writeScope: [] }),
      ['personal-note', 'core-goals']
    );
    expect(result.schemaErrors.filter((e) => e.rule === 1)).toEqual([]);
  });
});

/** A fake corpus: a set of resolvable "id::heading" section keys; everything else isError. */
class FakeCorpus implements CorpusClient {
  constructor(private readonly sections: Set<string>, private readonly docs: Set<string>) {}
  async getDocumentSummary(id: string): Promise<CorpusToolResult> {
    return { isError: !this.docs.has(id), text: '' };
  }
  async getSection(id: string, heading: string): Promise<CorpusToolResult> {
    return { isError: !this.sections.has(`${id}::${heading}`), text: '' };
  }
  async listToolNames(): Promise<string[]> {
    return [];
  }
  async close(): Promise<void> {}
}

function ctxWith(sections: string[], docs: string[]): ResolveContext {
  return {
    corpus: new CorpusResolver(new FakeCorpus(new Set(sections), new Set(docs))),
    alwaysSet: ALWAYS_SET,
    workflowRules: [] as WorkflowRule[],
  };
}

describe('resolveAgent() — corpus refs + ambient composition', () => {
  const agentDoc = doc({
    routes: {
      docs: [
        {
          id: 'r1',
          doc: 'rosetta-system-architecture',
          section: 'Module-Resolution Contract (Spec 118)',
          when: 'touching runtime-TS',
        },
      ],
    },
    ambient: {
      governanceAsLaw: [
        {
          id: 'token-governance',
          owner: 'ada',
          assert: [{ claim: 'component-approval', section: 'Token Selection Matrix', mustContain: ['approval'] }],
        },
      ],
    },
  });

  it('resolves refs that exist and flags refs that do not, naming the leg', async () => {
    const ctx = ctxWith(
      ['rosetta-system-architecture::Module-Resolution Contract (Spec 118)'], // section resolves
      ['rosetta-system-architecture', 'token-governance'] // both docs resolve
    );
    const resolved = await resolveAgent(agentDoc, ctx);

    const docRoute = resolved.resolutions.find((r) => r.kind === 'doc-route');
    expect(docRoute?.resolved).toBe(true);

    // token-governance doc resolves but its heading does not -> unresolved, detail names the heading
    const lawRef = resolved.resolutions.find((r) => r.kind === 'law-assert');
    expect(lawRef?.resolved).toBe(false);
    expect(lawRef?.detail).toContain('Token Selection Matrix');
    expect(resolved.unresolved).toHaveLength(1);
  });

  it('composes ambient manifests for both targets, each including the always-set (P3)', async () => {
    const ctx = ctxWith([], ['token-governance']);
    const resolved = await resolveAgent(agentDoc, ctx);

    for (const target of ['cc', 'kiro'] as const) {
      const manifest = resolved.ambientManifests[target];
      expect(manifest.target).toBe(target);
      for (const m of ALWAYS_SET) {
        expect(manifest.members.some((x) => x.id === m.id && x.lane === 'shared')).toBe(true);
      }
      // the per-agent law ref appears on the per-agent lane
      expect(manifest.members.some((x) => x.id === 'token-governance' && x.lane === 'per-agent')).toBe(true);
    }
  });
});
