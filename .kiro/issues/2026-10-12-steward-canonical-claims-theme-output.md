# Steward-side canonical agent text claims emitted theme code that nothing produces

**Date**: 2026-10-12
**Status**: ACTIVE
**Owner**: Thurgood (Civitas steward) for the cross-surface consistency flag; the wording is Kenya's (`canonical/agents/kenya.md`) and Data's (`canonical/agents/data.md`), resolved on the intra-domain path. Filed by the orchestrator from Thurgood's U3c sweep (Task 31.0, 2026-10-12).
**Trigger**: `release:next:phase-1` — due before the next release's RELEASE phase 1; becomes `merge:#<N>` when the fixing PR opens (ballot 2026-10-22-trigger-names-the-event-not-the-vehicle). The event the fix still waits on is a Kenya-wording CORRECTION of `canonical/agents/kenya.md` L178 and L202 (see "Outcome (2026-10-25, partial)"); Spec 129 item (i) landing also discharges it. *(Re-ruled 2026-10-25, Thurgood as owner, rules 1, 9 and 11: the path glob fired at #472 with the record only half-closed, and a path glob would fire again at every authoring touch of either file without naming the owed act.)*
**Superseded trigger (re-ruled 2026-10-25; verbatim)**: `path:canonical/agents/[dk]*a.md` — the next authoring touch of `canonical/agents/kenya.md` or `canonical/agents/data.md` (the glob matches exactly those two), or Spec 129 item (i) lands. The "release 3's RELEASE pass" limb fired at 15.1.0, before rule 11, so it is not counted. That limb is dropped: Stacy carried the record there (claims-pass R-1). *(Back-filled 2026-10-20, Thurgood, rules 1 and 9, at the pulled-forward walk (Peter's go, 2026-10-20); ledger `archive/TRIAGE-2026-10-20.md`.)*
**Superseded trigger (back-filled 2026-10-20; verbatim)**: whichever comes first — Spec 129 item (i) lands; the next authoring touch of either canonical agent file; or release 3's RELEASE pass.
**Class**: P2 obligation (record) · defect *(set 2026-10-20, Thurgood, rule 12. The text is steward-only and not packed: `files[]` ships `dist/consumer-canonical/**`, never `canonical/agents/**`, and U3c corrected the consumer side. It is not met under M7 (O-18).)*

## What

The U3c sweep (Task 31.0, `git grep` for claims that theme Swift/Kotlin is generated) found the same false claims on the STEWARD side that U3c corrected on the consumer side:
- `canonical/agents/kenya.md` L278 ("Generated Swift output includes: …"), L178 (cue: "theming Swift materializes …"), L202 (gap: "theming Swift materializes …");
- `canonical/agents/data.md` L280 ("Generated Kotlin output includes: …").

Each claims emitted theme code. `generateThemeOverrideBlocks` (`src/generators/TokenFileGenerator.ts` L1028) has no caller in `src` outside tests (Ada, Kenya, Data, Thurgood — read, 2026-10-03/12), so these are false in this repo too, not only in a consumer's.

U3c (Task 31) could not touch them: its batch is the consumer profile, and U3's no-overlap test guards `canonical/agents/**`.

## No fix proposed

The wording is the seats' own; they may keep it until Spec 129 or correct it now. **No fix is authorized by this record.**

---

## Outcome (2026-10-25, partial, Thurgood; rule 5 not met, so the record stays ACTIVE)

**What #472 shipped** (merged 2026-10-25 as `1524a96aae8abee702865c9e9bae3adfbd6954fa`; my commit `eba6f8fc2`, a CORRECTION of canonical prose): `canonical/agents/kenya.md` L281 (iOS Theming, Spec 094 bullet) and `canonical/agents/data.md` L283 (Android Theming, Spec 094 bullet) no longer say "Generated Swift/Kotlin output includes the theme types". Both now say what `npx designerpunk generate` writes today and carry the consumer overlay's wording verbatim (Ada's 2026-10-23 condition, picked by her 2026-10-25 walk line). Kenya's and Data's re-confirm/re-sign acts: `439274285` and `2c03a3c4a` (Kenya, `#ios-theming-spec-094`), `1a53a2c6d` and `50d90847d` (Data, `#android-theming-spec-094`). These two bullets are the record's L278 and L280 sites (line numbers moved by 3 since filing). **Closed by #472**: the two "Generated ... output includes" claims.

**Not closed, and not claimed closed.** The record's "What" lists a third and fourth site on the Kenya side, and #472 did not touch them. Read at `origin/main` (`fa8aa254f`), both still say theme Swift is produced consumer-side, which the same PR's L281 now says is false:
- `canonical/agents/kenya.md` L178 (cue): "...note the ROOT Swift output has no Spec-094 theming surface; theming Swift materializes consumer-side".
- `canonical/agents/kenya.md` L202 (gap): "...they live in the consumer iOS app (theming Swift materializes there via `npx designerpunk generate`)."

`canonical/agents/data.md` has no counterpart (`git grep` over `canonical/agents` finds only these two Kenya lines and an unrelated word at data.md L15). The claim is still false: `.kiro/issues/2026-06-28-spec-094-platform-theme-emission-unwired.md` is still open, and Kenya's own L281 and the consumer overlay say `generate` writes no theme surface. Whether the two sites are one wording fix is Kenya's to judge; the shape I recommend is #472's (a CORRECTION by me under the six-roots standing scope, same truth referent, Kenya re-confirms and re-signs the touched units herself).

**Rendered: in-repo charters only** (`.claude/agents/kenya.md` L382/L387, `.kiro/agents/kenya-prompt.md` L299/L304), not consumer outputs (checked 2026-10-25 at `fa8aa254f`; generator run clean: zero hits for "materializes" in the consumer renderings under `canonical/_consumer-output/`, which replace the `commands:` block with the consumer overlay's). Not floor-class under M7. The CORRECTION in the #472 shape (two sentences, unit re-ground, Kenya re-confirm/re-sign, regen, lock) is queued after S.

## Lapse (2026-10-25)

Fired at `1524a96aae8abee702865c9e9bae3adfbd6954fa` (#472, the next authoring touch of `canonical/agents/kenya.md` and `canonical/agents/data.md`). No commit that is an ancestor of it closed this record (rule 5's dated outcome line, or the archive move) or re-ruled it (a Trigger change): #472 was the fix PR for two of the four sites, but this record was not on its branch. First Lapse (distinct SHAs named: 1). It is a lapse by rule 11's letter and the work is also only partly done; it is not the done-but-unclosed shape (see `2026-10-25-issues-owned-fired-ignores-outcome-lines.md`, third case). The Trigger is re-ruled above; the next Lapse is at a later release's S and takes this P2 `(record)` record to Peter with spec, drop, or fix-now.

*Signed: Thurgood, 2026-10-25.*

## Lapse (2026-10-29)

Firing commit `38f4ece47` (#505, the squash tagged `v16.1.0`: release 16.1.0's S). No ancestor of S closed or re-ruled this record: it is in Stacy's recount, `.kiro/specs/123-consumer-distribution/completion/claims-pass-release-16.1.0.md` § "What lapses at S, recounted from commits that are ancestors of S", and no heading named this SHA. Appended by the walker at release 16.2.0's walk (`.kiro/issues/2026-10-29-release-16.2.0-walk.md`; rule 11: whoever observes a lapse appends). It records the lapse and decides nothing else; the owner's disposition stands. Signed Thurgood (steward, rule 11), 2026-10-29.
