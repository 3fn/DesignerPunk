# Discovery Study Stage 1 — seat queries, RAW (verbatim record)

**Date**: 2026-10-12
**Charter**: `.kiro/issues/2026-10-12-discovery-study-stage1-docs-charter.md` (§ 1b–1c, § 4); design record `.kiro/issues/2026-10-07-discovery-shadow-study-charter.md` § 3.
**Owner**: Thurgood (sealed prompt; capture). Seats are blind authors and hold no grant.
**What this file is**: the seats' answers to the sealed prompt below, recorded **before any key is written**. It lands in commit (1) of the Stage 1 PR branch; keys and the Q2 fixture (`scripts/__fixtures__/discovery-q2-seats.ts`) come in the later pre-registration commit (2).

**Rules for this file**
- Each seat's answer is pasted **UNEDITED**: no reformatting, no spelling fixes, no removals. Thurgood's notes go in the Q2 fixture and the findings doc, never here.
- The orchestrator sends each seat the sealed prompt **word for word** in a read-only consult with no tool calls, and gives no other context about the study.
- Components- or token-shaped queries in an answer stay here as **held raw input** for the suspended components round. They are not scored in Stage 1 and are never copied into a Q3 fixture as they are.
- Point-in-time record, not a navigational doc.

---

## The sealed prompt (verbatim — the exact text every seat receives)

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

**Provenance**: agent `afd20efb283e599c8` · 2026-10-12 · tool_uses = 1 (harness telemetry, relayed by the orchestrator)

```
web css quality patterns shadow dom host styling | mcp__designerpunk-docs__find_docs | the Quality Patterns section of web-authoring-standards beyond the Hard Rules, for screen CSS structure
how do I author a new product token I discovered during screen implementation | mcp__designerpunk-docs__get_section (web-authoring-standards, "Product Token Authoring (Sparky)") | the YAML authoring steps and the ref-vs-value decision when Leonardo's spec didn't anticipate a value
product token naming convention --product-{category}-{token-name} | mcp__designerpunk-docs__get_section (product-token-governance, "Naming Conventions") | the exact category/name grammar before I add a token to product/tokens/*.yaml
which token doc covers z-index layering and elevation | mcp__designerpunk-docs__get_section (token-quick-reference, "Token Documentation Map") | which family doc to read when a spec references a layering value I can't place
screen test structure categories naming jest web component | mcp__designerpunk-docs__find_docs then get_document_summary (test-development-standards) | the required test file layout, category tags, and describe/it naming for a product screen test
behavioral contract validation web implementation how to test interaction_focusable | mcp__designerpunk-docs__get_document_summary (test-behavioral-contract-validation) | how to prove a contract like interaction_focusable or state_disabled is honored in a Shadow DOM screen
implementation report format product handoff protocol tier 2 | mcp__designerpunk-docs__find_docs | the Implementation Report template I owe Leonardo at screen completion (deviations, discoveries, decisions made)
subtask completion doc floor three light elements | mcp__designerpunk-docs__get_section (completion-documentation-guide, "The subtask completion doc") | what the minimal task-N-M-completion.md must contain before I tick the subtask
where do product screen files live file organization product consumer | mcp__designerpunk-docs__get_document_summary (process-file-organization) | the directory and naming rules for a screen implementation and its tests in a scratch consumer born via init
Container-Card-Base web props slots tokens contracts | mcp__designerpunk-application__get_component_full | the assembled API and token hooks before I compose a spec'd component into a screen
Settings screen spec | mcp__designerpunk-product__get_screen_spec | Leonardo's component tree, state model, and web notes for the screen I'm implementing
tap area recommended resolved value web name | mcp__designerpunk-application__get_token_details | the live CSS custom property name and value instead of reading dist CSS

probably undocumented
web component screen navigation routing pattern between product screens | mcp__designerpunk-docs__find_docs | a sanctioned router/history/URL pattern for Shadow DOM product screens — I suspect only component-level guidance exists, nothing screen-to-screen
product screen build test serve commands scratch consumer init | mcp__designerpunk-docs__find_docs | the per-product build/test/serve commands for a consumer born via `designerpunk init` — my Commands section says these are authored per product and can't be extracted here
```

## Kenya

**Provenance**: agent `a573665cb2992843b` · 2026-10-12 · tool_uses = 1 (harness telemetry, relayed by the orchestrator)

```
swiftui token consumption pattern environment theme | mcp__designerpunk-docs__find_docs | how to read theme-varying colors via @Environment vs static DesignTokens in a product screen
iOS implementation patterns accessibility voiceover | mcp__designerpunk-docs__get_section | the iOS render-target section in platform-implementation-guidelines for SwiftUI accessibility modifier conventions
which token for touch target size | mcp__designerpunk-docs__get_section | token-quick-reference Token Documentation Map to find the tap-area semantic token and its family doc
product token naming category token-name | mcp__designerpunk-docs__get_section | product-token-governance Naming Conventions before authoring a new product token in product/tokens/*.yaml
test file structure naming categories screen tests | mcp__designerpunk-docs__find_docs | test-development-standards structure/naming rules so my Swift screen tests follow the convention
behavioral contract validation ios implementation | mcp__designerpunk-docs__find_docs | test-behavioral-contract-validation guidance on proving a contract like interaction_focusable is honored on iOS
implementation report format tier 2 handoff leonardo | mcp__designerpunk-docs__find_docs | the Product Handoff Protocol template for the report I send Leonardo at screen completion
subtask completion doc floor what must it contain | mcp__designerpunk-docs__get_section | completion-documentation-guide subtask completion doc section so my task-N-M-completion.md passes the claims pass
where do product screen files live ios | mcp__designerpunk-docs__find_docs | process-file-organization rules for where SwiftUI screen source and tests go in a consumer repo
consumer generate ios theming output npx designerpunk | mcp__designerpunk-docs__find_docs | how the consumer-side generate materializes the {Name}Theme protocol and ProductTokens.ios.swift
contract concept names focusable error state | mcp__designerpunk-docs__get_document_summary | contract-system-reference outline so I cite the canonical contract names in tests
probably undocumented
xcodebuild simulator ui test runbook product app | mcp__designerpunk-docs__find_docs | a how-to for running iOS build/UI tests from the consumer app's ios/ dir with DesignerPunk tokens wired in
swiftui navigationstack pattern designerpunk navigation component spec | mcp__designerpunk-docs__find_docs | guidance on mapping Leonardo's navigation specs onto NavigationStack/TabView idioms without breaking cross-platform parity
```

## Data

**Provenance**: agent `af2d624318ef03b32` · 2026-10-12 · tool_uses = 1 (harness telemetry, relayed by the orchestrator)

```
android compose token consumption pattern no .dp suffix | mcp__designerpunk-docs__find_docs | the rule for passing DesignTokens floats into Compose modifiers without triggering the token-compliance regex
theme-varying color token read inside composable LocalDPTheme.current | mcp__designerpunk-docs__find_docs | how to consume Spec 094 theme-varying colors in a composable and pick the theme instance for dark mode
product token ref vs value when to author new product token | mcp__designerpunk-docs__get_section | the system-first selection rule and perceptual tolerance table before I author a product/tokens yaml entry
product token naming convention category token-name | mcp__designerpunk-docs__get_section | the --product-{category}-{token-name} naming rule for a token I discover mid-implementation
screen test structure naming categories android | mcp__designerpunk-docs__find_docs | test-development-standards for how a product screen Test.kt should be organized and named
how to verify a behavioral contract in an android implementation | mcp__designerpunk-docs__find_docs | the contract-validation guidance so my tests prove the contract, not just the pixels
implementation report format to leonardo tier 2 | mcp__designerpunk-docs__find_docs | the Product Handoff Protocol template for deviations, discoveries, decisions-made sections
which token family doc covers focus ring width and offset | mcp__designerpunk-docs__get_section | token-quick-reference Token Documentation Map to route an accessibility focus token question
subtask completion doc three elements what changed tests adaptations | mcp__designerpunk-docs__get_section | completion-documentation-guide floor for a subtask doc before I tick the box
where do product screen android files live file organization | mcp__designerpunk-docs__find_docs | process-file-organization rule for where Compose screens and their tests go in a consumer repo
talkback semantics contentDescription role heading pattern designerpunk | mcp__designerpunk-docs__find_docs | the Android accessibility section of platform-implementation-guidelines beyond the focus example
component readiness before implementing against it android | mcp__designerpunk-application__get_component_health | whether the component Leonardo specced has an Android implementation I can safely consume

probably undocumented
gradle dependency coordinates for designerpunk android tokens and components in a consumer app | mcp__designerpunk-docs__find_docs | how a product repo actually pulls the generated Kotlin into its build (artifact, module, or copied source)
compose preview and screenshot test conventions for product screens | mcp__designerpunk-docs__find_docs | whether @Preview composables or screenshot tests are expected, required, or forbidden for screen work
```

## Stacy

**Provenance**: agent `ab2405985ab2112d3` · 2026-10-12 · tool_uses = 1 (harness telemetry, relayed by the orchestrator)

```
what must a parent completion doc contain success criteria table status evidence | mcp__designerpunk-docs__get_section (completion-documentation-guide, "Parent Success-Criteria Fidelity") | the standard I audit parent docs against — verbatim row reproduction, Status + Evidence, forced-negative line
delegated-tier line fixed forms plan held divergence grammar | mcp__designerpunk-docs__get_section (completion-documentation-guide, "The delegated-tier line — unconditional") | the exact two allowed forms so I can split missing vs free-prose findings correctly
instruments block header line format exists built here MISSING found later | mcp__designerpunk-docs__get_section (completion-documentation-guide, "The instruments line and block") | the grammar for the Instruments header and block rows so my instruments read counts unlisted vs misfit against the right shape
subtask completion doc minimum three elements adaptations none | mcp__designerpunk-docs__get_section (completion-documentation-guide, "The subtask completion doc") | the S-4 floor for a subtask doc so a ticked subtask with a thin doc is judged against the real floor, not my memory of it
tasks.md declared merge units heading format | mcp__designerpunk-docs__find_docs concept:"declared merge units tasks format" then get_section (process-spec-planning, "Tasks Document Format") | how units are declared so the owed-set classifier (a/b/c) and the CLOSEOUT/MIDPOINT anchors key on the right heading
release flow step 5a owed set query claims pass before tag | Bash grep over .kiro/hooks/RELEASE-FLOW.md (step 5a / step 6) | the release checklist text the RELEASE pass is paired with — what the checklist must paste and the phase-2 record fields
completion-criteria-parity emission lines declared-none waiver exemption deferral docs not found | mcp__designerpunk-docs__find_docs concept:"completion-criteria-parity emissions" | what each emission line means so my emission-reading duty interprets waivers/exemptions correctly instead of guessing
behavioral contract validation cross-platform identical behavior process | mcp__designerpunk-docs__get_section (test-behavioral-contract-validation, "Validation Process") | the procedure for judging whether iOS/Android/Web tests verify the same contract during a parity review
CI provenance where a green was measured unit branch vs merge ref | mcp__designerpunk-docs__get_section (completion-documentation-guide, "CI provenance — where a green was measured") | the rule a completion doc must follow when declaring where its test runs happened, so I can spot a branch-head green claimed as a gate green
112 taxonomy finding classes for claims discrepancies | mcp__designerpunk-docs__find_docs concept:"claims taxonomy promised claimed shipped" then Grep .kiro/specs/112*/ | the classification names I must use in a claims-pass Findings section
lessons synthesis review template timing triggers | mcp__designerpunk-docs__get_section (product-handoff-protocol, "Lessons Synthesis Review") | the output template and when the synthesis review is owed after a feature completes
how to read a PR body for the Consulted line without credentials | Bash gh pr view <n> --json body (credentials via .env GITHUB_TOKEN export) | the mechanics for the orchestrator-consult-line count in the counting block

probably undocumented
how big a sample fraction is enough for a claims pass on a 20-parent spec | mcp__designerpunk-docs__find_docs concept:"claims pass sample fraction guidance" | any rule of thumb for sampling effort — I believe the law says "no floor, effort by signal" and nothing more
how to verify an iOS or Android build claim when no toolchain exists in this environment | mcp__designerpunk-docs__find_docs concept:"platform build verification without toolchain" | a procedure beyond writing "not re-verified — toolchain unavailable"; the harness is only a chartered issue, not a how-to
```

## Leonardo

_(filled only AFTER his Settings-screen ledger closes — `2026-10-12-leonardo-settings-screen-call-ledger-charter.md`; charter § 4. Same sealed prompt; he may write ~15–20 queries instead of ~10, and the orchestrator says so in one added line, recorded here when it is sent.)_
