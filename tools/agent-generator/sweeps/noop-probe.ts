#!/usr/bin/env node
/**
 * The shared C6 no-op probe — Spec 122 Task 7.3 (C9 / Req 20 AC2).
 *
 * Computes the DD7 input-closure hash + guarded-surface output hash and compares BOTH to
 * `canonical/generated.lock`. Prints `noop=true|false` (with the hashes as printed evidence
 * — the did-it-really-run discipline: the decision is auditable, not asserted) in
 * `$GITHUB_OUTPUT` format on stdout.
 *
 * Used by `.github/workflows/agent-generator.yml`'s setup job: when the lock matches, every
 * 122 check job early-exits green in seconds — the unfiltered `pull_request` trigger
 * (125-A Req 2.3: required checks SHALL NOT be path-filtered) costs seconds on unrelated
 * PRs. Always exits 0: this is a PROBE feeding a job output, never a gate — the gates are
 * the ten check jobs themselves.
 */

import { computeInputClosureHash, computeOutputsHash, readLock } from '../diff-guard';
import { repoRootFromHere } from './common';

const repoRoot = repoRootFromHere();
const lock = readLock(repoRoot);
const inputClosure = computeInputClosureHash(repoRoot);
const outputs = computeOutputsHash(repoRoot);
const noop = lock !== undefined && lock.inputClosure === inputClosure && lock.outputs === outputs;

// Evidence to stderr (job log); ONLY the `noop=` line to stdout — the workflow tees stdout
// into $GITHUB_OUTPUT, whose parser must see nothing but `key=value` lines.
console.error(`lock.inputClosure=${lock?.inputClosure ?? '<no lock>'}`);
console.error(`fresh.inputClosure=${inputClosure}`);
console.error(`lock.outputs=${lock?.outputs ?? '<no lock>'}`);
console.error(`fresh.outputs=${outputs}`);
console.log(`noop=${noop}`);
