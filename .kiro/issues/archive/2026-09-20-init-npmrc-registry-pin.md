# Issue: `init` scaffolds a GitHub-Packages registry pin (D-live-1)

**Date**: 2026-09-20
**Status**: CLOSED — fixed in the same-day PR (`fix/init-npmrc-registry-pin`); filed directly to archive/ per the issues convention (born-closed record)
**Owner**: main-loop (Peter-directed, ruled 2026-09-20)
**Source**: Spec 123 design-outline defect survey (D-live-1), verified against `@3fn/core` source 2026-09-20; hazard originally recorded in `.kiro/specs/123-consumer-distribution/inbound-from-13.0.0-release.md` §2(c)

## Defect

`npx designerpunk init` (`src/cli/init.ts`) scaffolded an `.npmrc` containing `@3fn:registry=https://npm.pkg.github.com` into every consumer repo, and its "Next steps" output instructed consumers to set `GITHUB_TOKEN` (read:packages). Effect: every scaffolded consumer was silently pinned to GitHub Packages — the exact stale-scope-mapping hazard the 13.0.0 release empirics warned about — contradicting the public-npm-primary ruling (R2, Peter, 2026-09-20).

## Fix

- `init` no longer writes an `.npmrc` (public npm needs no scope mapping); explanatory comment left at the site.
- "Next steps" `GITHUB_TOKEN` instruction removed.
- Regression guard: `src/cli/__tests__/init.test.ts` now asserts `.npmrc` is NOT created.

## Out of scope (routed)

- **Repairing already-pinned consumers**: `sync` registry-pin detection is Spec 123 U1 scope.
- **GH-Packages mirror vs drop** (publish-side disposition): Spec 123 open question Q7 — deliberately separated from this template defect; the fix stands under either disposition.
- **D-live-2 (imposter copies) and D-live-3 (stale `product-template/agents/`)**: routed to Spec 123 U2 (the consumer generation profile) — the spec is the fix; patching them ahead would front-run its core design decision.
