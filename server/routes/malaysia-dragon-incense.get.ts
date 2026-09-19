import { renderSeoPage, type SeoPage } from '../utils/seo-page'

const page: SeoPage = {
  path: '/malaysia-dragon-incense',
  eyebrow: '马来西亚传统制香手艺',
  title: '马来西亚手工龙香制作｜兴耀企业',
  description: '了解马来西亚手工龙香的结构、制作步骤、祭祀用途与订制资料。兴耀企业扎根朱湖区三十余年。',
  introduction: '龙香不只是彩绘造型，主体仍是可燃的长形香身。兴耀企业在森美兰波德申朱湖区制作龙香三十余年，按庙宇场地、尺数、主题与活动日期确认每一批作品。',
  image: '/images/facebook-dragon-perspective-v15.webp',
  imageAlt: '马来西亚兴耀企业为庙庆制作的手工彩绘龙香',
  sections: [
    {
      heading: '什么是龙香？',
      paragraphs: [
        '龙香以香粉制成粗长香身，中间由木芯支撑。师傅再沿香身局部手工塑制龙首、龙身、龙鳞、火焰与祥云，最后上色和安装订制装饰。',
        '龙香顶端是燃点位置。点燃后，香身会缓慢燃烧、持续冒烟并留下香灰。因此造型必须顾及香身结构、龙形比例与实际燃点方式，不是一般的装饰柱。',
      ],
    },
    {
      heading: '一柱龙香怎样完成？',
      paragraphs: [
        '制作从调配香材、成型香身开始，待结构稳定后才进行塑龙、彩绘、阴干和出厂前检查。尺数越大，龙身层次、重量、干燥时间、运输和竖立方式越需要提前规划。',
      ],
      bullets: ['调香：挑选并调配制作香身的材料', '成柱：按所需尺数成型并稳固香身', '塑龙：手工塑出龙首、龙鳞、火焰与祥云', '阴干与检查：完成彩绘、结构与出厂检查'],
    },
    {
      heading: '龙香用在哪些仪式？',
      paragraphs: [
        '龙香常见于庙庆、神诞、酬神、祈福、法会与重要祭祀。中小尺数可配合净高较有限的场地，高身龙香则需要更完整的净空、支架、运输与安装规划。',
        '选择龙香不应只看尺数。庙宇入口、摆放位置、地面、遮棚、周边电线、风向与车辆进场路线都会影响最终规格。',
      ],
    },
    {
      heading: '兴耀企业可以订制哪些内容？',
      paragraphs: [
        '大型香品可按场地、尺数、颜色、龙形、题字、数量与灯饰需求确认。兴耀的目录包括 8 尺至 24 尺龙香、桃香、大二伯爷香、龙凤喷水香，以及小香、线香与盘香等常用庙用香品。',
      ],
    },
  ],
  faq: [
    { question: '龙香的主体真的是香吗？', answer: '是。龙香的粗长主体由可燃香粉制成，龙首、龙鳞、火焰与祥云等造型再沿香身手工完成。' },
    { question: '龙香可以加灯饰吗？', answer: '可以查询灯饰款式。灯饰、电源位置、安全距离与现场安装条件需在制作前一并确认。' },
    { question: '如何向兴耀企业查询？', answer: '通过 WhatsApp 016-363 3329 发送用途、场地照片、净高、所需日期、尺数与数量，再确认合适规格。' },
  ],
  translation: {
    title: 'Handmade Dragon Incense in Malaysia',
    introduction: 'Dragon incense is not merely a painted decorative column. Its main body remains a burnable incense form. Heng Yau Enterprise has made dragon incense in Kampung Chuah, Port Dickson for more than 30 years, confirming each work according to the temple site, height, theme and event date.',
    sections: [
      { heading: 'What is dragon incense?', paragraphs: ['A thick, long incense body is formed from incense powder and supported by a wooden core. The dragon head, body, scales, flames and clouds are shaped by hand along selected parts of the incense before painting and custom decoration.', 'The top is the lighting point. After ignition, the body burns slowly, continues to smoke and leaves incense ash. Its structure must therefore account for the incense body, dragon proportions and the way it will burn.'] },
      { heading: 'How is it made?', paragraphs: ['Work begins with preparing the incense material and forming a stable body. Sculpting, painting, shade-drying and final inspection follow. Larger sizes require more planning for structure, drying, transport and raising on site.'], bullets: ['Blend and prepare incense material', 'Form the body to the required nominal height', 'Sculpt the dragon, scales, flames and clouds by hand', 'Paint, shade-dry and inspect before release'] },
      { heading: 'Where is dragon incense used?', paragraphs: ['Dragon incense is commonly used for temple festivals, deity birthdays, thanksgiving rites, blessings, religious assemblies and important worship ceremonies. Clear height, ground, shelter, nearby power lines, wind and vehicle access all affect the suitable size.'] },
      { heading: 'What can Heng Yau customise?', paragraphs: ['Monumental incense can be planned around the site, height, colour, dragon form, wording, quantity and lighting. Heng Yau offers 8 to 24 ft dragon incense, peach incense, Da Er Bo Ye incense, dragon-and-phoenix water-spray incense, and everyday temple incense.'] },
    ],
  },
}

export default defineEventHandler((event) => {
  setResponseHeader(event, 'content-type', 'text/html; charset=utf-8')
  const siteUrl = String(useRuntimeConfig(event).public.siteUrl).replace(/\/+$/, '')
  return renderSeoPage(page, siteUrl)
})
