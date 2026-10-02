# Issue: VALVE-1 per-trim spans — a `groundTruthManifest` trim row's rendered hash is unobservable

**Date**: 2026-09-30
**Status**: CLOSED 2026-10-02 (see § "Closed — 2026-10-02" at the end of this file)
**Owner**: Lina
**Trigger**: before Spec 123 Task 18's G2 runs (pass four, U2b's gating parent). The fix moves signed rendered hashes, so it lands before the verdict that reads them, never after. *(amended 2026-10-01 — also gated on ratification: the fix lands after `.kiro/docs/ballots/2026-10-01-signing-act-chain.md` is RATIFIED. Kenya's and Data's re-signs on the fixing PR are authorized by that ballot's standing signing-act rule (§ 2), not by a tasks-row or issue-row grant; the re-signs are walked by `verify-signing-chain --audit`.)*
**Source**: Spec 123 Task 15's parent completion doc, `.kiro/specs/123-consumer-distribution/completion/task-15-completion.md` L107 ("Signature valve blind spots") and L123 (§ "Carries" → Lina's area), on U2b's unit branch at `3bd520a6` and reaching `main` at U2b's merge; and Lina's pre-Task-16 consult of 2026-09-30 (Q-c: an issue, owner Lina, triggered before G2, outside Task 16). Filed with the Task 16 scope amendment (`chore/123-task-16-scope-and-rows`).

---

## The gap

VALVE 1 (Req 11.5.6) attaches a signed judgment to **its unit's canonical source and its rendered output as of signing**, and carries it forward until either changes. For the `ambient.groundTruthManifest.trims[<path>]` rows the second key cannot be read.

Both adapters render the whole ground-truth manifest as **one** entry span: `emit([{ kind: 'entry', path: 'ambient.groundTruthManifest', … }])` over `renderGroundTruthTrims(…)`'s joined output (`tools/agent-generator/adapters/cc.ts` L327–330, `adapters/kiro.ts` L362–365; the renderer is `tools/agent-generator/render.ts` L165). So every trim row in an agent hashes the same manifest-level render. A change to one trim's rendered text moves every trim row's `renderedHash` together, and an unchanged trim cannot be told apart from a changed sibling.

*(amended 2026-10-01 — correction, verified against `tools/agent-generator/derive.ts` ~L615 (`renderedHashOf`) and the three consumer dispositions files at `3820b32f`: the shape of the defect above is right, but not its current effect. `renderedHashOf` hashes only the spans whose `source` matches a row's source **exactly**; no span carries a per-row frontmatter source for a trim, or for `ambient.groundTruthManifest.verdict`, so every one of the 10 signed manifest rows — Kenya's 3, Data's 3, Sparky's 4 (one `verdict` row each, plus their trims) — matches zero spans and pins the **empty-list hash** `sha256:37517e5f3dc66819f61f5a7bb8ace1921282415f10551d2defa5c3eb0985b570`. They hash nothing today, not "the manifest-level render" as stated above. The fix must give the `verdict` rows their own spans too, not only the trims — see "The fix" below.)*

**Affected rows today: 7** — Kenya 2, Data 2, Sparky 3 (`git grep -c 'groundTruthManifest.trims\['` over `canonical/profiles/consumer/*.dispositions.yaml` at `3bd520a6`). They were signed on the canonical text (Sparky's note: "Signed on the text per VALVE-1"), which is sound but leaves the rendered half of the carry-forward key blind.

*(amended 2026-10-01 — this "7" is a correct grep count of `trims[…]` rows, but it is not the set that needs re-signing. All 10 manifest rows (the 7 trims plus the 3 `verdict` rows) are unobserved today, and of those 10, only 4 actually move once spans exist — see the corrected "small re-sign" note under "The fix".)*

## The fix

- **Per-trim spans**: the trim renderer and `spans.ts` emit one span per trim member, sourced `…#frontmatter:ambient.groundTruthManifest.trims[<path>]`, the same per-member rule DD26 applies to list fields. The manifest heading stays a container that renders only when a member survives (Task 15's survivor-sourced criterion). *(amended 2026-10-01 — the `ambient.groundTruthManifest.verdict` row needs its own span too, sourced `…#frontmatter:ambient.groundTruthManifest.verdict`: today it matches zero spans for the same reason the trims do.)*
- **Steward output is byte-identical**: Task 10's goldens pass unchanged, `semantics-guard.test.ts` stays green, and `npm run check:122:diff-guard` moves only by the consumer rendering.
- **A small re-sign**: ~~the 7 trim rows' `renderedHash` values move~~ *(amended 2026-10-01 — corrected: of the 10 rows that are blind today, only 4 actually move once spans exist — the rows that will render something. Kenya's retained `ambient.groundTruthManifest.verdict` row and its re-pointed `trims[dist/ComponentTokens.ios.swift]` row; Data's retained `verdict` row and its re-pointed `trims[dist/ComponentTokens.android.kt]` row. Sparky's rows, and every `superseded-by` trim including Kenya's and Data's, stay at the empty-list hash — nothing renders under their row source once the destination has moved elsewhere or the disposition has no consumer counterpart — so they need no re-sign.)* Each row's C1 seat re-signs its own rows (~~Kenya, Data, Sparky~~ *(amended 2026-10-01 — Sparky needs no re-sign; only Kenya and Data do)*); the re-sign acts are listed in the fixing PR.
- **Verify**: a test shows that editing one trim's rendered text moves only that trim's span hash (bite recorded red against the single-span form); `npm run test:agent-generator` green; diff-guard `full-run-green` with the lock refreshed.

## Grant

**Grant paths**: `tools/agent-generator/adapters/cc.ts`, `tools/agent-generator/adapters/kiro.ts`, `tools/agent-generator/spans.ts`, `tools/agent-generator/render.ts`, `tools/agent-generator/__tests__/**`, `canonical/_consumer-output/**`, `canonical/generated.lock`

*(amended 2026-10-01 — dropped: `canonical/profiles/consumer/{kenya,data,sparky}.dispositions.yaml` and `canonical/profiles/consumer/signatures/{kenya,data,sparky}.md`. Under the signing-act ballot drafted on `chore/signing-act-ballot` (`.kiro/docs/ballots/2026-10-01-signing-act-chain.md` § 2, "M1 — the authorization rule"), a C1 seat's signing act needs no tasks-row or issue-row grant — the C1 function authorizes it directly, bound to the branch's freshness stale list, once that ballot is RATIFIED. This issue's owner, Lina, signs none of those six files, so this grant never covered the acts the issue described. Kenya's and Data's re-signs on the fixing PR are authorized by the ballot, not by this grant.)*

- `render.ts` covers `renderGroundTruthTrims` only; `__tests__/**` covers the per-trim span test and any golden it moves.
- The grant holds on the fixing PR's branch only. It is activated by Peter's merge of a PR whose body names this issue and this path list, and it expires when the fixing PR merges (`.kiro/issues/README.md` rule 8).
- It confers no ratification authority, and it touches no governance-law path.
- **The fixing PR targets U2b's unit branch, not `main`**: `canonical/_consumer-output/**` and the consumer profile exist only there until U2b merges. The U2b PR body cites this path list.

---

## Closed — 2026-10-02

*Recorded 2026-10-02 by Lina, after Spec 123's U2b merged to `main` (PR #262, squash `669b51b0`). Nothing above is rewritten; the Status line is the only edit outside this section.*

**Outcome**: per-row ground-truth spans landed; the four rows that move were re-signed; the lock was refreshed.
- **Spans**: commit `1a2ff94f` (on the fixing branch `chore/valve-1-per-trim-spans`, PR #261).
- **Signing acts** (each an ASSENT, `surviving: []`, under the signing-act ballot `.kiro/docs/ballots/2026-10-01-signing-act-chain.md`, no grant): Kenya `c2fba158` (`ambient.groundTruthManifest.verdict` and `trims[dist/ComponentTokens.ios.swift]`) and Data `2d243aa4` (`ambient.groundTruthManifest.verdict` and `trims[dist/ComponentTokens.android.kt]`): 4 acts, the four rows the 2026-10-01 correction above named. Sparky needed none.
- **Lock refresh**: `823c583d` (guard-written; it absorbs VALVE-1's own `inputClosure` move, `fafae2b0`'s, and #259's deferred one), under the Task 18 lock-refresh grant.
- **Entry to the unit branch**: PR #261 entered `task/123-u2b-profile` by a **non-squash merge**, `7071e39f`, performed by the orchestrator under Peter's authorization ("You run it — I authorize it for this one PR"), because the branch carries two signing commits (ballot § 4.6; the merge button squashes). It reached `main` through U2b's squash, #262 `669b51b0`. The grant was named by #242 (`aadf9ab3`) and narrowed by #243 (`2da74864`); the fixing branch's base was `fafae2b0`.
- **Steward output**: byte-identical (the grant's own criterion).
- **Grant**: expired at #262's merge (README rule 8).
- **Residual, recorded by both seats (not a refusal)**: the shared verdict intro line says "stale/generated" while the one listed artifact is generated and un-themed. Kenya's and Data's signature files (`canonical/profiles/consumer/signatures/{kenya,data}.md`, 2026-10-02) carry it. Tracked as `2026-10-02-ground-truth-intro-line-stale-generated.md`.
- **Trigger**: fired as amended (ratification of the signing-act ballot, then before Task 18's G2).
