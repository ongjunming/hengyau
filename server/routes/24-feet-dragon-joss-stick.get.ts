import { renderSeoPage, type SeoPage } from '../utils/seo-page'

const page: SeoPage = {
  path: '/24-feet-dragon-joss-stick/',
  lang: 'zh-Hans',
  eyebrow: '21 尺 · 22 尺 · 24 尺超高规格｜GIANT DRAGON JOSS STICK',
  title: '24尺与21尺大型龙香订制｜24 Feet Giant Dragon Joss Stick Malaysia｜兴耀企业',
  description: '兴耀企业（Heng Yau Enterprise）专精制作马来西亚 21 尺、22 尺与 24 尺超高大型手工龙香（24 Feet / 21 Feet Giant Dragon Joss Stick），支援 LED 亮灯、龙凤喷水、全马运输与吊装支架规划。',
  introduction: '21 尺（约 6.4 米）、22 尺（约 6.7 米）与 24 尺（约 7.3 米）属于马来西亚大型庙庆与重要神诞的镇场主香。兴耀企业在森美兰朱湖工坊拥有三十余年制作超高规格龙香的实战经验，从香身压制、自然阴干到现场铁架稳固与吊立配合，逐案为庙宇确认妥当。',
  image: '/images/catalog-dragon-24ft-v26.webp',
  imageAlt: 'Heng Yau 24 feet handmade dragon joss stick displayed at a Malaysian temple',
  sections: [
    {
      heading: '21 尺、22 尺与 24 尺大型龙香规格对照',
      paragraphs: [
        '超过 20 尺的巨型龙香对香身密度、木芯强度、彩龙比例与底部三角支架都有极高要求。以下为兴耀企业三种最高规格的参考对比（最终总高需计入木芯与底座支架高度）：',
      ],
      table: {
        caption: '兴耀企业 21 尺至 24 尺大型龙香规格表',
        headers: ['标称规格', '约略高度', '常见视觉配置', '建议场地条件'],
        rows: [
          ['21 尺龙香 (21 ft)', '约 6.4 米', '红/绿/金三色彩龙、可选 LED 龙眼与祥云灯饰', '宽阔庙埕、无低矮屋檐或横跨电线'],
          ['22 尺龙香 (22 ft)', '约 6.7 米', '多柱成组或搭配龙凤喷水系统、远距主视觉', '大型广场或庙前主道、罗里可直接靠近'],
          ['24 尺龙香 (24 ft)', '约 7.3 米', '最大型庆典镇场主香、多层盘龙与庙名题字', '全开阔户外场地、需提前确认吊车或竖立空间'],
        ],
      },
      gallery: [
        {
          image: '/images/catalog-dragon-21ft-v26.webp',
          alt: 'Heng Yau 21 feet illuminated giant dragon joss stick at a Malaysian temple at night',
          caption: '21 尺夜间亮灯大龙香：三色彩龙盘身，夜间极具远距辨识度',
        },
        {
          image: '/images/fb-night-led-row-v30.webp',
          alt: 'Rows of tall handmade dragon joss sticks illuminated for a Malaysian temple festival',
          caption: '大型庙庆实景：多柱高身龙香整齐上架，气势庄严',
        },
      ],
    },
    {
      heading: '订制 24 尺大型龙香前必须确认的 5 项现场条件',
      paragraphs: [
        '高身龙香并非「买回去直接插地上」这么简单。为了确保神诞当天安全稳妥，兴耀会在接单前协助庙宇理事确认以下 5 项关键细节：',
      ],
      bullets: [
        '上方净空高度：确认摆放点正上方与四周无高压电线、树枝或遮棚阻挡。',
        '地面平整与承重：水泥地或压实平地最利于重型三角支架稳固固定。',
        '运输与进场路线：24 尺长身需确认大罗里转弯半径与卸货空间。',
        '现场竖立方式：按高度与现场空间评估人力上架或吊车配合。',
        '提前排期阴干：巨型龙香香身厚实，建议至少提前 1.5 至 2 个月预订。',
      ],
    },
  ],
  faq: [
    {
      question: '24 尺龙香大概要提早多久订制？',
      answer: '由于 21 尺至 24 尺龙香香身粗厚、纯手工塑龙与自然阴干耗时较长，尤其遇上天公诞、九皇爷诞或大庙神诞旺季，建议至少提前 1.5 至 2 个月通过 WhatsApp 016-363 3329 联系兴耀企业排期。',
    },
    {
      question: '21 尺与 24 尺龙香可以加 LED 亮灯或喷水效果吗？',
      answer: '可以。兴耀可为高身龙香客制 LED 龙头亮灯、龙身彩灯，或规划 22 尺级龙凤喷水香组合，只需在订制前确认现场电源与供水位置。',
    },
    {
      question: '外州庙宇（如雪隆、柔佛、马六甲、霹雳、槟城）可以订 24 尺龙香吗？',
      answer: '可以。兴耀企业从森美兰波德申朱湖工坊发车，长期配合全马各地庙宇安排大型龙香运输与现场上架规划。',
    },
  ],
  translation: {
    title: '24 Feet & 21 Feet Giant Dragon Joss Sticks in Malaysia',
    introduction: 'Heng Yau Enterprise manufactures monumental 21 ft (6.4 m), 22 ft (6.7 m), and 24 ft (7.3 m) handmade dragon joss sticks for major Malaysian temple festivals, Jade Emperor Birthday, and Nine Emperor Gods celebrations.',
    sections: [
      {
        heading: 'Site Assessment & Custom Engineering',
        paragraphs: ['Every 21 ft to 24 ft order is confirmed against overhead clearance, power lines, ground stability, heavy-duty stand anchoring, lorry access, and lifting requirements before production begins. Contact Heng Yau Enterprise on WhatsApp at +60 16-363 3329 with your venue photos and festival date.'],
      },
    ],
  },
}

export default defineEventHandler((event) => {
  setResponseHeader(event, 'content-type', 'text/html; charset=utf-8')
  const siteUrl = String(useRuntimeConfig(event).public.siteUrl).replace(/\/+$/, '')
  return renderSeoPage(page, siteUrl)
})
