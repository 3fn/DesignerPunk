# Issue: the scope sentence U9 rewrites is pinned by `install-doc.test.ts` and the README, and its grant

**Date**: 2026-11-08
**Owner**: Thurgood
**Class**: P2 obligation (guard) · grant
**Trigger**: `path:.kiro/specs/129-consumer-generation-completeness/completion/task-14-completion.md` — the event that owes the close is U9's merge, which brings that doc to `main` (Spec 129 Task 14, branch `task/129-14-consumer-source`). The close is this record's rule 5 outcome line, giving the fixing PR's number and the three granted-file diffs.
**Source**: Spec 129 Task 14, criterion "The limitation sentences this unit's archives make false" (row 19: the Integration Guide's marked sentence at L23, archived by U9); and Ada's U9 report of 2026-11-08, that `scripts/__tests__/install-doc.test.ts` pins the scope sentence. The task's Primary Artifacts do not list `install-doc.test.ts` or `README.md`, and neither is in Thurgood's standing `writeScope` as a README-bearing path. Thurgood holds `install-doc.test.ts` (Task 7 / U2, tasks assignment table); `README.md` is no seat's by standing scope. Route: an issue-row grant under `.kiro/issues/README.md` rule 8 (no `.github/**` path). Ada is consulted and joins the fixing PR.

---

## What was verified

At `origin/main` the test asserts one constant, `SCOPE_SENTENCE` (`install-doc.test.ts` L85–L90), equal to: the install-doc region's first paragraph (L395, derived from the Guide), the README `## Getting Started` first paragraph (L399, `README.md` L129), and the release-3 CHANGELOG entry's first paragraph (L409, `CHANGELOG.md` L138/L187 area, historical).

At `origin/task/129-14-consumer-source` (`ec23a5a18`) the Guide's L23 and `docs/consumer/INSTALL.md` L9 already carry the new final sentence; `README.md` L129 and `SCOPE_SENTENCE` still carry the old one. So the Guide and the INSTALL doc disagree with the test and the README until both are edited.

The old final clause: `On web, a custom theme you register in \`designerpunk.config.ts\` does not change your generated output yet; light and dark mode work.`

The new final clause (the Guide's L23 at `ec23a5a18`, verbatim): `On web, a theme you register in \`designerpunk.config.ts\` is written as a \`:root[data-theme="<name>"]\` block, which matches the \`<html>\` element only, so it themes the whole page; light and dark mode work.`

**One more forced edit, inside the test file.** L409 asserts the release-3 CHANGELOG entry equals `SCOPE_SENTENCE`. That entry is history and is not rewritten (`CHANGELOG.md`, `docs/releases/release-15.1.0.md` and `release-16.0.0.md` keep the old sentence). Changing `SCOPE_SENTENCE` alone turns L409 red, so the test keeps the old sentence as a second, frozen constant for that one assertion.

No other path is forced: `CHANGELOG.md`, `docs/releases/**` and `docs/consumer/INSTALL.md` (already re-derived at `ec23a5a18`) are not edited.

---

**Grant paths**: `scripts/__tests__/install-doc.test.ts` (the `SCOPE_SENTENCE` constant L85–L90 takes the new text; a new constant holding the old sentence, used only by the L409 CHANGELOG assertion; nothing else), `README.md` (L129 only: the final clause of the Getting Started status paragraph, to the new text)

---

## The fixing PR

U9's PR. Thurgood writes the granted edits on the seat branch `task/129-14-thurgood-installdoc`; Ada joins that branch, as in #760. The PR cites this path list.

## Acceptance

1. `scripts/__tests__/install-doc.test.ts` passes at head H.
2. The diff to the granted files is limited to the scope sentence: `README.md` changes one line (L129); the test file changes `SCOPE_SENTENCE`, adds the frozen old-sentence constant, and points the L409 assertion at it.
3. `README.md` L129, the Guide's L23 first paragraph and `docs/consumer/INSTALL.md` L9 are byte-identical.

Counter-argument and what survives: the test could instead read the sentence from the Guide, so no pinned copy needs editing. That removes the next forced edit, but it also removes the test's independent check on the README and is a change to the test's design, which this grant does not make. Left to Peter if wanted.
