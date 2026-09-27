# Issue: the Integration Guide's install section points at GitHub Packages, with the wrong scope

**Date**: 2026-09-27
**Status**: ACTIVE
**Owner**: Thurgood (the Integration Guide; the reconciliation author at Task 19)
**Trigger**: **Spec 123 Task 19.4** (U3), where the Integration Guide is reconciled into the install doc. Peter ruled on 2026-09-27 that it be routed there and not folded into U1.
**Source**: Spec 123 U1 Task 7's straggler sweep (Thurgood), recorded in `.kiro/docs/ballots/2026-09-27-123-b-u1-publish-rail.md` § 5.

## The defect

`governance/DesignerPunk-Integration-Guide.md` § "Prerequisites" / "1. Install" (around L22–47 on main) still tells consumers to install through **GitHub Packages via `.npmrc`**:

```
@designerpunk:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

It has two problems:
1. **The wrong registry for the primary path.** Requirement 6.1 / R2 names public npm as the primary install path. (Dual-publish is kept per Q7, but GitHub Packages is not the documented consumer path.)
2. **The wrong scope.** It says `@designerpunk`, not `@3fn`, so anyone following it literally can't install `@3fn/core` at all.

The guide ships in the package (`governance/` is in `files[]`), so the instruction reaches every install. The defect predates Spec 123.

## Why it isn't fixed in U1

Peter's T2 ruling means nothing advertises the onboarding path to strangers before release 3, and there are no known external consumers; dp-portfolio is ours. Task 19.4 rewrites this section as part of reconciling the guide with the install doc, so an earlier patch would be done twice. **Known cost: release 1 (and 2) ship with this instruction still wrong.**

## Scope at 19.4

Correct the install section to public npm with the `@3fn` scope, or replace it with a pointer to the install doc. Sweep the rest of the guide for other `@designerpunk` / `npm.pkg.github.com` mentions.

## Filed by

Steward (main-loop), 2026-09-27, at Peter's direction.
