/**
 * Ambient composition (C3.2) — Spec 122 Task 2.3.
 *
 * design.md § "C3.2 Ambient composition": `membership = alwaysSet ∪ agent.ambient`
 * (Req 9 AC1/AC3, the RATIFIED composition rule). The result is emitted per target as
 * `canonical/manifests/<agent>.<target>.ambient-manifest.json` — the machine-readable
 * membership statement sweep 4, check 8, Req 10 AC4's set-inclusion, and the Req 23
 * measurements all key on. Members carry their DELIVERY LANE (shared = the always-set,
 * delivered via CLAUDE.md `@`-imports on CC / inclusion-always on Kiro; per-agent =
 * delivered inline on CC / resources on Kiro) so the C11 two-lane split cannot silently
 * drop membership (sweep 4 checks the union regardless of lane).
 *
 * Manifest VERDICTS are honored as DATA (Req 10 AC2/AC3): a verdict value maps to a fixed
 * generation directive ({@link deriveGroundTruthDirective}) the adapters consume — no
 * standing manifest is ever built; every surface points at tools that compute fresh.
 *
 * P3 (union composition): the emitted manifest ⊇ the always-set, always.
 *
 * Traces to: Req 9 AC1/AC3, Req 10 AC1/AC2/AC3/AC4.
 */

import { load as loadYaml } from 'js-yaml';
import { canonicalStringify, type JsonValue } from './canonical-json';
import type {
  AgentFrontmatter,
  GroundTruthManifest,
  GroundTruthManifestTrim,
  GroundTruthManifestVerdict,
} from './schema';

export type Target = 'cc' | 'kiro';
export type AmbientLane = 'shared' | 'per-agent';
export type DeliveryForm = 'file' | 'skill';

// ============================================================================
// Always-set input (parsed from shared/always-set.yaml)
// ============================================================================

export interface AlwaysSetMember {
  id: string;
  class: string;
  delivery: { cc: DeliveryForm; kiro: DeliveryForm };
}

/** Parse `shared/always-set.yaml` text into its member list (pure; caller reads the file). */
export function parseAlwaysSet(yamlText: string): AlwaysSetMember[] {
  const parsed = loadYaml(yamlText) as { alwaysSet?: AlwaysSetMember[] } | null;
  return parsed?.alwaysSet ?? [];
}

/** The always-set doc ids — the union's shared leg (also the rule-5 membership-hygiene list). */
export function alwaysSetIds(members: readonly AlwaysSetMember[]): string[] {
  return members.map((m) => m.id);
}

// ============================================================================
// Ambient manifest
// ============================================================================

export interface AmbientManifestMember {
  id: string;
  class: string;
  lane: AmbientLane;
  delivery: DeliveryForm;
}

/** The fixed generation directive a ground-truth verdict maps to (Req 10 AC2/AC3). */
export interface GroundTruthDirective {
  verdict: GroundTruthManifestVerdict;
  /** none-trim-stale-snapshots → false: NEVER emit the trimmed artifact reference. */
  emitArtifactRefs: boolean;
  /** catalog-is-manifest → the assembly-grain faithfulness verbs (Req 10 AC3). */
  faithfulnessVerbs?: string[];
  /** empty → true: emit nothing, recorded as intentional (Req 10 AC2). */
  intentionalEmpty?: boolean;
  /** The trims to render demotion cues for (none-trim-stale-snapshots). */
  trims?: GroundTruthManifestTrim[];
}

export interface AmbientManifest {
  agent: string;
  target: Target;
  /** Union members, sorted by id (deterministic). */
  members: AmbientManifestMember[];
  groundTruth?: GroundTruthDirective;
}

/**
 * Map a ground-truth-manifest verdict to its fixed generation directive (Req 10 AC2/AC3).
 * Honored as DATA — the adapters branch on these fields, never on a re-read of the verdict
 * string. No standing manifest is built for any verdict.
 */
export function deriveGroundTruthDirective(
  manifest: GroundTruthManifest | undefined
): GroundTruthDirective | undefined {
  if (!manifest) return undefined;
  const base: GroundTruthDirective = { verdict: manifest.verdict, emitArtifactRefs: true };
  switch (manifest.verdict) {
    case 'none-trim-stale-snapshots':
      return { ...base, emitArtifactRefs: false, trims: manifest.trims ?? [] };
    case 'catalog-is-manifest':
      // Lina's cue carries the assembly-grain faithfulness verbs, not mere enumeration.
      return { ...base, faithfulnessVerbs: ['get_component_full', 'get_component_health'] };
    case 'empty':
      return { ...base, intentionalEmpty: true };
    case 'none-standing':
    case 'collapses-into-catalog':
      return base;
  }
}

/**
 * Compose an agent's ambient membership for a target: the union of the always-set (shared
 * lane) and the agent's per-agent five-class members (per-agent lane). Members are
 * deduplicated by id (rule 5 forbids an always-set id under per-agent ambient, so this is
 * defensive — the shared lane wins) and sorted by id for a deterministic manifest.
 *
 * The per-agent five-class members currently expressible in canonical frontmatter are the
 * `ambient.governanceAsLaw` doc refs (class `governance-as-law`); the ground-truth verdict
 * is carried as a directive rather than as a doc member.
 */
export function composeAmbient(params: {
  agent: string;
  frontmatter: AgentFrontmatter;
  alwaysSet: readonly AlwaysSetMember[];
  target: Target;
}): AmbientManifest {
  const { agent, frontmatter, alwaysSet, target } = params;
  const byId = new Map<string, AmbientManifestMember>();

  // Shared leg: the locked always-set (P3 — always present).
  for (const member of alwaysSet) {
    byId.set(member.id, {
      id: member.id,
      class: member.class,
      lane: 'shared',
      delivery: member.delivery[target],
    });
  }

  // Per-agent leg: governance-as-law doc refs. Shared-lane members already present are not
  // overwritten (defensive dedup; rule 5 makes the collision a validation error upstream).
  for (const entry of frontmatter.ambient?.governanceAsLaw ?? []) {
    if (!byId.has(entry.id)) {
      byId.set(entry.id, { id: entry.id, class: 'governance-as-law', lane: 'per-agent', delivery: 'file' });
    }
  }

  const members = Array.from(byId.values()).sort((a, b) => (a.id < b.id ? -1 : a.id > b.id ? 1 : 0));

  return {
    agent,
    target,
    members,
    groundTruth: deriveGroundTruthDirective(frontmatter.ambient?.groundTruthManifest),
  };
}

/** Serialize an ambient manifest to canonical (deterministic) JSON for committing. */
export function serializeAmbientManifest(manifest: AmbientManifest): string {
  return canonicalStringify(manifest as unknown as JsonValue);
}
