function escapeXml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;')
}

export default defineEventHandler((event) => {
  setResponseHeader(event, 'content-type', 'application/xml; charset=utf-8')

  const config = useRuntimeConfig(event)
  const siteUrl = escapeXml(String(config.public.siteUrl).replace(/\/+$/, ''))
  const lastModified = new Date().toISOString().slice(0, 10)
  const pages = [
    { path: '/', changefreq: 'monthly', priority: '1.0' },
    { path: '/malaysia-dragon-incense', changefreq: 'monthly', priority: '0.9' },
    { path: '/dragon-incense-size-guide', changefreq: 'monthly', priority: '0.9' },
    { path: '/temple-festival-incense-customisation', changefreq: 'monthly', priority: '0.9' },
  ]

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(page => `  <url>
    <loc>${siteUrl}${page.path}</loc>
    <lastmod>${lastModified}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>
`
})
