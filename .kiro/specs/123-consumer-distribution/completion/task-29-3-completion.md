# Task 29.3 Completion: Kiro per-entry attribution (the JSON) and the glob-only knowledge note (the prompt), per C7 as amended by Peter's ruling (A)

**Date**: 2026-10-12
**Agent**: Lina (Opus), PRIMARY Task 29
**Branch**: `task/123-u3g-g2c2`, on 29.2 (`d9082bc62`).

## What changed
- **`tools/agent-generator/adapters/kiro.ts`**:
  - **`emitConfig`: the JSON carries per-entry spans.**
    - The canonical JSON's lines are split by provenance (`jsonPieces`) and emitted through `emitSpans` under the agent's profile, so a re-pointed member's derived key maps back to its canonical path.
    - Attributed: `name` (`agent`), `description`, `keyboardShortcut`/`welcomeMessage` (`kiro.*`), a skill or source-bearing knowledge-base resource (its member), each `allowedPaths` line (`writeScope` member) and each `hooks.agentSpawn` item (`preflight` member).
    - Glue: braces, `prompt`, `includeMcpJson`, `tools`, every `allowedTools` grant (an `@<server>` grant derives from a whole `toolSubset.<server>` list, and a container span without a member span fails the Task 15.3 survivor rule), and doc references in `resources` (attributing one to `ambient[…]` would mark it as an inline embed).
    - **The bytes are asserted equal to `canonicalStringify(config)`, or the adapter throws.**
  - **`emitPrompt` (e): a `## Knowledge fallback` note for GLOB-ONLY knowledge bases**, one member span each, rendered as `- <name>: search these paths: <globs>`. Source-bearing ones stay config resources.
  - **The comment is reconciled** (Thurgood's condition). The old (e) comment ("carried in emitConfig via the `handled-elsewhere` disposition") contradicted the `kbResources` filter. The new comment states that only source-bearing knowledge bases are carried in `emitConfig`, and that glob-only ones have no Kiro-native form and render here. The emitPrompt header comment is updated to match.
- **Regenerated** (`tsx tools/agent-generator/generate.ts`; the lock was not written): 29 output paths moved, listed under § Moved outputs.
- **Tests**:
  - `semantics-guard.test.ts` gains a `kiro — 29.3` block, built on semguard plus one glob-only knowledge base in memory:
    - the Kiro JSON **alone** derives `writeScope[.kiro/specs/**]` and `description`;
    - the Kiro prompt **alone** derives the glob-only knowledge base.
  - The block comment that said the JSON is not claimed is corrected.
  - Two out-of-list tests are updated (§ Application-time adaptations):
    - `kiro-adapter.test.ts`: the single-span JSON assertion becomes per-entry, total, and bytes equal to `canonicalStringify`; the "no Knowledge fallback" assertion becomes glob-only-renders plus source-bearing-does-not;
    - `consumer-rendering.survivors.test.ts`: the survivor checker now also flags the JSON line.
- **Bite records**: `__fixtures__/semantics-guard/__bites__/task-29-3-bite-{json,kbnote}-{red,green}.txt`.

## Moved outputs (C7's `git diff --stat` instrument, as amended)
- **The JSONs**: no `*.json` byte moved.
- **Sidecars (23)**:
  - consumer: `canonical/_consumer-output/kiro/.kiro/agents/{ada,data,kenya,leonardo,lina,sparky,stacy,thurgood}.json.attribution.json`;
  - steward: `.kiro/agents/{same eight}.json.attribution.json`;
  - prompt sidecars on both legs: `{data,kenya,stacy}-prompt.md.attribution.json`, three per leg;
  - **`canonical/_fixture-output/kiro/.kiro/agents/_fixture.json.attribution.json`** (out of list; see below).
- **Prompts (6)**: `canonical/_consumer-output/kiro/.kiro/agents/{data,kenya,stacy}-prompt.md` and `.kiro/agents/{data,kenya,stacy}-prompt.md`. These are the agents with a rendered glob-only knowledge base. No other agent has one.
- **Under `canonical/_consumer-output/kiro/**`**: `*.attribution.json` plus the three `*-prompt.md` files, and nothing else. That is the amended C7 instrument, held.

## The rendered note (consumer leg; read and accepted by its seats)
- data: `## Knowledge fallback` / `- android-components: search these paths: node_modules/@3fn/core/src/components/core/*/platforms/android/**`
- kenya: `- ios-components: search these paths: node_modules/@3fn/core/src/components/core/*/platforms/ios/**`
- stacy:
  - `- completion-docs: search these paths: specs/*/completion/**`
  - `- spec-summaries: search these paths: specs/*/task-*-summary.md`
  - `- source-tree: search these paths: src/**, scripts/**`

On the steward leg the same form carries the canonical globs: data and kenya also render `android-tests` and `ios-tests`, and stacy renders `.kiro/specs/*/completion/**` and `docs/specs/**`.

## The reads (C7 amendment: Kenya, Data and Stacy read the rendered note before 29.3 commits)
Relayed by the orchestrator on 2026-10-12. **The read files are not on disk on this branch**; the lines below are the orchestrator's relay, quoted as received, as at Task 31.3.
- **Kenya — ACCEPT, no change to the note**: "both globs resolve — steward here, consumer against `package.json` `files`; a Kiro agent can act on 'search these paths:'; no Kenya row moves — his five signed rows re-hashed EQUAL".
- **Data — ACCEPT, no change to the note**: "consumer glob resolves per `files` L79–82; `android-tests` correctly not rendered for consumers; all Data rows EQUAL incl. `knowledgeBases[android-tests]`; `kiro.ts` asserts JSON bytes unchanged".
- **Stacy — ACCEPT, no change to the note**: "note true for a Kiro Stacy; `specs/*/completion/**` matches nothing until `init` scaffolds `specs/` — harmless, not false; attribution gives D0/KB0/KB1/E6 what they need; E2–E5 depend on the standing test at 29.4".

## Results
- **The sizing harness re-run on the regenerated outputs** (`u3g-sizing.md` § Appendix `size.ts`, unchanged): **169/169 VERIFIED**; 0 fail; 169/169 destinations = S.
  - The harness's "merged-machinery" column is now not meaningful. It calls the current module without a derived-value lookup, so it is fail-closed on frontmatter.
- **Stale list** (no-write guard, `runGuard(root, { refreshLock: false })`): exactly one row, `canonical/profiles/consumer/stacy.dispositions.yaml#knowledgeBases[spec-summaries]` (`stale-signature`). One seat, as planned (limb (iii) not fired). It is resolved at 29.6.
- **Bites**:
  - the JSON back to one glue span: 1 fails (the JSON-alone test);
  - the knowledge note removed: 1 fails (the prompt-alone test);
  - both pass as written (2/2 each, `-t 29.3`).
- `npm run test:agent-generator`: **1675/1676**. The one red is `operative-set-freshness.test.ts › the sweep over the real repo`, on the same stale row. It clears with 29.6's re-sign.
- `tsc --noEmit` (root and `tools/agent-generator`): exit 0.

## Application-time adaptations
1. **Allowed-tool grants stay glue.** The first cut attributed each `@<server>` grant to its `toolSubset.<server>` container. The real-profile survivor test refused that: 23 container spans had no member span in the JSON. A grant is derived from a whole list, not from one member, so glue is the honest attribution. No re-pointed row is a `toolSubset` row (Stacy's attack file § 2.4).
2. **Four edits outside Task 29's Primary Artifacts, each forced by ruling (A) or by the per-entry JSON.** They are recorded `unlisted` in the instruments block, and a grant has been requested from Peter (2026-10-12):
   - `grain-guard.two-sided.test.ts` (29.2);
   - `kiro-adapter.test.ts`;
   - `consumer-rendering.survivors.test.ts`;
   - the regenerated `canonical/_fixture-output/kiro/.kiro/agents/_fixture.json.attribution.json`.
3. **The note's wording is mine.** It is deliberately tool-neutral ("search these paths:"), unlike CC's "with Grep/Glob", because Kiro's tool names differ. All three seats accepted it unchanged.
