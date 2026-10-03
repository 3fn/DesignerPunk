# Issue: the application MCP reports `degraded` in a consumer repo because it resolves family-doc companion paths against the consumer's root

**Date**: 2026-10-03
**Status**: ACTIVE
**Owner**: Lina (`application-mcp-server/**` is in my charter scope)
**Trigger**: **the fix PR merges before release 3's tag** (Leonardo's position in the Spec 123 U3 kickoff round, accepted there). Why an event and not the release itself: release 3's RELEASE record cannot honestly say "the application MCP is healthy in a consumer repo" while this stands, and the U5 persona runs (Task 25) read `get_component_health` in a consumer-shaped repo and will read `degraded`. The fix PR is small and independent of U3's onboarding work, so it can run in parallel with U3 and does not need to wait for U3's unit to merge.
**Source**: the 15.0.0 release notes (`docs/releases/release-15.0.0.md` L130: "*Not yet in a tracked issue file at this writing*"); the RELEASE claims pass (`.kiro/specs/123-consumer-distribution/completion/claims-pass-release-15.0.0.md` L133: "the issue is owed (Lina, per the release-prep handoff). Not a finding"). **This is a miss of mine, owned**: the issue was owed from release prep, not filed through the whole of release 2's close, and was found unfiled again at the U3 kickoff round (2026-10-03).

---

## The gap

In a consumer repo, `get_component_health` returns `degraded` with one warning per component family, "`<family>: companion path not found: governance/Component-Family-….md`", although the docs exist and the package ships them. Component and token queries still answer (the 15.0.0 notes report 34 components and the full token index in the one-hop rehearsal); only the health status is wrong, and every consumer agent that checks health first sees a false alarm.

## What I verified on `main` (e25fd512)

- **The comparison that fails**: `application-mcp-server/src/indexer/FamilyGuidanceIndexer.ts` L47–53 (`validateCrossReferences`): `const companionPath = path.resolve(projectRoot, guidance.companion); if (!fs.existsSync(companionPath)) { this.indexWarnings.push(`${family}: companion path not found: ${guidance.companion}`); }`. VERIFIED.
- **`projectRoot` is the consumer's root in a consumer**: `ComponentIndexer.ts` L271 passes `projectRoot` from the options (`L204`: `options.projectRoot ? path.resolve(options.projectRoot) : legacyProjectRoot`), and `application-mcp-server/src/index.ts` L718–719 sets `projectRoot = dsRoot.root ?? packageRoot` ("C3 `projectRoot = bornRoot`"). So in a born repo it is the consumer's directory, which contains no `governance/`. VERIFIED by reading.
- **The guidance files are package-sourced**: the family-guidance directory comes from `guidanceDir` (`index.ts` L796 `guidanceDir: guidance.path`; defaulting to `<legacyProjectRoot>/family-guidance` at `ComponentIndexer.ts` L265, where `legacyProjectRoot` is derived from the package's own components root, L202). So the `companion:` values are package-relative strings resolved against a consumer-relative root. That mismatch is the cause.
- **Nine companions are declared**: `grep '^companion:' family-guidance/*.yaml` gives nine, each `governance/Component-Family-<Name>.md` (Avatar, Badge, Button, Chip, Container, Form-Inputs, Icon, Navigation, Progress). **The notes' "one warning per component family" is nine warnings in the package's own data, by this count; I did not run the MCP in a consumer to count the warnings emitted** (UNVERIFIED; the 15.0.0 rehearsal is the source for the live behaviour).
- **The files do ship**: `package.json` `files` lists `governance/` and `family-guidance/`. VERIFIED. So the paths exist at the package root; they are absent only under the consumer's.
- **How a warning becomes `degraded`**: `FamilyGuidanceIndexer.getHealth()` (L91–97) returns its `indexWarnings` as `warnings`; `ComponentIndexer.ts` L419 folds `guidanceHealth.warnings` into `allWarnings`, and L423–427 set status `degraded` when `allWarnings.length > 0` (and the index is non-empty). VERIFIED.
- **Not re-derived**: that the same cause is the whole of the consumer-side warnings. The notes say "one warning per component family" only; if the consumer rehearsal shows other warnings (token index, patterns), they are outside this issue. UNVERIFIED by me, since I did not run the server in a consumer.

## Fix shape (not done here)

Resolve `companion` against the package's data root, not `projectRoot`: pass the package root (or the directory the guidance directory belongs to) into `validateCrossReferences` as a separate argument, and keep `projectRoot` for what is genuinely consumer-relative. A test: a consumer-shaped `projectRoot` (a temp dir without `governance/`) with the real package guidance must index `healthy` for the companion check; and the existing `FamilyGuidanceIndexer.test.ts` / `GuidanceCompleteness.test.ts` stay green. **Bite**: re-point the resolution back at `projectRoot` and the consumer-shaped case must go red.

## Grant paths

**The fix PR will need a lock grant.** `application-mcp-server/src` is a diff-guard input-closure root (`tools/agent-generator/diff-guard.ts` `INPUT_CLOSURE_ROOTS`, the entry `'application-mcp-server/src'`), so any edit under it moves the `inputClosure` in `canonical/generated.lock`. Filed here before the fixing PR opens (README rule 8), for the owner to refresh the lock at Peter's merge:

**Grant paths**:
- `canonical/generated.lock`

The code edit itself (`application-mcp-server/src/indexer/FamilyGuidanceIndexer.ts`, `application-mcp-server/src/indexer/ComponentIndexer.ts`, and their tests under `application-mcp-server/src/**/__tests__/`) is in my charter write scope and needs no grant. Per the 15.0.0 precedent (`.kiro/issues/2026-10-02-release-15-lock-refresh-grant.md`) the refresh is the guard's own write from a clean tree after the edit; confirm the precedent's mechanics at the fixing PR rather than assuming them. **A fix that stays out of the closure** (for example, correcting only a data file outside the roots) would not need it, but I do not see one: the comparison is in code.

## Counter-argument and what survives

- **Against fixing before release 3**: it is a health-label error with no functional effect, the notes already disclose it, and a lock-moving PR in the application MCP costs a refresh and a verification round in a window that is busy with U3. A tracked, disclosed residual could rest until the first real consumer complaint. Fold-back: I accepted Leonardo's position because the persona runs read exactly this status, so shipping a release whose own validation reads `degraded` would force every run's record to explain it away. **What survives**: the cost is real and the benefit is a cleaner label; if U3 slips, this fix is the first thing that could be carried, with the disclosure in the release notes already written. That is Peter's call, not mine.
- **Against the fix shape**: resolving against the package root makes the health check assert something about the package, not the consumer, so a consumer who deletes or shadows a family doc is not told. Today's check is wrong in the consumer and right in the package; the new one is right in both but weaker about consumer-side overrides. I do not know of a consumer override path for family docs, but I did not look for one. UNVERIFIED.
