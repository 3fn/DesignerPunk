/**
 * @category evergreen
 * @purpose Verify the WORKFLOW_RULES import wiring (C2.4) and the validate-stage
 *          anti-duplication guard: KNOWN_WORKFLOW_RULE_IDS stays in sync with the live
 *          mcp-server package-entry re-export, and guardNoWorkflowRuleDuplication rejects
 *          canonical bodies that hand-restate an encoded rule while accepting clean prose.
 *
 * Imports WORKFLOW_RULES from `mcp-server/dist/rules/workflow-rules` (compiled build
 * output, side-effect-free — unlike `mcp-server/dist/index`, which runs the MCP server's
 * main() at import time; see workflow-rules-guard.ts's file header) rather than
 * `mcp-server/src/...`, which would violate this package's tsconfig.json `rootDir: "."`
 * (TS6059). This is still the real, live WORKFLOW_RULES array — the same one re-exported
 * from the package entry per 121 Task 6 — just reached via the compiled sibling module
 * instead of the entry file, to avoid both the rootDir violation and the main() side effect
 * in a single import.
 */

import { WORKFLOW_RULES } from '../../../mcp-server/dist/rules/workflow-rules';
import {
  KNOWN_WORKFLOW_RULE_IDS,
  guardNoWorkflowRuleDuplication,
  guardCanonicalAgentBodies,
} from '../workflow-rules-guard';

describe('KNOWN_WORKFLOW_RULE_IDS stays in sync with the live WORKFLOW_RULES export', () => {
  it('matches the live array exactly (drift fails here, not silently)', () => {
    const liveIds = WORKFLOW_RULES.map((rule) => rule.id).sort();
    const knownIds = [...KNOWN_WORKFLOW_RULE_IDS].sort();
    expect(knownIds).toEqual(liveIds);
  });
});

describe('guardNoWorkflowRuleDuplication — positive (rejects hand-restated rules)', () => {
  it('flags a body that hand-restates the summary-first rule id phrase', () => {
    const body = [
      '## Workflow Notes',
      '',
      'Remember the summary-first rule: always call get_document_summary before get_section.',
    ].join('\n');
    const errors = guardNoWorkflowRuleDuplication(body);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].ruleId).toBe('summary-first');
  });

  it('flags a body that restates the normative statement fragment without using the id', () => {
    const body =
      'Summary first (hard rule): before retrieving a multi-section logical unit, call get_document_summary.';
    const errors = guardNoWorkflowRuleDuplication(body);
    expect(errors.length).toBeGreaterThan(0);
  });

  it('reports the correct line number for a hit later in the body', () => {
    const body = ['line one', 'line two', 'this restates summary-first explicitly'].join('\n');
    const errors = guardNoWorkflowRuleDuplication(body);
    expect(errors[0].line).toBe(3);
  });
});

describe('guardNoWorkflowRuleDuplication — negative (accepts clean prose)', () => {
  it('passes prose that never mentions a known rule phrase', () => {
    const body = 'This agent audits test coverage and flags gaps for domain specialists.';
    const errors = guardNoWorkflowRuleDuplication(body);
    expect(errors).toEqual([]);
  });

  it('passes prose that mentions get_document_summary/get_section for unrelated reasons', () => {
    const body =
      'Use get_document_summary to preview a doc, and get_section to pull one heading when you already know the shape you need.';
    const errors = guardNoWorkflowRuleDuplication(body);
    expect(errors).toEqual([]);
  });
});

describe('guardCanonicalAgentBodies — multi-doc scan surface', () => {
  it('returns only docs with hits, each carrying its sourcePath', () => {
    const docs = [
      { sourcePath: 'canonical/agents/ada.md', body: 'Clean prose, no restatement.' },
      {
        sourcePath: 'canonical/agents/lina.md',
        body: 'Always remember: summary-first (hard rule) applies to every query.',
      },
    ];
    const results = guardCanonicalAgentBodies(docs);
    expect(results).toHaveLength(1);
    expect(results[0].sourcePath).toBe('canonical/agents/lina.md');
    expect(results[0].errors.length).toBeGreaterThan(0);
  });

  it('returns an empty array when no canonical body restates a rule', () => {
    const docs = [
      { sourcePath: 'canonical/agents/ada.md', body: 'Clean.' },
      { sourcePath: 'canonical/agents/lina.md', body: 'Also clean.' },
    ];
    expect(guardCanonicalAgentBodies(docs)).toEqual([]);
  });
});
