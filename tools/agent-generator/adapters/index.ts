/**
 * The TargetAdapter interface (C4) — Spec 122 Task 5.1.
 *
 * design.md § "C4 — Target adapters": one interface, two implementations (CC first, then
 * Kiro). THE EXTENSIBILITY CONTRACT (Req 24 AC3, verified by the Kiro adapter landing
 * second with no pipeline change): adding a target = implementing this interface + a
 * column in `skills-map.yaml` + rows in `field-dispositions.yaml` — never a rearchitecture.
 * Per the design's Rosetta framing, an adapter KNOWS its harness's native delivery model
 * and generates to it (CSS-var reference vs inlined Swift value), so nothing here assumes
 * a particular reference mechanism exists on the target.
 *
 * ATTRIBUTION RULE (P2 applied at the adapter seam — decided here, 5.1): EVERY emitted
 * file carries an attribution sidecar, kept total by construction:
 *   - prose-bearing artifacts (agent prompts, CLAUDE.md) — multi-span manifests built with
 *     AttributionAccumulator as the emitter writes each block (resolve/render/passthrough);
 *   - machine-rendered JSON (Kiro agent configs, manifests) — a single `render` span over
 *     the whole file (every byte derives from structured canonical fields);
 *   - byte-copied skill trees — a single `passthrough` span per file (canonical skill
 *     content travels verbatim).
 * This keeps Req 1 AC3/AC4 mechanically checkable over the WHOLE emitted surface rather
 * than carving prose-only exceptions into P2.
 *
 * Traces to: Req 11 (transform table + dispositions), Req 15 (generated ports), Req 24
 * (both adapters; additive targets); design C4, C2.3, C2.5.
 */

import { load as loadYaml } from 'js-yaml';
import type { ResolvedAgent } from '../pipeline';
import type { SkillsMap, SkillsMapRow } from '../skills';
import type { AlwaysSetMember } from '../compose';
import type { ToolSubset } from '../schema';
import type { WorkflowRule } from '../workflow-rules-guard';
import type { AttributionManifest } from '../attribution';

// ============================================================================
// Emitted files — every emission carries its attribution (P2, rule above)
// ============================================================================

export interface EmittedFile {
  /** Repo-relative output path (e.g. `.claude/agents/data.md`, `.kiro/agents/data.json`). */
  path: string;
  content: string;
  /** Sidecar per C3.3/DD2: `<path>.attribution.json`, serialized canonical JSON. */
  attribution: AttributionManifest;
}

// ============================================================================
// Field dispositions (C2.3) — typed to the AUTHORED vocabulary
// ============================================================================

/**
 * The authored disposition vocabulary. The design named three (`carry`/`transform`/
 * `drop-with-reason`); the authored table (Task 1.3) legitimately added
 * `handled-elsewhere` — a field mapped to an existing C1 frontmatter class whose own
 * adapter logic owns it (named so sweep 7's completeness check never reads the field as
 * silently absent). `carry` is typed though currently unused by any authored row.
 */
export type FieldDispositionKind = 'carry' | 'transform' | 'drop-with-reason' | 'handled-elsewhere';

export interface ConfigFieldDisposition {
  field: string;
  cc: FieldDispositionKind;
  /** Required for drop-with-reason / handled-elsewhere. */
  reason?: string;
  /** Required for transform — what the field becomes on the target. */
  into?: string;
}

export interface RuntimeToolRefDisposition {
  ref: string;
  kiro: string;
  /** The CC-side replacement instruction (e.g. `taskStatus` → "edit the tasks.md checkbox directly"). */
  cc: string;
}

export interface FieldDispositionTable {
  configFields: ConfigFieldDisposition[];
  runtimeToolRefs: RuntimeToolRefDisposition[];
}

/** Parse `canonical/shared/field-dispositions.yaml` text (pure; caller reads the file). */
export function parseFieldDispositions(yamlText: string): FieldDispositionTable {
  const parsed = loadYaml(yamlText) as Partial<FieldDispositionTable> | null;
  return {
    configFields: parsed?.configFields ?? [],
    runtimeToolRefs: parsed?.runtimeToolRefs ?? [],
  };
}

// ============================================================================
// Shared catalog (C2.5) — cross-agent members every generated catalog receives
// ============================================================================

export interface SharedCatalogMember {
  id: string;
  kind: 'command' | 'tool-cue' | 'governance-rule';
  cmd?: string;
  tool?: string;
  mcp?: string;
  cue?: string;
  statement?: string;
  runContext?: string;
  owner?: string;
  source?: string;
  crossRef?: string;
}

/** Parse `canonical/shared/shared-catalog.yaml` text (pure). */
export function parseSharedCatalog(yamlText: string): SharedCatalogMember[] {
  const parsed = loadYaml(yamlText) as { members?: SharedCatalogMember[] } | null;
  return parsed?.members ?? [];
}

// ============================================================================
// AdapterContext — everything an emit pass reads beyond the ResolvedAgent
// ============================================================================

/**
 * The shared inputs adapters consume. Assembled once per generator run by the caller
 * (parse the shared files + import WORKFLOW_RULES); adapters never read the filesystem
 * for canonical inputs themselves — that keeps emission pure and deterministically
 * testable (P1).
 */
export interface AdapterContext {
  workflowRules: readonly WorkflowRule[];
  skillsMap: SkillsMap;
  alwaysSet: readonly AlwaysSetMember[];
  dispositions: FieldDispositionTable;
  sharedCatalog: readonly SharedCatalogMember[];
  /** Repo root, for adapters that must compute id→path at emit time (Kiro resources). */
  repoRoot: string;
  /**
   * Pre-fetched resolved corpus text for per-agent ambient members, keyed by doc `id` (C11
   * lane 2 — the CC adapter inlines these into each agent body since CC has no per-agent
   * `@`-import channel). Supplied by the generation entry point so adapters stay pure (they
   * never resolve corpus refs themselves). A per-agent member with no entry here is a
   * generator-entry-point bug, not a silently-empty embed — the CC adapter throws naming the
   * missing id rather than emitting nothing.
   */
  embeds?: Readonly<Record<string, string>>;
  /**
   * Doc id → repo-relative file path, for adapters that emit `@`-import lines (C11 lane 1 —
   * the CC adapter's generated `CLAUDE.md`). Supplied by the generation entry point (it knows
   * the steering corpus's on-disk layout); adapters never guess a path from an id.
   */
  steeringIdToPath?: Readonly<Record<string, string>>;
  /**
   * Doc id → repo-relative file path, for the Kiro adapter's `resources` array (design C4:
   * "id→path at emit time"). Covers BOTH resolve-by-id roots (`.kiro/steering/**` AND
   * `governance/**`) — Kiro's ambient manifest membership spans both the identity docs and
   * the corpus docs, unlike CC's lane-1 `steeringIdToPath`, which only ever needs to resolve
   * the locked always-set (`.kiro/steering/**` identity docs) for `CLAUDE.md` `@`-imports.
   * Deliberately a SEPARATE field rather than a reused `steeringIdToPath`: the two maps have
   * different coverage requirements (CC lane 1's is a strict subset — always-set ids only;
   * Kiro's must resolve every ambient-manifest member, shared AND per-agent) and conflating
   * them would either under-cover Kiro or force CC's map wider than it needs. Supplied by the
   * generation entry point; the Kiro adapter never guesses a path from an id.
   */
  docIdToPath?: Readonly<Record<string, string>>;
}

// ============================================================================
// The TargetAdapter interface (design C4 — verbatim seam)
// ============================================================================

export interface TargetAdapter {
  /** A third target implements this same interface (Req 24 AC3). */
  readonly target: 'kiro' | 'cc';

  /** Emit the agent's per-target artifacts: prompt(s) + config(s), with attribution. */
  emitAgent(agent: ResolvedAgent, ctx: AdapterContext): EmittedFile[];

  /** Emit THIS target's skill tree from the canonical-keyed map (Req 8 AC1/AC3). */
  emitSkills(map: SkillsMap, ctx: AdapterContext): EmittedFile[];

  /** Emit THIS target's always-layer delivery (Kiro: inclusion-always refs; CC: C11 lanes). */
  emitAlwaysLayer(set: readonly AlwaysSetMember[], ctx: AdapterContext): EmittedFile[];

  /** The target's tool-reference syntax (CC: `mcp__<server>__<tool>`; Kiro: native name). */
  toolRef(subset: ToolSubset, tool: string): string;

  /** The target's skill-reference syntax (Kiro: `skill://<path>/SKILL.md`; CC: flat Skill-tool name). */
  skillRef(row: SkillsMapRow): string;

  /** The field-driven write-scope note for this target (Req 11 AC3; CC layers facet-7 enforcement options). */
  renderWriteScope(paths: readonly string[]): string;

  /** This target's slice of the disposition table (sweep 7's checkable object). */
  readonly dispositions: FieldDispositionTable;
}
