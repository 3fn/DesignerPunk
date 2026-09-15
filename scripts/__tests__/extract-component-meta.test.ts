/**
 * Regression tests for the `extract-component-meta.ts` preservation predicate fix.
 *
 * Source defect: `.kiro/issues/2026-09-13-component-meta-extractor-clobbers-handedits.md`.
 * `component-meta-authoring-guide.md` sanctions hand-editing `usage` and `alternatives` when
 * derived content is too generic (guide `:34`, `:217` step 5). Before this fix, preservation
 * was keyed on `when_to_use.length` (or `alternatives.length`) alone — `existing.length >
 * derived.length` — so a hand-edit that REWROTE entries in place (no length change), or that
 * touched `when_not_to_use` alone, was silently clobbered by the next `npm run extract:meta`.
 *
 * `resolveUsage` / `resolveAlternatives` are the exact functions `main()` calls during
 * `npm run extract:meta` (guarded behind `require.main === module`, so importing this module
 * for these tests does not run the CLI against the real repo — see the guard at the bottom of
 * the source file).
 *
 * These are pure-data unit tests, not a subprocess run of the CLI: `COMPONENTS_DIR` /
 * `STEERING_DIR` in the source module are resolved from `__dirname` and are not parameterized,
 * so a true fixture-directory integration run is out of scope for a predicate-only fix (see
 * the issue's "field-grain register row + guard stay future work"). This mirrors the existing
 * `tools/agent-generator/__tests__/pipeline.test.ts` convention of testing the pure functions a
 * script's main loop calls, rather than spawning the script.
 */

import {
  resolveUsage,
  resolveAlternatives,
  usageContentEqual,
  alternativesContentEqual,
  type UsageData,
  type Alternative,
} from '../extract-component-meta';

describe('usageContentEqual / alternativesContentEqual', () => {
  it('treats identical arrays (same order, same content) as equal', () => {
    const a: UsageData = { when_to_use: ['A', 'B'], when_not_to_use: ['C'] };
    const b: UsageData = { when_to_use: ['A', 'B'], when_not_to_use: ['C'] };
    expect(usageContentEqual(a, b)).toBe(true);
  });

  it('treats same-length arrays with a rewritten entry as NOT equal (the bug case)', () => {
    const a: UsageData = { when_to_use: ['Use for primary actions'], when_not_to_use: [] };
    const b: UsageData = { when_to_use: ['Use for secondary actions'], when_not_to_use: [] };
    expect(usageContentEqual(a, b)).toBe(false);
  });

  it('treats a when_not_to_use-only divergence as NOT equal even when when_to_use is identical', () => {
    const a: UsageData = { when_to_use: ['X'], when_not_to_use: ['Old reason'] };
    const b: UsageData = { when_to_use: ['X'], when_not_to_use: ['New, more specific reason'] };
    expect(usageContentEqual(a, b)).toBe(false);
  });

  it('alternatives: same-length arrays with a rewritten reason are NOT equal', () => {
    const a: Alternative[] = [{ component: 'Button-Primary', reason: 'old reason' }];
    const b: Alternative[] = [{ component: 'Button-Primary', reason: 'new reason' }];
    expect(alternativesContentEqual(a, b)).toBe(false);
  });
});

describe('resolveUsage — content-aware preservation (Req a, b, c)', () => {
  it('(a) preserves a rewritten-but-same-length when_to_use hand-edit across regeneration', () => {
    // Old predicate: existing.when_to_use.length (1) > derived.when_to_use.length (1) is FALSE
    // -> the old code would have discarded the hand-edit and used `derived`. New predicate
    // compares content, not length, so the divergent hand-edit survives.
    const derived: UsageData = { when_to_use: ['Generic derived scenario'], when_not_to_use: [] };
    const existing: UsageData = { when_to_use: ['Rewritten, more specific scenario'], when_not_to_use: [] };

    const result = resolveUsage(existing, derived);

    expect(result.preserved).toBe(true);
    expect(result.usage).toEqual(existing);
  });

  it('(b) preserves a when_not_to_use-only hand-edit even when when_to_use is untouched', () => {
    // Old predicate never looked at when_not_to_use at all for the swap decision — a hand-edit
    // confined to when_not_to_use, with when_to_use left exactly as derived, was silently
    // clobbered whenever when_to_use wasn't longer than derived (the common case: unchanged).
    const derived: UsageData = {
      when_to_use: ['Use for form submission'],
      when_not_to_use: ['Generic derived exclusion'],
    };
    const existing: UsageData = {
      when_to_use: ['Use for form submission'],
      when_not_to_use: ['Hand-authored, more specific exclusion'],
    };

    const result = resolveUsage(existing, derived);

    expect(result.preserved).toBe(true);
    expect(result.usage).toEqual(existing);
    expect(result.usage).not.toEqual(derived);
  });

  it('(c) legitimate regeneration flows through when there is no existing hand-edit (null)', () => {
    const derived: UsageData = { when_to_use: ['Freshly derived scenario'], when_not_to_use: [] };

    const result = resolveUsage(null, derived);

    expect(result.preserved).toBe(false);
    expect(result.usage).toEqual(derived);
  });

  it('(c) legitimate regeneration flows through when existing already matches derived content', () => {
    // Re-running extract:meta with no hand-edit in place (existing == last derived output)
    // must not spuriously "preserve" — the freshly-derived value should be used verbatim so a
    // family-doc update to the derivation is not blocked by an inert existing file.
    const shared: UsageData = { when_to_use: ['Use for X'], when_not_to_use: ['Not for Y'] };
    const derived: UsageData = { when_to_use: [...shared.when_to_use], when_not_to_use: [...shared.when_not_to_use] };

    const result = resolveUsage(shared, derived);

    expect(result.preserved).toBe(false);
    expect(result.usage).toEqual(derived);
  });

  it('still preserves a hand-edit that legitimately grew (the pre-fix "richer" case)', () => {
    const derived: UsageData = { when_to_use: ['A'], when_not_to_use: [] };
    const existing: UsageData = { when_to_use: ['A', 'B', 'C'], when_not_to_use: [] };

    const result = resolveUsage(existing, derived);

    expect(result.preserved).toBe(true);
    expect(result.usage).toEqual(existing);
  });
});

describe('resolveAlternatives — content-aware preservation', () => {
  it('preserves a rewritten-but-same-length alternatives hand-edit', () => {
    const derived: Alternative[] = [{ component: 'Button-Secondary', reason: 'generic derived reason' }];
    const existing: Alternative[] = [{ component: 'Button-Secondary', reason: 'hand-authored, specific reason' }];

    const result = resolveAlternatives(existing, derived);

    expect(result.preserved).toBe(true);
    expect(result.alternatives).toEqual(existing);
  });

  it('legitimate regeneration flows through when there is no existing hand-edit (null)', () => {
    const derived: Alternative[] = [{ component: 'Button-Secondary', reason: 'derived reason' }];

    const result = resolveAlternatives(null, derived);

    expect(result.preserved).toBe(false);
    expect(result.alternatives).toEqual(derived);
  });

  it('legitimate regeneration flows through when existing already matches derived content', () => {
    const shared: Alternative[] = [{ component: 'Button-Secondary', reason: 'derived reason' }];
    const derived: Alternative[] = shared.map(a => ({ ...a }));

    const result = resolveAlternatives(shared, derived);

    expect(result.preserved).toBe(false);
    expect(result.alternatives).toEqual(derived);
  });
});
