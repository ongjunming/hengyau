import { renderSeoPage, type SeoPage } from '../utils/seo-page'

const page: SeoPage = {
  path: '/festival-dragon-incense/',
  eyebrow: '天公诞 · 九皇爷诞 · 神诞庙庆',
  title: '节庆龙香｜天公诞、九皇爷诞与神诞庙庆龙香订制',
  description: '马来西亚天公诞、九皇爷诞、观音诞、中元与各神明千秋常见大型龙香。了解节庆龙香的用途、尺寸选择与提前订制时间，兴耀企业朱湖区手工制作。',
  introduction: '在马来西亚，大型龙香常在天公诞、九皇爷诞、各神明千秋与庙宇周年庆典时竖立于庙前。节日日期固定，制作、阴干与运输却需要时间，因此节庆龙香最重要的是提前规划。',
  image: '/images/facebook-led-dragon-temple-v15.webp',
  imageAlt: '马来西亚庙宇节庆夜间亮灯的兴耀手工龙香',
  sections: [
    {
      heading: '天公诞（农历正月初九）',
      paragraphs: [
        '农历正月初九天公诞是马来西亚华人社群重视的节日，不少庙宇与家庭在初八晚至初九凌晨拜天公。庙宇与团体常以高身龙香作为庆典主香。',
        '由于时间紧接农历新年，前后订单较集中。建议在年前尽早确认尺数、数量、颜色与运输安排。',
      ],
    },
    {
      heading: '九皇爷诞（农历九月初一至初九）',
      paragraphs: [
        '九皇爷诞为期九天，是马来西亚多个州属的重要庙会。斗母宫与九皇爷庙在这段期间举办迎驾、法会与送驾仪式，庙前常以成排龙香营造庄严气氛。',
        '成组龙香需要统一尺数、颜色与龙形，若加入夜间灯饰，也应提前确认电源与安装位置。',
      ],
    },
    {
      heading: '神明千秋、观音诞与庙宇周年庆',
      paragraphs: [
        '观音诞、大伯爷与二伯爷神诞、中元普度、庙宇周年庆与开光等场合，也常以龙香、桃香或大二伯爷香敬奉。不同神明与仪式可配合不同颜色、题字与造型主题。',
      ],
      bullets: ['天公诞与新春祈福', '九皇爷诞庙会', '观音诞与各神明千秋', '中元普度与法会', '庙宇周年庆、开光与酬神'],
    },
    {
      heading: '节庆龙香订制时间建议',
      paragraphs: [
        '龙香需经过调香、成柱、塑龙、彩绘与阴干，尺数越大、数量越多，制作与干燥所需时间越长，天气也会影响进度。节庆前订单集中，越早确认越能安排理想规格。',
      ],
      bullets: ['先确定节日与竖立日期', '量度场地净高并拍摄摆放位置', '确认尺数、数量、颜色、题字与灯饰', '安排运输路线、卸货与竖立人手'],
    },
  ],
  faq: [
    { question: '天公诞龙香要多早订制？', answer: '建议在农历新年前尽早联系。实际时间视尺数、数量、造型与天气而定，由兴耀按订单逐案回复。' },
    { question: '九皇爷诞可以订一整排相同的龙香吗？', answer: '可以。成组龙香会统一尺数、颜色与龙形，请提供数量、场地宽度、净高与竖立日期。' },
    { question: '节庆龙香可以加题字或庙名吗？', answer: '可以查询。题字内容、位置与颜色会在制作前与庙方确认。' },
  ],
  translation: {
    title: 'Festival Dragon Incense in Malaysia',
    introduction: 'In Malaysia, monumental dragon incense is commonly raised in front of temples for the Jade Emperor\'s Birthday, the Nine Emperor Gods Festival, deity birthdays and temple anniversaries. Festival dates are fixed while making, drying and transport take time, so early planning matters most.',
    sections: [
      { heading: 'Jade Emperor\'s Birthday (9th day of the 1st lunar month)', paragraphs: ['Temples and organisations often raise tall dragon incense as the main offering. Orders cluster around Chinese New Year, so confirm size, quantity and transport early.'] },
      { heading: 'Nine Emperor Gods Festival (1st to 9th day of the 9th lunar month)', paragraphs: ['A nine-day temple festival in several Malaysian states. Rows of matching dragon incense, sometimes with night lighting, are common in front of temples.'] },
      { heading: 'Deity birthdays and temple anniversaries', paragraphs: ['Guan Yin\'s birthday, Da Bo Ye and Er Bo Ye celebrations, the Hungry Ghost Festival, temple anniversaries and consecrations also use dragon, peach or Da Er Bo Ye incense.'] },
      { heading: 'When to order', paragraphs: ['Larger sizes and quantities need more making and drying time, and weather affects progress. Send the event date, site clearance, quantity and design preferences as early as possible.'] },
    ],
  },
}

export default defineEventHandler((event) => {
  setResponseHeader(event, 'content-type', 'text/html; charset=utf-8')
  const siteUrl = String(useRuntimeConfig(event).public.siteUrl).replace(/\/+$/, '')
  return renderSeoPage(page, siteUrl)
})
