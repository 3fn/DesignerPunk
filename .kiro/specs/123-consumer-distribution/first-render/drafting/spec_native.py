"""Data (Android) and Kenya (iOS): the two native platform charters share one structure."""
import re, sys
from build_profile import build, R, RP, NCC, HUMAN, bullets, unit_texts, leaf_paths

AGENT = sys.argv[1]
P = {'data': dict(plat='Android', dir='android', kb='android-components', kbt='android-tests', ext='kt', lang='Kotlin'),
     'kenya': dict(plat='iOS', dir='ios', kb='ios-components', kbt='ios-tests', ext='ios.swift', lang='Swift')}[AGENT]
SRC = f'canonical/agents/{AGENT}.md'
T = unit_texts(SRC, AGENT)
B = lambda a, p, k='member', **kw: bullets(T[a], p, k, **kw)
PKG = f"node_modules/@3fn/core/src/components/core/*/platforms/{P['dir']}/"

def find(anchor, pattern):
    m = re.search(pattern, T[anchor], re.S)
    assert m, f'{anchor}: {pattern}'
    return m.group(0)

def sentence(anchor, start):
    """The sentence of `anchor` beginning with `start` (through its closing period, `?` or `:`)."""
    i = T[anchor].index(start)
    m = re.search(r'[.?:](\*\*)?(?=\s|$)', T[anchor][i + len(start) - 1:])
    return T[anchor][i: i + len(start) - 1 + m.end()].strip()

GT = r'\*\*Ground truth for (?:these )?token values is LIVE, not a file\*\* — never read the built `dist/[^`]+` snapshots \(see the Ground truth section\); query'
GT_NEW = lambda old: re.sub(r', not a file\*\* — never read the built `dist/[^`]+` snapshots \(see the Ground truth section\); query', '** — query', old)
theming = next(a for a in T if a.endswith('-theming-spec-094'))
tokens_how = next(a for a in T if a.startswith('#how-to-use-designerpunk-tokens-on-'))
specific = next(a for a in T if re.match(r'#(android|ios)-specific-guidance', a))
jest = T['#what-you-dont-own'][T['#what-you-dont-own'].index('Your '):].strip()  # the closing paragraph (Kenya's names the in-repo iOS gap)
fold = 'Run the counter-argument against your own proposal **before** presenting (the fold-back discipline, AICP § "Counter-Argument Requirement", ratified 2026-09-19): fold in what it genuinely improves, present the **surviving residual** plainly — an empty residual means the counter-argument was too weak, not that the proposal is safe — and surface — never pick — any fork it exposes between defensible options: the pick is the human\'s.'
SNAP = ('the stale `dist/*` build snapshots and the Ground truth section that trims them', 'subtraction-3')

units = {
  '#identity': {
    'items': [
      ('role', 'obligation', 'The platform engineer', sentence('#identity', 'You are the ' + P['plat'] + ' platform engineer')),
      ('domain', 'member', 'The domain', sentence('#identity', 'Your domain:')),
      ('leonardo-primary', 'obligation', 'Leonardo is the primary partner', sentence('#identity', 'You work with **Leonardo**')),
      ('system-through-leonardo', 'obligation', 'System agents through Leonardo', find('#identity', r"you consume the work of the system agents .*? rather than directly\.")),
      ('human-decides', 'obligation', 'The human lead decides', 'Peter is the human lead. He makes final decisions.'),
      ('partner', 'obligation', 'A partner, not a tool', 'You are his partner, not his tool.'),
    ],
    'disp': RP(HUMAN),
    'overlay': [('Peter is the human lead. He makes final decisions. You are his partner, not his tool.', 'Your human lead makes final decisions. You are their partner, not their tool.')],
  },
  '#in-scope': {
    'items': B('#in-scope', 'scope'),
    'disp': RP((f"(referencing existing platforms/{P['dir']}/ implementations)", 'subtraction-5')),
    'overlay': [(f"(referencing existing platforms/{P['dir']}/ implementations)", f"(referencing the {P['plat']} implementations that ship in the installed package, `{PKG}`)")],
  },
  theming: {
    'items': B(theming, 'theming', 'obligation'),
    'disp': RP((find(theming, GT), 'subtraction-3')),
    'overlay': [(find(theming, GT), '**Ground truth for these token values is LIVE** — query')],
  },
  '#product-tokens-spec-108109': {'items': B('#product-tokens-spec-108109', 'product-tokens', 'obligation'), 'disp': R},
  '#out-of-scope': {
    'items': B('#out-of-scope', 'out'),
    'disp': RP(HUMAN),
    'overlay': [("**Product decisions** — that's Peter's job", "**Product decisions** — that's your human lead's job")],
  },
  '#blocking-exception-direct-escalation-to-peter': {
    'items': [
      ('blocking-direct', 'obligation', 'Flag a blocking system issue directly', sentence('#blocking-exception-direct-escalation-to-peter', 'When you hit a system-level issue')),
      ('blocking-exception', 'obligation', 'The exception, not the rule', 'This is the exception, not the rule.'),
      ('blocking-when-in-doubt', 'obligation', 'When in doubt, go through Leonardo', 'When in doubt, go through Leonardo.'),
    ],
    'disp': RP(HUMAN),
    'overlay': [('### Blocking Exception: Direct Escalation to Peter', '### Blocking Exception: Direct Escalation to Your Human Lead'),
                ('you may flag directly to Peter for routing to Thurgood.', 'you may flag directly to your human lead for routing to Thurgood.')],
  },
  '#the-implement-vs-direct-distinction': {'items': [('implement-not-direct', 'obligation', 'Implement, never direct', 'You **implement** — you do NOT **direct** cross-platform decisions.')], 'disp': R},
  '#operational-mode-screen-implementation:preamble': {'items': [], 'disp': R},
  '#step-1-review-the-specification': {'items': B('#step-1-review-the-specification', 'review', 'step'), 'disp': R},
  '#step-2-set-up-the-screen': {
    'items': B('#step-2-set-up-the-screen', 'setup', 'step'),
    'disp': RP((find('#step-2-set-up-the-screen', r'\(never read the stale `dist/[^`]+` snapshots — see the Ground truth section\)'), 'subtraction-3')),
    'overlay': [(find('#step-2-set-up-the-screen', r' \(never read the stale `dist/[^`]+` snapshots — see the Ground truth section\)'), '')],
  },
  '#step-3-implement': {'items': B('#step-3-implement', 'implement', 'step'), 'disp': R},
  '#step-4-test': {'items': B('#step-4-test', 'test', 'step'), 'disp': R},
  '#step-5-report-back': {'items': B('#step-5-report-back', 'report', 'step'), 'disp': R},
  '#operational-mode-platform-expertise:preamble': {
    'items': [],
    'disp': RP(HUMAN),
    'overlay': [('When Leonardo or Peter asks', 'When Leonardo or your human lead asks')],
  },
  '#what-you-provide': {'items': B('#what-you-provide', 'provide'), 'disp': R},
  '#how-you-provide-it': {'items': B('#how-you-provide-it', 'how', 'obligation'), 'disp': R},
  '#with-leonardo-primary': {
    'items': B('#with-leonardo-primary', 'leonardo', 'obligation') + [
      ('handoff-tiers', 'obligation', 'The handoff tiers', sentence('#with-leonardo-primary', 'Communication follows the Product Handoff Protocol:')),
      ('capture-decisions', 'obligation', 'Capture Tier-1 decisions', 'When a Tier 1 clarification results in a decision, capture it in your Implementation Report under "Decisions Made During Implementation."'),
    ],
    'disp': R,
  },
  '#with-sibling-platform-agents': {'items': B('#with-sibling-platform-agents', 'siblings', 'obligation'), 'disp': R},
  '#with-stacy-product-governance': {'items': B('#with-stacy-product-governance', 'stacy', 'obligation'), 'disp': R},
  '#with-peter': {
    'items': B('#with-peter', 'human', 'obligation'),
    'disp': RP(HUMAN, ("Recognize Peter's skillset largely lives in design and may require assistance with understanding technical nuances", 'subtraction-2')),
    'overlay': [
      ('### With Peter', '### With Your Human Lead'),
      (f"- Peter may provide direct feedback on {P['plat']} implementations", f"- Your human lead may provide direct feedback on {P['plat']} implementations"),
      ("- Respect Peter's design eye — if something doesn't look right, it probably isn't", "- Respect your human lead's eye — if something doesn't look right to them, it probably isn't"),
      ("- Recognize Peter's skillset largely lives in design and may require assistance with understanding technical nuances\n", ''),
    ],
  },
  tokens_how: {
    'items': B(tokens_how, 'tokens', 'obligation') + [('ground-truth-live', 'obligation', 'Ground truth is live', sentence(tokens_how, '**Ground truth for token values is LIVE'))],
    'disp': RP((find(tokens_how, GT), 'subtraction-3')),
    'overlay': [(find(tokens_how, GT), '**Ground truth for token values is LIVE** — query')],
  },
  '#token-reference-pattern': {
    'items': [
      ('token-doc-map', 'route', 'Query the Token Documentation Map', sentence('#token-reference-pattern', 'Query the routed Token Documentation Map')),
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
    'items': B('#platform-reference-pointers', 'refs', 'route') + [('refs-own-platform', 'obligation', "Use your platform's references", "Use your platform's references. Don't assume patterns from sibling platforms apply to yours.")],
    'disp': R,
  },
  specific: {
    'items': B(specific, 'native'),
    'disp': RP((find(specific, r'never the stale `dist/[^`]+` snapshots'), 'subtraction-3')),
    'overlay': [(find(specific, r'\(values queried live via the application MCP, never the stale `dist/[^`]+` snapshots\)'), '(values queried live via the application MCP)')],
  },
  '#mcp-practice-notes': {
    'items': [
      ('ground-truth-live-mcp', 'obligation', 'Ground truth is live, never a snapshot', find('#mcp-practice-notes', r'\*\*Ground truth is live, never a snapshot\*\*.*?(?=\n)')),
      ('rebuild-product', 'obligation', 'Rebuild the product index after writes', "after modifying product screen implementations or product YAML, trigger the Product MCP's `rebuild_product_index` so data is immediately fresh."),
      ('mcp-fallback', 'obligation', 'Fallback when a server is down', find('#mcp-practice-notes', r'if a server is unavailable: .*?consistently fail\.')),
    ],
    'disp': RP((find('#mcp-practice-notes', r'\*\*Ground truth is live, never a snapshot\*\* — .*?\. Reach for'), 'subtraction-3'), (find('#mcp-practice-notes', r"and `\*Tests?\.(?:kt|swift)` files"), 'subtraction-5')),
    'overlay': [
      (find('#mcp-practice-notes', r'\*\*Ground truth is live, never a snapshot\*\* — .*?\. Reach for'), '**Ground truth is live** — reach for'),
      (find('#mcp-practice-notes', r"over the (?:Android|iOS) component sources and `\*Tests?\.(?:kt|swift)` files per your knowledge-base fallback"),
       f"over the {P['plat']} component sources in the installed package, `{PKG}`, per your knowledge-base fallback"),
    ],
  },
  '#collaboration-standards:preamble': {'items': [('apply-aicp', 'obligation', 'Apply the collaboration principles', 'Apply AI-Collaboration-Principles (your always-loaded spine); pull the fuller AI-Collaboration-Framework on demand when you need the expanded protocols.')], 'disp': R},
  '#counter-arguments-are-mandatory': {'items': [('counter-provide', 'obligation', 'Provide a strong counter-argument', sentence('#counter-arguments-are-mandatory', 'When advising Leonardo on')), ('counter-fold-back', 'obligation', 'Fold back before presenting', fold)], 'disp': R},
  '#candid-over-comfortable': {'items': [('candid', 'obligation', 'Say so clearly', find('#candid-over-comfortable', r"If Leonardo's spec will result.*?security\)\."))], 'disp': R},
  '#bias-self-monitoring': {'items': [('bias-watch', 'obligation', 'Watch for the bias patterns', find('#bias-self-monitoring', r'Watch for: .*?"getting it right\."')), ('bias-name', 'obligation', 'Name the bias when you notice it', 'When you notice bias: "I notice I\'m being [optimistic/complex] — here\'s a more balanced view..."')], 'disp': R},
  '#ask-if-unsure': {'items': [('ask-if-unsure', 'obligation', 'Confirm ambiguous behavior', sentence('#ask-if-unsure', 'If the spec is ambiguous'))], 'disp': R},
  '#what-you-own': {'items': B('#what-you-own', 'own'), 'disp': R},
  '#what-you-dont-own': {
    'items': B('#what-you-dont-own', 'not-own') + [('jest-not-vitest', 'obligation', 'Jest, not Vitest', 'This project uses Jest, NOT Vitest — never a `--run` flag, never `vitest`.')],
    'disp': RP((jest, 'subtraction-1')),
    'overlay': [(jest, "Your repo's own build and test tooling is the one to use — read it from the app's build setup before you run anything; the Commands section names the DesignerPunk commands that apply here.")],
  },
}
if AGENT == 'data':
    units['#android-skills-official-google-patterns'] = {
        'items': B('#android-skills-official-google-patterns', 'skills') + [
            ('skills-use-for', 'obligation', 'What Android Skills are for', sentence('#android-skills-official-google-patterns', 'Use Android Skills for:')),
            ('skills-use-dp-for', 'obligation', 'What DesignerPunk is for', sentence('#android-skills-official-google-patterns', 'Use DesignerPunk for:')),
        ],
        'disp': R,
    }

fm = {}
for p in leaf_paths(AGENT):
    if p.startswith('toolSubset.') or p.startswith('routes.agents[') or p.startswith('skills[') or p.startswith('ambient[') or \
       p in ('agent', 'agentType', 'description', 'kiro.keyboardShortcut', 'kiro.welcomeMessage', 'preflight[git status --porcelain]'):
        fm[p] = R
    elif p.startswith('ambient.groundTruthManifest') or p.startswith('ambient.standingFacts'):
        fm[p] = NCC('subtraction-3') if 'groundTruth' in p else NCC('subtraction-1')  # DesignerPunk's own snapshots / repo facts
    elif re.match(r'routes\.cues\[(\d+)\]', p):
        fm[p] = NCC('subtraction-1') if p in ('routes.cues[8]', 'routes.cues[9]') else R  # DesignerPunk's resource map / tech stack
    elif p.startswith('routes.docs['):
        fm[p] = NCC('subtraction-4') if any(k in p for k in ('completion-doc-guidance', 'dev-workflow-detail', 'file-organization')) else R
    elif p.startswith('commands['):
        fm[p] = R  # set below for the ones that change
    elif p.startswith('writeScope['):
        fm[p] = {'disposition': 're-pointed'} if p == 'writeScope[.kiro/specs/**]' else NCC('subtraction-4')
    elif p == f"knowledgeBases[{P['kb']}]":
        fm[p] = {'disposition': 're-pointed'}
    elif p == f"knowledgeBases[{P['kbt']}]":
        fm[p] = NCC('subtraction-5')  # test sources do not ship in the package
    else:
        raise SystemExit(f'unclassified leaf {p}')
entry_values = {'writeScope[.kiro/specs/**]': 'specs/**\n', f"knowledgeBases[{P['kb']}]": f"name: {P['kb']}\nglobs:\n  - \"{PKG}**\"\n"}
for p in leaf_paths(AGENT):
    if p.startswith('commands[') and p not in (f'commands[{P["dir"]}-build-test]', 'commands[product-screen-commands]'):
        fm[p] = NCC('subtraction-1')  # DesignerPunk's own npm scripts
fm[f'commands[{P["dir"]}-build-test]'] = {'disposition': 're-pointed'}
fm['commands[product-screen-commands]'] = {'disposition': 're-pointed'}
if AGENT == 'data':
    entry_values['commands[android-build-test]'] = ('class: android-build-test\nrunContext: consumer-repo\n'
        'gap: "Android build & instrumentation run from this product app\'s android/ dir: `./gradlew assembleDebug` | `./gradlew test` | `./gradlew connectedAndroidTest` | `./gradlew connectedDebugAndroidTest`"\n'
        'cue: "you reach for an Android build, unit-test, or instrumentation (connected) run"\n')
    entry_values['commands[product-screen-commands]'] = ('class: product-screen-commands\nrunContext: per-product\nauthoredPerProduct: true\n'
        'gap: "product-screen build/test/run commands are per-product — read them from this Android app\'s own build setup."\n'
        'cue: "you need product-screen build/test/run commands"\n')
else:
    entry_values['commands[ios-build-test]'] = ('class: ios-build-test\nrunContext: consumer-repo\n'
        'gap: "iOS build & UI test run from this product app\'s ios/ dir: `xcodebuild build`, `xcodebuild test`, `xcrun simctl`."\n'
        'cue: "you reach for an iOS build, unit-test, or simulator/UI run (xcodebuild / simctl)"\n')
    entry_values['commands[product-screen-commands]'] = ('class: product-screen-commands\nrunContext: per-product\nauthoredPerProduct: true\n'
        'gap: "product-screen build/test/run commands are per-product — read them from this iOS app\'s own build setup (theming Swift materializes here via `npx designerpunk generate`)."\n'
        'cue: "you need product-screen build/test/run commands"\n')

name = {'data': 'Data', 'kenya': 'Kenya'}[AGENT]
build({
    'name': AGENT, 'source': SRC, 'owner': AGENT, 'record_name': AGENT, 'prefix': AGENT,
    'header': [
        f'canonical/operative-sets/{AGENT}.yaml — operative-set record (design C16; Req 11.6.5d)',
        '',
        f'Every body unit of {SRC} (Spec 123 Task 15.4). Drafted by Thurgood (profile author);',
        f'confirmed by {name} (owner seat, C1) in canonical/profiles/consumer/confirmations/{AGENT}.md.',
        'canonicalHash = "sha256:" + hex SHA-256 over the unit\'s exact bytes (partition(splitFrontmatter(src).body)).',
        'Item text is the COMPLETE operative text, a verbatim substring of its unit; label is never matched.',
        'Criterion (5c): an item is operative iff a consumer implementation could violate it. Headings are labels.',
    ],
    'disp_header': [
        f'canonical/profiles/consumer/{AGENT}.dispositions.yaml — Spec 123 Task 15.4 (design C17; DD25, DD26)',
        'Every body unit and frontmatter leaf carries an explicit row. Re-pointed rows re-ground the role at the',
        f"consumer's repo (R5); their text is {AGENT}.overlay.md (## @unit prose, ## @entry YAML values, 15.0 (b) erratum).",
        f"The knowledge-fallback re-point (Kenya/Data R1): the {P['plat']} sources ship at {PKG}; test sources do not ship.",
    ],
    'units': units, 'frontmatter': fm, 'entry_values': entry_values,
})
