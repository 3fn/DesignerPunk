# Published `docs/tokens.css` Is a Stale Generated Snapshot — Currently Serving a WCAG-Remediated Color Value

**Date**: September 13, 2026
**Discovered By**: Thurgood (Civitas steward) during 125-B U1b wave 3 (C8 artifact enumeration); **adjudicated and escalated by Ada** (token-pipeline owner) at the wave-3 consult
**Spec**: None — spun out of `.kiro/specs/125-B-classification-map/` wave 3 step (a). Chartered here **deliberately independent of the register row**: the defect exists whether or not `never-hand-edit-generated-token-outputs` ever ratifies, and "the row says `proposed`" must never become a reason the fix waits.
**Status**: **RESOLVED** 2026-09-14 (Ada) — route (a) taken; see "Resolution" at the end of this file
**Priority**: **HIGH** (F-1). The remaining items are MEDIUM/LOW.
**Impact**: The public GitHub Pages showcase (`https://3fn.github.io/DesignerPunk`) — every page loads this stylesheet.
**Assigned To**: **Ada** (token pipeline / generated token outputs)
**Session pairing (Ada's recommendation, carried)**: run this with the open **dual-color-source divergence** session (`.kiro/issues/2026-08-25-dual-color-source-divergence.md`). Same failure family — *a generated artifact asserting values the source no longer holds* — different surface. A reviewer holding both at once sees the pattern; holding them apart sees two incidents.

---

## Summary

`docs/tokens.css` is a **committed generated snapshot** of the token pipeline's web output, with no guard, no regeneration trigger, and no staleness alarm. It is **not** abandoned residue: it is published, it is loaded by every showcase page, and it is currently serving at least one color value that the project fixed **one day earlier** as a WCAG AA failure.

The wave-3 draft framed the committed residue as "in-scope artifacts, or abandoned fixtures to delete?" Ada's ruling: for this file the answer is **neither**.

## Evidence (three independent checks)

1. **It is published.**
   - `docs/_config.yml` → `url: "https://3fn.github.io"`, `baseurl: "/DesignerPunk"`
   - `docs/_layouts/default.html:8` and `docs/_layouts/deep-dive.html:8` both emit `<link rel="stylesheet" href="{{ '/tokens.css' | relative_url }}">`
   - 614 custom properties; every showcase page loads it.

2. **It is stale by a measurable, load-bearing amount.**
   - Header stamp `Generated: 2026-03-19T16:03:08Z`; last touched `6163cf00` (2026-03-24, "Set Up Token Dogfooding").
   - Since that commit: **19 commits touch `src/tokens/`**, **4 of them touch color token sources** — `6825c954` (#153), `528120b6` (#152), `71120a5d` (v12.0.0, Spec 112 OKLCH migration), `73661332` (Spec 104).

3. **It is serving a value that was fixed as an accessibility failure.**
   - Source today: `color.feedback.success.text` → `primitiveReferences: { value: 'green500' }` (`src/tokens/semantic/ColorTokens.ts:103-106`); `green500` web light = `rgba(0, 204, 110, 1)`.
   - Published: `docs/tokens.css:443` → `--color-feedback-success-text: rgba(0, 255, 136, 1)` — that is **green400** (`docs/tokens.css:132`), the pre-#152 value.
   - **PR #152 (2026-09-12) is titled "Fix `color.feedback.success.text` WCAG AA failure."** The showcase is publishing the failing value.

**Scope honesty (Ada's own disclosure, preserved)**: exactly **one** value drift was confirmed by hand. The consult worktree had no `node_modules`, so a regenerate-and-diff was not possible. One confirmed WCAG-remediated drift plus 19 unpropagated token-source commits was sufficient to rule; **the exhaustive diff is the fix's first deliverable, not the ruling's precondition.**

---

## Dispositions (Ada's ruling, F-1 through F-4)

| # | Artifact | Disposition | Detail |
|---|---|---|---|
| **F-1** | `docs/tokens.css` | **REGENERATE + WIRE — HIGH** | (a) Regenerate from current source and **diff the result** — that diff is the first deliverable and the honest measure of the drift only sampled above. (b) Commit the regenerated file. (c) Wire regeneration into the Pages publish path, or add a CI staleness check, so it cannot silently re-stale. **Do NOT simply delete** — it is load-bearing for the published showcase. **Preferred alternative if clean**: make the Pages build generate it and drop the committed copy — see "Elimination path" below. |
| **F-2** | `final-verification/DesignTokens.{web.css,web.js,ios.swift,android.kt}` | **DELETE — MEDIUM** | Zero corpus references (`grep -rniE "docs/tokens\.css\|final-verification\|demos/tokens\.css" governance/ .kiro/steering/ canonical/` → zero hits). **Three distinct vintages, not one**: `web.js` 2025-10-23, `ios.swift`/`android.kt` 2026-02-07, `web.css` 2026-01-14 — an ~8-month spread (correcting the wave draft's "same vintage" claim). Completed-spec verification residue, not a fixture anyone reads. Deleting removes the guard question entirely. |
| **F-3** | `.kiro/specs/094-portable-pipeline-and-theme-registry/fixtures/pre-migration/DesignTokens.*` + `ComponentTokens.web.css`; `.kiro/specs/web-format-cleanup/baseline-DesignTokens.web.css` | **KEEP, mark EXCLUDED — LOW** | Deliberately frozen pre-migration/baseline snapshots; their entire value is that they do **not** regenerate. The exclusion is recorded in the register row so a future guard author does not "fix" them — **any guard MUST carry it explicitly**, or it reds on them. |
| **F-4** | `demos/tokens.css` | **KEEP — LOW (note only)** | A committed symlink → `../dist/browser/tokens.css`; correct by construction. Consequence worth noting: `demos/` is broken in a fresh clone until `npm run build` — the known worktree-needs-generated-artifacts class, not a defect of this rule. |

### Elimination path (pre-authorized amendment, recorded on the register row)

Ada's own counter-argument to her own ruling, carried so that either outcome is unsurprising:

> `docs/tokens.css` may not be a "token output" at all — its originating commit calls it *dogfooding*, a showcase asset that happens to have been generator-produced. Under that reading the right move is not to guard it but to **delete the committed copy and have the Pages publish path generate it**. Do that, and the artifact leaves the class entirely, the last in-repo committed generated token output disappears, and the register row correctly collapses to `disposition: none` — arrived at by *removing* the exception rather than guarding it. That is cheaper than building a guard.

Ada ruled for the guard anyway on the principle that **the register records the repo as it is at ratification, not as it will be after a fix** — recording `none` now, on the strength of a fix that has not happened, is the exact failure the campaign exists to prevent. If the elimination path lands, the row amends to `none` with a dated history entry.

---

## Related / corroborating

- `.kiro/issues/2026-08-25-dual-color-source-divergence.md` — same failure family; **session-pair with this**.
- `DTCG-Integration-Guide.md:231` shows `"color.feedback.success.text": { "$value": "{color.green400}" }` — the *same* stale value on a documentation surface, independent corroboration that #152 did not propagate to its doc surfaces. (Ada advisory A-2; routed to her queued Token-Family claims-vs-source pass.)
- `Token-Quick-Reference.md:73` and `:87` cite `dist/DesignTokens.web.css:527` / `:559` **by line number** as evidence for a token's emitted value — unresolvable by construction in a fresh clone, and generated line numbers shift with every token addition. (Ada advisory A-1; same queued pass.)
- Register row: `governance/classification-map.md § "never-hand-edit-generated-token-outputs"` — the `docs/tokens.css` scope entry carries `disposition: barrier`, `check_state: proposed`, and the elimination path.
- Wave-3 records: `.kiro/specs/125-B-classification-map/completion/u1b/wave-3-consult-ada.md` §1 + §4; `wave-3-assessment.md` §3.

## Resolution (Ada, 2026-09-14)

Executed under the Peter-ratified cleanup brief `.kiro/issues/2026-09-14-wave-3-findings-cleanup-session.md` item 1, which pre-authorized **both** routes and left the choice to the token-pipeline owner.

### Route taken: (a) regenerate + commit + wire — NOT the elimination path

**The deploy mechanics decided it, and they are a hard fact, not a preference.** The GitHub Pages API reports `"build_type": "legacy"`, `"source": {"branch": "main", "path": "/docs"}` — a classic branch deploy in which GitHub runs Jekyll over `main:/docs`. It cannot run npm. Route (b) therefore requires three things this PR cannot deliver together:

1. a new GitHub Actions Pages workflow (`actions/deploy-pages`) that installs dependencies, regenerates tokens, builds Jekyll, and deploys — i.e. **exactly the CI wiring the brief forbids in this session**;
2. a repo **Settings** change (`build_type` `legacy` → `workflow`) that only Peter can make, in a system outside this PR; and
3. an ordering that cannot be made safe: deleting the committed copy takes effect on the live site **the moment the PR merges**, while the replacement path only takes effect **after** Peter flips the toggle. Between those two moments every showcase page serves with no stylesheet at all.

Trading a wrong color for an unstyled public site — contingent on a human action in another system — is a worse failure than the one being fixed.

**The losing route's genuine advantage, stated plainly**: route (b) is the only one that *eliminates the class*. It removes the last in-repo committed generated token output, makes staleness structurally impossible rather than merely visible, and collapses the C8 register row to `disposition: none` by removing the exception instead of guarding it. Route (a) keeps a committed generated artifact alive and therefore keeps the drift risk alive in weaker form. **Route (b) remains the better end state**; it needs a Pages-deploy spec and Peter's Settings change, not a cleanup PR. It stays pre-authorized on the C8 row.

**Route (a)'s residual risk, stated with equal honesty**: this is **not a gate**. `docs/tokens.css` is now a build output (below), so any `npm run build` refreshes it and staleness surfaces as a working-tree diff — but if nobody builds between a token change and a merge, a stale copy can still be published. What changed is that staleness is no longer *silent by design*: it is bounded by the next build, and `npm run build` runs at every release via `prepack`/`prepublishOnly`. The named-but-unbuilt regenerate-and-diff guard on the C8 row stays unbuilt.

### F-1 — the honest drift measure (the first deliverable, as ruled)

Regenerated via `npm run generate:platform-tokens` + `npm run build:browser`, then diffed against the committed copy. The consult could confirm only **one** drifted value by hand. The real number:

| Measure | Value |
|---|---|
| Custom properties, published (stale) copy | **584** |
| Custom properties, regenerated | **709** |
| **Values CHANGED** | **145** (113 color, 32 non-color) |
| **Tokens ADDED** | **140** |
| **Tokens REMOVED** | **15** |
| Staleness window | 2026-03-19 (header stamp) → 2026-09-14 — **~6 months** |

**Headline examples:**

- **The WCAG failure is gone.** `--color-feedback-success-text`: `rgba(0, 255, 136, 1)` (green400, the value PR #152 fixed as a WCAG AA failure) → `light-dark(oklch(0.54 0.14 154), oklch(0.78 0.208 154))` — green500 light / green300 dark, i.e. both #152 and #153's dark-mode remediation now published.
- **The entire OKLCH migration (Spec 112, v12.0.0) had never reached the public site.** All 56 color primitives moved from `rgba()` to `oklch()`, plus 57 semantic color tokens. The showcase was publishing the pre-migration color model.
- **The dark-text hierarchy fix (#153) had never reached it either**: `--color-text-default/muted/subtle` are now `light-dark()` pairs against the dark canvas.
- **140 additions** are mostly the OKLCH decomposition primitives (`--pink-hue`, `--pink-l300`, `--pink-c300`, …) and the new `--blur-*` ramp.
- **15 removals** are the retired `--shadow-blur-*` / `--glow-blur-*` / `--shadow-{black,blue,orange,gray}-100` sets, superseded by `--blur-*`.

**Regression check before publishing**: every `var(--…)` reference in `docs/**` (excluding `tokens.css` itself) was resolved against the regenerated file — **zero references to any removed token**, so nothing on the showcase breaks. The theme mechanism is unchanged (`color-scheme: light dark` in `:root`, as before), with an additive `:root[data-theme="wcag"]` block.

### F-1 — the wiring (so it cannot silently re-stale)

- `scripts/build-browser-bundles.js` now publishes `docs/tokens.css` as a **build output** (new `publishTokenCSSToDocs()`, called from `copyTokenCSS()` after the existing `dist/browser/tokens.css` write). Any `npm run build` / `npm run build:browser` rewrites it.
- **Verified by seeding**: a hand-staled `docs/tokens.css` (marker line appended) was restored byte-identical by the next `npm run build:browser`.
- `.kiro/specs/084-github-pages-showcase/tasks.md` § "Token Refresh Procedure" amended. Its previous claim — *"This is a manual process by design — the showcase is a snapshot, not a live mirror"* — is the belief that produced this defect, and is withdrawn with the reasoning recorded in place.
- Non-fatal by design if `docs/` is absent (trimmed checkout), but it warns rather than failing silently.

### F-2 — DONE (deleted)

`final-verification/DesignTokens.{web.css,web.js,ios.swift,android.kt}` deleted; the now-empty directory is gone. **Zero references verified first** across the whole repo: the only hits are prose/history (`docs/roadmap/2026-07-04-full-project-audit.md:80` and `m0a-deferred-items.md:164`, both of which already list the directory as orphaned; Spec 086's design/feedback naming it as a scan *exclusion*; a Spec 047 completion doc recording a past update). No script, config, test, or workflow reads them.

### F-3 — DONE (marked EXCLUDED in place)

The register row already carries the exclusion; it is now also visible **at the files**, which is where a future guard author will be standing:

- `.kiro/specs/094-portable-pipeline-and-theme-registry/fixtures/pre-migration/README.md` — new "EXCLUDED from any generated-token-output guard" section.
- `.kiro/specs/web-format-cleanup/baseline-documentation.md` — same.

Both state the operative hazard: a naive regenerate-and-diff guard would RED on these, and "fixing" them destroys the only property they have.

### F-4 — DONE (note only, and already discharged)

No change needed, and this is a verification rather than an edit: the note is **already carried** on the ratified C8 register row (*"demos/ is broken in a fresh clone until `npm run build` — the known worktree-needs-generated-artifacts class, not a C8 defect (F-4, note only)"*), and `demos/README.md` already documents `npm run build` / `npm run build:browser` as prerequisites. `demos/tokens.css` remains a correct-by-construction symlink.

### Register row: UNCHANGED (no docs-MCP reindex required for this issue)

Because route (a) was taken, the `never-hand-edit-generated-token-outputs` row's `docs/tokens.css` entry stays `disposition: barrier`, `check_state: proposed`. That remains accurate: the file is still a committed generated token output, and **no check guards it** — a build-time regeneration is not a gate. The pre-authorized amendment to `none` was **not** exercised and stays available for a future Pages-deploy spec.

*Proposed, not applied* (a governance-doc amendment is Peter's call, not Ada's): the row's rationale could gain one dated clause noting that the surface is now build-regenerated, so a future reader does not re-derive the fix from scratch. Left to Peter.

**Separate reindex flag**: `governance/Token-Governance.md` WAS edited under item O-10 of the same session and is MCP-served — a docs-MCP `rebuild_index` is needed post-merge for that, not for this issue.

---

## Adjacent, routed elsewhere (found while enumerating, not part of this issue)

- **`coverage/` is `.gitignore`d (line 17) yet 298 files are tracked in HEAD** (`git ls-tree -r HEAD --name-only coverage/ | wc -l` → 298; verified by the steward). Pre-existing tracked-then-ignored residue; not token output. Repo hygiene — Thurgood's, recorded in the wave-3 assessment's open items.
