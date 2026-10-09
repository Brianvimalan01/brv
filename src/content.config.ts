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
    icon: z.enum(['runner', 'mountain', 'futsal']),
    order: z.number().default(99),
    highlights: z.array(z.string()).default([]),
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

const capabilities = defineCollection({
  loader: glob({ pattern: ['*.md'], base: './src/content/capabilities' }),
  schema: z.object({
    title: z.string(),
    order: z.number(),
    icon: z.enum(['strategy', 'pmo', 'analysis', 'data', 'vendor', 'risk', 'tools']),
    items: z.array(z.string()),
  }),
});

export const collections = { cases, hobbies, pages, capabilities };
