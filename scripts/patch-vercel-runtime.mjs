/**
 * Patches the Vercel build output to use nodejs20.x instead of nodejs18.x.
 * @astrojs/vercel falls back to 18.x when the local Node version is unsupported (e.g. 22).
 */
import { readFileSync, writeFileSync, existsSync } from "fs";
import { resolve } from "path";

const CONFIG_PATH = resolve(".vercel/output/functions/_render.func/.vc-config.json");

if (!existsSync(CONFIG_PATH)) {
  console.log("[patch-vercel-runtime] .vc-config.json not found — skipping.");
  process.exit(0);
}

const config = JSON.parse(readFileSync(CONFIG_PATH, "utf-8"));

if (config.runtime !== "nodejs20.x") {
  console.log(`[patch-vercel-runtime] Patching runtime: ${config.runtime} → nodejs20.x`);
  config.runtime = "nodejs20.x";
  writeFileSync(CONFIG_PATH, JSON.stringify(config, null, "\t"));
  console.log("[patch-vercel-runtime] Done.");
} else {
  console.log("[patch-vercel-runtime] Runtime already nodejs20.x — nothing to do.");
}
