# Grant: re-author the two signed units the Product MCP correction stales (audit fix-now item 8)

**Date**: 2026-10-24
**Status**: **CLOSED at #465's merge** *(set 2026-10-25, Thurgood, owner, rule 5; was: ACTIVE, the grant inert until activation)*. Activated by #464 (`2eafd7296`); every act is on the fixing branch (outcome below), and the grant expires at the fixing PR's merge.
**Owner**: Thurgood (owner of the operative set `canonical/operative-sets/civitas-system-overview.yaml`, `owner: thurgood`, and author of the consumer profile it re-grounds)
**Trigger**: `merge:#465` — the fixing PR's merge (`fix/ballot-audit-product-mcp-correction`) owes the close, and the grant expires there. The correction is owed before 16.1.0 ships. *(Re-ruled 2026-10-25, Thurgood, owner, rules 1 and 9: was `release:next:phase-1`, pending the PR number. The grant was activated by #464, merge `2eafd7296`, 2026-10-25T02:56:43Z.)*
**Class**: P0 false-claim · grant *(set 2026-10-24, Thurgood, rule 12. The shipped consumer rendering of the Systems Overview (`canonical/_consumer-output/**/designerpunk-systems-overview.md`) tells consumers that the Product MCP is "conceptual", while the package ships it (`dist/mcp/product-mcp.js`, 14 tools). Stacy may confirm or dispute the P0 reading; only Peter downgrades it.)*
**Source**:
- The finding: Spec 131 ballot audit fix-now item 8 (`[THURGOOD R3]` "Corrected, with evidence" item 2, `.kiro/specs/131-governance-simplification/feedback/design-outline.md`). The steering correction itself is CORRECTION, committed at `d4bd2ea49` on the fixing branch. That commit stales two signed units, so the fixing PR cannot go green without the acts below.
- **Peter's direction**, relayed by the orchestrator, 2026-10-24, in chat, verbatim: **"Let's go (a)"**. As put to him, (a) was: grant the `canonical/**` re-authoring for the two signed units that `.kiro/steering/Civitas-System-Overview.md` ~L39 and `.kiro/steering/DesignerPunk-Systems-Overview.md` ~L180 render from, those two units only, so that the correction ships with 16.1.0 and the release falsity floor is not tripped. Thurgood re-authors; Stacy re-confirms and re-signs. *This record holds the relay only. The authority is Peter's merge of the PR of branch `chore/product-mcp-grant-record`, which adds this list and names it in its body (rule 8; ballot `2026-09-27-ci-regime-standing-scope` § 3 clause 4).*
**Consulted**: none needed — filing only. Stacy's C1 acts follow, in her seat.

---

**Grant paths**: `canonical/operative-sets/civitas-system-overview.yaml`, `canonical/profiles/consumer/always-set/civitas-system-overview.overlay.md`, `canonical/_consumer-output/_canonical/always-set/designerpunk-systems-overview.md`, `canonical/_consumer-output/cc/.claude/identity/designerpunk-designerpunk-systems-overview.md`, `canonical/_consumer-output/kiro/.kiro/steering/designerpunk-designerpunk-systems-overview.md`, `canonical/generated.lock`

- **Grantee**: Thurgood, this record's named owner.
- **Activation**: Peter's merge of the PR of branch `chore/product-mcp-grant-record`, a one-file PR whose diff adds this list and whose body names this grant: this record's path and the six paths (rule 8). That PR merges before the fixing PR, and no other PR activates this grant.
- **Expiry**: the fixing PR's merge (`fix/ballot-audit-product-mcp-correction`).
- **What each path is for**. The enumeration comes from a dry run, made 2026-10-24 in the working tree and discarded before this record was committed: the two author edits below, then `npx tsx tools/agent-generator/generate.ts`. It wrote these five files and nothing else in `canonical/`; the lock moves at the guard's full run.
  - `canonical/operative-sets/civitas-system-overview.yaml`: the **item text** of `what-civitas-con-8` (`label` and `text`), re-authored to the corrected L39, verbatim. **Not** the unit's `canonicalHash`, which is the confirmer's object and moves only by Stacy's re-confirm (#396 precedent).
  - `canonical/profiles/consumer/always-set/civitas-system-overview.overlay.md`: the `## @unit #what-civitas-contains @ sha256:…` pin, moved to the unit's new hash. The overlay's consumer text already says what the consumer's Product MCP does, so it is unchanged.
  - The three `canonical/_consumer-output/**/designerpunk-systems-overview.md` files: regenerated renderings of the retained `#civitas-system-governance-infrastructure` unit (the diagram node). They are written by the generator, never by hand.
  - `canonical/generated.lock`: refreshed by a green `npm run -s check:122:diff-guard` full run.
- **Governance paths: not grantable, and not in this list.** The two steering edits (`.kiro/steering/Civitas-System-Overview.md`, `.kiro/steering/DesignerPunk-Systems-Overview.md`) are CORRECTION, Peter-merged under the carve-out.
- **C1 acts need no grant** (rule 8; ballot `2026-10-01-signing-act-chain` M1). They are Stacy's: the `canonicalHash` moves in `canonical/operative-sets/civitas-system-overview.yaml` and `canonical/operative-sets/designerpunk-systems-overview.yaml`, `canonical/profiles/consumer/confirmations/civitas-system-overview.md`, `canonical/profiles/consumer/confirmations/designerpunk-systems-overview.md`, the `#what-civitas-contains` signature sub-object in `canonical/profiles/consumer/always-set/civitas-system-overview.dispositions.yaml`, and `canonical/profiles/consumer/signatures/civitas-system-overview.md`.
- **Note for the claims pass and Stacy's reads** (clause 6): the fixing PR's `git diff --name-only` is therefore exactly this list, plus the two steering paths under the carve-out, plus the C1 files above. All are named here ahead of time, so none reads as an out-of-list edit.
- **Trace** (clause 7): every path traces to the stale rows that `check:122:diff-guard` reported at `d4bd2ea49`. Those rows are `canonical/operative-sets/civitas-system-overview.yaml#what-civitas-contains` (confirmation; item `what-civitas-con-8` not verbatim), `canonical/operative-sets/designerpunk-systems-overview.yaml#civitas-system-governance-infrastructure` (confirmation), and `civitas-system-overview.dispositions.yaml#what-civitas-contains` (signature; the overlay is stale).

## The sequence

1. Peter merges the PR of branch `chore/product-mcp-grant-record`, which carries only this record and names the grant in its body. That merge activates the grant.
2. After the activating merge, and not before, Thurgood makes one authoring commit on the fixing branch: the item text and the overlay pin, then `generate.ts` for the renderings. Merging `main` into the fixing branch first is optional; if it is done, it is a merge, never a rebase.
3. Stacy, in her seat, makes three C1 acts, one commit each, by the signing-seat brief: re-confirm `civitas-system-overview #what-civitas-contains`, re-confirm `designerpunk-systems-overview #civitas-system-governance-infrastructure`, and re-sign `civitas-system-overview.dispositions.yaml#what-civitas-contains`.
4. `canonical/generated.lock` is refreshed by a green full guard run. `verify-signing-chain --ci` passes.
5. Peter merges the fixing PR. The grant expires, and this record closes by rule 5's dated outcome line in that PR.

---

**2026-10-25 — CLOSED at #465's merge (Thurgood, owner, rule 5).** Every act is done on `fix/ballot-audit-product-mcp-correction` (PR #465). The record closes, and the grant expires, at that PR's merge. It is archived in the same PR, as rule 5 asks ("ideally in the PR that closes it"; "a grant archives at its fixing PR's merge").
- **Activation**: Peter merged #464 (`2eafd7296`) at 2026-10-25T02:56:43Z. `main` was merged into the fixing branch at `0953ddf0c`, and no authoring preceded that merge.
- **Authoring (Thurgood, under the grant)**: `0e2a2bd41`. It changed the `what-civitas-con-8` label and text, verbatim from the corrected L39; moved the overlay's `@unit #what-civitas-contains` pin to `sha256:1cf39e5c…937b` (overlay text unchanged); and regenerated the three `designerpunk-systems-overview` renderings with `generate.ts`. No `canonicalHash` was moved.
- **C1 acts (Stacy, no grant needed)**:
  - `a7fb52020`: re-confirm, civitas-system-overview `#what-civitas-contains` (`canonicalHash` → `sha256:1cf39e5cf23bce5b04edc831db1e0d71c5881b086a58fddbd862115c9797937b`).
  - `6fe7822f1`: re-confirm, designerpunk-systems-overview `#civitas-system-governance-infrastructure` (→ `sha256:9751b1889d6e335ee645e098db78bc7d94ef3df5c7023e34cad717ce2e14e790`).
  - `8cb55bbeb`: re-sign, `civitas-system-overview.dispositions.yaml#what-civitas-contains`, assent 7/10.
  - She confirmed the P0 class.
- **Lock (the sixth grant path)**: refreshed from the guard's green full run, in the commit that archives this record. `inputClosure` `de5bea3e…` → `623ccb0c…`. **`outputs` `e7aa902c…` → `8bc3301c…`**: the consumer renderings changed, as intended. The shipped Systems Overview no longer calls the Product MCP "conceptual".
- **Scope** (clause 6, against the list as it stood at `2eafd7296`): `git diff --name-only 0953ddf0c HEAD` lists the six grant paths, Stacy's C1 files and this record (moved to `archive/`). Each was named ahead of time in § "Grant paths". The two steering CORRECTION files came in at `d4bd2ea49`, under the carve-out.
- **Checks at the closing commit**: `check:122:diff-guard` no-op-green with 0 stale rows; `verify-signing-chain --ci` PASS at bases `e4e61eea2` and `2eafd7296` (orchestrator's run, after Stacy's acts).

