import { renderSeoPage, type SeoPage } from '../utils/seo-page'

const page: SeoPage = {
  path: '/temple-incense-products/',
  eyebrow: '桃香 · 大二伯爷香 · 龙凤喷水香 · 寺庙用香',
  title: '寺庙用香目录｜桃香、大二伯爷香与龙凤喷水香',
  description: '兴耀企业马来西亚寺庙用香目录：8 尺桃香、大二伯爷香、龙凤喷水香，以及小香、线香、盘香批发。可按庙宇主题订制尺数、颜色与题字。',
  introduction: '除了 8 尺至 24 尺龙香，兴耀企业也在森美兰波德申朱湖区制作桃香、大二伯爷香与龙凤喷水香等大型仪式香品，并供应庙宇日常所需的小香、线香与盘香。',
  image: '/images/catalog-peach-incense-v25.webp',
  imageAlt: '三柱八尺兴耀桃香与独立三角支架产品展示',
  sections: [
    {
      heading: '8 尺桃香：桃纹祝寿款',
      paragraphs: [
        '桃香以长形香身配合桃形彩绘与吉祥文字，保留传统大香的庄重比例，适合祝寿、神诞、祈福与酬神敬奉。参考规格约 8 尺（2.4 米）。',
        '实际高度、桃纹排列、香身颜色与题字内容会在制作前逐项确认。如有指定排版，可连同参考图一并发送。',
      ],
      bullets: ['神明圣诞与庙宇庆典', '祝寿、祈福与酬神敬奉', '需要吉祥文字主题的成组香品'],
    },
    {
      heading: '大二伯爷香：立体彩塑与长身款',
      paragraphs: [
        '大二伯爷香结合可燃香体、大伯爷与二伯爷立体彩塑人物、匾额与吉祥纹样，是为特定神诞和庙庆主题制作的仪式香品。人物、牌匾、底座与图案均按订单组合。',
        '长身款以绿色长身香配合大二伯爷图案、桃纹与金色饰带，常以三柱组合敬奉。尺数、颜色、正面图案与排列均可按庙宇主题调整。',
      ],
      bullets: ['大伯爷、二伯爷神诞庆典', '庙宇酬神与成组敬奉', '需要人物彩塑与题字的仪式陈设'],
    },
    {
      heading: '龙凤喷水香：大型庆典主景',
      paragraphs: [
        '龙凤喷水香以高身龙凤彩塑香配合水池、管线与喷水装置，适合希望仪式主景兼具动态水景效果的大型神诞与庙庆。参考作品约 22 尺。',
        '实际尺数、龙凤组合、配色、水池、泵浦、电源与支架均按现场条件订制，须先确认场地净高、地面、供排水、安全距离与安装时间。',
      ],
    },
    {
      heading: '小香、线香与盘香批发',
      paragraphs: [
        '除大型订制香品外，兴耀也供应日常敬香与常用庙用香品，包括小香、线香及盘香，适合庙宇日常补货、家庭祭祀与团体批发采购。',
        '实际供应款式、规格、包装与库存会随批次调整，订购前请通过 WhatsApp 发送所需类别、数量与取货日期，再确认当时可供应的款式。',
      ],
    },
  ],
  faq: [
    { question: '桃香和龙香有什么不同？', answer: '两者都是可燃的大型仪式香。龙香沿香身手工塑出龙首、龙鳞与祥云；桃香则以桃纹彩绘与吉祥文字为主题，常用于祝寿与神诞。' },
    { question: '大二伯爷香可以按庙宇主题订制吗？', answer: '可以。人物组合、题字、配色、尺数与排列可按庙宇主题确认，请发送摆放位置、活动日期与数量。' },
    { question: '兴耀企业有供应小香批发吗？', answer: '有。兴耀供应小香、线香及盘香等常用庙用香品，可按数量查询批发与配货安排。' },
  ],
  translation: {
    title: 'Temple Incense Catalogue: Peach, Da Er Bo Ye and Water-Spray Incense',
    introduction: 'Besides 8 to 24 ft dragon incense, Heng Yau Enterprise in Kampung Chuah, Port Dickson makes peach incense, Da Er Bo Ye incense and dragon-and-phoenix water-spray incense, and supplies everyday small incense, joss sticks and coil incense to temples in Malaysia.',
    sections: [
      { heading: '8 ft peach incense', paragraphs: ['A long incense body decorated with painted peaches and auspicious wording, suited to longevity blessings, deity birthdays and thanksgiving rites. Colour, wording and quantity are confirmed per order.'] },
      { heading: 'Da Er Bo Ye incense', paragraphs: ['Burnable incense combined with sculpted Da Bo Ye and Er Bo Ye figures, plaques and auspicious motifs. A long-form green style is also available, usually offered as a set of three.'] },
      { heading: 'Dragon-and-phoenix water-spray incense', paragraphs: ['Tall dragon and phoenix incense with a water basin and spray system for large festivals. The reference work is about 22 ft; pumps, power, water supply and supports are planned per site.'] },
      { heading: 'Wholesale everyday temple incense', paragraphs: ['Small incense, joss sticks and coil incense for daily temple use, household worship and group purchases. Available styles vary by batch; please confirm by WhatsApp.'] },
    ],
  },
}

export default defineEventHandler((event) => {
  setResponseHeader(event, 'content-type', 'text/html; charset=utf-8')
  const siteUrl = String(useRuntimeConfig(event).public.siteUrl).replace(/\/+$/, '')
  return renderSeoPage(page, siteUrl)
})
