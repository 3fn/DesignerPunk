from spec_identity_common import identity, R, RP, NCC, HUMAN, unit_texts
from build_profile import normative_items
T = unit_texts('.kiro/steering/Spec-Feedback-Protocol.md', 'spec-feedback-protocol')
N = lambda a, p: normative_items(T[a], p)
units = {a: {'items': N(a, a.strip('#').split(':')[0][:24]), 'disp': R} for a in T}
units['#sequential-formalization-gate']['items'].append(('waiver', 'obligation', 'The waiver is the human lead’s', '**Waiver**: Peter may waive sequential gates for lightweight specs where cascading risk is low.'))
units['#sequential-formalization-gate'].update({'disp': RP(HUMAN), 'overlay': [('**Waiver**: Peter may waive', '**Waiver**: Your human lead may waive')]})
units['#the-feedback-document'].update({'disp': RP(('.kiro/specs/[spec-name]/', 'subtraction-4')),
    'overlay': [('.kiro/specs/[spec-name]/feedback.md', 'specs/[spec-name]/feedback.md'), ('.kiro/specs/[spec-name]/feedback/', 'specs/[spec-name]/feedback/')]})
DA = T['#document-access']
old = DA[DA.index('This is an identity doc (Spec 119)'):DA.index('always loaded in full')]
units['#document-access'].update({'disp': RP(('This is an identity doc (Spec 119) — never MCP-served,', 'subtraction-2')),
    'overlay': [(old, 'This is a generated identity member (`designerpunk-spec-feedback-protocol.md`) — never MCP-served, ')]})
identity('spec-feedback-protocol', 'Spec-Feedback-Protocol', units)
