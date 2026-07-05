# Inbound: WordPress-Thesis Strategy → Spec 123

**Date**: 2026-07-04
**Source**: `docs/roadmap/2026-07-04-wordpress-thesis-strategy.md` (Peter + Claude strategy session, post-Astryx-launch + full-project-audit)
**Status**: Considerations for formalization — **NOT decisions** (this respects the stub's "no design decisions recorded here" rule). Consume alongside the other `inbound-from-*` docs when 123 formalizes (post-122).

---

## 1. The acceptance bar: the "WordPress five-minute test" (proposed)

Peter's stated goal is "the WordPress for AI-driven development." The strategy note proposes raising 123's bar from "a product repo can install it" to an **experience**: a stranger runs one command and gets a running, themed, cross-platform-generating product with working agents and MCPs in their chosen tool, in minutes — **validated by watching a cold user do it**, not by the author's own dry-run. Formalization should decide whether this becomes an explicit requirement (recommended) and what "minutes" means concretely.

## 2. Audit items proposed to fold into 123's scope (2026-07-04 audit)

- **Packaging diet** — audit finding A6: ~2,800 LOC orphaned `src/performance/` + `src/workflows/` + 630 LOC `.example.ts` ship via `files: ["src/"]`; tarball is 2,558 files / 30.7MB unpacked. Deletion + `files[]` breadth review couples naturally to this spec.
- **`personal-note.md` ships to public npm** (audit A10) — confirm intentional or exclude; also the dangling resume reference it contains for consumers. (Related existing deferred item: "Personal Note template" at second-customer trigger.)
- Full audit: `docs/roadmap/2026-07-04-full-project-audit.md`; tracker: `m0a-deferred-items.md` § "Full project audit — 2026-07-04".

## 3. Formalization inputs that are Peter's open decisions (do not assume)

- **First-user persona** (Decision Point 1) — WordPress had "the blogger"; who is DesignerPunk's? Shapes init UX, template choice, and docs more than architecture. Proposed as a formal input gate to 123 formalization.
- **Distribution channel** (Decision Point 2) — public npm vs GitHub Packages (auth friction is anti-WordPress) vs agent-runtime ecosystems (CC plugins/Kiro/Cursor) as the primary rail. If the runtime-marketplace answer wins, 122's per-target generation is the channel mechanism and 123's packaging story should reflect that.

## 4. Benchmark rider (manual, process-first)

During 123's consumer validation, run a **manual** agent-usability benchmark: same build task, same agent, Astryx vs DesignerPunk; keep transcripts. This is the evidence base for the "better than what Meta offers" claim (their "vibe tests" analog) AND doubles as marketing material. Explicitly manual-first per process-first tooling principle — no harness until the manual process proves out. Formalization decides whether it's an AC, a task, or a parallel activity.

## 5. Enforcement reach (boundary note)

125 Phase 3 (consumer-side enforcement) remains explicitly 123-adjacent-future per 125's outline — teeth stop at the repo boundary for now. 123 should not absorb it; just don't design the package layout in a way that precludes shipping consumer-side checks later.
