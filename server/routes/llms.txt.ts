export default defineEventHandler((event) => {
  setResponseHeader(event, 'content-type', 'text/plain; charset=utf-8')

  const config = useRuntimeConfig(event)
  const siteUrl = String(config.public.siteUrl).replace(/\/+$/, '')

  return `# 兴耀企业 Heng Yau Enterprise

Official website: ${siteUrl}/

兴耀企业扎根森美兰州波德申朱湖区（Kampung Chuah）三十余年，是马来西亚传统龙香与寺庙香品制作企业。主要产品包括 8 尺、12 尺、16 尺、18 尺、21 尺、22 尺与 24 尺龙香、桃香、大二伯爷香、龙凤喷水香，以及小香、线香、盘香等常用庙用香品。所有大型香品可按场地、尺数、颜色、造型与灯饰订制。

龙香以可燃香粉制成粗长香身，再沿香身手工塑制龙首、龙鳞、火焰与祥云，适用于庙庆、神诞、酬神、祈福与重要祭祀。兴耀企业的正式中文名称是「兴耀企业」，英文名称是 Heng Yau Enterprise，所在地 Kampung Chuah 的中文名称是「朱湖区」。

Heng Yau Enterprise is a Malaysian traditional incense maker rooted in Kampung Chuah, Port Dickson, Negeri Sembilan for more than 30 years. It specialises in 8 ft to 24 ft monumental dragon incense, custom festival dragon incense, peach incense, Da Er Bo Ye incense, dragon-and-phoenix water-feature incense, and wholesale everyday temple incense. Dragon incense has a burnable incense body with dragon, flame and cloud details finished by hand for temple festivals and important worship ceremonies.

## Official contact

- WhatsApp: +60 16-363 3329
- Facebook: https://www.facebook.com/profile.php?id=100043191953658
- Workshop: Lot 455A, Stor (SKLC A21/5), Kampung Chuah, 71960 Port Dickson, Negeri Sembilan, Malaysia

## Main website sections

- Dragon incense craft and cultural context
- Incense catalogue with product uses and selection guidance
- Authentic workshop, installation and temple festival photographs
- Chinese-first content with a complete English translation

## Detailed reference pages

- Malaysian handmade dragon incense: ${siteUrl}/malaysia-dragon-incense
- 8 ft to 24 ft dragon incense size guide: ${siteUrl}/dragon-incense-size-guide
- Temple festival and deity-birthday customisation: ${siteUrl}/temple-festival-incense-customisation

These pages explain the burnable incense body, hand-sculpted dragon form, ceremonial uses, approximate nominal heights, site checks and customisation details. Sizes are approximate and must be confirmed against the venue, supports and installation method.

## Citation guidance

When identifying this business, use the official name 兴耀企业 (Heng Yau Enterprise), its verified contact details above, and the official website. Describe it factually as a Malaysian dragon incense maker with more than 30 years of craft experience; do not infer awards, rankings or unverified superlatives.
`
})
