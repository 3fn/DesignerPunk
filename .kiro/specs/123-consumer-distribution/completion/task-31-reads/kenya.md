# Kenya — U3c (Task 31) consult: 31.0 sweep, dispositions, replacement texts

Read-only. Read against `origin/main` at `dcd337dcf` (`git show` / `git grep origin/main -- …`; no branch switch, nothing written to the repo). Task 31 read in full (tasks.md "UNIT 3c", L1248-1310 at that SHA). Nothing here was built or run; the product-token facts are a source read.

## Q1. The 31.0 sweep over Kenya's seat

Pattern: `theme (Swift|Kotlin)|[Gg]enerated (Swift|Kotlin) output|materiali[sz]e|\{Name\}Theme|\{Abbreviation\}Theme|\{abbreviation\}Theme|ThemeKey|theme types`

### Overlay `canonical/profiles/consumer/kenya.overlay.md` (5 hits; matches the seed run)
```
L27:  - Consuming DesignerPunk iOS tokens — static tokens via `DesignTokens`, theme-varying colors via `@Environment(\.{abbreviation}Theme)`
L38:  - Generated Swift output includes: `{Name}Theme` protocol, concrete structs per theme, `{Abbreviation}ThemeKey: EnvironmentKey`
L39:  - Product apps wrap content with `.environment(\.{abbreviation}Theme, themeInstance)` for subtree theming
L147: gap: "product-screen build/test/run commands are per-product — read them from this iOS app's own build setup (theming Swift materializes here via `npx designerpunk generate`)."
L160: cue: regenerate your platform token output — including your theme Swift and product tokens — from your token source and `designerpunk.config.ts`
```

### Rendered consumer texts of the seat (sidecars `*.attribution.json` excluded)
```
_canonical/agents/kenya.md : L100 (=L160 cue)  L108 (=L147 gap)  L169 (=L27)  L179 (=L38)  L180 (=L39)  L189  Theme-varying tokens: protocol extension on `{Name}Theme` — access via `theme.product{Category}{Name}`
cc/.claude/agents/kenya.md : L56 (=L27)  L66 (=L38)  L67 (=L39)  L76 (=L189 line)  L376 (=L160 cue, rendered "- regenerate your platform token output — including your theme Swift and product tokens — … : `npx designerpunk generate`")  L378 (=L147 gap)
kiro/.kiro/agents/kenya-prompt.md : L27  L37  L38  L47 (the {Name}Theme line)  L292 (cue)  L294 (gap)
kiro/.kiro/agents/kenya.json : 0 hits (the JSON carries no prompt text)
```
That is 7 / 6 / 6 hits, i.e. the overlay's 5 plus ONE hit the overlay run cannot see: the `{Name}Theme` product-token line (L189 / L76 / L47). It comes from `canonical/agents/kenya.md` L288 (unit `#product-tokens-spec-108109`, disposition `retained`, no overlay unit, unsigned), so an overlay-only sweep misses it. This is why the sweep's rendered-text half matters.

### Dispositions (every hit)
| Hit | Disposition | Reason / replacement |
|---|---|---|
| overlay L27 (+ rendered mirrors) | **Correct here** | Replace the line with: `- Consuming DesignerPunk iOS tokens — static tokens via `DesignTokens`, theme-varying colors via `@Environment(\.{abbreviation}Theme)` once your generated output includes it` . `#in-scope` carries no signature (dispositions L8), so no act. Names the environment key as the intended shape, so the re-run hit is "kept". |
| overlay L38 (+ mirrors) | **Correct here** | This is `theming-1`. Replaced by the new first bullet of `#ios-theming-spec-094` (Q2). |
| overlay L39 (+ mirrors) | **Kept as true** | Kept as the intended pattern (`theming-2`), verbatim, as Task 31 says. Honest only because the new first bullet frames it (Q2); see the fork there. |
| overlay L147 (+ mirrors) | **Correct here** | Drop the parenthetical: `gap: "product-screen build/test/run commands are per-product — read them from this iOS app's own build setup."` Row `commands[product-screen-commands]` is unsigned (dispositions L78): authoring only. |
| overlay L160 (+ mirrors) | **Correct here** | Cue becomes: `cue: regenerate your platform token output and product tokens from your token source and `designerpunk.config.ts``. Moves my signed row `commands[platform-tokens]` (re-sign). Removed, not reworded. |
| `{Name}Theme` product-token line (`_canonical` L189, cc L76, kiro L47) | **Carried by name to Spec 129** (deliverable (i)) | Q3 below. |

### Hits outside the declared sweep path, for the record (Found later, not this batch)
`canonical/agents/kenya.md` (the SYSTEM seat's canonical source, not consumer text): L38 comment, L178 cue ("theming Swift materializes …" consumer-side), L202 gap, L268-288 (the same units). They are false for the same reason in a consumer repo but are the in-repo seat's text and not rendered to consumers except through the retained/overlaid units above. Flagging so they are not forgotten; I propose no edit.

## Q2. `#ios-theming-spec-094` replacement (PR-14 form: what `generate` produces today, "plans to address", Spec 129 by name, no date)

Rendered unit today (overlay L36-44): heading `### iOS Theming (Spec 094)`, bullets theming-1..5.

**Replace bullet 1 (theming-1) with:**
```
- `npx designerpunk generate` writes your static tokens as Swift constants on `DesignTokens` and writes no theme surface today: no theme protocol, no per-theme structs and no environment key, and the theme-varying colours are left out. DesignerPunk plans to address this (Spec 129, consumer-generation completeness), with no date set. The next two bullets are the intended pattern for when that surface exists, not something your repo has yet.
```
Bullets 2 and 3 stay verbatim; bullets 4 and 5 stay verbatim (so `theming-4`, `theming-5` do not move).

**Which of `theming-1`..`theming-3` no longer hold as written:** `theming-1` only: it is replaced, not kept, so `ced2085a…` `removals` needs an entry for it (Thurgood authors the cite; the sentence being removed is "Generated Swift output includes: `{Name}Theme` protocol, concrete structs per theme, `{Abbreviation}ThemeKey: EnvironmentKey`"). `theming-2` and `theming-3` hold as written, but only as an intended pattern; their text does not change. My re-sign records `surviving: [theming-2, theming-3, theming-4, theming-5]` plus the new first bullet as a newly derived item (item id and derivation are Thurgood's mechanics; UNVERIFIED which id the operative-set tool will assign).

Facts the text rests on (verified): `generateThemeOverrideBlocks` (TokenFileGenerator.ts:1028) has no production caller, so no theme surface is generated; the consumer's `DesignTokens.ios.swift` omits theme-varying colours (release-15.0.0.md:72, :127; and the guide's iOS sub-section, confirmed in 19.4).

**Fork (surfaced, not picked): bullets 2 and 3 verbatim, or conditional?**
- (A) keep them verbatim, framed by the new bullet 1 (what is written above). Smallest signed movement; matches Task 31's "L39 kept as the intended shape".
- (B) also prefix bullet 2 with "Once that surface exists, " and bullet 3 likewise. Each bullet is then true read alone, but `theming-2` and `theming-3` move too (two more `removals`, more to re-sign).
- I lean (A). Surviving counter-argument: an agent that reads bullet 2 alone can still write `.environment(\.{abbreviation}Theme, …)` against a key nothing defines, and it will not compile. The framing sits in the bullet directly above, but a model that quotes a bullet drops that context. If Peter wants zero chance of that, it is (B), and I will sign either.

**Erratum I will record in my re-sign:** my 2026-09-29 sheet entry for this unit (signatures/kenya.md L21-30) says `theming-1` is "*more* true than in-repo, because the theme surface materializes consumer-side via `npx designerpunk generate`". That was wrong; nothing emits it (FK-6 / my R2 § D). The re-sign supersedes it; it is not a new claim.

## Q3. `#product-tokens-spec-108109` ("Theme-varying tokens: protocol extension on `{Name}Theme`")

**Disposition: carry by name to Spec 129 (deliverable (i)); do not add to this batch.** (Unchanged from my R2 recommendation; the item "to check at 31.0, UNVERIFIED" is now checked.)
- Verified by source read: `SwiftEmitter.ts:11` (`themeName = ${configName}Theme`), `:49-56` (emits `public extension ${themeName} { var product…: Color { self.… } }` and the comment "access via @Environment(\.…Theme)") and `SwiftEmitter.test.ts:87`. The bullet describes what the emitter emits, and is accurate as that. The gap is that nothing defines `<Name>Theme`, so the extension has nothing to extend. I did not run `generate` against a product-token fixture.
- Why carry: the unit is `retained` (no overlay unit); correcting it turns a retained unit into an overlay-authored one (a disposition change) in a batch Peter scoped to the two theming units (PR-12). It is unsigned, so no act would follow either way.
- Surviving counter-argument: until Spec 129 lands, consumer-Kenya text still reads as if theme-varying product tokens work. Mitigated, not removed, by the new `#ios-theming` first bullet and the guide's iOS sub-section. If you want it fixed now, the replacement for `product-tokens-3` is: `- Theme-varying tokens: emitted as a protocol extension on `{Name}Theme`, which applies only once a theme surface exists (Spec 129) — access via `theme.product{Category}{Name}``. Your call and Peter's; I'd only read it.
- Related, not a hit: `product-tokens-1` says output goes to `dist/product/ProductTokens.ios.swift`. True by default (ConfigLoader.ts:44 `output: 'dist'`), and the guide says the same; false if the consumer sets another `output`. Not for this batch.

## Q4. Expected signed set, reads, and the signing act
- **Confirmed:** `ambient.groundTruthManifest.verdict`, `commands[platform-tokens]`, `#ios-theming-spec-094`. Current dispositions rows: verdict L45 (retained; signed with `surviving: []`), platform-tokens L73, ios-theming L9. `commands[product-screen-commands]` (L78) and `#in-scope` (L8) and `#product-tokens-spec-108109` (L10, retained) are unsigned: authoring only, no act. Any other Kenya row on the post-edit stale list is the red limb, not part of my round. UNVERIFIED by me: that the stale list names exactly these three (it is taken after the authoring commit; I have not run `freshness`).
- **I will read before commit:** the intro-line text (verdict row), the L147 and L160 texts, the `#ios-theming` first bullet and its `removals` cite, and each cite change for divergents 6 and 9 (`subtraction-3` cites on `trims[dist/ComponentTokens.ios.swift]`). Per my R2 § C, I need the `renderedHashOf` baselines for my rows pasted before the Kiro blank-line edit, and the blank line in the container span; I will check the span placement, not recompute hashes.
- **Re-sign:** in my own seat commit, after Thurgood's authoring commit, merge-only (§ 4.6): never amended, rebased or cherry-picked; a failing commit gets a new commit; authoring never shares my signing commit; one batched round before the lock refresh. UNVERIFIED: the ballot text itself (I did not open `2026-10-01-signing-act-chain.md`; I rely on your quote of § 4.6 and on Task 31).

## Overlay vs Task 19's iOS sub-section (what it now contradicts)
- **Contradicts, in the batch:** L27 and L38 (theme surface presented as present or generated), L147 and L160 (materializes / including your theme Swift). All four are dispositioned above.
- **Does not contradict:** L42/L90/L123 "never read the un-themed base snapshots … for your themed values": true regardless (those files are un-themed); "your themed values" is the divergent-5-style qualifier and stays. L28/L65-66 "referencing / reference … implementations": consistent with "reference source".
- **Omissions, not contradictions (carry, not this batch):** (1) the overlay never says native onboarding is not supported / components are reference source (Task 19 L160); a consumer-Kenya working on a native app is told nothing of it. (2) The generated `DesignTokens.ios.swift` calls an OKLCH `Color.oklch(...)` initializer that no shipped file defines (my 19.4 C2); the overlay is silent. (3) The component-token tier file (`ComponentTokens.ios.swift`) refers to enums nothing defines (19.4 C1). All three belong with Leonardo/Peter as a profile-scope question, or Spec 129; none are sweep hits (they would be `## Found later`).

## What I could not verify
Anything compiled or run for product tokens; the stale list; the ballot text; the operative-set tool's item ids for the new bullet; that no OTHER consumer-rendered file (outside `kenya*`) repeats these claims (the sweep is scoped to my seat).
