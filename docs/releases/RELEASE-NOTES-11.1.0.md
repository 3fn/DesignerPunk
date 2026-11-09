# Release 11.1.0

> **Never released (corrected 2026-11-09, Thurgood, release author).** There is no `v11.1.0` tag and no 11.1.0 publish: Spec 102's "publish 11.1.0" step never ran, the version was skipped, and 102's work shipped in **11.2.0** (`v11.2.0`, `9f954cf68`, via Spec 103). The text below is kept as written, because Spec 102's `tasks.md` cites this file; it describes no release. Record: `.kiro/issues/2026-11-04-release-notes-11-1-0-describes-a-release-that-never-shipped.md`.


**Date**: 2026-05-07  
**Previous**: 11.0.0  
**Bump**: minor

## 🟡 Consumer Onboarding Fixes

- **Reconciliation and Publish Preparation** *(Consumer-facing)*
  Closed all 5 consumer-onboarding gaps surfaced during Spec 101's first-consumer verification, plus resolved all 49/87 steering doc metadata errors (63 total errors → 0). The package now ships with clean metadata, working MCP config scaffolding, a merge-safe init flow, and a concrete Integration Guide that a consumer can follow without external guidance.
- **Publish 11.0.0 and Verify** *(**Published package**)*
  Published `@3fn/core@11.0.0` to GitHub Packages as DesignerPunk's first reconciled public release — the first publish where the package name, scope, metadata, and Integration Guide are all aligned with the shipped reality. Verified end-to-end against a fresh product repo (`DP-PortfolioSite`), tagged `v11.0.0`, and captured nine follow-up items (4 release-tool, 5 consumer-onboarding) in dedicated issue files.
