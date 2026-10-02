# Task 17.2 Completion — delete the legacy tree, teach `attach` in Integration Guide § 4b, record the grep sweep

**Spec**: 123 — Consumer Distribution · **Unit**: U2b (Task 17) · **Parent**: Task 17 · **Agent**: Lina (Sonnet)

**Instruments**: `.kiro/specs/123-consumer-distribution/completion/task-17-instruments.md` rows 2.1–2.10 and 6.1–6.2; rows 2.5 and 6.2 were MISSING and are resolved in-row this commit (below).

**Stale lock, declared**: this commit carries a stale `canonical/generated.lock`. `governance/**` is an input-closure root and § 4b moved it; the lock is refreshed ONCE at 17.3 (the cadence note), so `check:122:diff-guard` was not run and `git status --porcelain canonical/` is empty. The Agent Generator's full path stays green while `outputs` is unmoved.

## What changed

1. **Act 0 — MISSING rows resolved, appended in-row (original text intact).** Rows 2.5 and 6.2 of the instruments block: PR #256 merged to `main` as `891e4215`, `main` merged into the unit branch at `43716418`, and on this tree `git grep -n "product-template" -- .github/workflows/` printed nothing (exit 1). Final counts: exists 18 · built-here 10 · missing 0.
2. **`git rm -r product-template`**: 9 tracked files, all under `agents/` (`README.md` and eight `*-prompt.md`), 645 lines deleted. No code, test, workflow or generator read the tree (the sweep's P1-2, re-confirmed by the grep below).
3. **`governance/DesignerPunk-Integration-Guide.md` § 4b** (the only hunk in that file) now teaches `attach` in place of the copy block. The text carries no legacy-path literal and no `§ "…"` citation. It uses `vocabulary.ts`'s paired phrase (`attach` with its object, `ATTACH_OBJECT`) and the `--reference` description from `designerpunk.ts`'s help text. Verbatim diff:

````diff
@@ -233,12 +233,19 @@ Once the agent session reconnects, it should show `designerpunk-docs` and `desig
 
 #### 4b. Set up agent prompts
 
-If using the product agent template:
+The agent prompts are generated for your harness, not copied by hand. `npx designerpunk init` emits them for the default target. To add another target, or to wire a repo that `init` did not create, run:
+
+```bash
+npx designerpunk attach --target=<cc|kiro>
+```
+
+`attach` will attach a harness (agents + MCP config + approvals), for one target. It is safe to re-run. To read DesignerPunk without becoming it (MCP config and approvals only, no agents), add `--reference`:
+
 ```bash
-cp -r node_modules/@3fn/core/product-template/agents/ .kiro/agents/
+npx designerpunk attach --target=<cc|kiro> --reference
 ```
 
-Then customize `[CUSTOMIZE]` markers in each prompt file with your product name, human lead, and domain-specific context. See `product-template/agents/README.md` for details.
+After `attach` finishes, restart your agent session so it picks up the MCP servers.
 
 ### 5. Verify — Explore the Component Catalog
````

(Facts checked against source: `init` emits the agent layer for the profile's `defaultTarget` (`init.ts`, `consumer-profile.yaml`); `attach` is re-runnable and `--reference` wires MCP config + approvals only (`attach.ts` docblock); `printHelp` in `designerpunk.ts` carries the same strings.)

4. **The grep sweep** (below). The recorded grep ran after steps 2 and 3, on the staged tree, before this doc was written.

## The grep sweep (criterion 2)

**Command**: `git grep -l "product-template"` at the unit head `43716418` plus this subtask's staged deletion and § 4b edit. **Output: 47 files.** Counting rule: 12 files outside the spec directories are one row each; the 35 files under `.kiro/specs/**` and `docs/specs/**` are ONE `HISTORICAL` row (this doc and the instruments block included). So the table has 12 + 1 = 13 rows, and a reader checks the equality as `47 = 12 + 35` with `35` collapsed into one row (verified by `grep -c '^\.kiro/specs/\|^docs/specs/'` on the output = 35, and `grep -vc` = 12).

### Counted part (files `git grep -l` still returns)

| # | File | Verb | Note |
|---|---|---|---|
| 1 | `.kiro/docs/ballots/2026-09-19-counter-argument-fold-back.md` | HISTORICAL | dated ratified ballot (2026-09-19); a descriptive mention of the deleted tree, nothing owed |
| 2 | `.kiro/docs/ballots/2026-09-27-b-ci-unit-branch-ci-feedback.md` | HISTORICAL | dated ballot (2026-09-27); a passing mention in an auditor note |
| 3 | `.kiro/docs/ballots/2026-09-28-123-b-u2.md` | HISTORICAL | the ratified B-U2 record (2026-09-28), which prescribes this sweep; never edited after ratification |
| 4 | `.kiro/docs/ballots/README.md` | HISTORICAL | the ballot index entry for B-U2 (names M2 as applied at 17.3); a dated ratification record, not edited at 17.2 |
| 5 | `.kiro/issues/2026-09-28-package-name-drift-workflow-comment-grant.md` | HISTORICAL | the grant record (2026-09-28) for the workflow comment; names the old list as its own subject. Status/archiving is routed separately |
| 6 | `.kiro/issues/archive/2026-09-20-init-npmrc-registry-pin.md` | HISTORICAL | archived issue (2026-09-20) |
| 7 | `CHANGELOG.md` | HISTORICAL | release-1 entry (L27): the tree left the tarball at release 1; dated release record |
| 8 | `docs/releases/RELEASE-NOTES-11.0.0.md` | HISTORICAL | 11.0.0 release notes (dated release record) |
| 9 | `docs/roadmap/2026-07-04-wordpress-thesis-strategy.md` | HISTORICAL | dated 2026-07-04 strategy record (L30) |
| 10 | `governance/MCP-Evolution-Roadmap.md` | HISTORICAL | the "Reference sweep (first-party)" bullet (L217): a dated historical sweep record, left unedited per Req 14.5.5. One of the two expected hits at parent close |
| 11 | `governance/classification-map.md` | EDITED at 17.3 under B-U2 | the `rule:` line (L686) lists the legacy path; 17.3 rewrites it under B-U2 (hash `c3ad9201…1cacc5` re-verified at the instruments block) |
| 12 | `scripts/pack-assert.ts` | KEPT-LIVE | the assertion labelled `REMOVE absent: product-template/**` (L103-104 on this tree; anchored by content): a live absence assertion that now guards re-introduction and is not deleted here (design C5) |
| 13 | **Spec-directory records**: 35 files under `.kiro/specs/**` and `docs/specs/**` (listed in the recorded output below; this doc, the instruments block and every other Task 17 record included) | HISTORICAL | one row by the criterion's rule: dated spec records. This doc itself joins this row and is not a thirteenth. |

### Separate part (sites the grep no longer returns — not counted in the equality)

| Site | Verb | Note |
|---|---|---|
| the deleted tree `product-template/` (9 files: `agents/README.md` and eight `*-prompt.md`) | REMOVED | `git rm -r` at 17.2 (this commit); `ls product-template` → `No such file or directory` |
| `governance/DesignerPunk-Integration-Guide.md` § 4b's two lines (the `cp -r …` line and the README pointer) | REMOVED | replaced by the `attach` text above; the file no longer returns from the grep |
| `.github/workflows/package-name-drift.yml` line 5 | RESOLVED-BY-GRANT | resolved by `.kiro/issues/2026-09-28-package-name-drift-workflow-comment-grant.md` (PR #256, merged `891e4215`, in the unit branch at `43716418`); `git grep -n "product-template" -- .github/workflows/` → no output, exit 1 |
| `package.json` `files[]` entry `"product-template/"` | REMOVED | REMOVED at Task 3 (U1) (`docs/specs/123-consumer-distribution/task-3-summary.md`); cited, not re-edited; `git grep -n product-template -- package.json` → no output |

### Scoped grep (B-U2 § 5 M2 step 4), recorded at this point — the two-hit re-run is at parent close

`git grep -n "product-template" -- governance/ .kiro/steering/` returns **two lines in two files** at 17.2 (lines truncated here at 130 characters):

```
governance/MCP-Evolution-Roadmap.md:217:- **Reference sweep (first-party):** retargeted to `find_docs` across the verified set — 5 steering docs (`00-Steering Documen…
governance/classification-map.md:686:rule: "Every package-scope reference (.kiro/steering/, src/, product-template/, .kiro/agents/, dist/) SHALL match package.json's name…
```

At parent close the set must be exactly two hits: the Roadmap bullet and the `classification-map.md` history line that 17.3 appends (the rule line itself loses the literal at 17.3). A third means stop and report.

### Recorded grep output (full, `git grep -l "product-template"`, 47 lines)

```
.kiro/docs/ballots/2026-09-19-counter-argument-fold-back.md
.kiro/docs/ballots/2026-09-27-b-ci-unit-branch-ci-feedback.md
.kiro/docs/ballots/2026-09-28-123-b-u2.md
.kiro/docs/ballots/README.md
.kiro/issues/2026-09-28-package-name-drift-workflow-comment-grant.md
.kiro/issues/archive/2026-09-20-init-npmrc-registry-pin.md
.kiro/specs/081-product-mcp-design/completion/task-3-completion.md
.kiro/specs/095-ecosystem-package-assembly/completion/task-6-completion.md
.kiro/specs/095-ecosystem-package-assembly/design.md
.kiro/specs/096-mcp-infrastructure-for-products/completion/task-3-completion.md
.kiro/specs/101-package-publish-readiness/completion/task-1-2-completion.md
.kiro/specs/101-package-publish-readiness/completion/task-1-3-completion.md
.kiro/specs/101-package-publish-readiness/completion/task-1-7-completion.md
.kiro/specs/101-package-publish-readiness/completion/task-1-completion.md
.kiro/specs/101-package-publish-readiness/completion/task-2-2-completion.md
.kiro/specs/101-package-publish-readiness/completion/task-2-3-completion.md
.kiro/specs/101-package-publish-readiness/completion/task-2-4-completion.md
.kiro/specs/101-package-publish-readiness/completion/task-2-completion.md
.kiro/specs/101-package-publish-readiness/design-outline.md
.kiro/specs/101-package-publish-readiness/feedback.md
.kiro/specs/101-package-publish-readiness/tasks.md
.kiro/specs/102-consumer-onboarding-completion/completion/task-1-8-completion.md
.kiro/specs/121-claude-code-portability/design.md
.kiro/specs/121-claude-code-portability/requirements.md
.kiro/specs/121-claude-code-portability/tasks.md
.kiro/specs/122-agent-generator/inbound-from-121.md
.kiro/specs/123-consumer-distribution/completion/task-13-7-completion.md
.kiro/specs/123-consumer-distribution/completion/task-17-instruments.md
.kiro/specs/123-consumer-distribution/completion/task-3-3-completion.md
.kiro/specs/123-consumer-distribution/completion/task-3-completion.md
.kiro/specs/123-consumer-distribution/design-outline.md
.kiro/specs/123-consumer-distribution/design.md
.kiro/specs/123-consumer-distribution/feedback/design-outline.md
.kiro/specs/123-consumer-distribution/feedback/requirements.md
.kiro/specs/123-consumer-distribution/feedback/tasks.md
.kiro/specs/123-consumer-distribution/requirements.md
.kiro/specs/123-consumer-distribution/tasks.md
.kiro/specs/125-B-classification-map/completion/u1b/wave-1-trial-transcripts/control-run1.jsonl
.kiro/specs/125-B-classification-map/completion/u1b/wave-1-trial-transcripts/pruned-run1.jsonl
CHANGELOG.md
docs/releases/RELEASE-NOTES-11.0.0.md
docs/roadmap/2026-07-04-wordpress-thesis-strategy.md
docs/specs/101-package-publish-readiness/task-1-summary.md
docs/specs/123-consumer-distribution/task-3-summary.md
governance/MCP-Evolution-Roadmap.md
governance/classification-map.md
scripts/pack-assert.ts
```

## Targeted tests and result

All run from the main checkout at the unit head plus this subtask's changes.

- `npm run check:drift` → `✓ No package name drift detected (3402 files scanned)`, scanning `governance, .kiro/steering, src, .kiro/agents, dist`. **Measured locally, and a local `dist/` DID exist** (51 entries). CI runs the same script with no `dist/`.
- `npm run test:scripts` → `Test Suites: 12 passed, 12 total · Tests: 221 passed, 221 total`.
- `npm run check:section-citations` (the Section Citation Guard's script) → `Citations checked: 191 (template placeholders allowlisted: 3)` and `RESULT: PASS — every MCP citation resolves (doc + heading).`

## Application-time adaptations

- The § 4b prose adds one sentence the brief did not list, the restart line ("restart your agent session so it picks up the MCP servers"), taken from `attach`'s own restart rows. It is prose, with no instrument (row 2.10 `none`).
- Verb choices for non-sweep-table cases: the grant issue, the ballots and the ballots README are all `HISTORICAL` (dated records naming the path as their subject); none needed a sixth verb.
- Neither `check:122:diff-guard` nor any lock refresh was run, and `canonical/generated.lock` is untouched.
- Otherwise: none.
