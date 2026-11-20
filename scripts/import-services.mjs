// One-off importer for the designer's service pages. Run it by hand whenever a
// new prototype arrives:
//
//   node scripts/import-services.mjs ~/Downloads/prototype-combined_vN.html
//
// The prototype is one HTML file that keeps every page as a string (var P) and
// every picture as a data URI (var IMG). Only the eight service pages are taken;
// the home page and the industry pages in it are ignored. Each service page is
// written to public/services/<slug>/index.html with:
//   - pictures moved to public/services/img/*.webp (hero 2000px, team 800px);
//   - the prototype's own case popups, review-comment code and iframe
//     navigation removed (the cases come from the CMS: scripts/home-cases.mjs
//     puts them into the Recent Matters section after every build);
//   - real links: home, the other services, Telegram CTAs, mailto;
//   - the same head as the home page (CSP, referrer, icons, canonical, og);
//   - the home page's "Content coming soon" modal for nav items with no page;
//   - the language switch kept visible on phones.
// Everything else is the designer's markup and CSS, byte for byte.
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import sharp from 'sharp';

const SITE = 'https://www.x-on-x.com';
const TG = 'https://t.me/yourxsolution';

export const SERVICES = [
  ['service-entering-new-market-standalone.html', 'entering-new-market', 'Entering a New Market'],
  ['service-fundraising-standalone.html', 'fundraising', 'Fundraising'],
  ['service-buyingselling-standalone.html', 'buying-selling-assets', 'Buying or Selling Assets'],
  ['service-partnerships-standalone.html', 'forming-partnerships', 'Forming Partnerships'],
  ['service-business-ownership-standalone.html', 'business-ownership', 'Business Ownership'],
  ['service-relocation-standalone.html', 'relocation', 'Relocation'],
  ['service-investment-portfolio-standalone.html', 'investment-portfolio', 'Investment Portfolio'],
  ['service-succession-standalone.html', 'succession', 'Succession'],
];
const BY_TITLE = Object.fromEntries(SERVICES.map(([, slug, title]) => [title, slug]));

const root = new URL('..', import.meta.url).pathname;
const src = process.argv[2];
if (!src) { console.error('usage: node scripts/import-services.mjs <prototype.html>'); process.exit(1); }

// ---------- read the prototype without running it ----------
const proto = await readFile(src, 'utf8');
function jsonAfter(marker, open, close) {
  const at = proto.indexOf(marker);
  if (at < 0) throw new Error(`no ${marker} in the prototype`);
  let i = at + marker.length, depth = 0, inStr = false, esc = false;
  const start = i;
  for (; i < proto.length; i++) {
    const c = proto[i];
    if (inStr) { if (esc) esc = false; else if (c === '\\') esc = true; else if (c === '"') inStr = false; continue; }
    if (c === '"') inStr = true;
    else if (c === open) depth++;
    else if (c === close && --depth === 0) break;
  }
  return JSON.parse(proto.slice(start, i + 1));
}
const IMG = jsonAfter('var IMG=', '[', ']');
const P = jsonAfter('var P=', '{', '}');

// ---------- pieces shared with the home page ----------
const home = await readFile(`${root}public/index.html`, 'utf8');
const wipCss = home.match(/\/\* ═+\s*\n\s*WIP POPUP[\s\S]*?\.xx-wip-modal__tag \{[^}]*\}/)?.[0];
const wipJs = home.match(/\/\/ ── WIP Popup \(self-contained\) ──[\s\S]*?\}, true\);\n\}\);/)?.[0];
if (!wipCss || !wipJs) throw new Error('could not find the "coming soon" modal in public/index.html');

// ---------- pictures ----------
const imgDir = `${root}public/services/img`;
await mkdir(imgDir, { recursive: true });
const written = new Map();
async function picture(i, name, width) {
  const file = `${name}.webp`;
  if (!written.has(file)) {
    const b64 = IMG[i].slice(IMG[i].indexOf(',') + 1);
    await sharp(Buffer.from(b64, 'base64')).rotate()
      .resize({ width, withoutEnlargement: true }).webp({ quality: 80 }).toFile(`${imgDir}/${file}`);
    written.set(file, i);
  } else if (written.get(file) !== i) throw new Error(`${file}: two different pictures want this name`);
  return `/services/img/${file}`;
}
const slugify = (s) => s.toLowerCase().normalize('NFKD').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

function must(html, re, what, slug) {
  if (!re.test(html)) throw new Error(`${slug}: ${what} not found, the designer's markup changed`);
}

const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
const text = (s) => s.replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&rsquo;|&#8217;/g, '’')
  .replace(/&[a-z]+;/g, ' ').replace(/\s+/g, ' ').trim();

for (const [key, slug, title] of SERVICES) {
  let h = P[key];
  if (!h) throw new Error(`the prototype has no ${key}`);

  // Pictures. The hero is the background of .xx-hero-wrap; the rest are the team.
  const heroIdx = h.match(/\.xx-hero-wrap[^{]*\{[^}]*url\("__XIMG_(\d+)__"\)/)?.[1]
    ?? h.match(/\.xx-hero-wrap::before\s*\{[^}]*url\("__XIMG_(\d+)__"\)/)?.[1];
  if (!heroIdx) throw new Error(`${slug}: no hero picture`);
  const heroUrl = await picture(+heroIdx, slug, 2000);
  h = h.split(`__XIMG_${heroIdx}__`).join(heroUrl);

  // Case popups and the backdrop: from the backdrop to the first script after it.
  h = h.replace(/<div class="popup-backdrop"[\s\S]*?(?=<script>)/, '');
  // The designer's scripts: popups, showcase + review comments, prototype
  // navigation, industry links. Keep only initShowcase.
  const showcase = h.match(/function initShowcase\(name, interval\) \{[\s\S]*?\n\}/)?.[0];
  if (!showcase) throw new Error(`${slug}: initShowcase not found`);
  h = h.replace(/<script[^>]*>[\s\S]*?<\/script>\s*/g, '');

  // Recent Matters cards still carry the prototype's covers; the build replaces
  // the whole track with the CMS cases, so they only need to be harmless here.
  h = h.replace(/(<div class="xx-pcard__media"><img src=")(?:__XIMG_\d+__|https:\/\/images\.unsplash\.com[^"]*)"/g, '$1data:,"');
  // Team photos (inside the Your Team cards and the closing block).
  for (const m of [...h.matchAll(/__XIMG_(\d+)__" alt="([^"]+)"/g)]) {
    h = h.split(`__XIMG_${m[1]}__`).join(await picture(+m[1], slugify(m[2]), 800));
  }
  if (/__XIMG_/.test(h)) throw new Error(`${slug}: a picture is left unplaced: ${h.match(/.{80}__XIMG_\d+__/)[0]}`);
  if (/unsplash\.com/.test(h)) throw new Error(`${slug}: an Unsplash link is left`);

  // ---------- links ----------
  must(h, /<div class="xx-nav__brand">/, 'nav brand', slug);
  h = h.replace(/<div class="xx-nav__brand">([\s\S]*?)<\/div>/, '<a class="xx-nav__brand" href="/" aria-label="X-ON-X home" style="color:inherit;text-decoration:none">$1</a>');
  h = h.replace(/(<a class="xx-nav__link[^"]*") href="#what-we-do"/g, '$1 href="/#what-we-do"');
  // Burger menu: real targets, and only "close the menu" left in the onclick.
  h = h.replace(/<a href="#" onclick="this\.parentElement\.classList\.remove\('open'\);window\.parent\.postMessage[^"]*">What We Do<\/a>/,
    '<a href="/#what-we-do" onclick="this.parentElement.classList.remove(\'open\')">What We Do</a>');
  h = h.replace(/onclick="this\.parentElement\.classList\.remove\('open'\);return false;"/g, 'onclick="this.parentElement.classList.remove(\'open\')"');
  if (/postMessage/.test(h)) throw new Error(`${slug}: prototype navigation is left in the markup`);
  // Related services cards and the footer's Services column.
  h = h.replace(/<a class="xx-trigger-btn" href="#">([\s\S]*?<h3 class="xx-trigger-btn__title">([^<]+)<\/h3>)/g, (all, body, t) => {
    const s = BY_TITLE[t.trim()];
    if (!s) throw new Error(`${slug}: related service "${t}" has no page`);
    return `<a class="xx-trigger-btn" href="/services/${s}/">${body}`;
  });
  h = h.replace(/<a href="#">([^<]+)<\/a>/g, (all, t) => (BY_TITLE[t.trim()] ? `<a href="/services/${BY_TITLE[t.trim()]}/">${t}</a>` : all));
  h = h.replace(/<a href="#"( style="[^"]*")?>ok@x-on-x\.com<\/a>/g, '<a href="mailto:ok@x-on-x.com"$1>ok@x-on-x.com</a>');
  // CTAs: buttons become Telegram links (a button would hit the "coming soon" modal).
  h = h.replace(/<button class="(xx-btn [^"]*)"((?: type="button")?)((?: onclick="[^"]*")?)>([^<]*)<\/button>/g,
    (all, cls, type, onclick, label) => `<a class="${cls}" href="${TG}" target="_blank" rel="noopener noreferrer"${onclick}>${label}</a>`);

  // Language switch: the Ukrainian pages of the services do not exist yet, so UA
  // leads to the Ukrainian home page. Visible on phones too (the designer hid it).
  must(h, /<span class="xx-lang"><strong>EN<\/strong> &middot; UA<\/span>/, 'language switch', slug);
  h = h.replace(/<span class="xx-lang"><strong>EN<\/strong> &middot; UA<\/span>/,
    '<span class="xx-lang"><strong>EN</strong> &middot; <a href="/ua/" hreflang="uk" lang="uk" style="color:inherit;text-decoration:none">UA</a></span>');

  // ---------- head ----------
  const lede = text(h.match(/<p class="xx-how-stats__body"[^>]*>([\s\S]*?)<\/p>/)?.[1] ?? '');
  const description = lede.length > 160 ? lede.slice(0, lede.lastIndexOf(' ', 157)) + '…' : lede;
  const url = `${SITE}/services/${slug}/`;
  const pageTitle = `X-ON-X | ${title}`;
  const head = `<meta charset="UTF-8">
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; img-src 'self' data:; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; script-src 'self' 'unsafe-inline'; connect-src 'none'; object-src 'none'; base-uri 'none'; form-action 'none'; upgrade-insecure-requests">
<meta name="referrer" content="strict-origin-when-cross-origin">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(pageTitle)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${url}">
<link rel="icon" href="/favicon.ico?v=20260916d" sizes="32x32">
<link rel="icon" href="/favicon.svg?v=20260916d" type="image/svg+xml">
<link rel="apple-touch-icon" href="/img/apple-touch-icon.png?v=20260916d">
<meta name="theme-color" content="#FAFAF5">
<meta property="og:type" content="website">
<meta property="og:site_name" content="X-ON-X">
<meta property="og:url" content="${url}">
<meta property="og:title" content="${esc(pageTitle)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:image" content="${SITE}/img/og.jpg?v=20260916h">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:type" content="image/jpeg">
<meta name="twitter:card" content="summary_large_image">`;
  must(h, /<meta charset="UTF-8">\s*<meta name="viewport"[^>]*>\s*<title>[^<]*<\/title>/, 'head', slug);
  h = h.replace(/<meta charset="UTF-8">\s*<meta name="viewport"[^>]*>\s*<title>[^<]*<\/title>/, () => head);

  const extraCss = `
/* ── Added on import (scripts/import-services.mjs) ── */
${wipCss}
/* The language switch stays on phones, next to the burger. */
@media (max-width: 920px) {
  .xx-nav__right .xx-lang { display: inline-block !important; margin-right: 14px; }
}
`;
  h = h.replace('</head>', () => `<style>${extraCss}</style>\n</head>`);

  const script = `<script>
${showcase}
document.addEventListener('DOMContentLoaded', function() {
  initShowcase('evidence', 5000);
});

${wipJs}
</script>
`;
  const end = h.lastIndexOf('</body>');
  h = h.slice(0, end) + script + h.slice(end);

  const dir = `${root}public/services/${slug}`;
  await mkdir(dir, { recursive: true });
  await writeFile(`${dir}/index.html`, h);
  console.log(`${slug}: ${Math.round(h.length / 1024)} KB, hero ${heroUrl}`);
}
console.log(`${written.size} pictures in public/services/img/`);
