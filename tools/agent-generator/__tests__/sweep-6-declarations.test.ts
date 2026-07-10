/**
 * Sweep 6 (phantom-route / declaration-diff) tests — Spec 122 Task 7.2.
 * Prove-it-bites: induce a cue naming a nonexistent tool (Req 19 AC2).
 */

import { runSweep6 } from '../sweeps/sweep-6-declarations';
import type { ToolRegistry } from '../registry';
import type { CanonicalAgentDoc } from '../schema';

const registry: ToolRegistry = {
  servers: [
    {
      name: 'designerpunk-docs',
      entry: 'dist/mcp/docs-mcp.js',
      tools: [{ name: 'find_docs', description: 'x' }, { name: 'get_section', description: 'x' }],
    },
    {
      name: 'designerpunk-application',
      entry: 'dist/mcp/application-mcp.js',
      tools: [{ name: 'find_components', description: 'x' }],
    },
    { name: 'designerpunk-product', entry: 'dist/mcp/product-mcp.js', tools: [] },
  ],
} as unknown as ToolRegistry;

function docWithCue(agent: string, tool: string, subset?: Record<string, string[]>): CanonicalAgentDoc {
  return {
    frontmatter: {
      agent,
      agentType: 'consumer',
      description: 'x',
      routes: { cues: [{ when: 'w', tool, mcp: 'docs' }] },
      toolSubset: subset as never,
    },
    body: '',
  };
}

describe('sweep 6 — phantom-route / declaration-diff', () => {
  it('PROVE-IT-BITES: a cue naming a nonexistent tool is a PHANTOM ROUTE FAIL', () => {
    const report = runSweep6({
      docs: [docWithCue('leonardo', 'get_documentation_map_v2')],
      sharedCatalog: [],
      registry,
    });
    expect(report.pass).toBe(false);
    const fail = report.findings.find((f) => f.verdict === 'FAIL');
    expect(fail?.observed).toContain('PHANTOM ROUTE');
    expect(fail?.observed).toContain('get_documentation_map_v2');
    expect(fail?.agent).toBe('leonardo');
  });

  it('shared-catalog tool-cue members are cue sources too', () => {
    const report = runSweep6({
      docs: [],
      sharedCatalog: [{ id: 'x', kind: 'tool-cue', tool: 'phantom_tool', mcp: 'docs', owner: 'thurgood' }],
      registry,
    });
    expect(report.pass).toBe(false);
    expect(report.findings[0].path).toBe('sharedCatalog[0]');
  });

  it('declarations-diff: an un-routed declared tool is an ADJUDICATE routed to the declaring owner', () => {
    const report = runSweep6({
      docs: [docWithCue('ada', 'find_docs', { 'designerpunk-docs': ['find_docs', 'get_section'] })],
      sharedCatalog: [],
      registry,
    });
    expect(report.pass).toBe(false);
    const adj = report.findings.find((f) => f.verdict === 'ADJUDICATE');
    expect(adj?.path).toBe('designerpunk-application/find_components');
    expect(adj?.owner).toBe('declaring-owner:designerpunk-application');
  });

  it('the deferred-discoverable set exempts a tool from the un-routed diff', () => {
    const report = runSweep6({
      docs: [docWithCue('ada', 'find_docs', { 'designerpunk-docs': ['find_docs', 'get_section'] })],
      sharedCatalog: [],
      registry,
      deferredDiscoverable: ['find_components'],
    });
    expect(report.pass).toBe(true);
  });

  it('a recorded adjudication covers an un-routed delta', () => {
    const report = runSweep6({
      docs: [docWithCue('ada', 'find_docs', { 'designerpunk-docs': ['find_docs', 'get_section'] })],
      sharedCatalog: [],
      registry,
      adjudications: [
        {
          sweep: '122-sweep-6-declarations',
          key: 'un-routed/designerpunk-application/find_components',
          ruling: 'design-change',
          owner: 'lina',
          record: 'test-record',
        },
      ],
    });
    expect(report.pass).toBe(true);
  });

  it('with ZERO canonical agents the declarations-diff records a vacuous PASS (no ADJUDICATE storm), while cue checks still run', () => {
    const report = runSweep6({
      docs: [],
      sharedCatalog: [{ id: 'x', kind: 'tool-cue', tool: 'find_docs', mcp: 'docs' }],
      registry,
    });
    expect(report.pass).toBe(true);
    expect(report.findings.find((f) => f.verdict === 'INFO')?.path).toBe('declarations-diff');
  });
});
