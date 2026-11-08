/**
 * The reserved Kotlin packages (Spec 129 U8, design § 9; O-11, Ada's and Data's call):
 * `com.designerpunk.tokens` and `com.designerpunk.components.*` belong to DesignerPunk.
 * `generate` WARNS, never fails, on a `.kt` file of the consumer's in one of them: a failure
 * would break supported web adopters (every consumer born with today's `init` has
 * `src/tokens/platforms/android/MotionTokens.kt` in `com.designerpunk.tokens`, and test01 has
 * 45 such files). Failing can come at 17.0.0 or when Spec 132 ships the module.
 *
 * The scan skips `node_modules`, `build/`, `.gradle/` (and `.git`), `generate`'s own output
 * (the product-token output included) and the token source root, then reads each `.kt` file's
 * `package` line. A text scan: a clash in Kotlin outside the scanned tree stays unseen until
 * Spec 132's app build (design § 9, "Residual").
 */
import * as fs from 'fs';
import * as path from 'path';

/** Directories the scan never enters, by name. */
const SKIPPED_DIR_NAMES = new Set(['node_modules', 'build', '.gradle', '.git']);

const PACKAGE_LINE = /^\s*package\s+([A-Za-z_][\w.]*)\s*;?\s*$/m;

/** True for `com.designerpunk.tokens` and `com.designerpunk.components` and everything under it. */
export function isReservedKotlinPackage(pkg: string): boolean {
  return pkg === 'com.designerpunk.tokens' || pkg === 'com.designerpunk.components' || pkg.startsWith('com.designerpunk.components.');
}

export interface ReservedPackageFinding {
  /** Path relative to the scan root, `/`-separated. */
  file: string;
  package: string;
  /** True when the file's name is one of DesignerPunk's own component sources: a copy. */
  looksLikeCopy: boolean;
}

/** The `.kt` file names the package ships under `src/components/core/<Component>/platforms/android/`. */
export function packageComponentSourceNames(packageRoot: string): Set<string> {
  const names = new Set<string>();
  const core = path.join(packageRoot, 'src', 'components', 'core');
  try {
    for (const c of fs.readdirSync(core, { withFileTypes: true })) {
      if (!c.isDirectory()) continue;
      const dir = path.join(core, c.name, 'platforms', 'android');
      if (!fs.existsSync(dir)) continue;
      for (const f of fs.readdirSync(dir)) if (f.endsWith('.kt')) names.add(f);
    }
  } catch { /* no package component sources to compare with: nothing is called a copy */ }
  return names;
}

export function scanReservedKotlinPackages(opts: {
  /** The design-system root `generate` runs in. */
  root: string;
  /** Absolute directories not entered: `generate`'s output and the token source root. */
  skipDirs: readonly string[];
  /** Names of DesignerPunk's own component `.kt` files, for the pointer to `sync --migrate-legacy`. */
  componentSourceNames?: ReadonlySet<string>;
}): ReservedPackageFinding[] {
  const skip = new Set(opts.skipDirs.map(d => path.resolve(d)));
  const found: ReservedPackageFinding[] = [];
  const walk = (dir: string): void => {
    let entries: fs.Dirent[];
    try { entries = fs.readdirSync(dir, { withFileTypes: true }); } catch { return; }
    for (const e of entries) {
      const full = path.join(dir, e.name);
      if (e.isDirectory()) {
        if (SKIPPED_DIR_NAMES.has(e.name) || skip.has(path.resolve(full))) continue;
        walk(full);
      } else if (e.isFile() && e.name.endsWith('.kt')) {
        let text: string;
        try { text = fs.readFileSync(full, 'utf-8'); } catch { continue; }
        const pkg = PACKAGE_LINE.exec(text)?.[1];
        if (pkg && isReservedKotlinPackage(pkg)) {
          found.push({
            file: path.relative(opts.root, full).split(path.sep).join('/'),
            package: pkg,
            looksLikeCopy: opts.componentSourceNames?.has(e.name) === true,
          });
        }
      }
    }
  };
  walk(path.resolve(opts.root));
  return found.sort((a, b) => a.file.localeCompare(b.file));
}

/** The warning for one file. */
export function reservedPackageMessage(f: ReservedPackageFinding): string {
  return (
    `${f.file} is in the Kotlin package ${f.package}, which is reserved to DesignerPunk (com.designerpunk.tokens and com.designerpunk.components.*). ` +
    `A file of yours there can clash with DesignerPunk's in the same module; give it a package of your own.` +
    (f.looksLikeCopy
      ? ` It has the name of one of DesignerPunk's component sources, so it may be a copy: \`npx designerpunk sync --migrate-legacy\` removes the unmodified copies.`
      : '')
  );
}
