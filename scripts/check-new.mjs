// Prints the stable npm versions of @shopify/dev-mcp that are not yet in data/versions,
// one per line, oldest first. Exit code 0 whether or not there is anything new.
import fs from "node:fs";
import path from "node:path";
import { npmVersions, VERSIONS_DIR } from "./lib.mjs";

const missing = npmVersions().filter(({ version }) => !fs.existsSync(path.join(VERSIONS_DIR, version, "meta.json")));
for (const { version } of missing) console.log(version);
