# Task 10.2 Completion — Hand-authored `expected-units.json` + fixture; snapshot ban + companion

**Spec**: 123 — Consumer Distribution · **Unit**: U2a · **Parent**: Task 10 · **Agent**: Lina (Opus)

## What changed

- **`tools/agent-generator/__fixtures__/golden-partition/`** (new): `charter.md`, `enumeration-member.md`, `degenerate-member.md`, `title-only-prose.md`, and **`expected-units.json`**.
- **`expected-units.json` is hand-authored**: I wrote each file, printed its BODY with line numbers (`awk` over the text after the closing fence), and authored the anchor, kind and line range of every unit from that listing. `partition()` output was not consulted. The list matched on the first test run. It carries a `_provenance` key. Per DD6 the key declares hand-authorship and cannot prove it; the reviewed diff does the protective work.
- **C13's golden-fixture bullet, reproduced, with where each case lives** (each is also checked by a named test, `Fixture coverage — …`):
  - a title-only numbered document → `enumeration-member.md` (one H1, four items);
  - a frontmatter block with `^# ` comments → `charter.md` (three comment lines);
  - a `#doc:preamble` → `charter.md` body line 1;
  - whitespace-gap cases → the two-blank-line gap after `## Alpha`, the trailing blank lines after `## Delta`, and `enumeration-member.md`'s whitespace-only doc preamble (attached forward);
  - a non-leaf heading with a heading-line-only preamble (forward attachment) → `## Gamma` rides into `#gamma-one:preamble`, and `# Golden Charter` rides into `#alpha`;
  - a leading-bold versus inner-bold enumeration item → `#item-governance-health-check` versus `#item-check-the-current-date` (never `#item-current`).
- **Req 10.G Bite 1's cases** are present as well: nested `##`/`###`/`####`; an orphan preamble (`#beta:preamble`); a fenced `##` (inside `#beta-one`); a heading-free member (the enumeration fallback); a zero-heading member (`degenerate-member.md`). Also a duplicate slug (`#notes`, `#notes-2`), a column-0 fenced `5.` line that is not an item, and a positional anchor (`#item-4`).
- **`tools/agent-generator/__tests__/partition.golden.test.ts`** (new) — Golden Bite 1, the attachment-direction checks, the fixture-coverage checks, the snapshot ban and its companion. The 17-file block is 10.5's.
  - The snapshot ban: the test scans its own source with a pattern assembled from pieces, so the file never contains the literal it bans, and it rejects a `__snapshots__/` directory beside the test or the fixture.

## Targeted tests + result

- `npx jest --config tools/agent-generator/jest.config.js tools/agent-generator/__tests__/partition.golden.test.ts` → **45/45**.
- `grep -nE "toMatch(Inline)?Snapshot" tools/agent-generator/__tests__/partition.golden.test.ts | wc -l` → **0**.

### Bites recorded red (each mutation applied to production code, the named test file run, then reverted; the file then re-ran 45/45)

Observed on `partition.golden.test.ts` alone, never on C6 (Req 10.8c).

| Mutation | Where | Red |
|---|---|---|
| collapse to `##` | `partition.ts` `ATX_HEADING` `#{1,6}` → `#{1,2}` | `Tests: 6 failed, 39 passed, 45 total` — incl. `✕ charter.md partitions to exactly the hand-authored unit list` |
| file-not-body | `frontmatter.ts` `splitFrontmatter` returns `body: file` | `Tests: 6 failed, 39 passed, 45 total` — incl. `✕ charter.md / enumeration-member.md / degenerate-member.md / title-only-prose.md partitions to exactly the hand-authored unit list` |
| fallback on "no headings" | `partition.ts` `noHeadingsBelowTitle = headings.length === 0` | `Tests: 6 failed, 39 passed, 45 total` — incl. `✕ enumeration-member.md …`, `✕ title-only-prose.md …`, `✕ the start-up-tasks item anchors Task 11 names (G and G′) exist` |
| backward heading attachment | `partition.ts` `assemble()` appends a heading-only segment to the previous unit | `Tests: 3 failed, 42 passed, 45 total` — `✕ charter.md partitions to exactly the hand-authored unit list`, `✕ charter.md: no unit ends on a heading line…` (the "disposing a leaf deletes the next heading" shape), `✕ a heading-line-only non-leaf heading rides forward…` |
| **companion**: a created `__snapshots__/` | `mkdir tools/agent-generator/__tests__/__snapshots__` | `Tests: 1 failed, 44 passed, 45 total` — `✕ COMPANION: no __snapshots__/ directory exists beside this test or the golden fixture`; directory removed |
| planted inline snapshot call | one `it(…)` using the inline matcher appended to the test file | `Tests: 1 failed, 45 passed, 46 total` — `✕ this test file calls no snapshot matcher (directory or inline)`; file restored, grep → 0 |

## Application-time adaptations

1. **The fixture is four documents, not one charter.** Bite 1 speaks of "one fixture charter" carrying a heading-free member and a zero-heading member. A member without headings cannot sit inside a charter that has them, so the members are separate files in the same fixture directory, all listed in the one `expected-units.json`. A test asserts that the directory's `.md` set equals the list's keys (4), so no fixture document goes unlisted.
2. **Added a fourth document, `title-only-prose.md`** (a title and prose, with no enumeration → degenerate). It is the `_fixture.md` shape, and it gives the "fallback on no headings" mutation a second red that the enumeration member alone would not show.
3. **The test file name** follows the design's Testing Strategy table (`partition.golden.test.ts`). **Out-of-list** (`tools/agent-generator/__tests__/` is not in Task 10's Primary Artifacts). *Authority*: the success criteria that demand the test (Golden Bite 1, the snapshot ban, the 17-file invariant). Task 4 disclosure precedent.
