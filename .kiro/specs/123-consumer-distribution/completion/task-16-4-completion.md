# Task 16.4 Completion — Region extractor + splicer (mechanical)

**Spec**: 123 — Consumer Distribution · **Unit**: U2b (Task 16) · **Parent**: Task 16 · **Agent**: Lina (Sonnet)

**Instruments**: `.kiro/specs/123-consumer-distribution/completion/task-16-instruments.md` rows 7.1–7.4.

## What changed

### `src/cli/sync/RegionGrain.ts` (new) — instrument row 7.1

Pure, I/O-free string functions implementing the `C7` text-grain "marker region" (design.md § "C7" — `CLAUDE.md` / `.gitignore` rows, both **ADDED**, grain **marker region**; § "THE NAMESPACE RULE" — *"prefix for keys and files, markers for text"*).

- **`CommentSyntax`** — `{ open, close? }`. Two exported constants: `CLAUDE_MD_COMMENT = { open: '<!--', close: '-->' }`, `GITIGNORE_COMMENT = { open: '#' }` (the brief's two named cases — `<!-- -->` for `CLAUDE.md`, `#` for `.gitignore`).
- **`regionMarkers(syntax, label = 'managed')`** → `{ begin, end }`, the literal marker line text (e.g. `<!-- designerpunk:managed:begin -->` / `# designerpunk:managed:begin`). This is "the comment syntax as a parameter" the brief asked for — the extractor/splicer below take the resulting `RegionMarkers` pair, never a hard-coded string.
- **`extractRegion(text, markers)`** → `{ found: true, before, region, after } | { found: false }`. **Invariant**: on a match, `before + region + after === text` exactly (the region's own trailing eol travels with `region`, so no caller bookkeeping is needed to reassemble). Read-only; never throws.
- **`spliceRegion(text, markers, newContents, file)`** → `{ ok: true, text } | { ok: false, message }`. On success, bytes outside the matched marker pair are byte-identical to the input; on a missing/unmatched pair it returns `{ ok: false, message: managedRegionMarkersMissingMessage(file) }` — **never throws, never performs I/O** (the module has no `fs` import; a caller must check `ok` before writing).
- **Grain rules, documented in the module docstring and exercised by tests**:
  - **First pair wins** (the "defined nested/duplicate marker behaviour" the brief asked for): the non-greedy regex `begin(eol)([\s\S]*?)(eol)end` matches the FIRST `begin` and the FIRST `end` that follows it. A second `begin`/`end` pair later in the file is left untouched inside `after`/the splice tail. A `begin` text re-appearing INSIDE the matched region is ordinary content, not a nested marker.
  - **Missing markers** — absent `begin`, absent `end`, or an `end` with no preceding `begin` — are all one outcome (the regex simply fails to match).
  - **CRLF/LF preserved**: `detectEol` scans only the OUTSIDE bytes (`before + after` as defined in `spliceRegion`, i.e. never the region being replaced), so re-splicing is idempotent and a CRLF file never flips to LF via its own prior region contents. New region content is normalized to the detected eol (internal consistency; outside bytes are never touched).

### `src/cli/shared/errorCatalog.ts` — instrument row 7.3, by grant

Appended `managedRegionMarkersMissingMessage(file: string): string`, returning design.md's **"managed region — markers missing"** row verbatim:

> `the DesignerPunk-managed region in <file> is missing its markers — not rewriting the file. Restore the markers (see install doc § "Your agent layer") or re-run attach`

Added as a single new function at the end of the file, touching no existing lines — a self-contained hunk, kept deliberately clear of the 16.1 seat's concurrent edits to the same file (confirmed via `git diff src/cli/shared/errorCatalog.ts`: exactly one additive hunk, no conflict markers, no prior lines moved).

### `src/cli/__tests__/sync.region.test.ts` (new) — instrument row 7.2

16 tests, all pure (no fs, no scratch repo — `RegionGrain` has no I/O):

- `regionMarkers`: both comment-syntax forms produce the exact expected marker-line text.
- `extractRegion`: finds the region and the `before + region + after === text` reassembly invariant (including the empty-region case, and the nested/duplicate-marker case — first pair matched, second pair surfaces untouched in `after`); missing-begin, missing-end (unmatched), and missing-both all return `{ found: false }`.
- `spliceRegion`:
  - **Region grain criterion** (tasks.md Task 16): "replaces ONLY the region; outside bytes … are byte-identical" — asserted both by prefix/suffix `startsWith`/`endsWith` checks against the original text and by a full exact-string comparison of the spliced result.
  - **Missing markers → string, no write**: the returned message is asserted string-equal both to a verbatim design.md transcription AND to `managedRegionMarkersMissingMessage('CLAUDE.md')` directly (so a future drift between the inline comparand and the catalog function cannot pass silently); a small spy-based harness shows that a caller following the `ok` discriminant never invokes a writer on the error branch. Also asserted never-throws on the end-without-begin case.
  - **Nested/duplicate markers**: splice touches only the first pair; the second pair's bytes are preserved verbatim.
  - **Idempotent on re-splice**: three successive splices with the same `newContents` converge to the same fixed-point text.
  - **CRLF and LF**: a CRLF-file splice keeps `\r\n` outside the region and normalizes new content to `\r\n` (no stray bare `\n` introduced); an LF file stays LF.
  - **`.gitignore`** end-to-end with the line-comment marker form.

## Targeted tests + result

- `npm test -- src/cli/__tests__/sync.region.test.ts` → **16/16 passed**.
- `npm test -- src/cli/__tests__/errorCatalog.test.ts` → **14/14 passed** (pre-existing suite, unaffected by the additive catalog function — its own row-count assertions are scoped to its named rows).
- `npm run typecheck` (`tsc --noEmit`) → clean, no errors.

### Bite recorded red (mutate → run → restore; `cmp` confirmed the restore)

Mutated `spliceRegion`'s `after` slice by one byte (`text.slice(endMarkerStart + 1)` instead of `text.slice(endMarkerStart)`), corrupting the outside-bytes guarantee (dropping the end marker's leading `<`/`#` character from the output).

- `npm test -- src/cli/__tests__/sync.region.test.ts` → **6 failed, 10 passed** (the splice tests that assert exact post-splice text or round-trip outside bytes all went red; the pure-`extractRegion` tests and the missing-marker tests stayed green, correctly — the mutation is inside `spliceRegion` only). Example failing assertion (`CRLF files stay CRLF`):
  ```
  - <!-- designerpunk:managed:end -->
  + !-- designerpunk:managed:end -->
  ```
  Failing tests: `replaces ONLY the region; outside bytes … are byte-identical`; `nested/duplicate markers: splice touches only the FIRST pair …`; `idempotent on re-splice …`; `CRLF files stay CRLF …`; `LF files stay LF …`; `.gitignore region uses the line-comment marker form end to end`.
- Restored `RegionGrain.ts` from a pre-mutation copy (`cp`, never `git checkout --`, since other uncommitted worktree drift was present); `cmp` against the saved copy reported no difference.
- Re-ran `npm test -- src/cli/__tests__/sync.region.test.ts` → **16/16 passed** again, and `npm run typecheck` → clean.

## Application-time adaptations

1. **`spliceRegion`'s signature gained a fourth parameter, `file: string`** (brief named `spliceRegion(text, markers, newContents)`). The design.md catalog row's message is parameterized on `<file>`, and criterion 7.3 requires `spliceRegion` to **return** that exact catalog string on a missing-marker pair — a pure function can't produce a file-specific string without the file being passed in. Kept `extractRegion(text, markers)` at the brief's literal two-argument shape (no file needed — it has no error string to format).
2. **Region-grain definition (nested/duplicate markers)**: not specified in design.md beyond "the `CLAUDE.md` region is spliced." Defined and documented as "first `begin`, first `end` after it wins" (non-greedy regex match) — the simplest, most predictable rule, and the one that keeps re-splicing idempotent. Recorded in the module docstring and exercised by two tests (`extractRegion` and `spliceRegion` nested-marker cases).
3. **CRLF/LF detection scope**: detects the file's eol style from the OUTSIDE bytes only (never from the region being replaced), specifically so idempotent re-splicing can't be destabilized by whatever eol style happened to be inside a *prior* region's content. Not stated explicitly in design.md; a reasoned choice to satisfy "CRLF/LF preserved" + "idempotent on re-splice" together.
4. **The `.gitignore` managed block itself is explicitly OUT of this subtask's scope** (per Lina's Q-h consult, carried in the task brief): `.gitignore`'s actual marker content/wiring belongs to Task 20 (U3). This subtask builds the generic extractor/splicer with comment syntax as a parameter and exercises it against BOTH `CLAUDE_MD_COMMENT` and `GITIGNORE_COMMENT` marker forms in tests, but wires nothing into `attach`/`sync`/`.gitignore` itself — that caller wiring is Task 16.5 (generated-surface `sync`) and Task 20.
5. **No caller wiring in this subtask.** `RegionGrain.ts` is a standalone, unconsumed module as of this commit — `attach.ts`/`init.ts`/`sync/index.ts` do not yet call `extractRegion`/`spliceRegion`. Per the instruments block, dependent subtasks are 16.4 (this one) and 16.5 (generated-surface `sync`, which wires the `CLAUDE.md` splice into the real `attach`/`sync` flow). Row 1.12 and row 7.4 (the region's CONTENTS — `emitAlwaysLayer`'s consumer form) are 16.1/16.3's work, not duplicated here.

## Found later (for the PRIMARY to append to `task-16-instruments.md`)

None. No gap found in rows 7.1–7.4 against this subtask's scope; the one scope boundary worth flagging (point 4 above, the `.gitignore` wiring) was already anticipated and routed to Task 20 by Lina's own prior consult (Q-h), not a new finding.

## Scratch / working notes

- `/private/tmp/claude-501/-Users-3fn-Documents-Work-Projects-Kiro-DesignerPunk-v2/4ee81bb8-10b4-4f6a-9949-1122e5c9d743/scratchpad/lina-16/16-4/RegionGrain.ts.orig` — the pre-bite backup copy used for the `cmp`-confirmed restore (not part of this repo; scratch only).
