/**
 * @category evergreen
 * @purpose Verify the CC target adapter (C4/Task 5.2) against a fixture ResolvedAgent:
 *          namespaced tool expansion + fail-loud toolRef; pass-through body verbatim;
 *          per-agent ambient inline embeds (C11 lane 2) vs shared-lane non-embed + missing-
 *          embed throw; workflow-rule gating; the facet-7 write-scope note; run-context
 *          annotation rendering; dropped Kiro-only fields (keyboardShortcut) absent from
 *          output; agentSpawn rendered as a pre-flight note; shared-catalog rendering;
 *          attribution totality (P2); determinism; and the CLAUDE.md always-layer (C11
 *          lane 1) including its missing-steeringIdToPath throw.
 */

import { CcAdapter } from '../adapters/cc';
import type { AdapterContext, FieldDispositionTable, SharedCatalogMember } from '../adapters/index';
import type { AlwaysSetMember } from '../compose';
import type { ResolvedAgent } from '../pipeline';
import type { AgentFrontmatter, CanonicalAgentDoc } from '../schema';
import type { WorkflowRule } from '../workflow-rules-guard';
import type { SkillsMap } from '../skills';
import { checkAttributionTotality } from '../attribution';

// ============================================================================
// Fixtures
// ============================================================================

const FAKE_WORKFLOW_RULE: WorkflowRule = {
  id: 'summary-first',
  severity: 'hard',
  appliesToTools: ['find_docs'],
  audience: 'all-agents',
  statement: 'Prefer get_document_summary before get_document_full.',
  rationale: 'token budget',
  requirements: ['Req 4'],
};

const ALWAYS_SET: AlwaysSetMember[] = [
  { id: 'personal-note', class: 'formative', delivery: { cc: 'file', kiro: 'file' } },
  { id: 'core-goals', class: 'formative', delivery: { cc: 'file', kiro: 'file' } },
];

const SHARED_CATALOG: SharedCatalogMember[] = [
  {
    id: 'record-first-ratification',
    kind: 'governance-rule',
    owner: 'thurgood',
    statement:
      'Before applying a ratified governance change, verify the committed ballot/record says RATIFIED.',
  },
  {
    id: 'find-docs-discovery',
    kind: 'tool-cue',
    tool: 'find_docs',
    mcp: 'docs',
    owner: 'thurgood',
    cue: 'use find_docs to discover docs by concept/keyword',
  },
];

const DISPOSITIONS: FieldDispositionTable = { configFields: [], runtimeToolRefs: [] };

function frontmatter(overrides: Partial<AgentFrontmatter> = {}): AgentFrontmatter {
  return {
    agent: 'fixture-consumer',
    agentType: 'consumer',
    description: 'A fixture consumer agent for adapter tests.',
    toolSubset: {
      'designerpunk-docs': ['find_docs', 'get_section'],
      'designerpunk-application': ['get_component_full'],
    },
    routes: {
      docs: [{ id: 'route-1', doc: 'platform-implementation-guidelines', section: 'Overview', when: 'starting a component task' }],
      cues: [{ when: 'need a component', tool: 'get_component_full', mcp: 'application' }],
    },
    commands: [
      { name: 'unit-tests', cmd: 'npm test', runContext: 'this-repo', cue: 'run the unit suite' },
      { class: 'no-gradlew', runContext: 'consumer-repo', gap: 'no gradlew in this repo — build runs from the product app', cue: 'building the android app' },
    ],
    knowledgeBases: [{ name: 'component-source', globs: ['src/components/**/*.tsx'] }],
    writeScope: ['.kiro/specs/**', 'docs/specs/**'],
    kiro: {
      keyboardShortcut: 'ctrl+shift+x',
      agentSpawn: [{ command: 'git status --porcelain', timeout_ms: 5000 }],
    },
    ...overrides,
  };
}

function resolvedAgent(overrides: Partial<AgentFrontmatter> = {}, bodyOverride?: string): ResolvedAgent {
  const fm = frontmatter(overrides);
  const doc: CanonicalAgentDoc = {
    frontmatter: fm,
    body: bodyOverride ?? '# Fixture Consumer\n\nThis is the verbatim pass-through body.\n',
    sourcePath: 'canonical/agents/fixture-consumer.md',
  };
  return {
    agent: fm.agent,
    doc,
    resolutions: [],
    unresolved: [],
    ambientManifests: {
      cc: {
        agent: fm.agent,
        target: 'cc',
        members: [
          { id: 'personal-note', class: 'formative', lane: 'shared', delivery: 'file' },
          { id: 'core-goals', class: 'formative', lane: 'shared', delivery: 'file' },
          { id: 'platform-implementation-guidelines', class: 'governance-as-law', lane: 'per-agent', delivery: 'file' },
        ],
      },
      kiro: {
        agent: fm.agent,
        target: 'kiro',
        members: [],
      },
    },
  };
}

function ctx(overrides: Partial<AdapterContext> = {}): AdapterContext {
  return {
    workflowRules: [FAKE_WORKFLOW_RULE],
    skillsMap: { rows: [] } as SkillsMap,
    alwaysSet: ALWAYS_SET,
    dispositions: DISPOSITIONS,
    sharedCatalog: SHARED_CATALOG,
    repoRoot: process.cwd(),
    embeds: { 'platform-implementation-guidelines': 'Resolved section text for platform-implementation-guidelines.' },
    steeringIdToPath: {
      'personal-note': '.kiro/steering/personal-note.md',
      'core-goals': '.kiro/steering/core-goals.md',
    },
    ...overrides,
  };
}

function lineCount(text: string): number {
  if (text.length === 0) return 0;
  const t = text.endsWith('\n') ? text.slice(0, -1) : text;
  return t.length === 0 ? 1 : t.split('\n').length;
}

// ============================================================================
// toolRef
// ============================================================================

describe('CcAdapter.toolRef', () => {
  const adapter = new CcAdapter(DISPOSITIONS);

  it('returns the namespaced form for a tool declared in the subset', () => {
    expect(adapter.toolRef({ 'designerpunk-docs': ['find_docs'] }, 'find_docs')).toBe('mcp__designerpunk-docs__find_docs');
  });

  it('throws loud for a tool absent from every subset server', () => {
    expect(() => adapter.toolRef({ 'designerpunk-docs': ['find_docs'] }, 'get_token_details')).toThrow(
      /not declared by any server/
    );
  });
});

// ============================================================================
// skillRef
// ============================================================================

describe('CcAdapter.skillRef', () => {
  it('delegates to ccSkillRef (basename of targets.cc)', () => {
    const adapter = new CcAdapter(DISPOSITIONS);
    const row = { canonical: 'skills/theming-styles', targets: { cc: '.claude/skills/theming-styles', kiro: '.kiro/skills/theming-styles' }, owners: ['data'] };
    expect(adapter.skillRef(row)).toBe('theming-styles');
  });
});

// ============================================================================
// emitAgent — frontmatter
// ============================================================================

describe('CcAdapter.emitAgent — frontmatter', () => {
  const adapter = new CcAdapter(DISPOSITIONS);

  it('emits exactly one file at .claude/agents/<agent>.md', () => {
    const files = adapter.emitAgent(resolvedAgent(), ctx());
    expect(files).toHaveLength(1);
    expect(files[0].path).toBe('.claude/agents/fixture-consumer.md');
  });

  it('carries the CC core tools then the sorted namespaced tools (complete-allowlist rule, Task 9)', () => {
    const files = adapter.emitAgent(resolvedAgent(), ctx());
    const content = files[0].content;
    // Core tools FIRST (in CC the tools list is the complete allowlist — MCP-only would
    // silently strip file/shell access); no `Skill` (this fixture declares no skills);
    // then the namespaced subset, sorted.
    const expected = [
      'Read', 'Grep', 'Glob', 'Bash', 'Write', 'Edit',
      ...['mcp__designerpunk-application__get_component_full', 'mcp__designerpunk-docs__find_docs', 'mcp__designerpunk-docs__get_section'].sort(),
    ];
    const toolsBlock = content.match(/tools:\n((?:\s+- .+\n)+)/);
    expect(toolsBlock).not.toBeNull();
    const listed = toolsBlock![1].trim().split('\n').map((l) => l.replace(/^\s*-\s*/, ''));
    expect(listed).toEqual(expected);
  });

  it('throws if the agent toolSubset names an unregistered tool referenced by a cue', () => {
    const agent = resolvedAgent({
      routes: { cues: [{ when: 'x', tool: 'not_in_subset', mcp: 'application' }] },
    });
    expect(() => adapter.emitAgent(agent, ctx())).toThrow(/not granted by its own server/);
  });

  it("namespaces a cue by the cue's OWN mcp field — never subset search order (Ada U2 misroute regression)", () => {
    // The live bug: `rebuild_index` declared by BOTH servers; the application-MCP cue was
    // rendered with the docs server (first subset match). The cue's mcp field must win.
    const agent = resolvedAgent({
      toolSubset: {
        'designerpunk-docs': ['find_docs', 'rebuild_index'], // find_docs: the shared-catalog discovery cue's grant
        'designerpunk-application': ['rebuild_index'],
      },
      routes: {
        cues: [
          { when: 'token-index changed', tool: 'rebuild_index', mcp: 'application' },
          { when: 'governance docs changed', tool: 'rebuild_index', mcp: 'docs' },
        ],
      },
    });
    const content = adapter.emitAgent(agent, ctx())[0].content;
    expect(content).toContain('WHEN token-index changed THEN use mcp__designerpunk-application__rebuild_index (application MCP)');
    expect(content).toContain('WHEN governance docs changed THEN use mcp__designerpunk-docs__rebuild_index (docs MCP)');
  });

  it("throws when a cue's own server does not grant the tool, even if another server does", () => {
    const agent = resolvedAgent({
      toolSubset: { 'designerpunk-docs': ['find_docs', 'rebuild_index'] },
      routes: { cues: [{ when: 'x', tool: 'rebuild_index', mcp: 'application' }] },
    });
    expect(() => adapter.emitAgent(agent, ctx())).toThrow(/not granted by its own server "designerpunk-application"/);
  });
});

// ============================================================================
// emitAgent — body content
// ============================================================================

describe('CcAdapter.emitAgent — body content', () => {
  const adapter = new CcAdapter(DISPOSITIONS);

  it('contains the verbatim pass-through body', () => {
    const files = adapter.emitAgent(resolvedAgent(), ctx());
    expect(files[0].content).toContain('This is the verbatim pass-through body.');
  });

  it('embeds the per-agent ambient member inline', () => {
    const files = adapter.emitAgent(resolvedAgent(), ctx());
    expect(files[0].content).toContain('### platform-implementation-guidelines');
    expect(files[0].content).toContain('Resolved section text for platform-implementation-guidelines.');
  });

  it('does NOT inline the shared-lane members (personal-note / core-goals)', () => {
    const files = adapter.emitAgent(resolvedAgent(), ctx());
    expect(files[0].content).not.toContain('### personal-note');
    expect(files[0].content).not.toContain('### core-goals');
  });

  it('throws naming the id when a per-agent member has no embed', () => {
    expect(() => adapter.emitAgent(resolvedAgent(), ctx({ embeds: {} }))).toThrow(
      /platform-implementation-guidelines/
    );
  });

  it('renders the applicable workflow rule (appliesToTools intersects the subset)', () => {
    const files = adapter.emitAgent(resolvedAgent(), ctx());
    expect(files[0].content).toContain('## Workflow rules');
    expect(files[0].content).toContain('Prefer get_document_summary before get_document_full.');
  });

  it('omits the workflow rules section when no rule applies', () => {
    const nonApplicable: WorkflowRule = { ...FAKE_WORKFLOW_RULE, appliesToTools: ['some_unrelated_tool'] };
    const files = adapter.emitAgent(resolvedAgent(), ctx({ workflowRules: [nonApplicable] }));
    expect(files[0].content).not.toContain('## Workflow rules');
  });

  it('names both the paths and the PreToolUse/worktree enforcement options in the write-scope note', () => {
    const files = adapter.emitAgent(resolvedAgent(), ctx());
    expect(files[0].content).toContain('## Write scope');
    expect(files[0].content).toContain('.kiro/specs/**');
    expect(files[0].content).toContain('docs/specs/**');
    expect(files[0].content).toContain('PreToolUse');
    expect(files[0].content).toContain('isolation: worktree');
  });

  it('renders the run-context annotation on the consumer-repo gap command', () => {
    const files = adapter.emitAgent(resolvedAgent(), ctx());
    expect(files[0].content).toContain('no gradlew in this repo');
    expect(files[0].content).toContain('run from the consumer product repo, not this repo');
  });

  it('never renders the dropped keyboardShortcut field anywhere in output', () => {
    const files = adapter.emitAgent(resolvedAgent(), ctx());
    expect(files[0].content).not.toContain('ctrl+shift+x');
    expect(files[0].content).not.toContain('keyboardShortcut');
  });

  it('renders agentSpawn as a Pre-flight note', () => {
    const files = adapter.emitAgent(resolvedAgent(), ctx());
    expect(files[0].content).toContain('## Pre-flight');
    expect(files[0].content).toContain('run at session start:');
    expect(files[0].content).toContain('git status --porcelain');
  });

  it('renders the shared-catalog ratification statement', () => {
    const files = adapter.emitAgent(resolvedAgent(), ctx());
    expect(files[0].content).toContain('verify the committed ballot/record says RATIFIED');
  });

  it('renders the knowledge-fallback note from knowledgeBases', () => {
    const files = adapter.emitAgent(resolvedAgent(), ctx());
    expect(files[0].content).toContain('## Knowledge fallback');
    expect(files[0].content).toContain('component-source');
    expect(files[0].content).toContain('src/components/**/*.tsx');
  });
});

// ============================================================================
// Attribution totality (P2)
// ============================================================================

describe('CcAdapter — attribution totality', () => {
  const adapter = new CcAdapter(DISPOSITIONS);

  it('the emitted agent file has a valid (total, non-overlapping) attribution manifest', () => {
    const files = adapter.emitAgent(resolvedAgent(), ctx());
    const file = files[0];
    const result = checkAttributionTotality(file.attribution, lineCount(file.content));
    expect(result.errors).toEqual([]);
    expect(result.valid).toBe(true);
  });

  it('the emitted CLAUDE.md has a valid attribution manifest', () => {
    const files = adapter.emitAlwaysLayer(ALWAYS_SET, ctx());
    const file = files[0];
    const result = checkAttributionTotality(file.attribution, lineCount(file.content));
    expect(result.errors).toEqual([]);
    expect(result.valid).toBe(true);
  });
});

// ============================================================================
// Determinism
// ============================================================================

describe('CcAdapter — determinism', () => {
  const adapter = new CcAdapter(DISPOSITIONS);

  it('two emitAgent calls produce byte-identical content and identical serialized attribution', () => {
    const a = adapter.emitAgent(resolvedAgent(), ctx());
    const b = adapter.emitAgent(resolvedAgent(), ctx());
    expect(a[0].content).toBe(b[0].content);
    expect(JSON.stringify(a[0].attribution)).toBe(JSON.stringify(b[0].attribution));
  });
});

// ============================================================================
// emitAlwaysLayer — C11 lane 1
// ============================================================================

describe('CcAdapter.emitAlwaysLayer', () => {
  const adapter = new CcAdapter(DISPOSITIONS);

  const NINE_MEMBER_SET: AlwaysSetMember[] = [
    'personal-note',
    'core-goals',
    'ai-collaboration-principles',
    'spec-feedback-protocol',
    'start-up-tasks',
    'task-completion-protocol',
    'agent-directory',
    'designerpunk-systems-overview',
    'civitas-system-overview',
  ].map((id) => ({ id, class: 'formative', delivery: { cc: 'file' as const, kiro: 'file' as const } }));

  const NINE_MEMBER_PATHS: Record<string, string> = {
    'personal-note': '.kiro/steering/personal-note.md',
    'core-goals': '.kiro/steering/core-goals.md',
    'ai-collaboration-principles': '.kiro/steering/AI-Collaboration-Principles.md',
    'spec-feedback-protocol': '.kiro/steering/Spec-Feedback-Protocol.md',
    'start-up-tasks': '.kiro/steering/start-up-tasks.md',
    'task-completion-protocol': '.kiro/steering/Task-Completion-Protocol.md',
    'agent-directory': '.kiro/steering/Agent-Directory.md',
    'designerpunk-systems-overview': '.kiro/steering/DesignerPunk-Systems-Overview.md',
    'civitas-system-overview': '.kiro/steering/Civitas-System-Overview.md',
  };

  it('emits one file (CLAUDE.md) with a generated banner and one @-line per member, in order', () => {
    const files = adapter.emitAlwaysLayer(NINE_MEMBER_SET, ctx({ steeringIdToPath: NINE_MEMBER_PATHS }));
    expect(files).toHaveLength(1);
    expect(files[0].path).toBe('CLAUDE.md');
    expect(files[0].content).toContain('GENERATED FILE');

    const importLines = files[0].content
      .split('\n')
      .filter((l) => l.startsWith('@'));
    expect(importLines).toHaveLength(9);
    expect(importLines).toEqual(NINE_MEMBER_SET.map((m) => `@${NINE_MEMBER_PATHS[m.id]}`));
  });

  it('throws when a member has no steeringIdToPath entry', () => {
    expect(() => adapter.emitAlwaysLayer(NINE_MEMBER_SET, ctx({ steeringIdToPath: {} }))).toThrow(
      /personal-note/
    );
  });
});

describe('emitAgent — empty per-agent ambient (incorporation adjudication)', () => {
  const adapter = new CcAdapter(DISPOSITIONS);

  it('omits the "## Ambient (per-agent)" section entirely for a zero-member agent', () => {
    const agent = resolvedAgent();
    // strip the per-agent member, keeping only shared-lane members (the Leonardo empty-by-design shape)
    agent.ambientManifests.cc.members = agent.ambientManifests.cc.members.filter((m) => m.lane === 'shared');
    const [file] = adapter.emitAgent(agent, ctx({ embeds: {} }));
    expect(file.content).not.toContain('## Ambient (per-agent)');
    // attribution stays total despite the omitted section
    const { checkAttributionTotality } = require('../attribution');
    expect(checkAttributionTotality(file.attribution, lineCount(file.content)).valid).toBe(true);
  });
});

// ============================================================================
// Ground truth (Req 10 AC3 — manifest verdicts honored as data; U3 Lina cutover)
// ============================================================================

describe('CcAdapter.emitAgent — ground truth faithfulness cue', () => {
  const adapter = new CcAdapter(DISPOSITIONS);

  function withGroundTruth(groundTruth: NonNullable<ResolvedAgent['ambientManifests']['cc']['groundTruth']>, subsetOverride?: AgentFrontmatter['toolSubset']): ResolvedAgent {
    const agent = resolvedAgent(subsetOverride ? { toolSubset: subsetOverride } : {});
    agent.ambientManifests.cc = { ...agent.ambientManifests.cc, groundTruth };
    return agent;
  }

  it('renders the catalog-is-manifest faithfulness cue with namespaced verbs', () => {
    const agent = withGroundTruth(
      {
        verdict: 'catalog-is-manifest',
        emitArtifactRefs: true,
        faithfulnessVerbs: ['get_component_full', 'get_component_health'],
      },
      {
        'designerpunk-docs': ['find_docs', 'get_section'],
        'designerpunk-application': ['get_component_full', 'get_component_health'],
      }
    );
    const [file] = adapter.emitAgent(agent, ctx());
    expect(file.content).toContain('## Ground truth');
    expect(file.content).toContain('`mcp__designerpunk-application__get_component_full`');
    expect(file.content).toContain('`mcp__designerpunk-application__get_component_health`');
    expect(file.content).toContain('assembly-grain, not catalog enumeration');
  });

  it('omits the section entirely for a directive without faithfulness verbs (none-standing)', () => {
    const agent = withGroundTruth({ verdict: 'none-standing', emitArtifactRefs: true });
    const [file] = adapter.emitAgent(agent, ctx());
    expect(file.content).not.toContain('## Ground truth');
  });

  it('throws loud when a faithfulness verb is not granted by the subset', () => {
    const agent = withGroundTruth({
      verdict: 'catalog-is-manifest',
      emitArtifactRefs: true,
      faithfulnessVerbs: ['get_component_health'], // fixture subset grants only get_component_full
    });
    expect(() => adapter.emitAgent(agent, ctx())).toThrow(/not declared by any server/);
  });

  it('renders the none-trim-stale-snapshots trim negatives VERBATIM with a namespaced replacement tool', () => {
    const agent = withGroundTruth(
      {
        verdict: 'none-trim-stale-snapshots',
        emitArtifactRefs: false,
        trims: [
          {
            artifact: 'dist/web/DesignTokens.web.css',
            fires: 'unconditional',
            cue: {
              negative: 'do NOT read dist/web/DesignTokens.web.css (a stale build snapshot)',
              tool: 'get_token_details',
              mcp: 'application',
              replaces: 'dist/web/DesignTokens.web.css',
            },
          },
        ],
      },
      {
        'designerpunk-docs': ['find_docs', 'get_section'],
        // get_component_full satisfies the fixture's built-in routes.cue; get_token_details is the trim's tool.
        'designerpunk-application': ['get_component_full', 'get_token_details'],
      }
    );
    const [file] = adapter.emitAgent(agent, ctx());
    expect(file.content).toContain('## Ground truth');
    // The verbatim negative sweep-8 K-D1 asserts:
    expect(file.content).toContain('do NOT read dist/web/DesignTokens.web.css (a stale build snapshot)');
    expect(file.content).toContain('`mcp__designerpunk-application__get_token_details`');
  });

  it('throws loud when a trim replacement tool is not granted by the subset', () => {
    const agent = withGroundTruth({
      verdict: 'none-trim-stale-snapshots',
      emitArtifactRefs: false,
      trims: [
        {
          artifact: 'dist/web/DesignTokens.web.css',
          fires: 'unconditional',
          cue: {
            negative: 'do NOT read dist/web/DesignTokens.web.css',
            tool: 'search_tokens', // fixture subset does not grant it
            mcp: 'application',
            replaces: 'dist/web/DesignTokens.web.css',
          },
        },
      ],
    });
    expect(() => adapter.emitAgent(agent, ctx())).toThrow(/not declared by any server/);
  });
});
