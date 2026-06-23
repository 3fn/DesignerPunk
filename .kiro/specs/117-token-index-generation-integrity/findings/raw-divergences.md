# Raw Divergence Evidence — Spec 117 Task 1.2a (Empirical Phase)

**Date**: 2026-06-13
**Produced by**: Thurgood (empirical phase) — for Ada's four-bucket classification (Task 1.2b)
**generatedVia**: `ts-node-workaround` — **provisional: true** (documented CLI is Finding-2-broken; not run)
**Method**: isolated git worktree at HEAD (`/tmp/dp117-audit`, node_modules symlinked), `runGenerate(true)` via `ts-node --transpile-only`, then `GenerationIntegrityCheck` (committed = repo @ HEAD, working tree confirmed clean vs HEAD) over the full inventory + an absolute rgba scan.

> **Boundary:** this document records *empirical facts* and *frames the classification questions*. The four-bucket assignment, `correctTarget`, and the shared-root-cause verdict are Ada's (Task 1.2b). Nothing here pre-decides a bucket.

---

## Reproduction

```
# worktree already at /tmp/dp117-audit (kept for this phase)
npx ts-node --transpile-only src/tools/integrity/cli/run-audit.ts /tmp/dp117-audit
```

---

## Committed-vs-fresh result (Check 1)

| Artifact | Status | Divergences |
|---|---|---|
| token-index/primitives.yaml | **equal** | 0 |
| token-index/semantics.yaml | **diverged** | 30 (theme-varying=10, other=20) |
| token-index/components.yaml | **diverged** | 27 (component-presence=27) |
| dist/DesignTokens.{web.css,ios.swift,android.kt,dtcg.json,figma.json} | equal | 0 |
| dist/ComponentTokens.{web.css,ios.swift,android.kt} | equal | 0 |
| dist/BlendUtilities.{web.css,ios.swift,android.kt} | **missing-committed** | absent in BOTH committed and fresh |
| dist/product/ProductTokens.* | equal | 0 (unconfigured — absent both sides) |

---

## Finding 1 (R3) — token-index color is legacy rgba

**Empirical facts:**
- `token-index/primitives.yaml`: **216 `rgba(` / 0 `oklch(`** — in BOTH committed and fresh.
- `dist/DesignTokens.web.css` (canonical color output): **127 `oklch(` / 15 `rgba(`** — committed == fresh.
- `getOklchMetadata` (`src/generators/oklch/OklchTokenIndexMetadata.ts`) is imported **only** by `OklchExport.test.ts` — never by `generateTokenIndex.ts` or any generation-path module. **Orphaned from generation, confirmed.**
- `generateTokenIndex.ts:~117` emits `value: token.platforms.web.value` (the legacy rgba) for color primitives.

**Why committed-vs-fresh missed it:** fresh *reproduces* committed (both legacy rgba) → 0 divergences on primitives.yaml. Finding 1 is only visible to the **absolute scan** + the token-index-vs-dist cross-check.

**Classification questions for Ada:**
- Bucket: migration-gap (a) — the generator was never wired to the OKLCH source — vs. generation-bug (b)?
- `correctTarget`: appears to be **neither committed nor fresh** for the committed-vs-fresh axis; the right answer is dist's oklch. Confirm.
- The 15 `rgba(` remaining in dist CSS — baked-alpha/shadow colors? Relevant to the R5 `rgba(` guard (Open Item 2).

---

## Finding 3a (R4) — component tier dropped

**Empirical facts:**
- `components.yaml`: committed **6221 bytes (27 tokens)** → fresh **11 bytes (`tokens: {}`)**. All 27 component tokens dropped (ButtonIcon, VerticalListItem, Avatar, Badge, Progress, …).
- Generate ran in **`tokenSourceMode: 'package'`** for the DesignerPunk repo's own config — so `runGenerate` skipped `loadComponentTokens` (the `if (tokenSourceMode === 'local')` gate at `designerpunk.ts:~109`), despite `componentTokens: ['./src/components/core','./src/tokens/component']` being configured.
- Generate output: `Component tokens: 0`.

**This empirically vindicates Decision 5:** the *source* repo itself is being treated as package mode and silently dropping its own configured component sources.

**Classification questions for Ada:**
- (b)→(c) link: fresh = generation-bug (b) dropping the tier; committed populated = the stale-but-correct (c) it should reproduce. Confirm `correctTarget: committed`.

---

## Finding 3b (R5) — theme-varying flips with empty themes

**Empirical facts:**
- `semantics.yaml`: 30 divergences = **10 tokens flipped `themeVarying: true → false`**, each also flipping 2 platform names (the `theme.` prefix drops). All flipped tokens are `color.feedback.*` (info.text, info.background, info.border, … — the captured sample is the `feedback.info` triplet).
- The worktree config is `themes: []` (default DP config). Fresh marks these static.

**Classification questions for Ada (the crux):**
- Are these feedback colors **truly theme-varying** (committed right, fresh buggy — Step 2 primitive light/dark diff failing to fire) — i.e., `correctTarget: committed`? Or **truly static** (fresh right, committed stale from when themes were configured) — `correctTarget: fresh`?
- **Shared-code-root-cause with Finding 1?** Do these feedback colors' primitives read the same `platforms.web.value` / `ComposedColor` shape that Finding 1 implicates? If the rgba-legacy primitive value shape is what Step 2 reads for light/dark `base`, that's the shared *code* root cause that would merge Tasks 2/4. **This is the `DecisionRecord.sharedRootCauseConfirmed` determination.**

---

## NEW Finding N1 (R1 AC5) — BlendUtilities inventory is wrong

**Empirical facts:** `dist/BlendUtilities.{web.css,ios.swift,android.kt}` exist in **neither** committed nor fresh. The inventory enumerated them (design R1) from the Rosetta-architecture doc, but they are not actual `generate` outputs. `package.json` ships `dist/blend/*.js` (the blend *calculator*), not `dist/BlendUtilities.*`.

**Disposition:** in-scope correction to the inventory (R1 AC1) — where do blend utilities actually materialize, if at all? **Ada's domain to confirm the real path** (or that there is no such dist artifact). Until corrected, these three inventory entries produce false `missing-committed` noise.

---

## NEW Finding N2 (R1 AC5) — ComponentTokens dist vs token-index components

**Empirical facts:** `dist/ComponentTokens.{web,ios,android}` are **equal** committed-vs-fresh (both reproduce identically), yet `token-index/components.yaml` committed is **populated** while fresh empties it. If the committed `dist/ComponentTokens.*` are themselves empty/header-only, the committed state is internally inconsistent (populated token-index component tier, but empty dist component output) — generated at different times/modes.

**Disposition:** flag for Ada — is committed `dist/ComponentTokens.*` populated or empty? Determines whether N2 is a real inconsistency or an artifact of how the two outputs are produced.

---

## Finding 2 characterization (R1 AC6)

- `documentedCliRuns`: **false** — the documented `generate` CLI (tsx/native-import bootstrap) was not run; the workaround invoked `runGenerate()` directly via `ts-node --transpile-only`.
- `configLoadEquivalentToWorkaround`: **unverified** — cannot be confirmed without the documented CLI running. The workaround resolved `tokenSourceMode: 'package'`; whether the documented CLI would resolve identically is unknown until Finding 2 is fixed.
- ⇒ All conclusions above are **provisional** (P7 / R2 AC4). Certification waits on the documented-CLI reproduction (Task 5.3 Blocked-Task).

---

## Summary: confirmed vs. needs-Ada

**Confirmed empirically (all three original findings reproduce):**
- F1: token-index 100% rgba; dist 127 oklch; helper orphaned.
- F3a: component tier 27→0 in package mode despite configured sources.
- F3b: 10 feedback-color tokens flip theme-varying with `themes: []`.

**Needs Ada's classification (Task 1.2b):**
- Four-bucket + `correctTarget` per divergence (esp. F1 = neither/dist; F3b = committed-or-fresh?).
- The **shared-code-root-cause verdict** (F1 ↔ F3b) → merge or split Tasks 2/4.
- N1 (real BlendUtilities path) and N2 (ComponentTokens dist populated?) dispositions.

**Audit completeness (Task 1.2c, Thurgood):** every inventory artifact diffed ✓; classification pending Ada; N1/N2 logged; provisional flag set.
