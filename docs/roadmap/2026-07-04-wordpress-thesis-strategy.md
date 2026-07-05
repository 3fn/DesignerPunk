# Strategy Note: The WordPress Thesis — Proceeding Post-Astryx

**Date**: 2026-07-04
**Status**: Proposed — Peter's stated goal, Claude's recommended path; sequence adjustments and decision points pending Peter's calls
**Purpose**: Capture the strategic direction discussion following the 2026-07-04 full project audit and the analysis of Meta's Astryx launch (2026-06-27)
**Context**: Peter's stated goal: "the WordPress for AI-driven development," better than what Meta offers. Component count explicitly NOT the metric of concern.

---

## The Astryx Situation (summary — full analysis in session 2026-07-04)

Meta launched Astryx (astryx.atmeta.com, MIT, beta): React + StyleX, 150+ components, config-based theming over CSS custom properties, npm distribution with a "swizzle" ejection hatch, CLI-as-agent-interface with a JSON machine-readable manifest, an MCP server, and **"vibe tests"** — a built-in eval harness measuring how well humans *and agents* can build with it. Eight years internal, claims 13,000+ apps, ~half of updates community-contributed.

**What it means for DesignerPunk:**
- **Validates the thesis loudly.** MCP-served docs, agent-shaped APIs, CLI as agent interface — DesignerPunk arrived at the same architecture independently (and shipped MCP-served DS docs via Spec 121 before their public launch).
- **Commoditizes the weak pitch.** "Agent-ready design system" is now a category Meta defines, not a differentiator.
- **Leaves the moat untouched.** Astryx is web-only, no mathematical token foundation, no behavioral contracts, no governance system, no shipped agent org. It is a component *vendor* with agent affordances — not an installable development capability.

## The WordPress Mapping

WordPress won on: the **five-minute install**, an **extensibility surface**, a **backwards-compatibility promise**, and being a **running product** out of the box — not on code quality or feature count. Mapped to DesignerPunk:

| WordPress winning move | DesignerPunk analog | Status |
|---|---|---|
| Five-minute install | **Spec 123** (`npx designerpunk init --target`) | Stub; the make-or-break spec |
| Extensibility surface | Theme registry (094); future "plugin" story (themes, token families, component families, experience patterns, agent packs) | Registry shipped; third-party contribution contract undefined — name on north star, do NOT build yet (process-first) |
| Backwards-compat promise | Additive/contract-test discipline (121's enforced MCP contract) | In the DNA; keep it |
| Running product, not a kit | product-template + **the generated agent org itself (122)** | 122 is the category-defining piece — nobody ships the development organization |

The north star already claims this positioning ("ships the capability, not just outputs") — stated pre-Astryx. This is not a pivot; it is a sharpening.

**Positioning line:** *Astryx gives your agent components it can read; DesignerPunk gives your agent an organization it can join.*

**Refined via the loops lens (2026-07-04, same-day addendum):** *Astryx improves a consumer's execution loop; DesignerPunk installs their outer loops* — task, product, and system loops (specs process, governance gates, drift detection, the generated agent org). Nobody sells outer loops. See § "The Loops Lens" below.

"Better than Meta" is winnable ONLY on that axis — never on component breadth or web polish.

## Recommended Sequence (adjusted spine)

The decided thread (118 done → validator #3 → 122 → 123) remains the right spine. Three adjustments:

```
NOW        Audit quick-wins (A1–A4) + commit in-flight 07-03 work
   →       125 Phase 0 (PR-gated flow) + Phase 1 (arm existing checks)   ← PULLED FORWARD, before 122
   →       Validator fix (#3 — consumer-facing `validate` must work before 123; already slotted)
   →       122 Agent Generator (master-tool-registry-first thin edge, per its own outline)
   →       123 Consumer Distribution — bar RAISED to the WordPress test (below)
              + manual agent-usability benchmark runs during its validation   ← NEW INSTRUMENT
   →       Phase 2 marketing site = the public proof, positioned explicitly vs Astryx,
              WITH cross-platform receipts (real Swift/Kotlin output shown, even though
              native activation stays M0b)
```

### Adjustment 1 — 125 Phase 0/1 before 122
Three compounding reasons: (a) 125 Phase 0's PR gate is what **arms 122's regenerate-and-diff guard** — building 122 first means building its core invariant unenforced (125's own outline notes this); (b) a governance-branded product cannot go to external consumers with its own enforcement authored-but-unarmed — self-refuting on first public regression; (c) it's small ("highest leverage, smallest surface" per the 125 outline). **Kill-switch:** if Phase 1 balloons past ~a-few-days scale, cut to armed full-typecheck + `build:validate` only and move on. Phases 2–3 stay deferred.

### Adjustment 2 — 123's acceptance bar becomes the WordPress test
Not just "a product repo can install it" but: **a stranger runs one command and gets a running, themed, cross-platform-generating product with working agents and MCPs in their chosen tool, in minutes — validated by watching someone do it cold.** Fold in from the 2026-07-04 audit: packaging diet (A6 dead code, `files: ["src/"]` breadth, 30.7MB unpacked), the public-npm-vs-GitHub-Packages decision (auth friction is anti-WordPress), and the `personal-note.md` publication call (A10).

### Adjustment 3 — Agent-usability benchmark (the one net-new thing Astryx should provoke)
The counter to their vibe tests, and the only way to *evidence* "better than Meta": **same task, same agent, Astryx vs DesignerPunk — publish the transcripts.** Doubles as engineering signal and marketing material. Per process-first: run manually during 123's consumer validation; formalize as a spec (Thurgood/Stacy-shaped) only after the manual process proves out. Do NOT build a harness first.

## Decision Points (Peter's calls, blocking or shaping the above)

1. **First-user persona** — WordPress had "the blogger." Who is DesignerPunk's? (Solo technical founder with agents? Small agency? Design-eng team?) Shapes 123's UX more than any architecture decision. **Recommend: formal input to 123's formalization.**
2. **Distribution channel** — npm registry may not be the channel at all; the agent-runtime ecosystems (Claude Code plugins/skills, Kiro, Cursor marketplaces) may be — which would make 122's per-runtime generation the channel strategy, not just anti-drift plumbing. **Recommend: first-class 123 question.**
3. **Public npm vs GitHub Packages** — friction call, decide at 123.
4. **125 kill-switch threshold** — how much Phase 1 scope before cutting to the two-check minimum.

## Counter-Arguments (recorded per AI-Collaboration-Principles)

- **The plan optimizes toward an unvalidated market.** Zero external consumers today; "people who want agent-built, governed, cross-platform products" is plausible but unproven. The lean counter-position — skip hardening, get the rough package into three strangers' hands now — has real merit. 125-first is still recommended because it is genuinely small and shipping ungoverned is self-refuting for this brand; **but if 125 Phase 1 takes a month, that is the signal the recommendation is wrong.**
- **WordPress's win had a channel DesignerPunk may lack.** Cheap PHP hosting was WordPress's distribution rail; npm alone is not an equivalent. If no analogous rail exists, the growth model needs rethinking regardless of product quality (see Decision Point 2).
- **Civitas is the moat AND the tax.** Governance depth is what Meta can't cheaply copy — and why Astryx ships faster. 122 automates governance delivery (the right answer), but scope ruthlessness over the next two specs is the binding constraint on losing the window.

## What NOT to Do

- Don't chase component count or web polish (unwinnable vs Meta; explicitly not Peter's metric).
- Don't start the marketing/positioning push before 123's five-minute experience exists — WordPress's pitch WAS the install.
- Don't build the benchmark harness, the plugin surface, or consumer-side enforcement (125 Phase 3) before their manual prerequisite stages prove out.
- Don't launch the public story web-only without cross-platform receipts on display — that's fighting Astryx on its home turf.

---

## The Loops Lens (same-day addendum, 2026-07-04)

Trigger: Laurie Voss, *"What the hell is a loop, anyway?"* (LinkedIn, 2026-07) — four nested feedback architectures (execution / task / product / system) plus a human oversight loop. Applied as a **diagnostic lens, not an identity** — it is one essay's taxonomy of one conference season; do not rebrand around it unless the vocabulary survives.

**The mapping (DesignerPunk has been building loop infrastructure without the word):**

| Voss loop | DesignerPunk analog | Diagnosed weakness → owner |
|---|---|---|
| Execution (act→observe; quality = feedback signals) | Agent edit-run loop | Signals unarmed (tsx strips types unchecked, `build:validate` idle, Stemma tests idle) → **125 Phase 0/1 IS execution-loop signal repair** |
| Task (Ralph loop — fresh context per iteration vs a durable spec) | One fresh subagent per parent task + terse report | Healthy. Deep insight: **the governance corpus (specs + MCP-served steering + completion docs) is the persistence layer that makes fresh-context restarts viable** — the corpus is Ralph-loop infrastructure, built before the vocabulary existed |
| Product (triage→spec→implement→review→verify→ship→monitor, continuous) | issues → Thurgood formalization → feedback rounds → domain agents → tests → release tooling → health checks | Every transition human-gated (stop-and-wait); Peter's review does double duty (judgment + correctness) because checks are unarmed → the **autonomy dial** (below) |
| System (outer loop maintains the primary system) | **Civitas** — doc health, MCP drift detection, prompt currency, ballots; rare to have one at all | Mostly manual/cadence-driven (122 automates a slice); **no evals** → the Astryx-vs-DP benchmark IS the missing eval component |
| Oversight (goals, budgets, culling — humans stay) | Peter-decides law, alternative-paths log, waivers | Well-formalized; the completion/summary-doc system is a designed answer to the "human conceptualization bottleneck" Voss reports even at Anthropic's factory team |

**Discount recorded:** the mapping is clean partly because the taxonomy is loose — any disciplined process maps onto four nested feedback cycles. What survives the discount: the corpus-as-fresh-context-infrastructure insight, the 125→autonomy-dial linkage, and the ships-the-outer-loops positioning.

### The Autonomy Dial — OPTIONAL feature (immediate or deferred; Peter elects)

Each check 125 Phase 1 arms transfers part of the *correctness* half of human review to machinery; the dial is a documented policy mapping **armed checks → autonomy expansions they purchase** (e.g., agents iterate autonomously against armed gates *within* a task; human authorization retained at parent-task boundaries; oversight loop stays human). Deliberately framed as **elective**: implement immediately as a short policy section at Phase 1 closeout, or defer with an activation trigger (revisit at Phase 1 closeout review — triggered like a tracker item so "optional" doesn't decay into "never"). Lightweight by construction — a Task-Completion-Protocol-scope policy amendment, not machinery; per-task-class and reversible. Counter-argument recorded in the 125 inbound: at solo scale the dial may be premature — if stop-and-wait doesn't chafe post-Phase-1, defer indefinitely. Detail: `.kiro/specs/125-mechanical-enforcement-strategy/inbound-from-wordpress-thesis.md` §3.

### Spec inbound notes (delivery mechanism)

Considerations from this strategy thread were delivered to the three in-flight specs via the established `inbound-from-*` pattern (inputs to formalization, NOT edits to the outlines, NOT decisions):
- `.kiro/specs/122-agent-generator/inbound-from-wordpress-thesis.md` — category-defining artifact stakes; per-runtime targets as channel; 125-Phase-0-arms-122's-guard sequencing
- `.kiro/specs/123-consumer-distribution/inbound-from-wordpress-thesis.md` — five-minute-test bar; audit A6/A10 fold-ins; persona + channel as Peter's open formalization inputs; manual benchmark rider
- `.kiro/specs/125-mechanical-enforcement-strategy/inbound-from-wordpress-thesis.md` — Phase 0/1-before-122; execution-loop reframing; the optional autonomy dial

## Cross-References

- `docs/roadmap/2026-07-04-full-project-audit.md` — audit findings A1–A10 referenced above
- `docs/roadmap/m0a-deferred-items.md` § "Full project audit — 2026-07-04" — proposed dispositions
- `docs/roadmap/north-star-design-system-ecosystem.md` — the pre-existing "capability, not outputs" thesis this note sharpens
- `.kiro/specs/122-agent-generator/design-outline.md` — the category-defining spec (generated agent org)
- `.kiro/specs/123-consumer-distribution/design-outline.md` — stub; the make-or-break spec; bar raised per Adjustment 2
- `.kiro/specs/125-mechanical-enforcement-strategy/design-outline.md` — Phase 0/1 pulled forward per Adjustment 1
- Astryx: https://astryx.atmeta.com/ · https://github.com/facebook/astryx · blog/how-astryx-works (vibe tests, swizzle, CLI manifest)
- Loops: Laurie Voss, "What the hell is a loop, anyway?" — linkedin.com/pulse/what-hell-loop-anyway-laurie-voss-ldmdc (execution/task/product/system + oversight taxonomy)
