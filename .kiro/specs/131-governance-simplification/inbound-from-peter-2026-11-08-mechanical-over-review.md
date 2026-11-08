# Inbound from Peter: more mechanical mechanisms, less review

**Date**: 2026-11-08
**Author**: Thurgood (Spec 131's formalizer), recording Peter's idea at his direction. The idea is Peter's; the assessment in § 2 is the orchestrator's; § 4 is mine.
**Peter's words**, recorded with `date -u` at receipt (orchestrator relay; **UNVERIFIED** beyond the relay), verbatim:
- **2026-11-08T18:56:04Z**, on 125-B's U3 and Spec 131: "Re: Bucket 4, I'm fine with them not being part of 131; but I feel the subject matters are compatible: I've been thinking that one of the ways we can reduce governance and maintain alignment is moving to more mechanical mechanisms and less review — maybe even translating some documentation and ballots to CI or similar. Honest thoughts?"
- **2026-11-08T19:02:15Z**, answering the orchestrator's question (its wording, as relayed: "shall Thurgood record your 'mechanical over review' idea as an inbound to Spec 131?"): "Yes, please".

"Bucket 4" is the orchestrator's grouping, as relayed: 125-B's U3 (CODEOWNERS and PR-approval-as-ratification). It is not a term in any file I can read.
**Status of 131**: design outline merged, paused at the edge of requirements. Its park re-asks at `path:.kiro/specs/132-*/completion/first-family-measured-cost.md`. This inbound may wait a long time.
**Consulted**: none needed — this file records Peter's idea and the orchestrator's assessment as he received it, and rules nothing. The seats whose surfaces a mechanization would touch are consulted when 131's requirements round takes it up.
**Record**: none filed under README rule 10. See § 5.

This is **a consideration, not direction** (Peter's standing rule for inbounds, 2026-11-04T13:23:25Z, as `inbound-governance-cost-ledger.md` § 1 quotes it). It settles no scope. 131's outline round, or its requirements round, does that.

---

## 1. The idea

Reduce governance, and keep alignment, by moving from review to mechanical mechanisms: a rule that a person or a seat reads for today becomes a check that runs. Peter names documentation and ballots as candidates for translation "to CI or similar".

## 2. The orchestrator's assessment, as given to Peter (input, not a decision)

- **The direction is right.** In this session's work, the cracks were all prose-and-review rules, and every catch was mechanical. (Orchestrator's reading; the instances it has in mind are of the kind in ledger L-10 and L-11, a held condition in a PR body that no instrument reads. I have not re-counted "all" and "every" beyond those two entries.)
- **It fits Peter's aim** of agent self-governance on non-model oracles (`synthesis-2026-10-23.md` quotes the aim), and **125-B's reframe** that CI validates functional and operational requirements and never ideology (`.kiro/specs/125-B-classification-map/requirements.md` L12; `governance/classification-map.md`, "Governing methodology").
- **125-B's classification map is the ready inventory.** Each register row already records, per rule, whether a check enforces it and who owns the call. At `origin/main` `7a5eb9168` (VERIFIED, `grep -o 'check_state: [a-z-]*' governance/classification-map.md | sort | uniq -c`): 33 `armed`, 17 `proposed`, 21 `none`, 1 `dormant`. The `proposed` and `none` rows are where a mechanization would start.
- **A possible organising principle for 131**: every rule becomes a check, or stays as teaching with sampled audit.

**Its four caveats:**
1. **Only what is decidable can become CI.** Truth and honesty stay judgment. (The Q5 framing sentence says the same of one instrument: a green `completion-criteria-parity` read as evidence of claim honesty is the error Spec 127 exists to prevent.)
2. **A check is law written in code**, so changing it needs scrutiny equal to changing the prose it replaced.
3. **False positives erode trust**, so measure the false-fire rate before a check blocks. (The advisory-then-promote pattern, as `merge-hold`'s promotion read uses, is one form of this.)
4. **Don't mechanize rules that are still settling.** A check freezes a rule's current wording.

## 3. U3 stays out of 131

U3, CODEOWNERS and approval-as-ratification, is compatible with this idea but stays out of 131, per Peter ("I'm fine with them not being part of 131"). U3 is the human-signature half: it makes Peter's approval a platform fact. Mechanization is the other half: it makes a rule a check that needs no signature. U3's re-home is its own record, outside this spec.

## 4. What 131 already holds that this meets (Thurgood, pointers only)

- **§ 5 already leans this way**: "executable over declarative; derivation over attestation" (`design-outline.md` § 5, `[PETER R0]` 5), and "Learn, then act or preserve", where *preserve* includes "a check". This inbound makes that lean an organising principle, not a new one.
- **A fork the requirements round should surface, not absorb.** "Less review" meets § 5's "Trust, but verify" (RULED, F-2), whose words are review-shaped: "If an agent is assigned a task, they should consider 'who's the right teammate to review this?'". The two can compose (a check where the rule is decidable; a teammate's read where it is not, which is caveat 1), but how far "less review" reaches into F-2 is Peter's to say.
- **Ballots "to CI or similar"**: `law-ratified` (2026-11-07) already reads a ballot's `**Status**:` line at the PR head. It mechanizes that a ratification record exists, not what the ballot decides. That boundary is caveat 1 in practice.

## 5. Rule 10: is a root record owed?

**No.** README rule 10 owes a record to "a ruling or a claims pass that creates an obligation". Peter's "Yes, please" creates this file and its intake line, and nothing else. No ledger entry is added: the ledger admits instances with a measured cost and a nameable cause and refuses opinion (`inbound-governance-cost-ledger.md` § 1), and this is a direction, not an instance.

## 6. What 131 is asked to weigh

Take the idea into a requirement or a design principle, or rule it out with a reason. **Forks that are 131's or Peter's**: whether "every rule becomes a check, or stays as teaching with sampled audit" is the organising principle; how far "less review" reaches into "Trust, but verify"; which ballots, if any, a check could replace rather than record.
