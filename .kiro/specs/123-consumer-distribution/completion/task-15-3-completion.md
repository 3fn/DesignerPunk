# Task 15.3 completion: identity members per target, and the consumer rendering as rendering(derive(x))

**Spec**: 123 (Consumer Distribution) · **Unit**: U2b · **Parent**: Task 15 · **Agent**: Thurgood (Opus), PRIMARY
**Date**: 2026-09-29 · **Branch**: `task/123-u2b-profile` (main checkout), from `e4dfa9e3` (#240 merged in: the grant for 15.3–15.5, the survivor-sourced criterion, the 15.0 (b) erratum and its R3 generic refusal)

**Write scope**:
- **Inside the grant** (Task 15's row as amended by #240):
  - `tools/agent-generator/adapters/{cc,kiro,index}.ts` and `tools/agent-generator/spans.ts` ("15.0 and 15.3–15.5");
  - `tools/agent-generator/{derive,generate}.ts`.
- **Out-of-list, disclosed**:
  - **`tools/agent-generator/regrounding/freshness.ts`** (Task 13's file, already disclosed at 15.1): the shared catalog's overlay keys its `## @entry` blocks by member id. The sweep's orphan and pin checks read the members for `_shared.overlay.md` (8 lines).
  - **Tests, each following an intended semantic change**:
    - `consumer-profile.adapters.test.ts` (15.0's): (b) re-cited under the erratum; (a) and (c) render the derived frontmatter; one new refusal case.
    - `consumer-rendering.test.ts` (15.1's): the async lane; population by file.
    - `spans.source-origin.test.ts` (Task 10's twin, edited at 15.0): the consumer case restated.
    - **Lina's** `derive.stale-overlay.test.ts` (15.2): the "refused, pending Q1" cases become the value-substitution and generic-refusal cases; the render-refusal case uses the new signature.
    - **Lina's** `derivation.frontmatter.test.ts` (Task 14.5): an omitted command is pruned before rendering. The verdicts asserted are unchanged.
    - **Lina's** `semantics-guard.fixture.test.ts` (14.2): the `_fixture.md` consumer overlay entry is a value, and the overlay is passed parsed.
  - **New**: `consumer-rendering.survivors.test.ts`, and `__tests__/survivor-sourced.ts` (the survivor check as a helper, reused at 15.4 over the real profile).
  - **Lina's Task 14 fixture, the minimum to keep `semantics-guard.test.ts` green at this commit** (the #240 criterion requires it after every adapter or `spans.ts` edit):
    - `__fixtures__/semantics-guard/canonical/profiles/consumer/semguard.overlay.md`: the two `## @entry` bodies become values. Pins unchanged.
    - `__fixtures__/semantics-guard/index.ts`: the loader derives, so the consumer resolution renders the derived frontmatter, and exports `entryOrigin`.
    - `README.md`: a note on the value form.
    - **Her bite re-runs and logs** (`__bites__/task-14-4-*`, recorded against the prose form) are **not** redone here. They are her Task 14 addendum.
  - `canonical/generated.lock` is not committed; it is refreshed at the parent.

**CI-provenance**: branch-head dispatch @ def8184e28faeace9c04fc5c486460f4d0656c10 — https://github.com/3fn/DesignerPunk/actions/runs/36562648975, https://github.com/3fn/DesignerPunk/actions/runs/36562658024, https://github.com/3fn/DesignerPunk/actions/runs/36562671835, https://github.com/3fn/DesignerPunk/actions/runs/36562680113, https://github.com/3fn/DesignerPunk/actions/runs/36562687822, https://github.com/3fn/DesignerPunk/actions/runs/36562695714

**Instruments served** (block rows): 3.1, 3.4 (fixture level), 2.5 (the `<target>/` identity layout), the survivor-sourced row's fixture half, and the Kiro JSON consumer form (block note N3, now decided); `## Found later` 2026-09-29 (shared members) resolved in code.

## What changed

**The architecture: "target renderings = rendering(derive(x))".** Under the consumer profile the adapters now render **`derive()`'s frontmatter**, not the canonical one, and the resolver runs on the derived charter. Four things follow from that construction:
- disposed entries are gone before any adapter sees them;
- a re-pointed entry carries its **substituted value**, so each adapter's own per-kind renderer renders it (the 15.0 (b) erratum);
- the ambient manifest, the embeds, the Kiro `resources` / `allowedPaths` and CC `tools:` are all built from surviving values;
- empty sections vanish through the adapters' existing emptiness guards.

`emitSpans` then only attributes, and refuses anything inconsistent with that.

- **`derive.ts`**:
  - **Value substitution replaces `repointedEntryPendingMessage`.** Each re-pointed row's `## @entry` body is parsed as YAML and substituted at the leaf's tree position (`substituteFrontmatter`), and the result is then pruned.
  - **The one generic refusal**, `overlayValueMessage`, rejects a value that is: missing, not YAML, a different JSON type, a map with a different key set, or a **map** member whose entry path (its identity) changes. A string member's identity is its value, so its path may change.
  - **`entryOrigin`** maps each derived leaf path back to its canonical one. It is computed by zipping the surviving canonical leaves with the derived leaves in document order, and an internal invariant throws if they differ in count.
  - **`deriveSharedCatalog`** substitutes re-pointed members, which must keep their `id`, and checks the `_shared.overlay.md` keys and pins against the members.
- **`spans.ts`**:
  - **Consumer frontmatter pieces are attributed through `source.entryOrigin`.** The row lookup and the provenance use the canonical path.
  - **It refuses**:
    - a disposed leaf that still rendered;
    - a disposed or row-less shared member;
    - a re-pointed ambient embed (DD19);
    - **a container piece with no leaf under it** (`hasLeafUnder`).
  - `## @entry` text is no longer read here.
  - New glue: `identity-frontmatter` (`C19:identity-frontmatter`).
  - `Dispositions.members` holds the shared rows.
- **`adapters/index.ts`**:
  - `ConsumerInputs.entryOrigins`, and `spanInputsFor` returns `entryOrigin`.
  - `AdapterContext.embedSections`.
  - **`TargetAdapter.emitIdentityMembers`**, with `IdentityMemberInput`, `identityMemberName` (`designerpunk-<id>`) and `renderIdentityMember`, which routes the member **body through `emitSpans`** under the consumer profile.
- **`adapters/cc.ts`**:
  - `emitIdentityMembers` → `.claude/identity/designerpunk-<id>.md`, the derived body only.
  - **Consumer ambient embeds render one span per asserted section**: `### <docid>` is the container, and each section is its own leaf span, `ambient[<docid>#<slug>]`. The bytes equal the steward's joined form.
  - `src.entryOrigin`.
- **`adapters/kiro.ts`**:
  - `emitIdentityMembers` → `.kiro/steering/designerpunk-<id>.md` with a fresh `---\nid: designerpunk-<id>\ninclusion: always\n---\n\n` glue block.
  - `src.entryOrigin`.
- **`generate.ts`**:
  - **`generateConsumerRendering(input)`** is now async and pure, given an injected `resolve`. It runs:
    - **Population, by file.** Nothing authored → `[]`. Partly authored → throws, listing every missing file (agents, `_shared`, every identity doc).
    - **Derive everything first**: the shared catalog → `_canonical/shared/shared-catalog.yaml`; each identity doc → `_canonical/always-set/<id>.md`; each agent → `_canonical/agents/<a>.md`. **Each derived charter must pass the steward `validate()`** (#240 R3: class-level validation).
    - **Then emit**. Each derived charter is resolved and emitted through every adapter, with the derived shared catalog, the consumer `docIdToPath`, the rows (plus the shared `members`) and `entryOrigin`. Then `emitIdentityMembers`.
  - **`consumerDocIdToPath`**: an identity doc → `.kiro/steering/designerpunk-<id>.md`; `personal-note` (`TEMPLATE_MEMBERS`) → `.designerpunk/personal-note.local.md`; everything else → `node_modules/@3fn/core/<path>` (`CONSUMER_PACKAGE_ROOT`).
  - `loadIdentityDocs`, and the profile paths `_shared.*` and `always-set/<id>.*`.
  - `buildEmbedSections`; `buildEmbeds` joins them, and the steward bytes are unchanged.
  - `generateAll` runs the consumer lane inside the corpus session.
  - `generateFixture`'s consumer lane derives first, and renders no shared members, because their rows are the real profile's.

## Targeted tests + result

- `consumer-rendering.survivors.test.ts` → **12 passed**. `derive.stale-overlay.test.ts` → 21. `consumer-profile.adapters.test.ts` → 17. `consumer-rendering.test.ts` → 12. `semantics-guard.test.ts` + `semantics-guard.fixture.test.ts` → 27 + 6 (**the Task 14 arbiter stays green**). `derivation.frontmatter.test.ts` + `spans.source-origin.test.ts` → 18.
- **Bites.** Each one mutated a file and ran the five suites (89 tests); the file was restored from a copy.

  | # | Mutation | Red |
  |---|---|---|
  | B1 | a disposed leaf still rendered is silently dropped (no throw) | 3: `… rendering the CANONICAL frontmatter under the consumer profile refuses a disposed entry` (cc, kiro), `emitSpans … consumer (Task 15.3) …` |
  | B2 | the container check off | 1: `emitSpans refuses a container piece with no leaf under it (consumer)` |
  | B3 | no substitution (the canonical value kept) | 12, incl. `cc › frontmatter › E-fm's re-grounded text is what shipped`, `(b) … overlay VALUE via the field's per-kind renderer`, `a string member …`, `the Kiro JSON config's consumer form …` |
  | B4 | the JSON-type check off | 1: `the ONE generic refusal …` |
  | B5 | the map-identity check off | 1: `the ONE generic refusal …` |
  | B6 | `entryOrigin` ignored | 27 |
  | B7a | the steward catalog rendered instead of the derived one | 8: the survivor, shared, ambient, identity and Kiro tests, because the guard throws on `drop-me` |
  | B7b | the same, with the shared guard also removed | 5, incl. `shared-catalog members follow _shared.dispositions.yaml: a this-repo member never ships …` |
  | B8 | a third key in Kiro's identity frontmatter | 1: `CC and Kiro each get designerpunk-<id>.md; Kiro carries exactly id + inclusion: always …` |
  | B9 | the consumer `docIdToPath` not applied | 8, incl. `builds from derived values: … resources point at member files and the installed package, per entry` |
  | B10 | consumer ambient rendered joined (no per-section spans) | 5, incl. `the ### <docid> header is a container over per-section spans …` |

- **`npm run test:agent-generator`** → **`Test Suites: 51 passed, 51 total` · `Tests: 813 passed, 813 total`**.
- `npx tsc --noEmit -p .` → 0. `tsc -p tools/agent-generator` → 0.
- **Steward byte-identity** (the #240 row's steward clause): `npm run check:122:diff-guard` → `operative-set-freshness: PASS — 4 record(s), 24 unit(s), 4 note(s), 0 dispositions file(s), 0 overlay(s)` · **`diff-guard: full-run-green (input-closure-changed)`**. Every guarded output is byte-identical; the lock refresh was reverted. The consumer lane emits nothing yet, because no profile file exists.

## Application-time adaptations

1. **The survivor check's two block containers.**
   - CC's `skills` (the single `Skill` tool line) and `ambient.groundTruthManifest` (one rendered paragraph) render their members as one block, so no member span exists.
   - For those two, the check (`survivor-sourced.ts`) requires a surviving member **row** under the node. This is the check's stated limit, recorded in its header.
   - The criterion's "container with at least one surviving member span" holds for every other container, including CC's ambient embeds, which were changed to per-section spans so that it would.
2. **The Kiro identity frontmatter `id` is prefixed**: `id: designerpunk-<id>`, so it matches the file prefix and cannot collide with a consumer's own steering doc id.
3. **Kiro `resources` for non-identity docs** point into the installed package: `file://node_modules/@3fn/core/<path>`. Whether each such path exists in a packed install is Task 16's check, alongside the Kenya/Data knowledge paths.
4. **`personal-note` has no member file.** It is a template member, and its Kiro resource points at `.designerpunk/personal-note.local.md` (C19; Task 22 creates the file).
5. **The CC always-mechanism** (the `CLAUDE.md` marker region of `@`-imports) is the consumer lane's (C20, Task 16). 15.3 emits the member files it will import.
6. **Rendering reads the derived frontmatter with the canonical body.** The body rows key canonical anchors; the body's selection is `emitSpans`, which is the same in both. `validate()` runs on the full derived charter (derived frontmatter + derived body).
7. **The value form Lina's addendum needs**:
   - **An `## @entry` body is a YAML value** of the same JSON type as the canonical value: a glob is a bare string (`specs/**`); a command is the full command object with the canonical key set and the same `name`.
   - The pin is unchanged: `hashEntry` of the canonical value.
   - `semguard.overlay.md` already carries this form at this commit. Her addendum re-runs the 14.4 bites against it and re-records the logs.

*CI provenance (docs-only follow-up, 2026-09-29)*: all six runs dispatched at `def8184e` concluded `success`. The line above was `local` in the code commit. This commit changes only this doc.
