# Task 8.1 Completion — Gate: the rename merged; the zero-warning run before the lint lands

**Spec**: 123 — Consumer Distribution · **Unit**: U1 · **Parent**: Task 8 · **Agent**: Ada (Sonnet)

## What changed

No source change in this subtask — it is the gate evidence Req 8.4 / design C11 require before 8.2's lint code may be committed.

1. **Ancestry check**: `git merge-base --is-ancestor e5126cf5 HEAD` → **`IS ANCESTOR`**. `e5126cf5` is "Rename the 7 component token reference maps to `*.refs.ts` (chore) (#200)" (`git show -s --format="%H %ci %s" e5126cf5` → `e5126cf5abf38a74359dd8dd795c286dd8989b92 2026-09-26 14:20:16 -0400 Rename the 7 component token reference maps to *.refs.ts (chore) (#200)`), confirmed on branch `task/123-u1-substrate` at head `1b365529`. This discharges the "IF the rename has not merged, this parent BLOCKS" clause — it merged the day before this task started.
2. **File-count corroboration** (recorded as corroboration only, per the criterion's own instruction — "a count proves filenames; zero warnings proves the property"): `find src/components -name "*.refs.ts"` → 7 files:
   - `src/components/core/Button-CTA/Button-CTA.refs.ts`
   - `src/components/core/Container-Base/Container-Base.refs.ts`
   - `src/components/core/Container-Card-Base/Container-Card-Base.refs.ts`
   - `src/components/core/Input-Text-Base/Input-Text-Base.refs.ts`
   - `src/components/core/Input-Text-Email/Input-Text-Email.refs.ts`
   - `src/components/core/Input-Text-Password/Input-Text-Password.refs.ts`
   - `src/components/core/Input-Text-PhoneNumber/Input-Text-PhoneNumber.refs.ts`
3. **The property, not just the count** — with 8.2's lint code already written and present in the working tree, but **BEFORE its commit**: `npx designerpunk generate` was run against our own source. Ordering, cited explicitly:
   - **2026-09-27T15:18:49Z** — `npx designerpunk generate` run, lint code present and uncommitted (`git status --porcelain` immediately before the run showed only ` M src/cli/loadComponentTokens.ts`, no commit yet). Output: full generation succeeded (217 primitives, 193 semantics, 33 component tokens across 3 platforms), and grepping the captured output for `harvest|warn|⚠` matched **zero lines** — no harvest-zero warning fired.
   - **After** this zero-warning run was captured, subtask 8.2's commit lands the lint code (see task-8-2-completion.md and this task's parent completion doc for the landing commit SHA).
   - This ordering makes the lint's first-ever run against our own source the state Req 8.4 requires: zero false positives, because the naming collision (#200) was already resolved before the lint could see it.

## Targeted tests + result

No test file is specific to this subtask (it is a gate/verification step); the corroborating evidence is the command transcript above, plus 8.2's fixture test which exercises the lint's logic directly.

## Application-time adaptations

None. The gate's two conditions (ancestry, zero-warning property before commit) were both satisfiable as specified; no fork was encountered.
