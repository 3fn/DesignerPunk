/**
 * Canonical agent source schema (C1) — Spec 122 Task 1.2.
 *
 * One file per agent: `canonical/agents/<agent>.md` = YAML frontmatter + Markdown body.
 * Frontmatter carries the machine-consequential classes (membership, routes, skills,
 * commands, grants, config — everything a transform or guard operates on). The body
 * carries the human-authored classes (formative / reflexive-principle / role-specific
 * prose) and is pass-through verbatim — it is NOT parsed into classes by this schema.
 *
 * design.md § "C1 — Canonical agent source schema" is the authoritative source for the
 * shapes below; this file encodes it faithfully (settled design — do not redesign here).
 *
 * Traces to: Req 2, Req 3, Req 5 AC3, Req 7 AC4, Req 10, Req 11 AC1/AC3, Req 12 AC3/AC6,
 * Req 13, Req 14, Req 18 AC2(a), Req 21 AC1/AC2.
 */

// ============================================================================
// Frontmatter type model
// ============================================================================

export type AgentType = 'owner' | 'consumer' | 'differential-auditor';

/**
 * A single named claim within a governanceAsLaw entry's `assert` list.
 * Rule 3 requires: named `claim`, a `section`, and exactly one of
 * `mustContain` | `pattern`. `pattern` requires the `assertsComment` companion
 * (rendered in source as an inline `# asserts: <plain-English>` YAML comment).
 */
export interface GovernanceAssertClaim {
  /** Named claim id — a failing predicate names WHICH claim moved (A-D3). */
  claim: string;
  /** Interim address form (Req 3 AC2): doc id is on the parent entry; this is the verbatim heading string. */
  section: string;
  /** Claim-distinguishing literal tokens the section content must contain (not topic nouns — A-D1/DD3). */
  mustContain?: string[];
  /** Regex form — REQUIRES `assertsComment` (the `# asserts:` companion, A-D2). */
  pattern?: string;
  /**
   * The plain-English companion for a `pattern:` assert, sourced from the inline
   * `# asserts: <plain-English claim>` YAML comment immediately following the pattern line.
   * Required when `pattern` is present; rule 3 rejects a `pattern` without it.
   */
  assertsComment?: string;
}

export interface GovernanceAsLawEntry {
  /** Doc id resolved against the running docs MCP (C3.1). */
  id: string;
  /** ≥1 required (rule 3). */
  assert: GovernanceAssertClaim[];
  /** Substance adjudicator — the domain owner who rules on predicate mismatches (Req 18 AC3). */
  owner: string;
}

export type GroundTruthManifestVerdict =
  | 'none-standing'
  | 'catalog-is-manifest'
  | 'collapses-into-catalog'
  | 'empty'
  | 'none-trim-stale-snapshots';

/**
 * Structured shape of a demotion cue (K-D1/K-D2). `shape` is a structured enum,
 * NOT free text, so a lint can scan it mechanically.
 */
export type DemotionCueShape =
  | 'single-value'
  | 'per-theme-set'
  | 'per-platform-value'
  | 'collection';

export interface DemotionCue {
  /** The hard negative — what NOT to do (e.g. "do NOT read dist/android/*.kt"). */
  negative: string;
  /** The positive replacement tool. */
  tool: string;
  /** Which MCP serves the replacement tool. */
  mcp: 'docs' | 'application' | 'product';
  /** Structured shape signal (K-D2) — not free text. */
  shape?: DemotionCueShape;
  /** Free-text elaboration — subject to the volatile-fact lint (rule 2). */
  note?: string;
  /** Keys the demotion-diff check (check 8) when this cue supersedes a routed cue elsewhere. */
  replaces?: string;
}

export interface GroundTruthManifestTrim {
  /** The stale/orphaned artifact path being trimmed. */
  artifact: string;
  cue: DemotionCue;
  /**
   * Per K-D1: the negative fires whether or not this artifact is a baseline removal
   * or current output — covers ORPHANED artifacts as a standing negative.
   * Currently the only sanctioned value per design.md's shown usage.
   */
  fires: 'unconditional';
}

export interface GroundTruthManifest {
  verdict: GroundTruthManifestVerdict;
  trims?: GroundTruthManifestTrim[];
}

export interface AmbientBlock {
  governanceAsLaw?: GovernanceAsLawEntry[];
  groundTruthManifest?: GroundTruthManifest;
}

export interface DocRoute {
  id: string;
  doc: string;
  /** Interim address form (Req 3 AC2): verbatim heading string. */
  section: string;
  /** Triggering condition prose — subject to the volatile-fact lint (rule 2). */
  when: string;
}

export type AgentRouteDisposition = 'resolves' | 'not-yet-ported';

export interface AgentRoute {
  target: string;
  when: string;
  disposition: AgentRouteDisposition;
}

export type McpName = 'docs' | 'application' | 'product';

export interface ToolCueRoute {
  when: string;
  tool: string;
  mcp: McpName;
  /** Keys the demotion-diff check (check 8) when this cue replaces a trimmed artifact. */
  replaces?: string;
}

export interface Routes {
  docs?: DocRoute[];
  agents?: AgentRoute[];
  cues?: ToolCueRoute[];
}

export type RunContext = 'this-repo' | 'consumer-repo' | 'per-product';

/** A concrete, named command entry. */
export interface NamedCommandEntry {
  name: string;
  cmd: string;
  runContext: RunContext;
  /** Required when runContext === 'per-product' (rule 4). */
  authoredPerProduct?: boolean;
  /** Provenance — typically 'package.json'. */
  source?: string;
  /** Triggering cue prose — subject to the volatile-fact lint (rule 2). */
  cue?: string;
}

/**
 * A named-gap / consumer-class entry (Req 21 AC1): a verified named gap is valid
 * authored content — e.g. "no gradlew in this repo — build/test runs from the
 * product app's android/ dir."
 */
export interface NamedGapCommandEntry {
  class: string;
  runContext: RunContext;
  /** Required when runContext === 'per-product' (rule 4). */
  authoredPerProduct?: boolean;
  /** The honest, verified gap statement — subject to the volatile-fact lint (rule 2). */
  gap: string;
  /** Triggering cue prose — subject to the volatile-fact lint (rule 2). */
  cue?: string;
}

export type CommandEntry = NamedCommandEntry | NamedGapCommandEntry;

export function isNamedGapCommandEntry(entry: CommandEntry): entry is NamedGapCommandEntry {
  return (entry as NamedGapCommandEntry).gap !== undefined || (entry as NamedGapCommandEntry).class !== undefined;
}

/** Ref into `shared/skills-map.yaml` rows — a row key, never a path. */
export type SkillRef = string;

export interface KnowledgeBaseDeclaration {
  name: string;
  globs: string[];
}

export type StandingFactKind = 'platform-reality' | 'process-reality';

/**
 * (K-D3) A structured home for standing platform-reality facts a regeneration
 * must not re-fabricate. Load-bearing negatives, NOT a `volatile-ok`-annotated
 * body sentence — see design.md's K-D3 rationale block.
 */
export interface StandingFact {
  fact: string;
  kind: StandingFactKind;
  'guards-against': string;
}

export interface ToolSubset {
  'designerpunk-docs'?: string[];
  'designerpunk-application'?: string[];
  'designerpunk-product'?: string[];
}

export interface KiroAgentSpawnCommand {
  command: string;
  timeout_ms: number;
}

export interface KiroFields {
  keyboardShortcut?: string;
  welcomeMessage?: string;
  agentSpawn?: KiroAgentSpawnCommand[];
  [key: string]: unknown;
}

/** The full C1 frontmatter shape for one canonical agent source file. */
export interface AgentFrontmatter {
  agent: string;
  agentType: AgentType;
  description: string;
  ambient?: AmbientBlock;
  routes?: Routes;
  commands?: CommandEntry[];
  skills?: SkillRef[];
  knowledgeBases?: KnowledgeBaseDeclaration[];
  standingFacts?: StandingFact[];
  toolSubset?: ToolSubset;
  writeScope?: string[];
  kiro?: KiroFields;
}

/**
 * A parsed canonical agent source document: structured frontmatter + pass-through
 * body prose. The body is intentionally `string` — it is never parsed into classes.
 */
export interface CanonicalAgentDoc {
  frontmatter: AgentFrontmatter;
  body: string;
  /** Source file path, used only for error messages. */
  sourcePath?: string;
}

// ============================================================================
// Rule 1 — Silent-failure discriminator (Req 2 AC4)
// ============================================================================

/**
 * Every known C1 content class MUST be declared here as `frontmatter` | `body`
 * with a one-line rationale. There is NO default — an undeclared/unknown class
 * is a validation error (rule 1). Adding a new content class to the schema
 * requires adding a row here in the same change.
 */
export type ContentClassForm = 'frontmatter' | 'body';

export interface ContentClassDeclaration {
  form: ContentClassForm;
  /** One-line discriminator rationale (Req 2 AC4) — why this class is structured vs prose. */
  rationale: string;
}

/**
 * The registry of known C1 content classes. This IS the silent-failure
 * discriminator: `validateContentClassDiscriminator` checks candidate class
 * names against this registry and fails closed on anything absent.
 */
export const CONTENT_CLASS_REGISTRY: Readonly<Record<string, ContentClassDeclaration>> = Object.freeze({
  identity: {
    form: 'frontmatter',
    rationale: 'agent/agentType/description are machine-read by adapters to emit config identity fields.',
  },
  ambient: {
    form: 'frontmatter',
    rationale: 'membership (governanceAsLaw, groundTruthManifest) is diff-guarded and drives generation mechanically.',
  },
  routes: {
    form: 'frontmatter',
    rationale: 'routing rows are resolved by id/target and rendered as cues — a transform operates on them.',
  },
  commands: {
    form: 'frontmatter',
    rationale: 'command strings are verified against package.json at regeneration (Req 18 AC2(d)).',
  },
  skills: {
    form: 'frontmatter',
    rationale: 'skill refs are row keys resolved against skills-map.yaml by the adapter (Req 8 AC1/AC2).',
  },
  knowledgeBases: {
    form: 'frontmatter',
    rationale: 'drives the per-agent /knowledge fallback note render (Req 11 AC1) — a template, not prose.',
  },
  standingFacts: {
    form: 'frontmatter',
    rationale: 'load-bearing negatives that must be diff-guarded and machine-addressable (K-D3), not silenced prose.',
  },
  toolSubset: {
    form: 'frontmatter',
    rationale: 'per-MCP grants drawn from the registry (C5) and checked by Req 18 AC2(c) / sweep 6.',
  },
  writeScope: {
    form: 'frontmatter',
    rationale: 'drives the field-driven write-scope behavioral note render (Req 11 AC3) — a different value must render a different note.',
  },
  kiro: {
    form: 'frontmatter',
    rationale: 'Kiro-only config fields carry declared per-field CC dispositions (field-dispositions.yaml, sweep 7).',
  },
  formative: {
    form: 'body',
    rationale: 'hand-authored identity/relationship prose carrying no silent-failure signal that requires structure (Req 2 AC3).',
  },
  'reflexive-principle': {
    form: 'body',
    rationale: 'hand-authored operating-principle prose, pass-through verbatim (Req 2 AC3).',
  },
  'role-specific': {
    form: 'body',
    rationale: 'hand-authored domain-boundary / operational-mode prose, pass-through verbatim (Req 2 AC3).',
  },
});

export interface ValidationError {
  rule: 1 | 2 | 3 | 4 | 5;
  message: string;
  /** Optional pointer to help locate the offending field/line in canonical source. */
  path?: string;
}

/**
 * Rule 1 — silent-failure discriminator: a candidate content class name must
 * appear in CONTENT_CLASS_REGISTRY with a declared form + rationale. There is
 * no default; an unknown class is an error naming the class.
 */
export function validateContentClassDiscriminator(
  candidateClassNames: string[],
  registry: Readonly<Record<string, ContentClassDeclaration>> = CONTENT_CLASS_REGISTRY
): ValidationError[] {
  const errors: ValidationError[] = [];
  for (const className of candidateClassNames) {
    const declaration = registry[className];
    if (!declaration) {
      errors.push({
        rule: 1,
        message: `Content class "${className}" is not declared in the schema registry (frontmatter|body + rationale). There is no default — declare it in CONTENT_CLASS_REGISTRY before use.`,
        path: className,
      });
      continue;
    }
    if (declaration.form !== 'frontmatter' && declaration.form !== 'body') {
      errors.push({
        rule: 1,
        message: `Content class "${className}" has an invalid declared form "${declaration.form}" — must be "frontmatter" or "body".`,
        path: className,
      });
    }
    if (!declaration.rationale || declaration.rationale.trim().length === 0) {
      errors.push({
        rule: 1,
        message: `Content class "${className}" is declared without a one-line discriminator rationale (Req 2 AC4 requires one).`,
        path: className,
      });
    }
  }
  return errors;
}

// ============================================================================
// Rule 2 — Volatile-fact lint (Req 12 AC6) — a FLOOR, not full enforcement
// ============================================================================

/**
 * Named false-negative classes this lint does NOT catch (documented per design.md
 * rule 2 — this is intentionally a floor, backstopped by the tool-routed-cue
 * authoring rule, DD11):
 *   - spelled-out integers ("twenty-eight components")
 *   - noun-first orderings ("components: 28 in the catalog") — the noun does not
 *     immediately precede/follow the integer in a detectable adjacency window
 *   - values embedded in prose without an adjacent inventory noun (a bare version-
 *     looking number with no nearby inventory noun and no semver punctuation)
 * These are NOT bugs to fix here — rule 2 is deliberately a heuristic floor.
 */
export const VOLATILE_FACT_LINT_FALSE_NEGATIVE_CLASSES = Object.freeze([
  'spelled-out-integers',
  'noun-first-orderings',
  'values-without-adjacent-inventory-noun',
] as const);

const INVENTORY_NOUNS = ['components', 'tokens', 'docs', 'specs', 'concepts', 'sections', 'agents'];
// Integer adjacent (within a short word window) to an inventory noun, either order:
// "28 components" or "components: 28" / "components 28".
const INVENTORY_COUNT_PATTERN = new RegExp(
  `(\\b\\d+\\s+(?:${INVENTORY_NOUNS.join('|')})\\b)|(\\b(?:${INVENTORY_NOUNS.join('|')})\\b\\s*[:]?\\s*\\d+\\b)`,
  'i'
);
// Semver strings: 1.2.3, 1.2.3-beta.1, etc.
const SEMVER_PATTERN = /\b\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?\b/;
// "N of M" forms: "5 of 8", "5/8" is NOT matched (that's a fraction, not spelled "of").
const N_OF_M_PATTERN = /\b\d+\s+of\s+\d+\b/i;

const BODY_VOLATILE_OK_MARKER = /<!--\s*volatile-ok:\s*(.+?)\s*-->/i;
const FRONTMATTER_VOLATILE_OK_MARKER = /volatile-ok:\s*(.+)$/i;

function lineHasVolatileHit(line: string): boolean {
  return (
    INVENTORY_COUNT_PATTERN.test(line) ||
    SEMVER_PATTERN.test(line) ||
    N_OF_M_PATTERN.test(line)
  );
}

/**
 * Rule 2 — volatile-fact lint. Scans BODY prose (line by line) for the heuristic
 * volatile-fact signatures. A hit is exempt only if the same line carries an
 * inline `<!-- volatile-ok: <reason> -->` marker.
 */
export function lintVolatileFactsInBody(body: string): ValidationError[] {
  const errors: ValidationError[] = [];
  const lines = body.split('\n');
  lines.forEach((line, index) => {
    if (!lineHasVolatileHit(line)) return;
    if (BODY_VOLATILE_OK_MARKER.test(line)) return;
    errors.push({
      rule: 2,
      message: `Volatile-fact lint: line ${index + 1} appears to embed a volatile system fact (integer near an inventory noun, semver string, or "N of M" form) without a "<!-- volatile-ok: <reason> -->" annotation.`,
      path: `body:line:${index + 1}`,
    });
  });
  return errors;
}

/** The authored frontmatter string fields the lint covers per design.md rule 2 (SP-D1 ≡ K-D2 ≡ L2). */
const VOLATILE_SCANNED_FRONTMATTER_FIELDS = ['cue', 'note', 'gap', 'when', 'reason'] as const;
type VolatileScannedFrontmatterField = (typeof VOLATILE_SCANNED_FRONTMATTER_FIELDS)[number];

/**
 * A minimal shape describing one authored frontmatter string value the lint should
 * scan, plus a path for error reporting. Callers (the frontmatter walker) extract
 * these from the parsed AgentFrontmatter; kept as a flat input here so this
 * function is independently testable without a full frontmatter walker.
 */
export interface FrontmatterStringField {
  field: VolatileScannedFrontmatterField;
  value: string;
  /** Inline volatile-ok annotation for THIS field, if authored alongside it. */
  volatileOk?: string;
  /** Pointer for error messages, e.g. "ambient.groundTruthManifest.trims[0].cue.note". */
  path: string;
}

/**
 * Rule 2 (frontmatter half) — scans the authored free-text frontmatter string
 * fields (`cue`/`note`/`gap`/`when`/`reason`) for the same heuristic signatures.
 * A hit is exempt only if that field carries its own inline `volatile-ok: <reason>`
 * annotation (modeled here as the sibling `volatileOk` value on the same entry).
 */
export function lintVolatileFactsInFrontmatterFields(
  fields: FrontmatterStringField[]
): ValidationError[] {
  const errors: ValidationError[] = [];
  for (const { field, value, volatileOk, path } of fields) {
    if (!lineHasVolatileHit(value)) continue;
    if (volatileOk && volatileOk.trim().length > 0) continue;
    errors.push({
      rule: 2,
      message: `Volatile-fact lint: frontmatter field "${field}" at ${path} appears to embed a volatile system fact without a "volatile-ok: <reason>" annotation.`,
      path,
    });
  }
  return errors;
}

/**
 * Convenience: extract the standard volatile-scanned string fields from a parsed
 * AgentFrontmatter (routes.docs[].when, routes.agents[].when, routes.cues[].when,
 * commands[].cue, gap, groundTruthManifest.trims[].cue.note). Not exhaustive of
 * every possible future field — new frontmatter string fields must be added here
 * AND registered per rule 1 if they constitute a new content class.
 */
export function extractVolatileScannedFrontmatterFields(
  frontmatter: AgentFrontmatter
): FrontmatterStringField[] {
  const fields: FrontmatterStringField[] = [];

  frontmatter.routes?.docs?.forEach((route, i) => {
    if (route.when) {
      fields.push({ field: 'when', value: route.when, path: `routes.docs[${i}].when` });
    }
  });
  frontmatter.routes?.agents?.forEach((route, i) => {
    if (route.when) {
      fields.push({ field: 'when', value: route.when, path: `routes.agents[${i}].when` });
    }
  });
  frontmatter.routes?.cues?.forEach((route, i) => {
    if (route.when) {
      fields.push({ field: 'when', value: route.when, path: `routes.cues[${i}].when` });
    }
  });
  frontmatter.commands?.forEach((entry, i) => {
    if (entry.cue) {
      fields.push({ field: 'cue', value: entry.cue, path: `commands[${i}].cue` });
    }
    if (isNamedGapCommandEntry(entry) && entry.gap) {
      fields.push({ field: 'gap', value: entry.gap, path: `commands[${i}].gap` });
    }
  });
  frontmatter.ambient?.groundTruthManifest?.trims?.forEach((trim, i) => {
    if (trim.cue?.note) {
      fields.push({ field: 'note', value: trim.cue.note, path: `ambient.groundTruthManifest.trims[${i}].cue.note` });
    }
    if (trim.cue?.negative) {
      fields.push({ field: 'note', value: trim.cue.negative, path: `ambient.groundTruthManifest.trims[${i}].cue.negative` });
    }
  });

  return fields;
}

// ============================================================================
// Rule 3 — Predicate presence + per-claim keying + regex governance
// ============================================================================

/** Patterns rejected as trivially permissive (A-D2): match everything, or match empty string. */
function isTriviallyPermissivePattern(pattern: string): boolean {
  const trimmed = pattern.trim();
  if (trimmed.length === 0) return true;
  if (trimmed === '.*' || trimmed === '.+') return true;
  // A pattern that matches the empty string is trivially permissive.
  try {
    const re = new RegExp(`^(?:${trimmed})$`);
    if (re.test('')) return true;
  } catch {
    // Invalid regex is a distinct failure, surfaced separately below by the caller
    // constructing the RegExp for real use; here we don't fail on unparsable input,
    // we only judge permissiveness of parsable input.
  }
  return false;
}

/**
 * Rule 3 — every governanceAsLaw entry MUST carry ≥1 `assert` and an `owner`;
 * each assert is a named `claim` with `section` + (`mustContain` | `pattern`);
 * `pattern` REQUIRES an `assertsComment` companion; trivially-permissive patterns
 * are rejected.
 */
export function validateGovernanceAsLaw(entries: GovernanceAsLawEntry[] | undefined): ValidationError[] {
  const errors: ValidationError[] = [];
  if (!entries) return errors;

  entries.forEach((entry, entryIndex) => {
    const entryPath = `ambient.governanceAsLaw[${entryIndex}]`;

    if (!entry.owner || entry.owner.trim().length === 0) {
      errors.push({
        rule: 3,
        message: `governanceAsLaw entry "${entry.id}" is missing a required "owner" (Req 18 AC3 substance adjudicator).`,
        path: `${entryPath}.owner`,
      });
    }

    if (!entry.assert || entry.assert.length === 0) {
      errors.push({
        rule: 3,
        message: `governanceAsLaw entry "${entry.id}" carries zero "assert" claims — at least one is required (Req 18 AC2(a) cannot silently degrade).`,
        path: `${entryPath}.assert`,
      });
      return;
    }

    entry.assert.forEach((claim, claimIndex) => {
      const claimPath = `${entryPath}.assert[${claimIndex}]`;

      if (!claim.claim || claim.claim.trim().length === 0) {
        errors.push({
          rule: 3,
          message: `Assert at ${claimPath} is missing a named "claim" — a failing predicate must name which claim moved (A-D3).`,
          path: `${claimPath}.claim`,
        });
      }

      if (!claim.section || claim.section.trim().length === 0) {
        errors.push({
          rule: 3,
          message: `Assert "${claim.claim ?? '(unnamed)'}" at ${claimPath} is missing a "section".`,
          path: `${claimPath}.section`,
        });
      }

      const hasMustContain = Array.isArray(claim.mustContain) && claim.mustContain.length > 0;
      // "authored" = the key is present at all, even as an empty string — an empty
      // pattern is a trivially-permissive AUTHORED pattern, not an absent one.
      const patternAuthored = typeof claim.pattern === 'string';

      if (!hasMustContain && !patternAuthored) {
        errors.push({
          rule: 3,
          message: `Assert "${claim.claim ?? '(unnamed)'}" at ${claimPath} carries neither "mustContain" nor "pattern" — exactly one is required.`,
          path: claimPath,
        });
      }

      if (hasMustContain && patternAuthored) {
        errors.push({
          rule: 3,
          message: `Assert "${claim.claim}" at ${claimPath} carries BOTH "mustContain" and "pattern" — exactly one is required, not both.`,
          path: claimPath,
        });
      }

      if (patternAuthored) {
        if (!claim.assertsComment || claim.assertsComment.trim().length === 0) {
          errors.push({
            rule: 3,
            message: `Assert "${claim.claim}" at ${claimPath} uses "pattern" without a required "# asserts: <plain-English>" companion (A-D2).`,
            path: `${claimPath}.assertsComment`,
          });
        }

        if (isTriviallyPermissivePattern(claim.pattern as string)) {
          errors.push({
            rule: 3,
            message: `Assert "${claim.claim}" at ${claimPath} uses a trivially-permissive pattern ("${claim.pattern}") — patterns matching everything or the empty string are rejected (A-D2).`,
            path: `${claimPath}.pattern`,
          });
        }
      }
    });
  });

  return errors;
}

// ============================================================================
// Rule 4 — Run-context enum (Req 12 AC3)
// ============================================================================

const VALID_RUN_CONTEXTS: readonly RunContext[] = ['this-repo', 'consumer-repo', 'per-product'];

/**
 * Rule 4 — `runContext` must be one of the three enumerated values;
 * `per-product` entries must carry `authoredPerProduct: true`.
 */
export function validateRunContexts(commands: CommandEntry[] | undefined): ValidationError[] {
  const errors: ValidationError[] = [];
  if (!commands) return errors;

  commands.forEach((entry, index) => {
    const label = isNamedGapCommandEntry(entry) ? entry.class : entry.name;
    const path = `commands[${index}]`;

    if (!VALID_RUN_CONTEXTS.includes(entry.runContext)) {
      errors.push({
        rule: 4,
        message: `Command entry "${label}" at ${path} has runContext "${entry.runContext}" — must be one of ${VALID_RUN_CONTEXTS.join(', ')}.`,
        path: `${path}.runContext`,
      });
      return;
    }

    if (entry.runContext === 'per-product' && entry.authoredPerProduct !== true) {
      errors.push({
        rule: 4,
        message: `Command entry "${label}" at ${path} has runContext "per-product" but is missing "authoredPerProduct: true" (Req 12 AC3).`,
        path: `${path}.authoredPerProduct`,
      });
    }
  });

  return errors;
}

// ============================================================================
// Rule 5 — Membership hygiene (Req 9 AC2)
// ============================================================================

/**
 * Rule 5 — an always-set doc `id` appearing under `ambient.*` (governanceAsLaw
 * entries, in the current schema) is a validation ERROR. Always-set membership
 * lives only in `shared/always-set.yaml`; per-agent always-set opt-outs must be
 * inexpressible by construction. The always-set id list is an injected
 * dependency (authored in Task 1.3) so this rule is testable in isolation now.
 */
export function validateMembershipHygiene(
  ambient: AmbientBlock | undefined,
  alwaysSetIds: readonly string[]
): ValidationError[] {
  const errors: ValidationError[] = [];
  if (!ambient) return errors;

  const alwaysSet = new Set(alwaysSetIds);

  ambient.governanceAsLaw?.forEach((entry, index) => {
    if (alwaysSet.has(entry.id)) {
      errors.push({
        rule: 5,
        message: `ambient.governanceAsLaw[${index}] references "${entry.id}", which is an always-set doc id. Always-set membership lives only in shared/always-set.yaml — per-agent always-set opt-outs are inexpressible by construction (Req 9 AC2).`,
        path: `ambient.governanceAsLaw[${index}].id`,
      });
    }
  });

  return errors;
}

// ============================================================================
// Composed validate(doc)
// ============================================================================

export interface ValidateOptions {
  /** Injected always-set doc ids (Task 1.3 authors shared/always-set.yaml; testable in isolation until then). */
  alwaysSetIds: readonly string[];
  /** Optional override of the content-class registry (defaults to CONTENT_CLASS_REGISTRY). */
  contentClassRegistry?: Readonly<Record<string, ContentClassDeclaration>>;
}

/**
 * Composed validator: runs all five schema rules against a parsed canonical
 * agent doc and returns the union of ValidationErrors. An empty array means
 * the doc passes all five rules.
 */
export function validate(doc: CanonicalAgentDoc, options: ValidateOptions): ValidationError[] {
  const errors: ValidationError[] = [];

  // Rule 1 is a registry-integrity check, not a per-doc structural check — it
  // guards the schema itself. Run it against the fixed set of classes this
  // schema's frontmatter shape actually uses, so a doc-level validate() call
  // still exercises rule 1's registry.
  errors.push(
    ...validateContentClassDiscriminator(
      Object.keys(CONTENT_CLASS_REGISTRY),
      options.contentClassRegistry
    )
  );

  errors.push(...lintVolatileFactsInBody(doc.body));
  errors.push(
    ...lintVolatileFactsInFrontmatterFields(extractVolatileScannedFrontmatterFields(doc.frontmatter))
  );

  errors.push(...validateGovernanceAsLaw(doc.frontmatter.ambient?.governanceAsLaw));
  errors.push(...validateRunContexts(doc.frontmatter.commands));
  errors.push(...validateMembershipHygiene(doc.frontmatter.ambient, options.alwaysSetIds));

  return errors;
}
