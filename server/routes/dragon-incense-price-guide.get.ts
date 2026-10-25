import { renderSeoPage, type SeoPage } from '../utils/seo-page'

const page: SeoPage = {
  path: '/dragon-incense-price-guide/',
  eyebrow: '龙香报价参考',
  title: '龙香价格怎样计算？影响报价的 7 个因素',
  description: '马来西亚龙香价格受尺数、龙形造型、彩绘颜色、灯饰、数量、运输距离与安装条件影响。了解报价因素，并向兴耀企业发送资料获取准确报价。',
  introduction: '每柱龙香都按尺数、造型与现场条件制作，所以没有一个适用于所有订单的固定价格。了解影响报价的因素，可以帮助庙方与庆典单位更快获得准确报价。',
  image: '/images/catalog-dragon-12ft-v22.webp',
  imageAlt: '兴耀企业十二尺手工彩绘龙香产品展示',
  sections: [
    {
      heading: '1. 尺数',
      paragraphs: [
        '尺数是影响报价的首要因素。香身越高越粗，所需香材、木芯、制作时间与阴干时间越多。兴耀的龙香规格由 8 尺至 24 尺，详细高度可参考龙香尺寸选择指南。',
      ],
    },
    {
      heading: '2. 龙形与造型复杂度',
      paragraphs: [
        '龙首、龙鳞、火焰与祥云都是手工塑制。盘龙层次越多、细节越精细，所需工时越长。桃香、大二伯爷香与龙凤喷水香等主题香品也会按造型计算。',
      ],
    },
    {
      heading: '3. 颜色与彩绘',
      paragraphs: [
        '香身颜色、龙身配色与彩绘细致程度会影响工序。指定配色或特别主题，请在查询时附上参考图片。',
      ],
    },
    {
      heading: '4. 题字与订制装饰',
      paragraphs: [
        '庙名、祝愿文字、匾额或其他订制装饰需要额外制作与确认，报价会按内容与位置计算。',
      ],
    },
    {
      heading: '5. 灯饰',
      paragraphs: [
        '夜间亮灯龙香需配置灯饰与走线，并确认电源位置与安全距离。是否加灯饰会影响整体报价。',
      ],
    },
    {
      heading: '6. 数量',
      paragraphs: [
        '成对或成排订制时，统一规格能让制作安排更有效率。请在查询时说明所需数量与是否需要统一款式。',
      ],
    },
    {
      heading: '7. 运输、竖立与支架',
      paragraphs: [
        '高身龙香需要合适车辆、卸货空间、竖立人手与支架固定。运输距离、场地进出条件与安装需求都会纳入报价考虑。',
      ],
    },
    {
      heading: '如何获得准确报价？',
      paragraphs: [
        '请通过 WhatsApp 发送以下资料，兴耀企业会按订单逐案回复报价与制作安排。',
      ],
      bullets: ['用途与活动日期（例如天公诞、九皇爷诞、神诞）', '所需尺数与数量', '偏好颜色、龙形、题字与是否需要灯饰', '摆放位置照片与最低净高', '庙宇或活动地点，以便估算运输'],
    },
  ],
  faq: [
    { question: '龙香有固定价格表吗？', answer: '由于尺数、造型、颜色、灯饰、数量与运输条件各不相同，兴耀按每张订单逐案报价。' },
    { question: '8 尺龙香会比 24 尺便宜很多吗？', answer: '一般而言尺数越小，所需材料、工时与运输安排越少。实际报价仍需按款式与数量确认。' },
    { question: '报价包括运输和竖立吗？', answer: '请在查询时说明活动地点与现场条件，兴耀会说明运输、竖立与支架的安排方式。' },
  ],
  translation: {
    title: 'How Is Dragon Incense Priced?',
    introduction: 'Every dragon incense is made to a specific height, design and site, so there is no single fixed price for all orders. Understanding the main cost factors helps temples and organisers receive an accurate quotation sooner.',
    sections: [
      { heading: 'Main price factors', paragraphs: ['Quotations depend on the following factors.'], bullets: ['Nominal height, from 8 to 24 ft', 'Dragon form and level of sculpted detail', 'Colour and painting', 'Wording and custom decoration', 'Lighting and power arrangements', 'Quantity and matching sets', 'Transport distance, raising and supports'] },
      { heading: 'How to get a quotation', paragraphs: ['Send the occasion and date, height and quantity, design preferences, site photos with the lowest clear height, and the event location by WhatsApp. Heng Yau will reply with a quotation and production plan.'] },
    ],
  },
}

export default defineEventHandler((event) => {
  setResponseHeader(event, 'content-type', 'text/html; charset=utf-8')
  const siteUrl = String(useRuntimeConfig(event).public.siteUrl).replace(/\/+$/, '')
  return renderSeoPage(page, siteUrl)
})
