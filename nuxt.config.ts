/// <reference path="./types/node-process.d.ts" />

import process from 'node:process'

const deploymentEnv = process.env

const isPreviewDeployment = deploymentEnv.CF_PAGES === '1'
  && Boolean(deploymentEnv.CF_PAGES_BRANCH)
  && deploymentEnv.CF_PAGES_BRANCH !== 'main'

const siteUrl = (
  deploymentEnv.NUXT_PUBLIC_SITE_URL
  || (isPreviewDeployment ? deploymentEnv.CF_PAGES_URL : undefined)
  || 'https://hengyau.com'
).replace(/\/+$/, '')

const preventIndexing = isPreviewDeployment

export default defineNuxtConfig({
  compatibilityDate: '2026-09-10',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      htmlAttrs: { lang: 'zh-Hans' },
      title: '马来西亚龙香制造商｜8尺至24尺手工大型龙香订制｜兴耀企业 Heng Yau',
      meta: [
        {
          name: 'description',
          content:
            '兴耀企业（Heng Yau Enterprise）扎根马来西亚森美兰波德申朱湖区三十余年，专业制造 8尺至24尺手工大型龙香（Giant Dragon Joss Stick）、LED亮灯龙香、桃香、大二伯爷香、龙凤喷水香与庙用小香批发，支援天公诞、九皇爷诞及全马庙宇订制。',
        },
        { name: 'theme-color', content: '#241815' },
        { name: 'color-scheme', content: 'light' },
      ],
      link: [
        { rel: 'icon', href: '/favicon.ico', sizes: '48x48' },
        { rel: 'icon', type: 'image/png', sizes: '192x192', href: '/icon-192.png' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
      ],
    },
  },
  runtimeConfig: {
    public: {
      whatsappNumber: '60163633329',
      siteUrl,
      preventIndexing,
    },
  },
  nitro: {
    prerender: {
      routes: [
        '/',
        '/malaysia-dragon-incense/',
        '/dragon-incense-size-guide/',
        '/24-feet-dragon-joss-stick/',
        '/temple-festival-incense-customisation/',
        '/temple-incense-products/',
        '/festival-dragon-incense/',
        '/dragon-incense-price-guide/',
        '/temple-projects/',
        '/about-heng-yau/',
        '/dragon-joss-stick-manufacturer-malaysia/',
        '/pengilang-dupa-naga-malaysia/',
        '/robots.txt',
        '/sitemap.xml',
        '/llms.txt',
      ],
    },
  },
})
