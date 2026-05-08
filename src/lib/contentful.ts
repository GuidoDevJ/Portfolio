import type { Project } from "src/constants/projects";

const SPACE_ID = import.meta.env.CONTENTFUL_SPACE_ID;
const ACCESS_TOKEN = import.meta.env.CONTENTFUL_ACCESS_TOKEN;

interface ContentfulItem {
  sys: { id: string };
  fields: {
    titulo: string;
    description?: string;
    tech?: string;
    githubLink?: string;
    url?: string;
  };
}

interface ContentfulResponse {
  items: ContentfulItem[];
}

export async function fetchContentfulProjects(): Promise<Project[]> {
  try {
    const res = await fetch(
      `https://cdn.contentful.com/spaces/${SPACE_ID}/entries?content_type=work`,
      {
        headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
      }
    );

    if (!res.ok) {
      console.error(`[Contentful] Error: ${res.status}`);
      return [];
    }

    const data: ContentfulResponse = await res.json();

    return data.items.map((item) => ({
      id: item.sys.id,
      title: item.fields.titulo,
      description: item.fields.description ?? "",
      image: "",
      techStack: item.fields.tech
        ? item.fields.tech.split(",").map((t) => t.trim()).filter(Boolean)
        : [],
      githubUrl: item.fields.githubLink,
      liveUrl: item.fields.url,
    }));
  } catch (err) {
    console.error("[Contentful] Failed to fetch projects:", err);
    return [];
  }
}
