labels: breaking

# 1.0.2

Published 2025-03-28 11:20 UTC · 2 tools · 7 files

## Tools

- **Added tool `introspect_admin_schema`** (`query`, `filter`): This tool introspects and returns the portion of the Shopify Admin API GraphQL schema relevant to the user prompt. Only use this for the Shopify Admin API, and not any other APIs like the Shopify Storefront API or the Sh…
- **Added tool `search_dev_docs`** (`prompt`): This tool will take in the user prompt, search shopify.dev, and return relevant documentation that will help answer the user's question. It takes one argument: prompt, which is the search query for Shopify documentation.…
- **Removed tool `introspect-admin-schema`**
- **Removed tool `search-dev-docs`**
