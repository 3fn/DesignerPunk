# Spec Feedback: 126 — Avatar Req 5.4 warn vs `decorative` prop

**Spec**: 126-avatar-decorative-warn
**Created**: 2026-07-09

---

## Design Outline Feedback

### Context for Reviewers
- Origin: Lina's PR #39 domain review confirmed defect (a) and routed it to this round → design-outline.md § 1
- Lina's seed recommendation (O1) is the owner's starting position, explicitly NOT to be rubber-stamped → design-outline.md § 4
- Divergence (b) (type scope vs ratified Req 5.4 text) was found while grounding the outline; the round decides whether it rides along (O2) or spins out → design-outline.md § 1/§ 4
- The ratified Spec 042 requirements are the constraint set; this round settles edge semantics, it does not re-open requirements → design-outline.md § 2
- Fix is web-scoped (no iOS/Android warn exists); parity is named out-of-scope pending Lina → design-outline.md § 3/§ 6
- Cleanup dependency: the interim spy removal assumes PR #39 merges first → design-outline.md § 5

**Reviewers**: Lina (component owner — substance), Thurgood (spec standards + a11y-contract coverage check). Peter decides.

**Directed questions**:
- [@LINA] O1 vs O2 — do you want the type-scope divergence (b) fixed in the same change, or spun out? → design-outline.md § 4 -- [SESSION R1]
- [@LINA] Should the warning message gain the "or set decorative" pointer (§ 5 item 1)? → design-outline.md § 5 -- [SESSION R1]
- [@THURGOOD] Does the Avatar behavioral contract / a11y test-coverage standard reference "alt required with src" anywhere that needs the settled edge semantics reflected? → design-outline.md § 5 item 3 -- [SESSION R1]
- [@THURGOOD] Is a lightweight single-round process (this doc) adequate for this scope class, per spec-planning standards? → whole outline -- [SESSION R1]

[Agent feedback rounds below]
