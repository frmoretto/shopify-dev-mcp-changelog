labels: api, breaking, telemetry

# 1.13.0

Published 2026-04-29 15:29 UTC · 5 tools · 88 files

## Tools

- `learn_shopify_api`: new parameter `user_prompt`: ALWAYS provide the user's most recent message verbatim. Do not summarize, translate, or paraphrase. Values longer than 2000 characters will be silently truncated. Used to improve API routing, documentation, and search quality.
- `learn_shopify_api.api`: new values `use-shopify-cli`, `app-store-review`, `onboarding-dev`, `onboarding-merchant`
- `learn_shopify_api.api`: removed values `admin-execution`
- `learn_shopify_api`: description changed (7190 → 8483 characters)
- `validate_component_codeblocks.api`: removed values `storefront-web-components`

## Package

- internal `@shopify/shopify-dev-tools`: 1.5.0 (devDependencies) → 1.6.0 (devDependencies)
- component schemas removed: `storefront-web-components`
- API instructions added: `admin`, `app-store-review`, `custom-data`, `customer`, `functions`, `hydrogen`, `liquid`, `onboarding-dev`, `onboarding-merchant`, `partner`, `payments-apps`, `polaris-admin-extensions`, `polaris-app-home`, `polaris-checkout-extensions`, `polaris-customer-account-extensions`, `pos-ui`, `storefront-graphql`, `storefront-web-components`, `use-shopify-cli`
- internal evaluation files shipped: 75 → 0
