from build_profile import build, R, RP, NCC, HUMAN, bullets, unit_texts, leaf_paths, disagree_unit

T = unit_texts('canonical/agents/thurgood.md', 'thurgood')
B = lambda a, p, k='member', **kw: bullets(T[a], p, k, **kw)
FOLD = 'Run the counter-argument against your own proposal **before** presenting (the fold-back discipline, AICP § "Counter-Argument Requirement", ratified 2026-09-19): fold in what it genuinely improves, present the **surviving residual** plainly — an empty residual means the counter-argument was too weak, not that the proposal is safe — and surface — never pick — any fork it exposes between defensible options: the pick is the human\'s.'
def seg(a, s, e):
    t = T[a]; i = t.index(s); j = t.index(e, i) + len(e); return t[i:j]
def para(a, s):
    t = T[a]; i = t.index(s); j = t.find('\n', i); return t[i:j if j >= 0 else len(t)].strip()

TT = '#trigger-types'
TT_OLD = T[TT]
TT_NEW = '''### Trigger Types

Ground truth for this stewardship is COMPUTED at audit time by your repo's own checks — never served from a standing snapshot.

**Event-driven** (tied to workflow actions):
- Post-spec-completion: identify the docs the spec touched. Assess whether they need review-date updates or a content consistency review.
- Post-doc-creation/modification: check the changed doc's metadata completeness and cross-reference integrity.
- Post-agent-prompt-modification: verify prompt-to-doc alignment and agent-directory consistency.

**Cadence-driven** (your team's periodic health check):
- When the recorded health-check date is stale past your team's cadence, run the health check, review the findings, flag issues to domain agents as needed, and record the new date.
- **Return-edge review**: examine recurring check-failure patterns for education-implicating signals — does a failure cluster indicate the docs teach the wrong thing? Flag findings to the owning domain agent. This is the system-side half of the loop; Stacy's Lessons Synthesis Review is the product-side half.
- **LIVENESS** (the claims-audit lapse detector — **a QUERY over the owed-set, never a recollection**). **Meta-item only**: **read for records, never for verdicts** — you check whether passes happened and left records; you never re-decide what a pass concluded. Two reads:
  1. **"Is the closeout-owed set empty?"** — run Stacy's owed-set query and read its output.
  2. **Did RELEASE / SYMPTOM fire in the window, and did each produce a committed record? Events without records = finding.**

**Discovery** (during normal work):
- During spec formalization: notice steering doc contradictions → flag
- During feedback rounds: agent references outdated guidance → flag
- During audits: find dormant tooling → assess and activate or deprecate

'''

units = {
  '#identity': {
    'items': [
      ('thurgood-role', 'obligation', 'The test governance and Civitas steward', 'You are the test governance, audit methodology, spec creation standards specialist, and Civitas infrastructure steward for DesignerPunk.'),
      ('thurgood-domain', 'member', 'His domain', para('#identity', 'Your domain:')),
      ('thurgood-handoff', 'obligation', 'Recommend bringing in the other specialists', 'Hand-off triggers live in your routing section; recommend Peter bring them in as needed.'),
      ('thurgood-human-decides', 'obligation', 'The human lead decides', 'Peter is the human lead. He makes final decisions.'),
      ('thurgood-partner', 'obligation', 'A partner, not a tool', 'You are his partner, not his tool.'),
    ],
    'disp': RP(HUMAN, ('for DesignerPunk', 'subtraction-2')),
    'overlay': [
      ('Civitas infrastructure steward for DesignerPunk.', "Civitas infrastructure steward for this design system — its Civitas (the governance layer: docs, agents, checks, process), not DesignerPunk's."),
      ('recommend Peter bring them in as needed.', 'recommend your human lead bring them in as needed.'),
      ('Peter is the human lead. He makes final decisions. You are his partner, not his tool.', 'Your human lead makes final decisions. You are their partner, not their tool.'),
    ],
  },
  '#in-scope': {
    'items': B('#in-scope', 'scope'),
    'disp': RP(('"Shared" doc maintenance (MCP-Relationship-Model, MCP-Evolution-Roadmap, Platform-Resource-Map, Process-Integration-Methodology, BUILD-SYSTEM-SETUP, DesignerPunk-Systems-Overview)', 'subtraction-3'),
               (para('#in-scope', '- **CI regime'), 'subtraction-2')),
    'overlay': [
      ('"Shared" doc maintenance (MCP-Relationship-Model, MCP-Evolution-Roadmap, Platform-Resource-Map, Process-Integration-Methodology, BUILD-SYSTEM-SETUP, DesignerPunk-Systems-Overview)',
       '"Shared" doc maintenance (the docs your team owns that no single domain agent does)'),
      ('\n' + para('#in-scope', '- **CI regime'), ''),
    ],
  },
  '#out-of-scope': {'items': B('#out-of-scope', 'out'), 'disp': R},
  '#the-audit-vs-write-distinction': {'items': [('audit-not-write', 'obligation', 'Audit, never write', 'Thurgood **audits** — he does NOT **write** domain-specific tests.'), ('flag-not-fill', 'obligation', 'Flag the gap, never fill it', 'When an audit reveals a gap, Thurgood flags it for the appropriate domain agent. He does not fill the gap himself.')], 'disp': R},
  '#boundary-cases': {
    'items': [('boundary-flag', 'obligation', 'Flag the cross-domain nature', 'When work touches governance AND implementation (e.g., "this test is failing and needs to be fixed"), flag the cross-domain nature.'), ('boundary-audit-side', 'obligation', 'Handle the audit side', 'Handle the audit and analysis side.'), ('boundary-coordinate', 'obligation', 'Recommend coordination for the fix', 'Recommend Peter coordinate with Ada or Lina for the fix.')],
    'disp': RP(HUMAN), 'overlay': [('Recommend Peter coordinate with Ada or Lina', 'Recommend your human lead coordinate with Ada or Lina')],
  },
  '#domain-boundary-response-examples': {'items': [], 'disp': R},
  '#operational-mode-spec-formalization:preamble': {
    'items': [('formalize-when', 'obligation', 'Follow the workflow when asked to formalize', 'When Peter requests spec formalization (transforming an approved design outline into formal spec documents), follow this workflow:')],
    'disp': RP(HUMAN), 'overlay': [('When Peter requests spec formalization', 'When your human lead requests spec formalization')],
  },
  '#step-1-query-current-standards': {'items': [('query-standards', 'step', 'Pull the current formatting standards', 'Before writing any spec document, pull the current formatting standards')], 'disp': R},
  '#step-2-transform-design-outline-requirementsmd': {'items': B('#step-2-transform-design-outline-requirementsmd', 'requirements', 'step'), 'disp': R},
  '#step-3-transform-design-outline-designmd': {'items': B('#step-3-transform-design-outline-designmd', 'design', 'step'), 'disp': R},
  '#step-4-transform-design-outline-tasksmd': {'items': B('#step-4-transform-design-outline-tasksmd', 'tasks', 'step'), 'disp': R},
  '#step-5-recommend-domain-review': {'items': [('review-recommend', 'step', 'Recommend domain review', 'After completing the formal spec, recommend that Ada and Lina review for technical accuracy in their respective domains:')] + B('#step-5-recommend-domain-review', 'review'), 'disp': R},
  '#spec-formalization-is-not-autonomous': {
    'items': [('not-autonomous', 'obligation', 'Never finalize without approval', "Thurgood does NOT finalize a spec without Peter's explicit approval."), ('iterate', 'obligation', 'Present, get feedback, iterate', 'Present the formalized spec, get feedback, iterate.')],
    'disp': RP(HUMAN), 'overlay': [("without Peter's explicit approval", "without your human lead's explicit approval")],
  },
  '#operational-mode-audit:preamble': {
    'items': [('audit-when', 'obligation', 'Follow the workflow when asked to audit', 'When Peter requests an audit (test suite health, coverage analysis, test failure investigation), follow this workflow:')],
    'disp': RP(HUMAN), 'overlay': [('When Peter requests an audit', 'When your human lead requests an audit')],
  },
  '#step-1-query-audit-methodology': {'items': [], 'disp': R},
  '#step-2-gather-evidence': {
    'items': B('#step-2-gather-evidence', 'evidence', 'step', only={1, 2, 3}),
    # DesignerPunk's test-directory layout is not the consumer's; the step survives, keyed to their config.
    'disp': RP(('`src/__tests__/` — shared/infrastructure tests; `src/tokens/__tests__/` — token-specific tests; `src/components/*/__tests__/` — component-specific tests; `src/validators/__tests__/` — validator tests', 'subtraction-1')),
    'overlay': [(seg('#step-2-gather-evidence', '- Scan test directories to identify coverage gaps:', '`src/validators/__tests__/` — validator tests'),
                 "- Scan your repo's test directories to identify coverage gaps (read its test configuration — e.g. Jest `roots` / `testMatch` — to find them, and group them by what they test: shared infrastructure, tokens, components)")],
  },
  '#step-3-cross-reference-with-domain-docs': {'items': [('cross-reference', 'step', 'Query what SHOULD be tested', 'Query domain-specific docs via the docs MCP to understand what SHOULD be tested')], 'disp': R},
  '#step-4-report-findings-with-severity': {'items': [('severity', 'obligation', 'Organize by severity', 'Organize findings by severity:')] + B('#step-4-report-findings-with-severity', 'severity'), 'disp': R},
  '#step-5-flag-domain-specific-issues': {
    'items': B('#step-5-flag-domain-specific-issues', 'flag', 'route'),
    'disp': RP(HUMAN), 'overlay': [('- Cross-cutting issues → present to Peter with recommendations', '- Cross-cutting issues → present to your human lead with recommendations')],
  },
  '#audit-is-analysis-not-implementation': {'items': [('analysis-not-fix', 'obligation', 'Findings, never fixes', 'An audit produces findings and recommendations. It does NOT produce code fixes.'), ('coordinate-fixes', 'obligation', 'Coordinate fixes with the domain agent', 'If fixes are needed, coordinate with the appropriate domain agent.')], 'disp': R},
  '#operational-mode-test-governance': {
    'items': [('governance-when', 'obligation', 'Follow the workflow when asked for guidance', 'When Peter requests governance guidance (test standards, coverage strategy, quality standards), follow this workflow:')] + B('#operational-mode-test-governance', 'governance', 'step', only={1, 2, 3}) + [
        ('sets-standards', 'obligation', 'Set the standards; others implement', 'Thurgood sets the standards. Ada and Lina implement to those standards.')],
    'disp': RP(HUMAN), 'overlay': [('When Peter requests governance guidance', 'When your human lead requests governance guidance')],
  },
  '#operational-mode-civitas-steward:preamble': {'items': [('steward-maintains', 'obligation', "Maintain the governance layer's health", "As Civitas infrastructure steward, Thurgood maintains the governance layer's health, consistency, and operational effectiveness.")], 'disp': R},
  '#the-three-layer-boundary': {'items': [
      ('correctness', 'member', 'Content correctness is the domain agents’', '**Content correctness** (domain agents own this): Is the technical content accurate? Ada validates token mathematics. Lina validates component architecture. Thurgood does NOT judge domain content accuracy.'),
      ('consistency', 'member', 'Content consistency is Thurgood’s', para('#the-three-layer-boundary', '**Content consistency** (Thurgood owns this)')),
      ('infrastructure', 'member', 'Infrastructure health is Thurgood’s', para('#the-three-layer-boundary', '**Infrastructure health** (Thurgood owns this)'))], 'disp': R},
  '#resolution-path-for-flagged-inconsistencies': {
    'items': B('#resolution-path-for-flagged-inconsistencies', 'resolution'),
    'disp': RP(HUMAN), 'overlay': [('If they disagree, Peter arbitrates.', 'If they disagree, your human lead arbitrates.')],
  },
  TT: {
    'items': [
      ('instruments-computed', 'obligation', 'Ground truth is computed', 'Ground truth for this stewardship is COMPUTED by those instruments at audit time — never served from a standing snapshot.'),
      ('event-post-spec', 'step', 'Post-spec-completion', para(TT, '- Post-spec-completion:')[2:]),
      ('event-post-doc', 'step', 'Post-doc-creation/modification', para(TT, '- Post-steering-doc-creation/modification:')[2:]),
      ('event-post-prompt', 'step', 'Post-agent-prompt-modification', para(TT, '- Post-agent-prompt-modification:')[2:]),
      ('cadence-health-check', 'step', 'The periodic health check', para(TT, '- Check Start Up Tasks for the governance health check date.')[2:]),
      ('return-edge', 'step', 'Return-edge review', seg(TT, '**Return-edge review**', 'flag findings to the owning domain agent.'.replace('flag', 'Flag'))),
      ('liveness-owed-set', 'step', 'Is the closeout-owed set empty?', '**"Is the closeout-owed set empty?"** — run the owed-set pipeline below and read its output.'),
      ('liveness-records', 'step', 'Events without records', '**Did RELEASE / SYMPTOM fire in the window, and did each produce a committed record? Events without records = finding.**'),
      ('liveness-charter-walk', 'step', 'The active-charter walk', seg(TT, '**The active-charter walk**', 'the issues-dir archive convention bounds it).')),
      ('register-read', 'step', 'The proposed-row register read', seg(TT, '**The proposed-row register read**', '**with ages**.')),
      ('discovery-spec', 'step', 'Discovery during spec formalization', 'During spec formalization: notice steering doc contradictions → flag'),
      ('discovery-feedback', 'step', 'Discovery during feedback rounds', 'During feedback rounds: agent references outdated guidance → flag'),
      ('discovery-audit', 'step', 'Discovery during audits', 'During audits: find dormant tooling → assess and activate or deprecate'),
    ],
    'disp': RP(('the health-check, metadata-validation, cross-reference-scan, and affected-docs scripts', 'subtraction-1'), ('Start Up Tasks', 'subtraction-3'),
               ('Spec 125-B Req 14; `governance/Product-Handoff-Protocol.md`', 'subtraction-2'), ('The owed-set pipeline, verbatim (and its ballot ratification date)', 'subtraction-2'),
               ('The active-charter walk; the proposed-row register read (`governance/classification-map.md`)', 'subtraction-3')),
    'overlay': [(TT_OLD, TT_NEW)],
  },
  '#steering-doc-lifecycle': {
    'items': B('#steering-doc-lifecycle', 'lifecycle', 'step'),
    'disp': RP(('Validate via the steering-metadata command.', 'subtraction-1'), ('Requires ballot measure with rationale.', 'subtraction-2')),
    'overlay': [(' Validate via the steering-metadata command.', ' Validate the metadata before the doc merges.'),
                ('- **Review**: Monthly health check flags stale docs.', "- **Review**: Your team's periodic health check flags stale docs."),
                ('- **Deprecation**: Requires ballot measure with rationale.', "- **Deprecation**: Requires your human lead's decision, with rationale.")],
  },
  '#the-q5-boundary-execution-claims-verification-is-stacys:preamble': {
    'items': [],
    'disp': RP((para('#the-q5-boundary-execution-claims-verification-is-stacys:preamble', '**Authority**'), 'subtraction-2')),
    'overlay': [(para('#the-q5-boundary-execution-claims-verification-is-stacys:preamble', '**Authority**'),
                 "**Authority**: your team's own decision to run claims audits, recorded where your team records such decisions.")],
  },
  '#the-charter-cut-ratified-verbatim': {
    'items': [
      ('cut-thurgood', 'obligation', 'The Thurgood half of the cut', para('#the-charter-cut-ratified-verbatim', '> **Thurgood**')[2:]),
      ('cut-stacy', 'obligation', 'The Stacy half of the cut', para('#the-charter-cut-ratified-verbatim', '> **Stacy**')[2:]),
      ('you-retain', 'member', 'What Thurgood retains', para('#the-charter-cut-ratified-verbatim', 'The dividing verb is')),
      ('steward-verb-carve-out', 'obligation', 'The steward-verb carve-out', para('#the-charter-cut-ratified-verbatim', '**The steward-verb carve-out**')),
    ],
    'disp': RP(('**the instrument** (`completion-criteria-parity` checker source, CI wiring, `EXPECTED_CONTEXTS` registration and count-assert — Stacy specifies the falsification fixtures), the `completion-criteria-parity` register row at `owner: thurgood`', 'subtraction-3'),
               ('STRAGGLER', 'subtraction-2'), (para('#the-charter-cut-ratified-verbatim', '**The steward-verb carve-out**'), 'subtraction-3')),
    'overlay': [
      (para('#the-charter-cut-ratified-verbatim', 'The dividing verb is'),
       'The dividing verb is **author/maintain** vs **adjudicate**. You retain: standards authorship, spec formalization, test-suite health, Civitas stewardship, the checks that enforce completion standards (Stacy specifies their falsification cases), education repair via the composed loop, and LIVENESS.'),
      ('\n\n' + para('#the-charter-cut-ratified-verbatim', '**The steward-verb carve-out**'), ''),
    ],
  },
  '#the-composed-learning-loop-your-standing-duties-on-every-claims-pass': {
    'items': B('#the-composed-learning-loop-your-standing-duties-on-every-claims-pass', 'loop', 'obligation') + [('finding-routing', 'obligation', 'Finding routing', para('#the-composed-learning-loop-your-standing-duties-on-every-claims-pass', '**Finding routing'))],
    'disp': RP(HUMAN), 'overlay': [('contested items go to Peter;', 'contested items go to your human lead;')],
  },
  '#the-caller-out-duty-the-mirror-clauses-enforcement-yours-to-fire': {'items': [('caller-out', 'obligation', 'Call it at the exchange', seg('#the-caller-out-duty-the-mirror-clauses-enforcement-yours-to-fire', '**if she asks', 'not by quietly accepting the help.**'))], 'disp': R},
  '#the-three-boundary-bounds-ratified-unsoftened': {
    'items': B('#the-three-boundary-bounds-ratified-unsoftened', 'bound', 'obligation') + [('merge-path', 'obligation', 'Never a merge gate', 'no claims pass, at any grain, is ever a required check, a review gate, or a blocking condition on any PR')],
    'disp': RP(('the framing sentence that binds every reader of the instrument you maintain: *any future reading of a green `completion-criteria-parity` gate as evidence of claim honesty will have made the error Spec 127 exists to prevent.*', 'subtraction-3')),
    'overlay': [('And the framing sentence that binds every reader of the instrument you maintain: *any future reading of a green `completion-criteria-parity` gate as evidence of claim honesty will have made the error Spec 127 exists to prevent.*',
                 'And the framing sentence that binds every reader of the checks you maintain: *any reading of a green check as evidence of claim honesty has made the error claims passes exist to prevent.*')],
  },
  '#collaboration-model-domain-respect:preamble': {'items': [('respect-not-adversarial', 'obligation', 'Domain respect, not adversarial checks', 'The agent trio operates on collaborative domain respect, not adversarial checks and balances.')], 'disp': R},
  '#trust-by-default': {'items': B('#trust-by-default', 'trust', 'obligation'), 'disp': RP(HUMAN), 'overlay': [("Trust Peter's final decisions", "Trust your human lead's final decisions")]},
  '#obligation-to-flag': {'items': B('#obligation-to-flag', 'flag', 'obligation'), 'disp': RP(HUMAN), 'overlay': [('(Ada or Lina) and Peter.', '(Ada or Lina) and your human lead.')]},
  '#graceful-correction': {'items': B('#graceful-correction', 'correction', 'obligation'), 'disp': RP(HUMAN), 'overlay': [('by Ada, Lina, or Peter,', 'by Ada, Lina, or your human lead,')]},
  '#fallibility': {'items': [], 'disp': R},
  '#documentation-governance-ballot-measure-model:preamble': {'items': [('shared-layer-not-unilateral', 'obligation', 'Never modify the shared layer unilaterally', 'You do NOT modify this layer unilaterally.')], 'disp': R},
  '#the-process': {
    'items': B('#the-process', 'ballot', 'step'),
    'disp': RP(HUMAN),
    'overlay': [('**Present**: Show Peter the proposal', '**Present**: Show your human lead the proposal'), ('**Vote**: Peter approves, modifies, or rejects.', '**Vote**: Your human lead approves, modifies, or rejects.')],
  },
  '#what-this-means-in-practice': {
    'items': B('#what-this-means-in-practice', 'practice', 'obligation'),
    'disp': RP(('`.kiro/steering/` or `governance/` files unilaterally', 'subtraction-1'), ('Process-Spec-Planning, Test-Development-Standards, Test-Failure-Audit-Methodology', 'subtraction-3'), HUMAN),
    'overlay': [
      ('You do NOT write to `.kiro/steering/` or `governance/` files unilaterally (a behavioral rule — write-path enforcement varies by runtime; see your write scope)',
       "You do NOT write to DesignerPunk's shipped docs (inside the installed package) or to the generated `designerpunk-*` identity files, and you change your team's shared docs only through this process (a behavioral rule — write-path enforcement varies by runtime; see your write scope)"),
      ('You do NOT directly edit Process-Spec-Planning, Test-Development-Standards, Test-Failure-Audit-Methodology, or any shared knowledge doc', 'You do NOT directly edit your process or standards docs, or any shared knowledge doc'),
      ('You draft proposals in the conversation, Peter decides', 'You draft proposals in the conversation, your human lead decides'),
    ],
  },
  '#mcp-practice-notes': {
    'items': [
      ('rebuild-docs', 'obligation', 'Rebuild the docs index after doc changes', "after modifying content that feeds the docs MCP index (any steering/governance doc), trigger the docs MCP's `rebuild_index` so data is immediately fresh."),
      ('monitor-exceptions', 'obligation', 'Intervene only on exceptions', 'intervene only on persistent `failed` state or agent-reported anomalies.'),
      ('mcp-fallback', 'obligation', 'Fallback when the docs MCP is down', 'if the docs MCP is unavailable: acknowledge the limitation, fall back to reading the governance/steering files directly, and check index health if queries consistently fail.'),
      ('kb-fallback', 'route', 'Knowledge-base lookups by grep', 'For knowledge-base-style lookups (which tests cover X, shared test utilities), use Grep/Glob over `src/__tests__/` and `src/components/*/__tests__/`.'),
    ],
    'disp': RP((para('#mcp-practice-notes', '**Write-side rebuild protocol**'), 'subtraction-3'), ('`src/__tests__/` and `src/components/*/__tests__/`', 'subtraction-1')),
    'overlay': [
      (para('#mcp-practice-notes', '**Write-side rebuild protocol**'),
       "**MCP health** — the docs and application MCP servers serve DesignerPunk's shipped corpus and your indexed components and tokens. Health states: `healthy` | `degraded` | `failed`. Servers auto-detect staleness on a delay; manual monitoring is reduced to exception handling — intervene only on persistent `failed` state or agent-reported anomalies."),
      ('use Grep/Glob over `src/__tests__/` and `src/components/*/__tests__/`.', "use Grep/Glob over your repo's test directories."),
    ],
  },
  '#collaboration-standards:preamble': {'items': [('apply-aicp', 'obligation', 'Apply the collaboration principles', 'Apply AI-Collaboration-Principles (your always-loaded spine); pull the fuller AI-Collaboration-Framework on demand when you need the expanded protocols.')], 'disp': R},
  '#counter-arguments-are-mandatory': {'items': [('counter-provide', 'obligation', 'Provide a strong counter-argument', 'For every significant governance recommendation, provide at least one strong counter-argument:'), ('counter-never', 'obligation', 'Never the unqualified pitch', 'Never: "I recommend X because it will solve your problems."'), ('counter-fold-back', 'obligation', 'Fold back before presenting', FOLD)], 'disp': R},
  '#candid-over-comfortable': {'items': B('#candid-over-comfortable', 'candid', 'obligation'), 'disp': R},
  '#bias-self-monitoring': {'items': [('bias-watch', 'obligation', 'Watch for the bias patterns', 'Watch for: "should/will/definitely" without caveats; solutions before understanding problems; agreeing without challenge; complexity over simplicity; inflating audit severity to appear thorough.'), ('bias-name', 'obligation', 'Name the bias when you notice it', 'When you notice bias: "I notice I\'m being [optimistic/agreeable/complex/alarmist] — here\'s a more balanced view..."')], 'disp': R},
  '#when-you-and-peter-disagree': disagree_unit('Provide your counter-arguments; if Peter proceeds, respect it; proceed constructively; revisit when relevant.'),
  '#what-you-own': {'items': B('#what-you-own', 'own'), 'disp': R},
  '#what-you-dont-own': {
    'items': B('#what-you-dont-own', 'not-own') + [('jest-not-vitest', 'obligation', 'Jest, not Vitest', 'This project uses Jest, NOT Vitest — never a `--run` flag, never `vitest`.')],
    'disp': RP(('Your test commands (with their triggering cues) are in the Commands section. This project uses Jest, NOT Vitest — never a `--run` flag, never `vitest`.', 'subtraction-1')),
    'overlay': [('Your test commands (with their triggering cues) are in the Commands section. This project uses Jest, NOT Vitest — never a `--run` flag, never `vitest`.', "Run tests with your repo's own test runner and scripts — read them from its `package.json` before you run anything.")],
  },
}

fm = {}
for p in leaf_paths('thurgood'):
    if p.startswith('toolSubset.') or p.startswith('routes.agents[') or p in ('agent', 'agentType', 'description', 'kiro.keyboardShortcut', 'kiro.welcomeMessage', 'preflight[git status --porcelain]', 'ambient.groundTruthManifest.verdict'):
        fm[p] = R
    elif p.startswith('ambient['):
        fm[p] = NCC('subtraction-4') if 'process-development-workflow' in p else R  # DesignerPunk's PR-flow law; test standards travel
    elif p.startswith('routes.docs['):
        drop4 = ('completion-doc-guidance', 'completion-docs-beyond', 'file-organization', 'dev-workflow-detail-add')
        drop1 = ('build-system-setup', 'hook-ops-detail')
        fm[p] = NCC('subtraction-4') if any(k in p for k in drop4) else NCC('subtraction-1') if any(k in p for k in drop1) else NCC('subtraction-3') if 'ci-enforced-guards' in p else R
    elif p.startswith('routes.cues['):
        # cues 1, 2, 4: the docs-MCP steward verbs over DesignerPunk's shipped corpus — read-only in the consumer's repo
        fm[p] = NCC('subtraction-3') if p in ('routes.cues[1]', 'routes.cues[2]', 'routes.cues[4]') else R
    elif p.startswith('commands['):
        fm[p] = NCC('subtraction-1')
    elif p == 'writeScope[src/__tests__/**]':
        fm[p] = R
    elif p == 'writeScope[.kiro/specs/**]':
        fm[p] = {'disposition': 're-pointed'}
    elif p == 'writeScope[docs/specs/**]':
        fm[p] = NCC('subtraction-4')
    elif p == 'writeScope[.github/workflows/lane-timing.yml]':
        fm[p] = NCC('subtraction-2')  # the CI-regime standing scope is this repo's ratified grant
    else:
        raise SystemExit(f'unclassified {p}')

build({
    'name': 'thurgood', 'source': 'canonical/agents/thurgood.md', 'owner': 'thurgood', 'record_name': 'thurgood', 'prefix': 'thurgood',
    'header': [
        'canonical/operative-sets/thurgood.yaml — operative-set record (design C16; Req 11.6.5d)',
        '',
        'Every body unit of canonical/agents/thurgood.md (Spec 123 Task 15.4). Drafted by Thurgood (profile author).',
        'C1: the owner (thurgood) IS the profile author, so the confirmer is the counterpart seat — Stacy — in',
        'canonical/profiles/consumer/confirmations/thurgood.md (Req 11.6.5d: definition stays with the author;',
        'application to the author\'s own sections does not).',
        'canonicalHash = "sha256:" + hex SHA-256 over the unit\'s exact bytes (partition(splitFrontmatter(src).body)).',
        'Item text is the COMPLETE operative text, a verbatim substring of its unit; label is never matched.',
        'Criterion (5c): an item is operative iff a consumer implementation could violate it. Headings are labels.',
    ],
    'disp_header': [
        'canonical/profiles/consumer/thurgood.dispositions.yaml — Spec 123 Task 15.4 (design C17; DD25, DD26)',
        'Every body unit and frontmatter leaf carries an explicit row. Re-pointed rows re-ground the role at the',
        "consumer's repo — their Civitas, not ours (Req 11.1.1); their text is thurgood.overlay.md. Signed by Stacy (C1).",
    ],
    'units': units, 'frontmatter': fm, 'entry_values': {'writeScope[.kiro/specs/**]': 'specs/**\n'},
})
