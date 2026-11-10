// Builds the Ukrainian site under /ua/ out of the finished English one.
// Runs after home-cases, so the home page already has its cases in it.
//
// Source of the translation: src/i18n/uk.md, the marketing table of
// "EN text on the live site -> UA text". Every text node and every alt /
// aria-label / title / meta content whose English matches a row is swapped;
// the markup, classes and scripts stay as they are. Whatever English is left
// over is listed in the build log, so a new phrase on the English site shows
// up there until a row for it is added to the table.
import { readFile, writeFile, mkdir, readdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const SITE = 'https://www.x-on-x.com';
const TABLE = new URL('../src/i18n/uk.md', import.meta.url);

// ---------- text normalisation ----------
const ENT = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ', rsquo: '’', lsquo: '‘',
  rdquo: '”', ldquo: '“', ndash: '–', mdash: '—', middot: '·', rarr: '→', larr: '←', hellip: '…',
  copy: '©', sect: '§', pound: '£', euro: '€', laquo: '«', raquo: '»', times: '×', bull: '•' };
const decode = (s) => s.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (m, e) => {
  if (e[0] === '#') return String.fromCodePoint(e[1] === 'x' || e[1] === 'X' ? parseInt(e.slice(2), 16) : +e.slice(1));
  return ENT[e.toLowerCase()] ?? m;
});
const encText = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const encAttr = (s) => encText(s).replace(/"/g, '&quot;');
// Key under which a phrase is looked up: quotes, dashes and spaces folded.
const key = (s) => s.normalize('NFC')
  .replace(/[‘’ʼ]/g, "'").replace(/[“”]/g, '"')
  .replace(/\s+[-–—]\s+/g, ' - ').replace(/[–—]/g, '-')
  .replace(/[ \s]+/g, ' ').replace(/︎|️/g, '').trim();

// ---------- the table ----------
const PREFIX = /^(?:Тег|Теги|Таб|Таби|Scope|Jurisdictions|Practice Areas|Client Profile|aria-label|Cases):\s*/;
const NOTE = /^\((?:mobile|попап)[^)]*\)\s*|\s*\((?:попап|хлібні)[^)]*\)\s*$/g;

function cells(line) {
  const out = []; let cur = '';
  for (let i = 1; i < line.length; i++) {
    if (line[i] === '\\' && line[i + 1] === '|') { cur += '|'; i++; continue; }
    if (line[i] === '|') { out.push(cur.trim()); cur = ''; continue; }
    cur += line[i];
  }
  return out;
}

export async function loadTable() {
  const md = await readFile(TABLE, 'utf8');
  const main = new Map();     // exact phrases from the table
  const parts = new Map();    // pieces of phrases (bold runs, "a / b", "a · b", codes stripped)
  const conflicts = [];
  const put = (map, en, ua, strict) => {
    const k = key(en);
    if (!k || !ua) return;
    if (map.has(k) && map.get(k) !== ua) {
      if (strict) conflicts.push([en, map.get(k), ua]);
      return; // first row wins; contextual ones are handled in CONTEXT below
    }
    map.set(k, ua);
  };
  let cols = null;
  for (const line of md.split('\n')) {
    if (!line.startsWith('|')) { cols = null; continue; }
    const c = cells(line);
    if (!cols) { cols = c; continue; }               // header row
    if (/^-+$/.test(c[0].replace(/\s/g, ''))) continue; // separator
    let [en, ua] = c.length >= 3 ? [c[1], c[2]] : [c[0], c[1]];
    if (!en || !ua || /без змін/.test(ua)) continue;
    en = en.replace(PREFIX, '').replace(NOTE, '');
    // "Cases (хлібні крихти …)"
    en = en.replace(/\s*\(.*\)\s*$/, '');
    if (/^aria-label: «/.test(c[0])) continue;
    const enSegs = en.split('**'); const uaSegs = ua.split('**');
    const enFlat = enSegs.join(''); const uaFlat = uaSegs.join('');
    put(main, enFlat, uaFlat, true);
    if (enSegs.length > 1 && enSegs.length === uaSegs.length) enSegs.forEach((s, i) => put(parts, s, uaSegs[i]));
    for (const sep of [' / ', ' · ', ' | ']) {
      const a = enFlat.split(sep); const b = uaFlat.split(sep);
      if (a.length > 1 && a.length === b.length) a.forEach((s, i) => put(parts, s, b[i]));
    }
    const code = /^((?:[BI]\/0\d|§ 0\d ·)\s+)/;
    if (code.test(enFlat) && code.test(uaFlat)) put(parts, enFlat.replace(code, ''), uaFlat.replace(code, ''));
  }
  return { main, parts, conflicts };
}

// Same English, different Ukrainian depending on where it stands.
// [English, Ukrainian, test on the markup right before the phrase]
const lastTag = (before) => before.slice(before.lastIndexOf('<'));
const CONTEXT = [
  // Table, sections 2 and 8: the header button says «Написати», the others «Заходьте».
  ['Come on in →', 'Написати →', (b) => /xx-nav/.test(b.slice(-260))],
  ['Come on in →', 'Заходьте →', () => true],
  // Section 3 (hero tiles) vs sections 5 and 9.
  ['Forming Partnerships', 'Партнерства', (b) => /xx-hero-tile__name/.test(lastTag(b))],
  // Section 6 heading vs the mobile hero line in section 3.
  ['We take charge', 'Беремо відповідальність', (b) => /xx-how-stat__number/.test(lastTag(b))],
  // Section 11.1: the brand names sit in their own tags, so the words between them do too.
  [' including ', ', зокрема ', () => true],
  [', and ', ' та ', (b) => /Gieves/.test(b.slice(-200))],
  // The modal picks one of two messages at random; the table translates only
  // the first, so on /ua/ both say the same.
  ['We’re working on it', 'Контент незабаром', () => true],
  ['Check back soon — this section is in progress.', 'Ця сторінка ще в роботі. Скоро все буде готово.', () => true],
];
const MONTHS = ['січня', 'лютого', 'березня', 'квітня', 'травня', 'червня', 'липня', 'серпня', 'вересня', 'жовтня', 'листопада', 'грудня'];
const MONTHS_EN = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

// Never translated, never reported.
const KEEP = /^(?:[\s\d.,:;!?%$£€+×·•→←↩/()&\-–—|"'’“”«»©#@]*|X-ON-X|EN|UA|EN · UA|BETTTER|UHNWI|Bazhane|Ma-Ko|MA-KO|Poynto|Atschool|AtSchool|Bettter|Defence-tech|Legal500|ITR|Forbes Next-250|SAFE|IP|EdTech|M&A|Due diligence|Due Diligence|[BI]\/0\d|§ 0\d|ok@x-on-x\.com|vk@x-on-x\.com|[a-z.]+@x-on-x\.com|UA, US, UK, EU|· UA|EN ·|FILA|DSQUARED2|Gieves & Hawkes|Harrods|LVMH|(?:X · ON · )+X ·(?: ON ·)?)$/;

// ---------- the translator ----------
const ATTRS = /\s(alt|aria-label|title|placeholder|content)="([^"]*)"/g;

function translator(table) {
  const left = new Map();
  const tr = (raw, before) => {
    const k = key(decode(raw));
    if (!k) return null;
    const raw1 = decode(raw).replace(/\s+/g, ' ');
    for (const [en, ua, test] of CONTEXT) {
      if ((k === key(en) || raw1 === en) && test(before)) return ua;
    }
    const hit = table.main.get(k) ?? table.parts.get(k);
    if (hit != null) return hit;
    let m;
    if ((m = k.match(/^(.+) \| X-ON-X$/))) { const u = tr(m[1], before); return u == null ? null : `${u} | X-ON-X`; }
    if ((m = k.match(/^\/ (.+)$/))) { const u = tr(m[1], before); return u == null ? null : `/ ${u}`; }
    if ((m = k.match(/^(\d{1,2}) (\w+) (\d{4})$/)) && MONTHS_EN.includes(m[2])) return `${m[1]} ${MONTHS[MONTHS_EN.indexOf(m[2])]} ${m[3]}`;
    return null;
  };
  const miss = (where, s) => {
    const t = key(decode(s));
    if (!/[A-Za-z]{2}/.test(t) || KEEP.test(t)) return;
    const k = `${where}: ${t}`;
    left.set(k, (left.get(k) || 0) + 1);
  };
  function html(src) {
    let out = ''; let i = 0;
    const re = /<(script|style)\b[^>]*>[\s\S]*?<\/\1>|<!--[\s\S]*?-->|<[^>]+>/gi;
    let m;
    while ((m = re.exec(src))) {
      const text = src.slice(i, m.index);
      out += textNode(text, out);
      out += tag(m[0]);
      i = re.lastIndex;
    }
    return out + textNode(src.slice(i), out);
  }
  function textNode(text, before) {
    if (!text.trim()) return text;
    const ua = tr(text, before);
    if (ua == null) { miss('text', text); return text; }
    const lead = text.match(/^\s*/)[0]; const tail = text.match(/\s*$/)[0];
    return lead + encText(ua) + tail;
  }
  // Inline scripts: only their quoted strings, and only the ones the table knows
  // (the "Content coming soon" modal builds its text in JavaScript).
  function script(t) {
    if (/^<script[^>]*(type="application\/ld\+json"|src=)/i.test(t)) return t;
    return t.replace(/'((?:[^'\\\n]|\\.)*)'/g, (all, body) => {
      const plain = body.replace(/\\u([0-9a-f]{4})/gi, (_, h) => String.fromCharCode(parseInt(h, 16))).replace(/\\(.)/g, '$1');
      let ua = /</.test(plain) ? null : tr(plain, '');
      if (ua == null && /</.test(plain)) { const h = html(plain); if (h !== plain) ua = h; }
      if (ua == null) return all;
      return `'${ua.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`;
    });
  }
  function tag(t) {
    if (/^<script/i.test(t)) return script(t);
    if (/^<(style|!--)/i.test(t)) return t;
    if (/^<meta\b/i.test(t) && !/(name|property)="(description|og:title|og:description|twitter:title|twitter:description)"/.test(t)) return t;
    return t.replace(ATTRS, (all, name, val) => {
      if (!val.trim() || (name === 'content' && !/^<meta/i.test(t))) return all;
      const ua = tr(val, '');
      if (ua == null) { miss(name, val); return all; }
      return ` ${name}="${encAttr(ua)}"`;
    });
  }
  // The <title> is a text node like any other, handled above.
  return { html, tr, left };
}

// ---------- page-level changes ----------
const switcherEn = (uaHref) => `<span class="xx-lang"><strong>EN</strong> &middot; <a href="${uaHref}" hreflang="uk" lang="uk" style="color:inherit;text-decoration:none">UA</a></span>`;
const switcherUa = (enHref) => `<span class="xx-lang"><a href="${enHref}" hreflang="en" lang="en" style="color:inherit;text-decoration:none">EN</a> &middot; <strong>UA</strong></span>`;
const SWITCH = /<span class="xx-lang"><strong>EN<\/strong> &middot; UA<\/span>/g;

function alternates(enPath, uaPath) {
  return `<link rel="alternate" hreflang="en" href="${SITE}${enPath}">\n`
    + `<link rel="alternate" hreflang="uk" href="${SITE}${uaPath}">\n`
    + `<link rel="alternate" hreflang="x-default" href="${SITE}${enPath}">\n`;
}

// The English page: a working switcher and hreflang links.
function enPage(src, enPath, uaPath, uaLink) {
  if (!src.includes('<span class="xx-lang"><strong>EN</strong> &middot; UA</span>')) throw new Error(`ua: no language switcher on ${enPath}`);
  src = src.replace(SWITCH, switcherEn(uaLink));
  src = src.replace('</head>', () => alternates(enPath, uaPath) + '</head>');
  return src;
}

function uaPage(src, t, enPath, uaPath, enLink) {
  let out = t.html(src);
  out = out.replace(/<html lang="en">/, '<html lang="uk">');
  // Relative asset paths (img/…, js/…) would point into /ua/; make them absolute.
  out = out.replace(/(\s(?:src|srcset|poster)=")(?![a-z]+:|\/|#)([^"]+)"/gi, '$1/$2"');
  // Links inside the site that have a Ukrainian page.
  out = out.replace(/href="\/(#[^"]*)?"/g, (_, h) => `href="/ua/${h ?? ''}"`);
  out = out.replace(/href="\/cases\/([^"]*)"/g, 'href="/ua/cases/$1"');
  out = out.replace(SWITCH, switcherUa(enLink));
  // Canonical and og:url point at the Ukrainian address.
  out = out.replace(/(<link rel="canonical" href=")[^"]*"/, `$1${SITE}${uaPath}"`);
  out = out.replace(/(<meta property="og:url" content=")[^"]*"/, `$1${SITE}${uaPath}"`);
  out = out.replace(/(<link rel="alternate" media="[^"]*" href=")https:\/\/www\.x-on-x\.com\/m\.html"/, `$1${SITE}/ua/m.html"`);
  out = out.replace(/(<meta property="og:site_name"[^>]*>)/, '$1\n<meta property="og:locale" content="uk_UA">\n<meta property="og:locale:alternate" content="en_GB">');
  out = out.replace('</head>', () => alternates(enPath, uaPath) + '</head>');
  out = out.replace(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g, (all, json) => {
    let data; try { data = JSON.parse(json); } catch { return all; }
    const walk = (v) => {
      if (Array.isArray(v)) return v.map(walk);
      if (v && typeof v === 'object') {
        for (const k of Object.keys(v)) {
          if (k === 'inLanguage') v[k] = 'uk';
          else if (['description', 'headline', 'name'].includes(k) && typeof v[k] === 'string') v[k] = t.tr(v[k], '') ?? v[k];
          else if (['url', 'item', 'mainEntityOfPage'].includes(k) && typeof v[k] === 'string') {
            v[k] = v[k].replace(/^https:\/\/www\.x-on-x\.com\/(cases\/|$)/, (m, p) => `${SITE}/ua/${p}`);
          } else v[k] = walk(v[k]);
        }
        if (v['@type'] === 'Organization' || v['@type'] === 'WebSite' || v['@type'] === 'WebPage') {
          if (!('inLanguage' in v) && v['@type'] !== 'Organization') v.inLanguage = 'uk';
        }
        return v;
      }
      return v;
    };
    data = walk(data);
    if (data['@graph']) {
      for (const n of data['@graph']) if (n['@type'] === 'Organization' && n.url) n.url = `${SITE}/`; // the firm itself stays one entity
    }
    const pretty = json.includes('\n');
    return `<script type="application/ld+json">${pretty ? '\n' + JSON.stringify(data, null, 1) + '\n' : JSON.stringify(data)}</script>`;
  });
  return out;
}

// Case pages and the cases list come from Base.astro, which has no switcher.
function addSwitcher(src, html) {
  return src.replace(/(<\/nav>\s*)(<a class="xx-btn xx-btn--primary xx-btn--sm")/, `$1${html}\n  $2`);
}

export default function ua() {
  return {
    name: 'ua',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        const root = fileURLToPath(dir);
        const table = await loadTable();
        for (const [en, a, b] of table.conflicts) {
          const bare = key(en).replace(/^(?:[BI]\/0\d|§ 0\d ·)\s+/, '');
          if (!CONTEXT.some(([e]) => key(e) === bare)) logger.warn(`table: "${en}" has two translations, "${a}" is used everywhere ("${b}" ignored)`);
        }
        const t = translator(table);
        const pages = [
          ['/', 'index.html', '/ua/', '/ua/', '/'],
          // m.html carries the home page's canonical; so does its Ukrainian copy.
          ['/', 'm.html', '/ua/', '/ua/m.html', '/m.html'],
          ['/cases/', 'cases/index.html', '/ua/cases/', '/ua/cases/', '/cases/'],
        ];
        for (const slug of await readdir(`${root}cases`, { withFileTypes: true })) {
          if (slug.isDirectory()) pages.push([`/cases/${slug.name}/`, `cases/${slug.name}/index.html`, `/ua/cases/${slug.name}/`, `/ua/cases/${slug.name}/`, `/cases/${slug.name}/`]);
        }
        for (const [enPath, file, uaPath, uaLink, enLink] of pages) {
          const enFile = `${root}${file}`;
          let src = await readFile(enFile, 'utf8');
          const home = file === 'index.html' || file === 'm.html';
          if (!home) {
            src = addSwitcher(src, '<span class="xx-lang"><strong>EN</strong> &middot; UA</span>');
          }
          const uaSrc = uaPage(src, t, enPath, uaPath, enLink);
          await writeFile(enFile, enPage(src, enPath, uaPath, uaLink));
          const out = `${root}ua/${file}`;
          await mkdir(out.slice(0, out.lastIndexOf('/')), { recursive: true });
          await writeFile(out, uaSrc);
        }
        // Sitemap: a Ukrainian row after every page that has one.
        const smPath = `${root}sitemap.xml`;
        const sm = await readFile(smPath, 'utf8');
        await writeFile(smPath, sm.replace(/  <url><loc>https:\/\/www\.x-on-x\.com\/((?:cases\/[^<]*)?)<\/loc>(.*?)<\/url>\n/g,
          (row, p, rest) => `${row}  <url><loc>${SITE}/ua/${p}</loc>${rest}</url>\n`));
        logger.info(`${pages.length} pages in Ukrainian under /ua/`);
        if (t.left.size) {
          logger.warn(`${t.left.size} English phrases have no row in src/i18n/uk.md and stay in English on /ua/:`);
          for (const [k, n] of [...t.left].sort()) logger.warn(`  ${k}${n > 1 ? `  (×${n})` : ''}`);
        }
      },
    },
  };
}
