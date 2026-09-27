/**
 * @category evergreen
 * @purpose Verify the application server's token-index-unavailable message picks
 * the correct design.md catalog string per reason/posture (Spec 123 Task 1.6).
 */
import { resolveTokenIndexUnavailableMessage, DesignSystemRootShape, ErrorCatalogModule } from '../index';

const fakeErrorCatalog: ErrorCatalogModule = {
  partialCaseMessage: (root, partialCase, attemptedTokenSource) =>
    `PARTIAL[${partialCase}] root=${root} attempted=${attemptedTokenSource ?? 'none'}`,
  packageModeIndexAbsentMessage: () => 'PACKAGE-MODE-ABSENT',
  bornIndexAbsentMessage: (root) => `BORN-ABSENT[${root}]`,
  explicitTokenIndexMissingMessage: (p) => `EXPLICIT-MISSING[${p}]`,
};

function dsRoot(overrides: Partial<DesignSystemRootShape>): DesignSystemRootShape {
  return {
    state: 'unborn',
    root: null,
    tierDir: null,
    signals: { config: false, tier: false, manifest: false, legacyManifest: false },
    ...overrides,
  };
}

describe('resolveTokenIndexUnavailableMessage', () => {
  test('empty-env-value → the explicit TOKEN_INDEX_DIR catalog string', () => {
    const msg = resolveTokenIndexUnavailableMessage(
      'empty-env-value',
      dsRoot({}),
      '/pkg',
      fakeErrorCatalog,
      '/explicit/path'
    );
    expect(msg).toBe('EXPLICIT-MISSING[/explicit/path]');
  });

  test('run-generate + born → the born-absent catalog string, rooted at dsRoot.root', () => {
    const msg = resolveTokenIndexUnavailableMessage(
      'run-generate',
      dsRoot({ state: 'born', root: '/consumer' }),
      '/pkg',
      fakeErrorCatalog,
      undefined
    );
    expect(msg).toBe('BORN-ABSENT[/consumer]');
  });

  test('run-generate + package-mode → the package-mode-absent catalog string (never born-absent)', () => {
    const msg = resolveTokenIndexUnavailableMessage(
      'run-generate',
      dsRoot({ state: 'package-mode', root: '/consumer' }),
      '/pkg',
      fakeErrorCatalog,
      undefined
    );
    expect(msg).toBe('PACKAGE-MODE-ABSENT');
    // BITE (recorded red in the Task 1.6 completion doc): if `run-generate` always
    // resolved to `bornIndexAbsentMessage` regardless of `dsRoot.state`, this would
    // read 'BORN-ABSENT[/consumer]' instead.
  });

  test('partial → the matching partial-case catalog string, with attemptedTokenSource threaded through', () => {
    const msg = resolveTokenIndexUnavailableMessage(
      'partial',
      dsRoot({ state: 'partial', root: '/consumer', partialCase: 'config-no-tier', attemptedTokenSource: '/consumer/src/tokens' }),
      '/pkg',
      fakeErrorCatalog,
      undefined
    );
    expect(msg).toBe('PARTIAL[config-no-tier] root=/consumer attempted=/consumer/src/tokens');
  });
});
