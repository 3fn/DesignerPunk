# Inbound: Record-First Ratification Protocol → Spec 125

**Date**: 2026-07-05
**Source**: Peter's ruling on the first ballots-directory measure (see `.kiro/docs/ballots/README.md` § "The Ratification Protocol"), triggered by an applying agent refusing a relayed ratification claim it could not verify
**Status**: DECIDED (Peter, all three layers, 2026-07-05) — 125 owns layer 2 and the classification-map entry.

---

## 1. The incident is a live specimen of 125's thesis

An agent asked to apply ratified governance law refused because the authority arrived as a message claim it could not verify. The refusal added friction to a TRUE ratification while providing zero protection against a FALSE one (the relaying session held the same write access and applied the edits itself). Judgment-where-there-should-be-mechanism, in the authority dimension: *claims are suggestions; records are contracts.* This is §1's barrier-vs-suggestion axis applied to authority itself.

## 2. Layer 2 — PR-approval-as-ratification (Phase 0/2 work)

Once Phase 0's PR gate exists: **ratification of governance-law changes = Peter's PR approval**, enforced mechanically — branch protection + code-owner review (CODEOWNERS on `governance/` → Peter). This is a concrete Phase 2 diff-gate candidate ("fail if a diff touches governance/ without Peter's review approval"), and it mechanizes the same rule the token-approval diff-gate (§4 Phase 2) mechanizes for tokens. Platform-verified authority supersedes the manual record-first step for gated surfaces; the committed-record protocol (layer 1, in force now per the ballots README) remains for artifacts outside the gate.

## 3. Classification-map entry (the §5 spine)

Add the rule to the map explicitly so ownership is unambiguous: **"governance-law changes require Peter's ratification"** → *barrier* (PR approval gate, layer 2) for gated surfaces; *record-check* (committed ballot status, layer 1) for ungated artifacts; the prose *why* stays in the ballots README / generated prompts (122 owns propagation — coordinate wording so the two specs don't double-own or orphan the rule, §5's named duplication/gap failure modes).
