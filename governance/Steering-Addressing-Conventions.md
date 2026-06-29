---
id: steering-addressing-conventions
inclusion: manual
name: Steering Addressing Conventions
description: Per-doc id, composite docid#sectionid grammar, kebab-case filename standard, and aliases seeding guidance — the four Spec 119-A conventions governing identity and discovery for all steering docs in governance/ and .kiro/steering/.
aliases: doc id convention, id addressing, addressing grammar, docid sectionid, steering filename convention, kebab-case filename, no-spaces filename, aliases seeding, discovery aliases, steering doc conventions, naming convention, semantically inert id, immutable id
---

# Steering Addressing Conventions

**Date**: 2026-06-29
**Last Reviewed**: 2026-06-29
**Purpose**: Document the per-doc `id`, composite `docid#sectionid` grammar, filename, and `aliases` conventions established by Spec 119-A for all steering docs
**Organization**: process-standard
**Scope**: cross-project
**Layer**: 2
**Relevant Tasks**: all-tasks

---

This document records the addressing and naming conventions established by Spec 119-A (Steering Relocation & Serving Contract). These conventions govern all steering docs in `governance/` and `.kiro/steering/`.

**Documentation Requirements waiver (Spec 119-A):** The Process-Spec-Planning Documentation Requirements clause is framed for token/component work. Spec 119-A introduces neither tokens nor components — it introduces conventions. The token/component documentation requirements are therefore **waived as not-applicable** for 119-A; the developer-facing surface 119-A does introduce (the `id`/`aliases`/filename conventions) is covered by this document rather than waived.

---

## Convention 1: Per-Doc `id`

Every steering document carries a unique frontmatter `id`:

```yaml
---
id: process-file-organization
---
```

**Derivation rule:** the `id` is the kebab-slug of the frontmatter `name:` field, falling back to the document H1 when `name:` is absent. Slugification: lowercase, spaces/underscores to `-`, strip non-`[a-z0-9-]`, collapse consecutive `-`.

**Immutability rule:** once assigned, a doc's `id` is **immutable**. A filename rename does not change the `id`. A title edit does not change the `id`. Only a documented, deliberate identity change warrants an `id` change — and in that case `aliases:` absorbs the old value so existing references keep resolving.

**Semantic inertness rule:** the `id` string encodes **no taxonomy, numbering, ordering, or hierarchy**. It is a stable handle, not a classification. Do not read meaning into its form.

**Corpus-wide uniqueness:** every `id` must be unique across both `governance/` and `.kiro/steering/` (the two on-disk roots). The enforcement mechanisms are:

- **Build-time guard** (`npm run check:id-uniqueness` / `checkIdUniqueness`): fails the build if any two docs share an explicit or derived `id`. Operates over the on-disk corpus across both roots, not the MCP index.
- **Thurgood metadata-validation hook**: enforces the same uniqueness invariant on doc create/modify as the day-to-day front line, before the build step.

---

## Convention 2: Composite `docid#sectionid` Addressing Grammar

The `id` is the **document** half of a two-part composite addressing grammar:

```
docid#sectionid
```

- **`docid`** — unique corpus-wide (Convention 1 above). Stable, immutable, semantically inert.
- **`sectionid`** — unique within its document (future, deferred to Gap 7 — see below).

**Current state:** only the `docid` half is implemented. The `#sectionid` half is **designed-not-precluded** — the grammar is intentionally left open so Gap 7 can slot in without a grammar change.

**Gap 7 cross-link — trigger now firing:** Gap 7 ("Source-Embedded Stable Section IDs") in `MCP-Evolution-Roadmap.md` describes the work needed to make `sectionid` durable (embedded in source markdown, not just positional). Its trigger condition is: "Consumers (or Spec 122-generated agents) begin **persisting** `sectionId` values across sessions/edits and observe drift." This trigger is **now firing** — Spec 122-generated agents are the next planned deliverable and will persist IDs and address cross-refs by ID. Gap 7 is therefore active. Section-`id` embedding is explicitly excluded from Spec 119-A scope and recorded in `MCP-Evolution-Roadmap.md` Gap 7 as the next addressable gap.

---

## Convention 3: Kebab-Case Filename Standard

Steering-doc filenames use **kebab-case with no spaces**:

- Correct: `process-file-organization.md`, `mcp-evolution-roadmap.md`
- Incorrect: `Process File Organization.md`, `MCP Evolution Roadmap.md`

This standard was established by Spec 119-A (mass-rename of 10 space-bearing files). It applies corpus-wide — both `governance/` and `.kiro/steering/`.

**Decoupling from identity:** the filename is a physical artifact; it is **decoupled from document identity**. A rename changes the filename, not the `id`. References that resolve by `id` survive renames without update.

---

## Convention 4: `aliases` Seeding Guidance

The `aliases:` field serves the **discovery plane**, not the addressing plane. Its purpose is to make docs findable by cross-domain query terms that do not appear in the title, description, or other auto-indexed frontmatter.

**Why `aliases` exists:** `find_docs` indexes title/headings/description/purpose/`aliases`/relevantTasks/basename but **does NOT index body prose**. A concept expressed only in the body — invisible to `find_docs` — needs an `aliases:` entry as the backstop for discoverability.

**When to add:** reactively only. Add an alias when a real query term diverges from auto-derived content and the concept matters for cross-domain discovery. Do not pre-populate speculatively.

**Domain ownership:** domain owners author their domains' alias seeds (Ada: token domain; Lina: component domain; Leonardo: layout/system domain). Civitas executes the seeding across files.

**Planes stay decoupled:** adding or changing `aliases:` never affects a doc's `id`. The discovery plane (`aliases`, `find_docs` matching) and the addressing plane (`id`, `docid#sectionid`) evolve independently.

**Cross-reference:** for the per-domain rubric on when a query result's `matchConfidence` is `strong` vs `partial` vs `none`, see `.kiro/specs/121-claude-code-portability/discovery-confidence-rubric.md` (Thurgood's docs domain rubric). Do not duplicate that rubric here.

**`aliases:` frontmatter schema:** the author-facing field schema (format, validator impact, when to add) lives in [Process File Organization](process-file-organization) § "Optional: `aliases:` frontmatter field (steering docs)". This doc documents the *seeding guidance and plane semantics*; PFO documents the *field format*. Together they cover the full `aliases:` surface.

---

## Enforcement Mechanisms

The conventions above are enforced at two layers:

1. **Build-time** (`npm run check:id-uniqueness`): catches id collisions across both roots before merging. This is the CI backstop.
2. **Day-to-day** (Thurgood metadata-validation hook, `scripts/validate-steering-metadata.js`): runs on doc create/modify, the front-line check before the build step.

For the `aliases:` field schema details and its relationship to the steering doc metadata validator, see [Process File Organization](process-file-organization) § "Optional: `aliases:` frontmatter field (steering docs)".
