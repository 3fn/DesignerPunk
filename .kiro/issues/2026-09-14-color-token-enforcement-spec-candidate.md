# Color-Token Enforcement — Spec Candidate (Chartered, Deliberately Not Started)

**Date**: 2026-09-14
**Chartered by**: Peter (wave-3 findings ruling — the one genuinely spec-shaped item split out of the cleanup session)
**Domain**: Lina (component enforcement surfaces) + Ada (token-usage semantics) — formalization Thurgood when scheduled
**Status**: Queued — spec-track candidate; sequencing decided at post-campaign queue review (natural sibling of Spec 127's checker-arming work; may fold into a future enforcement wave rather than stand alone)
**Source**: Wave 3 consults (`wave-3-consult-lina.md` BLOCKING findings; `wave-3-consult-ada.md` C9 verification), the ratified `no-hardcoded-color` register row (surface 1 `dormant`), PR #160

---

## The problem, in one paragraph

`no-hardcoded-color` enforcement exists but is hollow: the armed web check inspects `.web.ts` files while component colors live in external `.css` (and every quoted/attribute/comment form is skipped by design) — it flags **zero real files** across all 34 components. iOS/Android detectors **already exist unwired** (`INLINE_STYLE_PATTERNS.ios/.android`); pointed at the 68 uncovered files they flag 3 today (1 genuine, 2 platform-semantic false positives). Violations are actually *materialized* in surfaces no check reads at all: demo pages (`demos/icon-base-demo.html` raw hex into component attributes; `var(--token, #999)` fallbacks live) and prop-passed color values (undetectable by file scanning in principle). The register row now records this honestly (`dormant`), so nothing asserts false assurance — but the rule the system teaches has no meaningful mechanical backing.

## What the spec must decide (the design questions that make this spec-shaped)

1. **Scope of the guarantee**: which surfaces does `no-hardcoded-color` mechanically bind — component CSS, platform source (iOS/Android), demos, READMEs, prop values (the last likely education-only, stated as such)?
2. **Detection design**: re-point web detection at the `.css` where styles live; wire the existing iOS/Android detectors; false-positive policy for platform-semantic colors (`.systemGray6` etc. — allowlist? pattern class?); `oklch()`/named-color coverage (currently undetected in every form).
3. **Arming path**: proposed → gate-bite proof → Peter flip, per the section-citations precedent; arming is a campaign boundary event if any measurement window is open — sequence against campaign close like Spec 127's Q2.
4. **Relationship to the dormant row**: the row's falsification clause already defines when `dormant` reverts to `armed` — the spec's deliverables should trip it legitimately.
5. **The phantom-gate build-vs-never decisions deferred from the cleanup session**: `lint:stemma*` (O-9) and CI-wiring the theme-drift audit (O-10) — adopt into this spec's scope or formally decline each, so the corrected docs stay true.

## Why chartered-not-started

New enforcement capability, not a regression — the campaign deliberately committed C9 classify-only, and the register tells the truth meanwhile. Queue behind: 125-B campaign close, Spec 127 formalization, the contrast spec sequencing decision. Revisit trigger: post-campaign queue review, or any new consumer-reaching hardcoded-color escape (which would raise this from candidate to chartered-with-priority).
