from spec_identity_common import identity, R, RP, NCC, HUMAN, unit_texts
from build_profile import normative_items
# ---- DesignerPunk Systems Overview: an orientation reference to the upstream system; only the links re-point
T = unit_texts('.kiro/steering/DesignerPunk-Systems-Overview.md', 'designerpunk-systems-overview')
units = {a: {'items': normative_items(T[a], a.strip('#').split(':')[0][:16]), 'disp': R} for a in T}
LINK = '(./Civitas-System-Overview.md)'
for a in ('#overview', '#related-documentation'):
    units[a].update({'disp': RP((LINK, 'subtraction-5')), 'overlay': [(LINK, '(./designerpunk-civitas-system-overview.md)')]})
identity('designerpunk-systems-overview', 'DesignerPunk-Systems-Overview', units)

# ---- Civitas System Overview: re-grounded as the consumer's own governance layer ("their Civitas, not ours")
T = unit_texts('.kiro/steering/Civitas-System-Overview.md', 'civitas-system-overview')
units = {a: {'items': normative_items(T[a], a.strip('#').split(':')[0][:16]), 'disp': R} for a in T}
ov = T['#overview']
units['#overview'].update({
    'disp': RP(('Civitas is the governance layer of DesignerPunk', 'subtraction-2')),
    'overlay': [('Civitas is the governance layer of DesignerPunk, named alongside Rosetta (tokens) and Stemma (components) as the third foundational system.',
                 'Civitas is the governance layer — in DesignerPunk, and in this repo, which inherits the pattern: named alongside Rosetta (tokens) and Stemma (components) as the third foundational system. This repo\'s Civitas is its own, not DesignerPunk\'s.')],
})
wc = T['#what-civitas-contains']
WC_OLD = wc[wc.index('**Steering documentation**'):wc.index('\n---')]
WC_NEW = '''**Identity documentation** (always loaded):
- The generated `designerpunk-*` identity members — this repo's collaboration principles, feedback protocol, startup checklist, completion protocol, agent directory, and these overviews
- Your team's personal note (`.designerpunk/personal-note.local.md`, local to each machine)

**MCP servers** (from the installed package):
- Docs MCP: serves DesignerPunk's shipped documentation corpus, read-only
- Application MCP: serves component and token metadata for this design system
- Product MCP: serves this product's screens, product tokens and context

**Agent configurations** (8 agents):
- 3 system agents (Ada/Rosetta, Lina/Stemma, Thurgood/Civitas) that build and maintain this design system
- 5 product agents (Leonardo, Sparky, Kenya, Data, Stacy) that use the design system to build products
- Each agent is generated for your agent tool; regenerate rather than hand-edit

**Spec infrastructure**:
- Your specs (starting from the shipped starter specs) encoding decisions and implementation history
- Spec workflow: design outline → feedback → requirements → design → tasks → execution
- Feedback protocol, formalization gates, completion documentation'''
units['#the-three-layer-boundary'].update({'disp': RP(HUMAN), 'overlay': [('→ Peter arbitrates if they disagree', '→ your human lead arbitrates if they disagree')]})
units['#what-civitas-contains'].update({
    'disp': RP(('the counts and inventory of DesignerPunk\'s own steering docs, MCP index, hooks, scripts, knowledge bases and specs', 'subtraction-3')),
    'overlay': [(WC_OLD, WC_NEW)],
})
DA = T['#document-access']
old = DA[DA.index('This is an identity doc (Spec 119)'):DA.index('always loaded in full')]
units['#document-access'].update({'disp': RP(('This is an identity doc (Spec 119) — never MCP-served,', 'subtraction-2')),
    'overlay': [(old, 'This is a generated identity member (`designerpunk-civitas-system-overview.md`) — never MCP-served, ')]})
identity('civitas-system-overview', 'Civitas-System-Overview', units)
