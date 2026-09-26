/**
 * @category evergreen
 * @purpose Verify the product server's token-index-unavailable message picks the
 * correct design.md catalog string per reason/posture (Spec 123 Task 1.6) —
 * mirrors application-mcp-server's equivalent test.
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

describe('resolveTokenIndexUnavailableMessage (product server)', () => {
  test('empty-env-value → the explicit TOKEN_INDEX_DIR catalog string', () => {
    expect(
      resolveTokenIndexUnavailableMessage('empty-env-value', dsRoot({}), '/pkg', fakeErrorCatalog, '/explicit/path')
    ).toBe('EXPLICIT-MISSING[/explicit/path]');
  });

  test('run-generate + born → the born-absent catalog string', () => {
    expect(
      resolveTokenIndexUnavailableMessage(
        'run-generate',
        dsRoot({ state: 'born', root: '/consumer' }),
        '/pkg',
        fakeErrorCatalog,
        undefined
      )
    ).toBe('BORN-ABSENT[/consumer]');
  });

  test('run-generate + package-mode → the package-mode-absent catalog string (never born-absent)', () => {
    expect(
      resolveTokenIndexUnavailableMessage(
        'run-generate',
        dsRoot({ state: 'package-mode', root: '/consumer' }),
        '/pkg',
        fakeErrorCatalog,
        undefined
      )
    ).toBe('PACKAGE-MODE-ABSENT');
  });

  test('partial → the matching partial-case catalog string, with attemptedTokenSource threaded through', () => {
    expect(
      resolveTokenIndexUnavailableMessage(
        'partial',
        dsRoot({ state: 'partial', root: '/consumer', partialCase: 'config-no-tier', attemptedTokenSource: '/consumer/src/tokens' }),
        '/pkg',
        fakeErrorCatalog,
        undefined
      )
    ).toBe('PARTIAL[config-no-tier] root=/consumer attempted=/consumer/src/tokens');
  });
});
