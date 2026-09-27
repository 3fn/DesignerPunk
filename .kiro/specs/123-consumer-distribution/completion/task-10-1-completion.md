# Task 10.1 Completion — `splitFrontmatter`; `partition` (all behaviors incl. forward attachment and leading-bold slugs)

**Spec**: 123 — Consumer Distribution · **Unit**: U2a · **Parent**: Task 10 · **Agent**: Lina (Opus)

## What changed

- **`tools/agent-generator/frontmatter.ts` (new)** — the ONE shared splitter (design C13). `splitFrontmatter(file) → { frontmatter, body, rawFrontmatter, hasFrontmatter }`, plus `splitFrontmatterText(file)` for the comment-aware reader. Same fence regex the Spec 122 loader always used, moved here so there is one splitter, not two.
- **`tools/agent-generator/partition.ts` (new)** — `partition(body) → PartitionTree<PartitionUnit>`:
  1. a fence-aware tokenizer (``` and ~~~, any indentation; a backtick line carrying more backticks is inline code, not an opener);
  2. the heading tree → leaf units, with `#<parent>:preamble` and `#doc:preamble` units;
  3. the numbered top-level enumeration fallback, triggered by "no headings BELOW the root title"; item anchors slug from the LEADING bold span, else the first line's text, else position;
  4. the degenerate case: one `#doc` unit, `degenerate: true`.
  - Attachment: a heading line with only whitespace after it attaches FORWARD; trailing whitespace attaches backward; a whitespace-only doc preamble attaches forward.
  - The exact-partition invariant is asserted inside `partition()` with a throw (`PartitionInvariantError`).
  - Duplicate slugs take `-2`, `-3`… The slug rule mirrors the docs MCP's `slugifyTitle`.
  - `PartitionTree.isDescendantOrSelf(x, s)` is structural (parent chain in one `nodes` map). An id absent from the tree returns false, never throws (C15).
- **Measured on the real corpus** (scratchpad probe, not committed):
  - the nine charters partition to **288 units**, the design's own measured finest-grain count (Req 10.G);
  - **69 non-leaf headings, 32 of them heading-line-only**, the design's measured figures (C13);
  - **zero duplicate slugs** and **zero bare leaf headings** across the 17 files;
  - the eight identity docs partition to 82 units. The design's always-set figure (50 → 69) was measured over a different population (it names nine members); recorded, not reconciled.
  - `start-up-tasks.md` yields the anchors Task 11 names: `#item-critical-wait-for-user-authorization-before-starting-new-tasks`, `#item-civitas-governance-health-check`.

## Targeted tests + result

- `npx jest --config tools/agent-generator/jest.config.js tools/agent-generator/__tests__/partition.golden.test.ts` → **45/45** (the behaviors block: edge bodies incl. empty/no-trailing-newline/CRLF byte-identical; slug rule; inline-backtick non-fence; structural containment incl. unknown → false; the G/G′ anchors).
- `npx tsc --noEmit -p tools/agent-generator/tsconfig.json` → 0 errors.
- The four Golden Bite 1 mutations are recorded in `task-10-2-completion.md` (they bite this code through the golden list).

## Application-time adaptations

1. **Bare LEAF headings attach forward too.** C13 states forward attachment for a non-leaf heading's line. A leaf heading with nothing after it would otherwise be a bare-heading unit, which C13's invariant forbids. I applied the same rule to it (forward; backward only at end of file). **Zero instances exist today** (measured), so this is latent.
2. **Declared limits, written into the module header**: ATX headings only (a setext `Title\n---` is not a heading); headings may be indented 0–3 spaces; enumeration items must start at column 0.
3. **Out-of-list edit — `tools/agent-generator/source.ts` (6+/6−)**: its private `splitFrontmatter` now delegates to `frontmatter.ts`'s `splitFrontmatterText`, keeping its own `CanonicalSourceParseError`. *Authority*: design C13, "ONE shared function, used by every consumer". The adapters' body comes from `source.ts`, so without this the body the adapters emit and the body the golden test partitions would be split by two copies of one regex. Minimal; behavior unchanged (all 27 pre-existing generator suites stay green).
