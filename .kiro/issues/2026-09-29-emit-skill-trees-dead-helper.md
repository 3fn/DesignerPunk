# Issue: `emitSkillTrees` — a dead Spec 122 helper holding a second target list

**Date**: 2026-09-29
**Status**: ACTIVE
**Owner**: Thurgood
**Trigger**: before Spec 123 U2b's unit PR opens. Task 15's first criterion routes this hit by name to this issue, so the parent's sweep reads clean once the fix merges.
**Source**: Spec 123 Task 15.1's target-list sweep (`.kiro/specs/123-consumer-distribution/completion/task-15-1-completion.md` § "Criterion C1's sweep, recorded"), and the amendment of 2026-09-29 that scoped that criterion to the generator's emission path (Peter's direction, relayed by the orchestrator).

---

## The gap

`tools/agent-generator/skills.ts` exports `emitSkillTrees(map, repoRoot)`, which writes both targets' skill trees from a literal `['cc', 'kiro']` (L163, and the returned `targets: ['cc', 'kiro']` at L169). That is a second declared target list on the generator's emission path. Design C12 says the list is declared once, in `canonical/consumer-profile.yaml`.

**It has no production caller.** `generateAll` emits skill trees through each adapter's `emitSkills`. `git grep -n emitSkillTrees -- ':!.kiro/specs/**'` outside `__tests__/` finds only its own definition, its doc comment (`skills.ts:25`), and a comment in `adapters/cc.ts:404`. Its only caller is `tools/agent-generator/__tests__/skills.test.ts` § "emitSkillTrees — byte-identical, deterministic per-target emit (temp fixture)".

## The fix — retire, don't re-point (recommended and recorded)

- **Delete** `emitSkillTrees`, `EmitSkillTreesResult`, and the private `copyTreeSync` from `skills.ts`, together with its `describe` block in `skills.test.ts`. Remove or reword the doc-comment references in `skills.ts` L25 and `adapters/cc.ts` L404.
- **Why not have it read the profile**: that would keep a second, untested-in-production emit path alive beside the adapters' `emitSkills`. It is the hand-fork shape Req 9.2 forbids ("emission logic SHALL remain single-sourced"). The byte-identical-copy property it tested belongs to the adapters' skill emission, which `generateAll` and the diff-guard already cover.
- **Verify**: `npm run test:agent-generator` is green. The Task 15 C1 sweep over `tools/agent-generator/**`, excluding `__tests__/**`, `__fixtures__/**` and `consumer-profile.ts`, returns no `skills.ts` hit.

## Grant

**Grant paths**: `tools/agent-generator/skills.ts`, `tools/agent-generator/__tests__/skills.test.ts`, `tools/agent-generator/adapters/cc.ts`

- The `cc.ts` path covers the **comment at L404 only**.
- The grant holds on the fixing PR's branch only. It is activated by Peter's merge of a PR whose body names this issue and this path list, and it expires when that PR merges (`.kiro/issues/README.md` rule 8).
- It confers no ratification authority, and it touches no governance-law path.
- The fixing PR is a `chore/` PR to `main`, merged into U2b's unit branch before the unit PR opens.
