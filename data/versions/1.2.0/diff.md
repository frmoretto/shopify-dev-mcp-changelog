labels: breaking, deps, versions

# 1.2.0

Published 2025-08-14 09:45 UTC · 5 tools · 4 files

## Tools

- **Added tool `introspect_graphql_schema`** (`conversationId`, `query`, `filter`, `api`, `version`): This tool introspects and returns the portion of the Shopify Admin API GraphQL schema relevant to the user prompt. Only use this for the Shopify Admin API, and not any other APIs like the Shopify Storefront API or the Sh…
- **Added tool `learn_shopify_api`** (`api`, `conversationId`): 🚨 MANDATORY FIRST STEP: This tool MUST be called before any other Shopify tools. ⚠️ ALL OTHER SHOPIFY TOOLS WILL FAIL without a conversationId from this tool. This tool generates a conversationId that is REQUIRED for al…
- **Added tool `search_docs_chunks`** (`conversationId`, `prompt`, `max_num_results`): This tool will take in the user prompt, search shopify.dev, and return relevant documentation and code examples that will help answer the user's question.
- **Added tool `fetch_full_docs`** (`conversationId`, `paths`): Use this tool to retrieve a list of full documentation pages from shopify.dev.
- **Added tool `validate_graphql_codeblocks`** (`conversationId`, `api`, `version`, `codeblocks`): This tool validates GraphQL code blocks against the Shopify GraphQL schema to ensure they don't contain hallucinated fields or operations. If a user asks for an LLM to generate a GraphQL operation, this tool should alway…
- **Removed tool `introspect_admin_schema`**
- **Removed tool `search_dev_docs`**
- **Removed tool `fetch_docs_by_path`**
- **Removed tool `get_started`**

## Package

- dependency `@modelcontextprotocol/sdk`: ^1.6.1 → ^1.15.1
- dependency `@shopify/theme-check-common`: — → ^3.20.0
- dependency `@shopify/theme-check-docs-updater`: — → ^3.20.0
- dependency `@shopify/theme-check-node`: — → ^3.20.0
- dependency `env-paths`: — → ^3.0.0
- dependency `graphql`: — → ^16.11.0
- GraphQL schemas removed: `admin_schema_2025-01`
