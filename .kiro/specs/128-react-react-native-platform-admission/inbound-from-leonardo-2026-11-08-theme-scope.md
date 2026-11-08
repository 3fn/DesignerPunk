# Inbound from Leonardo — theme scope: page-wide on web today, by tree on native and React Native (2026-11-08) — Spec 128

**Date**: 2026-11-08
**Source**: `.kiro/issues/2026-11-08-q3b-web-data-theme-selector-scope.md` (the Q3b record, cited, not restated; owner Ada, ACTIVE, trigger `manual`); this spec's `inbound-from-react-rn-sitting-2026-10-02.md` § 6 ("Token idiom", L94). Peter's words, in chat, relayed by the orchestrator (the orchestrator's relay, not verified against a transcript): 2026-11-08T04:01:15Z, *"Yes, go ahead with the three inbounds"*. Standing rule for inbounds: Peter, 2026-11-04T13:23:25Z, *"We can use the inbounds as considerations for our approach rather than direction. They might inform our thinking and direction, but they were developed without the context of where we are now."* (as quoted in `inbound-from-leonardo-2026-11-04-configure-intake.md`, same relay caveat).
**Status**: **A consideration, not direction** (Peter, 2026-11-04T13:23:25Z, above). Nothing here is ruled.
**Consulted**: none needed — capture of an existing record.

---

## 1. The gap

None of 128's current inbounds addresses theme scope. The nearest line is the token idiom in `inbound-from-react-rn-sitting-2026-10-02.md` § 6: RN gets a theme Provider plus `useTheme()`; React web gets CSS custom properties under `data-theme`. Neither says how far a theme reaches.

## 2. What is true today

- **Web**: a registered theme emits `:root[data-theme="<name>"]`, so it covers the page only. The same attribute on any other element themes nothing (Sparky's browser check, Chrome 149, in the Q3b record).
- **Native and React Native scope by tree**: iOS through `@Environment(\.dpTheme)`, Android through `LocalDPTheme`, React Native through a Provider plus `useTheme()` (the sitting inbound's own wording). Subtree theming is natural there.

## 3. Why 128 meets it

The React (web) package, per the sitting inbound, uses CSS custom properties under `data-theme`, so it inherits the page-wide form. React Native scopes by tree. The two React verticals would then differ on whether a themed card, preview pane or embedded widget is possible, and an adopter with an existing React/RN design system (story 3, `inbound-from-peter-user-stories-2026-10-21.md`) may expect scoped themes on both.

## 4. Where the fork lives

Whether a web subtree can be themed is **Peter's open fork** (page-wide only, subtree, or opt-in), recorded in the Q3b record, owner Ada. It fires on Leonardo's reading of the first screen spec that needs a theme on less than the whole page. Today (i), page-wide, ships. No consumer need is known (this repository has no `product/`; test01 is page-wide). 128 should treat the web answer as open and not design React web theming as if page-wide were settled, nor as if subtree were.

## 5. Questions for 128's rounds

1. Does React web theming assume the generated `:root[data-theme]` block, or provide its own scoping (for instance a Provider that sets the attribute on a wrapper), and would that pre-empt Peter's fork?
2. Should the React and React Native theme APIs present one shape (Provider plus hook) even if the web implementation underneath is page-wide?
3. If Peter picks (ii) or (iii) later, what does 128's React web vertical need to have left room for?

*Surviving counter-argument*: with no known need, 128 gains nothing by designing around a fork that may stay (i); the Q3b record already says it stays (i) if no trigger comes by the 129 follow-up close.

## 6. Record pointer

The Q3b record could gain a one-line pointer to this inbound ("128 meets the same scope question for React web and React Native; see `.kiro/specs/128-react-react-native-platform-admission/inbound-from-leonardo-2026-11-08-theme-scope.md`"). Its owner is Ada; I have not edited it. Ada's call.
