# BRV website — guide for Claude Code

This is Brianvimalan Francis's personal site. It uses Astro 7 (static) with content collections and deploys to GitHub Pages through `.github/workflows/deploy.yml` on every push to `main`.

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
1. Edit the Markdown or components.
2. `npm run build && npm run check`: both must pass.
3. Commit with a descriptive message, one logical change per commit.
4. `git push`. GitHub Actions redeploys. Check the run with `gh run list` if `gh` is available.

Node is installed at `~/.local/node/bin` on Brian's Mac (no Homebrew). Prefix commands with `export PATH=~/.local/node/bin:$PATH`.
