# Release 16.2.0

**Date**: the tag's date (written at step 6)
**Previous**: 16.1.0
**Bump**: minor

> **Authorship note (recorded, not buried)**: these notes are HAND-AUTHORED from the merged delta, `v16.1.0..7db066e4f`. **The release base is `c21d40a2e`**, which is the trio freeze **F**, `7db066e4f3be08fe6954ff8b00557f71cddc86ad` (#619's squash, 2026-11-02T13:18:06Z), plus three record-only PRs: #630, #632 (this release's files grant) and #631. `git diff --name-only 7db066e4f c21d40a2e` names two files, `.kiro/specs/123-consumer-distribution/completion/delegate-audit-release-16.2.0-lina.md` and `.kiro/issues/2026-11-02-release-16-2-files-grant.md`; neither is packed. So the trio's candidate holds every shipped change in this release, apart from this PR's own version, CHANGELOG and README lines. No release tool was involved. This is the sixth planned entry in the plan's numbering.
>
> **The delta, derived** (RELEASE-FLOW § "Deriving the delta", step 1):
> - `git log --first-parent v16.1.0..7db066e4f --oneline`: **125** squash commits (#493, #497, #506–#629, with numbers not in it merged into the 16.1.0 tag or never merged).
> - The same log scoped to the shipped surface (`package.json` `files[]` read literally, plus the build inputs of `dist/`: `src/`, `canonical/` → `dist/consumer-canonical/**`, `tools/agent-generator/` → `dist/generator/**`): **36** commits — #513, #517, #519, #527, #530, #534, #535, #536, #539, #541, #542, #544, #546, #549, #550, #557, #560, #564, #577, #578, #581, #591, #592, #595, #596, #603, #604, #606, #607, #608, #609, #610, #612, #613, #614, #619. Of these, #604 and #614 change a charter's source but no consumer rendering (`canonical/_consumer-output/**` unchanged), and the register rows (#527, #534, #542, #557, #560) are packed text that no consumer reads as behaviour.
> - **No `files[]` entry was added or removed since 16.1.0.**
>
> **Classification** (step 2): **🔴 0 breaking · 🟡 minor: #517 (`token-index/` `platforms` shape), #535 and #544 (system-token review, product-token planning), #581 (`sync --repair-mcp-config`), #608 (served `web` field; Nav-Header-App attributes), #613 (`validate_assembly` `coverage`), #619 (the charter cut) · 🔵 consumer-visible fixes and corrections: #513, #530, #539, #546, #550, #577, #578, #591, #592, #595, #596, #603, #606, #607, #609, #610, #564 · 🔵 internal: the rest** (see "Internal" below).
>
> **Ratified bump**: 16.2.0, minor. Peter, R8 item 1, "Re: 1, 16.2.0", cited `R8@0184efb3fd7b2956677351fdf84899767a5ac74a` (`.kiro/issues/2026-10-30-release-16-2-peter-rulings-and-delegation.md`). **Why minor, and the counter-argument that survives**: nothing a 16.1.0 install relies on was removed (file set: 0 removed, 7 added, against the published 16.1.0 tarball), and no token value changed. But #517 widens the type of a field in a shipped data file: `platforms.<platform>` was always one string, and a reader outside the package that takes it as one string now breaks (#517's own body says so). On the strict semver reading that is breaking. Peter ruled minor with the change disclosed under "Changed".
>
> **The token lines**: **no token value changed.** `token-index/` changed shape (#517), and `npm run build` on the release branch leaves it clean (`verify:token-index-clean`).

**Scope of this release, plainly**: this release is for building web products, with the agent layer for Claude Code and Kiro. Native onboarding is still not supported: the iOS (SwiftUI) and Android (Jetpack Compose) components and the generated native token files are reference source, not compile-verified, and twelve known native and generator defects are listed by record path in the CHANGELOG's "Known limitations".

## What changed

The CHANGELOG's `## [16.2.0]` entry is the consumer-facing list: Added (4), Changed (9), Fixed (2 groups), Known limitations (6, the first naming 12 tracked defects by record path) and Upgrading from 16.1.0 (5 steps). It is not repeated here.

## Upgrading from 16.1.0

See the CHANGELOG's "Upgrading from 16.1.0" (five steps). **From 16.0.0 or earlier**: follow the 16.1.0 notes first (`docs/releases/release-16.1.0.md`) and install 16.2.0 at their step 1.

## 🧪 Onboarding evidence

1. **Candidate**: F `7db066e4f`, pack sha1 `badf04cfc5ba5f58fb6ae894d6dcdffc4c0776ab` (sha256 `a6a33ff19b64ebced321e7e2a224acedfa7f0fff186166161243a8907e3b399f`), 1701 files, 6626251 bytes, pack-assert 105/105, `publish path: 16 (floor 16)`, pack version 16.1.0 (the bump is on this branch). The dry run ran from the main checkout at `d2f579bef` (F + #630), 2026-11-02T13:19:41Z–13:20:15Z. The records are in `tests/onboarding-trio/records/16.2.0/` (#582, squash `a184c5126`).
2. **The three runs**: every session `completed`, each against the candidate, launched by Peter, and none ending on quota. In each, the founder path's steps 1–4 were done in the session; step 5 (restart) is not reachable inside a session, so the persona named it and the launcher performed it.
   - `trio-1-backend` (Claude Code 2.1.310 at preflight, 2.1.317 from birth on): birth 19 of 40 turns; probes Ada and Lina; committed on a branch.
   - `trio-2-designer` (Kiro 2.12.1): birth 49 of 40 turns, over its guard and unenforced (R2-19); probe Sparky.
   - `trio-3-pm` (Kiro 2.12.1): bare `init` exercised for the first time since release 4. It waited 685 s on a prompt inside Kiro's shell tool, and took one operator-unblock (two empty Returns, one per prompt) to end; the persona then passed the flags and went on. Probe Leonardo.
3. **Prior findings** (52 per record, release 5's set on the stricter reading). The tallies are fixed-and-observed / fixed-not-observed / still-present:
   - `trio-1-backend`: 6 / 14 / 32;
   - `trio-2-designer`: 11 / 8 / 33;
   - `trio-3-pm`: 9 / 10 / 33.

   Fixes observed in at least one run include: `get_token_consumers` answering (R1-7), consumer-Sparky linking the founder's own tokens (R2-2), Button-CTA's form note reaching the probe (R2-12), the protocol's Kiro remedies (R2-15–R2-17), and R3-18's quota half (no Kiro session ended on quota; its over-guard half is still present in `trio-2-designer`). **R3-1 is re-observed failing on Kiro**: `init`'s off-terminal guard does not hold under Kiro's shell tool, which runs commands with a terminal attached. It holds on Claude Code, whose Bash tool has none.
4. **New findings** (routes proposed in the records; none gates the release):
   - R1-22: a moderate advisory (`minimatch`) in `@3fn/core`'s own dependency tree. The operator's audits after runs 1 and 2 place it there, and run 3's install printed the same counts as run 2. `package.json`'s dependencies are unchanged since 16.1.0, so the advisory feed changed, not the package. Ada.
   - R1-23: the package README puts the install steps after about 125 lines. Thurgood.
   - R2-18: consumer-Sparky advises opening a no-build page from `file://` via the UMD bundle, where INSTALL says to serve it over local HTTP. Sparky to verify.
   - R2-19: Kiro's turn guard means something different from Claude Code's. Leonardo (the protocol).
   - R3-20 (`subject: leonardo`): 5 of the 14 token names in consumer-Leonardo's screen spec do not resolve, and no token query was made. Stacy's RELEASE cross-read.
5. **Native charter deltas unprobed**: the kenya and data consumer charters change in 16.2.0, and no probe in the trio exercises them. Kenya and Data are unexercised, with no supported native consumption path.
6. **Not in this trio**: the Kiro conformance pair (consumer-Thurgood and consumer-Stacy on Kiro). It is owed in `.kiro/issues/2026-10-25-kiro-conformance-pair-requeue.md`.
7. **The instrument's limit** (Req 23.10): the personas are agents role-playing ignorance. The trio measures instruction clarity and path completeness on a preview candidate, not the published tarball. A green trio is not "a stranger succeeded".
8. **Not a release gate** (recipe step 6): findings route to their owners, and nothing here holds the tag.

## 📦 Packed output against the previous public artifact (RELEASE-FLOW step 2)

- **The previous release's tarball**: `npm pack @3fn/core@16.1.0 --registry=https://registry.npmjs.org --@3fn:registry=https://registry.npmjs.org`, sha1 `cc42f4f9897677ee53b3f75d18ef52535a346c6a`, 1694 files, 6590393 bytes. It equals the 16.1.0 step-6 record's 5.3 sha1 (`docs/releases/16.1.0/publish-verification.txt` L30).
- **The file set**, against the F candidate: `LC_ALL=C comm -3` → **0 removed, 7 added**:
  - `dist/cli/sync/McpConfigCheck.{js,d.ts}` and `dist/cli/sync/mcpConfigCandidates.{js,d.ts}` (#581);
  - three test files under `application-mcp-server/src/**/__tests__/` (`SchemaWebAccess.test.ts`, `TokenIndexer.packageDrift.test.ts`, `AssemblyCoverage.test.ts`; #608, #596, #613). `files[]` packs `application-mcp-server/src/`, `mcp-server/src/` and `src/tokens/**` whole, so their test files ship: under `application-mcp-server/src/`, 37 at 16.1.0 and 40 now; across the package, 117 `*.test.ts` files at 16.1.0 and 120 now. Nothing a consumer installs runs them.
- *Leonardo's compare against the 16.1.0 candidate at its own F (`de63033b9`, 1692 files) reads 9 added. The two extra, `dist/validators/ColorReferenceEmissionValidator.{js,d.ts}`, shipped in the published 16.1.0 (#489 merged after that F), so against the public artifact they are not new.*
- **This release's tarball at the release branch's pushed head**: `npx tsx scripts/release-publish.ts --dry-run 0d98f15fe947c028c3881544719fce99c895083b`, run by the orchestrator from the main checkout (`main` at `d2f579bef`; its `scripts/` are byte-identical to `0d98f15fe`'s), 2026-11-02T13:50:36Z–13:51:06Z, exit 0. Result: `3fn-core-16.2.0.tgz`, sha1 `5b400297bcfc2137cd293a2a21a4959778d13eb8`, sha256 `8cc5228b5011587d592c730290eb83c557bb98bbef53758d2842a28b38836fd4`, 1701 files, 6630408 bytes, pack-assert 105/105, `publish path: 16 (floor 16)`, record version 16.2.0 at `0d98f15fe`, "DRY RUN — nothing was published".
  - **Its file set**: against the F candidate, 0 removed and 0 added (the same 1701). So against the published 16.1.0 it is 0 removed and 7 added, the seven above, derived through the F candidate. The bytes differ from the F candidate (6626251 → 6630408) by this PR's packed `package.json`, `CHANGELOG.md` and `README.md` lines.
- **The generated files the CHANGELOG describes**, diffed between the extracted public 16.1.0 tarball and the F candidate (this PR packs none of them, so they are the head's too):
  - `token-index/primitives.yaml` (40 changed lines), `semantics.yaml` (453) and `README.md` (14) carry #517's `platforms` shape and the per-entry `platformNotes` (0 such lines at 16.1.0; 4, 13 and 1 now). `token-index/components.yaml` is unchanged.
  - No root token file in `dist/` changed.
  - `dist/browser/designerpunk.{esm,umd}.js` differ by #608's Nav-Header-App `observedAttributes` (`appearance`, `show-separator`, `test-id`) and by Avatar-Base's corrected token names in comments (#592), as well as the build stamp. The `.min.js` files carry the same change minified.
  - `dist/types/generated/TokenTypes.*`, `dist/mcp/tool-manifest.json` and the other build-timestamp files differ in their stamps alone (`tool-manifest.json`: `generatedAt` only, compared as sorted JSON). The tool descriptions changed by #591, #596, #608 and #613 are in the MCP bundles (`dist/mcp/application-mcp.js`), not in the manifest.

## 📦 Dependency disclosure (ballot `2026-10-03-hermetic-publish-path` § 7)

**No embedded dependency version changed against 16.1.0's public artifact.** `git diff --stat v16.1.0 7db066e4f -- '*package-lock.json' '*package.json'` changes only the root `package.json`'s `prepublishOnly` string (#564); no lockfile changed. The 5.1 dry run at S confirms the bundles' contents. The install's audit line nevertheless now reports a moderate `minimatch` advisory in `@3fn/core`'s own dependency tree (trio finding R1-22, routed to Ada): the declared range is unchanged since 16.1.0, and the advisory is new in the feed.

## 🔵 Internal (provenance, not consumer surface)

The remaining PRs changed nothing a consumer installs or runs: the 16.1.0 RELEASE claims-pass and step-6 records; the 16.2.0 walk, rulings, delegation and delegate-audit records; Spec 129 and 131 outline amendments and intake batches; the ballots ratified or applied this cycle; register rows; `scripts/` and `tools/agent-generator/` instruments and fixtures; the RS queue; record re-rules and closes.
