/**
 * The generation-integrity inventory (R1 AC1).
 *
 * Every artifact a fresh `generate` produces, materialized as ArtifactRef[].
 *
 * Blend utilities are intentionally EXCLUDED. Design R1 enumerated dist/BlendUtilities.*
 * (from the Rosetta-architecture doc), but the Task 1.2 audit found `generate` produces
 * no such artifact at any extension (the real paths are *.ts/.swift/.kt per
 * TokenFileGenerator, and even those are absent — the blend-write path is not exercised).
 * Tracked as deferred finding 117-N1 (out of scope: Spec 117 is token-index integrity,
 * not blend-generator wiring). See .kiro/issues/issues-registry.md.
 *
 * Theme-aware output is embedded within the DesignTokens.* files (the theme
 * blocks), so it is covered by those entries rather than a separate artifact.
 *
 * Product tokens are `optional: true` — present only when a product configures
 * `productTokens` (Integration Guide); their absence on both sides is not a divergence.
 */

import { ArtifactRef } from './types';

export const INVENTORY: ArtifactRef[] = [
  // Token-index (Application MCP source of truth) — no volatile header; pure semantic compare.
  { path: 'token-index/primitives.yaml', kind: 'yaml', optional: false },
  { path: 'token-index/semantics.yaml', kind: 'yaml', optional: false },
  { path: 'token-index/components.yaml', kind: 'yaml', optional: false },

  // Platform design-token outputs.
  { path: 'dist/DesignTokens.web.css', kind: 'css', optional: false },
  { path: 'dist/DesignTokens.ios.swift', kind: 'swift', optional: false },
  { path: 'dist/DesignTokens.android.kt', kind: 'kotlin', optional: false },
  { path: 'dist/DesignTokens.dtcg.json', kind: 'json', optional: false },
  { path: 'dist/DesignTokens.figma.json', kind: 'json', optional: false },

  // Component-token outputs (the R4-central tier).
  { path: 'dist/ComponentTokens.web.css', kind: 'css', optional: false },
  { path: 'dist/ComponentTokens.ios.swift', kind: 'swift', optional: false },
  { path: 'dist/ComponentTokens.android.kt', kind: 'kotlin', optional: false },

  // Blend utilities omitted — see header note (deferred finding 117-N1).

  // Product tokens — only when configured.
  { path: 'dist/product/ProductTokens.web.css', kind: 'css', optional: true },
  { path: 'dist/product/ProductTokens.ios.swift', kind: 'swift', optional: true },
  { path: 'dist/product/ProductTokens.android.kt', kind: 'kotlin', optional: true },
];
