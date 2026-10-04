# Task 21 bite-run findings — Ada's read

This is read-only. I checked against `task/123-u3-onboarding` at `ea348aa76`, with Thurgood's 19.4 edits uncommitted in the working tree; guide line numbers are from that tree. I ran nothing in a born repo. **V** means I read it in source or ran it here; **U** means unverified.

---

## (a) `validate` fails on unmodified token source

**Is it true? Yes. V by run in this repo**: `npx designerpunk validate` reports:
- Required fields, family membership and semantic references: ✅
- Mathematical relationships: ❌, with 102 errors
- Exit code: 1

The token source here is unmodified, so a born repo copying it will fail the same way (U by run there; Thurgood reports it ran).

**Is it mine? Yes, and it is already tracked as my own open issue**: `.kiro/issues/2026-06-24-mathematical-relationship-parser-validation-gaps.md`, triaged 2026-06-25 as the "highest-priority open issue" and scheduled for after Spec 118. The cause is in the validator, not the tokens. `MathematicalRelationshipParser` evaluates descriptive `mathematicalRelationship` strings ("lightest", `bezier(...)`), uses too tight a float tolerance, and does not handle exponents or special-case literals.

**My miss**: in my 19.4 review I confirmed L92 and the reference text at L421 without running `validate`.

**Correct now? Yes, two sentences.**

**Region § 4, L92.** Replace "`validate` validates token definitions against the active source, and is worth running after you edit token source files." with:

```markdown
`validate` validates token definitions against the active source. One of its four checks, mathematical relationships, currently fails even on unmodified token source, so `validate` exits non-zero; that is a known defect in the checker, not in your tokens. Its other three checks are still worth reading after you edit token source files.
```

**Reference, L421.** Replace "Run it after editing token source files to catch errors before generation." with:

```markdown
The mathematical-relationships check currently fails even on unmodified token source and makes `validate` exit non-zero (a known checker defect); read the other three checks' results after editing token source files.
```

Ledger for both replacements:

| Claim | Source |
|---|---|
| Four checks | V `src/cli/validate.ts:36-39` |
| Exits 1 | V, ran it here |
| The cause is the parser | V, the issue file above; `src/cli/validate.ts` `validateMathematicalRelationships` |

INSTALL.md is derived from the region, so the L92 change must be re-derived there.

**For Thurgood**: the CI-needs header line "`validate`: validates token definitions against the active source" (needs.md:15) describes the verb only; no need runs bare `validate`, so it is fine. Any future need that gates on bare `validate` would be red from day one.

---

## (b) `generate` is not deterministic

**Is it true? Yes, and V by source.** Every system output file except the Figma JSON stamps a wall-clock time:

| Output | Source |
|---|---|
| `DesignTokens.web.css`, `.ios.swift`, `.android.kt` | `src/providers/WebFormatGenerator.ts:63,69`, `iOSFormatGenerator.ts:64,70`, `AndroidFormatGenerator.ts:51,58,72` |
| `ComponentTokens.*` | `src/generators/TokenFileGenerator.ts:301,307,376,382,455,461` |
| DTCG `generatedAt` | `src/generators/DTCGFormatGenerator.ts:238` |
| `DesignTokens.figma.json` | V: no timestamp (none in `dist/DesignTokens.figma.json`) |

That makes 7 stamped files, matching Thurgood's count.

**Also stamped, and missed so far**: the three product-token files, `ProductTokens.*` under `<output>/product/`. They stamp a differently worded line, "Product tokens — generated <ISO>" (`src/build/product/emitters/WebEmitter.ts:12`, `SwiftEmitter.ts:25`, `KotlinEmitter.ts:36`). N1's `-I` regex does not match that line (see (c)).

I have not verified by run that the output is byte-identical apart from the timestamps. The generators sort deterministically by inspection only. Thurgood's run is the evidence.

**Is it mine? Yes**: generators and providers are Rosetta. The class fix is to make generation deterministic by dropping the wall-clock stamps. The package version already identifies the build, and DTCG `generatedAt` could be removed or taken from `SOURCE_DATE_EPOCH`.

The counter-argument: a timestamp helps someone debug a stale file. A version or content-hash line serves that purpose without breaking N1.

I'll file this as an issue. It is not a 19.4 change.

**Correct an install-region sentence of mine now?** No. None of my region sentences claim byte-identical output. § 8's N1 example sentence is not mine.

---

## (c) CI needs

### N1 — CONFIRMED-WITH-CORRECTIONS

There are two corrections.

**1. Product-token stamps are not ignored.** The `-I` pattern misses the product-token timestamp lines, so N1 goes red on every run once `productTokens` is set. This is V by source; the `-I` behaviour itself is git's (U by run).

**2. Product-token staleness depends on file times.** Staleness is decided by file modification times (`src/cli/staleness.ts:36-60`), and a fresh CI checkout gives every file its checkout time. Without `--force`, `generate` may therefore skip regenerating product tokens and leave a committed-but-stale product file unchecked. `--force` affects only product tokens and is harmless without them (`src/cli/designerpunk.ts:287-297`). This is V by source; the checkout mtime behaviour is git's (U by run).

**Replace the N1 Check bullet (needs.md:24-26) with:**

```markdown
- **Check**: run `npx designerpunk generate --force` (`--force` regenerates product tokens even when their files look unchanged; without product tokens it changes nothing), then fail if any file under the `output` directory in `designerpunk.config.ts` differs from its committed version, or is new and uncommitted. Ignore the timestamp lines: every `generate` run rewrites a timestamp in each stamped file (a `Generated:` line, the DTCG file's `"generatedAt"` value, and a `Product tokens — generated` line in product-token files), so a byte comparison would be red on every run. With git 2.30 or later:
  - `git diff --exit-code -I 'Generated: |generatedAt|Product tokens — generated' -- <your output directory>` exits non-zero on a real difference;
  - `git status --porcelain --untracked-files=all -- <your output directory>` prints nothing.
```

**Bite recipe — confirmed (V by source)**:
- `src/tokens/SpacingTokens.ts` exists.
- `generate` does not run the math check; only the semantic-reference check runs (`src/generators/generateTokenFiles.ts:63-95`).
- So a changed spacing value changes the CSS, and the check bites.

### N2, token example — CONFIRMED (token side)

| Claim | Source |
|---|---|
| A `normal` key exists under `grouped` | V `src/tokens/semantic/SpacingTokens.ts:33,58` |
| It emits `--space-grouped-normal` | V `dist/DesignTokens.web.css:850` |
| Components reference it | V `Button-CTA` and `Input-Radio-Base` web CSS |
| It is in the shipped name contract | V `dist/name-contract.json` |
| Renaming it does not break `generate` | V: the only other `grouped.normal` occurrence in token source is a comment (`src/tokens/semantic/index.ts:284`), and the dark/WCAG overrides name no spacing tokens |

The exact `sync` message text is Lina's and Thurgood's surface. I did not check it.

### N4 — CONFIRMED

| Claim | Source |
|---|---|
| `generate` refreshes `token-index/` | V `src/cli/designerpunk.ts:268` |
| `validate --product-tokens` exits 1 on broken refs | V `src/cli/validateProductTokens.ts:48-53` |
| `generate` only warns on broken refs, so the validate step is what makes the check red | V `src/cli/generateProductTokens.ts:13-16` (relative) |
| `space999` does not exist | V |

Caveat (no change needed, since CI runs at the repo root): `validate --product-tokens` reads `token-index/` from cwd (`src/cli/validateProductTokens.ts:23`).

---

## Code issues for me to file, outside 19.4 and 21

- **Deterministic generation**: drop the wall-clock stamps.
- **Validator math-check fix**: already filed as the 2026-06-24 issue. It is now consumer-visible in the install doc, which argues for raising its priority.
- **Carried over from earlier**:
  - `generate` reports success after an override-validation abort.
  - Root vs cwd inconsistency for `token-index/`.
  - `--help` wording.
  - `SemanticOverrideMap` is not exported.
