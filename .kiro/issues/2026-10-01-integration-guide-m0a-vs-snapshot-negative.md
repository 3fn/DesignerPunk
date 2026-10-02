# Issue: the Integration Guide's M0a steps tell consumers to copy the un-themed snapshots; the consumer overlays tell Kenya and Data never to read them for themed values

**Date**: 2026-10-01
**Status**: ACTIVE
**Owner**: Ada (drafts the governance proposal). **Decision**: Peter. The change is to a governance doc (`governance/DesignerPunk-Integration-Guide.md`), so it is ballot-ratified; and, depending on the option chosen, may also touch signed overlay units (a C1 re-sign by Kenya and Data) or the package's native-sync surface.
**Trigger**: **before release 2's RELEASE record opens** — by that event a ballot draft for this item exists on a branch and Peter's pick is recorded. Why this event and not another:
- The two sides of the contradiction are not on `main` together until **U2b's unit PR merges**. Before the merge the overlays live only on `task/123-u2b-profile`, so nothing on `main` contradicts the guide yet.
- The contradiction reaches **consumers** at release 2, where the package ships both the Integration Guide (`governance/**` is in `files[]`) and the consumer agents carrying the negative. After the RELEASE record it is in installed packages, and a correction becomes release 3's patch.
- So **U2b's merge is the checkpoint** (confirm at that merge that this issue is still ACTIVE and the draft is under way), and the **RELEASE record is the deadline**. If the pick is an option that needs code (B below), the draft still lands before the record; the code may follow it, and the guide must not describe a command the release does not ship.
- Task 19.4 (U3) reconciles the Integration Guide's install section (`2026-09-27-integration-guide-install-section-stale.md`, Thurgood). It is a plausible vehicle for the *edit*, but it is not this issue's trigger: it can fall after release 2, and the contradiction cannot wait for it.
**Source**:
- Ada's **split packaging ruling** (2026-09-29), recorded in Spec 123's `.kiro/specs/123-consumer-distribution/completion/task-15-completion.md` L94 (the pack-with-scripts lesson that found the snapshot refusals), L112 (Task 16 carry: 16.3 names the `files[]` negations `!dist/ios/**`, `!dist/android/**`, `!dist/web/**`) and L120 (the carried governance item: "the Integration Guide's M0a copy steps, which contradict the re-pointed snapshot negative for themed consumers (Ada drafts)"); and `task-15-5-completion.md` § "The re-author batch" (L30–32) and its corrections table row 1 (L113), plus L149 and L159. All on U2b's unit branch, reaching `main` at U2b's merge.
- Ada's **16.3 consult** (2026-10-01), where the flag was raised the second time.
- **Peter's request** (2026-10-01) that the flag be tracked as an issue so it is not lost.

---

## The gap

**The Integration Guide** (`governance/DesignerPunk-Integration-Guide.md`, in `main` at `dff78bcd`):

- **L362–383, "iOS (M0a — Manual Copy)"**: step 1 points at `node_modules/@3fn/core/dist/DesignTokens.ios.swift` and `…/dist/ComponentTokens.ios.swift`; step 2 says "Copy into your Xcode project's source tree"; step 4 shows themed consumption (`@Environment(\.{abbreviation}Theme) var theme`, `theme.colorActionPrimary`) as if the copied files supply it. L383: "`npx designerpunk sync:ios` is planned for M0b to automate this process."
- **L385–406, "Android (M0a — Manual Copy)"**: the same, against `dist/DesignTokens.android.kt` and `dist/ComponentTokens.android.kt`, with the L406 M0b note for `sync:android`.
- **L517–522, "Native Platform Sync — Target Model (M0b)"**: "the manual copy process will be replaced by" `npx designerpunk sync:ios` / `sync:android`, configured by `platforms: { ios: …, android: … }` in `designerpunk.config.ts`, and run "automatically as part of `npx designerpunk generate` when platform paths are configured".

**The consumer overlays** (on U2b's unit branch, read with `git show origin/task/123-u2b-profile:<path>`):

- `canonical/profiles/consumer/kenya.overlay.md` **L42**: "**Ground truth for these token values is LIVE, not a file** — never read DesignerPunk's un-themed base snapshots in the installed package (`node_modules/@3fn/core/dist/*.ios.swift`) for your themed values; query the application MCP…". **L65** ("never read DesignerPunk's un-themed base snapshots at `node_modules/@3fn/core/dist/*.ios.swift`") and **L90** repeat it. L109, L123 and the ComponentTokens trim at L170 (`negative: do NOT read DesignerPunk's base component-token snapshot … node_modules/@3fn/core/dist/ComponentTokens.ios.swift — it is the un-themed base, never the source for your themed values; your own generated output lives in your configured output directory`) carry the same negative.
- `data.overlay.md`: the matching lines, against `*.android.kt` — L43, L66, L91 (and L110, L169). The path forms are `node_modules/@3fn/core/dist/*.android.kt` and `…/ComponentTokens.android.kt`.

**The contradiction, stated precisely for a themed consumer.** A consumer that registers a theme in `designerpunk.config.ts` and builds a native product reads the Integration Guide's M0a steps, which name two files as the thing to copy. Those files are the **package's base snapshots**: generated from the base theme at publish, with none of the consumer's theme overrides. The guide's step 4 then shows `theme.colorActionPrimary` as the way to consume themed values. If the consumer's Kenya or Data agent follows the guide, it copies exactly the files its own overlay forbids it to read for themed values; if it follows the overlay, the guide's only documented native path is one it has been told is wrong for it. The guide never says the copied files are un-themed, and the overlay never mentions that the guide tells the consumer to copy them. Neither side is wrong about the file; the two documents disagree about what the file is *for*.

**Who is unaffected:**
- An **un-themed consumer** (no theme registered): the base snapshots are exactly its values, the M0a copy is correct for it, and the overlay's negative is stricter than it needs to be but harmless (the MCP answer equals the file).
- The **web CSS exports** (`./tokens.css` → `dist/DesignTokens.web.css`, `./component-tokens.css` → `dist/ComponentTokens.web.css`; `package.json` `exports`): themed web values come from `data-theme` scoping, and Sparky's overlay carries no equivalent snapshot negative (checked: its only `dist/` reference is `browser-entry.d.ts`, a type-declaration read). No overlay contradicts the guide's web section.

## Why the snapshots still ship

Ada's split packaging ruling (2026-09-29) keeps the **root `dist/` token files** and drops only `dist/{ios,android,web}/**` at Task 16.3:
- The root files are covered by `package.json` `files[]` (`dist/**/*.{js,d.ts,json,css,swift,kt}`); the two web CSS files are public `exports`; and the root `.swift`/`.kt` files are the **M0a copy flow's** documented source. They are fresh at publish and un-themed by design, which is correct for what a published package can know: it cannot hold a consumer's theme.
- The `dist/{ios,android,web}/**` subtrees are the in-repo `output: './dist'` leak (see "Related root cause" below), not an intended package surface. They are dropped at 16.3, which is also what makes Kenya's and Data's `superseded-by` trim dispositions true.
- Removing the root `.swift`/`.kt` files now would break the guide's only documented native path with no replacement, since `sync:ios` / `sync:android` do not exist yet.

**Precision**: only the web CSS files are in `exports`. The root `.swift`/`.kt` files ship through `files[]` and are reached by path (the M0a steps), not through `exports`. The ruling's reason for keeping them is the M0a flow, not an `exports` entry.

## Options (drafted, not picked — the pick is Peter's)

**Before choosing, verify**: what a themed consumer's own `npx designerpunk generate` actually emits for iOS/Android into its configured `output` (the guide shows `output: './dist/tokens'` at L59/L80/L95, and the overlay's cue says "your own generated output lives in your configured output directory"). Options A and C both assume the consumer's own output carries the themed Swift/Kotlin. That is the **unverified premise**; Spec 094's platform theme emission has an open defect (`2026-06-28-spec-094-platform-theme-emission-unwired.md`), and the 094 known limitation (direct, not transitive, theme-varying determination) applies. If it does not hold, the overlays' pointer at "your configured output directory" is itself unsound and this issue widens.

### A. Amend the guide's M0a steps (doc-only)
Say plainly that the shipped `dist/*.swift` / `dist/*.kt` are **un-themed base snapshots**; split step 1 into "un-themed consumer: copy these" and "themed consumer: generate, then use your own `outputDir`"; keep the M0b note.
- **Cost**: a governance-doc edit by ballot (Thurgood owns the guide's install reconciliation; coordinate so 19.4 does not re-touch the same lines). No code, no package change, no overlay re-sign. Cheapest, and can land before release 2.
- **Surviving counter-argument**: it fixes the words, not the artifact. The base snapshots still sit in the package for an agent to open, and the only thing between a themed consumer's agent and a wrong value remains a negative in an overlay plus a sentence in a guide; the two flows in one step list is exactly the shape that gets skimmed. It also leaves M0a, a copy-and-fork flow, as the documented path for un-themed consumers indefinitely.

### B. Bring M0b forward: ship `sync:ios` / `sync:android` and retire the root `.swift`/`.kt` snapshots
Consumers get their native tokens from their own generate (themed by construction), `files[]` stops shipping the root native snapshots, the guide's M0a sections are replaced by the M0b model, and the overlays' negative becomes unnecessary (nothing to misread).
- **Cost**: the largest. CLI and generator work, a `files[]` change, a package-visible removal (breaking for any consumer already using M0a), an Integration Guide rewrite, and probably its own spec or at least an issue-driven task with owner routing; it is Spec 123 scope creep unless Peter schedules it. The web CSS exports are untouched.
- **Surviving counter-argument**: it deletes the only artifact a published package can offer to a consumer who does not run the pipeline, and makes the pipeline mandatory for native consumers; and it cannot be assumed to land before release 2, so by itself it does not discharge the trigger. It also leaves the `src/components/**/platforms/**` component sources, which carry token references, unchanged, so "retire the snapshots" removes one path to a stale value, not all.

### C. Soften or scope the overlays' negative
Re-author Kenya's and Data's negative so it applies to themed consumers only ("un-themed base; correct only if no theme is registered"), or reword it from "never read" to "never source themed values from".
- **Cost**: Kenya's and Data's overlay units are signed C1 units. Editing them is a re-author plus a re-sign by each seat under the signing-act chain, and moves rendered hashes (the trim rows are the ones the VALVE-1 issue already tracks). The negative was **restored on purpose** at Task 15.5 (corrections row 1: "the shipped-snapshot negative was removed, though the package ships the snapshots") by Ada's split ruling; loosening it reopens that ruling.
- **Surviving counter-argument**: it resolves the contradiction by weakening the guard that exists for a real failure (an agent reads a flat file and takes it as the themed value). A conditional negative asks the agent to know whether it is themed, which is the judgement the unconditional form removes. Agents handle "never" more reliably than "never unless".

### Ada's stated lean, and what survives
**B as the end state, with A as the bridge.** `sync:ios` / `sync:android` should retire the root `.swift`/`.kt` snapshots — that retirement is a **later ruling**, not part of this issue's pick, because the premise it needs (themed native output from the consumer's own generate) is the unverified one above. In the meantime A is the smallest honest correction, and C is my least favourite (it spends the guard to buy consistency).
- **Surviving counter to the lean**: if B is the end state, A edits words that B deletes, and a bridge that is "temporary" has a habit of becoming the permanent state. Also, my lean was formed in the same sessions that made the split ruling, so I may be rationalising my own ruling: B concedes that keeping the root snapshots was a transitional decision, and I should say so rather than present it as foresight.
- **A fork this exposes, surfaced not picked**: bridge with A and ship release 2 on the M0a flow, or hold the native part of release 2 until B lands. The second is a scheduling choice about the release, not a token one.

## Related root cause — separate item

This repo's `designerpunk.config.ts` has `output: './dist'` (L26), so every in-repo `npx designerpunk generate` writes `dist/{ios,android,web}/**` into the package's own `dist/`, where the `files[]` glob `dist/**/*.{…swift,kt}` ships them. That is the leak the 16.3 negations plug at the packaging layer, and the reason the two `DesignTokens` trims were `superseded-by` conditionally.

**It does not belong in this issue.** This issue is a documentation contradiction between two shipped surfaces that persists even if the leak is fixed (the root snapshots are not the leak). The leak is a pipeline-configuration defect whose fix changes where the repo's own tooling writes (whatever else reads or regenerates `dist/` must be checked first), which is **Peter's call** per the Task 15 carry (`task-15-completion.md` L121, `task-15-5-completion.md` L159). Filing it separately keeps this issue's trigger independent of that call: A and C do not need the root cause fixed, and fixing the root cause does not resolve the contradiction. **File it as its own issue when Peter chooses to take it up**; this issue cites it only so neither is read as covering the other. (If Peter prefers one item, the cost is that this issue's trigger would then wait on a repo-config decision it does not otherwise depend on.)

## Not in scope here

Any edit to `governance/DesignerPunk-Integration-Guide.md`, to the Kenya/Data overlays or their signed units, or to `package.json`. This issue is the tracked flag and the option set. The ballot draft, when written, is Ada's; the ratification and the pick are Peter's.
