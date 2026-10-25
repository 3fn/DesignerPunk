# Grant: re-author the three signed units the identity-doc count correction stales

**Date**: 2026-10-25
**Status**: **CLOSED at #467's merge** *(set 2026-10-25, Thurgood, owner, rule 5; was: ACTIVE, the grant inert until activation)*. Activated by #466 (`311d3a42f`); every act is on the fixing branch (outcome below), and the grant expires at the fixing PR's merge.
**Owner**: Thurgood (owner of the operative set `canonical/operative-sets/civitas-system-overview.yaml`, `owner: thurgood`, and author of the consumer profile it re-grounds)
**Trigger**: `merge:#467` — the fixing PR's merge (branch `fix/identity-doc-stale-counts`) owes the close, and the grant expires there. The correction is owed before 16.1.0 ships. *(Re-ruled 2026-10-25, Thurgood, owner, rules 1 and 9: was `release:next:phase-1`, pending the PR number. The grant was activated by #466, merge `311d3a42f`, 2026-10-25T03:44:50Z.)*
**Class**: P0 false-claim · grant *(set 2026-10-25, Thurgood, rule 12. By M7's P0 definition — "a statement false in a surface where a reader of the package meets it", which includes an agent profile — this is P0. The consumer's always-loaded Systems Overview member (`canonical/_consumer-output/**/designerpunk-systems-overview.md`, unit `#high-level-designerpunk-three-system-architecture` and `#civitas-system-governance-infrastructure`, both `retained`) ships "Steering Docs (92: 83 MCP-served + 9 identity)" and "Docs MCP 83 docs, 2,833 sections"; the measured values are 93 (84 + 9) and 84 / 2,535. The Civitas Overview's counts are subtracted from the consumer copy (its overlay), so on their own they would be in-repo only, P2 `(record)`. Stacy may confirm or dispute the P0 reading; only Peter downgrades it.)*
**Source**:
- The finding: the steward's side note in the item 8 fix (Spec 131 ballot audit; `.kiro/issues/archive/2026-10-24-product-mcp-correction-signed-units-grant.md`'s PR #465), stale counts in `.kiro/steering/Civitas-System-Overview.md` and `.kiro/steering/DesignerPunk-Systems-Overview.md`. The steering CORRECTION is committed at `cf53ef403` on the fixing branch, with each count measured by command (the fixing PR's body carries the table).
- **Peter's direction**, relayed by the orchestrator, 2026-10-25, in chat, verbatim: **"Let's fix them"** (covering the stale counts in those two docs and their diagram copies). *This record holds the relay only. The authority is Peter's merge of the PR of branch `chore/identity-doc-counts-grant-record`, which adds this list and names it in its body (rule 8; ballot `2026-09-27-ci-regime-standing-scope` § 3 clause 4).*
**Consulted**: none needed — filing only. Stacy's C1 acts follow, in her seat.

---

**Grant paths**: `canonical/operative-sets/civitas-system-overview.yaml`, `canonical/profiles/consumer/always-set/civitas-system-overview.overlay.md`, `canonical/_consumer-output/_canonical/always-set/designerpunk-systems-overview.md`, `canonical/_consumer-output/cc/.claude/identity/designerpunk-designerpunk-systems-overview.md`, `canonical/_consumer-output/kiro/.kiro/steering/designerpunk-designerpunk-systems-overview.md`, `canonical/generated.lock`

- **Grantee**: Thurgood, this record's named owner.
- **Activation**: Peter's merge of the PR of branch `chore/identity-doc-counts-grant-record`, a one-file PR whose diff adds this list and whose body names this grant: this record's path and the six paths (rule 8). That PR merges before the fixing PR, and no other PR activates this grant.
- **Expiry**: the fixing PR's merge (branch `fix/identity-doc-stale-counts`).
- **What each path is for**. Enumerated by a dry run on the fixing branch at `cf53ef403` (2026-10-25, the two author edits below, then `npm run build:generator` and `npx tsx tools/agent-generator/generate.ts`), discarded with `git checkout -- canonical/` before anything was committed. It changed these five files and nothing else in `canonical/`; the lock moves at the guard's full run.
  - `canonical/operative-sets/civitas-system-overview.yaml`: the **item text** of `what-civitas-con-6` (the Docs MCP line), re-authored to the corrected L37 verbatim. Its `label` (the first 60 characters) is unchanged. **Not** the unit's `canonicalHash`, which is the confirmer's object.
  - `canonical/profiles/consumer/always-set/civitas-system-overview.overlay.md`: the `## @unit #what-civitas-contains @ sha256:…` pin, moved to the unit's new hash. The overlay's consumer text subtracts DesignerPunk's own counts and is unchanged.
  - The three `canonical/_consumer-output/**/designerpunk-systems-overview.md` files: regenerated renderings of the two retained Systems Overview units (the two diagram copies), written by the generator, never by hand.
  - `canonical/generated.lock`: refreshed by a green `npm run -s check:122:diff-guard` full run.
- **Governance paths: not grantable, and not in this list.** The two steering edits (`.kiro/steering/Civitas-System-Overview.md`, `.kiro/steering/DesignerPunk-Systems-Overview.md`) are CORRECTION, Peter-merged under the carve-out.
- **C1 acts need no grant** (rule 8; ballot `2026-10-01-signing-act-chain` M1). They are Stacy's: the `canonicalHash` moves in `canonical/operative-sets/civitas-system-overview.yaml` (`#what-civitas-contains`) and `canonical/operative-sets/designerpunk-systems-overview.yaml` (`#high-level-designerpunk-three-system-architecture`, `#civitas-system-governance-infrastructure`), `canonical/profiles/consumer/confirmations/civitas-system-overview.md`, `canonical/profiles/consumer/confirmations/designerpunk-systems-overview.md`, the `#what-civitas-contains` signature sub-object in `canonical/profiles/consumer/always-set/civitas-system-overview.dispositions.yaml`, and `canonical/profiles/consumer/signatures/civitas-system-overview.md`.
- **Note for the claims pass and Stacy's reads** (clause 6): the fixing PR's `git diff --name-only` is therefore exactly this list, plus the two steering paths under the carve-out, plus the C1 files above, all named here ahead of time.
- **Trace** (clause 7): every path traces to the stale rows `check:122:diff-guard` reported at `cf53ef403` — `civitas-system-overview.yaml#what-civitas-contains` (confirmation; item `what-civitas-con-6` not verbatim), `designerpunk-systems-overview.yaml#high-level-designerpunk-three-system-architecture` (confirmation), `designerpunk-systems-overview.yaml#civitas-system-governance-infrastructure` (confirmation), and `civitas-system-overview.dispositions.yaml#what-civitas-contains` (signature; the overlay stale).

## The sequence

1. Peter merges the PR of branch `chore/identity-doc-counts-grant-record`, which carries only this record and names the grant in its body. That merge activates the grant.
2. After the activating merge, and not before, Thurgood makes one authoring commit on the fixing branch: the item text and the overlay pin, then `generate.ts` for the renderings. Merging `main` into the fixing branch first is optional; if it is done, it is a merge, never a rebase.
3. Stacy, in her seat, makes four C1 acts, one commit each, by the signing-seat brief: re-confirm `civitas-system-overview #what-civitas-contains`, re-confirm `designerpunk-systems-overview #high-level-designerpunk-three-system-architecture`, re-confirm `designerpunk-systems-overview #civitas-system-governance-infrastructure`, and re-sign `civitas-system-overview.dispositions.yaml#what-civitas-contains`.
4. `canonical/generated.lock` is refreshed by a green full guard run. `verify-signing-chain --ci` passes.
5. Peter merges the fixing PR. The grant expires, and this record closes by rule 5's dated outcome line in that PR (and moves to `archive/` there).

---

**2026-10-25 — CLOSED at #467's merge (Thurgood, owner, rule 5).** Every act is done on `fix/identity-doc-stale-counts` (PR #467). The record closes, and the grant expires, at that PR's merge. It is archived in the same PR, as rule 5 asks ("ideally in the PR that closes it"; "a grant archives at its fixing PR's merge").
- **Steering CORRECTION**: `cf53ef403`, under the carve-out. Every count was measured by command and re-measured at `94e8bbec5` after `main` (with #450) was merged in; none moved.
- **Activation**: Peter merged #466 (`311d3a42f`) at 2026-10-25T03:44:50Z. `main` was merged into the fixing branch at `94e8bbec5`, and no authoring preceded the activation.
- **Authoring (Thurgood, under the grant)**: `d25990912`. It re-authored the `what-civitas-con-6` text verbatim from the corrected Docs MCP line (label unchanged); moved the overlay's `@unit #what-civitas-contains` pin to `sha256:77dc3cb6…8a26` (overlay text unchanged); and regenerated the three `designerpunk-systems-overview` renderings with `generate.ts`. No `canonicalHash` moved.
- **C1 acts (Stacy, no grant needed)**:
  - `3f2d178b9`: re-confirm, civitas-system-overview `#what-civitas-contains`.
  - `027b8904a`: re-confirm, designerpunk-systems-overview `#high-level-designerpunk-three-system-architecture`.
  - `58fc1abbc`: re-confirm, designerpunk-systems-overview `#civitas-system-governance-infrastructure`.
  - `ced8d7220`: re-sign, `civitas-system-overview.dispositions.yaml#what-civitas-contains`, assent 7/10.
  - No holds. She re-ran every count, and all match the fixing PR's table.
- **Class, confirmed by Stacy**: P0 for the Systems Overview, whose consumer member ships the counts. The Civitas counts alone are P2/P3, because the consumer overlay strips them (`subtraction-3`). **Her precision**: the doc count was **true at 16.0.0**. It went false on 2026-10-23, when `58b8714aa` added the 84th `governance/` doc. So the false statement was in what the next release would ship, not in 16.0.0. She did not check 16.0.0's section count.
- **Lock (the sixth grant path)**: refreshed from the guard's green full run, in the commit that archives this record. `inputClosure` `93fa1e73…` → `07f20a32…`. **`outputs` `8bc3301c…cb09c` → `5f91053b…b5af`**: the consumer Systems Overview renderings now carry the measured counts.
- **Scope** (clause 6, against the list as it stood at `311d3a42f`): the fixing PR's diff is the six grant paths, Stacy's C1 files, the two steering files under the carve-out, and this record (moved to `archive/`). Each was named ahead of time in § "Grant paths".
- **Checks**: `check:122:diff-guard` no-op-green, 0 stale; `verify-signing-chain --ci` PASS at base `311d3a42f` (Stacy's run, after her acts).

