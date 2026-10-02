# Issue: the shared ground-truth verdict intro line says "stale/generated" about an artifact that is generated and un-themed

**Date**: 2026-10-02
**Status**: ACTIVE
**Owner**: Lina (the edit: `tools/agent-generator/render.ts`, and the adapter if the fix is consumer-only). **Fork on ownership, surfaced not picked**: the seats' signature sheets say the reword is "the profile author's or `render.ts` owner's authoring". The wording is a content choice about what a consumer agent should do (a profile-author question: Thurgood re-authored the consumer profile batch); the text lives in `render.ts` and the adapters (Lina's machinery). I take the edit because it is machinery and I authored the VALVE-1 change to this function; if Peter wants the wording authored by the profile author, I execute the edit to the text Thurgood supplies.
**Trigger**: **the first of**: (a) the next event that already requires Kenya or Data to re-sign their `ambient.groundTruthManifest.verdict` row (any change that moves that row's rendered hash), or (b) U3's kickoff (Task 19's start). Why: the reword moves two signed rendered hashes (below), so it costs a re-sign round under the signing-act ballot; batching it with a re-sign that is happening anyway makes it near-free, and the U3 kickoff is the next planned event on the plan, so the batch cannot wait indefinitely. It is cosmetic (a consumer agent that obeys the line still does the right thing, per both seats), so it does not block release 2.
**Source**: Kenya's and Data's recorded residuals, `canonical/profiles/consumer/signatures/kenya.md` (the `#frontmatter:ambient.groundTruthManifest.verdict` section, "Re-sign 2026-10-02 … Residual (not a refusal)") and `canonical/profiles/consumer/signatures/data.md` (same section). Listed under "New issues" in `.kiro/specs/123-consumer-distribution/completion/task-18-completion.md`.

---

## The gap

`tools/agent-generator/render.ts` L193–194 (`renderGroundTruthTrims`, at `669b51b0`) builds the intro line: "Your token ground truth is served LIVE by MCP — never a build snapshot. Do NOT read these stale/generated artifacts; query the live tool instead:". Under the consumer profile the one artifact listed for Kenya and for Data is the re-pointed ComponentTokens trim, which is generated and un-themed, not stale. Both seats assented to `retained` and recorded the wording as a residual, not a refusal; the trim's own removal of "stale" (subtraction-3) does not reach the intro line.

## What I verified on `main` (669b51b0), and where it differs from the brief

- **The text is shared with the steward render.** The same string is in the committed steward outputs, `.claude/agents/{data,kenya,sparky}.md` and `.kiro/agents/{data,kenya,sparky}-prompt.md`, as well as the consumer renders, `canonical/_consumer-output/{cc/.claude/agents/{data,kenya}.md,kiro/.kiro/agents/{data,kenya}-prompt.md}`. In the steward the listed artifacts are the repo's own snapshot files, where "stale" may be apt; I have not judged that. So there are two fix shapes, and the pick is the owner's with Peter: (1) reword the shared template, which moves the steward outputs (`.claude/agents`, `.kiro/agents`, goldens, the lock's `outputs`) as well as the consumer's; or (2) a consumer-only intro (an adapter or profile-conditioned variant), which leaves the steward byte-identical.
- **Signed hashes that move: two, not four.** The intro line is the span of the `ambient.groundTruthManifest.verdict` row (`adapters/cc.ts`, `adapters/kiro.ts`, `groundTruthPieces`: the verdict piece carries `trims.intro`); each trim row's span is its own line. So the rows that move are **Kenya's `verdict` and Data's `verdict`**, not their trim rows. No other seat's verdict row both renders the line and carries a signature: Sparky's verdict is `no-consumer-counterpart` (renders nothing, stays at the empty-list hash), and Ada's, Leonardo's, Lina's, Stacy's and Thurgood's `retained` verdict rows are unsigned. **The brief's "Kenya 2, Data 2" does not hold; the span read says 1 each.** Re-verify with `renderedHashOf` at execution.
- **The fix is a re-sign round, not a signing act by me**: Kenya and Data re-assent to their verdict rows under the signing-act ballot (`.kiro/docs/ballots/2026-10-01-signing-act-chain.md`); the guard lock's `inputClosure` moves as well (a `render.ts` edit), refreshed under whatever lock-refresh authority stands then.

## Grant

None filed here. The fixing PR needs `tools/agent-generator/render.ts` (and `adapters/{cc,kiro}.ts` if the fix is consumer-only), the regenerated consumer output, and `canonical/generated.lock`. File a `**Grant paths**:` list in this issue before the fixing PR opens (README rule 8), after the shape is picked.

## Counter-argument and what survives

- **Against doing it at all**: it is a wording nit on a line that works; each reword costs two seats a re-sign and moves the lock, and consumers who already installed release 2 receive the correction only on their next sync. A tracked residual with the trigger above may be the right resting state if no re-sign is otherwise coming.
- **Against the batching trigger**: "the next re-sign of either verdict row" may be far off, which is why the U3 kickoff backstop exists. If Peter prefers a hard date-free bound tied to a release instead (for example "before release 3's tag"), that is his call.
