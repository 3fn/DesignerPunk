# Task 9.3 Completion — Copy cases; the packed name-contract case

**Spec**: 123 — Consumer Distribution · **Unit**: U1 · **Parent**: Task 9 · **Agent**: Thurgood (Sonnet)
**Delegated-tier**: plan held

## What changed

Added `tests/consumer-integration.test.ts § "Spec 123 Task 9.3 — copy cases; the packed name-contract case (C6)"` — the remaining five of the 19 U1-scheduled C6 named cases, plus the separate "packed name contract" criterion (Ada D-T-A7). Also **re-keyed the pre-existing `generate produces output files` test's brand-survival assertion** (Requirement 3.2), which was the KNOWN pre-existing `npm run test:consumer` failure this task was asked to diagnose.

### The `test:consumer` fix (brand-survival re-key, Req 3.2)

**Diagnosis**: `generate produces output files` asserted `components.yaml` contains `inputradio.box.sm` — a token from `src/components/core/Input-Radio-Base/radio-sizing.tokens.ts`, which lived in the consumer's copied tree ONLY because `init` used to copy `src/components/core` (a copy Requirement 19A.2 removes under Model B). The assertion was stale, not a code defect: running `npm test:consumer` at the pre-Task-9 head showed `components.yaml` containing only the 10 `progress.*` tokens (from `src/tokens/component/progress.ts`, real and copied as part of the consumer's own token tier).

**Fix**: re-keyed the assertion to `progress.node.size.sm`, per Requirement 3.2's explicit instruction ("the brand-survival assertion SHALL be RE-KEYED onto a CONSUMER-TREE component token"). Updated the test's own doc comment to record the re-key and both of Req 3.2's mechanical clauses.

Named cases (`it()` titles, all prefixed `C6:`):
1. **local-mode generate over the init-copied tree** — an explicit named assertion (stdout contains `(local)`) over the already-established init-copied-tree generate.
2. **over-rewrite arbiter (packed-level structural check)** — the FULL arbiter (a real `tsc --noEmit`) is `src/cli/__tests__/init.overRewriteArbiter.test.ts` (Task 2.5, its own bite already recorded there); a packed consumer has no `typescript` devDependency to duplicate it. This packed-level companion re-asserts the structural invariant that test protects: the copied tree's `themes/dark/SemanticOverrides.ts` still reads the UNREWRITTEN `'../types'`.
3. **brand-survival — consumer-tree provenance (Req 3.2 clause b)** — a dedicated fixture: delete the consumer-tree source file (`src/tokens/component/progress.ts`) after a successful `generate` → the token DISAPPEARS from `components.yaml` on the next `generate`. Automated and passing.

Plus, separately (not one of the 19): **packed name contract reads `node_modules/@3fn/core/dist/name-contract.json`** — positive: `sync --dry-run` in the packed consumer (`tempDir`) never reports "cannot check" (it found the real packed contract). Removed-name bite: a CSS custom property the contract references is deleted from the consumer's generated `DesignTokens.web.css` (never the token tier itself — only the compiled output `sync` reads) → `sync --dry-run` reports `"components now expect token … Add it to your set"`; the line is reverted immediately after the assertion (later cases in the same file depend on the generated CSS staying intact).

## Targeted tests + result

`npm run test:consumer` — all 4 `it()`s in this subtask's describe block **PASS**, and the re-keyed `generate produces output files` test **PASSES** (previously the one known failure). See the parent completion doc for the full-suite run.

## Application-time adaptations

1. **Brand-survival clause (a) (the `Symbol()` bite) did not reproduce red** when manually executed against `progress.node.size.sm` — filed as a disclosed finding, `.kiro/issues/2026-09-27-progress-token-harvest-may-not-cross-dual-instance-boundary.md` (owner: Ada), rather than claimed. Clause (b) (provenance) WAS verified and is the automated case above. See the parent completion doc's "Bites executed" section for the full transcript.
2. **Name-contract casing**: the exact catalog string is `"Add it to your set"` (capital A) — an early draft of the assertion used lowercase and failed on a real, correctly-reported message; corrected once observed.
