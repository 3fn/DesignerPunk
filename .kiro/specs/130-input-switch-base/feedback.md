# Spec Feedback: Input-Switch-Base (the on/off switch, gap G1)

**Spec**: 130-input-switch-base
**Created**: 2026-10-17

---

## Design Outline Feedback

### Context for Reviewers
- **Scope of this round**: the outline only. No code, no scaffolding, no token created, no edit to the settings pattern, family docs, Input-Checkbox-Base or `canonical/**` rides this unit → design-outline.md § "Status" (header)
- **Lina's inbound is input, not a spec artifact.** Review the outline; the inbound is cited by section and is not itself under review → `inbound-from-lina.md` § header "Status"
- **Settled, not reopened**: a system switch, not a product one-off; interim = Input-Checkbox-Base + helper text (Peter, 2026-10-13, fork 1 (i)) → design-outline.md § "2. Settled decisions"
- **Settled, not reopened**: Form-Inputs family; size medium; Ada token co-owner → design-outline.md § "2. Settled decisions"
- **Settled by register law**: no disabled state, no "saving" lock → design-outline.md § "2. Settled decisions", § "4.2 What the switch must NOT inherit from Input-Checkbox-Base"
- **Settled by the author, open to R1**: name `Input-Switch-Base`; sibling primitive, not a variant → design-outline.md § "3. Name and inheritance"
- **Token candidates are proposals only**: each needs Ada's design and Peter's review before creation. Ada's read is folded and quoted: **C5 (on fill) and C6 (off outline) are NEEDED, measured** with the repo's `contrastRatio()`; C4 (off fill) is optional (fork P-10); C1–C3 sizing (fork P-11). The outline makes no 3:1 claim for the focus ring (a system defect) → design-outline.md § "6.1 EXISTING", § "6.2 CANDIDATE"
- **Corrections to the record** (ten, none silent; C-8 adjudicated by Ada, a Core Goals ballot owed) → design-outline.md § "9. Corrections to the record (none silent)"
- **Forks for Peter** (P-1–P-13; P-1–P-7 are Lina's F1–F7, P-6 rewritten on Ada's measurements; P-10–P-13 from Ada's read; P-9 and P-13 are the class-level options) — reviewers give reads, Peter rules → design-outline.md § "11. Open forks for Peter"
- **Your seat's questions**: Lina (§ 3, P-7, § 7.1, P-9) · Ada (a read on her own fold-in: § 6, C-8–C-10, P-6, P-10–P-13) · Leonardo (§ 4, § 7.2, P-2) · Kenya (P-1, P-2) · Data (P-1) · Sparky (§ 5.1, P-3, § 7.3) · Stacy (§ 10, optional this round) → design-outline.md § "12. Reviewers"

---

## Requirements Feedback

### Context for Reviewers
- [Populated by spec author before requesting review]

---

## Design Feedback

### Context for Reviewers
- [Populated by spec author before requesting review]

---

## Tasks Feedback

### Context for Reviewers
- [Populated by spec author before requesting review]
