# Beviamo

Beviamo (*"let's drink" — Cervejas Artesanais*) is a craft beer storefront built on top of [Next.js Commerce](https://github.com/vercel/commerce), Vercel's provider-agnostic e-commerce starter. It keeps the original multi-provider architecture and Turborepo monorepo layout, with a custom UI and content layer for browsing breweries, beer styles, and products.

## Stack

- **Turborepo** monorepo, **pnpm** workspaces
- **Next.js 13** (pages router), **Tailwind CSS**
- Vercel Commerce's provider abstraction (`packages/commerce`) — the storefront talks to a swappable backend through a single typed API

## Project structure

```
packages/
  commerce/          shared types, hooks and the provider contract
  local/              zero-backend provider (static JSON data), used for local UI dev
  shopify/            Shopify Storefront API provider
  <bigcommerce|saleor|swell|vendure|...>/  other supported providers
site/
  pages/              Next.js routes, incl. custom search/cervejarias/[name] and product/[slug]
  custom/
    beviamo/          Beviamo-specific UI: ProductCard, ProductView, PartnerScroller, Reviews, ...
    components/       page-level custom components (brewery.tsx, search.tsx)
    common/Navbar/     site navigation
  data/               static content: partners, beer styles, products, reviews, FAQs
  commerce.config.json  feature toggles (cart, search, wishlist, customerAuth, customCheckout)
  commerce-config.js  wires COMMERCE_PROVIDER into next.config.js and syncs the @framework
                      tsconfig path to the selected provider on every start
```

## Getting started

```bash
pnpm install
pnpm build   # from the repo root — builds every provider package once
cd site
pnpm dev     # or run `pnpm dev` from the repo root to watch every package at once
```

The app runs at `http://localhost:3000`.

> First run after a fresh clone: always `pnpm build` from the repo root before `pnpm dev` inside `site/` — the provider packages need a compiled `dist/` to resolve against.

## Commerce provider

The active backend is selected by `COMMERCE_PROVIDER` in `site/.env.local`:

```
COMMERCE_PROVIDER=@vercel/commerce-local
```

`commerce-config.js` reads this once when `next.config.js` loads, so **changing it requires a full restart of `pnpm dev`** — saving `.env.local` alone does not pick it up.

If `COMMERCE_PROVIDER` is unset, it falls back to inferring a provider from whichever backend's env vars are present (Shopify, BigCommerce, Swell), defaulting to `@vercel/commerce-local` otherwise. An explicit `COMMERCE_PROVIDER` always wins over that inference.

Switching to Shopify:

```
COMMERCE_PROVIDER=@vercel/commerce-shopify
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=xxxxxxx.myshopify.com
NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN=xxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

`NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN` is a Storefront API token, not an Admin API key — Shopify designs it to be shipped to the client, so the `NEXT_PUBLIC_` prefix is intentional. Keep its scopes limited to read-only catalog access in the Shopify admin.

> The `@vercel/commerce-local` provider is a stand-in for UI work — it serves the generic demo catalog (`packages/local`), not Beviamo's real product data, and some demo image assets are not present in this repo. It's fine for building/testing components, not for previewing real content.

### Features

Toggle in `site/commerce.config.json`; the provider you're using must actually support the feature you're enabling:

```json
{
  "features": {
    "cart": true,
    "search": true,
    "wishlist": false,
    "customerAuth": false,
    "customCheckout": false
  }
}
```

### Adding a new provider

Follow [Adding a new Commerce Provider](packages/commerce/new-provider.md).

## Deployment

Deploys to Vercel with the project root set to `site/`.

```bash
cd site
vercel          # preview deployment
vercel --prod   # production
```

## Troubleshooting

<details>
<summary><code>next build</code> fails with <code>error TS5023: Unknown compiler option 'ignoreDeprecations'</code></summary>
<br>

VS Code's bundled TypeScript (5.5+) sometimes suggests adding `"ignoreDeprecations": "6.0"` to `site/tsconfig.json` to silence an editor-only deprecation warning (e.g. on `baseUrl`). The project's pinned TypeScript is **4.7.4** — it predates that option entirely and hard-errors on it before checking any file. Remove the line from `tsconfig.json`; it isn't needed by the actual build toolchain.
</details>

<details>
<summary>The homepage / a data-fetching page returns a 500</summary>
<br>

`getStaticProps` is failing to reach the configured commerce backend. Check the error payload for the underlying cause — e.g. a Shopify store returning `402 Payment Required` means the store itself is frozen (expired trial / lapsed billing), not a bad token or domain. Verify directly against the provider's API before assuming the code is at fault.
</details>

<details>
<summary>Intermittent <code>ENOENT .../packages/&lt;provider&gt;/dist/index.js</code> while running <code>pnpm dev</code></summary>
<br>

Each workspace package runs its own watcher (`clear dist → rebuild → watch`) under Turborepo. On Windows, stopping `pnpm dev` by killing only the process bound to port 3000 leaves the other package watchers running as orphans. Starting a second `pnpm dev` then leaves two watchers racing on the same `dist/` folder, which shows up as an intermittent missing-file error. Stop the entire process tree (Ctrl+C in the terminal that started it) before starting a new one; if in doubt, check `wmic process where "name='node.exe'" get ProcessId,CommandLine` for duplicate `turbo run dev` / `taskr` entries.
</details>

<details>
<summary>When run locally I get <code>Error: Cannot find module '...@vercel/commerce/dist/config'</code></summary>
<br>

This happens when running `pnpm dev` inside `site/` right after a fresh install, before any provider package has been built. Run `pnpm build` in the monorepo root first.

> Using `pnpm dev` from the repo root is recommended for day-to-day development — it runs watch mode on every package, not just `site/`.
</details>
