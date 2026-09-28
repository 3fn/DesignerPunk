/**
 * entry-tree.test.ts — Spec 123 Task 10.3: the frontmatter ENTRY TREE (design C13, L-D4,
 * Stacy S-D-B2-(a)), tested over `canonical/agents/lina.md`'s real frontmatter.
 *
 * The criterion: the entry tree keys list/map fields PER MEMBER and commands by `name`
 * (never `cmd`). Only scalar leaves and list members are atomic — so a dropped glob is an
 * ABSENT ENTRY that takes a disposition, not a silent re-point of one `writeScope` blob.
 */

import * as fs from 'fs';
import * as path from 'path';
import { splitFrontmatter } from '../frontmatter';
import { entryTree, ENTRY_ROOT } from '../partition';

const REPO_ROOT = path.resolve(__dirname, '..', '..', '..');
const lina = splitFrontmatter(fs.readFileSync(path.join(REPO_ROOT, 'canonical', 'agents', 'lina.md'), 'utf8')).frontmatter;
const tree = entryTree(lina);

const kindOf = (id: string) => tree.get(id)?.kind;

describe('entryTree over lina.md — list/map fields keyed per member', () => {
  it('writeScope is a list whose globs are individual leaf entries', () => {
    expect(kindOf('writeScope')).toBe('list');
    const members = tree.get('writeScope')?.children ?? [];
    expect(members).toEqual([
      'writeScope[src/components/**]',
      'writeScope[.kiro/specs/**]',
      'writeScope[docs/specs/**]',
      'writeScope[application-mcp-server/**]',
      'writeScope[governance/component-meta-authoring-guide.md]',
    ]);
    for (const m of members) expect(kindOf(m)).toBe('leaf');
  });

  it('toolSubset is a map of servers, each a list keyed per tool — the two rebuild_index grants stay distinct', () => {
    expect(kindOf('toolSubset')).toBe('map');
    expect(kindOf('toolSubset.designerpunk-docs')).toBe('list');
    expect(kindOf('toolSubset.designerpunk-docs[rebuild_index]')).toBe('leaf');
    expect(kindOf('toolSubset.designerpunk-application[rebuild_index]')).toBe('leaf');
    expect(tree.get('toolSubset.designerpunk-application')?.children).toHaveLength(8);
  });

  it('knowledgeBases are keyed per member by name', () => {
    expect(tree.get('knowledgeBases')?.children).toEqual([
      'knowledgeBases[StemmaComponentSource]',
      'knowledgeBases[ApplicationMCPServerSource]',
    ]);
  });

  it('kiro.agentSpawn is the `preflight` field, keyed per command', () => {
    expect(kindOf('preflight')).toBe('list');
    expect(tree.get('preflight')?.children).toEqual(['preflight[git status --porcelain]']);
    expect(tree.has('kiro.agentSpawn')).toBe(false);
    expect(kindOf('kiro.keyboardShortcut')).toBe('leaf');
  });

  it('skills: an empty list is a container with no members (not a leaf)', () => {
    expect(kindOf('skills')).toBe('list');
    expect(tree.get('skills')?.children).toEqual([]);
  });
});

describe('entryTree over lina.md — commands keyed by `name`, never `cmd`', () => {
  it('each command is an entry keyed by its name', () => {
    expect(tree.get('commands')?.children).toEqual([
      'commands[functional-suite]',
      'commands[component-tests]',
      'commands[full-suite-with-performance]',
    ]);
  });

  it('no entry path is keyed by a command string', () => {
    const ids = [...tree.nodes.keys()];
    expect(ids.filter((id) => id.includes('npm test') || id.includes('npm run'))).toEqual([]);
  });

  it('editing a command\'s cmd leaves every entry key unchanged (no orphaned row on a command edit)', () => {
    const edited = JSON.parse(JSON.stringify(lina)) as { commands: { cmd: string }[] };
    edited.commands[0].cmd = 'npm test -- --changed';
    expect([...entryTree(edited as unknown as Record<string, unknown>).nodes.keys()]).toEqual([...tree.nodes.keys()]);
  });
});

describe('entryTree over lina.md — identity keys, ambient, scalars, containment', () => {
  it('doc routes key by id; agent routes by target; cues (no identity field) by index', () => {
    expect(kindOf('routes')).toBe('map');
    expect(kindOf('routes.docs[concept-catalog]')).toBe('leaf');
    expect(tree.get('routes.agents')?.children).toEqual(['routes.agents[ada]', 'routes.agents[thurgood]']);
    expect(kindOf('routes.cues[0]')).toBe('leaf');
  });

  it('ambient governance-as-law is keyed doc-id + section', () => {
    expect(tree.get('ambient[contract-system-reference]')?.children).toEqual([
      'ambient[contract-system-reference#naming-convention]',
      'ambient[contract-system-reference#classification-rules]',
    ]);
    expect(kindOf('ambient.groundTruthManifest.verdict')).toBe('leaf');
  });

  it('scalar fields are atomic leaves', () => {
    for (const id of ['agent', 'agentType', 'description']) expect(kindOf(id)).toBe('leaf');
    const agentLeaf = tree.units.find((u) => u.path === 'agent');
    expect(agentLeaf?.value).toBe('lina');
  });

  it('containment is structural in the same nodes map; an unknown path is NON-MATCHING, never a throw', () => {
    expect(tree.root).toBe(ENTRY_ROOT);
    expect(tree.isDescendantOrSelf('routes.docs[concept-catalog]', 'routes')).toBe(true);
    expect(tree.isDescendantOrSelf('routes.docs[concept-catalog]', 'routes.docs')).toBe(true);
    expect(tree.isDescendantOrSelf('writeScope[src/components/**]', 'writeScope')).toBe(true);
    expect(tree.isDescendantOrSelf('writeScope', 'writeScope[src/components/**]')).toBe(false);
    expect(tree.isDescendantOrSelf('routes.docs[concept-catalog]', 'commands')).toBe(false);
    expect(tree.isDescendantOrSelf('writeScope[nope/**]', 'writeScope')).toBe(false);
  });

  it('every leaf is reachable from the root, and leaves are exactly the atomic entries', () => {
    const leafIds = [...tree.nodes.values()].filter((n) => n.kind === 'leaf').map((n) => n.id);
    expect(tree.units.map((u) => u.path).sort()).toEqual(leafIds.sort());
    for (const id of leafIds) expect(tree.isDescendantOrSelf(id, ENTRY_ROOT)).toBe(true);
  });
});

describe('entryTree — keying rules (unit level)', () => {
  it('duplicate member identities take the -2 suffix; identity-less object members key by index', () => {
    const t = entryTree({
      routes: { agents: [{ target: 'ada', when: 'a' }, { target: 'ada', when: 'b' }] },
      standingFacts: [{ fact: 'x', kind: 'platform-reality' }],
    });
    expect(t.get('routes.agents')?.children).toEqual(['routes.agents[ada]', 'routes.agents[ada-2]']);
    expect(t.get('standingFacts')?.children).toEqual(['standingFacts[0]']);
  });

  it('a named-gap command (no name) keys by its class', () => {
    const t = entryTree({ commands: [{ class: 'fixture-named-gap', runContext: 'this-repo', gap: 'g' }] });
    expect(t.get('commands')?.children).toEqual(['commands[fixture-named-gap]']);
  });
});
