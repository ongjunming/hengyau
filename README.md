# 兴耀企业 · Heng Yau Enterprise

Traditional incense information site built with Nuxt. Chinese is the default language, with an English switcher.

## Setup

```bash
npm install
npm run dev
```

## Public settings

Copy `.env.example` to `.env` when you need to override the public contact number or canonical website address:

```env
NUXT_PUBLIC_WHATSAPP_NUMBER=60163633329
# NUXT_PUBLIC_SITE_URL=https://your-project.pages.dev
```

The phone number must use international format without `+`, spaces, or dashes. On Cloudflare Pages, the deployment URL is detected automatically when `NUXT_PUBLIC_SITE_URL` is not set.

## Production

```bash
npm run generate
```

The static site is generated in `.output/public`. Nuxt can later be extended with server routes, a CMS, product data, or ordering logic without rebuilding the public site from scratch.

Original generated brand artwork is stored in `brand-assets/`; optimized website assets are in `public/images/`.

## Cloudflare Pages

Import the GitHub repository into **Workers & Pages → Create application → Pages → Import an existing Git repository** and use:

- Production branch: `main`
- Build command: `npm run build:cloudflare`
- Build output directory: `dist`
- Root directory: leave blank (repository root)

No custom domain is required for the first deployment. Cloudflare provides a `*.pages.dev` address and the build uses it automatically for canonical URLs, the sitemap, Open Graph metadata, and structured data. Until `NUXT_PUBLIC_SITE_URL` is explicitly set, the temporary `pages.dev` site and all preview branches are marked `noindex`, so you can review them without creating a temporary search result.

When the permanent address is ready for search engines, add this Production environment variable and redeploy. It can be the final custom domain or the `pages.dev` address if you decide to keep that as the public website:

```env
NUXT_PUBLIC_SITE_URL=https://example.com
```

Then add the domain under the Pages project's **Custom domains** settings and redirect the old `*.pages.dev` address to the permanent domain with a 301 Bulk Redirect.
