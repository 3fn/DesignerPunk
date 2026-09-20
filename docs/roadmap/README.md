# Roadmap Index

**Date**: 2026-09-20
**Purpose**: Liveness convention for `docs/roadmap/` — which doc is current, which are standing, and where history lives. Mirrors the `.kiro/issues/` convention (founded PR #173): **root = live, `archive/` = historical**, same-filename resolution.

---

## The convention

- **Root holds only live docs**: the ONE current strategic view, standing theses, and live trackers. Everything else lives in `archive/` (moved same-filename; a path cited elsewhere that is missing at root resolves under `archive/` — do not treat the stale path in a frozen record as an error, and do not edit frozen records to chase moves).
- **Supersession chain, not amendment**: strategy shifts arrive as a NEW dated doc that names what it supersedes; the superseded doc gets a dated banner and moves to `archive/` when nothing in it remains standing. Dated strategy notes are records — never rewritten in place.
- **Maintenance duty**: whoever lands a new dated strategy note repoints this README and banners the predecessor, in the same PR. *(Suggested self-policing hook, not yet adopted: a one-line item in the monthly Civitas health check — "roadmap README points at a doc whose own header says current.")*

## Current strategic view

- **[2026-09-20-consumer-distribution-roadmap-update.md](./2026-09-20-consumer-distribution-roadmap-update.md)** — the live view for the Spec 123 arc: spine status, decision gates, recorded conflicts, owed checks. Supersedes the *sequence* in the WordPress-thesis note.

## Standing (read with the current view)

- **[north-star-design-system-ecosystem.md](./north-star-design-system-ecosystem.md)** — the pre-Astryx "ships the capability, not just outputs" thesis. Standing.
- **[2026-07-04-wordpress-thesis-strategy.md](./2026-07-04-wordpress-thesis-strategy.md)** — positioning, the WordPress mapping, loops lens, counter-arguments. Thesis stands; its sequence is executed (see banner).
- **[2026-07-04-full-project-audit.md](./2026-07-04-full-project-audit.md)** — dated audit record kept at root while findings A6 (packaging diet) and A10 (`personal-note.md` publication) remain open Spec 123 inputs. Archive it when 123 disposes them.

## Live tracker

- **[m0a-deferred-items.md](./m0a-deferred-items.md)** — deliberate deferrals with triggers (ESM modernization, repo-wide linting, audit dispositions). Cited from `governance/` (technology-stack, BUILD-SYSTEM-SETUP, Rosetta-System-Architecture) — stays at root while those citations stand.

## Archive

`archive/` holds the M0a-era planning corpus (roadmap, process scaffolding, pre-launch feedback, package exports, MCP audits, packaging inventory, north-star feedback round), the formalized-elsewhere `integration-guide-draft.md` (now `governance/DesignerPunk-Integration-Guide.md`), and the superseded `release-system-review.md` (resolved by the Q6 retirement ballot, 2026-08-12). All carry their original filenames; supersession banners where applicable.
