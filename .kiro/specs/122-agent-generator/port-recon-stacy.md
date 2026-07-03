# Port Recon — Manual Stacy CC Port (generator input for 122)

**Date**: 2026-07-01
**Author**: main loop (Claude Code)
**Purpose**: Capture the transform decisions surfaced by hand-porting Stacy from Kiro
(`.kiro/agents/stacy-prompt.md` + `.kiro/agents/stacy.json`) to Claude Code
(`.claude/agents/stacy.md`). This is a **manual dry-run of the exact transform 122's generator
must automate** — the same role the 121 dry-run played. It is disposable input-of-record to 122,
not a maintained artifact.

**Context**: Stacy was hand-ported (rather than generated) because her expertise is needed *now*
for 122 formalization (§4a is about her role) and because the validation agent benefits from a
hand-authored baseline to later distrust the generated version against (§3a/§3b recursion). Sparky
and Kenya remain deferred to generation (gated on their command/skill content per §2.8).

---

## Transform deltas (each is a generator requirement)

### D1 — `resources:` array routes to *two destinations by class*, not uniformly
Stacy's `resources` split cleanly along the five-class boundary:
- **Identity / always** (`personal-note`, `core-goals`, `AI-Collaboration-Principles`,
  `Agent-Directory`, `start-up-tasks`) → the `CLAUDE.md` always-layer (interim stopgap; OB-7).
- **Governance corpus** (`Process-Development-Workflow`, `Process-File-Organization`,
  `Process-Spec-Planning`, `Process-Task-Type-Definitions`, `Test-Development-Standards`,
  `Test-Behavioral-Contract-Validation`, `Spec-Feedback-Protocol`, `completion-documentation-guide`,
  `Contract-System-Reference`, `Product-Token-Governance`) → **MCP-served on-demand** (not injected).

**Generator requirement**: the transform must **classify each resource** and route it to the
correct destination. A uniform "copy the resources list" transform is wrong. → informs §2.1
(five-class ambient), §2.7 (output targets), OB-7.

### D2 — Both the `file://`/`skill://` prefix AND the path root carry classification signal
Her JSON uses `file://` for the 4 always-identity docs and `skill://` for `start-up-tasks` + the
governance corpus; the path root differs too (`.kiro/steering/` for identity, `governance/` for
corpus). Neither signal alone is sufficient (`start-up-tasks` is `skill://` but lives under
`.kiro/steering/` and is an always-doc).

**Generator requirement**: classification reads **prefix + path-root + membership**, not a single
field. → informs §2.1, §5(e) (structure the membership/routes).

### D3 — Live OB-6 evidence: existing ports are STALE on the 119-A relocation; Stacy's JSON is current
`stacy.json` already references post-119-A `governance/` paths for the corpus, while the older
`leonardo.md` / `thurgood.md` CC ports still say `.kiro/steering/` for *everything*. So the
hand-maintained ports have already drifted apart on the relocation — exactly the drift 122's
regeneration + diff-guard exist to kill.

**Generator requirement**: emit `governance/`-rooted corpus references (by `id`, not physical path
per §2.4) and regenerate the stale ports. → confirms OB-6 (§2.7), §2.4 (id-addressing).

### D4 — Coarse server-grant → explicit tool subset is a *judgment call* the generator must own
Her `allowedTools` was server-level (`@designerpunk-docs`, `@designerpunk-application`,
`@designerpunk-product`) — the whole server each. CC convention (per every existing port) is an
**explicit namespaced tool list**, so the port required *choosing which subset of each server* she
needs (e.g. docs: read-oriented `find_docs`/`get_section`/summaries, NOT the steward-only
`validate_metadata`/`list_cross_references`; application: existence/assembly/health + token-parity
lookup; product: overview/health/screens/state-model/product-tokens/experience-map).

**Generator requirement**: a rule for **coarse-grant → per-agent inherent tool subset**, drawn from
the generated master tool registry, owned by the domain owner, with Stacy's coverage-of-coverage
catching un-routed tools. This subset is *mine (main loop) for now* and should be confirmed by Stacy
herself. → this IS §2.2 (master tool registry + per-agent inherence).

### D5 — Kiro-only config fields need an explicit disposition (not silent drop)
Dropped in the port with no CC equivalent: `agentSpawn` hook (`git status --porcelain`),
`keyboardShortcut` (`ctrl+shift+g`), `welcomeMessage`. The port dropped them silently; a *generator*
should not — each needs a declared disposition.

**Generator requirement**: enumerate every Kiro config field and declare its CC transform (carry /
transform / drop-with-reason). Silent drop is the §2.9 "removals need a positive cue" anti-pattern
applied to config, not prose. → informs §2.3 (per-tool transforms), §2.9.

### D6 — Write-scope declarative → behavioral (known gap, re-confirmed)
`toolsSettings.write.allowedPaths` (`​.kiro/specs/**`, `docs/specs/**`) has no CC frontmatter
equivalent; expressed as a behavioral note in the Port Note. Same known portability gap flagged for
the other ports. → confirms §2.3 (write-scope-as-note).

---

## The `start-up-tasks` cross-check (a §8 item-2 pass)
Data's port *dropped* `start-up-tasks`; Stacy's JSON *injects* it, and the port *preserved* it.
Running Data's proposed mechanical set-difference (Task-9 ambient block vs `*.json` injection) on
Stacy: her block keeps it, her JSON injects it → **no delta, check passes.** Concrete evidence that
the §8 item-2 sweep is mechanical and per-agent, and that the drop is agent-specific (Data) not a
systemic Task-9 pattern — though the full sweep across all 8 still owes an answer.

---

## Open flag for Stacy herself
The tool subset (D4) is a defensible-but-single-author call. As the validation agent with a
hand-authored baseline, Stacy should confirm her own port's tool subset + resource classification —
the intended §3a/§3b recursion (validator distrusts the generated-vs-hand baseline).
