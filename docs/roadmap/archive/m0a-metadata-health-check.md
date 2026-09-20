# M0a Metadata Health Check

**Date**: 2026-04-05
**Participants**: Thurgood (system standards), Leonardo (consumer confidence — via R1/R2 feedback)
**Scope**: Navigation family metadata, Container family contexts, gap analysis against M0a screen list
**Status**: Complete

---

## 1. Navigation Family Metadata

### Nav-Header-App vs Nav-Header-Page Selection

**Leo's concern**: Which component for a marketing site's root-level header?

**Finding**: Metadata guides correctly. Nav-Header-App's `whenToUse` explicitly includes "Web site headers with logo, navigation, and profile actions." Nav-Header-Page's `whenNotToUse` explicitly says "Root destination screens without back navigation — use Nav-Header-App." No ambiguity.

**Scaffold status is intentional, not a blocker.** Nav-Header-App is designed as a permissive scaffold — raw slots for product-defined content. Each product's header is unique (M0a marketing header ≠ M0b app header). The value is in what it inherits from Nav-Header-Base (safe area, landmark semantics, three-region layout, background, separator), not in opinionated props. Scaffold status means it hasn't been through full production readiness (tests, platform review), but the inherited infrastructure works. For a static marketing site header, this is sufficient.

**Action**: None. Scaffold status is correct for this component's design intent.

### Nav-Header-Base Metadata Bug

**Finding**: `whenToUse` contains wrong content — "Switching between 2–5 mutually exclusive content views" and "Persistent bottom navigation between 3–5 top-level app destinations." This is Nav-SegmentedChoice-Base / Nav-TabBar-Base copy, not Nav-Header-Base content. The `purpose` field is correct ("Structural primitive for top-of-screen navigation bars... Internal only").

**Action**: Lina fixes `whenToUse` in Nav-Header-Base's component-meta.yaml. Low urgency — Nav-Header-Base is internal-only (never selected directly by product agents), so this won't cause a wrong selection. But it should be corrected for accuracy.

---

## 2. Container Family Metadata

**Leo's concern**: Are containers tagged for content-heavy marketing layouts?

**Finding**: Metadata is accurate for what it covers.

- **Container-Base**: contexts `dashboards`, `settings-screens`, `forms`. `whenToUse` includes "Page section" and "Generic content wrapper." Appropriate for marketing page sections (hero areas, feature sections, content blocks).
- **Container-Card-Base**: contexts `dashboards`, `content-feeds`, `product-cards`, `profile-sections`, `settings-screens`. `whenToUse` includes "Elevated content sections that need visual separation." Appropriate for feature cards, "Under the code" cards from the design exploration.

**Gap noted**: No `marketing-pages` or `landing-pages` context exists in the controlled vocabulary. This isn't wrong metadata — it's a vocabulary gap. Marketing sites are a new use case that the Spec 083 design exercises didn't cover. Not blocking for M0a (Leo can find containers via `purpose` search), but worth adding to the vocabulary if marketing sites become a recurring pattern.

**Action**: None blocking. Optional vocabulary enrichment after M0a if the pattern recurs.

---

## 3. Gap Analysis Against M0a Screens

### Screen-by-Screen Assessment

| Screen | Components Available | Gaps |
|--------|---------------------|------|
| **Home/Landing** | Container-Base (sections), Container-Card-Base (feature cards), Button-CTA (CTAs), Icon-Base, Badge-Label-Base (status tags) | Hero section — product-level composition, not a component gap |
| **About/Philosophy** | Container-Base, Container-Card-Base, Icon-Base | Typography + containers — covered |
| **Component Showcase** | All 34 web components as embedded content | Components ARE the content — unique meta-page |
| **Getting Started** | Container-Base, Icon-Base | Code block styling is CSS, not a component concern |
| **Contact/Community** | Input-Text-Base, Input-Text-Email, Button-CTA | Covered by `simple-form` experience pattern |
| **Site Header (all pages)** | Nav-Header-App (scaffold, intentional) | Product-defined content in raw slots — working as designed |
| **Site Footer (all pages)** | Container-Base + Icon-Base + Button-Icon | Product-level composition — no footer component needed |

### Component Gaps

**No missing components for M0a.** The gaps Leo identified (hero sections, footer navigation, feature grids) are product-level compositions built from existing components, not missing design system components. This is the correct boundary — the design system provides the building blocks, the product composes them.

### Experience Pattern Coverage

- **Contact/Community form**: `simple-form` pattern applies directly
- **Other pages**: No experience pattern needed — they're content pages, not interactive flows

---

## Summary

| Finding | Severity | Action | Owner |
|---------|----------|--------|-------|
| Nav-Header-Base `whenToUse` has wrong content | Low | Fix component-meta.yaml | Lina |
| Nav-Header-App scaffold status | ✅ None | Intentional — permissive scaffold by design | — |
| Container metadata accurate | ✅ None | No issues found | — |
| No missing components for M0a | ✅ None | Gaps are product compositions, not component gaps | — |
| No `marketing-pages` context in vocabulary | Low | Optional enrichment after M0a | Lina |

**Conclusion**: Leo can select components for M0a with confidence. The metadata guides correctly, the component catalog covers the marketing site's needs, and the one metadata bug (Nav-Header-Base `whenToUse`) is on an internal-only component that won't cause selection errors.
