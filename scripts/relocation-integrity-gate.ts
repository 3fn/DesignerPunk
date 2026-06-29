#!/usr/bin/env tsx
/**
 * relocation-integrity-gate.ts — Spec 119-A, Task 11 (the 119-A EXIT CHECK).
 *
 * Thin CLI wrapper over the testable core in
 * `mcp-server/src/relocation-integrity-gate/relocation-integrity-gate.ts`.
 *
 * Runs the four-axis relocation-integrity gate (design Component 5 / Req 8) and
 * emits a clear PASS/FAIL with per-axis detail + named failures:
 *   - per-reference resolution axis  (the 8 prompts; legacy via the AC3 fallback)
 *   - identity-presence axis         (static presence, NOT MCP — Req 8 AC5)
 *   - must-fix coupling axis          (coupling-sweep Bucket A — Req 8 AC7)
 *   - family-guidance health axis     (zero new top-level companion warnings — AC6)
 *   - scope assertion                 (critical-core only; severable excluded — AC8)
 *
 * On PASS it stands as 119-A's relocation exit gate (Req 8 AC9), replacing the
 * dissolved Phase-10 atomicity guarantee. Exit code 0 on PASS, 1 on FAIL.
 *
 *   npx tsx scripts/relocation-integrity-gate.ts
 */

import {
  runRelocationIntegrityGate,
  GateResult,
} from '../mcp-server/src/relocation-integrity-gate/relocation-integrity-gate';

function fmt(r: GateResult): string {
  const L: string[] = [];
  L.push('');
  L.push('============================================================');
  L.push('  RELOCATION-INTEGRITY GATE — Spec 119-A exit check (Req 8)');
  L.push('============================================================');

  // --- Axis 1: per-reference resolution ---
  L.push('');
  L.push('--- Axis 1: per-reference resolution (8 prompts) [Req 8 AC1–AC4] ---');
  L.push(`  resolution mechanism: ${r.resolutionMechanism}`);
  L.push(`  total refs enumerated:        ${r.summary.refsTotal}`);
  L.push(`    served (MCP-resolved):      ${r.summary.refsServed}`);
  L.push(`      via legacy-fallback:      ${r.summary.refsResolvedViaLegacyFallback}`);
  L.push(`      via id:                   ${r.summary.refsResolvedViaId}`);
  L.push(`      via indexed-key:          ${r.summary.refsResolvedViaIndexedKey}`);
  L.push(`    identity (static presence): ${r.summary.refsIdentity}`);
  L.push(`    template (skipped):         ${r.summary.refsTemplateSkipped}`);
  const unresolvedServed = r.references.filter((x) => x.role === 'served' && !x.resolved);
  if (unresolvedServed.length === 0) {
    L.push('  per-reference result: ALL served refs resolved (0 unresolved)');
  } else {
    L.push('  UNRESOLVED served refs:');
    for (const x of unresolvedServed) L.push(`    ✗ ${x.sourcePrompt}: ${x.ref}`);
  }
  if (r.summary.refsTemplateSkipped > 0) {
    L.push('  template placeholders (NOT real refs; excluded from pass/fail):');
    for (const x of r.references.filter((x) => x.role === 'template')) {
      L.push(`    · ${x.sourcePrompt}: ${x.ref}`);
    }
  }

  // --- Axis 2: identity presence ---
  L.push('');
  L.push('--- Axis 2: identity-presence (static, NOT MCP) [Req 8 AC5] ---');
  L.push(`  identity refs verified (in locked set + file exists): ${r.summary.identityVerified}/${r.identity.length}`);
  for (const c of r.identity) {
    const mark = c.inLockedSet && c.fileExists ? '✓' : '✗';
    L.push(`    ${mark} ${c.id}  [lockedSet=${c.inLockedSet}, fileExists=${c.fileExists}]  ${c.filePath}`);
  }

  // --- Axis 3: must-fix coupling ---
  L.push('');
  L.push('--- Axis 3: must-fix coupling remediation (Bucket A) [Req 8 AC7] ---');
  L.push(`  remediated: ${r.summary.couplingsRemediated}/${r.summary.couplingsTotal}`);
  for (const c of r.couplings) {
    L.push(`    ${c.remediated ? '✓' : '✗'} ${c.surface}`);
    L.push(`        ${c.detail}`);
  }

  // --- Axis 4: family-guidance health ---
  L.push('');
  L.push('--- Axis 4: family-guidance health [Req 8 AC6] ---');
  L.push(`  top-level companions checked: ${r.familyGuidance.topLevelCompanionsChecked}`);
  L.push(`  NEW companion-path warnings:  ${r.familyGuidance.newCompanionWarnings.length} (expect 0)`);
  for (const w of r.familyGuidance.newCompanionWarnings) L.push(`    ✗ ${w}`);
  L.push(`  note: ${r.familyGuidance.note}`);

  // --- Scope assertion ---
  L.push('');
  L.push('--- Scope: critical-core ONLY; severable excluded [Req 8 AC8] ---');
  L.push(`  ${r.scope.axDesignExists ? '✓' : '✗'} always-layer AX DESIGN exists: ${r.scope.axDesignPath}`);
  L.push('  EXPLICITLY EXCLUDED (severable seam far side — NOT gated):');
  for (const e of r.scope.excluded) L.push(`    · ${e}`);

  // --- Verdict ---
  L.push('');
  L.push('============================================================');
  if (r.pass) {
    L.push('  VERDICT: PASS — 119-A relocation exit gate CLEARED (Req 8 AC9)');
  } else {
    L.push('  VERDICT: FAIL — named failures below (Req 8 AC3)');
    for (const u of r.unresolved) L.push(`    ✗ ${u}`);
  }
  L.push('============================================================');
  L.push('');
  return L.join('\n');
}

async function main(): Promise<void> {
  const result = await runRelocationIntegrityGate();
  console.log(fmt(result));

  console.log('--- JSON ---');
  console.log(JSON.stringify({
    pass: result.pass,
    summary: result.summary,
    unresolved: result.unresolved,
    familyGuidanceWarnings: result.familyGuidance.newCompanionWarnings,
    axDesignExists: result.scope.axDesignExists,
  }, null, 2));

  process.exit(result.pass ? 0 : 1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
