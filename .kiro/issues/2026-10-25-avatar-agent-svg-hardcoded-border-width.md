# Avatar-Base Web Hard-Codes the Agent SVG's Border Width and Corner Ratio

**Date**: 2026-10-25
**Filed by**: Lina, under rule 10, from Ada's cross-read of the row 4 schema pass (`scratchpad/cross-read-schema-pass-ada.md` § 3), corrected on reading the file
**Owner**: Lina (the component). Ada is consulted if the border width should read `border.default`/`border.emphasis` rather than a literal.
**Class**: P3 improvement · defect *(set 2026-10-25, Lina, rule 12. A literal where a token exists: no reader is misled and nothing breaks.)*
**Trigger**: `manual` — the next PR that edits `Avatar.web.ts`, or Spec 129's first component-token sweep, whichever Peter picks up first; a P3 with `manual` is archived stale at two unfired walks (README rule 5).

---

`Avatar.web.ts` `renderAgentSVG`: `const borderWidth = size === 'xxl' ? 2 : 1;` (L794) with the comment "xs-xl: borderDefault (1px), xxl: borderEmphasis (2px)", and `const cornerRadius = sizePx * 0.08;` (L786). The border width has tokens (`borderWidth100`, `borderWidth200`; the CSS and the native files read them). Fix: read the computed value of the border token, as the CSS does, or declare the literals as component tokens (Ada's call on the latter). Ada's cross-read called the size map hard-coded; it is not (`AVATAR_SIZE_PX` is built from `AvatarSizingTokens`, imported from `avatar.tokens.ts`), see the correction line in `2026-10-23-schema-tokens-declared-vs-read-completeness.md`.

*Signed: Lina, 2026-10-25.*

**Routed**: Spec 131 § "2026-11-01 (scope intake, second batch, record only: it names records and settles no design)", the outline row added in the same PR as this line *(2026-11-01, Thurgood, steward, rule 9; under Peter's fork D, R11 line 16, "Route them", `DLG@d34fc77868f649d3c67bd1b1da47bc6f2a805920` and R10, batch routing)*. The Trigger is unchanged. Under fork B (R11 line 14, route in place) its owner re-rules it to `path:.kiro/specs/131-governance-simplification/requirements.md` after this batch merges. This record is not due at 16.2.0's S.
