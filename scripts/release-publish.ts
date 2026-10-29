#!/usr/bin/env tsx
/**
 * release-publish.ts — the hermetic publish path: ONE tarball, built in a fresh clone at the tag, checked, and
 * published unchanged to every registry.
 *
 * Law: ballot `.kiro/docs/ballots/2026-10-03-hermetic-publish-path.md` § 3.2 (RELEASE-FLOW step 5).
 * Record: `.kiro/issues/2026-10-01-in-repo-generate-output-contaminates-package-dist.md` (2026-10-03 sections).
 * Why it exists: 15.0.0 shipped two different artifacts under one version. The public-npm publish was built in a
 * working checkout, so 62 stale `dist/` files and MCP bundles resolved from gitignored nested `node_modules/`
 * shipped (Stacy's R-2). A fresh clone at the tag has neither. The script is the guard; the `prepublishOnly`
 * refusal of a folder publish is only the tripwire that sends the operator here.
 *
 * Usage (also `npm run release:publish -- <args>`):
 *   npx tsx scripts/release-publish.ts --dry-run <S>     RELEASE-FLOW 5.1: everything except the publish, in a
 *                                                        fresh clone at commit S (full or abbreviated SHA that
 *                                                        resolves in this checkout). Nothing is published.
 *   npx tsx scripts/release-publish.ts <version> --expect-sha <S>
 *                                                        RELEASE-FLOW 5.3: the same, in a fresh clone at tag
 *                                                        v<version>, then publishes THAT tarball to GitHub
 *                                                        Packages and prints the 5.4 command (the next line).
 *   npx tsx scripts/release-publish.ts --npmjs <record>  RELEASE-FLOW 5.4 (Peter's terminal, web 2FA, the main
 *                                                        checkout): publishes the tarball 5.3's record names to
 *                                                        public npm, only after its four refusals pass (below).
 *   npx tsx scripts/release-publish.ts --census [--source <repo>]
 *                                                        The census mode of `hermetic-publish-path`'s commit-held
 *                                                        scope (ballots README § "Conventions", "Instrument
 *                                                        census"): one line per pasted 5.3 record in
 *                                                        docs/releases/<v>/publish-verification.txt, its verdicts
 *                                                        from this script's own decision functions. Reads git
 *                                                        and committed files only; publishes nothing.
 * Options:
 *   --source <git-url-or-path>   clone from here (default: this checkout's `origin` URL); for --census, the repo
 *                                whose v<version> tags are read (default: this checkout)
 *   --expect-sha <S>             REQUIRED in publish mode: the full 40-character SHA of the release squash S;
 *                                refuse unless v<version> resolves to exactly S (tag-to-S identity is a script
 *                                check, not one that holds only if the operator types the right command)
 *   --keep                       keep the clone directory afterwards (for inspection)
 *
 * What it refuses (exit 1, nothing published):
 *   - publish mode without `--expect-sha`, or with anything but a full 40-character SHA;
 *   - the tag v<version> does not exist at the source, or does not resolve to exactly --expect-sha;
 *   - publish mode: the tagged commit is not on this checkout's `origin/main` (fetch first);
 *   - publish mode: `npm whoami --registry=<GitHub Packages>` fails from this checkout (checked before any build);
 *   - publish mode: `npm whoami` against public npm fails from this checkout (same preflight, RS-31; 5.4 still runs
 *     in the operator's terminal with web 2FA, so a pass here shrinks the window before 5.4 and does not close it);
 *   - the clone's HEAD is not the requested commit, or `package.json`'s version at that commit is not <version>;
 *   - the clone is not clean after checkout or after `npm ci`;
 *   - `npm ci`, `check:drift`, `npm pack` (scripts on: prepack builds) or `verify:token-index-clean` fails;
 *   - `floor-closure.json` regenerated in the clone differs from the committed one (`generatedAt` aside), so
 *     pack-assert's section 1 reads a closure proven current at the commit;
 *   - any `pack-assert` finding on the tarball (section 10: no leftovers, root-shape bundles, `themes: []`, ...);
 *   - fewer passing `publish path:` findings than pack-assert's PUBLISH_PATH_FLOOR (section 10 did not run in full).
 *
 * What --npmjs refuses (exit 1, nothing published), in this order, stopping at the first (ballot
 * 2026-10-26-release-flow-batch-16-1 § 4 E7b, F-49 (ii-b)):
 *   1. the record is not 5.3's: its `mode` is not `publish`, or `publishedTo` does not hold GitHub Packages (a 5.1
 *      or pre-S dry-run record refuses), or it cannot be read;
 *   2. the tarball's sha1 does not equal the record's, or the tarball cannot be read;
 *   3. `git ls-remote` of this checkout's origin does not name the record's commit for v<record.version> (or fails);
 *   4. the npmjs packument does not read HTTP 200, does not parse as a packument, or holds `versions["<v>"]` or
 *      `time["<v>"]`; a network error or a timeout refuses: absence is never assumed.
 * Only then does it run `npm publish <tarball> --registry=… --@3fn:registry=… --access public` with inherited stdio
 * (web 2FA). npm's `+ @3fn/core@<v>` line is not evidence: RELEASE-FLOW step 6 reads the packument. Not detected
 * here: a raw `npm publish` typed instead of this mode, and a folder publish with `--ignore-scripts` (6b detects
 * both after publish).
 *
 * ORDER NOTE: `verify:token-index-clean` runs AFTER `npm pack`, not before it. The token index is regenerated by
 * the build, and the build runs inside pack's `prepack`; before the pack the check could only compare the committed
 * index with itself. `check:drift` reads committed files and runs before the pack. A tarball publish runs NO
 * lifecycle scripts (npm 10.9.3: `lib/commands/publish.js` and `libnpmpack` gate every script on
 * `spec.type === 'directory'`), so this script runs both checks itself.
 *
 * AUTH: the GitHub Packages publish runs with this checkout as its working directory, so npm reads this checkout's
 * gitignored `.npmrc` (or the user's npm config). The script never reads, copies or prints any npm config or token.
 */

import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import * as crypto from 'crypto';
import { spawnSync } from 'child_process';
import { assertTarball, reportFindings, Finding, PUBLISH_PATH_FLOOR, PUBLISH_PATH_LABEL } from './pack-assert';

const PROJECT_ROOT = path.resolve(__dirname, '..');

export const GH_REGISTRY = 'https://npm.pkg.github.com';
export const PUBLIC_REGISTRY = 'https://registry.npmjs.org';
export const PACKAGE_SCOPE = '@3fn';
export const PACKAGE_NAME = '@3fn/core';
/** The npmjs packument URL (the scoped name path-escaped, as the rail and RELEASE-FLOW step 6 read it). */
export const NPMJS_PACKUMENT_URL = `${PUBLIC_REGISTRY}/${PACKAGE_NAME.replace('/', '%2f')}`;

// ─── Arguments ───────────────────────────────────────────────────────────────────────────────────

export type ReleaseArgs =
  | { mode: 'dry-run'; sha: string; source?: string; keep: boolean }
  | { mode: 'publish'; version: string; expectSha: string; source?: string; keep: boolean }
  | { mode: 'npmjs'; recordPath: string }
  | { mode: 'census'; source?: string };

/** The two modes that build a tarball (5.1 and 5.3). */
export type BuildArgs = Extract<ReleaseArgs, { mode: 'dry-run' | 'publish' }>;

const SHA_RE = /^[0-9a-f]{7,40}$/;
const FULL_SHA_RE = /^[0-9a-f]{40}$/;
const VERSION_RE = /^\d+\.\d+\.\d+(-[0-9A-Za-z.-]+)?$/;

export class Refusal extends Error {}

/** 5.4's `npm publish` exited non-zero. Not a refusal: npm may or may not have accepted it, so the message never says "nothing was published". */
export class PublishFailed extends Error {}

export function parseArgs(argv: string[]): ReleaseArgs {
  let dryRunSha: string | undefined;
  let version: string | undefined;
  let source: string | undefined;
  let expectSha: string | undefined;
  let keep = false;
  let census = false;
  let npmjsRecord: string | undefined;
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    const value = (flag: string): string => {
      const v = argv[++i];
      if (!v || v.startsWith('--')) throw new Refusal(`${flag} needs a value`);
      return v;
    };
    if (a === '--dry-run') dryRunSha = value('--dry-run');
    else if (a === '--source') source = value('--source');
    else if (a === '--expect-sha') expectSha = value('--expect-sha');
    else if (a === '--keep') keep = true;
    else if (a === '--census') census = true;
    else if (a === '--npmjs') npmjsRecord = value('--npmjs');
    else if (a.startsWith('--')) throw new Refusal(`unknown option: ${a}`);
    else if (version === undefined) version = a.replace(/^v/, '');
    else throw new Refusal(`unexpected argument: ${a}`);
  }
  if (npmjsRecord !== undefined) {
    if (census || dryRunSha !== undefined || version !== undefined || expectSha !== undefined || source !== undefined || keep) {
      throw new Refusal('--npmjs takes only the record path 5.3 printed: release-publish.ts --npmjs <record>');
    }
    return { mode: 'npmjs', recordPath: npmjsRecord };
  }
  if (census) {
    if (dryRunSha !== undefined || version !== undefined || expectSha !== undefined || keep) {
      throw new Refusal('--census takes only --source <repo>');
    }
    return { mode: 'census', source };
  }
  if (dryRunSha !== undefined) {
    if (version !== undefined) throw new Refusal('give either --dry-run <S> or <version>, not both');
    if (expectSha !== undefined) throw new Refusal('--expect-sha applies to a publish; a dry run already names its commit');
    if (!SHA_RE.test(dryRunSha)) throw new Refusal(`--dry-run needs a commit SHA (7–40 hex characters), got: ${dryRunSha}`);
    return { mode: 'dry-run', sha: dryRunSha, source, keep };
  }
  if (version === undefined) throw new Refusal('usage: release-publish.ts --dry-run <S> | <version> --expect-sha <S> [--source <url>] [--keep] | --npmjs <record> | --census [--source <repo>]');
  if (!VERSION_RE.test(version)) throw new Refusal(`not a version: ${version}`);
  if (expectSha === undefined) {
    throw new Refusal(`a publish needs --expect-sha <S>, the full 40-character SHA of the release squash: release-publish.ts ${version} --expect-sha <S>`);
  }
  if (!FULL_SHA_RE.test(expectSha)) throw new Refusal(`--expect-sha needs the full 40-character commit SHA (no prefix), got: ${expectSha}`);
  return { mode: 'publish', version, expectSha, source, keep };
}

// ─── Pure helpers ────────────────────────────────────────────────────────────────────────────────

/** The commit a tag names, from `git ls-remote <src> refs/tags/v<v> refs/tags/v<v>^{}`: the peeled line wins (annotated tag). */
export function parseLsRemote(output: string, tag: string): string | undefined {
  let direct: string | undefined;
  let peeled: string | undefined;
  for (const line of output.split('\n')) {
    const [sha, ref] = line.trim().split(/\s+/);
    if (!sha || !ref) continue;
    if (ref === `refs/tags/${tag}^{}`) peeled = sha;
    else if (ref === `refs/tags/${tag}`) direct = sha;
  }
  return peeled ?? direct;
}

/**
 * The tag-to-commit decision: whether `git ls-remote` output names exactly `expected` for `tag`. 5.3 calls it with
 * --expect-sha. It is one of the commit-held scope's decisions, so the census mode calls it as is.
 */
export type TagVerdict = { ok: true } | { ok: false; found: string | undefined };

export function tagVerdict(lsRemoteOutput: string, tag: string, expected: string): TagVerdict {
  const found = parseLsRemote(lsRemoteOutput, tag);
  return found !== undefined && found === expected ? { ok: true } : { ok: false, found };
}

/** POSIX single-quote a shell word when it needs it. */
export function shellQuote(word: string): string {
  return /^[A-Za-z0-9_@%+=:,./-]+$/.test(word) ? word : `'${word.replace(/'/g, `'\\''`)}'`;
}

export function ghPublishArgs(tarball: string): string[] {
  return ['publish', tarball, `--registry=${GH_REGISTRY}`, `--${PACKAGE_SCOPE}:registry=${GH_REGISTRY}`];
}

export function publicPublishArgs(tarball: string): string[] {
  return ['publish', tarball, `--registry=${PUBLIC_REGISTRY}`, `--${PACKAGE_SCOPE}:registry=${PUBLIC_REGISTRY}`, '--access', 'public'];
}

export function renderCommand(cmd: string, args: string[]): string {
  return [cmd, ...args].map(shellQuote).join(' ');
}

/**
 * Whether a regenerated `floor-closure.json` equals the committed one. Compared as PARSED JSON with `generatedAt`
 * dropped (it is a wall-clock stamp, so a byte compare would refuse every publish); key order is ignored, array
 * order is not (the generator sorts its arrays).
 */
export function sameFloorClosure(committed: string, regenerated: string): boolean {
  const canonical = (text: string): string => {
    const parsed = JSON.parse(text) as Record<string, unknown>;
    delete parsed.generatedAt;
    const sortKeys = (v: unknown): unknown =>
      Array.isArray(v)
        ? v.map(sortKeys)
        : v !== null && typeof v === 'object'
          ? Object.fromEntries(Object.keys(v as object).sort().map((k) => [k, sortKeys((v as Record<string, unknown>)[k])]))
          : v;
    return JSON.stringify(sortKeys(parsed));
  };
  return canonical(committed) === canonical(regenerated);
}

/** Section 10's passing findings, counted by label (the floor check's input). */
export function publishPathPasses(findings: Finding[]): number {
  return findings.filter((f) => f.ok && f.label.startsWith(PUBLISH_PATH_LABEL)).length;
}

export function sha1OfFile(file: string): string {
  return crypto.createHash('sha1').update(fs.readFileSync(file)).digest('hex');
}

export interface ReleaseRecord {
  mode: 'dry-run' | 'publish';
  version: string;
  commit: string;
  source: string;
  tarball: string;
  sha1: string;
  fileCount: number;
  bytes: number;
  checks: { passed: number; total: number };
  publishedTo: string[];
  createdAt: string;
}

// ─── 5.4's commit-held decisions (the --npmjs mode, E7b) ─────────────────────────────────────────

const SHA1_RE = /^[0-9a-f]{40}$/;

export type RecordVerdict = { ok: true; record: ReleaseRecord } | { ok: false; reason: string };

/**
 * Refusal 1, the record mode: the record is 5.3's. Its `mode` is `publish` and its `publishedTo` holds GitHub
 * Packages: 5.3 writes a publish record only after GitHub Packages accepted the tarball, and GitHub Packages refuses
 * a second PUT of a version, so each version has at most one, naming the tarball GitHub Packages holds. A dry-run
 * record (5.1, a pre-S run) refuses. The fields the other refusals read (version, commit, sha1, tarball) must be
 * well-formed, or no later check could be made, so a record without them refuses here too.
 */
export function recordModeVerdict(recordText: string): RecordVerdict {
  let r: Partial<ReleaseRecord> | null;
  try {
    r = JSON.parse(recordText) as Partial<ReleaseRecord> | null;
  } catch {
    return { ok: false, reason: 'the record is not JSON' };
  }
  if (r === null || typeof r !== 'object' || Array.isArray(r)) return { ok: false, reason: 'the record is not a JSON object' };
  if (r.mode !== 'publish') {
    return { ok: false, reason: `its mode is ${JSON.stringify(r.mode)}, not "publish": only 5.3 writes a publish record, after GitHub Packages accepted its tarball; a 5.1 or pre-S dry-run tarball is never 5.4's` };
  }
  if (!Array.isArray(r.publishedTo) || !r.publishedTo.includes(GH_REGISTRY)) {
    return { ok: false, reason: `its publishedTo does not hold ${GH_REGISTRY}: 5.3 adds it only after GitHub Packages accepted the tarball` };
  }
  if (typeof r.version !== 'string' || !VERSION_RE.test(r.version)) return { ok: false, reason: `its version is not a version: ${JSON.stringify(r.version)}` };
  if (typeof r.commit !== 'string' || !FULL_SHA_RE.test(r.commit)) return { ok: false, reason: `its commit is not a full 40-character SHA: ${JSON.stringify(r.commit)}` };
  if (typeof r.sha1 !== 'string' || !SHA1_RE.test(r.sha1)) return { ok: false, reason: `its sha1 is not a 40-character sha1: ${JSON.stringify(r.sha1)}` };
  if (typeof r.tarball !== 'string' || r.tarball === '') return { ok: false, reason: 'it names no tarball' };
  return { ok: true, record: r as ReleaseRecord };
}

/** Refusal 3, tag-to-commit: v<record.version> names exactly record.commit (5.3's tagVerdict, called with the record). */
export function tagToCommitVerdict(record: Pick<ReleaseRecord, 'version' | 'commit'>, lsRemoteOutput: string): TagVerdict {
  return tagVerdict(lsRemoteOutput, `v${record.version}`, record.commit);
}

// ─── The run, with every side effect injected (so the unit tests can drive it) ─────────────────────

export interface RunResult {
  status: number;
  stdout: string;
}

export interface Deps {
  /** Runs a command. `inherit` streams its output to the operator (npm ci, pack, publish). */
  run(cmd: string, args: string[], cwd: string, inherit?: boolean): RunResult;
  mkdtemp(prefix: string): string;
  mkdir(dir: string): void;
  readFile(file: string): string;
  writeFile(file: string, text: string): void;
  listDir(dir: string): string[];
  fileSize(file: string): number;
  sha1(file: string): string;
  rm(dir: string): void;
  assertTarball(tgz: string, root: string): { findings: Finding[]; fileCount: number };
  log(line: string): void;
  now(): string;
}

export const realDeps: Deps = {
  run(cmd, args, cwd, inherit) {
    const r = spawnSync(cmd, args, { cwd, encoding: 'utf8', stdio: inherit ? 'inherit' : 'pipe', maxBuffer: 64 * 1024 * 1024 });
    return { status: r.status ?? 1, stdout: typeof r.stdout === 'string' ? r.stdout : '' };
  },
  mkdtemp: (prefix) => fs.mkdtempSync(path.join(os.tmpdir(), prefix)),
  mkdir: (d) => fs.mkdirSync(d, { recursive: true }),
  readFile: (f) => fs.readFileSync(f, 'utf8'),
  writeFile: (f, t) => fs.writeFileSync(f, t),
  listDir: (d) => fs.readdirSync(d),
  fileSize: (f) => fs.statSync(f).size,
  sha1: sha1OfFile,
  rm: (d) => fs.rmSync(d, { recursive: true, force: true }),
  assertTarball: (tgz, root) => assertTarball(tgz, root),
  log: (line) => console.log(line),
  now: () => new Date().toISOString(),
};

export interface RunOutcome {
  record: ReleaseRecord;
  recordPath: string;
  /** 5.3 only: the one 5.4 command, `npx tsx scripts/release-publish.ts --npmjs <recordPath>`. */
  npmjsCommand?: string;
}

export function npmjsModeCommand(recordPath: string): string {
  return renderCommand('npx', ['tsx', 'scripts/release-publish.ts', '--npmjs', recordPath]);
}

export function runRelease(args: BuildArgs, deps: Deps, projectRoot: string = PROJECT_ROOT): RunOutcome {
  const must = (r: RunResult, what: string): string => {
    if (r.status !== 0) throw new Refusal(`${what} failed (exit ${r.status})`);
    return r.stdout;
  };
  const git = (cwd: string, ...a: string[]): RunResult => deps.run('git', a, cwd);

  const source = args.source ?? must(git(projectRoot, 'remote', 'get-url', 'origin'), 'git remote get-url origin').trim();

  // 1. The target commit.
  let target: string;
  let fetchRef: string;
  if (args.mode === 'publish') {
    const tag = `v${args.version}`;
    const ls = must(git(projectRoot, 'ls-remote', source, `refs/tags/${tag}`, `refs/tags/${tag}^{}`), `git ls-remote ${source}`);
    const verdict = tagVerdict(ls, tag, args.expectSha);
    if (!verdict.ok) {
      if (!verdict.found) throw new Refusal(`tag ${tag} does not exist at ${source}. Tag S and push the tag first (RELEASE-FLOW 5.2).`);
      throw new Refusal(`tag ${tag} resolves to ${verdict.found}, not the expected ${args.expectSha}.`);
    }
    const commit = args.expectSha;
    if (git(projectRoot, 'merge-base', '--is-ancestor', commit, 'origin/main').status !== 0) {
      throw new Refusal(`tag ${tag} (${commit}) is not on this checkout's origin/main. Run \`git fetch origin\` and check that the tag names the release squash S.`);
    }
    // Fail fast, before minutes of install and build: can this checkout's npm config publish to GitHub Packages?
    // `npm whoami` prints a user name, never a token. A worktree has no copy of the gitignored `.npmrc`.
    if (deps.run('npm', ['whoami', `--registry=${GH_REGISTRY}`], projectRoot).status !== 0) {
      throw new Refusal(`npm has no GitHub Packages auth from ${projectRoot} (\`npm whoami --registry=${GH_REGISTRY}\` failed). Run the script from the checkout whose npm config authenticates (the main checkout's gitignored .npmrc), not from a worktree.`);
    }
    // RS-31: public-npm auth is the other half of the 5.4 PUT. An expired npmjs login surfaced at 5.4 for 15.1.0 and
    // 16.0.0 (npm reports it as E404 on a scoped PUT), after GitHub Packages already held the version. Check it here
    // too, before any clone or build. The check reads whatever `npm` itself reads from this cwd (project .npmrc, then the
    // operator's user config ~/.npmrc, where an npmjs login usually lives), because it IS an `npm whoami`; the script
    // reads no config file. RESIDUAL, not closed: 5.4 runs in the operator's terminal with web 2FA, so a login that
    // lapses after this check, or a 2FA failure, still stops 5.4. A pass here shrinks that window.
    const npmjs = deps.run('npm', ['whoami', `--registry=${PUBLIC_REGISTRY}`, `--${PACKAGE_SCOPE}:registry=${PUBLIC_REGISTRY}`], projectRoot);
    if (npmjs.status !== 0) {
      throw new Refusal(`npm has no public-npm auth from ${projectRoot} (\`npm whoami --registry=${PUBLIC_REGISTRY} --${PACKAGE_SCOPE}:registry=${PUBLIC_REGISTRY}\` failed, exit ${npmjs.status}). Run \`npm login --auth-type=web --registry=${PUBLIC_REGISTRY}\`, then re-run. Nothing was built or published. Note that 5.4 still runs in the operator's terminal with web 2FA: passing this check shrinks the window in which 5.4 can fail after GitHub Packages holds the version, and does not close it.`);
    }
    target = commit;
    fetchRef = `refs/tags/${tag}`;
  } else {
    const full = git(projectRoot, 'rev-parse', '--verify', '--quiet', `${args.sha}^{commit}`);
    if (full.status !== 0) throw new Refusal(`${args.sha} is not a commit in this checkout. Run \`git fetch origin\` first.`);
    target = full.stdout.trim();
    fetchRef = target;
    if (git(projectRoot, 'merge-base', '--is-ancestor', target, 'origin/main').status !== 0) {
      deps.log(`WARNING: ${target} is not on this checkout's origin/main. A dry run there is allowed; a publish never is.`);
    }
  }

  // 2. A fresh clone at exactly that commit.
  const work = deps.mkdtemp('dp-release-');
  const clone = path.join(work, 'clone');
  const out = path.join(work, 'out');
  let succeeded = false;
  try {
    must(deps.run('git', ['init', '-q', clone], work), 'git init');
    deps.mkdir(out);
    must(git(clone, 'fetch', '-q', '--depth', '1', source, fetchRef), `git fetch ${fetchRef}`);
    must(git(clone, 'checkout', '-q', '--detach', 'FETCH_HEAD'), 'git checkout FETCH_HEAD');
    const head = must(git(clone, 'rev-parse', 'HEAD'), 'git rev-parse HEAD').trim();
    if (head !== target) throw new Refusal(`the clone is at ${head}, not the requested ${target}.`);

    const pkg = JSON.parse(deps.readFile(path.join(clone, 'package.json'))) as { name: string; version: string };
    if (args.mode === 'publish' && pkg.version !== args.version) {
      throw new Refusal(`package.json at v${args.version} says version ${pkg.version}: the tag and the version disagree.`);
    }
    deps.log(`release-publish: ${args.mode} of ${pkg.name}@${pkg.version} at ${target} (fresh clone of ${source})`);

    const assertClean = (when: string): void => {
      const st = must(git(clone, 'status', '--porcelain', '--untracked-files=all'), 'git status');
      if (st.trim() !== '') throw new Refusal(`the clone is not clean ${when}:\n${st}`);
    };
    assertClean('after checkout');

    // 3. Install from the root lock only; no nested installs exist in a fresh clone.
    must(deps.run('npm', ['ci', '--no-audit', '--no-fund'], clone, true), 'npm ci');
    assertClean('after npm ci');

    // 4. Pre-pack checks that read committed files.
    must(deps.run('npm', ['run', 'check:drift'], clone, true), 'npm run check:drift');

    // 4b. The packaging-floor closure, regenerated at this commit, must equal the committed one; pack-assert's
    //     section 1 then reads a closure proven current here. The script overwrites the file, so the committed
    //     bytes are restored on a match; on a mismatch the regenerated file stays in the kept clone to diff.
    const closurePath = path.join(clone, 'floor-closure.json');
    const committedClosure = deps.readFile(closurePath);
    must(deps.run('npx', ['tsx', 'scripts/floor-closure.ts'], clone, true), 'npx tsx scripts/floor-closure.ts');
    const regeneratedClosure = deps.readFile(closurePath);
    if (!sameFloorClosure(committedClosure, regeneratedClosure)) {
      throw new Refusal('floor-closure.json is stale: regenerated at this commit, it differs from the committed file (generatedAt aside). Run `npx tsx scripts/floor-closure.ts`, commit the result, and cut the release from that commit.');
    }
    must(git(clone, 'checkout', '-q', '--', 'floor-closure.json'), 'git checkout -- floor-closure.json');

    // 5. Pack WITH lifecycle scripts: prepack builds.
    must(deps.run('npm', ['pack', '--pack-destination', out], clone, true), 'npm pack (scripts on)');
    const tgzs = deps.listDir(out).filter((f) => f.endsWith('.tgz'));
    if (tgzs.length !== 1) throw new Refusal(`expected exactly one tarball in ${out}, found ${tgzs.length}.`);
    const tarball = path.join(out, tgzs[0]);

    // 6. The token index the build regenerated must equal the committed one.
    must(deps.run('npm', ['run', 'verify:token-index-clean'], clone, true), 'npm run verify:token-index-clean');

    // 7. pack-assert on the tarball, against the tree it was built from.
    const assertion = deps.assertTarball(tarball, clone);
    const failedCount = reportFindings(assertion.findings);
    if (failedCount > 0) throw new Refusal(`pack-assert: ${failedCount} finding(s) on the tarball.`);
    // Only failed findings refuse above, so a pack-assert that silently stopped running section 10 would pass.
    const publishPath = publishPathPasses(assertion.findings);
    if (publishPath < PUBLISH_PATH_FLOOR) {
      throw new Refusal(`pack-assert: ${publishPath} passing \`${PUBLISH_PATH_LABEL}\` finding(s), below the section-10 floor of ${PUBLISH_PATH_FLOOR}. Section 10 did not run in full; nothing it guards is proven.`);
    }

    // 8. The record: what the registries' sha1s must equal at RELEASE-FLOW step 6b.
    const record: ReleaseRecord = {
      mode: args.mode,
      version: pkg.version,
      commit: target,
      source,
      tarball,
      sha1: deps.sha1(tarball),
      fileCount: assertion.fileCount,
      bytes: deps.fileSize(tarball),
      checks: { passed: assertion.findings.filter((f) => f.ok).length, total: assertion.findings.length },
      publishedTo: [],
      createdAt: deps.now(),
    };
    const recordPath = path.join(out, 'release-publish-record.json');

    if (args.mode === 'publish') {
      // 9. GitHub Packages: this checkout's npm config authenticates; nothing is read or printed here.
      must(deps.run('npm', ghPublishArgs(tarball), projectRoot, true), 'npm publish to GitHub Packages');
      record.publishedTo.push(GH_REGISTRY);
    }
    deps.writeFile(recordPath, `${JSON.stringify(record, null, 2)}\n`);

    deps.log('');
    deps.log(`tarball:    ${tarball}`);
    deps.log(`sha1:       ${record.sha1}`);
    deps.log(`files:      ${record.fileCount}   bytes: ${record.bytes}   pack-assert: ${record.checks.passed}/${record.checks.total}   publish path: ${publishPath} (floor ${PUBLISH_PATH_FLOOR})`);
    deps.log(`record:     ${recordPath}`);
    if (args.mode === 'dry-run') {
      deps.log('');
      deps.log('DRY RUN — nothing was published, and this tarball is never published: 5.3 builds the release tarball again at the tag, and 5.4 publishes only that one.');
    } else {
      deps.log('');
      deps.log(`Published to ${GH_REGISTRY}. RELEASE-FLOW 5.4 (Peter's terminal, web 2FA, from the main checkout) — run this one command. It refuses unless this record is 5.3's, the file's sha1 equals it, the tag names its commit and npmjs does not hold ${record.version}, and only then publishes the SAME tarball:`);
      deps.log(`  ${npmjsModeCommand(recordPath)}`);
      deps.log('Then RELEASE-FLOW step 6: both registries\' dist.shasum must equal the sha1 above.');
    }
    succeeded = true;
    return args.mode === 'publish' ? { record, recordPath, npmjsCommand: npmjsModeCommand(recordPath) } : { record, recordPath };
  } finally {
    // On success the clone goes (unless --keep); the tarball and its record stay for 5.4 and step 6.
    // On a refusal everything stays, so the failure can be inspected.
    if (succeeded && !args.keep) deps.rm(clone);
    if (!succeeded) deps.log(`work dir kept for inspection: ${work}`);
  }
}

// ─── 5.4: the --npmjs mode (E7b) ─────────────────────────────────────────────────────────────────

/**
 * Refusal 4, npmjs absence (live state): the packument GET, `curl -q -sS --max-time 15 -w '\n%{http_code}'` (the
 * rail's form: `-q` first, so no curl config is read). Absence is positive evidence only: HTTP 200, a body that
 * parses as a packument (`versions` and `time` are objects), and neither `versions["<v>"]` nor `time["<v>"]`. The
 * packument, not the version endpoint, because a 404 from the version endpoint is not evidence of absence (RS-48:
 * npm can hold an accepted version it has not recorded yet; then this passes and npm refuses the second PUT).
 */
export function npmjsCurlArgs(): string[] {
  return ['-q', '-sS', '--max-time', '15', '-w', '\n%{http_code}', NPMJS_PACKUMENT_URL];
}

export type AbsenceVerdict = { ok: true } | { ok: false; reason: string };

export function npmjsAbsenceVerdict(curl: RunResult, version: string): AbsenceVerdict {
  const cannot = (why: string): AbsenceVerdict => ({ ok: false, reason: `could not establish that ${version} is absent from npmjs (${why})` });
  if (curl.status !== 0) return cannot(`curl exited ${curl.status}: a network error or a timeout`);
  const cut = curl.stdout.lastIndexOf('\n');
  const code = cut < 0 ? '' : curl.stdout.slice(cut + 1).trim();
  if (code !== '200') return cannot(`HTTP ${code || '<none>'} from ${NPMJS_PACKUMENT_URL}`);
  let doc: unknown;
  try {
    doc = JSON.parse(curl.stdout.slice(0, cut));
  } catch {
    return cannot('the body does not parse as JSON');
  }
  const isObject = (v: unknown): v is Record<string, unknown> => v !== null && typeof v === 'object' && !Array.isArray(v);
  if (!isObject(doc) || !isObject(doc.versions) || !isObject(doc.time)) return cannot('the body is not a packument: no versions and time objects');
  if (Object.prototype.hasOwnProperty.call(doc.versions, version) || Object.prototype.hasOwnProperty.call(doc.time, version)) {
    return { ok: false, reason: `npmjs already holds ${version} (versions["${version}"] or time["${version}"] is in the packument): this release is published there, or another tarball is` };
  }
  return { ok: true };
}

/** RELEASE-FLOW 5.4. Four refusals, in order, then the one publish. Every side effect goes through `deps`. */
export function runNpmjs(recordPath: string, deps: Deps, projectRoot: string = PROJECT_ROOT): ReleaseRecord {
  // 1. The record is 5.3's (commit-held: the 5.3 records are pasted in the step-6 records).
  let recordText: string;
  try {
    recordText = deps.readFile(recordPath);
  } catch {
    throw new Refusal(`cannot read the record ${recordPath}. Give the record path 5.3 printed (its \`record:\` line).`);
  }
  const rv = recordModeVerdict(recordText);
  if (!rv.ok) throw new Refusal(`${recordPath} is not 5.3's record: ${rv.reason}.`);
  const record = rv.record;

  // 2. The file is the record's (live: the tarball is not kept after 6b, A11).
  let actual: string;
  try {
    actual = deps.sha1(record.tarball);
  } catch {
    throw new Refusal(`cannot read the tarball the record names, ${record.tarball}. 5.4 publishes only that file (keep it until 6b, A11).`);
  }
  if (actual !== record.sha1) {
    throw new Refusal(`the tarball ${record.tarball} has sha1 ${actual}, not the record's ${record.sha1}: it is not the file GitHub Packages accepted at 5.3.`);
  }

  // 3. The tag names the record's commit (commit-held: git holds the tag).
  const origin = deps.run('git', ['remote', 'get-url', 'origin'], projectRoot);
  if (origin.status !== 0) throw new Refusal(`git remote get-url origin failed (exit ${origin.status})`);
  const source = origin.stdout.trim();
  const tag = `v${record.version}`;
  const ls = deps.run('git', ['ls-remote', source, `refs/tags/${tag}`, `refs/tags/${tag}^{}`], projectRoot);
  if (ls.status !== 0) throw new Refusal(`git ls-remote ${source} failed (exit ${ls.status}): the tag could not be read.`);
  const tv = tagToCommitVerdict(record, ls.stdout);
  if (!tv.ok) {
    throw new Refusal(tv.found ? `tag ${tag} at ${source} names ${tv.found}, not the record's commit ${record.commit}.` : `tag ${tag} does not exist at ${source}; the record's commit is ${record.commit}.`);
  }

  // 4. npmjs does not hold the version (live state; a network error refuses).
  const av = npmjsAbsenceVerdict(deps.run('curl', npmjsCurlArgs(), projectRoot), record.version);
  if (!av.ok) throw new Refusal(`${av.reason}.`);

  // 5. The publish: the operator's npm config authenticates (web 2FA), so stdio is inherited.
  deps.log(`release-publish: --npmjs, ${PACKAGE_NAME}@${record.version} at ${record.commit}: record is 5.3's, sha1 ${record.sha1} matches, ${tag} names the commit, npmjs does not hold ${record.version}. Publishing ${record.tarball}:`);
  const pub = deps.run('npm', publicPublishArgs(record.tarball), projectRoot, true);
  if (pub.status !== 0) {
    throw new PublishFailed(`npm publish to ${PUBLIC_REGISTRY} exited ${pub.status}. Whether npmjs accepted it is not known from here: read the packument (curl -s ${NPMJS_PACKUMENT_URL}) for time["${record.version}"], and re-run only this command, never a raw npm publish (refusal 4 refuses once npmjs holds ${record.version}).`);
  }
  deps.log('');
  deps.log(`npm's "+ ${PACKAGE_NAME}@${record.version}" line is not evidence that the registry recorded the version. RELEASE-FLOW step 6 reads the packument: time["${record.version}"], and dist.shasum equal to ${record.sha1}.`);
  return record;
}

// ─── The census mode: hermetic-publish-path's commit-held scope ──────────────────────────────────

/**
 * Corpus: every 5.3 `release-publish-record.json` pasted verbatim in a step-6 record (15.1.0 onward; 15.0.0
 * predates this script), and the v<version> tag of each, read from git. Ballot
 * 2026-10-26-release-flow-batch-16-1, Census block and § "Plans" P1; record
 * .kiro/issues/2026-10-27-npmjs-mode-and-commit-held-census-mode-owed.md.
 */
export const CENSUS_RECORDS_DIR = 'docs/releases';
export const CENSUS_RECORD_FILE = 'publish-verification.txt';
export const CENSUS_HEADING = '### 5.3 release-publish-record.json (verbatim)';

export interface CensusInput {
  /** The step-6 record's path, relative to the repo root. */
  input: string;
  /** The pasted record's JSON text, exactly as committed (the `{` line through the first `}` line after it). */
  recordText: string;
}

/** The pasted record under CENSUS_HEADING, or undefined when the file has no such heading. Reads; decides nothing. */
export function extractPastedRecord(text: string): string | undefined {
  const lines = text.split('\n');
  const at = lines.indexOf(CENSUS_HEADING);
  if (at < 0) return undefined;
  const open = lines.findIndex((l, i) => i > at && l === '{');
  const close = open < 0 ? -1 : lines.findIndex((l, i) => i > open && l === '}');
  if (open < 0 || close < 0) return '';
  return lines.slice(open, close + 1).join('\n');
}

export function censusCorpus(projectRoot: string, deps: Pick<Deps, 'listDir' | 'readFile'>): CensusInput[] {
  const inputs: CensusInput[] = [];
  for (const entry of [...deps.listDir(path.join(projectRoot, CENSUS_RECORDS_DIR))].sort()) {
    const rel = `${CENSUS_RECORDS_DIR}/${entry}/${CENSUS_RECORD_FILE}`;
    let text: string;
    try {
      text = deps.readFile(path.join(projectRoot, rel));
    } catch {
      continue; // not a release directory with a step-6 record
    }
    const recordText = extractPastedRecord(text);
    if (recordText !== undefined) inputs.push({ input: rel, recordText });
  }
  return inputs;
}

/** What a census decision reads: the pasted record, and `git ls-remote` output for a tag at the census source. */
export interface CensusContext {
  recordText: string;
  lsRemote(tag: string): string;
}

/** The pasted record's fields a tag decision is called with. Corpus reading only; no verdict. */
function pastedFields(recordText: string): { version: string; commit: string } | undefined {
  try {
    const r = JSON.parse(recordText) as { version?: unknown; commit?: unknown };
    return typeof r.version === 'string' && typeof r.commit === 'string' ? { version: r.version, commit: r.commit } : undefined;
  } catch {
    return undefined;
  }
}

function renderTagVerdict(v: TagVerdict): string {
  return v.ok ? 'pass' : v.found ? `refuse(names ${v.found})` : 'refuse(absent)';
}

/**
 * The commit-held decisions the census calls, one entry per decision function, in output order. Each entry calls
 * the script's own function and renders its verdict; it adds no logic. `tag-5.3`: 5.3's tag check, called with the
 * --expect-sha the pasted record carries as `commit` (5.3 writes `commit` only after the tag named it exactly).
 * `record-mode` and `tag-to-commit`: 5.4's refusals 1 and 3 (the --npmjs mode). Its refusals 2 (the file's sha1)
 * and 4 (npmjs absence) read live state and sit in the row's live-state scope, so the census does not call them.
 */
export const CENSUS_DECISIONS: Array<{ name: string; decide(c: CensusContext): string }> = [
  {
    name: 'tag-5.3',
    decide(c) {
      const f = pastedFields(c.recordText);
      if (!f) return 'unreadable';
      return renderTagVerdict(tagVerdict(c.lsRemote(`v${f.version}`), `v${f.version}`, f.commit));
    },
  },
  {
    name: 'record-mode',
    decide(c) {
      const v = recordModeVerdict(c.recordText);
      return v.ok ? 'pass' : `refuse(${v.reason})`;
    },
  },
  {
    name: 'tag-to-commit',
    decide(c) {
      const f = pastedFields(c.recordText);
      if (!f) return 'unreadable';
      return renderTagVerdict(tagToCommitVerdict(f, c.lsRemote(`v${f.version}`)));
    },
  },
];

/** The census output: one sorted `<input>\t<name>=<verdict>;…` line per input, then the selected count. */
export function runCensus(deps: Deps, projectRoot: string = PROJECT_ROOT, source: string = projectRoot): string[] {
  const lsRemote = (tag: string): string => {
    const r = deps.run('git', ['ls-remote', source, `refs/tags/${tag}`, `refs/tags/${tag}^{}`], projectRoot);
    if (r.status !== 0) throw new Refusal(`git ls-remote ${source} failed (exit ${r.status})`);
    return r.stdout;
  };
  const corpus = censusCorpus(projectRoot, deps);
  const lines = corpus
    .map(({ input, recordText }) => {
      const ctx: CensusContext = { recordText, lsRemote };
      return `${input}\t${CENSUS_DECISIONS.map((d) => `${d.name}=${d.decide(ctx)}`).join(';')}`;
    })
    .sort();
  lines.push(`selected: ${corpus.length} pasted 5.3 records under ${CENSUS_RECORDS_DIR}/*/${CENSUS_RECORD_FILE}; decisions: ${CENSUS_DECISIONS.map((d) => d.name).join(', ')}`);
  return lines;
}

function main(): void {
  try {
    const args = parseArgs(process.argv.slice(2));
    if (args.mode === 'census') {
      const source = args.source ?? PROJECT_ROOT;
      // RS-63: name where the tags were read. On stderr, so the census output (stdout) and its digest are unchanged.
      // The census reads them from this checkout (or --source); 5.4's refusal 3 reads them live from origin.
      console.error(`census: v<version> tags read by git ls-remote of ${source}; 5.4's refusal 3 reads them from origin`);
      for (const l of runCensus(realDeps, PROJECT_ROOT, source)) console.log(l);
      return;
    }
    if (args.mode === 'npmjs') {
      runNpmjs(args.recordPath, realDeps);
      return;
    }
    runRelease(args, realDeps);
  } catch (e) {
    if (e instanceof Refusal) {
      console.error(`\nREFUSED: ${e.message}\nNothing was published.`);
      process.exit(1);
    }
    if (e instanceof PublishFailed) {
      console.error(`\nFAILED: ${e.message}`);
      process.exit(1);
    }
    throw e;
  }
}

if (require.main === module) {
  main();
}
