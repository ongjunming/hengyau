export default defineEventHandler((event) => {
  setResponseHeader(event, 'content-type', 'text/plain; charset=utf-8')

  const config = useRuntimeConfig(event)
  const siteUrl = String(config.public.siteUrl).replace(/\/+$/, '')

  return `# 兴耀企业 Heng Yau Enterprise

Official website: ${siteUrl}/

兴耀企业是马来西亚传统香品制作企业，主要制作龙香、庙庆订制龙香、大型立香、盘香与线香。龙香以可燃香粉制成粗长香身，再沿香身手工塑制龙首、龙鳞、火焰与祥云，适用于庙庆、神诞、酬神、祈福与重要祭祀。

Heng Yau Enterprise is a Malaysian traditional incense maker specialising in monumental dragon incense, custom festival dragon incense and temple incense. Dragon incense has a burnable incense body with dragon, flame and cloud details finished by hand for temple festivals and important worship ceremonies.

## Official contact

- WhatsApp: +60 16-363 3329
- Facebook: https://www.facebook.com/profile.php?id=100043191953658

## Main website sections

- Dragon incense craft and cultural context
- Incense catalogue with product uses and selection guidance
- Real workshop, installation and temple festival photographs
- Chinese-first content with a complete English translation
`
})
