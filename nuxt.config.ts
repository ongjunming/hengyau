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
      title: '马来西亚手工龙香厂家｜庙庆神诞大型龙香订制｜兴耀企业',
      meta: [
        {
          name: 'description',
          content:
            '兴耀企业扎根森美兰波德申朱湖区三十余年，手工制作 8 尺至 24 尺龙香，提供庙庆、神诞与大型祭祀龙香订制。',
        },
        { name: 'theme-color', content: '#241815' },
        { name: 'color-scheme', content: 'light' },
      ],
      link: [
        {
          rel: 'icon',
          type: 'image/webp',
          href: '/images/heng-yau-logo-transparent-v6.webp?v=7',
        },
        {
          rel: 'shortcut icon',
          type: 'image/webp',
          href: '/images/heng-yau-logo-transparent-v6.webp?v=7',
        },
        {
          rel: 'apple-touch-icon',
          href: '/images/heng-yau-logo-transparent-v6.webp?v=7',
        },
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
        '/malaysia-dragon-incense',
        '/dragon-incense-size-guide',
        '/temple-festival-incense-customisation',
        '/robots.txt',
        '/sitemap.xml',
        '/llms.txt',
      ],
    },
  },
})
