# Decision Record — Spec 117 Task 1.3 Checkpoint

**Date**: 2026-06-13
**Decided by**: Peter (ratifying the Task 1.2 audit findings)
**Basis**: `findings/audit-report.md`, `findings/classification.md`, `findings/raw-divergences.md`

---

## Decisions

1. **R3, R4, R5 — all KEPT** (all confirmed in scope by the audit).

2. **`sharedRootCauseConfirmed: TRUE` → MERGE.** The R3 (token-index rgba) and R5 (theme-varying collapse) fixes merge into **one spine fix**: wire the token-index generation path to the OKLCH **mode-resolved** source the dist path uses. Two readouts from one source — color value (oklch + channels) and light/dark comparison (theme-varying).

3. **Finding 2 (broken `generate` CLI) — FOLDED IN.** Confirmed root cause: a one-line directory import in `designerpunk.config.ts:16` (`'./src/config'` → `'./src/config/index.ts'`), same class as the resolved April issue. It is the **verification prerequisite** for Task 5.3 (the documented CLI cannot run *any* generation until fixed). Broader CLI-cluster polish (the `--force`-swallow, etc.) stays **out** of this spec.

4. **N1 (BlendUtilities not generated) — DEFERRED.** Tracked at `.kiro/issues/2026-06-13-blendutilities-not-generated.md`. Out of scope (not token-index integrity; needs an intent decision). Inventory corrected.

5. **N2 (dist `ComponentTokens.*` empty) — FOLDED into R4.** The R4 fix must populate **both** `token-index/components.yaml` *and* `dist/ComponentTokens.*`; R4 verification asserts both.

6. **Scope notes carried into the fix:**
   - **R5 correct target = dist's mode-resolved set**, not committed's 10. Reconcile the 10-vs-7 gap during the fix (likely WCAG-varying / non-`light-dark()` emission).
   - **R4 verification covers the dist side** (N2).

7. **Provisional status resolves.** Once the Finding-2 one-liner lands, the documented CLI runs → Task 5.3's documented-CLI verification is executable → the spec can certify **non-provisionally**. Config-value equivalence (workaround vs documented CLI) is confirmed by inspection; empirical confirmation lands with the one-liner. The spec is **no longer permanently provisional**.

---

## Resulting task restructure (rewrite of the informed placeholders)

| Task | Was | Now | Owner |
|------|-----|-----|-------|
| **CLI config import fix** | (in Finding-2 limbo) | NEW — one-line fix; unblocks documented `generate`; gates 5.3 | Ada |
| **Spine fix** | T2 (R3) + T4 (R5) | MERGED — token-index path → OKLCH mode-resolved source; verified by R3 (oklch, no rgba) **and** R5 (theme-varying matches dist) | Ada |
| **Component-token loading** | T3 (R4) | KEPT — gate on source presence; verified on token-index **and** dist ComponentTokens (N2) | Ada |
| **Verification + E2E** | T5 | KEPT — generation-integrity check via the now-runnable documented CLI; 5.3 unblocked | Thurgood |
| **Documentation** | T6 | KEPT | — |

**Blast radius (R4):** component-token consumers — Lina consulted.

---

## Status

- Task 1.2 (audit) complete; Task 1.3 (this checkpoint) ratified.
- Next: rewrite `tasks.md` placeholders T2–T6 per the table above; recommend a brief Ada/Lina feedback pass since the merge changes the structure they originally reviewed.
- Worktree `/tmp/dp117-audit`: retained until the documented-CLI verification runs (it's the reproduction harness); teardown after certification.
