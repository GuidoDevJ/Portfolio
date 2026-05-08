/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly CONTENTFUL_SPACE_ID: string;
  readonly CONTENTFUL_ACCESS_TOKEN: string;
  readonly RESEND_API_KEY: string;
  readonly RECIPIENT_EMAIL: string;
  readonly CHAT_API_URL: string;
  readonly CHAT_API_KEY: string;
  readonly GITHUB_TOKEN?: string;
  readonly GITHUB_USERNAME?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
