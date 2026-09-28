# Task 10.4 Completion — `emitSpans`; replace both adapters' inline sites and frontmatter loops

**Spec**: 123 — Consumer Distribution · **Unit**: U2a · **Parent**: Task 10 · **Agent**: Lina (Opus)
**CI-provenance**: branch-head dispatch @ 4c39fc4c038243a799a9ebf47830e56d44f4b6f1 — https://github.com/3fn/DesignerPunk/actions/runs/36345223866, https://github.com/3fn/DesignerPunk/actions/runs/36345227715, https://github.com/3fn/DesignerPunk/actions/runs/36345231813, https://github.com/3fn/DesignerPunk/actions/runs/36345235755, https://github.com/3fn/DesignerPunk/actions/runs/36345239944, https://github.com/3fn/DesignerPunk/actions/runs/36345243932

## What changed

- **`tools/agent-generator/spans.ts` (new)** — `emitSpans(acc, source, profile, dispositions, overlay, plan) → { text, lineCount }`, the ONE span-construction function (C14; Req 10.8a Constraint 1).
  - **Body** (`plan = 'body'`): partitioned by `partition()`. Retained → `passthrough <file>#<anchor>`, with the text routed through `renderPassThrough` (the identity function by contract). Re-pointed → `render <file>#<anchor>`, the CANONICAL ORIGIN (10.S). Omitted → no text, no span.
  - **Frontmatter pieces**: `entry` (a named path) or `member` (a list + index, keyed by the entry tree, never by the adapter) → `render <file>#frontmatter:<path>`. An `ambient[…]` embed → `resolve` + `mode: embed`. `shared` → `canonical/shared/shared-catalog.yaml#<id>`. `glue` → a CLOSED table of generator sources (`GLUE_SOURCES`), so an adapter names the glue, never its source string.
  - **Guards**: a path that names no entry refuses (an adapter cannot cite a nonexistent entry); a piece that does not end in a newline refuses (spans are whole lines); the steward profile refuses dispositions and overlays; the consumer profile requires dispositions, and a unit or leaf entry without a row refuses (never implied `retained`).
- **`adapters/cc.ts`** `emitAgent` and **`adapters/kiro.ts`** `emitPrompt`/`emitConfig`: every agent-file span now goes through `emitSpans`.
  - The body inline sites (`cc.ts` L244–247, `kiro.ts` L322–325) are replaced by `emit('body')`.
  - Every frontmatter-section loop now builds pieces: CC frontmatter, ambient embeds, ground truth, routing, commands and shared catalog, knowledge fallback, write scope, pre-flight.
  - Kiro's machine-JSON config keeps its single render span (same source string), now constructed by `emitSpans` as a `kiro-config` glue piece.
  - `renderPassThrough` is no longer imported by either adapter, and the dead `ensureTrailingNewline` (kiro) and `allNamespacedTools` (cc; replaced by `namespacedToolEntries`, the same sort) are removed. The adapter headers are updated.
- **Regenerated** (`npx tsx tools/agent-generator/generate.ts` → `wrote 274 files`):
  - 18 prose sidecars changed: 8 `.claude/agents/*.md.attribution.json`, 8 `.kiro/agents/*-prompt.md.attribution.json`, and the two `_fixture` sidecars under `canonical/_fixture-output/`;
  - **no rendered text changed**: `git diff --name-only | grep -vE "\.attribution\.json$|^tools/agent-generator/"` → empty. The Kiro `.json` config sidecars are byte-unchanged;
  - `canonical/generated.lock` refreshed by the green diff-guard.
- **The new sidecars, checked** (scratchpad script over every changed sidecar with `checkAttributionTotality`): **18 sidecars, 0 invalid, 1,692 spans, 576 passthrough**. 576 = 288 charter units × 2 targets, the design's finest-grain count.

## Targeted tests + result

- `grep -nE "acc\.add\('passthrough'" tools/agent-generator/adapters/cc.ts tools/agent-generator/adapters/kiro.ts | wc -l` → **0**. *Limit (S-T-A7): the grep is pattern-bound; other span-adding forms would pass it.* The remaining `acc.add` calls in `cc.ts` (lines 442 and 454 at this commit) are `emitAlwaysLayer`'s `CLAUDE.md` spans, the always-layer lane (C19, Task 15), not agent bodies or frontmatter.
- `npm run test:agent-generator` → **30 suites, 405 tests passed**.
- `npx tsx tools/agent-generator/diff-guard.ts` → `diff-guard: full-run-green (input-closure-changed)`, then `diff-guard: no-op-green` on the refreshed lock.
- The other nine 122 checks, run locally (`npm run --silent check:122:<name>`): canonical-vs-truth, sweep-1-refs through sweep-8-demotion → **all exit 0**.
- `npx tsc --noEmit -p tools/agent-generator/tsconfig.json` → 0 errors.

## Application-time adaptations

1. **The sixth parameter is a piece list, not the design sketch's `renderFrontmatterEntry: (path) => string` callback.** The adapters' sections interleave section glue, shared-catalog members and generator text with entries, in target-specific order, so a per-path callback cannot express a section. The division of labor is the one C14 states: the adapter supplies the rendered text of each piece, and `emitSpans` constructs every span and decides every source. *Residual for Task 14/15*: consumer-profile frontmatter RE-POINTING re-renders an entry from a re-grounded value. Whether that value arrives as a derived frontmatter (C22) or as overlay text is C17/C22's to decide, so `emitSpans` refuses it loudly for now ("not implemented yet").
2. **Write scope is sourced to the `writeScope` container, not per glob.** The note is ONE rendered sentence naming every glob, and a line cannot carry per-member spans. **Carried to Task 14 (E-fm)**: re-pointing `writeScope[<glob>]` will find its derivation span at the container, which `isDescendantOrSelf` does not count, so E-fm needs a per-glob rendering in the consumer profile or a containment reading. Task 14 records it, or the "asserted, not bitten" line.
3. **Section headers and trailers** are container-sourced (`#frontmatter:routes`, `…:commands`, `…:knowledgeBases`, `…:preflight`) as two spans per section. When an agent declares no `commands` entry but shared-catalog members exist, the Commands header falls back to the `shared-catalog-section` glue. No charter hits this today; the adapter unit tests do.
4. **`AdapterContext.profile` is not added here** (Task 15.1's). Both adapters call `emitSpans` with `'steward'`.
5. **Out-of-list edits.** Each is minimal; the authority is the named criterion.
   - `tools/agent-generator/__tests__/cc-adapter.test.ts` (+10 lines) and `kiro-adapter.test.ts` (+2 lines). Their synthetic `ResolvedAgent`s carried a per-agent manifest member and ground-truth directives with no frontmatter origin, which `emitSpans` now refuses. Each fixture gains the matching frontmatter entry; no assertion changed. *Authority*: 10.4 itself (the adapters these tests exercise route through `emitSpans`).
   - The 18 regenerated sidecars and `canonical/generated.lock`. They are pipeline output, not hand edits. *Authority*: the criterion "122 diff-guard is green (sidecars change; the steward rendered text does not)".
6. **This checkpoint commit also carries 10.5's code** (`spans.source-origin.test.ts` and the 17-file block of `partition.golden.test.ts`). `complete-task.sh` stages with `git add -A`, and every code change is final here, so the parent's CI-provenance line can bind to this commit (completion guide § "CI provenance", rule 5). 10.5's doc records its own results.
