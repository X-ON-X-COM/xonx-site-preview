// Puts the cases from src/content/cases into the home page after every build:
// the tabs and cards of the "Recent Matters" carousel and the side panel each
// card opens. The home builds in public/ stay as the designer delivered them;
// only these parts are replaced, in the built copies under dist/.
import { readFile, writeFile, rm } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const FRAGMENT = 'home-cases-fragment';
const css = (name) => readFile(new URL(`../src/styles/${name}`, import.meta.url), 'utf8');

function part(html, name) {
  const m = html.match(new RegExp(`<!--cases:${name}-->([\\s\\S]*?)<!--/cases:${name}-->`));
  if (!m) throw new Error(`home-cases: fragment has no "${name}" part`);
  return m[1].trim();
}

function inject(html, file, { tabs, cards, panels, style }) {
  if (/class="popup[ "]/.test(html)) {
    throw new Error(`home-cases: ${file} already has case panels in it. Take them out of the home build; the cases come from the CMS.`);
  }
  const start = html.search(/<div class="xx-showcase[^"]*" data-showcase="evidence">/);
  if (start < 0) throw new Error(`home-cases: ${file} has no Recent Matters section (data-showcase="evidence")`);
  const head = html.slice(0, start);
  let section = html.slice(start);
  const before = section;
  // Replacer functions, not strings: a "$10 mln" in a case would read as $1.
  section = section.replace(/(<div class="xx-showcase__tabs">)[\s\S]*?(<\/div>)/, (_, a, b) => `${a}\n${tabs}\n    ${b}`);
  section = section.replace(/(<div class="xx-showcase__track">)[\s\S]*?<\/a>\s*(<\/div>)/, (_, a, b) => `${a}\n${cards}\n    ${b}`);
  if (section === before) throw new Error(`home-cases: ${file}: could not find the tabs and the track`);
  html = head + section;
  html = html.replace('</head>', () => `<style>\n${style}\n</style>\n</head>`);
  const i = html.lastIndexOf('</body>');
  return html.slice(0, i) + `${panels}\n<script src="/js/cases.js?v=20261104a" defer></script>\n` + html.slice(i);
}

export default function homeCases() {
  return {
    name: 'home-cases',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        const root = fileURLToPath(dir);
        const fragDir = `${root}${FRAGMENT}`;
        const frag = await readFile(`${fragDir}/index.html`, 'utf8');
        const parts = { tabs: part(frag, 'tabs'), cards: part(frag, 'cards'), panels: part(frag, 'panels') };
        const common = (await css('cases.css')) + '\n' + (await css('home-cards.css'));
        const desktopOnly = await css('home-cards-desktop.css');
        for (const [file, style] of [['index.html', common + '\n' + desktopOnly], ['m.html', common]]) {
          const path = `${root}${file}`;
          await writeFile(path, inject(await readFile(path, 'utf8'), file, { ...parts, style }));
        }
        await rm(fragDir, { recursive: true });
        const n = (parts.cards.match(/class="xx-pcard"/g) || []).length;
        logger.info(`${n} cases placed on index.html and m.html`);
      },
    },
  };
}
