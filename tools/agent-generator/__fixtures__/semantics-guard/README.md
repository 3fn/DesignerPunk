# semantics-guard — the per-target guard's agent-shaped fixture (Spec 123 Task 14.2)

**What it carries**: exemplar **E** (body) and **E-fm** (frontmatter) through the adapters, for `semantics-guard.test.ts` (Task 14.3/14.4, design C15, DD7).

- **`canonical/agents/semguard.md`**: a minimal agent frontmatter (`commands` ×2, `writeScope` ×2, one tool) and a body of **three units copied byte-for-byte from `canonical/agents/stacy.md`** (blob `46a0dcf8814456e36645ad1fad9d1a0ddc0d1609` at copy; the trigger-set unit re-copied at blob `60dbe42adcbf9c9ab428352fe30a81e935e9ebaa` (unit head `c34ee564`) on 2026-09-29, after #239 extended its LENS row — Task 15.2 doc):
  - the claims-audit parent's `:preamble`;
  - `#the-trigger-set-…` (S's sibling, attack (a)'s destination);
  - **S**, `#the-owed-set-pipeline-…`.

  The first unit also carries the fixture's own `# Semguard` title line, because a heading-only title rides forward into the first unit (C13). The anchors are identical to stacy's, so G1's E rendering and `stacy.yaml`'s S items apply unchanged. `semantics-guard.fixture.test.ts` asserts the three units still equal stacy's.
- **`canonical/profiles/consumer/semguard.dispositions.yaml`**: every body unit and every frontmatter leaf has an **explicit row** (DD25). Three rows are re-pointed **in place** (destination = itself):
  - **E**: S;
  - **E-fm**: `writeScope[.kiro/specs/**]`;
  - **extra**: `commands[claims-pass]`. This is disclosed extra frontmatter evidence, not a substitute for E-fm.
- **`canonical/profiles/consumer/semguard.overlay.md`**: the re-grounded texts, in 13.2's `## @unit` / `## @entry` form, each **pinned** to the canonical hash it re-grounds.
  - E's text is **G1 run 1's committed E rendering** (`__fixtures__/g1-renderings/run1.E.*`). It is **zero-verbatim** against S's operative items (10.S Constraint 3), and the fixture test asserts 0 credited.

The fixture test also holds it to Task 13's checks: the 13.1 schema, the 13.5 orphan and missing-row refusals, and the 13.2 pin freshness.

**Why not through `generateFixture`**: `generateFixture` is hard-wired to `canonical/agents/_fixture.md`, the Spec 122 standing fixture. That body is degenerate (one `#doc` unit), so it cannot carry a `###` S. The guard calls `adapter.emitAgent` directly, which is the call site the per-target bites mutate and the loop `generateFixture` runs. `generateFixture`'s consumer lane (Task 15.0) is exercised separately, on `_fixture.md` itself, in `semantics-guard.fixture.test.ts`.
