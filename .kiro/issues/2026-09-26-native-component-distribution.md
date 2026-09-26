# Issue: native component distribution — SPM source package (iOS) + Gradle source module (Android)

**Date**: 2026-09-26
**Status**: CHARTERED — not scheduled. No build work is authorized by this charter; it is evaluated at the trigger below.
**Type**: CHARTER (Kenya/Data's shared follow-up from Spec 123 Task 3.5's KEEP-WITH-FOLLOW-UP verdicts)
**Owners**: **Kenya (iOS) and Data (Android) — design the distribution shape.** **Lina — owns the component content** (the theme-binding inversion and any component-side changes the shape requires touch her write scope). **Ada — owns the theme-conformance generator change** (the fixed protocol / generic-over-theme option named below is a generator-side decision).
**Trigger**: first Android/iOS product-spec kickoff, or any evaluation of the harness charter (`.kiro/issues/2026-09-17-platform-build-verification-harness-candidate.md`), whichever fires first. *(Kenya R2 and Data R2's joint wording, correcting Task 3's original "shared with harness trigger 1" — which named only the first limb; both reviewers held the harness charter's OWN triggers, not just its first, should also wake this issue — e.g. Kenya's `ContainerCardBase.ios.swift:816` parse defect could fire the harness charter's trigger 2 independently.)*
**Source**: Spec 123 Task 3.5 (`.kiro/specs/123-consumer-distribution/tasks.md` § "Task 3"), decided from Kenya R1/R2 and Data R1/R2 in `.kiro/specs/123-consumer-distribution/feedback/tasks.md`.

## Why this issue exists

Spec 123 Task 3 decided to KEEP the `.swift` and `.kt` native component trees in the shipped package (as the whole platform closures — component sources incl. Preview files, the platform-native blend helpers, and the platform token files — never a bare `*.swift`/`*.kt` glob), labelled honestly as **reference source, not a build input**. Neither tree compiles against a born consumer repo's own token tier as shipped today. This issue charters the real distribution mechanism that would change that; it is **not scheduled**, only evaluated at the trigger above.

**Related, separate, and already filed**: the theme-name hardcoding defect (`LocalDPTheme`/`@Environment(\.dpTheme)`/`any DesignerPunkTheme`, all derived from OUR OWN `name`/`abbreviation` rather than the consumer's) and the `ContainerCardBase.ios.swift:816` unterminated-comment parse defect are filed at **`.kiro/issues/2026-09-26-native-component-theme-hardcoding.md`**. That issue's fix is a **precondition** for either distribution shape below — a compiled artifact still binds a name (`LocalDPTheme`) or protocol (`DesignerPunkTheme`) that only exists in OUR OWN repo's generated tokens, never a consumer's own generated theme.

## The two shapes (per-platform, both Model-B-consistent)

**iOS — SPM source package** (Kenya R1, `.kiro/specs/123-consumer-distribution/feedback/tasks.md` § "[KENYA R1]"):
- `Package.swift` + a `Sources/<Target>/` layout assembled from the per-component directories, including the blend helper.
- **A theme-binding inversion is the hard part**: an SPM library cannot see the consumer app target's generated `DesignTokens`/`{Name}Theme`. Either (a) the package owns a fixed protocol that the consumer's `generate` emits a conformance to (**a generator change — Ada's seat**), or (b) the components are made generic over the theme.
- An access-control pass (only 19 of 39 production files currently declare `public` types).
- A distribution-channel decision: SPM resolves from a git URL or tag, not from npm — a `Package.swift` at the repo root or a separate repo.
- The compile harness (`.kiro/issues/2026-09-17-platform-build-verification-harness-candidate.md`) to prove it compiles.
- A binary `.xcframework` is **ruled out** under Model B — it bakes our token values into the binary, against "tokens are theirs wholesale".
- Cost class: **spec-scale, medium-large.**

**Android — Gradle source module** (Data R1, same feedback file § "[DATA R1]"):
- A Gradle source module (build script + `src/main/kotlin` + `src/main/res`) shipped in the tarball, assembled at pack time from the per-component dirs. The consumer `include`s it from `node_modules`, so it compiles in *their* build against *their* generated tokens — `npm update` stays the updating surface.
- Needs: the `LocalDPTheme` fix (the theme-hardcoding issue above), a `minSdk` decision (Core Goals: Android is unconstrained today), a tokens-module dependency shape, res relocation, and the compile harness to prove it.
- A **Maven/AAR artifact is ruled out** under Model B unless component token access is re-architected: the generator emits numeric tokens as `const val`, which `kotlinc` inlines into the AAR's bytecode, baking OUR values in. Re-architecting (an injected `CompositionLocal` provider across ~37 production files) plus a publish pipeline is spec-scale on its own.
- Cost class: **medium, days to about a week** (module scaffold + res relocation + minSdk decision + tokens-module dependency shape + the `LocalDPTheme` fix + the compile harness).

**Cheapest-but-rejected path (both platforms)**: copy-at-`attach` with a name rewrite (the same transform class as `init`'s `rewriteByResolution`). Produces a fork with no update path — the exact thing Spec 123's `sync` retirement of copy-based agent/steering management (C7) just closed off. Not recommended.

## What NOT to do

- Do not ship a binary artifact (`.xcframework` or AAR) that bakes DesignerPunk's own token VALUES into compiled bytecode — that violates Model B's "tokens are the consumer's own language" premise both platforms' consults independently reached the same conclusion on.
- Do not fix the theme-hardcoding defect as part of evaluating THIS charter without also considering whether the fix should land independently and sooner (it is filed separately and is not gated on this charter firing).

## Evaluation, when the trigger fires

1. Confirm `.kiro/issues/2026-09-26-native-component-theme-hardcoding.md` is fixed or has a landing plan (precondition).
2. Confirm the harness charter's compile-verification capability exists or is being built alongside (a distribution mechanism nobody can verify compiles is the same "trust the reported result" gap the harness charter names).
3. Size the theme-binding inversion (iOS) and the token-access re-architecture question (Android, if AAR is ever reconsidered) as their own scoped decisions — Ada's seat for the generator-side half, Lina's for the component-side half.
4. If chartered work proceeds, it is a new spec (both shapes are spec-scale or medium-to-large; neither is a bounded issue-driven fix).
