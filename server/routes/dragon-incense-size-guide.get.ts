import { renderSeoPage, type SeoPage } from '../utils/seo-page'

const page: SeoPage = {
  path: '/dragon-incense-size-guide',
  eyebrow: '8 尺至 24 尺龙香',
  title: '龙香尺寸选择指南｜庙庆高身龙香',
  description: '比较 8、12、16、18、21、22 与 24 尺龙香的约略高度、适用场地和订制前必须确认的净高、支架与安装资料。',
  introduction: '龙香尺数代表约略规格，但现场所需净高还会受木芯、底座、支架、龙首与安装方式影响。选择时应先看场地，再看仪式规模与想呈现的视觉比例。',
  image: '/images/catalog-dragon-24ft-v26.webp',
  imageAlt: '从低角度仰望兴耀企业三柱超高二十四尺龙香',
  sections: [
    {
      heading: '8 尺与 12 尺：兼顾仪式感与场地',
      paragraphs: [
        '8 尺约 2.4 米，适合净高较有限的庙宇、有棚空间、社区庆典或多柱成组敬奉。虽然比例紧凑，仍可保留完整龙首与彩绘香身。',
        '12 尺约 3.7 米，高度与造型更有存在感，可用在庙前主场、神诞、酬神与祈福仪式。如需灯饰，应在订制时一并确认电源与走线。',
      ],
    },
    {
      heading: '16 尺与 18 尺：大型庙庆主香',
      paragraphs: [
        '16 尺约 4.9 米，较长香身可展现更完整的盘龙、祥云与火焰层次，适合开阔庙埕和户外庆典。',
        '18 尺约 5.5 米，更强调向上气势与主视觉。除了净高，制作前还应确认风向、地面、固定方式、运输路线和周边电线。',
      ],
    },
    {
      heading: '21、22 与 24 尺：高身项目规格',
      paragraphs: [
        '21 尺约 6.4 米，22 尺约 6.7 米，24 尺约 7.3 米。这些高身规格适合具备充足净空、运输与安装条件的大型庙庆场地。',
        '高身龙香不能只按尺数下单。香身比例、龙形层次、支架结构、地面固定、车辆可达性、竖立范围与当地天气条件都要逐案确认。',
      ],
    },
    {
      heading: '订制前的现场检查清单',
      paragraphs: [
        '建议先从香品预计摆放位置拍摄全景与高处照片，并量度地面至遮棚、屋檐、横梁或电线的最低净高。完整资料可减少尺寸与进场安排的误差。',
      ],
      bullets: ['摆放位置和场地全景照片', '地面至遮棚、横梁或电线的净高', '地面材质、固定空间与周边安全距离', '车辆进场、卸货和竖立范围', '活动日期、数量、偏好颜色和灯饰需求'],
    },
  ],
  faq: [
    { question: '龙香的标称尺数就是最终总高吗？', answer: '不一定。标称尺数是约略规格，实际香身、木芯、龙首位置、底座与支架总高会按款式与安装方式确认。' },
    { question: '如果场地有遮棚，应该选哪一种尺寸？', answer: '请先提供实际最低净高、入口高度和摆放位置照片。不建议只按一般遮棚高度推测尺数。' },
    { question: '高身龙香需要提前多久订制？', answer: '制作期会受尺数、数量、造型、天气、干燥、运输与安装条件影响。请尽早发送活动日期与现场资料，由兴耀逐案回复。' },
  ],
  translation: {
    title: 'Dragon Incense Size Guide: 8 to 24 ft',
    introduction: 'A nominal size is only an approximate specification. The required clear height also depends on the wooden core, base, support, dragon head and installation method. Select a size by checking the site first, then the ceremony scale and intended visual proportion.',
    sections: [
      { heading: '8 ft and 12 ft', paragraphs: ['An 8 ft work is about 2.4 m and can suit venues with more limited clear height, covered areas, community events or grouped offerings. A 12 ft work is about 3.7 m and provides more presence for temple forecourts, deity birthdays and thanksgiving rites.'] },
      { heading: '16 ft and 18 ft', paragraphs: ['A 16 ft work is about 4.9 m and allows more complete dragon, flame and cloud layers. An 18 ft work is about 5.5 m and gives a taller ceremonial focal point. Both require clear site, ground, wind, transport and overhead-wire checks.'] },
      { heading: '21, 22 and 24 ft', paragraphs: ['Approximate heights are 6.4 m, 6.7 m and 7.3 m. These project sizes require ample clearance, suitable access, structural supports, raising space and site-specific installation planning.'] },
      { heading: 'Site checklist before ordering', paragraphs: ['Photograph the intended position and measure the lowest clearance to a roof, beam or power line. Complete information reduces uncertainty in sizing and access planning.'], bullets: ['Venue overview and intended placement', 'Lowest clear height and entrance height', 'Ground, fixing space and safe clearance', 'Vehicle access, unloading and raising space', 'Event date, quantity, colour and lighting preference'] },
    ],
  },
}

export default defineEventHandler((event) => {
  setResponseHeader(event, 'content-type', 'text/html; charset=utf-8')
  const siteUrl = String(useRuntimeConfig(event).public.siteUrl).replace(/\/+$/, '')
  return renderSeoPage(page, siteUrl)
})
