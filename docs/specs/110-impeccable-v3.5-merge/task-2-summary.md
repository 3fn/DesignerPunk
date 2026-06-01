# Task 2 Summary: Adopt Detector Scripts

**Date**: 2026-06-01
**Spec**: 110 - Impeccable v3.5.0 Merge
**Type**: Parent (Setup + Implementation)

---

## What Was Done

Adopted the Impeccable v3.5.0 anti-pattern detector engine as an upstream-owned subtree (~27 files). Verified it runs independently without PRODUCT.md. Created an exclusion mechanism for rules that conflict with intentional DesignerPunk patterns. Integrated detector invocation into the audit command reference as an optional enhancement.

## Why It Matters

Leonardo's audit command now has objective, evidence-based anti-pattern detection. Instead of relying solely on subjective visual inspection for the Anti-Patterns dimension, the detector provides machine-verifiable findings (em-dash overuse, gradient text, eyebrow patterns, etc.) that strengthen audit evidence.

## Key Changes

- `scripts/detect.mjs` + `scripts/detector/` — full detector engine copied wholesale
- `detector-exclusions.md` — governance for excluding rules that conflict with DesignerPunk patterns
- `reference/audit.md` — "Detector (Optional Enhancement)" section added before Diagnostic Scan
- Detector is enhancement, not requirement (audit without detector is still valid)

## Impact

- ✅ Requirements 3.1–3.5 satisfied
- ✅ No PRODUCT.md dependency (verified by test run)
- ✅ Wholesale replacement strategy documented for future upstream updates

---

*For detailed implementation notes, see [task-2-completion.md](../../.kiro/specs/110-impeccable-v3.5-merge/completion/task-2-completion.md)*
