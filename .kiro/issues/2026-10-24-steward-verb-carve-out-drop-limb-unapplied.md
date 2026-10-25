# The steward-verb carve-out's drop limb fired at the third claims pass and was never applied

**Date**: 2026-10-24
**Status**: ACTIVE — owed. Both charters still carry the carve-out as live.
**Owners**: Thurgood (`canonical/agents/thurgood.md` § "The Q5 Boundary", "The steward-verb carve-out") · Stacy (`canonical/agents/stacy.md` § "The steward-verb carve-out (his side of the seam …)"). **Filed by**: Thurgood, 2026-10-24 (README rule 10: a record filed for another owner names its filer; rule 9 governs every later edit).
**Trigger**: `release:next:phase-1` — the release walk reads it: the drop applied by a Peter-merged charter edit, or a dated ruling that the limb did not fire. *Start condition (prose)*: both owners agree how the limb reads (§ 2), and the edit kind is settled (§ 3).
**Class**: P2 obligation (record) · defect *(set 2026-10-24, Thurgood, rule 12. The charters state an exclusion as live that its own ratified falsification condition says is dropped. No claim was mis-verified because of it — the carve-out was never invoked — so no reader is misled about a verdict; the record of the boundary is wrong.)*
**Source**:
- The ratified condition: ballot `.kiro/docs/ballots/2026-09-17-spec-127-outline-settle.md` (RATIFIED, Peter, 2026-09-17), carried into both charters: "invoked more than once across the first three claims passes → it narrows further; never encountered across them → **dropped, not carried**."
- Passes 1–2: 127 MIDPOINT and 127 CLOSEOUT. 127 CLOSEOUT (`.kiro/specs/127-completion-claims-integrity/completion/claims-pass.md` L235) counts zero invocations and zero steward-verb-gated claims across the two, and says the exclusion is dropped if the third also encounters none.
- Pass 3: 123 MIDPOINT (`.kiro/specs/123-consumer-distribution/completion/claims-pass-midpoint.md`, 2026-10-02) records no encounter and does not track the limb. Later passes started a new count ("neither limb fires": `claims-pass-release-15.1.0.md` L605, `-16.0.0.md` L385).
- The finding: Stacy's cross-check in `.kiro/specs/131-governance-simplification/evidence/2026-10-24-ballot-audit.md` (row `2026-09-17-spec-127-outline-settle`): "Corrected: the drop limb's event has passed, and its outcome was never applied." **Her caveat, carried**: 123 MIDPOINT's zero rests on silence, not a count.
**Consulted**: none needed — filing only

---

## 1. What is owed

Apply the drop, with a dated pointer to this record and the settle ballot, Peter-merged with both seats consulted. Only the steward-verb exception goes, so every claim's verification decision is Stacy's. **The drop is not a charters-only edit** (amended 2026-10-24 at Stacy's request; her read, `stacy-fixnow-verification.md` § 3(ii)). It reaches:

- **The ratified Q5 cut sentence itself**, in `.kiro/steering/Agent-Directory.md` (an identity doc), Thurgood's "Charter cut" line: "and the verification of claims whose evidence requires the steward toolset". The drop therefore edits a ratified verbatim cut sentence, and the cut's other copies with it: `canonical/agents/thurgood.md` § "The charter cut (ratified verbatim)" and § "The steward-verb carve-out", and `canonical/agents/stacy.md` § "The steward-verb carve-out (his side of the seam, enumerated …)".
- **Operative sets**, Stacy re-confirming as C1: `canonical/operative-sets/agent-directory.yaml`, `stacy.yaml`, `thurgood.yaml`.
- **Consumer profile**: the overlays `canonical/profiles/consumer/always-set/agent-directory.overlay.md`, `stacy.overlay.md`, `thurgood.overlay.md`; `confirmations/stacy.md` and `confirmations/thurgood.md`; the dispositions units in `stacy.dispositions.yaml` and `thurgood.dispositions.yaml` and their signatures (`signatures/stacy.md`, `signatures/thurgood.md`), re-signed by their signers.
- **Generated outputs**: everything under `canonical/_consumer-output/**` and the generated charters and `CLAUDE.md`, regenerated, never hand-edited.
- **To read at application** (they match the grep; whether each restates the carve-out is checked then): `governance/Process-Spec-Planning.md`, `governance/classification-map.md`.

The enumeration is `git grep -l -i 'steward toolset\|steward-verb\|steward MCP verbs' -- canonical .kiro/steering governance` at `e4e61eea2` (29 files), re-run at application, never trusted as a list.

## 2. The reading question (for both owners)

Pass 3's zero is silence, not a count. Two readings:
- (a) the limb fired: no steward-verb-gated claim exists in 123 MIDPOINT's population, so the passes never encountered one across the first three, and the exclusion is dropped;
- (b) the limb is undetermined for pass 3, and a recount of 123 MIDPOINT's population against the three verbs settles it before anything is dropped.

**The recount is owed by Stacy, before the charter edit** (amended 2026-10-24 at her request). She owns the claims-pass record; she counts 123 MIDPOINT's population against the three verbs and records the result here. Her expectation, stated 2026-10-24: reading (a) — a grep of that pass finds no `rebuild_index`, `validate_metadata` or `list_cross_references` claim, and 127 CLOSEOUT already ruled the nearest case (the `rebuild_index` obligation) not steward-verb-gated. The reading is ruled here, dated, before § 1's edit is drafted.

## 2a. The recount — Stacy, 2026-10-25

**Recount (Stacy, 2026-10-25), § 2 reading ruled: (a).** Population: 123 MIDPOINT, Tasks 1–18 (U1 #215, U2a #222, U2b #262). Grep of every `completion/task-{1..18}*.md` for `rebuild_index|validate_metadata|list_cross_references|steward MCP|steward-verb|steward toolset`: **0 claims whose evidence requires running a steward verb.** Six near-cases, each answerable from git, source or a manifest, none a steward-verb-gated claim: Tasks 4/4-1/4-3/4-4 (the verb as a *subject* — approval lists, `readOnlyHint`; answered from the manifest and tests); 1-4, 10, 10-3 (`rebuild_index` as a tool name in a key-collision note); 12/12-3 ("`rebuild_index` not owed", answered by `git diff --name-only`); 17/17-3/18 ("docs `rebuild_index` owed after U2b", an obligation assigned to the orchestrator or Thurgood, not a verified claim); 15-4/15-5 (the carve-out unit's own dispositions); 7-3 (an approvals note). The grep reads the pass's population documents, not the pass's sample; the zero is a count of documents, not silence. The limb fired at the third claims pass: the exclusion is dropped, not carried. **The drop edit is LAW (this record § 3) and goes to Peter; I re-confirm as C1 at application.**

## 3. The kind question

The settle ballot pre-declares the outcome ("dropped, not carried"), which reads as PRE-DECLARED EXECUTION. But `.kiro/docs/ballots/README.md` § "three kinds" says "an edit to a seat's write scope or role is always LAW." The carve-out is part of both seats' roles, and the drop edits the ratified Q5 cut sentence in an identity doc (§ 1), which makes it Peter's. **When in doubt, LAW**: the steward's read is that the charter edit goes as a one-item ballot, or as an item in the next ballot that edits these charters, and Peter rules it.

## Closing

Closes when the charter edit merges (or Peter rules the limb did not fire), by rule 5's dated outcome line.
