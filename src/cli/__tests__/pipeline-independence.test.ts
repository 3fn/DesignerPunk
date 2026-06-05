/**
 * @category evergreen
 * @purpose Verify system and product pipelines are independent (Spec 114 R3)
 */

jest.mock('../../generators/generateTokenFiles');
jest.mock('../../generators/generateTokenIndex');
jest.mock('../generateProductTokens');
jest.mock('../../config/ConfigLoader');
jest.mock('../resolveTokens');
jest.mock('../loadComponentTokens');
jest.mock('../themeVarying');
jest.mock('../../registries/ComponentTokenRegistry', () => ({
  ComponentTokenRegistry: { getAll: () => [] },
}));

import { generateTokenFiles } from '../../generators/generateTokenFiles';
import { generateProductTokens } from '../generateProductTokens';
import { loadConfig } from '../../config/ConfigLoader';
import { resolveTokens } from '../resolveTokens';
import { loadComponentTokens } from '../loadComponentTokens';
import { computeThemeVaryingTokens } from '../themeVarying';
import { runGenerate } from '../designerpunk';

const mockGenerateTokenFiles = generateTokenFiles as jest.Mock;
const mockGenerateProductTokens = generateProductTokens as jest.Mock;
const mockLoadConfig = loadConfig as jest.Mock;
const mockResolveTokens = resolveTokens as jest.Mock;
const mockLoadComponentTokens = loadComponentTokens as jest.Mock;
const mockComputeThemeVaryingTokens = computeThemeVaryingTokens as jest.Mock;

describe('Pipeline Independence (Spec 114 R3)', () => {
  let mockExit: jest.SpyInstance;
  let consoleLog: jest.SpyInstance;
  let consoleError: jest.SpyInstance;

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
    consoleLog = jest.spyOn(console, 'log').mockImplementation(() => {});
    consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
    jest.spyOn(console, 'warn').mockImplementation(() => {});

    mockLoadConfig.mockResolvedValue(baseConfig);
    mockResolveTokens.mockReturnValue({ primitiveTokens: [], semanticTokens: [] });
    mockLoadComponentTokens.mockReturnValue([]);
    mockComputeThemeVaryingTokens.mockReturnValue(new Set());
    mockGenerateTokenFiles.mockImplementation(() => {});
    mockGenerateProductTokens.mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('system failure does not prevent product generation', async () => {
    mockGenerateTokenFiles.mockImplementation(() => { throw new Error('System failed'); });

    await runGenerate();

    expect(mockGenerateProductTokens).toHaveBeenCalled();
  });

  test('exit code 1 when system fails', async () => {
    mockGenerateTokenFiles.mockImplementation(() => { throw new Error('System failed'); });

    await runGenerate();

    expect(mockExit).toHaveBeenCalledWith(1);
  });

  test('exit code 1 when product fails', async () => {
    mockGenerateProductTokens.mockImplementation(() => { throw new Error('Product failed'); });

    await runGenerate();

    expect(mockExit).toHaveBeenCalledWith(1);
  });

  test('no process.exit when all succeed', async () => {
    await runGenerate();

    expect(mockExit).not.toHaveBeenCalled();
  });

  test('structured output includes ✅ on success', async () => {
    await runGenerate();

    const allLogs = consoleLog.mock.calls.map(c => c[0]).join('\n');
    expect(allLogs).toContain('✅ System tokens generated');
    expect(allLogs).toContain('✅ Product tokens generated');
  });

  test('structured output includes ❌ on system failure', async () => {
    mockGenerateTokenFiles.mockImplementation(() => { throw new Error('boom'); });

    await runGenerate();

    const allErrors = consoleError.mock.calls.map(c => c[0]).join('\n');
    expect(allErrors).toContain('❌ System token generation failed');
  });

  test('--product-only recommendation shown on system failure', async () => {
    mockGenerateTokenFiles.mockImplementation(() => { throw new Error('boom'); });

    await runGenerate();

    const allLogs = consoleLog.mock.calls.map(c => c[0]).join('\n');
    expect(allLogs).toContain('--product-only');
  });
});
