import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog', generateId: ({ entry }) => entry.replace(/\.md$/, '') }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    lang: z.enum(['en', 'zh']).default('en'),
    author: z.string().default('PicoClaw Team'),
    image: z.string().optional(),
    imageWidth: z.number().optional(),
    slug: z.string().optional(),
  }),
});

export const collections = { blog };
