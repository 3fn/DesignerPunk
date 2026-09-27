# Task 10.5 Completion — Unit twin; the 17-file invariant; diff-guard green

**Spec**: 123 — Consumer Distribution · **Unit**: U2a · **Parent**: Task 10 · **Agent**: Lina (Opus)

## What changed

- **`tools/agent-generator/__tests__/spans.source-origin.test.ts`** (new) — the 10.S unit twin (Req 10.8a; design test id). Given section S re-pointed by the consumer profile, the emitted span is `render` with `source` = S's canonical anchor (`canonical/agents/twin.md#regrounded`). Also covered: retained → passthrough, omitted → no span, steward byte-identity and tiling, the body's trailing-newline contract, the profile/row/overlay refusals, entry/member/shared/glue sourcing, an embed's `resolve`+`embed`, nonexistent-path and non-newline refusals, and consumer frontmatter omission. **12 tests.**
- **The 17-file invariant** — the `The partition invariant on the 17 files (Req 10.8)` block in `partition.golden.test.ts`:
  - the set is derived, not listed: the nine `canonical/agents/*.md` charters (incl. `_fixture.md`), plus the `.kiro/steering/*.md` docs whose own frontmatter `id` is in `always-set.yaml` minus `personal-note` (which ships as its template, C19);
  - the count is asserted: 9 + 8 = **17**;
  - per file: the byte-identical join, contiguous line ranges, and no whitespace-only unit outside the degenerate state;
  - it also asserts that `_fixture.md` is the one degenerate file today (a declared state).
- **Diff-guard green** — see the Targeted tests below.

## Targeted tests + result

- `npx jest --config tools/agent-generator/jest.config.js tools/agent-generator/__tests__/spans.source-origin.test.ts` → **12/12**.
- `partition.golden.test.ts` → **45/45**, of which the 17-file block is 19 tests: the count, 17 per-file cases, and the degenerate-set case. `✓ the set is 17 files — nine charters and eight identity docs (count asserted)`.
- `npx tsx tools/agent-generator/diff-guard.ts` → `diff-guard: full-run-green (input-closure-changed)` (after the last code edit, the adapter header comments), and a second run → `diff-guard: no-op-green`.
- `npm run test:agent-generator` → **30 suites, 405 tests passed**.

### Twin bite recorded red (applied to `spans.ts`, the twin run, reverted; then 12/12)

| Mutation | Red |
|---|---|
| the shared function sources a re-grounded unit to the profile (`source: \`${profile}:${unit.anchor}\``) | `Tests: 2 failed, 10 passed, 12 total` — `✕ re-pointed → op render, source = the canonical anchor of S (never the profile)`: `Expected: "canonical/agents/twin.md#regrounded"`, `Received: "consumer:#regrounded"` |

*Scope, stated where the twin lives*: this bite turns red for every target at once, so it proves the function, **not per-target routing**. The arbiter for routing is Task 14's two-sided per-target bites.

## Application-time adaptations

1. The twin's fixture is an inline body in the test, not an exemplar. That is the design's point for the twin: "needing no exemplar and no 11.4 checker". Exemplar E is Task 14.2's.
2. **Out-of-list**: `spans.source-origin.test.ts` under `__tests__/`. *Authority*: the criterion's unit twin (and design § "Testing Strategy", which names this file).
3. The twin's code landed in the 10.4 checkpoint commit (see `task-10-4-completion.md` adaptation 6); this doc records its results.
