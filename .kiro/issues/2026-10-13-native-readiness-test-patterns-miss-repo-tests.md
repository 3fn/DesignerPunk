# Issue: native readiness reads `scaffold` for 32 of 34 components because Spec 086's test patterns do not match the repo's native test files

**Date**: 2026-10-13 · **Status**: ACTIVE · **Owner**: Lina (Application MCP readiness derivation, `application-mcp-server/src/indexer/ComponentIndexer.ts` `derivePlatformReadiness`; Spec 086 design § Decision 4)
**Class**: P2 obligation (guard) · defect *(set 2026-10-20, Lina, rule 12. Accepted. `derivePlatformReadiness` (ComponentIndexer.ts L854-857) still matches native tests as `Tests.swift` / `Test.kt`, so the served readiness collapses to scaffold for nearly every native component: a derivation weaker than the claim it serves, in an MCP response. It understates, never overstates; Stacy may read it higher.)*
**Trigger**: `release:next:phase-1` — the pattern extension (the fix shape below) merges, or the next release's walk reads it as fixed, waived in writing, or blocking. Spec 129's native onboarding is the latest the consumer-facing claim can wait. *(Re-ruled 2026-10-25, Lina, owner, rule 11, after the lapse below: the old `path:` token named a file, not the event; any edit to `ComponentIndexer.ts` fires it, and #471's edit was unrelated. A P2 that would ride another change takes the release token, ballot 2026-10-22-trigger-names-the-event-not-the-vehicle. Was: `path:application-mcp-server/src/indexer/ComponentIndexer.ts` — Lina's next Application-MCP session, where the patterns are extended; and before any consumer-facing claim that native readiness is meaningful (Spec 129's native onboarding at the latest).)*
**Source**: found by Lina while fixing release-3 item 5 (`fix/application-mcp-consumer-readiness`); recorded by the orchestrator at her request (she cannot write `.kiro/issues/` under her charter).

## The gap (verified by Lina's scan, 2026-10-13)
Spec 086's readiness derivation looks for native tests as `*Tests.swift` / `*Test.kt`. The repo's native tests are `*.ios.test.ts` / `*.android.test.ts`, so `hasTests` is false on iOS and Android for almost every component and the status collapses to `scaffold` (32 of 34 in the repo itself; the consumer now mirrors the repo through the build-time record, so it reads the same). Web readiness is unaffected.

## Fix shape
Extend the native test patterns to the repo's actual forms (and decide whether a `.ios.test.ts` Jest file counts as "tests" for a SwiftUI component — it exercises the TS-side parity, not the Swift); regenerate `packageReadiness.generated.ts` (`UPDATE_PACKAGE_READINESS=1 npx jest PackageReadiness` from `application-mcp-server/`); a dated note in Spec 086 § Decision 4. Not part of release-3 item 5.

**Walk 2026-10-20 (Thurgood, walk line under rule 9; ledger `archive/TRIAGE-2026-10-20.md` row 67, call BACK-FILL)**: this record lacks the rule-1 Trigger token (`**Trigger**: ` followed by one of `tag:v<semver>`, `merge:#<N>`, `path:<glob>`, `release:<ver>:phase-1` or `manual`) and the rule-12 `**Class**:` header. That is a walk finding. The owner writes both (rule 9); the steward writes neither. Steward's proposal, which the owner may override: Live (`ComponentIndexer.ts` L856, `testPatterns: [/Tests\.swift$/]`). Proposed `path:application-mcp-server/src/indexer/ComponentIndexer.ts` · `P2 obligation (guard) · defect`.

## Lapse (2026-10-25)

Firing commit `83cfae189` (#471, row 5, the Application MCP missing-root warning). Signed Lina (owner, rule 11; observed at session start, Start Up Tasks item 9).

The `path:` trigger fired because #471 edited `application-mcp-server/src/indexer/ComponentIndexer.ts`. **The edit did not address this record.** It added `rootSources` and `envVarName` to the indexer's constructor and a warning for a missing `env` root (55 insertions, 1 deletion). `derivePlatformReadiness` is untouched: L910-911 still read `testPatterns: [/Tests\.swift$/]` and `[/Test\.kt$/]`, so native readiness still collapses to `scaffold` for 32 of 34 components. No commit that is an ancestor of `83cfae189` closed or re-ruled the record, so it lapses (rule 11).

This is a P2 `(guard)`, so under rule 11 the first lapse goes to Peter with exactly three options. Escalation owed in the next walk's batch (no `**Open for Peter**` line: this is not a P0 or floor ask):
- **spec**: Spec 129's native-onboarding design phase carries the readiness derivation (and the decision below).
- **drop**: accept `scaffold` as the served native readiness and withdraw the record; cost: the derivation stays weaker than the claim it serves, and any consumer-facing readiness claim for native must then say so.
- **fix-now**: the pattern extension plus `packageReadiness.generated.ts` regeneration lands in a PR no later than the next release's S. Lina's recommendation (a two-line pattern change, one design decision: does a `.ios.test.ts` Jest file count as a native test; Stacy reads parity). Surviving counter-argument: counting a TS-side parity test as native "tests" could raise readiness past what the Swift/Kotlin has been exercised on (readiness is an overstatement risk the record's "understates, never overstates" class note currently excludes).

The Trigger line above is re-ruled to the fix-now shape (`release:next:phase-1`, a git-visible event no later than the next release's S) so the record is not left on an unfireable token; Peter's pick may re-rule it again.

## Lapse (2026-10-29)

Firing commit `38f4ece47` (#505, the squash tagged `v16.1.0`: release 16.1.0's S). No ancestor of S closed or re-ruled this record: it is in Stacy's recount, `.kiro/specs/123-consumer-distribution/completion/claims-pass-release-16.1.0.md` § "What lapses at S, recounted from commits that are ancestors of S", and no heading named this SHA. Appended by the walker at release 16.2.0's walk (`.kiro/issues/2026-10-29-release-16.2.0-walk.md`; rule 11: whoever observes a lapse appends). It records the lapse and decides nothing else; the owner's disposition stands. Signed Thurgood (steward, rule 11), 2026-10-29.
