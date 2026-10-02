# Issue: Kiro-rendered agent prompts emit the `## Ground truth` heading with no blank line before it

**Date**: 2026-10-02
**Status**: ACTIVE
**Owner**: Lina (the Kiro adapter, `tools/agent-generator/adapters/kiro.ts`)
**Trigger**: **the same batch as `2026-10-02-ground-truth-intro-line-stale-generated.md`**: the first of (a) the next event that already requires a signed consumer row's rendered hash to be re-signed, or (b) U3's kickoff (Task 19's start). Why: this is a rendered-text change too, and it moves the committed Kiro outputs; riding one render change and one lock refresh with the intro-line fix is cheaper than two rounds. Cosmetic (Markdown renders the heading either way in most readers), so it does not block release 2.
**Source**: Data's note recorded in the U2b work (`.kiro/specs/123-consumer-distribution/completion/task-18-completion.md` "New issues": "Data's Kiro blank-line note"); the span facts are in `canonical/profiles/consumer/signatures/data.md` ("The `## Ground truth` heading and its blank line (cc L483–484, kiro L276–277) form the container span").

---

## The gap, and what I verified on `main` (669b51b0)

I read every committed agent render on `main` for a `## Ground truth` heading and the line before it.

| Surface | Agents with the heading | Blank line before it? |
|---|---|---|
| `canonical/_consumer-output/kiro/.kiro/agents/` | `data-prompt.md` (L276), `kenya-prompt.md` (L259), `lina-prompt.md` (L273) | **No**, in all three |
| `.kiro/agents/` (the steward's Kiro outputs) | `data-prompt.md` (L277), `kenya-prompt.md` (L260), `lina-prompt.md` (L273), `sparky-prompt.md` (L257) | **No**, in all four |
| `canonical/_consumer-output/cc/.claude/agents/` and `.claude/agents/` | data, kenya, lina (and sparky in `.claude/agents/`) | Yes |

So Data's note still holds, and it is **wider than the one agent**: it affects every Kiro-rendered agent that has the section, in both the consumer output (3) and the steward outputs (4). It is Kiro-only; CC is correct.

**Cause (read)**: `adapters/kiro.ts` L357–376 emits the heading as `## Ground truth\n\n…` (steward leg, L376; consumer leg via `groundTruthPieces`, L589) directly after the pass-through body's last span, which ends in a single `\n`. The CC adapter's neighbouring emit leaves a blank line before the heading. The fix is a leading blank line on the Kiro side, placed where it belongs.

## Fix shape and what it moves

- Add the missing separator in `adapters/kiro.ts`, in the steward leg and in the consumer leg's container piece.
- **Which span holds the new blank line decides what moves.** In the container span (the `## Ground truth` heading's span), which no signed row hashes (Data: "this row does not hash them"), no signed consumer hash moves. If it were placed in the preceding body unit's last span, that unit's rows would move. Prefer the container; confirm with `renderedHashOf` before editing.
- The steward's committed `.kiro/agents/{data,kenya,lina,sparky}-prompt.md` change (one blank line each), so the steward outputs and the guard lock's `outputs` move; the 122 diff-guard moves with them. That is a steward-output change, so Thurgood (Civitas steward) is consulted before the fixing PR opens.
- Rendered consumer output `canonical/_consumer-output/kiro/**` changes for three agents.
- If the batch shares a PR with the intro-line fix, they share the one lock refresh.

## Grant

None filed here. File a `**Grant paths**:` list in this issue before the fixing PR opens (README rule 8): at minimum `tools/agent-generator/adapters/kiro.ts`, `.kiro/agents/**`, `canonical/_consumer-output/kiro/**`, `canonical/generated.lock`, and the relevant tests/goldens.

## Counter-argument and what survives

- **Against fixing**: cosmetic, and it moves steward outputs for a Markdown-readability nit; the 122 posture favours not touching steward bytes without a reason. If the reason is only aesthetic, leaving it recorded and unfixed is defensible.
- **For fixing**: the sibling CC output has the blank line, so the two targets render the same section differently, and a Markdown linter or a stricter renderer treats a heading that is not preceded by a blank line as part of the preceding paragraph in some dialects. Which of the two is the right resting state is a pick for Peter, so I did not fold it.
