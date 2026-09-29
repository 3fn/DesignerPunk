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

## Addendum 2026-09-29 (Q1 (b) — value-form re-run)

*Append-only. The criterion row stays as ticked. This is an application-time adaptation under an erratum, not a re-claim.* **Context**: Q1 was ruled (b) by Peter's merge of #240. Task 15.3 (`def8184e`, Thurgood) implemented it:
- under the consumer profile, the adapters render **`derive()`'s frontmatter**, in which a re-pointed entry's value is substituted;
- `entryOrigin` maps each derived entry path back to its canonical path for span attribution;
- an `## @entry` body is a **YAML value** of the canonical value's JSON type, under a generic congruence refusal.

Thurgood moved this parent's fixture to the value form (disclosed in his 15.3 doc): E-fm is now the bare string `specs/**`; the extra is a full command object (`cmd: npm run claims-pass`); the fixture loader derives first and exports `entryOrigin`. **I made no fixture edit beyond his.**

**Re-run** in worktree `DP-wt-lina-14-addendum`, branch `task/123-u2b-lina-14-addendum`, from unit head `29a201e1`. The mutation scripts and call sites are unchanged: the consumer write-scope and commands `emit([...])` blocks are textually as at 14.4. The three logs are **re-recorded**:

| Bite | `› cc › frontmatter` | `› kiro › frontmatter` | body tests | Verdict asserted (exact) | Log (re-recorded) |
|---|---|---|---|---|---|
| `cc.ts` write-scope → one inline `#frontmatter:writeScope` span | **RED** | green | green | **`Received: "cc frontmatter writeScope[.kiro/specs/**]: FAIL_NO_DERIVATION"`**. `Tests: 3 failed, 24 passed, 27 total` (cc, and the demo's cc + fake) | `__bites__/task-14-4-bite-frontmatter-cc.txt` |
| `kiro.ts` write-scope → one inline container span | green | **RED** | green | **`Received: "kiro frontmatter writeScope[.kiro/specs/**]: FAIL_NO_DERIVATION"`**. `Tests: 2 failed, 25 passed, 27 total` | `__bites__/task-14-4-bite-frontmatter-kiro.txt` |
| *extra*: `cc.ts` commands → one inline `#frontmatter:commands` span | **RED** (`commands[claims-pass]`) | green | green | `Received: "cc frontmatter commands[claims-pass]: FAIL_NO_DERIVATION"`. `Tests: 3 failed, 24 passed, 27 total` | `__bites__/task-14-4-bite-extra-commands-cc.txt` |

**The two-sided pattern holds under the value form.** The congruence refusal does not intercept these mutations: they bypass `emitSpans` at the adapter, downstream of `derive()`, whose values are congruent.

**One changed shape, recorded, not scored as a red:**
- At 14.4, each write-scope bite also turned `E-fm's re-grounded text is what shipped (not the canonical glob)` red, because the bypass wrote the canonical globs.
- **Under the value form that test stays green under the bite.** The adapters now render the **derived** frontmatter, so even the inline bypass writes `specs/**`.
- The content of the frontmatter is therefore established upstream, by `derive()` (Task 15.2) and its congruence refusal (15.3). **The derivation verdict is the one assertion that discriminates the call site** per target, which is exactly the per-target routing claim this criterion makes. The "what shipped" test now checks `derive()`'s value substitution, not routing.

**The 14.3 body bites, re-checked after 15.3, not re-recorded (unchanged shape):**
- `cc.ts` inline `#body` → `Received: "cc body #the-owed-set-pipeline-…: FAIL_NO_DERIVATION"`, `Tests: 6 failed, 21 passed, 27 total` (cc 2 plus the demo's cc and fake);
- `kiro.ts` → `Received: "kiro body …: FAIL_NO_DERIVATION"`, `Tests: 4 failed, 23 passed, 27 total`.

The committed 14.3 logs stand.

**Results**:
- `npx jest --config tools/agent-generator/jest.config.js tools/agent-generator/__tests__/semantics-guard.test.ts` → `Tests: 27 passed, 27 total`;
- `npm run test:agent-generator` → `Test Suites: 51 passed, 51 total` · `Tests: 813 passed, 813 total`.

**Measurement condition, disclosed**: the worktree has no build outputs, and `semantics-guard.test.ts` does **not** load without `mcp-server/dist`. `render.ts` → `TS7006` via `workflow-rules-guard.ts`'s import of `../../mcp-server/dist/index`. Measured with a **read-only symlink** `mcp-server/dist` → the main checkout's built `mcp-server/dist`. `mcp-server/src` has the same tree SHA on both (`77f187db…`), and the main checkout has no local change there. Nothing was written to the main checkout; the symlink was never committed and has been removed.
