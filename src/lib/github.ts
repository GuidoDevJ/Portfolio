import type { Project, ProjectLanguage } from "src/constants/projects";

const GITHUB_TOKEN = import.meta.env.GITHUB_TOKEN;
const GITHUB_USERNAME = import.meta.env.GITHUB_USERNAME || "GuidoDevJ";

// ─── GraphQL types ────────────────────────────────────────────────────────────

interface GQLLanguageEdge {
  size: number;
  node: { name: string; color: string };
}

interface GQLRepo {
  id: string;
  name: string;
  description: string | null;
  url: string;
  homepageUrl: string | null;
  pushedAt: string;
  primaryLanguage: { name: string; color: string } | null;
  repositoryTopics: { nodes: { topic: { name: string } }[] };
  languages: { edges: GQLLanguageEdge[]; totalSize: number };
  stargazerCount: number;
  object: { text: string } | null;
  openGraphImageUrl: string;
}

// ─── GraphQL query ────────────────────────────────────────────────────────────

const PINNED_REPOS_QUERY = `
  query PinnedRepos($login: String!) {
    user(login: $login) {
      pinnedItems(first: 6, types: REPOSITORY) {
        nodes {
          ... on Repository {
            id
            name
            description
            url
            homepageUrl
            pushedAt
            primaryLanguage { name color }
            repositoryTopics(first: 10) {
              nodes { topic { name } }
            }
            languages(first: 8, orderBy: { field: SIZE, direction: DESC }) {
              edges { size node { name color } }
              totalSize
            }
            stargazerCount
            object(expression: "HEAD:README.md") {
              ... on Blob { text }
            }
            openGraphImageUrl
          }
        }
      }
    }
  }
`;

// ─── Helpers ──────────────────────────────────────────────────────────────────

function buildHeaders(bearer = false): Record<string, string> {
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (GITHUB_TOKEN) {
    headers["Authorization"] = bearer
      ? `bearer ${GITHUB_TOKEN}`
      : `token ${GITHUB_TOKEN}`;
  }
  return headers;
}

function mapLanguages(edges: GQLLanguageEdge[], totalSize: number): ProjectLanguage[] {
  if (!edges.length || totalSize === 0) return [];
  return edges.map((e) => ({
    name: e.node.name,
    color: e.node.color || "#ccc",
    percentage: Math.round((e.size / totalSize) * 1000) / 10,
  }));
}

function slugToTitle(name: string): string {
  return name.replace(/[-_]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

function mapGQLRepoToProject(repo: GQLRepo): Project {
  const topics = repo.repositoryTopics.nodes.map((n) => n.topic.name);
  // Si hay topics los usamos como techStack. Si no, dejamos vacío:
  // los lenguajes ya se muestran en la barra de lenguajes, no duplicar.
  const techStack = topics.length > 0 ? topics : [];

  return {
    id: repo.id,
    title: slugToTitle(repo.name),
    description: repo.description || "No description available.",
    image: repo.openGraphImageUrl,
    techStack,
    liveUrl: repo.homepageUrl || undefined,
    githubUrl: repo.url,
    stars: repo.stargazerCount,
    language: repo.primaryLanguage?.name,
    languageColor: repo.primaryLanguage?.color,
    languages: mapLanguages(repo.languages.edges, repo.languages.totalSize),
    readme: repo.object?.text ?? undefined,
    pushedAt: repo.pushedAt,
  };
}

// ─── REST fallback ────────────────────────────────────────────────────────────

async function fetchReadme(repoName: string): Promise<string | undefined> {
  try {
    const res = await fetch(
      `https://api.github.com/repos/${GITHUB_USERNAME}/${repoName}/readme`,
      { headers: buildHeaders() }
    );
    if (!res.ok) return undefined;
    const data = await res.json();
    // GitHub returns base64-encoded content
    return Buffer.from(data.content.replace(/\n/g, ""), "base64").toString("utf-8");
  } catch {
    return undefined;
  }
}

async function fetchTopRepos(): Promise<Project[]> {
  try {
    const res = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=pushed&per_page=30&type=public`,
      { headers: buildHeaders() }
    );
    if (!res.ok) throw new Error(`GitHub REST error: ${res.status}`);

    const allRepos: any[] = await res.json();

    // Excluir forks, ordenar estrictamente por actividad más reciente
    const filtered = allRepos
      .filter((r) => !r.fork && r.language)
      .sort((a, b) => new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime())
      .slice(0, 4);

    const repos = filtered.length > 0 ? filtered : allRepos.slice(0, 4);

    // Fetch READMEs in parallel
    const readmes = await Promise.all(repos.map((r) => fetchReadme(r.name)));

    return repos.map((repo: any, i: number) => ({
      id: String(repo.id),
      title: slugToTitle(repo.name),
      description: repo.description || "No description available.",
      image: "",
      // Dejamos techStack vacío: el lenguaje ya aparece en la leyenda de lenguajes
      techStack: [],
      liveUrl: repo.homepage || undefined,
      githubUrl: repo.html_url,
      stars: repo.stargazers_count,
      language: repo.language,
      readme: readmes[i],
      pushedAt: repo.pushed_at,
    }));
  } catch (err) {
    console.error("[GitHub] Failed to fetch top repos:", err);
    return [];
  }
}

// ─── Public API ───────────────────────────────────────────────────────────────

export async function fetchGitHubProjects(): Promise<Project[]> {
  if (!GITHUB_TOKEN) {
    console.warn("[GitHub] No GITHUB_TOKEN — using REST API (unauthenticated, 60 req/hour).");
    return fetchTopRepos();
  }

  try {
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: buildHeaders(true),
      body: JSON.stringify({
        query: PINNED_REPOS_QUERY,
        variables: { login: GITHUB_USERNAME },
      }),
    });

    if (!res.ok) throw new Error(`GitHub GraphQL error: ${res.status}`);

    const { data, errors } = await res.json();

    if (errors?.length) {
      console.error("[GitHub] GraphQL errors:", errors);
      return fetchTopRepos();
    }

    const repos: GQLRepo[] = data?.user?.pinnedItems?.nodes ?? [];

    if (repos.length === 0) {
      console.warn("[GitHub] No pinned repos — falling back to REST top repos.");
      return fetchTopRepos();
    }

    // Ordenar por más reciente primero
    const sorted = [...repos].sort(
      (a, b) => new Date(b.pushedAt).getTime() - new Date(a.pushedAt).getTime()
    );

    return sorted.map(mapGQLRepoToProject);
  } catch (err) {
    console.error("[GitHub] Failed to fetch pinned repos:", err);
    return fetchTopRepos();
  }
}
