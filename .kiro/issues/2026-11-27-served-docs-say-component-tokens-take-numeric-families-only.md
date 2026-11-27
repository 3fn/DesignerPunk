# Issue: three served docs say `defineComponentTokens` takes numeric families only and has no color family; the call takes any family

**Date**: 2026-11-27
**Owner**: Ada (Token Governance and Token Quick Reference are Rosetta content; the referent, `defineComponentTokens` and the generator, is mine)
**Class**: P0 false-claim · defect *(set 2026-11-27, Ada, rule 12. Three statements are false about the API, in docs the docs MCP serves and in my charter's ambient embed (`.claude/agents/ada.md` L275, and its consumer rendering at `canonical/_consumer-output/cc/.claude/agents/ada.md` L272). A package reader meets them there, which is the P0 definition (ballot 2026-10-18-obligation-drain-and-release-falsity-floor M7). No walk record has rowed them, so no release has "known" them under item 3a. This PR closes the record.)*
**Trigger**: `release:next:phase-1` — the event that owes the close is the next release's S. This record is closed by its fixing PR (the Outcome below) and is archived at the next walk (rule 5). It stays at the root until then, so that rule 10's `git cat-file -e <m>:<path as cited>` resolves at the CORRECTION's merge commit.
**Source**: Ada's consult on the Spec 129 requirements amendment 1 draft (PR #864; lapse-batch row 7), 2026-11-27. While checking that ruling's premise, I traced its reason to `governance/Token-Governance.md` L160.

---

## The false statements (at `3a3bd072b`)

1. `governance/Token-Governance.md` L160: "Component tokens are declared with `defineComponentTokens`, which takes numeric families only (spacing, sizing, borderWidth); there is no color family"
2. `governance/Token-Governance.md` L556: "The `family` is given once per `defineComponentTokens` call and applies to every token in it: `spacing`, `sizing` or `borderWidth`. Tokens of different families go in separate calls. There is no color family, so a component's colors are not component tokens."
3. `governance/Token-Quick-Reference.md` L224: "They are declared with `defineComponentTokens`, which takes numeric families only (spacing, sizing, borderWidth), so there is no `color.{component}…` component-token shape."

## The truth (the referent: the code at `3a3bd072b`, and observed behaviour)

- `src/build/tokens/defineComponentTokens.ts` L145: `family: string`.
  - The call refuses only an empty component, family or token set (L223–L233), and a reference whose `category` differs from `family` (L260–L275).
  - The doc comment gives `'fontSize'` and `'radius'` as examples.
- `src/build/tokens/defineComponentTokens.ts` L363: `generate`'s grid check returns `null` for every family but `spacing` and `sizing`, so no later step in `generate` refuses another family.
- `src/generators/TokenFileGenerator.ts` L607–L621 types radius, fontSize, tapArea and borderWidth as `CGFloat` and color as `UIColor`. L666–L674 gives radius `.dp` and fontSize `.sp`.
- **Observed (VERIFIED, 2026-11-27)**: a scratch consumer installed from `@3fn/core` 16.3.0, packed at `3a3bd072b`, declared component tokens with `family` `'radius'`, `'fontSize'`, `'color'` and `'borderWidth'`. `generate` exited 0 and wrote every one to web, iOS, Android and `token-index/components.yaml`.
- **Observed (VERIFIED, 2026-11-27, Ada and Kenya)**: on iOS, a component token in the color, fontWeight, fontFamily, duration, easing or scale family emits Swift that `swiftc -typecheck` rejects, or that has the wrong type or unit. Color fails on both paths. This is `.kiro/issues/2026-11-27-ios-component-token-type-map-breaks-six-families.md`, PR #870, with the table and the repro.
- **What was true in the old lines**: DesignerPunk's own component tokens use spacing, sizing and borderWidth only. The non-test `family:` declarations are 7 spacing, 5 sizing and 1 borderWidth (`.kiro/issues/archive/2026-10-23-served-docs-teach-non-key-token-names.md` L67, and re-counted at `3a3bd072b`). The lines turned that usage into a claim about the API. A component's colours referencing semantic tokens directly is also true, and stays.

## The fix (this PR, a CORRECTION)

- Each of the three lines now says:
  - what the API takes (`family` is a string, and the call accepts any family);
  - what DesignerPunk uses (spacing, sizing and borderWidth; no color);
  - the observed state on iOS ("a component token in the color, fontWeight, fontFamily, duration, easing or scale family is not supported on iOS today: its generated Swift does not compile or has the wrong type").
- Each line carries the `corrected` pointer (`.kiro/docs/ballots/README.md` L31).
- The rendered charter files re-render from Token Governance's embed (Ada's, her consumer copy, and the generator fixture), and the lock refreshes.
- The iOS clause describes a defect. When #870's record closes, its fix PR removes the clause as a CORRECTION citing that record (its Fix shape, item 4).
- No requirement is added or changed. "A component's colors reference semantic tokens directly" was already at L162 and L580 as practice, and it is unchanged.

## The Spec 059 closure that cited L160: it needs re-reading; nothing is reopened

Ballot `.kiro/docs/ballots/2026-11-04-waiting-spec-row.md`, row 4 (L441, L454, L658), closed `059-component-color-token-investigation`. In its words, the spec was "answered by `governance/Token-Governance.md` L160 and L556 (Lina adds L580)", which "already state it as law: `defineComponentTokens` takes numeric families only, 'there is no color family', and a component's colours reference semantic tokens directly".

The closure has two grounds:
- **The API ground is false** (above). Colour component tokens can be declared, and on iOS they are broken.
- **The practice ground holds.** A component's colours reference semantic tokens directly, as Avatar's do. So does 059's own Next Steps: close as "Not Needed" if no use case emerges, and none has.

**My read**: the closure needs re-reading by its two seats, Ada (token API) and Lina (component tokens; she decides the component half).
- The reason it was closed is gone.
- The question 059 asked, whether a component should have colour component tokens, is now live in #870's record as its Fix shape item 4, a fork: allow static colour component tokens, or refuse them?
- My lean is that the closure stands on its practice ground, and the policy question is answered where the fix is decided, not by reopening 059. That is a lean, not a ruling.
- The ballot's text is a ledger and is not edited. I reopen nothing, and I re-rule nothing here.

## Sweep

The class is a statement that `defineComponentTokens` takes numeric families only, or has no color family. The reach is `git grep -n -i "numeric families\|no color family\|no colour family\|colors are not component tokens\|takes numeric"` over the whole repository at `3a3bd072b`, which gave 12 hits:
- **fixed in this PR**:
  - `governance/Token-Governance.md` L160 and L556;
  - `governance/Token-Quick-Reference.md` L224;
  - `.claude/agents/ada.md` L275 and `canonical/_consumer-output/cc/.claude/agents/ada.md` L272, both generated from Token Governance L160 and re-rendered;
  - `canonical/_fixture-output/cc/.claude/agents/_fixture.md` L117, the generator's standing fixture, which embeds the same section and was re-rendered.
- **left**, all ledgers that keep their text (README L31):
  - `.kiro/docs/ballots/2026-11-04-waiting-spec-row.md` L441, L454 and L658 (row 4; above);
  - `.kiro/issues/archive/2026-10-23-served-docs-teach-non-key-token-names.md` L56 (it matched on "Component Token Pattern"; not this class);
  - `.kiro/issues/2026-11-08-generate-component-token-warning-spacing-sizing-only.md` L33. Its owner (Ada) corrects it after Peter re-rules lapse-batch row 7, as the orchestrator directed on 2026-11-27;
  - `CHANGELOG.md` L166 (it matched on another phrase; not this class);
  - `.kiro/specs/129-consumer-generation-completeness/feedback/requirements.md` on #864's branch, not `main`. That is the amendment draft that raised this.

## Outcome (2026-11-27)

Closed by the CORRECTION PR on branch `chore/token-governance-component-token-family-correction`: the three lines are corrected to the referent above, and the three rendered charter files (Ada's, her consumer copy, and the generator fixture) and the lock are refreshed. It stays at the root until the next walk archives it (rule 5).

Signed: Ada, 2026-11-27.
