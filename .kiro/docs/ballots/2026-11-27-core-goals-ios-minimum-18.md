# Ballot Measure: Core Goals raises the iOS minimum to 18.0, before Spec 132's first support claim

**Date**: 2026-11-27 (drafted from 2026-11-27T18:35:10Z, `date -u`)
**Drafted by**: Thurgood (Civitas steward; owner of `.kiro/steering/core-goals.md` and profile author of its operative set). Direction: Peter, received 2026-11-27T18:32:45Z (the orchestrator's clock, at receipt), verbatim: **"(B), raise to iOS 18"**, on Spec 132's P-6. He was asked: "(A) keep iOS 17.0, test on current, with your one manual iOS 17 download at the claim; or (B) raise the minimum to iOS 18 before the first claim (a Core Goals ballot), with free CI testing 18 every release, `generate` restoring the floor if lowered, and docs stating what's tested". The basis was Kenya's `consults-2026-11-27/answers/kenya-ios-test-on-current.md` (`[KENYA R4]`) and Leonardo's `answers/leonardo-ios-minimum.md` (`[LEONARDO R4]`).
**Status**: **DRAFT**, not ratified. No edit site below is applied. A merge of this file while this line reads DRAFT records the measure and ratifies nothing. Only Peter's dated words in this Status line ratify it. His 18:32:45Z words direct the draft; they are not ratified text.
**A fact Peter's ruling did not have, stated first** (§ 1): an 18.0 floor drops **no iPhone**, but it drops **three iPads** that run iPadOS 17 and cannot run 18. Leonardo's "probably shuts out no device" was marked UNVERIFIED, and Peter ruled after reading it. The orchestrator put the corrected fact to him: "Does (B), raising to iOS 18, still stand, knowing it drops those three older iPads (iPad 6th gen, iPad Pro 10.5-inch, iPad Pro 12.9-inch 2nd gen)?" **Peter, received 2026-11-27T18:36:18Z (the orchestrator's clock, at receipt), verbatim: "Yes, (B) still stands, raise to iOS 18".** Both of his answers direct this draft; neither ratifies its text.
**Owner**: Thurgood (site 1, Core Goals; site 3 as profile author). Site 2 is Kenya's charter line, in his text. Site 4 is Kenya's lane.
**Required reviewer**: **Stacy**. She is the C1 confirmer and signer of Core Goals' `#core-project-context`, and the census reader.
**Consulted seats** (question files for the orchestrator, § 9): **Kenya** (the iOS fact, his charter line, his signed unit, his lane's `deploymentTarget`), **Ada** (`generate` restoring the floor; `ConfigHelpers`' iOS defaults), **Leonardo** (the adopter-facing sentences), **Data** (Android parity in shared harness code and wording). **Peter** ratifies: Core Goals is identity law.
**Class**: LAW for site 1. iOS code and agents must meet a minimum higher than the one Core Goals requires today. Sites 2–4 are EXECUTION of this ballot.
**Amends**: `.kiro/steering/core-goals.md` L28, one line (site 1). Follow-on, at application: `canonical/agents/kenya.md` L472 (site 2); the operative-set items, overlays and one dispositions removal (site 3); `harness/pins.yaml`'s `ios.deploymentTarget` and its comments, with `harness/ios/lane.ts` L158's comment (site 4); the Integration Guide's two iOS compile lines, with INSTALL derived from it (site 5). Spec 132's units carry the rest (§ 6).
**Cap**: one law line, one charter line, the profile lines, one pin, two guide lines. **Retroactivity**: none. No shipped iOS build declares a deployment target to adopters today: there is no generated `Package.swift` yet (VERIFIED, `git ls-files | grep -i Package.swift` prints nothing outside `node_modules`), and the harness's `17.0` is a compile pin.
**Base**: `main` at `e03d3ae3f`. Every before-text below is quoted from that tree.

> **Conflict of interest, stated first.** I own Core Goals, I wrote the Android precedent this follows, and I author the profile lines whose seat acts it creates. Kenya's, Ada's, Leonardo's and Data's reads, Stacy's review and Peter's ratification are the checks.

---

## 1. What was ruled, and the device fact

**Ruled** (Peter, 2026-11-27T18:32:45Z): "(B), raise to iOS 18". (B), as put to him, has four parts: the Core Goals raise, before the first support claim; free CI testing on iOS 18 every release; `generate` restoring the floor if an adopter lowers it; and docs stating what is tested. **This ballot carries the first part as law and names the other three as Spec 132's owed acts** (§ 6), filed as a record under README rule 10.

**The device fact** (Kenya, from Xcode 27.2's bundled simulator device data, 2026-11-27, via the orchestrator; Apple's simulator data, not a hardware list):
- **No iPhone is dropped.** The iPhone XS, XS Max and XR, the oldest iPhones that run iOS 17, are listed up to 18.99.
- **Three iPads are dropped**: iPad (6th generation), iPad Pro (10.5-inch) and iPad Pro (12.9-inch, 2nd generation) are listed up to 17.99. They run iPadOS 17 and cannot run 18.
- So the ballot does not say "every iOS 17 device runs 18". An adopter whose app supports those iPads cannot adopt DesignerPunk's iOS components at an 18.0 floor.

**Why 18, from the consults** (Kenya R4, Leonardo R4):
- 18 is the oldest iOS that a free CI image carries (`macos-15`: simulators 18.5, 18.6, 26.0–26.2), so it is the oldest floor DesignerPunk can test reproducibly without an Apple ID.
- No code needs an iOS 18 API: zero availability errors at 17.0 (Kenya, VERIFIED at 129). The raise buys evidence, not features.
- Before the first support claim, raising costs no adopter anything; after it, it is a breaking change.
- **Leonardo's caution, carried**: the floor is a **product choice**, tested on the oldest free runtime available. It does not follow GitHub's image schedule. When the free images stop carrying 18, the gap is stated in the text; the floor does not rise to 26 by the same argument (§ 6, item D).

## 2. Site 1: `.kiro/steering/core-goals.md` L28 (LAW)

**Before** (L28 at `e03d3ae3f`):
> - iOS: 17.0+

**After** (one line, same line number; `<ratification date>` filled by the Status commit, here and in site 3c's removal):
> - iOS: 18.0+ *(Amended <ratification date> by ballot 2026-11-27-core-goals-ios-minimum-18, item 1; prior text at `e03d3ae3f`.)*

- The pointer follows L29's form, the Android precedent.
- The line carries no clause. Leonardo's two sentences (support boundary; product choice) go where an adopter and a lane owner meet them (sites 4 and 5, and § 6), not into identity law, following F-1 (iii) of the Android ballot, which dropped a clause from the same block.
- **Unchanged**: L27, L29 and L30.

## 3. Site 2: `canonical/agents/kenya.md` L472 (EXECUTION of this ballot)

**Before** (L472 at `e03d3ae3f`, in § "iOS-Specific Guidance", Kenya's signed unit `#ios-specific-guidance`):
> - iOS 17.0+ minimum (per Core Goals)

**After** (proposed on the Android precedent, Data's pointer form; **Kenya's text is final**, at his read, § 9):
> - iOS minimum version per Core Goals

- The number then lives in Core Goals alone, so a later change is one law line and one signed unit, not two.
- EXECUTION, not CORRECTION: the referent (site 1) changes in the same PR, and the README's test says same-PR governance text never counts as a referent (the Android ballot § 3).
- Charters carry no dated pointer; the commit names this ballot.

## 4. Site 3: the profile lines (EXECUTION; the profile author's, with seat acts)

- **3a** `canonical/operative-sets/core-goals.yaml` item `principle-6` (L39–L42): `kind: obligation` (unchanged); label and text become `iOS: 18.0+` (the new line without the pointer, a verbatim substring of the unit).
- **3b** `canonical/operative-sets/kenya.yaml` item `native-7` (L604–L606): label and text become `iOS minimum version per Core Goals`, or Kenya's final text; **kind `obligation`**, as Data re-ruled his `native-7` (it binds Kenya to a number he can contradict by setting or accepting a lower target). Kenya rules the kind at his confirm act.
- **3c** the consumer rendering:
  - `canonical/profiles/consumer/always-set/core-goals.overlay.md` L14 becomes `- iOS: 18.0+`, and its unit pin re-grounds;
  - the `#core-project-context` row in `always-set/core-goals.dispositions.yaml` gains a removal: `{"text": " *(Amended <ratification date> by ballot 2026-11-27-core-goals-ios-minimum-18, item 1; prior text at `e03d3ae3f`.)*", "cites": "subtraction-2"}` (leading space included), beside the Android pointer's removal;
  - `canonical/profiles/consumer/kenya.overlay.md` L119 takes Kenya's final line, and its pin re-grounds.
- **Seat acts** (the Android precedent's § 5 boundary: the authoring commit never moves a `canonicalHash`):
  - **Stacy** re-confirms (C16) `#core-project-context` in `confirmations/core-goals.md`, appending a dated record above the existing ones, and re-signs (C1) in `signatures/core-goals.md`, after checking the consumer rendering (the removal's text must match the rendered pointer byte for byte).
  - **Kenya** re-confirms (C16) `#ios-specific-guidance` in `confirmations/kenya.md` and re-signs (C1) in `signatures/kenya.md`. The row's one removal ("the stale `dist/*.ios.swift` snapshots") quotes text outside the hunk and stands.
- **Generated**: `.claude/agents/kenya.md`, `.kiro/agents/kenya-prompt.md`, `canonical/_consumer-output/**`, `canonical/generated.lock`, by regeneration.

## 5. Sites 4 and 5: the compile pin and the served compile lines (EXECUTION; at application)

**Site 4, `harness/pins.yaml` (Kenya's `ios:` section) and `harness/ios/lane.ts` L158 (his lane).** Spec 129 Requirement 2.9 makes `ios.deploymentTarget` **equal** Core Goals' iOS minimum ("The deployment target is the one pin that equals Core Goals' iOS minimum", `pins.yaml` L53). So it moves with site 1, in the application PR, as Kenya's commit:
- L55 `deploymentTarget: "17.0"` → `"18.0"`;
- the comments at L34–L36 ("equals Core Goals' iOS minimum (17.0)"; "'Built for iOS 17.0, not run on 17' is the wording rule until something runs on iOS 17") take Kenya's text for 18.0, and **Leonardo's sentence**, in Kenya's words: the minimum is a product choice, tested on the oldest free runtime available, and it does not follow the runner images' schedule;
- `lane.ts` L158's comment (`` `arm64-apple-ios17.0-simulator` ``) becomes the 18.0 triple.
- **Evidence owed with it**: the iOS harness contexts run at the application head with the new target. They are not required contexts (only `harness-android-tokens` is promoted, `verify-gate-registration.sh` L95), so a red stops the application by this ballot's rule, not the gate's.

**Site 5, the served compile lines.** `governance/DesignerPunk-Integration-Guide.md` L179 and L197 say the checks compile "for an iOS 17.0 deployment target; not run on any device or simulator". They describe the harness and become false when site 4 lands, so they change in the same PR, to "18.0", in the wording Kenya and Leonardo agree (§ 9). `docs/consumer/INSTALL.md` L165 and L183 are derived from the guide by `scripts/derive-install-doc.ts` and are regenerated, not hand-edited. The guide's owner for this passage is the Task 18 author (Thurgood), with Kenya consulted.

## 6. What this ballot does not settle: Spec 132's owed acts, and other sites

**Owed by Spec 132's units** (Peter's (B), parts 2–4; filed under README rule 10 in this PR as `.kiro/issues/2026-11-27-ios-18-floor-132-owed-acts.md`, Trigger `path:.kiro/specs/132-native-components-in-app/requirements.md`, so 132's requirements gate takes them in):
- **A. Free CI testing on iOS 18 every release** (Kenya): a release-time run on the oldest 18.x runtime `macos-15` carries, under an issue-row grant for its workflow. Whether Xcode 26.3 on that image runs the 18.x runtimes is UNVERIFIED (Kenya R4).
- **B. `generate` restores the floor** (Ada's call): the generated `Package.swift` (Model B; it does not exist yet) declares `platforms: [.iOS(.v18)]`, and `generate` rewrites a lowered value on its next run, so a local edit does not quietly persist (Leonardo R4 § 1). Ada is consulted on whether this is a `generate` rule or a warning (§ 9).
- **C. Docs state what is tested** (132's docs units): "iOS 18.0+; tested on iOS 18.x and <lane runtime>", with the runtime read from the lane's printed toolchain; **Leonardo's support-boundary sentence**: "lowering the minimum in the generated `Package.swift` compiles but is unsupported"; the walkthrough's "You'll need" and "If not" lines (Leonardo R4 § 3). The minimum lives in one generated value that `Package.swift`, D4's target, the guide, INSTALL and the walkthrough all read.
- **D. When free images stop carrying 18**: the text states the gap ("built for 18; tested on <runtime>"); the floor does not rise on the images' schedule (Leonardo's counter, folded). That is a rule for 132's docs, recorded as an item of the same record.

**Other sites that carry the iOS 17 floor today, and what happens to each** (census: `git grep -n -E "iOS 17|iOS:? ?17\.0|\.v17|17\.0\+|ios17|deploymentTarget" -- . ':!.kiro/specs' ':!.kiro/issues/archive'` at `e03d3ae3f`, plus `.kiro/specs/132-*` separately; generated roots and frozen fixtures read apart):

| Site | Carries | When / who |
|---|---|---|
| `.kiro/steering/core-goals.md` L28 | the floor | site 1, at application |
| `canonical/agents/kenya.md` L472; `operative-sets/kenya.yaml` L605–L606; `profiles/consumer/kenya.overlay.md` L119 | "iOS 17.0+ minimum (per Core Goals)" | sites 2, 3b, 3c, at application |
| `operative-sets/core-goals.yaml` L41–L42; `always-set/core-goals.overlay.md` L14 | "iOS: 17.0+" | sites 3a, 3c, at application |
| `harness/pins.yaml` L34–L36, L53, L55; `harness/ios/lane.ts` L158 | the compile target and its wording rule | site 4, at application (Kenya) |
| `governance/DesignerPunk-Integration-Guide.md` L179, L197; `docs/consumer/INSTALL.md` L165, L183 | "compiled for an iOS 17.0 deployment target" | site 5, at application (INSTALL regenerated) |
| `src/build/workflow/ConfigHelpers.ts` L436, L578, L614, L690, L721 (`minimumDeploymentTarget: '17.0'`) | code defaults | **not touched here**: Ada's call, as the Android precedent left `ConfigHelpers`' Android defaults (§ 9 question to Ada); an application PR that changed them would change enforcement in the same PR as its referent |
| `src/cli/templates/product/overview.yaml` L13 (`minimumVersions: ios: TODO`) | a consumer's own product minimum | **unchanged**: the adopter's field, not DesignerPunk's floor |
| `.kiro/specs/132-native-components-in-app/design-outline.md` L32, L48, L52 | "iOS 17.0 stays … asked again at Spec 132"; the iOS 17 runtime probe | **132's formalizer**, at 132's requirements round (the record above names them) |
| `.kiro/issues/2026-09-26-native-component-distribution.md` L164–L171 (the iOS 17 runtime probe, "standing until something runs on iOS 17, or item 1's answer moves the floor") | an owed probe | **its owners (Kenya, Data)** append a dated line in the application window: the floor moved, so the iOS 17 probe is superseded by item A |
| `.kiro/issues/2026-10-18-drawn-control-drift-ios-android-web.md` L36 ("Our floor is 17") | a statement of the floor | **its owner** appends a dated line; the trait question it serves is unchanged |
| `CHANGELOG.md` L54; `docs/releases/release-16.3.0.md` L32 | what shipped then | **unchanged**: release history |
| `governance/Component-Family-Navigation.md` L252; `governance/Token-Family-Motion.md` L80; `src/components/core/Nav-SegmentedChoice-Base/README.md` L308; `docs/releases/RELEASE-NOTES-10.0.0.md` L79 ("iOS 17+" on an API) | API availability, not the floor | **unchanged**: true at any floor ≥ 17 |
| `.kiro/issues/2026-11-27-*` typecheck commands with `-target …ios17.0` | recorded runs | **unchanged**: evidence of what was run |
| `scripts/harness/__tests__/fixtures/parse-swift/*.txt` headers (`-target arm64-apple-ios17…`) | recorded fixture provenance | **unchanged**: frozen fixtures |
| `canonical/profiles/consumer/confirmations/kenya.md` L300; `confirmations/core-goals.md` L45 | ledgers | **unchanged**; the seat acts add records above them |
| ballots (`2026-10-02-integration-guide-native-scoping`, `2026-11-05-core-goals-android-minimum`, `2026-11-07-native-lane-ownership`, others) | history | **unchanged** |
| `.claude/agents/kenya.md`, `.kiro/agents/kenya-prompt.md`, `canonical/_consumer-output/**` | generated | regeneration |
| `tests/onboarding-trio/fixtures/born-{cc,kiro}/**` | frozen install-time copies | **unchanged** (the Android precedent § 6: the protocol compares against them on purpose) |

At application the sweep is re-run on the changed tree. Any hit outside this table stops the PR.

## 7. Census (README § "Conventions", "Instrument census")

The Android precedent's four lines apply, re-read for this edit:
- `**Census**: not in scope — check-section-citations (scripts/check-section-citations.ts) — the item removes and adds no get_section or get_document_* citation; the line carries a dated pointer`
- `**Census**: not in scope — 122-diff-guard with the operative-set freshness sweep — no instrument code change; between the authoring commit and the seat acts the sweep reports core-goals #core-project-context and kenya #ios-specific-guidance stale, which are § 4's owed acts, not a change of the instrument's verdict`
- `**Census**: not in scope — verify-signing-chain --ci (row signing-act-consistency) — no instrument code change; the seat acts are its inputs at application, checked by links 1–3`
- `**Census**: not in scope — the register rows citing core-goals.md lines (no-autonomous-token-creation, :55-59; no-hardcoded-color, :50/:53) — the edit is on L28 and adds no line`
- `**Census**: not in scope — governance-examples (scripts/governance-examples/check.ts) — Core Goals is in its scope; the new line names no token and no CSS attribute; site 5's guide lines change a number only`
- **The iOS harness contexts** read `harness/pins.yaml`. They are not registered checks (not promoted; no register row names them), so no census line is owed. Their run at the application head is evidence site 4 requires (§ 5).

## 8. Application (on ratification; one PR, Peter-merged)

1. Status commit (record-first), with `<ratification date>` filled.
2. Thurgood's authoring commit: site 1; site 2 byte for byte from Kenya's text; sites 3a–3c. No `canonicalHash` moves.
3. Kenya's commit: site 4, under his standing scope.
4. Thurgood's commit: site 5's guide lines; INSTALL regenerated.
5. Seat acts, each in its seat: Stacy re-confirm and re-sign; Kenya re-confirm and re-sign.
6. Regeneration and the lock (its place in the lock queue named in the brief).
7. The iOS harness contexts at the head; `122-diff-guard` green; `verify-signing-chain --audit --pr`; `edit-kind-pointers`; the § 6 sweep; `rebuild_index` after merge.
- **Grants**: Thurgood's profile acts, the Kenya charter line and the guide edit are outside his standing scope; Peter's ratification names these files, or a grant record does before the application PR: `.kiro/steering/core-goals.md`; `canonical/agents/kenya.md` L472 byte for byte from Kenya's text; `canonical/operative-sets/{core-goals,kenya}.yaml`; `canonical/profiles/consumer/always-set/core-goals.{dispositions.yaml,overlay.md}`; `canonical/profiles/consumer/kenya.overlay.md`; `governance/DesignerPunk-Integration-Guide.md` L179 and L197; `docs/consumer/INSTALL.md` (regenerated); `canonical/generated.lock` and the generated roots.
- **When**: before Spec 132's first support claim. Nothing ships an iOS target to adopters before then.

## 9. Who is asked what (question files; opened after Peter's 18:36:18Z confirmation)

| Seat | Questions |
|---|---|
| **Kenya** | (1) Your final text for site 2 (L472) and the kind of `native-7`. (2) Site 4's comment text at L34–L36, with Leonardo's product-choice sentence in your words. (3) Does an 18.0 target change any harness verdict (expected lists, deprecation warnings) you can foresee? (4) Site 5's guide wording for the two compile lines. (5) Confirm the device fact as stated in § 1. |
| **Ada** | (1) Item B: should `generate` rewrite a lowered `platforms: [.iOS(...)]` on its next run, warn, or refuse? (2) `ConfigHelpers.ts`' five `'17.0'` defaults: change them with 132's units, now, or leave them as code defaults outside the floor? |
| **Leonardo** | (1) Site 5's two guide lines and item C's sentences: do they say the floor is a support boundary, not a capability limit, where an adopter meets it? (2) The three dropped iPads: does the adopter text need to name them? |
| **Data** | (1) Does anything shared between the lanes (`scripts/harness/consumer.ts`, `pins.yaml` top level, the wording rule) need a matching Android change? (2) Is Leonardo's "product choice, not the images' schedule" sentence one the Android pins comment should carry too? |
| **Stacy** (required) | (1) The seat-act sequence in § 4 and § 8, against your confirm act. (2) The census lines. (3) The § 6 sweep and its dispositions. (4) Whether the rule-10 record is the right home for Peter's (B) parts 2–4. |

## 10. Counter-argument (fold-back applied), residual

**Recommendation**: site 1 as drafted, sites 2–5 at application, items A–D owed by 132.

**Counter-arguments**:
- **(i) The ruling rested on an unverified device claim.** Three iPads are dropped.
- **(ii) (B)'s benefit is temporary.** When `macos-15` retires, the oldest free runtime is 26.x, and the gap reopens (Leonardo).
- **(iii) The pin, the guide and the charter move together, in one PR, with two seats' acts and a harness run.**

**Folded in**:
- From (i): the fact is stated first, and the consults wait for Peter's confirmation.
- From (ii): item D writes the rule that the floor does not follow the images, and the text states the gap when it comes.
- From (iii): sites 4 and 5 are required by Requirement 2.9 and by the guide's truth; splitting them would leave Core Goals and the pin disagreeing.

**What survives**:
1. Teams whose apps support the three iPads are shut out until DesignerPunk lowers the floor again.
2. The CI-on-18 benefit lasts about as long as `macos-15` does.
3. Until item A lands, the text reads "built for iOS 18.0, not run on 18", which is (A)'s gap at a higher number.

## 11. Review record

*(Empty at draft.)*
