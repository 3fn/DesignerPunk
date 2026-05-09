# Spec Feedback: Requirements

**Spec**: 103-pipeline-dx-source-resolution
**Phase**: Requirements
**Created**: 2026-05-09

---

### Context for Reviewers
- Design outline approved by Ada, Lina, Leo — all approved to proceed
- Key resolutions from design outline feedback:
  - DI approach confirmed (inject raw token arrays, generator builds registries) → design-outline feedback § "Resolutions"
  - V1 scoped to primitive/semantic only; component tokens out of scope → Resolution B
  - Theme overrides independent of `tokenSource` (resolve from config `themes` array) → Resolution C
  - Two commands only: `validate` + `generate`, no `--strict` flag → Resolution D
  - `tokenSource` must be complete source, no partial overlay/fallback → Resolution E
  - Barrel contract: `getAllPrimitiveTokens` from root, `getAllSemanticTokens` from `semantic/` → Resolution G

---

### Leonardo — Requirements Review (2026-05-09)

#### [LEO R1]

**Verdict**: Approve to proceed to design.

**Perspective**: Product architect and pipeline consumer. My review focuses on whether these requirements, as written, will produce a pipeline that platform agents and I can use without confusion — and whether the spec correctly incorporated the design-outline resolutions.

---

#### Feedback Resolution Incorporation — Verified

All my design-outline concerns are addressed:

| My Concern | Resolution | Where in Requirements |
|-----------|-----------|----------------------|
| No `--strict` flag (LEO #4) | ✅ Adopted | Req 5, AC 10 |
| Complete source, no fallback (LEO #5) | ✅ Adopted | Req 1, AC 4 |
| Component tokens scoped out (LEO #6) | ✅ Adopted | Req 1, AC 6 + Scope |
| Theme overrides independent (LEO #7) | ✅ Adopted | Req 1, AC 5 |
| Machine-readable deferred (LEO #8) | ✅ Adopted | Scope |

Good. No drift from the agreed resolutions.

---

#### Requirement 1: Token Source Configuration

Clean and testable. One product-workflow observation:

- **AC 4 (no fallback)** — I pushed for this in the design outline and I'm glad it's here. But from the product side, the *failure mode* matters as much as the rule. When a platform agent runs `generate` and the local source is missing `ColorTokens.ts`, the error needs to say something like: "Token source `./src/tokens` is missing primitive family: Color. Expected export from barrel." Not a generic import failure. Ada flagged this too — agree it's a design-phase detail, but it's important for the DX story to land.

---

#### Requirement 3: Dependency Injection Refactor

Agree with Ada's and Lina's detailed analysis. From my perspective:

- **The clean break is correct.** Platform agents don't call `generateTokenFiles()` directly — they run `npx designerpunk generate`. The internal signature change is invisible to consumers. No backward-compat overload needed.

- **Ada's 4 call sites are the complete surface.** I confirmed this matches my understanding of the codebase. The `if (require.main === module)` self-invocation block at the bottom of `generateTokenFiles.ts` should be removed entirely — it's a development convenience that the CLI now supersedes.

---

#### Requirement 5: Standalone Validation Command

This is the requirement I care most about from the product side. Two observations:

1. **AC 5 (naming convention compliance)** — I agree with both Ada and Lina: this AC is under-specified and potentially contradicts AC 8 (reuse existing validators). There is no standalone naming pattern validator today.

   **My recommendation aligns with Lina's**: Reword AC 5 to "token family membership validation (tokens register successfully into their declared families)" — this is what existing registration-time checks already surface. True regex-based naming pattern validation is new logic and should be V2.

   This matters for the product workflow because a `validate` command that claims to check "naming conventions" but actually only checks registration will confuse platform agents when a token with a weird name passes validation.

2. **AC 9 (source-aware validation)** — Good. This is the key integration point between Req 1 and Req 5. If I set `tokenSource: './src/tokens'` and run `validate`, it validates *my local source*. If I don't set it, it validates the package. The mental model is: "validate checks whatever generate would use." Simple, correct.

---

#### Requirement 4: Transparent Source Display

No concerns. AC 5 (relative paths) is the right UX call — absolute paths in terminal output are noise. One minor note: when `tokenSource` is inside the project (e.g., `./src/tokens`), the relative path is short and readable. When it's the package default (`node_modules/@3fn/core/src/tokens`), that's longer but still informative. Both cases work.

---

#### Requirements 2, 6, 7

No concerns. These are well-scoped supporting requirements. The barrel contract (Req 2) is minimal and correct. CLI registration (Req 6) is standard. Documentation (Req 7) is adequate for V1 — JSDoc on the interface is the right minimum surface.

---

#### Cross-Platform Consistency Note

One observation that doesn't affect the requirements but is worth noting for design: the `validate` command's output format will be seen by platform agents across all three platforms. When Kenya runs `validate` before an iOS implementation and Sparky runs it before a web implementation, they should see identical output for the same token source. This is inherently true (same CLI, same source), but worth confirming in design that there's no platform-conditional logic in the validator.

---

#### Summary

| # | Requirement | Feedback |
|---|-------------|----------|
| 1 | Req 1, AC 4 | Error message quality for missing families — design-phase detail, important for DX |
| 2 | Req 5, AC 5 | Reword to "family membership validation" — agree with Ada and Lina |
| 3 | Req 3 | Agree with Ada: remove legacy signature, enumerate call sites |

No blockers. Approve to proceed to design.

---

### Lina — Requirements Review (2026-05-09)

#### [LINA R1]

**Verdict**: Approve to proceed to design.

The requirements are clean, well-scoped, and correctly incorporate all design-outline resolutions. My earlier concerns (component tokens, theme overrides, registry asymmetry) are all explicitly addressed in the scope boundaries and specific ACs. Good work.

---

#### Requirement 1: Token Source Configuration

All ACs are clear and testable. Two notes:

- **AC 4** ("no fallback to package for missing token families") — Correct and important. This is the right call for V1 debuggability. But the error experience matters: if a product repo's local source is missing a token family that `generateTokenFiles` expects, the failure should name the missing family and point at the `tokenSource` path. Requirements don't specify the error message quality here — that's probably a design-phase detail, but worth flagging.

- **AC 6** ("component token generation SHALL continue to use existing registry-based resolution") — This is my concern from the design outline, correctly resolved. One implementation subtlety worth noting for design phase: component token files (e.g., `Badge-Label-Base/tokens.ts`) import primitive constants like `SPACING_BASE_VALUE` from `../../../tokens/SpacingTokens`. When `tokenSource` is local, those imports still resolve to the *package* path (because the component token files live in the package). This means component tokens will always use package primitive values, even if the local source has different values. That's the "known asymmetry" — just confirming I understand the implication and it's acceptable for V1.

---

#### Requirement 3: Dependency Injection Refactor

Agree with Ada's detailed review. Her clarifications (#1-#5) are all valid and should be addressed in design. My additions:

- **Ada's point #3 (new AC: legacy signature removed)** — Agree. The old `generateTokenFiles(outputDir, config?)` signature should not be maintained as an overload. Clean break. The 4 call sites Ada enumerated match what I found in the codebase (CLI, ProductRepoSimulation test, legacy script, self-invocation block).

- **AC 5 (component tokens remain registry-based)** — Ada's suggested clarification ("resolved internally via registry side-effect imports; NOT injected") is the right wording. The design should also note that `TokenFileGenerator.generateComponentTokens()` is a separate method from `generateTokenFiles()` and is unaffected by this refactor — it continues reading from `ComponentTokenRegistry.getAll()` as today.

---

#### Requirement 5: Standalone Validation Command

- **AC 5 (naming convention compliance)** — Agree with Ada's analysis. There is no standalone "token naming convention validator" in the codebase today. What exists:
  - `PrimitiveTokenRegistry.register()` — validates uniqueness, not naming patterns
  - `NamingConventionManager` — validates *platform output* naming (camelCase for Swift, kebab-case for CSS, etc.), not *source token* naming
  - `SemanticTokenRegistry.register()` — validates structure (dot-notation), not naming patterns per se

  Ada's recommendation is correct: scope AC 5 to what registration-time checks already surface. If a token fails to register (duplicate name, missing category), that's a "naming" failure in the broad sense. But if the intent is "validate that `space100` follows the `{family}{scale}` pattern" — that logic doesn't exist today and would be new code, contradicting AC 8.

  **My recommendation**: Reword AC 5 to "token family membership validation (tokens register successfully into their declared family)" rather than "naming convention compliance." This is what existing infrastructure actually checks. True naming pattern validation (regex-based family prefix matching) can be a V2 addition.

- **AC 8 (reuse existing validators)** — Strong agreement. Ada's orchestration sequence (build registries → run `SemanticTokenValidator` → run `MathematicalRelationshipParser` → collect results) is exactly right. This is essentially extracting the validation preamble from `generateTokenFiles()` into a standalone path.

---

#### Requirements I Have No Concerns About

- **Req 2 (Barrel Contract)** — Clear, minimal, correct. AC 5 (no theme/component exports required) directly addresses my design-outline concern.
- **Req 4 (Transparent Source Display)** — Straightforward DX. AC 5 (relative paths) is a good UX call.
- **Req 6 (CLI Command Registration)** — Standard CLI work, no concerns.
- **Req 7 (Documentation)** — Adequate for V1. JSDoc on the config interface is the right minimum.

---

#### Summary

| # | Requirement | Note |
|---|-------------|------|
| 1 | Req 1, AC 4 | Error message quality when local source is incomplete — design-phase detail |
| 2 | Req 3 | Agree with all 5 of Ada's clarification requests |
| 3 | Req 5, AC 5 | Reword to "family membership validation" — true naming pattern validation is new logic |

None are blockers. Approve to proceed to design.

---

### Ada — Requirements Review (2026-05-09)

**Verdict**: Approve with minor clarifications needed on Requirement 3 and Requirement 5.

---

#### Overall

Requirements are well-structured, traceable to the origin issues, and correctly incorporate all design-outline feedback resolutions. The scope boundaries are clear and the V1 known limitations are honestly documented. Good work.

---

#### Requirement 3: Dependency Injection Refactor — Detailed Review

This is the architectural heart of the spec. The acceptance criteria are correct in intent but need tightening for implementation clarity:

**AC 1 — "accept primitive and semantic token arrays as parameters"**

Needs a concrete signature. I'd propose:

```typescript
interface TokenInput {
  primitiveTokens: PrimitiveToken[];
  semanticTokens: SemanticToken[];
}

export function generateTokenFiles(tokens: TokenInput, config: ResolvedConfig): void
```

The current signature is `generateTokenFiles(outputDir: string = 'output', config?: ResolvedConfig)`. The refactor makes `config` required (no more optional — the CLI always provides it) and replaces the `outputDir` positional with `config.outputDir`. This is a clean break from the legacy interface.

**Concern**: AC 1 says "accept ... as parameters" but doesn't specify whether the old signature is removed or kept as an overload. My recommendation: **remove the old signature entirely**. There are only 4 call sites:
- `src/cli/designerpunk.ts` line 80 — CLI entry (will be updated)
- `src/generators/__tests__/ProductRepoSimulation.test.ts` — 4 calls (will be updated)
- `scripts/generate-platform-tokens.ts` line 49 — legacy script (should be updated or deprecated)
- `src/generators/generateTokenFiles.ts` line 259 — self-invocation at bottom of file (the `if (require.main === module)` block — should be removed or updated)

The requirements should state: "The legacy `generateTokenFiles(outputDir, config?)` signature SHALL be removed. No backward-compatible overload is maintained."

**AC 3 — "all existing call sites SHALL be updated"**

Good, but should enumerate them explicitly (the 4 above) so the tasks phase can scope the work precisely.

**AC 5 — "Component token generation SHALL remain registry-based"**

Correct. But worth noting: `generateTokenFiles()` currently handles component tokens too (via `ComponentTokenRegistry` populated by side-effect imports). The DI refactor should NOT change how component tokens enter the system. The function still does its own component token resolution internally. This is already implied but could be stated more explicitly: "Component tokens continue to be resolved internally via registry side-effect imports; they are NOT injected."

---

#### Requirement 5: Standalone Validation Command — Detailed Review

**AC 2-5 (validation checks)**: These are well-specified. My concern is about **what "mathematical relationship validation" means in practice** for a product repo.

The `ThreeTierValidator` validates token *usage* patterns (is this token being used correctly in context). The `MathematicalRelationshipParser` validates that a token's `mathematicalRelationship` string is internally consistent (e.g., "8 × 2 = 16" actually computes correctly).

For a product repo running `validate`, the most valuable checks are:
1. **Semantic reference integrity** (AC 2) — does every semantic token reference a primitive that exists? ✅ Clear.
2. **Required field presence** (AC 3) — are all `PrimitiveToken` fields populated? ✅ Clear.
3. **Mathematical relationship validation** (AC 4) — does the `mathematicalRelationship` string parse and compute correctly? ✅ Clear, uses `MathematicalRelationshipParser`.
4. **Naming convention compliance** (AC 5) — this is the vague one. What naming conventions? Token family prefixes? Semantic dot-notation? camelCase vs kebab-case?

**Recommendation for AC 5**: Either enumerate the specific naming rules being checked (e.g., "primitive tokens use camelCase, semantic tokens use dot-notation, token names match their family prefix") or defer naming validation to V2 and remove AC 5. The existing validators don't have a standalone "naming convention checker" — this would be new logic, which contradicts AC 8 ("SHALL reuse existing validators").

**My preference**: Keep AC 5 but scope it to what we can derive from existing infrastructure. The `PrimitiveTokenRegistry` already validates family membership. The `SemanticTokenRegistry` validates dot-notation structure. We can surface those registration-time checks as "naming validation" without writing new logic.

**AC 8 — "SHALL reuse existing validators"**

Strong agreement. The orchestration pattern should be:
1. Build `PrimitiveTokenRegistry` from injected primitives (registration validates naming/family)
2. Build `SemanticTokenRegistry` from injected semantics (registration validates structure)
3. Run `SemanticTokenValidator.validateSemanticReferences()` (reference integrity)
4. Run `MathematicalRelationshipParser.validate()` per primitive (math checks)
5. Collect and report results

This is essentially what `generateTokenFiles()` already does in its validation preamble — the `validate` command extracts that logic into a standalone path.

**AC 10 — "No `--strict` flag is added"**

Good. Clean separation: `validate` is comprehensive, `generate` keeps its existing checks. No flag proliferation.

---

#### Minor Notes on Other Requirements

- **Req 1 AC 4** ("no fallback to package for missing token families"): Good. All-or-nothing is the right call for V1. Partial merge would be a debugging nightmare.
- **Req 2 AC 5** ("SHALL NOT require theme override exports"): Correct — themes resolve from config, not from `tokenSource`.
- **Req 4 AC 5** ("relative path for readability"): Good UX decision. Absolute paths in CLI output are noisy.
- **Req 7**: Adequate for V1. Integration Guide updates can follow in a separate PR if needed.

---

#### Summary of Requested Clarifications

| # | Requirement | Clarification Needed |
|---|-------------|---------------------|
| 1 | Req 3, AC 1 | Specify concrete new signature (or defer to design phase) |
| 2 | Req 3, AC 3 | Enumerate the 4 call sites explicitly |
| 3 | Req 3 | Add AC: "The legacy signature SHALL be removed, not maintained as overload" |
| 4 | Req 3, AC 5 | Clarify: component tokens resolved internally, not injected |
| 5 | Req 5, AC 5 | Scope "naming convention compliance" to what existing registration validates, or defer to V2 |

None of these are blockers — they can be resolved in the design phase. Approve to proceed.
