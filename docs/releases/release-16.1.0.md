# Release 16.1.0

**Date**: 2026-10-26
**Previous**: 16.0.0
**Bump**: minor

> **Authorship note (recorded, not buried)**: these notes are HAND-AUTHORED from the merged delta, `v16.0.0..a03b92f02`. **The release base is `a03b92f02`** (#491's merge). The onboarding trio's freeze **F**, `de63033b9` (#484's merge), comes earlier: after F, five PRs changed shipped paths (#486, #488, #489, #490, #491), so the trio's candidate does not hold them (§ "Onboarding evidence"). No release tool was involved. This is the fifth planned entry in the plan's numbering ("Release N" labels the Nth planned entry, not a count of tags). The ratified-bump line below cites Peter's words as the orchestrator relayed them. S, the tag date and S's pack sha1 are filled at the steps that produce them (RELEASE-FLOW 5.1–5.2, and the step-6 record).
>
> **The delta, derived** (RELEASE-FLOW § "Deriving the delta", step 1):
> - `git log --first-parent v16.0.0..a03b92f02 --oneline`: **108** squash commits (#384–#491). 99 of them are up to F, and 9 are after it: #480, #474, #487, #485, #488, #486, #489, #490 and #491.
> - The same log scoped to the shipped surface, `package.json` `files[]` read literally (`dist/` and `bin/` are build output and untracked): **51** commits touch a tracked `files[]` path (#388, #390, #391, #392, #394, #396, #397, #405, #408, #411, #412, #416, #417, #419, #423, #424, #425, #427, #436, #437, #439, #440, #441, #442, #444, #445, #447, #448, #450, #451, #452, #453, #459, #462, #463, #465, #467, #470, #471, #472, #473, #478, #479, #481, #482, #483, #484, and after F #486, #488, #490, #491). **8** more touch only other build inputs of `dist/` (#409, #410, #415, #421, #422, #438, #449, and after F #489; `src/`, `canonical/`, `tools/agent-generator/`, `scripts/`).
> - **One `files[]` entry was added since 16.0.0**: `scripts/owed-set.sh` (#439).
>
> **Classification** (step 2): **🔴 0 breaking · 🟡 minor (new behaviour a consumer can use or will notice): #405 and #411 (docs MCP), #390 (find_components tiers), #439 (owed-set.sh), #450 (checkboxes submit), #452, #470 and #478 (token-index consumers), #471 (checkbox reset, segmented-choice references, COMPONENTS_DIR warning), #482 (Button `variant` and `onPress`), #440 and #442 (Integration Guide walkthroughs), #489 (`generate` stops on an unemitted colour reference), #491 (one token-selection order in the agents' text) · 🔵 consumer-visible fixes and corrections: #391, #394, #438, #451, #453, #462, #463, #465, #467, #472, #412, #486 (the segmented-choice contract sentence), #488 (Button-CTA's served form guidance), #490 (one Integration Guide sentence) · 🔵 internal: the rest** (ballots, registers, records, instruments, tests). The classification is mine, read from squash titles and PR bodies; Peter ratifies the bump.
>
> **Ratified bump**: 16.1.0, minor (Peter, as relayed by the orchestrator; the walk record `.kiro/issues/2026-10-25-release-16.1.0-walk.md` cites it). *No committed record of that ratification was read by this author.* **Why minor, and the counter-argument that survives**: nothing a 16.0.0 install relies on was removed, and no token value changed. Six changes can still make a 16.0.0 page or script behave differently: a form reset now leaves a checkbox authored `checked` checked; the large Button-CTA's icon, and `iconBaseSizes.size125`, are 28 (they were 32) on web; `find_components` marks fewer matches `strong`; a checkbox now submits with its form, which doubles a value for anyone who added a hidden input as a workaround; an assignment to `el.variant` or `el.onPress`, which did nothing in 16.0.0, now takes effect; and `generate` now stops, where it used to exit 0, when a semantic colour points at a colour it does not emit. Each is a correction to what a served contract already said, and each is named under "Changed" in the CHANGELOG and in Upgrading. On the strict reading "anything a 16.0.0 user must change is breaking", the last of them qualifies; the bump is the same either way, and what the classification changes is where a reader finds it.
>
> **The token lines**: **no token value changed.** `token-index/` changed (consumers on primitive, semantic and component tokens, and DesignerPunk's component tokens; #452, #470, #478) and `npm run build` leaves it clean (`verify:token-index-clean` green). The token source changed in descriptions only (`blend.disabledDesaturate`'s description and two comments, #394).

**Scope of this release, plainly**: this release is for building web products, with the agent layer for Claude Code and Kiro. Native onboarding is still not supported: the iOS (SwiftUI) and Android (Jetpack Compose) components and the generated Android token files are reference source, not a build input. Android is disclosed as such in the CHANGELOG (Peter approved shipping with that disclosure, 2026-10-24, as relayed). On web, a custom theme you register in `designerpunk.config.ts` does not change your generated output.

## 🟡 Added and changed capability

- **`<button-cta>` and `<button-icon>` have the `variant` and `onPress` properties the schema lists** (#482). `el.variant` reads and writes the `variant` attribute; `buttonVariant` stays as an alias; `el.onPress = fn` runs `fn` on each press (click, Enter or Space) and `null` removes it; the `press` event is unchanged and each of the two runs once per press. Verified in Chromium 152 (Sparky): click, `variant` both ways, the alias, and one call each for `onPress` and a `press` listener. Enter activation is carried by a jsdom unit test; Space activation and a `variant` set before the element connects are not tested directly (the shared test helper sets the `buttonVariant` alias before insertion, and `variant` forwards to it); none of the three was observed in a browser.
- **Input-Checkbox-Base and Input-Checkbox-Legal submit with their form on web** (#450). Form-associated custom elements: a checked box adds `name=value` to `FormData`. `disabled` is stripped (the 2026-09-19 disabled-input ruling). Legal's own click is no longer refused as a pre-check. Browser-verified in Chromium 152; Safari 16.4+ and Firefox are still owed (Sparky).
- **Checkbox reset restores the authored state** (#471, row 8). The state at first connect, including an authored `indeterminate` on Base; Legal with `requiresExplicitConsent` still resets to unchecked. Browser-verified in Chromium 152 (R8-1…R8-6, R8-X).
- **Nav-SegmentedChoice-Base sets `ariaControlsElements` to your panels** (#471, E6; #484 applied the fallback contract text). Reference verified through the IDL in Chromium 152; whether assistive technology exposes it was not observable (E6-2: CANNOT TELL). #486 corrected the served contract sentence to match: the element reference is set where the browser has `ariaControlsElements`, and no association is provided where it has not.
- **Application MCP: a missing `COMPONENTS_DIR` is reported** (#471, row 5): `degraded` health, a boot-log line, and the warning on `get_component_full` and `get_component_summary`.
- **`get_token_consumers`** (#452, #470, #478): finds DesignerPunk's components, and consumers of primitive and component tokens as well as semantic ones; 97 of the 532 token declarations in the component schemas named no token; 81 were renamed to token-index keys and 16 removed (#452); 229 declarations were added so the schemas declare what the code reads (#478); the scope ("lists the components whose schemas declare a token; it does not scan platform code") is in the tool description (Peter, response-shape ruling B: the response stays a bare array). In a born repo and in package mode the token index holds DesignerPunk's component tokens, version-tagged (`source: { package, version }`, `definedBy`).
- **Docs MCP** (#405, #411): the audience banner on `get_document_summary` and `get_section` (+480 bytes per bannered `get_section` call); `get_section` runs through fenced templates; `####` sections fetchable by id (`s13.1`); not-found suggestions reach `###` and `####`; logs leave the working directory. Corpus check: all 2,850 existing ids and all 332 fenced-heading payloads unchanged.
- **`find_components` tiers** (#390, #391): "names beat purpose". 19 results moved `strong` to `partial` on the study's reproductions, none moved up, no positive at rank 2 or better regressed; one recorded cost (a purpose-synonym query, "loading", ranks Progress-Bar-Base fourth of four tied partials). Button-CTA's `purpose` rewritten.
- **`scripts/owed-set.sh` ships** (#439, #473): the owed-set query, for consumer-Stacy. #473 anchors it on the closing commit of `tasks.md`, with 19 falsification fixtures.
- **Integration Guide walkthroughs** (#440, #442): six goal-shaped guides under a new `## Walkthroughs` section, four available. Checked as text; none run cold.
- **`generate` stops on a semantic colour reference it does not emit** (#489; walk G-1, Peter: "Fix now"). The check runs against what the generators emit, not what the copy declares. DesignerPunk's own 15 shadow tokens reference shadow colours no platform emits, so those are pinned and print one warning per run (Peter, option (a): "Let's go with A, but we need to remember to remove the warning when we do the work in 129"). A test fails once a pinned colour is emitted.
- **One token-selection order** (#491; ballot `2026-10-25-token-selection-order-one-rule`, ratified #480; walk R6, Peter: "Fix now"). Token Governance § "Token Selection Matrix" is the one order. Core Goals points to it, and the consumer Ada and Lina charters point to it in the same way. Stacy, Lina and Ada re-confirmed and re-signed the three changed units, and the token-governance embeds re-rendered.

## 🔵 Changed

- **Visual change on web**: the large Button-CTA's icon is 28px (was 32px) and `iconBaseSizes.size125` is `28` (was `32`) (#482; walk line 29 (ii)). The accepted size `13` still draws 16px; Peter kept the literal with the note (walk line 29 (i), his comment on #469).
- **Button-CTA's `ButtonCTATokens` and `getButtonCTAMinWidth` are removed** (#452). Not reachable through `exports`; the web and iOS components read the `sizing` tokens like Android.
- **`generate`** warns about a component token or an own schema name your token source does not have (#452); `sync` says when your token index is behind the installed package (#470); the upgrade report no longer ends with a false all-clear (#462).
- **Theme claims corrected to what `generate` emits** (#451): the Sparky and Ada charters and 11 sites in served token docs; no generated output changes.
- **Bundled libraries** (#483): see "Dependency disclosure".
- **Button-CTA's served form guidance** (#488; walk F-E8, Peter: "Fix"): `component-meta.yaml`, `validate_assembly`'s `form-needs-submit-action` message and the browser guide say that on web the element does not submit a form by itself, and give the wiring. The element is unchanged. Lina's headless check: unwired, a click and Enter submitted nothing; with the guide's snippet, each submitted once, and validation was respected. Sparky's Chromium verifier line is still owed.
- **`status.spec`** (#490; walk G-3, Peter: "Ride along"): one Integration Guide sentence says it is the author's value and that nothing checks it.
- **Served governance documents and charters**: 26 governance docs, Core Goals and the Systems Overview name token-index keys (#472); 48 broken relative links fixed (#463); the always-loaded overviews' counts and the Product MCP description corrected (#465, #467); the deprecated disabled blend is no longer "scheduled for removal" (#394); one `Process-Spec-Planning.md` sentence about a parser a consumer does not have (#412); the Form-Inputs reset sentence and the Icon-Base size map (#471).

## 🔵 Fixed

- **Android interim fixes** (#453): `.dp` conversions at 13 `Float` sizing reads and the missing `Dp` import in Button-CTA and Avatar-Base; 16 wrong `.dp` wrappers removed in Button-VerticalList-Item, Nav-Header-Base and Nav-TabBar-Base; a two-sided guard test. Found by reading the Kotlin; no Android build has been run.
- **`generate` prints the `--product-only` tip only when `productTokens` is configured** (#438).

## ⚠️ Known limitations (disclosed, tracked)

The CHANGELOG's "Known limitations in this release" is the consumer-facing list and is not repeated here. Two additions that belong to the record:

- **Walk rows that lapse at S** are listed in `.kiro/issues/2026-10-25-release-16.1.0-walk.md` § "At S (release 16.1.0)" and its re-cut section; one of them is a disclosure missing from a served surface (the blocking test, RELEASE-FLOW item 3a): the consumer-Stacy charter's owed-set lines (`dist/consumer-canonical/agents/stacy.md` L343 and L347; `.kiro/issues/2026-10-25-owed-set-law-text-after-closing-commit-anchor.md`). Stacy's phase-1 pass (#497) found it as RL-22, and Peter ruled it floor-class and waived it for 16.1.0 ("(i)"); its fix rides #473's follow-on. Every other floor-class row is fixed: row 6 by #491, F-E8 by #488.
- **Android is disclosed as reference source** (Peter, 2026-10-24); Spec 129's first task is a build check that compiles the Android output.

## Upgrading from 16.0.0

See the CHANGELOG's "Upgrading from 16.0.0" (six steps). **From 15.1.0 or earlier**: follow the 16.0.0 notes (`docs/releases/release-16.0.0.md`) and install 16.1.0 at step 1. The one-hop rehearsal from 14.x has not been re-run for 16.0.0 or 16.1.0.

## 🧪 Onboarding evidence

Onboarding trio: three runs on a preview candidate packed at F `de63033b9` (records `tests/onboarding-trio/records/16.1.0/`; Kiro conformance pair re-queued to November). After F, PRs #486, #488, #489, #490 and #491 changed shipped paths, so by protocol § 5.0 the candidate is stale for this release (diff line in the release PR). No trio run saw these changes: the token-selection order (Core Goals, Token Governance, the consumer Ada and Lina charters), Button-CTA's served text, the Nav-SegmentedChoice-Base contract sentence (#486), `generate`'s dangling-reference check, and one Integration Guide sentence. The trio's findings describe agents that loaded the text as it stood at F. `generate`'s new check is covered on the founder path by `npm run test:consumer` at `bb9abb934` (the release branch with `a03b92f02` merged): 56 passed, 1 skipped (57). Findings fixed after F are re-observed at the next release's trio (F25).

| Record | Harness | What ran | F25 dispositions (fixed-and-observed / fixed-not-observed / still-present) |
|---|---|---|---|
| `trio-1-backend.md` | Claude Code | birth and both probes (Ada, Lina) | 10 / 8 / 18 |
| `trio-2-designer.md` | Kiro | birth and the Sparky probe | 11 / 7 / 18 |
| `trio-3-pm.md` | Kiro, `init --target=kiro` (bare `init` was not exercised) | birth and the Leonardo probe | 8 / 10 / 18 |
| `conformance-kiro-beat-1.md` | Kiro | setup only (steps 0–7 and 12); no probe or beat ran | — |
| `conformance-kiro-beat-2.md` | Kiro | not run | — |

Candidate: F `de63033b9`, pack sha1 `42515c34784552f6d87453ac3e67dc033a773d19`, pack version 16.0.0 (`scripts/release-publish.ts --dry-run de63033b9`). The release base `a03b92f02` was also dry-run before the release PR: 105/105 assertions, `publish path: 16 (floor 16)`, sha1 `d1761e1201a835cab6a0fd558a4213de3b8f1e23` (pack version 16.0.0; the bump is on the release branch). S's own dry run is RELEASE-FLOW 5.1.

**The Kiro conformance pair is re-queued**: Peter, 2026-10-25, chat, relayed: "Go with the last option, re-queue the Kiro pair for November". Both Kiro renderings it covers (Thurgood, Stacy) changed since release 4, so the pair was due; Kiro's plan quota stopped model calls. It re-runs after the 2026-11-01 Kiro credit reset, on the shipped tarball if 16.1.0 has shipped by then, otherwise on the preview (Peter: "Use the shipped tarball if it's out, otherwise the preview"). Record: `.kiro/issues/2026-10-25-kiro-conformance-pair-requeue.md`.

**Not exercised, stated plainly**: nothing in this release has been run by a real consumer yet. The walkthroughs have not been run cold. Bare `init` (the DD9 notice) was not exercised, because persona (c) passed `--target=kiro` (R3-13). Trio-3's probe ended on Kiro's quota before it answered (R3-18). The Kiro pair did not run. No agent has been observed reading the post-F text listed above.

## 📦 Dependency disclosure (ballot `2026-10-03-hermetic-publish-path` § 7)

**Embedded dependency versions changed against the previous release's public artifact** (16.0.0). Bundled in `dist/mcp/docs-mcp.js`, `application-mcp.js` and `product-mcp.js`, per the esbuild-metafile audit (`.kiro/issues/2026-10-15-123-cannot-tell-cells.md` row 5, with its root-only correction) and the root `package-lock.json` at `v16.0.0` and at F. The publish path builds the bundles from the root `node_modules` only (`scripts/pack-assert.ts` 10d), so the root lockfile is the one of record; the servers' lockfiles govern only their dev builds. **Authority for the bumps**: Peter's comment on #469 (2026-10-25T13:53:19Z, his words): "Row 5 audit: bump the three (sdk, fast-uri, js-yaml) now; carry zod." Later, relayed (#483's body): "Let's take 4.6.7 now", which supersedes the "carry zod" half.

| Library | In 16.0.0 | In 16.1.0 | In bundles |
|---|---|---|---|
| `@modelcontextprotocol/sdk` | 1.29.0 | 1.32.2 | all three (stdio server modules only; no client, auth or HTTP module) |
| `fast-uri` | 3.1.3 | 3.1.9 | all three |
| `js-yaml` | 4.2.0 | 4.3.2 | Application and Product (the Docs bundle has none) |
| `zod` | 4.3.6 | 4.6.7 | all three; fixes GHSA-mrhx-c7xc-m3w5 (a high-severity advisory: memory exhaustion validating oversized constrained collections) |

- **A consumer's `npm audit` cannot see these**: inlined libraries are not in the dependency tree it reads.
- **`npm audit --omit=dev` after the bumps** (Ada, then Thurgood's outcome line): root 12 to 8, `mcp-server` 9 to 6, `application-mcp-server` 10 to 6. No `zod` finding remains in any tree; what is left is seven packages no bundle contains, and `diff` (root, low).
- **Where these figures come from**: the root lockfile at `v16.0.0` and F, and the metafile of a root-only build at F (row 5's outcome lines); not a fresh-clone build. **The 5.1 dry run at S confirms them** (root `node_modules/` only).

## 🔵 Internal (provenance, not consumer surface)

The remaining PRs changed nothing a consumer installs or runs: Spec 131 (governance simplification) outline, evidence and ballot-audit records (#455–#460); the ballots ratified and applied this cycle (obligation drain and release falsity floor, governance edit kinds, instrument census at draft, sitting 2/3, P1b, the signing-act chain, standing write scope for six roots, no-volatile-metadata, true native development, trigger-names-the-event); the claims-pass and parity instruments (`completion-criteria-parity` D-2, `verify-signing-chain --audit`, the named-guard registry); the components calibration instrument (the *matcher* it turned is listed above, #390); the 16.0.0 publish verification and claims passes (#384, #385, #395); Spec 128, 129, 130 and 113 records; the 16.1.0 walk (#468, #469, the floor-batch fixes listed above, and the addendum #487); the trio records (#474); the release files grant (#485); and the token-selection-order ballot's ratification record (#480).
