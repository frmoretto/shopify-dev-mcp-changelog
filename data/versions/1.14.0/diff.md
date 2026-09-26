labels: deps, versions

# 1.14.0

Published 2026-06-02 14:50 UTC · 5 tools · 4125 files

## Tools

- `learn_shopify_api`: new parameter `version`: The API version the developer is targeting (format: 'YYYY-MM', e.g. '2025-04'). Omit to default to the latest version.
- `search_docs_chunks`: new parameter `version`: The API version to scope search results to (e.g., '2025-04', '2026-01'). Pass the version you detected or received from learn_shopify_api. When omitted, search returns results for the latest version.
- `validate_component_codeblocks`: new parameter `version`: The API version to validate against (e.g., '2026-01', '2025-10'). Pass the version you detected or passed search_docs_chunks. When omitted, defaults to the latest stable version.
- `validate_graphql_codeblocks`: new parameter `version`: Optional API version to validate against. When omitted, the latest stable version for the selected API is used.

## Package

- dependency `@shopify/ui-extensions`: 2026.1.1 → —
- internal `@shopify/shopify-dev-tools`: 1.9.1 (devDependencies) → 1.10.0 (devDependencies)
- GraphQL schemas added: `admin_2025-07`, `admin_2025-10`, `admin_2026-01`, `admin_2026-07`, `admin_unstable`, `customer_2025-07`, `customer_2025-10`, `customer_2026-01`, `customer_2026-07`, `customer_unstable`, `functions_cart_checkout_validation_2025-07`, `functions_cart_checkout_validation_2025-10`, `functions_cart_checkout_validation_2026-01`, `functions_cart_checkout_validation_2026-07`, `functions_cart_checkout_validation_unstable`, `functions_cart_transform_2025-07`, `functions_cart_transform_2025-10`, `functions_cart_transform_2026-01`, `functions_cart_transform_2026-07`, `functions_cart_transform_unstable`, `functions_delivery_customization_2025-07`, `functions_delivery_customization_2025-10`, `functions_delivery_customization_2026-01`, `functions_delivery_customization_2026-07`, `functions_delivery_customization_unstable`, `functions_discount_2025-07`, `functions_discount_2025-10`, `functions_discount_2026-01`, `functions_discount_2026-07`, `functions_discount_unstable` (+45 more)
- bundled type declarations: 0 → 3961 files
