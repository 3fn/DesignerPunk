# Task 7.2 Completion: Parser Bare-id Candidate Extraction

**Date**: 2026-08-02 · **Unit**: OB-1 · **Type**: Implementation subtask

## What was done

`mcp-server/src/indexer/cross-ref-parser.ts`: added the bare-id candidate class per design Component 6.1 — exported `BARE_ID_GRAMMAR = /^[a-z0-9][a-z0-9-]*$/`; a link target matching the grammar with none of `/ . : #` is pushed with the INTERNAL-ONLY tag `kind: 'id-candidate'`. The parser validates NOTHING (stays a dumb regex extractor). **`.md` path refs carry no new field** — their extracted shape is byte-identical to pre-change (deliberate: existing exact-`toEqual` tests pass unchanged, and the tag exists only where validation needs it).

## Tests (in `__tests__/bare-id-crossrefs.test.ts` + the untouched existing suite)

- Grammar positives (`token-governance`, `a1`, `x-y-z2` → tagged candidates).
- False-positive guards: anchors, https/mailto URLs, relative/absolute paths, dotted names, uppercase, underscores, leading hyphen, empty — zero extraction.
- `.md` extraction regression: exact-shape `toEqual` (no `kind` on path refs); mixed-line case.
- Existing `cross-ref-parser.test.ts`: **20/20 pass UNCHANGED** (the property surface, per the task line).
