# X-ON-X website

**Live at https://www.x-on-x.com since 15.09.2026**, served by GitHub Pages from this repository, built by Astro in GitHub Actions (`.github/workflows/deploy.yml`). The apex `x-on-x.com` redirects to `www` (the same direction the old Webflow site used, so browsers holding its cached 301 do not loop), `http` redirects to `https`, and the Let's Encrypt certificate covers both names and renews itself. DNS stays at Domain.com: apex `A` records point at GitHub Pages (185.199.108–111.153), `www` is a `CNAME` to `x-on-x-com.github.io`; the mail records (MX, SPF, DKIM, DMARC) were not touched.

- `public/index.html` — desktop build (`home-standalone-real-headlines-insights-images.html`, 14.09.2026).
- `public/m.html` — mobile build (`home-standalone-final-mobile-v2.html`, 14.09.2026). Kept as a separate file on purpose: some hero elements are hidden on mobile and must not leak into the desktop layout.
- `public/img/` — the five client images from the Recent Matters cards, as WebP (221 KB for all five). They arrived inlined as base64 in the desktop build, which put it at 7.3 MB; both builds now reference the files instead, so each page is under 120 KB. The source PNGs were 1200x1600 with a fully opaque alpha channel and 5.4 MB together; re-encoded to RGB WebP at quality 90 they lose the dead alpha and measure 46-51 dB against the originals. The PNGs stay recoverable from commit 13c6582. The mobile build used stock photos in those five cards until 11.09.2026 and now shows the same images and alt text as desktop. Every new build arrives with the images inlined again, so the swap to `img/` has to be redone each time; the three stock-photo alt texts in the matter cards also arrive stale in the mobile build and are synced from desktop.

Both files carry a viewport switch in `<head>`: at 768px and below `index.html` sends you to `m.html`, above it `m.html` sends you back. Add `?full` to force the desktop build on a phone, `?m` to force the mobile build on a laptop.

The four "Come on in" buttons on desktop (nav, hero, closing, footer) and the five on mobile (the same four plus the burger menu) are links to https://t.me/yourxsolution. Everything else in the navigation is still intentionally wired to the "Content coming soon" modal.

Source files live in the Drive folder `1-Egx3PNQXMgmppVzOGh8rqH6NstU3fW2`.

## Cases and Insights

Articles live in `src/content/cases/<slug>/index.md` and `src/content/insights/<slug>/index.md`, one folder per article with its images beside it; the folder name is the URL (`/insights/<slug>/`). Templates are in `src/components/`, styles in `src/styles/site.css`, fields in `src/content.config.ts`. A `draft: true` article is built only locally and never reaches the live site.

**Marketing edits them at https://www.x-on-x.com/admin/** (Sveltia CMS, config in `public/admin/config.yml`): sign in with GitHub, write, untick Draft, Publish. Each Publish is a commit to `main`, and the deploy workflow puts it live in about two minutes. If you add a field, add it in both `content.config.ts` and `config.yml`.

Every page gets its own title, description, canonical, Open Graph image (the cover, cropped to 1200x630), `Article` + `BreadcrumbList` JSON-LD, and an entry in `/sitemap.xml`, which Astro now generates (`src/pages/sitemap.xml.ts`).

**Cases are also the home page's Recent Matters.** Every published case is a card in that carousel (ordered by its "Order on home page" field), the side panel the card opens, and its own page at `/cases/<slug>/`, all from the one file in `src/content/cases/<slug>/`. Under each case, Related Matters shows three other cases picked at random on every open (`public/js/cases.js`). After the build, `scripts/home-cases.mjs` replaces only the tabs and cards of the Recent Matters section in the built `index.html` and `m.html` and adds the panels, with styles from `src/styles/cases.css`, `home-cards.css` and (desktop only) `home-cards-desktop.css`. The eight cases and the panel design came from the designer build `home-with-all-8-real-matters-v5.html` (04.11.2026). If a new home build arrives with case panels already inside it, the build stops and says so: take them out, the cases come from the CMS.

The home page is not built by Astro: `public/index.html` and `public/m.html` are copied byte for byte, so a new home build from the generator still goes straight into `public/`. Local preview: `npm install`, then `npm run dev` and open http://localhost:4321/insights/ (drafts show there); the admin needs `/admin/index.html` in dev.
