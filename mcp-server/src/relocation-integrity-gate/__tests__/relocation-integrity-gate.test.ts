/**
 * Unit tests for the Relocation-Integrity Gate core — Spec 119-A, Task 11.
 *
 * Covers the pure analyzers (ref classification, identity-vs-served routing,
 * coupling assertion shape, family-guidance, scope) and the full-gate aggregation
 * against the live repo (the integration leg — the 119-A exit check itself).
 */

import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import {
  classifyReference,
  isTemplateRef,
  identityIdForRef,
  extractSteeringRefs,
  assertIdentityPresence,
  assertFamilyGuidance,
  assertMustFixCouplings,
  assertScope,
  stripComments,
  runRelocationIntegrityGate,
  scanPromptReferences,
  LOCKED_IDENTITY_IDS,
  DEFAULT_PROJECT_ROOT,
  DEFAULT_GOVERNANCE_DIR,
} from '../relocation-integrity-gate';
import { DocumentIndexer } from '../../indexer/DocumentIndexer';

describe('classifyReference — identity vs served vs template (Req 8 AC5)', () => {
  it('classifies a placeholder path-shape as template', () => {
    expect(isTemplateRef('.kiro/steering/Token-Family-{Name}.md')).toBe(true);
    expect(classifyReference('.kiro/steering/Component-Family-{FamilyName}.md')).toBe('template');
    expect(classifyReference('.kiro/steering/Token-Family-{Name}.md')).toBe('template');
  });

  it('classifies a locked identity doc ref as identity (both kebab + Title-Case)', () => {
    expect(classifyReference('.kiro/steering/core-goals.md')).toBe('identity');
    expect(classifyReference('.kiro/steering/Core Goals.md')).toBe('identity');
    expect(classifyReference('.kiro/steering/Agent-Directory.md')).toBe('identity');
    expect(classifyReference('.kiro/steering/AI-Collaboration-Principles.md')).toBe('identity');
  });

  it('classifies a non-identity governance doc ref as served', () => {
    expect(classifyReference('.kiro/steering/Token-Governance.md')).toBe('served');
    expect(classifyReference('.kiro/steering/Rosetta-System-Architecture.md')).toBe('served');
  });

  it('maps an identity ref to its locked id', () => {
    expect(identityIdForRef('.kiro/steering/Core Goals.md')).toBe('core-goals');
    expect(identityIdForRef('.kiro/steering/Agent-Directory.md')).toBe('agent-directory');
    expect(identityIdForRef('.kiro/steering/Token-Governance.md')).toBeUndefined();
  });

  it('the locked identity set has exactly the 9 Req 6 AC1 members', () => {
    expect(LOCKED_IDENTITY_IDS.size).toBe(9);
    expect(LOCKED_IDENTITY_IDS.has('agent-directory')).toBe(true);
    expect(LOCKED_IDENTITY_IDS.has('task-completion-protocol')).toBe(true);
  });
});

describe('extractSteeringRefs — spaces-tolerant grep (Req 8 AC1)', () => {
  it('extracts plain and space-bearing steering refs', () => {
    const content = [
      'see `.kiro/steering/Token-Governance.md` and',
      'get_section({ path: ".kiro/steering/Cross-Platform vs Platform-Specific Decision Framework.md" })',
      'a template: ".kiro/steering/Token-Family-{Name}.md"',
    ].join('\n');
    const refs = extractSteeringRefs(content);
    expect(refs).toContain('.kiro/steering/Token-Governance.md');
    expect(refs).toContain(
      '.kiro/steering/Cross-Platform vs Platform-Specific Decision Framework.md',
    );
    expect(refs).toContain('.kiro/steering/Token-Family-{Name}.md');
  });

  it('does not capture a bare-directory mention without a .md', () => {
    const refs = extractSteeringRefs('the .kiro/steering/ directory holds docs');
    expect(refs).toEqual([]);
  });
});

describe('assertIdentityPresence — static presence over a synthetic tree (Req 8 AC5)', () => {
  let root: string;

  beforeEach(() => {
    root = fs.mkdtempSync(path.join(os.tmpdir(), 'rig-id-'));
    fs.mkdirSync(path.join(root, '.kiro/steering'), { recursive: true });
  });
  afterEach(() => fs.rmSync(root, { recursive: true, force: true }));

  function writeIdentity(file: string, id: string) {
    fs.writeFileSync(
      path.join(root, '.kiro/steering', file),
      `---\nid: ${id}\n---\n# ${id}\n`,
    );
  }

  it('verifies the full locked set even when no prompt references it', () => {
    for (const id of LOCKED_IDENTITY_IDS) writeIdentity(`${id}.md`, id);
    const checks = assertIdentityPresence(root, new Set());
    expect(checks).toHaveLength(LOCKED_IDENTITY_IDS.size);
    expect(checks.every((c) => c.inLockedSet && c.fileExists)).toBe(true);
  });

  it('flags a missing identity doc (fileExists=false)', () => {
    for (const id of LOCKED_IDENTITY_IDS) {
      if (id !== 'agent-directory') writeIdentity(`${id}.md`, id);
    }
    const checks = assertIdentityPresence(root, new Set());
    const ad = checks.find((c) => c.id === 'agent-directory')!;
    expect(ad.inLockedSet).toBe(true);
    expect(ad.fileExists).toBe(false);
  });

  it('flags a referenced id that is NOT in the locked set (inLockedSet=false)', () => {
    for (const id of LOCKED_IDENTITY_IDS) writeIdentity(`${id}.md`, id);
    const checks = assertIdentityPresence(root, new Set(['not-locked']));
    const nl = checks.find((c) => c.id === 'not-locked')!;
    expect(nl.inLockedSet).toBe(false);
  });
});

describe('assertFamilyGuidance — top-level companion resolution (Req 8 AC6)', () => {
  let root: string;
  beforeEach(() => {
    root = fs.mkdtempSync(path.join(os.tmpdir(), 'rig-fg-'));
    fs.mkdirSync(path.join(root, 'family-guidance'), { recursive: true });
    fs.mkdirSync(path.join(root, 'governance'), { recursive: true });
  });
  afterEach(() => fs.rmSync(root, { recursive: true, force: true }));

  it('returns zero warnings when every top-level companion exists', () => {
    fs.writeFileSync(path.join(root, 'governance/Component-Family-Button.md'), '# btn');
    fs.writeFileSync(
      path.join(root, 'family-guidance/button.yaml'),
      'family: button\ncompanion: "governance/Component-Family-Button.md"\n',
    );
    const axis = assertFamilyGuidance(root);
    expect(axis.newCompanionWarnings).toEqual([]);
    expect(axis.topLevelCompanionsChecked).toBe(1);
  });

  it('warns when a top-level companion target does not exist', () => {
    fs.writeFileSync(
      path.join(root, 'family-guidance/button.yaml'),
      'family: button\ncompanion: "governance/Missing.md"\n',
    );
    const axis = assertFamilyGuidance(root);
    expect(axis.newCompanionWarnings).toHaveLength(1);
    expect(axis.newCompanionWarnings[0]).toContain('button.yaml');
  });

  it('is blind to nested (composesWithFamilies) companions — only top-level parsed', () => {
    fs.writeFileSync(path.join(root, 'governance/Component-Family-Chip.md'), '# chip');
    fs.writeFileSync(
      path.join(root, 'family-guidance/chips.yaml'),
      [
        'family: chips',
        'companion: "governance/Component-Family-Chip.md"',
        'composesWithFamilies:',
        '  - family: badges',
        '    companion: "governance/Nested-Missing.md"',
      ].join('\n'),
    );
    const axis = assertFamilyGuidance(root);
    // The nested missing companion must NOT warn (gate-blind, by design).
    expect(axis.newCompanionWarnings).toEqual([]);
    expect(axis.topLevelCompanionsChecked).toBe(1);
  });
});

describe('assertMustFixCouplings — shape + naming (Req 8 AC7)', () => {
  it('produces one check per Bucket A surface, each with surface+remediated+detail', () => {
    const checks = assertMustFixCouplings(DEFAULT_PROJECT_ROOT);
    expect(checks.length).toBe(7);
    for (const c of checks) {
      expect(typeof c.surface).toBe('string');
      expect(typeof c.remediated).toBe('boolean');
      expect(typeof c.detail).toBe('string');
    }
  });
});

describe('assertMustFixCouplings — legs A4/A7 assert the Spec 123 install shape (fixture-tree bites)', () => {
  // Issue 2026-10-01-relocation-integrity-gate-vs-123-install-shape. Every bite mutates a
  // FIXTURE tree (never the live repo files) from a known-green 123-shaped baseline, so a
  // red can only come from the mutation. The baseline test pins that the fixture itself is green.
  const A4 = 'src/cli/init.ts + src/cli/designerpunk.ts';
  const A7 = 'package.json files[] + init template + Manifest COPY_ROOTS';
  const EIGHT = [...LOCKED_IDENTITY_IDS].filter((id) => id !== 'personal-note').sort();
  const fileFor = (id: string) => `${id}.md`;

  const INIT_GREEN = [
    "import { emitAgentLayer } from './attach';",
    '// historical: the release-1 copies of governance and .kiro/steering were REMOVED',
    'export async function init() {',
    "  const layer = await emitAgentLayer({ target: 'cc' });",
    '  return layer;',
    '}',
    '',
  ].join('\n');
  const DP_GREEN = "const docs = path.join(pkgRoot, 'governance');\n";
  const MANIFEST_GREEN =
    "export const COPY_ROOTS = ['.kiro/agents', '.kiro/steering', 'governance', '.kiro/skills'] as const;\n";
  const TEMPLATE_GREEN = '{"MCP_STEERING_DIR":"./node_modules/@3fn/core/governance"}\n';

  let root: string;
  const put = (rel: string, content: string) => {
    fs.mkdirSync(path.dirname(path.join(root, rel)), { recursive: true });
    fs.writeFileSync(path.join(root, rel), content);
  };
  const greenFiles = (): string[] => [
    'governance/',
    ...EIGHT.map((id) => `.kiro/steering/${fileFor(id)}`),
    'src/cli/templates/',
  ];
  const writePkg = (files: string[]) => put('package.json', JSON.stringify({ name: 'fixture', files }, null, 2));
  const coupling = (surface: string) => assertMustFixCouplings(root).find((c) => c.surface === surface)!;

  beforeEach(() => {
    root = fs.mkdtempSync(path.join(os.tmpdir(), 'rig-123-'));
    // identity docs on disk (all 9, id by frontmatter)
    for (const id of LOCKED_IDENTITY_IDS) put(`.kiro/steering/${fileFor(id)}`, `---\nid: ${id}\n---\n# ${id}\n`);
    writePkg(greenFiles());
    put('src/cli/init.ts', INIT_GREEN);
    put('src/cli/designerpunk.ts', DP_GREEN);
    put('src/cli/sync/Manifest.ts', MANIFEST_GREEN);
    put('src/cli/templates/mcp-config.json.template', TEMPLATE_GREEN);
    // legs A1/A2/A3/A5/A6 read these; copy the live files (read-only) so the call completes
    for (const rel of [
      '.kiro/sync-manifest.json',
      '.cursor/mcp.json',
      'mcp-server/src/index.ts',
      'src/figma/VariantAnalyzer.ts',
      'src/figma/DesignExtractor.ts',
      'scripts/extract-component-meta.ts',
    ]) {
      put(rel, fs.readFileSync(path.join(DEFAULT_PROJECT_ROOT, rel), 'utf-8'));
    }
    fs.mkdirSync(path.join(root, '.kiro/agents'), { recursive: true });
  });
  afterEach(() => fs.rmSync(root, { recursive: true, force: true }));

  it('baseline: the 123-shaped fixture is green on A4 and A7 (so every bite below is the mutation)', () => {
    expect(coupling(A4).remediated).toBe(true);
    expect(coupling(A7).remediated).toBe(true);
    expect(assertMustFixCouplings(root)).toHaveLength(7);
  });

  it('A7 bites: restoring the .kiro/steering/ directory glob goes red', () => {
    writePkg([...greenFiles(), '.kiro/steering/']);
    const c = coupling(A7);
    expect(c.remediated).toBe(false);
    expect(c.detail).toMatch(/no-steering-glob=false/);
    // and the glob alone, with the eight dropped, is also red
    writePkg(['governance/', '.kiro/steering/**']);
    expect(coupling(A7).remediated).toBe(false);
  });

  it('A7 bites: adding .kiro/steering/personal-note.md to files[] goes red', () => {
    writePkg([...greenFiles(), '.kiro/steering/personal-note.md']);
    const c = coupling(A7);
    expect(c.remediated).toBe(false);
    expect(c.detail).toMatch(/no-personal-note=false/);
  });

  it('A7 bites: dropping any one of the eight identity docs from files[] goes red', () => {
    for (const id of EIGHT) {
      writePkg(greenFiles().filter((f) => f !== `.kiro/steering/${fileFor(id)}`));
      const c = coupling(A7);
      expect(c.remediated).toBe(false);
      expect(c.detail).toMatch(/identity-by-path=7\/8/);
    }
  });

  it('A7 bites: an identity entry whose file is absent on disk goes red (path must exist)', () => {
    fs.rmSync(path.join(root, '.kiro/steering', fileFor('core-goals')));
    expect(coupling(A7).remediated).toBe(false);
  });

  it('A4 bites: a copyDir of the governance corpus in init.ts goes red', () => {
    put('src/cli/init.ts', INIT_GREEN + "copyDir(path.join(pkgRoot, 'governance'), path.join(dest, 'governance'));\n");
    const c = coupling(A4);
    expect(c.remediated).toBe(false);
    expect(c.detail).toMatch(/init copies no package corpus \(governance\/\.kiro\/steering\/\.kiro\/agents\)=false/);
    // the other two corpus roots trip it the same way
    put('src/cli/init.ts', INIT_GREEN + "copyDir(path.join(pkgRoot, '.kiro/steering'), x);\n");
    expect(coupling(A4).remediated).toBe(false);
    put('src/cli/init.ts', INIT_GREEN + 'copyDir(path.join(pkgRoot, `.kiro/agents/`), x);\n');
    expect(coupling(A4).remediated).toBe(false);
  });

  it('A4 bites: removing the emitAgentLayer( call from init.ts goes red', () => {
    put('src/cli/init.ts', INIT_GREEN.replace('await emitAgentLayer({ target: \'cc\' })', 'null'));
    const c = coupling(A4);
    expect(c.remediated).toBe(false);
    expect(c.detail).toMatch(/init emits agent layer=false/);
  });

  it('A4 vacuity regression: a corpus-root name that appears ONLY in a comment stays green', () => {
    put(
      'src/cli/init.ts',
      INIT_GREEN +
        "// copyDir(path.join(pkgRoot, 'governance'), x);  (retired release-1 row)\n" +
        "/* the '.kiro/steering' and '.kiro/agents' copies are REMOVED */\n",
    );
    expect(coupling(A4).remediated).toBe(true);
  });

  it('A4: comment-stripping respects strings (a // inside a literal is not a comment)', () => {
    put('src/cli/init.ts', INIT_GREEN + "const u = 'http://x'; copyDir(path.join(pkgRoot, 'governance'), u);\n");
    expect(coupling(A4).remediated).toBe(false);
  });

  it('A4 designerpunk.ts half unchanged: a steering spawn, or a missing governance spawn, goes red', () => {
    put('src/cli/designerpunk.ts', DP_GREEN + "const s = path.join(pkgRoot, '.kiro/steering');\n");
    expect(coupling(A4).remediated).toBe(false);
    put('src/cli/designerpunk.ts', 'const nothing = 1;\n');
    expect(coupling(A4).remediated).toBe(false);
  });

  it('A7 COPY_ROOTS (release-1 copy roots): dropping governance or .kiro/steering goes red', () => {
    put('src/cli/sync/Manifest.ts', "export const COPY_ROOTS = ['.kiro/agents', '.kiro/steering'] as const;\n");
    expect(coupling(A7).remediated).toBe(false);
    put('src/cli/sync/Manifest.ts', "export const COPY_ROOTS = ['.kiro/agents', 'governance'] as const;\n");
    expect(coupling(A7).remediated).toBe(false);
    // a COPY_ROOTS that only appears in a comment does not count
    put('src/cli/sync/Manifest.ts', "// COPY_ROOTS = ['.kiro/steering', 'governance']\nexport const COPY_ROOTS = ['.kiro/agents'] as const;\n");
    expect(coupling(A7).remediated).toBe(false);
  });

  it('A7 template sub-check unchanged: steering dir or dead tool in the template goes red', () => {
    put('src/cli/templates/mcp-config.json.template', '{"MCP_STEERING_DIR":".kiro/steering","governance":1}\n');
    expect(coupling(A7).remediated).toBe(false);
    put('src/cli/templates/mcp-config.json.template', '{"MCP_STEERING_DIR":"governance","t":"get_documentation_map"}\n');
    expect(coupling(A7).remediated).toBe(false);
  });

  it('stripComments: removes line and block comments, keeps literals and regexes', () => {
    const out = stripComments(
      "const a = 'x'; // gone\n/* gone\n too */ const b = \"//kept\"; const r = /a\\/\\/b[/]/g; const t = `//kept`;\n",
    );
    expect(out).not.toMatch(/gone/);
    expect(out).toContain("'x'");
    expect(out).toContain('"//kept"');
    expect(out).toContain('`//kept`');
    expect(out).toContain('/a\\/\\/b[/]/g');
  });
});

describe('assertScope — critical-core only, severable excluded (Req 8 AC8)', () => {
  it('asserts the AX design exists and names the excluded severable surfaces', () => {
    const scope = assertScope(DEFAULT_PROJECT_ROOT);
    expect(scope.axDesignExists).toBe(true);
    expect(scope.excluded.join(' ')).toMatch(/manifest BUILD/i);
    expect(scope.excluded.join(' ')).toMatch(/capability-catalog GENERATION/i);
  });
});

describe('runRelocationIntegrityGate — full gate (the 119-A exit check, Req 8 AC9)', () => {
  it('PASSES across all axes against the live repo', async () => {
    const result = await runRelocationIntegrityGate();
    if (!result.pass) {
      // surface the named failures in the assertion message for fast triage
      throw new Error('Gate FAILED:\n' + result.unresolved.join('\n'));
    }
    expect(result.pass).toBe(true);
    expect(result.unresolved).toEqual([]);
  });

  it('resolves a served prompt ref via legacy-fallback — fixture prompt (Req 8 AC1–AC3)', async () => {
    // Anti-vacuity moved OFF live data (2026-07-11, Spec 122 U6): the served floor
    // (≥1 served `.kiro/steering/*.md` ref in the REAL agent prompts) died by progress —
    // the 122 cutovers regenerate agent prompts into runtime-neutral MCP-cue form, removing
    // `.kiro/steering/*.md` file references. With Leonardo (U6) cut over, ZERO live prompts
    // carry served refs (same class as the template floor's death at U3). The served-
    // resolution behavior is now exercised NON-VACUOUSLY against a fixture prompt carrying a
    // real relocated-doc ref, resolved through a real indexer (frozen legacy manifest seeded);
    // the live leg below keeps the every-served-ref-resolves invariant without an inventory floor.
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'rig-served-'));
    const indexer = new DocumentIndexer();
    await indexer.indexDirectory(DEFAULT_GOVERNANCE_DIR); // seeds the frozen legacy manifest at its tail
    try {
      fs.mkdirSync(path.join(root, '.kiro/agents'), { recursive: true });
      fs.writeFileSync(
        path.join(root, '.kiro/agents', 'fixture-prompt.md'),
        '# Fixture\n\nSee `get_section({ path: ".kiro/steering/Token-Governance.md", heading: "Token Usage Governance" })`.\n',
      );
      const scan = scanPromptReferences(root, indexer);
      const served = scan.references.filter((r) => r.role === 'served');
      expect(served.length).toBeGreaterThanOrEqual(1);
      expect(served.every((r) => r.resolved)).toBe(true);
      expect(served.every((r) => r.strategy === 'legacy-fallback')).toBe(true);
    } finally {
      fs.rmSync(root, { recursive: true, force: true });
    }
  });

  it('live prompts: every served ref (if any) resolves via legacy-fallback (Req 8 AC1–AC3)', async () => {
    const result = await runRelocationIntegrityGate();
    const served = result.references.filter((r) => r.role === 'served');
    // NO count floor: the live corpus legitimately holds zero served refs since U6 (the
    // fixture leg above covers non-vacuous resolution). If any served refs exist, each must
    // resolve via legacy-fallback; the resolutionMechanism description holds regardless.
    expect(served.every((r) => r.resolved)).toBe(true);
    expect(served.every((r) => r.strategy === 'legacy-fallback')).toBe(true);
    expect(result.resolutionMechanism).toMatch(/legacy-fallback/);
  });

  it('excludes template placeholders from pass/fail — fixture prompt (Req 8 AC1 — not real refs)', () => {
    // Anti-vacuity moved OFF live data (2026-07-11, Spec 122 U3): the live floor
    // (≥1 template in the real prompts) died by progress — Ada's U2 regeneration dropped
    // `Token-Family-{Name}.md` (3 → 2) and Lina's U3 regeneration removed the corpus's
    // LAST template placeholders (`Component-Family-{Name}.md` / `{FamilyName}`, 2 → 0),
    // exactly as this test's old comment predicted. The exclusion behavior is now
    // exercised non-vacuously via the extracted reference-axis seam on a fixture prompt;
    // the live leg below keeps the invariant without an inventory floor.
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'rig-tpl-'));
    try {
      fs.mkdirSync(path.join(root, '.kiro/agents'), { recursive: true });
      fs.writeFileSync(
        path.join(root, '.kiro/agents', 'fixture-prompt.md'),
        '# Fixture\n\nSee `get_document_summary({ path: ".kiro/steering/Component-Family-{Name}.md" })`.\n',
      );
      // A template-only scan must never touch the resolver — throwing stub proves it.
      const neverCalled = {
        resolveRef: (): never => {
          throw new Error('resolveRef must not be called for a template placeholder');
        },
      };
      const scan = scanPromptReferences(root, neverCalled);
      const templates = scan.references.filter((r) => r.role === 'template');
      expect(templates.length).toBe(1);
      expect(templates[0].ref).toBe('.kiro/steering/Component-Family-{Name}.md');
      expect(templates[0].resolved).toBe(false);
      // a template ref must never appear in unresolved — the exclusion under test
      expect(scan.unresolved).toEqual([]);
    } finally {
      fs.rmSync(root, { recursive: true, force: true });
    }
  });

  it('live prompts: any template placeholder stays excluded from unresolved (Req 8 AC1)', async () => {
    const result = await runRelocationIntegrityGate();
    const templates = result.references.filter((r) => r.role === 'template');
    // NO count floor: the live corpus legitimately holds zero placeholders since U3
    // (see the fixture leg above for the non-vacuous exclusion assertion; the classifier
    // routing itself is directly covered by the classifyReference tests).
    for (const t of templates) {
      expect(result.unresolved.some((u) => u.includes(t.ref))).toBe(false);
    }
  });

  it('verifies all 9 locked identity docs by static presence (Req 8 AC5)', async () => {
    const result = await runRelocationIntegrityGate();
    expect(result.identity.length).toBeGreaterThanOrEqual(9);
    expect(result.summary.identityVerified).toBe(9);
  });

  it('remediates all 7 must-fix coupling surfaces (Req 8 AC7)', async () => {
    const result = await runRelocationIntegrityGate();
    expect(result.summary.couplingsRemediated).toBe(result.summary.couplingsTotal);
    expect(result.summary.couplingsTotal).toBe(7);
  });

  it('reports zero new family-guidance companion warnings (Req 8 AC6)', async () => {
    const result = await runRelocationIntegrityGate();
    expect(result.familyGuidance.newCompanionWarnings).toEqual([]);
  });
});
