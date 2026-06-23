# @3fn/core Feedback — v12 upgrade silently removed in-use tokens

**Date**: 2026-06-12
**Reporter**: Sparky (web platform) with Peter Michaels Allen
**Affected consumer**: dp-portfolio (designerpunk.ai)
**Core versions**: 11.8.0 → 12.0.3 (installed: 12.0.4)
**Severity**: High — shipped broken to production (live site), silent failure

---

## What happened

Upgrading `@3fn/core` from `11.8.0` to `^12.0.3` removed multiple system tokens that the
portfolio actively consumes. After regeneration (`npx designerpunk generate`), the generated
`DesignTokens.web.css` no longer defined these tokens, so every `var(--…)` reference to them
became invalid and the declaration was dropped — collapsing section spacing, dropping a heading/nav
color, and (where a fallback existed) silently rendering a wrong value.

### Tokens removed by v12 that the portfolio still references

| Token | Pre-v12 value (11.8.0) | v12.0.4 | Consumer impact |
|---|---|---|---|
| `--space-sectioned-expansive` | `space-1600` = 128px | removed | section padding → 0 (multiple sections) |
| `--space-sectioned-generous` | `space-1200` = 96px | removed | section padding → 0 |
| `--space-900` | 72px | removed | block gaps → 0 (logo/stats layout) |
| `--color-text-strong` | `rgba(10,10,15)` | removed | nav/heading color falls through |

The sectioned-spacing scale was compressed to `none/tight/normal/loose` (max `space-600` = 48px),
and the large spacing primitives (`space-900/1200/1600`) were removed entirely. There is **no
equivalent token** in v12 to repoint to — the values the portfolio was designed around no longer
exist in the system.

(Note: `--space-175` and `--font-size-025` were also found dangling, but these were *never*
defined and are pre-existing consumer bugs — NOT v12 casualties. Tracked separately.)

## When

- Introduced: commit `e4e42dc` (2026-06-12), which bumped `@3fn/core` 11.8.0 → `^12.0.3`.
- Detected: 2026-06-12 evening, by visual inspection of the live index page (not by any build/CI gate).

## How / why it reached production

1. **Major version bump bundled into a feature commit.** `e4e42dc` ("Spec 008: Rosetta
   documentation page") bundled the 11→12 core upgrade + token regeneration together with an
   unrelated feature. The breaking dependency change had no isolated review.
2. **No migration guide.** v12.0.x ships no CHANGELOG or migration notes (none found in the
   package). A major version per semver signals breaking changes; consumers had nothing to act on.
3. **Incomplete consumer sweep.** The regeneration updated ~4 lines of portfolio.css (rgba→oklch
   color conversions) but left 12+ references to the removed tokens dangling.
4. **Silent failure mode.** Undefined `var()` with no fallback drops the declaration rather than
   erroring. No build step validated that consumer references resolve, so a green build shipped a
   visually broken page.

## The deeper concern: promotion safety

The most serious issue is not "don't edit system tokens locally." It is that **promoted tokens are
not safe.** The promotion path (product → system, via Ada) exists so a value can graduate into the
core. If a later core release can silently remove a promoted/published token, promotion becomes a
liability: a consumer does the right thing, graduates a token, and a subsequent upgrade deletes it
out from under them. **Removing or renaming a published system token without a deprecation cycle is
not acceptable.** The core team should determine the optimal mechanism (see below).

## What we need to be better (asks for the core team)

1. **Never remove/rename a published token without a deprecation cycle.** Keep the old token as an
   alias to its replacement for at least one major version, with a generation-time deprecation
   warning. Hard removal should be the end of a cycle, not the start.
2. **Ship a migration guide / CHANGELOG with every major (and breaking) release** — explicit
   added / removed / renamed / value-changed token lists.
3. **Honor semver, or signal louder.** A `^12.0.3` range silently pulled 12.0.4. If patch/minor
   releases can change token sets, that expectation needs to be stated.
4. **Provide a generation drift report.** `generate` should emit added/removed/renamed/value-changed
   vs. the previous run so consumers get a keep/kill review opportunity before accepting a regen.
5. **(Consumer-side, our responsibility — not core's):** isolate core upgrades into dedicated PRs,
   pin exact versions, and add a CI check that validates every `var(--…)` reference resolves
   against the generated token set (turns this class of bug into a red build).

## Immediate consumer mitigation (dp-portfolio)

Re-authored the 4 removed values as **product tokens** (`--product-*`) to unblock and restore the
live site. This is deliberate, tracked debt: if these belong at the system level, they need to be
re-promoted to core once the core team resolves the deprecation/promotion-safety question, and the
product-level shims removed. See repoint in `product/tokens/layout.yaml`, `color.yaml`,
`typography.yaml` and `src/styles/portfolio.css`.
