---
title: "Building a Blog with Astro Content Collections"
description: "How this blog is built using typed Markdown content and static generation."
pubDate: 2026-02-02
tags: ["astro", "markdown"]
---

Astro **Content Collections** give you type-safe frontmatter and static pages for free.

## The idea

1. Define a schema with [Zod](https://zod.dev).
2. Drop Markdown files in `src/content/blog`.
3. Generate one page per entry with `getStaticPaths`.

| Piece | Responsibility |
| --- | --- |
| `content/config.ts` | Schema validation |
| `pages/blog/index.astro` | Post listing |
| `pages/blog/[...slug].astro` | Post rendering |

Inline `code` and lists look good in both light and dark themes.
