# X-ON-X site preview

Test deploy of the new home page on GitHub Pages, ahead of the move to the domain.

- `index.html` — desktop build (`home-standalone-real-headlines-insights-images.html`, 11.09.2026). Images are inlined as base64.
- `m.html` — mobile build (`home-standalone-final-mobile-v2.html`, 11.09.2026). Kept as a separate file on purpose: some hero elements are hidden on mobile and must not leak into the desktop layout.

Both files carry a viewport switch in `<head>`: at 768px and below `index.html` sends you to `m.html`, above it `m.html` sends you back. Add `?full` to force the desktop build on a phone, `?m` to force the mobile build on a laptop.

The four "Come on in" buttons on desktop (nav, hero, closing, footer) and the five on mobile (the same four plus the burger menu) are links to https://t.me/yourxsolution. Everything else in the navigation is still intentionally wired to the "Content coming soon" modal.

Source files live in the Drive folder `1-Egx3PNQXMgmppVzOGh8rqH6NstU3fW2`.
