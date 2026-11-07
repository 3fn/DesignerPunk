/**
 * untracked-guard.ts — the untracked-paths guard behind `.kiro/hooks/complete-task.sh`
 * (issue `.kiro/issues/2026-11-06-complete-task-stages-untracked-paths-outside-parent.md`;
 * Peter, 2026-11-06T14:04:52Z "4 (b)", and 2026-11-07T20:21:05Z "Re: 2, Fix").
 *
 * The tool used to run `git add -A` whenever the tree was dirty, so a completion commit could carry
 * any untracked, unignored file (L-9: four home-path logs from `.claude/scratch-backup/`). This
 * module decides, BEFORE the tool stages anything, which untracked paths lie outside the set the
 * task is allowed to add. It reads `tasks.md` through the parity checker's parser, but extracts
 * paths itself: `parseTasksMd` keeps only the FIRST path of each Primary Artifacts bullet
 * (`extractArtifactEntry`), so a bullet that names `a.ts`, `a.test.ts` and `README.md` would lose
 * two of its three. The parser stays unchanged (the parity checker reads it); this module takes
 * every backticked path-like token of the parent's bullets from `Parent.primaryArtifacts[].raw`.
 *
 * The allowed set (for parent N of spec dir D):
 *   - every path-like token in parent N's Primary Artifacts, globs included;
 *   - `.kiro/specs/D/completion/*.md` and `.kiro/specs/D/feedback/**` (the spec's reviewed docs;
 *     NOT `evidence/` or deeper `completion/` trees, where run logs live);
 *   - `docs/specs/D/task-N-summary.md`;
 *   - any `--completion-doc` path the tool was given;
 *   - `.kiro/issues/archive/X` where `.kiro/issues/X` is a tracked deletion (an archive move done
 *     with plain `mv`; the `git mv` form is a rename and never untracked);
 *   - anything named by `--add <path> --reason <why>`, exactly, no globs.
 * With no spec (a `fix/` or `chore/` branch) or no findable parent, only the last three apply.
 *
 * CLI (called by the tool): stdin lines `U<TAB>path` (would be newly added) and `D<TAB>path`
 * (tracked deletion). stdout on success: one `ADDED<TAB>path<TAB>reason` line per `--add` path that
 * was outside the set. stderr + exit 1 on refusal; exit 2 on a usage error.
 */

import * as fs from 'fs';
import * as path from 'path';
import { minimatch } from 'minimatch';
import { parseTasksMd } from './tasks-md';

export interface AddedPath {
  path: string;
  reason: string;
}

export interface GuardInput {
  repoRoot: string;
  message: string;
  branch: string;
  mode: 'parent' | 'unit-member' | 'subtask';
  specDirOpt?: string;
  taskOpt?: string;
  adds: AddedPath[];
  completionDocs: string[];
  untracked: string[];
  deleted: string[];
}

export interface GuardResult {
  ok: boolean;
  refused: string[];
  /** `--add` paths that were outside the allowed set (the trailer set). */
  added: AddedPath[];
  specDir?: string;
  parent?: string;
  /** Primary Artifacts entries with no path-like token (fail-closed note). */
  unparseable: string[];
  /** The refusal text for stderr (also set on a usage error). */
  message?: string;
  usageError?: boolean;
}

const norm = (p: string): string => p.replace(/^\.\//, '').replace(/\/+$/, '');

/** `129-consumer-generation-completeness` → `129`; `125-A-pr-gate…` → `125-A`. */
export function specIdOf(dir: string): string | undefined {
  return dir.match(/^(\d+(?:-[A-Z])?)(?=-)/)?.[1];
}

function listSpecDirs(repoRoot: string): string[] {
  const root = path.join(repoRoot, '.kiro', 'specs');
  if (!fs.existsSync(root)) return [];
  return fs
    .readdirSync(root, { withFileTypes: true })
    .filter((e) => e.isDirectory())
    .map((e) => e.name);
}

export function resolveSpecDir(repoRoot: string, specDirOpt: string | undefined, message: string, branch: string): string | undefined {
  const dirs = listSpecDirs(repoRoot);
  if (specDirOpt) return dirs.includes(specDirOpt) ? specDirOpt : undefined;
  // Longest id first so `125-A` is tried before `125`.
  const byId = dirs
    .map((d) => ({ d, id: specIdOf(d) }))
    .filter((x): x is { d: string; id: string } => !!x.id)
    .sort((a, b) => b.id.length - a.id.length);
  const suffix = message.match(/\(([^()]+)\)\s*$/)?.[1];
  if (suffix) {
    const hit = byId.find((x) => x.id === suffix);
    if (hit) return hit.d;
  }
  const hit = byId.find((x) => branch.startsWith(`task/${x.id}-`));
  return hit?.d;
}

/** The parent number: `--task`, else `Task N…` in the message (a subtask's `Task 12.2:` gives 12), else the branch. */
export function resolveParent(taskOpt: string | undefined, message: string, branch: string, specDir: string | undefined): string | undefined {
  if (taskOpt) return taskOpt.replace(/\..*$/, '');
  const m = message.match(/^Task (\d+[a-z]?)(?:\.\d+)?\b/);
  if (m) return m[1];
  const id = specDir ? specIdOf(specDir) : undefined;
  if (id && branch.startsWith(`task/${id}-`)) {
    const b = branch.slice(`task/${id}-`.length).match(/^(\d+[a-z]?)-/);
    if (b) return b[1];
  }
  return undefined;
}

/** Every path-like token of a Primary Artifacts entry (not just the first). */
export function pathTokens(raw: string, parsedPath?: string): string[] {
  const out: string[] = [];
  for (const m of raw.matchAll(/`([^`]+)`/g)) {
    const t = m[1].trim();
    if (/\s/.test(t)) continue;
    if (t.includes('/') || /\.[A-Za-z0-9]+$/.test(t)) out.push(norm(t));
  }
  if (out.length === 0 && parsedPath) out.push(norm(parsedPath));
  return out;
}

function matchesGlob(p: string, pattern: string): boolean {
  return p === pattern || minimatch(p, pattern, { dot: true }) || minimatch(p, `${pattern}/**`, { dot: true });
}

export function checkUntracked(input: GuardInput): GuardResult {
  const untracked = Array.from(new Set(input.untracked.map(norm)));
  const deleted = new Set(input.deleted.map(norm));
  const specDir = resolveSpecDir(input.repoRoot, input.specDirOpt, input.message, input.branch);
  const parent = resolveParent(input.taskOpt, input.message, input.branch, specDir);

  const patterns: string[] = [];
  const unparseable: string[] = [];
  let parentFound = false;
  if (specDir) {
    patterns.push(`.kiro/specs/${specDir}/completion/*.md`, `.kiro/specs/${specDir}/feedback/**`);
    const tasksPath = path.join(input.repoRoot, '.kiro', 'specs', specDir, 'tasks.md');
    if (parent && fs.existsSync(tasksPath)) {
      const file = parseTasksMd(fs.readFileSync(tasksPath, 'utf8'), specDir);
      const p = file.parents.find((x) => x.number === parent);
      if (p) {
        parentFound = true;
        patterns.push(`docs/specs/${specDir}/task-${parent}-summary.md`);
        for (const e of p.primaryArtifacts) {
          const toks = pathTokens(e.raw, e.path);
          if (toks.length === 0) unparseable.push(e.raw);
          patterns.push(...toks);
        }
      }
    }
  }
  patterns.push(...input.completionDocs.map(norm));

  const addSet = new Map(input.adds.map((a) => [norm(a.path), a.reason]));
  const stray = input.adds.filter((a) => !untracked.includes(norm(a.path)));
  if (stray.length > 0) {
    return {
      ok: false,
      refused: [],
      added: [],
      specDir,
      parent,
      unparseable,
      usageError: true,
      message: [
        `❌ complete-task: --add names ${stray.length} path(s) that are not new untracked paths: ${stray.map((s) => s.path).join(', ')}`,
        '   Nothing was staged, committed, or pushed. Check the spelling; --add admits exactly one new path, with no globs.',
      ].join('\n'),
    };
  }

  const refused: string[] = [];
  const added: AddedPath[] = [];
  for (const u of untracked) {
    const archived = u.startsWith('.kiro/issues/archive/') && deleted.has(`.kiro/issues/${u.slice('.kiro/issues/archive/'.length)}`);
    const inSet = archived || patterns.some((pat) => matchesGlob(u, pat));
    if (addSet.has(u)) {
      if (!inSet) added.push({ path: u, reason: addSet.get(u)! });
      continue;
    }
    if (!inSet) refused.push(u);
  }

  if (refused.length === 0) {
    return { ok: true, refused, added, specDir, parent, unparseable };
  }

  const scope = !specDir
    ? 'no spec found for this branch or message (non-spec work: every new path needs --add)'
    : !parent
      ? `spec ${specDir}, but no parent task could be found from --task, the message ("Task <N>…") or the branch name`
      : !parentFound
        ? `spec ${specDir}, but tasks.md has no parent numbered ${parent}`
        : `parent ${parent} of ${specDir}`;
  const lines = [
    `❌ complete-task: refusing to stage ${refused.length} untracked path(s) outside the allowed set. Nothing was staged, committed, or pushed.`,
    `   Scope: ${scope}.`,
    ...refused.map((r) => `   - ${r}`),
  ];
  if (unparseable.length > 0) {
    lines.push(
      `   ${unparseable.length} Primary Artifacts entr${unparseable.length === 1 ? 'y' : 'ies'} of parent ${parent} name no path (the guard fails closed on them): ${unparseable
        .map((u) => `"${u.slice(0, 60)}"`)
        .join('; ')}`,
    );
  }
  lines.push(
    '   Remedy, one of:',
    '     - the path should not ship (a log, a scratch copy): move it out of the tree or ignore it, then re-run;',
    '     - the path is this parent\'s work but its tasks.md row does not list it: fix the row, or pass',
    '       --add <path> --reason "<why>" (repeat per path; exact paths, no globs). Each --add is written into the',
    '       commit as an `Added-outside-list:` trailer and into the PR body, and is a claims-pass finding unless a grant covers it;',
    '     - an archive move done with plain `mv`: use `git mv` (or the archive path is allowed when the original is a tracked deletion);',
  );
  if (specDir && !parent) lines.push('     - the parent could not be found: pass --task <N>.');
  return { ok: false, refused, added, specDir, parent, unparseable, message: lines.join('\n') };
}

// ---------------------------------------------------------------------------
// CLI
// ---------------------------------------------------------------------------
function main(argv: string[]): number {
  const o: GuardInput = {
    repoRoot: process.cwd(),
    message: '',
    branch: '',
    mode: 'parent',
    adds: [],
    completionDocs: [],
    untracked: [],
    deleted: [],
  };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    const v = argv[i + 1] ?? '';
    switch (a) {
      case '--repo-root': o.repoRoot = v; i++; break;
      case '--message': o.message = v; i++; break;
      case '--branch': o.branch = v; i++; break;
      case '--mode': o.mode = v as GuardInput['mode']; i++; break;
      case '--spec-dir': o.specDirOpt = v || undefined; i++; break;
      case '--task': o.taskOpt = v || undefined; i++; break;
      case '--completion-doc': o.completionDocs.push(v); i++; break;
      case '--add': o.adds.push({ path: v, reason: '' }); i++; break;
      case '--reason':
        if (o.adds.length === 0 || o.adds[o.adds.length - 1].reason !== '') {
          console.error('❌ complete-task: --reason must directly follow the --add it explains.');
          return 2;
        }
        o.adds[o.adds.length - 1].reason = v.replace(/\s+/g, ' ').trim();
        i++;
        break;
      default:
        console.error(`❌ untracked-guard: unknown argument ${a}`);
        return 2;
    }
  }
  const bare = o.adds.filter((a) => !a.reason);
  if (bare.length > 0) {
    console.error(`❌ complete-task: --add ${bare.map((b) => b.path).join(', ')} has no --reason. Every path added outside the list is declared with its reason; nothing was staged.`);
    return 2;
  }
  for (const line of fs.readFileSync(0, 'utf8').split('\n')) {
    const [kind, ...rest] = line.split('\t');
    const p = rest.join('\t');
    if (!p) continue;
    if (kind === 'U') o.untracked.push(p);
    else if (kind === 'D') o.deleted.push(p);
  }
  const r = checkUntracked(o);
  if (!r.ok) {
    console.error(r.message);
    return r.usageError ? 2 : 1;
  }
  for (const a of r.added) console.log(`ADDED\t${a.path}\t${a.reason}`);
  return 0;
}

if (require.main === module) {
  process.exit(main(process.argv.slice(2)));
}
