# Guido Gauna — Personal Portfolio

> Full-Stack Developer · AWS · AI/LLM Integration · Microservices  
> [guidogauna.dev](https://guidogauna.dev) · [LinkedIn](https://www.linkedin.com/in/guidogauna) · [GitHub](https://github.com/GuidoDevJ)

---

## Overview

Production-grade personal portfolio built from scratch — not a template. Designed to demonstrate real engineering decisions: hybrid SSR/static rendering, build-time GitHub API integration, a proxied AI chat assistant, transactional email with server-side rate limiting, and full i18n support. Every architectural choice has a reason.

---

## Tech Stack

### Core
| Layer | Technology |
|---|---|
| Framework | Astro 4 (hybrid output — SSR + static) |
| UI | React 18 + TypeScript |
| Styling | CSS Modules + CSS custom properties |
| Deployment | Vercel Serverless Functions |
| Language | TypeScript (strict) |

### Features & Integrations
| Feature | Stack |
|---|---|
| GitHub Projects | GraphQL API (pinned repos) + REST fallback |
| AI Chat Assistant | Personal LangGraph + Amazon Bedrock agent (RAG) |
| Contact Form | Resend transactional email API |
| Internationalization | i18next + react-i18next + browser language detection |
| Theme | Dark / Light with CSS variables |
| Rate Limiting | localStorage-based (server-side proxy for API key security) |
| Animations | Pure CSS (prime-number durations for pseudo-random motion) |

---

## Architecture Highlights

### Hybrid Rendering Strategy
Static pages (`/`, `/404`) are pre-rendered at build time. API routes (`/api/contact`, `/api/chat`) run as Vercel Serverless Functions. This gives the performance of a static site with the flexibility of a server when needed.

```
src/pages/
  index.astro          ← prerendered (SSG)
  404.astro            ← prerendered (SSG)
  api/
    contact.ts         ← serverless function (Resend)
    chat.ts            ← serverless proxy (injects X-API-Key server-side)
```

### Build-Time GitHub Integration
Real project data fetched at build time — not at runtime. Uses GraphQL to query pinned repos with language breakdown and README content. Falls back to REST if no pinned repos are configured.

```typescript
// GraphQL: pinned repos with language bars + README
const { pinnedItems } = await fetchGitHubGraphQL(`
  pinnedItems(first: 4, types: REPOSITORY) {
    nodes { name, description, pushedAt, languages(first: 8) { ... } }
  }
`);
```

### AI Chat Widget — Secure Proxy Pattern
The portfolio includes a floating chat widget backed by a personal AI agent (LangGraph + Amazon Bedrock RAG). The API key never reaches the client — requests are proxied through an Astro server-side route that injects the `X-API-Key` header.

```
Browser → POST /api/chat (Astro SSR)
               ↓  X-API-Key injected server-side
          POST agent-api/chat → LangGraph + Bedrock
               ↓
          { has_info, answer, confidence }
```

Response includes a confidence score (0–1) rendered as a visual bar in the UI.

### i18n Without Breaking Changes
i18next integrated non-destructively — existing `t.nav.home` access patterns preserved through a compatibility layer in `LanguageContext`. Zero component rewrites required.

```typescript
// Components unchanged — still use the same API
const { t } = useLanguage();
return <span>{t.nav.home}</span>; // works in EN + ES
```

---

## Project Structure

```
src/
├── components/          # Section components (Hero, About, Projects, Experience...)
├── context/             # LanguageContext (i18next bridge)
├── constants/           # Experience, certifications, skills, nav links
├── data/                # Positions.csv (LinkedIn export parser)
├── helpers/             # Rate limiting, form validation, email sender
├── i18n/                # Translation files (EN / ES) + i18next config
├── lib/                 # GitHub GraphQL service, LinkedIn CSV parser, chat API
├── pages/               # Astro pages + API routes
└── ui/                  # Reusable UI components
    ├── ChatWidget/      # AI assistant floating widget
    ├── PixelRobot/      # Animated SVG pixel art robot (pure CSS)
    ├── ScrollProgress/  # Reading progress bar
    ├── ThemeToggle/     # Dark/light mode
    └── LanguageToggle/  # EN/ES switcher
```

---

## Running Locally

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Fill in: GITHUB_TOKEN, RESEND_API_KEY, RECIPIENT_EMAIL, CHAT_API_KEY, PUBLIC_CHAT_API_URL

# Start dev server
npm run dev        # http://localhost:4321

# Production build
npm run build

# Preview production build
npm run preview
```

### Environment Variables

| Variable | Description |
|---|---|
| `GITHUB_TOKEN` | GitHub PAT with `read:user` scope (GraphQL pinned repos) |
| `GITHUB_USERNAME` | Your GitHub username |
| `RESEND_API_KEY` | Resend API key for contact form emails |
| `RECIPIENT_EMAIL` | Email address to receive contact form messages |
| `CHAT_API_KEY` | API key for the personal AI agent (injected server-side) |
| `PUBLIC_CHAT_API_URL` | Base URL of the AI agent API |

---

## Key Engineering Decisions

**Why Astro over Next.js?**  
The portfolio is mostly static content. Astro's hybrid mode gives full SSR capabilities where needed (API routes) without shipping a JS runtime to the client for pages that don't need it. Result: faster load times, better Core Web Vitals.

**Why CSS Modules over Tailwind?**  
Full control over the design system via CSS custom properties. Theme switching (dark/light) works by toggling a single attribute on `<html>` — no class toggling across every component. Zero runtime overhead.

**Why proxy the AI API instead of calling it client-side?**  
API keys in client-side code are not secrets. The Astro serverless route acts as a BFF (Backend for Frontend) — validates the request, injects the key, handles timeouts. The key never leaves the server.

---

## Skills Demonstrated

`TypeScript` `React` `Astro` `Node.js` `REST APIs` `GraphQL` `AWS` `Amazon Bedrock` `LangGraph` `RAG` `Serverless` `CI/CD` `CSS Architecture` `i18n` `Performance Optimization` `Security (API proxying)` `Responsive Design`
