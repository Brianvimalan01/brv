# BRV website — guide for Claude Code

This is Brianvimalan Francis's personal site. It uses Astro 7 (static) with content collections and deploys to GitHub Pages through `.github/workflows/deploy.yml` on every push to `main`.

- Repo: https://github.com/Brianvimalan01/brv (remote `origin`, branch `main`)
- Live site: https://brianvimalan01.github.io/brv/ (base path `/brv`, derived automatically from the repo name)

## Where things live
- `src/content/cases/*.md`: one consulting engagement per file. The schema is in `src/content.config.ts`. `_TEMPLATE.md` is never published.
- `src/content/pages/about.md`, `src/content/hobbies/*.md`, `src/content/capabilities/*.md`: page content.
- `docs/Brianvimalan_Francis_Project_Portfolio.md`: **master source** for the consulting content. When it changes:
  - sync the changes into the case files and capability files
  - copy it to `public/` (the download link)
- `src/components/illustrations/`: inline-SVG and CSS diagrams. `src/layouts/CaseLayout.astro` maps each `illustrations:` name to its component, caption and section link. A new diagram needs:
  - an entry in `illustrationNames` in `src/content.config.ts`
  - a component
  - a `meta` entry plus a render line in `CaseLayout.astro`
- Internal links must use `url()` from `src/lib/url.ts`, because GitHub Pages serves the site under `/<repo>/`.

## Content rules
- Never invent client names, figures or outcomes. Use only what is in the master portfolio, or what Brian provides. Client names stay confidential.
- Numbers shown in illustrations must match the source. Current figures:
  - 18 submodules
  - 180+ touchpoints
  - 6 ERP domains
  - 6+ internal and 6+ external systems
  - 3+ years
  - 5-month cyber PMO
- Remaining TODOs: the hobby text, the personal paragraph in `about.md`, the photo, and contact links in `Footer.astro`.

## Update loop (do this for every change)
1. `git pull` first, in case Brian edited something on GitHub directly.
2. Edit the Markdown or components.
3. `npm run verify` (type-check + build). It must pass. Preview with `npm run dev` if the change is visual.
4. Add a dated line to `CHANGELOG.md` describing the change in plain words.
5. Commit with a descriptive message, one logical change per commit.
6. `git push`, then `npm run deploy-status -- --wait` to confirm the GitHub Pages deploy succeeded. Report the live URL.

If a deploy fails, read the run log and fix forward with a new commit. Never force-push `main`.

## Environment notes
- Node 22 is installed at `~/.local/node/bin` (no Homebrew). `.claude/settings.local.json` puts it on PATH for Claude Code. In a plain terminal, run `export PATH=~/.local/node/bin:$PATH` first.
- There is no `gh` CLI. The GitHub login is a classic token saved in the macOS keychain through git's osxkeychain helper. `scripts/deploy-status.sh` reads it from there. Never print or log the token.
- If a push fails with an auth error (for example the token expired), have Brian create a new classic token with the `repo` + `workflow` scopes: https://github.com/settings/tokens/new?scopes=repo,workflow&description=brv-push
  - He clicks its copy button. Never ask him to paste it into chat.
  - Then store it from the clipboard: `printf 'protocol=https\nhost=github.com\nusername=Brianvimalan01\npassword=%s\n\n' "$(pbpaste | tr -d '[:space:]')" | git credential-osxkeychain store`
  - Afterwards clear the clipboard with `printf '' | pbcopy`.
- Dependabot opens monthly grouped PRs. CI builds and type-checks them. Merge them only when the checks pass.
