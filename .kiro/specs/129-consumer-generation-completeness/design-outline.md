# Design Outline: 129 — Consumer-Generation Completeness (PLACEHOLDER)

**Date**: 2026-10-03
**Spec**: 129 — Consumer-Generation Completeness
**Author**: Thurgood (to formalize); this PLACEHOLDER opened by the orchestrator at Peter's direction, 2026-10-03
**Status**: **PLACEHOLDER — not started.** Formalization begins at Peter's go. No requirements, design or tasks exist. This file gives the fast-follow a home and carries notes; it settles nothing. Per Process-Spec-Planning § "Phase 0" a stub captures scope, dependencies and cross-references only.

---

## Principle and scope (by pointer)

The principle, the scope items (i)-(vi), the acceptance sentence, the recorded consequence for release 3, and the folded and surviving counter-arguments are chartered in `.kiro/issues/2026-10-02-consumer-generation-completeness-spec.md`, sections "The principle (Peter's choice)", "Scope", "Acceptance", "Consequence recorded now" and "Counter-argument folded in, and what survives". Not restated here; the charter is the text of record. Owners per the charter header: Ada (pipeline and generators), Lina (component tier), Thurgood (formalization), Peter (decision at each gate).

Related, by path only:
- `.kiro/issues/2026-06-28-spec-094-platform-theme-emission-unwired.md` (charter scope item (i))
- `.kiro/issues/2026-09-17-platform-build-verification-harness-candidate.md` (the likely acceptance instrument)
- `.kiro/issues/2026-10-02-one-hop-upgrade-rehearsal-tracked-residuals.md` (R1 and R5, below)

**Relation to Spec 128**: React / React Native admission (`.kiro/specs/128-react-react-native-platform-admission/design-outline.md`) lists theme emission on the existing platforms as a prerequisite inside its arc; the ownership and ordering of that item between 128 and 129 is not settled here.

---

## Notes carried in

Each note carries its source and date. These are recorded positions, not rulings, unless marked as Peter's.

1. **Peter, 2026-10-03** (relayed by the orchestrator), directing this placeholder: "let's at least create a spec and a design-outline placeholder with notes". His reason: "I *think* we said we'd say it's ready for building web only and then finish the iOS and Android work as a fast follow." (The "I *think*" is his; the recorded rulings are in note 2.)
2. **Peter, 2026-10-02, release-prep sitting** ("middle path" ruling), as recorded in the charter issue § "Source": 3a, "Go with the middle path, ship 15 with the honest native scoping" (names this spec as the next work, Ada's with Lina); 3b, "Go with A, disclose — and capture the follow-up".
3. **U3 kickoff consult, 2026-10-03, relayed by the orchestrator; scratch, not committed** (Spec 123 U3 kickoff; files `ada-r1.md`, `lina-r1.md`, `lina-r2.md`, `leonardo-r1.md`; they are owners' positions pending the Spec 123 amendment, not ratified):
   - **Ada** (`ada-r1.md` § 3): proposed release-3 scope sentence, "the first release a stranger should be pointed at **for the web path and the generated agent layer (Claude Code and Kiro)**", with the caveat that **a theme you register does not yet emit** (a registered custom theme emits no `[data-theme="<name>"]` block on web) and that iOS and Android ship as reference source, not a build input. Sequencing lean: this spec runs parallel at design-outline depth only and must not gate U3 or release 3.
   - **Ada** (§ 4): "`init` runs `generate`" (charter item (iv)) re-opens **DD9** ("founder count is unchanged"), Task 19's pinned `path-steps: { founder: 5 }` and C23's front matter; the founder path loses a step. Personal-note creation stays in the CLI layer and **never** inside `src/generators/generateTokenFiles.ts`, so `init` can call generation without double-creating anything. The charter's "with `--output`" is loose: `generate` has no such flag, the config's `output` key is meant (Ada says she corrects it at the outline round; Lina VERIFIED the absence).
   - **Ada** (§ 3, § 5; Fork P-2 surviving counter): the spec's "compiling on all three platforms" acceptance **depends on the platform build-verification harness, which is only chartered**; starting early may mainly front-load that instrument question. Also: the "next spec kickoff after 15.0.0 ships" trigger arguably has not fired, and Ada recommends starting anyway and saying so in the record.
   - **Lina** (`lina-r1.md` F4; `lina-r2.md` cross-read, "Agree"): rehearsal residual **R1** (copied single-family component-token files, migration detection) and residual **R5** (name contract has no freshness check; "fresh" needs a version stamp in generated output, Ada's generator surface) **decline from U3 to this spec** as owners' positions pending the Spec 123 amendment. Her surviving counter: R1's home has no date until this spec's trigger fires; a "before release 3's tag" ceiling would mean taking R1 into U3 instead. Ada accepts this spec as R1's home on two conditions: the outline's inbound list names R1 explicitly (done here), and the residuals issue gets a dated re-trigger line (not done here, out of scope).
   - **Lina** (`lina-r1.md`): charter item (iv) is "(b) to the completeness spec"; U3 keeps every next-steps line a catalog row so (iv) later edits one row.
   - **Leonardo** (`leonardo-r1.md` Q2): release 3 is for "a founder or small team building a web product, using Claude Code or Kiro, comfortable letting their agent run the commands"; not for iOS/Android implementers or other harnesses. His proposed single sentence: "This release supports web products, with the agent layer for Claude Code and Kiro. iOS (SwiftUI) and Android (Jetpack Compose) are not supported yet ..." Leonardo wants the CLOSEOUT verdict to say "a web-product stranger on CC/Kiro", never "a stranger succeeded".
4. **UNVERIFIED**: whether this placeholder's creation counts as the charter's "next spec kickoff after 15.0.0 ships" trigger. The charter text says kickoff; Peter's direction here is explicitly "not the kickoff". The record should say which.
5. **UNVERIFIED**: the release-3 scope wording above is three seats' proposals; whether Peter has ruled on Spec 123 fork F8 / Ada's P-1 is not established by anything read for this placeholder.

---

## Open questions for the real outline round (listed, not answered)

1. Does the "fast follow" mean a release date or an ordering? What event closes "web-only ready" and opens this spec's formalization trigger?
2. Which spec owns native theme emission, 129 or 128's stated prerequisite? Is charter scope item (i) delivered once and referenced, or split?
3. Item (vi), the Model-B theme-override leak: is the consumer's copied theme tier (or their config `themes`) the source, and what does that do to (i) and to the "custom theme does not emit on web" caveat?
4. Item (iv): which edit lands first, `init` running `generate` or U3's onboarding amendments, given DD9 and the pinned founder step count? What is the charter's `--output` meant to be?
5. Acceptance instrument: who builds the platform build-verification harness (Kenya, Data) and does it exist before the tasks round?
6. R1 and R5: do they become requirements of scope item (ii), and what does the dated re-trigger line say?
7. Item (iii), native root-file retirement: which MAJOR, and how is the retirement announced?
8. Does the release-3 / fast-follow sequencing need a Spec 123 amendment, and who authors it?
9. Reviewer set and round count (see `feedback/design-outline.md`), with the spec-authoring cost model in view.
