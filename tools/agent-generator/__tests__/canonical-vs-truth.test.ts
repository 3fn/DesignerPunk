/**
 * @category evergreen
 * @purpose Verify the canonical-vs-truth check (C7) — Spec 122 Task 6.3. Each of the five
 *          classes + the D-A3 knowledgeBases assertion is exercised with at least one PASS and
 *          one FAIL fixture, plus the design's named corner cases: (a) case-insensitive
 *          mustContain + multi-claim per-claim naming; (c) BOTH legs incl. the L1 server-grant
 *          FAIL; (d) empty-string consumer-repo cue (D-A5); (e) the structural declared-keyed
 *          carve-out; (D-A3) zero-match with/without expected-empty. Also: adjudicator grouping
 *          and clean=true on an all-pass run. NO subprocess is spawned — the CorpusClient,
 *          ToolRegistry, fs facade, and glob resolver are all fakes.
 */

import {
  runTruthCheck,
  formatReport,
  normalizeForMustContain,
  parseScriptName,
  type TruthCheckInputs,
  type EmittedGrantSurface,
  type FsFacade,
  type GlobResolver,
  type Finding,
} from '../canonical-vs-truth';
import type { CorpusClient, CorpusToolResult } from '../resolve';
import type { ToolRegistry } from '../registry';
import type { CanonicalAgentDoc, AgentFrontmatter } from '../schema';

// ============================================================================
// Fakes
// ============================================================================

/**
 * A fake CorpusClient keyed on `id` → { summaryError, sections: { heading → text } }.
 * A missing id → get_document_summary isError. A missing heading → get_section isError.
 * A present heading returns its text (which class (a)'s mustContain/pattern evaluate against).
 */
class FakeCorpus implements CorpusClient {
  constructor(
    private readonly docs: Record<string, { sections: Record<string, string> } | 'missing'>
  ) {}

  async getDocumentSummary(id: string): Promise<CorpusToolResult> {
    const doc = this.docs[id];
    if (!doc || doc === 'missing') return { isError: true, text: `FileNotFound: ${id}` };
    return { isError: false, text: `summary of ${id}` };
  }

  async getSection(id: string, heading: string): Promise<CorpusToolResult> {
    const doc = this.docs[id];
    if (!doc || doc === 'missing') return { isError: true, text: `FileNotFound: ${id}` };
    const text = doc.sections[heading];
    if (text === undefined) return { isError: true, text: `SectionNotFound: ${heading}` };
    return { isError: false, text };
  }

  async listToolNames(): Promise<string[]> {
    return [];
  }
  async close(): Promise<void> {
    /* no-op */
  }
}

/** Build a minimal ToolRegistry from server → tool-name[] declarations. */
function fakeRegistry(servers: Record<string, string[]>): ToolRegistry {
  return {
    servers: Object.entries(servers).map(([name, tools]) => ({
      name,
      entry: `${name}/dist/index.js`,
      tools: tools.map((t) => ({ name: t, description: '', inputSchemaHash: 'sha256:0' })),
    })),
  };
}

/** A fake fs facade over an in-memory {path → {exists, executable}} map. */
function fakeFs(entries: Record<string, { exists: boolean; executable: boolean }>): FsFacade {
  const lookup = (p: string) => {
    // Match by suffix so callers can use repo-relative script paths without knowing repoRoot.
    const key = Object.keys(entries).find((k) => p.endsWith(k));
    return key ? entries[key] : undefined;
  };
  return {
    exists: (p) => lookup(p)?.exists ?? false,
    isExecutable: (p) => lookup(p)?.executable ?? false,
  };
}

/** A fake glob resolver over a {glob → matches[]} map. Unlisted glob → zero matches. */
function fakeGlob(map: Record<string, string[]>): GlobResolver {
  return (glob) => map[glob] ?? [];
}

/** Minimal frontmatter builder — fills required identity fields, spreads the rest. */
function doc(partial: Partial<AgentFrontmatter> & { agent: string }): CanonicalAgentDoc {
  const frontmatter: AgentFrontmatter = {
    agentType: 'owner',
    description: `${partial.agent} test agent`,
    ...partial,
  };
  return { frontmatter, body: '' };
}

/** Default inputs with everything empty/passing; individual tests override slices. */
function baseInputs(overrides: Partial<TruthCheckInputs>): TruthCheckInputs {
  return {
    docs: [],
    corpus: new FakeCorpus({}),
    registry: fakeRegistry({}),
    cutoverLedger: [],
    grantSurfaces: [],
    scripts: {},
    repoRoot: '/repo',
    fs: fakeFs({}),
    resolveGlob: fakeGlob({}),
    ...overrides,
  };
}

const findingsFor = (report: { findings: Finding[] }, cls: string) =>
  report.findings.filter((f) => f.class === cls);

// ============================================================================
// normalization (documents the class (a) normalization contract)
// ============================================================================

describe('normalizeForMustContain', () => {
  it('lower-cases and collapses whitespace runs (incl. newlines) to single spaces', () => {
    expect(normalizeForMustContain('  Explicit   APPROVAL\n\trequired ')).toBe(
      'explicit approval required'
    );
  });
});

describe('parseScriptName', () => {
  it('parses "npm run X", "npm run X -- ...", and bare script names; rejects paths', () => {
    expect(parseScriptName('npm run test:agent-generator')).toBe('test:agent-generator');
    expect(parseScriptName('npm run test -- --watch')).toBe('test');
    expect(parseScriptName('build')).toBe('build');
    expect(parseScriptName('scripts/foo.sh')).toBeUndefined();
  });

  it('parses npm BUILTIN aliases (`npm test` ≡ `npm run test` — the fixture-caught live form, Task 8.1)', () => {
    expect(parseScriptName('npm test')).toBe('test');
    expect(parseScriptName('npm test -- --watch')).toBe('test');
    expect(parseScriptName('npm start')).toBe('start');
    // `npm testx` is NOT a builtin alias — falls through to unparseable.
    expect(parseScriptName('npm testx')).toBeUndefined();
  });
});

// ============================================================================
// (a) governance-integrity
// ============================================================================

describe('(a) governance-integrity', () => {
  const corpus = new FakeCorpus({
    'token-governance': {
      sections: {
        'Token Selection Matrix': 'Creating ANY token always requires EXPLICIT approval from a human.',
      },
    },
  });

  it('PASS: id resolves, heading exists, mustContain literal present', async () => {
    const report = await runTruthCheck(
      baseInputs({
        corpus,
        docs: [
          doc({
            agent: 'ada',
            ambient: {
              governanceAsLaw: [
                {
                  id: 'token-governance',
                  owner: 'ada',
                  assert: [
                    {
                      claim: 'token-creation-requires-approval',
                      section: 'Token Selection Matrix',
                      mustContain: ['explicit approval'],
                    },
                  ],
                },
              ],
            },
          }),
        ],
      })
    );
    expect(findingsFor(report, 'governance-integrity')).toHaveLength(0);
    expect(report.clean).toBe(true);
  });

  it('FAIL (case-insensitive documented): a mustContain matching only case-insensitively PASSES', async () => {
    // The literal differs from the source only in CASE — proves normalization is case-insensitive.
    const report = await runTruthCheck(
      baseInputs({
        corpus,
        docs: [
          doc({
            agent: 'ada',
            ambient: {
              governanceAsLaw: [
                {
                  id: 'token-governance',
                  owner: 'ada',
                  assert: [
                    {
                      claim: 'approval-token',
                      section: 'Token Selection Matrix',
                      mustContain: ['EXPLICIT Approval'], // differs only in case
                    },
                  ],
                },
              ],
            },
          }),
        ],
      })
    );
    expect(findingsFor(report, 'governance-integrity')).toHaveLength(0);
  });

  it('FAIL: id does not resolve → finding names the claim, adjudicator = owner', async () => {
    const report = await runTruthCheck(
      baseInputs({
        corpus,
        docs: [
          doc({
            agent: 'ada',
            ambient: {
              governanceAsLaw: [
                {
                  id: 'nonexistent-doc',
                  owner: 'ada',
                  assert: [{ claim: 'c1', section: 'Whatever', mustContain: ['x'] }],
                },
              ],
            },
          }),
        ],
      })
    );
    const fs = findingsFor(report, 'governance-integrity');
    expect(fs).toHaveLength(1);
    expect(fs[0].claim).toBe('c1');
    expect(fs[0].adjudicator).toBe('ada');
    expect(fs[0].truthObserved).toMatch(/did not resolve/);
  });

  it('FAIL: heading missing → per-claim finding', async () => {
    const report = await runTruthCheck(
      baseInputs({
        corpus,
        docs: [
          doc({
            agent: 'ada',
            ambient: {
              governanceAsLaw: [
                {
                  id: 'token-governance',
                  owner: 'ada',
                  assert: [{ claim: 'c1', section: 'No Such Heading', mustContain: ['x'] }],
                },
              ],
            },
          }),
        ],
      })
    );
    const fs = findingsFor(report, 'governance-integrity');
    expect(fs).toHaveLength(1);
    expect(fs[0].truthObserved).toMatch(/heading .* was not found/);
  });

  it('FAIL: multi-claim entry where exactly ONE claim fails — the finding NAMES it (A-D3)', async () => {
    const report = await runTruthCheck(
      baseInputs({
        corpus,
        docs: [
          doc({
            agent: 'ada',
            ambient: {
              governanceAsLaw: [
                {
                  id: 'token-governance',
                  owner: 'ada',
                  assert: [
                    {
                      claim: 'good-claim',
                      section: 'Token Selection Matrix',
                      mustContain: ['explicit approval'], // present → passes
                    },
                    {
                      claim: 'moved-claim',
                      section: 'Token Selection Matrix',
                      mustContain: ['this literal was removed from the doc'], // absent → fails
                    },
                  ],
                },
              ],
            },
          }),
        ],
      })
    );
    const fs = findingsFor(report, 'governance-integrity');
    expect(fs).toHaveLength(1);
    expect(fs[0].claim).toBe('moved-claim');
    expect(fs[0].truthObserved).toMatch(/does not contain required literal/);
  });

  it('PASS: a pattern regex that matches the section text', async () => {
    const report = await runTruthCheck(
      baseInputs({
        corpus,
        docs: [
          doc({
            agent: 'ada',
            ambient: {
              governanceAsLaw: [
                {
                  id: 'token-governance',
                  owner: 'ada',
                  assert: [
                    {
                      claim: 'requires-word',
                      section: 'Token Selection Matrix',
                      pattern: 'requires\\s+\\w+\\s+approval',
                      assertsComment: 'token creation requires human approval',
                    },
                  ],
                },
              ],
            },
          }),
        ],
      })
    );
    expect(findingsFor(report, 'governance-integrity')).toHaveLength(0);
  });
});

// ============================================================================
// (b) agent-routes
// ============================================================================

describe('(b) agent-routes', () => {
  it('PASS: a "resolves" target that IS in the cutover ledger', async () => {
    const report = await runTruthCheck(
      baseInputs({
        cutoverLedger: ['lina'],
        docs: [
          doc({
            agent: 'ada',
            routes: { agents: [{ target: 'lina', when: 'component q', disposition: 'resolves' }] },
          }),
        ],
      })
    );
    expect(findingsFor(report, 'agent-routes')).toHaveLength(0);
  });

  it('PASS: a "not-yet-ported" target NOT in the ledger is exempt (LE1)', async () => {
    const report = await runTruthCheck(
      baseInputs({
        cutoverLedger: [],
        docs: [
          doc({
            agent: 'ada',
            routes: { agents: [{ target: 'lina', when: 'component q', disposition: 'not-yet-ported' }] },
          }),
        ],
      })
    );
    expect(findingsFor(report, 'agent-routes')).toHaveLength(0);
  });

  it('FAIL: a "not-yet-ported" target that IS in the ledger is a STALE escape hatch (OB-8, Task 18 prove-it-bites)', async () => {
    const report = await runTruthCheck(
      baseInputs({
        cutoverLedger: ['lina'],
        docs: [
          doc({
            agent: 'ada',
            routes: { agents: [{ target: 'lina', when: 'component q', disposition: 'not-yet-ported' }] },
          }),
        ],
      })
    );
    const fs = findingsFor(report, 'agent-routes');
    expect(fs).toHaveLength(1);
    expect(fs[0].adjudicator).toBe('ada');
    expect(fs[0].verdict).toBe('FAIL');
    expect(fs[0].truthObserved).toMatch(/STALE/);
  });

  it('FAIL: a "resolves" target NOT in the ledger → adjudicator = routing agent seat', async () => {
    const report = await runTruthCheck(
      baseInputs({
        cutoverLedger: [],
        docs: [
          doc({
            agent: 'ada',
            routes: { agents: [{ target: 'lina', when: 'component q', disposition: 'resolves' }] },
          }),
        ],
      })
    );
    const fs = findingsFor(report, 'agent-routes');
    expect(fs).toHaveLength(1);
    expect(fs[0].adjudicator).toBe('ada');
    expect(fs[0].verdict).toBe('FAIL');
  });
});

// ============================================================================
// (c) per-runtime grants — BOTH legs
// ============================================================================

describe('(c) per-runtime grants', () => {
  it('PASS: cue tool ∈ subset AND every subset server ∈ granted', async () => {
    const grantSurfaces: EmittedGrantSurface[] = [
      { agent: 'lina', target: 'cc', grantedServers: ['designerpunk-application'] },
    ];
    const report = await runTruthCheck(
      baseInputs({
        grantSurfaces,
        docs: [
          doc({
            agent: 'lina',
            toolSubset: { 'designerpunk-application': ['get_component_full'] },
            routes: {
              cues: [{ when: 'component q', tool: 'get_component_full', mcp: 'application' }],
            },
          }),
        ],
      })
    );
    expect(findingsFor(report, 'per-runtime-grants')).toHaveLength(0);
  });

  it('FAIL leg 1 (membership): a cue tool NOT in the subset', async () => {
    const report = await runTruthCheck(
      baseInputs({
        grantSurfaces: [{ agent: 'lina', target: 'cc', grantedServers: ['designerpunk-application'] }],
        docs: [
          doc({
            agent: 'lina',
            toolSubset: { 'designerpunk-application': ['get_component_full'] },
            routes: {
              cues: [{ when: 'x', tool: 'get_token_details', mcp: 'application' }], // not in subset
            },
          }),
        ],
      })
    );
    const fs = findingsFor(report, 'per-runtime-grants').filter((f) =>
      f.truthObserved.includes('is NOT in this agent')
    );
    expect(fs).toHaveLength(1);
    expect(fs[0].adjudicator).toBe('lina'); // membership = seat
    expect(fs[0].verdict).toBe('FAIL');
  });

  it('FAIL leg 2 (L1 server-grant): subset names a server ABSENT from the emitted grant list', async () => {
    // The exact lina.json bug: subset routes to application tools onto a config with NO
    // application grant. This is a FIRST-CLASS FAIL (verdict FAIL, not ADJUDICATE).
    const report = await runTruthCheck(
      baseInputs({
        grantSurfaces: [{ agent: 'lina', target: 'cc', grantedServers: ['designerpunk-docs'] }], // no application!
        docs: [
          doc({
            agent: 'lina',
            toolSubset: { 'designerpunk-application': ['get_component_full'] },
          }),
        ],
      })
    );
    const fs = findingsFor(report, 'per-runtime-grants').filter((f) => f.path.startsWith('toolSubset.'));
    expect(fs).toHaveLength(1);
    expect(fs[0].verdict).toBe('FAIL'); // L1: first-class FAIL, asserted per the prompt
    expect(fs[0].truthObserved).toMatch(/ABSENT from the emitted cc grant list/);
    expect(fs[0].adjudicator).toBe('declaring-owner:designerpunk-application');
  });
});

// ============================================================================
// (d) command-string currency
// ============================================================================

describe('(d) command-string currency', () => {
  it('PASS: this-repo package.json command whose script name IS present', async () => {
    const report = await runTruthCheck(
      baseInputs({
        scripts: { 'test:agent-generator': 'jest ...' },
        docs: [
          doc({
            agent: 'ada',
            commands: [
              {
                name: 'agent-gen tests',
                cmd: 'npm run test:agent-generator',
                runContext: 'this-repo',
                source: 'package.json',
              },
            ],
          }),
        ],
      })
    );
    expect(findingsFor(report, 'command-string-currency')).toHaveLength(0);
  });

  it('FAIL: this-repo package.json command whose script name is MISSING', async () => {
    const report = await runTruthCheck(
      baseInputs({
        scripts: {},
        docs: [
          doc({
            agent: 'ada',
            commands: [
              { name: 'x', cmd: 'npm run does-not-exist', runContext: 'this-repo', source: 'package.json' },
            ],
          }),
        ],
      })
    );
    const fs = findingsFor(report, 'command-string-currency');
    expect(fs).toHaveLength(1);
    expect(fs[0].adjudicator).toBe('ada');
    expect(fs[0].truthObserved).toMatch(/NOT present in package.json/);
  });

  it('PASS: script-path command that exists + is executable', async () => {
    const report = await runTruthCheck(
      baseInputs({
        fs: fakeFs({ '.kiro/hooks/complete-task.sh': { exists: true, executable: true } }),
        docs: [
          doc({
            agent: 'ada',
            commands: [
              { name: 'complete', cmd: './.kiro/hooks/complete-task.sh "x"', runContext: 'this-repo' },
            ],
          }),
        ],
      })
    );
    expect(findingsFor(report, 'command-string-currency')).toHaveLength(0);
  });

  it('FAIL: script-path command that exists but is NOT executable', async () => {
    const report = await runTruthCheck(
      baseInputs({
        fs: fakeFs({ 'scripts/foo.sh': { exists: true, executable: false } }),
        docs: [
          doc({
            agent: 'ada',
            commands: [{ name: 'foo', cmd: 'scripts/foo.sh', runContext: 'this-repo' }],
          }),
        ],
      })
    );
    const fs = findingsFor(report, 'command-string-currency');
    expect(fs).toHaveLength(1);
    expect(fs[0].truthObserved).toMatch(/NOT executable/);
  });

  it('PASS: consumer-repo entry with a non-empty cue annotation', async () => {
    const report = await runTruthCheck(
      baseInputs({
        docs: [
          doc({
            agent: 'data',
            commands: [
              {
                name: 'gradle build',
                cmd: './gradlew assembleDebug',
                runContext: 'consumer-repo',
                cue: 'run from the product app android/ dir',
              },
            ],
          }),
        ],
      })
    );
    expect(findingsFor(report, 'command-string-currency')).toHaveLength(0);
  });

  it('FAIL (D-A5): consumer-repo GAP entry with an EMPTY-STRING cue FAILS like missing', async () => {
    const report = await runTruthCheck(
      baseInputs({
        docs: [
          doc({
            agent: 'data',
            commands: [
              {
                class: 'android-build',
                runContext: 'consumer-repo',
                gap: '', // empty string — D-A5: FAILs identically to a missing annotation
              },
            ],
          }),
        ],
      })
    );
    const fs = findingsFor(report, 'command-string-currency');
    expect(fs).toHaveLength(1);
    expect(fs[0].truthObserved).toMatch(/empty-string FAILs like missing/i);
    expect(fs[0].adjudicator).toBe('data');
  });
});

// ============================================================================
// (e) live-tool
// ============================================================================

describe('(e) live-tool', () => {
  it('PASS: a tool DECLARED in the registry passes — the carve-out is STRUCTURAL', async () => {
    // The registry is declaration-keyed (built from tools/list, never the index). This fixture
    // asserts a comment-documented invariant, NOT index data: nothing about index state is
    // provided or knowable here, yet a declared tool passes — because index state cannot enter
    // a declaration-keyed check. (canonical-vs-truth.ts checkLiveTool documents this invariant.)
    const registry = fakeRegistry({ 'designerpunk-application': ['get_component_full'] });
    const report = await runTruthCheck(
      baseInputs({
        registry,
        docs: [
          doc({
            agent: 'lina',
            toolSubset: { 'designerpunk-application': ['get_component_full'] },
            routes: { cues: [{ when: 'x', tool: 'get_component_full', mcp: 'application' }] },
          }),
        ],
      })
    );
    expect(findingsFor(report, 'live-tool')).toHaveLength(0);
  });

  it('FAIL: a cue tool NOT declared by the running server → adjudicator = thurgood', async () => {
    const registry = fakeRegistry({ 'designerpunk-application': ['get_component_full'] });
    const report = await runTruthCheck(
      baseInputs({
        registry,
        docs: [
          doc({
            agent: 'lina',
            toolSubset: { 'designerpunk-application': ['get_component_full'] },
            routes: { cues: [{ when: 'x', tool: 'phantom_tool', mcp: 'application' }] },
          }),
        ],
      })
    );
    const fs = findingsFor(report, 'live-tool').filter((f) => f.path.startsWith('routes.cues'));
    expect(fs).toHaveLength(1);
    expect(fs[0].adjudicator).toBe('thurgood');
  });

  it('FAIL: a toolSubset tool NOT declared', async () => {
    const registry = fakeRegistry({ 'designerpunk-application': ['get_component_full'] });
    const report = await runTruthCheck(
      baseInputs({
        registry,
        docs: [
          doc({
            agent: 'lina',
            toolSubset: { 'designerpunk-application': ['get_component_full', 'nonexistent'] },
          }),
        ],
      })
    );
    const fs = findingsFor(report, 'live-tool').filter((f) => f.path.startsWith('toolSubset'));
    expect(fs).toHaveLength(1);
    expect(fs[0].truthObserved).toMatch(/nonexistent/);
  });
});

// ============================================================================
// (D-A3) knowledgeBases glob currency
// ============================================================================

describe('(D-A3) knowledgeBases glob currency', () => {
  it('PASS: a glob resolving to ≥1 match', async () => {
    const report = await runTruthCheck(
      baseInputs({
        resolveGlob: fakeGlob({ 'src/components/**': ['src/components/Button.ts'] }),
        docs: [
          doc({
            agent: 'lina',
            knowledgeBases: [{ name: 'components', globs: ['src/components/**'] }],
          }),
        ],
      })
    );
    expect(findingsFor(report, 'knowledge-bases')).toHaveLength(0);
  });

  it('FAIL: a zero-match glob WITHOUT an expected-empty annotation → adjudicator = thurgood', async () => {
    const report = await runTruthCheck(
      baseInputs({
        resolveGlob: fakeGlob({}), // every glob → zero matches
        docs: [
          doc({
            agent: 'lina',
            knowledgeBases: [{ name: 'stale', globs: ['nonexistent/**'] }],
          }),
        ],
      })
    );
    const fs = findingsFor(report, 'knowledge-bases');
    expect(fs).toHaveLength(1);
    expect(fs[0].adjudicator).toBe('thurgood');
    expect(fs[0].truthObserved).toMatch(/ZERO matches/);
  });

  it('PASS: a zero-match glob WITH an expected-empty annotation (read via safe cast)', async () => {
    const report = await runTruthCheck(
      baseInputs({
        resolveGlob: fakeGlob({}),
        docs: [
          doc({
            agent: 'lina',
            // `expected-empty` is not yet in the schema type — set via a cast, mirroring the
            // production safe-cast read (schema formalization is a one-line follow-up).
            knowledgeBases: [
              {
                name: 'intentionally-empty',
                globs: ['product/**'],
                'expected-empty': 'no product screens exist yet',
              } as unknown as { name: string; globs: string[] },
            ],
          }),
        ],
      })
    );
    expect(findingsFor(report, 'knowledge-bases')).toHaveLength(0);
  });
});

// ============================================================================
// Report shape: grouping + clean
// ============================================================================

describe('report shape', () => {
  it('clean=true on an all-pass run (empty docs)', async () => {
    const report = await runTruthCheck(baseInputs({ docs: [] }));
    expect(report.clean).toBe(true);
    expect(report.findings).toHaveLength(0);
    expect(formatReport(report)).toMatch(/clean/);
  });

  it('groups findings by adjudicator; formatReport renders per-adjudicator sections', async () => {
    // One (b) finding (adjudicator=ada) + one (e) finding (adjudicator=thurgood).
    const report = await runTruthCheck(
      baseInputs({
        cutoverLedger: [],
        registry: fakeRegistry({ 'designerpunk-application': [] }),
        docs: [
          doc({
            agent: 'ada',
            routes: {
              agents: [{ target: 'lina', when: 'x', disposition: 'resolves' }], // (b) FAIL → ada
              cues: [{ when: 'x', tool: 'phantom', mcp: 'application' }], // (e) FAIL → thurgood
            },
            toolSubset: { 'designerpunk-application': ['phantom'] }, // (e) FAIL → thurgood too
          }),
        ],
      })
    );
    expect(report.clean).toBe(false);
    expect(Object.keys(report.byAdjudicator).sort()).toEqual(
      expect.arrayContaining(['ada', 'thurgood'])
    );
    expect(report.byAdjudicator['ada'].length).toBeGreaterThanOrEqual(1);
    expect(report.byAdjudicator['thurgood'].length).toBeGreaterThanOrEqual(1);

    const text = formatReport(report);
    expect(text).toMatch(/ADJUDICATOR: ada/);
    expect(text).toMatch(/ADJUDICATOR: thurgood/);
    expect(text).toMatch(/truth observed/);
    expect(text).toMatch(/canonical claim/);
  });
});
