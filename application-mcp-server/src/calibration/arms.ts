/**
 * Tier-rule ARMS for the components calibration instrument
 * (charter `.kiro/issues/2026-10-17-components-calibration-instrument-charter.md` §§ 8, 10).
 *
 * Every arm is a PURE function over evidence the tool already emits on a keyword row
 * (`matchedOn`, matchedTokens / totalTokens, and — for R3 — the row's `name` and `family`).
 * No arm reads the index, so every tier stays recomputable (Req 6.2 / P5).
 *
 * The matcher is NOT changed here: the status-quo arm IMPORTS the shipped
 * `deriveMatchConfidence`; parity and R3 are candidate rules, measured, never shipped by this file.
 */

import { tokenizeForMatch } from '../indexer/ComponentIndexer';
import { deriveMatchConfidence, MatchConfidence, MatchedOnEntry } from '../query/QueryEngine';

export type ArmName = 'status-quo' | 'parity' | 'r3';
export const ARM_NAMES: readonly ArmName[] = ['status-quo', 'parity', 'r3'];

/** The evidence one keyword row carries (all fields are on the emitted row or derivable from the query). */
export interface RowEvidence {
  name: string;
  family: string;
  matchedOn: MatchedOnEntry[];
  /** distinct salient query tokens matched in any field */
  matchedTokens: number;
  /** salient query tokens (the coverage denominator) */
  totalTokens: number;
}

const hasHighSignal = (e: RowEvidence): boolean => e.matchedOn.some(m => m.field === 'highSignal');

/**
 * Status quo: the SHIPPED rule, imported (charter § 8) — whatever `deriveMatchConfidence` is on
 * the measured SHA. Since the R3 turn (rubric amendment 2026-10-17) the shipped rule IS R3, so on
 * the spent q1 set `--arms status-quo,r3` must report the two arms identical (regression guard).
 */
export function statusQuoArm(e: RowEvidence): MatchConfidence {
  return deriveMatchConfidence(e.matchedOn, e.matchedTokens, e.totalTokens, { name: e.name, family: e.family });
}

/**
 * Parity (charter § 8): `strong` iff ≥ 1 high-signal hit AND matchedTokens / totalTokens ≥ 0.5
 * (the docs rubric's coverage branch; no exact-multi-token branch). Otherwise `partial`; `none` on zero.
 */
export function parityArm(e: RowEvidence): MatchConfidence {
  if (e.matchedTokens === 0) return 'none';
  return hasHighSignal(e) && e.matchedTokens / e.totalTokens >= 0.5 ? 'strong' : 'partial';
}

/**
 * R3 (charter § 10, row "R3" — "names beat purpose"):
 *   `strong` = ≥ 1 high-signal-field hit AND either
 *     (i)  a matched query token is a token of the component's own `name` or its `family`, or
 *     (ii) ≥ 2 salient query tokens matched AND they are more than half of the salient query tokens.
 *   `partial` = any other match.  `none` = zero tokens matched.
 * Name / family tokens use the matcher's own normalization (`tokenizeForMatch`).
 */
export function r3Arm(e: RowEvidence): MatchConfidence {
  if (e.matchedTokens === 0) return 'none';
  if (!hasHighSignal(e)) return 'partial';
  const anchor = new Set([...tokenizeForMatch(e.name), ...tokenizeForMatch(e.family)]);
  const anchored = e.matchedOn.some(m => anchor.has(m.term));
  const supported = e.matchedTokens >= 2 && e.matchedTokens / e.totalTokens > 0.5;
  return anchored || supported ? 'strong' : 'partial';
}

export const ARMS: Readonly<Record<ArmName, (e: RowEvidence) => MatchConfidence>> = {
  'status-quo': statusQuoArm,
  parity: parityArm,
  r3: r3Arm,
};
