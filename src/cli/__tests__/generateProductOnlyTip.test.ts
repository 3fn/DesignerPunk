/**
 * @category evergreen
 * @purpose Verify that after a system-token failure `generate` prints the `--product-only` tip
 * only when product tokens are configured (.kiro/issues/2026-10-13-generate-product-only-tip-without-product-tokens.md).
 * The exit code (1 on any failure) is asserted in both arms — the tip never changes it.
 */
jest.mock('../../config/ConfigLoader');
jest.mock('../resolveTokens');
jest.mock('../loadComponentTokens');
jest.mock('../../generators/generateTokenFiles');
jest.mock('../shared/personalNote');
jest.mock('../generateProductTokens');
jest.mock('../staleness');

import { loadConfig } from '../../config/ConfigLoader';
import { resolveTokens } from '../resolveTokens';
import { generateTokenFiles } from '../../generators/generateTokenFiles';
import { ensurePersonalNote } from '../shared/personalNote';
import { loadComponentTokens } from '../loadComponentTokens';
import { isProductTokenStale, getProductTokenOutputPaths } from '../staleness';
import { runGenerate } from '../designerpunk';

const mockLoadConfig = loadConfig as jest.Mock;
const mockResolveTokens = resolveTokens as jest.Mock;
const mockGenerateTokenFiles = generateTokenFiles as jest.Mock;
const mockEnsureNote = ensurePersonalNote as jest.Mock;
const mockLoadComponentTokens = loadComponentTokens as jest.Mock;
const mockIsStale = isProductTokenStale as jest.Mock;
const mockGetOutputPaths = getProductTokenOutputPaths as jest.Mock;

const TIP = '💡 Tip: Use --product-only to skip system token generation';

describe('runGenerate — the --product-only tip after a system-token failure', () => {
  let mockExit: jest.SpyInstance;
  let logLines: string[];

  const baseConfig = {
    name: 'T',
    abbreviation: 'T',
    themes: [],
    tokenSourceRoot: '/tmp/tokens',
    tokenSourceMode: 'package' as const,
    componentTokenDirs: [],
    outputDir: '/tmp/dist',
    configDir: '/tmp',
  };

  beforeEach(() => {
    logLines = [];
    mockExit = jest.spyOn(process, 'exit').mockImplementation((() => undefined) as never);
    jest.spyOn(console, 'log').mockImplementation((...a: unknown[]) => { logLines.push(a.join(' ')); });
    jest.spyOn(console, 'error').mockImplementation(() => undefined);
    jest.spyOn(console, 'warn').mockImplementation(() => undefined);
    mockLoadComponentTokens.mockReturnValue([]);
    mockResolveTokens.mockReturnValue({ primitiveTokens: [], semanticTokens: [] });
    mockEnsureNote.mockReturnValue('present');
    // System generation fails inside the system-pipeline try block.
    mockGenerateTokenFiles.mockImplementation(() => { throw new Error('boom'); });
    // Product pipeline (when configured) succeeds as up-to-date, so only the system arm fails.
    mockIsStale.mockReturnValue(false);
    mockGetOutputPaths.mockReturnValue([]);
  });

  afterEach(() => {
    mockLoadConfig.mockReset();
    mockResolveTokens.mockReset();
    mockGenerateTokenFiles.mockReset();
    mockEnsureNote.mockReset();
    mockLoadComponentTokens.mockReset();
    mockIsStale.mockReset();
    mockGetOutputPaths.mockReset();
    jest.restoreAllMocks();
  });

  test('productTokens configured: the tip is printed and the exit code is 1', async () => {
    mockLoadConfig.mockResolvedValue({ ...baseConfig, productTokens: '/tmp/product-tokens' });

    await runGenerate();

    expect(logLines).toContain(TIP);
    expect(mockExit).toHaveBeenCalledWith(1);
  });

  test('no productTokens: the tip is not printed and the exit code is still 1', async () => {
    mockLoadConfig.mockResolvedValue({ ...baseConfig });

    await runGenerate();

    expect(logLines).not.toContain(TIP);
    expect(mockExit).toHaveBeenCalledWith(1);
  });
});
