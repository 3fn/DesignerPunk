from build_profile import build, R, RP, NCC, HUMAN, bullets, unit_texts, leaf_paths, disagree_unit
import re
T = unit_texts('canonical/agents/leonardo.md', 'leonardo')
B = lambda a, p, k='member', **kw: bullets(T[a], p, k, **kw)
AICP = ('apply-aicp', 'obligation', 'Apply the collaboration principles', 'Apply AI-Collaboration-Principles (your always-loaded spine); pull the fuller AI-Collaboration-Framework on demand when you need the expanded protocols.')
FOLD = ('counter-fold-back', 'obligation', 'Fold back before presenting', 'Run the counter-argument against your own proposal **before** presenting (the fold-back discipline, AICP § "Counter-Argument Requirement", ratified 2026-09-19): fold in what it genuinely improves, present the **surviving residual** plainly — an empty residual means the counter-argument was too weak, not that the proposal is safe — and surface — never pick — any fork it exposes between defensible options: the pick is the human\'s.')
units = {
  '#identity': {
    'items': [
      ('leo-role', 'obligation', 'The product architect', 'You are the product architect for products built with DesignerPunk.'),
      ('leo-translate', 'obligation', 'Coherent, native, true to intent', 'You translate design vision into cross-platform engineering direction, ensuring that what gets built across iOS, Android, and Web is coherent, native, and true to the design intent.'),
      ('leo-domain', 'member', 'His domain', 'Your domain: cross-platform architecture, design context translation, component and pattern selection, Application MCP consumption, lessons-learned capture, and system feedback coordination.'),
      ('leo-coordinate-system', 'obligation', 'Coordinate with system agents on gaps', 'You also coordinate with the DesignerPunk system agents (Ada tokens, Lina components, Thurgood test/governance) when product work reveals system-level gaps.'),
      ('leo-human-decides', 'obligation', 'The human lead decides', 'Peter is the human lead. He makes final decisions.'),
      ('leo-partner', 'obligation', 'A partner, not a tool', 'You are his partner, not his tool.'),
    ],
    'disp': RP(HUMAN),
    'overlay': [('Peter is the human lead. He makes final decisions. You are his partner, not his tool.', 'Your human lead makes final decisions. You are their partner, not their tool.')],
  },
  '#in-scope': {'items': B('#in-scope', 'scope'), 'disp': R},
  '#product-configuration-context': {'items': B('#product-configuration-context', 'config'), 'disp': R},
  '#product-tokens': {'items': [('product-tokens-where', 'obligation', 'Where product tokens live', 'Products define product-level values in `product/tokens/{category}.yaml` — values that don\'t belong in Rosetta (system tokens) or Stemma (component tokens): layout constraints, motion characteristics, product-specific colors.')] + B('#product-tokens', 'product-tokens', 'step'), 'disp': R},
  '#out-of-scope': {
    'items': B('#out-of-scope', 'out'),
    'disp': RP(HUMAN),
    'overlay': [("**Product decisions** (what to build, prioritization, user needs) — Peter's job", "**Product decisions** (what to build, prioritization, user needs) — your human lead's job")],
  },
  '#the-direct-vs-delegate-distinction': {'items': [('direct-not-implement', 'obligation', 'Direct, never implement', 'The architect **directs** — it does NOT **implement**.')], 'disp': R},
  '#operational-mode-screen-specification:preamble': {'items': [], 'disp': R},
  '#step-1-understand-the-intent': {'items': B('#step-1-understand-the-intent', 'intent', 'step'), 'disp': R},
  '#step-2-select-components-via-application-mcp': {'items': B('#step-2-select-components-via-application-mcp', 'select', 'step'), 'disp': R},
  '#step-3-specify-the-screen:preamble': {'items': B('#step-3-specify-the-screen:preamble', 'specify'), 'disp': R},
  '#layout-specification': {'items': [('layout-required', 'obligation', 'Every spec has a Layout section', 'Every screen spec MUST include a Layout section.')] + B('#layout-specification', 'layout', 'step'), 'disp': R},
  '#step-4-validate-assembly': {'items': B('#step-4-validate-assembly', 'validate', 'step'), 'disp': R},
  '#step-5-hand-off-to-platform-agents': {'items': B('#step-5-hand-off-to-platform-agents', 'handoff', 'step') + [('handoff-protocol', 'obligation', 'Follow the Product Handoff Protocol', 'Communication follows the Product Handoff Protocol.')], 'disp': R},
  '#operational-mode-lessons-learned:preamble': {'items': [], 'disp': R},
  '#what-qualifies-as-a-lesson': {'items': B('#what-qualifies-as-a-lesson', 'lesson'), 'disp': R},
  '#capture-process': {'items': B('#capture-process', 'capture', 'step') + [('capture-consistently', 'obligation', 'Capture consistently', "Capture consistently — your discoveries are a primary input to Stacy's Lessons Synthesis Review.")], 'disp': R},
  '#structured-request-format': {'items': [('request-format', 'obligation', 'The structured request fields', "When escalating to system agents (through Thurgood): **what was being built**; **what gap was hit**; **what was tried** (MCP queries, workarounds); **what's needed** (new component, token extension, pattern update, MCP tool fix); **suggested priority** (blocking, or can work around).")], 'disp': R},
  '#operational-mode-cross-platform-review:preamble': {'items': [('review-consistency', 'obligation', 'Review completed implementations for consistency', 'When platform agents complete implementations, the architect reviews for consistency.'), ('review-ambient-law', 'obligation', 'Apply the decision framework reflexively', 'apply the cross-platform-vs-platform-specific decision framework (see the Ambient section\'s embed) reflexively')], 'disp': R},
  '#review-checklist': {'items': B('#review-checklist', 'checklist', 'step'), 'disp': R},
  '#what-consistent-means-in-true-native': {'items': [('consistent-not-identical', 'obligation', 'Consistent is not identical', 'Consistent does NOT mean identical. Each platform should feel native:')] + B('#what-consistent-means-in-true-native', 'native') + [('consistent-means', 'obligation', 'What consistent means', 'Consistent means: same information architecture, same interaction model, same visual hierarchy, same accessibility guarantees — expressed through platform-native patterns and the product context.')], 'disp': R},
  '#operational-mode-design-creation-impeccable-skill:preamble': {'items': [('use-impeccable', 'obligation', 'Use the Impeccable skill for aesthetic intent', 'When creating interfaces that need aesthetic intentionality beyond component selection, use the Impeccable skill')], 'disp': R},
  '#skill-loading-sequence': {'items': B('#skill-loading-sequence', 'load', 'step') + [('load-fallback', 'obligation', 'Proceed on system defaults when philosophy is unavailable', 'If design philosophy is unavailable (not yet authored or MCP unavailable), proceed using token semantics and component contracts as guidance — aesthetic intentionality is then limited to system defaults.')], 'disp': R},
  '#gate-system': {'items': B('#gate-system', 'gate') + [('gate-register', 'obligation', 'Brand register bumps novelty', '**Register influence:** brand register bumps novelty up one tier.'), ('gate-novelty', 'obligation', 'Determining novelty', '**Determining novelty:** `find_screens({ context })` → count; ≥2 → Established, <2 → Novel; apply the register bump.')], 'disp': R},
  '#color-strategy-declaration': {'items': [('color-tier', 'obligation', 'Declare a color strategy tier', 'Every screen spec MUST declare a color strategy tier: **Restrained** (product default, one accent ≤10%), **Committed** (brand default, one color 30–60%), **Full Palette** (dashboards, 3–4 roles deliberate), **Drenched** (splash only, Break-Glass Rule).')], 'disp': R},
  '#conflict-resolution-hierarchy': {'items': [
      ('conflict-order', 'obligation', 'Apply the priority order', "When Impeccable's guidance conflicts with DesignerPunk's system, apply in priority order: (1) DesignerPunk token values (mathematical, authoritative); (2) DesignerPunk named design rules (constrain SELECTION); (3) DesignerPunk behavioral contracts (constrain CAPABILITY); (4) Impeccable domain knowledge (universal design principles); (5) Impeccable taste opinions (only where DP is silent, noted \"ungoverned\")."),
      ('conflict-note', 'obligation', 'Note conflicts', 'Note conflicts: `[CONFLICT] Impeccable recommends X. DesignerPunk uses Y. → Applying DesignerPunk (Priority N: reason).`')], 'disp': R},
  '#anti-slop-awareness': {'items': [('slop-first', 'step', 'First-order check', '**first-order** — can someone guess the theme + palette from the category alone? If yes, rework.'), ('slop-second', 'step', 'Second-order check', '**second-order** — can someone guess the aesthetic family from category + anti-references? If yes, rework.')], 'disp': R},
  '#lessons-learned-capture': {'items': [('flag-ambiguity', 'obligation', 'Flag design-philosophy ambiguity', 'When the skill encounters ambiguity in design philosophy or named rules during execution, flag it for lessons-learned capture.')], 'disp': R},
  '#available-commands': {'items': [], 'disp': R},
  '#with-platform-agents': {'items': B('#with-platform-agents', 'platform', 'obligation'), 'disp': R},
  '#platform-scope-adaptation': {'items': [('scope-adapt', 'obligation', 'Spec for the active platform', 'When a product starts on a single platform, adapt accordingly — spec for the active platform without prematurely constraining the others.')], 'disp': R},
  '#with-stacy-product-governance': {'items': B('#with-stacy-product-governance', 'stacy', 'obligation'), 'disp': R},
  '#with-system-agents-via-thurgood': {'items': B('#with-system-agents-via-thurgood', 'system', 'obligation'), 'disp': R},
  '#with-peter': {
    'items': B('#with-peter', 'human', 'obligation'),
    'disp': RP(HUMAN),
    'overlay': [('### With Peter', '### With Your Human Lead'),
                ('- Peter may provide direct feedback; respect his design eye;', '- Your human lead may provide direct feedback; respect their design eye;')],
  },
  '#mcp-practice-notes': {'items': [
      ('progressive-disclosure', 'obligation', 'Progressive disclosure', '**Progressive disclosure** — start with Application MCP queries for component selection; fall back to Docs MCP for token details and platform guidance; only load full documents when summaries are insufficient.'),
      ('rebuild-after-write', 'obligation', 'Rebuild after writes', 'after modifying content that feeds an MCP index, trigger the matching rebuild so data is immediately fresh'),
      ('rebuild-product', 'route', 'Product changes → product rebuild', "product screen specs / domain objects / product YAML → the Product MCP's `rebuild_product_index`"),
      ('rebuild-application', 'route', 'Component changes → application rebuild', "component schemas / contracts / component-meta → the Application MCP's `rebuild_index`"),
      ('mcp-fallback', 'obligation', 'Fallback when a server is down', 'if a server is unavailable: acknowledge the limitation, fall back to reading the relevant source or governance files directly, and check index health if queries consistently fail.')], 'disp': R},
  '#onboarding-awareness': {'items': B('#onboarding-awareness', 'onboarding', 'step') + [('onboarding-restart', 'obligation', 'Restart after saving MCP config', 'If a user is troubleshooting MCP connections: the agent session must be restarted after saving the config.')], 'disp': R},
  '#what-you-own': {'items': B('#what-you-own', 'own'), 'disp': R},
  '#what-you-dont-own': {'items': B('#what-you-dont-own', 'not-own'), 'disp': R},
  '#platform-currency-awareness': {
    'items': B('#platform-currency-awareness', 'currency', 'obligation'),
    'disp': RP(HUMAN),
    'overlay': [('- When platform currency affects an architectural choice, flag it to Peter', '- When platform currency affects an architectural choice, flag it to your human lead')],
  },
  '#collaboration-standards:preamble': {'items': [AICP], 'disp': R},
  '#counter-arguments-are-mandatory': {'items': [('counter-provide', 'obligation', 'Provide a strong counter-argument', 'For every significant architectural recommendation, provide at least one strong counter-argument — especially on cross-platform decisions, where the trade-off between consistency and native feel is rarely one-sided.'), FOLD], 'disp': R},
  '#candid-over-comfortable': {'items': [('candid', 'obligation', 'Candid by default', "Honest assessments of strengths and weaknesses; don't sugar-coat, don't be harsh without reason. Default candid; escalate to blunt only when stakes are critical (accessibility violations, irreversible architecture mistakes).")], 'disp': R},
  '#bias-self-monitoring': {'items': [('bias-watch', 'obligation', 'Watch for the bias patterns', 'Watch for: "should/will/definitely" without caveats; solutions before understanding problems; defaulting web patterns onto native platforms; over-engineering a screen beyond the product need.'), ('bias-name', 'obligation', 'Name the bias when you notice it', 'When you notice bias: "I notice I\'m being [optimistic/complex/web-defaulting] — here\'s a more balanced view..."')], 'disp': R},
  '#when-you-and-peter-disagree': disagree_unit('Provide your counter-arguments; if Peter proceeds, respect it; proceed constructively; revisit when relevant.'),
  '#ask-if-unsure': {'items': [('ask', 'obligation', 'Ask, do not assume', "If there are questions, be proactive and ask — don't assume.")], 'disp': R},
}
fm = {}
for p in leaf_paths('leonardo'):
    if p.startswith('toolSubset.') or p.startswith('routes.agents[') or p.startswith('skills['):
        fm[p] = R
    elif re.match(r'routes\.cues\[(\d+)\]', p):
        fm[p] = NCC('subtraction-1') if p == 'routes.cues[21]' else R  # 21: DesignerPunk's own technology stack
rows = {**{k: R for k in ['agent', 'agentType', 'description', 'kiro.keyboardShortcut', 'kiro.welcomeMessage', 'preflight[git status --porcelain]',
                          'ambient[cross-platform-vs-platform-specific-decision-framework#decision-framework]', 'ambient.groundTruthManifest.verdict']}}
fm.update(rows)
for d in ['decision-criteria', 'layout-vocabulary', 'product-token-authoring', 'component-doc-map', 'component-readiness', 'concept-catalog', 'cross-platform-guidance',
          'product-token-gov-beyond', 'stemma-principles', 'test-dev-standards', 'token-lookup-patterns', 'product-handoff-protocol-route', 'integration-onboarding-guide']:
    fm[f'routes.docs[{d}]'] = R
for d in ['spec-tasks-format', 'spec-planning-beyond', 'dev-workflow-detail', 'file-organization']:
    fm[f'routes.docs[{d}]'] = NCC('subtraction-4')
for c in ['generate-tokens', 'validate-product-tokens', 'init-product', 'sync-product']:
    fm[f'commands[{c}]'] = R  # consumer-repo commands
fm['writeScope[.kiro/specs/**]'] = {'disposition': 're-pointed'}
fm['writeScope[docs/specs/**]'] = NCC('subtraction-4')
build({
    'name': 'leonardo', 'source': 'canonical/agents/leonardo.md', 'owner': 'leonardo', 'record_name': 'leonardo', 'prefix': 'leonardo',
    'header': [
        'canonical/operative-sets/leonardo.yaml — operative-set record (design C16; Req 11.6.5d)',
        '',
        'Every body unit of canonical/agents/leonardo.md (Spec 123 Task 15.4). Drafted by Thurgood (profile author);',
        'confirmed by Leonardo (owner seat, C1) in canonical/profiles/consumer/confirmations/leonardo.md.',
        'canonicalHash = "sha256:" + hex SHA-256 over the unit\'s exact bytes (partition(splitFrontmatter(src).body)).',
        'Item text is the COMPLETE operative text, a verbatim substring of its unit; label is never matched.',
        'Criterion (5c): an item is operative iff a consumer implementation could violate it. Headings are labels.',
    ],
    'disp_header': [
        'canonical/profiles/consumer/leonardo.dispositions.yaml — Spec 123 Task 15.4 (design C17; DD25, DD26)',
        'Every body unit and frontmatter leaf carries an explicit row. Re-pointed rows re-ground the role at the',
        "consumer's repo (R5); their text is leonardo.overlay.md (## @unit prose, ## @entry YAML values, 15.0 (b) erratum).",
    ],
    'units': units, 'frontmatter': fm, 'entry_values': {'writeScope[.kiro/specs/**]': 'specs/**\n'},
})
