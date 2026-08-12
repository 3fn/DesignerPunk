# Release Flow Under the PR Gate

**Date**: 2026-07-05
**Purpose**: The release sequence once `main` is branch-protected (Spec 125-A) — how version bumps, release notes, and the token-index traverse the gate, and why `npm publish` no longer touches git
**Organization**: process-standard
**Scope**: cross-project

> Built by Spec 125-A Task 2 (Req 4.4, form (a): **traverse — no standing exemption**).
> Task 4's law application references this doc. Before this reconciliation,
> `package.json`'s `postpublish` pushed a token-index commit directly to `main`,
> which would hard-fail MID-PUBLISH the moment branch protection lands (Task 3).

---

## The rule

**`npm publish` is a read-only git citizen.** Everything that must land in git —
version bump, release notes, regenerated `token-index/` — lands via a **release PR**
that traverses the gate *before* publish. Publish happens **from merged `main`**.
Nothing in the publish lifecycle commits or pushes.

## Deriving the delta (the judgment half — added 2026-08-12, Q6 ballot; proven by the v14.0.0 release)

Before step 1 below, the release author derives-classifies-ratifies:

1. **Derive**: `git log $(git describe --tags --abbrev=0)..main --oneline` (all changes — squash titles are the changelog spine) and the same log scoped to the SHIPPED surface — **authoritative list: `package.json` `files[]`** (`src/` alone misses served-content roots like `governance/`; v14's docs-corpus entry lived there). Issue-driven work appears ONLY here — never assume spec summaries cover the delta.
2. **Classify** each change 🔴 breaking / 🟡 minor / 🔵 patch-internal, reading task summaries or PR bodies for substance.
3. **Peter ratifies the bump**; notes are hand-authored at `docs/releases/release-X.Y.Z.md` (v14.0.0 = format precedent) and ride the release PR below.
4. Publish mechanics: the dual-registry playbook (public npm needs Peter's login/2FA; expect the ~30-day token expiry — an E404 on publish is a masked auth failure).

*(The automated analyze/notes/release CLI was retired 2026-08-12 — ballot `2026-08-12-q6-release-manager-retirement.md`; tag + GitHub release are manual: `git tag -a vX.Y.Z && git push origin vX.Y.Z && gh release create vX.Y.Z --notes-file docs/releases/release-X.Y.Z.md`.)*

## The sequence

1. **Release branch**: `git switch -c task/<spec>-<N>-<slug>` (or `chore/release-vX.Y.Z`
   for a standalone release) from up-to-date `main`.
2. **Prepare the release on the branch**:
   - version bump in `package.json` (and any sub-packages),
   - release notes / changelog updates,
   - **regenerate the token-index**: run `npm run build` (its generation steps
     refresh `token-index/`), then commit any resulting `token-index/` diff.
3. **Open the release PR** (`./.kiro/hooks/complete-task.sh` for spec-task releases,
   or `gh pr create` for standalone chores). Required checks run on the PR.
4. **Peter merges on green.** The version bump + notes + token-index land on `main`
   as one squash commit.
5. **Publish from merged `main`**: `git switch main && git pull`, then `npm publish`
   (per the dual-registry playbook where applicable).
   - `prepublishOnly` runs `build` + `check:drift` + `verify:token-index-clean` —
     if the freshly-built `token-index/` differs from what's committed, **publish
     aborts loudly before anything ships** (the fix: go back to step 2's regeneration
     on a branch; the release PR was incomplete).
   - `postpublish` never pushes. If `token-index/` somehow changed during publish
     anyway, it prints a warning telling you to route the diff through a PR.

## What changed and why (Req 4.4 justification)

| Lifecycle script | Before | After |
|---|---|---|
| `prepublishOnly` | `build && check:drift` | `build && check:drift && verify:token-index-clean` — blocks publish if `token-index/` wasn't committed on the release branch |
| `postpublish` | `git add token-index/ && git commit … && git push origin main` | warn-only tripwire; **no git write, no push** |

**Form chosen: pre-publish verification on the release branch** (Req 4.4 form (a),
"regenerated on the release branch pre-merge") rather than a postpublish auto-PR,
because:

- **Deterministic publish**: the published artifact and the committed `token-index/`
  are guaranteed in sync *at publish time*; an auto-PR form ships first and
  reconciles later, leaving `main` lagging the registry until someone merges.
- **No mid-publish git mutation**: publish cannot half-fail with a dangling local
  commit (the old failure mode Task 3 would have created).
- **Structurally cannot push `main`**: neither lifecycle script contains a push at all.

## Emergency note

If a publish is somehow needed while the gate blocks a required fix, that is the
Item 1f emergency procedure (Peter lifts protection, acts, re-enables, logs in the
125-A findings ledger) — never a script-level bypass.
