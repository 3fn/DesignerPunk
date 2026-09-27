# Task 6.0 Completion — Gate: Lina's Container-Base fix has merged (guard green on `main`)

**Spec**: 123 — Consumer Distribution · **Unit**: U1 · **Parent**: Task 6 · **Agent**: Ada (Opus)

## What changed

Nothing. This subtask is a gate. It changes no files.

**Gate verdict: OPEN.** Both halves of the instrument hold.

1. **Merged before the branch point.**
   - Lina's fix is `af5842eb`: *"Fix Container-Base phantom CSS variables + add a resolve-guard (fix) (#201)"*.
   - It is an ancestor of the U1 branch point `874f6242` (#204): `git merge-base --is-ancestor af5842eb 874f6242` → true.
   - `874f6242` is in turn an ancestor of the branch head `ea854229`.
   - `git branch -r --contains af5842eb` → `origin/main`, `origin/task/123-u1-substrate`.
2. **The guard passes on `main` at the branch point.**
   - The guard is `src/components/core/Container-Base/__tests__/ContainerBase.token-resolution.test.ts`.
   - I exported the tree at `874f6242` (`git archive 874f6242 src token-index package.json tsconfig.json jest.config.js`) into a scratch directory. Its `node_modules` was symlinked, and the gitignored generated `src/types/generated/` was copied in because tsc needs it.
   - `npx jest …ContainerBase.token-resolution.test.ts` → **5/5 passed.**
3. **The guard passes at the current head** (`ea854229`, and after Task 6's changes) → **5/5 passed.**
   - Between `874f6242` and HEAD, the guard's inputs are unchanged: `git diff --stat 874f6242 HEAD -- src/components token-index src/tokens` is empty.
   - The only `src/generators` delta is `generateTokenIndex.ts` (Task 1.5's `meta.json`), which is not a guard input.
4. **6.1's own-index check is green over the Container-Base maps.** The second half of the gate instrument is the build-time check that Task 6.1 adds.
   - `npx tsx scripts/build-name-contract.ts` → exit 0, and the contract is written.
   - The Container-Base and Container-Card-Base closed maps resolve into `referencedNames`, e.g. `--z-index-modal`, `--radius-050` and `--color-structure-surface-tertiary`.
   - Re-introducing the pre-#201 value gives the recorded red; see `task-6-1-completion.md` § "Bites".

**Also merged since the branch point, and met by Task 6** (per the brief):
- **#202** (`3401e030`, Input-Text family guard). It changed only `*.browser.ts` files, which are not in the browser bundle. It also moved **no** name in the compiled surface (measured; see the 6.1 reconciliation).
- **#203** (`bb6a1d99`, the Password hover via blend-computed `--_itp-hover-bg`). In the compiled surface it removed `--color-background-hover` and added `--_itp-hover-bg`. Its disposition is (ii), component-internal; see 6.1.

## Targeted tests + result

- `npx jest src/components/core/Container-Base/__tests__/ContainerBase.token-resolution.test.ts` at HEAD → **5 passed, 5 total**.
- The same suite on the `874f6242` export → **5 passed, 5 total**.

## Application-time adaptations

- **The branch-point guard run used a tree export, not a checkout.** The brief forbids branch switching and worktrees. The export plus the copied generated types is the smallest faithful stand-in. Its guard inputs (`src/components`, `token-index`) are byte-for-byte the `874f6242` tree.
