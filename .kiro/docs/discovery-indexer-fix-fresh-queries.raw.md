# Discovery indexer fix — FRESH blind seat queries, RAW (verbatim record)

**Date**: 2026-10-13
**Issue**: `.kiro/issues/2026-10-13-find-docs-indexer-defects-from-stage1.md` (the pre-registration block and grant, PR #322). Findings: `.kiro/docs/discovery-indexer-fix-findings.md`.
**Owner**: Thurgood (capture). Seats are blind authors and hold no grant.
**What this file is**: the FRESH set's raw answers. The indexer fix is measured on this set; Stage 1's Q2 is spent as a matcher-tuning target. This file is recorded before any key is written and before any fix code exists. The keys and routing live in `scripts/__fixtures__/discovery-fresh-set.ts`.

**Rules for this file**
- Each seat's answer is pasted **UNEDITED**: no reformatting, no spelling fixes, no removals. Notes go in the fixture and the findings doc, never here.
- Each seat ran as a **NEW agent**, in a read-only consult with no tool calls (harness telemetry: tool_uses = 1, the hand-back only). It received the sealed prompt below word for word and no other context.
- **The Stage 1 raw file (`.kiro/docs/discovery-study-stage1-seat-queries.raw.md`) was never shown to these agents.** Similarity to Stage 1 queries comes from the seats' shared charters and routing cues; exact duplicates are dropped in the fixture.
- Point-in-time record, not a navigational doc.

---

## The sealed prompt (verbatim — identical to Stage 1's)

```
Please answer from what you already know, in your own seat. Do not call any tool (no MCP tool, no file read, no search) before or while answering, and do not read anything under governance/. Do not look anything up to check whether it exists.

Write the queries you would type to find GUIDANCE while doing your work here: a standard, a process, a rule, or a how-to you would need. Write about 10. Phrase each one the way you would really type it, not the way a document would title it.

Put each query on its own line, in this form:
query | the tool you would use | one line: what you are trying to find

Then write 2 more queries in the same form, for guidance you would look for but suspect is NOT documented anywhere here. Put the label "probably undocumented" above those two.

Do not add anything else. Your answer is recorded exactly as you write it.
```

---

## Sparky

**Provenance**: agent `a08b6a02b410a9ac4` · 2026-10-13 · tool_uses = 1 (harness telemetry, relayed by the orchestrator) · new agent, no study context

```
web css quality patterns beyond hard rules | mcp__designerpunk-docs__get_section (web-authoring-standards § "Quality Patterns") | the recommended CSS patterns for screen styling once the six Hard Rules are satisfied
how do I author a new product token I discovered during screen implementation | mcp__designerpunk-docs__get_section (web-authoring-standards § "Product Token Authoring (Sparky)") | the exact steps and YAML shape for adding a product token to product/tokens/{category}.yaml
product token naming convention --product-{category}-{token-name} | mcp__designerpunk-docs__get_section (product-token-governance § "Naming Conventions") | how to name a new product token so it passes governance
which token doc covers spacing inset vs layout | mcp__designerpunk-docs__get_section (token-quick-reference § "Token Documentation Map") | which token family doc to read when the spec's token reference is ambiguous
test structure naming categories for a product screen test | mcp__designerpunk-docs__get_document_summary (test-development-standards) | required test file layout, describe-block categories, and naming for Jest screen tests
how to verify a behavioral contract in a web implementation test | mcp__designerpunk-docs__get_document_summary (test-behavioral-contract-validation) | how to write tests that prove interaction_focusable / state_disabled etc. are honored
implementation report format tier 2 product handoff protocol | mcp__designerpunk-docs__find_docs (concept: "product handoff protocol implementation report") | the required sections of the Implementation Report I send back to Leonardo
completion doc tier subtask vs parent two-document workflow | mcp__designerpunk-docs__get_section (completion-documentation-guide § "Two-Document Workflow") | which completion docs I owe and what the floor is for a subtask doc
where do product screen implementation files live file organization | mcp__designerpunk-docs__get_document_summary (process-file-organization) | the directory rules for where a web screen implementation and its tests belong
cross-platform file paths for component source and shared artifacts | mcp__designerpunk-docs__get_section (docs MCP, cross-platform file paths section) | the canonical paths to existing web component implementations I should pattern after
canonical contract name for keyboard focus / disabled state | mcp__designerpunk-docs__get_document_summary (contract-system-reference) | the {category}_{concept} name to cite when I say a contract is honored

probably undocumented
how to wire a web screen's shadow dom styles to load product tokens css after system tokens | mcp__designerpunk-docs__find_docs (concept: "product tokens css load order shadow dom") | the concrete load-order mechanics for ProductTokens.web.css inside a Shadow DOM screen component (I expect only the one-line note in my charter)
jest setup for testing custom elements with shadow dom in a product screen | mcp__designerpunk-docs__find_docs (concept: "jsdom shadow dom custom element test setup") | a how-to for registering custom elements and querying shadowRoot in Jest for product screens (I expect component tests exist as examples but no written standard)
```

## Kenya

**Provenance**: agent `a844b582a24c1fac5` · 2026-10-13 · tool_uses = 1 (harness telemetry, relayed by the orchestrator) · new agent, no study context

```
which spacing token for card padding inset in a product screen | mcp__designerpunk-docs__find_docs | the Token Documentation Map entry telling me which semantic space.inset token fits a card interior
swiftui token consumption pattern environment theme vs DesignTokens static | mcp__designerpunk-docs__get_section (platform-implementation-guidelines, "iOS Implementation Patterns") | the how-to for reading theme-varying colors via @Environment and static tokens from DesignTokens in a view
how to name a product token I'm adding during implementation | mcp__designerpunk-docs__get_section (product-token-governance, "Naming Conventions") | the --product-{category}-{token-name} rule and category list before I author a YAML row
screen test file structure naming categories swift | mcp__designerpunk-docs__get_document_summary (test-development-standards) | the test structure and naming standard I'm expected to follow for an iOS screen test
how do I verify a behavioral contract is honored on ios | mcp__designerpunk-docs__get_document_summary (test-behavioral-contract-validation) | the contract-validation guidance so my tests assert the right things, not just rendering
subtask completion doc minimum contents | mcp__designerpunk-docs__get_section (completion-documentation-guide, "The subtask completion doc") | the three-element floor and header lines so my task-N-M-completion.md passes the claims pass
implementation report format to hand back to leonardo | mcp__designerpunk-docs__find_docs | the Product Handoff Protocol Tier 2 report shape (deviations, decisions made, discoveries)
where do product screen swift files live and what are they named | mcp__designerpunk-docs__get_document_summary (process-file-organization) | file placement rules for product iOS screens and their tests
how does a product app get theming swift generated | mcp__designerpunk-docs__find_docs | the consumer-side `npx designerpunk generate` step that materializes the {Name}Theme protocol and ThemeKey
voiceover accessibility requirements for product screens wcag | mcp__designerpunk-docs__find_docs | the accessibility standard (labels, traits, focus order) I must satisfy before calling a screen done
when do I commit and push a subtask checkpoint | mcp__designerpunk-docs__get_section (process-development-workflow) | the judgment rule for complete-task.sh --subtask so I don't checkpoint mechanically or skip a backup-worthy pile

probably undocumented
swiftui navigationstack and sheet state conventions for designerpunk product screens | mcp__designerpunk-docs__find_docs | a house style for iOS navigation/state (NavigationStack path binding, @Observable vs ObservableObject) rather than per-screen improvisation
how to run or fake an ios build check for a product screen from this repo | mcp__designerpunk-docs__find_docs | any sanctioned stand-in (swift syntax check, snapshot, consumer harness) for the named xcodebuild gap when the consumer repo isn't at hand
```

## Data

**Provenance**: agent `a5a61f941a3d5e156` · 2026-10-13 · tool_uses = 1 (harness telemetry, relayed by the orchestrator) · new agent, no study context

```
android compose token consumption .dp pattern | mcp__designerpunk-docs__find_docs | the rule on when to append .dp to DesignTokens values vs letting Compose convert implicitly
which spacing token for card padding inset | mcp__designerpunk-docs__get_section (token-quick-reference § "Token Documentation Map") | which token family doc covers inset vs layout spacing so I pick the right semantic token
theme-varying color compose CompositionLocal LocalDPTheme | mcp__designerpunk-docs__find_docs | how product apps are supposed to wrap content and read theme-varying colors inside composition scope
how do I name a product token I'm adding during implementation | mcp__designerpunk-docs__get_section (product-token-governance § "Naming Conventions") | the --product-{category}-{name} naming rule before I touch product/tokens/*.yaml
when is a value: product token allowed instead of ref: | mcp__designerpunk-docs__find_docs | the system-first query + perceptual tolerance rule and what the rationale field must say
test file naming and structure for a compose screen test | mcp__designerpunk-docs__get_document_summary (test-development-standards) | required test categories, describe-block structure, and naming so Stacy doesn't bounce it
how to verify a behavioral contract in an android implementation | mcp__designerpunk-docs__get_document_summary (test-behavioral-contract-validation) | what a contract-validation test must assert for e.g. interaction_focusable on Compose
implementation report format tier 2 handoff to leonardo | mcp__designerpunk-docs__find_docs | the Product Handoff Protocol sections an Implementation Report must carry (deviations, decisions made, discoveries)
subtask completion doc minimum contents | mcp__designerpunk-docs__get_section (completion-documentation-guide § "Two-Document Workflow") | the three-element floor for task-N-M-completion.md and when a summary doc is also required
where do android component sources live cross-platform file paths | mcp__designerpunk-docs__get_section | the canonical paths for platforms/android/ component implementations I should reference as patterns
talkback contentDescription vs semantics role for custom compose component | mcp__designerpunk-docs__find_docs | DesignerPunk's accessibility expectation for Compose semantics (what the a11y guidelines require beyond Material defaults)
probably undocumented
compose previews and screenshot tests for product screens where do they go | mcp__designerpunk-docs__find_docs | whether there is any standard for @Preview coverage or screenshot testing on Android product screens
gradle module layout for a consumer android app consuming @3fn/core tokens | mcp__designerpunk-docs__find_docs | how the generated DesignTokens.android.kt / ProductTokens.android.kt are meant to be wired into a real Gradle project (module, package, dependency)
```

## Stacy

**Provenance**: agent `a35e1eff9b0eed132` · 2026-10-13 · tool_uses = 1 (harness telemetry, relayed by the orchestrator) · new agent, no study context

```
what must a parent completion doc contain success criteria rows status evidence forced-negative line | mcp__designerpunk-docs__get_section (completion-documentation-guide § "Parent Success-Criteria Fidelity") | the standard I audit parent docs against before I count omissions or vagueness
delegated-tier line fixed forms plan held divergence grammar | mcp__designerpunk-docs__get_section (completion-documentation-guide § "The delegated-tier line — unconditional") | the exact two forms so I can split missing vs free-prose findings
instruments block header line format exists built here MISSING found later | mcp__designerpunk-docs__get_section (completion-documentation-guide § "The instruments line and block") | the row grammar and counts the instruments read checks on each parent doc
subtask completion doc floor three elements adaptations none | mcp__designerpunk-docs__get_section (completion-documentation-guide § "The subtask completion doc") | what a ticked subtask's doc must minimally carry before I flag a missing one
how are merge units declared in tasks.md canonical heading legacy bold prose | mcp__designerpunk-docs__find_docs (concept) | the recognized declaration forms so the owed-set classification (a)/(b)/(c) is right
behavioral contract validation process cross platform same behavior | mcp__designerpunk-docs__get_section (test-behavioral-contract-validation § "Validation Process") | how to judge whether iOS/Android/Web tests verify identical contract behavior in a parity review
tasks document format task type validation tier success criteria | mcp__designerpunk-docs__get_section (process-spec-planning § "Tasks Document Format") | what a verifiable criteria set looks like for the LENS seat without drafting criterion text
implementation report what fields deviations discoveries blocking flags | mcp__designerpunk-docs__find_docs (concept: product handoff protocol implementation report) | the report shape I compare decomposed per-platform rows against at CLOSEOUT
completion criteria parity emission lines declared-none exemption deferral docs not found | mcp__designerpunk-docs__find_docs (concept) | how to read the checker's emissions I must record in the counting block
test file naming categories evergreen temporary retirement criteria | mcp__designerpunk-docs__get_document_summary (test-development-standards) | the naming/category rules I check platform tests against
release flow step 5a owed set query release record two registries | mcp__designerpunk-docs__find_docs (concept: RELEASE-FLOW) | what the release checklist must paste and what phase 2 reads against the published bytes
orchestrator consult line trigger surfaces PR body none needed | mcp__designerpunk-docs__find_docs (concept: consult-first ballot) | the trigger-surface list and grammar I count on PR bodies in the counting block

probably undocumented
how to verify an iOS or Android test actually ran when I cannot build it locally | mcp__designerpunk-docs__find_docs (concept: platform build verification) | an audit procedure for trust-the-reported-result rows beyond writing "not re-verified — toolchain unavailable"
how big a claims pass sample should be per spec size or risk | mcp__designerpunk-docs__find_docs (concept: claims pass sampling fraction) | a sampling heuristic for the Method section rather than effort-by-signal with no floor
```
