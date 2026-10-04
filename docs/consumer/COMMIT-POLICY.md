# Commit policy: what to commit, what to regenerate

This page says which files DesignerPunk's `init`, `generate`, `attach` and `sync` commands leave in your repo for you to commit, and which they regenerate on each machine. It is what makes "clone, install, generate" true for a teammate: the founder commits the left column, and a joiner regenerates the right.

## The policy

| REPO STATE — commit | REGENERATED or LOCAL — do not commit |
|---|---|
| `designerpunk.config.ts` · `src/tokens/**` · `src/components/**` · `product/**` · **`specs/**`** · `package.json` + lockfile · `.designerpunkignore` · test configs · **`designerpunk.manifest.json`** · MCP configs (key-grain regions) · generated agent artifacts **and identity member files** for every attached target · `CLAUDE.md` / `.claude/settings.json` (your files, with managed regions or keys) · **`.gitignore` (your file, with a managed block)** · **generated platform output (default)** | `token-index/` · **`.designerpunk/`** (local only: your personal note) |

## Why each item is where it is

**Commit: the design system is yours.** The token tier, config, components, `product/` and `specs/` are the design system you own after birth, and a teammate who clones your repo receives them from your history, not from the package.

- `designerpunk.config.ts` and `src/tokens/**`: `init` writes them once, at birth. `generate` reads them.
- `src/components/**`: your components. `init` creates the directory empty, with a README.
- `product/**` and `specs/**`: your product's context and your specs. They are repo state, not per-person files.
- `package.json` and the lockfile: commit the lockfile, so a teammate installs the version you built against.
- `.designerpunkignore`: lists the files `sync` must never touch. Teams share it, so it is committed.
- Test configs: `jest.config.js` and `tsconfig.test.json`, which `init` writes.
- `designerpunk.manifest.json`: the record of what DesignerPunk wrote into your repo, and at which version. It sits at the repo root, beside the config, so that ignoring a tool directory never removes your teammate's baseline.

**Commit: files with parts DesignerPunk manages.** These are your files. DesignerPunk writes only inside marked regions or its own keys, and `sync` leaves everything outside them byte for byte as you wrote it.

- MCP configs: `.mcp.json` (Claude Code) or `.kiro/settings/mcp.json` (Kiro), at DesignerPunk's own server keys. `.claude/settings.json` holds the approval list for Claude Code.
- `CLAUDE.md`: a managed region inside your file.
- Generated agent artifacts and identity member files, for every target you have attached (`.claude/agents/`, `.kiro/agents/`, and the identity docs each target reads). Committing them means a teammate on the same agent tool needs no extra step; a teammate on a different tool runs `npx designerpunk attach --target=<cc|kiro>` once (see "Joining a repo that already has a design system" below).
- `.gitignore`: your file, with a block DesignerPunk manages (below).

**Do not commit: regenerated or local.**

- `token-index/`: the index the Application MCP reads for token queries. it is derived from your token source, and `generate` rebuilds it on every machine.
- `.designerpunk/`: local to one person. It holds your personal note, `.designerpunk/personal-note.local.md`: who you are, what you value, and how you like to work with your agents. It belongs to a person, not to the design system, so a joiner never inherits yours and you never inherit the founder's. `generate` creates it when it is absent.

## Platform output is committed by default

`generate` writes platform output (CSS, Swift, Kotlin) to the `output` path in your `designerpunk.config.ts`. The default is to commit it, so that the files you preview are the files you ship: a static site, or any clone-and-deploy pipeline that does not know to run `generate`, then deploys real token files. If you edit a token and forget to run `generate`, your own preview shows no change, and you catch it in the dev loop.

If your build or deploy runs `npx designerpunk generate`, you do not need to commit the output. The `.gitignore` block carries a commented line for exactly this; uncomment it.

## The `.gitignore` block

`init` adds a block to `.gitignore` between DesignerPunk's begin and end marker comments. It ignores exactly two paths, `token-index/` and `.designerpunk/`, and it carries one commented line with the reason and your configured output path filled in:

```
# uncomment if your build/deploy runs 'npx designerpunk generate' — then platform output need not be committed
# <your configured output path>/
```

Everything outside the markers is yours and is never touched. `sync` keeps the block current and leaves your other lines byte for byte as they were.

**If your repo was born on 15.0.0, it has no block.** When git is not already ignoring `.designerpunk/`, `sync` offers to add the block and asks before writing (a yes-or-no question, default no). If `sync` runs where nobody can answer, it prints a report with the fix and writes nothing. Either way you can add the line `.designerpunk/` to `.gitignore` yourself.

## Joining a repo that already has a design system

The joining steps are in the install guide, `docs/consumer/INSTALL.md` in the `@3fn/core` package, under "7. Joining an existing design system". That section also says which step to add if you use a different agent tool than the founder. `init` is never the join mechanism: it is the birth event, once per design system.
