# Issue: native component distribution — SPM source package (iOS) + Gradle source module (Android)

**Date**: 2026-09-26
**Status**: CHARTERED — not scheduled. No build work is authorized by this charter; it is evaluated at the trigger below. *(Updated 2026-11-05, Kenya and Data: this charter is now the home of an approved goal, § "Goal (Peter, 2026-11-05)" below, until the merge of Spec 132's seeded outline (plan-r2 § 6 item 8): the first merge at which `.kiro/specs/132-*/design-outline.md` no longer reads `**Status**: **PLACEHOLDER.**`. It still authorizes no build work itself: the build lives in Specs 129 and 132.)* *(Reworded 2026-11-07, Kenya and Data, rule 9; Kenya, confirmed 2026-11-07; Data, confirmed 2026-11-07. **Reason**: Peter, received 2026-11-07T17:46Z: "Let's capture 132 with what we have so far. I don't want to risk losing it." That placeholder, `.kiro/specs/132-native-components-in-app/design-outline.md` (renamed from `132-native-adopter` on Peter's answer, received 2026-11-07T17:59:15Z: "Re: 3, Rename"; path corrected 2026-11-07, Kenya, rule 9), is a design outline that exists, merges and names this record, so it met the earlier wording literally; the goal stays here until the seeded outline. Was: "until Spec 132's design outline exists".)*
**Type**: CHARTER (Kenya/Data's shared follow-up from Spec 123 Task 3.5's KEEP-WITH-FOLLOW-UP verdicts)
**Owners**: **Kenya (iOS) and Data (Android) — design the distribution shape.** **Lina — owns the component content** (the theme-binding inversion and any component-side changes the shape requires touch her write scope). **Ada — owns the theme-conformance generator change** (the fixed protocol / generic-over-theme option named below is a generator-side decision).
**Class**: P2 obligation (record) · charter *(re-classed 2026-11-05, Kenya, rule 12, owner act; Data co-owns and agrees: `.kiro/specs/129-consumer-generation-completeness/evidence/2026-11-05-native-plan/data-plan-r2.md` answer to [STACY PLAN R1], and `kenya-plan-r2.md` answer to [STACY PLAN R1], item 1. Reason: Peter approved the native plan on 2026-11-05 (this record is the goal's home until Spec 132's outline exists), and INSTALL will point readers at this record for their iOS and Android timeline, so the record is now an obligation to those readers and no longer an unscheduled improvement; a P3 can also lapse at every release's S without reaching Peter. Sub-tag: `(record)`, by Thurgood's answer in `plan-r2.md` § 5 ([KENYA PLAN R2] item): under rule 11 a P2 `(record)` returns to Peter at its second lapse, which is proportionate; `(guard)` does not fit because no instrument is over-claimed. Rule 12's gloss for `(record)` ("no reader is misled") no longer describes this record once INSTALL points at it; that mismatch goes to Spec 131's requirements round as a candidate rewording of rule 12 and is not resolved here. Not P1: 16.2.0 tells readers plainly not to start a native product. Was, verbatim: P3 improvement · charter *(set 2026-10-20, Kenya, rule 12. A chartered, unscheduled distribution mechanism (SPM source package, Gradle source module); the reference-source labelling in the shipped package is honest in the meantime and no reader is misled, so not P2. Kind charter: no build authorized, evaluated at the trigger. Data co-owns this record and may re-class.)*)*
**Trigger**: `merge:#880` — the event that owes the close is the merge of PR #880 (`spec/132-design-outline`), Spec 132's **seeded** design outline (plan-r2 § 6 item 8), which replaces the placeholder's `**Status**: **PLACEHOLDER.**` line and names this record. That merge carries out Peter's spec answer (rule 11). The close is in #880's own diff: Kenya and Data commit the rule-5 outcome line and the `git mv` to `archive/` on #880's branch, so an ancestor of the merge commit closes the record. If #880 is closed without merging, the owners re-rule this line. Obligation (1), the render-probe result, is still owed here by Kenya and Data, and is not a condition of the close; obligation (3), the ask for the outline round, is answered (§ "Peter's answer (2026-11-27)"). *(Re-tokened 2026-11-27T17:07:02Z, Data, rule 9; Kenya co-owner, her co-signature owed on this branch. **Reason**: the step the previous wording named, "When the outline's PR opens, its owners re-token this line to `merge:#<N>`": the outline's PR is #880, open as a draft (`gh pr view 880`, 2026-11-27T17:07:02Z). README rule 1: a P2 that would ride another change takes `merge:#<N>` once the vehicle PR exists. **Authority**: Peter's answer, received 2026-11-27T16:44:48Z, verbatim: "Spec with (a), and start 132's outline round now"; README rules 1, 9 and 11. **Was**: `release:next:phase-1`, with the same close event, set 2026-11-27 by Data (`3f73486e9`) and co-signed by Kenya (`81f3fc29f`); the line's full prior text is L8 at `1e81dfeb8`. **Co-signed**: Kenya, 2026-11-27T17:08:15Z (`date -u`), on this branch: I agree with `merge:#880`, the close in #880's own diff, and the re-rule if #880 closes unmerged.)*
**Source**: Spec 123 Task 3.5 (`.kiro/specs/123-consumer-distribution/tasks.md` § "Task 3"), decided from Kenya R1/R2 and Data R1/R2 in `.kiro/specs/123-consumer-distribution/feedback/tasks.md`.

## Why this issue exists

Spec 123 Task 3 decided to KEEP the `.swift` and `.kt` native component trees in the shipped package (as the whole platform closures — component sources incl. Preview files, the platform-native blend helpers, and the platform token files — never a bare `*.swift`/`*.kt` glob), labelled honestly as **reference source, not a build input**. Neither tree compiles against a born consumer repo's own token tier as shipped today. This issue charters the real distribution mechanism that would change that; it is **not scheduled**, only evaluated at the trigger above.

**Related, separate, and already filed**: the theme-name hardcoding defect (`LocalDPTheme`/`@Environment(\.dpTheme)`/`any DesignerPunkTheme`, all derived from OUR OWN `name`/`abbreviation` rather than the consumer's) and the `ContainerCardBase.ios.swift:816` unterminated-comment parse defect are filed at **`.kiro/issues/2026-09-26-native-component-theme-hardcoding.md`**. That issue's fix is a **precondition** for either distribution shape below — a compiled artifact still binds a name (`LocalDPTheme`) or protocol (`DesignerPunkTheme`) that only exists in OUR OWN repo's generated tokens, never a consumer's own generated theme.

## The two shapes (per-platform, both Model-B-consistent)

**iOS — SPM source package** (Kenya R1, `.kiro/specs/123-consumer-distribution/feedback/tasks.md` § "[KENYA R1]"):
- `Package.swift` + a `Sources/<Target>/` layout assembled from the per-component directories, including the blend helper.
- **A theme-binding inversion is the hard part**: an SPM library cannot see the consumer app target's generated `DesignTokens`/`{Name}Theme`. **[SUPERSEDED 2026-11-05, Kenya, by the root-manifest measurement: a generated root `Package.swift` compiles the adopter's generated tokens and the packaged components in ONE module from `node_modules`, so the library does see the tokens (Kenya R3, `.kiro/specs/129-consumer-generation-completeness/feedback/design-outline.md` § "[KENYA R3]", VERIFIED; `kenya-plan-r1.md` § 5; `kenya-plan-r2.md`, Leonardo item, `BUILD SUCCEEDED` on a toy adopter app). The old text stays as the record. The theme-name half is NOT superseded: the components still hard-code `dpTheme` (Spec 129 Q12).]** Either (a) the package owns a fixed protocol that the consumer's `generate` emits a conformance to (**a generator change — Ada's seat**), or (b) the components are made generic over the theme.
- An access-control pass (only 19 of 39 production files currently declare `public` types).
- A distribution-channel decision: SPM resolves from a git URL or tag, not from npm — a `Package.swift` at the repo root or a separate repo. **[SUPERSEDED 2026-11-05, Kenya, by the same root-manifest measurement: the generated `Package.swift` sits at the adopter's repo root and the components resolve from `node_modules` (an npm dependency, updated by `npm update`), not from a git URL; an app in `ios/` adds the root as a local package, `.package(path: "../..")`. VERIFIED on a toy (`kenya-plan-r2.md`). Old text kept as the record.]**
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

**Walk 2026-10-20 (Thurgood, walk line under rule 9; ledger `archive/TRIAGE-2026-10-20.md` row 26, call BACK-FILL (Kenya/Data))**: this record lacks the rule-1 Trigger token (`**Trigger**: ` followed by one of `tag:v<semver>`, `merge:#<N>`, `path:<glob>`, `release:<ver>:phase-1` or `manual`) and the rule-12 `**Class**:` header. That is a walk finding. The owner writes both (rule 9); the steward writes neither. Steward's proposal, which the owner may override: Proposed `manual` · `P3 improvement · charter`.

## Lapse (2026-11-05)

Firing commit `d7385b4c297cefdaa94fafa8d184cf34d0d157f8` (`d7385b4c2`, #433, merged 2026-10-21: the harness charter's evaluation entry of 2026-10-20). This record's `manual` Trigger named "any evaluation of the harness charter (`.kiro/issues/2026-09-17-platform-build-verification-harness-candidate.md`)", and that entry was such an evaluation. No ancestor of `d7385b4c2` evaluated this charter or re-ruled it (its Trigger line was unchanged, rule 11); Kenya set the Trigger on 2026-10-20 and wrote the evaluation entry without evaluating this record after it (`kenya-plan-r1.md` § 5, "The lapsed trigger: confirmed"; Stacy and Data verified the same from git history). The heading goes in before the re-ruling in this file's header so the re-rule does not hide it. It records the lapse; the disposition is the re-class and re-rule in the header. Signed Kenya (owner, rule 11), 2026-11-05.

## Goal (Peter, 2026-11-05)

This record is the goal's home until the merge of Spec 132's seeded outline (plan-r2 § 6 item 8): the first merge at which `.kiro/specs/132-*/design-outline.md` no longer reads `**Status**: **PLACEHOLDER.**`. *(Reworded 2026-11-07, Kenya and Data, rule 9; Kenya, confirmed 2026-11-07; Data, confirmed 2026-11-07. **Reason**: Peter, received 2026-11-07T17:46Z: "Let's capture 132 with what we have so far. I don't want to risk losing it." That placeholder, `.kiro/specs/132-native-components-in-app/design-outline.md` (renamed from `132-native-adopter` on Peter's answer, received 2026-11-07T17:59:15Z: "Re: 3, Rename"; path corrected 2026-11-07, Kenya, rule 9), is a design outline that exists, merges and names this record, so it met the earlier wording literally; the goal stays here until the seeded outline. Was: "until Spec 132's design outline exists".)* The full record of Peter's words, with the context he had read, is `.kiro/specs/129-consumer-generation-completeness/evidence/2026-11-05-native-plan/peter-2026-11-05.md`. The plan and its definition of done are `plan-r2.md` in the same folder (commit `b89163c41`).

**Peter's words, verbatim, with the times they were received** (typo corrected in reading only: "will successful render" means "will successfully render"):

- 2026-11-05 (before 03:09:41Z): "I envisioned adopters building tokens and components within the DesignerPunk ecosystem, and leveraging them in their project."
- 2026-11-05T03:09:41Z: "Re: 2, I was envisioning (a)" (components as a package dependency); "they can use our existing ones and use DesignerPunk to build more as they require."; "That the components are functional, and will successful render, in the app as described."
- 2026-11-05T04:05:02Z: "Licence accepted; keep 129 first".
- 2026-11-05T04:06:22Z: "Let's go (x′)".
- 2026-11-05T04:07:43Z: "A yes, B (a), C yes; (x′) as defined". A = approve the two-spec plan as a whole (Spec 129 and a new Spec 132, under one goal); C = D1–D3 are 129's part of done.

**Spec 132's acceptance sentence** is Peter's original sentence, word for word, moved here from Spec 129: "A stranger's `init` → `generate` yields a compiling, themed target on all three platforms with nothing copied from `node_modules`."

**The definition of done** is `plan-r2.md` § 1 "The definition of done", rows D1–D10, at commit `b89163c41`. It is cited, not copied, so there is one table to keep true. **D1–D3 are approved as Spec 129's part of done** (Peter: "C yes"). **D4–D10 are decided at Spec 132's design-outline gate**, not here.

**The order is (x′)**, as Peter defined it in `plan-r2.md` § 7 item 3: Spec 129; then Spec 132's first family; then Peter re-places the remaining families against Spec 131, using that family's measured cost; then Spec 131; then Specs 128 and 130. (Keep 129 first: 2026-11-05T04:05:02Z.)

## Access-pass list (appended 2026-11-05, Kenya)

VERIFIED by grep over the 16.2.0 package; sources `kenya-plan-r1.md` finding A and the [STACY PLAN R1] answer in `kenya-plan-r2.md`.

The access-control pass in the iOS shape above is sized by this list of 20 main component views that an adopter's app cannot construct today, named so that D4 (an adopter's own app builds and links, with plain `import`, no `@testable`) can be checked against it, and D3's "constructs all 34" fails on any view still missing. It supersedes the shape's count of "19 of 39 production files" as the unit of work: the unit is the view and its initialiser.

**The 17 views declared `internal`:**
`ButtonCTA`, `ButtonIcon`, `ContainerBase`, `ContainerCardBase`, `IconBase`, `InputCheckboxBase`, `InputCheckboxLegal`, `InputRadioBase`, `InputRadioSet`, `InputTextBase`, `InputTextEmail`, `InputTextPassword`, `InputTextPhoneNumber`, `NavHeaderApp`, `NavHeaderBase`, `NavHeaderPage`, `ProgressBarBase`.

**The 3 `public` views with no public initialiser:**
`VerticalListButtonItem`, `NavSegmentedChoiceBase`, `NavTabBarBase`.

Android has no twin of this list: all 34 main component composables are public (`data-plan-r2.md`, VERIFIED by grep). Signed Kenya, 2026-11-05.

**Superseded line (appended 2026-11-05, Data, record-only).**
- L30's parenthetical "Core Goals: Android is unconstrained today" is superseded by ballot `.kiro/docs/ballots/2026-11-05-core-goals-android-minimum.md` (RATIFIED, Peter, 2026-11-05, #673, F-1 (iii)). Core Goals now reads `- Android: API 26 (Android 8.0)+`, applied in #676.
- L30's "a `minSdk` decision" is therefore made: the minimum is API 26 (Peter, "Re: 5, 26", 2026-11-05T05:54:32Z). The shape still needs the rest of that list.
- L30 stays as written: it is the record of the 2026-09-26 shape.
- The same holds for the harness charter's dated 2026-10-20 evaluation entry (`.kiro/issues/2026-09-17-platform-build-verification-harness-candidate.md` L180): its "Core Goals says 'Android: Not yet constrained'" and its provisional host `minSdk = 24` are a ledger, kept inline. The harness pin is now 26 (Spec 129 `design.md` § 0 and § 2).

Signed Data, 2026-11-05.

## Lapse (2026-11-27)

Firing commit `4d10202b2b9d535401a1452643780656a5d0b694` (`4d10202b2`, #633, Release 16.2.0's S, merged 2026-11-04T01:29:29Z). This record lapsed at `d7385b4c2` (the heading above), and rule 11 says "A record still open after a lapse lapses again at each later release's S." No ancestor of `4d10202b2` closed or re-ruled it after `d7385b4c2`: the re-rule to `path:harness/**` is `c65bbeb86` (#653), merged after this S, and is not its ancestor (`git merge-base --is-ancestor c65bbeb86 4d10202b2` fails). The record was P3 then, so this lapse alone escalated nothing. The 2026-11-05 heading above was written after this S and did not name it. Appended by an owner at session start (rule 11; Start Up Tasks item 9). Signed Lina, 2026-11-27.

## Lapse (2026-11-27)

Firing commit `693b39b547bddc83466f4b185ca54601c3fc97d3` (`693b39b54`, #791, Spec 129's CLOSEOUT claims pass, merged 2026-11-08): the first commit to touch `.kiro/specs/129-consumer-generation-completeness/completion/claims-pass.md`, this record's `path:` token. That pass routed the owed act to Kenya and Data (its § "This file fires" table: "The switch to `release:next:phase-1` at 129's close (#684)"). None of the three at-close acts is in an ancestor of `693b39b54`: (1) no render-probe result is recorded here; (2) the Trigger still carries the CLOSEOUT token; (3) no ask to Peter for Spec 132's outline round is recorded. The Trigger line was last changed in `a953ac70d` (#723, 2026-11-07), an ancestor. I do not read that commit as a re-rule against this firing, for three reasons. Its token and event did not change. It only reworded obligation (2)'s close event, from "132's outline" to "the seeded outline". And the text it left standing says "If they do not, the charter takes one recorded first lapse at CLOSEOUT." Under the working B2 reading, the commit that set the token (`19c1dea43`, #684) is not a re-rule either. Whether a prose-only Trigger change counts as a re-rule is still open, in B2's ballot (Thurgood); if B2 rules that it does, this heading is wrong and the next one moves with it. Signed Lina, 2026-11-27.

## Lapse (2026-11-27)

Firing commit `6f507c039ed4140eee4578aa6b75d713a5d4ad9d` (`6f507c039`, #852, Release 16.3.0's S, merged 2026-11-10T01:00:01Z). The record was still open after its `693b39b54` lapse, and no commit on this file lies between `693b39b54` and `6f507c039` (`git log 693b39b54..6f507c039 -- <this file>` is empty). It is not rowed in the 16.3.0 walk record (`.kiro/issues/archive/2026-11-09-release-16.3.0-walk.md`), which rows `release:` and `tag:` tokens, so it missed the 16.3.0 escalation batch that Peter answered at 2026-11-12T13:29:02Z. Signed Lina, 2026-11-27.

## Escalation (2026-11-27, Lina, co-owner; the question for Peter, not yet put to him)

**Count**: four distinct SHAs in the Lapse headings: `d7385b4c2`, `4d10202b2`, `693b39b54` and `6f507c039`. The record is **P2 (record)**, and rule 11 sends it to Peter at its second lapse with exactly three options. By the total count it was owed to him at `693b39b54`. Counting only the lapses since it became P2 (`c65bbeb86`), it was owed at `6f507c039`. Either way it is owed now, and it missed the 16.3.0 batch.

**Why no owner act settles it instead.** I cannot close it: Spec 132's seeded outline has not merged (`.kiro/specs/132-native-components-in-app/design-outline.md` still reads `**Status**: **PLACEHOLDER.**` at `origin/main` `3a3bd072b`), and this record is the goal's home until it does. I should not re-rule it either. The Trigger line is Data's re-rule with Kenya agreeing, and its at-close acts (1)–(3) are theirs (rule 9: "a line signed by one seat is rewritten only by that seat"). In any case, an owner re-rule does not replace the escalation that rule 11 owes after a second lapse.

**The question** (rule 11: spec, drop or fix-now):
- **Spec: recommended, Spec 132.** This is the vehicle Peter already chose for this goal: "A yes, B (a), C yes; (x′) as defined", 2026-11-05T04:07:43Z, and the order "Let's go (x′)", 2026-11-05T04:06:22Z. The answer is carried out when the **seeded** outline (plan-r2 § 6 item 8) merges and names this record, not the 2026-11-07 placeholder. The placeholder holds "no requirements, no design and no scope decision", and this record's Goal section already reads its close that way. From that merge, Kenya and Data re-rule the Trigger to the event that owes the close, and the record closes under rule 5. *Counter that survives*: the placeholder is a merged design outline that names this record, so under rule 11's letter a spec answer would be carried out at once. The recommendation therefore asks Peter to rule the seeded outline as the carrying event. Until it merges, each later lapse returns the record to him with this answer quoted.
- **Fix-now**: not fit. Both distribution shapes are spec-scale ("Cost class: spec-scale, medium-large"; "medium, days to about a week"), and nothing could land by 16.4.0's S.
- **Drop**: not recommended. It removes the home of Peter's 2026-11-05 goal and the D1–D10 citation before Spec 132's outline holds them.

**Still owed, separately** (Kenya and Data, this record's Trigger obligations): (1) the render-probe result recorded here; (3) the ask to Peter for his go on Spec 132's outline round, which is his under the sequential gates. The orchestrator should consult Kenya and Data on the recommendation above before it goes to Peter, since the Trigger line is theirs.

*Signed: Lina, 2026-11-27.*

## Peter's answer (2026-11-27)

**Received**: 2026-11-27T16:44:48Z (the orchestrator's receipt time, relayed to Lina). Peter, verbatim: "Spec with (a), and start 132's outline round now".

**What he was asked** (the orchestrator's two questions, from § "Escalation (2026-11-27 …)" above):
- **Question 1**: "Spec, drop or fix-now? If spec, (a) or (b)?"
  - (a): the merge of Spec 132's **seeded** outline carries out the answer, so further lapses come back to Peter until then.
  - (b): the 2026-11-07 placeholder already carried it out.
- **Question 2**: "Start 132's outline round now, or after 16.4.0?"

**What was ruled**:
- **Spec, Spec 132, with (a).** Rule 11's spec answer is carried out when Spec 132's seeded outline merges and names this record, not at the placeholder. Until that merge, each later lapse returns this record to Peter with this answer quoted (rule 11).
- **Spec 132's outline round starts now.** This also answers this record's Trigger obligation (3), the ask to Peter for his go on the round.

**Still owed, and not edited here**:
- the Trigger line, which Data rewrites next on this branch, with Kenya co-signing;
- obligation (1), the render-probe result (Kenya and Data).

*Recorded by Lina, 2026-11-27.*

## Reading of the Lapse headings under B2 F-2 (A) (2026-11-27, Lina; pending B2's ratification)

Peter picked B2 F-2 = (A) at 2026-11-27T16:38:05Z ("Let's go A"): a prose-only Trigger-line change that carries a dated reason and authority is a re-rule (ballot `.kiro/docs/ballots/2026-11-27-rule-11-lapse-window-b2.md`, #862, item 1). **B2 is not yet ratified**, so this reading holds from B2's ratification and is pending until then. The headings above are append-only and stay as written; this section says how they read.

- **`d7385b4c2`** (Kenya's, 2026-11-05): a lapse. B2 does not re-decide it.
- **`4d10202b2`** (16.2.0's S): a lapse. Its window, from `d7385b4c2` to `4d10202b2`, holds no change to this file.
- **`693b39b54`** (Spec 129's CLOSEOUT): **not a lapse under (A).** `a953ac70d` (#723, 2026-11-07) changed the Trigger line's prose, with the token unchanged, a dated reason and Peter's words as authority. It falls in the window between the setting commit `19c1dea43` and `693b39b54`, so it re-rules the record. The record still **fired** at `693b39b54` under rule 1.
- **`6f507c039`** (16.3.0's S): a lapse. Its window starts at the previous firing event, `693b39b54`, and holds no change to this file.
- **Count**: **3 distinct lapses** (`d7385b4c2`, `4d10202b2`, `6f507c039`), not the 4 the Escalation section counts. The record is P2 (record), so the escalation to Peter was owed either way. His 2026-11-27 answer above stands under both counts.

**Correction of my own sentence** in the `693b39b54` heading. It read: "if B2 rules that it does, this heading is wrong and the next one moves with it." The second half is wrong. Under (A), the `693b39b54` heading falls and the `6f507c039` heading **stands**, because the window for `6f507c039` starts at the `693b39b54` firing, after `a953ac70d`. (Thurgood found this in B2 R2 § 5; my `[LINA R2]` agreed.)

**`5df204e2e` (#833) is not a firing.** It re-touched `.kiro/specs/129-consumer-generation-completeness/completion/claims-pass.md` after `693b39b54`. Under B2 item 1, a `path:` token fires once, at the first touch after its setting commit, so a later touch is not a firing, and #833 adds no lapse. Kenya's and Data's count of it is defensible on rule 1's current text, and B2 is what removes it.

*Signed: Lina, 2026-11-27.*

## iOS obligations filed here under rule 10 (2026-11-27, Kenya)

Three iOS obligations that no issue record held. Until today they lived only in a closed spec's design, an inbound, a plan line and the 132 placeholder. They are filed here, the goal's home, under README rule 10 ("files an issue record for it, or appends to the existing one"). Their sources are cited, not restated. Owner: Kenya, with Data for the Android twin where one exists. Each one passes to Spec 132's seeded outline at this record's rule-5 close, and the close checks that the outline names it.

1. **The iOS minimum, asked again at Spec 132's outline, before any native support claim.** This is Peter's "4 (a)", received 2026-11-05T13:05:54Z.
   - Sources: `.kiro/specs/129-consumer-generation-completeness/inbound-from-kenya-design-2026-11-05.md` § "5. For Peter: decision 4, the iOS minimum" (his answer is recorded there); `.kiro/specs/129-consumer-generation-completeness/design.md` § "0. Peter's rulings in this round"; `.kiro/specs/132-native-components-in-app/design-outline.md` § 3.
   - Done when the seeded outline puts the question to Peter, or Peter answers it.
2. **The iOS 17 runtime probe.** It needs Peter's go and an issue-row grant for its `.github/workflows/` change (Task Completion Protocol § "Coherent Units (the merge granularity)", the write-scope bullet), or Peter's go for a local runtime download. Neither has been asked for.
   - Sources: the same inbound § 5, "The evidence the runtime half needs, and what it costs"; `.kiro/specs/129-consumer-generation-completeness/evidence/2026-11-05-native-plan/plan-r2.md` § 2, the "Probes, before 132's outline" row; the 132 placeholder § 3, the iOS row.
   - Done when the probe's result, or Peter's "not now", is recorded with the outline round.
3. **The "Native status" wording rule.** I judge this one an obligation, not context, because 129 assigned the passage to Kenya and Data (Req 15.5), and 129 has closed while the rule still binds shipped text.
   - Source: `.kiro/specs/129-consumer-generation-completeness/design.md` § "0. Peter's rulings in this round", the paragraph "The wording rule that follows 4 (a)".
   - Standing until something runs on iOS 17, or item 1's answer moves the floor. The seeded outline inherits it.

**Obligation (1), the iOS half: recorded by pointer.** The local iOS render spike ran on 2026-11-27: XCUITest queries, the element-screenshot ink check and `performAccessibilityAudit`, on Xcode 27.2 with the iOS 26.0 simulator. Its result and fixture are `.kiro/specs/132-native-components-in-app/evidence/2026-11-27-ios-render-spike/README.md`, in draft PR #879; the evidence lives there, not here. The iOS 17 part was not run (item 2 above). The Android half, Data's probe, is still owed.

*Signed: Kenya, 2026-11-27.*

## Android render probe result (2026-11-27, Data): obligation (1), Android half

Recorded by the probe's fixing PR, #884, under `.kiro/issues/archive/2026-11-27-android-render-probe-workflow-grant.md` (the grant, activated by #878). The workflow is `.github/workflows/android-render-probe.yml`, and the toy module is `harness/android/render-probe/`. No DesignerPunk component was rendered: the probe measures the runner, not our components.

**The measured run**:
- Run: https://github.com/3fn/DesignerPunk/actions/runs/46040355947 (`pull_request`, head `18d74ba2954ab86d480dd6903c81a9e3f463a17a`), conclusion `success`.
- Job: 2026-11-27T17:16:17Z to 17:23:45Z, about 7.5 minutes.
- Runner image: `Image: ubuntu-24.04`, `Version: 20261122.23.1`.
- Its `render-probe:` lines, verbatim (artifacts expire after 7 days):

```
render-probe: runner-image=ubuntu24 20261122.23.1
render-probe: kvm-before exists=yes mode=crw-rw---- group=kvm
render-probe: kvm-before open=no
render-probe: kvm-after exists=yes mode=crw-rw-rw- group=kvm
render-probe: kvm-after open=yes
render-probe: download-emulator=ok seconds=13
render-probe: download-api26=ok seconds=20
render-probe: download-api36=ok seconds=17
render-probe: accel-check=accel: 0 KVM (version 12) is installed and usable. accel
render-probe: boot-api26=ok seconds=35
render-probe: instrumented-api26=PASS seconds=145
render-probe: boot-api36=ok seconds=56
render-probe: instrumented-api36=PASS seconds=33
render-probe: robolectric=PASS seconds=53
```

**What it shows**:
- **KVM is usable on the free `ubuntu-24.04` runner** once GitHub's documented udev rule is applied. Before the rule, `/dev/kvm` exists, but the runner user cannot open it.
- **Download and boot are cheap**:
  - the AOSP `default` x86_64 system images download in about 20 s each;
  - the emulator boots to `sys.boot_completed=1` in 35 s at API 26 and 56 s at API 36.
  - `instrumented-api26`'s 145 s includes the first Gradle build of the module.
- **No licence was asked for.** Every `sdkmanager` and `avdmanager` call read stdin from `/dev/null`.
- **A Compose UI test passes** on the emulator at both API levels, and under Robolectric (SDK 34).

**What it changes in Spec 132** (#880):
- **P-8 does not arise on this evidence**: no billed runner is needed for an emulator lane.
- It is one sample. Lane stability is a later read, over many runs, as for the compile harness's tiers.

**A finding from the first run, 46039771588** (head `fdb3c81f6`, VERIFIED from its log):
- Compose 1.12.1, under the pinned BOM 2026.09.00, requires `compileSdk` 37 or later: `checkDebugUnitTestAarMetadata` failed on 11 dependencies.
- The compile harness pins `compileSdk 36` and never sees this, because it runs only `compileDebugKotlin`, not the AAR metadata check that an app or test APK build runs.
- So the D4 Android app needs `compileSdk` 37 at this BOM. The probe module compiles against 37.
- This bears on `.kiro/issues/2026-11-27-android-toolchain-range-and-api26-floor-test-owed.md`, item 1.
- That run's other failure, an AVD created outside the emulator's search path, was my setup's, and it is fixed.

*Signed: Data, 2026-11-27.*

## iOS obligations: dated pointer and close check (2026-11-28, Kenya)

**Pointer for the "§ 3" cites in § "iOS obligations filed here under rule 10 (2026-11-27, Kenya)".**
- Item 1 cites `.kiro/specs/132-native-components-in-app/design-outline.md` § 3, and item 2 cites "the 132 placeholder § 3, the iOS row". Both meant the placeholder's § 3, at `a953ac70d`.
- In the seeded and reshaped outline, § 3 is "Order, and the measured-cost record". The iOS minimum is now in § 5.1, "P-6, the iOS minimum: RULED", and in § 4.3, "Kenya". Those cites should be read as pointing there. The item text above is unchanged (rule 9).

**Close check: the outline names all three iOS obligations.** VERIFIED by reading `design-outline.md` at `12f82afed`:
1. **The iOS minimum.** § 5.1 records P-6 as RULED: Peter, received 2026-11-27T18:32:45Z, "(B), raise to iOS 18"; confirmed 18:36:18Z. § 4.3 points to `.kiro/issues/2026-11-27-ios-18-floor-132-owed-acts.md`, items A–E. Done: the outline put the question to Peter, and he answered it.
2. **The iOS 17 runtime probe.** § 4.2 and § 4.3 name it as moot under P-6, with `.kiro/issues/archive/2026-11-27-ios-17-runtime-probe-owed.md`.
3. **The "Native status" wording rule.** § 4.3 names the claim-time form ("built for iOS 18.0; tested on <runtime>") as item C of the floor record, and § 5.2 has T-11 ("no change at this merge"). The window between the Core Goals raise and the first claim is held by `.kiro/issues/2026-11-28-ios-pre-claim-minimum-wording.md`. The rule's 17.0 condition ("Standing until something runs on iOS 17, or item 1's answer moves the floor") was met when item 1's answer moved the floor to 18.0.

**Superseded: the iOS 17 probe.** Item 2 above, "The iOS 17 runtime probe", is superseded. P-6 raised the floor to iOS 18, so the probe is moot. Its record, `.kiro/issues/archive/2026-11-27-ios-17-runtime-probe-owed.md`, closed under rule 5 at `db136d10d`, which recorded the outcome and moved it to the archive. Its rule-4 return to the root is `b98e6c8a5`.

*Signed: Kenya, 2026-11-28T05:08:33Z (`date -u`).*

## Outcome (2026-11-28, Kenya; Data's co-signature owed on this branch)

**Outcome (2026-11-28, Kenya)**: closed — the whole record. Peter's spec answer, received 2026-11-27T16:44:48Z, verbatim: "Spec with (a), and start 132's outline round now". It is carried out by the merge of #880, Spec 132's seeded design outline. That outline names this record (§ 4.2) and no longer reads `**Status**: **PLACEHOLDER.**` (§ 7). Nothing is left owed here. Each remaining item lives in a record committed at this branch's head (`12f82afed`), as follows:
- **The goal, the acceptance sentence and the definition of done**: `.kiro/specs/132-native-components-in-app/design-outline.md` § 1, word for word.
  - D4–D10 were ruled at P-1, with D4's target at 18.0.
  - D1–D3 are Spec 129's part, delivered.
- **The order (x′)**: re-ordered by the pivot (Peter, received 2026-11-28T03:45:37Z). The order is in the outline's § 3. Its line in `.kiro/issues/2026-10-18-spec-priorities-by-outcome.md` is owed by Thurgood (outline § 5.1, "Owed acts").
- **The distribution shape** (an SPM source package and a Gradle source module, no binary, the components as a package dependency): the outline's § 2, "Public API and packaging", together with:
  - `.kiro/issues/2026-11-28-generate-native-manifest-conditions.md` (Ada);
  - `.kiro/issues/2026-11-28-q12-q13-type-table-provisional-until-d4.md` (Ada);
  - `.kiro/issues/2026-11-28-deprecated-aliases-and-public-api-diff-before-claim.md` (Ada).
- **§ "Evaluation, when the trigger fires"**:
  - item 1's precondition is closed at `.kiro/issues/archive/2026-09-26-native-component-theme-hardcoding.md`;
  - items 2 and 3 were answered in Spec 129: its compile harness, its D1–D3 and its design;
  - item 4 is Spec 132 itself.
- **§ "Access-pass list"**: the obligation, an access pass for the 20 iOS views an app cannot construct, is in the outline's § 2, "Public API and packaging". That line cites this list, and it resolves here under rule 3. The rule itself is `.kiro/issues/2026-11-27-native-access-level-ballot-owed.md` (Lina).
- **§ "iOS obligations filed here under rule 10"**:
  - the iOS minimum → `.kiro/issues/2026-11-27-ios-18-floor-132-owed-acts.md` (#888);
  - the iOS 17 probe → closed, `.kiro/issues/archive/2026-11-27-ios-17-runtime-probe-owed.md`;
  - the wording rule → that floor record's items C and D, plus `.kiro/issues/2026-11-28-ios-pre-claim-minimum-wording.md`;
  - Swift 6 language mode, passed through this record by the 129 inbound → `.kiro/issues/2026-11-28-ios-swift-6-language-mode-for-components.md`.
- **Android**: the toolchain range and the API-26 floor test → `.kiro/issues/2026-11-27-android-toolchain-range-and-api26-floor-test-owed.md` (#881).
- **Obligation (1), the render probes**:
  - iOS → `.kiro/specs/132-native-components-in-app/evidence/2026-11-27-ios-render-spike/README.md` (#879);
  - Android → § "Android render probe result (2026-11-27, Data)" above, which stays in this file when it is archived.
- **P-1's addition (3)**: Peter, received 2026-11-28T02:26:04Z, "Yes, small means start small and grow; all three additions" → `.kiro/issues/2026-11-28-real-app-first-build-read.md` (Kenya and Data).
- **The other acts from sitting 2**: the records listed in the outline's § 4.2 and in `[THURGOOD R22]` of `feedback/design-outline.md`.

**The archive move is not in this commit.** Data reviews and co-signs first. The `git mv` to `archive/` follows in its own commit on this branch, before #880 merges, so an ancestor of the merge commit closes the record (Trigger line).

*Signed: Kenya, 2026-11-28T05:08:33Z (`date -u`). Co-signature owed: Data.*

*Co-signed: Data, 2026-11-28T05:10:52Z (`date -u`). I agree that the whole record closes at #880's merge, and that each item lives where this outcome says. The Android items are right: the toolchain range and the API-26 floor test, with item 3 (a floor raise and semver) appended at `fdd158dd7`, are in #881's record. The Android render-probe result stays in this file. The Gradle-module shape is in the outline's § 2 and in Ada's manifest-conditions record. Every path named is committed at `650e78ef9`, except the #879 spike README, which merges first.*
