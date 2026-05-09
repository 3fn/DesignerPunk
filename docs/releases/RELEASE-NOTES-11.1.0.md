# Release 11.1.0

**Date**: 2026-05-07  
**Previous**: 11.0.0  
**Bump**: minor

## 🟡 Consumer Onboarding Fixes

- **Reconciliation and Publish Preparation** *(Consumer-facing)*
  Closed all 5 consumer-onboarding gaps surfaced during Spec 101's first-consumer verification, plus resolved all 49/87 steering doc metadata errors (63 total errors → 0). The package now ships with clean metadata, working MCP config scaffolding, a merge-safe init flow, and a concrete Integration Guide that a consumer can follow without external guidance.
- **Publish 11.0.0 and Verify** *(**Published package**)*
  Published `@3fn/core@11.0.0` to GitHub Packages as DesignerPunk's first reconciled public release — the first publish where the package name, scope, metadata, and Integration Guide are all aligned with the shipped reality. Verified end-to-end against a fresh product repo (`DP-PortfolioSite`), tagged `v11.0.0`, and captured nine follow-up items (4 release-tool, 5 consumer-onboarding) in dedicated issue files.
