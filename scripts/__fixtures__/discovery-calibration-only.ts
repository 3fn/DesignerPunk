/**
 * Discovery Study Stage 1 — CALIBRATION-ONLY SET (docs near-miss negatives + components calibration queries)
 *
 * Charter: .kiro/issues/2026-10-12-discovery-study-stage1-docs-charter.md § 1a (Thurgood, grant path).
 * Design record: .kiro/issues/2026-10-07-discovery-shadow-study-charter.md § 3.
 *
 * POINT-IN-TIME TEST FIXTURE — NOT a living navigational doc.
 * ----------------------------------------------------------------------------
 * - FROZEN at the Stage 1 pre-registration commit. Never edited after that commit;
 *   a later defect in an entry is recorded in the findings doc, never fixed here.
 * - NEVER SCORED. No entry counts toward any Stage 1 result, gate or outcome rule.
 * - ONLY USE: setting abstention floors and prompt texts for the semantic arms IF
 *   Stage 2 runs. Prompt iterations against this set are capped at 5, and each
 *   iteration is logged in .kiro/docs/discovery-study-stage1-findings.md.
 * - Authored BEFORE any seat wrote a Stage 1 query, so no entry is drawn from the
 *   seat queries (Q2) and Q2 is not drawn from it.
 * - Must NEVER be wired in as a navigational fallback or indexed into governance/
 *   (the 119-A frozen-oracle rule applies here too).
 *
 * Authored 2026-10-12 against main @ 7aa433fca (post-#311; includes Stage 0, #303).
 *
 * ============================================================================
 * DOCS NEAR-MISS NEGATIVES — how "no doc answers" was checked (recorded per entry)
 * ============================================================================
 * Near-miss = the query uses vocabulary the served corpus contains (so the lexical
 * matcher returns candidates), but no served doc answers it. Each entry was checked
 * two ways against the live governance/ corpus (83 served docs):
 *   1. BODY grep (case-insensitive) over governance/** for the topic's distinctive
 *      term(s). Body text is broader than the matcher's index (which skips bodies),
 *      so a zero or incidental body hit is a stricter test than the index. The
 *      grep term and what it found are recorded in `bodyCheck`.
 *   2. LIVE matcher: findDocsConcept (the function find_docs calls) over a fresh
 *      DocumentIndexer on governance/. The top-3 ids and tiers are recorded in
 *      `nearMissTopAtFreeze`; each of those docs was then read for the topic term
 *      and does not answer the query. All eight returned `partial` only (no
 *      `strong`) at freeze. Recorded as evidence of the key, not as a score.
 * Topics rejected during authoring because a doc DOES (partly) answer them:
 * haptics (Button / Navigation families), RTL / i18n (aliased to Web-Authoring-
 * Standards), per-release versioning (Component-Development-Standards "Minor
 * Version Bump"), chart colours (Product-Token-Governance `chartAccentBlue`
 * example), performance budgets (Badge / Chip families).
 * ============================================================================
 *
 * ============================================================================
 * COMPONENTS CALIBRATION QUERIES — copied VERBATIM
 * ============================================================================
 * Source: application-mcp-server/src/__tests__/tool-boundary.contract.test.ts
 *   last commit touching it: dcd337dcfc65b7653c9d324f115188dcf66637c8 (Stage 0, #303)
 *   blob at authoring:       e5a99bf07c49f4f7d19e5cbbb8e1bcd60f286ed4
 * The eight `find_components` keyword strings that file sends (the gibberish
 * empty-contract probe `zzzzzabsolutelynosuchterm99999` is excluded: it is a
 * contract-shape test, not a calibration query). `testAssertion` copies what that
 * file asserts about the query, where it asserts one; no key is added here.
 * ============================================================================
 */

export interface DocsCalibrationNegative {
  /** The query, as a product seat might type it. */
  query: string;
  /** Strict-none: no served doc answers this query. */
  expected: 'none';
  /** Body grep term(s) over governance/** and what they found at freeze. */
  bodyCheck: string;
  /** findDocsConcept top-3 at freeze (id + tier), each read and found not to answer. */
  nearMissTopAtFreeze: string[];
}

export interface ComponentsCalibrationQuery {
  /** The keyword string, verbatim from the source test file. */
  query: string;
  /** Line(s) in tool-boundary.contract.test.ts where the keyword is sent. */
  sourceLines: number[];
  /** What the source test asserts about this query, if anything (copied, not added). */
  testAssertion: string | null;
}

export const DOCS_CALIBRATION_NEGATIVES: DocsCalibrationNegative[] = [
  {
    query: 'feature flag rollout for a new component variant',
    expected: 'none',
    bodyCheck: '"feature flag" → 0 files',
    nearMissTopAtFreeze: ['component-development-guide (partial)', 'component-development-standards (partial)', 'component-meta-data-shapes-governance (partial)'],
  },
  {
    query: 'error boundary when a component crashes at runtime',
    expected: 'none',
    bodyCheck: '"error boundar" → 0 files',
    nearMissTopAtFreeze: ['rosetta-system-architecture (partial)', 'component-development-guide (partial)', 'component-development-standards (partial)'],
  },
  {
    query: 'email template tokens for transactional emails',
    expected: 'none',
    bodyCheck: '"email template" → 0 files (email appears only as the Input-Text-Email form field)',
    nearMissTopAtFreeze: ['mcp-component-family-document-template (partial)', 'component-development-guide (partial)', 'primitive-vs-semantic-usage-philosophy (partial)'],
  },
  {
    query: 'app-wide keyboard shortcut registry',
    expected: 'none',
    bodyCheck: '"keyboard shortcut|hotkey" → 1 hit, a checklist bullet in Test-Behavioral-Contract-Validation ("Keyboard shortcut verification"); no guidance',
    nearMissTopAtFreeze: ['component-development-guide (partial)', 'test-behavioral-contract-validation (partial)', 'transformer-development-guide (partial)'],
  },
  {
    query: 'user research interview protocol for validating screens',
    expected: 'none',
    bodyCheck: '"user research|interview" → 1 file, Process-Task-Type-Definitions, naming interviews only as an example of an upstream task type',
    nearMissTopAtFreeze: ['product-handoff-protocol (partial)', 'component-family-avatar (partial)', 'component-family-modal (partial)'],
  },
  {
    query: 'usage analytics event naming for button taps',
    expected: 'none',
    bodyCheck: '"analytics|telemetry" → 2 files: a-vision-of-the-future (usage analytics as a future aspiration) and MCP-Evolution-Roadmap (a telemetry precondition); no event-naming guidance',
    nearMissTopAtFreeze: ['component-family-button (partial)', 'component-development-guide (partial)', 'token-family-border (partial)'],
  },
  {
    query: 'offline mode caching strategy for product screens',
    expected: 'none',
    bodyCheck: '"offline mode" → 0 files; "caching" hits are DOM element-reference caching and build-time caching only',
    nearMissTopAtFreeze: ['web-authoring-standards (partial)', 'product-handoff-protocol (partial)', 'product-token-governance (partial)'],
  },
  {
    query: 'translation of component label strings into other languages',
    expected: 'none',
    bodyCheck: '"translation|languages|localizable" → only "Token Translation" (Figma) and "Platform Translation Patterns" (layout) headings and a logical-properties rationale; no string-localization guidance',
    nearMissTopAtFreeze: ['component-family-form-inputs (partial)', 'designerpunk-integration-guide (partial)', 'component-development-guide (partial)'],
  },
];

export const COMPONENTS_CALIBRATION_QUERIES: ComponentsCalibrationQuery[] = [
  { query: 'button', sourceLines: [818, 852, 1049], testAssertion: null },
  { query: 'container', sourceLines: [995], testAssertion: null },
  { query: 'input', sourceLines: [806, 810], testAssertion: null },
  { query: 'login', sourceLines: [767, 939], testAssertion: 'Input-Text-Email present at strong or partial (floor; does NOT need to be strong)' },
  { query: 'onboarding', sourceLines: [956], testAssertion: 'low-signal-only match returns ranked data (strong or partial), not the empty contract' },
  { query: 'onboarding flows', sourceLines: [1016], testAssertion: null },
  { query: 'primary action button', sourceLines: [734, 793, 832, 874, 919, 1035], testAssertion: 'Button-CTA at matchConfidence: strong' },
  { query: 'text input field', sourceLines: [775, 783, 928], testAssertion: 'Input-Text-Base at matchConfidence: strong' },
];
