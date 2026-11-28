# Issue: what Spec 132's pivot hands to Spec 133 — the state-token handoff, the contract ranges, #885 in U1, the token sitting, the blend record, the false-assurance test, enforcement last, the colour end state

**Date**: 2026-11-28
**Owner**: Thurgood (filer; Spec 132's formalizer and Spec 133's author). Items name their seats: A Ada and Lina; B Lina; C Ada and Lina; D Ada; E Ada; F Thurgood, with Ada and Stacy; G Lina; H Thurgood; I Ada, with Lina.
**Trigger**: `path:.kiro/specs/133-color-track/requirements.md` — the event that owes this record's close is Spec 133's requirements: the commit that adds them takes these items in or leaves them out with a reason (Process-Spec-Planning § "Before Formalizing: Records That Name the Spec").
**Class**: P2 obligation (record) · owed-act *(set 2026-11-28, Thurgood, owner, rule 12: Peter's rulings create these acts; no reader is misled by this record's subject, and the web defect's own falsehood is held in Lina's web defect record.)*
**Source**: Peter, received 2026-11-28T03:45:37Z, verbatim: "Yes to 1, U2 before 132, keep 131. Re: 4, rejected. I don't think U1 will take "weeks" as projected." (the pivot; `.kiro/specs/132-native-components-in-app/feedback/design-outline.md` § "[PETER] pivot"); P-7 re-ruled by it (§ "[PETER] P-7"); P-16 (§ "[PETER] P-16"); the web P0, received 2026-11-28T04:54:20Z, verbatim: "Agreed." (§ "[PETER] web P0"). The order: 129 → 133's token half (its outline round, U1 state colours as tokens, U2 the `ColorTokens.ts` deletion and the rgba cleanup, U3 shadow channels) → 132's first family → … → 133's enforcement, after 132's first family. Filed under `.kiro/issues/README.md` rule 10 in the PR that records the rulings. Each owner may re-class or re-rule their own item under rules 9 and 12.

---

## Items

- **A. The 132↔133 handoff** (Ada, Lina; Ada R10).
  - 133 → 132: the state-token names and their per-theme emission, which replace P-7's "blend API shape" as 17.0.0's condition; the public name of the one generated runtime function per platform for caller colours, which D10 needs; the native blend files deleted, so their pinned harness entries are dropped in 132's act; the ΔL contract wording (Lina).
  - 132 → 133: the native theme surface (theme members, access level, the fixed binding names); T-14's family filter for state-token groups; D9 reading the new members.
- **B. The contracts' state ranges** (Lina): restated in OKLCH only, with the dark-surface rule and Icon-Base's range, which cannot be met on white (Lina R13). The native test checks the range, and the claim keeps a line saying colours may change (P-7, item 4).
- **C. #885's caret and selection fix in U1** (Ada, Lina): proposed for 133's outline round (Lina R12). P-16's (A) rests on it landing before 132's render lanes.
- **D. Peter's review at 133's token sitting** (Ada brings them): creating the state tokens, and dark-surface lightening.
- **E. The blend record's correction** (Ada): `.kiro/issues/2026-06-24-blend-system-architecture-and-oklch-alignment.md`, against the measurements in Ada R6 and Lina R6.
- **F. `InteractionStateAudit.test.ts`'s false assurance** (Thurgood, as test-governance owner; Ada for the live engine; Stacy on the claim side): it tests a calculator that no component uses. U1 re-points it at the live state tokens or retires it, with a known-bad case that fails today.
- **G. Enforcement last** (Lina): 133's last unit, after 132's first family, with Lina's web-first and native-per-family arming as detail for 133's outline round.
- **H. The token-half completion path** (Thurgood, as 133's formalizer): 133's tasks round declares `.kiro/specs/133-color-track/completion/token-half-complete.md` as a Primary Artifact of the parent that completes the token half (U1, U2 and U3), so nothing writes that path before then. Creating it fires Spec 132's park re-ask (`.kiro/specs/132-native-components-in-app/design-outline.md`, outcome line of 2026-11-28).
- **I. The colour end state for component tokens** (Ada, with Lina as the consumer). *Added 2026-11-28 by Thurgood, the filer. It comes from the fold check that Peter approved (received 2026-11-28T12:24:28Z, verbatim: "Proceed as you recommend"), in which Ada, Lina and Thurgood agreed on this form at the cross-read. Their answers are outside the repository: `ada-fold-133.md`, `lina-fold-133.md` and `thurgood-fold-133.md`, each with a § "Cross-read".*
  - **The fork, unpicked**: (i) `defineComponentTokens` refuses `family: 'color'` at the next major; or (ii) colour component tokens follow the theme, through a new reference kind and theme-read emission. Peter rules on it once, at #870's colour fork (`.kiro/issues/2026-11-27-ios-component-token-type-map-breaks-six-families.md` § "Fix shape", item 4). Nothing here picks an option.
  - **The unit**: left to 133's outline round. If Peter's pick names a vehicle outside 133, the commit that adds 133's requirements leaves this item out and gives that as the reason.
  - **Not held by this item**: #870's own fix (the emitter, the interim typed `Color` by reference with its warning, and the fixture). It runs on its own, under its own Trigger.
  - **A fact about U2, under either pick** (Ada, VERIFIED, packed at `31e2fe535`):
    - `init` copies `src/tokens/ColorTokens.ts`, which exports `purpleTokens`, into the consumer's tree.
    - With that file removed, `generate` exits 1 with `Cannot find module './ColorTokens'`.
    - The OKLCH `ComposedColor` has no `baseValue`, so it cannot serve as a `PrimitiveTokenReference`.
    - So U2 must state what replaces #870's colour by-reference repro and its fixture case, or that the case is removed.
  - **Owed by Ada, on her record**: #870's record names `path:.kiro/specs/133-color-track/requirements.md`, so that 133's Step 0 grep finds it (her cross-read condition).

*Signed: Thurgood, 2026-11-28. Item I added: Thurgood, 2026-11-28.*
