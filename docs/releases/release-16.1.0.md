# Release 16.1.0

**Date**: TBD (written at the tag)
**Previous**: 16.0.0
**Bump**: minor

> **Authorship note (recorded, not buried)**: these notes are HAND-AUTHORED from the merged delta (`v16.0.0..de63033b9`, the freeze **F**, #484's merge; `main` was at `b224dc3d6` when they were written, and the three files that differ from F are `.kiro/` records and a ballot, none of them shipped). No release tool was involved. This is the fifth planned entry in the plan's numbering ("Release N" labels the Nth planned entry, not a count of tags). **DRAFT status**: the ratified-bump line below cites Peter's words as the orchestrator relayed them; the onboarding-evidence section is a placeholder until the pre-S trio's records merge; and S, the tag date and the pack sha1 are filled at the steps that produce them.
>
> **The delta, derived** (RELEASE-FLOW § "Deriving the delta", step 1):
> - `git log --first-parent v16.0.0..de63033b9 --oneline`: **99** squash commits (#384–#484).
> - The same log scoped to the shipped surface, `package.json` `files[]` read literally (`dist/` and `bin/` are build output and untracked): **47** commits touch a tracked `files[]` path (#388, #390, #391, #392, #394, #396, #397, #405, #408, #411, #412, #416, #417, #419, #423, #424, #425, #427, #436, #437, #439, #440, #441, #442, #444, #445, #447, #448, #450, #451, #452, #453, #459, #462, #463, #465, #467, #470, #471, #472, #473, #478, #479, #481, #482, #483, #484). **7** more touch only other build inputs of `dist/` (#409, #410, #415, #421, #422, #438, #449; `src/`, `canonical/`, `tools/agent-generator/`, `scripts/`).
> - **One `files[]` entry was added since 16.0.0**: `scripts/owed-set.sh` (#439).
>
> **Classification** (step 2): **🔴 0 breaking · 🟡 minor (new behaviour a consumer can use or will notice): #405 and #411 (docs MCP), #390 (find_components tiers), #439 (owed-set.sh), #450 (checkboxes submit), #452, #470 and #478 (token-index consumers), #471 (checkbox reset, segmented-choice references, COMPONENTS_DIR warning), #482 (Button `variant` and `onPress`), #440 and #442 (Integration Guide walkthroughs) · 🔵 consumer-visible fixes and corrections: #391, #394, #438, #451, #453, #462, #463, #465, #467, #472, #412 · 🔵 internal: the rest** (ballots, registers, records, instruments, tests). The classification is mine, read from squash titles and PR bodies; Peter ratifies the bump.
>
> **Ratified bump**: 16.1.0, minor (Peter, as relayed by the orchestrator; the walk record `.kiro/issues/2026-10-25-release-16.1.0-walk.md` cites it). *No committed record of that ratification was read by this author.* **Why minor, and the counter-argument that survives**: nothing a 16.0.0 install relies on was removed, and no token value changed. Four changes can still make a 16.0.0 page or script behave differently: a form reset now leaves a checkbox authored `checked` checked; the large Button-CTA's icon, and `iconBaseSizes.size125`, are 28 (they were 32) on web; `find_components` marks fewer matches `strong`; and a checkbox now submits with its form, which doubles a value for anyone who added a hidden input as a workaround. Each is a correction to what a served contract already said, and each is named under "Changed" in the CHANGELOG and in Upgrading. On the strict reading "anything a 16.0.0 user must change is breaking", the last of them qualifies; the bump is the same either way, and what the classification changes is where a reader finds it.
>
> **The token lines**: **no token value changed.** `token-index/` changed (consumers on primitive, semantic and component tokens, and DesignerPunk's component tokens; #452, #470, #478) and `npm run build` leaves it clean (`verify:token-index-clean` green). The token source changed in descriptions only (`blend.disabledDesaturate`'s description and two comments, #394).

**Scope of this release, plainly**: this release is for building web products, with the agent layer for Claude Code and Kiro. Native onboarding is still not supported: the iOS (SwiftUI) and Android (Jetpack Compose) components and the generated Android token files are reference source, not a build input. Android is disclosed as such in the CHANGELOG (Peter approved shipping with that disclosure, 2026-10-24, as relayed). On web, a custom theme you register in `designerpunk.config.ts` does not change your generated output.

## 🟡 Added and changed capability

- **`<button-cta>` and `<button-icon>` have the `variant` and `onPress` properties the schema lists** (#482). `el.variant` reads and writes the `variant` attribute; `buttonVariant` stays as an alias; `el.onPress = fn` runs `fn` on each press (click, Enter or Space) and `null` removes it; the `press` event is unchanged and each of the two runs once per press. Verified in Chromium 152 (Sparky); keyboard activation and a `variant` set before connect are carried by the unit tests, not observed in a browser.
- **Input-Checkbox-Base and Input-Checkbox-Legal submit with their form on web** (#450). Form-associated custom elements: a checked box adds `name=value` to `FormData`. `disabled` is stripped (the 2026-09-19 disabled-input ruling). Legal's own click is no longer refused as a pre-check. Browser-verified in Chromium 152; Safari 16.4+ and Firefox are still owed (Sparky).
- **Checkbox reset restores the authored state** (#471, row 8). The state at first connect, including an authored `indeterminate` on Base; Legal with `requiresExplicitConsent` still resets to unchecked. Browser-verified in Chromium 152 (R8-1…R8-6, R8-X).
- **Nav-SegmentedChoice-Base sets `ariaControlsElements` to your panels** (#471, E6; #484 applied the fallback contract text). Reference verified through the IDL in Chromium 152; whether assistive technology exposes it was not observable (E6-2: CANNOT TELL), so the served contract states that no association is provided on web.
- **Application MCP: a missing `COMPONENTS_DIR` is reported** (#471, row 5): `degraded` health, a boot-log line, and the warning on `get_component_full` and `get_component_summary`.
- **`get_token_consumers`** (#452, #470, #478): finds DesignerPunk's components, and consumers of primitive and component tokens as well as semantic ones; 97 of the 532 token names the component schemas declared matched no token and now do; 229 declarations were added so the schemas declare what the code reads (#478); the scope ("lists the components whose schemas declare a token; it does not scan platform code") is in the tool description (Peter, response-shape ruling B: the response stays a bare array). In a born repo and in package mode the token index holds DesignerPunk's component tokens, version-tagged (`source: { package, version }`, `definedBy`).
- **Docs MCP** (#405, #411): the audience banner on `get_document_summary` and `get_section` (+480 bytes per bannered `get_section` call); `get_section` runs through fenced templates; `####` sections fetchable by id (`s13.1`); not-found suggestions reach `###` and `####`; logs leave the working directory. Corpus check: all 2,850 existing ids and all 332 fenced-heading payloads unchanged.
- **`find_components` tiers** (#390, #391): "names beat purpose". 19 results moved `strong` to `partial` on the study's reproductions, none moved up, no positive at rank 2 or better regressed; one recorded cost (a purpose-synonym query, "loading", ranks Progress-Bar-Base fourth of four tied partials). Button-CTA's `purpose` rewritten.
- **`scripts/owed-set.sh` ships** (#439, #473): the owed-set query, for consumer-Stacy. #473 anchors it on the closing commit of `tasks.md`, with 19 falsification fixtures.
- **Integration Guide walkthroughs** (#440, #442): six goal-shaped guides under a new `## Walkthroughs` section, four available. Checked as text; none run cold.

## 🔵 Changed

- **Visual change on web**: the large Button-CTA's icon is 28px (was 32px) and `iconBaseSizes.size125` is `28` (was `32`) (#482; walk line 29 (ii)). The accepted size `13` still draws 16px; Peter kept the literal with the note (walk line 29 (i), his comment on #469).
- **Button-CTA's `ButtonCTATokens` and `getButtonCTAMinWidth` are removed** (#452). Not reachable through `exports`; the web and iOS components read the `sizing` tokens like Android.
- **`generate`** warns about a component token or an own schema name your token source does not have (#452); `sync` says when your token index is behind the installed package (#470); the upgrade report no longer ends with a false all-clear (#462).
- **Theme claims corrected to what `generate` emits** (#451): the Sparky and Ada charters and 11 sites in served token docs; no generated output changes.
- **Bundled libraries** (#483): see "Dependency disclosure".
- **Served governance documents and charters**: 31 governance docs, Core Goals and the Systems Overview name token-index keys (#472); 48 broken relative links fixed (#463); the always-loaded overviews' counts and the Product MCP description corrected (#465, #467); the deprecated disabled blend is no longer "scheduled for removal" (#394); one `Process-Spec-Planning.md` sentence about a parser a consumer does not have (#412); the Form-Inputs reset sentence and the Icon-Base size map (#471).

## 🔵 Fixed

- **Android interim fixes** (#453): `.dp` conversions at 13 `Float` sizing reads and the missing `Dp` import in Button-CTA and Avatar-Base; 16 wrong `.dp` wrappers removed in Button-VerticalList-Item, Nav-Header-Base and Nav-TabBar-Base; a two-sided guard test. Found by reading the Kotlin; no Android build has been run.
- **`generate` prints the `--product-only` tip only when `productTokens` is configured** (#438).

## ⚠️ Known limitations (disclosed, tracked)

The CHANGELOG's "Known limitations in this release" is the consumer-facing list and is not repeated here. Two additions that belong to the record:

- **Walk rows that lapse at S** are listed in `.kiro/issues/2026-10-25-release-16.1.0-walk.md` § "At S (release 16.1.0)"; none of them is a disclosure that is missing from a served surface (the blocking test, RELEASE-FLOW item 3a).
- **Android is disclosed as reference source** (Peter, 2026-10-24); Spec 129's first task is a build check that compiles the Android output.

## Upgrading from 16.0.0

See the CHANGELOG's "Upgrading from 16.0.0" (six steps). **From 15.1.0 or earlier**: follow the 16.0.0 notes (`docs/releases/release-16.0.0.md`) and install 16.1.0 at step 1. The one-hop rehearsal from 14.x has not been re-run for 16.0.0 or 16.1.0.

## 🧪 Onboarding evidence

**PLACEHOLDER, filled when the pre-S trio's records merge on #474** (the trio runs on the candidate pack built from F by `scripts/release-publish.ts --dry-run de63033b9`, then on S's tarball only by the 5.1 dry run). The disposition lines for the prior findings (`fixed-and-observed` / `fixed-not-observed` / `still-present`) belong to the persona records; this table lists them once they exist.

| Record | What ran | Candidate |
|---|---|---|
| (pending) | the three persona runs and the Kiro conformance pair | pack sha1 `<fill from the dry run>` |

**Not exercised, stated plainly**: nothing in this release has been run by a consumer yet. The walkthroughs have not been run cold.

## 📦 Dependency disclosure (ballot `2026-10-03-hermetic-publish-path` § 7)

**Embedded dependency versions changed against the previous release's public artifact** (16.0.0). Bundled in `dist/mcp/docs-mcp.js`, `application-mcp.js` and `product-mcp.js`, per Ada's esbuild-metafile audit (`.kiro/issues/2026-10-15-123-cannot-tell-cells.md` row 5) and the lockfiles of all three trees at F:

| Library | In 16.0.0 | In 16.1.0 | In bundles |
|---|---|---|---|
| `@modelcontextprotocol/sdk` | 1.29.0 | 1.32.2 | all three (stdio server modules only; no client, auth or HTTP module) |
| `fast-uri` | 3.1.3 | 3.1.9 | all three |
| `js-yaml` | 4.1.1 / 4.2.0 | 4.3.2 | Application and Product (the Docs bundle has none) |
| `zod` | 4.3.6 | 4.6.7 | all three; fixes GHSA-mrhx-c7xc-m3w5 (a high-severity advisory: memory exhaustion validating oversized constrained collections) |

- **A consumer's `npm audit` cannot see these**: inlined libraries are not in the dependency tree it reads.
- **`npm audit --omit=dev` after the bumps** (Ada, then Thurgood's outcome line): root 12 to 8, `mcp-server` 9 to 6, `application-mcp-server` 10 to 6. No `zod` finding remains in any tree; what is left is seven packages no bundle contains, and `diff` (root, low).
- **Where these figures come from**: lockfiles and the metafile audit at `main` `d740624b8`/F, in a working checkout, not a fresh-clone build. **The 5.1 dry run at S confirms them** (root `node_modules/` only).

## 🔵 Internal (provenance, not consumer surface)

The remaining PRs changed nothing a consumer installs or runs: Spec 131 (governance simplification) outline, evidence and ballot-audit records (#455–#460); the ballots ratified and applied this cycle (obligation drain and release falsity floor, governance edit kinds, instrument census at draft, sitting 2/3, P1b, the signing-act chain, standing write scope for six roots, no-volatile-metadata, true native development, trigger-names-the-event); the claims-pass and parity instruments (`completion-criteria-parity` D-2, `verify-signing-chain --audit`, the named-guard registry); the components calibration instrument (the *matcher* it turned is listed above, #390); the 16.0.0 publish verification and claims passes (#384, #385, #395); Spec 128, 129, 130 and 113 records; and the 16.1.0 walk (#468, #469 and the floor-batch fixes listed above).
