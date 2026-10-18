# Obligation: correct the "scheduled for removal in the next major version" text on the deprecated disabled blend (RL-13)

**Date**: 2026-10-16
**Status**: FIXED — closed at #394's merge (2026-10-18); archive at the next walk (rule 5). *(Was: FIXING — PR open (this section); closes at the merge. Updated 2026-10-18, Ada: PR #394 MERGED as `a4694a2a5`; the correction landed.)*
**Owner**: **Ada** (content of `Token-Family-Blend.md` and `Token-Family-Color.md`; `BlendTokens.ts`; the blend wrappers). **Thurgood** reads the served-doc hunks for cross-surface consistency.
**Trigger**: `tag:v16.0.0` pushed → one PR before release 5's phase 1.
**Trigger (re-read 2026-10-18, Ada, ballot 2026-10-18-obligation-drain-and-release-falsity-floor M2/M5 back-fill, the application PR `chore/ballot-sitting-application`)**: `tag:v16.0.0` was a START event, M2's own example of a token that does not name the event that owes the close. Under M2 the deadline token would have been `release:next:phase-1` ("one PR before release 5's phase 1"). Now moot: the fix merged at #394 (`a4694a2a5`, 2026-10-18) before that deadline. The Trigger line above stays verbatim.
**Class**: P2 obligation (record) · defect *(set 2026-10-18, Ada, rule 12: the text said removal was scheduled for the next major when it was not, but it was a disclosed known limitation of 16.0.0 (Peter's ruling (a), 2026-10-16) and the doc is the record, not a guard, so P0 and P1 are not read. Fixed at #394.)*
**Source**: claims pass `.kiro/specs/123-consumer-distribution/completion/claims-pass-release-16.0.0.md` § RL-13 (the obligation had no home). Peter ruled the blend fork (a) on 2026-10-16: ship 16.0.0 with the text as is, correct it after the tag (ruled in session; recorded in the release-4 rulings record by the orchestrator in the RL-11 fix PR).
**Grant paths**: none here. `governance/**` is never granted by an issue (rule 8): a served-doc content correction by its owner rides a normal PR carrying a `**Consulted**:` line, and Peter merges it. `src/blend/**` is outside Ada's charter write scope, so the fixing PR declares its own grant for it.
**Consulted**: none needed — the owner records her own obligation; Thurgood's read is named above for the fixing PR.

---

## What is wrong

16.0.0 is a major release and does not remove `blend.disabledDesaturate` or `disabledColor()`/`disabledBlend()`; no release is scheduled to. Read in a 16.0.0 package, "the next major version" means 17.0.0, which no record plans.

## The sentences (at `308a588f3`)

- Served docs: `governance/Token-Family-Blend.md` L31, L73, L112, L172, L219; `governance/Token-Family-Color.md` L187.
- Token source: `src/tokens/semantic/BlendTokens.ts` L139 (`description`), plus the comments at L127–128 and L225. The `description` regenerates into `dist/tokens/semantic/BlendTokens.js`, the DTCG `$description` and the Figma `description`.
- Wrappers (found while writing this record; also packed): `src/blend/ThemeAwareBlendUtilities.web.ts` L60, L98, L252; `.ios.swift` L31, L176, L281; `.android.kt` L40, L167, L285; `src/blend/OklchBlendCalculator.ts` L21, L29.

## What they should say

Deprecated, retained for backward compatibility; **removal is not scheduled**. Removing them is a breaking change, so it is scheduled only by a ruling that names the major release; until then the text names no release. Do not invent a target.

## What the change is not

The `description` edit is a source text change, not a value change: `token-index/` and every token value stay the same. The regenerated DTCG and Figma exports change in that text. The fixing PR's release entry says so.

---

## 2026-10-17 — Grant: the wrapper sites

**Why**: `tag:v16.0.0` fired 2026-10-16 and Peter gave the go on 2026-10-17. The sentences this record lists include the blend wrappers and a test comment under `src/blend/**`, which is outside Ada's charter writeScope; the record said the fixing PR declares its own grant for them. This section is that grant. The served docs (`governance/Token-Family-Blend.md`, `governance/Token-Family-Color.md`) are not granted here (rule 8 never grants `governance/**`): they ride the same PR as a Peter-merged content correction by their owner.
- **Source**: this record; claims pass `.kiro/specs/123-consumer-distribution/completion/claims-pass-release-16.0.0.md` § RL-13, and the addendum's O-16 (the test comment at `src/blend/__tests__/InteractionStateAudit.test.ts` L135).
- **Grantee**: Ada.
- **Activation**: Peter's merge of the PR whose body names this section (README rule 8): this fixing PR, branch `fix/blend-deprecation-next-major-text`.
- **Expiry**: that same merge.
- **Precedent**: #383 — the grant and the correction ride ONE PR on Peter's direction, so the grant is active when the diff is judged against it.
- **Owner of the granted paths**: `src/blend/**` belongs to Lina's side of the house by charter; the wrappers' owner is consulted through the PR body's `**Consulted**:` line (added by the orchestrator), not by Ada. The change is comment, doc-comment and deprecation-message text only; no signature, value or behaviour changes.

**Grant paths**: src/blend/ThemeAwareBlendUtilities.web.ts, src/blend/ThemeAwareBlendUtilities.ios.swift, src/blend/ThemeAwareBlendUtilities.android.kt, src/blend/OklchBlendCalculator.ts, src/blend/__tests__/InteractionStateAudit.test.ts, docs/token-system-overview.md

`docs/token-system-overview.md` (L389, the site the first re-grep list missed) is not in Ada's charter writeScope either; its last edits were Ada's deprecation PRs (#83, #89), so the correction is hers and is granted here.

**Wording used**: "deprecated since 2026-07-15, retained for backward compatibility; removal is not scheduled" (long form), "retained for backward compatibility, removal not scheduled" (table cells and one-line comments). No release is named; only a ruling that names the major release schedules removal.

**Sites not on this record's list** (found by the re-grep, NOT changed here — outside the grant and the PR's file list; `docs/token-system-overview.md` L389 was found the same way and is now fixed and granted above): frozen onboarding fixtures under `tests/onboarding-trio/fixtures/**` (born-cc, born-kiro) that carry copies of the old `BlendTokens.ts` and DTCG/Figma text. Routed to the orchestrator in the PR hand-back.
