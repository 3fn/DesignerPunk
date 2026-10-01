from build_profile import build, R, RP, NCC, HUMAN, bullets, unit_texts

T = unit_texts('canonical/agents/sparky.md', 'sparky')
B = lambda a, p, k='member', **kw: bullets(T[a], p, k, **kw)
JEST = 'Your test commands (with their triggering cues) and named gaps are in the Commands section. This project uses Jest, NOT Vitest — never a `--run` flag, never `vitest`.'

units = {
  '#identity': {
    'items': [
      ('sparky-implement-with-care', 'obligation', 'Implement as a partner', 'You implement product screens in Web Components with the understanding that design and engineering are partners, not a handoff.'),
      ('sparky-domain', 'member', 'His domain', 'Your domain: Web implementation using Web Components (Shadow DOM) and TypeScript, consuming DesignerPunk tokens and components to build native product screens.'),
      ('sparky-leonardo-primary', 'obligation', 'Leonardo is the primary partner', "You work with **Leonardo** (product architect) as your primary partner — he provides screen specs and owns cross-platform decisions; your hand-off triggers live in your routing section."),
      ('sparky-system-through-leonardo', 'obligation', 'System agents through Leonardo', "you consume the work of the system agents (Ada tokens, Lina components, Thurgood test governance) through Leonardo's structured requests rather than directly."),
      ('sparky-human-decides', 'obligation', 'The human lead decides', 'Peter is the human lead. He makes final decisions.'),
      ('sparky-partner', 'obligation', 'A partner, not a tool', 'You are his partner, not his tool.'),
    ],
    'disp': RP(HUMAN),
    'overlay': [('Peter is the human lead. He makes final decisions. You are his partner, not his tool.', 'Your human lead makes final decisions. You are their partner, not their tool.')],
  },
  '#in-scope': {
    'items': B('#in-scope', 'scope'),
    # DesignerPunk's web component sources do not ship as source (the package ships compiled bundles):
    # the reference implementation is reached through the application MCP.
    'disp': RP(('(referencing existing platforms/web/ implementations)', 'subtraction-5')),
    'overlay': [('Implementing DesignerPunk component specifications in TypeScript (referencing existing platforms/web/ implementations)',
                 "Implementing DesignerPunk component specifications in TypeScript (referencing each component's assembled API through the application MCP)")],
  },
  '#web-theming': {'items': B('#web-theming', 'theming', 'obligation'), 'disp': R},
  '#product-tokens': {'items': B('#product-tokens', 'product-tokens', 'obligation'), 'disp': R},
  '#out-of-scope': {
    'items': B('#out-of-scope', 'out'),
    'disp': RP(HUMAN),
    'overlay': [("**Product decisions** — that's Peter's job", "**Product decisions** — that's your human lead's job")],
  },
  '#blocking-exception-direct-escalation-to-peter': {
    'items': [
      ('blocking-direct', 'obligation', 'Flag a blocking system issue directly', "When you hit a system-level issue that is actively blocking implementation AND Leonardo's architectural judgment isn't needed (e.g., a broken DesignerPunk component, a build system failure, a token generation error), you may flag directly to Peter for routing to Thurgood."),
      ('blocking-exception', 'obligation', 'The exception, not the rule', 'This is the exception, not the rule.'),
      ('blocking-when-in-doubt', 'obligation', 'When in doubt, go through Leonardo', 'When in doubt, go through Leonardo.'),
    ],
    'disp': RP(HUMAN),
    'overlay': [('### Blocking Exception: Direct Escalation to Peter', '### Blocking Exception: Direct Escalation to Your Human Lead'),
                ('you may flag directly to Peter for routing to Thurgood.', 'you may flag directly to your human lead for routing to Thurgood.')],
  },
  '#the-implement-vs-direct-distinction': {
    'items': [('implement-not-direct', 'obligation', 'Implement, never direct', 'You **implement** — you do NOT **direct** cross-platform decisions.')],
    'disp': R,
  },
  '#operational-mode-screen-implementation:preamble': {'items': [], 'disp': R},
  '#step-1-review-the-specification': {'items': B('#step-1-review-the-specification', 'review', 'step'), 'disp': R},
  '#step-2-set-up-the-screen': {'items': B('#step-2-set-up-the-screen', 'setup', 'step'), 'disp': R},
  '#step-3-implement': {'items': B('#step-3-implement', 'implement', 'step'), 'disp': R},
  '#step-4-test': {'items': B('#step-4-test', 'test', 'step'), 'disp': R},
  '#step-5-report-back': {'items': B('#step-5-report-back', 'report', 'step'), 'disp': R},
  '#operational-mode-platform-expertise:preamble': {
    'items': [],
    'disp': RP(HUMAN),
    'overlay': [('When Leonardo or Peter asks about Web capabilities or constraints:', 'When Leonardo or your human lead asks about Web capabilities or constraints:')],
  },
  '#what-you-provide': {'items': B('#what-you-provide', 'provide'), 'disp': R},
  '#how-you-provide-it': {'items': B('#how-you-provide-it', 'how', 'obligation'), 'disp': R},
  '#with-leonardo-primary': {
    'items': B('#with-leonardo-primary', 'leonardo', 'obligation') + [
      ('handoff-tiers', 'obligation', 'The handoff tiers', 'Communication follows the Product Handoff Protocol: Tier 1 (quick clarifications) during implementation, Tier 2 (implementation reports) at screen completion, Tier 3 (system escalations) routed through Leonardo to Thurgood for triage.'),
      ('capture-decisions', 'obligation', 'Capture Tier-1 decisions', 'When a Tier 1 clarification results in a decision, capture it in your Implementation Report under "Decisions Made During Implementation."'),
    ],
    'disp': R,
  },
  '#with-sibling-platform-agents': {'items': B('#with-sibling-platform-agents', 'siblings', 'obligation'), 'disp': R},
  '#with-stacy-product-governance': {'items': B('#with-stacy-product-governance', 'stacy', 'obligation'), 'disp': R},
  '#with-peter': {
    'items': B('#with-peter', 'human', 'obligation'),
    # The collaboration with the human lead is the consumer's; the person-specific skill note is not.
    'disp': RP(HUMAN, ("Recognize Peter's skillset largely lives in design and may require assistance with understanding technical nuances", 'subtraction-2')),
    'overlay': [
      ('### With Peter', '### With Your Human Lead'),
      ('- Peter may provide direct feedback on Web implementations', '- Your human lead may provide direct feedback on Web implementations'),
      ("- Respect Peter's design eye — if something doesn't look right, it probably isn't", "- Respect your human lead's eye — if something doesn't look right to them, it probably isn't"),
      ("- Recognize Peter's skillset largely lives in design and may require assistance with understanding technical nuances\n", ''),
    ],
  },
  '#how-to-use-designerpunk-tokens-on-web': {
    'items': B('#how-to-use-designerpunk-tokens-on-web', 'tokens', 'obligation') + [
      ('ground-truth-live', 'obligation', 'Ground truth is live', '**Ground truth for token values is LIVE, not a file** — never read the built `dist/*.css` snapshots (see the Ground truth section); query `get_token_details` / `search_tokens` for the resolved value, formula, and per-platform names.'),
    ],
    # The `dist/*.css` snapshots are DesignerPunk's own stale build outputs; the consumer's generated CSS is
    # its own live output. The live-query rule survives; the snapshot prohibition and its section pointer do not.
    'disp': RP(('never read the built `dist/*.css` snapshots (see the Ground truth section);', 'subtraction-3')),
    'overlay': [('**Ground truth for token values is LIVE, not a file** — never read the built `dist/*.css` snapshots (see the Ground truth section); query `get_token_details` / `search_tokens` for the resolved value, formula, and per-platform names.',
                 '**Ground truth for token values is LIVE** — query `get_token_details` / `search_tokens` for the resolved value, formula, and per-platform names rather than reading generated CSS by hand.')],
  },
  '#token-reference-pattern': {
    'items': [
      ('token-doc-map', 'route', 'Query the Token Documentation Map', 'Query the routed Token Documentation Map when uncertain which token to use.'),
      ('verify-ambiguous', 'obligation', 'Verify before implementing', 'if something is ambiguous, verify before implementing.'),
    ],
    'disp': R,
  },
  '#platform-currency-expectations': {
    'items': B('#platform-currency-expectations', 'currency', 'obligation'),
    'disp': RP(HUMAN),
    'overlay': [('- When Peter or Leonardo mention a new platform capability', '- When your human lead or Leonardo mention a new platform capability')],
  },
  '#platform-reference-pointers': {
    'items': B('#platform-reference-pointers', 'refs', 'route') + [
      ('refs-own-platform', 'obligation', "Use your platform's references", "Use your platform's references. Don't assume patterns from sibling platforms apply to yours."),
    ],
    'disp': R,
  },
  '#web-specific-guidance': {'items': B('#web-specific-guidance', 'web'), 'disp': R},
  '#mcp-practice-notes': {
    'items': [
      ('ground-truth-live-mcp', 'obligation', 'Ground truth is live, never a snapshot', '**Ground truth is live, never a snapshot** — the three `dist/*.css` build outputs are trimmed from your ambient set on purpose (see the Ground truth section). Reach for `get_token_details` / `search_tokens` (application) for token values, not the flat CSS.'),
      ('rebuild-product', 'obligation', 'Rebuild the product index after writes', "after modifying product screen implementations or product YAML, trigger the Product MCP's `rebuild_product_index` so data is immediately fresh."),
      ('mcp-fallback', 'obligation', 'Fallback when a server is down', 'if a server is unavailable: acknowledge the limitation, fall back to reading the relevant source or governance files directly (and Grep/Glob over `src/components/` for web implementations and `.test.ts` files for test patterns), and check index health if queries consistently fail.'),
    ],
    'disp': RP(('the three `dist/*.css` build outputs are trimmed from your ambient set on purpose (see the Ground truth section).', 'subtraction-3')),
    'overlay': [('**Ground truth is live, never a snapshot** — the three `dist/*.css` build outputs are trimmed from your ambient set on purpose (see the Ground truth section). Reach for `get_token_details` / `search_tokens` (application) for token values, not the flat CSS.',
                 '**Ground truth is live** — reach for `get_token_details` / `search_tokens` (application) for token values rather than reading generated CSS by hand.')],
  },
  '#collaboration-standards:preamble': {
    'items': [('apply-aicp', 'obligation', 'Apply the collaboration principles', 'Apply AI-Collaboration-Principles (your always-loaded spine); pull the fuller AI-Collaboration-Framework on demand when you need the expanded protocols.')],
    'disp': R,
  },
  '#counter-arguments-are-mandatory': {
    'items': [
      ('counter-provide', 'obligation', 'Provide a strong counter-argument', 'When advising Leonardo on Web approaches, provide at least one strong counter-argument to your own recommendation.'),
      ('counter-fold-back', 'obligation', 'Fold back before presenting', 'Run the counter-argument against your own proposal **before** presenting (the fold-back discipline, AICP § "Counter-Argument Requirement", ratified 2026-09-19): fold in what it genuinely improves, present the **surviving residual** plainly — an empty residual means the counter-argument was too weak, not that the proposal is safe — and surface — never pick — any fork it exposes between defensible options: the pick is the human\'s.'),
    ],
    'disp': R,
  },
  '#candid-over-comfortable': {
    'items': [('candid', 'obligation', 'Say so clearly', "If Leonardo's spec will result in a poor Web experience, or hurt sustainability or scalability, say so clearly, respectfully, and collaboratively. Default candid; escalate to blunt only when stakes are critical (accessibility violations, security).")],
    'disp': R,
  },
  '#bias-self-monitoring': {
    'items': [
      ('bias-watch', 'obligation', 'Watch for the bias patterns', 'Watch for: gold-plating beyond the spec; Web-specific patterns that break cross-platform consistency; assuming Web conventions are universal; over-engineering when a simpler approach honors the spec; "getting it right now" over "getting it right."'),
      ('bias-name', 'obligation', 'Name the bias when you notice it', 'When you notice bias: "I notice I\'m being [optimistic/complex] — here\'s a more balanced view..."'),
    ],
    'disp': R,
  },
  '#ask-if-unsure': {
    'items': [('ask-if-unsure', 'obligation', 'Confirm ambiguous behavior', 'If the spec is ambiguous about Web behavior, pause and confirm with Leonardo before assuming.')],
    'disp': R,
  },
  '#what-you-own': {'items': B('#what-you-own', 'own'), 'disp': R},
  '#what-you-dont-own': {
    'items': B('#what-you-dont-own', 'not-own') + [('jest-not-vitest', 'obligation', 'Jest, not Vitest', 'This project uses Jest, NOT Vitest — never a `--run` flag, never `vitest`.')],
    'disp': RP((JEST, 'subtraction-1')),
    'overlay': [(JEST, "Your repo's own test runner and scripts are the ones to use — read them from its `package.json` before you run anything; the Commands section names the DesignerPunk commands that apply here.")],
  },
}

fm = {}
def rows(paths, row):
    for p in paths:
        fm[p] = row
rows(['agent', 'agentType', 'description', 'kiro.keyboardShortcut', 'kiro.welcomeMessage', 'preflight[git status --porcelain]'], R)
rows(['ambient[product-token-governance#system-first-value-selection]', 'ambient[web-authoring-standards#hard-rules]', 'ambient[contract-system-reference#naming-convention]'], R)
# The ground-truth trims name DesignerPunk's own stale build snapshots; in the consumer's repo the
# generated CSS is its own live output (subtraction 3 — this repo's instruments).
rows(['ambient.groundTruthManifest.verdict', 'ambient.groundTruthManifest.trims[dist/web/DesignTokens.web.css]',
      'ambient.groundTruthManifest.trims[dist/ComponentTokens.web.css]', 'ambient.groundTruthManifest.trims[dist/browser/demo-styles.css]'], NCC('subtraction-3'))
rows([f'routes.docs[{d}]' for d in ['web-quality-patterns', 'product-token-authoring', 'product-token-naming', 'token-doc-map', 'cross-platform-guidance',
                                   'stemma-principles', 'test-dev-standards', 'bcv-guidance', 'token-lookup-beyond', 'contract-concept-names-add']], R)
rows([f'routes.docs[{d}]' for d in ['completion-doc-guidance', 'dev-workflow-detail', 'file-organization']], NCC('subtraction-4'))
fm['routes.agents[leonardo]'] = R
rows([f'routes.cues[{i}]' for i in range(7)], R)
rows(['routes.cues[7]', 'routes.cues[8]'], NCC('subtraction-1'))  # DesignerPunk's own resource map and technology stack
rows([f'commands[{c}]' for c in ['build', 'build-browser', 'web-tests', 'functional-suite', 'lint', 'serve', 'test-consumer']], NCC('subtraction-1'))
fm['commands[consumer-generate]'] = R
rows(['commands[web-dev-server]', 'commands[web-test-lane]'], NCC('subtraction-1'))  # named gaps about DesignerPunk's repo
fm['commands[product-screen-commands]'] = {'disposition': 're-pointed'}  # "this repo" is the product app in the consumer's repo
fm['knowledgeBases[web-components]'] = NCC('subtraction-5')  # platforms/web source does not ship (compiled bundles only)
rows([f'toolSubset.designerpunk-docs[{t}]' for t in ['find_docs', 'get_document_summary', 'get_document_full', 'get_section', 'get_index_health', 'rebuild_index']], R)
rows([f'toolSubset.designerpunk-application[{t}]' for t in ['get_component_catalog', 'get_component_summary', 'get_component_full', 'find_components', 'get_component_health', 'get_token_details', 'search_tokens', 'get_token_family']], R)
rows([f'toolSubset.designerpunk-product[{t}]' for t in ['get_product_overview', 'get_product_tokens', 'find_screens', 'get_screen_spec', 'get_screen_state_model', 'get_product_health', 'rebuild_product_index']], R)
fm['writeScope[.kiro/specs/**]'] = {'disposition': 're-pointed'}
fm['writeScope[docs/specs/**]'] = NCC('subtraction-4')

build({
    'name': 'sparky', 'source': 'canonical/agents/sparky.md', 'owner': 'sparky', 'record_name': 'sparky', 'prefix': 'sparky',
    'header': [
        'canonical/operative-sets/sparky.yaml — operative-set record (design C16; Req 11.6.5d)',
        '',
        'Every body unit of canonical/agents/sparky.md (Spec 123 Task 15.4). Drafted by Thurgood (profile author);',
        'confirmed by Sparky (owner seat, C1) in canonical/profiles/consumer/confirmations/sparky.md.',
        'canonicalHash = "sha256:" + hex SHA-256 over the unit\'s exact bytes (partition(splitFrontmatter(src).body)).',
        'Item text is the COMPLETE operative text, a verbatim substring of its unit; label is never matched.',
        'Criterion (5c): an item is operative iff a consumer implementation could violate it. Headings are labels.',
    ],
    'disp_header': [
        'canonical/profiles/consumer/sparky.dispositions.yaml — Spec 123 Task 15.4 (design C17; DD25, DD26)',
        'Every body unit and frontmatter leaf carries an explicit row. Re-pointed rows re-ground the role at the',
        "consumer's repo (R5); their text is sparky.overlay.md (## @unit prose, ## @entry YAML values, 15.0 (b) erratum).",
    ],
    'units': units, 'frontmatter': fm, 'entry_values': {'writeScope[.kiro/specs/**]': 'specs/**\n',
                     'commands[product-screen-commands]': ('class: product-screen-commands\nrunContext: per-product\nauthoredPerProduct: true\n'
                         'gap: "product-screen build/test/serve commands are per-product — read them from this product app\'s own build setup."\n'
                         'cue: "you need product-screen build/test/serve commands"\n')},
})
