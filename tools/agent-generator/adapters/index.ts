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
import { AttributionAccumulator } from '../attribution';
import { emitSpans, type Dispositions, type Overlay, type Profile } from '../spans';

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
// mcp short-name → server-name mapping (the single mapping seam)
// ============================================================================

/**
 * `ToolCueRoute.mcp` is a short name (`docs`/`application`/`product`); `ToolSubset` keys and
 * registry server names are the full `designerpunk-*` names. MOVED here from
 * canonical-vs-truth.ts (which re-exports it) at Ada's cutover: the CC adapter must
 * namespace a CUE by the cue's own `mcp` field — a subset-order search misroutes ambiguous
 * tool names (`rebuild_index` exists on two servers; Ada's U2 content confirmation caught
 * the live misroute). One map, all consumers.
 */
export const MCP_TO_SERVER = Object.freeze({
  docs: 'designerpunk-docs',
  application: 'designerpunk-application',
  product: 'designerpunk-product',
} as const);

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
  /**
   * `interim` marks a crossRef pointing at a stand-in target because the designed target
   * does not exist yet (e.g. record-first-ratification → ballots README until 125-B's
   * classification map lands). Sweep 1 resolves interim targets like any other ref AND
   * enumerates them in every run report so the stand-in cannot become silently permanent.
   */
  crossRefStatus?: 'interim';
  /** Human-readable re-point condition for an interim crossRef. */
  crossRefResolveWhen?: string;
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
   * The same embeds kept per asserted section (Task 15.3; `buildEmbedSections`). The CC adapter's
   * CONSUMER path emits one span per section (`ambient[<docid>#<section-slug>]`), so the embed
   * container is sourced by surviving member spans; the steward path keeps the joined `embeds`.
   */
  embedSections?: Readonly<Record<string, readonly { section: string; text: string }[]>>;
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
  /**
   * The generation profile (design C12; Spec 123 Task 15.0). Absent means `'steward'` — the
   * canonical rendering, byte-identical to the pre-15.0 output. `'consumer'` makes every
   * adapter span route through `emitSpans` with this agent's dispositions and overlay.
   */
  profile?: Profile;
  /**
   * Consumer-profile inputs, keyed by agent id (`frontmatter.agent`). Read only when
   * `profile === 'consumer'`; a consumer emit for an agent with no dispositions throws (emitSpans:
   * "the consumer profile requires dispositions"). Not named `dispositions` — that field is
   * Spec 122's config-field disposition table.
   */
  consumer?: ConsumerInputs;
}

/**
 * Per-agent consumer inputs (Task 15.0; 15.3): the parsed dispositions rows (with the shared
 * catalog's `members` rows), the overlay's body-unit text, and — because under the consumer
 * profile the adapter renders `derive()`'s frontmatter — each agent's `entryOrigin` (derived
 * entry path → canonical entry path).
 */
export interface ConsumerInputs {
  dispositions: Readonly<Record<string, Dispositions>>;
  overlays?: Readonly<Record<string, Overlay>>;
  entryOrigins?: Readonly<Record<string, Readonly<Record<string, string>>>>;
}

/** Resolve the profile and this agent's consumer inputs for `emitSpans` (both adapters call it). */
export function spanInputsFor(
  ctx: AdapterContext,
  agentId: string
): { profile: Profile; dispositions: Dispositions | undefined; overlay: Overlay | undefined; entryOrigin: Readonly<Record<string, string>> | undefined } {
  const profile: Profile = ctx.profile ?? 'steward';
  if (profile === 'steward') return { profile, dispositions: undefined, overlay: undefined, entryOrigin: undefined };
  return {
    profile,
    dispositions: ctx.consumer?.dispositions[agentId],
    overlay: ctx.consumer?.overlays?.[agentId],
    entryOrigin: ctx.consumer?.entryOrigins?.[agentId],
  };
}

// ============================================================================
// Identity members (C19; Spec 123 Task 15.3) — the ONLY target-varying part of the lane
// ============================================================================

/**
 * One always-set member, as `derive()` sees it (a shipped identity doc, `counterpart:` rows):
 * its canonical path, its canonical body, its body rows and its re-grounded unit text. The
 * shipped doc's own frontmatter is DROPPED, never carried (C19) — so none is passed.
 */
export interface IdentityMemberInput {
  /** The doc id (`core-goals`) — the member file is `designerpunk-<id>.md` (Leonardo A-R1(ii)). */
  id: string;
  /** Repo-relative canonical path (`.kiro/steering/core-goals.md`) — the span provenance. */
  source: string;
  /** The canonical body (frontmatter already split off and dropped). */
  body: string;
  /** Body rows (every unit explicit — DD25). */
  dispositions: Dispositions;
  /** Re-grounded text of the re-pointed units. */
  overlay?: Overlay;
}

/** The prefixed member name every target uses (C19: files are prefixed). */
export const identityMemberName = (id: string): string => `designerpunk-${id}`;

/**
 * Render one member's BODY through `emitSpans` under the consumer profile (the one span function
 * — Task 14's routing arbiter reaches this path too), after an optional adapter-written glue
 * header. Both adapters call this; they differ only in the path and the header.
 */
export function renderIdentityMember(
  member: IdentityMemberInput,
  path: string,
  header: { glue: 'identity-frontmatter'; text: string } | undefined
): EmittedFile {
  const acc = new AttributionAccumulator();
  const src = { file: member.source, body: member.body, frontmatter: {} };
  let content = '';
  if (header) content += emitSpans(acc, src, 'consumer', member.dispositions, member.overlay, [{ kind: 'glue', glue: header.glue, text: header.text }]).text;
  content += emitSpans(acc, src, 'consumer', member.dispositions, member.overlay, 'body').text;
  return { path, content, attribution: acc.build(path) };
}

/** The loud refusal when identity members are asked for under the steward profile (C19). */
export const identityMembersStewardMessage = (target: string): string =>
  `${target}: emitIdentityMembers is the CONSUMER profile's delivery (C19) — the steward profile keeps today's always-layer (CC imports repo paths; Kiro []).`;

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

  /**
   * CONSUMER profile only (C19; Task 15.3): the derived identity MEMBER FILES this target delivers
   * (CC `.claude/identity/designerpunk-<id>.md`; Kiro `.kiro/steering/designerpunk-<id>.md` with a
   * fresh `id` + `inclusion: always` frontmatter). Throws under the steward profile.
   */
  emitIdentityMembers(members: readonly IdentityMemberInput[], ctx: AdapterContext): EmittedFile[];

  /** The target's tool-reference syntax (CC: `mcp__<server>__<tool>`; Kiro: native name). */
  toolRef(subset: ToolSubset, tool: string): string;

  /** The target's skill-reference syntax (Kiro: `skill://<path>/SKILL.md`; CC: flat Skill-tool name). */
  skillRef(row: SkillsMapRow): string;

  /** The field-driven write-scope note for this target (Req 11 AC3; CC layers facet-7 enforcement options). */
  renderWriteScope(paths: readonly string[]): string;

  /** This target's slice of the disposition table (sweep 7's checkable object). */
  readonly dispositions: FieldDispositionTable;
}

// ============================================================================
// The adapter registry (Spec 123 Task 15.0) — declared target name → adapter
// ============================================================================

/** Builds a target's adapter from the shared field-disposition table. */
export type AdapterFactory = (dispositions: FieldDispositionTable) => TargetAdapter;

/**
 * The registered adapters, keyed by the target names `canonical/consumer-profile.yaml`
 * declares (C12). Lazily required: `cc.ts` and `kiro.ts` import this module at load time, so a
 * top-level import here would be a cycle.
 */
export function registeredAdapterFactories(): Readonly<Record<string, AdapterFactory>> {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { CcAdapter } = require('./cc') as typeof import('./cc');
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { KiroAdapter } = require('./kiro') as typeof import('./kiro');
  return Object.freeze({
    cc: (d: FieldDispositionTable) => new CcAdapter(d),
    kiro: (d: FieldDispositionTable) => new KiroAdapter(d),
  });
}

/** The loud failure for a declared target with no registered adapter. */
export const unregisteredTargetMessage = (target: string, registered: readonly string[]): string =>
  `no adapter is registered for declared target "${target}" (canonical/consumer-profile.yaml) — ` +
  `register one in tools/agent-generator/adapters/index.ts (registered: ${registered.join(', ')}; Req 24 AC3)`;

/**
 * One adapter per declared target, in declared order. `extra` injects further factories (Task
 * 14's fake third target is registered this way, in its test); it may not shadow a registered
 * name. A declared target with no factory throws, naming it.
 */
export function adaptersFor(
  targets: readonly string[],
  dispositions: FieldDispositionTable,
  extra: Readonly<Record<string, AdapterFactory>> = {}
): TargetAdapter[] {
  const registered = registeredAdapterFactories();
  for (const name of Object.keys(extra)) {
    if (name in registered) throw new Error(`adaptersFor: an injected factory may not shadow the registered adapter "${name}"`);
  }
  const factories: Record<string, AdapterFactory> = { ...registered, ...extra };
  return targets.map((target) => {
    const factory = factories[target];
    if (!factory) throw new Error(unregisteredTargetMessage(target, Object.keys(factories)));
    return factory(dispositions);
  });
}
