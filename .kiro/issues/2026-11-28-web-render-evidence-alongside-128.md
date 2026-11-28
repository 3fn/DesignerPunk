# Issue: web's "renders" claim has no render evidence; a web render lane is placed alongside Spec 128, not in Spec 132

**Date**: 2026-11-28
**Owner**: Sparky (filer and owner; Peter's P-14 ruling names a Sparky-owned record).
**Trigger**: `path:.kiro/specs/128-react-react-native-platform-admission/requirements.md` — the event that owes the close is 128's requirements being written (a touch of that file). At that touch the owner reads whether 128's requirements carry a web render lane, or this record's lane brief (item B), and closes or re-rules. A `path:` record does not fire at the merge that adds it (rule 11). The file does not exist yet.
**Class**: P2 obligation (record) · owed-act *(set 2026-11-28, Sparky, owner, rule 12: Peter's ruling creates this standing act; the web claim is stated as weaker than native's in P-14, so no reader is misled while it stands.)*
**Source**: Peter, received 2026-11-28T04:40:39Z, verbatim: "(b)". The options were (a) a web render lane in 132; (b) a Sparky-owned record placed later, alongside 128, with 132 keeping the contract-validation format keyed by platform; (c) none. What he was told survives: he may read his goal ("the components are functional, and will successfully render, in the app as described") as covering web now, and until 128, web's "renders" claim stays weaker than native's. Ruling: `.kiro/specs/132-native-components-in-app/feedback/design-outline.md` § "[PETER] P-14"; owed act listed in `[THURGOOD R19]` and `[THURGOOD R22]`. My finding: `[SPARKY R1]` item 4. Filed under `.kiro/issues/README.md` rule 10.

---

## The gap

On web, the components' evidence is a name check plus jsdom contract tests. The name check (Spec 123 Task 6's name contract, with Spec 129's component-tier cases) proves that referenced token names resolve against the generated CSS. It cannot see a value that is defined but wrong, or a dynamic site whose input the adopter supplies (Icon-Base's `var(--${color})`). jsdom does not lay out the page or resolve custom properties as a browser does (REASONING, from jsdom's documented scope; not re-checked). No web check shows a component rendering. Native gets render lanes under Spec 132 (D5); web does not.

## Items

- **A. Keep the format keyed by platform** (132, already carried in T-13 and in #877's per-platform contract-validation record): the contract-validation format stays keyed by platform, so a web lane can be added without a retrofit. Sparky's check, when 132's format lands: the web contract text is unchanged and native wording is added alongside it, never replacing it (`[SPARKY R1]` item 6).
- **B. A web render lane brief** (Sparky): before or when 128's requirements are written, a brief of what a web render lane would be: what it renders, in which browser engine, what it asserts that jsdom and the name check cannot (computed custom-property values, layout, focus ring, forced-colors), and how it fits 128's app lanes. It names no tool choice until 128 chooses its lanes.
- **C. Web's readiness column** (Sparky, with Thurgood for T-7): whether Spec 132's D7 derivation applies to iOS and Android only, with web kept on its current derivation, or names which web checks web's column derives from (`[SPARKY R1]` item 5). If a 132 publish could change what web adopters are told, it goes to Peter.
- **D. Web authoring** (Sparky, if anyone reads the goal so): a web adopter who writes their own component with `defineComponentTokens` and composes ours has no named check, because the name contract reads only our bundle. Not owed by this record unless Peter reads his goal as covering web authoring, in which case it joins item B (`[SPARKY R1]` item 7).

## Surviving counter-argument

Waiting for 128 means web, the platform adopters can build on today, carries the weakest render evidence until 128 lands, and a lane added late may find a format built native-first. Item A is what answers the second half. The first half stays: Peter chose it with that stated.

*Signed: Sparky, 2026-11-28.*
