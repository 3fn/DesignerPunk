from spec_identity_common import identity, R, RP, NCC, HUMAN, bullets, unit_texts
T = unit_texts('.kiro/steering/core-goals.md', 'core-goals')
t = T['#development-practices']
def seg(a, s, e):
    x = T[a]; i = x.index(s); j = x.index(e, i) + len(e); return x[i:j]
TASK_OLD = seg('#development-practices', '**Task Completion:**', '- Spec planning: `Process-Spec-Planning.md` (Layer 2, conditional)')
TASK_NEW = '''**Task Completion:**
- Follow your repo's own task-completion workflow — branch, review, and merge as your team does; the human lead's acceptance is the authorization act (see the Task Completion Protocol member)

**For detailed workflow guidance, see:**
- Spec planning: `process-spec-planning` (docs MCP, conditional)'''
ARCH_OLD = seg('#core-project-context', '**For detailed architectural guidance, see:**', '`preserved-knowledge/token-architecture-2-0-mathematics.md`')
ARCH_NEW = '''**For detailed architectural guidance, see (docs MCP):**
- True Native Architecture: `platform-implementation-guidelines`
- Token System: `rosetta-system-architecture`
- Mathematical Foundation: `rosetta-system-principles`'''
units = {
  '#core-goals:preamble': {'items': [], 'disp': R},
  '#core-project-context': {
    'items': bullets(T['#core-project-context'], 'principle', 'obligation', only={1, 2, 3, 4, 5, 6}),
    'disp': RP(('DesignerPunk is a True Native cross-platform design system', 'subtraction-2'), (ARCH_OLD, 'subtraction-5')),
    'overlay': [('DesignerPunk is a True Native cross-platform design system with mathematical foundations, built for Human-AI collaboration.',
                 'This design system is built on DesignerPunk — a True Native cross-platform design system with mathematical foundations, built for Human-AI collaboration — and carries its principles.'),
                (ARCH_OLD, ARCH_NEW)],
  },
  '#development-practices': {
    'items': bullets(t, 'practice', 'obligation', only={1, 2, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 26, 27}) +
             [('construction-rule', 'obligation', 'Component token construction', "Component tokens must either reference an existing primitive token OR conform to how that primitive token family's values are defined. Never introduce arbitrary values at the component level that don't align with the underlying token family's value system.")],
    'disp': RP(('`./.kiro/hooks/complete-task.sh "Task Name"` opens the task PR; Peter merges on green', 'subtraction-1'), ('Repository: https://github.com/3fn/DesignerPunk (PR-gated workflow: branch protection on `main`, admins included)', 'subtraction-2'),
               ('`Process-Development-Workflow.md` (Layer 2); `Process-File-Organization.md` (Layer 2)', 'subtraction-4')),
    'overlay': [(TASK_OLD, TASK_NEW)],
  },
}
identity('core-goals', 'core-goals', units)
