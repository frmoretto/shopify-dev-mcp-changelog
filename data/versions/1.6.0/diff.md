labels: api, deps, versions

# 1.6.0

Published 2026-01-14 16:17 UTC · 8 tools · 171 files

## Tools

- **Added tool `learn_extension_target_types`** (`conversationId`, `api`, `extension_target`): This tool returns the type declarations of different components and APIs usable within a specific extension target. You MUST call this tool ONLY AFTER calling learn_shopify_api for the API names listed below. - Polaris A…
- `learn_shopify_api.api`: new values `hydrogen`
- `learn_shopify_api`: description changed (4989 → 5934 characters)
- `validate_component_codeblocks`: new parameter `extensionTarget`: Required for extension surface APIs (polaris-admin-extensions, polaris-checkout-extensions, polaris-customer-account-extensions, pos-ui). The extension target determines which components and APIs are available. Get available targets using learn_extension_target_types tool.
- `validate_component_codeblocks`: description changed (1430 → 2494 characters)

## Package

- dependency `@react-router/dev`: — → ^7.1.1
- dependency `@shopify/app-bridge-types`: ^0.5.0 → ^0.5.3
- dependency `@shopify/hydrogen`: ^2025.7.0 → ^2025.7.1
- dependency `@shopify/hydrogen-react`: — → ^2025.7.1
- dependency `@shopify/ui-extensions`: ^2025.10.2 → ^2025.10.11
- dependency `react-router`: — → ^7.1.1
- dependency `schema-dts`: — → ^1.1.5
- dependency `type-fest`: — → ^4.31.0
- internal `@shopify/shopify-dev-tools`: 1.3.0 (devDependencies) → 1.4.0 (devDependencies)
- GraphQL schemas added: `admin_2026-01`, `customer_2026-01`, `functions_cart_checkout_validation_schema_2026-01`, `functions_cart_transform_schema_2026-01`, `functions_delivery_customization_schema_2026-01`, `functions_discount_schema_2026-01`, `functions_fulfillment_constraints_schema_2026-01`, `functions_order_routing_location_rule_schema_2026-01`, `functions_payment_customization_schema_2026-01`, `partner_2026-01`, `payments-apps_2026-01`, `storefront-graphql_2026-01`
- GraphQL schemas removed: `admin_2025-07`, `admin_2025-10`, `customer_2025-07`, `customer_2025-10`, `functions_cart_checkout_validation_2025-10`, `functions_cart_transform_2025-10`, `functions_delivery_customization_2025-10`, `functions_discount_2025-10`, `functions_fulfillment_constraints_2025-10`, `functions_order_routing_location_rule_2025-10`, `functions_payment_customization_2025-10`, `partner_2025-07`, `payments-apps_2025-07`, `payments-apps_2025-10`, `storefront-graphql_2025-07`, `storefront-graphql_2025-10`
- component schemas removed: `hydrogen_2025-05`, `polaris-admin-extensions_2025-10`, `polaris-app-home`, `polaris-checkout-extensions_2025-10`, `polaris-customer-account-extensions_2025-10`, `pos-ui_2025-10`
