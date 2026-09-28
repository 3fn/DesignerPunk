# Task 10 Completion — Splitter family, span function, and adapter consolidation

**Spec**: 123 — Consumer Distribution · **Unit**: U2a — Consumer generation profile: splitter, exemplars & G1 (Tasks 10–12, gated at Task 12) · **Type**: Architecture · **Validation**: Tier 3
**Agent (plan)**: PRIMARY Lina (Opus)
**Delegated-tier**: plan held
**CI-provenance**: branch-head dispatch @ 4c39fc4c038243a799a9ebf47830e56d44f4b6f1 — https://github.com/3fn/DesignerPunk/actions/runs/36345223866, https://github.com/3fn/DesignerPunk/actions/runs/36345227715, https://github.com/3fn/DesignerPunk/actions/runs/36345231813, https://github.com/3fn/DesignerPunk/actions/runs/36345235755, https://github.com/3fn/DesignerPunk/actions/runs/36345239944, https://github.com/3fn/DesignerPunk/actions/runs/36345243932
**Traces**: Reqs 10.G, 10.S, 10.8, 10.8a · design C13, C14

---

## Success Criteria

| Criterion (verbatim) | Status | Evidence |
|---|---|---|
| **Golden Bite 1** passes against the hand-authored list, and turns red under each recorded mutation: collapse to `##`; file-not-body; fallback on "no headings"; backward heading attachment. | ✅ verified met | `tools/agent-generator/__tests__/partition.golden.test.ts › Golden Bite 1 — the hand-authored unit list (Req 10.G) › %s partitions to exactly the hand-authored unit list` ×4 against `tools/agent-generator/__fixtures__/golden-partition/expected-units.json`; `npx jest --config tools/agent-generator/jest.config.js tools/agent-generator/__tests__/partition.golden.test.ts → 45/45`. Four reds recorded in `.kiro/specs/123-consumer-distribution/completion/task-10-2-completion.md` § "Bites recorded red": collapse to `##` → 6 failed; file-not-body → 6 failed; fallback on "no headings" → 6 failed; backward heading attachment → 3 failed. Each includes `✕ … partitions to exactly the hand-authored unit list`. |
| The fixture carries every case in C13's golden-fixture bullet (list reproduced). | ✅ verified met | The list, reproduced from design C13, each case with a named test in `tools/agent-generator/__tests__/partition.golden.test.ts › Fixture coverage — every C13 golden-fixture case is present (checked, not asserted by reading)`: (1) a title-only numbered document → `› C13: a title-only numbered document`; (2) a frontmatter block with `^# ` comments → `› C13: a frontmatter block with …`; (3) a `#doc:preamble` → `› C13: a #doc:preamble`; (4) whitespace-gap cases → `› C13: whitespace-gap cases …`; (5) a non-leaf heading with a heading-line-only preamble (forward attachment) → `› C13: a non-leaf heading with a heading-line-only preamble …`; (6) a leading-bold versus inner-bold enumeration item → `› C13: a leading-bold versus an inner-bold enumeration item`. The Req 10.G Bite 1 cases (nested `##`/`###`, orphan preamble, fenced `##`, heading-free and zero-heading members) → `› Bite 1: …` ×2. All pass (45/45). |
| **The test file contains no snapshot matcher**: `grep -nE "toMatch(Inline)?Snapshot"` → 0; the companion red on a created `__snapshots__/` is recorded. **The protection claim is the reviewed diff** (DD6), not the provenance key. | ✅ verified met | `grep -nE "toMatch(Inline)?Snapshot" tools/agent-generator/__tests__/partition.golden.test.ts \| wc -l → 0` at `4c39fc4c`. Companion: `mkdir tools/agent-generator/__tests__/__snapshots__` → `✕ COMPANION: no __snapshots__/ directory exists beside this test or the golden fixture` (1 failed), directory removed; inline half bitten too (`✕ this test file calls no snapshot matcher (directory or inline)`), both recorded in `task-10-2-completion.md`. DD6: `expected-units.json`'s `_provenance` key states that it declares hand-authorship and cannot prove it; this doc claims no more. |
| The partition invariant holds on **17 files** (nine charters, eight identity docs), with the count asserted. | ✅ verified met | `tools/agent-generator/__tests__/partition.golden.test.ts › The partition invariant on the 17 files (Req 10.8) › the set is 17 files — nine charters and eight identity docs (count asserted)` (asserts 9, 8, 17), plus `› %s: the units are an exact partition — byte-identical concatenation, contiguous lines` ×17. The set is derived from `canonical/agents/*.md` and from `canonical/shared/always-set.yaml` minus `personal-note`. `partition()` also throws on any non-identical join (`PartitionInvariantError`, `tools/agent-generator/partition.ts`). |
| The entry tree keys list/map fields per member and commands by `name` (a test over `lina.md`'s frontmatter). | ✅ verified met | `tools/agent-generator/__tests__/entry-tree.test.ts` over `canonical/agents/lina.md` → `npx jest --config tools/agent-generator/jest.config.js tools/agent-generator/__tests__/entry-tree.test.ts → 15/15`: `› writeScope is a list whose globs are individual leaf entries`, `› toolSubset is a map of servers, each a list keyed per tool…`, `› knowledgeBases are keyed per member by name`, `› kiro.agentSpawn is the preflight field, keyed per command`, `› each command is an entry keyed by its name`, `› no entry path is keyed by a command string`. Bites (key by `cmd` → 3 failed; lists atomic → 10 failed) in `task-10-3-completion.md`. |
| **Adapter consolidation — claim scoped honestly** (S-T-A7): | ✅ verified met | Both scoped halves below. The claim Task 10 makes is the grep plus the shared function; it makes no routing claim. `tools/agent-generator/spans.ts` (header § "WHAT THIS DOES NOT ESTABLISH"), called from `tools/agent-generator/adapters/cc.ts` and `tools/agent-generator/adapters/kiro.ts`. |
| the grep `acc\.add\('passthrough'` over `adapters/{cc,kiro}.ts` returns 0 for agent bodies. *Limit: it is pattern-bound, and other span-adding forms would pass it.* | ✅ verified met | `grep -nE "acc\.add\('passthrough'" tools/agent-generator/adapters/cc.ts tools/agent-generator/adapters/kiro.ts \| wc -l → 0` at `4c39fc4c` (baseline `90fb0e71` → 2: `cc.ts:246`, `kiro.ts:324`). Limit carried as written. The only `acc.add` calls left in either adapter are `cc.ts` `emitAlwaysLayer`'s `CLAUDE.md` spans (C19's lane, Task 15), recorded in `task-10-4-completion.md`. |
| **The arbiter that every body and frontmatter span routes through `emitSpans` is Task 14's two-sided per-target bites**, not the unit twin, which tests only the function. | ✅ verified met | Scope held in shipped source: `tools/agent-generator/__tests__/spans.source-origin.test.ts` header ("tests the SHARED FUNCTION ONLY … CANNOT prove per-target routing") and `tools/agent-generator/spans.ts` header name Task 14 as the arbiter; `.kiro/specs/123-consumer-distribution/tasks.md` Task 14 criterion "Body per-target, two-sided … **This is the arbiter for Task 10's consolidation claim.**" The twin's bite (profile-sourced span → `Received: "consumer:#regrounded"`, 2 failed) is recorded in `task-10-5-completion.md` as a function test only. |
| 122 diff-guard is green (sidecars change; the steward rendered text does not). | ✅ verified met | `npx tsx tools/agent-generator/diff-guard.ts → diff-guard: full-run-green (input-closure-changed)` locally, and `122-diff-guard (unit-branch)` → `diff-guard: full-run-green (input-closure-changed)` in run https://github.com/3fn/DesignerPunk/actions/runs/36345235755 at `4c39fc4c` (the CI probe printed `noop=false`: a full run, not the lock no-op). `git diff --name-only 90fb0e71 4c39fc4c -- .claude .kiro/agents canonical/_fixture-output CLAUDE.md \| grep -v "\.attribution\.json$" \| wc -l → 0` (the rendered text is unchanged); the same diff lists **18** `.attribution.json` sidecars. |

Unmet or partially met criteria: None

---

## Additional verification

Primary Artifacts: all shipped as declared

- `tools/agent-generator/frontmatter.ts`, `tools/agent-generator/partition.ts`, `tools/agent-generator/spans.ts` (new);
- `tools/agent-generator/adapters/cc.ts`, `tools/agent-generator/adapters/kiro.ts` (rewritten through `emitSpans`);
- `tools/agent-generator/__fixtures__/golden-partition/` (four fixture documents plus `expected-units.json`).

No `**Merge gate:**` block is declared for this parent. No artifact is deferred to a later unit.

### Edits outside the Primary Artifacts list (T1-(B) disclosure — each minimal, each with its authority)

| Path | Edit | Authority |
|---|---|---|
| `tools/agent-generator/__tests__/partition.golden.test.ts` (new) | Golden Bite 1, the forward-attachment and fixture-coverage checks, the snapshot ban and its companion, the 17-file invariant | The criteria that demand them (rows 1–4); the design's test id |
| `tools/agent-generator/__tests__/entry-tree.test.ts` (new) | The entry-tree test over `lina.md` | Row 5 ("a test over `lina.md`'s frontmatter") |
| `tools/agent-generator/__tests__/spans.source-origin.test.ts` (new) | The 10.S unit twin | Subtask 10.5; Req 10.8a; the design's test id |
| `tools/agent-generator/__tests__/cc-adapter.test.ts` (+10), `tools/agent-generator/__tests__/kiro-adapter.test.ts` (+2) | Synthetic agents gain the frontmatter origin of their manifest members; no assertion changed | Subtask 10.4 (the adapters these tests exercise now refuse an entry path that does not exist) |
| `tools/agent-generator/source.ts` (6+/6−) | Its private splitter delegates to `frontmatter.ts` | Design C13: "ONE shared function, used by every consumer" |
| 18 `*.attribution.json` sidecars; `canonical/generated.lock` | Regenerated pipeline output (never hand-edited); the lock refreshed by the green diff-guard | Row 9 ("sidecars change") |
| `.kiro/specs/123-consumer-distribution/tasks.md` | Checkbox ticks 10.1–10.5 and 10 only | Task Completion Protocol |

### Validation (at `4c39fc4c`)

- `npm test` → 384 suites, 9268 tests passed.
- `npm run test:agent-generator` → 30 suites, 405 tests passed (baseline at `90fb0e71`: 27 suites, 333). **This lane runs in no CI workflow** (see Carried items).
- `npx tsc --noEmit` → exit 0. The root `tsconfig.json` includes only `src/**`, so this does not cover `tools/`.
- `npx tsc --noEmit -p tools/agent-generator/tsconfig.json` → exit 0.
- `npx tsx tools/agent-generator/diff-guard.ts` → `full-run-green (input-closure-changed)`, then `no-op-green`.
- The other nine 122 checks (`npm run --silent check:122:<name>`) → all exit 0.
- The six dispatched workflows at `4c39fc4c` (the CI-provenance line) → all `completed success`, checked with `gh run view <id> --json status,conclusion,headSha`, each `headSha` = `4c39fc4c`.
- Build noise: none. No `npm run build` ran in this parent, and `git status --porcelain` was clean before the checkpoint beyond the intended files.

---

## Rulings, adaptations and records carried

Adaptations are recorded in the subtask docs. The ones that bear on later tasks:

1. **`emitSpans` takes a piece list, not the design sketch's per-path render callback** (`task-10-4-completion.md` adaptation 1). The division of labor is the one C14 states. Consumer-profile frontmatter **re-pointing** refuses loudly until C17/C22 fix its overlay form.
2. **`toolSubset.<server>[<tool>]`** keys, not `toolSubset[<tool>]` (a real collision: `rebuild_index` under two servers). **An intermediate `ambient[<docid>]` node** exists (`task-10-3-completion.md`).
3. **Bare leaf headings attach forward** (zero today), and the declared splitter limits (ATX only; items at column 0) are in `partition.ts`'s header (`task-10-1-completion.md`).
4. **Measured on the corpus**: 288 charter units (the design's 10.G figure); 69 non-leaf headings, of which 32 are heading-line-only (C13's figures); zero duplicate slugs; 82 identity-doc units against the design's 69, which was measured over a different population and is recorded, not reconciled.

### Carried items

- **For Task 12 / Peter — U2a changes eight SHIPPED files.** `.kiro/agents/` is in `package.json` `files[]`, so the eight regenerated `.kiro/agents/*-prompt.md.attribution.json` sidecars ship. `npm pack --dry-run --json --ignore-scripts` → 1602 files; ∩ `git diff --name-only 90fb0e71 4c39fc4c` → **8** (exactly those sidecars; no rendered text). Task 10's own criterion requires the sidecars to change, so Task 12's "U2a changes no shipped file" intersection **will be non-empty**, and by that criterion the release decision returns to Peter before U2a merges. Surfaced now, not at 12.3. See the report for the fork.
- **For Task 14 (E-fm)**: the write-scope note is ONE sentence naming every glob, so its span is the `writeScope` container. A re-pointed `writeScope[<glob>]` will find no descendant-or-self span under C15's containment. E-fm needs a per-glob rendering in the consumer profile, a containment reading, or the "asserted, not bitten" line. The Kiro config JSON also remains a single render span (no per-entry attribution inside the JSON).
- **For Task 14 (body bites)**: the call sites to mutate are `bodyParts.push(emit('body'))` in `cc.ts` `emitAgent` and in `kiro.ts` `emitPrompt`. The pre-123 inline form to restore is the `acc.add('passthrough', …, \`canonical/agents/${fm.agent}.md#body\`)` pair at `90fb0e71` (`cc.ts:244–247`, `kiro.ts:322–325`).
- **For Task 15.1**: both adapters pass `'steward'` to `emitSpans`; `AdapterContext.profile` replaces that literal. The CC always-layer (`emitAlwaysLayer`, `CLAUDE.md`) still builds its spans inline, which is C19/15.3's lane and Req 10.2's per-section always-set spans.
- **For Task 13 (13.1/13.5)**: `emitSpans` refuses a consumer unit or leaf entry with no disposition row, using its own internal message. The catalog-string refusals (missing row, orphaned key) remain `derive()`'s at 13.5; `emitSpans` does not implement the orphan check.
- **For Task 11**: the `start-up-tasks.md` anchors G and G′ use exist exactly as named (`partition.golden.test.ts › the start-up-tasks item anchors Task 11 names (G and G′) exist`).
- **CI gap (known, not fixed here)**: `npm run test:agent-generator` — which holds Golden Bite 1, the entry-tree test and the twin — runs in **no** CI workflow. `jest.functional.config.js` roots exclude `tools/`, and no workflow calls the script. This is the class that `.kiro/issues/2026-09-27-unit-branch-ci-feedback.md` item (d)(ii) will list mechanically. Until then, these bites guard only when run locally.
