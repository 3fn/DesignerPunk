# Spec facts: 129-consumer-generation-completeness

Window `4d10202b2`..`45f5262ee` (since exclusive, read inclusive). Read at `45f5262ee`, committed 2026-11-04.
Every row below is a list of candidates for a reader, printed with the command that produced it. None is a verdict.

## 1. Releases since `4d10202b2`

Command: `` git tag --list 'v[0-9]*' --merged 45f5262ee --no-merged 4d10202b2 --sort=v:refname ``

- (none found by this command)

## 2. Inbounds added to the spec directory since `4d10202b2`

Command: `` git log --no-renames --diff-filter=A --format='C %h %cs' --name-only 4d10202b2..45f5262ee -- .kiro/specs/129-consumer-generation-completeness/ ; keep basenames inbound*.md ``

- `.kiro/specs/129-consumer-generation-completeness/inbound-from-ada-2026-11-04.md` (added `9819f72ee`, 2026-11-04)
- `.kiro/specs/129-consumer-generation-completeness/inbound-from-lina-2026-11-04.md` (added `9819f72ee`, 2026-11-04)

## 3. Root records whose Trigger names this spec's path, by Class

Command: `` for each root .kiro/issues/*.md at 45f5262ee (README excluded): first ^**Trigger**: line; its backticked path: token; does any of its globs match a file under .kiro/specs/129-consumer-generation-completeness/ at 45f5262ee, or that directory's design-outline.md, requirements.md, design.md, tasks.md, completion/claims-pass.md, completion/claims-pass-midpoint.md or completion/task-1-completion.md? Class = the first ^**Class**: line, up to the · ``

- `.kiro/issues/2026-06-24-mathematical-relationship-parser-validation-gaps.md` — P1 consumer-blocking — Trigger glob `.kiro/specs/129-consumer-generation-completeness/completion/claims-pass.md`
- `.kiro/issues/2026-06-28-spec-094-platform-theme-emission-unwired.md` — P1 consumer-blocking — Trigger glob `.kiro/specs/129-consumer-generation-completeness/requirements.md`
- `.kiro/issues/2026-08-13-component-token-platform-references-noncompiling.md` — P1 consumer-blocking — Trigger glob `.kiro/specs/129-consumer-generation-completeness/completion/claims-pass.md`
- `.kiro/issues/2026-10-20-kotlin-output-no-import-block.md` — P1 consumer-blocking — Trigger glob `.kiro/specs/129-consumer-generation-completeness/requirements.md`
- `.kiro/issues/2026-10-20-native-font-family-literals-unescaped-quotes.md` — P1 consumer-blocking — Trigger glob `.kiro/specs/129-consumer-generation-completeness/requirements.md`
- `.kiro/issues/2026-10-24-android-component-unit-type-mismatches.md` — P1 consumer-blocking — Trigger glob `.kiro/specs/129-consumer-generation-completeness/requirements.md`
- `.kiro/issues/2026-10-24-kotlin-output-section-comment-bare-text.md` — P1 consumer-blocking — Trigger glob `.kiro/specs/129-consumer-generation-completeness/requirements.md`
- `.kiro/issues/2026-10-24-native-primitive-values-do-not-match-declared-type.md` — P1 consumer-blocking — Trigger glob `.kiro/specs/129-consumer-generation-completeness/requirements.md`
- `.kiro/issues/2026-10-24-shadow-color-primitives-emitted-on-no-platform.md` — P1 consumer-blocking — Trigger glob `.kiro/specs/129-consumer-generation-completeness/requirements.md`
- `.kiro/issues/2026-10-26-ios-designtokens-members-not-public.md` — P1 consumer-blocking — Trigger glob `.kiro/specs/129-consumer-generation-completeness/requirements.md`
- `.kiro/issues/2026-10-26-token-index-platform-name-readers.md` — P1 consumer-blocking — Trigger glob `.kiro/specs/129-consumer-generation-completeness/requirements.md`
- `.kiro/issues/2026-11-04-progress-bar-native-theme-reads-malformed.md` — P1 consumer-blocking — Trigger glob `.kiro/specs/129-consumer-generation-completeness/requirements.md`
- `.kiro/issues/2026-09-17-platform-build-verification-harness-candidate.md` — P2 obligation (guard) — Trigger glob `.kiro/specs/129-consumer-generation-completeness/tasks.md`
- `.kiro/issues/2026-10-01-in-repo-generate-output-contaminates-package-dist.md` — P2 obligation (guard) — Trigger glob `.kiro/specs/129-consumer-generation-completeness/requirements.md`
- `.kiro/issues/2026-10-13-native-readiness-test-patterns-miss-repo-tests.md` — P2 obligation (guard) — Trigger glob `.kiro/specs/129-consumer-generation-completeness/requirements.md`
- `.kiro/issues/2026-10-24-component-token-custom-values-unvalidated.md` — P2 obligation (guard) — Trigger glob `.kiro/specs/129-consumer-generation-completeness/requirements.md`
- `.kiro/issues/2026-10-02-consumer-generation-completeness-spec.md` — P2 obligation (record) — Trigger glob `.kiro/specs/129-consumer-generation-completeness/completion/claims-pass.md`
- `.kiro/issues/2026-10-02-one-hop-upgrade-rehearsal-tracked-residuals.md` — P2 obligation (record) — Trigger glob `.kiro/specs/129-consumer-generation-completeness/requirements.md`
- `.kiro/issues/2026-10-03-native-generator-findings-for-spec-129-intake.md` — P2 obligation (record) — Trigger glob `.kiro/specs/129-consumer-generation-completeness/completion/claims-pass.md`
- `.kiro/issues/2026-10-15-123-palette-read-from-package.md` — P2 obligation (record) — Trigger glob `.kiro/specs/129-consumer-generation-completeness/requirements.md`
- `.kiro/issues/2026-06-24-oklch-shadow-color-family-not-migrated.md` — P3 improvement — Trigger glob `.kiro/specs/129-consumer-generation-completeness/requirements.md`
- `.kiro/issues/2026-10-03-semantic-override-map-type-not-exported.md` — P3 improvement — Trigger glob `.kiro/specs/129-consumer-generation-completeness/completion/claims-pass.md`
- `.kiro/issues/2026-11-04-consumers-get-no-report-of-what-an-upgrade-changed-in-generated-tokens.md` — P3 improvement — Trigger glob `.kiro/specs/129-consumer-generation-completeness/requirements.md`

P0 and P1 among them, named:

- `.kiro/issues/2026-06-24-mathematical-relationship-parser-validation-gaps.md` — P1 consumer-blocking
- `.kiro/issues/2026-06-28-spec-094-platform-theme-emission-unwired.md` — P1 consumer-blocking
- `.kiro/issues/2026-08-13-component-token-platform-references-noncompiling.md` — P1 consumer-blocking
- `.kiro/issues/2026-10-20-kotlin-output-no-import-block.md` — P1 consumer-blocking
- `.kiro/issues/2026-10-20-native-font-family-literals-unescaped-quotes.md` — P1 consumer-blocking
- `.kiro/issues/2026-10-24-android-component-unit-type-mismatches.md` — P1 consumer-blocking
- `.kiro/issues/2026-10-24-kotlin-output-section-comment-bare-text.md` — P1 consumer-blocking
- `.kiro/issues/2026-10-24-native-primitive-values-do-not-match-declared-type.md` — P1 consumer-blocking
- `.kiro/issues/2026-10-24-shadow-color-primitives-emitted-on-no-platform.md` — P1 consumer-blocking
- `.kiro/issues/2026-10-26-ios-designtokens-members-not-public.md` — P1 consumer-blocking
- `.kiro/issues/2026-10-26-token-index-platform-name-readers.md` — P1 consumer-blocking
- `.kiro/issues/2026-11-04-progress-bar-native-theme-reads-malformed.md` — P1 consumer-blocking

## 4. Of those, records the outline does not name (intake candidates; warn only)

Command: `` row 3's records whose file name does not appear in git show 45f5262ee:.kiro/specs/129-consumer-generation-completeness/design-outline.md ``

- `.kiro/issues/2026-11-04-consumers-get-no-report-of-what-an-upgrade-changed-in-generated-tokens.md` — P3 improvement

## 5. Records the outline or its inbounds cite that are in archive/ at `45f5262ee` (re-read candidates)

Command: `` grep -oE '(\.kiro/issues/(archive/)?)?20YY-MM-DD-<slug>.md' over git show 45f5262ee:<outline and each inbound*.md>; keep names absent from .kiro/issues/ and present in .kiro/issues/archive/ at 45f5262ee ``

- `.kiro/issues/archive/2026-10-03-ios-theme-environment-key-missing-backslash.md` — cited in `.kiro/specs/129-consumer-generation-completeness/design-outline.md`, `.kiro/specs/129-consumer-generation-completeness/inbound-from-ada-2026-11-04.md`
- `.kiro/issues/archive/2026-10-12-steward-canonical-claims-theme-output.md` — cited in `.kiro/specs/129-consumer-generation-completeness/inbound-from-ada-2026-10-30.md`, `.kiro/specs/129-consumer-generation-completeness/inbound-from-ada-2026-11-04.md`
- `.kiro/issues/archive/2026-10-23-component-token-usage-findings-from-drift-pass.md` — cited in `.kiro/specs/129-consumer-generation-completeness/inbound-from-ada-android-generator-defects-2026-10-24.md`
- `.kiro/issues/archive/2026-10-25-generate-passes-semantic-references-to-unemitted-primitives.md` — cited in `.kiro/specs/129-consumer-generation-completeness/inbound-from-ada-2026-10-30.md`
- `.kiro/issues/archive/2026-10-26-android-guidelines-spacing-float-dp-claim.md` — cited in `.kiro/specs/129-consumer-generation-completeness/inbound-from-ada-2026-11-04.md`, `.kiro/specs/129-consumer-generation-completeness/inbound-from-ada-android-generator-defects-2026-10-24.md`
- `.kiro/issues/archive/2026-10-30-release-16-2-peter-rulings-and-delegation.md` — cited in `.kiro/specs/129-consumer-generation-completeness/inbound-from-ada-2026-10-30.md`, `.kiro/specs/129-consumer-generation-completeness/inbound-from-ada-2026-11-04.md`

## 6. Inbounds in the spec directory that the outline does not name

Command: `` git ls-tree -r --name-only 45f5262ee .kiro/specs/129-consumer-generation-completeness/ | grep '/inbound[^/]*\.md$'; keep those whose file name does not appear in git show 45f5262ee:.kiro/specs/129-consumer-generation-completeness/design-outline.md ``

- (none found by this command)

## 7. E2's grep (Process-Spec-Planning § "Before Formalizing: Records That Name the Spec"): a superset

E2's command, verbatim: `` grep -lE '(Spec |specs/)<id>([^A-Za-z0-9-]|$)|<dir>' .kiro/issues/*.md | xargs grep -m1 -H '^\*\*Trigger\*\*: ' | cut -c1-240 `` (`<id>` = `129`, `<dir>` = `129-consumer-generation-completeness`).
It is in governance/Process-Spec-Planning.md at `45f5262ee`, character for character.
Run here on git objects at `45f5262ee` (the same regex over each root .md file, README included, as the shell glob would; then the first Trigger line, cut at 240 characters). A superset: a match means the text names the spec, not that the record is the spec's.

    .kiro/issues/2026-06-24-blend-system-architecture-and-oklch-alignment.md:**Trigger**: `manual` — the color-track spec's formalization opens (the spec that folds this record with 115-B colortokens deletion and color-token enforcement, inta
    .kiro/issues/2026-06-24-mathematical-relationship-parser-validation-gaps.md:**Trigger**: `path:.kiro/specs/129-consumer-generation-completeness/completion/claims-pass.md` — Spec 129's claims pass (CLOSEOUT), which reads whether the parser
    .kiro/issues/2026-06-24-oklch-shadow-color-family-not-migrated.md:**Trigger**: `path:.kiro/specs/129-consumer-generation-completeness/requirements.md` — the first commit that adds Spec 129's requirements, where this record is taken in, co
    .kiro/issues/2026-06-28-spec-094-platform-theme-emission-unwired.md:**Trigger**: `path:.kiro/specs/129-consumer-generation-completeness/requirements.md` — the first commit that adds Spec 129's requirements, where scope item (i) (native th
    .kiro/issues/2026-07-19-application-mcp-search-tokens-partial-match-signal.md:**Trigger**: `path:.kiro/specs/131-governance-simplification/requirements.md` — the first commit that adds Spec 131's requirements, where this record is taken i
    .kiro/issues/2026-08-13-component-token-platform-references-noncompiling.md:**Trigger**: `path:.kiro/specs/129-consumer-generation-completeness/completion/claims-pass.md` — Spec 129's claims pass (CLOSEOUT), which reads whether this recor
    .kiro/issues/2026-09-17-platform-build-verification-harness-candidate.md:**Trigger**: `path:.kiro/specs/129-consumer-generation-completeness/tasks.md` — the event that owes the close: Spec 129's tasks.md landing, which carries the build /
    .kiro/issues/2026-09-26-native-component-distribution.md:**Trigger**: `path:harness/**` — the first commit that touches the platform build-verification harness directory. *(Re-ruled 2026-11-05, Kenya, rule 9, Data co-owner agreeing (`data
    .kiro/issues/2026-09-26-native-component-theme-hardcoding.md:**Trigger**: `manual` — the native component distribution follow-up starts, or the platform build-verification charter's evaluation opens, or Spec 129's design phase opens on sc
    .kiro/issues/2026-10-01-in-repo-generate-output-contaminates-package-dist.md:**Trigger**: `path:.kiro/specs/129-consumer-generation-completeness/requirements.md` — the first commit that adds Spec 129's requirements, where row (g) (the bas
    .kiro/issues/2026-10-02-consumer-generation-completeness-spec.md:**Trigger**: `path:.kiro/specs/129-consumer-generation-completeness/completion/claims-pass.md` — Spec 129's claims pass (CLOSEOUT), which reads whether the spec this charter
    .kiro/issues/2026-10-02-one-hop-upgrade-rehearsal-tracked-residuals.md:**Trigger**: `path:.kiro/specs/129-consumer-generation-completeness/requirements.md` — Spec 129's requirements round, which answers its outline's question 6 ("R1 and R
    .kiro/issues/2026-10-03-native-generator-findings-for-spec-129-intake.md:**Trigger**: `path:.kiro/specs/129-consumer-generation-completeness/completion/claims-pass.md` — Spec 129's claims pass (CLOSEOUT), which reads whether each of the t
    .kiro/issues/2026-10-03-semantic-override-map-type-not-exported.md:**Trigger**: `path:.kiro/specs/129-consumer-generation-completeness/completion/claims-pass.md` — Spec 129's claims pass (CLOSEOUT), which reads whether the export-or-docum
    .kiro/issues/2026-10-12-generate-staleness-decided-by-file-times.md:**Trigger**: `path:src/cli/staleness.ts` — the PR that edits `isProductTokenStale`, the fix site (it has not changed since v11.9.0; the check still compares only product-
    .kiro/issues/2026-10-13-consumer-guard-c6-sync-dry-run-hits-npm-registry.md:**Trigger**: `path:tests/consumer-integration.test.ts` — the next commit that edits the Consumer Guard test file, the file the hermetic-fixture fix lands in; at t
    .kiro/issues/2026-10-13-native-readiness-test-patterns-miss-repo-tests.md:**Trigger**: `path:.kiro/specs/129-consumer-generation-completeness/requirements.md` — the event is Spec 129's requirements file being created; the test-pattern que
    .kiro/issues/2026-10-15-123-palette-read-from-package.md:**Trigger**: `path:.kiro/specs/129-consumer-generation-completeness/requirements.md` — the first commit that adds Spec 129's requirements, where this record (items (ii) and (vi)'s q
    .kiro/issues/2026-10-15-123-u5-instrument-findings.md:**Trigger**: `release:16.3.0:phase-1` — the event that owes the close is 16.3.0's S: the 16.3.0 walk reads every row still open here, as the 16.2.0 walk did (§ "Walk read — release 
    .kiro/issues/2026-10-18-drawn-control-drift-ios-android-web.md:**Trigger**: `release:16.3.0:phase-1` — the record carries two halves. **The web items (W1, W2)** are fix-now: they close in their owning component PRs, with Sparky's browser 
    .kiro/issues/2026-10-18-spec-priorities-by-outcome.md:**Trigger**: `manual` — re-rank when a spec closes, when an outcome changes, or at any monthly walk (the event is unchanged). *(Back-filled 2026-10-20, Thurgood, rules 1 and 9, at the 
    .kiro/issues/2026-10-20-kotlin-output-no-import-block.md:**Trigger**: `path:.kiro/specs/129-consumer-generation-completeness/requirements.md` — the first commit that adds Spec 129's requirements, where this record is taken into the requir
    .kiro/issues/2026-10-20-native-font-family-literals-unescaped-quotes.md:**Trigger**: `path:.kiro/specs/129-consumer-generation-completeness/requirements.md` — the first commit that adds Spec 129's requirements, where this record is taken 
    .kiro/issues/2026-10-23-audit-link4-rejects-sha-alone-commit-line.md:**Trigger**: `manual` — the event that owes the close is the commit that appends the re-read of #445's 20 acts under § 4.3 as amended by ballot `.kiro/docs/ballots/2026
    .kiro/issues/2026-10-23-signing-act-shape-review.md:**Trigger**: `manual` — Spec 129's final unit merge or the merge of Spec 125-B U3 (`.kiro/issues/2026-10-15-123-125b-u3-re-attestation.md`), whichever comes first. The review must ship b
    .kiro/issues/2026-10-24-android-component-unit-type-mismatches.md:**Trigger**: `path:.kiro/specs/129-consumer-generation-completeness/requirements.md` — the first commit that adds Spec 129's requirements, where this record is taken in or 
    .kiro/issues/2026-10-24-component-token-custom-values-unvalidated.md:**Trigger**: `path:.kiro/specs/129-consumer-generation-completeness/requirements.md` — the first commit that adds Spec 129's requirements, where this record is taken in 
    .kiro/issues/2026-10-24-kotlin-output-section-comment-bare-text.md:**Trigger**: `path:.kiro/specs/129-consumer-generation-completeness/requirements.md` — the first commit that adds Spec 129's requirements, where this record is taken into 
    .kiro/issues/2026-10-24-native-primitive-values-do-not-match-declared-type.md:**Trigger**: `path:.kiro/specs/129-consumer-generation-completeness/requirements.md` — the first commit that adds Spec 129's requirements, where this record is 
    .kiro/issues/2026-10-24-native-theme-emission-owner-stated-two-ways.md:**Trigger**: `path:.kiro/specs/131-governance-simplification/requirements.md` — the first commit that adds Spec 131's requirements, where § 8's dependency line is res
    .kiro/issues/2026-10-24-shadow-color-primitives-emitted-on-no-platform.md:**Trigger**: `path:.kiro/specs/129-consumer-generation-completeness/requirements.md` — the first commit that adds Spec 129's requirements, where this record is take
    .kiro/issues/2026-10-24-token-creation-review-no-pr-signal.md:**Trigger**: `path:.kiro/specs/131-governance-simplification/requirements.md` — the first commit that adds Spec 131's requirements, where this record is taken in (as row 18b's 
    .kiro/issues/2026-10-25-avatar-agent-svg-hardcoded-border-width.md:**Trigger**: `path:.kiro/specs/131-governance-simplification/requirements.md` — the event is Spec 131's requirements file being created: the record is routed to Spec 131 i
    .kiro/issues/2026-10-25-consumer-profile-16.1.0-trio-lines.md:**Trigger**: `path:.kiro/specs/131-governance-simplification/requirements.md` — the event that owes the close is Spec 131's requirements: the first commit that adds them takes 
    .kiro/issues/2026-10-25-real-browser-test-lane-for-form-participation.md:**Trigger**: `path:.kiro/specs/131-governance-simplification/requirements.md` — the event that owes the close is Spec 131's requirements: the first commit that adds 
    .kiro/issues/2026-10-26-ios-designtokens-members-not-public.md:**Trigger**: `path:.kiro/specs/129-consumer-generation-completeness/requirements.md` — the first commit that adds Spec 129's requirements, where this record is taken into the 
    .kiro/issues/2026-10-26-rule-11-standing-records-lapse-reading.md:**Trigger**: `path:.kiro/specs/131-governance-simplification/requirements.md` — the event that owes the close is Spec 131's requirements: the first commit that adds them ta
    .kiro/issues/2026-10-26-token-index-platform-name-readers.md:**Trigger**: `path:.kiro/specs/129-consumer-generation-completeness/requirements.md` — the first commit that adds Spec 129's requirements, where item 3 is taken into them or lef
    .kiro/issues/2026-11-01-retire-postpublish-row-h.md:**Trigger**: `release:16.3.0:phase-1` — the event that owes the close is 16.3.0's RELEASE phase 1, by the disposition "fix-now by 16.3.0's S". The token names the version, not `next`, be
    .kiro/issues/2026-11-04-consumers-get-no-report-of-what-an-upgrade-changed-in-generated-tokens.md:**Trigger**: `path:.kiro/specs/129-consumer-generation-completeness/requirements.md` — the first commit that adds Spec 129's requirements, b
    .kiro/issues/2026-11-04-progress-bar-native-theme-reads-malformed.md:**Trigger**: `path:.kiro/specs/129-consumer-generation-completeness/requirements.md` — the first commit that adds Spec 129's requirements, where this record is taken in 

## 8. Where to read open questions (no verdict, no count)

This row says where to read. It does not say what is open: a line below may already be answered elsewhere.

### 8a. Every `**Open for Peter**:` line in the spec directory

Command: `` git grep -n -F '**Open for Peter**:' 45f5262ee -- .kiro/specs/129-consumer-generation-completeness/ (evidence/ excluded); text cut at 300 characters ``

- `.kiro/specs/129-consumer-generation-completeness/feedback/design-outline.md:120` — **Open for Peter**: none from me. The Q10, Q12 and Q13 forks are as the outline carries them.
- `.kiro/specs/129-consumer-generation-completeness/feedback/design-outline.md:246` — **Open for Peter**: none from me beyond Q5 and Q14 as the outline carries them.

### 8b. Headings containing fork, open or ruling

Command: `` git grep -n -i -E '^#+ .*(fork|open|ruling)' 45f5262ee -- .kiro/specs/129-consumer-generation-completeness/ (evidence/ excluded) ``

- `.kiro/specs/129-consumer-generation-completeness/design-outline.md` § "5. Open questions"
- `.kiro/specs/129-consumer-generation-completeness/inbound-from-ada-2026-10-30.md` § "Open questions for the requirements round (listed, not answered)"

### 8c. Fork-shaped IDs, each with the files that mention it

Command: `` grep -oE '\b(F-?[0-9]+|P-[0-9]+|D-?[0-9]+|Q-?[0-9]+)[a-z]?\b' over each .md file under .kiro/specs/129-consumer-generation-completeness/ at 45f5262ee (evidence/ excluded). P without a dash is left out (P0–P3 are record classes) ``

- **D1**: `design-outline.md`
- **D10**: `design-outline.md`
- **D2**: `design-outline.md`
- **D3**: `design-outline.md`
- **D4**: `design-outline.md`
- **F-3**: `design-outline.md`, `feedback/design-outline.md`
- **F8**: `inbound-from-ada-2026-11-04.md`
- **P-1**: `inbound-from-ada-2026-11-04.md`
- **P-10**: `inbound-from-lina-2026-11-04.md`
- **P-12**: `inbound-from-lina-2026-11-04.md`
- **P-13**: `inbound-from-lina-2026-11-04.md`
- **P-2**: `inbound-from-ada-2026-11-04.md`
- **P-6**: `inbound-from-lina-2026-11-04.md`
- **Q1**: `design-outline.md`, `feedback/design-outline.md`
- **Q10**: `design-outline.md`, `feedback/design-outline.md`
- **Q11**: `design-outline.md`, `feedback/design-outline.md`
- **Q12**: `design-outline.md`, `feedback/design-outline.md`
- **Q13**: `design-outline.md`, `feedback/design-outline.md`
- **Q14**: `design-outline.md`, `feedback/design-outline.md`
- **Q2**: `design-outline.md`, `feedback/design-outline.md`
- **Q3**: `feedback/design-outline.md`
- **Q3a**: `design-outline.md`, `feedback/design-outline.md`
- **Q3b**: `design-outline.md`, `feedback/design-outline.md`
- **Q4**: `design-outline.md`
- **Q5**: `design-outline.md`, `feedback/design-outline.md`
- **Q6**: `design-outline.md`, `feedback/design-outline.md`
- **Q7**: `design-outline.md`, `feedback/design-outline.md`
- **Q8**: `design-outline.md`, `feedback/design-outline.md`
- **Q9**: `design-outline.md`

## 9. Files the spec cites by full repo path that changed in the window

Command: `` grep -oE repo-path tokens over git show 45f5262ee:<the outline, inbounds, feedback, requirements, design, tasks>; keep those that are a file at 45f5262ee or 4d10202b2 and lie outside .kiro/specs/129-consumer-generation-completeness/; git log --first-parent --format=%h 4d10202b2..45f5262ee -- <path> ``

- `.kiro/issues/2026-09-26-native-component-distribution.md` (present at 45f5262ee) — changed in `c65bbeb86` — cited in `design-outline.md`
- `.kiro/issues/2026-10-02-consumer-generation-completeness-spec.md` (present at 45f5262ee) — changed in `b841db957` — cited in `design-outline.md`, `feedback/design-outline.md`, `inbound-from-ada-2026-10-30.md`
- `.kiro/issues/2026-10-13-native-readiness-test-patterns-miss-repo-tests.md` (present at 45f5262ee) — changed in `18c100e06` — cited in `inbound-from-ada-2026-10-30.md`, `inbound-from-lina-2026-11-04.md`
- `.kiro/issues/2026-10-18-spec-priorities-by-outcome.md` (present at 45f5262ee) — changed in `45f5262ee`, `ee31decd3` — cited in `design-outline.md`, `feedback/design-outline.md`
- `.kiro/issues/2026-10-30-release-16-2-peter-rulings-and-delegation.md` (gone from this path at 45f5262ee) — changed in `95ed466d7` — cited in `inbound-from-ada-2026-10-30.md`
- `.kiro/issues/2026-11-04-progress-bar-native-theme-reads-malformed.md` (present at 45f5262ee) — changed in `9819f72ee` — cited in `inbound-from-lina-2026-11-04.md`
- `.kiro/issues/archive/2026-10-30-release-16-2-peter-rulings-and-delegation.md` (present at 45f5262ee) — changed in `95ed466d7` — cited in `inbound-from-ada-2026-11-04.md`
- `.kiro/specs/131-governance-simplification/evidence/spec-facts.sh` (present at 45f5262ee) — changed in `ee31decd3` — cited in `feedback/design-outline.md`, `inbound-from-ada-2026-11-04.md`, `inbound-from-lina-2026-11-04.md`
- `docs/consumer/INSTALL.md` (present at 45f5262ee) — changed in `45f5262ee`, `8fcf69b45` — cited in `design-outline.md`, `inbound-from-ada-2026-10-30.md`

---

- **Generator**: `.kiro/specs/131-governance-simplification/evidence/spec-facts.sh` @ `ee31decd3`; args `129 4d10202b2 45f5262eeebfb3bbb2efa6d0b64df1790451237b`. Re-run: `git show ee31decd3:.kiro/specs/131-governance-simplification/evidence/spec-facts.sh | SPEC_FACTS_GEN_SHA=ee31decd3 bash -s -- 129 4d10202b2 45f5262eeebfb3bbb2efa6d0b64df1790451237b`
- **Read SHA**: `45f5262eeebfb3bbb2efa6d0b64df1790451237b` (since `4d10202b2b9d535401a1452643780656a5d0b694`)
- **Candidates, not verdicts.** Every row is a list for a reader. An empty row means this command found nothing, not that nothing changed.
- **Unedited stdout; commentary belongs in feedback.**
- **Blind spots** (this generator cannot see):
  1. numbered prose forks without IDs;
  2. rulings recorded in feedback, ballots, rulings records or chat;
  3. whether any line above is still open;
  4. dependencies that neither cite nor are cited (the G-4 → 130 case);
  5. premise changes from PRs that cite nothing the spec names (the #596 case).
