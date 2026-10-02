/**
 * consumer-entry.parity.test.ts — Spec 123 Task 16.1 (amendment 2026-09-30: "the parity test:
 * `emitConsumer` over the built `dist/consumer-canonical` equals `canonical/_consumer-output/<target>/`,
 * with sidecars and roots stripped").
 *
 * This test is the REFERENT of Task 16 criterion 2's "expected" (Lina Q-d/Q-j). The
 * guarded rendering is what the signers signed. This test shows that the consumer lane, reading
 * only what ships, emits exactly it:
 *
 *   1. PREPACK = THE GUARDED DERIVE: `buildConsumerCanonical` (what `npm run build:consumer-canonical`
 *      runs) writes `agents/*.md` and `shared/shared-catalog.yaml` byte-equal to
 *      `canonical/_consumer-output/_canonical/`, the steward's own derive() call site.
 *   2. LANE = THE GUARDED RENDERING, per declared target: every file under
 *      `canonical/_consumer-output/<target>/` (sidecars stripped, the root prefix stripped) is
 *      emitted byte-equal, and none is missing.
 *   3. THE REST OF THE EMISSION IS NAMED, never silently extra: the skill trees, which are
 *      byte-equal to this repo's guarded steward skill trees at the same paths, and filtered to
 *      the rows a shipped charter names; plus, on CC only, the `CLAUDE.md` region (grain
 *      `region`): one `@`-import line per always-set member, in always-set order.
 *
 * Scope: parity shows the lane emits what was signed, not that the signed rendering is right.
 * That is the signers' question, and G2's.
 */

import * as fs from 'fs';
import * as path from 'path';
import { load as loadYaml } from 'js-yaml';
import { CONSUMER_CANONICAL_DIR, emitConsumer, TEMPLATE_MEMBER_PATH, TEMPLATE_MEMBERS, type EmitConsumerResult } from '../consumer-entry';
import { loadConsumerProfile } from '../consumer-profile';
import { makePackageRoot, readTree, REPO_ROOT } from './consumer-entry.helpers';

const TARGETS = loadConsumerProfile(REPO_ROOT).targets;
const GUARDED = 'canonical/_consumer-output';

let tmp: string;
let packageRoot: string;
let consumerRoot: string;
const emitted = new Map<string, EmitConsumerResult>();

beforeAll(async () => {
  ({ tmp, packageRoot, consumerRoot } = makePackageRoot());
  for (const target of TARGETS) emitted.set(target, await emitConsumer({ packageRoot, consumerRoot, target, mode: 'attach' }));
});

afterAll(() => {
  fs.rmSync(tmp, { recursive: true, force: true });
});

describe('prepack derive = the guarded derive (canonical/_consumer-output/_canonical/)', () => {
  test('agents/*.md and shared/shared-catalog.yaml are byte-equal', () => {
    const built = readTree(path.join(packageRoot, CONSUMER_CANONICAL_DIR));
    const guarded = readTree(path.join(REPO_ROOT, GUARDED, '_canonical'));
    const compared = [...guarded.keys()].filter((p) => p.startsWith('agents/') || p === 'shared/shared-catalog.yaml');
    expect(compared.length).toBeGreaterThan(1);
    for (const p of compared) expect({ p, content: built.get(p) }).toEqual({ p, content: guarded.get(p) });
    // and nothing extra under agents/
    expect([...built.keys()].filter((p) => p.startsWith('agents/')).sort()).toEqual(compared.filter((p) => p.startsWith('agents/')).sort());
  });

  test('the shipped skills map keeps exactly the rows a shipped charter names', () => {
    const built = readTree(path.join(packageRoot, CONSUMER_CANONICAL_DIR));
    const named = new Set<string>();
    for (const [p, text] of built) {
      if (!p.startsWith('agents/')) continue;
      const fm = loadYaml(text.split('---\n')[1]) as { skills?: string[] };
      for (const s of fm.skills ?? []) named.add(s);
    }
    const rows = (loadYaml(built.get('shared/skills-map.yaml') as string) as { rows: { canonical: string }[] }).rows;
    expect(rows.map((r) => path.basename(r.canonical)).sort()).toEqual([...named].sort());
    expect(rows.some((r) => r.canonical === 'skills/_fixture-skill')).toBe(false);
  });
});

describe.each(TARGETS)('emitConsumer over the built dist/consumer-canonical › %s', (target) => {
  const guardedFor = (): Map<string, string> => readTree(path.join(REPO_ROOT, GUARDED, target));

  test('every guarded file is emitted, byte-equal (sidecars and the root prefix stripped)', () => {
    const guarded = guardedFor();
    const files = new Map(emitted.get(target)!.files.map((f) => [f.path, f.content]));
    expect(guarded.size).toBeGreaterThan(0);
    const missing = [...guarded.keys()].filter((p) => !files.has(p));
    const differing = [...guarded.keys()].filter((p) => files.has(p) && files.get(p) !== guarded.get(p));
    expect({ missing, differing }).toEqual({ missing: [], differing: [] });
  });

  test('everything else emitted is named: skill trees (= the steward trees) and, on CC, the CLAUDE.md region', () => {
    const guarded = guardedFor();
    const result = emitted.get(target)!;
    const extra = result.files.filter((f) => !guarded.has(f.path));
    const skillDir = target === 'cc' ? '.claude/skills/' : '.kiro/skills/';
    const skills = extra.filter((f) => f.path.startsWith(skillDir));
    const others = extra.filter((f) => !f.path.startsWith(skillDir));
    expect(skills.length).toBeGreaterThan(0);
    for (const f of skills) {
      expect(f.grain).toBe('file');
      // The steward's own generated skill tree at the same path is a guarded output (122).
      expect({ p: f.path, content: f.content }).toEqual({ p: f.path, content: fs.readFileSync(path.join(REPO_ROOT, f.path), 'utf8') });
    }
    expect(skills.some((f) => f.path.includes('_fixture-skill'))).toBe(false);

    if (target === 'cc') {
      expect(others.map((f) => [f.path, f.grain])).toEqual([['CLAUDE.md', 'region']]);
      const ids = (loadYaml(fs.readFileSync(path.join(REPO_ROOT, 'canonical/shared/always-set.yaml'), 'utf8')) as { alwaysSet: { id: string }[] }).alwaysSet.map((m) => m.id);
      const expected = ids.map((id) => `@${TEMPLATE_MEMBERS.includes(id) ? TEMPLATE_MEMBER_PATH : `.claude/identity/designerpunk-${id}.md`}\n`).join('');
      expect(others[0].content).toBe(expected);
    } else {
      expect(others).toEqual([]);
    }
    expect(result.warnings).toEqual([]);
  });
});
