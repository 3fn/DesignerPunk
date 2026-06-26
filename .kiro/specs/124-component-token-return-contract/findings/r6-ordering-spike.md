# R6 Token-Index Ordering Spike

**Spec**: 124 — Component-Token Return Contract
**Task**: 2 (GATES Task 3) + Task 1.1 pre-change baseline (folded in)
**Author**: Ada
**Date**: 2026-06-26
**Branch**: `spec-118-module-resolution-coherence`
**Status**: Resolved. Decision below feeds Task 3.2. **Note a blocking caveat on the baseline (Section 5).**

---

## TL;DR

- **The committed ordering rule is directory-scan order, NOT a stable sort.** It is: Source 1 files (`{tokenSourceRoot}/component/`) first, then Source 2 dirs (config `componentTokens`) recursively, each directory in `readdirSync` order, filtered to files that actually call `defineComponentTokens`, with **intra-file authored-array order preserved**.
- **Therefore: do NOT sort the harvested array.** A sort by `name` or `component+name` would reorder the entries to alphabetical and **break the R6 `git diff` gate**. The harvest must **preserve scan order**.
- **Decision:** Task 3.2's harvest must walk the same `readdirSync` / `scanForTokenFiles` order as today, in the same Source-1-then-Source-2 sequence, and within each module preserve `Object.values(mod)` × per-branded-array order — matching the authored order. No explicit sort is introduced.
- **`readdirSync` is stable** on this filesystem (two-call identical; already lexicographically sorted), so scan order is reproducible.
- **Baseline caveat (must surface to orchestrator):** On this branch, `npx designerpunk generate` currently produces **0 component tokens** — `components.yaml` regenerates to empty, so `git diff token-index/` is **NOT empty today**. This is the known Spec 118 dual-instance split (the exact bug 124 fixes), not a regression introduced here. tsc and build are green. See Section 5.

---

## 1. Committed order (captured verbatim)

Source: `token-index/components.yaml` (committed; 266 lines, 33 component-token entries, 7 components).

Component-group sequence (in file order):

1. **Progress** (10 tokens)
2. **Avatar** (8 tokens)
3. **BadgeLabelBase** (1 token)
4. **ButtonIcon** (6 tokens)
5. **VerticalListItem** (2 tokens)
6. **InputCheckbox** (3 tokens)
7. **InputRadio** (3 tokens)

Full token-name sequence (as emitted):

```
progress.node.size.sm, progress.node.size.md, progress.node.size.lg,
progress.node.size.sm.current, progress.node.size.md.current, progress.node.size.lg.current,
progress.node.gap.sm, progress.node.gap.md, progress.node.gap.lg, progress.connector.thickness,
avatar.size.xs, avatar.size.sm, avatar.size.md, avatar.size.lg, avatar.size.xl, avatar.size.xxl,
avatar.icon.size.xs, avatar.icon.size.xxl,
badgelabelbase.maxWidth,
buttonicon.inset.large, buttonicon.inset.medium, buttonicon.inset.small,
buttonicon.size.large, buttonicon.size.medium, buttonicon.size.small,
verticallistitem.paddingBlock.rest, verticallistitem.paddingBlock.selected,
inputcheckbox.box.sm, inputcheckbox.box.md, inputcheckbox.box.lg,
inputradio.box.sm, inputradio.box.md, inputradio.box.lg
```

---

## 2. Identifying the rule (each candidate tested against the committed sequence)

| Candidate | Predicted first components | Matches committed? | Verdict |
|---|---|---|---|
| **(a) alphabetical by `name`** | Avatar, BadgeLabelBase, ButtonIcon, InputCheckbox, InputRadio, Progress, VerticalListItem | **No** — committed leads with Progress | **Falsified** |
| **(b) by `component` then `name`** | Same alpha component order as (a) | **No** — committed leads with Progress | **Falsified** |
| **(c) directory-scan order** (Source 1 then Source 2, `readdirSync` recursive, files that register) | Progress, Avatar, BadgeLabelBase, ButtonIcon, VerticalListItem, InputCheckbox, InputRadio | **Yes — exact** | **Confirmed** |
| **(d) other** | — | — | n/a |

**Within-group order also falsifies a sort.** Progress emits `node.size.sm → md → lg` (then `.current` variants, then `gap.sm → md → lg`, then `connector.thickness`). `sm/md/lg` is authored/array order, not alphabetical (`lg/md/sm`). Avatar emits `size.xs → sm → md → lg → xl → xxl → icon.size.xs → icon.size.xxl` — authored order, not alphabetical. So even intra-component, the committed order is array order, not a sort.

### Why (c) produces exactly the committed sequence — the mechanism

`generateTokenIndex.ts:207-225` iterates `input.componentTokens` in array order with no sort; `yaml.dump` emits insertion order. `input.componentTokens` = `ComponentTokenRegistry.getAll()` (`designerpunk.ts:145`) = `Array.from(this.tokens.values())` (Map-insertion order, `ComponentTokenRegistry.ts:153/161`). The Map is populated today by the `defineComponentTokens` side-effect as `loadComponentTokens` walks:

- **Source 1** (`loadComponentTokens.ts:48-57`): `{tokenSourceRoot}/component/` = `src/tokens/component/`. `readdirSync` returns only `progress.ts` → registers **Progress first**.
- **Source 2** (`loadComponentTokens.ts:59-63` → `scanForTokenFiles`): config `componentTokens` array (`designerpunk.config.ts:22-25`) in order: `./src/components/core`, then `./src/tokens/component`. `src/components/core` is scanned recursively in `readdirSync` order.

Verified `readdirSync('src/components/core')` order and which entries actually call `defineComponentTokens`:

| Scanned dir (readdir order) | Registers? | Component |
|---|---|---|
| Avatar-Base/avatar.tokens.ts | yes | Avatar |
| Badge-Count-Notification/tokens.ts | **no** (exports plain color maps; the 2 `defineComponentTokens` hits are JSDoc comments) | — |
| Badge-Label-Base/tokens.ts | yes | BadgeLabelBase |
| Button-CTA/Button-CTA.tokens.ts | **no** (plain const maps) | — |
| Button-Icon/buttonIcon.tokens.ts | yes | ButtonIcon |
| Button-VerticalList-Item/...tokens.ts | yes | VerticalListItem |
| Container-Base, Container-Card-Base | **no** | — |
| Input-Checkbox-Base/checkbox-sizing.tokens.ts | yes | InputCheckbox |
| Input-Radio-Base/radio-sizing.tokens.ts | yes | InputRadio |
| Input-Text-* (Base/Email/Password/PhoneNumber) | **no** | — |

Filtering to registering files, Source 2 yields: Avatar → BadgeLabelBase → ButtonIcon → VerticalListItem → InputCheckbox → InputRadio. Prefixed by Source 1's Progress, this is **the committed sequence exactly**.

**Implication for the harvest (Task 3.2):** today, non-`defineComponentTokens` files (Badge-Count-Notification, Button-CTA, Container-*, Input-Text-*) contribute nothing because they never call the side-effect. After Task 3, the harvest must achieve the same exclusion **via the brand filter** — these files export plain objects with no `TOKEN_CONTRACT_BRAND`, so `getTokenContract` returns nothing and they harvest to zero. This preserves both the set and the order. The harvest must NOT include unbranded exports.

---

## 3. The decision: preserve scan order (do NOT sort)

R6 AC3 offers "sort the harvest result before `registerBatch`, vs. sort in `generateTokenIndex`." **Both are wrong for this repo** because the committed order is not a sort. My pre-spike review leaned toward a stable sort (it would make `getAll()` deterministic for all consumers); the evidence overturns that lean.

**Chosen approach: the harvest preserves directory-scan order; no explicit sort is introduced.**

Task 3.2 (`loadComponentTokens` harvest) must reproduce today's traversal:

1. **Same source sequence:** Source 1 (`{tokenSourceRoot}/component/`, `readdirSync` order) before Source 2 (config `componentTokens` dirs in array order, each `scanForTokenFiles` recursive in `readdirSync` order). Do not reorder sources or merge them.
2. **Per-module, preserve export order:** iterate `Object.values(mod)` (the order ES module / transpiled-CJS exports are enumerated — declaration order) and, within each branded value, preserve the branded `RegisteredComponentToken[]` array order (authored order). This reproduces intra-file `sm/md/lg` ordering.
3. **Brand filter = the set filter:** include only exports carrying `TOKEN_CONTRACT_BRAND` (via `getTokenContract`, direct/`hasOwnProperty` — never key enumeration). This excludes the plain-object files exactly as the missing-side-effect did today.
4. **Dedupe re-export aliases** without reordering: first-seen wins (a re-exported alias must not move or duplicate the entry's position).
5. **Register into the canonical registry in that traversal order** so `getAll()` (Map-insertion order) feeds `generateTokenIndex` in the committed sequence.

**Exact sort key:** none. The deterministic order is the scan/traversal order itself, asserted by the R6 `git diff` gate.

**Counter-argument (honest):** a stable sort would make `getAll()` order independent of filesystem traversal and module-enumeration quirks — more robust long-term, and it would decouple the gate from `readdirSync`'s platform behavior. I am rejecting it **only because** the committed reference file is in scan order; sorting would guarantee a non-empty `git diff` and fail R6 AC2/AC3 unless we also re-baseline the committed yaml. If Peter/Thurgood prefer a sorted canonical order for robustness, that is viable **but requires re-committing `components.yaml` in sorted order as a deliberate, separate decision** — it cannot be smuggled into the "reproduce committed" gate. Flagging for a conscious call; default recommendation is preserve-scan-order to keep R6 a pure no-op.

### Risk to manage in Task 3.2: `Object.values(mod)` export order vs. today's call order

Today, order within a file is the **order `defineComponentTokens` is called** (the side-effect fires at call time). After Task 3, order within a file is the **order branded exports are enumerated** by `Object.values(mod)`. For single-`defineComponentTokens` files these coincide. For **multi-call files** (Avatar = 3 calls, Badge-Label, Button-Icon, Button-VerticalList-Item, progress.ts = 2 each), Task 3.2 must verify that `Object.values(mod)` enumerates the branded exports in the same order the calls fire (normally true: const declaration order = call order = export-enumeration order). If a file assigns a `defineComponentTokens` result to a const declared *after* a later call, or re-exports out of order, the intra-file order could shift. **Task 3 must include an order assertion (the R6 `git diff`) that catches this**, and the multi-call files above are the specific surfaces to watch.

---

## 4. Scan-order stability

- `readdirSync('src/components/core')` returns identical results on back-to-back calls (`two-call identical: true`).
- On this filesystem (macOS/APFS), `readdirSync` already returns entries in lexicographic order (`sorted-identical: true`). This is why Source 2's per-directory order coincides with alphabetical — but the overall committed order is still NOT alphabetical, because Source 1 (Progress) is prepended and intra-file order is authored.
- **Caveat:** `readdirSync` order is not guaranteed by POSIX across all filesystems; the committed-order reproduction relies on the dev/CI filesystem returning sorted (or at least stable, matching-the-commit) directory order. This is the same dependency the repo already has today (the committed file was produced the same way). It is a latent portability risk, not a 124 regression. If CI ever runs on a filesystem with different `readdirSync` order, the preserve-scan-order approach would break the gate there; the sorted-canonical alternative (Section 3 counter-argument) would be the mitigation if that ever materializes.

---

## 5. Pre-change baseline (Task 1.1, folded in)

Commands run on `spec-118-module-resolution-coherence` with the unchanged code:

| Step | Result |
|---|---|
| `npm run build` | **Green** (esbuild warnings only — package.json `types`-after-`import` condition ordering; no errors). |
| `npx tsc --noEmit --skipLibCheck` | **Green** (exit 0, no diagnostics). |
| `npx designerpunk generate` | Ran to completion, but emitted **"⚠️ No component token files found"** and **"Component tokens: 0"**. |
| `git diff token-index/` after generate | **NOT empty** — `components.yaml` regenerated to `tokens: {}` (1 insertion, 265 deletions). Restored via `git checkout token-index/`. |
| Full `npm test` | **Deferred to Task 3/4** (heavy ~28 min). Not run in this spike, per scope. |

**Interpretation — important.** The R6 reference state (committed `components.yaml` with 33 tokens) was produced under **Spec 117**, when `loadComponentTokens` and `ComponentTokenRegistry.getAll()` resolved to a **single registry instance**. This branch is paused at 118 Task 9.5.3 precisely because the **dual-instance module-resolution split** now causes `defineComponentTokens` side-effects to register into a *different* `ComponentTokenRegistry` instance than `getAll()` reads — so the loaded files (which DO exist; I enumerated 14) register, but `getAll()` returns empty and `generate` zeroes the component tokens.

**This is the exact defect 124 is designed to fix** (brand the return + sole-writer harvest, eliminating the side-effect-into-a-foreign-singleton failure mode). It is NOT a regression introduced by this spike, and NOT a flaw in the ordering rule.

**Consequence for R6:** the repo does **not currently reproduce its own committed token-index on this branch** — the green-before reference state R6 compares against is only reproducible once 124's harvest fix lands. That is expected and consistent with the 118 PAUSE. R6's `git diff`-empty gate becomes meaningful **after** Task 3 restores single-writer behavior; at that point the regenerated `components.yaml` should match committed value- AND order-identically **if** Task 3.2 preserves scan order per Section 3.

What I could verify: the ordering rule (from committed file + generator/loader/config source — all read directly), `readdirSync` stability, tsc-green, build-green, and that `generate` runs end-to-end. What I could not verify in this spike: a clean `git diff token-index/` (blocked by the pre-existing dual-instance zeroing — only fixable by Task 3) and the full `npm test` (deferred, heavy).

---

## 6. Gate decision for Task 3

**Task 3 can proceed.** The ordering rule and the deterministic-order decision are resolved:

- **Rule:** directory-scan order (Source 1 then Source 2, `readdirSync` recursive, branded-only, authored intra-file order). Confirmed exact against the committed file.
- **Decision:** harvest **preserves scan order**; **no sort key** is introduced. Task 3.2 reproduces today's Source-1-then-Source-2 traversal, brand-filters (which reproduces today's set exclusion), dedupes re-exports first-seen-wins, and registers in traversal order.
- **Watch item for Task 3:** multi-call files (Avatar, Badge-Label, Button-Icon, Button-VerticalList-Item, progress.ts) — verify `Object.values(mod)` enumerates branded exports in call/declaration order; the R6 `git diff` assertion is the catch.
- **Baseline status:** tsc green, build green; `git diff token-index/` is NOT clean today due to the pre-existing 118 dual-instance zeroing — which Task 3's harvest fix resolves. R6's clean-diff gate is therefore validated **in Task 3/4 after the harvest lands**, not in this spike. This does not block starting Task 3; it IS the condition Task 3 is built to satisfy.
