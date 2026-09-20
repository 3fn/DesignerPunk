# Issue: `init`'s scaffolded tsconfig re-pins package subpaths to raw `src/` (Ada R1 A2)

**Date**: 2026-09-20
**Status**: CLOSED — fixed in the same-day PR (`fix/init-tsconfig-src-repin`); filed directly to archive/ per the issues convention (born-closed record)
**Owner**: main-loop (routing ruled by Thurgood R2, same discriminator as D-live-1: the spec is not the fix)
**Source**: Ada's R1 advisory A2 on the Spec 123 design-outline round (`.kiro/specs/123-consumer-distribution/feedback/design-outline.md` § [ADA R1]), verified against source

## Defect

`npx designerpunk init` scaffolded a `tsconfig.test.json` whose `paths` block re-pinned five subpaths (`@3fn/core/{blend,build,types,testing,config}`) to `./node_modules/@3fn/core/src/**/*.ts` — raw TypeScript source. Spec 118 reconciled the package's exports map to compiled `dist` d.ts precisely so consumers never resolve raw `src/`; the scaffolder undid that contract in every consumer repo it created (same "package correct, scaffolder undoes it" class as the D-live-1 `.npmrc` pin). It also created a hard constraint the Spec 123 packaging diet would otherwise have had to reason around: with consumers type-resolving into `src/`, `src/` could never leave `files[]`.

## Fix

- `init.ts`: `paths` + `baseUrl` removed from the scaffold; subpath types resolve through the package exports map (the Spec 118 contract). Explanatory comment left at the site.
- `init.test.ts`: regression guard — scaffolded tsconfig must have no `compilerOptions.paths` and no `@3fn/core/src` reference.

## Out of scope (routed)

- Repairing already-scaffolded consumers' tsconfigs: Spec 123 U1 (`sync` repair scope, alongside the registry-pin repair).
- The packaging-diet `src/` floor itself: Spec 123 U1 (decision downstream of the theme-authoring export surface, per Ada R1 B1–B3).
