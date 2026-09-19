# Fixture spec: materiality-strike-through-supersession

**Case**: `materiality-strike-through-supersession`
**Class**: materiality
**Expected exit**: RED (non-zero)
**Author**: Stacy — Spec 127, Task 2.1 (Req 6.5; design C7/DD4)
**Date**: 2026-09-19

---

## Falsification intent

A legacy `tasks.md` — authored long before ratification, no mode declaration, legitimately outside the rule. A later commit strikes through parent 3 and annotates it as superseded. The 118 pattern; it stays legal, and it **removes a promise.**

That is exactly what Req 2.3.2 calls material: *"Strike-through supersession of a parent IS material — it removes a promise."* And a material amendment is a **second opt-in path**: the amending commit SHALL add the criteria-mode declaration in the same change. This commit does not, so it is non-compliant.

The falsification targets are two, and they are opposite. The first is the checker that computes materiality from a **diff of raw lines** — it will fire, but it fires on everything, including the tick-only control, so it proves nothing and will be turned off within a month. The second, the real one, is the extractor that looks for *additions and deletions of promises* and misses a **strike-through**, because the parent line is still there: `- [ ] ~~3. Android implementation~~`. Nothing was deleted; four tildes were added. Only an extractor that captures every top-level checkbox line **and compares the normalized text** sees this, and only because the tildes are visible glyphs that rule (iv) refuses to normalize away.

This is B4's side door in its actual historical shape: the path by which a spec quietly shrinks what it promised, after the promise was made, without ever touching the criteria it kept.

## tasks.base.md

```markdown
# Implementation Plan: 118 — Module Resolution Contract

**Date**: 2026-05-14
**Spec**: 118 — Module Resolution Contract
**Author**: Ada

## Tasks

- [x] 1. Define the runtime-TS loading contract

  **Type**: Implementation
  **Agent**: Ada

  **Success Criteria:**
  - Consumer `.ts` imports resolve from the compiled output
  - The package exports map covers every published entry point

- [x] 2. Ship the web consumer path

  **Type**: Implementation
  **Agent**: Sparky

  **Success Criteria:**
  - The web consumer smoke test passes against the published tarball

- [ ] 3. Ship the Android consumer path

  **Type**: Implementation
  **Agent**: Data

  **Success Criteria:**
  - The Android consumer smoke test passes against the published artifact
  - Kotlin token constants resolve without a build step
```

## tasks.head.md

```markdown
# Implementation Plan: 118 — Module Resolution Contract

**Date**: 2026-12-18
**Spec**: 118 — Module Resolution Contract
**Author**: Ada

## Tasks

- [x] 1. Define the runtime-TS loading contract

  **Type**: Implementation
  **Agent**: Ada

  **Success Criteria:**
  - Consumer `.ts` imports resolve from the compiled output
  - The package exports map covers every published entry point

- [x] 2. Ship the web consumer path

  **Type**: Implementation
  **Agent**: Sparky

  **Success Criteria:**
  - The web consumer smoke test passes against the published tarball

- [ ] ~~3. Ship the Android consumer path~~ (superseded — moved to Spec 151)

  **Type**: Implementation
  **Agent**: Data

  **Success Criteria:**
  - The Android consumer smoke test passes against the published artifact
  - Kotlin token constants resolve without a build step
```

## completion-doc fragment

**None.** The defect is in `tasks.md` and fires on the PR that touches it.

## Required verdict

- **Verdict**: `MATERIAL_AMENDMENT_WITHOUT_DECLARATION` on the file, carrying the catalog message **verbatim**:

  ```
  material amendment without criteria-mode declaration (canonical-form diff attached)
  ```

- **Attached diff**: the canonical-form difference — the normalized, checkbox-masked promise surface differs at the parent-3 checkbox segment (`[·] 3. Ship the Android consumer path` → `[·] ~~3. Ship the Android consumer path~~ (superseded — moved to Spec 151)`).
- **Exit semantics**: RED — non-zero exit.
- **Must NOT be produced**: `PASS` / immaterial. A build that misses this has an extraction set that does not capture top-level checkbox **text** (only state), and the corpus's most common legal way to withdraw a promise is invisible to it.

## Encoding notes

- Encode as `{ tasks.base.md, tasks.head.md, expected.json }` — no completion doc.
- Neither file carries a `**Criteria mode**` line, and the head does not add one. That absence is the second half of the defect; do not "fix" it during encoding.
- The head's `**Date**` line also changes (2026-05-14 → 2026-12-18). That is deliberate: it is outside the promise surface and must not, by itself, contribute materiality. Its presence here means a build that fires on *any* diff cannot distinguish this fixture from `materiality-tick-only-immaterial-control`, and the pair is what proves the extractor is real.
