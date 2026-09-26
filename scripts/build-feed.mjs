// Builds feed.xml (Atom) from CHANGELOG.md: one entry per dated "## <version> — <date>" heading.
// Base URL: https://<owner>.github.io/<repo>/ from GITHUB_REPOSITORY, or FEED_BASE_URL.
import fs from "node:fs";
import path from "node:path";
import { ROOT } from "./lib.mjs";

const repo = process.env.GITHUB_REPOSITORY || "frmoretto/shopify-dev-mcp-changelog";
const [owner, name] = repo.split("/");
const base = (process.env.FEED_BASE_URL || `https://${owner}.github.io/${name}/`).replace(/\/?$/, "/");
const md = fs.readFileSync(path.join(ROOT, "CHANGELOG.md"), "utf8");
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const entries = [];
const blocks = md.split(/^## /m).slice(1);
for (const b of blocks) {
  const [heading, ...rest] = b.split("\n");
  const m = heading.match(/^(\d+\.\d+\.\d+)\s+—\s+(\d{4}-\d{2}-\d{2})(?:\s+(\d{2}:\d{2}))?/);
  if (!m) continue;
  const [, version, date, time] = m;
  const labels = [...heading.matchAll(/`([a-z]+)`/g)].map((x) => x[1]);
  const body = rest.join("\n").split(/^---$/m)[0].trim();
  const title = heading.replace(/`[a-z]+`/g, "").replace(/[\s·]+$/, "").trim();
  entries.push({ version, heading: title, updated: `${date}T${time || "00:00"}:00Z`, labels, body });
}

const updated = entries.map((e) => e.updated).sort().pop() || new Date().toISOString();
const xml = `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>@shopify/dev-mcp — independent changelog</title>
  <subtitle>Every published version of the Shopify Dev MCP server, recorded and diffed.</subtitle>
  <link href="${base}feed.xml" rel="self"/>
  <link href="${base}CHANGELOG"/>
  <id>${base}</id>
  <updated>${updated}</updated>
${entries.map((e) => `  <entry>
    <title>${esc(`@shopify/dev-mcp ${e.heading}`)}</title>
    <link href="${base}CHANGELOG#${e.heading.toLowerCase().replace(/[^a-z0-9 -]/g, "").trim().replace(/\s+/g, "-")}"/>
    <id>${base}versions/${e.version}</id>
    <updated>${e.updated}</updated>
${e.labels.map((l) => `    <category term="${l}"/>`).join("\n")}
    <content type="text">${esc(e.body)}</content>
  </entry>`).join("\n")}
</feed>
`;
fs.writeFileSync(path.join(ROOT, "feed.xml"), xml);
console.log(`feed.xml: ${entries.length} entries, base ${base}`);
