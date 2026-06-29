/**
 * Legacy-path manifest producer — unit tests (Spec 119-A Task 3.1).
 *
 * Covers: both input sources represented (prompt grep-extract + Req-3 rename map),
 * de-dupe, the `..`-free assertion, template-placeholder skipping, and the
 * spaces-tolerant extraction.
 */

import * as fs from 'fs';
import * as path from 'path';
import {
  buildLegacyPathManifest,
  extractSteeringRefs,
  REQ3_RENAME_MAP,
  PROMPT_FILES,
} from '../generate-manifest';

const TMP = path.join(__dirname, 'fixtures');

/** A minimal doc whose derived id = slug of `name:`. */
function doc(name: string): string {
  return `---
name: ${name}
description: fixture
---

# ${name}

body
`;
}

/** Scaffold a fake project root with .kiro/steering + .kiro/agents. */
function scaffold(opts: {
  docs: Record<string, string>;       // basename → name (for frontmatter)
  prompts: Record<string, string>;    // prompt filename → text
}): string {
  const root = path.join(TMP, `proj-${Date.now()}-${Math.random().toString(36).slice(2)}`);
  const steering = path.join(root, '.kiro', 'steering');
  const agents = path.join(root, '.kiro', 'agents');
  fs.mkdirSync(steering, { recursive: true });
  fs.mkdirSync(agents, { recursive: true });
  for (const [basename, name] of Object.entries(opts.docs)) {
    fs.writeFileSync(path.join(steering, basename), doc(name));
  }
  for (const file of PROMPT_FILES) {
    fs.writeFileSync(path.join(agents, file), opts.prompts[file] ?? '');
  }
  return root;
}

afterAll(() => {
  if (fs.existsSync(TMP)) fs.rmSync(TMP, { recursive: true, force: true });
});

describe('extractSteeringRefs — spaces-tolerant extraction', () => {
  it('captures a space-bearing filename whole (bounded by quotes, not the space)', () => {
    const text = 'get_section({ path: ".kiro/steering/Cross-Platform vs Platform-Specific Decision Framework.md", heading: "x" })';
    expect(extractSteeringRefs(text)).toEqual([
      '.kiro/steering/Cross-Platform vs Platform-Specific Decision Framework.md',
    ]);
  });

  it('captures a backtick-bounded ref', () => {
    const text = 'see `.kiro/steering/Token-Governance.md` for details';
    expect(extractSteeringRefs(text)).toEqual(['.kiro/steering/Token-Governance.md']);
  });

  it('excludes bare-directory mentions (no `…md`)', () => {
    const text = 'You do NOT have write access to `.kiro/steering/` files';
    expect(extractSteeringRefs(text)).toEqual([]);
  });

  it('captures multiple refs on one line', () => {
    const text = '`.kiro/steering/A.md` and `.kiro/steering/B.md`';
    expect(extractSteeringRefs(text)).toEqual(['.kiro/steering/A.md', '.kiro/steering/B.md']);
  });
});

describe('buildLegacyPathManifest', () => {
  it('represents BOTH input sources (a prompt-only ref AND a rename-only key)', () => {
    // Token-Governance referenced by a prompt; Core Goals only in the rename map.
    const root = scaffold({
      docs: {
        'Token-Governance.md': 'Token Governance',
        'Core Goals.md': 'Core Goals',
      },
      prompts: {
        'ada-prompt.md': 'use `.kiro/steering/Token-Governance.md`',
      },
    });

    const { manifest, promptRefCount } = buildLegacyPathManifest(root);
    const keys = manifest.entries.map((e) => e.legacyPath);

    // prompt-source ref
    expect(keys).toContain('.kiro/steering/Token-Governance.md');
    // rename-map-only key (Core Goals is an identity doc never referenced by a prompt)
    expect(keys).toContain('.kiro/steering/Core Goals.md');

    expect(manifest.entries.find((e) => e.legacyPath.endsWith('Token-Governance.md'))?.id)
      .toBe('token-governance');
    expect(manifest.entries.find((e) => e.legacyPath.endsWith('Core Goals.md'))?.id)
      .toBe('core-goals');

    expect(promptRefCount).toBe(1); // 1 distinct prompt ref
    expect(manifest.transitionOnly).toBe(true);
  });

  it('de-dupes a doc referenced by multiple prompts AND present in the rename map', () => {
    // "Completion Documentation Guide.md" is BOTH a prompt ref AND a rename key.
    const root = scaffold({
      docs: { 'Completion Documentation Guide.md': 'Completion Documentation Guide' },
      prompts: {
        'ada-prompt.md': 'see `.kiro/steering/Completion Documentation Guide.md`',
        'lina-prompt.md': 'also `.kiro/steering/Completion Documentation Guide.md`',
      },
    });

    const { manifest } = buildLegacyPathManifest(root);
    const matches = manifest.entries.filter(
      (e) => e.legacyPath === '.kiro/steering/Completion Documentation Guide.md',
    );
    expect(matches).toHaveLength(1); // de-duped despite 2 prompt refs + rename map
  });

  it('skips template placeholders (no target doc), does NOT emit them', () => {
    const root = scaffold({
      docs: { 'Token-Governance.md': 'Token Governance' },
      prompts: {
        'lina-prompt.md':
          'real `.kiro/steering/Token-Governance.md` and template `.kiro/steering/Component-Family-{Name}.md`',
      },
    });

    const { manifest, skipped } = buildLegacyPathManifest(root);
    const keys = manifest.entries.map((e) => e.legacyPath);
    expect(keys).not.toContain('.kiro/steering/Component-Family-{Name}.md');
    expect(skipped.some((s) => s.legacyPath.includes('{Name}'))).toBe(true);
  });

  it('skips a ref whose target file does not exist on disk', () => {
    const root = scaffold({
      docs: {},
      prompts: { 'ada-prompt.md': '`.kiro/steering/Does-Not-Exist.md`' },
    });
    const { manifest, skipped } = buildLegacyPathManifest(root);
    expect(manifest.entries).toHaveLength(0);
    // The missing prompt ref is skipped (so are the 10 rename keys, since none of
    // those files exist in this bare scaffold — that's correct producer behavior).
    expect(skipped.some((s) => s.legacyPath === '.kiro/steering/Does-Not-Exist.md')).toBe(true);
  });

  it('asserts every emitted legacyPath is `..`-free (none of the natural keys have `..`)', () => {
    const root = scaffold({
      docs: { 'Token-Governance.md': 'Token Governance' },
      prompts: { 'ada-prompt.md': '`.kiro/steering/Token-Governance.md`' },
    });
    const { manifest } = buildLegacyPathManifest(root);
    for (const e of manifest.entries) {
      expect(e.legacyPath.includes('..')).toBe(false);
    }
  });

  it('THROWS if a `..`-bearing key would be emitted (guard-ordering invariant)', () => {
    // Inject a `..`-bearing ref via a prompt; the matching file is created at the
    // traversed location so it resolves to an id and reaches the `..` assertion.
    const root = scaffold({
      docs: { 'Token-Governance.md': 'Token Governance' },
      prompts: { 'ada-prompt.md': '`.kiro/steering/../steering/Token-Governance.md`' },
    });
    expect(() => buildLegacyPathManifest(root)).toThrow(/\.\./);
  });

  it('produces a deterministic generatedAt via the injected clock', () => {
    const root = scaffold({
      docs: { 'Token-Governance.md': 'Token Governance' },
      prompts: { 'ada-prompt.md': '`.kiro/steering/Token-Governance.md`' },
    });
    const { manifest } = buildLegacyPathManifest(root, undefined, () => 'FIXED');
    expect(manifest.generatedAt).toBe('FIXED');
  });

  it('exposes the literal Req-3 rename set (all 10 space-bearing originals)', () => {
    expect(Object.keys(REQ3_RENAME_MAP)).toHaveLength(10);
    expect(REQ3_RENAME_MAP['Core Goals.md']).toBe('core-goals.md');
  });
});
