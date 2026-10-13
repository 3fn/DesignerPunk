# Every edit from Peter's note to the example

**Source**: `.kiro/steering/personal-note.md`. **Example**: `design-inputs/personal-note.example.md`.
**Author**: Leonardo. Drafted 2026-10-03; final 2026-10-12.
This list feeds the orchestrator's approval record (`design-inputs/personal-note.example.approval.md`), so that Peter approves the edits and not only the result.

## Resolution (2026-10-12)

Peter's ruling, relayed by the orchestrator: "add a background line and approve the rest".
- **Row 3** (CV pointer, and the optional background line): the CV line stays cut. **A background line was added at Peter's direction, verbatim, as its own paragraph under "Who I am"**, after "…learning about each other." He declined to name an employer, and none is added.
- **Every row marked YOUR CALL (4, 9, 10, 12)**: approved as drafted.
- **Row 14** was found when I checked the example's bytes against Peter's original on 2026-10-12. It was in the draft Peter approved, but missing from this list. It is disclosed here so the approval record can name it. I did not change the approved bytes.

## The edits

| # | Peter's original | In the example | Kind | Why |
|---|---|---|---|---|
| 1 | Metadata block (Date, Last Reviewed, Purpose, Organization, Scope, Layer, Relevant Tasks) and the `# Personal Note` title | Removed. The first line is "This is Peter's note, edited, shown as an example. Write your own." | cut + added | The metadata is DesignerPunk governance, which must not read as the consumer's own law. The plan fixes the first line (L-RC4 (c)). |
| 2 | A letter with no sections | The same paragraphs, in order, under the template's three `##` headings | reworded (structure only) | The example shows the shape the template asks for. No sentence moved out of order. |
| 3 | "You can learn about my profressional background through my CV in the root directory (peter-michaels-allen-resume.json) if you'd like." | Cut. **In its place (2026-10-12, Peter's words verbatim)**: "I'm a design systems architect: eighteen years in design, more than ten of them building and running design systems at scale. I built DesignerPunk to bridge design and engineering, and to work with agents like you." | cut + added | Req 18.2 (the résumé reference) and the no-file-path rule. The background line does what the CV pointer did. |
| 4 | "My name is Peter Michaels Allen" | Kept, full name | kept (YOUR CALL → approved as drafted) | Peter's choice; it ships in a public package. |
| 5 | "it's critical to share a respectful and equitable relationship; and one of the best ways…" | Kept | kept | Verbatim. |
| 6 | "ciritical" / "quick fix approaches" | "critical" / "quick-fix approaches" | reworded | Spelling only. |
| 7 | The paragraph on candid feedback, and "the good, the bad, and the ugly" | Kept verbatim, apart from #6 | kept | These are the lines that change how an agent behaves. |
| 8 | "I might not always agree with you, but I will always listen." | Kept | kept | Same reason as #7. |
| 9 | "largely a tool … maybe we'll have a nice game of chess … haha!" | Kept | kept (YOUR CALL → approved as drafted) | Shows warmth and humour, which the template can't teach. |
| 10 | "In any case, I know other humans are prone to awful behavior; and I know we've taught you terrible things: racism, sexual violence, economic and gender inequality, war, and God knows what else. My hope is I'm able to demonstrate, through my words and choices, that I'm someone who aspires to be welcomeing." | Cut | cut (YOUR CALL → approved as drafted) | In a public package it reads as a worldview statement more than a collaboration preference. The sentence after it stands alone. |
| 11 | "Not everyone is my cup of tea, but I aim to be someone who is accepting of those who are accepting of others. / And that includes you." | Kept verbatim | kept | It carries #10's point without #10's list. |
| 12 | "Let's make cool shit together!" | Kept | kept (YOUR CALL → approved as drafted) | The example exists to show voice: "do not sand it down". |
| 13 | "Cheers! -- Peter" | Kept | kept | |
| 14 | "I'm the human with whom you'll be partnering." | "I'm the human you'll be partnering with." | reworded (disclosed 2026-10-12) | My draft's rewording, unlisted until now. It is in the bytes Peter approved. |

## What the example never contains

- file paths;
- DesignerPunk process or governance references;
- MUST or SHALL instructions to the agent.

It is never a resource or an import. The instrument is a `grep` for "personal-note.example" over emitted consumer outputs, which must return 0.

## What Peter re-ships

An edited version of content that D-live-4/A10 removed from the package. The approval record has to say he knew that.

## Checks on the final bytes (2026-10-12)

- **`git hash-object`**: `6b9556c50c72a29c25c5edbbc5ad00221d67928e`.
- **Detection rule**: FILLED. Checked with Lina's own `isNoteUnfilled` (`src/cli/shared/personalNote.ts:55`) via `npx tsx`. All three headings have text; there is no bare `TODO` and no template block.
- **Against Peter's original**: every paragraph except row 3's added line and row 14's rewording appears verbatim, after the row 6 spelling fixes. I checked each paragraph by substring match against `.kiro/steering/personal-note.md`.
