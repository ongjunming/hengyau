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
    {
      path: '/',
      changefreq: 'monthly',
      priority: '1.0',
      images: [
        { loc: '/images/facebook-led-dragon-night-v14.webp', title: '马来西亚兴耀企业庙庆手工彩绘亮灯高身龙香实景' },
        { loc: '/images/catalog-dragon-08ft-v23.webp', title: '8 尺龙香｜兴耀企业马来西亚手工龙香' },
        { loc: '/images/catalog-dragon-12ft-v22.webp', title: '12 尺龙香｜兴耀企业马来西亚手工龙香' },
        { loc: '/images/catalog-dragon-16ft-v22.webp', title: '16 尺龙香｜兴耀企业马来西亚手工龙香' },
        { loc: '/images/catalog-dragon-18ft-v22.webp', title: '18 尺龙香｜兴耀企业马来西亚手工龙香' },
        { loc: '/images/catalog-dragon-21ft-v26.webp', title: '21 尺龙香｜兴耀企业马来西亚手工龙香' },
        { loc: '/images/catalog-dragon-22ft-v26.webp', title: '22 尺龙香｜兴耀企业马来西亚手工龙香' },
        { loc: '/images/catalog-dragon-24ft-v26.webp', title: '24 尺龙香｜兴耀企业马来西亚手工龙香' },
        { loc: '/images/catalog-peach-incense-v25.webp', title: '8 尺桃香｜兴耀企业寺庙用香' },
        { loc: '/images/catalog-da-er-bo-ye-incense-v21.webp', title: '大二伯爷香｜兴耀企业寺庙用香' },
        { loc: '/images/catalog-dragon-phoenix-fountain-v21.webp', title: '龙凤喷水香｜兴耀企业大型庙庆订制' },
      ],
    },
    {
      path: '/malaysia-dragon-incense/',
      changefreq: 'monthly',
      priority: '0.9',
      images: [
        { loc: '/images/facebook-dragon-perspective-v15.webp', title: '马来西亚兴耀企业为庙庆制作的手工彩绘龙香' },
        { loc: '/images/heng-yau-craft-hands-v28.webp', title: '兴耀企业师傅手工塑制龙香龙鳞与彩绘细节' },
      ],
    },
    {
      path: '/dragon-incense-size-guide/',
      changefreq: 'monthly',
      priority: '0.9',
      images: [
        { loc: '/images/catalog-dragon-24ft-v26.webp', title: '兴耀企业二十四尺超高龙香规格展示' },
      ],
    },
    {
      path: '/temple-festival-incense-customisation/',
      changefreq: 'monthly',
      priority: '0.9',
      images: [
        { loc: '/images/facebook-led-dragon-temple-v15.webp', title: '马来西亚庙庆现场成排点亮的兴耀企业龙香' },
      ],
    },
    {
      path: '/temple-incense-products/',
      changefreq: 'monthly',
      priority: '0.8',
      images: [
        { loc: '/images/catalog-peach-incense-v25.webp', title: '兴耀企业八尺桃香与寺庙用香目录' },
      ],
    },
    {
      path: '/festival-dragon-incense/',
      changefreq: 'monthly',
      priority: '0.8',
      images: [
        { loc: '/images/facebook-led-dragon-temple-v15.webp', title: '天公诞与九皇爷诞节庆手工龙香' },
      ],
    },
    {
      path: '/dragon-incense-price-guide/',
      changefreq: 'monthly',
      priority: '0.8',
      images: [
        { loc: '/images/catalog-dragon-12ft-v22.webp', title: '兴耀企业十二尺手工彩绘龙香报价参考' },
      ],
    },
  ]

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${pages.map(page => `  <url>
    <loc>${siteUrl}${page.path}</loc>
    <lastmod>${lastModified}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>${page.images.map(img => `
    <image:image>
      <image:loc>${siteUrl}${escapeXml(img.loc)}</image:loc>
      <image:title>${escapeXml(img.title)}</image:title>
    </image:image>`).join('')}
  </url>`).join('\n')}
</urlset>
`
})
