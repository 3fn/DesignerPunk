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
  runRelocationIntegrityGate,
  LOCKED_IDENTITY_IDS,
  DEFAULT_PROJECT_ROOT,
} from '../relocation-integrity-gate';

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

  it('resolves every served prompt ref via the legacy-fallback (Req 8 AC1–AC3)', async () => {
    const result = await runRelocationIntegrityGate();
    const served = result.references.filter((r) => r.role === 'served');
    expect(served.length).toBeGreaterThan(0);
    expect(served.every((r) => r.resolved)).toBe(true);
    expect(served.every((r) => r.strategy === 'legacy-fallback')).toBe(true);
    expect(result.resolutionMechanism).toMatch(/legacy-fallback/);
  });

  it('excludes template placeholders from pass/fail (Req 8 AC1 — not real refs)', async () => {
    const result = await runRelocationIntegrityGate();
    const templates = result.references.filter((r) => r.role === 'template');
    expect(templates.length).toBe(3);
    // a template ref must never appear in unresolved
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
