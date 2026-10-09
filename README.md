# BRV — Brianvimalan Francis

Personal website and consulting portfolio. **Live: https://brianvimalan01.github.io/brv/**

 Built with [Astro](https://astro.build); all content is plain Markdown. Pushing to `main` deploys to GitHub Pages automatically.

## Pages

| Page | Content comes from |
|---|---|
| Home `/` | featured cases + hobbies (automatic) |
| About `/about` | `src/content/pages/about.md` + `src/content/capabilities/*.md` |
| Hobbies `/hobbies` | `src/content/hobbies/*.md` |
| Portfolio `/portfolio` | `src/content/cases/*.md` (one file per engagement) |

The master portfolio document lives in `docs/Brianvimalan_Francis_Project_Portfolio.md`. A copy in `public/` is offered as a download on the site.

## Common updates

- **Add a consulting case:** copy `src/content/cases/_TEMPLATE.md` to `src/content/cases/<url-slug>.md`, fill it in, and set `draft: false`.
- **Hide a case:** set `draft: true` in its frontmatter.
- **Show a case on the home page:** set `featured: true`.
- **Add diagrams to a case:** list them under `illustrations:`. The options are:
  - `stat-counters`: the headline numbers from `stats:`
  - `workstream-wheel`: links to `## Workstream A…F` sections
  - `migration-lifecycle`
  - `integration-hub`
  - `golive-timeline`
  - `incident-lifecycle`
- **Edit hobbies:** replace the `TODO` text in `src/content/hobbies/*.md`.
- **Profile photo:** put `photo.jpg` in `public/`, then swap the placeholder in `src/pages/about.astro`.

## Local development

Requires Node.js 22.12+.

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # production build into dist/
npm run check    # type-check
npm run verify   # type-check + build (run before every push)
npm run deploy-status -- --wait   # after a push: wait for the live deploy result
```

## Making updates

1. Edit the Markdown.
2. Run `npm run verify`.
3. Add a line to `CHANGELOG.md`.
4. Commit and `git push`.
5. GitHub Actions type-checks, builds and publishes, usually in about a minute.

You can also edit a file directly on github.com (the pencil icon). That triggers the same deploy. Run `git pull` locally before your next local edit.

## Deployment

`.github/workflows/deploy.yml` builds and publishes the site on every push to `main`. It works out the site URL and base path from the repo name automatically. One-time setup: in the GitHub repo, go to **Settings → Pages → Source** and choose **GitHub Actions**.
