# Issue: VALVE-1 per-trim spans — a `groundTruthManifest` trim row's rendered hash is unobservable

**Date**: 2026-09-30
**Status**: ACTIVE
**Owner**: Lina
**Trigger**: before Spec 123 Task 18's G2 runs (pass four, U2b's gating parent). The fix moves signed rendered hashes, so it lands before the verdict that reads them, never after.
**Source**: Spec 123 Task 15's parent completion doc, `.kiro/specs/123-consumer-distribution/completion/task-15-completion.md` L107 ("Signature valve blind spots") and L123 (§ "Carries" → Lina's area), on U2b's unit branch at `3bd520a6` and reaching `main` at U2b's merge; and Lina's pre-Task-16 consult of 2026-09-30 (Q-c: an issue, owner Lina, triggered before G2, outside Task 16). Filed with the Task 16 scope amendment (`chore/123-task-16-scope-and-rows`).

---

## The gap

VALVE 1 (Req 11.5.6) attaches a signed judgment to **its unit's canonical source and its rendered output as of signing**, and carries it forward until either changes. For the `ambient.groundTruthManifest.trims[<path>]` rows the second key cannot be read.

Both adapters render the whole ground-truth manifest as **one** entry span: `emit([{ kind: 'entry', path: 'ambient.groundTruthManifest', … }])` over `renderGroundTruthTrims(…)`'s joined output (`tools/agent-generator/adapters/cc.ts` L327–330, `adapters/kiro.ts` L362–365; the renderer is `tools/agent-generator/render.ts` L165). So every trim row in an agent hashes the same manifest-level render. A change to one trim's rendered text moves every trim row's `renderedHash` together, and an unchanged trim cannot be told apart from a changed sibling.

**Affected rows today: 7** — Kenya 2, Data 2, Sparky 3 (`git grep -c 'groundTruthManifest.trims\['` over `canonical/profiles/consumer/*.dispositions.yaml` at `3bd520a6`). They were signed on the canonical text (Sparky's note: "Signed on the text per VALVE-1"), which is sound but leaves the rendered half of the carry-forward key blind.

## The fix

- **Per-trim spans**: the trim renderer and `spans.ts` emit one span per trim member, sourced `…#frontmatter:ambient.groundTruthManifest.trims[<path>]`, the same per-member rule DD26 applies to list fields. The manifest heading stays a container that renders only when a member survives (Task 15's survivor-sourced criterion).
- **Steward output is byte-identical**: Task 10's goldens pass unchanged, `semantics-guard.test.ts` stays green, and `npm run check:122:diff-guard` moves only by the consumer rendering.
- **A small re-sign**: the 7 trim rows' `renderedHash` values move. Each row's C1 seat re-signs its own rows (Kenya, Data, Sparky); the re-sign acts are listed in the fixing PR.
- **Verify**: a test shows that editing one trim's rendered text moves only that trim's span hash (bite recorded red against the single-span form); `npm run test:agent-generator` green; diff-guard `full-run-green` with the lock refreshed.

## Grant

**Grant paths**: `tools/agent-generator/adapters/cc.ts`, `tools/agent-generator/adapters/kiro.ts`, `tools/agent-generator/spans.ts`, `tools/agent-generator/render.ts`, `tools/agent-generator/__tests__/**`, `canonical/_consumer-output/**`, `canonical/generated.lock`, `canonical/profiles/consumer/{kenya,data,sparky}.dispositions.yaml`, `canonical/profiles/consumer/signatures/{kenya,data,sparky}.md`

- `render.ts` covers `renderGroundTruthTrims` only; `__tests__/**` covers the per-trim span test and any golden it moves.
- The grant holds on the fixing PR's branch only. It is activated by Peter's merge of a PR whose body names this issue and this path list, and it expires when the fixing PR merges (`.kiro/issues/README.md` rule 8).
- It confers no ratification authority, and it touches no governance-law path.
- **The fixing PR targets U2b's unit branch, not `main`**: `canonical/_consumer-output/**` and the consumer profile exist only there until U2b merges. The U2b PR body cites this path list.
