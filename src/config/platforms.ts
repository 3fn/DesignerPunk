/**
 * The platforms a config can name in `platforms:` (Spec 129 Req 12.1; design § 12a).
 *
 * One list, read by the config's type, by the CLI's validation of the key and by the harness consumer. Spec 132's
 * generated `Package.swift` and Gradle include read `platforms:` too, with no second path setting.
 */
export const PLATFORM_KEYS = ['web', 'ios', 'android'] as const;

export type PlatformKey = (typeof PLATFORM_KEYS)[number];

/** `platforms:` as a consumer writes it: a platform key to the folder its files are written to. */
export type PlatformOutputs = Partial<Record<PlatformKey, { output: string }>>;

/** Where a platform's files go: its own folder when the config names one, else `output`. */
export function platformOutputDir(
  config: { outputDir: string; platforms?: PlatformOutputs },
  platform: PlatformKey,
): string {
  return config.platforms?.[platform]?.output ?? config.outputDir;
}
