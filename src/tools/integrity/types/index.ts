/**
 * Shared types for the Generation-Integrity tool (Spec 117).
 *
 * Transcribes the interface contracts from
 * `.kiro/specs/117-token-index-generation-integrity/design.md`
 * (§ Components and Interfaces, § Data Models).
 *
 * Organized into three sections:
 *   1. Verification engine (R2 — Thurgood, test infrastructure)
 *   2. Audit / classification (R1 — Thurgood, audit methodology)
 *   3. Governance artifact (the post-investigation DecisionRecord)
 *
 * NOTE on ownership: this module defines the full type surface so that
 * Task 1.2 (audit run + DivergenceClassifier + AuditReport assembly) and
 * Task 1.3 (DecisionRecord) implement against stable contracts. Task 1.1
 * implements only the comparison engine (Normalizer, SemanticComparator,
 * GenerationIntegrityCheck), the inventory, and the manifest scaffold.
 */

// ============================================================
// 1. VERIFICATION ENGINE — GenerationIntegrityCheck (R2)
// ============================================================

/** File kind, drives parsing + normalization strategy. */
export type ArtifactKind = 'yaml' | 'css' | 'swift' | 'kotlin' | 'json';

/** A single generated artifact under integrity comparison. */
export interface ArtifactRef {
  /** Repo-relative path, e.g. "token-index/primitives.yaml". */
  path: string;
  kind: ArtifactKind;
  /** True when the artifact only exists if configured (e.g. dist/product/*). */
  optional: boolean;
}

/** Dimension tag for triage — refined by the DivergenceClassifier (Task 1.2). */
export type DivergenceDimension =
  | 'color-format'
  | 'component-presence'
  | 'theme-varying'
  | 'other';

/** One semantic difference between committed and fresh for an artifact. */
export interface Divergence {
  /** Stable, derived from `${artifactPath}#${locator}` — used for manifest matching. */
  id: string;
  artifactPath: string;
  /** Token name / key path within the artifact (e.g. "tokens.gray100.value.light.base"). */
  locator: string;
  committedValue: unknown;
  freshValue: unknown;
  dimension: DivergenceDimension;
}

export type ArtifactDiffStatus = 'equal' | 'diverged' | 'missing-committed' | 'missing-fresh';

/** Result of comparing one artifact, committed vs. fresh. */
export interface ArtifactDiff {
  artifact: ArtifactRef;
  status: ArtifactDiffStatus;
  /** Empty when status === 'equal'. */
  divergences: Divergence[];
}

export type GeneratedVia = 'documented-cli' | 'ts-node-workaround';

/** Outcome of the whole check. */
export interface IntegrityResult {
  diffs: ArtifactDiff[];
  /** True only if every diff is 'equal' OR every divergence is allowlisted by the manifest. */
  allEqual: boolean;
  /** True until documented-CLI reproduction (R2 AC4 / P7). */
  provisional: boolean;
  generatedVia: GeneratedVia;
}

/**
 * Adapter that supplies fresh-generate content for comparison.
 *
 * Task 1.1 ships only test doubles for this. The real implementation —
 * running `generate` to a scratch tree (documented CLI when available, else
 * the ts-node workaround) — lands in Task 1.2, where `provisional` and
 * `generatedVia` reflect how the generate actually ran.
 */
export interface FreshGenerator {
  readonly generatedVia: GeneratedVia;
  readonly provisional: boolean;
  /** Fresh content for an artifact path, or null if the fresh generate did not produce it. */
  read(path: string): string | null;
}

/** Normalization applied before comparison — defines "semantic equality" (Design D1). */
export interface NormalizationRule {
  appliesTo: ArtifactKind[] | 'all';
  description: string;
  /** Transform parsed (structured) or raw (text) content, removing/canonicalizing volatile elements. */
  apply(value: unknown, kind: ArtifactKind): unknown;
}

/** Explicit, human-ratified set of divergences that are intentional and acceptable (Design D2). */
export interface IntentionalDivergenceManifestEntry {
  /** `${artifactPath}#${locator}` glob, matched with minimatch. */
  matcher: string;
  reason: string;
  /** Human ratification (ballot governance). */
  approvedBy: string;
  date: string;
}

export interface IntentionalDivergenceManifest {
  version: string;
  entries: IntentionalDivergenceManifestEntry[];
}

/** The core engine: compare committed artifacts against a fresh generate (semantic equality). */
export interface GenerationIntegrityCheck {
  run(opts: {
    inventory: ArtifactRef[];
    manifest: IntentionalDivergenceManifest;
  }): IntegrityResult;
}

// ============================================================
// 2. AUDIT / CLASSIFICATION — R1 (types only in Task 1.1; impl in Task 1.2)
// ============================================================

export type ProvenanceBucket =
  | 'migration-gap' // (a) generator never updated
  | 'generation-bug' // (b) wrong output for current config
  | 'config-drift' // (c) committed predates a config change (stale-but-correct)
  | 'hand-assembly'; // (d) manually edited

export interface Classification {
  divergence: Divergence;
  bucket: ProvenanceBucket;
  /** id of another classification (e.g. a (b) that causes this (c)). */
  causedBy?: string;
  rationale: string;
  /** Which side the fix should converge toward — surfaces the "committed = correct" assumption (P6). */
  correctTarget: 'committed' | 'fresh' | 'neither' | 'unknown';
}

export interface TriagedFinding {
  summary: string;
  disposition: 'in-scope' | 'deferred';
  /** Issues-registry entry when deferred. */
  issueRef?: string;
  /** Why / where / impact (deferral rationale standard). */
  rationale: string;
}

export interface AuditReport {
  inventory: ArtifactRef[];
  classifications: Classification[];
  /** Exported but never imported by a non-test / non-generation module on the OKLCH surface (R1 AC4). */
  orphanedHelpers: string[];
  /** Findings beyond the 3 originals (R1 AC5) — logged, never silently carried. */
  newFindings: TriagedFinding[];
  finding2: {
    documentedCliRuns: boolean;
    configLoadEquivalentToWorkaround: boolean | 'unverified';
  };
  /** True iff every inventory artifact is both diffed AND classified (P2). */
  complete: boolean;
  provisional: boolean;
}

// ============================================================
// 3. GOVERNANCE ARTIFACT — post-investigation DecisionRecord (R1 AC8/AC9)
// ============================================================

export interface DecisionRecord {
  /** Dated (AC9). */
  date: string;
  auditReportRef: string;
  perRequirement: Array<{
    requirement: 'R3' | 'R4' | 'R5';
    determination: 'kept' | 'revised' | 'rescoped';
    rationale: string;
  }>;
  /** The Finding 1 ↔ R5 shared-code-root-cause hypothesis (Decision 4). */
  sharedRootCauseConfirmed: boolean | 'refuted';
}
