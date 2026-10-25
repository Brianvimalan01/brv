import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Names that a case can list under `illustrations:`. Each maps to an SVG
// component in src/components/illustrations (see src/lib/illustrations.ts).
export const illustrationNames = [
  'stat-counters',
  'workstream-wheel',
  'migration-lifecycle',
  'integration-hub',
  'golive-timeline',
  'incident-lifecycle',
] as const;

const cases = defineCollection({
  // Files starting with "_" (e.g. _TEMPLATE.md) are ignored.
  loader: glob({ pattern: ['**/*.md', '!**/_*.md'], base: './src/content/cases' }),
  schema: z.object({
    title: z.string(),
    shortTitle: z.string().optional(),
    sector: z.string(),
    location: z.string(),
    roles: z.array(z.string()),
    duration: z.string().optional(),
    summary: z.string(),
    // One friendly line for the project card on the home and portfolio pages.
    tagline: z.string(),
    // Optional photo in public/ (e.g. /images/erp-workshop.jpg) shown on the card and case page.
    cover: z.string().optional(),
    coverAlt: z.string().default(''),
    services: z.array(z.string()).default([]),
    stats: z.array(z.object({ value: z.string(), label: z.string() })).default([]),
    illustrations: z.array(z.enum(illustrationNames)).default([]),
    order: z.number().default(99),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

const hobbies = defineCollection({
  loader: glob({ pattern: ['**/*.md', '!**/_*.md'], base: './src/content/hobbies' }),
  schema: z.object({
    title: z.string(),
    tagline: z.string(),
    icon: z.enum(['runner', 'mountain']),
    order: z.number().default(99),
    highlights: z.array(z.string()).default([]),
    // Photos in public/ (e.g. /images/running-race.jpg); the first one is the cover.
    photos: z.array(z.object({ src: z.string(), alt: z.string(), caption: z.string().optional() })).default([]),
  }),
});

const pages = defineCollection({
  loader: glob({ pattern: ['*.md'], base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    eyebrow: z.string().optional(),
    lead: z.string().optional(),
  }),
});

export const collections = { cases, hobbies, pages };
