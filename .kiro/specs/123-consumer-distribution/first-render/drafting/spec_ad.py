from spec_identity_common import identity, R, RP, NCC, HUMAN, unit_texts
from build_profile import normative_items
T = unit_texts('.kiro/steering/Agent-Directory.md', 'agent-directory')
N = lambda a, p: normative_items(T[a], p)
units = {a: {'items': N(a, a.strip('#').split(':')[0][:20]), 'disp': R} for a in T}
units['#agent-directory:preamble']['items'] = []
import re
for a, t in T.items():
    extra = []
    for line in t.split('\n'):
        l = line.strip()
        if l.startswith('**Owns**:') or l.startswith('**When to involve**:') or l.startswith('**Key boundary**:'):
            extra.append(l)
    have = {i[3] for i in units[a]['items']}
    units[a]['items'] += [(f"{a.strip('#')[:14]}-role-{k}", 'member', re.sub(r'[*`]', '', x)[:60], x) for k, x in enumerate(extra, 1) if x not in have]
CR = '#cross-domain-routing'
rows = [l.strip() for l in T[CR].split('\n') if l.startswith('| ') and not l.startswith('| Situation') and not l.startswith('|---')]
units[CR]['items'] = [(f'route-{k}', 'route', re.sub(r'[*`|]', '', r).strip()[:60], r) for k, r in enumerate(rows, 1)]
PA = '#primary-agent-orchestrator'
units[PA]['items'] = [
    ('orchestrate', 'obligation', 'Orchestrate; occupy no seat', '**You orchestrate. You do not occupy seats.**'),
    ('owners', 'obligation', 'Everything else belongs to an owner', '**Everything else belongs to an owner**'),
    ('brief-once', 'obligation', 'Brief the owning agent once per unit', '**brief the owning agent once per unit and continue that agent across it**'),
    ('seam', 'obligation', 'Record what was ruled; the owner authors', '**The seam**: adjudication with Peter is yours — you record what was ruled; the owner authors the artifact that carries it.'),
    ('consult', 'obligation', 'Consult before you recommend', T[PA][T[PA].index('**Consult before you recommend.**'):T[PA].index('**A brief that meets a trigger')].strip()),
    ('class-option', 'obligation', 'Present one class-level option', T[PA][T[PA].index('**Present one class-level option.**'):T[PA].index('It carries its surviving')].strip()),
    ('leave-record', 'obligation', 'Leave the record', T[PA][T[PA].index('**Leave the record.**'):T[PA].index('\n', T[PA].index('**Leave the record.**'))].strip()),
]
LR_OLD = '(governance, steering, ballots, charters, a spec\'s requirements/design, a non-checkbox `tasks.md` hunk, `canonical/adjudications.yaml`)'
units[PA].update({'disp': RP(HUMAN, (LR_OLD, 'subtraction-2')), 'overlay': [
    ('synthesis, and facing Peter.', 'synthesis, and facing your human lead.'),
    ('**The seam**: adjudication with Peter is yours', '**The seam**: adjudication with your human lead is yours'),
    ('before you present it to Peter or brief an agent', 'before you present it to your human lead or brief an agent'),
    ('Every options message to Peter,', 'Every options message to your human lead,'),
    (LR_OLD, "(your team's governance and shared docs, agent charters, a spec's requirements/design, a non-checkbox `tasks.md` hunk)"),
]})
TH = '#thurgood-test-governance-spec-standards-civitas-steward'
TH_OWNS_OLD = 'governance standards, the `completion-criteria-parity` instrument (checker source, CI wiring, gate registration), **the CI regime\'s standing test-lane scope (`lane-timing.yml` test-script steps with floors; ballot 2026-09-27-ci-regime-standing-scope)**, **Civitas infrastructure**'
units[TH].update({'disp': RP(('the `completion-criteria-parity` instrument (checker source, CI wiring, gate registration)', 'subtraction-3'), ("the CI regime's standing test-lane scope (`lane-timing.yml` test-script steps with floors; ballot 2026-09-27-ci-regime-standing-scope)", 'subtraction-2'), ('(Q5, ratified 2026-09-17)', 'subtraction-2')),
    'overlay': [(TH_OWNS_OLD, 'governance standards, the checks that enforce completion standards, **Civitas infrastructure**'),
                ('**Charter cut (Q5, ratified 2026-09-17)**:', '**Charter cut**:')]})
ST = '#stacy-product-governance-quality-assurance-execution-claims-verification'
units[ST].update({'disp': RP(('/ ARMING', 'subtraction-3'), ('(Q5, ratified 2026-09-17)', 'subtraction-2')),
    'overlay': [('(LENS / CLOSEOUT / MIDPOINT / RELEASE / SYMPTOM / ARMING)', '(LENS / CLOSEOUT / MIDPOINT / RELEASE / SYMPTOM)'),
                ('**Charter cut (Q5, ratified 2026-09-17)**:', '**Charter cut**:')]})
HL = '#human-lead'
HL_OLD = T[HL][T[HL].index('**Peter Michaels Allen**'):].rstrip('\n')
units[HL] = {'items': [('final-decisions', 'obligation', 'The human lead makes all final decisions', '**Peter Michaels Allen** — makes all final decisions.'), ('partners', 'obligation', 'Partners, not tools', 'Agents are partners, not tools.'),
                       ('authority', 'obligation', 'Authority over scope, priorities, direction', 'Peter has authority over scope, priorities, and direction.'),
                       ('disagree', 'obligation', 'Document and proceed', "When agents disagree with Peter's decision, they document the alternative and proceed constructively.")],
             'disp': RP(('**Peter Michaels Allen**', 'subtraction-2'), HUMAN),
             'overlay': [(HL_OLD, "**Your human lead** — makes all final decisions. Agents are partners, not tools. Your human lead has authority over scope, priorities, and direction. When agents disagree with your human lead's decision, they document the alternative and proceed constructively.")]}
identity('agent-directory', 'Agent-Directory', units)
