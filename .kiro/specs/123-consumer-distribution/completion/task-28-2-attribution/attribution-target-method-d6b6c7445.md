# Tarball assertion — target method @ d6b6c7445

| Lever | target (tarball-target.json) | baseline listing (base-pack.json) | target method @ d6b6c7445 | delta vs target | direction |
|---|---|---|---|---|---|
| entryCount | 1597 | 1533 | 1675 | +78 (4.88%) | above target |
| size | 5863534 | 5826868 | 6417443 | +553909 (9.45%) | above target |
| unpackedSize | 21308710 | 21165735 | 23073027 | +1764317 (8.28%) | above target |

**Baseline reproduction**: the baseline listing has 1533 entries; the target declares 1597. The per-path attribution below is against the baseline listing, and that gap is stated, not absorbed.

## Added paths: 183

- **138 path(s), 1650769 bytes** ← 669b51b09 U2b consumer generation profile: machinery, rendering & G2 (123) (#262)
  - `dist/cli/attach.d.ts`
  - `dist/cli/attach.js`
  - `dist/cli/shared/vocabulary.d.ts`
  - `dist/cli/shared/vocabulary.js`
  - `dist/cli/sync/KeyGrain.d.ts`
  - `dist/cli/sync/KeyGrain.js`
  - `dist/cli/sync/Migration.d.ts`
  - `dist/cli/sync/Migration.js`
  - `dist/cli/sync/NameContract.d.ts`
  - `dist/cli/sync/NameContract.js`
  - `dist/cli/sync/RegionGrain.d.ts`
  - `dist/cli/sync/RegionGrain.js`
  - … 126 more
- **14 path(s), 73720 bytes** ← cdb8296fa U3 onboarding (123) (#321)
  - `dist/cli/shared/gitignoreRegion.d.ts`
  - `dist/cli/shared/gitignoreRegion.js`
  - `dist/cli/shared/personalNote.d.ts`
  - `dist/cli/shared/personalNote.js`
  - `docs/consumer/COMMIT-POLICY.md`
  - `docs/consumer/INSTALL.md`
  - `src/cli/templates/personal-note.example.md`
  - `src/cli/templates/personal-note.template.md`
  - `src/cli/templates/product/experience-map/pages/example-home.yaml`
  - `src/cli/templates/product/overview.yaml`
  - `src/cli/templates/product/templates/home-layout.yaml`
  - `src/cli/templates/starter-specs/ci-needs/needs.md`
  - … 2 more
- **6 path(s), 313115 bytes** ← (no commit after d566b30ff) inside U1 after the target was written: b32ce8ace..d566b30ff, PR #215
  - `CHANGELOG.md`
  - `dist/cli/shared/mcpConfig/cc.d.ts`
  - `dist/cli/shared/mcpConfig/cc.js`
  - `dist/cli/shared/mcpConfig/kiro.d.ts`
  - `dist/cli/shared/mcpConfig/kiro.js`
  - `dist/generator/consumer-entry.js`
- **6 path(s), 23037 bytes** ← e3bc68a6f find_docs indexer fix: fence-aware headings, co-occurrence-gated H3/H4, iOS atoms — pre-registered, ACCEPTED on a fresh blind set 
  - `mcp-server/src/discovery-dry-run/__tests__/fix-compare.test.ts`
  - `mcp-server/src/discovery-dry-run/fix-compare.ts`
  - `mcp-server/src/query/__tests__/find-docs-deep-headings.corpus.test.ts`
  - `mcp-server/src/query/__tests__/find-docs-deep-headings.test.ts`
  - `mcp-server/src/query/__tests__/token-atoms.test.ts`
  - `mcp-server/src/query/token-atoms.ts`
- **3 path(s), 22705 bytes** ← c9679e48b Fix Application MCP readiness in a consumer: build-time readiness record for packaged components (release-3 item 5) (fix) (#338)
  - `application-mcp-server/src/indexer/__tests__/PackageReadiness.test.ts`
  - `application-mcp-server/src/indexer/packageReadiness.generated.ts`
  - `application-mcp-server/src/indexer/packageReadiness.ts`
- **3 path(s), 22495 bytes** ← dcd337dcf find_components Stage 0: stop words, plural folding, tier-aware rank, category demotion, internal-only viability, sibling metadata
  - `application-mcp-server/src/indexer/__tests__/termNormalization.test.ts`
  - `application-mcp-server/src/indexer/termNormalization.ts`
  - `application-mcp-server/src/query/__tests__/Stage0LexicalFixes.test.ts`
- **2 path(s), 10499 bytes** ← a8856d023 Components tokenizer: iOS-family atoms (twin of the docs-side fix) — follow-ups row 11 (Lina) (#328)
  - `application-mcp-server/src/indexer/__tests__/tokenAtoms.test.ts`
  - `application-mcp-server/src/indexer/tokenAtoms.ts`
- **2 path(s), 4140 bytes** ← c2629954f Fix generate determinism: no wall-clock stamps, headers name the @3fn/core version (release-3 item 3) (fix) (#339)
  - `dist/generators/coreVersion.d.ts`
  - `dist/generators/coreVersion.js`
- **2 path(s), 5420 bytes** ← 1ca8b6e4d Fix Jest preset: subpaths map to shipped dist/ via exports; .gitignore remedy named (release-3 items 2 + 8) (fix) (#336)
  - `dist/testing/presetMappings.d.ts`
  - `dist/testing/presetMappings.js`
- **2 path(s), 14659 bytes** ← aa7b7c08e Discovery shadow study — Stage 1 (docs side): pre-registered run, 13 owner-ruled misses, O1 fires under Peter's Reading A ruling; 
  - `mcp-server/src/discovery-dry-run/__tests__/study-scoring.test.ts`
  - `mcp-server/src/discovery-dry-run/study-scoring.ts`
- **1 path(s), 2718 bytes** ← 35571fe20 Fix Application MCP health in a consumer: companion paths resolve against the package's guidance root (pre-15.1.0 fix) (fix) (#345
  - `application-mcp-server/src/indexer/__tests__/ConsumerCompanionPaths.test.ts`
- **1 path(s), 7616 bytes** ← cbf67c07b validate_assembly checks prop values against the schema (T3); find_components states filter rows are untiered (T2) (Lina; from the
  - `application-mcp-server/src/validation/PropValueChecker.ts`
- **1 path(s), 3993 bytes** ← 18c87a8f5 find_docs concept mode honours limit and cursor: default 20, nextCursor paging, applied after ranking (Thurgood; option (a), recor ; e3bc68a6f find_docs indexer fix: fence-aware headings, co-occurrence-gated H3/H4, iOS atoms — pre-registered, ACCEPTED on a fresh blind set  ; aa7b7c08e Discovery shadow study — Stage 1 (docs side): pre-registered run, 13 owner-ruled misses, O1 fires under Peter's Reading A ruling; 
  - `dist/mcp/tool-manifest.json`
- **1 path(s), 143889 bytes** ← c2629954f Fix generate determinism: no wall-clock stamps, headers name the @3fn/core version (release-3 item 3) (fix) (#339) ; 1ca8b6e4d Fix Jest preset: subpaths map to shipped dist/ via exports; .gitignore remedy named (release-3 items 2 + 8) (fix) (#336) ; 44a79ee07 Fix generate: abort paths exit 1 and never rebuild token-index (release-3 item 1) (fix) (#335) ; cdb8296fa U3 onboarding (123) (#321) ; d949ce8b7 Fix the three 15.0.0 upgrade-rehearsal defects: relative token-index tier path, sync steering-dir suggestion, catalogued generate  ; 669b51b09 U2b consumer generation profile: machinery, rendering & G2 (123) (#262) ; 24c7f0603 U2a consumer generation profile: splitter, exemplars & G1 (123) (#222)
  - `dist/name-contract.json`
- **1 path(s), 4545 bytes** ← 18c87a8f5 find_docs concept mode honours limit and cursor: default 20, nextCursor paging, applied after ranking (Thurgood; option (a), recor
  - `mcp-server/src/query/__tests__/find-docs-limit.test.ts`

## Removed paths: 41

- **33 path(s), 247010 bytes** ← 669b51b09 U2b consumer generation profile: machinery, rendering & G2 (123) (#262)
  - `.kiro/agents/ada-prompt.md`
  - `.kiro/agents/ada-prompt.md.attribution.json`
  - `.kiro/agents/ada.json`
  - `.kiro/agents/ada.json.attribution.json`
  - `.kiro/agents/data-prompt.md`
  - `.kiro/agents/data-prompt.md.attribution.json`
  - `.kiro/agents/data.json`
  - `.kiro/agents/data.json.attribution.json`
  - `.kiro/agents/kenya-prompt.md`
  - `.kiro/agents/kenya-prompt.md.attribution.json`
  - `.kiro/agents/kenya.json`
  - `.kiro/agents/kenya.json.attribution.json`
  - … 21 more
- **8 path(s), 49383 bytes** ← (no commit after d566b30ff) inside U1 after the target was written: b32ce8ace..d566b30ff, PR #215
  - `dist/components/core/Input-Text-Base/platforms/web/InputTextBase.browser.d.ts`
  - `dist/components/core/Input-Text-Base/platforms/web/InputTextBase.browser.js`
  - `dist/components/core/Input-Text-Email/platforms/web/InputTextEmail.browser.d.ts`
  - `dist/components/core/Input-Text-Email/platforms/web/InputTextEmail.browser.js`
  - `dist/components/core/Input-Text-Password/platforms/web/InputTextPassword.browser.d.ts`
  - `dist/components/core/Input-Text-Password/platforms/web/InputTextPassword.browser.js`
  - `dist/components/core/Input-Text-PhoneNumber/platforms/web/InputTextPhoneNumber.browser.d.ts`
  - `dist/components/core/Input-Text-PhoneNumber/platforms/web/InputTextPhoneNumber.browser.js`

## Changed size, same path: 148 paths, net -99635 bytes (top 15 attributed)

- `dist/mcp/docs-mcp.js` -209342 ← 18c87a8f5 find_docs concept mode honours limit and cursor: default 20, nextCursor paging, applied after ranking (Thurgood; option (a), recor ; bfda1da96 Tokenizer twin headers: stop words a seeded fork, atoms a bound twin (Thurgood; charter § 6 grant, header text only) (#343) ; e3bc68a6f find_docs indexer fix: fence-aware headings, co-occurrence-gated H3/H4, iOS atoms — pre-registered, ACCEPTED on a fresh blind set  ; … 2 more
- `dist/mcp/application-mcp.js` -181976 ← 18c87a8f5 find_docs concept mode honours limit and cursor: default 20, nextCursor paging, applied after ranking (Thurgood; option (a), recor ; bfda1da96 Tokenizer twin headers: stop words a seeded fork, atoms a bound twin (Thurgood; charter § 6 grant, header text only) (#343) ; e3bc68a6f find_docs indexer fix: fence-aware headings, co-occurrence-gated H3/H4, iOS atoms — pre-registered, ACCEPTED on a fresh blind set  ; … 2 more
- `governance/classification-map.md` +48505 ← 2fe2c8906 Register: hermetic-publish-path row ARMED (F-4; RL-7 ruled 2026-10-14) — live evidence 15.1.0 #351 (#355) ; ce7b492e1 15.1.0 follow-up records: publish-path rows issue + grant, publish-rail-guard wording, one-hop grant, adaptations, erratum grant ( ; 2a85df7fc U4 content policy (123) (#329) ; … 9 more
- `dist/cli/sync/index.js` +41683 ← cdb8296fa U3 onboarding (123) (#321) ; 669b51b09 U2b consumer generation profile: machinery, rendering & G2 (123) (#262)
- `governance/DesignerPunk-Integration-Guide.md` +16149 ← 5ac23b74c Native consumer profiles: scope line (Kenya + Data signed); Task 19 note; design rows; guide corrections (release-3 items 11, 7, 8 ; cdb8296fa U3 onboarding (123) (#321) ; 8d7d3ad13 Ballot: Integration Guide tells the truth for 15.0.0 — native onboarding not supported, web base vs your tokens, themes not yet em ; … 2 more
- `governance/completion-documentation-guide.md` +15944 ← 2a85df7fc U4 content policy (123) (#329) ; d847230d7 Ratify: parent instrument-existence check (M1–M3) + plan-time instruments (M4) — Peter, 2026-09-29; A-6 (ii) (governance) (#239) ; da9404b25 Record U2-split rulings + draft ballot B-CI (123) (#217)
- `dist/mcp/product-mcp.js` +12987 ← 18c87a8f5 find_docs concept mode honours limit and cursor: default 20, nextCursor paging, applied after ranking (Thurgood; option (a), recor ; bfda1da96 Tokenizer twin headers: stop words a seeded fork, atoms a bound twin (Thurgood; charter § 6 grant, header text only) (#343) ; e3bc68a6f find_docs indexer fix: fence-aware headings, co-occurrence-gated H3/H4, iOS atoms — pre-registered, ACCEPTED on a fresh blind set  ; … 2 more
- `dist/cli/sync/Manifest.js` +11720 ← 669b51b09 U2b consumer generation profile: machinery, rendering & G2 (123) (#262)
- `dist/cli/shared/errorCatalog.d.ts` +11272 ← 1ca8b6e4d Fix Jest preset: subpaths map to shipped dist/ via exports; .gitignore remedy named (release-3 items 2 + 8) (fix) (#336) ; cdb8296fa U3 onboarding (123) (#321) ; d949ce8b7 Fix the three 15.0.0 upgrade-rehearsal defects: relative token-index tier path, sync steering-dir suggestion, catalogued generate  ; … 1 more
- `dist/cli/shared/errorCatalog.js` +10341 ← 1ca8b6e4d Fix Jest preset: subpaths map to shipped dist/ via exports; .gitignore remedy named (release-3 items 2 + 8) (fix) (#336) ; cdb8296fa U3 onboarding (123) (#321) ; d949ce8b7 Fix the three 15.0.0 upgrade-rehearsal defects: relative token-index tier path, sync steering-dir suggestion, catalogued generate  ; … 1 more
- `dist/cli/sync/index.d.ts` +7942 ← cdb8296fa U3 onboarding (123) (#321) ; 669b51b09 U2b consumer generation profile: machinery, rendering & G2 (123) (#262)
- `dist/cli/sync/Manifest.d.ts` +7301 ← 669b51b09 U2b consumer generation profile: machinery, rendering & G2 (123) (#262)
- `dist/cli/designerpunk.js` +6868 ← cdb8296fa U3 onboarding (123) (#321) ; d949ce8b7 Fix the three 15.0.0 upgrade-rehearsal defects: relative token-index tier path, sync steering-dir suggestion, catalogued generate  ; 669b51b09 U2b consumer generation profile: machinery, rendering & G2 (123) (#262)
- `application-mcp-server/src/validation/__tests__/AssemblyValidator.test.ts` +6697 ← cbf67c07b validate_assembly checks prop values against the schema (T3); find_components states filter rows are untiered (T2) (Lina; from the
- `application-mcp-server/src/indexer/ComponentIndexer.ts` +4919 ← 35571fe20 Fix Application MCP health in a consumer: companion paths resolve against the package's guidance root (pre-15.1.0 fix) (fix) (#345 ; c9679e48b Fix Application MCP readiness in a consumer: build-time readiness record for packaged components (release-3 item 5) (fix) (#338) ; fdb341c2b Components tokenizer: slash is a separator; dot deliberately is not (Lina; out-of-scope item from #328) (#330) ; … 2 more

**Reconciliation (unpackedSize)**: added 2303320 − removed 296393 + changed -99635 = 1907292; listing delta 1907292.
