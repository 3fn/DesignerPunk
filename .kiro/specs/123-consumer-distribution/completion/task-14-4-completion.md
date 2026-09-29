# Task 14.4 completion: E-fm — the frontmatter per-target guard, bitten two-sided (the forced negative is NOT taken)

**Spec**: 123 (Consumer Distribution) · **Unit**: U2b · **Parent**: Task 14 · **Agent**: Lina (Opus), PRIMARY
**Date**: 2026-09-29 · **Branch**: `task/123-u2b-profile` (main checkout), from `32386505`

**Write scope**:
- **Inside the grant**: Task 14's row names the guard tests and `__fixtures__/`. Changed here: `tools/agent-generator/__tests__/semantics-guard.test.ts` (the `frontmatter` describe added) and three new logs in `__fixtures__/semantics-guard/__bites__/`.
- **No source file changed.** The adapter mutations are recorded in the logs, never committed.

**CI-provenance**: local

## The criterion's fork, decided

> **Frontmatter per-target (E-fm), two-sided**, on `writeScope[<glob>]`, with the same pattern and logs — **OR** `frontmatter routing: asserted, not bitten — <reason>`.

**Taken: the first branch, bitten two-sided. The forced negative is not used.**
- At the Q1 stop I expected the forced negative, because the steward rendering put every glob on one container span. **Task 15.0 changed that under the consumer profile.** Each glob now renders as its own `writeScope[<glob>]` member span, and a re-pointed leaf renders its `## @entry` overlay text sourced to `…#frontmatter:<path>`.
- A per-glob re-pointing therefore has a descendant-or-self span to find, and a bypass removes it. That is exactly what the bite needs.
- The steward rendering is unchanged, still one container span. **The claim is scoped to the consumer profile**, which is the profile re-pointing exists under.

## What changed

- **`semantics-guard.test.ts`**: a `frontmatter` describe inside each target's block. The test ids are **`semantics-guard.test.ts › <target> › frontmatter › …`** (design C15).
  - **E-fm**: `writeScope[.kiro/specs/**]`, re-grounded in place → the **verdict value** is asserted, `<target> frontmatter writeScope[.kiro/specs/**]: VERIFIED`. A second test checks that E-fm's re-grounded text shipped and the canonical glob did not.
  - **EXTRA EVIDENCE**: `commands[claims-pass]`, re-grounded in place → `VERIFIED`. It is labelled in the test name as *"disclosed, not a substitute for E-fm"*. The criterion's row is satisfied by E-fm alone.
  - **Scope, stated in the test file**: `› <target> › frontmatter` covers the frontmatter-derived sections of the **prose** artifact (CC's agent file, Kiro's prompt). **Kiro's JSON config is one steward-shaped glue span under every profile** (Task 15.0; C20), **so a bypass inside `write.allowedPaths` is invisible to `› kiro › frontmatter`**. This block does not claim it.

## Targeted tests + result

- `npx jest --config tools/agent-generator/jest.config.js tools/agent-generator/__tests__/semantics-guard.test.ts` → **`Tests: 27 passed, 27 total`**.
  - The declared blocks `cc` and `kiro` have 5 each (body 2, frontmatter 3).
  - The fake-third-target describe has 17: its 2 checks, plus three blocks × 5.
- `npm run test:agent-generator` → **`Test Suites: 48 passed, 48 total` · `Tests: 766 passed, 766 total`**. `npx tsc -p tools/agent-generator/tsconfig.json --noEmit` → exit 0.
- **The two-sided frontmatter bites.** Each replaces one adapter's consumer write-scope `emit([...])` with **one inline span** sourcing the container `…#frontmatter:writeScope`, bypassing `emitSpans`. Each was run and restored (`cmp` clean). **Logs committed**, each with its mutation diff:

  | Bite | `› cc › frontmatter` | `› kiro › frontmatter` | body tests | Verdict asserted (exact) | Log |
  |---|---|---|---|---|---|
  | `cc.ts` write-scope → inline container span | **RED** | green | green | **`Received: "cc frontmatter writeScope[.kiro/specs/**]: FAIL_NO_DERIVATION"`** | `__bites__/task-14-4-bite-frontmatter-cc.txt` |
  | `kiro.ts` write-scope → inline container span | green | **RED** | green | **`Received: "kiro frontmatter writeScope[.kiro/specs/**]: FAIL_NO_DERIVATION"`** | `__bites__/task-14-4-bite-frontmatter-kiro.txt` |
  | *extra*: `cc.ts` commands → inline `#frontmatter:commands` span | **RED** (`commands[claims-pass]`) | green | green | `Received: "cc frontmatter commands[claims-pass]: FAIL_NO_DERIVATION"` | `__bites__/task-14-4-bite-extra-commands-cc.txt` |

  The pattern is the body pattern, on the frontmatter call sites: the mutated target's `› frontmatter` goes red with the verdict value, the other target stays green, and **every body test stays green**, so each bite is scoped to its call site. The `fake` block follows `cc`, as at 14.3. The extra bite is one-sided (CC only), as extra evidence.
- `npm run check:completion-criteria-parity` after the tick → `SUMMARY: parents evaluated 16, pass 16, fail 0; emissions 0; reds 0`.

## Application-time adaptations

1. **The forced negative is dropped** (see "The criterion's fork, decided"). This was only possible after the 15.0 sequencing correction, #236.
2. **Kiro JSON config is scoped out of `› kiro › frontmatter`** (stated above and in the test file). It is a stated scope, not a forced negative: the prose artifact's frontmatter routing is bitten on both targets.
3. **The extra `commands[<name>]` bite is disclosed evidence, not a substitute.** The orchestrator asked for it beside the forced-negative line. With E-fm bitten, it stands as extra per-member evidence on a second list field.
