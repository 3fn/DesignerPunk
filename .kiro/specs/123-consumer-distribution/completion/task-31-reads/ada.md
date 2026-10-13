# Task 31 (U3c) — Ada's fact-check of (iii) the cue, (iv) the theming replacements, and class F

This is read-only. I read every source file at `origin/main` `dcd337dcf` (`git show`/`git grep`), the same base as Kenya's and Data's reads and Thurgood's branch cut. Thurgood's sweep came from `origin/task/123-u3c-profile-corrections` @ `84c26e3f5`.

**Nothing was run.** Line numbers for `dist/*` are this repo's local build, used only for shape (`public struct DesignTokens`, `object DesignTokens`). **V** means I read it in source at `dcd337dcf`.

---

## 1. (iii) The cue — TRUE; "and `designerpunk.config.ts`" does not overclaim

The cue: `regenerate your platform token output and product tokens from your token source and `designerpunk.config.ts``

`generate` reads the config, and these keys change its output (V):

| Config key | Where `generate` uses it |
|---|---|
| `tokenSource` | `src/cli/resolveTokens.ts:37`, `src/cli/loadComponentTokens.ts:71`, `src/cli/designerpunk.ts:277` |
| `output` | `src/generators/generateTokenFiles.ts:54`; `src/cli/generateProductTokens.ts:27` |
| `componentTokens` | `src/cli/loadComponentTokens.ts:84` |
| `productTokens` | `src/cli/designerpunk.ts:287`; `src/cli/generateProductTokens.ts:19,30` |
| `name` / `abbreviation` | product-token Swift and Kotlin, `src/cli/generateProductTokens.ts:33-34,49-50` |

**Only `themes` is inert.** It is read solely to print the banner (`src/cli/designerpunk.ts:241-242`). Generation uses the statically imported built-in maps (`src/generators/generateTokenFiles.ts:19-21,136-171`).

The cue tells the reader when to regenerate. It does not say every key shapes output, and it never names `themes`. So it stays as written. I agree with Data.

**Residual (not a reason to change the cue; for the record).** A plain `generate` decides whether to regenerate product tokens from the product YAML's file times only (`src/cli/staleness.ts:36-60`, `findYamlFiles(config.productTokens)`). So a token-source change alone does not regenerate product tokens. That rarely matters, because product Swift and Kotlin refer to system tokens by name, not by value. It does matter for a rename, where `--force` is needed. Thurgood verified the masking by run in Task 21.

This is a code finding for me to file, not a profile edit.

**Also mine (code comment, not a profile surface):** `src/generators/generateTokenFiles.ts:17-18` says the overrides "resolve from the config's themes array". That is false. It joins my #300 follow-ups.

---

## 2. (iv) The theming replacements

### Kenya, `#ios-theming-spec-094` bullet 1 — TRUE

| Claim | Source | Verdict |
|---|---|---|
| `generate` writes static tokens as Swift constants on `DesignTokens` | generated container `public struct DesignTokens` (local `dist/DesignTokens.ios.swift:10`; same generator for any consumer) | TRUE |
| "no theme protocol, no per-theme structs and no environment key" | `public protocol ${name}Theme` (`TokenFileGenerator.ts:1169`), the per-theme structs (`:1200-1210`) and `${abbreviation}ThemeKey: EnvironmentKey` (`:1243`) are written only inside `generateSwiftThemeTypes` (`:1130`). That function is reached only from `generateThemeOverrideBlocks` (`:1044`), which has no caller outside its definition in `src`, `scripts` or `tools` (`git grep` at `dcd337dcf`; tests excluded) | TRUE |
| "the theme-varying colours are left out" | The non-web generators receive the registry-wide theme-varying set (`TokenFileGenerator.ts:1712`; built at `generateTokenFiles.ts:182-191`, passed at `:233`) and skip those names (`TokenFileGenerator.ts:843-846`) | TRUE |
| "plans to address this (Spec 129, consumer-generation completeness), with no date set" | Spec 129's charter carries theme emission as scope item (i) (`.kiro/specs/129-consumer-generation-completeness/design-outline.md:15`) | TRUE (see note) |
| The next two bullets are the intended pattern, not present | follows from row 2 | TRUE |

**Nuance, not FALSE.** "Left out" holds for the base names. The WCAG-overridden ones are still emitted as `<name>_wcag` constants (`TokenFileGenerator.ts:989-1000`), and those lines are CSS `oklch(…)` syntax, not Swift (my #300 native record, item 2). The bullet makes no compile claim, so no edit is needed.

**Note on "Spec 129".** The 129 outline leaves open whether native theme emission belongs to 129 or to Spec 128's stated prerequisite (`design-outline.md:44`, question 2). PR-14 is the ruled form ("Spec 129 by name"), and the charter does carry item (i), so the sentence is true today. If question 2 moves native emission to 128, this sentence becomes stale. Carry that dependency.

### Data, `#android-theming-spec-094` R-38 — TRUE

| Claim | Source | Verdict |
|---|---|---|
| no `{Name}Theme` data class | `` data class ${name}Theme( `` written only in `generateKotlinThemeTypes` (`TokenFileGenerator.ts:1285`; the `data class` push is about `:1321`) | TRUE |
| no `{Name}Themes` object | `` object ${name}Themes { `` in the same function (about `:1331`) | TRUE |
| no `Local{Abbreviation}Theme` CompositionLocal | `` val Local${abbreviation}Theme = compositionLocalOf { … } `` (`:1389`), same function. It is reached only through `generateThemeOverrideBlocks` (`:1047`), which has no production caller | TRUE |
| theme-varying semantic colours left out of `DesignTokens` | `object DesignTokens` (local `dist/DesignTokens.android.kt:10`); same exclusion path as iOS (`:1712`, `:843-846`) | TRUE (same `_wcag` nuance; Data's own C-6 covers the invalid-syntax half) |
| plans to address (Spec 129), no date; the next two bullets are the intended shape | as for Kenya | TRUE (same note) |

### Do the remaining bullets overclaim against the Task 19 label causes?

- **Kenya bullets 2–3 and Data bullets 2–3** (environment or CompositionLocal provider; dark-mode selection). These are not emission claims, and they are framed by the new bullet 1, so they are not FALSE.
  - **Residual cause they still do not reflect.** The shipped components read the fixed names `\.dpTheme` and `LocalDPTheme`, not `{abbreviation}` (`2026-09-26-native-component-theme-hardcoding.md`). Nine iOS files also omit the key-path backslash (`2026-10-03-ios-theme-environment-key-missing-backslash.md`).
  - So the intended pattern will not reach the shipped components unless the consumer's abbreviation is `DP`, or until those issues are fixed.
  - This is not this batch's text; it is carried by name to Spec 129 with those two issues. Kenya's fork A versus B is unaffected.
- **Kenya bullet 4 and Data bullet 5** ("Static tokens … remain on `DesignTokens`"). TRUE as to where they live. Neither claims the file compiles. Task 19's causes are that the generated `DesignTokens.ios.swift` imports only UIKit, calls an undefined `Color.oklch`, and that `ContainerCardBase.ios.swift` does not parse. Those are compile causes the bullet does not contradict. Not an overclaim.
- **Data bullet 4** ("`{Abbreviation}` uses uppercase (e.g., `DP` not `Dp`) to avoid collision with Compose `.dp` unit"). This is not a Task 19 cause, but it is not something the generator enforces:
  - the theme-type generator writes `Local${abbreviation}Theme` verbatim (`TokenFileGenerator.ts:1389`);
  - the product emitter writes `Local${config.configAbbreviation}Theme` verbatim (`src/build/product/emitters/KotlinEmitter.ts:11`).

  So the bullet is true only if the consumer configures it in uppercase. I have not verified the collision rationale. Not this batch; I would carry it as "Found later" with this replacement for a future pass: `- Set `abbreviation` in uppercase (e.g., `DP`, not `Dp`): the generator uses it verbatim in `Local{Abbreviation}Theme``.
- **Kenya bullet 5 and Data bullet 6** (ground truth is live). TRUE; untouched.

---

## 3. Class F (`#product-tokens-spec-108109`)

**Correction to the premise.** These are **two lines, one per seat**, not one base line rendered into both:

| Seat | Source | Text |
|---|---|---|
| Kenya | `canonical/agents/kenya.md:288` | "Theme-varying tokens: protocol extension on `{Name}Theme` — access via `theme.product{Category}{Name}`" |
| Data | `canonical/agents/data.md:291` | "Theme-varying tokens: `@Composable @ReadOnlyComposable get()` accessing `Local{Abbreviation}Theme.current.{prop}` — must be read inside composition scope" |

Each is `retained` in its own seat's dispositions.

**Single disposition for both: KEPT as true; the undefined type is CARRIED by name to Spec 129, item (i). No edit in this batch.** Neither line is false as written. Each describes exactly what its emitter writes:

| Seat | Emitter output (V) |
|---|---|
| Swift | `src/build/product/emitters/SwiftEmitter.ts:11` (`themeName = ${configName}Theme`); `:49-56` emits `public extension ${themeName} { var product${Category}${Name}: Color { self.<prop> } }` |
| Kotlin | `src/build/product/emitters/KotlinEmitter.ts:11` (`Local${configAbbreviation}Theme`); `:33` imports it; `:49-52` emits `val <name>: Color` with `@Composable @ReadOnlyComposable get() = Local…Theme.current.<prop>` |

What is missing in both is the type the output depends on. That is Spec 129 item (i): `generateSwiftThemeTypes` and `generateKotlinThemeTypes` have no production caller (section 2 above).

On wording: "protocol extension" names the intended `{Name}Theme` protocol (`TokenFileGenerator.ts:1169`). That is accurate as intent, and the same "intended pattern" framing applies. Kenya's "carry" and Data's "kept + carry" are the same disposition in substance. Record both as "kept as true; dependency carried".

**Carry text for both seats**: "product-token output for theme-varying refs extends or reads a theme type (`{Name}Theme` / `Local{Abbreviation}Theme`) that `generate` does not emit".

**If Peter wants an edit now** (not my recommendation, since it moves two retained rows outside the batch), the minimal true qualifier is one clause appended to each line: `— applies once your generated output includes the theme type (Spec 129)`.

**Related, already carried in #300 (the native record, item 3b).** A product token whose `ref:` names a WCAG-only override token is marked `themeVarying: false` in the index, but native output strips it. It therefore emits a nonexistent `DesignTokens.colorActionPrimary` / `color_action_primary`. That bears on the sibling bullet "Ref tokens reference `DesignTokens.*` constants" in both seats. Not this batch.

---

## Unverified

- Anything compiled or run: the Swift and Kotlin shapes are source reads.
- That a consumer's `generate` writes `public struct DesignTokens` / `object DesignTokens`, by run. I inferred it from the shared generator and this repo's local build.
- The Compose `.dp` collision rationale in Data's bullet 4.
- Exact line numbers inside `generateKotlinThemeTypes` for the `data class` and `object` pushes. I give approximate lines from a `sed` window; the function start (`:1285`) and the `Local…Theme` line (`:1389`) are exact.
