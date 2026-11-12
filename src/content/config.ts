import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    // Language of this entry. A Spanish entry points to its English original via `translationOf` (the original's slug).
    lang: z.enum(["en", "es"]).default("en"),
    translationOf: z.string().optional(),
    heroImage: z.string().optional(),
  }),
});

export const collections = { blog };
