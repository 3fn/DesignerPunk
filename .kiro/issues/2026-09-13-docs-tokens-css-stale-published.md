# Published `docs/tokens.css` Is a Stale Generated Snapshot — Currently Serving a WCAG-Remediated Color Value

**Date**: September 13, 2026
**Discovered By**: Thurgood (Civitas steward) during 125-B U1b wave 3 (C8 artifact enumeration); **adjudicated and escalated by Ada** (token-pipeline owner) at the wave-3 consult
**Spec**: None — spun out of `.kiro/specs/125-B-classification-map/` wave 3 step (a). Chartered here **deliberately independent of the register row**: the defect exists whether or not `never-hand-edit-generated-token-outputs` ever ratifies, and "the row says `proposed`" must never become a reason the fix waits.
**Status**: Open
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

## Adjacent, routed elsewhere (found while enumerating, not part of this issue)

- **`coverage/` is `.gitignore`d (line 17) yet 298 files are tracked in HEAD** (`git ls-tree -r HEAD --name-only coverage/ | wc -l` → 298; verified by the steward). Pre-existing tracked-then-ignored residue; not token output. Repo hygiene — Thurgood's, recorded in the wave-3 assessment's open items.
