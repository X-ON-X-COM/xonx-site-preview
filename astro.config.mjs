import { defineConfig } from 'astro/config';

// The home page (public/index.html, public/m.html) is copied byte for byte; Astro
// only builds the Cases and Insights sections around it.
export default defineConfig({
  site: 'https://www.x-on-x.com',
  trailingSlash: 'always',
  build: { format: 'directory' },
});
