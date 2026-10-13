/**
 * find_docs deep-heading gate — CORPUS GUARD against the plain-H3 regressions (indexer fix 2).
 *
 * Indexing every H3 as a plain high-signal field (the Stage 1 counterfactual, findings
 * .kiro/docs/discovery-study-stage1-findings.md § 6.7) broke these cases: generic H3s in large docs
 * scattered the query's tokens and outranked the right doc. The co-occurrence gate must not.
 *
 * GUARD, NOT A TUNING TARGET: the Stage 1 queries below come from Q2, which is spent for matcher
 * tuning (rubric, alias-hygiene amendment). They pin a known failure mode only. Reads the live
 * served corpus (governance/), so a doc edit can move a rank; a failure here means "re-check the
 * gate", not "edit the doc".
 */

import * as path from 'path';
import { DocumentIndexer } from '../../indexer/DocumentIndexer';
import { findDocsConcept } from '../QueryEngine';
import { DocumentMetadata } from '../../models';

const GOVERNANCE = path.resolve(__dirname, '../../../../governance');

let docs: DocumentMetadata[];
let idOf: Map<string, string>;

beforeAll(async () => {
  const ix = new DocumentIndexer();
  await ix.indexDirectory(GOVERNANCE);
  docs = ix.getAllDocuments();
  idOf = new Map(docs.map((d) => [d.path, d.id]));
});

function rankOf(query: string, expectedId: string): number | null {
  const i = findDocsConcept(docs, query).data.findIndex((e) => idOf.get(e.path) === expectedId);
  return i < 0 ? null : i + 1;
}

describe('plain-H3 regressions stay fixed under the gate', () => {
  it.each([
    ['KE-06', 'behavioral contract validation ios implementation', 'test-behavioral-contract-validation'],
    ['DA-06', 'how to verify a behavioral contract in an android implementation', 'test-behavioral-contract-validation'],
    ['SP-05', 'screen test structure categories naming jest web component', 'test-development-standards'],
    ['KE-03', 'which token for touch target size', 'token-family-accessibility'],
  ])('%s: %s → %s at rank ≤ 2', (_id, query, expected) => {
    const r = rankOf(query, expected);
    expect(r).not.toBeNull();
    expect(r!).toBeLessThanOrEqual(2);
  });

  it('oracle "base variant inheritance patterns" → component-inheritance-structures at rank 1', () => {
    expect(rankOf('base variant inheritance patterns', 'component-inheritance-structures')).toBe(1);
  });
});
