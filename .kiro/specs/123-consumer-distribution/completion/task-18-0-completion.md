# Task 18.0 completion: the two G2 consequence texts, pre-declared

**Agent**: Lina (Opus) · **Date**: 2026-10-02 · **C0**: `30186762` (on `task/123-u2b-profile`, parent `a26d45d1`)

## What changed

- **`.kiro/specs/123-consumer-distribution/completion/g2-consequence-texts.md`**, committed alone at C0 `30186762` (trailer check: `git log -1 --format='%(trailers:key=Agent,valueonly)' 30186762` → `lina`). It holds:
  - **§ 1** names the target: `completion/task-18-completion.md`, the section headed `## 24.3 acceptance table`. It is absent at H and created at 18.2, and is frozen from the 18.2 commit through merge.
  - **§ 2** names the selector: the verdict token after `**Verdict**: ` up to the first space, the three domain-state tokens, and a malformed-record rule (not applied; the defect returns to Stacy as a finding).
  - **§ 3** gives the composition rule.
  - **§ 4** holds the fenced texts:
    - `HEAD`, `ROWS-FIXED` and `FOOT`;
    - three per-domain texts for each of body, frontmatter and always-set;
    - one `DEMOTION` text covering FAILS and NOT-RUNNABLE.
  - **§ 5** states that the release-2 CHANGELOG entry carries nothing outcome-dependent.
- **Freeze**: from C0 on, the file never changes. Criterion 1's ancestry and criterion 4's byte check are read against C0.
- **`completion/task-18-instruments.md`**: row 1.3's MISSING is resolved in-row (Peter's ruling of 2026-10-02, "Go with your recommendations on all four"; recommendation 3 was the in-record target with no `tasks.md` amendment). The counts line is updated, with the at-writing counts kept beside it.
- **`tasks.md`**: 18.0 is ticked, a checkbox-only hunk.

## Targeted tests + result

- **Tests**: none. This is a documentation subtask. Its check is the texts file's own freeze, `git diff 30186762 <U2b PR head> -- .kiro/specs/123-consumer-distribution/completion/g2-consequence-texts.md` → empty, which is read at 18.2 and at the PR.
- **Pre-commit reads behind the texts' facts**:
  - **Derivation check**: `git grep -ln checkDerivation -- tools` → the only importer outside `tools/agent-generator/__tests__/` is the defining module `regrounding/derivation.ts` (the other hits are bite logs under `__fixtures__/`).
  - **Derivation tests**: `derivation.test.ts`, `derivation.frontmatter.test.ts`, `grain-guard.two-sided.test.ts` and `semantics-guard.fixture.test.ts` read real canonical sources through `REPO_ROOT`. None reads `canonical/_consumer-output`.

## Application-time adaptations

1. **Stacy's two consult rounds shaped the text before C0**, all taken:
   - (a) the verdict token rule;
   - (b) the malformed-record rule;
   - (c) the DEMOTION text no longer asserts that C15/C18 "keep running and gating". It says Fork A changes no other file, and that whatever runs them at C0 runs unchanged;
   - the PASSES limits now trace to Req 11.7.1, 11.7.2 and 11.7.4, not 11.6.5e;
   - the G1 record is cited by path only;
   - `FOOT` marks Task 27.4 as a planned dependency;
   - the Req 24.3 list is anchored to its text, not to line numbers;
   - the derivation-check parenthetical was made exact.

   She accepted the revised draft as C0 text.
2. **A limit added to each PASSES row (R26.8)**: the derivation check is not applied to the committed consumer rendering at C0. Stacy holds whether that is a claims matter for MIDPOINT. No action here.
3. **This doc is a second commit.** C0's SHA cannot sit inside its own commit, so this doc, the row-1.3 resolution and the tick follow in a second commit. The texts file is not touched by it.
4. **The CHANGELOG entry stays at 18.2.** Committing it before 18.1 was recommended, conditional on release-1 sequencing being settled. It is not in this subtask.
