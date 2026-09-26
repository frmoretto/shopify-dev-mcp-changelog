// Writes data/versions/<version>/diff.md: what changed against the previous recorded version.
//
//   node scripts/diff.mjs 1.16.0     # one version
//   node scripts/diff.mjs --all      # every recorded version
//
// Tool changes are compared against the last version whose tools could be listed
// (a version that failed to install has no tool list of its own).
// Labels are assigned mechanically and are a starting point for the human-written entry:
//   breaking   a tool or parameter disappeared, or a parameter became required
//   telemetry  a parameter or tool whose description asks for data about the user, the model or the session
//   api        new or removed values in an `api` parameter
//   versions   bundled GraphQL schema versions changed
//   deps       runtime dependencies changed
import fs from "node:fs";
import path from "node:path";
import { VERSIONS_DIR, recordedVersions, readJson } from "./lib.mjs";

const TELEMETRY = /verbatim|model name|your model|session|scorecard|grading|instrumentation|usage data|improve (api|our|documentation|tooling)/i;

const load = (v) => ({
  meta: readJson(path.join(VERSIONS_DIR, v, "meta.json")),
  tools: Object.fromEntries((readJson(path.join(VERSIONS_DIR, v, "tools-list.json"))?.tools || []).map((t) => [t.name, t])),
  hasTools: fs.existsSync(path.join(VERSIONS_DIR, v, "tools-list.json")),
});
const props = (t) => t?.inputSchema?.properties || {};
const enumOf = (p) => p?.enum || p?.items?.enum || p?.anyOf?.flatMap((a) => a.enum || []) || null;
const oneLine = (s, n = 220) => (s || "").replace(/\s+/g, " ").trim().slice(0, n) + ((s || "").length > n ? "…" : "");
const list = (a) => a.map((x) => `\`${x}\``).join(", ");

function diffPair(prev, prevTools, cur) {
  const labels = new Set();
  const L = [];
  const m = cur.meta;
  L.push(`# ${m.version}`, "", `Published ${m.published?.slice(0, 16).replace("T", " ")} UTC · ${m.run === "ok" ? `${Object.keys(cur.tools).length} tools` : `run: ${m.run}`} · ${m.fileCount} files`, "");
  if (!prev) { L.push("First recorded version.", ""); }

  if (cur.hasTools && prevTools) {
    const pt = prevTools.tools, ct = cur.tools;
    const T = [];
    for (const n of Object.keys(ct)) if (!pt[n]) {
      T.push(`- **Added tool \`${n}\`** (${list(Object.keys(props(ct[n])))}): ${oneLine(ct[n].description)}`);
      if (TELEMETRY.test(ct[n].description || "")) labels.add("telemetry");
    }
    for (const n of Object.keys(pt)) if (!ct[n]) { T.push(`- **Removed tool \`${n}\`**`); labels.add("breaking"); }
    for (const n of Object.keys(ct)) {
      const a = pt[n], b = ct[n]; if (!a) continue;
      const pa = props(a), pb = props(b);
      for (const k of Object.keys(pb)) if (!pa[k]) {
        T.push(`- \`${n}\`: new parameter \`${k}\`: ${oneLine(pb[k].description, 300)}`);
        if (TELEMETRY.test(pb[k].description || "")) labels.add("telemetry");
      }
      for (const k of Object.keys(pa)) if (!pb[k]) { T.push(`- \`${n}\`: removed parameter \`${k}\``); labels.add("breaking"); }
      for (const k of Object.keys(pb)) if (pa[k]) {
        const ea = enumOf(pa[k]) || [], eb = enumOf(pb[k]) || [];
        const add = eb.filter((x) => !ea.includes(x)), rem = ea.filter((x) => !eb.includes(x));
        if (add.length) T.push(`- \`${n}.${k}\`: new values ${list(add)}`);
        if (rem.length) { T.push(`- \`${n}.${k}\`: removed values ${list(rem)}`); labels.add("breaking"); }
        if ((add.length || rem.length) && k === "api") labels.add("api");
      }
      const ra = a.inputSchema?.required || [], rb = b.inputSchema?.required || [];
      const newReq = rb.filter((x) => !ra.includes(x));
      if (newReq.length) { T.push(`- \`${n}\`: now required ${list(newReq)}`); labels.add("breaking"); }
      if (a.description !== b.description) T.push(`- \`${n}\`: description changed (${(a.description || "").length} → ${(b.description || "").length} characters)`);
    }
    if (T.length) L.push("## Tools", "", ...T, "");
    else L.push("## Tools", "", "No change to tools, parameters or descriptions.", "");
  } else if (!cur.hasTools) {
    L.push("## Tools", "", `Not recorded: ${m.run}.`, "");
  }

  if (prev) {
    const P = [];
    const da = prev.meta.dependencies || {}, db = m.dependencies || {};
    for (const k of [...new Set([...Object.keys(da), ...Object.keys(db)])].sort()) if (da[k] !== db[k]) P.push(`- dependency \`${k}\`: ${da[k] ?? "—"} → ${db[k] ?? "—"}`);
    if (P.length) labels.add("deps");
    const ia = prev.meta.internalDevTools, ib = m.internalDevTools;
    if (JSON.stringify(ia) !== JSON.stringify(ib)) P.push(`- internal \`@shopify/shopify-dev-tools\`: ${ia ? `${ia.version} (${ia.where})` : "—"} → ${ib ? `${ib.version} (${ib.where})` : "—"}`);
    if (prev.meta.hasReadme !== m.hasReadme) P.push(`- README ${m.hasReadme ? "added" : "removed"}`);
    const ba = prev.meta.bundledData || {}, bb = m.bundledData || {};
    for (const [key, label] of [["graphqlSchemas", "GraphQL schemas"], ["componentSchemas", "component schemas"], ["apiInstructions", "API instructions"]]) {
      const a = ba[key] || [], b = bb[key] || [];
      const add = b.filter((x) => !a.includes(x)), rem = a.filter((x) => !b.includes(x));
      if (add.length) P.push(`- ${label} added: ${list(add.slice(0, 30))}${add.length > 30 ? ` (+${add.length - 30} more)` : ""}`);
      if (rem.length) P.push(`- ${label} removed: ${list(rem.slice(0, 30))}${rem.length > 30 ? ` (+${rem.length - 30} more)` : ""}`);
      if (key === "graphqlSchemas" && (add.length || rem.length)) labels.add("versions");
    }
    const ta = ba.typeDeclarations?.files || 0, tb = bb.typeDeclarations?.files || 0;
    if (ta !== tb) P.push(`- bundled type declarations: ${ta} → ${tb} files`);
    if ((ba.internalEvalFiles || 0) !== (bb.internalEvalFiles || 0)) P.push(`- internal evaluation files shipped: ${ba.internalEvalFiles || 0} → ${bb.internalEvalFiles || 0}`);
    if (P.length) L.push("## Package", "", ...P, "");
  }

  return { text: `labels: ${[...labels].sort().join(", ") || "none"}\n\n` + L.join("\n"), labels: [...labels] };
}

const all = recordedVersions();
const targets = process.argv[2] === "--all" ? all.map((m) => m.version) : process.argv.slice(2);
if (!targets.length) { console.error("usage: node scripts/diff.mjs <version>... | --all"); process.exit(2); }
for (const v of targets) {
  const idx = all.findIndex((m) => m.version === v);
  if (idx < 0) { console.error(`${v}: not recorded`); continue; }
  const cur = load(v);
  const prev = idx > 0 ? load(all[idx - 1].version) : null;
  let prevTools = null;
  for (let j = idx - 1; j >= 0; j--) { const c = load(all[j].version); if (c.hasTools) { prevTools = c; break; } }
  const { text, labels } = diffPair(prev, prevTools, cur);
  fs.writeFileSync(path.join(VERSIONS_DIR, v, "diff.md"), text);
  console.log(`${v}: ${labels.join(", ") || "—"}`);
}
