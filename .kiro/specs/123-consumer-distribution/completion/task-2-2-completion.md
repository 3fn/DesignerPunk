# Task 2.2 Completion — Step 0 (birth check, refusals, `--re-scaffold` listing); steps 3/3b/3c/4/4′; `--skip-components` deprecation note

**Spec**: 123 — Consumer Distribution · **Unit**: U1 · **Parent**: Task 2 · **Agent**: Ada (Sonnet)

## What changed

- `src/cli/init.ts`: `runInit` now opens with **Step 0**, the birth check (design.md C1 row 0; Req 15A.3): `findDesignSystemRoot(process.cwd())` (reused from Task 1, not re-derived), then:
  - `born` → refuse with `initBornRepoMessage(root)` (new catalog string, `src/cli/shared/errorCatalog.ts`), exit 1, write nothing.
  - `package-mode` → refuse with the EXISTING `packageModeIndexAbsentMessage()` (reused verbatim from Task 1.6 — its own text already names `--re-scaffold` as the path to a design system of one's own, so no new string was needed).
  - `partial` (any of the four sub-cases) → refuse with the EXISTING `partialCaseMessage(root, partialCase, attemptedTokenSource)` (reused verbatim).
  - `unborn` (or a consume-posture manifest, which C2 already ignores) → proceed.
  - `--re-scaffold` → bypasses the refusal, first calling `previewReScaffold(pkgRoot, dest)` (a pure, non-mutating walk over every managed copy root plus the single scaffolded files) to list every file that would be RE-ADDED, then `confirmReScaffold` (an interactive TTY prompt, or `--yes` off a TTY) before proceeding.
- **Step 3 (`src/types` copy) — REMOVED.** No `copyDir` call for it; resolution goes through `@3fn/core/types` via `rewriteByResolution` (Task 2.1).
- **Step 3b/3c (`src/tokens`, `src/tokens/component`) — KEPT, now transformed by `rewriteByResolution`** (Task 2.1), both anchored at the SAME tier root (`pkgRoot/src/tokens`) per C4's boundary rule.
- **Step 4 (`src/components/core` copy) — REMOVED.** `--skip-components` is kept as an accepted flag but is now a no-op with a printed deprecation note (it used to skip a copy that no longer happens).
- **Step 4′ (consumer components dir) — ADDED**: `src/components/` is created (empty except a `README.md` explaining the merge model) if absent — Req 19A.6's "created, empty" requirement.
- Steps 6/7/7b (agent templates, steering docs, governance docs) — **UNCHANGED**, per the tasks-round sequencing decision #1 ("in U1 `.kiro/agents` is still copied"; the move to Task 16's C20 generation is out of this subtask's scope).

## Targeted tests + result

`npx jest src/cli/__tests__/init.test.ts` → **20/20 passed**, including:
- Birth-check describe block (4 tests): born/package-mode/partial refusals with the exact catalog strings; `--re-scaffold` lists files and proceeds under `--yes`.
- First-run describe block (4 tests): all expected artifacts created; `src/types` and `src/components/core` NOT created; the copied tree resolves with zero unmapped specifiers; `componentTokens` re-pointed; `--skip-components` prints the deprecation note.

### Bites recorded red (reverted, run, confirmed red, then restored — `git diff --stat src/cli/init.ts` showed the same 470/109 line count after every restore, confirming no residue)

1. **Birth refusal is load-bearing** — neutered the refusal condition (`!opts.reScaffold && (dsRoot.state as string) === '__never__'`, i.e. never true). Re-ran `-t "refuses in a born repo"` → **RED**: `exitCode` was `undefined` instead of `1` — `init` proceeded silently into an already-born repo, reproducing exactly the "resurrection" defect Req 15A.3 exists to prevent. Restored.

## Application-time adaptations

1. **`copyDir`'s `transform` option signature changed** from `(content: string) => string` to `(content: string, srcAbsPath: string) => string`, so `rewriteByResolution` (which needs the source file's own absolute path to resolve relative specifiers) can be wired in directly. `copyDir` itself is otherwise byte-identical to its pre-123 form (merge-only, never-overwrite semantics unchanged).
2. **`previewReScaffold` is a NEW, separate, non-mutating walk** — not a "dry-run mode" bolted onto `copyDir` — because the set of things `--re-scaffold` needs to preview (four copied roots PLUS six single scaffolded files) doesn't cleanly reduce to one `copyDir`-shaped operation. It duplicates `copyDir`'s directory-walk shape in miniature; I judged this acceptable duplication (a ~15-line walk) rather than forcing an awkward shared abstraction between "compute names of missing files" and "copy files, transforming as you go."
3. **`initBornRepoMessage` is a genuinely NEW catalog string** (`src/cli/shared/errorCatalog.ts`) — design.md's catalog table names it as its own row ("`init` in a born repo (A7)"), distinct from the partial/package-mode rows Task 1 already built. The other two refusal paths (package-mode, partial) reuse Task 1's existing functions verbatim, per the orchestrator's explicit instruction not to duplicate strings.

## Notes for Task 2.3/2.4/2.5

- `previewReScaffold`'s scaffold-file list (`designerpunk.config.ts`, `product/overview.yaml`, `jest.config.js`, `tsconfig.test.json`, `.designerpunkignore`, `src/components/README.md`) will need `.mcp.json` / `.claude/settings.json` added once Task 2.3's MCP work lands alongside it in the same commit (done — see task-2-3-completion.md; the list already reflects the final state since 2.2/2.3/2.4/2.5 were implemented together in one pass and split into docs by criterion afterward).
- The birth-check refusal runs BEFORE the config-name/abbreviation prompt, so a refused `init` never prompts the user for anything.
