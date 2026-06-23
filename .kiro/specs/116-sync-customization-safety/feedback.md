# Spec Feedback: Sync Customization Safety

**Spec**: 116-sync-customization-safety
**Created**: 2026-06-13

---

## Design Outline Feedback

### Context for Reviewers

- **Origin**: Production incident on test01 / dp-portfolio (2026-06-12). Full diagnosis and evidence chain → design-outline.md § "Diagnosis (Settled — Evidence-Backed)". The diagnosis is artifact-confirmed (sync-manifest creation in commit `e4e42dc`, source-file deletions in the same commit); treat it as settled, not up for re-derivation.
- **Disposition already set by Peter**: refine the tool — "genuinely useful, dangerous without guardrails." Not kill the reset capability; not build a separate promotion-preservation subsystem → design-outline.md § "Scope".
- **The solution is intentionally open.** The design-outline poses six Open Design Questions rather than proposing a fix. This round is about pressure-testing the diagnosis and shaping those questions — not approving a solution → design-outline.md § "Open Design Questions".
- **Three load-bearing constraints** the spec author wants validated → design-outline.md § "The Core Tension" + "Scope":
  1. Investment weights toward the *validated* update path, not the *speculative* reset.
  2. The load-bearing fix is a guardrail (safe non-TTY apply mode), not guidance.
  3. Scope must cover consumer *additions to package-shipped files* (the promotion case), not just whole consumer-created files.
- **Reviewer focus**:
  - [@SPARKY] — Q1 (safe non-TTY apply shape), Q2 (reset gating/split), Q4 (first-sync reconciliation). Feasibility within `src/cli/sync/`.
  - [@ADA] — Q3 (protecting additions to package source — likely a source/promotion-model question as much as tooling), and whether promotions *should* live in consumer-owned files vs. edited-in-place.
  - [@PETER] — Q2 direction (does recovery require discarding customizations?), Q6 (Integration Guide guidance reversal — ballot measure).

### Requested Reviewers

- **Sparky** — CLI/sync tooling owner and likely implementer.
- **Ada** — token source / promotion model (Q3 especially).
- **Peter** — direction, scope, guidance ballot measure.

### Open Questions (for reviewers)

1. [@SPARKY] For Q1 — should the safe non-TTY behavior be the *default* (non-TTY non-force applies safe changes, skips+reports conflicts) or a distinct flag (`--apply-safe`)? What's the least surprising behavior for a consumer who runs plain `sync` in an agent terminal today and gets a silent dry-run?
2. [@SPARKY] For Q2 — is splitting "update" from "reset" into distinct commands cleaner than flag-gating a single command, given the existing `runSync` force-path structure?
3. [@ADA] For Q3 — is the right answer "promotions should live in a consumer-owned file/layer sync never touches" (architectural) rather than "sync should merge additions into package files" (tooling)? Which fits the token-source model better?
4. [@ADA] For Q3 — does the `tokenSource` model already have, or could it cleanly grow, a notion of "consumer extensions" separate from the mirrored package source?

#### [THURGOOD R1]
- Design outline drafted from the 2026-06-12 investigation. Diagnosis is evidence-backed (commit `e4e42dc` + sync-manifest). Solution deliberately held as open questions per Peter's "think about it more soundly" direction.
- Flagging that Q6 (Integration Guide guidance reversal) is a shared-doc change → ballot measure, Peter's decision. Not actioned here.
- Flagging that the three Governance Lessons (§ "Governance Lessons") may warrant a future Process-Spec-Planning enhancement (user-story-traceability check). That would be a *separate* ballot-measure proposal, not part of this spec.

---

## Requirements Feedback

### Context for Reviewers
- _Not yet started. Requirements drafting begins after design-outline review and Peter's approval to proceed (sequential formalization gate)._

---

## Design Feedback

### Context for Reviewers
- _Not yet started._

---

## Tasks Feedback

### Context for Reviewers
- _Not yet started._
