import { getCollection } from 'astro:content';

export type Section = 'insights' | 'cases';

export const SECTIONS: Record<Section, { name: string; lede: string }> = {
  insights: { name: 'Insights', lede: 'Notes from our cross-border legal, tax and structuring work.' },
  cases: { name: 'Cases', lede: 'Matters we have taken charge of, and how they turned out.' },
};

// Drafts show up under `npm run dev` and never on the live site.
export async function published(section: Section) {
  const all = await getCollection(section, (e) => import.meta.env.DEV || !e.data.draft);
  return all.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export const fmtDate = (d: Date) =>
  d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
