/**
 * The pipeline engine spine (C3) — Spec 122 Task 2.
 *
 * design.md § "C3 — The pipeline engine" defines the interface:
 *   validate(source)   — C1 rules 1–5 (schema.ts) + the WORKFLOW_RULES anti-duplication
 *                        guard (workflow-rules-guard.ts).
 *   resolveAgent(doc)  — resolve corpus refs by id (C3.1, resolve.ts) + compose the ambient
 *                        membership per target (C3.2, compose.ts).
 *   emit(agent, adapters) — per-target artifact emission. LANDS WITH THE ADAPTERS (Task 5 /
 *                        C4); declared here in the {@link Pipeline} interface as the forward
 *                        contract so adapters slot in with no spine change (Req 24 AC3).
 *
 * This module wires the Task-2 operations (resolve / render / compose / attribution) into a
 * coherent engine. It holds NO adapter, registry (C5/Task 4), or skills-map (C2.2/Task 3)
 * logic — those join `ResolveContext` as they land.
 *
 * Traces to: Req 1, Req 3, Req 9, Req 10.
 */

import {
  validate as validateSchema,
  validateContentClassDiscriminator,
  type CanonicalAgentDoc,
  type ValidationError,
} from './schema';
import { guardCanonicalAgentBodies, type WorkflowRule } from './workflow-rules-guard';
import { CorpusResolver, describeUnresolved, type DocResolution, type SectionResolution } from './resolve';
import { composeAmbient, type AlwaysSetMember, type AmbientManifest } from './compose';

// ============================================================================
// Rule 1 — per-doc enforcement (Task 1 open item 1: wire the discriminator to a
// parsed doc's ACTUAL top-level frontmatter keys, not just a registry self-check)
// ============================================================================

/**
 * Maps each known top-level frontmatter KEY to its content class (schema.ts
 * CONTENT_CLASS_REGISTRY). Identity fields (agent/agentType/description) share the
 * `identity` class; every other key IS its class name. An authored key absent from this map
 * resolves to itself as a class name, which is absent from the registry — so rule 1 fails on
 * it by construction (no silent acceptance of an unknown frontmatter key).
 */
const FRONTMATTER_KEY_TO_CLASS: Readonly<Record<string, string>> = Object.freeze({
  agent: 'identity',
  agentType: 'identity',
  description: 'identity',
  ambient: 'ambient',
  routes: 'routes',
  commands: 'commands',
  skills: 'skills',
  knowledgeBases: 'knowledgeBases',
  standingFacts: 'standingFacts',
  toolSubset: 'toolSubset',
  writeScope: 'writeScope',
  kiro: 'kiro',
});

/**
 * Rule 1, per-doc: every ACTUAL top-level frontmatter key must map to a class the schema
 * registry declares. An unknown key (typo, undeclared new class) fails rather than passing
 * silently — the enforcement Task 1 deferred to C3/Task 2.
 */
export function validateFrontmatterClasses(doc: CanonicalAgentDoc): ValidationError[] {
  const classNames = Object.keys(doc.frontmatter).map((key) => FRONTMATTER_KEY_TO_CLASS[key] ?? key);
  // De-duplicate so a doc with three identity fields reports at most one identity result.
  return validateContentClassDiscriminator([...new Set(classNames)]);
}

// ============================================================================
// Validate
// ============================================================================

export interface ValidationResult {
  valid: boolean;
  /** Schema rules 1–5 (schema.ts). */
  schemaErrors: ValidationError[];
  /** WORKFLOW_RULES hand-restatement hits in the body (Req 4 AC3). */
  duplicationErrors: { sourcePath: string; matchedPhrase: string; line: number }[];
}

/**
 * Validate a parsed canonical agent doc: the five schema rules (schema.ts) plus the
 * WORKFLOW_RULES anti-duplication guard over the body prose. Invalid canonical source cannot
 * produce blessed output — the diff-guard job runs generation, which runs validation first
 * (design § Error Handling).
 */
export function validate(doc: CanonicalAgentDoc, alwaysSetIds: readonly string[]): ValidationResult {
  const schemaErrors = [...validateFrontmatterClasses(doc), ...validateSchema(doc, { alwaysSetIds })];
  const dupHits = guardCanonicalAgentBodies([{ sourcePath: doc.sourcePath ?? doc.frontmatter.agent, body: doc.body }]);
  const duplicationErrors = dupHits.flatMap((hit) =>
    hit.errors.map((e) => ({ sourcePath: hit.sourcePath, matchedPhrase: e.matchedPhrase, line: e.line }))
  );
  return {
    valid: schemaErrors.length === 0 && duplicationErrors.length === 0,
    schemaErrors,
    duplicationErrors,
  };
}

// ============================================================================
// Resolve
// ============================================================================

/** The context a resolveAgent pass reads. Grows as substrate lands (registry: Task 4; skillsMap: Task 3). */
export interface ResolveContext {
  corpus: CorpusResolver;
  alwaysSet: readonly AlwaysSetMember[];
  workflowRules: readonly WorkflowRule[];
}

export type RefKind = 'doc-route' | 'law-assert';

/** One resolved corpus ref, with the leg it came from and a human-readable failure detail. */
export interface RefResolution {
  kind: RefKind;
  /** The doc id resolved (route.doc, or the governanceAsLaw entry id). */
  id: string;
  /** The verbatim heading (interim section form), when the ref is section-grain. */
  section?: string;
  /** Where in the frontmatter this ref lives, for error reporting. */
  path: string;
  resolved: boolean;
  /** Set when `resolved` is false — names the failing leg with id + heading. */
  detail?: string;
}

/** A fully resolved agent: the source, its corpus-ref resolutions, and per-target ambient manifests. */
export interface ResolvedAgent {
  agent: string;
  doc: CanonicalAgentDoc;
  resolutions: RefResolution[];
  /** The refs that did NOT resolve — the sweeps (Task 7) / C7 (Task 6) adjudicate these. */
  unresolved: RefResolution[];
  ambientManifests: { cc: AmbientManifest; kiro: AmbientManifest };
}

/**
 * Collect every corpus-resolvable ref in the frontmatter (design C3.1 scope): the `routes.docs`
 * section refs and the `ambient.governanceAsLaw` per-claim section refs. Tool cues (registry,
 * Task 4) and agent routes (cutover ledger, Task 6) resolve elsewhere and are not walked here.
 */
function collectCorpusRefs(doc: CanonicalAgentDoc): Array<{ kind: RefKind; id: string; section: string; path: string }> {
  const refs: Array<{ kind: RefKind; id: string; section: string; path: string }> = [];
  const fm = doc.frontmatter;

  fm.routes?.docs?.forEach((route, i) => {
    refs.push({ kind: 'doc-route', id: route.doc, section: route.section, path: `routes.docs[${i}]` });
  });
  fm.ambient?.governanceAsLaw?.forEach((entry, ei) => {
    entry.assert?.forEach((claim, ci) => {
      refs.push({
        kind: 'law-assert',
        id: entry.id,
        section: claim.section,
        path: `ambient.governanceAsLaw[${ei}].assert[${ci}]`,
      });
    });
  });

  return refs;
}

/**
 * Resolve an agent: resolve its corpus refs by id (interim section form) against the running
 * docs MCP, and compose its ambient membership for both targets (P3: each manifest ⊇ the
 * always-set). Does NOT throw on an unresolved ref — it reports; the sweeps / canonical-vs-truth
 * check adjudicate. `emit` (Task 5) turns a ResolvedAgent into per-target artifacts.
 */
export async function resolveAgent(doc: CanonicalAgentDoc, ctx: ResolveContext): Promise<ResolvedAgent> {
  const refs = collectCorpusRefs(doc);
  const resolutions: RefResolution[] = [];

  for (const ref of refs) {
    const result: DocResolution | SectionResolution = await ctx.corpus.resolveSection(ref.id, ref.section);
    resolutions.push({
      kind: ref.kind,
      id: ref.id,
      section: ref.section,
      path: ref.path,
      resolved: result.resolved,
      detail: describeUnresolved(result),
    });
  }

  const agent = doc.frontmatter.agent;
  return {
    agent,
    doc,
    resolutions,
    unresolved: resolutions.filter((r) => !r.resolved),
    ambientManifests: {
      cc: composeAmbient({ agent, frontmatter: doc.frontmatter, alwaysSet: ctx.alwaysSet, target: 'cc' }),
      kiro: composeAmbient({ agent, frontmatter: doc.frontmatter, alwaysSet: ctx.alwaysSet, target: 'kiro' }),
    },
  };
}

// ============================================================================
// Emit — the forward contract (implemented with the adapters, Task 5 / C4)
// ============================================================================

/** One emitted artifact + its attribution sidecar (C3.3). Produced by `emit` (Task 5). */
export interface EmittedArtifact {
  path: string;
  content: string;
  attributionPath: string;
  attributionContent: string;
}

/**
 * The full C3 pipeline contract. The Task-2 engine implements `validate` + `resolveAgent`
 * (above, as functions); `emit` lands with the target adapters (Task 5 / C4) — declared here
 * so adapters slot into the same contract without a spine change (Req 24 AC3). A future
 * `PipelineEngine implements Pipeline` composes these once `emit` exists.
 */
export interface Pipeline {
  validate(doc: CanonicalAgentDoc, alwaysSetIds: readonly string[]): ValidationResult;
  resolveAgent(doc: CanonicalAgentDoc, ctx: ResolveContext): Promise<ResolvedAgent>;
  // emit(agent: ResolvedAgent, adapters: TargetAdapter[]): EmittedArtifact[];  // Task 5 / C4
}
