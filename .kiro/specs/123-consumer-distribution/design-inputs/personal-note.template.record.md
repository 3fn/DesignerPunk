# 22.0 — the personal-note template: record

**Date**: 2026-10-03 · **Author**: Leonardo · **Subtask**: 22.0, the template part only. **22.0 is NOT ticked.** The edited example of Peter's note and its approval record are still owed (see "Open").
**Placed**: `design-inputs/personal-note.template.md`. Its `git hash-object` is `a1bfc86dd1a90216c320577a52015ede31ff7eac`; 22.1's equality test compares the placed copy against this file.
**Preserved round files** (`design-inputs/22.0-collective-round/`):
- `collective-question.md`
- `answers/{ada,data,kenya,leonardo,lina,sparky,stacy,thurgood}.md`
- `tally.md`
- `personal-note.template.v1.md` (the draft the round answered against)

## Who decided

Peter delegated the template's design to the orchestrator, Thurgood and Leonardo ("you all should decide what would be meaningful to you"). Peter was shown v2's questions and the product-facts residual, and left the decision to the three of us.

**Settlement (2026-10-03)**: the orchestrator, Thurgood and Leonardo concur on v2, with Thurgood's two changes below. Thurgood also confirmed:
- v2 passes the detection rule;
- "never as a delegated subagent" needs no line in the consumer charter.

## The collective round

- **The question** (verbatim in `collective-question.md`): each agent names the ONE thing a person's note could tell it that would most change what it does. Fixed four-part form, under 80 words.
- **The answers**: all eight seats answered. Mine was added after the other seven.
  - All eight answered "no" to item 4 (the v1 draft did not draw their item out).
  - None answered "none fits", so **no fourth slot** went to Peter.
- **The tally** (`tally.md`) groups the eight asks into three clusters:
  - **A. What the product ships, and to whom** (Data, Lina, Sparky) → **kept out of the note.** These are product facts, so they go to the shared `product/overview.yaml` via one pointer line, and the walkthrough offers to move them there. The note is per-user and local (Req 18.5), so every teammate's copy would otherwise disagree.
  - **B. Fluency** (Kenya, Leonardo) → one question added under "Who I am".
  - **C. Decisions and done-ness** (Ada, Thurgood, Stacy) → two questions under "How I like to communicate and collaborate". Ada's replaces v1's "never do without asking"; Thurgood's and Stacy's merge into one.

## Thurgood's two changes (both adopted)

- **(a) The offer line reads "Any answer of *theirs* under the headings ends the offer"**, not "hers". The rest of the line already speaks of "the person … them … their"; the plan's quote of the line (`tasks.md` § "Task 22", the walkthrough-offer bullet, R3 wording) says "hers".
  - **Dated reconciliation, 2026-10-03**: the PLACED template governs. 22.1's asserted string follows `design-inputs/personal-note.template.md` (and its byte-identical placed copy), not the plan's quote.
  - The plan states that "Leonardo owns the final bytes at 22.0" (`tasks.md` § "Task 22", the R3 note under the offer line).
- **(b) `product/overview.yaml` must carry the fields the template's pointer sends people to**: what ships first, minimum versions, browsers, devices, assistive technology. Held as a 22.3 criterion on Leonardo, and met by `design-inputs/overview.yaml` (22.3, a separate commit).

## Changes from the plan's text (all inside 22.0's authority to word)

- Stems appear as example answers inside the block, as R4 settled.
- Added a "During the walkthrough" paragraph inside the block. It asks one question at a time, asks for reasons, offers to move product facts, and offers to delete the block when done. It serves the orchestrator's 22.0 input ("short beats long"; "once filled, the guidance block should be removable").
- "It is meant to stay on your machine; don't commit it", rather than "never committed": the second is true only where `.designerpunk/` is ignored (the PR-13 case).

## Claims in the template, with sources

| Claim | Class | Source |
|---|---|---|
| Every template-authored line except a heading sits inside the marked block | VERIFIED-CODE (by reading the file) | this file: the block runs from the opening marker to the closing marker; outside it are only `#`/`##` headings and bare `TODO` |
| The template as created reads **unfilled**; one slot filled reads **filled**; text typed inside the block reads **unfilled**; CRLF line endings read **unfilled** | DESIGN-ONLY: checked against my own reimplementation of the rule (`tasks.md` § "Task 22", the detection-rule bullet), not Lina's code | Lina's `src/cli/shared/personalNote.ts` does not exist yet (instruments row 1.1, built at 22.1); her unit cases decide it |
| "Your agents read it at the start of every session" | VERIFIED-CODE for Kiro; DESIGN-ONLY for CC | Kiro: `canonical/_consumer-output/kiro/.kiro/agents/ada.json:27` (`file://.designerpunk/personal-note.local.md`). The member is pushed unconditionally at `tools/agent-generator/consumer-entry.ts:104-106`. CC's `@`-import of the note is unmeasured until U5 (`tasks.md` § "Task 22", "CC's `@`-import … stays unmeasured until U5") |
| The example lives at `node_modules/@3fn/core/src/cli/templates/personal-note.example.md` | DESIGN-ONLY until the example is placed | FK-1 (b) (`tasks.md` § "Task 22"); instruments row 2.6 is red until placement |
| `product/overview.yaml` is shared by the whole team | VERIFIED-CODE (policy) + DESIGN-ONLY (file) | `product/**` is in the commit policy's "commit" column (design.md § "C24"). The overview is served by `get_product_overview` (`product-mcp-server/src/index.ts:42`, `product-mcp-server/src/indexer/ProductIndexer.ts:224-228`) |

## Surviving counter-arguments

- **The `product/overview.yaml` redirect only helps agents that query the Product MCP.** The note loads every session; the overview does not. So minimum-version and support-matrix facts can arrive late, or never, for a Kenya or a Data that does not query the Product MCP.
  - No revision absorbs this without putting product facts back into a per-person file.
  - **Fork, for Peter if he wants it**: keep one "what you ship, and to whom" line in the note, and accept that teammates' notes can disagree.
- **Length.** v1 was 390 words; v2 is 493, and the guidance block loads every session until deleted. The mitigation is the block's own delete instruction, plus the walkthrough's offer to delete it.
- **Partial deletion.** If only one marker is deleted, the CLI reads "filled" while the guidance stays in the file. The offer line still makes an agent treat that note as unfilled, so this is benign.

## Open (not done here)

- **The edited example of Peter's note and its approval record are NOT placed.** Peter has three open calls:
  - the cut human-harms paragraph;
  - an optional line about his background;
  - the rest of the edits list.

  The draft and its edits list are in the orchestrator's scratch area. Instruments rows 2.2 and 2.3 stay MISSING.
- **PROPOSED, not ruled** (`tasks.md` subtask 22.0, R4): before the template ships, Peter runs the walkthrough himself on a scratch repo (about ten minutes). To be confirmed by Peter at the sitting where he approves the edited example.
- **Where the example is placed** (Lina's plan gap, instruments row 2.2): my proposal is that Lina places it at 22.3, alongside the product-scaffold placement and with the same equality-test pattern, gated on the approval record existing. 22.3b's exact set then includes it. Not ruled.
