from spec_identity_common import identity, R, RP, NCC, HUMAN, bullets, unit_texts
T = unit_texts('.kiro/steering/AI-Collaboration-Principles.md', 'ai-collaboration-principles')
FB = '*(Fold-back discipline ratified 2026-09-19 — `.kiro/docs/ballots/2026-09-19-counter-argument-fold-back.md`.)*'
units = {
  '#ai-collaboration-principles:preamble': {'items': [], 'disp': R},
  '#the-ai-optimism-problem': {'items': [('antidote', 'obligation', 'The antidote', '**Antidote**: Mandatory skepticism, counter-arguments, and candid communication.')], 'disp': R},
  '#candid-vs-brutal-communication': {'items': bullets(T['#candid-vs-brutal-communication'], 'mode') + [('default-candid', 'obligation', 'Default to candid', '**Default to candid. Escalate to brutal only when repeated candid warnings are dismissed or stakes are critical.**')], 'disp': R},
  '#counter-argument-requirement': {
    'items': [('provide', 'obligation', 'Provide and use a counter-argument', 'For every significant recommendation, provide at least one strong counter-argument — and **use it before you present it**:')] + bullets(T['#counter-argument-requirement'], 'fold', 'step') +
             [('never-pitch', 'obligation', 'Never the unqualified pitch', 'Never: "I recommend X because it will solve your problems."'), ('never-manufacture', 'obligation', 'Never manufacture an objection', 'And never manufacture an absorbable objection to display a revision')],
    'disp': RP((FB, 'subtraction-2')),
    'overlay': [('\n\n' + FB, '')],
  },
  '#exploratory-vs-directive-questions': {'items': [('distinction', 'obligation', 'Exploratory is not directive', '**Critical distinction**: "What do you think about X?" is NOT "Please do X."'), ('ask', 'obligation', 'Ask when uncertain', 'When uncertain, ask: "Would you like me to implement this, or are you looking for analysis first?"')], 'disp': R},
  '#bias-self-monitoring': {'items': bullets(T['#bias-self-monitoring'], 'watch') + [('name-it', 'obligation', 'Name the bias', 'When you notice bias: "I notice I\'m being [optimistic/agreeable/complex] — here\'s a more balanced view..."')], 'disp': R},
  '#when-human-and-ai-disagree': {
    'items': bullets(T['#when-human-and-ai-disagree'], 'disagree', 'step'),
    'disp': RP(('`.kiro/docs/alternative-paths-log.md`', 'subtraction-1')),
    'overlay': [('Document the alternative in `.kiro/docs/alternative-paths-log.md` if meaningful trade-offs exist', "Document the alternative in your repo's alternative-paths log if meaningful trade-offs exist")],
  },
  '#certainty-calibration-finding-guidance-before-you-guess': {'items': bullets(T['#certainty-calibration-finding-guidance-before-you-guess'], 'calibrate', 'step'), 'disp': R},
  '#mcp-query-for-full-framework': {'items': [], 'disp': R},
}
identity('ai-collaboration-principles', 'AI-Collaboration-Principles', units)
