# Generation-Integrity Audit Report — Spec 117 (Task 1.2)

**Date**: 2026-06-13
**Status**: **PROVISIONAL** (Finding 2 unresolved — documented `generate` CLI not run; config-load-equivalence unverified)
**Inputs**: `findings/raw-divergences.md` (1.2a empirical, Thurgood) · `findings/classification.md` (1.2b classification, Ada)
**Method**: detached worktree @ HEAD (`/tmp/dp117-audit`), `runGenerate` via ts-node workaround, `GenerationIntegrityCheck` over the corrected inventory + absolute invariant scan. Working tree confirmed clean vs HEAD (committed = HEAD).

---

## Inventory (R1 AC1 — corrected)

17 artifacts: token-index ×3, `dist/DesignTokens.*` ×5, `dist/ComponentTokens.*` ×3, `dist/product/ProductTokens.*` ×3 (optional). **BlendUtilities ×3 removed** — not a `generate` output (finding 117-N1, deferred). Every listed artifact was diffed; no inventory gaps.

---

## Triaged findings

| ID | Artifact | Divergence | Bucket | correctTarget | Shared cause |
|----|----------|-----------|--------|--------------|--------------|
| **F1 / R3** | token-index primitives + color | 216 rgba / 0 oklch (committed==fresh); dist = 127 oklch | **(a) migration-gap** — generator never wired to OKLCH; `getOklchMetadata` orphaned | **neither** (correct = OKLCH mode-resolved, as dist) | **YES (with F3b)** |
| **F3a / R4** | token-index components + `dist/ComponentTokens.*` | 27 component tokens dropped (committed→fresh); dist ComponentTokens empty both sides | **(b) generation-bug → (c)** — package-mode gate skips `loadComponentTokens` | **committed** (the 27); dist side = neither (should be populated post-fix) | no |
| **F3b / R5** | token-index semantics | 10 themeVarying flip true→false (+20 platform-name flips) | **(b) generation-bug** — reads collapsed `platforms.web.value` | **neither *exactly*** (fresh=0 wrong; committed=10 approximate; true target = dist mode-set) | **YES (with F1)** |

Detail evidence and source verification in `classification.md`.

---

## Headline: shared CODE root cause — CONFIRMED

F1 and F3b both read `primitive.platforms.web.value`, which post-OKLCH is a **collapsed single-mode rgba snapshot** (proof: `white100.light.base === dark.base === white`, while dist resolves `color.structure.canvas` to `light-dark(white, near-black)`). The canonical dist path reads the mode-resolved OKLCH data; the token-index path was left behind by the OKLCH migration.

→ **`sharedRootCauseConfirmed: true`.** Recommend **merging Task 2 (R3) + Task 4 (R5)** into one spine fix ("one shared source — the Stage-4 mode resolution — two readouts: oklch value + light/dark comparison"), verified by both R3 (oklch, no rgba) and R5 (theme-varying matches dist's mode-set). `getOklchMetadata` is single-value, not mode-aware — the merged fix wires to the mode-resolution output, not that helper alone (see classification.md § Precision).

---

## New findings (R1 AC5)

- **N1 — BlendUtilities not generated.** Inventory listed wrong paths; real paths (`*.ts/.swift/.kt`) also absent — `generate` produces none. **Disposition:** removed from inventory; logged deferred, out-of-scope → `.kiro/issues/2026-06-13-blendutilities-not-generated.md`.
- **N2 — `dist/ComponentTokens.*` empty.** Committed dist component output is header-only while `components.yaml` has 27 → internally inconsistent; "equal" committed-vs-fresh only because both are wrong. **Disposition:** folded into F3a — the R4 fix must populate *both* the token-index tier *and* the dist component output; R4 verification (P4) asserts both.

---

## Finding 2 characterization (R1 AC6)

`documentedCliRuns: false` · `configLoadEquivalentToWorkaround: unverified`. The documented CLI (`npx designerpunk generate`) was not run; the workaround invoked `runGenerate()` directly. ⇒ all conclusions **provisional**; certification awaits documented-CLI reproduction (Task 5.3 Blocked-Task, R2 AC4).

---

## Completeness statement (R1 AC2 / clean-exit)

- ✅ Every inventory artifact diffed (committed-vs-fresh) **and** classified (bucket + correctTarget).
- ✅ No unclassified divergences; no inventory gaps after N1 correction.
- ✅ Absolute invariant scan run (P3) — catches F1, invisible to committed-vs-fresh.
- ✅ Orphaned-helper scan run — `getOklchMetadata` confirmed test-only import.
- ✅ New findings logged (N1 deferred issue; N2 folded into R4).
- ⚠️ **Provisional** — Finding 2 blocks certification of config-load equivalence.
- 🔲 Worktree `/tmp/dp117-audit` retained for the checkpoint; teardown after 1.3 (`git worktree remove --force /tmp/dp117-audit`).

---

## Recommendations to the 1.3 DecisionRecord

1. **R3, R4, R5: keep** (all confirmed, all in scope).
2. **Merge Tasks 2 & 4** — `sharedRootCauseConfirmed: true`.
3. **R4 scope note:** verification covers `dist/ComponentTokens.*` (N2), not only `components.yaml`.
4. **R5 scope note:** correct target = dist mode-resolved set (7 `light-dark()`), not committed's 10; reconcile the 10-vs-7 gap in the fix.
5. **N1:** deferred (out of scope); separate routing.
6. **Provisional** until Finding 2 reproduction (Task 5.3).
