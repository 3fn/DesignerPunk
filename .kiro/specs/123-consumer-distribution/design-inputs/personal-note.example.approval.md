# Approval record: the edited example of Peter's personal note

**Date**: 2026-10-12
**Written by**: the orchestrator (the record of Peter's ruling; Leonardo authored the example and the edits list)
**Approved by**: Peter Michaels Allen, in chat, 2026-10-12
**Binds**: `design-inputs/personal-note.example.md` at `git hash-object` **`6b9556c50c72a29c25c5edbbc5ad00221d67928e`** (placed by Lina at `src/cli/templates/personal-note.example.md`; the equality test compares the placed file's hash to this value — red if they differ)
**Edits list**: `design-inputs/personal-note.example.edits.md` (Leonardo; 14 rows). Peter approves the edits, not only the result.

## Peter's words

Shown the full edited draft and the list of what was cut, rearranged and kept (the human-harms paragraph cut; the CV line cut; the "largely a tool" and chess aside kept; "cool shit" kept; typos fixed; paragraphs placed under the template's three headings), with three calls put to him (restore the cut paragraph or keep the cut; add a background line; approve the rest):

> "Let's add a background line and approve the rest"

On the background line, asked whether to mention his new job, and advised not to name any employer in a public, shipped, version-free file:

> "That line works as written, go ahead"

The line, in the orchestrator's draft from his CV and approved by him verbatim:

> I'm a design systems architect: eighteen years in design, more than ten of them building and running design systems at scale. I built DesignerPunk to bridge design and engineering, and to work with agents like you.

## What the approval covers

| Edit (edits.md row) | Disposition |
|---|---|
| 1 metadata block and title removed; fixed first line | approved |
| 2 letter placed under the three template headings | approved |
| 3 CV pointer cut; the background line above added in its place | ruled: "add a background line"; line approved verbatim; no employer named (Peter's choice, 2026-10-12) |
| 4 full name kept | approved ("approve the rest") |
| 5, 7, 8, 11, 13 kept verbatim | approved |
| 6 spelling fixes | approved |
| 9 "largely a tool" / chess aside kept | approved ("approve the rest") |
| 10 the human-harms paragraph cut | approved: Peter chose "approve the rest" over "restore the cut paragraph", which was put to him explicitly |
| 12 "cool shit" kept | approved ("approve the rest") |
| 14 "with whom you'll be partnering" → "you'll be partnering with" | disclosed by Leonardo on 2026-10-12 as missing from the list he first sent; it was in the draft text Peter read and approved (the draft shown to him carried the reworded form) |

Peter was also told, before approving, that cutting row 10 leaves "Not everyone is my cup of tea…" without the sentence that led into it; he approved the text as drafted.

## Knowing re-ship

Peter knowingly re-ships, as the package's example personal note, an edited version of content that D-live-4 / A10 removed from the package (`.kiro/steering/personal-note.md` is an identity doc and does not ship). The example is a sample for consumers to write their own note from: its first line says so, it carries no file path, no DesignerPunk process or governance reference, and no instruction binding the agent; it is never a resource or an import (instrument: `grep -r "personal-note.example"` over the emitted consumer outputs in the 16.6 packed install → 0).

## Not ruled here

Peter trying the note walkthrough himself on a scratch repo before the template ships remains PROPOSED, not ruled (tasks.md 22.0 R4). He has been offered it; it is optional.
