/**
 * @category evergreen
 * @purpose Verify backward compatibility — repos without tokenSource/productTokens work identically (Spec 114 R9)
 */

jest.mock('../../generators/generateTokenFiles');
jest.mock('../../generators/generateTokenIndex');
jest.mock('../generateProductTokens');
jest.mock('../../config/ConfigLoader');
jest.mock('../resolveTokens');
jest.mock('../loadComponentTokens');
jest.mock('../staleness');
jest.mock('../../registries/ComponentTokenRegistry', () => ({
  ComponentTokenRegistry: { getAll: () => [] },
}));

import { generateTokenFiles } from '../../generators/generateTokenFiles';
import { generateTokenIndex } from '../../generators/generateTokenIndex';
import { generateProductTokens } from '../generateProductTokens';
import { loadConfig } from '../../config/ConfigLoader';
import { resolveTokens } from '../resolveTokens';
import { loadComponentTokens } from '../loadComponentTokens';
import { isProductTokenStale } from '../staleness';
import { runGenerate } from '../designerpunk';

const mockGenerateTokenFiles = generateTokenFiles as jest.Mock;
const mockGenerateTokenIndex = generateTokenIndex as jest.Mock;
const mockGenerateProductTokens = generateProductTokens as jest.Mock;
const mockLoadConfig = loadConfig as jest.Mock;
const mockResolveTokens = resolveTokens as jest.Mock;
const mockLoadComponentTokens = loadComponentTokens as jest.Mock;
const mockIsStale = isProductTokenStale as jest.Mock;

/** Minimal valid ModeResolvedTokens for mocking generateTokenFiles' return. */
const makeModeResolved = (themeVaryingTokens = new Set<string>()) => ({
  resolvedLight: [],
  resolvedDark: [],
  themeVaryingTokens,
  primitiveOklch: new Map(),
});

describe('Backward Compatibility (Spec 114 R9)', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    jest.spyOn(process, 'exit').mockImplementation((() => {}) as any);
    jest.spyOn(console, 'log').mockImplementation(() => {});
    jest.spyOn(console, 'error').mockImplementation(() => {});
    jest.spyOn(console, 'warn').mockImplementation(() => {});

    mockResolveTokens.mockReturnValue({ primitiveTokens: [], semanticTokens: [] });
    mockLoadComponentTokens.mockReturnValue([]);
    mockGenerateTokenFiles.mockReturnValue(makeModeResolved());
    mockGenerateTokenIndex.mockImplementation(() => {});
    mockGenerateProductTokens.mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('no tokenSource configured (package mode)', () => {
    const packageModeConfig = {
      name: 'Test',
      abbreviation: 'T',
      themes: [],
      tokenSourceRoot: '/pkg/tokens',
      tokenSourceMode: 'package' as const,
      componentTokenDirs: [],
      outputDir: '/tmp/dist',
      configDir: '/tmp',
    };

    test('does not call loadComponentTokens (package mode skips local loading)', async () => {
      mockLoadConfig.mockResolvedValue(packageModeConfig);
      await runGenerate();
      // loadComponentTokens is only called when tokenSourceMode === 'local'
      expect(mockLoadComponentTokens).not.toHaveBeenCalled();
    });

    test('generateTokenIndex still receives explicit token data', async () => {
      mockLoadConfig.mockResolvedValue(packageModeConfig);
      const tokens = { primitiveTokens: [{ name: 'space100' }], semanticTokens: [{ name: 'color.x' }] };
      mockResolveTokens.mockReturnValue(tokens);
      // The base-scoped theme-varying set now flows from generateTokenFiles' shared return
      // (Spec 117 Task 3), not a separate computeThemeVaryingTokens call.
      const modeResolved = makeModeResolved(new Set(['color.x']));
      mockGenerateTokenFiles.mockReturnValue(modeResolved);

      await runGenerate();

      expect(mockGenerateTokenIndex).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          primitiveTokens: tokens.primitiveTokens,
          semanticTokens: tokens.semanticTokens,
          componentTokens: [],
          modeResolved,
        })
      );
    });
  });

  describe('no productTokens configured', () => {
    const noProductConfig = {
      name: 'Test',
      abbreviation: 'T',
      themes: [],
      tokenSourceRoot: '/pkg/tokens',
      tokenSourceMode: 'package' as const,
      componentTokenDirs: [],
      outputDir: '/tmp/dist',
      configDir: '/tmp',
      // productTokens intentionally omitted
    };

    test('product pipeline skipped entirely — generateProductTokens not called', async () => {
      mockLoadConfig.mockResolvedValue(noProductConfig);
      await runGenerate();
      expect(mockGenerateProductTokens).not.toHaveBeenCalled();
    });

    test('staleness detection not invoked', async () => {
      mockLoadConfig.mockResolvedValue(noProductConfig);
      await runGenerate();
      expect(mockIsStale).not.toHaveBeenCalled();
    });

    test('system pipeline still runs normally', async () => {
      mockLoadConfig.mockResolvedValue(noProductConfig);
      await runGenerate();
      expect(mockGenerateTokenFiles).toHaveBeenCalled();
      expect(mockGenerateTokenIndex).toHaveBeenCalled();
    });
  });
});
