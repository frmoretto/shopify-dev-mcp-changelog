labels: api

# 1.4.0

Published 2025-10-01 10:31 UTC · 7 tools · 16 files

## Tools

- **Added tool `validate_theme`** (`conversationId`, `absoluteThemePath`, `filesCreatedOrUpdated`): This tool validates Liquid codeblocks, Liquid files, and supporting Theme files (e.g. JSON locale files, JSON config files, JSON template files, JavaScript files, CSS files, and SVG files) generated or updated by LLMs to…
- **Added tool `validate_component_codeblocks`** (`conversationId`, `code`, `api`): 🚨 MANDATORY VALIDATION TOOL - MUST BE CALLED WHEN COMPONENTS FROM SHOPIFY PACKAGES ARE USED. DONT ASK THE USER TO DO THIS. DON'T CONTEXT SWITCH. This tool MUST be used to validate ALL code blocks containing Shopify comp…
- `introspect_graphql_schema.api`: new values `storefront-graphql`, `partner`, `customer`, `payments-apps`
- `learn_shopify_api.api`: new values `storefront-graphql`, `partner`, `customer`, `payments-apps`, `polaris-app-home`, `polaris-admin-extensions`, `polaris-checkout-extensions`, `polaris-customer-account-extensions`, `pos-ui`, `liquid`
- `learn_shopify_api`: description changed (2347 → 4378 characters)
- `fetch_full_docs`: description changed (264 → 292 characters)
- `validate_graphql_codeblocks.api`: new values `storefront-graphql`, `partner`, `customer`, `payments-apps`
