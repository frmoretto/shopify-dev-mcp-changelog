# Shopify Dev MCP Server

`@shopify/dev-mcp` is Shopify's [Model Context Protocol](https://modelcontextprotocol.io/) server for building on the Shopify platform. It lets AI agents search Shopify's documentation and API schemas, validate GraphQL operations, Liquid and theme files, and UI-extension code, and resolve supported API versions.

For setup instructions across editors and agents, see [Shopify AI Toolkit on shopify.dev](https://shopify.dev/docs/apps/build/ai-toolkit).

## Run the server

The server requires Node.js 18 or later and runs locally over standard input/output without authentication:

```sh
npx -y @shopify/dev-mcp@latest
```

Most MCP clients launch it with this configuration:

```json
{
  "mcpServers": {
    "shopify-dev-mcp": {
      "command": "npx",
      "args": ["-y", "@shopify/dev-mcp@latest"]
    }
  }
}
```

[![Install MCP Server](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/install-mcp?name=shopify-dev-mcp&config=eyJjb21tYW5kIjoibnB4IC15IEBzaG9waWZ5L2Rldi1tY3BAbGF0ZXN0In0%3D)

On Windows, use this configuration if Cursor reports connection errors:

```json
{
  "mcpServers": {
    "shopify-dev-mcp": {
      "command": "cmd",
      "args": ["/k", "npx", "-y", "@shopify/dev-mcp@latest"]
    }
  }
}
```

[![Install MCP Server](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/install-mcp?name=shopify-dev-mcp&config=eyJjb21tYW5kIjoiY21kIC9rIG5weCAteSBAc2hvcGlmeS9kZXYtbWNwQGxhdGVzdCJ9)

The [Shopify AI Toolkit setup guide](https://shopify.dev/docs/apps/build/ai-toolkit#install-with-the-dev-mcp-server) includes client-specific instructions for Claude Code, Codex CLI, Antigravity CLI, Cursor, and VS Code. Installing the full AI Toolkit plugin is recommended when your client supports it.

## Configuration

`LIQUID_VALIDATION_MODE` defaults to `full`, which exposes `validate_theme` for validating entire theme directories. Set it to `partial` to validate individual code blocks instead: `validate_theme` is not registered, and `liquid` joins the `api` enum of the merged `validate` tool.

## Telemetry

Published release builds send usage events to `https://shopify.dev/mcp/usage`. Events can include tool inputs and results, API and package version metadata, a random conversation ID, and client or model identifiers supplied by the MCP host. Builds run from source send nothing.

To opt out across Shopify AI Toolkit surfaces, create an empty user-level opt-out file (recommended):

```sh
mkdir -p ~/.config/shopify-ai-toolkit
touch ~/.config/shopify-ai-toolkit/opt-out
```

On Windows, create `%APPDATA%\shopify-ai-toolkit\opt-out`. Alternatively, set `OPT_OUT_INSTRUMENTATION=true` or `DO_NOT_TRACK=1` in the environment that launches the server.

See the [Shopify AI Toolkit telemetry documentation](https://github.com/Shopify/Shopify-AI-Toolkit#telemetry) for configuration examples and platform-specific paths.

## Support

For questions and troubleshooting, visit the [Shopify Developer Community](https://community.shopify.dev/).

## License

ISC
