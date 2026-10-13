/**
 * Discovery indexer fix — FRESH blind query set with keys (PRE-REGISTERED FIXTURE)
 *
 * Issue + pre-registration block + grant: .kiro/issues/2026-10-13-find-docs-indexer-defects-from-stage1.md
 *   (PR #322). Findings: .kiro/docs/discovery-indexer-fix-findings.md.
 * Raw source: .kiro/docs/discovery-indexer-fix-fresh-queries.raw.md — every query / seatTool /
 *   seatIntent below is copied VERBATIM from it; the runner refuses to run if any is not found there.
 *
 * POINT-IN-TIME TEST FIXTURE — NOT a living navigational doc.
 * ----------------------------------------------------------------------------
 * - The DISCRIMINATION measure for the indexer fix. Stage 1's Q2 is spent as a matcher-tuning target
 *   (rubric, alias-hygiene amendment) and is reported descriptively only.
 * - FROZEN at its pre-registration commit, which lands BEFORE any fix code exists on the branch.
 *   Keys are never edited afterwards: a key error found later is counted and excluded in the findings.
 * - Every key was reviewed by the orchestrator before the freeze (Thurgood's declared conflict: he owns
 *   the matcher and most of the affected docs). A disputed key is DROPPED, never argued into the set.
 * - Keyed by Thurgood 2026-10-13 against the served corpus at main @ cdb8296fa, by READING the corpus
 *   (headings + body grep). The matcher was NOT run on any fresh query before the freeze.
 * - Seat routing cues: unchanged since Stage 1 (.claude/agents/{sparky,kenya,data}.md @ 8a0c0e46a,
 *   stacy.md @ 08637770a), so SEAT_CUES is imported from the frozen Q2 fixture. `mode` and `cueExposed`
 *   below are precomputed with Stage 1's mechanical rules; the runner recomputes them and fails on any
 *   mismatch.
 *
 * KEYING RULES: K1–K6 exactly as in scripts/__fixtures__/discovery-q2-seats.ts, plus two duplicate rules:
 *  K7 An exact duplicate of a Q2 query (identical query text) is DROPPED and listed with its Q2 twin.
 *  K8 An exact duplicate WITHIN the fresh set is DROPPED and listed; the first occurrence is kept.
 * Applied forward: the Stage 1 DA-05 answer-key-error ruling (#320) — test-development-standards does not
 * answer screen-test structure/naming, so such queries are K5b drops here, not positives.
 *
 * ============================================================================
 * PRE-REGISTERED ACCEPTANCE (from the issue's pre-registration block)
 * ============================================================================
 * Runs: the SHIPPED matcher at the PR's merge-base, then one cumulative line after each fix commit in the
 * fixed order — (1) fence-aware heading extraction → (2) deep headings H3/H4 via the co-occurrence gate
 * (single best deep heading per doc; counts only with ≥ max(2, min(3, salient query tokens)) of the
 * query's salient tokens) → (3) the "iOS"-family atom list. That gives four result lines.
 * The fix is ACCEPTED iff ALL of the following hold at the final line:
 *  (a) oracle: 83 / 0 / 0 PASS / WEAK / MISS, and rank-1-strong ≥ 77;
 *  (b) fresh positives, shipped → fixed: net passes (rank ≤ 2) ≥ +2, with ≤ 2 positives lost;
 *  (c) fresh negatives: NO new confident-wrong — no negative that is correct under the shipped matcher
 *      has a `strong` in its top 3 under the fix (F6 bound);
 *  (d) Q2 is re-run and REPORTED AS SPENT: descriptive only, never evidence for or against the fix.
 * ============================================================================
 */

import { SEAT_CUES, SeatId } from './discovery-q2-seats';

export { SEAT_CUES };

interface FreshBase {
  /** Stable id: 'F' + seat prefix + position in the seat's answer (N1/N2 = "probably undocumented"). */
  id: string;
  seat: SeatId;
  /** Verbatim from the raw file. */
  query: string;
  /** Verbatim from the raw file. */
  seatTool: string;
  /** Verbatim from the raw file. */
  seatIntent: string;
  /** Whether the seat put the query under "probably undocumented" (not a key — K3). */
  seatLabel: 'documented' | 'probably-undocumented';
  /** Precomputed (Stage 1 rule): 'search' iff the tool string starts with find_docs. */
  mode: 'search' | 'direct';
  /** Precomputed (Stage 1 rule): one of the seat's own routing cues appears in the query or tool string. */
  cueExposed: boolean;
  /** One-line key rationale, citing the rule and the section that answers. */
  keyNote: string;
}

export interface FreshPositive extends FreshBase {
  expectedDocId: string;
}

export interface FreshNegative extends FreshBase {
  expected: 'none';
}

export interface FreshDuplicate extends FreshBase {
  /** The Q2 id (K7) or the earlier fresh id (K8) this query duplicates exactly. */
  duplicateOf: string;
}

export type FreshExcluded = FreshBase;


export const FRESH_POSITIVES: FreshPositive[] = [
  {
    id: "FSP-01",
    seat: "sparky",
    query: "web css quality patterns beyond hard rules",
    seatTool: "mcp__designerpunk-docs__get_section (web-authoring-standards § \"Quality Patterns\")",
    seatIntent: "the recommended CSS patterns for screen styling once the six Hard Rules are satisfied",
    seatLabel: "documented",
    mode: "direct",
    cueExposed: true,
    expectedDocId: "web-authoring-standards",
    keyNote: "§ \"Quality Patterns\" (the CSS patterns beyond the Hard Rules).",
  },
  {
    id: "FSP-04",
    seat: "sparky",
    query: "which token doc covers spacing inset vs layout",
    seatTool: "mcp__designerpunk-docs__get_section (token-quick-reference § \"Token Documentation Map\")",
    seatIntent: "which token family doc to read when the spec's token reference is ambiguous",
    seatLabel: "documented",
    mode: "direct",
    cueExposed: true,
    expectedDocId: "token-family-spacing",
    keyNote: "K1: the spacing family doc holds § \"Inset Spacing (Internal Padding)\" and § \"Layout Spacing (Element Relationships)\"; token-quick-reference only routes.",
  },
  {
    id: "FSP-06",
    seat: "sparky",
    query: "how to verify a behavioral contract in a web implementation test",
    seatTool: "mcp__designerpunk-docs__get_document_summary (test-behavioral-contract-validation)",
    seatIntent: "how to write tests that prove interaction_focusable / state_disabled etc. are honored",
    seatLabel: "documented",
    mode: "direct",
    cueExposed: true,
    expectedDocId: "test-behavioral-contract-validation",
    keyNote: "Framework for validating behavioral contracts per platform.",
  },
  {
    id: "FSP-07",
    seat: "sparky",
    query: "implementation report format tier 2 product handoff protocol",
    seatTool: "mcp__designerpunk-docs__find_docs (concept: \"product handoff protocol implementation report\")",
    seatIntent: "the required sections of the Implementation Report I send back to Leonardo",
    seatLabel: "documented",
    mode: "search",
    cueExposed: false,
    expectedDocId: "product-handoff-protocol",
    keyNote: "§ \"Tier 2: Implementation Reports\" + the Implementation Report template.",
  },
  {
    id: "FSP-08",
    seat: "sparky",
    query: "completion doc tier subtask vs parent two-document workflow",
    seatTool: "mcp__designerpunk-docs__get_section (completion-documentation-guide § \"Two-Document Workflow\")",
    seatIntent: "which completion docs I owe and what the floor is for a subtask doc",
    seatLabel: "documented",
    mode: "direct",
    cueExposed: true,
    expectedDocId: "completion-documentation-guide",
    keyNote: "§ \"Two-Document Workflow\" + § \"The subtask completion doc\" (tiers, subtask vs parent).",
  },
  {
    id: "FSP-10",
    seat: "sparky",
    query: "cross-platform file paths for component source and shared artifacts",
    seatTool: "mcp__designerpunk-docs__get_section (docs MCP, cross-platform file paths section)",
    seatIntent: "the canonical paths to existing web component implementations I should pattern after",
    seatLabel: "documented",
    mode: "direct",
    cueExposed: false,
    expectedDocId: "platform-resource-map",
    keyNote: "Purpose: \"Cross-platform file path reference for component source, tokens, and shared artifacts\".",
  },
  {
    id: "FSP-11",
    seat: "sparky",
    query: "canonical contract name for keyboard focus / disabled state",
    seatTool: "mcp__designerpunk-docs__get_document_summary (contract-system-reference)",
    seatIntent: "the {category}_{concept} name to cite when I say a contract is honored",
    seatLabel: "documented",
    mode: "direct",
    cueExposed: true,
    expectedDocId: "contract-system-reference",
    keyNote: "Taxonomy + concept catalog: canonical {category}_{concept} names.",
  },
  {
    id: "FSP-N2",
    seat: "sparky",
    query: "jest setup for testing custom elements with shadow dom in a product screen",
    seatTool: "mcp__designerpunk-docs__find_docs (concept: \"jsdom shadow dom custom element test setup\")",
    seatIntent: "a how-to for registering custom elements and querying shadowRoot in Jest for product screens (I expect component tests exist as examples but no written standard)",
    seatLabel: "probably-undocumented",
    mode: "search",
    cueExposed: false,
    expectedDocId: "test-development-standards",
    keyNote: "K3 (seat-labelled undocumented): § \"Web Component Testing Patterns\" — \"JSDOM and Custom Elements\", \"Pattern: Explicit Custom Element Registration\", \"Pattern: Shadow DOM Querying\". DIG § \"Running Component Tests\" is jest config with no shadow/registration content, so single answer.",
  },
  {
    id: "FKE-01",
    seat: "kenya",
    query: "which spacing token for card padding inset in a product screen",
    seatTool: "mcp__designerpunk-docs__find_docs",
    seatIntent: "the Token Documentation Map entry telling me which semantic space.inset token fits a card interior",
    seatLabel: "documented",
    mode: "search",
    cueExposed: false,
    expectedDocId: "token-family-spacing",
    keyNote: "K1: § \"Inset Spacing (Internal Padding)\" — space.inset.* rows name cards.",
  },
  {
    id: "FKE-03",
    seat: "kenya",
    query: "how to name a product token I'm adding during implementation",
    seatTool: "mcp__designerpunk-docs__get_section (product-token-governance, \"Naming Conventions\")",
    seatIntent: "the --product-{category}-{token-name} rule and category list before I author a YAML row",
    seatLabel: "documented",
    mode: "direct",
    cueExposed: true,
    expectedDocId: "product-token-governance",
    keyNote: "§ \"Naming Conventions\" (iOS seat: WAS is web-scoped, so PTG is single — as Stage 1 KE-04).",
  },
  {
    id: "FKE-05",
    seat: "kenya",
    query: "how do I verify a behavioral contract is honored on ios",
    seatTool: "mcp__designerpunk-docs__get_document_summary (test-behavioral-contract-validation)",
    seatIntent: "the contract-validation guidance so my tests assert the right things, not just rendering",
    seatLabel: "documented",
    mode: "direct",
    cueExposed: true,
    expectedDocId: "test-behavioral-contract-validation",
    keyNote: "As FSP-06.",
  },
  {
    id: "FKE-06",
    seat: "kenya",
    query: "subtask completion doc minimum contents",
    seatTool: "mcp__designerpunk-docs__get_section (completion-documentation-guide, \"The subtask completion doc\")",
    seatIntent: "the three-element floor and header lines so my task-N-M-completion.md passes the claims pass",
    seatLabel: "documented",
    mode: "direct",
    cueExposed: true,
    expectedDocId: "completion-documentation-guide",
    keyNote: "§ \"The subtask completion doc — mandatory, and deliberately light (S-4 …)\".",
  },
  {
    id: "FKE-07",
    seat: "kenya",
    query: "implementation report format to hand back to leonardo",
    seatTool: "mcp__designerpunk-docs__find_docs",
    seatIntent: "the Product Handoff Protocol Tier 2 report shape (deviations, decisions made, discoveries)",
    seatLabel: "documented",
    mode: "search",
    cueExposed: false,
    expectedDocId: "product-handoff-protocol",
    keyNote: "As FSP-07.",
  },
  {
    id: "FKE-09",
    seat: "kenya",
    query: "how does a product app get theming swift generated",
    seatTool: "mcp__designerpunk-docs__find_docs",
    seatIntent: "the consumer-side `npx designerpunk generate` step that materializes the {Name}Theme protocol and ThemeKey",
    seatLabel: "documented",
    mode: "search",
    cueExposed: false,
    expectedDocId: "designerpunk-integration-guide",
    keyNote: "K6: § \"6. Generate Tokens\" (output list; \"no theme surface yet\") + § \"iOS and Android (not supported for onboarding in 15.0.0)\" — the consumer-side status of generated Swift theming.",
  },
  {
    id: "FKE-N2",
    seat: "kenya",
    query: "how to run or fake an ios build check for a product screen from this repo",
    seatTool: "mcp__designerpunk-docs__find_docs",
    seatIntent: "any sanctioned stand-in (swift syntax check, snapshot, consumer harness) for the named xcodebuild gap when the consumer repo isn't at hand",
    seatLabel: "probably-undocumented",
    mode: "search",
    cueExposed: false,
    expectedDocId: "completion-documentation-guide",
    keyNote: "K6: § \"The instrument's honest reach\" — nothing in this repository compiles generated Swift or Kotlin; the honest form is `not re-verified — toolchain unavailable` until the chartered harness closes. That is the answer (no sanctioned stand-in exists). Same key as Stage 1 ST-N2.",
  },
  {
    id: "FDA-02",
    seat: "data",
    query: "which spacing token for card padding inset",
    seatTool: "mcp__designerpunk-docs__get_section (token-quick-reference § \"Token Documentation Map\")",
    seatIntent: "which token family doc covers inset vs layout spacing so I pick the right semantic token",
    seatLabel: "documented",
    mode: "direct",
    cueExposed: true,
    expectedDocId: "token-family-spacing",
    keyNote: "As FKE-01.",
  },
  {
    id: "FDA-04",
    seat: "data",
    query: "how do I name a product token I'm adding during implementation",
    seatTool: "mcp__designerpunk-docs__get_section (product-token-governance § \"Naming Conventions\")",
    seatIntent: "the --product-{category}-{name} naming rule before I touch product/tokens/*.yaml",
    seatLabel: "documented",
    mode: "direct",
    cueExposed: true,
    expectedDocId: "product-token-governance",
    keyNote: "As FKE-03 (Android seat).",
  },
  {
    id: "FDA-05",
    seat: "data",
    query: "when is a value: product token allowed instead of ref:",
    seatTool: "mcp__designerpunk-docs__find_docs",
    seatIntent: "the system-first query + perceptual tolerance rule and what the rationale field must say",
    seatLabel: "documented",
    mode: "search",
    cueExposed: false,
    expectedDocId: "product-token-governance",
    keyNote: "§ \"System-First Value Selection\" (Perceptual Tolerance Guidelines) + § \"Value Governance\" (`ref` vs `value`, rationale).",
  },
  {
    id: "FDA-08",
    seat: "data",
    query: "implementation report format tier 2 handoff to leonardo",
    seatTool: "mcp__designerpunk-docs__find_docs",
    seatIntent: "the Product Handoff Protocol sections an Implementation Report must carry (deviations, decisions made, discoveries)",
    seatLabel: "documented",
    mode: "search",
    cueExposed: false,
    expectedDocId: "product-handoff-protocol",
    keyNote: "As FSP-07.",
  },
  {
    id: "FDA-10",
    seat: "data",
    query: "where do android component sources live cross-platform file paths",
    seatTool: "mcp__designerpunk-docs__get_section",
    seatIntent: "the canonical paths for platforms/android/ component implementations I should reference as patterns",
    seatLabel: "documented",
    mode: "direct",
    cueExposed: false,
    expectedDocId: "platform-resource-map",
    keyNote: "As FSP-10 (platforms/android paths).",
  },
  {
    id: "FDA-11",
    seat: "data",
    query: "talkback contentDescription vs semantics role for custom compose component",
    seatTool: "mcp__designerpunk-docs__find_docs",
    seatIntent: "DesignerPunk's accessibility expectation for Compose semantics (what the a11y guidelines require beyond Material defaults)",
    seatLabel: "documented",
    mode: "search",
    cueExposed: false,
    expectedDocId: "platform-implementation-guidelines",
    keyNote: "§ \"Android Implementation Patterns\" (Compose semantics, contentDescription) + § \"Category 4: Platform-Specific Accessibility\" (TalkBack) — as Stage 1 DA-11 (Lina: key defensible; \"role\" is her content debt D-5).",
  },
  {
    id: "FDA-N2",
    seat: "data",
    query: "gradle module layout for a consumer android app consuming @3fn/core tokens",
    seatTool: "mcp__designerpunk-docs__find_docs",
    seatIntent: "how the generated DesignTokens.android.kt / ProductTokens.android.kt are meant to be wired into a real Gradle project (module, package, dependency)",
    seatLabel: "probably-undocumented",
    mode: "search",
    cueExposed: false,
    expectedDocId: "designerpunk-integration-guide",
    keyNote: "K6: § \"iOS and Android (not supported for onboarding in 15.0.0)\" (copying native files into an Android module does not compile) and § \"Native Platform Sync — Target Model (M0b)\" (the Gradle module path, per Leonardo's Stage 1 DA-N1 ruling). Same key as Stage 1 DA-N1.",
  },
  {
    id: "FST-01",
    seat: "stacy",
    query: "what must a parent completion doc contain success criteria rows status evidence forced-negative line",
    seatTool: "mcp__designerpunk-docs__get_section (completion-documentation-guide § \"Parent Success-Criteria Fidelity\")",
    seatIntent: "the standard I audit parent docs against before I count omissions or vagueness",
    seatLabel: "documented",
    mode: "direct",
    cueExposed: true,
    expectedDocId: "completion-documentation-guide",
    keyNote: "§ \"Parent Success-Criteria Fidelity\" (rows, Status + Evidence, forced-negative line).",
  },
  {
    id: "FST-04",
    seat: "stacy",
    query: "subtask completion doc floor three elements adaptations none",
    seatTool: "mcp__designerpunk-docs__get_section (completion-documentation-guide § \"The subtask completion doc\")",
    seatIntent: "what a ticked subtask's doc must minimally carry before I flag a missing one",
    seatLabel: "documented",
    mode: "direct",
    cueExposed: true,
    expectedDocId: "completion-documentation-guide",
    keyNote: "As FKE-06.",
  },
  {
    id: "FST-05",
    seat: "stacy",
    query: "how are merge units declared in tasks.md canonical heading legacy bold prose",
    seatTool: "mcp__designerpunk-docs__find_docs (concept)",
    seatIntent: "the recognized declaration forms so the owed-set classification (a)/(b)/(c) is right",
    seatLabel: "documented",
    mode: "search",
    cueExposed: false,
    expectedDocId: "process-spec-planning",
    keyNote: "§ \"The Declared Merge Units block — the canonical form\" + the predicate table row 8 \"units block — legacy bold-prose\" (L544).",
  },
  {
    id: "FST-06",
    seat: "stacy",
    query: "behavioral contract validation process cross platform same behavior",
    seatTool: "mcp__designerpunk-docs__get_section (test-behavioral-contract-validation § \"Validation Process\")",
    seatIntent: "how to judge whether iOS/Android/Web tests verify identical contract behavior in a parity review",
    seatLabel: "documented",
    mode: "direct",
    cueExposed: true,
    expectedDocId: "test-behavioral-contract-validation",
    keyNote: "§ \"Validation Process\" (cross-platform).",
  },
  {
    id: "FST-07",
    seat: "stacy",
    query: "tasks document format task type validation tier success criteria",
    seatTool: "mcp__designerpunk-docs__get_section (process-spec-planning § \"Tasks Document Format\")",
    seatIntent: "what a verifiable criteria set looks like for the LENS seat without drafting criterion text",
    seatLabel: "documented",
    mode: "direct",
    cueExposed: true,
    expectedDocId: "process-spec-planning",
    keyNote: "§ \"Tasks Document Format\".",
  },
  {
    id: "FST-08",
    seat: "stacy",
    query: "implementation report what fields deviations discoveries blocking flags",
    seatTool: "mcp__designerpunk-docs__find_docs (concept: product handoff protocol implementation report)",
    seatIntent: "the report shape I compare decomposed per-platform rows against at CLOSEOUT",
    seatLabel: "documented",
    mode: "search",
    cueExposed: false,
    expectedDocId: "product-handoff-protocol",
    keyNote: "As FSP-07.",
  },
  {
    id: "FST-12",
    seat: "stacy",
    query: "orchestrator consult line trigger surfaces PR body none needed",
    seatTool: "mcp__designerpunk-docs__find_docs (concept: consult-first ballot)",
    seatIntent: "the trigger-surface list and grammar I count on PR bodies in the counting block",
    seatLabel: "documented",
    mode: "search",
    cueExposed: false,
    expectedDocId: "classification-map",
    keyNote: "§ \"orchestrator-consult-line\" (the register row, L957–L986) states the rule text, the population and the trigger surfaces. Its ONE HOME is Agent-Directory, an identity doc that is never served, so the register row is the served answer.",
  },
  {
    id: "FST-N1",
    seat: "stacy",
    query: "how to verify an iOS or Android test actually ran when I cannot build it locally",
    seatTool: "mcp__designerpunk-docs__find_docs (concept: platform build verification)",
    seatIntent: "an audit procedure for trust-the-reported-result rows beyond writing \"not re-verified — toolchain unavailable\"",
    seatLabel: "probably-undocumented",
    mode: "search",
    cueExposed: false,
    expectedDocId: "completion-documentation-guide",
    keyNote: "K6: as FKE-N2 — § \"The instrument's honest reach\" (trust-the-reported-result; no procedure until the harness closes). Same key as Stage 1 ST-N2.",
  },
];

export const FRESH_NEGATIVES: FreshNegative[] = [
  {
    id: "FSP-09",
    seat: "sparky",
    query: "where do product screen implementation files live file organization",
    seatTool: "mcp__designerpunk-docs__get_document_summary (process-file-organization)",
    seatIntent: "the directory rules for where a web screen implementation and its tests belong",
    seatLabel: "documented",
    mode: "direct",
    cueExposed: true,
    expected: 'none',
    keyNote: "K4/K3: no served doc says where product-screen implementation source and tests live in a consumer repo (body grep \"screen.*(live|directory|folder)|screens/\" at cdb8296fa: none; DIG L521 covers init's product/ data scaffolds, not screen source). Same as Stage 1 SP-09/KE-09/DA-10; finding D-3 still open.",
  },
  {
    id: "FSP-N1",
    seat: "sparky",
    query: "how to wire a web screen's shadow dom styles to load product tokens css after system tokens",
    seatTool: "mcp__designerpunk-docs__find_docs (concept: \"product tokens css load order shadow dom\")",
    seatIntent: "the concrete load-order mechanics for ProductTokens.web.css inside a Shadow DOM screen component (I expect only the one-line note in my charter)",
    seatLabel: "probably-undocumented",
    mode: "search",
    cueExposed: false,
    expected: 'none',
    keyNote: "No load-order mechanics for ProductTokens.web.css inside Shadow DOM: WAS § \"Shadow DOM Context\" says only that tokens inherit through Shadow DOM; DIG L586 lists the file. Body grep \"load order|after system tokens\": 0.",
  },
  {
    id: "FKE-08",
    seat: "kenya",
    query: "where do product screen swift files live and what are they named",
    seatTool: "mcp__designerpunk-docs__get_document_summary (process-file-organization)",
    seatIntent: "file placement rules for product iOS screens and their tests",
    seatLabel: "documented",
    mode: "direct",
    cueExposed: true,
    expected: 'none',
    keyNote: "K4/K3: no served doc says where product-screen implementation source and tests live in a consumer repo (body grep \"screen.*(live|directory|folder)|screens/\" at cdb8296fa: none; DIG L521 covers init's product/ data scaffolds, not screen source). Same as Stage 1 SP-09/KE-09/DA-10; finding D-3 still open.",
  },
  {
    id: "FKE-11",
    seat: "kenya",
    query: "when do I commit and push a subtask checkpoint",
    seatTool: "mcp__designerpunk-docs__get_section (process-development-workflow)",
    seatIntent: "the judgment rule for complete-task.sh --subtask so I don't checkpoint mechanically or skip a backup-worthy pile",
    seatLabel: "documented",
    mode: "direct",
    cueExposed: true,
    expected: 'none',
    keyNote: "K4: the judgment-based subtask commit-and-push rule lives in Task-Completion-Protocol (an identity doc, never MCP-served); process-development-workflow says only \"atomic commits per subtask on the branch\". Body grep \"checkpoint\" over governance/: no commit-checkpoint guidance.",
  },
  {
    id: "FKE-N1",
    seat: "kenya",
    query: "swiftui navigationstack and sheet state conventions for designerpunk product screens",
    seatTool: "mcp__designerpunk-docs__find_docs",
    seatIntent: "a house style for iOS navigation/state (NavigationStack path binding, @Observable vs ObservableObject) rather than per-screen improvisation",
    seatLabel: "probably-undocumented",
    mode: "search",
    cueExposed: false,
    expected: 'none',
    keyNote: "Body grep \"NavigationStack|sheet state|@Observable\": one example sentence in product-handoff-protocol § \"Communication Reality\"; no iOS navigation/state house style.",
  },
  {
    id: "FDA-N1",
    seat: "data",
    query: "compose previews and screenshot tests for product screens where do they go",
    seatTool: "mcp__designerpunk-docs__find_docs",
    seatIntent: "whether there is any standard for @Preview coverage or screenshot testing on Android product screens",
    seatLabel: "probably-undocumented",
    mode: "search",
    cueExposed: false,
    expected: 'none',
    keyNote: "Body grep \"@Preview|screenshot\": only TBCV manual-verification bullets (\"Screenshots of each state\") for component contract validation; no product-screen preview or screenshot-test convention.",
  },
  {
    id: "FST-11",
    seat: "stacy",
    query: "release flow step 5a owed set query release record two registries",
    seatTool: "mcp__designerpunk-docs__find_docs (concept: RELEASE-FLOW)",
    seatIntent: "what the release checklist must paste and what phase 2 reads against the published bytes",
    seatLabel: "documented",
    mode: "search",
    cueExposed: false,
    expected: 'none',
    keyNote: "K4: release-management-system L35/L41 points to `.kiro/hooks/RELEASE-FLOW.md` (repo-internal, not served) for the operational sequence; step 5a's paste list and phase-2 fields are not in the served corpus.",
  },
  {
    id: "FST-N2",
    seat: "stacy",
    query: "how big a claims pass sample should be per spec size or risk",
    seatTool: "mcp__designerpunk-docs__find_docs (concept: claims pass sampling fraction)",
    seatIntent: "a sampling heuristic for the Method section rather than effort-by-signal with no floor",
    seatLabel: "probably-undocumented",
    mode: "search",
    cueExposed: false,
    expected: 'none',
    keyNote: "Body grep \"sampl\": classification-map mentions a pass's \"stated sample fraction\" and Peter's J sample of signed acts; no sampling heuristic for a claims pass is served (that law lives in ballots / Stacy's charter).",
  },
];

export const FRESH_DROPPED_Q2_DUPLICATE: FreshDuplicate[] = [
  {
    id: "FSP-02",
    seat: "sparky",
    query: "how do I author a new product token I discovered during screen implementation",
    seatTool: "mcp__designerpunk-docs__get_section (web-authoring-standards § \"Product Token Authoring (Sparky)\")",
    seatIntent: "the exact steps and YAML shape for adding a product token to product/tokens/{category}.yaml",
    seatLabel: "documented",
    mode: "direct",
    cueExposed: true,
    duplicateOf: "SP-02",
    keyNote: "Exact duplicate of Q2 SP-02 (query text identical).",
  },
  {
    id: "FSP-03",
    seat: "sparky",
    query: "product token naming convention --product-{category}-{token-name}",
    seatTool: "mcp__designerpunk-docs__get_section (product-token-governance § \"Naming Conventions\")",
    seatIntent: "how to name a new product token so it passes governance",
    seatLabel: "documented",
    mode: "direct",
    cueExposed: true,
    duplicateOf: "SP-03",
    keyNote: "Exact duplicate of Q2 SP-03 (query text identical).",
  },
  {
    id: "FDA-07",
    seat: "data",
    query: "how to verify a behavioral contract in an android implementation",
    seatTool: "mcp__designerpunk-docs__get_document_summary (test-behavioral-contract-validation)",
    seatIntent: "what a contract-validation test must assert for e.g. interaction_focusable on Compose",
    seatLabel: "documented",
    mode: "direct",
    cueExposed: true,
    duplicateOf: "DA-06",
    keyNote: "Exact duplicate of Q2 DA-06 (query text identical).",
  },
  {
    id: "FST-02",
    seat: "stacy",
    query: "delegated-tier line fixed forms plan held divergence grammar",
    seatTool: "mcp__designerpunk-docs__get_section (completion-documentation-guide § \"The delegated-tier line — unconditional\")",
    seatIntent: "the exact two forms so I can split missing vs free-prose findings",
    seatLabel: "documented",
    mode: "direct",
    cueExposed: true,
    duplicateOf: "ST-02",
    keyNote: "Exact duplicate of Q2 ST-02 (query text identical).",
  },
  {
    id: "FST-03",
    seat: "stacy",
    query: "instruments block header line format exists built here MISSING found later",
    seatTool: "mcp__designerpunk-docs__get_section (completion-documentation-guide § \"The instruments line and block\")",
    seatIntent: "the row grammar and counts the instruments read checks on each parent doc",
    seatLabel: "documented",
    mode: "direct",
    cueExposed: true,
    duplicateOf: "ST-03",
    keyNote: "Exact duplicate of Q2 ST-03 (query text identical).",
  },
];

export const FRESH_DROPPED_WITHIN_DUPLICATE: FreshDuplicate[] = [
  {
    id: "FDA-09",
    seat: "data",
    query: "subtask completion doc minimum contents",
    seatTool: "mcp__designerpunk-docs__get_section (completion-documentation-guide § \"Two-Document Workflow\")",
    seatIntent: "the three-element floor for task-N-M-completion.md and when a summary doc is also required",
    seatLabel: "documented",
    mode: "direct",
    cueExposed: true,
    duplicateOf: "FKE-06",
    keyNote: "Exact duplicate WITHIN the fresh set of FKE-06 (\"subtask completion doc minimum contents\"); the first occurrence is kept.",
  },
];

export const FRESH_DROPPED_NO_SINGLE_ANSWER: FreshExcluded[] = [
  {
    id: "FSP-05",
    seat: "sparky",
    query: "test structure naming categories for a product screen test",
    seatTool: "mcp__designerpunk-docs__get_document_summary (test-development-standards)",
    seatIntent: "required test file layout, describe-block categories, and naming for Jest screen tests",
    seatLabel: "documented",
    mode: "direct",
    cueExposed: true,
    keyNote: "K5b partial coverage: test-development-standards answers test CATEGORIES (evergreen/temporary) but has no screen-test file-structure or naming convention — the Stage 1 DA-05 answer-key-error ruling (#320) applied forward, before any run.",
  },
  {
    id: "FKE-02",
    seat: "kenya",
    query: "swiftui token consumption pattern environment theme vs DesignTokens static",
    seatTool: "mcp__designerpunk-docs__get_section (platform-implementation-guidelines, \"iOS Implementation Patterns\")",
    seatIntent: "the how-to for reading theme-varying colors via @Environment and static tokens from DesignTokens in a view",
    seatLabel: "documented",
    mode: "direct",
    cueExposed: true,
    keyNote: "K5a two defensible: component-development-guide § \"Token Consumption by Platform (Spec 094)\" gives the theme-varying pattern; designerpunk-integration-guide § \"iOS and Android (not supported for onboarding in 15.0.0)\" says the consumer theme surface is not emitted in 15.0.0. Lina's Stage 1 DA-02 note: an acceptable set of both would be the right key; single-answer rule → drop.",
  },
  {
    id: "FKE-04",
    seat: "kenya",
    query: "screen test file structure naming categories swift",
    seatTool: "mcp__designerpunk-docs__get_document_summary (test-development-standards)",
    seatIntent: "the test structure and naming standard I'm expected to follow for an iOS screen test",
    seatLabel: "documented",
    mode: "direct",
    cueExposed: true,
    keyNote: "K5b partial coverage: test-development-standards answers test CATEGORIES (evergreen/temporary) but has no screen-test file-structure or naming convention — the Stage 1 DA-05 answer-key-error ruling (#320) applied forward, before any run.",
  },
  {
    id: "FKE-10",
    seat: "kenya",
    query: "voiceover accessibility requirements for product screens wcag",
    seatTool: "mcp__designerpunk-docs__find_docs",
    seatIntent: "the accessibility standard (labels, traits, focus order) I must satisfy before calling a screen done",
    seatLabel: "documented",
    mode: "search",
    cueExposed: false,
    keyNote: "K5b partial: platform-implementation-guidelines § \"4. Accessibility Consistency\" / § \"Category 4\" state component-level VoiceOver requirements; no doc states a product-SCREEN accessibility standard (labels, traits, focus order before a screen is done).",
  },
  {
    id: "FDA-01",
    seat: "data",
    query: "android compose token consumption .dp pattern",
    seatTool: "mcp__designerpunk-docs__find_docs",
    seatIntent: "the rule on when to append .dp to DesignTokens values vs letting Compose convert implicitly",
    seatLabel: "documented",
    mode: "search",
    cueExposed: false,
    keyNote: "K5c contradiction (unchanged at cdb8296fa): rosetta-system-architecture L39 \"Tokens are pre-unitized. Never add platform units\" vs platform-implementation-guidelines L730 + \"When `.dp` IS Required\". Stage 1 DA-01 / finding D-1, still routed to Ada + Lina.",
  },
  {
    id: "FDA-03",
    seat: "data",
    query: "theme-varying color compose CompositionLocal LocalDPTheme",
    seatTool: "mcp__designerpunk-docs__find_docs",
    seatIntent: "how product apps are supposed to wrap content and read theme-varying colors inside composition scope",
    seatLabel: "documented",
    mode: "search",
    cueExposed: false,
    keyNote: "K5a two defensible: component-development-guide § \"Token Consumption by Platform (Spec 094)\" gives the theme-varying pattern; designerpunk-integration-guide § \"iOS and Android (not supported for onboarding in 15.0.0)\" says the consumer theme surface is not emitted in 15.0.0. Lina's Stage 1 DA-02 note: an acceptable set of both would be the right key; single-answer rule → drop.",
  },
  {
    id: "FDA-06",
    seat: "data",
    query: "test file naming and structure for a compose screen test",
    seatTool: "mcp__designerpunk-docs__get_document_summary (test-development-standards)",
    seatIntent: "required test categories, describe-block structure, and naming so Stacy doesn't bounce it",
    seatLabel: "documented",
    mode: "direct",
    cueExposed: true,
    keyNote: "K5b partial coverage: test-development-standards answers test CATEGORIES (evergreen/temporary) but has no screen-test file-structure or naming convention — the Stage 1 DA-05 answer-key-error ruling (#320) applied forward, before any run.",
  },
  {
    id: "FST-09",
    seat: "stacy",
    query: "completion criteria parity emission lines declared-none exemption deferral docs not found",
    seatTool: "mcp__designerpunk-docs__find_docs (concept)",
    seatIntent: "how to read the checker's emissions I must record in the counting block",
    seatLabel: "documented",
    mode: "search",
    cueExposed: false,
    keyNote: "K5b partial/split (as Stage 1 ST-07): completion-documentation-guide defines deferral and in-flight-exemption forms; classification-map § \"completion-criteria-parity\" describes the check and mentions a missing-line EMISSION; neither defines the checker's emission lines.",
  },
  {
    id: "FST-10",
    seat: "stacy",
    query: "test file naming categories evergreen temporary retirement criteria",
    seatTool: "mcp__designerpunk-docs__get_document_summary (test-development-standards)",
    seatIntent: "the naming/category rules I check platform tests against",
    seatLabel: "documented",
    mode: "direct",
    cueExposed: true,
    keyNote: "K5b partial: test-development-standards answers categories (evergreen/temporary) and § \"Retirement Criteria for Temporary Tests\", but has no test-file NAMING rule — the same gap as the DA-05 ruling.",
  },
];

/** Held (non-docs-MCP) queries: none — every fresh query names a docs-MCP tool. */
export const FRESH_HELD: FreshExcluded[] = [];
