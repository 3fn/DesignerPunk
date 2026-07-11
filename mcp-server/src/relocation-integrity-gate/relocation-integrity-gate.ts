/**
 * Relocation-Integrity Gate — Spec 119-A, Task 11 (design Component 5; Req 8)
 *
 * Testable core. A thin runner wrapper lives at `scripts/relocation-integrity-gate.ts`.
 *
 * WHAT THIS IS
 * ----------------------------------------------------------------------------
 * The 119-A closed-loop EXIT CHECK. It replaces the dissolved Phase-10 atomicity
 * guarantee (Req 8 AC9) with a per-reference / per-surface gate that proves, after
 * the move:
 *   1. every still-legacy `.kiro/steering/…` reference in the 8 agent prompts
 *      resolves post-relocation via the Docs MCP (Req 8 AC1–AC4); the gate's
 *      resolution mechanism is NAMED as the Req 2 AC3 legacy-path→id fallback.
 *   2. every identity-doc reference is verified by STATIC PRESENCE (id in the
 *      locked always-set + file exists at its `.kiro/steering/` path), NEVER via
 *      an MCP round-trip — identity docs are not in the governance-only index
 *      (Req 8 AC5 / Req 2 AC4).
 *   3. every MUST-FIX coupling surface (coupling-sweep Bucket A) is repointed to
 *      `governance/` and functional (Req 8 AC7).
 *   4. relocation introduced ZERO new family-guidance companion-path warnings
 *      (Req 8 AC6) — asserted over the 9 top-level companions the FamilyGuidanceIndexer
 *      parses (the 13 nested are gate-blind: green ≠ all 22 verified).
 *
 * SCOPE TEETH (Req 8 AC8): the gate asserts ONLY the critical-core. It EXPLICITLY
 * EXCLUDES the severable seam's far side — it SHALL NOT require the ground-truth
 * manifest BUILD nor the capability-catalog GENERATION to exist. It DOES assert
 * the always-layer AX *design* artifact exists (Task 9), but not that any
 * manifest/catalog has been built/generated.
 *
 * A generic "MCP healthy / N indexed" check is INSUFFICIENT (Req 8 AC4): the pass
 * condition is per-reference resolution + per-surface remediation.
 *
 * STRUCTURE: pure analyzers (`classifyReference`, `assertCoupling*`, etc.) are
 * separated from I/O so the classification + aggregation logic is unit-testable in
 * isolation. `runRelocationIntegrityGate` is the I/O orchestrator that builds a
 * real `DocumentIndexer` over `governance/` (with the frozen legacy manifest seeded
 * at the tail of `indexDirectory`) and exercises the live `resolveRef`.
 */

import * as fs from 'fs';
import * as path from 'path';
import { DocumentIndexer, ResolutionStrategy } from '../indexer/DocumentIndexer';

// ---------------------------------------------------------------------------
// Result shapes (design Component 5)
// ---------------------------------------------------------------------------

export interface ReferenceCheck {
  ref: string;                       // id or legacy .kiro/steering/… path
  sourcePrompt: string;              // which of the 8 prompts
  resolved: boolean;
  strategy?: ResolutionStrategy;     // how it resolved (legacy-fallback expected for the prompt refs)
  /**
   * 'served'   = a real reference into the MCP-served governance corpus, resolved
   *              via the resolver (Req 8 AC1–AC4).
   * 'identity' = a reference to a locked identity doc — NOT routed through MCP;
   *              verified by static presence instead (Req 8 AC5). Tracked here for
   *              completeness, but its authoritative result lives in `identity`.
   * 'template' = an illustrative path-shape placeholder in the prompt (e.g.
   *              "Component-Family-{Name}.md") inside an MCP-usage example — NOT a
   *              real doc reference. Cannot and must not resolve; excluded from the
   *              pass/fail tally with its reason recorded.
   */
  role: 'served' | 'identity' | 'template';
  note?: string;                     // why a template/identity ref is treated as it is
}

export interface CouplingCheck {
  surface: string;                   // e.g. "sync-manifest.json", "src/figma/VariantAnalyzer.ts"
  remediated: boolean;
  detail: string;                    // what was asserted (governance/ key present, etc.)
}

export interface IdentityPresenceCheck {
  id: string;
  inLockedSet: boolean;              // present in Req 6 AC1 always-set
  fileExists: boolean;               // at its .kiro/steering/ path
  filePath: string;
}

export interface FamilyGuidanceAxis {
  // MUST be empty (Req 8 AC6). NOTE: FamilyGuidanceIndexer parses only the 9
  // TOP-LEVEL companion fields, so this axis is blind to the 13 NESTED companion
  // refs (composesWithFamilies). All 22 must be re-pointed for correctness; only
  // the 9 are gate-asserted here. Green ≠ "all 22 verified".
  newCompanionWarnings: string[];
  topLevelCompanionsChecked: number;
  note: string;
}

export interface ScopeAssertion {
  /** The always-layer AX *design* artifact exists (Req 8 AC8 — design, not build). */
  axDesignExists: boolean;
  axDesignPath: string;
  /**
   * Surfaces the gate DELIBERATELY does not check (the severable seam's far side,
   * Req 8 AC8). Recorded so a reader sees the exclusion is intentional, not an
   * oversight.
   */
  excluded: string[];
}

export interface GateResult {
  pass: boolean;
  references: ReferenceCheck[];      // per-reference (Req 8 AC1–AC4)
  couplings: CouplingCheck[];        // must-fix axis (Req 8 AC7)
  identity: IdentityPresenceCheck[]; // static presence, NOT MCP (Req 8 AC5)
  familyGuidance: FamilyGuidanceAxis;// App-MCP health axis (Req 8 AC6)
  scope: ScopeAssertion;             // critical-core only; severable excluded (Req 8 AC8)
  unresolved: string[];              // named failures (Req 8 AC3)
  /** The resolution mechanism the gate names for legacy refs (Req 8 AC1). */
  resolutionMechanism: string;
  summary: {
    refsTotal: number;
    refsServed: number;
    refsResolvedViaLegacyFallback: number;
    refsResolvedViaId: number;
    refsResolvedViaIndexedKey: number;
    refsTemplateSkipped: number;
    refsIdentity: number;
    identityVerified: number;
    couplingsRemediated: number;
    couplingsTotal: number;
  };
}

// ---------------------------------------------------------------------------
// Static sets (Design Decision 5: in-code, NOT a build artifact)
// ---------------------------------------------------------------------------

/**
 * The locked `always` identity set (Req 6 AC1). Materialized as a static in-code
 * list per Design Decision 5 — NOT a generated build artifact (materializing one
 * would risk pulling a severable build concern across the seam, and the set is
 * ~9 ballot-gated docs that change only by ballot). Keyed on the doc's stable id.
 *
 * Kept in sync with the Req 6 design + the identity docs in `.kiro/steering/` by
 * review (Decision 5 trade-off, accepted for a 9-doc ballot-locked list).
 */
export const LOCKED_IDENTITY_IDS: ReadonlySet<string> = new Set([
  'personal-note',
  'core-goals',
  'ai-collaboration-principles',
  'spec-feedback-protocol',
  'designerpunk-systems-overview',
  'civitas-system-overview',
  'start-up-tasks',
  'task-completion-protocol',
  'agent-directory',
]);

/**
 * Legacy `.kiro/steering/…` prefixes that name an IDENTITY doc. The 8 prompts keep
 * their legacy paths through the window; an identity ref in a prompt must be
 * verified by static presence, never routed through the (governance-only) MCP.
 *
 * Maps the legacy basename (as it appears in a prompt) → the identity id. Covers
 * both the kebab and the historical Title-Case forms a prompt might still carry.
 */
const IDENTITY_LEGACY_BASENAMES: ReadonlyMap<string, string> = new Map([
  ['personal note.md', 'personal-note'],
  ['personal-note.md', 'personal-note'],
  ['core goals.md', 'core-goals'],
  ['core-goals.md', 'core-goals'],
  ['ai-collaboration-principles.md', 'ai-collaboration-principles'],
  ['spec-feedback-protocol.md', 'spec-feedback-protocol'],
  ['designerpunk-systems-overview.md', 'designerpunk-systems-overview'],
  ['civitas-system-overview.md', 'civitas-system-overview'],
  ['start up tasks.md', 'start-up-tasks'],
  ['start-up-tasks.md', 'start-up-tasks'],
  ['task-completion-protocol.md', 'task-completion-protocol'],
  ['agent-directory.md', 'agent-directory'],
]);

export const RESOLUTION_MECHANISM =
  'Req 2 AC3 legacy-path→id fallback (DocumentIndexer.resolveRef, strategy=legacy-fallback), ' +
  'seeded from the frozen FROZEN_LEGACY_MANIFEST at the tail of indexDirectory';

// ---------------------------------------------------------------------------
// Pure analyzers
// ---------------------------------------------------------------------------

/** A `{placeholder}` segment marks an illustrative path-shape, not a real ref. */
export function isTemplateRef(ref: string): boolean {
  return /\{[^}]+\}/.test(ref);
}

/** Classify a prompt ref by ROLE (served corpus / identity doc / template placeholder). */
export function classifyReference(ref: string): ReferenceCheck['role'] {
  if (isTemplateRef(ref)) return 'template';
  const basename = ref.replace(/^.*\//, '').toLowerCase();
  if (IDENTITY_LEGACY_BASENAMES.has(basename)) return 'identity';
  return 'served';
}

/** The identity id a legacy identity-ref points at (for the identity axis). */
export function identityIdForRef(ref: string): string | undefined {
  const basename = ref.replace(/^.*\//, '').toLowerCase();
  return IDENTITY_LEGACY_BASENAMES.get(basename);
}

// ---------------------------------------------------------------------------
// Reference axis (Req 8 AC1–AC5) — enumerate + resolve the 8 prompts' refs
// ---------------------------------------------------------------------------

export const PROMPT_GLOB_DIR = '.kiro/agents';

/** The 8 agent prompt filenames (the live grep set; sweep is 119-B). */
export function listPromptFiles(projectRoot: string): string[] {
  const dir = path.join(projectRoot, PROMPT_GLOB_DIR);
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('-prompt.md'))
    .sort()
    .map((f) => path.join(dir, f));
}

/**
 * Grep every `.kiro/steering/…md` reference out of a prompt file (spaces-tolerant,
 * matching the live coupling-sweep regex). Returns the raw ref strings in order.
 */
export function extractSteeringRefs(promptContent: string): string[] {
  const re = /\.kiro\/steering\/[^)"`'<>\n]+?\.md/g;
  const out: string[] = [];
  let m: RegExpExecArray | null;
  while ((m = re.exec(promptContent)) !== null) {
    out.push(m[0]);
  }
  return out;
}

// ---------------------------------------------------------------------------
// Must-fix coupling axis (Req 8 AC7) — coupling-sweep Bucket A surfaces
// ---------------------------------------------------------------------------

function read(projectRoot: string, rel: string): string {
  return fs.readFileSync(path.join(projectRoot, rel), 'utf-8');
}
function exists(projectRoot: string, rel: string): boolean {
  return fs.existsSync(path.join(projectRoot, rel));
}

/**
 * Assert every coupling-sweep Bucket A surface is repointed to `governance/` and
 * functional. Each check is intentionally specific (Req 8 AC4: no generic health
 * check) and names the surface on failure (Req 8 AC7).
 */
export function assertMustFixCouplings(projectRoot: string): CouplingCheck[] {
  const checks: CouplingCheck[] = [];

  // A1: .kiro/sync-manifest.json — relocated docs keyed governance/, identity kept,
  // meta-guide dropped. (Verbatim swap would wrongly re-key the 9 identity docs.)
  {
    const m = read(projectRoot, '.kiro/sync-manifest.json');
    const govKeys = (m.match(/"governance\/[^"]+\.md"/g) || []).length;
    const idKeys = (m.match(/"\.kiro\/steering\/[^"]+\.md"/g) || []).length;
    const metaGuideGone = !/00-steering documentation directional priorities/i.test(m);
    const ok = govKeys >= 80 && idKeys === 9 && metaGuideGone;
    checks.push({
      surface: '.kiro/sync-manifest.json',
      remediated: ok,
      detail: `governance/ keys=${govKeys} (≥80), identity .kiro/steering/ keys=${idKeys} (=9), meta-guide dropped=${metaGuideGone}`,
    });
  }

  // A2: agent-definition resources — relocating doc entries repointed to governance/,
  // identity entries left at .kiro/steering/, BOTH file:// and skill:// schemes.
  // The break is "a relocating doc still pointed at .kiro/steering/". So: assert NO
  // non-identity .kiro/steering/ doc remains referenced in any agent JSON.
  {
    const dir = path.join(projectRoot, '.kiro/agents');
    const jsons = fs
      .readdirSync(dir)
      .filter((f) => f.endsWith('.json') && !f.endsWith('.attribution.json'))
      .sort();

    // Spec 122 cutover-ledger awareness (added at Ada's cutover, U2/PR #55): a GENERATED
    // config carries only its designed ambient members — Ada's trim took the fleet total
    // from 122 to 100 governance/ entries and broke the old flat `govEntries >= 120`
    // floor, and every later cutover would break any fixed total again. The floor's real
    // job is anti-vacuity over the HAND-maintained configs (proof the scan actually saw
    // the remediated entries), so it is now PER-CONFIG (≥5 governance/ entries each; the
    // thinnest hand config today carries 9) over NON-ledger configs only. Generated
    // configs are exempt from the floor — their ref integrity is the generator gate's job
    // (122-sweep-1-refs + 122-canonical-vs-truth) — but they stay IN the stray-relocating
    // scan below: no config, hand or generated, may point a relocating doc at
    // .kiro/steering/. When the ledger covers every seat, the floor leg is vacuously true
    // and this gate's remediation duty is fully handed to the generation-era checks.
    let ledgerAgents = new Set<string>();
    try {
      const ledgerText = fs.readFileSync(path.join(projectRoot, 'canonical/cutover-ledger.yaml'), 'utf-8');
      ledgerAgents = new Set([...ledgerText.matchAll(/^\s*-\s*([a-z0-9-]+)\s*$/gm)].map((m) => m[1]));
    } catch {
      ledgerAgents = new Set(); // pre-122 tree: floor applies to all configs, as before
    }

    let govEntries = 0;
    const thinHandConfigs: string[] = [];
    const strayRelocating = new Set<string>();
    let strayIdentityLeak = false; // an .kiro/steering/ entry that is NOT an identity doc
    for (const j of jsons) {
      const content = fs.readFileSync(path.join(dir, j), 'utf-8');
      const agentName = j.replace(/\.json$/, '');
      const govRe = /(?:file|skill):\/\/[^"]*governance\/[^"]*\.md/g;
      const configGovEntries = (content.match(govRe) || []).length;
      govEntries += configGovEntries;
      if (!ledgerAgents.has(agentName) && configGovEntries < 5) {
        thinHandConfigs.push(`${j} (${configGovEntries})`);
      }
      const steerRe = /(?:file|skill):\/\/[^"]*\.kiro\/steering\/([^"/]+\.md)/g;
      let mm: RegExpExecArray | null;
      while ((mm = steerRe.exec(content)) !== null) {
        const base = mm[1].toLowerCase();
        if (!IDENTITY_LEGACY_BASENAMES.has(base)) {
          strayRelocating.add(mm[1]);
          strayIdentityLeak = true;
        }
      }
    }
    const ok = thinHandConfigs.length === 0 && !strayIdentityLeak;
    checks.push({
      surface: 'agent-definition resources[] (file:// + skill://)',
      remediated: ok,
      detail: ok
        ? `governance/ entries=${govEntries} (per-hand-config floor ≥5 held; ${ledgerAgents.size} generator-governed config(s) exempt); zero relocating docs left at .kiro/steering/`
        : `governance/ entries=${govEntries}; hand configs under the ≥5 floor: ${thinHandConfigs.join(', ') || 'none'}; UNREMEDIATED relocating docs still at .kiro/steering/: ${[...strayRelocating].join(', ')}`,
    });
  }

  // A3: .cursor/mcp.json MCP_STEERING_DIR + Docs MCP DEFAULT_STEERING_DIR → governance/
  {
    const cursor = read(projectRoot, '.cursor/mcp.json');
    const cursorOk = /"MCP_STEERING_DIR"\s*:\s*"governance\/?"/.test(cursor);
    const index = read(projectRoot, 'mcp-server/src/index.ts');
    const defaultOk = /DEFAULT_STEERING_DIR\s*=\s*'governance\/?'/.test(index);
    checks.push({
      surface: '.cursor/mcp.json MCP_STEERING_DIR + mcp-server DEFAULT_STEERING_DIR',
      remediated: cursorOk && defaultOk,
      detail: `.cursor MCP_STEERING_DIR=governance ${cursorOk}, DEFAULT_STEERING_DIR=governance ${defaultOk}`,
    });
  }

  // A4: src/cli/init.ts (ADD governance copyDir, KEEP .kiro/steering) + designerpunk.ts (repoint)
  {
    const init = read(projectRoot, 'src/cli/init.ts');
    const initGov = /copyDir\(\s*[^)]*['"`][^'"`]*governance['"`]/.test(init);
    const initKeepsSteering = /\.kiro\/steering/.test(init);
    const dp = read(projectRoot, 'src/cli/designerpunk.ts');
    const dpGov = /path\.join\(\s*pkgRoot\s*,\s*['"`]governance['"`]\s*\)/.test(dp);
    const dpNoSteering = !/path\.join\(\s*pkgRoot\s*,\s*['"`]\.kiro\/steering['"`]\s*\)/.test(dp);
    const ok = initGov && initKeepsSteering && dpGov && dpNoSteering;
    checks.push({
      surface: 'src/cli/init.ts + src/cli/designerpunk.ts',
      remediated: ok,
      detail: `init governance copyDir=${initGov} & keeps .kiro/steering=${initKeepsSteering}; designerpunk governance=${dpGov} & no steering-spawn=${dpNoSteering}`,
    });
  }

  // A5: src/figma/VariantAnalyzer.ts + DesignExtractor.ts construct governance/ paths
  {
    const va = read(projectRoot, 'src/figma/VariantAnalyzer.ts');
    const de = read(projectRoot, 'src/figma/DesignExtractor.ts');
    const vaOk =
      /governance\/Component-Family-/.test(va) &&
      /governance\/Component-Readiness-Status\.md/.test(va) &&
      !/['"`]\.kiro\/steering\/Component-/.test(va);
    const deOk =
      /governance\/platform-implementation-guidelines\.md/.test(de) &&
      !/['"`]\.kiro\/steering\/platform-implementation-guidelines\.md/.test(de);
    checks.push({
      surface: 'src/figma/VariantAnalyzer.ts + DesignExtractor.ts',
      remediated: vaOk && deOk,
      detail: `VariantAnalyzer governance paths=${vaOk}; DesignExtractor governance path=${deOk}`,
    });
  }

  // A6: scripts/extract-component-meta.ts STEERING_DIR → governance/
  {
    const s = read(projectRoot, 'scripts/extract-component-meta.ts');
    const ok = /STEERING_DIR\s*=\s*path\.resolve\([^)]*['"`]\.\.\/governance['"`]\)/.test(s);
    checks.push({
      surface: 'scripts/extract-component-meta.ts STEERING_DIR',
      remediated: ok,
      detail: `STEERING_DIR → ../governance: ${ok}`,
    });
  }

  // A7: package.json files[] (ADD governance/, KEEP .kiro/steering/), init template,
  // FileScanner MANAGED_DIRS (ADD governance, keep .kiro/steering).
  {
    const pkg = read(projectRoot, 'package.json');
    const pkgGov = /"governance\/"/.test(pkg);
    const pkgSteering = /"\.kiro\/steering\/"/.test(pkg);
    const tmpl = read(projectRoot, 'src/cli/templates/mcp-config.json.template');
    const tmplGov = /governance/.test(tmpl) && !/\.kiro\/steering/.test(tmpl);
    const tmplNoDeadTool = !/get_documentation_map/.test(tmpl);
    const fs2 = read(projectRoot, 'src/cli/sync/FileScanner.ts');
    const fsGov = /path:\s*'governance'/.test(fs2);
    const fsSteering = /path:\s*'\.kiro\/steering'/.test(fs2);
    const ok = pkgGov && pkgSteering && tmplGov && tmplNoDeadTool && fsGov && fsSteering;
    checks.push({
      surface: 'package.json files[] + init template + FileScanner MANAGED_DIRS',
      remediated: ok,
      detail: `files[] governance=${pkgGov}/steering=${pkgSteering}; template governance=${tmplGov}/no-dead-tool=${tmplNoDeadTool}; MANAGED_DIRS governance=${fsGov}/steering=${fsSteering}`,
    });
  }

  return checks;
}

// ---------------------------------------------------------------------------
// Identity axis (Req 8 AC5) — static presence, never MCP
// ---------------------------------------------------------------------------

/**
 * Verify identity docs by static presence: id ∈ locked always-set AND the file
 * exists at its `.kiro/steering/` path. NEVER an MCP round-trip (identity docs are
 * not in the governance-only index — Req 2 AC4 / Req 8 AC5).
 *
 * The verified set is the UNION of (a) the full locked always-set (Req 6 AC1) and
 * (b) any identity id a prompt actually references. Verifying the full locked set —
 * not only prompt-referenced ones — is deliberate: in this corpus no prompt
 * references an identity doc by path (all 25 real prompt refs are governance docs),
 * so a prompt-only identity axis would be vacuous and a regression (a deleted
 * identity doc, or one drifting out of the locked set) would slip through ungated.
 * The locked set is the authoritative thing the gate must prove is statically
 * present, so the gate asserts presence for ALL of it. (`source` records whether a
 * given id was also referenced by a prompt, for audit.)
 */
export function assertIdentityPresence(
  projectRoot: string,
  referencedIdentityIds: Set<string>,
): IdentityPresenceCheck[] {
  // Map id → on-disk filename in .kiro/steering/ (resolved by scanning).
  const steeringDir = path.join(projectRoot, '.kiro/steering');
  const files = fs.existsSync(steeringDir) ? fs.readdirSync(steeringDir) : [];
  const idToFile = new Map<string, string>();
  for (const f of files) {
    if (!f.endsWith('.md')) continue;
    const content = fs.readFileSync(path.join(steeringDir, f), 'utf-8');
    const m = content.match(/^id:\s*(.+)$/m);
    if (m) idToFile.set(m[1].trim(), f);
  }

  const allIds = new Set<string>([...LOCKED_IDENTITY_IDS, ...referencedIdentityIds]);

  const checks: IdentityPresenceCheck[] = [];
  for (const id of [...allIds].sort()) {
    const file = idToFile.get(id);
    checks.push({
      id,
      inLockedSet: LOCKED_IDENTITY_IDS.has(id),
      fileExists: file !== undefined,
      filePath: file ? `.kiro/steering/${file}` : '(not found)',
    });
  }
  return checks;
}

// ---------------------------------------------------------------------------
// Family-guidance axis (Req 8 AC6) — zero new top-level companion warnings
// ---------------------------------------------------------------------------

/**
 * Assert zero new family-guidance companion-path warnings. FamilyGuidanceIndexer
 * (application-mcp-server) parses ONLY the 9 top-level `companion:` fields and
 * warns on a non-existent target. We replicate that resolution statically: for
 * each top-level companion, assert the target file exists. The pre-relocation
 * baseline was 0; relocation must keep it 0.
 *
 * GATE-BLIND CAVEAT (recorded in the result note): the 13 nested companions under
 * composesWithFamilies are NOT parsed by the indexer, so a green axis ≠ "all 22
 * verified". They are re-pointed for correctness (Task 6.2) but not gate-asserted.
 */
export function assertFamilyGuidance(projectRoot: string): FamilyGuidanceAxis {
  const fgDir = path.join(projectRoot, 'family-guidance');
  const yamls = fs.existsSync(fgDir)
    ? fs.readdirSync(fgDir).filter((f) => f.endsWith('.yaml')).sort()
    : [];

  const warnings: string[] = [];
  let topLevelChecked = 0;

  for (const y of yamls) {
    const content = fs.readFileSync(path.join(fgDir, y), 'utf-8');
    // Top-level companion: column-0 `companion:` (the field FamilyGuidanceIndexer
    // parses via guidance.companion). Match a non-indented companion line.
    const m = content.match(/^companion:\s*"?([^"\n]+\.md)"?/m);
    if (!m) continue;
    topLevelChecked++;
    const target = m[1].trim();
    // FamilyGuidanceIndexer does path.resolve(projectRoot, companion) + fs.existsSync.
    if (!fs.existsSync(path.join(projectRoot, target))) {
      warnings.push(`${y}: companion "${target}" does not exist`);
    }
  }

  return {
    newCompanionWarnings: warnings,
    topLevelCompanionsChecked: topLevelChecked,
    note:
      'FamilyGuidanceIndexer parses only the 9 top-level companions; the 13 nested ' +
      '(composesWithFamilies) are gate-blind. Green ≠ all 22 verified.',
  };
}

// ---------------------------------------------------------------------------
// Scope assertion (Req 8 AC8) — critical-core only; severable excluded
// ---------------------------------------------------------------------------

export const AX_DESIGN_PATH =
  '.kiro/specs/119-A-steering-relocation-serving-contract/per-agent-ambient-design.md';

export function assertScope(projectRoot: string): ScopeAssertion {
  return {
    axDesignExists: exists(projectRoot, AX_DESIGN_PATH),
    axDesignPath: AX_DESIGN_PATH,
    excluded: [
      'ground-truth manifest BUILD (token-manifest / component-manifest) — severable → 119-B/122',
      'capability-catalog GENERATION (incl. Agent-Directory → catalog migration) — severable → 119-B/122',
      'agent-definition resources[] DECOMPOSITION/trim into the five AXA classes — severable → 119-B/122',
      'companion-by-id re-point (FamilyGuidanceIndexer change) — severable → 122',
      'per-agent routing tables; certainty-calibration formalization/propagation; before/after case study — → 119-B',
    ],
  };
}

// ---------------------------------------------------------------------------
// Orchestrator
// ---------------------------------------------------------------------------

/** Default project root: three levels up from mcp-server/src/relocation-integrity-gate. */
export const DEFAULT_PROJECT_ROOT = path.resolve(__dirname, '../../../');
/** The MCP-served governance corpus root. */
export const DEFAULT_GOVERNANCE_DIR = path.resolve(DEFAULT_PROJECT_ROOT, 'governance');

export interface GateOptions {
  projectRoot?: string;
  governanceDir?: string;
  /** Inject a pre-built indexer (tests). When absent, one is built over governanceDir. */
  indexer?: DocumentIndexer;
}

/** The reference axis's scan output — see {@link scanPromptReferences}. */
export interface PromptReferenceScan {
  references: ReferenceCheck[];
  unresolved: string[];
  referencedIdentityIds: Set<string>;
}

/**
 * The reference axis (Req 8 AC1–AC5), extracted from the orchestrator as its own
 * exported seam: scan every prompt under `projectRoot`, classify each steering ref
 * (template / identity / served), and resolve served refs through the live indexer.
 * Template placeholders are excluded from pass/fail here — they are recorded but
 * NEVER pushed to `unresolved` — which is the behavior the fixture-based unit test
 * exercises directly (the live corpus carries zero placeholders since the Spec 122
 * U3 regeneration, so full-gate runs can no longer test this leg non-vacuously).
 * Only served refs touch the indexer; a template-only or identity-only scan never
 * calls `resolveRef`.
 */
export function scanPromptReferences(
  projectRoot: string,
  indexer: Pick<DocumentIndexer, 'resolveRef'>
): PromptReferenceScan {
  const references: ReferenceCheck[] = [];
  const unresolved: string[] = [];
  const referencedIdentityIds = new Set<string>();

  for (const promptPath of listPromptFiles(projectRoot)) {
    const sourcePrompt = path.basename(promptPath);
    const content = fs.readFileSync(promptPath, 'utf-8');
    for (const ref of extractSteeringRefs(content)) {
      const role = classifyReference(ref);

      if (role === 'template') {
        references.push({
          ref,
          sourcePrompt,
          resolved: false,
          role: 'template',
          note: 'illustrative path-shape placeholder in an MCP-usage example; not a real doc reference',
        });
        continue;
      }

      if (role === 'identity') {
        const id = identityIdForRef(ref)!;
        referencedIdentityIds.add(id);
        references.push({
          ref,
          sourcePrompt,
          resolved: true, // authoritative result is the identity axis (static presence)
          role: 'identity',
          note: `identity doc (${id}) — verified by static presence, NOT routed through MCP (Req 8 AC5)`,
        });
        continue;
      }

      // role === 'served': resolve through the live resolver (Req 8 AC2/AC3).
      try {
        const resolved = indexer.resolveRef(ref);
        references.push({
          ref,
          sourcePrompt,
          resolved: true,
          strategy: resolved.strategy,
          role: 'served',
        });
      } catch {
        references.push({ ref, sourcePrompt, resolved: false, role: 'served' });
        unresolved.push(`${sourcePrompt}: ${ref}`);
      }
    }
  }

  return { references, unresolved, referencedIdentityIds };
}

/**
 * Run the relocation-integrity gate (the 119-A exit check).
 *
 * Builds a real `DocumentIndexer` over `governance/` (the frozen legacy manifest is
 * seeded automatically at the tail of `indexDirectory`), then exercises the live
 * `resolveRef` per prompt reference. Identity refs bypass MCP (static presence);
 * must-fix couplings + family-guidance + scope are asserted statically.
 */
export async function runRelocationIntegrityGate(opts: GateOptions = {}): Promise<GateResult> {
  const projectRoot = opts.projectRoot ?? DEFAULT_PROJECT_ROOT;
  const governanceDir = opts.governanceDir ?? DEFAULT_GOVERNANCE_DIR;

  let indexer = opts.indexer;
  if (!indexer) {
    indexer = new DocumentIndexer();
    // indexDirectory seeds the frozen legacy manifest at its tail (re-seed
    // obligation) — so the legacy-fallback resolution mechanism is live here.
    await indexer.indexDirectory(governanceDir);
  }

  // --- Reference axis (Req 8 AC1–AC5) ---
  const { references, unresolved, referencedIdentityIds } = scanPromptReferences(projectRoot, indexer);

  // --- Identity axis (Req 8 AC5) ---
  const identity = assertIdentityPresence(projectRoot, referencedIdentityIds);
  for (const c of identity) {
    if (!c.inLockedSet) unresolved.push(`identity ref id "${c.id}" not in locked always-set`);
    if (!c.fileExists) unresolved.push(`identity doc "${c.id}" missing at .kiro/steering/`);
  }

  // --- Must-fix coupling axis (Req 8 AC7) ---
  const couplings = assertMustFixCouplings(projectRoot);
  for (const c of couplings) {
    if (!c.remediated) unresolved.push(`unremediated must-fix coupling: ${c.surface} (${c.detail})`);
  }

  // --- Family-guidance axis (Req 8 AC6) ---
  const familyGuidance = assertFamilyGuidance(projectRoot);
  for (const w of familyGuidance.newCompanionWarnings) {
    unresolved.push(`new family-guidance companion warning: ${w}`);
  }

  // --- Scope assertion (Req 8 AC8) ---
  const scope = assertScope(projectRoot);
  if (!scope.axDesignExists) {
    unresolved.push(`always-layer AX design artifact missing: ${scope.axDesignPath}`);
  }

  // --- Aggregate ---
  const served = references.filter((r) => r.role === 'served');
  const summary = {
    refsTotal: references.length,
    refsServed: served.length,
    refsResolvedViaLegacyFallback: served.filter((r) => r.strategy === 'legacy-fallback').length,
    refsResolvedViaId: served.filter((r) => r.strategy === 'id').length,
    refsResolvedViaIndexedKey: served.filter((r) => r.strategy === 'indexed-key').length,
    refsTemplateSkipped: references.filter((r) => r.role === 'template').length,
    refsIdentity: references.filter((r) => r.role === 'identity').length,
    identityVerified: identity.filter((c) => c.inLockedSet && c.fileExists).length,
    couplingsRemediated: couplings.filter((c) => c.remediated).length,
    couplingsTotal: couplings.length,
  };

  return {
    pass: unresolved.length === 0,
    references,
    couplings,
    identity,
    familyGuidance,
    scope,
    unresolved,
    resolutionMechanism: RESOLUTION_MECHANISM,
    summary,
  };
}
