import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";
import { fileURLToPath } from "node:url";

export const PKG = "@shopify/dev-mcp";
export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
export const VERSIONS_DIR = path.join(ROOT, "data", "versions");

/** Stable versions published on npm, in publication order, with their timestamps. */
export function npmVersions() {
  const time = JSON.parse(execSync(`npm view ${PKG} time --json --loglevel=error`).toString());
  return Object.entries(time)
    .filter(([k]) => /^\d+\.\d+\.\d+$/.test(k))
    .sort((a, b) => new Date(a[1]) - new Date(b[1]))
    .map(([version, published]) => ({ version, published }));
}

/** Versions already recorded in data/versions, in publication order. */
export function recordedVersions() {
  if (!fs.existsSync(VERSIONS_DIR)) return [];
  return fs.readdirSync(VERSIONS_DIR)
    .map((v) => readJson(path.join(VERSIONS_DIR, v, "meta.json")))
    .filter(Boolean)
    .sort((a, b) => new Date(a.published) - new Date(b.published));
}

export function readJson(p) {
  try { return JSON.parse(fs.readFileSync(p, "utf8")); } catch { return null; }
}

export function writeJson(p, obj) {
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, JSON.stringify(obj, null, 1) + "\n");
}

export function walk(dir, acc = []) {
  if (!fs.existsSync(dir)) return acc;
  for (const f of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, f.name);
    if (f.isDirectory()) walk(p, acc); else acc.push(p);
  }
  return acc;
}

/** Summarise the data files a package ships, instead of listing thousands of paths. */
export function summariseBundledData(files) {
  const schemas = files.filter((x) => /data\/[^/]+\.json(\.gz)?$/.test(x) && !/latest-releases|supported-versions|types\/index/.test(x))
    .map((x) => x.split("/").pop().replace(/\.json(\.gz)?$/, "")).sort();
  const instr = files.filter((x) => /mcp-instructions\//.test(x)).map((x) => x.split("/").pop().replace(/\.md$/, "")).sort();
  const zod = files.filter((x) => /zod_schemas\//.test(x)).map((x) => x.split("/").pop().replace(/\.js$/, "")).sort();
  const types = files.filter((x) => /data\/types\//.test(x));
  const typePkgs = [...new Set(types.map((x) => {
    const m = x.match(/types\/(@[^/]+\/[^/]+|[^@/][^/]*)\/([^/]+)\//);
    return m ? `${m[1]}@${m[2]}` : null;
  }).filter(Boolean))].sort();
  return {
    graphqlSchemas: schemas,
    componentSchemas: zod,
    apiInstructions: instr,
    typeDeclarations: { files: types.length, packages: typePkgs },
    internalEvalFiles: files.filter((x) => /^promptfoo\//.test(x)).length,
  };
}
