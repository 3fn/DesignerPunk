# Data — U3c (Task 31) answers, read-only, at origin/main `dcd337dcf`

Method: every file read with `git show dcd337dcf:<path>` / `git grep … dcd337dcf -- <paths>`; no branch switch, nothing written to the repo. Line numbers below are for Thurgood's authoring only.
NOT run: the freshness stale list, `renderedHashOf`, any test, `generate`.

## Q1. The 31.0 sweep over my seat

Command (exact, from Task 31): `git grep -n -E 'theme (Swift|Kotlin)|[Gg]enerated (Swift|Kotlin) output|materiali[sz]e|\{Name\}Theme|\{Abbreviation\}Theme|\{abbreviation\}Theme|ThemeKey|theme types' dcd337dcf -- <paths>`

### Output (pasted)
```
canonical/profiles/consumer/data.overlay.md:27:- Consuming DesignerPunk Android tokens — static tokens via `DesignTokens`, theme-varying colors via `Local{Abbreviation}Theme.current`
canonical/profiles/consumer/data.overlay.md:38:- Generated Kotlin output includes: `{Name}Theme` data class, named instances in `{Name}Themes` object, `Local{Abbreviation}Theme` CompositionLocal
canonical/profiles/consumer/data.overlay.md:39:- Product apps wrap content with `CompositionLocalProvider(Local{Abbreviation}Theme provides themeInstance)` for subtree theming
canonical/profiles/consumer/data.overlay.md:159:cue: regenerate your platform token output — including your theme Kotlin and product tokens — from your token source and `designerpunk.config.ts`

canonical/_consumer-output/_canonical/agents/data.md:107:    cue: regenerate your platform token output — including your theme Kotlin and product tokens — from your token source and `designerpunk.config.ts`
canonical/_consumer-output/_canonical/agents/data.md:181:- Consuming DesignerPunk Android tokens — static tokens via `Local{Abbreviation}Theme.current` [as L27]
canonical/_consumer-output/_canonical/agents/data.md:191:- Generated Kotlin output includes: … [as L38]
canonical/_consumer-output/_canonical/agents/data.md:192:- Product apps wrap content … [as L39]
canonical/_consumer-output/_canonical/agents/data.md:202:- Theme-varying tokens: `@Composable @ReadOnlyComposable get()` accessing `Local{Abbreviation}Theme.current.{prop}` — must be read inside composition scope

canonical/_consumer-output/cc/.claude/agents/data.md:57, :67, :68, :78 (same four texts as above), :515 (the cue as a Commands bullet)
canonical/_consumer-output/kiro/.kiro/agents/data-prompt.md:27, :37, :38, :48 (same four), :308 (the cue as a Commands bullet)
canonical/_consumer-output/kiro/.kiro/agents/data.json: no hits
```
(_canonical L181 is abbreviated above only for paste length; its text is identical to overlay L27.) Each rendered file therefore has 5 hits: the overlay's four plus the L202/L78/L48 line, which is NOT in the overlay.

### Dispositions (every hit)

| Hit | Where | Disposition | Reason / replacement |
|---|---|---|---|
| L27 `#in-scope` bullet | overlay; rendered _canonical 181, cc 57, kiro 27 | **CORRECT HERE** | Reads as if the theme surface exists today. Row `#in-scope` is unsigned (`data.dispositions.yaml` L8), so authoring only. Replacement below (R-27). |
| L38 `#android-theming-spec-094` bullet 1 (`theming-1`) | overlay; rendered _canonical 191, cc 67, kiro 37 | **CORRECT HERE (PR-14), REPLACED** | "Generated Kotlin output includes" is false today: `generateKotlinThemeTypes` (`TokenFileGenerator.ts:1285`) is reached only through `generateThemeOverrideBlocks` (`:1028`), which `git grep` at `dcd337dcf` shows with no caller in `src` outside its definition (tests excluded). Replacement below (R-38). |
| L39 `#android-theming-spec-094` bullet 2 (`theming-2`) | overlay; rendered 192 / 68 / 38 | **KEPT as true, under condition** | It states a consumption pattern, not a claim that `generate` emits anything. It is true only as "the intended shape"; that condition is carried by R-38's last sentence, not by editing this bullet. Without R-38 the bullet would tell an agent to write code against a symbol that does not exist (`LocalDPTheme`/`Local<ABBR>Theme` is defined nowhere in the package). See the fork in Q2. |
| L159 `commands[platform-tokens]` cue | overlay; rendered _canonical 107, cc 515, kiro 308 | **CORRECT HERE (iii): removal** | Cue text below (R-159). |
| Rendered-only line: `#product-tokens-spec-108109`, "Theme-varying tokens: `@Composable @ReadOnlyComposable get()` accessing `Local{Abbreviation}Theme.current.{prop}`" | _canonical 202, cc 78, kiro 48; source is `canonical/agents/data.md:291` (the consumer row is `retained`, unsigned, `data.dispositions.yaml` L10) | **KEPT as true; the dependency it hides is CARRIED BY NAME to Spec 129** | Unlike Kenya's twin, this one is VERIFIED: the Kotlin product-token emitter does produce exactly this shape without any theme type (`src/build/product/emitters/KotlinEmitter.ts:11` `Local${abbr}Theme`, `:33` imports `com.designerpunk.tokens.Local…Theme`, `:49–52` the `@Composable @ReadOnlyComposable get() = Local…Theme.current.<prop>`; `generateProductTokens.ts:58` writes it). So the sentence describes real output. What it does not say is that the symbol it reads is undefined (my C-4 in the Task 19 review). Editing it would turn a `retained` canonical row into a divergence outside the expected signed set; I would not. Carry: "product tokens that reference theme-varying tokens read `Local<ABBR>Theme`, which nothing defines", by name to Spec 129. The R-38 sentence "no `Local{Abbreviation}Theme` CompositionLocal" already tells the agent the symbol is absent. |

### Further hit-shaped claims the pattern MISSES in my seat (for `## Found later`, none needs an edit now)
- `theming-3` L40 "Dark mode: select theme instance based on `isSystemInDarkTheme()`" — a pattern, not an emission claim; kept with theming-2 under the R-38 condition.
- Overlay L43 / rendered cc L72 (`theming-6`), L91/L200, L122/L264: "a theme-varying token is a per-theme set" — a statement about the application MCP, TRUE (MCP `get_token_details` returns `themeResolutions`); kept. Note, not a defect: the same bullet and L66/L110/L169 call `dist/*.android.kt` "un-themed". It is un-themed in the sense of no theme types, but it does carry nine `_wcag*` constants (L683–691 of the local build). Same nuance as the Integration Guide's "un-themed base snapshot"; the guide and the overlay agree, so I would leave it.
- The `{Name}Theme` / `{Abbreviation}Theme` pattern also matches inside R-38's own new text (it names what is absent). That is by design; those post-batch hits are "kept" (they describe an absence).

### The L159 cue — confirmed, and "and `designerpunk.config.ts`" does NOT overclaim
Confirm: `regenerate your platform token output and product tokens from your token source and `designerpunk.config.ts``. Good as written (R-159 below is that text).

Overclaim test: the true statement is that `generate` never applies `config.themes` (`generateTokenFiles.ts:19–21` imports the three override maps statically; `:150–171` builds `contextOverrides` from them; no `config.themes` read in that file). But the cue says to regenerate when *the token source* or *the config* changes, not that every config key drives output. The config DOES drive: `tokenSource`/`tokenSourceRoot` (`designerpunk.ts:230,237`, `resolveTokens.ts:37`), `outputDir`, `productTokens` (`generateProductTokens.ts:19,27,30`), component-token directories (`loadComponentTokens.ts:71`), and `name`/`abbreviation` into the product-token Kotlin (`generateProductTokens.ts:33–34,49–50`, `KotlinEmitter.ts:11`). A person who edits `tokenSource`, `productTokens` or `output` and does not regenerate is wrong; so the cue holds. Only `themes` is inert, and the cue never names it. Keep it. (Not verified: the header comment at `generateTokenFiles.ts:19–21` says overrides "resolve from the config's themes array", which is misleading; that is Ada's/Lina's comment, not a profile surface.)

## Q2. `#android-theming-spec-094` replacement (PR-14 form)

Form: what `generate` produces today (no theme types) · "plans to address" · Spec 129 by name · no date. Mirrors the form already ruled for both platforms ("plans to address", PR-14).

**R-38 (replaces bullet 1 / `theming-1`):**

`- Your `npx designerpunk generate` produces no theme types for Android today: no `{Name}Theme` data class, no `{Name}Themes` object and no `Local{Abbreviation}Theme` CompositionLocal, and the theme-varying semantic colors are left out of `DesignTokens`. DesignerPunk plans to address this in its consumer-generation completeness work (Spec 129), with no date set. The next two bullets, on providing and selecting a theme, are the intended shape once it does.`

Checks: no "generates/includes/emits" claim; no date; no count (the "14" is #268's measurement and would go stale in an agent prompt; the Integration Guide carries it); does not claim the shipped Kotlin compiles or is usable (my C-6: the `_wcag` lines are CSS `oklch(…)` syntax, not Kotlin; nothing in this text implies otherwise); "left out of `DesignTokens`" matches Integration Guide L177 as corrected (C-2). The sweep pattern still hits this bullet (`{Name}Theme`, `{Abbreviation}Theme`); the hits describe an absence, so they re-run as "kept".

**FORK, surfaced not picked (Thurgood/Peter's call):** Task 19's Android label says native onboarding is not supported. R-38 does not say it, because PR-14 asks for three things and Task 31 is "exactly these five". Option A: leave it out (minimal; the agent still learns the surface is missing). Option B: add one sentence, "Native Android onboarding is not supported on this release (the shipped Compose components read a theme that nothing in the package defines)." (an agent that otherwise builds a native app on this release is the failure this prevents; it widens the batch and adds a claim the profile will have to keep current). I have no preference strong enough to override the batch boundary.

**Is `theming-1` the only item that moves?** Yes for my unit. `theming-2` and `theming-3` stay verbatim (kept, under R-38's condition); `theming-4` (`{Abbreviation}` uppercase) and `theming-5` (static tokens remain on `DesignTokens`) stay verbatim and are true today; `theming-6` (ground truth, divergent 5) is not touched. Confirmed: `theming-1` (`canonical/operative-sets/data.yaml` L83) is REPLACED, not kept: the row gains a `removals` entry for the old bullet text (cite is Thurgood's; the row's existing removal `the built `dist/*.kt` snapshots (see the Ground truth section)`, subtraction-1, stays). My re-sign records `assent.surviving = ["theming-2","theming-3","theming-4","theming-5","theming-6"]`.
UNVERIFIED (Thurgood's to decide): whether R-38, an overlay bullet that has no canonical counterpart, needs an item id of its own in the operative set; I have assumed it does not, since it is the replacement for a removed item and the assent set lists only canonical items.

**R-27 (the `#in-scope` bullet, correct here, unsigned row):**

`- Consuming DesignerPunk Android tokens — static tokens via `DesignTokens`, theme-varying colors via `Local{Abbreviation}Theme.current` once your generated output includes it`

(This is Kenya's suggested form, adapted. UNVERIFIED: because it changes words that canonical has and the row's current `removals` covers only the subtraction-5 clause, Thurgood must record the new difference the way the parity check expects; I did not read that checker.)

**R-159 (the cue, correct here):**

`cue: regenerate your platform token output and product tokens from your token source and `designerpunk.config.ts``

The theme returns to this cue when Spec 129's item (i) lands, not in this unit.

## Q3. Divergent 5 ("for your themed values")

**Stays**, on the current text (my R2 position). On the text in front of me (cc L72 / overlay L43): "never read DesignerPunk's un-themed base snapshots in the installed package (`node_modules/@3fn/core/dist/*.android.kt`) for your themed values; query the application MCP for …". The qualifier is what keeps the prohibition true: the shipped snapshot is a correct reference for DesignerPunk's own un-themed base; it is wrong as the source of *your* themed values, and today those values exist nowhere in your generated file (they are left out), so the MCP's per-theme set is the only place an agent can get them. R-38 makes that sharper, not weaker. Surviving counter-argument (the blind seat's): an unconditional "never read" would be simpler and the qualifier lets an agent argue the snapshot is fine for un-themed values. My answer: that is the true state (the same file is the reference the Integration Guide describes), and the blind seat's own 5/6 assent shows `theming-6` is still credited by five of six. The qualifier stands.

## Q4. The signed set, the baselines, the cite change

**Expected signed set for Data, confirmed:** `ambient.groundTruthManifest.verdict` (the intro reword moves it), `commands[platform-tokens]` (cue), `#android-theming-spec-094` (R-38). I add nothing else and expect nothing else on the post-edit stale list.

**Baselines to take pre-edit (31.0), and which are at risk from the Kiro blank-line edit:**
- `#what-you-dont-own` (signed, `data.dispositions.yaml` L40, renderedHash `19c95e55…`). **At risk, and the most likely to move by mistake**: its last span is "Your repo's own build and test tooling is the one to use … the Commands section names the DesignerPunk commands that apply here.", which sits directly above the Kiro `## Ground truth` heading with no blank line (kiro `data-prompt.md` L275–276). If the blank line lands in that unit's last span instead of the container span, this row goes stale. Please add it to the baseline list; it is not on the named set.
- `ambient.groundTruthManifest.trims[dist/ComponentTokens.android.kt]` (signed, renderedHash in the row): the first bullet under that heading; at risk if the blank line is attributed to its leading span. Not expected to move if the edit is in the container span.
- `routes.cues[9]` (signed, renderedHash `285e1817…`): a bullet in the middle of the Routing list, not adjacent to any adapter-level heading. Baseline it as asked; I expect no move.
- `ambient.groundTruthManifest.verdict`: moves by design, so it is not a baseline for "no change", only a before/after record.
I cannot compute `renderedHashOf` in a read-only pass; these are structural expectations from the rendered files, not measurements.

**Divergent 8 (J-BA84, my `trims[dist/ComponentTokens.android.kt]`, removal "a stale generated artifact, not the source of truth" cited subtraction-3): yes, I will read the cite change before it is committed.** I record my current reading for Thurgood, without ruling the cite: the removed text was replaced by consumer-true wording ("the un-themed base, never the source for your themed values"), so it is a re-grounding more than a subtraction; my other rows that remove "`dist/*.kt` snapshot" wording cite subtraction-1 (`data.dispositions.yaml` L9, L16, L27). I did not read what subtractions 1–5 are defined as, so I cannot say subtraction-1 is the right one; I will check the definition when I read the commit.

**Re-sign:** yes. After Thurgood's authoring commit I will re-sign my three rows in my own seat commit, entering by merge only, never amended or rebased (ballot `2026-10-01-signing-act-chain.md` § 4.6), and only for rows on the post-edit stale list. If divergent 5 or 8 is to close here rather than carry, RS-1's erratum must land first (Task 31: until then a re-sign is a new act, not a closed divergent).

## What in my overlay the Task 19 Android sub-section now contradicts
1. L27, L38 (and, conditionally, L39/L40): the contradiction this batch fixes. Nothing in the Integration Guide's Android sub-section says the theme surface is emitted; L27 and L38 do.
2. My C-6 (the `_wcag` lines in the shipped Kotlin are CSS `oklch(…)`, not valid Kotlin): the overlay does NOT imply that output compiles. No overlay line says the generated or shipped Kotlin builds. R-38 deliberately avoids it. The cue R-159 ("regenerate your platform token output") is a command to regenerate, not a build claim.
3. Product-token refs (`product-tokens-4`, "Ref tokens reference `DesignTokens.*` constants", retained, canonical): a ref to a token that native output strips (e.g. `color.action.primary`, absent from the Kotlin though the index says `themeVarying: false`) would emit a `DesignTokens.color_action_primary` that does not exist. REASONED from `KotlinEmitter.formatKotlinValue`, NOT run. Carry by name to Spec 129 with the Local-theme item; no edit here.
4. Overlay L28 ("referencing the Android implementations that ship in the installed package, `node_modules/@3fn/core/src/components/core/*/platforms/android/`") is consistent with the guide (reference source), but the overlay nowhere says native Android is unsupported. That is the Q2 fork (Option B), not a contradiction.

## Could not verify
- `renderedHashOf` values and the stale list (not run); whether the blank-line edit moves any of the three baselines above.
- The checker's treatment of replaced overlay text on an unsigned row (R-27) and of a replacement bullet with no canonical item (R-38).
- The subtraction-1…5 definitions (for divergent 8's cite).
- The Swift side of Kenya's twin and the iOS emitter (not read).
- That `generate` actually omits the theme-varying colours or emits no theme types, by running it: call-graph read only (same limit as the Task 19 review).
