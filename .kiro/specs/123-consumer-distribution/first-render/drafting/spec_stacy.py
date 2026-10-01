import json, re
from build_profile import build, R, RP, NCC, HUMAN, bullets, unit_texts, leaf_paths, SP

T = unit_texts('canonical/agents/stacy.md', 'stacy')
B = lambda a, p, k='member', **kw: bullets(T[a], p, k, **kw)
FOLD = 'Run the counter-argument against your own proposal **before** presenting (the fold-back discipline, AICP § "Counter-Argument Requirement", ratified 2026-09-19): fold in what it genuinely improves, present the **surviving residual** plainly — an empty residual means the counter-argument was too weak, not that the proposal is safe — and surface — never pick — any fork it exposes between defensible options: the pick is the human\'s.'

def seg(anchor, start, end):
    t = T[anchor]; i = t.index(start); j = t.index(end, i) + len(end)
    return t[i:j]

# ---- the counting-block unit's items (Task 15.4, C9 — the same derivation as c9.py) ----
A = '#the-claims-pass-record-claims-passmd-the-template'
t = T[A]
cb = t[t.index('**The counting block, in full**: ') + len('**The counting block, in full**: '):t.index('<!-- volatile-ok')].strip()
members, depth, start = [], 0, 0
for k, ch in enumerate(cb):
    depth += ch == '('; depth -= ch == ')'
    if depth == 0 and (cb.startswith('; **', k) or cb.startswith('; and **', k)):
        members.append(cb[start:k].strip()); start = k + 2
members.append(cb[start:].strip())
a0, b0 = members.pop(0).split('; ', 1); members[0:0] = [a0, b0]
labels = ['Omissions', 'Vagueness', 'Declared-none rates', 'Fixed-string exemption usage', 'Bundled-claim / incomplete-decomposition', 'Platforms fallback invocations',
          'Subtask-doc presence', 'Delegated-tier capture', 'Orchestrator consult line', 'Re-grounding dispositions', 'Populations and baselines', 'M3 / M4 / M5']
assert len(members) == len(labels)
def between(s, e=None):
    i = t.index(s); j = t.index(e, i) if e else len(t); return t[i:j].strip()
CB_ITEMS = [
    ('record-committed', 'obligation', 'Every pass is a committed record', "Every pass produces a committed record in the spec's completion directory."),
    ('closeout-path', 'obligation', 'CLOSEOUT record path', "CLOSEOUT's record is `.kiro/specs/<spec>/completion/claims-pass.md` — the exact filename the owed-set predicate keys on."),
    ('midpoint-path', 'obligation', 'MIDPOINT record path', '**A MIDPOINT record is `completion/claims-pass-midpoint.md`, NEVER `claims-pass.md`**'),
    ('section-scope', 'member', 'Scope section', '**Scope** — the spec, the population (which parents / which delta), the firing trigger.'),
    ('section-findings', 'member', 'Findings section', '**Findings** — per discrepancy: **promised / claimed / shipped**, classified per the 112 taxonomy, routed per the two-route rule above.'),
    ('section-method', 'member', 'Method section', "**Method — the sample, named, and how many of the total** (the fraction is rot-mode-1's detector)."),
    ('method-honesty', 'obligation', 'Method honesty per row and platform', 'Method honesty is **per criterion row and per platform**: a platform-unverifiable row is recorded as `not re-verified — toolchain unavailable`, never silently omitted, and an unverifiable row NEVER rolls into a ✅.'),
    ('closed-negative-string', 'obligation', 'One closed negative string', 'The vocabulary is deliberately **closed to that one negative string**'),
    ('mandatory-line', 'obligation', 'The Standards-implications line', "**The mandatory line**: `Standards implications: none / or list` — the composed learning loop's input; Thurgood reads every pass in full against it."),
] + [(f'counting-{i + 1}', 'member', f'Counting block: {l}', (m[4:].strip() if m.startswith('and ') else m)) for i, (m, l) in enumerate(zip(members, labels))] + [
    ('report-set-comparison', 'obligation', 'Report-set comparison at CLOSEOUT', between('**The report-set comparison**', '\n- **The emission-reading duty')),
    ('emission-reading', 'obligation', 'Emission-reading duty', between('**The emission-reading duty', '\n- **The delegated-tier read**')),
    ('delegated-tier-read', 'obligation', 'Delegated-tier read', between('**The delegated-tier read**', '\n- **The deferral walk-back**')),
    ('deferral-walk-back', 'obligation', 'Deferral walk-back', between('**The deferral walk-back**', '\n- **The instruments read**')),
    ('instruments-read', 'obligation', 'Instruments read', between('**The instruments read**', '\n- **The never-a-gate sentence')),
    ('never-a-gate', 'obligation', 'Never a gate', '*no pass, at any grain, is ever a required check, a review gate, or a blocking condition on any PR.*'),
]

# The consumer's claims-pass template: the practice, keyed to their repo; DesignerPunk's ballots,
# instruments and history subtracted; the `volatile-ok` lint marker (a repo-bound comment) disposed.
CB_NEW = '''### The claims-pass record (`claims-pass.md` — the template)

Every pass produces a committed record in the spec's completion directory. **Path convention, load-bearing**: CLOSEOUT's record is `<your specs dir>/<spec>/completion/claims-pass.md` — the exact filename the owed-set query keys on. **A MIDPOINT record is `completion/claims-pass-midpoint.md`, NEVER `claims-pass.md`** — a midpoint record at the closeout path would silently discharge the spec's closeout with a pass covering only part of the spec. Three required sections plus the standing duties:

1. **Scope** — the spec, the population (which parents / which delta), the firing trigger.
2. **Findings** — per discrepancy: **promised / claimed / shipped**, classified by kind (a missing artifact, a false ✅, prose-only evidence, criteria dilution), routed per the two-route rule above.
3. **Method — the sample, named, and how many of the total** (the fraction is rot-mode-1's detector). Method honesty is **per criterion row and per platform**: a platform-unverifiable row is recorded as `not re-verified — toolchain unavailable`, never silently omitted, and an unverifiable row NEVER rolls into a ✅. The vocabulary is deliberately **closed to that one negative string** — a re-verified row's own Evidence cell already carries its command/result, so only the negative case needs canonical wording. This clause is **load-bearing for the product tier**, where trust-the-reported-result is the default state of most parity claims.

Plus, on every pass:

- **The mandatory line**: `Standards implications: none / or list` — the composed learning loop's input; Thurgood reads every pass in full against it.
- **The counting block, in full**: criteria-block **omissions**; criteria **vagueness**; **declared-none rates**; **exemption usage** (every criterion your process lets a parent waive, counted per waiver); **bundled-claim and incomplete-decomposition instances**; **subtask-doc presence** (a ticked subtask without its doc is a FINDING routed to the authoring agent, not a counted observation; watch the reflexive `adaptations: none` rate as the ritual-stub signal) — **observation, not a guard**, never a gate.
- **The report-set comparison** (at CLOSEOUT): decomposed per-platform rows compared against the committed Implementation-Report set — the incomplete-decomposition guard (two bullets where three platforms apply is compliant, exact-set green, and short one platform).
- **The deferral walk-back** (a WRITTEN CLOSEOUT duty): verify every `Artifact deferred: <path> → <unit>` declaration in the closing spec's completion docs against reality — the path resolves and the named unit's merge delivered it. **An undelivered deferral is a finding** (the promised-annotated-never-shipped shape that reached consumers), never a silent green. A free-prose deferral earned no exclusion and is audited as an ordinary artifact claim.
- **The never-a-gate sentence, restated wherever the practice is documented**: *no pass, at any grain, is ever a required check, a review gate, or a blocking condition on any PR.*

'''

TRIG_ROWS = {k: next(l for l in T['#the-trigger-set-the-114-superset-table-names-never-numbers'].split('\n') if l.startswith(f'| **{k}**') or l.startswith(f'| ~~**{k}**')) for k in
             ['LENS', 'RELEASE', 'SYMPTOM', 'CLOSEOUT', 'MIDPOINT', 'ARMING', 'GATE', 'EDUCATION', 'STRAGGLER', 'LIVENESS', 'BURST']}
TRIG_OLD_HEAD = '### The trigger set (the § 11.4 superset table — names, never numbers)'
TRIG_NEW = {
    'LENS': "| **LENS** | The **tasks review** of any spec | Verifiability review of every parent's criteria set: can each criterion be verified from the repo — source, git, a test run, a completion doc? Does each path, test, command or CI check a criterion names resolve at the review base, or is a subtask of the same parent named to build it — existence only, never fit. **Not a gate; feedback entries only.** Bounded by the mirror anti-rot clause below. **Carries the does-this-span-platforms question** (\"what does each platform's bullet verify against?\") | Stacy |",
    'RELEASE': "| **RELEASE** | Before a version publishes / at the release tag | **Claims pass over the release delta (`git log <last-tag>..main`) — parent criteria tables vs `tasks.md` vs shipped source**. **Non-negotiable.** Paired with the release-step condition: the release checklist runs the owed-set query and pastes its output | Stacy |",
    'CLOSEOUT': "| **CLOSEOUT** | The merge of the spec's **final declared merge unit** | All the spec's parents: promised vs claimed vs shipped; the judgment residual no mechanical check can reach. **Owed by every spec closing after your team adopted claims passes** | Stacy |",
    'LIVENESS': "| **LIVENESS** | Your team's periodic governance health check | **Meta-item only**: **\"Is the closeout-owed set empty?\"** — a query, not a recollection — **plus: did RELEASE / SYMPTOM fire in the window, and did each produce a committed record? Events without records = finding.** | Thurgood |",
}
trig_overlay = [(TRIG_OLD_HEAD, '### The trigger set (names, never numbers)')]
for k in ['LENS', 'RELEASE', 'CLOSEOUT', 'LIVENESS']:
    trig_overlay.append((TRIG_ROWS[k], TRIG_NEW[k]))
for k in ['ARMING', 'GATE', 'STRAGGLER', 'BURST']:
    trig_overlay.append((TRIG_ROWS[k] + '\n', ''))

OWED_OLD = T['#the-owed-set-pipeline-your-command-catalogs-owed-set-entry-documented-commands-deliberately-not-a-committed-script']
OWED_NEW = open(f'{SP}/E.txt').read()  # G1 run 1's committed E rendering (exemplar E — the honest re-pointing)

cut = '#the-charter-cut-ratified-verbatim'
CUT_OLD = seg(cut, 'The dividing verb is', 'did the task ship what it claims."*')
reach = '#honest-reach-carried-so-you-never-inherit-an-over-claimed-instrument'
REACH_OLD = seg(reach, 'An Evidence cell', 'Spec 127 exists to prevent.*')
REACH_NEW = ("An Evidence cell containing a plausible-looking path is green to any presence check regardless of truth. For platforms you cannot build here, \"command + result\" evidence is **trust-the-reported-result** — record it as such, never as re-verified. "
             "Artifact truth is owned by **the claims pass**. And the framing sentence that binds every reader: *nothing in this practice makes claim honesty owned, solved, or guaranteed — any reading of a green check as evidence of claim honesty has made the error claims passes exist to prevent.*")

units = {
  '#identity': {
    'items': [
      ('stacy-role', 'obligation', 'The product governance and QA specialist', 'You are the product governance and quality assurance specialist for products built with DesignerPunk.'),
      ('stacy-deliver-promises', 'obligation', 'The process delivers on its promises', 'You ensure the product development process delivers on its promises.'),
      ('stacy-claims-both-tiers', 'obligation', 'Claims auditor on both tiers', seg('#identity', '**One seat crosses that directional split by ratified design**', 'see § "Operational Mode: Claims Audit".')),
      ('stacy-domain', 'member', 'Her domain', 'Your domain: product development process quality, test coverage verification, cross-platform parity auditing, spec structure governance, lessons-learned documentation, and execution-claims verification (both tiers).'),
      ('stacy-hold-the-line', 'obligation', 'Bring evidence; hold the line', 'When you find a gap, you bring the evidence, the impact, and a path forward. You are not passive — when process is being skipped or quality is slipping, you say so directly and hold the line.'),
      ('stacy-human-decides', 'obligation', 'The human lead decides', 'Peter is the human lead. He makes final decisions.'),
      ('stacy-partner', 'obligation', 'A partner, not a tool', 'You are his partner, not his tool.'),
    ],
    'disp': RP(HUMAN, ('(the Q5 cut, ratified 2026-09-17)', 'subtraction-2')),
    'overlay': [
      ("Thurgood looks inward — is DesignerPunk's core infrastructure sound?", "Thurgood looks inward — is the design system's own infrastructure sound?"),
      ('execution-claims verification (the Q5 cut, ratified 2026-09-17) makes you', 'execution-claims verification makes you'),
      ('Peter is the human lead. He makes final decisions. You are his partner, not his tool.', 'Your human lead makes final decisions. You are their partner, not their tool.'),
    ],
  },
  '#in-scope': {
    'items': B('#in-scope', 'scope'),
    'disp': RP(('the criteria-parity findings the check cannot reach (false ✅ on a reproduced row, prose-only evidence, Goodhart criteria-dilution), and the M3/M4/M5 adoption-and-quality metrics as audit output', 'subtraction-3'),
               ('Register rows: `completion-verification-honesty` (ideological), `promised-artifact-shipped` (proposed/deferred), `parent-completion-docs-present` (while unbuilt/ideological)', 'subtraction-3')),
    'overlay': [
      ('the claims-pass events that fire them, the criteria-parity findings the check cannot reach (false ✅ on a reproduced row, prose-only evidence, Goodhart criteria-dilution), and the M3/M4/M5 adoption-and-quality metrics as audit output',
       'the claims-pass events that fire them, and the findings no mechanical check can reach (a false ✅ on a reproduced row, prose-only evidence, criteria dilution)'),
      ('\n- Register rows: `completion-verification-honesty` (ideological), `promised-artifact-shipped` (proposed/deferred), `parent-completion-docs-present` (while unbuilt/ideological)', ''),
    ],
  },
  '#out-of-scope': {
    'items': B('#out-of-scope', 'out'),
    'disp': RP(HUMAN, ("**The claims instrument** — checker source, CI wiring, `EXPECTED_CONTEXTS` registration are Thurgood's; you specify the falsification fixtures", 'subtraction-3')),
    'overlay': [
      ("**Product decisions** — that's Peter's job", "**Product decisions** — that's your human lead's job"),
      ("\n- **The claims instrument** — checker source, CI wiring, `EXPECTED_CONTEXTS` registration are Thurgood's; you specify the falsification fixtures", ''),
    ],
  },
  '#the-audit-vs-write-distinction': {'items': [('audit-not-write', 'obligation', 'Audit, never write', 'You **audit** — you do NOT **write** domain-specific code or tests.')], 'disp': R},
  '#operational-mode-process-audit:preamble': {
    'items': [('audit-when', 'obligation', 'When to run a process audit', 'When Peter requests a process quality check, or at natural checkpoints (screen completion, feature completion, release):')],
    'disp': RP(HUMAN),
    'overlay': [('When Peter requests a process quality check', 'When your human lead requests a process quality check')],
  },
  '#audit-checklist': {'disp': R},
  '#incremental-capture-rule': {'items': [
      ('capture-immediately', 'obligation', 'Document immediately', "When you identify a lesson or discovery during an audit, document it immediately — don't batch for the end of the session."),
      ('capture-running-file', 'obligation', 'Append to lessons-in-progress', "Append to a running `lessons-in-progress.md` in the spec's completion directory."),
      ('capture-both', 'obligation', 'Your discoveries and others’ gaps', "This applies to your own discoveries as well as gaps you find in other agents' capture.")], 'disp': R},
  '#audit-output': {'items': [('output-severity', 'obligation', 'Organize by severity', 'Organize findings by severity (same model as Thurgood):')] + B('#audit-output', 'severity'), 'disp': R},
  '#audit-is-analysis-not-implementation': {'items': [('analysis-not-fix', 'obligation', 'Findings, never fixes', 'An audit produces findings and recommendations. It does NOT produce code fixes.')] + B('#audit-is-analysis-not-implementation', 'route', 'route'), 'disp': R},
  '#operational-mode-claims-audit-execution-claims-verification-the-q5-cut:preamble': {
    'items': [],
    'disp': RP((seg('#operational-mode-claims-audit-execution-claims-verification-the-q5-cut:preamble', '**Authority**', 'Applied to this charter by Spec 127 U3.'), 'subtraction-2')),
    'overlay': [(seg('#operational-mode-claims-audit-execution-claims-verification-the-q5-cut:preamble', '**Authority**', 'Applied to this charter by Spec 127 U3.'),
                 "**Authority**: your team's own decision to run claims audits — record it where your team records such decisions (the owed-set query below keys on that record's date).")],
  },
  cut: {
    'disp': RP(('you already own claims-vs-reality auditing one level up (`audit:coverage-map`, `verify-gate-registration.sh`) — Q5 extends', 'subtraction-3')),
    'overlay': [(CUT_OLD, 'The dividing verb is **author/maintain** vs **adjudicate**. Claims audits cover product and system work alike; they extend *"does the guard guard what it claims"* to *"did the task ship what it claims."*')],
  },
  '#the-trigger-set-the-114-superset-table-names-never-numbers': {
    'disp': RP((TRIG_ROWS['ARMING'], 'subtraction-3'), (TRIG_ROWS['GATE'], 'subtraction-3'), (TRIG_ROWS['STRAGGLER'], 'subtraction-2'), (TRIG_ROWS['BURST'], 'subtraction-3')),
    'overlay': trig_overlay,
  },
  A: {
    'items': CB_ITEMS,
    'disp': RP(('the owed-set predicate keys on', 'subtraction-4'), ('classified per the 112 taxonomy', 'subtraction-4'),
               ('the doc-vs-doc audit my own N6 called', 'subtraction-2'),
               ('**fixed-string exemption usage**; **`(platforms: …)` fallback invocations**; **delegated-tier capture**; **orchestrator consult line**; **re-grounding dispositions**; **populations**; **M3 / M4 / M5**', 'subtraction-3'),
               ('**The emission-reading duty**; **The delegated-tier read**; **The instruments read**', 'subtraction-3'),
               ('<!-- volatile-ok: … -->', 'subtraction-1')),
    'overlay': [(t, CB_NEW)],
  },
  '#the-owed-set-pipeline-your-command-catalogs-owed-set-entry-documented-commands-deliberately-not-a-committed-script': {
    'disp': RP(('.kiro/docs/ballots/2026-09-19-completion-claims-integrity.md', 'subtraction-2'), ('.kiro/hooks/RELEASE-FLOW.md', 'subtraction-1'), ('Q2 re-evaluation sitting', 'subtraction-2')),
    'overlay': [(OWED_OLD, OWED_NEW)],
  },
  '#the-mirror-anti-rot-clause-verbatim-at-countersigned-strength': {'items': [
      ('mirror-clause', 'obligation', 'Unverifiable, never rewritten', '**Stacy may say a criterion is unverifiable; she may never say what it should say.**'),
      ('mirror-called-at-exchange', 'obligation', 'Called at the exchange', 'Named prohibition, named caller-out, **called at the exchange** rather than in a later ledger.'),
      ('mirror-binds-lens', 'obligation', 'It binds the LENS seat', 'It binds the LENS seat specifically.')], 'disp': R},
  '#the-steward-verb-carve-out-his-side-of-the-seam-enumerated-never-a-live-config-reference': {
    'items': [
      ('carve-out-scope', 'obligation', 'The steward-verb carve-out', seg('#the-steward-verb-carve-out-his-side-of-the-seam-enumerated-never-a-live-config-reference', '**Thurgood owns the verification decision', 'Ambiguity resolves to Stacy.**')),
      ('carve-out-falsification', 'obligation', 'Both falsification conditions', seg('#the-steward-verb-carve-out-his-side-of-the-seam-enumerated-never-a-live-config-reference', '**Both falsification conditions are live and ratified with it**', 'dropped, not carried**.')),
      ('carve-out-routing-test', 'obligation', 'The question-routing test', seg('#the-steward-verb-carve-out-his-side-of-the-seam-enumerated-never-a-live-config-reference', 'the **question-routing test**', 'the other says so)')),
      ('carve-out-tiebreak', 'obligation', 'Ambiguity resolves to the verifier', 'the **tiebreaker direction** (ambiguity resolves to Stacy, always — the seam fails toward the verifier)'),
    ],
    # The carve-out is a seam in DesignerPunk's own ratified agreement over its docs-MCP steward verbs; in
    # the consumer's repo the docs MCP serves DesignerPunk's shipped corpus read-only — no steward verbs.
    'disp': NCC('subtraction-3'),
  },
  reach: {
    'disp': RP(('the toolchain charter: `.kiro/issues/2026-09-17-platform-build-verification-harness-candidate.md`', 'subtraction-3'), ('`promised-artifact-exists` its registered, unbuilt mechanical successor', 'subtraction-3'), ('Spec 127', 'subtraction-2')),
    'overlay': [(REACH_OLD, REACH_NEW)],
  },
  '#operational-mode-parity-review:preamble': {'items': [
      ('parity-when', 'obligation', 'Parity review across platforms', 'When multiple platforms have implemented the same screen, conduct a parity review.'),
      ('parity-dormant', 'obligation', 'Dormant until a second platform', 'When a product starts on a single platform, parity review is dormant until a second platform comes online. During the single-platform phase, focus on process audit.')], 'disp': R},
  '#review-process': {'items': B('#review-process', 'parity', 'step'), 'disp': R},
  '#what-parity-means': {'disp': R},
  '#operational-mode-lessons-synthesis-review:preamble': {'items': [('synthesis-lead', 'obligation', 'Lead the synthesis review', 'After a feature or flow is complete across active platforms, lead a synthesis review to process accumulated lessons.')], 'disp': R},
  '#your-role': {
    'items': B('#your-role', 'role', 'step'),
    'disp': RP(HUMAN),
    'overlay': [('- Present to Peter for routing approval', '- Present to your human lead for routing approval')],
  },
  '#what-you-dont-do': {
    'items': B('#what-you-dont-do', 'dont'),
    'disp': RP(HUMAN),
    'overlay': [('— Peter and the system agents make that call', '— your human lead and the system agents make that call'),
                ('you recommend them and Peter decides', 'you recommend them and your human lead decides')],
  },
  '#with-leonardo': {'items': B('#with-leonardo', 'leonardo', 'obligation'), 'disp': R},
  '#with-platform-agents-kenya-data-sparky': {'items': B('#with-platform-agents-kenya-data-sparky', 'platforms', 'obligation'), 'disp': R},
  '#with-thurgood-system-counterpart': {
    'items': B('#with-thurgood-system-counterpart', 'thurgood', 'obligation'),
    'disp': RP(HUMAN, ('(DesignerPunk infrastructure)', 'subtraction-2')),
    'overlay': [('Thurgood looks inward (DesignerPunk infrastructure)', "Thurgood looks inward (the design system's infrastructure)"),
                ('- Peter may consult both together', '- Your human lead may consult both together')],
  },
  '#with-peter': {
    'items': B('#with-peter', 'human', 'obligation'),
    'disp': RP(HUMAN, ("Recognize Peter's skillset largely lives in design and may require assistance with understanding technical nuances", 'subtraction-2')),
    'overlay': [('### With Peter', '### With Your Human Lead'),
                ("- Respect Peter's prioritization of which findings to address", "- Respect your human lead's prioritization of which findings to address"),
                ("\n- Recognize Peter's skillset largely lives in design and may require assistance with understanding technical nuances", '')],
  },
  '#mcp-practice-notes': {
    'items': [
      ('ground-truth-computed', 'obligation', 'Ground truth is computed at audit time', seg('#mcp-practice-notes', '**Ground truth is computed at audit time, never a snapshot**', "run the command, don't read a frozen artifact.")),
      ('standards-on-demand', 'obligation', 'Standards are MCP-served on demand', seg('#mcp-practice-notes', '**Standards are MCP-served on-demand**', 'Test-Development-Standards is your one always-loaded law.')),
      ('product-mcp-caveat', 'obligation', 'Product-MCP maturity caveat', seg('#mcp-practice-notes', '**Product-MCP maturity caveat**', 'rather than treating empty as a finding.')),
      ('mcp-fallback', 'obligation', 'Fallback when a server is down', seg('#mcp-practice-notes', 'if a server is unavailable:', 'if queries consistently fail.')),
    ],
    'disp': RP(('your audit commands (coverage-map, mode-parity, theme-drift, coverage, the governance + gate-registration scripts) are the provisioning.', 'subtraction-1'),
               ('in a design-system-source repo (not a product repo) it may return an empty index.', 'subtraction-1'),
               ('`.kiro/specs/**/completion/` and `docs/specs/`', 'subtraction-4')),
    'overlay': [
      ('— your audit commands (coverage-map, mode-parity, theme-drift, coverage, the governance + gate-registration scripts) are the provisioning.', "— your repo's own audit and test commands are the provisioning."),
      ('the Product MCP is the least-mature of the three; in a design-system-source repo (not a product repo) it may return an empty index.', 'the Product MCP is the least-mature of the three; early in a product it may return a sparse index.'),
      ('(and Grep/Glob over `.kiro/specs/**/completion/` and `docs/specs/` per your knowledge-base fallback)', '(and Grep/Glob over `specs/**/completion/` per your knowledge-base fallback)'),
    ],
  },
  '#collaboration-standards:preamble': {'items': [('apply-aicp', 'obligation', 'Apply the collaboration principles', 'Apply AI-Collaboration-Principles (your always-loaded spine); pull the fuller AI-Collaboration-Framework on demand (docs MCP) when you need the expanded protocols (validation gates, devil\'s-advocate, escalation specifics).')], 'disp': R},
  '#counter-arguments-are-mandatory': {'items': [('counter-provide', 'obligation', 'Run the counter-argument and show the residual', 'When recommending process changes, run your counter-argument against the proposal before presenting, and show the residual.'), ('counter-fold-back', 'obligation', 'Fold back before presenting', FOLD)], 'disp': R},
  '#candid-over-comfortable': {'items': [('candid', 'obligation', 'Say so directly', "If process is being skipped, say so directly and respectfully. Don't let things slide because the team is moving fast.")], 'disp': R},
  '#bias-self-monitoring': {'items': [('bias-watch', 'obligation', 'Watch for the bias patterns', seg('#bias-self-monitoring', 'Watch for:', 'when pragmatism is warranted.'))], 'disp': R},
  '#ask-if-unsure': {
    'items': [('ask', 'obligation', 'Ask rather than guess', "If a standard's application to product work is unclear, ask Thurgood or Peter rather than guessing.")],
    'disp': RP(HUMAN),
    'overlay': [('ask Thurgood or Peter rather than guessing', 'ask Thurgood or your human lead rather than guessing')],
  },
  '#what-you-own': {'items': B('#what-you-own', 'own'), 'disp': R},
  '#what-you-dont-own': {
    'items': B('#what-you-dont-own', 'not-own') + [('jest-not-vitest', 'obligation', 'Jest, not Vitest', 'This project uses Jest, NOT Vitest — never a `--run` flag, never `vitest`.')],
    'disp': RP(('Your audit commands (with their triggering cues) are in the Commands section. This project uses Jest, NOT Vitest — never a `--run` flag, never `vitest`.', 'subtraction-1')),
    'overlay': [('Your audit commands (with their triggering cues) are in the Commands section. This project uses Jest, NOT Vitest — never a `--run` flag, never `vitest`.',
                 "Run your repo's own audit and test scripts — read them from its `package.json` before you run anything.")],
  },
}

fm = {}
for p in leaf_paths('stacy'):
    if p.startswith('toolSubset.') or p.startswith('routes.agents[') or p.startswith('routes.cues[') or p.startswith('ambient[') or \
       p in ('agent', 'agentType', 'description', 'kiro.keyboardShortcut', 'kiro.welcomeMessage', 'preflight[git status --porcelain]', 'ambient.groundTruthManifest.verdict'):
        fm[p] = R
    elif p.startswith('routes.docs['):
        keep = ('contract-validation-process', 'bcv-beyond', 'contract-concept-names', 'product-token-gov-detail', 'test-dev-standards-add',
                'spec-requirements-format', 'spec-tasks-format', 'task-type-classification', 'spec-planning-beyond', 'task-types-beyond')
        fm[p] = R if any(k in p for k in keep) else NCC('subtraction-4')  # DesignerPunk's own spec / completion / workflow process
    elif p.startswith('commands['):
        fm[p] = NCC('subtraction-1')  # DesignerPunk's own audit scripts
    elif p == 'knowledgeBases[completion-docs]':
        fm[p] = {'disposition': 're-pointed'}
    elif p == 'knowledgeBases[spec-summaries]':
        fm[p] = NCC('subtraction-4')
    elif p == 'knowledgeBases[source-tree]':
        fm[p] = R
    elif p == 'writeScope[.kiro/specs/**]':
        fm[p] = {'disposition': 're-pointed'}
    elif p == 'writeScope[docs/specs/**]':
        fm[p] = NCC('subtraction-4')
    else:
        raise SystemExit(f'unclassified {p}')

build({
    'name': 'stacy', 'source': 'canonical/agents/stacy.md', 'owner': 'stacy', 'record_name': 'stacy', 'prefix': 'stacy', 'header': [],
    'disp_header': [
        'canonical/profiles/consumer/stacy.dispositions.yaml — Spec 123 Task 15.4 (design C17; DD25, DD26)',
        'Every body unit and frontmatter leaf carries an explicit row. Re-pointed rows re-ground the role at the',
        "consumer's repo (R5); their text is stacy.overlay.md (## @unit prose, ## @entry YAML values, 15.0 (b) erratum).",
        "The owed-set pipeline's re-grounding is G1 run 1's committed exemplar E rendering, verbatim.",
    ],
    'units': units, 'frontmatter': fm,
    'entry_values': {'writeScope[.kiro/specs/**]': 'specs/**\n', 'knowledgeBases[completion-docs]': 'name: completion-docs\nglobs:\n  - "specs/*/completion/**"\n'},
})
