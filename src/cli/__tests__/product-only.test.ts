/**
 * @category evergreen
 * @purpose Verify --product-only CLI flag (Spec 114 R5)
 */

const mockExistsSync = jest.fn().mockReturnValue(true);
jest.mock('fs', () => ({
  ...jest.requireActual('fs'),
  existsSync: (...args: any[]) => mockExistsSync(...args),
  statSync: jest.fn().mockReturnValue({ mtimeMs: Date.now() }),
}));

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
import { isProductTokenStale, getProductTokenOutputPaths } from '../staleness';
import { runProductOnly } from '../designerpunk';

const mockGenerateTokenFiles = generateTokenFiles as jest.Mock;
const mockGenerateTokenIndex = generateTokenIndex as jest.Mock;
const mockGenerateProductTokens = generateProductTokens as jest.Mock;
const mockLoadConfig = loadConfig as jest.Mock;
const mockResolveTokens = resolveTokens as jest.Mock;
const mockIsStale = isProductTokenStale as jest.Mock;
const mockGetOutputPaths = getProductTokenOutputPaths as jest.Mock;

describe('--product-only (Spec 114 R5)', () => {
  let mockExit: jest.SpyInstance;

  const baseConfig = {
    name: 'Test',
    abbreviation: 'T',
    themes: [],
    tokenSourceRoot: '/tmp/tokens',
    tokenSourceMode: 'package' as const,
    componentTokenDirs: [],
    outputDir: '/tmp/dist',
    configDir: '/tmp',
    productTokens: '/tmp/product-tokens',
  };

  beforeEach(() => {
    jest.resetAllMocks();
    mockExit = jest.spyOn(process, 'exit').mockImplementation((() => {}) as any);
    jest.spyOn(console, 'log').mockImplementation(() => {});
    jest.spyOn(console, 'error').mockImplementation(() => {});

    mockLoadConfig.mockResolvedValue(baseConfig);
    mockIsStale.mockReturnValue(true);
    mockExistsSync.mockReturnValue(true);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('skips system token resolution (resolveTokens not called)', async () => {
    await runProductOnly();
    expect(mockResolveTokens).not.toHaveBeenCalled();
  });

  test('skips generateTokenFiles', async () => {
    await runProductOnly();
    expect(mockGenerateTokenFiles).not.toHaveBeenCalled();
  });

  test('skips generateTokenIndex', async () => {
    await runProductOnly();
    expect(mockGenerateTokenIndex).not.toHaveBeenCalled();
  });

  test('calls generateProductTokens when stale', async () => {
    mockIsStale.mockReturnValue(true);
    await runProductOnly();
    expect(mockGenerateProductTokens).toHaveBeenCalledWith(baseConfig);
  });

  test('skips generation when up-to-date (not stale)', async () => {
    mockIsStale.mockReturnValue(false);
    mockGetOutputPaths.mockReturnValue(['/tmp/dist/product/ProductTokens.web.css']);
    const { statSync } = require('fs');
    statSync.mockReturnValue({ mtimeMs: Date.now() });

    await runProductOnly();

    expect(mockGenerateProductTokens).not.toHaveBeenCalled();
    const logs = (console.log as jest.Mock).mock.calls.map(c => c[0]).join('\n');
    expect(logs).toContain('⏭ Product tokens up-to-date');
  });

  test('respects --force flag (regenerates even when up-to-date)', async () => {
    mockIsStale.mockReturnValue(true); // force=true makes isStale return true

    await runProductOnly(true);

    expect(mockGenerateProductTokens).toHaveBeenCalled();
    expect(mockIsStale).toHaveBeenCalledWith(baseConfig, true);
  });

  test('errors when token-index/ missing', async () => {
    mockExistsSync.mockReturnValue(false);

    await runProductOnly();

    expect(mockExit).toHaveBeenCalledWith(1);
    const errors = (console.error as jest.Mock).mock.calls.map(c => c[0]).join('\n');
    expect(errors).toContain('token-index/');
  });

  test('errors when productTokens not configured', async () => {
    mockLoadConfig.mockResolvedValue({ ...baseConfig, productTokens: undefined });

    await runProductOnly();

    expect(mockExit).toHaveBeenCalledWith(1);
  });
});
