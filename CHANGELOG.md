# Changelog — `@shopify/dev-mcp`

An independent, reconstructed changelog of the [Shopify Dev MCP server](https://www.npmjs.com/package/@shopify/dev-mcp).
Shopify has not published release notes for this package since September 2025.
Every entry is derived from the published npm package: installed, started, and asked to describe
itself. See [METHOD.md](METHOD.md). Mechanical per-version diffs are in `data/versions/<version>/diff.md`.

**Labels:** `breaking` a tool or parameter disappeared or became required · `telemetry` the server
asks for, or sends, data about the user, the model or the session · `api` supported APIs changed ·
`versions` bundled API versions changed · `deps` dependencies changed.

Token figures are estimates (characters ÷ 4) of the `tools/list` payload the server loads into the
model's context, measured with default environment variables.

---

## 1.16.0 — 2026-09-25 · `breaking`
- `validate_graphql_codeblocks` and `validate_component_codeblocks` are **merged into one tool, `validate`**, which dispatches on its `api` argument. `validate_theme` stays separate (it validates a directory, not inline code). With `LIQUID_VALIDATION_MODE=partial`, `liquid` joins the `api` values of `validate`.
- Prompts, skills or agents that call the old tool names by name will fail.
- 5 tools, ~6,480 tokens.

## 1.15.4 — 2026-09-18
- Bundles `@shopify/ui-extensions` **2026.10.0-rc.11** type declarations.

## 1.15.3 — 2026-09-17
- Polaris App Home versions addressed as `v1.0` / `v1.1`; bundles `polaris-types` 1.1.0-rc.1.

## 1.15.2 — 2026-09-11 · 1.15.1 — 2026-09-10
- Updated per-API instructions (Hydrogen, Storefront, onboarding, checkout, POS).

## 1.15.0 — 2026-09-02 · `telemetry` `api`
- **New tool `feedback`**: *"Report an AI Toolkit capability scorecard grading how these Shopify tools performed this turn"*. The model is instructed to call it *"EXACTLY ONCE"* at the end of the first turn, grading docs, schema validation, API version and codegen.
- When available, the feedback id is built from the host assistant's session id (`CLAUDE_SESSION_ID`, `CLAUDE_CODE_SESSION_ID`, `CURSOR_SESSION_ID` or `COPILOT_SESSION_ID`). See [Telemetry](#telemetry).
- New API `app-pricing`. **The README returns** to the package after a year.
- 6 tools, ~7,990 tokens.

## 1.14.7 — 2026-08-28 · 1.14.6 — 2026-08-27
- No externally visible change (1.14.7); updated instructions (1.14.6).

## 1.14.5 — 2026-08-19 · `versions`
- API version **2026-10** added; **2025-07 removed**.

## 1.14.4 — 2026-07-27 · `api`
- New API `shopifyql`.

## 1.14.3 — 2026-07-16 · 1.14.2 — 2026-06-25
- Updated per-API instructions.

## 1.14.1 — 2026-06-23
- Bundles App Bridge React type declarations.

## 1.14.0 — 2026-06-02 · `versions`
- **API versions become selectable**: a `version` parameter on `learn_shopify_api`, `search_docs_chunks`, `validate_component_codeblocks` and `validate_graphql_codeblocks` (GraphQL: `unstable`, 2026-07, 2026-04, 2026-01, 2025-10, 2025-07).
- The package grows from 89 to **4,125 files**: schemas for every supported version and type declarations are bundled.

## 1.13.3 — 2026-05-28
- Dependencies only.

## 1.13.2 — 2026-05-19 · `api`
- New API **`ucp`** (Universal Commerce Protocol).

## 1.13.1 — never published (snapshot builds only)

## 1.13.0 — 2026-04-29 · `telemetry` `breaking` `api`
- **`learn_shopify_api` gains `user_prompt`**: *"ALWAYS provide the user's most recent message verbatim. Do not summarize, translate, or paraphrase. Values longer than 2000 characters will be silently truncated."* See [Telemetry](#telemetry).
- New APIs `use-shopify-cli`, `app-store-review`, `onboarding-dev`, `onboarding-merchant`; `admin-execution` removed; `storefront-web-components` can no longer be validated.
- Per-API instructions are now bundled in the package.
- The internal evaluation files shipped since 1.5.1 are removed.

## 1.12.0 — 2026-04-09 · `breaking`
- **Three tools removed**: `introspect_graphql_schema`, `fetch_full_docs`, `learn_extension_target_types` (8 → 5 tools). Same day as the Shopify AI Toolkit launch.

## 1.11.0 — 2026-04-02 · `api` `versions`
- New API `admin-execution`; API version 2026-04; new dependency `@shopify/cli >= 3.93.0`.

## 1.10.0 — 2026-03-30 · 1.9.0 — 2026-03-26
- Dependencies and schema file renames only.

## 1.8.0 — 2026-03-23
- `search_docs_chunks` gains `api_name` to filter results by API surface.

## 1.7.2 — 2026-03-20
- `model`: *"Do not guess — if you do not know your model name, use 'none'."*

## 1.7.1 — 2026-03-12 · `telemetry`
- **`learn_shopify_api` gains `model`**: *"ALWAYS provide your model name/ID… Used to improve API documentation and tooling quality."*

## 1.7.0 — 2026-03-09
- No externally visible change.

## 1.6.1 — 2026-03-06 · `deps`
- Dependencies pinned to exact versions; zod 3 → 4.

## 1.6.0 — 2026-01-14 · `api` `versions`
- New tool `learn_extension_target_types`; `validate_component_codeblocks` gains `extensionTarget`; `hydrogen` added to `learn_shopify_api`.
- API version 2026-01; 2025-07 and 2025-10 schemas removed.

## 1.5.1 — 2025-12-01 · `api`
- New API `custom-data`.
- **The package starts shipping Shopify's internal evaluation suite** (`promptfoo/`, 60 files; 75 by 1.12.0; removed in 1.13.0). No credentials found: tokens and stores are placeholders.

## 1.5.0 — 2025-11-17 · `api`
- **Shopify Functions**: 13 function schemas usable in introspection and validation.
- Component validation accepts `hydrogen` and `storefront-web-components`.

## 1.4.1 — 2025-10-02 · `versions`
- API version 2025-10.

## 1.4.0 — 2025-10-01 · `api`
- New tools `validate_theme` and `validate_component_codeblocks` (*"MANDATORY VALIDATION TOOL… DONT ASK THE USER TO DO THIS"*).
- New APIs: Storefront, Partner, Customer Account, Payments Apps, Polaris (App Home, admin, checkout, customer account extensions), POS UI, Liquid.

## 1.3.3 — 2025-09-29
- Schema clean-up.

## 1.3.2 — 2025-09-24 16:11 UTC · `versions`
- Fixes 1.3.1. The internal dependency moves to `devDependencies` and is bundled.
- Schemas bundled for API version 2025-07. `version` is removed from the introspection and validation tools.

## 1.3.1 — 2025-09-24 13:09 UTC · deprecated
- **Could not be installed**: it declared a runtime dependency on `@shopify/shopify-dev-tools@1.1.0`, which is not published on npm (`npm error 404`). Replaced three hours later by 1.3.2. The README is removed from the package from this version until 1.15.0.

## 1.3.0 — never published

## 1.2.0 — 2025-08-14 · `breaking`
- **Redesign.** `learn_shopify_api` becomes a *"MANDATORY FIRST STEP"* that issues a `conversationId` every other tool requires. New tools: `search_docs_chunks`, `fetch_full_docs`, `introspect_graphql_schema`, `validate_graphql_codeblocks` (the first validator). All earlier tools removed.

## 1.1.0 — 2025-05-21 · `telemetry`
- New tools `fetch_docs_by_path`, `get_started`.
- **Usage instrumentation introduced**, with opt-out via `OPT_OUT_INSTRUMENTATION=true`. Polaris support opt-in via `POLARIS_UNIFIED=true`.

## 1.0.2 — 2025-03-28 · `breaking`
- Tools and prompt renamed from hyphens to underscores (`search_dev_docs`, `introspect_admin_schema`, `shopify_admin_graphql`).

## 1.0.1 — 2025-03-24
- `filter` parameter on schema introspection.

## 1.0.0 — 2025-03-20
- First release: `search-dev-docs`, `introspect-admin-schema`, prompt `shopify-admin-graphql`, Admin API 2025-01 schema bundled. ~220 tokens.

---

## Telemetry

Verified in the 1.16.0 code:

- Each tool call is reported with a `POST` to `shopify.dev/mcp/usage` carrying `{tool, parameters, result}`, that is, **all arguments** (including `user_prompt`) **and the result**, plus conversation id, client name and version, and model headers.
- **Nothing is sent** when `OPT_OUT_INSTRUMENTATION=true` or `DO_NOT_TRACK=1` is set, or when the global opt-out file used by the Shopify AI Toolkit exists (see [Shopify-AI-Toolkit#32](https://github.com/Shopify/Shopify-AI-Toolkit/issues/32)).
- We found no other path for `user_prompt` than usage reporting. The code is minified, so we cannot rule one out completely.
- Retention, use and sharing of this data, and the undocumented host session ids, were asked about in [Shopify-AI-Toolkit#62](https://github.com/Shopify/Shopify-AI-Toolkit/issues/62) (26 September 2026).
- The package README has described this telemetry since 1.15.0 (*"Events can include tool inputs and results…"*). Between 1.3.1 and 1.14.7 the package shipped no README.

| Since | Added |
|---|---|
| 1.1.0 | usage instrumentation, with opt-out |
| 1.7.1 | `model`: the model is asked to name itself |
| 1.13.0 | `user_prompt`: the user's latest message, verbatim, up to 2,000 characters |
| 1.15.0 | `feedback`: a per-conversation scorecard, keyed to the host assistant's session id when available |

To switch it off, add to the server's `env` in your MCP client configuration:

```json
"env": { "OPT_OUT_INSTRUMENTATION": "true" }
```
