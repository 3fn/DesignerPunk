/**
 * @category evergreen
 * @purpose Verify ambient composition (C3.2): the alwaysSet ∪ agent.ambient union (P3),
 *          per-agent-lane tagging, defensive dedup, deterministic member ordering, and the
 *          verdict->directive mapping (Req 10 AC2/AC3). Also parses the REAL always-set.yaml
 *          so composition stays tied to the committed substrate.
 */

import * as fs from 'fs';
import * as path from 'path';
import {
  composeAmbient,
  deriveGroundTruthDirective,
  parseAlwaysSet,
  serializeAmbientManifest,
  type AlwaysSetMember,
} from '../compose';
import type { AgentFrontmatter } from '../schema';

const ALWAYS_SET: AlwaysSetMember[] = [
  { id: 'personal-note', class: 'formative', delivery: { cc: 'file', kiro: 'file' } },
  { id: 'core-goals', class: 'formative', delivery: { cc: 'file', kiro: 'file' } },
  { id: 'agent-directory', class: 'capability-routing', delivery: { cc: 'file', kiro: 'file' } },
];

function frontmatter(overrides: Partial<AgentFrontmatter> = {}): AgentFrontmatter {
  return { agent: 'data', agentType: 'consumer', description: 'x', ...overrides };
}

describe('parseAlwaysSet — against the real committed substrate', () => {
  it('parses shared/always-set.yaml to the 9 identity docs', () => {
    const file = path.resolve(__dirname, '..', '..', '..', 'canonical', 'shared', 'always-set.yaml');
    const members = parseAlwaysSet(fs.readFileSync(file, 'utf8'));
    expect(members).toHaveLength(9);
    expect(members.map((m) => m.id)).toContain('personal-note');
    // every member carries a per-target delivery hint
    members.forEach((m) => {
      expect(m.delivery.cc).toBeDefined();
      expect(m.delivery.kiro).toBeDefined();
    });
  });
});

describe('composeAmbient — the union (Req 9 / P3)', () => {
  it('always includes every always-set member (P3: manifest ⊇ always-set)', () => {
    const manifest = composeAmbient({ agent: 'data', frontmatter: frontmatter(), alwaysSet: ALWAYS_SET, target: 'cc' });
    for (const m of ALWAYS_SET) {
      expect(manifest.members.some((x) => x.id === m.id && x.lane === 'shared')).toBe(true);
    }
  });

  it('adds per-agent governanceAsLaw refs on the per-agent lane', () => {
    const manifest = composeAmbient({
      agent: 'data',
      frontmatter: frontmatter({
        ambient: { governanceAsLaw: [{ id: 'platform-implementation-guidelines', owner: 'lina', assert: [] }] },
      }),
      alwaysSet: ALWAYS_SET,
      target: 'cc',
    });
    const member = manifest.members.find((m) => m.id === 'platform-implementation-guidelines');
    expect(member).toMatchObject({ lane: 'per-agent', class: 'governance-as-law', delivery: 'file' });
  });

  it('dedups an always-set id defensively — the shared lane wins', () => {
    const manifest = composeAmbient({
      agent: 'data',
      frontmatter: frontmatter({ ambient: { governanceAsLaw: [{ id: 'core-goals', owner: 'x', assert: [] }] } }),
      alwaysSet: ALWAYS_SET,
      target: 'cc',
    });
    const matches = manifest.members.filter((m) => m.id === 'core-goals');
    expect(matches).toHaveLength(1);
    expect(matches[0].lane).toBe('shared');
  });

  it('emits members sorted by id and honors per-target delivery', () => {
    const kiro = composeAmbient({ agent: 'data', frontmatter: frontmatter(), alwaysSet: ALWAYS_SET, target: 'kiro' });
    const ids = kiro.members.map((m) => m.id);
    expect(ids).toEqual([...ids].sort());
    expect(kiro.members[0].delivery).toBe('file');
  });

  it('produces a byte-identical manifest regardless of per-agent input order (determinism)', () => {
    const law = [
      { id: 'b-doc', owner: 'x', assert: [] },
      { id: 'a-doc', owner: 'y', assert: [] },
    ];
    const m1 = serializeAmbientManifest(
      composeAmbient({ agent: 'data', frontmatter: frontmatter({ ambient: { governanceAsLaw: law } }), alwaysSet: ALWAYS_SET, target: 'cc' })
    );
    const m2 = serializeAmbientManifest(
      composeAmbient({ agent: 'data', frontmatter: frontmatter({ ambient: { governanceAsLaw: [...law].reverse() } }), alwaysSet: ALWAYS_SET, target: 'cc' })
    );
    expect(m1).toBe(m2);
  });
});

describe('deriveGroundTruthDirective — verdicts honored as data (Req 10 AC2/AC3)', () => {
  it('none-trim-stale-snapshots suppresses artifact refs and carries trims', () => {
    const trims = [
      {
        artifact: 'dist/android/DesignTokens.android.kt',
        cue: { negative: 'do NOT read dist/android/*.kt', tool: 'get_token_details', mcp: 'application' as const },
        fires: 'unconditional' as const,
      },
    ];
    const d = deriveGroundTruthDirective({ verdict: 'none-trim-stale-snapshots', trims });
    expect(d).toMatchObject({ emitArtifactRefs: false, trims });
  });

  it('catalog-is-manifest carries the assembly-grain faithfulness verbs (Req 10 AC3)', () => {
    const d = deriveGroundTruthDirective({ verdict: 'catalog-is-manifest' });
    expect(d?.faithfulnessVerbs).toEqual(['get_component_full', 'get_component_health']);
  });

  it('empty is recorded as intentional', () => {
    expect(deriveGroundTruthDirective({ verdict: 'empty' })?.intentionalEmpty).toBe(true);
  });

  it('none-standing / collapses-into-catalog map to the base directive', () => {
    expect(deriveGroundTruthDirective({ verdict: 'none-standing' })).toEqual({
      verdict: 'none-standing',
      emitArtifactRefs: true,
    });
  });

  it('returns undefined when there is no ground-truth manifest', () => {
    expect(deriveGroundTruthDirective(undefined)).toBeUndefined();
  });
});
