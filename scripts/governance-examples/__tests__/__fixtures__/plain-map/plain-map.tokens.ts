/**
 * Twin-agreement fixture (ballot 2026-10-26-governance-examples-guard § 2.2, L-2): a token-file
 * name holding a plain map of token-name strings, the shape Component-Development-Guide
 * § "Component Token Files" taught at adoption. No `defineComponentTokens` call, so the loader
 * harvests zero from it and the syntax predicate fails it. Never imported by product code.
 */
export const buttonCTATokens = {
  paddingX: 'space.inset.100',
  background: 'color.action.primary',
  borderRadius: 'radius100',
};
