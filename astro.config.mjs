import { defineConfig } from 'astro/config';

// SITE and BASE_PATH are injected by .github/workflows/deploy.yml from the
// GitHub repository name, so no manual edit is needed when the repo is created.
// Locally they fall back to the root.
export default defineConfig({
  site: process.env.SITE ?? 'http://localhost:4321',
  base: process.env.BASE_PATH ?? '/',
  trailingSlash: 'ignore',
});
