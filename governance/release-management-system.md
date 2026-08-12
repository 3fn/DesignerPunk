---
id: release-management-system
inclusion: manual
name: Release Management System
description: The release recipe (derive-classify-ratify, hand-authored notes) and how agents discover what changed and why — replaces the retired automated release tool
aliases: release recipe, release process, release notes, what changed, version bump, changelog, release delta
---

# Release Management System

> **Audience framing**: this documents **DesignerPunk's own** release process. Consumers of the package read it as a worked example of a recipe-over-tooling release model — the paths, scripts, and named roles below are DesignerPunk's, not yours. (Whether DesignerPunk's release notes themselves ship to consumers is an open Spec 123 question, deferred by the Q6 ballot.)

**Date**: 2026-02-28
**Last Reviewed**: 2026-08-12
**Last Updated**: 2026-08-12
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
- Verification stays mechanized; judgment stays human. DesignerPunk's publish guard scripts (`check:drift`, `verify:token-index-clean`, the `prepublishOnly` chain — this repo's package scripts, not shipped to consumers) block a broken publish mechanically and are NOT part of the retired tool.

## The Release Recipe

The operational sequence lives in `.kiro/hooks/RELEASE-FLOW.md` (the PR-gated release flow). The judgment half, summarized:

1. **Derive the delta**: `git log $(git describe --tags --abbrev=0)..main --oneline` — every line is a squash-merged PR title (the changelog spine). Scope a second pass to the shipped surface to separate consumer-facing from internal — **the authoritative shipped-surface list is `package.json` `files[]`** (fifteen-plus roots beyond `src/`, including `governance/` and the other served-content roots; scoping to `src/` alone would have dropped v14.0.0's docs-corpus entry).
2. **Classify**: for each change, read its task summary (`docs/specs/…`) or PR body for substance; classify 🔴 breaking / 🟡 minor / 🔵 patch-or-internal. Issue-driven work has no summary doc — its PR title and body are the record; do not assume spec-shaped work is the whole delta (the retired tool's fatal assumption).
3. **Recommend the bump; the release owner ratifies.** Removals or behavior breaks → major. New behavior → minor. Fixes/internal → patch.
4. **Hand-author the notes** at `docs/releases/release-X.Y.Z.md` (v14.0.0 is the format precedent). Notes ride the release PR with the version bump and any token-index regeneration.
5. **Publish per RELEASE-FLOW.md** (repo-internal; and the dual-registry playbook it references): release PR → the release owner merges → publish from merged `main` → then tag and GitHub release: `git tag -a vX.Y.Z && git push origin vX.Y.Z && gh release create vX.Y.Z --notes-file docs/releases/release-X.Y.Z.md`.

## Discovering What Changed and Why

Agents answering "what changed, and why?" — for any purpose, not just releases — follow the record chain. *(Consumer note: in a consumer repo only the served governance corpus is reachable; the chain's other paths are DesignerPunk-internal — the PATTERN transfers, the paths don't.)*

1. **What, at a glance**: squash-commit titles on `main` (`git log vX..vY --oneline`, or between any two points). Every commit is a PR with a disciplined title.
2. **What, curated per release**: `docs/releases/release-X.Y.Z.md` — hand-authored, consumer-facing framing, breaking changes called out with migration guidance.
3. **Why, per task**: `docs/specs/[spec]/task-N-summary.md` (public summary) and `.kiro/specs/[spec]/completion/` (detailed record) — for spec-shaped work. For issue-driven work: the PR body and any `.kiro/issues/` record.
4. **Why, decision-grade**: `.kiro/docs/ballots/` (ratified decisions with their evidence and counter-arguments) and `governance/classification-map.md` (per-rule classifications with dated history). When a change traces to a ruling, the ballot is the authoritative why.

## Historical Note

The retired tool's own history is instructive: it replaced a 203-file predecessor (Spec 065's rebuild), and its retirement continues that simplification — 203 files → 24 files → a recipe — completed once the PR gate supplied, as a by-product of merge discipline, the structured change record the tooling existed to reconstruct. Records: Spec 065 (the rebuild), the Q6 ballot (the retirement), `docs/releases/release-14.0.0.md` (the live trial that settled it).
