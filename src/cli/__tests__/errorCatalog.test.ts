/**
 * @category evergreen
 * @purpose Task 1.6 string-conformance test — every catalog string this parent
 * emits is string-EQUAL to its design row. Transcribed verbatim from
 * .kiro/specs/123-consumer-distribution/design.md § "Error Handling — the
 * loud-failure catalog (exact strings)". Covers the born, partial ×4,
 * package-mode and TOKEN_INDEX_DIR rows (six rows total — the count is asserted).
 */
import {
  partialCaseMessage,
  partialConfigNoTierMessage,
  partialUnusedLocalTierMessage,
  partialTierNoConfigMessage,
  partialManifestOnlyMessage,
  packageModeIndexAbsentMessage,
  bornIndexAbsentMessage,
  explicitTokenIndexMissingMessage,
  initBornRepoMessage,
  restartLineSequencedMessage,
  cloneHatchMessage,
  personalNoteNamingMessage,
  jestConfigCollisionMessage,
  attachUnbornRepoMessage,
  restartLineNowMessage,
  managedRegionEditedInsideMessage,
  existingMcpEntryMessage,
  componentTokenFamilyMismatchMessage,
  componentTokenFileLoadFailedMessage,
} from '../shared/errorCatalog';

// Verbatim transcriptions from design.md's catalog table — the comparands.
const DESIGN_ROWS = {
  'partial: config-no-tier': (root: string, tokenSource: string) =>
    `found designerpunk.config.ts at ${root} but no DesignerPunk token tier at ${tokenSource} — this repo looks partly initialized. Refusing rather than guessing. Inspect it, or complete it deliberately: npx designerpunk init --re-scaffold`,
  'package-mode posture, index absent or empty': () =>
    `this repo runs in package mode (designerpunk.config.ts has no tokenSource), so its token index is DesignerPunk's tokens — run 'npx designerpunk generate' to build it. To make a design system of your own: npx designerpunk init --re-scaffold`,
  'partial: unused-local-tier': (root: string) =>
    `found a token tier at ${root}/src/tokens but your config omits tokenSource, so generate would use DesignerPunk's tokens, not yours. Add tokenSource: './src/tokens' to designerpunk.config.ts. (Refusing to generate until then.)`,
  'partial: tier-no-config': (root: string) =>
    `found a DesignerPunk token tier at ${root}/src/tokens but no designerpunk.config.ts — refusing to generate or serve DesignerPunk's reference index as yours. Restore the config, or run: npx designerpunk init --re-scaffold`,
  'partial: manifest-only': (root: string) =>
    `found designerpunk.manifest.json at ${root} but no config or token tier — the design system files are missing. Restore them from version control, or run: npx designerpunk init --re-scaffold`,
  'born, token index absent or empty': (root: string) =>
    `no token index in this design system (${root}/token-index is absent or empty) — run 'npx designerpunk generate'`,
  'explicit TOKEN_INDEX_DIR missing': (p: string) =>
    `TOKEN_INDEX_DIR is set to ${p}, which is absent or empty — unset it, or run generate`,
};

describe('errorCatalog — string conformance (Task 1.6)', () => {
  test('exactly seven covered rows (born ·1, partial ×4, package-mode ·1, explicit TOKEN_INDEX_DIR ·1)', () => {
    // BITE (recorded red in the Task 1.6 completion doc): removing a key from
    // DESIGN_ROWS turns this red.
    expect(Object.keys(DESIGN_ROWS).length).toBe(7);
  });

  test('partial: config-no-tier (literal tokenSource)', () => {
    const msg = partialCaseMessage('/root', 'config-no-tier', '/root/src/tokens');
    expect(msg).toBe(DESIGN_ROWS['partial: config-no-tier']('/root', '/root/src/tokens'));
    expect(msg).toBe(partialConfigNoTierMessage('/root', '/root/src/tokens'));
  });

  test('partial: unused-local-tier', () => {
    const msg = partialCaseMessage('/root', 'unused-local-tier', undefined);
    expect(msg).toBe(DESIGN_ROWS['partial: unused-local-tier']('/root'));
    expect(msg).toBe(partialUnusedLocalTierMessage('/root'));
  });

  test('partial: tier-no-config', () => {
    const msg = partialCaseMessage('/root', 'tier-no-config', undefined);
    expect(msg).toBe(DESIGN_ROWS['partial: tier-no-config']('/root'));
    expect(msg).toBe(partialTierNoConfigMessage('/root'));
  });

  test('partial: manifest-only', () => {
    const msg = partialCaseMessage('/root', 'manifest-only', undefined);
    expect(msg).toBe(DESIGN_ROWS['partial: manifest-only']('/root'));
    expect(msg).toBe(partialManifestOnlyMessage('/root'));
  });

  test('package-mode posture, index absent or empty', () => {
    expect(packageModeIndexAbsentMessage()).toBe(DESIGN_ROWS['package-mode posture, index absent or empty']());
  });

  test('born, token index absent or empty', () => {
    expect(bornIndexAbsentMessage('/root')).toBe(DESIGN_ROWS['born, token index absent or empty']('/root'));
  });

  test('explicit TOKEN_INDEX_DIR missing', () => {
    expect(explicitTokenIndexMissingMessage('/explicit/path')).toBe(
      DESIGN_ROWS['explicit TOKEN_INDEX_DIR missing']('/explicit/path')
    );
  });
});

// ---------------------------------------------------------------------------
// Task 2 additions — `init`'s own catalog rows (design.md C1 row 0 / C27 erratum).
// A SEPARATE describe block, additive to Task 1.6's frozen seven-row count above.
// ---------------------------------------------------------------------------

// Transcribed from design.md's catalog; the "init in a born repo" and "personal-note naming" rows are their
// CORRECTED text (Erratum 2026-10-03, R2 — Leonardo L-RC3), which Task 22.2 made string-equal.
const INIT_DESIGN_ROWS = {
  'init in a born repo': (root: string) =>
    `this repo already has a design system (${root}) — init is the birth event and runs once. To join it: npm install → npx designerpunk generate → fill in your personal note (generate creates it; your agent can walk you through it) → restart your agent session (approve DesignerPunk's MCP servers if asked). Using a different agent tool than this repo was set up for? Also run: npx designerpunk attach --target=<cc|kiro> to attach a harness (agents + MCP config + approvals). To deliberately re-scaffold: npx designerpunk init --re-scaffold`,
  'restart line — sequenced': () =>
    `when the steps above are done, restart your agent session — DesignerPunk's MCP servers and your personal note load when a session starts, so this session cannot see them yet (approve the servers if your tool asks)`,
  'clone hatch': () =>
    `want to own the engine too? Clone github.com/3fn/DesignerPunk — init already made the token language yours; the clone adds the engine and the components`,
  'personal-note naming': () =>
    `fill in .designerpunk/personal-note.local.md — who you are, what you and your organization value, and how you like to work together — or, after the restart, ask your agent to walk you through it. Your agents read it every session (it stays on your machine)`,
  'jest.config.js collision (C27 A13)': () =>
    `skipped: jest.config.js (already exists) — the DesignerPunk jest preset is not applied; to test your own forked components with @3fn/core/testing, add ...require('@3fn/core/jest-preset') to your config`,
};

describe('errorCatalog — string conformance (Task 2 additions)', () => {
  test('exactly five covered rows', () => {
    // BITE (recorded red in the Task 2.2 completion doc): removing a key
    // from INIT_DESIGN_ROWS turns this red.
    expect(Object.keys(INIT_DESIGN_ROWS).length).toBe(5);
  });

  test('init in a born repo', () => {
    expect(initBornRepoMessage('/root')).toBe(INIT_DESIGN_ROWS['init in a born repo']('/root'));
  });

  test('restart line — sequenced', () => {
    expect(restartLineSequencedMessage()).toBe(INIT_DESIGN_ROWS['restart line — sequenced']());
  });

  test('clone hatch', () => {
    expect(cloneHatchMessage()).toBe(INIT_DESIGN_ROWS['clone hatch']());
  });

  test('personal-note naming', () => {
    expect(personalNoteNamingMessage()).toBe(INIT_DESIGN_ROWS['personal-note naming']());
  });

  test('jest.config.js collision (C27 A13)', () => {
    expect(jestConfigCollisionMessage()).toBe(INIT_DESIGN_ROWS['jest.config.js collision (C27 A13)']());
  });
});

// ---------------------------------------------------------------------------
// Task 16.2 additions — `attach`'s own catalog rows (design.md § "C20" / §
// "Error Handling", the `attach` and restart-now rows). A SEPARATE describe
// block, additive to the counts above.
// ---------------------------------------------------------------------------

const ATTACH_DESIGN_ROWS = {
  'attach in an unborn repo': () =>
    `no design system here. To create one: npx designerpunk init. Only reading DesignerPunk's docs and components? No init needed: npx designerpunk attach --target=<cc|kiro> --reference`,
  'restart line — now': () =>
    `restart your agent session now — DesignerPunk's MCP servers load when a session starts, so this session cannot see them yet (approve them if your tool asks)`,
};

describe('errorCatalog — string conformance (Task 16.2 additions)', () => {
  test('exactly two covered rows', () => {
    // BITE (recorded red in the Task 16.2 completion doc): removing a key
    // from ATTACH_DESIGN_ROWS turns this red.
    expect(Object.keys(ATTACH_DESIGN_ROWS).length).toBe(2);
  });

  test('attach in an unborn repo', () => {
    expect(attachUnbornRepoMessage()).toBe(ATTACH_DESIGN_ROWS['attach in an unborn repo']());
  });

  test('restart line — now', () => {
    expect(restartLineNowMessage()).toBe(ATTACH_DESIGN_ROWS['restart line — now']());
  });
});

// Task 16.5 — the region grain's "edited inside" row, transcribed verbatim from design.md § "Error Handling".
describe('errorCatalog — string conformance (Task 16.5 addition)', () => {
  test('managed region — edited inside', () => {
    expect(managedRegionEditedInsideMessage('CLAUDE.md')).toBe(
      'you edited inside the DesignerPunk-managed region of CLAUDE.md — those edits will be replaced. Move them outside the region; not applying without --apply',
    );
  });
});

// The 15.0.0 upgrade rehearsal — an issue-row string (source:
// .kiro/issues/2026-10-02-sync-steering-dir-suggestion-writes-broken-path.md; no design.md row yet).
describe('errorCatalog — string conformance (15.0.0 rehearsal issue rows)', () => {
  test('existing MCP entry — the advice names attach, never init', () => {
    expect(existingMcpEntryMessage('.kiro/settings/mcp.json', 'designerpunk-docs', 'kiro')).toBe(
      ".kiro/settings/mcp.json already has 'designerpunk-docs' entry; left unchanged. If it is outdated, delete the entry and re-run: npx designerpunk attach --target=kiro — or update it by hand.",
    );
    expect(existingMcpEntryMessage('.mcp.json', 'designerpunk-application', 'cc')).toBe(
      ".mcp.json already has 'designerpunk-application' entry; left unchanged. If it is outdated, delete the entry and re-run: npx designerpunk attach --target=cc — or update it by hand.",
    );
  });
});

// The 15.0.0 upgrade rehearsal — issue-row strings (source:
// .kiro/issues/2026-10-02-generate-stack-trace-on-component-token-family-mismatch.md; no design.md row yet).
describe('errorCatalog — string conformance (15.0.0 rehearsal: generate load failures)', () => {
  // Rehearsal run 2: only remedies that WORK for the file's location are named.
  test('family mismatch in a copied src/tokens/** file — split, or re-copy WITH the import rewrite', () => {
    expect(componentTokenFamilyMismatchMessage('src/tokens/component/progress.ts', 'GUARD.')).toBe(
      "generate stopped — src/tokens/component/progress.ts declares a component token in the wrong family's defineComponentTokens() call. GUARD. To fix it, split that file's defineComponentTokens() into one call per token family. Or, if an earlier DesignerPunk init copied this file, replace it with the package's version at node_modules/@3fn/core/src/tokens/component/progress.ts and change its '../../build/tokens' import to '@3fn/core/build'. Nothing was written.",
    );
  });

  test('family mismatch in a src/components/core/** copy — split, or delete an unedited copy (no source ships to re-copy)', () => {
    expect(componentTokenFamilyMismatchMessage('src/components/core/Button-Icon/buttonIcon.tokens.ts', 'GUARD.')).toBe(
      "generate stopped — src/components/core/Button-Icon/buttonIcon.tokens.ts declares a component token in the wrong family's defineComponentTokens() call. GUARD. To fix it, split that file's defineComponentTokens() into one call per token family. Or, if this is an unedited copy an earlier DesignerPunk init made, delete it — its component tokens then leave your generated ComponentTokens.* files. Nothing was written.",
    );
  });

  test('family mismatch in the consumer\'s own file — split only', () => {
    expect(componentTokenFamilyMismatchMessage('src/components/Widget/widget.tokens.ts', 'GUARD.')).toBe(
      "generate stopped — src/components/Widget/widget.tokens.ts declares a component token in the wrong family's defineComponentTokens() call. GUARD. To fix it, split that file's defineComponentTokens() into one call per token family. Nothing was written.",
    );
  });

  test('component-token file load failed — names the file and the reason', () => {
    expect(componentTokenFileLoadFailedMessage('src/tokens/component/broken.ts', 'Unexpected token.')).toBe(
      'generate stopped — src/tokens/component/broken.ts could not be loaded: Unexpected token. Fix the file and run generate again. Nothing was written.',
    );
  });

  test('component-token file load failed — only the reason\'s FIRST line (Node\'s "Require stack:" list is dropped)', () => {
    const nodeReason =
      "Cannot find module '../../build/tokens'\nRequire stack:\n- /abs/path/src/tokens/component/progress.ts\n- /abs/path/node_modules/tsx/dist/cjs/api/index.cjs";
    expect(componentTokenFileLoadFailedMessage('src/tokens/component/progress.ts', nodeReason)).toBe(
      "generate stopped — src/tokens/component/progress.ts could not be loaded: Cannot find module '../../build/tokens' Fix the file and run generate again. Nothing was written.",
    );
  });
});

// ---------------------------------------------------------------------------
// Task 22.2 — the bare `init` default notice (design.md row "bare `init` default notice (A2)", Leonardo A2).
// ---------------------------------------------------------------------------
import { namedDefaultNoticeMessage, initNextStepsMessage } from '../shared/errorCatalog';

describe('errorCatalog — Task 22.2 additions', () => {
  const A2_ROW = "no --target given — set up for Claude Code (the default). Using Kiro? npx designerpunk attach --target=kiro";

  test('bare `init` default notice (A2): string-equal to the design row for the shipped two-target profile with cc as the default', () => {
    expect(namedDefaultNoticeMessage('cc', ['cc', 'kiro'])).toBe(A2_ROW);
  });

  test('the notice follows the profile: a different default and an undeclared id are named, never a literal list', () => {
    expect(namedDefaultNoticeMessage('kiro', ['cc', 'kiro'])).toBe(
      'no --target given — set up for Kiro (the default). Using Claude Code? npx designerpunk attach --target=cc',
    );
    expect(namedDefaultNoticeMessage('solo', ['solo'])).toBe('no --target given — set up for solo (the default).');
  });

  test('init next steps: list positively, name the .gitignore block and the specs/ scaffold, in order', () => {
    const m = initNextStepsMessage('Acme', { jestConfigScaffolded: true, starterSpecNames: ['ci-needs', 'regrounding'], gitignoreBlockInPlace: true, agentLayerEmitted: true });
    expect(m).toContain('Your product "Acme" is ready.');
    const steps = m.split('\n').filter((l) => /^ {2}\d+\. /.test(l));
    expect(steps).toEqual([
      '  1. npm install',
      '  2. npm install --save-dev jest @types/jest ts-jest jest-environment-jsdom',
      '  3. npx designerpunk generate',
      '  4. specs/ holds your starter specs (ci-needs, regrounding): run them with your agent when you are ready',
      "  5. commit .gitignore with the rest: DesignerPunk's block in it ignores .designerpunk/ and token-index/",
    ]);
  });

  test('init next steps omit every step a skip made untrue', () => {
    const m = initNextStepsMessage('Acme', { jestConfigScaffolded: false, starterSpecNames: [], gitignoreBlockInPlace: false, agentLayerEmitted: false });
    const steps = m.split('\n').filter((l) => /^ {2}\d+\. /.test(l));
    expect(steps).toEqual([
      '  1. npm install',
      '  2. npx designerpunk generate',
      '  3. npx designerpunk attach --target=<cc|kiro> to attach a harness (agents + MCP config + approvals)',
    ]);
    expect(m).not.toContain('jest');
    expect(m).not.toContain('specs/');
    expect(m).not.toContain('.gitignore');
  });
});

