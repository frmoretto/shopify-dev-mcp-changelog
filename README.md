# shopify-dev-mcp-changelog

**An independent changelog for [`@shopify/dev-mcp`](https://www.npmjs.com/package/@shopify/dev-mcp), the Shopify Dev MCP server.**

→ **[CHANGELOG.md](CHANGELOG.md)** · [Method](METHOD.md) · [Atom feed](feed.xml)

The Dev MCP server runs on developers' machines, inside AI coding assistants (Cursor, Claude Code,
VS Code…), and is usually configured as `npx -y @shopify/dev-mcp@latest`. It is downloaded about
50,000 times a week and released almost weekly. It has no public repository, no release notes
and no build provenance, so every release reaches every active installation without anyone
being able to see what changed.

This repository records every published version the way a developer would run it, and keeps a
dated, searchable history of what changed.

## What you'll find

| Path | Contents |
|---|---|
| [`CHANGELOG.md`](CHANGELOG.md) | Human-written entries for every release, labelled `breaking`, `telemetry`, `api`, `versions`, `deps` |
| `data/versions/<version>/tools-list.json` | The exact `tools/list` the server returned |
| `data/versions/<version>/meta.json` | Publication date, server info, dependencies, bundled data summary |
| `data/versions/<version>/diff.md` | Mechanical diff against the previous version |
| `data/versions/<version>/README.md` | The README shipped in the package, when there was one |
| [`scripts/`](scripts) | The collector, the differ and the feed builder |

## Notable observations

- **No link to source.** Unlike `@shopify/cli`, `@shopify/hydrogen`, `@shopify/theme-check-node` and `@shopify/ucp-cli`, the package declares no `repository` and carries no provenance attestation, though it is published by GitHub Actions with trusted publishing. The original `github.com/Shopify/dev-mcp` repository, public until at least August 2025, now returns 404.
- **Telemetry grew in stages** and now includes the user's latest message verbatim (since 1.13.0) and the host assistant's session id (since 1.15.0). It can be switched off. See [Telemetry](CHANGELOG.md#telemetry).
- **Breaking changes arrive through `@latest` without notice**: tools were removed in 1.12.0 and merged in 1.16.0.
- **The instructions loaded into the model's context grew from ~220 to ~8,400 tokens** (1.0.0 → 1.15.4). The description of `learn_shopify_api` alone exceeds 13,000 characters.
- **1.3.1 could not be installed** (a dependency on an unpublished internal package), and **1.5.1–1.12.0 shipped Shopify's internal evaluation suite** inside the npm package.

## If you use the Dev MCP

- **Pin a version** (`@shopify/dev-mcp@1.16.0`) instead of `@latest`, and upgrade deliberately.
- **Check what changed** before upgrading: this changelog, or `npm diff --diff=@shopify/dev-mcp@<old> --diff=@shopify/dev-mcp@<new>`.
- **Decide about telemetry**: set `OPT_OUT_INSTRUMENTATION=true` if you don't want your prompts sent to Shopify.

## How it stays up to date

A daily GitHub Action ([`watch.yml`](.github/workflows/watch.yml)) checks npm for new versions,
records them, generates the diff and opens a pull request. The changelog entry is written and
reviewed by a person before merging.

## Reproduce

```bash
node scripts/check-new.mjs          # versions not yet recorded
node scripts/collect.mjs 1.16.0     # record one version
node scripts/diff.mjs 1.16.0        # diff it against the previous one
node scripts/build-feed.mjs         # rebuild feed.xml from CHANGELOG.md
```

Node 20+. No dependencies.

## Licence and attribution

Scripts: MIT. Changelog text and derived data: CC BY 4.0. See [LICENSE](LICENSE).
Tool descriptions and READMEs reproduced in `data/` are © Shopify Inc., distributed by Shopify
under the ISC licence; see [NOTICE](NOTICE).

Not affiliated with or endorsed by Shopify.
