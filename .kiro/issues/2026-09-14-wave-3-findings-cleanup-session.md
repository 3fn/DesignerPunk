# Wave-3 Findings Cleanup — Session Brief (Issue-Driven, Peter-Ruled)

**Date**: 2026-09-14
**Ruling (Peter, 2026-09-14)**: the #160-spawned findings resolve as **owner-routed one-off fixes, NOT a collective spec** — they share a discovery event, not a design problem; every item below has its design already recorded in the wave-3 consult records. The one genuinely spec-shaped item (real color-token enforcement) is chartered separately: `.kiro/issues/2026-09-14-color-token-enforcement-spec-candidate.md`.
**Status**: Queued — one cleanup session, producing small owner-routed PRs
**Source records**: `.kiro/specs/125-B-classification-map/completion/u1b/wave-3-assessment.md` (§9 open items, §11 fold), `wave-3-consult-ada.md`, `wave-3-consult-lina.md`; PR #160 (rows ratified at merge, 2026-09-14)

---

## In this session (each item = one small PR unless trivially combinable)

### 1. Stale published `docs/tokens.css` — **Ada, HIGH, do first (public exposure)**
Per `.kiro/issues/2026-09-13-docs-tokens-css-stale-published.md` (her F-1–F-4 dispositions). The file is live-published via GitHub Pages (`docs/_layouts/default.html:8`, `deep-dive.html:8`) and serves pre-#152 `green400` as success-text — the ratified WCAG AA failure, publicly visible. **Ada picks the route** (both pre-authorized):
- (a) regenerate + commit + wire regeneration into the Pages path (her F-1), or
- (b) the elimination path carried on the C8 register row: delete the committed copy, let Pages consume generated output → **the row amends to `none`** (pre-authorized amendment; update the row + history line in the same PR if this route is taken).
Either route: F-2 delete `final-verification/DesignTokens.*` (4 files, zero references); F-3 mark spec fixtures excluded where the issue says; F-4 symlink note only. Full `npm test` + `tsc`; docs-MCP reindex if the register row changes.

### 2. component-meta extractor clobbering — **Lina**
Per `.kiro/issues/2026-09-13-component-meta-extractor-clobbers-handedits.md`. The predicate repair she claimed: `extract-component-meta.ts:343`/`:371` compare array LENGTH, not content — a sanctioned hand-edit that rewrites `usage` entries (or edits `when_not_to_use` alone) is silently clobbered. Fix = content-aware preservation + a regression test proving a rewritten-not-lengthened hand-edit survives `npm run extract:meta`. The field-grain register row + guard stay FUTURE work (recorded in the issue) — this PR is the predicate only.

### 3. One genuine hardcoded color — **Lina, one-liner (can ride PR 2)**
`AvatarPreview.kt:319` `Color(0xFFFF9800) /* orange400 */` → token reference. **Do NOT "fix" the other two detector hits** (`.systemGray6`, `UIColor.secondaryLabel`) — platform-semantic colors, false positives per her consult.

### 4. Phantom-gate doc corrections (O-9/O-10) — **text stops lying now; build-vs-never is deferred, not decided here**
- **O-9 (Thurgood surface)**: `Test-Development-Standards:1987-1989` documents `npm run lint:stemma{,:naming,:tokens}` — no such scripts exist in package.json. Correct the text (delete or reword to what exists). Whether such lint ever gets BUILT → the enforcement spec-candidate charter, not this session.
- **O-10 (Ada surface + tooling)**: `Token-Governance.md:546` claims the theme-drift audit runs "in CI" — it is in no workflow, AND its `package.json:122` definition ends `|| echo`, so it cannot fail even run manually. Correct the doc claim; ALSO strip the `|| echo` so a manual run can actually fail (small tooling fix, same PR). CI wiring → the charter, not this session.
- Both are governance docs (MCP-served): reindex after merge. O-10's surface is also on Ada's queued Token-Family claims-vs-source pass — coordinate so the correction lands once.

### 5. Repo hygiene chore (combinable into one chore PR) — **any agent / main session**
- **O-11**: `coverage/` is gitignored yet 298 files are tracked — `git rm -r --cached`, verify no workflow consumes the tracked copies first.
- **O-6**: roster erratum — mechanical `campaign-plan.md` 5.1-owned edit recording C9's "none armed" correction (an armed-but-dormant barrier existed; roster said none). Reference the ratified row; do not restate.

## Explicitly NOT in this session

- **O-3** (author C7 generated-banner education vs accept friction) and **O-8** (register `armed` PR-gate-vs-point-of-use schema wording) — **Peter's decisions**, batched into the Spec 127 outline-settle sitting.
- **Real color-token enforcement** (re-point web detection at CSS, wire iOS/Android detectors, false-positive handling, demos/READMEs scope) — spec-candidate, chartered separately; the dormant register row honestly records the interim state, so there is no false assurance while it waits.
- Anything touching the 16 pinned contrast exemptions (Peter's deferral ruling stands).

## Session mechanics

Owner-routed subagent PRs per Task-Completion-Protocol (`fix/*` / `chore/*` branches); full `npm test` + `tsc` for any code-touching PR; each PR cites its source record; campaign accounting: these are ordinary observed-class PRs if a wave window is open at the time (none is, as of queuing — wave 4 may change that).
