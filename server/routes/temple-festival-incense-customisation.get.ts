import { renderSeoPage, type SeoPage } from '../utils/seo-page'

const page: SeoPage = {
  path: '/temple-festival-incense-customisation',
  eyebrow: '庙庆·神诞·酬神用香',
  title: '庙庆神诞龙香订制｜尺数、造型与灯饰',
  description: '兴耀企业提供马来西亚庙庆、神诞与酬神龙香订制查询，可按尺数、颜色、龙形、题字、数量与灯饰确认。',
  introduction: '庙庆龙香是按场地与仪式条件完成的项目。除了选择尺数，还需要把主题颜色、龙形、数量、题字、灯饰、运输与安装条件一起确认，才能让成品符合庆典现场。',
  image: '/images/facebook-led-dragon-temple-v15.webp',
  imageAlt: '马来西亚庙庆现场成排点亮的兴耀企业龙香',
  sections: [
    {
      heading: '哪些庙庆与仪式会使用龙香？',
      paragraphs: [
        '龙香常用于神明圣诞、庙庆、酬神、祈福、法会与重要祭祀。一般会按庙宇入口、主坛前、庙埕或户外庆典主场的空间条件安排尺数与数量。',
        '如果活动需要日夜展示，可在确认现场电源、走线和安全距离后查询灯饰款式。灯饰应配合龙形线条，不能影响香身燃点与现场操作。',
      ],
    },
    {
      heading: '可以订制哪些项目？',
      paragraphs: [
        '兴耀企业会从现场条件出发，再确认尺数与造型。龙香仍保留可燃香身与手工塑龙的基本结构，但颜色、龙形层次、火焰、祥云、题字和灯饰可按项目确认。',
      ],
      bullets: ['尺数：8、12、16、18、21、22 与 24 尺龙香查询', '颜色：配合庙宇主题、仪式与成组陈设', '造型：龙首、盘龙、龙鳞、火焰与祥云组合', '文字：按香品款式确认题字与排列', '灯饰：根据现场电源、走线与安全条件确认'],
    },
    {
      heading: '除了龙香，还有哪些庙庆香品？',
      paragraphs: [
        '兴耀的目录还包括桃香、大二伯爷香、龙凤喷水香，以及小香、线香、盘香等常用庙用香品。桃香可配合祝寿、祈福与神诞主题；大二伯爷香按人物、牌匾、题字与整体尺寸确认。',
        '龙凤喷水香涉及高身香品、水池、泵浦、管线、电源与支架，属于需要更完整现场资料的大型订制项目。',
      ],
    },
    {
      heading: '怎样发送一份清楚的订制查询？',
      paragraphs: [
        '查询时一次发送完整资料，可让尺寸、时间与现场安排更容易确认。如果尚未知道合适尺数，先提供现场照片与净高，再一起评估。',
      ],
      bullets: ['庙宇名称、活动类型与所需日期', '预计摆放位置的全景照片与净高', '所需数量、偏好尺数、颜色、龙形与文字', '是否需要灯饰，现场是否有电源', '地面、周边电线、车辆进场与卸货条件'],
    },
  ],
  faq: [
    { question: '龙香可以完全按照照片复制吗？', answer: '参考照片可用来沟通龙形、颜色与整体方向，但最终比例、结构、支架与细节会按手工制作和现场条件确认。' },
    { question: '灯饰龙香需要庙方准备什么？', answer: '需先确认现场电源、走线、户外使用条件和安全距离。实际灯饰与安装安排会按项目回复。' },
    { question: '兴耀企业的工坊在哪里？', answer: '兴耀企业位于 Lot 455A, Stor (SKLC A21/5), Kampung Chuah（朱湖区）, 71960 Port Dickson, Negeri Sembilan。' },
  ],
  translation: {
    title: 'Custom Dragon Incense for Temple Festivals and Deity Birthdays',
    introduction: 'A festival dragon-incense order is planned around both venue and ceremony. Beyond height, the theme colour, dragon form, quantity, wording, lighting, transport and installation conditions must be confirmed together.',
    sections: [
      { heading: 'Which ceremonies use dragon incense?', paragraphs: ['Dragon incense is used for deity birthdays, temple festivals, thanksgiving rites, blessings, religious assemblies and important worship ceremonies. Size and quantity depend on whether the work stands at an entrance, before the main altar, in a forecourt or at an outdoor event ground.'] },
      { heading: 'What can be customised?', paragraphs: ['Heng Yau confirms the site first, then height and design. The burnable incense body and hand-sculpted dragon remain essential, while colour, dragon layers, flames, clouds, wording and lighting can be planned for the project.'], bullets: ['8 to 24 ft dragon incense enquiries', 'Colour and grouped display', 'Dragon head, coiled body, scales, flames and clouds', 'Wording suited to the incense style', 'Lighting based on power and safe site conditions'] },
      { heading: 'Other ceremonial incense', paragraphs: ['The catalogue also includes peach incense, Da Er Bo Ye incense, dragon-and-phoenix water-spray incense, and everyday temple incense such as small joss sticks, incense sticks and spiral incense. Each custom work has different structural and site requirements.'] },
      { heading: 'How to send a clear enquiry', paragraphs: ['Send the event date, site photographs, clear height and preferred quantity together. If you do not yet know the appropriate size, the venue information should come first.'], bullets: ['Temple, event type and required date', 'Placement photographs and clear height', 'Quantity, preferred size, colour, form and wording', 'Lighting requirement and available power', 'Ground, nearby power lines, vehicle and unloading access'] },
    ],
  },
}

export default defineEventHandler((event) => {
  setResponseHeader(event, 'content-type', 'text/html; charset=utf-8')
  const siteUrl = String(useRuntimeConfig(event).public.siteUrl).replace(/\/+$/, '')
  return renderSeoPage(page, siteUrl)
})
