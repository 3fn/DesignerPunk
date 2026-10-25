# Grant: re-author the two signed units the Product MCP correction stales (audit fix-now item 8)

**Date**: 2026-10-24
**Status**: ACTIVE. It carries a grant that does nothing until Peter's merge activates it (rule 8; § "Activation").
**Owner**: Thurgood (owner of the operative set `canonical/operative-sets/civitas-system-overview.yaml`, `owner: thurgood`, and author of the consumer profile it re-grounds)
**Trigger**: `release:next:phase-1` — the event that owes the close is the fixing PR's merge (`fix/ballot-audit-product-mcp-correction`). The owner re-tokens this line to `merge:#<N>` when that PR is open. The correction is owed before 16.1.0 ships, so the release walk reads it there.
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
