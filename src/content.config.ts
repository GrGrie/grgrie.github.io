import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

// One Markdown file in src/content/projects/ = one card on /projects/
// and its own page at /projects/<file name>/.
const projects = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      cover: image().optional(),
      repo: z.string().url().optional(),
      // Shown as a facts strip under the lead; all optional.
      role: z.string().optional(),
      stack: z.array(z.string()).optional(),
      status: z.string().optional(),
      order: z.number().default(100),
    }),
});

export const collections = { projects };
