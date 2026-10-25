type SeoSection = {
  heading: string
  paragraphs: string[]
  bullets?: string[]
}

type SeoFaq = {
  question: string
  answer: string
}

type SeoTranslation = {
  title: string
  introduction: string
  sections: SeoSection[]
}

export type SeoPage = {
  path: string
  eyebrow: string
  title: string
  description: string
  introduction: string
  image: string
  imageAlt: string
  sections: SeoSection[]
  faq: SeoFaq[]
  translation: SeoTranslation
}

export const guideLinks = [
  { path: '/malaysia-dragon-incense/', nav: '龙香介绍', title: '马来西亚手工龙香制作', text: '龙香的香身结构、手工塑龙、彩绘与燃点方式。' },
  { path: '/dragon-incense-size-guide/', nav: '尺寸指南', title: '龙香尺寸选择指南', text: '8 尺至 24 尺龙香的约略高度与适用场地。' },
  { path: '/temple-festival-incense-customisation/', nav: '庙庆订制', title: '庙庆神诞龙香订制', text: '尺数、颜色、龙形、题字与灯饰订制须知。' },
  { path: '/temple-incense-products/', nav: '香品目录', title: '桃香、大二伯爷香与寺庙用香', text: '桃香、大二伯爷香、龙凤喷水香与小香批发。' },
  { path: '/festival-dragon-incense/', nav: '节庆龙香', title: '九皇爷诞、天公诞等节庆龙香', text: '常用龙香的节庆与神诞，以及订制时间安排。' },
  { path: '/dragon-incense-price-guide/', nav: '价格参考', title: '龙香价格怎样计算？', text: '影响龙香报价的尺数、造型、数量与运输因素。' },
]

const facebookUrl = 'https://www.facebook.com/profile.php?id=100043191953658'
const whatsappUrl = 'https://wa.me/60163633329?text=%E6%82%A8%E5%A5%BD%EF%BC%8C%E6%88%91%E6%83%B3%E6%9F%A5%E8%AF%A2%E5%85%B4%E8%80%80%E4%BC%81%E4%B8%9A%E7%9A%84%E9%BE%99%E9%A6%99%EF%BC%8F%E5%AF%BA%E5%BA%99%E7%94%A8%E9%A6%99%E3%80%82'

const escapeHtml = (value: string) => value
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#039;')

const renderSections = (sections: SeoSection[]) => sections.map(section => `
  <section class="guide-section">
    <h2>${escapeHtml(section.heading)}</h2>
    ${section.paragraphs.map(paragraph => `<p>${escapeHtml(paragraph)}</p>`).join('')}
    ${section.bullets?.length ? `<ul>${section.bullets.map(item => `<li>${escapeHtml(item)}</li>`).join('')}</ul>` : ''}
  </section>
`).join('')

export function renderSeoPage(page: SeoPage, siteUrl: string) {
  const canonicalUrl = `${siteUrl}${page.path}`
  const imageUrl = `${siteUrl}${page.image}`
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['Organization', 'LocalBusiness'],
        '@id': `${siteUrl}/#organization`,
        name: '兴耀企业',
        alternateName: 'Heng Yau Enterprise',
        url: siteUrl,
        logo: `${siteUrl}/images/heng-yau-logo-transparent-v6.webp`,
        telephone: '+60 16-363 3329',
        email: 'sainem38@gmail.com',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Lot 455A, Stor (SKLC A21/5), Kampung Chuah',
          postalCode: '71960',
          addressLocality: 'Kampung Chuah, Port Dickson',
          addressRegion: 'Negeri Sembilan',
          addressCountry: 'MY',
        },
        sameAs: [facebookUrl],
      },
      {
        '@type': 'WebPage',
        '@id': `${canonicalUrl}#webpage`,
        url: canonicalUrl,
        name: page.title,
        description: page.description,
        inLanguage: ['zh-Hans', 'en'],
        about: { '@id': `${siteUrl}/#organization` },
        primaryImageOfPage: {
          '@type': 'ImageObject',
          url: imageUrl,
          caption: page.imageAlt,
        },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${canonicalUrl}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: '兴耀企业', item: `${siteUrl}/` },
          { '@type': 'ListItem', position: 2, name: page.title, item: canonicalUrl },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': `${canonicalUrl}#faq`,
        inLanguage: 'zh-Hans',
        mainEntity: page.faq.map(item => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: { '@type': 'Answer', text: item.answer },
        })),
      },
    ],
  }
  const jsonLd = JSON.stringify(structuredData).replaceAll('<', '\\u003c')

  return `<!doctype html>
<html lang="zh-Hans">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(page.title)}</title>
  <meta name="description" content="${escapeHtml(page.description)}">
  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
  <meta name="author" content="兴耀企业 Heng Yau Enterprise">
  <link rel="canonical" href="${canonicalUrl}">
  <link rel="icon" href="/favicon.ico" sizes="48x48">
  <link rel="icon" type="image/png" sizes="192x192" href="/icon-192.png">
  <link rel="apple-touch-icon" href="/apple-touch-icon.png">
  <meta property="og:type" content="article">
  <meta property="og:site_name" content="兴耀企业 Heng Yau Enterprise">
  <meta property="og:title" content="${escapeHtml(page.title)}">
  <meta property="og:description" content="${escapeHtml(page.description)}">
  <meta property="og:url" content="${canonicalUrl}">
  <meta property="og:image" content="${imageUrl}">
  <meta property="og:image:alt" content="${escapeHtml(page.imageAlt)}">
  <meta property="og:locale" content="zh_MY">
  <link rel="stylesheet" href="/seo-pages.css">
  <script type="application/ld+json">${jsonLd}</script>
</head>
<body>
  <header class="guide-header">
    <a class="guide-brand" href="/" aria-label="回到兴耀企业首页">
      <img src="/images/heng-yau-logo-transparent-v6.webp" alt="兴耀企业 Heng Yau Enterprise 马来西亚龙香标志" width="47" height="52">
      <span><strong>兴耀企业</strong><small>HENG YAU ENTERPRISE</small></span>
    </a>
    <nav aria-label="资料页导航">
      ${guideLinks.map(link => `<a href="${link.path}"${link.path === page.path ? ' aria-current="page"' : ''}>${escapeHtml(link.nav)}</a>`).join('\n      ')}
    </nav>
    <a class="guide-contact" href="${whatsappUrl}" target="_blank" rel="noopener">WhatsApp 查询</a>
  </header>

  <main>
    <section class="guide-hero">
      <img src="${page.image}" alt="${escapeHtml(page.imageAlt)}">
      <div class="guide-hero-shade"></div>
      <div class="guide-hero-content">
        <a class="breadcrumb" href="/">兴耀企业</a>
        <p>${escapeHtml(page.eyebrow)}</p>
        <h1>${escapeHtml(page.title)}</h1>
        <div class="guide-hero-intro">${escapeHtml(page.introduction)}</div>
      </div>
    </section>

    <article class="guide-body">
      <aside class="fact-panel" aria-label="兴耀企业资料">
        <div><strong>30+</strong><span>三十余年制香经验</span></div>
        <div><strong>8–24 尺</strong><span>龙香尺寸查询</span></div>
        <div><strong>朱湖区</strong><span>Kampung Chuah, Port Dickson</span></div>
      </aside>

      <div class="guide-content">
        ${renderSections(page.sections)}

        <section class="guide-faq">
          <p class="section-label">常见问题</p>
          <h2>查询前先了解</h2>
          ${page.faq.map((item, index) => `
            <details ${index === 0 ? 'open' : ''}>
              <summary>${escapeHtml(item.question)}</summary>
              <p>${escapeHtml(item.answer)}</p>
            </details>
          `).join('')}
        </section>

        <details class="english-translation">
          <summary>Read the complete English version</summary>
          <div lang="en">
            <h2>${escapeHtml(page.translation.title)}</h2>
            <p class="translation-intro">${escapeHtml(page.translation.introduction)}</p>
            ${renderSections(page.translation.sections)}
          </div>
        </details>

        <nav class="guide-related" aria-label="更多龙香资料">
          <p class="section-label">更多龙香资料</p>
          <h2>继续了解</h2>
          <ul>
            ${guideLinks.filter(link => link.path !== page.path).map(link => `<li><a href="${link.path}"><strong>${escapeHtml(link.title)}</strong><span>${escapeHtml(link.text)}</span></a></li>`).join('')}
          </ul>
        </nav>
      </div>
    </article>

    <section class="guide-cta">
      <div>
        <p>龙香订制查询</p>
        <h2>把场地、尺数、数量与日期发给我们。</h2>
      </div>
      <a href="${whatsappUrl}" target="_blank" rel="noopener">WhatsApp 016-363 3329</a>
    </section>
  </main>

  <footer class="guide-footer">
    <div><strong>兴耀企业 Heng Yau Enterprise</strong><span>Lot 455A, Stor (SKLC A21/5), Kampung Chuah, 71960 Port Dickson, Negeri Sembilan</span></div>
    <div><a href="mailto:sainem38@gmail.com">sainem38@gmail.com</a><a href="${facebookUrl}" target="_blank" rel="noopener">Facebook</a></div>
  </footer>
</body>
</html>`
}
