# Task 13.5 Completion: The Integration Guide cascade sentence; the Spec 123 pointer line

**Date**: 2026-11-08
**Task**: 13.5 (Spec 129, Unit 8, parent 13)
**Agent**: Lina (Sonnet, as planned)
**Branch**: `task/129-13-lina`

## 1. What changed

- `governance/DesignerPunk-Integration-Guide.md`, install region:
  - a paragraph "Your own component tokens" after "Your own tokens": import your generated `ComponentTokens.web.css` after `@3fn/core/component-tokens.css`; on web "yours wins" is per token, by order (a name you omit keeps ours), unlike native's per-group rule; bundler code-splitting can reorder CSS chunks (Sparky's three points, design § 9);
  - an Android bullet naming the reserved Kotlin packages `com.designerpunk.tokens` and `com.designerpunk.components.*`, and that `generate` warns, never fails (design § 9; Req 5.4).
- `docs/consumer/INSTALL.md` re-derived with `npx tsx scripts/derive-install-doc.ts`.
- **Spec 123 pointer line (confirmed, no edit).** `.kiro/specs/123-consumer-distribution/requirements.md` Requirement 1.5 carries "Decided 2026-11-05; this pointer added 2026-11-05 by Lina, under Spec 129 Requirement 5.5", pointing at `design.md` § 9 "Spec 123 Requirement 1.5, recorded decision". It is on `main` at `c07951b38`.

**Edit kind**: `governance/DesignerPunk-Integration-Guide.md` — EXECUTION (Task 13 row, 13.5; Spec 129 Requirement 15 and design § 9, "The Integration Guide sentence")

## 2. Targeted tests run

- `npx jest -c scripts/jest.config.js scripts/__tests__/install-doc.test.ts`: 81 passed (the committed INSTALL.md equals the derivation).

## 3. Application-time adaptations

- No `<!-- limitation: -->` markers added; the sentences are true as written today.
- The new text says web does not carry DesignerPunk's component tokens in `ComponentTokens.web.css`, matching the Consumer Guard case "web does not harvest".
- `docs/consumer/INSTALL.md` is derived, not a Primary Artifact edit by hand.
