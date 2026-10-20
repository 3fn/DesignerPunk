# Issue: a plain `generate` decides whether to rebuild product tokens from the product YAML's file times only, so changes to the token source or the config can leave product-token output stale with no message

**Date**: 2026-10-12
**Status**: ACTIVE
**Owner**: Ada (product-token pipeline correctness). Lina is consulted for the CLI surface (`src/cli/staleness.ts` sits under `src/cli/**`, her surface per `2026-10-03-generate-product-only-resolves-from-cwd.md`).
**Trigger**: whichever fires first:
- **a `fix/` PR opened on Peter's go**;
- **the PR that fixes `2026-10-03-generate-product-only-resolves-from-cwd.md`**, which edits `runProductOnly`, a caller of `isProductTokenStale`;
- **Spec 129's design phase opening**. Its consumer-generation work changes what product tokens reference.

Not blocking release 3: CI need N1 already runs `generate --force`.
**Source**: Ada's Spec 123 U3c (Task 31) fact-check, 2026-10-12. Thurgood's Task 21 bite run verified the masking by run: a backdated product YAML change was skipped by a plain `generate` and caught by `--force`. Peter's go was to file, not to fix.

*(The false code comment from the same fact-check, `generateTokenFiles.ts:17-18`, is recorded as an addendum to `2026-10-03-generate-reports-success-after-validation-abort.md` instead, because that record's fix PR edits the same lines.)*

---

## The gap (VERIFIED by reading on `main`)

`isProductTokenStale` (`src/cli/staleness.ts:36-62`) returns "stale" only if:
- `--force` is passed;
- the product tokens directory or an output file is missing;
- a product YAML file is newer than the oldest output file.

It looks at nothing else. In particular, it does not look at:
- **the token index** (`token-index/`). Product output is resolved from it: the platform names a `ref:` resolves to, and whether the reference is theme-varying (`src/build/product/ProductTokenGenerator.ts:135-138`, `resolvedPlatformPath` and `themeVarying`);
- **`designerpunk.config.ts`**. `name` and `abbreviation` are written into the product Swift and Kotlin (`src/cli/generateProductTokens.ts:33-34,49-50`; `src/build/product/emitters/SwiftEmitter.ts:11`, `KotlinEmitter.ts:11`).

`runGenerate` consults it before regenerating product tokens (`src/cli/designerpunk.ts:287-297`, `isProductTokenStale(config, force)`).

## Concrete failures (derived from the code; not run by Ada)

1. **A reference target changes.** Rename or move a system token that a product token references, and fix the product YAML's `ref:` in the same change. The YAML is newer, so this case regenerates.
   - But change only the token source in a way that alters a still-valid reference's resolved platform name or its theme-varying status. Then the YAML is unchanged and a plain `generate` prints `⏭ Product tokens up-to-date` (`src/cli/designerpunk.ts:292`), and `ProductTokens.*` keeps the old names.
   - Nothing reports it. `validate --product-tokens` checks that references resolve, not that the output is current.
2. **The config changes.** Edit `name` or `abbreviation`, and the product Swift and Kotlin keep the old `<Name>Theme` and `Local<ABBR>Theme` identifiers until a YAML file changes or `--force` is passed.

**Consumer consequence.** The install guide's Reference says: "Product token generation automatically detects staleness — if your YAML source files haven't changed since the last build, generation is skipped." That is true, but a consumer following "run `generate` on every token change" (§ 4) has no way to learn that a token-source change can leave product tokens stale.

**CI consequence.** None for N1 as written, because N1 runs `npx designerpunk generate --force` (`src/cli/templates/starter-specs/ci-needs/needs.md`, N1 Check). A team that drops `--force` from its CI step reintroduces the gap.

## Unverified

- Either failure, by run.
- How often case 1 arises in practice. It needs a token-source change that keeps a reference valid but changes its resolution.
- Whether the web emitter's output for a `ref:` embeds a resolved name that can go stale in the same way. I read the Swift and Kotlin paths only.

## Fix shape (not done here; the pick is Peter's)

There are three defensible options, and I don't pick between them:
1. **Widen the inputs.** Treat the product output as stale when `token-index/` or `designerpunk.config.ts` is newer than the oldest output.
2. **Content-hash staleness.** Store a hash of the inputs (product YAML, the referenced index entries, `name`/`abbreviation`) and compare it. This pairs with option 3 of `2026-10-03-generate-output-not-deterministic.md`.
3. **Drop the staleness check.** Product-token generation is small, and always regenerating removes the class. It also removes `--force`'s only remaining effect.

Whichever is picked:
- add a test: change the input without touching the YAML; a plain `generate` regenerates;
- if option 3 is picked, correct the guide sentence and N1's `--force` explanation.

## Grant paths

**Proposed for Peter.** This list is not activated by this record; README rule 8.
- `src/cli/staleness.ts`
- `src/cli/__tests__/` (the staleness tests; file named when the PR opens)
- `src/cli/designerpunk.ts`, only for option 3

These paths are outside Ada's write scope. The guide sentence and N1 text are changed by their owners' own PRs.

## Counter-argument and what survives

- **"YAML-only staleness is the documented behaviour (Spec 114), so this is a feature."**
  - Fold-back: it is documented, and the guide states it.
  - **What survives**: the documented rule silently omits two inputs the output depends on. A user who follows the install guide's own lifecycle sentence can ship stale product tokens.
- **"N1 already covers it."**
  - **What survives**: only in CI, only with `--force`, and only for teams that adopt N1, which is a minimal-core need but optional to adopt.

**No fix is authorized by this record.**

**Walk 2026-10-20 (Thurgood, walk line under rule 9; ledger `archive/TRIAGE-2026-10-20.md` row 60, call BACK-FILL)**: this record lacks the rule-1 Trigger token (`**Trigger**: ` followed by one of `tag:v<semver>`, `merge:#<N>`, `path:<glob>`, `release:<ver>:phase-1` or `manual`) and the rule-12 `**Class**:` header. That is a walk finding. The owner writes both (rule 9); the steward writes neither. Steward's proposal, which the owner may override: Proposed `manual` · `P2 obligation (guard) · defect` (the staleness check is weaker than "up to date").
