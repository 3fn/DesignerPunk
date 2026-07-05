# Roadmap: Release System & Manager — Review and Bring Forward

**Date**: 2026-06-27
**Status**: Roadmap item (not scheduled) — product decision + doc rewrite, deliberately deferred
**Surfaced by**: Spec 118 documentation-coherence audit (`.kiro/specs/118-module-resolution-coherence/findings/doc-coherence-audit-2026-06-26.md`, findings B1a/B1b), then expanded on investigation.
**Owner**: Peter (product intent) → spec TBD when scheduled.

---

## TL;DR

The release manager **works** and is used to release DesignerPunk itself (`npm run release:analyze | notes | run` → `src/tools/release/cli/release-tool.ts`, commands `analyze` / `notes` / `release` + `--dry-run`). What's stale is its **entire documentation corpus**, and there's a **product gap** between what the docs promise (a consumer-adoptable release system) and what ships (an internal-only tool with no consumer entry point). Review the manager against the "governed-methodology" product vision, decide its consumer-facing shape, then rewrite the docs to match — **build/decide first, document second** (doc-first is exactly what stranded the current docs).

## Two problems, one review

### 1. The whole release-doc corpus is out of date (not broken — superseded)
**Spec 065 ("release-system-rebuild")** replaced an earlier, more elaborate system (the deleted `src/release-analysis/` + `src/release/`, CLI `release:cli plan` / `release auto` / `config validate`) with today's simpler internal tool (`analyze` / `notes` / `release`). The tooling moved; the docs didn't. Stale surface (~22 files, all describing the deleted `release:cli` interface):
- **`docs/examples/`** (consumer-facing) — `README.md`, `configurations/` (5), `tutorials/` (6: `01-first-release` … `06-ci-cd-integration`), `integrations/` (4: `migration-guide.md`, `existing-project.md`, `github-actions.yml`, `gitlab-ci.yml`).
  *(Not release docs — keep: `docs/examples/design-outline-example.md`, `docs/examples/design-exploration/`.)*
- **`docs/release-management/`** (internal) — `release-management-guide.md`, `configuration-reference.md`, `troubleshooting-guide.md`, `authentication-setup-guide.md`, `environment-configuration-guide.md`, `security-best-practices.md`.

These two doc sets have **different fates**: the internal docs should be **updated** (the tool is real and used); the consumer docs are gated on problem #2.

### 2. The "broken promise": release management isn't part of the package (yet)
The consumer guides (`docs/examples/integrations/*`) tell a *consumer* to adopt DesignerPunk's release system in *their* repo — but there is **no consumer entry point**: the `designerpunk` CLI exposes `generate` / `validate` / `init` / `mcp:*` / `figma:*` / `sync` and **no release command**, and the tool's scripts point at the package's own internal source. So the docs promise a capability that doesn't ship.

Per the product vision — **"the WordPress of AI-driven development" / DesignerPunk as a governed development *methodology*** (consumers adopt the tokens *and* the spec/completion/governance model) — a release manager that derives versions and notes from **completion documents** is methodology-native and differentiated (off-the-shelf tools like changesets can't do it; they don't know about completion docs). Under that vision, making it consumer-facing is on-thesis, not scope creep. The promise is worth **fulfilling**, not retracting — but deliberately.

### 3. The generated release notes have no designed consumer rendering (added 2026-07-05)

The v13.0.0 release surfaced a third gap, adjacent to #2: the tool's generated notes (`release-X.Y.Z.md` triplet) are **internal completion-doc summaries stitched together and relabeled** — 13.0.0's lead "Breaking / Consumer-Facing" item was a raw internal task summary ("Task 11 Summary (COMPLETE): Relocation-Integrity Gate…"), and the "external" `.md` vs `.internal.md` outputs are nearly identical, confirming the external rendering was never designed. Peter caught it as a format regression vs the hand-authored pre-12 `RELEASE-NOTES-*.md` era (narrative summary, curated breaking changes, what-a-consumer-must-do voice). **Interim practice:** hand-author a consumer-facing `RELEASE-NOTES-X.Y.Z.md` companion per release (13.0.0's exists; it doubles as the GitHub release page body). **Review-scope addition:** design the consumer rendering — the NotesRenderer needs an audience-aware pass (classify → translate to consumer impact → curated actions), not a relabel of internal summaries.

## Review scope (when scheduled)
1. **Product**: define what a consumer-facing release manager must do in the governed environment, and its **entry point** (likely a `designerpunk release …` CLI surface). Decide whether to keep the internal-vs-consumer split or unify.
2. **Architecture — the consumer-awareness gap**: a consumer-facing manager must operate on the **consumer's** completion docs / specs / version, not the package's. This is the same consumer-awareness problem Spec 118 solved for the token catalog (the **C′** work — `runtime-ts-resolution-target-model.md`); lean on that groundwork (config-resolved roots, `resolvePackageRoot`, the scoped-tsx seams) rather than re-deriving it.
3. **Docs (build-then-doc)**: only after 1–2 settle the interface — update the **internal** `docs/release-management/` corpus to the current/decided tool, and rewrite or rebuild the **consumer** `docs/examples/` corpus to the real consumer interface. Until then the corpus carries an interim "superseded — pending review" banner (added 2026-06-27).

## Notes
- The prior (pre-rebuild) example/tutorial content is recoverable from git history if useful as a starting point for the consumer-facing rewrite — but rewrite to the decided interface; do not resurrect the `release:cli` examples.
- This is meaningful product work; its priority vs. Specs 119 (steering disclosure) / 122 (agent generator) and core design-system work is Peter's call. Roadmapped, not scheduled.
