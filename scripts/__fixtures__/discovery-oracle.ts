/**
 * Frozen Discovery Map-Oracle — Spec 119-A, Task 10.1 (Req 11 AC4 / Req 13 AC1–AC2, AC7)
 *
 * POINT-IN-TIME TEST FIXTURE — NOT a living navigational doc.
 * ----------------------------------------------------------------------------
 * This is the frozen, human-validated answer key extracted from the meta-guide's
 * ("00-steering-documentation-directional-priorities.md") "Tier 2: MCP-Only
 * Documents" concept→doc map BEFORE the meta-guide is removed (Task 10.5).
 *
 * Hard precondition (Req 11 AC4): captured while the meta-guide still exists.
 * Stale-strip (Req 13 AC2): the map's pointers were human-validated against the
 *   live 80-doc `governance/` served set; entries whose target no longer exists,
 *   was superseded, or is not in the served set are STRIPPED (see STRIP LOG).
 * Keying (B5 / design Component 6): `expectedDocIds` is keyed on the doc's stable
 *   `id` (addressing plane), NOT on path. The harness translates `find_docs`
 *   `path` results → `id` at scoring time.
 *
 * Dual purpose (Req 13 AC7): this fixture is ALSO retained as 119-B's non-circular
 *   "before" anchor for the discovery-quality case study. It is a fixture/anchor
 *   ONLY — it must NEVER be wired back in as a navigational fallback doc (doing so
 *   would re-create the Documentation Directory drift surface 119-A removes).
 *
 * Provenance: meta-guide "Tier 2: MCP-Only Documents" section (lines ~146–249),
 *   captured 2026-06-29 against the post-relocation `governance/` corpus.
 *
 * ============================================================================
 * STRIP LOG (Req 13 AC2 — human judgment calls, recorded for review)
 * ============================================================================
 * Applying AC2's strict strip criteria (target no-longer-exists / superseded /
 * not-in-served-set), ZERO map pointers qualified for stripping: every one of
 * the meta-guide's Tier-2 doc pointers resolves to a live `governance/` id.
 * (Likely because Tasks 1/4/6 just touched every doc — the map's doc-pointer
 * axis had not actually rotted.) Candor note: no strips were manufactured to
 * appear thorough.
 *
 * CANDIDATES EVALUATED AND REJECTED (kept, with reasoning):
 *  - "A Vision of the Future" (id: a-vision-of-the-future): the meta-guide marks
 *    it "(optional)". Borderline — a Layer-3 vision/narrative doc, low value as a
 *    task-routing target. NOT stripped: it still exists, is not superseded, and
 *    is in the served set; "optional" is an editorial preference, not staleness.
 *    Flagged for Peter — if he wants the oracle to test only guidance-routing
 *    concepts, this entry (concept "vision") is the one to drop.
 *  - "AI-Collaboration-Framework" (id: ai-collaboration-framework): could look
 *    redundant with the always-loaded AI-Collaboration-Principles. NOT stripped:
 *    it is the deeper manual-served protocol doc, a legitimate discovery target.
 *
 * ID-DIVERGENCE-FROM-FILENAME NOTES (ambiguous mappings resolved, recorded):
 * The meta-guide pointed by OLD path/title; several docs carry an `id` that
 * deliberately diverges from the filename (Decision 3: id is frozen, semantically
 * inert, may drift from title). Resolved mappings:
 *  - "Integration Methodology"        (Process-Integration-Methodology.md) → integration-methodology
 *  - "Component Templates"            (Component-Templates.md)             → component-family-templates
 *  - "Component-MCP-Document-Template"(Component-MCP-Document-Template.md) → mcp-component-family-document-template
 *  - "Primitive-vs-Semantic-Philosophy"(Component-Primitive-vs-Semantic-Philosophy.md) → primitive-vs-semantic-usage-philosophy
 *  - "Component-Family-Progress"      (Component-Family-Progress.md)       → progress-indicator-components
 * These are NOT strips — the target docs exist and are correct; only the id-string
 * differs from what a naive filename-slug would predict. Each was verified against
 * the live frontmatter `id:`.
 * ============================================================================
 */

export type MatchConfidence = 'strong' | 'partial' | 'none';

export interface OracleEntry {
  /** A map category/concept (axis a) OR an agent domain query (axis b, Req 13 AC3). */
  concept: string;
  /** Human-validated, stale-stripped target doc id(s) (addressing plane). */
  expectedDocIds: string[];
  /**
   * Provenance tag for auditability:
   *  - 'map-concept'  : drawn from the meta-guide Tier-2 map (axis a)
   *  - 'agent-query'  : an agent's domain discovery query (axis b)
   * A concept may legitimately serve both axes; it is tagged by its primary origin.
   */
  source: 'map-concept' | 'agent-query';
  /** Which agent domain the query exercises (axis b only). */
  agentDomain?: 'ada' | 'lina' | 'thurgood' | 'leonardo';
}

/**
 * AXIS (a): the meta-guide map's concepts/categories → validated doc ids.
 * The `concept` strings are the map's "When to Load" phrasing — the concept an
 * agent actually searches by, not the doc title — so the dry-run measures
 * discovery the way it is used, not a title-echo.
 */
export const MAP_CONCEPT_ORACLE: OracleEntry[] = [
  // --- Process & Workflow ---
  { concept: 'spec planning standards', expectedDocIds: ['process-spec-planning'], source: 'map-concept' },
  { concept: 'task type classification validation tiers', expectedDocIds: ['process-task-type-definitions'], source: 'map-concept' },
  { concept: 'cross-reference standards', expectedDocIds: ['process-cross-reference-standards'], source: 'map-concept' },
  { concept: 'hook operations automation troubleshooting', expectedDocIds: ['process-hook-operations'], source: 'map-concept' },
  { concept: 'cross-spec integration dependency management', expectedDocIds: ['integration-methodology'], source: 'map-concept' },
  { concept: 'completion documentation two-document workflow', expectedDocIds: ['completion-documentation-guide'], source: 'map-concept' },
  { concept: 'release management pipeline', expectedDocIds: ['release-management-system'], source: 'map-concept' },
  { concept: 'product handoff protocol', expectedDocIds: ['product-handoff-protocol'], source: 'map-concept' },

  // --- Token System (Rosetta) ---
  { concept: 'token governance selection usage creation', expectedDocIds: ['token-governance'], source: 'map-concept' },
  { concept: 'token quick reference common patterns', expectedDocIds: ['token-quick-reference'], source: 'map-concept' },
  { concept: 'semantic token architecture mode keys', expectedDocIds: ['token-semantic-structure'], source: 'map-concept' },
  { concept: 'token resolution alias chains', expectedDocIds: ['token-resolution-patterns'], source: 'map-concept' },
  { concept: 'token pipeline architecture subsystem entry points', expectedDocIds: ['rosetta-system-architecture'], source: 'map-concept' },
  { concept: 'rosetta system principles', expectedDocIds: ['rosetta-system-principles'], source: 'map-concept' },
  { concept: 'color token work', expectedDocIds: ['token-family-color'], source: 'map-concept' },
  { concept: 'typography token work', expectedDocIds: ['token-family-typography'], source: 'map-concept' },
  { concept: 'spacing token work', expectedDocIds: ['token-family-spacing'], source: 'map-concept' },
  { concept: 'shadow token work', expectedDocIds: ['token-family-shadow'], source: 'map-concept' },
  { concept: 'motion easing token work', expectedDocIds: ['token-family-motion'], source: 'map-concept' },
  { concept: 'border token work', expectedDocIds: ['token-family-border'], source: 'map-concept' },
  { concept: 'radius token work', expectedDocIds: ['token-family-radius'], source: 'map-concept' },
  { concept: 'opacity token work', expectedDocIds: ['token-family-opacity'], source: 'map-concept' },
  { concept: 'blend token work', expectedDocIds: ['token-family-blend'], source: 'map-concept' },
  { concept: 'glow token work', expectedDocIds: ['token-family-glow'], source: 'map-concept' },
  { concept: 'layering z-index token work', expectedDocIds: ['token-family-layering'], source: 'map-concept' },
  { concept: 'responsive token work', expectedDocIds: ['token-family-responsive'], source: 'map-concept' },
  { concept: 'accessibility token work', expectedDocIds: ['token-family-accessibility'], source: 'map-concept' },

  // --- Component System (Stemma) ---
  { concept: 'building modifying components', expectedDocIds: ['component-development-guide'], source: 'map-concept' },
  { concept: 'component coding standards', expectedDocIds: ['component-development-standards'], source: 'map-concept' },
  { concept: 'component selection ui compositions', expectedDocIds: ['component-quick-reference'], source: 'map-concept' },
  { concept: 'base variant inheritance patterns', expectedDocIds: ['component-inheritance-structures'], source: 'map-concept' },
  { concept: 'component schema authoring validation', expectedDocIds: ['component-schema-format'], source: 'map-concept' },
  { concept: 'component scaffolding templates', expectedDocIds: ['component-family-templates'], source: 'map-concept' },
  { concept: 'component-meta.yaml governance', expectedDocIds: ['component-meta-data-shapes-governance'], source: 'map-concept' },
  { concept: 'primitive vs semantic component decisions', expectedDocIds: ['primitive-vs-semantic-usage-philosophy'], source: 'map-concept' },
  { concept: 'component readiness maturity tracking', expectedDocIds: ['component-readiness-status'], source: 'map-concept' },
  { concept: 'mcp document template for components', expectedDocIds: ['mcp-component-family-document-template'], source: 'map-concept' },
  { concept: 'behavioral contracts concept catalog', expectedDocIds: ['contract-system-reference'], source: 'map-concept' },
  { concept: 'contract validation patterns', expectedDocIds: ['test-behavioral-contract-validation'], source: 'map-concept' },
  { concept: 'stemma system principles', expectedDocIds: ['stemma-system-principles'], source: 'map-concept' },
  { concept: 'cross-platform implementation patterns', expectedDocIds: ['platform-implementation-guidelines'], source: 'map-concept' },
  { concept: 'platform-specific vs shared decisions', expectedDocIds: ['cross-platform-vs-platform-specific-decision-framework'], source: 'map-concept' },
  { concept: 'button family work', expectedDocIds: ['component-family-button'], source: 'map-concept' },
  { concept: 'form input family work', expectedDocIds: ['component-family-form-inputs'], source: 'map-concept' },
  { concept: 'navigation family work', expectedDocIds: ['component-family-navigation'], source: 'map-concept' },
  { concept: 'icon family work', expectedDocIds: ['component-family-icon'], source: 'map-concept' },
  { concept: 'container family work', expectedDocIds: ['component-family-container'], source: 'map-concept' },
  { concept: 'progress family work', expectedDocIds: ['progress-indicator-components'], source: 'map-concept' },
  { concept: 'chip family work', expectedDocIds: ['component-family-chip'], source: 'map-concept' },
  { concept: 'badge family work', expectedDocIds: ['component-family-badge'], source: 'map-concept' },
  { concept: 'avatar family work', expectedDocIds: ['component-family-avatar'], source: 'map-concept' },
  { concept: 'divider family work', expectedDocIds: ['component-family-divider'], source: 'map-concept' },
  { concept: 'loading family work', expectedDocIds: ['component-family-loading'], source: 'map-concept' },
  { concept: 'modal family work', expectedDocIds: ['component-family-modal'], source: 'map-concept' },
  { concept: 'data display family work', expectedDocIds: ['component-family-data-display'], source: 'map-concept' },

  // --- Layout System ---
  { concept: 'screen specification layout template responsive layout', expectedDocIds: ['layout-specification-vocabulary'], source: 'map-concept' },

  // --- Integration & Tooling ---
  { concept: 'dtcg format tool integrations', expectedDocIds: ['dtcg-integration-guide'], source: 'map-concept' },
  { concept: 'figma integration token push design extraction', expectedDocIds: ['figma-workflow-guide'], source: 'map-concept' },
  { concept: 'custom token transformers', expectedDocIds: ['transformer-development-guide'], source: 'map-concept' },
  { concept: 'programmatic dtcg token consumption', expectedDocIds: ['mcp-integration-guide'], source: 'map-concept' },
  { concept: 'browser loading web component distribution', expectedDocIds: ['browser-distribution-guide'], source: 'map-concept' },
  { concept: 'build system configuration', expectedDocIds: ['build-system-setup'], source: 'map-concept' },

  // --- Testing ---
  { concept: 'writing tests test patterns stemma validators', expectedDocIds: ['test-development-standards'], source: 'map-concept' },
  { concept: 'test failure audit clean exit performance investigation', expectedDocIds: ['test-failure-audit-methodology'], source: 'map-concept' },

  // --- Architecture & Vision ---
  { concept: 'designerpunk vision context', expectedDocIds: ['a-vision-of-the-future'], source: 'map-concept' },
  { concept: 'detailed collaboration protocols validation gates', expectedDocIds: ['ai-collaboration-framework'], source: 'map-concept' },
  { concept: 'known mcp gaps trigger conditions', expectedDocIds: ['mcp-evolution-roadmap'], source: 'map-concept' },
  { concept: 'technology choices platform decisions', expectedDocIds: ['technology-stack'], source: 'map-concept' },
  { concept: 'three-mcp boundaries information flow access model', expectedDocIds: ['mcp-relationship-model'], source: 'map-concept' },
];

/**
 * AXIS (b): each agent's domain discovery queries (Req 13 AC3).
 * These are natural-language queries an agent would issue to route to context it
 * does not own — the cross-domain discovery `aliases` are meant to backstop.
 * Many of these are EXPECTED to be WEAK/MISS at the floor (pre-aliases); that is
 * precisely the signal that feeds the Task 8.4 alias-seeding worklist.
 */
export const AGENT_DOMAIN_ORACLE: OracleEntry[] = [
  // --- Ada (token domain) ---
  { concept: 'how do i pick the right token', expectedDocIds: ['token-governance'], source: 'agent-query', agentDomain: 'ada' },
  { concept: 'dark mode theme overrides', expectedDocIds: ['token-semantic-structure'], source: 'agent-query', agentDomain: 'ada' },
  { concept: 'modular scale mathematical foundation', expectedDocIds: ['rosetta-system-architecture'], source: 'agent-query', agentDomain: 'ada' },
  { concept: 'color contrast accessibility ratio', expectedDocIds: ['token-family-accessibility', 'token-family-color'], source: 'agent-query', agentDomain: 'ada' },

  // --- Lina (component domain) ---
  { concept: 'focus management keyboard navigation', expectedDocIds: ['test-behavioral-contract-validation', 'component-development-guide'], source: 'agent-query', agentDomain: 'lina' },
  { concept: 'how do i scaffold a new component', expectedDocIds: ['component-development-guide', 'component-family-templates'], source: 'agent-query', agentDomain: 'lina' },
  { concept: 'web component shadow dom authoring', expectedDocIds: ['web-authoring-standards'], source: 'agent-query', agentDomain: 'lina' },
  { concept: 'true native architecture platform separation', expectedDocIds: ['platform-implementation-guidelines'], source: 'agent-query', agentDomain: 'lina' },

  // --- Thurgood (test / governance / spec domain) ---
  { concept: 'how to write a spec requirements ears', expectedDocIds: ['process-spec-planning'], source: 'agent-query', agentDomain: 'thurgood' },
  { concept: 'test coverage audit methodology', expectedDocIds: ['test-failure-audit-methodology'], source: 'agent-query', agentDomain: 'thurgood' },
  { concept: 'steering doc metadata validation governance', expectedDocIds: ['process-file-organization'], source: 'agent-query', agentDomain: 'thurgood' },
  { concept: 'module resolution contract runtime ts loading', expectedDocIds: ['rosetta-system-architecture'], source: 'agent-query', agentDomain: 'thurgood' },

  // --- Leonardo (layout / system domain) ---
  { concept: 'responsive layout screen specification', expectedDocIds: ['layout-specification-vocabulary'], source: 'agent-query', agentDomain: 'leonardo' },
  { concept: 'system architecture overview rosetta stemma civitas', expectedDocIds: ['mcp-relationship-model'], source: 'agent-query', agentDomain: 'leonardo' },
];

/** The full frozen oracle = axis (a) ∪ axis (b). Stable order: map concepts, then agent queries. */
export const DISCOVERY_ORACLE: OracleEntry[] = [...MAP_CONCEPT_ORACLE, ...AGENT_DOMAIN_ORACLE];
