import { defineConfig } from 'astro/config';
import homeCases from './scripts/home-cases.mjs';

// The home page (public/index.html, public/m.html) is copied byte for byte; Astro
// builds the Cases and Insights sections around it, and home-cases puts the
// cases into its Recent Matters carousel.
export default defineConfig({
  site: 'https://www.x-on-x.com',
  trailingSlash: 'always',
  build: { format: 'directory' },
  integrations: [homeCases()],
});
