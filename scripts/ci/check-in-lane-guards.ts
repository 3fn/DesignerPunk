/**
 * check-in-lane-guards — the named-guard selection floor (step 1 of
 * `.kiro/issues/2026-10-13-named-guard-selection-floor-then-map-column-derivation.md`).
 *
 * A guard that runs INSIDE a required lane (a Jest test selected by the lane's config) has no
 * liveness signal of its own: the lane's selection floor asserts only "≥ N resolved test files",
 * so one guard file falling out of `testMatch` / `roots` / `rootDir` goes unseen while the lane
 * stays green. This check reads the registry `.github/in-lane-guards.json`
 * (`{"version": 1, "guards": [{file, config, context, record}, …]}`) and, for each entry,
 * confirms that the file and the config exist and that the file appears in the REAL output of
 * `npx jest --config <config> --listTests` (never a reimplemented matcher), and that the entry's
 * `context` is a required context in `tools/agent-generator/verify-gate-registration.sh`
 * `EXPECTED_CONTEXTS` — the array is evaluated by bash itself (no second list and no TS twin of
 * a shell parser; `coverage-map.ts` `parseExpectedContexts` is not imported because its module
 * graph needs the built mcp-server sub-package).
 *
 * It prints the scoped line `N registered in-lane guards; M selected` — a claim over the
 * REGISTERED guards only, never every in-lane guard: an unregistered guard is invisible to it
 * (the record's stated residual). Exit 0 only when the registry is non-empty, well-formed,
 * duplicate-free, and every entry is selected; otherwise exit 1, naming each offending entry.
 *
 * Usage: npx tsx scripts/ci/check-in-lane-guards.ts [--registry <path>] [--root <dir>] [--gate-script <path>]
 *   --registry     registry file (default: <repo>/.github/in-lane-guards.json)
 *   --root         directory the entries' `file` and `config` paths are relative to (default: <repo>)
 *   --gate-script  the script carrying EXPECTED_CONTEXTS (default: <repo>/tools/agent-generator/verify-gate-registration.sh)
 *
 * Owner: Thurgood (CI-regime owner). Falsification fixtures: Stacy's specification, built in
 * scripts/__tests__/__fixtures__/in-lane-guards/ and exercised by scripts/__tests__/in-lane-guards.test.ts.
 */

import { spawnSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

export const REPO_ROOT = path.resolve(__dirname, '..', '..');
export const DEFAULT_REGISTRY = path.join(REPO_ROOT, '.github', 'in-lane-guards.json');
export const DEFAULT_GATE_SCRIPT = path.join(REPO_ROOT, 'tools', 'agent-generator', 'verify-gate-registration.sh');
export const REGISTRY_VERSION = 1;
const FIELDS = ['file', 'config', 'context', 'record'] as const;

export interface GuardEntry {
  file: string;
  config: string;
  context: string;
  record: string;
}

export interface CheckOptions {
  registryPath?: string;
  root?: string;
  gateScriptPath?: string;
}

export interface CheckResult {
  exitCode: 0 | 1;
  /** Every line the check prints, in order (FAIL lines first, then the scoped summary line). */
  lines: string[];
}

/** The scoped summary line — over registered guards only. */
export function summaryLine(registered: number, selected: number): string {
  return `${registered} registered in-lane guards; ${selected} selected`;
}

/**
 * EXPECTED_CONTEXTS as bash reads it: the `EXPECTED_CONTEXTS=(` … `)` block is cut from the
 * script and evaluated by bash, which prints one element per line. A missing block or a bash
 * failure yields an error, never an empty-but-green list.
 */
export function readExpectedContexts(gateScriptPath: string): { contexts: string[] } | { error: string } {
  const text = fs.readFileSync(gateScriptPath, 'utf8').split('\n');
  const start = text.findIndex((l) => /^\s*EXPECTED_CONTEXTS=\(\s*$/.test(l));
  if (start === -1) return { error: `no EXPECTED_CONTEXTS=( block in ${gateScriptPath}` };
  const end = text.findIndex((l, i) => i > start && /^\s*\)\s*$/.test(l));
  if (end === -1) return { error: `unterminated EXPECTED_CONTEXTS=( block in ${gateScriptPath}` };
  const block = text.slice(start, end + 1).join('\n');
  const res = spawnSync('bash', ['-c', `${block}\nprintf '%s\\n' "\${EXPECTED_CONTEXTS[@]}"`], { encoding: 'utf8' });
  if (res.error || res.status !== 0) return { error: `bash could not evaluate EXPECTED_CONTEXTS: ${res.error?.message ?? res.stderr}` };
  const contexts = `${res.stdout}`.split('\n').filter((l) => l.length > 0);
  if (contexts.length === 0) return { error: `EXPECTED_CONTEXTS evaluated empty in ${gateScriptPath}` };
  return { contexts };
}

function realpathOrSelf(p: string): string {
  try {
    return fs.realpathSync(p);
  } catch {
    return path.resolve(p);
  }
}

/** Real jest selection: absolute, realpath'd file list for one config, or an error string. */
function listTests(configAbs: string): { files: Set<string> } | { error: string } {
  const res = spawnSync('npx', ['jest', '--config', configAbs, '--listTests'], {
    cwd: REPO_ROOT,
    encoding: 'utf8',
    maxBuffer: 64 * 1024 * 1024,
  });
  if (res.error) return { error: `could not run jest: ${res.error.message}` };
  if (res.status !== 0) {
    const tail = `${res.stderr ?? ''}`.trim().split('\n').slice(-3).join(' | ');
    return { error: `\`npx jest --config ${configAbs} --listTests\` exited ${res.status}: ${tail}` };
  }
  const files = new Set(
    `${res.stdout ?? ''}`
      .split('\n')
      .map((l) => l.trim())
      .filter((l) => l.length > 0)
      .map(realpathOrSelf),
  );
  return { files };
}

export function checkInLaneGuards(opts: CheckOptions = {}): CheckResult {
  const registryPath = path.resolve(opts.registryPath ?? DEFAULT_REGISTRY);
  const root = path.resolve(opts.root ?? REPO_ROOT);
  const gateScriptPath = path.resolve(opts.gateScriptPath ?? DEFAULT_GATE_SCRIPT);
  const lines: string[] = [];
  const fail = (msg: string): CheckResult => {
    lines.push(`FAIL: ${msg}`);
    return { exitCode: 1, lines };
  };

  // ── Registry shape ────────────────────────────────────────────────────────
  if (!fs.existsSync(registryPath)) return fail(`registry not found: ${registryPath}`);
  let parsed: unknown;
  try {
    parsed = JSON.parse(fs.readFileSync(registryPath, 'utf8'));
  } catch (e) {
    return fail(`registry is not valid JSON (${registryPath}): ${(e as Error).message}`);
  }
  if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
    return fail(`registry must be a JSON object {"version": ${REGISTRY_VERSION}, "guards": [...]} (${registryPath})`);
  }
  const reg = parsed as { version?: unknown; guards?: unknown };
  if (reg.version !== REGISTRY_VERSION) {
    return fail(`registry version must be ${REGISTRY_VERSION}, found ${JSON.stringify(reg.version)} (${registryPath})`);
  }
  if (!Array.isArray(reg.guards)) return fail(`registry "guards" must be an array (${registryPath})`);
  if (reg.guards.length === 0) return fail(`registry is empty — zero registered in-lane guards (${registryPath})`);

  const findings: string[] = [];
  const entries: GuardEntry[] = [];
  reg.guards.forEach((raw, i) => {
    const label = `entry ${i}`;
    if (typeof raw !== 'object' || raw === null || Array.isArray(raw)) {
      findings.push(`${label}: not an object`);
      return;
    }
    const obj = raw as Record<string, unknown>;
    const missing = FIELDS.filter((f) => typeof obj[f] !== 'string' || (obj[f] as string).trim() === '');
    if (missing.length > 0) {
      findings.push(`${label} (${JSON.stringify(obj.file ?? null)}): missing or empty field(s): ${missing.join(', ')}`);
      return;
    }
    const e = { file: obj.file, config: obj.config, context: obj.context, record: obj.record } as GuardEntry;
    for (const f of ['file', 'config'] as const) {
      if (path.isAbsolute(e[f])) findings.push(`${label} (${e.file}): "${f}" must be relative to the root, found an absolute path`);
    }
    entries.push(e);
  });
  if (findings.length > 0) {
    for (const f of findings) lines.push(`FAIL: ${f}`);
    lines.push(`FAIL: registry is malformed (${registryPath}) — ${findings.length} entr${findings.length === 1 ? 'y' : 'ies'}`);
    return { exitCode: 1, lines };
  }

  // ── Duplicates never count twice ──────────────────────────────────────────
  const seen = new Map<string, number>();
  const unique: GuardEntry[] = [];
  entries.forEach((e, i) => {
    const key = `${path.normalize(e.file)}\u0000${path.normalize(e.config)}`;
    if (seen.has(key)) {
      findings.push(`entry ${i} (${e.file}): duplicate of entry ${seen.get(key)} (same file and config) — counted once`);
      return;
    }
    seen.set(key, i);
    unique.push(e);
  });

  // ── Contexts must be required contexts ────────────────────────────────────
  let expected: string[] = [];
  if (!fs.existsSync(gateScriptPath)) {
    findings.push(`gate script not found: ${gateScriptPath} — cannot read EXPECTED_CONTEXTS`);
  } else {
    const ctx = readExpectedContexts(gateScriptPath);
    if ('error' in ctx) findings.push(ctx.error);
    else expected = ctx.contexts;
  }

  // ── Per entry: file, config, context, selection ───────────────────────────
  const selections = new Map<string, { files: Set<string> } | { error: string }>();
  let selected = 0;
  unique.forEach((e) => {
    const i = seen.get(`${path.normalize(e.file)}\u0000${path.normalize(e.config)}`);
    const label = `entry ${i} (${e.file})`;
    const fileAbs = path.resolve(root, e.file);
    const configAbs = path.resolve(root, e.config);
    let ok = true;
    if (expected.length > 0 && !expected.includes(e.context)) {
      findings.push(`${label}: context "${e.context}" is not a required context (EXPECTED_CONTEXTS in ${path.relative(REPO_ROOT, gateScriptPath) || gateScriptPath})`);
      ok = false;
    }
    if (!fs.existsSync(fileAbs)) {
      findings.push(`${label}: registered file is absent: ${fileAbs}`);
      ok = false;
    }
    if (!fs.existsSync(configAbs)) {
      findings.push(`${label}: registered config is absent: ${configAbs}`);
      ok = false;
    }
    if (!ok) return;
    if (!selections.has(configAbs)) selections.set(configAbs, listTests(configAbs));
    const sel = selections.get(configAbs)!;
    if ('error' in sel) {
      findings.push(`${label}: config ${e.config} did not list its tests — ${sel.error}`);
      return;
    }
    if (!sel.files.has(realpathOrSelf(fileAbs))) {
      findings.push(`${label}: DORMANT — not selected by \`npx jest --config ${e.config} --listTests\` (${sel.files.size} file(s) selected; the lane stays green while this guard does not run)`);
      return;
    }
    selected += 1;
  });

  for (const f of findings) lines.push(`FAIL: ${f}`);
  lines.push(summaryLine(unique.length, selected));
  return { exitCode: findings.length === 0 && selected === unique.length ? 0 : 1, lines };
}

function parseArgs(argv: string[]): CheckOptions {
  const opts: CheckOptions = {};
  for (let i = 0; i < argv.length; i += 1) {
    const a = argv[i];
    const next = () => {
      const v = argv[i + 1];
      if (v === undefined) throw new Error(`${a} needs a value`);
      i += 1;
      return v;
    };
    if (a === '--registry') opts.registryPath = next();
    else if (a === '--root') opts.root = next();
    else if (a === '--gate-script') opts.gateScriptPath = next();
    else throw new Error(`unknown argument: ${a}`);
  }
  return opts;
}

if (require.main === module) {
  let opts: CheckOptions;
  try {
    opts = parseArgs(process.argv.slice(2));
  } catch (e) {
    console.error(`USAGE: ${(e as Error).message}`);
    process.exit(2);
  }
  const result = checkInLaneGuards(opts);
  for (const l of result.lines) (l.startsWith('FAIL') ? console.error : console.log)(l);
  process.exit(result.exitCode);
}
