// Records one published version of @shopify/dev-mcp, the way a developer would run it.
//
//   node scripts/collect.mjs 1.16.0
//
// 1. `npm pack` the published tarball and summarise what it ships (package.json, files, data).
// 2. Install it into an isolated temporary prefix.
// 3. Start the server over stdio with telemetry switched off (OPT_OUT_INSTRUMENTATION=true,
//    DO_NOT_TRACK=1) and ask it to describe itself: initialize, tools/list, prompts/list.
//    No tool is ever called.
// 4. Write data/versions/<version>/{meta.json, tools-list.json, prompts-list.json, README.md}.
//
// The server starts with default environment variables only: tools hidden behind opt-in flags
// (LIQUID, LIQUID_VALIDATION_MODE=partial, POLARIS_UNIFIED, ...) are not recorded.
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawn, execFileSync } from "node:child_process";
import { PKG, VERSIONS_DIR, npmVersions, walk, writeJson, summariseBundledData } from "./lib.mjs";

const version = process.argv[2];
if (!/^\d+\.\d+\.\d+$/.test(version || "")) {
  console.error("usage: node scripts/collect.mjs <version>");
  process.exit(2);
}
const published = npmVersions().find((v) => v.version === version)?.published;
if (!published) {
  console.error(`${PKG}@${version} is not a published stable version`);
  process.exit(2);
}

const npm = process.platform === "win32" ? "npm.cmd" : "npm";
const work = fs.mkdtempSync(path.join(os.tmpdir(), `dev-mcp-${version}-`));
const out = path.join(VERSIONS_DIR, version);

// 1. Tarball contents
const packDir = path.join(work, "pack");
fs.mkdirSync(packDir);
const tgz = execFileSync(npm, ["pack", `${PKG}@${version}`, "--loglevel=error"], { cwd: packDir, shell: process.platform === "win32" }).toString().trim().split(/\r?\n/).pop();
execFileSync("tar", ["-xzf", tgz], { cwd: packDir });
const pkgRoot = path.join(packDir, "package");
const pj = JSON.parse(fs.readFileSync(path.join(pkgRoot, "package.json"), "utf8"));
const files = walk(pkgRoot).map((p) => path.relative(pkgRoot, p).split(path.sep).join("/"));
const devTools = pj.dependencies?.["@shopify/shopify-dev-tools"]
  ? { where: "dependencies", version: pj.dependencies["@shopify/shopify-dev-tools"] }
  : pj.devDependencies?.["@shopify/shopify-dev-tools"]
    ? { where: "devDependencies", version: pj.devDependencies["@shopify/shopify-dev-tools"] }
    : null;

const meta = {
  version, published, collected: new Date().toISOString().slice(0, 10), run: null,
  serverInfo: null, protocolVersion: null,
  license: pj.license ?? null, repository: pj.repository ?? null,
  dependencies: pj.dependencies ?? {}, internalDevTools: devTools,
  fileCount: files.length, hasReadme: files.includes("README.md"),
  bundledData: summariseBundledData(files),
};
if (meta.hasReadme) {
  fs.mkdirSync(out, { recursive: true });
  fs.copyFileSync(path.join(pkgRoot, "README.md"), path.join(out, "README.md"));
}

// 2. Isolated install. --legacy-peer-deps: from 1.5.0 on, npm otherwise spends 30+ minutes
// resolving Hydrogen's peer dependencies.
const inst = path.join(work, "inst");
try {
  execFileSync(npm, ["install", `${PKG}@${version}`, "--prefix", inst, "--no-audit", "--no-fund", "--legacy-peer-deps", "--loglevel=error"],
    { stdio: "ignore", timeout: 15 * 60 * 1000, shell: process.platform === "win32" });
} catch (e) {
  meta.run = "install-failed";
  writeJson(path.join(out, "meta.json"), meta);
  console.log(`${version}: install failed (${e.message.split("\n")[0]})`);
  process.exit(0);
}

// 3. Ask the server to describe itself
const installed = path.join(inst, "node_modules", "@shopify", "dev-mcp");
const ipj = JSON.parse(fs.readFileSync(path.join(installed, "package.json"), "utf8"));
const bin = typeof ipj.bin === "string" ? ipj.bin : Object.values(ipj.bin || {})[0] || ipj.main;
const env = { ...process.env, OPT_OUT_INSTRUMENTATION: "true", DO_NOT_TRACK: "1" };
const child = spawn(process.execPath, [path.join(installed, bin)], { env });
const res = {};
let buf = "";
const send = (m) => child.stdin.write(JSON.stringify(m) + "\n");
const done = new Promise((resolve) => {
  const timer = setTimeout(() => resolve("timeout"), 120000);
  child.on("exit", (c) => { clearTimeout(timer); resolve(`exit ${c}`); });
  child.stdout.on("data", (d) => {
    buf += d;
    let i;
    while ((i = buf.indexOf("\n")) >= 0) {
      const line = buf.slice(0, i); buf = buf.slice(i + 1);
      let m; try { m = JSON.parse(line); } catch { continue; }
      if (m.id === undefined) continue;
      res[m.id] = m;
      if (m.id === 1) {
        send({ jsonrpc: "2.0", method: "notifications/initialized" });
        send({ jsonrpc: "2.0", id: 2, method: "tools/list" });
        send({ jsonrpc: "2.0", id: 3, method: "prompts/list" });
      }
      if (res[2] && res[3]) { clearTimeout(timer); resolve("ok"); }
    }
  });
});
child.stderr.on("data", () => {});
send({ jsonrpc: "2.0", id: 1, method: "initialize", params: { protocolVersion: "2025-06-18", capabilities: {}, clientInfo: { name: "shopify-dev-mcp-changelog", version: "1" } } });
meta.run = await done;
child.kill();

// 4. Write
meta.serverInfo = res[1]?.result?.serverInfo ?? null;
meta.protocolVersion = res[1]?.result?.protocolVersion ?? null;
writeJson(path.join(out, "meta.json"), meta);
if (res[2]?.result) writeJson(path.join(out, "tools-list.json"), res[2].result);
if (res[3]) writeJson(path.join(out, "prompts-list.json"), res[3].result ?? res[3].error ?? null);
fs.rmSync(work, { recursive: true, force: true });
console.log(`${version}: ${meta.run}, ${res[2]?.result?.tools?.length ?? 0} tools`);
