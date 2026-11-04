import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// One folder per article: src/content/<section>/<slug>/index.md, with its
// images next to it. The folder name is the URL.
const folder = (base: string) =>
  glob({ pattern: '*/index.md', base, generateId: ({ entry }) => entry.split('/')[0] });

const common = ({ image }: { image: () => any }) => ({
  title: z.string(),
  // What Google shows under the title. Past ~160 characters it gets cut.
  description: z.string().max(200),
  date: z.coerce.date(),
  updated: z.coerce.date().optional(),
  cover: image(),
  coverAlt: z.string(),
  author: z.string().default('X-ON-X'),
  tags: z.array(z.string()).default([]),
  draft: z.boolean().default(false),
});

const insights = defineCollection({
  loader: folder('./src/content/insights'),
  schema: (ctx) => z.object(common(ctx)),
});

// A case is also a card in the home page's "Recent Matters" carousel and the
// side panel that opens from it; scripts/home-cases.mjs puts them there at build.
const figure = z.object({ number: z.string(), label: z.string() });
const cases = defineCollection({
  loader: folder('./src/content/cases'),
  schema: (ctx) =>
    z.object({
      ...common(ctx),
      client: z.string().optional(),
      sector: z.string().optional(),
      order: z.number().default(100),
      tab: z.string(),
      category: z.string(),
      cardCategory: z.string().optional(),
      cardStat: figure,
      keyFigure: figure,
      overview: z.object({
        scope: z.string(),
        jurisdictions: z.string(),
        practiceAreas: z.string(),
        clientProfile: z.string(),
      }),
      cta: z.object({ title: z.string(), text: z.string() }),
      coverPosition: z.string().default('center 70%'),
      coverPositionMobile: z.string().optional(),
      anonymous: z.boolean().default(false),
    }),
});

export const collections = { insights, cases };
