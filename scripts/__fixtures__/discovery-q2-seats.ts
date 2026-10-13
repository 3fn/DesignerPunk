/**
 * Discovery Study Stage 1 — Q2: blind product-seat docs queries with keys (PRE-REGISTERED FIXTURE)
 *
 * Charter: .kiro/issues/2026-10-12-discovery-study-stage1-docs-charter.md § 1c–1d, § 2, § 3, § 5.
 * Raw source: .kiro/docs/discovery-study-stage1-seat-queries.raw.md (commit (1), 5f8b668b5) —
 *   every `query` / `seatTool` / `seatIntent` below is copied VERBATIM from that file; the
 *   runner (scripts/discovery-study-stage1.ts) refuses to run if any string is not found there.
 *
 * POINT-IN-TIME TEST FIXTURE — NOT a living navigational doc.
 * ----------------------------------------------------------------------------
 * - FROZEN at the Stage 1 pre-registration commit (commit (2)). Keys are never edited after it:
 *   an answer-key error found later is counted and excluded in the findings doc (charter § 2).
 * - Keyed by Thurgood 2026-10-12 against the served corpus at main @ 7aa433fca (83 docs).
 * - Keys were checked by READING the corpus (headings + body grep over governance/**). The
 *   lexical matcher (find_docs / findDocsConcept) was NOT run on any Q2 query before this
 *   fixture was frozen — running it first would be results-before-registration.
 * - Must NEVER be wired in as a navigational fallback or indexed into governance/.
 * - Leonardo's block is NOT in this fixture (see "Leonardo addendum" below).
 * - The calibration-only set (scripts/__fixtures__/discovery-calibration-only.ts) is NOT part
 *   of Q2 and is never scored (charter § 1a). The seats supplied the scored negatives.
 *
 * ============================================================================
 * KEYING RULES (pre-registered; every keyNote cites the rule it applies)
 * ============================================================================
 *  K1 Content over router. When the need is content, key the doc that holds it, not a
 *     routing table (token-quick-reference, component-quick-reference).
 *  K2 Canonical home over a pointer. When one doc only points at another for the full
 *     treatment, key the one pointed at. K2 does NOT apply when both docs answer substantively.
 *  K3 Evidence over the seat's label. The seat's named tool/target and its
 *     "probably undocumented" label are not keys; the corpus decides positive vs strict-none.
 *  K4 Served corpus only. If the only answer lives outside the 83 served docs (specs, hooks,
 *     ballots, identity docs), the query is strict-none for find_docs.
 *  K5 Drop, with the reason recorded, when no single defensible answer exists:
 *     (a) two docs answer substantively; (b) coverage is partial (some asked items answered,
 *     others not) or split across docs; (c) two docs answer and contradict each other.
 *  K6 A doc that states the asked capability's status ("not supported in this version",
 *     "no procedure exists until X") answers the query: keyed positive to that doc.
 *
 * ============================================================================
 * ROUTING (charter § 1c) and the CUE-EXPOSURE RULING (charter § 3)
 * ============================================================================
 * Routing: a query whose seat tool is a docs-MCP tool (find_docs, get_section,
 * get_document_summary) is find_docs-shaped and enters Q2 (positive, negative or dropped).
 * Application-MCP, Product-MCP and Bash lookups are HELD (Q2_HELD): kept as raw input for
 * the suspended components round, never scored here, never copied into a Q3 fixture as-is.
 *
 * Cue-exposure RULING (Thurgood, 2026-10-12, before any result exists): naming the target
 * doc does NOT make a query ineligible. Every Q2 query is scored as written. Two flags are
 * computed MECHANICALLY by the runner (never by hand) and every result is reported split by
 * them:
 *   - intentMode: 'search' iff the seat's tool string starts with the find_docs tool name;
 *     otherwise 'direct' (the seat would call get_section / get_document_summary directly).
 *   - cueExposed: true iff a routing cue from the seat's OWN charter (SEAT_CUES, frozen from
 *     .claude/agents/<seat>.md @ 8a0c0e46a for sparky/kenya/data and @ 08637770a for stacy)
 *     appears in the query text or the seat's tool string — the cue's doc id, or its section
 *     title when that title has ≥ 2 words; compared lowercased, with '-' and '_' read as spaces.
 * The volume gate and outcome rules (charter § 5) count misses in BOTH strata. This is the
 * choice that cuts against the rubric owner's interest (counting fewer misses would favour
 * the null). The split is reported beside every count.
 *
 * ============================================================================
 * LEONARDO ADDENDUM (timing RULING, Thurgood, 2026-10-12)
 * ============================================================================
 * Q2 freezes NOW with the four seats. Leonardo's block (written after his Settings ledger
 * closes) is pre-registered later as a dated addendum fixture (Q2-L) with its own
 * pre-registration SHA and its own results line. Why: A is deterministic and the corpus
 * moves, so keys held open for weeks would drift from the SHA they were checked against, and
 * the 119-B coverage gap would stay open for no measurement gain. The four-seat result sets
 * the Stage 1 outcome. If the addendum's own gate-counted misses, added to the four-seat
 * count, would change the outcome under charter § 5, the findings doc records "outcome
 * re-opened" (dated) and Peter rules. The addendum runs at its own SHA, and any hand-fix that
 * landed in between is listed beside it.
 * ============================================================================
 */

export type SeatId = 'sparky' | 'kenya' | 'data' | 'stacy';

export interface SeatCue {
  /** Doc id named by a `THEN consult <id>` routing cue in the seat's own charter. */
  docId: string;
  /** The cue's § section title, when the cue names one. */
  section: string | null;
}

interface Q2Base {
  /** Stable id: seat prefix + position in the seat's answer (N1/N2 = "probably undocumented"). */
  id: string;
  seat: SeatId;
  /** The query, verbatim. */
  query: string;
  /** The tool the seat said it would use, verbatim. */
  seatTool: string;
  /** The seat's one-line intent, verbatim. */
  seatIntent: string;
  /** Whether the seat put the query under "probably undocumented" (not a key — K3). */
  seatLabel: 'documented' | 'probably-undocumented';
  /** Why this key (or exclusion), citing the keying rule and the section that answers. */
  keyNote: string;
}

export interface Q2Positive extends Q2Base {
  /** The single served doc id that answers the query. */
  expectedDocId: string;
}

export interface Q2Negative extends Q2Base {
  /** Strict-none: no served doc answers the query (F5 ruling: strict grading). */
  expected: 'none';
}

/** A dropped (K5) or held (routing) query: recorded, never scored. */
export type Q2Excluded = Q2Base;


export const SEAT_CUES: Record<SeatId, SeatCue[]> = {
  sparky: [
    { docId: "completion-documentation-guide", section: "Two-Document Workflow" },
    { docId: "contract-system-reference", section: null },
    { docId: "platform-implementation-guidelines", section: null },
    { docId: "process-development-workflow", section: null },
    { docId: "process-file-organization", section: null },
    { docId: "product-token-governance", section: "Naming Conventions" },
    { docId: "stemma-system-principles", section: null },
    { docId: "test-behavioral-contract-validation", section: null },
    { docId: "test-development-standards", section: null },
    { docId: "token-quick-reference", section: null },
    { docId: "token-quick-reference", section: "Token Documentation Map" },
    { docId: "web-authoring-standards", section: "Product Token Authoring (Sparky)" },
    { docId: "web-authoring-standards", section: "Quality Patterns" },
  ],
  kenya: [
    { docId: "completion-documentation-guide", section: "Two-Document Workflow" },
    { docId: "contract-system-reference", section: null },
    { docId: "platform-implementation-guidelines", section: null },
    { docId: "platform-implementation-guidelines", section: "iOS Implementation Patterns" },
    { docId: "process-development-workflow", section: null },
    { docId: "process-file-organization", section: null },
    { docId: "product-token-governance", section: "Naming Conventions" },
    { docId: "stemma-system-principles", section: null },
    { docId: "test-behavioral-contract-validation", section: null },
    { docId: "test-development-standards", section: null },
    { docId: "token-quick-reference", section: null },
    { docId: "token-quick-reference", section: "Token Documentation Map" },
  ],
  data: [
    { docId: "completion-documentation-guide", section: "Two-Document Workflow" },
    { docId: "contract-system-reference", section: null },
    { docId: "platform-implementation-guidelines", section: "Android Implementation Patterns" },
    { docId: "process-development-workflow", section: null },
    { docId: "process-file-organization", section: null },
    { docId: "product-token-governance", section: "Naming Conventions" },
    { docId: "stemma-system-principles", section: null },
    { docId: "test-behavioral-contract-validation", section: null },
    { docId: "test-development-standards", section: null },
    { docId: "token-quick-reference", section: null },
    { docId: "token-quick-reference", section: "Token Documentation Map" },
  ],
  stacy: [
    { docId: "completion-documentation-guide", section: null },
    { docId: "completion-documentation-guide", section: "Two-Document Workflow" },
    { docId: "contract-system-reference", section: null },
    { docId: "process-development-workflow", section: null },
    { docId: "process-file-organization", section: null },
    { docId: "process-spec-planning", section: null },
    { docId: "process-spec-planning", section: "Requirements Document Format (Conditional Loading)" },
    { docId: "process-spec-planning", section: "Tasks Document Format" },
    { docId: "process-task-type-definitions", section: null },
    { docId: "process-task-type-definitions", section: "Overview" },
    { docId: "product-token-governance", section: null },
    { docId: "test-behavioral-contract-validation", section: null },
    { docId: "test-behavioral-contract-validation", section: "Validation Process" },
    { docId: "test-development-standards", section: null },
  ],
};

export const Q2_POSITIVES: Q2Positive[] = [
  {
    id: "SP-01",
    seat: "sparky",
    query: "web css quality patterns shadow dom host styling",
    seatTool: "mcp__designerpunk-docs__find_docs",
    seatIntent: "the Quality Patterns section of web-authoring-standards beyond the Hard Rules, for screen CSS structure",
    seatLabel: "documented",
    expectedDocId: "web-authoring-standards",
    keyNote: "§ \"Quality Patterns\" (CSS Organization, Comment Standards) + § \"Screen-Specific Guidance (Sparky)\" › \"Shadow DOM Context\".",
  },
  {
    id: "SP-04",
    seat: "sparky",
    query: "which token doc covers z-index layering and elevation",
    seatTool: "mcp__designerpunk-docs__get_section (token-quick-reference, \"Token Documentation Map\")",
    seatIntent: "which family doc to read when a spec references a layering value I can't place",
    seatLabel: "documented",
    expectedDocId: "token-family-layering",
    keyNote: "K1 content over router: the layering family doc holds z-index (web/iOS) and elevation (Android); token-quick-reference only routes to it.",
  },
  {
    id: "SP-05",
    seat: "sparky",
    query: "screen test structure categories naming jest web component",
    seatTool: "mcp__designerpunk-docs__find_docs then get_document_summary (test-development-standards)",
    seatIntent: "the required test file layout, category tags, and describe/it naming for a product screen test",
    seatLabel: "documented",
    expectedDocId: "test-development-standards",
    keyNote: "Test categories, patterns and naming; the integration guide § \"Running Component Tests\" is consumer setup for component tests, not screen-test structure.",
  },
  {
    id: "SP-06",
    seat: "sparky",
    query: "behavioral contract validation web implementation how to test interaction_focusable",
    seatTool: "mcp__designerpunk-docs__get_document_summary (test-behavioral-contract-validation)",
    seatIntent: "how to prove a contract like interaction_focusable or state_disabled is honored in a Shadow DOM screen",
    seatLabel: "documented",
    expectedDocId: "test-behavioral-contract-validation",
    keyNote: "Framework for validating behavioral contracts across web/iOS/Android.",
  },
  {
    id: "SP-07",
    seat: "sparky",
    query: "implementation report format product handoff protocol tier 2",
    seatTool: "mcp__designerpunk-docs__find_docs",
    seatIntent: "the Implementation Report template I owe Leonardo at screen completion (deviations, discoveries, decisions made)",
    seatLabel: "documented",
    expectedDocId: "product-handoff-protocol",
    keyNote: "§ \"Tier 2: Implementation Reports\" with the Implementation Report template.",
  },
  {
    id: "SP-08",
    seat: "sparky",
    query: "subtask completion doc floor three light elements",
    seatTool: "mcp__designerpunk-docs__get_section (completion-documentation-guide, \"The subtask completion doc\")",
    seatIntent: "what the minimal task-N-M-completion.md must contain before I tick the subtask",
    seatLabel: "documented",
    expectedDocId: "completion-documentation-guide",
    keyNote: "§ \"The subtask completion doc — mandatory, and deliberately light (S-4 …)\".",
  },
  {
    id: "KE-01",
    seat: "kenya",
    query: "swiftui token consumption pattern environment theme",
    seatTool: "mcp__designerpunk-docs__find_docs",
    seatIntent: "how to read theme-varying colors via @Environment vs static DesignTokens in a product screen",
    seatLabel: "documented",
    expectedDocId: "component-development-guide",
    keyNote: "§ \"Token Consumption by Platform (Spec 094)\": static via DesignTokens, theme-varying via @Environment. platform-implementation-guidelines § \"iOS Implementation Patterns\" shows static access only, so it does not answer the theme part.",
  },
  {
    id: "KE-02",
    seat: "kenya",
    query: "iOS implementation patterns accessibility voiceover",
    seatTool: "mcp__designerpunk-docs__get_section",
    seatIntent: "the iOS render-target section in platform-implementation-guidelines for SwiftUI accessibility modifier conventions",
    seatLabel: "documented",
    expectedDocId: "platform-implementation-guidelines",
    keyNote: "§ \"iOS Implementation Patterns\" (accessibility modifiers) + § \"Category 4: Platform-Specific Accessibility (ALLOWED)\" (VoiceOver).",
  },
  {
    id: "KE-03",
    seat: "kenya",
    query: "which token for touch target size",
    seatTool: "mcp__designerpunk-docs__get_section",
    seatIntent: "token-quick-reference Token Documentation Map to find the tap-area semantic token and its family doc",
    seatLabel: "documented",
    expectedDocId: "token-family-accessibility",
    keyNote: "K1: the accessibility family doc holds tap-area tokens; token-quick-reference only routes.",
  },
  {
    id: "KE-04",
    seat: "kenya",
    query: "product token naming category token-name",
    seatTool: "mcp__designerpunk-docs__get_section",
    seatIntent: "product-token-governance Naming Conventions before authoring a new product token in product/tokens/*.yaml",
    seatLabel: "documented",
    expectedDocId: "product-token-governance",
    keyNote: "§ \"Naming Conventions\". web-authoring-standards also has a naming schema but is scoped to web platform work, so for an iOS seat PTG is the single answer.",
  },
  {
    id: "KE-05",
    seat: "kenya",
    query: "test file structure naming categories screen tests",
    seatTool: "mcp__designerpunk-docs__find_docs",
    seatIntent: "test-development-standards structure/naming rules so my Swift screen tests follow the convention",
    seatLabel: "documented",
    expectedDocId: "test-development-standards",
    keyNote: "As SP-05.",
  },
  {
    id: "KE-06",
    seat: "kenya",
    query: "behavioral contract validation ios implementation",
    seatTool: "mcp__designerpunk-docs__find_docs",
    seatIntent: "test-behavioral-contract-validation guidance on proving a contract like interaction_focusable is honored on iOS",
    seatLabel: "documented",
    expectedDocId: "test-behavioral-contract-validation",
    keyNote: "As SP-06.",
  },
  {
    id: "KE-07",
    seat: "kenya",
    query: "implementation report format tier 2 handoff leonardo",
    seatTool: "mcp__designerpunk-docs__find_docs",
    seatIntent: "the Product Handoff Protocol template for the report I send Leonardo at screen completion",
    seatLabel: "documented",
    expectedDocId: "product-handoff-protocol",
    keyNote: "As SP-07.",
  },
  {
    id: "KE-08",
    seat: "kenya",
    query: "subtask completion doc floor what must it contain",
    seatTool: "mcp__designerpunk-docs__get_section",
    seatIntent: "completion-documentation-guide subtask completion doc section so my task-N-M-completion.md passes the claims pass",
    seatLabel: "documented",
    expectedDocId: "completion-documentation-guide",
    keyNote: "As SP-08.",
  },
  {
    id: "KE-10",
    seat: "kenya",
    query: "consumer generate ios theming output npx designerpunk",
    seatTool: "mcp__designerpunk-docs__find_docs",
    seatIntent: "how the consumer-side generate materializes the {Name}Theme protocol and ProductTokens.ios.swift",
    seatLabel: "documented",
    expectedDocId: "designerpunk-integration-guide",
    keyNote: "§ \"6. Generate Tokens\" (output list; \"no theme surface yet\") + § \"iOS and Android (not supported for onboarding in 15.0.0)\".",
  },
  {
    id: "KE-11",
    seat: "kenya",
    query: "contract concept names focusable error state",
    seatTool: "mcp__designerpunk-docs__get_document_summary",
    seatIntent: "contract-system-reference outline so I cite the canonical contract names in tests",
    seatLabel: "documented",
    expectedDocId: "contract-system-reference",
    keyNote: "Taxonomy and concept catalog: the canonical contract names.",
  },
  {
    id: "KE-N1",
    seat: "kenya",
    query: "xcodebuild simulator ui test runbook product app",
    seatTool: "mcp__designerpunk-docs__find_docs",
    seatIntent: "a how-to for running iOS build/UI tests from the consumer app's ios/ dir with DesignerPunk tokens wired in",
    seatLabel: "probably-undocumented",
    expectedDocId: "designerpunk-integration-guide",
    keyNote: "K6: the doc states the asked capability's status. § \"iOS and Android (not supported for onboarding in 15.0.0)\": copying the native files into an Xcode project \"does not yield a compiling target\". That answers \"how do I build/test the iOS app with tokens wired in\": not supported in this version. Seat-labelled undocumented; keyed by evidence (K3).",
  },
  {
    id: "DA-02",
    seat: "data",
    query: "theme-varying color token read inside composable LocalDPTheme.current",
    seatTool: "mcp__designerpunk-docs__find_docs",
    seatIntent: "how to consume Spec 094 theme-varying colors in a composable and pick the theme instance for dark mode",
    seatLabel: "documented",
    expectedDocId: "component-development-guide",
    keyNote: "§ \"Token Consumption by Platform (Spec 094)\": theme-varying via CompositionLocal (`Local{Abbreviation}Theme.current`).",
  },
  {
    id: "DA-03",
    seat: "data",
    query: "product token ref vs value when to author new product token",
    seatTool: "mcp__designerpunk-docs__get_section",
    seatIntent: "the system-first selection rule and perceptual tolerance table before I author a product/tokens yaml entry",
    seatLabel: "documented",
    expectedDocId: "product-token-governance",
    keyNote: "§ \"System-First Value Selection\" (Perceptual Tolerance Guidelines) + § \"Value Governance\" (ref vs value). WAS is web-scoped (as KE-04).",
  },
  {
    id: "DA-04",
    seat: "data",
    query: "product token naming convention category token-name",
    seatTool: "mcp__designerpunk-docs__get_section",
    seatIntent: "the --product-{category}-{token-name} naming rule for a token I discover mid-implementation",
    seatLabel: "documented",
    expectedDocId: "product-token-governance",
    keyNote: "As KE-04.",
  },
  {
    id: "DA-05",
    seat: "data",
    query: "screen test structure naming categories android",
    seatTool: "mcp__designerpunk-docs__find_docs",
    seatIntent: "test-development-standards for how a product screen Test.kt should be organized and named",
    seatLabel: "documented",
    expectedDocId: "test-development-standards",
    keyNote: "As SP-05.",
  },
  {
    id: "DA-06",
    seat: "data",
    query: "how to verify a behavioral contract in an android implementation",
    seatTool: "mcp__designerpunk-docs__find_docs",
    seatIntent: "the contract-validation guidance so my tests prove the contract, not just the pixels",
    seatLabel: "documented",
    expectedDocId: "test-behavioral-contract-validation",
    keyNote: "As SP-06.",
  },
  {
    id: "DA-07",
    seat: "data",
    query: "implementation report format to leonardo tier 2",
    seatTool: "mcp__designerpunk-docs__find_docs",
    seatIntent: "the Product Handoff Protocol template for deviations, discoveries, decisions-made sections",
    seatLabel: "documented",
    expectedDocId: "product-handoff-protocol",
    keyNote: "As SP-07.",
  },
  {
    id: "DA-08",
    seat: "data",
    query: "which token family doc covers focus ring width and offset",
    seatTool: "mcp__designerpunk-docs__get_section",
    seatIntent: "token-quick-reference Token Documentation Map to route an accessibility focus token question",
    seatLabel: "documented",
    expectedDocId: "token-family-accessibility",
    keyNote: "K1: focus-indicator tokens live in the accessibility family doc.",
  },
  {
    id: "DA-09",
    seat: "data",
    query: "subtask completion doc three elements what changed tests adaptations",
    seatTool: "mcp__designerpunk-docs__get_section",
    seatIntent: "completion-documentation-guide floor for a subtask doc before I tick the box",
    seatLabel: "documented",
    expectedDocId: "completion-documentation-guide",
    keyNote: "As SP-08.",
  },
  {
    id: "DA-11",
    seat: "data",
    query: "talkback semantics contentDescription role heading pattern designerpunk",
    seatTool: "mcp__designerpunk-docs__find_docs",
    seatIntent: "the Android accessibility section of platform-implementation-guidelines beyond the focus example",
    seatLabel: "documented",
    expectedDocId: "platform-implementation-guidelines",
    keyNote: "§ \"Android Implementation Patterns\" (Compose semantics, contentDescription) + § \"Category 4: Platform-Specific Accessibility (ALLOWED)\" (TalkBack).",
  },
  {
    id: "DA-N1",
    seat: "data",
    query: "gradle dependency coordinates for designerpunk android tokens and components in a consumer app",
    seatTool: "mcp__designerpunk-docs__find_docs",
    seatIntent: "how a product repo actually pulls the generated Kotlin into its build (artifact, module, or copied source)",
    seatLabel: "probably-undocumented",
    expectedDocId: "designerpunk-integration-guide",
    keyNote: "K6: § \"iOS and Android (not supported for onboarding in 15.0.0)\" states that the package ships native sources but they do not form a compiling target, and copying them into an Android module does not compile. That is the answer to \"how a product repo pulls the generated Kotlin into its build\". Seat-labelled undocumented; keyed by evidence (K3).",
  },
  {
    id: "ST-01",
    seat: "stacy",
    query: "what must a parent completion doc contain success criteria table status evidence",
    seatTool: "mcp__designerpunk-docs__get_section (completion-documentation-guide, \"Parent Success-Criteria Fidelity\")",
    seatIntent: "the standard I audit parent docs against — verbatim row reproduction, Status + Evidence, forced-negative line",
    seatLabel: "documented",
    expectedDocId: "completion-documentation-guide",
    keyNote: "§ \"Parent Success-Criteria Fidelity\".",
  },
  {
    id: "ST-02",
    seat: "stacy",
    query: "delegated-tier line fixed forms plan held divergence grammar",
    seatTool: "mcp__designerpunk-docs__get_section (completion-documentation-guide, \"The delegated-tier line — unconditional\")",
    seatIntent: "the exact two allowed forms so I can split missing vs free-prose findings correctly",
    seatLabel: "documented",
    expectedDocId: "completion-documentation-guide",
    keyNote: "§ \"The delegated-tier line — unconditional\".",
  },
  {
    id: "ST-03",
    seat: "stacy",
    query: "instruments block header line format exists built here MISSING found later",
    seatTool: "mcp__designerpunk-docs__get_section (completion-documentation-guide, \"The instruments line and block\")",
    seatIntent: "the grammar for the Instruments header and block rows so my instruments read counts unlisted vs misfit against the right shape",
    seatLabel: "documented",
    expectedDocId: "completion-documentation-guide",
    keyNote: "§ \"The instruments line and block — parents …\".",
  },
  {
    id: "ST-04",
    seat: "stacy",
    query: "subtask completion doc minimum three elements adaptations none",
    seatTool: "mcp__designerpunk-docs__get_section (completion-documentation-guide, \"The subtask completion doc\")",
    seatIntent: "the S-4 floor for a subtask doc so a ticked subtask with a thin doc is judged against the real floor, not my memory of it",
    seatLabel: "documented",
    expectedDocId: "completion-documentation-guide",
    keyNote: "As SP-08.",
  },
  {
    id: "ST-05",
    seat: "stacy",
    query: "tasks.md declared merge units heading format",
    seatTool: "mcp__designerpunk-docs__find_docs concept:\"declared merge units tasks format\" then get_section (process-spec-planning, \"Tasks Document Format\")",
    seatIntent: "how units are declared so the owed-set classifier (a/b/c) and the CLOSEOUT/MIDPOINT anchors key on the right heading",
    seatLabel: "documented",
    expectedDocId: "process-spec-planning",
    keyNote: "§ \"The Declared Merge Units block — the canonical form\" (under Tasks Document Format). That § is an H4 heading, and the docs index does not index H4 (open issue .kiro/issues/2026-10-12-docs-mcp-does-not-index-h4.md); recorded now so a miss here is bucketed against that known defect, not re-diagnosed.",
  },
  {
    id: "ST-08",
    seat: "stacy",
    query: "behavioral contract validation cross-platform identical behavior process",
    seatTool: "mcp__designerpunk-docs__get_section (test-behavioral-contract-validation, \"Validation Process\")",
    seatIntent: "the procedure for judging whether iOS/Android/Web tests verify the same contract during a parity review",
    seatLabel: "documented",
    expectedDocId: "test-behavioral-contract-validation",
    keyNote: "§ \"Validation Process\" (cross-platform).",
  },
  {
    id: "ST-09",
    seat: "stacy",
    query: "CI provenance where a green was measured unit branch vs merge ref",
    seatTool: "mcp__designerpunk-docs__get_section (completion-documentation-guide, \"CI provenance — where a green was measured\")",
    seatIntent: "the rule a completion doc must follow when declaring where its test runs happened, so I can spot a branch-head green claimed as a gate green",
    seatLabel: "documented",
    expectedDocId: "completion-documentation-guide",
    keyNote: "§ \"CI provenance — where a green was measured (ballot B-CI)\".",
  },
  {
    id: "ST-11",
    seat: "stacy",
    query: "lessons synthesis review template timing triggers",
    seatTool: "mcp__designerpunk-docs__get_section (product-handoff-protocol, \"Lessons Synthesis Review\")",
    seatIntent: "the output template and when the synthesis review is owed after a feature completes",
    seatLabel: "documented",
    expectedDocId: "product-handoff-protocol",
    keyNote: "§ \"Lessons Synthesis Review\" (Timing, Output).",
  },
  {
    id: "ST-N2",
    seat: "stacy",
    query: "how to verify an iOS or Android build claim when no toolchain exists in this environment",
    seatTool: "mcp__designerpunk-docs__find_docs concept:\"platform build verification without toolchain\"",
    seatIntent: "a procedure beyond writing \"not re-verified — toolchain unavailable\"; the harness is only a chartered issue, not a how-to",
    seatLabel: "probably-undocumented",
    expectedDocId: "completion-documentation-guide",
    keyNote: "K6: § \"The instrument's honest reach\" states that nothing in this repository compiles generated Swift or Kotlin, that native \"command + result\" evidence is trust-the-reported-result, and that the honest form is `not re-verified — toolchain unavailable` until the chartered harness closes. That is the answer: no such procedure exists yet. Seat-labelled undocumented; keyed by evidence (K3).",
  },
];

export const Q2_NEGATIVES: Q2Negative[] = [
  {
    id: "SP-09",
    seat: "sparky",
    query: "where do product screen files live file organization product consumer",
    seatTool: "mcp__designerpunk-docs__get_document_summary (process-file-organization)",
    seatIntent: "the directory and naming rules for a screen implementation and its tests in a scratch consumer born via init",
    seatLabel: "documented",
    expected: 'none',
    keyNote: "No served doc says where product-screen implementation source and tests live in a consumer repo (body grep \"screen implementation|screens/|screen source|screen tests\" over governance/: no guidance). process-file-organization covers this repo's metadata-driven file placement; the integration guide § \"Product Data Directory\" covers product/ spec data, not screen source. Seat expected a doc; the corpus has none (K3).",
  },
  {
    id: "SP-N1",
    seat: "sparky",
    query: "web component screen navigation routing pattern between product screens",
    seatTool: "mcp__designerpunk-docs__find_docs",
    seatIntent: "a sanctioned router/history/URL pattern for Shadow DOM product screens — I suspect only component-level guidance exists, nothing screen-to-screen",
    seatLabel: "probably-undocumented",
    expected: 'none',
    keyNote: "Body grep \"router|routing between|screen-to-screen|between screens\": one hit, MCP-Evolution-Roadmap (\"Human acts as router between agents\") — unrelated. No screen-to-screen navigation pattern is documented.",
  },
  {
    id: "KE-09",
    seat: "kenya",
    query: "where do product screen files live ios",
    seatTool: "mcp__designerpunk-docs__find_docs",
    seatIntent: "process-file-organization rules for where SwiftUI screen source and tests go in a consumer repo",
    seatLabel: "documented",
    expected: 'none',
    keyNote: "No served doc says where product-screen implementation source and tests live in a consumer repo (body grep \"screen implementation|screens/|screen source|screen tests\" over governance/: no guidance). process-file-organization covers this repo's metadata-driven file placement; the integration guide § \"Product Data Directory\" covers product/ spec data, not screen source. Seat expected a doc; the corpus has none (K3).",
  },
  {
    id: "KE-N2",
    seat: "kenya",
    query: "swiftui navigationstack pattern designerpunk navigation component spec",
    seatTool: "mcp__designerpunk-docs__find_docs",
    seatIntent: "guidance on mapping Leonardo's navigation specs onto NavigationStack/TabView idioms without breaking cross-platform parity",
    seatLabel: "probably-undocumented",
    expected: 'none',
    keyNote: "Body grep \"NavigationStack|TabView\": one hit, an example sentence in product-handoff-protocol § \"Communication Reality\" (\"SwiftUI's NavigationStack doesn't support X…\"). component-family-navigation has no NavigationStack/TabView mapping. No mapping guidance exists.",
  },
  {
    id: "DA-10",
    seat: "data",
    query: "where do product screen android files live file organization",
    seatTool: "mcp__designerpunk-docs__find_docs",
    seatIntent: "process-file-organization rule for where Compose screens and their tests go in a consumer repo",
    seatLabel: "documented",
    expected: 'none',
    keyNote: "No served doc says where product-screen implementation source and tests live in a consumer repo (body grep \"screen implementation|screens/|screen source|screen tests\" over governance/: no guidance). process-file-organization covers this repo's metadata-driven file placement; the integration guide § \"Product Data Directory\" covers product/ spec data, not screen source. Seat expected a doc; the corpus has none (K3).",
  },
  {
    id: "DA-N2",
    seat: "data",
    query: "compose preview and screenshot test conventions for product screens",
    seatTool: "mcp__designerpunk-docs__find_docs",
    seatIntent: "whether @Preview composables or screenshot tests are expected, required, or forbidden for screen work",
    seatLabel: "probably-undocumented",
    expected: 'none',
    keyNote: "Body grep \"@Preview|screenshot test|snapshot test\": 0 hits. No preview or screenshot-test convention is documented.",
  },
  {
    id: "ST-10",
    seat: "stacy",
    query: "112 taxonomy finding classes for claims discrepancies",
    seatTool: "mcp__designerpunk-docs__find_docs concept:\"claims taxonomy promised claimed shipped\" then Grep .kiro/specs/112*/",
    seatIntent: "the classification names I must use in a claims-pass Findings section",
    seatLabel: "documented",
    expected: 'none',
    keyNote: "The claims taxonomy lives in .kiro/specs/112*, which is not served (K4). Body grep \"taxonomy\" over governance/: only Contract-System-Reference (\"10-category taxonomy\" of behavioral contracts) and a pointer to it in component-development-guide — the wrong taxonomy (a near-miss). Seat-labelled documented; strict-none for find_docs by evidence (K3).",
  },
  {
    id: "ST-N1",
    seat: "stacy",
    query: "how big a sample fraction is enough for a claims pass on a 20-parent spec",
    seatTool: "mcp__designerpunk-docs__find_docs concept:\"claims pass sample fraction guidance\"",
    seatIntent: "any rule of thumb for sampling effort — I believe the law says \"no floor, effort by signal\" and nothing more",
    seatLabel: "probably-undocumented",
    expected: 'none',
    keyNote: "Body grep \"sample fraction|sampling\": 0 hits. \"claims pass\" appears only in classification-map rows describing checks; claims-pass sampling law lives in ballots and Stacy's charter, which are not served. No sampling guidance is served.",
  },
];

export const Q2_DROPPED: Q2Excluded[] = [
  {
    id: "SP-02",
    seat: "sparky",
    query: "how do I author a new product token I discovered during screen implementation",
    seatTool: "mcp__designerpunk-docs__get_section (web-authoring-standards, \"Product Token Authoring (Sparky)\")",
    seatIntent: "the YAML authoring steps and the ref-vs-value decision when Leonardo's spec didn't anticipate a value",
    seatLabel: "documented",
    keyNote: "K5: two docs answer substantively. web-authoring-standards § \"Product Token Authoring (Sparky)\" gives the full web authoring steps (Discovery Workflow, Authoring Rules incl. ref-over-value) and product-token-governance § \"Authoring Workflow\" / \"Value Governance\" gives the governance; the WAS section is not a pointer (K2 does not apply). Content-consistency note: product-token authoring guidance is duplicated across two docs.",
  },
  {
    id: "SP-03",
    seat: "sparky",
    query: "product token naming convention --product-{category}-{token-name}",
    seatTool: "mcp__designerpunk-docs__get_section (product-token-governance, \"Naming Conventions\")",
    seatIntent: "the exact category/name grammar before I add a token to product/tokens/*.yaml",
    seatLabel: "documented",
    keyNote: "K5: two docs answer substantively for a web seat. product-token-governance § \"Naming Conventions\" (category grammar, camelCase) and web-authoring-standards § \"Naming Schema\" + § \"Canonical Categories\" (context/property patterns, category table). Same duplication note as SP-02.",
  },
  {
    id: "SP-N2",
    seat: "sparky",
    query: "product screen build test serve commands scratch consumer init",
    seatTool: "mcp__designerpunk-docs__find_docs",
    seatIntent: "the per-product build/test/serve commands for a consumer born via `designerpunk init` — my Commands section says these are authored per product and can't be extracted here",
    seatLabel: "probably-undocumented",
    keyNote: "Partial coverage (K5b): designerpunk-integration-guide covers generate, validate and component-test setup for a consumer, but not per-product build/serve commands. Neither strict-none nor a positive key is defensible.",
  },
  {
    id: "DA-01",
    seat: "data",
    query: "android compose token consumption pattern no .dp suffix",
    seatTool: "mcp__designerpunk-docs__find_docs",
    seatIntent: "the rule for passing DesignTokens floats into Compose modifiers without triggering the token-compliance regex",
    seatLabel: "documented",
    keyNote: "K5c: two docs answer and CONTRADICT. rosetta-system-architecture § \"Token Consumption Rule\": tokens are pre-unitized (Android `Dp`), never append `.dp`. platform-implementation-guidelines § \"Android Token Usage: The `.dp` Pattern\": DesignTokens values are `Float`; `.dp` is required for an explicitly typed `Dp`. Routed as a content-consistency finding (Ada / Lina), not keyed.",
  },
  {
    id: "ST-07",
    seat: "stacy",
    query: "completion-criteria-parity emission lines declared-none waiver exemption deferral docs not found",
    seatTool: "mcp__designerpunk-docs__find_docs concept:\"completion-criteria-parity emissions\"",
    seatIntent: "what each emission line means so my emission-reading duty interprets waivers/exemptions correctly instead of guessing",
    seatLabel: "documented",
    keyNote: "Partial coverage split across two docs (K5b): completion-documentation-guide defines the deferral and in-flight-exemption forms; classification-map § \"completion-criteria-parity\" describes the check. Neither defines the checker's emission lines (body grep \"emission|emits\" in completion-documentation-guide: 0 hits).",
  },
];

export const Q2_HELD: Q2Excluded[] = [
  {
    id: "SP-10",
    seat: "sparky",
    query: "Container-Card-Base web props slots tokens contracts",
    seatTool: "mcp__designerpunk-application__get_component_full",
    seatIntent: "the assembled API and token hooks before I compose a spec'd component into a screen",
    seatLabel: "documented",
    keyNote: "Application MCP lookup (get_component_full) — components-shaped.",
  },
  {
    id: "SP-11",
    seat: "sparky",
    query: "Settings screen spec",
    seatTool: "mcp__designerpunk-product__get_screen_spec",
    seatIntent: "Leonardo's component tree, state model, and web notes for the screen I'm implementing",
    seatLabel: "documented",
    keyNote: "Product MCP lookup (get_screen_spec) — not a docs query.",
  },
  {
    id: "SP-12",
    seat: "sparky",
    query: "tap area recommended resolved value web name",
    seatTool: "mcp__designerpunk-application__get_token_details",
    seatIntent: "the live CSS custom property name and value instead of reading dist CSS",
    seatLabel: "documented",
    keyNote: "Application MCP token lookup (get_token_details) — token-shaped.",
  },
  {
    id: "DA-12",
    seat: "data",
    query: "component readiness before implementing against it android",
    seatTool: "mcp__designerpunk-application__get_component_health",
    seatIntent: "whether the component Leonardo specced has an Android implementation I can safely consume",
    seatLabel: "documented",
    keyNote: "Application MCP lookup (get_component_health) — components-shaped.",
  },
  {
    id: "ST-06",
    seat: "stacy",
    query: "release flow step 5a owed set query claims pass before tag",
    seatTool: "Bash grep over .kiro/hooks/RELEASE-FLOW.md (step 5a / step 6)",
    seatIntent: "the release checklist text the RELEASE pass is paired with — what the checklist must paste and the phase-2 record fields",
    seatLabel: "documented",
    keyNote: "Bash grep over .kiro/hooks/RELEASE-FLOW.md — a non-served file, not a docs-MCP query.",
  },
  {
    id: "ST-12",
    seat: "stacy",
    query: "how to read a PR body for the Consulted line without credentials",
    seatTool: "Bash gh pr view <n> --json body (credentials via .env GITHUB_TOKEN export)",
    seatIntent: "the mechanics for the orchestrator-consult-line count in the counting block",
    seatLabel: "documented",
    keyNote: "Bash `gh pr view` — not a docs-MCP query.",
  },
];
