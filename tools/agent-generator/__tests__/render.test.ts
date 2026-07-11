/**
 * @category evergreen
 * @purpose Verify the class-c render operations and class-b pass-through: verbatim body,
 *          WORKFLOW_RULES filter-by-appliesToTools + deterministic render + propagation,
 *          FIELD-DRIVEN write-scope notes (different paths -> different note, Req 11 AC3),
 *          enum-driven run-context annotations (Req 12 AC3), and field-assembled cues.
 */

import {
  renderPassThrough,
  renderWorkflowRules,
  renderWriteScopeNote,
  renderRunContextAnnotation,
  renderToolCue,
  renderDocRoute,
  renderGroundTruthFaithfulness,
} from '../render';
import type { GroundTruthDirective } from '../compose';
import type { WorkflowRule } from '../workflow-rules-guard';

function rule(overrides: Partial<WorkflowRule> & Pick<WorkflowRule, 'id' | 'appliesToTools' | 'statement'>): WorkflowRule {
  return {
    severity: 'hard',
    audience: 'all-agents',
    rationale: 'r',
    requirements: [],
    ...overrides,
  } as WorkflowRule;
}

describe('renderPassThrough (class-b) — verbatim', () => {
  it('returns the body byte-identical, including odd whitespace and markup', () => {
    const body = '## H\n\n  indented\ttab\n---\n`code` and a trailing space \n';
    expect(renderPassThrough(body)).toBe(body);
  });
});

describe('renderWorkflowRules (Req 4) — filter, render, determinism, propagation', () => {
  const summaryFirst = rule({
    id: 'summary-first',
    appliesToTools: ['get_section', 'get_document_summary'],
    statement: 'Call get_document_summary before get_section.',
  });
  const tokenRule = rule({
    id: 'token-first',
    appliesToTools: ['get_token_details'],
    statement: 'Prefer semantic tokens.',
  });

  it('includes a rule only when the agent has one of its governed tools', () => {
    const out = renderWorkflowRules([summaryFirst, tokenRule], ['get_section']);
    expect(out).toContain('get_document_summary before get_section');
    expect(out).not.toContain('semantic tokens');
  });

  it('renders the statement verbatim as a bullet', () => {
    expect(renderWorkflowRules([summaryFirst], ['get_document_summary'])).toBe(
      '- Call get_document_summary before get_section.'
    );
  });

  it('sorts applicable rules by id for determinism', () => {
    const out = renderWorkflowRules([tokenRule, summaryFirst], ['get_section', 'get_token_details']);
    expect(out).toBe('- Call get_document_summary before get_section.\n- Prefer semantic tokens.');
  });

  it('returns empty string when no rule applies', () => {
    expect(renderWorkflowRules([summaryFirst], ['some_unrelated_tool'])).toBe('');
  });

  it('propagates a statement change at source with no per-agent edit (Req 4 AC2)', () => {
    const edited = rule({ ...summaryFirst, statement: 'NEW: summary before section, always.' });
    expect(renderWorkflowRules([edited], ['get_section'])).toBe('- NEW: summary before section, always.');
  });
});

describe('renderWriteScopeNote (Req 11 AC3) — field-driven', () => {
  it('renders the allowed paths into the note', () => {
    const note = renderWriteScopeNote(['.kiro/specs/**', 'docs/specs/**']);
    expect(note).toContain('.kiro/specs/**');
    expect(note).toContain('docs/specs/**');
  });

  it('a different allowedPaths yields a DIFFERENT note (the field-driven requirement)', () => {
    const a = renderWriteScopeNote(['.kiro/specs/**', 'docs/specs/**']);
    const b = renderWriteScopeNote(['src/tokens/**']);
    expect(a).not.toBe(b);
  });

  it('handles an empty write scope explicitly (read-only)', () => {
    expect(renderWriteScopeNote([])).toContain('read-only');
  });
});

describe('renderRunContextAnnotation (Req 12 AC3) — enum-driven', () => {
  it('yields no annotation for this-repo', () => {
    expect(renderRunContextAnnotation('this-repo')).toBe('');
  });

  it('yields a fixed tag for consumer-repo and per-product', () => {
    expect(renderRunContextAnnotation('consumer-repo')).toContain('not this repo');
    expect(renderRunContextAnnotation('per-product')).toContain('per product');
  });
});

describe('cue / route sentences — assembled from fields (P4)', () => {
  it('renders a tool cue as a WHEN/THEN sentence', () => {
    expect(renderToolCue({ when: 'you need Android token values', tool: 'get_token_details', mcp: 'application' })).toBe(
      'WHEN you need Android token values THEN use get_token_details (application MCP)'
    );
  });

  it('renders a doc route by id/heading, never a physical path', () => {
    const out = renderDocRoute({
      id: 'x',
      doc: 'rosetta-system-architecture',
      section: 'Module-Resolution Contract (Spec 118)',
      when: 'touching runtime-TS loading',
    });
    expect(out).toBe(
      'WHEN touching runtime-TS loading THEN consult rosetta-system-architecture § "Module-Resolution Contract (Spec 118)"'
    );
    expect(out).not.toContain('governance/');
  });
});

describe('renderGroundTruthFaithfulness (Req 10 AC3) — verdicts honored as data', () => {
  it('renders the assembly-grain faithfulness cue from faithfulnessVerbs, tool names via the caller', () => {
    const directive: GroundTruthDirective = {
      verdict: 'catalog-is-manifest',
      emitArtifactRefs: true,
      faithfulnessVerbs: ['get_component_full', 'get_component_health'],
    };
    const out = renderGroundTruthFaithfulness(directive, (t) => `mcp__designerpunk-application__${t}`);
    expect(out).toContain('assembly-grain, not catalog enumeration');
    expect(out).toContain('`mcp__designerpunk-application__get_component_full`');
    expect(out).toContain('`mcp__designerpunk-application__get_component_health`');
    expect(out).toContain('never a standing snapshot');
  });

  it('returns undefined when the directive carries no faithfulness verbs (none-standing et al.)', () => {
    const directive: GroundTruthDirective = { verdict: 'none-standing', emitArtifactRefs: true };
    expect(renderGroundTruthFaithfulness(directive, (t) => t)).toBeUndefined();
  });
});
