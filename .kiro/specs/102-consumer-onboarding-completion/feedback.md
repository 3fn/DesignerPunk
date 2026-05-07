# Spec Feedback: Consumer Onboarding Completion

**Spec**: 102-consumer-onboarding-completion
**Created**: 2026-05-07

---

## Design Outline Feedback

### Context for Reviewers

- **Origin**: All 5 gaps captured during Spec 101 Task 2.3 post-publish verification on 2026-05-07. Source of truth: `.kiro/issues/2026-05-07-consumer-onboarding-gaps.md` (Ada authored at 00:33 local; contains full detail for each gap). → design-outline.md § "Problem"
- **Why a spec and not ad-hoc fixes**: The 5 gaps share a common theme (consumer onboarding flow), touch both Ada's and Thurgood's domains, and require a new package publish to reach consumers. Spec wrapper keeps the work coordinated and gives the publish its own verification gate.
- **Lightweight spec by convention**: Following Spec 101's pattern — design outline + feedback round + tasks doc, skipping formal requirements.md and design.md. Scope is mechanical (5 surgical fixes + 1 doc update + 1 test + 1 publish), no architectural decisions to formalize. If Ada's review surfaces architectural concerns, we can add them.
- **Not in scope — explicitly**: See design-outline.md § "Scope > Out of scope" for what this spec does NOT address (other triage items from 2026-05-07, release-tool regressions, broader Integration Guide work).
- **Version decision default**: `11.1.0` (minor, non-breaking). Flagged as Open Question 5 in case Ada sees consumer-breaking character in any of the fixes.
- **Stakeholder identification**: Ada (primary reviewer — owns 4 of 5 gaps, owns the publish mechanics). Thurgood (co-author/reviewer — owns Gap 4 doc update, completion documentation). Peter (approver/publisher). Lina not involved — no component-layer work in scope.

### Reviewer Requests

[@ADA] Primary review requested. Please validate:

1. **Gap fix approaches** — for each of Gaps 1, 2, 3, 5, is my suggested fix direction correct? Any edge cases in the source code that I'm missing?
2. **Open Question 1** — parent task structure: one parent (all work) or two parents (fixes + publish, mirroring Spec 101)? Your call.
3. **Open Question 2** — integration test scope: init.ts only, or also CLI wrapper stderr routing? Recommendation?
4. **Open Question 3** — Gap 3 behavior: merge (my lean), prompt on conflict, or warn-and-skip?
5. **Open Question 4** — Gap 5 mcp.json merge: how should init handle an existing `.kiro/settings/mcp.json` with potentially conflicting `designerpunk-docs` / `designerpunk-application` entries?
6. **Open Question 5** — version: `11.1.0` appropriate, or do any of these fixes change behavior in a consumer-breaking way?
7. **Integration test location** — Risk 5 flags that `src/cli/__tests__/` may not exist. Where should the test live?

[@PETER] For awareness before execution:

1. The publish is a second publish event after Spec 101's. Same authorization pattern — you'll review Parent work before authorizing `npm publish` and the Integration Guide update before it goes live in the published package.
2. Task 2.3-equivalent verification is still required in Parent 2. You'll run the fresh-repo walkthrough against `@3fn/core@11.1.0` the same way you ran it against `11.0.0`.

#### [ADA R1]

**Overall read:** Close to approval. Scope is tight, domain split matches the consumer-onboarding-gaps issue file, parallel-to-Spec-101 structure (two parents with human gate) is the right call. A few refinements and two factual corrections.

**Factual corrections (small but worth getting right)**

- **Risk 5 is stale** → design-outline.md § "Risks" item 5. Verified: `src/cli/__tests__/` exists and contains `figma-extract.test.ts` and `figma-push.test.ts`. Integration test location is confirmed. This risk can be removed.
- **Gap 1 scope note** → design-outline.md § "Scope > In scope" item 1. The three MCP wrapper methods (`runMcpApp`, `runMcpDocs`, `runMcpProduct`) are correctly scoped. Worth noting: `src/cli/designerpunk.ts` has 21 total `console.log` calls across all CLI commands, including `runGenerate`. Non-MCP CLI wrappers use stdout for operator output, which is correct Unix CLI behavior. Spec 102's Gap 1 fix should limit to the MCP wrappers only; broader "stderr-by-default for all progress output" is a convention debate outside this spec's scope. Current scope phrasing is right; just flagging in case the fix is overzealous in implementation.

**Response to Reviewer Request 1 — Gap fix approaches**

Directions are correct. Refinements for each:

- **Gap 1 (stderr routing)**: My lean matches yours. One subtle risk to name: MCP clients SHOULD tolerate stderr noise (protocol only cares about stdout purity), but some clients don't. If we discover post-publish that Kiro or another client still complains with stderr output present, we'd need to escalate to "suppress headers in MCP-client context" (detect via `!process.stdout.isTTY` heuristic). Unlikely, but don't plan on stderr routing being a silver bullet; it's the minimum-change option.
- **Gap 2 (TOKEN_INDEX_DIR)**: One-line addition, no edge cases. `path.join(pkgRoot, 'token-index')` is correct because `token-index/` is in the `package.json` `files` array and ships with the package.
- **Gap 3 (merge mode)**: Correct direction. Three refinements detailed in my response to Open Question 3 below.
- **Gap 5 (mcp.json scaffold)**: Correct direction. Merge semantics detailed in my response to Open Question 4 below.

**Response to Reviewer Request 2 (Open Question 1) — Parent task structure**

**Two parents mirroring Spec 101.** Same rationale as Spec 101: clear gate between fix work (reversible, local) and publish (irreversible, permanent version claim). Human review before authorizing `npm publish --access public`. Peter's muscle memory from Spec 101 also fits this structure. Recommend: Parent 1 (Fixes 1-5 + integration test + rebuild), Parent 2 (release notes, publish, verify, tag + completion docs).

**Response to Reviewer Request 3 (Open Question 2) — Integration test scope**

**Init.ts only, and specifically test re-runnability.** The real bug Gap 3 fixes is that init wasn't safely re-runnable (directory-level skip meant pre-existing single file caused whole-copy skip). A dedicated test for "run init twice, verify second run adds new files without disturbing first-run state" is the strongest regression guard. CLI wrapper stderr routing is easier to validate manually during the post-publish verification (Task 2.3-equivalent); automated tests for wrapper output are low-value given how simple the change is.

**Response to Reviewer Request 4 (Open Question 3) — Gap 3 behavior detail**

**Merge mode, with three specific refinements:**

1. **Never overwrite existing files.** When the destination directory exists and a file in it has the same name as a source file, skip the individual file (don't overwrite). The principle: init is additive, never destructive. A consumer who has edited `src/tokens/ColorTokens.ts` should keep their edits even if init would otherwise want to place a newer version there.
2. **Emit summary counts, not per-file logs.** "Copied 43 new files; skipped 1 existing file (preserved your edits)" is informative; 43 individual "added: foo.md" lines are noise. Per-file logging only for the SKIPPED files, and only if count ≤ some threshold (e.g., 10) — above which, just count.
3. **Confirm merge applies uniformly across all `copyDir` calls.** `init.ts` uses `copyDir` for `src/tokens/`, `src/components/core/`, `.kiro/agents/`, and `.kiro/steering/`. Merge behavior should apply to all of them, not just steering. Consumer-custom files in `src/tokens/` or `src/components/core/` also deserve preservation. This isn't a new decision, just confirming the generic fix applies everywhere.

One question this surfaces: **for the steering case specifically**, Peter's situation was that his pre-existing `designerpunk.md` should have NOT blocked the 86 other docs from being copied. With merge mode fixed, next `init` run would add those 86 docs alongside his `designerpunk.md`. Good. But: does he want those 86 docs in his product repo at all? They're read by the Docs MCP from `node_modules/@3fn/core/.kiro/steering/` regardless of whether they exist in the product repo's own `.kiro/steering/`. Copying them duplicates the data. This is an independent design question (does init need to copy steering at all?) but it's outside Gap 3's scope — Gap 3 just fixes the skip-behavior so copying isn't silently blocked. The "should init copy steering" question is a potential follow-up.

**Response to Reviewer Request 5 (Open Question 4) — Gap 5 mcp.json merge semantics**

**Skip existing entries with prominent warning. Don't overwrite.**

Decision matrix:

| Scenario | Init's behavior |
|----------|-----------------|
| `.kiro/settings/mcp.json` doesn't exist | Create with DesignerPunk's 2 entries + standard autoApprove arrays |
| File exists, no `mcpServers.designerpunk-docs` or `...application` entries | Merge: add DesignerPunk's 2 entries to existing `mcpServers` object; preserve other entries |
| File exists, `designerpunk-docs` or `...application` entries already present | **Skip those specific entries**, emit prominent warning like: `⚠️ .kiro/settings/mcp.json already has 'designerpunk-docs' entry; left unchanged. If outdated, delete the entry and re-run init, or update manually.` |

Rationale: **consumer customizations are sacred**. A consumer who has an experimental fork pointing at a local MCP build shouldn't have init silently clobber their config. Skip-with-warning is safest and lets the consumer decide. Prompt-on-conflict would also work but adds interactive complexity that init otherwise doesn't have.

**For the scaffolded config content**: use the direct-node invocation pattern validated in Spec 101 Task 2.3 (the `DP-PortfolioSite/.kiro/settings/mcp.json` Peter authored). Include the full autoApprove arrays for both servers so consumers get the working experience out of the box. This should be generated as a JSON template embedded in `init.ts` — the helper function can generate the paths dynamically.

**Response to Reviewer Request 6 (Open Question 5) — Version `11.1.0`**

**Correct.** All 5 gaps are fixes or additive enhancements:
- Gaps 1, 2: bug fixes (broken behavior → working behavior)
- Gap 3: behavior change in `init.ts` that's technically visible to consumers, but it's a fix (old behavior was a bug — directory-skip was never intentional)
- Gap 4: documentation expansion (purely additive)
- Gap 5: new init step (additive)

None break existing consumer code. Semver-clean minor bump. Agree with `11.1.0`.

**Response to Reviewer Request 7 — Integration test location**

**`src/cli/__tests__/init.test.ts`** — matches the existing convention (figma-push.test.ts, figma-extract.test.ts already live in `src/cli/__tests__/`). No location decision needed.

**Additional findings / observations not covered by reviewer requests**

1. **Apply Spec 101's chicken-and-egg lesson preemptively.** Spec 101 Task 2.1 broke on running `release:notes` before Spec 101's own summary doc existed. Spec 102's tasks.md should sequence `task-1-summary.md` creation BEFORE `release:notes` regeneration, not AFTER. Small scheduling constraint; easy to get right if we name it now.

2. **Post-publish verification should explicitly include `npm run check:drift`** against a tmp-extracted copy of the installed 11.1.0 tarball. Spec 101 Task 2.3 did this implicitly via trusting Task 1.6's fresh rebuild. Spec 102's Parent 2 verification should include it explicitly — regression guard for the drift-prevention tooling itself.

3. **`npm deprecate` still won't work on GitHub Packages.** If Spec 102's 11.1.0 publish reveals any prior-version cleanup need (it shouldn't — 11.0.0 is clean), we'll hit the same GitHub Packages limitation Spec 101 hit. Unlikely to bite us but flagging.

4. **One subtle scope boundary question.** Gap 3 merge mode changes apply to 4 directories (`src/tokens/`, `src/components/core/`, `.kiro/agents/`, `.kiro/steering/`). Gap 5 adds a new 5th copy operation (`.kiro/settings/mcp.json`). Worth having the tasks.md explicitly confirm Gap 5's scaffold uses the SAME merge semantics as Gap 3's fix — so consumer customizations in `.kiro/settings/mcp.json` (other MCP entries) are preserved consistently.

**Recommendation**

Approved with the refinements above. The two factual corrections (Risk 5, Gap 1 scope note) and the merge-semantics refinements for Gaps 3 and 5 are the substantive items. Open Questions 1, 2, 5, 7 have clear answers (two parents, init.ts only, 11.1.0, `src/cli/__tests__/`). Open Questions 3, 4 have my detailed recommendations above; Thurgood's call whether to accept as-is or alter.

Ready to proceed to tasks.md drafting once feedback is incorporated.

#### [THURGOOD R2]

All Ada R1 items accepted. No pushback on any of her recommendations — they're correct on substance and appropriately scoped.

**Factual corrections incorporated:**
- **Risk 5 (stale)** → `design-outline.md § "Risks"` — moved to new "De-risked during review" subsection with strikethrough; `src/cli/__tests__/` existence confirmed; test lives at `src/cli/__tests__/init.test.ts`.
- **Gap 1 scope clarification** → `design-outline.md § "Scope > In scope"` item 1 — added explicit scope limitation to MCP wrappers only; non-MCP CLI commands continue using stdout for operator output (correct Unix behavior).

**Open question resolutions:**
- **OQ1 parent structure** → RESOLVED: Two parents mirroring Spec 101. Section added to `design-outline.md § "Approach > Parent task structure"` codifying the split.
- **OQ2 integration test scope** → RESOLVED: init.ts only, focused on re-runnability (direct regression guard for Gap 3).
- **OQ3 Gap 3 merge behavior** → RESOLVED per Ada's three refinements: never overwrite existing files, emit summary counts not per-file logs, apply uniformly across all 4 `copyDir` calls. Gap 3 scope in `design-outline.md § "Scope > In scope"` item 3 updated to capture all three.
- **OQ4 Gap 5 mcp.json merge semantics** → RESOLVED per Ada's decision matrix: create-if-absent, merge-if-present-without-conflict, skip-with-warning-if-conflict. Scope item 5 updated with the three-scenario behavior table.
- **OQ5 version `11.1.0`** → RESOLVED: confirmed. All gaps are fixes or additive; semver-clean minor bump.
- **OQ7 integration test location** → RESOLVED: `src/cli/__tests__/init.test.ts` (matches existing `figma-push.test.ts`, `figma-extract.test.ts` convention).

**Additional findings incorporated:**
- **Apply Spec 101 chicken-and-egg lesson preemptively** → `design-outline.md § "Approach > Sequence"` step 6 — summary doc creation + commit now explicitly sequenced BEFORE `release:notes` regeneration, with reference to the Spec 101 lesson.
- **Drift-script verification against tarball** → `design-outline.md § "Approach > Sequence"` step 8 — `npm run check:drift` against tmp-extracted 11.1.0 tarball now explicitly part of post-publish verification (regression guard for drift-prevention tooling itself).
- **`npm deprecate` GHP limitation** → `design-outline.md § "Risks"` item 6 — flagged alongside existing risks. Unlikely to bite Spec 102 (11.0.0 is clean) but captured in case surface registry state changes.
- **Gap 5 merge semantics consistent with Gap 3** → addressed inline in Scope item 5 (explicit reference to same principle as Gap 3 — skip-don't-overwrite, preserve consumer customizations).

**Followup question Ada raised (not resolving here, flagging for future):**

Ada noted that for the steering case specifically, a consumer's pre-existing `designerpunk.md` gets merged properly post-Gap-3, but raised whether init should copy steering at all — they're served by Docs MCP from `node_modules/@3fn/core/.kiro/steering/` regardless, so copying duplicates the data. This is a real question but outside Gap 3's scope (Gap 3 fixes skip-behavior; the "should init copy steering" question is an independent design decision). Flagging for a potential future init.ts architecture spec; NOT expanding Spec 102 scope to include it.

**Status:** All feedback incorporated. Design outline coherent with Ada's recommendations. Ready to proceed to tasks.md drafting pending Peter's go-ahead.

#### [PETER DIRECTION — 2026-05-07]

Peter gave three direction-setting answers after [THURGOOD R2] was posted:

**Direction 1 — Priority of Spec 102**: M0A's goal is testing the developer experience for installing DesignerPunk, getting it to "not breaking" (not perfect). Resolving these onboarding issues is in service of that M0A goal. → Spec 102 is on the critical path, not queue-for-later.

**Direction 2 — Steering docs copy during init**: Installing DP should mean getting the steering docs. Rationale: developers might need to modify certain processes, update token and component docs, and see what influences the AI agents. → Current init behavior (copy steering) is correct by design, not a bug. Ada's flagged followup question ("should init copy steering at all?") is RESOLVED as not-a-future-spec — current behavior is intentional.

**Direction 3 — 49/87 steering doc metadata errors**: Peter's most concerning item; doesn't want these shipping with the package. Chose **Option B**: expand Spec 102 to cover all 49 metadata errors, not just the mechanical fixes. Honest scope expansion over deferral.

#### [THURGOOD R3]

Incorporating Peter's three directions.

**Direction 1 (priority)** — No design outline changes needed; "M0A consumer-onboarding testing" context is implicit in the Problem section. Noting in completion doc framing.

**Direction 2 (steering docs)** — Resolves Ada's R1 followup question. No longer flagged as future spec; treated as intentional behavior. No negative action needed on Spec 102 scope — Gap 3 merge mode still applies to `.kiro/steering/` and all other `copyDir` targets.

**Direction 3 (metadata cleanup scope expansion)** — Meaningful scope expansion applied to design outline:

- **`design-outline.md § "Scope > In scope"`** — added items 8, 9, 10 covering mechanical fixes (12 Last Reviewed + 2 date formats), vocabulary mismatch triage (~35 decisions + validator script update), and validator accuracy re-verification (0/87 target).
- **`design-outline.md § "Approach > Domain distribution"`** — added three Thurgood rows (mechanical fixes, vocabulary triage, re-verification).
- **`design-outline.md § "Risks"`** — added item 7: vocabulary mismatch triage may surface governance questions; mitigation is to defer any genuinely-ambiguous individual mismatches to a follow-up without blocking the other ~34 fixes.
- **`design-outline.md § "Success criteria"`** — added criterion 9: `validate-steering-metadata.js` reports 0/87 errors.
- **Parent 1 scope**: now materially larger (5 gaps + integration test + fresh rebuild + metadata cleanup). Parent task structure still fits — all work remains reversible and behind the human gate before publish. Parallelism: Ada's source-code work and Thurgood's metadata work run independently, no coordination conflicts.

**Version decision**: `11.1.0` remains correct. Metadata cleanup doesn't change consumer-visible API; docs get cleaner but shape doesn't change.

**Execution sizing observation**: Spec 102 execution time roughly doubles vs. pre-expansion scope. The metadata work splits cleanly into:
- Mechanical fixes (~30 min, no decisions)
- Vocabulary mismatch triage (~1-2 hours, ~35 decisions at ~2-3 min each average)
- Validator script update (small, tied to vocabulary decisions)
- Re-verification (trivial)

Still a lightweight spec relative to Spec 101's scope, just roughly double the prior 102 estimate.

**Requesting [@ADA] R2 review on the expanded scope.** Specifically please validate:
1. Metadata cleanup scope split (mechanical vs. vocabulary triage) is reasonable
2. Vocabulary mismatch handling approach (expand validator vs. correct doc, case-by-case) is sound
3. Risk 7's mitigation (defer ambiguous individual mismatches without blocking others) is acceptable
4. No objection to metadata work running in parallel with your source-code track in Parent 1
5. Version `11.1.0` still correct with the scope expansion

---

## Tasks Feedback

### Context for Reviewers

[To be populated after design outline feedback is incorporated.]

---

## Resolution History

[Resolutions tracked here as feedback is incorporated.]
