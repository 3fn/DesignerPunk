# semantics-guard — the per-target guard's agent-shaped fixture (Spec 123 Task 14.2)

**What it carries**: exemplar **E** (body) and **E-fm** (frontmatter) through the adapters, for `semantics-guard.test.ts` (Task 14.3/14.4, design C15, DD7).

- **`canonical/agents/semguard.md`**: a minimal agent frontmatter (`commands` ×2, `writeScope` ×2, one tool) and a body of **three units frozen from `canonical/agents/stacy.md`** at commit `6f23bc6fe` (blob `8ccc09d0e0dafe735a0c2b5317db225fc4770e41`), byte for byte:
  - the claims-audit parent's `:preamble`;
  - `#the-trigger-set-…` (S's sibling, attack (a)'s destination);
  - **S**, `#the-owed-set-query-…`.

  The first unit also carries the fixture's own `# Semguard` title line, because a heading-only title rides forward into the first unit (C13). The anchors are stacy's, so G1's E rendering and `stacy.yaml`'s S items apply unchanged.

  **The copy is frozen, not tracked** (RS-53, 2026-10-29). `index.ts`'s `FROZEN_FROM` holds each unit's `hashText` at that commit, and `semantics-guard.fixture.test.ts` asserts the fixture still matches them. **An edit to `canonical/agents/stacy.md` owes nothing here.** Until 2026-10-29 the test compared the units with the live charter instead, so every edit to one of the three units failed it unless the same PR re-copied the unit. The copy was made at blob `46a0dcf8…` (Task 14.2, merged in #262) and re-copied in eleven PRs after it: #285, #397, #408, #419, #427, #436, #439, #449, #536, #541 and #549.

  **What the fixture is for.** It is a fixed input for the per-target guard (`semantics-guard.test.ts`): the guard proves that each adapter routes every span through `emitSpans`, and its bites mutate the adapters, not the text. It does not prove anything about Stacy's current charter. The derivation check on the real, shipped Stacy material is `derivation.shipped-profile.test.ts`, which reads the committed profile and renderings.

  **Sweeps.** The file holds superseded charter text by design. A straggler sweep that reaches `tools/agent-generator/__fixtures__/` will find hits here. They are fixture input, like the `__bites__/` logs, so the file is not re-copied to clear them.

  **Refreshing the copy** is never owed. If the fixture owner refreshes it, the steps are: re-copy the three units from `canonical/agents/stacy.md` at a named commit; set `FROZEN_FROM` (commit, blob, the three hashes); if S changed, re-pin S's `## @unit` in `semguard.overlay.md` to the new hash, and keep E zero-verbatim against S's items; then run the fixture test and the guard.
- **`canonical/profiles/consumer/semguard.dispositions.yaml`**: every body unit and every frontmatter leaf has an **explicit row** (DD25). Three rows are re-pointed **in place** (destination = itself):
  - **E**: S;
  - **E-fm**: `writeScope[.kiro/specs/**]`;
  - **extra**: `commands[claims-pass]`. This is disclosed extra frontmatter evidence, not a substitute for E-fm.
- **`canonical/profiles/consumer/semguard.overlay.md`**: the re-grounded texts, in 13.2's `## @unit` / `## @entry` form, each **pinned** to the canonical hash it re-grounds.
  - E's text is **G1 run 1's committed E rendering** (`__fixtures__/g1-renderings/run1.E.*`). It is **zero-verbatim** against S's operative items (10.S Constraint 3), and the fixture test asserts 0 credited.
  - **The `## @entry` bodies are YAML VALUES** *(Task 15.3; the Task 15 criterion 15.0 (b) erratum, 2026-09-29)*: E-fm's is the glob `specs/**`; the extra's is a whole command object with the canonical key set and the same `name`. `derive()` substitutes them into the derived frontmatter, and each adapter renders them with its own per-kind renderer; `entryOrigin` maps the derived `writeScope[specs/**]` back to the canonical `writeScope[.kiro/specs/**]`. The pins are unchanged (`hashEntry` of the canonical values). Until 15.3 the bodies were rendered prose bullets; the `__bites__/task-14-4-*` logs record runs against that form, and their re-run under values is Task 14's addendum (Lina).

The fixture test also checks that E's overlay text equals G1 run 1's committed E rendering (`__fixtures__/g1-renderings/`), byte for byte. It also holds the fixture to Task 13's checks: the 13.1 schema, the 13.5 orphan and missing-row refusals, and the 13.2 pin freshness.

**Why not through `generateFixture`**: `generateFixture` is hard-wired to `canonical/agents/_fixture.md`, the Spec 122 standing fixture. That body is degenerate (one `#doc` unit), so it cannot carry a `###` S. The guard calls `adapter.emitAgent` directly, which is the call site the per-target bites mutate and the loop `generateFixture` runs. `generateFixture`'s consumer lane (Task 15.0) is exercised separately, on `_fixture.md` itself, in `semantics-guard.fixture.test.ts`.
