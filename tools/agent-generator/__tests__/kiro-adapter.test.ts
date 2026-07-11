/**
 * @category evergreen
 * @purpose Verify the Kiro target adapter (C4/Task 5.3) against a fixture ResolvedAgent:
 *          native (non-namespaced) toolRef + fail-loud; config JSON grammar matched against
 *          the real .kiro/agents/{ada,data}.json shapes (name/description/prompt pointer/
 *          server-level allowedTools grants/toolsSettings.write.allowedPaths); resources[]
 *          built from the ambient manifest with file:// vs skill:// per delivery hint and a
 *          throw on a missing docIdToPath id; skills rows resolving to skill:// URIs; kiro:
 *          fields (keyboardShortcut, welcomeMessage, hooks.agentSpawn) carried through;
 *          native tool names in the prompt; absence of the CC-only "## Ambient (per-agent)"
 *          section; attribution totality (P2) for both emitted files; determinism; and
 *          emitAlwaysLayer returning [].
 */

import { KiroAdapter } from '../adapters/kiro';
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

const SKILLS_MAP: SkillsMap = {
  rows: [
    {
      canonical: 'skills/theming-styles',
      targets: { cc: '.claude/skills/theming-styles', kiro: '.kiro/skills/android/theming/styles' },
      owners: ['data'],
    },
  ],
};

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
    skills: ['theming-styles'],
    writeScope: ['.kiro/specs/**', 'docs/specs/**'],
    kiro: {
      keyboardShortcut: 'ctrl+shift+x',
      welcomeMessage: 'Hey! I am fixture-consumer.',
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
        members: [],
      },
      kiro: {
        agent: fm.agent,
        target: 'kiro',
        members: [
          { id: 'personal-note', class: 'formative', lane: 'shared', delivery: 'file' },
          { id: 'core-goals', class: 'formative', lane: 'shared', delivery: 'file' },
          { id: 'platform-implementation-guidelines', class: 'governance-as-law', lane: 'per-agent', delivery: 'skill' },
        ],
      },
    },
  };
}

function ctx(overrides: Partial<AdapterContext> = {}): AdapterContext {
  return {
    workflowRules: [FAKE_WORKFLOW_RULE],
    skillsMap: SKILLS_MAP,
    alwaysSet: ALWAYS_SET,
    dispositions: DISPOSITIONS,
    sharedCatalog: SHARED_CATALOG,
    repoRoot: process.cwd(),
    docIdToPath: {
      'personal-note': '.kiro/steering/personal-note.md',
      'core-goals': '.kiro/steering/core-goals.md',
      'platform-implementation-guidelines': 'governance/platform-implementation-guidelines.md',
    },
    ...overrides,
  };
}

function lineCount(text: string): number {
  if (text.length === 0) return 0;
  const t = text.endsWith('\n') ? text.slice(0, -1) : text;
  return t.length === 0 ? 1 : t.split('\n').length;
}

function configFile(files: ReturnType<KiroAdapter['emitAgent']>) {
  const f = files.find((x) => x.path.endsWith('.json'));
  if (!f) throw new Error('no .json file in emitAgent output');
  return f;
}

function promptFile(files: ReturnType<KiroAdapter['emitAgent']>) {
  const f = files.find((x) => x.path.endsWith('-prompt.md'));
  if (!f) throw new Error('no -prompt.md file in emitAgent output');
  return f;
}

// ============================================================================
// toolRef — native, non-namespaced
// ============================================================================

describe('KiroAdapter.toolRef', () => {
  const adapter = new KiroAdapter(DISPOSITIONS);

  it('returns the bare (native) tool name for a tool declared in the subset', () => {
    expect(adapter.toolRef({ 'designerpunk-docs': ['find_docs'] }, 'find_docs')).toBe('find_docs');
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

describe('KiroAdapter.skillRef', () => {
  it('delegates to kiroSkillRef (skill://<targets.kiro>/SKILL.md)', () => {
    const adapter = new KiroAdapter(DISPOSITIONS);
    const row = { canonical: 'skills/theming-styles', targets: { cc: '.claude/skills/theming-styles', kiro: '.kiro/skills/android/theming/styles' }, owners: ['data'] };
    expect(adapter.skillRef(row)).toBe('skill://.kiro/skills/android/theming/styles/SKILL.md');
  });
});

// ============================================================================
// emitAgent — two files
// ============================================================================

describe('KiroAdapter.emitAgent — file shape', () => {
  const adapter = new KiroAdapter(DISPOSITIONS);

  it('emits exactly two files: .kiro/agents/<agent>.json and .kiro/agents/<agent>-prompt.md', () => {
    const files = adapter.emitAgent(resolvedAgent(), ctx());
    expect(files).toHaveLength(2);
    const paths = files.map((f) => f.path).sort();
    expect(paths).toEqual(['.kiro/agents/fixture-consumer-prompt.md', '.kiro/agents/fixture-consumer.json']);
  });
});

// ============================================================================
// emitAgent — config JSON grammar (matched against real ada.json / data.json)
// ============================================================================

describe('KiroAdapter.emitAgent — config grammar', () => {
  const adapter = new KiroAdapter(DISPOSITIONS);

  it('carries name, description, and the file:// prompt pointer form', () => {
    const files = adapter.emitAgent(resolvedAgent(), ctx());
    const config = JSON.parse(configFile(files).content);
    expect(config.name).toBe('fixture-consumer');
    expect(config.description).toBe('A fixture consumer agent for adapter tests.');
    expect(config.prompt).toBe('file://./fixture-consumer-prompt.md');
  });

  it('carries includeMcpJson: true and tools: ["*"] (Kiro coarse grant), matching real configs', () => {
    const files = adapter.emitAgent(resolvedAgent(), ctx());
    const config = JSON.parse(configFile(files).content);
    expect(config.includeMcpJson).toBe(true);
    expect(config.tools).toEqual(['*']);
  });

  it('carries allowedTools as read + knowledge + server-level @grants (no finer per-tool grammar)', () => {
    const files = adapter.emitAgent(resolvedAgent(), ctx());
    const config = JSON.parse(configFile(files).content);
    expect(config.allowedTools).toEqual(['read', 'knowledge', '@designerpunk-docs', '@designerpunk-application']);
  });

  it('carries toolsSettings.write.allowedPaths from writeScope', () => {
    const files = adapter.emitAgent(resolvedAgent(), ctx());
    const config = JSON.parse(configFile(files).content);
    expect(config.toolsSettings.write.allowedPaths).toEqual(['.kiro/specs/**', 'docs/specs/**']);
  });

  it('omits toolsSettings entirely when writeScope is empty/absent', () => {
    const files = adapter.emitAgent(resolvedAgent({ writeScope: [] }), ctx());
    const config = JSON.parse(configFile(files).content);
    expect(config.toolsSettings).toBeUndefined();
  });
});

// ============================================================================
// emitAgent — resources[] (id -> file:// / skill:// per delivery hint)
// ============================================================================

describe('KiroAdapter.emitAgent — resources', () => {
  const adapter = new KiroAdapter(DISPOSITIONS);

  it('maps shared-lane (file delivery) members to file:// and per-agent (skill delivery) members to skill://', () => {
    const files = adapter.emitAgent(resolvedAgent(), ctx());
    const config = JSON.parse(configFile(files).content);
    expect(config.resources).toContain('file://.kiro/steering/personal-note.md');
    expect(config.resources).toContain('file://.kiro/steering/core-goals.md');
    expect(config.resources).toContain('skill://governance/platform-implementation-guidelines.md');
  });

  it('also resolves each canonical skills: row key to its skill:// SKILL.md reference', () => {
    const files = adapter.emitAgent(resolvedAgent(), ctx());
    const config = JSON.parse(configFile(files).content);
    expect(config.resources).toContain('skill://.kiro/skills/android/theming/styles/SKILL.md');
  });

  it('throws naming the id when an ambient-manifest member has no docIdToPath entry', () => {
    expect(() => adapter.emitAgent(resolvedAgent(), ctx({ docIdToPath: {} }))).toThrow(/personal-note/);
  });

  it('throws naming the key when a skills: row key is not in the skills map', () => {
    const agent = resolvedAgent({ skills: ['not-a-real-skill'] });
    expect(() => adapter.emitAgent(agent, ctx())).toThrow(/not-a-real-skill/);
  });
});

// ============================================================================
// emitAgent — kiro: fields carried through
// ============================================================================

describe('KiroAdapter.emitAgent — kiro: fields carried through', () => {
  const adapter = new KiroAdapter(DISPOSITIONS);

  it('carries keyboardShortcut, welcomeMessage, and hooks.agentSpawn into the config', () => {
    const files = adapter.emitAgent(resolvedAgent(), ctx());
    const config = JSON.parse(configFile(files).content);
    expect(config.keyboardShortcut).toBe('ctrl+shift+x');
    expect(config.welcomeMessage).toBe('Hey! I am fixture-consumer.');
    expect(config.hooks).toEqual({ agentSpawn: [{ command: 'git status --porcelain', timeout_ms: 5000 }] });
  });

  it('omits keyboardShortcut/welcomeMessage/hooks when not authored', () => {
    const files = adapter.emitAgent(resolvedAgent({ kiro: {} }), ctx());
    const config = JSON.parse(configFile(files).content);
    expect(config.keyboardShortcut).toBeUndefined();
    expect(config.welcomeMessage).toBeUndefined();
    expect(config.hooks).toBeUndefined();
  });
});

// ============================================================================
// emitAgent — prompt body content
// ============================================================================

describe('KiroAdapter.emitAgent — prompt body content', () => {
  const adapter = new KiroAdapter(DISPOSITIONS);

  it('contains the verbatim pass-through body', () => {
    const files = adapter.emitAgent(resolvedAgent(), ctx());
    expect(promptFile(files).content).toContain('This is the verbatim pass-through body.');
  });

  it('does NOT contain the CC-only "## Ambient (per-agent)" section', () => {
    const files = adapter.emitAgent(resolvedAgent(), ctx());
    expect(promptFile(files).content).not.toContain('## Ambient (per-agent)');
  });

  it('does NOT contain a "## Knowledge fallback" section (native /knowledge surface instead)', () => {
    const files = adapter.emitAgent(resolvedAgent(), ctx());
    expect(promptFile(files).content).not.toContain('## Knowledge fallback');
  });

  it('renders routing cues with NATIVE (non-namespaced) tool names', () => {
    const files = adapter.emitAgent(resolvedAgent(), ctx());
    const content = promptFile(files).content;
    expect(content).toContain('## Routing');
    expect(content).toContain('use get_component_full');
    expect(content).not.toContain('mcp__designerpunk-application__get_component_full');
  });

  it('renders the applicable workflow rule', () => {
    const files = adapter.emitAgent(resolvedAgent(), ctx());
    expect(promptFile(files).content).toContain('## Workflow rules');
    expect(promptFile(files).content).toContain('Prefer get_document_summary before get_document_full.');
  });

  it('renders the run-context annotation on the consumer-repo gap command', () => {
    const files = adapter.emitAgent(resolvedAgent(), ctx());
    expect(promptFile(files).content).toContain('no gradlew in this repo');
    expect(promptFile(files).content).toContain('run from the consumer product repo, not this repo');
  });

  it('renders the shared-catalog find_docs cue with the native tool name', () => {
    const files = adapter.emitAgent(resolvedAgent(), ctx());
    const content = promptFile(files).content;
    expect(content).toContain('use find_docs to discover docs by concept/keyword (find_docs)');
  });

  it('renders the base write-scope note WITHOUT the CC PreToolUse/worktree enforcement sentence', () => {
    const files = adapter.emitAgent(resolvedAgent(), ctx());
    const content = promptFile(files).content;
    expect(content).toContain('## Write scope');
    expect(content).toContain('.kiro/specs/**');
    expect(content).not.toContain('PreToolUse');
    expect(content).not.toContain('isolation: worktree');
  });

  it('never renders the dropped-from-prompt keyboardShortcut value in the prompt body', () => {
    const files = adapter.emitAgent(resolvedAgent(), ctx());
    expect(promptFile(files).content).not.toContain('ctrl+shift+x');
  });
});

// ============================================================================
// Attribution totality (P2) — both files
// ============================================================================

describe('KiroAdapter — attribution totality', () => {
  const adapter = new KiroAdapter(DISPOSITIONS);

  it('the emitted config .json has a valid, TOTAL, single-span (render) attribution manifest', () => {
    const files = adapter.emitAgent(resolvedAgent(), ctx());
    const file = configFile(files);
    const result = checkAttributionTotality(file.attribution, lineCount(file.content));
    expect(result.errors).toEqual([]);
    expect(result.valid).toBe(true);
    expect(file.attribution.spans).toHaveLength(1);
    expect(file.attribution.spans[0].op).toBe('render');
  });

  it('the emitted -prompt.md has a valid, total, multi-span attribution manifest', () => {
    const files = adapter.emitAgent(resolvedAgent(), ctx());
    const file = promptFile(files);
    const result = checkAttributionTotality(file.attribution, lineCount(file.content));
    expect(result.errors).toEqual([]);
    expect(result.valid).toBe(true);
  });
});

// ============================================================================
// Determinism
// ============================================================================

describe('KiroAdapter — determinism', () => {
  const adapter = new KiroAdapter(DISPOSITIONS);

  it('two emitAgent calls produce byte-identical content for both files', () => {
    const a = adapter.emitAgent(resolvedAgent(), ctx());
    const b = adapter.emitAgent(resolvedAgent(), ctx());
    const aByPath = Object.fromEntries(a.map((f) => [f.path, f.content]));
    const bByPath = Object.fromEntries(b.map((f) => [f.path, f.content]));
    expect(aByPath).toEqual(bByPath);
    const aAttr = Object.fromEntries(a.map((f) => [f.path, JSON.stringify(f.attribution)]));
    const bAttr = Object.fromEntries(b.map((f) => [f.path, JSON.stringify(f.attribution)]));
    expect(aAttr).toEqual(bAttr);
  });
});

// ============================================================================
// emitSkills
// ============================================================================

describe('KiroAdapter.emitSkills', () => {
  it('emits byte-identical copies to each row targets.kiro path, sorted', () => {
    const adapter = new KiroAdapter(DISPOSITIONS);
    // Use a real on-disk skill row so the file read succeeds; skills/ tree is committed.
    const map: SkillsMap = { rows: [] };
    const files = adapter.emitSkills(map, ctx({ skillsMap: map }));
    expect(files).toEqual([]);
  });
});

// ============================================================================
// emitAlwaysLayer — returns []
// ============================================================================

describe('KiroAdapter.emitAlwaysLayer', () => {
  it('returns an empty array (no separate always-layer file for Kiro)', () => {
    const adapter = new KiroAdapter(DISPOSITIONS);
    const files = adapter.emitAlwaysLayer(ALWAYS_SET, ctx());
    expect(files).toEqual([]);
  });
});

// ============================================================================
// Ground truth (Req 10 AC3 — manifest verdicts honored as data; U3 Lina cutover)
// ============================================================================

describe('KiroAdapter.emitAgent — ground truth faithfulness cue (prompt body, native names)', () => {
  const adapter = new KiroAdapter(DISPOSITIONS);

  it('renders the catalog-is-manifest faithfulness cue with NATIVE (non-namespaced) verbs in the prompt', () => {
    const agent = resolvedAgent({
      toolSubset: {
        'designerpunk-docs': ['find_docs', 'get_section'],
        'designerpunk-application': ['get_component_full', 'get_component_health'],
      },
    });
    agent.ambientManifests.kiro = {
      ...agent.ambientManifests.kiro,
      groundTruth: {
        verdict: 'catalog-is-manifest',
        emitArtifactRefs: true,
        faithfulnessVerbs: ['get_component_full', 'get_component_health'],
      },
    };
    const files = adapter.emitAgent(agent, ctx());
    const prompt = files.find((f) => f.path.endsWith('-prompt.md'))!;
    expect(prompt.content).toContain('## Ground truth');
    expect(prompt.content).toContain('`get_component_full`');
    expect(prompt.content).toContain('`get_component_health`');
    expect(prompt.content).not.toContain('mcp__designerpunk-application__get_component_full');
  });

  it('omits the section entirely for a directive without faithfulness verbs (none-standing)', () => {
    const agent = resolvedAgent();
    agent.ambientManifests.kiro = {
      ...agent.ambientManifests.kiro,
      groundTruth: { verdict: 'none-standing', emitArtifactRefs: true },
    };
    const files = adapter.emitAgent(agent, ctx());
    const prompt = files.find((f) => f.path.endsWith('-prompt.md'))!;
    expect(prompt.content).not.toContain('## Ground truth');
  });
});
