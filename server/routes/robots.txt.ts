export default defineEventHandler((event) => {
  setResponseHeader(event, 'content-type', 'text/plain; charset=utf-8')

  const config = useRuntimeConfig(event)
  const siteUrl = String(config.public.siteUrl).replace(/\/+$/, '')
  const preventIndexing = Boolean(config.public.preventIndexing)

  if (preventIndexing) {
    return 'User-agent: *\nDisallow: /\n'
  }

  return `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`
})
