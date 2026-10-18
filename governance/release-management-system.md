---
id: release-management-system
inclusion: manual
name: Release Management System
description: The release recipe (derive-classify-ratify, hand-authored notes) and how agents discover what changed and why — replaces the retired automated release tool
aliases: release recipe, release process, release notes, what changed, version bump, changelog, release delta
---

# Release Management System

> **Audience framing**: this describes **DesignerPunk's own process**, not yours. **Worked example**: the release owner (in DesignerPunk, Peter), the `.kiro/docs/ballots/` evidence trail and the retired release manager are DesignerPunk's own. **Transferable**: the recipe-over-tooling model: a documented recipe rather than a standing tool, with a human ratifying the version bump.

**Date**: 2026-02-28
**Last Reviewed**: 2026-10-13
**Last Updated**: 2026-10-13
**Purpose**: Mental model of the release process for AI agents — the recipe, and how to discover what changed and why
**Organization**: process-standard
**Scope**: cross-project
**Layer**: 2
**Relevant Tasks**: task-completion, release-related-work

---

## Overview

Releases are executed by a **documented recipe, not a standing tool**. The automated release manager (an on-demand CLI that scanned spec summary docs to recommend versions and generate notes) was **RETIRED on 2026-08-12** — Q6 ballot: `.kiro/docs/ballots/2026-08-12-q6-release-manager-retirement.md`. It was retired because the PR gate made it redundant-and-worse: every merge to `main` is one squash commit whose title is a disciplined change description, so the release delta is derivable with one `git log` — while the tool, reading only spec summaries, was structurally blind to issue-driven work and mis-recommended the v14.0.0 release outright (patch/"no consumer-facing changes" against a breaking component wave).

**Key principles (unchanged by the retirement):**
- Human-reviewed, human-decided: the recipe derives and drafts; **the repo's release owner (in DesignerPunk: Peter) ratifies the version bump and merges the release PR**.
- Git tags are the only persistent release state.
- Verification stays mechanized; judgment stays human. DesignerPunk's publish guard is its publish script (`scripts/release-publish.ts`, which runs `check:drift`, `verify:token-index-clean` and `pack-assert` itself, in a fresh clone at the tag). `prepublishOnly` is only a tripwire that refuses a folder publish. These are this repo's package scripts, not shipped to consumers. They block a broken publish mechanically and are NOT part of the retired tool.

## The Release Recipe

The operational sequence lives in `.kiro/hooks/RELEASE-FLOW.md` (the PR-gated release flow). The judgment half, summarized:

1. **Derive the delta**: `git log $(git describe --tags --abbrev=0)..main --oneline` — every line is a squash-merged PR title (the changelog spine). Scope a second pass to the shipped surface to separate consumer-facing from internal — **the authoritative shipped-surface list is `package.json` `files[]`** (fifteen-plus roots beyond `src/`, including `governance/` and the other served-content roots; scoping to `src/` alone would have dropped v14.0.0's docs-corpus entry).
2. **Classify**: for each change, read its task summary (`docs/specs/…`) or PR body for substance; classify 🔴 breaking / 🟡 minor / 🔵 patch-or-internal. Issue-driven work has no summary doc — its PR title and body are the record; do not assume spec-shaped work is the whole delta (the retired tool's fatal assumption).
3. **Recommend the bump; the release owner ratifies.** Removals or behavior breaks → major. New behavior → minor. Fixes/internal → patch.
4. **Hand-author the notes and the consumer CHANGELOG entry** — two artifacts for two readers. **(a) The release notes** at `docs/releases/release-X.Y.Z.md` (v14.0.0 is the format precedent): the full delta, internal changes included. They are DesignerPunk's record and do not ship in the package. **(b) One entry in the root `CHANGELOG.md`**: consumer-facing changes only, in plain language for the people who install the package, hand-authored and never generated from the delta. The entry accumulates under `## [Unreleased]` as work merges, and the release PR retitles it to the version. A release with no consumer-facing change still gets an entry that says so. `CHANGELOG.md` ships in the package. Both ride the release PR with the version bump and any token-index regeneration.
5. **Publish per RELEASE-FLOW.md** (repo-internal): release PR → the release owner merges (commit **S**) → a dry-run pack at S → **tag S** (`git tag -a vX.Y.Z <S> && git push origin vX.Y.Z`) → **one tarball**, built by the publish script in a fresh clone at the tag and published unchanged to every registry → verify both registries (same sha1) → **then** the GitHub release (`gh release create vX.Y.Z --notes-file docs/releases/release-X.Y.Z.md`). Never publish from a working checkout, never `--ignore-scripts`, never a folder publish.
6. **Re-run the onboarding trio** (from release 4). The persona trio is DesignerPunk's standing regression instrument for onboarding: three cold persona runs against the packed artifact, each on its committed fixture and from its frozen prompt. Release 4's runs are Spec 123's own (Task 25). From the next release, the release runs them under the same protocol and commits the records. The obligation's owner and trigger are kept in its committed tracking record (Spec 123 Task 28.4), which the monthly Civitas health check walks. Findings route to their owners. **Each persona record of a release's trio carries one disposition line per prior finding — `fixed-and-observed` / `fixed-not-observed` / `still-present` — where a prior finding is one the previous release's trio recorded and did not disposition `fixed-and-observed`; a `fixed-and-observed` finding is not carried again.** A regression against the recorded prior runs is a finding, not a release gate.

## Discovering What Changed and Why

Agents answering "what changed, and why?" — for any purpose, not just releases — follow the record chain. *(Consumer note: in a consumer repo only the served governance corpus is reachable; the chain's other paths are DesignerPunk-internal — the PATTERN transfers, the paths don't.)*

1. **What, at a glance**: squash-commit titles on `main` (`git log vX..vY --oneline`, or between any two points). Every commit is a PR with a disciplined title.
2. **What, curated per release**: `docs/releases/release-X.Y.Z.md` — hand-authored, breaking changes called out with migration guidance — and, for the people who install the package, its consumer entry in `CHANGELOG.md` (shipped in the package; the only release record a consumer has locally).
3. **Why, per task**: `docs/specs/[spec]/task-N-summary.md` (public summary) and `.kiro/specs/[spec]/completion/` (detailed record) — for spec-shaped work. For issue-driven work: the PR body and any `.kiro/issues/` record.
4. **Why, decision-grade**: `.kiro/docs/ballots/` (ratified decisions with their evidence and counter-arguments) and `governance/classification-map.md` (per-rule classifications with dated history). When a change traces to a ruling, the ballot is the authoritative why.

## Historical Note

The retired tool's own history is instructive: it replaced a 203-file predecessor (Spec 065's rebuild), and its retirement continues that simplification — 203 files → 24 files → a recipe — completed once the PR gate supplied, as a by-product of merge discipline, the structured change record the tooling existed to reconstruct. Records: Spec 065 (the rebuild), the Q6 ballot (the retirement), `docs/releases/release-14.0.0.md` (the live trial that settled it).
