# Method

## What is recorded

For each stable version published on npm (`scripts/collect.mjs`):

1. **The tarball.** `npm pack @shopify/dev-mcp@<version>`: `package.json`, file count, README,
   and a summary of bundled data (GraphQL schema versions, component schemas, per-API
   instructions, type declarations, internal evaluation files).
2. **The running server.** An isolated `npm install` in a temporary prefix
   (`--legacy-peer-deps`; without it npm spends 30+ minutes resolving Hydrogen's peer dependencies
   from 1.5.0 on). The server is started over stdio with `OPT_OUT_INSTRUMENTATION=true` and
   `DO_NOT_TRACK=1`, then asked `initialize`, `tools/list` and `prompts/list`.
   **No tool is ever called**, so nothing reaches Shopify's usage endpoint.
3. **The diff** against the previous recorded version (`scripts/diff.mjs`). Tool changes are compared
   against the last version whose tools could be listed.

The changelog entries are written by hand from the diffs. Claims about behaviour that is not
visible in `tools/list` (for example, where `user_prompt` is sent) were checked in the published
code of the version named, and say so.

## Limits

- **Default environment only.** Tools enabled by opt-in variables (`LIQUID`,
  `LIQUID_VALIDATION_MODE=partial`, `POLARIS_UNIFIED`, …) are not in the recorded `tools/list`.
- **Remote content changes independently.** Some versions fetch content from shopify.dev at
  start-up (for example the API list of `get_started` in 1.1.0). Running an old version today shows
  today's remote content, not what users saw at the time.
- **Versions that cannot be installed** (1.3.1) are described from the tarball and npm metadata only.
- **Internal fixes that change no tool, schema, data or dependency are invisible.** Such releases
  are marked "no externally visible change" rather than guessed at.
- **Minified code.** Statements about data flows are limited to what the published bundle shows.
- **Server side.** What Shopify does with the data it receives cannot be observed from outside.

## Historical sources

Versions 1.0.0 to 1.2.0 predate the repository becoming private. They are cross-checked against:
the archived GitHub release notes; the mirrors `AhaYue/Shopify_dev-mcp` (history up to 1.1.0) and
`nicobailon/dev-mcp` (up to 1.0.2); Docker Hub `mcp/shopify` (a 1.2.0-era image); and Shopify
developer changelog posts and community forum threads, cited in the entries where used.

## One test of the remote search (26 September 2026)

`search_docs_chunks` has two search backends, selectable with `USE_LEGACY_SEARCH`. Using Dev MCP
1.16.0 as a developer would (telemetry off, no `model`, no `user_prompt`, 3 s between requests),
16 queries across 14 API surfaces, then 3 new queries in reverse order: **identical results in 19 of
19 cases**. The first request for any query was slower (~600–700 ms) than a repeat (~300–350 ms)
regardless of backend, which points to a server-side cache keyed on the query text. From the
outside, the option has no observable effect.
