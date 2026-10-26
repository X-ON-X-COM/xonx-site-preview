import type { APIRoute } from 'astro';
import { published, type Section } from '../lib';

// Home page, the two section pages, every published article. m.html stays out:
// it carries a canonical to the home page.
export const GET: APIRoute = async ({ site }) => {
  const rows: [string, Date | undefined][] = [['/', undefined]];
  for (const section of ['cases', 'insights'] as Section[]) {
    const entries = await published(section);
    rows.push([`/${section}/`, entries[0]?.data.date]);
    for (const e of entries) rows.push([`/${section}/${e.id}/`, e.data.updated ?? e.data.date]);
  }
  const body = rows
    .map(([path, d]) => `  <url><loc>${new URL(path, site).href}</loc>${d ? `<lastmod>${d.toISOString().slice(0, 10)}</lastmod>` : ''}</url>`)
    .join('\n');
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`,
    { headers: { 'Content-Type': 'application/xml' } },
  );
};
