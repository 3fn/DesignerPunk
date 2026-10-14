# Issue: native readiness reads `scaffold` for 32 of 34 components because Spec 086's test patterns do not match the repo's native test files

**Date**: 2026-10-13 · **Status**: ACTIVE · **Owner**: Lina (Application MCP readiness derivation, `application-mcp-server/src/indexer/ComponentIndexer.ts` `derivePlatformReadiness`; Spec 086 design § Decision 4) · **Trigger**: Lina's next Application-MCP session; before any consumer-facing claim that native readiness is meaningful (Spec 129's native onboarding at the latest).
**Source**: found by Lina while fixing release-3 item 5 (`fix/application-mcp-consumer-readiness`); recorded by the orchestrator at her request (she cannot write `.kiro/issues/` under her charter).

## The gap (verified by Lina's scan, 2026-10-13)
Spec 086's readiness derivation looks for native tests as `*Tests.swift` / `*Test.kt`. The repo's native tests are `*.ios.test.ts` / `*.android.test.ts`, so `hasTests` is false on iOS and Android for almost every component and the status collapses to `scaffold` (32 of 34 in the repo itself; the consumer now mirrors the repo through the build-time record, so it reads the same). Web readiness is unaffected.

## Fix shape
Extend the native test patterns to the repo's actual forms (and decide whether a `.ios.test.ts` Jest file counts as "tests" for a SwiftUI component — it exercises the TS-side parity, not the Swift); regenerate `packageReadiness.generated.ts` (`UPDATE_PACKAGE_READINESS=1 npx jest PackageReadiness` from `application-mcp-server/`); a dated note in Spec 086 § Decision 4. Not part of release-3 item 5.
