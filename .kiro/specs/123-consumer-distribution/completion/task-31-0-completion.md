# Task 31.0 Completion — pre-edit instruments: the broad sweep, the stale list, the `renderedHashOf` baselines

**Date**: 2026-10-12
**Agent**: Thurgood (Opus) · PRIMARY, Task 31
**Branch**: `task/123-u3c-profile-corrections` (a worktree, cut from `origin/main` @ `dcd337dcf`), after the instruments block (`110e1174d`). **No edit has been made yet.**

**Build of the worktree** (it was fresh). Run in this order:
1. `npm ci`
2. `npm ci --prefix mcp-server`
3. `npm ci --prefix application-mcp-server`
4. `npm run build` (its `prebuild` runs `generate:types` and `generate:platform-tokens`; the build includes `build:mcp` and `build:consumer-canonical`)
5. `npm run build --prefix mcp-server`
6. `npm run build --prefix application-mcp-server`, which the diff guard's registry introspection needs: it failed to boot `application-mcp-server/dist/index.js` before this step

The build left one stray change, `docs/tokens.css` (a timestamp-only diff); it was reverted.

**Results on this tree before any edit**:
- `npx tsc --noEmit`: exit 0.
- `npm run test:agent-generator`: 58/58 suites, 1635/1635 tests.
- The diff guard: `full-run-green (input-closure-changed)`. Its lock write was reverted; see the instruments block's "found at the branch cut".

## 1. The broad sweep (criterion C3) — the pattern, verbatim from the plan, over both overlays and every rendered Kenya and Data consumer text (sidecars excluded)

```
git grep -n -E 'theme (Swift|Kotlin)|[Gg]enerated (Swift|Kotlin) output|materiali[sz]e|\{Name\}Theme|\{Abbreviation\}Theme|\{abbreviation\}Theme|ThemeKey|theme types' -- \
  canonical/profiles/consumer/kenya.overlay.md canonical/profiles/consumer/data.overlay.md \
  canonical/_consumer-output/{_canonical/agents/{data,kenya}.md,cc/.claude/agents/{data,kenya}.md,kiro/.kiro/agents/{data-prompt.md,data.json,kenya-prompt.md,kenya.json}}
```

**42 hits**:
- 9 are in the overlays: kenya L27, L38, L39, L147, L160; data L27, L38, L39, L159. These are the plan's seed set, exactly.
- 33 are in the six rendered Markdown files.
- The two Kiro JSON files have 0 hits.

The output, verbatim:

```
canonical/_consumer-output/_canonical/agents/data.md:107:    cue: regenerate your platform token output — including your theme Kotlin and product tokens — from your token source and `designerpunk.config.ts`
canonical/_consumer-output/_canonical/agents/data.md:181:- Consuming DesignerPunk Android tokens — static tokens via `DesignTokens`, theme-varying colors via `Local{Abbreviation}Theme.current`
canonical/_consumer-output/_canonical/agents/data.md:191:- Generated Kotlin output includes: `{Name}Theme` data class, named instances in `{Name}Themes` object, `Local{Abbreviation}Theme` CompositionLocal
canonical/_consumer-output/_canonical/agents/data.md:192:- Product apps wrap content with `CompositionLocalProvider(Local{Abbreviation}Theme provides themeInstance)` for subtree theming
canonical/_consumer-output/_canonical/agents/data.md:202:- Theme-varying tokens: `@Composable @ReadOnlyComposable get()` accessing `Local{Abbreviation}Theme.current.{prop}` — must be read inside composition scope
canonical/_consumer-output/_canonical/agents/kenya.md:100:    cue: regenerate your platform token output — including your theme Swift and product tokens — from your token source and `designerpunk.config.ts`
canonical/_consumer-output/_canonical/agents/kenya.md:108:    gap: product-screen build/test/run commands are per-product — read them from this iOS app's own build setup (theming Swift materializes here via `npx designerpunk generate`).
canonical/_consumer-output/_canonical/agents/kenya.md:169:- Consuming DesignerPunk iOS tokens — static tokens via `DesignTokens`, theme-varying colors via `@Environment(\.{abbreviation}Theme)`
canonical/_consumer-output/_canonical/agents/kenya.md:179:- Generated Swift output includes: `{Name}Theme` protocol, concrete structs per theme, `{Abbreviation}ThemeKey: EnvironmentKey`
canonical/_consumer-output/_canonical/agents/kenya.md:180:- Product apps wrap content with `.environment(\.{abbreviation}Theme, themeInstance)` for subtree theming
canonical/_consumer-output/_canonical/agents/kenya.md:189:- Theme-varying tokens: protocol extension on `{Name}Theme` — access via `theme.product{Category}{Name}`
canonical/_consumer-output/cc/.claude/agents/data.md:57:- Consuming DesignerPunk Android tokens — static tokens via `DesignTokens`, theme-varying colors via `Local{Abbreviation}Theme.current`
canonical/_consumer-output/cc/.claude/agents/data.md:67:- Generated Kotlin output includes: `{Name}Theme` data class, named instances in `{Name}Themes` object, `Local{Abbreviation}Theme` CompositionLocal
canonical/_consumer-output/cc/.claude/agents/data.md:68:- Product apps wrap content with `CompositionLocalProvider(Local{Abbreviation}Theme provides themeInstance)` for subtree theming
canonical/_consumer-output/cc/.claude/agents/data.md:78:- Theme-varying tokens: `@Composable @ReadOnlyComposable get()` accessing `Local{Abbreviation}Theme.current.{prop}` — must be read inside composition scope
canonical/_consumer-output/cc/.claude/agents/data.md:515:- regenerate your platform token output — including your theme Kotlin and product tokens — from your token source and `designerpunk.config.ts`: `npx designerpunk generate` (run from your product repo)
canonical/_consumer-output/cc/.claude/agents/kenya.md:56:- Consuming DesignerPunk iOS tokens — static tokens via `DesignTokens`, theme-varying colors via `@Environment(\.{abbreviation}Theme)`
canonical/_consumer-output/cc/.claude/agents/kenya.md:66:- Generated Swift output includes: `{Name}Theme` protocol, concrete structs per theme, `{Abbreviation}ThemeKey: EnvironmentKey`
canonical/_consumer-output/cc/.claude/agents/kenya.md:67:- Product apps wrap content with `.environment(\.{abbreviation}Theme, themeInstance)` for subtree theming
canonical/_consumer-output/cc/.claude/agents/kenya.md:76:- Theme-varying tokens: protocol extension on `{Name}Theme` — access via `theme.product{Category}{Name}`
canonical/_consumer-output/cc/.claude/agents/kenya.md:376:- regenerate your platform token output — including your theme Swift and product tokens — from your token source and `designerpunk.config.ts`: `npx designerpunk generate` (run from your product repo)
canonical/_consumer-output/cc/.claude/agents/kenya.md:378:- product-screen build/test/run commands are per-product — read them from this iOS app's own build setup (theming Swift materializes here via `npx designerpunk generate`). — you need product-screen build/test/run commands (authored per product)
canonical/_consumer-output/kiro/.kiro/agents/data-prompt.md:27:- Consuming DesignerPunk Android tokens — static tokens via `DesignTokens`, theme-varying colors via `Local{Abbreviation}Theme.current`
canonical/_consumer-output/kiro/.kiro/agents/data-prompt.md:37:- Generated Kotlin output includes: `{Name}Theme` data class, named instances in `{Name}Themes` object, `Local{Abbreviation}Theme` CompositionLocal
canonical/_consumer-output/kiro/.kiro/agents/data-prompt.md:38:- Product apps wrap content with `CompositionLocalProvider(Local{Abbreviation}Theme provides themeInstance)` for subtree theming
canonical/_consumer-output/kiro/.kiro/agents/data-prompt.md:48:- Theme-varying tokens: `@Composable @ReadOnlyComposable get()` accessing `Local{Abbreviation}Theme.current.{prop}` — must be read inside composition scope
canonical/_consumer-output/kiro/.kiro/agents/data-prompt.md:308:- regenerate your platform token output — including your theme Kotlin and product tokens — from your token source and `designerpunk.config.ts`: `npx designerpunk generate` (run from your product repo)
canonical/_consumer-output/kiro/.kiro/agents/kenya-prompt.md:27:- Consuming DesignerPunk iOS tokens — static tokens via `DesignTokens`, theme-varying colors via `@Environment(\.{abbreviation}Theme)`
canonical/_consumer-output/kiro/.kiro/agents/kenya-prompt.md:37:- Generated Swift output includes: `{Name}Theme` protocol, concrete structs per theme, `{Abbreviation}ThemeKey: EnvironmentKey`
canonical/_consumer-output/kiro/.kiro/agents/kenya-prompt.md:38:- Product apps wrap content with `.environment(\.{abbreviation}Theme, themeInstance)` for subtree theming
canonical/_consumer-output/kiro/.kiro/agents/kenya-prompt.md:47:- Theme-varying tokens: protocol extension on `{Name}Theme` — access via `theme.product{Category}{Name}`
canonical/_consumer-output/kiro/.kiro/agents/kenya-prompt.md:292:- regenerate your platform token output — including your theme Swift and product tokens — from your token source and `designerpunk.config.ts`: `npx designerpunk generate` (run from your product repo)
canonical/_consumer-output/kiro/.kiro/agents/kenya-prompt.md:294:- product-screen build/test/run commands are per-product — read them from this iOS app's own build setup (theming Swift materializes here via `npx designerpunk generate`). — you need product-screen build/test/run commands (authored per product)
canonical/profiles/consumer/data.overlay.md:27:- Consuming DesignerPunk Android tokens — static tokens via `DesignTokens`, theme-varying colors via `Local{Abbreviation}Theme.current`
canonical/profiles/consumer/data.overlay.md:38:- Generated Kotlin output includes: `{Name}Theme` data class, named instances in `{Name}Themes` object, `Local{Abbreviation}Theme` CompositionLocal
canonical/profiles/consumer/data.overlay.md:39:- Product apps wrap content with `CompositionLocalProvider(Local{Abbreviation}Theme provides themeInstance)` for subtree theming
canonical/profiles/consumer/data.overlay.md:159:cue: regenerate your platform token output — including your theme Kotlin and product tokens — from your token source and `designerpunk.config.ts`
canonical/profiles/consumer/kenya.overlay.md:27:- Consuming DesignerPunk iOS tokens — static tokens via `DesignTokens`, theme-varying colors via `@Environment(\.{abbreviation}Theme)`
canonical/profiles/consumer/kenya.overlay.md:38:- Generated Swift output includes: `{Name}Theme` protocol, concrete structs per theme, `{Abbreviation}ThemeKey: EnvironmentKey`
canonical/profiles/consumer/kenya.overlay.md:39:- Product apps wrap content with `.environment(\.{abbreviation}Theme, themeInstance)` for subtree theming
canonical/profiles/consumer/kenya.overlay.md:147:gap: "product-screen build/test/run commands are per-product — read them from this iOS app's own build setup (theming Swift materializes here via `npx designerpunk generate`)."
canonical/profiles/consumer/kenya.overlay.md:160:cue: regenerate your platform token output — including your theme Swift and product tokens — from your token source and `designerpunk.config.ts`
```

### Dispositions (Thurgood's, by claim class; every hit falls in exactly one class)

Each rendered hit is the rendering of an overlay line or of a retained canonical unit, so it takes its source's disposition.

| Class | Claim | Hits (overlay + rendered) | Disposition (Thurgood) |
|---|---|---|---|
| A | the cue "regenerate your platform token output — **including your theme Swift/Kotlin** — …" (kenya L160, data L159; frontmatter `routes.cues[9]` and its `commands[platform-tokens]` rendering) | 2 + 6 = 8 | **Correct here**, criterion (iii): removed, not reworded, to "regenerate your platform token output and product tokens from your token source and `designerpunk.config.ts`". *Open to Ada*: does "and `designerpunk.config.ts`" overclaim, given that `config.themes` is never applied (her `21c73b60d` fact)? |
| B | `#in-scope`: "theme-varying colors via `@Environment(\.{abbreviation}Theme)`" / "`Local{Abbreviation}Theme.current`" (L27 both) | 2 + 6 = 8 | **Correct here**: Kenya's R2 suggestion, "… once your generated output includes it" (the row is unsigned). The wording is confirmed with Kenya and Data |
| C | `#ios-theming-spec-094` / `#android-theming-spec-094`: "Generated Swift/Kotlin output includes: …" (L38 both) | 2 + 6 = 8 | **Correct here**, criterion (iv), in PR-14's form ("plans to address", Spec 129, no date). The `theming-1` removal (and whichever of Kenya's `theming-1`–`-3` no longer hold) is authored in 31.2 |
| D | the provider pattern, "Product apps wrap content with … for subtree theming" (L39 both) | 2 + 6 = 8 | **Kept as true, with its reason**: it describes the intended consumption shape, not generated output. Under (iv)'s PR-14 wording the gap is stated in the same unit (Kenya R2). Kenya and Data confirm |
| E | kenya `commands[product-screen-commands]` gap: "(theming Swift materializes here via `npx designerpunk generate`)" (kenya L147) | 1 + 3 = 4 | **Correct here**: the parenthetical is removed (the row is unsigned, `kenya.dispositions.yaml` L78) |
| F | `#product-tokens-spec-108109`: kenya "Theme-varying tokens: protocol extension on `{Name}Theme`"; data "… `Local{Abbreviation}Theme.current.{prop}` …" | 0 + 6 = 6 | **Carried by name to Spec 129**, not changed here. These are retained canonical units, so there is no overlay line to edit. The emitters do produce that form (`SwiftEmitter.ts:11,49-56`; `KotlinEmitter.ts:11,49-52`, per Kenya's and Data's 19.4 reviews), but against a type nothing defines; that gap is Spec 129's (Kenya's recommendation). Kenya, Data and Ada confirm |
| | **Total** | **9 + 33 = 42** | correct here 28 (A, B, C, E) · kept 8 (D) · carried 6 (F) |

**Kenya's and Data's own dispositions** arrive in `…/scratchpad/u3c/{kenya,data}.md`. They are preserved on the branch and reconciled into this table, with any difference recorded, before the 31.2 authoring commit. **Ada's** fact-check of A, C and F lands before 31.2.

## 2. The freshness stale list, before any edit (criterion C4)

`runFreshnessSweep(<worktree>)` gives **0 findings** (expected empty). Output:

```
STALE LIST (all freshness findings): 0
```

## 3. `renderedHashOf` baselines (criterion C4) — the expected signed set, plus Data's `routes.cues[9]` and trims rows

Computed with `readConsumerSpans` + `rowSpanSource` + `renderedHashOf`, the sweep's own functions (`tools/agent-generator/derive.ts`), before any edit. Each is compared with the row's recorded `signature.renderedHash`:

```
kenya | frontmatter ambient.groundTruthManifest.verdict | disposition=retained | signer=kenya | renderedHashOf=sha256:b7f514bac8ff290bc25b3caf9fcce92724b6d3e83f7aa044ed89468eb4314252 | signed renderedHash=sha256:b7f514bac8ff290bc25b3caf9fcce92724b6d3e83f7aa044ed89468eb4314252 | EQUAL
kenya | frontmatter commands[platform-tokens] | disposition=re-pointed | signer=kenya | renderedHashOf=sha256:a51ec7c296550cce090a6b0151ad0d45630bda089c84a0199526948e0ec64147 | signed renderedHash=sha256:a51ec7c296550cce090a6b0151ad0d45630bda089c84a0199526948e0ec64147 | EQUAL
kenya | body #ios-theming-spec-094 | disposition=re-pointed | signer=kenya | renderedHashOf=sha256:d4203c84f2e984e60da165582dbdec12e7797c22e6dc815e8e2a3f7b64c8b327 | signed renderedHash=sha256:d4203c84f2e984e60da165582dbdec12e7797c22e6dc815e8e2a3f7b64c8b327 | EQUAL
data | frontmatter ambient.groundTruthManifest.verdict | disposition=retained | signer=data | renderedHashOf=sha256:53f5c8db268663f979d72f4d1785f942cf8cdda57e0692e78527f9b98fc6c53e | signed renderedHash=sha256:53f5c8db268663f979d72f4d1785f942cf8cdda57e0692e78527f9b98fc6c53e | EQUAL
data | frontmatter commands[platform-tokens] | disposition=re-pointed | signer=data | renderedHashOf=sha256:e08e5893ccedf081126b3267248756e733fc7537e0bdff7fc5d48c0f654a8cbf | signed renderedHash=sha256:e08e5893ccedf081126b3267248756e733fc7537e0bdff7fc5d48c0f654a8cbf | EQUAL
data | body #android-theming-spec-094 | disposition=re-pointed | signer=data | renderedHashOf=sha256:58222617691f7cc1c769468afd902b1b04fdc8441dbb11e381873861bd20af01 | signed renderedHash=sha256:58222617691f7cc1c769468afd902b1b04fdc8441dbb11e381873861bd20af01 | EQUAL
data | frontmatter routes.cues[9] | disposition=re-pointed | signer=data | renderedHashOf=sha256:285e1817768abdc495edaff0352297a51576cbb5856c3430cf0aae9a6866361c | signed renderedHash=sha256:285e1817768abdc495edaff0352297a51576cbb5856c3430cf0aae9a6866361c | EQUAL
data | frontmatter ambient.groundTruthManifest.trims[dist/android/DesignTokens.android.kt] | disposition=superseded-by | signer=data | renderedHashOf=sha256:37517e5f3dc66819f61f5a7bb8ace1921282415f10551d2defa5c3eb0985b570 | signed renderedHash=sha256:37517e5f3dc66819f61f5a7bb8ace1921282415f10551d2defa5c3eb0985b570 | EQUAL
data | frontmatter ambient.groundTruthManifest.trims[dist/ComponentTokens.android.kt] | disposition=re-pointed | signer=data | renderedHashOf=sha256:e644f5b5b9ceaf0076806967bce80608e466f9a0816893b39a593336e41171b0 | signed renderedHash=sha256:e644f5b5b9ceaf0076806967bce80608e466f9a0816893b39a593336e41171b0 | EQUAL
```

**All nine baselines are EQUAL to their signed hashes.** The expected signed set from the plan is:
- Kenya: `ambient.groundTruthManifest.verdict`, `commands[platform-tokens]`, `#ios-theming-spec-094`;
- Data: the same three.

Any other Kenya or Data row on the post-edit stale list is the red limb of C4. Other seats' `verdict` rows that the shared intro reword moves are named by the post-edit stale list (Lina's issue read says no other seat's verdict row is both rendered and signed; to be verified then).

## Application-time adaptations

1. **The worktree, not the main tree** (the orchestrator's vehicle choice, 2026-10-12): U3c branches from `main`, and the main tree is on U3's branch.
2. **The scratch script** that produced §§ 2–3 (`…/scratchpad/u3c-baseline.ts`) is not committed. It only imports `freshness.ts` and `derive.ts`. Its output is pasted above.
3. **The attributions were verified by reading the overlay**: kenya and data L27 sit under `## @unit #in-scope`; L38 and L39 sit under `## @unit #ios-theming-spec-094` and `#android-theming-spec-094`. Both `#in-scope` rows are **unsigned** today (no `signature` on the row; verified). **Risk, named**: the class-B correction could make the C18 floor route `#in-scope`, which would owe a *new* signature outside the expected set. The post-edit freshness sweep decides that, and it is reported at 31.4 as the C4 red limb if it happens.

## Addendum (2026-10-12) — Kenya's and Data's reads, reconciled

Records: `completion/task-31-reads/{kenya,data}.md`, each byte-equal to the copy the orchestrator relayed. Both were read at `dcd337dcf`, the same base as this sweep.

**The sweep counts agree.** Kenya: overlay 5, plus one rendered-only line in each of three files, matching his classes A–F. Data: overlay 4, plus one rendered-only line in each of three files. Total 42, the same as § 1.

**The dispositions agree, with one difference, now reconciled**:
- A, B, C, E: **correct here**. Both seats supplied the texts:
  - Kenya: L27 (B), L147 (E), L160 (A), and `#ios-theming` bullet 1 (C);
  - Data: R-27 (B), R-159 (A), and R-38 (C).
- D: **kept**. Both say it is true only as the intended shape, framed by the new bullet 1.
- **F, `#product-tokens-spec-108109`: the two seats differed in label, not in fact.** Kenya: "carry to Spec 129". Data: "kept as true; the dependency carried".
  - It is **two separate retained canonical units**, one per seat (`canonical/agents/kenya.md` L288, Swift; `canonical/agents/data.md` L291, Kotlin), not one shared line.
  - Both lines describe what each emitter actually produces: `SwiftEmitter.ts:11,49-56` (Kenya, read) and `KotlinEmitter.ts:11,33,49-52` (Data, read).
  - Both omit that the type they extend or read is undefined.
  - **Reconciled disposition for both: "kept as true (describes the emitted form); the undefined-type dependency carried by name to Spec 129."** No text change. Both rows are unsigned and retained, so no act follows.
  - This supersedes § 1's "carried" label for class F. The final count is **correct here 28 · kept 14 · carried 0 lines (one dependency carried by name, for both seats)**.

**Fork picks (Thurgood, profile author; recorded with the surviving counter-argument):**

1. **Kenya's bullets 2–3 of `#ios-theming-spec-094`: (A) verbatim, framed by the new bullet 1.** This is Kenya's lean, the smallest signed movement (only `theming-1` gains a `removals` cite), and Task 31's "L39 kept as the intended shape". Data's R-38 frames his bullets 2–3 the same way, so both platforms read alike.
   - *Surviving counter-argument (Kenya)*: an agent that quotes bullet 2 alone loses the frame and can write `.environment(\.{abbreviation}Theme, …)` against a key nothing defines. Option (B), "Once that surface exists, …" on each bullet, would close that at the cost of two more removals and re-signs per platform. It is Peter's to overturn.
2. **Data's Option B (add "Native Android onboarding is not supported on this release"): not added (Option A).**
   - The batch is "exactly these five things" plus sweep hits. The sentence is neither, and adding it on Android alone would make the two seats asymmetric.
   - R-38 already tells the agent there are no theme types and that the type it would read is undefined.
   - *Surviving counter-argument (Data)*: an agent asked to build a native Android app on this release is not told onboarding is unsupported. Kenya names the same omission on iOS, along with the OKLCH initializer and the undefined token enums.
   - **Carried, not dropped**: all four omissions go to Leonardo and Peter as a consumer-profile scope question, in one record outside this unit. The orchestrator files it; `.kiro/issues/` is outside my write scope.

**Baselines added at Data's request** (the rows next to the Kiro `## Ground truth` heading, where the blank-line edit is at risk), computed as in § 3, before any edit:
- In both Kiro prompts, the line directly above `## Ground truth` is the last line of the `#what-you-dont-own` render span: kenya L253–258, data L270–275. That is the row Data named.

```
kenya | body #what-you-dont-own | signer=kenya | renderedHashOf=sha256:463fe6517b19695411d61187d6aad4f2f97db3f15d20b031f0b057943fbb7368 | EQUAL
kenya | frontmatter ambient.groundTruthManifest.trims[dist/ComponentTokens.ios.swift] | signer=kenya | renderedHashOf=sha256:78187ecb97b302742c39bea6639b579d69ce2335043f2412a19b37d3b9c8be5b | EQUAL
data | body #what-you-dont-own | signer=data | renderedHashOf=sha256:19c95e554712d6fc50b6948d4d805ede3b63c44c3bce92a7abc9a679f9f0887e | EQUAL
```

(Data's `trims[dist/ComponentTokens.android.kt]` was already in § 3, EQUAL.) **31.1's check**: after the blank-line edit, these rows and the two trims rows are unchanged. Only the two `verdict` rows move, because of the intro reword.

**For the 31.2 authoring commit, settled now**:
- Kenya: replace `#ios-theming` bullet 1 with his text; `theming-1` gets a `removals` cite (authored by me); bullets 2–5 verbatim.
- Data: R-38 replaces bullet 1; `theming-1` gets a `removals` cite (authored by me); bullets 2–5 verbatim.
- B, A and E per the seats' texts.
- Divergent 5 stays (Data).
- Divergent 8 (J-BA84): I author the cite at 31.3, and Data reads it before commit, with the subtraction definitions in front of him. Kenya does the same for divergents 6 and 9.
- **Ada's fact-check is still owed** (row 2.2) before 31.2. Data's analysis of the L159 cue ("and `designerpunk.config.ts`" does not overclaim, since `tokenSource`, `output`, `productTokens` and `name`/`abbreviation` all drive output) answers one of my two questions to her. Her own read stands.
