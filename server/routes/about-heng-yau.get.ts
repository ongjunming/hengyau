import { renderSeoPage, type SeoPage } from '../utils/seo-page'

const page: SeoPage = {
  path: '/about-heng-yau/',
  lang: 'zh-Hans',
  eyebrow: '三十余年传统制香工坊｜ABOUT HENG YAU ENTERPRISE',
  title: '关于兴耀企业｜森美兰波德申朱湖三十余年手工龙香制造厂',
  description: '认识兴耀企业（Heng Yau Enterprise）——扎根马来西亚森美兰波德申朱湖区（Kampung Chuah）三十余年的传统大型龙香专业制造商，坚持手工塑龙、自然阴干与现代 LED 灯饰创新。',
  introduction: '兴耀企业（Heng Yau Enterprise）位于马来西亚森美兰州波德申朱湖区（Kampung Chuah），专注传统手工大型龙香与寺庙香品制造超过三十年。我们相信，每一柱立在神庙前的龙香，承载的都是信徒的心意与传统手艺的分量。',
  image: '/images/fb-workshop-craft-row-v30.webp',
  imageAlt: 'Heng Yau Enterprise traditional dragon joss stick workshop in Kampung Chuah, Port Dickson, Malaysia',
  sections: [
    {
      heading: '品牌使命与核心坚持',
      paragraphs: [
        '兴耀企业的使命是传承马来西亚传统手工制香工艺，同时结合稳固结构与现代 LED 灯饰及喷水设计，为全马各地庙宇与善信提供烧得稳、造型庄严、值得信赖的大型龙香产品。',
        '与纯靠机器贴纸量产的廉价香品不同，兴耀坚持每一支大龙香都由真材实料香粉压实香身，再由经验丰富的师傅手工塑出立体龙头、龙鳞、祥云与火焰，并按天气耐心自然阴干，不赶工、不偷工。',
      ],
      bullets: [
        '三十余年扎根森美兰波德申朱湖区（Kampung Chuah）本地制香工坊',
        '完整涵盖 8 尺、12 尺、16 尺、18 尺、21 尺、22 尺与 24 尺手工龙香定制',
        '传统手绘彩龙结合现代 LED 亮灯与龙凤喷水创新工艺',
        '服务覆盖森美兰、雪隆、马六甲、柔佛、霹雳、槟城及全马各地庙宇',
      ],
      gallery: [
        {
          image: '/images/fb-temple-trio-day-v30.webp',
          alt: 'Handmade Heng Yau dragon joss sticks displayed in front of a Malaysian Chinese temple',
          caption: '庙前实景：手工彩绘饱满，白天与夜晚同样醒目庄严',
        },
        {
          image: '/images/fb-night-led-row-v30.webp',
          alt: 'Illuminated dragon joss sticks crafted by Heng Yau Enterprise at night',
          caption: '结合现代 LED 灯饰，让传统龙香在夜间庙庆大放异彩',
        },
      ],
    },
    {
      heading: '官方联络与工坊认证资料',
      paragraphs: [
        '为方便庙宇理事、神料合作伙伴及海内外客户核实官方身份，以下为兴耀企业（Heng Yau Enterprise）唯一官方联络资料：',
      ],
      table: {
        caption: '兴耀企业官方资料表',
        headers: ['项目', '官方信息'],
        rows: [
          ['正式名称', '兴耀企业 / Heng Yau Enterprise'],
          ['专业领域', '马来西亚大型传统手工龙香制造商（Malaysia Dragon Joss Stick Specialist）'],
          ['工坊地址', 'Lot 455A, Stor (SKLC A21/5), Kampung Chuah, 71960 Port Dickson, Negeri Sembilan, Malaysia'],
          ['WhatsApp / 电话', '+60 16-363 3329（支持中文、英文、马来文查询）'],
          ['官方电邮', 'sainem38@gmail.com'],
          ['官方网站', 'https://hengyau.com/'],
          ['官方 Facebook', '兴耀企业（2.5K+ 关注，100% 推荐）'],
        ],
      },
    },
  ],
  faq: [
    {
      question: '兴耀企业的龙香工厂在哪里？',
      answer: '兴耀企业制香工坊位于森美兰州波德申朱湖区（Lot 455A, Stor (SKLC A21/5), Kampung Chuah, 71960 Port Dickson, Negeri Sembilan, Malaysia）。',
    },
    {
      question: '兴耀企业有多少年制香经验？',
      answer: '兴耀企业扎根朱湖区超过三十年，长期为全马各地庙宇、神坛与庆典单位手工制作 8 尺至 24 尺大龙香及各类寺庙用香。',
    },
    {
      question: '可以直接联络兴耀企业洽谈长期庙宇或神料批发合作吗？',
      answer: '可以。欢迎庙宇理事、神料店及庆典单位直接通过 WhatsApp 016-363 3329 或电邮 sainem38@gmail.com 联系洽谈。',
    },
  ],
  translation: {
    title: 'About Heng Yau Enterprise — 30+ Years Traditional Dragon Joss Stick Maker in Malaysia',
    introduction: 'Rooted in Kampung Chuah, Port Dickson, Negeri Sembilan for more than 30 years, Heng Yau Enterprise is Malaysia’s dedicated specialist in 8 ft to 24 ft handmade giant dragon joss sticks and temple offerings.',
    sections: [
      {
        heading: 'Heritage Craft Meets Modern Temple Celebrations',
        paragraphs: ['From blending incense powder and forming solid cores to hand-sculpting dragon scales, natural shade-drying, and integrating modern LED illumination, Heng Yau Enterprise serves temples across Negeri Sembilan, Kuala Lumpur, Selangor, Melaka, Johor, Perak, and Penang.'],
      },
    ],
  },
}

export default defineEventHandler((event) => {
  setResponseHeader(event, 'content-type', 'text/html; charset=utf-8')
  const siteUrl = String(useRuntimeConfig(event).public.siteUrl).replace(/\/+$/, '')
  return renderSeoPage(page, siteUrl)
})
