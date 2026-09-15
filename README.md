# X-ON-X website

**Live at https://www.x-on-x.com since 15.09.2026**, served by GitHub Pages from this repository. The apex `x-on-x.com` redirects to `www` (the same direction the old Webflow site used, so browsers holding its cached 301 do not loop), `http` redirects to `https`, and the Let's Encrypt certificate covers both names and renews itself. DNS stays at Domain.com: apex `A` records point at GitHub Pages (185.199.108–111.153), `www` is a `CNAME` to `x-on-x-com.github.io`; the mail records (MX, SPF, DKIM, DMARC) were not touched.

- `index.html` — desktop build (`home-standalone-real-headlines-insights-images.html`, 14.09.2026).
- `m.html` — mobile build (`home-standalone-final-mobile-v2.html`, 14.09.2026). Kept as a separate file on purpose: some hero elements are hidden on mobile and must not leak into the desktop layout.
- `img/` — the five client images from the Recent Matters cards, as WebP (221 KB for all five). They arrived inlined as base64 in the desktop build, which put it at 7.3 MB; both builds now reference the files instead, so each page is under 120 KB. The source PNGs were 1200x1600 with a fully opaque alpha channel and 5.4 MB together; re-encoded to RGB WebP at quality 90 they lose the dead alpha and measure 46-51 dB against the originals. The PNGs stay recoverable from commit 13c6582. The mobile build used stock photos in those five cards until 11.09.2026 and now shows the same images and alt text as desktop. Every new build arrives with the images inlined again, so the swap to `img/` has to be redone each time; the three stock-photo alt texts in the matter cards also arrive stale in the mobile build and are synced from desktop.

Both files carry a viewport switch in `<head>`: at 768px and below `index.html` sends you to `m.html`, above it `m.html` sends you back. Add `?full` to force the desktop build on a phone, `?m` to force the mobile build on a laptop.

The four "Come on in" buttons on desktop (nav, hero, closing, footer) and the five on mobile (the same four plus the burger menu) are links to https://t.me/yourxsolution. Everything else in the navigation is still intentionally wired to the "Content coming soon" modal.

Source files live in the Drive folder `1-Egx3PNQXMgmppVzOGh8rqH6NstU3fW2`.
