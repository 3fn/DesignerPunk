/**
 * Console-fail hook (125-B, Requirement 11 / Design C8).
 *
 * Captures console.error/console.warn per test and FAILS the test when
 * unallowlisted output is produced. Checked against the checked-in
 * allowlist (`src/__tests__/console-allowlist.json`, a (suite × message-pattern)
 * grain — see that file for entries + reasons, and
 * governance/classification-map.md § "console-fail-root-lanes" for the rule
 * this hook enforces).
 *
 * SCOPE — root functional lanes ONLY (wired via the root jest.config.js's
 * `setupFilesAfterEnv`). Sub-package suites (mcp-server, application-mcp-server
 * — own jest 29 configs outside this repo's root `roots`) are NOT covered by
 * this hook; see governance/classification-map.md
 * § "console-fail-subpackage-deferred" for the recorded deferral.
 * `product-mcp-server/src/**` IS covered — it lives inside root `roots`.
 *
 * VERSION-AGNOSTIC BY DESIGN (125-B C8 constraint, recorded for any future
 * sub-package replication): plain `jest.spyOn` / method-swap capture only —
 * no jest-30-only API. Stable on jest 29 and jest 30.
 *
 * Known limitation (recorded, not solved here): suites that install their
 * OWN console.error/warn spy on top of this hook's (26 files predate this
 * hook — "house style", nested `describe`-level `beforeEach`, which runs
 * AFTER this hook's root-level `beforeEach`) shadow this hook for the
 * duration of their own mock. Output fully swallowed by a local mock's
 * `mockImplementation(() => {})` never reaches this hook (nothing to check
 * — correct no-op). Output a local mock passes through (e.g. Chip's
 * "anything else passes through" pattern) DOES reach this hook via the
 * bound reference the local suite captured. Because this hook is a plain
 * property swap rather than a `jest.spyOn` mock (see below), a local
 * suite's own `jest.restoreAllMocks()` restores only ITS OWN jest-tracked
 * spy — never this hook's swap, which isn't in Jest's mock registry at all.
 * The residual edge case is narrower than a spyOn-based hook would have:
 * async/deferred output (e.g. an rAF-queued warn) that fires after this
 * test's `afterEach` has already restored `console.error`/`console.warn`
 * back to whatever was there before this test's `beforeEach` — a normal,
 * expected end-of-test boundary, not a cross-hook interaction — can land on
 * the real console unrecorded and unchecked. It does not produce false
 * failures.
 *
 * Chain-through, not shadow (fixed during 4.4's own gate-bite run): the
 * "before" console.error/warn reference is captured FRESH inside
 * `beforeEach`, immediately before this hook installs itself — not once at
 * module load. A handful of CLI suites (figma-extract.test.ts,
 * figma-push.test.ts) install a PERSISTENT module-top-level console mock of
 * their own (no per-test beforeEach/afterEach — restored once in `afterAll`,
 * if at all) and assert against its `.mock.calls`. Capturing "before" once
 * at this module's own load time would have bound to the pristine native
 * console — permanently bypassing those suites' own mocks for every test
 * and silently breaking their `consoleOutput()`-style assertions.
 *
 * PLAIN PROPERTY SWAP, NOT `jest.spyOn` (also fixed during 4.4's gate-bite
 * run — the reason this hook does NOT use jest.spyOn even though the header
 * above still calls the general technique "spyOn/method swap"): `jest.spyOn`
 * has a documented reuse rule — spying on a property that is ALREADY a Jest
 * mock function returns and mutates THAT SAME mock object rather than
 * wrapping a new one. Against the figma-extract/figma-push suites'
 * persistent console.error mock, that reuse rule made `jest.spyOn(console,
 * 'error').mockImplementation(fn)` overwrite THEIR mock's implementation
 * with `fn` — and this hook's own "before" reference, bound to that same
 * mutable mock object, then called back into `fn` on every invocation:
 * infinite recursion, observed as a stack overflow on the very first
 * `console.error` call in a chained suite. A plain property assignment
 * (`console.error = wrapper; ...; console.error = original;`) sidesteps
 * Jest's mock-identity bookkeeping entirely — the same technique the header
 * above documents as version-agnostic ("plain jest.spyOn / method swap"),
 * using the method-swap half specifically because it composes safely with
 * another suite's pre-existing mock, which spyOn's reuse rule does not.
 */

import allowlistData from './console-allowlist.json';
import * as path from 'path';

interface AllowlistEntry {
  suite: string;
  pattern: string;
  reason: string;
}

const allowlist = allowlistData as AllowlistEntry[];

function isAllowed(suite: string, message: string): boolean {
  return allowlist.some((entry) => {
    if (entry.suite !== suite) return false;
    try {
      return new RegExp(entry.pattern).test(message);
    } catch {
      // A malformed pattern never silently passes output through.
      return false;
    }
  });
}

function stringifyArg(value: unknown): string {
  if (value instanceof Error) return value.stack || value.message;
  if (typeof value === 'string') return value;
  try {
    return JSON.stringify(value);
  } catch {
    return String(value);
  }
}

function formatArgs(args: unknown[]): string {
  return args.map(stringifyArg).join(' ');
}

function currentSuitePath(): string {
  // expect.getState().testPath is the absolute path to the currently
  // running test file. Repo root is resolved relative to THIS file
  // (src/__tests__/), so it's correct regardless of process cwd.
  const testPath = expect.getState().testPath;
  if (!testPath) return '';
  const repoRoot = path.resolve(__dirname, '..', '..');
  return path.relative(repoRoot, testPath).split(path.sep).join('/');
}

interface CapturedOutput {
  method: 'error' | 'warn';
  message: string;
}

let captured: CapturedOutput[] = [];
let originalError: typeof console.error | undefined;
let originalWarn: typeof console.warn | undefined;

beforeEach(() => {
  captured = [];

  // Capture whatever is CURRENTLY installed (native console, or another
  // suite's own persistent mock) immediately before swapping — see the
  // "Chain-through, not shadow" / "Plain property swap" header notes.
  originalError = console.error;
  originalWarn = console.warn;

  console.error = (...args: unknown[]) => {
    captured.push({ method: 'error', message: formatArgs(args) });
    originalError!.apply(console, args);
  };

  console.warn = (...args: unknown[]) => {
    captured.push({ method: 'warn', message: formatArgs(args) });
    originalWarn!.apply(console, args);
  };
});

afterEach(() => {
  const suite = currentSuitePath();

  // Targeted restore only — put back exactly what was there before this
  // test's beforeEach ran (native console, or another suite's own mock).
  if (originalError) console.error = originalError;
  if (originalWarn) console.warn = originalWarn;

  const unallowed = captured.filter((entry) => !isAllowed(suite, entry.message));
  captured = [];

  if (unallowed.length > 0) {
    const details = unallowed
      .map((entry) => `  [console.${entry.method}] ${entry.message}`)
      .join('\n');
    throw new Error(
      `console-fail: unallowlisted console output in ${suite}:\n${details}\n\n` +
        'Legitimate expected noise: add a { suite, pattern, reason } entry to ' +
        'src/__tests__/console-allowlist.json. Genuine defect: fix the source.'
    );
  }
});
