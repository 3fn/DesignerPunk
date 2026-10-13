# Task 19.1 Completion — the install region in the guide, the native labels, the README reconciled

**Date**: 2026-10-03
**Agent**: Thurgood (Opus) · PRIMARY, Task 19
**Branch**: `task/123-u3-onboarding` · **Order**: after B-U3 (`0f6c347d`, `.kiro/docs/ballots/2026-10-03-123-b-u3-install-guide.md`), per Peter's O-3 ruling of 2026-10-03. This is the first U3 commit that changes the guide's content.

## What changed

- **`governance/DesignerPunk-Integration-Guide.md`**: the install region was written directly after the title and metadata, in design C23's erratum order:
  - the scope sentence as the first paragraph, verbatim from `tasks.md` L190;
  - § Prerequisites, moved in from the old L20–31 and rewritten: Node.js, npm, and one agent harness;
  - **1** Which posture? · **2** CONSUME, with the reference-no-init path's 3 steps and the probe residuals 15.4–15.7 · **3** BECOME, with the founder path's 5 steps, the restart and its why · **4** Your language vs our updating surface (`generate`, `init` restated, what `generate` writes, the update lifecycle and its asymmetry);
  - § Platforms: **Web**, **iOS** and **Android** siblings, with no numbered steps. iOS carries Kenya's sentence ([KENYA R1] § A) verbatim and Android carries Data's ([DATA R1] item 1) verbatim, each followed by the causes as prose. No line numbers; no claim that a build was run;
  - **5** missing-token report · **6** agent layer · § Adding a second harness · **7** Joining, with 5 steps and the 6-step cross-harness variant · **8** CI needs · **9** Ownership.

  The guide also changed in two other places:
  - the front matter gains `path-steps: { founder: 5, joining: 5, joining-cross-harness: 6, reference-no-init: 3 }`;
  - `Last Reviewed` is now 2026-10-03.

  The lifecycle verbs are introduced with `src/cli/shared/vocabulary.ts`'s `LIFECYCLE_VERBS` descriptions, word for word. `attach` first appears with its object.
- **`README.md`**:
  - The L57 sentence "True native implementations (Web Components, SwiftUI, Jetpack Compose)" is replaced by the labelled form. It carries both asserted strings and no cause sentence.
  - § "Getting Started" is reconciled, not removed. Its status line is now the scope sentence. Its five founder steps are a numbered list in C23 order, using the vocabulary forms. Its link reads "Install guide" and targets `docs/consumer/INSTALL.md`.
- **`scripts/__tests__/install-doc.test.ts`** (new): the README label's string assertion. The unlabelled sentence is absent, and both label strings are present in the Stemma `Deliverables` paragraph, which is found by its content, not its line.
- **`src/cli/shared/vocabulary.ts`**: read, **not edited**. 19.1 needed no new form, and nothing was reworded.

## Targeted tests + result

- `npm run test:scripts`: **16 suites, 311 tests, all passed** after the anchor fix below. The first run failed 1 test of my own: the README has three `**Deliverables:**` paragraphs, and the first one matched.
- **Bite**: with `README.md` restored to HEAD's text, `install-doc.test.ts` goes **red, 2 of 2**. With the edit, it is green, 2 of 2.
- `npm run check:section-citations`: **PASS** (191 citations, 83 served docs). *Scope*: the checker reads only `get_section` / `get_document_*` call citations. The region has none, so the pass is vacuous for 119-B (iii). The region's one `§` citation, `governance/classification-map.md § "certainty-calibration"`, is not something this checker reads. I checked by hand that its heading exists (`### certainty-calibration`, L378).
- `node scripts/validate-steering-metadata.js`: the guide's metadata is valid. 92 docs, 0 errors, 21 warnings, none on the guide. The docs MCP `validate_metadata` on `designerpunk-integration-guide` returns valid, `lastReviewed` 2026-10-03.
- `122-diff-guard`, run **without a lock write**: I called `runGuard(repoRoot, { refreshLock: false })` from a scratch script, because the CLI has no no-write flag.
  - Verdict: **`full-run-green`**, `fullRunReason: input-closure-changed` (`governance` is a closure root).
  - The regenerated tree equals the committed one, so **`outputs` did not move**. Operative-set freshness findings: 0.
  - `canonical/generated.lock` is byte-identical before and after (sha1 `c3edb546…`). The refresh stays owed at 19's close, as planned.
- `npm run check:drift`: no package-name drift (3405 files).
- `./scripts/scan-cross-references.sh`: flags nothing in the guide or the README.
- **Not run**: `npm test` (no `src/` change), `tsc` (no type surface touched), `test:pack-contents`, `test:consumer`, and the mcp-server and application-mcp-server suites. They are owed at 19's close (C20).

## Application-time adaptations

1. **The old Setup Loop stays in place below the region, untouched. It was not removed in 19.1, and that is a fork, reported, not picked.**
   - PR-1 says the region "replaces the Setup Loop". The plan does not say what happens to the Setup Loop's non-step reference content: config options, token-source rules, creating a theme, the hand-written MCP JSON, the verify queries, the `generate` flags, the OKLCH platform dependencies.
   - Two readings:
     - (a) it is retired, and 19.4's remainder table records each part's reason;
     - (b) it is moved, unnumbered, under `## Reference`, for 19.4's sweep to keep, correct or remove.
   - Leaving it in place commits to neither reading and loses nothing.
   - **Cost**: on the unit branch, the guide carries two step lists, and #268's text appears twice, until 19.4. Nothing reaches `main` in this state.
2. **§ Prerequisites was rewritten as it moved, not moved verbatim.** I followed C23: Node.js, npm, and one harness.
   - The TypeScript row was dropped, because `tsx` ships with the package; that note is kept.
   - npm's "from GitHub Packages" was corrected to the public npm registry.
   - The Node minimum, 18+ (22+ recommended), is carried over from the old table, **not re-verified**: `package.json` has no `engines` field.
   - The no-Node line for persona (b) was added, from C23.
3. **I read the README's "only" strictly** (L-A4: "The README carries **only** the scope sentence, the five steps, the 'Install guide' link and the two label strings").
   - Removed from § "Getting Started": the `sync` and `attach` command lines, "`sync` never touches your tokens…", "Not comfortable with terminal commands?…", the "Upgrading from 14.x" pointer, and the "Full integration guide →" link. The "**Status:**" prefix was dropped, so the status line is exactly the sentence.
   - Kept: § "Study the architecture", which is not install content.
   - Leonardo should confirm this reading at 19.5.
4. **The README's "Install guide" link points at `docs/consumer/INSTALL.md`, which does not exist until 19.4.** No link checker exists in `.github/workflows/**` or `scripts/**` (grep for markdown-link / linkcheck / lychee), and the cross-reference scan does not flag it. It is dangling on the branch until 19.4.
5. **`install-doc.test.ts` was created at 19.1**, although Primary Artifacts lists it as new at 19.2/19.4. The reason: 19.1 names "the README L57 label + its string assertion". Its scope is that assertion only, and 19.2 builds the rest.
6. **The region refers ahead to work later U3 subtasks build.** Each of these is named, not invented:
   - `docs/consumer/COMMIT-POLICY.md` (20.1);
   - the CI-needs starter spec in `specs/` (Task 21);
   - `generate` creating `.designerpunk/personal-note.local.md`, and the walkthrough (Task 22). Neither `init` nor `generate` writes the note at HEAD.

   19.3 runs after 20.1, and 19.5 after 22.2 and 22.3, so these statements are re-read against what was built.
7. **The Android colour bullet names no identifiers.** I could not confirm the snake-case base names against the build: only the `_wcag` variants exist in `dist/DesignTokens.android.kt`. It says "the same 14 theme-varying semantic colours" instead.
8. **The scope sentence's version phrase**: #268's "in 15.0.0" became version-free ("yet") in the Web themes bullet, as B-U3's preservation row P3 records.

## Addendum (2026-10-03) — two false claims in the region, corrected

- **The defect**: two factual sentences 19.1 wrote into region § 4 were false.
  - **(a)** `token-index/` was listed among the files `generate` writes into the `output` directory. It is written at the project root: `src/cli/designerpunk.ts` L267, `generateTokenIndex(path.resolve(generateRoot, 'token-index'), …)`.
  - **(b)** "nothing of ours runs underneath them" (the tokens). `generate` statically imports the package's own dark, WCAG and dark-WCAG override maps (`src/generators/generateTokenFiles.ts` L19–21), so editing a consumer's copies in `src/tokens/themes/` changes nothing.
- **Found by**: Ada, in her round-1 consult on the 19.4 remainder, 2026-10-03, verified against source. Thurgood re-read both cited lines.
- **Cause**: (a) was copied from the old guide's § "6. Generate Tokens" output list. (b) was taken from Req 2's prose ("nothing of ours running underneath"), not from the code. 19.1 had no check on factual claims: its tests assert strings, not truth.
- **Fix**: Ada's wording, verbatim, in the commit carrying this addendum (the region's "Your language" bullet, and a new sentence after the `generate` output list).
- **Class guard, from 19.4 on**: each behaviour, path or count claim in the remainder table and in the region's passage table cites `file:line` or a ratified record, and its owning agent confirms it before commit. This was settled in consult and is recorded in `tasks.md` Task 19. Both corrected sentences now cite their source lines above.
- **Re-run**: `npx jest --config scripts/jest.config.js scripts/__tests__/install-doc.test.ts` → 2/2 green. The README is unchanged.

## Addendum 2 (2026-10-03) — two more false claims in the region, found at 19.4 owner wording

- **The defects**:
  - **(c) Region § 4, "The asymmetry is intended".** "After an update, a component may look different while your colours do not" is false given § 4's own exception. The dark and WCAG override values come from the installed package, so the next `generate` after an update can change them (`src/generators/generateTokenFiles.ts` L19–21).
  - **(d) Region § 9, "To own one component".** It said to put your version under the component's name. Component precedence keys on the **declared** name, the `component:` field of `contracts.yaml` (or the schema `name:`), never on the directory name (`application-mcp-server/src/indexer/ComponentIndexer.ts` L172–181).
- **Found by**: Ada (c) and Lina (d), in their 19.4 owner wording, 2026-10-03. Records: `completion/task-19-4-owner-wording/ada.md` § 11 and `lina.md` § 11 (the region re-read table).
- **Cause**: the same class as Addendum 1. 19.1 stated behaviour from design and requirement wording without reading the code. For (d), "under the component's name" was a paraphrase of Req 2.5's "wins on its name".
- **Fix**: the owners' wording, verbatim, applied in the 19.4 assembly that carries this addendum.
  - (c): Ada's replacement for the bullet's first sentence, followed by the bullet's unchanged last sentence.
  - (d): Lina's replacement for the first sentence. The rest of the paragraph stands.

## Addendum 3 (2026-10-03) — three region claims corrected at the 19.4 owner reviews

- **(e) § Platforms › Web, the `data-theme="wcag"` example: false.**
  - The emitted selector is `:root[data-theme="wcag"]` (`dist/DesignTokens.web.css:932`; `src/generators/TokenFileGenerator.ts:977`), so the attribute works only on `<html>`. On a `<div>` it matches nothing.
  - Found by Sparky (`completion/task-19-4-owner-review/sparky.md`, ledger row 12).
  - **Origin**: #268's ratified after-text (Site 2b), which 19.1 moved into the region unchanged. Ada confirmed the Web section's other token facts, but did not review this one (`ada.md` review § Web).
- **(f) § Platforms › iOS, and (g) § Platforms › Android: "The shipped components require it" (`ComponentTokens.*`) is over-general.**
  - iOS: only some components read it (`ButtonIcon.ios.swift:67-80`), while others define their own token enums (`Avatar.ios.swift:35`, `BadgeLabelBase.ios.swift:46`).
  - Android: 3 of 41 component files read it.
  - Found by Kenya (`kenya.md` C1) and Data (`data.md` C-1).
  - **Origin**: #268's ratified Site 1 after-text, point (iii), moved by 19.1.
- **Cause**: 19.1 moved ratified text without re-reading the code behind it. The class guard (claims cite `file:line`, and owners confirm them) caught all three.
- **Fix**: each owner's replacement text, verbatim, in the commit carrying this addendum. Kenya's and Data's reviews also added causes the region lacked: the iOS `Color.oklch` initializer, the product-token theme extension on both platforms, the colormath dependency, and the Android colour names. Those are additions, not defects.
- **#268 content points changed**: P1 (iii) and P3 (v). They are recorded in the B-U3 preservation table with both owners' evidence, for Peter at the U3 merge.

## Addendum 4 (2026-10-03) — the region's `validate` sentence (§ 4, L92) was false

- **The defect**: region § 4 said `validate` "is worth running after you edit token source files". On the token source as shipped, `validate` exits 1: its mathematical-relationships check fails with 102 errors, including on unmodified source.
  - The cause is the checker, not the tokens: Ada's open issue `.kiro/issues/2026-06-24-mathematical-relationship-parser-validation-gaps.md`.
  - Run in this repo by Ada, and in a scratch born repo by Thurgood at 21.1.
- **Found by**: Thurgood, while running the CI-needs bite candidates at 21.1 (`task-21-1-completion.md` § "Candidates considered and NOT shipped").
- **Confirmed by**: Ada (`completion/task-21-owner-review/ada.md` § (a)). She records that her 19.4 confirmation of L92 missed it.
- **Fix**: Ada's replacement, verbatim, for region L92, and for § Reference › Generating tokens — options, L421. `docs/consumer/INSTALL.md` is re-derived.
- **Knock-on**: 19.3's quoted passages do not include L92 or L421, so no quoted passage changed. Both replacements are single lines, so every line anchor in 19.3 and 19.4 still holds. The 19.4 owner-verdict table gets a dated correction note on Ada's § 4 row.

## Addendum 5 (2026-10-03) — region § 3, Step 4 (L81), follows the corrected naming string

- **Why**: Lina's 22.2 built `personalNoteNamingMessage()` to its corrected design text: three slots and the walkthrough (design erratum R2, Leonardo L-RC3). The region still carried the old two-slot clause, "who you are and how you want to be worked with". `install-doc.test.ts` imports the string, so it went red, as intended.
- **Fix**: L81 now reads "`.designerpunk/personal-note.local.md` — who you are, what you and your organization value, and how you like to work together — or, after the restart, ask your agent to walk you through it. Your agents read it every session (it stays on your machine)." The old trailing sentence about filling it in by hand, or asking the agent, is folded into the new clause.
- `docs/consumer/INSTALL.md` (L67) is re-derived. The assertion is unchanged.
- **Not a defect of 19.1**: the string changed under it. 19.3's rows do not quote L81. The line count is unchanged, so every anchor holds.
